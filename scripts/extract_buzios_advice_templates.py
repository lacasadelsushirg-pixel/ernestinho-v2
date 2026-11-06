from pathlib import Path
from lxml import html
import json
p=Path('assets/data/buzios-advice-templates.json');data=json.loads(p.read_text());mapping={'equipaje':'maletas-rio','lo-que-nadie-explica':'nadie-explica','revisar-alojamiento':'revisar-alojamiento','que-hacer-cada-dia':'que-hacer-cada-dia','souvenirs':'souvenirs','trampas-turista':'trampas-turista','estado-del-mar':'estado-del-mar-playas','paseo-centro-orla':'recorrido-zona-portuaria'}
for key,slug in mapping.items():
 src='consejos/'+slug+'/index.html';d=html.fromstring(Path(src).read_bytes());data[key]={'source':src,'styles':d.xpath('//head/style/text()'),'css':d.xpath('//head/link[@rel="stylesheet"]/@href'),'main':html.tostring(d.xpath('//main')[0],encoding='unicode')}
p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
print('Extracted eight exact Río DOM and style templates')
