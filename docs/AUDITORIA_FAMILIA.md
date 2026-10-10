# Auditoría fotográfica de Familia — Ernestinho Carioca V2

**Corte:** 10 de octubre de 2026  
**Rama:** `revision/rendimiento-traducciones-81a904c`  
**HEAD:** `581d359ff5ea776e67d8119e797282f7ed738902`

## Alcance y conciliación

Se revisaron las 25 páginas HTML de Familia: portada, 21 fichas y las páginas generales Lluvia, Parques y Playas. ES, PT-BR y EN reutilizan esas rutas y los mismos medios.

Se cruzaron los dos inventarios CSV, `assets/js/bulk-photo-references.js`, las carpetas de `FOTOS/HOME/FAMILIA`, el HTML de cada ficha, `assets/css/familia.css` y el preview. La carpeta entregada contiene 120 imágenes originales en 21 subcarpetas, además de dos `desktop.ini`: 79 JPG, 23 PNG, 2 WEBP, 8 HEIC, 6 JPEG y 2 AVIF. El inventario registra 112 entradas y el JS tiene 120 referencias en 21 mapeos. No son conteos de fotos únicas: incluyen miniaturas, rutas alternativas, referencias repetidas y distintos formatos del mismo contenido.

La matriz conserva 142 filas de archivo o referencia, no 142 imágenes únicas. Las ocho referencias alternativas de BARRIOS para Bosque da Barra tampoco son ocho fotos adicionales. No se encontraron fotos de Familia que Ernesto deba aportar para completar las integraciones útiles.

## Resultado por página

| Página | Resultado |
|---|---|
| Inicio Familia | Se conservaron las 21 miniaturas originales de Ernestinho. La composición 4:3 y la correspondencia se revisaron en escritorio. |
| AquaRio | Galería existente y una toma local del túnel del tanque oceánico. Se descartaron la selfie repetida y la figura de cera dudosa. |
| Aterro do Flamengo | Se integró la toma local del sendero arbolado; la ficha ya contaba con paisaje y paseo. |
| Barra Bowling & Grill | Se conservaron las fotos pertinentes de bolos. No se añadieron más carriles vacíos. |
| BioParque | Se incorporaron el león y otro animal de recinto entre imágenes de la ficha. Las cuatro fotos de galería cargan en el preview y mantienen su proporción 4:3. |
| Bosque da Barra | De las 17 referencias del mapeo, varias son rutas alternativas y miniaturas. Se reemplazó una selfie repetida por capibaras y se añadió el jacaré después de la sección de experiencia. |
| Carnaval Experience | La tercera foto muestra el espacio dedicado a Zeca Pagodinho, confirmado por Ernesto. La fuente HEIC se reemplazó con el JPEG local y quedó después del contenido de experiencia. |
| Escape 60 Copacabana | Se conservó la cobertura útil y se descartó el póster con texto como imagen editorial. |
| Feira de São Cristóvão | Se añadió la escultura del acordeonista y el letrero. El archivo de origen tenía bytes JPEG con extensión `.webp`; el preview utiliza el derivado `.jpg`. |
| HotZone BarraShopping | Se conservaron las vistas actuales; las imágenes adicionales no aportaban una escena distinta. |
| Ilha Fiscal | Se retiraron las dos fuentes Cloudinary rotas. La portada usa `ILHAF2.jpg` y la galería una segunda vista local distinta. |
| Jardim Botânico | Se reemplazaron tres fuentes Cloudinary rotas por la pérgola, el jardín con el Morro Dois Irmãos y las palmeras imperiales de la carpeta local. |
| Jardines del Palácio do Catete | Se mantuvieron las fotos correctas de los jardines y del palacio; las vistas interiores no se presentan como jardines. |
| Lagoa Rodrigo de Freitas | Se añadieron las tomas de carritos y paseo familiar junto al contenido de actividades. |
| Lluvia | Página general sin carpeta propia; reutiliza enlaces a fichas ilustradas. No necesita nuevas fotos. |
| Maracanã Tour | Se añadieron la vista aérea y la exposición histórica AVIF. |
| Meta Kart Indoor | Se añadió el grupo con trajes de karting junto al contenido de instrucciones y equipamiento. |
| Parque da Catacumba | Se conservaron las tres imágenes actuales; los extras repetían selfies o señalización. |
| Parque Lage | Las dos galerías sustituyen HEIC por `PARQL2.jpg` y `PARQLA1.jpg`. Las otras cinco fotos HEIC siguen contabilizadas y sin uso por repetición o poca utilidad editorial. |
| Parques | Página general sin carpeta propia; reutiliza fichas ilustradas. |
| Pista Cláudio Coutinho | Se conservaron las vistas actuales, que cargan en JPG/WEBP. |
| Planetario | Se mantienen las imágenes que cubren el planetario y su experiencia; los extras repetían el retrato de astronauta. |
| Playas | Página general sin carpeta propia; reutiliza fichas ilustradas. |
| Sítio Roberto Burle Marx | Se conservaron las tres fotos disponibles de jardines y arquitectura. |
| Yup Star | Se mantienen portada y fotos interiores de la rueda y las vistas. |

## Correcciones técnicas aplicadas

- Las galerías ya no fuerzan alturas fijas de 18/27 rem. Las imágenes conservan su proporción natural dentro de una columna de hasta 56 rem y una altura máxima de 48 rem. Esto elimina el recorte panorámico que afectaba a BioParque. No se aplica `contain` de forma global.
- Las tarjetas conservan sus miniaturas originales y el diseño 4:3 con `cover`. Los héroes conservan `cover`; no se modificó la estructura editorial.
- Los nombres y espacios de las rutas locales se codifican por segmento. Las fotos añadidas usan carga diferida, dimensiones y texto alternativo. Los ALT de las imágenes reemplazadas también se preservan al cambiar idioma.
- HEIC no se sirve directamente en las fichas. Los tres usos confirmados tienen derivados JPEG. Feira también usa JPEG con extensión coherente.
- Las 25 páginas de Familia cargan las versiones actualizadas de CSS; las 21 fichas usan la versión actualizada del módulo de fotos. El control `FROZEN_PAGES_20260930.json` conserva el hash vigente de cada página protegida.

## Verificación y límites

Se comprobó en el preview de escritorio la carga y el contenido de BioParque, Bosque da Barra, Carnaval Experience, Ilha Fiscal, Jardim Botânico y Parque Lage. En BioParque las fotos interiores se ven completas, con proporción natural. Las fuentes rotas detectadas en Carnaval, Ilha Fiscal, Jardim Botânico y Parque Lage ya no son las que se muestran en las fichas.

El navegador disponible no permite emular un viewport móvil. Por eso, los puntos focales de las miniaturas y héroes que usan `cover` conservan una verificación móvil pendiente. Las galerías adaptables sí muestran la imagen completa sin recorte fijo. El detalle está en `PLAN_ENCUADRES_FAMILIA.md` y en la columna de estado de la matriz.

El preview probado es [Familia en Hostinger](https://dimgrey-hyena-256947.hostingersite.com/familia/). No se modificó producción, otras secciones, rutas ni textos editoriales aprobados.
