// Add a route-specific practical note to five existing Rio guide pages.
// No page structure or imagery is changed.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const chunkPath = path.join(root, 'assets/js/translations/chunks/guia-02.js');
const pages = [
  {
    route: 'accesibilidad',
    es: 'Si vas a depender de ascensores o de una ruta sin escaleras, yo comprobaría cada estación del trayecto en la guía de accesibilidad de MetrôRio y volvería a confirmar el estado el mismo día. La disponibilidad de un equipo no garantiza que todo el recorrido entre calle, andén y destino sea continuo; guarda una alternativa de transporte y suma margen para cambiar de estación si hace falta.',
    pt: 'Se você depender de elevadores ou de um trajeto sem escadas, eu verificaria cada estação do percurso no guia de acessibilidade do MetrôRio e confirmaria as condições novamente no mesmo dia. A existência de um equipamento não garante que todo o caminho entre rua, plataforma e destino seja contínuo; salve uma alternativa de transporte e reserve tempo para trocar de estação se necessário.',
    en: 'If you rely on lifts or a step-free route, I would check each station on your journey in MetrôRio’s accessibility guide and confirm conditions again on the day. The presence of equipment does not guarantee a continuous route from street to platform to destination; save an alternative way to travel and allow extra time in case you need to change stations.'
  },
  {
    route: 'emergencias',
    es: 'Para una urgencia médica llama al 192 (SAMU); para incendio, rescate o salvamento, al 193; y para inundaciones, deslizamientos u otros riesgos colectivos, al 199 (Defensa Civil). Al llamar, da la dirección exacta, un punto de referencia y qué ocurrió. Son números nacionales de emergencia; reserva el 190 para delitos en curso o riesgo inmediato que requiera a la Policía Militar.',
    pt: 'Em uma urgência médica, ligue para 192 (SAMU); em caso de incêndio, resgate ou salvamento, para 193; e para enchentes, deslizamentos ou outros riscos coletivos, para 199 (Defesa Civil). Ao ligar, informe o endereço exato, um ponto de referência e o que aconteceu. São números nacionais de emergência; use o 190 para crimes em andamento ou risco imediato que exija a Polícia Militar.',
    en: 'For a medical emergency, call 192 (SAMU); for fires, rescues or salvage, call 193; for floods, landslides or other public hazards, call 199 (Civil Defence). Give the exact address, a nearby landmark and what happened. These are Brazil-wide emergency numbers; use 190 for crimes in progress or immediate risks requiring the Military Police.'
  },
  {
    route: 'seguro',
    es: 'Antes del viaje guardo en el teléfono el número de asistencia, el código de póliza y el procedimiento para que la compañía autorice una atención. Si tienes que pagar directamente, pide factura detallada, comprobante y resumen clínico antes de salir del centro: el reembolso depende de las condiciones del contrato y la aseguradora puede solicitar esos documentos.',
    pt: 'Antes da viagem, salvo no celular o número de assistência, o código da apólice e o procedimento para a seguradora autorizar o atendimento. Se precisar pagar diretamente, peça a nota detalhada, o comprovante e o resumo clínico antes de sair do serviço: o reembolso depende das condições do contrato e a seguradora pode solicitar esses documentos.',
    en: 'Before travelling, I save the assistance number, policy code and the steps for getting care authorised by the insurer. If you have to pay directly, ask for an itemised invoice, proof of payment and a clinical summary before leaving the provider: reimbursement depends on the contract and the insurer may request these documents.'
  },
  {
    route: 'vacunas',
    es: 'No decidas sólo por el nombre del destino: las recomendaciones sobre fiebre amarilla dependen del itinerario, el historial de vacunación y la situación personal. Consulta el calendario vigente del Ministerio de Salud y a un profesional; cuando la vacuna está indicada para el viajero, el Ministerio recomienda aplicarla al menos 10 días antes. El certificado internacional puede depender de las reglas del país de destino o de tránsito.',
    pt: 'Não decida apenas pelo nome do destino: as recomendações sobre febre amarela dependem do itinerário, do histórico vacinal e da situação pessoal. Consulte o calendário vigente do Ministério da Saúde e um profissional; quando a vacina é indicada para o viajante, o Ministério recomenda aplicá-la pelo menos 10 dias antes. O certificado internacional pode depender das regras do país de destino ou de trânsito.',
    en: 'Do not decide based only on the destination’s name: yellow-fever recommendations depend on your itinerary, vaccination history and personal circumstances. Check the current Ministry of Health schedule and consult a health professional; when vaccination is indicated for a traveller, the Ministry recommends getting it at least 10 days beforehand. An international certificate may depend on the rules of your destination or transit country.'
  },
  {
    route: 'viajar-solo',
    es: 'Cuando viajo solo, dejo a alguien de confianza el alojamiento, el plan del día y la hora aproximada de regreso; también guardo la dirección en portugués y sin conexión. Para un traslado, verifico matrícula y vehículo dentro de la aplicación antes de subir y comparto el recorrido con esa persona. Si cambio el plan, aviso: una comunicación simple ayuda a que alguien sepa dónde buscarte si el teléfono se queda sin batería.',
    pt: 'Quando viajo sozinho, deixo com alguém de confiança o endereço da hospedagem, o plano do dia e o horário aproximado de volta; também salvo o endereço em português e offline. Para um deslocamento, confiro placa e veículo no aplicativo antes de entrar e compartilho o trajeto com essa pessoa. Se mudar o plano, aviso: uma comunicação simples ajuda alguém a saber onde procurar você se o celular ficar sem bateria.',
    en: 'When travelling alone, I give someone I trust my accommodation, day plan and approximate return time; I also save the address in Portuguese for offline use. For a ride, I check the vehicle and plate in the app before getting in and share the trip with that person. If plans change, I let them know: a simple check-in helps someone know where to look if your phone runs out of battery.'
  }
];

