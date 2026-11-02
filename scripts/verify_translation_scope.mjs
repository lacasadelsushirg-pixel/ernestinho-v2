#!/usr/bin/env node
// Guard approved source markup and exact locale metadata without deployment.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const contract=JSON.parse(fs.readFileSync(path.join(root,'docs/seo/contrato-traducciones-59-20261102.json'),'utf8'));
const errors=[];let checked=0;
const meta=(html,attribute,key)=>[...html.matchAll(/<(?:meta|link)\b[^>]*>/gi)].filter(m=>new RegExp('\\b'+attribute+'=["\']'+key+'["\']','i').test(m[0]));
const attr=(s,k)=>s.match(new RegExp('\\b'+k+'=["\']([^"\']*)["\']','i'))?.[1];
for(const row of contract.routes){
 const source=fs.readFileSync(path.join(root,row.file),'utf8');
 const hash=crypto.createHash('sha256').update(source.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'')).digest('hex');
 if(hash!==row.approvedMarkupHash)errors.push({file:row.file,error:'approved source outside scripts changed'});
 const route='/'+row.file.replace(/index.html$/,'');
 for(const locale of ['es','pt','en']){
  const pathname=(locale==='es'?'':'/'+locale)+route;
  const html=fs.readFileSync(path.join(root,'dist',pathname.slice(1),'index.html'),'utf8');
  const origin='https://www.ernestinhocarioca.com.br';
  if(attr(meta(html,'rel','canonical')[0]?.[0]||'','href')!==origin+pathname)errors.push({pathname,error:'wrong canonical'});
  const alternates=Object.fromEntries([...html.matchAll(/<link\b[^>]*hreflang=["'][^"']+["'][^>]*>/gi)].map(m=>[attr(m[0],'hreflang'),attr(m[0],'href')]));
  for(const [lang,prefix] of [['es',''],['pt-BR','/pt'],['en','/en'],['x-default','']])if(alternates[lang]!==origin+prefix+route)errors.push({pathname,error:'wrong hreflang '+lang});
  if(attr(html.match(/<html\b[^>]*>/i)?.[0]||'','lang')!==(locale==='pt'?'pt-BR':locale))errors.push({pathname,error:'wrong document language'});
  if(!/<title>[^<]+<\/title>/.test(html)||!attr(meta(html,'name','description')[0]?.[0]||'','content'))errors.push({pathname,error:'missing metadata'});
  checked++;
 }
}
const result={sourceMarkupContracts:contract.routes.length,localeDocuments:checked,failures:errors.length,errors};
fs.writeFileSync(path.join(root,'dist/audit-translation-scope.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
if(errors.length||checked!==177)process.exitCode=1;
