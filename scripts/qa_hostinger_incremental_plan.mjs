import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const sandbox=fs.mkdtempSync(path.join(os.tmpdir(),'ec-incremental-qa-'));
const live=path.join(sandbox,'public_html');
const dist=path.join(sandbox,'dist');
const origin='https://www.ernestinhocarioca.com.br';
fs.mkdirSync(path.join(live,'fr'),{recursive:true});
fs.mkdirSync(dist,{recursive:true});

const execute=(liveRoot,args=['--plan-only'])=>spawnSync(process.execPath,['scripts/build_multilingual.mjs',...args],{
 cwd:root,
 encoding:'utf8',
 maxBuffer:10*1024*1024,
 env:{...process.env,EC_LIVE_ROOT:liveRoot,EC_DIST_ROOT:dist,EC_BUILD_WORKERS:'1'}
});
const localize=(source,language)=>language==='ES'?source:`/${language.toLowerCase()}${source}`;

try{
 const indexableSources=['/'];
 for(let index=0;index<1195;index++)indexableSources.push(`/preserved-${index}/`);
 const nonIndexableSources=['/quiero/',...Array.from({length:7},(_,index)=>`/private-fixture-${index}/`)];
 const sources=[...indexableSources,...nonIndexableSources];
 const routes=[];
 for(const source of sources)for(const language of ['ES','PT','EN']){
  const route=localize(source,language);
  const relative=route==='/'?'index.html':route.slice(1)+'index.html';
  const destination=path.join(live,relative);
  fs.mkdirSync(path.dirname(destination),{recursive:true});
  const alternates=[['es',localize(source,'ES')],['pt-BR',localize(source,'PT')],['en',localize(source,'EN')],['x-default',localize(source,'ES')]]
   .map(([lang,href])=>`<link rel="alternate" hreflang="${lang}" href="${origin+href}">`).join('');
  const isIndexable=indexableSources.includes(source);
  const robots=isIndexable?'':'<meta name="robots" content="noindex,nofollow">';
  const body=route==='/en/preserved-1194/'?'PRESERVE-DEEP-SENTINEL':'published fixture';
  fs.writeFileSync(destination,`<!doctype html><html><head><link rel="canonical" href="${origin+route}">${robots}${alternates}</head><body>${body}</body></html>`);
  routes.push({route,source,language,indexable:isIndexable});
 }
 fs.writeFileSync(path.join(live,'fr','index.html'),'PRIVATE-FR-SENTINEL');
 fs.writeFileSync(path.join(live,'sitemap.xml'),'<urlset/>');
 fs.writeFileSync(path.join(live,'locale-manifest.json'),JSON.stringify({
  sourceDocuments:1204,
  indexablePerLanguage:1196,
  generated:3612,
  pilot:false,
  sourceCommit:'13281f87fb16ba57be07f230c00d877657ba7bdf',
  routes
 }));

 const planned=execute(live);
 if(planned.status!==0)throw Error('valid incremental plan failed:\n'+planned.stdout+'\n'+planned.stderr);
 const jsonLine=planned.stdout.trim().split('\n').find(line=>line.startsWith('{"mode"'));
 const plan=JSON.parse(jsonLine||'null');
 if(plan?.mode!=='incremental'||JSON.stringify(plan.selectedRoutes)!=='["/","/quiero/"]'||JSON.stringify(plan.targets)!=='["/","/pt/","/en/","/quiero/","/pt/quiero/","/en/quiero/"]'){
  throw Error('unexpected incremental plan: '+jsonLine);
 }

 const missing=path.join(sandbox,'missing-public-html');
 fs.mkdirSync(missing);
 const sentinel=path.join(dist,'SAFE_ABORT_SENTINEL');
 fs.writeFileSync(sentinel,'keep-me');
 const refused=execute(missing);
 if(refused.status===0)throw Error('missing manifest did not abort');
 if(fs.readFileSync(sentinel,'utf8')!=='keep-me')throw Error('safe abort modified dist');
 if(!refused.stderr.includes('SAFE ABORT: a verified published manifest is required')){
  throw Error('missing manifest did not report the safe-abort reason');
 }

 const built=execute(live,[]);
 if(built.status!==0)throw Error('full-tree incremental QA failed:\n'+built.stdout+'\n'+built.stderr);
 if(!built.stdout.includes('Build mode: incremental; rendering 6 of 3612 locale pages'))throw Error('incremental build did not render exactly 6/3612 pages');
 if(!built.stdout.includes('Seeded 3612 published routes from public_html'))throw Error('published tree was not seeded before rendering');
 if(!fs.readFileSync(path.join(dist,'en','preserved-1194','index.html'),'utf8').includes('PRESERVE-DEEP-SENTINEL'))throw Error('unrelated deep EN page was not preserved');
 if(fs.readFileSync(path.join(dist,'fr','index.html'),'utf8')!=='PRIVATE-FR-SENTINEL')throw Error('private FR tree was overwritten');
 const outputManifest=JSON.parse(fs.readFileSync(path.join(dist,'locale-manifest.json'),'utf8'));
 if(outputManifest.routes.length!==3612||outputManifest.routes.filter(entry=>entry.indexable).length!==3588)throw Error('route inventory changed during incremental build');
 if(outputManifest.routes.some(entry=>entry.route==='/fr/'))throw Error('private FR route was added to the public manifest');
 const sitemap=fs.readFileSync(path.join(dist,'sitemap.xml'),'utf8');
 if((sitemap.match(/<url>/g)||[]).length!==3588||sitemap.includes('<loc>'+origin+'/fr/</loc>'))throw Error('public sitemap changed its 3588-route/FR-private contract');

 console.log('HOSTINGER INCREMENTAL QA PASS: 6/3612 rendered; 3612 documents, 3588 indexable routes, deep EN page, private FR tree and sitemap preserved; missing manifest aborts before dist changes.');
}finally{
 fs.rmSync(sandbox,{recursive:true,force:true});
}
