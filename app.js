(()=>{'use strict';
const K='miaomiao-study-desk-v2',$=s=>document.querySelector(s),nav=$('#nav'),page=$('#page');
const navs=[['home','首页','⌂'],['chinese','语文','书'],['math','数学','123'],['english','英语','Aa'],['sport','运动','动'],['shop','商城','店'],['pet','宠物','猫'],['rewards','奖励','☆'],['calendar','日历','日']];
const meta={chinese:['语文','📖','#f6e4e8'],math:['数学','123','#eaf2fb'],english:['英语','ABC','#f9efde'],sport:['运动','🪢','#e7f4ea']};
const wd=['日','一','二','三','四','五','六'];
const defaults=[
{id:'cn-write',subject:'chinese',name:'练字',icon:'✍️',days:[0,1,2,3,4,5,6],core:1,builtin:1},
{id:'cn-read',subject:'chinese',name:'阅读',icon:'📖',days:[0,1,2,3,4,5,6],core:1,builtin:1},
{id:'math-homework',subject:'math',name:'数学作业',icon:'➕',days:[0,1,2,3,4,5,6],core:1,builtin:1},
{id:'en-listen',subject:'english',name:'英语听力',icon:'🎧',days:[0,1,2,3,4,5,6],core:1,builtin:1},
{id:'en-raz',subject:'english',name:'RAZ',icon:'🔤',days:[0,1,2,3,4,5,6],core:1,builtin:1},
{id:'sp-rope',subject:'sport',name:'跳绳',icon:'🪢',days:[1,2,3,4],core:1,builtin:1},
{id:'sp-badminton',subject:'sport',name:'羽毛球',icon:'🏸',days:[0,5],core:1,builtin:1},
{id:'sp-free',subject:'sport',name:'自由运动',icon:'🌿',days:[6],core:1,builtin:1}
];
const fixedRewards=[{id:'tv',title:'看电视半小时',emoji:'📺',points:36},{id:'snack',title:'小零食',emoji:'🍪',points:60},{id:'toy',title:'小玩具',emoji:'🎁',points:84}];
const shop=[
['food-kibble','食物','猫粮','🥣',8,'feed'],['food-treat','食物','猫条','🐟',5,'feed'],['food-can','食物','主食罐头','🥫',10,'feed'],['food-freeze','食物','冻干','🍗',7,'feed'],
['toy-wand','玩具','逗猫棒','🪶',8,'play'],['toy-ball','玩具','小球','⚽',6,'play'],['toy-scratch','玩具','猫抓板','🧶',12,'play'],['toy-box','玩具','纸箱','📦',4,'play'],
['care-brush','洗漱','梳毛刷','🪮',6,'groom'],['care-bath','洗漱','洗护套装','🫧',12,'bath'],['care-towel','洗漱','小毛巾','🧺',5,'groom'],['care-nail','洗漱','指甲护理','✨',8,'groom'],
['med-kit','医疗','护理包','🧰',10,'treat'],['med-cone','医疗','护理头套','🔶',9,'treat'],['med-check','医疗','体检券','🩺',14,'treat'],['med-rest','医疗','休息垫','🛏️',7,'rest']
].map(x=>({id:x[0],cat:x[1],name:x[2],emoji:x[3],cost:x[4],action:x[5]}));
const petReactions={
'food-kibble':{cls:'eating-kibble',notice:'听到猫粮声，奶糕马上竖起耳朵。',text:'奶糕走到饭碗前，咔嚓咔嚓认真吃猫粮。',prop:'<span class="prop-kibble">🥣</span>',fx:'<span class="crumb crumb-1">•</span><span class="crumb crumb-2">•</span>',sound:'crunch',mood:4},
'food-treat':{cls:'eating-treat',notice:'奶糕闻到猫条，立刻凑过来闻一闻。',text:'奶糕一小口一小口舔猫条，吃完还舔了舔嘴巴。',prop:'<span class="prop-treat">🐟</span>',fx:'<span class="lick-mark">〰</span>',sound:'lick',mood:5},
'food-can':{cls:'eating-can',notice:'罐头刚打开，奶糕就一路小跑过来了。',text:'奶糕埋头吃主食罐头，吃得特别专心。',prop:'<span class="prop-can">🥫</span><span class="prop-bowl">🥣</span>',fx:'<span class="smell smell-1">〜</span><span class="smell smell-2">〜</span>',sound:'pop',mood:5},
'food-freeze':{cls:'eating-freeze',notice:'冻干发出沙沙声，奶糕抬头盯住了袋子。',text:'奶糕叼走一块冻干，嚼得嘎嘣脆。',prop:'<span class="prop-freeze">🍗</span>',fx:'<span class="crumb crumb-1">•</span><span class="crumb crumb-2">•</span>',sound:'crunch',mood:5},
'toy-wand':{cls:'play-wand',notice:'逗猫棒一晃，奶糕的眼睛立刻跟着移动。',text:'奶糕压低身体、瞄准，然后猛地扑向逗猫棒！',prop:'<span class="prop-wand">🪶</span>',fx:'<span class="toy-motion">✦</span>',sound:'toy',mood:6},
'toy-ball':{cls:'play-ball',notice:'小球滚过地板，奶糕歪头盯了两秒。',text:'奶糕用爪子一拍，小球滚远了，它马上追过去。',prop:'<span class="prop-ball">⚽</span>',fx:'<span class="speed-line">➜</span>',sound:'ball',mood:6},
'toy-scratch':{cls:'play-scratch',notice:'奶糕走到猫抓板旁边闻了闻。',text:'奶糕前爪伸直，在猫抓板上认真抓了好几下。',prop:'<span class="prop-scratch">🧶</span>',fx:'<span class="scratch-line">///</span>',sound:'scratch',mood:5},
'toy-box':{cls:'play-box',notice:'纸箱刚放下，奶糕绕着它转了一圈。',text:'奶糕钻进纸箱，只露出脑袋偷偷观察外面。',prop:'<span class="prop-box">📦</span>',fx:'<span class="peek-mark">…</span>',sound:'rustle',mood:6},
'care-brush':{cls:'care-brush',notice:'梳子靠近时，奶糕先回头闻了闻。',text:'从头到背轻轻梳毛，奶糕眯着眼睛坐得很稳。',prop:'<span class="prop-brush">🪮</span>',fx:'<span class="spark spark-1">✦</span><span class="spark spark-2">✦</span>',sound:'brush',mood:5},
'care-bath':{cls:'care-bath',notice:'听见水声，奶糕往后缩了一小步。',text:'温水花洒轻轻冲洗，泡泡洗掉脏东西，最后甩了甩毛。',prop:'<span class="prop-shower">🚿</span>',fx:'<span class="bubble bubble-1">○</span><span class="bubble bubble-2">○</span><span class="bubble bubble-3">○</span>',sound:'splash',mood:2},
'care-towel':{cls:'care-towel',notice:'大毛巾铺开，奶糕站在原地看了看。',text:'毛巾轻轻包住奶糕，把湿湿的毛擦干。',prop:'<span class="prop-towel">🧺</span>',fx:'<span class="warm-line">☀</span>',sound:'rustle',mood:4},
'care-nail':{cls:'care-nail',notice:'奶糕把爪子缩了一下，但还是乖乖坐好。',text:'只做模拟指甲护理：轻轻托住爪子，一只一只检查。',prop:'<span class="prop-nail">✨</span>',fx:'<span class="paw-mark">🐾</span>',sound:'clip',mood:2},
'med-kit':{cls:'med-kit',notice:'护理包打开，奶糕安静地看着里面的东西。',text:'完成一次温和的模拟护理，奶糕随后趴下休息。',prop:'<span class="prop-kit">🧰</span>',fx:'<span class="care-plus">＋</span>',sound:'care',mood:3},
'med-cone':{cls:'med-cone',notice:'护理头套拿出来，奶糕先疑惑地歪了歪头。',text:'奶糕戴上模拟护理头套，走了两步又停下来适应。',prop:'<span class="prop-cone">🔶</span>',fx:'<span class="question-mark">?</span>',sound:'rustle',mood:1},
'med-check':{cls:'med-check',notice:'听诊器靠近，奶糕安静地坐着。',text:'模拟体检完成：听一听、看一看，然后奖励奶糕休息。',prop:'<span class="prop-check">🩺</span>',fx:'<span class="care-plus">＋</span>',sound:'softcare',mood:3},
'med-rest':{cls:'med-rest',notice:'柔软的小垫子铺好后，奶糕先踩了踩。',text:'奶糕在垫子上转一圈，蜷成一团慢慢睡着了。',prop:'<span class="prop-rest">🛏️</span>',fx:'<span class="zzz">Z z z</span>',sound:'rest',mood:5}
};
const init=()=>({points:0,fish:0,tasks:structuredClone(defaults),records:{},inventory:{},pet:{mood:82,message:'等你完成任务，我们一起玩吧！'},customRewards:[],rewardLog:[],shopCat:'食物'});
let state=(()=>{try{return {...init(),...JSON.parse(localStorage.getItem(K)||'{}')}}catch{return init()}})(),cur='home',tp=0,timer=null,pauseUntil=0,petBusy=false,petSession=0,petTimers=new Set();
const save=()=>localStorage.setItem(K,JSON.stringify(state));
const key=(d=new Date())=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const tasks=d=>state.tasks.filter(t=>t.days.includes(d.getDay())),core=d=>tasks(d),done=(id,k=key())=>(state.records[k]?.completed||[]).includes(id);
const rec=(k,d=new Date())=>{
    if(!state.records[k]) state.records[k]={completed:[],planned:core(d).map(t=>t.id)};
    if(!Array.isArray(state.records[k].completed)) state.records[k].completed=[];
    if(!Array.isArray(state.records[k].planned)&&k===key()) state.records[k].planned=core(d).map(t=>t.id);
    return state.records[k];
  };
  function syncTodayPlan(){const d=new Date(),r=rec(key(d),d);r.planned=core(d).map(t=>t.id);save()}
const full=d=>{
    const r=state.records[key(d)], ids=Array.isArray(r?.planned)?r.planned:core(d).map(t=>t.id);
    return ids.length>0&&ids.every(id=>(r?.completed||[]).includes(id));
  };
const weekStart=(d=new Date())=>{let x=new Date(d),n=(x.getDay()+6)%7;x.setDate(x.getDate()-n);x.setHours(0,0,0,0);return x};
const weekDates=()=>{const s=weekStart();return Array.from({length:7},(_,i)=>{let d=new Date(s);d.setDate(s.getDate()+i);return d})};
const weekFull=()=>{let n=new Date();n.setHours(23,59,59,999);return weekDates().filter(d=>d<=n&&full(d)).length};
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function taskRewardIcons(){
  return `<span class="task-reward-icons" aria-label="积分加2，小鱼干加1">
    <span class="task-reward-chip task-reward-point" title="积分 +2">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 6.5l1.7 3.2 3.6.5-2.6 2.5.6 3.6-3.3-1.7-3.3 1.7.6-3.6-2.6-2.5 3.6-.5z"/></svg><b>+2</b>
    </span>
    <span class="task-reward-chip task-reward-fish" title="小鱼干 +1">
      <svg viewBox="0 0 28 20" aria-hidden="true"><path d="M3 10c4-5 9-7 14-5 2 .8 3.8 2.2 5 4l4-3v8l-4-3c-1.2 1.8-3 3.2-5 4-5 2-10 0-14-5z"/><circle cx="17" cy="8" r="1.2"/></svg><b>+1</b>
    </span>
  </span>`
}
function catSvg(kind='large'){
  return `<svg class="cat-svg ${kind}" viewBox="0 0 260 200" aria-hidden="true">
    <g class="cat-tail-g"><path class="cat-tail-shape" d="M184 137 C238 126 246 86 219 73 C203 65 188 77 198 91 C207 104 226 93 224 78" fill="none" stroke="#d77a32" stroke-width="22" stroke-linecap="round"/></g>
    <g class="cat-body-g">
      <ellipse cx="142" cy="139" rx="70" ry="47" fill="#e98a3a"/>
      <path d="M95 137 C106 101 128 92 156 98 C181 103 198 124 199 151 C174 174 116 177 85 158 Z" fill="#ec9345"/>
      <path d="M111 109 C118 128 119 151 113 170" fill="none" stroke="#c96d2c" stroke-width="9" stroke-linecap="round"/>
      <path d="M144 102 C148 120 150 139 147 158" fill="none" stroke="#c96d2c" stroke-width="8" stroke-linecap="round"/>
      <ellipse cx="115" cy="169" rx="24" ry="10" fill="#f7cda5"/>
      <ellipse cx="171" cy="169" rx="25" ry="10" fill="#f7cda5"/>
      <path class="cat-front-paw" d="M111 136 C101 148 99 164 106 174" fill="none" stroke="#e98a3a" stroke-width="18" stroke-linecap="round"/>
    </g>
    <g class="cat-head-g">
      <path d="M84 65 L92 29 L119 52 Z" fill="#e98a3a" stroke="#b85f25" stroke-width="4"/>
      <path d="M154 52 L181 29 L186 69 Z" fill="#e98a3a" stroke="#b85f25" stroke-width="4"/>
      <path d="M94 43 L98 32 L109 47 Z" fill="#f4a5a5"/>
      <path d="M166 47 L178 33 L179 51 Z" fill="#f4a5a5"/>
      <ellipse cx="136" cy="82" rx="58" ry="48" fill="#ee9649" stroke="#b85f25" stroke-width="4"/>
      <path d="M104 55 L119 64 M100 69 L118 73 M168 56 L153 65 M174 70 L155 74" stroke="#b85f25" stroke-width="5" stroke-linecap="round"/>
      <g class="cat-eyes">
        <ellipse cx="116" cy="80" rx="7" ry="10" fill="#24354f"/><ellipse cx="156" cy="80" rx="7" ry="10" fill="#24354f"/>
        <circle cx="118" cy="77" r="2.2" fill="#fff"/><circle cx="158" cy="77" r="2.2" fill="#fff"/>
      </g>
      <g class="cat-eyes-closed"><path d="M108 82 Q116 88 124 82 M148 82 Q156 88 164 82" fill="none" stroke="#24354f" stroke-width="4" stroke-linecap="round"/></g>
      <path d="M131 93 Q136 98 141 93 Q136 88 131 93" fill="#a65b52"/>
      <path d="M136 98 Q132 106 124 104 M136 98 Q140 106 148 104" fill="none" stroke="#6b4a3d" stroke-width="3" stroke-linecap="round"/>
      <path d="M103 97 L72 92 M103 103 L69 104 M169 97 L201 91 M169 103 L204 105" stroke="#6b4a3d" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M105 111 Q136 132 168 111 Q164 137 136 141 Q109 136 105 111" fill="#f9dcc2" opacity=".75"/>
    </g>
  </svg>`;
}


let audioCtx=null;
function setAudioSession(type='auto'){
  try{
    if(navigator.audioSession&&'type' in navigator.audioSession)navigator.audioSession.type=type;
  }catch(e){}
}
function setPlaybackAudioSession(){setAudioSession('playback')}
function setDefaultAudioSession(){setAudioSession('auto')}
function ctx(){try{return audioCtx||(audioCtx=new (window.AudioContext||window.webkitAudioContext)())}catch{return null}}
async function unlockAudio(){const c=ctx();if(c&&c.state==='suspended'){try{await c.resume()}catch(e){}}}
function stopSynthAudio(){try{if(audioCtx&&audioCtx.state==='running')audioCtx.suspend()}catch(e){}}
function sweep(from,to,dur=.28,gain=.035,delay=0){
  const c=ctx();if(!c)return;const o=c.createOscillator(),g=c.createGain(),t=c.currentTime+delay;
  o.type='triangle';o.frequency.setValueAtTime(from,t);o.frequency.exponentialRampToValueAtTime(Math.max(60,to),t+dur);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(gain,t+.025);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+dur+.03);
}
function tone(freq=440,dur=.12,type='sine',gain=.035,delay=0){
  const c=ctx();if(!c)return;
  const o=c.createOscillator(),g=c.createGain(),t=c.currentTime+delay;
  o.type=type;o.frequency.setValueAtTime(freq,t);
  g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(gain,t+.015);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+dur+.03);
}
function soundCheckin(){tone(660,.1,'sine',.03);tone(880,.12,'sine',.028,.08)}
function soundMeow(){unlockAudio();sweep(720,410,.26,.032);sweep(520,300,.22,.018,.08)}
function soundPurr(){unlockAudio();for(let i=0;i<8;i++)tone(92+(i%2)*7,.1,'sawtooth',.009,i*.065)}
function soundSplash(){tone(520,.06,'sine',.02);tone(390,.08,'sine',.02,.07);tone(620,.06,'sine',.018,.14)}
function soundToy(){tone(780,.07,'square',.018);tone(920,.07,'square',.018,.09)}
function soundCare(){tone(500,.08,'sine',.02);tone(620,.12,'sine',.02,.08)}
function soundCrunch(){for(let i=0;i<4;i++)tone(150+i*18,.045,'square',.011,i*.075)}
function soundLick(){tone(260,.045,'sine',.012);tone(310,.04,'sine',.01,.08);tone(270,.04,'sine',.01,.16)}
function soundPop(){tone(240,.035,'square',.02);tone(520,.06,'sine',.015,.04)}
function soundRustle(){for(let i=0;i<5;i++)tone(190+i*22,.035,'sawtooth',.006,i*.055)}
function soundBall(){tone(330,.05,'sine',.018);tone(260,.05,'sine',.014,.11);tone(210,.05,'sine',.012,.22)}
function soundScratch(){for(let i=0;i<7;i++)tone(120+i*8,.035,'sawtooth',.006,i*.045)}
function soundBrush(){for(let i=0;i<4;i++)tone(430+i*30,.045,'sine',.012,i*.08)}
function soundClip(){tone(900,.025,'square',.014);tone(700,.025,'square',.012,.16)}
function soundSoftCare(){tone(440,.06,'sine',.012);tone(554,.08,'sine',.012,.09);tone(660,.1,'sine',.01,.18)}
function soundRest(){tone(220,.12,'sine',.01);tone(185,.18,'sine',.008,.12)}
const catMediaSources={
  meow:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Meow.ogg',
  purr:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Purring_cat.oga'
};
const catMedia={};
function mediaFor(name){
  if(catMedia[name])return catMedia[name];
  const a=new Audio(catMediaSources[name]);a.preload='auto';a.playsInline=true;a.setAttribute('playsinline','');
  a.volume=name==='purr'?.32:.72;catMedia[name]=a;return a;
}
function stopCatMedia(){
  Object.values(catMedia).forEach(a=>{try{a.pause();a.currentTime=0}catch(e){}});
}
function stopPetAudio(){
  stopCatMedia();
  stopSynthAudio();
  setDefaultAudioSession();
}
async function playRealCat(name,maxMs){
  try{
    setPlaybackAudioSession();await unlockAudio();
    const a=mediaFor(name);a.pause();a.currentTime=0;
    await a.play();
    if(maxMs)petDelay(()=>{try{a.pause();a.currentTime=0}catch(e){}},maxMs);
    return true;
  }catch(e){return false}
}
async function catMeow(){setPlaybackAudioSession();if(!(await playRealCat('meow',1300)))soundMeow()}
async function catPurr(){setPlaybackAudioSession();if(!(await playRealCat('purr',2300)))soundPurr()}


