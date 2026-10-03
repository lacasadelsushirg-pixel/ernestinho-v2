# Cierre de fase — 3 octubre 2026

## Estado acumulativo al terminar PASADA 2

- Repositorio: lacasadelsushirg-pixel/ernestinho-v2.
- Rama obligatoria: revision/rendimiento-traducciones-81a904c.
- HEAD inicial local y remoto confirmado: 65940539eb99a5a9e989163b20fcef7ab23657e3.
- Base de regresiones: a5a690374569610890e33afbf7c45c6b31945dc0.
- No rollback, restauración, cambio de rama, force-push, merge ni producción.
- No se encontró registro local ni remoto de PASADA 1 (consulta GitHub: 404). Se preservó el único cambio local heredado, nueve títulos Twitter de Barrios. No atribuir a PASADA 1 controles no documentados.
- Este commit consolida los cambios heredados y las correcciones de QA. El SHA del commit que contiene este registro se obtiene con git log -1 --format=%H -- docs/CIERRE_FASE_20261003.md; no confundirlo con el preview anterior.

## PASADA 1 — evidencia heredada verificada

metadata-02.js conservaba 393 entradas. Las nueve adiciones de Barrios elevaban el total a 402; comparación por clave/valor confirmó las 393 anteriores intactas. PT brasileño e inglés revisados; nombres propios conservados. No duplicados en ese archivo, sintaxis válida. Son adiciones de Twitter title para los nueve grupos indicados por el usuario.

No existe certificación global de traducciones/metadata de la primera pasada. Los inventarios por frases incluyen nombres propios y texto atendido por renderizadores con claves o datos embebidos: NO son una lista directa de errores ni un porcentaje de cobertura.

## PASADA 2 — controles ejecutados

| Control | Resultado | Alcance y evidencia |
|---|---|---|
| Auditoría estática | PASS | python scripts/audit_static.py: 596 HTML, 71.063 etiquetas inspeccionadas; cero errores. El número 71.063 NO es cantidad de enlaces únicos. |
| Enlaces/assets locales | PASS | La auditoría resuelve href/src y fragmentos internos; ningún archivo local ausente. No certifica todos los servidores externos. |
| JavaScript externo | PASS | 97 archivos, node --input-type=module --check. |
| Gastronomía embebida | PASS | node scripts/check_embedded_gastronomy.mjs: 170 scripts reales, DOM mínimo, cambios y retorno ES sin errores; no equivale a visual. |
| Diccionarios | PASS | node scripts/audit_translations.mjs carga 69 chunks y exige PT/EN no vacíos. |
| Registro e imports | PASS | 69 chunks registrados/existentes y 21 imports relativos estáticos resueltos. |
| Duplicados literales | PASS tras corrección | Exploración de claves de entrada con objeto PT/EN: cero duplicados tras eliminar 17 propiedades ocultas de Experiencias. 12.542 claves literales de entrada inspeccionadas; no son traducciones visibles únicas certificadas. |
| Tamaños funcionales | PASS | Mayor archivo transportes-01.js: 255.688 bytes, debajo de 256.000 (250 KiB). |
| Diff y whitespace | PASS | git diff --check; ningún HTML/CSS/imagen modificado en esta pasada. |
| Navegador local | LIMITACIÓN | Chromium falló nuevamente: descarga de ZIP vacía/truncada; no ejecutable instalado. agent-browser no está disponible. |
| Navegador remoto desktop | PASS del alcance probado | Nueve portadas; controles, navegación, textos, metadata y retorno ES comprobados en navegador real. |
| Visual móvil | PENDIENTE POR LIMITACIÓN TÉCNICA | La API remota disponible no expone cambio de viewport; no se simuló un móvil ni se declaró prueba inexistente. |
| Preview anterior | READY confirmado | Vercel API confirma target=null y SHA 65940539; navegador abrió el sitio. |

### Prueba real desktop

Preview probado: https://ernestinho-v2-k72zzxd82-lacasadelsushirg-8125.vercel.app/

Home, Guía, Experiencias, Gastronomía, Cultura, Vida Nocturna, Compras, Transportes y Hospedaje: ciclo ES→PT→EN→ES en controles reales. Lectura DOM de title, description, og:title, og:description y canonical en los cuatro estados: traducidos y restaurados. Canonicals siguen apuntando al dominio público aprobado. En Compras el renderizador usa lang=pt, válido; no es fallo de traducción brasileña.

