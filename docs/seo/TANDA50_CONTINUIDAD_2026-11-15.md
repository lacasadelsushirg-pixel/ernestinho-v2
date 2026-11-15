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
| 11 | `/gastronomia/don-camillo/` | Producción PT/EN aún conserva párrafos ES; candidato privado PR #36 en d669ae9: 25 párrafos ES/PT/EN, 200/noindex; QA semántico, FR y visual pendiente; no publicado | Hostinger prod 21bb6877; blob ES 1098143db5f08861cb15bf597e09c8c55447da87 |
| 12 | `/gastronomia/bar-do-omar/` | Producción PT/EN aún conserva párrafos ES; candidato privado PR #36 en d669ae9: 26 párrafos ES/PT/EN, 200/noindex; QA semántico, FR y visual pendiente; no publicado | Hostinger prod 21bb6877; blob ES e55472577b72ee0dda7a4c3689f2489898f9941e |
| 13 | `/gastronomia/dumare/` | Preview privado d669ae9: 30 párrafos ES/PT/EN, 200/noindex, canonical propio/alternates ES-PT-EN; FR, QA semántico y visual pendientes; 648 imp. GSC; no publicado | Hostinger prod 21bb6877; blob ES f2fbca8b8f9d514579d6e48a5e8102bd10d35130 |
| 14 | `/gastronomia/spicy-fish/` | Preview privado d669ae9: 29 párrafos ES/PT/EN, 200/noindex, canonical propio/alternates ES-PT-EN; FR, QA semántico y visual pendientes; 587 imp. GSC; no publicado | Hostinger prod 21bb6877; blob ES 6c49d747f9a7a5712a8a4cb7927462bcf44c378d |
| 15 | `/gastronomia/amendoeira/` | Preview privado d669ae9: 24 párrafos ES/PT/EN, 200/noindex, canonical propio/alternates ES-PT-EN; FR, QA semántico y visual pendientes; diferencia Cadastur sigue por revisar; 310 imp. GSC; no publicado | Hostinger prod 21bb6877; blob ES b3ed0ef51003d906992bc10b0d086b7304907627 |
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

Código candidato: `11b3d31bdabe377d2d45aac12bce9edb7614128a`. Continuidad `332a700d`: SHA inaccesible en el checkout (`git rev-parse` no lo encuentra) y búsqueda GitHub remota sin resultados; se partió del HEAD remoto de PR #36 `61a8f0a4a456bb077defdb7274c065c4b2a23e76` sobre producción, sin atribuir trabajo inexistente.

Se reauditaron la ruta ES vigente y sus variantes PT/EN de producción. PT/EN tenían párrafos aún en español y metadatos no localizados; se añadió diccionario de ruta con recuperación histórica cotejada y suplementos editoriales manuales. El candidato tiene 24 párrafos en cada idioma, H1 único, diez H2 revisados y metadatos localizados. Se conservaron los cuatro URLs de fotografías del bar, el mapa y las URLs de enlaces actuales; además se vuelve a serializar el distintivo Cadastur que aparece en ES y falta en PT/EN actual, una diferencia visible que requiere revisión.

El build selectivo local renderizó 3/3 páginas de idioma; el sitemap candidato/Hostinger tiene 3.588 URLs con conjunto idéntico (FNV-1a ordenado `9fb6b50f1fe8a122`), manifest 3.612. FR no se generó ni se anuncia con hreflang. Capturas 1440/390 creadas, pero no aprobadas: Playwright devolvió `net::ERR_EMPTY_RESPONSE` al cargar medios externos; no es 404 confirmado. La fuente ES tiene blob `b3ed0ef51003d906992bc10b0d086b7304907627` en producción `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`.

GSC 2026-08-12–2026-11-12: 310 impresiones (ES 195/PT 112/EN 3); no se infiere error de indexación. Guard de contenido PASS. Los fallos de frozen-pages (247), auditor multilingual (`KeyError: 'lang'`), auditor translations (`buzios-approved-blocks.js`) y 279 errores/alertas estáticos están presentes en la base; no se modificó manifiesto ni se evitó ningún guard. El reporte y JSON específicos se añaden en este sublote. Candidatas PT/EN privadas en PR #36 ahora: 5; fichas completas PT/EN/FR verificadas en este run: **0/50**; cambios en Hostinger: **0**. Próxima prioridad: `/gastronomia/chama-rio-copacabana/` por 1.062 impresiones, después Plage Café (879), Carretão Lido (616) y Terra Brasilis (596).


## Reanudación — preview seguro y auditoría GSC (15/11/2026)

- Producción Hostinger verificada: `revision/rendimiento-traducciones-81a904c` `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; ninguna publicación por este trabajo. `332a700d` inaccesible en refs revisadas.
- PR #24 permanece draft, HEAD `586a0e3457c41071ada753bbf4d1c08484600d25`, base obsoleta `9426c42fc0150bdce5fbfee060396da9de518ac7`; la descripción ordena mantener draft. PR #36 continúa abierto/no draft, base producción `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`, HEAD `f88e1e65671e2ac8e02781cf9317bdfad103d7ee` antes de este checkpoint.
- Vercel ejecutó build full 3.612; cancelado en 200/3.612. Se incorpora configuración Preview `--routes` solo para las cinco rutas activas, esperado 15 HTML (ES/PT/EN), sin sitemap/FR; producción sigue `npm run build`. Verificar el nuevo estado antes de continuar.
- Amendoeira: producción tiene 24 párrafos, uno (resumen) PT y 23 editoriales en ES; título/meta PT ya localizados. El candidato sigue pendiente de francés y QA. GSC final 2026-08-12–2026-11-12: ES 195 impresiones/1 clic/9,6; PT 112/0/9,1; EN 3/0/10,7. Tres variantes «Enviada e indexada», fetch exitoso, canonical coincide.
- Chama Rio: PT 995/3/6,9; EN 67/0/9,6; ES sin fila de impresiones. Inspección ES «Descubierta: actualmente sin indexar», sin fetch/canonical; exclusión observable, no error confirmado. PT/EN indexadas.
- Don Camillo y Bar do Omar PT/EN: las cuatro URLs de inspección «Enviada e indexada», fetch exitoso/canonical coincidente.
- Estado de tanda: 0/50 completas ES/PT-BR/EN/FR con QA aprobado, 0 nuevas publicadas. Retomar la verificación del Preview route-selective en 15 HTML; no añadir ruta nueva ni contar ninguna ficha hasta QA 1440/390, medios/enlaces, contenido, canonical/hreflang y sitemap base sin cambios.


### Corte posterior: verificación real del preview 15/11/2026

PR #36 route-selective, código de preview `7b587a7070e6a3854b2cfa31ce538bcb8a8157d6`; commit de inventario que registra este corte `b8bf385cc5d1afb55fd0dfd0aec745d5f1275c7a`. La rama sigue sobre producción Hostinger `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; Hostinger no recibió cambios.

Las 15 variantes ES/PT/EN de Don Camillo, Bar do Omar, Spicy Fish, Dumaré y Amendoeira responden 200, devuelven `X-Robots-Tag: noindex`, canonical propio y alternates ES/PT-BR/EN/x-default; FR no está enlazado y `/sitemap.xml` no existe en preview. Las URL de fotos del establecimiento coinciden entre ES/PT/EN en las cinco páginas. Se detectaron enlaces generales de Instagram y TikTok presentes en ES que faltan en PT/EN en las cinco; cotejar bloque aprobado antes de corregir.

Hallazgo que bloquea texto: Don Camillo conserva siete párrafos de ES literalmente en PT y EN; Bar do Omar conserva nueve en PT y ocho en EN. Spicy Fish, Dumaré y Amendoeira no tienen párrafos literalmente iguales en la comprobación, pero esto no es prueba de cobertura semántica y siguen sin FR/QA integral. Captura navegador exploratoria fue 1344×928 con imagen de fachada cargada; viewport solicitado 1440 no alcanzado y 390 sigue bloqueado, por lo que QA visual no aprobado.

Estado en la fila 1–50: candidatas PT/EN privadas 5; fichas completas de cuatro idiomas aprobadas **0/50**; cambios publicados en Hostinger **0**. Retomar primero la corrección de traducciones Don/Bar y el cotejo/restauración de enlaces generales aprobados; conservar noindex y no expandir lote hasta QA visual 1440/390, francés completo, sitemap/canonical/hreflang y guard con revisión humana independiente.


### Reanudación — 15/11/2026, verificación del arreglo PT/EN

Se verificó el HEAD remoto de PR #36 y dos nuevos deployments ready. Don Camillo: commit de fix `7e4f3be96c8eefecda88513a4c3073ce43523d46`; Bar do Omar: fix acumulado en HEAD `871e7e13afe0cf5fa93599888b9bd022fc62ba9f`. En el preview acumulativo más reciente, ambas páginas PT/EN ya sustituyen los párrafos estáticos: Don Camillo 25 párrafos por idioma, Bar do Omar 26; 0 coincidencias literales con ES. PT devuelve 200/noindex, y sitemap del preview 404/noindex. Es evidencia de traducción/render parcial, no QA semántico ni ficha completa. **Tanda: 0/50 completas, 0 publicadas;** Don y Bar siguen incompletas por FR/QA semántico/medios-enlaces/capturas 1440/390. Las otras 3 rutas de preview no se reauditaron en este corte. Los registros y el informe individual están actualizados en `PREVIEW_AUDIT_5_RUTAS_20261115.md` y el CSV maestro. No editar producción. Siguiente acción: validar semánticamente Don/Bar y cotejar enlaces de marca contra plantilla aprobada; después completar sus bloques FR completos y ejecutar QA visual a 1440/390, manteniendo francés noindex/ausente de sitemap mientras tanto.

### Reanudación — corte acumulativo de las cinco rutas — 15/11/2026

Verificado sobre preview Vercel Ready del candidato `7a64726f78c02b3165cfe6d63412eaaa31c83db4`: 15/15 respuestas ES/PT/EN HTTP 200, todas `X-Robots-Tag: noindex`; todas con un H1, canonical propio y alternates ES/PT-BR/EN/x-default; no FR. Sitemap del preview 404/noindex. Párrafos estáticos por ES/PT/EN: Don Camillo 25/25/25, Bar do Omar 26/26/26, Spicy Fish 29/29/29, Dumaré 30/30/30, Amendoeira 24/24/24; cero párrafos literales iguales PT/EN vs ES. Conjuntos de URLs de fotos iguales en los tres idiomas. Instagram del local permanece; Instagram de marca Ernestinho y TikTok aparecen en ES pero no en PT/EN; no se alteraron enlaces y falta cotejar contra bloque aprobado. QA semántico, FR y capturas visuales aprobadas 1440/390 pendientes. **0/50 completas; 0 publicadas.** Inventario actualizado en commit `760d9262ee45e5bab93eb7ed82003069f9f1244e`; informe acumulativo en `cdad67491898e063b55efb0b5e943056e972fa8c`. Próximo: continuar semántica/cobertura de las cinco páginas comenzando Don y Bar, luego Francia por fichas completas; mantener private/noindex hasta QA. No reauditar ni repetir generación si el HEAD de PR no cambió.

### Corte actualizado de preview y producción — 15/11/2026, HEAD verificado

- HEAD remoto actual de producción Hostinger: `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. Ningún archivo de esta tanda se publicó en Hostinger.
- PR #36 sigue abierto, no draft y basado en el HEAD de producción; HEAD remoto `d669ae9df3479dda4ea3c50d4095da7701b0fd12`. Deployment Vercel privado listo para este commit. PR #24 sigue abierto y draft: su descripción ordena “Mantener como borrador”; no constan revisores ni checks fallidos que expliquen el estado. No se añadió otro lote a PR #24.
- Comprobación del deployment #36 con fetch autenticado del proveedor: 15/15 variantes ES/PT-BR/EN de las cinco rutas Don Camillo, Bar do Omar, Spicy Fish, Dumaré y Amendoeira devuelven HTTP 200, `X-Robots-Tag: noindex`, un H1, canonical propio y alternates ES/PT-BR/EN/x-default. No se anuncia hreflang francés. `/sitemap.xml` y la ruta FR consultada devuelven 404/noindex. Esto mantiene el candidato fuera de indexación; no equivale a publicación.
- Recuento de párrafos estáticos del candidato, ES/PT/EN: Don Camillo 25/25/25; Bar do Omar 26/26/26; Spicy Fish 29/29/29; Dumaré 30/30/30; Amendoeira 24/24/24. En el candidato de este corte PT y EN no tienen coincidencias literales con los párrafos ES, pero la comprobación literal no certifica sentido ni integridad editorial. Las URLs de fotos coinciden entre idiomas. Siguen pendientes cotejo semántico, revisión de enlaces generales de marca (Instagram/TikTok existen en ES pero faltan en PT/EN), FR completo, QA visual 1440/390 y guard/revisión humana. No alterar esos enlaces sin autorización específica.
- Producción Don Camillo y Bar do Omar conserva párrafos del cuerpo en español en PT/EN: ninguna de las dos fichas es una recuperación visible ya publicada. Inspecciones GSC anteriores de las seis variantes devolvieron “Enviada e indexada”, canonical igual al declarado y rastreo exitoso; no se confirmó un error de indexación.
- Lasaí: producción tiene canonical con barra final; la URL pública sin barra se normaliza a la ruta con barra. GSC periodo 2026-08-12–2026-11-12: slash ES 164 impresiones/2 clics/posición 15,4; EN 34/0/12,0; no-slash ES 30/0/44,4. Las dos inspecciones históricas mostraron cada canonical propio, pero la normalización actual del navegador sugiere que el registro no-slash puede ser histórico; inferencia, no error confirmado. PT tuvo estado previo “detectada, actualmente sin indexar”, exclusión de descubrimiento sin fallo de fetch/canonical confirmado. No se cambió Lasaí.
- Fila 11–15 de las 50 actualizada arriba. Filas 1–10 conservan el QA histórico sin recertificación; filas 16–50 siguen pendientes de auditoría según la tabla, y no se elevan por este corte. Estado estricto: **0/50 fichas completas ES/PT-BR/EN/FR**, **0/50 nuevas publicadas**. Hay cinco rutas PT/EN presentes solo en preview, ninguna cuenta como terminada. Lote abierto; siguiente revisión debe retomar Don/Bar por contenido residual público, completar QA integral del preview y mantener producción sin cambios hasta revisión humana independiente.


## Reanudación — corrección editorial de Don Camillo (15/11/2026)

- HEAD del PR #36: `349186f96e0afad47a59a8ec48f49bd464437390`; producción Hostinger sigue en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. El nuevo deployment Vercel para este SHA está en estado `QUEUED` (`dpl_xqySWop5FuQGWGyASq8QhJow45k9`); por eso no se declara todavía verificado en preview y no cuenta como publicación.
- Se cotejaron los textos completos y encabezados ES/PT-BR/EN de Don Camillo y se corrigieron traducciones PT/EN para evitar calcos, no exagerar la relación calidad-precio y restituir la advertencia de horarios/entradas del Forte de Copacabana. Se precisaron el acceso a la tabla y el tono de conversación tranquila. Sin cambios en fotos, mapa, layout, enlaces ni datos comerciales.
- Build local selectivo con `scripts/build_multilingual.mjs --routes=/gastronomia/don-camillo/`: procesó 3 documentos de 3.612; no ejecutó una reconstrucción de todo el sitio ni generó sitemap. Las tres variantes ES/PT/EN conservan `lang`, un H1, título/descripción localizados y canonical propio; tienen 25 párrafos cada una. Los conjuntos de URLs de fotos y mapa coinciden entre idiomas y los alt de imagen no están vacíos. Comprobaciones de sintaxis y `git diff --check` pasan.
- El guard `guard_approved_content` pasa (586 HTML y 10 assets protegidos). `check_frozen_pages.py` falla con salida idéntica a producción y candidato, heredada de 247 archivos; no se eludió ni se recalcularon aprobaciones. La ruta de release permanece bloqueada por ese gate heredado, más el requisito de revisión humana independiente.
- En PT/EN sigue faltando el bloque general de enlaces sociales de marca a Instagram/TikTok que aparece en ES. Se reprodujo en el render; el inicializador compartido omite un contenedor vacío. No se modificó el componente ni los enlaces aprobados; requiere decisión/corrección con alcance y QA propios.
- El deployment actual sigue en cola, así que la corrección aún no se ha comprobado remotamente ni visualizado. FR, capturas aprobadas a 1440 y 390 px, QA integral restante y revisión independiente siguen pendientes. Hostinger intacto.
- Estado estricto de esta tanda: **0/50 fichas completas**, **0/50 publicadas**. Don Camillo sigue en revisión; Bar do Omar no tuvo una nueva revalidación en este corte. Próximo: volver a consultar el deployment de `349186f...`; validar la corrección servida y luego resolver el bloque de enlaces sin ampliar alcance. Después completar FR editorial y QA por ficha; no avanzar el contador por código aún no servido.


## GSC e inspección de indexación — actualización 15/11/2026

OpenSEO/Search Console, propiedad verificada `https://www.ernestinhocarioca.com.br/`, tipo web, fechas finales 2026-08-12 a 2026-11-12 (hora del Pacífico). Las cifras son datos de rendimiento, no errores de cobertura:

| Ruta | ES imp./clics/pos. | PT-BR imp./clics/pos. | EN imp./clics/pos. | Total imp. |
|---|---:|---:|---:|---:|
| Don Camillo | 82 / 0 / 11,5 | 98 / 2 / 7,1 | 37 / 0 / 11,3 | 217 |
| Bar do Omar | 225 / 0 / 12,9 | 75 / 1 / 8,7 | 18 / 0 / 7,3 | 318 |
| Spicy Fish | 428 / 2 / 7,6 | 92 / 0 / 7,3 | 67 / 1 / 7,9 | 587 |
| Amendoeira | 195 / 1 / 9,6 | 112 / 0 / 9,1 | 3 / 0 / 10,7 | 310 |
| Dumaré | 281 / 1 / 7,4 | 148 / 0 / 8,8 | 219 / 1 / 9,2 | 648 |

Inspección GSC actual de las seis URLs ES/PT/EN de Don Camillo y Bar do Omar: las seis devuelven `PASS`, “Enviada e indexada”, `SUCCESSFUL`, `INDEXING_ALLOWED`; las seis tienen canonical de Google igual al declarado. Últimos rastreos disponibles: Don ES 2026-10-22, PT 2026-10-06, EN 2026-10-23; Bar ES 2026-10-05, PT 2026-10-06, EN 2026-10-05 (UTC). Esto descarta un error confirmado de indexación en esas variantes, no demuestra que Google haya recibido las correcciones privadas de PR #36. No se solicitó indexación.

El deployment del SHA de código `349186f96e0afad47a59a8ec48f49bd464437390` continúa `QUEUED`; no se repitió un lote de navegador con HTML no confirmado. Las correcciones siguen solamente en rama/PR y producción no cambió. El estado estricto sigue **0/50 completas, 0/50 publicadas**.


## Bloqueo de preview y estado de checks — 15/11/2026

- El status combinado del HEAD de código `349186f96e0afad47a59a8ec48f49bd464437390` apunta a un deployment Vercel todavía `QUEUED`. El HEAD documental vigente `8ff4f1f4c105cdb266d510e962539d1f5253df1a` tiene check Vercel `failure`, enlace de resultado con parámetro `build-rate-limit`. No hay build log disponible para ese deployment ni HTML servido para el fix.
- El fetch autorizado del host del deployment privado devolvió 302 hacia `/sso-api`, código `deployment_authentication_required`: Vercel Authentication rechazó el share link reutilizado. No se reintentó el mismo mecanismo. El preview del HEAD de código no se considera visto ni aprobado.
- El status de PR #24 en su HEAD consultado solo muestra Vercel `success`; sigue draft porque su cuerpo dice explícitamente “Mantener como borrador”. PR #36 es un PR de release abierto, sin reviewers solicitados, cuyo HEAD actual tiene el bloqueo Vercel anterior. No es un candidato listo para la revisión final todavía.
- Producción Hostinger sigue en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; el HTML público no incluye la corrección de Don Camillo. No se desplegó ni se pidió indexación.
- Acción siguiente: esperar el desbloqueo de cuota de builds o resolverlo mediante el canal de Vercel autorizado; luego inspeccionar el deployment del commit vigente con acceso funcional. Hasta entonces, no contar Don Camillo como servido, QA finalizado ni publicado. **0/50 completas; 0/50 publicadas.**


## Reanudación — Bar do Omar: traducción de datos estáticos (15/11/2026)

Al revisar el HTML generado del candidato, detecté cinco valores de la tabla práctica que seguían en español en PT/EN aunque los párrafos estuvieran traducidos: horarios/agenda, rango de precio, tipo de servicio, contacto y consulta para grupos/eventos. Se añadieron traducciones PT/EN en `bar-do-omar-release.js`; no se modificaron etiquetas visuales, datos de negocio, contenido ES, enlaces, mapa, imágenes ni widgets.

Validación local con el código idéntico al commit remoto `48d73afda63d1d619d909b712aac9cc82140a3a8`: `node --check`, `git diff --check` y build selectivo pasan; renderizó 3 de 3.612 documentos. Las cinco cadenas de datos prácticos esperadas aparecen traducidas en PT y EN (5/5 cada idioma); siguen 26 párrafos por variante y el guard de contenido reportó 586 HTML sin cambios aprobados y 10 assets fijados. El status Vercel del commit `48d73af...` es `failure` por `build-rate-limit`; no hay deployment nuevo, así que no se confirma por preview.

La captura local con Chromium tampoco pudo ejecutarse: el proceso abortó en `socket() failed: Operation not permitted` (y ptrace no permitido). Sin capturas aprobadas a 1440/390. No se vuelve a intentar el mismo modo del navegador. Además permanecen FR editorial, verificación remota, los enlaces de marca Instagram/TikTok ausentes en PT/EN y revisión humana independiente. El lote queda en **0/50 completas y 0 publicadas**; producción Hostinger sin cambios.

Próximo trabajo: usar un mecanismo de preview autorizado distinto cuando Vercel libere el build rate limit, validar el HTML exacto de `48d73af...`, inspeccionar también las tablas estáticas de Don Camillo y completar FR/QA visual por ficha. No repetir commits de build mientras el límite esté activo.


## Hallazgo de renderizado pendiente — Don Camillo (15/11/2026)

El build local selectivo de Don Camillo vuelve a confirmar que los párrafos PT/EN no tienen coincidencias literales con ES y que el encabezado/SEO estructural se conserva. Sin embargo, una leyenda de la galería sigue visible en español en las dos variantes: “El deck mantiene contacto directo con la Avenida Atlántica.” aunque la clave PT/EN ya exista en el diccionario de texto. El renderer de párrafos y el de texto visible no aplican esa clave a `figcaption` durante la generación. No se modificó el renderer compartido ni el contenido de fotos porque la solución afectaría fuera del alcance de una sola ficha. Don Camillo queda **bloqueada para QA completo** hasta corregir y volver a renderizar esa leyenda; FR también pendiente. El dato no altera el total: 0/50 completas, 0 publicadas.


## Precisión de clasificación — leyenda Don Camillo (15/11/2026)

La frase de la leyenda de galería que el build estático deja en español también aparece como clave con valor PT y EN dentro del inicializador lingüístico emitido. La inspección del archivo estático, por sí sola, **no demuestra** que el navegador la muestre en español tras ejecutar ese script. Retiro la afirmación de “error de renderizador confirmado”: estado correcto = **renderizado visible sin confirmar**. La falta de Chromium/preview impide decidirlo; mantener QA de Don abierto hasta una comprobación visual autorizada. No se modifica la traducción ni se cambia el alcance.


## Hostinger: contenido público frente a candidatos (15/11/2026)

Leí directamente los HTML del document root Hostinger (`pt/` y `en/`) de Don Camillo y Bar do Omar. El título y meta están localizados en ambas fichas, pero el cuerpo publicado aún no muestra el trabajo nuevo del PR. Al comparar párrafos normalizados por índice contra ES en los archivos vivos, encontré coincidencias literales ES/PT/EN: Don Camillo **7/25 PT y 7/25 EN**; Bar do Omar **9/26 PT y 8/26 EN**. Estas cifras cuentan solamente coincidencias exactas, no todos los calcos parciales ni estimación de calidad. Las seis variantes siguen indexadas en GSC con canonical propio y fetch exitoso. La rama de producción confirmada continúa en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; las correcciones de PR #36 no están en esos HTML. Candidato privado ≠ cambio visible; **0/50 completas, 0 publicadas**.


## Continuación de la tanda — verificación del HTML de preview

- Progreso de revisión de esta tanda: Don Camillo y Bar do Omar retomadas primero (**2 fichas con avance PT/EN comprobado en preview**, 48 URL de la lista sin recertificar en esta ejecución); estado de cierre estricto **0/50 completas** porque FR, QA semántico completo y capturas aprobadas siguen pendientes.
- Deployment READY consultado: SHA `846de45ab8cdcbaf58f26dd7bf97e30feb29870b`, preview `ernestinho-v2-310j203j0-lacasadelsushirg-8125.vercel.app`. El SHA es anterior al HEAD actual `337e5213ebf4937548595a39902b5e869ecec381`; comparación GitHub confirma que los cinco commits entre ambos tocaron solo los dos documentos SEO, no código. El check del HEAD actual, aun así, falla `build-rate-limit`.
- Fetch autenticado de Vercel para las 6 rutas ES/PT/EN de Don Camillo y Bar do Omar: HTTP 200; las cuatro variantes PT/EN incluyen `X-Robots-Tag: noindex`. El HTML de respuesta lleva título en idioma correcto, H1 de la ficha y canonical propio. Conteo de párrafos en respuesta: Don 25/25 en ES/PT/EN y cero coincidencias exactas PT/EN contra ES; Bar 26/26 y cero coincidencias exactas. Primer párrafo PT de Don: “Uma trattoria mediterrânea na avenida mais famosa do Rio...” y EN: “A Mediterranean trattoria on Rio’s most famous avenue...”; Bar PT/EN también devuelve cuerpo traducido. Esto confirma salida HTML del candidato privado, no screenshots de navegador/DOM post-hidratación ni aprobación de visuales 1440/390.
- No se inspeccionaron FR ni todos los links/widgets; faltan traducción FR integral, revisión editorial semántica humana, capturas 1440/390 y revisión independiente. Hostinger producción `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346` sin cambios; **0 publicadas**.
- Siguiente paso durable: habilitar/obtener el build del HEAD exacto cuando Vercel quite el límite de build (sin cambiar protección), después QA visual y FR de Don/Bar antes de pasar al siguiente bloque de prioridad. Las métricas GSC e inspección de indexación ya quedaron en el informe de auditoría y en el CSV.


## QA visual comparativo — 15/11/2026

Revisión real de capturas 390 px before/after de Don Camillo PT y Bar do Omar EN: el selector global y el de ficha aparecen duplicados; avatar flotante y controles volver/compartir cubren parte del hero. Los mismos solapamientos están en before y after; no son una regresión atribuible a la traducción. El hero aparece sin fotos en las capturas; los JSON registran `net::ERR_EMPTY_RESPONSE` en recursos remotos, no 404. Se conserva el layout, widgets, enlaces y fotos y no se intenta corregir un componente protegido sin autorización específica. Las capturas no aprueban QA visual hasta repetir con imágenes cargadas y evaluación humana. Sigue: **2/50 con avance PT/EN parcial; 0/50 completas; 48 sin recertificar; 0 publicadas**.


## Continuación — cinco candidatas priorizadas verificadas en HTML/GSC

Se atendieron primero Don Camillo y Bar do Omar; se extendió la verificación a Spicy Fish, Amendoeira y Dumaré según prioridad de impresiones. Las cinco páginas tienen ES/PT/EN en preview privado con 200/noindex, canonical por ruta, conteos de párrafos completos y cero coincidencias literales PT/EN contra ES (Don 25; Bar 26; Spicy 29; Amendoeira 24; Dumaré 30). GSC inspeccionó las 10 variantes PT/EN de esas cinco: las diez están enviadas e indexadas, con Google canonical igual al declarado, robots permitido y fetch exitoso. Esto no confirma semántica editorial ni equivalencia visual y no cubre FR.

Tally de etapa: **5/50 fichas con PT/EN de preview estructuralmente verificado; 0/50 completas; las otras 45 aún no se revalidaron en este corte; 0 publicadas**. La tabla inicial conserva las 50 URL y su referencia de estado histórico; no heredar “validada” en esta ejecución sin comprobar la ficha. GSC de rendimiento y estado de indexación separados en `docs/seo/PREVIEW_AUDIT_5_RUTAS_20261115.md`; maestro cuatro idiomas actualizado. SHA de trabajo de código que presenta estas 5 respuestas: `846de45ab8cdcbaf58f26dd7bf97e30feb29870b`; commits posteriores documentan solamente; último HEAD del PR debe refrescarse tras el siguiente update.


## Cola activa de la tanda 50 — 50 URL y estado inventariado (15/11/2026)

