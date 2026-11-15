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

Las capturas del candidato se guardan para inspección; las fotos remotas fallaron al cargar, así que no sirven como aprobación visual. [PT 1440](captures/amendoeira-pt-en-20261115/pt-1440.jpg) · [PT 390](captures/amendoeira-pt-en-20261115/pt-390.jpg) · [EN 1440](captures/amendoeira-pt-en-20261115/en-1440.jpg) · [EN 390](captures/amendoeira-pt-en-20261115/en-390.jpg).

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
