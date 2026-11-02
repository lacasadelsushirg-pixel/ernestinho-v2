export const EDITORIAL_META_OVERRIDES={
  "/gastronomia/arp-bar/": {
    "PT": {
      "title": "Arp Bar: guia gastronômico em Ipanema | Ernestinho Carioca"
    },
    "EN": {
      "title": "Arp Bar: dining guide in Ipanema | Ernestinho Carioca"
    }
  },
  "/gastronomia/bafo-da-prainha/": {
    "PT": {
      "title": "Bafo da Prainha: guia de visita | Ernestinho Carioca"
    },
    "EN": {
      "title": "Bafo da Prainha: visitor guide | Ernestinho Carioca"
    }
  },
  "/gastronomia/quiteria/": {
    "PT": {
      "title": "Quitéria em Ipanema: guia gastronômico | Ernestinho Carioca"
    },
    "EN": {
      "title": "Quitéria in Ipanema: dining guide | Ernestinho Carioca"
    }
  },
  "/gastronomia/classico-leme/": {
    "PT": {"description": "Guia do Clássico Beach Club Leme: ambiente à beira-mar, pratos, horários, transporte, mapa e dicas para planejar a visita no Rio."},
    "EN": {"description": "Clássico Beach Club Leme guide: beachfront atmosphere, food, opening hours, transport, a map and tips for planning a visit to Rio."}
  },
  "/gastronomia/cosmopolita/": {
    "PT": {
      "description": "História do antigo restaurante Cosmopolita na Lapa e do filé à Oswaldo Aranha. Endereço histórico; não há serviço gastronômico atual confirmado."
    },
    "EN": {
      "description": "History of the former Cosmopolita restaurant in Lapa and filé à Oswaldo Aranha. Historic address; no current restaurant service is confirmed."
    }
  }
};

export function localizeEditorialTitle(title, language) {
 const key=String(language).slice(0,2).toUpperCase();
 if(key==="PT")return title.replace(/guía completa/gi,"guia completo");
 if(key==="EN")return title.replace(/guía completa/gi,"complete guide");
 return title;
}

// Keep the reviewed shopping descriptions when runtime SEO initializes.
EDITORIAL_META_OVERRIDES["/compras/feira-sao-cristovao/"]={"PT": {"description": "Recomendo conhecer a Feira de São Cristóvão com tempo e respeito. Para mim, ela é mais do que um lugar para comer ou ouvir música: é uma referência da cultura nordestina no Rio, com gastronomia, artesanato, forró, produtos regionais e histórias de quem chegou à cidade."}, "EN": {"description": "I recommend taking your time at Feira de São Cristóvão and approaching it with respect. To me, it is more than a place to eat or listen to music: it is a touchstone of Northeastern culture in Rio, with food, crafts, forró, regional products and stories of people who came to the city."}};
EDITORIAL_META_OVERRIDES["/compras/mercadao-madureira/"]={"PT": {"description": "Vou mostrar a você um Rio de Janeiro intenso, cotidiano e cheio de histórias de compras, trabalho, fé e encontros."}, "EN": {"description": "I'll show you a lively, everyday side of Rio de Janeiro full of stories of shopping, work, faith and community."}};
EDITORIAL_META_OVERRIDES["/compras/uruguaiana/"]={"PT": {"description": "Vou mostrar um Centro do Rio intenso, prático e cheio de possibilidades, mas que merece ser explorado com atenção."}, "EN": {"description": "I'll show you a busy and practical side of downtown Rio, full of possibilities but best explored with care."}};

EDITORIAL_META_OVERRIDES["/gastronomia/xian/"]={"PT": {"description": "Guia editorial de Xian: identidade, história, recomendações, horários, transporte e mapa no Rio."}, "EN": {"description": "Editorial guide to Xian: identity, history, recommendations, opening hours, transport and a map in Rio."}};
