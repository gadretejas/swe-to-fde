(()=>{'use strict';
document.getElementById('calculate21').addEventListener('click',()=>{
 const fields=['hours21','overhead21','reserve21','harbor21','north21','meridian21'].map(id=>document.getElementById(id));const out=document.getElementById('result21');
 if(fields.some(e=>e.value.trim()===''||!e.checkValidity()||!Number.isFinite(Number(e.value)))){out.textContent='Enter a number from 0 to 168 in every field.';return;}
 const [hours,overhead,reserve,a,b,c]=fields.map(e=>Number(e.value));
 if(overhead+reserve>hours){out.textContent='Overhead plus reserve exceeds available hours. Revise those assumptions before planning delivery.';return;}
 const capacity=hours-overhead-reserve,demand=a+b+c,balance=capacity-demand;const fmt=n=>Number(n.toFixed(1));
 out.textContent=`Planned delivery capacity: ${fmt(capacity)} hours. Delivery demand: ${fmt(demand)} hours. ${balance<0?'Capacity gap: '+fmt(-balance):'Unallocated delivery capacity: '+fmt(balance)} hours. Demand / capacity: ${capacity>0?fmt(demand/capacity*100)+'%':'undefined (zero delivery capacity)'}. Check skills, dependencies, and deadlines before committing; this calculation does not schedule the work.`;
});
document.getElementById('decision-check21').addEventListener('click',()=>{const selected=document.querySelector('input[name="decision21"]:checked');document.getElementById('decision-result21').textContent=!selected?'Select a decision first.':selected.value==='1'?'Correct. Respond to verified impact, make displaced commitments visible, and agree the trade-off with the responsible owner.':'Reconsider: severity comes from impact and the incident process. Incompatible promises and hidden overtime do not resolve the capacity conflict.';});})();
