# Continuación SEO — lote amplio PT/EN (02-11-2026)

**Estado:** trabajo fuente en la rama `seo/traducciones-continuacion-lote2-20261102` y PR #13 (borrador) contra `seo/indexacion-20261102` del PR #12. **NO publicado en Hostinger, NO integrado y NO verificado con Google Search Console.**

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

Ninguna modificación en contenido fuente español, HTML, estilos CSS, fotos, URL, sitemap, robots o Carioc-IA. Los cambios del PR #13 se limitan a los dos diccionarios, los dos módulos específicos de Madame Bardot, documentación y scripts de auditoría, el generador de idiomas y dos flujos GitHub Actions **sin despliegue**. No se ha modificado ningún HTML fuente, diseño, foto o Carioc-IA.

**Conclusión:** avance editorial amplio y verificable a nivel de repositorio; la publicación, QA en producción y recuperación de indexación permanecen pendientes; la prueba de generación aislada y QA de bloques largos ya ha pasado.