Inspección de imágenes complete/currentSrc/naturalWidth: ninguna imagen cargada rota en esas nueve portadas; imágenes lazy no cargadas y fondos CSS no quedan certificados por esa comprobación. Capturas revisadas de las nueve portadas desktop. No equivalen a comparación pixel a pixel de 596 rutas ni a prueba móvil. Algunas capturas inmediatas reflejaron el idioma anterior durante carga; lectura posterior confirmó el estado seleccionado. Cultura PT quedó traducida al terminar la carga, no es un fallo persistente.

Gastronomía: búsqueda Palace devolvió cuatro tarjetas, incluyendo Palace/MEE/Pérgula/Cipriani; contenido regenerado, etiquetas y botones comprobados en PT/EN y retorno ES. No publicar como prueba de todos los filtros o fichas.

Consola consultada: los mensajes mostrados pertenecían a chrome-extension:// (extensión del navegador), no al código del sitio. No se atribuyeron al sitio ni se certificó ausencia global de errores en rutas no probadas.

### Problemas y correcciones concretas

1. Nueve títulos de Barrios heredados: preservados y validados, sin alterar 393 entradas previas.
2. Diecisiete propiedades duplicadas en experiencias-01.js: eliminadas únicamente las ocurrencias anteriores ocultas por JavaScript. Comparación de objetos ejecutados antes/después: mismas 815 claves y todos los valores efectivos PT/EN idénticos. El orden de propiedades cambia; el contenido visible no cambia.
3. Cinco frases de metadata sin diccionario añadidas en metadata-02.js (407 entradas finales):
   - Ernestinho Carioca — Río en tu mano (og:image:alt, 565 páginas).
   - Gastronomía de Río de Janeiro (og:image:alt).
   - Río en vivo | Ernestinho Carioca (OG/Twitter title).
   - Tiempo, viento, mar, mareas estimadas y cámaras para mirar Río ahora. (OG/Twitter description).
   - Ideas para elegir qué hacer hoy en Río según el tiempo, tu energía, el barrio y el momento del día. (OG description).

Son traducciones fieles en diccionario, sin cambiar HTML ni imágenes. La corrección del alt global fue demostrada por lectura de metadata PT del navegador: seguía en español en el preview anterior. Los nuevos valores se validaron localmente; falta comprobarlos en el preview del commit nuevo.

Conteo de incidencias nuevas comprobadas en QA: 17 propiedades duplicadas + 5 frases faltantes = 22 incidencias, corregidas. Además se consolidan las nueve traducciones previamente pendientes. No contar apariciones repetidas como errores únicos.

## Regresiones A/B — resultado con evidencia

A) El control check_frozen_pages.py falla por diferencias de hash en las 586 páginas. Se calculó SHA-256 del contenido de cada una en a5a690 y se comparó con docs/FROZEN_PAGES_20260930.json: las mismas 586 ya diferían; ninguna ausente. Excepción histórica autorizada por el usuario. NO se restauró contenido ni se regeneró el manifiesto.

B) Desde a5a690 hasta HEAD inicial: 63 archivos cambiados, 33 HTML protegidos con diferencias. No se deduce que todo cambio sea regresión. Las 28 fichas de Cultura tienen cambios exclusivamente de listas Python serializadas a texto legible: comprobación automatizada ast.literal_eval + unión conserva cada elemento y el resto del archivo byte por byte. Las otras cinco páginas corresponden a corrección de typo en lluvia, H1 semántico de Experiencias, alt de dos fotos de Rio Samba Bus, y runtime de idiomas en Eventos/404. No se observaron pérdidas de contenido.

Comprobación adicional desde a5a690: referencias img/iframe/video/source y bloques style idénticos en todos los HTML cambiados; ningún archivo CSS ni fotografía cambiado. El H1 de Experiencias incluye estilo inline, ya existente al iniciar esta pasada, y requiere considerar el resultado visual al revisar ese commit; esta pasada no lo alteró.

No se encontró una regresión nueva demostrada en el alcance probado. No convertir esta conclusión en certificación visual de todas las páginas. Los cambios de esta pasada se limitan a dos diccionarios y este registro.

