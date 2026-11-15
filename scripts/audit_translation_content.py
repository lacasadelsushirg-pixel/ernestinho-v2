#!/usr/bin/env python3
"""Audit built ES/PT/EN HTML for long paragraphs left identical to Spanish.

Conservative and read-only: it detects exact untranslated blocks rather than
claiming that every page with no matches is correctly translated.
"""
import argparse
import csv
from html.parser import HTMLParser
from pathlib import Path
import json
import re
import sys
import unicodedata

ROOT = Path(__file__).resolve().parents[1]
BLOCK_TAGS = {'p', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'}
SKIP_TAGS = {'script', 'style', 'noscript', 'template', 'svg'}


def norm(value):
    return re.sub(r'\s+', ' ', unicodedata.normalize('NFKC', value)).strip()


class Blocks(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.in_main = 0
        self.skip = 0
        self.active = []
        self.blocks = []

    def handle_starttag(self, tag, attrs):
        if tag in SKIP_TAGS:
            self.skip += 1
        if tag == 'main':
            self.in_main += 1
        if tag in BLOCK_TAGS:
            self.active.append({'tag': tag, 'main': self.in_main > 0, 'parts': []})

    def handle_endtag(self, tag):
        if tag in BLOCK_TAGS:
            for i in range(len(self.active) - 1, -1, -1):
                if self.active[i]['tag'] == tag:
                    block = self.active.pop(i)
                    value = norm(' '.join(block['parts']))
                    if value:
                        self.blocks.append((block['main'], value))
                    break
        if tag in SKIP_TAGS and self.skip:
            self.skip -= 1
        if tag == 'main' and self.in_main:
            self.in_main -= 1

    def handle_data(self, data):
        if self.skip or not data.strip():
            return
        for block in self.active:
            block['parts'].append(data)


def extract(path, min_chars):
    parser = Blocks()
    parser.feed(path.read_text(encoding='utf-8', errors='replace'))
    main = [s for is_main, s in parser.blocks if is_main and len(s) >= min_chars]
    # Editorial pages sometimes use <article> without <main>.
    return set(main if main else [s for _, s in parser.blocks if len(s) >= min_chars])


def file_for(root, route):
    return root / (route.lstrip('/') + 'index.html' if route.endswith('/') else route.lstrip('/'))


def audit(dist, min_chars):
    data = json.loads((dist / 'locale-manifest.json').read_text(encoding='utf-8'))
    indexable = {r['route'] for r in data['routes'] if r.get('indexable')}
    rows = []
    for source in sorted({r['source'] for r in data['routes'] if r.get('indexable')}):
        if source.startswith(('/pt/', '/en/')):
            continue
        es_path = file_for(dist, source)
        if not es_path.is_file():
            continue
        es_blocks = extract(es_path, min_chars)
        if not es_blocks:
            continue
        for lang in ('pt', 'en'):
            route = '/' + lang + source
            if route not in indexable:
                continue
            localized_path = file_for(dist, route)
            if not localized_path.is_file():
                rows.append({'url': route, 'language': lang, 'unchanged_blocks': 'FILE_MISSING', 'source_blocks': len(es_blocks), 'sample': ''})
                continue
            unchanged = sorted(es_blocks & extract(localized_path, min_chars), key=len, reverse=True)
            if unchanged:
                rows.append({'url': route, 'language': lang, 'unchanged_blocks': len(unchanged), 'source_blocks': len(es_blocks), 'sample': unchanged[0][:240]})
    return rows


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--dist', type=Path, default=ROOT / 'dist')
    parser.add_argument('--output', type=Path, default=ROOT / 'docs/seo/QA_TRANSLATION_FALLBACKS.csv')
    parser.add_argument('--min-chars', type=int, default=120)
    parser.add_argument('--strict', action='store_true', help='Fail for 3+ unchanged long paragraphs in a localized page.')
    args = parser.parse_args()
    rows = audit(args.dist, args.min_chars)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open('w', newline='', encoding='utf-8') as fd:
        writer = csv.DictWriter(fd, fieldnames=['url', 'language', 'unchanged_blocks', 'source_blocks', 'sample'])
        writer.writeheader()
        writer.writerows(rows)
    serious = [row for row in rows if isinstance(row['unchanged_blocks'], int) and row['unchanged_blocks'] >= 3]
    print(f'Translation QA: {len(rows)} localized pages have an identical long text block; {len(serious)} have 3+; report: {args.output}')
    for row in serious[:20]:
        print(f"  {row['url']}: {row['unchanged_blocks']} identical long blocks")
    return 1 if args.strict and serious else 0


if __name__ == '__main__':
    sys.exit(main())
