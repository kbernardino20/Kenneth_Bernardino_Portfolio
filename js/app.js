const menu=document.querySelector('#menu'),links=document.querySelector('#links');
const navWrap=document.querySelector('.nav-wrap');
const nav=menu?.closest('.nav');
const linksPlaceholder=links?document.createComment('navigation-links-placeholder'):null;
if(links&&linksPlaceholder) links.parentNode.insertBefore(linksPlaceholder,links);

const mountMobileMenu=()=>{
  if(!links||!linksPlaceholder)return;
  if(innerWidth<=900){
    if(links.parentElement!==document.body) document.body.appendChild(links);
    links.classList.add('mobile-portal');
  }else{
    links.classList.remove('mobile-portal','open');
    if(linksPlaceholder.parentNode) linksPlaceholder.parentNode.insertBefore(links,linksPlaceholder.nextSibling);
  }
};
const updateNavShadow=()=>navWrap?.classList.toggle('scrolled',scrollY>8);
const setMenuState=(open)=>{
  if(!menu||!links)return;
  mountMobileMenu();
  links.classList.toggle('open',open);
  menu.setAttribute('aria-expanded',String(open));
  menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  document.body.classList.toggle('menu-open',open);
};
mountMobileMenu();
updateNavShadow();
menu?.setAttribute('aria-expanded','false');
menu?.addEventListener('click',()=>setMenuState(!links.classList.contains('open')));
links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenuState(false)));
addEventListener('scroll',()=>{updateNavShadow();if(innerWidth<=900&&links?.classList.contains('open'))setMenuState(false)},{passive:true});
addEventListener('keydown',e=>{if(e.key==='Escape')setMenuState(false)});
addEventListener('resize',()=>{setMenuState(false);mountMobileMenu()});const progress=document.querySelector('#progress');addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${h?scrollY/h*100:0}%`});const yearEl=document.querySelector('#year');if(yearEl)yearEl.textContent=new Date().getFullYear();const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));const words=['Enterprise Applications','Full-Stack JavaScript','Application Support','Cyber Security','AI-Assisted Development'];let wi=0,ci=0,del=false;const typing=document.querySelector('#typing');function type(){if(!typing)return;const w=words[wi];typing.textContent=w.slice(0,ci);if(!del&&ci<w.length)ci++;else if(del&&ci>0)ci--;else{del=!del;if(!del)wi=(wi+1)%words.length}setTimeout(type,del?38:del===false&&ci===w.length?1100:72)}type();
const jobs={
qbe:{
 title:'Senior Software Engineer',
 company:'QBE Insurance',
 dates:'Feb 2022 – Dec 2022',
 logo:'assets/company-logos/qbe.png',
 bannerClass:'qbe-banner',
 points:[
  'Led delivery of the BAU and Qnect insurance correspondence platforms, building dynamic templates and business-rule-driven logic for automated, personalised document generation at scale.',
  'Implemented workflow optimisation and performance improvements, reducing turnaround time by approximately 20–30%.',
  'Managed complex variable data processing supporting high-volume, personalised outputs across multiple insurance correspondence streams.',
  'Collaborated with Business Analysts, QA, UAT and deployment teams, while participating in Agile Scrum ceremonies to support successful production releases.',
  'Performed troubleshooting, root cause analysis and production support for enterprise systems.'
 ],
 tags:['OpenText Exstream','Enterprise Applications','Production Support','Root Cause Analysis','Agile Scrum','Testing']
},
dxc2:{
 title:'Information Technology Consultant II',
 company:'DXC Technology',
 dates:'Aug 2019 – Feb 2022',
 logo:'assets/company-logos/dxc.png',
 bannerClass:'dxc-banner',
 points:[
  'Acted as the client-facing technical point of contact for enterprise accounts, conducting system analysis, configuration and platform implementation to meet business requirements.',
  'Managed incidents and service requests within SLA targets, supporting enterprise applications used across multiple business units.',
  'Supported release management, deployment validation and SDLC delivery across Agile environments, contributing to stable production releases and fewer post-deployment defects.',
  'Developed technical documentation and knowledge base materials, and worked with cross-functional stakeholders to resolve production incidents and deliver service improvements.',
  'Ensured compliance with IT governance, security policies and organisational standards.'
 ],
 tags:['System Analysis','Incident Management','SLA Support','Release Management','SDLC','IT Governance']
},
fx:{
 title:'System Analyst',
 company:'Fuji Xerox Singapore',
 dates:'Oct 2018 – Jul 2019',
 logo:'assets/company-logos/fuji-xerox.png',
 bannerClass:'fx-banner',
 points:[
  'Supported output generation systems for Singapore’s Housing Development Board, producing high-volume, nationwide correspondence and document outputs.',
  'Designed and implemented automated document workflows, performing system debugging, integration testing and validation to ensure accurate outputs.',
  'Improved quality assurance and compliance controls within operational workflows.',
  'Prepared technical specifications and documentation for system maintenance and knowledge transfer.'
 ],
 tags:['HDB Singapore','Output Generation','Workflow Automation','Integration Testing','Quality Assurance','Documentation']
},
dxc1:{
 title:'Programmer Analyst',
 company:'DXC Technology',
 dates:'Aug 2014 – Oct 2018',
 logo:'assets/company-logos/dxc.png',
 bannerClass:'dxc-banner',
 points:[
  'Developed and maintained enterprise applications supporting business operations, and built automated batch processes and workflow automation to improve system efficiency.',
  'Implemented bug fixes, enhancements and change requests across multiple releases, using Jira for task tracking and Agile project management.',
  'Produced technical documentation and deployment support materials.',
  'Provided production support and troubleshooting to maintain system availability.'
 ],
 tags:['Application Development','Batch Processing','Workflow Automation','Jira','Agile','Production Support']
}
};
const panel=document.querySelector('#job-panel');function renderJob(k){
 const j=jobs[k];
 if(!j||!panel)return;
 panel.innerHTML=`
  <div class="job-company-banner ${j.bannerClass}">
   <img src="${j.logo}" alt="${j.company} logo">
   <div class="job-banner-copy">
    <span>${j.company}</span>
    <small>Enterprise software delivery</small>
   </div>
  </div>
  <div class="job-panel-body">
   <div class="job-panel-heading">
    <div>
     <span class="company">${j.company}</span>
     <h3>${j.title}</h3>
    </div>
    <time>${j.dates}</time>
   </div>
   <ul>${j.points.map(x=>`<li>${x}</li>`).join('')}</ul>
   <div class="tag-row">${j.tags.map(x=>`<b>${x}</b>`).join('')}</div>
  </div>`;
}const experienceGrid=document.querySelector('.experience-grid'),experienceList=document.querySelector('.experience-list');
function placeExperiencePanel(){
  if(!panel||!experienceGrid||!experienceList)return;
  if(panel.parentElement!==experienceGrid){
    experienceGrid.append(panel);
  }
}
document.querySelectorAll('.job').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.job').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  renderJob(b.dataset.job);
  placeExperiencePanel();
}));
renderJob('qbe');
placeExperiencePanel();
addEventListener('resize',placeExperiencePanel);

// Light-first theme, floating back-to-top, and case-study image viewer.
const themeButton=document.querySelector('#theme');
const storedTheme=localStorage.getItem('portfolio-theme');
if(storedTheme==='dark') document.body.classList.add('theme-dark');
if(storedTheme==='light') document.body.classList.remove('theme-dark');
const updateThemeButton=()=>{
  if(!themeButton)return;
  const dark=document.body.classList.contains('theme-dark');
  themeButton.textContent=dark?'☀':'◐';
  themeButton.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#07101f':'#f7f9fc');
};
if(themeButton){
  updateThemeButton();
  themeButton.onclick=()=>{
    document.body.classList.toggle('theme-dark');
    localStorage.setItem('portfolio-theme',document.body.classList.contains('theme-dark')?'dark':'light');
    updateThemeButton();
  };
}
const backTop=document.querySelector('#backToTop');
const updateBackTop=()=>backTop?.classList.toggle('visible',scrollY>480);
addEventListener('scroll',updateBackTop,{passive:true});updateBackTop();
backTop?.addEventListener('click',e=>{e.preventDefault();scrollTo({top:0,behavior:'smooth'})});
const shots=[...document.querySelectorAll('.shot')];
if(shots.length){
  const modal=document.createElement('div');modal.className='image-modal';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Work sample image preview');
  modal.innerHTML='<div class="image-modal-card"><button class="image-modal-close" aria-label="Close preview">×</button><img alt=""><div class="image-modal-caption"></div></div>';
  document.body.append(modal);
  const image=modal.querySelector('img'),caption=modal.querySelector('.image-modal-caption'),close=()=>modal.classList.remove('open');
  const open=shot=>{const src=shot.querySelector('img'),text=shot.querySelector('figcaption')?.textContent||src.alt;image.src=src.src;image.alt=src.alt;caption.textContent=text;modal.classList.add('open');modal.querySelector('button').focus()};
  shots.forEach(shot=>{shot.addEventListener('click',()=>open(shot));shot.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(shot)}})});
  modal.querySelector('.image-modal-close').addEventListener('click',close);modal.addEventListener('click',e=>{if(e.target===modal)close()});addEventListener('keydown',e=>{if(e.key==='Escape')close()});
}

addEventListener('click',e=>{if(document.body.classList.contains('menu-open')&&!e.target.closest('.nav')&&!e.target.closest('#menu'))setMenuState(false)});


// Copy WeChat username from contact links.
const wechatLinks=[...document.querySelectorAll('[data-wechat]')];
if(wechatLinks.length){
  const toast=document.createElement('div');
  toast.className='wechat-toast';
  toast.setAttribute('role','status');
  toast.setAttribute('aria-live','polite');
  document.body.append(toast);
  let toastTimer;
  const notify=(message)=>{
    toast.textContent=message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer=setTimeout(()=>toast.classList.remove('show'),2400);
  };
  wechatLinks.forEach(link=>link.addEventListener('click',async e=>{
    e.preventDefault();
    const username=link.dataset.wechat||'@kenbernardino';
    try{await navigator.clipboard.writeText(username);notify(`WeChat ${username} copied`)}
    catch{notify(`WeChat: ${username}`)}
  }));
}


// Top hero photo banner carousel.
const heroCarousel = document.querySelector('[data-hero-carousel]');
if (heroCarousel) {
  const heroSlides = [...heroCarousel.querySelectorAll('[data-hero-slide]')];
  const heroDots = [...heroCarousel.querySelectorAll('[data-hero-dot]')];
  const heroPrevious = heroCarousel.querySelector('[data-hero-prev]');
  const heroNext = heroCarousel.querySelector('[data-hero-next]');
  let heroIndex = 0;
  let heroTimer;

  const updateHeroCarousel = (nextIndex) => {
    heroIndex = (nextIndex + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, index) => {
      slide.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden');

      const previousIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
      const nextSlideIndex = (heroIndex + 1) % heroSlides.length;

      if (index === heroIndex) slide.classList.add('is-active');
      else if (index === previousIndex) slide.classList.add('is-prev');
      else if (index === nextSlideIndex) slide.classList.add('is-next');
      else slide.classList.add('is-hidden');
    });

    heroDots.forEach((dot, index) => {
      const active = index === heroIndex;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', String(active));
    });
  };

  const restartHeroTimer = () => {
    clearInterval(heroTimer);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      heroTimer = setInterval(() => updateHeroCarousel(heroIndex + 1), 6500);
    }
  };

  heroPrevious?.addEventListener('click', () => {
    updateHeroCarousel(heroIndex - 1);
    restartHeroTimer();
  });

  heroNext?.addEventListener('click', () => {
    updateHeroCarousel(heroIndex + 1);
    restartHeroTimer();
  });

  heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateHeroCarousel(index);
      restartHeroTimer();
    });
  });

  heroSlides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      if (index !== heroIndex) {
        updateHeroCarousel(index);
        restartHeroTimer();
      }
    });
  });

  heroCarousel.addEventListener('mouseenter', () => clearInterval(heroTimer));
  heroCarousel.addEventListener('mouseleave', restartHeroTimer);

  updateHeroCarousel(0);
  restartHeroTimer();
}

// Work-sample gallery carousels.
document.querySelectorAll('[data-gallery-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.gallery-carousel-track');
  const items = [...track.querySelectorAll('.shot')];
  const previous = carousel.querySelector('.gallery-carousel-prev');
  const next = carousel.querySelector('.gallery-carousel-next');
  const dots = carousel.querySelector('.gallery-carousel-dots');

  if (!track || !items.length || !dots) return;

  const visibleCount = () => {
    if (matchMedia('(max-width: 720px)').matches) return 1;
    if (matchMedia('(max-width: 980px)').matches) return 2;
    return 3;
  };

  const pageCount = () => Math.max(1, Math.ceil(items.length / visibleCount()));

  const itemStep = () => {
    const first = items[0];
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || '0');
    return first.getBoundingClientRect().width + gap;
  };

  const currentPage = () => {
    const step = itemStep() * visibleCount();
    return Math.max(0, Math.min(pageCount() - 1, Math.round(track.scrollLeft / step)));
  };

  const goToPage = (page) => {
    const safePage = Math.max(0, Math.min(pageCount() - 1, page));
    track.scrollTo({
      left: itemStep() * visibleCount() * safePage,
      behavior: 'smooth'
    });
  };

  const renderDots = () => {
    dots.innerHTML = '';
    for (let i = 0; i < pageCount(); i += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Go to gallery page ${i + 1}`);
      dot.addEventListener('click', () => goToPage(i));
      dots.append(dot);
    }
  };

  const updateControls = () => {
    const page = currentPage();
    [...dots.querySelectorAll('button')].forEach((dot, index) => {
      dot.classList.toggle('is-active', index === page);
    });
    if (previous) previous.disabled = page === 0;
    if (next) next.disabled = page === pageCount() - 1;
  };

  previous?.addEventListener('click', () => goToPage(currentPage() - 1));
  next?.addEventListener('click', () => goToPage(currentPage() + 1));

  let dragging = false;
  let startX = 0;
  let startScroll = 0;

  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    dragging = true;
    startX = event.clientX;
    startScroll = track.scrollLeft;
    track.classList.add('is-dragging');
    track.setPointerCapture?.(event.pointerId);
  });

  track.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    track.scrollLeft = startScroll - (event.clientX - startX);
  });

  const stopDragging = (event) => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove('is-dragging');
    track.releasePointerCapture?.(event.pointerId);
    goToPage(currentPage());
  };

  track.addEventListener('pointerup', stopDragging);
  track.addEventListener('pointercancel', stopDragging);
  track.addEventListener('scroll', () => requestAnimationFrame(updateControls), { passive: true });

  const refresh = () => {
    renderDots();
    updateControls();
  };

  addEventListener('resize', refresh);
  refresh();
});


