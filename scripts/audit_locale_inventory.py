#!/usr/bin/env python3
"""Inventory of generated HTML and localized SEO signals. Requires lxml."""
import argparse
from collections import Counter, defaultdict
import csv
import json
from pathlib import Path
import re
from urllib.parse import urljoin, urlsplit
from xml.etree import ElementTree

from lxml import html

from audit_translation_content import file_for, norm

ORIGIN = 'https://www.ernestinhocarioca.com.br'
LANGUAGES = {'ES': 'es', 'PT': 'pt-BR', 'EN': 'en'}
PREFIXES = {'ES': '', 'PT': '/pt', 'EN': '/en'}
ALT_PREFIXES = {'es': '', 'pt-BR': '/pt', 'en': '/en', 'x-default': ''}
SCOPE = '(//main | //*[@role="main"])[1]'
FIELDS = {
    'title': '//head/title',
    'heading': './/h1 | .//h2 | .//h3 | .//h4 | .//h5 | .//h6',
    'prose': './/p | .//li | .//blockquote | .//dd | .//td | .//th',
    'control': './/a | .//button | .//summary | .//label',
    'alt': './/img[@alt]/@alt',
}


def texts(nodes):
    return [value for node in nodes if (value := norm(
        node if isinstance(node, str) else ''.join(node.itertext())
    ))]


def page_data(path, url):
    root = html.fromstring(path.read_bytes(), parser=html.HTMLParser(encoding='utf-8'))
    for hidden in root.xpath('//script | //style | //template | //noscript | //svg | //*[@hidden]'):
        hidden.drop_tree()
    main = next(iter(root.xpath(SCOPE)), None)
    content = main if main is not None else next(iter(root.xpath('//body')), root)
    result = {key: texts((root if key == 'title' else content).xpath(query)) for key, query in FIELDS.items()}
    result['description'] = texts(root.xpath('//meta[translate(@name,"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz")="description"]/@content'))
    result['h1'] = texts(root.xpath('//body//h1'))
    result['nav_footer'] = texts(root.xpath('//header//a | //nav//a | //footer//a | //header//button | //footer//button'))
    result['links'] = {
        target.path for href in content.xpath('.//a[@href]/@href')
        if (target := urlsplit(urljoin(url, href))).netloc == urlsplit(ORIGIN).netloc
        and target.path != urlsplit(url).path
    }
    result['lang'] = root.get('lang', '')
    result['canonical'] = root.xpath('//link[@rel="canonical"]/@href')
    result['alternates'] = [
        (element.get('hreflang'), element.get('href'))
        for element in root.xpath('//link[@rel="alternate"][@hreflang]')
    ]
    result['noindex'] = any(re.search(r'\b(?:noindex|none)\b', item, flags=re.I) for item in root.xpath(
        '//meta[translate(@name,"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz")="robots" or '
        'translate(@name,"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz")="googlebot"]/@content'
    ))
    result['main'] = main is not None
    result['image_missing_alt'] = len(content.xpath('.//img[not(@alt)]'))
    return result


def write_rows(path, rows):
    with path.open('w', newline='', encoding='utf-8') as output:
        writer = csv.DictWriter(output, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)


