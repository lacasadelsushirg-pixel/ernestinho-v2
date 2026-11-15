# Entrega PT/EN de Don Camillo y Bar do Omar — 15/11/2026

## Estado y referencia

- Producción Hostinger verificada: `revision/rendimiento-traducciones-81a904c` en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`.
- PR #24: sigue abierto como borrador; head `586a0e3457c41071ada753bbf4d1c08484600d25`, base `9426c42fc0150bdce5fbfee060396da9de518ac7` anterior a producción. El check Vercel reportado está en éxito; no hay revisión registrada. GitHub no informa por qué quedó como borrador.
- PR #36: abierto, no borrador, basado directamente en producción; el head remoto comprobado es `31eed118326f6191bc0895d3703f5669f7482378`. Está preparado para revisión; no equivale a despliegue. El body anterior aún describe Cervantes y Chez Claude; el comentario de continuidad añadirá este sublote.
- El commit local `332a700d` no se encuentra en refs locales ni remotas consultadas; no se reutilizó ni se atribuyeron a él cambios no comprobables.
- Hostinger no fue modificado. Cambios publicados en esta ejecución: **0**.

## Fichas de este sublote

| Ruta | Estado ES | PT-BR | EN | FR | Contenido, SEO y estructura |
|---|---|---|---|---|---|
| `/gastronomia/don-camillo/` | Revisada contra fuente de producción; conserva HTML fuente | Candidato renderizado en el PR #36; no publicado | Candidato renderizado en el PR #36; no publicado | Pendiente; no generado | QA local de 3 variantes; H1, metadatos, canonical y alternates; secciones, fotos, enlaces, mapa, widget y datos preservados |
| `/gastronomia/bar-do-omar/` | Revisada contra fuente de producción; conserva HTML fuente | Candidato renderizado en el PR #36; no publicado | Candidato renderizado en el PR #36; no publicado | Pendiente; no generado | QA local de 3 variantes; H1, metadatos, canonical y alternates; secciones, fotos, enlaces, mapa, widget y datos preservados |

Las dos fichas están **parciales**, no cuentan como páginas de cuatro idiomas cerradas. El francés sigue fuera del build, del sitemap y de hreflang.

## Compilación y auditoría

- Generador selectivo: `EC_USE_LIVE_TEMPLATES=1 EC_LIVE_ROOT=/workspace/scratch/3c28b485f899/live-template-snapshot EC_CHROME_PATH=/home/agent/.cache/ec-seo-chromium/chromium node scripts/build_multilingual.mjs --update --routes=/gastronomia/don-camillo/,/gastronomia/bar-do-omar/`.
- El log declara `route-selective update`: 6 de 3.612 documentos HTML procesados; no fue una reconstrucción completa. Manifiesto: 1.204 documentos, 1.196 indexables por idioma.
- Auditoría de las seis variantes ES/PT/EN: **6/6 sin errores**; cada idioma tiene un H1, título y descripción localizados, canonical propia, alternates recíprocos ES/PT-BR/EN, secciones y enlaces esperados. El francés no está anunciado.
- Sitemap: 3.588 URLs en producción y candidato; comparación exacta con cero altas, bajas o rutas FR.
- Estructura comparada contra las fuentes ES de producción: 98 nodos principales para Don Camillo y 91 para Bar do Omar, misma forma DOM (98 nodos principales en Don Camillo y 91 en Bar do Omar), destinos de enlaces, mapa y referencias de imágenes. Se conservaron los 8/7 elementos de galería, un mapa por ruta, un widget y un selector de idioma en cada ficha. No se alteraron fotos, mapas, componentes, datos comerciales, widgets ni enlaces.
- Las capturas antes/después PT/EN a 1440 y 390 px están en `docs/seo/captures/don-bar-pt-en-20261115/`; se guardó índice y SHA-256. La verificación visual de las fotos **no está aprobada**: la red de esta ejecución no pudo descargar los medios externos de Hostinger (`ERR_EMPTY_RESPONSE`); algunas etiquetas de imagen no exponen `src` directo en la captura. Se conservaron las referencias fuente. Hace falta reabrir las capturas con medios disponibles antes de considerar QA visual completo.
- `node --check scripts/build_multilingual.mjs`, `git diff --check` y `node scripts/guard_approved_content.mjs`: PASS. El guard protege 586 páginas/activos y reporta 247 divergencias históricas.
- `python3 scripts/check_frozen_pages.py`: falla por las mismas 247 divergencias históricas en base y candidato; SHA de salida idéntico `e5573a8feb30aeeefa0f4912a4f0e72f4d38e02d9e0b9d40b8977344b72e0815`. No regeneré aprobaciones ni sorteé el control.
- El auditor global de traducciones aborta antes de revisar estas rutas por el diccionario preexistente `buzios-approved-blocks.js`. El script `audit_translation_content.py` no existe en este HEAD. Se conservan estas incidencias como bloqueos de herramienta heredados, no como errores confirmados de Don/Bar.

Evidencia runtime estructurada: `docs/seo/QA_DON_BAR_20261115.json`. Capturas: `docs/seo/captures/don-bar-pt-en-20261115/`.

## Search Console: oportunidad, no estado de indexación

OpenSEO/GSC conectado al proyecto `7172f2fb-7456-4b35-b581-d9b11c0040f4`, propiedad `https://www.ernestinhocarioca.com.br/`, periodo final `2026-08-12`–`2026-11-12`, dimensión page:

