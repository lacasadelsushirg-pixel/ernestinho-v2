# Continuación SEO — lote amplio PT/EN (02-11-2026)

**Estado:** trabajo fuente en la rama `seo/traducciones-continuacion-lote2-20261102` y PR #13 (borrador) contra `seo/indexacion-20261102` del PR #12. **NO publicado en Hostinger, NO integrado y NO verificado con Google Search Console.**

## Resumen ejecutivo actualizado — 2 de noviembre de 2026

**Estado del código al último lote:** **528 claves nuevas ES→PT/EN** (55 Compras + 473 Gastronomía) respecto a la rama base del PR #12; **52 fichas de Río** cubiertas por diccionarios compartidos, con alrededor de **562 bloques HTML largos** auditados; otras **4 fichas con traductores internos** corregidas directamente en su contenido de origen. En total **56 fichas de Río + Madame Bardot Búzios = 57 rutas** para la última prueba selectiva. El último workflow configurado genera solo esas rutas, no toda la web.

**Excepciones especiales corregidas en fuente:**
- **Arp Bar:** 11 párrafos que estaban en PT en HTML español traducidos a ES, preservando D.pt/D.en internos.
- **Clássico Leme:** 10 párrafos largos más texto de portada traducidos a ES, preservando el selector y sus diccionarios PT/EN.
- **Quitéria:** 11 párrafos largos del HTML inicial corregidos a ES, preservando el resto.
- **Majórica:** 2 textos PT de fuente corregidos a ES y 10 claves residuales bilingües nuevas.
- **Cosmopolita:** ficha histórica (NO se confirma un restaurante activo). Dirección histórica corregida a Travessa do Mosqueira 4, **Lapa**, reemplazando Glória/Santa Teresa; 20 párrafos reescritos en ES/PT/EN, meta description, título y mapa corregidos. Imágenes históricas todavía necesitan verificar identidad y uso. Fuentes de verificación: Riotur (dirección histórica), crónica de 2021 y registro municipal de uso del local en 2025. Esta página no debe recomendar comida ni reservas.

La validación de las cuatro fichas con diccionarios internos se realiza mediante `scripts/verify_embedded_locale_pages.mjs`, verificando doce HTML de ES/PT/EN y señales de fuga de idioma. El estado de la última ejecución debe comprobarse en GitHub Actions antes de aprobar el lote.

**Sin publicación:** no se ha desplegado nada en Hostinger, no se ha hecho merge ni se ha alterado Carioc-IA, fotos, estilos, sitemap o robots. Las correcciones del HTML español son excepciones deliberadas frente a la norma anterior de no modificar HTML original. Tampoco se confirma que las **82 variantes** reportadas por Work estén resueltas en producción ni que Google vuelva a indexarlas.

## Resultados comprobados en código

- **281 claves de traducción exacta ES → PT y EN añadidas**: 55 en `assets/js/translations/chunks/rio-residual-compras-01.js` y 226 en `assets/js/translations/chunks/rio-residual-gastronomia-01.js`.
- Ambos diccionarios pasan parseo y todas las entradas tienen valores PT y EN no vacíos.
- **28 fichas de Río** auditadas contra los bloques visibles en HTML original (p, div, span, li y encabezados con más de 100 caracteres, sin contar JS dinámico): **279 de 279 bloques cubiertos** por diccionario bilingüe. Esto NO demuestra traducción completa de títulos breves, atributos, código dinámico, metadatos o las copias actualmente publicadas.
- **Madame Bardot, Búzios:** siete campos editoriales traducidos, más cinco párrafos del plan de visita y el título/estilo específico en PT/EN. Dos módulos JS comprobados sintácticamente, pero todavía pendientes de pruebas en navegador.
- Script nuevo, **solo lectura**, `scripts/audit_editorial_translations.mjs`; permite señalar rutas con `--routes=` y consultar resultados en JSON. El script fue comprobado sintácticamente; una ejecución de GitHub Actions sobre las 16 primeras rutas terminó con éxito y el análisis equivalente de 28 rutas se realizó por lectura de los archivos GitHub. No se ejecutó dentro de Node con un checkout local.

