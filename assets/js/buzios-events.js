// The calendar uses Búzios local dates, including on devices in other time zones.
export function todayInBuzios(now=new Date()){const p=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);const v=k=>p.find(x=>x.type===k).value;return `${v('year')}-${v('month')}-${v('day')}`;}
export function agendaMatches(item,{today,scope='upcoming',month='all'}){return(scope==='year'||item.end>=today)&&(month==='all'||item.start.slice(5,7)===month||item.end.slice(5,7)===month);}
const root=typeof document==='undefined'?null:document.querySelector('#bz-events');
if(root){let scope='upcoming',month='all';const today=todayInBuzios();const setPressed=(b,on)=>{b.setAttribute('aria-pressed',String(on));b.classList.toggle('bg-teal-500',on);b.classList.toggle('text-white',on);b.classList.toggle('bg-white/10',!on);b.classList.toggle('text-slate-200',!on);};
root.querySelectorAll('[data-event-category][data-end]').forEach(c=>{const badge=c.querySelector('[data-edition-badge]');if(badge&&c.dataset.end&&c.dataset.end<today)badge.textContent=root.dataset.referenceLabel;});
root.querySelectorAll('[data-event-filter]').forEach(b=>b.addEventListener('click',()=>{const cat=b.dataset.eventFilter;root.querySelectorAll('[data-event-filter]').forEach(x=>setPressed(x,x===b));root.querySelectorAll('[data-event-category]').forEach(c=>c.hidden=cat!=='all'&&c.dataset.eventCategory!==cat);}));
const update=()=>{let count=0;root.querySelectorAll('[data-agenda-item]').forEach(x=>{x.hidden=!agendaMatches({start:x.dataset.start,end:x.dataset.end},{today,scope,month});if(!x.hidden)count++;});const empty=root.querySelector('[data-agenda-empty]');if(empty)empty.hidden=!!count;};
root.querySelectorAll('[data-agenda-scope]').forEach(b=>b.addEventListener('click',()=>{scope=b.dataset.agendaScope;root.querySelectorAll('[data-agenda-scope]').forEach(x=>setPressed(x,x===b));update();}));root.querySelector('#event-month')?.addEventListener('change',e=>{month=e.target.value;update();});update();
const note=root.querySelector('[data-edition-note]');if(note?.dataset.end&&note.dataset.end<today)note.textContent=root.dataset.archivedNote;
}