def run(dist, output):
    manifest = json.loads((dist / 'locale-manifest.json').read_text())
    indexable = {entry['route'] for entry in manifest['routes'] if entry['indexable']}
    sitemap = defaultdict(list)
    for entry in ElementTree.parse(dist / 'sitemap.xml').findall('.//{*}url'):
        sitemap[entry.find('{*}loc').text].append(sorted(
            (node.get('hreflang'), node.get('href')) for node in entry.findall('{*}link')
        ))
    pages = {}
    inlinks = Counter()
    for entry in manifest['routes']:
        route = entry['route']
        path = file_for(dist, route)
        if path.is_file():
            data = page_data(path, ORIGIN + route)
            pages[route] = data
            if entry['indexable']:
                inlinks.update(data['links'])

    translation_rows, technical_rows = [], []
    for entry in sorted(manifest['routes'], key=lambda row: row['route']):
        route, source, lang = (entry[key] for key in ('route', 'source', 'language'))
        url = ORIGIN + route
        flags, seo_flags = [], []
        identical = {}
        data, es = pages.get(route), pages.get(source)
        if data is None:
            flags.append('archivo_ausente')
            seo_flags.append('archivo_ausente')
        else:
            if data['lang'].lower() != LANGUAGES[lang].lower():
                seo_flags.append('html_lang')
            if entry['indexable']:
                if data['canonical'] != [url]:
                    seo_flags.append('canonical')
                expected = sorted((code, ORIGIN + prefix + source) for code, prefix in ALT_PREFIXES.items())
                if sorted(data['alternates']) != expected or any(urlsplit(target).path not in indexable for _, target in expected):
                    seo_flags.append('hreflang_html')
                if sitemap.get(url) != [expected]:
                    seo_flags.append('sitemap_hreflang_o_duplicado')
                if data['noindex']:
                    seo_flags.append('noindex')
                for key in ('title', 'description', 'h1'):
                    if not data[key]:
                        flags.append(key + '_ausente')
                if data['image_missing_alt']:
                    flags.append('img_sin_atributo_alt')
                if lang != 'ES' and es:
                    for key in (*FIELDS, 'description', 'h1', 'nav_footer'):
                        minimum = 120 if key == 'prose' else 4
                        identical[key] = sorted({
                            text for text in set(es[key]) & set(data[key]) if len(text) >= minimum
                        }, key=lambda text: (-len(text), text))
                    if len(identical['prose']) >= 3:
                        flags.append('3_o_mas_bloques_largos_identicos')
                    if len(data['heading']) < len(es['heading']):
                        flags.append('menos_encabezados')
                    es_size = sum(map(len, es['prose']))
                    local_size = sum(map(len, data['prose']))
                    if es_size >= 500 and local_size < es_size * .65:
                        flags.append('prosa_menor_al_65_por_ciento')
            elif url in sitemap:
                seo_flags.append('url_no_indexable_en_sitemap')
        parts = source.strip('/').split('/')
        section = '/'.join(parts[:3]) if parts[0] == 'destinos' else parts[0] or 'home'
        translation_rows.append({
            'url': url, 'seccion': section, 'idioma': LANGUAGES[lang],
            'estado_traduccion': 'revisar' if flags else 'sin_alerta_estructural' if entry['indexable'] else 'fuera_del_sitemap',
            'problema_detectado': '|'.join(flags), 'texto_historico_disponible': '',
            'correccion_realizada': '', 'estado_validacion': 'estatica' if data else 'archivo_ausente',
            'titulo': ' | '.join(data['title']) if data else '', 'h1': ' | '.join(data['h1']) if data else '',
            'encabezados': len(data['heading']) if data else '',
            'bloques_prosa': len(data['prose']) if data else '',
            'caracteres_prosa': sum(map(len, data['prose'])) if data else '',
            'coincidencias_es_por_campo': json.dumps({key: len(values) for key, values in identical.items()}, ensure_ascii=False),
            'muestra_es_prosa': identical.get('prose', [''])[0][:280] if identical.get('prose') else '',
        })
        technical_rows.append({
            'url': url, 'idioma': LANGUAGES[lang], 'estado_actual_gsc': 'sin_dato',
            'motivo_exclusion': '', 'http': '', 'canonical_build': ' | '.join(data['canonical']) if data else '',
            'sitemap_build': len(sitemap.get(url, [])), 'enlaces_internos_editoriales_build': inlinks[route],
            'accion_recomendada': 'revisar ' + ', '.join(seo_flags) if seo_flags else '',
        })
    output.mkdir(parents=True, exist_ok=True)
    write_rows(output / 'INVENTARIO_TRADUCCIONES.csv', translation_rows)
    write_rows(output / 'INVENTARIO_INDEXACION.csv', technical_rows)
    print(json.dumps({
        'manifest': len(manifest['routes']), 'indexables': len(indexable), 'sitemap': len(sitemap),
        'parsed': len(pages), 'sitemap_urls_outside_indexable_manifest': sorted(set(sitemap) - {ORIGIN + route for route in indexable}),
        'translation_flags': Counter(flag for row in translation_rows for flag in row['problema_detectado'].split('|') if flag),
        'technical_flags': Counter(row['accion_recomendada'] for row in technical_rows if row['accion_recomendada']),
    }, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dist', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    run(args.dist, args.output)
