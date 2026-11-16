# Candidato de recuperación PT-BR/EN: Cervantes y Chez Claude — 15/11/2026

## Publicación y punto de partida

**Publicado: 0 páginas.** La rama de producción Hostinger sigue en `revision/rendimiento-traducciones-81a904c`, commit `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`, deployment completado `01a1d6e6-8df0-71a5-9aa0-cac9499f2952`. No escribí en el hosting.

El cambio privado está en el PR #36, rama `release/cervantes-pt-en-20261115`, creado desde el HEAD de producción. El PR estaba abierto, no draft y mergeable en la última lectura; Vercel estaba en `success` para el head anterior `e40a5fa8efb1de1553dc15c5e7da8ec62eee1b2d`. No tenía revisiones humanas. Los cambios descritos aquí deben volver a pasar CI.

El PR #24 está abierto y en borrador, con head `586a0e3457c41071ada753bbf4d1c08484600d25` (`audit/traducciones-seo-validacion-20261110`) sobre base antigua `9426c42fc0150bdce5fbfee060396da9de518ac7`; la producción actual es `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. Tiene 50 archivos y no registra revisiones independientes. Su status Vercel actual era `success`, así que la afirmación anterior de que Vercel seguía pendiente era incorrecta. GitHub no expone por qué se dejó como draft; no lo supongo ni agrego más cambios a esa rama.

El SHA local `332a700d` no existe en este checkout (`git cat-file` falla) ni entre las ramas remotas obtenidas. No atribuyo ningún trabajo a ese SHA.

## Fichas de este sublote

| Ruta | Estado verificado | ¿Cuenta como ficha completa? |
|---|---|---|
| `/gastronomia/cervantes-copacabana/` | PT/EN candidatos estáticos; el diccionario FR proviene de una rama piloto distinta y no está en esta entrega. Falta cerrar vigencia comercial y QA de integración completa. | No; se conserva como ficha previamente revisada, no se cuenta como nueva ni cerrada bajo el criterio estricto. |
| `/gastronomia/chez-claude/` | PT/EN candidatos estáticos y revisados localmente. FR aún no se ha traducido. | No. |

En consecuencia, este sublote suma **0 fichas nuevas cerradas**. El checkpoint de la tanda deja 10/50 como avance histórico auditado en las notas previas; bajo la regla estricta de hoy Cervantes queda en revisión y no se suma de nuevo. Chez Claude tampoco incrementa el total porque falta FR. No hay nuevas páginas publicadas.

## Implementación del candidato

- `scripts/build_multilingual.mjs` aplica diccionarios manuales de ruta únicamente a Cervantes y Chez Claude cuando se invoca `--update --routes=...`; el log ahora distingue `route-selective update` de build completo.
- La plantilla es la versión ES actual descargada de producción. Se traducen nodos textuales y atributos alternativos existentes (alt/title/data-ec-alt); se conserva el diccionario inline histórico de Chez Claude sin sobrescribirlo.
- No se cambian HTML fuente, fotos, sus URLs, mapa, widgets, enlaces, layout ni datos comerciales. No se crea francés en estas páginas, ni `hreflang` FR ni URL FR en sitemap; FR permanece privado/noindex.
- Se cotejaron las fuentes históricas manuales de Chez Claude en `42d03024d2c3765b0d96eb5f9763657d731baf4a` y `8570793a992b262c5fb384a396ec949e6105775c`. PT/EN se aplican a los textos vigentes, no se asume que la sola existencia del diccionario histórico valida el contenido actual.

## QA reproducible

Build selectivo ejecutado desde producción:

```sh
EC_LIVE_ROOT=/workspace/scratch/3c28b485f899/live-template-snapshot \
EC_USE_LIVE_TEMPLATES=1 \
EC_PLAYWRIGHT_PATH=/workspace/scratch/3c28b485f899/r14/node_modules/playwright-core \
node scripts/build_multilingual.mjs --update \
  --routes=/gastronomia/cervantes-copacabana/,/gastronomia/chez-claude/
```

Resultado: `route-selective update`, seis variantes ES/PT/EN generadas de 3.612 documentos fuente; manifiesto final 1.204 documentos, 1.196 URL indexables por idioma. No se ejecutó build completo.

- `node --check scripts/build_multilingual.mjs`: pasó.
- `node scripts/guard_approved_content.mjs`: pasó; 586 páginas protegidas intactas y 10 assets visuales/runtime fijados. Reporta 247 divergencias históricas.
- `python3 scripts/audit_multilingual.py`, con fixture aislado de las seis variantes: `generated=6`, `audited=6`, `indexable=6`, `failed=0`, `errors=[]`. El manifiesto completo se restauró después.
- La prueba estática verificó en Chez Claude que el aviso de horarios aparece traducido en PT/EN y que el aviso español no se filtra.
- Sitemap candidato: 3.588 URLs; cotejado por conjunto con `live14.xml` de Hostinger: 3.588 frente a 3.588, cero URLs añadidas o quitadas, cero FR.
- Comparación estructural frente a la plantilla: Cervantes mantiene sus 189 tags; Chez Claude sus 199. Las diferencias son los textos objetivo, alts/títulos/datos accesibles de mapa traducidos; enlaces, canonical, alternates, src de fotos y de mapa se conservan. No hay `hreflang` a francés.
- Capturas antes/después PT/EN a 1440 y 390 px están en `docs/seo/captures/release-pt-en-20261115/`. Las imágenes externas fallaron en la sesión local y el mapa no cargó allí; esas capturas no son una aprobación visual independiente. El DOM conserva las URLs originales y la página Hostinger de referencia presenta el mismo estado de medios.
- `node scripts/audit_translations.mjs` sigue abortando antes de recorrer páginas por `Invalid dictionary: buzios-approved-blocks.js`, un archivo de producción fuera del cambio. `scripts/audit_translation_content.py` no existe en el HEAD.
- `python3 scripts/check_frozen_pages.py` falla en la base y el candidato con la misma salida SHA-256 `e5573a8feb30aeeefa0f4912a4f0e72f4d38e02d9e0b9d40b8977344b72e0815` (247 divergencias heredadas). No regeneré aprobaciones ni alteré el guard.

## Revisión y continuidad

El PR #36 debe conservarse abierto para revisión humana independiente. Antes de cualquier publicación, la persona revisora debe validar los textos PT/EN, confirmar que los cambios están acotados, decidir cómo tratar el drift histórico del guard sin regenerar aprobaciones masivas y aprobar la apariencia cuando los medios puedan verificarse. Hostinger debe seguir intacto hasta que las revisiones y checks requeridos pasen.

El inventario maestro actualiza solo Cervantes y Chez Claude. Las demás filas conservan su snapshot anterior y no se presentan como auditadas hoy. El detalle de estado y el siguiente paso durable están en `docs/seo/TANDA50_CONTINUIDAD_2026-11-15.md`.
