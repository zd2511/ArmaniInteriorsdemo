const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

menuToggle?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
  mobileMenu.setAttribute('aria-hidden', !open);
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const navLinks = document.querySelectorAll('.desktop-nav a');
const sections = [...document.querySelectorAll('main section[id]')];

window.addEventListener('scroll', () => {
  const y = window.scrollY + 150;
  let current = 'top';
  sections.forEach(section => {
    if (y >= section.offsetTop) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current || (current === 'top' && link.getAttribute('href') === '#top'));
  });
}, { passive: true });
