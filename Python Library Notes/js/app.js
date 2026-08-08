
// ---------- progress bar ----------
const progressBar = document.getElementById('progress');
const toTopBtn = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressBar.style.width = scrolled + '%';
  toTopBtn.classList.toggle('show', h.scrollTop > 500);
}, {passive:true});

// ---------- run buttons ----------
function runCell(btn){
  const wrap = btn.closest('.cell').querySelector('.out-wrap');
  const opening = !wrap.classList.contains('open');
  wrap.classList.toggle('open');
  btn.textContent = wrap.classList.contains('open') ? '↻ Rerun' : '▶ Run';
  if(opening){ wrap.scrollIntoView({behavior:'smooth', block:'nearest'}); }
}

// ---------- scroll reveal (progressive enhancement — never hides content unless JS confirms it can reveal it) ----------
const revealEls = document.querySelectorAll('.reveal');
revealEls.forEach(el => el.classList.add('pre-reveal'));
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in-view'); revealObserver.unobserve(e.target); } });
}, {threshold:0, rootMargin:'0px 0px -5% 0px'});
revealEls.forEach(el => revealObserver.observe(el));
// belt-and-suspenders: force-reveal anything still hidden after 1.5s
setTimeout(() => { document.querySelectorAll('.reveal:not(.in-view)').forEach(el => el.classList.add('in-view')); }, 1500);

// ---------- subject cards: staggered spring entrance (same safe pattern) ----------
(function(){
  const toolbox = document.getElementById('toolbox');
  if(!toolbox) return;
  const cards = toolbox.querySelectorAll('.tool-card');
  cards.forEach(card => card.classList.add('pre-reveal'));
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        cards.forEach((card, i) => {
          card.style.transitionDelay = (i * 0.12) + 's';
          card.classList.add('show');
        });
        setTimeout(() => { cards.forEach(card => { card.style.transitionDelay = '0s'; }); }, cards.length * 120 + 700);
        cardObserver.unobserve(toolbox);
      }
    });
  }, {threshold:0, rootMargin:'0px 0px -5% 0px'});
  cardObserver.observe(toolbox);
  // belt-and-suspenders: force-reveal if the observer never fires for any reason
  setTimeout(() => { cards.forEach(card => card.classList.add('show')); }, 1500);
})();

// ---------- nav active pill ----------
const pills = document.querySelectorAll('.pill');
const navSections = ['home','numpy','pandas','matplotlib','seaborn','compare'].map(id => document.getElementById(id)).filter(Boolean);
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.id;
      pills.forEach(p => {
        const match = p.getAttribute('href') === '#' + id;
        p.classList.toggle('active', match);
        p.style.setProperty('--pill-c', match ? p.dataset.c : null);
      });
    }
  });
}, {rootMargin:'-45% 0px -45% 0px'});
navSections.forEach(s => navObserver.observe(s));

// ---------- hero typewriter ----------
const lines = [
  "import pandas as pd\ndf = pd.read_csv('marks.csv')\ndf.head()",
  "import numpy as np\nscores = np.array([72, 88, 91])\nscores.mean()",
  "import seaborn as sns\nsns.boxplot(data=df, x='section', y='marks')",
  "import matplotlib.pyplot as plt\nplt.plot(days, temp)\nplt.show()"
];
const twEl = document.getElementById('typewriter');
let li = 0;
function typeLine(){
  const text = lines[li];
  let ci = 0;
  twEl.textContent = '';
  const iv = setInterval(() => {
    twEl.textContent += text[ci];
    ci++;
    if(ci >= text.length){
      clearInterval(iv);
      setTimeout(() => { li = (li+1) % lines.length; typeLine(); }, 1600);
    }
  }, 28);
}
typeLine();

// ---------- mark complete + confetti ----------
function markComplete(btn, sectionId){
  const already = btn.classList.contains('done');
  btn.classList.toggle('done');
  btn.textContent = already ? '🎯 Mark ' + capitalize(sectionId) + ' as learned' : '✅ ' + capitalize(sectionId) + ' learned!';
  const pill = document.querySelector('.pill[href="#' + sectionId + '"]');
  if(pill){ pill.classList.toggle('done-check', !already); }
  if(!already){ burstConfetti(btn); }
}
function capitalize(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

function burstConfetti(originEl){
  const colors = ['#F2A93B','#0E9594','#E4572E','#6C5B7B'];
  const rect = originEl.getBoundingClientRect();
  const originX = rect.left + rect.width/2;
  for(let i=0;i<28;i++){
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = (originX + (Math.random()*200-100)) + 'px';
    piece.style.top = (rect.top - 10) + 'px';
    piece.style.background = colors[Math.floor(Math.random()*colors.length)];
    piece.style.transform = 'rotate(' + Math.floor(Math.random()*360) + 'deg)';
    document.body.appendChild(piece);
    const fallY = 300 + Math.random()*250;
    const drift = Math.random()*160-80;
    const duration = 1200 + Math.random()*900;
    piece.animate([
      { transform: piece.style.transform + ' translate(0,0)', opacity: 1 },
      { transform: piece.style.transform + ` translate(${drift}px, ${fallY}px)`, opacity: 0 }
    ], { duration: duration, easing: 'cubic-bezier(.3,.6,.7,1)' });
    setTimeout(() => piece.remove(), duration + 50);
  }
}

// ---------- quiz engine ----------
function initQuizzes(){
  document.querySelectorAll('.quiz-q').forEach(q => {
    const correctIdx = parseInt(q.dataset.answer, 10);
    const reason = q.dataset.reason;
    const opts = q.querySelectorAll('.qopt');
    const fb = q.querySelector('.qfeedback');
    opts.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        if(q.classList.contains('answered')) return;
        q.classList.add('answered');
        opts.forEach(o => o.classList.add('disabled'));
        opts[correctIdx].classList.add('correct');
        if(i !== correctIdx){
          btn.classList.add('wrong');
          fb.className = 'qfeedback show bad';
          fb.innerHTML = '<b>Not quite — correct answer: "' + opts[correctIdx].textContent + '".</b> ' + reason;
        } else {
          fb.className = 'qfeedback show ok';
          fb.innerHTML = '<b>Correct! ✅</b> ' + reason;
        }
      });
    });
  });
}
initQuizzes();
