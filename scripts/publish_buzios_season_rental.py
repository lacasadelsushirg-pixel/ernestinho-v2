"""Publish only two existing Búzios guide articles and their tab controller, preserving concurrent changes."""
import argparse,concurrent.futures,hashlib,json,pathlib,time,urllib.request,urllib.error,zipfile
ap=argparse.ArgumentParser();ap.add_argument('--release',required=True);ap.add_argument('--auth');ap.add_argument('--publish',action='store_true');a=ap.parse_args();r=pathlib.Path(a.release);stage=r/'stage';origin='https://www.ernestinhocarioca.com.br/'
assets=['assets/js/buzios-season-tabs.js','assets/js/buzios-rental-adn.js']
for rel in assets:
 target=stage/rel;target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(pathlib.Path(rel).read_bytes())
paths=assets+sorted(str(x.relative_to(stage))for x in stage.rglob('index.html'));assert len(paths)==8 and all(p in assets or any('/destinos/buzios/guia/'+s+'/index.html'in '/'+p for s in ['mes-a-mes','alquiler-auto'])for p in paths)
sha=lambda b:hashlib.sha256(b).hexdigest()
def get(p):
 for i in range(3):
  try:
   with urllib.request.urlopen(urllib.request.Request(origin+p+'?bz-guide-check='+str(time.time_ns()),headers={'Cache-Control':'no-cache'}),timeout=45)as x:return x.status,x.read()
  except urllib.error.HTTPError as e:
   if e.code==404:return 404,e.read()
   if i==2:raise
  except Exception:
   if i==2:raise
before=r/'before';before.mkdir(exist_ok=True);bp=r/'baseline.json'
if not bp.exists():
 def capture(p):
  status,b=get(p);assert status==200 or p in assets and status==404,p;dest=before/p;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(b);return {'path':p,'old':sha(b)if status==200 else None,'new':sha((stage/p).read_bytes())}
 with concurrent.futures.ThreadPoolExecutor(max_workers=3)as pool:rows=list(pool.map(capture,paths))
 bp.write_text(json.dumps(rows,indent=2))
rows=json.loads(bp.read_text());assert len(rows)==8
with zipfile.ZipFile(r/'respaldo-mes-a-mes-alquiler-auto.zip','w',zipfile.ZIP_DEFLATED)as z:
 for row in rows:
  if row['old']:
   b=(before/row['path']).read_bytes();assert sha(b)==row['old'];z.write(before/row['path'],row['path'])
print('6 existing pages backed up; two dedicated scripts; no sitemap or shared asset writes',flush=True)
if not a.publish:raise SystemExit(0)
qa=json.loads((r/'qa/results.json').read_text());assert len(qa)==12
assert all(x['width']==x['scroll']and x['nav']==1 and x['footer']==1 and not x['errors']and not x['broken']and len(x['h1'])==1 and not x['expired']for x in qa)
preserved=json.loads((r/'preservation-and-style.json').read_text());assert len(preserved)==8 and all(x.get('preserved',True)and not x.get('differences')for x in preserved)
c=json.load(open(a.auth));h={'X-Auth':c['auth_key'],'X-Auth-Rest':c['rest_auth_key'],'Tus-Resumable':'1.0.0'};manifest={'written':[],'failed':[]}
def upload(row):
 p=row['path'];b=(stage/p).read_bytes();assert sha(b)==row['new'];status,current=get(p)
 if sha(current)==row['new']:return dict(row,state='already-current')
 assert (status==200 and sha(current)==row['old'])if row['old']else status==404,'Concurrent change; preserving '+p
 u=c['url'].rstrip('/')+'/'+p+'?override=true'
 for method,body in [('POST',b''),('PATCH',b)]:
  headers=dict(h,**{'Upload-Length':str(len(b)),'Upload-Offset':'0'})
  if method=='PATCH':headers['Content-Type']='application/offset+octet-stream'
  with urllib.request.urlopen(urllib.request.Request(u,data=body,headers=headers,method=method),timeout=70)as x:
   assert x.status==(201 if method=='POST'else 204),(p,x.status)
 status,check=get(p);assert sha(check)==row['new'],'Public-byte check failed '+p
 return dict(row,state='published-and-verified')
for row in rows[:2]:
 manifest['written'].append(upload(row));(r/'publication.json').write_text(json.dumps(manifest,indent=2));print('Published controller',row['path'],flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=3)as pool:
 futures={pool.submit(upload,row):row for row in rows[2:]}
 for f in concurrent.futures.as_completed(futures):
  try:result=f.result();manifest['written'].append(result);print(result['state'],result['path'],flush=True)
  except Exception as e:manifest['failed'].append({'path':futures[f]['path'],'error':str(e)});print('FAILED',str(e),flush=True)
  (r/'publication.json').write_text(json.dumps(manifest,indent=2))
assert not manifest['failed']and len(manifest['written'])==8