HTML protegidos modificados desde a5a690:
- 404.html
- consejos/lluvia/index.html
- cultura/acude/index.html
- cultura/amanha/index.html
- cultura/arqueologia-itaipu/index.html
- cultura/benjamin-constant/index.html
- cultura/casa-deodoro/index.html
- cultura/chacara-ceu/index.html
- cultura/folclore-edison-carneiro/index.html
- cultura/ihgb/index.html
- cultura/maas/index.html
- cultura/mac-niteroi/index.html
- cultura/mam-rio/index.html
- cultura/mar/index.html
- cultura/mast/index.html
- cultura/mhn/index.html
- cultura/mnba/index.html
- cultura/muhcab/index.html
- cultura/musal/index.html
- cultura/museu-flamengo/index.html
- cultura/museu-historico-cidade/index.html
- cultura/museu-light/index.html
- cultura/museu-nacional-ufrj/index.html
- cultura/museu-pontal/index.html
- cultura/museu-republica/index.html
- cultura/museu-samba/index.html
- cultura/museu-vida-fiocruz/index.html
- cultura/naval/index.html
- cultura/povos-indigenas/index.html
- cultura/villa-lobos/index.html
- eventos/index.html
- experiencias/index.html
- experiencias/rio-samba-bus/index.html

## Continuación para PASADA 3 — no reiniciar

1. Medir rendimiento en Home/Gastronomía/Cultura/Experiencias/Guía; LCP/CLS/INP/TBT no medidos por esta pasada. No inventar métricas de laboratorio o campo.
2. Confirmar SHA remoto y preview del commit que contiene este registro. Verificar en ese preview las nueve adiciones Twitter de Barrios y las cinco frases de metadata; la eliminación de duplicados conserva el objeto efectivo y ya tiene prueba local.
3. Certificación global de metadata/traducciones sigue NO COMPLETA: revisar únicamente candidatos cuya gestión dinámica no se haya demostrado; no volver a traducir módulos ya cubiertos por diccionarios/renderer.
4. Si es posible disponer de viewport móvil, revisar las nueve portadas. Desktop ya probado: no repetirlo entero salvo cambios que lo afecten.
5. Mantener la excepción histórica A: el fallo de congelados no es un bloqueo nuevo. Cualquier B nueva se debe demostrar con diff/prueba; no reparar igualando hashes viejos.
6. Revalidar solo áreas afectadas por cambios posteriores y cerrar con estados reales. Arquitectura SEO multidioma, hreflang, keywords, producción y Search Console quedan fuera de esta fase.

## Archivos preparados en PASADA 2

- assets/js/translations/chunks/metadata-02.js: 14 adiciones PT/EN (9 heredadas + 5 comprobadas).
- assets/js/translations/chunks/experiencias-01.js: 17 propiedades ocultas duplicadas eliminadas, valores efectivos intactos.
- docs/CIERRE_FASE_20261003.md: registro acumulativo para continuación.


## Verificación posterior al commit de PASADA 2 — cierre local para PASADA 3

