# QA — integración Playas de Río

**Base:** rama `revision/rendimiento-traducciones-81a904c`; HEAD remoto comprobado `62453ed6557bd6201673d0fbfe45b192960e1a4c`.

## Cambios

- Se preservó la versión remota actual de las 27 fichas y la portada como base; las páginas locales anteriores no reemplazaron páginas remotas completas.
- Se enlazaron 30 fotografías WebP seleccionadas del paquete a sus referencias existentes en 16 fichas. Los demás candidatos quedan en la copia recuperable local y no se publican automáticamente.
- Se añadieron 11 fotografías de Wikimedia Commons en las fichas sin foto local seleccionada, con crédito visible, enlace a la ficha fuente y licencia CC.
- Se retiraron los bloques completos de video de 12 fichas. Sólo Copacabana, Leme y Praia do Diabo conservan un video.
- Se mantuvieron las 27 tarjetas con botón Descubrir, el helper de idioma y los mapas al final de las 27 fichas.
- Se añadieron estilos a las imágenes atribuidas y se conservaron las demás secciones editoriales remotas.

## QA estático

- 27 fichas enlazadas desde la portada; 27 botones Descubrir.
- 3 fichas con video: Copacabana, Leme y Praia do Diabo.
- 27 mapas, cada uno al final de su ficha.
- 30 referencias a archivos WebP locales incluidas en el cambio.
- 11 imágenes externas con ALT ES/PT/EN y crédito, fuente y licencia visibles en ficha y tarjeta.
- Búzios, producción, DNS y Hostinger quedaron fuera del cambio.

La validación visual final se realiza en el preview de la rama después de compilar.
