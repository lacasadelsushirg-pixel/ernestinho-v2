# Búzios: primer lote de paridad visual con Río — 5 de noviembre de 2026

Base: `a49a336fb6368b442dfb4413ad9ac179f6e053c6`, rama `fix/buzios-espejo-rio-20261105`.

## Alcance

- Corregir el desbordamiento del menú Búzios 360° y mantenerlo en páginas generales, playas y fichas de restaurantes.
- Restaurar el componente corporativo real de Río, adaptando su llamada a Búzios en ES/PT-BR/EN.
- Sustituir la galería anterior de Fotografía por las tarjetas reales de `/fotografia/`: mismo HTML de componentes, CSS, hero y distribución responsive. Doce lugares con consejos locales y mapas.
- Conservar el resto del contenido publicado, las correcciones SEO recientes, los perfiles de restaurantes y las páginas de Río y Carioc-IA.
- Actualizar únicamente las referencias de scripts en las otras 432 páginas localizadas. No reconstruir sus cuerpos ni metadatos. Las tres páginas de fotografía se renderizan de forma selectiva.

## Fotografía utilizada

Todos los originales están en `https://mediumturquoise-stinkbug-270478.hostingersite.com/FOTOS/HOME/BUZIOS/`. La página de destino es `/destinos/buzios/fotografias/` y sus versiones PT/EN. Revisión visual de las doce fotografías: corresponden al lugar; sin texto publicitario sobreimpreso. Las dimensiones se conservan y las miniaturas utilizan `object-fit: cover`, como Río.

| Lugar | Original relativo al directorio indicado | Resolución | Tamaño original | Estado |
|---|---|---|---|---|
| Porto da Barra | `barrios/porto-da-barra.jpg` | 1000 × 667 | 338,344 bytes | Adecuada para tarjeta; conservar original |
| Orla Bardot | `PLAYAS/orla bardot 02.jpg` | 1600 × 900 | 723,293 bytes | Adecuada para tarjeta; conservar original |
| Escultura de Brigitte Bardot | `FOTOGRAFIAS/ESCULTURA BARDOT.jpg` | 800 × 600 | 105,882 bytes | Adecuada para tarjeta; conservar original |
| Três Pescadores | `FOTOGRAFIAS/Escultura-dos-Tres-PescadoreS.jpg` | 1600 × 1067 | 446,324 bytes | Adecuada para tarjeta; conservar original |
| Estátua de Juscelino Kubitschek | `FOTOGRAFIAS/Estatua de Juscelino Kubitschek.jpg` | 1100 × 1467 | 438,663 bytes | Adecuada para tarjeta; conservar original |
| Igreja de Sant’Anna e Praia dos Ossos | `FOTOGRAFIAS/Igreja-de-SantAnna-Praia-dos-Ossos.jpg` | 1279 × 715 | 151,032 bytes | Adecuada para tarjeta; conservar original |
| Garota dos Ossos | `FOTOGRAFIAS/ESTATUA GAROTA DOS OSSOS.jpg` | 1400 × 1050 | 367,932 bytes | Adecuada para tarjeta; conservar original |
| Praia de Geribá | `PLAYAS/GERIBÁ/praia-de-geriba.jpg` | 1000 × 667 | 286,761 bytes | Adecuada para tarjeta; conservar original |
| Praia da Ferradurinha | `PLAYAS/FERRADURINHA/ferradurinha.jpg` | 1600 × 1200 | 1,590,808 bytes | Adecuada para tarjeta; conservar original |
| Praia da Ferradura | `PLAYAS/FERRADURA/FERRADURA PORT.jpg` | 1600 × 1067 | 905,632 bytes | Adecuada para tarjeta; conservar original |
| Praia de Manguinhos | `PLAYAS/MANGUINHOS/galeria-manguinhos-1.jpg` | 1240 × 821 | 302,292 bytes | Adecuada para tarjeta; conservar original |
| Ponta do Pai Vítorio | `FOTOGRAFIAS/Ponta-do-Pai-Vitorio.jpg` | 800 × 600 | 499,540 bytes | Adecuada para tarjeta; conservar original |

## Validación y protección

La validación compara Río y Búzios a 1440 y 390 px y comprueba ES/PT-BR/EN, imágenes, desbordamiento, un solo menú y un solo pie corporativo. El script `verify_buzios_rio_parity.mjs` conserva resultados JSON y capturas fuera del sitio; el modo `EC_QA_SMOKE=1` comprueba la estructura común sin descargar imágenes.

`check_frozen_pages.py` detecta cambios anteriores presentes en la propia base del proyecto. Esta tarea no modifica los archivos originales de Río, sus manifiestos, ni Carioc-IA. No se corrigen ni revierten esos cambios históricos.

La publicación emplea un plan explícito, respaldo de los bytes previos, comparación SHA-256 antes de cada sustitución, comprobación posterior y grupos independientes. Los recursos se suben antes de las páginas. El script detiene la publicación ante cambios simultáneos. No hay compilación global, merge ni despliegue de Vercel. El sitemap conserva las URL existentes.

## Pendientes del encargo integral

Este lote no completa las trece secciones. Quedan la adaptación de las plantillas de Guía práctica y sus artículos (incluida la equivalencia de vacunas), Consejos con todos los temas aplicables y los ocho artículos prioritarios, y la comparación/corrección completa de las demás secciones contra Río. No se declara paridad visual de esas secciones por haber corregido el encabezado.

No falta una fotografía para estas doce tarjetas. Las galerías o puntos adicionales requieren identificar primero el material ya inventariado; no se solicitan ni descargan fotografías nuevas.

## Cierre de publicación

444 archivos comprobados en Hostinger: nueve recursos compartidos de Búzios, tres páginas de Fotografía reconstruidas y 432 páginas con cambio exclusivo de referencias de scripts. Respaldo previo: 441 archivos existentes. Validación común: 84 casos; validación visual y páginas de muestra: 32 casos; Fotografía en producción: seis casos, todos correctos. El repositorio conserva esta implementación en una rama independiente, sin merge ni cambios en Río o Carioc-IA.
