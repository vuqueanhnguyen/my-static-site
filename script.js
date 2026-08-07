// Small enhancements: year updater, mobile nav toggle, page-aware active link, and form handling
(function(){
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const nav = document.getElementById('mainNav');
  const btn = document.getElementById('navToggle');
  if(btn && nav){
    btn.addEventListener('click', ()=> nav.classList.toggle('open'))
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if(link.getAttribute('href') === currentPage || (link.getAttribute('href') === 'index.html' && currentPage === '')){
      link.classList.add('active');
    }
    link.addEventListener('click', () => {
      if(nav) nav.classList.remove('open');
    })
  });

  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();
      alert('Thanks! This demo form does not submit anywhere.');
      form.reset();
    })
  }
})();
