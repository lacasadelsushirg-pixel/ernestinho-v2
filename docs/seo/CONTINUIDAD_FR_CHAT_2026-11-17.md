# Continuidad operativa — Ernestinho Carioca FR / ES / PT-BR / EN
Fecha: 2026-11-17 (Brasil, America/Sao_Paulo)
Responsable de este lote: sesión de ChatGPT (sin Work)
Estado: SEIS FICHAS FR NUEVAS EN HOSTINGER /fr; SIN BUILD GENERAL; FR NOINDEX

## Regla inamovible
- Fuente durable: GitHub `lacasadelsushirg-pixel/ernestinho-v2`. Hosting exclusivo: Hostinger.
- No usar ni mencionar despliegues de otro proveedor. NO ejecutar compilación total de ~3.612 páginas; el último build masivo falló y la corrección incremental sigue en PR #45.
- No alterar archivos aprobados ES, fotografías, sus rutas ni el manifiesto/sitemap existente. Nunca asumir que un commit equivale a publicación. Publicar por carpetas/archivos con copia de seguridad y prueba posterior.
- El francés permanece `noindex,nofollow` y fuera del sitemap hasta QA completo de toda la localización; las páginas son visibles mediante URL directa para prueba.

## Ramas y realidad de producción al iniciar
- Producción Git: `revision/rendimiento-traducciones-81a904c`, HEAD `d9ae3339e63cfed8873cc36a0a48712ddcee165d` (confirmado al iniciar).
- PR #45 `fix/hostinger-incremental-failsafe-20261116`: abierto, fusionable y pendiente de revisión humana independiente. No simular ni eludir la revisión. El modo correcto debe mostrar exactamente `Build mode: incremental; rendering 3 of 3612` y conservar 3.588 URLs indexables.
- Hostinger publica el sitio principal en `/home/u319776719/domains/ernestinhocarioca.com.br/public_html`.
- Carpeta francesa separada `/fr`: Git de la rama `release/fr-public-initial-20261115`, ruta configurada en Hostinger. NO hay que usar `hosting_deploy` ni sobrescribir toda la raíz.
- PR histórico #25 `traduccion/guia-fr-paralelo-20261110` contiene diccionarios FR para Guía; fuente reutilizable previa verificación contra la ficha española actual.

## Seis fichas nuevas completadas en esta sesión y sincronizadas a Hostinger
Rama de trabajo y despliegue: `release/fr-public-initial-20261115`.
1. `/fr/guia/accesibilidad/` — `guia/accesibilidad/index.html`: traducción editorial completa desde la ficha ES aprobada. Fotos intactas, sin links internos rotos intencionales.
2. `/fr/guia/documentos/` — `guia/documentos/index.html`: documentos, visados, migración, aduana y preguntas frecuentes; contenido español preservado sin modificaciones.
3. `/fr/guia/seguro/` — `guia/seguro/index.html`: seguro de viaje, SUS, UPA, asistencia y afiliación Assist Card conservada; traducción del diccionario histórico FR.
4. `/fr/guia/cpf/` — `guia/cpf/index.html`: CPF para viajeros, con links oficiales conservados; link a Pix sigue en español, señalado expresamente como tal hasta traducirlo.
5. `/fr/guia/terminales/` — `guia/terminales/index.html`: rodoviária y terminal de cruceros; mensaje WhatsApp prellenado pasado a francés.
6. `/fr/guia/alquiler-auto/` — `guia/alquiler-auto/index.html`: alquiler de auto, enlaces de Rentcars y widget FR conservados; se corrigió selección de idioma para usar francés en esta página sin depender de localStorage antiguo.

