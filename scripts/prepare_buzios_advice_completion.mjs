import fs from'node:fs';import first from'./write_buzios_advice_completion.mjs';import more from'./buzios_advice_more.mjs';import coast from'./buzios_advice_coast.mjs';
const pages={...first,...more,...coast},content=JSON.parse(fs.readFileSync('assets/data/buzios-advice-content.json'));
Object.assign(content,pages);content.hub.primary=[...new Set([...content.hub.primary,...Object.keys(pages)])];
fs.writeFileSync('assets/data/buzios-advice-content.json',JSON.stringify(content,null,2)+'\n');
const photos=JSON.parse(fs.readFileSync('assets/data/buzios-advice-photos.json'));photos[8001]={id:8001,url:'https://mediumturquoise-stinkbug-270478.hostingersite.com/FOTOS/HOME/BUZIOS/PLAYAS/ARMACAO/ARMACAO4.jpg',path:'PLAYAS/ARMACAO/ARMACAO4.jpg',width:1600,height:900,alt:['Barcos en Praia da Armação','Barcos na Praia da Armação','Boats at Praia da Armação']};fs.writeFileSync('assets/data/buzios-advice-photos.json',JSON.stringify(photos,null,2)+'\n');
fs.writeFileSync('../release-advice-completion/routes.json',JSON.stringify(['/destinos/buzios/consejos/',...Object.keys(pages).map(x=>'/destinos/buzios/consejos/'+x+'/')],null,2));console.log('Eight complete new topics, 16 advice cards total');
