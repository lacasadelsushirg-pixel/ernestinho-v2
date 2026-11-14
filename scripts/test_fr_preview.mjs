import { chromium } from 'playwright-core';
import { buildBrowserOptions } from './build_browser.mjs';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createReadStream, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const [directory, screenshots] = process.argv.slice(2);
if (!directory) throw new Error('Usage: node scripts/test_fr_preview.mjs PREVIEW_DIR [SCREENSHOTS_DIR]');
const root = path.resolve(directory);
const manifest = JSON.parse(readFileSync(path.join(root, 'fr-preview-manifest.json'), 'utf8'));
const routes = new Set(manifest.routes.map(entry => entry.source));
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
    const headings = new Map([
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
      ['/gastronomia/nido-ristorante/', /Nido Ristorante/],
      ['/gastronomia/corrientes-348/', /Corrientes 348/],
      ['/gastronomia/praia-skol-copa/', /Praia Skol/],
      ['/gastronomia/rotisseria-sirio-libanesa/', /Rotisseria Sírio Libaneza/],
      ['/gastronomia/casa-feijoada/', /Casa da Feijoada/],
      ['/gastronomia/ocya-leblon/', /OCYÁ Leblon/],
      ['/gastronomia/faenza-copacabana/', /Faenza Copacabana/],
      ['/gastronomia/nino-cucina-ipanema/', /Nino Cucina Ipanema/],
      ['/gastronomia/koral/', /Koral/],
      ['/gastronomia/brota/', /Brota/],
      ['/gastronomia/noa-ipanema/', /Nôa Ipanema/],
      ['/gastronomia/bar-do-mineiro/', /Bar do Mineiro/],
      ['/gastronomia/spicy-fish/', /Spicy Fish/],
      ['/gastronomia/amendoeira/', /Bar da Amendoeira/],
      ['/gastronomia/dumare/', /Quiosque Dumaré/],
      ['/gastronomia/k08/', /K08/],
      ['/gastronomia/delirio-tropical-rio-sul/', /Delírio Tropical Rio Sul/],
      ['/gastronomia/fogo-de-chao-botafogo/', /Fogo de Chão Botafogo/],
      ['/gastronomia/quartinho/', /Quartinho/],
      ['/gastronomia/deck-buffet/', /Deck Buffet/],
      ['/gastronomia/pavao-azul/', /Pavão Azul/],
      ['/gastronomia/boa-praca-ipanema/', /Boa Praça Ipanema/],
      ['/gastronomia/babbo-osteria/', /Babbo Osteria/],
      ['/gastronomia/bb-lanches/', /BB Lanches/],
      ['/gastronomia/bar-madrid/', /Bar Madrid/],
      ['/gastronomia/classico-beach-club-urca/', /Clássico Beach Club Urca/],
      ['/gastronomia/kilograma-centro/', /Kilograma Centro/],
      ['/gastronomia/proa/', /Proa Cozinha Bar/],
      ['/gastronomia/elena/', /Elena Horto/],
      ['/gastronomia/sud-passaro-verde/', /Sud, o Pássaro Verde/],
      ['/gastronomia/labuta-bar/', /Labuta Bar/],
      ['/gastronomia/casa-201/', /Casa 201/],
      ['/gastronomia/angu-do-gomes/', /Angu do Gomes/],
    ]);
    for (const route of routes) {
      const heading = headings.get(route);
      console.log(`Checking ${route} at ${width}px`);
      const original = await page.goto(origin + '/pt' + route, { waitUntil: 'load' });
      assert.equal(original.status(), 200);
      const choice = page.locator('[data-fr-preview-choice]:visible');
      await choice.click({timeout: 7000});
      await page.waitForURL(origin + '/fr' + route);
      assert.equal(await page.locator('html').getAttribute('lang'), 'fr');
      const title = await page.locator('h1').first().textContent();
      if (heading) assert.match(title, heading);
      else assert.ok(title.trim());
      assert.equal(await page.locator('[data-fr-preview-choice]:visible').count(), 1);
      const size = await page.evaluate(() => ({ viewport: innerWidth, content: document.documentElement.scrollWidth }));
      assert.ok(size.content <= size.viewport + 1, JSON.stringify({ route, width, size }));
      const whatsapp = await page.locator('a[href*="wa.me"][href*="text="]').first().getAttribute('href');
      assert.match(decodeURIComponent(whatsapp), /Bonjour\+Ernestinho/);
      if (route === '/consejos/portugues/') {
        const loaded = await page.waitForFunction(() =>
          [...document.querySelectorAll('[data-category]')].some(b => b.dataset.category === 'basico'));
        assert.ok(loaded);
        const cards = page.locator('[data-phrase-grid] article');
        assert.equal(await cards.count(), 80);
        assert.equal(await page.locator('[data-false-friends] li').count(), 8);
        assert.match(await cards.first().textContent(), /Bom dia.*Bonjour/s);
        await page.locator('[data-category="basico"]').click();
        assert.ok(await cards.count() < 80);
        assert.equal(await page.locator('[data-category="basico"]').getAttribute('aria-pressed'), 'true');
        await page.locator('[data-category="all"]').click();
        assert.equal(await cards.count(), 80);
        const audio = page.waitForRequest(req => req.url().startsWith('https://res.cloudinary.com/') && req.url().endsWith('.mp3'));
        await cards.first().locator('[data-slow-button]').click();
        assert.match((await audio).url(), /bom-dia/i);
      }
      if (route === '/consejos/supermercados/') {
        assert.match(await page.locator('main h1').textContent(), /supermarché/i);
        assert.match(await page.locator('main img[data-i18n-alt]').first().getAttribute('alt'), /supermarché/i);
      }
      if (route === '/guia/mes-a-mes/') {
        const grid = page.locator('#month-grid');
        assert.equal(await grid.locator('article').count(), 12);
        for (const [tab, count, title] of [['rain', 6, /pluie/], ['heat', 5, /chaleur/]]) {
          await page.locator(`[data-tab="${tab}"]`).click();
          const panel = page.locator(`#fr-month-${tab}`);
          assert.ok(await panel.isVisible());
          assert.match(await panel.locator('h2').textContent(), title);
          assert.equal(await panel.locator('li').count(), count);
          assert.equal(await grid.isVisible(), false);
        }
        await page.locator('[data-tab="month"]').click();
        assert.ok(await grid.isVisible());
        assert.equal(await page.locator('#month-extra').isVisible(), false);
      }
      if (route === '/guia/pix/') {
        assert.equal(await page.locator('figure img[src*="apps%20pix.png"]').count(), 1);
      }
      if (route === '/guia/guarda-equipaje/') {
        const faq = page.locator('main details');
        assert.equal(await faq.count(), 6);
        await faq.first().locator('summary').click();
        assert.ok(await faq.first().locator('p').isVisible());
      }
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
    if (routes.has('/guia/cpf/')) {
      await page.goto(origin + '/fr/guia/');
      await page.locator('main a[href="/fr/guia/cpf/"]').first().click();
      await page.waitForURL(origin + '/fr/guia/cpf/');
      await page.locator('main a[href="/fr/guia/dinero/"]').first().click();
      await page.waitForURL(origin + '/fr/guia/dinero/');
    }
    await context.close();
    console.log(`${routes.size} page switches PT-BR → FR → EN at ${width}px`);
  }
} finally {
  await browser.close();
  server.close();
}
