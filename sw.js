const CACHE='miaomiao-desk-v9';
const CORE=['./','./index.html','./styles.css?v=20260918-9','./app.js?v=20260918-9','./manifest.json','./icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  const same=url.origin===self.location.origin;
  if(!same)return;
  const isNav=e.request.mode==='navigate'||url.pathname.endsWith('.html')||url.pathname.endsWith('.js')||url.pathname.endsWith('.css');
  if(isNav){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{
      const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r;
    }).catch(()=>caches.match(e.request).then(x=>x||caches.match('./index.html'))));
  }else{
    e.respondWith(caches.match(e.request).then(x=>x||fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r;})));
  }
});