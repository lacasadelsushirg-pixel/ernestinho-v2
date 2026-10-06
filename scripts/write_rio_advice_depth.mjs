// Add a single decision-focused note to existing Rio advice pages.
// This only appends a paragraph inside the current article; it does not alter imagery or layout.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const chunkPath = path.join(root, 'assets/js/translations/chunks/consejos-03.js');
const pages = [
  {
    route: '20-consejos',
    es: 'Yo elegiría tres prioridades para el viaje y dejaría el resto como opciones, no como tareas. Río es grande: si el plan obliga a cruzar la ciudad varias veces, agrupa por zona y protege tiempo para comer, descansar y volver. Antes de salir, confirma horarios y reservas directamente con cada lugar; para playa, sendero o evento, revisa también las condiciones del día. Un itinerario flexible suele rendir más que una lista imposible.',
    pt: 'Eu escolheria três prioridades para a viagem e deixaria o restante como opções, não como tarefas. O Rio é grande: se o plano exige atravessar a cidade várias vezes, agrupe por região e reserve tempo para comer, descansar e voltar. Antes de sair, confirme horários e reservas diretamente com cada lugar; para praia, trilha ou evento, confira também as condições do dia. Um roteiro flexível costuma render mais do que uma lista impossível.',
    en: 'I would choose three priorities for the trip and keep everything else as options, not obligations. Rio is large: if a plan sends you across the city several times, group stops by area and protect time to eat, rest and get back. Before setting out, confirm hours and bookings directly with each venue; for a beach, trail or event, check the day’s conditions too. A flexible itinerary usually works better than an impossible checklist.'
  },
  {
    route: 'errores-rio',
    es: 'El mapa mide calles, no siempre el tiempo real: tráfico, pendientes, accesos y conexiones pueden convertir dos puntos cercanos en un traslado lento. Yo comprobaría el trayecto completo y su vuelta antes de reservar una actividad, sobre todo al final del día. Guarda la dirección exacta del lugar y un punto de encuentro claro; el nombre del barrio por sí solo no siempre ayuda al conductor ni a tu grupo.',
    pt: 'O mapa mostra ruas, mas nem sempre o tempo real: trânsito, ladeiras, acessos e conexões podem transformar dois pontos próximos em um deslocamento demorado. Eu verificaria o trajeto completo e a volta antes de reservar uma atividade, principalmente no fim do dia. Salve o endereço exato e combine um ponto de encontro claro; o nome do bairro, sozinho, nem sempre ajuda o motorista ou o grupo.',
    en: 'A map shows streets, not always real travel time: traffic, hills, access points and connections can make two nearby places a slow journey apart. I would check the full route and return before booking an activity, especially late in the day. Save the exact address and agree on a clear meeting point; the neighbourhood name alone may not help your driver or group.'
  },
  {
    route: 'lluvia',
    es: 'Yo decidiría el plan según la intensidad, no sólo porque empezó a llover. Con lluvia ligera puedes mantener un paseo corto entre lugares cercanos; con tormenta, rayos, inundaciones o alertas oficiales, deja los miradores, senderos y la playa para otro día. Elige una actividad cubierta cerca de donde ya estás, confirma que abra y reserva margen para el transporte: un día lluvioso también puede ralentizar los cruces entre zonas.',
    pt: 'Eu decidiria o plano pela intensidade, não apenas porque começou a chover. Com chuva fraca, dá para manter um passeio curto entre lugares próximos; com temporal, raios, alagamentos ou alertas oficiais, deixe mirantes, trilhas e praia para outro dia. Escolha uma atividade coberta perto de onde você já está, confirme se estará aberta e reserve tempo para o transporte: um dia chuvoso também pode atrasar os deslocamentos entre regiões.',
    en: 'I would decide based on the intensity, not simply because rain has started. In light rain, a short outing between nearby places may still work; with a storm, lightning, flooding or official alerts, save viewpoints, trails and the beach for another day. Choose an indoor activity near where you already are, check that it is open and allow extra travel time: rainy weather can slow journeys across town too.'
  },
  {
    route: 'maletas-rio',
    es: 'Yo preparo la maleta por capas y por planes: ropa fresca, una prenda ligera para interiores con aire acondicionado, algo para lluvia y calzado que puedas usar muchas horas. Separa traje de baño y una bolsa para guardar lo mojado; lleva sólo los medicamentos que usas y conserva sus envases o indicaciones. Deja espacio para una muda en el equipaje de mano por si la valija demora, y revisa límites de peso antes de salir.',
    pt: 'Eu preparo a mala por camadas e por tipo de passeio: roupa fresca, uma peça leve para ambientes com ar-condicionado, algo para chuva e calçado confortável para muitas horas. Separe roupa de banho e uma sacola para guardar peças molhadas; leve apenas os medicamentos que você usa, com embalagens ou orientações. Deixe uma troca de roupa na bagagem de mão caso a mala atrase e confira os limites de peso antes de sair.',
    en: 'I pack in layers and for different plans: light clothes, one extra layer for air-conditioned interiors, something for rain and shoes you can wear for hours. Separate swimwear and a bag for wet items; bring only the medicines you use, with their packaging or instructions. Keep a change of clothes in your carry-on in case checked luggage is delayed, and check weight limits before leaving.'
  },
  {
    route: 'perfiles-viajero',
    es: 'No elijas el itinerario sólo por lo que aparece en una lista de “imperdibles”. Yo empezaría por el ritmo del grupo, la movilidad, el presupuesto y cuánto calor tolera cada persona; luego escogería una o dos actividades principales por día. Si viajan juntos perfiles distintos, alterna una visita intensa con una pausa sencilla y acuerda de antemano dónde reunirse si alguien prefiere descansar.',
    pt: 'Não escolha o roteiro apenas pelo que aparece em uma lista de “imperdíveis”. Eu começaria pelo ritmo do grupo, mobilidade, orçamento e quanto calor cada pessoa tolera; depois escolheria uma ou duas atividades principais por dia. Se houver perfis diferentes, alterne uma visita intensa com uma pausa simples e combine antes onde se encontrar caso alguém prefira descansar.',
    en: 'Do not choose an itinerary only by what appears on a “must-see” list. I would start with the group’s pace, mobility, budget and heat tolerance, then choose one or two main activities per day. If people in your group travel differently, alternate an intense visit with an easy break and agree in advance where to meet if someone would rather rest.'
  },
  {
    route: 'portugues',
    es: 'No necesitas hablar perfecto para resolver lo cotidiano. Yo guardaría en el teléfono la dirección del alojamiento, el nombre del destino y frases simples como “Pode repetir mais devagar, por favor?” y “Quanto custa?”. En un restaurante, confirma qué incluye el precio; en un taxi o aplicación, verifica destino y vehículo antes de subir. Hablar con calma, mostrar el texto y pedir que repitan suele evitar más confusiones que traducir palabra por palabra.',
    pt: 'Você não precisa falar perfeitamente para resolver o dia a dia. Eu salvaria no celular o endereço da hospedagem, o nome do destino e frases simples como “Pode repetir mais devagar, por favor?” e “Quanto custa?”. No restaurante, confirme o que está incluído no preço; no táxi ou aplicativo, confira destino e veículo antes de entrar. Falar com calma, mostrar o texto e pedir que repitam costuma evitar mais confusão do que traduzir palavra por palavra.',
    en: 'You do not need perfect Portuguese to handle everyday situations. I would save your accommodation address, destination name and simple phrases such as “Could you repeat that more slowly, please?” and “How much does it cost?” On a restaurant bill, confirm what the price includes; before getting into a taxi or app ride, check the destination and vehicle. Speaking calmly, showing the text and asking someone to repeat it often works better than translating word for word.'
  },
  {
    route: 'que-hacer-cada-dia',
    es: 'Antes de fijar un museo, feria, partido o espectáculo en un día concreto, mira su calendario oficial: cierres semanales, feriados y programación especial pueden cambiar el plan. Yo organizaría primero la actividad que depende de una hora y completaría el resto con lugares cercanos que permitan entrar o salir con flexibilidad. Así evitas pagar un traslado largo para encontrar una puerta cerrada o llegar tarde a una reserva.',
    pt: 'Antes de marcar museu, feira, jogo ou espetáculo em um dia específico, consulte o calendário oficial: fechamentos semanais, feriados e programação especial podem mudar o plano. Eu organizaria primeiro a atividade com horário marcado e completaria o restante com lugares próximos, onde seja possível entrar ou sair com flexibilidade. Assim você evita pagar um deslocamento longo e encontrar a porta fechada ou chegar atrasado a uma reserva.',
    en: 'Before scheduling a museum, market, match or show on a particular day, check its official calendar: weekly closures, holidays and special programming can change your plan. I would organize the time-specific activity first, then fill the day with nearby places where you can come and go flexibly. That helps you avoid a long, costly ride to a closed door or arriving late for a booking.'
  },
  {
    route: 'recorrido-zona-portuaria',
    es: 'La Zona Portuaria y el Centro se disfrutan mejor con un orden corto y entradas confirmadas. Yo escogería primero el museo o sitio histórico que más te interesa, revisaría su apertura y sumaría una caminata próxima; no hace falta cruzar todo el Centro para completar una ruta. En días de calor, lluvia o evento, acorta el tramo y ten identificado dónde tomar el transporte de regreso antes de alejarte del último punto.',
    pt: 'A Zona Portuária e o Centro ficam mais agradáveis com uma sequência curta e visitas confirmadas. Eu escolheria primeiro o museu ou lugar histórico que mais interessa, verificaria o funcionamento e incluiria uma caminhada próxima; não é preciso cruzar todo o Centro para completar um roteiro. Em dias de calor, chuva ou evento, encurte o percurso e identifique onde pegar o transporte de volta antes de sair do último ponto.',
    en: 'The Port Zone and downtown are easier to enjoy in a short sequence with visits confirmed. I would choose the museum or historic site you most want to see, check that it is open and add a nearby walk; you do not need to cross all of downtown to make a route feel complete. In heat, rain or on event days, shorten the walk and identify your return transport before leaving the final stop.'
  },
  {
    route: 'rio-1-a-7-dias',
    es: 'Con pocos días, yo priorizaría una experiencia principal por jornada y agruparía el resto por cercanía. Reserva espacio para clima, cansancio y traslados: si llegas por primera vez, no conviertas el día de llegada ni el de salida en una carrera entre barrios. Para siete días, combina costa, Centro, naturaleza y vida local; para uno o dos, elige lo que realmente te interesa y deja lo demás para un próximo viaje.',
    pt: 'Com poucos dias, eu priorizaria uma experiência principal por jornada e agruparia o restante pela proximidade. Reserve espaço para clima, cansaço e deslocamentos: se é sua primeira visita, não transforme o dia de chegada nem o de partida em uma corrida entre bairros. Em sete dias, combine litoral, Centro, natureza e vida local; em um ou dois, escolha o que realmente interessa e deixe o restante para uma próxima viagem.',
    en: 'With limited time, I would make one experience the focus of each day and group other stops nearby. Leave room for weather, tiredness and travel: on a first visit, do not turn arrival or departure day into a race across neighbourhoods. Over seven days, mix the coast, downtown, nature and local life; with one or two days, choose what matters most to you and save the rest for another trip.'
  },
  {
    route: 'sol-calor',
    es: 'En días calurosos, elige el paseo por la hora y por la sombra disponible, no sólo por la foto del atardecer. Yo llevaría agua, protección solar y una pausa bajo techo, y evitaría una caminata exigente en las horas de mayor calor. Si alguien siente mareo, debilidad o náuseas, detengan el paseo, busquen un lugar fresco y pidan ayuda si no mejora. La puesta de sol no compensa forzar al grupo.',
    pt: 'Em dias quentes, escolha o passeio pelo horário e pela sombra disponível, não apenas pela foto do pôr do sol. Eu levaria água, proteção solar e planejaria uma pausa em local coberto, evitando caminhada exigente nas horas mais quentes. Se alguém sentir tontura, fraqueza ou enjoo, interrompa o passeio, procure um lugar fresco e peça ajuda se não melhorar. O pôr do sol não vale forçar o grupo.',
    en: 'On hot days, choose an outing around the time and shade available, not just the sunset photo. I would bring water and sun protection, plan an indoor break and avoid strenuous walks during the hottest hours. If anyone feels dizzy, weak or nauseated, stop, find a cool place and seek help if they do not improve. A sunset is not worth pushing the group too hard.'
  },
  {
    route: 'souvenirs',
    es: 'Yo buscaría un recuerdo que puedas explicar cuando vuelvas: una pieza de artista local, un libro, una ilustración o un producto de una cooperativa cuentan más que un objeto genérico. Pregunta quién lo hizo, confirma el precio final y guarda el recibo si el valor lo amerita. Evita llevar conchas, plantas, animales, piezas arqueológicas o cualquier elemento retirado de un área natural o patrimonial.',
    pt: 'Eu escolheria uma lembrança que você consiga contar quando voltar: uma peça de artista local, um livro, uma ilustração ou um produto de cooperativa dizem mais do que um objeto genérico. Pergunte quem fez, confirme o preço final e guarde o recibo se o valor justificar. Evite levar conchas, plantas, animais, peças arqueológicas ou qualquer elemento retirado de área natural ou patrimonial.',
    en: 'I would choose a souvenir with a story you can tell when you get home: work by a local artist, a book, an illustration or a cooperative product says more than a generic object. Ask who made it, confirm the final price and keep a receipt when it is worthwhile. Do not take shells, plants, animals, archaeological objects or anything removed from a natural or heritage site.'
  },
  {
    route: 'supermercados',
    es: 'En el súper yo compararía el precio por kilo o litro, no sólo el tamaño del envase, y revisaría fecha, conservación y etiquetas si tienes alergias o restricciones. Algunos productos y marcas son distintos a los de casa; pregunta antes de abrir algo o asumir que está listo para comer. Si vas a cocinar, confirma qué utensilios tiene el alojamiento y dónde comprar agua y básicos cerca para no cargar bolsas por media ciudad.',
    pt: 'No supermercado, eu compararia o preço por quilo ou litro, não apenas o tamanho da embalagem, e conferiria validade, conservação e rótulos em caso de alergias ou restrições. Alguns produtos e marcas são diferentes dos de casa; pergunte antes de abrir algo ou presumir que está pronto para consumo. Se for cozinhar, confirme quais utensílios há na hospedagem e onde comprar água e itens básicos por perto para não carregar sacolas pela cidade.',
    en: 'At a supermarket, I would compare the price per kilogram or litre, not just package size, and check dates, storage and labels if you have allergies or dietary restrictions. Products and brands may differ from home; ask before opening something or assuming it is ready to eat. If you plan to cook, confirm what equipment your accommodation provides and where to buy water and basics nearby so you do not carry bags across town.'
  },
  {
    route: 'trampas-turista',
    es: 'Mi regla sencilla: acuerda el precio y lo que incluye antes de aceptar un servicio, mira el menú con valores y usa canales de transporte que te permitan identificar conductor y destino. Si una oferta te apura o cambia las condiciones en el último momento, puedes decir que no y retirarte con calma. Guarda mensajes y comprobantes si surge un cobro discutido; ante un riesgo inmediato, busca un local atendido o llama a emergencias.',
    pt: 'Minha regra é simples: combine preço e o que está incluído antes de aceitar um serviço, confira o cardápio com valores e use meios de transporte que permitam identificar motorista e destino. Se uma oferta pressionar você ou mudar as condições na última hora, pode recusar e sair com calma. Guarde mensagens e comprovantes se houver cobrança contestada; diante de risco imediato, procure um local com atendimento ou ligue para a emergência.',
    en: 'My simple rule: agree on the price and what is included before accepting a service, check menus with prices, and use transport options that let you identify the driver and destination. If an offer pressures you or changes its terms at the last moment, you can decline and walk away calmly. Keep messages and receipts if a charge is disputed; if you are in immediate danger, go to a staffed place or call emergency services.'
  }
];