Corte de priorización: Search Console final, 2026-10-16–11-12, páginas de Gastronomía, 456 URLs con datos. Primero se retoman Don Camillo y Bar do Omar; se añaden Spicy Fish, Amendoeira y Dumaré; el resto se ordena por impresiones agregadas ES/PT-BR/EN y se limita a rutas incompletas del maestro actual. Los códigos ES/PT/EN/FR en la tabla son los estados del inventario al HEAD documental `b52657fc09b925c4eb9a486e3473cc8185095fe2`: V=Validado históricamente, P=Pendiente, R=En revisión, C=Corregido/traducido sin QA final, A=auditado parcial. Las rutas 6–50 **no se recertificaron en este run**; no declarar QA ni publicación desde la etiqueta histórica. Todos los 50 pertenecen a producción `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; solo las cinco primeras tienen candidato privado consultado en deployment `846de45ab8cdcbaf58f26dd7bf97e30feb29870b`.

| # | URL | ES/PT/EN/FR inventario | GSC 28d impresiones / clics | Estado de esta ejecución |
|---:|---|---|---:|---|
| 1 | https://www.ernestinhocarioca.com.br/gastronomia/don-camillo/ | A/U/U/P | 134 / 1 | Auditada en Hostinger. ES/PT/EN 25 párrafos; PT 7/25 y EN 7/25 literalmente ES; títulos traducidos. GSC 134 imp/1 clic PT. ES/PT/EN indexadas, fetch/canonical propios; FR desconocida. No completa. ES HTML blob 1098143db5f08861cb15bf597e09c8c55447da87; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 2 | https://www.ernestinhocarioca.com.br/gastronomia/bar-do-omar/ | A/V/V/P | 220 / 1 | Auditada en Hostinger. ES/PT/EN 25 párrafos; PT 8/25 y EN 7/25 literalmente ES; títulos traducidos. GSC 220 imp/1 clic PT. ES/PT/EN indexadas, fetch/canonical propios; FR desconocida. No completa. ES HTML blob e55472577b72ee0dda7a4c3689f2489898f9941e; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 3 | https://www.ernestinhocarioca.com.br/gastronomia/spicy-fish/ | A/U/U/P | 381 / 2 | Auditada producción: PT y EN conservan 8/29 párrafos literales ES; GSC 381 imp/2 clics; 3 variantes indexadas. FR, alt/semántica y QA visual pendientes; no completa. ES HTML blob 6c49d747f9a7a5712a8a4cb7927462bcf44c378d; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 4 | https://www.ernestinhocarioca.com.br/gastronomia/amendoeira/ | A/P/P/P | 195 / 1 | Auditada producción: PT 11/24 y EN 9/24 párrafos literales ES; GSC 195 imp/1 clic; 3 variantes indexadas. FR y QA pendientes; no completa. ES HTML blob b3ed0ef51003d906992bc10b0d086b7304907627; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 5 | https://www.ernestinhocarioca.com.br/gastronomia/dumare/ | A/U/U/P | 521 / 2 | Auditada producción: PT/EN 11/30 párrafos literales ES; títulos PT/EN con marcas residuales; 6 alts con marcas ES. GSC 521 imp/2 clics; 3 variantes indexadas. FR pendiente; no completa. ES HTML blob f2fbca8b8f9d514579d6e48a5e8102bd10d35130; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 6 | https://www.ernestinhocarioca.com.br/gastronomia/chama-rio-copacabana/ | ES GSC descubierta; PT/EN live e indexadas; FR ausente | 1.062 / 3 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: 5aab4304cd65e8006a7e9e410f0903495c3ef6be. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 7 | https://www.ernestinhocarioca.com.br/gastronomia/carretao-siqueira/ | ES indexada; PT descubierta/no indexada; EN desconocida; FR ausente | 991 / 5 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: 6cbdf907f1a363efbeb47e869215900b1fe8d2a6. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 8 | https://www.ernestinhocarioca.com.br/gastronomia/plage-cafe/ | ES/PT/EN presentes en Hostinger y GSC indexadas; texto ES residual en PT/EN (1 párrafo EAV, 6 alts de foto por variante); FR ausente; no completa | 869 (ES 267/PT 505/EN 97) | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: 7b18104abae1dcb68821af4663dafa6049206bf7. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 9 | https://www.ernestinhocarioca.com.br/gastronomia/sushi-leblon/ | ES/PT indexadas; EN descubierta/no indexada sin causa técnica declarada; PT/EN tienen 31 párrafos sin coincidencia literal con ES, pero un alt de foto sigue en español; FR ausente; no completa | 523 (ES 474/PT 49/EN sin filas) | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: f0960038eed49af92dfaf2c9618b88b30dbc0395. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 10 | https://www.ernestinhocarioca.com.br/gastronomia/zaza-bistro-tropical/ | ES/PT/EN GSC indexadas; PT/EN retienen 8 párrafos y 9 alts en ES; sets de enlaces difieren; FR ausente; no completa | 481 (ES 393/PT 55/EN 33) | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: 3c81194462752ddc241b1cad847785ef44b5ec4a. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 11 | https://www.ernestinhocarioca.com.br/gastronomia/terra-brasilis/ | P/P/P/P | 451 / 3 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: 1c3f6149742b62e50d233ef57f6b37dd8237d0fd. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 12 | https://www.ernestinhocarioca.com.br/gastronomia/carretao-lido/ | ES/PT/EN GSC indexadas; PT conserva 7 párrafos ES, EN 6; 8 alts y 12 enlaces de navegación siguen pendientes; FR ausente | 447 (ES 400/PT 28/EN 19) | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: fe48ac0c9ad39cbf3be490dc32c1e96010c29487. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 13 | https://www.ernestinhocarioca.com.br/gastronomia/cais-do-oriente/ | ES/PT/EN GSC indexadas; 9 párrafos PT/EN idénticos a ES, 7 alts en ES, título PT/EN redundante; FR ausente | 121 (ES 28/PT 17/EN 76) | Auditada producción: PT/EN 9/18 párrafos literales ES; 7 alts ES y título PT/EN redundante. GSC 121 imp/1 clic, variantes indexadas. FR pendiente; no completa. ES HTML blob 05e264793f8596559c400d7c410dc4064cda7e54; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 14 | https://www.ernestinhocarioca.com.br/gastronomia/galeto-sats/ | P/P/P/P | 360 / 4 | Auditada producción: botón visible “Translation results”; 19/25 párrafos PT con marca de traducción, 15/25 EN y 2 párrafos EN literales ES. GSC 360 imp/4 clics. FR/semántica/visual pendientes; no completa. ES HTML blob 8c3ae87d894901f7cc85e1a9978c336effe9d177; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 15 | https://www.ernestinhocarioca.com.br/gastronomia/haru/ | P/R/R/P | 313 / 0 | Auditada producción: 9/23 párrafos PT y EN iguales ES. GSC 313 imp, sin clics; PT/EN recientes por debajo del periodo anterior. FR pendiente; no completa. ES HTML blob 6f897d6c60ca36d476d916d93d9e8b9ae25d1f97; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 16 | https://www.ernestinhocarioca.com.br/gastronomia/aprazivel/ | P/R/R/R | 272 / 0 | Auditada producción: 9/23 párrafos PT/EN literales ES; EN title vacío y 9 alts con marcas ES. GSC 272 imp. FR pendiente; no completa. ES HTML blob 3c03174a60b9f5a6a7d472a2bbab0c01fa78a412; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 17 | https://www.ernestinhocarioca.com.br/gastronomia/churrascaria-palace/ | P/R/R/R | 263 / 0 | Auditada producción: PT/EN 1/21 párrafos literales ES. PT aparece “Descubierta: actualmente sin indexar” sin fallo fetch/crawl observado; exclusión, no error confirmado. GSC 263 imp; FR pendiente. ES HTML blob c5fb0bbb0ae6f528af3d33b398d4a69c39794aa0; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 18 | https://www.ernestinhocarioca.com.br/gastronomia/frontera-ipanema/ | P/R/R/P | 254 / 1 | Auditada producción: PT/EN 8/26 párrafos literales ES. GSC 254 imp/1 clic, variantes indexadas. FR pendiente; no completa. ES HTML blob 94626d30d9afd92e49c049c324303228c1c81918; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 19 | https://www.ernestinhocarioca.com.br/gastronomia/temperarte-posto6/ | P/R/R/P | 241 / 1 | Auditada producción: 29 párrafos; 0 coincidencias literales ES/PT/EN; EN URL detectada pero no indexada, sin fallo fetch/crawl. GSC 241 imp/1 clic. Semántica/FR/QA pendientes. ES HTML blob 775dbd2edb1656bfd846f3d4f9ed37ccbd2892a7; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 20 | https://www.ernestinhocarioca.com.br/gastronomia/colombo-do-forte/ | P/R/R/R | 238 / 2 | Auditada producción: PT 10/21 y EN 10/21 párrafos literales ES; 4 alts ES. GSC 238 imp/2 clics, variantes indexadas. FR pendiente. ES HTML blob 9f2499455a34a28a49a0773e6ae0bab3a02d4cbf; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 21 | https://www.ernestinhocarioca.com.br/gastronomia/faenza-copacabana/ | R/C/C/C | 224 / 0 | Auditada producción: PT/EN 10/30 párrafos literales ES. GSC 224 imp, variantes indexadas. FR pendiente. ES HTML blob 110642f3335541a84cfba4f1fe3426912b16768f; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 22 | https://www.ernestinhocarioca.com.br/gastronomia/maska/ | P/R/R/R | 221 / 0 | Auditada producción: PT 10/33 y EN 9/33 párrafos literales ES; 1 alt ES. GSC 221 imp, variantes indexadas. FR pendiente. ES HTML blob 498e10c390f3a116d42b114b145f312124ebf8dd; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 23 | https://www.ernestinhocarioca.com.br/gastronomia/oteque/ | P/R/R/R | 210 / 0 | Auditada producción: PT 11/30 y EN 10/30 párrafos literales ES. GSC 210 imp, variantes indexadas. FR pendiente. ES HTML blob 9129914e9b78ceaa06301cd7e5fcbe12326901f7; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 24 | https://www.ernestinhocarioca.com.br/gastronomia/cipriani/ | P/P/R/P | 208 / 3 | Auditada producción: texto “Translation results” en PT y EN; PT 19/25, EN 10/25 marcados; 4 párrafos EN literales ES, alts ES. GSC 208 imp/3 clics, variantes indexadas. No completa. ES HTML blob 411f957b5da94bd0538ec512de661c723f4e8e31; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 25 | https://www.ernestinhocarioca.com.br/gastronomia/temperarte-bolivar/ | P/R/R/P | 197 / 0 | Auditada producción: 30 párrafos; 0 literal ES/PT/EN (sin QA semántico), 6 alts marcados ES. GSC 197 imp, variantes indexadas. FR/QA pendientes. ES HTML blob f8ce4e0f177997995a758aca7574908baf78a348; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 26 | https://www.ernestinhocarioca.com.br/gastronomia/casa-mohamed/ | P/R/R/P | 122 / 1 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: 834f65a78f2ba7e39312f87e6ea777c41834d09b. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 27 | https://www.ernestinhocarioca.com.br/gastronomia/merci/ | P/P/P/P | 193 / 2 | Auditada producción: title vacío ES/PT/EN; PT/EN 1/15 párrafos literales ES; 8 imágenes por idioma. GSC 193 imp/2 clics, variantes indexadas. No completa. ES HTML blob 97e8f123f1f5fe3c5a26e063b18680127a5ac768; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 28 | https://www.ernestinhocarioca.com.br/gastronomia/cafe-lamas/ | P/R/R/R | 183 / 0 | Hostinger producción: 29 párrafos y 14 H2/H3 ES/PT/EN; titles/meta localizados; 12/12 alt iguales ES/PT/EN. GSC 183 imp/0 clics; 3 variantes indexadas con fetch/canonical propios. FR desconocida; no completa. ES HTML blob 269e8e674e03122137909a0b4ce78675f8ae0d6f; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 29 | https://www.ernestinhocarioca.com.br/gastronomia/lasai/ | U/U/U/P | 180 / 2 | Hostinger producción: 18 párrafos, 11 subheads, 12 imágenes ES/PT/EN; cuerpo y títulos localizados; muestra de alt PT aún en ES. GSC 162 imp/2 clics; ES/EN indexadas, PT URL desconocida para Google (no error confirmado); FR desconocida. ES HTML blob 95d467b7b6652323ae7f4a26c0feb88c88fec9a4; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 30 | https://www.ernestinhocarioca.com.br/gastronomia/tacaca-do-norte/ | P/R/R/P | 180 / 0 | Hostinger producción: PT 9/21 y EN 9/20 párrafos literales ES; titles/subheads localizados; sets de URLs de fotos iguales (15 ocurrencias ES, 14 PT/EN). GSC 180 imp/0 clics; ES/PT/EN indexadas/fetch/canonical propios; FR desconocida. No completa. ES HTML blob a626af38b86903322ba8b7f6e84e68cdda33e5ce; producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. |
| 31 | https://www.ernestinhocarioca.com.br/gastronomia/cervantes-copacabana/ | A/P/P/P | 176 / 1 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: abdc48e525942bf73fe72daefee731ea38819bf4. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 32 | https://www.ernestinhocarioca.com.br/gastronomia/rotisseria-sirio-libanesa/ | R/C/C/C | 176 / 0 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: c0934b90f225b95e04592f9549dd0e37ca821925. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 33 | https://www.ernestinhocarioca.com.br/gastronomia/guacamole-copacabana/ | P/P/P/P | 169 / 1 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: a08313c70caf9646590de9fea5ea53b7094e1034. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 34 | https://www.ernestinhocarioca.com.br/gastronomia/churrasqueira-rio/ | P/R/R/R | 166 / 0 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: 5018c17b722e2bb1cb7d65ae73214243ed8295f2. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 35 | https://www.ernestinhocarioca.com.br/gastronomia/garota-de-ipanema/ | P/R/R/P | 165 / 0 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: a2d8617b16ec407f38cb69d9563a052e99ccd295. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 36 | https://www.ernestinhocarioca.com.br/gastronomia/bar-urca/ | P/R/R/P | 164 / 1 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: 01f276c0689bb5d869999a92da8e7d93b7d6b785. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 37 | https://www.ernestinhocarioca.com.br/gastronomia/polis-sucos/ | P/R/R/P | 161 / 0 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: 79fee661887876e6b21755854a8f21b1f53d139f. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 38 | https://www.ernestinhocarioca.com.br/gastronomia/feira-sao-cristovao/ | P/R/R/P | 160 / 2 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: dea40048e9a5d39fc77b7c29016b3f88f9ea2f60. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 39 | https://www.ernestinhocarioca.com.br/gastronomia/la-bicyclette/ | P/R/R/P | 148 / 0 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: 82631de53f3a33c2d67487ba563abd91e5baafbd. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 40 | https://www.ernestinhocarioca.com.br/gastronomia/chez-claude/ | A/P/P/P | 146 / 0 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: 2e77c8f11c2d850bae3074dfbcc47ee965c42746. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 41 | https://www.ernestinhocarioca.com.br/gastronomia/stalos/ | P/R/R/P | 145 / 0 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: 34d677468e2a5b07c7b8055238a344bda86478eb. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 42 | https://www.ernestinhocarioca.com.br/gastronomia/giuseppe-mar/ | P/R/R/P | 142 / 0 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: 318a57e414fc9fa64006343020e4fbbf064a1d4f. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 43 | https://www.ernestinhocarioca.com.br/gastronomia/aipo-aipim-391/ | P/R/R/P | 141 / 0 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: db591ebfddae31ecef0c5cf17ee39b28becabe09. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 44 | https://www.ernestinhocarioca.com.br/gastronomia/hollandaise/ | P/R/R/P | 137 / 0 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: 0f57ab5a0c0f56d4b17f181c56ce93838f239376. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 45 | https://www.ernestinhocarioca.com.br/gastronomia/mocellin-steak/ | P/R/R/P | 134 / 0 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: 3553279f2696fd6b2f913d0adba0d0e4904ac9f9. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 46 | https://www.ernestinhocarioca.com.br/gastronomia/jobi/ | P/R/R/P | 132 / 1 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: 228f39e151ad55c8be9077423e0950acfcab64a5. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 47 | https://www.ernestinhocarioca.com.br/gastronomia/stambul-copa/ | P/R/R/P | 130 / 0 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: b317ce518b57df93758020ee5d3001e44d0316cb. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 48 | https://www.ernestinhocarioca.com.br/gastronomia/oro/ | P/R/R/P | 129 / 0 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: b14c975bf22457c77dd3702662509a9460b287ed. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 49 | https://www.ernestinhocarioca.com.br/gastronomia/sel-ipanema/ | P/R/R/P | 129 / 0 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: 9c1f030f233f00ecf601f679170b0bf6c46ce84e. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |
| 50 | https://www.ernestinhocarioca.com.br/gastronomia/joaquina/ | P/R/R/P | 124 / 0 | No recertificada en este corte; SHA ES verificado en ref de producción 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346: c8ba68361265cdf3083438493a7dff1ddd9505da. PT/EN/FR, contenido y QA siguen pendientes; no se cuenta como completa. |

Contabilidad del lote al cierre: 5/50 con candidato PT/EN estructuralmente comprobado, 0/50 completas bajo las condiciones PT/EN/FR + QA integral, y 0 publicadas. Las otras 45 siguen en la lista con estados explícitos, sin certificación nueva. Punto de continuación: avanzar de la fila 6 hacia abajo por GSC; si se bloquea una ruta, documentar el bloqueo y seguir con la siguiente elegible.


## Checkpoint durable al cierre de esta ejecución — 15/11/2026

- Producción GitHub `revision/rendimiento-traducciones-81a904c`: `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; la rama se volvió a consultar al cierre. Hostinger se consultó en modo lectura: Don Camillo PT/EN y Bar do Omar PT/EN siguen sirviendo la versión pública sin las correcciones candidatas; no se subió archivo ni se publicó nada.
- PR #36, rama `release/cervantes-pt-en-20261115`: HEAD documental `e1d103f13303c027a761904c6212ce926d5bc4f0`, base exacta de producción; abierto, no draft, 83 archivos. Check Vercel actual: `failure`, destino de límite `build-rate-limit`. No se forzó CI ni se eludió el guard.
- PR #24 continúa draft: su descripción pide literalmente “Mantener como borrador”; base antigua `9426c42fc0150bdce5fbfee060396da9de518ac7`. El PR #36 es el camino basado en producción, pero sus 83 archivos no son todavía un PR pequeño listo para aprobación/release.
- Tanda activa: 50 URLs únicas de fichas. Filas 1–5 PT/EN solo comprobadas estructuralmente en preview privado/noindex; filas 6–50 pendientes de recertificación. Las filas 13 y 26 son ahora fichas reales (Cais do Oriente y Casa Mohamed), no categorías. Inventario maestro: `e1d103f13303c027a761904c6212ce926d5bc4f0`, 1.204 registros + encabezado, 14 columnas RFC4180.
- Métricas OpenSEO/GSC final (2026-10-16–11-12) para la prioridad #6 Chama Rio: 1.062 impresiones / 3 clics agregados por idioma; está pendiente de auditoría de contenido. Siguiente en orden: fila 6 `/gastronomia/chama-rio-copacabana/`, luego fila 7 Carretão Siqueira. No marcar ruta validada hasta cotejo editorial y verificación completa.
- Estado estricto: **5/50 PT/EN estructuralmente comprobadas en preview, 0/50 completas en cuatro idiomas y QA integral, 0/50 publicadas**. Francés sigue fuera de sitemap y sin hreflang nuevo.



## Recuento independiente de producción en Hostinger — 15/11/2026

