#!/usr/bin/env python3
"""Expand the existing redirects to their language equivalents; keep ES unchanged."""
import json
from pathlib import Path
p=Path(__file__).resolve().parents[1]/'vercel.json'
data=json.loads(p.read_text())
base=[r for r in data['redirects'] if not r['source'].startswith(('/pt/','/en/'))]
localized=[]
for locale in ('pt','en'):
    for r in base:
        if not r['destination'].startswith('/'):continue
        localized.append({**r,'source':'/'+locale+r['source'],'destination':'/'+locale+r['destination']})
data['redirects']=base+localized
p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
print('Preserved ES redirects:',len(base),'; locale equivalents:',len(localized))
