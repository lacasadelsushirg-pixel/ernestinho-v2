#!/usr/bin/env python3
"""Validate structural and search isolation for all four locales of the pilot."""
import argparse
from collections import Counter
import copy
import json
from pathlib import Path
from urllib.parse import quote, urlsplit

from build_fr_preview import (SCRIPT_SOURCE_LOCALE_ROUTES, LANGS, ORIGIN,
                              pin_script_locale, prerender_dynamic_source_locale, read_page,
                              restore_preview_media, route_file)

EDITORIAL = '//main//*[self::h1 or self::h2 or self::h3 or self::p or self::li or self::td or self::th]'
PROSE = '//main//*[self::p or self::li or self::td or self::th]'
MEDIA = '//main//img/@src|//main//source/@srcset|//main//iframe/@src'


def text(node):
    return ' '.join(node.text_content().split())


def ascii_url(value):
    return ''.join(char if char.isascii() and char != " " else quote(char) for char in value)


def verify(base, preview):
    for name in ('sitemap.xml', 'locale-manifest.json'):
        original = base / name
        candidate = preview / name
        if original.is_file():
            assert original.read_bytes() == candidate.read_bytes(), name
        else:
            assert name == 'sitemap.xml' and not candidate.exists(), name
    fr_manifest = json.loads((preview / 'fr-preview-manifest.json').read_text())
    assert fr_manifest['publishable'] is False
    routes = [entry['source'] for entry in fr_manifest['routes']]
    assert len(routes) == len(set(routes))
    assert {x['route'] for x in fr_manifest['routes']} == {'/fr' + route for route in routes}
    assert all(x['indexable'] is False for x in fr_manifest['routes'])
    assert {p.parent.relative_to(preview).as_posix().rstrip('/')
            for p in (preview / 'fr').rglob('index.html')} == {'fr' + route.rstrip('/') for route in routes}
    inherited = []
    for route in routes:
        es = read_page(route_file(base, route))
        es_blocks = {text(n) for n in es.xpath(PROSE) if len(text(n)) >= 85}
        for prefix, locale, _ in (*LANGS, ('/fr', 'fr', 'Français')):
            path = prefix + route
            doc = read_page(route_file(preview, path))
            locale_source = es if locale == 'fr' else read_page(route_file(base, path))
            original = locale_source  # compare inherited copy against the current locale, never the previous loop
            assert doc.get('lang') == locale, (path, 'html lang')
            assert len(doc.xpath('//h1')) == len(locale_source.xpath('//h1')), (path, 'h1')
            assert doc.xpath('//link[@rel="canonical"]/@href') == [ORIGIN + path], (path, 'canonical')
            assert doc.xpath('//head/title/text()') and doc.xpath('//head/meta[@name="description"]/@content')
            extra = 0
            if locale == 'fr' and route == '/guia/mes-a-mes/':
                assert len(doc.xpath('//*[@id="fr-month-rain"]//li')) == 6
                assert len(doc.xpath('//*[@id="fr-month-heat"]//li')) == 5
                assert len(doc.xpath('//*[@id="month-grid"]/article')) == 12
                extra = 13
            assert len(doc.xpath(EDITORIAL)) == len(locale_source.xpath(EDITORIAL)) + extra, (path, 'editorial structure')
            assert doc.xpath('//*[@data-fr-preview-choice]/@href') == ['/fr' + route] * 2, (path, 'selector')
            if prefix:
                shared = {text(n) for n in doc.xpath(PROSE)} & es_blocks
                if route == '/consejos/portugues/' and locale in ('pt-BR', 'en'):
                    # The existing ES/PT/EN module uses Spanish glosses in this teaching list.
                    shared -= {text(n) for n in es.xpath('//*[@data-false-friends]/li')}
                if shared and locale in ('pt-BR', 'en') and route.startswith('/compras/'):
                    original_blocks = {text(n) for n in original.xpath(PROSE)}
                    existing = shared & original_blocks
                    if existing:
                        inherited.append((path, len(existing)))
                    shared -= existing
                assert not shared, (path, 'untranslated paragraphs', sorted(shared))
            external = '//main//a[starts-with(@href,"https://") or starts-with(@href,"http://")]/@href'
            expected_links = Counter(ascii_url(link) for link in original.xpath(external) if urlsplit(link).hostname != 'wa.me')
            actual_links = Counter(ascii_url(link) for link in doc.xpath(external) if urlsplit(link).hostname != 'wa.me')
            assert actual_links == expected_links, (path, 'external editorial links changed',
                                                    expected_links - actual_links,
                                                    actual_links - expected_links)
            if locale == 'fr':
                assert doc.xpath('//meta[@name="robots"]/@content') == ['noindex, follow']
                assert not doc.xpath('//head/link[@rel="alternate"][@hreflang]')
                restore_preview_media(es, route)
                assert list(map(ascii_url, doc.xpath(MEDIA))) == list(map(ascii_url, es.xpath(MEDIA))), (path, 'media changed')
                for link in doc.xpath('//a[starts-with(@href,"/fr/")]/@href'):
                    assert route_file(preview, urlsplit(link).path).is_file(), (path, link)
            else:
                expected = original
                if locale in ('pt-BR', 'en') and route in SCRIPT_SOURCE_LOCALE_ROUTES:
                    expected = copy.deepcopy(original)
                    prerender_dynamic_source_locale(expected, route,
                                                    {'pt-BR': 'pt', 'en': 'en'}[locale])
                    pin_script_locale(expected, route,
                                      {'pt-BR': 'pt', 'en': 'en'}[locale])
                assert [text(n) for n in doc.xpath(EDITORIAL)] == [text(n) for n in expected.xpath(EDITORIAL)]
                if locale in ('pt-BR', 'en') and route in SCRIPT_SOURCE_LOCALE_ROUTES:
                    actual_scripts = [(node.get('src'), node.get('type'), node.text or '') for node in doc.xpath('//script')]
                    expected_scripts = [(node.get('src'), node.get('type'), node.text or '') for node in expected.xpath('//script')]
                    assert actual_scripts[:-1] == expected_scripts, (path, 'source script changed unexpectedly')
                    assert actual_scripts[-1][:2] == ('/assets/js/fr-preview.js', 'module'), (path, 'preview selector script missing')
                assert doc.xpath('//head/link[@rel="alternate"]/@href') == original.xpath('//head/link[@rel="alternate"]/@href')
                assert list(map(ascii_url, doc.xpath(MEDIA))) == list(map(ascii_url, original.xpath(MEDIA))), (path, 'media changed')
                assert list(map(ascii_url, doc.xpath('//main//a/@href'))) == list(map(ascii_url, original.xpath('//main//a/@href'))), (path, 'links changed')
        print(f'{route} ES/PT-BR/EN/FR verified')

    for path, count in inherited:
        print(f'{path}: {count} inherited Spanish blocks require recovery')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dist', type=Path, required=True)
    parser.add_argument('--preview', type=Path, required=True)
    args = parser.parse_args()
    verify(args.dist, args.preview)
