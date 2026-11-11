# Tanda A · diez fichas preparadas para revisión · 11 de noviembre

Base del PR #24: 01b90130. Producción: 9426c42. Punto de partida aislado: ca15cd9f. Diez de diez tienen textos FR completos y pasan la auditoría de cuatro idiomas en una vista privada común. El lote queda preparado, no publicado ni cerrado como validación de producción. El piloto compartido sigue en 43 rutas.

| Ficha | Resultado | Pendiente antes de aprobar |
|---|---|---|
| Don Camillo | Cuatro idiomas verificados en vista aislada | Cierre editorial y prueba sobre semilla íntegra |
| Bar do Omar · Gastronomía | Cuatro idiomas verificados en vista aislada | Cierre editorial y semilla íntegra; no se toca Vida nocturna |
| MEE | Cuatro idiomas verificados en vista aislada | Prueba sobre semilla íntegra |
| OCYÁ Ilha | Cuatro idiomas verificados en vista aislada | Selector PT repetido y referencias Ilha Primeira/Gigóia |
| Pilograma Prime Grill | PT/EN rehechos desde ES; FR íntegro, 34 claves. Cuatro idiomas verificados | Confirmar datos comerciales y probar semilla íntegra |
| Temperarte Posto 6 | Cuatro idiomas verificados en vista aislada | Fuente y horario a revisar |
| Temperarte Bolívar | Cuatro idiomas verificados en vista aislada | Fuente y horario a revisar |
| Haru | Cuatro idiomas verificados en vista aislada | Cierre editorial y semilla íntegra |
| Bar Urca | Cuatro idiomas verificados en vista aislada | Semilla íntegra |
| Bar da Frente | Cuatro idiomas verificados estructuralmente | Dos rótulos EN pendientes, revisión de sucursal y semilla íntegra |

Pilograma: se cotejó el diccionario de septiembre en el primer corte. Solo tres de 19 entradas por idioma coincidían con el vigente; el texto posicional anterior no se reutilizó porque contradice la visita reciente en español. Se añadieron 18 entradas PT y 18 EN alineadas con el ES actual. Se conservan el relato de octubre, R$26 como referencia histórica de esa comida y la falta de confirmación actual de horarios y carta. El HTML fuente y el diccionario incrustado anterior se conservan. Pasaron el auditor estricto (cero bloques largos idénticos al español), la comparación de medios/enlaces/canonical/hreflang y la navegación PT → FR → EN a 1440/390. [Capturas antes/después y FR](TANDA10_A_PILOGRAMA_1440_390.jpg) con recursos externos bloqueados.

## Prueba incremental

Se ejecutó el generador sin --full, en checkout aislado, con revisión de código local 89a005d1 y semilla en public_html independiente. La semilla contiene el manifiesto público con sourceCommit fijado a ca15cd9f para probar solo el último corte, metadatos HTML de prueba derivados del sitemap público y los tres HTML reales de Pilograma anteriores al cambio. Los HTML sintéticos no representan el contenido completo servido por Hostinger. El generador seleccionó 153 de 3612 documentos y el sitemap resultante contiene exactamente las mismas 3588 URL y alternates que Hostinger; el orden del XML cambió. La portada de semilla quedó idéntica. Sobre la salida, el auditor FR verificó conjuntamente las diez fichas realmente regeneradas. Guard PASS (586 páginas, diez recursos); 246 diferencias históricas sin cambios de contenido protegido. Falta la prueba de toda la rama acumulada con la semilla íntegra real del entorno de publicación; no publicar con esta fixture.

[Search Console](GSC_PILOGRAMA_2026-11-01_09.json), Web final, 1–9 nov: Pilograma ES 4 impresiones (posición 18,5), PT 7 (8,1), cero clics. EN sin fila en la consulta, lo cual no demuestra exclusión. Continúa pendiente el agregado de Páginas. Hostinger servido: 3612 documentos, 3588 URL exactas, cero FR.

## Inicio de la tanda B y continuidad

Cola preliminar por máximos del inventario, excluyendo Jojo en paralelo: Feira São Cristóvão (36), Kurt Leblon (36), Cais do Oriente (35), Garota de Ipanema (34), La Bicyclette (34), Carretão Lido (34), Tacacá do Norte (34), Frontera Ipanema (32), Clássico Beach Club Barra (30) e Irajá Redux (30). Revisados los diccionarios de las tres primeras: Feira tiene 19 entradas PT/EN, Kurt nueve y Cais doce. Los primeros tres párrafos de Feira y Cais tienen equivalentes alineados en PT; falta cotejar el resto y recuperar ambos idiomas antes de activar. Kurt requiere revisar la plantilla distinta. La revisión editorial de B puede avanzar sin esperar que se resuelvan los pendientes de publicación de A. Verificar de nuevo el HEAD y escritores paralelos; no declarar aprobada ni desplegar la tanda A por haber completado el francés.
