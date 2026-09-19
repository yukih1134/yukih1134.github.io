const CACHE='miaomiao-desk-v24';
const CORE=['./','./index.html','./styles.css?v=20260919-24','./pet-assets.js?v=20260919-24','./app.js?v=20260919-24','./manifest.json','./icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
async function fetchGood(request){
  const r=await fetch(request,{cache:'no-store'});
  if(!r||!r.ok)throw new Error('bad-response');
  return r;
}
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  if(url.origin!==self.location.origin)return;
  const isFresh=e.request.mode==='navigate'||url.pathname.endsWith('.html')||url.pathname.endsWith('.js')||url.pathname.endsWith('.css');
  if(isFresh){
    e.respondWith(fetchGood(e.request).then(r=>{
      const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r;
    }).catch(()=>caches.match(e.request).then(x=>x||caches.match('./index.html'))));
  }else{
    e.respondWith(caches.match(e.request).then(x=>x||fetch(e.request).then(r=>{
      if(!r||!r.ok)return r;
      const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r;
    })));
  }
});