- Único commit publicado: bb61252afe8eccdeb7d9351263b4be34084a4ee6.
- HEAD remoto reconsultado antes de actualizar: 65940539. Actualización fast-forward por API, force=false. El push CLI carecía de credenciales; se publicó por conector GitHub. El commit local no publicado 1345ff50 fue sustituido en la referencia local por el commit API con árbol idéntico comprobado; NO se restauró ni alteró contenido.
- Vercel: dpl_FoEBMqhEC6xec9ufpd2Curcc2yBo, READY, target=null, githubCommitSha=bb61252afe8eccdeb7d9351263b4be34084a4ee6.
- Preview final: https://ernestinho-v2-gdrxkp757-lacasadelsushirg-8125.vercel.app/
- El navegador solicitó autenticación en el preview nuevo. El conector Vercel generó un acceso temporal de 23 horas, sin cambiar configuración del proyecto. Se abrió correctamente; no guardar el token de acceso en git.
- Verificación DOM del preview nuevo: los nueve Twitter titles de Barrios pasan PT→EN→ES, incluidos Zona Norte, Centro/Praça Mauá, Flamengo/Glória, Copacabana, Botafogo/Urca, Barra/Zona Oeste, Gávea/Jardim Botânico/Lagoa, Santa Teresa/Lapa e Ipanema/Leblon.
- og:image:alt global pasa PT→EN→ES en las nueve rutas, conservando ES original.
- Río en vivo: OG title/description pasan PT→EN→ES con las nuevas entradas.
- Hoy: OG description pasa PT→EN→ES con la nueva entrada.
- Gastronomía: og:image:alt pasa PT→EN→ES con la nueva entrada.
- Ningún pendiente de verificar las 14 frases incorporadas permanece abierto; NO repetir estas pruebas en PASADA 3 si no cambian los archivos.
- Rutas únicas comprobadas en navegador durante la pasada: 20 (9 portadas originales + 9 grupos de Barrios + Hoy + Río en vivo; Gastronomía nueva ya estaba entre las 9).
- Las correcciones publicadas están en GitHub y preview READY. Este apartado posterior al commit queda localmente pendiente de incluir en el commit final consolidado de PASADA 3 para evitar un commit pequeño solo de informe. Preservarlo; no descartarlo.
- Pendientes reales de alcance: rendimiento no medido; visual móvil sin herramienta de viewport; certificación de cobertura global de traducciones/metadata no demostrada por la muestra de navegador y los inventarios. No existe una frase concreta faltante conocida pendiente tras estas correcciones, pero NO certificar cobertura global solo por esa ausencia.

## PASADA 3 — certificación y rendimiento

### Estado obligatorio

| Estado | Resultado | Fundamento |
|---|---|---|
| TRADUCCIONES | **NO COMPLETAS** | Los 69 diccionarios tienen PT/EN no vacíos y los módulos ya probados pasan, pero el inventario conservador todavía contiene texto gestionado por renderizadores, datos embebidos, nombres propios y posibles frases visibles; no existe prueba exhaustiva de las 596 rutas en tres idiomas. No queda una frase concreta conocida sin corregir. |
| METADATA | **NO COMPLETA** | Las 14 entradas incorporadas en PASADA 2 están verificadas en el preview y las 596 páginas pasan estructura/canonical; no se hizo ciclo ES/PT/EN de metadata en las 596 rutas. |
| REGRESIONES NUEVAS | **NO** | No se demostró ninguna regresión B desde a5a690. El fallo de las 586 páginas congeladas sigue siendo la excepción histórica A ya demostrada en PASADA 2. |
| ESTÁTICA | **PASS** | 596 HTML, 71.063 etiquetas, enlaces/assets/fragmentos locales, metadata estructural e imágenes con alt: cero errores. |
| JS | **PASS** | 97 archivos con sintaxis válida; 69 chunks cargables con PT/EN; 170 scripts gastronómicos en DOM simulado; imports relativos sin destino ausente. La evidencia de cero duplicados sigue vigente porque ningún diccionario cambió desde bb61252. |
| VISUAL | **PARCIAL POR LIMITACIÓN TÉCNICA** | Desktop real acumulado: 20 rutas, incluidas nueve portadas ES/PT/EN. En PASADA 3 las cinco rutas prioritarias volvieron a cargar sin imagen cargada rota. No hubo viewport móvil ni comparación visual exhaustiva. |
| PREVIEW | **READY** | El preview de bb61252 estaba READY al medir; actualizar este apartado con el SHA/URL final tras publicar el registro. |
| RENDIMIENTO | **PARCIAL** | Peso, estructura de carga, imágenes y lazy loading medidos. LCP/CLS/INP/TBT no medidos: el navegador remoto no expone Performance API y no hay Chromium local. No se presentan estimaciones como métricas. |

### Rendimiento medible de las cinco rutas prioritarias

Muestra en navegador desktop remoto, preview bb61252. Los recuentos DOM son posteriores a la carga del runtime y pueden superar el HTML fuente. `Pendientes` son imágenes lazy fuera del viewport, no errores. Ningún script externo clásico bloqueante; los scripts del sitio son módulos.

