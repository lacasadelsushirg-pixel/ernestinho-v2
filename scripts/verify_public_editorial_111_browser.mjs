import fs from 'node:fs';
import process from 'node:process';
import { createRequire } from 'node:module';
import { buildBrowserOptions } from './build_browser.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require('playwright-core');
const routes=[
'hospedaje','compras/feira-saens-pena','compras/mercados-populares','consejos/atardeceres-inolvidables',
'experiencias/bioparque','experiencias/vidigal','destinos/buzios','destinos/buzios/playas','cultura/nossa-senhora-paz',
'cultura/bonsucesso','cultura/capuchinhos','cultura/conceicao-boa-morte','cultura/copacabana','cultura/nossa-senhora-brasil',
'cultura/nossa-senhora-penna','cultura/nossa-senhora-saude','cultura/santa-margarida','cultura/santa-rita',
'cultura/sao-francisco-paula','cultura/sao-jose-lagoa','cultura/sao-judas',
'gastronomia/merci','gastronomia/plage-cafe','vida-nocturna/boa-praca-leblon','vida-nocturna/portela',
'vida-nocturna/yoo2','vida-nocturna/quadra-salgueiro','vida-nocturna/canastra-bar','vida-nocturna/galeria-cafe',
'gastronomia/delirio-centro','gastronomia/fiorino','gastronomia/confeitaria-manon','gastronomia/curto-cafe',
'gastronomia/casa-cave','gastronomia/galeto-liceu','gastronomia/adega-perola','gastronomia/cafe-lamas'];
const cases=[...['es','pt','en'].flatMap(lang=>routes.map(route=>({
 lang,route,url:'https://www.ernestinhocarioca.com.br/'+(lang==='es'?'':lang+'/')+route+'/'
})))];
if(cases.length!==111)throw new Error('Wrong cases');
let next=0,seen=[],errors=[];
const browser=await chromium.launch(await buildBrowserOptions());
try{
 await Promise.all(Array.from({length:5},async(_,worker)=>{
  const context=await browser.newContext({viewport:{width:1180,height:790},locale:'es-ES'});
  const page=await context.newPage();
  try{
   while(next<cases.length){
    const c=cases[next++];
    const record={url:c.url,issues:[],characters:0};
    try{
     const res=await page.goto(c.url+'?ec_browser_postdeploy=20261102',{waitUntil:'domcontentloaded',timeout:33000});
     await page.waitForTimeout(450);
     const d=await page.evaluate(()=>({
      lang:document.documentElement.lang||'',
      canonical:document.querySelector('link[rel="canonical"]')?.href||'',
      hreflang:[...document.querySelectorAll('link[hreflang]')].map(x=>x.getAttribute('hreflang')),
      text:document.querySelector('main')?.innerText||document.body?.innerText||'',
      title:document.title,
      cards:[...document.querySelectorAll('.stay-feature-photo img')].map(img=>({src:img.currentSrc||img.src,fit:getComputedStyle(img).objectFit})),
      nav:[...document.querySelectorAll('.ec-primary-nav a')].map(x=>x.innerText.trim())
     }));
     if(res?.status()!==200)record.issues.push('HTTP '+res?.status());
     if(!d.lang.toLowerCase().startsWith(c.lang))record.issues.push('HTML lang '+d.lang);
     if(d.canonical!==c.url)record.issues.push('Canonical '+d.canonical);
     for(const label of ['es','pt-BR','en','x-default'])if(!d.hreflang.includes(label))record.issues.push('hreflang '+label+' absent');
     if(d.text.length<140)record.issues.push('Too little rendered content');
     if(c.route==='hospedaje'){
      if(d.cards.length!==12)record.issues.push('Apartment cards '+d.cards.length+' vs 12');
      if(d.cards.some(img=>img.fit!=='contain'))record.issues.push('Images cropping (object-fit not contain)');
     }
     if(c.lang==='en'&&c.route==='gastronomia/merci'&&!d.title.includes('Merci Secret Bar'))record.issues.push('English restaurant SEO title absent');
     if(c.lang==='es'&&c.route==='gastronomia/cafe-lamas'&&!d.text.includes('21 de octubre de 2026'))record.issues.push('Café Lamas reopening not rendered');
     if(c.lang==='en'&&c.route==='vida-nocturna/galeria-cafe'&&!/closed in February 2026/i.test(d.text))record.issues.push('Closure notice not in English');
     if(c.lang==='en'&&c.route==='hospedaje'&&!(d.text.includes('Where you stay should be part of the holiday')||d.text.includes('Choose from apartments')))record.issues.push('New English lodging pitch absent');
     if(c.lang==='en'&&c.route==='hospedaje'&&!d.nav.some(x=>x.includes('Rio Guide')))record.issues.push('Header not in English');
     record.characters=d.text.length;
    }catch(err){record.issues.push('Browser '+err.message.slice(0,200))}
    seen.push(record);if(record.issues.length)errors.push(record);
   }
  }finally{await context.close()}
 }));
}finally{await browser.close()}
const report={total:seen.length,passes:seen.length-errors.length,failures:errors.length,checkedAt:new Date().toISOString(),issues:errors,details:seen};
fs.writeFileSync('qa-public-editorial-111-browser.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({count:seen.length,passes:report.passes,failures:report.failures,firstErrors:errors.slice(0,15)},null,2));
if(seen.length!==111||errors.length)process.exitCode=1;
