# Registro maestro de continuidad multilingüe

Última actualización: 2026-11-16 UTC

## Fuente de verdad y publicación

- Repositorio: `lacasadelsushirg-pixel/ernestinho-v2`.
- Rama pública de referencia: `revision/rendimiento-traducciones-81a904c`.
- HEAD público comprobado al abrir esta ejecución: `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`.
- Hostinger sirve `/home/u319776719/domains/ernestinhocarioca.com.br/public_html`.
- La raíz pública de Hostinger no tiene actualmente un repositorio Git enlazado. Los únicos despliegues Git configurados apuntan a `ec-translation-stage-20261102`, `fr` y `pt-en-preview-lote1`; por tanto, un PR o commit no cambia por sí solo la portada pública.
- `assets/js/translations/home.js` de Hostinger coincide exactamente con el mismo archivo del HEAD público, salvo el salto de línea final (FNV-1a `b39e36b3`, 18.251 caracteres). Esta comprobación evita basar el lote en una copia distinta de producción.
- Publicado significa únicamente visible y verificado en `https://www.ernestinhocarioca.com.br/`; una rama, un PR o una carpeta auxiliar no cuentan como publicación.

## Lote activo: Inicio PT-BR/EN seguro

Rama: `release/home-pt-en-safe-20261116`

Base: `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`

Commit remoto del contenido: `236efcb2680db95c56d6336549813306f41b6533`

PR de revisión: [#42](https://github.com/lacasadelsushirg-pixel/ernestinho-v2/pull/42)

Objetivo del sublote: mejorar la redacción editorial completa de las 97 claves de Inicio en PT-BR y EN, sin cambiar español, HTML, fotografías, mapas, componentes, rutas, canonical, hreflang ni sitemap. Francés permanece privado con `noindex, nofollow` y fuera del sitemap hasta su QA completo.

| URL | ES | PT-BR | EN | FR | Estado de este sublote |
|---|---|---|---|---|---|
| https://www.ernestinhocarioca.com.br/ | Publicado, preservado | N/A | N/A | N/A | Sin cambios |
| https://www.ernestinhocarioca.com.br/pt/ | N/A | Publicado anterior; candidato editorial 97/97 en PR | N/A | N/A | No publicado todavía |
| https://www.ernestinhocarioca.com.br/en/ | N/A | N/A | Publicado anterior; candidato editorial 97/97 en PR | N/A | No publicado todavía |
| https://www.ernestinhocarioca.com.br/fr/ | N/A | N/A | N/A | Privado en Hostinger con `noindex, nofollow` | No contar como publicada/indexable |

### Verificaciones del candidato

- Sintaxis: `node --check assets/js/translations/home.js` y `node --check scripts/qa_locale_interactions.mjs`: PASS.
- Cobertura: ES 97 claves, PT 97/97, EN 97/97; cero valores vacíos.
- Fidelidad: objeto ES idéntico al de producción; cero coincidencias del detector básico de fragmentos españoles en PT/EN.
- Integridad: `git diff --check`: PASS.
- Build: detenido correctamente por `guard_approved_content.mjs`; no se desactivó ni se actualizó su baseline.
- Protección: el único recurso compartido protegido modificado es `assets/js/translations/home.js`. Se actualiza la aserción editorial correspondiente en `scripts/qa_locale_interactions.mjs`.
- Fotos/layout/HTML/SEO: no se modifican en este sublote.

### Bloqueo exacto de publicación

El repositorio exige revisión humana independiente para `assets/js/translations/home.js`. El propietario autorizó las traducciones, pero la protección explícita no permite simular esa segunda revisión. El candidato debe recibir esa aprobación en su PR; después se integra a la rama pública y se publica mediante el flujo controlado hacia la raíz de Hostinger, con respaldo y comprobación HTTP posterior.

No utilizar el PR #41 como release de este sublote: además de Inicio modifica `site.js`, `locale-routing.js`, generador y sitemap, e intenta indexar FR. El candidato seguro actual separa PT/EN para producir el primer cambio visible sin abrir FR antes de QA.

## Siguiente paso exacto

1. Obtener una revisión humana independiente del PR pequeño de Inicio PT/EN.
2. Tras aprobación y checks, integrar en `revision/rendimiento-traducciones-81a904c`.
3. Publicar únicamente `assets/js/translations/home.js` en la raíz real de Hostinger con respaldo previo.
4. Verificar por HTTP `/pt/` y `/en/` a 390 px y 1440 px, contenido 97/97, imágenes, selector, canonical y hreflang.
5. Mantener `/fr/` privado; continuar su QA completo y después pasar a Guía de Río.

## Referencias concurrentes

- PR #24: rama amplia histórica; no usar como base de este release.
- PR #40: Elena PT/EN, fuera de prioridad mientras Inicio no esté publicado.
- PR #41: candidato amplio de Inicio/FR; no publicado y sin revisiones.
- Producción seguía en `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346` al iniciar este registro.