## Cobertura de bloques HTML largos auditada

| Ruta original | Bloques >100 caracteres | Traducción PT + EN |
|---|---:|---:|
| `/compras/feira-sao-cristovao/` | 1 | 1 |
| `/compras/mercadao-madureira/` | 20 | 20 |
| `/compras/uruguaiana/` | 20 | 20 |
| `/gastronomia/adega-perola/` | 9 | 9 |
| `/gastronomia/aipo-aipim-391/` | 9 | 9 |
| `/gastronomia/aipo-aipim-605/` | 9 | 9 |
| `/gastronomia/angu-do-gomes/` | 9 | 9 |
| `/gastronomia/assador/` | 9 | 9 |
| `/gastronomia/bar-da-gema/` | 10 | 10 |
| `/gastronomia/bafo-da-prainha/` | 9 | 9 |
| `/gastronomia/bar-luiz/` | 8 | 8 |
| `/gastronomia/confeitaria-colombo/` | 10 | 10 |
| `/gastronomia/rio-scenarium/` | 9 | 9 |
| `/gastronomia/cachambeer/` | 9 | 9 |
| `/gastronomia/carretao-siqueira/` | 10 | 10 |
| `/gastronomia/casa-do-sardo/` | 10 | 10 |
| `/gastronomia/bb-lanches/` | 10 | 10 |
| `/gastronomia/cavalo-marinho/` | 10 | 10 |
| `/gastronomia/confeitaria-manon/` | 10 | 10 |
| `/gastronomia/cafe-do-alto/` | 10 | 10 |
| `/gastronomia/casa-porto/` | 10 | 10 |
| `/gastronomia/ferro-e-farinha/` | 9 | 9 |
| `/gastronomia/gurume/` | 9 | 9 |
| `/gastronomia/nova-capela/` | 11 | 11 |
| `/gastronomia/jobi/` | 9 | 9 |
| `/gastronomia/aipo-aipim-920/` | 10 | 10 |
| `/gastronomia/arab-leblon/` | 11 | 11 |
| `/gastronomia/churrascaria-palace/` | 9 | 9 |
| **TOTAL** | **279** | **279** |

La página Feira de São Cristóvão incluye un diccionario propio dentro de HTML y un bloque de historia inyectado por JavaScript: ambos necesitan prueba visual y de idioma por separado. En varias fichas hay títulos cortos y textos dentro de elementos compuestos que este control no captura. El conteo de bloques y claves nuevas no equivale al número de variantes URL resueltas.

## QA real de generación selectiva — resultado verificado

Un flujo de GitHub Actions generó en un **runner aislado**, mediante `node scripts/build_multilingual.mjs --routes=<18 rutas>`, **54 HTML** (18 rutas x 3 idiomas). Su ejecución completó correctamente en el run `41466349009`.

El verificador `scripts/verify_rendered_editorial.mjs` examinó las 36 variantes PT/EN generadas: **362 revisiones de bloques, 0 fallos** bajo el criterio de ausencia de texto fuente no traducido y presencia de las variantes correctas. Se registraron **132 coincidencias de traducciones alternativas** de renderizadores internos, por lo que no corresponden exactamente a la redacción de la clave nueva. Una traducción alternativa NO es garantía por sí sola de calidad editorial; la revisión de títulos cortos y contenido dinámico sigue pendiente.

La prueba estricta anterior había fallado por **96 diferencias de redacción** y por contaminación del idioma PT en EN. El diagnóstico identificó que páginas antiguas eligen el idioma desde `localStorage.lang` y comparten un contexto de navegador durante la generación. Se añadió `context.addInitScript` en `scripts/build_multilingual.mjs` para inicializar `lang`, `ec-lang` y `uLang` de acuerdo con cada URL antes de ejecutar scripts HTML. Es un cambio **exclusivamente del generador**, no de los scripts de la web pública. El HTML inglés de Mercadão de Madureira, que antes comenzaba en portugués, se observó después en inglés correcto. También se agregó una comprobación de regresión específica contra la fuga de portugués.

