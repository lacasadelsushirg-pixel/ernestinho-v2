# Verificación incremental del preview de cinco rutas — 15/11/2026

## Alcance y estado

Se inspeccionó el commit de preview `7b587a7070e6a3854b2cfa31ce538bcb8a8157d6` de PR #36, rama `release/cervantes-pt-en-20261115`, basada en Hostinger producción `revision/rendimiento-traducciones-81a904c` HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`.

Las 15 respuestas HTML previstas (cinco rutas por ES/PT-BR/EN) respondieron 200. Las tres variantes de cada página tienen el `lang` esperado, H1 único, canonical propio y alternates ES/PT-BR/EN/x-default. No hay alternate francés. Todas devuelven `X-Robots-Tag: noindex`; `/sitemap.xml` no está servido en este preview (404 con noindex). Es un preview privado, no una publicación.

## Comparación de contenido y preservación

- URLs de fotos del establecimiento: mismo conjunto en ES, PT-BR y EN para las cinco rutas (Don Camillo, Bar do Omar, Spicy Fish, Quiosque Dumaré y Amendoeira). En esta verificación no se detectó pérdida de fotos editoriales.
- Links externos: en las cinco rutas, ES incluye además los perfiles generales de Ernestinho en Instagram y TikTok; ambos faltan en las variantes PT-BR y EN del preview. Los enlaces propios del establecimiento y los mapas que sí aparecen en cada página coinciden por destino al ignorar el texto local de WhatsApp. Queda como incidencia de conservación por resolver antes de QA completo; no se añadieron ni alteraron enlaces.
- Comparación de párrafos visibles por igualdad literal con ES: Don Camillo conserva 7 párrafos idénticos tanto en PT como en EN (posiciones 2–8); Bar do Omar conserva 9 en PT y 8 en EN. Spicy Fish, Dumaré y Amendoeira no presentan párrafos literalmente idénticos a ES en esta prueba. La igualdad literal detecta omisiones de traducción, pero su ausencia no prueba por sí sola calidad semántica.
- La vista accesible de Don Camillo confirma que varios bloques editoriales siguen en español aunque los títulos de sección, resumen, metadatos, navegación y algunas secciones se hayan localizado. Los dos idiomas están incompletos en estas dos páginas.
- Las cinco páginas mantienen estructura de párrafos y H1/H2 comparables; la estructura no basta para marcar traducción completa.

## Captura visual

Se comprobó en navegador el hero de Don Camillo y se cargó la fotografía de fachada. La captura de navegador fue 1344×928, no 1440 px; no se pudo establecer un viewport de 390 px en esta sesión sin el método de viewport que la organización deshabilitó. Por tanto, la captura solo es inspección visual exploratoria y **no** aprobación de los viewports requeridos. No se aprobaron capturas antes/después a 1440/390.

## Recuento y continuación

- Candidatas privadas PT/EN del preview: 5, con render y SEO técnico inicial comprobados.
- Fichas completas PT/EN/FR con QA integral y vista aprobada: **0/50**.
- Cambios publicados en Hostinger por este trabajo: **0**.
- FR: no generado, noindex se mantiene y no hay hreflang ni URLs francesas en sitemap.
- Bloqueos prioritarios: terminar la traducción de los párrafos repetidos de Don Camillo y Bar do Omar; cotejar la presencia de enlaces generales de Instagram/TikTok contra la fuente aprobada y restaurarlos solo si son parte del bloque aprobado; obtener capturas reales a 1440/390; luego revisar FR íntegro y controles de sitemap/hreflang antes de solicitar revisión humana independiente.
- No se modificó código ni se inició un nuevo lote lingüístico en esta comprobación.



## Revisión del arreglo de inicialización — 15/11/2026, 11:00 UTC

