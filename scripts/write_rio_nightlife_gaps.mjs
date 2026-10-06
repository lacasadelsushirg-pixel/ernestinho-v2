// Add one route-specific decision note to ten short, existing Rio nightlife guides.
// Preserve each page's existing layout, copy, and image references.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const chunkPath = path.join(root, 'assets/js/translations/chunks/vida-nocturna-11.js');
const pages = [
  {
    route: 'cacique-de-ramos',
    es: 'Antes de reservar esa noche, yo confirmaría qué tipo de encuentro es: una roda, una feijoada, un ensayo o una celebración especial no se viven igual ni necesariamente tienen el mismo acceso. El Cacique tiene una historia y una comunidad propias; pregunto por las reglas del evento y sigo las indicaciones del espacio, sobre todo para fotos y grabaciones. Así la visita se acerca al samba del barrio sin convertir la quadra en un decorado.',
    pt: 'Antes de escolher essa noite, eu confirmaria que tipo de encontro será: uma roda, feijoada, ensaio ou celebração especial não são iguais e podem ter formas de acesso diferentes. O Cacique tem história e comunidade próprias; pergunto pelas regras do evento e sigo as orientações do espaço, especialmente para fotos e gravações. Assim, a visita se aproxima do samba do bairro sem transformar a quadra em cenário.',
    en: 'Before choosing a night, I would confirm what kind of gathering is taking place: a samba circle, feijoada, rehearsal or special celebration can feel different and may have different entry arrangements. Cacique has its own history and community, so I check the event rules and follow the venue’s guidance, especially for photos and filming. That lets me experience local samba without treating the quadra as a backdrop.'
  },
  {
    route: 'fogo-de-chao-botafogo',
    es: 'Yo decidiría primero si quiero sentarme a comer churrasco o sólo tomar algo con la vista: son planes distintos y cambian el tiempo que conviene reservar. Si voy por la Enseada, pido una mesa cuya orientación aproveche la bahía y confirmo disponibilidad para ese horario; si voy a cenar, miro el menú vigente antes de sentarme. Así la parada encaja con el resto de la noche sin depender de una foto antigua del lugar.',
    pt: 'Eu decidiria primeiro se quero sentar para comer churrasco ou apenas tomar algo com vista: são planos diferentes e mudam o tempo que vale reservar. Se for pela Enseada, peço uma mesa voltada para aproveitar a baía e confirmo a disponibilidade naquele horário; se for jantar, consulto o cardápio atual antes de sentar. Assim, a parada se encaixa no resto da noite sem depender de uma foto antiga do lugar.',
    en: 'I would first decide whether I want a full churrasco meal or just a drink with a view: they are different plans and call for different amounts of time. If I am going for the bay, I ask for a table facing it and confirm availability for that time; if I am having dinner, I check the current menu before sitting down. That helps the stop fit the rest of the evening instead of relying on an old photo of the venue.'
  },
  {
    route: 'ocya-ilha-primeira',
    es: 'Para esta salida, yo confirmaría el recorrido completo con el restaurante: punto exacto de embarque, duración del cruce, última vuelta disponible y qué pasa si el tiempo cambia. No reservaría sólo la mesa y dejaría el barco para resolver al llegar. Si la vuelta depende de una embarcación coordinada por el local, guarda su contacto y acuerda cómo avisar que ya estás listo para regresar.',
    pt: 'Para essa saída, eu confirmaria o trajeto completo com o restaurante: ponto exato de embarque, duração da travessia, último retorno disponível e o que acontece se o tempo mudar. Não reservaria apenas a mesa para deixar o barco para resolver na chegada. Se a volta depender de uma embarcação coordenada pelo local, salve o contato e combine como avisar que já está pronto para retornar.',
    en: 'For this outing, I would confirm the whole journey with the restaurant: the exact boarding point, crossing time, last return option and what happens if the weather changes. I would not book only the table and leave the boat details until arrival. If the return depends on a boat arranged by the venue, save its contact and agree how to let them know you are ready to head back.'
  },
  {
    route: 'portela',
    es: 'La Portela no es una casa de shows con cartelera diaria: el atractivo está en acercarse a una escuela de samba en una fecha que tenga sentido. Yo escogería el evento por su formato, llegaría sabiendo que el ensayo se comparte con quienes preparan el carnaval y seguiría las indicaciones del personal antes de fotografiar a participantes. Para completar el plan, revisaría el regreso desde Oswaldo Cruz antes de que empiece la música.',
    pt: 'A Portela não é uma casa de shows com programação diária: o interessante é conhecer uma escola de samba numa data que faça sentido. Eu escolheria o evento pelo formato, chegaria sabendo que o ensaio é compartilhado com quem prepara o carnaval e seguiria as orientações da equipe antes de fotografar participantes. Para completar o plano, conferiria a volta de Oswaldo Cruz antes de a música começar.',
    en: 'Portela is not a concert venue with a daily bill; the point is to visit a samba school on a date that makes sense. I would choose the event for its format, remember that a rehearsal is shared with the people preparing for Carnival, and follow staff guidance before photographing participants. I would also plan the journey back from Oswaldo Cruz before the music starts.'
  },
  {
    route: 'quadra-mangueira',
    es: 'Yo comprobaría si la convocatoria es un ensayo de comunidad, un show abierto o una experiencia guiada: cada formato permite acercarse a Mangueira de una manera distinta y tiene instrucciones propias. Mira qué incluye la entrada, dónde se realiza cada parte de la actividad y si hay reglas para cámaras o ropa. Así llegas preparado para participar con respeto, en vez de esperar que una noche de quadra funcione como una discoteca.',
    pt: 'Eu verificaria se a chamada é para ensaio de comunidade, show aberto ou experiência guiada: cada formato aproxima o visitante da Mangueira de um jeito diferente e tem instruções próprias. Confira o que está incluído no ingresso, onde acontece cada parte da atividade e se há regras para câmeras ou vestimenta. Assim, você chega preparado para participar com respeito, sem esperar que uma noite na quadra funcione como uma boate.',
    en: 'I would check whether the listing is for a community rehearsal, public show or guided experience: each format offers a different way to get close to Mangueira and has its own instructions. Check what the ticket includes, where each part takes place and whether there are rules for cameras or clothing. That prepares you to take part respectfully instead of expecting a quadra night to work like a nightclub.'
  },
  {
    route: 'quadra-salgueiro',
    es: 'Si aparece una experiencia de samba o taller además del ensayo, compáralos antes de comprar: la actividad guiada y la noche de quadra tienen objetivos distintos. Yo revisaría duración, idioma, acceso al ensayo y lo incluido en el ticket directamente con Salgueiro. Si sólo quieres escuchar samba, basta con elegir un evento público confirmado; no hace falta pagar por una experiencia más amplia que no vas a aprovechar.',
    pt: 'Se houver uma experiência de samba ou oficina além do ensaio, compare antes de comprar: a atividade guiada e a noite na quadra têm objetivos diferentes. Eu conferiria duração, idioma, acesso ao ensaio e o que está incluído no ingresso diretamente com o Salgueiro. Se você só quer ouvir samba, basta escolher um evento público confirmado; não precisa pagar por uma experiência mais ampla que não vai aproveitar.',
    en: 'If a samba experience or workshop is offered alongside a rehearsal, compare them before buying: the guided activity and a night at the quadra serve different purposes. I would check the duration, language, rehearsal access and ticket inclusions directly with Salgueiro. If you simply want to hear samba, choose a confirmed public event; there is no need to pay for a broader experience you will not use.'
  },
  {
    route: 'renascenca-clube',
    es: 'Yo elegiría la fecha según el proyecto musical anunciado, porque una roda pequeña y un show especial pueden atraer públicos y ritmos distintos. Antes de salir, confirma si la actividad es abierta al público, qué incluye el ingreso y cómo se organiza el espacio; el Renascença es también un club con vida comunitaria, no sólo una dirección para tomar algo. Llega con curiosidad por la música y deja que el evento marque la noche.',
    pt: 'Eu escolheria a data conforme o projeto musical anunciado, porque uma roda menor e um show especial podem atrair públicos e ritmos diferentes. Antes de sair, confirme se a atividade é aberta ao público, o que está incluído na entrada e como o espaço é organizado; o Renascença também é um clube com vida comunitária, não apenas um endereço para beber. Chegue com curiosidade pela música e deixe o evento conduzir a noite.',
    en: 'I would choose a date based on the musical project announced, since a small samba circle and a special show can draw different crowds and sounds. Before setting out, check whether it is open to the public, what admission includes and how the space is arranged; Renascença is also a community club, not just a place to get a drink. Arrive curious about the music and let the event shape the evening.'
  },
  {
    route: 'vitrinni',
    es: 'En una casa de fiestas, yo no daría por sentado que una lista garantiza entrada ni que el dress code de una semana sigue vigente en la siguiente. Revisa la publicación del evento que elegiste y guarda la confirmación con las condiciones de acceso, documento exigido y hora límite, si la hubiera. Si van varias personas, acuerden el punto de encuentro y el transporte de vuelta antes de dispersarse por la pista.',
    pt: 'Numa casa de festas, eu não presumiria que uma lista garante entrada nem que o dress code de uma semana continua valendo na seguinte. Confira a publicação do evento escolhido e salve a confirmação com as condições de acesso, documento exigido e horário-limite, se houver. Se forem várias pessoas, combinem um ponto de encontro e o transporte de volta antes de se espalharem pela pista.',
    en: 'At a club, I would not assume that being on a list guarantees entry or that last week’s dress code still applies. Check the listing for the event you chose and save its access terms, required ID and any entry deadline. If you are in a group, agree on a meeting point and a ride home before everyone spreads across the dance floor.'
  },
  {
    route: 'yoo2',
    es: 'Como el rooftop depende del tiempo, yo confirmaría el mismo día si está abierto y si reciben visitantes que no se alojan en el hotel. Pregunta también si la reserva cubre sólo una mesa o un evento específico; así evitas desplazarte por la vista y encontrar un acceso distinto al esperado. Si anuncian lluvia o viento fuerte, deja una alternativa bajo techo en Botafogo y conserva la reserva hasta confirmar el cambio.',
    pt: 'Como o rooftop depende do tempo, eu confirmaria no mesmo dia se está aberto e se recebe visitantes que não estão hospedados no hotel. Pergunte também se a reserva cobre apenas uma mesa ou um evento específico; assim, você evita ir pela vista e encontrar um acesso diferente do esperado. Se houver previsão de chuva ou vento forte, deixe uma alternativa coberta em Botafogo e mantenha a reserva até confirmar a mudança.',
    en: 'Because a rooftop depends on the weather, I would confirm on the day that it is open and accepts visitors who are not staying at the hotel. Also ask whether a booking covers just a table or a specific event, so you do not travel for the view and find different access arrangements. If rain or strong winds are forecast, keep an indoor Botafogo alternative and hold on to the booking until the change is confirmed.'
  },
  {
    route: 'leviano-bar',
    es: 'Si viajas con gente que busca noches distintas, yo usaría la programación para elegir juntos: el género y el tipo de fiesta dicen más que una descripción general del local. Comprueba también si la entrada permite salir y volver a entrar, porque no lo asumiría al organizar la cena o una parada en otra casa de Lapa. Con el plan decidido, acuerden dónde se reúnen al final y vuelvan en grupo.',
    pt: 'Se você viaja com pessoas que procuram noites diferentes, eu usaria a programação para escolher em conjunto: o gênero e o tipo de festa dizem mais do que uma descrição geral do lugar. Confira também se o ingresso permite sair e voltar, pois eu não presumiria isso ao planejar o jantar ou uma parada em outra casa da Lapa. Com o plano definido, combinem onde se encontrar no fim e voltem juntos.',
    en: 'If you are travelling with people who want different kinds of nights out, I would use the programme to choose together: the genre and party format say more than a general venue description. Also check whether your ticket allows re-entry; I would not assume that when planning dinner or another Lapa stop. Once you have a plan, agree where to meet at the end and travel back together.'
  }
];

