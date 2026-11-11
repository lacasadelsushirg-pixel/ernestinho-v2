# Tanda A · revisión de las diez fichas · 11 de noviembre

Base de trabajo: 54b6bc90, descendiente de 01b90130 (PR #24). Producción: 9426c42. 10 fichas revisadas, ocho con cambios preparados en la rama acumulada, dos con incidencias que impiden reactivar el diccionario, ninguna cerrada en cuatro idiomas. Se conserva el piloto compartido de 43 rutas; nada publicado.

| Ficha | Estado y siguiente acción |
|---|---|
| Don Camillo | FR completo probado en vista aislada. Cotejar rótulos PT/EN, comparar capturas de la base y verificar incremental antes de sumar al piloto. |
| Bar do Omar · Gastronomía | Recuperado PT/EN en el corte anterior. Completar rótulos, FR y pruebas. Vida nocturna sigue separada. |
| Mee | PT/EN activados y dos consejos traducidos. Aún quedan rótulos breves, incluidos alt y pies de foto; falta FR. |
| OCYÁ Ilha | PT/EN activados; se conservaron suplementos separados del selector posicional. Revisar rótulos, el selector móvil repetido que ya existía y la distinción Ilha Primeira/Ilha Gigóia; falta FR. |
| Pilograma Prime Grill | Bloqueado para reactivación: el diccionario describe un local sin operación confirmada y el ES narra una visita reciente en funcionamiento. Solo 3 de 19 entradas por idioma son idénticas al snapshot de septiembre; eso no valida su contenido. Traducir de nuevo los bloques vigentes sin copiar afirmaciones obsoletas. |
| Temperarte Posto 6 | PT/EN activados; dos consejos traducidos. Revisar suplementos, formato de ficha práctica y vigencia sin mezclar sucursales. FR pendiente. |
| Temperarte Bolívar | PT/EN activados; dos consejos traducidos. El ES contiene tanto horario atribuido a Instagram como nota sin validación oficial. Conservar y documentar la discrepancia. FR pendiente. |
| Haru | Bloqueado para reactivación: el diccionario PT trae rótulos de la ficha práctica con etiquetas strong mal cerradas o con el valor dentro del rótulo. Reconstruir las entradas a partir del ES conservando la estructura, comprobar horarios y completar FR. |
| Bar Urca | PT/EN activados; quedan rótulos y pies de foto por cotejar, FR pendiente. |
| Bar da Frente | PT/EN activados y dos consejos traducidos. Revisar rótulos, distinguir sucursales y completar FR. |

Se cotejó el diccionario de 391d302e (25 de septiembre) con el actual: 19/19 valores por idioma idénticos en Mee, OCYÁ Ilha, ambos Temperarte, Haru y Bar Urca; 10/19 en Bar da Frente. Se conservaron las entradas vigentes. El arranque localizado de las seis candidatas se verificó con el compilador real. Las doce versiones PT/EN pasaron de 86 bloques largos idénticos al ES a cero. El auditor multilingüe reportó las mismas 96 incidencias de destinos ausentes en la compilación selectiva, cero nuevas. Paridad de fotos, iframes, enlaces principales, canonical y hreflang; texto principal ES idéntico en los seis casos. Guard aprobado; el verificador histórico conserva 246 diferencias. No se probó un incremental integral en esta ejecución.

[Capturas antes/después](TANDA10_A_MEE_OCYA_1440_390.jpg), PT-BR de Mee y OCYÁ Ilha, a 1440/390 px. Se bloquearon solicitudes externas para esta comparación; la presencia de las URL de medios se comprobó por separado. Persisten rótulos breves y el selector repetido de OCYÁ Ilha, por lo que estas fichas no se contabilizan como validadas.

[Cuatro inspecciones GSC](GSC_TANDA10_A_SEGUIMIENTO_2026-11-11.json): Mee PT, OCYÁ Ilha PT, Pilograma PT y Haru EN figuran indexadas. Es el estado conocido por Google, no una validación del candidato. Hostinger mantiene 3612 entradas y 3588 URL únicas que coinciden exactamente con el conjunto indexable. El agregado de Páginas sigue pendiente.

Próximo corte: completar Bar do Omar FR, cotejar rótulos de Don Camillo y Mee y mantener la tanda A abierta hasta cerrar los diez estados. No reactivar Haru ni Pilograma sin las correcciones indicadas. Comprobar HEAD y ramas concurrentes antes de editar. Mantener el informe único al cierre.
