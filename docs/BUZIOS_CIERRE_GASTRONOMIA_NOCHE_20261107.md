# Cierre de gastronomía, vida nocturna y Consejos de Búzios

Base: `195fae381b8edafcc018208d62f442741dcb9558`, rama `revision/rendimiento-traducciones-81a904c`. Publicación exclusiva en Hostinger.

## Cambios

- Conserva las 42 URL de restaurantes bajo `/destinos/buzios/comer-y-salir/`. El catálogo y las fichas utilizan los estilos y la estructura de los equivalentes de Río.
- Sustituye el fallback español de 32 fichas por adaptaciones editoriales PT/EN. Los textos ES originales se conservan; se retiran notas sobre el proceso de investigación del texto visible.
- Vida nocturna: catálogo de 20 opciones con búsqueda y filtros; reutiliza 16 fichas de restaurantes y añade cuatro guías propias (Privilège, Silk, House of Rock y Mr. Brad). Samba/pagode dependen de agenda, no de una promesa semanal fija.
- Consejos: portada con ocho temas y sección Brasil; ocho interiores con el molde de Río y contenido ES/PT/EN de Búzios.
- Revisa las 239 imágenes del archivo de restaurantes y excluye 38 con etiquetas superpuestas, carteles como motivo principal o marcas destacadas. No se retoca ni se borra una marca de agua.
- Añade 30 imágenes externas revisadas, guardadas en el alojamiento. Se preserva procedencia en `assets/data/buzios-dining-photos.json`; no se muestran créditos ni leyendas de fotógrafos en la página. Los archivos son fotografías de los lugares indicados, no imágenes generadas.
- Las 42 fichas gastronómicas tienen al menos cuatro fotografías verificadas, sin repetir una imagen dentro de la ficha ni rellenar con fotos de otros locales.
- Preserva Rentcars y el contenido completo de alquiler; incorpora al generador los tres recorridos con mapas y las tablas prácticas de Uber/99 que estaban en el HTML fuente pero no persistían al regenerar.
- No se modifican hospedaje ni tours/experiencias.

## Verificación previa

342 comprobaciones con navegador: 57 rutas × ES/PT/EN × 1440/390; sin errores de JavaScript, desbordamiento horizontal, fotografías rotas o noindex. Búsqueda, filtro de zona y categoría probados en ambas portadas. Una sola cabecera H1 por página, canonical de idioma, navegación y footer presentes. 420 páginas generadas por los módulos espejo; destinos internos revisados.

El control histórico de congelados ya presenta 246 divergencias anteriores en la base. Se conserva exactamente su resultado antes/después, sin restaurar páginas ajenas ni cambiar el manifiesto para ocultarlas. Todos los cambios de HTML de este lote pertenecen a Búzios y están expresamente autorizados.

## Comprobación pública

Registrar el commit, estado de la publicación y las verificaciones contra el sitio real en el informe de entrega. Una compilación local no equivale a una publicación terminada.
