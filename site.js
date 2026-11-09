
(()=>{
 const links=document.getElementById('navLinks'),hamb=document.querySelector('.hamb'),modal=document.getElementById('modal'),role=document.getElementById('role'),title=document.getElementById('modalTitle'),desc=document.getElementById('modalDescription'),form=document.getElementById('interestForm'),status=document.getElementById('emailStatus');
 let lastFocus=null;
 const labels={homeowner:['Register homeowner interest',"Tell us you're interested in COP Angel for your home. You can also opt in to product and launch updates."],investor:['Register prospectus interest','Ask to receive the investor prospectus when available, as COP Angel moves towards manufacturing.'],installer:['Register installer interest','Tell us about your installation business and interest in COP Angel.'],partner:['Explore a partnership','Tell us about your organisation and how we could work together.'],general:['Contact COP Angel','Send your enquiry to the team.']};
 function closeMenu(){links.classList.remove('open');hamb.setAttribute('aria-expanded','false')}
 hamb.addEventListener('click',()=>{const open=links.classList.toggle('open');hamb.setAttribute('aria-expanded',String(open))});
 links.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 function setLabels(){const text=labels[role.value]||labels.general;title.textContent=text[0];desc.textContent=text[1]}
 function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';lastFocus?.focus()}
 document.querySelectorAll('[data-interest]').forEach(b=>b.addEventListener('click',()=>{lastFocus=document.activeElement;closeMenu();role.value=labels[b.dataset.interest]?b.dataset.interest:'general';setLabels();status.textContent='';modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';document.getElementById('fullName').focus()}));
 role.addEventListener('change',setLabels);
 document.getElementById('closeModal').addEventListener('click',closeModal);
 modal.addEventListener('mousedown',e=>{if(e.target===modal)closeModal()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(modal.classList.contains('open'))closeModal();else closeMenu()};if(e.key==='Tab'&&modal.classList.contains('open')){const nodes=[...modal.querySelectorAll('button,input,select,textarea,a[href]')].filter(x=>!x.disabled);const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
 const submitButton=form.querySelector('button[type="submit"]');
 const subjects={homeowner:'[COP Angel] Homeowner launch interest',investor:'[COP Angel] Investor prospectus request',installer:'[COP Angel] Installer enquiry',partner:'[COP Angel] Partnership enquiry',general:'[COP Angel] Website enquiry'};
 form.addEventListener('submit',e=>{
  if(submitButton.disabled){e.preventDefault();return}
  document.getElementById('enquirySubject').value=subjects[role.value]||subjects.general;
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