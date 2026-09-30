#!/usr/bin/env python3
"""Inventory protected media/embedded/affiliate assets in Rio Guide and Consejo pages.

Usage:
  python3 tools/guide-assets-audit.py --write   # intentionally refresh the baseline
  python3 tools/guide-assets-audit.py           # report regressions against baseline
  python3 tools/guide-assets-audit.py --allowlist tools/guide-assets-allowlist.json
"""
from __future__ import annotations
import argparse, json, re, sys
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / 'tools' / 'guide-assets-manifest.json'
DEFAULT_ALLOWLIST = ROOT / 'tools' / 'guide-assets-allowlist.json'
AFFILIATE_HOSTS = ('airalo.com', 'rentcars.com', 'assistcard.com', 'booking.com', 'getyourguide.com', 'viator.com', 'agoda.com', 'expedia.com', 'trip.com')
AFFILIATE_WORDS = ('airalo', 'rentcars', 'assist card', 'assistcard', 'afiliado', 'affiliate')
MAP_WORDS = ('google.com/maps', 'maps.google', 'openstreetmap.org', 'mapbox.com', 'maps.app.goo.gl')
VIDEO_WORDS = ('youtube.com', 'youtu.be', 'vimeo.com', 'player.vimeo.com')


def classify_url(url: str, tag: str = '') -> str | None:
    low = url.lower()
    host = urlparse(low).netloc
    if tag == 'img':
        return 'banner' if 'banner' in low else 'image'
    if tag in ('iframe', 'embed', 'object'):
        if any(word in low for word in MAP_WORDS): return 'map'
        if any(word in low for word in VIDEO_WORDS): return 'video'
        return 'widget'
    if tag == 'video': return 'video'
    if tag == 'source': return 'video'
    if tag == 'a':
        if any(word in low for word in MAP_WORDS): return 'map'
        if any(word in low for word in VIDEO_WORDS): return 'video'
        if any(word in low for word in AFFILIATE_HOSTS): return 'affiliate'
        if any(word in low for word in AFFILIATE_WORDS): return 'affiliate'
        return None
    return None

class Extractor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.items = Counter()
        self.anchor_text = []
        self.anchor_href = ''
        self.script_id = ''
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'a':
            self.anchor_href = a.get('href', '')
            self.anchor_text = []
        if tag == 'script': self.script_id = a.get('id', '')
        element_id = a.get('id', '')
        if element_id and (element_id.lower().endswith('-widget') or element_id in ('pix-data','stay-data','month-data')):
            self.items[('widget', '#' + element_id)] += 1
        attrs_to_check = []
        if tag == 'img': attrs_to_check = [('src', 'image'), ('srcset', 'image')]
        elif tag in ('iframe','embed','object'): attrs_to_check = [('src','frame'),('data','frame')]
        elif tag == 'video': attrs_to_check = [('src','video'),('poster','img')]
        elif tag == 'source': attrs_to_check = [('src','source'),('srcset','source')]
        for attr, kind in attrs_to_check:
            val = a.get(attr, '')
            if not val: continue
            # Keep every URL in srcset; data URLs are not stable external assets.
            vals = [x.strip().split()[0] for x in val.split(',')] if attr == 'srcset' else [val.strip()]
            for url in vals:
                if url.startswith('data:') or url.startswith('#'): continue
                category = classify_url(url, tag if kind in ('image','img') else ('video' if kind in ('video','source') else 'iframe'))
                if category: self.items[(category, url)] += 1
    def handle_data(self, data):
        if self.anchor_href: self.anchor_text.append(data)
        if self.script_id and self.script_id in ('application/json', 'stay-data', 'month-data', 'pix-data'):
            pass
        # Preserve known third-party widget endpoints embedded in inline loaders.
        if 'airalo-widget' in data:
            for endpoint in re.findall(r"""https://[A-Za-z0-9.-]+/[^'\" ]*""", data):
                if 'tpembd.com/content' in endpoint:
                    self.items[('widget', endpoint)] += 1
    def handle_endtag(self, tag):
        if tag == 'script': self.script_id = ''
        if tag == 'a' and self.anchor_href:
            href = self.anchor_href.strip()
            label = ' '.join(self.anchor_text).lower()
            parsed = urlparse(href.lower())
            query = parsed.query.lower()
            rel_affiliate = any(w in label for w in AFFILIATE_WORDS) or any(h in parsed.netloc for h in AFFILIATE_HOSTS) or bool(re.search(r'(^|[&;])(aff|affiliate|ref|refid|tag|partner|clickid)=', query))
            cat = classify_url(href, 'a')
            if cat == 'map': self.items[(cat, href)] += 1
            elif rel_affiliate and href and not href.startswith(('mailto:', 'tel:', 'javascript:')): self.items[('affiliate', href)] += 1
            self.anchor_href = ''; self.anchor_text = []

