# Cierre de traducciones: revisión semántica y regresiones — 2 de noviembre de 2026

Continuación del PR #13 desde `58cc1532a25e5cb397872f920ab0e4bc59d9034c`, en la rama independiente `seo/cierre-traducciones-revision-20261102`. El workflow aprobado #41495395750 corresponde a `c3accd5145b709b5b81df5008cbd8894f7e5f820`; el único cambio posterior hasta la base revisada era documentación. Se descargó el artefacto 13165014534 y se contrastaron sus resultados con una nueva generación selectiva.

**Sin merge, sin despliegue, sin cambios en Hostinger, sin sitemap público modificado y sin intervención en Carioc-IA.** La auditoría maestra de Búzios quedó en pausa al recibir este encargo; su evidencia parcial se conserva fuera del repositorio.

## 1. Las 212 alternativas se revisaron individualmente

| Clasificación | Casos | Decisión |
|---|---:|---|
| Traducción correcta | 129 | Conservar |
| Traducción comprensible, mejorable | 10 | Corregir |
| Error gramatical o de naturalidad | 12 | Corregir |
| Traducción incorrecta o cambio de significado | 61 | Corregir |
| Español todavía presente dentro de estos 212 bloques | 0 | Ninguno; había otras fugas breves fuera del listado |

Los 83 casos corregidos incluyen 52 posiciones desplazadas y 31 revisiones lingüísticas. El registro completo conserva original español, valor del diccionario, texto realmente renderizado antes, clasificación, motivo y resultado esperado después en `revision-semantica-212-20261102.json`. Los cuatro fragmentos antiguos de pie de Compras se clasifican con el contexto del footer común que también los sustituye en español; no se reintrodujeron pies antiguos para igualar un diccionario.

Ejemplos confirmados y corregidos:

- Nova Capela, Prana y otras fichas: direcciones o campos prácticos en el lugar de párrafos de recomendaciones o contexto. La ausencia de español no demostraba traducción correcta.
- Lasai EN: «freedom from an à-la-carte menu» invertía el sentido de necesitar libertad para elegir a la carta.
- Uruguaiana PT/EN: faltaban el aviso de no entregar datos personales innecesarios, el precio por cantidad, llevar agua, evitar sobrecargar la jornada y la conclusión personal de Ernestinho.
- Polis PT: «recuperar o calor» invertía la idea de refrescarse; PT/EN añadían un corte específico de carne que el español no identificaba. También se corrigió «lunch and a snack» frente a almuerzo o merienda.
- Adega Pérola EN: «otras opciones» se había restringido a bebidas sin alcohol; el ajo en vinagreta se confundía con el nombre de un aderezo.

El control automático todavía registra 196 redacciones distintas del diccionario: 186 corresponden a los casos ya revisados de la lista original y diez a redacciones válidas de Majórica al activar su diccionario realineado. Estas diez se revisaron y están cubiertas por la comparación de todas las posiciones de la matriz de Majórica. **No se forzaron las traducciones correctas a coincidir literalmente.**

## 2. Correcciones técnicas adicionales

Se realinearon las 14 fichas con problemas visibles en la primera comparación: `nova-capela`, `pesqueiro`, `kilograma-centro`, `point-de-grumari`, `temperarte-posto6`, `xian`, `shiso`, `sabor-das-aguas`, `rufino-parrilla`, `prana`, `oro`, `sushi-leblon`, `don-pascual` y `majorica`.

Se completaron las posiciones de `pilograma-prime-grill`, `nido-ristorante` y `delirio` para activar sus traductores sin desplazar ni perder contenido. En Nino Cucina y Temperarte Bolívar, previamente intervenidas en producción, también se corrigieron los índices internos antiguos para no reintroducir el problema al regenerarlas; no se realizó una nueva publicación.

Al activar los traductores internos se preservaron las traducciones completas que ya aparecían correctamente en el HTML anterior. Se corrigieron entradillas, rótulos de fotografías, enlaces textuales y párrafos cortos que no entraban en la auditoría de ALT/pies/avisos. Se añadieron claves exactas a los diccionarios; no se cambió el contenido de los enlaces ni sus destinos.

La generación selectiva activa el selector propio cuando existe y resuelve después encabezados/rótulos mediante claves exactas, sin volver a ejecutar `site.apply` y deshacer los párrafos alineados. No se desactiva ningún control ni se modifica el sitemap de producción.

