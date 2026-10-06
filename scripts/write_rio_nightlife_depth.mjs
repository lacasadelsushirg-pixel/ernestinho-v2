// Add a practical night-out note to selected existing Rio nightlife pages.
// Pages retain their existing layout, sections, imagery, and original copy.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const chunkPath = path.join(root, 'assets/js/translations/chunks/vida-nocturna-11.js');
const pages = [
  {
    route: 'all-in',
    es: 'Yo elegiría All In por la fiesta anunciada esa noche, no por asumir que todas son iguales: revisa género musical, lista, entrada, política de mesas y edad antes de salir. Está en Barra, así que calcula la vuelta hasta tu alojamiento antes de entrar y acuerda el punto de recogida si el grupo se separa. Lleva identificación y sólo lo necesario; la logística de regreso importa tanto como el plan de pista.',
    pt: 'Eu escolheria o All In pela festa anunciada para aquela noite, sem presumir que todas sejam iguais: confira gênero musical, lista, entrada, regras das mesas e idade antes de sair. Fica na Barra, então calcule a volta até a hospedagem antes de entrar e combine o ponto de embarque caso o grupo se separe. Leve documento e apenas o necessário; a logística de retorno importa tanto quanto a pista.',
    en: 'I would choose All In for the event announced that night, rather than assuming every party is the same: check the music, guest list, entry, table policy and age rules before leaving. It is in Barra, so plan your return to your accommodation before going in and agree on a pickup point if your group splits up. Bring ID and only what you need; the journey back matters as much as the dance floor.'
  },
  {
    route: 'armazem-do-senado',
    es: 'Para sentir el Armazém, yo miraría qué música hay esa noche y llegaría con tiempo para conversar antes de que la rueda gane volumen. Pregunta si la entrada o el couvert se cobran por persona y confirma cómo funciona el consumo; esas condiciones pueden cambiar según el evento. Al terminar, usa una dirección precisa para pedir el regreso y no des por hecho que te conviene caminar hasta otra zona sólo porque aparece cerca en el mapa.',
    pt: 'Para sentir o Armazém, eu veria qual música está programada naquela noite e chegaria com tempo para conversar antes de a roda ganhar volume. Pergunte se há entrada ou couvert por pessoa e confirme como funciona o consumo; essas condições podem mudar conforme o evento. Ao terminar, use um endereço exato para pedir a volta e não presuma que vale caminhar até outra região só porque parece perto no mapa.',
    en: 'To enjoy Armazém, I would check what music is scheduled that night and arrive with time to talk before the samba circle gets louder. Ask whether there is an entrance fee or per-person couvert and confirm how the bill works; terms can vary by event. When you leave, use an exact address for your ride and do not assume walking to another area is a good idea just because it looks close on a map.'
  },
  {
    route: 'bafo-da-prainha',
    es: 'Yo combinaría la comida y el samba sin llegar con un horario apretado: el movimiento de Largo da Prainha puede hacer que encontrar mesa o esperar el pedido tome más de lo previsto. Confirma el menú y cualquier cobro de música antes de sentarte, y guarda energía para volver desde la Zona Portuaria. Si vas en grupo, deja acordado el punto de encuentro; con mucha gente alrededor, el nombre del bar no basta para reunirse.',
    pt: 'Eu combinaria comida e samba sem chegar com horário apertado: o movimento do Largo da Prainha pode fazer a mesa ou o pedido demorarem mais do que o previsto. Confira o cardápio e qualquer cobrança pela música antes de sentar, e reserve energia para voltar da Zona Portuária. Se estiver em grupo, combine um ponto de encontro; com muita gente por perto, o nome do bar não basta para se reunir.',
    en: 'I would combine food and samba without a tight schedule: the bustle at Largo da Prainha can make finding a table or waiting for an order take longer than expected. Check the menu and any music charge before sitting down, and leave energy for the return from the Port Zone. If you are in a group, agree on a meeting point; in a crowd, the bar’s name alone is not enough to reunite.'
  },
  {
    route: 'bar-bukowski',
    es: 'Aquí manda la programación, así que yo revisaría qué banda, DJ o fiesta toca y si conviene comprar entrada antes. No elegiría la ropa sólo por una etiqueta de “rock”: mira las condiciones del evento y lleva algo cómodo para permanecer de pie o moverte entre ambientes. Al estar en Botafogo, puedes combinar la salida con una cena cerca, pero define la vuelta desde el inicio si terminas tarde.',
    pt: 'Aqui a programação é que manda, então eu conferiria qual banda, DJ ou festa vai tocar e se vale comprar ingresso antes. Não escolheria a roupa apenas pelo rótulo “rock”: veja as condições do evento e use algo confortável para ficar em pé ou circular pelos ambientes. Como fica em Botafogo, dá para combinar a saída com um jantar por perto, mas defina a volta desde o começo se for terminar tarde.',
    en: 'The programme sets the tone here, so I would check which band, DJ or party is on and whether it is best to buy a ticket in advance. I would not choose clothes based only on the “rock” label: check the event details and wear something comfortable for standing or moving between areas. It is in Botafogo, so you can pair it with dinner nearby, but plan your return in advance if you will be out late.'
  },
  {
    route: 'bar-da-cachaca',
    es: 'Yo lo pondría dentro de una noche de Lapa, no como excusa para improvisar una ruta larga a pie después de beber. Pregunta el precio de la bebida y del servicio antes de pedir, lleva agua y alterna con comida. Si quieres probar cachaça, ve despacio y no conduzcas; deja resuelto un transporte de vuelta que el grupo pueda identificar, y evita dejar vasos u objetos sin atención en la calle.',
    pt: 'Eu incluiria o bar numa noite pela Lapa, não como motivo para improvisar uma caminhada longa depois de beber. Pergunte o preço da bebida e do serviço antes de pedir, beba água e alterne com comida. Se quiser provar cachaça, vá com calma e não dirija; deixe organizado um transporte de volta que o grupo consiga identificar e não deixe copos ou objetos sem atenção na rua.',
    en: 'I would make this one stop in a Lapa evening, not a reason to improvise a long walk after drinking. Ask about drink and service prices before ordering, have water and alternate with food. If you want to try cachaça, take it slowly and do not drive; arrange an identifiable ride home in advance, and keep an eye on your belongings while outside.'
  },
  {
    route: 'bar-do-omar',
    es: 'La subida hasta Morro do Pinto forma parte del plan: yo acordaría transporte de ida y vuelta antes de llegar y no contaría con improvisar una caminata desde el Centro al final de la noche. Comprueba la música y el ambiente del día, confirma reservas o condiciones de mesa y guarda la dirección exacta. Si el grupo quiere seguir después, elijan la próxima parada antes de pedir el vehículo.',
    pt: 'A subida até o Morro do Pinto faz parte do plano: eu combinaria ida e volta antes de chegar e não contaria com improvisar uma caminhada do Centro no fim da noite. Confira a música e o ambiente do dia, confirme reserva ou condições de mesa e salve o endereço exato. Se o grupo quiser continuar depois, escolha o próximo destino antes de pedir o carro.',
    en: 'The climb to Morro do Pinto is part of the plan: I would arrange the journey both ways before arriving and would not improvise a walk from downtown at the end of the night. Check the day’s music and atmosphere, confirm any booking or table terms, and save the exact address. If your group wants to continue elsewhere, choose the next stop before ordering a car.'
  },
  {
    route: 'beco-das-garrafas',
    es: 'Elige el show antes de salir: Bottle’s Bar y Little Club pueden tener propuestas y horarios distintos, y la historia de la Bossa Nova no garantiza que cualquier noche tenga el mismo formato. Yo comprobaría agenda, entradas, asiento y hora de llegada en el canal oficial del espectáculo. Después, quédate en calles concurridas y organiza la vuelta desde Copacabana, sobre todo si el show termina más tarde de lo previsto.',
    pt: 'Escolha o show antes de sair: Bottle’s Bar e Little Club podem ter propostas e horários diferentes, e a história da Bossa Nova não significa que toda noite tenha o mesmo formato. Eu conferiria agenda, ingressos, assento e horário de chegada no canal oficial do espetáculo. Depois, permaneça em ruas movimentadas e organize a volta de Copacabana, principalmente se o show terminar mais tarde do que o previsto.',
    en: 'Choose the show before setting out: Bottle’s Bar and Little Club may have different offerings and schedules, and the venue’s Bossa Nova history does not mean every night follows the same format. I would check the event listing, tickets, seating and arrival time through the official show channel. Afterwards, stay on busy streets and plan your ride home from Copacabana, especially if the performance runs late.'
  },
  {
    route: 'beco-do-rato',
    es: 'El Beco funciona mejor cuando eliges la roda de samba o el show de esa fecha, no sólo el nombre del lugar. Yo revisaría agenda, entrada, couvert y horario de la última presentación en el canal oficial; si no hay programación que te interese, guarda Lapa para otra noche. Llega con margen, acuerda un punto de salida y pide el transporte en una calle iluminada y fácil de identificar.',
    pt: 'O Beco funciona melhor quando você escolhe a roda de samba ou o show daquela data, não apenas o nome do lugar. Eu conferiria agenda, entrada, couvert e horário da última apresentação no canal oficial; se a programação não interessar, deixe a Lapa para outra noite. Chegue com tempo, combine um ponto de saída e peça o transporte numa rua iluminada e fácil de identificar.',
    en: 'Beco works best when you choose the samba circle or show for that date, rather than going only for the venue name. I would check the official programme, entry, couvert and last performance time; if that night’s listing is not for you, save Lapa for another evening. Arrive with time, agree on an exit point and request your ride from a well-lit, easy-to-identify street.'
  },
  {
    route: 'bip-bip',
    es: 'Bip Bip es para escuchar: yo bajaría la voz cuando empieza la música y preguntaría con discreción cómo funciona el pago, el pedido y el espacio disponible. Es un sitio pequeño, así que no iría con una expectativa de mesa amplia ni de conversación durante la roda. Confirma si habrá música esa noche por el canal del local, lleva efectivo de respaldo y organiza cómo vuelves antes de que termine el show.',
    pt: 'O Bip Bip é para ouvir: eu baixaria a voz quando a música começa e perguntaria com discrição como funcionam o pagamento, os pedidos e o espaço disponível. É um lugar pequeno, então não esperaria uma mesa ampla nem conversa durante a roda. Confira se haverá música naquela noite pelos canais do local, leve uma alternativa de pagamento e organize a volta antes do fim do show.',
    en: 'Bip Bip is a listening room: I would lower my voice when the music starts and discreetly ask how payment, ordering and seating work. It is a small place, so do not expect a large table or easy conversation during the music circle. Check the venue’s channels to see whether there is music that night, bring a backup payment option and plan your return before the show ends.'
  },
  {
    route: 'blue-note-rio',
    es: 'Yo compraría la noche por el artista y el horario, no sólo por el nombre Blue Note: revisa la ficha del show, la hora de apertura de puertas, el formato de asiento y las reglas de entrada. Llega con margen para resolver la cena o el consumo sin apuro y guarda el comprobante de compra. Cuando termine, usa una salida y un transporte acordados; no cuentes con que el último metro o bus siga disponible.',
    pt: 'Eu escolheria a noite pelo artista e pelo horário, não apenas pelo nome Blue Note: confira a ficha do show, a abertura das portas, o formato dos assentos e as regras de entrada. Chegue com tempo para jantar ou consumir sem pressa e guarde o comprovante. Ao terminar, use uma saída e um transporte combinados; não conte que o último metrô ou ônibus ainda estará disponível.',
    en: 'I would choose the night for the artist and schedule, not just the Blue Note name: check the show listing, door time, seating format and entry rules. Arrive with enough time for dinner or a drink without rushing, and keep your ticket confirmation. When it ends, use an agreed exit and ride plan; do not assume the last metro or bus will still be running.'
  }
];

