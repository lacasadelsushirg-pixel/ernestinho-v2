// Add one practical, route-specific paragraph to each existing Rio nature page.
// Keep each page's layout, gallery, metadata, and original copy intact.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const chunkPath = path.join(root, 'assets/js/translations/chunks/naturaleza-02.js');
const pages = [
  {
    route: 'bico-papagaio',
    es: 'Yo reservaría esta caminata para un día seco y empezaría temprano desde el sector Floresta: forma parte de una travesía más larga, así que no confundas el tiempo hasta el mirador con el recorrido completo. Lleva agua, calzado con agarre y el mapa descargado; con lluvia, barro y roca húmeda cambian mucho el esfuerzo. Confirma los accesos y avisos del Parque Nacional da Tijuca antes de salir, y deja acordado cómo vuelves al mismo punto.',
    pt: 'Eu deixaria esta caminhada para um dia seco e começaria cedo pelo setor Floresta: ela faz parte de uma travessia mais longa, então não confunda o tempo até o mirante com o percurso completo. Leve água, calçado com boa aderência e o mapa baixado; com chuva, lama e pedra molhada o esforço muda bastante. Confira acessos e avisos do Parque Nacional da Tijuca antes de sair e combine como voltar ao mesmo ponto.',
    en: 'I would save this walk for a dry day and start early from the Forest sector: it belongs to a longer traverse, so do not confuse the time to the viewpoint with the full route. Bring water, grippy footwear and an offline map; rain, mud and wet rock change the effort considerably. Check Tijuca National Park access and notices before setting out, and plan how you will return to the same trailhead.'
  },
  {
    route: 'catacumba',
    es: 'Para empezar, elige un solo sendero y sube a tu ritmo: aunque el parque está junto a la Lagoa, los accesos a los miradores tienen pendiente y escalones, no son un paseo llano para silla de ruedas o cochecito. Con niños, mantente en el camino señalizado y acuerda una pausa antes del ascenso. Comprueba la apertura del parque ese día; lleva agua y evita las horas de más calor, porque la sombra no cubre todos los tramos.',
    pt: 'Para começar, escolha uma trilha e suba no seu ritmo: embora o parque fique junto à Lagoa, os acessos aos mirantes têm inclinação e degraus; não é um passeio plano para cadeira de rodas ou carrinho de bebê. Com crianças, permaneça no caminho sinalizado e combine uma pausa antes da subida. Confira se o parque está aberto naquele dia; leve água e evite o horário mais quente, pois nem todos os trechos têm sombra.',
    en: 'For a first visit, choose one trail and climb at your own pace: although the park sits beside the lagoon, routes to the viewpoints include slopes and steps, so they are not flat paths for wheelchairs or pushchairs. With children, stay on the marked path and plan a break before the climb. Check that the park is open that day; bring water and avoid the hottest hours, as shade does not cover every section.'
  },
  {
    route: 'circuito-grutas',
    es: 'Yo no entraría en las grutas ni tomaría atajos fuera del sendero para acortar el paseo: el suelo húmedo y las piedras sueltas pueden volver resbaladizo un tramo que parecía fácil. Sal temprano, usa calzado cerrado con suela adherente y lleva agua; la cobertura de teléfono puede fallar dentro de la floresta, así que descarga el recorrido y avisa a alguien de tu plan. Si llueve fuerte o hay tormenta, cambia por una visita urbana bajo techo.',
    pt: 'Eu não entraria nas grutas nem pegaria atalhos fora da trilha para encurtar o passeio: o chão úmido e as pedras soltas podem deixar escorregadio um trecho que parecia fácil. Saia cedo, use calçado fechado com sola aderente e leve água; o sinal de celular pode falhar dentro da floresta, então baixe o percurso e avise alguém sobre seu plano. Com chuva forte ou trovoadas, prefira uma atração urbana coberta.',
    en: 'I would not enter caves or take shortcuts off the trail to shorten the walk: damp ground and loose stones can make an apparently easy section slippery. Start early, wear closed shoes with good grip and bring water; phone coverage can fail in the forest, so download the route and tell someone your plan. If heavy rain or a storm is forecast, switch to an indoor city visit.'
  },
  {
    route: 'dois-irmaos-trek',
    es: 'El acceso empieza en Vidigal, así que confirma antes el punto de entrada, el transporte local y cómo bajar al terminar; no cuentes con encontrar un vehículo disponible al instante. Si eliges el amanecer, organiza también el traslado de madrugada y el regreso con luz. La subida tiene tramos empinados y exposición al sol: lleva agua, protección solar y una capa ligera, y hazla con acompañamiento local responsable si no conoces el acceso.',
    pt: 'O acesso começa no Vidigal, então confirme antes o ponto de entrada, o transporte local e como descer ao terminar; não conte com encontrar um veículo disponível na hora. Se escolher o nascer do sol, organize também o deslocamento de madrugada e a volta ainda com luz. A subida tem trechos íngremes e exposição ao sol: leve água, proteção solar e uma camada leve; se não conhece o acesso, faça o passeio com acompanhamento local responsável.',
    en: 'Access begins in Vidigal, so confirm the entrance point, local transport and your way down before you go; do not assume a vehicle will be available immediately. For a sunrise walk, arrange the pre-dawn ride and a return in daylight too. The climb has steep, sun-exposed sections: bring water, sun protection and a light layer, and use responsible local guidance if you do not know the access route.'
  },
  {
    route: 'parque-flamengo',
    es: 'Aquí puedes ajustar el paseo a tu energía: escoge un tramo junto a la bahía en vez de intentar recorrer todo el parque a pie o en bicicleta. El sol pega fuerte en áreas abiertas y la sombra cambia a lo largo del recorrido; lleva agua y acuerda un punto de salida fácil de identificar. Si vas con niños, cochecito o alguien con movilidad limitada, prioriza los caminos pavimentados y confirma qué sectores están abiertos antes de desplazarte.',
    pt: 'Aqui você pode ajustar o passeio à sua disposição: escolha um trecho junto à baía em vez de tentar percorrer todo o parque a pé ou de bicicleta. O sol é forte nas áreas abertas e a sombra varia ao longo do caminho; leve água e combine um ponto de saída fácil de identificar. Com crianças, carrinho de bebê ou alguém com mobilidade reduzida, priorize os caminhos pavimentados e confira quais setores estão abertos antes de ir.',
    en: 'You can match this outing to your energy: choose one stretch beside the bay instead of trying to cover the whole park on foot or by bike. Sun exposure is strong in open areas and shade varies along the route; carry water and agree on an easy-to-find exit point. With children, a pushchair or anyone with limited mobility, favour paved paths and check which sections are open before travelling.'
  },
  {
    route: 'pedra-bonita-trek',
    es: 'La caminata es más corta que Pedra da Gávea, pero la subida sigue siendo empinada. Yo comprobaría el acceso por Estrada das Canoas, el estado del sendero y el regreso antes de pedir un vehículo: la recogida al final no siempre coincide con el punto de inicio. Lleva agua, gorra y calzado con agarre; con lluvia o roca mojada, pospón la subida. No salgas tarde: reserva margen para bajar antes de que oscurezca.',
    pt: 'A caminhada é mais curta que a da Pedra da Gávea, mas a subida continua íngreme. Eu verificaria o acesso pela Estrada das Canoas, as condições da trilha e a volta antes de pedir um carro: o embarque na saída nem sempre coincide com o ponto de início. Leve água, boné e calçado com aderência; com chuva ou pedra molhada, adie a subida. Não saia tarde: reserve tempo para descer antes de escurecer.',
    en: 'This hike is shorter than Pedra da Gávea, but the climb is still steep. I would check access via Estrada das Canoas, trail conditions and the return plan before ordering a ride: pickup at the end may not be at the starting point. Bring water, a hat and grippy footwear; postpone the climb in rain or on wet rock. Do not start late—allow time to descend before dark.'
  },
  {
    route: 'pedra-gavea-trek',
    es: 'Esta no es una subida para improvisar: la Carrasqueira exige exposición y una progresión técnica, y el cansancio pesa tanto al bajar como al subir. Mantén la recomendación de guía profesional y equipo apropiado; si el clima cambia, hay roca mojada o alguien del grupo duda, da la vuelta antes del paso expuesto. Sal con margen de luz, agua y comida, y deja confirmados el acceso y el transporte de regreso.',
    pt: 'Esta não é uma subida para improvisar: a Carrasqueira exige exposição e progressão técnica, e o cansaço pesa tanto na descida quanto na subida. Siga a recomendação de guia profissional e equipamento adequado; se o tempo mudar, a pedra estiver molhada ou alguém do grupo tiver dúvida, volte antes do trecho exposto. Saia com margem de luz, água e comida, e confirme acesso e transporte de retorno.',
    en: 'This is not a climb to improvise: the Carrasqueira involves exposure and technical scrambling, and fatigue matters on the descent as much as on the way up. Follow the recommendation for a professional guide and suitable equipment; if weather changes, rock is wet or anyone in the group is unsure, turn back before the exposed section. Start with daylight to spare, bring water and food, and confirm access and return transport.'
  },
  {
    route: 'pico-tijuca',
    es: 'El Pico está dentro del sector Floresta del Parque Nacional da Tijuca; organiza la salida desde un acceso confirmado y no mezcles en el mismo plan otro sector distante del parque. La ruta completa requiere más tiempo y energía que el tramo final a la cima. Lleva agua, algo de comida y el mapa fuera de línea; después de lluvia revisa avisos oficiales y evita continuar si el sendero está resbaladizo. Calcula la bajada con luz de día.',
    pt: 'O Pico fica no setor Floresta do Parque Nacional da Tijuca; organize a saída por um acesso confirmado e não misture no mesmo roteiro outro setor distante do parque. O percurso completo exige mais tempo e energia do que o trecho final até o cume. Leve água, algo para comer e o mapa offline; depois da chuva, confira os avisos oficiais e não continue se a trilha estiver escorregadia. Planeje a descida ainda com luz do dia.',
    en: 'The summit lies in the Forest sector of Tijuca National Park; plan from a confirmed entrance and do not combine it with a distant park sector in the same outing. The full route takes more time and energy than the final stretch to the summit. Bring water, a snack and an offline map; after rain, check official notices and avoid continuing if the trail is slippery. Plan to descend in daylight.'
  },
  {
    route: 'pontal',
    es: 'Es una subida breve, no un paseo plano: hay pendiente y roca irregular, por lo que no la recomendaría con cochecito, movilidad reducida o calzado abierto. Ve con luz, lleva agua y baja por el mismo acceso sin correr para buscar una foto. Si llovió, espera a que las piedras estén secas; con niños, acompaña cada paso y mantente lejos de bordes. Confirma el transporte de salida en Recreio antes de empezar.',
    pt: 'É uma subida curta, não um passeio plano: há inclinação e pedra irregular, por isso não recomendo com carrinho de bebê, mobilidade reduzida ou calçado aberto. Vá com luz, leve água e desça pelo mesmo acesso sem correr atrás de uma foto. Se choveu, espere as pedras secarem; com crianças, acompanhe cada passo e mantenha distância das bordas. Confirme o transporte de saída no Recreio antes de começar.',
    en: 'It is a short climb, not a flat stroll: the slope and uneven rock make it unsuitable for pushchairs, limited mobility or open footwear. Go in daylight, bring water and descend by the same access without rushing for a photo. If it has rained, wait for the rocks to dry; stay close to children and well back from edges. Confirm your ride out of Recreio before starting.'
  },
  {
    route: 'primatas',
    es: 'La cascada está en un entorno de bosque y el tramo puede cambiar mucho después de la lluvia: raíces, barro y piedra mojada vuelven delicada la bajada. Usa calzado cerrado, lleva agua y empieza temprano para regresar con luz; no dependas de tener señal de teléfono. Respeta el cauce, no uses jabón ni dejes residuos, y si el agua baja con fuerza o hay tormenta, no te acerques y elige otro paseo.',
    pt: 'A cachoeira fica em ambiente de floresta e o trecho pode mudar bastante depois da chuva: raízes, lama e pedra molhada deixam a descida delicada. Use calçado fechado, leve água e comece cedo para voltar com luz; não dependa do sinal de celular. Respeite o curso d’água, não use sabão nem deixe resíduos; se a água estiver forte ou houver trovoada, não se aproxime e escolha outro passeio.',
    en: 'The waterfall sits in a forest setting, and the route can change considerably after rain: roots, mud and wet rock make the descent delicate. Wear closed shoes, bring water and start early to return in daylight; do not rely on phone coverage. Respect the watercourse, use no soap and leave no waste. If water is running strongly or a storm is near, stay away and choose another outing.'
  },
  {
    route: 'telegrafo-trek',
    es: 'La caminata queda en el extremo oeste y la foto famosa puede implicar espera; cuenta con esa cola al organizar la vuelta y acuerda un punto de recogida concreto. En la cima, quédate sobre roca estable y lejos del borde: el efecto de algunas imágenes depende del ángulo, no de asomarse. Lleva agua y protección solar, y no subas con lluvia, barro o viento fuerte. Confirma avisos y acceso del Parque Natural Municipal de Grumari antes de salir.',
    pt: 'A caminhada fica no extremo oeste e a foto famosa pode exigir espera; considere a fila ao planejar a volta e combine um ponto exato de embarque. No cume, permaneça em rocha firme e longe da borda: o efeito de algumas fotos depende do ângulo, não de se inclinar. Leve água e proteção solar e não suba com chuva, lama ou vento forte. Confira avisos e acesso ao Parque Natural Municipal de Grumari antes de sair.',
    en: 'The hike is in the far western part of the city, and the famous photo may involve a wait; factor in the queue and agree on an exact pickup point for your return. At the summit, stay on stable rock and away from the edge—the effect in some photos comes from the camera angle, not leaning out. Bring water and sun protection, and do not climb in rain, mud or strong wind. Check Grumari Municipal Natural Park access and notices before setting out.'
  }
];

