import { esc, map, pre, styles, v } from './buzios_mirror_core.mjs';
import { t } from '../assets/js/translations/destinos/modelo.js';
import { photoCredit } from '../assets/js/translations/destinos/petropolis-fotos.js';

const base = '/destinos/petropolis/';
const text = (copy, lang) => esc(v(copy, lang));
const paragraph = (copy, lang) => '<p>' + text(copy, lang) + '</p>';
const mapLabel = t('Abrir en el mapa', 'Abrir no mapa', 'Open on map');
const detailsLabel = t('Ver guía relacionada', 'Ver guia relacionado', 'Read the related guide');
const faqTitle = t('Preguntas frecuentes', 'Perguntas frequentes', 'Frequently asked questions');
const sourceTitle = t('Fuentes y consultas', 'Fontes e consultas', 'Sources and travel information');
const contentsTitle = t('En esta página', 'Nesta página', 'On this page');
const tipTitle = t('Consejo de Ernestinho', 'Dica do Ernestinho', 'Ernestinho’s tip');

const localLink = (route, label, lang, cls) =>
  `<a class="${cls}" href="${pre(lang) + base + route}">${text(label, lang)} →</a>`;
const external = ([url, label], lang, cls) =>
  `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${text(label, lang)}</a>`;

function picture(photo, className, lang, eager = false) {
  return `<figure class="${className}"><img src="${esc(photo.src)}" alt="${esc(photo.alt)}" decoding="async"
    ${eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'}><figcaption>${esc(photo.alt)}${photo.author ? ' · ' + photoCredit(photo, lang) : ''}</figcaption></figure>`;
}

function contents(sections, lang, className) {
  return `<nav class="petr-page-contents" aria-label="${text(contentsTitle, lang)}">${sections.map(({ id, title }) =>
    `<a class="${className}" href="#${id}">${text(title, lang)}</a>`).join('')}</nav>`;
}

function numbered(heading, copy, lang, index, extras = '', id = '') {
  return `<article${id ? ` id="${id}"` : ''}><span>${String(index + 1).padStart(2, '0')}</span>
    <h${id ? 2 : 3}>${text(heading, lang)}</h${id ? 2 : 3}>${paragraph(copy, lang)}${extras}</article>`;
}

export function soloTravelPage(data, photos, lang) {
  const { title, intro, sections, faq, sources } = data;
  const image = photos[data.image];
  const sectionCards = sections.map(({ id, title, copy, image, map: location, route }, index) => {
    const extra = (location ? map(location, v(mapLabel, lang)) : '') +
      (route ? localLink(route, detailsLabel, lang, 'ext') : '');
    return numbered(title, copy, lang, index, extra, id) +
      (image ? picture(photos[image], 'ec-inline-photo', lang) : '');
  }).join('');
  return {
    title, intro, image, inline: styles('guia/viajar-solo') + '<style>.guide .petr-page-contents{flex-wrap:wrap;gap:0}</style>',
    body: `<section class="guide"><p class="kicker">ERNESTINHO CARIOCA · PETRÓPOLIS</p>
      <h1>${text(title, lang)}</h1><p class="intro">${text(intro, lang)}</p>
      <aside class="tip"><b>${text(tipTitle, lang)}</b>${paragraph(data.tip, lang)}</aside>
      ${picture(image, 'ec-inline-photo', lang, true)}
      ${contents(sections, lang, 'ext')}
      <section class="items">${sectionCards}</section>
      <h2>${text(faqTitle, lang)}</h2>
      <section class="items">${faq.map(([q, a], index) => numbered(q, a, lang, index)).join('')}</section>
      <h2>${text(sourceTitle, lang)}</h2>${sources.map(source => external(source, lang, 'ext')).join('')}
      ${localLink('transportes/vans/', t('Autobuses y vans', 'Ônibus e vans', 'Buses and vans'), lang, 'ext')}
      ${localLink('guia/', t('Volver a la guía', 'Voltar ao guia', 'Back to the guide'), lang, 'ext')}</section>`,
  };
}