let translations = fs.readFileSync(chunkPath, 'utf8');
const missing = pages.filter(({es}) => !translations.includes(`${JSON.stringify(es)}:`));
const end = translations.lastIndexOf('};');
if (end < 0 || translations.slice(end + 2).trim()) throw new Error('Unexpected guia translation chunk format');

for (const page of pages) {
  const route = `/guia/${page.route}/`;
  const file = path.join(root, route.slice(1), 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes(`>${page.es}</p>`)) continue;
  const articleEnd = html.lastIndexOf('</article>');
  const mainStart = html.indexOf('<main');
  if (articleEnd < 0 || mainStart < 0 || mainStart > articleEnd) throw new Error(`Cannot safely add paragraph: ${route}`);
  html = html.slice(0, articleEnd) + `<p>${page.es}</p>` + html.slice(articleEnd);
  fs.writeFileSync(file, html);
}

const insert = missing.map(({es,pt,en}) => `  ${JSON.stringify(es)}: {\n    "PT": ${JSON.stringify(pt)},\n    "EN": ${JSON.stringify(en)}\n  },`).join('\n');
if (insert) {
  const before = translations.slice(0, end).trimEnd();
  translations = before + (before.endsWith('}') ? ',' : '') + '\n' + insert + '\n' + translations.slice(end);
  fs.writeFileSync(chunkPath, translations);
}

const sourcesPath = path.join(root, 'docs/rio/FUENTES_NUEVAS_GUIAS.json');
const sources = JSON.parse(fs.readFileSync(sourcesPath, 'utf8'));
const additions = [
  ['https://metrorio.com.br/GuiaDoCliente/Acessibilidade','MetrôRio · acessibilidade por estação',['/guia/accesibilidad/'],'Station-specific information for step-free journey planning; reconfirm availability on the day.'],
  ['https://www.gov.br/mcom/pt-br/noticias/noticias_alt/2026/setembro/emergencia-voce-sabe-para-quem-ligar-quando-precisa-de-ajuda','Ministério das Comunicações · emergency numbers',['/guia/emergencias/'],'Official distinctions between 190, 192, 193 and 199 and what information callers should provide.'],
  ['https://www.gov.br/saude/pt-br/vacinacao/viajantes','Ministério da Saúde · vaccination for travellers',['/guia/vacunas/'],'Current traveller guidance; yellow-fever indication depends on recommended areas and at least 10 days before travel when indicated.'],
  ['https://www.gov.br/anatel/pt-br/regulado/numeracao/codigos-nacionais/servicos-de-utilidade-publica-e-de-emergencia','Anatel · public utility and emergency numbers',['/guia/emergencias/'],'Official national emergency-number directory.']
];
for (const [url,label,routes,use] of additions) if (!sources.some(s=>s.url===url)) sources.push({url,label,checked:'2026-10-06',routes,use,imageReusePermission:false});
fs.writeFileSync(sourcesPath,JSON.stringify(sources,null,2)+'\n');
console.log(`Prepared ${pages.length} guide notes in ES/PT/EN and recorded ${additions.length} official sources.`);
