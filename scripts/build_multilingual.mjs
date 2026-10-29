// Build all locale HTML with the existing renderers, never maintain three sources.
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
import {loadBuildLibraries} from './build_vendor.mjs';
import {buildBrowserOptions} from './build_browser.mjs';
import {SEO_METADATA} from '../assets/js/seo-metadata.js';
import {default as STANDALONE_EXPERIENCE_TRANSLATIONS} from '../assets/js/translations/chunks/experiencias-standalone.js';
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
const provisionalBuziosBeach=route=>/^\/destinos\/buzios\/playas\/[^/]+\/$/.test(route);
const indexable=f=>{const route=routeFor(f),html=fs.readFileSync(f,'utf8');return !/404\.html$/.test(f)&&!provisionalBuziosBeach(route)&&!redirects.has(route.replace(/\/$/,'')||'/')&&!/<meta\b[^>]*(?:http-equiv=["']refresh|name=["'](?:robots|googlebot)["'][^>]*content=["'][^"']*(?:noindex|none))/i.test(html);};
const indexableRoutes=new Set(files.filter(indexable).map(routeFor));
const prefix=(route,lang)=>lang==='ES'?route:'/'+lang.toLowerCase()+route;
const pilot=process.argv.find(a=>a.startsWith('--routes='))?.slice(9).split(',');
const manualUpdating=process.argv.includes('--update');
if(manualUpdating&&!pilot)throw Error('--update requires --routes');
const liveRoot=path.resolve(root,'../../../public_html');
const liveManifestPath=path.join(liveRoot,'locale-manifest.json');
let liveManifest=null;
if(!manualUpdating&&!process.argv.includes('--full')){
 try{
  const candidate=JSON.parse(fs.readFileSync(liveManifestPath,'utf8'));
  if(Array.isArray(candidate.routes)&&candidate.routes.length&&fs.existsSync(path.join(liveRoot,'index.html')))liveManifest=candidate;
 }catch{}
}
const currentCommit=execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();
const deletedSourceRoutes=new Set();
let incrementalRoutes=null;
let requiresFull=process.argv.includes('--full')||!liveManifest;
// Runtime-only modules are copied during incremental builds; they don't require rerendering every locale page.
const runtimeOnlyJsAssets=new Set(['assets/js/site.js','assets/js/bulk-photo-references.js']);
if(liveManifest&&!manualUpdating&&!requiresFull){
 const baseCommit=liveManifest.sourceCommit||'34a2e081f39d95245f6720a1fb3296bde3f5891d';
 let changes;
 try{
  changes=execFileSync('git',['diff','--name-status','--no-renames',baseCommit+'..'+currentCommit],{cwd:root,encoding:'utf8'}).trim().split('\n').filter(Boolean);
 }catch(error){
  console.warn('Local Git history is shallow; deepening the Hostinger checkout before using GitHub compare API.');
  try{
   execFileSync('git',['fetch','--deepen=100','origin','revision/rendimiento-traducciones-81a904c'],{cwd:root,stdio:'pipe'});
   changes=execFileSync('git',['diff','--name-status','--no-renames',baseCommit+'..'+currentCommit],{cwd:root,encoding:'utf8'}).trim().split('\n').filter(Boolean);
  }catch(fetchError){
   console.warn('History fetch unavailable; resolving changed files through GitHub compare API.');
   const response=await fetch('https://api.github.com/repos/lacasadelsushirg-pixel/ernestinho-v2/compare/'+baseCommit+'...'+currentCommit+'?per_page=100',{headers:{Accept:'application/vnd.github+json','User-Agent':'ernestinho-hostinger-build'},signal:AbortSignal.timeout(20000)});
   if(!response.ok)throw Error('Cannot compare this build with the last deployed source commit through Git or GitHub: '+error.message+'; history fetch: '+fetchError.message+'; GitHub HTTP '+response.status);
   const comparison=await response.json();
   if(!Array.isArray(comparison.files))throw Error('GitHub compare API returned no file list; refusing an incomplete incremental publication.');
   console.log('GitHub compare: '+comparison.status+', '+comparison.ahead_by+' commits ahead, '+comparison.files.length+' changed files.');
   changes=comparison.files.flatMap(file=>file.status==='renamed'&&file.previous_filename?['D\t'+file.previous_filename,'A\t'+file.filename]:[(file.status==='removed'?'D':file.status==='added'?'A':'M')+'\t'+file.filename]);
  }
 }
 const routes=new Set();let allBuzios=baseCommit==='25e117329015a3d8a7544787b6e2ab0fff5a7508';let fullRequired=false;
 if(!changes.length&&baseCommit!==currentCommit&&baseCommit!=='25e117329015a3d8a7544787b6e2ab0fff5a7508'){
  console.warn('The commit comparison is empty despite different SHAs; forcing a safe complete rebuild instead of publishing stale HTML.');
  fullRequired=true;
 }
 for(const line of changes){
  const [status,file]=line.split('\t');if(!file)continue;
  if(file.startsWith('destinos/buzios/')&&file.endsWith('.html')){
   const route=routeFor(path.join(root,file));routes.add(route);if(status==='D')deletedSourceRoutes.add(route);continue;
  }
  if(/^assets\/js\/buzios-[^/]+\.js$/.test(file)||file==='assets/css/buzios.css'){allBuzios=true;continue;}
  if(file.endsWith('.html')){const route=routeFor(path.join(root,file));routes.add(route);if(status==='D')deletedSourceRoutes.add(route);continue;}
  if((/^assets\/js\/.+\.js$/.test(file)&&!runtimeOnlyJsAssets.has(file))||file==='package.json'||file==='package-lock.json'){fullRequired=true;continue;}
 }
 if(fullRequired)requiresFull=true;
 else{
  if(allBuzios)for(const file of files){const route=routeFor(file);if(route.startsWith('/destinos/buzios/'))routes.add(route);}
  incrementalRoutes=routes;
 }
}
const useLiveIncremental=!!liveManifest&&!manualUpdating&&!requiresFull;
const updating=manualUpdating||useLiveIncremental;
const previous=manualUpdating?JSON.parse(fs.readFileSync(path.join(out,'locale-manifest.json'))):useLiveIncremental?liveManifest:null;
const selectedRoutes=pilot?new Set(pilot):useLiveIncremental?incrementalRoutes:null;
const targets=files.filter(f=>!selectedRoutes||selectedRoutes.has(routeFor(f))).flatMap(f=>['ES','PT','EN'].map(language=>({file:f,route:routeFor(f),language})));
console.log('Build mode: '+(useLiveIncremental?'incremental':'full')+'; rendering '+targets.length+' of '+(files.length*3)+' locale pages; source '+currentCommit);
// A legacy page shipped two plain-text meta declarations inside <head> without
// their opening angle bracket. Browsers treat those lines as body text. Repair
// only bare meta declarations in the head before either locale rendering path.
function repairBareHeadMeta(html){
 return html.replace(/<head\b[^>]*>[\s\S]*?<\/head>/i,head=>head.replace(/(^|\n)(\s*)meta\s+(?=(?:property|name)=["'])/g,'$1$2<meta '));
}
const escapeHtml=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function setHtmlMeta(html,attribute,key,value){
 let replaced=false;const escaped=escapeHtml(value),matchAttr=new RegExp(`\\b${attribute}=["']${key}["']`,'i');
 html=html.replace(/<meta\b[^>]*>/gi,tag=>{
  if(replaced||!matchAttr.test(tag))return tag;
  replaced=true;
  return /\bcontent\s*=/i.test(tag)?tag.replace(/\bcontent\s*=\s*(["'])[\s\S]*?\1/i,`content="${escaped}"`):tag.replace(/\s*\/?>(?=$)/,` content="${escaped}">`);
 });
 return replaced?html:html.replace(/<\/head>/i,`<meta ${attribute}="${key}" content="${escaped}"></head>`);
}
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
   let html=repairBareHeadMeta(adaptLegacyScripts(fs.readFileSync(file,'utf8'),sourcePath)).replace(/<html\b/i,'<html data-ec-locale-routes="true"');
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
if(useLiveIncremental){
 fs.rmSync(out,{recursive:true,force:true});
 fs.cpSync(liveRoot,out,{recursive:true,dereference:true});
 console.log('Seeded '+previous.routes.length+' published routes from public_html before incremental build');
}else if(!updating)fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});
// Copy assets and route-local modules/data; exclude editorial/report/build inputs.
function copy(dir,dest){for(const e of fs.readdirSync(dir,{withFileTypes:true})){
 if(ignore.has(e.name)||e.name.startsWith('.')||['package.json','package-lock.json','AGENTS.md','README.md','vercel.json','sitemap.xml'].includes(e.name))continue;
 const from=path.join(dir,e.name),to=path.join(dest,e.name);
 if(e.isDirectory()){fs.mkdirSync(to,{recursive:true});copy(from,to);}else if(!e.name.endsWith('.html'))fs.copyFileSync(from,to);
}}
copy(root,out);
for(const route of deletedSourceRoutes)for(const language of ['ES','PT','EN']){
 const localized=prefix(route,language);
 const destination=path.join(out,localized.endsWith('/')?localized.slice(1)+'index.html':localized.slice(1));
 fs.rmSync(destination,{force:true});
}
const browser=targets.length?await chromium.launch(await buildBrowserOptions()):null;
let next=0;const manifest=[];const prunedRoutes=new Set();const errors=[];
async function worker(){
 const context=await browser.newContext({viewport:{width:1365,height:900}});
 await context.route('**/*',async r=>{
   const requestUrl=new URL(r.request().url());
   if(requestUrl.origin===base){
    const requestPath=decodeURIComponent(requestUrl.pathname);
    const sourcePath=requestPath.replace(/^\/(?:pt|en)(?=\/|$)/i,'')||'/';
    let file=path.resolve(root,'.'+sourcePath);
    if(!file.startsWith(root+path.sep)&&file!==root)return r.fulfill({status:403,body:'Forbidden'});
    if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
    if(!fs.existsSync(file))return r.fulfill({status:404,body:'Not found'});
    const contentType=types[path.extname(file)]||'application/octet-stream';
    if(file.endsWith('.html')){
     let html=repairBareHeadMeta(adaptLegacyScripts(fs.readFileSync(file,'utf8'),sourcePath)).replace(/<html\b/i,'<html data-ec-locale-routes="true"');
     html=html.replace('src="https://cdn.tailwindcss.com"','src="https://cdn.tailwindcss.com/3.4.17"')
      .replace('src="https://unpkg.com/react@18/','src="https://unpkg.com/react@18.3.1/')
      .replace('src="https://unpkg.com/react-dom@18/','src="https://unpkg.com/react-dom@18.3.1/');
     html=html.replace(/<head>/i,'<head><base data-ec-build-base href="'+sourcePath+'">'+bootstrap)
      .replace(/<meta\b[^>]*http-equiv=["']refresh["'][^>]*>/gi,'');
     return r.fulfill({status:200,body:html,contentType});
    }
    return r.fulfill({status:200,body:fs.readFileSync(file),contentType});
   }
   return r.fulfill({status:200,body:libraries.get(r.request().url())||'',contentType:r.request().resourceType()==='script'?'text/javascript':'text/plain'});
  });
 const page=await context.newPage();
 while(next<targets.length){
 const target=targets[next++],route=prefix(target.route,target.language);
  try{
   if(provisionalBuziosBeach(target.route)){
    const destination=path.join(out,route.endsWith('/')?route.slice(1)+'index.html':route.slice(1));
    if(target.language==='ES'){
     fs.mkdirSync(path.dirname(destination),{recursive:true});
     fs.copyFileSync(target.file,destination);
     manifest.push({route,source:target.route,language:target.language,lang:'es',indexable:false,generated:true,passthrough:true});
    }else{
     if(fs.existsSync(destination))fs.unlinkSync(destination);
     prunedRoutes.add(route);
    }
    continue;
   }
   const source=fs.readFileSync(target.file,'utf8');
   const alias=source.match(/<meta\b[^>]*http-equiv=["']refresh["'][^>]*>/i);
   if(alias){
    const destination=new URL(alias[0].match(/url=([^"'>]+)/i)[1],base+target.route);
    const finalPath=prefix(destination.pathname,target.language)+destination.search+destination.hash;
    let html=source.replace(/<html\b[^>]*>/i,`<html lang="${target.language==='PT'?'pt-BR':target.language.toLowerCase()}">`)
      .replace(/(url=)([^"'>]+)/i,(_,key)=>key+finalPath)
      .replace(/window\.location\.replace\([^)]*\)/,`window.location.replace(${JSON.stringify(finalPath)})`)
      .replace(/(<link[^>]*rel=["']canonical["'][^>]*href=)["'][^"']*["']/i,`$1"${origin+finalPath}"`)
      .replace(/href=["']\.\.\/[^"']+["']/g,`href="${finalPath}"`);
    const seoCopy=SEO_METADATA[target.route]?.[target.language];
    if(seoCopy){
     const [title,description]=seoCopy;
     html=html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i,`<title>${escapeHtml(title)}</title>`);
     html=setHtmlMeta(html,'name','description',description);
     html=setHtmlMeta(html,'property','og:title',title);
     html=setHtmlMeta(html,'property','og:description',description);
     html=setHtmlMeta(html,'property','og:url',origin+finalPath);
     html=setHtmlMeta(html,'name','twitter:title',title);
     html=setHtmlMeta(html,'name','twitter:description',description);
    }
    const dest=path.join(out,route.slice(1)+'index.html');fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,html);
    manifest.push({route,source:target.route,language:target.language,indexable:false,redirect:finalPath});continue;
   }
   await page.goto(base+route,{waitUntil:'load',timeout:30000});
   if(new URL(page.url()).pathname!==route)throw Error('Unexpected client navigation '+page.url());
   await page.evaluate(async language=>{
    const scripts=[...document.querySelectorAll('script[type="module"][src]')];
    for(const script of scripts){if(new URL(script.src).origin===location.origin){const module=await import(script.src);if(module.ready)await module.ready;}}
    const i18n=await import('/assets/js/i18n.js');i18n.setLanguage(language);
    const site=scripts.find(s=>new URL(s.src).pathname.endsWith('/assets/js/site.js'));
    if(site)(await import(site.src)).apply(language);
    const buzios=scripts.find(s=>s.src.endsWith('/assets/js/buzios-page.js'));
    if(buzios)(await import(buzios.src)).apply(language);
    for(const name of ['luggage-page.js','bounce-integration.js']){const script=scripts.find(s=>s.src.endsWith('/assets/js/'+name));if(script)(await import(script.src)).apply(language);}
    await new Promise(r=>setTimeout(r,80));
   },target.language);
   const value=await page.evaluate(({origin,route,indexable,allRoutes,originalLanguageBar,seoCopy,standaloneTranslations})=>{
    const language=document.documentElement.lang;
    if(standaloneTranslations&&/^\/experiencias\/pedra-(?:telegrafo|gavea|bonita)\/$/.test(route.replace(/^\/(?:pt|en)(?=\/|$)/,''))){
     const selected=language==='pt-BR'?'PT':language==='en'?'EN':'ES';
     if(selected!=='ES'){
      const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
      let node;while((node=walker.nextNode())){
       const parent=node.parentElement;
       if(!parent||['SCRIPT','STYLE','NOSCRIPT'].includes(parent.tagName))continue;
       const original=node.nodeValue,trimmed=original.trim(),translation=standaloneTranslations[trimmed]?.[selected];
       if(translation)node.nodeValue=original.replace(trimmed,translation);
      }
     }
    }
    const canonical=origin+route;
    const sourcePath=route.replace(/^\/(pt|en)(?=\/|$)/,'')||'/';
    const prefix=(r,l)=>l==='es'?r:'/'+l+r;
    const isProvisionalBuziosBeach=r=>/^\/destinos\/buzios\/playas\/[^/]+\/$/.test(r);
    const setMeta=(key,content,attribute=key.includes(':')?'property':'name')=>{let m=document.querySelector(`meta[property="${key}"],meta[name="${key}"]`);if(!m){m=document.createElement('meta');m.setAttribute(attribute,key);document.head.appendChild(m);}m.content=content;m.removeAttribute('data-ec-content');};
    if(seoCopy){
     document.title=seoCopy[0];
     setMeta('description',seoCopy[1],'name');
     setMeta('og:title',seoCopy[0]);setMeta('og:description',seoCopy[1]);
    }
    if(sourcePath.startsWith('/naturaleza/')){
     setMeta('twitter:title',document.title,'name');
     setMeta('twitter:description',document.querySelector('meta[name="description"]')?.content||'','name');
     const heroAlt=document.querySelector('main img:not([src*="/assets/brand/"])')?.alt?.trim();
     const imageAlt=heroAlt||(language==='pt-BR'?'Paisagem natural do Rio de Janeiro':language==='en'?'Nature landscape in Rio de Janeiro':'Paisaje natural de Río de Janeiro');
     setMeta('og:image:alt',imageAlt);
     if(!document.querySelector('meta[name="twitter:card"]'))setMeta('twitter:card','summary_large_image','name');
    }
    const title=document.title,description=document.querySelector('meta[name="description"]')?.content;
    if(!title||!description)throw Error('Missing title/description');
    setMeta('og:title',title);setMeta('og:description',description);
    setMeta('twitter:title',title,'name');setMeta('twitter:description',description,'name');
    if(!document.querySelector('meta[property="og:image"]')){
     const image=document.querySelector('main img:not([src*="/assets/brand/"])');
     if(image?.getAttribute('src')){
      setMeta('og:image',new URL(image.getAttribute('src'),origin+sourcePath).href);
      if(image.alt)setMeta('og:image:alt',image.alt);
     }
    }
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
      if(url.origin===location.origin){
       const unlocalized=url.pathname.replace(/^\/(?:pt|en)(?=\/|$)/i,'')||'/';
       el.setAttribute(attr,(isProvisionalBuziosBeach(unlocalized)?unlocalized:url.pathname)+url.search+url.hash);
      }
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
   },{origin,route,indexable:indexableRoutes.has(target.route),allRoutes:[...indexableRoutes],originalLanguageBar:/class=["'][^"']*\blang-switcher\b/.test(source),seoCopy:SEO_METADATA[target.route]?.[target.language]||null,standaloneTranslations:STANDALONE_EXPERIENCE_TRANSLATIONS});
   // Redirect-only source documents remain redirect-only and never get hreflang.
   const original=fs.readFileSync(target.file,'utf8');const refresh=original.match(/<meta\b[^>]*http-equiv=["']refresh["'][^>]*>/i);
   if(refresh){value.html=value.html.replace('</head>',refresh[0].replace(/(url=)([^"'>]+)/i,(_,p,destination)=>{const u=new URL(destination,base+target.route);return p+prefix(u.pathname,target.language)+u.search+u.hash;})+'</head>');}
   const destination=path.join(out,route.endsWith('/')?route.slice(1)+'index.html':route.slice(1));
   fs.mkdirSync(path.dirname(destination),{recursive:true});fs.writeFileSync(destination,value.html);
   delete value.html;manifest.push({route,source:target.route,language:target.language,...value});
   if(manifest.length%100===0)console.log(`Generated ${manifest.length}/${targets.length}`);
  }catch(e){errors.push({route,error:e.message});console.error(`[build route ${route}]`,e.stack||e.message);}
 }
 await context.close();
}
try{if(browser)await Promise.all(Array.from({length:Math.max(1,Math.min(3,Number(process.env.EC_BUILD_WORKERS||3)))},worker));}finally{if(browser)await browser.close().catch(error=>console.warn('Browser close after build:',error.message));server.close();}
if(errors.length)throw Error(JSON.stringify(errors));
if(previous){const changed=new Set([...manifest.map(r=>r.route),...prunedRoutes]);manifest.push(...previous.routes.filter(r=>!changed.has(r.route)&&!deletedSourceRoutes.has(r.source)));}
manifest.sort((a,b)=>a.route.localeCompare(b.route));
const isPilot=previous?previous.pilot:!!pilot;
fs.writeFileSync(path.join(out,'locale-manifest.json'),JSON.stringify({sourceDocuments:files.length,indexablePerLanguage:indexableRoutes.size,generated:manifest.length,pilot:isPilot,sourceCommit:currentCommit,routes:manifest},null,2));
if(!isPilot)execFileSync('python3',[path.join(root,'scripts/build_sitemap.py'),'--root',out],{stdio:'inherit'});
console.log(`Complete: ${manifest.length} generated HTML; ${indexableRoutes.size} indexable URLs per language.`);