def pages():
    found = []
    for folder in ('guia', 'consejos'):
        for p in sorted((ROOT / folder).rglob('*.html')):
            found.append(p.relative_to(ROOT).as_posix())
    return found

def collect():
    data = {}
    for rel in pages():
        parser = Extractor()
        parser.feed((ROOT / rel).read_text(encoding='utf-8', errors='replace'))
        data[rel] = [{'type': t, 'url': u, 'count': n} for (t,u),n in sorted(parser.items.items())]
    return data

def main():
    ap=argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--write', action='store_true', help='refresh baseline from the current tree')
    ap.add_argument('--allowlist', type=Path, help='JSON array of approved removals: {page,type,url}')
    args=ap.parse_args()
    current=collect()
    if args.write:
        try: commit=__import__('subprocess').check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip()
        except Exception: commit='unknown'
        payload={'schema':1,'baseline_commit':commit,'scope':'all guia/**/*.html and consejos/**/*.html','pages':current}
        MANIFEST.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
        print(f'Baseline updated: {MANIFEST.relative_to(ROOT)} ({len(current)} pages, {sum(len(x) for x in current.values())} protected asset/link records)')
        return 0
    if not MANIFEST.exists():
        print(f'Missing baseline: {MANIFEST.relative_to(ROOT)}. Generate intentionally with --write.',file=sys.stderr); return 2
    baseline=json.loads(MANIFEST.read_text(encoding='utf-8')).get('pages',{})
    allow=set()
    allowlist_path = args.allowlist or DEFAULT_ALLOWLIST
    if allowlist_path.exists():
        for row in json.loads(allowlist_path.read_text(encoding='utf-8')):
            allow.add((row['page'],row['type'],row['url']))
    removed=[]; approved=[]; added=[]
    for page, old_rows in baseline.items():
        old=Counter({(r['type'],r['url']):r['count'] for r in old_rows})
        now=Counter({(r['type'],r['url']):r['count'] for r in current.get(page,[])})
        for (typ,url),n in (old-now).items():
            row=(page,typ,url)
            (approved if row in allow else removed).append((page,typ,url,n))
        for (typ,url),n in (now-old).items(): added.append((page,typ,url,n))
    for page in sorted(set(current)-set(baseline)):
        added.extend((page,r['type'],r['url'],r['count']) for r in current[page])
    print(f'Guide asset audit: {len(current)} current pages; baseline covers {len(baseline)} pages.')
    print(f'Protected records added: {len(added)}; approved removals: {len(approved)}; unapproved removals: {len(removed)}.')
    for page,typ,url,n in removed: print(f'REGRESSION {page} [{typ}] x{n}: {url}')
    for page,typ,url,n in approved: print(f'ALLOWLISTED {page} [{typ}] x{n}: {url}')
    if removed: print('FAIL: investigate each regression. For deliberate removals, review and add the exact page/type/url to the allowlist before integration.'); return 1
    if approved: print('PASS WITH REVIEW: intentional removals are allowlisted and clearly listed above.')
    else: print('PASS: no protected baseline assets or affiliate/map/video links were removed.')
    return 0
if __name__=='__main__': raise SystemExit(main())
