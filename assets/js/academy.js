(() => {
'use strict';
const KEY='swe-fde-academy.v1';
const TOTAL=window.ACADEMY.length;
const chapter=Number(document.body.dataset.chapter),prefix=document.body.dataset.prefix||'';
const fresh=()=>({version:1,completed:{},quizzes:{},fields:{},lastChapter:1});
let storageOK=true,state=fresh(),timer;
function read(){try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v&&v.version===1)state={...fresh(),...v};}catch{storageOK=false;}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{storageOK=false;document.querySelector('.save-indicator').textContent='Storage unavailable · export to keep work';} }
function toast(text){const el=document.querySelector('#toast');el.textContent=text;el.classList.add('visible');clearTimeout(timer);timer=setTimeout(()=>el.classList.remove('visible'),3500);}
read();
if(chapter){state.lastChapter=chapter;save();}
if(!storageOK)document.querySelector('.save-indicator').textContent='Storage unavailable · export to keep work';
function renderProgress(){
 const done=Object.keys(state.completed).filter(k=>state.completed[k]&&+k>=1&&+k<=TOTAL).length;
 const passed=Object.values(state.quizzes).filter(q=>q.best>=q.total*.8).length;
 document.querySelectorAll('[data-chapter]').forEach(el=>{if(el===document.body)return;const n=el.dataset.chapter;el.classList.toggle('is-complete',!!state.completed[n]);const icon=el.querySelector('.nav-state');if(icon)icon.setAttribute('aria-label',state.completed[n]?'Completed':'Not completed');const status=el.querySelector('.row-status');if(status)status.textContent=state.completed[n]?'Complete ✓':'Start lesson ↗';});
 document.querySelectorAll('.progress-label').forEach(el=>el.textContent=`${done} of ${TOTAL} chapters complete`);
 document.querySelectorAll('.mini-progress i').forEach(el=>el.style.width=`${done/TOTAL*100}%`);
 const count=document.querySelector('#completed-count');if(count){count.innerHTML=`${done}<span>/${TOTAL}</span>`;document.querySelector('#mastered-count').textContent=passed;document.querySelector('#progress-percent').textContent=Math.round(done/TOTAL*100)+'%';document.querySelector('#course-progress').value=done;}
 document.querySelectorAll('[data-module]').forEach(el=>{const m=+el.dataset.module;el.textContent=ACADEMY.filter(c=>c.module===m&&state.completed[c.id]).length+' complete';});
 document.querySelectorAll('[data-complete]').forEach(b=>{const yes=!!state.completed[b.dataset.complete];b.classList.toggle('done',yes);b.setAttribute('aria-pressed',String(yes));b.textContent=yes?'Completed ✓ · Undo':'Mark complete';});
 const resume=document.querySelector('.resume-link');if(resume){const next=ACADEMY.find(c=>c.id===state.lastChapter&&!state.completed[c.id])||ACADEMY.find(c=>!state.completed[c.id])||ACADEMY[ACADEMY.length-1];resume.href=prefix+next.path;resume.innerHTML=(done===TOTAL?'Revisit the academy':Object.keys(state.fields).length||Object.keys(state.quizzes).length||done?'Continue learning':'Start your journey')+' <span>↗</span>';}
}
renderProgress();
document.querySelectorAll('[data-complete]').forEach(b=>b.addEventListener('click',()=>{state.completed[b.dataset.complete]=!state.completed[b.dataset.complete];save();renderProgress();toast(state.completed[b.dataset.complete]?'Chapter marked complete. Nice work.':'Chapter reopened.');}));
const menu=document.querySelector('.menu-button');menu.addEventListener('click',()=>{const open=document.querySelector('.sidebar').classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelector('.sidebar').classList.remove('open');menu.setAttribute('aria-expanded','false');}});
document.querySelector('main').addEventListener('click',()=>{document.querySelector('.sidebar').classList.remove('open');menu.setAttribute('aria-expanded','false');});
// All practice drafts and review selections are stored under stable chapter/field keys.
document.querySelectorAll('[data-save]').forEach(el=>{
 const key=el.dataset.save,v=state.fields[key];
 if(v!==undefined){if(el.type==='checkbox')el.checked=v===true;else if(el.type==='radio')el.checked=el.value===v;else el.value=v;}
 const event=el.tagName==='TEXTAREA'||['text','number','range'].includes(el.type)?'input':'change';
 el.addEventListener(event,()=>{state.fields[key]=el.type==='checkbox'?el.checked:el.value;save();});
 if(el.type==='range'){
  const val=document.createElement('output');val.className='range-value';val.textContent=el.value;el.after(val);el.addEventListener('input',()=>val.textContent=el.value);
 }
});
// Replace native presentation sequences with accessible slide navigation.
document.querySelectorAll('.local-deck').forEach(deck=>{
 const pages=Array.from(deck.querySelectorAll(':scope > .deck-page'));if(!pages.length)return;
 let i=0;const nav=document.createElement('div');nav.className='deck-nav';
 const prev=document.createElement('button'),next=document.createElement('button'),counter=document.createElement('span');prev.textContent='← Previous';next.textContent='Next →';counter.setAttribute('aria-live','polite');nav.append(prev,counter,next);deck.append(nav);
 const show=()=>{pages.forEach((p,k)=>p.hidden=k!==i);prev.disabled=i===0;next.disabled=i===pages.length-1;counter.textContent=`${i+1} of ${pages.length}`;};prev.onclick=()=>{i--;show();};next.onclick=()=>{i++;show();};show();
});
// Standalone original question bank. Multiple choice is graded as an exact set.
const mount=document.querySelector('#quiz');
if(mount&&window.QUIZZES?.[chapter]){
 const questions=QUIZZES[chapter];const prior=state.quizzes[chapter];const form=document.createElement('form');form.className='quiz-form';form.noValidate=true;
 const title=document.createElement('h3');title.textContent=`Chapter ${chapter} assessment`;
 const intro=document.createElement('p');intro.className='quiz-intro';intro.textContent=`${questions.length} questions · Pass: ${Math.ceil(questions.length*.8)}/${questions.length}. Answer every question before checking. You can retry anytime.`;form.append(title,intro);
 questions.forEach((q,i)=>{
  const field=document.createElement('fieldset'),legend=document.createElement('legend');legend.textContent=`${i+1}. ${q.question}`;field.append(legend);
  q.options.forEach((text,j)=>{const label=document.createElement('label');label.className='quiz-option';const input=document.createElement('input');input.type=q.multi?'checkbox':'radio';input.name=`quiz-${i}`;input.value=j;input.checked=(prior?.choices?.[i]||[]).includes(j);const span=document.createElement('span');span.textContent=text;label.append(input,span);field.append(label);});
  const explain=document.createElement('p');explain.className='quiz-explanation';explain.hidden=true;explain.id=`explain-${i}`;field.append(explain);form.append(field);
 });
 const actions=document.createElement('div');actions.className='quiz-actions';const grade=document.createElement('button');grade.type='submit';grade.textContent='Check my answers';const reset=document.createElement('button');reset.type='button';reset.textContent='Retry quiz';actions.append(grade,reset);form.append(actions);
 const result=document.createElement('p');result.className='quiz-result';result.setAttribute('role','status');result.setAttribute('tabindex','-1');form.append(result);mount.append(form);
 const choices=()=>questions.map((q,i)=>Array.from(form.querySelectorAll(`input[name="quiz-${i}"]:checked`)).map(e=>Number(e.value)));
 form.addEventListener('change',()=>{const p=state.quizzes[chapter]||{best:0,total:questions.length,attempts:0};state.quizzes[chapter]={...p,choices:choices(),graded:false};save();form.querySelectorAll('.quiz-explanation').forEach(e=>e.hidden=true);result.textContent='Answers saved. Check your answers when ready.';});
 function gradeQuiz(record){
  const picked=choices(),missing=picked.findIndex(a=>!a.length);
  if(missing>=0){result.textContent=`Please answer question ${missing+1} before checking.`;form.querySelectorAll('fieldset')[missing].querySelector('input').focus();return;}
  let score=0;
  questions.forEach((q,i)=>{const ok=JSON.stringify(picked[i].sort())===JSON.stringify([...q.answer].sort());if(ok)score++;const e=form.querySelector(`#explain-${i}`);e.hidden=false;e.classList.toggle('wrong',!ok);e.textContent=(ok?'Correct. ':'Review this one. ')+q.explanation;});
  const p=state.quizzes[chapter]||{best:0,attempts:0};if(record){state.quizzes[chapter]={score,best:Math.max(p.best||0,score),total:questions.length,attempts:(p.attempts||0)+1,choices:picked,graded:true};save();renderProgress();}
  result.textContent=`${score}/${questions.length} correct — ${score>=Math.ceil(questions.length*.8)?'Passed.':'Keep practicing.'} Best: ${Math.max(p.best||0,score)}/${questions.length}. Review the explanations above.`;if(record)result.focus();
 }
 form.addEventListener('submit',e=>{e.preventDefault();gradeQuiz(true);});
 reset.addEventListener('click',()=>{form.querySelectorAll('input').forEach(e=>e.checked=false);form.querySelectorAll('.quiz-explanation').forEach(e=>e.hidden=true);const p=state.quizzes[chapter];if(p){p.choices=[];p.graded=false;save();}result.textContent='Ready for a fresh attempt. Your best score is retained.';});
 if(prior?.graded&&prior.choices?.every(a=>a.length))gradeQuiz(false);
 else if(prior?.attempts)result.textContent=`Best score: ${prior.best}/${questions.length}. ${prior.attempts} attempt${prior.attempts===1?'':'s'}.`;
}
const search=document.querySelector('#search');if(search)search.addEventListener('input',()=>{const q=search.value.toLowerCase().trim();let found=0;document.querySelectorAll('.chapter-row').forEach(r=>{const match=(r.dataset.search+' '+r.dataset.chapter).includes(q);r.hidden=!match;if(match)found++;});document.querySelectorAll('.module-card').forEach(m=>m.hidden=!Array.from(m.querySelectorAll('.chapter-row')).some(r=>!r.hidden));document.querySelector('#search-empty').hidden=found!==0;});
document.querySelectorAll('.print-button').forEach(b=>b.onclick=()=>window.print());
const exportButton=document.querySelector('#export-progress');if(exportButton)exportButton.onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='swe-fde-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);toast('Progress backup exported.');};
function validateBackup(raw){
 if(!raw||raw.version!==1||typeof raw.completed!=='object'||!raw.completed||typeof raw.fields!=='object'||!raw.fields||typeof raw.quizzes!=='object'||!raw.quizzes)throw new Error('Unsupported progress file.');
 const out=fresh();out.lastChapter=Number.isInteger(raw.lastChapter)&&raw.lastChapter>=1&&raw.lastChapter<=TOTAL?raw.lastChapter:1;
 for(const [key,value] of Object.entries(raw.completed))if(ACADEMY.some(c=>String(c.id)===key)&&typeof value==='boolean')out.completed[key]=value;
 for(const [key,value] of Object.entries(raw.fields))if(/^(field|practice|check|notes)-[a-zA-Z0-9-]+$/.test(key)&&(typeof value==='string'&&value.length<=200000||typeof value==='boolean'))out.fields[key]=value;
 for(const [key,value] of Object.entries(raw.quizzes)){
  const qs=QUIZZES[key];if(!qs||!value||typeof value!=='object')continue;
  const total=qs.length;const safeChoices=qs.map((q,i)=>Array.isArray(value.choices?.[i])?value.choices[i].filter(j=>Number.isInteger(j)&&j>=0&&j<q.options.length):[]);
  out.quizzes[key]={total,best:Math.min(total,Math.max(0,Number(value.best)||0)),score:Math.min(total,Math.max(0,Number(value.score)||0)),attempts:Math.max(0,Math.floor(Number(value.attempts)||0)),choices:safeChoices,graded:!!value.graded};
 }
 return out;
}
const importer=document.querySelector('#import-progress');if(importer)importer.addEventListener('change',async()=>{const file=importer.files[0];if(!file)return;try{if(file.size>3000000)throw new Error('That backup is too large.');const incoming=validateBackup(JSON.parse(await file.text()));if(!confirm('Replace progress on this device with this backup? Export your current progress first if you want to keep it.'))return;state=incoming;save();renderProgress();toast('Progress imported.');}catch(err){toast('Could not import: '+err.message);}finally{importer.value='';}});
const resetAll=document.querySelector('#reset-progress');if(resetAll)resetAll.onclick=()=>{if(confirm('Clear all chapter progress, quiz history, and exercise drafts on this device? Export a backup first to keep them.')){state=fresh();save();renderProgress();toast('Progress cleared.');}};
document.querySelectorAll('.lesson img').forEach(img=>{img.addEventListener('error',()=>{const note=document.createElement('p');note.className='image-fallback';note.textContent='Image unavailable: '+img.alt;img.replaceWith(note);},{once:true});});
window.addEventListener('storage',e=>{if(e.key===KEY){read();renderProgress();}});
})();
