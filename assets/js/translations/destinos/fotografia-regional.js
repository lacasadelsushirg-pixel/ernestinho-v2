import { t } from './modelo.js';

const early = t('Primera hora', 'Início da manhã', 'Early morning');
const morning = t('Mañana', 'Manhã', 'Morning');
const sunset = t('Al atardecer', 'No pôr do sol', 'Sunset');
const afternoon = t('Última hora de la tarde', 'Fim da tarde', 'Late afternoon');
const soft = t('Luz suave o cielo nublado', 'Luz suave ou céu nublado', 'Soft or overcast light');
const walk = t('A pie', 'A pé', 'On foot');
const trail = t('Por sendero', 'Por trilha', 'By trail');
const boat = t('En barco', 'De barco', 'By boat');
const street = t('Desde la calle', 'Da rua', 'From the street');
const garden = t('Jardín, según apertura', 'Jardim, conforme abertura', 'Garden during opening hours');
const centre = 'Centro Histórico';

export const petrSpotInfo = [
  [centre, morning, garden, t('Entra por Rua da Imperatriz y empieza por el jardín frente al palacio.', 'Entre pela Rua da Imperatriz e comece pelo jardim diante do palácio.', 'Enter from Rua da Imperatriz and start in the garden in front of the palace.')],
  [centre, soft, walk, t('Desde la Praça da Liberdade, sigue a pie hasta la plaza de la catedral.', 'Da Praça da Liberdade, siga a pé até a praça da catedral.', 'Walk from Praça da Liberdade to the square in front of the cathedral.')],
  [centre, soft, garden, t('Busca el acceso por Rua Alfredo Pachá y consulta la apertura del jardín.', 'Procure o acesso pela Rua Alfredo Pachá e consulte a abertura do jardim.', 'Use the Rua Alfredo Pachá entrance and check when the garden is open.')],
  ['Quitandinha', early, walk, t('Baja en la avenida de acceso al palacio y busca una toma desde la orilla habilitada.', 'Desça na avenida de acesso ao palácio e procure um ponto liberado na margem.', 'Get off on the palace access road and find a permitted viewpoint by the lake.')],
  [centre, morning, street, t('Sube Rua do Encanto desde la Praça da Liberdade.', 'Suba a Rua do Encanto a partir da Praça da Liberdade.', 'Walk uphill along Rua do Encanto from Praça da Liberdade.')],
  ['Itaipava', afternoon, t('Acceso al recinto', 'Acesso ao recinto', 'Venue access'), t('Llega por la BR-040 y consulta el acceso si hay un evento privado.', 'Chegue pela BR-040 e consulte o acesso se houver evento privado.', 'Approach via BR-040 and check access if there is a private event.')],
];