Lectura en Hostinger de `sitemap.xml` y `locale-manifest.json` bajo el document root del dominio. El manifiesto declara `sourceCommit=21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`, que coincide con el HEAD remoto de `revision/rendimiento-traducciones-81a904c`. Recuento de las etiquetas `<loc>`: **3.588 URLs únicas**, ES 1.196, PT-BR 1.196 y EN 1.196. Recuento deduplicado de `route` en el manifiesto: **3.612 rutas únicas generadas**; cabecera: 1.204 documentos fuente, 1.196 indexables por idioma y 3.612 generadas. El sitemap tiene 14.352 alternates (3.588 por hreflang `es`, `pt-BR`, `en` y `x-default`), **cero alternates FR y cero rutas /fr/**. Esto confirma la referencia actual; no demuestra que rutas individuales estén traducidas correctamente.

El candidato del PR #36 sigue fuera de Hostinger. Su HEAD documental `e60e60854425e355a97424ccb6f27f471c2df486` está basado en producción, pero el status Vercel está en failure por `build-rate-limit`. Mantener sin cambios los recuentos publicados hasta que una publicación autorizada se complete y Hostinger vuelva a verificarse.


## Revalidación del check tras guardar el inventario — 15/11/2026

El último commit documental actualizó la cobertura global del CSV. PR #36 HEAD ahora es `5807d842ce724f014d8af11c3d1de9ac7c426033` sobre producción `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. Su check Vercel figura **pending** en la reconsulta, con destino `5ECp5QG9B8BF68Z6XUREvNtwJLd1`; el fallo `build-rate-limit` se observó en los HEAD anteriores `e60e608...` y `a557bc7...`, no se debe atribuir como resultado final del nuevo intento hasta que el check concluya. No se inició ningún bypass ni publicación.

Hostinger mantiene manifest sourceCommit y sitemap en la base de producción. Recuento confirmado: 3.588 URL únicas (1.196 por idioma) y 3.612 rutas únicas generadas; ningún FR indexable ni alternate FR. Tanda: tabla de 50 locales, 5 candidatos PT/EN en preview estructural, 45 por revalidar, 0 completas, 0 publicadas. Próxima ruta: Chama Rio Copacabana. 


## Auditoría de producción — Chama Rio Copacabana (fila 6) — 15/11/2026

Hostinger fue leído en las tres rutas. ES/PT/EN presentan 20 párrafos, 1 H1, 7 H2, 1 H3 y un iframe de mapa cada uno; PT y EN tienen títulos localizados y canonical propio. Las seis fotos editoriales tienen los mismos `src` en los tres idiomas y no hay alt vacíos en esta página. La diferencia de cantidad de etiquetas `img` (ES 10 frente a PT/EN 9) procede de una aparición duplicada del logo de marca en ES, no de una foto editorial ausente.

El cotejo de enlaces normalizando prefijos PT/EN identificó 11 href del ES que no aparecen en PT ni EN: `/`, `/guia/`, `/experiencias/`, `/transportes/`, `/hospedaje/`, `/compras/`, `/cafe-rio/`, `/destinos/buzios/`, `/consejos/`, Instagram y TikTok. No se cambiaron enlaces, navegación ni widgets.

Search Console por URL, final 2026-10-16–11-12: PT 995 impresiones, 3 clics, CTR 0,30%, posición 6,9; EN 67 impresiones, 0 clics, posición 9,6. Inspección 2026-11-15: PT y EN “Submitted and indexed”, robots ALLOWED, fetch SUCCESSFUL y Google canonical igual a user canonical. ES: “Discovered - currently not indexed”; robots/fetch/indexing state no especificados en la respuesta. Es exclusión de descubrimiento, sin un fallo de fetch/canonical confirmado.

La copia de producción sí ofrece texto en PT/EN, pero la ficha queda pendiente de enlaces, FR, QA editorial integral y capturas; no cuenta como completa. Fuente confirmada: HTML vivo de Hostinger; este run no cotejó el historial Git de la ficha. Conteo estricto de la tanda sigue **0/50 completas; 0 cambios nuevos publicados**. Las primeras cinco rutas continúan siendo solo candidatas PT/EN estructurales en preview privado.


## Auditoría de producción — Carretão Siqueira — 15/11/2026

Hostinger fue leído en ES/PT/EN. Cada versión tiene 1 H1, 11 H2, 25 párrafos, 1 iframe de mapa, 12 etiquetas de imagen y 19 href normalizados. Los 7 archivos de fotos editoriales coinciden entre idiomas, así como los enlaces; no hay alt vacíos. Los 25 párrafos de PT/EN no coinciden literalmente con ES y la lectura de las muestras muestra cuerpo localizado. Sin embargo, el `<title>` SEO de PT y EN sigue exactamente en español (“Carretão Copacabana — Siqueira Campos: guía completa | Ernestinho Carioca”), y los 7 atributos `alt` de fotos editoriales también siguen en español. La descripción meta sí está localizada. No se cambiaron fotos, HTML, navegación ni enlaces.

Search Console final 2026-10-16–11-12: ES 991 impresiones, 5 clics, CTR 0,50%, posición 8,4; en esta ventana no se devuelven filas PT/EN. Inspección 2026-11-15: ES “Submitted and indexed”, fetch SUCCESSFUL y canonical de Google igual a user canonical. PT “Discovered - currently not indexed”; EN “URL is unknown to Google”. Para PT/EN el API no especifica estado de robots/fetch ni un error técnico, por lo que no se etiqueta como fallo de canonical o rastreo confirmado.

La ficha permanece incompleta: título y alt PT/EN sin traducir, FR ausente, falta revisión editorial completa y QA visual 1440/390. No cuenta como completa en la tanda. Evidencia actualizada también en CSV maestro, commit `c410f0d42d4a3aef065242e490c36f347da12b81`; fuente: HTML vivo Hostinger/GSC, aún sin cotejo de historial Git para esta ficha.


## Auditoría de producción — Plage Café (fila 8) — 15/11/2026

Se verificaron en Hostinger las variantes ES, PT-BR y EN. Cada una entrega 15 párrafos, 1 H1, 4 H2, 11 imágenes y 27 enlaces; canonical propio en cada idioma. Títulos y primeros párrafos están localizados en PT/EN. Las 7 fotos editoriales conservan los mismos archivos y los 27 enlaces normalizados coinciden entre idiomas. Queda texto español residual: un párrafo de identificación del EAV Parque Lage y seis alts editoriales de foto en PT y EN; no se modificaron fotos, alts, enlaces ni diseño.

Search Console inspeccionó ES/PT/EN como enviadas e indexadas, con robots permitido, fetch exitoso y canonical de Google igual al declarado. Métricas finales 2026-10-16–11-12: ES 267 impresiones/1 clic/posición 8,3; PT 505/5/7,3; EN 97/4/7,8 (total 869 impresiones). Ventana previa 2026-09-18–10-15: ES 10/0/8,4 y sin filas PT/EN. El incremento de impresiones es una señal de rendimiento, no un error de indexación ni prueba de causalidad.

Estado: **incompleta; no cuenta como ficha validada**. FR ausente; pendiente completar la traducción editorial francesa, resolver el texto EAV y los alts dentro del alcance autorizado, QA visual aprobado a 1440/390 y controles completos de sitemap/canonical/hreflang. QA visual no ejecutado en este corte. Hostinger sigue sin cambios, y esta auditoría no constituye publicación. La cifra de la fila CSV fue corregida a 869; la edición preservó 1.204 registros y 14 columnas.



## Auditoría de producción — Sushi Leblon (fila 9) — 15/11/2026

La ficha pública en Hostinger contiene ES/PT-BR/EN. Cada documento tiene título localizado, canonical propio, 1 H1, 13 H2, 31 párrafos, 12 etiquetas de imagen, 1 mapa iframe y 26 enlaces. PT y EN tienen cero coincidencias literales de párrafos frente a ES; muestra editorial revisada a nivel de lectura. Un alt de imagen sigue en español (“Atún fresco con ovas negras”) tanto en PT como EN. No se cambiaron contenido, fotos, mapas, diseño ni enlaces.

GSC final 2026-10-16–11-12: ES 474 impresiones/0 clic/posición 11,2; PT 49/0/10,4; EN sin filas. Periodo previo 2026-09-18–10-15: ES 177/0/9,8; PT/EN sin filas. ES ganó impresiones, pero su posición promedio bajó; no se infiere causa. Inspección GSC: ES y PT “Enviada e indexada”, fetch exitoso y canonical Google igual al declarado; EN “Descubierta: actualmente sin indexar”, con robots/fetch/canonical no especificados por la respuesta. Esta exclusión no confirma un fallo de rastreo o canonical.

La ficha queda incompleta y no validada: falta FR, traducir el alt PT/EN y aprobar QA visual 1440/390. La inspección no cuenta como traducción completa ni cambio publicado. Inventario maestro actualizado con 1.204 filas y source SHA de Hostinger 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346; cifra de impresiones 523 sumando las variantes con datos. Se mantienen las 50 URL de la tanda y el total de completadas/publicadas sigue 0/50.


## Punto de reanudación de esta ejecución — 15/11/2026

- Tanda: 50 URLs listadas en la tabla superior.
- Este corte añadió auditoría de producción para las filas #8 Plage Café y #9 Sushi Leblon: 2/50 fichas examinadas en esta ejecución; 0 fichas completas PT-BR/EN/FR; 0 cambios publicados.
- Próxima ficha: #10 Zazá Bistrô Tropical (`/gastronomia/zaza-bistro-tropical/`). Después continúan las filas #11–#50 tal como están enumeradas; no recertificar ni repetir hallazgos históricos sin comprobarlos.
- Bloqueo técnico del candidato actual: Vercel failure `build-rate-limit` en el commit del último checkpoint. No desplegar ni eludir el guard. Los cambios de código del PR permanecen privados y no cuentan como publicados.
- Fuente de producción: Hostinger y Search Console; Hostinger sigue en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. Los detalles de las filas #8 y #9 están en los bloques inmediatamente anteriores y en el inventario maestro.


## Auditoría de producción — Zazá Bistrô Tropical (fila 10) — 15/11/2026

Hostinger sirve las tres variantes ES/PT-BR/EN. El HTML de producción tiene títulos localizados; conteos: ES 20 párrafos; PT/EN 19 cada una; las tres con 1 H1, 11 H2 y 1 mapa. En el cuerpo, 8 párrafos PT/EN son idénticos al español. Los archivos de imagen coinciden (11 fuentes únicas; etiquetas img 13/12/12), mientras nueve alts editoriales siguen en español en PT/EN. El número de enlaces declarativos es ES/PT/EN 24/12/12; normalizados hay 19 href en ES frente a 7 en PT y EN, con 12 enlaces de navegación/redes/contacto que faltan. No cambié texto, enlaces, fotos ni diseño.

El cotejo de los commits 42d03024d2c3765b0d96eb5f9763657d731baf4a y 8570793a992b262c5fb384a396ec949e6105775c encontró la fuente estática ES, no variantes PT/EN en ese directorio. Los diccionarios gastronomy-01.js históricos examinados contienen el nombre de marca pero no estos párrafos extensos; no se recuperó una traducción manual histórica para los bloques ausentes en este corte. No la doy por reconstruida.

GSC final 2026-10-16–11-12: ES 393 impresiones/0 clic/posición 7,0; PT 55/0/14,1; EN 33/0/9,4. Periodo 2026-09-18–10-15: ES 63/2/CTR 3,17%/posición 6,4; no hubo filas PT/EN. Inspección actual: las tres variantes están enviadas e indexadas, robots permitido, fetch exitoso y canonical de Google igual al declarado. La caída de posición promedio ES y el crecimiento de impresiones no prueban causalidad; no se confirmó error de indexación.

Ficha **incompleta/no validada**: traducir editorialmente los ocho bloques y alts, revisar la diferencia de enlaces sin alterar enlaces aprobados, añadir FR completo, ejecutar QA runtime y visual a 1440/390 y validar SEO. La fuente de datos quedó registrada en el CSV maestro (1204 registros, 14 columnas, fecha 2026-11-15 y source SHA Hostinger 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346). Esta actualización es documentación; nada fue publicado.


## Auditoría de producción — Carretão Lido (fila 12) — 15/11/2026

Hostinger sirve ES/PT-BR/EN con títulos y canonical propios. Cada variante tiene 1 H1, 12 H2, 26 párrafos y un mapa; HTML etiqueta 12/11/11 imágenes con 10 fuentes únicas coincidentes. PT conserva 7 párrafos íntegros idénticos a ES; EN conserva 6. Ocho alts editoriales siguen en español en PT/EN. Enlaces declarados ES/PT/EN: 32/20/20, 25/13/13 href únicos tras normalizar prefijos. PT/EN no incluyen nueve rutas de navegación (`/`, guía, experiencias, transportes, hospedaje, compras, café, Búzios y consejos), Instagram, TikTok y los href genéricos de WhatsApp; el CTA WhatsApp sí tiene mensajes localizados para cada idioma. No se tocaron textos, fotos, mapa, enlaces ni layout.

GSC final 2026-10-16–11-12: ES 400 impresiones/0 clic/posición 8,3; PT 28/0/9,1; EN 19/0/8,3 (447 total). Periodo anterior 2026-09-18–10-15: ES 118/0/8,5; PT 36/0/8,2; EN 15/0/5,8 (169 total). Todas las variantes están enviadas e indexadas en la inspección 2026-11-15, robots permitido, fetch exitoso, canonical Google igual al declarado. Aumentaron impresiones, mientras PT/EN empeoraron posición promedio; son métricas observadas sin causalidad atribuida y no hay error técnico de indexación confirmado.

Ficha **incompleta/no validada**: traducir párrafos y alts que faltan, recuperar con revisión humana los enlaces de navegación permitidos por el proyecto, completar FR, QA runtime/visual 1440/390 y controles SEO. Inventario maestro actualizado, 1.204 registros/14 columnas, source SHA Hostinger `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`, fila CSV con datos exactos. No hubo cambio público.


## Punto de reanudación actualizado — 15/11/2026

En este corte se completó la auditoría directa de las filas #8 Plage Café, #9 Sushi Leblon, #10 Zazá Bistrô Tropical y #11 Terra Brasilis, y ahora #12 Carretão Lido: **5/50 examinadas durante esta ejecución; 0/50 completas; 0/50 publicadas**. La siguiente ficha seleccionada es #13 Cais do Oriente (`/gastronomia/cais-do-oriente/`); las filas #14–#50 siguen en el orden tabulado. Ninguna ruta auditada hoy se considera terminada: PT/EN tienen texto o alts pendientes, o falta FR/QA. Producción Hostinger continúa en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`.


## Corrección de contabilidad de la ejecución — 15/11/2026

El recuento de esta ejecución debe incluir las auditorías ya guardadas de las filas #6 Chama Rio Copacabana y #7 Carretão Siqueira, además de #8 Plage Café, #9 Sushi Leblon, #10 Zazá Bistrô Tropical, #11 Terra Brasilis y #12 Carretão Lido. Por tanto, lleva **7/50 rutas examinadas en esta ejecución**, no 5/50. Ninguna de estas siete está completa bajo el criterio de PT-BR/EN/FR + QA editorial/visual/SEO; **0/50 completas, 0/50 nuevas publicadas**. La siguiente fila es #13 Cais do Oriente; siguen pendientes #14–#50 tal como están listadas. Producción sigue en Hostinger SHA `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. El último HEAD del PR está en su body y no debe considerarse despliegue.


## Auditoría de producción — Cais do Oriente (fila 13) — 15/11/2026

Hostinger ES/PT/EN está disponible con canonical propio en las tres variantes y títulos localizados nominalmente; los títulos PT/EN añaden un sufijo de marca duplicado. Cada HTML tiene 1 H1, 11 H2, 18 párrafos y un mapa; imágenes 12/11/11 tags con diez fuentes únicas coincidentes. Nueve párrafos completos de PT y otros nueve de EN son idénticos al español. Siete alts editoriales y un alt redundante de marca permanecen en español. Los enlaces declarados son ES/PT/EN 23/11/11 y 18/6/6 href únicos normalizados; falta cotejo individual de los destinos diferentes, sin alterar enlaces aprobados.

GSC final 2026-10-16–11-12: ES 28 impresiones/0 clic/posición 7,3; PT 17/0/7,6; EN 76/0/7,9. Ventana previa 2026-09-18–10-15: ES 28/0/7,9; PT 31/1/9,4; EN sin filas. Inspección del 15/11: las tres enviadas e indexadas, robots ALLOWED, fetch SUCCESSFUL, canonical Google igual al declarado. No hay error técnico de indexación confirmado.

**No completa/no validada:** falta recuperar PT/EN de nueve párrafos por idioma, traducir alts y corregir los metadatos redundantes en el ámbito SEO permitido, completar FR integral y QA visual/runtime 1440/390. No se tocó contenido, fotos, mapa, enlaces ni diseño. Fuente: Hostinger vivo/GSC; no se cotejó historial en este corte. La ficha está registrada en el CSV maestro de 1.204 registros (commit `5f7eb61b316d607b4e73b2c9ad3b48ed16352df9`).


## Punto de continuidad del run — 15/11/2026

Desde el checkpoint anterior, este run añadió una auditoría de producción: fila #13 Cais do Oriente. Conteo de este run: **1/50 ruta examinada, 0/50 fichas completas y 0/50 publicadas**. Cumulativo documentado en la tanda: filas #6–#13, ocho rutas con evidencia de producción; las diez filas históricas #1–#5 no se recertifican en este run. Próxima ruta: #14 Galeto Sat's (`/gastronomia/galeto-sats/`); después seguir #15–#50. Hostinger producción sigue en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. PR #36 continúa abierto en base de producción, pero el último status documentado del HEAD anterior era failure `build-rate-limit`; verificar el nuevo status antes de cualquier decisión y no eludir el gate.


## Checkpoint actualizado de la tanda — 15/11/2026

Este bloque **sustituye el conteo del checkpoint inmediatamente anterior**. En esta ejecución se inspeccionaron **10/50 rutas** en Hostinger/GSC; **0/50 cumplen la definición estricta de ficha completa** (ES/PT-BR/EN/FR íntegros, renderizado y QA editorial, SEO/canonical/hreflang/sitemap, incremental y capturas 1440/390), y **0 cambios de esta tanda están publicados**. Las otras 40 fichas del cupo quedan pendientes de verificación/cierre. La tabla global de 50 rutas y hashes fuente del informe conserva la cola; en este corte solo las diez filas de abajo tienen una comprobación nueva. No se recuenta como publicado nada de esta rama o del PR.

| Revisada | URL canónica ES | Estado real ES / PT-BR / EN / FR | SHA de HTML ES en producción (ref. Git verificada) | Bloqueo o evidencia actual |
|---:|---|---|---|---|
| 1 | `/gastronomia/cais-do-oriente/` | ES/PT/EN presentes; FR ausente; incompleta | `05e264793f8596559c400d7c410dc4064cda7e54` | 9 párrafos PT y 9 EN iguales a ES; 7 alts editoriales en español; títulos con marca redundante. GSC 121 imp/1 clic en 2026-10-16–11-12; las 3 variantes enviadas/indexadas, fetch correcto y canonical coincidente. |
| 2 | `/gastronomia/galeto-sats/` | ES/PT/EN presentes; FR ausente; incompleta | `8c3ae87d894901f7cc85e1a9978c336effe9d177` | En PT hay texto visible `Translation results`; prefijo en 19/25 párrafos PT y 15/25 EN; 2 párrafos EN iguales a ES. GSC 360 imp/4 clics en el periodo; 3 variantes indexadas/fetch correcto/canonical coincidente. Captura viva disponible a 1344×928, no equivale a QA aprobado 1440/390. |
| 3 | `/gastronomia/haru/` | ES/PT/EN presentes; FR ausente; incompleta | `6f897d6c60ca36d476d916d93d9e8b9ae25d1f97` | 9/23 párrafos PT y EN iguales a ES; dos alts requieren cotejo lingüístico. GSC 313 imp/0 clic; indexación y canonical correctos. ES pasó de 89 a 261 impresiones entre periodos comparables; PT 37→14, EN 43→38. |
| 4 | `/gastronomia/dumare/` | ES/PT/EN presentes; FR ausente; incompleta | `f2fbca8b8f9d514579d6e48a5e8102bd10d35130` | 11/30 párrafos PT y EN iguales a ES; título PT usa “guia completa”, título EN retiene “Quiosque”; seis alts con marcas españolas. GSC 521 imp/2 clics; 3 variantes indexadas y canonical correcto. |
| 5 | `/gastronomia/spicy-fish/` | ES/PT/EN presentes; FR ausente; incompleta | `6c49d747f9a7a5712a8a4cb7927462bcf44c378d` | 8/29 párrafos PT y EN iguales a ES; un alt requiere revisión. GSC 381 imp/2 clics; 3 variantes indexadas/fetch correcto/canonical coincidente. |
| 6 | `/gastronomia/amendoeira/` | ES/PT/EN presentes; FR ausente; incompleta | `b3ed0ef51003d906992bc10b0d086b7304907627` | PT 11/24 y EN 9/24 párrafos iguales a ES. GSC 195 imp/1 clic; 3 variantes indexadas y canonical correcto. Periodo previo comparable: 115 imp; no usar como error SEO. |
| 7 | `/gastronomia/aprazivel/` | ES/PT/EN presentes; FR ausente; incompleta | `3c03174a60b9f5a6a7d472a2bbab0c01fa78a412` | PT/EN 9/23 párrafos iguales a ES; title EN vacío; nueve alts con grafía española. GSC 272 imp; 3 variantes indexadas/fetch correcto/canonical coincidente. |
| 8 | `/gastronomia/churrascaria-palace/` | ES/PT/EN presentes; FR ausente; incompleta | `c5fb0bbb0ae6f528af3d33b398d4a69c39794aa0` | PT/EN 1/21 párrafos igual a ES. ES/EN indexadas; PT aparece “Descubierta: actualmente sin indexar” sin rastreo ni fallo técnico declarado: exclusión pendiente de seguimiento, no error confirmado. GSC 263 imp/0 clic. |
| 9 | `/gastronomia/frontera-ipanema/` | ES/PT/EN presentes; FR ausente; incompleta | `94626d30d9afd92e49c049c324303228c1c81918` | PT/EN 8/26 párrafos iguales a ES. GSC 254 imp/1 clic; 3 variantes indexadas/fetch correcto/canonical coincidente. |
| 10 | `/gastronomia/temperarte-posto6/` | ES/PT/EN presentes; FR ausente; incompleta | `775dbd2edb1656bfd846f3d4f9ed37ccbd2892a7` | 29 párrafos por idioma y cero coincidencias literales PT/EN con ES (no es dictamen semántico); 10 imágenes y 26 enlaces por variante. GSC 241 imp/1 clic. EN figura “Detectada, pero no indexada” sin rastreo; no hay dato de impresiones EN, sin error técnico confirmado. |

Los conteos de igualdad son alertas mecánicas para cotejo editorial, no prueba por sí solos de mala traducción. Los estados de Search Console “descubierta/detectada pero no indexada” se anotan como exclusiones sin error confirmado cuando no hay fetch/crawl. No se tocaron páginas, traducciones de producción, fotos, mapas, enlaces ni widgets. El inventario maestro de 1.204 rutas conserva las diez incidencias y pruebas; último commit de inventario antes de este checkpoint: `7d7f51a14df48a27fc2e5c439178710de280bb7b`.

### Continuación inmediata
Siguiente ficha libre del orden actual por impresiones: `/gastronomia/colombo-do-forte/` (238 impresiones según el corte de cola; reconsultar GSC antes de trabajar). Después seguir las filas restantes de la lista priorizada hasta 50. Mantener 40/50 pendientes y retomar este contador, no reiniciar ni duplicar rutas. No hay cambios publicados. Producción Hostinger sigue en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`, sitemap de referencia 3.588 URL ES/PT/EN.

### Puerta de publicación
El HEAD PR #36 consultado en esta ejecución: `7d7f51a14df48a27fc2e5c439178710de280bb7b`; Vercel sigue en **failure** `build-rate-limit`. No se eludió el gate ni se alteró producción. PR #24 continúa borrador, base `revision/rendimiento-traducciones-81a904c), y su descripción mantiene “Mantener como borrador”; no es camino de release. PR #36 sigue siendo privado y no está listo para aprobación: faltan FR, revisión semántica, capturas aprobadas 1440/390 y revisión humana independiente. Este run solo añadió documentación/inventario; no ejecutó guard/build porque el checkout de trabajo actual no contiene el repositorio Git. Antes de tocar código hay que abrir un checkout actualizado y ejecutar `check_frozen_pages.py`, `guard_approved_content.mjs` y la validación incremental aplicable.

## Continuación inmediata del run — actualización de contador (15/11/2026)

Se auditó una ruta adicional tras el checkpoint previo:

| URL | Estado real | SHA HTML ES de producción | Evidencia y bloqueo |
|---|---|---|---|
| `/gastronomia/colombo-do-forte/` | ES/PT/EN publicados en Hostinger; FR ausente; ficha incompleta | `9f2499455a34a28a49a0773e6ae0bab3a02d4cbf` | 10/21 párrafos PT y EN iguales al ES; 4 alts por variante necesitan cotejo editorial. GSC final 2026-10-16–11-12: ES 199 imp/0 clic/pos 11,7; PT 28/1/8,3; EN 11/1/8,9; 3/3 enviadas e indexadas, fetch SUCCESSFUL, canonical Google=declarado. No es error técnico de indexación; falta FR, QA semántico y visual. |

**Contador vigente, que sustituye el 10/50 anterior:** 11/50 URLs examinadas durante este ciclo, 0/50 completas y 0/50 nuevas publicadas; quedan 39 URLs del cupo por revisar/cerrar. El inventario mantiene 1.204 rutas. Último commit CSV: `f28526314ff3126778288b60b7de493c54d2a0ea`. Siguiente URL: `/gastronomia/faenza-copacabana/`; después seguir por impresiones de GSC hasta completar el cupo. No reiniciar ni duplicar las diez rutas enumeradas arriba y en el checkpoint precedente.

Producción Hostinger permanece en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; no se publicaron estos cambios documentales. El status del HEAD de PR #36 `f28526314ff3126778288b60b7de493c54d2a0ea` sigue en **failure `build-rate-limit`**. No se hizo bypass.

## Verificación de estado del PR #24 — 15/11/2026

Se contrastó el estado actual con GitHub, no se tomó “checks pendientes” como hecho: PR #24 sigue abierto/draft, head `586a0e3457c41071ada753bbf4d1c08484600d25`; su ref base apunta a la rama de producción, pero el SHA de base registrado es `9426c42fc0150bdce5fbfee060396da9de518ac7`, anterior al HEAD productivo vigente `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. El texto del PR incluye literalmente “Mantener como borrador”. En la consulta del SHA del head, los tres check runs observados estaban completados con éxito: `Vercel Preview Comments`, `Protect approved content` y `editorial-preview`; no se observó un check en estado pendiente/fallido para ese SHA. La lista de reviews de GitHub está vacía. Por tanto, la causa verificable para mantenerlo borrador es su instrucción explícita y el SHA base desactualizado; este corte no confirma checks pendientes. No se cambió el estado ni la base del PR. La revisión independiente aún no existe.

El PR #36 tampoco tiene reviews. Su head exacto al checkpoint es `2e45bf5cf099a82646ff220a953ac4e9c813b17b`, base productiva `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; el check Vercel está en failure `build-rate-limit`.

## Auditoría de continuidad: corte de 22 rutas — 15/11/2026

**Contador estricto de la tanda:** 22/50 rutas auditadas en este ciclo; **0/50 fichas completas** con PT-BR/EN/FR, renderizados, QA editorial/SEO, sitemap/hreflang y capturas aprobadas; **0 cambios nuevos publicados en Hostinger**. Restan 28 rutas de la tanda. La tabla de la cola se sustituyó por una versión de 50 URLs con el estado del corte y el SHA del HTML ES de producción verificado en cada fila; las filas aún no recertificadas aparecen explícitamente pendientes, no como aprobadas.

### Hallazgos visibles en producción y oportunidades de recuperación

- **Don Camillo**: HTML ES/PT/EN de 25 párrafos; 7 párrafos PT y 7 EN siguen literalmente en español. Títulos PT/EN traducidos. GSC final (16-oct a 12-nov): ES 65, PT 32 y EN 37 impresiones; 1 clic en PT. Inspección: tres variantes indexadas, fetch correcto y canonical propio. La URL FR es desconocida para Google.
- **Bar do Omar**: 25 párrafos; 8 PT y 7 EN literalmente en español. GSC: ES 183, PT 27 y EN 10 impresiones; 1 clic PT. ES/PT/EN indexadas con fetch/canonical correctos; FR desconocida. Ambos son candidatos claros para recuperar PT/EN, pero aún requieren versión completa y pruebas con guard.
- **Café Lamas**: 29 párrafos y 14 subtítulos localizados en ES/PT/EN; 12/12 atributos alt son iguales entre idiomas. GSC: 183 impresiones, 0 clics en la ventana, variantes indexadas y canonical/fetch correctos; FR desconocida.
- **Lasai**: 18 párrafos y 11 subtítulos localizados; la muestra de alt PT conserva ES. ES/EN indexadas; la URL PT figura “unknown to Google” (no prueba error técnico). GSC ES 145/2 clics, EN 17/0, sin fila PT.
- **Tacacá do Norte**: 9 párrafos PT y 9 EN iguales al español; 21 párrafos ES/PT y 20 EN; secciones/títulos localizados. Los sets de URL de fotos coinciden aunque hay 15 ocurrencias ES y 14 PT/EN, por lo que no se concluye pérdida de foto. GSC: 180 impresiones, 0 clics; ES/PT/EN indexadas, fetch y canonical correctos; FR desconocida.

En el resto de rutas auditadas, las alertas de párrafos literales, alts, títulos vacíos y marcas “Translation results” se mantienen como hallazgos a cotejar editorialmente, no como diagnósticos de error SEO. Las exclusiones “descubierta/no indexada” y “URL unknown” se separan de fallos de rastreo: las inspecciones disponibles muestran fetch/canonical correctos en las demás variantes comprobadas.

### Estado de los PR y puerta de publicación

Producción de Hostinger sigue en `revision/rendimiento-traducciones-81a904c` SHA `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; no se modificó. PR #24 continúa draft por instrucción explícita en su descripción (“Mantener como borrador”) y base SHA antigua `9426c42fc0150bdce5fbfee060396da9de518ac7`; sus checks observados para el head actual fueron success, sin reviews. PR #36 sigue basado en el HEAD productivo, pero no tiene revisión humana y Vercel falla `build-rate-limit`. No se eludió el guard ni se desplegó.

Este entorno no contiene un checkout Git local; por ello no fue posible ejecutar `check_frozen_pages.py`, `guard_approved_content.mjs`, la compilación incremental ni capturas aprobadas a 1440/390 en esta sesión. Las páginas continúan fuera del recuento estricto hasta que esas comprobaciones y la revisión humana concluyan.

**Siguiente ruta por prioridad de la cola:** `/gastronomia/chama-rio-copacabana/` (1.062 impresiones agregadas en el corte de prioridad), luego `/gastronomia/carretao-siqueira/` (991). Ambas tienen hallazgos previos que deben cotejarse con el HEAD actual antes de reutilizarlos.


## Auditoría de producción — Chama Rio Copacabana (corte del run, 15/11/2026)

Se releyeron desde Hostinger los HTML ES, PT-BR y EN; la ruta FR devolvió «File does not exist». La fuente Git espejo de ES en la rama productiva coincide con el archivo auditado y tiene blob SHA `5aab4304cd65e8006a7e9e410f0903495c3ef6be`; la base productiva comprobada del PR sigue siendo `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`.

- Estructura ES/PT/EN: 20 párrafos, un H1, siete H2, un H3 y un mapa por idioma. Títulos/descripciones localizados, canonical propio y alternates `es`, `pt-BR`, `en`, `x-default`.
- No hubo párrafos completos idénticos ES→PT ni ES→EN (0/20). Las ocho fuentes únicas de imagen coinciden entre idiomas (ocurrencias HTML: 10/9/9). La comparación de href normalizados encuentra 11 destinos de ES ausentes en PT y EN: inicio/navegación y enlaces generales a Instagram/TikTok. Se conserva el HTML publicado; no se alteraron enlaces, fotografías ni componentes.
- OpenSEO/Search Console, 2026-10-16–2026-11-12: PT 995 impresiones, 3 clics, CTR 0,3%, posición 6,9; EN 67 impresiones, 0 clics, posición 9,6. No hubo filas para esta página en 2026-09-18–2026-10-15, así que no se deduce tendencia de pérdida.
- Inspección: PT y EN están enviadas e indexadas, fetch exitoso y canonical Google=declarado. ES figura «Descubierta: actualmente sin indexar» sin crawl/fetch reportado; es exclusión, no error técnico confirmado. FR es URL desconocida para Google y no existe en Hostinger; no se agregaron ruta, hreflang ni sitemap.

**Contabilidad reemplazada:** 23/50 rutas auditadas durante el ciclo; 0/50 cumplen la definición estricta (ES/PT-BR/EN/FR completos, renderizados y QA editorial/SEO, incremento, canonical/hreflang/sitemap y capturas aprobadas); 0/50 nuevas publicadas en Hostinger. Quedan 27 por auditar/cerrar. Próxima prioridad de la cola: `/gastronomia/carretao-siqueira/` (revalidar impresiones e HTML antes de trabajar). Chama está auditada, pero no validada como ficha completa.

No hubo checkout Git en este entorno: no se ejecutaron el build incremental, los guards ni capturas locales; las fichas siguen fuera del recuento completo. El sitemap productivo se mantiene en 3.588 URLs indexables ES/PT/EN y FR=0; no se inició reconstrucción completa ni cambió producción.

## Auditoría de producción — Carretão Siqueira Campos (corte del run, 15/11/2026)

Se releyeron los HTML de Hostinger para ES/PT-BR/EN; el recurso FR dio «File does not exist». El HTML ES espejo en la rama productiva tiene blob SHA `6cbdf907f1a363efbeb47e869215900b1fe8d2a6`; la rama Hostinger mantiene SHA `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. La inspección visual/runtime disponible fue en el navegador, a 1344×928; no son capturas aprobadas de 1440/390.

- Las tres páginas tienen 25 párrafos, un H1, 11 H2, mapa y 12 ocurrencias de imágenes; los sets de diez fuentes de imagen únicas y los 19 href normalizados coinciden en ES/PT/EN. No se cambiaron enlaces, fotos, mapas ni componentes. No hay párrafos completos idénticos entre ES y PT o EN (0/25), lo que no sustituye revisión semántica.
- Hallazgo editorial visible: títulos y descripciones HTML siguen idénticos en español en las tres variantes. La pestaña PT muestra «guía completa» y los alts de imágenes dicen «imagen»/«Detalle visual…» en español, pese al cuerpo portugués. No se corrigieron en producción. Canonical propio y alternates ES/PT-BR/EN/x-default están presentes.
- GSC 2026-10-16–11-12: ES 991 impresiones/5 clics/CTR 0,5%/posición 8,4; 2026-09-18–10-15: ES 103/0/8,7. Las impresiones subieron; no es caída. No hubo filas GSC PT/EN en ambas ventanas. Inspección: ES enviada e indexada, fetch exitoso y canonical coincidente; PT/EN «Descubierta: actualmente sin indexar», sin rastreo/fetch informado (exclusión, no error técnico confirmado); FR desconocida para Google.
- El build/guard y capturas 1440/390 no se pudieron correr por falta de checkout Git local; falta QA semántico/FR. Esta ficha no cumple el criterio de cierre.

**Contabilidad vigente que sustituye el corte anterior:** 24/50 auditadas en este ciclo; 0/50 completas; 0/50 cambios nuevos presentes en producción Hostinger; 26 restantes. Siguiente prioridad de la cola: `/gastronomia/plage-cafe/` (revalidar impresiones y estado HTML en esta ejecución). La evidencia está en el inventario maestro; no se afirma publicación.

## Auditoría de producción — Plage Café (corte del run, 15/11/2026)

Hostinger ES/PT-BR/EN fue rerevisado. El HTML ES de la rama productiva tiene blob SHA `7b18104abae1dcb68821af4663dafa6049206bf7`; producción sigue en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. El archivo FR no existe en Hostinger y GSC indica que Google no reconoce esa URL.

- Cada variante tiene 15 párrafos, un H1, cuatro H2, 11 ocurrencias de imágenes y 19 href únicos; los nueve sets de fuentes de imagen y los enlaces coinciden entre ES/PT/EN. Títulos, descripciones, canonical y hreflang están localizados/propios; alts observados son iguales entre idiomas y quedan para revisión contextual.
- Un texto de párrafo coincide literalmente ES/PT/EN: «EAV Parque Lage · visita y estado del edificio · EAV · restauración del palacete». Por ser una línea EAV, se registra como dato por revisar y no como error editorial confirmado. No se modificó nada.
- GSC 2026-10-16–11-12: ES 267 impresiones/1 clic/posición 8,3; PT 505/5/7,3; EN 97/4/7,8 (869/10 total). En la ventana anterior sólo hubo ES 10/0/8,4; no hay base para inferir pérdida PT/EN. Las tres variantes se encuentran enviadas e indexadas, con fetch exitoso y canonical Google coincidente.
- Falta FR completa y QA semántico de etiquetas; no se pudo ejecutar build/guard incremental ni capturas aprobadas a 1440/390 por falta de checkout local. No cuenta como ficha terminada.

**Contabilidad que sustituye el corte anterior:** 25/50 auditadas en este ciclo; 0/50 completas; 0/50 cambios nuevos publicados; 25 restantes. Próxima ficha de la cola por impresiones: `/gastronomia/sushi-leblon/`, con estado y datos GSC a revalidar.

## Auditoría de producción — Sushi Leblon (corte del run, 15/11/2026)

Se relevaron nuevamente los HTML ES/PT-BR/EN de Hostinger. El ES del espejo de producción tiene blob SHA `f0960038eed49af92dfaf2c9618b88b30dbc0395`; branch productiva `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. La ruta FR no existe en Hostinger y Google no reconoce su URL.

- Las tres variantes incluyen 31 párrafos, un H1, 13 H2, 12 imágenes (10 fuentes únicas) y 20 href únicos; sets de imágenes y enlaces coinciden. Títulos/canonical/hreflang están localizados/propios. No hay párrafos completos literalmente iguales a ES en PT/EN (0/31), sin que esto sea una evaluación semántica.
- La descripción HTML PT/EN continúa exactamente en español como la de ES. El alt «Atún fresco con ovas negras» sigue en español tanto en PT como EN; falta cotejar el resto de alts antes de extender la incidencia. No se modificó producción.
- GSC final 2026-10-16–11-12: ES 474 impresiones/0 clic/posición 11,2; PT 49/0/10,4; EN sin fila. Ventana anterior 2026-09-18–10-15: ES 177/0/9,8, PT/EN sin filas. La impresión ES creció, con posición promedio inferior; no se atribuye causalidad. Inspección ES/PT enviadas e indexadas, fetch exitoso y canonical Google igual al declarado; EN «Descubierta: actualmente sin indexar» sin fetch/crawl informado (exclusión, no error confirmado). FR desconocida.
- Falta FR integral, revisar semánticamente metadatos y alts, y ejecutar build/guard y capturas aprobadas 1440/390. No completa.

**Contabilidad que sustituye el corte anterior:** 26/50 auditadas en este ciclo; 0/50 completas; 0/50 nuevas publicadas en Hostinger; 24 restantes. Próxima prioridad por la cola GSC: `/gastronomia/zaza-bistro-tropical/`; revalidar sus datos antes de usar.

## Auditoría de producción — Zazá Bistrô Tropical (corte del run, 15/11/2026)

Hostinger ES/PT-BR/EN revisado; el HTML ES de producción tiene blob SHA `3c81194462752ddc241b1cad847785ef44b5ec4a` sobre la rama productiva `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. FR no existe en Hostinger y GSC no reconoce la URL.

- ES tiene 20 párrafos; PT/EN tienen 19 cada uno y ocho párrafos de cada variante coinciden literalmente con ES. Esto es alerta concreta para cotejo editorial, no dictamen semántico. Los títulos están localizados, pero la descripción HTML sigue en español en los tres idiomas. Los alts descriptivos observados para PT/EN siguen en español.
- H1 1/H2 11. Imágenes: 13 ES, 12 PT y 12 EN; 11 fuentes únicas iguales (no evidencia de foto perdida). Hrefs únicos ES/PT/EN: 18/7/7; faltan 11 destinos de ES en PT/EN, sin modificar enlaces. Canonical propio y alternates es/pt-BR/en/x-default.
- GSC final (16-oct–12-nov): ES 393 imp/0 clic/pos 7,0; PT 55/0/14,1; EN 33/0/9,4 (481 impresiones). Periodo previo solo ES 63 imp/2 clic/CTR 3,17%/pos 6,4. No hubo pérdida de impresiones ES; la posición media varía sin causalidad atribuida. Las tres URLs se reportan enviadas/indexadas, fetch exitoso y canonical Google igual al declarado. FR desconocida.
- Falta recuperar/revisar texto PT/EN, alts, description, FR integral y QA semántico. No se pudo correr build/guard ni capturas aprobadas 1440/390 en este entorno sin checkout. No completa; producción intacta.

**Contabilidad que sustituye el corte anterior:** 27/50 auditadas en este ciclo; 0/50 completas; 0/50 nuevas publicadas; 23 pendientes. Siguiente ficha según la cola GSC de esta tanda: revisar la fila 11 de la tabla priorizada y revalidar impresión/estado antes de auditar.

## Auditoría de producción — Terra Brasilis (corte del run, 15/11/2026)

ES/PT-BR/EN leídos directamente desde Hostinger. El HTML ES de producción tiene blob SHA `1c3f6149742b62e50d233ef57f6b37dd8237d0fd` en la rama `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. La ruta FR no existe en Hostinger y Google no la reconoce.

- Cada variante tiene 25 párrafos, un H1 y nueve H2; 21 tags de imagen (18 fuentes únicas) y 22 href normalizados; los sets de fotos/enlaces coinciden. No hay párrafos completos ES literales en PT/EN. Títulos, canonical y alternates están localizados/propios; las descripciones HTML de PT/EN siguen en español.
- Ejemplos de alt en español compartidos por las variantes: «Terra Brasilis frente a Praia Vermelha», «espacio abierto en Praia Vermelha» y «plato con camarones del menú». Se deja como corrección editorial pendiente; fotos y enlaces se conservan.
- GSC 2026-10-16–11-12: ES 307 imp/2 clic/pos 10,8; PT 106/0/10,6; EN 38/1/6,4 (451/3 total). Periodo anterior solo ES 145/0/8,9; impresiones ES subieron, sin atribuir causa. Las tres están enviadas e indexadas, fetch exitoso y canonical Google igual al declarado. FR desconocida.
- Falta traducir metadescripciones/alts, revisión editorial, FR completa, guard/build incremental y capturas aprobadas 1440/390. No completa.

**Contabilidad vigente que sustituye el corte anterior:** 28/50 auditadas; 0/50 completas; 0/50 nuevas publicadas; 22 pendientes. Próxima fila priorizada: `/gastronomia/carretao-lido/`; revalidar datos y estado antes de trabajar.

## Auditoría de producción — Carretão Lido (corte del run, 15/11/2026)

Se cotejaron ES/PT-BR/EN desde Hostinger; la variante FR no existe allí y Google no reconoce su URL. Blob del HTML ES en el espejo de producción: `fe48ac0c9ad39cbf3be490dc32c1e96010c29487`; rama productiva `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`.

- Las tres variantes contienen 26 párrafos, H1 1/H2 12 y 10 fuentes de foto únicas coincidentes. Ocurrencias de img: 12/11/11. href únicos 23/12/12: 11 destinos de ES faltan en PT/EN; no se alteraron. Siete párrafos PT y seis EN son idénticos al ES, y alts como «Salón principal», «Picanha fatiada» y «Servicio de carnes» continúan en español. Metadatos principales localizados; canonical propio y alternates presentes.
- GSC actual 16-oct–12-nov: ES 400/0/8,3; PT 28/0/9,1; EN 19/0/8,3; 447 impresiones/0 clics. Ventana anterior: ES 118/0/8,5; PT 36/0/8,2; EN 15/0/5,8; 169 impresiones/0 clics. Total de impresiones creció, mientras PT bajó; sin atribución causal. Las tres inspecciones reportan enviada/indexada, fetch exitoso y canonical Google=declarado. FR desconocida.
- Falta corregir texto/alt PT/EN, FR integral, QA semántico, build/guard y capturas aprobadas 1440/390. No completa.

**Contabilidad vigente que sustituye el corte anterior:** 29/50 auditadas; 0/50 completas; 0/50 publicadas; 21 pendientes. Próxima fila de la cola: consultar la tabla priorizada en la parte superior de este informe; revalidar impresiones y estado antes de comenzar.

## Auditoría de producción — Casa Mohamed (corte del run, 15/11/2026)

Hostinger ES/PT/EN rerevisado. El HTML ES del espejo de producción tiene blob SHA `834f65a78f2ba7e39312f87e6ea777c41834d09b`; rama productiva `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. FR no existe en Hostinger y Google no reconoce esa URL.

- Cada variante contiene 15 párrafos, un H1 y 10 H2. Las ocho fuentes únicas de imagen coinciden (15/14/14 tags). Enlaces normalizados ES/PT/EN: 15/4/4; faltan 11 destinos de ES en PT/EN y no se editaron.
- Nueve de los 15 párrafos PT y nueve EN son idénticos literalmente al ES. Los title y description están en español en los tres idiomas; algunos alts dicen «fotografía editorial». Estos son hallazgos de contenido/metadatos por corregir, no un fallo de indexación. Canonical propio y alternates es/pt-BR/en/x-default.
- GSC 16-oct–12-nov: ES 66 imp/0 clic/pos 13,2; PT 14/0/7,1; EN 41/1/11,1 (121/1 total). Ventana anterior: PT 6/0, EN 7/0, sin fila ES (13 impresiones observadas). Impresiones observadas subieron; sin atribuir causa. 3/3 URLs enviadas/indexadas, fetch exitoso y canonical Google=declarado. FR desconocida.
- Falta recuperar PT/EN, añadir FR editorial, QA semántico, build/guard incremental y capturas aprobadas 1440/390. No completa.

**Contabilidad que sustituye el corte anterior:** 30/50 auditadas; 0/50 completas; 0/50 nuevas publicadas en Hostinger; 20 pendientes. Próxima ruta libre de la cola por impresiones: `/gastronomia/cervantes-copacabana/` (176 del corte de prioridad; volver a consultar GSC).

## Auditoría de producción — Cervantes Copacabana (corte del run, 15/11/2026)

Hostinger ES/PT/EN rerevisado; HTML ES mirror blob SHA `abdc48e525942bf73fe72daefee731ea38819bf4` en prod `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. FR no existe y Google no reconoce la URL.

- ES tiene 20 párrafos, PT/EN 19; siete párrafos completos de cada variante coinciden literalmente con ES. Títulos localizados; la descripción y alts de PT/EN siguen en español. Imágenes 11/10/10, nueve fuentes únicas iguales; href 18/7/7: faltan 11 destinos de ES. No se modificaron.
- Las rutas con slash final están enviadas/indexadas, fetch exitoso y canonical Google=declarado. Dato aparte confirmado en inspección de URL ES sin slash: figura indexada, fetch SUCCESSFUL, Google canonical a esa URL sin slash pero user canonical a la portada. GSC muestra una impresión actual sin slash y tres en la ventana previa; esto es una discrepancia canónica específica, no se generaliza a las tres rutas canónicas.
- GSC slash final 16-oct–12-nov: ES 153/1 clic/pos10,0; PT16/0/7,7; EN6/0/5,8. Ventana anterior: ES30/0/10,4; PT16/0/8,8; EN20/0/8,5. Sumando la variante sin slash: 176 impresiones ahora, 69 previas. No hubo caída total; impresiones por idioma variaron. FR desconocida.
- Falta recuperar PT/EN, alts/metadatos, FR completa, evaluar/corregir con guard el canonical de la variante sin slash, QA build y capturas 1440/390. No completa.

**Contabilidad vigente que sustituye el corte anterior:** 31/50 auditadas, 0/50 completas, 0/50 nuevas publicadas; 19 pendientes. Próxima prioridad de la tabla: `/gastronomia/rotisseria-sirio-libanesa/` (176 impresiones; inspeccionar si los documentos de traducción realmente existen).

## Auditoría de producción — Rotisseria Sírio Libaneza (corte 32/50, 15/11/2026)

Leí desde Hostinger las variantes ES, PT-BR y EN de `/gastronomia/rotisseria-sirio-libanesa/`; la ruta FR no tiene archivo en producción. La lectura de Hostinger no expone SHA por archivo; la rama productiva verificada para este corte es `revision/rendimiento-traducciones-81a904c` en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`.

- Los tres HTML traen 21 párrafos y conservan un H1; 10 párrafos completos de PT y 10 de EN son literalmente iguales a ES en el HTML servido. Esto es una alerta verificable del HTML estático; el renderizado runtime no se verificó en navegador, así que no se afirma que el usuario vea todas esas cadenas sin traducir.
- Los títulos y descripciones meta están localizados en PT/EN; el H1 conserva correctamente el nombre propio del establecimiento. En las etiquetas de imagen observadas se usan rótulos en español. Hay 15/14/14 ocurrencias de `img`, con nueve URLs de imagen únicas iguales en las tres variantes; no se modificaron fotos. Hrefs normalizados: 7 en ES y 4 en cada PT/EN; quedan tres diferencias de navegación/enlaces por cotejar, sin alterar enlaces aprobados. Canonical propio y alternates es/pt-BR/en/x-default son coherentes; FR no se enlaza.
- OpenSEO/Search Console, datos finales (2026-10-16–2026-11-12): ES 43 impresiones/0 clics/posición 11,0; PT 105/0/8,6; EN 28/0/16,4 (176 impresiones). Ventana previa equivalente (2026-09-18–2026-10-15): ES 15/0/18,9; PT 63/0/9,4; EN 10/0/9,5 (88 impresiones). Las impresiones sumadas aumentaron; esto no prueba causa ni excluye variación por idioma.
- La inspección de GSC en las tres URLs canónicas resultó “Enviada e indexada”, robots permitido, fetch exitoso y canonical Google igual al declarado. Últimos rastreos: ES 2026-10-23; PT 2026-10-04; EN 2026-10-04. No se confirmó error de indexación. No se inspeccionó FR en GSC.

La ficha queda incompleta: no hay FR, QA semántico, verificación del renderizado en runtime, prueba incremental/guard ni capturas aprobadas a 1440/390. Producción y enlaces/fotos/componentes permanecen intactos. No se intentó desplegar.

**Contabilidad sustituida:** 32/50 auditadas; 0/50 completas según el criterio estricto; 0/50 nuevas publicadas; 18 pendientes. La siguiente fila de la cola de Gastronomía que debe confirmarse con el inventario y sus impresiones actuales es Guacamole Copacabana. El sitemap no se recontó en este corte; el último valor documentado es 3.588 URLs ES/PT/EN indexables y no se ha modificado.



## Auditoría de producción — Guacamole Copacabana (corte 33/50, 15/11/2026)

Hostinger ES/PT-BR/EN fue releído directamente en la rama productiva `revision/rendimiento-traducciones-81a904c`, commit `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. La página FR no existe en producción.

- Cada variante tiene 19 párrafos, ocho H1/H2/H3 combinados observados en el muestreo de encabezados y 10 tags de imagen con ocho URLs únicas; los sets de URLs de fotos coinciden entre idiomas. Los 10 href normalizados también coinciden; no se modificaron enlaces ni fotos.
- El título, la descripción y el contenido principal están traducidos en PT/EN. En el HTML estático PT comparte literalmente 2/19 párrafos con ES y EN 1/19; uno de ellos es el rótulo genérico `Gastronomía · Copacabana`. El encabezado `Delivery y novedades` sigue en español en PT/EN y varios alts descriptivos también conservan español. Son hallazgos de contenido estático que requieren revisar el runtime y el sentido editorial; no se afirma error visible sin navegador.
- Canonical propio y alternates es/pt-BR/en/x-default presentes en ES/PT/EN; no se declara alterno francés. El H1 mantiene el nombre propio del establecimiento.
- GSC final (16-oct–12-nov): ES 72 impresiones/0 clics/posición 8,4; PT 21/1/7,9; EN 76/0/16,8 (169 impresiones). Periodo previo (18-sep–15-oct): no hubo fila ES, PT 24/0/14,9 y EN 30/0/10,3 (54 impresiones). Las impresiones observadas aumentaron; posición e impresiones por idioma variaron y no se atribuye causa.
- Inspección GSC: 3/3 variantes enviadas/indexadas, robots permitido, fetch exitoso y canonical Google igual al declarado. Últimos crawls: ES 22-oct; PT 05-oct; EN 04-oct. No se confirmó error de indexación; no se consultó GSC para FR.

Esta ficha no cumple el cierre estricto: FR, cotejo de diccionarios/historial, QA semántico integral, renderizado runtime, build incremental/guard y capturas aprobadas 1440/390 siguen pendientes. Hostinger queda intacto.

**Contabilidad vigente:** 33/50 auditadas, 0 completas, 0 publicadas y 17 pendientes. Siguiente priorización: usar impresiones reales del corte final actual y evitar rutas ya auditadas en esta tanda; la tabla histórica de agosto–noviembre no sustituye ese ranking.


## Auditoría de producción — Fast Food (corte 34/50, 15/11/2026)

Hostinger producción `revision/rendimiento-traducciones-81a904c` en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. Rutas ES/PT-BR/EN releídas directamente; no existe archivo FR. El HTML ES verificado en el espejo GitHub tiene blob `3eb04d5fc56365b46fab8bb0a060ec7568618374`.

- ES/PT/EN tienen 14 párrafos y el cotejo literal no encuentra párrafos ES duplicados en las versiones PT/EN. H1, cinco H2, title y description son localizados. Esto es una señal estructural favorable, no aprobación semántica editorial ni del renderizador runtime.
- Canonical propio y alternates es/pt-BR/en/x-default son coherentes. Cuatro tags de imagen con dos fuentes únicas coincidentes por idioma; solo dos tienen atributo alt no vacío, a revisar. Hay 27 enlaces por HTML; las diferencias de ruta son prefijos locales traducidos y mensajes WhatsApp localizados. No se cambiaron enlaces.
- GSC final (16-oct–12-nov): ES 128 impresiones/2 clics/pos. 5,9; PT 40/0/10,7; EN 26/0/10,8 (194 impresiones). Periodo anterior (18-sep–15-oct): ES 24/0/5,8; PT y EN sin filas. El diferencial no se interpreta como caída comparable porque faltan filas previas PT/EN.
- Inspección GSC: 3/3 variantes ES/PT/EN “Submitted and indexed”, ALLOWED/SUCCESSFUL y canonical Google igual al declarado; FR “URL is unknown to Google”. No hay error de indexación confirmado para las tres variantes existentes.

Ficha incompleta: FR ausente; historial/diccionario no cotejado; QA semántico, inicialización en navegador, build incremental/guard y capturas aprobadas 1440/390 pendientes. **No cuenta como completa ni publicada.** Hostinger intacto.

**Contabilidad canónica que sustituye el corte previo:** 34/50 auditadas, 0 completas, 0 nuevas publicadas en Hostinger, 16 pendientes. Próxima candidata libre por impresiones reales y estado del inventario: /gastronomia/classico-beach-club-barra/ (102 impresiones ES en 16-oct–12-nov; confirmar PT/EN actuales y GSC antes de priorizar). CSV actualizado en commit efb4c056add1ac41f2f9c1a1c5c11802b261111b.

## Auditoría de producción — Clássico Beach Club Barra (corte 35/50, 15/11/2026)

Hostinger producción revision/rendimiento-traducciones-81a904c, commit 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. Las tres variantes ES/PT-BR/EN fueron leídas; FR no existe en el hosting. Blob GitHub del HTML ES: 2d96c21b7398b3f528092dc70aace20bf12e05a. Historial de página consultado: último cambio visible 25-sep-2026; cotejo completo contra commits/diccionarios históricos aún pendiente.

- Hallazgo confirmado: cada PT y EN tiene 24 párrafos estáticos; 9/24 son copias literales en español. Son nueve bloques largos de información diferenciadora sobre las unidades Postinho y Downwind (direcciones, acceso sin reserva, menús, horarios, condiciones y pagos). Las traducciones actuales no cubren esa ampliación; la semántica, continuidad con el diccionario posicional y actualización deben reconstruirse sin alterar la ficha fuente.
- H1 conserva correctamente el nombre del local y nueve H2 están traducidos. Titles y descriptions tienen formulación localizada. Canonical propio y cuatro hreflang de cabecera (es, pt-BR, en, x-default) son coherentes. No hay alternates FR.
- Sets de fuentes de imagen coinciden, aunque hay 10 tags en ES y 9 en PT/EN; no se cambiaron fotos. Se observaron alts de marca/nombre repetidos; requieren QA editorial sin cambiar la imagen. Cada HTML tiene 27 enlaces con rutas localizadas; no se tocaron href.
- GSC final (16-oct–12-nov): ES 102 impresiones/2 clics/pos. 12,5; PT 10/0/8,8; EN 7/0/6,9 (119 impresiones/2 clics). Periodo previo (18-sep–15-oct): ES 50, PT 30, EN 19 (99 impresiones/0 clics). La suma observada subió en 20 impresiones, sin inferir causa.
- Inspección GSC 3/3 ES/PT/EN PASS, Submitted and indexed, robots ALLOWED, fetch SUCCESSFUL y Google canonical=user. FR resulta desconocida para Google. Breadcrumbs detecta un elemento sin nombre: alerta de datos estructurados separada, no error de indexación.

Ficha no completa: faltan traducción editorial íntegra de los nueve bloques en PT/EN, cotejo histórico, FR, verificación de renderizador, QA semántico, build incremental/guard y capturas aprobadas 1440/390. No es publicable ni se cuenta validada a cuatro idiomas. Producción queda intacta.

**Contabilidad canónica que sustituye al corte anterior:** 35/50 auditadas, 0/50 completas, 0/50 nuevas publicadas en Hostinger, 15 pendientes. Próxima ruta candidata por impresiones de las pendientes: /gastronomia/rampinha/ (96 impresiones ES en el periodo final; verificar GSC e inventario antes de intervenir). CSV actualizado en commit 5aff3aaea9cde1ce505128d57cd6ab214e8d0ec6.

## Auditoría de producción — Rampinha (corte 36/50, 15/11/2026)

Producción Hostinger en revision/rendimiento-traducciones-81a904c, commit 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. ES/PT/EN leídos; FR no existe en hosting. Blob GitHub del HTML ES: e2a420af58c52f668b58974afcef623de6180836.

- Alerta editorial confirmada en HTML estático: 29 párrafos por variante; diez bloques PT y diez EN son texto español exacto. Incluyen información de localización, trayectoria y oferta del restaurante. Además, dos H2 de ampliación (“Notas adicionales de la guía V2” e “Información adicional conservada de la ficha V2”) siguen en español en PT/EN. Necesita rescatar diccionario/historial y traducción integral de esos pasajes, sin alterar el original ES.
- H1 y metadatos de título/descripción están localizados; nueve H2 originales traducidos. Canonical propio y alternates de cabecera es/pt-BR/en/x-default. Sin FR.
- 9/8/8 tags img y siete fuentes únicas reportadas; el set exacto de fuentes aún requiere comparación. Alts descriptivos 7/9 en ES y 6/8 en PT/EN. Hrefs únicos 20 ES vs 8 PT y 8 EN: faltan cotejar destinos y contexto; no se modificaron enlaces ni fotos.
- GSC final (16-oct–12-nov): ES 96 impresiones/1 clic/pos. 9,8; PT 4/0/8,0; EN 6/0/7,2 (106 impresiones). Periodo previo (18-sep–15-oct): ES 22 y PT 6 (28 observadas); EN sin fila. La comparación tiene cobertura distinta y no permite atribuir pérdida de rendimiento.
- Inspección GSC: 3/3 variantes ES/PT/EN PASS, enviadas/indexadas, robots ALLOWED, fetch SUCCESSFUL, canonical Google=user; FR URL desconocida. Breadcrumb detecta item sin nombre: alerta estructurada separada de indexación.

Ficha incompleta y no publicable: traducción PT/EN, FR, cotejo histórico, href, alts, QA semántico/runtime, build incremental, guard y capturas 1440/390 pendientes. No completa ni publicada; Hostinger intacto.

**Contabilidad canónica que sustituye al corte anterior:** 36/50 auditadas, 0 completas, 0 nuevas publicadas, 14 pendientes. Próxima candidata: seleccionar por impresiones actuales entre las 14 pendientes restantes y excluir las rutas ya auditadas en esta tanda; no asumir que la próxima referencia histórica sigue libre. CSV actualizado en commit e6cfb577e3c508f0a75b9b4ec3adeffe1e061658.

## Auditoría de producción — Faenza Copacabana (corte 37/50, 15/11/2026)

Hostinger producción revision/rendimiento-traducciones-81a904c, commit 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. ES/PT-BR/EN leídos; FR no existe. HTML ES espejo GitHub blob 110642f3335541a84cfba4f1fe3426912b16768f.

- Hallazgo confirmado: 30 párrafos por variante; 10/30 de PT y 10/30 de EN son párrafos completos copiados literalmente del español. Son contenido extendido sobre el buffet, ofertas, servicio y referencias de la ficha; además, dos H2 de ampliación de versión 2 están en español en PT/EN. El texto no fue modificado.
- H1, title, description y diez H2 base están localizados; los dos H2 V2 no. Canonical propio y cuatro alternates de cabecera es/pt-BR/en/x-default. Sin alternates FR.
- 11/10/10 tags img y nueve URLs únicas por idioma; alts y set exacto de fotos requieren QA comparativo. Hrefs normalizados: 21 ES frente a 9 PT/EN; hay 12 destinos por cotejar antes de cualquier restauración. Sin cambios a enlaces/fotos.
- GSC final (16-oct–12-nov): ES 205 impresiones/0 clics/pos. 12,5; PT 18/0/8,1; EN 1/0/4,0 (224 impresiones). Ventana previa (18-sep–15-oct): ES 79, PT 57, EN 6 (142). El total observado subió en 82; sin atribución causal.
- GSC inspección: ES/PT/EN 3/3 Submitted and indexed, robots ALLOWED, fetch SUCCESSFUL y canonical Google=user. FR desconocida; breadcrumbs reporta item sin nombre, alerta de datos estructurados y no de indexación.

Ficha incompleta/no publicable: recuperar y traducir los 10 párrafos y dos headings, cotejar fuente histórica, href y medios, completar francés, runtime, QA semántico, build/guard y capturas 1440/390. Producción intacta.

**Contabilidad canónica que sustituye al corte anterior:** 37/50 auditadas, 0/50 completas, 0/50 nuevas publicadas, 13 pendientes. Próxima candidata de la lista prioritaria con demanda alta: /gastronomia/haru/ (482 impresiones históricas del corte de cola; refrescar GSC antes de priorizar). Inventario actualizado en commit 7ab6d96333934edb2a073f268255a18e01bf0f49.

## Auditoría de producción — Haru Sushi Bar (corte 38/50, 15/11/2026)

Hostinger producción revision/rendimiento-traducciones-81a904c, commit 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. Variantes ES/PT-BR/EN leídas; FR ausente. HTML ES en espejo GitHub blob 6f897d6c60ca36d476d916d93d9e8b9ae25d1f97.

- Alerta de contenido confirmada: 23 párrafos por variante; 9/23 párrafos PT y EN son copias literales del ES. Un bloque describe las características del sushi bar; otros incorporan nuevos detalles editoriales. La ampliación no está traducida al portugués/inglés.
- H1 mantiene Haru Sushi Bar; metadatos title/description y nueve H2 base están localizados; canonical propio y hreflang de cabecera es/pt-BR/en/x-default correctos. Sin alterno FR.
- 12/11/11 tags img y 10 fuentes únicas por idioma. Hrefs 22 ES vs 10 PT/EN: los destinos diferenciales requieren cotejo, no se han cambiado. Alts en contexto pendientes.
- GSC final (16-oct–12-nov): ES 261 impresiones/0 clics/pos. 16,6; PT 14/0/7,6; EN 38/0/7,1 (313 impresiones). Periodo previo (18-sep–15-oct): ES 89, PT 37, EN 43 (169 impresiones). ES perdió posición media 10,4→16,6; PT y EN mejoraron; no hubo clics. No se atribuye causa.
- Inspección: 3/3 ES/PT/EN PASS, Submitted and indexed, ALLOWED/SUCCESSFUL, Google canonical=user. FR desconocida. Breadcrumb PASS con elemento “Unnamed item”: alerta estructurada, no fallo de indexación.

No completa/no publicable: recuperación PT/EN, fuente histórica, href, alt, francés completo, QA semántico/runtime, build incremental/guard y capturas aprobadas 1440/390 pendientes. Producción intacta.

**Contabilidad canónica que sustituye al corte anterior:** 38/50 auditadas, 0 completas, 0 nuevas publicadas, 12 pendientes. Inventario actualizado en commit 37ef9e65ede2367c6f5b7d13f257c6149f578041. Siguiente ficha libre a elegir por impresiones actuales y cola —priorizar las URL de alto volumen sin auditoría vigente—; verificar en GSC antes de abrirla.

## Auditoría de producción — Padarias (corte 39/50, 15/11/2026)

Hostinger producción revision/rendimiento-traducciones-81a904c, commit 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. ES/PT-BR/EN leídos; FR no existe. HTML ES del espejo GitHub blob 85a9cb7e8818c8cae10838db837eee4b6daa4abc.

- Estructura y contenido estático: 14 párrafos en cada idioma, sin coincidencia literal ES→PT/EN. H1, cinco H2, title y description están localizados. Canonical propio y alternates de cabecera es/pt-BR/en/x-default. Este cotejo literal no sustituye QA semántico del texto ni runtime.
- Cuatro tags img y dos fuentes únicas por idioma; dos atributos alt de cuatro no están vacíos. Requiere revisión de imágenes/alts sin cambiar fotos. 27 href únicos por idioma; no se alteraron.
- GSC final (16-oct–12-nov): ES 42 impresiones/0 clics/pos. 9,8; PT 16/0/35,4; EN 25/1/12,1 (83 imp.). Periodo previo (18-sep–15-oct): solo EN tuvo fila, con 255/0/pos. 8,7; EN cayó 230 impresiones (~90%) y su posición media empeoró 8,7→12,1. No hay datos previos de ES/PT y no se infiere causa.
- GSC inspección: ES/PT/EN 3/3 enviadas/indexadas, robots ALLOWED, fetch SUCCESSFUL, canonical Google=user; FR desconocida. Breadcrumbs PASS con un elemento sin nombre: alerta de datos estructurados, no un fallo de indexación.

Ficha no completa/publicable: traducción FR, QA semántico/rendimiento de renderizador, revisión de alts, build incremental/guard y capturas 1440/390 pendientes. Hostinger intacto.

**Contabilidad canónica que sustituye al corte anterior:** 39/50 auditadas, 0 completas, 0 nuevas publicadas, 11 pendientes. Siguiente candidata se escogerá por GSC actual entre rutas pendientes y no recertificadas. CSV actualizado en commit 3c3b04b99af36b2834f6f04ed757746a46fc51cb.

## Auditoría de producción — Tacacá do Norte (corte 40/50, 15/11/2026)

Hostinger producción revision/rendimiento-traducciones-81a904c, commit 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. ES/PT-BR/EN leídos; FR ausente. ES GitHub blob a626af38b86903322ba8b7f6e84e68cdda33e5ce.

- Alerta editorial confirmada: 21 párrafos por variante, 10/21 párrafos PT y EN idénticos literalmente al ES. Dos H2 de ampliación V2 (“Notas adicionales…” e “Información adicional…”) siguen solo en español en PT/EN. H1 es nombre propio del restaurante; title y description localizados; los H2 base están traducidos.
- Canonical propio y hreflang de cabecera es/pt-BR/en/x-default son coherentes. No se enlaza FR. 15/14/14 tags img, ocho fuentes únicas por idioma; alts con texto en 13/15 ES y 12/14 PT/EN. Hrefs 18 ES vs 6 PT/EN: doce destinos deben cotejarse antes de restaurar; no se tocaron.
- GSC final (16-oct–12-nov): ES 124 impresiones/0 clics/pos. 10,8; PT 10/0/6,6; EN 46/0/9,2 (180 impresiones). Periodo previo (18-sep–15-oct): ES 25, PT 34, EN 14 (73). La suma observada subió 107 impresiones, sin causalidad atribuida.
- Inspección GSC: 3/3 variantes ES/PT/EN Submitted and indexed, ALLOWED/SUCCESSFUL, Google canonical=user; FR URL unknown. Breadcrumb PASS con elemento sin nombre: alerta estructurada y no de indexación.

Ficha incompleta/no publicable: traducir 10 párrafos y dos headings, cotejar histórico/links/alt, FR, QA semántico/runtime, build incremental/guard y capturas 1440/390. Hostinger intacto.

**Contabilidad canónica que sustituye al corte anterior:** 40/50 auditadas, 0 completas, 0 nuevas publicadas, 10 pendientes. Inventario actualizado en commit 3516d72203da9c54d7bee7b5f94157f192acfb4c.

## Auditoría de producción — Bar Urca (corte 41/50, 15/11/2026)

Hostinger producción, rama `revision/rendimiento-traducciones-81a904c`, commit `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. HTML ES/PT-BR/EN leído; la ruta FR no existe en producción. El blob espejo de ES es `01f276c0689bb5d869999a92da8e7d93b7d6b785`.

- 23 párrafos por variante; **9/23 bloques PT y 9/23 EN son literalmente iguales al español**. La primera presentación y los H1/H2 están localizados; title y description también. Esto es una señal editorial concreta y no una evaluación semántica completa de los párrafos restantes.
- Canonical propio en cada variante y alternates `es`, `pt-BR`, `en`, `x-default` correctos; no hay alternate FR. 15/14/14 tags de imagen y 13 URLs fuente únicas compartidas; alts con texto en 13/15 ES y 12/14 PT/EN. Los 21 href ES frente a 9 PT/EN requieren cotejo; no se modificaron contenido, fotos ni enlaces.
- GSC final (16 oct–12 nov): ES 128 imp./0 clics/posición 14,2; PT 18/1/9,0; EN 18/0/30,1: total 164 impresiones/1 clic. Periodo anterior (18 sep–15 oct) solo devuelve fila ES: 47/0/21,6; no inferir cambios para PT/EN sin datos. Inspección GSC 3/3 ES/PT/EN Submitted and indexed, ALLOWED/SUCCESSFUL, canonical Google=user. FR es URL desconocida para Google; no es un error indexable confirmado.
- Ficha no completa/publicable: cotejo histórico, corrección íntegra PT/EN, traducción editorial FR, revisión de alts/enlaces, renderizador, build incremental/guard y capturas aprobadas 1440/390 pendientes. Producción intacta.

**Contabilidad canónica tras este corte:** 41/50 fichas auditadas en el registro de esta tanda; 0 completas bajo el criterio estricto, 0 nuevas publicadas, 9 pendientes. CSV guardado en commit `13e086fa135727101b800d6e58adc03157f7ce93`; continuidad actualizada en el commit documental posterior. Siguiente: elegir entre rutas de Gastronomía restantes por impresiones reales de GSC, excluir las ya auditadas/recertificadas y no cambiar producción.


## Auditoría de producción — Don Camillo (corte 42/50, 15/11/2026)

Hostinger producción (`revision/rendimiento-traducciones-81a904c`) en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; ES/PT-BR/EN leídos, FR no existe en producción. Blob ES verificado: `1098143db5f08861cb15bf597e09c8c55447da87`.

- 25 párrafos por variante. Intersección literal: **7 párrafos PT y 7 EN continúan íntegramente en español**. H1, diez H2, title y description están localizados. Canonical propio y hreflang `es`/`pt-BR`/`en`/`x-default` correctos; sin FR.
- Imágenes 12/11/11 tags, diez URL fuente únicas compartidas; alt con texto en 10/12 ES, 9/11 PT/EN. Hrefs únicos 21 ES vs 9 PT y 9 EN. Se anotan para cotejo, sin tocar fotos/enlaces.
- GSC final 16-oct–12-nov: no hay fila ES; PT 32 impresiones/1 clic/posición 8,2; EN 37/0/11,3. Periodo previo: ES 17/0/8,5 y PT 66/1/6,6; EN sin fila. No equiparar ausencia de fila a desindexación. Inspección GSC: 3/3 ES/PT/EN enviadas/indexadas, rastreo permitido/éxito, canonical Google=user. FR desconocida.
- No completa/publicable: traducir y cotejar bloques históricos, completar FR, alts/hrefs, QA semántico y runtime, build incremental/guard y capturas aprobadas a 1440/390. Hostinger no modificado.

**Contabilidad canónica tras este corte:** 42/50 auditadas; 0 completas, 0 nuevas publicadas, 8 pendientes. Inventario en commit `ef718e86fb1d6afb6ecede9a70d11e7b2fec6114`; este informe es el commit documental posterior. Siguiente: continuar con Bar do Omar por la prioridad GSC pendiente y repetir verificación completa contra producción.


## Auditoría de producción — Bar do Omar (corte 43/50, 15/11/2026)

Hostinger producción `revision/rendimiento-traducciones-81a904c` en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; ES/PT-BR/EN leídos, FR no existe. Blob ES `e55472577b72ee0dda7a4c3689f2489898f9941e`.

- 26 párrafos por variante; **9/26 PT y 8/26 EN son literalmente iguales al español**. La ruta tiene H1, title/description, primer H2 y los H2 base localizados; canonical propio y alternates `es`/`pt-BR`/`en`/`x-default` coherentes, sin FR.
- Imágenes 11/10/10 tags, nueve URLs fuente únicas compartidas; alts con texto 9/11 ES y 8/10 PT/EN. Hrefs 26 ES frente a 14 PT/EN: faltan cotejar destinos sin alterar enlaces. Diferencia numérica no se etiqueta como error hasta revisar tipos de link.
- GSC final (16 oct–12 nov): no aparece fila ES; PT 27 imp./1 clic/posición 7,4; EN 10/0/8,3. Periodo anterior: ES 42/0/10,7; EN 8/0/6,0; PT sin fila. Son datos de rendimiento, no diagnósticos de indexación.
- Inspección GSC 3/3 ES/PT/EN: Submitted and indexed, rastreo permitido y exitoso, canonical Google=user. FR URL desconocida para Google; no consta como error de indexación.
- No completa/publicable: cotejo de traducciones históricas, traducción íntegra PT/EN/FR, auditoría semántica de los bloques no literales y encabezados V2, revisar alts/hrefs, runtime, build incremental/guard y capturas aprobadas 1440/390. Producción intacta.

**Contabilidad canónica tras este corte:** 43/50 auditadas; 0 completas, 0 nuevas publicadas, 7 pendientes. Inventario en commit `57fc7c0f3d6dfa2556761e84bcf4bc3dd41be04b`; informe durable en el commit documental posterior. Siguiente: continuar en gastronomía por datos de impresiones y sin repetir rutas ya auditadas.


## Revalidación de producción — Spicy Fish (corte 44/50, 15/11/2026)

Hostinger producción `revision/rendimiento-traducciones-81a904c`, commit `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; blob ES `6c49d747f9a7a5712a8a4cb7927462bcf44c378d`. ES/PT-BR/EN presentes; FR no existe en producción.

- **8/29 párrafos PT y 8/29 EN siguen idénticos al español**, cotejados por texto normalizado. H1, H2 base y metadatos localizados; canonical propio y alternates `es`/`pt-BR`/`en`/`x-default` correctos. Sin alternate FR.
- 10/9/9 tags de imagen, ocho URLs únicas compartidas; alts con texto 8/10 ES y 7/9 PT/EN. Hrefs 22 ES frente a 10 PT/EN: pendientes de cotejo, sin modificar fotos ni enlaces.
- GSC final 16 oct–12 nov: ES 351 impresiones/2 clics/posición 7,6; PT sin fila; EN 5/0/6,8. Periodo previo: ES 77/0/7,6; EN 62/1/8,0; PT sin fila. No convertir ausencia de fila en problema de indexación.
- Inspección GSC: 3/3 ES/PT/EN Submitted and indexed, fetch permitido/exitoso, Google canonical=user; FR URL desconocida.
- La ficha estaba señalada como validada en el inventario heredado, pero la verificación vigente prueba traducción incompleta. No está completa/publicable: FR, cotejo editorial/histórico, alts/hrefs, runtime, build incremental/guard y capturas aprobadas 1440/390 pendientes. Producción intacta.

**Contabilidad canónica tras este corte:** 44/50 auditadas; 0 completas, 0 nuevas publicadas, 6 pendientes. Inventario actualizado en `41310fdf8502dfcbebf1d649614c703a5013f0b9`; este informe es el commit documental posterior. Siguiente prioridad por demanda histórica pendiente: Amendoeira, que también debe revalidarse contra producción.


## Revalidación de producción — Amendoeira (corte 45/50, 15/11/2026)

Hostinger producción `revision/rendimiento-traducciones-81a904c`, commit `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; blob ES `b3ed0ef51003d906992bc10b0d086b7304907627`. ES/PT-BR/EN están presentes; no existe FR.

- Intersección literal de párrafos: **11/24 PT y 9/24 EN continúan en español**. H1, H2 base, title/description localizados; canonical y alternates `es`/`pt-BR`/`en`/`x-default` válidos, sin FR.
- Imágenes 8/7/7 tags, seis URLs fuente únicas compartidas; alt con texto 6/8 ES y 5/7 PT/EN. Hrefs 21 ES frente a 9 PT/EN; revisar destinos. Se mantienen fotos/enlaces intactos.
- GSC final (16 oct–12 nov): ES 187 imp./1 clic/posición 9,6; PT y EN sin filas. Periodo previo: ES 8/0/10,4; EN 3/0/10,7; PT sin fila. La ausencia de fila no confirma desindexación.
- GSC inspection: 3/3 ES/PT/EN Submitted and indexed, fetch ALLOWED/SUCCESSFUL, canonical Google=user; FR URL desconocida para Google, no un error de indexación demostrado.
- Revalidación necesaria pese al estado heredado del inventario: no completa ni publicable. Faltan recuperar PT/EN, cotejo histórico, francés integral, QA semántico, alts/hrefs, runtime, build incremental/guard y capturas aprobadas 1440/390. Producción intacta.

**Contabilidad canónica tras este corte:** 45/50 auditadas; 0 completas, 0 nuevas publicadas, 5 pendientes. CSV actualizado en `e3a370efa911fb3b889a981947a2acafb5defc2d`; este informe es el commit documental posterior. Se seleccionarán las cinco rutas finales de la tanda solo después de cotejar la lista durable para evitar duplicar páginas ya auditadas.


## Auditoría de producción — cinco fichas finales de la tanda (corte 46–50/50, 15/11/2026)

Todas las lecturas se hicieron en Hostinger, producción `revision/rendimiento-traducciones-81a904c` a SHA `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; no se alteró producción. Datos de Search Console son impresiones/clics, no errores de rastreo. Se verificaron 15 inspecciones ES/PT/EN: 12 “Submitted and indexed”; Jobi PT y Oro PT y Joaquina PT/EN resultaron “Discovered - currently not indexed”, con estado de fetch no informado, por lo que son exclusiones sin error técnico confirmado. Las cinco URLs FR resultaron desconocidas para Google y no existen como páginas en Hostinger.


### Resultados por ficha

| Ficha | Hallazgo editorial ES/PT/EN | Indexación | FR | Estado estricto |
|---|---|---|---|---|
| jobi | 2/20 PT y 2/20 EN párrafos ES literales; indexación ES; PT descubierto y EN rastreado sin indexar; FR inexistente. | ES indexada; PT descubierta; EN rastreada/no indexada; canonical Google=declarado | URL desconocida | Incompleta/no publicada |
| stambul-copa | 8/25 PT y 8/25 EN párrafos ES literales; las tres variantes indexadas; FR inexistente. | 3/3 enviadas/indexadas; canonical Google=declarado | URL desconocida | Incompleta/no publicada |
| oro | 0/32 coincidencias literales PT y EN (no equivale a QA semántico); variante PT figura Descubierta/no indexada; FR inexistente. | PT descubierta; ES/EN indexadas; canonical Google=declarado | URL desconocida | Incompleta/no publicada |
| sel-ipanema | 11/30 PT y 10/30 EN párrafos ES literales; 3 variantes indexadas; FR inexistente. | 3/3 enviadas/indexadas; canonical Google=declarado | URL desconocida | Incompleta/no publicada |
| joaquina | 0/23 coincidencias literales PT y EN (no es QA semántico); ES/PT/EN con H1/H2 y metadata localizada; FR inexistente. | ES indexada; PT/EN descubiertas; canonical Google=declarado | URL desconocida | Incompleta/no publicada |

### Registro de estados para las 50 URLs

La tabla conserva los 50 destinos únicos y el SHA del HTML ES correspondiente en producción. Cuando la ruta no fue reexaminada en este corte, el estado se registra como no recertificado (no como validado); las cinco rutas finales sí se inspeccionaron en Hostinger/GSC ahora. Solo se marcan completas las páginas que pasaron los cuatro idiomas, render real, auditorías, SEO/sitemap y QA visual. **Resultado: 0/50 completas y 0/50 publicadas.**

| # | URL de producción | Estado real | SHA HTML ES producción |
|---:|---|---|---|
| 1 | https://www.ernestinhocarioca.com.br/gastronomia/don-camillo/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 1098143db5f08861cb15bf597e09c8c55447da87 |
| 2 | https://www.ernestinhocarioca.com.br/gastronomia/bar-do-omar/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | e55472577b72ee0dda7a4c3689f2489898f9941e |
| 3 | https://www.ernestinhocarioca.com.br/gastronomia/spicy-fish/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 6c49d747f9a7a5712a8a4cb7927462bcf44c378d |
| 4 | https://www.ernestinhocarioca.com.br/gastronomia/amendoeira/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | b3ed0ef51003d906992bc10b0d086b7304907627 |
| 5 | https://www.ernestinhocarioca.com.br/gastronomia/dumare/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | f2fbca8b8f9d514579d6e48a5e8102bd10d35130 |
| 6 | https://www.ernestinhocarioca.com.br/gastronomia/chama-rio-copacabana/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 5aab4304cd65e8006a7e9e410f0903495c3ef6be |
| 7 | https://www.ernestinhocarioca.com.br/gastronomia/carretao-siqueira/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 6cbdf907f1a363efbeb47e869215900b1fe8d2a6 |
| 8 | https://www.ernestinhocarioca.com.br/gastronomia/plage-cafe/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 7b18104abae1dcb68821af4663dafa6049206bf7 |
| 9 | https://www.ernestinhocarioca.com.br/gastronomia/sushi-leblon/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | f0960038eed49af92dfaf2c9618b88b30dbc0395 |
| 10 | https://www.ernestinhocarioca.com.br/gastronomia/zaza-bistro-tropical/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 3c81194462752ddc241b1cad847785ef44b5ec4a |
| 11 | https://www.ernestinhocarioca.com.br/gastronomia/terra-brasilis/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 1c3f6149742b62e50d233ef57f6b37dd8237d0fd |
| 12 | https://www.ernestinhocarioca.com.br/gastronomia/carretao-lido/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | fe48ac0c9ad39cbf3be490dc32c1e96010c29487 |
| 13 | https://www.ernestinhocarioca.com.br/gastronomia/cais-do-oriente/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 05e264793f8596559c400d7c410dc4064cda7e54 |
| 14 | https://www.ernestinhocarioca.com.br/gastronomia/galeto-sats/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 8c3ae87d894901f7cc85e1a9978c336effe9d177 |
| 15 | https://www.ernestinhocarioca.com.br/gastronomia/haru/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 6f897d6c60ca36d476d916d93d9e8b9ae25d1f97 |
| 16 | https://www.ernestinhocarioca.com.br/gastronomia/aprazivel/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 3c03174a60b9f5a6a7d472a2bbab0c01fa78a412 |
| 17 | https://www.ernestinhocarioca.com.br/gastronomia/churrascaria-palace/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | c5fb0bbb0ae6f528af3d33b398d4a69c39794aa0 |
| 18 | https://www.ernestinhocarioca.com.br/gastronomia/frontera-ipanema/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 94626d30d9afd92e49c049c324303228c1c81918 |
| 19 | https://www.ernestinhocarioca.com.br/gastronomia/temperarte-posto6/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 775dbd2edb1656bfd846f3d4f9ed37ccbd2892a7 |
| 20 | https://www.ernestinhocarioca.com.br/gastronomia/colombo-do-forte/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 9f2499455a34a28a49a0773e6ae0bab3a02d4cbf |
| 21 | https://www.ernestinhocarioca.com.br/gastronomia/faenza-copacabana/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 110642f3335541a84cfba4f1fe3426912b16768f |
| 22 | https://www.ernestinhocarioca.com.br/gastronomia/maska/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 498e10c390f3a116d42b114b145f312124ebf8dd |
| 23 | https://www.ernestinhocarioca.com.br/gastronomia/oteque/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 9129914e9b78ceaa06301cd7e5fcbe12326901f7 |
| 24 | https://www.ernestinhocarioca.com.br/gastronomia/cipriani/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 411f957b5da94bd0538ec512de661c723f4e8e31 |
| 25 | https://www.ernestinhocarioca.com.br/gastronomia/temperarte-bolivar/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | f8ce4e0f177997995a758aca7574908baf78a348 |
| 26 | https://www.ernestinhocarioca.com.br/gastronomia/casa-mohamed/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 834f65a78f2ba7e39312f87e6ea777c41834d09b |
| 27 | https://www.ernestinhocarioca.com.br/gastronomia/merci/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 97e8f123f1f5fe3c5a26e063b18680127a5ac768 |
| 28 | https://www.ernestinhocarioca.com.br/gastronomia/cafe-lamas/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 269e8e674e03122137909a0b4ce78675f8ae0d6f |
| 29 | https://www.ernestinhocarioca.com.br/gastronomia/lasai/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 95d467b7b6652323ae7f4a26c0feb88c88fec9a4 |
| 30 | https://www.ernestinhocarioca.com.br/gastronomia/tacaca-do-norte/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | a626af38b86903322ba8b7f6e84e68cdda33e5ce |
| 31 | https://www.ernestinhocarioca.com.br/gastronomia/cervantes-copacabana/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | abdc48e525942bf73fe72daefee731ea38819bf4 |
| 32 | https://www.ernestinhocarioca.com.br/gastronomia/rotisseria-sirio-libanesa/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | c0934b90f225b95e04592f9549dd0e37ca821925 |
| 33 | https://www.ernestinhocarioca.com.br/gastronomia/guacamole-copacabana/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | a08313c70caf9646590de9fea5ea53b7094e1034 |
| 34 | https://www.ernestinhocarioca.com.br/gastronomia/churrasqueira-rio/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 5018c17b722e2bb1cb7d65ae73214243ed8295f2 |
| 35 | https://www.ernestinhocarioca.com.br/gastronomia/garota-de-ipanema/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | a2d8617b16ec407f38cb69d9563a052e99ccd295 |
| 36 | https://www.ernestinhocarioca.com.br/gastronomia/bar-urca/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 01f276c0689bb5d869999a92da8e7d93b7d6b785 |
| 37 | https://www.ernestinhocarioca.com.br/gastronomia/polis-sucos/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 79fee661887876e6b21755854a8f21b1f53d139f |
| 38 | https://www.ernestinhocarioca.com.br/gastronomia/feira-sao-cristovao/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | dea40048e9a5d39fc77b7c29016b3f88f9ea2f60 |
| 39 | https://www.ernestinhocarioca.com.br/gastronomia/la-bicyclette/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 82631de53f3a33c2d67487ba563abd91e5baafbd |
| 40 | https://www.ernestinhocarioca.com.br/gastronomia/chez-claude/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 2e77c8f11c2d850bae3074dfbcc47ee965c42746 |
| 41 | https://www.ernestinhocarioca.com.br/gastronomia/stalos/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 34d677468e2a5b07c7b8055238a344bda86478eb |
| 42 | https://www.ernestinhocarioca.com.br/gastronomia/giuseppe-mar/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 318a57e414fc9fa64006343020e4fbbf064a1d4f |
| 43 | https://www.ernestinhocarioca.com.br/gastronomia/aipo-aipim-391/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | db591ebfddae31ecef0c5cf17ee39b28becabe09 |
| 44 | https://www.ernestinhocarioca.com.br/gastronomia/hollandaise/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 0f57ab5a0c0f56d4b17f181c56ce93838f239376 |
| 45 | https://www.ernestinhocarioca.com.br/gastronomia/mocellin-steak/ | Pendiente de recertificación en esta ejecución; no hay evidencia actual que permita declararla completa/publicada. | 3553279f2696fd6b2f913d0adba0d0e4904ac9f9 |
| 46 | https://www.ernestinhocarioca.com.br/gastronomia/jobi/ | Auditada ahora: PT/EN 2/20 párrafos literales ES; ES indexada, PT descubierta, EN rastreada sin indexar; FR no existe. No completa. | 228f39e151ad55c8be9077423e0950acfcab64a5 |
| 47 | https://www.ernestinhocarioca.com.br/gastronomia/stambul-copa/ | Auditada ahora: PT/EN 8/25 párrafos literales ES; 3/3 indexadas; FR no existe. No completa. | b317ce518b57df93758020ee5d3001e44d0316cb |
| 48 | https://www.ernestinhocarioca.com.br/gastronomia/oro/ | Auditada ahora: 0/32 coincidencias literales PT/EN (sin dictamen semántico); PT descubierta/no indexada; ES/EN indexadas; FR no existe. No completa. | b14c975bf22457c77dd3702662509a9460b287ed |
| 49 | https://www.ernestinhocarioca.com.br/gastronomia/sel-ipanema/ | Auditada ahora: PT 11/30 y EN 10/30 párrafos literales ES; 3/3 indexadas; FR no existe. No completa. | 9c1f030f233f00ecf601f679170b0bf6c46ce84e |
| 50 | https://www.ernestinhocarioca.com.br/gastronomia/joaquina/ | Auditada ahora: 0/23 coincidencias literales PT/EN; ES indexada, PT/EN descubiertas/no indexadas, sin fallo de fetch observado; FR no existe. No completa. | c8ba68361265cdf3083438493a7dff1ddd9505da |

**Contabilidad final de esta tanda:** 50/50 rutas con estado registrado; 0/50 cumplen todos los criterios de cuatro idiomas, incrementabilidad, SEO/canonical/hreflang/sitemap, auditorías semánticas, capturas aprobadas a 1440/390 y demás guardas. 0/50 publicadas en Hostinger. Las exclusiones GSC que no proporcionan error de fetch/canonical quedan pendientes de seguimiento y no se etiquetan como fallos técnicos. Inventario maestro actualizado en commit `f57881fb5aff67aaa229b2fc17726ff8085aa2f1`; informe en el commit documental posterior. La continuación siguiente es una nueva tanda desde la cola prioritaria de Gastronomía por impresiones, sin reutilizar páginas ya completas (en este corte ninguna quedó completa) y sin recontar lo ya auditado.


# Tanda siguiente — Gastronomía por demanda GSC (15/11/2026)

## Auditoría de producción — Ocyá Ilha (2.ª tanda, ficha 1/50)

Fuente: Hostinger `revision/rendimiento-traducciones-81a904c` a `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; blob ES `c1938776e73a5232d6c8faa3cbfbb4cefad4ae0a`. Hay 30 párrafos por idioma; **9/30 PT y 9/30 EN siguen literalmente en español**. H1, H2 base y metadata localizados. Canonical y hreflang `es`/`pt-BR`/`en`/`x-default` correctos; FR no existe en Hostinger ni es conocido por Google. Imágenes 10/9/9, ocho URLs fuente comunes; alts con texto 8/10 ES y 7/9 PT/EN. Hrefs 20 ES vs 8 PT/EN pendientes de cotejo, sin cambio de enlaces. GSC actual (16-oct–12-nov): ES 90 imp./1 clic/posición 13,9; EN 19/0/8,4; PT sin fila. Periodo anterior ES 11/0/6,9 y EN 68/0/9,1. Inspección 3/3 ES/PT/EN Submitted and indexed, fetch permitido/exitoso, canonical Google=user; FR URL desconocida.

**No completa/no publicable:** recuperar los bloques PT/EN tras cotejo semántico e histórico, traducir FR íntegra, auditar alt/enlaces, runtime/build incremental/guard y capturas 1440/390. Producción intacta.

## Cola de la segunda tanda — 50 URL priorizadas (cola corregida)

Base: maestro ES/PT-BR/EN/FR y GSC final (2026-10-16–2026-11-12). Excluye las 50 URLs de la primera tanda y fichas con auditoría previa; conserva Ocyá Ilha como ficha 1/50 ya auditada parcialmente. Las 49 fichas restantes se ordenan por impresiones sumadas ES/PT-BR/EN. SHA identifica el blob HTML ES exacto en producción `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. Los estados iniciales son del inventario, no QA final. Se filtraron fuera Fast Food, Clássico Beach Club Barra, Rampinha y Padarias, ya auditadas.

| # | URL | Impresiones GSC actuales | Estado inicial ES/PT-BR/EN/FR | SHA HTML ES producción | Estado de esta tanda |
|---:|---|---:|---|---|---|
| 1 | https://www.ernestinhocarioca.com.br/gastronomia/ocya-ilha/ | 109 | Auditada; indexada / Incompleta: 9/30 párrafos ES literales / Incompleta: 9/30 párrafos ES literales / Pendiente | c1938776e73a5232d6c8faa3cbfbb4cefad4ae0a | Auditada parcialmente; incompleta |
| 2 | https://www.ernestinhocarioca.com.br/gastronomia/mee/ | 93 | Pendiente / En revisión / En revisión / Pendiente | 599c7ff00879856491c7203c36bf5931db084178 | Auditada ahora: 7/25 párrafos PT y 7/25 EN literales ES; 3/3 ES/PT/EN indexadas/fetch/canonical válidos; FR no existe. Incompleta. |
| 3 | https://www.ernestinhocarioca.com.br/gastronomia/ryu/ | 82 | Pendiente / En revisión / En revisión / Pendiente | 5543e1e8019f0d966d972d36ce971445b42c4cd2 | Auditada ahora: PT 8/29 y EN 8/29 párrafos ES literales; 3/3 ES/PT/EN indexadas/fetch/canonical válidos; FR no existe. Incompleta. |
| 4 | https://www.ernestinhocarioca.com.br/gastronomia/satyricon/ | 73 | Pendiente / En revisión / En revisión / Pendiente | e9b1b68e35db88362cbefca6fc900b7cd0d80824 | Auditada ahora: texto PT/EN lingüísticamente mezclado/malformado (9/32 y 11/32 párrafos literales ES); 3/3 indexadas; FR no existe. Bloqueo editorial, no publicable. |
| 5 | https://www.ernestinhocarioca.com.br/gastronomia/armazem-sao-thiago/ | 69 | Pendiente / En revisión / En revisión / Pendiente | f44d6602cf96a8f7f8d070f6ee7cb9ab83a93993 | Auditada ahora: 9/23 párrafos PT y 9/23 EN literales ES; 3/3 indexadas; FR ausente. Incompleta. |
| 6 | https://www.ernestinhocarioca.com.br/gastronomia/brota/ | 62 | En revisión / Corregido o traducido / Corregido o traducido / Corregido o traducido | e31a7f7dc52c2a4f1babe297da011ca300d4cc16 | Pendiente de auditoría de producción |
| 7 | https://www.ernestinhocarioca.com.br/gastronomia/fiorino/ | 60 | Pendiente / En revisión / En revisión / Pendiente | c6b987695fc2c40ff2bb9853fc4b314f8b1f210c | Pendiente de auditoría de producción |
| 8 | https://www.ernestinhocarioca.com.br/gastronomia/delirio/ | 59 | Pendiente / En revisión / En revisión / Pendiente | 3242deca8f1d7e38dbb99d70be9a8c3b6b810d18 | Pendiente de auditoría de producción |
| 9 | https://www.ernestinhocarioca.com.br/gastronomia/arab-leblon/ | 57 | Pendiente / En revisión / En revisión / Pendiente | 9e647deb84f359e47a9fff3444893f42d4acbcd2 | Pendiente de auditoría de producción |
| 10 | https://www.ernestinhocarioca.com.br/gastronomia/dumare-copa/ | 51 | Pendiente / Pendiente / Pendiente / Pendiente | c12aa7476e5a9a9908a7ef08c7a9e7ad247322b8 | Pendiente de auditoría de producción |
| 11 | https://www.ernestinhocarioca.com.br/gastronomia/bar-luiz/ | 46 | Pendiente / En revisión / En revisión / Pendiente | cfc4b7c6d35a55ee808456ae1b68d65b846ffc2b | Pendiente de auditoría de producción |
| 12 | https://www.ernestinhocarioca.com.br/gastronomia/cabanna/ | 44 | Pendiente / En revisión / En revisión / Pendiente | 9b48bcb19240242a3e81e0c9c3e95cd54548e6c6 | Pendiente de auditoría de producción |
| 13 | https://www.ernestinhocarioca.com.br/gastronomia/nova-capela/ | 44 | Pendiente / En revisión / En revisión / Pendiente | e9f91260d5e63d1ddad741fd2ebb36e7e85a7f83 | Pendiente de auditoría de producción |
| 14 | https://www.ernestinhocarioca.com.br/gastronomia/bira-de-guaratiba/ | 43 | Pendiente / En revisión / En revisión / Pendiente | f675da0898a79bbaacec58a933523b1d522bc8fe | Pendiente de auditoría de producción |
| 15 | https://www.ernestinhocarioca.com.br/gastronomia/cafe-do-alto/ | 42 | Pendiente / En revisión / En revisión / Pendiente | 9fa6005690ad4fed2d04593e76834b00caefd2e5 | Pendiente de auditoría de producción |
| 16 | https://www.ernestinhocarioca.com.br/gastronomia/classico-leme/ | 42 | Pendiente / En revisión / En revisión / Pendiente | 4ab5e62c48b0f9ed4fb0c8c9f5e578271ea20f20 | Pendiente de auditoría de producción |
| 17 | https://www.ernestinhocarioca.com.br/gastronomia/casa-porto/ | 38 | Pendiente / En revisión / En revisión / Pendiente | a763223f928ef4eaef4889c0d8a88ad8ffa50f88 | Pendiente de auditoría de producción |
| 18 | https://www.ernestinhocarioca.com.br/gastronomia/alloro/ | 37 | Pendiente / Pendiente / Pendiente / Pendiente | 42b6b1498e2a2bf86e7937b7fb86ba1567923583 | Pendiente de auditoría de producción |
| 19 | https://www.ernestinhocarioca.com.br/gastronomia/casas-de-suco/ | 36 | Pendiente / Pendiente / Pendiente / Pendiente | 5fb5b1247ac0a7f8d26681ebf50b6f351aec2f82 | Pendiente de auditoría de producción |
| 20 | https://www.ernestinhocarioca.com.br/gastronomia/tia-palmira/ | 29 | Pendiente / En revisión / En revisión / Pendiente | 8b5e209fa129e5bb11e11207d064d9013842b219 | Pendiente de auditoría de producción |
| 21 | https://www.ernestinhocarioca.com.br/gastronomia/aipo-aipim-920/ | 28 | Pendiente / En revisión / En revisión / Pendiente | 107f3a973fc5ded3804ca82f680ea9798d74c250 | Pendiente de auditoría de producción |
| 22 | https://www.ernestinhocarioca.com.br/gastronomia/galeto-liceu/ | 25 | Pendiente / En revisión / En revisión / Pendiente | e7c8c87fa00cc2f0dfa819e598f3559360dd4bd4 | Pendiente de auditoría de producción |
| 23 | https://www.ernestinhocarioca.com.br/gastronomia/lanches-cariocas/ | 25 | Pendiente / Pendiente / Pendiente / Pendiente | 8f90895dc47fa67d9b2dbbe14eebe6720698ca7b | Pendiente de auditoría de producción |
| 24 | https://www.ernestinhocarioca.com.br/gastronomia/venga-ipanema/ | 25 | Pendiente / En revisión / En revisión / Pendiente | 6660786e8f609092bc90042852294fb3a70afe4a | Pendiente de auditoría de producción |
| 25 | https://www.ernestinhocarioca.com.br/gastronomia/shiso/ | 24 | Pendiente / En revisión / En revisión / Pendiente | 243ffc89ca85060c20c2eb68fe813caab2ab575f | Pendiente de auditoría de producción |
| 26 | https://www.ernestinhocarioca.com.br/gastronomia/samba-social/ | 22 | Pendiente / En revisión / En revisión / Pendiente | 7bcafd2ba28339b41830c0f4404264a83c00db48 | Pendiente de auditoría de producción |
| 27 | https://www.ernestinhocarioca.com.br/gastronomia/pergula/ | 47 | En revisión / En revisión / En revisión / FR inexistente | 09e4f0bf147f041e58169e60b5dbf673416bc128 | Auditada ahora: 25 párrafos ES/PT/EN; diccionario histórico PT/EN 19/19 exacto; 3/3 indexadas; ES 47 impresiones, FR ausente; no completa, faltan QA runtime/visual/incremental. |
| 28 | https://www.ernestinhocarioca.com.br/gastronomia/lilia/ | 20 | En revisión / En revisión / En revisión / FR inexistente | 696a34af2c48123eac989e742d0685d57502e567 | Auditada ahora: 33 párrafos ES/PT/EN; histórico PT/EN 19/19 exacto; 3/3 indexadas; GSC ES 56 impresiones; FR no existe; incompleta a falta de QA visual/runtime/build. |
| 29 | https://www.ernestinhocarioca.com.br/gastronomia/margutta-ipanema/ | 20 | En revisión / En revisión / En revisión / FR inexistente | bac03372e3546c78ca2c859be786a8987870bd04 | Auditada ahora: 29 párrafos ES/PT/EN; histórico PT/EN 17/19 exacto, 2 etiquetas localizadas; 3/3 indexadas; FR ausente; incompleta. |
| 30 | https://www.ernestinhocarioca.com.br/gastronomia/jojo/ | 18 | En revisión / En revisión / En revisión / FR inexistente | e5679c262f3a9dbc1c622987f416898767ef3311 | Auditada ahora: 31 párrafos ES/PT/EN; histórico PT/EN 10/19 exacto y 9 evolucionados pendientes de cotejo; 3/3 indexadas; FR ausente. Incompleta. |
| 31 | https://www.ernestinhocarioca.com.br/gastronomia/teva/ | 16 | En revisión / En revisión / En revisión / FR inexistente | 309fdbe181356c68426e7d6412289cd4215ca9a0 | Auditada ahora: 31 párrafos ES/PT/EN; histórico PT/EN 19/19 exacto; 3/3 indexadas; GSC ES 38 impresiones/0 clics/pos27,4; FR ausente. Incompleta. |
| 32 | https://www.ernestinhocarioca.com.br/gastronomia/la-fiorentina-ipanema/ | 12 | En revisión / En revisión / En revisión / FR inexistente | 1ec5b94fd56ffa84c84213077bec6cd67847c3b5 | Auditada ahora: 20 párrafos ES/PT/EN; histórico PT/EN 15/15 exacto; GSC ES duplica canónica sin slash; PT/EN 2/2 indexadas; FR ausente. Incompleta y alerta SEO confirmada. |
| 33 | https://www.ernestinhocarioca.com.br/gastronomia/delirio-centro/ | 10 | Pendiente / Pendiente / Pendiente / Pendiente | 1ec5c674e164efdfb7429aa5cf42b72ab10ca842 | Pendiente de auditoría de producción |
| 34 | https://www.ernestinhocarioca.com.br/gastronomia/ginga/ | 10 | Pendiente / En revisión / En revisión / Pendiente | 378cef2ae11b2a5834041c63d941aa9c82458e04 | Pendiente de auditoría de producción |
| 35 | https://www.ernestinhocarioca.com.br/gastronomia/praia-skol-copa/ | 10 | En revisión / Corregido o traducido / Corregido o traducido / Corregido o traducido | 70861b9ba60ea9e99a22d155df649b3c1bca6722 | Pendiente de auditoría de producción |
| 36 | https://www.ernestinhocarioca.com.br/gastronomia/don-pascual/ | 8 | Pendiente / En revisión / En revisión / Pendiente | 5fd8bcf9b337a1bbde6f35717e0afb39c998de27 | Pendiente de auditoría de producción |
| 37 | https://www.ernestinhocarioca.com.br/gastronomia/naga/ | 8 | Pendiente / En revisión / En revisión / Pendiente | c496b438d039718998286c4203b5b4d2497b00c3 | Pendiente de auditoría de producción |
| 38 | https://www.ernestinhocarioca.com.br/gastronomia/pobre-juan/ | 8 | Pendiente / En revisión / En revisión / Pendiente | d22cc0644cc24cfd6ff369c3e3240cadcafa83eb | Pendiente de auditoría de producción |
| 39 | https://www.ernestinhocarioca.com.br/gastronomia/aconchego-carioca/ | 6 | Pendiente / Pendiente / Pendiente / Pendiente | 608718bad8f7935506a7486b3c402fc18e8acd35 | Pendiente de auditoría de producción |
| 40 | https://www.ernestinhocarioca.com.br/gastronomia/mosteiro/ | 6 | Pendiente / En revisión / En revisión / Pendiente | aa1d1f40f3945a87bf3f240c27d9cc780e0db5a5 | Pendiente de auditoría de producción |
| 41 | https://www.ernestinhocarioca.com.br/gastronomia/otto/ | 6 | Pendiente / En revisión / En revisión / Pendiente | 5c57ddb89b7c71fbaadcd2a3a291f5a85d669680 | Pendiente de auditoría de producción |
| 42 | https://www.ernestinhocarioca.com.br/gastronomia/eclipse/ | 5 | Pendiente / En revisión / En revisión / Pendiente | 227e1879d6fe2cc55d4cad20b8d6804b0bd819e4 | Pendiente de auditoría de producción |
| 43 | https://www.ernestinhocarioca.com.br/gastronomia/flor-do-ceu/ | 5 | Pendiente / En revisión / En revisión / Pendiente | 117adadc0072b9e02af6c2266872e005b739e241 | Pendiente de auditoría de producción |
| 44 | https://www.ernestinhocarioca.com.br/gastronomia/xodozin-copa/ | 5 | Pendiente / En revisión / En revisión / Pendiente | e3501501ca328705040d49d4e700769313d8e90d | Pendiente de auditoría de producción |
| 45 | https://www.ernestinhocarioca.com.br/gastronomia/amir/ | 4 | Pendiente / En revisión / En revisión / Pendiente | 72090b48af7e749f9a794018c4c242bdc7885ff2 | Pendiente de auditoría de producción |
| 46 | https://www.ernestinhocarioca.com.br/gastronomia/bracarense/ | 3 | Pendiente / En revisión / En revisión / Pendiente | 5251c224729e4fccb3bc6c5f0928777469d2e479 | Pendiente de auditoría de producción |
| 47 | https://www.ernestinhocarioca.com.br/gastronomia/canton/ | 3 | Pendiente / En revisión / En revisión / Pendiente | 1ef90c65f0a76bdfb7a271fcbc15e295457c4270 | Pendiente de auditoría de producción |
| 48 | https://www.ernestinhocarioca.com.br/gastronomia/espetto-quiosque/ | 3 | Pendiente / Pendiente / Pendiente / Pendiente | 1bc3589f25032ce077a5dfa2c944a7dd3a53d119 | Pendiente de auditoría de producción |
| 49 | https://www.ernestinhocarioca.com.br/gastronomia/esquimo/ | 3 | Pendiente / En revisión / En revisión / Pendiente | 97f3e88b454d148e34a44e1b142216b786d3c62d | Pendiente de auditoría de producción |
| 50 | https://www.ernestinhocarioca.com.br/gastronomia/alfaia/ | 2 | Pendiente / Pendiente / Pendiente / Pendiente | d584703d3829e37e621f4a3db494385bba2bd2ce | Pendiente de auditoría de producción |

**Punto durable:** tanda 2 con 50 fichas exactas; 1/50 auditada, 0/50 completas, 0/50 publicadas, 49 por trabajar. Próxima #2: `/gastronomia/mee/` según GSC. No contar nada sin PT/EN/FR completos y QA integral.


## Auditoría de producción — Mee (segunda tanda, ficha 2/50; 15/11/2026)

Hostinger producción `revision/rendimiento-traducciones-81a904c` SHA `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; blob ES `599c7ff00879856491c7203c36bf5931db084178`. Conteo comprobado: **25 párrafos por ES/PT/EN**, con **7/25 PT y 7/25 EN literalmente iguales al español**. H1/H2 base, title/description localizados; canonical propio y hreflang `es`/`pt-BR`/`en`/`x-default` válidos. No hay contenido FR en producción.

Imágenes 11/10/10 tags y nueve fuentes únicas comunes; alts con texto 9/11 ES, 8/10 PT/EN. Hrefs 22 ES vs 10 PT/EN pendientes de cotejo; no se modifican. GSC 16-oct–12-nov: ES 78 imp./1 clic/posición 17,9; EN 15/0/7,7; PT sin fila (93 imp. sumadas). Periodo anterior: ES 15/0/9,6; EN 49/0/6,2. La caída de EN es una señal de rendimiento, no un diagnóstico de indexación. Inspección 3/3 ES/PT/EN Submitted and indexed, fetch correcto, canonical Google=user; FR URL desconocida.

Ficha no completa/no publicable: recuperación editorial/histórica de los bloques ES en PT/EN, francés completo, alts/hrefs, runtime, build incremental/guard y capturas aprobadas 1440/390 pendientes. Producción intacta.

**Contabilidad de la segunda tanda:** 2/50 auditadas, 0 completas, 0 publicadas; 48 pendientes. CSV `700bc06f5d5a12da4f25ef842d0ee10a9e6c0a5b`; informe en commit documental posterior. Próxima URL #3 de la cola: `/gastronomia/ryu/`.


## Auditoría de producción — Ryu (segunda tanda, ficha 3/50; 15/11/2026)

Hostinger producción `revision/rendimiento-traducciones-81a904c` SHA `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; blob ES `5543e1e8019f0d966d972d36ce971445b42c4cd2`. De **29 párrafos por variante, 8/29 PT y 8/29 EN son literalmente iguales al ES**. H1, metadata y H2 base localizados; canonical propio y hreflang `es`/`pt-BR`/`en`/`x-default` coherentes, sin FR.
Imágenes 9/8/8 tags, siete URLs fuente comunes; alt con texto 7/9 ES y 6/8 PT/EN. Hrefs 21 ES frente a 9 PT/EN, pendientes de cotejo sin alterar destinos. GSC final actual: PT 82 imp./1 clic/posición 8,5; ES y EN sin fila. Periodo previo ES 9/0/7,3 y EN12/0/7,0. Inspección 3/3 ES/PT/EN Submitted and indexed, fetch SUCCESSFUL y canonical Google=user; FR URL unknown.
No completa/no publicable: corregir y cotejar párrafos históricos PT/EN, FR integral, alts/hrefs, QA semántico/runtime, build incremental/guard y capturas aprobadas 1440/390. Hostinger intacto.

**Tanda 2 actualizada:** 3/50 auditadas, 0 completas, 0 publicadas, 47 pendientes. CSV `fa446f011e6bc1449f403a94fce481ee687573b6`; informe en commit posterior. Próxima ficha #4: `/gastronomia/satyricon/`.


## Auditoría de producción — Satyricon (segunda tanda, ficha 4/50; 15/11/2026)

Hostinger producción `revision/rendimiento-traducciones-81a904c`, SHA `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; blob ES `e9b1b68e35db88362cbefca6fc900b7cd0d80824`. En 32 párrafos por variante, 9 PT y 11 EN coinciden literalmente con el ES. Además, el cuerpo PT/EN contiene traducción malformada y mezcla de idiomas (por ejemplo, “marisclos”, “cocina mediterrânea”, “meslas preparadlas”). Es una incidencia editorial confirmada; no se sustituirá con traducción automática sin recuperar y cotejar el contenido histórico.
H1/title y H2 base localizados, pero no bastan para aprobar. Imágenes 11/10/10 tags, nueve URLs de imagen comunes; alts con texto 9/11 ES, 8/10 PT/EN. Hrefs 22 ES vs10 PT/EN pendientes de comparar sin modificarlos. Canonical propio y alternates ES/PT-BR/EN/x-default correctos, sin FR. GSC actual 16-oct–12-nov: PT64 impresiones/1 clic/posición14,9; EN9/0/7,4; periodo previo PT33/1/12,7, EN18/0/7,2, ES10/0/10,8. Inspección 3/3 ES/PT/EN enviada/indexada, fetch SUCCESSFUL y canonical Google=user; FR URL unknown.
No completa/no publicable. Faltan recuperar PT/EN fieles al historial, traducción FR integral, QA semántico, alts/hrefs, runtime, build incremental/guard y capturas aprobadas 1440/390. Producción intacta.

**Tanda 2 actualizada:** 4/50 auditadas; 0 completas; 0 publicadas; 46 pendientes. CSV `8ec44cabb19d56e18d2e5119846ad4bf91f446ed`; informe en commit documental posterior. Próxima ficha #5: `/gastronomia/armazem-sao-thiago/`.


## Auditoría de producción — Armazém São Thiago (segunda tanda, ficha 5/50; 15/11/2026)

Hostinger producción `revision/rendimiento-traducciones-81a904c` SHA `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; blob ES `f44d6602cf96a8f7f8d070f6ee7cb9ab83a93993`. 23 párrafos por ES/PT/EN; **9/23 PT y 9/23 EN son literalmente iguales al ES**. H1, H2 base y metadata localizados; canonical propio y alternates es/pt-BR/en/x-default correctos, sin FR.
Imágenes 10/9/9 tags, ocho URL fuente comunes; alt con texto 8/10 ES y 7/9 PT/EN. Hrefs 22 ES vs10 PT/EN requieren cotejo. GSC actual: ES 69 imp./1 clic/posición13,3; PT/EN sin filas. Previo: ES13/0/18,5 y EN24/0/10,0. Inspección 3/3 indexada, fetch exitoso y canonical Google=user; FR URL desconocida.
No completa/no publicable: traducción PT/EN, cotejo histórico, FR integral, alts/hrefs, QA semántico/runtime, build/guard y capturas 1440/390 pendientes. Producción intacta. **Tanda 2: 5/50 auditadas, 0 completas, 0 publicadas, 45 pendientes.** CSV `a6fd9ecacdd6b4baf7ba409615804ce896c8cfae`; informe posterior. Siguiente #6: `/gastronomia/brota/`.


## Auditoría de producción — Brota (segunda tanda, ficha 6/50; 15/11/2026)

Hostinger producción verificada: rama `revision/rendimiento-traducciones-81a904c`, HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; blob HTML ES de Brota `e31a7f7dc52c2a4f1babe297da011ca300d4cc16`. El HTML consultado contiene 18 párrafos ES y 16 en cada idioma PT-BR/EN; **7 párrafos de cada versión PT/EN son idénticos al ES**. El título, descripción e introducción están localizados, pero el cuerpo permanece incompleto. El inventario anterior decía “Corregido o traducido” para PT/EN/FR; el estado de producción actual contradice esa etiqueta y queda corregido. Las consultas de los commits históricos `42d03024...`, `8570793a...` y revisiones disponibles de la página ES no localizaron un texto PT/EN íntegro que permita afirmar recuperación histórica. No se asumió que el diccionario mencionado en el inventario sea suficiente ni se sustituyeron traducciones.

Los canonical de ES/PT-BR/EN apuntan a su URL propia; los alternates publicados son es/pt-BR/en/x-default, sin FR. No se encontró HTML FR en producción. Conteo de medios: 11/10/10 imágenes; las diez fuentes de PT/EN coinciden con fuentes ES; hay 9/11 alts con texto en ES y 8/10 en PT/EN. Enlaces: 26 en ES frente a 14 en PT/EN; pendiente el cotejo de destinos y elementos de navegación, sin cambios aplicados. El sitemap no se recontó en esta ficha. GSC final (2026-10-16–2026-11-12): ES 58 impresiones/1 clic/posición 10,5; PT 18/0/8,9; EN 4/0/3,8. Inspección GSC 3/3 PASS, enviada e indexada, fetch exitoso y canonical Google=declarado. GSC también devuelve una alerta de breadcrumb “Elemento sin nombre”; es alerta de datos estructurados, no un error de indexación confirmado.

**Estado:** ES auditada; PT-BR y EN incompletos (7 bloques idénticos al ES por idioma); FR ausente; ficha no completa/no publicable. Faltan recuperar y cotejar el texto PT/EN y su fuente, completar FR de forma editorial, comparar enlaces/alts, comprobar renderizadores/build incremental/guard y aprobar capturas 1440/390. Hostinger producción intacta. CSV actualizado en `42c1c02703ec8d21011b2b1122a6cbd173da5d77`.

**Punto durable de continuación:** tanda 2 exacta de 50 URL; 6/50 auditadas, 0 completas, 0 publicadas y 44 pendientes. La URL #7 verificada en la cola es `/gastronomia/fiorino/` (blob ES de producción `c6b987695fc2c40ff2bb9853fc4b314f8b1f210c`).

## Auditoría de producción — Fiorino (segunda tanda, ficha 7/50; 15/11/2026)

Producción confirmada: `revision/rendimiento-traducciones-81a904c` en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `c6b987695fc2c40ff2bb9853fc4b314f8b1f210c`. La fuente PT/EN histórica sí está localizada: `assets/js/translations/chunks/gastronomia-01.js`, blob actual `b65f55e1afa064cb9ae3ab274a56b8a9a9f3dfa1`, con traducciones de Fiorino incluidas en el commit del 25/09 `a45459ace42d03e8ec985dd23dfd3c43eeaf1704`. El cuerpo servido tiene 35 párrafos en cada idioma: solo dos PT/EN son literales ES; uno es una atribución de fuentes deliberadamente trilingüe y el otro sí deja español: “Avenida Heitor Beltrão 126; metro Saens Peña y taxi.” El resto de la prosa principal coincide con el contenido traducido de la fuente histórica. ES/PT/EN tienen título y descripción localizados; H1 conserva el nombre propio. Canonical y alternates es/pt-BR/en/x-default corresponden; FR no existe en el hosting y no está en hreflang.

Hay 10 imágenes por idioma, las mismas fuentes. Nueve alts coinciden porque nombran el restaurante “Fiorino Ristorante” (correcto como nombre propio); el alt del logo Cadastur sí se localiza. Dos imágenes decorativas del avatar Carioc-IA tienen alt vacío en las tres variantes, pendiente de revisar con el criterio de accesibilidad del componente. Hrefs son 26 por idioma; la diferencia restante es de rutas locales/nav, no se cambió ningún destino. GSC final (2026-10-16–11-12): ES 12 impresiones/0 clics/posición 31,7; PT 21/0/10,4; EN 60/1/17,1. Periodo previo: PT 22/0/11,7, EN 11/0/19,2; no hubo fila ES. La posición de EN mejora 2,1 puestos y crece de 11 a 60 impresiones; los periodos son consecutivos y de 28 días. Inspección 3/3 PASS, enviada e indexada, fetch correcto y canonical Google=declarado. GSC advierte un breadcrumb “Elemento sin nombre”; se registra como alerta de datos estructurados, no error de indexación confirmado.

**Estado:** PT/EN casi completos y trazados a diccionario histórico, con una frase residual por resolver; FR ausente; no cuenta como ficha completa. Falta traducir/verificar FR integralmente, localizar la frase residual con el renderizador real, resolver o justificar alts vacíos, validar enlaces internos y capturas 1440/390 y pasar build incremental/guard. No se tocó la página ni producción. CSV actualizado en `9e3bdbc374c22842911066b777d584811afea110`.

**Checkpoint vigente:** tanda 2 con exactamente 50 URL; 7/50 auditadas, 0 completas, 0 publicadas y 43 pendientes. La siguiente URL #8 es `/gastronomia/delirio/` (HTML ES blob de producción `3242deca8f1d7e38dbb99d70be9a8c3b6b810d18`).

## Auditoría de producción — Delírio Tropical Ipanema (segunda tanda, ficha 8/50; 15/11/2026)

Producción Hostinger verificada: `revision/rendimiento-traducciones-81a904c` en HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `3242deca8f1d7e38dbb99d70be9a8c3b6b810d18`. Las tres páginas ES/PT/EN tienen 28 párrafos cada una y ninguno de PT/EN es literalmente idéntico a ES; títulos y descripciones están localizados, H1 conserva el nombre propio, y cada canonical apunta a su URL. Hreflang sólo declara es/pt-BR/en/x-default. FR no se encontró en la ruta de producción consultada (`fr/gastronomia/delirio/`). La fuente de recuperación PT/EN sí aparece en el chunk `assets/js/translations/chunks/rio-residual-gastronomia-01.js`, blob `7d9ac39981e0654f593c69ed52ee78a7f49f897c`, con entradas que nombran explícitamente Delírio Tropical Ipanema; no he marcado la traducción semánticamente aprobada sólo por falta de coincidencias literales. Se anotó la fecha/commit histórico como pendiente de recuperar.

Hay 13 imágenes y 26 enlaces por variante; 11 imágenes tienen alt no vacío. El cotejo de destinos de enlaces, fuentes de fotos y significado de cada bloque queda pendiente. GSC final (2026-10-16–11-12): ES 34 impresiones/0 clics/posición 13,2; EN 59/0/12,5; PT no tiene fila. Periodo previo ES 17/0/8,8. Inspección: ES y EN PASS, enviadas/indexadas, fetch exitoso, canonical Google=declarado; PT devuelve “Descubierta: actualmente sin indexar” con estados de rastreo y canonical sin establecer. Es una exclusión normal por falta de rastreo, no un error confirmado. GSC muestra en ES/EN la alerta de breadcrumb “Elemento sin nombre”; se registra como alerta estructurada, no fallo de indexación.

**Estado:** traducciones PT/EN con origen histórico localizado, pendientes de QA semántico/editorial; FR no existe en producción; ficha incompleta/no publicable. Deben completarse FR, cotejo histórico con fecha/commit, QA de links/medios, runtime/build incremental/guard y capturas 1440/390. No se cambió contenido ni se pidió reindexación; Hostinger sigue intacto. CSV actualizado en `92b04da16e60fab16e65d59d65c9c987a691aa66`.

**Punto durable:** tanda 2: 8/50 auditadas, 0 completas, 0 publicadas y 42 pendientes. La siguiente #9 según la cola es `/gastronomia/arab-leblon/`, blob ES de producción `9e647deb84f359e47a9fff3444893f42d4acbcd2`.

## Auditoría de producción — Arab Leblon (segunda tanda, ficha 9/50; 15/11/2026)

Producción: `revision/rendimiento-traducciones-81a904c` HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `9e647deb84f359e47a9fff3444893f42d4acbcd2`. Las páginas ES/PT/EN tienen 25 párrafos c/u; no hay coincidencias literales PT/EN con ES. Title/description y H1: el title EN es “Arab Leblon: guía completa”, con la frase “guía completa” aún española; description EN sí está en inglés y el H1 conserva el nombre del restaurante. Canonical propio y alternates es/pt-BR/en/x-default correctos, sin FR. No hallé traducción de Arab Leblon en los chunks productivos gastronomia-01/02/03 ni rio-residual-gastronomia-01 consultados; el origen histórico PT/EN todavía debe localizarse. El francés no existe bajo la ruta de producción consultada `fr/gastronomia/arab-leblon/`.

Conteo de medios: 12 imágenes, 10 alts no vacíos, y 26 enlaces por variante; equivalencia de fuentes y destinos pendiente. GSC final (2026-10-16–11-12): ES 18 impresiones/0 clics/posición 16,4; EN 57/0/17,3; PT sin fila. Periodo anterior: ES 4/0/12,5; EN 2/0/8,0; impresiones más altas, posiciones promedio peores; volúmenes pequeños. Inspección ES/EN PASS, enviadas/indexadas, fetch correcto y canonical Google=declarado. La inspección PT dice “Google no reconoce esta URL”, sin veredicto/estado de crawl/canonical; queda como estado desconocido para investigar, no como fallo confirmado. GSC reporta en breadcrumb ES/EN un elemento sin nombre, alerta estructurada no equivalente a error de indexación.

**Estado:** texto de cuerpo PT/EN cubierto a nivel de no-identidad literal, pero falta source recovery y QA semántico; title EN incompleto; FR ausente; no cuenta completa. Deben validarse traducciones contra fuente histórica, corregirse title EN por el renderizador, completarse FR, compararse fotos/enlaces/alts, ejecutar build/guard y aprobar capturas 1440/390. Hostinger permanece intacto. CSV actualizado en `c1f1fcca1fc9a031f9c2996d642800f23f17d2c7`.

**Punto durable:** tanda 2: 9/50 auditadas, 0 completas, 0 publicadas y 41 pendientes. Próxima #10: `/gastronomia/dumare-copa/`, blob ES producción `c12aa7476e5a9a9908a7ef08c7a9e7ad247322b8`.

## Auditoría de producción — Dumaré Copa (segunda tanda, ficha 10/50; 15/11/2026)

Hostinger producción: `revision/rendimiento-traducciones-81a904c` HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `c12aa7476e5a9a9908a7ef08c7a9e7ad247322b8`. ES/PT/EN tienen 13 párrafos; en cada PT/EN uno coincide literalmente con ES y debe cotejarse. Los dos chunks productivos sí ofrecen fuente histórica para Quiosque Dumaré: `gastronomia-01.js` blob `b65f55e1afa064cb9ae3ab274a56b8a9a9f3dfa1` y `rio-residual-gastronomia-01.js` blob `7d9ac39981e0654f593c69ed52ee78a7f49f897c`; QA semántico de cada bloque sigue pendiente. Title actual ES/PT/EN usa “Dumaré | Gastronomía | Ernestinho Carioca”, categoría no adaptada en PT y española en EN; las descripciones sí están localizadas y el H1 conserva el nombre del local. Canonical propio y alternates es/pt-BR/en/x-default correctos; FR no está en el hreflang ni se encontró en `fr/gastronomia/dumare-copa/`.

Cinco imágenes, tres alts con texto, 25 enlaces por variante; el cotejo de fuentes/destinos queda pendiente. GSC final (2026-10-16–11-12): ES 51 impresiones/3 clics/posición 13,6; sin filas PT/EN. Periodo anterior ES 9/0/12,2. Inspección ES PASS, indexada, fetch exitoso y canonical Google=declarado. PT dice “Google no reconoce esta URL”; EN “Descubierta: actualmente sin indexar”, ambos con estado de rastreo no establecido. Se registran como cobertura desconocida/exclusión de descubrimiento, no como error técnico confirmado. Breadcrumb rich result de ES muestra “Elemento sin nombre”; alerta estructurada pendiente, no error de indexación.

**Estado:** contenido PT/EN parcialmente localizable a fuente histórica; una igualdad literal por idioma y title con categoría ES; FR ausente. Ficha incompleta/no publicable. Faltan cotejar bloque residual, adaptar títulos, validar todo semánticamente, completar FR, revisar enlaces/medios, ejecutar build/guard y aprobar capturas 1440/390. Ningún cambio en Hostinger. CSV `14533f8416826f8ebf1d8c0b60e9ff78cb623bcc`.

**Punto durable:** tanda 2 con 50 URL, 10/50 auditadas, 0 completas y 0 publicadas; 40 pendientes. Siguiente #11: `/gastronomia/bar-luiz/`, HTML ES blob `cfc4b7c6d35a55ee808456ae1b68d65b846ffc2b`.

## Auditoría de producción — Bar Luiz (segunda tanda, ficha 11/50; 15/11/2026)

Hostinger producción confirmada en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `cfc4b7c6d35a55ee808456ae1b68d65b846ffc2b`. ES/PT-BR/EN muestran 17 párrafos por idioma, cero coincidencias literales entre PT/EN y ES. Title y descripción están localizados en los tres idiomas; canonical propio y alternates es/pt-BR/en/x-default correctos; FR no se encuentra bajo `fr/gastronomia/bar-luiz/`. No hallé el nombre Bar Luiz en los chunks gastronómicos productivos consultados (gastronomia-01/02/03 y rio-residual-gastronomia-01), por lo que el origen histórico y la equivalencia semántica aún no pueden darse por acreditados.

Hay 12 imágenes, 10 alts con texto y 24 enlaces por variante; igualdad de fuentes y destinos no auditada todavía. GSC final (2026-10-16–11-12): ES 46 impresiones/1 clic/posición 9,5; PT/EN sin filas. Periodo previo ES 13/0/6,3; aumentaron impresiones y empeoró la posición promedio. Inspección ES PASS, indexada, fetch exitoso y canonical Google=declarado. PT dice “Google no reconoce esta URL”; EN “Descubierta: actualmente sin indexar”, sin rastreo ni canonical resuelto. Son estados de cobertura que requieren seguimiento, no errores técnicos confirmados. GSC reporta breadcrumb “Elemento sin nombre” para ES/EN, alerta estructurada pendiente y distinta del estado de indexación.

**Estado:** ES auditada; PT/EN no tienen bloques literales ES, pero falta comprobar la fuente y significado; FR ausente; incompleta/no publicable. Pendiente localizar histórico original, QA semántico de párrafos/metadata/alt, FR completa, enlaces/fotos, runtime/build incremental/guard y capturas 1440/390. No hubo cambios en Hostinger. CSV actualizado en `0f594190d55835cf068b774c03750c480c386506`.

**Punto durable:** tanda 2 de 50 exactas: 11/50 auditadas, 0 completas, 0 publicadas, 39 pendientes. Próxima #12: `/gastronomia/cabanna/`, blob HTML ES producción `9b48bcb19240242a3e81e0c9c3e95cd54548e6c6`.

## Auditoría de producción — Cabanna (segunda tanda, ficha 12/50; 15/11/2026)

Hostinger producción: `revision/rendimiento-traducciones-81a904c`, HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `9b48bcb19240242a3e81e0c9c3e95cd54548e6c6`. ES/PT/EN tienen 24 párrafos cada uno; 23/24 no son literales del ES. El único bloque literal en ambas traducciones es “☎️ Contacto +55 (21) 99585-0041”, donde el dato es estable pero el rótulo “Contacto” sigue español. Title/description están localizados y H1 es el nombre propio. Canonical y alternates es/pt-BR/en/x-default correctos; FR ausente en la ruta consultada y sin hreflang. No localicé Cabanna en los cuatro chunks gastronómicos productivos revisados, así que falta hallar y cotejar la fuente histórica antes de aprobar sentido.

Medios: 10 imágenes, 8 alts con texto, 25 enlaces por variante; destinos y equivalencia de fuentes pendientes. GSC final (2026-10-16–11-12): ES 41 impresiones/0 clics/posición 8,0; EN 44/0/26,2; PT sin fila. Periodo anterior ES 9/0/7,2. Inspección ES/EN PASS, indexadas, fetch exitoso, canonical Google=declarado. PT “Descubierta: actualmente sin indexar”, con estado de fetch/canonical aún no establecido; exclusión por rastreo pendiente, sin error confirmado. GSC señala breadcrumb “Elemento sin nombre” en las inspecciones con resultado enriquecido; es alerta estructurada, no fallo de indexación.

**Estado:** PT/EN casi completos pero tienen rótulo español y sin fuente semántica localizada; FR ausente; ficha incompleta/no publicable. Pendiente localizar texto original, adaptar etiqueta, QA semántico integral, FR, medios/enlaces, build incremental/guard y capturas 1440/390. Producción no modificada. CSV `6bf046e7840c2145abae277aff4d2ef7027d6918`.

**Punto durable:** tanda 2 exacta de 50; 12/50 auditadas, 0 completas, 0 publicadas; 38 pendientes. Próxima #13: `/gastronomia/nova-capela/`, blob HTML ES producción `e9f91260d5e63d1ddad741fd2ebb36e7e85a7f83`.

## Auditoría de producción — Nova Capela (segunda tanda, ficha 13/50; 15/11/2026)

Hostinger producción en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `e9f91260d5e63d1ddad741fd2ebb36e7e85a7f83`. ES/PT/EN contienen 31 párrafos c/u; cero coincidencias literales de párrafos PT/EN con ES. La fuente histórica sí está en `assets/js/translations/chunks/gastronomia-01.js`, blob productivo `b65f55e1afa064cb9ae3ab274a56b8a9a9f3dfa1`, con entrada “Nova Capela en Lapa” y valores PT/EN. Title y descripción están localizados; H1 conserva nombre propio; canonical propio y hreflang es/pt-BR/en/x-default válidos. FR no existe bajo `fr/gastronomia/nova-capela/` ni está enlazado.

Hay 12 imágenes, 10 alts con texto y 24 enlaces por variante; su correspondencia semántica/destinos no se verificó. GSC final (2026-10-16–11-12): ES 44 impresiones/1 clic/posición 7,5; sin filas PT/EN. Periodo previo ES 13/0/11,8; la ES gana impresiones y sube posiciones. Inspección ES PASS, indexada, fetch exitoso y canonical Google=declarado. PT: “Descubierta: actualmente sin indexar”; EN: “Google no reconoce esta URL”, con fetch/canonical sin establecer. No hay error técnico confirmado; PT es una exclusión de descubrimiento y EN sigue sin estado conocido. GSC muestra breadcrumb “Elemento sin nombre” para ES; es alerta de datos estructurados, no error de indexación.

**Estado:** PT/EN tienen traducciones históricas rastreables, pero falta QA editorial completo; FR ausente; no cuenta completa/no publicable. Pendientes: validar sentido, completar FR, cotejar medios/enlaces/alt, renderizadores/build incremental/guard y capturas aprobadas 1440/390. Hostinger no se modificó. CSV actualizado `67111f9b17085e5b225c7e9b2314e75713010dba`.

**Checkpoint:** segunda tanda exacta de 50, 13/50 auditadas, 0 completas, 0 publicadas, 37 pendientes. Siguiente #14: `/gastronomia/bira-de-guaratiba/`, blob HTML ES de producción `f675da0898a79bbaacec58a933523b1d522bc8fe`.

## Auditoría de producción — Bira de Guaratiba (segunda tanda, ficha 14/50; 15/11/2026)

Hostinger producción: `revision/rendimiento-traducciones-81a904c` HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `f675da0898a79bbaacec58a933523b1d522bc8fe`. ES/PT/EN tienen 23 párrafos c/u y ninguna coincidencia literal ES en PT/EN. Title/descripción están localizados, H1 mantiene el nombre propio; canonical y alternates es/pt-BR/en/x-default correctos. No se encontró FR en la ruta consultada ni hay FR hreflang. De los chunks gastronómicos productivos, solo el chunk `gastronomia-01.js` (blob `b65f55e1afa064cb9ae3ab274a56b8a9a9f3dfa1`) contiene traducciones genéricas de etiquetas/nombres; no apareció una entrada editorial específica de Bira. Falta fuente completa para dar por verificado el sentido.

Medios: 14 imágenes, 12 alts con texto, 26 enlaces por variante; equivalencia de fotos, alt y destinos no revisada. GSC final (2026-10-16–11-12): ES 26 impresiones/0 clics/posición 13,9; EN 43/0/8,8; PT sin fila. Periodo anterior ES 3/0/9,3 y EN 10/0/6,2; ambos aumentan impresiones con peor posición promedio. Inspección ES/EN PASS, indexadas, fetch exitoso y canonical Google=declarado. PT “Google no reconoce esta URL”, sin estado de rastreo/fetch/canonical: desconocido, no fallo técnico confirmado. GSC marca breadcrumb “Elemento sin nombre”, alerta de structured data y no de indexación.

**Estado:** traducciones PT/EN presentes sin literales ES, pero no se recuperó origen editorial íntegro ni se cerró QA semántico; FR ausente; incompleta/no publicable. Faltan validar source y contenido, completar FR, revisar medios/enlaces, build incremental/guard y capturas 1440/390. Hostinger intacto. CSV `37909430dda234777c58fd2c9bdc2f8ff15495a9`.

**Punto durable:** tanda 2: 14/50 auditadas, 0 completas, 0 publicadas, 36 pendientes. Siguiente #15 `/gastronomia/cafe-do-alto/`, blob HTML ES producción `9fa6005690ad4fed2d04593e76834b00caefd2e5`.

## Auditoría de producción — Café do Alto (segunda tanda, ficha 15/50; 15/11/2026)

Producción Hostinger `revision/rendimiento-traducciones-81a904c` en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `9fa6005690ad4fed2d04593e76834b00caefd2e5`. ES/PT/EN tienen 24 párrafos c/u, cero coincidencias literales PT/EN con ES. Sin embargo, el title PT y EN conserva “guía completa” en español; las descriptions sí están localizadas y H1 es el nombre propio. Canonical por variante y alternates es/pt-BR/en/x-default válidos; FR ausente en ruta consultada y sin hreflang. El nombre Café do Alto no apareció en los cuatro chunks gastronómicos productivos revisados; se debe encontrar la traducción editorial histórica antes de certificar semántica.

10 imágenes, 8 alt con texto y 26 enlaces por variante; destino/source parity pendiente. GSC final (2026-10-16–11-12): ES 62 impresiones/0 clics/posición 14,4; EN 42/2/10,1; PT sin fila. Periodo previo: ES 23/0/10,4; aumentan impresiones y empeora posición promedio; la serie EN anterior no devolvió fila. Inspección ES/EN PASS, indexadas, fetch correcto, canonical Google=declarado. PT “Descubierta: actualmente sin indexar”; rastreo/fetch/canonical no establecidos. Sin error confirmado. GSC alerta de breadcrumb “Elemento sin nombre” para ES/EN, estructurada y distinta de indexación.

**Estado:** cuerpo PT/EN sin bloques literales ES, pero title incompleto y fuente/QA semántica pendientes; FR ausente. No completa/no publicable. Pendientes: recuperar fuente y comparar el contenido, traducir metadata residual, FR integral, revisar alts/enlaces/fotos, ejecutar build y guard y aprobar capturas 1440/390. Hostinger sin cambios. CSV `23ec59ceb5caeac0b79b426b03ce0fd2f0285f69`.

**Punto durable:** tanda 2 con 50 URL; 15/50 auditadas, 0 completas, 0 publicadas, 35 pendientes. Próxima #16 `/gastronomia/classico-leme/`, blob HTML ES de producción `4ab5e62c48b0f9ed4fb0c8c9f5e578271ea20f20`.

## Auditoría de producción — Clássico Beach Club Leme (segunda tanda, ficha 16/50; 15/11/2026)

Hostinger producción, rama `revision/rendimiento-traducciones-81a904c`, HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob verificado por API y por la cola: `4ab5e62c48b0f9ed4fb0c8c9f5e578271ea20f20`. Las páginas ES/PT/EN tienen 25 párrafos; uno en cada PT/EN es literalmente ES y queda por cotejar (el resto no contiene igualdad literal). Title y description están localizados, H1 conserva el nombre propio; canonical propio y alternates es/pt-BR/en/x-default correctos. FR no aparece en la ruta consultada ni se enlaza. No encontré ficha específica en los cuatro chunks productivos consultados, así que la fuente histórica y fidelidad semántica no se dan por aprobadas.

Hay 12 imágenes, 10 alts con texto y 26 enlaces por idioma; el cotejo de fuentes, destinos y alts queda pendiente. GSC final (2026-10-16–11-12): ES 42 impresiones/1 clic/posición 9,4; PT/EN sin filas. Periodo previo ES 18/0/7,3; suben impresiones y empeora la posición. Inspección ES PASS, indexada, fetch exitoso y canonical Google=declarado. PT “Descubierta: actualmente sin indexar”; EN “Google no reconoce esta URL”, ambos sin fetch/canonical establecido; estados de cobertura/rastreo, no errores técnicos confirmados. GSC rich result señala un breadcrumb “Elemento sin nombre”; alerta estructurada, no fallo de indexación.

**Estado:** ES auditada; PT/EN con un bloque residual literal y origen/QA semántico pendientes; FR ausente; no cuenta completa/no publicable. Falta fuente fiel, cotejo editorial, FR íntegro, paridad de medios/enlaces, build incremental/guard y capturas 1440/390. Producción intacta. CSV `ec660ad1fc307cc4ade0b20faeffb5598f038552`.

**Punto durable:** tanda 2 de 50, 16/50 auditadas, 0 completas, 0 publicadas, 34 pendientes. Próxima #17 `/gastronomia/casa-porto/`, blob HTML ES producción `a763223f928ef4eaef4889c0d8a88ad8ffa50f88`.

## Auditoría de producción — Casa Porto (segunda tanda, ficha 17/50; 15/11/2026)

Hostinger producción, rama `revision/rendimiento-traducciones-81a904c`, HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; blob de la ficha ES en GitHub `a763223f928ef4eaef4889c0d8a88ad8ffa50f88`. Se comprobaron los HTML ES, PT-BR y EN en Hostinger: 25 párrafos por variante y ninguna coincidencia literal de párrafo PT/EN con ES. Los títulos, descripciones y H1 están localizados/conservan el nombre del restaurante; canonical propio y alternates es/pt-BR/en/x-default son coherentes. Se encontraron 12 imágenes, 10 alt con texto y 26 enlaces por variante; equivalencia de src, alts y hrefs todavía requiere cotejo específico. En la ruta FR consultada `/fr/gastronomia/casa-porto/` Hostinger devuelve “File does not exist”; no hay FR/hreflang FR para esta ficha.

El HTML de producción contiene diccionarios embebidos PT/EN con contenido editorial, así que ambos renderizadores están presentes en los archivos de producción. No se halló entrada específica de Casa Porto en los cuatro chunks gastronómicos productivos consultados; no atribuyo el texto actual a una recuperación histórica. Hace falta revisar correspondencia semántica del texto y metadata, además de las imágenes/enlaces y QA visual.

GSC final (2026-10-16–11-12): ES 32 impresiones/1 clic/posición 25,6; EN 6/0/6,7; PT sin fila. Periodo anterior (2026-09-18–10-15): ES 7/0/22,3; no había fila EN. ES y EN inspeccionadas como indexadas, fetch correcto y canonical de Google igual al declarado; EN figura en sitemap. PT: “Google no reconoce esta URL”, sin estado de fetch/canonical; se registra como desconocido, no error confirmado. Rich results muestra breadcrumb “Elemento sin nombre” en ES/EN: alerta estructurada separada de la indexación.

**Estado:** PT/EN presentes y renderizados en producción; FR ausente; ficha auditada pero incompleta bajo el criterio estricto, no validada como terminada y no publicable en cuatro idiomas. No se modificó Hostinger. Faltan revisión semántica, cotejo de fotos/alt/enlaces, FR integral, pruebas de build incremental/guard y capturas aprobadas en 1440/390 px. Producción mantiene 0 cambios nuevos publicados.

**Punto durable:** tanda 2 de 50: 17/50 auditadas, 0 completas, 0 publicadas, 33 pendientes. Próxima #18 `/gastronomia/alloro/`; ES/PT/EN aún sin auditar en esta tanda. CSV actualizado mediante commit `982f6ab81564be29aa7f36ff8689b2641146924d`.


## Auditoría de producción — Alloro al Miramar (segunda tanda, ficha 18/50; 15/11/2026)

Producción Hostinger `revision/rendimiento-traducciones-81a904c`, HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; blob ES verificado `42b6b1498e2a2bf86e7937b7fb86ba1567923583`. ES/PT-BR/EN sirven 23 párrafos y metadata localizada; canonical propio y alternates es/pt-BR/en/x-default coherentes. El HTML PT empieza con el texto literal “translation results” y un contenido de galería que no corresponde a la introducción ES; EN también empieza con contenido de galería fuera de orden y conserva 1 de 23 párrafos literalmente igual a ES. Se marca incidencia de render/contenido servida, no meramente una alerta del auditor. En imágenes, 7 assets editoriales son compartidos; ES agrega el logo de marca que no aparece en PT/EN. Links: 25 en ES y 13 en PT/EN; faltan enlaces generales de navegación/contacto en las variantes. No alterar links aprobados ni producción. La consulta de `/fr/gastronomia/alloro/` devolvió “File does not exist”; no hay FR/hreflang FR.

Los cuatro chunks productivos consultados (`gastronomia-01/02/03.js`, `rio-residual-gastronomia-01.js`) no incluyen una entrada específica de Alloro; no se puede certificar recuperación del texto histórico solo con esa evidencia. GSC final 2026-10-16–11-12: ES 53 imp./0 clics/posición 13,1; PT 27/0/13,3; EN 37/0/5,0. Periodo previo 2026-09-18–10-15: ES 18/0/9,3; PT/EN sin filas. Por tanto ES aumenta impresiones, con peor posición promedio; no se deduce causalidad ni error técnico. Inspección: 3/3 ES/PT/EN indexadas, permitidas y con fetch exitoso y Google canonical igual al declarado; todas figuran en sitemap. Rich result de breadcrumb “Elemento sin nombre” es una alerta estructurada, no fallo de indexación.

**Estado:** auditada, con incidencia visible PT/EN; no completa/no publicable. Falta restaurar orden y texto correcto en cuerpo PT/EN, cotejar fuente histórica, revisar paridad de enlaces/alts, francés integral, build incremental/guard y capturas 1440/390. Hostinger sigue intacto; **0/50 fichas completas y 0/50 nuevas publicadas**.

**Punto durable:** tanda 2: 18/50 auditadas, 0 completas, 0 publicadas, 32 pendientes. Próxima #19 `/gastronomia/casas-de-suco/`; blob ES producción a verificar antes de iniciar. CSV Alloro actualizado en commit `11cb92281fdde1cbd2907617edb17e5034b9c167`.


## Auditoría de producción — Casas de Suco (segunda tanda, ficha 19/50; 15/11/2026)

Hostinger producción `revision/rendimiento-traducciones-81a904c`, HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; blob ES verificado `5fb5b1247ac0a7f8d26681ebf50b6f351aec2f82`. Las tres variantes tienen 14 párrafos, cero coincidencias literales ES/PT/EN, títulos/descripciones/H1 traducidos, canonical propio y hreflang es/pt-BR/en/x-default coherente. Conservan 4 imágenes y 31 enlaces por idioma; la paridad exacta de src/alt/href queda pendiente. La página ES no contiene twitter:title en la primera revisión, aunque sí hay title y og:title; no se detectó error de indexación ligado a ello. La ruta `/fr/gastronomia/casas-de-suco/` devuelve “File does not exist”, no hay FR/hreflang FR.

Los chunks productivos `gastronomia-01.js` y `rio-residual-gastronomia-01.js` contienen referencias relacionadas con jugos/casas de suco, pero la frase de apertura actual no coincide con el fragmento histórico encontrado; la equivalencia de origen/cobertura de los 14 párrafos no está demostrada y no se marca como traducción histórica recuperada de forma íntegra.

GSC final (2026-10-16–11-12): ES 14 impresiones/0 clics/posición 5,6; PT 2/0/7,5; EN 36/0/18,9. Ventana previa (2026-09-18–10-15): ES 1/0/7,0; PT y EN sin filas. En ES aumentan 13 impresiones y mejora la posición media; las variantes nuevas no permiten comparar tendencia. Inspección 3/3 ES/PT/EN: enviadas e indexadas, robots allowed, fetch successful y Google canonical igual al declarado; PT figura en sitemap. Rich result de breadcrumb “Elemento sin nombre” es una alerta estructurada, no un error de indexación.

**Estado:** ES/PT/EN presentes y completos estructuralmente; no termina la ficha bajo criterio estricto: FR y QA editorial integral/visual, paridad de medios/enlaces y build incremental/guard pendientes. Hostinger intacto; **0/50 fichas completas y 0/50 nuevas publicadas**.

**Punto durable:** tanda 2: 19/50 auditadas, 0 completas, 0 publicadas, 31 pendientes. Siguiente #20 `/gastronomia/tia-palmira/`; verificar su blob desde producción antes de auditar. Inventario actualizado en commit `8f184fa0917a0e7418fab0b32ddbd63f3ef478bd`.


## Auditoría de producción — Tia Palmira (segunda tanda, ficha 20/50; 15/11/2026)

Hostinger producción `revision/rendimiento-traducciones-81a904c`, HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; blob HTML ES `8b5e209fa129e5bb11e11207d064d9013842b219`. Se verificaron 23 párrafos en ES/PT-BR/EN. Nueve párrafos PT y nueve EN son exactamente ES; solo coinciden con el diccionario histórico 10 párrafos PT y 9 EN. Hallazgo accionable: el HTML histórico embebía diccionarios editoriales manuales PT/EN de 19 entradas; el archivo histórico tiene blob `9dd05cc842f6a596eb9c6f197438a4256d3713d8` tanto en `42d03024d2c3765b0d96eb5f9763657d731baf4a` como en `8570793a992b262c5fb384a396ec949e6105775c`. Debe recuperarse fielmente lo que coincide con la versión actual y cotejarse aparte el contenido posterior (23 párrafos); no trasladar a ciegas bloques por posición.

La ficha identifica correctamente un cierre permanente y trata el restaurante como memoria. La traducción recuperada debe preservar esa condición; no recomendar horarios, precios ni servicio vigente. Title/description traducidos, H1 es el nombre, canonical propio y alternates es/pt-BR/en/x-default coherentes. Hay 13 imágenes ES y 12 PT/EN, y 24 enlaces ES frente a 12 PT/EN; equivalencia exacta de medios/destinos pendiente. La ruta `/fr/gastronomia/tia-palmira/` no existe en producción consultada ni hay hreflang FR.

GSC final (2026-10-16–11-12): ES 68 impresiones/0 clics/posición 9,0; PT 9/1/5,9; EN 20/0/8,2. Ventana anterior (2026-09-18–10-15): ES 6/0/8,5; PT 25/0/7,2; EN 9/0/5,4. ES y EN tienen más impresiones y peor posición media; PT tiene menos impresiones, un clic y mejor posición media. No se infiere causalidad. Inspección 3/3 indexadas, robots allowed, fetch successful y Google canonical igual al declarado; en sitemap. Rich result de breadcrumb “Elemento sin nombre” es una alerta estructurada, no error de indexación.

**Estado:** traducciones PT/EN incompletas aunque se verificó una fuente histórica manual íntegra para 19 bloques; FR ausente; no completa/no publicable. Falta recuperar bloques actuales sin desalineación, cotejar expansiones y medios/links, FR integral, build incremental/guard y capturas 1440/390. Hostinger no se modificó; **0/50 completas y 0/50 nuevas publicadas**.

**Punto durable:** tanda 2: 20/50 auditadas, 0 completas, 0 publicadas, 30 pendientes. Siguiente #21 `/gastronomia/aipo-aipim-920/`; verificar existencia/blob en producción antes de empezar. Inventario Tia Palmira actualizado en commit `0f3eba74efa8a1aa8c1991d275d2f65983ecb9d8`.


## Auditoría de producción — Aipo & Aipim Copacabana 920 (segunda tanda, ficha 21/50; 15/11/2026)

Hostinger producción `revision/rendimiento-traducciones-81a904c`, HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `107f3a973fc5ded3804ca82f680ea9798d74c250`. Las variantes ES/PT/EN tienen 24 párrafos y no se detectaron coincidencias de párrafos completos PT/EN con ES. Title/description/H1 y canonical/hreflang es/pt-BR/en/x-default están presentes; el title PT y EN todavía conserva “guía completa” en español. Hay 10 imágenes, 8 alts con texto y 25 enlaces por variante; igualdad exacta de assets y destinos aún sin QA. La ruta `/fr/gastronomia/aipo-aipim-920/` devuelve “File does not exist”, sin FR/hreflang FR.

Fuente histórica manual verificada dentro de la página de los commits `42d03024d2c3765b0d96eb5f9763657d731baf4a` y `8570793a992b262c5fb384a396ec949e6105775c`: ambos comparten el blob `256f2ece1ea09afe608e15b05ae41ad935c9db2a`, con 19 bloques PT y 19 EN. En el HTML servido actualmente coinciden exactamente 8 de esos bloques por idioma; el texto adicional actual debe cotejarse contra el ES actualizado y el origen editorial, no sustituirse por posiciones.

GSC final (2026-10-16–11-12): ES 51 impresiones/0 clics/posición 11,4; PT sin fila; EN 28/0/10,1. Periodo previo (2026-09-18–10-15): ES 6/0/8,0; PT/EN sin filas. Para ES suben impresiones y empeora posición promedio; PT/EN no tienen comparación previa observada. Inspección ES y EN indexadas, fetch exitoso, sitemap y canonical de Google igual al declarado. PT “Descubierta: actualmente sin indexar”, robots/fetch/canonical sin estado establecido: exclusión normal de descubrimiento, no error técnico confirmado. Breadcrumb “Elemento sin nombre” es alerta de datos estructurados.

**Estado:** fuente histórica PT/EN recuperable identificada, pero la ficha no es completa ni publicable: residuo del title, QA semántico y medios pendientes, FR ausente, y PT sin indexar (sin fallo confirmado). Faltan restauración editorial controlada, FR íntegro, build incremental/guard y capturas 1440/390. Hostinger intacto; **0/50 completas y 0/50 nuevas publicadas**.

**Punto durable:** tanda 2: 21/50 auditadas, 0 completas, 0 publicadas, 29 pendientes. Siguiente #22 `/gastronomia/galeto-liceu/`; confirmar blob y estado actual en producción antes de empezar. CSV Aipo & Aipim actualizado en commit `4deff07b4c99537e06ebd5701dac1a798a98093d`.


## Auditoría de producción — Galeto Liceu (segunda tanda, ficha 22/50; 15/11/2026)

Hostinger producción `revision/rendimiento-traducciones-81a904c`, HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `e7c8c87fa00cc2f0dfa819e598f3559360dd4bd4`. ES/PT-BR/EN tienen 35 párrafos cada uno; cinco párrafos PT y cuatro EN son literalmente españoles. Titles, descriptions, H1 y canonical/hreflang es/pt-BR/en/x-default están localizados/coherentes. El chunk productivo `gastronomia-01.js` (blob `b65f55e1afa064cb9ae3ab274a56b8a9a9f3dfa1`) contiene entrada editorial específica de dirección y horario, con horario de directorio expresamente sujeto a confirmación; no basta para certificar todos los párrafos actuales. Hay 9 imágenes/7 alts con texto/26 enlaces por variante; la paridad exacta de recursos y hrefs requiere QA. FR consultado `/fr/gastronomia/galeto-liceu/` no existe; sin hreflang FR.

GSC final (2026-10-16–11-12): ES 25 impresiones/1 clic/posición 9,0; PT 9/0/8,6; EN sin fila. Ventana previa (2026-09-18–10-15): ES 2/0/10,5; PT 23/0/8,5; EN 3/0/6,3. ES aumenta impresiones y mejora posición media; PT baja en impresiones y apenas empeora posición; EN no tiene fila nueva. No se infiere causa. Inspección 3/3 indexadas, robots allowed, fetch successful, Google canonical igual al declarado y URL en sitemap. Breadcrumb “Elemento sin nombre” es alerta de datos estructurados, no error de indexación.

**Estado:** ficha incompleta y no publicable por residuos en PT/EN, francés y QA semántico/visual pendientes. No se modificó contenido, assets ni Hostinger. Falta cotejar traducciones históricas y actualizaciones, validar fotos/alt/hrefs, terminar FR, build incremental/guard y capturas aprobadas 1440/390. **0/50 completas y 0/50 nuevas publicadas.**

**Punto durable:** tanda 2: 22/50 auditadas, 0 completas, 0 publicadas, 28 pendientes. Próxima #23 Lanches Cariocas; resolver slug/blob desde la cola y producción antes de empezar. CSV actualizado en commit `e6af208089449ace540643212a7998eb71965ba7`.


## Auditoría de producción — Lanches Cariocas (segunda tanda, ficha 23/50; 15/11/2026)

Hostinger producción `revision/rendimiento-traducciones-81a904c`, HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `8f90895dc47fa67d9b2dbbe14eebe6720698ca7b`. ES/PT-BR/EN tienen 14 párrafos cada uno sin coincidencias literales ES/PT/EN. Title, description, H1, canonical propio y alternates es/pt-BR/en/x-default están localizados/coherentes. 4 imágenes, 2 alts con texto y 28 enlaces por variante; paridad exacta de destinos/alts no revisada. La ruta FR consultada no existe, sin FR/hreflang.

No hay archivo `gastronomia/lanches-cariocas/index.html` en los commits `42d03024d2c3765b0d96eb5f9763657d731baf4a` ni `8570793a992b262c5fb384a396ec949e6105775c`. En los chunks actuales, la frase inicial ES no se recuperó; el chunk `rio-residual-gastronomia-01.js` presenta solo una referencia/frase relacionada. Origen editorial íntegro no comprobado; requiere revisión semántica en particular de términos regionales y selección de vocabulario, sin asumir validez por diferencias literales.

GSC final (2026-10-16–11-12): ES 10 impresiones/0 clics/posición 8,4; PT 2/0/2,0; EN 25/0/7,2. Ventana previa (2026-09-18–10-15): ES 1/0/9,0; PT sin fila; EN 3/0/7,3. Suben impresiones ES/EN, pero posición ES mejora y EN varía levemente; no se infiere causa. Inspección 3/3 indexadas, fetch successful, robots allowed y Google canonical igual al declarado; todas en sitemap. Breadcrumb “Elemento sin nombre” es alerta estructurada, no error de indexación.

**Estado:** PT/EN están presentes y localizados en el HTML de producción, pero la fidelidad editorial histórica no fue probada, FR y QA visual permanecen pendientes; no completa/no publicable. Hostinger intacto; **0/50 completas y 0/50 nuevas publicadas**.

**Punto durable:** tanda 2: 23/50 auditadas, 0 completas, 0 publicadas, 27 pendientes. Siguiente #24 `/gastronomia/venga-ipanema/`; verificar blob/estado antes de auditar. Inventario actualizado en commit `35a936ba55beb0fedc62f216d295b17dd47d55de`.


## Auditoría de producción — ¡Venga! Ipanema (segunda tanda, ficha 24/50; 15/11/2026)

Hostinger producción `revision/rendimiento-traducciones-81a904c`, HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `6660786e8f609092bc90042852294fb3a70afe4a`. ES/PT-BR/EN tienen 30 párrafos; 8 párrafos PT y 8 EN son literalmente ES. Title/H1, descriptions, canonical propio y hreflang es/pt-BR/en/x-default presentes; el nombre “¡Venga!” se conserva por ser marca. En las descriptions PT/EN el atributo `content` está traducido, pero `data-ec-content` conserva el español original; falta validar comportamiento de renderer en runtime antes de calificarlo como error visible.

Fuente histórica manual recuperada: la página está en ambos commits `42d03024d2c3765b0d96eb5f9763657d731baf4a` y `8570793a992b262c5fb384a396ec949e6105775c`, con el mismo blob `ffbc351de57a995bcec3e4ef686957d77e7314d9`; contiene 19 entradas PT y 19 EN. Once entradas por idioma coinciden literalmente con párrafos de la página actual; el resto de expansiones debe cotejarse, no descartarse. 12 imágenes ES frente a 11 PT/EN; 25 enlaces ES frente a 13 PT/EN. Diferencias reales de estructura, con destinos y fotos por cotejar sin modificar.

Ruta FR consultada `/fr/gastronomia/venga-ipanema/` no existe en producción ni hay hreflang FR. GSC final (2026-10-16–11-12): ES 51 impresiones/0 clics/posición 21,6; PT 14/1/8,1; EN 11/0/10,0. Previa (2026-09-18–10-15): ES 25/0/9,2; PT 8/0/8,3; EN 10/0/12,9. Impresiones suben en las tres; posición ES empeora y PT/EN mejora. Esto mide rendimiento, no causalidad. Inspección 3/3 indexadas, fetch successful, Google canonical igual al declarado, sitemap presente. Breadcrumb “Elemento sin nombre” es alerta estructurada y no error de indexación.

**Estado:** traducciones PT/EN parcialmente recuperables y parcialmente residuales; diferencias de medios/enlaces y atributo de metadato exigen QA; FR ausente; no completa/no publicable. Falta cotejar 19 bloques históricos con expansiones, revisar alt/href, probar runtime, completar FR, build incremental/guard y capturas 1440/390. Hostinger sin cambios; **0/50 completas y 0/50 nuevas publicadas**.

**Punto durable:** tanda 2: 24/50 auditadas, 0 completas, 0 publicadas, 26 pendientes. Próxima #25 `/gastronomia/shiso/`; verificar blob y estado productivo antes de auditar. CSV actualizado en commit `eb8663125bad05ca81a787dbad5291297a17b83a`.


## Auditoría de producción — Shiso (segunda tanda, ficha 25/50; 15/11/2026)

Hostinger producción `revision/rendimiento-traducciones-81a904c`, HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `243ffc89ca85060c20c2eb68fe813caab2ab575f`. ES/PT/EN tienen 30 párrafos, 1 por variante permanece literalmente igual al ES. Title/description/H1/canonical propio y alternates es/pt-BR/en/x-default están localizados/coherentes. Hay 11 imágenes/9 alt con texto/25 enlaces en cada variante; paridad exacta de assets/links no revisada. En meta description de PT/EN `content` está traducido, mientras `data-ec-content` conserva español; verificar runtime antes de clasificarlo como error de salida. Ruta FR consultada inexistente, sin hreflang FR.

La ficha histórica está presente en los commits `42d03024d2c3765b0d96eb5f9763657d731baf4a` y `8570793a992b262c5fb384a396ec949e6105775c`, con blob `49f6ad42ea1b74e6d2d1b8352e78a8b925c133fe` y diccionario manual de 19 entradas PT/19 EN. Once entradas por idioma coinciden literalmente con el HTML actual; el resto y los párrafos añadidos requieren cotejo semántico, sin sobrescribir las ampliaciones.

GSC final (2026-10-16–11-12): ES 67 imp./0 clics/posición 20,4; PT sin fila; EN 24/0/16,0. Periodo anterior (2026-09-18–10-15): ES 27/0/17,3; PT/EN sin filas. ES gana 40 impresiones y mejora posición promedio; PT/EN sin base anterior para comparar. Inspección ES y EN indexadas, robots allowed, fetch successful y canonical Google=declarado; PT “Descubierta: actualmente sin indexar”, sin estado de fetch/canonical, exclusión normal y no error confirmado. Breadcrumb “Elemento sin nombre” es alerta de structured data.

**Estado:** recuperación PT/EN disponible pero parcial; FR ausente; ficha incompleta/no publicable. Falta recuperar los bloques aplicables, cotejar ampliaciones y alt/hrefs, runtime, francés, build incremental/guard y capturas 1440/390. Hostinger intacto; **0/50 completas y 0/50 nuevas publicadas**.

**Punto durable:** tanda 2: 25/50 auditadas, 0 completas, 0 publicadas, 25 pendientes. Siguiente #26 Samba Social; confirmar ruta/blob actual antes de empezar. CSV Shiso actualizado en commit `056a3df5072c117e6e686f134b0d3a7f0816eea8`.


### Ficha #26 — Samba Social Clube — 15/11/2026

- URL ES: https://www.ernestinhocarioca.com.br/gastronomia/samba-social/; rutas PT/EN existen en Hostinger. Producción verificada: `revision/rendimiento-traducciones-81a904c` en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `7bcafd2ba28339b41830c0f4404264a83c00db48`.
- ES, PT y EN sirven 23 párrafos cada una; diccionario incrustado PT y EN contiene 19 claves (índices 0–18), con cobertura incompleta de los cuatro párrafos finales del HTML. Título, descripción, H1, canonical y hreflang ES/PT-BR/EN son locales. No hay ruta FR: Hostinger responde HTTP 422 “File does not exist”; no se añade hreflang FR.
- QA real del renderizador: en la ruta PT, al cargar inicialmente, la introducción aparece en español aunque el control indica PT. Al seleccionar EN, el diccionario cambia los 19 bloques; una frase suplementaria en PT permanece dentro del bloque EN. La ficha queda bloqueada en PT y en revisión en EN. Cambiar el arranque requiere tocar el renderizador inline de HTML congelado; `AGENTS.md` exige autorización expresa para ese cambio específico. No se alteró la página.
- Paridad pendiente: ES tiene 14 imágenes/25 enlaces; PT y EN 13 imágenes/13 enlaces. Se contaron 12 alt no vacíos en ES y 11 en PT/EN (dos imágenes sin alt observadas). No se atribuye todavía a regresión: revisar contra página original/DOM completo. Imágenes, mapa y enlaces permanecen intactos.
- Fuente histórica: los commits `42d03024d2c3765b0d96eb5f9763657d731baf4a` y `8570793a992b262c5fb384a396ec949e6105775c` contienen un diccionario ES/EN de 19 entradas con blob `d0a9ea4a6913364bef0c10a0e277615695275adb`; la redacción EN actual fue ampliada y no coincide literalmente con las entradas antiguas. Los cuatro chunks actuales consultados no tienen una entrada específica para Samba Social.
- GSC, ventana 2026-10-16–2026-11-12: 42 impresiones, 0 clics, CTR 0%, posición 6,3; ventana anterior 2026-09-18–2026-10-15: 50 impresiones, 0 clics, posición 5,7. Variación observada: −8 impresiones (−16%) y posición media +0,6; por sí sola no confirma causa ni error. Inspección de URL: ES/PT/EN 3/3 indexables, fetch exitoso, canonical propia y sitemap. Resultado enriquecido tiene alerta “Elemento sin nombre” en breadcrumb; registrar como alerta, no error confirmado.
- Captura de escritorio observada aproximadamente 1348×927; no equivale a QA exigido 1440×390. Faltan capturas 1440/390 antes/después, compilación incremental y cotejo de texto/alt/enlaces. Estado de ficha: ES revisada; PT bloqueada por inicialización; EN en revisión por cobertura/residuo; FR pendiente; 0 completas.
- Contabilidad: tanda 2: 26/50 auditadas; 0/50 completas; 0/50 publicadas; 24 fichas siguientes aún por auditar. CSV actualizado en commit `33c2ad1f20f986a01061e117683d0fbae57da9be`; el informe se registra en el commit siguiente. Hostinger producción intacta.


## Auditoría de producción — Pérgula (segunda tanda, ficha 27/50; 15/11/2026)

- Prioridad GSC: 47 impresiones en ES en 2026-10-16–2026-11-12. Comparación anterior: 18 impresiones, 0 clics, posición 9,0; actual 47 impresiones, 0 clics, posición 6,7. Señal favorable en exposición/posición, no prueba causa.
- Producción consultada: rama `revision/rendimiento-traducciones-81a904c`, SHA `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; ES blob `09e4f0bf147f041e58169e60b5dbf673416bc128`. Hostinger sirve ES/PT-BR/EN con 25 párrafos por idioma, title/description/H1, canonical propia y alternates ES/PT-BR/EN/x-default.
- Diccionarios PT/EN de 19 claves cada uno coinciden exactamente con los 19 bloques históricos de los commits `42d03024d2c3765b0d96eb5f9763657d731baf4a` y `8570793a992b262c5fb384a396ec949e6105775c` (blob `bb32b0120def8b970858ab0b6952b9b18c63aad8`). Los chunks actuales 02 y rio-residual incluyen pasajes relacionados y datos sobre Pérgula/Pool Wing, pero no sustituyen la ficha completa. El HTML PT/EN conserva además párrafos editoriales adicionales en su idioma; falta probar el renderizador en vivo.
- Integridad de medios/enlaces: 13 etiquetas de imagen ES y 12 PT/EN, pero los conjuntos de URLs de imagen son iguales; 2 imágenes sin alt en cada variante. ES tiene 22 destinos únicos y PT/EN 10: entre los destinos presentes solo en ES figuran navegación global y redes sociales. Esto queda como paridad por cotejar con el diseño aprobado, sin diagnosticar pérdida ni modificar enlaces.
- FR no existe en Hostinger (HTTP 422 “File does not exist”) y no aparece en hreflang; correcto mantenerlo fuera del sitemap y noindex privado mientras no haya página. Inspección GSC ES/PT/EN: 3/3 “Enviada e indexada”, rastreo exitoso, robots permitidos, canonical Google = declarada y sitemap. Alerta de breadcrumb “Elemento sin nombre”; es alerta estructurada, no error confirmado.
- Estado: ES auditada; PT/EN en revisión, fuente histórica recuperada y texto ampliado íntegro en HTML actual; FR pendiente. Faltan renderizador real para los tres idiomas, QA editorial integral, capturas 1440/390 antes/después y compilación incremental/guard. No se modificó Hostinger.
- Contabilidad: tanda 2: 27/50 auditadas; 0/50 completas; 0 publicadas; 23 fichas por auditar. Siguiente por cola GSC: `/gastronomia/lilia/` (20 impresiones combinadas en el corte usado). CSV commit `edda5844e49af4f33241eca496521226e40e633d`; informe registrado en el commit siguiente.


## Auditoría de producción — Lilia (segunda tanda, ficha 28/50; 15/11/2026)

- Prioridad GSC tomada de la cola: 20 impresiones combinadas; consulta directa de la URL ES encontró 56 impresiones/0 clics/CTR 0%/posición 19,8 en 2026-10-16–2026-11-12, frente a 5/0/0%/11,8 en 2026-09-18–2026-10-15. Exposición aumentó y posición media descendió; esto no demuestra una causa.
- Hostinger en producción `revision/rendimiento-traducciones-81a904c`, SHA `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `696a34af2c48123eac989e742d0685d57502e567`. ES/PT/EN sirven 33 párrafos con title/description/H1, canonical propio y alternates ES/PT-BR/EN/x-default localizados. No se verificó DOM tras inicialización/cambio de idioma; queda QA de renderizador pendiente.
- Fuentes históricas: `42d03024d2c3765b0d96eb5f9763657d731baf4a` y `8570793a992b262c5fb384a396ec949e6105775c`, blob `a1e0732ec88731cc1c7bdea5ca65b02c393e5b87`, incluyen diccionario PT/EN de 19 claves cada uno; los 19/19 valores coinciden literalmente con los diccionarios actuales. El chunk `gastronomia-01.js` tiene entrada de Lilia en Rua do Senado 45 y aclara que el local del CCBB es otra unidad; `rio-residual-gastronomia-01.js` contiene indicaciones de transporte/galería. No sustituir el contenido extendido de la página.
- Medios: ES 11 etiquetas de imagen frente a PT/EN 10; cada idioma tiene 9 fuentes únicas y coinciden, por lo que no se observó una URL de foto exclusiva. Hay 2 alt vacíos por variante. Enlaces: ES 21 destinos únicos frente a 9 PT/EN; incluye diferencias en navegación global/redes sociales, pendiente de cotejo con el diseño aprobado, no confirmado como regresión. Nada se modificó.
- FR no existe en Hostinger (HTTP 422 “File does not exist”), sin hreflang FR; dejar fuera del sitemap y noindex privado hasta terminar la ficha. Inspección ES/PT/EN: 3/3 enviadas e indexadas, fetch exitoso, robots permitidos, canonical Google = declarada y sitemap. Breadcrumb “Elemento sin nombre” es una alerta de resultado enriquecido, no error técnico confirmado.
- Estado: ES auditada; PT/EN en revisión; francés pendiente. Faltan prueba de runtime, QA semántico y de medios/enlaces, capturas aprobadas 1440/390 antes/después y build incremental/guard. La ficha no cuenta como completa ni publicada.
- Contabilidad tanda 2: 28/50 auditadas; 0/50 completas; 0 publicadas; 22 fichas aún por revisar. Próxima en la cola GSC: `/gastronomia/margutta-ipanema/` (20 impresiones del corte de prioridad). CSV commit `f3ca4eb9764c08865066dd8c19d3b01649293523`; informe en este commit.


## Auditoría de producción — Margutta Ipanema (segunda tanda, ficha 29/50; 15/11/2026)

- GSC ES, 2026-10-16–2026-11-12: 67 impresiones, 0 clics, CTR 0%, posición 10,0; periodo anterior 7 impresiones, 0 clics, posición 6,7. Creció la exposición (+60 impresiones) y empeoró la posición media (+3,3); no se infiere causa.
- Hostinger producción en `revision/rendimiento-traducciones-81a904c`, SHA `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; ES HTML blob `bac03372e3546c78ca2c859be786a8987870bd04`. ES/PT/EN tienen 29 párrafos y metadata/H1/canonical/alternates locales; aún falta prueba visual/runtime.
- Historial `42d03024d2c3765b0d96eb5f9763657d731baf4a` y `8570793a992b262c5fb384a396ec949e6105775c`, blob `81e379e7f6425ca8591e717d1a2287d4d6ac71dc`: diccionarios PT/EN de 19 claves; 17/19 coinciden literalmente con producción en cada idioma. Las claves 15/16 actuales localizan correctamente “accesibilidad” y “transporte” y mantienen la información. El chunk `rio-residual-gastronomia-01.js` confirma la distinción entre la unidad Ipanema y otra unidad en Barra; preservar esta precisión.
- Medios: ES 10 etiquetas, PT/EN 9, pero 8 fuentes únicas iguales entre idiomas; dos alt vacíos en cada variante. Destinos de enlace únicos ES 22 vs PT/EN 10; la diferencia incluye navegación global/redes sociales, pendiente de cotejo con el original aprobado. Sin cambios en imágenes ni enlaces.
- FR no existe (Hostinger 422) ni tiene alternate; dejar fuera del sitemap. GSC inspección ES/PT/EN 3/3 enviadas e indexadas, robots permitidos, fetch/canonical propios y sitemap. Breadcrumb “Elemento sin nombre” como alerta estructurada, no error confirmado.
- Estado: ES auditada; PT/EN en revisión; FR pendiente; ficha no completa ni publicada hasta runtime, cotejo integral, capturas 1440/390 antes/después e incremental/guard. Hostinger intacto.
- Contabilidad tanda 2: 29/50 auditadas; 0/50 completas; 0 publicadas; 21 fichas aún por auditar. Próxima cola: `/gastronomia/jojo/` (18 impresiones en el corte GSC). CSV commit `23c799177548060b74d2a4f54baa376e3bbf8eea`; informe en este commit.


## Auditoría de producción — Jojô Bistrô (segunda tanda, ficha 30/50; 15/11/2026)

- GSC ES, 2026-10-16–2026-11-12: 16 impresiones/0 clics/posición 26,1 frente a 9 impresiones/0 clics/posición 9,0 en 2026-09-18–2026-10-15. La exposición aumenta en 7 y la posición promedio empeora en 17,1; no concluye causa ni incidente.
- Hostinger producción `revision/rendimiento-traducciones-81a904c`, SHA `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `e5679c262f3a9dbc1c622987f416898767ef3311`. ES/PT/EN tienen 31 párrafos, título/description/H1/canonical/alternates locales. No se verificó runtime en navegador.
- Los commits `42d03024d2c3765b0d96eb5f9763657d731baf4a` y `8570793a992b262c5fb384a396ec949e6105775c`, blob `ec7ef4c9b44946a305d65c7772c9e0355a12aa06`, contienen diccionarios PT/EN de 19 entradas. En cada idioma 10/19 coinciden byte-normalizados con producción y 9 difieren; se conserva producción actual y cada diferencia requiere cotejo semántico/ampliaciones, no se asume error. Los cuatro chunks auditados no contienen entrada Jojô.
- Imágenes: ES 9 etiquetas y PT/EN 8, con siete fuentes únicas compartidas; hay dos alt vacíos por idioma. Enlaces únicos: ES 21, PT/EN 9; diferencia incluye navegación global y redes sociales, paridad pendiente de cotejo contra lo aprobado. Nada se cambió.
- FR no existe en Hostinger (HTTP 422), no hay hreflang FR. Inspección de URLs ES/PT/EN: 3/3 “Enviada e indexada”, fetch exitoso, robots allowed, canonical de usuario = Google y sitemap donde informado. Breadcrumb “Elemento sin nombre” es alerta, no error técnico confirmado.
- Estado: ES revisada; PT/EN en revisión por las nueve entradas evolucionadas aún sin cotejo y runtime pendiente; FR pendiente. No completa ni publicada. Faltan QA editorial, alt/enlaces, capturas 1440/390 antes/después y build incremental/guard. Hostinger intacto.
- Contabilidad tanda 2: 30/50 auditadas; 0/50 completas; 0 publicadas; 20 fichas por auditar. Próxima cola: `/gastronomia/teva/` (16 impresiones de prioridad). CSV commit `79fca88778d7e78a4b320461ce360327bfb3509e`; informe registrado en este commit.


## Auditoría de producción — Teva (segunda tanda, ficha 31/50; 15/11/2026)

- GSC ES, 2026-10-16–2026-11-12: 38 impresiones/0 clics/CTR 0%/posición 27,4; ventana anterior 4 impresiones/0 clics/posición 9,3. +34 impresiones y +18,1 en posición media (peor); no se infiere causa ni error confirmado.
- Hostinger en producción `revision/rendimiento-traducciones-81a904c`, SHA `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `309fdbe181356c68426e7d6412289cd4215ca9a0`. ES/PT/EN: 31 párrafos por ruta, title, description, H1, canonical propia y hreflang es/pt-BR/en/x-default locales.
- Historial de `42d03024d2c3765b0d96eb5f9763657d731baf4a` y `8570793a992b262c5fb384a396ec949e6105775c`, blob `a48dd8a24915ba326e0905868b07de6d92288732`: 19 claves PT y 19 EN; las 19 coinciden exactamente con producción. Los chunks gastronomia-01 y rio-residual tienen señales Teva relacionadas; se conservan las ampliaciones de la página.
- Medios: ES 13 etiquetas, PT/EN 12, con 11 URLs únicas compartidas; 2 alt vacíos por idioma. Enlaces únicos ES 22 vs PT/EN 10; diferencia incluye navegación global y redes sociales, por cotejar contra la estructura aprobada. Sin edición.
- FR no existe en Hostinger (HTTP 422), sin alternate FR. Inspección GSC ES/PT/EN 3/3 indexables, robots allowed, fetch exitoso y canonical Google = declarada; sitemap informado. Breadcrumb “Elemento sin nombre” es alerta estructurada. No tratarlo como error confirmado.
- Estado de ficha: ES revisada; PT/EN en revisión; FR pendiente. Renderizador en vivo, cotejo editorial, capturas 1440/390 antes/después y build incremental/guard pendientes. No completa ni publicada; producción intacta.
- Contabilidad tanda 2: 31/50 auditadas; 0/50 completas; 0 publicadas; 19 por auditar. Siguiente cola: `/gastronomia/la-fiorentina-ipanema/` (12 impresiones del corte GSC). CSV commit `d164e8f2a12641a675ed5f0a7115e87951fd198e`; informe en este commit.


## Auditoría de producción — La Fiorentina Ipanema (segunda tanda, ficha 32/50; 15/11/2026)

- La cola original le asigna 12 impresiones combinadas; consulta directa GSC por URL ES no devuelve filas en ninguna de las dos ventanas comparadas (2026-10-16–2026-11-12 y 2026-09-18–2026-10-15). Se registra “sin datos/fila”, no se afirma cero impresiones.
- Producción Hostinger en rama `revision/rendimiento-traducciones-81a904c`, SHA `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `1ec5b94fd56ffa84c84213077bec6cd67847c3b5`. ES/PT/EN tienen 20 párrafos, títulos/descripciones/H1 localizados, canonical declarada propia con slash y alternates ES/PT-BR/EN/x-default.
- Historial `42d03024d2c3765b0d96eb5f9763657d731baf4a` y `8570793a992b262c5fb384a396ec949e6105775c`, blob `2d7ec602176adba2a388538fcb7a90edd8682d4e`: diccionario manual PT/EN de 15 entradas por idioma, 15/15 coincidencias exactas con producción. Los cuatro chunks auditados no incluyen entrada de La Fiorentina.
- Imágenes ES 7 etiquetas, PT/EN 6; cuatro fuentes únicas idénticas; dos alt vacíos por idioma. Enlaces únicos ES 22 y PT/EN 10; diferencia incluye navegación global/social, aún por cotejar. Sin cambios.
- Hallazgo SEO confirmado por inspección GSC: ES reportada “Duplicada: Google ha elegido una versión canónica diferente”; canonical de usuario `https://www.ernestinhocarioca.com.br/gastronomia/la-fiorentina-ipanema/`, Google eligió la misma URL sin slash final. La contradicción debe revisarse; no se modifica canonical ahora. PT/EN 2/2 enviadas e indexadas, fetch correcto y canonical propia. Breadcrumb “Elemento sin nombre” en resultados enriquecidos es alerta. FR no existe (Hostinger HTTP 422), sin hreflang FR.
- Estado: ES/PT/EN auditadas en fuente, pero la ficha no puede validarse por discrepancia canónica ES; además faltan runtime, QA editorial/medios, capturas 1440/390 e incremental/guard. FR pendiente. No completa ni publicada; Hostinger intacto.
- Contabilidad tanda 2: 32/50 auditadas; 0 completas; 0 publicadas; 18 por auditar. Próxima cola: `/gastronomia/delirio-centro/` (10 impresiones en el corte de prioridad). CSV commit `2913316dc3da5da2d5a8c3197dbbd193cdf13fd9`; informe en este commit.


## Auditoría de producción — Delírio Tropical Centro (segunda tanda, ficha 33/50; 15/11/2026)

- Hostinger producción: rama `revision/rendimiento-traducciones-81a904c`, SHA `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; HTML ES blob `1ec5c674e164efdfb7429aa5cf42b72ab10ca842`. La ruta FR responde HTTP 422 (archivo inexistente), no existe alternate FR.
- ES/PT/EN tienen 19 párrafos cada una, seis etiquetas de imagen/4 fuentes únicas compartidas, cuatro alt no vacíos por página y 24 enlaces únicos; canonical y hreflang es/pt-BR/en/x-default locales. GSC inspecciona 3/3 variantes como enviadas/indexadas, fetch exitoso, robots allowed y canonical Google igual a declarada; Breadcrumb “Elemento sin nombre” queda como alerta.
- GSC ES 2026-10-16–2026-11-12: 30 impresiones, 0 clics, CTR 0%, posición 14,7; periodo anterior: 4 impresiones, 0 clics, posición 18,3. Cambio observable: +26 impresiones; esto no demuestra causa ni error de indexación.
- Tres señales visibles PT/EN no localizadas: encabezado “CENTRO · COMIDA FRESCA · ASSEMBLÉIA” idéntico en los tres idiomas; línea de fuente de verificación mezcla ES/PT/EN; párrafo de horarios/contacto permanece totalmente español en PT y EN. Se confirmó la necesidad de corregir contenido, pero el HTML es una plantilla con `data-i18n-module=\"gastronomia-lote4\"`; la búsqueda de chunks actuales e históricos aún no localiza el diccionario enlazado. No se tocó plantilla compartida, componentes ni HTML congelado.
- Estado: ES auditada; PT/EN bloqueadas en origen/mapeo de diccionario; FR pendiente/no existe. Faltan resolver el diccionario correcto, traducción editorial, runtime, verificación de alt/enlaces, capturas 1440/390 e incremental/guard. No completa ni publicada; Hostinger intacto.
- Contabilidad tanda 2: 33/50 auditadas; 0/50 completas; 0 publicadas; 17 pendientes. Siguiente prioridad según cola de GSC: `/gastronomia/ginga/` (inventario previo la marca con alertas de bloques idénticos; 10 impresiones de prioridad). Revisar historia/diccionario y estado real antes de aceptar.


## Auditoría de producción — Ginga (segunda tanda, ficha 34/50; 15/11/2026)

- Producción Hostinger confirmada en `revision/rendimiento-traducciones-81a904c`, SHA `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. Fuente ES actual en GitHub, blob `378cef2ae11b2a5834041c63d941aa9c82458e04`; contiene diccionarios inline PT y EN de 19 claves cada uno, pero las rutas PT/EN de producción no reflejan todo ese contenido. Los HTML localizados generados no están versionados como archivos PT/EN separados en la rama.
- Las tres variantes sirven 25 párrafos, H1 Ginga y títulos/descripciones traducidos. Diferencia comprobable: 9 de 25 párrafos en EN son idénticos a PT, incluidos los párrafos editoriales largos; la ruta PT mantiene dos párrafos visibles en español y hay una mezcla aislada (“no promises”). Los alt de las fotos del restaurante en EN permanecen en portugués. Las nueve imágenes únicas del restaurante se conservan entre ES/PT/EN.
- Canonical y alternates verificados para ES, PT-BR, EN y x-default. Inspección GSC: 3/3 enviadas e indexadas, robots permitido, fetch correcto, Google canonical igual a usuario. Breadcrumb con “Elemento sin nombre” es alerta, no error confirmado. FR no existe en Hostinger (HTTP 422) y no se anuncia.
- GSC ES 2026-10-16–2026-11-12: 9 impresiones/0 clics/posición 10,0; ventana anterior 10/0/15,7. Son impresiones y posición, no errores de indexación.
- El HTML histórico exacto de 42d03024 y 8570793 tenía la ruta ES, pero no las rutas independientes PT/EN. No alteré fuente, generación, imágenes ni layout. Estado: ES revisada; PT/EN en revisión por discrepancias de salida frente al diccionario; FR pendiente; QA de renderizador, alt/enlaces completos, capturas 1440/390 y build incremental/guard pendientes. No completa ni publicada.
- Contabilidad tanda 2: 34/50 auditadas; 0/50 completas; 0 publicadas; 16 pendientes. Siguiente: continuar con la mayor oportunidad GSC de la cola revisada, `/gastronomia/chama-rio-copacabana/` (1.062 impresiones combinadas en el corte 2026-08-12–2026-11-12); revalidar URL y estado en Hostinger antes de aceptarla.


## Auditoría de producción — Chama Rio Copacabana (segunda tanda, ficha 35/50; 15/11/2026)

- Producción Hostinger revision/rendimiento-traducciones-81a904c, SHA 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346. HTML ES en la rama de producción del repositorio, blob 5aab4304cd65e8006a7e9e410f0903495c3ef6be; 20 párrafos en cada variante ES/PT/EN, H1 común de marca, títulos/descripciones localizados y nueve imágenes de restaurante compartidas (diez etiquetas ES por elementos adicionales del sitio; dos alt vacíos en cada variante).
- Las tres rutas tienen canonical propia y alternates ES/PT-BR/EN/x-default. GSC inspección: ES “Descubierta: actualmente sin indexar” (estado neutral; no es fallo confirmado), PT/EN enviadas e indexadas con fetch exitoso y canonical de Google igual a la declarada. Breadcrumb sin nombre es alerta estructurada. FR no existe en Hostinger (HTTP 422), sin hreflang FR.
- GSC 2026-10-16–2026-11-12: PT 995 impresiones/3 clics/CTR 0,3%/posición 6,9; EN 67/0/0%/posición 9,6; ES sin fila en la consulta. “Sin fila” no se convierte en error ni en cero garantizado. El total de 1.062 impresiones observadas se concentra en PT/EN.
- La muestra completa inicial de PT y EN está editorialmente localizada y las tres páginas tienen 20 párrafos; no se da por cerrado el cotejo semántico de los 20 bloques ni el render real. Estado: ES revisada, PT/EN en revisión, FR pendiente, sin visual 1440/390, verificación completa de enlaces/alt ni build/guard. No completa ni publicada.
- Contabilidad tanda 2: 35/50 auditadas; 0/50 completas; 0 publicadas; 15 pendientes. Siguiente candidato por GSC 2026-08-12–2026-11-12: /gastronomia/plage-cafe/ (879 impresiones combinadas); validar Hostinger/GSC antes de dar por bueno el estado heredado.