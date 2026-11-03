"""Add contextual navigation without rewriting existing editorial content or assets.
Run against a scoped release directory or after the multilingual build.
"""
import pathlib,sys,re,html
ROOT=pathlib.Path(sys.argv[1]); mappings={}
def add(hub,targets):
 mappings.setdefault(hub,{}).update(dict(targets))
# Labels use the language of each published route, rather than a shared Spanish fallback.
for pre,lang in [('',0),('/pt',1),('/en',2)]:
 for hub in ['barrios','vida-nocturna','experiencias']:
  add(pre+'/'+hub+'/',[(pre+'/'+p+'/',label[lang])for p,label in [
   ('barrios',['Barrios de Río','Bairros do Rio','Rio neighbourhoods']),('vida-nocturna',['Vida nocturna','Vida noturna','Nightlife']),('experiencias',['Experiencias y recorridos','Experiências e passeios','Experiences and tours'])]if p!=hub])
 add(pre+'/destinos/buzios/',[(pre+'/destinos/buzios/'+p+'/',label[lang])for p,label in [('gastronomia-argentina',['Cocina argentina en Búzios','Cozinha argentina em Búzios','Argentinian food in Búzios']),('servicios',['Servicios para tu estancia','Serviços para sua estadia','Services for your stay'])]])
add('/en/experiencias/',[('/en/experiencias/pequena-africa/','Little Africa: Afro-Brazilian heritage walk')])
for pre,lang in [('/pt',0),('/en',1)]:
 add(pre+'/familia/',[(pre+'/familia/parques/',['Parques para visitar em família','Parks to visit as a family'][lang])])
 add(pre+'/transportes/',[(pre+'/transportes/alquiler-vehiculo/',['Aluguel de veículo: planeje o trajeto','Car rental: plan your journey'][lang])])
add('/en/familia/',[('/en/familia/playas/','Beaches for a family day out')])
add('/en/hospedaje/',[('/en/hospedaje/estudio-1-1/','Studio for two: enquire about location and availability')])
add('/pt/compras/',[('/pt/compras/'+p+'/',label)for p,label in [('nova-america','Shopping Nova América'),('rio-sul','Shopping Rio Sul'),('saara','Saara: comércio no Centro')]])
add('/pt/cultura/',[('/pt/cultura/'+p+'/',label)for p,label in [('biblioteca-parque-estadual','Biblioteca Parque Estadual'),('casa-rui-barbosa','Casa de Rui Barbosa'),('nossa-senhora-penna','Igreja de Nossa Senhora da Penna'),('rival-petrobras','Teatro Rival'),('ziembinski','Teatro Municipal Ziembinski')]])
for route,targets in mappings.items():
 path=ROOT/route.strip('/')/'index.html'
 if not path.exists():continue
 text=path.read_text();text=re.sub(r'\n?<nav data-gsc-related="20261102".*?</nav>\n?', '',text,flags=re.S)
 lang='pt'if route.startswith('/pt/')else'en'if route.startswith('/en/')else'es'
 title={'es':'Continúa explorando','pt':'Continue explorando','en':'Keep exploring'}[lang]
 links=' · '.join('<a href="'+html.escape(url)+'">'+html.escape(label)+'</a>'for url,label in targets.items())
 nav='\n<nav data-gsc-related="20261102" aria-label="'+title+'" style="max-width:1120px;margin:2rem auto;padding:1.25rem;border-top:1px solid #c9a45c;line-height:2;color:inherit"><strong>'+title+'</strong><br>'+links+'</nav>\n'
 assert '</body>'in text,str(path)
 text=text.replace('</body>',nav+'</body>',1);path.write_text(text)
 print(route)

# Refresh changed renderers while preserving site.js and Carioc-IA.
for path in ROOT.rglob("index.html"):
 text=path.read_text();updated=text
 for entry in ['buzios-beach-detail-v2.js','buzios-restaurant-profile-view.js','buzios-food-guide.js']:
  pattern=r"(src=[\"'][^\"']*"+re.escape(entry)+r")(?:\?[^\"']*)?([\"'])"
  updated=re.sub(pattern,lambda m:m[1]+'?v=20261103-gsc'+m[2],updated)
 if updated!=text:path.write_text(updated)

# The standalone restaurant renderer does not import the common text translator.
for path in ROOT.rglob("index.html"):
 text=path.read_text();route='/'+str(path.relative_to(ROOT))
 if 'buzios-restaurant-profile-view.js' not in text:continue
 label='Guia independente de Búzios' if route.startswith('/pt/') else 'Independent guide to Búzios' if route.startswith('/en/') else 'Guía independiente de Búzios'
 updated=text.replace('Guía independiente de Búzios',label)
 if updated!=text:path.write_text(updated)
