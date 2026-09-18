(()=>{'use strict';
const K='miaomiao-study-desk-v2',$=s=>document.querySelector(s),nav=$('#nav'),page=$('#page');
const navs=[['home','首页','⌂'],['chinese','语文','📖'],['math','数学','123'],['english','英语','ABC'],['sport','运动','🪢'],['shop','商城','🛒'],['pet','宠物','🐱'],['rewards','奖励','🎁'],['calendar','日历','🗓️']];
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
const fixedRewards=[{id:'tv',title:'看电视半小时',emoji:'📺',points:36,days:3},{id:'snack',title:'小零食',emoji:'🍪',points:60,days:5},{id:'toy',title:'小玩具',emoji:'🎁',points:84,days:7}];
const shop=[
['food-kibble','食物','猫粮','🥣',8,'feed'],['food-treat','食物','猫条','🐟',5,'feed'],['food-can','食物','主食罐头','🥫',10,'feed'],['food-freeze','食物','冻干','🍗',7,'feed'],
['toy-wand','玩具','逗猫棒','🪶',8,'play'],['toy-ball','玩具','小球','⚽',6,'play'],['toy-scratch','玩具','猫抓板','🧶',12,'play'],['toy-box','玩具','纸箱','📦',4,'play'],
['care-brush','洗漱','梳毛刷','🪮',6,'groom'],['care-bath','洗漱','洗护套装','🫧',12,'bath'],['care-towel','洗漱','小毛巾','🧺',5,'groom'],['care-nail','洗漱','指甲护理','✨',8,'groom'],
['med-kit','医疗','护理包','🧰',10,'treat'],['med-cone','医疗','护理头套','🔶',9,'treat'],['med-check','医疗','体检券','🩺',14,'treat'],['med-rest','医疗','休息垫','🛏️',7,'rest']
].map(x=>({id:x[0],cat:x[1],name:x[2],emoji:x[3],cost:x[4],action:x[5]}));
const petReactions={
'food-kibble':{cls:'eating-kibble',notice:'听到猫粮声，奶糕马上竖起耳朵。',text:'奶糕走到饭碗前，咔嚓咔嚓认真吃猫粮。',prop:'<span class="prop-kibble">🥣</span>',fx:'<span class="crumb c1">•</span><span class="crumb c2">•</span>',sound:'crunch',mood:4},
'food-treat':{cls:'eating-treat',notice:'奶糕闻到猫条，立刻凑过来闻一闻。',text:'奶糕一小口一小口舔猫条，吃完还舔了舔嘴巴。',prop:'<span class="prop-treat">🐟</span>',fx:'<span class="lick-mark">〰</span>',sound:'lick',mood:5},
'food-can':{cls:'eating-can',notice:'罐头刚打开，奶糕就一路小跑过来了。',text:'奶糕埋头吃主食罐头，吃得特别专心。',prop:'<span class="prop-can">🥫</span><span class="prop-bowl">🥣</span>',fx:'<span class="smell s1">〜</span><span class="smell s2">〜</span>',sound:'pop',mood:5},
'food-freeze':{cls:'eating-freeze',notice:'冻干发出沙沙声，奶糕抬头盯住了袋子。',text:'奶糕叼走一块冻干，嚼得嘎嘣脆。',prop:'<span class="prop-freeze">🍗</span>',fx:'<span class="crumb c1">•</span><span class="crumb c2">•</span>',sound:'crunch',mood:5},
'toy-wand':{cls:'play-wand',notice:'逗猫棒一晃，奶糕的眼睛立刻跟着移动。',text:'奶糕压低身体、瞄准，然后猛地扑向逗猫棒！',prop:'<span class="prop-wand">🪶</span>',fx:'<span class="toy-motion">✦</span>',sound:'toy',mood:6},
'toy-ball':{cls:'play-ball',notice:'小球滚过地板，奶糕歪头盯了两秒。',text:'奶糕用爪子一拍，小球滚远了，它马上追过去。',prop:'<span class="prop-ball">⚽</span>',fx:'<span class="speed-line">➜</span>',sound:'ball',mood:6},
'toy-scratch':{cls:'play-scratch',notice:'奶糕走到猫抓板旁边闻了闻。',text:'奶糕前爪伸直，在猫抓板上认真抓了好几下。',prop:'<span class="prop-scratch">🧶</span>',fx:'<span class="scratch-line">///</span>',sound:'scratch',mood:5},
'toy-box':{cls:'play-box',notice:'纸箱刚放下，奶糕绕着它转了一圈。',text:'奶糕钻进纸箱，只露出脑袋偷偷观察外面。',prop:'<span class="prop-box">📦</span>',fx:'<span class="peek-mark">…</span>',sound:'rustle',mood:6},
'care-brush':{cls:'care-brush',notice:'梳子靠近时，奶糕先回头闻了闻。',text:'从头到背轻轻梳毛，奶糕眯着眼睛坐得很稳。',prop:'<span class="prop-brush">🪮</span>',fx:'<span class="spark s1">✦</span><span class="spark s2">✦</span>',sound:'brush',mood:5},
'care-bath':{cls:'care-bath',notice:'听见水声，奶糕往后缩了一小步。',text:'温水花洒轻轻冲洗，泡泡洗掉脏东西，最后甩了甩毛。',prop:'<span class="prop-shower">🚿</span>',fx:'<span class="bubble b1">○</span><span class="bubble b2">○</span><span class="bubble b3">○</span>',sound:'splash',mood:2},
'care-towel':{cls:'care-towel',notice:'大毛巾铺开，奶糕站在原地看了看。',text:'毛巾轻轻包住奶糕，把湿湿的毛擦干。',prop:'<span class="prop-towel">🧺</span>',fx:'<span class="warm-line">☀</span>',sound:'rustle',mood:4},
'care-nail':{cls:'care-nail',notice:'奶糕把爪子缩了一下，但还是乖乖坐好。',text:'只做模拟指甲护理：轻轻托住爪子，一只一只检查。',prop:'<span class="prop-nail">✨</span>',fx:'<span class="paw-mark">🐾</span>',sound:'clip',mood:2},
'med-kit':{cls:'med-kit',notice:'护理包打开，奶糕安静地看着里面的东西。',text:'完成一次温和的模拟护理，奶糕随后趴下休息。',prop:'<span class="prop-kit">🧰</span>',fx:'<span class="care-plus">＋</span>',sound:'care',mood:3},
'med-cone':{cls:'med-cone',notice:'护理头套拿出来，奶糕先疑惑地歪了歪头。',text:'奶糕戴上模拟护理头套，走了两步又停下来适应。',prop:'<span class="prop-cone">🔶</span>',fx:'<span class="question-mark">?</span>',sound:'rustle',mood:1},
'med-check':{cls:'med-check',notice:'听诊器靠近，奶糕安静地坐着。',text:'模拟体检完成：听一听、看一看，然后奖励奶糕休息。',prop:'<span class="prop-check">🩺</span>',fx:'<span class="care-plus">＋</span>',sound:'softcare',mood:3},
'med-rest':{cls:'med-rest',notice:'柔软的小垫子铺好后，奶糕先踩了踩。',text:'奶糕在垫子上转一圈，蜷成一团慢慢睡着了。',prop:'<span class="prop-rest">🛏️</span>',fx:'<span class="zzz">Z z z</span>',sound:'rest',mood:5}
};
const init=()=>({points:0,fish:0,tasks:structuredClone(defaults),records:{},inventory:{},pet:{mood:82,message:'等你完成任务，我们一起玩吧！'},customRewards:[],rewardLog:[],shopCat:'食物'});
let state=(()=>{try{return {...init(),...JSON.parse(localStorage.getItem(K)||'{}')}}catch{return init()}})(),cur='home',tp=0,timer=null,pauseUntil=0,petIdleTimer=null,petActionTimer=null,petBusy=false;
const save=()=>localStorage.setItem(K,JSON.stringify(state));
const key=(d=new Date())=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const tasks=d=>state.tasks.filter(t=>t.days.includes(d.getDay())),core=d=>tasks(d).filter(t=>t.core),done=(id,k=key())=>(state.records[k]?.completed||[]).includes(id);
const rec=k=>state.records[k]||(state.records[k]={completed:[]});
const full=d=>{const c=core(d);return c.length&&c.every(t=>(state.records[key(d)]?.completed||[]).includes(t.id))};
const weekStart=(d=new Date())=>{let x=new Date(d),n=(x.getDay()+6)%7;x.setDate(x.getDate()-n);x.setHours(0,0,0,0);return x};
const weekDates=()=>{const s=weekStart();return Array.from({length:7},(_,i)=>{let d=new Date(s);d.setDate(s.getDate()+i);return d})};
const weekFull=()=>{let n=new Date();n.setHours(23,59,59,999);return weekDates().filter(d=>d<=n&&full(d)).length};
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

let audioCtx=null;
function ctx(){try{return audioCtx||(audioCtx=new (window.AudioContext||window.webkitAudioContext)())}catch{return null}}
function tone(freq=440,dur=.12,type='sine',gain=.035,delay=0){
  const c=ctx();if(!c)return;
  const o=c.createOscillator(),g=c.createGain(),t=c.currentTime+delay;
  o.type=type;o.frequency.setValueAtTime(freq,t);
  g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(gain,t+.015);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+dur+.03);
}
function soundCheckin(){tone(660,.1,'sine',.03);tone(880,.12,'sine',.028,.08)}
function soundMeow(){tone(420,.16,'triangle',.035);tone(300,.22,'triangle',.025,.11)}
function soundPurr(){for(let i=0;i<5;i++)tone(95+i*3,.11,'sawtooth',.012,i*.07)}
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

function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
function renderNav(){nav.innerHTML=navs.map(([id,l,i])=>`<button class="nav-btn ${cur===id?'active':''}" data-p="${id}"><i>${i}</i>${l}</button>`).join('');nav.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>go(b.dataset.p))}
function go(p){cur=p;clearInterval(timer);if(p!=='pet')stopPetIdle();renderNav();render()}
function render(){({home,chinese:()=>subject('chinese'),math:()=>subject('math'),english:()=>subject('english'),sport:()=>subject('sport'),shop:renderShop,pet:renderPet,rewards:renderRewards,calendar:renderCalendar}[cur]||home)()}
function home(){
const d=new Date(),tt=tasks(d),cc=core(d),n=cc.filter(t=>done(t.id)).length,p=cc.length?Math.round(n/cc.length*100):0,pages=Math.max(1,Math.ceil(tt.length/3));tp=Math.min(tp,pages-1);const slice=tt.slice(tp*3,tp*3+3);
page.innerHTML=`<div class="home-grid">
<article class="card soft-pink"><div class="card-head"><div class="card-title">🗓️ 今日进度</div><span style="font-size:10px;color:var(--muted)">${d.getMonth()+1}月${d.getDate()}日 星期${wd[d.getDay()]}</span></div><div class="progress-body"><div class="progress-ring" style="--p:${p}%"><div class="progress-center"><strong>${n}/${cc.length}</strong><span>今日完成</span></div></div><div class="stat-list"><div class="stat"><span>⭐ 我的积分</span><strong>${state.points}</strong></div><div class="stat"><span>🐟 我的小鱼</span><strong>${state.fish}</strong></div><div class="stat"><span>📅 本周完成</span><strong>${weekFull()}/7</strong></div></div></div></article>
<article class="card soft-amber"><div class="card-head"><div class="card-title">🐾 我的宠物 · 奶糕</div><button class="mini-action" data-go="pet">›</button></div><div class="pet-body"><div class="pet-scene"><div class="pet-bubble">${esc(state.pet.message)}</div><div class="cat">🐈</div></div><div class="pet-side"><div class="pet-status"><span>💗 心情</span><b>${state.pet.mood}%</b></div><div class="mood-bar"><i style="width:${state.pet.mood}%"></i></div><div class="pet-status"><span>🐟 小鱼</span><b>${state.fish}</b></div><div class="pet-actions">${[['feed','🥣','喂食'],['play','🧶','玩耍'],['bath','🫧','洗澡'],['treat','🧰','护理']].map(x=>`<button class="pet-action" data-q="${x[0]}"><b>${x[1]}</b>${x[2]}</button>`).join('')}</div></div></div></article>
<article class="card soft-pink"><div class="card-head"><div class="card-title">🏆 我的奖励</div><button class="text-action" data-go="rewards">去兑换 ›</button></div><div class="reward-body"><div class="points-row"><strong>${state.points}</strong> 积分</div><div class="reward-track">${fixedRewards.map((r,i)=>`<div class="reward-node" style="left:${[18,50,82][i]}%"><i>${r.emoji}</i><b>${r.points}分</b><small>${r.title}</small></div>`).join('')}</div><div class="lock-note">🔒 本周满额 3 / 5 / 7 天解锁对应奖励</div></div></article>
<article class="card tasks-card"><div class="tasks-toolbar"><h2>✅ 今日任务 <small>完成一项 +2分 +1🐟</small></h2><div class="pager"><button data-prev>‹</button><span class="page-pill">${tp+1}/${pages}</span><button data-next>›</button></div></div><div class="task-slider" id="slider"><div class="task-row">${slice.map(taskCard).join('')}</div></div></article>
<article class="card soft-blue week-card"><div class="card-head"><div class="card-title">🗓️ 本周打卡</div><button class="mini-action" data-go="calendar">›</button></div><div class="week-body">${weekMini()}</div></article></div>`;
bindGo();page.querySelectorAll('[data-check]').forEach(b=>b.onclick=()=>complete(b.dataset.check));page.querySelector('[data-prev]').onclick=()=>{pauseUntil=Date.now()+15000;tp=(tp-1+pages)%pages;home()};page.querySelector('[data-next]').onclick=()=>{pauseUntil=Date.now()+15000;tp=(tp+1)%pages;home()};page.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{sessionStorage.setItem('miaomiao-pet-action',b.dataset.q);go('pet')});
const s=$('#slider');if(s&&pages>1){let x=0;s.ontouchstart=e=>{x=e.touches[0].clientX;pauseUntil=Date.now()+15000};s.ontouchend=e=>{let dx=e.changedTouches[0].clientX-x;if(Math.abs(dx)>40){tp=(tp+(dx<0?1:-1)+pages)%pages;home()}}}
clearInterval(timer);if(pages>1)timer=setInterval(()=>{if(Date.now()>pauseUntil&&cur==='home'){tp=(tp+1)%pages;home()}},10000)
}
function taskCard(t){const d=done(t.id);return `<div class="task-card ${d?'done':''}"><div class="task-icon" style="--ib:${meta[t.subject]?.[2]||'#f4f1ee'}">${t.icon}</div><div><div class="task-name">${esc(t.name)}</div><div class="task-status">${d?'今天已完成 ✓':'今日未完成'}</div></div><button class="check-btn ${d?'done':''}" data-check="${t.id}" ${d?'disabled':''}>${d?'已完成 ✓':'完成打卡 +2分'}</button></div>`}
function complete(id){
  const r=rec(key());if(r.completed.includes(id))return;
  r.completed.push(id);state.points+=2;state.fish++;state.pet.mood=Math.min(100,state.pet.mood+2);
  state.pet.message='收到一条小鱼！你今天又前进了一点点。';save();pauseUntil=Date.now()+15000;
  soundCheckin();toast('完成啦！+2分 · 🐟 +1');
  const back=cur;
  if(meta[back])subject(back);else home();
}
function weekMini(){let now=new Date();now.setHours(0,0,0,0);return `<div class="week-days">${weekDates().map(d=>{const f=d>now,ok=!f&&full(d),today=key(d)===key(now);return `<div><div class="weekday">${['一','二','三','四','五','六','日'][(d.getDay()+6)%7]}</div><div class="day-dot ${f?'future':ok?'done':'missed'} ${today?'today':''}">${ok?'✓':f?'':'·'}</div></div>`}).join('')}</div><div class="legend">绿色已打卡 · 粉色未打卡 · 灰色未到时间</div>`}
function subject(s){
  const m=meta[s],arr=state.tasks.filter(t=>t.subject===s),today=new Date(),todayList=arr.filter(t=>t.days.includes(today.getDay()));
  page.innerHTML=`<div class="page-panel subject-panel">
    <div class="section-hero subject-hero">
      <div><h1>${m[1]} ${m[0]}</h1><p>今日 ${todayList.length} 项 · 点击任务即可打卡；这里只记录完成，不放学习内容。</p></div>
      <button class="primary-btn" data-add>＋ 新增任务</button>
    </div>
    <div class="subject-summary">
      <div><b>今日任务</b><span>${todayList.filter(t=>done(t.id)).length}/${todayList.length} 已完成</span></div>
      <div class="subject-mini-tasks">${todayList.length?todayList.map(t=>{
        const ok=done(t.id);
        return `<button class="subject-mini ${ok?'done':''}" data-subcheck="${t.id}" ${ok?'disabled':''}><span>${t.icon}</span><b>${esc(t.name)}</b><small>${ok?'已完成 ✓':'点我打卡 +2'}</small></button>`
      }).join(''):'<div class="empty-note">今天没有安排这个科目的任务</div>'}</div>
    </div>
    <div class="grid-cards subject-all">
      ${arr.map(t=>{
        const scheduled=t.days.includes(today.getDay()),ok=scheduled&&done(t.id);
        return `<div class="feature-card subject-task-card ${ok?'is-done':''}">
          <div class="feature-top"><div class="feature-icon" style="background:${m[2]}">${t.icon}</div><span class="chip">${t.core?'计入满额':'加分任务'}</span></div>
          <h3>${esc(t.name)}</h3><p>${daysText(t.days)}</p>
          <div class="task-state-line">${scheduled?(ok?'✅ 今天已完成':'○ 今天待完成'):'— 今天不安排'}</div>
          <div class="card-actions">
            ${scheduled?`<button class="primary-btn compact" data-subcheck="${t.id}" ${ok?'disabled':''}>${ok?'已完成':'完成打卡 +2'}</button>`:''}
            <button class="secondary-btn" data-edit="${t.id}">编辑</button>
            ${t.builtin?'':`<button class="danger-btn" data-del="${t.id}">删除</button>`}
          </div>
        </div>`
      }).join('')}
      <button class="feature-card add-card" data-add>＋ 新增${m[0]}任务</button>
    </div>
  </div>`;
  page.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>taskModal(s));
  page.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>taskModal(s,b.dataset.edit));
  page.querySelectorAll('[data-subcheck]').forEach(b=>b.onclick=()=>complete(b.dataset.subcheck));
  page.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{state.tasks=state.tasks.filter(t=>t.id!==b.dataset.del);save();subject(s)});
}function daysText(a){return a.length===7?'每天':'每周'+a.slice().sort((x,y)=>((x+6)%7)-((y+6)%7)).map(d=>'星期'+wd[d]).join('、')}
function taskModal(s,id){const ex=id&&state.tasks.find(t=>t.id===id),t=ex||{name:'',icon:meta[s][1],days:[0,1,2,3,4,5,6],core:1};modal(`<h2>${ex?'编辑':'新增'}${meta[s][0]}任务</h2><div class="field"><label>任务名称</label><input id="tn" value="${esc(t.name)}"></div><div class="field"><label>图标</label><input id="ti" value="${esc(t.icon)}"></div><div class="field"><label>出现日期</label><div class="days-check">${[1,2,3,4,5,6,0].map(d=>`<label><input type="checkbox" name="day" value="${d}" ${t.days.includes(d)?'checked':''}>周${wd[d]}</label>`).join('')}</div></div><div class="field"><label><input type="checkbox" id="tc" ${t.core?'checked':''}> 计入当天满额</label></div><div class="modal-actions"><button class="secondary-btn" data-close>取消</button><button class="primary-btn" id="saveTask">保存</button></div>`);$('#saveTask').onclick=()=>{const name=$('#tn').value.trim(),icon=$('#ti').value.trim()||meta[s][1],days=[...document.querySelectorAll('input[name="day"]:checked')].map(x=>+x.value);if(!name||!days.length)return toast('请填写任务名并至少选择一天');if(ex)Object.assign(ex,{name,icon,days,core:$('#tc').checked});else state.tasks.push({id:'custom-'+Date.now(),subject:s,name,icon,days,core:$('#tc').checked,builtin:0});save();closeModal();subject(s)}}
function renderShop(){const c=state.shopCat||'食物',items=shop.filter(i=>i.cat===c);page.innerHTML=`<div class="page-panel"><div class="section-hero"><div><h1>🛒 小鱼商城</h1><p>学习赚小鱼，兑换奶糕用品。当前 🐟 <b>${state.fish}</b></p></div></div><div class="shop-cats">${['食物','玩具','洗漱','医疗'].map(x=>`<button class="cat-tab ${x===c?'active':''}" data-cat="${x}">${x}</button>`).join('')}</div><div class="shop-grid">${items.map(i=>`<div class="shop-item"><div class="shop-icon">${i.emoji}</div><h3>${i.name}</h3><p>与奶糕互动时使用</p><button data-buy="${i.id}">🐟 ${i.cost} · 兑换</button></div>`).join('')}</div></div>`;page.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{state.shopCat=b.dataset.cat;save();renderShop()});page.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{const i=shop.find(x=>x.id===b.dataset.buy);if(state.fish<i.cost)return toast('小鱼还不够');state.fish-=i.cost;state.inventory[i.id]=(state.inventory[i.id]||0)+1;save();toast(i.name+' 已放进宠物用品');renderShop()})}
function playPetSound(name){
  ({crunch:soundCrunch,lick:soundLick,pop:soundPop,rustle:soundRustle,ball:soundBall,scratch:soundScratch,brush:soundBrush,clip:soundClip,care:soundCare,softcare:soundSoftCare,rest:soundRest,toy:soundToy,splash:soundSplash,purr:soundPurr,meow:soundMeow}[name]||(()=>{}))()
}
function setPetVisual(cls,text,fx='',prop=''){
  const a=$('#catAvatar'),m=$('#petMessage'),f=$('#petEffects'),p=$('#petProp');
  if(!a)return;
  a.className='cat-avatar '+cls;
  if(m)m.textContent=text;if(f)f.innerHTML=fx;if(p)p.innerHTML=prop;
  state.pet.message=text;save();
}
function finishPetAction(text){
  clearTimeout(petActionTimer);
  petActionTimer=setTimeout(()=>{
    petBusy=false;
    if(cur==='pet'&&$('#catAvatar')){setPetVisual('idle',text||state.pet.message);startPetIdle()}
  },1300)
}
function startPetIdle(){
  stopPetIdle();
  if(cur!=='pet'||petBusy||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const schedule=()=>{petIdleTimer=setTimeout(()=>{
    if(cur!=='pet'||petBusy||!$('#catAvatar'))return;
    const idles=[
      ['idle-look','奶糕看看窗外，又回头看向你。'],
      ['idle-blink','奶糕慢慢眨了眨眼。'],
      ['idle-stretch','奶糕前爪向前，伸了一个懒腰。'],
      ['idle-groom','奶糕低头舔了舔前爪。']
    ];
    const x=idles[Math.floor(Math.random()*idles.length)];
    setPetVisual(x[0],x[1]);
    setTimeout(()=>{if(cur==='pet'&&!petBusy&&$('#catAvatar'))setPetVisual('idle','奶糕安静地待在小屋里。')},1200);
    schedule();
  },5200+Math.random()*3800)};
  schedule();
}
function stopPetIdle(){clearTimeout(petIdleTimer);clearTimeout(petActionTimer);petIdleTimer=null}
function renderPet(){
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
        <div class="cat-avatar idle" id="catAvatar" role="img" aria-label="橘猫奶糕">
          <div class="cat-head"><i class="ear l"></i><i class="ear r"></i><i class="face">😺</i></div>
          <div class="cat-body-shape"></div><div class="cat-tail"></div>
        </div>
        <div class="pet-prop" id="petProp"></div>
      </div>
      <div class="card pet-control-card">
        <h3>和奶糕互动</h3>
        <div class="pet-quick-actions">${quick.map(x=>`<button class="pet-quick" data-act="${x[0]}"><span>${x[1]}</span><b>${x[2]}</b></button>`).join('')}</div>
        <div class="pet-status"><span>💗 心情</span><b>${state.pet.mood}%</b></div>
        <div class="mood-bar"><i style="width:${state.pet.mood}%"></i></div>
        <h3>我的宠物用品</h3>
        <div class="pet-inventory">${own.length?own.map(i=>`<div class="inv-card"><div><b>${i.emoji} ${i.name}</b><small>×${state.inventory[i.id]}</small></div><button class="secondary-btn" data-use="${i.id}">使用</button></div>`).join(''):'<div class="empty-note">还没有用品，先去商城用小鱼兑换吧。</div>'}</div>
      </div>
    </div>
  </div>`;

  const pending=sessionStorage.getItem('miaomiao-pet-action');sessionStorage.removeItem('miaomiao-pet-action');
  page.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>petAction(b.dataset.act));
  page.querySelectorAll('[data-use]').forEach(b=>b.onclick=()=>usePetItem(b.dataset.use));
  if(pending)setTimeout(()=>petAction(pending),120);else startPetIdle();
}
function petAction(action){
  if(petBusy)return;
  stopPetIdle();
  if(action==='pet'){
    petBusy=true;setPetVisual('attention','你的手靠近，奶糕先闻了闻。');
    setTimeout(()=>{setPetVisual('purring','奶糕眯起眼睛，把脑袋轻轻靠过来。','<span class="heart h1">♥</span><span class="heart h2">♥</span>');soundPurr();state.pet.mood=Math.min(100,state.pet.mood+2);save();finishPetAction('奶糕心情很好，尾巴轻轻摆着。')},500);return;
  }
  if(action==='meow'){
    petBusy=true;setPetVisual('attention','奶糕听见你叫它，耳朵转向你。');
    setTimeout(()=>{setPetVisual('meowing','奶糕抬头：喵～','<span class="sound-wave">)))</span>');soundMeow();finishPetAction('奶糕叫完一声，又安静下来。')},420);return;
  }
  if(action==='feed'){const item=findOwnedBy('feed');if(!item)return petNeed('食物','feed');usePetItem(item.id);return}
  if(action==='play'){const item=findOwnedBy('play');if(!item)return petNeed('玩具','play');usePetItem(item.id);return}
  if(action==='bath'){const item=findOwnedBy('bath');if(!item)return petNeed('洗澡用品','bath');usePetItem(item.id);return}
  if(action==='treat'){const item=findOwnedBy('treat');if(!item)return petNeed('护理用品','treat');usePetItem(item.id)}
}
function findOwnedBy(action){return shop.find(i=>i.action===action&&(state.inventory[i.id]||0)>0)}
function petNeed(name,action){
  state.pet.message='还缺'+name+'，去商城准备一下吧～';save();soundMeow();toast('需要先兑换'+name);
  const m=$('#petMessage');if(m)m.textContent=state.pet.message;
}
function usePetItem(id){
  if(petBusy)return;
  const i=shop.find(x=>x.id===id),r=petReactions[id];
  if(!i||!state.inventory[i.id]||!r)return;
  petBusy=true;stopPetIdle();
  state.inventory[i.id]--;
  setPetVisual('attention',r.notice,'',r.prop);
  soundRustle();
  setTimeout(()=>{
    state.pet.mood=Math.min(100,state.pet.mood+(r.mood||3));
    setPetVisual(r.cls,r.text,r.fx,r.prop);
    playPetSound(r.sound);
    save();toast(i.name+' 已使用');
    setTimeout(()=>{
      let end='奶糕用完'+i.name+'，舒服地坐了下来。';
      if(i.action==='feed')end='奶糕吃完后舔舔嘴巴，满足地坐在旁边。';
      if(i.action==='play')end='奶糕玩累了一点，趴下来休息。';
      if(id==='care-bath')end='奶糕甩了甩毛，终于洗干净啦。';
      if(id==='med-rest')end='奶糕已经睡着了，呼吸慢慢变得平稳。';
      setPetVisual(id==='med-rest'?'sleeping':'happy',end,'',id==='med-rest'?r.prop:'');
      finishPetAction(end);
      if(cur==='pet')renderPetInventoryOnly();
    },2100);
  },650);
}
function renderPetInventoryOnly(){
  const box=document.querySelector('.pet-inventory');if(!box)return;
  const own=shop.filter(i=>(state.inventory[i.id]||0)>0);
  box.innerHTML=own.length?own.map(i=>`<div class="inv-card"><div><b>${i.emoji} ${i.name}</b><small>×${state.inventory[i.id]}</small></div><button class="secondary-btn" data-use="${i.id}">使用</button></div>`).join(''):'<div class="empty-note">用品已经用完，去商城补充吧。</div>';
  box.querySelectorAll('[data-use]').forEach(b=>b.onclick=()=>usePetItem(b.dataset.use));
}
function renderRewards(){const f=weekFull(),all=[...fixedRewards,...state.customRewards];page.innerHTML=`<div class="page-panel"><div class="section-hero"><div><h1>🎁 奖励中心</h1><p>当前 ${state.points}分 · 本周满额 ${f}/7天</p></div><button class="primary-btn" id="addReward">＋ 自定义奖励</button></div><div class="rewards-grid">${all.map(r=>{let u=f>=(r.days||0),e=state.points>=r.points;return `<div class="reward-card ${u?'':'locked'}"><div class="reward-emoji">${r.emoji||'⭐'}</div><h3>${esc(r.title)}</h3><p>${r.points}积分${r.days?' · 满额'+r.days+'天解锁':' · 自定义'}</p><button class="primary-btn" data-red="${r.id}" ${(!u||!e)?'disabled':''}>${!u?'未解锁':!e?'积分不足':'兑换'}</button></div>`}).join('')}</div></div>`;$('#addReward').onclick=()=>modal('<h2>新增自定义奖励</h2><div class="field"><label>奖励名称</label><input id="rn"></div><div class="field"><label>所需积分</label><input id="rp" type="number" value="100"></div><div class="field"><label>图标</label><input id="re" value="⭐"></div><div class="modal-actions"><button class="secondary-btn" data-close>取消</button><button class="primary-btn" id="rs">保存</button></div>');setTimeout(()=>{if($('#rs'))$('#rs').onclick=()=>{let title=$('#rn').value.trim(),points=+$('#rp').value,emoji=$('#re').value||'⭐';if(!title||points<2)return toast('请填写有效内容');state.customRewards.push({id:'r-'+Date.now(),title,points,emoji,days:0});save();closeModal();renderRewards()}},0);page.querySelectorAll('[data-red]').forEach(b=>b.onclick=()=>{const r=all.find(x=>x.id===b.dataset.red);if(!r||state.points<r.points||f<(r.days||0))return;state.points-=r.points;state.rewardLog.push({title:r.title,date:key(),points:r.points});save();toast('已兑换：'+r.title);renderRewards()})}
function renderCalendar(){const n=new Date(),y=n.getFullYear(),m=n.getMonth(),first=new Date(y,m,1),last=new Date(y,m+1,0),cells=[];for(let i=0;i<(first.getDay()+6)%7;i++)cells.push('');for(let d=1;d<=last.getDate();d++)cells.push(d);while(cells.length%7)cells.push('');let mf=0;for(let d=1;d<=n.getDate();d++)if(full(new Date(y,m,d)))mf++;page.innerHTML=`<div class="page-panel"><div class="section-hero"><div><h1>🗓️ 学习日历</h1><p>绿色已打卡，粉色未打卡，灰色未到时间。</p></div><b>${y}.${String(m+1).padStart(2,'0')}</b></div><div class="calendar-wrap"><div class="calendar-card"><div class="calendar-head"><h2>${y}年${m+1}月</h2></div><div class="calendar-grid">${['一','二','三','四','五','六','日'].map(x=>`<div class="cal-week">${x}</div>`).join('')}${cells.map(d=>{if(!d)return'<div></div>';let dt=new Date(y,m,d),today=new Date();today.setHours(0,0,0,0);dt.setHours(0,0,0,0);let c=dt>today?'future':full(dt)?'done':'missed';return `<div class="cal-day ${c} ${d===n.getDate()?'today':''}">${d}</div>`}).join('')}</div></div><div class="stats-card"><h2>本月统计</h2><div class="stat-big">${mf}天</div><p>已完成满额打卡</p><button class="secondary-btn" id="export">导出备份</button><button class="secondary-btn" id="import">导入备份</button></div></div></div>`;$('#export').onclick=()=>{let a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));a.download='喵喵打卡备份-'+key()+'.json';a.click()};$('#import').onclick=()=>$('#importInput').click()}
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
syncLandscape();
renderNav();home();if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
})();