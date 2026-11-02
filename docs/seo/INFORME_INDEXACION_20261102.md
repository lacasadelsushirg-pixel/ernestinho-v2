# Auditoría y corrección de indexación — Ernestinho Carioca
Fecha: 2 de noviembre de 2026. Producción comprobada exclusivamente en Hostinger. Idiomas: ES, PT-BR y EN.

## Resultado ejecutivo

Las 412 URL del Excel existen como archivos publicados, responden HTTP 200, están en el sitemap, declaran su propia canonical y tienen un grupo hreflang correcto. No se encontró un bloqueo general que explique por sí solo su estado en Search Console. No se modificaron sus canonical ni se intentó forzar su indexación.

Se corrigieron 120 URL antiguas mediante redirecciones 301 verificadas. Se corrigió además el orden de renderizado de la guía gastronómica de Búzios, que dejaba fuera de su HTML publicado enlaces a 31 fichas de restaurante en cada idioma. Se generaron y subieron únicamente los tres HTML de esa guía y su módulo gastronómico de inicialización, sin reconstruir todo el sitio y sin subir el sitemap ni el manifiesto reducido del build de prueba.

Continúan pendientes las revisiones de contenido y las comprobaciones que requieren las listas de otras incidencias o la inspección individual de Google. El dato 412 corresponde al estado del informe exportado, no a una medición en tiempo real de indexación.

## 1. Alcance y fuentes

- Excel recibido: `https___www.ernestinhocarioca.com.br_-Coverage-Drilldown-2026-11-02(1).xlsx`, hojas Gráfico, Tabla y Metadatos. La tabla contiene exactamente 412 URL; el motivo es «Descubierta: actualmente sin indexar».
- El gráfico del Excel cubre el 3 de septiembre al 22 de octubre de 2026. La fecha de exportación no actualiza automáticamente esa serie.
- La columna «Último rastreo» contiene el valor numérico 25568, que no se utiliza como fecha de rastreo válida. No se inventaron fechas para estas URL descubiertas.
- Conexión Search Console: rendimiento diario septiembre–octubre; rendimiento por URL en octubre (1.848 filas); información de sitemaps. No expone las listas de cobertura, URL Inspection ni estadísticas de rastreo de Googlebot.
- Rastreo propio autorizado: HTML y metadatos de las 2.481 URL del sitemap, estados HTTP y comprobación adicional HEAD para 1.250 de ellas; 412 existencias físicas contrastadas con inventarios de Hostinger.
- Código base: `5b651c158268a7d9b0f3eda1b1e8ee99b48bfc12`, descendiente de la recuperación 5358bee. Rama independiente: `seo/indexacion-20261102`.

Los grupos restantes indicados por el usuario —26 errores 404, 9 rastreadas sin indexar, 9 redirecciones y 2 duplicadas— no vienen desglosados en este Excel. No se afirma que las 120 reglas equivalgan a esos 26 casos: son URL antiguas confirmadas mediante el historial de rendimiento y las redirecciones ya declaradas en el código.

## 2. Comprobaciones técnicas

| Comprobación | Resultado |
| --- | --- |
| URL del sitemap público | 2481 |
| HTTP 200 en las URL del sitemap | 2481 |
| Canonical propia correcta | 2481 |
| Grupos hreflang ES / PT-BR / EN / x-default | 2481 |
| URL del Excel examinadas | 412 |
| Archivos publicados de esas URL | 412 |
| URL del Excel incluidas en sitemap | 412 |
| Bloqueos por robots.txt o noindex en esas URL | 0 |
| Redirecciones involuntarias dentro del sitemap | 0 |
| Cambios en archivos de Carioc-IA | 0 |

Para cada URL, la canonical esperada es la propia URL de la tabla. Los alternates apuntan a la misma ruta sin prefijo (es y x-default), con `/pt` (pt-BR) y con `/en` (en). Se contrastaron las variantes con el conjunto completo de páginas publicadas. `robots.txt` permite el rastreo y anuncia el sitemap correcto.

### Clasificación de las 412 URL

| Idioma | URL |
| --- | --- |
| Español | 47 |
| Portugués | 186 |
| Inglés | 179 |
| Total | 412 |

| Sección | URL |
| --- | --- |
| gastronomia | 98 |
| cultura | 76 |
| destinos/buzios | 66 |
| compras | 24 |
| vida-nocturna | 24 |
| barrios | 23 |
| consejos | 17 |
| experiencias | 16 |
| familia | 12 |
| hospedaje | 10 |
| transportes | 10 |
| naturaleza | 8 |
| playas | 8 |
| guia | 7 |
| atracciones | 6 |
| cafe-rio | 3 |
| fotografia | 2 |
| historia | 1 |
| privacidad-precios-condiciones | 1 |

| Prioridad comercial | Criterio | URL |
| --- | --- | --- |
| P1 | Tours/experiencias, alojamiento, transporte y rutas de Búzios directamente vinculadas con contratación | 51 |
| P2 | Descubrimiento turístico, restaurantes, barrios, cultura y guías de planificación | 359 |
| P3 | Contenido institucional/legal de menor intención comercial | 2 |

La prioridad es editorial/comercial, no una puntuación de Google ni una promesa de posicionamiento. La matriz final añade impresiones reales de octubre para ordenar revisiones dentro de cada grupo.

## 3. Sitemap y publicación incremental

- El sitemap fuente del repositorio contiene **593 URL españolas**. El publicado mide **1.397.075 bytes** y contiene **2.481 URL: 827 por idioma**. Es XML con variantes hreflang, por lo que el tamaño por sí solo no indica un error.
- `locale-manifest.json` registra 2.528 rutas publicadas; 2.481 son indexables. Las 47 restantes son páginas excluidas, alias/redirects o páginas especiales. El conjunto de URL indexables del manifiesto coincide exactamente con el sitemap: sin sobrantes ni ausencias.
- Search Console informa una lectura el **30 de octubre, 22:52 UTC**, con 2.481 URL enviadas, cero errores y cero advertencias. Hay un registro anterior de 2.352 URL leído el 18 de octubre.
- `scripts/build_sitemap.py` genera el sitemap sobre el árbol HTML de salida y excluye noindex, meta refresh, alias y playas provisionales de Búzios. Sus controles de canonical y alternates no dieron una discrepancia en la producción revisada.
- `scripts/build_multilingual.mjs` conserva el HTML previo para publicar por rutas. La corrección ejecutada usó `--routes=/destinos/buzios/comer-y-salir/`: el registro confirmó **3 de 2.574 páginas de idioma**, y la salida local contiene solo tres HTML. Aunque el mensaje histórico del script llama «full» al modo sin manifiesto local, **no se ejecutó la reconstrucción de las 2.574 páginas**.
- Solo se transfirieron esos tres archivos HTML y `assets/js/buzios-food-guide.js`. No se publicó el sitemap ni el manifiesto de esa salida reducida. No se cambió robots.txt, la política de canonical, la configuración de idiomas ni la configuración de compilación de Hostinger.

**Continuidad de código:** el cambio permanente del compilador está preparado en la rama SEO. La rama habitual de publicación no se actualizó ni se activó su despliegue automático, para preservar el trabajo concurrente y evitar una sincronización masiva. El cambio debe incorporarse desde esa rama SEO antes de una futura regeneración de esta ruta; hasta entonces la corrección publicada se conserva en los tres HTML actuales.

## 4. Investigación del cambio de octubre

| Fecha del gráfico | Descubiertas sin indexar | Cambio |
| --- | --- | --- |
| 2026-09-03 | 497 | — |
| 2026-09-04 | 487 | -10 |
| 2026-09-18 | 298 | -189 |
| 2026-09-21 | 729 | 431 |
| 2026-10-04 | 724 | -5 |
| 2026-10-09 | 704 | -20 |
| 2026-10-12 | 36 | -668 |
| 2026-10-16 | 957 | 921 |
| 2026-10-19 | 412 | -545 |

La secuencia de octubre es 704 → 36 → 957 → 412. El salto de +921 aparece el 16 de octubre. En el código hay generación multilingüe desde el 3 de octubre, cambios de publicación y metadatos el 15–16 y reducción de carga de Chromium el 19. La proximidad de fechas es una hipótesis de relación, no prueba de un fallo de rastreo ni de una penalización. Faltan estadísticas de rastreo, registros de Googlebot y las fechas exactas de despliegue de todo ese periodo para atribuir la causa.

Search Console registra **311 clics y 70.605 impresiones en octubre**. Nueve URL de la lista del Excel tuvieron conjuntamente 269 impresiones y un clic durante ese mes. Eso acredita visibilidad en algún momento del periodo, pero no demuestra su estado de indexación actual.

## 5. Correcciones publicadas y verificadas

### A. Redirecciones de URL antiguas

**120 reglas**: 87 alias ya declarados en el repositorio que no estaban funcionando en Hostinger, más 33 variantes históricas equivalentes de 11 rutas en tres idiomas. Se eligieron destinos existentes, indexables, del mismo tema y del mismo idioma. Se verificaron individualmente **301 → destino exacto → 200**, canonical propia, idioma y hreflang.

Ejemplo comercial: `/guia/viajar-a-brasil-con-menores-de-edad` tenía 207 impresiones y 4 clics en octubre, pero respondía 404; ahora apunta directamente a `/guia/menores/`. Se comprobó también el comportamiento con y sin www.

