# QA local — Playas de Río

**Estado: trabajo local parcial; no declarar finalizadas las fichas ni publicar.** No se hizo commit, push, despliegue, rollback o cambio de rama. No se modificó Búzios ni el código de Carioc-IA. El último HEAD remoto observado en la sesión anterior fue `ff76300becbb08c1a1893f46d2ca9005f25b845f`; en esta continuación no se pudo volver a consultar GitHub (`git ls-remote` no conectó y la API web no fue accesible). El checkout local está en `29ab6a9` y no contiene el objeto remoto. No se integró ni se sobrescribió ningún cambio; cualquier futura integración queda bloqueada hasta verificar el remoto y reconciliar diferencias.

## Verificaciones ejecutadas

- Se encontraron las 27 rutas individuales y la portada general.
- Se verificó que la portada enlaza las 27 fichas: las 15 fichas heredadas recibieron enlace “Leer la guía completa” traducible en ES/PT/EN. En 13 galerías heredadas se reemplazaron 25 miniaturas con imágenes propias; Botafogo muestra solo su única foto disponible.
- El adjunto contiene 145 archivos: 142 JPG, 2 JPEG y 1 AVIF; además, `bulk-photo-references.js` configura ocho referencias remotas de Playas fuera del adjunto; 17 carpetas y 3 imágenes en raíz. Las tres hojas de contacto fueron revisadas para clasificar visualmente el conjunto. Hay 144 contenidos únicos: una imagen está duplicada byte a byte por SHA-256; la matriz marca la copia. Las 112 entradas del adjunto no integradas permanecen inventariadas y no se dan por disponibles en Hostinger. Las ocho referencias remotas se anotaron y la inyección automática al final de fichas `/playas/` quedó bloqueada localmente hasta verificar identidad, permiso, ALT y composición.
- Se integraron 33 fotos de Ernesto en 16 fichas, desde 16 carpetas nominalmente correspondientes. Copacabana y Arpoador tienen tres fotos cada una; trece fichas tienen dos y Botafogo una.
- Las 33 URL de imagen seleccionadas se abrieron directamente en Chrome el 10-10-2026. Esto confirma que la URL responde como imagen; no confirma la visualización dentro de la ficha local.
- Las 33 imágenes integradas tienen `alt`, dimensiones y variantes ALT ES/PT/EN. En el archivo se confirmó un duplicado byte a byte con SHA-256; no se incorporó dos veces. No se encontraron imágenes sin ALT en las 27 fichas.
- Se retiró de São Conrado una cifra de población de Rocinha que no estaba respaldada en la ficha y se precisó el texto del aterrizaje de vuelos libres. Las 27 fichas tienen una nota de orientación con variantes ES/PT/EN. Además, las 15 fichas heredadas recibieron un bloque propio de contexto local con texto explícito ES/PT/EN y enlace de referencia. El chequeo detectó y corrigió textos cruzados entre español y portugués; queda una revisión lingüística humana de toda la página.
- La sincronización de idioma usa `getLanguage()` de `i18n.js`; los códigos devueltos son `ES`, `PT` y `EN`. Las 12 guías prácticas tienen diccionarios con claves coincidentes para sus contenidos ES/PT/EN; los 15 bloques editoriales regenerados de fichas heredadas muestran cobertura de 15/15 unidades por ficha en los diccionarios de traducción. Las notas de contexto usan atributos localizados procesados por el helper. Esta comprobación estática no confirma el cambio visual del idioma ni la traducción de cada fragmento heredado.
- Los enlaces relativos y absolutos del sitio se comprobaron contra el árbol local: no se detectaron destinos locales inexistentes. Tampoco se detectaron anclas locales rotas.
- `rio-beaches.js` contiene 12 entradas de traducción explícita; las otras 15 tienen ahora un bloque de contexto local con atributos trilingües, pero conservan material heredado sin paridad integral ES/PT/EN verificada. Las 28 páginas incluyen el helper de idioma con caché `20261010-playas-r1`; las 27 fichas comparten la referencia de CSS versionada.
- Cuatro URL distintas de terceros aparecen tanto en las tarjetas de portada como en las fichas de Recreio y São Conrado (ocho apariciones `<img>`). Sus permisos no están documentados; deben reemplazarse por imágenes propias verificadas o retirarse antes de publicar.
- La pasada visual de las hojas de contacto confirmó que las tres fotos de raíz no tienen una asignación inequívoca y que las dos fotos de `PRAIA DO SOSSEGO` no se deben mover a Praia do Secreto. La matriz CSV ahora incluye una acción propuesta por fila y diferencia estado del archivo, verificación HTTP y derechos. La pasada adicional añadió contexto local con atributos ES/PT/EN en 15 fichas heredadas y una segunda cápsula en Copacabana, Ipanema, Arpoador, Leblon y Leme; una tercera cápsula en Ipanema, Arpoador y Leblon. Se revisaron 49 párrafos largos: el texto está cubierto por atributos trilingües o por el diccionario de Playas; las 12 páginas con diccionario de ruta mantienen sus entradas existentes.
- Revisión repetida tras integrar `ARPOADOR/photo3jpg.jpg`: el comprobador local recorrió 28 páginas, 904 atributos `href/src` (581 locales), 94 etiquetas `<img>`, 66 usos de fotografías de contenido con ALT ES/PT/EN, 157 filas CSV y 33 filas del adjunto marcadas integradas. Resultado: 0 destinos locales inexistentes, 0 fragmentos rotos y exactamente un `h1` por página.
- La validación local comprobó las 27 fichas y la portada: 581 referencias locales `href/src` (904 atributos `href/src` en total), 0 destinos inexistentes, 0 fragmentos rotos y un `h1` por página. La estructura editorial nueva conserva referencias `aria-labelledby` válidas.
- `node --check` pasó para `playas-photo-i18n.js`, `rio-beaches.js` y `rio-practical-page.js`. `git diff --check` pasó para archivos versionados de Playas y documentación; los documentos nuevos también se revisaron por whitespace. La verificación estática confirmó 33 URL estáticas integradas, 145 archivos del adjunto y 8 referencias remotas retenidas para revisión y 4 URL externas activas registradas (157 filas en total), 27 rutas en portada, 0 ALT faltantes; los 66 usos de fotografías de contenido tienen ALT ES/PT/EN (los 28 ALT del logotipo mantienen el nombre de marca); 0 enlaces locales rotos y 0 fragmentos rotos. La inspección visual de páginas renderizadas y la comprobación de URL individuales de candidatos no usados siguen pendientes.