export const regionalPhotoSpots = {
  'arraial-do-cabo': [
    ['spot-pontal-do-atalaia', 'Prainhas do Pontal do Atalaia', 'Pontal do Atalaia', morning, t('Escalera de acceso', 'Escadaria de acesso', 'Stair access'),
      t('Desde la parte alta de la escalera, deja que la línea de los peldaños lleve la mirada hasta el agua.', 'Do alto da escadaria, deixe a linha dos degraus conduzir o olhar até o mar.', 'From the top of the steps, use their line to lead the eye down to the water.'),
      t('Sube por la vía del Pontal y verifica el acceso vehicular antes de salir.', 'Suba pela via do Pontal e confira o acesso de veículos antes de sair.', 'Take the Pontal road up and check vehicle access before leaving.')],
    ['spot-praia-dos-anjos', 'Praia dos Anjos', 'Praia dos Anjos', early, walk,
      t('Encuadra las proas de los barcos con el morro al fondo. Al llegar temprano puedes recorrer la orilla con calma.', 'Enquadre as proas dos barcos com o morro ao fundo. Chegue cedo para percorrer a orla com calma.', 'Frame the boats’ bows against the hill. An early start gives you time to walk the shore at your own pace.'),
      t('Desde Praça do Cova, camina por la orilla fuera de la zona de embarque.', 'Da Praça do Cova, caminhe pela orla fora da área de embarque.', 'From Praça do Cova, follow the waterfront outside the boarding area.')],
    ['spot-trilha-do-vigia', 'Trilha do Vigia', 'Praia Grande', afternoon, trail,
      t('Incluye un tramo del sendero en primer plano para dar escala a la costa.', 'Inclua um trecho da trilha em primeiro plano para dar escala à costa.', 'Include a stretch of the trail in the foreground to show the scale of the coast.'),
      t('Sal desde el extremo de Praia Grande y planifica la vuelta con luz.', 'Saia pela ponta da Praia Grande e programe a volta com luz.', 'Start at the end of Praia Grande and plan to return in daylight.')],
    ['spot-prainha', 'Prainha', 'Prainha', early, walk,
      t('Busca la curva de la arena desde un extremo de la playa. Incluye la ladera para enmarcar la bahía.', 'Procure a curva da faixa de areia em uma das pontas e use a encosta para emoldurar a enseada.', 'Find the curve of sand from one end of the beach and use the hillside to frame the bay.'),
      t('Baja al paseo marítimo por las calles del barrio Prainha.', 'Desça à orla pelas ruas do bairro Prainha.', 'Follow the streets of the Prainha neighbourhood down to the waterfront.')],
    ['home', 'Praia do Forno', 'Praia do Forno', morning, trail,
      t('Detente en el mirador del sendero para incluir la ensenada completa y los barcos que dan escala al paisaje.', 'Pare no mirante da trilha para incluir a enseada inteira e os barcos que dão escala à paisagem.', 'Stop at the trail overlook to capture the whole bay, with boats for a sense of scale.'),
      t('Busca el inicio del sendero junto a Praia dos Anjos, cerca del puerto.', 'Procure o início da trilha junto à Praia dos Anjos, perto do porto.', 'Find the trailhead by Praia dos Anjos near the port.')],
    ['spot-praia-grande', 'Praia Grande', 'Praia Grande', sunset, walk,
      t('Trabaja con el reflejo en la arena mojada y deja una silueta pequeña frente al horizonte.', 'Aproveite o reflexo na areia molhada e deixe uma silhueta pequena diante do horizonte.', 'Use the reflection in the wet sand and place a small silhouette against the horizon.'),
      t('Llega por el paseo de Praia Grande y elige un punto con salida a la avenida para la vuelta.', 'Chegue pelo calçadão da Praia Grande e escolha um ponto com saída para a avenida na volta.', 'Arrive via the Praia Grande promenade and choose a spot with easy access back to the avenue.')],
  ],
  'angra-ilha-grande': [
    ['barrios', 'Igreja de Santa Luzia', 'Centro de Angra', afternoon, walk,
      t('Desde la plaza, encuadra la fachada y deja aire sobre las torres. Al caer la tarde, prueba una toma vertical.', 'Da praça, enquadre a fachada e deixe espaço acima das torres. No fim da tarde, experimente um quadro vertical.', 'Frame the façade from the square, leaving room above the towers. Try a vertical composition late in the day.'),
      t('Camina por el Centro de Angra hasta la iglesia de Santa Luzia, cerca del frente marítimo.', 'Caminhe pelo Centro de Angra até a igreja de Santa Luzia, perto da orla.', 'Walk through central Angra to Santa Luzia church near the waterfront.')],
    ['cultura', 'Convento de São Bernardino de Sena', 'Centro de Angra', soft, street,
      t('Muestra la textura de los muros y el desnivel del terreno. El cielo nublado suaviza las sombras.', 'Mostre a textura dos muros e o desnível. O céu nublado suaviza as sombras.', 'Capture the texture of the walls and the slope. Overcast light softens the shadows.'),
      t('Desde el Centro, busca la subida de la Ladeira São Bernardino y confirma si el recinto está abierto.', 'Do Centro, procure a subida da Ladeira São Bernardino e confira se o recinto está aberto.', 'From the centre, take Ladeira São Bernardino uphill and check whether the grounds are open.')],
    ['home', 'Vila do Abraão', 'Ilha Grande', morning, walk,
      t('Desde la orilla, encuadra los barcos y la ladera al fondo para situar la villa en la isla.', 'Da orla, enquadre os barcos e a encosta ao fundo para situar a vila na ilha.', 'From the shore, frame the boats against the hillside to place the village in its island setting.'),
      t('Desde el desembarque en Abraão, sigue el paseo de la villa a pie.', 'Do desembarque no Abraão, siga a orla da vila a pé.', 'From the Abraão landing, follow the village waterfront on foot.')],
    ['familia', 'Praia da Feiticeira', 'Ilha Grande', morning, t('Sendero o taxi náutico', 'Trilha ou táxi boat', 'Trail or boat taxi'),
      t('Incluye la roca o la vegetación de un extremo para mostrar el tamaño de esta cala.', 'Inclua a pedra ou a vegetação de uma ponta para mostrar o tamanho da enseada.', 'Include rock or vegetation from one end to show the scale of the cove.'),
      t('Desde Abraão, consulta el estado del sendero o acuerda la recogida si vas en barco.', 'Do Abraão, consulte as condições da trilha ou combine a volta se for de barco.', 'From Abraão, check trail conditions or arrange pickup if you go by boat.')],
    ['naturaleza', 'Praia de Lopes Mendes', 'Ilha Grande', morning, trail,
      t('Encuadra la curva de arena con un caminante a distancia para mostrar su longitud.', 'Enquadre a curva da areia com uma pessoa ao longe para mostrar a extensão.', 'Frame the sweep of sand with a distant walker to convey its length.'),
      t('Si desembarcas en Pouso, continúa a pie por el tramo de sendero hasta Lopes Mendes.', 'Se desembarcar no Pouso, siga a pé pela trilha até Lopes Mendes.', 'If you land at Pouso, take the final trail section to Lopes Mendes.')],
    ['spot-dois-rios', 'Praia de Dois Rios', 'Ilha Grande', morning, trail,
      t('Desde la arena, aprovecha el agua que escurre hacia el mar para dibujar líneas en primer plano.', 'Da areia, aproveite a água que corre para o mar para criar linhas no primeiro plano.', 'From the sand, use the water flowing towards the sea to draw lines across the foreground.'),
      t('Desde Abraão, toma el camino a Dois Rios y sal temprano para regresar con luz.', 'Do Abraão, siga pelo caminho de Dois Rios e saia cedo para voltar com luz.', 'From Abraão, take the road to Dois Rios and set off early enough to return in daylight.')],
    ['spot-lagoa-verde', 'Lagoa Verde', 'Araçatiba · Ilha Grande', morning, boat,
      t('Fotografía desde la embarcación, con la vegetación en un borde para contrastar con el verde del agua.', 'Fotografe do barco, com a vegetação em uma borda para contrastar com o verde da água.', 'Shoot from the boat, using vegetation along one edge to contrast with the green water.'),
      t('Busca una salida náutica que indique esta parada y acuerda el tiempo en el lugar al embarcar.', 'Procure um passeio de barco que inclua essa parada e combine o tempo no local antes de embarcar.', 'Choose a boat trip that includes the lagoon and confirm how long the stop lasts before boarding.')],
    ['fotografias', 'Praia do Aventureiro', 'Ilha Grande', early, boat,
      t('Busca el perfil de la palmera inclinada desde la arena y prueba un encuadre que deje aire hacia el mar.', 'Fotografe o coqueiro inclinado de perfil, da areia, e deixe espaço em direção ao mar.', 'Photograph the leaning palm in profile from the sand, leaving space towards the sea.'),
      t('Confirma las reglas de visita y las condiciones de navegación antes de contratar el traslado.', 'Confira as regras de visitação e o estado do mar antes de contratar o traslado.', 'Check visitor access rules and sea conditions before arranging transport.')],
  ],
  paraty: [
    ['cultura', 'Igreja de Santa Rita', centre, morning, walk,
      t('Usa las piedras de la plaza para dirigir la mirada hacia la fachada blanca y su campanario.', 'Use as pedras da praça para conduzir o olhar à fachada branca e à torre.', 'Use the cobbles in the square to lead the eye towards the white façade and tower.'),
      t('Desde las calles peatonales, sigue a pie hacia el Largo de Santa Rita, junto al cais.', 'Pelas ruas do Centro Histórico, siga a pé até o Largo de Santa Rita, junto ao cais.', 'Walk through the old town to Largo de Santa Rita, near the quay.')],
    ['home', 'Igreja de Nossa Senhora das Dores', centre, soft, walk,
      t('Prueba un ángulo lateral para separar la torre del fondo y conservar las casas bajas en el encuadre.', 'Experimente um ângulo lateral para separar a torre do fundo e manter o casario no quadro.', 'Try a side angle to separate the tower from the background and keep the low houses in frame.'),
      t('Camina hacia Rua Fresca por el borde del Centro Histórico.', 'Caminhe até a Rua Fresca pela borda do Centro Histórico.', 'Walk to Rua Fresca along the edge of the old town.')],
    ['spot-pereque-acu', 'Rio Perequê-Açu', centre, early, walk,
      t('Desde el puente, prueba una composición baja que incluya el reflejo y la línea de la ribera.', 'Da ponte, experimente um enquadramento baixo com o reflexo e a linha da margem.', 'From the bridge, try a low composition with the reflection and the line of the riverbank.'),
      t('Cruza desde el Centro Histórico hacia el Pontal y utiliza el paso peatonal.', 'Cruze do Centro Histórico em direção ao Pontal pelo acesso de pedestres.', 'Cross from the old town towards Pontal using the pedestrian crossing.')],
    ['spot-praia-do-pontal', 'Praia do Pontal', 'Pontal', afternoon, walk,
      t('Desde la arena, busca un encuadre abierto con los barcos o los cerros al fondo.', 'Da areia, busque um quadro aberto com barcos ou morros ao fundo.', 'From the sand, use a wide frame with boats or hills in the background.'),
      t('Cruza el Perequê-Açu y sigue por el paseo del Pontal hasta la playa.', 'Atravesse o Perequê-Açu e siga pela orla do Pontal até a praia.', 'Cross the Perequê-Açu and follow the Pontal waterfront to the beach.')],
    ['spot-forte-defensor', 'Forte Defensor Perpétuo', 'Morro da Vila Velha', morning, t('Subida a pie', 'Subida a pé', 'Uphill walk'),
      t('Busca un punto que reúna la mampostería del fuerte y la vegetación del morro.', 'Procure um ponto que reúna a alvenaria do forte e a vegetação do morro.', 'Look for an angle that brings the fort’s masonry and the wooded hillside into the same frame.'),
      t('Sube desde el Pontal y verifica la apertura del recinto antes de ir.', 'Suba a partir do Pontal e confira a abertura do recinto antes de sair.', 'Walk uphill from Pontal and check the grounds’ opening before setting out.')],
    ['familia', 'Casario do Centro Histórico', centre, early, walk,
      t('Busca una calle lateral donde las puertas de colores formen una secuencia y baja el encuadre para incluir el empedrado.', 'Procure uma rua lateral onde as portas coloridas formem uma sequência e baixe o enquadramento para incluir as pedras.', 'Find a side street with a sequence of painted doors and lower the frame to bring in the cobbles.'),
      t('Empieza en Praça da Matriz y recorre las calles peatonales hacia el Largo de Santa Rita.', 'Comece na Praça da Matriz e percorra as ruas de pedestres até o Largo de Santa Rita.', 'Start at Praça da Matriz and follow the pedestrian streets towards Largo de Santa Rita.')],
  ],
};
