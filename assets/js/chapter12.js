(() => {
'use strict';
const ids=['shipments','events','peak','calls','quota','workers','seconds','burst'];
function calculate(){
 const inputs=ids.map(id=>document.getElementById('cap-'+id));const result=document.getElementById('capacity-result');
 if(inputs.some(i=>!i.value.trim()||!i.checkValidity()||!Number.isFinite(Number(i.value)))){result.textContent='Enter valid positive values within the ranges shown. Whole-number fields must be integers.';return;}
 const [shipments,events,peak,calls,quota,workers,seconds,burst]=inputs.map(i=>Number(i.value));
 const normal=shipments*events/86400,arrival=normal*peak,limit=quota/60/calls,worker=workers/seconds,service=Math.min(limit,worker),backlog=Math.max(0,arrival-service)*burst*60;
 const drain=service>normal?backlog/(service-normal)/60:null;
 result.textContent=`Average: ${normal.toFixed(3)} events/s. Peak: ${arrival.toFixed(3)} events/s. Effective capacity: ${service.toFixed(3)} events/s (${limit<=worker?'API quota':'worker throughput'} limits it). Burst backlog: ${Math.round(backlog).toLocaleString()} events. Estimated end-of-burst waiting time: ${(backlog/service/60).toFixed(1)} minutes. ${drain===null?'Unstable: capacity does not exceed normal arrivals; the backlog cannot reliably drain.':`Drain time after the burst: ${drain.toFixed(1)} minutes.`} ${backlog/service>300?'The estimated queue wait alone exceeds the proposed five-minute freshness window.':'This model alone does not establish the freshness target; measure processing and source delay too.'}`;
}
document.getElementById('capacity-calculate').addEventListener('click',calculate);
calculate();
document.getElementById('failure-check').addEventListener('click',()=>{
 const answer=document.querySelector('input[name="failure-12"]:checked');
 document.getElementById('failure-result').textContent=!answer?'Choose a response first.':answer.value==='1'?'Correct. Keep the operation key stable for one intent, reject a different payload under that key, and commit the review and deduplication result atomically. Define retention and concurrent-request handling as part of the API contract.':'Reconsider the user’s intent. A fresh key cannot identify a duplicate, and prohibiting retries does not resolve an ambiguous first result. Reuse an operation key with atomic result storage and payload validation.';
});
})();
