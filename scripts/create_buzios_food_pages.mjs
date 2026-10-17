import fs from 'node:fs/promises';
import { buziosFoodPlaces } from '../assets/js/buzios-food-places.js';

const fresh = new Set(['fishbone','bananaland','pimenta-siria','chilenazo','maria-italiana','santo-cozy','cafe-porteno','buda-beach','clube-da-sfiha','restaurante-do-david','patio-michou','huna-bistro','sanse','noi','quintal-dos-buzios']);
for (const place of buziosFoodPlaces.filter((item) => fresh.has(item.slug))) {
  const dir = new URL(`../destinos/buzios/comer-y-salir/${place.slug}/`, import.meta.url);
  await fs.mkdir(dir, { recursive: true });
  const title = `${place.name}: guía para comer en Búzios | Ernestinho Carioca`;
  const description = `Guía de ${place.name} en Búzios: propuesta, qué pedir, cómo combinar la visita, fotos, información práctica y mapa.`;
  const url = `https://www.ernestinhocarioca.com.br/destinos/buzios/comer-y-salir/${place.slug}/`;
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#0d1919"><title>${title}</title><meta name="description" content="${description}"><meta property="og:type" content="article"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${url}"><meta property="og:site_name" content="Ernestinho Carioca"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><link rel="canonical" href="${url}"><link rel="icon" type="image/png" sizes="192x192" href="/assets/brand/ec-mark.png"></head><body data-restaurant="${place.slug}"><a class="skip" href="#profile">Saltar al contenido</a><div id="profile"><main><h1>${place.name}</h1><p>${description}</p></main></div><footer>© Ernestinho Carioca · Guía independiente de Búzios</footer><script type="module" src="/assets/js/buzios-restaurant-profile-view.js?v=20261017-food-rio-pattern"></script></body></html>`;
  await fs.writeFile(new URL('index.html', dir), html);
}
console.log(`Generated ${fresh.size} Búzios restaurant profiles.`);
