const CACHE_NAME = 'beinside-v6';
const ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/app.js',
  '/js/data.js',
  '/js/render.js',
  '/js/features.js',
  '/js/profiles.js',
  '/js/storage.js',
  '/js/utils.js',
  '/js/memo.js',
  '/js/share.js',
  '/js/onboard.js',
  '/js/self-pages.js',
  '/js/emotion-page.js',
  '/js/elder-care.js',
  '/js/grief-page.js',
  '/js/sleep-page.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      return res;
    }).catch(() => caches.match(e.request))
  );
});
