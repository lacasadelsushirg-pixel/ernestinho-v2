import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {createRequire} from 'node:module';
import {loadBuildLibraries} from './build_vendor.mjs';
import {buildBrowserOptions} from './build_browser.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.EC_PLAYWRIGHT_PATH||'playwright-core');
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const dist=path.join(root,'dist');
const manifest=JSON.parse(fs.readFileSync(path.join(dist,'locale-manifest.json')));
const server=http.createServer((req,res)=>{
 let file=path.resolve(dist,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
 if(!file.startsWith(dist+path.sep)&&file!==dist){res.writeHead(403).end();return;}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 if(!fs.existsSync(file)){res.writeHead(404).end();return;}
 res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.html')?'text/html':'application/octet-stream');fs.createReadStream(file).pipe(res);
});await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch(await buildBrowserOptions());
const hubs=['/','/guia/','/experiencias/','/gastronomia/','/cultura/','/vida-nocturna/','/compras/','/transportes/','/hospedaje/','/guia/internet/','/gastronomia/polis-sucos/','/gastronomia/satyricon/','/eventos/','/cafe-rio/'];
const all=process.argv.includes('--all');
const filter=process.argv.find(a=>a.startsWith('--routes='))?.slice(9).split(',');
const selected=manifest.routes.filter(r=>r.indexable&&(filter?filter.includes(r.source):(all||hubs.includes(r.source))));
const rows=[];const next={390:0,1365:0};
const libraries=await loadBuildLibraries();
async function worker(viewport){
 let context,page,used=0;
 async function fresh(){if(context)await context.close().catch(()=>{});context=await browser.newContext({viewport,isMobile:viewport.width<600,hasTouch:viewport.width<600});await context.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.fulfill({status:200,body:libraries.get(r.request().url())||'',contentType:r.request().resourceType()==='script'?'text/javascript':'text/plain'}));page=await context.newPage();await page.goto(base+'/');used=0;}
 await fresh();
 while(next[viewport.width]<selected.length){const target=selected[next[viewport.width]++];const errors=[];const js=e=>errors.push(e.message);page.on('pageerror',js);
  try{
   // Deliberate disagreement: URL must win over saved browser preference.
   await page.evaluate(()=>localStorage.setItem('ec-lang','XX'));
   const response=await page.goto(base+target.route,{waitUntil:'load'});
   await page.evaluate(async()=>{for(const s of document.querySelectorAll('script[type="module"][src]'))if(new URL(s.src).origin===location.origin){const module=await import(s.src);if(module.ready)await module.ready;}await new Promise(r=>setTimeout(r,150));});
   const snapshot=await page.evaluate(()=>({title:document.title,lang:document.documentElement.lang,canonical:document.querySelector('link[rel="canonical"]')?.href,description:document.querySelector('meta[name="description"]')?.content,overflow:document.documentElement.scrollWidth>innerWidth+1,h1:document.querySelectorAll('h1').length,nav:[...document.querySelectorAll('.topbar nav a')].map(a=>new URL(a.href).pathname),body:document.body.innerText,selector:[...document.querySelectorAll('.ec-mobile-language-row a,.ec-desktop-language a,[data-ec-standalone-languages] a')].map(a=>({lang:a.dataset.ecLanguage||a.dataset.desktopLanguage,href:new URL(a.href).pathname}))}));
   const problems=[];
   const obsolete=await page.locator('.topbar .tools > button').evaluateAll(nodes=>nodes.filter(n=>/^(ES|PT(?:-BR)?|EN)$/.test(n.textContent.trim())).map(n=>n.outerHTML));
   if(obsolete.length)problems.push('Obsolete header language button remains');
   if(errors.length)problems.push(...[...new Set(errors)].map(e=>'Runtime JS: '+e));
   if(response.status()!==200)problems.push('HTTP '+response.status());
   if(snapshot.lang!==target.lang)problems.push('lang '+snapshot.lang+' != '+target.lang);
   if(snapshot.title!==target.title)problems.push('Runtime title differs from prerender');
   if(snapshot.description!==target.description)problems.push('Runtime description differs from prerender');
   if(snapshot.canonical!==target.canonical)problems.push('Runtime canonical differs from prerender');
   if(snapshot.overflow)problems.push('Overflow at '+viewport.width);
   const expectedPrefix=target.language==='ES'?'':'/'+target.language.toLowerCase();
   if(snapshot.nav.some(p=>target.language!=='ES'&&!p.startsWith(expectedPrefix+'/')))problems.push('Navigation escaped locale');
   for(const l of ['ES','PT','EN']){
    const href=(l==='ES'?'':'/'+l.toLowerCase())+target.source;
    if(!snapshot.selector.some(a=>a.lang===l&&a.href===href))problems.push('Selector missing equivalent '+l);
   }
   rows.push({route:target.route,viewport:viewport.width,problems,runtimeExceptions:[...new Set(errors)],title:snapshot.title,bodyLength:snapshot.body.length,description:snapshot.description,expectedDescription:target.description});
  }catch(e){rows.push({route:target.route,viewport:viewport.width,problems:[e.message]});}
  page.removeListener('pageerror',js);
  if(++used>=50&&next[viewport.width]<selected.length)await fresh();
  if(rows.length%100===0)console.log('Runtime '+rows.length+'/'+(selected.length*2));
 }
 await context.close();
}
try{await Promise.all(Array.from({length:4},(_,i)=>worker(i%2?{width:390,height:844}:{width:1365,height:900})));}finally{await browser.close();server.close();}
const failures=rows.filter(r=>r.problems.length);
fs.mkdirSync(path.join(root,'docs/seo'),{recursive:true});
const requestedOutput=process.argv.find(a=>a.startsWith('--output='))?.slice(9);
const fileName=filter?'QA_RUNTIME_AFFECTED.json':all?'QA_RUNTIME_ALL.json':'QA_RUNTIME_SAMPLE.json';
const output={tested:rows.length,failures:failures.length,externalServicesExcluded:true,rows};
fs.writeFileSync(requestedOutput?path.resolve(root,requestedOutput):path.join(root,'docs/seo',fileName),JSON.stringify(output,null,2));
if(process.argv.includes('--update')){
 const saved=path.join(root,'docs/seo/QA_RUNTIME_ALL.json');
 const previous=JSON.parse(fs.readFileSync(saved));const changed=new Set(rows.map(r=>r.route+':'+r.viewport));
 previous.rows=previous.rows.filter(r=>!changed.has(r.route+':'+r.viewport)).concat(rows);
 previous.tested=previous.rows.length;previous.failures=previous.rows.filter(r=>r.problems.length).length;
 previous.retested=rows.length;fs.writeFileSync(saved,JSON.stringify(previous,null,2));
}
console.log(JSON.stringify({tested:rows.length,failures},null,2));
if(failures.length)process.exitCode=1;
