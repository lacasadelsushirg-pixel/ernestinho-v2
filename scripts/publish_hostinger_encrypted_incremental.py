#!/usr/bin/env python3
"""Incremental Hostinger TUS publisher. Reads only one-time RSA/AES-GCM encrypted credentials.
Never logs auth, and never performs full-site import or changes sitemap, robots or global site.js."""
import base64, hashlib, io, json, os, pathlib, shutil, subprocess, sys, time, urllib.parse, zipfile
import requests
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives import serialization

ROOT=pathlib.Path('.')
STAGE=pathlib.Path('dist')
OUT=pathlib.Path('release-evidence')
OUT.mkdir(exist_ok=True)
ROUTES=['hospedaje','compras/feira-saens-pena','compras/mercados-populares','consejos/atardeceres-inolvidables',
'experiencias/bioparque','experiencias/vidigal','destinos/buzios','destinos/buzios/playas','cultura/nossa-senhora-paz',
'cultura/bonsucesso','cultura/capuchinhos','cultura/conceicao-boa-morte','cultura/copacabana','cultura/nossa-senhora-brasil',
'cultura/nossa-senhora-penna','cultura/nossa-senhora-saude','cultura/santa-margarida','cultura/santa-rita',
'cultura/sao-francisco-paula','cultura/sao-jose-lagoa','cultura/sao-judas',
'gastronomia/merci','gastronomia/plage-cafe','vida-nocturna/boa-praca-leblon','vida-nocturna/portela',
'vida-nocturna/yoo2','vida-nocturna/quadra-salgueiro','vida-nocturna/canastra-bar','vida-nocturna/galeria-cafe',
'gastronomia/delirio-centro','gastronomia/fiorino','gastronomia/confeitaria-manon','gastronomia/curto-cafe',
'gastronomia/casa-cave','gastronomia/galeto-liceu','gastronomia/adega-perola','gastronomia/cafe-lamas']
SHARED=['assets/css/hospedaje.css','assets/css/editorial-lote1.css','assets/js/hospedaje.js',
'assets/js/translations/editorial-lote1.js','assets/js/translations/iglesias-lote2.js',
'assets/js/translations/editorial-lote3.js','assets/js/translations/gastronomia-lote4.js']
FILES={}
for prefix in ('','pt/','en/'):
    for route in ROUTES:
        p=STAGE/prefix/route/'index.html'
        if not p.is_file(): raise RuntimeError('Missing build HTML: '+str(p))
        FILES[prefix+route+'/index.html']=p.read_bytes()
for path in SHARED:
    p=ROOT/path
    if not p.is_file():raise RuntimeError('Missing runtime resource: '+path)
    FILES[path]=p.read_bytes()
assert len(FILES)==118
assert not any(x in FILES for x in ['index.html','sitemap.xml','robots.txt','assets/js/site.js'])
print('PREPARED: '+str(len(ROUTES))+' routes x 3 + '+str(len(SHARED))+' scoped assets',flush=True)

# One ephemeral private key in runner memory / tmp. Never committed to GitHub.
if not pathlib.Path('/tmp/ec-hostinger-key.pem').is_file():
    subprocess.run(['openssl','genpkey','-algorithm','RSA','-pkeyopt','rsa_keygen_bits:3072','-out','/tmp/ec-hostinger-key.pem'],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    subprocess.run(['openssl','pkey','-in','/tmp/ec-hostinger-key.pem','-pubout','-out','/tmp/ec-hostinger-public.pem'],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
print('BEGIN_EPHEMERAL_PUBLIC_KEY',flush=True)
print(pathlib.Path('/tmp/ec-hostinger-public.pem').read_text(),end='',flush=True)
print('END_EPHEMERAL_PUBLIC_KEY',flush=True)
branch=os.environ.get('HEAD_BRANCH','seo/lote4-gastronomia-rectificaciones-20261102')
print('READY_FOR_ENCRYPTED_UPLOAD_CREDS; no remote writes until credentials delivered',flush=True)
cipher=None
for trial in range(160):
    cp=subprocess.run(['git','fetch','--quiet','origin',branch],capture_output=True,text=True)
    if cp.returncode==0:
        cp=subprocess.run(['git','show','FETCH_HEAD:.release/hostinger-upload-'+os.environ['GITHUB_RUN_ID']+'.enc'],capture_output=True,text=True)
        if cp.returncode==0 and cp.stdout.strip().startswith('{'):
            try:
                cipher=json.loads(cp.stdout)
                break
            except json.JSONDecodeError:
                pass
    time.sleep(3)
if cipher is None:raise RuntimeError('No encrypted credentials delivered; ZERO pages published')
private=serialization.load_pem_private_key(pathlib.Path('/tmp/ec-hostinger-key.pem').read_bytes(),password=None)
aes_key=private.decrypt(base64.b64decode(cipher['wrapped_key']),padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()),algorithm=hashes.SHA256(),label=None))
blob=AESGCM(aes_key).decrypt(base64.b64decode(cipher['nonce']),base64.b64decode(cipher['payload']),b'ec-incremental-20261102')
del aes_key,private,cipher
cred=json.loads(blob)
if not all(isinstance(cred.get(k),str) and cred[k] for k in ('url','auth_key','rest_auth_key')):
    raise RuntimeError('Invalid upload auth; no changes')
if not cred['url'].startswith('https://'): raise RuntimeError('Non-TLS upload URL forbidden')
print('Encrypted credentials verified (values withheld)',flush=True)