Se corrigió una condición de navegación en `assets/js/site.js`: usaba el pathname con prefijo PT/EN y omitía la cabecera común en esas fichas. Ahora usa la ruta normalizada existente. No cambia el diseño; el control verifica 165 cabeceras de fichas gastronómicas en los tres idiomas. Este archivo compartido debe incluirse expresamente en una futura publicación incremental autorizada.

## 3. Verificaciones sobre HTML ejecutado y generado

La compilación se limitó explícitamente con `--routes=` a 59 rutas, 177 HTML: las 57 originales y Nino Cucina / Temperarte Bolívar. Las comprobaciones se ejecutaron sobre el DOM resultante de ejecutar JavaScript, serializado por el compilador existente. No se reconstruyeron las aproximadamente 2.500 páginas. Hubo actualizaciones locales de rutas concretas para verificar ajustes; ningún `dist/` se publicó.

| Control | Resultado local |
|---|---|
| Casos semánticos originales y matriz de Majórica | 252 comprobaciones, 0 fallos |
| Diccionarios por posición | 49 fichas, 2.040 posiciones PT/EN, 0 fallos |
| Bloques largos del control anterior | 52 fuentes, 1.122 controles, 0 fallos |
| 82 variantes originalmente pendientes | 82 presentes; 0 ejemplos españoles pendientes bajo el control; canonical/hreflang presentes |
| Páginas especiales | 15 variantes ES/PT/EN aprobadas |
| Avisos, ALT, pies y párrafos de prueba | 24 comprobaciones aprobadas |
| Textos breves ampliados | 58 fichas / 116 variantes: 0 coincidencias españolas; 11 coincidencias portuguesas válidas preservadas |
| Contrato de idioma, canonical y hreflang exactos | 177 documentos, 0 fallos |
| Títulos/descripciones SEO | 59 rutas / 118 variantes: 0 errores críticos, 0 metadatos ausentes, 0 descripciones idénticas al español |
| Coincidencias de títulos | 26 títulos nominales/nombres propios legítimos; no se traducen nombres de establecimientos |
| Fotos, mapas y enlaces del contenido principal | 171 HTML del lote original: listas y orden idénticos a la base renderizada |
| HTML fuente aprobado fuera de scripts | 59 contratos de hash, sin cambios |
| Sintaxis y formato | JavaScript comprobado y `git diff --check` aprobado |

Los JSON de QA están en `verificaciones-cierre-20261102.json`, `conservacion-renderizada-171-20261102.json` y el contrato `contrato-traducciones-59-20261102.json`. Se añadió el workflow `seo-semantic-review.yml`, sin paso de publicación, para repetir los controles y guardar artefactos.

El comprobador histórico `check_frozen_pages.py` **no está verde**: la base ya tenía 246 discrepancias y ahora muestra 249. Las tres adicionales son las fichas de Compras cuyo hash completo cambia por sus traducciones internas autorizadas; su HTML fuera de scripts sigue idéntico, comprobado por contrato. No se regeneró el manifiesto congelado ni se restauraron páginas históricas sobre avances recientes. Esta excepción queda visible para revisión.

## 4. Situación pública de las 84 URL — exclusivamente lectura

Se hicieron peticiones nuevas y una visita con ejecución de JavaScript a cada una de las 84 URL. Resultado: 84 HTTP 200, 84 canonical propios correctos, 84 juegos hreflang completos correctos y 84 presentes en el sitemap. El sitemap se comparó byte a byte antes/después de la tarea y permanece igual.

**80 URL conservan español confirmado en el HTML servido. Tras JavaScript, el ejemplo original sigue visible en 79 URL** (excluyendo los dos falsos positivos de portugués nativo de Arp Bar y Quitéria). Las diferencias de estos dos recuentos reflejan renderizadores y muestras, no publicaciones nuevas. Las dos variantes antes intervenidas en producción conservan esa condición histórica respecto a sus ejemplos, sin certificar por ello que toda la ficha anterior fuera perfecta.

| Estado | Qué significa en esta entrega |
|---|---|
| Corregido en código | Correcciones y traducciones disponibles en la rama de revisión |
| Generado correctamente | Las 84 variantes originales están cubiertas por los 177 HTML selectivos y los controles descritos |
| Publicado | Ningún cambio de esta tarea se publicó; el sitio público mantiene su versión previa |
| Indexado | No comprobado: no se obtuvo inspección individual autorizada de Search Console |

`estado-publico-84-20261102.json` separa HTTP, metadatos, muestra del HTML servido, comprobación después de JavaScript, estado de código y ausencia de publicación. No se solicitaron indexaciones ni se modificó Search Console.

