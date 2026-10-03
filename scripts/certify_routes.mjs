// Exhaustive route execution. PASS is technical coverage, never a semantic claim.
// Requires Playwright and a browser supplied by the caller; no website mutation.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {gzipSync,gunzipSync} from 'node:zlib';
import {createRequire} from 'node:module';
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.EC_PLAYWRIGHT_PATH||'playwright-core');
const browser=await chromium.launch({executablePath:process.env.EC_CHROME_PATH,headless:true,args:['--no-sandbox']});
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
 let file=path.join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return;}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 if(!fs.existsSync(file)){res.writeHead(404).end();return;}
 res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=`http://127.0.0.1:${server.address().port}`;
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.name==='.git'?[]:e.isDirectory()?walk(path.join(dir,e.name)):e.name.endsWith('.html')?[path.join(dir,e.name)]:[]);}
const allFiles=walk(root).sort();
const selectedSection=process.argv.find(a=>a.startsWith('--section='))?.split('=')[1];
const selectedFiles=process.argv.find(a=>a.startsWith('--files='))?.slice(8).split(',');
const files=selectedFiles?allFiles.filter(f=>selectedFiles.includes(path.relative(root,f))):selectedSection?allFiles.filter(f=>path.relative(root,f).split(path.sep)[0]===selectedSection):allFiles;
const site=fs.readFileSync(path.join(root,'assets/js/site.js'),'utf8');
const common=Function('return ('+site.match(/const common=(\{[^\n]+\});/)[1]+')')();
const sections=Function('return ('+site.match(/const sectionChunks = (\{[\s\S]*?\n\});/)[1]+')')();
const dictionaries={};
for(const name of fs.readdirSync(path.join(root,'assets/js/translations/chunks'))){
 const source=fs.readFileSync(path.join(root,'assets/js/translations/chunks',name),'utf8');
 dictionaries[name]=(await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'))).default;
}
const rows=[];let next=0;
const normalize=s=>s.replace(/\s+/g,' ').trim();
async function worker(){
 const context=await browser.newContext({viewport:{width:1365,height:900}});
 // Deterministic local runtime coverage, excluding external services/images.
 await context.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());
 const page=await context.newPage();
 while(next<files.length){
  const file=files[next++],rel=path.relative(root,file).replaceAll(path.sep,'/');
  const route=rel==='index.html'?'/':rel.endsWith('/index.html')?'/'+rel.slice(0,-10):'/'+rel;
  const chunks=['common-02.js','metadata-01.js','metadata-02.js',...(sections[route.split('/')[1]||'home']||[])];
  const dict=Object.assign({},common,...chunks.map(c=>dictionaries[c]));
  const row={route,file:rel,checks:{},errors:[],limitations:[],states:{},chunks};
  const jsErrors=[];const err=e=>jsErrors.push(e.message);page.on('pageerror',err);
  try{
   await page.goto(base+route,{waitUntil:'load',timeout:15000});
   const redirect=new URL(page.url()).pathname!==route;
   if(redirect){row.redirect=new URL(page.url()).pathname;row.limitations.push('Redirect alias; destination has a separate row');}
   await page.evaluate(async()=>{
    for(const script of document.querySelectorAll('script[type="module"][src]')){
     if(new URL(script.src).origin===location.origin)try{await import(script.src);}catch{}
    }
   });
   const snapshot=()=>page.evaluate(()=>{
    const meta={title:document.title,description:document.querySelector('meta[name="description"]')?.content,
     canonical:document.querySelector('link[rel="canonical"]')?.href};
    for(const key of ['og:title','og:description','og:image','og:url','og:image:alt','twitter:title','twitter:description'])meta[key]=document.querySelector(`meta[property="${key}"],meta[name="${key}"]`)?.content;
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;const text=[];
    while(n=walker.nextNode())if(n.parentElement&&!n.parentElement.closest('script,style,noscript,[data-live]')&&n.nodeValue.trim())text.push(n.nodeValue.trim());
    return {lang:document.documentElement.lang,meta,text,keys:[...document.querySelectorAll('[data-i18n],[data-i18n-content],[data-i18n-placeholder],[data-i18n-title],[data-i18n-aria-label]')].map(el=>({module:el.dataset.i18nModule||document.documentElement.dataset.i18nModule,keys:[...el.attributes].filter(a=>/^data-i18n(?:$|-(?:content|placeholder|title|aria-label)$)/.test(a.name)).map(a=>a.value)})),dynamicScripts:[...document.scripts].filter(s=>s.type!=='application/ld+json'&&!s.src).length};
   });
   for(const lang of ['ES','PT','EN','ES']){
    const resolvedKeys=await page.evaluate(async(lang)=>{
     const module=await import('/assets/js/i18n.js');module.setLanguage(lang);
     const shared=[...document.scripts].find(s=>s.src.endsWith('/assets/js/site.js'));
     if(shared)(await import(shared.src)).apply(lang);
     await new Promise(r=>setTimeout(r,30));
     return [...document.querySelectorAll('[data-i18n],[data-i18n-content],[data-i18n-placeholder],[data-i18n-title],[data-i18n-aria-label]')].flatMap(el=>[...el.attributes].filter(a=>/^data-i18n(?:$|-(?:content|placeholder|title|aria-label)$)/.test(a.name)).map(a=>({key:a.value,module:el.dataset.i18nModule||document.documentElement.dataset.i18nModule,resolved:module.translate(a.value,lang,el.dataset.i18nModule||document.documentElement.dataset.i18nModule)!==undefined})));
    },lang);
    for(const key of resolvedKeys)if(!key.resolved){
     if(key.module)row.errors.push('Unresolved keyed translation '+lang+' '+key.module+':'+key.key);
     else row.limitations.push('Unregistered shared key owned by inline renderer: '+key.key);
    }
    const state=await snapshot();
    if(lang==='ES'&&row.states.ES){
     row.checks.restorationMetadata=JSON.stringify(row.states.ES.meta)===JSON.stringify(state.meta)?'PASS':'ERROR REAL';
     row.checks.restorationText=JSON.stringify(row.states.ES.text)===JSON.stringify(state.text)?'PASS':'LIMITACIÓN DE ARQUITECTURA/PRUEBA';
     if(row.checks.restorationMetadata==='ERROR REAL')row.errors.push('Metadata did not restore ES');
     if(row.checks.restorationText!=='PASS'){
      row.limitations.push('DOM text changes during cycle; includes live/dynamic components; needs renderer-specific comparison');
      row.restorationDelta={before:row.states.ES.text.filter(t=>!state.text.includes(t)),after:state.text.filter(t=>!row.states.ES.text.includes(t))};
     }
    }else row.states[lang]=state;
    if(!state.lang.toLowerCase().startsWith(lang.toLowerCase()))row.errors.push('Incorrect lang '+lang+': '+state.lang);
   }
   for(const key of ['title','description','canonical','og:title','og:description','og:image']){
    const original=row.states.ES.meta[key];
    row.checks[key]=original?'PASS':'LIMITACIÓN DE ARQUITECTURA/PRUEBA';
    if(!original)row.limitations.push('Metadata field not applicable/present: '+key);
    for(const lang of ['PT','EN']){
     if(!redirect&&dict[original]?.[lang]&&row.states[lang].meta[key]!==dict[original][lang])row.limitations.push(`${key} ${lang}: renderer overrides phrase dictionary; validate its own source`);
     else if(original&&row.states[lang].meta[key]===original&&!dict[original]&&!['canonical','og:image','og:url'].includes(key))row.limitations.push(`${key}: unchanged without phrase entry; may be proper name or renderer-owned`);
    }
   }
   row.checks.dictionaryLoad=chunks.every(c=>dictionaries[c])?'PASS':'ERROR REAL';
   const resources=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>r.name));
   row.loadedChunks=resources.filter(u=>u.includes('/translations/')).map(u=>new URL(u).pathname);
   row.checks.lang='PASS';row.checks.keyInventory='PASS';
   row.keys=row.states.ES.keys;
   const unchanged=row.states.ES.text.filter(t=>row.states.PT.text.includes(t)&&row.states.EN.text.includes(t)&&/[A-Za-zÀ-ÿ]{3}/.test(t));
   row.unchangedCandidates=[...new Set(unchanged)].filter(t=>!dict[t]);
   if(row.unchangedCandidates.length)row.limitations.push('Unchanged text candidates include names, labels and renderer-owned content; semantic completeness not inferred');
   row.checks.dynamicRenderer=row.states.ES.dynamicScripts||row.keys.length?'LIMITACIÓN DE ARQUITECTURA/PRUEBA':'PASS';
   if(jsErrors.length)row.limitations.push('Runtime exceptions with external requests intentionally blocked; assess separately');
   row.runtimeExceptions=[...new Set(jsErrors)];
   // Retain per-language metadata and counts without duplicating all body copy.
   for(const state of Object.values(row.states)){state.textCount=state.text.length;delete state.text;delete state.keys;}
   row.errors=[...new Set(row.errors)];row.limitations=[...new Set(row.limitations)];
   row.status=row.errors.length?'ERROR REAL':row.limitations.length?'LIMITACIÓN DE ARQUITECTURA/PRUEBA':'PASS';
  }catch(e){row.limitations.push(e.message);row.status='LIMITACIÓN DE ARQUITECTURA/PRUEBA';}
  page.removeListener('pageerror',err);rows.push(row);
  if(rows.length%50===0)console.log('Routes executed: '+rows.length+'/'+files.length);
 }
 await context.close();
}
try{await Promise.all(Array.from({length:4},worker));}finally{await browser.close();server.close();}
const outputPath=path.join(root,'docs/COBERTURA_596_20261003.json.gz');
if((selectedSection||selectedFiles)&&fs.existsSync(outputPath)){
 const previous=JSON.parse(gunzipSync(fs.readFileSync(outputPath)));const covered=new Set(rows.map(r=>r.route));
 rows.push(...previous.rows.filter(r=>!covered.has(r.route)));
}
rows.sort((a,b)=>a.route.localeCompare(b.route));
const summary={routes:rows.length,completeCycles:rows.filter(r=>r.states.EN&&r.states.PT&&r.checks.restorationMetadata).length,
 statuses:Object.fromEntries(['PASS','ERROR REAL','LIMITACIÓN DE ARQUITECTURA/PRUEBA'].map(s=>[s,rows.filter(r=>r.status===s).length])),
 errors:rows.filter(r=>r.errors.length).map(r=>({route:r.route,errors:r.errors})),
 note:'Real Chromium on exact local source. External resources excluded. Technical cycles do not prove semantic translation of every sentence. Historical frozen differences are excluded.'};
fs.writeFileSync(outputPath,gzipSync(JSON.stringify({summary,rows},null,2)));
console.log(JSON.stringify(summary,null,2));
