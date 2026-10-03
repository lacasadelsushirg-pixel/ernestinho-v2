# Bloque 1 — claridad SEO/comercial P0

Base exacta: 6a2bab0ae6f814fbcb70799065b4d4a8c520ade7; rama revision/rendimiento-traducciones-81a904c. Decisiones: PLAN_CRECIMIENTO_EC.md y SEO_ACTION_MAP.csv entregados el 3 de octubre de 2026. Sin nueva investigación, auditoría general ni revisión de diferencias históricas.

## Cambios limitados

- Experiencias: conserva introducción, categorías, orden, contador, tarjetas y estados comerciales. Añade orientación entre tours urbanos, excursiones, aventura, cultura y privados; enlaces a las cinco landings del bloque. Descripción de tarjeta Full Day precisa Cristo + Pan de Azúcar, almuerzo y traslado existentes.
- Full Day: conserva itinerario e inclusiones; explica elección de jornada completa frente a City Tour de medio día y visita independiente. Enlaces a City Tour y guía del Cristo. Datos necesarios para consulta junto a reserva existente.
- Cristo + City Tour: frase inicial precisa medio día; comparación con Full Day y guía independiente del Cristo; modalidad con/sin almuerzo y datos necesarios para consultar.
- Búzios: comparación basada en goleta y tiempo libre en Rua das Pedras publicados; enlaces a Arraial y Angra; orientación para confirmar salida/tasas/navegación por WhatsApp.
- Arraial: diferencia excursión centrada en playas y barco frente a Rua das Pedras e islas de Angra; enlaces a ambas alternativas; orientación para consulta.
- Angra: precisa traslado + paseo por islas/Lagoa Azul; compara con Arraial/Búzios; distingue transfer terrestre y cruce marítimo independiente, con enlace al servicio existente. No cambia ese servicio.

Los nuevos párrafos se integran en las tarjetas existentes, fuera de la columna de precio, sin estilos ni bloques visuales nuevos. 27 frases nuevas y únicas PT-BR/EN en experiencias-04.js; ninguna clave anterior sobrescrita. La construcción existente genera las 18 versiones; no se mantienen fuentes HTML separadas por idioma.

## Intenciones reforzadas

ES: tours/paseos en Río, city tour de medio día, tour Cristo + Pan de Azúcar, excursión Búzios/Arraial/Angra desde Río. PT-BR: passeios no Rio, city tour de meio dia, passeio saindo do Rio. EN: Rio de Janeiro tours, half-day city tour, Christ and Sugarloaf full day tour, day trips from Rio. Candidatos de la investigación existente, sin atribuir volúmenes ni demanda certificada.

## Datos comerciales conservados

No se verificó vigencia con operadores; se conserva toda la información comercial publicada: Full Day R$430 y condiciones de días de semana/Barra; City Tour R$230/R$250, horario y política infantil; Búzios R$230 + taxa marinha, horarios/duraciones y alternativa terrestre; Arraial R$200 + taxa da Marinha/pescadores, horarios/duraciones y política infantil; Angra desde R$200 + taxa da Marinha, duración y condiciones de navegación. No se añade monto de tasas, nueva disponibilidad, garantías de paradas, idiomas de guía ni políticas de cancelación. Las inclusiones mencionadas en la comparación proceden de estas fichas; las condiciones para la fecha se consultan con Ernestinho. No hay precios nuevos ni correcciones basadas en referencias externas.

## QA exclusivamente afectado

18 páginas ES/PT-BR/EN × desktop 1365 y móvil 390 = 36 combinaciones, cero fallos. 36 clics reales ES→PT→EN→ES conservan ruta. 30 comprobaciones de CTA existente: Full Day abre/cierra su modal original y su solicitud; las otras cuatro abren WhatsApp correcto. Se interceptó window.open: no mensajes enviados. Hub conduce a productos y conserva CTA global. 21 destinos de enlaces añadidos por idioma respondieron HTTP 200 localmente.

Canonical/hreflang idénticos a salida de la base. Header/footer, estilos, imágenes, vídeos, scripts de CTA, hechos e inclusiones originales preservados exactamente en fuente. Comparación de geometría/estilos en navegador: header/footer, medios, columnas y gaps sin diferencias; sin nuevo overflow ni imágenes rotas. Capturas antes/después de las 36 combinaciones y revisión visual desktop/móvil de las seis ES y City Tour EN. Vídeos externos no reproducidos en el navegador de QA; se conservan sus URLs y dimensiones.

Sintaxis del diccionario y scripts inline de las seis fuentes: PASS; git diff --check: PASS. Sitemap de salida idéntico byte a byte: sin modificación fuente ni cambio de URLs. check_frozen_pages.py ejecutado: conserva exactamente sus diferencias heredadas contra el manifiesto histórico, ya cerradas por el usuario; no se actualizó el manifiesto ni se reabrió ese análisis. La comparación adicional contra HEAD confirma únicamente los cambios autorizados de este bloque.

Un único commit y un único preview. Sin producción ni Bloque 2.
