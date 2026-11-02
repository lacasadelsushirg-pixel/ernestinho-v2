#!/usr/bin/env python3
"""One-off targeted transfer-price release: preserve ALL unrelated live HTML and JS.
Only three localized HTML, no sitemap, no CSS module, no full-site build/deploy."""
import base64,hashlib,io,json,os,pathlib,re,subprocess,time,urllib.parse,zipfile
import requests
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes,serialization
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

ROOT='https://www.ernestinhocarioca.com.br/'
CANDIDATES={prefix+'transportes/transporte-privado/index.html':pathlib.Path('dist')/prefix/'transportes/transporte-privado/index.html'
            for prefix in ('','pt/','en/')}
EXPECTED_OLD=[
[[130,170,270],[180,200,320],[210,230,300]],
[[420,470,620],[420,470,620],[470,540,650],[500,600,690]],
[[450,530,650],[450,530,650],[450,550,700],[450,550,700]],
[[590,650,750],[590,650,750],[630,700,800],[630,700,800]]
]
EXPECTED_NEW=[EXPECTED_OLD[0],
 [[n+50 for n in row] for row in EXPECTED_OLD[1]],
 [[n+50 for n in row] for row in EXPECTED_OLD[2]],
 EXPECTED_OLD[3]]
PAT_GROUP=r'<section class="ec-rate-group"><h3>[\s\S]*?</table></div></section>'
PAT_PRICE_SECTION=r'<section class="guide-section ec-transfer-prices" id="tarifas-traslado">[\s\S]*?(?=<section class="transfer-benefits">)'
PAT_FACT=r'<div class="fact-pill">[\s\S]*?</div>'
PAT_SOURCE=r'<p class="source-date">[\s\S]*?</p>'
PAT_ALERT_JS=r'<script data-ec-tarifas-nov2026>[\s\S]*?</script>'
PAT_OLD_PREVIEW=r'function updatePrice\(\)\{[^\n]*\}'
PAT_ARRAY=r'const tariffRows=(\[[^\n]*\]);\s*const lookup='
EXPECTED_HEADERS={'':'Navidad, Año Nuevo y Carnaval','pt/':'Natal, Réveillon e Carnaval',
                  'en/':'Christmas, New Year and Carnival'}
OUT=pathlib.Path('release-evidence-transfer');OUT.mkdir(exist_ok=True)
session=requests.Session();session.headers.update({'User-Agent':'Mozilla/5.0 (ErnestinhoTransferRelease/20261102)'})

def groups(html):
    found=re.findall(PAT_GROUP,html)
    if len(found)!=4:raise RuntimeError('Expected four rate groups; got '+str(len(found)))
    table=[]
    for block in found:
        row_values=[]
        for tr in re.findall(r'<tr>[\s\S]*?</tr>',block):
            values=[int(n) for n in re.findall(r'<td>R\$\s*(\d+)</td>',tr)]
            if values:row_values.append(values)
        table.append(row_values)
    return table
def exactly(pattern,source,which):
    matches=re.findall(pattern,source)
    if len(matches)!=1:raise RuntimeError(which+': wanted exactly one, found '+str(len(matches)))
    return matches[0]