La inspección del builder halló la causa del texto residual: en la compilación route-selective el preview no recibe el manifiesto live; las fichas Don Camillo y Bar do Omar tenían mapas posicionales históricos pero no activaban `forceLegacyParagraphs`. El builder actualiza el diccionario, pero sin esa marca no sustituía los párrafos estáticos del documento. Se añadió la marca en ambos diccionarios, sin editar HTML aprobado, contenido visual ni enlaces: Don Camillo en commit `7e4f3be96c8eefecda88513a4c3073ce43523d46`, Bar do Omar en `871e7e13afe0cf5fa93599888b9bd022fc62ba9f` (HEAD de PR #36 verificado en el corte).

El preview más reciente `ernestinho-v2-9afyi1iug-lacasadelsushirg-8125.vercel.app` devuelve ambas páginas PT con HTTP 200 y `X-Robots-Tag: noindex`; el sitemap responde 404/noindex. Tras comparar los párrafos estáticos fuente con las variantes EN/PT del mismo build, Don Camillo presenta 25/25 párrafos por idioma y 0 coincidencias literales con ES en PT y EN; Bar do Omar presenta 26/26 y 0 coincidencias literales. Los textos traducidos aparecen efectivamente en el HTML del render (incluido el segundo párrafo PT de Don Camillo). Esto resuelve el bloqueo de traducción literal en esas dos rutas y confirma que la inicialización actual del preview aplica los mapeos históricos.

Este es un QA parcial PT/EN, no una aprobación editorial semántica de cada párrafo. Las dos rutas siguen fuera del recuento de fichas completas: falta francés íntegro, cotejo semántico, verificar/restaurar los enlaces generales de marca solo si se confirman como contenido aprobado, capturas aprobadas a 1440 y 390 px y QA integral de sitemap/canonical/hreflang. No se tocó Hostinger. Recuento: **0/50 completas; 0 publicadas**. Las otras tres rutas del preview no se revalidaron en este corte y siguen con el estado previo.


## Reauditoría acumulativa después de los fixes — 15/11/2026

Se inspeccionó el deployment Vercel Ready del HEAD `7a64726f78c02b3165cfe6d63412eaaa31c83db4`, todavía privado. **Las 15 páginas ES/PT-BR/EN (cinco rutas × tres idiomas) responden HTTP 200** y tienen `X-Robots-Tag: noindex`. Cada página lleva un H1 y alternates `es`, `pt-BR`, `en`, `x-default`, con canonical propio. No hay hreflang francés; `/sitemap.xml` responde 404/noindex. Todos los conjuntos de URL de fotos editoriales coinciden entre las tres variantes por ficha.

| Ruta | Párrafos ES/PT/EN en HTML | Coincidencias literales PT/EN contra ES | Estado de idioma |
|---|---:|---:|---|
| `/gastronomia/don-camillo/` | 25/25/25 | 0/0 | PT/EN renderizan; falta FR y QA semántico |
| `/gastronomia/bar-do-omar/` | 26/26/26 | 0/0 | PT/EN renderizan; falta FR y QA semántico |
| `/gastronomia/spicy-fish/` | 29/29/29 | 0/0 | PT/EN renderizan; falta FR y QA semántico |
| `/gastronomia/dumare/` | 30/30/30 | 0/0 | PT/EN renderizan; falta FR y QA semántico |
| `/gastronomia/amendoeira/` | 24/24/24 | 0/0 | PT/EN renderizan; falta FR y QA semántico |

Estos son conteos de etiquetas `<p>` estáticas en el HTML, no una aprobación de sentido o cobertura. La verificación de anclas confirma que en cada ficha se conserva el Instagram del establecimiento, pero los href generales de Instagram Ernestinho y TikTok que aparecen en ES faltan en PT/EN. Se registra como diferencia a revisar contra el bloque aprobado; no se alteraron ni añadieron enlaces. Las capturas locales siguen sin aprobación visual independiente (la carga externa de fotos tuvo `ERR_EMPTY_RESPONSE`, no un 404 confirmado; los viewports de inspección anteriores tampoco alcanzaron 1440/390 en la misma sesión). FR, QA semántico, visual y revisión humana siguen pendientes. **Estado estricto: 0/50 completas y 0 publicadas en Hostinger.**

## Revalidación de fuente y navegador — 15/11/2026

En el deployment READY `7b587a7070e6a3854b2cfa31ce538bcb8a8157d6`, Vercel fetch devolvió HTTP 200 para las seis variantes ES/PT-BR/EN de Don Camillo y Bar do Omar. El HTML fuente contiene diccionarios de idioma, pero antes de ejecutar JS los párrafos del cuerpo siguen en ES en rutas PT/EN. No se infiere el DOM visible a partir de esa fuente. La navegación directa con Chrome fue enviada a la pantalla de login de Vercel; no se completó autenticación, no se obtuvo DOM ejecutado ni capturas válidas. Por tanto, el output del runtime en ese deployment no queda certificado en este corte. El HEAD actual de PR #36 sigue siendo `15f0217676b959a92844f690b72248369d50f206`, con check Vercel `failure` por `build-rate-limit`; el preview READY pertenece a otro SHA. Hostinger no se modificó: conserva los párrafos españoles ya contados en PT/EN. **0/50 completas; 0 publicadas.**

Siguiente paso verificable: disponer de runtime QA autorizado que no requiera solicitar credenciales en esta ejecución; luego comprobar render real, capturas 1440/390 y traducción FR integral antes de cerrar cualquier ficha o pedir revisión humana.


## Search Console por URL — 15/11/2026

Consulta nueva a OpenSEO/Search Console para la propiedad verificada `https://www.ernestinhocarioca.com.br/`, datos finales del 2026-10-16 al 2026-11-12 (PT). Cifras devueltas por URL:

| Ruta | Clics | Impresiones | CTR | Posición media |
|---|---:|---:|---:|---:|
| `/pt/gastronomia/don-camillo/` | 1 | 32 | 3,13% | 8,2 |
| `/en/gastronomia/don-camillo/` | 0 | 37 | 0% | 11,3 |
| `/pt/gastronomia/bar-do-omar/` | 1 | 27 | 3,70% | 7,4 |
| `/en/gastronomia/bar-do-omar/` | 0 | 10 | 0% | 8,3 |
| `/pt/gastronomia/spicy-fish/` | 0 | 25 | 0% | 5,0 |

Esto demuestra demanda e impresiones actuales en algunas variantes, pero la ventana aislada no permite concluir pérdida o tendencia; para eso hay que comparar periodos equivalentes y segmentar idioma/página. No son fallos de indexación. Sigue pendiente verificar en GSC el estado de indexación si se requiere: el informe aquí solo es rendimiento. Fuente: OpenSEO conectado a la propiedad indicada; estado `final`, sin pedir conexión adicional.

En esta ejecución no cambió el código ni se editó Hostinger. Contabilidad estricta: **0/50 fichas completas, 0 publicadas**. Estado durable: PR #36; cabeza documental previa a este informe `14a8cff62e108ab89f114152dc8c0679ae228027`. Próxima acción: resolver acceso autorizado al runtime del preview y completar QA semántico/FR/1440+390 antes de liberar.


## Comparación de rendimiento por idioma — ventanas equivalentes

GSC final comparado por página en dos periodos de 28 días, sin mezclar con estado de indexación:

| Ficha | ES: 18 sep–15 oct → 16 oct–12 nov | PT-BR: anterior → reciente | EN: anterior → reciente |
|---|---:|---:|---:|
| Amendoeira | 8 → 187 imp. | 104 → 8 imp. | 3 → 0 imp. |
| Bar do Omar | 42 → 183 imp. | 48 → 27 imp. | 8 → 10 imp. |
| Don Camillo | 17 → 65 imp. | 66 → 32 imp. | 0 → 37 imp. |
| Dumaré | 67 → 214 imp. | 0 → 148 imp. | 60 → 159 imp. |
| Spicy Fish | 77 → 351 imp. | 67 → 25 imp. | 62 → 5 imp. |

La caída de impresiones PT de Amendoeira y Spicy Fish, y EN de Spicy Fish, es una señal de rendimiento que merece revisión; no identifica por sí sola la causa ni confirma un problema de indexación. Dumaré creció en las tres variantes. Posición media reciente frente a anterior: Amendoeira ES 10,4→9,6 y PT 9,3→7,0; Bar ES 10,7→13,4 y PT 9,4→7,4; Don ES 8,5→12,3 y PT 6,6→8,2; Dumaré ES 7,7→7,4, PT nuevo 8,8, EN 7,8→9,7; Spicy ES 7,6→7,6, PT 8,2→5,0, EN 8,0→6,8. Las filas sin impresiones en la ventana corresponden a cero filas devueltas para esa URL/dimensión, no a una prueba de desindexación.

Siguiente análisis: segmentar consultas principales y revisar Inspection de URL para las caídas PT/EN, contrastando canonical seleccionado y último rastreo. No cambiar canonicals o sitemap basándose solo en impresiones. Fuente: Search Console conectado por OpenSEO, propiedad verificada; ventanas finales 2026-09-18–10-15 y 2026-10-16–11-12.


## Inspección de indexación GSC — 15/11/2026

La inspección URL de Search Console para cinco variantes reales (Amendoeira PT, Spicy Fish PT y EN, Bar do Omar PT, Don Camillo PT) devuelve `PASS` y estado `Enviada e indexada` en las cinco. Robots permitido, indexación permitida, fetch correcto y canonical de Google coincidente con canonical declarado. Últimos rastreos: Amendoeira PT 2026-10-07 07:06 UTC; Spicy Fish PT 2026-10-05 05:33 UTC; Spicy Fish EN 2026-10-05 11:12 UTC; Bar do Omar PT 2026-10-06 14:59 UTC; Don Camillo PT 2026-10-06 05:38 UTC. La variación de impresiones de las ventanas anteriores **no es aquí un error de indexación**. Mobile usability sale `VERDICT_UNSPECIFIED` (sin veredicto), no un fallo; rich result de breadcrumbs pasa con un item sin nombre, observación estructural que merece revisar, pero no impide esta indexación.

Inspección de indexación no cubrió las otras variantes EN/PT ni todas las 50 rutas; no extrapolar. Próxima verificación: consultar las variantes con caída de impresiones (Amendoeira PT/EN y Spicy Fish EN) y revisar queries/CTR; preservar canonicals actuales mientras GSC siga seleccionándolos.
