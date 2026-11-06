#!/usr/bin/env python3
"""Patch ONLY public assets/js/seo-metadata.js using current live version, preserving every other field.
Ephemeral RSA/AES-GCM credential handoff, original bytes backup, syntax check, TUS and verification."""
import base64,hashlib,html,json,os,pathlib,re,subprocess,time,urllib.parse
import requests
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives import serialization
routes=[
'hospedaje','compras/feira-saens-pena','compras/mercados-populares','consejos/atardeceres-inolvidables',
'experiencias/bioparque','experiencias/vidigal','destinos/buzios','destinos/buzios/playas','cultura/nossa-senhora-paz',
'cultura/bonsucesso','cultura/capuchinhos','cultura/conceicao-boa-morte','cultura/copacabana',
'cultura/nossa-senhora-brasil','cultura/nossa-senhora-penna','cultura/nossa-senhora-saude',
'cultura/santa-margarida','cultura/santa-rita','cultura/sao-francisco-paula','cultura/sao-jose-lagoa',
'cultura/sao-judas','gastronomia/merci','gastronomia/plage-cafe','vida-nocturna/boa-praca-leblon',
'vida-nocturna/portela','vida-nocturna/yoo2','vida-nocturna/quadra-salgueiro','vida-nocturna/canastra-bar',
'vida-nocturna/galeria-cafe','gastronomia/delirio-centro','gastronomia/fiorino','gastronomia/confeitaria-manon',
'gastronomia/curto-cafe','gastronomia/casa-cave','gastronomia/galeto-liceu',
'gastronomia/adega-perola','gastronomia/cafe-lamas'
]
assert len(routes)==37
stage=pathlib.Path('release-evidence-seo')
stage.mkdir(exist_ok=True)
session=requests.Session();session.headers['User-Agent']='Mozilla/5.0 (compatible; ErnestinhoEditorialSEORelease/1.0)'
root='https://www.ernestinhocarioca.com.br/'
meta={}
for i,route in enumerate(routes,1):
    langs={}
    for label,prefix in (('ES',''),('PT','pt/'),('EN','en/')):
        path=prefix+route+'/'
        res=session.get(root+path+'?ec_meta_release=20261102',timeout=30,headers={'Cache-Control':'no-cache'})
        if res.status_code!=200:raise RuntimeError('Preflight '+str(res.status_code)+' '+path)
        source=res.text
        title=re.search(r'<title[^>]*>([\s\S]*?)</title>',source,re.I)
        tags=re.findall(r'<meta\b[^>]*>',source,re.I)
        descriptions=[tag for tag in tags if re.search(r'\bname\s*=\s*["\x27]description["\x27]',tag,re.I)]
        if not title or not descriptions:raise RuntimeError('Missing title/description '+path)
        m=re.search(r'\bcontent\s*=\s*["\x27]([^"\x27]*)["\x27]',descriptions[0],re.I)
        if not m:raise RuntimeError('Missing description content '+path)
        t=html.unescape(re.sub(r'<[^>]+>','',title.group(1))).strip()
        d=html.unescape(m.group(1)).strip()
        if not t or not d or len(t)>250 or len(d)>500:raise RuntimeError('Invalid metadata '+path)
        langs[label]=[t,d]
    meta['/'+route+'/']=langs
    if i%10==0:print('META PREFLIGHT '+str(i)+'/37',flush=True)
assert len(meta)==37 and all(set(v)=={'ES','PT','EN'} for v in meta.values())
original=session.get(root+'assets/js/seo-metadata.js?ec_backup=20261102',timeout=45,
                     headers={'Cache-Control':'no-cache'})
if original.status_code!=200 or len(original.content)<10000:
    raise RuntimeError('Cannot back up current production SEO module; ZERO changes')
stage.joinpath('seo-metadata-before-release.js').write_bytes(original.content)
text=original.content.decode('utf-8')
if 'export const SEO_METADATA = {' not in text or 'export function applySeoMetadata' not in text:
    raise RuntimeError('Unrecognized production JS; ZERO changes')
start='// BEGIN_EDITORIAL_RELEASE_META_20261102'
end='// END_EDITORIAL_RELEASE_META_20261102'
if start in text:
    pattern=re.escape(start)+r'[\s\S]*?'+re.escape(end)
    text=re.sub(pattern,'',text)
