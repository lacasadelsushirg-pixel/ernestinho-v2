import { esc, pre, v } from './buzios_mirror_core.mjs';
import { t } from '../assets/js/translations/destinos/modelo.js';
import { regionalEvents } from '../assets/js/translations/destinos/eventos-regionales.js';

const labels = {
  all: t('Todos', 'Todos', 'All'),
  guide: t('Ver detalles', 'Ver detalhes', 'View details'),
  how: t('Cómo asistir', 'Como participar', 'How to attend'),
  back: t('Cómo regresar', 'Como voltar', 'Getting back'),
  official: t('Programación oficial ↗', 'Programação oficial ↗', 'Official programme ↗'),
  transport: t('Transportes del destino', 'Transportes do destino', 'Local transport'),
  archive: t('Edición de referencia', 'Edição de referência', 'Past edition'),
  confirmed: t('Fecha anunciada', 'Data divulgada', 'Date announced'),
  provisional: t('Fecha provisional', 'Data provisória', 'Provisional date'),
  month: t('Mes anunciado · día pendiente', 'Mês divulgado · dia pendente', 'Month announced · day pending'),
};

const locale = { ES: 'es', PT: 'pt-BR', EN: 'en' };
const utc = { timeZone: 'UTC' };
const date = value => new Date(value.length === 7 ? value + '-01' : value);
const txt = (copy, lang) => esc(v(copy, lang));
const external = (href, label, lang) =>
  `<a class="ec-agenda-official" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${txt(label, lang)}</a>`;

function monthsBetween(start, end) {
  const first = date(start);
  const last = date(end || start);
  const keys = [];
  for (const cursor = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), 1)); cursor <= last; cursor.setUTCMonth(cursor.getUTCMonth() + 1)) {
    keys.push(cursor.toISOString().slice(0, 7));
  }
  return keys;
}

function eventDates(event, lang) {
  const { start, end } = event;
  const month = start.length === 7;
  const format = new Intl.DateTimeFormat(locale[lang], { ...utc, ...(month ? { month: 'long', year: 'numeric' } : { dateStyle: 'long' }) });
  if (event.split) return [
    format.formatRange(date(start), date(event.split[0])),
    format.formatRange(date(event.split[1]), date(end)),
  ].join(' · ');
  return end && end !== start ? format.formatRange(date(start), date(end)) : format.format(date(start));
}

export function renderRegionalEvents(destination, photos, lang) {
  const events = regionalEvents[destination.slug];
  if (!events) return '';
  const months = [...new Set(events.flatMap(event => monthsBetween(event.start, event.end)))].sort();
  const monthFormat = new Intl.DateTimeFormat(locale[lang], { ...utc, month: 'long', year: 'numeric' });
  const today = new Date().toISOString().slice(0, 10);
  const titles = t('Calendario de eventos', 'Calendário de eventos', 'Events calendar');
  const intro = t('Filtra por mes. Las ediciones pasadas aparecen como referencia y las fechas provisionales llevan su propio aviso.', 'Filtre por mês. Edições anteriores ficam como referência e datas provisórias têm aviso próprio.', 'Filter by month. Past editions are kept for reference and provisional dates are labelled separately.');
  const ordered = [...events].sort((a, b) => {
    const archivedA = (a.end || a.start + '-31') < today;
    const archivedB = (b.end || b.start + '-31') < today;
    return archivedA - archivedB || (archivedA ? b.start.localeCompare(a.start) : a.start.localeCompare(b.start));
  });
  const cards = ordered.map(event => {
    const image = photos?.[event.photoKey];
    const state = (event.end || event.start + '-31') < today ? 'archive' : event.start.length === 7 ? 'month' : event.provisional ? 'provisional' : 'confirmed';
    return `<article class="ec-agenda-card" data-months="${monthsBetween(event.start, event.end).join(' ')}">
      ${image ? `<img src="${esc(image.src)}" alt="${esc(event.name)}" loading="lazy" decoding="async">` : ''}
      <div class="ec-agenda-copy"><span class="ec-agenda-status is-${state}">${txt(labels[state], lang)}</span>
      <h3>${esc(event.name)}</h3>
      <p class="ec-agenda-meta">${esc(eventDates(event, lang))} · ${txt(event.location, lang)}</p>
      ${event.organizer ? `<p class="ec-agenda-organizer">${txt(t('Organiza', 'Organização', 'Organiser'), lang)} · ${esc(event.organizer)}</p>` : ''}
      <p>${txt(event.description, lang)}</p>
      <details><summary>${txt(labels.guide, lang)}</summary>
      <div><h4>${txt(labels.how, lang)}</h4><p>${txt(event.attendance, lang)}</p></div>
      <div><h4>${txt(labels.back, lang)}</h4><p>${txt(event.returnTrip, lang)}</p></div>
      <div class="ec-agenda-links">
        ${external(event.official, labels.official, lang)}
        <a href="${pre(lang)}/destinos/${destination.slug}/transportes/">${txt(labels.transport, lang)}</a></div>
      </details></div></article>`;
  }).join('');
  return `<section class="ec-agenda" aria-labelledby="ec-agenda-title"><div class="ec-agenda-inner">
    <h2 id="ec-agenda-title">${txt(titles, lang)} · ${esc(destination.name)}</h2><p>${txt(intro, lang)}</p>
    <div class="ec-agenda-filters" hidden><button type="button" data-month="" aria-pressed="true">${txt(labels.all, lang)}</button>
      ${months.map(value => `<button type="button" data-month="${value}" aria-pressed="false">${esc(monthFormat.format(date(value)))}</button>`).join('')}</div>
    <div class="ec-agenda-grid">${cards}</div></div>
    <script>
      (() => {
        const section = document.currentScript.closest('.ec-agenda');
        const filters = section.querySelector('.ec-agenda-filters');
        filters.hidden = false;
        const buttons = [...filters.querySelectorAll('button')];
        const cards = [...section.querySelectorAll('[data-months]')];
        filters.addEventListener('click', event => {
          const selected = event.target.closest('button[data-month]');
          if (!selected) return;
          for (const button of buttons) button.setAttribute('aria-pressed', String(button === selected));
          for (const card of cards) card.hidden = selected.dataset.month !== '' && !card.dataset.months.split(' ').includes(selected.dataset.month);
        });
      })();
    </script></section>`;
}
