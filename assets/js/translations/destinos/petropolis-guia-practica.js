import { t } from './modelo.js';
import { petropolisMonths } from './petropolis-mes-a-mes.js';

const bingen = 'Terminal Rodoviário Governador Leonel Brizola, BR-040 km 82,9, Petrópolis, RJ';
const tourism = ['https://linktr.ee/turismo.petropolis', 'Turispetro · Secretaria de Turismo'];
const operator = ['https://unica-facil.com.br/pontos-de-venda/', 'Única/Fácil · Pontos de venda'];
const luggageListing = ['https://www.blablacar.com.br/bus/stations/petropolis-rj', 'BlaBlaCar · Rodoviária de Petrópolis'];
const museum = ['https://museuimperial.museus.gov.br/organize-sua-visita/', 'Museu Imperial · Organize sua visita'];
const cityHealth = ['https://smspetropolis.net.br/consulta/', 'Secretaria de Saúde · Petrópolis'];
const federalEmergency = ['https://www.gov.br/mcom/pt-br/noticias/2026/setembro/emergencia-voce-sabe-para-quem-ligar-quando-precisa-de-ajuda', 'Ministério das Comunicações · Telefones de emergência'];
const alert = ['https://www.gov.br/anatel/pt-br/dados/utilidade-publica/alertas-de-desastres/alerta-via-sms', 'Anatel · Alerta via SMS'];
const ibramAccess = ['https://www.gov.br/museus/pt-br/assuntos/legislacao-e-normas/outros-instrumentos-normativos/resolucao-normativa-ibram-no-31-de-25-de-novembro-de-2025', 'Ibram · Palácio Imperial'];
const sesc = ['https://cultura.sescrio.org.br/espacos-culturais/centro-cultural-sesc-quitandinha', 'Centro Cultural Sesc Quitandinha'];
const sescBowling = ['https://fecomercio-rj.portaldocomercio.org.br/sesc-rj/boliche-do-centro-cultural-sesc-quitandinha-e-reaberto-apos-reforma/', 'Fecomércio RJ · Boliche do Quitandinha'];
const operatorContact = ['https://unica-facil.com.br/contato/', 'Única/Fácil · Contato e SAC'];
const civilAlerts = ['https://www.gov.br/mdr/pt-br/assuntos/protecao-e-defesa-civil/alertas-de-desastres-1', 'Defesa Civil Nacional · Cadastro de alertas'];
const tourismInfo = ['https://www.pcvb.com.br/informacoes-turisticas', 'Convention Bureau · Centros de informação turística'];
const corrêasRoute = ['https://linhas-preview.cittamobi.com.br/linha/transporte_publico-Petropolis-TurpTransporteUrbano-600-T.CorreasxCentro-fdacc0e625d3', '600 · Corrêas → Centro / Cittamobi'];
const centroRoute = ['https://linhas-preview.cittamobi.com.br/linha/transporte_publico-Petropolis-TurpTransporteUrbano-500-CentroxT.CorreasviaEstradadaSaudade-ea566bc7a775', '500 · Centro → Corrêas / Cittamobi'];

