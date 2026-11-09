import { t } from './modelo.js';

const cptrans = ['https://www.petropolis.rj.leg.br/institucional/noticias/sala-de-atendimento-ao-publico-na-sede-da-cptrans-homenageia-servidor-que-morreu-apos-as-chuvas-em-petropolis', 'CPTrans · Atendimento · Câmara Municipal de Petrópolis'];
const bingen = 'Terminal Rodoviário Governador Leonel Brizola, Bingen, Petrópolis, RJ';
const source100 = ['https://linhas-preview.cittamobi.com.br/linha/transporte_publico-Petropolis-SystemSatAPI-CidadeReal-AG_1-100-CENTRO-RODOVIARIABINGEN-858b1dbcd493', '100 · Cidade Real / Cittamobi'];
const source150 = ['https://linhas.cittamobi.com.br/linha/transporte_publico-Petropolis-SystemSatAPI-CidadeReal-AG_1-150-TERMINALCORREAS-RODOVIARIABINGEN-141c79662d8c', '150 · Cidade Real / Cittamobi'];
const source649 = ['https://onibus.online/rj/petropolis/649-quitandinha-via-alto-da-serra/', '649 · Turp / Ônibus Online'];
const source700 = ['https://www.petropolisemcena.com.br/2026/09/intervencao-da-turp-divulga-novos.html', '700 / 704 · Intervenção da Turp / Petrópolis em Cena'];

