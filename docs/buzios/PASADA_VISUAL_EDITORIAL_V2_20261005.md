# Búzios — pasada visual/editorial V2

Fecha: 5 de octubre de 2026  
Rama: `revision/rendimiento-traducciones-81a904c`  
HEAD base: `99babe2603a8ad2579e67622866277f6b1f4e87c`

## Alcance ejecutado

- Se conservaron las 23 fichas y sus módulos editoriales. Las fichas se presentan como relato numerado, con identidad, decisiones prácticas, consejo de Ernestinho y crédito junto a la imagen aprobada. Cuando no existe imagen apta, queda un marcador editorial explícito.
- El índice de playas presenta 23 tarjetas con texto breve, etiquetas localizadas, imagen propia cuando existe y navegación a la ficha correspondiente. La imagen panorámica del encabezado se identifica como vista general de Búzios, no como una playa concreta.
- Se retiró la estatua de una foto de Armação y el letrero de Porto da Barra de la playa de Manguinhos; cada una conserva ahora solo la imagen que representa.
- Las portadas temáticas dejaron de asignar paisajes de playa por defecto. Porto da Barra se limita a “Comer y salir” y Brigitte Bardot a cultura/identidad. La entrada de Porto da Barra se describe de manera precisa en el texto alternativo.
- La matriz de alojamiento mantiene las 12 zonas originales y los 108 valores comparativos dentro de tarjetas adaptables, con lectura expandible.
- Las tarjetas temáticas del portal son más escaneables; el texto extenso permanece accesible mediante controles expandibles.
- Se corrigió el orden de carga de datos de playa para no incluir el módulo editorial completo en cada ficha.

## Inventario visual de playas

Hay 11 archivos fotográficos únicos ya aprobados y asignados. Se conservan créditos y licencias en `assets/js/buzios-photos.js`; no se descargaron ni añadieron fotografías nuevas en esta pasada.

| Playa | Archivo asignado |
|---|---|
| Geribá | `geriba.webp` |
| João Fernandes | `joao-fernandes.webp` |
| Ferradura | `ferradura-mtur.webp` |
| Ferradurinha | `ferradurinha.webp` |
| Azeda | `azeda.webp` |
| Tartaruga | `tartaruga.webp` |
| Brava | `brava.webp` |
| Forno | `forno.webp` |
| Ossos | `ossos.webp` |
| Armação | `armacao.webp` |
| Manguinhos | `manguinhos.webp` |

Marcador “Foto pendiente”: João Fernandinho, Azedinha, Canto, Rasa, Tucuns, José Gonçalves, Caravelas, Foca, Olho de Boi, Amores, Virgens y Gorda. No se rellena con imágenes repetidas o de otra playa. Esas 12 imágenes y el resto de cobertura visual del destino pertenecen a la pasada fotográfica complementaria.

## QA ejecutado

- Compilación localizada dirigida: 59 rutas Búzios × 3 idiomas = 177 documentos HTML (650 URL indexables por idioma en el build completo).
- QA de navegador: 59 rutas × ES/PT/EN × viewport 1365/390 = 354 combinaciones. Incluye errores JavaScript, imágenes locales, alt, desbordamiento, enlaces locales, título/H1/descripción/canonical/lang, orden de ficha, créditos, duplicados, las 23 tarjetas y 12 zonas/108 valores.
- La comprobación original del primer recorrido reportó 72 fallos de orden de imagen por no reconocer el marcador `div.bz2-photo-pending`. Se corrigió el selector/assertion del QA; no era un fallo de página. El resultado posterior se registra en `QA_EDITORIAL_RUNTIME.json`.
- Se guardaron capturas de escritorio y móvil de portada, hub de playas, ficha Geribá y matriz de zonas en `/tmp/buzios-editorial-shots/` para inspección visual local.
- La inspección local no puede certificar la disponibilidad del origen remoto Cloudinary; el reporte separa ese origen de las imágenes locales.

## Fuera de alcance / límites

Esta pasada no completa la cobertura fotográfica. No reemplaza las imágenes aprobadas, no reincorpora elementos descartados por derechos, no cambia `main` ni publica producción. La revisión final del Preview corresponde al commit de esta pasada.
