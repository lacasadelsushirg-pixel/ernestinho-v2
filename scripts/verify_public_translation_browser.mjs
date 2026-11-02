import fs from 'node:fs';
import process from 'node:process';
import {createRequire} from 'node:module';
import {buildBrowserOptions} from './build_browser.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require('playwright-core');
const cases=JSON.parse(fs.readFileSync('docs/seo/estado-publico-84-20261102.json','utf8'));
if(cases.length!==84)throw new Error('Expected 84 historical URLs');
const bad=[];
const seen=[];
const browser=await chromium.launch(await buildBrowserOptions());
let next=0;
try{
 await Promise.all(Array.from({length:4},async()=>{
  const context=await browser.newContext({locale:'es-ES',viewport:{width:1180,height:800}});
  const page=await context.newPage();
  try{
   while(next<cases.length){
    const c=cases[next++];
    const record={url:c.url,issues:[]};
    try{
     const response=await page.goto(c.url+'?ec-browser-qa=20261102',{waitUntil:'domcontentloaded',timeout:35000});
     await page.waitForTimeout(650);
     const data=await page.evaluate(()=>({
      lang:document.documentElement.lang,
      title:document.title,
      text:document.querySelector('main')?.innerText||document.body?.innerText||'',
      canonical:document.querySelector('link[rel="canonical"]')?.href||'',
      hreflang:[...document.querySelectorAll('link[hreflang]')].map(n=>n.getAttribute('hreflang'))
     }));
     if(response?.status()!==200)record.issues.push('HTTP: '+response?.status());
     if(!data.lang.toLowerCase().startsWith(c.url.includes('/pt/')?'pt':'en'))record.issues.push('Language: '+data.lang);
     if(data.canonical!==c.url)record.issues.push('Canonical: '+data.canonical);
     if(data.text.length<100)record.issues.push('Too little main content');
     for(const label of ['es','pt-BR','en','x-default'])if(!data.hreflang.includes(label))record.issues.push('Missing hreflang '+label);
     const words=['Yo te recomiendo','Para mí,','Cuando alguien me pregunta','Yo la usaría como','Primero preguntaría la diferencia'];
     for(const marker of words)if(data.text.includes(marker))record.issues.push('Spanish retained after JS: '+marker);
     record.characters=data.text.length;
    }catch(e){record.issues.push('Browser error: '+e.message)}
    seen.push(record);
    if(record.issues.length)bad.push(record);
   }
  }finally{await context.close()}
 }));
}finally{await browser.close()}
const out={count:seen.length,passes:seen.length-bad.length,failures:bad.length,checkedAt:new Date().toISOString(),errors:bad,details:seen};
fs.writeFileSync('qa-public-browser-20261102.json',JSON.stringify(out,null,2));
console.log(JSON.stringify({count:out.count,passes:out.passes,failures:out.failures,firstErrors:bad.slice(0,12)},null,2));
if(out.count!==84||bad.length)process.exitCode=1;
