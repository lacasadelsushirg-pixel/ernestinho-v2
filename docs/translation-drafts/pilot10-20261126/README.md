# Piloto local de traducción — 10 rutas — 2026-11-26

## Estado
- Generados 40 HTML candidatos (10 fuentes × ES/PT-BR/EN/FR). Archivo reproducible guardado como `candidate-html.tar.gz.base64` en esta carpeta; decodificar con `base64 -d candidate-html.tar.gz.base64 | tar -xz`. No se copiaron a la raíz pública, sitemap ni árbol de despliegue.
- Snapshot `memory.machine-unreviewed.json` guardado para no perder el trabajo del modelo; todos los borradores NMT conservan estado sin aprobar. Los pesos siguen fuera del repositorio.
- Los tres idiomas traducidos llevan `noindex,nofollow` y canonical/hreflang de candidato. El ES es byte por byte idéntico a la fuente.
- Aprobación de publicación: **no**. Los candidatos no equivalen a páginas terminadas ni a URLs publicadas.
- Cobertura medida por 870 ocurrencias de texto/atributos de las 10 fuentes: PT-BR 62/870 importadas aprobadas; EN 62/870; FR 62/870. Esta cifra describe solo el piloto.
- Además, se redactaron 71 ocurrencias por idioma para Inicio, pendientes de revisión final. El resto incluye texto NMT sin revisar y cadenas vacías preservadas en español.

## Rutas fuente
`index.html`; `guia/index.html`; `guia/guarda-equipaje/index.html`; `guia/aeropuertos/index.html`; `guia/terminales/index.html`; `transportes/index.html`; `transportes/transporte-privado/index.html`; `transportes/metro/index.html`; `hospedaje/index.html`; `hospedaje/54/index.html`.

## QA realizada
- 10/10 pruebas unitarias del inventario y motor: PASS.
- Importación de las traducciones aprobadas de Inicio y QA del plan incremental Hostinger: PASS.
- Guard editorial: PASS, con 247 diferencias históricas de contenido que permanecen sin aprobación.
- Generador de candidatos: PASS para preservar exactamente scripts inline/externos, referencias de imágenes/medios/hojas de estilo, anchors y acciones de formularios. Los candidatos traducidos conservan noindex y hreflang de 4 idiomas.
- QA visual/viewport y runtime dinámico: pendiente. Playwright no pudo iniciar: el wrapper Chromium apunta a `/usr/lib/chromium/chromium`, que no está instalado. No se obtuvo HTTP 200 de los candidatos porque permanecen fuera del servidor.
- Errores observados en NMT que impiden publicar sin corrección: `RYO DE JANEIRO`, Búzios convertido en “Bouches/objetivos” y etiquetas mal traducidas. Se corrigieron solo algunas cadenas estáticas de Inicio en un archivo aparte; siguen pendientes de aprobación final.

## Modelos locales
Sin coste de servicio y fuera del repositorio: ES→EN Marian Apache-2.0; ES→FR Marian Apache-2.0; EN→PT Marian CC BY 4.0 con atribución. Snapshots fijados y hashes verificados. Para PT-BR se incorporó `>>pob<<` al worker y sus pruebas.

## Reanudación
1. Recuperar o regenerar la memoria NMT desde las 10 fuentes; nunca usar esos resultados como aprobados.
2. Extraer y tratar por separado los 14 bloques inline dinámicos.
3. Revisar/corregir frases, canonical, alternates y enlaces de idioma; después completar QA a 390×844 y 1440×900, incluyendo widgets/formularios.
4. Solo tras QA y gate verde, separar un lote mínimo, ejecutar el flujo incremental y verificar HTTP real en Hostinger. No iniciar build global.
