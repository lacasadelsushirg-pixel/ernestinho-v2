// Run the real embedded paragraph renderers with their actual page paragraphs.
// This checks language switching and restoration; it does not replace browser QA.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
let checked=0;const errors=[];
for(const name of fs.readdirSync(path.join(root,'gastronomia'))){
 const file=path.join(root,'gastronomia',name,'index.html');if(!fs.existsSync(file))continue;
 const source=fs.readFileSync(file,'utf8');
 const scripts=[...source.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].filter(m=>!m[1].includes('application/ld+json') && !m[1].includes('src='));
 const target=scripts.find(m=>m[2].includes('const D=')&&m[2].includes("querySelectorAll('p')"));if(!target)continue;
 const paragraphs=[...source.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/g)].map(m=>({innerHTML:m[1]}));
 const initial=paragraphs.map(p=>p.innerHTML);
 const buttons=['es','pt','en'].map(lang=>({dataset:{lang},handlers:[],addEventListener(type,fn){if(type==='click')this.handlers.push(fn)}}));
 const context=vm.createContext({document:{querySelectorAll(selector){if(selector==='p')return paragraphs;if(selector==='.lang-switcher button')return buttons;throw Error('Unhandled selector '+selector)}}});
 try{
  new vm.Script(target[2],{filename:name}).runInContext(context,{timeout:2000});
  const es=paragraphs.map(p=>p.innerHTML);
  for(const lang of ['pt','en','es','en','pt','es']){
   buttons.find(b=>b.dataset.lang===lang).handlers.forEach(fn=>fn());
   if(paragraphs.some(p=>typeof p.innerHTML!=='string'||p.innerHTML.includes('undefined')))throw Error('Invalid content for '+lang);
   if(lang==='es'&&JSON.stringify(es)!==JSON.stringify(paragraphs.map(p=>p.innerHTML)))throw Error('Spanish restoration failed');
  }
  if(['samba-social','classico-leme'].includes(name)){
   for(const lang of ['es','en']){
    buttons.find(b=>b.dataset.lang===lang).handlers.forEach(fn=>fn());
    const text=paragraphs.map(p=>p.innerHTML).join(' ');
    if(/(?:voltadel|bebidthe|Aveniof|fotografilas|petisclos|conferirthe)/.test(text))throw Error('Corrupt translation remains');
   }
   buttons.find(b=>b.dataset.lang==='pt').handlers.forEach(fn=>fn());
   // Portuguese content must retain all original paragraphs; labels are translated.
   initial.forEach((p,i)=>{const strip=x=>x.replace(/<strong>.*?<\/strong>/,'');if(strip(p)!==strip(paragraphs[i].innerHTML))throw Error('Portuguese source changed at '+i)});
  }
  checked++;
 }catch(error){errors.push({name,error:error.message})}
}
console.log(JSON.stringify({checked,errors,note:'Real inline scripts in a minimal DOM simulation; visual browser verification remains required.'},null,2));
if(errors.length)process.exitCode=1;