**Limitaciones:** este QA se ejecuta sobre HTML generado en GitHub, no sobre la versión desplegada en Hostinger; todavía no se ha inspeccionado completamente la fidelidad editorial de las traducciones alternativas ni el contenido final del navegador público. No se puede afirmar que se han corregido las 82 variantes detectadas inicialmente por Work o que Google las indexará.

### Prueba ampliada con Madame Bardot, Búzios

La prueba de renderización de la ficha Madame Bardot detectó inicialmente un error real de JavaScript (`ReferenceError: Cannot access 'displayCuisine' before initialization`) introducido al adaptar la página. **Se corrigió antes de publicar.** La prueba posterior, run de GitHub Actions `41467079499`, generó correctamente **19 rutas x 3 idiomas = 57 páginas HTML**, verificó las **36 variantes PT/EN** de las 18 fichas de Río y confirmó mediante búsquedas en el HTML final las frases propias de Madame Bardot en portugués e inglés, así como los títulos localizados del plan de visita.

Estado final de esa ejecución: **success** en generación selectiva, control de diccionarios renderizados y comprobación de Madame Bardot. La ejecución no subió archivos a Hostinger.

## Nuevo lote editorial de diez fichas

Se añadieron 92 claves PT/EN en diez fichas más de Gastronomía, manteniendo seis traducciones ya presentes en el diccionario. Las nuevas fichas son Confeitaria Manon, Café do Alto, Casa Porto, Ferro e Farinha Botafogo, Gurumê, Nova Capela, Jobi, Aipo & Aipim 920, Arab Leblon y Churrascaria Palace. Sus 98 bloques largos HTML identificados tienen claves PT/EN en la rama, pero este conteo aún no implica una publicación ni valida las variantes del sitio abierto. Un workflow selectivo de 29 rutas (28 Río + Madame Bardot) fue configurado para probar el HTML renderizado.

### Validación del lote ampliado de 29 rutas — aprobada

GitHub Actions, run `41470578184` (2 de noviembre de 2026): **success**.

- Renderización selectiva **29 rutas × tres idiomas = 87 HTML**: 28 fichas de Río (56 variantes PT/EN) y Madame Bardot Búzios en ES/PT/EN. La palabra `full` que aparece en el registro del generador significa que no estaba sembrado un manifiesto previo en el runner; con `--routes=` se procesaron **solo 87 de 2.574 posibles páginas**, no una reconstrucción completa de producción.
- Prueba de los **56 HTML PT/EN de Río**: **556 comprobaciones de bloques, 0 incidencias** según el verificador de ausencia de fuente original; 172 casos muestran traducciones alternativas de renderizadores internos y deben revisarse editorialmente antes de afirmar que las páginas están totalmente perfectas.
- La ficha **Madame Bardot** pasa los controles de párrafos y títulos localizados en PT/EN.
- La auditoría de claves exactas para las **28 fichas de Río** también terminó con éxito. El diccionario acumuló **281 claves nuevas bilingües** respecto de `seo/indexacion-20261102`; de ellas, 92 provienen del último lote de diez restaurantes.
- Ninguna de estas pruebas despliega cambios en Hostinger, modifica sitemap público, ni equivale a que Google haya indexado las páginas.

## Cómo revisar SIN dañar el sitio

