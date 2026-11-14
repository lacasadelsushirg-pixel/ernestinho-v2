#!/usr/bin/env python3
"""Create an explicitly private French preview from an existing locale build."""
import argparse
import copy
from hashlib import sha1
import json
from pathlib import Path
import shutil
import tempfile
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

from lxml import html

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://www.ernestinhocarioca.com.br'
ROUTES = (
    '/', '/guia/', '/guia/apps/', '/guia/dinero/', '/guia/permanencia/',
    '/gastronomia/carretao-ipanema/', '/gastronomia/ct-boucherie/',
    '/gastronomia/belmonte-copa/', '/gastronomia/belmonte-ipanema/', '/gastronomia/polvo-marisqueria/',
    '/gastronomia/nido-ristorante/', '/gastronomia/corrientes-348/', '/gastronomia/praia-skol-copa/',
    '/gastronomia/rotisseria-sirio-libanesa/', '/gastronomia/casa-feijoada/', '/gastronomia/ocya-leblon/',
    '/gastronomia/faenza-copacabana/', '/gastronomia/nino-cucina-ipanema/', '/gastronomia/koral/',
    '/gastronomia/brota/', '/gastronomia/noa-ipanema/', '/gastronomia/bar-do-mineiro/',
    '/gastronomia/spicy-fish/', '/gastronomia/amendoeira/', '/gastronomia/dumare/',
    '/gastronomia/k08/', '/gastronomia/delirio-tropical-rio-sul/', '/gastronomia/fogo-de-chao-botafogo/',
    '/gastronomia/quartinho/', '/gastronomia/deck-buffet/', '/gastronomia/pavao-azul/',
    '/gastronomia/boa-praca-ipanema/', '/gastronomia/babbo-osteria/', '/gastronomia/bb-lanches/',
    '/gastronomia/bar-madrid/', '/gastronomia/classico-beach-club-urca/', '/gastronomia/kilograma-centro/',
    '/gastronomia/proa/', '/gastronomia/elena/', '/gastronomia/sud-passaro-verde/',
    '/gastronomia/labuta-bar/', '/gastronomia/casa-201/', '/gastronomia/angu-do-gomes/',
)
GUIDE_ROUTES = (
    '/guia/accesibilidad/', '/guia/aeropuertos/', '/guia/alquiler-auto/',
    '/guia/consulados/', '/guia/cpf/', '/guia/documentos/', '/guia/donde-alojarse/',
    '/guia/emergencias/', '/guia/internet/', '/guia/menores/',
    '/guia/pix/', '/guia/mes-a-mes/', '/guia/guarda-equipaje/',
    '/guia/seguro/', '/guia/terminales/', '/guia/vacunas/', '/guia/viajar-solo/',
)
TIPS_ROUTES = (
    '/consejos/', '/consejos/20-consejos/', '/consejos/50-preguntas/',
    '/consejos/atardeceres-inolvidables/', '/consejos/electricidad-adaptadores/',
    '/consejos/errores-rio/', '/consejos/estado-del-mar-playas/', '/consejos/lluvia/',
    '/consejos/maletas-rio/', '/consejos/mascotas-rio/', '/consejos/nadie-explica/',
    '/consejos/perfiles-viajero/', '/consejos/playa-barracas-quiosques/',
    '/consejos/que-hacer-cada-dia/', '/consejos/recorrido-zona-portuaria/',
    '/consejos/revisar-alojamiento/', '/consejos/rio-1-a-7-dias/', '/consejos/rodizio/',
    '/consejos/seguro-viaje/', '/consejos/servicios-practicos/', '/consejos/sol-calor/',
    '/consejos/souvenirs/', '/consejos/trampas-turista/',
    '/consejos/portugues/', '/consejos/supermercados/',
)
TRANSPORT_ROUTES = (
    '/transportes/bonde-santa-teresa/',
    '/transportes/terminal-gentileza/',
    '/transportes/barcas/',
    '/transportes/vlt/',
    '/transportes/alquiler-vehiculo/',
    '/transportes/onibus/',
    '/transportes/trenes/',
    '/transportes/uber/',
    '/transportes/metro/',
    '/transportes/brt/',
    '/transportes/bicicletas/',
    '/transportes/',
)
ROUTES += GUIDE_ROUTES + TIPS_ROUTES + TRANSPORT_ROUTES
FR_COPY = ROOT / 'assets/js/translations/fr'
CULTURE_ROUTES = tuple(dict.fromkeys(entry['route'] for entry in json.loads(
    (FR_COPY / 'cultura-paralelo-manifest.json').read_text())['scope']))
