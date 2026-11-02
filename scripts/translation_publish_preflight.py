#!/usr/bin/env python3
"""Compare PR14's 118 translated outputs with ACTUAL public pages. Dry-run only."""
from pathlib import Path
import json,re,hashlib,html,collections,concurrent.futures,urllib.request,urllib.error,zipfile
root='https://www.ernestinhocarioca.com.br/'
contract=json.loads(Path('docs/seo/contrato-traducciones-59-20261102.json').read_text())
routes=[x['file'].removesuffix('index.html').strip('/') for x in contract['routes']]
assert len(routes)==59 and len(set(routes))==59
protect={'gastronomia/adega-perola','gastronomia/confeitaria-manon'}
def attr(tag,key):
 m=re.search(r'\b'+key+r'=["\x27]([^"\x27]*)["\x27]',tag,re.I);return html.unescape(m.group(1)) if m else ''
def get_body(raw):
 raw=re.sub(r'<script\b[\s\S]*?</script>|<style\b[\s\S]*?</style>','',raw,flags=re.I)
 m=re.search(r'<main\b[^>]*>([\s\S]*?)</main>',raw,re.I);return m.group(1) if m else raw
def assets(raw,name):
 return list(dict.fromkeys(x for x in (attr(m.group(0),name) for m in re.finditer(r'<(?:img|a|iframe)\b[^>]*>',get_body(raw),re.I)) if x))
def worker(item):
 route,lang=item
 uri=(lang+'/' if lang!='es' else '')+route+'/index.html'
 p=Path('dist')/uri
 if not p.is_file():return dict(uri=uri,fatal='Missing generated HTML')
 compiled=p.read_text()
 url=root+uri.removesuffix('index.html')+'?ec_translations_preflight=20261102'
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 (ErnestinhoPreservation/1.0)','Cache-Control':'no-cache'})
  with urllib.request.urlopen(req,timeout=35) as res:
   status=res.status
   live=res.read().decode('utf-8')
 except Exception as e:return dict(uri=uri,fatal='Public GET failed '+str(e)[:120])
 img_a=set(assets(live,'src'));img_b=set(assets(compiled,'src'))
 # Main-image changes are only an advisory here; exact protection will be chosen after reviewing results.
 missingImgs=sorted(img_a-img_b)
 href_a=set(assets(live,'href'));href_b=set(assets(compiled,'href'))
 missingLinks=sorted(x for x in href_a-href_b if not x.startswith('#'))
 protected=route in protect
 return dict(uri=uri,route=route,lang=lang,status=status,protected=protected,
  liveBytes=len(live),newBytes=len(compiled),same=(live==compiled),
  liveImages=len(img_a),newImages=len(img_b),missingImages=missingImgs[:15],missingImageCount=len(missingImgs),
  liveMainLinks=len(href_a),newMainLinks=len(href_b),missingLinks=missingLinks[:15],
  missingLinkCount=len(missingLinks),liveMainChars=len(get_body(live)),
  newMainChars=len(get_body(compiled)),sha256_old=hashlib.sha256(live.encode()).hexdigest(),
  sha256_new=hashlib.sha256(compiled.encode()).hexdigest(),
  hasRecentEditorial='ec-research4' in live,
  hasSeasonalNotice='ec-transfer-season-alert' in live)
items=[(route,lang) for route in routes for lang in ('pt','en')]
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
 results=list(ex.map(worker,items))
results.sort(key=lambda z:z['uri'])
fatal=[x for x in results if x.get('fatal')]
protectConflicts=[x for x in results if x.get('protected')]
changes=[x for x in results if x.get('missingImageCount') or x.get('missingLinkCount')]
report={'summary':{'routes':len(routes),'candidates':len(items),'compared':len(results)-len(fatal),
'errors':len(fatal),'protected':len(protectConflicts),'urlContentDifferences':sum(not x.get('same',False) for x in results),
'photoOrLinkDifferences':len(changes),'newEditorialOverlap':sum(x.get('hasRecentEditorial',False) for x in results)},
'protected':protectConflicts,'errors':fatal,'preservation_differences':changes,
'files':results}
Path('preflight-pt-en-live-vs-pr14.json').write_text(json.dumps(report,indent=2,ensure_ascii=False))
print('PUBLICATION PREFLIGHT',json.dumps(report['summary'],ensure_ascii=False))
print('IMAGE/LINK DIFFERENCES EXAMPLES',json.dumps(changes[:8],ensure_ascii=False)[:5000])
if fatal:raise SystemExit('STOP: cannot back up all 118 published files')