| Ruta | HTML fuente | CSS+JS locales referidos por HTML | DOM | Imágenes DOM | Lazy | Pendientes | Imágenes cargadas rotas | Scripts bloqueantes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Home | 13.474 B | 52.652 B | 315 | 29 | 26 | 20 | 0 | 0 |
| Gastronomía | 232.061 B | 37.442 B | 2.598 | 186 | 184 | 173 | 0 | 0 |
| Cultura | 6.506 B | 40.470 B | 151 | 8 | 6 | 0 | 0 | 0 |
| Experiencias | 15.327 B | 37.442 B | 312 | 2 | 0 | 0 | 0 | 0 |
| Guía | 11.149 B | 37.442 B | 209 | 24 | 22 | 6 | 0 | 0 |

Las imágenes externas usan proveedores y tamaños transformados; sus bytes de red no se pueden inferir de los archivos locales. Home declara `fetchpriority=high` en la imagen hero y 26 imágenes lazy después del render. Gastronomía conserva 184 imágenes lazy, pero su HTML inicial de 232.061 bytes está cerca del límite funcional de 250 KiB. Es un foco de medición futura, no una regresión demostrada ni autorización para reestructurar una página congelada por puntuación.

No se aplicó una optimización de código: no apareció una carga rota, un script bloqueante o una descarga local innecesaria cuya corrección fuera segura sin cambiar páginas/diseño. LCP, CLS y TBT requieren un navegador con temporización; INP requiere interacción representativa o datos de campo. Quedan expresamente sin valor numérico.

### Revalidación final ejecutada

- `python3 scripts/audit_static.py`: PASS, 596 HTML, 71.063 etiquetas, cero errores.
- `node scripts/check_embedded_gastronomy.mjs`: PASS, 170 scripts, cero errores.
- `node scripts/audit_translations.mjs`: PASS técnico, 69 diccionarios con PT/EN válidos; su lista de candidatos no es porcentaje ni prueba de faltantes.
- Sintaxis ECMAScript por stdin en Node: PASS, 97/97.
- Imports: 19 imports relativos estáticos y dos cargas dinámicas de chunks, todos con destino válido según auditoría; total funcional conservado: 21.
- `git diff --check`: PASS.
- `python3 scripts/check_frozen_pages.py`: FAIL esperado en 586/586; clasificación A histórica, no bloqueo B. No se regeneró el manifiesto ni se restauraron páginas.
- Desde el commit bb61252 solo cambió este informe; por eso se reutilizan, sin repetir, las pruebas vigentes de duplicados, diccionarios, metadata, títulos Twitter y ciclos ES/PT/EN.

### Cambios y pendientes para la siguiente pasada

Esta pasada no modificó HTML, CSS, imágenes, JavaScript ni contenido visible; solo consolida evidencia en este documento. No se encontró un error técnico nuevo que habilitara una corrección segura.

Pendientes específicos, sin reiniciar auditorías aprobadas:

1. Obtener navegador con viewport móvil y Performance API/Lighthouse para LCP/CLS/TBT; obtener INP únicamente de interacción válida o datos de campo.
2. Si se decide optimizar Gastronomía, medir primero su impacto real y preservar contenido/fotos; no modificarla solo por estar cerca de 250 KiB.
3. Para elevar TRADUCCIONES/METADATA a COMPLETAS, construir evidencia exhaustiva por ruta/renderizador; no tratar automáticamente el inventario conservador como errores.
4. Mantener separadas las 586 diferencias históricas A de cualquier cambio B posterior a a5a690.

El SHA, commit y preview definitivos de PASADA 3 se añaden después de la publicación controlada de este único archivo.

## PASADA 4 — resolución exclusiva de pendientes reales

No se reabrieron módulos ni auditorías con PASS. No apareció ningún FAIL nuevo, traducción o metadata concreta faltante, regresión B, error JavaScript, enlace/asset roto, defecto visual demostrado u optimización técnica segura pendiente de aplicar.

### Integridad comprobada