def patch_live(original,compiled,label):
    if groups(compiled)!=EXPECTED_NEW:raise RuntimeError(label+': generated price matrix wrong')
    if groups(original)!=EXPECTED_OLD:raise RuntimeError(label+': published prices changed externally — abort, no overwrite')
    if '<aside class="ec-transfer-season-alert"' in original:
        raise RuntimeError(label+': season alert already exists — abort for reconcile')
    if '31/10/2026' not in original:raise RuntimeError(label+': older rate badge/date not found')
    if EXPECTED_HEADERS[label] not in compiled:raise RuntimeError(label+': locale holiday heading not generated')
    s=original
    for pattern,name in ((PAT_PRICE_SECTION,'price section'),(PAT_FACT,'old hero badge'),(PAT_SOURCE,'old source date')):
        new=exactly(pattern,compiled,'generated '+name)
        _=exactly(pattern,s,'published '+name)
        s=re.sub(pattern,lambda _:new,s,count=1)
    # Only add the new notice's CSS; leave all previously deployed styles unchanged.
    css=exactly(r'\.ec-transfer-season-alert\{[\s\S]*?(?=</style>)',compiled,'generated seasonal CSS')
    if '.ec-transfer-season-alert{' not in s:
        if '</style>' not in s:raise RuntimeError(label+': no inline CSS closing tag')
        s=s.replace('</style>','\n'+css+'\n</style>',1)
    # Update the exact JS tariffRows mapping, not the surrounding booking script.
    newArray=exactly(PAT_ARRAY,compiled,'generated booking data')
    oldArray=exactly(PAT_ARRAY,s,'published booking data')
    oldRows=json.loads(oldArray)
    if len(oldRows)!=15 or [[r[1:] for r in oldRows[0:3]],[r[1:] for r in oldRows[3:7]],
                               [r[1:] for r in oldRows[7:11]],[r[1:] for r in oldRows[11:]]]!=EXPECTED_OLD:
        raise RuntimeError(label+': published form prices diverge; abort')
    s=re.sub(PAT_ARRAY,lambda _: 'const tariffRows='+newArray+';const lookup=',s,count=1)
    # The current form preview is an old single-line helper. Replace just that helper.
    helper=exactly(r"const cutoffDate='2026-12-15';[\s\S]*?(?=form.addEventListener\('change',updatePrice\);)",
                  compiled,'generated booking guard')
    oldPreview=exactly(PAT_OLD_PREVIEW,s,'published preview helper')
    if "validDateForPublicRate" in oldPreview:raise RuntimeError(label+': form already patched')
    s=s.replace(oldPreview,helper.rstrip(),1)
    submitPattern='const price=lookup[x.route]?.[x.vehicle];const labels='
    if s.count(submitPattern)!=1:raise RuntimeError(label+': missing unchanged booking submit price marker')
    s=s.replace(submitPattern,"const price=validDateForPublicRate(x.date)?lookup[x.route]?.[x.vehicle]:null;const labels=",1)
    # Separate ES/PT/EN seasonal script. It only translates 5 localized new elements.
    inline=exactly(PAT_ALERT_JS,compiled,'generated language switcher')
    marker='<script type="module" src="../../assets/js/site.js"></script>'
    if marker not in s:raise RuntimeError(label+': main site module missing')
    s=s.replace(marker,inline+marker,1)
    if groups(s)!=EXPECTED_NEW:raise RuntimeError(label+': final table not correct')
    if 'validDateForPublicRate' not in s or '2026-12-15' not in s:
        raise RuntimeError(label+': booking guard missing')
    if EXPECTED_HEADERS[label] not in s:raise RuntimeError(label+': localized alert missing')
    if '31/10/2026' in s:raise RuntimeError(label+': stale validity remains')
    return s.encode('utf-8')

# Read and back up ALL three public pages before any write.
previous,updated={}
updates={}
for uri,p in CANDIDATES.items():
    if not p.is_file():raise RuntimeError('Missing localized build '+str(p))
    url=ROOT+uri.replace('index.html','')+'?ec_rate_preflight=20261102'
    res=session.get(url,timeout=38,headers={'Cache-Control':'no-cache'})
    if res.status_code!=200 or len(res.content)<2000:
        raise RuntimeError('Cannot back up '+uri+': HTTP '+str(res.status_code))
    body=res.content
    label=uri.partition('transportes/')[0]
    previous[uri]=body
    updates[uri]=patch_live(body.decode('utf-8'),p.read_text(),label)
    print('PREFLIGHT OK '+uri+' | old/new bytes '+str(len(body))+'/'+str(len(updates[uri])),flush=True)
with zipfile.ZipFile(OUT/'pre-publication-3-locales-original.zip','w',zipfile.ZIP_DEFLATED) as z:
    for uri,data in previous.items():z.writestr(uri,data)
print('BACKUP COMPLETE: three untouched original public HTML files saved',flush=True)

# Encrypt credentials for this exact ephemeral GitHub run; never embed auth values in repo or logs.
private=pathlib.Path('/tmp/ec-transfer-upload-private.pem')
public=pathlib.Path('/tmp/ec-transfer-upload-public.pem')
if not private.exists():
    subprocess.run(['openssl','genpkey','-algorithm','RSA','-pkeyopt','rsa_keygen_bits:3072',
                    '-out',str(private)],check=True,stderr=subprocess.DEVNULL)
    subprocess.run(['openssl','pkey','-in',str(private),'-pubout','-out',str(public)],check=True,stderr=subprocess.DEVNULL)