PHOTO_ROUTES = ('/fotografia/',)
SHOPPING_ROUTES = (
    '/compras/mercados-populares/',
    '/compras/ferias/',
    '/compras/shoppings/',
    '/compras/',
    '/compras/feira-saens-pena/',
    '/compras/feira-das-yabas/',
    '/compras/shopping-tijuca/',
    '/compras/feira-noturna-copacabana/',
    '/compras/rio-sul/',
    '/compras/mercadao-madureira/',
    '/compras/feira-sao-cristovao/',
    '/compras/uruguaiana/',
    '/compras/mercado-sao-pedro/',
    '/compras/norte-shopping/',
    '/compras/praca-lido/',
    '/compras/feira-organica-gloria/',
    '/compras/cadeg/',
    '/compras/feira-hippie-ipanema/',
    '/compras/praca-xv/',
    '/compras/lavradio/',
    '/compras/village-mall/',
    '/compras/nova-america/',
    '/compras/feira-nocturna-copacabana/',
    '/compras/shopping-leblon/',
    '/compras/botafogo-praia-shopping/',
    '/compras/downtown/',
    '/compras/barrashopping/',
)
ROUTES += CULTURE_ROUTES + PHOTO_ROUTES + SHOPPING_ROUTES
RUNTIME = '/assets/js/fr-preview.js'
TRANSLATABLE = (
    '//title/text()|//body//text()[not(ancestor::script or ancestor::style or ancestor::svg or ancestor::template)]'
    '|//body//@alt|//body//@aria-label|//body//@title|//body//@placeholder'
    '|//head/meta[@name="description" or @name="twitter:title" or @name="twitter:description"'
    ' or @property="og:title" or @property="og:description" or @property="og:image:alt"]/@content'
)
LANGS = (('', 'es', 'Español'), ('/pt', 'pt-BR', 'Português (Brasil)'), ('/en', 'en', 'English'))


def route_file(root, route):
    return root / route.lstrip('/') / 'index.html'


def read_page(path):
    return html.parse(str(path), parser=html.HTMLParser(encoding='utf-8')).getroot()


def save_page(path, document):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(html.tostring(document, encoding='utf-8', doctype='<!doctype html>'))


def french_link(route):
    link = html.Element('a', href='/fr' + route, lang='fr')
    link.set('data-fr-preview-choice', '')
    link.text = '🇫🇷 Français'
    return link


def add_selector(document, route, french=False):
    document.set('data-fr-preview-href', '/fr' + route)
    groups = (
        ('//*[@data-ec-desktop-language-group]', 'ec-desktop-language-choice'),
        ('//*[contains(concat(" ",normalize-space(@class)," ")," ec-mobile-language-row ")]', 'ec-language-choice'),
    )
    for selector, css_class in groups:
        group = document.xpath(selector)[0]
        link = french_link(route)
        link.set('data-desktop-language', 'FR')
        link.set('class', css_class + (' is-active' if french else ''))
        link.set('style', 'text-decoration:none;white-space:nowrap')
        if french:
            group.set('aria-label', 'Langue actuelle : français. Changer de langue')
            link.set('aria-current', 'page')
            for choice in group.xpath('./a'):
                choice.attrib.pop('aria-pressed', None)
                choice.set('class', choice.get('class', '').replace(' is-active', ''))
        group.append(link)
    style = html.Element('style')
    style.text = '@media(max-width:900px){[data-fr-preview-href] [data-ec-desktop-language-group]{display:none!important}}'
    document.find('head').append(style)
    document.find('body').append(html.Element('script', type='module', src=RUNTIME))


