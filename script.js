// Small enhancements: year, nav toggle, smooth scroll, basic form handling
(function(){
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const nav = document.getElementById('mainNav');
  const btn = document.getElementById('navToggle');
  if(btn && nav){
    btn.addEventListener('click', ()=> nav.classList.toggle('open'))
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href === '#') return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
        if(nav) nav.classList.remove('open');
      }
    })
  })

  // Minimal form handler: prevents real submit and shows a quick alert
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();
      alert('Thanks! This demo form does not submit anywhere.');
      form.reset();
    })
  }
})();
