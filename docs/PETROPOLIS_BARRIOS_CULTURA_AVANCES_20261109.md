# Petrópolis · Barrios y Arte/Cultura — registro de desarrollo directo
Fecha de edición: 9 de noviembre de 2026.
Proyecto: Ernestinho Carioca.
Rama: `revision/rendimiento-traducciones-81a904c`.
Regla maestra: visual de Río, SIN modificar páginas de Río ya aprobadas.

## Barrios: de 6 a 11 fichas reales
Contenido regional: `assets/js/translations/destinos/barrios-regionales.js`
Texto y fuentes de cada zona: `assets/js/translations/destinos/petropolis-barrios-editorial.js`
Generador de fichas: `scripts/regional_neighborhoods.mjs`.

Las 11 zonas:
1. Centro Histórico — Museu Imperial, Koeler, Palácio de Cristal.
2. Quitandinha — Centro Cultural Sesc Quitandinha, lago, Parque Crémerie.
3. Itaipava — Parque Municipal Paulo Rattes, Castelo, terminal.
4. Bingen — rodoviária intermunicipal, Polo de Moda y líneas 100/150.
5. Corrêas–Bonfim — Terminal Corrêas, PARNASO, Circuito das Bromélias.
6. Araras–Vale das Videiras — Jardim Araras, caminos del Vale, combinaciones 602/605/610/617.
7. Castelânea — Museu Casa do Colono e inmigración.
8. Valparaíso — Casa Stefan Zweig y memoria del exilio.
9. Cascatinha–Nogueira — patrimonio textil, antigua estación ferroviaria.
10. Alto da Serra–Rua Teresa — historia de la llegada a la sierra y polo de moda.
11. Pedro do Rio–Secretário — paisaje rural con orientación de acceso.

Cada ficha tiene historia, itinerario sugerido, cómo llegar y volver, duración orientativa, paradas con mapa y fuentes en ES/PT/EN.
Las tarjetas se apoyan en la plantilla visual `styles('barrios')` tomada del Río aprobado, con CSS complementario responsive exclusivo de Petrópolis.
Las fotografías existentes incorrectamente referenciadas como `bairro-bingen`, `bairro-bonfim` y `bairro-araras` se sustituyeron por un recurso genuino disponible o se dejaron sin foto para no mostrar una imagen falsa.
**Pendiente:** seleccionar fotos auténticas y diferentes de Corrêas, Araras, Valparaíso, Alto da Serra y Pedro do Rio/Secretário; comprobar licencias y subirlas al catálogo. No colocar textos superpuestos en las imágenes.

## Arte y Cultura: de 10 a 15 fichas
Catálogo y rutas: `assets/js/translations/destinos/petropolis-lugares.js`
Historia y acceso de cada lugar: `assets/js/translations/destinos/petropolis-cultura-editorial.js`
Generador: `scripts/build_petropolis.mjs`.

Cinco fichas nuevas:
- Casa Stefan Zweig — Rua Gonçalves Dias 34, Valparaíso; literatura, exilio y memoria de refugiados.
- Museu da Força Expedicionária Brasileira — Avenida Koeler 255, detrás del Palácio Rio Negro; verificar visitas directamente.
- Centro de Cultura Raul de Leoni — Praça Visconde de Mauá 305; biblioteca, teatro, cine y galerías.
- Casa da Princesa Isabel — Avenida Koeler 42; recorrido principalmente exterior y jardines.
- Museu de Porcelana — Rua Barão de Amazonas 88; museo con entrada paga y consultas de accesibilidad.

Las 10 fichas anteriores también ganaron apartados históricos y prácticos: Museu Imperial, Casa Santos Dumont, Palácio de Cristal, Catedral, Palácio Quitandinha, Palácio Rio Negro, Casa do Colono, Casa da Ipiranga, Museu de Cera y Castelo de Itaipava.
Nueva portada con tres enfoques: Imperio/arquitectura, República/memoria, arte/oficios/inmigración.
Cada ficha ahora incorpora historia, qué observar, acceso, mapa preciso y fuentes, en ES/PT/EN.
No inventar fotos para las cinco nuevas; pendiente inventariar originales con licencia y sin marcas.

## Fuentes verificadas
- Estado de Río · Petrópolis: https://www.turismo.rj.gov.br/cidades/petropolis/
- IPHAN · Conjunto protegido: https://portal.iphan.gov.br/uploads/legislacao/Portaria_n_213_de_14_de_maio_de_1996.pdf
- Prefeitura · historia industrial: https://sig.petropolis.rj.gov.br/cpge/Reflexoes.pdf
- Roteiros turísticos: https://descubrapetropolis.com.br/roteiros-e-passeios-em-petropolis/
- Ibram · Casa Stefan Zweig: https://cadastro.museus.gov.br/museus/museu-casa-stefan-zweig/
- Ibram · Museu de Porcelana: https://cadastro.museus.gov.br/museus/museu-de-porcelana/
- Exército Brasileiro · FEB Petrópolis: https://museuvirtualdafeb.eb.mil.br/anvfeb-petropolis-rj/
- Centro Raul de Leoni: https://visite.museus.gov.br/instituicoes/centro-de-cultura-raul-de-leoni/
- Casa Princesa Isabel: https://descubrapetropolis.com.br/casa-da-princesa-isabel/
- Sesc Quitandinha: https://cultura.sescrio.org.br/espacos-culturais/centro-cultural-sesc-quitandinha

## Commits
- `c19842803810f3b683417acec87c4d7b14f5867c`: historia trilingüe de 11 zonas.
- `48d382c97c7d10272a69981ae8196e53f563095a`: cinco zonas nuevas y miniaturas verificables.
- `d8180f3dc5f3b71a1adce25a2f4ebccfe2e5e847`: fichas de Barrios con recorridos y mapas.
- `2ae9901a0a8674ff30adad99581ef2a79fa66d5f`: cinco lugares culturales nuevos.
- `f59d5594868e5d99d6301ba5fa69ac52a3483817`: historia de 15 lugares culturales.
- `5c75c4d548ca75cd7d42e19d2596981a403ec741`: diseño y contenido histórico en páginas de Cultura.

## QA realizado
- Se comprobó la sintaxis JavaScript de los siete módulos afectados.
- Simulación de generación del HTML de portada y 11 barrios + portada y 15 lugares culturales para ES, PT y EN: **84 páginas/representaciones simuladas**.
- Validado: 11 rutas de barrio, 15 rutas de Cultura, ninguna falta de fichas o textos, ninguna miniatura referenciada fuera del inventario `petrPhotos`.
- **NO se ejecutó `npm run build`** ni se revisó con navegador real a 1440/390 px.
- La sesión de ejecución no dispone de acceso de red directo a GitHub para clonar repositorio; se trabajó por GitHub conectado.
- **NO publicado en Hostinger.** No desplegar hasta validar build, estilos y protección. Hostinger mantiene una conexión Git vinculada a rama `release/pt-en-reviewed-20261102`, diferente de la rama editorial trabajada.

## Lo siguiente
1. Capturas de las 11+15 fichas en móvil y escritorio y ajustes precisos (ancho, tipografía, espaciado, fotos, comportamiento).
2. Fotografías auténticas por zona y cinco museos nuevos, verificadas/licenciadas, sin texto ni marcas.
3. Construcción y pruebas de accesibilidad/enlaces, gate de `docs/PUBLISHING_PROTECTION.md`, publicación incremental segura por Hostinger.
4. Después continuar con otros módulos pendientes de Petrópolis y, solo entonces, otro destino.

**No interpretar la existencia de archivos en GitHub como despliegue en producción.**
