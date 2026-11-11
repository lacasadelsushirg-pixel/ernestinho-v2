# Comprobación de indexación y prioridades con datos reales

Consulta del 10 de noviembre de 2026 a la propiedad `https://www.ernestinhocarioca.com.br/` mediante OpenSEO, proyecto `7172f2fb-7456-4b35-b581-d9b11c0040f4`. Esta comprobación actualiza el bloqueo anterior: **Inspección de URL sí está accesible**. No se obtuvo un informe agregado nuevo de Páginas; las 458 exclusiones del export histórico no representan el total actual.

## Estado remoto y coordinación

Producción: `9426c42fc0150bdce5fbfee060396da9de518ac7`. PR 24 al inicio: `4d4ad0c8a5b3f0b9dd0dd716d1efb1914a6b3218`. Se clonó desde remoto sin objetos alternativos y se verificó la ascendencia de la recuperación `798773442a16ce2d7ce0196dcd41cb60bb4cac5a`. Se leyeron AGENTS.md, la protección de publicación, la descripción del PR y los inventarios e informes de continuidad.

Otra ejecución estaba trabajando en Rotisseria, Casa da Feijoada y OCYÁ. Se evitó editar sus traducciones, renderizadores e inventario maestro. Durante esta comprobación, el HEAD avanzó a `76534a29c972f1e21621146bb04a01d7bc1a6c32`, cierre del lote once. La rama aislada incorporó ese avance por fast-forward antes de preparar estas evidencias. No se escribe sobre la rama del PR principal. El séptimo lote ya tiene informe y CSV actualizados; no corresponde repetirlo.

Según el cierre del lote once, el piloto tiene 40 rutas, 37 con validación local y tres con pendientes editoriales: Brota, Faenza y Rotisseria. Son resultados documentados por esa ejecución, no pruebas visuales repetidas en esta comprobación SEO.

## Rendimiento

Datos finales, tipo Web, fechas de Search Console en hora del Pacífico. Posición ponderada por impresiones sobre las filas diarias recibidas, redondeadas por la API.

| Ventana | Impresiones | Clics | CTR | Posición |
|---|---:|---:|---:|---:|
| 26 octubre–1 noviembre | 25.563 | 94 | 0,368 % | 11,97 |
| 2–8 noviembre | 21.083 | 114 | 0,541 % | 11,56 |

Las impresiones bajaron 17,5 %, mientras los clics subieron 21,3 %. Este corte no demuestra pérdida de indexación ni causalidad con una publicación. No es comparable directamente con las ventanas anteriores de ocho días. La consulta de Gastronomía devolvió 430 filas de URL, sin paginación pendiente. Sus agregaciones difieren de los totales del sitio; una fila ausente no demuestra desindexación.

## Trece inspecciones de URL

La API informa el estado conocido por Google y la fecha de su último rastreo; no realiza un rastreo en vivo. La muestra es intencional, no representativa del conjunto del sitio.

| Grupo y rutas | Resultado conocido por Google | Decisión |
|---|---|---|
| Travessa Ipanema PT, Carretão Ipanema PT, Biblioteca Parque Estadual EN | Las tres indexadas, canonical de Google igual al declarado | Investigar consultas e impresiones; no clasificarlas como excluidas por su caída de visibilidad |
| Pão de Açúcar EN y Nino Cucina PT | Antes descubiertas sin indexar; ahora indexadas | Registrar la recuperación sin atribuirla al PR aún no publicado |
| Rasa PT | Antes 404; ahora indexada | No mantener el 404 histórico como error vigente |
| Belmonte Copacabana PT y Guía Búzios ES | Antes rastreadas sin indexar; ahora indexadas | Registrar la recuperación |
| Gruta do Fado ES y La Fiorentina Ipanema ES | Google conserva canonical sin barra; la página declara con barra | Hoy las variantes sin barra devuelven 301 hacia la versión con barra y esta devuelve 200 con canonical propio. Esperar nuevo rastreo y volver a inspeccionar; no cambiar el canonical aprobado |
| Armação EN | Google conserva 404 del 26 de octubre | Hoy devuelve 200 con canonical propio. El error registrado por Google continúa, pero no se reproduce como 404 actual |
| Copacabana sin barra | Página con redirección | HTTP 301 actual hacia la ruta con barra; exclusión normal de una variante redirigida |
| Pizzaria Canastra PT | Rastreada sin indexar, último rastreo 6 de octubre | HTTP 200 actual y canonical propio. Revisión de contenido/enlazado pendiente; no hay bloqueo técnico demostrado |

