import fs from 'node:fs';
import {createRequire} from 'node:module';
import {buildBrowserOptions} from './build_browser.mjs';
const {chromium}=createRequire(import.meta.url)('playwright-core');
const cases=[
 {path:'/pt/hospedaje/',description:'Conheça'},
 {path:'/compras/feira-saens-pena/',title:'Saens Peña'},
 {path:'/pt/compras/feira-saens-pena/',title:'Saens Peña'},
 {path:'/en/compras/feira-saens-pena/',title:'Saens Peña'},
 {path:'/consejos/atardeceres-inolvidables/',title:'Río'},
 {path:'/pt/consejos/atardeceres-inolvidables/',title:'Pôr do sol'},
 {path:'/en/consejos/atardeceres-inolvidables/',title:'Rio'}
];
const browser=await chromium.launch(await buildBrowserOptions()),results=[];
try{
 const page=await browser.newPage({locale:'en-US',viewport:{width:1100,height:780}});
 for(const c of cases){
  let issues=[];
  try{
   const r=await page.goto('https://www.ernestinhocarioca.com.br'+c.path+'?ec_live_meta_qa=20261102',{waitUntil:'domcontentloaded',timeout:32000});
   await page.waitForTimeout(1200);
   const x=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name="description"]')?.content||'',canonical:document.querySelector('link[rel="canonical"]')?.href||''}));
   if(r?.status()!==200)issues.push('HTTP '+r?.status());
   if(c.title&&!x.title.includes(c.title))issues.push('Expected title '+c.title+'; actual '+x.title);
   if(c.description&&!x.description.includes(c.description))issues.push('Expected description '+c.description+'; actual '+x.description);
   if(/[ÃÂ�]|â/.test(x.title+x.description))issues.push('Mojibake still present');
   if(x.canonical!=='https://www.ernestinhocarioca.com.br'+c.path)issues.push('Incorrect canonical');
   results.push({path:c.path,title:x.title,descriptionSample:x.description.slice(0,130),issues});
  }catch(e){results.push({path:c.path,issues:['Browser '+String(e.message).slice(0,140)]})}
 }
 await page.close();
}finally{await browser.close()}
const fails=results.filter(x=>x.issues.length);
fs.writeFileSync('seo-accent-qa-live.json',JSON.stringify({total:results.length,passed:results.length-fails.length,failures:fails,results},null,2));
console.log(JSON.stringify({total:results.length,passed:results.length-fails.length,failed:fails.length,details:results},null,2));
if(fails.length)process.exitCode=1;
