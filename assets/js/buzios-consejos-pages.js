// Búzios: eight topic guides with human-authored ES/PT/EN content.
// Photos are existing Búzios assets only. No invented opening hours or prices.
const T=(ES,PT,EN)=>({ES,PT,EN});
const tx=a=>T(...a);
const section=g=>({title:tx(g.t),lead:tx(g.l),items:g.items.map(it=>({title:tx(it.t),text:tx(it.d)}))});
const specs=[
 {
  "slug": "20-consejos",
  "title": [
   "20 consejos para viajar a Búzios",
   "20 dicas para viajar a Búzios",
   "20 tips for visiting Búzios"
  ],
  "desc": [
   "20 decisiones prácticas sobre playas, transporte, dinero, seguridad y organización para disfrutar Búzios sin contratiempos.",
   "20 decisões práticas sobre praias, transporte, dinheiro, segurança e organização para curtir Búzios sem imprevistos.",
   "20 practical decisions about beaches, transport, money, safety and planning to enjoy Búzios with fewer surprises."
  ],
  "intro": [
   "No necesitas recorrerlo todo. Estos veinte consejos ayudan a elegir bien dónde dormir, qué playa visitar y cómo moverte, según tus fechas y tu presupuesto.",
   "Você não precisa conhecer tudo. Estas vinte dicas ajudam a escolher onde ficar, qual praia visitar e como circular, de acordo com suas datas e orçamento.",
   "You don't need to see everything. These twenty tips help you choose where to stay, which beach to visit and how to get around for your dates and budget."
  ],
  "hero": "/assets/images/buzios/geriba.webp",
  "groups": [
   {
    "t": [
     "Antes de reservar",
     "Antes de reservar",
     "Before booking"
    ],
    "l": [
     "La dirección y la época elegidas cambian la experiencia.",
     "Endereço e época escolhidos mudam a experiência.",
     "Address and season shape your experience."
    ],
    "items": [
     {
      "t": [
       "1. Elige la zona antes que el hotel",
       "1. Escolha a região antes do hotel",
       "1. Choose the area before the hotel"
      ],
      "d": [
       "Centro facilita caminar de noche; Geribá, João Fernandes y Ferradura ofrecen rutinas distintas. Ubica el alojamiento en el mapa antes de pagar.",
       "O Centro facilita sair a pé à noite; Geribá, João Fernandes e Ferradura oferecem rotinas diferentes. Confira a localização no mapa antes de pagar.",
       "Centro makes evening walks easier; Geribá, João Fernandes and Ferradura suit different routines. Check your lodging on the map before paying."
      ]
     },
     {
      "t": [
       "2. Comprueba las pendientes",
       "2. Confira as ladeiras",
       "2. Check the hills"
      ],
      "d": [
       "Búzios tiene calles con subidas, escaleras y accesos empinados. Pregunta por el último tramo si llevas equipaje, cochecito o necesitas accesibilidad.",
       "Búzios tem ruas íngremes, escadas e acessos inclinados. Pergunte sobre o trecho final com mala, carrinho ou necessidade de acessibilidade.",
       "Búzios has steep lanes, stairs and sloped access. Check the final approach if you have luggage, a stroller or mobility needs."
      ]
     },
     {
      "t": [
       "3. Compara feriados y fines de semana",
       "3. Compare feriados e fins de semana",
       "3. Compare holidays and weekends"
      ],
      "d": [
       "La demanda puede cambiar mucho entre días cercanos. Revisa las fechas de Carnaval, Año Nuevo y vacaciones antes de decidir.",
       "A procura muda muito entre datas próximas. Confira Carnaval, Réveillon e férias antes de reservar.",
       "Demand can vary significantly between nearby dates. Check Carnival, New Year and school holidays before deciding."
      ]
     },
     {
      "t": [
       "4. Reserva pensando en el regreso",
       "4. Reserve pensando na volta",
       "4. Plan your return journey"
      ],
      "d": [
       "Para excursiones o vuelos, contempla tránsito hasta Río y el horario del último traslado. No uses tiempos mínimos como garantía.",
       "Para passeios ou voos, considere o trânsito até o Rio e o horário do último transporte. Não trate o melhor tempo de viagem como garantia.",
       "For excursions or flights, allow for traffic toward Rio and the last service. Do not treat the fastest journey time as guaranteed."
      ]
     },
     {
      "t": [
       "5. Verifica qué incluye el alojamiento",
       "5. Confira o que está incluído",
       "5. Confirm what's included"
      ],
      "d": [
       "Pregunta por desayuno, estacionamiento, recepción, limpieza, tasas y política de cancelación; una foto bonita no responde eso.",
       "Pergunte sobre café da manhã, estacionamento, recepção, limpeza, taxas e cancelamento; uma foto bonita não informa isso.",
       "Ask about breakfast, parking, reception, cleaning, fees and cancellation; attractive photos do not answer these questions."
      ]
     }
    ]
   },
   {
    "t": [
     "Playas sin sorpresas",
     "Praias sem surpresas",
     "Beach days without surprises"
    ],
    "l": [
     "El viento, el acceso y los servicios importan más que un ranking.",
     "Vento, acesso e serviços importam mais que um ranking.",
     "Wind, access and facilities matter more than rankings."
    ],
    "items": [
     {
      "t": [
       "6. Elige la playa según el viento",
       "6. Escolha a praia conforme o vento",
       "6. Choose beaches based on wind"
      ],
      "d": [
       "Geribá suele estar más expuesta; ensenadas como Ferradura pueden ofrecer un ambiente más protegido. Observa las condiciones del día.",
       "Geribá costuma ser mais exposta; enseadas como Ferradura podem estar mais protegidas. Observe as condições do dia.",
       "Geribá is often more exposed; coves such as Ferradura can be more sheltered. Check conditions on the day."
      ]
     },
     {
      "t": [
       "7. No confundas agua clara con mar seguro",
       "7. Água clara não é sinônimo de mar seguro",
       "7. Clear water doesn't mean safe swimming"
      ],
      "d": [
       "Presta atención al oleaje, corrientes y advertencias locales. Si hay dudas, disfruta la arena y evita entrar.",
       "Observe ondas, correntes e avisos locais. Em caso de dúvida, aproveite a areia e não entre na água.",
       "Watch waves, currents and local warnings. If unsure, enjoy the beach without entering the water."
      ]
     },
     {
      "t": [
       "8. Llega temprano a playas pequeñas",
       "8. Chegue cedo às praias menores",
       "8. Arrive early at small beaches"
      ],
      "d": [
       "Azeda, Azedinha y João Fernandinho pueden tener poco espacio en jornadas concurridas. Evita planificar todo al límite.",
       "Azeda, Azedinha e João Fernandinho podem ter pouco espaço em dias cheios. Evite planejar tudo no limite.",
       "Azeda, Azedinha and João Fernandinho have limited space on busy days. Leave flexibility in your schedule."
      ]
     },
     {
      "t": [
       "9. Pregunta el precio antes de sentarte",
       "9. Pergunte o preço antes de sentar",
       "9. Ask prices before sitting down"
      ],
      "d": [
       "Confirma por separado silla, sombrilla, comida y bebida. Solicita carta o valores visibles; no presupongas consumo mínimo.",
       "Confirme separadamente cadeira, guarda-sol, comida e bebida. Peça cardápio e preços claros; não presuma consumação mínima.",
       "Confirm separately the price of chairs, umbrellas, food and drinks. Request a menu and clear pricing; do not assume a minimum spend."
      ]
     },
     {
      "t": [
       "10. Lleva poco peso a las playas con escaleras",
       "10. Leve pouco peso às praias com escadas",
       "10. Pack light for beaches with steps"
      ],
      "d": [
       "Algunos accesos exigen bajar y subir escalones o caminar sobre arena irregular. Un bolso ligero facilita regresar.",
       "Alguns acessos exigem escadas ou caminhada em areia irregular. Uma bolsa leve facilita o retorno.",
       "Some beaches require stairs or uneven sandy paths. A light bag makes the return easier."
      ]
     }
    ]
   },
   {
    "t": [
     "Moverte con criterio",
     "Circular com planejamento",
     "Getting around wisely"
    ],
    "l": [
     "No todos los transportes sirven para todos los trayectos.",
     "Nem todo transporte serve a todos os trajetos.",
     "Not every transport mode serves every route."
    ],
    "items": [
     {
      "t": [
       "11. Distingue vans de ómnibus",
       "11. Diferencie vans de ônibus",
       "11. Distinguish vans from buses"
      ],
      "d": [
       "Las vans locales, los autobuses municipales y las líneas intermunicipales no son lo mismo. Consulta destino, parada y forma de pago.",
       "Vans locais, ônibus municipais e linhas intermunicipais não são a mesma coisa. Confira destino, parada e pagamento.",
       "Local vans, municipal buses and intercity services are not the same. Check destination, stop and payment."
      ]
     },
     {
      "t": [
       "12. Confirma Uber y 99 al momento",
       "12. Confirme Uber e 99 na hora",
       "12. Check ride-hailing when needed"
      ],
      "d": [
       "Disponibilidad y precio varían por zona, hora y demanda. Guarda un plan alternativo para salir de playas alejadas.",
       "Oferta e preço variam por região, horário e demanda. Tenha uma alternativa para voltar de praias distantes.",
       "Availability and price vary by area, time and demand. Have a backup for returning from remote beaches."
      ]
     },
     {
      "t": [
       "13. Para Cabo Frio y Arraial, calcula el día completo",
       "13. Para Cabo Frio e Arraial, reserve o dia todo",
       "13. Allow a full day for Cabo Frio and Arraial"
      ],
      "d": [
       "No subestimes traslados ni conexiones. Verifica la operación de ida y regreso antes de comprar una excursión.",
       "Não subestime deslocamentos e conexões. Confira ida e volta antes de comprar passeio.",
       "Do not underestimate travel or transfers. Confirm both outbound and return arrangements before booking."
      ]
     },
     {
      "t": [
       "14. Evita conducir en accesos restringidos",
       "14. Evite dirigir em áreas restritas",
       "14. Avoid driving into restricted access areas"
      ],
      "d": [
       "Ni autos ni buggies deben ingresar a playas, senderos o zonas protegidas donde esté prohibido. Respeta señalización.",
       "Carros e buggies não devem entrar em praias, trilhas ou áreas protegidas onde for proibido. Respeite a sinalização.",
       "Cars and buggies must not enter beaches, trails or protected areas where prohibited. Follow local signs."
      ]
     },
     {
      "t": [
       "15. Comprueba la operación de barcos",
       "15. Confirme a operação dos barcos",
       "15. Confirm boat operations"
      ],
      "d": [
       "El mar y el viento pueden modificar salidas, embarques y regreso. Confirma con el operador ese mismo día.",
       "Mar e vento podem alterar saídas, embarques e retornos. Confirme com a operadora no próprio dia.",
       "Sea and wind can change departures, boarding and return. Check with the operator on the day."
      ]
     }
    ]
   },
   {
    "t": [
     "Dinero, salud y convivencia",
     "Dinheiro, saúde e convivência",
     "Money, health and local etiquette"
    ],
    "l": [
     "Una buena logística evita la mayoría de los inconvenientes.",
     "Boa logística evita boa parte dos imprevistos.",
     "Good logistics prevent many common problems."
    ],
    "items": [
     {
      "t": [
       "16. Lleva dos formas de pago",
       "16. Tenha duas formas de pagamento",
       "16. Keep two payment options"
      ],
      "d": [
       "Tarjeta y algo de efectivo sirven de respaldo. Un extranjero puede no tener acceso a Pix brasileño.",
       "Cartão e algum dinheiro são úteis como reserva. Visitantes estrangeiros podem não ter Pix brasileiro.",
       "A card and some cash provide backup. International visitors may not have Brazilian Pix."
      ]
     },
     {
      "t": [
       "17. Descarga mapas sin conexión",
       "17. Baixe mapas offline",
       "17. Download offline maps"
      ],
      "d": [
       "Guarda dirección, reservas y ruta a tu alojamiento; señal y batería pueden fallar en desplazamientos.",
       "Salve endereço, reservas e rota até sua hospedagem; sinal e bateria podem falhar nos deslocamentos.",
       "Save your address, bookings and route home; signal and battery may fail while travelling."
      ]
     },
     {
      "t": [
       "18. Usa protector solar y agua",
       "18. Use protetor solar e água",
       "18. Use sun protection and water"
      ],
      "d": [
       "Incluye sombra y pausas, incluso cuando el día está nublado. Lleva calzado apropiado para caminar.",
       "Inclua sombra e pausas, mesmo com nuvens. Use calçado adequado para caminhar.",
       "Take shade and rest breaks, even on cloudy days. Wear suitable walking shoes."
      ]
     },
     {
      "t": [
       "19. Guarda teléfonos esenciales",
       "19. Salve telefones essenciais",
       "19. Save essential numbers"
      ],
      "d": [
       "En Brasil: SAMU 192, bomberos 193, policía 190 y Defensa Civil 199. Verifica tu seguro antes de salir.",
       "No Brasil: SAMU 192, Bombeiros 193, Polícia 190 e Defesa Civil 199. Verifique seu seguro antes de sair.",
       "In Brazil: medical emergencies 192, fire 193, police 190 and civil defence 199. Check your insurance before heading out."
      ]
     },
     {
      "t": [
       "20. Respeta el lugar",
       "20. Respeite o lugar",
       "20. Respect the destination"
      ],
      "d": [
       "No dejes residuos, no alimentes fauna, no bloquees accesos y evita música a alto volumen. Las playas son espacios compartidos.",
       "Não deixe lixo, não alimente animais, não bloqueie acessos e evite som alto. Praias são espaços compartilhados.",
       "Do not litter, feed wildlife, block access or play loud music. Beaches are shared spaces."
      ]
     }
    ]
   }
  ]
 },
 {
  "slug": "50-preguntas",
  "title": [
   "50 preguntas frecuentes sobre Búzios",
   "50 perguntas frequentes sobre Búzios",
   "50 frequently asked questions about Búzios"
  ],
  "desc": [
   "Respuestas prácticas a 50 dudas sobre llegada, alojamiento, playas, transportes, pagos, seguridad y gastronomía.",
   "Respostas a 50 dúvidas sobre chegada, hospedagem, praias, transporte, pagamento, segurança e gastronomia.",
   "Practical answers to 50 questions on arrival, lodging, beaches, transport, payments, safety and food."
  ],
  "intro": [
   "Estas cincuenta respuestas sirven para decidir y orientarte; horarios y tarifas siempre deben confirmarse en su fuente actual.",
   "Estas cinquenta respostas ajudam no planejamento; horários e tarifas devem ser confirmados na fonte atual.",
   "These fifty answers help you plan; timetables and fares must always be checked at their current source."
  ],
  "hero": "/assets/images/buzios/panorama-mtur.webp",
  "groups": [
   {
    "t": [
     "Antes de viajar",
     "Antes de viajar",
     "Before the trip"
    ],
    "l": [
     "Fechas, documentos y planificación.",
     "Datas, documentos e planejamento.",
     "Dates, documents and planning."
    ],
    "items": [
     {
      "t": [
       "¿Cuántos días necesito?",
       "Quantos dias preciso?",
       "How many days do I need?"
      ],
      "d": [
       "Con dos o tres puedes conocer varias playas; cinco dan más margen para clima y descanso.",
       "Com dois ou três dias você conhece várias praias; cinco dão folga para clima e descanso.",
       "Two or three days cover several beaches; five allow more weather and rest flexibility."
      ]
     },
     {
      "t": [
       "¿Cuál es la mejor época?",
       "Qual a melhor época?",
       "What's the best season?"
      ],
      "d": [
       "Depende de sol, presupuesto y multitudes. Verano tiene más demanda; compara feriados.",
       "Depende de sol, orçamento e lotação. O verão tem mais procura; compare feriados.",
       "It depends on sun, budget and crowds. Summer is busier; compare holidays."
      ]
     },
     {
      "t": [
       "¿Búzios tiene aeropuerto comercial?",
       "Búzios tem aeroporto comercial?",
       "Does Búzios have a commercial airport?"
      ],
      "d": [
       "Los viajeros suelen llegar por los aeropuertos de Río o Cabo Frio, según vuelos disponibles.",
       "Viajantes costumam chegar pelos aeroportos do Rio ou de Cabo Frio, conforme os voos disponíveis.",
       "Travellers commonly use Rio or Cabo Frio airports, depending on available flights."
      ]
     },
     {
      "t": [
       "¿Puedo ir desde Río por bus?",
       "Posso ir do Rio de ônibus?",
       "Can I arrive by bus from Rio?"
      ],
      "d": [
       "Sí, revisa operadoras, punto de salida, llegada y horarios vigentes.",
       "Sim, confira operadoras, partida, chegada e horários atuais.",
       "Yes; check operators, departure point, arrival stop and current schedule."
      ]
     },
     {
      "t": [
       "¿Se puede reservar traslado privado?",
       "Dá para reservar traslado privado?",
       "Can I book a private transfer?"
      ],
      "d": [
       "Sí, solicita cotización vigente según ruta, pasajeros y equipaje.",
       "Sim, peça cotação atual conforme rota, passageiros e bagagem.",
       "Yes; request a current quote based on route, passengers and luggage."
      ]
     },
     {
      "t": [
       "¿Hay que reservar alojamiento antes?",
       "Precisa reservar hospedagem antes?",
       "Should I book accommodation ahead?"
      ],
      "d": [
       "En fines de semana y feriados populares conviene hacerlo con anticipación.",
       "Em fins de semana e feriados concorridos, é recomendável reservar antes.",
       "Booking ahead is wise on busy weekends and holidays."
      ]
     },
     {
      "t": [
       "¿Qué documentos debo llevar?",
       "Quais documentos devo levar?",
       "Which documents do I need?"
      ],
      "d": [
       "Consulta requisitos migratorios aplicables a tu nacionalidad y documentos de menores.",
       "Confira exigências migratórias conforme nacionalidade e documentos de menores.",
       "Check entry requirements for your citizenship and documents for minors."
      ]
     },
     {
      "t": [
       "¿Necesito seguro?",
       "Preciso de seguro?",
       "Do I need travel insurance?"
      ],
      "d": [
       "Revisa requisitos y cobertura médica antes de salir; una reserva turística no sustituye una póliza.",
       "Confira requisitos e cobertura médica antes de viajar; reserva de passeio não substitui apólice.",
       "Check requirements and medical coverage before travel; a tour booking is not insurance."
      ]
     },
     {
      "t": [
       "¿Cómo está el tiempo en invierno?",
       "Como é o tempo no inverno?",
       "What's winter weather like?"
      ],
      "d": [
       "Hay variación de temperaturas, viento y lluvia; revisa pronóstico para tus fechas.",
       "Há variação de temperatura, vento e chuva; confira a previsão para suas datas.",
       "Temperature, wind and rain vary; check a forecast for your dates."
      ]
     },
     {
      "t": [
       "¿Es buena idea viajar en Carnaval?",
       "Vale viajar no Carnaval?",
       "Is Carnival a good time to visit?"
      ],
      "d": [
       "Si buscas ambiente y aceptas alta demanda, puede ser; reserva temprano y prevé tránsito.",
       "Se procura movimento e aceita alta procura, pode ser; reserve cedo e preveja trânsito.",
       "If you enjoy crowds and festivities, maybe; book early and plan for traffic."
      ]
     }
    ]
   },
   {
    "t": [
     "Dónde alojarse",
     "Onde ficar",
     "Where to stay"
    ],
    "l": [
     "Elige una base por tus prioridades.",
     "Escolha uma base conforme suas prioridades.",
     "Choose a base to match your priorities."
    ],
    "items": [
     {
      "t": [
       "¿Dónde conviene dormir sin auto?",
       "Onde ficar sem carro?",
       "Where to stay without a car?"
      ],
      "d": [
       "Centro facilita paseos a pie; revisa las distancias exactas.",
       "Centro facilita passeios a pé; verifique distâncias exatas.",
       "Centro makes walking easier; check exact distances."
      ]
     },
     {
      "t": [
       "¿Geribá queda lejos del Centro?",
       "Geribá fica longe do Centro?",
       "Is Geribá far from Centro?"
      ],
      "d": [
       "Es otra zona de la península; calcula el traslado según horario y tráfico.",
       "É outra região da península; calcule o deslocamento conforme horário e trânsito.",
       "It's a different area of the peninsula; allow travel time based on traffic."
      ]
     },
     {
      "t": [
       "¿João Fernandes es tranquilo?",
       "João Fernandes é tranquilo?",
       "Is João Fernandes peaceful?"
      ],
      "d": [
       "Depende de la calle y la temporada. Revisa acceso y pendiente.",
       "Depende da rua e da temporada. Confira acesso e ladeira.",
       "It depends on the street and season. Check access and slopes."
      ]
     },
     {
      "t": [
       "¿Ferradura sirve para familias?",
       "Ferradura é boa para famílias?",
       "Does Ferradura suit families?"
      ],
      "d": [
       "Puede ser una buena base; confirma playa, servicios y mar del día.",
       "Pode ser boa base; confira praia, estrutura e mar do dia.",
       "It may suit families; check beach facilities and daily sea conditions."
      ]
     },
     {
      "t": [
       "¿Hay estacionamiento en todas las posadas?",
       "Toda pousada tem estacionamento?",
       "Do all inns have parking?"
      ],
      "d": [
       "No. Confírmalo con el alojamiento y pregunta por tarifas y acceso.",
       "Não. Confirme com a hospedagem e pergunte sobre tarifas e acesso.",
       "No. Ask your lodging about parking, fees and access."
      ]
     },
     {
      "t": [
       "¿Puedo llegar tarde al alojamiento?",
       "Posso chegar tarde na hospedagem?",
       "Can I arrive late at the lodging?"
      ],
      "d": [
       "Pregunta por recepción y registro fuera de horario antes de viajar.",
       "Pergunte sobre recepção e check-in fora do horário antes da viagem.",
       "Ask about reception and after-hours check-in before travelling."
      ]
     },
     {
      "t": [
       "¿Hay escalones para acceder?",
       "Há escadas no acesso?",
       "Are there steps at the entrance?"
      ],
      "d": [
       "Puede haberlos; solicita fotos del acceso completo si lo necesitas.",
       "Pode haver; peça fotos do acesso completo se precisar.",
       "There may be; request photos of the entire access route if needed."
      ]
     },
     {
      "t": [
       "¿Qué zona es mejor para salir de noche?",
       "Qual região é melhor para sair à noite?",
       "Which area suits nightlife?"
      ],
      "d": [
       "Centro/Rua das Pedras suele concentrar opciones; prepara el regreso.",
       "Centro/Rua das Pedras costuma concentrar opções; planeje a volta.",
       "Centro/Rua das Pedras tends to concentrate options; plan the return."
      ]
     }
    ]
   },
   {
    "t": [
     "Playas y actividades",
     "Praias e atividades",
     "Beaches and activities"
    ],
    "l": [
     "Ajusta tu plan a acceso y estado del mar.",
     "Adapte o plano ao acesso e ao mar.",
     "Adapt plans to access and sea conditions."
    ],
    "items": [
     {
      "t": [
       "¿Qué playa visitar primero?",
       "Qual praia visitar primeiro?",
       "Which beach first?"
      ],
      "d": [
       "Empieza por una accesible desde tu alojamiento y compatible con el mar del día.",
       "Comece pela que for acessível da hospedagem e compatível com o mar do dia.",
       "Start with one accessible from your lodging and suitable for today's sea."
      ]
     },
     {
      "t": [
       "¿Geribá tiene olas?",
       "Geribá tem ondas?",
       "Does Geribá have waves?"
      ],
      "d": [
       "Con frecuencia, sí; comprueba banderas, viento y condiciones antes de entrar.",
       "Frequentemente sim; confira bandeiras, vento e condições antes de entrar.",
       "Often yes; check flags, wind and conditions before entering."
      ]
     },
     {
      "t": [
       "¿Ferradura tiene el mar más calmo?",
       "Ferradura tem o mar mais calmo?",
       "Does Ferradura have calmer water?"
      ],
      "d": [
       "Suele ser una ensenada protegida, pero ninguna playa está siempre calma.",
       "Costuma ser enseada protegida, mas nenhuma praia está sempre calma.",
       "It is often sheltered, but no beach is always calm."
      ]
     },
     {
      "t": [
       "¿Azeda tiene escaleras?",
       "Azeda tem escadas?",
       "Does Azeda have stairs?"
      ],
      "d": [
       "El acceso puede incluir escalones y caminata; lleva poco peso.",
       "O acesso pode incluir escadas e caminhada; leve pouca bagagem.",
       "Access may involve steps and a walk; pack light."
      ]
     },
     {
      "t": [
       "¿Se puede hacer snorkel?",
       "Dá para fazer snorkel?",
       "Can I snorkel?"
      ],
      "d": [
       "En algunos sectores, si el mar y visibilidad lo permiten; nunca te alejes sin evaluar riesgos.",
       "Em alguns pontos, se mar e visibilidade permitirem; avalie os riscos antes de se afastar.",
       "In some areas if sea and visibility allow; assess risks before going far."
      ]
     },
     {
      "t": [
       "¿Hay alquiler de sombrillas?",
       "Alugam guarda-sol?",
       "Can I rent umbrellas?"
      ],
      "d": [
       "En varias playas, sí; pregunta precio y duración antes de usar.",
       "Em várias praias, sim; pergunte preço e tempo antes de usar.",
       "On several beaches yes; ask for price and duration first."
      ]
     },
     {
      "t": [
       "¿Hay consumo mínimo en barracas?",
       "Há consumação mínima nas barracas?",
       "Is a minimum spend required at kiosks?"
      ],
      "d": [
       "No lo des por válido: consulta valores, pide precios claros y revisa reglas locales.",
       "Não trate isso como obrigatório: peça preços claros e confira regras locais.",
       "Don't assume it is required: request clear prices and check local rules."
      ]
     },
     {
      "t": [
       "¿Se puede visitar la Orla Bardot de noche?",
       "Dá para passear na Orla Bardot à noite?",
       "Can I walk Orla Bardot at night?"
      ],
      "d": [
       "Es un paseo urbano; valora iluminación, acompañantes y regreso según la hora.",
       "É passeio urbano; avalie iluminação, companhia e retorno conforme o horário.",
       "It's an urban walk; assess lighting, company and return time."
      ]
     },
     {
      "t": [
       "¿Dónde ver el atardecer?",
       "Onde ver o pôr do sol?",
       "Where can I watch the sunset?"
      ],
      "d": [
       "Porto da Barra, Orla Bardot y Tartaruga son opciones a comparar según el clima.",
       "Porto da Barra, Orla Bardot e Tartaruga são opções conforme o tempo.",
       "Porto da Barra, Orla Bardot and Tartaruga are options depending on weather."
      ]
     },
     {
      "t": [
       "¿Hay barco taxi?",
       "Há táxi aquático?",
       "Are water taxis available?"
      ],
      "d": [
       "Puede haber servicios según punto, horario y mar. Confirma con operadores.",
       "Pode haver conforme ponto, horário e mar. Confirme com operadores.",
       "Services may operate depending on spot, time and sea. Confirm with operators."
      ]
     },
     {
      "t": [
       "¿Los paseos en barco salen con lluvia?",
       "Passeios de barco saem com chuva?",
       "Do boat trips run in rain?"
      ],
      "d": [
       "Depende sobre todo del mar y la operación confirmada; verifica el mismo día.",
       "Depende principalmente do mar e da operação confirmada; confira no dia.",
       "It depends mainly on sea conditions and confirmed operations; check the day."
      ]
     },
     {
      "t": [
       "¿Puedo ir a Cabo Frio y Arraial en un día?",
       "Posso ir a Cabo Frio e Arraial em um dia?",
       "Can I visit Cabo Frio and Arraial in one day?"
      ],
      "d": [
       "Es posible planificar excursiones, pero el traslado consume tiempo y conviene priorizar.",
       "É possível planejar passeios, mas deslocamentos levam tempo; escolha prioridades.",
       "It can be planned, but travel takes time; prioritize rather than rushing."
      ]
     }
    ]
   },
   {
    "t": [
     "Transporte y movilidad",
     "Transporte e mobilidade",
     "Transport and mobility"
    ],
    "l": [
     "Consulta siempre el trayecto de ida y regreso.",
     "Consulte sempre ida e volta.",
     "Always check both ways."
    ],
    "items": [
     {
      "t": [
       "¿Funcionan Uber y 99?",
       "Uber e 99 funcionam?",
       "Do Uber and 99 operate?"
      ],
      "d": [
       "Puede haber oferta, pero disponibilidad y tarifa cambian; ten alternativa.",
       "Pode haver motoristas, mas oferta e tarifa mudam; tenha alternativa.",
       "Drivers may be available, but supply and fares vary; have a backup."
      ]
     },
     {
      "t": [
       "¿Hay vans dentro de Búzios?",
       "Há vans dentro de Búzios?",
       "Are there vans within Búzios?"
      ],
      "d": [
       "Existen recorridos locales; confirma línea, parada, sentido y tarifa vigente.",
       "Há trajetos locais; confirme linha, ponto, sentido e tarifa atual.",
       "Local routes operate; confirm the line, stop, direction and current fare."
      ]
     },
     {
      "t": [
       "¿Cómo llego a Cabo Frio en bus?",
       "Como vou a Cabo Frio de ônibus?",
       "How do I reach Cabo Frio by bus?"
      ],
      "d": [
       "Consulta la línea intermunicipal, la parada y el horario de regreso.",
       "Confira linha intermunicipal, ponto e horário de volta.",
       "Check the intercity route, boarding point and return schedule."
      ]
     },
     {
      "t": [
       "¿Cómo llego a Arraial do Cabo?",
       "Como chego a Arraial do Cabo?",
       "How do I reach Arraial do Cabo?"
      ],
      "d": [
       "Revisa las conexiones disponibles y no presupongas un viaje directo a cualquier hora.",
       "Confira conexões disponíveis e não presuma saída direta a toda hora.",
       "Check available connections; do not assume a direct trip at every hour."
      ]
     },
     {
      "t": [
       "¿Conviene alquilar auto?",
       "Vale alugar carro?",
       "Should I rent a car?"
      ],
      "d": [
       "Puede convenir para varias playas y región; compara estacionamiento, seguro y costo total.",
       "Pode valer para várias praias e região; compare estacionamento, cobertura e custo total.",
       "It can help with beaches and regional trips; compare parking, cover and total cost."
      ]
     },
     {
      "t": [
       "¿Los buggies pueden entrar en la playa?",
       "Buggy pode entrar na praia?",
       "Can buggies drive onto beaches?"
      ],
      "d": [
       "No debes conducir por arena o espacios protegidos donde esté prohibido.",
       "Não dirija em areia ou áreas protegidas onde for proibido.",
       "Do not drive on sand or protected land where prohibited."
      ]
     },
     {
      "t": [
       "¿Puedo caminar entre todas las playas?",
       "Posso caminhar entre todas as praias?",
       "Can I walk between all beaches?"
      ],
      "d": [
       "No siempre; algunas distancias, subidas y accesos hacen necesario un traslado.",
       "Nem sempre; distâncias, ladeiras e acessos podem exigir transporte.",
       "Not always; distance, hills and access may require transport."
      ]
     },
     {
      "t": [
       "¿Hay paradas señalizadas?",
       "Os pontos são sinalizados?",
       "Are stops signposted?"
      ],
      "d": [
       "Varía por servicio; consulta ubicación exacta y sentido con el operador.",
       "Varia conforme o serviço; confirme ponto exato e sentido com o operador.",
       "It varies by service; check exact stops and direction with the operator."
      ]
     }
    ]
   },
   {
    "t": [
     "Dinero, salud y seguridad",
     "Dinheiro, saúde e segurança",
     "Money, health and safety"
    ],
    "l": [
     "Evita depender de una sola solución.",
     "Evite depender de uma única solução.",
     "Avoid reliance on a single solution."
    ],
    "items": [
     {
      "t": [
       "¿Aceptan tarjetas internacionales?",
       "Aceitam cartões internacionais?",
       "Are international cards accepted?"
      ],
      "d": [
       "Muchos comercios sí, pero verifica antes, especialmente en puestos pequeños.",
       "Muitos estabelecimentos sim, mas confirme antes, sobretudo nos pequenos.",
       "Many businesses do, but check first, especially at small stalls."
      ]
     },
     {
      "t": [
       "¿Necesito Pix?",
       "Preciso de Pix?",
       "Do I need Pix?"
      ],
      "d": [
       "No es obligatorio tener Pix como turista; lleva medios alternativos.",
       "Não é obrigatório ter Pix como turista; tenha alternativas.",
       "Tourists don't have to use Pix; carry alternative payment methods."
      ]
     },
     {
      "t": [
       "¿Dónde cambio dinero?",
       "Onde troco dinheiro?",
       "Where can I exchange currency?"
      ],
      "d": [
       "Usa servicios autorizados y compara costos antes de cambiar.",
       "Use serviços autorizados e compare custos antes de trocar.",
       "Use authorized providers and compare fees before exchanging."
      ]
     },
     {
      "t": [
       "¿Cuál es el número de ambulancia?",
       "Qual o número da ambulância?",
       "What's the ambulance number?"
      ],
      "d": [
       "El servicio SAMU utiliza el 192 en Brasil.",
       "O SAMU atende pelo 192 no Brasil.",
       "SAMU medical emergencies use 192 in Brazil."
      ]
     },
     {
      "t": [
       "¿Cuál es el número de policía?",
       "Qual o número da polícia?",
       "What's the police emergency number?"
      ],
      "d": [
       "La policía militar responde al 190 en Brasil.",
       "A Polícia Militar atende pelo 190 no Brasil.",
       "Military Police emergency number is 190 in Brazil."
      ]
     },
     {
      "t": [
       "¿Qué hacer si llueve fuerte?",
       "O que fazer na chuva forte?",
       "What should I do in heavy rain?"
      ],
      "d": [
       "Evita mar y senderos; revisa alertas de INMET y Defensa Civil.",
       "Evite mar e trilhas; confira avisos do INMET e Defesa Civil.",
       "Avoid the sea and trails; check INMET and Civil Defence alerts."
      ]
     },
     {
      "t": [
       "¿Hay internet en todas las playas?",
       "Há internet em todas as praias?",
       "Is there internet on every beach?"
      ],
      "d": [
       "No lo presupongas. Lleva mapas y reservas guardadas sin conexión.",
       "Não conte com isso. Salve mapas e reservas offline.",
       "Don't assume so. Save maps and bookings offline."
      ]
     }
    ]
   },
   {
    "t": [
     "Comer y salir",
     "Comer e sair",
     "Food and nightlife"
    ],
    "l": [
     "Elige según barrio, presupuesto y regreso.",
     "Escolha conforme bairro, orçamento e retorno.",
     "Choose based on area, budget and return travel."
    ],
    "items": [
     {
      "t": [
       "¿Dónde cenar en el Centro?",
       "Onde jantar no Centro?",
       "Where to dine in Centro?"
      ],
      "d": [
       "Rua das Pedras y alrededores ofrecen variedad; compara carta y reserva.",
       "Rua das Pedras e arredores têm opções; compare cardápios e reservas.",
       "Rua das Pedras and nearby streets have options; compare menus and bookings."
      ]
     },
     {
      "t": [
       "¿Qué es Porto da Barra?",
       "O que é Porto da Barra?",
       "What is Porto da Barra?"
      ],
      "d": [
       "Es un complejo gastronómico frente a Manguinhos, conocido por sus vistas al atardecer.",
       "É um polo gastronômico de frente a Manguinhos, conhecido pelo pôr do sol.",
       "It's a waterfront dining complex by Manguinhos, known for sunset views."
      ]
     },
     {
      "t": [
       "¿Hay opciones para niños?",
       "Há opções para crianças?",
       "Are there family dining options?"
      ],
      "d": [
       "Sí, pero verifica menú, horario, acceso y espacio para cochecitos.",
       "Sim, mas confira cardápio, horário, acesso e espaço para carrinho.",
       "Yes, but check menus, hours, access and stroller space."
      ]
     },
     {
      "t": [
       "¿Los restaurantes cobran servicio?",
       "Restaurantes cobram serviço?",
       "Do restaurants add service charge?"
      ],
      "d": [
       "Revisa la cuenta y pregunta por cualquier cargo antes de pagar.",
       "Confira a conta e pergunte sobre cobranças antes de pagar.",
       "Review the bill and ask about any charge before paying."
      ]
     },
     {
      "t": [
       "¿Cómo regreso después de salir?",
       "Como volto depois de sair?",
       "How do I return after a night out?"
      ],
      "d": [
       "Calcula alternativas de taxi, aplicación o traslado y evita depender de una sola opción.",
       "Planeje táxi, aplicativo ou traslado e não dependa de uma opção única.",
       "Plan taxi, ride-hailing or transfer options; don't rely on just one."
      ]
     }
    ]
   }
  ]
 },
 {
  "slug": "errores-frecuentes",
  "title": [
   "Errores frecuentes al viajar a Búzios",
   "Erros frequentes ao viajar a Búzios",
   "Common mistakes when visiting Búzios"
  ],
  "desc": [
   "Errores que encarecen o complican una visita a Búzios y cómo evitarlos antes y durante la estadía.",
   "Erros que encarecem ou complicam uma viagem a Búzios e como evitá-los.",
   "Mistakes that make a Búzios trip harder or more expensive and how to avoid them."
  ],
  "intro": [
   "Aquí no hay sustos inventados: son decisiones concretas que conviene revisar antes de salir.",
   "Sem sustos inventados: estas são decisões concretas para conferir antes de sair.",
   "No invented horror stories: these are practical decisions to review before departure."
  ],
  "hero": "/assets/images/buzios/ossos.webp",
  "groups": [
   {
    "t": [
     "Antes de salir",
     "Antes de sair",
     "Before departure"
    ],
    "l": [
     "Evita comprometer el viaje por detalles previsibles.",
     "Evite problemas causados por detalhes previsíveis.",
     "Avoid problems caused by predictable details."
    ],
    "items": [
     {
      "t": [
       "Reservar solo por la foto",
       "Reservar apenas pela foto",
       "Booking from photos alone"
      ],
      "d": [
       "Confirma ubicación, escaleras, distancia real y acceso al alojamiento.",
       "Confira localização, escadas, distância real e acesso à hospedagem.",
       "Check location, steps, actual distance and lodging access."
      ]
     },
     {
      "t": [
       "Viajar sin margen de conexión",
       "Viajar sem margem para conexões",
       "Leaving no transfer buffer"
      ],
      "d": [
       "Río y Búzios pueden tener tránsito intenso: no ajustes un vuelo al tiempo más optimista.",
       "O trânsito Rio–Búzios pode ser intenso: não use o menor tempo como garantia para um voo.",
       "Rio–Búzios traffic can be heavy: do not use the shortest drive time as an airport guarantee."
      ]
     },
     {
      "t": [
       "No revisar cancelaciones",
       "Não conferir cancelamentos",
       "Ignoring cancellation terms"
      ],
      "d": [
       "Lee condiciones de hospedaje, barcos, traslados y excursiones antes de pagar.",
       "Leia as regras de hospedagem, barcos, traslados e passeios antes de pagar.",
       "Read lodging, boat, transfer and excursion cancellation conditions before paying."
      ]
     },
     {
      "t": [
       "Confiar en una sola forma de pago",
       "Confiar em uma forma de pagamento",
       "Relying on one payment method"
      ],
      "d": [
       "Pix no está disponible para todos los extranjeros; lleva tarjeta y respaldo.",
       "Nem todo visitante estrangeiro usa Pix; tenha cartão e alternativa.",
       "Pix is not available to all international visitors; bring a card and backup."
      ]
     }
    ]
   },
   {
    "t": [
     "En playas y traslados",
     "Em praias e deslocamentos",
     "On beaches and in transit"
    ],
    "l": [
     "Adapta las decisiones a las condiciones reales del día.",
     "Adapte decisões às condições reais do dia.",
     "Adapt decisions to the day's real conditions."
    ],
    "items": [
     {
      "t": [
       "Elegir siempre la playa más famosa",
       "Escolher sempre a praia mais famosa",
       "Always choosing the most famous beach"
      ],
      "d": [
       "Considera viento, oleaje, afluencia y accesibilidad; una alternativa puede ser mejor ese día.",
       "Considere vento, ondas, movimento e acesso; uma alternativa pode ser melhor no dia.",
       "Consider wind, waves, crowds and access; an alternative may be better that day."
      ]
     },
     {
      "t": [
       "No acordar precios en barracas",
       "Não combinar preços em barracas",
       "Not agreeing on beach prices"
      ],
      "d": [
       "Verifica silla, sombrilla y consumos antes de aceptar el servicio.",
       "Confira cadeira, guarda-sol e consumo antes de aceitar o serviço.",
       "Check chairs, umbrellas and purchases before accepting service."
      ]
     },
     {
      "t": [
       "Suponer que hay Uber siempre",
       "Achar que sempre haverá carro por aplicativo",
       "Assuming a ride is always available"
      ],
      "d": [
       "A ciertas horas o en playas apartadas puede haber demora: prepara un regreso alternativo.",
       "Em certos horários ou praias afastadas pode haver espera: planeje uma volta alternativa.",
       "At some hours or remote beaches there may be delays: plan an alternative return."
      ]
     },
     {
      "t": [
       "Confundir van con bus interurbano",
       "Confundir van com ônibus intermunicipal",
       "Confusing local vans with intercity buses"
      ],
      "d": [
       "Antes de subir pregunta el destino, la tarifa y dónde debes bajar.",
       "Antes de embarcar, pergunte destino, tarifa e local de desembarque.",
       "Before boarding, ask about the destination, fare and drop-off."
      ]
     }
    ]
   },
   {
    "t": [
     "Durante la estadía",
     "Durante a estadia",
     "During the stay"
    ],
    "l": [
     "Pequeños hábitos mejoran el viaje y cuidan Búzios.",
     "Pequenos hábitos melhoram a viagem e preservam Búzios.",
     "Small habits improve the trip and protect Búzios."
    ],
    "items": [
     {
      "t": [
       "Ignorar avisos de mar o lluvia",
       "Ignorar avisos de mar ou chuva",
       "Ignoring weather or sea alerts"
      ],
      "d": [
       "Si se suspenden actividades náuticas, cambia el plan. Nunca fuerces embarques con mal tiempo.",
       "Se atividades náuticas forem suspensas, mude o plano. Nunca force embarque com tempo ruim.",
       "If sea activities are suspended, change plans. Never push for boarding in bad weather."
      ]
     },
     {
      "t": [
       "Llevar objetos sin protección",
       "Levar objetos sem proteção",
       "Leaving valuables unprotected"
      ],
      "d": [
       "Usa bolso impermeable y no dejes teléfonos o documentos solos en la arena.",
       "Use bolsa impermeável e não deixe celular ou documentos sozinhos na areia.",
       "Use a waterproof bag and never leave phones or documents unattended on the beach."
      ]
     },
     {
      "t": [
       "Intentar varias ciudades en un día corto",
       "Tentar várias cidades num dia curto",
       "Trying too many towns in one short day"
      ],
      "d": [
       "Búzios merece tiempo propio; Cabo Frio o Arraial requieren traslados y planificación.",
       "Búzios merece tempo; Cabo Frio e Arraial exigem deslocamento e planejamento.",
       "Búzios deserves time; Cabo Frio and Arraial require travel and planning."
      ]
     },
     {
      "t": [
       "No comprobar el horario del regreso",
       "Não confirmar o horário da volta",
       "Not checking the return service"
      ],
      "d": [
       "Consulta la última salida, los horarios de recepción y tu transporte nocturno.",
       "Confira o último horário, o funcionamento da recepção e o transporte noturno.",
       "Check last departures, reception hours and night transport."
      ]
     }
    ]
   }
  ]
 },
 {
  "slug": "supermercados",
  "title": [
   "Supermercados y compras cotidianas en Búzios",
   "Supermercados e compras do dia a dia em Búzios",
   "Supermarkets and everyday shopping in Búzios"
  ],
  "desc": [
   "Cómo organizar compras de comida, agua, productos de playa, farmacias y presupuesto en Búzios.",
   "Como organizar compras de alimentos, água, itens de praia, farmácias e orçamento em Búzios.",
   "How to organize groceries, water, beach essentials, pharmacies and budget in Búzios."
  ],
  "intro": [
   "Más útil que una lista que se desactualiza es saber qué comprar, dónde buscar según tu barrio y qué comprobar antes de salir.",
   "Mais útil que uma lista que envelhece é saber o que comprar, onde procurar por região e o que conferir antes de sair.",
   "More useful than an outdated directory: know what to buy, where to look for your area and what to check before you go."
  ],
  "hero": "/assets/images/buzios/manguinhos.webp",
  "groups": [
   {
    "t": [
     "Organiza tu compra",
     "Organize suas compras",
     "Plan your shopping"
    ],
    "l": [
     "La compra diaria cambia según el alojamiento y el transporte.",
     "A compra diária muda conforme hospedagem e transporte.",
     "Everyday shopping depends on lodging and transport."
    ],
    "items": [
     {
      "t": [
       "Compras grandes",
       "Compra grande",
       "Major grocery shop"
      ],
      "d": [
       "Si tienes cocina, aprovecha un supermercado de mayor tamaño cuando llegues y puedas transportar bolsas.",
       "Se você tem cozinha, faça a compra maior na chegada quando puder transportar sacolas.",
       "If you have a kitchen, make a larger grocery run on arrival when you can carry the bags."
      ]
     },
     {
      "t": [
       "Compras pequeñas",
       "Compras pequenas",
       "Top-up shopping"
      ],
      "d": [
       "Para agua, fruta o pan, busca un mercado de barrio cercano a tu hospedaje.",
       "Para água, fruta ou pão, procure um mercado de bairro perto da hospedagem.",
       "For water, fruit or bread, look for a neighborhood shop near your accommodation."
      ]
     },
     {
      "t": [
       "Centro frente a zonas residenciales",
       "Centro versus bairros residenciais",
       "Centro versus residential areas"
      ],
      "d": [
       "Compara precios y distancias: una tienda céntrica puede ser cómoda, pero no necesariamente la más económica.",
       "Compare preços e distâncias: uma loja no Centro é prática, mas não necessariamente a mais barata.",
       "Compare price and distance: a shop in Centro may be convenient but not necessarily cheapest."
      ]
     },
     {
      "t": [
       "Lleva bolsa reutilizable",
       "Leve sacola reutilizável",
       "Bring a reusable bag"
      ],
      "d": [
       "Facilita llevar compras en caminatas cortas y reduce residuos.",
       "Facilita compras em caminhadas curtas e reduz resíduos.",
       "It helps with short shopping trips and reduces waste."
      ]
     },
     {
      "t": [
       "Preguntar antes por el delivery",
       "Perguntar antes sobre entrega",
       "Ask about delivery"
      ],
      "d": [
       "Revisa cobertura, valor mínimo, costos de entrega y forma de pago.",
       "Confira cobertura, valor mínimo, taxa de entrega e forma de pagamento.",
       "Check delivery area, minimum order, fees and payment method."
      ]
     }
    ]
   },
   {
    "t": [
     "Qué comprobar",
     "O que conferir",
     "What to check"
    ],
    "l": [
     "Evita viajes perdidos y gastos inesperados.",
     "Evite deslocamentos perdidos e custos inesperados.",
     "Avoid wasted journeys and surprise costs."
    ],
    "items": [
     {
      "t": [
       "Horarios de temporada",
       "Horários de temporada",
       "Seasonal opening hours"
      ],
      "d": [
       "Horarios de feriados y domingos pueden cambiar: confirma con la tienda.",
       "Horários em feriados e domingos podem mudar: confirme com a loja.",
       "Holiday and Sunday hours can change: check with the store."
      ]
     },
     {
      "t": [
       "Tarjeta y Pix",
       "Cartão e Pix",
       "Cards and Pix"
      ],
      "d": [
       "Los medios aceptados varían. Si no tienes Pix, pregunta antes si reciben tarjeta internacional.",
       "Os meios aceitos variam. Sem Pix, confira antes se aceitam cartão internacional.",
       "Payment methods vary. Without Pix, check if international cards are accepted."
      ]
     },
     {
      "t": [
       "Productos de playa",
       "Itens de praia",
       "Beach essentials"
      ],
      "d": [
       "Compra protector, agua y merienda con anticipación; no dependas de encontrar todo en una playa pequeña.",
       "Compre protetor, água e lanche antes; não dependa de achar tudo numa praia pequena.",
       "Buy sunscreen, water and snacks ahead; do not rely on every small beach having supplies."
      ]
     },
     {
      "t": [
       "Farmacia y recetas",
       "Farmácia e receitas",
       "Pharmacy and prescriptions"
      ],
      "d": [
       "Confirma horarios y disponibilidad. Los medicamentos de receta requieren las condiciones legales correspondientes.",
       "Confira horários e estoque. Medicamentos controlados por receita exigem as condições legais aplicáveis.",
       "Confirm opening hours and availability. Prescription medicines require applicable legal conditions."
      ]
     },
     {
      "t": [
       "Guardar comprobantes",
       "Guarde comprovantes",
       "Keep receipts"
      ],
      "d": [
       "Revisa precios exhibidos, fecha de vencimiento y totales antes de salir.",
       "Confira preços expostos, validade e total antes de sair.",
       "Check posted prices, expiry dates and totals before leaving."
      ]
     }
    ]
   }
  ]
 },
 {
  "slug": "playas-barracas",
  "title": [
   "Playas, barracas y servicios en Búzios",
   "Praias, barracas e serviços em Búzios",
   "Beaches, kiosks and facilities in Búzios"
  ],
  "desc": [
   "Cómo elegir playas de Búzios según accesos, sombrillas, sillas, baño, consumo y el estado del mar.",
   "Como escolher praias de Búzios conforme acesso, guarda-sol, cadeiras, banheiro, consumo e mar.",
   "Choose Búzios beaches by access, shade, chairs, facilities, spending and sea conditions."
  ],
  "intro": [
   "Cada playa tiene personalidad diferente. Antes de instalarte, verifica los servicios y acuerda cualquier gasto.",
   "Cada praia tem personalidade própria. Antes de se instalar, confira serviços e combine os valores.",
   "Every beach is different. Check facilities and agree on charges before settling in."
  ],
  "hero": "/assets/images/buzios/tartaruga.webp",
  "groups": [
   {
    "t": [
     "Cómo escoger la playa",
     "Como escolher a praia",
     "Choosing a beach"
    ],
    "l": [
     "Combina acceso, condiciones y necesidades de tu grupo.",
     "Combine acesso, condições e necessidades do grupo.",
     "Match access, conditions and your group's needs."
    ],
    "items": [
     {
      "t": [
       "Geribá para espacio y actividad",
       "Geribá para espaço e movimento",
       "Geribá for space and activity"
      ],
      "d": [
       "Playa extensa, ambiente activo y oleaje que puede variar. Presta atención a banderas y salvavidas.",
       "Praia extensa, clima ativo e ondas variáveis. Observe bandeiras e guarda-vidas.",
       "A long, active beach with variable waves. Watch flags and lifeguard advice."
      ]
     },
     {
      "t": [
       "Ferradura para una ensenada",
       "Ferradura para uma enseada",
       "Ferradura for a cove"
      ],
      "d": [
       "Suele ofrecer un paisaje más abrigado; revisa igualmente viento y mar.",
       "Costuma oferecer cenário mais abrigado; ainda assim confira vento e mar.",
       "Often offers a more sheltered setting; still check wind and sea."
      ]
     },
     {
      "t": [
       "João Fernandes y João Fernandinho",
       "João Fernandes e João Fernandinho",
       "João Fernandes and João Fernandinho"
      ],
      "d": [
       "El espacio puede ser limitado en días concurridos. Considera llegar temprano.",
       "O espaço pode ser limitado em dias cheios. Considere chegar cedo.",
       "Space can be limited on busy days. Consider arriving early."
      ]
     },
     {
      "t": [
       "Azeda y Azedinha",
       "Azeda e Azedinha",
       "Azeda and Azedinha"
      ],
      "d": [
       "Verifica escaleras, equipaje y nivel de ocupación antes de bajar.",
       "Confira escadas, bagagem e lotação antes de descer.",
       "Check stairs, luggage and crowd levels before going down."
      ]
     },
     {
      "t": [
       "Tartaruga y atardecer",
       "Tartaruga e pôr do sol",
       "Tartaruga and sunset"
      ],
      "d": [
       "La costa invita a pasar más tiempo, pero los servicios y el regreso varían por día.",
       "A região convida a ficar mais tempo, mas serviços e retorno variam conforme o dia.",
       "The coastline suits a longer visit, but facilities and return options vary by day."
      ]
     }
    ]
   },
   {
    "t": [
     "Consumos y servicios",
     "Consumo e serviços",
     "Spending and facilities"
    ],
    "l": [
     "Pregunta, compara y conserva libertad de elección.",
     "Pergunte, compare e mantenha sua liberdade de escolha.",
     "Ask, compare and keep your choices open."
    ],
    "items": [
     {
      "t": [
       "Sillas y sombrillas",
       "Cadeiras e guarda-sóis",
       "Chairs and umbrellas"
      ],
      "d": [
       "Pregunta valor de alquiler y duración antes de utilizarlos.",
       "Pergunte o valor do aluguel e a duração antes de usar.",
       "Ask for rental price and duration before using."
      ]
     },
     {
      "t": [
       "Comida y bebida",
       "Comida e bebida",
       "Food and drinks"
      ],
      "d": [
       "Pide menú y precio total de lo que consumes, separando servicio de alquiler.",
       "Peça cardápio e preço total do consumo, separando serviço de aluguel.",
       "Ask for menus and total prices, separately from any equipment rental."
      ]
     },
     {
      "t": [
       "Acceso libre",
       "Acesso livre",
       "Public access"
      ],
      "d": [
       "La playa es un espacio público: no aceptes restricciones injustificadas de circulación. Si hay conflicto, consulta a la autoridad local.",
       "Praia é espaço público: não aceite restrições injustificadas de circulação. Em conflito, consulte a autoridade local.",
       "Beaches are public spaces: do not accept unjustified limits to access. Ask local authorities if there is a dispute."
      ]
     },
     {
      "t": [
       "Baños y duchas",
       "Banheiros e duchas",
       "Bathrooms and showers"
      ],
      "d": [
       "No presupongas que están disponibles en todas las playas; pregunta antes de instalarte.",
       "Não presuma que existem em todas as praias; pergunte antes de se instalar.",
       "Do not assume every beach has them; check before settling in."
      ]
     },
     {
      "t": [
       "Basura y naturaleza",
       "Lixo e natureza",
       "Waste and wildlife"
      ],
      "d": [
       "Recoge tus residuos y mantén distancia de animales. No invadas vegetación protegida.",
       "Recolha resíduos e mantenha distância dos animais. Não invada vegetação protegida.",
       "Take away litter and keep distance from animals. Do not enter protected vegetation."
      ]
     }
    ]
   }
  ]
 },
 {
  "slug": "lluvia",
  "title": [
   "Qué hacer en Búzios cuando llueve",
   "O que fazer em Búzios quando chove",
   "What to do in Búzios when it rains"
  ],
  "desc": [
   "Planes realistas para días de lluvia en Búzios: gastronomía, cafés, compras y seguridad en traslados.",
   "Planos realistas para dias de chuva em Búzios: gastronomia, cafés, compras e deslocamentos seguros.",
   "Realistic rainy-day plans in Búzios: food, cafés, shopping and safe travel."
  ],
  "intro": [
   "Cuando llueve no necesitamos inventar grandes museos. Conviene bajar el ritmo, revisar alertas y elegir actividades cubiertas cerca del alojamiento.",
   "Quando chove, não precisamos inventar grandes museus. Melhor reduzir o ritmo, conferir alertas e buscar atividades cobertas perto da hospedagem.",
   "No need to invent major museums when it rains. Slow down, check warnings and choose sheltered activities near your lodging."
  ],
  "hero": "/assets/images/buzios/orla-bardot.webp",
  "groups": [
   {
    "t": [
     "Planes bajo techo",
     "Programas cobertos",
     "Sheltered options"
    ],
    "l": [
     "Quédate cerca y busca lugares efectivamente abiertos.",
     "Fique por perto e procure locais realmente abertos.",
     "Stay nearby and check venues are actually open."
    ],
    "items": [
     {
      "t": [
       "Almuerzo sin apuro",
       "Almoço sem pressa",
       "Unhurried lunch"
      ],
      "d": [
       "Elige un restaurante próximo y aprovecha el tiempo sin cruzar la península.",
       "Escolha restaurante próximo e aproveite sem atravessar a península.",
       "Choose a nearby restaurant and enjoy the time without crossing the peninsula."
      ]
     },
     {
      "t": [
       "Cafés y pastelerías",
       "Cafés e confeitarias",
       "Cafés and bakeries"
      ],
      "d": [
       "Una pausa para café funciona bien cuando la lluvia es intermitente.",
       "Uma pausa para café funciona quando a chuva vai e volta.",
       "A café break works well when rain comes and goes."
      ]
     },
     {
      "t": [
       "Compras locales",
       "Compras locais",
       "Local shopping"
      ],
      "d": [
       "Explora tiendas cubiertas de Centro, según horarios y estado de las calles.",
       "Explore lojas cobertas no Centro, conforme horários e condições das ruas.",
       "Browse covered shops in Centro, subject to opening times and street conditions."
      ]
     },
     {
      "t": [
       "Descanso y planificación",
       "Descanso e planejamento",
       "Rest and planning"
      ],
      "d": [
       "Reorganiza las playas de los siguientes días; revisa viento, mar y alternativas.",
       "Reorganize as praias dos próximos dias; confira vento, mar e alternativas.",
       "Rearrange beach days; check wind, sea and alternatives."
      ]
     }
    ]
   },
   {
    "t": [
     "Qué evitar",
     "O que evitar",
     "What to avoid"
    ],
    "l": [
     "La seguridad manda más que cualquier reserva.",
     "A segurança vem antes de qualquer reserva.",
     "Safety matters more than a booking."
    ],
    "items": [
     {
      "t": [
       "Barcos con mal tiempo",
       "Barcos com tempo ruim",
       "Boats in bad weather"
      ],
      "d": [
       "Reconfirma operación y condiciones. No insistas en salidas suspendidas.",
       "Reconﬁrme operação e condições. Não insista em saídas suspensas.",
       "Reconfirm operations and conditions. Do not insist on suspended departures."
      ]
     },
     {
      "t": [
       "Senderos resbaladizos",
       "Trilhas escorregadias",
       "Slippery trails"
      ],
      "d": [
       "Evita miradores con roca mojada, senderos empinados o zonas inundables.",
       "Evite mirantes com rocha molhada, trilhas íngremes e áreas alagáveis.",
       "Avoid wet rocky overlooks, steep trails and flood-prone areas."
      ]
     },
     {
      "t": [
       "Conducir con visibilidad reducida",
       "Dirigir com pouca visibilidade",
       "Driving in poor visibility"
      ],
      "d": [
       "Reduce desplazamientos; lluvia intensa puede afectar carreteras de acceso.",
       "Reduza deslocamentos; chuva forte pode afetar vias de acesso.",
       "Reduce travel; heavy rain can affect access roads."
      ]
     },
     {
      "t": [
       "Ignorar alertas oficiales",
       "Ignorar avisos oficiais",
       "Ignoring official alerts"
      ],
      "d": [
       "Consulta INMET y Defensa Civil. En emergencias, Defensa Civil 199 y bomberos 193.",
       "Confira INMET e Defesa Civil. Em emergências, Defesa Civil 199 e Bombeiros 193.",
       "Check INMET and Civil Defence. For emergencies call Civil Defence 199 or fire service 193."
      ]
     }
    ]
   }
  ]
 },
 {
  "slug": "itinerarios",
  "title": [
   "Itinerarios de 1, 2, 3 y 5 días en Búzios",
   "Roteiros de 1, 2, 3 e 5 dias em Búzios",
   "1, 2, 3 and 5-day itineraries in Búzios"
  ],
  "desc": [
   "Cómo repartir playas, Orla Bardot, Rua das Pedras y gastronomía según el tiempo disponible en Búzios.",
   "Como distribuir praias, Orla Bardot, Rua das Pedras e gastronomia conforme os dias em Búzios.",
   "Balance beaches, Orla Bardot, Rua das Pedras and food according to your time in Búzios."
  ],
  "intro": [
   "Son recorridos flexibles, no tours con horarios prometidos. Cambia los días según dónde te alojes, viento, lluvias y transporte.",
   "São roteiros flexíveis, não passeios com horários prometidos. Ajuste conforme hospedagem, vento, chuva e transporte.",
   "Flexible plans, not tours with promised timings. Adapt to your lodging, wind, rain and transport."
  ],
  "hero": "/assets/images/buzios/ferradura-mtur.webp",
  "groups": [
   {
    "t": [
     "Escapadas cortas",
     "Escapadas curtas",
     "Short stays"
    ],
    "l": [
     "Prioriza una playa y el paseo urbano.",
     "Priorize uma praia e o passeio urbano.",
     "Prioritize a beach and the town walk."
    ],
    "items": [
     {
      "t": [
       "1 día: playa y Orla Bardot",
       "1 dia: praia e Orla Bardot",
       "1 day: beach and Orla Bardot"
      ],
      "d": [
       "Mañana en una playa accesible desde tu base, almuerzo cercano, paseo por Orla Bardot y Rua das Pedras. Confirma cómo regresar.",
       "Manhã em praia acessível da sua base, almoço próximo, Orla Bardot e Rua das Pedras. Confirme a volta.",
       "Morning at a beach near your base, nearby lunch, Orla Bardot and Rua das Pedras. Confirm how to return."
      ]
     },
     {
      "t": [
       "2 días: dos ambientes",
       "2 dias: dois ambientes",
       "2 days: two beach settings"
      ],
      "d": [
       "Día 1: Centro/Orla y una playa cercana. Día 2: Geribá o Ferradura, con cena en la zona que elijas.",
       "Dia 1: Centro/Orla e praia próxima. Dia 2: Geribá ou Ferradura, com jantar na região escolhida.",
       "Day 1: Centro/Orla and a nearby beach. Day 2: Geribá or Ferradura with dinner nearby."
      ]
     }
    ]
   },
   {
    "t": [
     "Para conocer más",
     "Para conhecer mais",
     "Time to explore more"
    ],
    "l": [
     "Permite desplazamientos sin correr entre playas.",
     "Permite deslocamentos sem correria entre praias.",
     "Allow travel time without rushing beaches."
    ],
    "items": [
     {
      "t": [
       "3 días: península en tres ritmos",
       "3 dias: península em três ritmos",
       "3 days: three sides of the peninsula"
      ],
      "d": [
       "Día 1: Centro, Orla Bardot y Praia dos Ossos. Día 2: Geribá y alrededores. Día 3: João Fernandes o Ferradura según el mar.",
       "Dia 1: Centro, Orla Bardot e Ossos. Dia 2: Geribá e arredores. Dia 3: João Fernandes ou Ferradura conforme o mar.",
       "Day 1: Centro, Orla Bardot and Ossos. Day 2: Geribá area. Day 3: João Fernandes or Ferradura based on sea conditions."
      ]
     },
     {
      "t": [
       "5 días: naturaleza y gastronomía",
       "5 dias: natureza e gastronomia",
       "5 days: nature and food"
      ],
      "d": [
       "Días 1–3: distribuye playas y Centro. Día 4: Tartaruga o Azeda/Azedinha con regreso planificado. Día 5: Porto da Barra, Manguinhos o día de reserva por lluvia.",
       "Dias 1–3: distribua praias e Centro. Dia 4: Tartaruga ou Azeda/Azedinha com retorno planejado. Dia 5: Porto da Barra, Manguinhos ou dia reserva por chuva.",
       "Days 1–3: spread beaches and Centro. Day 4: Tartaruga or Azeda/Azedinha with a return plan. Day 5: Porto da Barra, Manguinhos or a rainy-day buffer."
      ]
     },
     {
      "t": [
       "Excursiones fuera de Búzios",
       "Passeios fora de Búzios",
       "Day trips beyond Búzios"
      ],
      "d": [
       "Si incluyes Cabo Frio o Arraial, reserva un día entero y confirma transporte antes de comprar actividades.",
       "Se incluir Cabo Frio ou Arraial, reserve um dia inteiro e confirme transporte antes de contratar atividades.",
       "If adding Cabo Frio or Arraial, allow a whole day and confirm transport before booking activities."
      ]
     }
    ]
   },
   {
    "t": [
     "Ajustes útiles",
     "Ajustes úteis",
     "Useful adjustments"
    ],
    "l": [
     "Personaliza sin prometer tiempos irreales.",
     "Personalize sem prometer tempos irreais.",
     "Personalize without unrealistic timing promises."
    ],
    "items": [
     {
      "t": [
       "Con niños",
       "Com crianças",
       "With children"
      ],
      "d": [
       "Reduce el número de traslados; revisa baños, sombra y acceso a la playa.",
       "Reduza deslocamentos; confira banheiros, sombra e acesso à praia.",
       "Reduce transfers; check toilets, shade and beach access."
      ]
     },
     {
      "t": [
       "Sin auto",
       "Sem carro",
       "Without a car"
      ],
      "d": [
       "Agrupa zonas cercanas y deja alternativas para regresar si falla una aplicación.",
       "Agrupe áreas próximas e planeje alternativa de retorno se faltar carro por aplicativo.",
       "Group nearby areas and plan a backup return when ride-hailing is unavailable."
      ]
     },
     {
      "t": [
       "Con lluvia",
       "Com chuva",
       "In rain"
      ],
      "d": [
       "Cambia playa por gastronomía o descanso; verifica alertas y condiciones.",
       "Troque praia por gastronomia ou descanso; confira alertas e condições.",
       "Replace a beach with food or rest; check weather alerts and conditions."
      ]
     }
    ]
   }
  ]
 },
 {
  "slug": "atardeceres",
  "title": [
   "Dónde ver el atardecer en Búzios",
   "Onde ver o pôr do sol em Búzios",
   "Where to watch the sunset in Búzios"
  ],
  "desc": [
   "Orla Bardot, Porto da Barra, Manguinhos y Praia da Tartaruga: opciones para disfrutar el atardecer en Búzios.",
   "Orla Bardot, Porto da Barra, Manguinhos e Praia da Tartaruga: lugares para curtir o pôr do sol em Búzios.",
   "Orla Bardot, Porto da Barra, Manguinhos and Tartaruga: sunset options in Búzios."
  ],
  "intro": [
   "El lugar, las nubes y la estación importan más que una hora fija. Elige el mirador pensando también en la vuelta después de oscurecer.",
   "Lugar, nuvens e estação importam mais que um horário fixo. Escolha a vista pensando também na volta depois de escurecer.",
   "Location, clouds and season matter more than a fixed time. Choose a viewpoint with your return after dark in mind."
  ],
  "hero": "/assets/images/buzios/porto-da-barra-mtur.webp",
  "groups": [
   {
    "t": [
     "Lugares para comparar",
     "Lugares para comparar",
     "Places to compare"
    ],
    "l": [
     "Elige por acceso, ambiente y dónde quieres cenar.",
     "Escolha conforme acesso, ambiente e onde pretende jantar.",
     "Choose by access, atmosphere and evening plans."
    ],
    "items": [
     {
      "t": [
       "Porto da Barra, Manguinhos",
       "Porto da Barra, Manguinhos",
       "Porto da Barra, Manguinhos"
      ],
      "d": [
       "Restaurantes y paseo junto al agua hacen cómodo combinar la puesta de sol con una comida. Comprueba reservas y transporte.",
       "Restaurantes e caminhada à beira-mar facilitam combinar pôr do sol e refeição. Confira reservas e transporte.",
       "Waterfront restaurants and paths make it easy to pair sunset with a meal. Check reservations and transport."
      ]
     },
     {
      "t": [
       "Orla Bardot",
       "Orla Bardot",
       "Orla Bardot"
      ],
      "d": [
       "Una caminata urbana junto al mar, con bancos y ambiente del Centro cercano.",
       "Caminhada urbana à beira-mar, com bancos e o Centro por perto.",
       "A waterfront urban walk with benches and Centro close by."
      ]
     },
     {
      "t": [
       "Praia da Tartaruga",
       "Praia da Tartaruga",
       "Tartaruga Beach"
      ],
      "d": [
       "Alternativa de playa para quedarte hasta el final de la tarde; organiza el regreso antes de oscurecer.",
       "Opção de praia para ficar até o fim da tarde; planeje a volta antes de escurecer.",
       "A beach option for late afternoon; plan the return before nightfall."
      ]
     },
     {
      "t": [
       "Manguinhos fuera del complejo",
       "Manguinhos fora do complexo",
       "Manguinhos beyond the complex"
      ],
      "d": [
       "Busca puntos de acceso público seguros desde donde mirar el horizonte. No ingreses a terrenos privados.",
       "Procure pontos seguros de acesso público para ver o horizonte. Não entre em áreas privadas.",
       "Find safe public access points for the horizon. Do not trespass on private property."
      ]
     }
    ]
   },
   {
    "t": [
     "Consejos para la foto y el regreso",
     "Dicas de foto e retorno",
     "Photo and return tips"
    ],
    "l": [
     "Que el momento no termine en una dificultad de transporte.",
     "Não deixe o momento terminar em problema de transporte.",
     "Don't let the moment end with a transport problem."
    ],
    "items": [
     {
      "t": [
       "Llega antes del ocaso",
       "Chegue antes do pôr do sol",
       "Arrive before sunset"
      ],
      "d": [
       "Elige el lugar con tiempo para caminar, encontrar sitio y comprobar el cielo.",
       "Escolha o local com tempo para caminhar, achar espaço e observar o céu.",
       "Allow time to walk, find a spot and check the sky."
      ]
     },
     {
      "t": [
       "No prometas el sol sobre el mar",
       "Não prometa o sol no mar",
       "Don't promise a sun-over-water view"
      ],
      "d": [
       "La dirección de la luz cambia según estación y lugar. Algunas playas reciben luz lateral, no frontal.",
       "A direção da luz varia por estação e local. Algumas praias recebem luz lateral, não frontal.",
       "Sun direction changes by season and location. Some beaches get side light rather than direct sunset views."
      ]
     },
     {
      "t": [
       "Guarda una alternativa si llueve",
       "Tenha alternativa se chover",
       "Have a rainy-day backup"
      ],
      "d": [
       "Con nubes densas, disfruta el paseo si es seguro o cambia por un café.",
       "Com nuvens densas, aproveite a caminhada se for seguro ou troque por café.",
       "With heavy cloud, enjoy a safe walk or choose a café instead."
      ]
     },
     {
      "t": [
       "Prepara la vuelta",
       "Planeje a volta",
       "Plan your return"
      ],
      "d": [
       "Comprueba si hay aplicación, taxi o traslado antes de que termine la luz.",
       "Confira aplicativo, táxi ou traslado antes de escurecer.",
       "Check ride-hailing, taxi or transfer before dark."
      ]
     }
    ]
   }
  ]
 }
];
const ROOT='/destinos/buzios/consejos/';
export const buziosConsejosPages=Object.fromEntries(specs.map(p=>[ROOT+p.slug+'/',{
 eyebrow:T('CONSEJOS · BÚZIOS','DICAS · BÚZIOS','TIPS · BÚZIOS'),
 title:tx(p.title),description:tx(p.desc),intro:tx(p.intro),hero:p.hero,
 facts:[],sections:p.groups.map(section),
 related:[{title:T('Todos los consejos','Todas as dicas','All tips'),href:ROOT,copy:T('Volver al índice','Voltar ao índice','Back to the hub')},
 {title:T('Transportes de Búzios','Transportes de Búzios','Búzios transport'),href:'/destinos/buzios/transportes/',copy:T('Rutas y medios disponibles','Rotas e opções','Routes and options')},
 {title:T('Playas de Búzios','Praias de Búzios','Búzios beaches'),href:'/destinos/buzios/playas/',copy:T('Comparar antes de elegir','Compare antes de escolher','Compare before choosing')}]
}]));
export const buziosConsejosIndex={
 title:T('Consejos para viajar a Búzios','Dicas para viajar a Búzios','Tips for visiting Búzios'),
 description:T('Guía de consejos para Búzios con 20 recomendaciones, 50 respuestas, errores a evitar, supermercados, barracas, lluvia, itinerarios y atardeceres.','Guia de dicas de Búzios com 20 recomendações, 50 respostas, erros comuns, supermercados, barracas, chuva, roteiros e pôr do sol.','A Búzios tips guide with 20 recommendations, 50 answers, common mistakes, groceries, beach kiosks, rain plans, itineraries and sunsets.'),
 intro:T('Ocho guías prácticas para decidir mejor antes y durante el viaje, con información específica de Búzios.','Oito guias práticos para decidir melhor antes e durante a viagem, com informação específica de Búzios.','Eight practical guides to help make better decisions before and during your Búzios trip.'),
 sections:[{title:T('Explora los consejos por tema','Explore as dicas por assunto','Explore tips by topic'),lead:T('Entra en cada guía para ver recomendaciones concretas.','Abra cada guia para recomendações concretas.','Open each guide for actionable advice.'),
 items:specs.map(p=>({title:tx(p.title),text:tx(p.desc),href:ROOT+p.slug+'/',photo:p.hero}))}]
};