block='\n'+start+'\nObject.assign(SEO_METADATA, '+json.dumps(meta,ensure_ascii=False,separators=(',',':'))+');\n'+end+'\n'
text=text.replace('export function applySeoMetadata',block+'\nexport function applySeoMetadata',1)
path=stage/'seo-metadata-patched.js'
path.write_text(text)
check=subprocess.run(['node','--check',str(path)],capture_output=True,text=True)
if check.returncode:raise RuntimeError('Syntax check failed; ZERO changes: '+check.stderr[:400])
print('PATCH PREPARED: 37 routes, 111 localized SEO title/description pairs, production source backed up',flush=True)

# Authentication uses a one-time encrypted file named for this exact Actions run.
private=pathlib.Path('/tmp/ec-hostinger-seo-private.pem')
public=pathlib.Path('/tmp/ec-hostinger-seo-public.pem')
if not private.is_file():
    subprocess.run(['openssl','genpkey','-algorithm','RSA','-pkeyopt','rsa_keygen_bits:3072','-out',str(private)],check=True,stderr=subprocess.DEVNULL)
    subprocess.run(['openssl','pkey','-in',str(private),'-pubout','-out',str(public)],check=True,stderr=subprocess.DEVNULL)
print('READY_FOR_SEALED_SEO_CREDENTIALS',flush=True)
branch=os.environ.get('HEAD_BRANCH','seo/lote4-gastronomia-rectificaciones-20261102')
run_id=os.environ['GITHUB_RUN_ID']
sealed=None
for i in range(150):
    cp=subprocess.run(['git','fetch','--quiet','origin',branch],capture_output=True,text=True)
    if cp.returncode==0:
        cp=subprocess.run(['git','show','FETCH_HEAD:.release/hostinger-seo-'+run_id+'.enc'],capture_output=True,text=True)
        if cp.returncode==0 and cp.stdout.strip().startswith('{'):
            try:sealed=json.loads(cp.stdout);break
            except json.JSONDecodeError:pass
    time.sleep(3)
if sealed is None:raise RuntimeError('No encrypted credentials for run; ZERO changes')
key=serialization.load_pem_private_key(private.read_bytes(),password=None)
aes=key.decrypt(base64.b64decode(sealed['wrapped_key']),padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()),algorithm=hashes.SHA256(),label=None))
cred=json.loads(AESGCM(aes).decrypt(base64.b64decode(sealed['nonce']),base64.b64decode(sealed['payload']),b'ec-seo-release-20261102'))
assert cred['url'].startswith('https://') and cred['auth_key'] and cred['rest_auth_key']
print('One-time encrypted credentials accepted',flush=True)
target='assets/js/seo-metadata.js'
url=cred['url'].rstrip('/')+'/'+target+'?override=true'
headers={'X-Auth':cred['auth_key'],'X-Auth-Rest':cred['rest_auth_key'],'Tus-Resumable':'1.0.0'}
data=text.encode()
s=session.post(url,headers={**headers,'Upload-Length':str(len(data)),'Upload-Offset':'0'},timeout=50)
if s.status_code!=201:raise RuntimeError('TUS POST failed HTTP '+str(s.status_code))
s=session.patch(url,headers={**headers,'Content-Type':'application/offset+octet-stream','Upload-Offset':'0'},data=data,timeout=80)
if s.status_code!=204 or (s.headers.get('Upload-Offset') and int(s.headers['Upload-Offset'])!=len(data)):
    raise RuntimeError('TUS PATCH failed HTTP '+str(s.status_code))
print('SEO MODULE UPLOADED: '+str(len(data))+' bytes',flush=True)
verified=False
for attempt in range(7):
    v=session.get(root+'assets/js/seo-metadata.js?ec_verify='+str(attempt)+'-20261102',timeout=35,headers={'Cache-Control':'no-cache'})
    if v.status_code==200 and start in v.text and 'Merci Secret Bar: restaurant-lounge' in v.text:
        verified=True;break
    time.sleep(3)
manifest={'route_count':37,'locale_titles':111,'backup_sha256':hashlib.sha256(original.content).hexdigest(),
'new_sha256':hashlib.sha256(data).hexdigest(),'module_write_ok':True,'public_readback_ok':verified}
stage.joinpath('seo-module-release-manifest.json').write_text(json.dumps(manifest,indent=2))
if not verified:raise RuntimeError('Uploaded, but public readback is not yet showing updated module; check cache')
print('SUCCESS: public SEO metadata now uses 111 localized titles, preserving all other production rules',flush=True)
