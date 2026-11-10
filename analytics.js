(()=>{
 'use strict';
 const measurementId='G-NZC02FQY3G',storageKey='copangel.analytics-consent.v1',maxAge=180*24*60*60*1000;
 let enabled=false,loaded=false,observer=null,previousFocus=null;
 const viewed=new Set();
 function readChoice(){try{const saved=JSON.parse(localStorage.getItem(storageKey));return saved&&Date.now()-saved.at<maxAge&&['accepted','rejected'].includes(saved.choice)?saved.choice:null}catch{return null}}
 function saveChoice(choice){try{localStorage.setItem(storageKey,JSON.stringify({choice,at:Date.now()}))}catch{}}
 function safeUrl(value){try{const url=new URL(value);return url.origin+url.pathname}catch{return ''}}
 function track(name,parameters={}){if(enabled&&typeof window.gtag==='function')window.gtag('event',name,{...parameters,send_to:measurementId})}
 function recordSections(){
  if(!('IntersectionObserver'in window)||observer)return;
  observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(enabled&&entry.isIntersecting&&entry.intersectionRatio>=.2&&!viewed.has(entry.target.id)){
    viewed.add(entry.target.id);track('section_view',{section_name:entry.target.id});
   }
  }),{threshold:[.2]});
  document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));
 }
 function enable(){
  if(loaded)return;
  loaded=true;enabled=true;window['ga-disable-'+measurementId]=false;
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments)};
  window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  window.gtag('consent','update',{analytics_storage:'granted'});
  window.gtag('js',new Date());
  window.gtag('set',{page_location:safeUrl(location.href),page_referrer:safeUrl(document.referrer),allow_google_signals:false,allow_ad_personalization_signals:false});
  window.gtag('config',measurementId,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false});
  const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+measurementId;script.id='copangel-google-analytics';document.head.appendChild(script);
  track('page_view',{page_title:document.title,page_location:safeUrl(location.href),page_referrer:safeUrl(document.referrer)});
  recordSections();
  if(location.pathname.endsWith('/thank-you.html')){
   // This records a confirmation-page view, not verified delivery to the inbox.
   track('enquiry_confirmation_view');
  }
 }
 function clearAnalyticsCookies(){
  document.cookie.split(';').map(item=>item.trim().split('=')[0]).filter(name=>/^_ga(?:_|$)/.test(name)).forEach(name=>{
   document.cookie=name+'=; Max-Age=0; path=/; SameSite=Lax';
   const parts=location.hostname.split('.');
   for(let i=0;i<parts.length-1;i++)document.cookie=name+'=; Max-Age=0; path=/; domain=.'+parts.slice(i).join('.')+'; SameSite=Lax';
  });
 }
 window['ga-disable-'+measurementId]=true;
 const style=document.createElement('style');style.textContent=`
 .cookie-panel[hidden]{display:none!important}.cookie-panel{position:fixed;left:20px;right:20px;bottom:20px;z-index:1000;max-width:940px;margin:auto;padding:22px 25px;border:1px solid #bdcebf;border-radius:14px;background:#fff;color:#142821;box-shadow:0 12px 55px #09221930;font-family:Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif}.cookie-panel h2{font-size:19px;line-height:1.3;margin:0 0 8px;letter-spacing:-.02em}.cookie-panel p{font-size:13px;line-height:1.6;color:#54665b;margin:0 0 15px}.cookie-panel a{color:#176c39;text-decoration:underline;text-underline-offset:3px}.cookie-actions{display:flex;gap:10px;flex-wrap:wrap}.cookie-actions button{appearance:none;font:700 13px/1.4 Inter,ui-sans-serif,Arial,sans-serif;cursor:pointer;padding:11px 17px;border-radius:7px;border:1px solid #218848;background:#fff;color:#176c39;min-height:42px}.cookie-actions button:hover{background:#edf6e7}.cookie-actions button:focus-visible,[data-cookie-settings]:focus-visible{outline:3px solid #8ac74c;outline-offset:4px}[data-cookie-settings]{cursor:pointer;font:inherit;color:inherit;background:none;border:0;padding:0;text-decoration:underline;text-underline-offset:3px}.privacy-links{display:flex;flex-wrap:wrap;gap:16px;align-items:center;max-width:1180px;margin:18px auto 0;padding:0 28px 20px;font-size:12px}.privacy-links a{color:inherit;text-decoration:underline;text-underline-offset:3px}@media(max-width:600px){.cookie-panel{left:10px;right:10px;bottom:10px;padding:19px}.cookie-actions button{flex:1}}`;
 document.head.appendChild(style);
 const panel=document.createElement('section');panel.className='cookie-panel';panel.hidden=true;panel.setAttribute('aria-labelledby','cookieTitle');panel.innerHTML='<h2 id="cookieTitle">Your analytics choice</h2><p>With your permission, we use Google Analytics to understand visits, the sections people read and enquiry activity. We do not send form names, email addresses or enquiry messages to Analytics. The website and enquiry forms work if you reject analytics. <a href="privacy.html">Privacy and cookies</a></p><div class="cookie-actions"><button type="button" data-consent-choice="accepted">Accept analytics</button><button type="button" data-consent-choice="rejected">Reject analytics</button></div>';
 document.body.appendChild(panel);
 function openSettings(){previousFocus=document.activeElement;panel.hidden=false;panel.querySelector('button').focus()}
 function closeSettings(){panel.hidden=true;if(previousFocus&&document.contains(previousFocus))previousFocus.focus()}
 panel.querySelectorAll('[data-consent-choice]').forEach(button=>button.addEventListener('click',()=>{
  const choice=button.dataset.consentChoice;saveChoice(choice);closeSettings();
  if(choice==='accepted')enable();
  else{const wasLoaded=loaded;enabled=false;window['ga-disable-'+measurementId]=true;clearAnalyticsCookies();if(wasLoaded)location.reload()}
 }));
 document.querySelectorAll('[data-cookie-settings]').forEach(button=>button.addEventListener('click',openSettings));
 document.addEventListener('click',event=>{
  const trigger=event.target.closest('[data-interest]');
  if(trigger&&['homeowner','investor','installer','partner','general'].includes(trigger.dataset.interest))track('enquiry_open',{audience:trigger.dataset.interest});
 });
 const form=document.getElementById('interestForm');
 if(form)form.addEventListener('submit',()=>{
  const button=form.querySelector('button[type="submit"]');if(button&&button.disabled)return;
  const role=document.getElementById('role').value;
  if(['homeowner','investor','installer','partner','general'].includes(role))track('enquiry_submit_attempt',{audience:role});
 },{capture:true});
 window.addEventListener('storage',event=>{if(event.key===storageKey)location.reload()});
 const choice=readChoice();if(choice==='accepted')enable();else if(!choice)panel.hidden=false;
})();
