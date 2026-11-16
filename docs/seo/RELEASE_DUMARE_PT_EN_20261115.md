# Quiosque Dumaré — restauración PT-BR/EN y auditoría SEO (15/11/2026)

## Estado verificado

- Ruta: `/gastronomia/dumare/` (no confundir con `/gastronomia/dumare-copa/`).
- Producción Hostinger continúa en `revision/rendimiento-traducciones-81a904c`, HEAD `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. El HTML ES vigente tiene blob Git `f2fbca8b8f9d514579d6e48a5e8102bd10d35130`.
- Candidato PT-BR/EN permanece privado en PR #36, rama `release/cervantes-pt-en-20261115`, HEAD de código `09bb8cef5939920fdd644e8635633ce659a984d1`, base de producción `21bb68772faa6a6ea8f89cbd2c90bfbbcbbc5346`. No está fusionado ni publicado; cambios atribuibles en Hostinger: **0**.
- FR no está traducido ni generado para esta ficha. No aparece como hreflang y no se añade al sitemap. La ficha no cuenta como completa de cuatro idiomas.

## Recuperación y correspondencia histórica

El HTML ES vigente contiene un diccionario posicional antiguo de 19 párrafos, mientras la página editorial creció a 26 párrafos estáticos y 30 en el render final al sumar cuatro bloques comunes. Se cotejó el sentido antes de aplicar el mapeo: se restauran los 19 segmentos PT/EN históricos a los párrafos vigentes; dos bloques editoriales posteriores reciben traducción manual, así como el resumen, notas de vigencia, etiquetas, descripción, navegación y bloques compartidos. Los seis atributos alt de las fotos quedan localizados.

Fuentes históricas consultadas: diccionario incrustado de la página y commits `42d03024d2c3765b0d96eb5f9763657d731baf4a` y `8570793a992b262c5fb384a396ec949e6105775c`. No se reemplaza ningún diccionario actual completo. Se preservaron texto ES, imágenes y sus URLs, mapa, enlaces, datos comerciales, tablas/estructura, estilos, componentes y widget.

## Generador y SEO estructural

- Build de ruta selectiva mediante `scripts/build_multilingual.mjs`: **3** HTML de Dumaré renderizados de los 3.612 documentos del manifest; no se reconstruyó el sitio.
- Resultado: ES/PT-BR/EN con idioma correcto, título y meta descripción localizados, un H1 y trece H2 existentes revisados, 30 párrafos por variante, sin párrafos PT/EN literalmente idénticos a ES. Se verificaron alts, enlaces, etiquetas prácticas, el mapa y los elementos estructurales.
- Canonical propio por idioma. Alternates ES/PT-BR/EN/x-default únicamente; ningún alternate FR.
- Comparación exacta del conjunto de URLs: sitemap vivo de Hostinger **3.588**, sitemap candidato **3.588**, 0 añadidas y 0 retiradas. Manifest candidato: **3.612** documentos.
- Las seis URLs de fotos corresponden a las mismas fuentes que el ES. Las capturas comparativas locales a 1440x1000 y 390x844 se guardan en `captures/dumare-pt-en-20261115/`. En una comprobación visual separada de la URL pública PT, el hero se mostró con la fotografía; no obstante, eso no aprueba visualmente el HTML generado en la rama candidata, que aún no tiene un preview accesible.

## Search Console/OpenSEO

Proyecto `7172f2fb-7456-4b35-b581-d9b11c0040f4`, propiedad `https://www.ernestinhocarioca.com.br/`, tipo web, datos finales del 12/08/2026 al 12/11/2026:

| Variante | Impresiones | Clics | CTR | Posición media |
|---|---:|---:|---:|---:|
| ES | 281 | 1 | 0,36 % | 7,4 |
| PT-BR | 148 | 0 | 0 % | 8,8 |
| EN | 219 | 1 | 0,46 % | 9,2 |
| **Total** | **648** | **2** | **0,31 %** | — |

Inspección de URL GSC: **3/3** variantes enviadas e indexadas; robots permitido, fetch exitoso, rastreo móvil y canonical elegido por Google igual al declarado. Breadcrumbs: PASS con un elemento sin nombre. Usabilidad móvil: `VERDICT_UNSPECIFIED`. No hay error ni exclusión de indexación confirmados. Dumaré Copa es otra ficha y acumuló 60 impresiones ES en el mismo periodo.

## QA visual e incidencias

La comparación en Chromium generó vistas antes/después en los dos tamaños solicitados. **No se otorga aprobación visual independiente al candidato**: las peticiones de fotos al host externo `mediumturquoise-stinkbug-270478.hostingersite.com` fallan en las capturas Playwright locales con `net::ERR_EMPTY_RESPONSE`, sin evidencia de HTTP 404; el protocolo `file://` además no reproduce todas las importaciones del sitio servido. En la URL PT de producción, el navegador directo sí mostró la foto hero cargada, lo que confirma que el medio es accesible desde ese entorno. Falta inspeccionar una vista servida del HTML de la rama candidata; la limitación local no es un error de indexación confirmado. No se alteraron fotos ni su origen.

Se mantuvo no indexación de FR hasta que exista contenido completo: no se creó HTML FR, no hay hreflang FR y no se añadió URL FR al sitemap. La auditoría visual independiente y la revisión humana requerida por la protección del repositorio siguen pendientes antes de cualquier release.

## Evidencias y continuación

- QA de contenido/SEO: [`QA_DUMARE_PT_EN_20261115.json`](QA_DUMARE_PT_EN_20261115.json).
- Comparativas: `captures/dumare-pt-en-20261115/{pt,en}-{desktop,mobile}-review.jpg`.
- Punto durable de lote y lista de 50 URL con hashes del HTML ES de producción: [`TANDA50_CONTINUIDAD_2026-11-15.md`](TANDA50_CONTINUIDAD_2026-11-15.md). Dumaré principal sube a la fila 13 por 648 impresiones; Cais do Oriente (180) sale de la selección activa de 50, pero permanece en el inventario maestro.
- Estado estricto al corte: **0/50** fichas completas PT-BR/EN/FR verificadas, **0** publicadas en Hostinger. Candidaturas privadas PT/EN parciales: Don Camillo, Bar do Omar, Spicy Fish y Dumaré. Próximo trabajo: resolver QA visual, cotejar Amendoeira y continuar por oportunidades de impresiones verificadas. No cerrar Dumaré mientras FR o revisión visual sigan pendientes.
