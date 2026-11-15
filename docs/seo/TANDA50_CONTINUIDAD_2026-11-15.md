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

## Prioridad siguiente con Search Console real

Consulta OpenSEO/GSC `7172f2fb-7456-4b35-b581-d9b11c0040f4`, propiedad `https://www.ernestinhocarioca.com.br/`, búsqueda web, dimensión page, datos finales, 2026-08-12–2026-11-12. Se sumaron las variantes ES/PT/EN de cada slug; son impresiones de búsqueda, no exclusiones ni errores de indexación.

| Siguiente ficha | Impresiones por variante en el periodo | Total observable | Estado del inventario anterior |
|---|---:|---:|---|
| `/gastronomia/don-camillo/` | ES 82; PT 98; EN 37 | 217 | PT/EN en revisión; FR pendiente |
| `/gastronomia/bar-do-omar/` | ES 225; PT 75; EN 18 | 318 | PT/EN en revisión; FR pendiente |
| `/gastronomia/spicy-fish/` | ES 428; PT 92; EN 67 | 587 | Marcada validada en inventario anterior, pero con alerta de bloques extensos idénticos; cotejar antes de aceptar |
| `/gastronomia/amendoeira/` | ES 195; PT 112; EN 3 | 310 | Marcada validada en inventario anterior, con alerta de bloques extensos idénticos; cotejar antes de aceptar |
| `/gastronomia/lasai/` | ES 164; PT 0 reportadas; EN 34 | 198 | Título/intros ya localizados según comprobación anterior; auditar cuerpo y FR antes de contar |
| `/gastronomia/chez-claude/` | ES 77; PT 32; EN 95 | 204 | PT/EN candidato en PR #36; FR pendiente |
| `/gastronomia/dumare-copa/` | ES 60; sin filas PT/EN con impresiones | 60 | ES/PT/EN/FR pendientes en inventario |

Orden de trabajo: respetar primero Don Camillo y Bar do Omar por continuidad expresa del propietario; después verificar Spicy Fish y Amendoeira por volumen GSC, sin asumir validez por el estado heredado del CSV. Lasai/ Chez Claude/Dumaré siguen en cola según QA y oportunidad. Estos datos GSC no autorizan cambios de traducción de la ficha ni demuestran indexación: el recuento de exclusiones va en una auditoría separada.

Las 10 rutas que constan como revisadas en las notas previas de GitHub son: `/gastronomia/carretao-siqueira/`, `/gastronomia/sushi-leblon/`, `/gastronomia/zaza-bistro-tropical/`, `/gastronomia/aprazivel/`, `/gastronomia/churrascaria-palace/`, `/gastronomia/colombo-do-forte/`, `/gastronomia/oteque/`, `/gastronomia/maska/`, `/gastronomia/cafe-lamas/` y `/gastronomia/churrasqueira-rio/`. Este run conserva ese conteo documental y no reejecutó el QA completo de dichas 10. Las 40 restantes todavía necesitan su informe individual; la tabla anterior documenta las primeras siete prioridades, no afirma que sean las 40 completas.
