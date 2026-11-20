# Continuidad operativa — Ernestinho Carioca FR / ES / PT-BR / EN
Fecha: 2026-11-17 (Brasil, America/Sao_Paulo)
Responsable de este lote: sesión de ChatGPT (sin Work)
Estado histórico de primera tanda: SEIS FICHAS FR nuevas. Ampliación posterior: QUINCE PÁGINAS FR adicionales (total 34 HTML FR, 19 fichas Guía, 11 fichas Transporte, portadas Inicio/Guía/Transporte/Hospedaje). SIN BUILD GENERAL; FR NOINDEX.

## Regla inamovible
- Fuente durable: GitHub `lacasadelsushirg-pixel/ernestinho-v2`. Hosting exclusivo: Hostinger.
- No usar ni mencionar despliegues de otro proveedor. NO ejecutar compilación total de ~3.612 páginas; el último build masivo falló y la corrección incremental sigue en PR #45.
- No alterar archivos aprobados ES, fotografías, sus rutas ni el manifiesto/sitemap existente. Nunca asumir que un commit equivale a publicación. Publicar por carpetas/archivos con copia de seguridad y prueba posterior.
- El francés permanece `noindex,nofollow` y fuera del sitemap hasta QA completo de toda la localización; las páginas son visibles mediante URL directa para prueba.

## Ramas y realidad de producción al iniciar
- Producción Git: `revision/rendimiento-traducciones-81a904c`, HEAD `d9ae3339e63cfed8873cc36a0a48712ddcee165d` (confirmado al iniciar).
- PR #45 `fix/hostinger-incremental-failsafe-20261116`: abierto, fusionable y pendiente de revisión humana independiente. No simular ni eludir la revisión. El modo correcto debe mostrar exactamente `Build mode: incremental; rendering 3 of 3612` y conservar 3.588 URLs indexables.
- Hostinger publica el sitio principal en `/home/u319776719/domains/ernestinhocarioca.com.br/public_html`.
- Carpeta francesa separada `/fr`: Git de la rama `release/fr-public-initial-20261115`, ruta configurada en Hostinger. NO hay que usar `hosting_deploy` ni sobrescribir toda la raíz.
- PR histórico #25 `traduccion/guia-fr-paralelo-20261110` contiene diccionarios FR para Guía; fuente reutilizable previa verificación contra la ficha española actual.

## Seis fichas nuevas completadas en esta sesión y sincronizadas a Hostinger
Rama de trabajo y despliegue: `release/fr-public-initial-20261115`.
1. `/fr/guia/accesibilidad/` — `guia/accesibilidad/index.html`: traducción editorial completa desde la ficha ES aprobada. Fotos intactas, sin links internos rotos intencionales.
2. `/fr/guia/documentos/` — `guia/documentos/index.html`: documentos, visados, migración, aduana y preguntas frecuentes; contenido español preservado sin modificaciones.
3. `/fr/guia/seguro/` — `guia/seguro/index.html`: seguro de viaje, SUS, UPA, asistencia y afiliación Assist Card conservada; traducción del diccionario histórico FR.
4. `/fr/guia/cpf/` — `guia/cpf/index.html`: CPF para viajeros, con links oficiales conservados; link a Pix sigue en español, señalado expresamente como tal hasta traducirlo.
5. `/fr/guia/terminales/` — `guia/terminales/index.html`: rodoviária y terminal de cruceros; mensaje WhatsApp prellenado pasado a francés.
6. `/fr/guia/alquiler-auto/` — `guia/alquiler-auto/index.html`: alquiler de auto, enlaces de Rentcars y widget FR conservados; se corrigió selección de idioma para usar francés en esta página sin depender de localStorage antiguo.

Además:
- `guia/index.html`: tarjetas Documentos, Accesibilidad, Seguro, CPF, Terminales y Alquiler ahora apuntan a sus rutas FR. «Comment se déplacer» apunta a `/fr/transportes/` en vez de una redirección española.
- `guia/accesibilidad/index.html`: enlace al Seguro ahora abre ficha FR sin aviso español.
- `transportes/index.html`: enlace al alquiler de autos ahora abre ficha FR.
- `index.html`: se localizaron al francés dos etiquetas ARIA de Inicio que seguían en español.
- Correcciones anteriores de esta conversación ya estaban en la rama y fueron verificadas/sincronizadas: mensajes WhatsApp FR de Aeropuertos, Internet y Viajar solo; ALT/OG de tarjetas y enlaces al Inicio FR, con noindex.
- Se normalizó el JSON-LD de las fichas FR nuevas: `inLanguage: fr`, name/description franceses y URL de cada página FR (corrección posterior a la primera importación de las cuatro fichas iniciales).

