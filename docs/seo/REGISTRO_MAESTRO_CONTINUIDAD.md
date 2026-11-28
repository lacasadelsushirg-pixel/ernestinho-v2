# Registro maestro de continuidad multilingüe

Última actualización: 2026-11-16 UTC

## Fuente de verdad y publicación

- Repositorio: `lacasadelsushirg-pixel/ernestinho-v2`.
- Rama pública de referencia: `revision/rendimiento-traducciones-81a904c`.
- HEAD público comprobado al abrir esta ejecución: `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`.
- Hostinger sirve `/home/u319776719/domains/ernestinhocarioca.com.br/public_html`.
- La raíz pública de Hostinger no tiene actualmente un repositorio Git enlazado. Los únicos despliegues Git configurados apuntan a `ec-translation-stage-20261102`, `fr` y `pt-en-preview-lote1`; por tanto, un PR o commit no cambia por sí solo la portada pública.
- `assets/js/translations/home.js` de Hostinger coincide exactamente con el mismo archivo del HEAD público, salvo el salto de línea final (FNV-1a `b39e36b3`, 18.251 caracteres). Esta comprobación evita basar el lote en una copia distinta de producción.
- Publicado significa únicamente visible y verificado en `https://www.ernestinhocarioca.com.br/`; una rama, un PR o una carpeta auxiliar no cuentan como publicación.

## Lote activo: Inicio PT-BR/EN seguro

Rama: `release/home-pt-en-safe-20261116`

Base: `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`

Commit remoto del contenido y registro previo: `6dec992d29866bcae279fb508df54307297fe398`