export const transportDetails = {
  vans: {
    image: 'nogueira',
    tip: t('Yo resolvería Bingen–Centro con la 100 si el horario encaja y preguntaría por la 150 si voy a Corrêas. Para un almuerzo en un valle, con un grupo y varias paradas, cotizaría una van con regreso pactado.',
      'Eu faria Bingen–Centro com a 100 se o horário encaixar e perguntaria pela 150 se fosse a Corrêas. Para almoço num vale com grupo e várias paradas, cotaria uma van com volta combinada.',
      'I’d take the 100 between Bingen and downtown if the timetable fits and ask about the 150 for Corrêas. For a group lunch in a valley with several stops, I’d get a van quote with a confirmed return.'),
    sections: [
      {
        id: 'modalidades', title: t('Cinco servicios que conviene distinguir', 'Cinco serviços que vale distinguir', 'Five services worth distinguishing'),
        copy: t('Autobús urbano: une puntos del municipio y tiene número de línea. Autobús intermunicipal: vende pasaje para viajar entre municipios, como Río–Petrópolis. Van colectiva: hasta la revisión del 9 de noviembre de 2026 no encontré una red turística autorizada con itinerarios, paradas, tarifas y horarios oficiales publicados. Van turística privada: se contrata para un grupo y un recorrido. Traslado reservado: puede ser en auto o van, con un conductor y recogida pactada.',
          'Ônibus urbano: liga pontos do município e tem número de linha. Ônibus intermunicipal: vende passagem entre municípios, como Rio–Petrópolis. Van coletiva: na consulta de 9 de novembro de 2026, não encontrei rede turística autorizada com itinerários, pontos, tarifas e horários oficiais publicados. Van turística particular: é contratada para um grupo e um roteiro. Traslado reservado: pode ser de carro ou van, com motorista e embarque combinado.',
          'Local bus: connects places within the municipality and has a route number. Intercity bus: sells tickets between municipalities, such as Rio and Petrópolis. Shared van: as of 9 November 2026, I found no authorised tourist network with published official routes, stops, fares and timetables. Private tourist van: chartered for a group and itinerary. Booked transfer: a car or van with a driver and an agreed pickup.'),
      },
      {
        id: 'bingen', title: t('Bingen, Centro y Corrêas: dos terminales y una conexión directa', 'Bingen, Centro e Corrêas: terminais e ligação direta', 'Bingen, downtown and Corrêas: terminals and a direct link'),
        copy: t('La rodoviaria intermunicipal de Bingen y el Terminal Centro son lugares distintos. El itinerario publicado de Cidade Real identifica la 100 entre el Centro (Rua Doutor Porciúncula) y la rodoviaria de Bingen. Para ir entre Bingen y el Terminal Corrêas, el itinerario de la 150 muestra una conexión directa. Si llegas con pasaje intermunicipal, pregunta por la parada urbana y confirma el sentido antes de salir de la rodoviaria.',
          'A rodoviária intermunicipal do Bingen e o Terminal Centro são locais diferentes. O itinerário publicado da Cidade Real identifica a 100 entre o Centro (Rua Doutor Porciúncula) e a rodoviária do Bingen. Entre Bingen e o Terminal Corrêas, o itinerário da 150 mostra uma ligação direta. Chegando de ônibus intermunicipal, pergunte pelo ponto urbano e confira o sentido antes de sair da rodoviária.',
          'Bingen intercity station and Terminal Centro are separate places. Cidade Real’s published route data shows the 100 between downtown (Rua Doutor Porciúncula) and Bingen station. The 150 route shows a direct connection between Bingen and Terminal Corrêas. When arriving on an intercity ticket, ask where the local stop is and confirm the direction before leaving the station.'),
        map: bingen, links: [source100, source150],
      },
      {
        id: 'quitandinha', title: t('Centro y Quitandinha: pregunta por la parada del Sesc', 'Centro e Quitandinha: pergunte pelo ponto do Sesc', 'Downtown to Quitandinha: ask for the Sesc stop'),
        copy: t('La ficha de la 649 identifica el recorrido Quitandinha vía Alto da Serra–Centro y publica salidas de Rua do Imperador y Rua Genair Costa de Oliveira en su cuadro de septiembre de 2026. Usa la dirección del Sesc y pregunta cuál es la parada útil para la entrada que vas a usar. Si llegas desde Bingen, compara la conexión disponible ese día con un taxi o app directo, sobre todo si llevas maletas. Guarda también la parada de vuelta.',
          'A ficha da 649 identifica o trajeto Quitandinha via Alto da Serra–Centro e publica partidas da Rua do Imperador e da Rua Genair Costa de Oliveira na tabela de setembro de 2026. Use o endereço do Sesc e pergunte qual ponto atende a entrada que você vai usar. Se chegar pelo Bingen, compare a conexão disponível no dia com um táxi ou app direto, sobretudo com malas. Salve também o ponto de volta.',
          'The 649 route page lists Quitandinha via Alto da Serra to downtown, with departures from Rua do Imperador and Rua Genair Costa de Oliveira in its September 2026 timetable. Give the Sesc address and ask which stop serves the entrance you need. From Bingen, compare the day’s bus connection with a direct taxi or app ride, especially with luggage. Save the return stop too.'),
        image: 'quitandinha', map: 'Centro Cultural Sesc Quitandinha, Petrópolis, RJ', links: [source649],
      },
      {
        id: 'itaipava', title: t('Itaipava y otros distritos: confirma el último tramo', 'Itaipava e outros distritos: confirme o último trecho', 'Itaipava and outlying districts: check the last leg'),
        copy: t('El cuadro divulgado por la intervención de Turp identifica la 700 Centro–Terminal Itaipava y la 704 hacia Madame Machado. Para el parque Paulo Rattes, el castillo o un restaurante, confirma la parada antes de subir: el nombre Itaipava no identifica una sola puerta. Si vas hacia Pedro do Rio, Posse, Bonfim, Araras o Vale das Videiras, consulta si debes cambiar en Corrêas o Itaipava y qué servicio cubre la dirección exacta. Para un acceso rural sin retorno verificado, acuerda recogida.',
          'O quadro divulgado pela intervenção da Turp identifica a 700 Centro–Terminal Itaipava e a 704 para Madame Machado. Para o Parque Paulo Rattes, o castelo ou um restaurante, confirme o ponto antes de embarcar: Itaipava não identifica uma única entrada. Para Pedro do Rio, Posse, Bonfim, Araras ou Vale das Videiras, consulte se precisa trocar em Corrêas ou Itaipava e qual serviço atende o endereço. Para acesso rural sem volta confirmada, combine a coleta.',
          'The Turp intervention timetable identifies the 700 downtown–Terminal Itaipava and the 704 to Madame Machado. For Paulo Rattes Park, the castle or a restaurant, check the stop before boarding: Itaipava covers several different entrances. For Pedro do Rio, Posse, Bonfim, Araras or Vale das Videiras, ask whether to change at Corrêas or Itaipava and what serves the exact address. For rural stops without a verified return, arrange pickup.'),
        map: 'Terminal Itaipava, Petrópolis, RJ', links: [source700],
      },
      {
        id: 'horarios', tone: 'ec-amber', title: t('Horarios, última salida y tarifa', 'Horários, última saída e tarifa', 'Timetables, last departures and fares'),
        copy: t('Consulta el cuadro de la línea, sentido y tipo de día en los enlaces de cada tramo y reconfirma con la CPTrans o en la terminal. Un horario de salida de terminal no es la hora de llegada a una parada intermedia. Como referencia fechada, el cuadro de septiembre para la 700 en días hábiles indicaba las últimas salidas de Itaipava a las 23:05 y del Centro a las 23:40. Reconfírmalas para tu fecha. La referencia tarifaria municipal consultada registraba R$ 5,90 para la tarifa común al 18 de octubre de 2026. Confirma el valor vigente, medios de pago y cualquier integración antes de embarcar.',
          'Consulte a tabela da linha, sentido e tipo de dia nos links de cada trecho e reconfirme com a CPTrans ou no terminal. A saída do terminal não é o horário de chegada ao ponto intermediário. Como referência datada, a tabela de setembro da 700 em dias úteis indicava as últimas saídas de Itaipava às 23:05 e do Centro às 23:40. Reconfirme para sua data. A referência tarifária municipal consultada registrava R$ 5,90 para a tarifa comum em 18 de outubro de 2026. Confirme valor vigente, pagamento e eventual integração antes do embarque.',
          'Check the route, direction and day type in the linked timetables, then reconfirm with CPTrans or at the terminal. A terminal departure time is not an arrival time at an intermediate stop. As a dated reference, the September weekday table for route 700 showed last departures at 23:05 from Itaipava and 23:40 from downtown. Reconfirm them for your date. The municipal fare reference listed the standard fare at R$ 5.90 on 18 October 2026. Confirm the current fare, payment methods and any transfer rules before boarding.'),
      },
      {
        id: 'reservas', tone: 'ec-dark', title: t('Pasaje intermunicipal o van por reserva', 'Passagem intermunicipal ou van por reserva', 'Intercity ticket or a booked van'),
        copy: t('Para Río–Petrópolis, consulta Única/Fácil con fecha, estación y sentido para obtener pasaje y valor del viaje. El operador lista sus ventanillas 01, 02 y 06 en la rodoviaria de Bingen, BR-040 km 82,9. El horario de atención de la ventanilla es distinto al de partida del bus. Para una van privada, pasa cantidad de personas y maletas, silla infantil, puntos de encuentro y horarios. Pide nombre y habilitación del prestador, precio total con peajes y estacionamiento, espera y política de cancelación. Para un fletamento interestatal consulta ANTT; Río–Petrópolis es un desplazamiento dentro del estado.',
          'Para Rio–Petrópolis, consulte Única/Fácil com data, rodoviária e sentido para obter passagem e valor. A empresa informa os guichês 01, 02 e 06 na rodoviária do Bingen, BR-040 km 82,9. Horário de atendimento no guichê é diferente do horário de saída do ônibus. Para van particular, informe passageiros, malas, cadeirinha, embarques e horários. Peça nome e habilitação da empresa, valor total com pedágio e estacionamento, espera e política de cancelamento. Para fretamento interestadual, consulte a ANTT; Rio–Petrópolis é um deslocamento dentro do estado.',
          'For Rio–Petrópolis, check Única/Fácil for your date, station and direction to get the ticket and price. The operator lists counters 01, 02 and 06 at Bingen station, BR-040 km 82.9. The ticket office hours and bus departure times are separate. For a private van, give passenger and bag counts, child-seat needs, pickup points and times. Ask for the operator’s name and authorisation, total price including tolls and parking, waiting charges and cancellation terms. Consult ANTT for interstate charters; Rio–Petrópolis stays within Rio de Janeiro state.'),
      },
    ],
    faq: [
      [t('¿Un microbús urbano es una van turística?', 'Micro-ônibus urbano é van turística?', 'Is a local minibus a tourist van?'),
        t('Identifica el número de línea y el destino. Si cumple un itinerario urbano de línea, usa el cuadro urbano aunque el vehículo sea pequeño.', 'Identifique o número da linha e o destino. Se faz itinerário urbano de linha, use a tabela urbana mesmo que o veículo seja pequeno.', 'Look for the route number and destination. If it runs a scheduled local route, use the city timetable even if the vehicle is small.')],
      [t('¿Puedo contar con el último bus para cenar?', 'Posso contar com o último ônibus depois do jantar?', 'Can I rely on the last bus after dinner?'),
        t('Comprueba el horario para tu fecha y parada. Yo apuntaría a la penúltima salida o reservaría la vuelta si el lugar queda lejos del corredor.', 'Confira o horário para o seu dia e ponto. Eu miraria a penúltima saída ou reservaria a volta se o local ficar fora do eixo principal.', 'Check the timetable for your day and stop. I’d aim for the second-to-last bus or arrange a ride if the venue is far from the main route.')],
    ],
    sources: [
      cptrans, ['https://cidadedashortensias.com.br/', 'Cidade das Hortênsias'],
      ['https://unica-facil.com.br/pontos-de-venda/', 'Única/Fácil · Pontos de venda'],
      ['https://otimizapro.com/tarifa/rj/petropolis', t('Referencia tarifaria municipal con fuentes', 'Referência tarifária municipal com fontes', 'Sourced municipal fare reference')],
      ['https://www.gov.br/turismo/pt-br/acesso-a-informacao/acoes-e-programas/cadastur', 'Cadastur'],
      ['https://www.gov.br/antt/pt-br/assuntos/passageiros/transportefretamento/fretamentosupas/', 'ANTT · Fretamento'],
    ],
    related: 'uber/',
  },
  uber: {
    image: 'vista-trono',
    tip: t('Yo guardaría un pin con la entrada exacta, confirmaría el precio y esperaría dentro hasta comprobar matrícula, modelo y conductor. Si salgo a cenar lejos del Centro, resuelvo la vuelta antes del primer trayecto.',
      'Eu salvaria um pin com a entrada exata, conferiria o preço e esperaria dentro até confirmar placa, modelo e motorista. Se for jantar longe do Centro, resolvo a volta antes da ida.',
      'I’d save a pin for the exact entrance, check the fare and wait indoors until I can match the plate, model and driver. If I’m dining far from downtown, I sort out the return before setting off.'),
    sections: [
      {
        id: 'apps', title: t('Uber, 99 y taxi: qué puedes comprobar', 'Uber, 99 e táxi: o que dá para conferir', 'Uber, 99 and taxis: what you can check'),
        copy: t('Uber publica cobertura para Petrópolis. En 99, introduce origen y destino para comprobar si aparecen categoría y estimación para ese viaje. La posibilidad de solicitar no asegura que haya conductor cerca. Si tienes horario fijo o varias cancelaciones, pide al alojamiento, terminal o restaurante que te indique un punto autorizado de taxi o reserva un traslado.',
          'A Uber publica cobertura em Petrópolis. Na 99, informe origem e destino para ver se há categoria e estimativa para aquela corrida. Poder solicitar não garante motorista por perto. Se tiver horário marcado ou cancelamentos repetidos, peça à hospedagem, à rodoviária ou ao restaurante indicação de ponto autorizado de táxi ou reserve um traslado.',
          'Uber lists Petrópolis as a service area. In 99, enter your pickup and destination to see whether a category and estimate appear for that ride. The ability to request does not guarantee a nearby driver. If you have a fixed deadline or repeated cancellations, ask your accommodation, the station or the restaurant for an authorised taxi rank or book a transfer.'),
      },
      {
        id: 'embarque', title: t('Cómo pedir el vehículo y evitar un pin equivocado', 'Como pedir o carro e evitar pin no lugar errado', 'How to request a car and avoid the wrong pin'),
        copy: t('Escribe el nombre del lugar y el número, amplía el mapa y mueve el pin a la acera del acceso real. Elige una entrada donde se pueda parar y escribe una referencia breve en el chat del app. En el Centro, utiliza una puerta o plaza reconocible en vez de marcar el edificio desde la calle de atrás. Confirma destino, categoría, espera y pago antes de solicitar.',
          'Digite nome e número, amplie o mapa e ajuste o pin para a calçada da entrada real. Escolha um local onde o carro possa parar e escreva uma referência curta no chat do app. No Centro, use uma porta ou praça reconhecível em vez de marcar o prédio pela rua de trás. Confira destino, categoria, espera e pagamento antes de pedir.',
          'Enter the venue name and street number, zoom in and move the pin to the pavement at the actual entrance. Choose a place where the car can stop and send a short landmark in the app chat. Downtown, use a recognisable door or square instead of pinning the back of a building. Check destination, category, wait and payment before requesting.'),
        map: 'Praça Dom Pedro II, Petrópolis, RJ',
      },
      {
        id: 'rodoviaria', title: t('Bingen: desde la rodoviaria con maletas', 'Bingen: saindo da rodoviária com malas', 'Bingen: leaving the bus station with luggage'),
        copy: t('Busca Terminal Rodoviário Governador Leonel Brizola. Ya con el equipaje, confirma qué puerta indica el mapa y acuerda el lado de recogida con el conductor. Si viajas hacia Río con pasaje comprado, pide el auto con margen y selecciona la rodoviaria de Bingen, no Terminal Centro. Si el app no encuentra conductor, pregunta al personal por el punto de taxi.',
          'Busque Terminal Rodoviário Governador Leonel Brizola. Com as malas em mãos, confira qual saída aparece no mapa e combine o lado de embarque com o motorista. Se for ao Rio com passagem comprada, peça o carro com folga e selecione a rodoviária do Bingen, não o Terminal Centro. Se não houver motorista no app, pergunte à equipe pelo ponto de táxi.',
          'Search for Terminal Rodoviário Governador Leonel Brizola. Once you have your bags, confirm the exit shown in the map and agree on the pickup side with the driver. For a booked coach to Rio, leave a buffer and select Bingen station, not Terminal Centro. If the app cannot find a driver, ask staff for the taxi rank.'),
        map: bingen,
      },
      {
        id: 'distritos', title: t('Quitandinha, Itaipava y salidas hacia los valles', 'Quitandinha, Itaipava e saídas para os vales', 'Quitandinha, Itaipava and trips into the valleys'),
        copy: t('En Quitandinha confirma si tu entrada es el Sesc, el acceso residencial o el lago. En Itaipava pide la puerta exacta del parque, hotel o restaurante. Para Bonfim, Araras, Secretário o Vale das Videiras, guarda mapa y teléfono sin conexión, pregunta al anfitrión por señal y fija un punto de recogida. Si la vuelta es indispensable, acuerda el regreso antes de salir.',
          'No Quitandinha, confirme se a entrada é pelo Sesc, acesso residencial ou lago. Em Itaipava, peça a porta exata do parque, hotel ou restaurante. Para Bonfim, Araras, Secretário ou Vale das Videiras, salve mapa e telefone offline, pergunte ao anfitrião sobre sinal e marque um ponto de embarque. Se a volta for indispensável, combine antes de sair.',
          'In Quitandinha, confirm whether the entrance is the Sesc, a residential gate or the lakeside. In Itaipava, ask for the exact gate of the park, hotel or restaurant. For Bonfim, Araras, Secretário or Vale das Videiras, save the map and a phone number offline, ask your host about signal and agree on a pickup point. If the ride back is essential, arrange it before leaving.'),
        image: 'quitandinha', map: 'Centro Cultural Sesc Quitandinha, Petrópolis, RJ',
      },
      {
        id: 'precio', tone: 'ec-amber', title: t('Tarifa dinámica y pago', 'Tarifa dinâmica e pagamento', 'Dynamic pricing and payment'),
        copy: t('Consulta ambos apps con el mismo pin y destino. La estimación depende de disponibilidad, demanda y categoría; compárala de nuevo si cambias el trayecto o agregas paradas. Conserva el recibo y usa el método que figura en el viaje. Si tomas un taxi, pregunta antes por taxímetro o tarifa aplicable. Para un traslado privado, pide precio total y qué incluye.',
          'Consulte os dois apps com o mesmo pin e destino. A estimativa depende de oferta, demanda e categoria; confira de novo se mudar a rota ou acrescentar paradas. Guarde o recibo e use a forma de pagamento que aparece na corrida. No táxi, pergunte antes sobre taxímetro ou tarifa aplicável. Em traslado particular, peça valor total e inclusões.',
          'Check both apps using the same pin and destination. The estimate depends on supply, demand and category; check again if you change the route or add stops. Keep the receipt and use the payment method shown for the ride. For a taxi, ask about the meter or applicable fare before boarding. For a private transfer, get the total price and inclusions.'),
      },
      {
        id: 'seguridad', tone: 'ec-dark', title: t('De noche: verifica antes de entrar', 'À noite: confira antes de entrar', 'At night: verify before getting in'),
        copy: t('Espera en un lugar atendido o iluminado. Coteja matrícula, modelo y nombre o foto del conductor y usa el PIN si tu app lo ofrece y está activado. Comparte el viaje desde la plataforma y usa cinturón. Si los datos no coinciden, aléjate del vehículo, solicita otro y usa el soporte. Evita aceptar una oferta de viaje fuera del app de alguien que se acerca en la salida.',
          'Espere em local com atendimento ou iluminado. Confira placa, modelo e nome ou foto do motorista e use o PIN se o app oferecer e estiver ativado. Compartilhe a corrida pela plataforma e use cinto. Se os dados não baterem, afaste-se do carro, peça outro e use o suporte. Evite aceitar oferta de corrida fora do app de alguém que se aproxima na saída.',
          'Wait somewhere staffed or well lit. Match the plate, model and the driver’s name or photo, and use a PIN if your app offers it and it is enabled. Share the trip through the platform and buckle up. If details do not match, step away, request another car and use support. Avoid accepting off-app ride offers from people who approach you at the exit.'),
      },
      {
        id: 'familias', title: t('Equipaje, familias y grupos', 'Bagagem, famílias e grupos', 'Luggage, families and groups'),
        copy: t('El número de plazas no dice cuánto cabe en el maletero. Confirma espacio para maletas y cochecito. Si necesitas silla infantil o accesibilidad, indícalo antes de reservar y confirma que el vehículo está equipado. Para un grupo, una salida de madrugada o un vuelo, compara dos autos con un traslado reservado que confirme capacidad y hora.',
          'O número de assentos não indica quanto cabe no porta-malas. Confirme espaço para malas e carrinho. Se precisar de cadeirinha ou acessibilidade, avise antes de reservar e confirme que o veículo está equipado. Para grupo, saída de madrugada ou voo, compare dois carros com um traslado que confirme capacidade e horário.',
          'The number of seats does not tell you how much fits in the boot. Confirm room for bags and a stroller. If you need a child seat or accessible vehicle, specify it before booking and confirm the equipment. For a group, an early departure or a flight, compare two cars with a booked transfer that confirms capacity and pickup time.'),
      },
    ],
    faq: [
      [t('¿Cuánto cuesta Bingen–Centro?', 'Quanto custa Bingen–Centro?', 'What does Bingen to downtown cost?'),
        t('Simula el viaje con los puntos exactos para ver la estimación del momento. Pregunta en el punto autorizado si prefieres taxi.', 'Simule com os pontos exatos para ver a estimativa do momento. Pergunte no ponto autorizado se preferir táxi.', 'Enter both exact points for a live estimate. Ask at the authorised rank if you prefer a taxi.')],
      [t('¿Hay auto disponible para volver de Itaipava de noche?', 'Tem carro para voltar de Itaipava à noite?', 'Will there be a ride back from Itaipava at night?'),
        t('Depende del lugar y del momento. Consulta la vuelta y, si tienes hora fija, reserva un vehículo o acuerda un taxi con el establecimiento.', 'Depende do lugar e do horário. Consulte a volta e, se tiver hora marcada, reserve um carro ou combine táxi com o estabelecimento.', 'It depends on the place and time. Check the return and, if timing matters, book a car or arrange a taxi with the venue.')],
      [t('¿Qué hago si el conductor pide cancelar y seguir?', 'E se o motorista pedir para cancelar e seguir?', 'What if the driver asks me to cancel and continue?'),
        t('Mantén el viaje dentro del app o solicita otro vehículo. Usa el soporte si hubo un cobro o incidente.', 'Mantenha a corrida no app ou peça outro carro. Use o suporte se houve cobrança ou incidente.', 'Keep the trip in the app or request another car. Contact support if there was a charge or incident.')],
    ],
    sources: [
      ['https://www.uber.com/global/pt-br/r/cities/petropolis-rj-br/', 'Uber · Petrópolis'],
      ['https://99app.com/', '99 · App'],
      ['https://99app.com/seguranca/', '99 · Segurança'],
      ['https://99app.com/passageiro/perfil-do-motorista/', '99 · Perfil do motorista'],
      cptrans,
    ],
    related: 'vans/',
  },
};
