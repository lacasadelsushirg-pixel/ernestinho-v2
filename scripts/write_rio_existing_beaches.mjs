// Add bilingual editorial depth to existing beach routes without replacing
// their original text, photographs, map or video.
import fs from 'node:fs';
import path from 'node:path';
import {definitions as firstDefinitions,sharedHeadings,safeNote} from '../assets/js/translations/rio-existing-beaches.js';
import {definitions as nextDefinitions} from '../assets/js/translations/rio-existing-beaches-02.js';
const definitions={...firstDefinitions,...nextDefinitions};
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels={
  access:['Consultar mar y balneabilidad en INEA ↗','Consultar mar e balneabilidade no INEA ↗','Check INEA sea and bathing reports ↗'],
  return:['← Volver a Playas','← Voltar às Praias','← Back to Beaches'],
  pets:['Guía de playa con mascotas','Guia de praia com pets','Beach guide for pets'],
  sea:['Guía para decidir con el estado del mar','Guia para decidir conforme o mar','Guide to checking sea conditions'],
  transit:['Consultar estaciones en MetrôRio ↗','Consultar estações no MetrôRio ↗','Check MetrôRio stations ↗']
};
const phraseMap={};
for(const item of Object.values(definitions)){
  phraseMap[item.title[0]]={PT:item.title[1],EN:item.title[2]};
  item.paragraphs.forEach(p=>phraseMap[p[0]]={PT:p[1],EN:p[2]});
}
sharedHeadings.forEach(p=>phraseMap[p[0]]={PT:p[1],EN:p[2]});
phraseMap[safeNote[0]]={PT:safeNote[1],EN:safeNote[2]};
for(const [k,v] of Object.entries(labels))phraseMap[v[0]]={PT:v[1],EN:v[2]};
const marker='/* RIO_EXISTING_BEACH_TRANSLATIONS */';
const chunk=path.join(root,'assets/js/translations/chunks/playas-02.js');
let source=fs.readFileSync(chunk,'utf8');
const missing=Object.fromEntries(Object.entries(phraseMap).filter(([key])=>!source.includes(JSON.stringify(key)+':')));
if(!source.includes(marker)) source=source.replace('export default {',`export default {${marker}${JSON.stringify(phraseMap).slice(1,-1)},`,1);
else if(Object.keys(missing).length) source=source.replace('export default {',`export default {${JSON.stringify(missing).slice(1,-1)},`,1);
fs.writeFileSync(chunk,source);
for(const [route,item] of Object.entries(definitions)){
 const file=path.join(root,route.slice(1),'index.html');
 let html=fs.readFileSync(file,'utf8');
 const cards=item.paragraphs.map((p,n)=>`<article class="beach-card"><h3>${esc(sharedHeadings[n][0])}</h3><p>${esc(p[0])}</p></article>`).join('');
 const section=`<section class="beach-editorial" data-rio-depth-v1><h2>${esc(item.title[0])}</h2><div class="beach-grid">${cards}</div><p class="beach-note">${esc(safeNote[0])}</p><p><a href="https://www.inea.rj.gov.br/ar-agua-e-solo/balneabilidade-das-praias/">${esc(labels.access[0])}</a> · <a href="/consejos/estado-del-mar-playas/">${esc(labels.sea[0])}</a> · <a href="https://www.metrorio.com.br/Estacoes">${esc(labels.transit[0])}</a> · <a href="/consejos/mascotas-rio/">${esc(labels.pets[0])}</a></p><p><a href="../">${esc(labels.return[0])}</a></p></section>`;
 if(html.includes('data-rio-depth-v1')) html=html.replace(/<section class="beach-editorial" data-rio-depth-v1>[\s\S]*?<\/section>/,section);
 else html=html.replace('</main>',section+'</main>');
 fs.writeFileSync(file,html);
 console.log('Editorial depth added: '+route);
}
