// Conservative inventory: missing phrases are candidates, not a completion percentage.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const chunks={};
for(const file of fs.readdirSync(path.join(root,'assets/js/translations/chunks'))){
 const source=fs.readFileSync(path.join(root,'assets/js/translations/chunks',file),'utf8');
 const data=(await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'))).default;
 if(!data || typeof data!=='object')throw Error('Invalid dictionary: '+file);
 for(const [original,pair] of Object.entries(data))for(const lang of ['PT','EN'])if(typeof pair[lang]!=='string'||!pair[lang].trim())throw Error('Missing '+lang+' in '+file+': '+original);
 chunks[file]=data;
}
const site=fs.readFileSync(path.join(root,'assets/js/site.js'),'utf8');
const common=Function('return ('+site.match(/const common=(\{[^\n]+\});/)[1]+')')();
const routes=Function('return ('+site.match(/const sectionChunks = (\{[\s\S]*?\n\});/)[1]+')')();
const collect=spawnSync('python3',['-c',String.raw`
import json,re
from html.parser import HTMLParser
from pathlib import Path
class P(HTMLParser):
 def __init__(self):super().__init__();self.skip=0;self.text=[];self.attributes=[]
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t in ('script','style','noscript'):self.skip+=1
  for k in ('alt','title','placeholder','aria-label'):
   if a.get(k):self.attributes.append(a[k])
  if t=='meta' and (a.get('name')=='description' or a.get('property') in ('og:title','og:description')):self.attributes.append(a.get('content',''))
 def handle_endtag(self,t):
  if t in ('script','style','noscript'):self.skip=max(0,self.skip-1)
 def handle_data(self,t):
  if not self.skip and t.strip():self.text.append(t.strip())
rows=[]
for f in sorted(Path('.').rglob('*.html')):
 if '.git' in f.parts:continue
 p=P();p.feed(f.read_text());rows.append({'path':str(f),'section':f.parts[0] if len(f.parts)>1 else 'home','phrases':sorted(set(p.text+p.attributes))})
print(json.dumps(rows,ensure_ascii=False))
`],{cwd:root,encoding:'utf8',maxBuffer:16*1024*1024});
if(collect.status!==0)throw Error(collect.stderr);
const candidates=[];const summary={};
for(const route of JSON.parse(collect.stdout)){
 const dict={...common,...chunks['common-02.js'],...chunks['metadata-01.js']};
 for(const file of routes[route.section]||[])Object.assign(dict,chunks[file]||{});
 const missing=route.phrases.filter(text=>/[A-Za-zÀ-ÿ]{3}/.test(text)&&!dict[text]);
 candidates.push({path:route.path,missing});
 const group=summary[route.section]??={routes:0,candidates:new Set()};group.routes++;missing.forEach(text=>group.candidates.add(text));
}
for(const group of Object.values(summary))group.candidates=group.candidates.size;
const output={note:'Conservative phrase inventory. Includes proper names, unchanged Spanish/Portuguese words, and content managed by keyed or embedded multilingual renderers. NOT a completion percentage. Check those renderers before translating.',summary,routes:candidates};
if(process.argv[2])fs.writeFileSync(path.resolve(process.argv[2]),JSON.stringify(output,null,2));
console.log(JSON.stringify({dictionaries:Object.keys(chunks).length,...output.summary},null,2));
