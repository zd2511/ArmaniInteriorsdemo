const header = document.querySelector('#site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');

function updateHeader(){
  header.classList.toggle('scrolled', window.scrollY > 45);
}
updateHeader();
window.addEventListener('scroll', updateHeader, {passive:true});

menuToggle?.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  header.classList.remove('menu-open');
  document.body.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded','false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.14, rootMargin:'0px 0px -40px 0px'});

document.querySelectorAll('.reveal,.reveal-image').forEach(el => observer.observe(el));

document.querySelector('#year').textContent = new Date().getFullYear();

const form = document.querySelector('#project-form');
const status = document.querySelector('#form-status');

form?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const clean = value => String(value || '').trim();

  const lines = [
    'Hello Armani Interiors, I would like to enquire about a project.',
    '',
    `Name: ${clean(data.get('name'))}`,
    `Email: ${clean(data.get('email'))}`,
    `Phone: ${clean(data.get('phone'))}`,
    `Project type: ${clean(data.get('projectType'))}`,
    `Property type: ${clean(data.get('propertyType')) || 'Not specified'}`,
    `Approx. scope / budget: ${clean(data.get('budget')) || 'Not specified'}`,
    `Preferred start date: ${clean(data.get('startDate')) || 'Not specified'}`,
    '',
    `Project details: ${clean(data.get('message'))}`
  ];

  const whatsapp = `https://wa.me/27633141801?text=${encodeURIComponent(lines.join('\n'))}`;
  status.textContent = 'Opening WhatsApp with your project enquiry…';
  window.open(whatsapp, '_blank', 'noopener,noreferrer');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if(target){
      event.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});
