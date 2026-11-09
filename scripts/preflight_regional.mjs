#!/usr/bin/env node
/**
 * Preflight regional NO PUBLICA y NO reconstruye el sitio completo.
 * node scripts/preflight_regional.mjs [--keep-stage]
 * Ejecuta controles existentes + genera exclusivamente rutas regionales
 * en un directorio temporal. Exit 1 si alguna comprobación falla.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const stage = fs.mkdtempSync(path.join(os.tmpdir(), 'ernestinho-regional-'));
const steps = [
  ['Contenido y traducciones', 'scripts/audit_regional_content.mjs', ['--json']],
  ['Fotografías y licencias declaradas', 'scripts/verify_regional_photo_assets.mjs', ['--json']],
  ['Miniaturas regionales', 'scripts/audit_regional_thumbnails.mjs', []],
  ['Generación aislada', 'scripts/build_regional_destinations.mjs', ['--stage=' + stage]],
  ['Rutas y HTML generados', 'scripts/verify_regional_stage.mjs', [stage]],
];
const results = [];
try {
  for (const [name, script, args] of steps) {
    const result = spawnSync(process.execPath, [path.join(root, script), ...args], {
      cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024, timeout: 120000
    });
    const passed = result.status === 0 && !result.error;
    results.push({ name, script, passed, exitCode: result.status, error: result.error?.message || null });
    console.log('\n=== ' + name + ' — ' + (passed ? 'OK' : 'FALLÓ') + ' ===');
    if (result.stdout) console.log(result.stdout.slice(0, 10000));
    if (result.stderr) console.error(result.stderr.slice(0, 4000));
    if (result.error) console.error(result.error.message);
    // No verificar un stage que no pudo generarse; continuar otros controles.
    if (script === 'scripts/build_regional_destinations.mjs' && !passed) break;
  }
} finally {
  const keep = process.argv.includes('--keep-stage');
  if (!keep) fs.rmSync(stage, { recursive: true, force: true });
  console.log('\n=== RESUMEN ===');
  for (const r of results) console.log((r.passed ? 'PASS ' : 'FAIL ') + r.name);
  console.log(keep ? 'Stage temporal conservado: ' + stage : 'Stage temporal eliminado');
  console.log('No se realizaron publicaciones. Aún se requiere QA visual 1440/390 y verificación humana de fotos/licencias.');
}
process.exitCode = results.some(r => !r.passed) || results.length !== steps.length ? 1 : 0;
