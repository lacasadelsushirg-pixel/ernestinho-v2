// Read-only Petrópolis HTML preview / QA. Run: node scripts/audit_petropolis_preview.mjs
// Optional --out=/tmp/ernestinho-petropolis-preview writes only to a temporary directory.
// It never runs the live build, deploys files, or alters public_html / Rio source pages.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { verifyApprovedContent } from './guard_approved_content.mjs';
import { root, langs, pre } from './buzios_mirror_core.mjs';
import { regionalRoutes, renderRegionalRoute } from './build_regional_destinations.mjs';

verifyApprovedContent(root); // Fail closed before any rendering or filesystem mutation.
const area = '/destinos/petropolis/';
const routes = regionalRoutes.filter(route => route.startsWith(area));
const siteRoutes = new Set(regionalRoutes);
const requiredDistricts = 11;
const requiredCulturalSites = 15;
const requiredDetail = [
  area + 'guia/', area + 'guia/errores-frecuentes/',
  area + 'barrios/', area + 'cultura/', area + 'transportes/',
  area + 'guia/llegada/', area + 'guia/itinerarios-1-2-3-dias/',
  area + 'guia/sin-auto/', area + 'guia/primera-visita/',
];
const errors = [], warnings = [];
const previewArg = process.argv.find(arg => arg.startsWith('--out='));
let out = null;
if (previewArg) {
  out = path.resolve(previewArg.slice(6));
  const temp = path.resolve(os.tmpdir());
  if (out === temp || !out.startsWith(temp + path.sep)) {
    throw Error('Preview must write into a dedicated subdirectory of the system temp folder, not into website, dist, or public_html');
  }
}
const cultureSlugs = routes.filter(route => route.startsWith(area + 'cultura/') && route !== area + 'cultura/');
const districtSlugs = routes.filter(route => route.startsWith(area + 'barrios/') && route !== area + 'barrios/');
if (districtSlugs.length !== requiredDistricts) errors.push('Barrios: expected 11 detail routes, got ' + districtSlugs.length);
if (cultureSlugs.length !== requiredCulturalSites) errors.push('Cultura: expected 15 detail routes, got ' + cultureSlugs.length);
for (const route of requiredDetail) if (!siteRoutes.has(route)) errors.push('Missing section route ' + route);
const records = [];
for (const route of routes) {
  for (const lang of langs) {
    let html;
    try { html = renderRegionalRoute(route, lang); }
    catch (error) { errors.push(lang + ' ' + route + ': failed to render: ' + error.message); continue; }
    const name = lang + ' ' + route;
    if (!html.startsWith('<!doctype html>')) errors.push(name + ': missing HTML doctype');
    const h1 = [...html.matchAll(/<h1\b/gi)].length;
    if (h1 !== 1) errors.push(name + ': expected 1 h1, got ' + h1);
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || '';
    if (!head) errors.push(name + ': missing head');
    const canonical = 'https://www.ernestinhocarioca.com.br' + pre(lang) + route;
    if (!head.includes('href="' + canonical + '"')) errors.push(name + ': wrong canonical');
    if (!html.includes('id="contenido"')) errors.push(name + ': missing main landmark');
    if (!html.includes('data-ec-locale-routes="true"')) errors.push(name + ': missing locale routing');
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
    if (ids.length !== new Set(ids).size) errors.push(name + ': duplicate HTML IDs');
    for (const anchor of html.matchAll(/href="#([^"]+)"/g)) {
      if (!ids.includes(anchor[1])) errors.push(name + ': broken internal anchor #' + anchor[1]);
    }
    // Check internal links to generated Petrópolis routes; external targets and other sections are independent.
    for (const anchor of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      const href = anchor[1].replaceAll('&amp;', '&');
      if (!href.startsWith(pre(lang) + area)) continue;
      const routePart = href.slice(pre(lang).length).split(/[?#]/)[0];
      if (!siteRoutes.has(routePart)) errors.push(name + ': broken Petrópolis link ' + routePart);
    }
    const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map(m => m[0]);
    for (const img of imgs) {
      if (!/\balt="[^"]*"/.test(img)) errors.push(name + ': image missing alt');
      const src = img.match(/\bsrc="([^"]+)"/)?.[1] || '';
      if (src.startsWith('/') && !src.startsWith('//') && !fs.existsSync(path.join(root, decodeURI(src).split('?')[0].slice(1)))) {
        warnings.push(name + ': photo to verify on Hostinger ' + src);
      }
    }
    if ((route.startsWith(area + 'barrios/') && route !== area + 'barrios/') && !html.includes('petr-bairro-stops')) errors.push(name + ': missing district editorial');
    if ((route.startsWith(area + 'cultura/') && route !== area + 'cultura/') && !html.includes('petr-culture-depth')) errors.push(name + ': missing culture editorial');
    const cardsByClass = className => [...html.matchAll(/class="([^"]+)"/g)]
      .filter(match => match[1].split(' ').includes(className)).length;
    if (route === area + 'barrios/' && cardsByClass('topic') !== 11) errors.push(name + ': district index does not show 11 cards');
    if (route === area + 'cultura/' && (html.match(/class="culture-card"/g) || []).length !== 15) errors.push(name + ': culture index does not show 15 cards');
    if(route === area + 'guia/'){
      const guideBlocks=[...html.matchAll(/class="[^"]*petr-guide-card[^"]*"/g)];
      const hrefs=[...html.matchAll(/<a class="petr-guide-card" href="([^"]+)"/g)].map(x=>x[1]);
      const cardPhotos=[...html.matchAll(/<a class="petr-guide-card" href="[^"]+">([\s\S]*?)<\/a>/g)].map(x=>x[1].match(/<img[^>]+src="([^"]+)"/)?.[1]).filter(Boolean);
      if(guideBlocks.length!==12||hrefs.length!==12)errors.push(name+': expected exactly 12 index cards');
      if(new Set(hrefs).size!==12)errors.push(name+': repeated guide links in index');
      if(cardPhotos.length!==12||new Set(cardPhotos).size!==12)errors.push(name+': guide index needs 12 distinct verified photo references');
      if(!html.includes('petr-guide-shortcuts'))errors.push(name+': missing fast decision navigation');
    }
    if(route === area + 'guia/errores-frecuentes/'){
      const sections=[...html.matchAll(/<article id="(rodoviaria|terminal|museo-lunes|muchos-lugares|lunes-guias|maleta|lluvia|app|taxa|pendientes)"/g)];
      if(sections.length!==10)errors.push(name+': expected ten original frequent mistakes');
      if(cardsByClass('petr-fact-card')!==3)errors.push(name+': expected three quick mistake prevention cards');
    }
    const guideCardExpectations = [
      [area + 'guia/terminales/', 4],
      [area + 'guia/accesibilidad/', 3],
      [area + 'guia/guarda-equipaje/', 3],
      [area + 'guia/viajar-solo/', 3],
      [area + 'guia/llegada/', 3],
      [area + 'guia/itinerarios-1-2-3-dias/', 3],
      [area + 'guia/sin-auto/', 4],
      [area + 'guia/primera-visita/', 3],
    ];
    for (const [guideRoute, expected] of guideCardExpectations) {
      if (route === guideRoute && cardsByClass('petr-fact-card') !== expected) {
        errors.push(name + ': expected ' + expected + ' practical guide choice cards');
      }
    }
    for (const guideRoute of [area+'guia/sin-auto/',area+'guia/primera-visita/']) {
      if(route===guideRoute) {
        const chapters=[...html.matchAll(/<article id="(chegada-bingen|centro-a-pie|quitandinha|correas|itaipava|bonfim|apps|tarifas|movilidad|antes-de-sair|museu-imperial|catedral-koeler|cristal|santos-dumont|presupuesto|practico)"/g)];
        if(chapters.length!==9)errors.push(name+': expected 9 independent detailed chapters; got '+chapters.length);
        if(!html.includes('museuimperial.museus.gov.br/organize-sua-visita/'))
          errors.push(name+': missing official museum information');
      }
    }
    if (route === area + 'guia/llegada/') {
      const chapters = [...html.matchAll(/<article id="(novo-rio|outros-pontos|aeropuertos|bingen|urbano|carro|volta|malas)"/g)];
      if (chapters.length !== 8) errors.push(name + ': expected 8 arrival chapters, got ' + chapters.length);
      if (!html.includes('unica-facil.com.br/pontos-de-venda/'))
        errors.push(name + ': missing official intercity operator reference');
    }
    if (route === area + 'guia/itinerarios-1-2-3-dias/') {
      if (cardsByClass('petr-day-card') !== 6) errors.push(name + ': expected 6 complete day-plan cards');
      if (cardsByClass('petr-when') !== 19) errors.push(name + ': expected 19 individually described itinerary stops');
      if (!html.includes('id="roteiro-tres-3"')) errors.push(name + ': missing third-day route');
      if (!html.includes('museuimperial.museus.gov.br/organize-sua-visita/'))
        errors.push(name + ': missing official Imperial Museum visitor source');
    }
    if (route === area + 'guia/mes-a-mes/') {
      if (cardsByClass('petr-month-card') !== 12 || cardsByClass('petr-season-card') !== 4)
        errors.push(name + ': expected 12 month recommendations and 4 seasonal cards');
      const rainyChoices = [...html.matchAll(/class="petr-month-advice"/g)];
      if (rainyChoices.length !== 12) errors.push(name + ': incomplete practical month-by-month advice');
    }
    if (route === area + 'guia/viajar-solo/') {
      const sections = [...html.matchAll(/<article id="(bingen-dia|dos-dias|lluvia-solo|senderos)"/g)];
      if (sections.length !== 4) errors.push(name + ': missing new solo-travel routes');
    }
    if (route === area + 'guia/emergencias/') {
      const emergencyCalls = [...html.matchAll(/href="tel:(192|193|190|199)"/g)];
      if (emergencyCalls.length < 4 || !html.includes('class="petr-urgent-actions"'))
        errors.push(name + ': missing main emergency phone action panel');
    }
    if (out) {
      const filename = path.join(out, pre(lang).slice(1), route.slice(1), 'index.html');
      fs.mkdirSync(path.dirname(filename), { recursive:true });
      fs.writeFileSync(filename, html);
    }
    records.push({route, lang, bytes: Buffer.byteLength(html), images: imgs.length});
  }
}
const counts = {regionalRoutes:routes.length, districtDetailRoutes:districtSlugs.length,
  cultureDetailRoutes:cultureSlugs.length, generated: records.length,
  errors: errors.length, imageWarnings: warnings.length};
console.log(JSON.stringify({status: errors.length ? 'FAIL' : 'PASS', counts, errors,
  warnings: [...new Set(warnings)].slice(0,40), output: out || '(check-only; no files written)'}, null, 2));
if (errors.length) process.exitCode = 1;
