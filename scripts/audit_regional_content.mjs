#!/usr/bin/env node
/**
 * Auditoría editorial de datos regionales (no modifica páginas).
 * node scripts/audit_regional_content.mjs [--json]
 * Controla fichas, acciones, traducciones y enlaces antes de generar.
 */
import petropolis from '../assets/js/translations/destinos/petropolis.js';
import arraial from '../assets/js/translations/destinos/arraial-do-cabo.js';
import cabo from '../assets/js/translations/destinos/cabo-frio.js';
import paraty from '../assets/js/translations/destinos/paraty.js';
import angra from '../assets/js/translations/destinos/angra-ilha-grande.js';
import fs from 'node:fs';
const manifest = JSON.parse(fs.readFileSync(new URL('../assets/data/regional-destination-photos.json', import.meta.url), 'utf8'));
const destinations = [petropolis, arraial, cabo, paraty, angra];
const sections = ['transportes','fotografias','experiencias','barrios','cultura','familia','vida-nocturna','gastronomia','consejos','naturaleza','compras','eventos'];
const langs = ['ES','PT','EN'];
const report = [];
let fatal = 0;
const text = x => typeof x === 'string' ? x : (x && typeof x === 'object' && langs.every(k => typeof x[k] === 'string')) ? x.ES : '';
function validateCopy(value, context, issues, required = true) {
  if (typeof value === 'string') {
    if (required && !value.trim()) issues.push({type:'EMPTY_COPY', context});
    return;
  }
  if (!value || typeof value !== 'object') { issues.push({type:'MISSING_COPY',context}); return; }
  for (const lang of langs) {
    if (typeof value[lang] !== 'string' || (required && !value[lang].trim())) issues.push({type:'MISSING_TRANSLATION',context,lang});
  }
  if (langs.every(k => typeof value[k] === 'string') && value.ES === value.PT && value.PT === value.EN && value.ES.length > 35) {
    issues.push({type:'SUSPECT_UNTRANSLATED',context});
  }
}
function validateCollection(items, label, d, issues) {
  if (!items || typeof items !== 'object') { issues.push({type:'MISSING_COLLECTION',context:label}); return 0; }
  let count=0;
  for (const [key, item] of Object.entries(items)) {
    const ctx = label+'/'+key;
    if (!item) {issues.push({type:'EMPTY_ITEM',context:ctx});continue;}
    if (label === 'guia') validateCopy(item.title,ctx+'/title',issues);
    validateCopy(item.intro,ctx+'/intro',issues);
    validateCopy(item.tip,ctx+'/tip',issues);
    if (!Array.isArray(item.cards) || !item.cards.length) {issues.push({type:'EMPTY_CARDS',context:ctx});continue;}
    const seen = new Set();
    for (let i=0;i<item.cards.length;i++) {
      const card=item.cards[i]; const cardCtx=ctx+'/card-'+(i+1);
      validateCopy(card.title,cardCtx+'/title',issues);
      validateCopy(card.copy,cardCtx+'/copy',issues);
      const title=text(card.title).trim().toLowerCase();
      if (seen.has(title)) issues.push({type:'DUPLICATE_CARD_TITLE',context:cardCtx});
      seen.add(title);
      const action=card.action;
      if (!action || typeof action !== 'object') {issues.push({type:'MISSING_ACTION',context:cardCtx});continue;}
      const kinds=['map','url','whatsapp','guide','page','route'].filter(k=>action[k]);
      if (kinds.length !== 1) issues.push({type:'INVALID_ACTION',context:cardCtx,kinds});
      if (action.guide && !d.guide[action.guide]) issues.push({type:'BROKEN_GUIDE_ACTION',context:cardCtx,target:action.guide});
      if (action.page && !sections.includes(action.page) && action.page !== 'guia') issues.push({type:'BROKEN_PAGE_ACTION',context:cardCtx,target:action.page});
      if (action.map) issues.push({type:'EXTERNAL_MAP_DEPENDENCY',context:cardCtx,query:action.map});
      if (action.url && /(?:tripadvisor|viator|getyourguide|guiaturistic|travelblog)/i.test(action.url)) issues.push({type:'REVIEW_TOURISM_LINK',context:cardCtx,url:action.url});
      count++;
    }
  }
  return count;
}
for (const d of destinations) {
  const issues=[];
  validateCopy(d.intro,'intro',issues);validateCopy(d.plan,'plan',issues);
  const cards=validateCollection(d.sections,'sections',d,issues);
  const guides=validateCollection(d.guide,'guia',d,issues);
  for(const key of sections) if(!d.sections?.[key])issues.push({type:'MISSING_SECTION',context:key});
  const photos=manifest[d.slug]||{};
  for(const key of ['home','guia',...sections]) if(!photos[key])issues.push({type:'MISSING_SECTION_PHOTO',context:key});
  for(const key of Object.keys(d.guide||{})) if(!photos['guia-'+key])issues.push({type:'MISSING_GUIDE_PHOTO',context:key});
  fatal+=issues.filter(i=>!['EXTERNAL_MAP_DEPENDENCY','MISSING_SECTION_PHOTO','MISSING_GUIDE_PHOTO','SUSPECT_UNTRANSLATED'].includes(i.type)).length;
  report.push({destination:d.slug,sectionCount:Object.keys(d.sections||{}).length,guideCount:Object.keys(d.guide||{}).length,cards,guideCards:guides,photoEntries:Object.keys(photos).length,issues});
}
if(process.argv.includes('--json')) console.log(JSON.stringify({destinations:report,fatal},null,2));
else {
  for(const d of report) {
    const counts={};for(const issue of d.issues)counts[issue.type]=(counts[issue.type]||0)+1;
    console.log(d.destination+': '+d.sectionCount+' secciones, '+d.guideCount+' subguías, '+(d.cards+d.guideCards)+' fichas, '+d.photoEntries+' fotos declaradas');
    console.log('  '+Object.entries(counts).map(([k,v])=>k+'='+v).join(' | '));
  }
  console.log('Errores editoriales/estructurales graves: '+fatal);
}
process.exitCode=fatal?1:0;
