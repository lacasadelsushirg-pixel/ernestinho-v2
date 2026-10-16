import { getLanguage } from './i18n.js';
import { routeParts } from './locale-routing.js';

const experiences = {
  '/experiencias/full-day-rio/': { ES: 'Full Day Río', PT: 'Full Day Rio', EN: 'Rio Full Day', price: 'R$430' },
  '/experiencias/cristo-city-tour/': { ES: 'Cristo + City Tour', PT: 'Cristo + City Tour', EN: 'Christ + City Tour', price: { ES: 'R$230 sin almuerzo / R$250 con almuerzo', PT: 'R$230 sem almoço / R$250 com almoço', EN: 'R$230 without lunch / R$250 with lunch' } },
  '/experiencias/maracana-experience/': { ES: 'Tour Maracanã', PT: 'Tour Maracanã', EN: 'Maracanã Stadium Tour', price: 'R$250' },
  '/experiencias/aquario-boulevard/': { ES: 'AquaRio + Boulevard Olímpico', PT: 'AquaRio + Boulevard Olímpico', EN: 'AquaRio + Olympic Boulevard', price: 'R$240' },
  '/experiencias/bioparque/': { ES: 'BioParque', PT: 'BioParque', EN: 'BioParque' },
  '/experiencias/partido-maracana/': { ES: 'un partido en Maracanã', PT: 'um jogo no Maracanã', EN: 'a match at Maracanã' }
};
const copy = {
  ES: { greeting: 'Hola Ernestinho, quiero consultar', name: 'Nombre', date: 'Fecha', passengers: 'Pasajeros', hotel: 'Hotel / hospedaje', phone: 'WhatsApp de contacto', message: 'Mensaje', price: 'Valor publicado', children: 'Edades de los niños', lunch: 'Con o sin almuerzo', match: 'Partido / sector de interés' },
  PT: { greeting: 'Olá Ernestinho, quero consultar', name: 'Nome', date: 'Data', passengers: 'Passageiros', hotel: 'Hotel / hospedagem', phone: 'WhatsApp para contato', message: 'Mensagem', price: 'Valor publicado', children: 'Idades das crianças', lunch: 'Com ou sem almoço', match: 'Jogo / setor de interesse' },
  EN: { greeting: 'Hi Ernestinho, I would like to enquire about', name: 'Name', date: 'Date', passengers: 'Passengers', hotel: 'Hotel / accommodation', phone: 'Contact WhatsApp', message: 'Message', price: 'Published price', children: 'Children’s ages', lunch: 'With or without lunch', match: 'Match / preferred section' }
};

export function bookingMessage(route, language, details = {}) {
  const experience = experiences[route];
  if (!experience) return null;
  const lang = copy[language] ? language : 'ES', labels = copy[lang];
  const lines = [`${labels.greeting} ${experience[lang]}.`];
  if (experience.price) lines.push(`${labels.price}: ${typeof experience.price === 'string' ? experience.price : experience.price[lang]}`);
  for (const [key, label] of [['nombre', 'name'], ['fecha', 'date'], ['pasajeros', 'passengers'], ['hotel', 'hotel']]) {
    if (key !== 'nombre' || details[key]) lines.push(`${labels[label]}: ${details[key] || '____'}`);
  }
  if (details.telefono) lines.push(`${labels.phone}: ${details.telefono}`);
  if (route.endsWith('/cristo-city-tour/')) lines.push(`${labels.lunch}: ____`);
  if (route.endsWith('/bioparque/') || route.endsWith('/cristo-city-tour/')) lines.push(`${labels.children}: ____`);
  if (route.endsWith('/partido-maracana/')) lines.push(`${labels.match}: ____`);
  if (details.mensaje) lines.push(`${labels.message}: ${details.mensaje}`);
  return lines.join('\n');
}
export function bookingUrl(route, language, details = {}) {
  const message = bookingMessage(route, language, details);
  return message ? `https://wa.me/5521969946938?text=${encodeURIComponent(message)}` : null;
}

export function localizeAttractionBooking(language) {
  const route = routeParts().path;
  if (experiences[route] || route.startsWith('/atracciones/') || route === '/familia/bioparque/') {
    const title = document.querySelector('main h1')?.textContent.trim() || '';
    const message = {
      ES: `Hola Ernestinho, quiero conocer Río contigo. Estoy leyendo: ${title}.`,
      PT: `Olá Ernestinho, quero conhecer o Rio com você. Estou lendo: ${title}.`,
      EN: `Hi Ernestinho, I would like to explore Rio with you. I am reading: ${title}.`
    }[language] || '';
    for (const link of document.querySelectorAll('.ec-corporate-closing a[href^="https://wa.me/5521969946938"]')) {
      link.href = `https://wa.me/5521969946938?text=${encodeURIComponent(message)}`;
    }
  }
  if (!experiences[route]) return;
  if (route !== '/experiencias/full-day-rio/') {
    for (const button of document.querySelectorAll('button.reserve')) {
      button.onclick = () => window.open(bookingUrl(route, getLanguage()), '_blank', 'noopener');
    }
  }
  for (const link of document.querySelectorAll('main a[href^="https://wa.me/"]')) {
    // Only replace the page's generic experience enquiry. Match-specific widgets own their details.
    if (link.closest('[data-match], .match-calendar, [data-ec-match-calendar]')) continue;
    if (!link.dataset.ecBookingOriginal) link.dataset.ecBookingOriginal = link.getAttribute('href');
    const original = new URL(link.dataset.ecBookingOriginal);
    if (original.pathname === '/5521969946938' && original.searchParams.has('text')) link.href = bookingUrl(route, language);
  }
  const form = document.getElementById('reserve-form');
  if (route === '/experiencias/full-day-rio/' && form && !form.dataset.ecLocalizedBooking) {
    form.dataset.ecLocalizedBooking = 'true';
    form.addEventListener('submit', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const details = Object.fromEntries(new FormData(form));
      window.open(bookingUrl(route, getLanguage(), details), '_blank', 'noopener');
    }, true);
  }
}
