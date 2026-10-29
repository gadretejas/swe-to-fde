(() => {'use strict';
const result=document.getElementById('validation13'),preview=document.getElementById('normalized13');
document.getElementById('validate13').addEventListener('click',()=>{
 preview.hidden=true;preview.textContent='';let p;
 try{p=JSON.parse(document.getElementById('payload13').value);}catch{result.textContent='Invalid JSON. Check quotation marks, commas, and braces.';return;}
 if(!p||typeof p!=='object'||Array.isArray(p)){result.textContent='Expected one event object, not an array or primitive.';return;}
 const errors=[];for(const k of ['event_id','shipment_id','depot_id'])if(typeof p[k]!=='string'||!p[k].trim())errors.push(k+' must be a nonempty string');
 if(!Number.isSafeInteger(p.version)||p.version<1)errors.push('version must be a positive safe integer');
 if(!['pending','in_transit','delayed','delivered','cancelled'].includes(p.status))errors.push('status is unknown; obtain an approved mapping');
 const t=p.updated_at;const shape=typeof t==='string'&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(t);const stamp=shape?Date.parse(t):NaN;
 if(!shape||!Number.isFinite(stamp)||new Date(stamp).toISOString().replace('.000Z','Z')!==t)errors.push('updated_at must be a real UTC date in YYYY-MM-DDTHH:mm:ssZ form');
 if(errors.length){result.textContent='Needs correction: '+errors.join('; ')+'.';return;}
 const normalized={};for(const k of ['event_id','shipment_id','depot_id','version','status','updated_at'])normalized[k]=p[k];
 result.textContent='Valid structure for this exercise. Authenticity, authorization, and ordering still need separate checks.';preview.textContent=JSON.stringify(normalized,null,2);preview.hidden=false;
});
document.getElementById('review13').addEventListener('click',()=>{const pick=document.querySelector('input[name="recover13"]:checked');document.getElementById('recovery13').textContent=!pick?'Choose a recovery action first.':pick.value==='1'?'Correct. Commit application and duplicate detection consistently, then acknowledge the redelivered event without repeating its effect.':'Review the crash boundary. Redelivery is expected; durable deduplication and version checks prevent a repeated effect without discarding unrelated work.';});
})();