## Garantías verificadas
- GitHub: revisión estática de 9 páginas (Inicio, Guía, Transportes y 6 fichas nuevas); todas pasaron `lang=fr`, `robots/googlebot noindex,nofollow`, canonical FR y `hreflang=fr`; sus datos estructurados se comprobaron contra la canonical.
- Se compararon `<img src>` de cada ficha nueva con su fuente ES: rutas de fotografía conservadas sin sustitución.
- Los diccionarios usados (PR #25) cubrían las cadenas visibles del origen para las páginas aplicables; sin cadenas españolas sin traducir detectadas en la revisión estática.
- Hostinger: el `hosting_git_deploy-website-repository` apuntando EXCLUSIVAMENTE a `directory=fr` devolvió `is_success=true` y árbol de trabajo Git limpio.
- Se releyeron los nueve archivos en Hostinger después de sincronizar: existen y se confirmaron idioma, noindex, canonical, datos estructurados y seis enlaces de Guía.
- No se ejecutó `npm run build`, ni `hosting_deploy`, ni se editó `public_html` fuera de la carpeta francesa.
- La comprobación HTTP con navegador externo no estuvo disponible desde esta sesión; NO anunciar QA visual/HTTP completo.

## Próxima sesión (Work puede revisar desde el viernes 2026-11-20)
1. Comparar HEAD remoto FR con archivos reales de Hostinger y esta nota; no empezar de cero ni volver a traducir las seis páginas.
2. Capturar QA visual 390 px y 1440 px de Inicio, Guía, Transportes y nuevas fichas, con imágenes, enlaces, menús, mapas, widget Rentcars y WhatsApp.
3. Revisar las 5 fotografías de Inicio reportadas como faltantes, sin mover ni reemplazar recursos aprobados.
4. Secciones dinámicas de Guía aún pendientes: `/guia/pix/`, `/guia/donde-alojarse/`, `/guia/mes-a-mes/`. Sus HTML incluyen JSON de datos e JS y NO deben darse por traducidos aplicando solo el diccionario a textos estáticos. Los diccionarios previos están en PR #25.
5. Portada PT/EN: 97 claves y 15 mejoras editoriales por idioma están en Git producción, pero los cambios nuevos siguen sin publicarse por build masivo fallido. NO repetirlo. Resolver únicamente mediante revisión humana independiente de PR #45 y build incremental validado de 3 páginas; confirmar HTTP después.
6. Orden prioritario del propietario: INICIO completo ES/PT/EN/FR; GUÍA DE RÍO; TRANSPORTES; HOSPEDAJE; resto. Francés pasa a indexación solo después de QA final y autorización editorial; conservar los 3.588 URL existentes.

## Commits orientativos de esta sesión
- Primera ficha nueva Accesibilidad: `18d6b51df66ed028b2b7e23caf19fad88b030408`.
- Documentos: `4528b7451ed174c1d54d0d4438a078818536186b`.
- Seguro: `10df38694c05af080d46d7369794fd83f82b4040`.
- CPF: `2c57f6aec6ab526a5a672e118bbf45d38abd6bc0`.
- Terminales: `65c67884327f4955e0da3ab375327850eca4f619`.
- Alquiler auto: `82b73bfcdd20ecf1edc5a9acc4004e5f8430b3ef`.
- Último commit de enlace Transportes->Alquiler de auto: `a08efe36d6fe9a5d026ec12a890f01900fb5f00f`.
Verificar SHA actual de la rama antes de nuevos cambios; esta nota genera un commit posterior.

---

## Ampliación posterior del 17/11/2026 — 15 páginas nuevas en /fr, comprobadas en Hostinger

### Guía de Río — tres páginas dinámicas completas

1. `guia/pix/index.html` → `/fr/guia/pix/`: datos `pix-data` enriquecidos con cinco ramas francesas (pasos, bloques, alerta, advertencias, interfaz). 43 textos ES→FR traducidos dentro del JSON dinámico, no solo HTML. JS de la ruta fijado a FR, sin fallback de ES; original ES/PT/EN preservado. Corregida solo en FR una etiqueta de fotografía malformada del original. Se conserva la foto y el URL.
2. `guia/donde-alojarse/index.html` → `/fr/guia/donde-alojarse/`: 20 grupos dinámicos FR (descripción de barrios, fotos ALT, recomendaciones, intro, interfaz) y 36 textos de datos. Se conserva cada URL fotográfica; URL de apartamentos desde esta guía hacia la portada FR `/fr/hospedaje/`.
3. `guia/mes-a-mes/index.html` → `/fr/guia/mes-a-mes/`: 12 meses íntegros, 6 planes por lluvia, 5 consejos para el calor, 4 ramas FR de `month-data` y traducción de etiquetas JS. 168 valores ES traducidos con los tres diccionarios ya existentes en el PR #25. Se confirmó que ES/PT/EN en el JSON no cambiaron. El JS de esta ruta se fija a FR, sin dependencias de preferencia antigua del navegador.

Todas llevan canonical propio, `inLanguage=fr`, `hreflang=fr` y `noindex,nofollow`; se verificó el archivo real de Hostinger tras el Git pull.

### Transportes Río — once fichas nuevas

- `/fr/transportes/metro/`
- `/fr/transportes/brt/`
- `/fr/transportes/vlt/`
- `/fr/transportes/barcas/`
- `/fr/transportes/trenes/`
- `/fr/transportes/uber/`
- `/fr/transportes/onibus/`
- `/fr/transportes/bicicletas/`
- `/fr/transportes/alquiler-vehiculo/`
- `/fr/transportes/bonde-santa-teresa/`
- `/fr/transportes/terminal-gentileza/`

Origen: las páginas ES actuales de `revision/rendimiento-traducciones-81a904c`; traducciones del PR #27, rama `traduccion/transportes-fr-paralelo-20261111`. Cobertura estática de 100% de cadenas visibles según revisión por nodos. Rutas de todas las imágenes originales preservadas (5, 3, 8 fotografías, etc. según ficha). Todas pasaron QA estático de idioma, canonical, robots y JSON-LD; Hostinger confirmó presencia y protección en las once. La portada `/fr/transportes/` enlaza diez fichas que ya tenían tarjetas; `alquiler-vehiculo` existe pero no tenía tarjeta propia en esa portada de origen.

**NO traducir ni publicar como vigente la ficha de transporte privado sin control comercial.** El diccionario `transportes-privado-interacciones-paralelo.json` contiene la advertencia explícita de que las tarifas anunciadas caducaron el **31/10/2026**. La fuente posee cuatro scripts interactivos que solo admiten ES/PT/EN; además faltan los dos banners propios en francés. Quedó intencionalmente sin ruta FR para evitar mostrar tarifas vencidas como actuales o romper cotizaciones WhatsApp.

### Hospedaje — portada nueva en francés

- `hospedaje/index.html` → `/fr/hospedaje/`, traducida editorialmente desde ES, sin alterar el original.
- 12 tarjetas HTML originales conservadas, más la ficha `Casa Cândida` que el `hospedaje.js` inyectaba dinámicamente. El dato de Casa Cândida procede de `assets/js/data/lodging.js`: hasta 10 personas, dos plantas, cocina equipada, Wi-Fi y dos baños. Su URL de foto original se conserva.
- La portada FR no carga el `hospedaje.js` trilingüe, para evitar que vuelva a sobrescribir el francés con ES. Sigue el estilo base de Hospedaje y conserva fondos fotográficos y tarjetas.
- **Fichas individuales aún NO traducidas al francés:** los 13 enlaces de apartamentos remiten expresamente a su ficha española y llevan CTA `VOIR LE LOGEMENT (en espagnol)`. No inventar que son fichas FR completas.
- La portada se verificó como archivo real en Hostinger: 13 tarjetas, canonical y JSON-LD FR, noindex correcto.

### Navegación actualizada en francés

- Inicio, Guía, Transportes y `guia/donde-alojarse` ahora llevan a `/fr/hospedaje/`.
- Se corrigieron también los enlaces de Hospedaje en las fichas francesas de Guía y Transportes que aún enviaban a ES.
- Las tarjetas de `/fr/guia/` ahora enlazan directamente a Pix, Dónde alojarse y Río mes a mes en francés.
- Última validación detectó y corrigió rutas de Hospedaje en Pix y Mes a mes; se volvió a sincronizar `/fr` en Hostinger por Git, árbol de trabajo limpio.

### Conteo exacto en la rama FR tras esta tanda

- `/fr/`: una portada.
- `/fr/guia/`: una portada + 19 fichas = 20 archivos HTML de página.
- `/fr/transportes/`: una portada + 11 fichas = 12 archivos HTML de página.
- `/fr/hospedaje/`: una portada = 1 archivo HTML de página.
- **Total = 34 páginas francesas** preparadas en GitHub; el recuento proviene de directorios del repositorio. No significa que 34 hayan pasado QA visual en navegador ni que sean indexables. El francés sigue `noindex`.

### Pendientes concretos — para ChatGPT o Work desde el viernes 20/11/2026

1. QA con navegador a 390 px y 1440 px: menús, fotografías, enlaces, contenido dinámico de Pix/mes a mes/dónde alojarse, galería de apartamentos, enlace de reservas, contraste y accesibilidad; verificar HTTP público, no solo contenido de archivo servido.
2. Guía `guarda-equipaje`: el HTML original es un cascarón; `/assets/js/luggage-page.js` y sus imports construyen contenido ES/PT/EN y Bounce (sin FR). Debe hacerse renderer francés completo sin romper afiliación, 3 fotos ni navegación; NO publicar traducción estática engañosa.
3. Transportes `transporte-privado`: conciliar tarifas vencidas, formulario, opciones de `value` estables, mensajes WhatsApp, dos banners FR ausentes y las exclusiones vigentes. NO publicar tarifas expiradas.
4. Hospedaje: traducir fichas individuales empezando por AP 805, 605, 1008 y 54, conservando galerías y datos vigentes; los destinos individuales siguen explícitamente identificados como españoles.
5. Inicio FR: revisar las cinco imágenes supuestamente faltantes; no mover fotos aprobadas ni sustituir imágenes sin autorización.
6. Portugués e inglés: mejoras guardadas en producción GitHub pero no visibles; el PR #45 del compilador incremental continúa pendiente de revisión humana independiente. No reconstruir la web completa. Verificar 3.588 URL indexables y ausencia de regresiones antes de desplegar.
7. No indexar FR hasta resolver integridad editorial, menús, fotos, canonical/hreflang recíproco y QA móvil/escritorio.

---

## Continuación 20/11/2026 — Guarda equipaje FR

- Fuente reconciliada: página ES actual y las 66 entradas FR del PR #25.
- Nueva ruta preparada: `/fr/guia/guarda-equipaje/` (`guia/guarda-equipaje/index.html`).
- Cobertura: 12 bloques editoriales, 6 preguntas frecuentes, flujo de 5 pasos, canonical y hreflang ES/PT/EN/FR.
- SEO: `noindex,nofollow`; no se añadió al sitemap.
- Afiliación Bounce conservada mediante enlace funcional y disclosure FR. Los tres banners disponibles contienen texto ES/PT/EN y no existe versión FR aprobada; se omitieron del cuerpo para no mostrar español como francés ni inventar imágenes.
- `fr-home.js` reconoce la ruta solamente después de existir el HTML real.
- Hostinger confirmó antes del cambio que `fr/guia/guarda-equipaje` no existía. No se ejecutó build ni despliegue raíz.
- QA pendiente antes de sincronizar a Hostinger: capturas 390/1440, verificación visual y aprobación humana del tratamiento sin banners FR.
- Transporte privado sigue bloqueado para publicación por tarifas vencidas al 31/10/2026, dos banners FR ausentes y formulario sin integración FR segura. No se inventaron tarifas.

## Continuación 20/11/2026 — Hospedaje AP 805 FR

- Nueva ficha preparada: `/fr/hospedaje/805/` (`hospedaje/805/index.html`).
- Fuente: HTML ES vigente de producción. El original ES y las versiones PT-BR/EN no se editaron.
- Cobertura editorial completa: metadatos, introducción, capacidad para 5 personas, distribución de camas, ubicación, 8 servicios, recomendación, consejo, galería, consulta y WhatsApp en francés.
- La fuente vigente solo asigna una fotografía aprobada a AP 805. Esa misma URL se conserva sin cambio en hero y galería; no se inventó ni sustituyó material.
- SEO privado: canonical FR, hreflang ES/PT-BR/EN/FR, JSON-LD francés y `noindex,nofollow`; fuera del sitemap.
- Se retiró de esta ficha la inicialización de `site.js`/`hospedaje.js` porque esos renderizadores trilingües sobrescribirían el francés. La ficha carga únicamente `fr-home.js` y la ruta se añadió a `readyRoutes` después de crear el HTML.
- QA estático aprobado: sin fragmentos españoles visibles, enlaces internos FR, WhatsApp FR, fotografía coincidente con la fuente, robots/canonical/hreflang correctos.
- QA visual 390/1440 y sincronización puntual de la carpeta FR siguen pendientes; por ello no cuenta como publicada ni indexable.

### Garantías de seguridad

- Solo se hicieron commits en rama `release/fr-public-initial-20261115` y sincronizaciones Git de Hostinger con `directory=fr`.
- Ni un `npm run build` general ni `hosting_deploy` sobre producción, ni sobrescritura global de `public_html`.
- Los originales ES/PT/EN, URLs de fotografías existentes, el sitemap y el manifiesto SEO de producción no se editaron.
- El despliegue Git al directorio FR devolvió `is_success=true` y `working tree clean`.
- El contenido está preparado/servido en Hostinger, pero la validación visual completa y HTTP de navegador externo queda pendiente.
