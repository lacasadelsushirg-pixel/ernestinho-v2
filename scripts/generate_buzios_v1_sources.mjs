import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const routes=[
  '/destinos/',
  '/destinos/buzios/',
  '/destinos/buzios/playas/',
  '/destinos/buzios/alojamiento/',
  '/destinos/buzios/como-llegar/',
  '/destinos/buzios/moverse/',
  '/destinos/buzios/que-hacer/',
  '/destinos/buzios/comer-y-salir/',
  '/destinos/buzios/cruceros/',
  '/destinos/buzios/consejos/',
  '/destinos/buzios/experiencias/',
  '/destinos/buzios/experiencias/arraial-do-cabo/',
  '/destinos/buzios/experiencias/cabo-frio/',
  '/destinos/buzios/experiencias/rio-desde-buzios/',
  '/destinos/buzios/experiencias/paseo-barco/',
  '/destinos/buzios/experiencias/paseo-buggy/',
  '/destinos/buzios/experiencias/alquiler-buggy/',
  '/destinos/buzios/experiencias/jardinera/',
  '/destinos/buzios/experiencias/trekking/',
  '/destinos/buzios/experiencias/buceo/',
  '/destinos/buzios/experiencias/full-day-buzios/'
];

for(const route of routes){
  const destination=path.join(root,route.slice(1),'index.html');
  const canonical='https://www.ernestinhocarioca.com.br'+route;
  const html=`<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#071c1b">
  <title>Búzios | Ernestinho Carioca</title>
  <meta name="description" content="Guía Búzios 360 de Ernestinho Carioca.">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Búzios | Ernestinho Carioca">
  <meta property="og:description" content="Guía Búzios 360 de Ernestinho Carioca.">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="Ernestinho Carioca">
  <meta property="og:image" content="https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto:good,c_limit,w_1600/IMG_3079">
  <meta property="og:image:alt" content="Búzios con Ernestinho Carioca">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Búzios | Ernestinho Carioca">
  <meta name="twitter:description" content="Guía Búzios 360 de Ernestinho Carioca.">
  <meta name="twitter:image" content="https://res.cloudinary.com/qa301cbc/image/upload/f_auto,q_auto:good,c_limit,w_1600/IMG_3079">
  <link rel="canonical" href="${canonical}">
  <link rel="stylesheet" href="/assets/css/tokens.css">
  <link rel="stylesheet" href="/assets/css/app.css">
  <link rel="stylesheet" href="/assets/css/components.css">
  <link rel="stylesheet" href="/assets/css/buzios.css">
  <link rel="icon" type="image/png" sizes="192x192" href="/assets/brand/ec-mark.png">
  <link rel="apple-touch-icon" href="/assets/brand/ec-mark.png">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"Búzios | Ernestinho Carioca","description":"Guía Búzios 360 de Ernestinho Carioca.","url":"${canonical}","inLanguage":"es","isPartOf":{"@type":"WebSite","name":"Ernestinho Carioca","url":"https://www.ernestinhocarioca.com.br/"}}</script>
</head>
<body>
  <a class="skip" href="#bz-app">Saltar al contenido</a>
  <header class="topbar"><a class="brand" href="/" aria-label="Ernestinho Carioca"><img src="/assets/brand/ec-mark.png" alt="Ernestinho Carioca" width="44" height="44"></a><nav></nav><div class="tools"></div></header>
  <div id="bz-app"><main><h1>Búzios con Ernestinho Carioca</h1><p>Guía editorial y experiencias para preparar una estadía en Búzios.</p></main></div>
  <section class="ec-corporate-closing" id="bz-footer"></section>
  <script type="module" src="/assets/js/site.js"></script>
  <script type="module" src="/assets/js/buzios-page.js"></script>
</body>
</html>`;
  fs.mkdirSync(path.dirname(destination),{recursive:true});
  fs.writeFileSync(destination,html);
}
console.log(`Generated ${routes.length} Búzios V1 source pages.`);
