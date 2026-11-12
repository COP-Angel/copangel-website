
(()=>{
 const links=document.getElementById('navLinks'),hamb=document.querySelector('.hamb'),modal=document.getElementById('modal'),form=document.getElementById('interestForm'),status=document.getElementById('emailStatus');
 let lastFocus=null;
 const choices=[...form.querySelectorAll('[data-interest-choice]')];
 function selected(){return choices.filter(input=>input.checked)}
 function syncInterests(){
  choices[0].setCustomValidity(selected().length?'':'Please select at least one interest.');
  document.getElementById('selectedInterests').value=selected().map(input=>input.value).join(', ');
 }
 function closeMenu(){links.classList.remove('open');hamb.setAttribute('aria-expanded','false')}
 hamb.addEventListener('click',()=>{const open=links.classList.toggle('open');hamb.setAttribute('aria-expanded',String(open))});
 links.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';lastFocus?.focus()}
 document.querySelectorAll('[data-interest]').forEach(b=>b.addEventListener('click',()=>{lastFocus=document.activeElement;closeMenu();const choice=choices.find(input=>input.dataset.interestChoice===b.dataset.interest);if(choice&&b.dataset.interest!=='general')choice.checked=true;syncInterests();status.textContent='';modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';choices[0].focus()}));
 choices.forEach(input=>input.addEventListener('change',syncInterests));
 syncInterests();
 document.getElementById('closeModal').addEventListener('click',closeModal);
 modal.addEventListener('mousedown',e=>{if(e.target===modal)closeModal()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(modal.classList.contains('open'))closeModal();else closeMenu()};if(e.key==='Tab'&&modal.classList.contains('open')){const nodes=[...modal.querySelectorAll('button,input,select,textarea,a[href]')].filter(x=>!x.disabled&&x.type!=='hidden'&&x.tabIndex!==-1);const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
 const submitButton=form.querySelector('button[type="submit"]');
 form.addEventListener('submit',e=>{
  if(submitButton.disabled){e.preventDefault();return}
  syncInterests();
  if(!form.reportValidity()){e.preventDefault();return}
  document.getElementById('enquirySubject').value='[COP Angel] Register interest: '+selected().map(input=>input.value).join(', ');
  document.getElementById('enquiryNext').value=new URL('thank-you.html',window.location.href).href;
  document.getElementById('updatesConsent').value=document.getElementById('permission').checked?'Yes — product development and launch updates':'Not requested';
  status.textContent='Sending your enquiry securely. Complete any spam check on the next page to finish.';
  submitButton.disabled=true;submitButton.textContent='Sending…';
 });
 window.addEventListener('pageshow',()=>{submitButton.disabled=false;submitButton.textContent='Send enquiry →';status.textContent=''});


 // Read every section position rather than only the latest observer entries.
 const navItems=[...links.querySelectorAll('a[href^="#"]')];
 const sections=[...navItems.map(a=>document.getElementById(a.hash.slice(1))),document.getElementById('contact')].filter(Boolean);
 let navigationTarget=null,releaseTimer=null,scrollFrame=null;
 function markCurrent(id){
  navItems.forEach(a=>{if(a.hash==='#'+id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
 }
 function visibleSection(){
  const activationLine=document.querySelector('.nav').getBoundingClientRect().bottom+48;
  let current=null;
  sections.forEach(section=>{if(section.getBoundingClientRect().top<=activationLine)current=section.id});
  return current;
 }
 function updateNavigation(){
  scrollFrame=null;
  markCurrent(navigationTarget||visibleSection());
 }
 function queueNavigation(){if(scrollFrame===null)scrollFrame=requestAnimationFrame(updateNavigation)}
 function releaseNavigation(){clearTimeout(releaseTimer);navigationTarget=null;queueNavigation()}
 function selectDestination(hash){
  const target=document.getElementById(hash.slice(1));
  if(!target)return;
  navigationTarget=target.id;markCurrent(navigationTarget);
  clearTimeout(releaseTimer);
  releaseTimer=setTimeout(releaseNavigation,1600);
 }
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>selectDestination(a.hash)));
 window.addEventListener('hashchange',()=>selectDestination(window.location.hash));
 window.addEventListener('scroll',queueNavigation,{passive:true});
 window.addEventListener('scrollend',releaseNavigation);
 window.addEventListener('resize',queueNavigation);
 window.addEventListener('load',queueNavigation);
 queueNavigation();
})();
