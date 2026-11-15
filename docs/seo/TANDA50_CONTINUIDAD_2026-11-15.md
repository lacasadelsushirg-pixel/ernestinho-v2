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


## Reanudación ejecutada — Don Camillo y Bar do Omar (15/11/2026)

Este bloque **reemplaza los recuentos parciales anteriores** cuando describan el mismo avance. La producción vigente confirmada por GitHub es `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; el candidato de PR #36 tiene commit remoto verificable `31eed118326f6191bc0895d3703f5669f7482378`, padre `d001a08c93878ca9c7fae10e64cf3101032bcc72`. El reporte individual está en `RELEASE_DON_BAR_20261115.md`. La rama no se desplegó y las dos rutas de este sublote siguen incompletas en francés.

### Estado de la tanda de 50 y hashes de referencia

La lista conserva 10 registros de QA privado histórico, agrega las dos fichas PT/EN parciales de ahora y fija las 38 siguientes por prioridad/cola. “QA histórico” no equivale a publicación ni a revalidación en este run. El SHA de producción indica la base ES de la fuente, no una prueba individual de todos los idiomas.

| # | URL | Estado al corte | SHA/ref comprobable |
|---:|---|---|---|
| 1 | `/gastronomia/carretao-siqueira/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | ref. histórica: SHA específico por ruta no verificado |
| 2 | `/gastronomia/sushi-leblon/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | ref. histórica: SHA específico por ruta no verificado |
| 3 | `/gastronomia/zaza-bistro-tropical/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | ref. histórica: SHA específico por ruta no verificado |
| 4 | `/gastronomia/aprazivel/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | ref. histórica: SHA específico por ruta no verificado |
| 5 | `/gastronomia/churrascaria-palace/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | ref. histórica: SHA específico por ruta no verificado |
| 6 | `/gastronomia/colombo-do-forte/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | ref. histórica: SHA específico por ruta no verificado |
| 7 | `/gastronomia/oteque/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | ref. histórica: SHA específico por ruta no verificado |
| 8 | `/gastronomia/maska/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | ref. histórica: SHA específico por ruta no verificado |
| 9 | `/gastronomia/cafe-lamas/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | ref. histórica: SHA específico por ruta no verificado |
| 10 | `/gastronomia/churrasqueira-rio/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | ref. histórica: SHA específico por ruta no verificado |
| 11 | `/gastronomia/don-camillo/` | PT/EN candidato en PR #36; FR pendiente; no publicado | candidato 31eed118; producción 21bb6877 |
| 12 | `/gastronomia/bar-do-omar/` | PT/EN candidato en PR #36; FR pendiente; no publicado | candidato 31eed118; producción 21bb6877 |
| 13 | `/gastronomia/spicy-fish/` | Auditoría dirigida: estado anterior validado, alerta de bloques largos idénticos; reauditoría pendiente; ES/PT/EN 428/92/67 (587 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 14 | `/gastronomia/amendoeira/` | Auditoría dirigida: estado anterior validado, alerta de bloques largos idénticos; reauditoría pendiente; ES/PT/EN 195/112/3 (310 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 15 | `/gastronomia/dumare-copa/` | Pendiente en inventario; QA de cuatro idiomas no comprobado; ES/PT/EN 60/0/0 (60 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 16 | `/gastronomia/chama-rio-copacabana/` | QA pendiente según inventario heredado; GSC 1062 impresiones por variantes; ES/PT/EN 0/995/67 (1062 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 17 | `/gastronomia/plage-cafe/` | QA pendiente según inventario heredado; GSC 879 impresiones por variantes; ES/PT/EN 277/505/97 (879 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 18 | `/gastronomia/carretao-lido/` | QA pendiente según inventario heredado; GSC 616 impresiones por variantes; ES/PT/EN 518/64/34 (616 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 19 | `/gastronomia/terra-brasilis/` | QA pendiente según inventario heredado; GSC 596 impresiones por variantes; ES/PT/EN 452/106/38 (596 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 20 | `/gastronomia/haru/` | QA pendiente según inventario heredado; GSC 482 impresiones por variantes; ES/PT/EN 350/51/81 (482 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 21 | `/gastronomia/galeto-sats/` | QA pendiente según inventario heredado; GSC 463 impresiones por variantes; ES/PT/EN 58/101/304 (463 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 22 | `/gastronomia/frontera-ipanema/` | QA pendiente según inventario heredado; GSC 387 impresiones por variantes; ES/PT/EN 331/42/14 (387 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 23 | `/gastronomia/faenza-copacabana/` | QA pendiente según inventario heredado; GSC 366 impresiones por variantes; ES/PT/EN 284/75/7 (366 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 24 | `/gastronomia/temperarte-posto6/` | QA pendiente según inventario heredado; GSC 365 impresiones por variantes; ES/PT/EN 258/107/0 (365 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 25 | `/gastronomia/padarias/` | QA pendiente según inventario heredado; GSC 338 impresiones por variantes; ES/PT/EN 42/16/280 (338 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 26 | `/gastronomia/temperarte-bolivar/` | QA pendiente según inventario heredado; GSC 316 impresiones por variantes; ES/PT/EN 200/17/99 (316 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 27 | `/gastronomia/rotisseria-sirio-libanesa/` | QA pendiente según inventario heredado; GSC 264 impresiones por variantes; ES/PT/EN 58/168/38 (264 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 28 | `/gastronomia/tacaca-do-norte/` | QA pendiente según inventario heredado; GSC 253 impresiones por variantes; ES/PT/EN 149/44/60 (253 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 29 | `/gastronomia/bar-urca/` | QA pendiente según inventario heredado; GSC 250 impresiones por variantes; ES/PT/EN 175/57/18 (250 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 30 | `/gastronomia/cervantes-copacabana/` | QA pendiente según inventario heredado; GSC 241 impresiones por variantes; ES/PT/EN 183/32/26 (241 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 31 | `/gastronomia/cipriani/` | QA pendiente según inventario heredado; GSC 241 impresiones por variantes; ES/PT/EN 104/41/96 (241 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 32 | `/gastronomia/garota-de-ipanema/` | QA pendiente según inventario heredado; GSC 231 impresiones por variantes; ES/PT/EN 137/63/31 (231 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 33 | `/gastronomia/la-bicyclette/` | QA pendiente según inventario heredado; GSC 228 impresiones por variantes; ES/PT/EN 64/48/116 (228 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 34 | `/gastronomia/feira-sao-cristovao/` | QA pendiente según inventario heredado; GSC 225 impresiones por variantes; ES/PT/EN 66/141/18 (225 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 35 | `/gastronomia/guacamole-copacabana/` | QA pendiente según inventario heredado; GSC 223 impresiones por variantes; ES/PT/EN 72/45/106 (223 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 36 | `/gastronomia/classico-beach-club-barra/` | QA pendiente según inventario heredado; GSC 218 impresiones por variantes; ES/PT/EN 152/40/26 (218 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 37 | `/gastronomia/fast-food/` | QA pendiente según inventario heredado; GSC 218 impresiones por variantes; ES/PT/EN 152/40/26 (218 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 38 | `/gastronomia/ocya-ilha/` | QA pendiente según inventario heredado; GSC 217 impresiones por variantes; ES/PT/EN 101/29/87 (217 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 39 | `/gastronomia/chez-claude/` | QA pendiente según inventario heredado; GSC 204 impresiones por variantes; ES/PT/EN 77/32/95 (204 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 40 | `/gastronomia/lasai/` | QA pendiente según inventario heredado; GSC 198 impresiones por variantes; ES/PT/EN 164/0/34 (198 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 41 | `/gastronomia/brota/` | QA pendiente según inventario heredado; GSC 196 impresiones por variantes; ES/PT/EN 70/105/21 (196 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 42 | `/gastronomia/praia-skol-copa/` | QA pendiente según inventario heredado; GSC 196 impresiones por variantes; ES/PT/EN 128/52/16 (196 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 43 | `/gastronomia/jobi/` | QA pendiente según inventario heredado; GSC 195 impresiones por variantes; ES/PT/EN 195/0/0 (195 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 44 | `/gastronomia/aipo-aipim-391/` | QA pendiente según inventario heredado; GSC 193 impresiones por variantes; ES/PT/EN 193/0/0 (193 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 45 | `/gastronomia/merci/` | QA pendiente según inventario heredado; GSC 193 impresiones por variantes; ES/PT/EN 120/68/5 (193 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 46 | `/gastronomia/giuseppe-mar/` | QA pendiente según inventario heredado; GSC 186 impresiones por variantes; ES/PT/EN 120/29/37 (186 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 47 | `/gastronomia/hollandaise/` | QA pendiente según inventario heredado; GSC 186 impresiones por variantes; ES/PT/EN 173/10/3 (186 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 48 | `/gastronomia/polis-sucos/` | QA pendiente según inventario heredado; GSC 186 impresiones por variantes; ES/PT/EN 64/122/0 (186 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 49 | `/gastronomia/sel-ipanema/` | QA pendiente según inventario heredado; GSC 185 impresiones por variantes; ES/PT/EN 140/38/7 (185 imp.) | fuente ES producción 21bb6877; contenido en cola |
| 50 | `/gastronomia/cais-do-oriente/` | QA pendiente según inventario heredado; GSC 180 impresiones por variantes; ES/PT/EN 56/48/76 (180 imp.) | fuente ES producción 21bb6877; contenido en cola |

### Recuento al corte

- QA privado histórico registrado: 10/50; recertificación en este run: 0/10.
- PT/EN candidatos en rama para Don Camillo y Bar do Omar: 2; FR y QA de cuatro idiomas pendientes en ambas.
- Siguientes fichas pendientes en cola: 38; la presencia de traducciones previas en inventario no se toma como prueba, en especial Spicy Fish y Amendoeira por alertas de similitud.
- Nuevas fichas completas ES/PT-BR/EN/FR validadas: **0**. Publicadas en Hostinger durante esta ejecución: **0**.
- Continuación inmediata: reauditar en sentido y cobertura Spicy Fish (587 impresiones), Amendoeira (310), luego Dumaré Copa (60), según GSC final 12-ago a 12-nov. Capturas de Don/Bar requieren nueva validación visual con medios accesibles. Consultar PR #36, actualizar el inventario maestro y no desplegar hasta satisfacer revisión independiente.
- Los 38 siguientes figuran como pendientes de reauditoría según el CSV base, salvo los tres casos dirigidos; GSC solo ordena oportunidad y no se interpreta como error/exclusión.
