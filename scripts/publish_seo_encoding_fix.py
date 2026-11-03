#!/usr/bin/env python3
"""Fix ONLY 91 mojibake strings in the 37-route SEO release block on public Hostinger JS.
Backs up actual production bytes and refuses unexpected concurrent changes."""
import base64,hashlib,json,os,pathlib,re,subprocess,time,urllib.parse,zipfile
import requests
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes,serialization
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
ROOT='https://www.ernestinhocarioca.com.br/'
PATH='assets/js/seo-metadata.js'
START='// BEGIN_EDITORIAL_RELEASE_META_20261102'
END='// END_EDITORIAL_RELEASE_META_20261102'
REGEX=re.compile(r'(// BEGIN_EDITORIAL_RELEASE_META_20261102\s*Object\.assign\(SEO_METADATA,\s*)(\{[\s\S]*?\})(\);\s*// END_EDITORIAL_RELEASE_META_20261102)')
DEST=pathlib.Path('seo-encoding-publication-evidence'); DEST.mkdir(exist_ok=True)
source=pathlib.Path(PATH).read_text()
src=REGEX.search(source)
assert src,'GitHub source missing scoped SEO release'
clean=json.loads(src.group(2)); assert len(clean)==37
assert all(not any(mark in str(v) for mark in ('Ã','â\x80','Â')) for v in clean.values()),'Source still corrupt'
session=requests.Session();session.headers['User-Agent']='Mozilla/5.0 (ErnestinhoSEOEncodingFix/1.0)'
resp=session.get(ROOT+PATH+'?ec_before_fix=20261102',headers={'Cache-Control':'no-cache'},timeout=45)
assert resp.status_code==200 and len(resp.content)>10000,'Cannot back up production SEO JS'
original=resp.content
live=original.decode('utf-8')
lm=REGEX.search(live)
assert lm,'Unexpected public JS; no write'
old=json.loads(lm.group(2));assert set(old)==set(clean),'Production route set changed; no write'
expected=0
def decoded(t):
 if not any(x in t for x in ('Ã','Â','â\x80')):return t
 try:return bytes(ord(char) for char in t).decode('utf-8')
 except Exception as ex:raise RuntimeError('Mixed encoding in public SEO field') from ex
for route in sorted(old):
 for lang in ('ES','PT','EN'):
  assert lang in old[route] and lang in clean[route],route
  for i in (0,1):
   orig=old[route][lang][i];target=clean[route][lang][i]
   if orig!=target:
    if decoded(orig)!=target:raise RuntimeError('Live SEO metadata diverged unexpectedly: '+route+' '+lang)
    expected+=1
assert expected==91,('Unexpected number of character repairs',expected)
updated=live[:lm.start(2)]+json.dumps(clean,ensure_ascii=False,separators=(',',':'))+live[lm.end(2):]
assert updated!=live and updated[:lm.start(2)]==live[:lm.start(2)]
assert updated.endswith(live[lm.end(2):]),'Non-meta modifications detected'
with zipfile.ZipFile(DEST/'original-public-seo-js-backup.zip','w',zipfile.ZIP_DEFLATED) as z:
 z.writestr(PATH,original)
(DEST/'planned-fix.json').write_text(json.dumps({'paths':[PATH],'routes':37,'corrected_fields':expected,'original_sha256':hashlib.sha256(original).hexdigest(),'new_sha256':hashlib.sha256(updated.encode()).hexdigest()},indent=2))
check=DEST/'seo-metadata.fixed.mjs';check.write_text(updated)
test=subprocess.run(['node','--check',str(check)],capture_output=True,text=True)
if test.returncode:raise RuntimeError('JS syntax check failed: '+test.stderr[:250])
print('BACKUP VERIFIED; source reconciled with production; 91 encodings fixed in memory',flush=True)
private=pathlib.Path('/tmp/ec-index-seo-key.pem')
branch=os.environ.get('HEAD_BRANCH','seo/gsc-insights-encoding-fix-20261102')
runid=os.environ['GITHUB_RUN_ID']
sealed=None
for _ in range(150):
 pull=subprocess.run(['git','fetch','--quiet','origin',branch],capture_output=True,text=True)
 if pull.returncode==0:
  read=subprocess.run(['git','show','FETCH_HEAD:.release/seo-index-'+runid+'.enc'],capture_output=True,text=True)
  if read.returncode==0 and read.stdout.strip().startswith('{'):
   try:sealed=json.loads(read.stdout);break
   except ValueError:pass
 time.sleep(3)
if sealed is None:raise RuntimeError('No one-time credentials, ZERO writes')
priv=serialization.load_pem_private_key(private.read_bytes(),password=None)
key=priv.decrypt(base64.b64decode(sealed['wrapped_key']),padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()),algorithm=hashes.SHA256(),label=None))
creds=json.loads(AESGCM(key).decrypt(base64.b64decode(sealed['nonce']),base64.b64decode(sealed['payload']),b'ec-seo-index-fix-20261102'))
assert creds['url'].startswith('https://') and creds['auth_key'] and creds['rest_auth_key']
h={'Tus-Resumable':'1.0.0','X-Auth':creds['auth_key'],'X-Auth-Rest':creds['rest_auth_key']}
endpoint=creds['url'].rstrip('/')+'/'+PATH+'?override=true'
data=updated.encode('utf-8')
reply=session.post(endpoint,headers={**h,'Upload-Length':str(len(data)),'Upload-Offset':'0'},timeout=50)
if reply.status_code!=201:raise RuntimeError('TUS start failed '+str(reply.status_code))
reply=session.patch(endpoint,headers={**h,'Content-Type':'application/offset+octet-stream','Upload-Offset':'0'},data=data,timeout=75)
if reply.status_code!=204:raise RuntimeError('TUS upload failed '+str(reply.status_code))
print('PUBLISHED scoped SEO metadata encoding patch',flush=True)
verified=False
for attempt in range(10):
 fresh=session.get(ROOT+PATH+'?ec_qa_encoding='+str(attempt)+'_20261102',headers={'Cache-Control':'no-cache'},timeout=40)
 if fresh.status_code==200:
  block=REGEX.search(fresh.text)
  if block and json.loads(block.group(2))==clean and len(fresh.content)>10000:
   verified=True
   break
 time.sleep(3)
(DEST/'release-proof.json').write_text(json.dumps({'published':True,'verified':verified,'route_count':37,'fields_corrected':expected,'original_sha256':hashlib.sha256(original).hexdigest(),'uploaded_sha256':hashlib.sha256(data).hexdigest()},indent=2))
if not verified:raise RuntimeError('Public metadata not verified after TUS upload; check CDN cache')
print('SUCCESS 37 routes x ES/PT/EN: 91 fields repaired; live JS verified',flush=True)
