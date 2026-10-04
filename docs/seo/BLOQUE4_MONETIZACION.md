# Bloque 4 — Monetización y productos de alto valor

Base: `0eafb20a5c7a060f83cc4e312439491b87a04ec9`. Rama: `revision/rendimiento-traducciones-81a904c`.
Decisiones: PLAN_CRECIMIENTO_EC.md y SEO_ACTION_MAP.csv existentes. Sin nueva investigación ni auditoría general.

## Implementación

Nueve páginas fuente, 27 versiones ES/PT-BR/EN. Solo nueve párrafos contextuales añadidos y sus traducciones en dos diccionarios. Contenido anterior conservado byte por byte al retirar las adiciones. Enlaces, scripts, fotografías, CSS, header/footer, precios, metadata y sitemap intactos. No se añadieron enlaces internos: hub Experiencias y São Conrado ya enlazan Parapente; no se duplicó Bloque 3.

- Parapente: prepara consulta con fecha, grupo, hospedaje, piloto, encuentro, inclusiones y requisitos, sin convertir consulta en reserva. **Ernesto confirmó Parque da Cidade, Niterói**. Se destaca la vista panorámica; el enlace desde São Conrado presenta una alternativa en otro lugar. La modalidad tándem ya está en el contenido. No se añadieron piloto, duración, límites ni inclusiones no confirmados.
- Helicóptero: elección por pasajeros, duración y modalidad sin puertas; valores por opción como total del vuelo, condiciones a confirmar.
- Lancha: consulta por fecha, grupo, duración y barco; comparación con capacidades/equipamientos existentes y confirmación de recorrido/inclusiones.
- Ala Delta: mantiene PRÓXIMAMENTE; consultar no implica producto disponible.
- Internet: elección entre roaming, chip y eSIM; Airalo como compra al proveedor, distinta de la consulta de chip por WhatsApp.
- Alquiler auto: Rentcars para comparar fechas/retirada/devolución, sin reemplazar condiciones de la locadora.
- Seguro: cotización Assist Card diferenciada de contratación, asistencia y urgencias. No se modificó información médica ni se añadieron coberturas.
- Carnaval Experience: visita al barracón distinta de entrada al Sambódromo; modalidad/idioma a verificar en sistema de socio.
- Rio Samba Bus: elección entre día, noche y Super Ticket; verificación en sistema oficial.

## Afiliación preservada

- Airalo: `https://tpembd.com/content`, parámetros `trs=573170`, `shmarker=776744`, `promo_id=8588`, `campaign_id=541`; colores, comportamiento, locales y fallback originales conservados. Endpoint consultado respondió 200; no se simuló compra ni se certificó atribución de comisión.
- Rentcars: `requestorid=11142`, `utm_source=www.ernestinhocarioca.com.br`, medios `afiliado-link` y `afiliado-widget`; objeto/widget, fallback y enlaces originales conservados, incluido cambio de locale existente. Aeropuertos y Transportes ya contienen integración/enlaces, sin cambios ni duplicación. La consulta automatizada al destino devolvió 403: funcionamiento externo no certificado, no se sustituyó URL.
- Assist Card: campaña `ernestinho`, `m_token=fc2941ae-7c70-4f30-ba1d-055d791a6656`; enlaces de cotización, banner e información oficial originales conservados. Destino consultado respondió 200. No se certificó compra o atribución.
- Carnaval Experience: `ac=UUV6C5E3SX`, cupón `FC5QUN`, condiciones y enlaces existentes intactos.
- Rio Samba Bus: `ref=4ENbPFm3Mb`, opciones y enlaces existentes intactos.

## Pendientes de confirmación comercial

1. Confirmado por Ernesto: Parapente se realiza en Parque da Cidade, Niterói.
2. Confirmado por Ernesto: promoción exclusivamente durante octubre de 2026, R$299 en efectivo o PIX; R$399 con tarjeta, valor normal. La referencia preexistente a fotos/videos se conserva sin añadir inclusiones.
3. Ala Delta sigue sin oferta operativa definida; no apta para activación comercial/Ads.
4. Pequeña África actualmente dice CONSULTAR (no PRÓXIMAMENTE), sin precio, duración u operador definidos. Permanece sin cambios y sin venta cerrada.
5. Carnaval Experience y Samba Bus tienen oferta y socio publicados, pero tarifas, agenda, promociones y condiciones externas no fueron actualizadas ni certificadas. Se conservan según instrucción.
6. Confirmar en navegador normal la operación externa del comparador Rentcars, bloqueado para la consulta automatizada.

## QA limitado

Ver QA_BLOQUE4_MONETIZACION.json y cierre de entrega. No compras ni mensajes reales. Sin cambios en Premium o Bloques 1–3. Un único commit y preview; no producción.