export const practicalGuides = {
  'mes-a-mes': petropolisMonths,
  emergencias: {
    title: t('Salud y emergencias en Petrópolis', 'Saúde e emergências em Petrópolis', 'Health and emergencies in Petrópolis'),
    image: 'palacio-rio-negro',
    intro: t('Guarda los teléfonos de ayuda, ubica las unidades de urgencia y prepara un plan si hay alertas en la sierra.',
      'Salve os telefones de ajuda, localize as unidades de urgência e prepare um plano se houver alertas na serra.',
      'Save emergency numbers, locate urgent care facilities and plan what to do if mountain weather alerts are issued.'),
    tip: t('Yo guardaría en el teléfono el CEP, la dirección de mi alojamiento y la ubicación de la próxima parada. Así puedo decir exactamente dónde estoy aunque pierda la conexión.',
      'Eu salvaria no celular o CEP, o endereço da hospedagem e a localização da próxima parada. Assim consigo dizer onde estou mesmo sem internet.',
      'I’d save the postcode, accommodation address and next stop on my phone so I can tell someone exactly where I am even without data.'),
    sections: [
      {
        id: 'telefonos', title: t('A quién llamar', 'Para quem ligar', 'Who to call'),
        copy: t('192 para una urgencia médica (SAMU), 193 para bomberos y rescate, 190 para una emergencia policial y 199 para Defensa Civil. El 180 orienta sobre violencia contra las mujeres. Si hay peligro inmediato, llama al 190.',
          '192 para urgência médica (SAMU), 193 para Bombeiros e resgate, 190 para emergência policial e 199 para Defesa Civil. O 180 orienta sobre violência contra a mulher. Em perigo imediato, ligue 190.',
          'Call 192 for a medical emergency (SAMU), 193 for fire and rescue, 190 for a police emergency and 199 for Civil Defence. Call 180 for guidance on violence against women. In immediate danger, call 190.'),
        phones: [['192', 'SAMU'], ['193', t('Bomberos', 'Bombeiros', 'Fire and rescue')],
          ['190', t('Policía', 'Polícia', 'Police')], ['199', t('Defensa Civil', 'Defesa Civil', 'Civil Defence')]],
        links: [federalEmergency],
      },
      {
        id: 'centro', title: 'UPA Centro · Rua Washington Luiz, 600',
        copy: t('La Secretaría de Salud lista esta unidad de urgencias en el Centro. Guarda su ubicación si tu recorrido es por el casco histórico. Ante una urgencia médica, llama al 192 y sigue las indicaciones del servicio.',
          'A Secretaria de Saúde lista esta unidade de urgência no Centro. Salve a localização se o passeio for pelo Centro Histórico. Em urgência médica, ligue 192 e siga as orientações do serviço.',
          'The Health Department lists this urgent care unit downtown. Save its location if your itinerary is in the historic centre. In a medical emergency, call 192 and follow the service’s instructions.'),
        map: 'UPA Centro, Rua Washington Luiz 600, Petrópolis, RJ',
        links: [['https://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=3303906909663', 'CNES · UPA Centro']],
      },
      {
        id: 'cascatinha', title: 'UPA Cascatinha · Rua Bernardo Proença, 500',
        copy: t('Referencia municipal para Cascatinha. Si pides ayuda desde un barrio vecino, da tu propia dirección y un punto visible en vez de indicar solo el nombre del distrito.',
          'Referência municipal em Cascatinha. Se pedir ajuda de um bairro vizinho, dê seu endereço e uma referência visível, além do nome do distrito.',
          'A municipal unit in Cascatinha. If calling from a nearby neighbourhood, give your exact address and a visible landmark as well as the district name.'),
        map: 'UPA Cascatinha, Rua Bernardo Proença 500, Petrópolis, RJ',
        links: [['https://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=3303906922597', 'CNES · UPA Cascatinha']],
      },
      {
        id: 'itaipava', title: 'UPA Itaipava · Estrada União e Indústria, 11755',
        copy: t('Si estás en Itaipava o en un valle, guarda el nombre de la posada, número de la carretera o entrada de la propiedad. La Secretaría de Salud indica atención continua en las tres UPA.',
          'Se estiver em Itaipava ou em um vale, salve o nome da pousada, o número na estrada ou a entrada da propriedade. A Secretaria de Saúde informa atendimento contínuo nas três UPAs.',
          'If staying in Itaipava or a valley, save the guesthouse name, road number or property entrance. The Health Department lists all three urgent care units as open around the clock.'),
        map: 'UPA Itaipava, Estrada União e Indústria 11755, Petrópolis, RJ',
        links: [['https://cnes2.datasus.gov.br/Mod_Conjunto.asp?VCo_Unidade=3303900068519', 'CNES · UPA Itaipava']],
      },
      {
        id: 'lluvia', title: t('Alerta de lluvia y regreso', 'Alerta de chuva e volta', 'Rain alerts and the return journey'),
        copy: t('En Brasil puedes enviar por SMS el CEP del lugar al 40199 para recibir alertas. Si hay una advertencia, sigue a Defensa Civil y consulta al operador antes de salir. Evita cruzar calles inundadas y respeta los cierres. Si estás en riesgo inmediato, pide ayuda desde un lugar seguro.',
          'No Brasil, você pode enviar por SMS o CEP do local ao 40199 para receber alertas. Se houver aviso, siga a Defesa Civil e consulte a operadora antes de sair. Evite atravessar ruas alagadas e respeite interdições. Em risco imediato, peça ajuda de um local seguro.',
          'In Brazil you can text the local postcode to 40199 to receive alerts. If a warning is issued, follow Civil Defence and check with your transport operator before leaving. Avoid flooded roads and respect closures. In immediate danger, seek help from a safe location.'),
        links: [alert],
      },
      {
        id: 'mensaje', title: t('Qué decir al pedir ayuda', 'O que dizer ao pedir ajuda', 'What to say when calling for help'),
        copy: t('Di primero “Estou em Petrópolis, no bairro…” y da calle, número, referencia y un teléfono de devolución. Explica qué pasó y cuántas personas necesitan ayuda. Para una consulta que pueda esperar, pregunta a tu aseguradora o al servicio de salud qué unidad corresponde.',
          'Diga primeiro “Estou em Petrópolis, no bairro…” e informe rua, número, referência e telefone para retorno. Explique o que aconteceu e quantas pessoas precisam de ajuda. Para uma consulta que possa esperar, pergunte ao seguro ou ao serviço de saúde qual unidade procurar.',
          'Start with “Estou em Petrópolis, no bairro…” and give the street, number, landmark and callback number. Explain what happened and how many people need help. For a non-urgent consultation, ask your insurer or the health service which facility to use.'),
      },
      {
        id: 'alertas-multiples', title: t('Alertas de Defensa Civil: SMS y WhatsApp', 'Alertas da Defesa Civil: SMS e WhatsApp', 'Civil Defence alerts: SMS and WhatsApp'),
        copy: t('Registra el CEP de la zona donde dormirás enviándolo por SMS al 40199. Puedes mandar CONSULTAR para ver los CEP registrados y AYUDA para recibir instrucciones. La Defensa Civil federal también ofrece un asistente por WhatsApp en el número +55 61 2034-4611: escribe “olá” y elige las áreas de interés. Los avisos complementan, pero no reemplazan, las instrucciones locales en una emergencia. Para ayuda inmediata en un desastre llama al 199.',
          'Cadastre o CEP da região onde ficará por SMS ao 40199. Envie CONSULTAR para ver CEPs cadastrados e AJUDA para obter instruções. A Defesa Civil Nacional também oferece atendimento automático pelo WhatsApp +55 61 2034-4611: mande “olá” e escolha as áreas de interesse. Alertas não substituem orientações locais durante emergências. Para ajuda imediata em desastre, ligue 199.',
          'Register the postcode where you are staying by texting it to 40199. Send CONSULTAR to list registered postcodes and AJUDA for instructions. Brazil’s Civil Defence also offers a WhatsApp alert bot at +55 61 2034-4611: send “olá” and select your areas of interest. Alerts do not replace instructions from local authorities. Call 199 for immediate civil-defence help.'),
        phones: [['199', 'Defesa Civil']], links: [civilAlerts],
      },
      {
        id: 'chuva-serra', title: t('Si llueve fuerte en la sierra', 'Se chover forte na serra', 'When heavy rain hits the mountains'),
        copy: t('Si hay aviso de lluvia intensa, evita riberas, taludes y escaleras expuestas, no cruces agua en movimiento ni conduzcas por vías inundadas. Si la autoridad recomienda evacuar, sigue la ruta que indique Defensa Civil en lugar de improvisar un regreso a Río. Avisa al alojamiento y al operador del traslado; en caso de peligro inmediato busca un lugar seguro y llama al servicio que corresponda.',
          'Com aviso de chuva intensa, evite margens de rios, encostas e escadarias expostas; não atravesse água corrente nem dirija em vias alagadas. Se houver orientação de evacuação, siga a rota da Defesa Civil em vez de improvisar retorno ao Rio. Avise a hospedagem e a transportadora; em perigo imediato busque local seguro e acione a emergência adequada.',
          'During heavy-rain warnings avoid riverbanks, slopes and exposed steps; never cross moving water or drive through flooded roads. If authorities advise evacuation, follow Civil Defence routes rather than improvising a return to Rio. Tell your accommodation and transport provider; seek safety and contact emergency services when in danger.'),
        links: [civilAlerts],
      },
    ],
    faq: [
      [t('¿Qué guardo antes de salir de la ciudad hacia un distrito?', 'O que salvar antes de sair para um distrito?', 'What should I save before heading to an outlying district?'),
        t('La dirección completa, el CEP, un mapa sin conexión y los contactos del lugar, el traslado y tu seguro.', 'Endereço completo, CEP, mapa offline e contatos do local, do traslado e do seguro.', 'The full address, postcode, offline map and contacts for the venue, transfer and insurer.')],
    ],
    sources: [cityHealth, federalEmergency, alert],
    relatedLinks: [
      ['guia/mes-a-mes/', t('Clima mes a mes', 'Clima mês a mês', 'Month-by-month weather')],
      ['guia/terminales/', t('Terminal de Bingen', 'Rodoviária do Bingen', 'Bingen bus station')],
    ],
  },
  accesibilidad: {
    title: t('Accesibilidad en Petrópolis', 'Acessibilidade em Petrópolis', 'Accessibility in Petrópolis'),
    image: 'cristal',
    intro: t('Organiza una visita según las pendientes, el punto de bajada y los accesos reales de cada edificio.',
      'Organize uma visita conforme as ladeiras, o desembarque e os acessos reais de cada prédio.',
      'Plan a visit around slopes, drop-off points and the actual entrances to each building.'),
    tip: t('Yo confirmaría con el lugar el recorrido desde la calle hasta el baño y la sala que quiero visitar. Después armaría un día de una parada principal y otra opcional.',
      'Eu confirmaria com o local o caminho da rua até o banheiro e a sala que quero visitar. Depois montaria um dia com uma parada principal e outra opcional.',
      'I’d confirm the route from the street to the toilet and the room I want to see, then plan one main stop and an optional second one.'),
    sections: [
      {
        id: 'imperial', title: 'Museu Imperial · Rua da Imperatriz, 220',
        copy: t('El Ibram documenta rampas en la entrada principal y una plataforma elevadora para acceder al interior del palacio, incluida la planta alta. Antes de ir, confirma si la plataforma está operativa, el acceso desde el punto de descenso y dónde está el baño accesible.',
          'O Ibram documenta rampas na entrada principal e plataforma elevatória para acesso ao interior do palácio, incluindo o sobrado. Antes de ir, confirme se a plataforma funciona, o trajeto desde o desembarque e onde fica o banheiro acessível.',
          'Ibram documents ramps at the main entrance and a lifting platform for wheelchair access inside the palace, including upstairs. Before visiting, confirm the platform is operating, the route from drop-off and where the accessible toilet is.'),
        map: 'Museu Imperial, Rua da Imperatriz 220, Petrópolis, RJ', image: 'museu', links: [ibramAccess],
      },
      {
        id: 'quitandinha', title: 'Centro Cultural Sesc Quitandinha',
        copy: t('Fecomércio RJ documenta rampas y un baño accesible en el sector del boliche remodelado. Pregunta al Sesc por la entrada y las condiciones de la sala o actividad que te interesa, porque ese dato corresponde al boliche.',
          'A Fecomércio RJ documenta rampas e banheiro acessível no boliche reformado. Pergunte ao Sesc pela entrada e pelas condições da sala ou atividade de interesse, pois a informação se refere ao boliche.',
          'Fecomércio RJ documents ramps and an accessible toilet in the refurbished bowling area. Ask Sesc about the entrance and conditions for your specific room or activity, since this information applies to bowling.'),
        map: 'Centro Cultural Sesc Quitandinha, Petrópolis, RJ', links: [sescBowling],
      },
      {
        id: 'centro', title: t('Aceras, pendientes y descansos en el Centro', 'Calçadas, ladeiras e pausas no Centro', 'Pavements, slopes and breaks downtown'),
        copy: t('Elige un tramo corto cerca de Rua da Imperatriz y Avenida Koeler. Revisa cruces, escalones y acera antes de sumar paradas. Si te interesa la Casa de Santos Dumont, pregunta por la pendiente de llegada y por cuáles ambientes se pueden visitar con tu equipo.',
          'Escolha um trecho curto perto da Rua da Imperatriz e da Avenida Koeler. Confira travessias, degraus e calçada antes de somar paradas. Se quiser a Casa de Santos Dumont, pergunte pela ladeira de chegada e pelos ambientes que pode visitar com seu equipamento.',
          'Choose a short stretch near Rua da Imperatriz and Avenida Koeler. Check crossings, steps and pavements before adding stops. For the Santos Dumont house, ask about the slope on approach and which rooms suit your equipment.'),
        map: 'Avenida Koeler, Petrópolis, RJ', route: 'cultura/casa-santos-dumont/',
      },
      {
        id: 'vehiculo', title: t('Autobús, traslado y punto de descenso', 'Ônibus, traslado e desembarque', 'Buses, transfers and drop-off'),
        copy: t('Si necesitas embarcar en silla de ruedas, confirma el vehículo de la salida exacta y la ayuda disponible en ambas terminales. En un traslado, comunica peso y dimensiones del equipo, si puedes transferirte de asiento y el acceso que necesitas al llegar.',
          'Se precisar embarcar em cadeira de rodas, confirme o veículo da saída escolhida e o apoio nas duas rodoviárias. Em traslado, informe peso e dimensões do equipamento, se pode trocar de assento e o acesso necessário na chegada.',
          'If you need to board in a wheelchair, confirm the vehicle for your exact departure and assistance at both stations. For a transfer, specify equipment weight and dimensions, whether you can transfer to a seat and what access you need at drop-off.'),
        route: 'guia/terminales/',
      },
      {
        id: 'otras-necesidades', title: t('Cochecito, baja visión o sensibilidad al ruido', 'Carrinho, baixa visão ou sensibilidade a ruído', 'Strollers, low vision and noise sensitivity'),
        copy: t('Pregunta si puedes entrar con cochecito y si hay un lugar para dejarlo durante la visita. Si te ayuda, consulta por material en letra grande, acompañamiento, interpretación o franjas tranquilas. Guarda el contacto del lugar y pide confirmación para la fecha.',
          'Pergunte se pode entrar com carrinho e se há lugar para deixá-lo durante a visita. Se for útil, consulte sobre letra ampliada, acompanhamento, interpretação ou horários mais tranquilos. Salve o contato e peça confirmação para a data.',
          'Ask whether strollers are allowed inside and where you can leave one during a visit. If helpful, ask about large-print material, guided assistance, interpreting or quieter times. Save the venue’s contact and confirm for your date.'),
      },
      {
        id: 'acceso-oficial', title: t('Entrada accesible del Museu Imperial: confirmación oficial', 'Entrada acessível do Museu Imperial: confirmação oficial', 'Imperial Museum: official accessible entrance'),
        copy: t('La página oficial del Museu Imperial confirma entrada especial con rampa para personas usuarias de silla de ruedas o con dificultad de movilidad y recomienda solicitar ayuda al personal de seguridad. La normativa Ibram documenta además una plataforma elevadora, pero eso no garantiza que esté operativa en el momento de tu visita. Contacta antes de ir y pregunta por la ruta accesible exacta, los baños y las salas que podrás conocer.',
          'O site oficial do Museu Imperial confirma entrada especial com rampa para cadeirantes e pessoas com dificuldade de locomoção, com apoio dos seguranças. Norma do Ibram também registra plataforma elevatória, mas isso não garante funcionamento no momento da visita. Confirme antes o trajeto acessível, banheiros e salas disponíveis.',
          'The Imperial Museum’s official visitor page confirms a special ramped entrance for wheelchair users and visitors with mobility difficulties, with staff assistance. Ibram regulations also document a lifting platform, but do not guarantee it will operate on your visit. Ask ahead about the exact step-free route, toilets and rooms available.'),
        map: 'Museu Imperial, Rua da Imperatriz 220, Centro, Petrópolis, RJ',
        links: [museum, ibramAccess],
      },
      {
        id: 'ruta-amable', title: t('Un itinerario de menor esfuerzo, sin promesas de accesibilidad total', 'Um roteiro de menor esforço, sem prometer acessibilidade total', 'A lower-effort route without promising full access'),
        copy: t('Como base elige Rua da Imperatriz y la zona de Praça Dom Pedro II, pero comprueba cada cruce y acera. Reserva el Museu Imperial como visita principal con acceso coordinado, y añade como alternativa un exterior próximo de Avenida Koeler solo si el pavimento y la distancia sirven para tus necesidades. Quitandinha, la Casa Santos Dumont y los valles requieren planificación independiente por sus desniveles y traslados.',
          'Use a Rua da Imperatriz e a região da Praça Dom Pedro II como referência, mas confira cada travessia e calçada. Planeje o Museu Imperial como visita principal com acesso confirmado e considere um trecho externo da Avenida Koeler apenas se piso e distância servirem às suas necessidades. Quitandinha, Casa Santos Dumont e os vales exigem planejamento separado pelas ladeiras e deslocamentos.',
          'Base yourself near Rua da Imperatriz and Praça Dom Pedro II but verify each crossing and pavement. Make the Imperial Museum your main stop with access arranged, adding nearby Avenida Koeler only if its surface and distance suit your needs. Quitandinha, Santos Dumont’s house and the valleys require separate planning for slopes and transfers.'),
        map: 'Praça Dom Pedro II, Centro, Petrópolis, RJ',
        route: 'barrios/centro-historico/',
      },
    ],
    faq: [
      [t('¿Puedo dar por hecho que toda la atracción es accesible?', 'Posso contar com acesso a toda a atração?', 'Can I assume the whole venue is accessible?'),
        t('Confirma cada tramo que necesitas: desde el vehículo hasta la entrada, las salas que quieres recorrer y los baños. Guarda un plan alternativo cercano.', 'Confirme cada trecho de que precisa: do veículo à entrada, as salas que quer visitar e os banheiros. Tenha um plano alternativo próximo.', 'Confirm each leg you need: vehicle to entrance, the rooms you want to visit and toilets. Keep a nearby backup plan.')],
    ],
    sources: [museum, ibramAccess, sesc, sescBowling],
    relatedLinks: [['transportes/uber/', t('Uber, 99 y taxis', 'Uber, 99 e táxis', 'Uber, 99 and taxis')]],
  },
  'guarda-equipaje': {
    title: t('Dónde guardar maletas en Petrópolis', 'Onde guardar malas em Petrópolis', 'Luggage storage in Petrópolis'),
    image: 'casa-ipiranga',
    intro: t('Qué preguntar antes del check-in, después del check-out o durante una visita en autobús con equipaje.',
      'O que perguntar antes do check-in, depois do check-out ou durante uma visita de ônibus com bagagem.',
      'What to ask before check-in, after check-out or on a coach trip with luggage.'),
    tip: t('Yo confirmaría el depósito antes de comprar el regreso. Para un día sin alojamiento, viajaría con mochila pequeña o pactaría por escrito dónde y a qué hora puedo retirar la maleta.',
      'Eu confirmaria onde guardar a bagagem antes de comprar a volta. Para um bate-volta sem hospedagem, viajaria com mochila pequena ou combinaria por escrito onde e quando retirar a mala.',
      'I’d confirm storage before buying the return ticket. On a day trip without accommodation, I’d take a small backpack or get written confirmation of where and when I can collect my bag.'),
    sections: [
      {
        id: 'alojamiento', title: t('Antes del check-in y después del check-out', 'Antes do check-in e depois do check-out', 'Before check-in and after check-out'),
        copy: t('Pregunta a tu alojamiento si recibe equipaje de huéspedes fuera del horario de la habitación. Aclara cuántas piezas, tamaño, costo, dónde se guardan y hasta qué hora puedes volver. Si hay recepción con horario limitado, acuerda por escrito quién entrega la maleta.',
          'Pergunte à hospedagem se recebe bagagem de hóspedes fora do horário do quarto. Confirme número de volumes, tamanho, custo, local e até que horas pode voltar. Se a recepção tiver horário limitado, combine por escrito quem entrega a mala.',
          'Ask your accommodation if it holds guests’ luggage outside room hours. Confirm the number and size of bags, cost, storage location and collection time. If reception has limited hours, get written confirmation of who will hand it back.'),
      },
      {
        id: 'bingen', title: t('Si llegas o sales por Bingen', 'Se chegar ou sair pelo Bingen', 'Arriving or leaving via Bingen'),
        copy: t('BlaBlaCar menciona un guarda-volúmenes en la terminal. La ficha de Única/Fácil identifica los guichés, pero no publica horarios ni tarifas de ese depósito. Confirma con la terminal o el operador que funciona el día de tu viaje, dónde se encuentra y a qué hora cierra. El equipaje que viaja en la bodega del bus se gestiona con el pasaje y la empresa.',
          'A BlaBlaCar menciona guarda-volumes no terminal. A Única/Fácil identifica os guichês, mas não publica horários nem tarifas desse serviço. Confirme com a rodoviária ou a operadora se funciona no dia da viagem, onde fica e a que horas fecha. A bagagem que viaja no bagageiro é tratada com a passagem e a empresa.',
          'BlaBlaCar lists luggage storage at the station. Única/Fácil lists its ticket counters but does not publish storage hours or fees. Ask the station or operator to confirm it is available on your travel date, where it is and when it closes. Baggage that travels in the coach hold is handled with your ticket and operator.'),
        map: bingen, route: 'guia/terminales/',
      },
      {
        id: 'museos', title: t('Museos y centros culturales', 'Museus e centros culturais', 'Museums and cultural venues'),
        copy: t('Antes de llegar con maleta, pregunta por tamaño permitido y política de bultos. Si el lugar recibe bolsos durante la visita, confirma si admite equipaje grande y el plazo de retiro. Organiza por separado la custodia necesaria para el resto del día.',
          'Antes de chegar com mala, pergunte pelo tamanho permitido e pela política de volumes. Se o local recebe bolsas durante a visita, confirme se aceita mala grande e o prazo de retirada. Organize separadamente a guarda necessária para o restante do dia.',
          'Before arriving with a suitcase, ask about size limits and bag policies. If the venue takes bags during a visit, ask whether it accepts large luggage and when you must collect it. Arrange any storage you need for the rest of the day separately.'),
        links: [museum, sesc],
      },
      {
        id: 'retiro', title: t('Qué comprobar al dejar la maleta', 'O que conferir ao deixar a mala', 'What to check when dropping off a bag'),
        copy: t('Pide comprobante y fotografía la etiqueta. Confirma quién puede retirarla y qué ocurre si te atrasas. Lleva contigo documentos, medicación, dinero y objetos de valor. Deja tiempo para recuperar la maleta, llegar a Bingen y ubicar tu plataforma.',
          'Peça comprovante e fotografe a etiqueta. Confirme quem pode retirar a mala e o que acontece se você se atrasar. Leve consigo documentos, remédios, dinheiro e itens de valor. Deixe tempo para retirar a mala, chegar ao Bingen e encontrar a plataforma.',
          'Get a receipt and photograph the tag. Confirm who can collect it and what happens if you are late. Keep documents, medication, money and valuables with you. Allow time to collect your bag, reach Bingen and find your platform.'),
      },
      {
        id: 'portugues', title: t('Qué preguntar en portugués', 'O que perguntar em português', 'What to ask in Portuguese'),
        copy: t('“Vocês guardam mala antes do check-in ou depois do check-out? Até que horas posso retirar? Tem custo e comprovante?” Para una maleta grande, añade las dimensiones y pregunta si debe reservarse.',
          '“Vocês guardam mala antes do check-in ou depois do check-out? Até que horas posso retirar? Tem custo e comprovante?” Para uma mala grande, informe as dimensões e pergunte se precisa reservar.',
          '“Vocês guardam mala antes do check-in ou depois do check-out? Até que horas posso retirar? Tem custo e comprovante?” This asks whether bags can be stored outside check-in or check-out, the collection time, cost and receipt. Give dimensions for a large bag.'),
      },
      {
        id: 'verificar-deposito', title: t('No cuentes con una consigna sin confirmación', 'Não conte com guarda-volumes sem confirmação', 'Do not rely on luggage storage without confirmation'),
        copy: t('La información pública de BlaBlaCar menciona guarda-volúmenes en la Rodoviária do Bingen, pero el operador Única/Fácil no publica tarifa, localización ni horario de ese servicio. Esto no equivale a una reserva confirmada. Pregunta si hay depósito abierto el día exacto, si recibe maletas grandes, cuánto cobra, si entrega comprobante y hasta qué hora permite retirar. El SAC de Única/Fácil sirve como contacto del operador, no como garantía de que gestione ese depósito.',
          'A BlaBlaCar menciona guarda-volumes na Rodoviária do Bingen, mas a Única/Fácil não divulga preço, localização nem horário do serviço. Não é reserva garantida. Pergunte se funciona no dia exato, se aceita mala grande, preço, comprovante e limite de retirada. O SAC da Única/Fácil é contato da transportadora, não garantia de gestão do depósito.',
          'BlaBlaCar mentions luggage storage at Bingen station, but Única/Fácil does not publish its fee, location or hours. That is not a confirmed reservation. Ask whether it operates on your date, accepts large bags, issues receipts and has a collection deadline. The coach operator’s customer service is a contact point, not a guarantee that it runs the facility.'),
        map: bingen, links: [operator, operatorContact, luggageListing],
      },
      {
        id: 'dia-sin-hotel', title: t('Si visitas Petrópolis solamente por el día', 'Se vier a Petrópolis apenas por um dia', 'If you are visiting Petrópolis for the day'),
        copy: t('La alternativa más segura es viajar con mochila pequeña. Si llevas una maleta, confirma por escrito un depósito antes de salir de Río; no la dejes en restaurantes, atracciones ni vehículos sin acuerdo expreso. Para ir al Centro desde Bingen existe el autobús 100; no confundas su destino con el Terminal Corrêas de la línea 150. Reserva margen para volver, retirar la pieza y embarcar.',
          'A alternativa mais segura é levar mochila pequena. Com mala, confirme por escrito um serviço de guarda antes de sair do Rio; não a deixe em restaurante, atração nem veículo sem acordo expresso. Do Bingen ao Centro há a linha 100; não a confunda com a 150 para Terminal Corrêas. Reserve tempo para voltar, retirar o volume e embarcar.',
          'The simplest plan is a small daypack. If taking a suitcase, arrange storage in writing before leaving Rio; do not leave luggage at a restaurant, attraction or vehicle without explicit agreement. Route 100 links Bingen with downtown; 150 goes to Terminal Corrêas. Allow enough time to return, collect your bag and board your coach.'),
        route: 'transportes/onibus/',
      },
    ],
    faq: [
      [t('¿Qué hago si nadie confirma depósito?', 'E se ninguém confirmar guarda de bagagem?', 'What if nobody confirms storage?'),
        t('Viaja con lo mínimo o cambia el orden de las paradas para dejar el equipaje en el alojamiento antes de empezar el paseo.', 'Viaje com o mínimo ou mude a ordem das paradas para deixar a bagagem na hospedagem antes do passeio.', 'Travel light or rearrange your stops to leave the bag at your accommodation before sightseeing.')],
    ],
    sources: [operator, luggageListing, museum, sesc, tourism],
    relatedLinks: [['guia/terminales/', t('Terminal de Bingen', 'Rodoviária do Bingen', 'Bingen bus station')]],
  },
  terminales: {
    title: t('Terminal de Bingen en Petrópolis', 'Rodoviária do Bingen em Petrópolis', 'Bingen bus station in Petrópolis'),
    image: 'terminal-bingen',
    intro: t('Dónde se encuentra la rodoviaria intermunicipal, cómo comprar el pasaje y cómo seguir al Centro, Corrêas o Quitandinha.',
      'Onde fica a rodoviária intermunicipal, como comprar a passagem e como seguir para o Centro, Corrêas ou Quitandinha.',
      'Where to find the intercity station, how to buy a ticket and how to continue to downtown, Corrêas or Quitandinha.'),
    tip: t('Yo guardaría dos mapas: la Rodoviária Leonel Brizola y la primera parada de mi visita. Para volver a Río, separaría el tiempo de traslado urbano del tiempo para retirar el equipaje y embarcar.',
      'Eu salvaria dois mapas: a Rodoviária Leonel Brizola e a primeira parada da visita. Na volta para o Rio, separaria o tempo de deslocamento urbano do tempo para pegar a bagagem e embarcar.',
      'I’d save two maps: Leonel Brizola station and the first stop on my itinerary. Returning to Rio, I’d budget separately for the local ride, collecting luggage and boarding.'),
    sections: [
      {
        id: 'ubicacion', title: t('La estación intermunicipal y el Terminal Centro', 'A rodoviária intermunicipal e o Terminal Centro', 'The intercity station and Terminal Centro'),
        copy: t('La terminal se llama Terminal Rodoviário Governador Leonel Brizola y se conoce como Rodoviária do Bingen. Única/Fácil publica la dirección BR-040, km 82,9, Capela. Para un auto o taxi, selecciona ese nombre completo y confirma el acceso.',
          'O terminal se chama Terminal Rodoviário Governador Leonel Brizola e é conhecido como Rodoviária do Bingen. A Única/Fácil publica o endereço BR-040, km 82,9, Capela. Para carro ou táxi, selecione o nome completo e confirme o acesso.',
          'The Terminal Rodoviário Governador Leonel Brizola is known as Bingen station. Única/Fácil lists its address as BR-040, km 82.9, Capela. For an app ride or taxi, choose the full station name and confirm the entrance.'),
        map: bingen,
      },
      {
        id: 'pasaje', title: t('Ventanillas, pasajes y plataforma', 'Guichês, passagens e plataforma', 'Ticket counters, tickets and platform'),
        copy: t('Única/Fácil indica los guichés 01, 02 y 06 en Bingen. Publica atención de 04:00 a 22:30 de lunes a viernes, y de 04:30 a 22:00 los sábados, domingos y feriados. Son horarios de atención de sus ventanillas. Para viajar, consulta la salida y el origen y destino en tu pasaje, y verifica la plataforma en la terminal.',
          'A Única/Fácil indica os guichês 01, 02 e 06 no Bingen. Publica atendimento de 04:00 a 22:30 de segunda a sexta e de 04:30 a 22:00 aos sábados, domingos e feriados. São horários dos guichês. Para viajar, confira partida, origem e destino na passagem e confirme a plataforma na rodoviária.',
          'Única/Fácil lists counters 01, 02 and 06 at Bingen, open 04:00–22:30 weekdays and 04:30–22:00 on weekends and public holidays. Those are the operator’s counter hours. Check departure time, origin and destination on your ticket and confirm the platform at the station.'),
        links: [operator],
      },
      {
        id: 'conexiones', title: t('Bingen → Centro, Corrêas o Quitandinha', 'Bingen → Centro, Corrêas ou Quitandinha', 'Bingen → downtown, Corrêas or Quitandinha'),
        copy: t('Para el Centro, consulta la 100 con destino Centro. Para Corrêas, comprueba la 150 con destino Terminal Corrêas. Si vas a Quitandinha, compara la conexión urbana para tu fecha con taxi o app directo, especialmente si llegas con equipaje. El cuadro enlazado separa los sentidos de las líneas 100 y 150.',
          'Para o Centro, consulte a 100 com destino Centro. Para Corrêas, confira a 150 com destino Terminal Corrêas. Para Quitandinha, compare a conexão urbana no dia com táxi ou app direto, sobretudo com malas. O quadro vinculado separa os sentidos das linhas 100 e 150.',
          'For downtown, check the 100 towards Centro. For Corrêas, check the 150 towards Terminal Corrêas. For Quitandinha, compare local connections on your date with a direct taxi or app ride, especially with luggage. The linked route guide separates the directions of the 100 and 150.'),
        route: 'transportes/vans/#trayectos',
      },
      {
        id: 'aeropuertos', title: t('Si vienes de GIG o SDU', 'Se você vem do GIG ou do SDU', 'Coming from GIG or SDU'),
        copy: t('Verifica si tu itinerario requiere cambiar de vehículo en Río. Si compras un bus desde Novo Rio, incluye en el cálculo la salida del aeropuerto, el traslado a la terminal y el tiempo para embarcar. Para un traslado reservado, comunica terminal aérea, vuelo y cantidad de piezas.',
          'Confira se seu itinerário exige trocar de veículo no Rio. Se comprar ônibus saindo da Novo Rio, calcule a saída do aeroporto, o traslado até a rodoviária e o tempo para embarcar. Para traslado reservado, informe terminal aéreo, voo e quantidade de volumes.',
          'Check whether your itinerary requires a vehicle change in Rio. If booking a coach from Novo Rio, allow for leaving the airport, getting to the coach station and boarding. For a booked transfer, give the airport terminal, flight and number of bags.'),
        route: 'guia/llegada/',
      },
      {
        id: 'embarque', title: t('Equipaje, asistencia y recogida nocturna', 'Bagagem, assistência e embarque à noite', 'Luggage, assistance and late pickups'),
        copy: t('Confirma con la empresa las condiciones de equipaje y la asistencia para tu salida. Si te recoge un auto, acuerda puerta y lado de embarque y compara matrícula y conductor. Para hacer una visita entre dos buses, revisa primero dónde podrás guardar la maleta.',
          'Confirme com a empresa as regras de bagagem e a assistência para sua saída. Se um carro buscar você, combine porta e lado de embarque e confira placa e motorista. Para passear entre dois ônibus, confira antes onde guardar a mala.',
          'Confirm baggage rules and assistance for your departure with the operator. For a car pickup, agree the door and pickup side and check the plate and driver. If sightseeing between buses, check where you can store your bag first.'),
        route: 'guia/guarda-equipaje/',
      },
      {
        id: 'terminal-centro', title: t('Centro: dónde conectar sin volver a Bingen', 'Centro: onde fazer conexão sem voltar ao Bingen', 'Downtown: transfer without returning to Bingen'),
        copy: t('Las líneas urbanas hacia Corrêas e Itaipava no obligan a regresar a la rodoviaria intermunicipal. Desde Rua Paulo Barbosa, 288, en el Centro, sale la línea 500 hacia Terminal Corrêas por Estrada da Saudade; la 700 comunica el Centro con Terminal Itaipava. Verifica el sentido exacto del cartel, parada y horario del día: no todos los buses llamados “Petrópolis” terminan en el mismo terminal.',
          'As linhas urbanas para Corrêas e Itaipava não exigem retorno à rodoviária intermunicipal. Da Rua Paulo Barbosa, 288, no Centro, sai a linha 500 para Terminal Corrêas via Estrada da Saudade; a 700 liga Centro ao Terminal Itaipava. Confira o letreiro, o ponto e o horário do dia: nem todo ônibus identificado como “Petrópolis” termina no mesmo terminal.',
          'You do not need to return to Bingen intercity station to reach Corrêas or Itaipava. Route 500 departs from Rua Paulo Barbosa 288 downtown towards Terminal Corrêas via Estrada da Saudade, while route 700 connects downtown with Terminal Itaipava. Confirm the destination sign, stop and day-specific schedule.'),
        map: 'Rua Paulo Barbosa 288, Centro, Petrópolis, RJ, Brasil',
        links: [centroRoute],
      },
      {
        id: 'terminal-correas', title: 'Terminal Corrêas · Estrada União e Indústria, 1132',
        copy: t('El Terminal Corrêas —denominado oficialmente Terminal Luiz Caubi da Silva desde 2024— está en Estrada União e Indústria, 1132. Es punto de intercambio para la línea 150 desde Bingen, la 600 hacia Centro, la 611 hacia Bonfim y las 602/610 hacia Vale das Videiras y Araras. La 600 tiene 36 paradas hacia el Centro según el itinerario consultado. Confirma las plataformas y las últimas salidas: no son el mismo dato que el horario de atención de una ventanilla.',
          'O Terminal Corrêas, denominado oficialmente Terminal Luiz Caubi da Silva desde 2024, fica na Estrada União e Indústria, 1132. É conexão da 150 vindo do Bingen, da 600 ao Centro, da 611 ao Bonfim e das 602/610 ao Vale das Videiras e Araras. A 600 tem 36 pontos até o Centro no itinerário consultado. Confira plataformas e últimas partidas: isso não é o horário de um guichê.',
          'Terminal Corrêas, officially named Terminal Luiz Caubi da Silva since 2024, is at Estrada União e Indústria 1132. It serves route 150 from Bingen, 600 towards downtown, 611 to Bonfim and 602/610 towards Vale das Videiras and Araras. The published 600 itinerary has 36 stops towards downtown. Check platforms and last departures independently of ticket-counter hours.'),
        map: 'Terminal Corrêas, Estrada União e Indústria 1132, Petrópolis, RJ, Brasil',
        links: [corrêasRoute],
      },
      {
        id: 'terminal-itaipava', title: t('Terminal Itaipava: puerta a los valles', 'Terminal Itaipava: porta para os vales', 'Terminal Itaipava: gateway to the valleys'),
        copy: t('La línea 700 conecta el Centro y Terminal Itaipava. Dentro del complejo se distinguen plataformas internas de las líneas 700/780 y un sector exterior para líneas alimentadoras; entre ellas 605 hacia Vale das Videiras y 617 hacia Araras. No supongas que el cambio de línea ocurre en la misma plataforma: busca el letrero, confirma la parada con el personal y guarda la hora de regreso antes de salir.',
          'A linha 700 liga o Centro ao Terminal Itaipava. O conjunto tem plataformas internas para 700/780 e setor externo para alimentadoras, entre elas 605 para Vale das Videiras e 617 para Araras. Não presuma que a troca ocorra na mesma plataforma: localize o letreiro, confirme o ponto com a equipe e salve o horário de volta.',
          'Route 700 links downtown with Terminal Itaipava. The interchange has internal platforms for routes 700/780 and external bays for feeder services including 605 to Vale das Videiras and 617 to Araras. Do not assume connections leave from the same platform: check signs, ask staff and save the return departure.'),
        map: 'Terminal Itaipava, Petrópolis, RJ, Brasil',
        route: 'transportes/entre-distritos/',
      },
      {
        id: 'informacion', title: t('Dónde pedir información turística', 'Onde buscar informação turística', 'Where to find visitor information'),
        copy: t('El Convention & Visitors Bureau publica puestos de información turística en la Rodoviária do Bingen, Palácio de Cristal y Praça da Liberdade, además de otros puntos. Para Bingen la referencia publicada es martes a sábado de 08:00 a 16:00, pero estos horarios pueden cambiar y no corresponden a la atención de Única/Fácil. Confirma el puesto antes de depender de él para hacer conexiones o guardar equipaje.',
          'O Convention & Visitors Bureau informa centros de atendimento turístico na Rodoviária do Bingen, Palácio de Cristal e Praça da Liberdade, entre outros. Para o Bingen, o horário publicado é terça a sábado de 08h às 16h, sujeito a alterações e diferente do guichê da Única/Fácil. Confirme o posto antes de depender dele para conexões ou guarda de malas.',
          'The Convention & Visitors Bureau lists tourist information desks at Bingen station, Palácio de Cristal and Praça da Liberdade, among others. Bingen’s published reference hours are Tuesday–Saturday, 08:00–16:00, subject to change; these are not Única/Fácil ticket-counter hours. Check the desk before relying on it for transfers or bag-storage advice.'),
        map: bingen, links: [tourismInfo],
      },
    ],
    faq: [
      [t('¿Dónde pido el auto para volver a Río?', 'Onde peço o carro para voltar ao Rio?', 'Where should I set the destination for my ride back to Rio?'),
        t('Si tu pasaje sale de Bingen, selecciona Terminal Rodoviário Governador Leonel Brizola y comprueba que coincide con la dirección del pasaje.', 'Se a passagem sai do Bingen, selecione Terminal Rodoviário Governador Leonel Brizola e confira se o endereço coincide com a passagem.', 'If your ticket departs from Bingen, select Terminal Rodoviário Governador Leonel Brizola and check it matches the address on your ticket.')],
    ],
    sources: [operator, tourism],
    relatedLinks: [
      ['guia/guarda-equipaje/', t('Dónde guardar las maletas', 'Onde guardar as malas', 'Where to store bags')],
      ['transportes/uber/', t('Uber, 99 y taxis', 'Uber, 99 e táxis', 'Uber, 99 and taxis')],
    ],
  },
};
