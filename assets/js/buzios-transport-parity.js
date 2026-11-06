// Only the existing Búzios booking form needs a controller on these static pages.
const form=document.getElementById('bz-transfer-form');
if(form){
 const lang=location.pathname.startsWith('/pt/')?'PT':location.pathname.startsWith('/en/')?'EN':'ES';
 const date=form.querySelector('input[type="date"]');if(date)date.min=new Date().toLocaleDateString('en-CA');
 form.addEventListener('submit',event=>{
  event.preventDefault();if(!form.reportValidity())return;
  const message=[{ES:'Ernestinho Carioca · Traslado Río ↔ Búzios',PT:'Ernestinho Carioca · Transfer Rio ↔ Búzios',EN:'Ernestinho Carioca · Rio ↔ Búzios transfer'}[lang],...Array.from(new FormData(form),([key,value])=>key+': '+value),{ES:'Por favor confirmar precio vigente, disponibilidad y condiciones.',PT:'Por favor, confirme o preço atual, a disponibilidade e as condições.',EN:'Please confirm the current price, availability and terms.'}[lang]].join('\n');
  window.open('https://wa.me/5521969946938?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');
 });
}
