#!/usr/bin/env python3
"""Create an explicitly private French preview from an existing locale build."""
import argparse
import copy
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
    '/gastronomia/jojo/', '/gastronomia/don-camillo/', '/gastronomia/bar-do-omar/',
    '/gastronomia/mee/', '/gastronomia/ocya-ilha/', '/gastronomia/pilograma-prime-grill/',
    '/gastronomia/temperarte-posto6/', '/gastronomia/temperarte-bolivar/', '/gastronomia/haru/',
    '/gastronomia/bar-urca/', '/gastronomia/bar-da-frente/', '/gastronomia/feira-sao-cristovao/',    '/gastronomia/cavalo-marinho/', '/gastronomia/giuseppe-mar/', '/gastronomia/amir/',
    '/gastronomia/colombo-do-forte/', '/gastronomia/flor-do-ceu/', '/gastronomia/ryu/',
    '/gastronomia/ginga/', '/gastronomia/aipo-aipim-920/', '/gastronomia/canton/',
    '/gastronomia/bracarense/', '/gastronomia/margutta-ipanema/', '/gastronomia/mosteiro/',
    '/gastronomia/churrasqueira-rio/', '/gastronomia/venga-ipanema/', '/gastronomia/merci/',
    '/gastronomia/mocellin-steak/', '/gastronomia/naga/', '/gastronomia/otto/',
    '/gastronomia/la-fiorentina-ipanema/', '/gastronomia/jobi/', '/gastronomia/lanches-cariocas/',
    '/gastronomia/cervantes-copacabana/', '/gastronomia/churrascaria-palace/',
    '/gastronomia/padarias/', '/gastronomia/shiso/', '/gastronomia/bar-luiz/', '/gastronomia/bar-da-gema/', '/gastronomia/tacaca-do-norte/', '/gastronomia/aipo-aipim-391/', '/gastronomia/aipo-aipim-605/',
)
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


def translate_nodes(document, lookup):
    for value in document.xpath(TRANSLATABLE):
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


def update_urls(document, route, lookup):
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
                if target in ROUTES:
                    item['item'] = ORIGIN + '/fr' + target
        script.text = json.dumps(data, ensure_ascii=False).replace('<', r'\u003c')
    for link in document.xpath('//body//a[@href]'):
        if link.get('hreflang') or link.get('data-fr-preview-choice') is not None:
            continue
        raw = link.get('href')
        url = urlsplit(raw)
        if not url.scheme and not url.netloc and url.path.startswith('/'):
            if url.path in ROUTES:
                link.set('href', urlunsplit(url._replace(path='/fr' + url.path)))
            elif url.path.endswith('/'):
                link.set('title', 'Cette page est disponible en espagnol.')
        if url.netloc == 'wa.me' and dict(parse_qsl(url.query)).get('text'):
            link.set('href', urlunsplit(url._replace(query=urlencode({
                'text': 'Bonjour Ernestinho, je voudrais découvrir Rio avec vous.',
            }))))


def french_page(source, route, copybook):
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

    translate_nodes(document, lookup)
    update_urls(document, route, lookup)
    if missing:
        raise ValueError(f'{route}: missing French copy for {sorted(missing)!r}')
    add_selector(document, route, french=True)
    fallback = html.Element('a', href='/quiero/', title='Cette page est disponible en espagnol.')
    fallback.text = 'Assistant Ernestinho en espagnol'
    footer = document.xpath('//footer')
    (footer[-1] if footer else document.find('body')).append(fallback)
    return document


def build(source, destination):
    if destination.exists() or destination == ROOT or ROOT in destination.parents or source in destination.parents:
        raise ValueError('Use a new preview directory outside the three-language build.')
    manifest = json.loads((source / 'locale-manifest.json').read_text())
    if manifest.get('pilot') or (source / 'fr').exists():
        raise ValueError('Expected a complete ES/PT/EN build without French routes.')
    copybook = json.loads((ROOT / 'assets/js/translations/fr/piloto-rio.json').read_text())
    validated = {entry['route'] for entry in manifest['routes'] if entry['indexable']}
    if any(prefix + route not in validated for route in ROUTES for prefix, _, _ in LANGS):
        raise ValueError('Every French preview must have three indexable source counterparts.')
    french = {route: french_page(read_page(route_file(source, route)), route, copybook) for route in ROUTES}
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
        (output / 'fr-preview-manifest.json').write_text(json.dumps({
            'publishable': False, 'sourceCommit': manifest['sourceCommit'],
            'routes': [{'route': '/fr' + route, 'source': route, 'language': 'FR',
                        'indexable': False} for route in ROUTES],
        }, indent=2) + '\n')
        output.rename(destination)
    print(f'{len(french)} non-indexable French preview routes in {destination}')


if __name__ == '__main__':
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument('--dist', type=Path, required=True)
    cli.add_argument('--out', type=Path, required=True)
    args = cli.parse_args()
    build(args.dist.resolve(), args.out.resolve())
