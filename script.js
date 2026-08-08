window.addEventListener('load', ()=>{
  setTimeout(()=>{ document.getElementById('veil').classList.add('hide'); }, 400);
});

const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
window.addEventListener('mousemove', e=>{
  mx=e.clientX; my=e.clientY;
  dot.style.left=mx+'px'; dot.style.top=my+'px';
});
function animCursor(){
  rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a,button,.perk,.tier,.faq-q').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.classList.add('hover'));
  el.addEventListener('mouseleave',()=>ring.classList.remove('hover'));
});

const visor = document.querySelector('.visor-wrap');
if(visor){
  document.querySelector('.hero-visual').addEventListener('mousemove', e=>{
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left - r.width/2) / (r.width/2);
    const py = (e.clientY - r.top - r.height/2) / (r.height/2);
    visor.style.transform = `rotateY(${px*10}deg) rotateX(${-py*10}deg)`;
  });
  document.querySelector('.hero-visual').addEventListener('mouseleave', ()=>{
    visor.style.transform = 'rotateY(0) rotateX(0)';
  });
}

document.querySelectorAll('.perk').forEach(p=>{
  p.addEventListener('mousemove', e=>{
    const r = p.getBoundingClientRect();
    p.style.setProperty('--mx', (e.clientX-r.left)+'px');
    p.style.setProperty('--my', (e.clientY-r.top)+'px');
  });
});

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W,H,particles=[];
function resize(){ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
resize();
window.addEventListener('resize', resize);
const COUNT = window.innerWidth < 700 ? 35 : 70;
for(let i=0;i<COUNT;i++){
  particles.push({
    x:Math.random()*W, y:Math.random()*H,
    vx:(Math.random()-0.5)*0.25, vy:(Math.random()-0.5)*0.25,
    r:Math.random()*1.6+0.4,
    hue: Math.random()>0.85 ? '255,61,110' : '57,244,214'
  });
}
function tick(){
  ctx.clearRect(0,0,W,H);
  particles.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0)p.x=W; if(p.x>W)p.x=0;
    if(p.y<0)p.y=H; if(p.y>H)p.y=0;
    ctx.beginPath();
    ctx.fillStyle=`rgba(${p.hue},0.55)`;
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(tick);
}
tick();

document.querySelectorAll('.perks-grid, .tier-grid, .path').forEach(grid=>{
  const kids = grid.children;
  Array.from(kids).forEach((k,i)=>{
    k.style.transition = `opacity .6s cubic-bezier(.16,1,.3,1) ${i*80}ms, transform .6s cubic-bezier(.16,1,.3,1) ${i*80}ms`;
  });
});

function countUp(el){
  const text = el.textContent.trim();
  const match = text.match(/[\d.]+/);
  if(!match) return;
  const num = parseFloat(match[0]);
  const suffix = text.replace(match[0],'');
  let cur = 0;
  const dur = 1400;
  const start = performance.now();
  function step(t){
    const p = Math.min((t-start)/dur,1);
    const eased = 1 - Math.pow(1-p,3);
    cur = num*eased;
    el.textContent = (num % 1 === 0 ? Math.floor(cur) : cur.toFixed(1)) + suffix;
    if(p<1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
const statObserver = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      countUp(e.target);
      statObserver.unobserve(e.target);
    }
  });
},{threshold:0.5});
document.querySelectorAll('.stat b').forEach(b=>statObserver.observe(b));

const layer = document.getElementById('floatLayer');
const shapes = [
  {w:70,h:70,top:'12%',left:'6%',anim:'drift 9s ease-in-out infinite'},
  {w:40,h:40,top:'28%',left:'88%',anim:'drift2 7s ease-in-out infinite'},
  {w:100,h:100,top:'62%',left:'3%',anim:'drift 11s ease-in-out infinite'},
  {w:55,h:55,top:'75%',left:'92%',anim:'drift2 8.5s ease-in-out infinite'},
  {w:30,h:30,top:'45%',left:'50%',anim:'drift 6s ease-in-out infinite'},
  {w:85,h:85,top:'85%',left:'40%',anim:'drift2 10s ease-in-out infinite'},
];
shapes.forEach((s,i)=>{
  const el = document.createElement('div');
  el.className='chip';
  el.style.width=s.w+'px';
  el.style.height=s.h+'px';
  el.style.top=s.top;
  el.style.left=s.left;
  el.style.animation=s.anim;
  el.style.animationDelay=(i*0.4)+'s';
  el.style.borderRadius = i%2===0 ? '4px' : '50%';
  layer.appendChild(el);
});

const core = document.querySelector('.visor-wrap');
for(let i=0;i<24;i++){
  const t = document.createElement('div');
  t.className='tick';
  t.style.transform = `rotate(${i*15}deg)`;
  core.appendChild(t);
}

const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); } });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

document.querySelectorAll('.faq-item').forEach(item=>{
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  if(item.classList.contains('open')){ a.style.maxHeight = a.scrollHeight+'px'; }
  q.addEventListener('click',()=>{
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>{
      i.classList.remove('open');
      i.querySelector('.faq-a').style.maxHeight = 0;
    });
    if(!isOpen){
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight+'px';
    }
  });
});

const CA_APPLY_URL = 'https://ca.techfest.org/';

document.querySelectorAll('.apply-btn').forEach(b=>{
  b.addEventListener('click',()=> window.open(CA_APPLY_URL, '_blank', 'noopener'));
});

const viewProtocolBtn = document.getElementById('viewProtocolBtn');
if(viewProtocolBtn){
  viewProtocolBtn.addEventListener('click',()=> document.getElementById('about').scrollIntoView({behavior:'smooth'}));
}