let translations = fs.readFileSync(chunkPath, 'utf8');
const missingTranslations = pages.filter(({es}) => !translations.includes(`${JSON.stringify(es)}: {`));
const insertion = missingTranslations.map(({es, pt, en}) => `  ${JSON.stringify(es)}: {\n    "PT": ${JSON.stringify(pt)},\n    "EN": ${JSON.stringify(en)}\n  },`).join('\n');
const end = translations.lastIndexOf('};');
if (end < 0 || translations.slice(end + 2).trim()) throw new Error('Unexpected cultura-15.js format');
for (const page of pages) {
  const file = path.join(root, 'naturaleza', page.route, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes(`>${page.es}</p>`)) {
    console.log(`Already present /naturaleza/${page.route}/`);
    continue;
  }
  const marker = '<h2>Cómo es el recorrido</h2>';
  let position = html.indexOf(marker);
  if (position < 0) position = html.indexOf('<div class="culture-gallery">');
  if (position < 0 || html.indexOf('<article class="culture-copy">') > position) throw new Error(`Safe insertion point missing: ${page.route}`);
  html = html.slice(0, position) + `<p>${page.es}</p>` + html.slice(position);
  fs.writeFileSync(file, html);
  console.log(`Updated /naturaleza/${page.route}/`);
}
if (insertion) {
  const before = translations.slice(0, end).trimEnd();
  translations = before + (before.endsWith('}') ? ',' : '') + '\n' + insertion + '\n' + translations.slice(end);
  fs.writeFileSync(chunkPath, translations);
}
console.log(`Added ${pages.length} ES/PT/EN editorial paragraphs to existing nature pages.`);