Además:
- `guia/index.html`: tarjetas Documentos, Accesibilidad, Seguro, CPF, Terminales y Alquiler ahora apuntan a sus rutas FR. «Comment se déplacer» apunta a `/fr/transportes/` en vez de una redirección española.
- `guia/accesibilidad/index.html`: enlace al Seguro ahora abre ficha FR sin aviso español.
- `transportes/index.html`: enlace al alquiler de autos ahora abre ficha FR.
- `index.html`: se localizaron al francés dos etiquetas ARIA de Inicio que seguían en español.
- Correcciones anteriores de esta conversación ya estaban en la rama y fueron verificadas/sincronizadas: mensajes WhatsApp FR de Aeropuertos, Internet y Viajar solo; ALT/OG de tarjetas y enlaces al Inicio FR, con noindex.
- Se normalizó el JSON-LD de las fichas FR nuevas: `inLanguage: fr`, name/description franceses y URL de cada página FR (corrección posterior a la primera importación de las cuatro fichas iniciales).

## Garantías verificadas
- GitHub: revisión estática de 9 páginas (Inicio, Guía, Transportes y 6 fichas nuevas); todas pasaron `lang=fr`, `robots/googlebot noindex,nofollow`, canonical FR y `hreflang=fr`; sus datos estructurados se comprobaron contra la canonical.
- Se compararon `<img src>` de cada ficha nueva con su fuente ES: rutas de fotografía conservadas sin sustitución.
- Los diccionarios usados (PR #25) cubrían las cadenas visibles del origen para las páginas aplicables; sin cadenas españolas sin traducir detectadas en la revisión estática.
- Hostinger: el `hosting_git_deploy-website-repository` apuntando EXCLUSIVAMENTE a `directory=fr` devolvió `is_success=true` y árbol de trabajo Git limpio.
- Se releyeron los nueve archivos en Hostinger después de sincronizar: existen y se confirmaron idioma, noindex, canonical, datos estructurados y seis enlaces de Guía.
- No se ejecutó `npm run build`, ni `hosting_deploy`, ni se editó `public_html` fuera de la carpeta francesa.
- La comprobación HTTP con navegador externo no estuvo disponible desde esta sesión; NO anunciar QA visual/HTTP completo.

## Próxima sesión (Work puede revisar desde el viernes 2026-11-20)
1. Comparar HEAD remoto FR con archivos reales de Hostinger y esta nota; no empezar de cero ni volver a traducir las seis páginas.
2. Capturar QA visual 390 px y 1440 px de Inicio, Guía, Transportes y nuevas fichas, con imágenes, enlaces, menús, mapas, widget Rentcars y WhatsApp.
3. Revisar las 5 fotografías de Inicio reportadas como faltantes, sin mover ni reemplazar recursos aprobados.
4. Secciones dinámicas de Guía aún pendientes: `/guia/pix/`, `/guia/donde-alojarse/`, `/guia/mes-a-mes/`. Sus HTML incluyen JSON de datos e JS y NO deben darse por traducidos aplicando solo el diccionario a textos estáticos. Los diccionarios previos están en PR #25.
5. Portada PT/EN: 97 claves y 15 mejoras editoriales por idioma están en Git producción, pero los cambios nuevos siguen sin publicarse por build masivo fallido. NO repetirlo. Resolver únicamente mediante revisión humana independiente de PR #45 y build incremental validado de 3 páginas; confirmar HTTP después.
6. Orden prioritario del propietario: INICIO completo ES/PT/EN/FR; GUÍA DE RÍO; TRANSPORTES; HOSPEDAJE; resto. Francés pasa a indexación solo después de QA final y autorización editorial; conservar los 3.588 URL existentes.

## Commits orientativos de esta sesión
- Primera ficha nueva Accesibilidad: `18d6b51df66ed028b2b7e23caf19fad88b030408`.
- Documentos: `4528b7451ed174c1d54d0d4438a078818536186b`.
- Seguro: `10df38694c05af080d46d7369794fd83f82b4040`.
- CPF: `2c57f6aec6ab526a5a672e118bbf45d38abd6bc0`.
- Terminales: `65c67884327f4955e0da3ab375327850eca4f619`.
- Alquiler auto: `82b73bfcdd20ecf1edc5a9acc4004e5f8430b3ef`.
- Último commit de enlace Transportes->Alquiler de auto: `a08efe36d6fe9a5d026ec12a890f01900fb5f00f`.
Verificar SHA actual de la rama antes de nuevos cambios; esta nota genera un commit posterior.
