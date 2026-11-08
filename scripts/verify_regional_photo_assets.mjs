#!/usr/bin/env node
/**
 * Control de archivos fotográficos regionales. Solo lectura.
 * node scripts/verify_regional_photo_assets.mjs [--json]
 * Comprueba rutas, firmas WebP/JPEG/PNG, dimensiones WebP básicas,
 * metadatos de licencia y duplicación de fuentes/archivos.
 * No certifica identidad del lugar ni compatibilidad legal de cada licencia.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'assets/data/regional-destination-photos.json'), 'utf8'));
const required = ['home','guia','transportes','fotografias','experiencias','barrios','cultura','familia','vida-nocturna','gastronomia','consejos','naturaleza','compras','eventos'];
const report = [];
function imageType(b) {
  if (b.length >= 12 && b.toString('ascii',0,4)==='RIFF' && b.toString('ascii',8,12)==='WEBP') return 'webp';
  if (b.length >= 3 && b[0]===0xff && b[1]===0xd8 && b[2]===0xff) return 'jpeg';
  if (b.length >= 8 && b.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return 'png';
  return null;
}
function dimensionsWebp(b) {
  if (b.length < 30) return null;
  const chunk = b.toString('ascii',12,16);
  if (chunk==='VP8X') return {width:1+b.readUIntLE(24,3),height:1+b.readUIntLE(27,3)};
  if (chunk==='VP8 ' && b.length>=30 && b[23]===0x9d && b[24]===0x01 && b[25]===0x2a)
    return {width:b.readUInt16LE(26)&0x3fff,height:b.readUInt16LE(28)&0x3fff};
  if (chunk==='VP8L' && b.length>=25 && b[20]===0x2f) return {
    width:1+(((b[22]&0x3f)<<8)|b[21]),
    height:1+(((b[24]&0x0f)<<10)|(b[23]<<2)|((b[22]&0xc0)>>6))
  };
  return null;
}
for (const [destination, entries] of Object.entries(manifest)) {
  const issues=[], bySrc=new Map(), bySource=new Map();
  for (const section of required) if (!entries[section]) issues.push({code:'MISSING_HOME_TILE',section});
  for (const [key, photo] of Object.entries(entries)) {
    if (!photo || typeof photo!=='object') {issues.push({code:'INVALID_ENTRY',key});continue;}
    if (!photo.src || !photo.src.startsWith('/') || photo.src.includes('..') || photo.src.includes('\\'))
      {issues.push({code:'INVALID_LOCAL_PATH',key,src:photo.src});continue;}
    const full=path.resolve(root,'.'+photo.src);
    if (!full.startsWith(root+path.sep)) {issues.push({code:'OUTSIDE_REPOSITORY',key});continue;}
    if (!photo.artist?.trim() || !photo.license?.trim() || !photo.source?.startsWith('https://'))
      issues.push({code:'INCOMPLETE_PROVENANCE',key});
    if (/CC BY|CC0|CC SA/i.test(photo.license||'') && !photo.licenseUrl?.startsWith('https://'))
      issues.push({code:'MISSING_LICENSE_URL',key});
    if (!photo.alt?.trim()) issues.push({code:'MISSING_ALT',key});
    if (bySrc.has(photo.src)) issues.push({code:'REUSED_FILE',key,other:bySrc.get(photo.src)});
    else bySrc.set(photo.src,key);
    if (photo.source && bySource.has(photo.source)) issues.push({code:'REUSED_ORIGINAL',key,other:bySource.get(photo.source)});
    else if (photo.source) bySource.set(photo.source,key);
    if (!fs.existsSync(full)) {issues.push({code:'FILE_NOT_FOUND',key,src:photo.src});continue;}
    const stat=fs.statSync(full);
    if (!stat.isFile()) {issues.push({code:'NOT_A_FILE',key});continue;}
    if (stat.size<2048) issues.push({code:'SUSPICIOUSLY_SMALL',key,bytes:stat.size});
    const b=fs.readFileSync(full);
    const type=imageType(b),ext=path.extname(full).toLowerCase().slice(1);
    if (!type) issues.push({code:'INVALID_IMAGE_SIGNATURE',key});
    else if (ext!==type && !(ext==='jpg'&&type==='jpeg')) issues.push({code:'EXTENSION_MISMATCH',key,type,ext});
    if (type==='webp') {
      const dim=dimensionsWebp(b);
      if (!dim) issues.push({code:'UNREADABLE_WEBP_DIMENSIONS',key});
      else if (dim.width<400 || dim.height<220) issues.push({code:'LOW_RESOLUTION',key,...dim});
    }
  }
  report.push({destination,entries:Object.keys(entries).length,missingHomeTiles:required.filter(k=>!entries[k]),issues});
}
const summary={totalIssues:report.reduce((n,r)=>n+r.issues.length,0),destinations:report};
if (process.argv.includes('--json')) console.log(JSON.stringify(summary,null,2));
else for (const d of report) {
  const counts={};for (const issue of d.issues) counts[issue.code]=(counts[issue.code]||0)+1;
  console.log(d.destination+': '+d.entries+' fotos, '+d.missingHomeTiles.length+' miniaturas faltantes, '+d.issues.length+' incidencias');
  console.log('  '+Object.entries(counts).map(([k,v])=>k+'='+v).join(' | '));
}
process.exitCode=summary.totalIssues?1:0;