def translate_nodes(document, lookup, skip_ids=()):
    skip_ids = set(skip_ids)
    for value in document.xpath(TRANSLATABLE):
        parent = value.getparent()
        chain = (parent, *parent.iterancestors()) if parent is not None else ()
        if any(element.get('id') in skip_ids - {'mainText'} for element in chain):
            continue
        if 'mainText' in skip_ids and any(element.get('id') == 'mainText' for element in chain):
            paragraph = next((element for element in chain if element.getparent() is not None and element.getparent().get('id') == 'mainText'), None)
            if paragraph is not None and paragraph.tag == 'p':
                continue
        original = str(value)
        key = ' '.join(original.split())
        if not key or not any(char.isalpha() for char in key):
            continue
        replacement = original[:len(original) - len(original.lstrip())] + lookup(key)
        replacement += original[len(original.rstrip()):]
        element = value.getparent()
        if value.is_attribute:
            element.set(value.attrname, replacement)
        elif value.is_tail:
            element.tail = replacement
        else:
            element.text = replacement


def update_urls(document, route, lookup, routes):
    canonical = ORIGIN + '/fr' + route
    document.xpath('//link[@rel="canonical"]')[0].set('href', canonical)
    for link in document.xpath('//head/link[@rel="alternate"][@hreflang]'):
        link.drop_tree()
    for meta in document.xpath('//meta[@name="robots" or @name="googlebot"]'):
        meta.drop_tree()
    document.find('head').append(html.Element('meta', name='robots', content='noindex, follow'))
    for meta in document.xpath('//meta[@property="og:url" or @property="og:locale"]'):
        meta.set('content', canonical if meta.get('property') == 'og:url' else 'fr_FR')
    for script in document.xpath('//script[@type="application/ld+json"]'):
        data = json.loads(script.text)
        if data.get('@type') == 'WebPage':
            data.update(url=canonical, inLanguage='fr', name=lookup(data['name']),
                        description=lookup(data['description']))
        if data.get('@type') == 'BreadcrumbList':
            for item in data['itemListElement']:
                item['name'] = lookup(item['name'])
                target = urlsplit(item['item']).path
                if target in routes:
                    item['item'] = ORIGIN + '/fr' + target
        script.text = json.dumps(data, ensure_ascii=False).replace('<', r'\u003c')
    for link in document.xpath('//body//a[@href]'):
        if link.get('hreflang') or link.get('data-fr-preview-choice') is not None:
            continue
        raw = link.get('href')
        url = urlsplit(raw)
        if not url.scheme and not url.netloc and url.path.startswith('/'):
            if url.path in routes:
                link.set('href', urlunsplit(url._replace(path='/fr' + url.path)))
            elif url.path.endswith('/'):
                link.set('title', 'Cette page est disponible en espagnol.')
        if url.netloc == 'wa.me' and dict(parse_qsl(url.query)).get('text'):
            link.set('href', urlunsplit(url._replace(query=urlencode({
                'text': 'Bonjour Ernestinho, je voudrais découvrir Rio avec vous.',
            }))))


def restore_preview_media(document, route):
    if route == '/guia/pix/':
        for figure in document.xpath('//figure[starts-with(normalize-space(text()), "img src=")]'):
            image = html.fragment_fromstring('<' + figure.text.strip())
            if image.tag != 'img':
                raise ValueError('Unexpected malformed Pix illustration')
            figure.text = None
            figure.insert(0, image)


PORTUGUESE_ROUTE = '/consejos/portugues/'
SUPERMARKETS_ROUTE = '/consejos/supermercados/'


def checked_source(path, expected):
    raw = (ROOT / path).read_bytes()
    if sha1(f'blob {len(raw)}\0'.encode() + raw).hexdigest() != expected:
        raise ValueError(f'{path}: source has changed since the French editorial review')
    return raw.decode()


