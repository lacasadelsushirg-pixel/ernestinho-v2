# Petrópolis · Transportes · bitácora de desarrollo directo
Fecha: 2026-11-09. Proyecto Ernestinho Carioca.
Repositorio: `lacasadelsushirg-pixel/ernestinho-v2`.
Rama de trabajo: `revision/rendimiento-traducciones-81a904c`.
Referencia de diseño: Río de Janeiro, preservando las páginas aprobadas y el sistema de protección de publicación.

## Qué quedó guardado en la rama
- `assets/js/translations/destinos/petropolis-transporte-local.js`: ficha y mapa de ambos sentidos para líneas urbanas 100, 150, 649, 700 y 611, más nuevos corredores 602 (Corrêas ↔ Vale das Videiras), 605 (Itaipava ↔ Vale), 610 (Corrêas ↔ Araras) y 617 (Itaipava ↔ Araras). Tarifa de referencia R$5,90, fechas del cuadro y notas de frecuencia. Vans y microbuses privados se distinguen de líneas municipales y de autobuses intermunicipales. Se documentó cobertura de Uber y 99 y Uber Entre Cidades.
- `assets/js/translations/destinos/petropolis-transporte-modalidades.js`: página **Moverse entre distritos** ampliada con enlaces reales por corredor, transbordos, sentido, últimas salidas de referencia y advertencias para visitantes.
- `assets/js/translations/destinos/petropolis-practico.js`: tarjetas de acceso rápido renovadas, con números de línea.
- `scripts/petropolis_practical_pages.mjs`: fichas visuales de recorridos, enlaces de mapas para ida y regreso, tres tarjetas de elección rápida y estilos responsive. Reutiliza `styles('transportes/uber')` como base del ADN de Río.

## Código confirmado en GitHub
- `d88894627c29807acf2c643cfaf9cd1f63f446e1` y `570c735bc9ad09086e5cb65c812f635dd25a4ad2`: primer bloque (líneas y fichas).
- `2cba7e9166557513551db71cda238afa4ae34872`, `841819cce8857a0e5be005e446c6349b86a61f07`, `840a6aa82e5d1a4b42b9732ba4c98ee43049f021`: expansión del bloque (corredores, Uber/99, responsive).
- `837d13a5e7237090fe3156b8932b29ed3d3a4984`: corrección de sintaxis.
- `7ad247895eec543d948c48d2759f1c885ff6f688` y `d4e01da47425b500d0d7124d2bece1789c6af01c`: completar página de ônibus y tarjetas de portada.

## Fuente de itinerarios consultada
- Cittamobi, cuadros de noviembre de 2026 de 602, 605, 610, 617 y 700.
- Referencia tarifaria Otimiza.pro con R$ 5,90 y consulta 18 de octubre de 2026. Reconfirmar tarifa.
- Uber oficial Petrópolis: https://www.uber.com/global/pt-br/r/cities/petropolis-rj-br/
- 99 oficial, ciudades atendidas RJ: https://99app.com/cidades/rj/
- La disponibilidad del conductor, los horarios y la tarifa no deben presentarse como datos en vivo.

## Verificación realizada
- Validación de sintaxis JavaScript de los módulos modificados.
- Ejecución de simulación de `petropolisTransportPage` con los datos reales de la rama en ES/PT/EN: 12 rendereos (ônibus, vans, uber, entre-distritos). Ninguna ancla interna ausente ni texto "undefined" en el HTML generado.
- La página de ônibus incorpora 9 fichas de conexiones y 3 tarjetas para elegir ruta; Vans 8 fichas de rutas y 3 tarjetas; Uber y Entre distritos 3 tarjetas cada una.
- **NO se ejecutó el build completo `npm run build` ni se tomaron capturas 1440/390; esto sigue pendiente.**
- **NO se publicó en Hostinger**: el sitio tiene una conexión Git de preparación a la rama `release/pt-en-reviewed-20261102`, diferente de la rama editorial usada aquí. No ejecutar despliegue destructivo ni saltar el gate de `docs/PUBLISHING_PROTECTION.md`.

## Próxima etapa concreta
1. Completar pruebas de compilación y revisión visual de las cuatro páginas de Petrópolis en móvil y escritorio con los estilos reales.
2. Validar que todos los enlaces a mapas y fuentes funcionen, y volver a consultar tarifas y salidas antes de publicación.
3. Publicar por la ruta aprobada en Hostinger sin alterar el registro de 586 páginas protegidas ni las 246 diferencias históricas sin aprobar.
4. Pasar a `Barrios` y `Arte y Cultura` de Petrópolis: más historia propia, sitios y fichas completas, fotos auténticas y espejo visual de Río.

Regla operativa: trabajar directamente sobre la rama conocida, documentar commits, no depender de sesiones Work, no anunciar publicación sin evidencia en Hostinger.
