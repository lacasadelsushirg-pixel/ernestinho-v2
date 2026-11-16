# Candidato de publicación PT-BR/EN — Elena Horto

Fecha UTC: 2026-11-16  
Base de producción verificada: `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`  
Commit funcional: `303e83dee4653ef1de8b730c7fa3733a4d24d045`  
Rama aislada: `release/elena-pt-en-20261116`

## Alcance

- Ruta fuente: `/gastronomia/elena/`
- Rutas candidatas: `/pt/gastronomia/elena/` y `/en/gastronomia/elena/`
- Producción no fue modificada.
- Francés no se incluye en este candidato: permanece privado, `noindex` y fuera del sitemap hasta completar QA editorial y técnico.
- No se modificaron el HTML fuente, fotos, mapas, layout, enlaces, widgets ni datos comerciales.

## Recuperación aplicada

- Inicialización del renderizador histórico según el idioma real de la URL.
- Recuperación de los dos párrafos añadidos después del diccionario posicional original.
- Localización PT-BR/EN de títulos auxiliares, mapa, pies y `alt` de seis fotografías.
- El selector duplicado heredado queda oculto en la salida generada; la navegación aprobada no se cambia.
- El cambio en los módulos de Elena activa únicamente su reconstrucción incremental.

## Verificaciones

| Control | Resultado real |
|---|---|
| Protección de contenido | PASS: 586 archivos sin cambios desde la última publicación; 10 activos críticos fijados |
| Deriva histórica | 247 archivos heredados difieren del manifiesto antiguo; no fueron aprobados ni regenerados |
| Generador incremental | PASS: 3 HTML generados de 3.612 documentos; 1.196 URL indexables por idioma |
| Auditor de contenido | PASS: 0 páginas localizadas con bloques largos idénticos; 0 con tres o más coincidencias |
| PT-BR | 24 párrafos renderizados; solo coincide literalmente `JARDIM BOTÂNICO · COZINHA ASIÁTICA · HORTO`, texto ya correcto en portugués |
| EN | 24 párrafos renderizados; 0 párrafos idénticos al español |
| SEO | `title`, descripción, canonical y hreflang ES/PT-BR/EN/x-default localizados y coherentes |
| Imágenes editoriales | Se conservan las mismas fuentes; `alt` y pies localizados. Los dos `alt=""` son avatares decorativos del asistente |
| Capturas | Antes/después en 1440 px y 390 px para PT-BR y EN |
| Auditor multilingüe global | No concluyente con build selectivo: marca como ausentes las rutas internas que no se generaron deliberadamente |
| Control de páginas congeladas | BLOQUEADO: lista 247 diferencias heredadas ya presentes en la base de producción |

Las capturas locales demuestran el cambio de español a PT-BR/EN y la estabilidad del layout. El entorno de prueba no pudo descargar las fotografías desde `mediumturquoise-stinkbug-270478.hostingersite.com`; por eso aparecen rotas tanto en el antes como en el después y la comprobación final de imágenes debe hacerse en el preview autorizado.

## Evidencias visuales

- `docs/seo/evidencias-elena-2026-11-16/before-pt-1440.png`
- `docs/seo/evidencias-elena-2026-11-16/after-pt-1440.png`
- `docs/seo/evidencias-elena-2026-11-16/before-pt-390.png`
- `docs/seo/evidencias-elena-2026-11-16/after-pt-390.png`
- `docs/seo/evidencias-elena-2026-11-16/before-en-1440.png`
- `docs/seo/evidencias-elena-2026-11-16/after-en-1440.png`
- `docs/seo/evidencias-elena-2026-11-16/before-en-390.png`
- `docs/seo/evidencias-elena-2026-11-16/after-en-390.png`

## Estado y continuación

- Ficha completa según el criterio de cuatro idiomas: **no**.
- Recuperación PT-BR/EN preparada: **sí**.
- Publicada en Hostinger: **no**.
- Bloqueos restantes: revisión humana independiente; resolver o aceptar explícitamente la deriva histórica del control de páginas congeladas; verificar fotos en un preview con acceso al host de imágenes.
- Siguiente acción segura: abrir un PR pequeño basado en producción, ejecutar sus checks y solicitar una única revisión independiente. No fusionar ni desplegar automáticamente.