1. Antes de fusionar, comprobar cambios recientes en la rama de producción y en el PR #12, preservando el trabajo simultáneo de Carioc-IA y otros componentes.
2. Ejecutar, en un checkout local, `node scripts/audit_editorial_translations.mjs --routes=/gastronomia/adega-perola/,/compras/uruguaiana/ --json` y ampliar a las 28 rutas.
3. Verificar en navegador ES/PT/EN con la carga real de `assets/js/site.js` y de `assets/js/buzios-restaurant-profile-view.js`, comparando textos al cargar y tras el idioma seleccionado. Registrar diferencias de HTML inicial y DOM final.
4. `scripts/build_multilingual.mjs` admite `--routes=` y `--update`, pero `--update` requiere un `dist/locale-manifest.json` anterior válido. **No ejecutar el build completo ni generar un sitemap basado en un subconjunto sin conservar el manifiesto existente.**
5. Seleccionar/publicar incrementalmente solo los HTML afectados y los JS que requieran sincronización; contrastar con Hostinger antes de sobreescribir. La API de Hostinger aquí solo expone lectura directa y URL de carga TUS que exige un cliente con conectividad, así que no se ha realizado publicación.
6. Verificar HTTP 200, canonical, hreflang, sitemap y que no se alteren fotos, links, estilo ni Carioc-IA. Después, actualizar el informe de las 84 variantes con la evidencia de cada URL real.
7. Seguir corrigiendo el resto de fichas gastronómicas del informe. **No marcar como corregidas las 82 variantes originales** hasta publicación y verificación reales.

## Protección aplicada

**Excepción controlada a la norma inicial:** sí se modificaron cinco HTML fuente de fichas gastronómicas específicas para corregir el idioma español inicial y la ubicación/estatus histórico erróneos de Cosmopolita. Se preservaron estilos, imágenes, datos PT/EN existentes (salvo Cosmopolita, cuya información histórica se corrigió) y sus estructuras. También se modificaron dos diccionarios, dos módulos de Madame Bardot, el generador de idiomas, documentación, scripts de QA y flujos GitHub Actions **sin despliegue**. No se tocaron Carioc-IA, CSS, robots, sitemap ni Hostinger.

**Conclusión:** avance editorial amplio y verificable a nivel de repositorio; la publicación, QA en producción y recuperación de indexación permanecen pendientes; la prueba de generación aislada y QA de bloques largos ya ha pasado.


## Cierre validado de las 82 variantes en código — 02/11/2026

