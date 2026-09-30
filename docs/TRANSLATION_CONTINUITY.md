# Traducción ES/PT/EN — continuidad

Autorización: traducir toda la V2 por bloques, comprobar todos los botones y generar commits. Conservar contenido, fotos, banners, widgets, enlaces y diseño. No resumir. Temas cerrados: solo traducciones y arreglos necesarios de botones.

Repositorio: lacasadelsushirg-pixel/ernestinho-v2. Rama: revision/guia-rio-hospedaje-traducciones. Estado inicial: 5afb41e. No usar main como estado actual. Revisar HEAD remoto antes de publicar para conservar cambios concurrentes.

Continuación automática solicitada y programada para cinco horas después del inicio. Leer este archivo y commits recientes antes de continuar. No declarar la página completa hasta auditar las rutas y textos dinámicos en los tres idiomas.

Bloque 1: navegación compartida, pie, últimos textos de Home/Transportes; selector desktop deja de dispararse a sí mismo al buscar controles incrustados; traducción por frases respeta elementos data-i18n/data-live; idioma almacenado se vuelve a aplicar tras instalar el puente de controles.

Brechas iniciales (inventario de textos estáticos; incluye nombres propios y textos ya gestionados por otros renderizadores, NO porcentaje real): familia 538, fotografía 51, hospedaje 127, café 45, experiencias 479, guía 84, compras 677, eventos 299, gastronomía 4282, vida nocturna 898, playas 81, barrios 103, cultura 2276, naturaleza 142, historia 72. Revisar cobertura exacta antes de traducir: algunas fichas tienen ES/PT/EN embebido.

Bloque 2: últimas incorporaciones de Guía de Río (documentación, visados, salud, dinero y movilidad), horarios/luz en Fotografía, conexión de Café Río al evento global y ec-lang, y dos enlaces rotos de barrios corregidos. Café ya tenía traducciones propias completas, pero el selector común no las activaba. Hospedaje también tiene diccionario propio y datos ES/PT/EN; no tomar sus textos estáticos como faltantes sin verificar ese renderizador.

Validación estática inicial: 582 rutas y 63251 enlaces/recursos; 16 incidencias iniciales, algunas son páginas de redirección deliberadas. Navegador local no disponible (Playwright sin ejecutable; descarga restringida falló), por lo que la prueba visual de botones sigue pendiente. No confundir revisión de sintaxis con prueba visual.

Bloque 3: Historia personal, TV, portada/listado de Familia y encabezados de fichas; metadatos/alt de Guía, Transportes, Fotografía y Café. Buscador de Familia incluye categorías traducidas. Avisos de compartir usan idioma actual. Normalización ES/PT/EN en 22 renderizadores de Compras para evitar T["EN"] indefinido al recargar.

Pruebas: scripts reales de Café en contexto DOM simulado: ES/PT/EN, URLs WhatsApp, precios y restauración exacta de ES pasan. Scripts reales de 22 compras en DOM simulado: arranque con ec-lang=EN y cambios EN/PT/ES sin excepciones. Esto NO sustituye prueba de navegador real. Texto español y todos los img/iframe/video/source de las 22 páginas se conservaron exactamente. Sintaxis de todos los scripts modificados validada. Auditoría estática ahora 14 incidencias preexistentes; los dos enlaces rotos quedaron resueltos.

Herramienta reproducible: node scripts/audit_translations.mjs /tmp/ec-translation-audit.json. Inventa­rio conservador: incluye nombres propios y páginas con traducciones embebidas. Guía queda con solo CPF, eVisa, Rentcars, Rodoviária Novo Rio y marca como candidatos; son nombres propios, no frases pendientes. Fotografía y Transportes restantes también son nombres/lugares. NO extrapolar esto al resto de la web.

Descubrimiento clave: muchas fichas gastronómicas tienen D={pt:{índice:HTML},en:{índice:HTML}} y botones .lang-switcher; ciertos valores prácticos EN/PT todavía contienen español. Compras tiene traducciones embebidas más arrays P de texto ES que NO siempre cambian. Auditar esas partes dinámicas además del HTML. La página entera NO está terminada. Priorizar fichas de Familia nuevas, Gastronomía, Compras (arrays P), Cultura, Vida Nocturna, Eventos, Playas, Naturaleza y Consejos; luego prueba de navegador completa.

Se incorporaron también diccionarios presentes en el espacio de trabajo para Atracciones, Barrios y Naturaleza, y sus registros en site.js. Todos pasan el inventario de claves PT/EN. Conservar ese trabajo en futuras continuaciones.

Bloque 4: todo el texto editorial estático pendiente de las 16 rutas de Playas y sus avisos, títulos y descripción del listado; metadatos de barrios/fichas de Familia. El inventario restante de Playas solo contiene nombres propios oficiales. Diccionario naturaleza-02.js presente en el espacio de trabajo se conserva y registra junto a naturaleza-01.js.

También se conserva familia-03.js presente en el espacio de trabajo: parte de las descripciones/práctica de fichas familiares. Sigue pendiente verificar y completar el resto.

