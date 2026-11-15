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
| 1 | https://www.ernestinhocarioca.com.br/gastronomia/don-camillo/ | A/U/U/P | 134 / 1 | PT/EN preview 200/noindex, autocanonical, indexed GSC; FR/QA visual y semántica pendientes; prod 21bb687; preview 846de45 |
| 2 | https://www.ernestinhocarioca.com.br/gastronomia/bar-do-omar/ | A/V/V/P | 220 / 1 | PT/EN preview 200/noindex, autocanonical, indexed GSC; FR/QA visual y semántica pendientes; prod 21bb687; preview 846de45 |
| 3 | https://www.ernestinhocarioca.com.br/gastronomia/spicy-fish/ | A/U/U/P | 381 / 2 | PT/EN preview 200/noindex, autocanonical, indexed GSC; FR/QA visual y semántica pendientes; prod 21bb687; preview 846de45 |
| 4 | https://www.ernestinhocarioca.com.br/gastronomia/amendoeira/ | A/P/P/P | 195 / 1 | PT/EN preview 200/noindex, autocanonical, indexed GSC; FR/QA visual y semántica pendientes; prod 21bb687; preview 846de45 |
| 5 | https://www.ernestinhocarioca.com.br/gastronomia/dumare/ | A/U/U/P | 521 / 2 | PT/EN preview 200/noindex, autocanonical, indexed GSC; FR/QA visual y semántica pendientes; prod 21bb687; preview 846de45 |
| 6 | https://www.ernestinhocarioca.com.br/gastronomia/chama-rio-copacabana/ | ES GSC descubierta; PT/EN live e indexadas; FR ausente | 1.062 / 3 | Hostinger PT/EN 20 párrafos, títulos/canonical propios y fotos editoriales coincidentes; 11 enlaces ES faltan en PT/EN; FR y QA visual pendientes, no completa |
| 7 | https://www.ernestinhocarioca.com.br/gastronomia/carretao-siqueira/ | ES indexada; PT descubierta/no indexada; EN desconocida; FR ausente | 991 / 5 | Hostinger: PT/EN 25 párrafos, títulos SEO y 7 alts siguen en ES; 7 fotos y 19 enlaces preservados; falta FR/QA visual, no completa |
| 8 | https://www.ernestinhocarioca.com.br/gastronomia/plage-cafe/ | ES/PT/EN presentes en Hostinger y GSC indexadas; texto ES residual en PT/EN (1 párrafo EAV, 6 alts de foto por variante); FR ausente; no completa | 869 (ES 267/PT 505/EN 97) | Hostinger prod `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`; blob ES `7b18104abae1dcb68821af4663dafa6049206bf7` |
| 9 | https://www.ernestinhocarioca.com.br/gastronomia/sushi-leblon/ | ES/PT indexadas; EN descubierta/no indexada sin causa técnica declarada; PT/EN tienen 31 párrafos sin coincidencia literal con ES, pero un alt de foto sigue en español; FR ausente; no completa | 523 (ES 474/PT 49/EN sin filas) | Hostinger prod 21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346; blob ES f0960038eed49af92dfaf2c9618b88b30dbc0395 |
| 10 | https://www.ernestinhocarioca.com.br/gastronomia/zaza-bistro-tropical/ | P/R/R/R | 481 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 11 | https://www.ernestinhocarioca.com.br/gastronomia/terra-brasilis/ | P/P/P/P | 451 / 3 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 12 | https://www.ernestinhocarioca.com.br/gastronomia/carretao-lido/ | P/R/R/P | 447 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 13 | https://www.ernestinhocarioca.com.br/gastronomia/cais-do-oriente/ | P/R/R/P | 121 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 14 | https://www.ernestinhocarioca.com.br/gastronomia/galeto-sats/ | P/P/P/P | 360 / 4 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 15 | https://www.ernestinhocarioca.com.br/gastronomia/haru/ | P/R/R/P | 313 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 16 | https://www.ernestinhocarioca.com.br/gastronomia/aprazivel/ | P/R/R/R | 272 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 17 | https://www.ernestinhocarioca.com.br/gastronomia/churrascaria-palace/ | P/R/R/R | 263 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 18 | https://www.ernestinhocarioca.com.br/gastronomia/frontera-ipanema/ | P/R/R/P | 254 / 1 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 19 | https://www.ernestinhocarioca.com.br/gastronomia/temperarte-posto6/ | P/R/R/P | 241 / 1 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 20 | https://www.ernestinhocarioca.com.br/gastronomia/colombo-do-forte/ | P/R/R/R | 238 / 2 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 21 | https://www.ernestinhocarioca.com.br/gastronomia/faenza-copacabana/ | R/C/C/C | 224 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 22 | https://www.ernestinhocarioca.com.br/gastronomia/maska/ | P/R/R/R | 221 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 23 | https://www.ernestinhocarioca.com.br/gastronomia/oteque/ | P/R/R/R | 210 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 24 | https://www.ernestinhocarioca.com.br/gastronomia/cipriani/ | P/P/R/P | 208 / 3 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 25 | https://www.ernestinhocarioca.com.br/gastronomia/temperarte-bolivar/ | P/R/R/P | 197 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 26 | https://www.ernestinhocarioca.com.br/gastronomia/casa-mohamed/ | P/R/R/P | 122 / 1 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 27 | https://www.ernestinhocarioca.com.br/gastronomia/merci/ | P/P/P/P | 193 / 2 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 28 | https://www.ernestinhocarioca.com.br/gastronomia/cafe-lamas/ | P/R/R/R | 183 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 29 | https://www.ernestinhocarioca.com.br/gastronomia/lasai/ | U/U/U/P | 180 / 2 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 30 | https://www.ernestinhocarioca.com.br/gastronomia/tacaca-do-norte/ | P/R/R/P | 180 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 31 | https://www.ernestinhocarioca.com.br/gastronomia/cervantes-copacabana/ | A/P/P/P | 176 / 1 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 32 | https://www.ernestinhocarioca.com.br/gastronomia/rotisseria-sirio-libanesa/ | R/C/C/C | 176 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 33 | https://www.ernestinhocarioca.com.br/gastronomia/guacamole-copacabana/ | P/P/P/P | 169 / 1 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 34 | https://www.ernestinhocarioca.com.br/gastronomia/churrasqueira-rio/ | P/R/R/R | 166 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 35 | https://www.ernestinhocarioca.com.br/gastronomia/garota-de-ipanema/ | P/R/R/P | 165 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 36 | https://www.ernestinhocarioca.com.br/gastronomia/bar-urca/ | P/R/R/P | 164 / 1 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 37 | https://www.ernestinhocarioca.com.br/gastronomia/polis-sucos/ | P/R/R/P | 161 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 38 | https://www.ernestinhocarioca.com.br/gastronomia/feira-sao-cristovao/ | P/R/R/P | 160 / 2 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 39 | https://www.ernestinhocarioca.com.br/gastronomia/la-bicyclette/ | P/R/R/P | 148 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 40 | https://www.ernestinhocarioca.com.br/gastronomia/chez-claude/ | A/P/P/P | 146 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 41 | https://www.ernestinhocarioca.com.br/gastronomia/stalos/ | P/R/R/P | 145 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 42 | https://www.ernestinhocarioca.com.br/gastronomia/giuseppe-mar/ | P/R/R/P | 142 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 43 | https://www.ernestinhocarioca.com.br/gastronomia/aipo-aipim-391/ | P/R/R/P | 141 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 44 | https://www.ernestinhocarioca.com.br/gastronomia/hollandaise/ | P/R/R/P | 137 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 45 | https://www.ernestinhocarioca.com.br/gastronomia/mocellin-steak/ | P/R/R/P | 134 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 46 | https://www.ernestinhocarioca.com.br/gastronomia/jobi/ | P/R/R/P | 132 / 1 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 47 | https://www.ernestinhocarioca.com.br/gastronomia/stambul-copa/ | P/R/R/P | 130 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 48 | https://www.ernestinhocarioca.com.br/gastronomia/oro/ | P/R/R/P | 129 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 49 | https://www.ernestinhocarioca.com.br/gastronomia/sel-ipanema/ | P/R/R/P | 129 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |
| 50 | https://www.ernestinhocarioca.com.br/gastronomia/joaquina/ | P/R/R/P | 124 / 0 | Pendiente de revalidar en esta ejecución; prod 21bb687; sin candidato comprobado |

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