def portuguese_preview():
    localized = json.loads((FR_COPY / 'consejos-portugues-80-frases-paralelo.json').read_text())
    original = json.loads(checked_source('assets/data/portugues-util.json', localized['source_data_sha']))
    module = checked_source('assets/js/portugues-util.js', localized['source_module_sha'])
    book = {}
    ui = localized['ui']
    for key, french in [('✨ Todas', '✨ ' + ui['all']), ('🔊 Escuchar', '🔊 ' + ui['listen']),
                        ('🐢 Lento', '🐢 ' + ui['slow']), ('Categorías de frases', ui['filtersAria'])]:
        book[key] = french
    for category, translated in zip(original['categories'], localized['categories'], strict=True):
        if category['id'] != translated['id']:
            raise ValueError('Portuguese phrase categories are out of sync')
        book[f"{category['icon']} {category['es']}"] = category['icon'] + ' ' + translated['fr']
        category['es'] = translated['fr']
    for phrase, translated in zip(original['phrases'], localized['phrases'], strict=True):
        if (phrase['id'], phrase['pt'], phrase['es']) != (
                translated['id'], translated['pt_original'], translated['es_original']):
            raise ValueError('Portuguese phrases are out of sync')
        book[phrase['pt']] = phrase['pt']
        book[phrase['es']] = translated['fr']
        phrase['es'] = translated['fr']
    for item, translated in zip(original['falseFriends'], localized['falseFriends'], strict=True):
        if item['pt'] != translated['pt']:
            raise ValueError('Portuguese false friends are out of sync')
        book[item['pt']] = item['pt']
        book['→ ' + item['es']] = '→ ' + translated['fr']
        book[item['note']] = translated['note']
        item.update(es=translated['fr'], note=translated['note'])
    # Run the original filtering and audio logic with the localized preview data.
    start = module.index('function langKey()')
    end = module.index('function cleanPhrase', start)
    module = module[module.index('const root'):start] + 'function langKey() { return "es"; }\n\n' + module[end:]
    module = module.replace('    onLanguageChange(() => {\n      stopAudio();\n      render();\n    });\n', '')
    for spanish, key in [('Todas', 'all'), ('Escuchar', 'listen'), ('Lento', 'slow'),
                         ('No encontré el audio de esta frase en Cloudinary.', 'missingAudio'),
                         ('No se pudo cargar la guía de portugués.', 'loadError')]:
        module = module.replace(json.dumps(spanish, ensure_ascii=False), json.dumps(ui[key], ensure_ascii=False))
    return book, original, module


def supermarkets_copybook():
    localized = json.loads((FR_COPY / 'consejos-supermercados-modulo-196-paralelo.json').read_text())
    source = checked_source(localized['source'], localized['source_sha'])
    entries, _ = json.JSONDecoder().raw_decode(source.removeprefix('export default ').lstrip())
    if entries['ES'].keys() != localized['keys'].keys():
        raise ValueError('Supermarket translation keys are out of sync')
    return {value: localized['keys'][key] for key, value in entries['ES'].items()}


def replace_inner_html(element, markup):
    for child in list(element):
        element.remove(child)
    element.text = None
    for fragment in html.fragments_fromstring(markup):
        if isinstance(fragment, str):
            if len(element):
                element[-1].tail = (element[-1].tail or '') + fragment
            else:
                element.text = (element.text or '') + fragment
        else:
            element.append(fragment)


def shopping_runtime_copy(document, route):
    slug = route.rstrip('/').split('/')[-1]
    data_path = FR_COPY / f'compras-{slug}-dinamico-paralelo.json'
    if not data_path.exists():
        raise ValueError(f'{route}: runtime dictionary is missing')
    data = json.loads(data_path.read_text())
    if 'runtime_T_fr' not in data or 'runtime_P_fr' not in data:
        return ()
    raw = route_file(ROOT, route).read_bytes()
    source_sha = sha1(f'blob {len(raw)}\0'.encode() + raw).hexdigest()
    if data.get('source_path') != route.lstrip('/') + 'index.html' or data.get('source_sha') != source_sha:
        raise ValueError(f'{route}: runtime copy does not match the current source HTML')
    runtime = data['runtime_T_fr']
    expected_keys = data['qa'].get('fr_T_keys')
    if expected_keys is not None and len(runtime) != expected_keys:
        raise ValueError(f'{route}: runtime section count differs from translation QA')
    for key, markup in runtime.items():
        targets = document.xpath(f'//*[@id="{key}"]')
        if not targets:
            raise ValueError(f'{route}: runtime target #{key} is missing')
        replace_inner_html(targets[0], markup)
    paragraphs = document.xpath('//*[@id="mainText"]')
    if not paragraphs:
        raise ValueError(f'{route}: mainText runtime target is missing')
    main = paragraphs[0]
    paragraphs = main.xpath('./p')
    translations = data['runtime_P_fr']
    expected_paragraphs = data['qa'].get('fr_P_paragraphs', data['qa'].get('original_P_paragraphs'))
    if expected_paragraphs is None or len(translations) != expected_paragraphs or len(paragraphs) != expected_paragraphs:
        raise ValueError(f'{route}: runtime paragraph count differs from translation QA or source HTML')
    for paragraph, text in zip(paragraphs, translations):
        paragraph.text = text
        for child in list(paragraph):
            paragraph.remove(child)
    return ('mainText', *runtime.keys())


