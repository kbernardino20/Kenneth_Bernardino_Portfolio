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
const jobs={qbe:{title:'Senior Software Engineer',company:'QBE Group Shared Services Centre',points:['Delivered enterprise communication and application enhancements across business-critical workflows.','Supported production issues, investigated root causes and coordinated fixes through controlled release processes.','Worked with analysts, testers and stakeholders in an Agile delivery environment.','Improved workflows and maintained clear technical documentation.'],tags:['Software Engineering','Production Support','System Analysis','Agile','Testing','Documentation','OpenText Exstream']},dxc2:{title:'Technology Consultant II',company:'DXC Technology',points:['Developed and supported enterprise output-generation solutions for a government housing environment.','Translated business requirements into technical designs, reusable components and validation rules.','Participated in testing, deployment preparation, issue resolution and stakeholder coordination.','Maintained delivery quality through documentation and structured review processes.'],tags:['Enterprise Applications','Application Support','Testing','SQL','Technical Design','OpenText Exstream']},fx:{title:'Systems Analyst',company:'Fuji Xerox Singapore',points:['Analysed application requirements and supported customer communication and document workflows.','Developed and maintained software components used in enterprise production environments.','Investigated defects, validated outputs and documented technical solutions.'],tags:['Systems Analysis','Software Development','Quality Assurance','Support','Documentation']},dxc1:{title:'Programmer Analyst',company:'DXC Technology',points:['Built and maintained application components from approved business and technical requirements.','Supported testing, defect resolution, release preparation and ongoing system maintenance.','Collaborated with delivery teams to provide reliable outputs and clear documentation.'],tags:['Programming','Application Development','Testing','Release Support','Documentation']}};const panel=document.querySelector('#job-panel');function renderJob(k){const j=jobs[k];if(!j||!panel)return;panel.innerHTML=`<span class="company">${j.company}</span><h3>${j.title}</h3><ul>${j.points.map(x=>`<li>${x}</li>`).join('')}</ul><div class="tag-row">${j.tags.map(x=>`<b>${x}</b>`).join('')}</div>`}const experienceGrid=document.querySelector('.experience-grid'),experienceList=document.querySelector('.experience-list');
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
