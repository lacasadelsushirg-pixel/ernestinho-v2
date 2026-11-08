#!/usr/bin/env node
/**
 * Auditoría de miniaturas regionales, sin modificar páginas ni descargar fotos.
 * Ejecutar: node scripts/audit_regional_thumbnails.mjs
 * Exit 1 si faltan miniaturas de portada, guías o archivos locales.
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
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'assets/data/regional-destination-photos.json'), 'utf8'));
const destinations = [petropolis, arraial, cabo, paraty, angra];
const sections = ['guia', 'transportes', 'fotografias', 'experiencias', 'barrios', 'cultura', 'familia', 'vida-nocturna', 'gastronomia', 'consejos', 'naturaleza', 'compras', 'eventos'];
let failures = 0;
for (const d of destinations) {
  const photos = manifest[d.slug] || {};
  const missing = sections.filter(s => !photos[s]);
  const guideCount = Object.keys(d.guide || {}).length;
  const guidePhotoCount = Object.keys(d.guide || {}).filter(slug => photos['guide-' + slug]?.src).length;
  const missingGuidePhotos = Object.keys(d.guide || {}).filter(slug => !photos['guide-' + slug]?.src);
  const missingFiles = Object.entries(photos).filter(([,photo]) => {
    if (!photo.src || !photo.src.startsWith('/')) return true;
    const local = path.resolve(root, '.' + photo.src);
    return !local.startsWith(root + path.sep) || !fs.existsSync(local);
  }).map(([section]) => section);
  const incomplete = Object.entries(photos).filter(([,photo]) => !photo.source || !photo.license || !photo.artist).map(([section]) => section);
  const missingAlt = Object.entries(photos).filter(([,photo]) => !photo.alt).map(([section]) => section);
  const risk = missing.length + missingFiles.length + incomplete.length + (guideCount > guidePhotoCount ? 1 : 0) + (!photos.home ? 1 : 0);
  failures += risk;
  console.log('\n' + d.name + ' (' + d.slug + ')');
  console.log('  Home: ' + (photos.home ? photos.home.src : 'FALTA'));
  console.log('  Secciones con miniatura: ' + (sections.length - missing.length) + '/' + sections.length);
  console.log('  Sin miniatura: ' + (missing.join(', ') || 'ninguna'));
  console.log('  Guías: ' + guideCount + '; miniaturas propias asignadas: ' + guidePhotoCount + (guideCount > guidePhotoCount ? ' [INCOMPLETO]' : ''));
  console.log('  Guías sin foto propia: ' + (missingGuidePhotos.join(', ') || 'ninguna'));
  console.log('  Archivos locales ausentes: ' + (missingFiles.join(', ') || 'ninguno'));
  console.log('  Metadatos licencia/origen/autor incompletos: ' + (incomplete.join(', ') || 'ninguno'));
  console.log('  ALT no definido: ' + (missingAlt.join(', ') || 'ninguno (verificar calidad)'));
}
console.log('\nNota: existencia de archivo NO certifica foto correcta, licencia válida ni calidad visual.');
console.log('Fallas detectadas: ' + failures);
process.exitCode = failures ? 1 : 0;
