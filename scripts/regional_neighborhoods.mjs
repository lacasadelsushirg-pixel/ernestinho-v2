import { esc, pre, styles, v } from './buzios_mirror_core.mjs';
import { t } from '../assets/js/translations/destinos/modelo.js';
import { regionalNeighborhoods } from '../assets/js/translations/destinos/barrios-regionales.js';

import { photoCredit } from '../assets/js/translations/destinos/petropolis-fotos.js';
import { petrDistricts, originalDistrictHistory } from '../assets/js/translations/destinos/petropolis-barrios-locales.js';

const catalog = {
  ...regionalNeighborhoods,
  petropolis: {
    ...Object.fromEntries(Object.entries(regionalNeighborhoods.petropolis)
      .map(([id, district]) => [id, { ...district, ...originalDistrictHistory[id] }])),
    ...petrDistricts,
  },
};
export const neighborhoodRoutes = Object.entries(catalog).flatMap(([city, districts]) =>
  Object.keys(districts).map(slug => [city, 'barrios', slug]));

const text = (value, lang) => esc(v(value, lang));
const open = t('Abrir ficha →', 'Abrir ficha →', 'Open guide →');
const back = t('← Volver a Barrios', '← Voltar a Bairros', '← Back to neighbourhoods');
const navigate = (href, label, lang, cls = '') =>
  `<a class="${cls}" href="${pre(lang) + href}">${text(label, lang)}</a>`;
const picture = (photo, name, cls, eager = false) => photo
  ? `<img class="${cls}" src="${esc(photo.src)}" alt="${esc(photo.alt || name)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">` : '';

export function renderRegionalNeighborhood(city, slug, lang, photos) {
  const districts = catalog[city.slug];
  if (!districts) return null;
  const base = '/destinos/' + city.slug + '/';
  const key = 'barrios';
  const path = base + key + '/';
  const cityName = esc(city.name.toLocaleUpperCase('pt-BR'));
  const hero = (title, intro) => `<section class="hero" style="min-height:48vh"><div class="hero-copy">
    <p class="kicker">ERNESTINHO CARIOCA · ${cityName}</p><h1>${text(title, lang)}</h1><p class="lead">${text(intro, lang)}</p></div></section>`;

  if (slug) {
    const area = districts[slug];
    const photo = photos[area.image];
    const more = city.slug === 'petropolis' ? `
      ${area.history ? `<article class="bh-cluster"><h2>${text(t('Historia y patrimonio', 'História e patrimônio', 'History and heritage'), lang)}</h2>
        <p>${text(area.history, lang)}</p></article>` : ''}
      <article class="bh-cluster"><h2>${text(t('Mapa y conexiones', 'Mapa e conexões', 'Map and connections'), lang)}</h2>
        <a class="rd-action" href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(area.name + ', Petrópolis, RJ')}">${text(t('Abrir en el mapa ↗', 'Abrir no mapa ↗', 'Open on map ↗'), lang)}</a>
        ${area.connection ? navigate(path + area.connection + '/', districts[area.connection].name, lang, 'rd-action') : ''}
        ${area.source ? `<a class="rd-action" href="${esc(area.source)}">${text(t('Consultar fuente ↗', 'Consultar fonte ↗', 'Check source ↗'), lang)}</a>` : ''}
      </article>
      ${area.advice ? `<aside class="notice"><b>${text(t('Consejo de Ernestinho', 'Dica do Ernestinho', 'Ernestinho’s tip'), lang)}</b><p>${text(area.advice, lang)}</p></aside>` : ''}` : '';
    const body = hero(area.name, area.summary) + `<section class="editorial bh-zone-index">
      ${navigate(path, back, lang, 'rd-action')}
      ${photo ? `<div class="rd-gallery"><figure>${picture(photo, area.name, '', true)}${city.slug === 'petropolis' ? photoCredit(photo, lang) : ''}</figure></div>` : ''}
      <article class="bh-cluster">
        <h2>${text(t('Qué ver y cómo moverte', 'O que ver e como circular', 'What to see and how to get around'), lang)}</h2>
        <p class="bh-cluster-intro">${text(area.visit, lang)}</p>
        ${navigate(base + area.nearby, t('Una parada para combinar →', 'Uma parada para combinar →', 'A stop to pair it with →'), lang, 'rd-action')}
        ${navigate(base + 'transportes/', t('Transportes', 'Transportes', 'Transport'), lang, 'rd-action')}</article>${more}</section>`;
    return { title: area.name, intro: area.summary, body, image: photo || null, inline: styles('barrios') };
  }
  const title = t(`Barrios de ${city.name}`, `Bairros de ${city.name}`, `${city.name} neighbourhoods`);
  const { intro, tip } = city.sections[key];
  const entries = Object.entries(districts);
  const tiles = entries.map(([id, area]) => `<a class="topic" href="${pre(lang) + path + id}/">
    ${picture(photos[area.image], area.name, 'bh-topic-mini')}<b>${esc(area.name)}</b><span>${text(open, lang)}</span></a>`).join('');
  const clusters = entries.map(([id, area]) => `<a class="bh-cluster" href="${pre(lang) + path + id}/">
    <h3>${esc(area.name)}</h3><p class="bh-cluster-intro">${text(area.summary, lang)}</p><span class="bh-cluster-cta">${text(open, lang)}</span></a>`).join('');
  const body = hero(title, intro) + `<section class="editorial bh-individual-index"><div class="section-head">
    <h2>${text(t('Explora barrio por barrio', 'Explore bairro por bairro', 'Explore neighbourhood by neighbourhood'), lang)}</h2></div>
    <div class="topic-grid">${tiles}</div></section>
    <section class="editorial bh-zone-index"><div class="bh-clusters">${clusters}</div>
    <aside class="notice"><b>${text(t('Consejo de Ernestinho', 'Dica do Ernestinho', 'Ernestinho’s tip'), lang)}</b><p>${text(tip, lang)}</p></aside></section>`;
  return { title, intro, body, inline: styles('barrios') };
}
