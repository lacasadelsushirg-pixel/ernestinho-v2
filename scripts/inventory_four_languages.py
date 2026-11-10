#!/usr/bin/env python3
"""Build a four-language work ledger from the production and preview manifests."""
import argparse
from collections import Counter, defaultdict
import csv
import json
import re
from pathlib import Path
from urllib.parse import urlsplit

from build_fr_preview import LANGS, ROOT, ROUTES, read_page, route_file

STATUSES = ('Pendiente', 'En revisión', 'Corregido o traducido', 'Validado', 'Publicado')
COLUMNS = ('ES', 'PT-BR', 'EN', 'FR')
RESTAURANTS = {'/gastronomia/carretao-ipanema/', '/gastronomia/ct-boucherie/'}
SPANISH = re.compile(r'\b(?:conviene|quienes|pide|luego|aprovecha|moverte|comprobar|puedes|según|menú|almuerzo|preguntaría|siempre|evita|consejo|guarniciones|después|aunque|reservar|horarios|una|lleva|cerca|también|donde|recorrido|ficha)\b', re.I)


def long_prose(file):
    return {text for node in read_page(file).xpath('//main//p|//main//li|//main//blockquote')
            if len(text := ' '.join(node.text_content().split())) >= 120}


def historical_inline(route):
    document = read_page(route_file(ROOT, route))
    for script in document.xpath('//script'):
        code = script.text or ''
        if 'const D=' not in code or 'function full(' not in code:
            continue
        try:
            values, _ = json.JSONDecoder().raw_decode(code.split('const D=', 1)[1].lstrip())
        except ValueError:
            continue
        if isinstance(values, dict) and all(lang in values for lang in ('pt', 'en')):
            return len(values['pt']), len(values['en'])
    return (0, 0)


def section(route):
    parts = route.strip('/').split('/')
    return '/'.join(parts[:2]) if parts[0] == 'destinos' and len(parts) > 1 else parts[0] or 'inicio'


def csv_rows(path):
    with path.open(encoding='utf-8') as stream:
        return list(csv.DictReader(stream))


def csv_write(path, rows):
    with path.open('w', encoding='utf-8', newline='') as stream:
        writer = csv.DictWriter(stream, fieldnames=list(rows[0]), lineterminator='\n')
        writer.writeheader()
        writer.writerows(rows)