Ocho de las trece inspecciones figuran indexadas. De las diez seleccionadas del export histórico de exclusiones, cinco figuran ahora indexadas. No extrapolar ese porcentaje a las 458 URL. Los enlaces oficiales a cada inspección y los valores exactos están en el CSV y JSON de evidencia.

## Hostinger y protecciones

Se descargaron de nuevo el manifiesto y el sitemap públicos. El manifiesto contiene 3.612 entradas y declara 1.204 fuentes y 1.196 URL indexables por idioma. Las 3.588 URL únicas del sitemap coinciden exactamente con el conjunto indexable del manifiesto; no hay faltantes, sobrantes ni FR. Es un recuento de documentos declarados, no un censo físico de todos los archivos heredados de `public_html`.

El guard de publicación pasa: 586 archivos y diez recursos críticos. `check_frozen_pages.py` devuelve error por las 246 diferencias históricas ya documentadas; ninguna de esas páginas cambió desde el HEAD inicial de esta ejecución. Se conservan los manifiestos y sus anclajes. No se hizo build, publicación ni prueba visual: este cambio solo incorpora documentación y datos SEO, sin modificar páginas o comportamiento. Las pruebas de renderizadores, incrementalidad y capturas siguen siendo necesarias para cada lote de traducciones que los modifique.

## Prioridad editorial y punto de continuación

Se cruzaron las 430 filas de rendimiento con las alertas En revisión del inventario del HEAD `76534a29`. El CSV adjunto ordena por impresiones combinadas PT/EN y conserva las ES por separado. No modifica el inventario maestro del escritor activo ni declara traducciones validadas por disponer de tráfico.

| Ruta pendiente | Impresiones PT/EN, 26 oct–8 nov | Impresiones ES |
|---|---:|---:|
| /gastronomia/ | 106 | 9 |
| /gastronomia/cipriani/ | 76 | 47 |
| /gastronomia/nido-ristorante/ | 70 | 9 |
| /gastronomia/zaza-bistro-tropical/ | 67 | 242 |
| /gastronomia/cais-do-oriente/ | 65 | 9 |
| /gastronomia/oteque/ | 64 | 48 |
| /gastronomia/feira-sao-cristovao/ | 63 | 27 |

La portada requiere un tratamiento distinto de las fichas. Antes del próximo lote, consultar el HEAD y las reservas del escritor activo: el cierre del lote once señala Nido, Corrientes 348 y Praia Skol como próximas prioridades históricas. La ventana nueva permite revisar esa cola, sin duplicar un lote ya iniciado. Cotejar Cipriani y Zazá como siguientes candidatas por demanda PT/EN, conservando las traducciones manuales y revisando su cobertura antes de editar.

Pendientes SEO concretos: volver a inspeccionar las dos variantes canónicas y Armação después de un rastreo nuevo; revisar Pizzaria Canastra; ampliar la muestra a las restantes exclusiones históricas; obtener el agregado actual de Páginas si el acceso lo permite. El asistente FR, la recuperación completa y la publicación de los lotes siguen pendientes. FR continúa privado y noindex. No se fusionó el PR 24 ni se publicó este cambio.

## Evidencias

- [Inspecciones actuales y motivos históricos](evidencias-indexacion-2026-11-10/inspecciones.csv)
- [Respuestas de Search Console: diarios, páginas e inspecciones](evidencias-indexacion-2026-11-10/gsc.json)
- [Cola por impresiones PT/EN](evidencias-indexacion-2026-11-10/prioridades-gastronomia.csv)
- [Recuento y hashes de producción](evidencias-indexacion-2026-11-10/produccion.json)
- [HTTP actual](evidencias-indexacion-2026-11-10/http.json) y [redirecciones sin seguimiento](evidencias-indexacion-2026-11-10/redirects.json)
- [Controles de protección y diferencias históricas](evidencias-indexacion-2026-11-10/protecciones.json)
- [Rendimiento en OpenSEO](https://app.openseo.so/p/7172f2fb-7456-4b35-b581-d9b11c0040f4/search-performance)