def french_page(source, route, copybook, routes=ROUTES):
    document = copy.deepcopy(source)
    document.set('lang', 'fr')
    document.attrib.pop('data-ec-locale-routes', None)
    document.set('data-fr-preview', '')
    # The existing assistant cannot respond in French yet. Keep an explicit
    # route to the Spanish service while retaining the French WhatsApp option.
    for element in document.xpath('//*[contains(concat(" ",normalize-space(@class)," ")," ec-cariocia ")]'):
        element.drop_tree()
    for script in document.xpath('//script[not(@type="application/ld+json")]'):
        script.drop_tree()
    for element in document.xpath('//*[contains(concat(" ",normalize-space(@class)," ")," lang-switcher ")]'):
        element.drop_tree()
    missing = set()

    def lookup(value):
        if value not in copybook:
            missing.add(value)
        return copybook.get(value, value)

    restore_preview_media(document, route)
    runtime_skip_ids = ()
    if route.startswith('/compras/'):
        slug = route.rstrip('/').split('/')[-1]
        if (FR_COPY / f'compras-{slug}-dinamico-paralelo.json').is_file():
            runtime_skip_ids = shopping_runtime_copy(document, route)

    if route == '/guia/mes-a-mes/':
        data = json.loads(read_page(route_file(ROOT, route)).xpath('//script[@id="month-data"]')[0].text)
        for tab, heading in (('rain', 'Si llueve: cómo adaptar el día'),
                             ('heat', 'Cuando hace mucho calor')):
            panel = html.Element('section', id=f'fr-month-{tab}', hidden='')
            panel.append(html.Element('h2'))
            panel[-1].text = heading
            listing = html.Element('ul')
            for label, advice in data[tab]['es']:
                li = html.Element('li')
                title = html.Element('span')
                title.text = label
                title.tail = ' · '
                li.append(title)
                detail = html.Element('span')
                detail.text = advice
                listing.append(li)
                li.append(detail)
            panel.append(listing)
            document.xpath('//*[@id="month-extra"]')[0].append(panel)

    translate_nodes(document, lookup, runtime_skip_ids)
    if route == PORTUGUESE_ROUTE:
        document.xpath('//*[@data-portugues-app]')[0].set('data-data-url', '/assets/data/fr-portugues-preview.json')
        document.find('body').append(html.Element('script', type='module', src='/assets/js/fr-portugues-preview.js'))
    update_urls(document, route, lookup, routes)
    if missing:
        raise ValueError(f'{route}: missing French copy for {sorted(missing)!r}')
    add_selector(document, route, french=True)
    if route in CULTURE_ROUTES:
        style = html.Element('style')
        style.text = '@media(max-width:760px){html[lang=fr] main h1,html[lang=fr] .culture-copy{overflow-wrap:anywhere}html[lang=fr] .culture-copy{min-width:0}}'
        document.find('head').append(style)
    fallback = html.Element('a', href='/quiero/', title='Cette page est disponible en espagnol.')
    fallback.text = 'Assistant Ernestinho en espagnol'
    footer = document.xpath('//footer')
    (footer[-1] if footer else document.find('body')).append(fallback)
    return document


