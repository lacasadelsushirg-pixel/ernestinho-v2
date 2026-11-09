import { esc, pre, styles, v } from './buzios_mirror_core.mjs';
import { t } from '../assets/js/translations/destinos/modelo.js';
import { regionalNeighborhoods } from '../assets/js/translations/destinos/barrios-regionales.js';
import { petropolisDistrictEditorial } from '../assets/js/translations/destinos/petropolis-barrios-editorial.js';

export const neighborhoodRoutes = Object.entries(regionalNeighborhoods).flatMap(([city, districts]) =>
  Object.keys(districts).map(slug => [city, 'barrios', slug]));

const text = (value, lang) => esc(v(value, lang));
const open = t('Abrir ficha →', 'Abrir ficha →', 'Open guide →');
const back = t('← Volver a Barrios', '← Voltar a Bairros', '← Back to neighbourhoods');
const navigate = (href, label, lang, cls = '') =>
  `<a class="${cls}" href="${pre(lang) + href}">${text(label, lang)}</a>`;
const picture = (photo, name, cls, eager = false) => photo
  ? `<img class="${cls}" src="${esc(photo.src)}" alt="${esc(photo.alt || name)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">` : '';

const p = (value, lang) => '<p>' + text(value, lang) + '</p>';
const petrCss = `<style>
.petr-bairro-profile{max-width:1180px;margin:0 auto;padding:clamp(16px,3vw,32px)}
.petr-bairro-intro{max-width:80ch;font-size:1.08rem;line-height:1.8}
.petr-bairro-panels{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(240px,1fr);gap:18px;margin:22px 0}
.petr-bairro-box{background:#f0f7f5;border:1px solid #cce3dc;border-radius:22px;padding:clamp(18px,2.5vw,27px)}
.petr-bairro-box:nth-child(2){background:#fff7e9;border-color:#f2ddac}
.petr-bairro-box h2,.petr-bairro-stops h2{font-size:clamp(1.23rem,2.5vw,1.7rem);margin:0 0 12px;color:#114d44}
.petr-bairro-box p{margin:0;line-height:1.75}
.petr-bairro-time{display:inline-block;background:#0b5048;border-radius:999px;padding:8px 14px;color:white;font-weight:700;margin-top:14px}
.petr-bairro-stops{margin:28px 0 22px}
.petr-bairro-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:16px}
.petr-bairro-stop{min-width:0;border-radius:19px;border:1px solid #dae7e2;padding:22px;background:#fff;box-shadow:0 8px 20px rgba(6,49,41,.055)}
.petr-bairro-stop h3{margin:0 0 10px;color:#0d5149;font-size:1.08rem}
.petr-bairro-stop p{font-size:.94rem;line-height:1.65;color:#435b55;margin:0 0 12px}
.petr-bairro-actions{display:flex;gap:8px;flex-wrap:wrap}
.petr-bairro-actions a{display:inline-block;padding:8px 12px;text-decoration:none;border:1px solid #b5d7cd;border-radius:999px;color:#0b5349;font-size:.86rem;font-weight:700}
.petr-bairro-actions a:hover{background:#e3f4ee}
.petr-bairro-sources{padding:14px 0;border-top:1px solid #dce8e3;margin-top:20px}
.petr-bairro-sources a{display:inline-block;margin:4px 12px 4px 0;color:#0b5148}
.petr-bairro-photo{max-height:460px;overflow:hidden;border-radius:20px}
.petr-bairro-photo img{width:100%;max-height:460px;object-fit:cover}
.petr-bairro-no-image{display:none}
.petr-bairro-topic{display:flex;flex-direction:column;min-height:294px;overflow:hidden}
.petr-bairro-topic img{display:block;width:100%;height:155px;object-fit:cover}
.petr-bairro-topic b{display:block;line-height:1.3;padding:12px 14px 0}
.petr-bairro-topic .petr-bairro-topic-summary{margin:8px 14px 12px;font-size:.88rem;line-height:1.5;color:#416059;flex:1}
.petr-bairro-topic > span{display:block;margin-top:auto;padding:0 14px 16px;font-weight:800}
.petr-bairro-topic--text{background:linear-gradient(138deg,#e9f5f0,#fcf7ec);border:1px solid #c9dfd4}
.petr-bairro-topic--text b{padding-top:26px;font-size:1.16rem;color:#153e36}
.petr-bairro-topic--text .petr-bairro-topic-summary{font-size:.96rem}
.petr-bairro-photo-credit{display:block;font-size:.77rem;margin:6px 4px 0;color:#4a5c57}
.petr-bairro-photo-credit a{color:#13564c;text-decoration:underline}
@media(max-width:600px){.petr-bairro-topic{min-height:248px}.petr-bairro-topic img{height:145px}}
@media(max-width:800px){.petr-bairro-panels{grid-template-columns:1fr}.petr-bairro-cards{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:560px){.petr-bairro-cards{grid-template-columns:1fr}.petr-bairro-profile{padding:16px}.petr-bairro-stop{padding:18px}}
</style>`;
function petrProfile(area, data, base, lang) {
  const mapLink = query => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
  const stops = data.points.map(point => `<article class="petr-bairro-stop"><h3>${esc(point.name)}</h3>${p(point.reason, lang)}
    <div class="petr-bairro-actions"><a target="_blank" rel="noopener noreferrer" href="${esc(mapLink(point.location))}">${text(t('Ver en el mapa', 'Ver no mapa', 'Open map'), lang)}</a>
    ${point.route ? navigate(base + point.route, t('Ver guía de visita', 'Abrir guia de visita', 'Read visitor guide'), lang) : ''}</div></article>`).join('');
  const sources = data.sources.map(([url,name]) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(name)}</a>`).join('');
  return `<div class="petr-bairro-profile">
    <section class="petr-bairro-box"><h2>${text(t('Historia e identidad del barrio', 'História e identidade do bairro', 'History and local identity'),lang)}</h2><div class="petr-bairro-intro">${p(data.history,lang)}</div></section>
    <div class="petr-bairro-panels"><section class="petr-bairro-box"><h2>${text(t('Un recorrido que yo haría', 'Um passeio que eu faria', 'A route I would take'),lang)}</h2>${p(data.itinerary,lang)}</section>
      <section class="petr-bairro-box"><h2>${text(t('Cómo llegar y volver', 'Como chegar e voltar', 'How to get there and back'),lang)}</h2>${p(data.access,lang)}
      <span class="petr-bairro-time">${text(data.duration,lang)}</span></section></div>
    <section class="petr-bairro-stops"><h2>${text(t('Paradas concretas para conocer', 'Paradas para conhecer', 'Specific places to visit'),lang)}</h2><div class="petr-bairro-cards">${stops}</div></section>
    <section class="petr-bairro-sources"><strong>${text(t('Fuentes para planificar la visita', 'Fontes para planejar a visita', 'Sources to plan your visit'),lang)}</strong><div>${sources}</div></section>
  </div>`;
}

export function renderRegionalNeighborhood(city, slug, lang, photos) {
  const districts = regionalNeighborhoods[city.slug];
  if (!districts) return null;
  const base = '/destinos/' + city.slug + '/';
  const key = 'barrios';
  const path = base + key + '/';
  const cityName = esc(city.name.toLocaleUpperCase('pt-BR'));
  const hero = (title, intro) => `<section class="hero" style="min-height:48vh"><div class="hero-copy">
    <p class="kicker">ERNESTINHO CARIOCA · ${cityName}</p><h1>${text(title, lang)}</h1><p class="lead">${text(intro, lang)}</p></div></section>`;

  if (slug) {
    const area = districts[slug];
    if (!area) return null;
    const photo = area.image ? photos[area.image] : null;
    const detailed = city.slug === 'petropolis' ? petropolisDistrictEditorial[slug] : null;
    const body = hero(area.name, area.summary) + `<section class="editorial bh-zone-index">
      ${navigate(path, back, lang, 'rd-action')}
      ${photo ? `<div class="petr-bairro-photo"><figure>${picture(photo, area.name, '', true)}</figure>${photo.author && photo.source ?
        `<small class="petr-bairro-photo-credit">${text(t('Fotografía', 'Fotografia', 'Photograph'),lang)}: <a href="${esc(photo.source)}" target="_blank" rel="noopener noreferrer">${esc(photo.author)}</a></small>` : ''}</div>` : ''}
      ${detailed ? petrProfile(area, detailed, base, lang) : ''}
      <article class="bh-cluster">
        <h2>${text(t('Qué ver y cómo moverte', 'O que ver e como circular', 'What to see and how to get around'), lang)}</h2>
        <p class="bh-cluster-intro">${text(area.visit, lang)}</p>
        ${navigate(base + area.nearby, t('Una parada para combinar →', 'Uma parada para combinar →', 'A stop to pair it with →'), lang, 'rd-action')}
        ${navigate(base + 'transportes/', t('Transportes', 'Transportes', 'Transport'), lang, 'rd-action')}</article></section>`;
    return { title: area.name, intro: area.summary, body, image: photo || null, inline: styles('barrios') + (detailed ? petrCss : '') };
  }
  const title = t(`Barrios de ${city.name}`, `Bairros de ${city.name}`, `${city.name} neighbourhoods`);
  const { intro, tip } = city.sections[key];
  const entries = Object.entries(districts);
  const isPetropolis = city.slug === 'petropolis';
  const tiles = entries.map(([id, area]) => {
    const photo = area.image ? photos[area.image] : null;
    const className = isPetropolis ? 'topic petr-bairro-topic' + (photo ? '' : ' petr-bairro-topic--text') : 'topic';
    return `<a class="${className}" href="${pre(lang) + path + id}/">
      ${picture(photo, area.name, 'bh-topic-mini')}<b>${esc(area.name)}</b>
      ${isPetropolis ? `<p class="petr-bairro-topic-summary">${text(area.summary,lang)}</p>` : ''}
      <span>${text(open, lang)}</span></a>`;
  }).join('');
  const clusters = entries.map(([id, area]) => `<a class="bh-cluster" href="${pre(lang) + path + id}/">
    <h3>${esc(area.name)}</h3><p class="bh-cluster-intro">${text(area.summary, lang)}</p><span class="bh-cluster-cta">${text(open, lang)}</span></a>`).join('');
  const body = hero(title, intro) + `<section class="editorial bh-individual-index"><div class="section-head">
    <h2>${text(t('Explora barrio por barrio', 'Explore bairro por bairro', 'Explore neighbourhood by neighbourhood'), lang)}</h2></div>
    <div class="topic-grid">${tiles}</div></section>
    <section class="editorial bh-zone-index"><div class="bh-clusters">${clusters}</div>
    <aside class="notice"><b>${text(t('Consejo de Ernestinho', 'Dica do Ernestinho', 'Ernestinho’s tip'), lang)}</b><p>${text(tip, lang)}</p></aside></section>`;
  return { title, intro, body, inline: styles('barrios') + (city.slug === 'petropolis' ? petrCss : '') };
}
