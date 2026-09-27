export const EC_CONFIG = Object.freeze({
  siteName:"Ernestinho Carioca",
  origin:"https://www.ernestinhocarioca.com.br",
  defaultLocale:"es",
  locales:["es","pt-BR","en"],
  social:{
    instagram:"https://www.instagram.com/ernestinhocarioca/",
    tiktok:"https://www.tiktok.com/@ernestojdojeda",
    whatsapp:"https://wa.me/5521969946938"
  }
});

export function canonicalUrl(pathname="/") {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(path, EC_CONFIG.origin).href;
}