- Rama local: `revision/rendimiento-traducciones-81a904c`.
- HEAD local y remoto: `9cc7bf1ef2ced425c38a7d6e77ad80de1c538551`.
- Commits esperados presentes: `bb61252` y `9cc7bf1`, ambos posteriores a `65940539`.
- Working tree al iniciar esta comprobación: limpio.
- Último commit: solo `docs/CIERRE_FASE_20261003.md`; cero HTML, CSS o imágenes modificados por PASADA 3.
- Los 33 HTML que difieren desde `a5a690` son el conjunto ya analizado en PASADA 2; esta pasada no añadió ninguno.
- Preview exacto del HEAD: deployment `dpl_J21LFsbugrwadXH9s7Km3cLiPS36`, estado `READY`, `target=null`, SHA GitHub coincidente.
- URL: https://ernestinho-v2-mx2pjmn71-lacasadelsushirg-8125.vercel.app/
- Lectura autenticada del preview: HTTP 200 y título esperado de Home.
- No se hizo rollback, restauración, force-push, merge, cambio de rama ni producción.

### Pendientes comprobados para PASADA 5

1. **Limitación de certificación, no fallo concreto:** prueba visual móvil no disponible.
2. **Limitación de medición, no fallo concreto:** LCP/CLS/TBT sin navegador con Performance API; INP sin datos de campo/interacción representativa.
3. **Cobertura formal:** TRADUCCIONES y METADATA permanecen `NO COMPLETAS` porque no existe evidencia exhaustiva trilingüe de las 596 rutas, aunque no queda una frase concreta conocida sin corregir.
4. **Histórico no bloqueante:** las 586 diferencias del manifiesto congelado continúan como excepción A anterior a `a5a690`; regresiones nuevas B: ninguna demostrada.

No se modificó el sitio ni se generó un commit pequeño solo para esta comprobación. Este apartado queda como único cambio local intencional para que PASADA 5 lo integre con su cierre definitivo, después de verificar que no apareció otro escritor remoto.

## PASADA FINAL — fase congelada

Se continuó desde 9cc7bf1, sin reiniciar controles aprobados. Las 586 diferencias históricas A quedaron cerradas y no se volvieron a comparar ni se ejecutó su auditor antiguo, conforme a la instrucción expresa más reciente. No se restauraron archivos, cambió rama, hizo merge ni publicó producción.

### Evidencia exhaustiva nueva

Chrome Headless Shell oficial 145 pudo descargarse y ejecutarse. `scripts/certify_routes.mjs` recorrió los 596 HTML en cuatro contextos Chromium independientes, cargó los módulos reales y ejecutó ES→PT→EN→ES. Las solicitudes externas se excluyeron para aislar el código; las excepciones causadas por servicios/CDN excluidos se identifican como limitaciones, nunca como errores del sitio. El universo incluye 404 y el alias con redirección de Guía: no se afirma que sean 596 URL indexables independientes.

- 596/596 ciclos completos.
- 596/596 restauraciones de metadata PASS.
- 596/596 restauraciones de texto PASS después de las correcciones puntuales.
- Title, description, canonical, OG title/description/image y lang registrados por ruta y por idioma; 404 no necesita canonical.
- Los diccionarios se importan realmente. Se inspeccionan las claves declaradas y se resuelven las que pertenecen al registro compartido en ES/PT/EN; Café tiene un registro inline propio y se clasifica separadamente.
- Matriz legible: `docs/COBERTURA_596_20261003.csv`. Evidencia completa con snapshots por idioma, recursos y candidatos: `docs/COBERTURA_596_20261003.json.gz`.
- Clasificación integral conservadora: 2 PASS, 0 ERROR REAL y 594 LIMITACIÓN DE ARQUITECTURA/PRUEBA. Esto no representa 594 fallos: nombres propios, contenido externo, claves inline y frases sin cambios no permiten inferir exhaustividad semántica. La ejecución técnica sí cubre las 596 rutas. No presentar 596 ciclos como certificación lingüística humana de cada oración.

### Correcciones concretas comprobadas

1. 325 entradas PT/EN de metadata: descripciones de Gastronomía, títulos sociales con «guía completa» y metadata de Hospedaje. No se sustituyeron las 407 entradas anteriores de metadata-02.
2. 68 frases visibles PT/EN: Compras 6, Gastronomía 44, Hospedaje 18. Ninguna permanece en los candidatos invariables después de la corrección. Se preserva el español y los datos aprobados.
3. Dos fallos de restauración en Polis Sucos y Satyricon: el renderer conservaba el idioma previo para párrafos fuera de su tabla. Ahora usa su original guardado. Un fallo de restauración en el mensaje de error de Airalo: se especifican sus textos ES/PT al volver del inglés.

