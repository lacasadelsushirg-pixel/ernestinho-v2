# Tanda de 50 — continuación durable (15/11/2026)

## Contabilidad conservadora

- Último avance histórico en notas de GitHub: 11/50 fichas revisadas en vista privada.
- Recuento bajo el criterio estricto reiterado hoy: **10/50 elegibles**, 40 pendientes. Cervantes Copacabana se pone en revisión porque su vigencia comercial e integración completa siguen abiertas; no se vuelve a contar. El resto de las 10 fichas tiene auditoría de cuatro idiomas y verificación visual 1440/390 registrada en los comentarios anteriores del PR #24.
- En esta ejecución: 2 rutas auditadas contra Hostinger (`/gastronomia/cervantes-copacabana/`, `/gastronomia/chez-claude/`), 0 fichas nuevas de cuatro idiomas cerradas, 0 publicaciones.
- `332a700d`: no disponible en el checkout ni en refs remotos consultados; trabajo no atribuido.

## Estados de esta ejecución

| Ruta | ES | PT-BR | EN | FR | Render/SEO | Capturas | Estado |
|---|---|---|---|---|---|---|---|
| `/gastronomia/cervantes-copacabana/` | Auditada en Hostinger | Candidato estático, PR #36, sin publicación | Candidato estático, PR #36, sin publicación | Piloto privado en rama distinta; no incluido ni revalidado integralmente | QA de seis variantes correcto; vigencia comercial/integración completa pendiente | PT/EN 1440/390 antes/después en carpeta de release; medios externos no cargaron | Revisión; no cuenta |
| `/gastronomia/chez-claude/` | Auditada en Hostinger | Candidato estático; QA local correcto | Candidato estático; QA local correcto | Pendiente; no generado | 6/6 variantes Cervantes/Chez en auditor; sitemap coincide 3588/3588 con Hostinger; sin FR hreflang/sitemap | PT/EN 1440/390 antes/después; no aprobación visual independiente por medios externos | Pendiente FR; no cuenta |

## Entrega y comprobantes

- Rama: `release/cervantes-pt-en-20261115`, basada en producción `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`.
- PR de release: https://github.com/lacasadelsushirg-pixel/ernestinho-v2/pull/36 — abierto, no draft; requiere revisión humana independiente. No fusionar ni desplegar desde este checkpoint.
- PR #24: abierto/draft y base antigua `9426c42fc0150bdce5fbfee060396da9de518ac7`; su Vercel actual sí está en success, sin revisiones registradas. Motivo humano por el que permanece draft no visible en metadatos.
- Hostinger sigue en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; sitemap 3.588 URLs / 3.612 HTML del manifiesto; diferencia frente a referencia actual = 0.
- Guard de contenido: PASS (586 HTML, 10 assets). Freeze audit: fallo heredado idéntico en base/candidato, SHA de salida `e5573a8feb30aeeefa0f4912a4f0e72f4d38e02d9e0b9d40b8977344b72e0815`, 247 archivos. Auditor global de traducciones aborta en diccionario preexistente `buzios-approved-blocks.js`; no se modificó. No existe `audit_translation_content.py` en producción.

## Siguiente paso

Mantener PR #36 pequeño, basado en el HEAD actual de producción, y completar PT/EN/FR de Chez Claude solo tras traducir y verificar FR de forma editorial integral. Antes de escoger otra URL, verificar primero en Hostinger si Lasai ya tiene PT/EN suficientes (el inventario previo lo señalaba como ya localizable) y priorizar la siguiente pérdida real que sí produzca una diferencia visible. No contar una vista privada como publicada ni cerrar fichas con FR/QA pendiente. No publicar mientras siga bloqueada la revisión independiente indicada en `docs/PUBLISHING_PROTECTION.md`.
