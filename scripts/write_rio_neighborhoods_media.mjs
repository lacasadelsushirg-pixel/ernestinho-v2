// Add distinct visit-planning advice to five medium-high priority Rio districts.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const heading = [
  'Arma la visita con intención',
  'Planeje a visita com intenção',
  'Give the visit a clear purpose',
];
const transportLink = [
  'Consulta la guía de transporte →',
  'Consulte o guia de transporte →',
  'See the transport guide →',
];
const entries = {
  catete: [
    [
      'Si te interesa la historia política de Río, reserva el tiempo principal para el Palácio do Catete y el Museu da República. Después decide si quieres alargar el recorrido hacia las calles comerciales, Largo do Machado o el Aterro; son ritmos distintos y no hace falta convertirlos en una sola caminata. Antes de salir, confirma qué espacios están abiertos y cuánto tiempo requiere cada visita.',
      'Se você se interessa pela história política do Rio, reserve o tempo principal para o Palácio do Catete e o Museu da República. Depois, decida se quer estender o passeio pelas ruas comerciais, pelo Largo do Machado ou pelo Aterro; são ritmos diferentes e não precisam virar uma única caminhada. Antes de sair, confirme quais espaços estão abertos e quanto tempo cada visita exige.',
      'If Rio’s political history interests you, give the Palácio do Catete and Museu da República the main part of your visit. Then decide whether to continue through the shopping streets, Largo do Machado or the Aterro; these have different rhythms and do not need to become one long walk. Before setting out, check which spaces are open and how much time each visit needs.',
    ],
    [
      'Catete también puede funcionar como una pausa urbana entre Zona Sul y Centro, sobre todo si prefieres resolver comida y transporte cerca del paseo. Con lluvia, prioriza un espacio cultural y deja el parque para cuando el tiempo acompañe. Si vas con niños o movilidad reducida, consulta accesos y descanso disponibles en cada lugar en vez de suponer que todo el trayecto será cómodo.',
      'Catete também pode funcionar como uma pausa urbana entre a Zona Sul e o Centro, especialmente se você prefere resolver comida e transporte perto do passeio. Com chuva, priorize um espaço cultural e deixe o parque para quando o tempo ajudar. Com crianças ou mobilidade reduzida, confira os acessos e locais para descansar em cada lugar, sem presumir que todo o percurso será confortável.',
      'Catete can also make an urban stop between Zona Sul and Centro, especially if you prefer to find food and transport near your outing. In rain, prioritise an indoor cultural venue and leave the park for better weather. With children or reduced mobility, check access and places to rest at each stop instead of assuming the whole route will be comfortable.',
    ],
  ],
  gloria: [
    [
      'Glória se disfruta mejor cuando separas patrimonio, bahía y feria en vez de intentar verlos de paso. Elige una referencia principal —la iglesia histórica, la Marina o la Feira da Glória— y construye alrededor el resto de la jornada. La feria depende de calendario y condiciones del día: confirma que se realice antes de organizar el viaje especialmente para ella.',
      'A Glória rende mais quando você separa patrimônio, baía e feira em vez de tentar conhecer tudo de passagem. Escolha uma referência principal — a igreja histórica, a Marina ou a Feira da Glória — e organize o restante do dia em torno dela. A feira depende do calendário e das condições do dia: confirme se vai acontecer antes de planejar um deslocamento só para visitá-la.',
      'Glória works best when you separate heritage, bayfront and market instead of trying to see everything in passing. Choose one main anchor—the historic church, the Marina or Feira da Glória—and organise the rest of your day around it. The market depends on the calendar and conditions; confirm it is taking place before making a special trip for it.',
    ],
    [
      'La zona tiene tramos abiertos donde el sol, la lluvia o un evento pueden cambiar cuánto apetece caminar. Lleva agua, deja una alternativa bajo techo y revisa accesos y horarios de los espacios que quieras visitar. Si sigues hacia Catete o Centro, ubica tu último destino antes de salir para no medir la conexión solo por la distancia del mapa.',
      'A região tem trechos abertos em que sol, chuva ou um evento podem mudar a disposição para caminhar. Leve água, tenha uma alternativa coberta e confira acessos e horários dos espaços que pretende visitar. Se seguir para Catete ou Centro, marque o destino final antes de sair, sem avaliar a conexão apenas pela distância no mapa.',
      'Some parts of the area are open to the elements, so sun, rain or an event can change how much you want to walk. Bring water, keep an indoor alternative in mind, and check access and hours for the places you want to visit. If you continue to Catete or Centro, pin your final destination before leaving instead of judging the connection by map distance alone.',
    ],
  ],
  maracana: [
    [
      'En Maracanã, separa el estadio del resto del barrio y elige primero entre una visita cultural o un día de partido. Para recorrer el estadio, comprueba operación, entradas y acceso en sus canales oficiales; en una fecha deportiva, considera que llegada, filas y salida forman parte del plan. Si no hay evento, puedes combinar el entorno con Quinta da Boa Vista, pero confirma por separado la apertura de cada lugar.',
      'No Maracanã, separe o estádio do restante do bairro e escolha primeiro entre uma visita cultural ou um dia de jogo. Para visitar o estádio, confira funcionamento, ingressos e acesso nos canais oficiais; em dia de partida, considere chegada, filas e saída como parte do roteiro. Sem evento, dá para combinar o entorno com a Quinta da Boa Vista, mas confirme separadamente o funcionamento de cada lugar.',
      'In Maracanã, treat the stadium and the surrounding neighbourhood as separate parts of your visit, and decide whether you want a cultural visit or a match day. Check stadium operations, tickets and access through official channels; on a match day, arrival, queues and departure are part of the plan. Without an event, you can pair the area with Quinta da Boa Vista, but check each place’s opening separately.',
    ],
    [
      'No armes el horario alrededor de una salida rápida después del partido: deja margen para el movimiento de público y acuerda un punto de encuentro fácil de reconocer. Si vas con niños, mantengan juntos los boletos y definan qué hacer si el grupo se separa. Para el resto de la jornada, escoge un solo complemento cercano; sumar demasiadas zonas hace más difícil adaptarse a cambios del evento.',
      'Não monte o horário contando com uma saída rápida depois do jogo: deixe margem para o fluxo de pessoas e combine um ponto de encontro fácil de reconhecer. Com crianças, mantenham os ingressos juntos e decidam o que fazer se o grupo se separar. Para o restante do dia, escolha apenas um complemento próximo; somar muitas regiões dificulta adaptar o plano a mudanças no evento.',
      'Do not plan on a quick departure after a match: leave time for crowds and agree on an easy-to-recognise meeting point. With children, keep tickets together and decide what to do if the group gets separated. For the rest of the day, choose one nearby addition; too many districts make it harder to adjust to event changes.',
    ],
  ],
  'sao-cristovao': [
    [
      'São Cristóvão conecta dos visitas con identidades propias: la Quinta da Boa Vista y la Feira de São Cristóvão. Si eliges la feria, dale espacio para comer, escuchar música y recorrer los puestos sin prisa; no la trates como una parada breve entre monumentos. Si prefieres el parque y la historia, organiza el día alrededor de esa visita y revisa qué partes están abiertas.',
      'São Cristóvão reúne dois passeios com identidades próprias: a Quinta da Boa Vista e a Feira de São Cristóvão. Se escolher a feira, reserve tempo para comer, ouvir música e percorrer as barracas sem pressa; não trate a visita como uma parada rápida entre monumentos. Se preferir o parque e a história, organize o dia em torno desse passeio e confira quais áreas estão abertas.',
      'São Cristóvão brings together two outings with distinct identities: Quinta da Boa Vista and Feira de São Cristóvão. If you choose the market, allow time to eat, listen to music and browse without rushing; do not treat it as a quick stop between monuments. If you prefer the park and its history, build the day around that visit and check which areas are open.',
    ],
    [
      'La Feira celebra cultura nordestina dentro de Río: acércate con curiosidad y respeto, no como si fuera un espectáculo preparado para visitantes. Confirma días, programación, entrada y cómo volver antes de salir, porque la experiencia puede variar. Si quieres combinarla con Maracanã u otra zona, verifica la logística y deja suficiente tiempo para disfrutar cada lugar por separado.',
      'A Feira celebra a cultura nordestina dentro do Rio: conheça com curiosidade e respeito, sem tratá-la como um espetáculo montado para visitantes. Confirme dias, programação, ingresso e como voltar antes de sair, pois a experiência pode variar. Se quiser combinar com o Maracanã ou outra região, confira a logística e reserve tempo para aproveitar cada lugar separadamente.',
      'The market celebrates Northeastern Brazilian culture in Rio: approach it with curiosity and respect, not as a show staged for visitors. Check days, programming, admission and your return plan before leaving, as the experience can vary. If you want to pair it with Maracanã or another district, check the logistics and leave enough time to enjoy each place separately.',
    ],
  ],
  madureira: [
    [
      'Madureira merece un día con un eje definido: comercio popular, samba o Parque Madureira. Portela e Império Serrano son referencias culturales del barrio, pero sus ensayos y actividades no funcionan como una visita turística diaria; confirma agenda, acceso y normas directamente antes de ir. Si quieres conocer más de una faceta, escoge dos paradas y deja tiempo para trasladarte entre ellas.',
      'Madureira merece um dia com um foco definido: comércio popular, samba ou Parque Madureira. Portela e Império Serrano são referências culturais do bairro, mas ensaios e atividades não funcionam como visita turística diária; confirme agenda, acesso e regras diretamente antes de ir. Se quiser conhecer mais de uma faceta, escolha duas paradas e reserve tempo para se deslocar entre elas.',
      'Madureira deserves a day with a clear focus: popular shopping, samba or Parque Madureira. Portela and Império Serrano are cultural landmarks, but rehearsals and activities are not daily tourist visits; check schedules, access and visitor guidance directly before going. If you want to explore more than one side, choose two stops and leave time to travel between them.',
    ],
    [
      'El Mercadão es un polo comercial por derecho propio: decide si quieres comprar, probar comida o simplemente observar el movimiento, y revisa horarios antes de desplazarte. Para comer, pregunta por porciones y formas de pago antes de pedir; en un día concurrido, lleva un punto de encuentro acordado. Planifica la ida y la vuelta con transporte actualizado y no dependas de que un evento termine a una hora exacta.',
      'O Mercadão é um polo comercial por si só: decida se quer fazer compras, provar comida ou apenas observar o movimento e confira o horário antes de se deslocar. Para comer, pergunte sobre porções e formas de pagamento antes de pedir; em dia movimentado, combine um ponto de encontro. Planeje ida e volta com informações atuais de transporte e não dependa de um evento terminar num horário exato.',
      'Mercadão is a commercial destination in its own right: decide whether you want to shop, try food or simply take in the activity, and check hours before travelling. Ask about portions and payment methods before ordering; on a busy day, agree on a meeting point. Plan your outward and return journeys with current transport information and do not rely on an event ending at an exact time.',
    ],
  ],
};