let translations = fs.readFileSync(chunkPath, 'utf8');
const missing = pages.filter(({es}) => !translations.includes(`${JSON.stringify(es)}: {`));
const insertion = missing.map(({es, pt, en}) => `  ${JSON.stringify(es)}: {\n    "PT": ${JSON.stringify(pt)},\n    "EN": ${JSON.stringify(en)}\n  },`).join('\n');
const end = translations.lastIndexOf('};');
if (end < 0 || translations.slice(end + 2).trim()) throw new Error('Unexpected consejos-03.js format');
for (const page of pages) {
  const file = path.join(root, 'consejos', page.route, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes(`>${page.es}</p>`)) { console.log(`Already present /consejos/${page.route}/`); continue; }
  const endArticle = html.lastIndexOf('</article>');
  if (endArticle < 0 || html.indexOf('<main') > endArticle) throw new Error(`Safe article end not found: ${page.route}`);
  html = html.slice(0, endArticle) + `<p>${page.es}</p>` + html.slice(endArticle);
  fs.writeFileSync(file, html);
  console.log(`Updated /consejos/${page.route}/`);
}
if (insertion) {
  const before = translations.slice(0, end).trimEnd();
  translations = before + (before.endsWith('}') ? ',' : '') + '\n' + insertion + '\n' + translations.slice(end);
  fs.writeFileSync(chunkPath, translations);
}
console.log(`Advice content prepared for ${pages.length} ES/PT/EN routes.`);