Total: 393 pares de traducción incorporados (786 valores PT/EN), más tres fallos de restauración corregidos. Son 396 incidencias corregidas, con repeticiones por ruta contadas una sola vez. Los avisos iniciales por diferencias entre variantes válidas de diccionario y renderer fueron falsos positivos del auditor y no se cuentan como fallos de la web.

Gastronomía se añadió en `gastronomia-02.js` y se registró en site.js para mantener cada JS por debajo de 250 KiB; gastronomia-01 queda intacto. Los únicos cambios en tres HTML son JavaScript inline para estos fallos nuevos demostrados. Comparación contra el HEAD inmediato: el resto del HTML de las tres páginas es idéntico, incluidas fotos, estilos, estructura y contenido fuente. No es una intervención sobre diferencias históricas.

### Móvil y rendimiento

Móvil real Chromium a 390×844, touch/isMobile activados, nueve portadas: Home, Guía, Experiencias, Gastronomía, Cultura, Vida Nocturna, Compras, Transportes y Hospedaje. Controles reales ES/PT/EN/ES; header, botones, navegación declarada, texto, imágenes cargadas y ancho del documento: PASS; cero overflow, cero imágenes cargadas rotas, nueve restauraciones PASS. Capturas revisadas. El código servido es el estado local exacto, las imágenes y recursos externos se obtuvieron por curl con validación TLS; no es una prueba del transporte de Vercel ni de todas las imágenes lazy fuera del viewport. `docs/QA_MOVIL_20261003.json` contiene los resultados.

Desktop anterior: PASS de sus 20 rutas, vigente; ejecución Chromium nueva agrega ciclos técnicos de 596 rutas, no comparación visual de 596 páginas.

Lighthouse 13 también se instaló y se intentó contra el preview READY. Chrome directo recibió ERR_EMPTY_RESPONSE; con el proxy documentado del entorno recibió ERR_CERT_AUTHORITY_INVALID. Lighthouse produjo runtimeError por ese certificado. No se desactivó la verificación TLS. LCP, CLS, TBT e INP quedan **NO MEDIDOS POR LIMITACIÓN DEL ENTORNO**, sin atribuir puntuaciones bajas al sitio ni modificarlo por una métrica inexistente. No se usan tiempos del servidor local como métricas del preview.

### Validación afectada y cierre

- Diccionarios: 70 chunks válidos, PT/EN no vacíos. Entradas anteriores conservadas; sin nuevas claves duplicadas.
- Sintaxis de los seis JS/MJS añadidos o modificados y scripts inline de las tres páginas: PASS. Se conserva el PASS previo de los 97 JS originales; ahora hay 98 JS del sitio por el nuevo chunk, más el auditor MJS.
- Gastronomía: sus 170 renderizadores simulados PASS; repetición justificada por los dos scripts corregidos.
- Estática: 596 HTML, cero errores; repetición justificada por cambios posteriores en tres HTML y nuevos assets.
- Regresiones nuevas introducidas en esta pasada: 0 comprobadas. Sin CSS, fotografías o estructura modificados. El estado anterior de regresiones no se reabrió.
- Diff/whitespace: PASS. Cada JS del sitio permanece por debajo de 256.000 bytes.

**RUTAS:** 596/596 verificadas técnicamente; certificación semántica integral limitada según matriz.

**TRADUCCIONES:** LIMITACIÓN DE CERTIFICACIÓN; cero faltantes concretos conocidos después de corregir los hallados. **METADATA:** COMPLETA en campos técnicos ES/PT/EN comprobados, con nombres propios y 404/alias tratados según su función; no incluye arquitectura SEO multidioma ni metadatos de servicios externos.

**BLOQUEANTES REALES CONOCIDOS PARA PRODUCCIÓN:** NINGUNO. Las limitaciones de cobertura semántica, transporte del entorno y métricas sin medición no se convierten en errores. Esta conclusión no autoriza producción.

Esta fase queda congelada. No se abre otra auditoría general ni se ejecutan SEO multidioma, hreflang, keywords, producción, Search Console, indexación o publicidad. El SHA final es el del único commit que contiene este apartado; su preview debe comprobarse READY antes del informe de entrega.
