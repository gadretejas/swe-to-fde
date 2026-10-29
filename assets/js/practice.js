// Additional local practice feedback. These are instructional rubrics, not AI judgments.
(() => {
const panels=document.querySelectorAll('[data-exercise]');
function resultFor(panel){let r=panel.querySelector(':scope > .practice-result');if(!r){r=document.createElement('p');r.className='practice-result quiz-explanation';r.setAttribute('role','status');panel.append(r);}return r;}
function groups(panel){return [...panel.querySelectorAll('.practice-options')];}
function selected(g){const i=g.querySelector('input:checked');return i?Number(i.value):null;}
panels.forEach(panel=>{
 const kind=panel.dataset.exercise;
 if(kind==='role-assignment'||kind==='classification'){
  const correct=kind==='role-assignment'?[0,2,3,1]:[0,1,2,3];
  const explanation=kind==='role-assignment'?'Typical owners: SWE improves the core product; SE leads a pre-sales evaluation; SA defines architecture; FDE implements and deploys the customer integration. Actual team boundaries vary.':'Business states the outcome; functional describes system behavior; nonfunctional specifies measurable quality; constraints define mandatory boundaries.';
  const b=document.createElement('button');b.type='button';b.textContent='Review my choices';panel.append(b);b.onclick=()=>{const gs=groups(panel);if(gs.some(g=>selected(g)===null)){resultFor(panel).textContent='Choose an answer for every item first.';return;}const score=gs.filter((g,i)=>selected(g)===correct[i]).length;resultFor(panel).textContent=`${score}/${correct.length} correct. ${explanation}`;};
 }
 if(kind==='traceability'){
  const b=document.createElement('button');b.textContent='Check traceability chains';panel.append(b);b.onclick=()=>{const sels=[...panel.querySelectorAll('select')];if(sels.some(s=>s.value==='')){resultFor(panel).textContent='Choose a requirement and evidence for all three needs.';return;}let score=0;for(let i=0;i<3;i++)if(sels[i*2].value===String(i)&&sels[i*2+1].value===String(i))score++;resultFor(panel).textContent=`${score}/3 complete chains. Match discrepancy finding → highlighted mismatches → analyst test; auditability → actor/timestamp history → reconstruction test; access control → authorization → negative access tests.`;};
 }
 if(kind==='career-exploration'){
  const update=()=>{const gs=groups(panel),values=gs.map(selected).filter(v=>v!==null);if(!values.length)return;const counts=[0,0,0,0];values.forEach(v=>counts[v]++);const roles=['SWE','FDE','Solutions Engineer','Solutions Architect'];const max=Math.max(...counts);resultFor(panel).textContent=`${values.length}/${gs.length} reflections answered. Your selections lean toward ${roles.filter((r,i)=>counts[i]===max).join(' and ')} activities. This is a conversation starter, not a career diagnosis. Compare actual job responsibilities and working conditions.`;};panel.addEventListener('change',update);update();
 }
 if(kind==='career-reflection'){
  const update=()=>{const gs=groups(panel),values=gs.map(selected);const count=values.filter(v=>v!==null).length;resultFor(panel).textContent=`${count}/${gs.length} answered. Review items you rated 4–5 alongside your preferences for uninterrupted coding, travel, and predictable schedules. Use these reflections to form questions for a hiring manager; there is no universal FDE fit score.`;};panel.addEventListener('change',update);update();
 }
 if(kind==='checklist'){
  const update=()=>{const all=[...panel.querySelectorAll('input[type="checkbox"]')];resultFor(panel).textContent=`${all.filter(e=>e.checked).length}/${all.length} reviewed. This is a learning checklist, not customer approval or production certification.`;};panel.addEventListener('change',update);update();
 }
 if(kind==='architecture'){
  const choices=['Existing TMS: verify the platform can meet the required workflow before investing in custom development. Lower integration complexity may be offset by functional limitations.','Rules-based workbench: test representative exceptions and dispatcher usability. Transparent rules fit known categories but require maintenance.','AI-assisted workbench: evaluate unstructured cases against a rules baseline. Confirm error handling, monitoring, human review, and operating costs.'];const update=()=>{const g=groups(panel)[0],v=g?selected(g):null;if(v!==null)resultFor(panel).textContent=choices[v];};panel.addEventListener('change',update);update();
 }
 if(kind==='delivery'){
  const update=()=>{const g=groups(panel)[0],v=g?selected(g):null;if(v===null)return;resultFor(panel).textContent=['Core pilot: validate the estimate against API access, security review, and testing dependencies.','Expanded scope: estimate the added email and predictive-alert work before agreeing to the six-week milestone. Present scope, staffing, or schedule alternatives.','Autonomous actions: a new scope and governance decision is required. Evaluate authorization, auditability, rollback and operational risk before committing.'][v];};panel.addEventListener('change',update);update();
 }
});
document.querySelectorAll('.lesson textarea').forEach(t=>{const count=document.createElement('p');count.className='draft-hint';const update=()=>count.textContent=`${t.value.trim()?t.value.trim().split(/\s+/).length:0} words · Saved locally as you type`;t.after(count);t.addEventListener('input',update);update();});
})();