## Límites importantes

- No se pudo iniciar un servidor de vista previa local (el entorno bloqueó la apertura del socket); Playwright está instalado, pero falta su ejecutable Chromium. El navegador cloud también rechaza abrir `file://` por política, por lo que no se accedió al HTML editado por esa vía. La evidencia de las hojas de contacto no sustituye una captura de ficha renderizada. No hay capturas del checkout editado ni QA visual de escritorio/iPhone 14.
- La repetición de `npm run check:locales` no pudo iniciarse porque falta `dist/locale-manifest.json`. La compilación local tampoco está disponible en este entorno: falta `@sparticuz/chromium` y el registro de npm no respondió durante la restauración; `npm ci --offline` confirmó que no está cacheado uno de los paquetes requeridos. No se generó `dist/` ni se publicó nada.
- No se probó Safari/iOS. No afirmar compatibilidad visual móvil.
- El directorio `FOTOS/HOME/PLAYAS/` de Hostinger respondió `403 Forbidden` al abrirlo el 10-10-2026; no se pudo enumerar el álbum completo. Las 11 playas sin carpeta en el ZIP podrían tener fotos en otros álbumes.
- No se consultó individualmente la URL de cada una de las 145 entradas del archivo ni de las ocho referencias remotas; sólo las 33 seleccionadas para integrar. La matriz registra una copia exacta duplicada (144 contenidos únicos).
- No se verificó el MIME del AVIF, datos HTTP de imágenes no seleccionadas ni permisos de uso comercial.
- No se realizó revisión editorial exhaustiva de historia, servicios, accesibilidad y datos de cada una de las 27 playas.

## Fuentes registradas

- INEA, balneabilidad: https://www.inea.rj.gov.br/ar-agua-e-solo/balneabilidade-das-praias/ — información dinámica por punto y fecha.
- Riotur, playas: https://riotur.rio/que_fazer/rio-praias/
- Riotur, Ipanema: https://riotur.rio/que_fazer/ipanema/
- Riotur, Arpoador: https://riotur.rio/que_fazer/arpoador/
- Riotur, Copacabana y Leme: https://riotur.rio/que_fazer/copacabana-e-leme/
- Riotur, Ipanema: https://riotur.rio/que_fazer/ipanema/
- Riotur, Praia Vermelha: https://riotur.rio/que_fazer/praia-vermelha/
- Riotur, São Conrado: https://riotur.rio/que_fazer/sao-conrado/
- Riotur, Pista Cláudio Coutinho: https://riotur.rio/que_fazer/pista-claudio-coutinho/
- Riotur, guía de costas y Caminho dos Pescadores: https://riotur.rio/wp-content/uploads/2023/05/Rotas-Cariocas-RIO-PRAIAS.pdf
- Associação Naturista de Abricó (ANAbricó), reglas y preguntas frecuentes: https://www.anabrico.com.br/perguntas — consultar presencia y condiciones del día; la asociación las condiciona al clima y la marea.
- ANAbricó, código de ética: https://www.anabrico.com.br/éuca — prohíbe fotografiar, grabar o filmar visitantes naturistas sin permiso.

### Investigación oficial ampliada (10-10-2026)

La cobertura de fuentes de gobierno para cada ficha y los hechos permitidos por cada fuente se registran en [`PLAYAS_FUENTES_OFICIALES_RIO.md`](PLAYAS_FUENTES_OFICIALES_RIO.md). La página vigente de Riotur dice que la ciudad ofrece más de 30 opciones, pero presenta una selección; las 27 rutas locales no son por sí solas un inventario exhaustivo. Antes de ampliar el catálogo se debe contrastar cada topónimo, acceso y relevancia con Riotur/Prefeitura, sin crear páginas vacías ni afirmar acceso para playas de uso restringido.