print('READY_FOR_ENCRYPTED_TRANSFER_UPLOAD_CREDENTIALS',flush=True)
branch=os.environ.get('HEAD_BRANCH','tarifas/transporte-privado-20261102')
runid=os.environ['GITHUB_RUN_ID']
sealed=None
for attempt in range(130):
    cp=subprocess.run(['git','fetch','--quiet','origin',branch],capture_output=True,text=True)
    if cp.returncode==0:
        cp=subprocess.run(['git','show','FETCH_HEAD:.release/transfer-rates-'+runid+'.enc'],capture_output=True,text=True)
        if cp.returncode==0 and cp.stdout.strip().startswith('{'):
            try:sealed=json.loads(cp.stdout);break
            except json.JSONDecodeError:pass
    time.sleep(3)
if sealed is None:raise RuntimeError('One-time auth not supplied; ZERO FILES CHANGED')
priv=serialization.load_pem_private_key(private.read_bytes(),password=None)
key=priv.decrypt(base64.b64decode(sealed['wrapped_key']),padding.OAEP(
    mgf=padding.MGF1(algorithm=hashes.SHA256()),algorithm=hashes.SHA256(),label=None))
cred=json.loads(AESGCM(key).decrypt(base64.b64decode(sealed['nonce']),
                                  base64.b64decode(sealed['payload']),b'ec-transfer-rates-20261102'))
assert cred['url'].startswith('https://') and all(cred[k] for k in ('auth_key','rest_auth_key'))
base=cred['url'].rstrip('/')
h={'Tus-Resumable':'1.0.0','X-Auth':cred['auth_key'],'X-Auth-Rest':cred['rest_auth_key']}
print('Encrypted Hostinger connection verified; publishing exactly 3 HTML files',flush=True)

def upload(uri,bytes_):
    endpoint=base+'/'+urllib.parse.quote(uri,safe='/')+'?override=true'
    res=session.post(endpoint,headers={**h,'Upload-Length':str(len(bytes_)),'Upload-Offset':'0'},timeout=50)
    if res.status_code!=201:raise RuntimeError('TUS create '+uri+' HTTP '+str(res.status_code))
    res=session.patch(endpoint,headers={**h,'Content-Type':'application/offset+octet-stream','Upload-Offset':'0'},
                      data=bytes_,timeout=75)
    if res.status_code!=204 or (res.headers.get('Upload-Offset') and int(res.headers['Upload-Offset'])!=len(bytes_)):
        raise RuntimeError('TUS upload '+uri+' HTTP '+str(res.status_code))
written=[]
manifest={'planned':3,'published':[],'valid_until':'2026-12-15','unchanged':['airport Rio','Paraty']}
try:
    for uri,data in updates.items():
        upload(uri,data)
        written.append(uri)
        manifest['published'].append({'file':uri,'sha256':hashlib.sha256(data).hexdigest()})
        print('PUBLISHED '+uri,flush=True)
except Exception as e:
    print('Upload error; attempting to restore previously overwritten pages',flush=True)
    for uri in written[::-1]:
        try:upload(uri,previous[uri]);print('ROLLBACK '+uri+' ok',flush=True)
        except Exception as re:print('ROLLBACK ERROR '+uri+' '+type(re).__name__,flush=True)
    manifest['failure']=str(e)
    (OUT/'release.json').write_text(json.dumps(manifest,indent=2))
    raise
issues=[]
for uri in updates:
    verified=False
    for attempt in range(6):
        res=session.get(ROOT+uri.replace('index.html','')+'?ec_transfer_verify='+str(attempt)+'-20261102',
                        timeout=35,headers={'Cache-Control':'no-cache'})
        if res.status_code==200 and '<aside class="ec-transfer-season-alert"' in res.text:
            try:
                if groups(res.text)==EXPECTED_NEW and 'validDateForPublicRate' in res.text:
                    verified=True;break
            except Exception:pass
        time.sleep(2)
    if not verified:issues.append(uri)
manifest['verification']={'checked':3,'fails':issues}
(OUT/'release.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
if issues:raise RuntimeError('Uploaded, but live verification incomplete: '+repr(issues))
print('SUCCESS: Three public private-transfer pages updated, 24 fares increased, booking guard and holiday notice verified',flush=True)
