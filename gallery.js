(()=>{
 const dialog=document.getElementById('screenshotDialog'),image=document.getElementById('screenshotImage'),title=document.getElementById('screenshotTitle');let previousOverflow='';
 document.querySelectorAll('[data-gallery]').forEach(gallery=>{
  const frames=[...gallery.querySelectorAll('.software-screen')],tabs=[...gallery.querySelectorAll('[data-screen-switch]')];
  tabs.forEach(tab=>tab.addEventListener('click',()=>{const index=Number(tab.dataset.screenSwitch);frames.forEach((frame,i)=>frame.hidden=i!==index);tabs.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)))}));
 });
 if(!dialog||typeof dialog.showModal!=='function')return;
 document.querySelectorAll('[data-lightbox]').forEach(link=>link.addEventListener('click',event=>{
  if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  event.preventDefault();const preview=link.querySelector('img');image.src=link.href;image.alt=preview?preview.alt:link.dataset.imageTitle;title.textContent=link.dataset.imageTitle||'Software screenshot';previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();dialog.querySelector('[data-close-screenshot]').focus();
 }));
 dialog.querySelector('[data-close-screenshot]').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close()}});
 dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;image.removeAttribute('src')});
})();