- Don Camillo gastronomía: ES 82, PT 98, EN 37 = **217 impresiones**; 2 clics en PT, 0 en ES/EN.
- Bar do Omar gastronomía: ES 225, PT 75, EN 18 = **318 impresiones**; 1 clic en PT, 0 en ES/EN.
- Bar do Omar vida nocturna es otra ruta: ES 26, PT 597, EN 11 = **634 impresiones** y no se suma a la ficha gastronómica.
- Siguientes prioridades verificadas en el mismo periodo: Spicy Fish ES/PT/EN 428/92/67 = **587**; Amendoeira 195/112/3 = **310**; Dumaré Copa reporta **60** impresiones ES, PT/EN sin filas. Sus alertas históricas de similitud impiden aceptar el estado “Validado” del inventario sin cotejo editorial.
- Las impresiones reflejan demanda de búsqueda. No son errores ni exclusiones de indexación; no se realizó aquí una inspección de estado URL ni se infiere indexación individual.

## Bloqueo de release y revisión necesaria

La protección del repositorio exige revisión humana independiente. Además, el control freeze heredado sigue fallando; la aprobación del propietario no exime esos controles. Por ello no desplegué. El PR #36 queda como candidato para revisión independiente de traducciones PT/EN, drift histórico y capturas visuales con medios accesibles. Producción y sus 3.588 URLs indexables permanecen intactas.

## Punto de continuación — tanda de 50

Recuento honesto: 10 rutas con QA privado histórico que deben recertificarse; 2 rutas con PT/EN candidatos en este sublote; 38 siguientes rutas pendientes/por reauditar; **0 rutas nuevas cerradas en los cuatro idiomas en este sublote y 0 publicadas**. La tabla completa de las 50 rutas y estados al corte está registrada en `TANDA50_CONTINUIDAD_2026-11-15.md`. Próxima acción: validar texto y métricas de Spicy Fish, después Amendoeira y Dumaré Copa; para cada una cotejar español actual, fuente histórica, cobertura íntegra y sentido antes de aceptar PT/EN/FR. No confiar en diccionarios posicionales ni en el estado previo del CSV.

SHA del sublote de código verificable en PR #36: `31eed118326f6191bc0895d3703f5669f7482378`. El informe y el inventario requieren un commit documental siguiente, que quedará indicado en el comentario del PR.
