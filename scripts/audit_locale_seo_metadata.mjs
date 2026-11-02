#!/usr/bin/env node
// Audit locale SEO metadata on selected HTML generated inside an isolated runner.
// Read-only. This deliberately does not assert Google indexation or modify deployment.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const manifestPath=path.join(dist,'locale-manifest.json');
if(!fs.existsSync(manifestPath))throw Error('Missing generated locale manifest');
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
const routes=[...new Set((manifest.routes||[]).map(r=>r.source).filter(r=>/^\/[a-z0-9/_-]*\/$/i.test(r)))].sort();
const norm=s=>String(s||'').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
function read(locale,route){
 const dest=path.join(dist,locale==='es'?'':locale,route.slice(1),'index.html');
 if(!fs.existsSync(dest))return {missing:true};
 const html=fs.readFileSync(dest,'utf8');
 const title=html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]||'';
 const meta=[...html.matchAll(/<meta\b[^>]*>/gi)].map(m=>m[0]).find(tag=>/\bname=["']description["']/i.test(tag));
 const description=meta?.match(/\bcontent=["']([^"']*)["']/i)?.[1]||'';
 return {title:norm(title),description:norm(description),missing:!title||!description};
}
const repeatedTitle=[],repeatedDescription=[],missing=[];
for(const route of routes){
 const es=read('es',route),pt=read('pt',route),en=read('en',route);
 for(const [lang,data] of [['es',es],['pt',pt],['en',en]])if(data.missing)missing.push(lang+route);
 for(const [lang,data] of [['pt',pt],['en',en]]){
  if(!data.missing&&!es.missing&&data.title===es.title&&es.title.length>20)repeatedTitle.push(lang+route);
  if(!data.missing&&!es.missing&&data.description===es.description&&es.description.length>30)repeatedDescription.push(lang+route);
 }
}
console.log(JSON.stringify({auditedRoutes:routes.length,localizedVariants:routes.length*2,
 identicalSpanishTitles:repeatedTitle.length,identicalSpanishDescriptions:repeatedDescription.length,
 missingMetadata:missing.length,titleRoutes:repeatedTitle.slice(0,80),
 descriptionRoutes:repeatedDescription.slice(0,150),missingRoutes:missing.slice(0,60)},null,2));
