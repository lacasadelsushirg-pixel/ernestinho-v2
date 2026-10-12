import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { buildBrowserOptions } from './build_browser.mjs';
import { loadBuildLibraries } from './build_vendor.mjs';
import { UI } from '../assets/js/carioc-ia-knowledge.js';
import { resolveQuestion } from '../assets/js/carioc-ia-engine.js';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const { chromium } = createRequire(import.meta.url)('playwright-core');
const server = http.createServer((request, response) => {
  const route = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const file = path.join(root, route.endsWith('/') ? route + 'index.html' : route);
  if (!file.startsWith(root + '/') || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { response.writeHead(404).end(); return; }
  response.setHeader('Content-Type', { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.png':'image/png' }[path.extname(file)] || 'application/octet-stream');
  response.end(fs.readFileSync(file));
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`, libraries = await loadBuildLibraries();
let browser;
const results = [];
try {
  browser = await chromium.launch(await buildBrowserOptions());
  for (const viewport of [{width:320,height:568},{width:390,height:844},{width:1365,height:900}]) {
    const context = await browser.newContext({viewport});
    await context.route('**/*', r => new URL(r.request().url()).origin === base ? r.continue() : r.fulfill({status:200,body:libraries.get(r.request().url()) || '',contentType:r.request().resourceType() === 'script' ? 'text/javascript' : 'text/plain'}));
    const page = await context.newPage(), errors = [];
    page.on('pageerror', error => { if (/carioc|ContextualIntent|resolveQuestion|normalizeQuestion/i.test(error.stack || error.message)) errors.push(error.message); });
    for (const language of ['ES','PT','EN']) {
      await page.goto(base + '/');
      await page.evaluate(async lang => {
        const site = await import(document.querySelector('script[src*="/assets/js/site.js"]').src);
        await site.ready; site.apply(lang);
      }, language);
      const launcher = page.locator('.ec-cariocia-launcher');
      if (!(await page.locator('#ec-cariocia-panel').isVisible())) await launcher.click();
      assert.deepEqual(await page.locator('.ec-cariocia-chip').allTextContents(), UI[language].suggestions);
      const rect = await page.locator('#ec-cariocia-panel').boundingBox();
      assert.ok(rect.x >= 0 && rect.y >= 0 && rect.x + rect.width <= viewport.width + 1 && rect.y + rect.height <= viewport.height + 1, 'Panel remains inside viewport');
      for (let index=0; index<5; index++) {
        const question = UI[language].suggestions[index];
        await page.locator('.ec-cariocia-chip').nth(index).click();
        const response = page.locator('.ec-cariocia-assistant').last();
        const text = await response.locator('.ec-cariocia-copy').textContent();
        assert.ok(text.length > 35 && text !== UI[language].fallback);
        const links = await response.locator('a.ec-cariocia-link').evaluateAll(nodes => nodes.map(a => a.getAttribute('href')));
        assert.ok(links.length, `${question}: useful guide links`);
        for (const href of links) assert.ok(fs.existsSync(path.join(root, href, 'index.html')), `Existing guide: ${href}`);
        if (index === 1) assert.ok(!links.includes('/transportes/metro/'), 'Private transfer remains distinct from public transport');
        if (index === 4) assert.ok(!text.includes('R$430'), 'Getting around Rio does not become a Full Day sale');
        const whatsapp = await response.locator('.ec-cariocia-whatsapp').count();
        if (whatsapp) {
          const url = new URL(await response.locator('.ec-cariocia-whatsapp').getAttribute('href'));
          assert.equal(url.hostname,'wa.me'); assert.equal(url.pathname,'/5521969946938');
        }
        const composer = await page.locator('.ec-cariocia-composer').boundingBox();
        assert.ok(composer.y >= rect.y && composer.y + composer.height <= rect.y + rect.height + 1, 'Composer stays available after a response');
        if (index === 3) {
          await page.locator('.ec-cariocia-input').fill('Copacabana');
          await page.locator('.ec-cariocia-send').click();
          assert.match(await response.locator('.ec-cariocia-copy').textContent(), /Copacabana/, 'Luggage follow-up preserves the requested neighbourhood');
        }
        results.push({viewport:viewport.width,language,question,intent:resolveQuestion(question).intent.id,links});
        const menu = response.locator('.ec-cariocia-chip').last();
        await menu.click();
        assert.deepEqual(await page.locator('.ec-cariocia-chip').allTextContents(),UI[language].suggestions,'Returning to menu restores exactly five questions');
      }
      const nextLanguage = {ES:'PT',PT:'EN',EN:'ES'}[language];
      await page.evaluate(async lang => (await import('/assets/js/i18n.js')).setLanguage(lang), nextLanguage);
      assert.deepEqual(await page.locator('.ec-cariocia-chip').allTextContents(),UI[nextLanguage].suggestions,'Language changes translate the restored welcome menu');
      await page.locator('.ec-cariocia-close').click();
      await page.locator('#ec-cariocia-panel').waitFor({state:'hidden'});
      assert.equal(await page.locator('#ec-cariocia-panel').isVisible(),false);
    }
    assert.deepEqual(errors,[],'No CariocIA runtime errors');
    await context.close();
  }
  console.log(JSON.stringify({checks:results.length,viewports:[320,390,1365],languages:['ES','PT','EN'],runtimeErrors:0,results},null,2));
} finally { if (browser) await browser.close(); await new Promise(resolve => server.close(resolve)); }
