"""Incremental Hostinger publication for the reviewed Búzios advice and guide routes."""
import pathlib,json,hashlib,requests,threading,concurrent.futures,time,urllib.parse,zipfile,xml.etree.ElementTree as ET,argparse
ap=argparse.ArgumentParser();ap.add_argument('--release',required=True);ap.add_argument('--auth',required=True);ap.add_argument('--publish',action='store_true');ap.add_argument('--resume');args=ap.parse_args()
r=pathlib.Path(args.release).resolve();repo=pathlib.Path('.').resolve();stage=r/'stage';stage.mkdir(exist_ok=True);baseline=json.load(open(r/'baseline.json'));routes=json.load(open(r/'routes.json'));plan=[]
def sha(b):return hashlib.sha256(b).hexdigest()
for row in baseline:
 p=row['path']
 if p=='sitemap.xml':continue
 source=repo/'dist'/p if p.endswith('/index.html')else repo/p
 assert source.is_file(),p
 dst=stage/p;dst.parent.mkdir(parents=True,exist_ok=True);dst.write_bytes(source.read_bytes());plan.append(dict(row,new=sha(dst.read_bytes())))
origin='https://www.ernestinhocarioca.com.br'
old=(r/'before/sitemap.xml').read_bytes();xml=old.decode();existing={x.text for x in ET.fromstring(xml).findall('{*}url/{*}loc')};add=[]
newroutes=[route for route in routes if route not in ['/destinos/buzios/consejos/','/destinos/buzios/guia/']]
for route in newroutes:
 for prefix in ['','/pt','/en']:
  url=origin+prefix+route
  if url in existing:continue
  alternates=''.join('<xhtml:link rel="alternate" hreflang="'+lang+'" href="'+origin+pre+route+'"/>'for lang,pre in [('es',''),('pt-BR','/pt'),('en','/en'),('x-default','')])
  add.append('<url><loc>'+url+'</loc><lastmod>2026-11-05</lastmod>'+alternates+'</url>')
assert len(add)==27,(len(add),'Unexpected sitemap route state')
newxml=xml.replace('</urlset>',''.join(add)+'</urlset>');ET.fromstring(newxml);assert newxml.replace(''.join(add),'')==xml
(stage/'sitemap.xml').write_text(newxml);plan.append(dict(next(x for x in baseline if x['path']=='sitemap.xml'),new=sha((stage/'sitemap.xml').read_bytes())))
(r/'release-plan.json').write_text(json.dumps(plan,indent=2))
with zipfile.ZipFile(r/'respaldo-previo-consejos-guia.zip','w',zipfile.ZIP_DEFLATED)as z:
 for row in baseline:
  if row['old']:assert sha((r/'before'/row['path']).read_bytes())==row['old'];z.write(r/'before'/row['path'],row['path'])
print('PREPARED',len(plan),'files; 27 new sitemap URLs; 7 existing files backed up',flush=True)
if not args.publish:raise SystemExit(0)
qa=json.load(open(r/'qa-final.json'));own=[x for x in qa if not x['master']];assert len(own)==66
assert all(x['width']==x['scroll']and x['nav']==1 and x['footer']==1 and not x['errors']and not x['broken']and not x.get('styleDifferences')for x in own),'QA failed'
assert all(x['questions']==50 for x in own if x['key']=='50-preguntas')
assert all(x['tips']==20 for x in own if x['key']=='20-consejos')
cred=json.load(open(args.auth));assert cred['url'].startswith('https://');auth={'X-Auth':cred['auth_key'],'X-Auth-Rest':cred['rest_auth_key'],'Tus-Resumable':'1.0.0'};local=threading.local()
def session():
 if not hasattr(local,'s'):local.s=requests.Session()
 return local.s
def get(p):
 for attempt in range(3):
  try:
   res=session().get(origin+'/'+p+'?ec-advice-check='+str(time.time_ns()),timeout=45,headers={'Cache-Control':'no-cache'})
   if res.status_code in [200,404]:return res
  except requests.RequestException:
   if attempt==2:raise
 raise RuntimeError('Cannot read '+p)
manifest={'planned':len(plan),'written':[],'errors':[],'sitemap_added':27};mp=r/'publication.json'
if args.resume:
 previous=json.load(open(args.resume))
 for row in previous['written']:
  assert row['sha256']==next(x['new']for x in plan if x['path']==row['path']);manifest['written'].append(row)
completed={x['path']for x in manifest['written']}
def save():mp.write_text(json.dumps(manifest,indent=2))
def upload(row):
 p=row['path'];b=(stage/p).read_bytes();current=get(p)
 if current.status_code==200 and sha(current.content)==row['new']:return {'path':p,'sha256':row['new'],'state':'already-current'}
 if row['old']:
  if current.status_code!=200 or sha(current.content)!=row['old']:raise RuntimeError('Concurrent change; preserved '+p)
 elif current.status_code!=404:raise RuntimeError('New target exists; preserved '+p)
 endpoint=cred['url'].rstrip('/')+'/'+urllib.parse.quote(p,safe='/')+'?override=true'
 a=session().post(endpoint,headers=dict(auth,**{'Upload-Length':str(len(b)),'Upload-Offset':'0'}),timeout=70)
 if a.status_code!=201:raise RuntimeError('TUS create '+p+' HTTP '+str(a.status_code))
 a=session().patch(endpoint,headers=dict(auth,**{'Upload-Offset':'0','Content-Type':'application/offset+octet-stream'}),data=b,timeout=90)
 if a.status_code!=204 or int(a.headers.get('Upload-Offset','-1'))!=len(b):raise RuntimeError('TUS incomplete '+p)
 for attempt in range(4):
  check=get(p)
  if check.status_code==200 and sha(check.content)==row['new']:return {'path':p,'sha256':row['new'],'state':'published-and-verified'}
  time.sleep(1)
 raise RuntimeError('Public-byte verification failed '+p)
try:
 # Dependencies first, then articles, hubs and finally the sitemap.
 assets=sorted([x for x in plan if x['path'].startswith('assets/')],key=lambda x:(x['path'].endswith('.js'),x['path']))
 for row in assets:
  if row['path']not in completed:manifest['written'].append(upload(row));save();print('RESOURCE',row['path'],flush=True)
 with concurrent.futures.ThreadPoolExecutor(max_workers=3)as pool:
  for old in [False,True]:
   rows=[x for x in plan if x['path'].endswith('/index.html')and bool(x['old'])==old and x['path']not in completed]
   for result in pool.map(upload,rows):manifest['written'].append(result);save();print('PAGE',result['path'],len(manifest['written']),flush=True)
 row=next(x for x in plan if x['path']=='sitemap.xml')
 if row['path']not in completed:manifest['written'].append(upload(row));save()
except Exception as exc:manifest['errors'].append(str(exc));save();raise
print('COMPLETE',len(manifest['written']),flush=True)
