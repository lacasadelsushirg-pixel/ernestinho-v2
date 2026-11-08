#!/usr/bin/env node
/**
 * QA de páginas regionales ya generadas en carpeta temporal.
 * Uso: node scripts/verify_regional_stage.mjs /ruta/al/stage
 * No genera páginas ni modifica archivos. Revisa ES/PT/EN y enlaces/imagenes internos.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import petropolis from '../assets/js/translations/destinos/petropolis.js';
import arraial from '../assets/js/translations/destinos/arraial-do-cabo.js';
import cabo from '../assets/js/translations/destinos/cabo-frio.js';
import paraty from '../assets/js/translations/destinos/paraty.js';
import angra from '../assets/js/translations/destinos/angra-ilha-grande.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const stage = path.resolve(process.argv[2] || '');
if (!process.argv[2] || !fs.existsSync(stage)) {
  console.error('Uso: node scripts/verify_regional_stage.mjs /ruta/al/stage');
  process.exit(2);
}
const langs = ['es', 'pt', 'en'];
const destinations = [petropolis, arraial, cabo, paraty, angra];
const sections = ['guia', 'transportes', 'fotografias', 'experiencias', 'barrios', 'cultura', 'familia', 'vida-nocturna', 'gastronomia', 'consejos', 'naturaleza', 'compras', 'eventos'];
let errors = 0;
let pages = 0;
const issue = (kind, file, detail) => { errors++; console.log(kind + ': ' + path.relative(stage, file) + ' ' + detail); };
function pageFile(route) {
  const cleaned = route.replace(/^\/+/, '');
  return path.join(stage, cleaned, 'index.html');
}
function candidateRoutes(d) {
  return [
    '/destinos/' + d.slug + '/',
    ...sections.map(s => '/destinos/' + d.slug + '/' + s + '/'),
    ...Object.keys(d.guide || {}).map(s => '/destinos/' + d.slug + '/guia/' + s + '/')
  ];
}
for (const lang of langs) {
  for (const d of destinations) {
    for (const route of candidateRoutes(d)) {
      // El generador usa prefijos ES/PT/EN; resolver el nombre de directorio a partir de salida real.
      const prefixed = [lang, lang === 'es' ? 'espanol' : lang === 'pt' ? 'portugues' : 'english'];
      const candidates = [pageFile('/' + lang + route), ...prefixed.map(p => pageFile('/' + p + route))];
      const file = candidates.find(fs.existsSync);
      if (!file) { issue('MISSING', candidates[0], 'No se encontró ruta en prefijos previstos'); continue; }
      pages++;
      const html = fs.readFileSync(file, 'utf8');
      if (!/<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>/i.test(html)) issue('H1', file, 'Sin H1');
      if (!/<html\s[^>]*lang=/i.test(html)) issue('LANG', file, 'Sin lang');
      if (!/rel=["']canonical["']/i.test(html)) issue('CANONICAL', file, 'Sin canonical');
      if (!/name=["']viewport["']/i.test(html)) issue('VIEWPORT', file, 'Sin viewport');
      if (!/href=["'][^"']+["']\s+hreflang=|hreflang=["']/i.test(html)) issue('HREFLANG', file, 'Sin hreflang');
      const images = [...html.matchAll(/<img\b[^>]*>/gi)].map(m => m[0]);
      for (const img of images) {
        if (!/\balt=["'][^"']*["']/i.test(img)) issue('ALT', file, img.slice(0, 120));
        const src = img.match(/\bsrc=["']([^"']+)["']/i)?.[1];
        if (src?.startsWith('/')) {
          const asset = path.resolve(root, '.' + decodeURIComponent(src.split('?')[0]));
          if (asset.startsWith(root + path.sep) && !fs.existsSync(asset)) issue('IMG', file, src);
        }
      }
      if (route === '/destinos/' + d.slug + '/') {
        const cardImages = (html.match(/class=["'][^"']*guide-thumb/g) || []).length;
        if (cardImages < sections.length) issue('THUMBNAILS', file, cardImages + '/' + sections.length + ' tarjetas con miniatura');
      }
      if (/google\.com\/maps\/search/i.test(html)) issue('EXTERNAL_MAP', file, 'Se detectó Google Maps en vez de mapa interno');
      if (/href=["']https?:\/\/(?!wa\.me)/i.test(html)) {
        // No marcar como error: puede ser enlace oficial, licencia o fuente. Revisar manualmente.
        console.log('REVIEW_EXTERNAL: ' + path.relative(stage, file));
      }
    }
  }
}
console.log('Páginas verificadas: ' + pages + '; incidencias: ' + errors);
console.log('Advertencia: no sustituye revisión visual 1440/390 ni verificación de identidad/licencia fotográfica.');
process.exitCode = errors ? 1 : 0;
