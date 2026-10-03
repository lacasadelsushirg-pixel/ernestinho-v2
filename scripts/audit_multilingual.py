#!/usr/bin/env python3
"""Audit actual generated output: reciprocal alternates, source content, links, schema."""
import json, re, sys, csv, xml.etree.ElementTree as ET
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin,urlsplit,unquote
ROOT=Path(__file__).resolve().parents[1]
DIST=ROOT/'dist'
ORIGIN='https://www.ernestinhocarioca.com.br'
class Page(HTMLParser):
    def __init__(self):
        super().__init__();self.attrs=[];self.lang=None;self.canonical=[];self.alternates={};self.meta={};self.ids=set();self.title='';self.current='';self.visible=[];self.suppressed=0;self.structured=[];self.structured_current=None
    def handle_starttag(self,tag,attrs):
        a=dict(attrs);self.attrs.append((tag,a));self.current=tag
        if tag=='html':self.lang=a.get('lang')
        if tag=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
        if tag=='link' and a.get('rel')=='alternate' and a.get('hreflang'):self.alternates[a['hreflang']]=a['href']
        if tag=='meta':self.meta[a.get('property') or a.get('name')]=a.get('content')
        if a.get('id'):self.ids.add(a['id'])
        if tag in ('script','style','noscript'):self.suppressed+=1
        if tag=='script' and a.get('type')=='application/ld+json':self.structured_current=''
    def handle_endtag(self,tag):
        if tag in ('script','style','noscript') and self.suppressed:self.suppressed-=1
        if tag=='script' and self.structured_current is not None:self.structured.append(self.structured_current);self.structured_current=None
        self.current=''
    def handle_data(self,data):
        if self.current=='title':self.title+=data
        if self.structured_current is not None:self.structured_current+=data
        if not self.suppressed and data.strip():self.visible.append(data.strip())
manifest=json.loads((DIST/'locale-manifest.json').read_text())
parsed={};errors=[];rows=[]
def add(route,error):errors.append({'route':route,'error':error})
def file_for(route):return DIST/(route.lstrip('/')+'index.html' if route.endswith('/') else route.lstrip('/'))
for r in manifest['routes']:
    p=Page();p.feed(file_for(r['route']).read_text());parsed[r['route']]=p
indexable={r['route'] for r in manifest['routes'] if r.get('indexable')}
for r in manifest['routes']:
    route=r['route'];p=parsed[route];before=len(errors)
    if r.get('redirect'):
        if not file_for(r['redirect']).exists():add(route,'Missing redirect destination')
        if p.alternates:add(route,'Redirect alias has hreflang')
        rows.append({'route':route,'language':r['language'],'indexable':False,'status':'PASS' if before==len(errors) else 'FAIL','words':len(' '.join(p.visible).split())});continue
    if p.lang!=r['lang']:add(route,'Incorrect static html lang')
    if not p.title or not p.meta.get('description'):add(route,'Empty title/description')
    for key in ['og:title','og:description','og:image','og:url']:
        if not p.meta.get(key):add(route,'Missing '+key)
    if r['indexable']:
        if p.canonical!=[ORIGIN+route]:add(route,'Canonical not self-referencing')
        source=r['source'];expected={'es':ORIGIN+source,'pt-BR':ORIGIN+'/pt'+source,'en':ORIGIN+'/en'+source,'x-default':ORIGIN+source}
        if p.alternates!=expected:add(route,'Incorrect alternate set')
        for href in p.alternates.values():
            other=href.removeprefix(ORIGIN)
            if other not in indexable:add(route,'Alternate not generated/indexable '+other)
            elif parsed[other].alternates!=expected:add(route,'Nonreciprocal hreflang '+other)
        if len(' '.join(p.visible).split())<20:add(route,'Main content not available without JavaScript')
    elif p.alternates:add(route,'Nonindexable page has hreflang')
    # Validate local href/src against the real deployment file tree.
    base=next((a['href'] for tag,a in p.attrs if tag=='base' and a.get('href')),route)
    for tag,a in p.attrs:
        for attr in (['href'] if tag in ('a','link') else ['src'] if tag in ('script','img','iframe','source','video') else []):
            raw=a.get(attr)
            if not raw or raw.startswith(('mailto:','tel:','javascript:','data:')):continue
            u=urlsplit(urljoin(ORIGIN+base,raw))
            if u.netloc!=urlsplit(ORIGIN).netloc:continue
            dest=file_for(unquote(u.path))
            if not dest.exists() and not any(u.path.startswith(prefix) for prefix in ['/api/']):add(route,'Missing local '+attr+' '+raw)
    for s in p.structured:
        try:
            data=json.loads(s)
            def check(v):
                if isinstance(v,list):
                    for child in v:check(child)
                elif isinstance(v,dict):
                    if v.get('@type') in ('WebPage','Article') and (v.get('url')!=ORIGIN+route or v.get('inLanguage')!=p.lang):add(route,'Schema WebPage locale/URL mismatch')
                    for child in v.values():
                        if isinstance(child,(dict,list)):check(child)
            check(data)
        except ValueError:add(route,'Invalid JSON-LD')
    rows.append({'route':route,'language':r['language'],'indexable':r['indexable'],'status':'PASS' if before==len(errors) else 'FAIL','words':len(' '.join(p.visible).split())})
if not manifest.get('pilot'):
    ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9','x':'http://www.w3.org/1999/xhtml'}
    sitemap=ET.parse(DIST/'sitemap.xml')
    urls=sitemap.findall('s:url',ns)
    sitemap_routes={u.find('s:loc',ns).text.removeprefix(ORIGIN) for u in urls}
    if sitemap_routes!=indexable:add('sitemap','Sitemap/indexable route set differs')
    for u in urls:
        route=u.find('s:loc',ns).text.removeprefix(ORIGIN)
        alternates={x.attrib['hreflang']:x.attrib['href'] for x in u.findall('x:link',ns)}
        if alternates!=parsed[route].alternates:add(route,'Sitemap/HTML alternates mismatch')
OUT=ROOT/'docs/seo';OUT.mkdir(exist_ok=True)
with (OUT/'QA_GENERATED_ROUTES.csv').open('w') as f:
    w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
summary={'generated':len(rows),'indexable':len(indexable),'indexable_per_language':manifest['indexablePerLanguage'],'failed':len([r for r in rows if r['status']=='FAIL']),'errors':errors,'static_content_without_javascript':True}
(OUT/'QA_GENERATED_SUMMARY.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2));print(json.dumps(summary,ensure_ascii=False,indent=2))
if errors:sys.exit(1)
