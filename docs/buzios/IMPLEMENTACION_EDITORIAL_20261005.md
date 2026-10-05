# Búzios: bloque editorial del 5 de octubre de 2026

Base: da1542f9e925e40b823c441bf145585b45b3b17d. Rama única: revision/rendimiento-traducciones-81a904c. No se modifica main ni producción.

## Implementación

16 nuevas guías: supermercados, compras, servicios, con-ninos, accesibilidad, mascotas, internet, dinero, salud, seguridad, clima, eventos, vida-nocturna, gastronomia-argentina, gastronomia-chilena y perfiles. El selector de perfiles tiene 16 opciones. La arquitectura mantiene /destinos/buzios/ y las URLs localizadas existentes; no crea aliases /buzios/ ni URLs anuales descartables.

Ampliaciones aditivas en movilidad, llegada, alojamiento, cruceros, experiencias, qué hacer y gastronomía. Se conserva texto aprobado, fichas de 23 playas y archivos fotográficos anteriores. Contenido ES/PT/EN, consejos y decisiones de Ernestinho. Nuevas fotos específicas de nuevos temas no se inventan ni se llenan con imágenes genéricas.

Servicios contextuales: Airalo mediante la guía existente con el comparador afiliado, Rentcars mediante la guía existente, Assist Card mediante la guía existente, transfer EC y WhatsApp; Hospedaje Ernestinho sólo para la etapa de Río. No se inventan afiliaciones Booking, Flytographer, restaurantes o proveedores náuticos.

## Fotografías

Se añaden cuatro assets WebP locales MTur: entrada de Porto da Barra, Ferradura, estatua Bardot y paisaje costero de Búzios. Conservan dimensiones, autor y enlace de licencia. No se usa la foto de un menú antiguo como carta vigente. No se usa la vista costera como identificación de una playa sin identificación específica.

Fuentes utilizadas:
- https://www.flickr.com/photos/mturdestinos/41052070561 — Thiago Freitas; Public Domain; sin vencimiento indicado; entrada comercial, no sunset.
- https://www.flickr.com/photos/mturdestinos/26181544077 — Thiago Freitas; Public Domain; metadata y licencia comprobadas en HTML directo.
- https://www.flickr.com/photos/mturdestinos/40343777174 — Thiago Freitas; Public Domain; metadata y licencia comprobadas en HTML directo.
- https://www.flickr.com/photos/mturdestinos/41052097181 — Carlos Erbs Jr.; Public Domain; crédito obligatorio, sin vencimiento indicado.

Descartadas:
- https://www.flickr.com/photos/mturdestinos/41052063831 — Azeda/Azedinha; descripción restringe uso hasta 03/04/2023, pese a la etiqueta Public Domain. Se conserva alternativa CC existente.
- https://www.flickr.com/photos/mturdestinos/39243546070 — Ferradurinha; misma restricción hasta 03/04/2023. Se conserva alternativa CC existente.
- https://www.flickr.com/photos/seturrj/35113907395 — Geribá; All rights reserved.
- https://www.flickr.com/photos/seturrj/49831147311 — Geribá; All rights reserved.
- https://www.flickr.com/photos/seturrj/49830610048 — Foca; All rights reserved.
- https://www.flickr.com/photos/mturdestinos/40159377605 — menú comercial histórico; no adecuado como sunset ni carta actual.

Se retiró el uso de fotografías de playa como imagen de tarjeta de vehículo, buceo, barco o crucero; no se afirma que una foto editorial sea de un proveedor EC. Se conservan las fotos aprobadas en sus usos de paisaje.

## Datos variables y fuentes

No se publica R$8,35 como tarifa actual. B85 se distingue de B185 histórico; horarios y paradas no se certifican por una lista general. Fuente: https://www.salineira.com.br/post/hor%C3%A1rios-especiais-20-04-a-24-04 y canal Salineira enlazado.

Eventos: https://buzios.rj.gov.br/calendario-de-buzios-de-2026-inova-com-festival-de-cafe-e-chocolate-e-mais-53-eventos/. Se distingue calendario anual de anuncio posterior; no se certifica programación detallada ni se extrapola a 2027.

SUS: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-do-viajante/durante-sua-estadia.
Intoxicaciones: https://www.gov.br/anvisa/pt-br/assuntos/agrotoxicos/disque-intoxicacao.
Apoyo a mujeres: https://mulher.buzios.rj.gov.br/.
Salud local: referencias del sistema municipal; ninguna ampliación anunciada se trata como servicio operativo sin verificación.

## QA y límites

36 rutas × 3 idiomas × 2 anchos = 216 combinaciones en cada pasada automatizada. Se comprueban errores JS, imágenes, alt, selector, metadata, lang, h1, desbordamiento y enlaces locales. Capturas desktop/móvil inspeccionadas. El CLI agent-browser no inició su daemon en dos intentos; el navegador Chromium y Playwright sí realizaron la verificación completa.

El script de páginas congeladas devuelve las 586 diferencias presentes en HEAD. No se restauran ni se altera su manifiesto; ninguna página fuera de Búzios se modifica. Se verifica conservación frente al HEAD inicial, sin reabrir la auditoría histórica.

