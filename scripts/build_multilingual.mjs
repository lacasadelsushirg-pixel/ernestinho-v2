// Build all locale HTML with the existing renderers, never maintain three sources.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
import {loadBuildLibraries} from './build_vendor.mjs';
import {buildBrowserOptions} from './build_browser.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.EC_PLAYWRIGHT_PATH || 'playwright-core');
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const out=path.join(root,'dist');
const origin='https://www.ernestinhocarioca.com.br';
const configs=JSON.parse(fs.readFileSync(path.join(root,'vercel.json')));
const redirects=new Set(configs.redirects.map(r=>r.source.replace(/\/$/,'')||'/'));
const ignore=new Set(['.git','node_modules','dist','.vercel','docs','scripts','upload']);
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>ignore.has(e.name)?[]:e.isDirectory()?walk(path.join(dir,e.name)):e.name.endsWith('.html')?[path.join(dir,e.name)]:[]);}
const files=walk(root).sort();
const routeFor=f=>{const rel=path.relative(root,f).replaceAll(path.sep,'/');return rel==='index.html'?'/':rel.endsWith('/index.html')?'/'+rel.slice(0,-10):'/'+rel;};
const indexable=f=>{const html=fs.readFileSync(f,'utf8');return !/404\.html$/.test(f)&&!redirects.has(routeFor(f).replace(/\/$/,'')||'/')&&!/<meta\b[^>]*(?:http-equiv=["']refresh|name=["'](?:robots|googlebot)["'][^>]*content=["'][^"']*(?:noindex|none))/i.test(html);};
const indexableRoutes=new Set(files.filter(indexable).map(routeFor));
const prefix=(route,lang)=>lang==='ES'?route:'/'+lang.toLowerCase()+route;
const pilot=process.argv.find(a=>a.startsWith('--routes='))?.slice(9).split(',');
const updating=process.argv.includes('--update');
if(updating&&!pilot)throw Error('--update requires --routes');
const previous=updating?JSON.parse(fs.readFileSync(path.join(out,'locale-manifest.json'))):null;
const targets=files.filter(f=>!pilot||pilot.includes(routeFor(f))).flatMap(f=>['ES','PT','EN'].map(language=>({file:f,route:routeFor(f),language})));
// Marker exists only in build output. Preserve legacy source preview for audits.
const bootstrap=`<script data-ec-locale-bootstrap>(function(){var m=location.pathname.match(new RegExp('^/(pt|en)(?=/|$)','i')),l=m?m[1].toUpperCase():'ES';document.documentElement.lang=l==='PT'?'pt-BR':l.toLowerCase();try{localStorage.setItem('ec-lang',l);localStorage.setItem('ec-language',l.toLowerCase());localStorage.setItem('ec_lang',l.toLowerCase());}catch(_){}})();</script>`;
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp'};
function adaptLegacyScripts(html,sourcePath){
 return html.replace(/(<script\b[^>]*>)([\s\S]*?)(<\/script>)/gi,(whole,open,code,close)=>{
  if(open.includes('application/ld+json'))return whole;
  // Sparse renderer dictionaries legitimately have no ES entry.
  code=code.replace(/T\[l\]\[k\]/g,'T[l]?.[k]');
  if(sourcePath==='/compras/mercado-sao-pedro/')code=code.replace(/function lang\(/g,'function ecMarketLanguage(').replace(/=>lang\(/g,'=>ecMarketLanguage(').replace(/;lang\(/g,';ecMarketLanguage(');
  return open+code+close;
 }).replace(sourcePath==='/compras/mercado-sao-pedro/'?/onclick="lang\(/g:/$^/g,'onclick="ecMarketLanguage(');
}
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const sourcePath=pathname.replace(/^\/(pt|en)(?=\/|$)/i,'')||'/';
 let file=path.resolve(root,'.'+sourcePath);
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return;}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 if(!fs.existsSync(file)){res.writeHead(404).end();return;}
 res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
 if(file.endsWith('.html')){
   let html=adaptLegacyScripts(fs.readFileSync(file,'utf8'),sourcePath).replace(/<html\b/i,'<html data-ec-locale-routes="true"');
   html=html.replace('src="https://cdn.tailwindcss.com"','src="https://cdn.tailwindcss.com/3.4.17"')
     .replace('src="https://unpkg.com/react@18/','src="https://unpkg.com/react@18.3.1/')
     .replace('src="https://unpkg.com/react-dom@18/','src="https://unpkg.com/react-dom@18.3.1/');
   // Base resolves original relative modules/assets against the unchanged ES tree.
   html=html.replace(/<head>/i,`<head><base data-ec-build-base href="${sourcePath}">${bootstrap}`);
   // Prevent aliases navigating away before the build can preserve their redirect.
   html=html.replace(/<meta\b[^>]*http-equiv=["']refresh["'][^>]*>/gi,'');
   res.end(html);
 }else fs.createReadStream(file).pipe(res);
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=`http://127.0.0.1:${server.address().port}`;
const libraries=await loadBuildLibraries();
if(!updating)fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
// Copy assets and route-local modules/data; exclude editorial/report/build inputs.
function copy(dir,dest){for(const e of fs.readdirSync(dir,{withFileTypes:true})){
 if(ignore.has(e.name)||e.name.startsWith('.')||['package.json','package-lock.json','AGENTS.md','README.md','vercel.json','sitemap.xml'].includes(e.name))continue;
 const from=path.join(dir,e.name),to=path.join(dest,e.name);
 if(e.isDirectory()){fs.mkdirSync(to,{recursive:true});copy(from,to);}else if(!e.name.endsWith('.html'))fs.copyFileSync(from,to);
}}
copy(root,out);
const browser=await chromium.launch(await buildBrowserOptions());
let next=0;const manifest=[];const errors=[];
async function worker(){
 const context=await browser.newContext({viewport:{width:1365,height:900}});
 await context.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.fulfill({status:200,body:libraries.get(r.request().url())||'',contentType:r.request().resourceType()==='script'?'text/javascript':'text/plain'}));
 const page=await context.newPage();
 while(next<targets.length){
 const target=targets[next++],route=prefix(target.route,target.language);
  try{
   const source=fs.readFileSync(target.file,'utf8');
   const alias=source.match(/<meta\b[^>]*http-equiv=["']refresh["'][^>]*>/i);
   if(alias){
    const destination=new URL(alias[0].match(/url=([^"'>]+)/i)[1],base+target.route);
    const finalPath=prefix(destination.pathname,target.language)+destination.search+destination.hash;
    const html=source.replace(/<html\b[^>]*>/i,`<html lang="${target.language==='PT'?'pt-BR':target.language.toLowerCase()}">`)
      .replace(/(url=)([^"'>]+)/i,(_,key)=>key+finalPath)
      .replace(/window\.location\.replace\([^)]*\)/,`window.location.replace(${JSON.stringify(finalPath)})`)
      .replace(/(<link[^>]*rel=["']canonical["'][^>]*href=)["'][^"']*["']/i,`$1"${origin+finalPath}"`)
      .replace(/href=["']\.\.\/[^"']+["']/g,`href="${finalPath}"`);
    const dest=path.join(out,route.slice(1)+'index.html');fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,html);
    manifest.push({route,source:target.route,language:target.language,indexable:false,redirect:finalPath});continue;
   }
   await page.goto(base+route,{waitUntil:'load',timeout:30000});
   if(new URL(page.url()).pathname!==route)throw Error('Unexpected client navigation '+page.url());
   await page.evaluate(async language=>{
    const scripts=[...document.querySelectorAll('script[type="module"][src]')];
    for(const script of scripts){if(new URL(script.src).origin===location.origin){const module=await import(script.src);if(module.ready)await module.ready;}}
    const i18n=await import('/assets/js/i18n.js');i18n.setLanguage(language);
    const site=scripts.find(s=>s.src.endsWith('/assets/js/site.js'));
    if(site)(await import(site.src)).apply(language);
    const buzios=scripts.find(s=>s.src.endsWith('/assets/js/buzios-page.js'));
    if(buzios)(await import(buzios.src)).apply(language);
    await new Promise(r=>setTimeout(r,80));
   },target.language);
   const value=await page.evaluate(({origin,route,indexable,allRoutes,originalLanguageBar})=>{
    const language=document.documentElement.lang;
    const canonical=origin+route;
    const sourcePath=route.replace(/^\/(pt|en)(?=\/|$)/,'')||'/';
    const prefix=(r,l)=>l==='es'?r:'/'+l+r;
    const setMeta=(key,content)=>{let m=document.querySelector(`meta[property="${key}"],meta[name="${key}"]`);if(!m){m=document.createElement('meta');m.setAttribute(key.includes(':')?'property':'name',key);document.head.appendChild(m);}m.content=content;m.removeAttribute('data-ec-content');};
    const title=document.title,description=document.querySelector('meta[name="description"]')?.content;
    if(!title||!description)throw Error('Missing title/description');
    let link=document.querySelector('link[rel="canonical"]');
    if(link)link.href=canonical;
    setMeta('og:url',canonical);setMeta('og:locale',language==='pt-BR'?'pt_BR':language==='en'?'en_US':'es_ES');
    for(const node of document.querySelectorAll('link[hreflang],meta[property="og:locale:alternate"]'))node.remove();
    if(indexable){
     if(!link){link=document.createElement('link');link.rel='canonical';link.href=canonical;document.head.appendChild(link);}
     for(const l of ['es','pt','en','x-default']){const a=document.createElement('link');a.rel='alternate';a.hreflang=l==='pt'?'pt-BR':l;a.href=origin+prefix(sourcePath,l==='x-default'?'es':l);document.head.appendChild(a);}
    }
    const sourceBase=document.querySelector('base[data-ec-build-base]').href;
    for(const el of document.querySelectorAll('[src],[href],[poster],[action]')){
     for(const attr of ['src','href','poster','action']){
      const raw=el.getAttribute(attr);if(!raw||raw.startsWith('#')||/^(?:data:|mailto:|tel:|javascript:)/i.test(raw))continue;
      const url=new URL(raw,sourceBase);
      if(url.origin===location.origin)el.setAttribute(attr,url.pathname+url.search+url.hash);
     }
    }
    // srcset URLs and inline CSS resources retain their original ES base.
    for(const el of document.querySelectorAll('[srcset]')){
      const raw=el.getAttribute('srcset');
      // Commas inside Cloudinary transformation URLs are not separators.
      if(!/\s+\d+(?:\.\d+)?[wx]/.test(raw)){
        const u=new URL(raw,sourceBase);if(u.origin===location.origin)el.setAttribute('srcset',u.pathname);
      }else el.setAttribute('srcset',raw.replace(/(\S+)\s+(\d+(?:\.\d+)?[wx])/g,(whole,url,descriptor)=>{const u=new URL(url,sourceBase);return u.origin===location.origin?u.pathname+' '+descriptor:whole;}));
    }
    for(const el of document.querySelectorAll('style,[style]')){
      const css=el.tagName==='STYLE'?el.textContent:el.getAttribute('style');
      const normalized=css.replace(/url\((['"]?)([^)'"\s]+)\1\)/g,(whole,q,value)=>{if(/^(?:data:|https?:|#)/.test(value))return whole;return `url(${q}${new URL(value,sourceBase).pathname}${q})`;});
      if(el.tagName==='STYLE')el.textContent=normalized;else el.setAttribute('style',normalized);
    }
    // Keep original resource base for inline imports/fetch in legacy renderers.
    // Navigation links are already locale-aware absolute paths.
    document.querySelector('base[data-ec-build-base]').setAttribute('href',sourcePath);
    // Recreate JS-only action buttons on load so their event handlers aren't lost.
    document.querySelector('.ec-global-actions')?.remove();
    if(!originalLanguageBar)document.querySelectorAll('.lang-switcher').forEach(n=>n.remove());
    // No per-build user state or externally supplied widget DOM is serialized.
    document.querySelectorAll('iframe[src^="about:"],script[src^="https://tpembd.com/"]').forEach(n=>n.remove());
    for(const s of document.querySelectorAll('script[type="application/ld+json"]')){
     try{const data=JSON.parse(s.textContent);const update=v=>{if(Array.isArray(v))return v.forEach(update);if(!v||typeof v!=='object')return;
      if(['WebPage','Article'].includes(v['@type'])){v.url=canonical;v.inLanguage=language;if(v.name!==undefined)v.name=title;if(v.description!==undefined)v.description=description;}
      for(const nested of Object.values(v))if(typeof nested==='object')update(nested);
     };update(data);s.textContent=JSON.stringify(data);}catch{throw Error('Invalid structured data');}
    }
    if(indexable&&sourcePath!=='/'){
     const crumbs=[{name:'Ernestinho Carioca',item:origin+prefix('/',language==='pt-BR'?'pt':language)}];
     const parent='/'+sourcePath.split('/').filter(Boolean)[0]+'/';
     if(parent!==sourcePath&&allRoutes.includes(parent)){
      const a=[...document.querySelectorAll('.topbar nav a')].find(a=>new URL(a.href).pathname===prefix(parent,language==='pt-BR'?'pt':language));
      if(a)crumbs.push({name:a.textContent.trim(),item:origin+prefix(parent,language==='pt-BR'?'pt':language)});
     }
     crumbs.push({name:document.querySelector('h1')?.textContent.trim()||title,item:canonical});
     const s=document.createElement('script');s.type='application/ld+json';s.dataset.ecBreadcrumb='';s.textContent=JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,...c}))});document.head.appendChild(s);
    }
    return {html:'<!doctype html>\n'+document.documentElement.outerHTML,title,description,lang:language,canonical,indexable,textLength:document.body.innerText.length,h1:document.querySelectorAll('h1').length};
   },{origin,route,indexable:indexableRoutes.has(target.route),allRoutes:[...indexableRoutes],originalLanguageBar:/class=["'][^"']*\blang-switcher\b/.test(source)});
   // Redirect-only source documents remain redirect-only and never get hreflang.
   const original=fs.readFileSync(target.file,'utf8');const refresh=original.match(/<meta\b[^>]*http-equiv=["']refresh["'][^>]*>/i);
   if(refresh){value.html=value.html.replace('</head>',refresh[0].replace(/(url=)([^"'>]+)/i,(_,p,destination)=>{const u=new URL(destination,base+target.route);return p+prefix(u.pathname,target.language)+u.search+u.hash;})+'</head>');}
   const destination=path.join(out,route.endsWith('/')?route.slice(1)+'index.html':route.slice(1));
   fs.mkdirSync(path.dirname(destination),{recursive:true});fs.writeFileSync(destination,value.html);
   delete value.html;manifest.push({route,source:target.route,language:target.language,...value});
   if(manifest.length%100===0)console.log(`Generated ${manifest.length}/${targets.length}`);
  }catch(e){errors.push({route,error:e.message});console.error(route,e.message);}
 }
 await context.close();
}
try{await Promise.all(Array.from({length:Number(process.env.EC_BUILD_WORKERS||4)},worker));}finally{await browser.close();server.close();}
if(errors.length)throw Error(JSON.stringify(errors));
if(previous){const changed=new Set(manifest.map(r=>r.route));manifest.push(...previous.routes.filter(r=>!changed.has(r.route)));}
manifest.sort((a,b)=>a.route.localeCompare(b.route));
const isPilot=previous?previous.pilot:!!pilot;
fs.writeFileSync(path.join(out,'locale-manifest.json'),JSON.stringify({sourceDocuments:files.length,indexablePerLanguage:indexableRoutes.size,generated:manifest.length,pilot:isPilot,routes:manifest},null,2));
if(!isPilot)execFileSync('python3',[path.join(root,'scripts/build_sitemap.py'),'--root',out],{stdio:'inherit'});
console.log(`Complete: ${manifest.length} generated HTML; ${indexableRoutes.size} indexable URLs per language.`);