export function petropolisTransportPage(data, mode, title, intro, photos, lang) {
  const { sections, faq, sources, related } = data;
  const image = photos[data.image];
  const vans = mode === 'vans';
  const hero = vans ? `<img class="hero-image" src="${esc(image.src)}" alt="${esc(image.alt)}" fetchpriority="high">
    <div class="guide-photo-caption">${esc(image.alt)} · ${photoCredit(image, lang)}</div>` : picture(image, 'guide-photo guide-hero-photo', lang, true);
  const mapButton = location => map(location, v(mapLabel, lang)).replace('class="ext"', 'class="text-action"');
  const chapter = ({ id, title, copy, map: location, image, links = [], tone = '' }) =>
    `<section id="${id}" class="guide-section${tone ? ' ec-adn ' + tone : ''}"><h2>${text(title, lang)}</h2>${paragraph(copy, lang)}
      ${location ? mapButton(location) : ''}${links.map(source => external(source, lang, 'source-link')).join('')}</section>
      ${image ? picture(photos[image], 'guide-photo', lang) : ''}`;
  const side = `<aside class="guide-aside"><section class="aside-card"><h2>${text(contentsTitle, lang)}</h2>
    ${contents(sections, lang, 'text-action')}</section><section class="aside-card"><h2>${text(t('Sigue organizando el viaje', 'Continue planejando a viagem', 'Keep planning your trip'), lang)}</h2>
    ${localLink('transportes/' + related, mode === 'vans' ? t('Uber, 99 y taxis', 'Uber, 99 e táxis', 'Uber, 99 and taxis') : t('Vans y transporte colectivo', 'Vans e transporte coletivo', 'Vans and public transport'), lang, 'action')}
    ${localLink('guia/llegada/', t('Cómo llegar a Petrópolis', 'Como chegar a Petrópolis', 'Getting to Petrópolis'), lang, 'text-action')}</section></aside>`;
  return {
    title, intro, image, inline: styles('transportes/uber') + '<style>.guide-aside .petr-page-contents{display:block}.guide-photo-caption{margin-top:9px;color:#61706a;font-size:13px;line-height:1.5}</style>', css: ['transit-guides'],
    body: `<section class="transit-guide">${vans ? hero : ''}<div class="guide-intro"><p class="kicker">ERNESTINHO CARIOCA · PETRÓPOLIS</p>
      <h1>${text(title, lang)}</h1><p class="guide-dek">${text(intro, lang)}</p>
      <span class="fact-pill">${text(vans ? t('Autobús urbano · intermunicipal · van privada', 'Ônibus urbano · intermunicipal · van particular', 'Local bus · intercity coach · private van') :
        t('Tarifa dinámica · matrícula · punto de recogida', 'Tarifa dinâmica · placa · ponto de embarque', 'Dynamic fare · licence plate · pickup point'), lang)}</span></div>
      ${vans ? '' : hero}
      <div class="guide-layout"><article class="guide-copy">${sections.map(chapter).join('')}
      <section class="guide-section ec-adn ec-teal"><h2>⭐ ${text(tipTitle, lang)}</h2>${paragraph(data.tip, lang)}</section>
      <section class="guide-section ec-faq"><h2>${text(faqTitle, lang)}</h2>
      ${faq.map(([q, a]) => `<details><summary>${text(q, lang)}</summary>${paragraph(a, lang)}</details>`).join('')}</section>
      <section class="guide-section sources"><h2>${text(sourceTitle, lang)}</h2><div class="source-list">
      ${sources.map(source => external(source, lang, 'source-link')).join('')}</div></section>
      ${localLink('transportes/', t('Volver a Transportes', 'Voltar a Transportes', 'Back to Transport'), lang, 'text-action')}</article>${side}</div></section>`,
  };
}
