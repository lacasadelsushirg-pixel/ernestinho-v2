# Tanda de 50 — continuación durable (15/11/2026)

## Contabilidad conservadora

- Último avance histórico en notas de GitHub: 11/50 fichas revisadas en vista privada.
- Recuento bajo el criterio estricto reiterado hoy: **0/50 elegibles bajo el criterio estricto**, 50 pendientes. Diez registros históricos de QA no se recertifican en este corte; no se cuentan como completos.
- En esta ejecución: 3 rutas auditadas contra Hostinger (`/gastronomia/cervantes-copacabana/`, `/gastronomia/chez-claude/`, `/gastronomia/dumare/`), 0 fichas nuevas de cuatro idiomas cerradas, 0 publicaciones.
- `332a700d`: no disponible en el checkout ni en refs remotos consultados; trabajo no atribuido.

## Estados de esta ejecución

| Ruta | ES | PT-BR | EN | FR | Render/SEO | Capturas | Estado |
|---|---|---|---|---|---|---|---|
| `/gastronomia/cervantes-copacabana/` | Auditada en Hostinger | Candidato estático, PR #36, sin publicación | Candidato estático, PR #36, sin publicación | Piloto privado en rama distinta; no incluido ni revalidado integralmente | QA de seis variantes correcto; vigencia comercial/integración completa pendiente | PT/EN 1440/390 antes/después en carpeta de release; medios externos no cargaron | Revisión; no cuenta |
| `/gastronomia/chez-claude/` | Auditada en Hostinger | Candidato estático; QA local correcto | Candidato estático; QA local correcto | Pendiente; no generado | 6/6 variantes Cervantes/Chez en auditor; sitemap coincide 3588/3588 con Hostinger; sin FR hreflang/sitemap | PT/EN 1440/390 antes/después; no aprobación visual independiente por medios externos | Pendiente FR; no cuenta |

## Entrega y comprobantes

