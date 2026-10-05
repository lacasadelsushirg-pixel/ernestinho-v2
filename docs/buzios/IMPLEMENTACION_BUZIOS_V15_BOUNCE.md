# Búzios V1.5 y guarda equipaje

Base: `c6af73472db5ef7c32c6aca4d684a26ab489b750`.
Rama: `revision/rendimiento-traducciones-81a904c`.

## Implementación

Se profundiza V1 sin crear nuevas rutas de Búzios. Las 21 rutas existentes de Destinos/Búzios conservan su arquitectura. El portal incorpora 17 accesos fotográficos con títulos HTML, H1 de hasta 72px en desktop y 46px en móvil. Se mantienen el hero y protagonismo de Río, el bloque editorial de Búzios en Home y el concepto «Otro ritmo. Otro mar». Se retiraron las notas públicas de desarrollo.

Las 23 playas incorporan comparaciones y consejos de acceso, regreso y elección. Las 12 zonas de alojamiento añaden ventajas y contrapartidas; se amplían las decisiones para familias, parejas, grupos, primera visita y estadías largas. Se profundizan gastronomía, noche, conexiones de llegada, movilidad, cruceros y las diez propuestas comerciales existentes. Paseo y alquiler de buggy permanecen separados; actividades desde Búzios y excursión desde Río mantienen intenciones distintas.

Las fichas comerciales explican experiencia, elección y preparación; incluyen preguntas sobre inclusiones, encuentro, regreso y cambios de plan. WhatsApp continúa siendo una consulta. No se publican netos históricos ni se confirman precios, operadores, horarios, recogidas, políticas, itinerarios o inclusiones no aportados por Ernesto. No se atribuyen recuerdos personales a Ernesto.

Se añaden 11 fotografías editoriales locales WebP, aproximadamente 1,7MB en conjunto: Geribá, Ferradurinha, João Fernandes, Azeda, Tartaruga, Manguinhos, Brava, Forno, Armação, Ossos y Orla Bardot. Autor, origen y licencia se muestran junto a cada uso. Las fotos de Búzios en accesos comerciales tienen captions del lugar real y no se presentan como fotografías de vehículos, proveedores o destinos de excursión. Los originales propios y fotografías de producto siguen solicitados en el inventario. No se subieron imágenes a Cloudinary.

## Nueva guía

Una ruta conceptual y tres versiones públicas:

- `/guia/guarda-equipaje/`
- `/pt/guia/guarda-equipaje/`
- `/en/guia/guarda-equipaje/`

Guía con doce secciones, seis preguntas frecuentes, consejo editorial y flujo checkout → guarda equipaje → último día → recogida → aeropuerto/terminal/transfer. Trata check-in/check-out, hotel como primera opción, ubicación y horarios, checklist, Copacabana/Ipanema, Centro, GIG/SDU, Novo Rio/puerto, conexiones Río/Búzios y precauciones prácticas. No publica direcciones de partners, tarifas, horarios o garantías estáticos de Bounce.

La miniatura oficial suministrada se integra en las cards existentes de Guía de Río, con título HTML ES «Guarda equipaje», PT «Guarda-volumes» y EN «Luggage storage». Las tres imágenes editoriales suministradas se intercalan en el artículo; no se confunden con banners.

## Bounce

Enlace afiliado exacto centralizado una sola vez en `assets/js/bounce.js`: `https://go.bounce.com/ERNESTINHO8980973466`. Sin UTM añadido. Componente reutilizable con idioma, variante, source, CTA y aviso de afiliación traducidos. No se modifican afiliados preexistentes.

Integración principal en la guía; banners contextuales en Hospedaje, Aeropuertos y Terminales. Enlaces hacia la guía en Maleta y clima, Río de 1 a 7 días y Revisar alojamiento. Búzios solo enlaza desde Cómo llegar y Cruceros para conexiones con Río, sin afirmar que haya guarda equipaje en el desembarque de Búzios. Guía de Río recibe la miniatura. No se añade banner a Cristo/Corcovado: no se necesita inventar una política de equipaje.

Tracking compatible con `gtag` y cola `dataLayer`: `bounce_view` una vez por componente visto, `bounce_click` al clicar y parámetro `bounce_source`. Sin información personal. Sources activos: `guia-equipaje`, `ultimo-dia`, `hospedaje`, `aeropuerto` y `rodoviaria`. Los puentes sin banner no generan impresiones ni clics afiliados ficticios.

### Discrepancia de creatividades — requiere Ernesto

Se preserva exactamente el mapeo de nueve URLs, sin intercambiar idiomas ni crear imágenes. La inspección visual de los archivos descargados y el pantallazo suministrado detectan:

