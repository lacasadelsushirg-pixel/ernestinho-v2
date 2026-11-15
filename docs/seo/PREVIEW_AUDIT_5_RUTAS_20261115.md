# Verificación incremental del preview de cinco rutas — 15/11/2026

## Alcance y estado

Se inspeccionó el commit de preview `7b587a7070e6a3854b2cfa31ce538bcb8a8157d6` de PR #36, rama `release/cervantes-pt-en-20261115`, basada en Hostinger producción `revision/rendimiento-traducciones-81a904c` HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`.

Las 15 respuestas HTML previstas (cinco rutas por ES/PT-BR/EN) respondieron 200. Las tres variantes de cada página tienen el `lang` esperado, H1 único, canonical propio y alternates ES/PT-BR/EN/x-default. No hay alternate francés. Todas devuelven `X-Robots-Tag: noindex`; `/sitemap.xml` no está servido en este preview (404 con noindex). Es un preview privado, no una publicación.

## Comparación de contenido y preservación

- URLs de fotos del establecimiento: mismo conjunto en ES, PT-BR y EN para las cinco rutas (Don Camillo, Bar do Omar, Spicy Fish, Quiosque Dumaré y Amendoeira). En esta verificación no se detectó pérdida de fotos editoriales.
- Links externos: en las cinco rutas, ES incluye además los perfiles generales de Ernestinho en Instagram y TikTok; ambos faltan en las variantes PT-BR y EN del preview. Los enlaces propios del establecimiento y los mapas que sí aparecen en cada página coinciden por destino al ignorar el texto local de WhatsApp. Queda como incidencia de conservación por resolver antes de QA completo; no se añadieron ni alteraron enlaces.
- Comparación de párrafos visibles por igualdad literal con ES: Don Camillo conserva 7 párrafos idénticos tanto en PT como en EN (posiciones 2–8); Bar do Omar conserva 9 en PT y 8 en EN. Spicy Fish, Dumaré y Amendoeira no presentan párrafos literalmente idénticos a ES en esta prueba. La igualdad literal detecta omisiones de traducción, pero su ausencia no prueba por sí sola calidad semántica.
- La vista accesible de Don Camillo confirma que varios bloques editoriales siguen en español aunque los títulos de sección, resumen, metadatos, navegación y algunas secciones se hayan localizado. Los dos idiomas están incompletos en estas dos páginas.
- Las cinco páginas mantienen estructura de párrafos y H1/H2 comparables; la estructura no basta para marcar traducción completa.

## Captura visual

Se comprobó en navegador el hero de Don Camillo y se cargó la fotografía de fachada. La captura de navegador fue 1344×928, no 1440 px; no se pudo establecer un viewport de 390 px en esta sesión sin el método de viewport que la organización deshabilitó. Por tanto, la captura solo es inspección visual exploratoria y **no** aprobación de los viewports requeridos. No se aprobaron capturas antes/después a 1440/390.

## Recuento y continuación

- Candidatas privadas PT/EN del preview: 5, con render y SEO técnico inicial comprobados.
- Fichas completas PT/EN/FR con QA integral y vista aprobada: **0/50**.
- Cambios publicados en Hostinger por este trabajo: **0**.
- FR: no generado, noindex se mantiene y no hay hreflang ni URLs francesas en sitemap.
- Bloqueos prioritarios: terminar la traducción de los párrafos repetidos de Don Camillo y Bar do Omar; cotejar la presencia de enlaces generales de Instagram/TikTok contra la fuente aprobada y restaurarlos solo si son parte del bloque aprobado; obtener capturas reales a 1440/390; luego revisar FR íntegro y controles de sitemap/hreflang antes de solicitar revisión humana independiente.
- No se modificó código ni se inició un nuevo lote lingüístico en esta comprobación.