- Rama: `release/cervantes-pt-en-20261115`, basada en producción `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`.
- PR de release: https://github.com/lacasadelsushirg-pixel/ernestinho-v2/pull/36 — abierto, no draft; requiere revisión humana independiente. No fusionar ni desplegar desde este checkpoint.
- PR #24: abierto/draft y base antigua `9426c42fc0150bdce5fbfee060396da9de518ac7`; su Vercel actual está en success, sin revisiones registradas. El cuerpo del PR indica explícitamente “Mantener como borrador”; no hay explicación técnica adicional en los metadatos. Motivo humano por el que permanece draft no visible en metadatos.
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
| 1 | `/gastronomia/carretao-siqueira/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | Hostinger prod 21bb6877; blob ES 6cbdf907f1a363efbeb47e869215900b1fe8d2a6 |
| 2 | `/gastronomia/sushi-leblon/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | Hostinger prod 21bb6877; blob ES f0960038eed49af92dfaf2c9618b88b30dbc0395 |
| 3 | `/gastronomia/zaza-bistro-tropical/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | Hostinger prod 21bb6877; blob ES 3c81194462752ddc241b1cad847785ef44b5ec4a |
| 4 | `/gastronomia/aprazivel/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | Hostinger prod 21bb6877; blob ES 3c03174a60b9f5a6a7d472a2bbab0c01fa78a412 |
| 5 | `/gastronomia/churrascaria-palace/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | Hostinger prod 21bb6877; blob ES c5fb0bbb0ae6f528af3d33b398d4a69c39794aa0 |
| 6 | `/gastronomia/colombo-do-forte/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | Hostinger prod 21bb6877; blob ES 9f2499455a34a28a49a0773e6ae0bab3a02d4cbf |
| 7 | `/gastronomia/oteque/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | Hostinger prod 21bb6877; blob ES 9129914e9b78ceaa06301cd7e5fcbe12326901f7 |
| 8 | `/gastronomia/maska/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | Hostinger prod 21bb6877; blob ES 498e10c390f3a116d42b114b145f312124ebf8dd |
| 9 | `/gastronomia/cafe-lamas/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | Hostinger prod 21bb6877; blob ES 269e8e674e03122137909a0b4ce78675f8ae0d6f |
| 10 | `/gastronomia/churrasqueira-rio/` | QA 4 idiomas en informe privado anterior; no recertificado en este run; publicación no afirmada | Hostinger prod 21bb6877; blob ES 5018c17b722e2bb1cb7d65ae73214243ed8295f2 |
| 11 | `/gastronomia/don-camillo/` | PT/EN candidato privado en PR #36; QA visual del candidato pendiente; medios del sitio sí cargan en la vista de producción; FR pendiente; no publicado | Hostinger prod 21bb6877; blob ES 1098143db5f08861cb15bf597e09c8c55447da87 |
| 12 | `/gastronomia/bar-do-omar/` | PT/EN candidato privado en PR #36; QA visual del candidato pendiente; medios del sitio sí cargan en la vista de producción; FR pendiente; no publicado | Hostinger prod 21bb6877; blob ES e55472577b72ee0dda7a4c3689f2489898f9941e |
| 13 | `/gastronomia/dumare/` | PT/EN candidato privado en PR #36; 648 impresiones GSC; estructura traducida y sitemap/canonicals comprobados; FR y QA visual pendientes; no publicado | Hostinger prod 21bb6877; blob ES f2fbca8b8f9d514579d6e48a5e8102bd10d35130 |
| 14 | `/gastronomia/spicy-fish/` | PT/EN candidato privado en PR #36; QA estructural listo, visual bloqueado por fotos remotas; FR pendiente; no publicado; 587 impresiones GSC | Hostinger prod 21bb6877; blob ES 6c49d747f9a7a5712a8a4cb7927462bcf44c378d |
| 15 | `/gastronomia/amendoeira/` | ES cotejado; candidata PT/EN privada; FR pendiente; 310 impresiones GSC; diferencia Cadastur marcada; QA visual no aprobado | Hostinger prod 21bb6877; blob ES b3ed0ef51003d906992bc10b0d086b7304907627 |
| 16 | `/gastronomia/dumare-copa/` | Pendiente en inventario; QA de cuatro idiomas no comprobado; ES/PT/EN 60/0/0 (60 imp.) | Hostinger prod 21bb6877; blob ES c12aa7476e5a9a9908a7ef08c7a9e7ad247322b8 |
| 17 | `/gastronomia/chama-rio-copacabana/` | QA pendiente según inventario heredado; GSC 1062 impresiones por variantes; ES/PT/EN 0/995/67 (1062 imp.) | Hostinger prod 21bb6877; blob ES 5aab4304cd65e8006a7e9e410f0903495c3ef6be |
| 18 | `/gastronomia/plage-cafe/` | QA pendiente según inventario heredado; GSC 879 impresiones por variantes; ES/PT/EN 277/505/97 (879 imp.) | Hostinger prod 21bb6877; blob ES 7b18104abae1dcb68821af4663dafa6049206bf7 |
| 19 | `/gastronomia/carretao-lido/` | QA pendiente según inventario heredado; GSC 616 impresiones por variantes; ES/PT/EN 518/64/34 (616 imp.) | Hostinger prod 21bb6877; blob ES fe48ac0c9ad39cbf3be490dc32c1e96010c29487 |
| 20 | `/gastronomia/terra-brasilis/` | QA pendiente según inventario heredado; GSC 596 impresiones por variantes; ES/PT/EN 452/106/38 (596 imp.) | Hostinger prod 21bb6877; blob ES 1c3f6149742b62e50d233ef57f6b37dd8237d0fd |
| 21 | `/gastronomia/haru/` | QA pendiente según inventario heredado; GSC 482 impresiones por variantes; ES/PT/EN 350/51/81 (482 imp.) | Hostinger prod 21bb6877; blob ES 6f897d6c60ca36d476d916d93d9e8b9ae25d1f97 |
| 22 | `/gastronomia/galeto-sats/` | QA pendiente según inventario heredado; GSC 463 impresiones por variantes; ES/PT/EN 58/101/304 (463 imp.) | Hostinger prod 21bb6877; blob ES 8c3ae87d894901f7cc85e1a9978c336effe9d177 |
| 23 | `/gastronomia/frontera-ipanema/` | QA pendiente según inventario heredado; GSC 387 impresiones por variantes; ES/PT/EN 331/42/14 (387 imp.) | Hostinger prod 21bb6877; blob ES 94626d30d9afd92e49c049c324303228c1c81918 |
| 24 | `/gastronomia/faenza-copacabana/` | QA pendiente según inventario heredado; GSC 366 impresiones por variantes; ES/PT/EN 284/75/7 (366 imp.) | Hostinger prod 21bb6877; blob ES 110642f3335541a84cfba4f1fe3426912b16768f |
| 25 | `/gastronomia/temperarte-posto6/` | QA pendiente según inventario heredado; GSC 365 impresiones por variantes; ES/PT/EN 258/107/0 (365 imp.) | Hostinger prod 21bb6877; blob ES 775dbd2edb1656bfd846f3d4f9ed37ccbd2892a7 |
| 26 | `/gastronomia/padarias/` | QA pendiente según inventario heredado; GSC 338 impresiones por variantes; ES/PT/EN 42/16/280 (338 imp.) | Hostinger prod 21bb6877; blob ES 85a9cb7e8818c8cae10838db837eee4b6daa4abc |
| 27 | `/gastronomia/temperarte-bolivar/` | QA pendiente según inventario heredado; GSC 316 impresiones por variantes; ES/PT/EN 200/17/99 (316 imp.) | Hostinger prod 21bb6877; blob ES f8ce4e0f177997995a758aca7574908baf78a348 |
| 28 | `/gastronomia/rotisseria-sirio-libanesa/` | QA pendiente según inventario heredado; GSC 264 impresiones por variantes; ES/PT/EN 58/168/38 (264 imp.) | Hostinger prod 21bb6877; blob ES c0934b90f225b95e04592f9549dd0e37ca821925 |
| 29 | `/gastronomia/tacaca-do-norte/` | QA pendiente según inventario heredado; GSC 253 impresiones por variantes; ES/PT/EN 149/44/60 (253 imp.) | Hostinger prod 21bb6877; blob ES a626af38b86903322ba8b7f6e84e68cdda33e5ce |
| 30 | `/gastronomia/bar-urca/` | QA pendiente según inventario heredado; GSC 250 impresiones por variantes; ES/PT/EN 175/57/18 (250 imp.) | Hostinger prod 21bb6877; blob ES 01f276c0689bb5d869999a92da8e7d93b7d6b785 |
| 31 | `/gastronomia/cervantes-copacabana/` | QA pendiente según inventario heredado; GSC 241 impresiones por variantes; ES/PT/EN 183/32/26 (241 imp.) | Hostinger prod 21bb6877; blob ES abdc48e525942bf73fe72daefee731ea38819bf4 |
| 32 | `/gastronomia/cipriani/` | QA pendiente según inventario heredado; GSC 241 impresiones por variantes; ES/PT/EN 104/41/96 (241 imp.) | Hostinger prod 21bb6877; blob ES 411f957b5da94bd0538ec512de661c723f4e8e31 |
| 33 | `/gastronomia/garota-de-ipanema/` | QA pendiente según inventario heredado; GSC 231 impresiones por variantes; ES/PT/EN 137/63/31 (231 imp.) | Hostinger prod 21bb6877; blob ES a2d8617b16ec407f38cb69d9563a052e99ccd295 |
| 34 | `/gastronomia/la-bicyclette/` | QA pendiente según inventario heredado; GSC 228 impresiones por variantes; ES/PT/EN 64/48/116 (228 imp.) | Hostinger prod 21bb6877; blob ES 82631de53f3a33c2d67487ba563abd91e5baafbd |
| 35 | `/gastronomia/feira-sao-cristovao/` | QA pendiente según inventario heredado; GSC 225 impresiones por variantes; ES/PT/EN 66/141/18 (225 imp.) | Hostinger prod 21bb6877; blob ES dea40048e9a5d39fc77b7c29016b3f88f9ea2f60 |
| 36 | `/gastronomia/guacamole-copacabana/` | QA pendiente según inventario heredado; GSC 223 impresiones por variantes; ES/PT/EN 72/45/106 (223 imp.) | Hostinger prod 21bb6877; blob ES a08313c70caf9646590de9fea5ea53b7094e1034 |
| 37 | `/gastronomia/classico-beach-club-barra/` | QA pendiente según inventario heredado; GSC 218 impresiones por variantes; ES/PT/EN 152/40/26 (218 imp.) | Hostinger prod 21bb6877; blob ES 2d96c21b7398b3f528092dc70aace20bf12e05a0 |
| 38 | `/gastronomia/fast-food/` | QA pendiente según inventario heredado; GSC 218 impresiones por variantes; ES/PT/EN 152/40/26 (218 imp.) | Hostinger prod 21bb6877; blob ES 3eb04d5fc56365b46fab8bb0a060ec7568618374 |
| 39 | `/gastronomia/ocya-ilha/` | QA pendiente según inventario heredado; GSC 217 impresiones por variantes; ES/PT/EN 101/29/87 (217 imp.) | Hostinger prod 21bb6877; blob ES c1938776e73a5232d6c8faa3cbfbb4cefad4ae0a |
| 40 | `/gastronomia/chez-claude/` | QA pendiente según inventario heredado; GSC 204 impresiones por variantes; ES/PT/EN 77/32/95 (204 imp.) | Hostinger prod 21bb6877; blob ES 2e77c8f11c2d850bae3074dfbcc47ee965c42746 |
| 41 | `/gastronomia/lasai/` | QA pendiente según inventario heredado; GSC 198 impresiones por variantes; ES/PT/EN 164/0/34 (198 imp.) | Hostinger prod 21bb6877; blob ES 95d467b7b6652323ae7f4a26c0feb88c88fec9a4 |
| 42 | `/gastronomia/brota/` | QA pendiente según inventario heredado; GSC 196 impresiones por variantes; ES/PT/EN 70/105/21 (196 imp.) | Hostinger prod 21bb6877; blob ES e31a7f7dc52c2a4f1babe297da011ca300d4cc16 |
| 43 | `/gastronomia/praia-skol-copa/` | QA pendiente según inventario heredado; GSC 196 impresiones por variantes; ES/PT/EN 128/52/16 (196 imp.) | Hostinger prod 21bb6877; blob ES 70861b9ba60ea9e99a22d155df649b3c1bca6722 |
| 44 | `/gastronomia/jobi/` | QA pendiente según inventario heredado; GSC 195 impresiones por variantes; ES/PT/EN 195/0/0 (195 imp.) | Hostinger prod 21bb6877; blob ES 228f39e151ad55c8be9077423e0950acfcab64a5 |
| 45 | `/gastronomia/aipo-aipim-391/` | QA pendiente según inventario heredado; GSC 193 impresiones por variantes; ES/PT/EN 193/0/0 (193 imp.) | Hostinger prod 21bb6877; blob ES db591ebfddae31ecef0c5cf17ee39b28becabe09 |
| 46 | `/gastronomia/merci/` | QA pendiente según inventario heredado; GSC 193 impresiones por variantes; ES/PT/EN 120/68/5 (193 imp.) | Hostinger prod 21bb6877; blob ES 97e8f123f1f5fe3c5a26e063b18680127a5ac768 |
| 47 | `/gastronomia/giuseppe-mar/` | QA pendiente según inventario heredado; GSC 186 impresiones por variantes; ES/PT/EN 120/29/37 (186 imp.) | Hostinger prod 21bb6877; blob ES 318a57e414fc9fa64006343020e4fbbf064a1d4f |
| 48 | `/gastronomia/hollandaise/` | QA pendiente según inventario heredado; GSC 186 impresiones por variantes; ES/PT/EN 173/10/3 (186 imp.) | Hostinger prod 21bb6877; blob ES 0f57ab5a0c0f56d4b17f181c56ce93838f239376 |
| 49 | `/gastronomia/polis-sucos/` | QA pendiente según inventario heredado; GSC 186 impresiones por variantes; ES/PT/EN 64/122/0 (186 imp.) | Hostinger prod 21bb6877; blob ES 79fee661887876e6b21755854a8f21b1f53d139f |
| 50 | `/gastronomia/sel-ipanema/` | QA pendiente según inventario heredado; GSC 185 impresiones por variantes; ES/PT/EN 140/38/7 (185 imp.) | Hostinger prod 21bb6877; blob ES 9c1f030f233f00ecf601f679170b0bf6c46ce84e |
### Recuento al corte

- QA privado histórico registrado: 10/50; recertificación en este run: 0/10.
- PT/EN candidatos en rama para Don Camillo y Bar do Omar: 2; FR y QA de cuatro idiomas pendientes en ambas.
- Siguientes fichas pendientes en cola: 38; la presencia de traducciones previas en inventario no se toma como prueba, en especial Spicy Fish y Amendoeira por alertas de similitud.
- Nuevas fichas completas ES/PT-BR/EN/FR validadas: **0**. Publicadas en Hostinger durante esta ejecución: **0**.
- Continuación inmediata: reauditar en sentido y cobertura Spicy Fish (587 impresiones), Amendoeira (310), luego Dumaré Copa (60), según GSC final 12-ago a 12-nov. Capturas de Don/Bar requieren nueva validación visual con medios accesibles. Consultar PR #36, actualizar el inventario maestro y no desplegar hasta satisfacer revisión independiente.
- Los 38 siguientes figuran como pendientes de reauditoría según el CSV base, salvo los tres casos dirigidos; GSC solo ordena oportunidad y no se interpreta como error/exclusión.

### Estado URL confirmado en Search Console (Don/Bar)

Inspección GSC de las seis URLs ES/PT/EN: 6/6 `Enviada e indexada`, robots permitido, rastreo exitoso, canonical Google igual al declarado; rastreo móvil. Fechas: Don ES 22-oct 08:14Z, PT 06-oct 05:38Z, EN 23-oct 11:06Z; Bar ES 05-oct 07:36Z, PT 06-oct 14:59Z, EN 05-oct 17:30Z. Breadcrumbs: resultado PASS con un elemento sin nombre; usabilidad móvil: `VERDICT_UNSPECIFIED`. Son páginas indexadas pese a las secciones PT/EN por recuperar; no hay error de indexación confirmado en estas seis inspecciones.


### Corte verificado 15/11/2026 — lote en curso

**Producción Hostinger:** `revision/rendimiento-traducciones-81a904c` sigue en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. No hubo despliegue en este corte: **0 rutas añadidas a producción**. Los candidatos PT/EN solo existen en el PR #36; ninguno de Don Camillo, Bar do Omar o Spicy Fish cuenta como ficha completa de cuatro idiomas.

**Rama de release:** PR #36 `release/cervantes-pt-en-20261115`, commit actual de código `ed946011f04c68bef110c8db0f4eab484b20a246`, basado en el commit de PR #36 anterior `f114...` sobre producción. Este commit aporta el generador selectivo y diccionario de Spicy Fish; no modifica fotos, mapas, diseño, enlaces ni widgets. El informe y evidencias actuales quedan en `RELEASE_SPICY_FISH_PT_EN_20261115.md`, `QA_SPICY_FISH_PT_EN_20261115.json` y `captures/spicy-fish-pt-en-20261115/desktop-review.jpg` y `mobile-review.jpg`.

**Recuento de 50 URL:** se conservaron las 50 rutas priorizadas de la tabla, ahora con el blob SHA exacto del HTML ES en el árbol de producción `21bb6877`. Estados al corte: 10 filas de QA histórico que no se recertificaron hoy; 2 candidaturas PT/EN previas (Don/Bar) siguen privadas y con QA visual bloqueado; Spicy Fish suma una candidatura PT/EN privada y estructuralmente verificada; Amendoeira deja de considerarse validada por la alerta de bloques idénticos y vuelve a auditoría. Resultado estricto: **0/50 completas PT/EN/FR en este run; 0/50 nuevas publicadas; 37/50 en cola sin lote lingüístico validado**. Los cuatro candidatos parciales no cuentan como cerrados en ese corte histórico.

**Spicy Fish — Search Console/OpenSEO real** (`7172f2fb-7456-4b35-b581-d9b11c0040f4`, propiedad principal, periodo 2026-08-12–2026-11-12): 587 impresiones en total (ES 428, PT 92, EN 67), 3 clics (ES 2, EN 1), CTR agregada 0,51%. Inspección de las tres URLs: 3/3 enviadas e indexadas, rastreo permitido y exitoso, canonical Google = declarado; mobile usability `VERDICT_UNSPECIFIED`; breadcrumb PASS con un elemento sin nombre. No se confirma error de indexación. Amendoeira: 310 impresiones (ES 195/PT 112/EN 3); al menos tres bloques largos idénticos en PT y EN según el inventario heredado, sin recertificación semántica. Dumaré principal es prioridad siguiente por 648 impresiones (ES 281/PT 148/EN 219), después Amendoeira 310; Dumaré Copa suma 60 (ES 60, sin filas PT/EN reportadas). Impresiones no equivalen a exclusiones ni errores.

**Pruebas y bloqueos:** build incremental en modo selectivo completó 9 de 3.612 documentos; sitemap del candidato tiene 3.588 URLs y su conjunto coincide exactamente con Hostinger (0 altas/0 bajas); manifest 3.612. Canonical propio y alternates ES/PT-BR/EN/x-default; no hay URL FR ni hreflang FR. H1/H2, textos, navegación, tablas, enlaces, mapas, número/URL de imágenes y elementos estructurales se compararon; PT/EN no reutilizan párrafos ES exactos y permanecen 9 `<br>`/`<strong>` correspondientes. Capturas antes/después a 1440 y 390 px guardadas; la prueba de Chromium devuelve `net::ERR_EMPTY_RESPONSE` en las URLs de fotos externas, tanto antes como después. Es un fallo de carga del entorno/origen remoto sin evidencia HTTP 404; por ello queda bloqueada la aprobación visual independiente y no se publica.

`guard_approved_content.mjs`: PASS (586 HTML, 10 assets; 247 alertas de drift histórico). `check_frozen_pages.py`: FAIL heredado idéntico en base y candidato, 247 archivos; no se regeneraron aprobaciones. `audit_multilingual.py`: falla igual en base/candidato con `KeyError: 'lang'` (el manifest expone `language`). `audit_translations.mjs`: falla en ambos por `Invalid dictionary: buzios-approved-blocks.js`. `audit_static.py`: salida idéntica base/candidato (`96bdbe5d…`), 279 alertas/error globales basales, ninguna incidencia adicional identificada en Spicy. No se eludió ningún guard. `node --check` en el builder/diccionario y `git diff --check`: PASS.

**PR #24 y continuidad:** PR #24 sigue draft porque su descripción ordena mantenerlo como borrador; cabeza `586a0e...`, base antigua `9426c42...`, cero reviews, checks previos en success. No añadir lotes a esa rama. PR #36 es el camino de release actualizado sobre producción; sigue privado, no fusionado ni desplegado. La revisión humana independiente de `docs/PUBLISHING_PROTECTION.md` sigue pendiente, y primero debe resolverse la carga de las fotos para completar QA visual.

**Siguiente ejecución:** continuar la tanda desde la fila 15 con `/gastronomia/dumare/` como prioridad por impresiones. Reauditar ES, cotejar diccionarios PT/EN contra cada sección actual, completar FR solo si se valida íntegro, y mantener noindex/sitemap/hreflang correctos. No volver a contar Amendoeira como validada hasta el cotejo semántico.

### Sub-lote Dumaré principal — 15/11/2026; commit de código `09bb8cef5939920fdd644e8635633ce659a984d1`

- Producción Hostinger confirmada: rama `revision/rendimiento-traducciones-81a904c`, HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. El HTML ES de `/gastronomia/dumare/` tiene blob `f2fbca8b8f9d514579d6e48a5e8102bd10d35130`. No se escribió en Hostinger.
- PR #36, rama `release/cervantes-pt-en-20261115`, base de producción `21bb687...`; no fusionado/desplegado. Código Dumaré en sublote nuevo sobre el HEAD remoto actual del PR.
- Recuperación: 19 párrafos del diccionario posicional PT/EN incrustado se asociaron con la sección ES vigente; los índices 7 y 9 y las entradas posteriores se tradujeron editorialmente de forma manual. Se corrigieron también los alts de seis fotos, rótulos de contacto, reserva y navegación. El mapeo no sustituyó ningún diccionario actual completo. No se cambiaron CSS, fotografías, mapa, enlaces, datos comerciales ni widget.
- QA incremental: se renderizaron 3 de 3.612 documentos; la página final tiene 30 párrafos por idioma (26 estáticos y 4 compartidos), cero párrafos PT/EN literalmente idénticos al ES; título/descripción, idioma, H1/H2, alts, anclas, mapa y canonical inspeccionados. Los seis URLs de fotos son iguales a la fuente. Canonical propio y alternates ES/PT-BR/EN/x-default; sin FR en HTML, hreflang ni sitemap. El manifest continúa en 3.612 documentos.
- Sitemap: consultado desde Hostinger en vivo y comparado por URL con el generado: 3.588 y 3.588, mismo conjunto, cero adiciones y cero bajas.
- GSC/OpenSEO proyecto `7172f2fb-7456-4b35-b581-d9b11c0040f4`, propiedad principal, datos finales 2026-08-12–2026-11-12: ES 281 impresiones/1 clic/posición 7,4; PT 148/0/8,8; EN 219/1/9,2; total 648 impresiones/2 clics. Inspección de las 3 variantes: las tres enviadas e indexadas, robots permitidos, fetch exitoso, canonical Google = canonical declarado; rastreo móvil. Breadcrumb PASS con un item sin nombre; mobile usability `VERDICT_UNSPECIFIED`. No se confirma error ni exclusión de indexación. Dumaré Copa es otra ruta distinta (60 impresiones ES).
- Capturas comparativas antes/después a 1440x1000 y 390x844 archivadas en `captures/dumare-pt-en-20261115/`. No se otorga aprobación visual: Playwright bajo `file://` no reproduce las importaciones del sitio servido y el host externo de las fotografías devuelve `net::ERR_EMPTY_RESPONSE`; no hay evidencia HTTP 404. FR no está implementado y la ficha no cuenta como terminada.
- **Estado estricto al corte:** 4 candidatas PT/EN privadas, 0 fichas completas PT/EN/FR verificadas, 0 cambios publicados. El informe de QA está en `QA_DUMARE_PT_EN_20261115.json`; reporte de release pendiente de commit. Próximas: Amendoeira, validación de idioma y accesibilidad de medios para candidatos; no incrementar FR hasta poder revisar la ficha completa.


