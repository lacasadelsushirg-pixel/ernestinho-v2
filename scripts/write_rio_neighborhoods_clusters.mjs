// Deepen existing Rio neighborhood overview pages without changing their layout or photos.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const heading = ['Para que el día fluya', 'Para o dia render melhor', 'Make the day flow'];
const entries = {
  'barra-oeste': [
    [
      'Barra, Recreio y los barrios de Guaratiba no son una sola zona para recorrer a pie. Define si quieres playa urbana, naturaleza o una comida como centro del día y agrupa alrededor de esa decisión. Si mezclas sectores, confirma los accesos y el transporte entre cada parada antes de salir.',
      'Barra, Recreio e os bairros de Guaratiba não formam uma única área para percorrer a pé. Defina se o foco será praia urbana, natureza ou uma refeição e agrupe os passeios em torno dessa escolha. Se combinar trechos diferentes, confira acessos e transporte entre cada parada antes de sair.',
      'Barra, Recreio and the Guaratiba neighbourhoods are not one area to explore on foot. Decide whether an urban beach, nature or a meal is the focus, then group nearby stops around that choice. If you combine different sectors, check access and transport between each stop before setting out.',
    ],
    [
      'Para un día de playa, decide dónde terminarás y deja margen para cambiarte y volver. Para una salida de naturaleza, verifica condiciones y reglas con fuentes oficiales; una ruta que parece corta puede exigir preparación. Con niños o personas que caminan menos, revisa sombra, superficies y distancia real entre el punto de llegada y el lugar elegido.',
      'Para um dia de praia, decida onde pretende terminar e reserve tempo para se trocar e voltar. Para um passeio de natureza, confira condições e regras em fontes oficiais; um percurso que parece curto pode exigir preparo. Com crianças ou pessoas que caminham menos, verifique sombra, piso e distância real entre o desembarque e o local escolhido.',
      'For a beach day, decide where you want to finish and allow time to change and return. For a nature outing, check conditions and rules with official sources; a route that looks short may require preparation. With children or slower walkers, check shade, surfaces and the real distance from the arrival point to your destination.',
    ],
  ],
  'botafogo-urca': [
    [
      'Botafogo y Urca combinan bien si eliges el ritmo de cada tramo: vida urbana y restaurantes en Botafogo; bahía, paseo y pausa en Urca. No los planifiques como si todo quedara junto. Elige un punto principal en cada barrio y comprueba el trayecto entre ambos, sobre todo si el grupo tiene horarios o energía distintos.',
      'Botafogo e Urca combinam bem quando você escolhe o ritmo de cada trecho: vida urbana e restaurantes em Botafogo; baía, caminhada e pausa na Urca. Não planeje como se tudo ficasse ao lado. Escolha um ponto principal em cada bairro e confira o trajeto entre eles, especialmente se o grupo tiver horários ou disposição diferentes.',
      'Botafogo and Urca work well together when you plan for each neighbourhood’s pace: urban life and restaurants in Botafogo; the bay, a walk and a pause in Urca. Do not plan as if everything were next door. Choose one main stop in each and check the journey between them, especially if your group has different schedules or energy levels.',
    ],
    [
      'Si quieres subir al Pão de Açúcar o visitar un espacio con entrada, confirma operación, acceso y horario directamente antes de salir. Urca puede ser una visita tranquila sin sumar otra atracción. Para volver de noche, acuerda antes el punto de recogida y usa direcciones concretas; el nombre del barrio no alcanza para ubicarte.',
      'Se quiser subir ao Pão de Açúcar ou visitar um espaço com ingresso, confirme funcionamento, acesso e horário diretamente antes de sair. A Urca pode ser um passeio tranquilo sem incluir outra atração. Para voltar à noite, combine antes o ponto de embarque e use endereços exatos; o nome do bairro não basta para localizar você.',
      'If you plan to visit Sugarloaf or a ticketed venue, confirm operations, access and timing directly before leaving. Urca can be a relaxed visit without adding another attraction. For a night return, agree on a pickup point and use exact addresses; the neighbourhood name alone is not enough to find you.',
    ],
  ],
  'centro-maua': [
    [
      'Centro y Praça Mauá se entienden mejor por sectores: calles históricas y edificios cívicos por un lado; museos y frente portuario por otro. Elige primero el lugar que más te interesa y confirma su apertura, luego suma una caminata cercana. Así evitas cruzar la zona varias veces o llegar cuando el espacio está cerrado.',
      'Centro e Praça Mauá ficam mais fáceis de conhecer por trechos: ruas históricas e edifícios cívicos de um lado; museus e frente portuária de outro. Escolha primeiro o lugar que mais interessa e confirme o funcionamento; depois inclua uma caminhada próxima. Assim você evita cruzar a região várias vezes ou chegar quando o espaço estiver fechado.',
      'Downtown and Praça Mauá are easier to explore by area: historic streets and civic buildings on one side; museums and the waterfront on the other. Choose the place you most want to visit and check its opening details, then add a nearby walk. This avoids crossing the district repeatedly or arriving when a venue is closed.',
    ],
    [
      'Reserva más tiempo si quieres entrar a un museo o hacer una visita guiada. Para combinar con Lapa, Santa Teresa o la Zona Sul, revisa el último tramo y la vuelta antes de alargar el día. En fines de semana, eventos o lluvia, vuelve a comprobar accesos y programación directamente con cada espacio.',
      'Reserve mais tempo se quiser entrar em um museu ou fazer uma visita guiada. Para combinar com Lapa, Santa Teresa ou Zona Sul, confira o último trecho e a volta antes de estender o dia. Em fins de semana, eventos ou chuva, verifique novamente acessos e programação diretamente com cada espaço.',
      'Allow extra time if you want to enter a museum or join a guided visit. Before extending the day to Lapa, Santa Teresa or the South Zone, check the final leg and return. On weekends, event days or rainy days, confirm access and programming directly with each venue.',
    ],
  ],
  'flamengo-gloria': [
    [
      'Flamengo y Glória funcionan como paseo al aire libre cuando el tiempo acompaña, pero conviene separar el parque, las plazas y las visitas interiores. Escoge un tramo y una pausa concreta; no des por hecho que todo el corredor del Aterro estará cómodo para cualquier integrante del grupo. Con calor o lluvia, acorta la caminata y busca una alternativa bajo techo.',
      'Flamengo e Glória funcionam como passeio ao ar livre quando o tempo ajuda, mas vale separar parque, praças e visitas internas. Escolha um trecho e uma pausa específica; não presuma que todo o Aterro será confortável para qualquer pessoa do grupo. Com calor ou chuva, encurte a caminhada e escolha uma alternativa coberta.',
      'Flamengo and Glória make an outdoor outing when the weather cooperates, but plan the park, squares and indoor visits separately. Choose a stretch and a specific rest stop; do not assume the whole Aterro will be comfortable for everyone in your group. In heat or rain, shorten the walk and choose an indoor alternative.',
    ],
    [
      'Si quieres entrar a un museo, iglesia o espacio cultural, confirma horarios y acceso con la institución. Para caminar al atardecer o de noche, define la ruta y el regreso de antemano y quédate en áreas con movimiento. En familia, acuerda un punto de encuentro fácil de reconocer antes de empezar.',
      'Se quiser entrar em museu, igreja ou espaço cultural, confirme horários e acesso com a instituição. Para caminhar no fim da tarde ou à noite, defina o percurso e a volta antes e prefira áreas movimentadas. Em família, combine um ponto de encontro fácil de reconhecer antes de começar.',
      'If you plan to enter a museum, church or cultural venue, confirm opening details and access with the institution. For an evening walk, decide on the route and return in advance and stay in active areas. When visiting as a family, agree on an easy-to-recognise meeting point first.',
    ],
  ],
  'gavea-jardim-lagoa': [
    [
      'Gávea, Jardim Botânico y Lagoa tienen ritmos distintos aunque compartan el paisaje de la montaña y el agua. Elige si tu prioridad es jardín, parque, museo, comida o paseo junto a la laguna; después revisa cómo llegar al siguiente punto. No intentes cubrirlos todos a pie sin comprobar desniveles y distancias.',
      'Gávea, Jardim Botânico e Lagoa têm ritmos diferentes, embora compartilhem a paisagem de montanha e água. Escolha se a prioridade será jardim, parque, museu, refeição ou passeio junto à lagoa; depois confira como chegar ao próximo ponto. Não tente conhecer tudo a pé sem verificar desníveis e distâncias.',
      'Gávea, Jardim Botânico and Lagoa each have a different pace despite sharing mountain and water scenery. Decide whether your priority is a garden, park, museum, meal or lakeside walk, then check how to reach the next stop. Do not try to cover them all on foot without checking gradients and distances.',
    ],
    [
      'Las visitas con entrada o reglas propias requieren confirmación directa antes de salir. Para caminar junto a la Lagoa, define una distancia cómoda y un punto de regreso, en especial con niños o personas mayores. Si llueve, conserva una sola actividad interior como eje y evita depender de un paseo al aire libre.',
      'Visitas com ingresso ou regras próprias precisam ser confirmadas diretamente antes de sair. Para caminhar junto à Lagoa, defina uma distância confortável e um ponto de retorno, especialmente com crianças ou pessoas idosas. Se chover, mantenha uma atividade interna como eixo e não dependa de um passeio ao ar livre.',
      'Confirm directly before leaving for venues with tickets or specific visitor rules. For a walk by the lagoon, choose a comfortable distance and a return point, especially with children or older adults. If it rains, build the day around one indoor activity rather than relying on an outdoor walk.',
    ],
  ],
  'ipanema-leblon': [
    [
      'Ipanema y Leblon pueden ser una caminata larga, una tarde de playa o una salida para comer y mirar tiendas; son planes distintos. Decide dónde quieres empezar y terminar antes de recorrer la orla. Si el grupo no tiene el mismo ritmo, acuerda un punto de encuentro y deja abierta la opción de acortar el paseo.',
      'Ipanema e Leblon podem render uma caminhada longa, uma tarde de praia ou uma saída para comer e olhar lojas; são programas diferentes. Decida onde quer começar e terminar antes de percorrer a orla. Se o grupo tiver ritmos diferentes, combine um ponto de encontro e deixe aberta a opção de encurtar o passeio.',
      'Ipanema and Leblon can mean a long walk, an afternoon at the beach, or an outing for food and shops; these are different plans. Decide where you want to start and finish before walking the waterfront. If your group moves at different paces, agree on a meeting point and keep the option to shorten the walk.',
    ],
    [
      'Para ver el atardecer, llega con margen y no organices una reserva con horario ajustado justo después. Con calor, busca pausas y agua; con lluvia o mar agitado, cambia la playa por un plan urbano y revisa los avisos oficiales antes de entrar al agua. Para volver, elige el punto exacto de salida y no solo el nombre del barrio.',
      'Para ver o pôr do sol, chegue com tempo e não marque uma reserva apertada logo depois. Com calor, faça pausas e beba água; com chuva ou mar agitado, troque a praia por um programa urbano e confira os avisos oficiais antes de entrar na água. Para voltar, escolha o ponto exato de embarque, não apenas o nome do bairro.',
      'For sunset, arrive with time and avoid booking a tight appointment immediately afterwards. In heat, take breaks and drink water; in rain or rough seas, switch to an urban plan and check official notices before entering the water. For your return, choose an exact pickup point rather than only naming the neighbourhood.',
    ],
  ],
  'santa-lapa': [
    [
      'Santa Teresa y Lapa piden horarios distintos: las cuestas, miradores y talleres suelen encajar mejor de día; la música y los locales de Lapa pueden ser el plan de noche. Elige qué quieres priorizar y deja un margen para moverte entre las dos áreas. No organices una visita con hora marcada al final de una caminata sin revisar el trayecto.',
      'Santa Teresa e Lapa pedem horários diferentes: ladeiras, mirantes e ateliês costumam funcionar melhor de dia; música e casas da Lapa podem ser o programa da noite. Escolha o que quer priorizar e reserve tempo para circular entre as duas áreas. Não marque uma visita com hora certa logo após uma caminhada sem conferir o trajeto.',
      'Santa Teresa and Lapa call for different schedules: hills, viewpoints and studios usually fit better in the day; music and venues in Lapa can be a night plan. Choose your priority and allow time to travel between the two areas. Do not schedule a timed visit straight after a walk without checking the journey.',
    ],
    [
      'En una salida nocturna, confirma la programación con el local, guarda la dirección y acuerda la vuelta antes de empezar. Para un paseo familiar o cultural, verifica pendientes, entradas y descansos; con lluvia, el adoquín puede volverse incómodo. Si el grupo tiene movilidad limitada, pregunta por el acceso exacto antes de decidir.',
      'Para sair à noite, confirme a programação com a casa, salve o endereço e combine a volta antes de começar. Em um passeio cultural ou em família, confira ladeiras, ingressos e pausas; com chuva, o calçamento pode ficar desconfortável. Se alguém do grupo tiver mobilidade reduzida, pergunte sobre o acesso exato antes de decidir.',
      'For a night out, confirm the venue’s programme, save its address and arrange your return before you start. For a family or cultural visit, check hills, tickets and rest stops; cobblestones can be uncomfortable in rain. If anyone in your group has limited mobility, ask about exact access before deciding.',
    ],
  ],
  'zona-norte': [
    [
      'La Zona Norte no se visita como una sola atracción: elige un barrio y un motivo concreto, como un museo, un partido, una feria o una comida. Comprueba fechas y entradas directamente con el lugar, luego organiza el transporte desde y hacia esa dirección. Sumar paradas lejanas puede convertir una visita interesante en un día de traslados.',
      'A Zona Norte não é uma atração única: escolha um bairro e um motivo específico, como museu, jogo, feira ou refeição. Confira datas e ingressos diretamente com o local; depois organize o transporte de ida e volta para aquele endereço. Somar paradas distantes pode transformar uma visita interessante em um dia de deslocamentos.',
      'The North Zone is not one single attraction: choose a neighbourhood and a specific reason, such as a museum, match, fair or meal. Confirm dates and tickets directly with the venue, then plan transport to and from that address. Adding distant stops can turn an interesting visit into a day spent travelling.',
    ],
    [
      'En días de partido, feria o evento, revisa accesos y posibles cambios de circulación antes de salir. Si vuelves de noche, deja previsto el punto de recogida y viaja con la dirección exacta guardada. Para una primera visita, enfócate en una experiencia y deja otra zona para otro día: así tendrás tiempo para entender el barrio, no solo llegar y salir.',
      'Em dias de jogo, feira ou evento, confira acessos e possíveis mudanças na circulação antes de sair. Se voltar à noite, deixe definido o ponto de embarque e salve o endereço exato. Na primeira visita, foque em uma experiência e deixe outra região para outro dia: assim você terá tempo de conhecer o bairro, não apenas chegar e ir embora.',
      'On match, fair or event days, check access and possible traffic changes before leaving. If returning at night, decide on a pickup point and save the exact address. On a first visit, focus on one experience and save another area for a different day; this gives you time to understand the neighbourhood instead of only arriving and leaving.',
    ],
  ],
};

