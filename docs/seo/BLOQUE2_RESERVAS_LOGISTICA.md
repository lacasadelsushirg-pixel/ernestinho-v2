# Bloque 2 — Reservas y logística

Base: `6a0c515f6e9b9dcb47bfc59c19cd62b092b5327b`, rama `revision/rendimiento-traducciones-81a904c`. El Bloque 1 y la corrección posterior del hub se conservan. Fuente de decisiones: `PLAN_CRECIMIENTO_EC.md` (orden de implementación, bloque 2) y las filas ES/PT/EN de `SEO_ACTION_MAP.csv` para alquiler, transfer, transportes:transporte-privado, maracana-juego, maracana-visita y rocinha. No se hizo investigación nueva ni una auditoría general.

## Cambios

| Página fuente | Mejora aplicada en ES/PT-BR/EN |
|---|---|
| `/hospedaje/` | Dos párrafos dentro de la sección editorial existente: elección inicial por capacidad publicada, comparación de distribución/ubicación y consulta con fechas, adultos, niños y preferencias. Distingue guía de zonas de unidades concretas. Mantiene orden, tarjetas, fotografías y capacidades existentes. |
| Las 11 fichas enlazadas desde el catálogo | Un párrafo dentro de la consulta existente solicita entrada/salida, adultos/niños, preferencias de camas y necesidades de acceso. La distribución, disponibilidad y condiciones se confirman directamente. No se afirma que abrir WhatsApp reserve. |
| `/transportes/transporte-privado/` | Distingue contratación de traslado privado de la guía de llegada, con enlace a aeropuertos. Prepara consulta con fecha/hora, origen/aeropuerto, destino, vuelo, pasajeros y equipaje; confirma oferta por escrito. |
| `/guia/aeropuertos/` | Únicamente un párrafo con enlace contextual a transporte privado dentro del apartado de traslado Ernestinho. Sin convertir la guía en landing comercial ni cambiar sus condiciones. |
| `/experiencias/maracana-experience/` | Diferencia recorrido del estadio de asistir a un partido y enlaza la alternativa. Solicita fecha, grupo y hospedaje, con operación/recogida por confirmar. |
| `/experiencias/partido-maracana/` | Enlace a la visita como alternativa. Consulta con fechas de viaje, grupo, equipo/partido y preferencia de sector; calendario, estadio, entradas y condiciones deben confirmarse. |
| `/experiencias/rocinha/` | Aclara el formato existente de moto-taxi, becos y escaleras para conversar sobre movilidad. Solicita fecha, grupo, turno y hospedaje; no garantiza encuentros espontáneos ni reserva por un clic. Mantiene íntegra la narrativa local. |

Las fichas son: AP 805, AP 605, AP 1008, AP 54, AP 702, AP 217, AP 1221, AP 621, Casa Goia, Casa Venti y Casa Ñata. Su inclusión se basa en el catálogo y el objeto `STAYS` actuales; no certifica disponibilidad para una fecha. `estudio-1-1` no aparece en el catálogo ni en `STAYS`; no se modifica ni recibe protagonismo o enlaces nuevos.

El enlace guía de alojamiento ↔ hospedaje ya existe y se conserva. No se añade un enlace de Rocinha a otra entidad cultural sin justificación específica. No se ejecuta el Bloque 3.

## Contradicciones identificadas antes de editar Hospedaje

| Unidad | Archivo/dato publicado | Contradicción conservada |
|---|---|---|
| AP 805 | `hospedaje/805/index.html`: 1 habitación, estudio/kitnet; `assets/js/data/lodging.js`: `rooms: 2` | No se cambia ni se afirma una configuración nueva. Se solicitan preferencias y se confirma distribución en la consulta. La capacidad de 5 coincide. |
| AP 605 | Ficha y `lodging.js`: cama matrimonial + sofá cama; `assets/js/hospedaje.js`, `listing.card.605`: cama matrimonial + colchón de 2 plazas | No se decide cuál cama auxiliar es correcta. Capacidad de 4 y 1 habitación se conservan. |
| Casa Venti | HTML del hub y ficha: propiedad con escaleras; `lodging.js`, descripción y dirección usadas por `hospedaje.js`: sin escaleras | No se modifica ni se promociona como accesible/sin escaleras. Es una discrepancia previa que requiere confirmación del propietario. Capacidad de 7, 2 habitaciones y 5 camas coincide. |