LCP/CLS del informe son observaciones sintéticas locales, con carga forzada de imágenes para detectar roturas. No certifican CWV de campo, TBT ni INP. No afirmar valores locales como velocidad real de Vercel.

## Cierre editorial posterior, 5 de octubre de 2026

Se conserva íntegramente el bloque local anterior. La pasada complementaria fotográfica queda expresamente separada por instrucción del usuario. No se buscaron ni añadieron nuevas fotografías en esta pasada.

BÚZIOS 23/23 — PROFUNDIDAD EDITORIAL ALTA. Este estado evalúa contenido para decidir, comparar, planificar y verificar. No afirma que todos los proveedores estén abiertos, que exista farmacia/veterinaria 24 h ni que se haya realizado una auditoría física de accesibilidad.

### Matriz de los 23 bloques

| # | Bloque | Estado | Evidencia de cierre |
|---|---|---|---|
| 1 | Movilidad | ALTA | Bus/van y último tramo; taxi/app, barco como transporte, bicicleta/auto, estacionamiento y retorno nocturno. |
| 2 | Abastecimiento | ALTA | Tipos de comercio, primera compra, zonas, agua/hielo/bebidas/delivery y costo con transporte. |
| 3 | Compras | ALTA | Rua das Pedras, moda playa/surf, artesanía, ferias y comprobación de edición/horario. |
| 4 | Servicios prácticos | ALTA | Cambio/ATM, lavandería, combustible, Correios/información, salud y veterinaria contextual. |
| 5 | Gastronomía argentina | ALTA | Siete casas auditadas individualmente; categoría, ubicación referenciada/discrepancias y evidencia reciente separadas de apertura diaria. |
| 6 | Gastronomía chilena | ALTA | Tres referencias auditadas: Chilenazo, Oh Chile y Pan con Pebre. Última no verificada; no recomendada como activa. |
| 7 | Vida nocturna | ALTA | Paseo/cena, sunset, música/club, grupos/LGBT+, reservas y retorno; locales históricos no anunciados abiertos. |
| 8 | Niños | ALTA | Bebé/niño/adolescente, playa por condiciones, coche, sombra/baño, lluvia, alojamiento y actividades. |
| 9 | Accesibilidad | ALTA | Barreras por trayecto, terreno, escalones, baño/transporte/habitación; sin certificación física inventada. |
| 10 | Mascotas | ALTA | Alojamiento/restaurantes/transporte y prevención; clínica con fuente propia, protocolo de urgencia y límites de atención. |
| 11 | Clima | ALTA | Los doce meses diferenciados dentro de cuatro períodos; demanda, viento, lluvia, buceo y plan alternativo sin pronóstico ficticio. |
| 12 | Seguridad | ALTA | 190/192/193/180, pertenencias/mar/calor, robo de móvil, documentos/consulado, reservas y apoyo a mujeres. |
| 13 | Internet | ALTA | Roaming/SIM/eSIM/Wi-Fi, compatibilidad Airalo, cobertura por lugar, mapas/reservas offline y batería. |
| 14 | Eventos | ALTA | Revisión al 05/10: MPB municipal específico; Festa/Natal y restantes con estado anual, fechas pasadas separadas, sin extrapolar 2027. |
| 15 | Cruceros | ALTA | 2025/26 histórico, tabla operador 2026/27, discrepancia 18/10, escalas programadas, dos muelles, tender/tiempo/margen y CTA EC. |
| 16 | Perfiles | ALTA | Dieciséis perfiles diferenciados, selector real, zona/logística/intención y servicios cuando resuelven la necesidad. |
| 17 | Alojamiento | ALTA | Las doce áreas originales, matriz 18 criterios en nueve columnas pareadas, diferencias internas y comprobación por propiedad. |
| 18 | Playas | ALTA | Veintitrés fichas, 18 dimensiones explícitamente mapeadas, 207 pares/consejos y 23 espacios visuales preparados. |
| 19 | Experiencias | ALTA | Doce categorías editoriales separadas de catálogo comercial, origen Río vs Búzios y decisiones por esfuerzo/logística. |
| 20 | Actividades específicas | ALTA | Escuna/privado/taxi, buggy tour/alquiler, jardinera/bus, buceo/snorkel, SUP/kayak/canoa/pesca, trekking/bici/viento. |
| 21 | Gastronomía general | ALTA | Polos gastronómicos, formatos y decisión según ocasión/dieta, playa/mesa/eventos, consumo y regreso. |
| 22 | Salud | ALTA | SUS/viajero, urgencia, farmacia extendida con contacto/fuente propia, madrugada sin 24 h inventado y cómo verificar stock/receta. |
| 23 | Dinero | ALTA | Efectivo/crédito/débito/PIX/ATM/cambio, costos/límites/conversión y turista sin PIX; sin cotización/presupuesto inventado. |

### Playas y zonas

