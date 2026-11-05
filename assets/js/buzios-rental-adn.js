// Preserve the approved complete rental layout; apply the shared Ernestinho palette.
const style=`
.bz-rental-experience[data-bz-rental-adn]{--r-ink:var(--ink,#061817);--r-deep:var(--deep,#092522);--r-teal:var(--petrol2,#1a504a);--r-gold:var(--amber,#d7a43b);--r-sand:#f7f5ef;--r-paper:var(--paper,#fff);--r-coral:var(--amber,#d7a43b);font-family:var(--sans)}
.bz-rental-experience :is(h1,h2,h3,h4){font-family:var(--display,var(--serif))!important}
.bz-rental-experience :is(.bz-rental-card,.bz-rental-manifesto,.bz-rental-index){box-shadow:none}
.bz-rental-experience :is(.bz-rental-card,.bz-rental-manifesto,.bz-rental-balance>div){border-radius:var(--r,24px)}
.bz-rental-experience :is(.bz-rental-cta,.bz-rental-hero-actions a,.bz-rental-nav a){font-family:var(--ec-action,var(--sans));letter-spacing:.03em}
main.bz-shell:has(.bz-rental-experience){padding-top:0}
`;
export function apply(){const root=document.querySelector('.bz-rental-experience');if(!root)return;document.querySelector('main.bz-shell > section.hero')?.remove();const existing=document.getElementById('bz-rental-adn');if(existing)existing.textContent=style;else{const s=document.createElement('style');s.id='bz-rental-adn';s.textContent=style;document.head.append(s);}root.dataset.bzRentalAdn='approved-complete-layout';}
export const ready=(async()=>{const script=[...document.querySelectorAll('script[type="module"][src]')].find(s=>new URL(s.src).pathname.endsWith('/buzios-page.js'));if(script){const page=await import(script.src);if(page.ready)await page.ready;}apply();})();