def section_copybooks(routes, section):
    scope = json.loads((FR_COPY / f'{section}-paralelo-manifest.json').read_text())['scope']
    supplements = json.loads((FR_COPY / f'{section}-preview-supplement.json').read_text())
    books = {}
    for entry in scope:
        route = entry['route']
        if route not in routes:
            continue
        raw = route_file(ROOT, route).read_bytes()
        blob = sha1(f'blob {len(raw)}\0'.encode() + raw).hexdigest()
        if entry['source_sha'] != blob:
            raise ValueError(f'{route}: Spanish source has changed since the French editorial review')
        book = {}
        for file in entry.get('files') or entry.get('dictionaries') or [entry.get('file') or entry['dictionary']]:
            book.update(json.loads((ROOT / file).read_text()))
        books[route] = book | supplements.get(route, {})
    return books


def build(source, destination, routes=ROUTES):
    if destination.exists() or destination == ROOT or ROOT in destination.parents or source in destination.parents:
        raise ValueError('Use a new preview directory outside the three-language build.')
    manifest = json.loads((source / 'locale-manifest.json').read_text())
    if (source / 'fr').exists():
        raise ValueError('Expected an ES/PT/EN build without French routes.')
    copybook = json.loads((FR_COPY / 'piloto-rio.json').read_text())
    books = {}
    for section, candidates in (('guia', GUIDE_ROUTES), ('consejos', TIPS_ROUTES),
                                ('transportes', TRANSPORT_ROUTES), ('cultura', CULTURE_ROUTES),
                                ('fotografia', PHOTO_ROUTES), ('compras', SHOPPING_ROUTES)):
        selected = set(routes).intersection(candidates)
        if selected:
            books.update(section_copybooks(selected, section))
    if PORTUGUESE_ROUTE in routes:
        phrases, phrase_data, phrase_module = portuguese_preview()
        books[PORTUGUESE_ROUTE].update(phrases)
    if SUPERMARKETS_ROUTE in routes:
        books[SUPERMARKETS_ROUTE] = supermarkets_copybook() | books[SUPERMARKETS_ROUTE]
    validated = {entry['route'] for entry in manifest['routes'] if entry['indexable']}
    if any(prefix + route not in validated for route in routes for prefix, _, _ in LANGS):
        raise ValueError('Every French preview must have three indexable source counterparts.')
    french = {route: french_page(read_page(route_file(source, route)), route,
                                 copybook | books.get(route, {}), routes) for route in routes}
    with tempfile.TemporaryDirectory(dir=destination.parent) as temp:
        output = Path(temp) / 'preview'
        shutil.copytree(source, output)
        for route, document in french.items():
            save_page(route_file(output, '/fr' + route), document)
            for prefix, _, _ in LANGS:
                counterpart = route_file(output, prefix + route)
                translated = read_page(counterpart)
                add_selector(translated, route)
                save_page(counterpart, translated)
        shutil.copyfile(ROOT / 'scripts/fr-preview-browser.js', output / RUNTIME.lstrip('/'))
        if PORTUGUESE_ROUTE in routes:
            (output / 'assets/data/fr-portugues-preview.json').write_text(json.dumps(phrase_data, ensure_ascii=False))
            (output / 'assets/js/fr-portugues-preview.js').write_text(phrase_module)
        (output / 'fr-preview-manifest.json').write_text(json.dumps({
            'publishable': False, 'sourceCommit': manifest['sourceCommit'],
            'routes': [{'route': '/fr' + route, 'source': route, 'language': 'FR',
                        'indexable': False} for route in routes],
        }, indent=2) + '\n')
        output.rename(destination)
    print(f'{len(french)} non-indexable French preview routes in {destination}')


if __name__ == '__main__':
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument('--dist', type=Path, required=True)
    cli.add_argument('--out', type=Path, required=True)
    cli.add_argument('--guide-only', action='store_true')
    args = cli.parse_args()
    routes = tuple(route for route in ROUTES if route.startswith('/guia/')) if args.guide_only else ROUTES
    build(args.dist.resolve(), args.out.resolve(), routes)