| Mapeo recibido | Idioma visible | Uso |
|---|---|---|
| ES vertical | Inglés | Retenido hasta URL correcta |
| ES compacto | Español | Activo |
| ES ancho | Inglés | Retenido hasta URL correcta |
| PT vertical | Portugués | Activo |
| PT compacto | Portugués | Activo |
| PT ancho | Portugués | Activo |
| EN vertical | Español | Retenido hasta URL correcta |
| EN compacto | Español | Retenido hasta URL correcta |
| EN ancho | Inglés | Activo |

Para evitar mezclar idiomas, ES utiliza su compacto y EN su ancho; PT distribuye las tres variantes. Esta es una limitación real frente a la distribución solicitada de nueve banners. Cuatro URLs correctas/confirmadas permiten activar las variantes sin reconstruir el componente. Los filenames no determinan el idioma. `QA_BOUNCE_CREATIVIDADES.json` registra URL, dimensiones, idioma observado y estado.

## Rutas modificadas por contenido compartido o integración

Además de la nueva guía, `/`, `/destinos/` y todas las rutas de `/destinos/buzios/`; `/guia/`, `/hospedaje/`, `/guia/aeropuertos/`, `/guia/terminales/`, `/consejos/maletas-rio/`, `/consejos/rio-1-a-7-dias/` y `/consejos/revisar-alojamiento/`. En total, 30 rutas conceptuales dentro del QA, 90 versiones localizadas. Diez son fichas comerciales de Búzios.

El generador conserva URLs, canonical propio, hreflang recíproco y x-default del sistema actual. La guía incorpora title, description, H1, OG, alt y lang localizados. La nueva ruta entra en el sitemap mediante el generador actual. No se cambia el sistema de SEO ni se crean redirects. Los módulos de contenido se separan de `app.js`; nuevas fotos/cards y banners usan lazy loading, dimensiones y ratios estables. No se certifican métricas de campo ni conversiones reales de afiliación.

## Fuentes y documentación

Se reutilizan Master, investigación, perfiles de playas y zonas existentes. Se registran 13 fuentes nuevas: dos fuentes oficiales de Bounce para búsqueda y reserva y once fuentes originales/licencias de Wikimedia Commons. `FUENTES_BUZIOS.csv`, `IMAGENES_BUZIOS.csv` y `REQUIERE_ERNESTO.md` conservan lo existente y añaden las necesidades detectadas.

## QA local

- Build completo: 1854 HTML generados, 1833 URLs indexables, 611 por idioma. Regeneración focalizada posterior de las rutas ajustadas.
- SEO/enlaces: 30 rutas y 90 versiones; canonical, hreflang, x-default, lang, H1, title, description, OG, sitemap y enlaces internos. En las integraciones de Río se preservan descripciones heredadas, incluidas las breves.
- Runtime: 180 combinaciones de las 30 rutas × tres idiomas × desktop/móvil, más repetición focalizada de cambios finales. HTTP200 local, metadata coincidente, navegación/selector equivalentes, sin excepciones JS ni overflow.
- Visual: 16 combinaciones y 48 navegaciones reales PT→EN→ES, conservando query y fragment; seguimiento final del portal, miniatura y guía. Imágenes nuevas cargadas, enlace afiliado exacto y banner del idioma comprobado. Prueba real de eventos view/click sin navegación afiliada ni reserva.
- Conservación: checker obligatorio mantiene exactamente las mismas 586 diferencias de la base, sin nuevas ni resueltas. No se regeneró manifiesto ni se reabrieron sus causas. Fuentes de Airalo, Rentcars, Assist Card y emergencias intactas por comparación de bytes; la revisión de diff limita Río a las integraciones autorizadas y retirada de la nota de Home.
- Fotografías locales con dimensiones y licencias, imágenes editoriales/miniatura/Bounce inspeccionadas. Los cuatro banners discrepantes no se activan. No se publican los netos de junio como vigentes.

Resultados detallados en `QA_BUZIOS_V15.json`, `QA_RUNTIME_BUZIOS_V15.json`, `QA_VISUAL_BUZIOS_V15.json`, `QA_VISUAL_BUZIOS_V15_FINAL.json`, `QA_BOUNCE_CREATIVIDADES.json` y `QA_CONSERVACION_BUZIOS_V15.json`.

## Entrega autorizada

Un único commit local y un bundle completo/autocontenido de la rama, con base y todos sus antecedentes. El bundle se verifica y se importa en un repositorio vacío para comprobar que no necesita prerequisites externos. Sin push, preview, producción ni modificación/merge de main; transporte y deployment se realizarán externamente según la corrección de flujo del usuario.
