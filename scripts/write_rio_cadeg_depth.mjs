// Add visit-planning depth to the existing CADEG page without changing layout.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const heading = ['Cómo sacarle partido al mercado', 'Como aproveitar melhor o mercado', 'How to make the most of the market'];
const link = ['Planifica el trayecto →', 'Planeje o trajeto →', 'Plan the journey →'];
const paragraphs = [
  [
    'Antes de ir, decide si tu prioridad son las flores, los productos para cocinar, una comida o simplemente recorrer el mercado. El lugar tiene muchas opciones y conviene dejar tiempo para mirar; si tienes una compra concreta en mente, confirma directamente si ese sector y ese servicio estarán disponibles ese día. No des por hecho que todos los puestos siguen el mismo ritmo.',
    'Antes de ir, decida se sua prioridade são flores, produtos para cozinhar, uma refeição ou simplesmente conhecer o mercado. O lugar tem muitas opções e vale reservar tempo para olhar; se tiver uma compra específica em mente, confirme diretamente se aquele setor e serviço estarão disponíveis no dia. Não presuma que todas as bancas funcionam no mesmo ritmo.',
    'Before you go, decide whether you are mainly interested in flowers, ingredients, a meal or simply exploring the market. There is a lot to see, so allow time to browse; if you have a particular purchase in mind, check directly whether that section and service will be available that day. Do not assume every stall follows the same schedule.',
  ],
  [
    'Si compras algo voluminoso o delicado, piensa cómo lo vas a llevar y confirma el regreso antes de cargarlo. Para comer, revisa la carta y las formas de pago en el establecimiento que te interese; en un mercado grande es fácil perder la noción del tiempo. Si después quieres conocer São Cristóvão u otro punto, sepáralo como una segunda visita y calcula el traslado por dirección, no solo por barrio.',
    'Se comprar algo volumoso ou delicado, pense em como vai transportar e planeje a volta antes de carregar as compras. Para comer, confira o cardápio e as formas de pagamento no estabelecimento escolhido; num mercado grande é fácil perder a noção do tempo. Se depois quiser conhecer São Cristóvão ou outro lugar, trate como uma segunda visita e calcule o trajeto pelo endereço, não apenas pelo bairro.',
    'If you buy something bulky or delicate, think about how you will carry it and plan your return before setting off with your purchases. For a meal, check the menu and payment methods with the venue you have in mind; it is easy to lose track of time in a large market. If you also want to visit São Cristóvão or another place, treat it as a second outing and plan by exact address, not just by district.',
  ],
];
const chunk=path.join(root,'assets/js/translations/chunks/barrios-02.js');
let dict=fs.readFileSync(chunk,'utf8');
const phrases={ [heading[0]]:{PT:heading[1],EN:heading[2]},[link[0]]:{PT:link[1],EN:link[2]} };
for(const p of paragraphs)phrases[p[0]]={PT:p[1],EN:p[2]};
const missing=Object.fromEntries(Object.entries(phrases).filter(([k])=>!dict.includes(`${JSON.stringify(k)}:`)));
if(Object.keys(missing).length)dict=dict.replace('export default {',`export default {${JSON.stringify(missing).slice(1,-1)},`,1);
fs.writeFileSync(chunk,dict);
const marker='RIO_CADEG_DEPTH_V1',file=path.join(root,'barrios/cadeg/index.html');
let html=fs.readFileSync(file,'utf8');
const block=`<!-- ${marker} --><section class="b" data-rio-cadeg-v1><div class="g"><article class="p"><h2>${heading[0]}</h2><p>${paragraphs[0][0]}</p></article><article class="p"><h2>${heading[0]}</h2><p>${paragraphs[1][0]}</p></article></div><p><a href="../../transportes/">${link[0]}</a></p></section><!-- /${marker} -->`;
const re=new RegExp(`<!-- ${marker} -->[\\s\\S]*?<!-- \\/${marker} -->`);
html=re.test(html)?html.replace(re,block):html.replace('</main>',`${block}</main>`);
fs.writeFileSync(file,html);
console.log('Neighborhood depth: /barrios/cadeg/');