const matrixPath = path.join(root, 'docs/rio/IMPLEMENTATION_MATRIX.json');
const matrix = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));
const routes = new Map(matrix.routes.map(r => [r.route, r]));
let translations = fs.readFileSync(chunkPath, 'utf8');
const missing = pages.filter(({es}) => !translations.includes(`${JSON.stringify(es)}: {`));

for (const page of pages) {
  const route = `/vida-nocturna/${page.route}/`;
  if (routes.get(route)?.status !== 'PENDIENTE') throw new Error(`Route is no longer pending: ${route}`);
  const file = path.join(root, route.slice(1), 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes(`>${page.es}</p>`)) continue;
  const articleEnd = html.lastIndexOf('</article>');
  const mainStart = html.indexOf('<main');
  if (articleEnd < 0 || mainStart < 0 || mainStart > articleEnd) throw new Error(`Cannot safely add paragraph: ${route}`);
  html = html.slice(0, articleEnd) + `<p>${page.es}</p>` + html.slice(articleEnd);
  fs.writeFileSync(file, html);
}

const insertion = missing.map(({es, pt, en}) => `  ${JSON.stringify(es)}: {\n    "PT": ${JSON.stringify(pt)},\n    "EN": ${JSON.stringify(en)}\n  },`).join('\n');
const end = translations.lastIndexOf('};');
if (end < 0 || translations.slice(end + 2).trim()) throw new Error('Unexpected nightlife translation chunk format');
if (insertion) {
  const before = translations.slice(0, end).trimEnd();
  translations = before + (before.endsWith('}') ? ',' : '') + '\n' + insertion + '\n' + translations.slice(end);
  fs.writeFileSync(chunkPath, translations);
}
console.log(`Prepared ${pages.length} route-specific nightlife notes in ES/PT/EN.`);
