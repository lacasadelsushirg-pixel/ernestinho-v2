# Plan de producción de miniaturas regionales — 2026-11-07

**Estado:** solicitudes de fotografías, NO imágenes obtenidas ni verificadas. Se conserva el inventario existente. Objetivo: que cada portada tenga 13 miniaturas propias y temáticamente relevantes, sin letras sobre la fotografía y sin enlaces a otras guías turísticas.

## Requisitos antes de incorporar una fotografía
- Confirmar que la imagen muestra realmente el destino y el lugar indicado (comprobar ficha original y referencia geográfica).
- Registrar URL de origen, autor, licencia exacta, URL de licencia, título original y ALT localizado; no aceptar archivos sin procedencia.
- Descargar y convertir a WebP optimizado sin distorsión ni marcas de agua; conservar proporciones y encuadres comparables a Río.
- Respetar atribución legal en la página interna de créditos, sin superponer texto a la imagen.
- Confirmar que el archivo existe en la ruta de producción y que carga en ES/PT/EN, escritorio y móvil.
- No duplicar una misma fotografía entre miniaturas de una misma portada para ocultar faltantes.

## Miniaturas pendientes, por destino

### arraial-do-cabo

| Sección sin miniatura | Fotografía real que se debe localizar |
|---|---|
| guia | Vista general del centro de Arraial y Praia dos Anjos |
| transportes | Puerto y embarcaciones en Praia dos Anjos |
| fotografias | Panorámica de Praia do Forno desde sendero |
| experiencias | Embarcación turística navegando en Arraial |
| familia | Playa tranquila de Prainha |
| vida-nocturna | Paseo nocturno en el centro de Arraial |
| gastronomia | Restaurantes de pescado en Praia dos Anjos |
| consejos | Vista de Praia Grande y su paseo |
| naturaleza | Mirador de Pontal do Atalaia |
| compras | Comercios locales del centro de Arraial |
| eventos | Evento cultural local documentado en Arraial |

### paraty

| Sección sin miniatura | Fotografía real que se debe localizar |
|---|---|
| guia | Calles empedradas del Centro Histórico |
| transportes | Terminal de autobuses o embarcadero de Paraty |
| fotografias | Casario colonial reflejado en calles del Centro Histórico |
| experiencias | Barcos turísticos en la bahía de Paraty |
| barrios | Barrio de Jabaquara o centro de Paraty |
| vida-nocturna | Centro Histórico iluminado de noche |
| gastronomia | Restaurante local del Centro Histórico |
| consejos | Calles peatonales del casco histórico |
| compras | Tiendas de artesanía en Centro Histórico |
| eventos | Festival cultural de Paraty con fotografía autorizada |

### petropolis

| Sección sin miniatura | Fotografía real que se debe localizar |
|---|---|
| transportes | Terminal rodoviaria de Petrópolis o transporte local |
| experiencias | Palácio de Cristal de Petrópolis |
| vida-nocturna | Locales de ocio nocturno de Petrópolis |
| gastronomia | Restaurante o café del Centro Histórico |
| consejos | Centro Histórico peatonal de Petrópolis |

### cabo-frio

| Sección sin miniatura | Fotografía real que se debe localizar |
|---|---|
| transportes | Terminal de autobuses o transporte urbano de Cabo Frio |
| fotografias | Panorámica de Praia do Forte |
| experiencias | Passeio de barco por Canal do Itajuru |
| vida-nocturna | Zona de bares de Passagem |
| gastronomia | Restaurantes de Passagem |
| consejos | Forte São Mateus y entorno de Praia do Forte |
| compras | Rua dos Biquínis |
| eventos | Evento cultural documentado en Cabo Frio |

## Implementación sin interferir con Work
1. Comparar este inventario con el manifiesto actualizado antes de empezar: otra ejecución puede haber incorporado imágenes.
2. Descargar solo fuentes permitidas y comprobar los derechos; nunca convertir una sugerencia de fotografía en una afirmación de disponibilidad.
3. Añadir nuevas entradas al manifiesto existente de manera atómica, conservando las entradas previas; incluir metadatos completos.
4. Generar páginas regionales en carpeta temporal; comprobar que las 13 secciones de cada home aparecen como tarjetas con fotos distintas.
5. Ejecutar `node scripts/audit_regional_thumbnails.mjs`; revisar errores, incluyendo existencia real de archivos.
6. Contrastar a 1440 px y 390 px contra las tarjetas de Río; después publicación incremental y registro de URL publicada.

## Observación técnica importante
En `scripts/build_regional_destinations.mjs`, `sectionTiles()` separa tarjetas con imagen (`guide-grid`) y secciones sin imagen (`rd-quick-grid`). Por tanto, **no basta con mejorar CSS**: cada sección requiere su propia entrada de imagen y archivo real. La portada no se considera completa hasta tener las 13 tarjetas con fotografías verificadas. La guía práctica también necesita imágenes por tema, no un conjunto reducido reutilizado por índice.

## Siguiente auditoría
Inventariar cada subguía y cada tarjeta interior de los cuatro destinos, asignando fotografía local única donde la plantilla de Río la utiliza; verificar transporte, enlaces a mapas externos, contenidos y traducciones. No publicar sin pruebas.