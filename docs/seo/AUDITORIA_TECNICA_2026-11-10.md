# Auditoría técnica y de traducciones — 10 de noviembre de 2026

## Publicación verificada en Hostinger

El [sitemap público](https://www.ernestinhocarioca.com.br/sitemap.xml) pasó de 3.612 a **3.588 URL**. El manifiesto público confirma el commit [9426c42](https://github.com/lacasadelsushirg-pixel/ernestinho-v2/commit/9426c42fc0150bdce5fbfee060396da9de518ac7), 3.612 documentos y 1.196 rutas indexables por idioma. Las 24 URL retiradas del sitemap eran ocho rutas antiguas de Consejos de Búzios en tres idiomas, presentes en el árbol servido y ausentes del manifiesto vigente. El conjunto público posterior coincide exactamente con las rutas indexables del manifiesto.

El compilador siembra el árbol de publicación con los archivos de `public_html`. El sitemap anterior recorría todos los HTML de ese árbol, incluidos los heredados de compilaciones anteriores. El generador ahora exige la lista de rutas indexables del manifiesto y comprueba que cada ruta exista, sea indexable y tenga su canonical correcto. Los alternates deben apuntar a rutas de ese conjunto. El HTML antiguo puede seguir servido durante la revisión de equivalencias y enlaces. Se comprobó el HTTP 200 de `/destinos/buzios/consejos/equipaje/` después de la publicación.

La prueba aislada incorporó un HTML heredado real. Los 3.614 archivos HTML de la semilla y la salida de esa prueba, incluidos el token y ese HTML heredado, fueron idénticos byte por byte. El despliegue real de Hostinger tomó 51,2 segundos y regeneró cero HTML. Hubo un error inicial de revisión Git incompleta en los dos últimos despliegues examinados. La ampliación del historial local permitió resolver la comparación. El log no muestra uso de GitHub Compare en esos dos casos.

## Recuperación histórica y contenido

La base remota inicial fue `ff10f765`, con la integración histórica `5358bee`. El PR 23 estaba en borrador sobre esa base. Su cambio de `site.js` reproducía un bloqueo de la protección de contenido antes de compilar. Se conservó el archivo protegido y se implementó la detección en el compilador. Al retirar un módulo en una prueba aislada, el compilador identificó el archivo y falló en ES, PT y EN antes de crear el manifiesto final.

Se cruzaron diccionarios con claves editoriales en los dos commits de septiembre indicados, en `12ecf180` del 12 de octubre y en `767cb94b` del 16 de octubre. El recuento se hace por entrada e idioma frente a `ff10f765`. Las filas de snapshots distintos pueden corresponder a la misma entrada. Los módulos estructurados, los textos incrustados y los modelos regionales no constituyen diccionarios homogéneos y requieren verificación separada. La evidencia de octubre se obtuvo del historial Git y no representa una copia del HTML que Vercel o Google sirvieron en cada fecha.

| Snapshot | Módulos de diccionario | Conservadas | Trasladadas exactas | Trasladadas con cambio | Valor modificado | Clave ausente |
|---|---:|---:|---:|---:|---:|---:|
| 42d03024 · 26 sep | 18 | 3.198 | 56 | 64 | 274 | 40 |
| 8570793a · 26 sep | 18 | 3.401 | 58 | 64 | 363 | 40 |
| 12ecf180 · 12 oct | 88 | 29.211 | 0 | 0 | 91 | 0 |
| 767cb94b · 16 oct | 154 | 36.126 | 0 | 0 | 0 | 0 |

Las 40 entradas ausentes en ambos snapshots de septiembre corresponden al mismo grupo. En 38 no se encontró la clave ES exacta en el HTML indexable actual. La mayoría se relaciona con la versión anterior del BRT, cuya guía fue reescrita. Las dos coincidencias activas son las variantes PT y EN del emoji de bicicleta. Entre los 91 cambios de valor de octubre hay correcciones de mezcla de idiomas que conviene conservar. La recuperación comprobada en Transportes usa los dos rótulos PT de `01473cc1`, con el texto fuente ES vigente.

| Página | Hallazgo | Corrección o alcance |
|---|---|---|
| Búzios · Viajar solo | Los 16 artículos estaban presentes. La prosa PT/EN publicada medía 3.522/3.390 caracteres frente a 11.245 ES en la comparación de párrafos. | 15 bloques PT/EN ampliados en el modelo, incluidos hospedaje, trayectos, primera noche, pertenencias y regreso. |
| Búzios · Accesibilidad | Los 17 artículos estaban presentes. La prosa PT/EN publicada medía 5.635/5.692 frente a 10.957 ES. | 14 bloques PT/EN ampliados con verificaciones de ruta, medidas, embarque y comunicación. |
| Cristo + City Tour | Cuatro secciones en las tres versiones. El cuerpo principal, paradas, almuerzo y avisos aparecen localizados en PT y EN. | Conservado tras la revisión. |
| Feira Nocturna de Copacabana | El renderizador propio arrancaba en ES, aunque conservaba los textos PT/EN. | Arranque por URL, H1 y textos alternativos de fotos localizados. |
| Carretão Ipanema | Dos renderizadores arrancaban en ES. El mapa de párrafos se desplazaba al incorporar la ficha práctica y los textos complementarios. | Reactivado el texto editorial histórico con su orden original. Pendientes textos breves y alt. |
| Travessa Ipanema PT y Biblioteca Parque Estadual EN | HTTP 200, canonical propio, seis encabezados de sección y cuerpo localizado. Los nombres propios y direcciones compartidos son esperables. | Sin cambio editorial basado en la caída de impresiones. Hace falta contrastar impresiones por consulta y el estado actual en Google. |

Las plantillas de Guaratiba, Vargens y Sepetiba comparten estructura, pero los textos distinguen Pedra do Telégrafo, Vargem Grande y Vargem Pequena, y el coste logístico de ir a Sepetiba. La revisión se limitó a la primera pasada de HTML. Quedan por contrastar accesos y servicios concretos con fuentes locales antes de editar.

## Rastreo e indexación

Se verificó HTTP sobre las 458 URL del export histórico, más 28 URL de muestra. Los cuatro tiempos de espera iniciales dieron 200 al reintentar. La muestra de 486 URL dio 462 HTTP 200 y 24 HTTP 301. Estas comprobaciones HTTP y el rendimiento de Search Console se registran por separado.

| Motivo histórico de Search Console | URL | HTTP 200 observado | HTTP 301 observado |
|---|---:|---:|---:|
| Descubierta, actualmente sin indexar | 412 | 412 | 0 |
| No encontrada | 26 | 11 | 15 |
| Rastreada, actualmente sin indexar | 9 | 9 | 0 |
| Página con redirección | 9 | 0 | 9 |
| Google eligió otra canónica | 2 | 2 | 0 |

El export se descargó el 2 de noviembre. Su última fila de la serie de cobertura, del 22 de octubre, muestra 2.064 indexadas y 458 excluidas. Una URL de ese conjunto tuvo impresiones en la primera ventana analizada, ninguna en la segunda y 15 en la tercera. Las impresiones no reemplazan un estado de Inspección de URL. La sesión oficial de Google en Work estaba cerrada y OpenSEO expone rendimiento, por lo que siguen pendientes los totales actuales y las exclusiones nuevas. No se enviaron solicitudes de indexación.

`robots.txt` permite el rastreo y declara el sitemap HTTPS con www. En las comprobaciones puntuales, HTTP redirigió a HTTPS y el dominio sin www también sirvió su portada por HTTPS con código 200. Aquário e Ipanema dieron 200 con dos cadenas de agente de usuario. La cadena declarada Googlebot no verifica el comportamiento del rastreador autenticado de Google. La ruta inexistente de control devolvió 404. Algunos tiempos de primera respuesta superaron cinco segundos desde el entorno de auditoría. Quedan por correlacionar con logs de origen, caché y mediciones repetidas. El mayor HTML local midió 266.324 bytes. El sitemap no contiene `lastmod` porque la fecha de compilación no refleja la última modificación editorial de cada página.

## Compilación del PR 24

La referencia produjo 3.612 HTML. La simulación posterior regeneró 702 HTML, preservó el conjunto de rutas y mantuvo 3.588 URL en el sitemap. Los HTML se auditaron en los tres idiomas, incluyendo título, descripción, encabezados, prosa, controles, textos alternativos, canonical y alternates. Se incluyeron capturas de una muestra de las cuatro fichas con cambios visibles a 1440 y 390 px. Las capturas son de una vista local y los recursos externos fuera del caché de compilación pueden faltar en ellas.

El conteo de páginas con tres o más bloques largos idénticos al español pasó de **374 a 370**. Persisten 330 en Gastronomía, 28 en Compras y 12 en Destinos. La coincidencia literal es una señal para revisión, y no detecta toda mezcla de idiomas. El indicador de prosa localizada por debajo del 65 % del español pasó de 55 a 51, sin usar la longitud como objetivo editorial. El inventario de 3.612 páginas no mostró discrepancias entre canonical, hreflang, sitemap, idioma HTML y la lista de URL indexables.

El auditor de metadatos y recursos emitió 996 alertas distribuidas en 603 rutas del candidato. Son 348 referencias Open Graph sin imagen y 648 ocurrencias de fotografías ausentes en el árbol local que el sitio carga desde `/FOTOS/` de Hostinger. La referencia y el candidato tienen el mismo conjunto de 990 pares distintos de ruta y alerta. Una muestra de ocho imágenes de destinos devolvió 200 con tipo de imagen. Esas ocurrencias requieren confirmación remota por imagen antes de tratarlas como archivos rotos. El auditor no detectó enlaces internos `href` a archivos faltantes en el árbol local.

El PR 24 también prepara un rechazo explícito de resultados incompletos de GitHub Compare. La API limita a 300 los archivos devueltos. Si la comparación no es un avance lineal o alcanza ese límite, la compilación se detiene para evitar publicar HTML obsoleto. Falta reproducir el fallback API con credenciales y entorno de Hostinger. Los diccionarios de Transportes y Compras se invalidan por sección, y Búzios conserva una invalidación amplia cuando cambia un modelo compartido.

## Evidencia y continuación

- [Informe de rendimiento](RENDIMIENTO_GSC_2026-11-10.md)
- [Inventario de traducciones](INVENTARIO_TRADUCCIONES_2026-11-10.csv)
- [Inventario de indexación](INVENTARIO_INDEXACION_2026-11-10.csv)
- [Cotejo histórico de traducciones](HISTORICO_TRADUCCIONES_2026-11-10.csv)
- [Capturas de Búzios, 1440 px](evidencias-2026-11-10/buzios-1440.jpg) y [390 px](evidencias-2026-11-10/buzios-390.jpg)
- [Capturas de Río, 1440 px](evidencias-2026-11-10/rio-1440.jpg) y [390 px](evidencias-2026-11-10/rio-390.jpg)
- [Registro de correcciones](REGISTRO_CORRECCIONES_2026-11-10.md)

La siguiente revisión editorial debe comprobar la correspondencia de los diccionarios posicionales en las 330 páginas de Gastronomía y distinguir las traducciones activables de los párrafos nuevos sin traducción. Cada familia debe entrar en producción en lotes validados. Para actualizar el estado de Google se necesita el informe de Páginas o Inspección de URL de la propiedad.
