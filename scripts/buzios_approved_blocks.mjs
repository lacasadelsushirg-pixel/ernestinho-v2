import fs from 'node:fs';
import path from 'node:path';
import { root, esc } from './buzios_mirror_core.mjs';
import { approvedBlockTranslations } from '../assets/js/translations/chunks/buzios-approved-blocks.js';

// These editorial blocks were approved in the route sources after the mirror
// generators were introduced. Keep their markup, order and links on rebuilds.
const blocks = {
  '/destinos/buzios/consejos/lluvia/': {
    key: 'rain',
    section: /<section><h2>Plan según la intensidad[^]*?<\/section>/,
    anchors: { ES: '<section><h2>Qué evitar', PT: '<section><h2>O que evitar', EN: '<section><h2>What to avoid' },
  },
  '/destinos/buzios/guia/seguro/': {
    key: 'insurance',
    section: /<section class="bz-insurance-banner"[^]*?<\/section>/,
    anchors: { ES: '<section><h2>Prepara tu salida', PT: '<section><h2>Prepare sua saída', EN: '<section><h2>Prepare your departure' },
  },
  '/destinos/buzios/transportes/vans/': {
    key: 'vans',
    section: /<section class="guide-section" id="planificar-conexiones"[^]*?<\/section>/,
    anchors: { ES: '<p class="source-date">', PT: '<p class="source-date">', EN: '<p class="source-date">' },
  },
};

export function preserveApprovedBlocks(html, route, language) {
  const block = blocks[route];
  if (!block) return html;

  const source = fs.readFileSync(path.join(root, route.slice(1), 'index.html'), 'utf8');
  let section = source.match(block.section)?.[0];
  const anchor = block.anchors[language];
  if (!section || !html.includes(anchor)) throw new Error('Missing approved Búzios section or insertion point: ' + route);

  if (language !== 'ES') {
    const translations = approvedBlockTranslations[block.key][language];
    let index = 0;
    section = section.replace(/>([^<>]+)</g, (match, text) => {
      if (!text.trim()) return match;
      return '>' + esc(translations[index++]) + '<';
    });
    if (index !== translations.length) throw new Error('Approved Búzios copy changed: ' + route);
  }
  return html.replace(anchor, () => section + anchor);
}
