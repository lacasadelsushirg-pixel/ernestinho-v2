import fs from 'node:fs';
import {createRequire} from 'node:module';
import {buildBrowserOptions} from './build_browser.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require('playwright-core');
const contract=JSON.parse(fs.readFileSync('docs/seo/contrato-traducciones-59-20261102.json','utf8'));
const routes=contract.routes.map(x=>x.file.replace(/index.html$/,''));
if(routes.length!==59||new Set(routes).size!==59)throw new Error('Missing 59 routes');
const cases=['pt','en'].flatMap(lang=>routes.map(route=>({lang,route,url:'https://www.ernestinhocarioca.com.br/'+lang+'/'+route})));
const markers=['Yo te recomiendo','Para mí,','Cuando alguien me pregunta','Yo la usaría como','Primero preguntaría la diferencia'];
const protectedPaths=['gastronomia/adega-perola/','gastronomia/confeitaria-manon/'];
let next=0,records=[],issues=[];
const browser=await chromium.launch(await buildBrowserOptions());
try{
 await Promise.all(Array.from({length:5},async()=>{
  const ctx=await browser.newContext({locale:'en-US',viewport:{width:1130,height:810}});
  const page=await ctx.newPage();
  try{
   while(next<cases.length){
    const c=cases[next++];
    const rec={url:c.url,issues:[],nav:'',characters:0,protected:protectedPaths.includes(c.route)};
    try{
     const res=await page.goto(c.url+'?qa_118_live=20261102',{waitUntil:'domcontentloaded',timeout:35000});
     await page.waitForTimeout(900);
     const v=await page.evaluate(()=>({
      lang:document.documentElement.lang||'',
      canonical:document.querySelector('link[rel="canonical"]')?.href||'',
      hreflang:[...document.querySelectorAll('link[hreflang]')].map(x=>x.getAttribute('hreflang')),
      title:document.title||'',
      description:document.querySelector('meta[name="description"]')?.content||'',
      text:document.querySelector('main')?.innerText||document.body?.innerText||'',
      nav:document.querySelector('.topbar nav')?.innerText||'',
      newEditorial:!!document.querySelector('article.ec-research4')
     }));
     rec.characters=v.text.length;rec.nav=v.nav.slice(0,240);
     if(res?.status()!==200)rec.issues.push('HTTP '+res?.status());
     if(!v.lang.toLowerCase().startsWith(c.lang))rec.issues.push('Wrong HTML language '+v.lang);
     if(v.canonical!==c.url)rec.issues.push('Canonical '+v.canonical);
     if(v.text.length<100)rec.issues.push('Main content too short');
     if(!v.title||!v.description)rec.issues.push('Missing SEO metadata');
     for(const marker of markers)if(v.text.includes(marker))rec.issues.push('Spanish remains in '+c.lang+': '+marker);
     for(const h of ['es','pt-BR','en','x-default'])if(!v.hreflang.includes(h))rec.issues.push('hreflang '+h);
     if(rec.protected&&!v.newEditorial)rec.issues.push('Recent gastronomy editorial missing');
     if(c.lang==='en'&&/\bGuía de Río\b|\bHospedaje\b|\bCompras\b/.test(v.nav))rec.issues.push('Spanish main navigation');
     if(c.lang==='pt'&&/\bGuía de Río\b|\bHospedaje\b|\bCompras\b/.test(v.nav))rec.issues.push('Spanish main navigation');
    }catch(e){rec.issues.push('Browser '+String(e.message).slice(0,240))}
    records.push(rec);if(rec.issues.length)issues.push(rec);
   }
  }finally{await ctx.close();}
 }));
}finally{await browser.close()}
const output={checked:records.length,passed:records.length-issues.length,failed:issues.length,issues,details:records,checkedAt:new Date().toISOString()};
fs.writeFileSync('qa-live-118-translations.json',JSON.stringify(output,null,2));
console.log(JSON.stringify({checked:output.checked,passed:output.passed,failed:output.failed,firstErrors:issues.slice(0,16)},null,2));
if(output.checked!==118||issues.length)process.exitCode=1;
