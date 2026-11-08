import { esc, styles, v } from './buzios_mirror_core.mjs';
import { t } from '../assets/js/translations/destinos/modelo.js';
import { regionalPhotoSpots } from '../assets/js/translations/destinos/fotografia-regional.js';

const labels = [
  t('Zona', 'Área', 'Area'),
  t('Mejor hora', 'Melhor horário', 'Best time'),
  t('Acceso', 'Acesso', 'Access'),
];
const openMap = t('Abrir en el mapa ↗', 'Abrir no mapa ↗', 'Open on map ↗');
const text = (value, lang) => esc(v(value, lang));

export function photographyCards(spots, lang, cityName) {
  return `<section class="editorial"><div class="photo-grid">${spots.map(({ name, photo, area, time, access, copy, arrival, query }) => {
    if (!photo) throw new Error(`Missing verified photograph for ${cityName}: ${name}`);
    const facts = [area, time, access].map((value, index) =>
      `<small><strong>${text(labels[index], lang)}</strong> · ${text(value, lang)}</small>`).join('');
    const href = 'https://www.google.com/maps/search/?api=1&amp;query=' + encodeURIComponent(query + ', ' + cityName + ', RJ');
    return `<article class="spot"><img class="photo-thumb" src="${esc(photo.src)}" alt="${esc(name)}" loading="lazy" decoding="async">
      <div class="spot-body"><b>${esc(name)}</b><div class="photo-facts">${facts}</div><p>${text(copy, lang)}</p>
      <p>${text(arrival, lang)}</p><a class="photo-map" href="${href}" target="_blank" rel="noopener noreferrer">${text(openMap, lang)}</a></div></article>`;
  }).join('')}</div></section>`;
}

export function renderRegionalPhotography(city, photos, lang) {
  if (!regionalPhotoSpots[city.slug]) return null;
  const spots = regionalPhotoSpots[city.slug].map(([key, name, area, time, access, copy, arrival]) =>
    ({ name, query: name, photo: photos[key], area, time, access, copy, arrival }));
  const title = t(`Fotografiar ${city.name}.`, `Fotografar ${city.name}.`, `Photographing ${city.name}.`);
  const { intro } = city.sections.fotografias;
  const hero = `<section class="hero" style="min-height:52vh"><div class="hero-copy">
    <p class="kicker">ERNESTINHO CARIOCA · ${esc(city.name.toLocaleUpperCase('pt-BR'))}</p><h1>${text(title, lang)}</h1>
    <p class="lead">${text(intro, lang)}</p></div></section>`;
  return { title, intro, body: hero + photographyCards(spots, lang, city.name), inline: styles('fotografia'), image: spots[0].photo };
}
