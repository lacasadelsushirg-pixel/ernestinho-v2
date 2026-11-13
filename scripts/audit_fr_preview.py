#!/usr/bin/env python3
"""Validate structural and search isolation for all four locales of the pilot."""
import argparse
from collections import Counter
import json
from pathlib import Path
from urllib.parse import urlsplit

from build_fr_preview import LANGS, ORIGIN, read_page, restore_preview_media, route_file

EDITORIAL = '//main//*[self::h1 or self::h2 or self::h3 or self::p or self::li or self::td or self::th]'
PROSE = '//main//*[self::p or self::li or self::td or self::th]'
MEDIA = '//main//img/@src|//main//source/@srcset|//main//iframe/@src'


def text(node):
    return ' '.join(node.text_content().split())


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
    for route in routes:
        es = read_page(route_file(base, route))
        es_blocks = {text(n) for n in es.xpath(PROSE) if len(text(n)) >= 85}
        for prefix, locale, _ in (*LANGS, ('/fr', 'fr', 'Français')):
            path = prefix + route
            doc = read_page(route_file(preview, path))
            assert doc.get('lang') == locale, (path, 'html lang')
            assert len(doc.xpath('//h1')) == len(es.xpath('//h1')), (path, 'h1')
            assert doc.xpath('//link[@rel="canonical"]/@href') == [ORIGIN + path], (path, 'canonical')
            assert doc.xpath('//head/title/text()') and doc.xpath('//head/meta[@name="description"]/@content')
            extra = 0
            if locale == 'fr' and route == '/guia/mes-a-mes/':
                assert len(doc.xpath('//*[@id="fr-month-rain"]//li')) == 6
                assert len(doc.xpath('//*[@id="fr-month-heat"]//li')) == 5
                assert len(doc.xpath('//*[@id="month-grid"]/article')) == 12
                extra = 13
            assert len(doc.xpath(EDITORIAL)) == len(es.xpath(EDITORIAL)) + extra, (path, 'editorial structure')
            assert doc.xpath('//*[@data-fr-preview-choice]/@href') == ['/fr' + route] * 2, (path, 'selector')
            if prefix:
                shared = {text(n) for n in doc.xpath(PROSE)} & es_blocks
                assert not shared, (path, 'untranslated paragraphs', sorted(shared))
            external = '//main//a[starts-with(@href,"https://") or starts-with(@href,"http://")]/@href'
            original = es if locale == 'fr' else read_page(route_file(base, path))
            expected_links = Counter(link for link in original.xpath(external) if urlsplit(link).hostname != 'wa.me')
            actual_links = Counter(link for link in doc.xpath(external) if urlsplit(link).hostname != 'wa.me')
            assert actual_links == expected_links, (path, 'external editorial links changed',
                                                    expected_links - actual_links,
                                                    actual_links - expected_links)
            if locale == 'fr':
                assert doc.xpath('//meta[@name="robots"]/@content') == ['noindex, follow']
                assert not doc.xpath('//head/link[@rel="alternate"][@hreflang]')
                restore_preview_media(es, route)
                assert doc.xpath(MEDIA) == es.xpath(MEDIA), (path, 'media changed')
                for link in doc.xpath('//a[starts-with(@href,"/fr/")]/@href'):
                    assert route_file(preview, urlsplit(link).path).is_file(), (path, link)
            else:
                assert [text(n) for n in doc.xpath(EDITORIAL)] == [text(n) for n in original.xpath(EDITORIAL)]
                assert doc.xpath('//head/link[@rel="alternate"]/@href') == original.xpath('//head/link[@rel="alternate"]/@href')
        print(f'{route} ES/PT-BR/EN/FR verified')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dist', type=Path, required=True)
    parser.add_argument('--preview', type=Path, required=True)
    args = parser.parse_args()
    verify(args.dist, args.preview)