23/23 playas con las 18 dimensiones cubiertas. Identidad conserva el perfil aprobado; las fichas adicionales agrupan mar/viento, perfil/actividad, llegada/dificultad, estructura/comida/agua, familia/PCD, transporte/estacionamiento, momento/equipo, evitar/combinar y consejo. Cada ficha incluye espacio visual con identificación propia; no se rellena con foto dudosa ni se declara cobertura fotográfica final.

La matriz corresponde exactamente a las 12 áreas de buzios-areas.js, sin crear barrios. Sus 18 criterios se presentan en nueve columnas pareadas para permitir comparación: perfil/playa, noche/restaurantes, supermercados/transporte, auto/caminabilidad, desniveles/accesibilidad, familia/pareja, deporte/mascota, rango/temporada y ventajas/inconvenientes. La tabla tiene desplazamiento horizontal local y encabezados semánticos; no causa desbordamiento de la página.

### Certificación temporal y fuentes posteriores

- MPBúzios: anuncio específico municipal del 23/09/2026, posterior al calendario; fechas 9–11/10, Praça Dona Dita/Ferradura, desde 21:00, tres artistas. Agenda propia de Biquini confirma 11/10. https://buzios.rj.gov.br/adriana-calcanhoto-zeca-baleiro-e-biquini-cavadao-sao-as-atracoes-do-mpbuzios-2026-em-outubro/ y https://biquini.com.br/calendario-de-shows/.
- Festa da Cidade 12–14/11 y Natal de Luz 1–31/12/Cantata 11–12/12: previstos en calendario municipal. Búsqueda web y API de noticias municipal no localizaron anuncio posterior específico suficiente; no se inventan sedes, artistas ni encendido. Otros eventos deportivos/literarios/automóviles quedan con estado previsto y fuente anual. Eventos de meses pasados no se anuncian futuros ni se extrapolan a 2027.
- Cruceros: anuncio municipal del 20/08: https://buzios.rj.gov.br/buzios-tera-cinco-escalas-de-cruzeiros-previstas-para-outubro/. La tabla posterior del operador, consultada el 05/10, se selecciona expresamente en https://portoveleirobuzios.com.br/escala-navios.asp?periodo=2026%2F2027. Incluye programación 2026/27, no se congela 2025/26. Se explica divergencia de 18/10; ausencia no prueba cancelación. Muestra 25/10 Buenavista, 27/10 Seabourn Venture, 30/10 SH Vega y 03/12 MSC Virtuosa. Sin garantía de desembarque o tiempo fijo.
- Drogaria Búzios: fuente propia, R. Manoel Turíbio de Farias 345, contacto (22) 99744-1164, horario publicado diario 08:00–00:00, extendido y NO 24 h. https://www.drogariabuzios.com.br/contato.
- Apaixonados por Quatro Patas Búzios: fuente propia, Av. José Bento Ribeiro Dantas 1254/Rasa, (22) 99700-8180, horario publicado lunes–sábado 08:00–18:00; domingos/feriados 08:00–16:00. Clínica, no 24 h/emergencia/domicilio certificados. https://apaixonados-buzios.simples.vet.br/contato/.
- Gastronomía: San Telmo tiene visitas publicadas julio de 2026; Empanaderia Real actividad pública reciente y aviso de traslado. Se evita certificar ubicación nueva por dirección vieja. Avellaneda/Estilo/A Las Brasas/Folga/Café Porteño: fichas y categoría examinadas; se marca operación/dirección por confirmar cuando corresponde. Chilenazo: categoría chilena sustentada, registros de dirección discrepantes. Oh Chile: referencia/canal localizado, sin evidencia reciente suficiente de apertura. Pan con Pebre: no se identifica casa fiable; no se recomienda como establecimiento activo. Enlaces concretos figuran en cada ficha. No se copian menús, precios, horarios ni accesibilidad de reseñas.

### Excepciones operativas expresamente señaladas, no huecos editoriales

No hay farmacia 24 h ni veterinaria nocturna/domiciliaria certificadas. No hay certificación de apertura diaria y carta de todos los restaurantes. No se certifica programa futuro no anunciado, ejecución de una escala, ruta accesible de toda una zona ni mar tranquilo. La guía resuelve esos límites con contactos, procedimiento de comprobación, alternativas por zona y criterios de decisión. Suprimir estas incertidumbres sería inventar.

### QA de cierre

36 rutas × ES/PT/EN × desktop/móvil = 216 combinaciones por pasada. La prueba añade conteos semánticos: 23 fichas/23 espacios visuales/207 grupos de detalle en cada versión de playas y 12 filas/9 columnas pareadas en alojamiento. Validación adicional: identidad y orden de playas/zonas coinciden exactamente con módulos aprobados; todos los nuevos valores y etiquetas tienen ES/PT/EN no vacíos. Revisión editorial de traducciones nuevas y capturas de detalle/tabla.

El resultado automatizado está en QA_EDITORIAL_RUNTIME.json. La matriz con trazabilidad está en CERTIFICACION_EDITORIAL_23_BLOQUES.json. Las 586 diferencias históricas se mantienen sin restauraciones ni cambio de manifiesto. Los assets de fotografía anteriores y cuatro MTur se conservan.