# BACK UP every existing public page and asset before any upload. Fail closed
# if there is an unexpected HTTP response or anti-bot response.
S=requests.Session()
S.headers.update({'User-Agent':'Mozilla/5.0 (compatible; ErnestinhoEditorialRelease/1.0)'})
backup={}
notfound=[]
preflight_errors=[]
for idx,(path,data) in enumerate(sorted(FILES.items()),1):
    public='https://www.ernestinhocarioca.com.br/'+urllib.parse.quote(path,safe='/')
    try:
        res=S.get(public,timeout=30,allow_redirects=True,headers={'Cache-Control':'no-cache'})
    except Exception as exc:
        preflight_errors.append((path,'connection failure '+type(exc).__name__))
        continue
    if res.status_code==200 and len(res.content)>15:
        backup[path]=res.content
    elif res.status_code==404:
        notfound.append(path)
    else:
        preflight_errors.append((path,'HTTP '+str(res.status_code)))
    if idx%30==0: print('BACKUP PREFLIGHT '+str(idx)+'/'+str(len(FILES)),flush=True)
with zipfile.ZipFile(OUT/'hostinger-previous-public-bytes.zip','w',zipfile.ZIP_DEFLATED) as z:
    for path,body in backup.items(): z.writestr(path,body)
(OUT/'preflight-summary.json').write_text(json.dumps({'existing_backed_up':len(backup),'new_files':notfound,'errors':preflight_errors},ensure_ascii=False,indent=2))
if preflight_errors:
    raise RuntimeError('Backup incomplete ('+str(len(preflight_errors))+' failed requests); ZERO new files published')
print('BACKUP COMPLETE: '+str(len(backup))+' existing, '+str(len(notfound))+' newly added',flush=True)

base=cred['url'].rstrip('/')
headers={'X-Auth':cred['auth_key'],'X-Auth-Rest':cred['rest_auth_key'],'Tus-Resumable':'1.0.0'}
def upload(path,data):
    endpoint=base+'/'+urllib.parse.quote(path,safe='/')+'?override=true'
    h=dict(headers,**{'Upload-Length':str(len(data)),'Upload-Offset':'0'})
    post=S.post(endpoint,headers=h,timeout=50)
    if post.status_code!=201:
        raise RuntimeError('TUS create failed for '+path+': HTTP '+str(post.status_code)+': '+post.text[:110])
    # Hostinger TUS API documents PATCH to the EXACT SAME URL as the POST.
    # Its Location response can point at an internal browser path that denies PATCH.
    target=endpoint
    h=dict(headers,**{'Content-Type':'application/offset+octet-stream','Upload-Offset':'0'})
    patch=S.patch(target,headers=h,data=data,timeout=70)
    if patch.status_code!=204 or (patch.headers.get('Upload-Offset') and int(patch.headers['Upload-Offset'])!=len(data)):
        raise RuntimeError('TUS patch failed for '+path+': HTTP '+str(patch.status_code)+' offset '+str(patch.headers.get('Upload-Offset')))

done=[]
manifest={'planned':len(FILES),'written':[],'verification':[],'backup':len(backup),'new_files':len(notfound)}
try:
    # Publish CSS and translation modules before the pages that load them.
    for i,(path,data) in enumerate(sorted(FILES.items(),key=lambda p:(p[0].endswith('index.html'),p[0])),1):
        upload(path,data)
        done.append(path)
        manifest['written'].append({'path':path,'sha256':hashlib.sha256(data).hexdigest()})
        if i%15==0: print('PUBLISHED '+str(i)+'/'+str(len(FILES)),flush=True)
except Exception as exc:
    print('UPLOAD FAILURE: '+str(exc)+'; attempting rollback of existing-file writes',flush=True)
    for path in reversed(done):
        if path in backup:
            try:upload(path,backup[path])
            except Exception:print('ROLLBACK FAILED: '+path,flush=True)
    manifest['error']=str(exc)
    (OUT/'release-manifest.json').write_text(json.dumps(manifest,indent=2))
    raise

# Verify the actual public pages after upload. Query string bypasses most caches.
failures=[]
for idx,(path,data) in enumerate(sorted(FILES.items()),1):
    url='https://www.ernestinhocarioca.com.br/'+urllib.parse.quote(path,safe='/')+'?ec_release=20261102'
    try:
        res=S.get(url,headers={'Cache-Control':'no-cache'},timeout=35)
        if res.status_code!=200:failures.append([path,'HTTP '+str(res.status_code)]);continue
        if path.endswith('index.html'):
            if b'<html' not in res.content:failures.append([path,'HTML missing'])
            # Verify representative unique translated strings and site tags.
            if path=='gastronomia/cafe-lamas/index.html' and '21 de octubre de 2026' not in res.text:
                failures.append([path,'Reopening paragraph missing'])
            if path=='en/gastronomia/merci/index.html' and 'Merci Secret Bar: restaurant-lounge' not in res.text:
                failures.append([path,'English SEO title missing'])
        elif hashlib.sha256(data).hexdigest()!=hashlib.sha256(res.content).hexdigest():
            failures.append([path,'Asset SHA differs (possible edge cache)'])
    except Exception as exc: failures.append([path,type(exc).__name__])
    if idx%30==0:print('VERIFY '+str(idx)+'/'+str(len(FILES)),flush=True)
manifest['verification']={'tested':len(FILES),'failed':len(failures),'examples':failures[:20]}
(OUT/'release-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
if failures:raise RuntimeError('Upload completed but public validation has '+str(len(failures))+' mismatches (check CDN cache)')
print('SUCCESS: 118 files uploaded; 111 HTML in 3 languages; 0 public verification failures',flush=True)