Bloque 4: Playas (descripciones y consejos completos), Naturaleza (incluidas listas serializadas y alt/mapas) y cinco fichas Familia: AquaRio, BioParque, Jardim Botânico, Planetário y Yup Star. Sin cambios de HTML, imágenes, banners, widgets ni enlaces. Añadidos familia-03.js, naturaleza-02.js y playas-02.js y registros en site.js. Continuación automática adicional confirmada para 2026-09-30 07:39 America/Sao_Paulo (cinco horas desde la solicitud).

Bloque 5: navegación, encabezados, etiquetas prácticas, avisos y leyendas de imágenes/mapas del módulo Cultura (130 rutas). NO están traducidas aún todas las narrativas de las instituciones. Diccionario separado y cargado solo en Cultura.

Bloque 5: corregidos D.pt/D.en con datos prácticos todavía en español en 12 restaurantes. Samba Social y Clássico Leme tenían traducciones ES/EN corruptas por sustitución de palabras: rehechas íntegramente desde los 19 párrafos portugueses originales por ficha. PT conserva el contenido y traduce los encabezados. HTML original fuera de scripts, fotos, enlaces, widgets y recursos preservados exactamente en las 14 páginas.

Verificación reproducible: node scripts/check_embedded_gastronomy.mjs ejecuta los renderizadores reales de 170 fichas con DOM mínimo, hace PT→EN→ES→EN→PT→ES y comprueba restauración sin errores. NO es navegador real. Sintaxis inline de las 14 páginas modificadas pasa.

PUBLICACIÓN BLOQUEADA: auto-review rechazó git push del commit local 4fcc8da por interpretar que el usuario autorizó commits pero no publicación remota. No eludir por conector ni otro método. Pedir autorización expresa para publicar al terminar el trabajo local. La rama remota vista fue 927bc1f; comprobar HEAD remoto/concurrencia antes de publicar cuando se autorice.

Bloque 6: Arte y Cultura conectado al selector global con cultura-01/02/03. Encabezados, accesibilidad, tiempos, botones y alt/mapas comunes traducidos. Fichas completas verificadas por inventario: Academia Brasileira de Letras, Museu do Amanhã, CCBB, Real Gabinete y Theatro Municipal; solo quedan nombres propios/direcciones en esas cinco rutas. Las cinco fichas Familia del bloque 4 también quedan solo con nombres/direcciones/marca como candidatos. El resto de Cultura todavía NO está completo.

Próximo trabajo prioritario: MAM Rio y resto de Cultura; completar fichas Familia restantes; Vida Nocturna, Experiencias, Eventos, Consejos; Compras arrays P; 10 fichas gastronómicas sin D embebido y metadatos/alt pendientes. Verificar navegador real y todos los botones antes de declarar 100%.

Concurrencia detectada: otro turno de esta conversación continúa modificando el mismo repositorio y publicó commits 5ac92bc/97bea58. Fusionar siempre por claves; no borrar diccionarios ni crear registros duplicados. Se conservaron todas las claves de cultura-01 presentes antes del bloque 6. Recordatorio único de continuación queda a las 07:20 America/Sao_Paulo; la tarea duplicada a 07:39 se desactiva para evitar dos escritores simultáneos.

2026-09-30 03:27 America/Sao_Paulo: el usuario respondió «si autorizo» a publicar los commits pendientes en GitHub. La publicación queda expresamente autorizada; la restricción anterior por auto-review queda resuelta. Conservar los bloques y continuar traducción/validación por commits.

Bloque 7 (continuación inmediata autorizada): familia-04 incorpora 132 claves PT/EN. Fichas completas Bosque da Barra, Parque da Catacumba, Parque Lage y Pista Cláudio Coutinho, además de planes familiares de lluvia, parques y playas. Sus candidatos restantes son exclusivamente marcas, nombres propios y direcciones. Incluye alt/mapas de otras fichas; sus narrativas siguen pendientes. HTML, fotos, banners, widgets y enlaces originales intactos. Inventario y sintaxis del diccionario pasan. No sustituye comprobación real de navegador.

Bloque 8: MAM Rio completo PT/EN, incluidos historia, arquitectura, incendio, Cinemateca, jardines, visitas, accesibilidad y dos listas serializadas. cultura-04 conserva todos los elementos y la estructura original. Inventario restante en esa ficha: nombre oficial, dirección y marca. Sintaxis y git diff --check pasan. Próximo bloque: resto de fichas Familia y Cultura; mantener las prioridades anteriores para otros módulos.

Bloque 9: fichas completas Barra Bowling Grill, Escape 60 Copacabana, HotZone BarraShopping y Meta Kart Indoor en PT/EN (74 claves). Incluye edades, accesibilidad, presupuestos, reservas, instrucciones y aviso original de cierre temporal HotZone, sin cambiar sus datos. Traducción editorial, no verificación de actualidad. Recursos y HTML fuente intactos. Inventario restante: nombres propios, marcas y direcciones; se traduce también «tercer piso». Sintaxis/diff pasan.

