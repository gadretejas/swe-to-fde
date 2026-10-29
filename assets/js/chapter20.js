(() => {
'use strict';
document.getElementById('calculate20').addEventListener('click',()=>{
 const fields=['build20','deploy20','save20','adopt20','maint20','months20'].map(id=>document.getElementById(id));
 const out=document.getElementById('result20');
 if(fields.some(e=>e.value.trim()===''||!e.checkValidity()||!Number.isFinite(Number(e.value)))){out.textContent='Enter valid nonnegative values. Deployments must be whole numbers; the horizon must be 1–120 whole months.';return;}
 const [build,n,saved,adopt,maint,months]=fields.map(e=>Number(e.value));
 const gross=n*saved, adoption=n*adopt, maintenance=maint*months, fixed=build+maintenance, per=saved-adopt, net=gross-adoption-fixed;
 const fmt=n=>Number(n.toFixed(2)).toLocaleString('en-US');
 const threshold=per>0 ? `${Math.ceil(fixed/per)} adopting deployments cover fixed effort over this horizon.` : per===0&&fixed===0 ? 'Every deployment breaks even on effort; none creates net savings.' : per<0&&fixed===0 ? 'Zero deployments break even; each adoption adds net effort.' : 'No deployment-count break-even under these assumptions: each adoption saves no positive net effort.';
 out.textContent=`Gross savings: ${fmt(gross)} hours. Adoption: ${fmt(adoption)} hours. Build: ${fmt(build)} hours. Maintenance: ${fmt(maintenance)} hours. Net hours saved: ${fmt(net)}. ${threshold} This is an effort estimate, not a payback date or an automatic investment decision.`;
});
document.getElementById('decision-check20').addEventListener('click',()=>{
 const selected=document.querySelector('input[name="decision20"]:checked');
 document.getElementById('decision-result20').textContent=!selected?'Select a decision first.':selected.value==='1'?'Correct. Test the shared contract through independent adoption while keeping unproven transport requirements separate.':'Reconsider the evidence: only record validation is known to be shared. Test that narrow boundary before expanding the scope.';
});
})();
