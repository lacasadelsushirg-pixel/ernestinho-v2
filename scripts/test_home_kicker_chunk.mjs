import assert from 'node:assert/strict';
import fs from 'node:fs';
import translations from '../assets/js/translations/chunks/common-02.js';

const site = fs.readFileSync(new URL('../assets/js/site.js', import.meta.url), 'utf8');
const home = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
assert.ok(site.includes('"common-02.js"'), 'home must load the shared translation chunk');
assert.deepEqual(translations['TOURS Y EXPERIENCIAS'], {
  PT: 'PASSEIOS E EXPERIÊNCIAS',
  EN: 'TOURS & EXPERIENCES'
});
assert.match(home, /<p class="kicker">TOURS Y EXPERIENCIAS<\/p>/);
console.log('HOME KICKER DICTIONARY PASS: exact ES key and reviewed PT/EN values load through common-02.js.');