Bloque 10: conservado familia-06 (Lagoa y Feira de São Cristóvão) y añadidos familia-07/08: Aterro do Flamengo, jardines del Palácio do Catete, Sítio Roberto Burle Marx, Carnaval Experience, Ilha Fiscal y Maracanã Tour completos PT/EN. El inventario de las 25 rutas Familia solo conserva nombres propios, marcas y direcciones (24 candidatos). HTML, imágenes, banners, widgets y enlaces sin modificaciones. Diccionarios completos PT/EN y diff validados. Sigue pendiente navegador real; no declarar toda la web terminada.

Bloque 11: Museu Histórico da Cidade completo en PT/EN, 26 claves incluidas las dos listas serializadas, historia, colecciones, parque, horarios y accesibilidad. Nuevo cultura-05 registrado únicamente en Cultura. Inventario restante en la ficha: marcas, nombre oficial y dirección. No se modificó ningún HTML ni recurso. Auditoría de diccionarios y git diff --check pasan. La web completa y los botones en navegador real siguen pendientes.

Bloque 12: Museu da República / Palácio do Catete completo PT/EN (26 claves), incluyendo dos listas serializadas, historia política, cuarto presidencial, jardines, horarios y acceso. Solo quedan nombres oficiales, marcas y dirección en inventario. No se modificó HTML ni recursos; diccionarios y diff pasan. Continuar Cultura y demás pendientes; no declarar 100% ni navegador verificado.

Bloque 13: Consejos listado/FAQ y fichas completas errores-rio, lluvia, rodizio, sol-calor, supermercados y electricidad-adaptadores PT/EN. Nuevo consejos-02 con 99 claves; registrado solo en Consejos. Inventario de las primeras seis páginas conserva exclusivamente marca; electricidad conserva marca e INPUT. Sin cambios a HTML, fotografías, banners, widgets ni enlaces. Diccionarios completos y diff pasan. Pendientes Consejos: 20-consejos, maletas, perfiles-viajero, trampas-turista; además secciones pendientes anteriores y navegador real.

Bloque 14: cierre de textos estáticos de las 11 rutas Consejos. consejos-03 añade 154 claves PT/EN para perfiles-viajero, maletas-rio, 20-consejos y trampas-turista, incluyendo todas las explicaciones y advertencias originales. Inventario de toda la sección deja solo ERNESTINHO CARIOCA, Ernestinho, Ernestinho Carioca e INPUT. Se conserva HTML y recursos exactamente. Todos los diccionarios pasan validación PT/EN y git diff --check. No se ha verificado aún navegador real. Continuar Cultura, Vida Nocturna, Experiencias, Eventos, Compras y restantes prioridades del registro; no declarar web terminada.

Bloque 15: experiencias-02 completa los textos estáticos pendientes de 13 fichas: helicóptero, lancha privada, Maracaná Experience, Pedra Bonita, Dois Irmãos, paracaídas, parasail, Pedra do Telégrafo, Rocinha, AquaRio/Boulevard, BioParque, Pequeña África y Santa Marta. Inventario restante exclusivamente nombres propios y títulos con esos nombres. Se preservan precios, condiciones, estado CONSULTAR, HTML y recursos. Diccionarios PT/EN y diff pasan; navegador real aún pendiente. Experiencias sigue pendiente: Angra, Arraial, Búzios, Cristo/City Tour, Full Day, Carnaval Experience, Partido Maracanã, Samba Bus y textos del listado.

Bloque 16: experiencias-03 completa Angra/Ilha Grande, Arraial do Cabo, Búzios, Cristo/City Tour y Carnaval Experience PT/EN, incluidos recorridos originales, horarios, almuerzo, condiciones y enlace/cupón oficial. HTML y recursos preservados. Inventario conservador y diccionarios pasan. Pendientes de Experiencias principales: Full Day, Partido Maracanã, Samba Bus y listado. No se ha verificado navegador real.

Bloque 17: experiencias-04 completa Full Day, Partido Maracanã, Samba Bus, listado y últimos textos de parapente/redirects. Incluye narrativas, condiciones, calendario original y accesibilidad. NO se verificó actualidad del calendario ni precios: solo traducción fiel. Inventario conservador de las 25 rutas Experiencias deja marcas, nombres propios y nombres de productos internacionales. HTML y recursos intactos; diccionarios PT/EN y diff pasan. Sigue pendiente comprobación real de selectores/botones en navegador, además de Cultura, Vida Nocturna, Eventos y las demás prioridades.

Bloque 18: vida-nocturna-02 completa All In y Bip Bip PT/EN, incluidas narrativas, reseñas originales, consejos, atributos de fotos y datos prácticos. Traduce también listado, descripciones recortadas originales, filtros y avisos. Las otras fichas nocturnas continúan pendientes. HTML, recursos y enlaces intactos. Inventario/diccionarios y diff pasan; no se ha verificado navegador. Continuar las 47 fichas nocturnas restantes, Cultura, Eventos y demás brechas del registro.