Las cantidades de huéspedes del hub coinciden con las fichas y `STAYS` para las 11 unidades. AP 702 describe una cama matrimonial y un colchón matrimonial bajo un resumen de “2 camas”; no se convierte un colchón en cama ni se cambia esa etiqueta. No se infieren tipos/distribución de las camas no especificadas en AP 217, AP 621, AP 1221 y las casas. No se inventan restricciones infantiles, políticas, costos, horarios de entrada/salida ni disponibilidad en tiempo real.

## Datos comerciales conservados y límites de verificación

- Hospedaje: sin precios públicos ni calendario de disponibilidad; capacidades, camas, ubicación, servicios, condiciones existentes y mensajes/CTA de WhatsApp intactos, incluso las contradicciones identificadas.
- Transfers: itinerarios y condiciones publicados intactos, sin tarifas nuevas ni promesas de espera, cobertura, cancelación o disponibilidad. La guía conserva su condición publicada de pago al llegar; no se generaliza esa condición a nuevas ofertas.
- Maracanã Tour: R$250, aproximadamente 50 minutos e inclusiones publicadas conservadas. No se vuelve a certificar la operación actual ni descuentos para una fecha.
- Partido: calendario de octubre de 2026, equipos, estadios, horarios, sectores, precios publicados (R$300, R$350, R$400, R$450, R$550), inclusiones y duración de 5–7 horas intactos. No se contrastan con una fuente nueva ni se certifica disponibilidad. La consulta exige confirmación.
- Rocinha: R$170, moto-taxi, guía bilingüe, tasa incluida, salidas/turnos y opción privada publicados intactos. No se inventa duración, punto exacto de encuentro, cobertura de movilidad o nueva condición del dron opcional.
- Fuera de alcance: el commit base corrigió únicamente el hub de Experiencias: Arraial R$200 + tasa y Angra R$180 + tasa. La landing de Angra aún publica R$200 + tasa; es una discrepancia heredada. No se reabre ni modifica el Bloque 1.

## Protecciones y verificación

Solo se añaden 22 párrafos a 17 fuentes HTML y 16 claves nuevas de traducción en cuatro diccionarios. Al retirar esos párrafos, cada HTML es idéntico byte por byte a la base. Todas las claves previas de los diccionarios conservan sus valores. No se cambia CSS, header, footer, JavaScript funcional, fotografías, CTA, metadata fuente, URLs, redirects ni sitemap.

El registro `QA_BLOQUE2_RESERVAS_LOGISTICA.json` resume el QA limitado a las rutas afectadas. El comprobador obligatorio de páginas congeladas se ejecuta antes y después: conserva exactamente la misma lista histórica de 586 diferencias ya cerradas. No se modifica su manifiesto ni se presenta ese comprobador como aprobado; la prueba específica de este bloque verifica únicamente las adiciones autorizadas.

Un único commit y un único preview de la rama. Sin producción ni avance al Bloque 3.

Limitaciones previas del QA: en Partido Maracanã el CSS original oculta ES en ambos selectores, por lo que 32 de 34 ciclos visibles completos pasan; las otras dos rutas ES se comprueban por navegación directa, sin presentarla como clic exitoso. Una imagen externa del túnel del Maracanã no carga tanto en la base como en el resultado. Se conserva su URL; no se modifican fotografías ni selector. Los videos embebidos no se reproducen durante la comparación visual.