PR de revisión: [#42](https://github.com/lacasadelsushirg-pixel/ernestinho-v2/pull/42)

Objetivo del sublote: mejorar la redacción editorial completa de las 97 claves de Inicio en PT-BR y EN, sin cambiar español, HTML, fotografías, mapas, componentes, rutas, canonical, hreflang ni sitemap. Francés permanece privado con `noindex, nofollow` y fuera del sitemap hasta su QA completo.

| URL | ES | PT-BR | EN | FR | Estado de este sublote |
|---|---|---|---|---|---|
| https://www.ernestinhocarioca.com.br/ | Publicado, preservado | N/A | N/A | N/A | Sin cambios |
| https://www.ernestinhocarioca.com.br/pt/ | N/A | Publicado anterior; candidato editorial 97/97 en PR | N/A | N/A | No publicado todavía |
| https://www.ernestinhocarioca.com.br/en/ | N/A | N/A | Publicado anterior; candidato editorial 97/97 en PR | N/A | No publicado todavía |
| https://www.ernestinhocarioca.com.br/fr/ | N/A | N/A | N/A | Privado en Hostinger con `noindex, nofollow` | No contar como publicada/indexable |

### Verificaciones del candidato

- Sintaxis: `node --check assets/js/translations/home.js` y `node --check scripts/qa_locale_interactions.mjs`: PASS.
- Cobertura: ES 97 claves, PT 97/97, EN 97/97; cero valores vacíos.
- Fidelidad: objeto ES idéntico al de producción; cero coincidencias del detector básico de fragmentos españoles en PT/EN.
- Integridad: `git diff --check`: PASS.
- Build: detenido correctamente por `guard_approved_content.mjs`; no se desactivó ni se actualizó su baseline.
- Protección: el único recurso compartido protegido modificado es `assets/js/translations/home.js`. Se actualiza la aserción editorial correspondiente en `scripts/qa_locale_interactions.mjs`.
- Fotos/layout/HTML/SEO: no se modifican en este sublote.

## Ejecución Hostinger: QA privado de Inicio FR

Rama desplegada en la carpeta privada de Hostinger `fr`: `release/fr-public-initial-20261115`

HEAD remoto y desplegado: `0879dc353a57de1eef5301b4a65602cb324694d4`

URL comprobada: `https://www.ernestinhocarioca.com.br/fr/`

Estado real: visible para QA, pero privado para buscadores con `noindex, nofollow`; no se cuenta como página publicada/indexable ni se incorpora al sitemap.

### Cambios y comprobaciones de esta ejecución

- `b5017ca16d214dd056a1f95f840fb1639c36e7ed`: corrigió cuatro etiquetas de accesibilidad que seguían en español (`Expériences précédentes`, `Expériences suivantes`, `Expériences à la une` y `Rio en direct, Ernestinho à la télévision et événements`).
- `60a935b468332ac70b82fce70b1c6c1c15cdfc28`: añadió pasadas breves de localización después del renderizado asíncrono para evitar que las tarjetas dinámicas reaparezcan en español.
- `4547dda5e21a81cf6fb33696dbdcd4d85b2dee50`: asignó textos alternativos franceses a las 17 tarjetas de secciones y 7 tarjetas de experiencias, usando sus títulos editoriales ya localizados.
- `0879dc353a57de1eef5301b4a65602cb324694d4`: renovó la clave de caché de `fr-home.js` para que la mejora de accesibilidad llegue realmente al navegador.
- Despliegue Git de la rama a la carpeta `fr` de Hostinger: confirmado correctamente.
- Comprobación de archivo en Hostinger: las cuatro etiquetas francesas están presentes; las versiones españolas ya no aparecen; canonical `https://www.ernestinhocarioca.com.br/fr/`; `noindex, nofollow` y Googlebot noindex preservados.
- Comprobación HTTP/renderizado real: las 17 tarjetas dinámicas de Inicio, destacados, selector y botón del asistente se muestran en francés después de cargar la página.
- Sintaxis: `node --check fr-home.js`: PASS. Integridad: `git diff --check`: PASS.
- Fotografías, rutas `/FOTOS/HOME/`, layout, sitemap y la portada ES no se modificaron.
- QA HTTP posterior al despliegue: 17 tarjetas de secciones + 7 experiencias; `alt` vacíos = 0; canonical FR correcto; `robots` y `googlebot` continúan en `noindex, nofollow`; script servido con `?v=fr-public-20261116e`.
- Incidencia preexistente confirmada: cinco imágenes aprobadas referenciadas desde `/FOTOS/HOME/` no cargan porque esos archivos no están presentes en la carpeta de Hostinger (`ernestinho pagina home.png`, miniatura Búzios, clima, TV y eventos). No se sustituyeron, movieron ni subieron fotografías sin revisión.
- Publicaciones indexables nuevas de esta ejecución: **0**. Mejora visible en entorno privado de Hostinger: **1 página** (`/fr/`).

### Bloqueo exacto de publicación

El repositorio exige revisión humana independiente para `assets/js/translations/home.js`. El propietario autorizó las traducciones, pero la protección explícita no permite simular esa segunda revisión. El candidato debe recibir esa aprobación en su PR; después se integra a la rama pública y se publica mediante el flujo controlado hacia la raíz de Hostinger, con respaldo y comprobación HTTP posterior.

No utilizar el PR #41 como release de este sublote: además de Inicio modifica `site.js`, `locale-routing.js`, generador y sitemap, e intenta indexar FR. El candidato seguro actual separa PT/EN para producir el primer cambio visible sin abrir FR antes de QA.

## Siguiente paso exacto

1. Obtener una revisión humana independiente del PR pequeño de Inicio PT/EN.
2. Tras aprobación y checks, integrar en `revision/rendimiento-traducciones-81a904c`.
3. Publicar únicamente `assets/js/translations/home.js` en la raíz real de Hostinger con respaldo previo.
4. Verificar por HTTP `/pt/` y `/en/` a 390 px y 1440 px, contenido 97/97, imágenes, selector, canonical y hreflang.
5. Mantener `/fr/` privado y fuera del sitemap; recuperar desde la fuente aprobada las cinco fotografías faltantes de `/FOTOS/HOME/` antes de completar su QA a 390 px y considerar cualquier indexación.
6. Cuando Inicio esté completo y publicado en los idiomas autorizados, continuar con Guía de Río.

## Referencias concurrentes

- PR #24: rama amplia histórica; no usar como base de este release.
- PR #40: Elena PT/EN, fuera de prioridad mientras Inicio no esté publicado.
- PR #41: candidato amplio de Inicio/FR; no publicado y sin revisiones.
- Producción seguía en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346` al iniciar este registro.
- PR #42 seguía abierto, no borrador, fusionable y sin revisiones registradas. El último SHA remoto anterior a esta actualización documental era `92946f03268562f275dff32d77c95d7facdd7272`; la siguiente ejecución debe volver a leer el HEAD del PR, ya que el propio commit que guarda esta línea necesariamente será posterior.


## Punto durable — 2026-11-16 — Guía de Río FR, accesibilidad privada

- Producción remota verificada durante esta ejecución: `9a118eb7a7615a4e88259a61bc3dda5653bb43eb`. Este avance concurrente reemplaza la referencia anterior `21bb6877`.
- PR #42: abierto, no borrador, sin revisiones y ahora **no fusionable** porque su base quedó atrás respecto de producción. No se forzó ni fusionó.
- Rama FR desplegada en la carpeta privada `fr` de Hostinger: `release/fr-public-initial-20261115`.
- Commit remoto y desplegado: `d34215d1e10fa992730701a13c9e7ea017fa4ee6` (`fix(fr): localize Guide image alt text`).
- Cambios: 12 textos alternativos que aún estaban en español fueron sustituidos por francés editorial en seis páginas: `/fr/guia/apps/` (2), `/fr/guia/consulados/` (2), `/fr/guia/internet/` (4), `/fr/guia/menores/` (2), `/fr/guia/permanencia/` (1) y `/fr/guia/vacunas/` (1).
- Rebase seguro: las seis páginas se reaplicaron sobre el HEAD concurrente FR `4947913352e91569f5a1652ede0d4a73da855c6d`; ninguna de ellas había sido modificada por ese avance.
- Despliegue Git Hostinger: confirmado con éxito hacia el directorio `fr`.
- QA HTTP posterior: las seis URL cargan desde Hostinger; H1 y title son franceses; canonical individual correcto; `robots noindex,nofollow` preservado; cero textos alternativos españoles objetivo y 12 textos alternativos franceses presentes.
- Fotografías, rutas, layout, mapas, enlaces, sitemap, ES, PT-BR y EN: sin cambios.
- Publicaciones indexables nuevas: **0**. Páginas privadas de QA mejoradas y verificadas: **6**. No contabilizar como publicadas/indexables.

### Siguiente paso exacto actualizado

1. Rebasar el candidato pequeño del PR #42 sobre producción `9a118eb7a7615a4e88259a61bc3dda5653bb43eb`, reconciliando únicamente los archivos del lote de Inicio y preservando todos los cambios concurrentes.
2. Volver a ejecutar cobertura PT/EN 97/97, sintaxis, guardia de contenido, diff, responsive 390/1440 y SEO de Inicio.
3. Solicitar la única intervención externa indispensable: revisión humana independiente del candidato actualizado.
4. Tras aprobación y checks, integrar y publicar PT/EN en la raíz real de Hostinger; verificar por HTTP antes de llamarlo publicado.
5. Mientras esa revisión sigue pendiente, continuar la auditoría de Guía FR en sublotes pequeños, siempre privada/noindex y con commits remotos antes de pasar a Transportes.


### Corrección por avance concurrente posterior

Después del checkpoint anterior, producción volvió a avanzar y el HEAD comprobado mediante comparación remota pasó a `13281f87fb16ba57be07f230c00d877657ba7bdf` (commit “Recover incremental Hostinger Home publish”). Ese commit modifica exclusivamente `scripts/build_multilingual.mjs` para recuperar de forma estricta un manifiesto publicado truncado y permitir el copiado incremental de los bundles runtime de Inicio.

La rama de producción remota ya contiene el blob editorial de Inicio `assets/js/translations/home.js` con SHA `a4821986caf631c7e7f555781ad415f5108e1e60`, idéntico al candidato PT/EN del PR #42. Sin embargo, la raíz pública de Hostinger todavía sirve la versión anterior:

- `/pt/`: muestra “Não quero lhe dar uma lista infinita...” y no la revisión “Não quero entregar...”.
- `/en/`: muestra “I do not want to hand you an endless list...” y no la revisión “I do not want to give you...”.
- Ambos Inicio públicos conservaron canonical propio, alternates ES/PT-BR/EN/x-default y 36 imágenes cargadas sin roturas en la comprobación del navegador.
- Por tanto, estas mejoras están **presentes en GitHub producción pero no publicadas en Hostinger**. Publicaciones nuevas de Inicio en esta ejecución: **0**.
- No se ejecutó el despliegue raíz: sigue pendiente la revisión humana independiente exigida y una verificación de que el flujo incremental de PR #43 pasa sus protecciones.


### Estado de protecciones del checkpoint

- GitHub Actions `Protect approved content`, ejecución 748 sobre `f3aa2669a89188776662a030dbe6b7ce681f587c`: **SUCCESS** en todos sus pasos, incluida la verificación del baseline inmutable y el informe de discrepancias históricas.
- `Petrópolis preview QA`, ejecución 690: **SUCCESS**.
- Revisiones registradas en PR #42: **0**. La única intervención pendiente para autorizar la publicación raíz sigue siendo una revisión humana independiente; no se simuló ni se eludió.


## Bloqueo crítico Hostinger y parche incremental seguro — 2026-11-16

### Estado real verificado

- HEAD remoto de producción: `d9ae3339e63cfed8873cc36a0a48712ddcee165d` (merge de PR #44).
- Último build Hostinger: `01a1e4a2-daae-7224-921f-03b302b4c7c1`, estado **failed**.
- Hostinger leyó el manifiesto publicado con `sourceCommit: 13281f87fb16ba57be07f230c00d877657ba7bdf`, pero el conjunto de cambios hasta `d9ae3339` incluyó `assets/js/i18n.js`; el plan anterior lo clasificó como global y activó `Build mode: full; rendering 3612 of 3612`.
- El navegador de compilación se cerró durante Gastronomía después de aproximadamente 2.800 páginas. El despliegue falló y la raíz pública anterior permaneció activa.
- La raíz real contiene `locale-manifest.json`: 1.204 documentos fuente, 1.196 indexables por idioma, 3.613 entradas de rutas, `sourceCommit 13281f87...`.
- Git de carpetas auxiliares confirmado: `ec-translation-stage-20261102`, `fr` y `pt-en-preview-lote1`. Ninguna de ellas equivale a la raíz pública.

### Candidato de reparación

Rama: `fix/hostinger-incremental-failsafe-20261116`

Commits remotos:

- `c1835310cc6e530d8312a1daf1d513fa19a632ac`: endurece el plan incremental.
- `8b05c90d7cbd98c11054b618fe76ba74948710e7`: añade QA reproducible del plan.

Cambios exactos:

1. Un build automático sin manifiesto publicado válido ahora termina con `SAFE ABORT` antes de borrar o copiar `dist`; ya no cae silenciosamente a build completo.
2. Se exigen al menos 3.588 rutas indexables, `sourceCommit` válido, rutas `/`, `/pt/`, `/en/`, ausencia de duplicados, `index.html` y `sitemap.xml`.
3. Los cinco recursos del lote Home (`i18n.js`, `locale-routing.js`, `translations/home.js`, diccionario FR y `fr/index.html`) seleccionan únicamente la fuente `/`, es decir, tres renderizados: ES, PT-BR y EN. FR se copia como fuente privada y conserva noindex.
4. Un cambio global desconocido ya no puede iniciar 3.612 renderizados automáticamente: requiere un release `--full` explícito y revisado.
5. El paquete incremental se siembra desde la raíz publicada y verifica que todos los archivos de las rutas del manifiesto existan antes de continuar; si falta uno, aborta y rechaza el paquete parcial.
6. `--plan-only`, `EC_LIVE_ROOT` y `EC_DIST_ROOT` permiten probar el plan en un entorno aislado sin tocar Hostinger.

### Pruebas

- `node --check scripts/build_multilingual.mjs`: PASS.
- `node --check scripts/qa_hostinger_incremental_plan.mjs`: PASS.
- `node scripts/qa_hostinger_incremental_plan.mjs`: PASS.
- Plan aislado usando la diferencia real `13281f87..d9ae3339`: modo incremental, **1 ruta fuente**, destinos exactos `/`, `/pt/`, `/en/`; **3/3.612** páginas.
- Manifiesto ausente: salida 1, mensaje `SAFE ABORT`, archivo centinela de `dist` preservado.
- `git diff --check`: PASS.
- `guard_approved_content.mjs`: PASS; 586 páginas sin cambios nuevos, 247 diferencias históricas solo informadas.
- `check_frozen_pages.py`: continúa mostrando las 247 diferencias históricas heredadas de producción; no se regeneró ni aprobó ningún hash.

### Estado de publicación

- Páginas nuevas publicadas en la raíz Hostinger en esta ejecución: **0**.
- No se relanzó `npm run build` general.
- No se modificó `public_html`, fotografías ni sitemap.
- El parche toca `scripts/build_multilingual.mjs`, recurso protegido: requiere revisión humana independiente antes de integrarse o probarse como despliegue real.

### Siguiente paso exacto

1. Abrir y revisar el PR pequeño de esta rama.
2. Ejecutar el workflow de protección sobre el HEAD remoto.
3. Obtener aprobación humana independiente del cambio de `build_multilingual.mjs`.
4. Después de aprobación, integrar en producción y observar en Hostinger que el log diga exactamente `Build mode: incremental; rendering 3 of 3612` y `Selected source routes (1): /`.
5. Rechazar el release si aparece `full`, si falta el manifiesto o si el paquete no preserva las 3.613 rutas.
6. Solo tras build exitoso comprobar por HTTP Inicio ES/PT/EN, imágenes, selector, canonical y hreflang; FR seguirá privada/noindex.


### PR y verificación pública final de esta ejecución

- PR abierto y listo para revisión: [#45](https://github.com/lacasadelsushirg-pixel/ernestinho-v2/pull/45), base exacta `d9ae3339e63cfed8873cc36a0a48712ddcee165d`.
- HEAD remoto del PR antes de este apunte: `29db72a51d695fd3ddd04f17c4b7843a1a80e553`.
- Comparación GitHub: rama 3 commits por delante, 0 por detrás; solo 3 archivos (`build_multilingual.mjs`, QA y este registro).
- Workflows asociados al HEAD: ninguno iniciado todavía. Revisiones humanas: 0.
- HTTP/navegador después del build fallido: `/pt/` continúa mostrando la copia anterior “Não quero lhe dar uma lista infinita...”; `/en/` continúa mostrando “I do not want to hand you an endless list...”.
- `/pt/`: canonical correcto, alternates ES/PT-BR/EN/x-default, 36 imágenes y 0 rotas. Esto confirma que el build fallido no sustituyó la raíz por un paquete parcial.
- Intervención mínima pendiente: una persona distinta debe revisar y aprobar PR #45; además debe arrancar y quedar verde el workflow `Protect approved content`. Hasta entonces no se despliega.


## Punto durable — 2026-11-16 UTC — QA integral del incremental Hostinger

- Producción remota verificada: `d9ae3339e63cfed8873cc36a0a48712ddcee165d`.
- Último build Hostinger: `01a1e4a2-daae-7224-921f-03b302b4c7c1`, estado `failed`; no hubo un despliegue posterior. El fallo sigue siendo el build masivo heredado de 3.612 páginas y no se reintentó.
- PR de corrección: [#45](https://github.com/lacasadelsushirg-pixel/ernestinho-v2/pull/45), abierto, fusionable y con los workflows `Protect approved content` y `Petrópolis preview QA` en verde. Revisiones humanas registradas: 0.
- Commit remoto adicional: `aaa210a9f4224b8dc2c6e112c39f7ba624d67342`.
- Hallazgo del QA integral: la primera versión seleccionaba solo Inicio, pero la copia genérica podía superponer el árbol fuente `fr/` y añadir `/fr/` al sitemap si esa fuente era indexable. Se corrigió para que todo build incremental herede exactamente el árbol FR ya publicado y su indexabilidad; un candidato FR del repositorio no puede hacerse público como efecto secundario de PT/EN.
- Simulación aislada sobre 3.588 rutas: `Build mode: incremental; rendering 3 of 3612`; seleccionadas `/`, `/pt/`, `/en/`; 3.588 archivos y 3.588 URL del sitemap preservados; centinela profundo EN preservado; árbol FR privado preservado byte a byte; `/fr/` ausente del manifiesto y sitemap.
- Pruebas: sintaxis Node PASS; prueba negativa sin manifiesto PASS y `dist` intacto; `git diff --check` PASS; guard PASS con 586 archivos sin cambios y 247 diferencias históricas heredadas, sin regenerar aprobaciones.
- Publicaciones nuevas de esta ejecución: **0**. No se lanzó build ni se modificó `public_html`.
- Bloqueo exacto: falta una revisión humana independiente del PR #45. Con esa aprobación y checks verdes, integrar el PR; el build Hostinger debe mostrar exactamente `3 of 3612`. Si muestra `full`, si falta el manifiesto o si FR cambia de indexabilidad, abortar y no publicar.
- Siguiente paso después de publicar el fix: actualizar sobre producción el candidato pequeño de Inicio PT-BR/EN, mantener FR privado/noindex, ejecutar el mismo incremental de 3 rutas y verificar `/`, `/pt/` y `/en/` por HTTP a 390 y 1440 px.


### Reconciliación de Inicio PT-BR/EN — 2026-11-16 UTC

- La comparación selectiva confirmó que las 15 mejoras PT-BR y 15 mejoras EN de Inicio que motivaban el PR #42 ya están presentes en la rama de producción `d9ae3339e63cfed8873cc36a0a48712ddcee165d`, junto con el diccionario FR concurrente. No se creó otra rama de contenido y no se sobrescribió el archivo ampliado.
- El sitio público de Hostinger todavía muestra la redacción anterior porque el build de `d9ae3339` falló; por tanto esas mejoras están **preparadas en producción Git, no publicadas**.
- PR #42 queda obsoleto/no fusionable respecto de producción y no debe usarse para release.
- Se corrigió en `a7da8fc29787ec8811bfbc3327574ebb7e89058a` la única aserción visual de Inicio que aún esperaba el texto EN anterior (`Festivals...` en vez de `Parties, festivals...`). No cambia contenido, HTML, fotos ni SEO.
- Camino de publicación único: aprobar e integrar PR #45; verificar workflows verdes; permitir un build Hostinger incremental de exactamente 3 páginas; confirmar después por HTTP que PT-BR/EN muestran las mejoras ya presentes y que FR conserva su estado privado real.


## Punto durable — 2026-11-16 14:23 BRT — QA integral obligatorio en GitHub

- PR activo: [#45](https://github.com/lacasadelsushirg-pixel/ernestinho-v2/pull/45).
- Commit de prueba integral: `7d6b5b29e40855b077709af2ad0e525e2cc61848`.
- Commit que incorporó la prueba al workflow protegido: `4402fcd2c725510f8ffa462c9df63df224c915db`.
- El workflow `Protect approved content` ahora ejecuta `npm ci`, el guard editorial y `scripts/qa_hostinger_incremental_plan.mjs`.
- Resultado remoto confirmado en GitHub Actions para `4402fcd2`: `Protect approved content` **success** y `Petrópolis preview QA` **success**.
- La prueba reproduce una raíz publicada de 3.588 URL, ejecuta el build real y exige: `3 of 3612`, copia previa de 3.588 rutas, preservación de una página EN profunda, preservación byte a byte del árbol FR privado, 3.588 entradas indexables y 3.588 URL de sitemap, ausencia de `/fr/` en manifiesto/sitemap y `SAFE ABORT` sin alterar `dist` cuando falta el manifiesto.
- Hostinger no fue relanzado y la raíz pública no fue modificada. Publicaciones nuevas: **0**.
- Bloqueo único: revisión humana independiente del PR #45. Después de aprobar e integrar, aceptar el despliegue solo si el log real de Hostinger confirma `Build mode: incremental; rendering 3 of 3612 locale pages`.


## Punto durable — 2026-11-20 11:30 BRT — candidato reconstruido sobre producción vigente

- HEAD de producción verificado: `2dce60064291de24ee325a46beacde2f4749e452`.
- Cambios concurrentes conservados: `quiero/index.html` y su autorización exacta en `scripts/guard_approved_content.mjs`; no fueron sustituidos por el candidato.
- El PR #45 quedó no fusionable y 11 commits detrás de producción. Su contenido técnico se reaplicó selectivamente, sin arrastrar su base antigua, en `fix/hostinger-incremental-failsafe-20261120`.
- HEAD remoto inicial del candidato reconstruido: `83299ae30e08aa44584f02900f5db7a94eb480c3`.
- Último despliegue Hostinger comprobado: build `01a1f458-351d-71da-9194-a0fc4b129bf5`, commit `2dce60064291de24ee325a46beacde2f4749e452`, estado `failed`.
- Evidencia del log real: `Build mode: full; rendering 3612 of 3612 locale pages`; no hubo selección incremental ni siembra de las 3.588 rutas; Chromium volvió a cerrarse y el build terminó fallido después de aproximadamente 15 minutos.
- No se relanzó Hostinger y no se modificó `public_html`. Publicaciones nuevas verificadas: **0**.
- Siguiente paso exacto: abrir un PR sustituto contra producción actual, esperar los checks obligatorios y la revisión humana independiente; cerrar #45 como reemplazado solo cuando el nuevo PR esté verde y fusionable. Tras aprobación, aceptar exclusivamente un log Hostinger con `Build mode: incremental; rendering 3 of 3612 locale pages`.


### Corrección del alcance incremental — producción actual

- El primer check del PR #46 terminó en rojo de forma segura porque la comparación real desde el manifiesto `13281f87` seleccionó `/` y `/quiero/`, mientras la aserción todavía esperaba solo Inicio.
- `/quiero/` forma parte del cambio concurrente ya aprobado en producción `2dce6006`, pero aún no llegó a Hostinger debido al build fallido. Excluirlo perdería un cambio autorizado.
- El gate se corrigió en `11c1ca2a92174ac35602afdc254e214d508d56d3`: la raíz sintética mantiene 1.196 fuentes/3.588 URL e incluye `/quiero/`; el resultado obligatorio es ahora 2 fuentes y 6 páginas: `/`, `/pt/`, `/en/`, `/quiero/`, `/pt/quiero/`, `/en/quiero/`.
- El release sigue siendo incremental y preserva las otras 3.582 URL y el árbol FR privado.
- Gate real posterior: Hostinger debe mostrar `Build mode: incremental; rendering 6 of 3612 locale pages`; cualquier `full` invalida la publicación.


### QA remoto verde del candidato vigente

- El primer modelo sintético omitía los 24 documentos noindex del manifiesto real; el check los detectó y se mantuvo rojo, sin despliegue.
- Corrección durable: `d35623602f4b147b79dea53eee60c68a7c5f705b`.
- El fixture reproduce ahora exactamente 1.204 fuentes, 3.612 documentos y 3.588 URL indexables: 1.196 fuentes indexables y 8 noindex en ES/PT/EN.
- GitHub Actions confirmado para ese SHA: `Protect approved content` **success** y `Petrópolis preview QA` **success**.
- Resultado exigido y obtenido: 2 fuentes seleccionadas, 6/3.612 páginas renderizadas, 3.606 documentos preservados, 3.588 URL en sitemap, página EN profunda intacta, árbol FR privado intacto y aborto seguro si falta el manifiesto.
- El PR sustituto es #46 y está basado directamente en producción `2dce6006`. Falta únicamente revisión humana independiente; no se fusionó ni desplegó.


## Punto durable — 2026-11-26 — motor local de traducción y QA del lote FR

- Rama de trabajo verificada: `work/motor-traduccion-gratuito-20261126`. El HEAD GitHub confirmado antes de este apunte es `1308a4761c347864997dc946fe098a675a2edf38`, padre `84821e01e1f16cc45b3dacbb087c20c44a8c393a`; base de producción/manifest Hostinger `d917494286c5b1ebab90f0c1a82ffda2007049b7`.
- El commit del motor fija tres snapshots gratuitos con licencia comercial declarada: ES→EN y ES→FR Apache-2.0; EN→PT-BR CC BY 4.0 con atribución. El worker queda sin red durante inferencia, guarda salidas con `machine_unreviewed` y bloquea escrituras concurrentes de memoria. No se incluyó ni aprobó texto generado para HTML público.
- Pruebas del motor: 8/8 unitarias PASS; `py_compile` y `git diff --check` PASS. El guard editorial PASS con 586 archivos intactos y 10 activos críticos fijados; reporta 247 diferencias antiguas del manifiesto, sin tocar el snapshot.
- QA del árbol incremental: PASS sobre manifiesto real de `d9174942`: cambios FR únicamente seleccionan `/fr/hospedaje/`, `/fr/hospedaje/casa-candida/`, `/fr/hospedaje/nata/` y `/fr/hospedaje/venti/`; el build raíz debe renderizar 0 páginas ES/PT/EN, preservar el manifiesto de 3.612 rutas/3.588 indexables, el sitemap y los 5 archivos FR privados del fixture. La simulación sin manifiesto sigue dando SAFE ABORT antes de modificar `dist`. Esto es QA aislado, no un despliegue Hostinger.
- Inventario del piloto: 10 rutas prioritarias, 680 ocurrencias de texto estático, 586 textos únicos por SHA y 14 bloques de script dinámico pendientes de extracción. El diccionario FR existente coincide exactamente en 172/680 ocurrencias (25,3%); ese cotejo no equivale a traducción revisada. Pruebas de muestras del modelo revelaron traducciones EN/FR incorrectas; no producir HTML indexable ni contar esas salidas como aprobadas.
- Reutilización de traducciones aprobadas: `home.js` está fijado por hash en el guard y contiene 67 claves fuente ES con correspondencia PT/EN/FR (la tabla FR contiene además 30 claves sin fuente ES). Se agregó `scripts/seed_approved_home_memory.mjs`; importa solo las 67 claves alineadas, conserva colisiones humanas, reemplaza borradores automáticos con el valor protegido y usa escritura temporal exclusiva. Prueba de seeder PASS. Cobertura de esos textos protegidos en el piloto: 59/680 ocurrencias estáticas por idioma (8,7%); el 25,3% de matches del diccionario FR sigue sin estado de aprobación confirmado.
- No hay `torch` instalado ni pesos guardados en este entorno de ejecución, así que no se generó un nuevo lote de borradores aquí. Las muestras automáticas temporales de la ejecución anterior tuvieron defectos de idioma/sentido y no se conservaron como contenido.
- Hostinger mostró 154 archivos `index.html` en `/fr` (inventario anterior: 151). Las rutas Casa Candida, Nata y Venti aparecen en el listado del subdirectorio de hospedaje; el conector no pudo leer directamente `fr/hospedaje/venti/index.html` y el navegador público devolvió HTTP 404 dos veces para `https://www.ernestinhocarioca.com.br/fr/hospedagem/venti/`. No afirmar que esas fichas están publicadas/verificadas. Hostinger tiene un repositorio Git ligado específicamente a `/fr` y rama `release/fr-public-initial-20261115`; no se ejecutó despliegue porque aún no hay un plan verificado que explique el 404 y asegure que el checkout no anide ni sobrescriba archivos ajenos.
- Nuevas páginas públicas verificadas en esta ejecución: **0**. Nuevas páginas FR indexables: **0**. No se ejecutó build global ni se modificó la raíz de producción.
- Siguiente paso exacto: con el commit del QA actualizado, confirmar el checkout y las rutas efectivas de `/fr` en Hostinger; corregir la discrepancia de publicación/404 antes de otro intento de deploy. En paralelo, ejecutar el piloto de traducción de 10 rutas en inventario y memoria aislados, incorporar extracción explícita de textos dinámicos, y someter muestras completas EN/PT-BR/FR a revisión editorial antes de crear cualquier HTML público. No relanzar build raíz para cambios FR.

### Verificación adicional de staging — 2026-11-26

- La rama de motor ya tenía en GitHub el commit `fe7ab1311f043d530dd500a2aad6ca17ab678361` al iniciar esta verificación; ese commit incorpora el seeder de claves aprobadas de Inicio y la prueba del plan incremental FR-only.
- El staging informado para PR #67, `https://deeppink-quail-855227.hostingersite.com/fr-qa-pr67/`, responde HTTP 200, pero su landing raíz no es visualmente utilizable: tras una recarga, las cuatro hojas CSS referenciadas contienen 0 reglas cargadas, el logo de marca no carga y el documento mide 1.608 px de ancho frente a 1.363 px de viewport. Esta observación corresponde a la landing raíz, no a las seis fichas; el hilo de PR #67 conserva QA de escritorio separada para esas fichas. La prueba real a 390/1440 px sigue pendiente y PR #67 continúa en borrador, sin merge ni deploy.
- La visita pública previa de `/fr/hospedagem/venti/` sigue siendo HTTP 404; por ello la discrepancia `/fr` y la publicación de esas rutas no se consideran resueltas. No se ejecutó sincronización ni build.
- Para el piloto de 10 rutas, las claves protegidas del diccionario de Inicio cubren 59/680 ocurrencias estáticas por idioma (8,7%); 14 bloques de script dinámico siguen fuera de esa cobertura. No se generó HTML nuevo aprobado. La ejecución no añadió URLs públicas ni indexables.
- HEAD de código probado: `fe7ab1311f043d530dd500a2aad6ca17ab678361`; HEAD remoto de producción conocido: `d917494286c5b1ebab90f0c1a82ffda2007049b7`. Próxima acción: reparar/confirmar el path-base y la carga de assets del staging PR #67, ejecutar una prueba real a 390 y 1.440 px y validar contenido/rutas antes de considerar Hospedaje publicable. En paralelo, extraer los 14 bloques dinámicos del piloto sin tocar HTML aprobado.

### Revisión de rutas Hostinger — 2026-11-26

- El conector Hostinger ahora leyó `fr/hospedaje/venti/index.html` (12.148 bytes), aunque la comprobación HTTP pública anterior de `/fr/hospedaje/venti/` había devuelto 404. La presencia del archivo en el administrador de archivos no demuestra que el servidor lo entregue.
- Confirmado que la rama `release/fr-public-initial-20261115` está enlazada al directorio `fr`; el sitio principal tiene además su auto-despliegue Node.js en la raíz. No se ejecutó ninguno de esos despliegues. La lectura de `fr/.htaccess` indicó que no existe; el `.htaccess` raíz enumera redirecciones heredadas, ninguna para Venti.
- La lista raíz de Hostinger también muestra `dist`, pero el API no pudo enumerar `dist/fr/hospedaje` (respondió “Directory does not exist”). Por tanto, no se puede afirmar todavía si Venti está en el artefacto servido o si el Node.js resuelve rutas a otra ubicación. No cambiar `.htaccess`, `dist`, `/fr` ni `public_html` sin identificar esa correspondencia.
- Diagnóstico pendiente: comparar el deploy Git específico de `/fr`, el destino real del servidor Node y el archivo en `public_html/fr`. Luego volver a pedir HTTP para Venti. Solo un HTTP 200 de la ruta pública, junto a `noindex`, canonical, fotos y navegación verificados, permitiría contarla como servida; el lote PR #67 sigue sin viewport QA y sin publicación.
- Comprobación cruzada del 26/11: el mismo path `fr/hospedaje/venti/index.html` existe en el administrador Hostinger, pero GitHub responde 404 para ese archivo en la rama enlazada `release/fr-public-initial-20261115`. Esto confirma que el archivo de Hostinger no pertenece al HEAD versionado de esa rama (archivo huérfano o residual); no se debe tratar como contenido de release ni intentar restaurarlo mediante despliegue masivo. PR #67 sí contiene su nueva versión y seguirá sin promoción hasta terminar viewport QA.

### Continuación del motor y comparación Venti — 2026-11-26

- Se ejecutaron 8 pruebas unitarias de inventario/modelos: **8/8 pasan**. También pasan `node scripts/test_seed_approved_home_memory.mjs` y `node scripts/qa_hostinger_incremental_plan.mjs`: el fixture privado selecciona 4 rutas FR, renderiza 0 páginas ES/PT/EN, preserva 3.612 entradas de origen/3.588 indexables y aborta sin tocar `dist` cuando falta el manifiesto.
- `node scripts/guard_approved_content.mjs` pasa con 586 documentos y 10 activos críticos sin cambios; persiste advertencia histórica de 247 diferencias frente al manifiesto antiguo, no aprobadas por el snapshot provisional.
- Modelo local no ejecutable en este entorno: no están instalados `torch`, `transformers` ni `sentencepiece`; no se generó salida automática ni HTML candidato. La cobertura aprobada del piloto de 10 rutas sigue en 59/680 ocurrencias estáticas (8,7%) por PT/EN/FR, más 14 bloques inline dinámicos pendientes; no es porcentaje del sitio completo.
- Comparación de solo lectura: `fr/hospedaje/venti/index.html` en Hostinger (12.148 bytes) y `hospedaje/venti/index.html` en la cabeza de PR #67 (12.249 caracteres) **no son la misma página**. Coinciden en canonical Venti y `noindex,nofollow`, pero difieren en descripción visible, portada/imagen OG, datos sobre escaleras y CTA; PR #67 contiene un texto de consulta prellenado y bloque adicional, que no existen en la copia de Hostinger. No desplegar ni sincronizar a ciegas. La discrepancia requiere resolver qué contenido de propiedad debe quedar como fuente antes de considerar Venti listo.
- PR #67 sigue abierto, DRAFT, no mergeable, 6 archivos; la revisión visual real a 390/1440 px continúa pendiente. Este turno no publicó páginas nuevas ni cambió Hostinger.
- Siguiente paso exacto: reconciliar el contenido discrepante de Venti con la fuente factual del alojamiento; ejecutar QA responsive real de las seis fichas sin reutilizar el staging con CSS roto; mantener el noindex. En paralelo instalar los pesos solo si la descarga gratuita y las licencias verificadas están disponibles, luego generar una memoria fuera del árbol de publicación y revisar traducciones antes de compilar cualquier ruta.


### Seguimiento y QA — 27/11/2026 — piloto gratuito y Hospedaje

- Base productiva del repositorio confirmada en revision/rendimiento-traducciones-81a904c: d917494286c5b1ebab90f0c1a82ffda2007049b7. La rama FR conectada a Hostinger sigue siendo release/fr-public-initial-20261115, HEAD 714900b9419aa8244c97ef5f9e9483bb81fc77e5; no se desplegó en esta ejecución.
- El sitemap público se mantuvo en 3.588 URLs: 1.196 ES, 1.196 PT y 1.196 EN; no contiene URLs FR. Como matriz de disponibilidad de URL para cuatro idiomas, 3.588/4.784 = 75%. Esto no mide calidad ni completitud editorial. Hostinger enumera 154 index.html dentro de /fr (100 Gastronomía, 21 Guía, 14 Hospedaje, 12 Transportes, 6 Experiencias, 1 Inicio); el inventario no implica traducción completa ni indexabilidad.
- Hostinger confirma 14 fichas HTML en fr/hospedaje. Casa Cândida abre por HTTP en la raíz pública con canonical correcto y noindex,nofollow; /fr/hospedaje/venti/ también responde en el navegador usado. Sin embargo, los archivos del servidor no se encuentran en el HEAD de la rama Git enlazada, por lo que quedan registrados como discrepancia de origen y no como una publicación de PR #67. No sincronizar esa carpeta a ciegas.
- PR #67 sigue abierto en draft; 6 fichas: 3 rutas nuevas y 3 actualizaciones. QA de staging Hostinger en Casa Cândida: contenido FR, lang=fr, canonical FR, noindex,nofollow, enlace WhatsApp con campos de fechas/viajeros, imágenes y galería presentes; el botón de galería avanzó de foto 1/11 a 2/11 sin enviar mensajes. En ventana de 1.363 px, scrollWidth=1348 (sin desbordamiento horizontal). DevTools responde “DevTools not allowed on this page”; no existe control de viewport en el navegador remoto, así que QA real a 390 y 1.440 px sigue pendiente. No integrar ni desplegar el PR mientras falten esas medidas.
- El piloto de diez rutas encontró 681 ocurrencias de texto visibles, 605 cadenas únicas y 14 bloques inline aún sin extraer. Las salidas locales no aprobadas muestran errores de terminología (“Río”→“Ryo”) y traducción literal del lema; se mantienen fuera de HTML público. Una ejecución larga perdió el transporte antes de dejar una memoria durable, por lo que no se contabilizan salidas automáticas como progreso editorial.
- Modelos locales instalados sin coste adicional; licencias publicadas en sus model cards oficiales: OPUS ES→EN y ES→FR Apache-2.0; OPUS EN→PT CC-BY-4.0 (con atribución). Se añadió el token >>pob<< a la ruta PT-BR y pruebas específicas para que la inferencia no omita el idioma de destino. Salidas siguen machine_unreviewed.
- QA local: 10/10 pruebas Python de inventario/modelos; guard_approved_content pasa (586 archivos sin cambios y 10 activos críticos fijados; permanecen 247 diferencias históricas); plan de build incremental FR-only pasa y aborta si falta manifiesto; importador de memoria aprobada pasa; sintaxis Node y git diff --check pasan. No se ejecutó build de raíz ni se cambió Hostinger.
- PR #72 propone corregir un rótulo EN/PT de Inicio en assets/js/site.js, pero está en draft: guard editorial rechaza ese activo compartido fijado y el estado remoto Vercel falla. Revisiones registradas: 0. No se eludió el guard ni se fusionó.
- Publicaciones nuevas de esta ejecución: **0**. Preparado localmente: corrección/test del token de destino PT-BR y este checkpoint. No hay páginas FR indexables nuevas.
- Siguiente acción exacta: push seguro del checkpoint/model fix a la rama work/motor-traduccion-gratuito-20261126; después, revisar manualmente cadenas del piloto con prioridad Inicio/Guía antes de crear HTML. Resolver la discrepancia Hostinger/Git de Hospedaje, obtener viewport auténtico 390/1.440 por vía autorizada y cerrar QA antes de cualquier integración.