**Evidencia final:** [GitHub Actions #41487286142](https://github.com/lacasadelsushirg-pixel/ernestinho-v2/actions/runs/41487286142) — `success`, commit `c3179035`.
La compilación se realizó **solo en un runner de GitHub** para 57 rutas × ES/PT/EN = **171 HTML**. No se publicó en Hostinger.

- De las **84 variantes inicialmente señaladas**, **2** (PT Nino Cucina Ipanema y PT Temperarte Bolívar) habían sido corregidas y verificadas en producción previamente. La nueva auditoría cubrió las otras **82 variantes** en código renderizado: **82 comprobadas, 0 HTML faltantes, 0 ejemplos originales detectados sin traducir, 0 enlaces canonical/hreflang faltantes y 0 fugas de expresiones cortas españolas** según la lista comprobada.
- **Dos falsos positivos históricos** del informe original eran párrafos naturalmente portugueses en **Arp Bar PT** y **Quitéria PT**; no se cambiaron arbitrariamente a otra traducción.
- **Un problema real en Polis Sucos EN** se debía a un diccionario interno con una copia ES corrupta y un selector cuya base estaba en PT. Se corrigió la base ES, se habilitó la selección PT/EN en la generación aislada, se revisaron pies de foto, etiquetas, textos ALT, avisos y encabezados. Además, se tradujeron los **9 párrafos adicionales de V2** a PT/EN. El diccionario interno de Polis pasó a **28 párrafos por cada idioma**, y la auditoría de **15 variantes** de las cinco fichas especiales se completó sin incidencias.
- **1.122 comparaciones de bloques largos, 0 errores de traducción literal no resuelta**. Quedaron **268 redacciones alternativas** a las entradas nuevas del diccionario: la prueba verifica que el español origen no permanece visible, pero no demuestra por sí sola equivalencia semántica ni perfección editorial. Se generó un JSON completo para revisión.
- **SEO de las 57 rutas:** **0 errores críticos**, **0 metadescripciones idénticas al español**, **0 metadatos ausentes**; doce títulos coinciden con el español por mantener nombres propios o denominaciones que no requieren traducción. Madame Bardot Búzios también aprobó la revisión de PT/EN.
- Evidencia descargable de ambas auditorías: [artifact de GitHub Actions #13164215000](https://github.com/lacasadelsushirg-pixel/ernestinho-v2/actions/runs/41487286142/artifacts/13164215000) (`audit-82-flagged-variants.json` y `editorial-alternatives.json`).
- Se agregó además un **workflow rápido de Polis Sucos (3 HTML)** para evitar la regeneración de 171 páginas en cada corrección específica.

**Límite imprescindible:** el cierre anterior corresponde **al repositorio y su compilación aislada**. Las 82 variantes **no se pueden declarar corregidas en la web pública** hasta una publicación incremental controlada, con comparación de los archivos vigentes y verificación en Hostinger URL por URL. Tampoco implica indexación de Google. **NO MERGE / NO DEPLOY / NO reconstrucción completa del sitio.**


## Reparación de diccionarios internos: 28 fichas — 02/11/2026

Se detectó un problema editorial que el conteo de claves no había capturado: en varias fichas gastronómicas el selector de idioma ubicaba párrafos traducidos en índices incorrectos. Esto podía ocultar consejos originales y mostrar información práctica en secciones equivocadas. Se corrigió en fuente con cambios **acotados a la rama y el PR #13**, sin publicación.

**28 fichas reparadas:** Adega Pérola, Churrascaria Palace, Rio Scenarium, Lasai, Angu do Gomes, Assador, Confeitaria Colombo, Cachambeer, Carretão Siqueira, Casa do Sardo, BB Lanches, Cavalo Marinho, Confeitaria Manon, Casa Porto, Ferro e Farinha, Gurumê, Jobi, Arab Leblon, Coisas de Bamba, Spesso, Eclipse, Aipo & Aipim 391, Aipo & Aipim 605, Bar da Gema, Café do Alto, Aipo & Aipim 920, Cabanna y Bar Luiz. Polis Sucos se corrigió aparte con 28 párrafos en cada idioma.

En las 28 fichas se reconstruyó el orden de los diccionarios PT/EN y se recuperaron los párrafos añadidos que faltaban. El verificador `scripts/verify_legacy_page_dicts.mjs` comprueba alineación en fuente y en HTML renderizado, con un tratamiento independiente para el patrón de un solo párrafo faltante de Bar Luiz. No se sobreescribieron los textos españoles de origen para crear la traducción.

**Prueba completa y aislada:** [GitHub Actions #41491122736](https://github.com/lacasadelsushirg-pixel/ernestinho-v2/actions/runs/41491122736) — `success` sobre commit `b0a7553c`. Se generaron **171 HTML** (57 rutas, tres idiomas), se verificaron **1.010 posiciones de párrafos PT/EN en 28 fichas: 0 errores**, y **1.122 comparaciones editoriales: 0 errores**. La auditoría de 82 variantes originales mantuvo **0 ejemplos españoles residuales, 0 HTML faltantes, 0 canonical/hreflang faltantes**. Los SEO de 57 rutas conservaron 0 metadescripciones idénticas al español y 0 errores críticos. Las redacciones alternativas detectadas se redujeron de **268 a 182**, sin sustituir variaciones válidas solo por no coincidir literalmente con el diccionario.

Las fichas restantes con diccionarios internos no se consideran automáticamente completas; requieren un análisis por estructura porque no todas comparten el mismo desfase. Tampoco se afirma que los cambios de esta rama estén publicados ni indexados. **NO MERGE / NO DEPLOY / NO Hostinger / NO build global**. El run descrito valida el commit indicado; nuevos commits deberán revalidarse antes de cualquier integración.