La consulta también separó tres fuentes que no deben confundirse: INEA publica balneabilidad del agua por fecha/punto; SMAC conserva información del monitoreo de arena y áreas naturales; Guardia Municipal/Prefeitura publica controles operativos estacionales. La nota municipal del 09-06-2026 registra Arpoador y Praia do Diabo como candidatas a Bandera Azul y dice que Prainha y Grumari ya la poseen; revisar vigencia antes de volver a mostrar ese estado.

## Pendientes para declarar terminada la guía

1. Revisar la vigencia del identificador de caché al preparar una futura actualización del preview.
2. Levantar una vista previa local compatible y capturar escritorio, móvil estrecho e iPhone 14 equivalente.
3. Verificar visualmente los 33 encuadres y los recortes de las 27 miniaturas de portada.
4. Enumerar y conciliar el álbum completo de Hostinger; confirmar el contexto de los tres archivos raíz; verificar de forma individual la URL de cualquier candidata no seleccionada antes de integrarla.
5. Confirmar derechos y consentimiento por archivo; reemplazar las cuatro URL externas sin licencia registrada, que se reutilizan en portada y ficha individual.
6. Investigar las 27 playas con fuentes específicas, ampliar contenido que aún no alcanza el nivel editorial pedido y terminar ES/PT-BR/EN.
7. Verificar metadata, hreflang, enlaces externos, carga de imágenes y accesibilidad.
8. El documento de conocimiento contiene 60 filas trilingües de Q&A y respuestas semilla por las 27 playas; hay solapamientos y no alcanza 10–20 preguntas únicas por ficha. Revisar, deduplicar y validar contra las guías antes de activarlo; el motor no se modificó.


## Actualización local — 10-10-2026 (fotografías y fuentes oficiales)

- Se añadieron 8 imágenes CC a las fichas que no tenían fotografía propia en el material local: Flamengo, Macumba, Pepê, Perigoso, Pontal, Praia do Secreto, Praias Selvagens y Prainha. Se reemplazaron las 4 URL externas sin licencia documentada (dos en Recreio y dos en São Conrado) por una foto CC en cada ficha y en la portada. Las tarjetas muestran crédito y licencia. La matriz suma 167 registros de archivo/fuente: 145 del adjunto, 8 referencias configuradas, 4 URL retiradas e históricas y 10 imágenes CC.
- Los 10 créditos apuntan al archivo y a su licencia de Commons; se indica que el servicio entrega una versión web redimensionada y que no hay recorte editorial. ALT ES/PT/EN, dimensiones intrínsecas, `loading=lazy` y `decoding=async` se añadieron a las fotografías nuevas. La imagen de Macumba se describe como vista desde Mirante do Roncador hacia Pedra do Pontal, coherente con el metadato del autor.
- Se descartó una candidata a Praia da Urca: Commons la categoriza como Praia Vermelha, así que no se reasignó. No hay evidencia suficiente para pedir una subida, porque la carpeta completa de Hostinger sigue cerrada con 403.
- El índice conserva 27 guías y agrega 9 referencias costeras citadas por fuentes públicas: Piscinão de Ramos, Bica, Moreninha, Sepetiba, Guanabara, Engenhoca, Imbuca, José Bonifácio y Brisa. Se rotulan como referencias complementarias; no se promete acceso, servicios ni balneabilidad. Riotur aclara que la ciudad tiene más de 30 opciones y su guía es una selección, no un inventario exhaustivo.
- Se comprobaron los metadatos de Commons (identidad, autor y licencia) para los 10 archivos y se obtuvieron páginas de archivo y algunas miniaturas; el navegador de búsqueda no permitió verificar HTTP cada una de las diez URL de imagen directamente. Por tanto, la carga final dentro del sitio y el encuadre en el render permanecen **pendientes de vista previa servida**. La validación visual de iPhone 14 y escritorio tampoco se pudo hacer.
- No se ejecutó commit, push ni despliegue.


### Cierre de cobertura de fotos — 10-10-2026

- Se incorporó a Praia da Urca una fotografía de Diego Baravelli identificada por Commons como Praia da Urca junto al antiguo Cassino da Urca. Fuente y licencia CC BY-SA 4.0 verificadas; la miniatura de 1280 × 853 se abrió y revisó visualmente en Commons. En ficha se conserva su proporción natural, con carga diferida, dimensiones, texto alternativo ES/PT/EN, crédito y enlace a licencia.
- Con esa incorporación, las 27 guías de `playas/` tienen al menos una imagen de contenido en su HTML. La matriz `PLAYAS_FOTOS_MAPEO.csv` queda en 168 registros; 11 corresponden a fuentes de Wikimedia Commons agregadas o reutilizadas.
- La fuente Commons confirma la identidad descrita como Praia da Urca y el autor/licencia; el render de la ficha alojada no se pudo comprobar desde este entorno. Sigue pendiente validar que todas las URL carguen en preview y revisar el aspecto responsive real.
- No se encontraron evidencias para pedir nuevas fotografías al propietario: el índice de Hostinger sigue devolviendo 403 y no permite certificar la ausencia global.
