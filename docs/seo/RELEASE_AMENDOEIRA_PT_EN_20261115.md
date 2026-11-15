## Actualización operativa — 15/11/2026 (preparación de preview incremental)

### Estado comprobado
- Hostinger sigue en producción `revision/rendimiento-traducciones-81a904c`, HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; lectura de `pt/gastronomia/amendoeira/index.html` confirma 24 párrafos, de los cuales el primer resumen está en PT-BR y los 23 párrafos editoriales siguientes siguen en español. El título y la descripción PT ya están localizados en producción; no los cuento como recuperación de este candidato.
- Código candidato PT/EN con la corrección de rótulos está en PR #36, commit `f88e1e65671e2ac8e02781cf9317bdfad103d7ee`. La salida de ese commit aún no se pudo revisar: Vercel empezó el build completo, mostró `Build mode: full; rendering 3612 of 3612 locale pages` y se canceló tras 200/3612. Check de Vercel cancelado; Hostinger intacto.
- Este commit cambia `vercel.json` únicamente para usar modo `--routes` en el entorno Vercel Preview; lista las cinco candidatas activas Don Camillo, Bar do Omar, Spicy Fish, Dumaré y Amendoeira. El command de producción Vercel sigue siendo `npm run build`. Se esperan 15 HTML ES/PT/EN, sin FR y sin sitemap en ese preview piloto. Hostinger no usa este comando para publicar.
- El preview sigue siendo privado. No se añade francés, no se cambia HTML/fotos/mapas/enlaces/widgets y no se considera publicado nada.

### Search Console/OpenSEO confirmado
- Proyecto `7172f2fb-7456-4b35-b581-d9b11c0040f4`, propiedad principal, búsqueda web final 2026-08-12–2026-11-12. Chama Rio Copacabana: PT 995 impresiones/3 clics/posición 6,9; EN 67/0/9,6; ES no devuelve fila de impresiones (total observado 1.062). Amendoeira: ES 195/1/9,6; PT 112/0/9,1; EN 3/0/10,7 (310).
- Inspección de 10 URLs de Chama, Amendoeira, Don Camillo y Bar do Omar: 9 «Enviada e indexada», rastreo permitido, fetch exitoso y canonical Google igual al declarado. Chama ES es «Descubierta: actualmente sin indexar»; sin fetch ni canonical reportados. Es exclusión de descubrimiento observada, no error confirmado. Los breadcrumbs devuelven Rich Results PASS, aunque algunas inspecciones muestran un elemento sin nombre (alerta separada).

### Conteo y continuación
- Estado estricto de tanda: **0/50 fichas completas ES/PT-BR/EN/FR con QA aprobado; 0 cambios nuevos publicados en Hostinger**. Amendoeira continúa parcial PT/EN; FR y QA móvil pendientes.
- Siguiente ejecución: verificar que este preview solo genere 15 HTML, no sitemap y no FR; comprobar las cinco URLs ES/PT/EN, canonical/hreflang, textos, carga de medios y enlaces. Hacer capturas 1440/390 antes/después; no marcar ninguna ficha hasta aprobarlas. Después actualizar este informe, el JSON, el inventario maestro y el punto de continuación con los resultados reales.
- El commit local histórico `332a700d` no se encontró en ramas ni objetos remotos revisados y no se le atribuye trabajo.

---
# Bar da Amendoeira — recuperación PT-BR/EN y estado de QA (15/11/2026)

## Resultado del sublote

El código PT/EN se registró en el commit `11b3d31bdabe377d2d45aac12bce9edb7614128a`. Se verificaron los commits históricos `42d03024d2c3765b0d96eb5f9763657d731baf4a` y `8570793a992b262c5fb384a396ec949e6105775c`: ambos contienen la fuente Amendoeira blob `685e5d6e67a31ba8372bd06ec7ae7270e4cd6797`; el HTML ES vigente en producción tiene blob `b3ed0ef51003d906992bc10b0d086b7304907627`.

La ruta `/gastronomia/amendoeira/` fue cotejada contra su HTML ES actual de Hostinger y contra las salidas PT/EN existentes. En producción, varios párrafos del cuerpo PT seguían en español y título/descripción estaban en español. El candidato aplica recuperación editorial en PT-BR e inglés a los párrafos existentes y a los rótulos/metadatos, con el renderizador real de la página y el generador selectivo.

**Estado:** candidato PT-BR/EN privado en PR #36; FR sigue pendiente. No es una ficha completa de cuatro idiomas ni está publicada. La producción sigue en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; el sublote tomó como base PR #36 `61a8f0a4a456bb077defdb7274c065c4b2a23e76`. El commit local referido como `332a700d` no existe en este checkout y la búsqueda remota no halló resultados; no se atribuye ese trabajo a esta ejecución. cambios presentes en Hostinger por este sublote: **0**.

## Recuperación de contenido