const phrases = { [heading[0]]: { PT: heading[1], EN: heading[2] } };
for (const paragraphs of Object.values(entries)) for (const p of paragraphs) phrases[p[0]] = { PT: p[1], EN: p[2] };
const chunkPath = path.join(root, 'assets/js/translations/chunks/barrios-02.js');
let dictionary = fs.readFileSync(chunkPath, 'utf8');
const missing = Object.fromEntries(Object.entries(phrases).filter(([key]) => !dictionary.includes(`${JSON.stringify(key)}:`)));
if (Object.keys(missing).length) dictionary = dictionary.replace('export default {', `export default {${JSON.stringify(missing).slice(1, -1)},`, 1);
fs.writeFileSync(chunkPath, dictionary);

const marker = 'RIO_NEIGHBORHOOD_DEPTH_V6';
for (const [slug, paragraphs] of Object.entries(entries)) {
  const file = path.join(root, 'barrios', slug, 'index.html');
  let page = fs.readFileSync(file, 'utf8');
  const cards = paragraphs.map((p) => `<article class="p"><h2>${heading[0]}</h2><p>${p[0]}</p></article>`).join('');
  const block = `<!-- ${marker} --><section class="b" data-rio-neighborhood-v6><div class="g">${cards}</div></section><!-- /${marker} -->`;
  const existing = new RegExp(`<!-- ${marker} -->[\\s\\S]*?<!-- \\/${marker} -->`);
  if (existing.test(page)) page = page.replace(existing, block);
  else page = page.replace('</main>', `${block}</main>`);
  fs.writeFileSync(file, page);
  console.log(`Neighborhood overview depth: /barrios/${slug}/`);
}