function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
function renderNav(){nav.innerHTML=navs.map(([id,l,i])=>`<button class="nav-btn ${cur===id?'active':''}" data-p="${id}"><i>${i}</i>${l}</button>`).join('');nav.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>go(b.dataset.p))}
function go(p){
  const prev=cur;
  if(prev==='pet'&&p!=='pet')stopPetSession();
  cur=p;clearInterval(timer);renderNav();render();
}
function render(){({home,chinese:()=>subject('chinese'),math:()=>subject('math'),english:()=>subject('english'),sport:()=>subject('sport'),shop:renderShop,pet:renderPet,rewards:renderRewards,calendar:renderCalendar}[cur]||home)()}
function home(){
  const d=new Date(),tt=tasks(d),cc=core(d),n=cc.filter(t=>done(t.id)).length,p=cc.length?Math.round(n/cc.length*100):0;
  const nextReward=fixedRewards.find(r=>state.points<r.points);
  page.innerHTML=`<div class="home-simple">
    <section class="card overview-card">
      <div class="overview-progress">
        <strong>${n}/${cc.length}</strong>
        <span>今日完成</span>
        <div class="overview-bar"><i style="width:${p}%"></i></div>
      </div>
      <div class="overview-stats">
        <div><span>积分</span><b>${state.points}</b></div>
        <div><span>小鱼</span><b>${state.fish}</b></div>
        <div><span>本周</span><b>${weekFull()}/7</b></div>
      </div>
      <div class="overview-next">
        <span>${d.getMonth()+1}月${d.getDate()}日</span>
        <button class="plain-link" data-go="rewards">${nextReward?'下一奖励 '+nextReward.points+'分':'已有奖励可兑换'} ›</button>
      </div>
    </section>

    <section class="card home-pet-simple">
      <div class="home-pet-visual">${catSvg('mini')}</div>
      <div class="home-pet-info">
        <div class="home-pet-title"><div><b>奶糕</b><span>我的橘猫伙伴</span></div><button class="plain-link" data-go="pet">去互动 ›</button></div>
        <div class="home-pet-meta"><span>💗 ${state.pet.mood}%</span><span>🐟 ${state.fish}</span></div>
        <p>${esc(state.pet.message)}</p>
      </div>
    </section>

    <section class="card task-board-card">
      <div class="board-head">
        <div><h2>今日任务</h2><span>${n}/${cc.length} 已完成</span></div>
        <button class="plain-link" data-go="calendar">查看日历 ›</button>
      </div>
      <div class="task-board">${tt.map(boardTaskCard).join('')}</div>
    </section>
  </div>`;
  bindGo();
  page.querySelectorAll('[data-board-check]').forEach(b=>b.onclick=()=>complete(b.dataset.boardCheck));
  clearInterval(timer);
}
function boardTaskCard(t){
  const ok=done(t.id),m=meta[t.subject]||['任务','•','#f5ecef'];
  return `<button class="board-task ${ok?'done':''}" data-board-check="${t.id}" ${ok?'disabled':''} aria-label="${esc(t.name)}，${ok?'已完成':'点击完成'}">
    <span class="board-task-icon-stack">
      <span class="board-task-icon" style="--dot:${m[2]}">${t.icon}</span>
      ${taskRewardIcons()}
    </span>
    <span class="board-task-copy"><b>${esc(t.name)}</b><small>${m[0]}</small></span>
    <span class="board-check" aria-hidden="true">${ok?'✓':''}</span>
  </button>`
}
function taskCard(t){
  const ok=done(t.id);
  return `<button class="task-card simple-task-card ${ok?'done':''}" data-check="${t.id}" ${ok?'disabled':''}>
    <span class="simple-task-icon-stack"><span class="task-icon" style="--ib:${meta[t.subject]?.[2]||'#f4f1ee'}">${t.icon}</span>${taskRewardIcons()}</span>
    <span class="task-name">${esc(t.name)}</span>
    <span class="simple-check">${ok?'✓':''}</span>
  </button>`
}
function complete(id){
  const r=rec(key(),new Date());if(r.completed.includes(id))return;
  r.completed.push(id);state.points+=2;state.fish++;state.pet.mood=Math.min(100,state.pet.mood+2);
  state.pet.message='收到一条小鱼！你今天又前进了一点点。';save();pauseUntil=Date.now()+15000;
  soundCheckin();toast('完成啦！+2分 · 🐟 +1');
  const back=cur;
  if(meta[back])subject(back);else home();
}
function weekMini(){let now=new Date();now.setHours(0,0,0,0);return `<div class="week-days">${weekDates().map(d=>{const f=d>now,ok=!f&&full(d),today=key(d)===key(now);return `<div><div class="weekday">${['一','二','三','四','五','六','日'][(d.getDay()+6)%7]}</div><div class="day-dot ${f?'future':ok?'done':'missed'} ${today?'today':''}">${ok?'✓':f?'':'·'}</div></div>`}).join('')}</div><div class="legend">绿色已打卡 · 粉色未打卡 · 灰色未到时间</div>`}
function subject(s){
  const m=meta[s],arr=state.tasks.filter(t=>t.subject===s),today=new Date(),todayList=arr.filter(t=>t.days.includes(today.getDay()));
  const doneCount=todayList.filter(t=>done(t.id)).length;
  page.innerHTML=`<div class="page-panel subject-clean">
    <div class="subject-clean-head">
      <div class="subject-clean-title">
        <span class="subject-clean-icon" style="--subject-bg:${m[2]}">${m[1]}</span>
        <div><h1>${m[0]}</h1><p>今日 ${doneCount}/${todayList.length} 已完成</p></div>
      </div>
      <button class="primary-btn" data-add>＋ 新增任务</button>
    </div>
    <div class="subject-clean-grid">
      ${arr.map(t=>{
        const scheduled=t.days.includes(today.getDay()),ok=scheduled&&done(t.id);
        return `<article class="subject-min-task ${ok?'done':''} ${scheduled?'':'not-today'}">
          <button class="subject-min-hit" ${scheduled&&!ok?`data-subcheck="${t.id}"`:''} ${ok||!scheduled?'disabled':''} aria-label="${esc(t.name)}，${ok?'已完成':scheduled?'点击完成':'今天不安排'}">
            <span class="subject-min-icon-stack">
              <span class="subject-clean-task-icon" style="--subject-bg:${m[2]}">${t.icon}</span>
              ${taskRewardIcons()}
            </span>
            <span class="subject-min-copy">
              <b>${esc(t.name)}</b>
              <small>${daysText(t.days)}</small>
            </span>
            <span class="subject-min-check" aria-hidden="true">${ok?'✓':''}</span>
          </button>
          <div class="subject-min-tools">
            <button class="subject-edit-btn" data-edit="${t.id}" aria-label="编辑${esc(t.name)}">编辑</button>
            ${t.builtin?'':`<button class="subject-delete-btn" data-del="${t.id}" aria-label="删除${esc(t.name)}">删除</button>`}
          </div>
        </article>`
      }).join('')}
      <button class="subject-clean-add" data-add>＋ 新增${m[0]}任务</button>
    </div>
  </div>`;
  page.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>taskModal(s));
  page.querySelectorAll('[data-edit]').forEach(b=>b.onclick=e=>{e.stopPropagation();taskModal(s,b.dataset.edit)});
  page.querySelectorAll('[data-subcheck]').forEach(b=>b.onclick=()=>complete(b.dataset.subcheck));
  page.querySelectorAll('[data-del]').forEach(b=>b.onclick=e=>{
    e.stopPropagation();state.tasks=state.tasks.filter(t=>t.id!==b.dataset.del);syncTodayPlan();save();subject(s)
  });
}
function daysText(a){return a.length===7?'每天':'每周'+a.slice().sort((x,y)=>((x+6)%7)-((y+6)%7)).map(d=>'星期'+wd[d]).join('、')}
function taskModal(s,id){
  const ex=id&&state.tasks.find(t=>t.id===id),t=ex||{name:'',icon:meta[s][1],days:[0,1,2,3,4,5,6],core:1};
  modal(`<h2>${ex?'编辑':'新增'}${meta[s][0]}任务</h2>
    <div class="field"><label>任务名称</label><input id="tn" value="${esc(t.name)}"></div>
    <div class="field"><label>图标</label><input id="ti" value="${esc(t.icon)}"></div>
    <div class="field"><label>出现日期</label><div class="days-check">${[1,2,3,4,5,6,0].map(d=>`<label><input type="checkbox" name="day" value="${d}" ${t.days.includes(d)?'checked':''}>周${wd[d]}</label>`).join('')}</div></div>
    <div class="modal-actions"><button class="secondary-btn" data-close>取消</button><button class="primary-btn" id="saveTask">保存</button></div>`);
  $('#saveTask').onclick=()=>{
    const name=$('#tn').value.trim(),icon=$('#ti').value.trim()||meta[s][1],days=[...document.querySelectorAll('input[name="day"]:checked')].map(x=>+x.value);
    if(!name||!days.length)return toast('请填写任务名并至少选择一天');
    if(ex)Object.assign(ex,{name,icon,days,core:1});else state.tasks.push({id:'custom-'+Date.now(),subject:s,name,icon,days,core:1,builtin:0});
    syncTodayPlan();save();closeModal();subject(s)
  }
}
function renderShop(){const c=state.shopCat||'食物',items=shop.filter(i=>i.cat===c);page.innerHTML=`<div class="page-panel"><div class="section-hero"><div><h1>🛒 小鱼商城</h1><p>学习赚小鱼，兑换奶糕用品。当前 🐟 <b>${state.fish}</b></p></div></div><div class="shop-cats">${['食物','玩具','洗漱','医疗'].map(x=>`<button class="cat-tab ${x===c?'active':''}" data-cat="${x}">${x}</button>`).join('')}</div><div class="shop-grid">${items.map(i=>`<div class="shop-item"><div class="shop-icon">${i.emoji}</div><h3>${i.name}</h3><p>与奶糕互动时使用</p><button data-buy="${i.id}">🐟 ${i.cost} · 兑换</button></div>`).join('')}</div></div>`;page.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{state.shopCat=b.dataset.cat;save();renderShop()});page.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{const i=shop.find(x=>x.id===b.dataset.buy);if(state.fish<i.cost)return toast('小鱼还不够');state.fish-=i.cost;state.inventory[i.id]=(state.inventory[i.id]||0)+1;save();toast(i.name+' 已放进宠物用品');renderShop()})}
function playPetSound(name){
  setPlaybackAudioSession();unlockAudio();
  ({crunch:soundCrunch,lick:soundLick,pop:soundPop,rustle:soundRustle,ball:soundBall,scratch:soundScratch,brush:soundBrush,clip:soundClip,care:soundCare,softcare:soundSoftCare,rest:soundRest,toy:soundToy,splash:soundSplash,purr:soundPurr,meow:soundMeow}[name]||(()=>{}))()
}
function petDelay(fn,ms){
  const token=petSession;
  const id=setTimeout(()=>{
    petTimers.delete(id);
    if(cur==='pet'&&token===petSession)fn();
  },ms);
  petTimers.add(id);
  return id;
}
function clearPetTimers(){
  petTimers.forEach(id=>clearTimeout(id));
  petTimers.clear();
}
function startPetSession(){
  petSession++;
  clearPetTimers();
  stopPetAudio();
  petBusy=false;
}
function stopPetSession(){
  petSession++;
  clearPetTimers();
  petBusy=false;
  stopPetAudio();
}
function setPetVisual(cls,text,fx='',prop=''){
  if(cur!=='pet')return;
  const a=$('#catAvatar'),m=$('#petMessage'),f=$('#petEffects'),p=$('#petProp');
  if(!a)return;
  a.className='cat-avatar '+cls;
  if(m)m.textContent=text;if(f)f.innerHTML=fx;if(p)p.innerHTML=prop;
  state.pet.message=text;save();
}
function finishPetAction(text){
  petDelay(()=>{
    petBusy=false;
    if($('#catAvatar')){setPetVisual('idle',text||state.pet.message);startPetIdle()}
  },1100)
}
function startPetIdle(){
  if(cur!=='pet'||petBusy||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const schedule=()=>petDelay(()=>{
    if(petBusy||!$('#catAvatar'))return;
    const idles=[
      ['idle-look','奶糕看看窗外，又回头看向你。'],
      ['idle-blink','奶糕慢慢眨了眨眼。'],
      ['idle-stretch','奶糕前爪向前，伸了一个懒腰。'],
      ['idle-groom','奶糕低头舔了舔前爪。']
    ];
    const x=idles[Math.floor(Math.random()*idles.length)];
    setPetVisual(x[0],x[1]);
    petDelay(()=>{if(!petBusy&&$('#catAvatar'))setPetVisual('idle','奶糕安静地待在小屋里。')},1100);
    schedule();
  },5200+Math.random()*3800);
  schedule();
}
function stopPetIdle(){clearPetTimers()}
function renderPet(){
  startPetSession();
  const own=shop.filter(i=>(state.inventory[i.id]||0)>0);
  const quick=[
    ['feed','🥣','喂食'],['play','🪶','玩耍'],['bath','🫧','洗澡'],['treat','🩺','护理'],['pet','🤚','摸摸'],['meow','🔊','叫一声']
  ];
  page.innerHTML=`<div class="page-panel pet-page">
    <div class="section-hero">
      <div><h1>🐾 奶糕的小屋</h1><p>完成任务获得小鱼，换用品后可以和奶糕真实感互动。</p></div>
      <div class="pet-top-badges"><b>🐟 ${state.fish}</b><b>💗 ${state.pet.mood}%</b></div>
    </div>
    <div class="pet-large">
      <div class="pet-stage" id="petStage">
        <div class="pet-room-bg"><span class="window">☁️</span><span class="plant">🪴</span><span class="bed">🧺</span></div>
        <div class="pet-message" id="petMessage">${esc(state.pet.message)}</div>
        <div class="pet-effect-layer" id="petEffects"></div>
        <div class="cat-avatar idle" id="catAvatar" role="img" aria-label="橘猫奶糕">${catSvg('large')}</div>
        <div class="pet-prop" id="petProp"></div>
      </div>
      <div class="card pet-control-card">
        <h3>和奶糕互动</h3>
        <div class="pet-quick-actions">${quick.map(x=>`<button class="pet-quick" data-act="${x[0]}"><span>${x[1]}</span><b>${x[2]}</b></button>`).join('')}</div>
        <div class="pet-status"><span>💗 心情</span><b>${state.pet.mood}%</b></div>
        <div class="mood-bar"><i style="width:${state.pet.mood}%"></i></div>
        <div class="sound-tip">🔊 摸摸：真实猫叫 → 呼噜；“叫一声”会直接播放真实猫叫</div>
        <h3>我的宠物用品</h3>
        <div class="pet-inventory">${own.length?own.map(i=>`<div class="inv-card"><div><b>${i.emoji} ${i.name}</b><small>×${state.inventory[i.id]}</small></div><button class="secondary-btn" data-use="${i.id}">使用</button></div>`).join(''):'<div class="empty-note">还没有用品，先去商城用小鱼兑换吧。</div>'}</div>
        <div class="audio-credit">猫叫：Dan Crosby / Wikimedia Commons（CC BY-SA 3.0） · 呼噜：Mysid / Public Domain</div>
      </div>
    </div>
  </div>`;

  const pending=sessionStorage.getItem('miaomiao-pet-action');sessionStorage.removeItem('miaomiao-pet-action');
  page.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>petAction(b.dataset.act));
  page.querySelectorAll('[data-use]').forEach(b=>b.onclick=()=>usePetItem(b.dataset.use));
  if(pending)petDelay(()=>petAction(pending),120);else startPetIdle();
}
function petAction(action){
  if(cur!=='pet'||petBusy)return;
  clearPetTimers();
  if(action==='pet'){
    petBusy=true;setPlaybackAudioSession();unlockAudio();catMeow();setPetVisual('attention','你的手靠近，奶糕先闻了闻。');
    petDelay(()=>{
      setPetVisual('purring','奶糕眯起眼睛，把脑袋轻轻靠过来。','<span class="heart pet-heart-1">♥</span><span class="heart pet-heart-2">♥</span>');
      catPurr();state.pet.mood=Math.min(100,state.pet.mood+2);save();finishPetAction('奶糕心情很好，尾巴轻轻摆着。')
    },620);return;
  }
  if(action==='meow'){
    petBusy=true;setPlaybackAudioSession();unlockAudio();catMeow();
    setPetVisual('meowing','奶糕抬头：喵～','<span class="sound-wave">)))</span>');
    finishPetAction('奶糕叫完一声，又安静下来。');return;
  }
  if(action==='feed'){const item=findOwnedBy('feed');if(!item)return petNeed('食物');usePetItem(item.id);return}
  if(action==='play'){const item=findOwnedBy('play');if(!item)return petNeed('玩具');usePetItem(item.id);return}
  if(action==='bath'){const item=findOwnedBy('bath');if(!item)return petNeed('洗澡用品');usePetItem(item.id);return}
  if(action==='treat'){const item=findOwnedBy('treat');if(!item)return petNeed('护理用品');usePetItem(item.id)}
}
function findOwnedBy(action){return shop.find(i=>i.action===action&&(state.inventory[i.id]||0)>0)}
function petNeed(name){
  if(cur!=='pet')return;
  state.pet.message='还缺'+name+'，去商城准备一下吧～';save();setPlaybackAudioSession();catMeow();toast('需要先兑换'+name);
  const m=$('#petMessage');if(m)m.textContent=state.pet.message;
}
function usePetItem(id){
  if(cur!=='pet'||petBusy)return;
  const i=shop.find(x=>x.id===id),r=petReactions[id];
  if(!i||!state.inventory[i.id]||!r)return;
  petBusy=true;clearPetTimers();setPlaybackAudioSession();unlockAudio();
  state.inventory[i.id]--;
  setPetVisual('attention',r.notice,'',r.prop);
  soundRustle();
  petDelay(()=>{
    state.pet.mood=Math.min(100,state.pet.mood+(r.mood||3));
    setPetVisual(r.cls,r.text,r.fx,r.prop);
    playPetSound(r.sound);save();toast(i.name+' 已使用');
    petDelay(()=>{
      let end='奶糕用完'+i.name+'，舒服地坐了下来。';
      if(i.action==='feed')end='奶糕吃完后舔舔嘴巴，满足地坐在旁边。';
      if(i.action==='play')end='奶糕玩累了一点，趴下来休息。';
      if(id==='care-bath')end='奶糕甩了甩毛，终于洗干净啦。';
      if(id==='med-rest')end='奶糕已经睡着了，呼吸慢慢变得平稳。';
      setPetVisual(id==='med-rest'?'sleeping':'happy',end,'',id==='med-rest'?r.prop:'');
      finishPetAction(end);renderPetInventoryOnly();
    },1900);
  },550);
}
function renderPetInventoryOnly(){
  const box=document.querySelector('.pet-inventory');if(!box)return;
  const own=shop.filter(i=>(state.inventory[i.id]||0)>0);
  box.innerHTML=own.length?own.map(i=>`<div class="inv-card"><div><b>${i.emoji} ${i.name}</b><small>×${state.inventory[i.id]}</small></div><button class="secondary-btn" data-use="${i.id}">使用</button></div>`).join(''):'<div class="empty-note">用品已经用完，去商城补充吧。</div>';
  box.querySelectorAll('[data-use]').forEach(b=>b.onclick=()=>usePetItem(b.dataset.use));
}
function renderRewards(){
  const all=[...fixedRewards,...state.customRewards];
  page.innerHTML=`<div class="page-panel">
    <div class="section-hero">
      <div><h1>🎁 奖励中心</h1><p>当前 ${state.points} 分 · 积分达到即可兑换</p></div>
      <button class="primary-btn" id="addReward">＋ 自定义奖励</button>
    </div>
    <div class="rewards-grid">${all.map(r=>{
      const enough=state.points>=r.points;
      return `<div class="reward-card ${enough?'':'locked'}">
        <div class="reward-emoji">${r.emoji||'⭐'}</div>
        <h3>${esc(r.title)}</h3>
        <p>${r.points} 积分</p>
        <button class="primary-btn" data-red="${r.id}" ${enough?'':'disabled'}>${enough?'兑换':'积分不足'}</button>
      </div>`
    }).join('')}</div>
  </div>`;
  $('#addReward').onclick=()=>modal('<h2>新增自定义奖励</h2><div class="field"><label>奖励名称</label><input id="rn"></div><div class="field"><label>所需积分</label><input id="rp" type="number" value="100"></div><div class="field"><label>图标</label><input id="re" value="⭐"></div><div class="modal-actions"><button class="secondary-btn" data-close>取消</button><button class="primary-btn" id="rs">保存</button></div>');
  setTimeout(()=>{if($('#rs'))$('#rs').onclick=()=>{
    let title=$('#rn').value.trim(),points=+$('#rp').value,emoji=$('#re').value||'⭐';
    if(!title||points<2)return toast('请填写有效内容');
    state.customRewards.push({id:'r-'+Date.now(),title,points,emoji});save();closeModal();renderRewards()
  }},0);
  page.querySelectorAll('[data-red]').forEach(b=>b.onclick=()=>{
    const r=all.find(x=>x.id===b.dataset.red);
    if(!r||state.points<r.points)return;
    state.points-=r.points;state.rewardLog.push({title:r.title,date:key(),points:r.points});save();toast('已兑换：'+r.title);renderRewards()
  })
}
function renderCalendar(){const n=new Date(),y=n.getFullYear(),m=n.getMonth(),first=new Date(y,m,1),last=new Date(y,m+1,0),cells=[];for(let i=0;i<(first.getDay()+6)%7;i++)cells.push('');for(let d=1;d<=last.getDate();d++)cells.push(d);while(cells.length%7)cells.push('');let mf=0;for(let d=1;d<=n.getDate();d++)if(full(new Date(y,m,d)))mf++;page.innerHTML=`<div class="page-panel"><div class="section-hero"><div><h1>🗓️ 学习日历</h1><p>绿色已打卡，粉色未打卡，灰色未到时间。</p></div><b>${y}.${String(m+1).padStart(2,'0')}</b></div><div class="calendar-wrap"><div class="calendar-card"><div class="calendar-head"><h2>${y}年${m+1}月</h2></div><div class="calendar-grid">${['一','二','三','四','五','六','日'].map(x=>`<div class="cal-week">${x}</div>`).join('')}${cells.map(d=>{if(!d)return'<div></div>';let dt=new Date(y,m,d),today=new Date();today.setHours(0,0,0,0);dt.setHours(0,0,0,0);let c=dt>today?'future':full(dt)?'done':'missed';return `<div class="cal-day ${c} ${d===n.getDate()?'today':''}">${d}</div>`}).join('')}</div></div><div class="stats-card"><h2>本月统计</h2><div class="stat-big">${mf}天</div><p>已完成全部任务</p><button class="secondary-btn" id="export">导出备份</button><button class="secondary-btn" id="import">导入备份</button></div></div></div>`;$('#export').onclick=()=>{let a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));a.download='喵喵打卡备份-'+key()+'.json';a.click()};$('#import').onclick=()=>$('#importInput').click()}
$('#importInput').onchange=async e=>{try{const d=JSON.parse(await e.target.files[0].text());state={...init(),...d};save();toast('备份已恢复');render()}catch{toast('备份文件无法读取')}e.target.value=''};
function bindGo(){page.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go))}
function modal(h){$('#modalRoot').innerHTML='<div class="modal-backdrop"><div class="modal">'+h+'</div></div>';document.querySelectorAll('[data-close]').forEach(b=>b.onclick=closeModal)}
function closeModal(){$('#modalRoot').innerHTML=''}
function isPhoneLike(){return matchMedia('(pointer:coarse)').matches&&Math.min(screen.width,screen.height)<600}
let landscapeFlip=localStorage.getItem('miaomiao-landscape-side')==='-90',hintTimer=0;
async function tryLandscapeLock(){try{if(screen.orientation&&typeof screen.orientation.lock==='function')await screen.orientation.lock('landscape')}catch(e){}}
function syncLandscape(){
  const forced=isPhoneLike()&&innerHeight>innerWidth;
  document.body.classList.toggle('force-landscape',forced);
  document.body.classList.toggle('flip-landscape',forced&&landscapeFlip);
  if(forced&&!sessionStorage.getItem('miaomiao-landscape-hint')){
    document.body.classList.add('landscape-hint-on');
    clearTimeout(hintTimer);
    hintTimer=setTimeout(()=>document.body.classList.remove('landscape-hint-on'),4200);
    sessionStorage.setItem('miaomiao-landscape-hint','1');
  }
}
$('#rotateSide').onclick=()=>{landscapeFlip=!landscapeFlip;localStorage.setItem('miaomiao-landscape-side',landscapeFlip?'-90':'90');syncLandscape()};
addEventListener('resize',syncLandscape,{passive:true});
addEventListener('orientationchange',()=>setTimeout(syncLandscape,120),{passive:true});
addEventListener('pageshow',()=>{syncLandscape();tryLandscapeLock()});
document.addEventListener('pointerdown',tryLandscapeLock,{once:true,passive:true});
document.addEventListener('pointerdown',unlockAudio,{passive:true});
syncLandscape();
setDefaultAudioSession();
document.addEventListener('visibilitychange',()=>{
  if(document.hidden&&cur==='pet')stopPetSession();
  else if(!document.hidden&&cur==='pet')startPetIdle();
});
renderNav();home();
if('serviceWorker'in navigator)addEventListener('load',async()=>{
  try{
    const reg=await navigator.serviceWorker.register('./sw.js');
    reg.update().catch(()=>{});
    navigator.serviceWorker.addEventListener('controllerchange',()=>{
      if(!sessionStorage.getItem('miaomiao-sw-reloaded')){
        sessionStorage.setItem('miaomiao-sw-reloaded','1');
        location.reload();
      }
    });
  }catch(e){}
});
})();