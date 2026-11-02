#!/usr/bin/env node
// Verify rendered ES/PT/EN output for pages with an indexed in-page locale dictionary.
// Read-only; requires an isolated --routes build already present in dist/.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const checks=[
 {slug:'arp-bar',es:'El mar llega a la mesa en un bar de hotel',pt:'O mar chega à mesa em um bar de hotel',en:'The ocean reaches your table at a hotel bar',
  bad:{es:['O mar chega à mesa'],pt:['El mar llega a la mesa'],en:['O mar chega à mesa','El mar llega a la mesa']}},
 {slug:'classico-leme',es:'Playa, música y cocina de quiosco',pt:'Praia, música e cozinha de quiosque',en:'Beach, music and kiosk cuisine',
  bad:{es:['O Clássico Leme não tenta esconder'],pt:['Clássico Leme no intenta ocultar'],en:['O Clássico Leme não tenta esconder','Clássico Leme no intenta ocultar']}},
 {slug:'quiteria',es:'Cocina brasileña contemporánea en la planta baja',pt:'Cozinha brasileira contemporânea no térreo',en:'Contemporary Brazilian cuisine on the ground floor',
  bad:{es:['O Quitéria tem uma estética'],pt:['Quitéria tiene una estética'],en:['O Quitéria tem uma estética','Quitéria tiene una estética']}},
 {slug:'cosmopolita',es:'Cosmopolita fue un restaurante histórico de Lapa',pt:'O Cosmopolita foi um restaurante histórico da Lapa',en:'Cosmopolita was a historic restaurant in Lapa',
  bad:{es:['La casa está asociada a la tradición gastronómica de Santa Teresa'],pt:['Associado à tradição gastronômica de Santa Teresa'],en:['historic address tied to Santa Teresa']}}
];
// Also verify short visible strings, not just paragraph text.
const shortChecks={"arp-bar":{"es":"La terraza acerca la mesa a la playa de Arpoador.","pt":"A varanda aproxima a mesa da Praia do Arpoador.","en":"The terrace brings diners closer to Arpoador Beach."},"classico-leme":{"es":"La costa forma parte de la experiencia.","pt":"A orla entra diretamente na experiência.","en":"The beachfront is part of the experience."},"quiteria":{"es":"Un salón luminoso en la planta baja del Ipanema Inn.","pt":"Um salão claro no térreo do Ipanema Inn.","en":"A bright dining room on the ground floor of the Ipanema Inn."},"cosmopolita":{"es":"Referencia histórica: no hay servicio gastronómico actual confirmado.","pt":"Referência histórica: não há atendimento gastronômico atual confirmado.","en":"Historic reference: no current restaurant service is confirmed."}};
const dec=s=>s.replace(/&nbsp;/gi,' ').replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/&#39;/gi,"'");
function visible(html){
 return dec(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'')
 .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'')
 .replace(/<!--[ \s\S]*?-->/g,'')
 .replace(/<[^>]*>/g,' ').replace(/\s+/g,' '));
}
const errors=[],results=[];
for(const test of checks){
 for(const lang of ['es','pt','en']){
  const dest=lang==='es'?path.join(root,'dist','gastronomia',test.slug,'index.html'):path.join(root,'dist',lang,'gastronomia',test.slug,'index.html');
  if(!fs.existsSync(dest)){errors.push(lang+'/'+test.slug+': missing generated HTML');continue;}
  const html=fs.readFileSync(dest,'utf8'),v=visible(html);
  let ok=v.includes(test[lang]);
  if(!ok)errors.push(lang+'/'+test.slug+': correct-language hero text missing');
  let unwanted=(test.bad[lang]||[]).filter(s=>v.includes(s));
  if(unwanted.length)errors.push(lang+'/'+test.slug+': stale text '+unwanted.join(', '));
  if(test.slug==='cosmopolita'){
   if(!v.includes('Travessa do Mosqueira'))errors.push(lang+'/cosmopolita: missing historic Lapa location');
   if(lang==='es'&&!v.includes('No hay servicio gastronómico actual confirmado'))errors.push('es/cosmopolita: no closure warning');
   if(lang==='pt'&&!v.includes('Não há serviço gastronômico atual confirmado'))errors.push('pt/cosmopolita: no closure warning');
   if(lang==='en'&&!v.includes('No current restaurant service is confirmed'))errors.push('en/cosmopolita: no closure warning');
  }
  const shortText=shortChecks[test.slug]?.[lang];
  if(shortText&&!v.includes(shortText))errors.push(lang+'/'+test.slug+': short localized text missing');
  if(lang!=='es'&&v.includes('Guía independiente de Río de Janeiro'))errors.push(lang+'/'+test.slug+': untranslated Spanish footer');
  results.push({route:lang+'/gastronomia/'+test.slug+'/',expectedText:ok,incorrectPhrases:unwanted.length,shortTextOk:!shortText||v.includes(shortText)});
 }
}
console.log(JSON.stringify({pages:results.length,checked:results,failures:errors},null,2));
if(errors.length)process.exitCode=1;
