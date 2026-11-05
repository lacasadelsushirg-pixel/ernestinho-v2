"""Publish only the reviewed Búzios release plan, with per-file concurrency protection."""
import argparse,pathlib,json,hashlib,urllib.parse,concurrent.futures,requests,zipfile
ap=argparse.ArgumentParser();ap.add_argument('--release',required=True);ap.add_argument('--auth',required=True);ap.add_argument('--publish',action='store_true');args=ap.parse_args()
r=pathlib.Path(args.release);plan=json.loads((r/'release-plan.json').read_text());stage=r/'stage'
assert len([x for x in plan if x.get('photo')])==3
assert all(x['path'].startswith(('assets/','destinos/buzios/','pt/destinos/buzios/','en/destinos/buzios/'))for x in plan)
cred=json.loads(pathlib.Path(args.auth).read_text());assert cred['url'].startswith('https://')
origin='https://www.ernestinhocarioca.com.br/'
def sha(b):return hashlib.sha256(b).hexdigest()
def fetch(p):
 res=requests.get(origin+urllib.parse.quote(p,safe='/'),timeout=45,headers={'Cache-Control':'no-cache','User-Agent':'Ernestinho-Buzios-Incremental/1.0'})
 return res
with zipfile.ZipFile(r/'rollback-buzios-parity.zip','w',zipfile.ZIP_DEFLATED)as z:
 for row in plan:
  p=r/'before'/row['path']
  if row['old']:
   assert p.is_file() and sha(p.read_bytes())==row['old'],row['path'];z.write(p,row['path'])
print('Backup verified:',sum(bool(x['old'])for x in plan),'existing files; scoped plan:',len(plan),flush=True)
if not args.publish:raise SystemExit('Dry run; zero remote writes')
qa=json.loads((r/'qa-release/results.json').read_text())
qa_shell={(x['path'],x['width']):x for x in json.loads((r/'qa-shell/results.json').read_text())}
for x in json.loads((r/'qa-wrap/results.json').read_text()):qa_shell[(x['path'],x['width'])]=x
assert len(qa_shell)==84
qa+=list(qa_shell.values())
assert not any(x['scroll']>x['width'] or x['errors'] or ('/destinos/buzios/' in x['path']and(x['nav']!=1 or x['footer']!=1))or('/destinos/buzios/fotografias/' in x['path']and(x['cards']!=12 or x['broken'])) for x in qa),'QA failed'
manifest={'written':[],'failed':[],'planned':len(plan)}
manifestpath=r/'publication.json'
def save():manifestpath.write_text(json.dumps(manifest,indent=2))
headers={'X-Auth':cred['auth_key'],'X-Auth-Rest':cred['rest_auth_key'],'Tus-Resumable':'1.0.0'}
def put(row):
 p=row['path'];body=(stage/p).read_bytes();current=fetch(p)
 if current.status_code==200 and sha(current.content)==sha(body):return {'path':p,'sha256':sha(body),'state':'already-current'}
 if row['old']:
  if current.status_code!=200 or sha(current.content)!=row['old']:raise RuntimeError('Concurrent change; refusing to replace '+p)
 elif current.status_code!=404:raise RuntimeError('New-file preflight expected 404: '+p+' HTTP '+str(current.status_code))
 endpoint=cred['url'].rstrip('/')+'/'+urllib.parse.quote(p,safe='/')+'?override=true'
 h=dict(headers,**{'Upload-Length':str(len(body)),'Upload-Offset':'0'})
 res=requests.post(endpoint,headers=h,timeout=50)
 if res.status_code!=201:raise RuntimeError('Upload create HTTP '+str(res.status_code)+' '+p)
 h=dict(headers,**{'Content-Type':'application/offset+octet-stream','Upload-Offset':'0'})
 res=requests.patch(endpoint,headers=h,data=body,timeout=70)
 if res.status_code!=204 or int(res.headers.get('Upload-Offset','-1'))!=len(body):raise RuntimeError('Upload incomplete '+p+' HTTP '+str(res.status_code))
 check=fetch(p)
 if check.status_code!=200 or sha(check.content)!=sha(body):raise RuntimeError('Post-upload verification failed '+p)
 return {'path':p,'sha256':sha(body),'state':'published-and-verified'}
assets=[x for x in plan if x['group']=='00-assets']
order=['assets/css/buzios-photography.css','assets/js/buzios-photography.js','assets/js/buzios-taxonomy.js','assets/css/buzios.css','assets/js/buzios-shell.js']
assets.sort(key=lambda x:order.index(x['path'])if x['path']in order else 20)
try:
 for x in assets:
  manifest['written'].append(put(x));save();print('ASSET',x['path'],flush=True)
 groups=sorted(set(x['group']for x in plan)-{'00-assets'},key=lambda x:(x!='fotografias',x))
 for group in groups:
  rows=[x for x in plan if x['group']==group]
  # Every HTML replacement preserves its published body/SEO except the reviewed photography pages.
  with concurrent.futures.ThreadPoolExecutor(max_workers=3)as pool:
   for result in pool.map(put,rows):manifest['written'].append(result);save()
  print('SECTION VERIFIED',group,len(rows),'total',len(manifest['written']),flush=True)
except Exception as exc:
 manifest['failed'].append(str(exc));save();raise
save();print('COMPLETE',len(manifest['written']),flush=True)
