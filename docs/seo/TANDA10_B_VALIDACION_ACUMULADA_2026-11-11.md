# Tanda B · validación acumulada · 11 de noviembre de 2026

Candidato `de21962`, descendiente de `01b90130` (PR #24). Hostinger sirve `9426c42`. El [informe de diez estados](TANDA10_B_ESTADO_2026-11-11.md) recoge las fichas y su historial editorial.

## Pruebas

- Las 40 variantes de las diez fichas pasaron juntas el auditor ES/PT-BR/EN/FR con HTML del incremental. Se verificaron títulos, descripciones, H1, estructura, enlaces editoriales, medios, canonical, noindex francés y alternates. Veinte cambios de idioma PT → FR → EN superados, diez a 1440 px y diez a 390 px.
- [Antes/después](TANDA10_B_COMPARATIVA_1440_390.jpg) de Garota y Frontera en PT-BR, con HTML anterior descargado de Hostinger. Recursos externos bloqueados para reproducibilidad; la captura usa los recursos locales del candidato.
- Descarga HTTP 200 del sitemap y del manifiesto de Hostinger: 3612 documentos en manifiesto, 3588 URL únicas en sitemap, conjunto exacto de rutas indexables y cero FR.
- El modo incremental seleccionó 879 de 3612 documentos con el manifiesto original de Hostinger y su portada en una carpeta aislada. Procesó el renderizado y mantuvo los conjuntos exactos de 3612 rutas y 3588 indexables. Se cotejaron canonical y alternates de los 877 HTML indexables disponibles con el sitemap público, sin diferencias. La fase final del generador se detuvo en un alternate a /pt/ porque la semilla local carece de ese HTML y del resto del árbol publicado. Esto no prueba una regresión en Hostinger. Queda pendiente la prueba integral con el árbol publicado completo.
- Guard PASS (586 páginas, diez recursos). El auditor histórico mantiene las 246 diferencias preexistentes. Piloto oficial de 43 rutas, sin cambios. Sin publicación.

## Comercial e indexación

- [Frontera oficial](https://frontera.com.br/ipanema/) publica almuerzo a R$64,90 o R$84,90 y cena a R$74,90 o R$84,90 según día, frente al intervalo R$74,90–79,90 del original. Confirmada la discrepancia. Conservar los datos aprobados hasta revisión editorial.
- [La Bicyclette oficial](https://www.labicyclette.com.br/nossas-lojas) confirma la dirección de Jardim Botânico. [FM Grande Rio](https://fmgranderio.com.br/lugar/la-bicyclette-rio-de-janeiro) indica lunes cerrado. Sigue pendiente confirmación del horario del lunes.
- Cais do Oriente: [Veja Rio](https://vejario.abril.com.br/estabelecimento/restaurante-cais-do-oriente-2/) indica número 20 y [Waze](https://www.waze.com/live-map/directions/cais-do-oriente-r.-visconde-de-itaborai-8-rio-de-janeiro?to=place.w.207619619.2076327262.5724166) muestra 8. Pendiente confirmar el número con el local.
- [Inspección de Irajá Redux EN](https://search.google.com/search-console/inspect?resource_id=https://www.ernestinhocarioca.com.br/&id=3P3Yvfo_Ngr4O-08xz9h6g&utm_medium=link&utm_source=api): descubierta, actualmente sin indexar. Google conoce sitemap y enlaces desde ES/PT. La inspección no informa estado de descarga; no hay error técnico confirmado en esa URL. Pendiente informe agregado de Páginas.

## Tanda C · triaje iniciado

Orden provisional de fichas con alertas, excluyendo las preparadas en A/B, por impresiones observadas en la consulta web final de Gastronomía agrupada por página (12 oct–8 nov; 457 filas). Volver a comprobar ramas concurrentes y cotejar el sentido de los diccionarios antes de editarlos.

| Ruta de Gastronomía | Impresiones observadas | Estado |
|---|---:|---|
| carretao-siqueira | 958 | Inspección inicial: ambos commits históricos contienen el HTML (23.859 bytes cada uno); falta cotejar cada entrada con ES vigente. |
| sushi-leblon | 519 | Pendiente |
| zaza-bistro-tropical | 480 | Pendiente |
| aprazivel | 281 | Pendiente |
| colombo-do-forte | 225 | Pendiente |
| maska | 197 | Pendiente |
| oteque | 196 | Pendiente |
| cipriani | 190 | Pendiente |
| cafe-lamas | 167 | Pendiente |
| churrasqueira-rio | 160 | Pendiente |

Retomar C desde Carretão Siqueira. En paralelo al trabajo editorial accesible, B requiere semilla íntegra, rótulos breves y resolución de las discrepancias comerciales arriba registradas.
