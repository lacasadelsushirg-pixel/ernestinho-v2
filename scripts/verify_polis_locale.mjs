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
 const expectedAdvice={
  es:['En Polis Sucos, una buena idea es elegir primero el jugo natural','Combinaría Polis con la Playa de Ipanema','La casa de jugos funciona como una pausa ligera'],
  pt:['No Polis Sucos, uma boa ideia é escolher primeiro o suco natural','Eu combinaria o Polis com a Praia de Ipanema','A casa de sucos é uma pausa leve'],
  en:['At Polis Sucos, start with a fresh juice','I would combine Polis with Ipanema beach','The juice shop is a light break']
 };
 for(const phrase of expectedAdvice[lang])if(!text.includes(phrase))errors.push(lang+': missing or shifted itinerary paragraph '+phrase);
 const expectedFacts={
  es:['Dirección','Barrio y zona','Horarios','Precios','Tipo de servicio','Contacto','Reservas','Accesibilidad','Transporte'],
  pt:['Endereço','Bairro e região','Horários','Preços','Tipo de serviço','Contato','Reservas','Acessibilidade','Transporte'],
  en:['Address','Neighborhood and area','Opening hours','Prices','Type of service','Contact','Reservations','Accessibility','Transportation']
 };
 const paras=[...html.matchAll(/<p\\b[^>]*>([\\s\\S]*?)<\\/p>/gi)].map(m=>m[1].replace(/<[^>]*>/g,' ').replace(/\\s+/g,' ').trim());
 for(let n=0;n<9;n++){
  const label=expectedFacts[lang][n];
  if(!paras[10+n]||!paras[10+n].includes(label))errors.push(lang+': misaligned quick fact '+(n+10)+' '+label);
 }

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