Se revisó el diccionario incrustado posicional frente a la estructura actual antes de reutilizarlo. Los bloques históricos se cotejaron por significado y se completaron manualmente los textos posteriores, metadatos, rótulos de galería/Instagram, alt y texto de navegación necesarios. El documento final contiene 24 párrafos en ES, PT-BR y EN. Ningún párrafo PT/EN coincide literalmente con un párrafo ES. Hay un H1 en cada versión y se revisaron los 10 H2.

Se conservaron los cuatro URLs de fotos del establecimiento, el iframe/URL de mapa, Google Maps, Waze, Instagram y WhatsApp existentes. **Diferencia explícita frente a los HTML PT/EN hoy publicados:** al renderizar la fuente ES vigente también aparece el distintivo Cadastur (imagen y enlace), que está presente en ES pero falta en las variantes PT/EN actuales. No se editó el archivo de imagen ni su URL. La diferencia queda pendiente de revisión visual; no se presenta como un cambio invisible.

## SEO y render

- Se ejecutó el build selectivo de `scripts/build_multilingual.mjs`: 3 páginas de idioma de esta ruta, de 3.612 documentos del manifest.
- `lang`: es / pt-BR / en; títulos y descriptions localizados; canonical propio por variante.
- Alternates: es, pt-BR, en y x-default; sin hreflang francés.
- No se generó HTML FR y no se añadió FR al sitemap.
- Sitemap Hostinger y candidato: 3.588 URLs cada uno. Comparación exacta de conjunto: 0 altas, 0 bajas. Hash FNV-1a 64 de URLs ordenadas en ambos: `9fb6b50f1fe8a122`.
- El manifest del build mantiene 3.612 documentos y 1.196 URLs indexables por idioma.

## Datos de Search Console

OpenSEO, proyecto `7172f2fb-7456-4b35-b581-d9b11c0040f4`, propiedad `https://www.ernestinhocarioca.com.br/`, intervalo 2026-08-12 a 2026-11-12: 310 impresiones para las tres variantes (ES 195, PT 112, EN 3). Es señal de rendimiento, no evidencia de error de indexación. No se atribuye una exclusión a esta ficha con esas cifras.

## Capturas de QA (no aprobadas)

Las capturas del candidato se guardan para inspección; las fotos remotas fallaron al cargar, así que no sirven como aprobación visual. No se pudo capturar el “antes” del sitio en Chromium: la navegación directa a la URL pública devuelve `net::ERR_EMPTY_RESPONSE`, aunque el contenido HTML sí se pudo leer por la API de Hostinger. El preview de PR #36 está pendiente. [PT 1440](captures/amendoeira-pt-en-20261115/pt-1440.jpg) · [PT 390](captures/amendoeira-pt-en-20261115/pt-390.jpg) · [EN 1440](captures/amendoeira-pt-en-20261115/en-1440.jpg) · [EN 390](captures/amendoeira-pt-en-20261115/en-390.jpg).

## Validaciones y límites

- Sintaxis de builder/diccionario/metadatos: PASS.
- `guard_approved_content.mjs`: PASS; 586 archivos verificados y 10 assets críticos fijados. El aviso de drift de 247 aprobaciones es histórico y ya aparece en la base; no se regeneró ningún manifiesto.
- `check_frozen_pages.py`: FAIL con la misma huella de 247 páginas protegidas en base y candidato; no se modifica ni elude.
- `audit_multilingual.py`: error basal idéntico en base/candidato, `KeyError: 'lang'` (el manifest expone `language`).
- `audit_translations.mjs`: error basal idéntico: `Invalid dictionary: buzios-approved-blocks.js`.
- `audit_static.py`: 279 alertas/errores globales heredados; no se interpretan como hallazgos nuevos de esta ruta. La auditoría específica de la página está en el JSON contiguo.
- Capturas locales a 1440 y 390 px generadas. Chromium reportó `net::ERR_EMPTY_RESPONSE` para medios remotos; no hay respuesta HTTP 404 confirmada. Por tanto, la inspección visual del candidato no está aprobada y no se debe contar la ficha como validada.
- El checkout usado para esta validación local era anterior al HEAD remoto del PR; la diferencia del builder contra el HEAD de PR #36 se cotejó y se limita a la importación/detección de Amendoeira y a normalizar las claves `pt/en` del diccionario embebido. El nuevo commit dispara CI/Vercel, que se debe comprobar sobre el HEAD resultante antes de revisión.

## Continuación

PR #36 sigue abierto sobre producción actual; no se fusiona ni despliega automáticamente. La revisión humana independiente indicada por `docs/PUBLISHING_PROTECTION.md` sigue requerida. El preview de este sublote, una vez listo por Vercel, debe inspeccionarse en los cuatro tamaños antes de solicitar esa revisión.

Siguiente ficha por prioridad GSC disponible: `/gastronomia/chama-rio-copacabana/` (1.062 impresiones, 2026-08-12–2026-11-12), después `/gastronomia/plage-cafe/` (879), `/gastronomia/carretao-lido/` (616) y `/gastronomia/terra-brasilis/` (596). Antes de cambiar cualquiera, cotejar HTML ES vigente e historial; no asumir traducciones válidas por existir.