let translations = fs.readFileSync(chunkPath, 'utf8');
const missing = pages.filter(({es}) => !translations.includes(`${JSON.stringify(es)}: {`));
const insertion = missing.map(({es, pt, en}) => `  ${JSON.stringify(es)}: {\n    "PT": ${JSON.stringify(pt)},\n    "EN": ${JSON.stringify(en)}\n  },`).join('\n');
const end = translations.lastIndexOf('};');
if (end < 0 || translations.slice(end + 2).trim()) throw new Error('Unexpected nightlife chunk format');
for (const page of pages) {
  const file = path.join(root, 'vida-nocturna', page.route, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes(`>${page.es}</p>`)) { console.log(`Already present /vida-nocturna/${page.route}/`); continue; }
  const endArticle = html.lastIndexOf('</article>');
  if (endArticle < 0 || html.indexOf('<main') > endArticle) throw new Error(`Safe article end not found: ${page.route}`);
  html = html.slice(0, endArticle) + `<p>${page.es}</p>` + html.slice(endArticle);
  fs.writeFileSync(file, html);
  console.log(`Updated /vida-nocturna/${page.route}/`);
}
if (insertion) {
  const before = translations.slice(0, end).trimEnd();
  translations = before + (before.endsWith('}') ? ',' : '') + '\n' + insertion + '\n' + translations.slice(end);
  fs.writeFileSync(chunkPath, translations);
}
console.log(`Nightlife guidance prepared for ${pages.length} routes in ES/PT/EN.`);