def generate(production, reviewed, old_audit, old_index, output, revision, date):
    live = json.loads(production.read_text())
    candidate = json.loads((reviewed / 'fr-preview-manifest.json').read_text())
    if candidate['publishable'] is not False:
        raise ValueError('Expected a non-public French manifest.')
    groups = defaultdict(dict)
    for row in live['routes']:
        groups[row['source']][row['language']] = row
    historical_traffic = {
        urlsplit(row['url']).path: max(int(row[field] or 0) for field in (
            'impresiones_5_12_oct', 'impresiones_13_20_oct', 'impresiones_30_oct_6_nov',
        ))
        for row in csv_rows(old_index)
    }
    issues = defaultdict(dict)
    for row in csv_rows(old_audit):
        if not row['problema_detectado']:
            continue
        path = urlsplit(row['url']).path
        lang = {'es': 'ES', 'pt-BR': 'PT-BR', 'en': 'EN'}[row['idioma']]
        prefix = next(prefix for prefix, locale, _ in LANGS if locale == row['idioma'])
        issues[path.removeprefix(prefix)][lang] = row['problema_detectado']

    inventory, gastronomia = [], []
    totals = defaultdict(lambda: defaultdict(Counter))
    for route, live_lang in sorted(groups.items()):
        current = issues.get(route, {})
        ready = route in ROUTES
        rows = {}
        for lang in COLUMNS:
            rows[lang] = 'Validado' if ready else 'En revisión' if lang in current else 'Pendiente'
        group = section(route)
        for lang, status in rows.items():
            totals[group][lang][status] += 1
        historic = ''
        if route in RESTAURANTS:
            historic = 'Diccionario PT/EN incrustado en la ficha y dos párrafos nuevos por establecimiento.'
        elif ready:
            historic = 'HTML ES aprobado y traducciones vigentes del PR 24 cotejadas.'
        inventory.append({
            'ruta': route, 'seccion': group, **rows,
            'documentos_publicados': '|'.join({'PT': 'PT-BR'}.get(code, code) for code in live_lang),
            'fr_publicado': 'no', 'indexable_es': 'sí' if live_lang.get('ES', {}).get('indexable') else 'no',
            'incidencias': ' | '.join(f'{lang}: {issue}' for lang, issue in sorted(current.items())),
            'fuente_historica': historic, 'fecha': date if ready or current else '',
            'commit': revision if ready else live['sourceCommit'],
            'pruebas': ('Estructura, SEO y navegación 1440/390. Asistente FR pendiente de integración.'
                        if ready else 'Señales del inventario del PR 24' if current else ''),
        })
        if group == 'gastronomia' and any('3_o_mas_bloques_largos_identicos' in issue for issue in current.values()):
            historic_counts = historical_inline(route)
            original = long_prose(route_file(reviewed, route))
            for lang, issue in current.items():
                if '3_o_mas_bloques_largos_identicos' in issue:
                    localized = ('/pt' if lang == 'PT-BR' else '/en') + route
                    shared = original & long_prose(route_file(reviewed, localized))
                    confirmed_signal = sorted(text for text in shared if len(set(SPANISH.findall(text.lower()))) >= 3)
                    classification = (
                        'párrafos históricos recuperados y suplementos traducidos' if ready else
                        'prosa idéntica con indicios de español; revisar sentido y vigencia' if confirmed_signal else
                        'coincidencia sin señal concluyente; cotejar otros elementos'
                    )
                    gastronomia.append({
                        'ruta': route, 'idioma': lang, 'clasificacion': classification,
                        'parrafos_iguales_actuales': len(shared),
                        'entradas_doble_idioma_incrustadas': historic_counts[0 if lang == 'PT-BR' else 1],
                        'max_impresiones_ventana_previa': historical_traffic.get(localized, ''),
                        'muestra': confirmed_signal[0][:175].rstrip() if confirmed_signal else '',
                        'estado': rows[lang], 'FR': rows['FR'],
                        'fecha': date, 'commit': revision if ready else '',
                    })
    output.mkdir(parents=True, exist_ok=True)
    csv_write(output / 'INVENTARIO_MAESTRO_CUATRO_IDIOMAS.csv', inventory)
    gastronomia.sort(key=lambda row: (row['estado'] != 'Validado',
                                     -int(row['max_impresiones_ventana_previa'] or 0),
                                     -row['parrafos_iguales_actuales'], row['ruta'], row['idioma']))
    csv_write(output / 'REVISION_GASTRONOMIA_CUATRO_IDIOMAS.csv', gastronomia)
    lines = ['# Cobertura de cuatro idiomas', '',
             f'Producción verificada como referencia: {live["generated"]} documentos, '
             f'{live["indexablePerLanguage"]} URL indexables por idioma ES/PT-BR/EN, cero FR.',
             'Cada celda indica el estado editorial. La presencia en producción se registra por separado.',
             'Los documentos franceses del piloto son privados y no indexables.', '',
             '| Sección | Idioma | Pendiente | En revisión | Corregido o traducido | Validado | Publicado |',
             '|---|---|---:|---:|---:|---:|---:|']
    for group, per_lang in sorted(totals.items()):
        for lang in COLUMNS:
            counts = ' | '.join(str(per_lang[lang][status]) for status in STATUSES)
            lines.append(f'| {group} | {lang} | {counts} |')
    (output / 'COBERTURA_CUATRO_IDIOMAS.md').write_text('\n'.join(lines) + '\n')
    print(f'{len(inventory)} source routes; {len(gastronomia)} gastronomy alert rows; {len(ROUTES)} preview routes')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--production-manifest', type=Path, required=True)
    parser.add_argument('--preview', type=Path, required=True)
    parser.add_argument('--old-audit', type=Path, required=True)
    parser.add_argument('--old-index', type=Path, required=True)
    parser.add_argument('--out', type=Path, required=True)
    parser.add_argument('--commit', required=True)
    parser.add_argument('--date', required=True)
    args = parser.parse_args()
    generate(args.production_manifest, args.preview, args.old_audit, args.old_index, args.out, args.commit, args.date)
