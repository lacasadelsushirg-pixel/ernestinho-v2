import fs from 'node:fs';
import {createRequire} from 'node:module';
import {buildBrowserOptions} from './build_browser.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require('playwright-core');
const records=JSON.parse(fs.readFileSync('site-wide-audit-20261102.json','utf8')).records;
const origin='https://www.ernestinhocarioca.com.br';
const root=url=>url.replace(origin,'').replace(/^\/(?:pt|en)\//,'/');
const es=new Map(records.filter(x=>x.lang==='es').map(x=>[root(x.url),x]));
const picks=records.filter(x=>x.lang!=='es'&&((x.spanishSixgramFraction||0)>0.5||x.spanishMarkers?.length));
const choose=(name,n)=>picks.filter(x=>name==='buzios'?x.url.includes('/destinos/buzios/'):name==='compras'?x.url.includes('/compras/'):x.url.includes('/gastronomia/')).sort((a,b)=>(b.spanishMarkers?.length||0)-(a.spanishMarkers?.length||0)||(b.spanishSixgramFraction||0)-(a.spanishSixgramFraction||0)).slice(0,n);
const selected=[...choose('buzios',12),...choose('gastronomia',18),...choose('compras',6)];
function grams(txt) {const words=(txt||'').toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').match(/[\p{L}\p{N}]+/gu)||[];const a=new Set();for(let i=0;i+6<=words.length;i++)a.add(words.slice(i,i+6).join(' '));return a}
function overlap(a,b){let one=grams(a),two=grams(b),n=0;for(let v of one)if(two.has(v))n++;return one.size?Number((n/one.size).toFixed(3)):0}
const browser=await chromium.launch(await buildBrowserOptions());
let cursor=0;const results=[];
try{
 await Promise.all(Array.from({length:4},async()=>{
  const context=await browser.newContext({locale:'es-ES',viewport:{width:1180,height:800}});
  const page=await context.newPage();
  try{
   while(cursor<selected.length){
    const r=selected[cursor++],item={url:r.url,before:r.spanishSixgramFraction,markersBefore:r.spanishMarkers||[]};
    try{
     const response=await page.goto(r.url+'?audit20261102=1',{waitUntil:'domcontentloaded',timeout:30000});
     await page.waitForTimeout(550);
     const data=await page.evaluate(()=>({lang:document.documentElement.lang,text:document.querySelector('main')?.innerText||document.body?.innerText||''}));
     item.http=response?.status();
     item.lang=data.lang;
     item.after=overlap(data.text,es.get(root(r.url))?.main);
     item.markersAfter=['Yo te recomiendo','Para mí,','Yo la recomendaría','Cuando alguien me pregunta'].filter(m=>data.text.includes(m));
     item.sample=data.text.slice(0,240);
    }catch(e){item.error=String(e.message).slice(0,180)}
    results.push(item);
   }
  }finally{await context.close()}
 }));
}finally{await browser.close()}
const summary={checked:results.length,stillHighOverlap:results.filter(x=>x.after>0.5).length,stillSpanishMarkers:results.filter(x=>x.markersAfter?.length).length,errors:results.filter(x=>x.error).length,examples:results.filter(x=>x.after>0.5||x.markersAfter?.length).slice(0,25).map(x=>({url:x.url,before:x.before,after:x.after,markersAfter:x.markersAfter,sample:x.sample}))};
fs.writeFileSync('site-wide-audit-browser-sample-20261102.json',JSON.stringify({summary,results},null,2));
console.log(JSON.stringify(summary,null,2));