## 5. Coordinación, límites y seguimiento

- Rama aislada desde el HEAD del PR #13; no se modificaron sus referencias ni la rama publicada. Antes del commit se volvieron a consultar los HEAD remotos y se contrastó el diff.
- El PR de revisión debe apuntar a la rama del PR #13 para mostrar solo esta continuación. No se fusiona ninguna rama.
- El workflow es de QA aislado y no contiene acceso, credenciales ni carga de archivos a Hostinger.
- La preservación de enlaces no equivale a auditar la operación real de cada negocio. Siguen pendientes las fotografías históricas de Cosmopolita y discrepancias editoriales ya presentes, por ejemplo los números 82 y 96 de Nova Capela. No se inventó una dirección ni un negocio abierto para resolverlas.
- Este cierre se refiere al lote definido, no a todos los textos del sitio. Búzios completo y Carioc-IA continúan fuera del alcance.
- Antes de cualquier publicación futura: integrar de forma controlada, revisar los cambios simultáneos, preparar una lista explícita de archivos y preservar sitemap/manifiesto globales. Requiere autorización nueva: no se ejecuta en esta tarea.

## Archivos fuente modificados

- `assets/js/site.js`
- `assets/js/translations/chunks/rio-residual-gastronomia-01.js`
- `compras/feira-sao-cristovao/index.html`
- `compras/mercadao-madureira/index.html`
- `compras/uruguaiana/index.html`
- `gastronomia/adega-perola/index.html`
- `gastronomia/aipo-aipim-391/index.html`
- `gastronomia/aipo-aipim-605/index.html`
- `gastronomia/aipo-aipim-920/index.html`
- `gastronomia/angu-do-gomes/index.html`
- `gastronomia/arab-leblon/index.html`
- `gastronomia/assador/index.html`
- `gastronomia/bafo-da-prainha/index.html`
- `gastronomia/bar-da-gema/index.html`
- `gastronomia/bar-luiz/index.html`
- `gastronomia/bb-lanches/index.html`
- `gastronomia/bira-de-guaratiba/index.html`
- `gastronomia/cabanna/index.html`
- `gastronomia/cachambeer/index.html`
- `gastronomia/cafe-do-alto/index.html`
- `gastronomia/carretao-siqueira/index.html`
- `gastronomia/casa-do-sardo/index.html`
- `gastronomia/casa-porto/index.html`
- `gastronomia/cavalo-marinho/index.html`
- `gastronomia/churrascaria-palace/index.html`
- `gastronomia/coisas-de-bamba/index.html`
- `gastronomia/confeitaria-colombo/index.html`
- `gastronomia/confeitaria-manon/index.html`
- `gastronomia/delirio/index.html`
- `gastronomia/don-pascual/index.html`
- `gastronomia/eclipse/index.html`
- `gastronomia/ferro-e-farinha/index.html`
- `gastronomia/gurume/index.html`
- `gastronomia/joaquina/index.html`
- `gastronomia/jobi/index.html`
- `gastronomia/kilograma-centro/index.html`
- `gastronomia/lasai/index.html`
- `gastronomia/majorica/index.html`
- `gastronomia/nido-ristorante/index.html`
- `gastronomia/nino-cucina-ipanema/index.html`
- `gastronomia/nova-capela/index.html`
- `gastronomia/oro/index.html`
- `gastronomia/pesqueiro/index.html`
- `gastronomia/pilograma-prime-grill/index.html`
- `gastronomia/point-de-grumari/index.html`
- `gastronomia/polis-sucos/index.html`
- `gastronomia/prana/index.html`
- `gastronomia/rio-scenarium/index.html`
- `gastronomia/rufino-parrilla/index.html`
- `gastronomia/sabor-das-aguas/index.html`
- `gastronomia/shiso/index.html`
- `gastronomia/spesso/index.html`
- `gastronomia/sushi-leblon/index.html`
- `gastronomia/temperarte-bolivar/index.html`
- `gastronomia/temperarte-posto6/index.html`
- `gastronomia/xian/index.html`
- `scripts/audit_rendered_shortcopy.mjs`
- `scripts/build_multilingual.mjs`
- `scripts/editorial_shortcopy_translations.mjs`
- `scripts/verify_legacy_page_dicts.mjs`

Se agregan los informes JSON, contratos y pruebas mencionados en este documento. No se incluyen `node_modules`, `dist` ni archivos de auditoría de Búzios en el commit.
