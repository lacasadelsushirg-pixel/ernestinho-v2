import { t } from './modelo.js';

// Fichas originales para la guía de barrios de Petrópolis. No alteran los destinos aprobados.
// Los lugares se usan para orientación, NO implican acceso público al interior.
const point = (name, reason, location, route = '') => ({ name, reason, location, route });
const district = (history, itinerary, access, duration, points, sources) =>
  ({ history, itinerary, access, duration, points, sources });
const tourism = ['https://www.turismo.rj.gov.br/cidades/petropolis/', 'Portal Turismo RJ · Petrópolis'];
const heritage = ['https://portal.iphan.gov.br/uploads/legislacao/Portaria_n_213_de_14_de_maio_de_1996.pdf', 'IPHAN · Patrimônio protegido'];
const plan = ['https://sig.petropolis.rj.gov.br/cpge/Reflexoes.pdf', 'Prefeitura · História urbana e industrial'];
const regions = ['https://descubrapetropolis.com.br/roteiros-e-passeios-em-petropolis/', 'Descubra Petrópolis · Regiões'];
const stefan = ['https://cadastro.museus.gov.br/museus/museu-casa-stefan-zweig/', 'MuseusBr · Casa Stefan Zweig'];
export const petropolisDistrictEditorial = {
  'centro-historico': district(
    t('Petrópolis nació alrededor del proyecto urbano imperial de la década de 1840 y se transformó en residencia de verano de la corte. En el Centro, la historia no se limita al palacio: los jardines, el trazado de avenidas, la Catedral y las casas de personajes del Imperio explican también cómo la ciudad siguió viviendo durante la República.',
      'Petrópolis cresceu em torno do projeto urbano imperial da década de 1840 e virou residência de verão da corte. No Centro, a história não se resume ao palácio: jardins, avenidas, Catedral e casas de personagens do Império mostram também como a cidade continuou na República.',
      'Petrópolis grew around the imperial town plan of the 1840s and became the court’s summer retreat. Downtown history extends beyond the palace: landscaped avenues, gardens, the cathedral and historic residences trace both the Empire and the Republic.'),
    t('Yo empezaría por los jardines del Museu Imperial, caminaría hacia la Catedral por la Avenida Koeler y terminaría en el Palácio de Cristal. Para una segunda caminata reservaría Avenida Ipiranga y Casa da Ipiranga. Prioriza dos interiores en lugar de entrar a todo a la carrera.',
      'Eu começaria pelos jardins do Museu Imperial, caminharia até a Catedral pela Avenida Koeler e terminaria no Palácio de Cristal. Numa segunda caminhada, reservaria Avenida Ipiranga e Casa da Ipiranga. Escolha dois interiores, sem correr por todos.',
      'Start with the Imperial Museum gardens, follow Avenida Koeler towards the cathedral and finish at Palácio de Cristal. Make Avenida Ipiranga and Casa da Ipiranga a second walk. Choose two interiors rather than rushing through them all.'),
    t('Es el sector más práctico para conocer a pie. Si llegas a la rodoviaria intermunicipal de Bingen, toma la línea 100 hacia el Centro o pide un auto; la estación no está junto a los museos.',
      'É o setor mais fácil de conhecer a pé. Chegando à rodoviária intermunicipal do Bingen, use a linha 100 para o Centro ou peça um carro; a rodoviária não fica ao lado dos museus.',
      'This is the easiest area to explore on foot. From Bingen intercity station, take route 100 towards downtown or request a car; the station is not beside the museums.'),
    t('Medio día para exteriores; un día con museos.', 'Meio dia para exteriores; um dia incluindo museus.', 'Half a day outside; a full day with museums.'),
    [
      point('Museu Imperial', t('Antigua residencia estival de Dom Pedro II; consulta entradas y normas para las salas.', 'Antiga residência de verão de D. Pedro II; confira ingressos e regras das salas.', 'Dom Pedro II’s former summer residence; check interior entry rules.'), 'Rua da Imperatriz 220, Centro, Petrópolis, RJ, Brasil', 'cultura/museu-imperial/'),
      point('Avenida Koeler', t('Conjunto urbano y paisajístico protegido, junto a casonas y a la Catedral.', 'Conjunto urbano e paisagístico protegido, com casarões e a Catedral.', 'Protected historic avenue with grand houses and the cathedral.'), 'Avenida Koeler, Petrópolis, RJ, Brasil'),
      point('Palácio de Cristal', t('Pabellón de hierro y vidrio con jardines y agenda cultural.', 'Pavilhão de ferro e vidro, jardins e programação cultural.', 'Iron-and-glass pavilion with gardens and cultural events.'), 'Rua Alfredo Pachá, Petrópolis, RJ, Brasil', 'cultura/palacio-de-cristal/')
    ], [tourism, heritage]),
  quitandinha: district(
    t('Quitandinha representa otra etapa de la historia: el turismo de gran hotel y casino del siglo XX. El edificio monumental, inaugurado en 1944, recuerda los años en que Petrópolis también era un destino de espectáculos, celebraciones y ocio. La parte cultural es hoy gestionada por Sesc; el antiguo complejo tiene áreas con usos diferentes.',
      'Quitandinha representa outra época: o turismo de hotel-cassino do século XX. Inaugurado em 1944, o prédio monumental recorda a fase de espetáculos, festas e lazer. A área cultural é administrada pelo Sesc; o antigo complexo possui espaços de usos diferentes.',
      'Quitandinha reflects a different age: 20th-century grand-hotel and casino tourism. Opened in 1944, the monumental building recalls the era of shows and glamorous leisure. Sesc runs the cultural venue; other parts of the old complex have different uses.'),
    t('Recorre primero el lago para apreciar la fachada y después consulta la programación del Centro Cultural Sesc Quitandinha. No confundas la zona residencial con la entrada del espacio cultural. Si viajas con niños, el Parque Crémerie puede complementar la salida.',
      'Comece pela margem do lago para apreciar a fachada e depois confira a programação do Centro Cultural Sesc Quitandinha. Não confunda o acesso residencial com a entrada cultural. Com crianças, dá para incluir o Parque Crémerie.',
      'Start by the lake for a full view of the façade, then check the Sesc Quitandinha cultural programme. The residential entrance is not the cultural entrance. Families may add Parque Crémerie.'),
    t('Es un circuito separado del Centro Histórico. Consulta la línea 649 y confirma qué parada sirve la entrada cultural; desde Bingen, compara conexión y auto por aplicación.',
      'É um circuito separado do Centro Histórico. Consulte a linha 649 e confirme o ponto da entrada cultural; do Bingen, compare conexão e carro por aplicativo.',
      'Treat Quitandinha as a separate outing from downtown. Check route 649 and which stop serves the cultural entrance; from Bingen compare bus connections with app rides.'),
    t('Entre 1 y 3 horas, según exposiciones.', 'De 1 a 3 horas, conforme as exposições.', '1–3 hours depending on exhibitions.'),
    [
      point('Centro Cultural Sesc Quitandinha', t('Exposiciones y actividades según programación; revisa el acceso.', 'Exposições e atividades conforme programação; confira o acesso.', 'Exhibitions and events vary; check entrance access.'), 'Centro Cultural Sesc Quitandinha, Petrópolis, RJ, Brasil', 'cultura/palacio-quitandinha/'),
      point('Lago do Quitandinha', t('Mirada exterior del antiguo hotel-casino y su reflejo.', 'Vista externa do antigo hotel-cassino e seu reflexo.', 'Outdoor views and reflections of the former hotel-casino.'), 'Lago Quitandinha, Petrópolis, RJ, Brasil', 'naturaleza/lago-quitandinha/'),
      point('Parque Crémerie', t('Pausa verde alternativa para familias; verifica horarios.', 'Parada verde para famílias; confira horários.', 'Green family stop; check opening times.'), 'Parque Crémerie, Petrópolis, RJ, Brasil', 'familia/parque-cremerie/')
    ], [tourism, ['https://cultura.sescrio.org.br/espacos-culturais/centro-cultural-sesc-quitandinha', 'Sesc · Centro Cultural Quitandinha']]),
  itaipava: district(
    t('Itaipava es el tercer distrito de Petrópolis y tiene un ritmo propio, diferente del Centro Imperial. Su atractivo combina vida de sierra, gastronomía, hospedaje, parques y arquitectura ecléctica como el Castelo de Itaipava. Los puntos están dispersos, por lo que conviene planificar el transporte antes de elegirlos.',
      'Itaipava é o terceiro distrito de Petrópolis e tem ritmo próprio, diferente do Centro Imperial. Serra, gastronomia, hospedagem, parques e arquitetura eclética, como a do Castelo de Itaipava, são os destaques. Os lugares ficam espalhados, então planeje o transporte antes de escolhê-los.',
      'Itaipava is Petrópolis’s third district and has a different pace from the imperial centre. It combines mountain life, dining, accommodation, parks and eclectic landmarks such as Castelo de Itaipava. Sights are spread out, so plan transport before choosing them.'),
    t('Organiza una mañana en el Parque Municipal Prefeito Paulo Rattes y elige un restaurante cercano. Visita el Castelo de Itaipava únicamente después de confirmar qué áreas reciben público, pues funciona también con eventos y servicios privados.',
      'Reserve uma manhã ao Parque Municipal Prefeito Paulo Rattes e escolha restaurante próximo. Visite o Castelo de Itaipava só depois de conferir quais áreas recebem público, pois há eventos e serviços privados.',
      'Spend a morning at Parque Municipal Prefeito Paulo Rattes and choose a nearby restaurant. Visit Castelo de Itaipava only after confirming what is open to visitors, as it also hosts private events and services.'),
    t('La 700 conecta Centro y Terminal Itaipava. Desde ese terminal hay servicios hacia Araras y Vale das Videiras (617 y 605); para restaurantes fuera del eje principal, confirma el último tramo y regreso.',
      'A 700 liga Centro e Terminal Itaipava. Dali saem serviços para Araras e Vale das Videiras (617 e 605); para locais fora do eixo principal, confira o último trecho e a volta.',
      'Route 700 links downtown and Terminal Itaipava. From there, 617 and 605 serve Araras and Vale das Videiras; check the final leg and return for addresses away from the main route.'),
    t('Medio día o día completo según las paradas.', 'Meio dia ou dia inteiro conforme o roteiro.', 'Half a day or more depending on stops.'),
    [
      point('Parque Municipal Prefeito Paulo Rattes', t('Área verde del distrito: confirma eventos y accesos.', 'Área verde do distrito: confira eventos e acessos.', 'District green space: check events and entrances.'), 'Parque Municipal Prefeito Paulo Rattes, Itaipava, Petrópolis, RJ, Brasil', 'familia/parque-itaipava/'),
      point('Castelo de Itaipava', t('Arquitectura de inspiración medieval y usos privados; verifica visita.', 'Arquitetura de inspiração medieval e usos privados; confirme visitação.', 'Medieval-inspired architecture with private uses; verify visitor access.'), 'Castelo de Itaipava, Petrópolis, RJ, Brasil', 'cultura/castelo-itaipava/'),
      point('Terminal Itaipava', t('Punto práctico para organizar líneas hacia Araras y Vale das Videiras.', 'Ponto útil para conexões a Araras e Vale das Videiras.', 'Practical interchange for routes towards Araras and Vale das Videiras.'), 'Terminal Itaipava, Petrópolis, RJ, Brasil', 'transportes/entre-distritos/')
    ], [regions, tourism]),
  bingen: district(
    t('Bingen es la puerta de entrada de muchos visitantes que llegan desde Río en autobús intermunicipal, pero también tiene identidad comercial vinculada al Polo de Moda. En Petrópolis, no hay que confundir Bingen con el Centro Histórico: son sectores diferentes y conectados por transporte urbano.',
      'Bingen é porta de entrada para quem chega de ônibus intermunicipal do Rio, mas também tem identidade comercial ligada ao Polo de Moda. Bingen e o Centro Histórico são áreas diferentes e conectadas pelo transporte urbano.',
      'Bingen welcomes many coach travellers from Rio and also has its own shopping identity around the fashion district. Do not mistake it for the historic centre: the two areas are linked by local transport.'),
    t('Si llegas con equipaje, identifica primero la Rodoviária Governador Leonel Brizola. Para compras, guarda aparte el nombre de la tienda en el Polo de Moda. No dejes un trayecto ajustado entre las compras y un autobús con hora fija.',
      'Ao chegar com malas, identifique primeiro a Rodoviária Governador Leonel Brizola. Para compras, salve o endereço da loja no Polo de Moda. Não deixe o trajeto entre as compras e o ônibus para a última hora.',
      'On arrival, save the location of Governador Leonel Brizola station. Save the address of any specific shop in the Polo de Moda separately. Do not leave a tight transfer between shopping and a scheduled coach.'),
    t('Para el Centro busca la 100; para Corrêas, la 150. Comprueba las paradas urbanas y el sentido antes de salir de la rodoviaria. Los pasajes intermunicipales y urbanos se pagan por separado.',
      'Para o Centro use a 100; para Corrêas, a 150. Confira o ponto urbano e sentido antes de sair da rodoviária. Passagens intermunicipais e municipais são pagas separadamente.',
      'Take route 100 downtown and 150 towards Corrêas. Check local boarding stops and directions before leaving the station. Intercity and municipal fares are separate.'),
    t('30–90 minutos para conexiones o compras.', '30–90 minutos para conexões ou compras.', '30–90 minutes for transfers or shopping.'),
    [
      point('Rodoviária Governador Leonel Brizola', t('Terminal intermunicipal, diferente del Terminal Centro.', 'Rodoviária intermunicipal, diferente do Terminal Centro.', 'Intercity terminal, distinct from Terminal Centro.'), 'Terminal Rodoviário Governador Leonel Brizola, Bingen, Petrópolis, RJ, Brasil', 'transportes/interurbanos/'),
      point('Polo de Moda do Bingen', t('Sector comercial de ropa; comprueba la dirección de cada tienda.', 'Comércio de roupas; confira o endereço de cada loja.', 'Fashion-shopping area; check each shop’s address.'), 'Polo de Moda do Bingen, Petrópolis, RJ, Brasil'),
      point('Línea 100 · conexión Centro', t('Conexión urbana práctica tras la llegada.', 'Ligação urbana prática após a chegada.', 'Useful municipal connection on arrival.'), 'Terminal Rodoviário Governador Leonel Brizola, Petrópolis, RJ, Brasil', 'transportes/onibus/')
    ], [tourism]),
  'correas-bonfim': district(
    t('Corrêas es una referencia de transporte y servicios para la zona de valles y montaña. Bonfim, en sus alrededores, conduce al sector petropolitano del Parque Nacional da Serra dos Órgãos. Esta parte de Petrópolis combina historia regional, caminos de sierra y senderos, pero no debe confundirse con una extensión peatonal del Centro.',
      'Corrêas é referência de transportes e serviços para a região dos vales e da serra. O Bonfim, nos arredores, conduz ao setor petropolitano do Parque Nacional da Serra dos Órgãos. A região combina história local, estradas serranas e trilhas, mas não é continuação a pé do Centro.',
      'Corrêas is a transport and services hub for the mountain valleys. Nearby Bonfim leads to the Petrópolis entrance of Serra dos Órgãos National Park. This is a region of local history, winding roads and trails—not a downtown walking extension.'),
    t('Consulta primero el Terminal Corrêas. Para Bonfim, localiza la entrada del parque y pregunta qué senderos están abiertos: Circuito das Bromélias, Poço Paraíso o Véu da Noiva exigen condiciones y tiempos distintos. En días de lluvia, prioriza seguridad y sigue la orientación del parque.',
      'Comece pelo Terminal Corrêas. Para o Bonfim, localize a entrada do parque e veja quais trilhas estão abertas: Circuito das Bromélias, Poço Paraíso e Véu da Noiva têm condições e tempos diferentes. Com chuva, priorize segurança e a orientação do parque.',
      'Begin with Terminal Corrêas. For Bonfim, locate the park entrance and confirm which trails are open: Bromélias, Poço Paraíso and Véu da Noiva vary in difficulty and time. In rain, follow park safety guidance.'),
    t('Desde Bingen, la línea 150 llega al Terminal Corrêas. La 611 conecta Corrêas y Bonfim; guarda la parada de regreso y verifica la distancia final al acceso del parque.',
      'Do Bingen, a linha 150 chega ao Terminal Corrêas. A 611 liga Corrêas ao Bonfim; salve o ponto de volta e confira a caminhada final até o parque.',
      'From Bingen take route 150 to Terminal Corrêas. Route 611 links Corrêas and Bonfim; save your return stop and check the final walk to the park entrance.'),
    t('Medio día o más para senderos.', 'Meio dia ou mais para trilhas.', 'Half a day or longer for trails.'),
    [
      point('Terminal Corrêas', t('Conexión de la 150, 611 y otros corredores de montaña.', 'Conexões da 150, 611 e outros corredores serranos.', 'Hub for routes 150, 611 and mountain services.'), 'Terminal Corrêas, Estrada União e Indústria 1132, Petrópolis, RJ, Brasil', 'transportes/onibus/'),
      point('Portaria Bonfim · PARNASO', t('Confirma senderos, entrada y condiciones de visita.', 'Confira trilhas, entrada e condições de visita.', 'Confirm trail openings, entry and conditions.'), 'Sede Petrópolis PARNASO Bonfim, Petrópolis, RJ, Brasil', 'naturaleza/circuito-bromelias/'),
      point('Circuito das Bromélias', t('Sendero de la parte baja del parque, sujeto a apertura.', 'Trilha da parte baixa do parque, conforme abertura.', 'Lower-park forest trail, subject to opening.'), 'Parque Nacional Serra dos Órgãos sede Petrópolis, RJ, Brasil', 'naturaleza/circuito-bromelias/')
    ], [regions, tourism]),
  'araras-vale-das-videiras': district(
    t('Araras y Vale das Videiras se conocen por sus carreteras de sierra, naturaleza, pequeños establecimientos y propuestas gastronómicas fuera de los centros más urbanos. Aunque suelen aparecer juntos en las guías, no son una única parada: calcula distancias y define el lugar exacto de llegada.',
      'Araras e Vale das Videiras são conhecidos por estradas de serra, natureza, pequenos estabelecimentos e gastronomia fora dos centros urbanos. Embora apareçam juntos nos roteiros, não são uma parada só: calcule distâncias e escolha o endereço exato.',
      'Araras and Vale das Videiras are known for country roads, mountain scenery and small food and hospitality businesses. They are often paired in guides but are not one stop: calculate distances and choose the exact destination.'),
    t('Elige un restaurante o espacio de visita y organiza el paseo alrededor, sin improvisar entradas a propiedades privadas. Si quieres recorrer ambas zonas, deja suficiente tiempo para las curvas y los trayectos. Guarda el teléfono del establecimiento por si falla la señal.',
      'Escolha restaurante ou lugar de visita e organize o passeio a partir dele, sem entrar em propriedades privadas. Se quiser combinar as duas regiões, reserve tempo para os deslocamentos e salve o telefone do estabelecimento caso falte sinal.',
      'Choose a restaurant or visitor venue first and build the outing around it; do not assume access to private property. If combining both regions, allow for slow road journeys and save the venue phone number in case reception fails.'),
    t('Desde Corrêas busca la 610 para Araras o 602 para Vale das Videiras. Desde Itaipava existen 617 y 605 respectivamente. Los servicios pueden ser espaciados: confirma ida, vuelta y último tramo antes de salir.',
      'De Corrêas use a 610 para Araras ou a 602 para Vale das Videiras. De Itaipava, 617 e 605 respectivamente. As linhas podem ter grandes intervalos: confira ida, volta e último trecho.',
      'From Corrêas, use 610 towards Araras or 602 towards Vale das Videiras. From Itaipava, use 617 and 605 respectively. Service can be infrequent, so check both directions and the last leg.'),
    t('Medio día por zona o día entero si combinas ambas.', 'Meio dia por região ou dia inteiro para as duas.', 'Half a day per area or a full day for both.'),
    [
      point('Jardim Araras', t('Referencia de llegada a Araras, no a todas las posadas.', 'Referência de chegada em Araras, não de todas as pousadas.', 'Araras arrival reference, not every hotel’s doorstep.'), 'Rua Cândido Pereira, Jardim Araras, Petrópolis, RJ, Brasil', 'transportes/entre-distritos/'),
      point('Vale das Videiras', t('Sector rural para disfrutar con itinerario y regreso definidos.', 'Região rural para visitar com roteiro e volta definidos.', 'Rural valley best visited with a planned route and return.'), 'Estrada Almirante Paulo Martins Meira, Vale das Videiras, Petrópolis, RJ, Brasil', 'naturaleza/vale-das-videiras/'),
      point('Terminal Itaipava', t('Conexiones alternativas por las líneas 605 y 617.', 'Conexões alternativas pelas linhas 605 e 617.', 'Alternative connections on 605 and 617.'), 'Terminal Itaipava, Petrópolis, RJ, Brasil', 'transportes/entre-distritos/')
    ], [regions]),
  'castelanea': district(
    t('Castelânea ayuda a contar la historia de quienes construyeron Petrópolis y no solo la de quienes vivían en los palacios. En el Museu Casa do Colono se preserva la memoria doméstica de familias inmigrantes vinculadas a la ciudad del siglo XIX. La vivienda, construida en 1847, es una de las referencias para comprender la colonización germánica.',
      'Castelânea ajuda a contar a história de quem construiu Petrópolis, não só de quem vivia nos palácios. O Museu Casa do Colono preserva a memória do cotidiano de famílias imigrantes. A casa de 1847 é referência para compreender a colonização germânica no século XIX.',
      'Castelânea helps tell the story of the families who built Petrópolis, not just its palace residents. Museu Casa do Colono preserves ordinary immigrant life in a house dating from 1847, a key reference for the city’s German settler heritage.'),
    t('Visita el Museu Casa do Colono, observa las técnicas de construcción y los objetos del trabajo cotidiano. Después compara esa vida modesta con la que aparece en el Museu Imperial: las dos historias forman parte de la ciudad.',
      'Visite o Museu Casa do Colono e observe técnicas de construção e objetos do cotidiano. Depois compare essa vida simples com a do Museu Imperial: as duas histórias fazem parte da cidade.',
      'Visit Museu Casa do Colono for construction methods and household tools, then compare its modest domestic story with the opulence of Museu Imperial. Both belong to the city’s past.'),
    t('Fuera del circuito principal a pie. Utiliza la dirección Rua Cristóvão Colombo 1034 y verifica la ruta con un planificador antes de escoger bus o auto.',
      'Fora do circuito principal a pé. Use Rua Cristóvão Colombo 1034 e confira o trajeto num planejador antes de escolher ônibus ou carro.',
      'Away from the main walking circuit. Use Rua Cristóvão Colombo 1034 and check a journey planner before choosing bus or car.'),
    t('45–90 minutos con museo.', '45–90 minutos com museu.', '45–90 minutes with the museum.'),
    [point('Museu Casa do Colono', t('Vivienda histórica y acervo doméstico germánico.', 'Casa histórica e acervo doméstico de colonos germânicos.', 'Historic house displaying immigrant domestic life.'), 'Rua Cristóvão Colombo 1034, Castelânea, Petrópolis, RJ, Brasil', 'cultura/casa-do-colono/')], [tourism, plan]),
  valparaiso: district(
    t('Valparaíso forma parte de una Petrópolis residencial y literaria, fuera del circuito monumental del palacio. Aquí se encuentra la Casa Stefan Zweig, memoria del escritor austríaco exiliado que vivió con Lotte en la ciudad durante la Segunda Guerra Mundial. La institución reúne además historias de quienes buscaron refugio en Brasil ante el nazismo.',
      'Valparaíso mostra uma Petrópolis residencial e literária, fora do circuito monumental do palácio. Ali fica a Casa Stefan Zweig, memória do escritor austríaco exilado que viveu com Lotte na cidade durante a Segunda Guerra. O museu também conta histórias de quem buscou refúgio no Brasil diante do nazismo.',
      'Valparaíso reveals the residential and literary side of Petrópolis, beyond imperial monuments. Casa Stefan Zweig recalls the Austrian writer who lived here in exile with Lotte during World War II. Its memorial also documents other refugees who found safety in Brazil.'),
    t('Visita la Casa Stefan Zweig si está abierta: el museo tiene entrada gratuita según MuseusBr y la ficha consultada indica viernes a domingo, de 11 a 17 h. Confirma antes de ir y dedica tiempo al Memorial del Exilio y a las exposiciones temporales.',
      'Visite a Casa Stefan Zweig se estiver aberta: segundo MuseusBr, a entrada é gratuita e o cadastro consultado informa sexta a domingo, das 11h às 17h. Confirme antes de ir e reserve tempo ao Memorial do Exílio e às mostras.',
      'Visit Casa Stefan Zweig if open. MuseusBr lists free admission and Friday–Sunday hours of 11:00–17:00; confirm before travelling. Make time for the Exile Memorial and changing exhibitions.'),
    t('Usa Rua Gonçalves Dias 34 como dirección. No lo confundas con los museos del Centro Histórico: verifica cómo llegar y volver antes de salir.',
      'Use Rua Gonçalves Dias 34 como endereço. Não confunda com os museus do Centro Histórico: confira ida e volta antes de sair.',
      'Use Rua Gonçalves Dias 34. This is outside the central museum circuit, so plan both journeys before leaving.'),
    t('1–2 horas con museo.', '1–2 horas com museu.', '1–2 hours with the museum.'),
    [point('Casa Stefan Zweig', t('Literatura, exilio europeo y memoria del refugio en Brasil.', 'Literatura, exílio europeu e memória do refúgio no Brasil.', 'Literature, European exile and the memory of refuge in Brazil.'), 'Rua Gonçalves Dias 34, Petrópolis, RJ, Brasil')], [stefan]),
  'cascatinha-nogueira': district(
    t('Cascatinha fue un centro importante del pasado textil de Petrópolis, con la Companhia Petropolitana de Tecidos instalada en el siglo XIX. Nogueira conserva memoria ferroviaria visible en la antigua estación. Son lugares que amplían la mirada del turista más allá del Imperio: trabajo, inmigración, transporte y transformación industrial.',
      'Cascatinha foi importante centro têxtil de Petrópolis, com a Companhia Petropolitana de Tecidos no século XIX. Nogueira conserva memória ferroviária na antiga estação. São lugares para conhecer trabalho, imigração, transportes e transformação industrial para além do Império.',
      'Cascatinha was an important textile-manufacturing area, home to Companhia Petropolitana de Tecidos in the 19th century. Nogueira retains a visible railway legacy at its old station. Together they tell the story of work, migration and transport beyond the imperial court.'),
    t('En Nogueira, observa la antigua estación desde espacios de acceso público y evita suponer que el edificio funciona como museo. En Cascatinha, organiza un recorrido de patrimonio industrial desde la calle; consulta previamente cualquier visita interior.',
      'Em Nogueira, observe a antiga estação a partir de áreas públicas e não presuma que funcione como museu. Em Cascatinha, faça roteiro de patrimônio industrial pelas ruas; confira antes qualquer visita interna.',
      'See the old Nogueira station from publicly accessible spaces; do not assume it operates as a museum. In Cascatinha, follow an industrial-heritage route from the street and verify any interior access beforehand.'),
    t('No es un circuito para hacer a pie desde el Centro. Consulta el tramo por Estrada União e Indústria y el transporte urbano; acuerda el regreso si visitas más de un punto.',
      'Não é caminhada a partir do Centro. Confira o corredor da Estrada União e Indústria e os ônibus locais; organize a volta se visitar mais de um ponto.',
      'This is not a downtown walking route. Plan the Estrada União e Indústria corridor and local buses; arrange your return if visiting several stops.'),
    t('2–4 horas si combinas ambas zonas.', '2–4 horas combinando as duas regiões.', '2–4 hours if visiting both areas.'),
    [point('Estação Nogueira', t('Memoria del ferrocarril serrano; verifica acceso.', 'Memória ferroviária serrana; confira acesso.', 'Mountain railway history; verify access.'), 'Estação Nogueira, Petrópolis, RJ, Brasil'), point('Companhia Petropolitana de Tecidos', t('Referente histórico de la industria textil de Cascatinha; visita exterior.', 'Referência histórica da indústria têxtil de Cascatinha; vista externa.', 'Historic Cascatinha textile industry site; view from outside.'), 'Cascatinha, Petrópolis, RJ, Brasil')], [plan, regions]),
  'alto-da-serra-rua-teresa': district(
    t('El Alto da Serra conserva el recuerdo de la subida a Petrópolis y de sus conexiones históricas con Río. En el entorno, Rua Teresa se consolidó como un conocido corredor comercial de moda: una cara de la ciudad que convive con la historia imperial y el pasado fabril.',
      'O Alto da Serra guarda a memória da subida a Petrópolis e de antigas ligações com o Rio. Na região, a Rua Teresa se consolidou como corredor comercial de moda: outra face da cidade que convive com o patrimônio imperial e industrial.',
      'Alto da Serra recalls the mountain approach to Petrópolis and its historic Rio connections. Nearby Rua Teresa developed into an important fashion-shopping corridor, another side of the city alongside imperial and industrial heritage.'),
    t('Si vienes a comprar, elige tiendas y comprueba horario y dirección: Rua Teresa es larga. No mezcles sin calcular una visita completa al Museu Imperial con compras de última hora antes del bus de regreso.',
      'Para compras, escolha lojas e confira horários e endereços: a Rua Teresa é extensa. Não deixe compras para o fim de uma visita longa ao Museu Imperial antes de um ônibus com hora marcada.',
      'For shopping, check each store’s address and hours: Rua Teresa is long. Avoid squeezing major museum visits and last-minute shopping into a short window before a scheduled coach.'),
    t('Confirma el punto de subida y bajada según la tienda. Si viajas con compras o maletas, compara transporte público y app para el regreso.',
      'Confira embarque e desembarque conforme a loja. Com compras ou malas, compare ônibus e carro por aplicativo para voltar.',
      'Check pickup and drop-off based on the shop you are visiting. With bags, compare local buses and app rides for the return.'),
    t('1–3 horas para compras seleccionadas.', '1–3 horas para compras pontuais.', '1–3 hours for a focused shopping visit.'),
    [point('Rua Teresa', t('Corredor de moda; revisa horarios individuales de las tiendas.', 'Polo de moda; confira horários de cada loja.', 'Fashion district; check individual shop hours.'), 'Rua Teresa, Petrópolis, RJ, Brasil')], [tourism, plan]),
  'pedro-do-rio-secretario': district(
    t('Pedro do Rio y Secretário muestran un paisaje de sierra más rural que el del Centro Histórico, con áreas de campo, carreteras y pequeñas localidades. Pedro do Rio es uno de los distritos oficiales de Petrópolis, mientras Secretário es un sector dentro de su territorio turístico. No los confundas con Itaipava ni supongas que todos los puntos se encuentran próximos.',
      'Pedro do Rio e Secretário mostram uma serra mais rural que o Centro Histórico, com campo, estradas e pequenas localidades. Pedro do Rio é distrito oficial de Petrópolis, enquanto Secretário é região do seu território turístico. Não confunda com Itaipava nem suponha que todos os pontos ficam próximos.',
      'Pedro do Rio and Secretário show a more rural mountain landscape than historic downtown, with country roads and small communities. Pedro do Rio is an official district; Secretário is a tourist area within that wider region. Neither should be treated as a short walk from Itaipava.'),
    t('Elige antes un establecimiento, evento o actividad concreta y confirma si recibe público. En esta zona conviene valorar el paisaje y planear el regreso más que intentar marcar varios puntos de un mapa en una sola tarde.',
      'Escolha antes um estabelecimento, evento ou atividade e confira se recebe visitantes. Aqui vale mais aproveitar a paisagem e organizar o retorno do que tentar marcar muitos pontos num só período.',
      'Select a specific venue, event or activity and confirm visitor access first. This area rewards slow travel and a planned return rather than attempting many map pins in one afternoon.'),
    t('Consulta la conexión por Itaipava y la dirección exacta. La disponibilidad de bus o app en sectores rurales varía; si viajas de noche o con equipaje, organiza el regreso de antemano.',
      'Consulte ligação por Itaipava e o endereço preciso. A oferta de ônibus ou app em áreas rurais varia; à noite ou com bagagem, combine a volta antes.',
      'Check routes via Itaipava and your exact address. Bus and app services vary in rural locations; arrange a return in advance if travelling late or with luggage.'),
    t('Medio día mínimo; mejor con plan definido.', 'No mínimo meio dia; melhor com roteiro definido.', 'At least half a day with a set plan.'),
    [point('Pedro do Rio', t('Cabecera de distrito: define el destino final antes de salir.', 'Referência distrital: defina o destino final antes de sair.', 'District hub; choose the actual final destination first.'), 'Pedro do Rio, Petrópolis, RJ, Brasil'), point('Secretário', t('Paisaje rural y paradas que requieren confirmar acceso.', 'Paisagem rural e locais com acesso a confirmar.', 'Rural region; confirm access to specific venues.'), 'Secretário, Petrópolis, RJ, Brasil')], [regions, ['https://www.eventosempetropolis.com/', 'Convention Bureau · Distritos']]),
};
