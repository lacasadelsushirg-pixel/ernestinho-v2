#!/usr/bin/env node
// Verify Polis Sucos in ES/PT-BR/EN using only three generated HTML files.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const data={
 es:{intro:'Polis Sucos tiene la energía visual de una cafetería carioca',
  supplemental:'La referencia de esta ficha es Avenida Visconde de Pirajá',
  history:'Polis Sucos cuenta que nació en 1958',
  short:'La fachada forma parte del movimiento de la avenida.',
  back:'← Volver a Gastronomía',end:'IPANEMA · CASA CARIOCA DE JUGOS'},
 pt:{intro:'Polis Sucos tem a energia visual de uma lanchonete carioca',
  supplemental:'A referência desta ficha é a Avenida Visconde de Pirajá',
  history:'A Polis Sucos informa que foi fundada em 1958',
  short:'A fachada participa do movimento da avenida.',
  back:'← Voltar para Gastronomia',end:'IPANEMA · CASA DE SUCOS CARIOCA'},
 en:{intro:'Polis Sucos has the visual energy of a Rio juice bar',
  supplemental:'This listing refers to Avenida Visconde de Pirajá',
  history:'Polis Sucos says it was founded in 1958',
  short:"The storefront is part of the avenue's bustle.",
  back:'← Back to Gastronomy',end:'IPANEMA · CARIOCA JUICE BAR'}
};
const errors=[],checked=[];
for(const [lang,expected] of Object.entries(data)){
 const file=path.join(root,'dist',lang==='es'?'':lang,'gastronomia','polis-sucos','index.html');
 if(!fs.existsSync(file)){errors.push(lang+': HTML missing');continue;}
 const html=fs.readFileSync(file,'utf8');
 const text=html.replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi,'')
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'')
  .replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
 const missing=Object.entries(expected).filter(([,phrase])=>!text.includes(phrase)).map(([key])=>key);
 if(missing.length)errors.push(lang+': missing '+missing.join(', '));
 if(lang!=='es'){
  for(const stale of ['Polis Suclos tem a energia visual','La referencia de esta ficha es Avenida',
    'Polis Sucos cuenta que nació','← Volver a Gastronomía']){
    if(text.includes(stale))errors.push(lang+': untranslated/garbled '+stale);
  }
 }
 const canonical='https://www.ernestinhocarioca.com.br'+(lang==='es'?'/':'/'+lang+'/')+'gastronomia/polis-sucos/';
 if(!html.includes(canonical)||!html.includes('hreflang'))errors.push(lang+': missing SEO routing');
 checked.push({lang,checks:Object.keys(expected).length,missing});
}
console.log(JSON.stringify({pages:checked.length,results:checked,errors},null,2));
if(errors.length)process.exitCode=1;
