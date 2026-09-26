const menuToggle=document.querySelector('.menu-toggle'),mobileMenu=document.querySelector('.mobile-menu');
if(menuToggle&&mobileMenu){menuToggle.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',open);});mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));}
const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}})},{threshold:.1,rootMargin:'0px 0px -40px'});
document.querySelectorAll('.reveal,.detail-service').forEach(el=>revealObserver.observe(el));

const parallaxItems=document.querySelectorAll('.inner-hero-bg,.hero-image,.about-image img,.contact-photo img');
function parallax(){const y=window.scrollY;parallaxItems.forEach(el=>{const r=el.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){const shift=(innerHeight/2-(r.top+r.height/2))*.035;el.style.transform=`translate3d(0,${shift}px,0) scale(1.04)`;}})}
window.addEventListener('scroll',parallax,{passive:true});parallax();

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const type=btn.dataset.filter;document.querySelectorAll('.portfolio-item').forEach(item=>{item.classList.toggle('hidden',type!=='all'&&item.dataset.type!==type);});}));

document.querySelectorAll('a[href]').forEach(a=>{const url=a.getAttribute('href');if(url&&url.endsWith('.html'))a.addEventListener('click',e=>{e.preventDefault();document.body.classList.add('page-leaving');setTimeout(()=>location.href=url,180);});});

document.querySelectorAll('.desktop-nav a').forEach(a=>{if(a.href===location.href)a.classList.add('active');});