Las reglas se guardaron mediante la configuración de redirecciones de Hostinger. No se activó una redirección general de dominio ni una regla para enviar todos los 404 a la portada. Los fallos temporales al guardar se resolvieron contrastando las reglas efectivamente registradas antes de reintentar.

### B. Catálogo gastronómico de Búzios

El renderizador especializado `buzios-food-guide.js` genera el catálogo aprobado, pero el compilador reaplicaba después el renderizador general de Búzios y sustituía ese contenido. Se añadió una llamada final al renderizador especializado, limitada a las páginas que ya lo incluyen. Además, su inicialización en navegador ahora espera el `ready` del módulo general que la página ya carga, para evitar que una llegada tardía sustituya el catálogo. Se actualizó únicamente el token de versión de ese módulo en la página fuente. No se reescribieron restaurantes ni se añadieron imágenes, estilos o componentes nuevos.

La prueba de regresión falla con el HTML anterior —faltan 31 enlaces por idioma— y pasa con el nuevo: **42 rutas únicas de fichas existentes enlazadas por idioma**. La interfaz muestra 43 tarjetas porque el catálogo aprobado contiene una repetición de La Gare; no se eliminó contenido dentro de esta auditoría. Se comprobó además el buscador de la página en navegador, que encuentra Madame Bardot.

| Idioma | Archivo publicado | HTTP | Canonical / hreflang | Fichas únicas enlazadas |
| --- | --- | --- | --- | --- |
| ES | destinos/buzios/comer-y-salir/index.html | 200 | Correctos | 42 |
| PT | pt/destinos/buzios/comer-y-salir/index.html | 200 | Correctos | 42 |
| EN | en/destinos/buzios/comer-y-salir/index.html | 200 | Correctos | 42 |

Los tres archivos descargados de producción coinciden byte a byte con los tres compilados y validados. La corrección restaura 93 enlaces locales de fichas en el HTML inicial, incluyendo la ficha EN de Madame Bardot que figura entre las 412. El grafo de navegación del sitemap pasa de 123 a 30 URL sin recorrido desde la portada en el HTML analizado; dentro de las 412, pasa de 10 a 9. Esto no significa que las demás fueran desconocidas para Google: ya estaban en el sitemap y tienen enlaces de variantes de idioma.

### Archivos de código y evidencia

- `scripts/build_multilingual.mjs`: tres líneas para respetar el renderizador especializado al finalizar la compilación.
- `assets/js/buzios-food-guide.js`: espera explícita del renderizador general; sin reescritura de contenido.
- `destinos/buzios/comer-y-salir/index.html`: actualización del token de caché del módulo gastronómico.
- `scripts/check_buzios_food_catalogue.py`: comprobación de enlaces a las fichas fuente y metadatos de las tres variantes.
- `docs/seo/redirects-20261102.json`: reglas exactas, destinos y justificación.
- `docs/seo/audit-412-20261102.json`: revisión de cada URL y prioridades.
- `docs/seo/summary-20261102.json` y este informe: resultados y seguimiento.

## 6. Contenido, idioma y diferenciación: asuntos pendientes

1. **84 de las 412 URL requieren revisar la traducción del cuerpo.** Un detector de coincidencias de secuencias de seis palabras encuentra que más del 50% de las secuencias coinciden con ES en 370 variantes PT/EN de todo el sitemap; 84 pertenecen al Excel. Es un filtro de revisión, no la decisión de duplicación de Google. La comprobación manual de la ficha EN/PT de Madame Bardot confirma encabezados traducidos con párrafos principales en español. Dentro de las 84 predominan gastronomía (78), compras (5) y Búzios (1). Tener `lang`, canonical y hreflang correctos no traduce el contenido.
2. **14 URL del Excel tienen menos de 150 palabras en el contenido principal extraído.** Es una señal para revisar utilidad y completitud, no un mínimo exigido por Google. Incluye Pequena África EN y el estudio 1-1 EN. No se rellenaron con texto genérico ni se aplicó noindex por longitud.
3. **9 URL del Excel siguen sin recorrido desde la portada en el HTML del sitemap**. Conservan entradas por variantes de idioma; deben revisarse pertinencia, duplicación y calidad antes de añadir enlaces indiscriminadamente. La lista está identificada en la matriz.
4. No aparecieron duplicados de texto principal exactamente idéntico dentro del mismo idioma en este análisis. Eso no descarta similitud sustancial, contenido parcial duplicado o una canonical distinta elegida por Google.
5. Las playas provisionales de Búzios y sus variantes traducidas ausentes se conservaron como estaban; no se añadieron al sitemap ni se solicitará su indexación hasta completar su contenido. Entre las URL históricas con impresiones hay siete variantes PT/EN que siguen dando 404 por esta exclusión prevista.
6. Se dejaron para revisión tres rutas históricas sin sustitución inequívoca: `/barrios/barra-da-tijuca-ilha-da-gigoia`, `/barrios/sao-conrado-gavea-jardim-botanico-lagoa` y `/que-hacer`. No se enviaron arbitrariamente a una página solo parcialmente relacionada.
7. Para resolver exactamente los 26 casos 404, 9 rastreadas, 9 redirigidas y 2 duplicadas mencionados al inicio hacen falta sus listas de URL o acceso de inspección en Search Console. Los números de esos grupos no se sustituyen por el rastreo propio.

No se ejecutó una traducción masiva ni una compilación completa. Las traducciones necesitan cambios editoriales comprobados y pruebas por rutas; pueden organizarse por lotes, pero no deben publicarse cambiando solo los atributos de idioma. No es necesario reconstruir toda la web para revisar estos contenidos.

## 7. Seguimiento en Search Console

1. Incorporar el cambio del compilador desde la rama SEO antes de regenerar la guía gastronómica de Búzios. Mantener el despliegue por rutas.
2. Inspeccionar muestras prioritarias con «Probar URL publicada»: guía de menores nueva; tres hubs gastronómicos de Búzios; Madame Bardot EN; y una selección de las 51 URL P1. Revisar obtención de página, canonical declarada/seleccionada y contenido renderizado.
3. Para las URL antiguas reparadas, comprobar que Google recibe el 301 y que el destino correcto es indexable. Solicitar validación del grupo 404 solo después de cruzar su lista completa. Las antiguas seguirán sin indexarse como URL independientes: eso es correcto.
4. Mantener el sitemap público actual. Google ya lo leyó sin errores; no reenviarlo repetidamente como mecanismo para forzar la indexación. La auditoría no cambió su conjunto de URL.
5. Completar primero las traducciones de las variantes con cuerpo en español y las fichas comerciales breves; después solicitar indexación de una selección justificada de destinos, no de los 412 en bloque.
6. Revisar estadísticas de rastreo de octubre: disponibilidad del host, errores 5xx, tiempo de respuesta, volumen de solicitudes y respuestas por código. Contrastar con logs de Hostinger y fechas de despliegue antes de atribuir el salto a capacidad de rastreo.
7. Comparar en 7–14 días y de nuevo a las 3–4 semanas el número de URL por motivo, las canonical elegidas y las impresiones/clics de los destinos. Estas son ventanas de revisión, no plazos garantizados de Google.

## 8. Fuentes técnicas de referencia

