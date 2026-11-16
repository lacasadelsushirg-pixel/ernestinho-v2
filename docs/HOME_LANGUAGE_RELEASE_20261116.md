# Inicio en cuatro idiomas — revisión de publicación (16 nov 2026)

## Alcance de esta rama

La propuesta deja la portada española intacta y mantiene la portada francesa en `/fr/`. Incluye las correcciones editoriales PT/EN en las 97 claves del módulo Inicio, el diccionario manual FR de Inicio, enlaces a `/fr/` desde el selector de idioma, metadatos recíprocos `hreflang` solo para Inicio y la ruta `/fr/` en sitemap. Los destinos franceses aún no integrados vuelven a su equivalente español aprobado para no producir errores 404 ni URL FR vacías.

Se localiza también en francés el mensaje prellenado de WhatsApp, el bloque Cadastur, el cierre de contacto, el pie y las etiquetas de accesibilidad. La imagen de portada se conserva: en la comprobación de producción del 16 de noviembre, el navegador cargó la imagen PT desde su URL actual con dimensiones 1536 × 1024. No se encontró un fallo reproducible en esa imagen.

## Diferencias históricas de contenido protegido

El informe antiguo enumera 247 páginas distintas de los digests del 30 de septiembre; no se aprobaron ni se cambiaron sus hashes. Al comparar la rama de producción actual con el snapshot del último despliegue de Hostinger (9 de noviembre), 246 de esas páginas coinciden exactamente con lo publicado. La única excepción es `quiero/index.html`, cuyo cambio está en el commit `21bb6877` para restaurar las fotos y el mapa de ocho puntos; ese cambio queda fuera de esta propuesta de Inicio.

La diferencia de `index.html` observada en la rama de vista previa francesa corresponde a una página de prueba francesa `noindex` colocada temporalmente en la raíz. No se incluye en esta rama; `index.html` español permanece en su versión publicada.

## Verificaciones ejecutadas

- `node --check` en `site.js`, `locale-routing.js`, `home.js`, `fr-home.js` y `build_multilingual.mjs`: correcto.
- JSON FR válido; las 97 claves de Inicio tienen valores PT y EN; las 54 cadenas de título/copy de las tarjetas dinámicas de Inicio están cubiertas en FR. Se mantienen como nombres propios `Búzios`, `BarraShopping`, `Shopping Leblon` y `SAARA`.
- La ruta del selector FR preserva query y fragmento y conduce a `/fr/`.
- Prueba aislada del generador de sitemap con ES/PT/EN/FR: canonicals y alternates válidos; cuatro rutas incluidas.
- Observación de producción: `/fr/` estaba marcado `noindex` y la página PT todavía no incluía el alternativo FR. Esta propuesta quita `noindex` solo de la página francesa y añade el enlace alternativo desde las tres versiones del Inicio generado.

## Bloqueo de publicación

`node scripts/guard_approved_content.mjs` detiene esta propuesta porque los cambios necesarios tocan exactamente tres recursos protegidos: `assets/js/site.js`, `assets/js/locale-routing.js` y `assets/js/translations/home.js`. No se alteró el guard, el snapshot, los manifiestos de aprobación ni el workflow. El build completo y la prueba visual de esta rama en escritorio/móvil quedan pendientes de la revisión humana requerida por la protección; la portada actual en producción no se modificó.

**Estado:** traducciones y cambios de integración preparados en rama; aún no publicados en producción.
