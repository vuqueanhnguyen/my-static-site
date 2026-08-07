// Multilingual support and site interactivity
(function(){
  // Language switcher
  let currentLang = localStorage.getItem('lang') || 'vi';
  
  function setLanguage(lang){
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    translatePage();
    updateLangButtons();
  }
  
  function translatePage(){
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if(translations[currentLang] && translations[currentLang][key]){
        if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'){
          el.placeholder = translations[currentLang][key];
        } else {
          el.textContent = translations[currentLang][key];
        }
      }
    });
  }
  
  function updateLangButtons(){
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('active');
      if(btn.getAttribute('data-lang') === currentLang){
        btn.classList.add('active');
      }
    });
  }
  
  // Initialize language switcher
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setLanguage(btn.getAttribute('data-lang'));
    });
  });
  
  // Set initial language
  setLanguage(currentLang);
  
  // Year updater
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const nav = document.getElementById('mainNav');
  const btn = document.getElementById('navToggle');
  if(btn && nav){
    btn.addEventListener('click', ()=> nav.classList.toggle('open'))
  }

  // Close nav on link click
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if(link.getAttribute('href') === currentPage || (link.getAttribute('href') === 'index.html' && currentPage === '')){
      link.classList.add('active');
    }
    link.addEventListener('click', () => {
      if(nav) nav.classList.remove('open');
    })
  });

  // Form handler
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();
      alert(currentLang === 'vi' ? 'Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.' : 'Thanks! We will be in touch soon.');
      form.reset();
    })
  }
})();