const phrases = {};
for (const triplet of [heading, transportLink, ...Object.values(entries).flat()]) {
  phrases[triplet[0]] = { PT: triplet[1], EN: triplet[2] };
}
const chunkPath = path.join(root, 'assets/js/translations/chunks/barrios-02.js');
let dictionary = fs.readFileSync(chunkPath, 'utf8');
const missing = Object.fromEntries(Object.entries(phrases).filter(([key]) => !dictionary.includes(`${JSON.stringify(key)}:`)));
if (Object.keys(missing).length) dictionary = dictionary.replace('export default {', `export default {${JSON.stringify(missing).slice(1, -1)},`, 1);
fs.writeFileSync(chunkPath, dictionary);

const marker = 'RIO_NEIGHBORHOOD_DEPTH_V3';
for (const [slug, paragraphs] of Object.entries(entries)) {
  const file = path.join(root, 'barrios', slug, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  const block = `<!-- ${marker} --><article class="bh-card" data-rio-neighborhood-v3><h2>${heading[0]}</h2>${paragraphs.map((p) => `<p>${p[0]}</p>`).join('')}<p><a href="../../transportes/">${transportLink[0]}</a></p></article><!-- /${marker} -->`;
  const existing = new RegExp(`<!-- ${marker} -->[\\s\\S]*?<!-- \\/${marker} -->`);
  if (existing.test(html)) html = html.replace(existing, block);
  else html = html.replace('<p class="bh-source-note">', `${block}<p class="bh-source-note">`);
  fs.writeFileSync(file, html);
  console.log(`Neighborhood depth: /barrios/${slug}/`);
}
