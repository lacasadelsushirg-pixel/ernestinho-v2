#!/usr/bin/env python3
"""Check the three compiled food hubs against the existing restaurant source routes."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import argparse

SOURCE = Path(__file__).resolve().parents[1]
BASE = '/destinos/buzios/comer-y-salir/'
ORIGIN = 'https://www.ernestinhocarioca.com.br'
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.links=set(); self.canonical=[]; self.alternates={}; self.lang=''; self.robots=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='html': self.lang=a.get('lang','')
        if tag=='a' and a.get('href'): self.links.add(urlsplit(a['href']).path)
        if tag=='link' and a.get('rel')=='canonical': self.canonical.append(a.get('href'))
        if tag=='link' and a.get('hreflang'): self.alternates[a['hreflang']]=a.get('href')
        if tag=='meta' and a.get('name')in ('robots','googlebot'): self.robots.append(a.get('content','').lower())

def check(root):
    restaurants={BASE+p.parent.name+'/' for p in (SOURCE/BASE.lstrip('/')).glob('*/index.html')}
    failures=[]
    for prefix,lang in [('', 'es'),('/pt','pt-BR'),('/en','en')]:
        route=prefix+BASE; file=root/route.lstrip('/')/'index.html'; p=Page();p.feed(file.read_text())
        expected={prefix+r for r in restaurants}; missing=sorted(expected-p.links)
        if missing: failures.append(f'{lang}: {len(missing)} restaurant links missing: {missing[:3]}')
        if p.canonical != [ORIGIN+route]:failures.append(f'{lang}: wrong canonical')
        if p.lang != lang:failures.append(f'{lang}: wrong HTML language')
        alts={key:ORIGIN+pre+BASE for key,pre in [('es',''),('pt-BR','/pt'),('en','/en'),('x-default','')]}
        if p.alternates!=alts:failures.append(f'{lang}: incorrect hreflang cluster')
        if any('noindex' in x for x in p.robots):failures.append(f'{lang}: unexpected noindex')
        print(f'{lang}: {len(expected-p.links)} missing of {len(expected)} source restaurant routes')
    if failures:raise SystemExit('\n'.join(failures))
    print('PASS: full existing food catalogue and consistent metadata in ES/PT/EN')
if __name__=='__main__':
    args=argparse.ArgumentParser();args.add_argument('--root',type=Path,required=True);check(args.parse_args().root)