- [Google: cómo funciona la búsqueda](https://developers.google.com/search/docs/fundamentals/how-search-works)
- [Google: sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Google: sitios multilingües](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Google: versiones localizadas](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google: guía SEO y longitud del contenido](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

El sitemap y las etiquetas ayudan a descubrir y entender las páginas, pero no garantizan rastreo, indexación ni posiciones. No se declaran las 412 URL indexadas.

## Anexo A. Matriz individual de las 412 URL

C/H/R = canonical propia, hreflang exacto y robots sin bloqueo; «OK» significa que los tres controles pasaron. Archivo y sitemap se comprobaron para todas las filas. «Enlaces» cuenta páginas del sitemap con enlace HTML entrante, después de la corrección. Impresiones corresponden a octubre; no son un estado de indexación actual.

| URL | Idioma | Sección | Prioridad | HTTP | Archivo / sitemap | C/H/R | Palabras main | Enlaces | Impresiones oct. | Acción |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| https://www.ernestinhocarioca.com.br/en/transportes/barcas/ | en | transportes | P1 | 200 | Sí / Sí | OK | 927 | 4 | 8 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/alojamiento/ | es | destinos/buzios | P1 | 200 | Sí / Sí | OK | 3344 | 28 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/como-llegar/ | es | destinos/buzios | P1 | 200 | Sí / Sí | OK | 904 | 6 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/experiencias/ | es | destinos/buzios | P1 | 200 | Sí / Sí | OK | 1760 | 81 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/experiencias/alquiler-buggy/ | es | destinos/buzios | P1 | 200 | Sí / Sí | OK | 488 | 6 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/experiencias/rio-desde-buzios/ | es | destinos/buzios | P1 | 200 | Sí / Sí | OK | 512 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/alojamiento/ | en | destinos/buzios | P1 | 200 | Sí / Sí | OK | 3151 | 28 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/como-llegar/ | en | destinos/buzios | P1 | 200 | Sí / Sí | OK | 851 | 6 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/experiencias/ | en | destinos/buzios | P1 | 200 | Sí / Sí | OK | 1604 | 81 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/experiencias/alquiler-buggy/ | en | destinos/buzios | P1 | 200 | Sí / Sí | OK | 458 | 6 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/experiencias/buceo/ | en | destinos/buzios | P1 | 200 | Sí / Sí | OK | 477 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/experiencias/cabo-frio/ | en | destinos/buzios | P1 | 200 | Sí / Sí | OK | 469 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/experiencias/ala-delta/ | en | experiencias | P1 | 200 | Sí / Sí | OK | 788 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/experiencias/aquario-boulevard/ | en | experiencias | P1 | 200 | Sí / Sí | OK | 262 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/experiencias/arraial-do-cabo/ | en | experiencias | P1 | 200 | Sí / Sí | OK | 801 | 8 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/experiencias/carnaval-experience/ | en | experiencias | P1 | 200 | Sí / Sí | OK | 691 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/experiencias/paracaidas/ | en | experiencias | P1 | 200 | Sí / Sí | OK | 157 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/experiencias/pedra-bonita/ | en | experiencias | P1 | 200 | Sí / Sí | OK | 814 | 2 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/experiencias/pequena-africa/ | en | experiencias | P1 | 200 | Sí / Sí | OK | 91 | 3 | 0 | Revisión editorial: texto breve |
| https://www.ernestinhocarioca.com.br/en/experiencias/rocinha/ | en | experiencias | P1 | 200 | Sí / Sí | OK | 753 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/hospedaje/1015/ | en | hospedaje | P1 | 200 | Sí / Sí | OK | 343 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/hospedaje/621/ | en | hospedaje | P1 | 200 | Sí / Sí | OK | 296 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/hospedaje/805/ | en | hospedaje | P1 | 200 | Sí / Sí | OK | 353 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/hospedaje/estudio-1-1/ | en | hospedaje | P1 | 200 | Sí / Sí | OK | 67 | 2 | 0 | Revisión editorial: texto breve; Revisar acceso desde navegación HTML |
| https://www.ernestinhocarioca.com.br/en/hospedaje/goia/ | en | hospedaje | P1 | 200 | Sí / Sí | OK | 343 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/hospedaje/venti/ | en | hospedaje | P1 | 200 | Sí / Sí | OK | 321 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/transportes/ | en | transportes | P1 | 200 | Sí / Sí | OK | 1180 | 608 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/transportes/alquiler-vehiculo/ | en | transportes | P1 | 200 | Sí / Sí | OK | 903 | 2 | 0 | Revisar acceso desde navegación HTML |
| https://www.ernestinhocarioca.com.br/en/transportes/brt/ | en | transportes | P1 | 200 | Sí / Sí | OK | 1185 | 8 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/transportes/trenes/ | en | transportes | P1 | 200 | Sí / Sí | OK | 851 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/transportes/uber/ | en | transportes | P1 | 200 | Sí / Sí | OK | 1218 | 11 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/experiencias/angra-ilha-grande/ | es | experiencias | P1 | 200 | Sí / Sí | OK | 886 | 7 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/hospedaje/1015/ | es | hospedaje | P1 | 200 | Sí / Sí | OK | 340 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/hospedaje/casa-candida/ | es | hospedaje | P1 | 200 | Sí / Sí | OK | 339 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/alojamiento/ | pt | destinos/buzios | P1 | 200 | Sí / Sí | OK | 3103 | 28 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/como-llegar/ | pt | destinos/buzios | P1 | 200 | Sí / Sí | OK | 780 | 6 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/experiencias/ | pt | destinos/buzios | P1 | 200 | Sí / Sí | OK | 1525 | 81 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/experiencias/alquiler-buggy/ | pt | destinos/buzios | P1 | 200 | Sí / Sí | OK | 436 | 6 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/experiencias/ala-delta/ | pt | experiencias | P1 | 200 | Sí / Sí | OK | 843 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/experiencias/aquario-boulevard/ | pt | experiencias | P1 | 200 | Sí / Sí | OK | 264 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/experiencias/arraial-do-cabo/ | pt | experiencias | P1 | 200 | Sí / Sí | OK | 874 | 8 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/experiencias/buzios/ | pt | experiencias | P1 | 200 | Sí / Sí | OK | 519 | 7 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/experiencias/carnaval-experience/ | pt | experiencias | P1 | 200 | Sí / Sí | OK | 713 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/experiencias/maracana-experience/ | pt | experiencias | P1 | 200 | Sí / Sí | OK | 510 | 8 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/experiencias/vuelo-en-parapente/ | pt | experiencias | P1 | 200 | Sí / Sí | OK | 873 | 6 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/hospedaje/1015/ | pt | hospedaje | P1 | 200 | Sí / Sí | OK | 347 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/hospedaje/621/ | pt | hospedaje | P1 | 200 | Sí / Sí | OK | 307 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/transportes/ | pt | transportes | P1 | 200 | Sí / Sí | OK | 1236 | 608 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/transportes/alquiler-vehiculo/ | pt | transportes | P1 | 200 | Sí / Sí | OK | 1009 | 2 | 0 | Revisar acceso desde navegación HTML |
| https://www.ernestinhocarioca.com.br/pt/transportes/brt/ | pt | transportes | P1 | 200 | Sí / Sí | OK | 1272 | 8 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/transportes/trenes/ | pt | transportes | P1 | 200 | Sí / Sí | OK | 897 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/terra-brasilis/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 721 | 3 | 94 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/consejos/20-consejos/ | en | consejos | P2 | 200 | Sí / Sí | OK | 1043 | 3 | 63 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/gastronomia/terra-brasilis/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 709 | 3 | 34 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/nino-cucina-ipanema/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 866 | 3 | 25 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/temperarte-bolivar/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 716 | 3 | 17 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/atracciones/aquario/ | en | atracciones | P2 | 200 | Sí / Sí | OK | 1231 | 4 | 14 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/atracciones/pao-de-acucar/ | en | atracciones | P2 | 200 | Sí / Sí | OK | 1555 | 3 | 12 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/vida-nocturna/carioca-da-gema/ | en | vida-nocturna | P2 | 200 | Sí / Sí | OK | 376 | 3 | 2 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/barrios/barra-oeste/ | es | barrios | P2 | 200 | Sí / Sí | OK | 496 | 5 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/barrios/botafogo-urca/ | es | barrios | P2 | 200 | Sí / Sí | OK | 501 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/barrios/centro-maua/ | es | barrios | P2 | 200 | Sí / Sí | OK | 499 | 6 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/barrios/centro/ | es | barrios | P2 | 200 | Sí / Sí | OK | 577 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/barrios/gavea/ | es | barrios | P2 | 200 | Sí / Sí | OK | 491 | 5 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/barrios/gloria/ | es | barrios | P2 | 200 | Sí / Sí | OK | 533 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/barrios/jacarepagua/ | es | barrios | P2 | 200 | Sí / Sí | OK | 450 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/barrios/santa-lapa/ | es | barrios | P2 | 200 | Sí / Sí | OK | 511 | 5 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/barrios/tijuca/ | es | barrios | P2 | 200 | Sí / Sí | OK | 505 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/barrios/vargens/ | es | barrios | P2 | 200 | Sí / Sí | OK | 441 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/cafe-rio/ | es | cafe-rio | P2 | 200 | Sí / Sí | OK | 606 | 780 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/consejos/playa-barracas-quiosques/ | es | consejos | P2 | 200 | Sí / Sí | OK | 637 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/cultura/arquitectura/ | es | cultura | P2 | 200 | Sí / Sí | OK | 637 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/cultura/correios/ | es | cultura | P2 | 200 | Sí / Sí | OK | 220 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/cultura/folclore-edison-carneiro/ | es | cultura | P2 | 200 | Sí / Sí | OK | 805 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/cultura/penha/ | es | cultura | P2 | 200 | Sí / Sí | OK | 209 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/accesibilidad/ | es | destinos/buzios | P2 | 200 | Sí / Sí | OK | 544 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/comer-y-salir/ | es | destinos/buzios | P2 | 200 | Sí / Sí | OK | 3032 | 123 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/comer-y-salir/altto/ | es | destinos/buzios | P2 | 200 | Sí / Sí | OK | 764 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/comer-y-salir/anexo-praia/ | es | destinos/buzios | P2 | 200 | Sí / Sí | OK | 815 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/comer-y-salir/farinatta/ | es | destinos/buzios | P2 | 200 | Sí / Sí | OK | 760 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/comer-y-salir/macaw/ | es | destinos/buzios | P2 | 200 | Sí / Sí | OK | 806 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/comer-y-salir/san-telmo/ | es | destinos/buzios | P2 | 200 | Sí / Sí | OK | 804 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/cruceros/ | es | destinos/buzios | P2 | 200 | Sí / Sí | OK | 1578 | 5 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/gastronomia-argentina/ | es | destinos/buzios | P2 | 200 | Sí / Sí | OK | 1063 | 2 | 0 | Revisar acceso desde navegación HTML |
| https://www.ernestinhocarioca.com.br/destinos/buzios/gastronomia-chilena/ | es | destinos/buzios | P2 | 200 | Sí / Sí | OK | 615 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/internet/ | es | destinos/buzios | P2 | 200 | Sí / Sí | OK | 461 | 6 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/mascotas/ | es | destinos/buzios | P2 | 200 | Sí / Sí | OK | 727 | 5 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/perfiles/ | es | destinos/buzios | P2 | 200 | Sí / Sí | OK | 1412 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/playas/ | es | destinos/buzios | P2 | 200 | Sí / Sí | OK | 106 | 83 | 0 | Revisión editorial: texto breve |
| https://www.ernestinhocarioca.com.br/destinos/buzios/salud/ | es | destinos/buzios | P2 | 200 | Sí / Sí | OK | 754 | 5 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/seguridad/ | es | destinos/buzios | P2 | 200 | Sí / Sí | OK | 524 | 6 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/destinos/buzios/servicios/ | es | destinos/buzios | P2 | 200 | Sí / Sí | OK | 513 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/atracciones/parque-lage/ | en | atracciones | P2 | 200 | Sí / Sí | OK | 908 | 5 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/barrios/cadeg/ | en | barrios | P2 | 200 | Sí / Sí | OK | 442 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/barrios/flamengo-gloria/ | en | barrios | P2 | 200 | Sí / Sí | OK | 483 | 6 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/barrios/ipanema-leblon/ | en | barrios | P2 | 200 | Sí / Sí | OK | 513 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/barrios/recreio/ | en | barrios | P2 | 200 | Sí / Sí | OK | 523 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/barrios/sao-cristovao/ | en | barrios | P2 | 200 | Sí / Sí | OK | 519 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cafe-rio/ | en | cafe-rio | P2 | 200 | Sí / Sí | OK | 611 | 608 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/compras/barrashopping/ | en | compras | P2 | 200 | Sí / Sí | OK | 1643 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/compras/botafogo-praia-shopping/ | en | compras | P2 | 200 | Sí / Sí | OK | 1298 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/compras/fashion-mall/ | en | compras | P2 | 200 | Sí / Sí | OK | 1165 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/compras/feira-da-gloria/ | en | compras | P2 | 200 | Sí / Sí | OK | 833 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/compras/feira-hippie-ipanema/ | en | compras | P2 | 200 | Sí / Sí | OK | 914 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/compras/feira-sao-cristovao/ | en | compras | P2 | 200 | Sí / Sí | OK | 701 | 4 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/compras/mercadao-madureira/ | en | compras | P2 | 200 | Sí / Sí | OK | 894 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/compras/mercado-sao-pedro/ | en | compras | P2 | 200 | Sí / Sí | OK | 694 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/compras/praca-xv/ | en | compras | P2 | 200 | Sí / Sí | OK | 870 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/compras/shopping-leblon/ | en | compras | P2 | 200 | Sí / Sí | OK | 1221 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/compras/uruguaiana/ | en | compras | P2 | 200 | Sí / Sí | OK | 916 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/consejos/estado-del-mar-playas/ | en | consejos | P2 | 200 | Sí / Sí | OK | 602 | 23 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/consejos/lluvia/ | en | consejos | P2 | 200 | Sí / Sí | OK | 625 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/consejos/maletas-rio/ | en | consejos | P2 | 200 | Sí / Sí | OK | 786 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/consejos/que-hacer-cada-dia/ | en | consejos | P2 | 200 | Sí / Sí | OK | 332 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/consejos/revisar-alojamiento/ | en | consejos | P2 | 200 | Sí / Sí | OK | 123 | 3 | 0 | Revisión editorial: texto breve |
| https://www.ernestinhocarioca.com.br/en/consejos/seguro-viaje/ | en | consejos | P2 | 200 | Sí / Sí | OK | 227 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/consejos/supermercados/ | en | consejos | P2 | 200 | Sí / Sí | OK | 3365 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/academia-brasileira-letras/ | en | cultura | P2 | 200 | Sí / Sí | OK | 240 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/amanha/ | en | cultura | P2 | 200 | Sí / Sí | OK | 660 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/bibliomaison/ | en | cultura | P2 | 200 | Sí / Sí | OK | 229 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/biblioteca-ccbb/ | en | cultura | P2 | 200 | Sí / Sí | OK | 247 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/biblioteca-ccjf/ | en | cultura | P2 | 200 | Sí / Sí | OK | 230 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/bonsucesso/ | en | cultura | P2 | 200 | Sí / Sí | OK | 142 | 3 | 0 | Revisión editorial: texto breve |
| https://www.ernestinhocarioca.com.br/en/cultura/casa-da-leitura/ | en | cultura | P2 | 200 | Sí / Sí | OK | 228 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/casa-franca/ | en | cultura | P2 | 200 | Sí / Sí | OK | 215 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/catedral-metropolitana/ | en | cultura | P2 | 200 | Sí / Sí | OK | 184 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/ccbb/ | en | cultura | P2 | 200 | Sí / Sí | OK | 244 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/centros-culturales/ | en | cultura | P2 | 200 | Sí / Sí | OK | 266 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/chacara-ceu/ | en | cultura | P2 | 200 | Sí / Sí | OK | 609 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/dulcina/ | en | cultura | P2 | 200 | Sí / Sí | OK | 169 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/fernanda-montenegro/ | en | cultura | P2 | 200 | Sí / Sí | OK | 225 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/forte-barao-rio-branco/ | en | cultura | P2 | 200 | Sí / Sí | OK | 236 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/forte-duque-caxias/ | en | cultura | P2 | 200 | Sí / Sí | OK | 257 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/forte-gragoata/ | en | cultura | P2 | 200 | Sí / Sí | OK | 224 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/forte-pico/ | en | cultura | P2 | 200 | Sí / Sí | OK | 229 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/forte-sao-luiz/ | en | cultura | P2 | 200 | Sí / Sí | OK | 215 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/gloria-outeiro/ | en | cultura | P2 | 200 | Sí / Sí | OK | 184 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/ihgb/ | en | cultura | P2 | 200 | Sí / Sí | OK | 547 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/joao-caetano/ | en | cultura | P2 | 200 | Sí / Sí | OK | 195 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/jose-bonifacio/ | en | cultura | P2 | 200 | Sí / Sí | OK | 210 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/laura-alvim/ | en | cultura | P2 | 200 | Sí / Sí | OK | 165 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/livraria-argumento/ | en | cultura | P2 | 200 | Sí / Sí | OK | 215 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/museos/ | en | cultura | P2 | 200 | Sí / Sí | OK | 551 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/museu-historico-cidade/ | en | cultura | P2 | 200 | Sí / Sí | OK | 607 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/museu-light/ | en | cultura | P2 | 200 | Sí / Sí | OK | 536 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/museu-pontal/ | en | cultura | P2 | 200 | Sí / Sí | OK | 687 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/nossa-senhora-paz/ | en | cultura | P2 | 200 | Sí / Sí | OK | 144 | 3 | 0 | Revisión editorial: texto breve |
| https://www.ernestinhocarioca.com.br/en/cultura/povos-indigenas/ | en | cultura | P2 | 200 | Sí / Sí | OK | 674 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/santa-margarida/ | en | cultura | P2 | 200 | Sí / Sí | OK | 132 | 3 | 0 | Revisión editorial: texto breve |
| https://www.ernestinhocarioca.com.br/en/cultura/sao-judas/ | en | cultura | P2 | 200 | Sí / Sí | OK | 144 | 3 | 0 | Revisión editorial: texto breve |
| https://www.ernestinhocarioca.com.br/en/cultura/sesc-ginastico/ | en | cultura | P2 | 200 | Sí / Sí | OK | 161 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/teatro-dos-quatro/ | en | cultura | P2 | 200 | Sí / Sí | OK | 178 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/cultura/villa-lobos/ | en | cultura | P2 | 200 | Sí / Sí | OK | 525 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/accesibilidad/ | en | destinos/buzios | P2 | 200 | Sí / Sí | OK | 480 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/comer-y-salir/altto/ | en | destinos/buzios | P2 | 200 | Sí / Sí | OK | 728 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/comer-y-salir/anexo-praia/ | en | destinos/buzios | P2 | 200 | Sí / Sí | OK | 736 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/comer-y-salir/farinatta/ | en | destinos/buzios | P2 | 200 | Sí / Sí | OK | 733 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/comer-y-salir/macaw/ | en | destinos/buzios | P2 | 200 | Sí / Sí | OK | 739 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/comer-y-salir/madame-bardot/ | en | destinos/buzios | P2 | 200 | Sí / Sí | OK | 718 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/comer-y-salir/octopous/ | en | destinos/buzios | P2 | 200 | Sí / Sí | OK | 780 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/comer-y-salir/san-telmo/ | en | destinos/buzios | P2 | 200 | Sí / Sí | OK | 766 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/cruceros/ | en | destinos/buzios | P2 | 200 | Sí / Sí | OK | 1489 | 5 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/gastronomia-argentina/ | en | destinos/buzios | P2 | 200 | Sí / Sí | OK | 980 | 2 | 0 | Revisar acceso desde navegación HTML |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/gastronomia-chilena/ | en | destinos/buzios | P2 | 200 | Sí / Sí | OK | 547 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/internet/ | en | destinos/buzios | P2 | 200 | Sí / Sí | OK | 401 | 6 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/mascotas/ | en | destinos/buzios | P2 | 200 | Sí / Sí | OK | 638 | 5 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/perfiles/ | en | destinos/buzios | P2 | 200 | Sí / Sí | OK | 1228 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/playas/ | en | destinos/buzios | P2 | 200 | Sí / Sí | OK | 108 | 83 | 0 | Revisión editorial: texto breve |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/salud/ | en | destinos/buzios | P2 | 200 | Sí / Sí | OK | 701 | 5 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/seguridad/ | en | destinos/buzios | P2 | 200 | Sí / Sí | OK | 478 | 6 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/servicios/ | en | destinos/buzios | P2 | 200 | Sí / Sí | OK | 477 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/familia/carnaval-experience/ | en | familia | P2 | 200 | Sí / Sí | OK | 860 | 23 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/familia/jardines-palacio-do-catete/ | en | familia | P2 | 200 | Sí / Sí | OK | 769 | 23 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/familia/lagoa-rodrigo-de-freitas/ | en | familia | P2 | 200 | Sí / Sí | OK | 597 | 23 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/familia/meta-kart-indoor/ | en | familia | P2 | 200 | Sí / Sí | OK | 544 | 23 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/familia/parque-lage/ | en | familia | P2 | 200 | Sí / Sí | OK | 578 | 23 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/familia/parques/ | en | familia | P2 | 200 | Sí / Sí | OK | 115 | 2 | 0 | Revisión editorial: texto breve; Revisar acceso desde navegación HTML |
| https://www.ernestinhocarioca.com.br/en/familia/playas/ | en | familia | P2 | 200 | Sí / Sí | OK | 122 | 2 | 0 | Revisión editorial: texto breve; Revisar acceso desde navegación HTML |
| https://www.ernestinhocarioca.com.br/en/fotografia/ | en | fotografia | P2 | 200 | Sí / Sí | OK | 1090 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/gastronomia/adega-perola/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 633 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/aipo-aipim-391/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 835 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/aipo-aipim-605/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 793 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/angu-do-gomes/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 671 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/arp-bar/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 886 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/assador/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 620 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/bafo-da-prainha/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 673 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/bar-da-gema/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 768 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/bar-luiz/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 629 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/bb-lanches/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 789 | 5 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/cachambeer/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 505 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/carretao-siqueira/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 618 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/casa-do-sardo/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 715 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/cavalo-marinho/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 733 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/classico-leme/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 963 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/coisa-de-carioca/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 397 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/gastronomia/confeitaria-colombo/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 524 | 4 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/confeitaria-manon/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 537 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/cosmopolita/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 528 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/dumare-copa/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 466 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/gastronomia/espetinhos/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 538 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/gastronomia/espeto-carioca-leme/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 534 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/gastronomia/ferro-e-farinha/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 522 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/gurume/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 534 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/iraja-redux/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 527 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/gastronomia/joaquina/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 936 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/majorica/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 588 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/gastronomia/marius-degustare/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 679 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/gastronomia/nova-capela/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 706 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/pesqueiro/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 578 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/pilograma-prime-grill/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 620 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/point-de-grumari/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 781 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/polis-sucos/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 1045 | 4 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/prana/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 759 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/quiteria/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 849 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/rio-scenarium/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 541 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/rufino-parrilla/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 564 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/gastronomia/spesso/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 1100 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/sushi-leblon/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 823 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/temperarte-posto6/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 726 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/xian/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 716 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/en/gastronomia/yusha/ | en | gastronomia | P2 | 200 | Sí / Sí | OK | 573 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/guia/dinero/ | en | guia | P2 | 200 | Sí / Sí | OK | 384 | 5 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/guia/internet/ | en | guia | P2 | 200 | Sí / Sí | OK | 576 | 5 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/guia/viajar-solo/ | en | guia | P2 | 200 | Sí / Sí | OK | 887 | 7 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/naturaleza/agricultura-pedra-branca/ | en | naturaleza | P2 | 200 | Sí / Sí | OK | 828 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/naturaleza/pico-tijuca/ | en | naturaleza | P2 | 200 | Sí / Sí | OK | 205 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/naturaleza/sitio-burle-marx/ | en | naturaleza | P2 | 200 | Sí / Sí | OK | 547 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/playas/praias-selvagens/ | en | playas | P2 | 200 | Sí / Sí | OK | 658 | 5 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/playas/prainha/ | en | playas | P2 | 200 | Sí / Sí | OK | 684 | 6 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/playas/recreio/ | en | playas | P2 | 200 | Sí / Sí | OK | 680 | 6 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/vida-nocturna/ | en | vida-nocturna | P2 | 200 | Sí / Sí | OK | 1494 | 54 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/vida-nocturna/bar-bukowski/ | en | vida-nocturna | P2 | 200 | Sí / Sí | OK | 285 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/vida-nocturna/coordenadas-bar/ | en | vida-nocturna | P2 | 200 | Sí / Sí | OK | 506 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/vida-nocturna/isabel-lounge/ | en | vida-nocturna | P2 | 200 | Sí / Sí | OK | 527 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/vida-nocturna/lapa-40-graus/ | en | vida-nocturna | P2 | 200 | Sí / Sí | OK | 271 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/vida-nocturna/portela/ | en | vida-nocturna | P2 | 200 | Sí / Sí | OK | 236 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/vida-nocturna/quartinho/ | en | vida-nocturna | P2 | 200 | Sí / Sí | OK | 281 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/vida-nocturna/yoo2/ | en | vida-nocturna | P2 | 200 | Sí / Sí | OK | 229 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/vida-nocturna/zeca-vogue/ | en | vida-nocturna | P2 | 200 | Sí / Sí | OK | 298 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/gastronomia/adega-perola/ | es | gastronomia | P2 | 200 | Sí / Sí | OK | 728 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/gastronomia/chama-rio-copacabana/ | es | gastronomia | P2 | 200 | Sí / Sí | OK | 838 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/gastronomia/espetinhos/ | es | gastronomia | P2 | 200 | Sí / Sí | OK | 592 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/gastronomia/pescados-na-brasa/ | es | gastronomia | P2 | 200 | Sí / Sí | OK | 868 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/playas/praias-selvagens/ | es | playas | P2 | 200 | Sí / Sí | OK | 737 | 5 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/atracciones/aquario/ | pt | atracciones | P2 | 200 | Sí / Sí | OK | 1263 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/atracciones/jardim-botanico/ | pt | atracciones | P2 | 200 | Sí / Sí | OK | 1032 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/atracciones/pao-de-acucar/ | pt | atracciones | P2 | 200 | Sí / Sí | OK | 1693 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/barrios/catete/ | pt | barrios | P2 | 200 | Sí / Sí | OK | 533 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/barrios/copacabana/ | pt | barrios | P2 | 200 | Sí / Sí | OK | 4648 | 8 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/barrios/flamengo-gloria/ | pt | barrios | P2 | 200 | Sí / Sí | OK | 492 | 6 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/barrios/gavea-jardim-lagoa/ | pt | barrios | P2 | 200 | Sí / Sí | OK | 494 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/barrios/ilha-da-gigoia/ | pt | barrios | P2 | 200 | Sí / Sí | OK | 444 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/barrios/ipanema-leblon/ | pt | barrios | P2 | 200 | Sí / Sí | OK | 551 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/barrios/jacarepagua/ | pt | barrios | P2 | 200 | Sí / Sí | OK | 438 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/barrios/recreio/ | pt | barrios | P2 | 200 | Sí / Sí | OK | 536 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cafe-rio/ | pt | cafe-rio | P2 | 200 | Sí / Sí | OK | 604 | 608 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/compras/ | pt | compras | P2 | 200 | Sí / Sí | OK | 382 | 608 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/compras/barrashopping/ | pt | compras | P2 | 200 | Sí / Sí | OK | 1657 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/compras/fashion-mall/ | pt | compras | P2 | 200 | Sí / Sí | OK | 1180 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/compras/feira-da-gloria/ | pt | compras | P2 | 200 | Sí / Sí | OK | 833 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/compras/feira-hippie-ipanema/ | pt | compras | P2 | 200 | Sí / Sí | OK | 887 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/compras/feira-organica-gloria/ | pt | compras | P2 | 200 | Sí / Sí | OK | 797 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/compras/feira-sao-cristovao/ | pt | compras | P2 | 200 | Sí / Sí | OK | 688 | 4 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/compras/ferias/ | pt | compras | P2 | 200 | Sí / Sí | OK | 165 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/compras/mercadao-madureira/ | pt | compras | P2 | 200 | Sí / Sí | OK | 905 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/compras/nova-america/ | pt | compras | P2 | 200 | Sí / Sí | OK | 1153 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/compras/rio-sul/ | pt | compras | P2 | 200 | Sí / Sí | OK | 894 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/compras/saara/ | pt | compras | P2 | 200 | Sí / Sí | OK | 596 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/compras/shopping-leblon/ | pt | compras | P2 | 200 | Sí / Sí | OK | 1209 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/consejos/electricidad-adaptadores/ | pt | consejos | P2 | 200 | Sí / Sí | OK | 429 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/consejos/errores-rio/ | pt | consejos | P2 | 200 | Sí / Sí | OK | 306 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/consejos/lluvia/ | pt | consejos | P2 | 200 | Sí / Sí | OK | 603 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/consejos/portugues/ | pt | consejos | P2 | 200 | Sí / Sí | OK | 1269 | 5 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/consejos/que-hacer-cada-dia/ | pt | consejos | P2 | 200 | Sí / Sí | OK | 336 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/consejos/revisar-alojamiento/ | pt | consejos | P2 | 200 | Sí / Sí | OK | 124 | 3 | 0 | Revisión editorial: texto breve |
| https://www.ernestinhocarioca.com.br/pt/consejos/seguro-viaje/ | pt | consejos | P2 | 200 | Sí / Sí | OK | 247 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/consejos/supermercados/ | pt | consejos | P2 | 200 | Sí / Sí | OK | 3560 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 236 | 141 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/academia-brasileira-letras/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 263 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/acude/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 800 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/bibliomaison/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 242 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/biblioteca-ccbb/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 255 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/biblioteca-ccjf/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 242 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/biblioteca-parque-estadual/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 250 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/casa-da-leitura/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 236 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/casa-franca/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 224 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/casa-rui-barbosa/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 270 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/catedral-metropolitana/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 189 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/ccbb/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 259 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/ccjf/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 226 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/centros-culturales/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 276 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/chacara-ceu/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 643 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/dulcina/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 176 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/fernanda-montenegro/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 236 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/forte-barao-rio-branco/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 241 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/forte-duque-caxias/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 278 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/forte-pico/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 238 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/ihgb/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 553 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/joao-caetano/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 199 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/jose-bonifacio/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 223 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/laura-alvim/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 176 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/mac-niteroi/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 578 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/mam-rio/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 655 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/museos/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 578 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/museu-light/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 562 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/museu-pontal/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 730 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/nossa-senhora-paz/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 151 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/nossa-senhora-penna/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 153 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/rival-petrobras/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 204 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/sala-cecilia/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 238 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/teatro-dos-quatro/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 178 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/villa-lobos/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 536 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/cultura/ziembinski/ | pt | cultura | P2 | 200 | Sí / Sí | OK | 160 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/accesibilidad/ | pt | destinos/buzios | P2 | 200 | Sí / Sí | OK | 452 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/comer-y-salir/ | pt | destinos/buzios | P2 | 200 | Sí / Sí | OK | 2813 | 123 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/comer-y-salir/altto/ | pt | destinos/buzios | P2 | 200 | Sí / Sí | OK | 738 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/comer-y-salir/anexo-praia/ | pt | destinos/buzios | P2 | 200 | Sí / Sí | OK | 783 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/comer-y-salir/farinatta/ | pt | destinos/buzios | P2 | 200 | Sí / Sí | OK | 747 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/comer-y-salir/macaw/ | pt | destinos/buzios | P2 | 200 | Sí / Sí | OK | 757 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/comer-y-salir/san-telmo/ | pt | destinos/buzios | P2 | 200 | Sí / Sí | OK | 768 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/cruceros/ | pt | destinos/buzios | P2 | 200 | Sí / Sí | OK | 1378 | 5 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/gastronomia-argentina/ | pt | destinos/buzios | P2 | 200 | Sí / Sí | OK | 961 | 2 | 0 | Revisar acceso desde navegación HTML |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/gastronomia-chilena/ | pt | destinos/buzios | P2 | 200 | Sí / Sí | OK | 537 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/mascotas/ | pt | destinos/buzios | P2 | 200 | Sí / Sí | OK | 608 | 5 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/perfiles/ | pt | destinos/buzios | P2 | 200 | Sí / Sí | OK | 1124 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/playas/ | pt | destinos/buzios | P2 | 200 | Sí / Sí | OK | 107 | 83 | 0 | Revisión editorial: texto breve |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/salud/ | pt | destinos/buzios | P2 | 200 | Sí / Sí | OK | 624 | 5 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/seguridad/ | pt | destinos/buzios | P2 | 200 | Sí / Sí | OK | 434 | 6 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/destinos/buzios/servicios/ | pt | destinos/buzios | P2 | 200 | Sí / Sí | OK | 450 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/familia/carnaval-experience/ | pt | familia | P2 | 200 | Sí / Sí | OK | 882 | 23 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/familia/jardines-palacio-do-catete/ | pt | familia | P2 | 200 | Sí / Sí | OK | 783 | 23 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/familia/meta-kart-indoor/ | pt | familia | P2 | 200 | Sí / Sí | OK | 569 | 23 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/familia/parques/ | pt | familia | P2 | 200 | Sí / Sí | OK | 116 | 2 | 0 | Revisión editorial: texto breve; Revisar acceso desde navegación HTML |
| https://www.ernestinhocarioca.com.br/pt/familia/yup-star/ | pt | familia | P2 | 200 | Sí / Sí | OK | 584 | 23 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/fotografia/ | pt | fotografia | P2 | 200 | Sí / Sí | OK | 1183 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/adega-perola/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 635 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/aipo-aipim-391/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 830 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/aipo-aipim-605/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 790 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/aipo-aipim-920/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 806 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/arab-leblon/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 830 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/arp-bar/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 888 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/assador/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 619 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/bafo-da-prainha/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 666 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/bar-da-gema/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 771 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/bar-luiz/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 628 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/bira-de-guaratiba/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 822 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/cabanna/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 719 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/cachambeer/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 508 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/cafe-do-alto/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 767 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/carretao-siqueira/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 626 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/casa-do-sardo/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 711 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/casa-porto/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 728 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/churrascaria-palace/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 497 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/classico-leme/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 965 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/coisa-de-carioca/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 431 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/coisas-de-bamba/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 727 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/confeitaria-colombo/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 526 | 4 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/confeitaria-manon/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 539 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/delirio/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 944 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/don-pascual/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 876 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/dumare-copa/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 526 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/eclipse/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 1065 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/espetinhos/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 570 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/gurume/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 534 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/joaquina/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 971 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/jobi/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 509 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/kilograma-centro/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 751 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/lasai/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 491 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/majorica/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 584 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/marius-degustare/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 704 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/nido-ristorante/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 857 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/nova-capela/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 710 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/oro/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 920 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/pesqueiro/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 586 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/point-de-grumari/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 787 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/prana/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 766 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/quartinho/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 530 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/quiteria/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 856 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/rio-scenarium/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 542 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/rufino-parrilla/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 573 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/sabor-das-aguas/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 641 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/shiso/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 609 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/spesso/ | pt | gastronomia | P2 | 200 | Sí / Sí | OK | 1146 | 3 | 0 | Revisar traducción del cuerpo |
| https://www.ernestinhocarioca.com.br/pt/guia/documentos/ | pt | guia | P2 | 200 | Sí / Sí | OK | 1231 | 6 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/guia/guarda-equipaje/ | pt | guia | P2 | 200 | Sí / Sí | OK | 1152 | 11 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/guia/terminales/ | pt | guia | P2 | 200 | Sí / Sí | OK | 808 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/guia/viajar-solo/ | pt | guia | P2 | 200 | Sí / Sí | OK | 873 | 7 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/naturaleza/cachoeira-do-camorim/ | pt | naturaleza | P2 | 200 | Sí / Sí | OK | 744 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/naturaleza/catacumba/ | pt | naturaleza | P2 | 200 | Sí / Sí | OK | 230 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/naturaleza/pedra-bonita-trek/ | pt | naturaleza | P2 | 200 | Sí / Sí | OK | 208 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/naturaleza/rio-da-prata-campo-grande/ | pt | naturaleza | P2 | 200 | Sí / Sí | OK | 1178 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/naturaleza/sitio-burle-marx/ | pt | naturaleza | P2 | 200 | Sí / Sí | OK | 556 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/playas/pepe/ | pt | playas | P2 | 200 | Sí / Sí | OK | 643 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/playas/praia-do-secreto/ | pt | playas | P2 | 200 | Sí / Sí | OK | 663 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/playas/praias-selvagens/ | pt | playas | P2 | 200 | Sí / Sí | OK | 690 | 5 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/playas/prainha-vidigal/ | pt | playas | P2 | 200 | Sí / Sí | OK | 1377 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/vida-nocturna/ | pt | vida-nocturna | P2 | 200 | Sí / Sí | OK | 1554 | 54 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/vida-nocturna/armazem-do-senado/ | pt | vida-nocturna | P2 | 200 | Sí / Sí | OK | 286 | 4 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/vida-nocturna/bar-bukowski/ | pt | vida-nocturna | P2 | 200 | Sí / Sí | OK | 290 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/vida-nocturna/chopperia-botafogo/ | pt | vida-nocturna | P2 | 200 | Sí / Sí | OK | 474 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/vida-nocturna/coisas-de-bamba/ | pt | vida-nocturna | P2 | 200 | Sí / Sí | OK | 271 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/vida-nocturna/isabel-lounge/ | pt | vida-nocturna | P2 | 200 | Sí / Sí | OK | 549 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/vida-nocturna/lapa-40-graus/ | pt | vida-nocturna | P2 | 200 | Sí / Sí | OK | 284 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/vida-nocturna/pink-flamingo/ | pt | vida-nocturna | P2 | 200 | Sí / Sí | OK | 478 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/vida-nocturna/portela/ | pt | vida-nocturna | P2 | 200 | Sí / Sí | OK | 247 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/vida-nocturna/quadra-salgueiro/ | pt | vida-nocturna | P2 | 200 | Sí / Sí | OK | 245 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/vida-nocturna/quartinho/ | pt | vida-nocturna | P2 | 200 | Sí / Sí | OK | 278 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/vida-nocturna/trapiche-gamboa/ | pt | vida-nocturna | P2 | 200 | Sí / Sí | OK | 276 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/vida-nocturna/yoo2/ | pt | vida-nocturna | P2 | 200 | Sí / Sí | OK | 239 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/pt/vida-nocturna/zeca-vogue/ | pt | vida-nocturna | P2 | 200 | Sí / Sí | OK | 298 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/en/historia/ | en | historia | P3 | 200 | Sí / Sí | OK | 1022 | 3 | 0 | Elegible técnicamente; seguimiento en GSC |
| https://www.ernestinhocarioca.com.br/privacidad-precios-condiciones/ | es | privacidad-precios-condiciones | P3 | 200 | Sí / Sí | OK | 2011 | 702 | 0 | Elegible técnicamente; seguimiento en GSC |

## Anexo B. Las 120 URL modificadas por redirección

Cada origen de esta tabla fue comprobado en https://www.ernestinhocarioca.com.br y devuelve 301 directo al destino indicado; cada destino respondió 200 con canonical y hreflang correctos. Las reglas configuradas en Hostinger también aceptan el dominio sin www.

| Origen (ruta) | Destino (ruta) | HTTP verificado |
| --- | --- | --- |
| /compras/barra-shopping.html | /compras/barrashopping/ | 301 → 200 |
| /compras/botafogo-praia-shopping.html | /compras/botafogo-praia-shopping/ | 301 → 200 |
| /compras/cadeg.html | /compras/cadeg/ | 301 → 200 |
| /compras/fashion-mall.html | /compras/fashion-mall/ | 301 → 200 |
| /compras/feria-antiguedades-plaza-xv.html | /compras/praca-xv/ | 301 → 200 |
| /compras/feria-da-gloria.html | /compras/feira-da-gloria/ | 301 → 200 |
| /compras/feria-da-providencia.html | /compras/feira-da-providencia/ | 301 → 200 |
| /compras/feria-das-yabas.html | /compras/feira-das-yabas/ | 301 → 200 |
| /compras/feria-de-sao-cristovao.html | /compras/feira-sao-cristovao/ | 301 → 200 |
| /compras/feria-hippie-ipanema.html | /compras/feira-hippie-ipanema/ | 301 → 200 |
| /compras/feria-lavradio.html | /compras/lavradio/ | 301 → 200 |
| /compras/feria-nocturna-copacabana.html | /compras/feira-noturna-copacabana/ | 301 → 200 |
| /compras/feria-organica-da-gloria.html | /compras/feira-organica-gloria/ | 301 → 200 |
| /compras/feria-organica.html | /compras/feira-organica-gloria/ | 301 → 200 |
| /compras/feria-praca-do-lido.html | /compras/praca-lido/ | 301 → 200 |
| /compras/mercadao-madureira.html | /compras/mercadao-madureira/ | 301 → 200 |
| /compras/mercado-sao-pedro.html | /compras/mercado-sao-pedro/ | 301 → 200 |
| /compras/saara.html | /compras/saara/ | 301 → 200 |
| /compras/shopping-downtown.html | /compras/downtown/ | 301 → 200 |
| /compras/shopping-leblon.html | /compras/shopping-leblon/ | 301 → 200 |
| /compras/shopping-metropolitano-barra.html | /compras/metropolitano-barra/ | 301 → 200 |
| /compras/shopping-nova-america.html | /compras/nova-america/ | 301 → 200 |
| /compras/shopping-rio-sul.html | /compras/rio-sul/ | 301 → 200 |
| /compras/shopping-tijuca.html | /compras/shopping-tijuca/ | 301 → 200 |
| /compras/uruguaiana.html | /compras/uruguaiana/ | 301 → 200 |
| /compras/village-mall.html | /compras/village-mall/ | 301 → 200 |
| /vida-nocturna/armazem-senado/ | /vida-nocturna/armazem-do-senado/ | 301 → 200 |
| /vida-nocturna/feira-sao-cristovao/ | /vida-nocturna/feira-sao-cristovao-noite/ | 301 → 200 |
| /vida-nocturna/yoo2-rooftop/ | /vida-nocturna/yoo2/ | 301 → 200 |
| /pt/compras/barra-shopping.html | /pt/compras/barrashopping/ | 301 → 200 |
| /pt/compras/botafogo-praia-shopping.html | /pt/compras/botafogo-praia-shopping/ | 301 → 200 |
| /pt/compras/cadeg.html | /pt/compras/cadeg/ | 301 → 200 |
| /pt/compras/fashion-mall.html | /pt/compras/fashion-mall/ | 301 → 200 |
| /pt/compras/feria-antiguedades-plaza-xv.html | /pt/compras/praca-xv/ | 301 → 200 |
| /pt/compras/feria-da-gloria.html | /pt/compras/feira-da-gloria/ | 301 → 200 |
| /pt/compras/feria-da-providencia.html | /pt/compras/feira-da-providencia/ | 301 → 200 |
| /pt/compras/feria-das-yabas.html | /pt/compras/feira-das-yabas/ | 301 → 200 |
| /pt/compras/feria-de-sao-cristovao.html | /pt/compras/feira-sao-cristovao/ | 301 → 200 |
| /pt/compras/feria-hippie-ipanema.html | /pt/compras/feira-hippie-ipanema/ | 301 → 200 |
| /pt/compras/feria-lavradio.html | /pt/compras/lavradio/ | 301 → 200 |
| /pt/compras/feria-nocturna-copacabana.html | /pt/compras/feira-noturna-copacabana/ | 301 → 200 |
| /pt/compras/feria-organica-da-gloria.html | /pt/compras/feira-organica-gloria/ | 301 → 200 |
| /pt/compras/feria-organica.html | /pt/compras/feira-organica-gloria/ | 301 → 200 |
| /pt/compras/feria-praca-do-lido.html | /pt/compras/praca-lido/ | 301 → 200 |
| /pt/compras/mercadao-madureira.html | /pt/compras/mercadao-madureira/ | 301 → 200 |
| /pt/compras/mercado-sao-pedro.html | /pt/compras/mercado-sao-pedro/ | 301 → 200 |
| /pt/compras/saara.html | /pt/compras/saara/ | 301 → 200 |
| /pt/compras/shopping-downtown.html | /pt/compras/downtown/ | 301 → 200 |
| /pt/compras/shopping-leblon.html | /pt/compras/shopping-leblon/ | 301 → 200 |
| /pt/compras/shopping-metropolitano-barra.html | /pt/compras/metropolitano-barra/ | 301 → 200 |
| /pt/compras/shopping-nova-america.html | /pt/compras/nova-america/ | 301 → 200 |
| /pt/compras/shopping-rio-sul.html | /pt/compras/rio-sul/ | 301 → 200 |
| /pt/compras/shopping-tijuca.html | /pt/compras/shopping-tijuca/ | 301 → 200 |
| /pt/compras/uruguaiana.html | /pt/compras/uruguaiana/ | 301 → 200 |
| /pt/compras/village-mall.html | /pt/compras/village-mall/ | 301 → 200 |
| /pt/vida-nocturna/armazem-senado/ | /pt/vida-nocturna/armazem-do-senado/ | 301 → 200 |
| /pt/vida-nocturna/feira-sao-cristovao/ | /pt/vida-nocturna/feira-sao-cristovao-noite/ | 301 → 200 |
| /pt/vida-nocturna/yoo2-rooftop/ | /pt/vida-nocturna/yoo2/ | 301 → 200 |
| /en/compras/barra-shopping.html | /en/compras/barrashopping/ | 301 → 200 |
| /en/compras/botafogo-praia-shopping.html | /en/compras/botafogo-praia-shopping/ | 301 → 200 |
| /en/compras/cadeg.html | /en/compras/cadeg/ | 301 → 200 |
| /en/compras/fashion-mall.html | /en/compras/fashion-mall/ | 301 → 200 |
| /en/compras/feria-antiguedades-plaza-xv.html | /en/compras/praca-xv/ | 301 → 200 |
| /en/compras/feria-da-gloria.html | /en/compras/feira-da-gloria/ | 301 → 200 |
| /en/compras/feria-da-providencia.html | /en/compras/feira-da-providencia/ | 301 → 200 |
| /en/compras/feria-das-yabas.html | /en/compras/feira-das-yabas/ | 301 → 200 |
| /en/compras/feria-de-sao-cristovao.html | /en/compras/feira-sao-cristovao/ | 301 → 200 |
| /en/compras/feria-hippie-ipanema.html | /en/compras/feira-hippie-ipanema/ | 301 → 200 |
| /en/compras/feria-lavradio.html | /en/compras/lavradio/ | 301 → 200 |
| /en/compras/feria-nocturna-copacabana.html | /en/compras/feira-noturna-copacabana/ | 301 → 200 |
| /en/compras/feria-organica-da-gloria.html | /en/compras/feira-organica-gloria/ | 301 → 200 |
| /en/compras/feria-organica.html | /en/compras/feira-organica-gloria/ | 301 → 200 |
| /en/compras/feria-praca-do-lido.html | /en/compras/praca-lido/ | 301 → 200 |
| /en/compras/mercadao-madureira.html | /en/compras/mercadao-madureira/ | 301 → 200 |
| /en/compras/mercado-sao-pedro.html | /en/compras/mercado-sao-pedro/ | 301 → 200 |
| /en/compras/saara.html | /en/compras/saara/ | 301 → 200 |
| /en/compras/shopping-downtown.html | /en/compras/downtown/ | 301 → 200 |
| /en/compras/shopping-leblon.html | /en/compras/shopping-leblon/ | 301 → 200 |
| /en/compras/shopping-metropolitano-barra.html | /en/compras/metropolitano-barra/ | 301 → 200 |
| /en/compras/shopping-nova-america.html | /en/compras/nova-america/ | 301 → 200 |
| /en/compras/shopping-rio-sul.html | /en/compras/rio-sul/ | 301 → 200 |
| /en/compras/shopping-tijuca.html | /en/compras/shopping-tijuca/ | 301 → 200 |
| /en/compras/uruguaiana.html | /en/compras/uruguaiana/ | 301 → 200 |
| /en/compras/village-mall.html | /en/compras/village-mall/ | 301 → 200 |
| /en/vida-nocturna/armazem-senado/ | /en/vida-nocturna/armazem-do-senado/ | 301 → 200 |
| /en/vida-nocturna/feira-sao-cristovao/ | /en/vida-nocturna/feira-sao-cristovao-noite/ | 301 → 200 |
| /en/vida-nocturna/yoo2-rooftop/ | /en/vida-nocturna/yoo2/ | 301 → 200 |
| /guia/viajar-a-brasil-con-menores-de-edad | /guia/menores/ | 301 → 200 |
| /gastronomia/aipo-aipim-copacabana-605 | /gastronomia/aipo-aipim-605/ | 301 → 200 |
| /gastronomia/aipo-aipim-copacabana-920 | /gastronomia/aipo-aipim-920/ | 301 → 200 |
| /gastronomia/fiorino-ristorante | /gastronomia/fiorino/ | 301 → 200 |
| /gastronomia/guacamole-taqueria-copacabana | /gastronomia/guacamole-copacabana/ | 301 → 200 |
| /guia/alquiler-de-auto-en-rio-y-brasil | /guia/alquiler-auto/ | 301 → 200 |
| /guia/como-moverse-por-rio | /transportes/ | 301 → 200 |
| /guia/documentos-y-visado-para-entrar-a-brasil | /guia/documentos/ | 301 → 200 |
| /guia/vacunas-y-fiebre-amarilla-antes-de-viajar-a-brasil | /guia/vacunas/ | 301 → 200 |
| /museos | /cultura/museos/ | 301 → 200 |
| /copacabana | /barrios/copacabana/ | 301 → 200 |
| /pt/guia/viajar-a-brasil-con-menores-de-edad | /pt/guia/menores/ | 301 → 200 |
| /pt/gastronomia/aipo-aipim-copacabana-605 | /pt/gastronomia/aipo-aipim-605/ | 301 → 200 |
| /pt/gastronomia/aipo-aipim-copacabana-920 | /pt/gastronomia/aipo-aipim-920/ | 301 → 200 |
| /pt/gastronomia/fiorino-ristorante | /pt/gastronomia/fiorino/ | 301 → 200 |
| /pt/gastronomia/guacamole-taqueria-copacabana | /pt/gastronomia/guacamole-copacabana/ | 301 → 200 |
| /pt/guia/alquiler-de-auto-en-rio-y-brasil | /pt/guia/alquiler-auto/ | 301 → 200 |
| /pt/guia/como-moverse-por-rio | /pt/transportes/ | 301 → 200 |
| /pt/guia/documentos-y-visado-para-entrar-a-brasil | /pt/guia/documentos/ | 301 → 200 |
| /pt/guia/vacunas-y-fiebre-amarilla-antes-de-viajar-a-brasil | /pt/guia/vacunas/ | 301 → 200 |
| /pt/museos | /pt/cultura/museos/ | 301 → 200 |
| /pt/copacabana | /pt/barrios/copacabana/ | 301 → 200 |
| /en/guia/viajar-a-brasil-con-menores-de-edad | /en/guia/menores/ | 301 → 200 |
| /en/gastronomia/aipo-aipim-copacabana-605 | /en/gastronomia/aipo-aipim-605/ | 301 → 200 |
| /en/gastronomia/aipo-aipim-copacabana-920 | /en/gastronomia/aipo-aipim-920/ | 301 → 200 |
| /en/gastronomia/fiorino-ristorante | /en/gastronomia/fiorino/ | 301 → 200 |
| /en/gastronomia/guacamole-taqueria-copacabana | /en/gastronomia/guacamole-copacabana/ | 301 → 200 |
| /en/guia/alquiler-de-auto-en-rio-y-brasil | /en/guia/alquiler-auto/ | 301 → 200 |
| /en/guia/como-moverse-por-rio | /en/transportes/ | 301 → 200 |
| /en/guia/documentos-y-visado-para-entrar-a-brasil | /en/guia/documentos/ | 301 → 200 |
| /en/guia/vacunas-y-fiebre-amarilla-antes-de-viajar-a-brasil | /en/guia/vacunas/ | 301 → 200 |
| /en/museos | /en/cultura/museos/ | 301 → 200 |
| /en/copacabana | /en/barrios/copacabana/ | 301 → 200 |

## Anexo C. Prioridad de revisión de idioma

Se muestran las 84 variantes del Excel señaladas por alta coincidencia textual con ES. Revisar cada cuerpo antes de traducir; la similitud no autoriza eliminar ni consolidar automáticamente.

| URL | Coincidencia de secuencias con ES |
| --- | --- |
| https://www.ernestinhocarioca.com.br/en/compras/feira-sao-cristovao/ | 55.8% |
| https://www.ernestinhocarioca.com.br/en/compras/mercadao-madureira/ | 74.0% |
| https://www.ernestinhocarioca.com.br/en/compras/uruguaiana/ | 85.8% |
| https://www.ernestinhocarioca.com.br/en/destinos/buzios/comer-y-salir/madame-bardot/ | 77.6% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/adega-perola/ | 79.6% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/aipo-aipim-391/ | 78.9% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/aipo-aipim-605/ | 78.7% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/angu-do-gomes/ | 81.3% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/arp-bar/ | 75.8% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/assador/ | 81.8% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/bafo-da-prainha/ | 75.3% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/bar-da-gema/ | 74.0% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/bar-luiz/ | 81.9% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/bb-lanches/ | 75.5% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/cachambeer/ | 75.8% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/carretao-siqueira/ | 60.7% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/casa-do-sardo/ | 71.0% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/cavalo-marinho/ | 71.5% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/classico-leme/ | 76.8% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/confeitaria-colombo/ | 77.8% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/confeitaria-manon/ | 62.6% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/cosmopolita/ | 62.0% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/ferro-e-farinha/ | 76.1% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/gurume/ | 79.1% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/joaquina/ | 75.4% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/nova-capela/ | 56.5% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/pesqueiro/ | 50.5% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/pilograma-prime-grill/ | 63.1% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/point-de-grumari/ | 65.6% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/polis-sucos/ | 63.9% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/prana/ | 65.1% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/quiteria/ | 70.9% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/rio-scenarium/ | 77.9% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/spesso/ | 58.7% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/sushi-leblon/ | 55.7% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/temperarte-posto6/ | 54.4% |
| https://www.ernestinhocarioca.com.br/en/gastronomia/xian/ | 54.6% |
| https://www.ernestinhocarioca.com.br/pt/compras/feira-sao-cristovao/ | 58.4% |
| https://www.ernestinhocarioca.com.br/pt/compras/mercadao-madureira/ | 74.7% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/adega-perola/ | 82.6% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/aipo-aipim-391/ | 81.6% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/aipo-aipim-605/ | 80.7% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/aipo-aipim-920/ | 79.8% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/arab-leblon/ | 78.0% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/arp-bar/ | 87.1% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/assador/ | 85.2% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/bafo-da-prainha/ | 78.9% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/bar-da-gema/ | 75.1% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/bar-luiz/ | 84.7% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/bira-de-guaratiba/ | 72.1% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/cabanna/ | 75.3% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/cachambeer/ | 79.0% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/cafe-do-alto/ | 63.7% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/carretao-siqueira/ | 61.5% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/casa-do-sardo/ | 73.7% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/casa-porto/ | 74.7% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/churrascaria-palace/ | 72.8% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/classico-leme/ | 79.4% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/coisas-de-bamba/ | 73.5% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/confeitaria-colombo/ | 80.4% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/confeitaria-manon/ | 64.4% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/delirio/ | 70.3% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/don-pascual/ | 70.8% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/eclipse/ | 57.1% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/gurume/ | 82.2% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/joaquina/ | 75.1% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/jobi/ | 80.7% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/kilograma-centro/ | 68.1% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/lasai/ | 81.2% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/majorica/ | 53.5% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/nido-ristorante/ | 70.9% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/nino-cucina-ipanema/ | 58.0% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/nova-capela/ | 59.2% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/oro/ | 55.5% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/pesqueiro/ | 54.3% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/point-de-grumari/ | 66.8% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/prana/ | 66.3% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/quiteria/ | 85.5% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/rio-scenarium/ | 81.2% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/rufino-parrilla/ | 51.9% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/sabor-das-aguas/ | 54.4% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/shiso/ | 50.1% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/spesso/ | 58.2% |
| https://www.ernestinhocarioca.com.br/pt/gastronomia/temperarte-bolivar/ | 58.1% |