### Sub-lote Amendoeira — 15/11/2026; candidato privado PT-BR/EN

Se reauditaron la ruta ES vigente y sus variantes PT/EN de producción. PT/EN tenían párrafos aún en español y metadatos no localizados; se añadió diccionario de ruta con recuperación histórica cotejada y suplementos editoriales manuales. El candidato tiene 24 párrafos en cada idioma, H1 único, diez H2 revisados y metadatos localizados. Se conservaron los cuatro URLs de fotografías del bar, el mapa y las URLs de enlaces actuales; además se vuelve a serializar el distintivo Cadastur que aparece en ES y falta en PT/EN actual, una diferencia visible que requiere revisión.

El build selectivo local renderizó 3/3 páginas de idioma; el sitemap candidato/Hostinger tiene 3.588 URLs con conjunto idéntico (FNV-1a ordenado `9fb6b50f1fe8a122`), manifest 3.612. FR no se generó ni se anuncia con hreflang. Capturas 1440/390 creadas, pero no aprobadas: Playwright devolvió `net::ERR_EMPTY_RESPONSE` al cargar medios externos; no es 404 confirmado. La fuente ES tiene blob `b3ed0ef51003d906992bc10b0d086b7304907627` en producción `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`.

GSC 2026-08-12–2026-11-12: 310 impresiones (ES 195/PT 112/EN 3); no se infiere error de indexación. Guard de contenido PASS. Los fallos de frozen-pages (247), auditor multilingual (`KeyError: 'lang'`), auditor translations (`buzios-approved-blocks.js`) y 279 errores/alertas estáticos están presentes en la base; no se modificó manifiesto ni se evitó ningún guard. El reporte y JSON específicos se añaden en este sublote. Candidatas PT/EN privadas en PR #36 ahora: 5; fichas completas PT/EN/FR verificadas en este run: **0/50**; cambios en Hostinger: **0**. Próxima prioridad: `/gastronomia/chama-rio-copacabana/` por 1.062 impresiones, después Plage Café (879), Carretão Lido (616) y Terra Brasilis (596).