// Cinematic work-sample carousel and reliable image enlargement.
document.querySelectorAll('[data-gallery-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.gallery-carousel-track');
  const items = [...track.querySelectorAll('.shot')];
  const previous = carousel.querySelector('.gallery-carousel-prev');
  const next = carousel.querySelector('.gallery-carousel-next');
  const dots = carousel.querySelector('.gallery-carousel-dots');

  if (!track || !items.length) return;

  carousel.dataset.cinematicReady = 'true';
  let activeIndex = 0;

  const normalise = (index) => (index + items.length) % items.length;

  const render = (index) => {
    activeIndex = normalise(index);
    const prevIndex = normalise(activeIndex - 1);
    const nextIndex = normalise(activeIndex + 1);
    const farPrevIndex = normalise(activeIndex - 2);
    const farNextIndex = normalise(activeIndex + 2);

    items.forEach((item, itemIndex) => {
      item.classList.remove('is-active', 'is-prev', 'is-next', 'is-far-prev', 'is-far-next');
      if (itemIndex === activeIndex) item.classList.add('is-active');
      else if (itemIndex === prevIndex) item.classList.add('is-prev');
      else if (itemIndex === nextIndex) item.classList.add('is-next');
      else if (itemIndex === farPrevIndex) item.classList.add('is-far-prev');
      else if (itemIndex === farNextIndex) item.classList.add('is-far-next');
    });

    if (dots) {
      [...dots.querySelectorAll('button')].forEach((dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === activeIndex);
      });
    }
  };

  if (dots) {
    dots.innerHTML = '';
    items.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Show gallery item ${index + 1}`);
      dot.addEventListener('click', (event) => {
        event.stopPropagation();
        render(index);
      });
      dots.append(dot);
    });
  }

  previous?.addEventListener('click', (event) => {
    event.stopPropagation();
    render(activeIndex - 1);
  });

  next?.addEventListener('click', (event) => {
    event.stopPropagation();
    render(activeIndex + 1);
  });

  items.forEach((item, index) => {
    item.addEventListener('click', (event) => {
      if (!item.classList.contains('is-active')) {
        event.preventDefault();
        event.stopImmediatePropagation();
        render(index);
      }
    }, true);
  });

  let touchStartX = 0;
  track.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0]?.clientX || 0;
  }, { passive: true });

  track.addEventListener('touchend', (event) => {
    const touchEndX = event.changedTouches[0]?.clientX || 0;
    const distance = touchEndX - touchStartX;
    if (Math.abs(distance) > 45) {
      render(activeIndex + (distance < 0 ? 1 : -1));
    }
  }, { passive: true });

  render(0);
});

// Ensure clicking an active gallery item always opens a large preview.
document.querySelectorAll('.gallery-carousel-track .shot').forEach((shot) => {
  shot.addEventListener('click', () => {
    if (!shot.classList.contains('is-active')) return;

    const sourceImage = shot.querySelector('img');
    if (!sourceImage) return;

    let modal = document.querySelector('.image-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'image-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.innerHTML = `
        <div class="image-modal-card">
          <button class="image-modal-close" aria-label="Close preview">×</button>
          <img alt="">
          <div class="image-modal-caption"></div>
        </div>`;
      document.body.append(modal);
    }

    const modalImage = modal.querySelector('img');
    const caption = modal.querySelector('.image-modal-caption');
    modalImage.src = sourceImage.currentSrc || sourceImage.src;
    modalImage.alt = sourceImage.alt || '';
    caption.textContent = shot.querySelector('figcaption strong')?.textContent || '';

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    const closeModal = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    };

    modal.querySelector('.image-modal-close')?.addEventListener('click', closeModal, { once: true });
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    }, { once: true });

    const escapeHandler = (event) => {
      if (event.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    document.addEventListener('keydown', escapeHandler);
  });
});


// Final reliable click-to-enlarge handler for gallery images.
(() => {
  let modal = document.querySelector('.image-modal');

  const ensureModal = () => {
    if (modal) return modal;

    modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Expanded gallery image');
    modal.innerHTML = `
      <div class="image-modal-card">
        <button class="image-modal-close" type="button" aria-label="Close image preview">×</button>
        <img alt="">
        <div class="image-modal-caption"></div>
      </div>`;
    document.body.appendChild(modal);
    return modal;
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.addEventListener('click', (event) => {
    const closeButton = event.target.closest('.image-modal-close');
    if (closeButton) {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.target === modal) {
      closeModal();
      return;
    }

    const shot = event.target.closest('.gallery-carousel-track .shot');
    if (!shot || !shot.classList.contains('is-active')) return;

    event.preventDefault();
    event.stopPropagation();

    const sourceImage = shot.querySelector('img');
    if (!sourceImage) return;

    const activeModal = ensureModal();
    const modalImage = activeModal.querySelector('img');
    const caption = activeModal.querySelector('.image-modal-caption');

    modalImage.src = sourceImage.currentSrc || sourceImage.src;
    modalImage.alt = sourceImage.alt || '';
    caption.textContent =
      shot.querySelector('figcaption strong')?.textContent?.trim() || sourceImage.alt || '';

    activeModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal?.classList.contains('open')) {
      closeModal();
    }
  });
})();


// Dedicated gallery lightbox for active carousel cards.
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.querySelector('#galleryLightbox');
  if (!lightbox) return;

  const lightboxImage = lightbox.querySelector('#galleryLightboxImage');
  const lightboxCaption = lightbox.querySelector('#galleryLightboxCaption');

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('gallery-lightbox-open');
    lightboxImage.src = '';
  };

  document.querySelectorAll('.gallery-carousel-track .shot').forEach((shot) => {
    shot.addEventListener('click', (event) => {
      if (!shot.classList.contains('is-active')) return;

      event.preventDefault();
      event.stopImmediatePropagation();

      const source = shot.querySelector('img');
      if (!source) return;

      lightboxImage.src = source.currentSrc || source.src;
      lightboxImage.alt = source.alt || '';
      lightboxCaption.textContent =
        shot.querySelector('figcaption strong')?.textContent?.trim() ||
        source.alt ||
        '';

      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('gallery-lightbox-open');
      lightbox.querySelector('.gallery-lightbox-close')?.focus();
    }, true);
  });

  lightbox.querySelectorAll('[data-lightbox-close]').forEach((control) => {
    control.addEventListener('click', closeLightbox);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
});

document.querySelectorAll('.badge-card-compact,.badge-card-premium,.featured-badge-image').forEach(el=>{
 el.addEventListener('mousemove',e=>{
   const r=el.getBoundingClientRect();
   el.style.setProperty('--mx',(e.clientX-r.left)+'px');
   el.style.setProperty('--my',(e.clientY-r.top)+'px');
 });
});


// Global cursor-follow effect.
(() => {
  if (
    matchMedia('(hover: none)').matches ||
    matchMedia('(pointer: coarse)').matches ||
    matchMedia('(prefers-reduced-motion: reduce)').matches
  ) return;

  const glow = document.createElement('div');
  glow.className = 'global-cursor-glow';

  const dot = document.createElement('div');
  dot.className = 'global-cursor-dot';

  document.body.append(glow, dot);

  let targetX = innerWidth / 2;
  let targetY = innerHeight / 2;
  let glowX = targetX;
  let glowY = targetY;
  let dotX = targetX;
  let dotY = targetY;
  let frameId = null;

  const animate = () => {
    dotX += (targetX - dotX) * 0.34;
    dotY += (targetY - dotY) * 0.34;
    glowX += (targetX - glowX) * 0.11;
    glowY += (targetY - glowY) * 0.11;

    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;

    frameId = requestAnimationFrame(animate);
  };

  const showCursor = () => {
    document.body.classList.add('global-cursor-visible');
  };

  const hideCursor = () => {
    document.body.classList.remove('global-cursor-visible');
  };

  document.addEventListener('mousemove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    showCursor();
  }, { passive: true });

  document.addEventListener('mouseenter', showCursor);
  document.addEventListener('mouseleave', hideCursor);

  document.addEventListener('mouseover', (event) => {
    const interactive = event.target.closest(
      'a, button, [role="button"], input, select, textarea, .interactive-card, .project, .shot, .job, .cert, .badge-card'
    );
    document.body.classList.toggle('global-cursor-interactive', Boolean(interactive));
  });

  document.addEventListener('mouseout', (event) => {
    if (!event.relatedTarget) {
      document.body.classList.remove('global-cursor-interactive');
      return;
    }

    const nextInteractive = event.relatedTarget.closest?.(
      'a, button, [role="button"], input, select, textarea, .interactive-card, .project, .shot, .job, .cert, .badge-card'
    );

    if (!nextInteractive) {
      document.body.classList.remove('global-cursor-interactive');
    }
  });

  frameId = requestAnimationFrame(animate);

  addEventListener('pagehide', () => {
    if (frameId) cancelAnimationFrame(frameId);
  });
})();


// Syntax-code cursor used throughout the website.
(() => {
  if (
    matchMedia('(hover: none)').matches ||
    matchMedia('(pointer: coarse)').matches ||
    matchMedia('(prefers-reduced-motion: reduce)').matches
  ) return;

  const cursor = document.createElement('div');
  cursor.className = 'syntax-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  document.body.append(cursor);

  const trailSymbols = ['{ }', '()', '<>', '=>', '[]', 'const', 'let', '01'];
  let symbolIndex = 0;
  let targetX = innerWidth / 2;
  let targetY = innerHeight / 2;
  let cursorX = targetX;
  let cursorY = targetY;
  let lastTrailTime = 0;
  let animationFrame = null;

  const interactiveSelector =
    'a, button, [role="button"], input, select, textarea, ' +
    '.interactive-card, .project, .shot, .job, .cert, .badge-card';

  const animate = () => {
    cursorX += (targetX - cursorX) * 0.3;
    cursorY += (targetY - cursorY) * 0.3;
    cursor.style.left = `${cursorX + 14}px`;
    cursor.style.top = `${cursorY + 14}px`;
    animationFrame = requestAnimationFrame(animate);
  };

  const createTrail = (x, y) => {
    const trail = document.createElement('span');
    trail.className = 'syntax-trail';
    trail.textContent = trailSymbols[symbolIndex % trailSymbols.length];
    symbolIndex += 1;
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;
    document.body.append(trail);
    trail.addEventListener('animationend', () => trail.remove(), { once: true });
  };

  document.addEventListener('mousemove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    document.body.classList.add('syntax-cursor-visible');

    const now = performance.now();
    if (now - lastTrailTime > 110) {
      createTrail(event.clientX, event.clientY);
      lastTrailTime = now;
    }
  }, { passive: true });

  document.addEventListener('mouseover', (event) => {
    document.body.classList.toggle(
      'syntax-cursor-interactive',
      Boolean(event.target.closest(interactiveSelector))
    );
  });

  document.addEventListener('mouseout', (event) => {
    const nextInteractive = event.relatedTarget?.closest?.(interactiveSelector);
    if (!nextInteractive) {
      document.body.classList.remove('syntax-cursor-interactive');
    }
  });

  document.addEventListener('mouseleave', () => {
    document.body.classList.remove(
      'syntax-cursor-visible',
      'syntax-cursor-interactive'
    );
  });

  animationFrame = requestAnimationFrame(animate);

  addEventListener('pagehide', () => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
  });
})();

