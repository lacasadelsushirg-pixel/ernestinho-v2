import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { buildBrowserOptions } from './build_browser.mjs';
import { bookingMessage, bookingUrl } from '../assets/js/attraction-booking.js';
import { SEO_METADATA } from '../assets/js/seo-metadata.js';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');
const root = path.resolve(new URL('..', import.meta.url).pathname);
const routes = ['/atracciones/', ...['cristo-redentor','pao-de-acucar','selaron','maracana','aquario','museu-amanha','jardim-botanico','parque-lage','the-maze'].map(s => `/atracciones/${s}/`), '/familia/bioparque/', ...['full-day-rio','cristo-city-tour','maracana-experience','partido-maracana','aquario-boulevard','bioparque'].map(s => `/experiencias/${s}/`)];
const server = http.createServer((request, response) => {
  const route = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const file = path.join(root, route.endsWith('/') ? route + 'index.html' : route);
  if (!file.startsWith(root + '/') || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { response.writeHead(404).end(); return; }
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.svg': 'image/svg+xml' };
  response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
  response.end(fs.readFileSync(file));
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
let browser;
const results = [];
try {
  browser = await chromium.launch(await buildBrowserOptions());
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.route('**/*', request => new URL(request.request().url()).origin === base ? request.continue() : request.fulfill({ status: 200, body: '' }));
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(base + route);
    await page.evaluate(async () => { await (await import(document.querySelector('script[src*="/assets/js/site.js"]').src)).ready; (await import(document.querySelector('script[src*="/assets/js/site.js"]').src)).apply('ES'); });
    const before = await page.evaluate(() => ({ text: document.querySelector('main').textContent, images: [...document.querySelectorAll('main img')].map(i => i.getAttribute('src')), attrs: [...document.querySelectorAll('main img[alt], main [aria-label]')].map(el => ({ alt: el.getAttribute('alt'), aria: el.getAttribute('aria-label') })) }));
    const name = route === '/atracciones/' ? 'atracciones-index' : route.slice(1,-1).replaceAll('/', '-');
    const chunk = path.join(root, `assets/js/translations/chunks/encyclopedia-${name}.js`);
    const dictionary = fs.existsSync(chunk) ? (await import(chunk)).default : {};
    for (const language of ['PT', 'EN']) {
      await page.locator(`[data-ec-language="${language}"]`).click();
      const result = await page.evaluate(async ({language, dictionary, originalAttrs}) => {
        (await import(document.querySelector('script[src*="/assets/js/site.js"]').src)).apply(language);
        const main = document.querySelector('main');
        const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT), texts = [];
        let node;
        while ((node = walker.nextNode())) {
          if (!node.parentElement.closest('script,style,noscript,[data-i18n],[data-live],[data-ch-es],[data-tj-es]')) texts.push(node.nodeValue.trim());
        }
        const untranslated = Object.entries(dictionary).filter(([es, values]) => es !== values[language] && texts.includes(es)).map(([es]) => es);
        const attrs = [...document.querySelectorAll('main img[alt], main [aria-label]')];
        const wrongAttrs = attrs.flatMap((el, i) => [['alt','alt'], ['aria-label','aria']].filter(([attr,key]) => originalAttrs[i][key] && dictionary[originalAttrs[i][key]] && el.getAttribute(attr) !== dictionary[originalAttrs[i][key]][language]).map(([attr]) => `${i}:${attr}`));
        const pageSchemas = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(s => { const d = JSON.parse(s.textContent); return d['@graph'] || [d]; }).filter(d => ['WebPage','Article'].includes(d['@type']));
        const contact = document.querySelector('.ec-corporate-closing a[href^="https://wa.me/"]');
        return { untranslated, wrongAttrs, contact: contact ? new URL(contact.href).searchParams.get('text') : '', schemaLanguages: pageSchemas.map(d => d.inLanguage), title: document.title, description: document.querySelector('meta[name=description]')?.content, language: document.documentElement.lang, overflow: main.scrollWidth - main.clientWidth, images: [...main.querySelectorAll('img')].map(i => i.getAttribute('src')) };
      }, {language, dictionary, originalAttrs: before.attrs});
      assert.deepEqual(result.untranslated, [], `${route} ${language}: untranslated text`);
      assert.deepEqual(result.wrongAttrs, [], `${route} ${language}: untranslated image/accessibility attributes`);
      assert.ok(result.contact.startsWith(language === 'PT' ? 'Olá Ernestinho,' : 'Hi Ernestinho,'), `${route}: untranslated footer enquiry`);
      assert.ok(result.schemaLanguages.every(l => l === (language === 'PT' ? 'pt-BR' : 'en')), `${route}: schema language mismatch`);
      assert.equal(result.title, SEO_METADATA[route][language][0]);
      assert.equal(result.description, SEO_METADATA[route][language][1]);
      assert.deepEqual(result.images, before.images, `${route}: image changed`);
      assert.ok(result.overflow < 3, `${route} ${language}: mobile horizontal overflow ${result.overflow}px`);
      results.push({ route, language, translatedMessages: Object.keys(dictionary).length, mobileOverflow: result.overflow });
    }
    await page.evaluate(async () => (await import(document.querySelector('script[src*="/assets/js/site.js"]').src)).apply('ES'));
    const restored = await page.evaluate(() => document.querySelector('main').textContent);
    assert.equal(restored, before.text, `${route}: Spanish failed to restore`);
    const broken = await page.evaluate(() => [...document.querySelectorAll('main a[href^="#"]')].map(a => a.getAttribute('href').slice(1)).filter(id => id && !document.getElementById(decodeURIComponent(id))));
    assert.deepEqual(broken, [], `${route}: broken chapter anchors`);
  }
  for (const language of ['ES','PT','EN']) {
    const details = { nombre: 'Ana & João', fecha: '2026-11-12', pasajeros: '3', hotel: 'Hotel São João', mensaje: 'Necesito accesibilidad & ayuda.' };
    const url = new URL(bookingUrl('/experiencias/full-day-rio/', language, details));
    assert.equal(url.searchParams.get('text'), bookingMessage('/experiencias/full-day-rio/', language, details));
    assert.ok(url.searchParams.get('text').includes('R$430'));
    for (const value of Object.values(details)) assert.ok(url.searchParams.get('text').includes(value));
    assert.ok(url.searchParams.get('text').includes('\n'));
    assert.ok(!url.searchParams.get('text').includes('\\n'));
  }
  for (const route of routes.filter(r => r.startsWith('/experiencias/'))) {
    await page.goto(base + route);
    await page.evaluate(async () => { await (await import(document.querySelector('script[src*="/assets/js/site.js"]').src)).ready; window.open = url => { window.ecTestBookingUrl = url; }; });
    for (const language of ['ES','PT','EN']) {
      await page.evaluate(async lang => (await import(document.querySelector('script[src*="/assets/js/site.js"]').src)).apply(lang), language);
      if (route === '/experiencias/full-day-rio/') continue;
      const button = page.locator('button.reserve').first();
      let url;
      if (await button.count()) { await button.click(); url = await page.evaluate(() => window.ecTestBookingUrl); }
      else url = await page.locator('main a[href^="https://wa.me/"]').first().getAttribute('href');
      assert.equal(url, bookingUrl(route, language), `${route} ${language}: wrong booking URL`);
    }
  }
  // Exercise the actual existing modal and submission; capture the URL, never contact WhatsApp.
  await page.goto(base + '/experiencias/full-day-rio/');
  await page.evaluate(async () => { const site = await import(document.querySelector('script[src*="/assets/js/site.js"]').src); await site.ready; site.apply('EN'); window.open = url => { window.ecTestBookingUrl = url; }; });
  await page.locator('#open-reserve').click();
  await page.locator('[name=nombre]').fill('Ana');
  await page.locator('[name=fecha]').fill('2026-11-12');
  await page.locator('[name=pasajeros]').fill('3');
  await page.locator('[name=hotel]').fill('Copacabana');
  await page.locator('#reserve-form button[type=submit]').click();
  const submitted = await page.evaluate(() => window.ecTestBookingUrl);
  assert.ok(new URL(submitted).searchParams.get('text').startsWith('Hi Ernestinho,'));
  assert.ok(new URL(submitted).searchParams.get('text').includes('Passengers: 3'));
  console.log(JSON.stringify({ pages: routes.length, localeChecks: results.length, booking: 'passed', results }, null, 2));
} finally {
  if (browser) await browser.close();
  await new Promise(resolve => server.close(resolve));
}
