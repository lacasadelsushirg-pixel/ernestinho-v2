import { chromium } from 'playwright-core';
import { buildBrowserOptions } from './build_browser.mjs';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createReadStream, existsSync, mkdirSync, statSync } from 'node:fs';
import path from 'node:path';

const [directory, screenshots] = process.argv.slice(2);
if (!directory) throw new Error('Usage: node scripts/test_fr_preview.mjs PREVIEW_DIR [SCREENSHOTS_DIR]');
const root = path.resolve(directory);
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
const server = createServer((req, res) => {
  const route = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
  const file = path.resolve(root, '.' + (route.endsWith('/') ? route + 'index.html' : route));
  if (!file.startsWith(root + path.sep) || !existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { 'content-type': mime[path.extname(file)] || 'application/octet-stream' });
  createReadStream(file).pipe(res);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = 'http://127.0.0.1:' + server.address().port;
const browser = await chromium.launch(await buildBrowserOptions());
if (screenshots) mkdirSync(screenshots, { recursive: true });
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    // Network-independent verification. Published photos and maps are checked
    // structurally by audit_fr_preview.py and kept on their original URLs.
    await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
    const page = await context.newPage();
    page.on('pageerror', error => console.error(error.message));
    for (const [route, heading] of [
      ['/', /Rio ne se visite pas/],
      ['/guia/', /Guide de Rio/],
      ['/guia/apps/', /applications qui facilitent/],
      ['/guia/dinero/', /Argent au Brésil/],
      ['/guia/permanencia/', /Séjour touristique/],
      ['/gastronomia/carretao-ipanema/', /Carretão Ipanema/],
      ['/gastronomia/ct-boucherie/', /CT Boucherie/],
      ['/gastronomia/belmonte-copa/', /Boteco Belmonte Copacabana/],
      ['/gastronomia/belmonte-ipanema/', /Boteco Belmonte Ipanema/],
      ['/gastronomia/polvo-marisqueria/', /Polvo Marisqueria/],
    ]) {
      console.log(`Checking ${route} at ${width}px`);
      const original = await page.goto(origin + '/pt' + route, { waitUntil: 'load' });
      assert.equal(original.status(), 200);
      const choice = page.locator('[data-fr-preview-choice]:visible');
      await choice.click({timeout: 7000});
      await page.waitForURL(origin + '/fr' + route);
      assert.equal(await page.locator('html').getAttribute('lang'), 'fr');
      assert.match(await page.locator('h1').first().textContent(), heading);
      assert.equal(await page.locator('[data-fr-preview-choice]:visible').count(), 1);
      const size = await page.evaluate(() => ({ viewport: innerWidth, content: document.documentElement.scrollWidth }));
      assert.ok(size.content <= size.viewport + 1, JSON.stringify({ route, width, size }));
      const whatsapp = await page.locator('a[href*="wa.me"][href*="text="]').first().getAttribute('href');
      assert.match(decodeURIComponent(whatsapp), /Bonjour\+Ernestinho/);
      if (route === '/') {
        const next = page.locator('[data-carousel-direction="next"]').first();
        if (await next.isVisible()) {
          await next.click();
          try {
            await page.waitForFunction(() => document.getElementById('experienceGrid').scrollLeft > 0, null, { timeout: 3000 });
          } catch (error) {
            const dimensions = await page.locator('#experienceGrid').evaluate(el => [el.clientWidth, el.scrollWidth, el.scrollLeft]);
            throw new Error('Carousel did not move: ' + dimensions, { cause: error });
          }
        }
      }
      if (screenshots) await page.screenshot({ path: path.join(screenshots, (route.replaceAll('/', '-') || 'home') + width + '.png') });
      const desktop = width > 900 ? '[data-ec-desktop-language-group]' : '.ec-mobile-language-row';
      await page.locator(`${desktop} a[href="/en${route}"]`).click();
      await page.waitForURL(origin + '/en' + route);
      assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    }
    await context.close();
    console.log(`10 page switches PT-BR → FR → EN at ${width}px`);
  }
} finally {
  await browser.close();
  server.close();
}
