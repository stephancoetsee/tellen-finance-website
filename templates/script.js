(()=>{
  const nav=document.querySelector('[data-nav]'),toggle=document.querySelector('[data-toggle]');
  if(nav&&toggle){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');}));}
  const year=document.querySelector('[data-year]');if(year)year.textContent=new Date().getFullYear();
  const service=document.querySelector('[name=service]');document.querySelectorAll('[data-plan]').forEach(el=>el.addEventListener('click',()=>{if(service){const label=el.dataset.plan;if(!Array.from(service.options).some(o=>o.value===label)){const option=document.createElement('option');option.value=label;option.textContent=label;service.add(option);}service.value=label}}));
  const form=document.querySelector('[data-contact-form]');if(!form)return;
  form.addEventListener('submit',ev=>{ev.preventDefault();if(!form.reportValidity())return;
    const data=new FormData(form),isNL=document.documentElement.lang==='nl';
    const subject=(isNL?'Websiteaanvraag':'Website enquiry')+' - '+data.get('service');
    const body=[(isNL?'Naam: ':'Name: ')+data.get('name'),'Email: '+data.get('email'),(isNL?'Dienst: ':'Service: ')+data.get('service'),'',data.get('message')].join('\n');
    window.location.href='mailto:hello@tellenfinance.nl?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  });
})();