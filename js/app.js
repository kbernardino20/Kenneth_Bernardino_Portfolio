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
  const active=document.querySelector('.job.active');
  if(matchMedia('(max-width: 620px)').matches&&active){
    active.insertAdjacentElement('afterend',panel);
  }else if(panel.parentElement!==experienceGrid){
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
