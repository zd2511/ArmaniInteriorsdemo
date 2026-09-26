(function(){
  document.documentElement.classList.add('js-ready');

  const menuToggle=document.querySelector('.menu-toggle');
  const mobileMenu=document.querySelector('.mobile-menu');
  if(menuToggle&&mobileMenu){
    menuToggle.addEventListener('click',()=>{
      const open=mobileMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded',String(open));
    });
    mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));
  }

  const revealTargets=document.querySelectorAll('.reveal,.reveal-section,.detail-service,.quote-band,.portfolio-item,.value-grid article,.contact-details,.statement,.about-editorial');
  if('IntersectionObserver' in window){
    const revealObserver=new IntersectionObserver((entries,observer)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.12,rootMargin:'0px 0px -80px 0px'});
    revealTargets.forEach(el=>revealObserver.observe(el));
  }else{
    revealTargets.forEach(el=>el.classList.add('visible'));
  }

  const parallaxItems=document.querySelectorAll('.inner-hero-bg,.hero-image,.about-image img,.contact-photo img');
  let ticking=false;
  function parallax(){
    const vh=window.innerHeight;
    parallaxItems.forEach(el=>{
      const r=el.getBoundingClientRect();
      if(r.bottom>0&&r.top<vh){
        const shift=(vh/2-(r.top+r.height/2))*.045;
        el.style.transform=`translate3d(0,${shift}px,0) scale(1.06)`;
      }
    });
    ticking=false;
  }
  window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(parallax);ticking=true;}},{passive:true});
  window.addEventListener('resize',parallax);
  parallax();

  document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const type=btn.dataset.filter;
    document.querySelectorAll('.portfolio-item').forEach((item,i)=>{
      const show=type==='all'||item.dataset.type===type;
      item.classList.toggle('hidden',!show);
      if(show){item.classList.remove('visible');setTimeout(()=>item.classList.add('visible'),30+i*35);}
    });
  }));

  document.querySelectorAll('a[href]').forEach(a=>{
    const url=a.getAttribute('href');
    if(url&&/^[^#?]+\.html(?:[?#].*)?$/i.test(url)&&!a.target){
      a.addEventListener('click',e=>{
        if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey) return;
        e.preventDefault();
        document.body.classList.add('page-leaving');
        setTimeout(()=>{window.location.href=url},220);
      });
    }
  });

  const current=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.desktop-nav a').forEach(a=>{
    const href=a.getAttribute('href');
    if(href===current || (current===''&&href==='index.html'))a.classList.add('active');
    else a.classList.remove('active');
  });
})();
