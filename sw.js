const CACHE_NAME = 'beinside-v7';
const OFFLINE_PAGE = '/offline.html';
const ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
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

  // Google Fonts — cache-first (폰트는 잘 안 변하므로)
  if (e.request.url.includes('fonts.googleapis.com') || e.request.url.includes('fonts.gstatic.com')) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
          return res;
        });
      })
    );
    return;
  }

  // HTML 요청 — network-first, 실패 시 오프라인 페이지
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      }).catch(() =>
        caches.match(e.request).then(cached => cached || caches.match(OFFLINE_PAGE))
      )
    );
    return;
  }

  // 기타 리소스 — network-first with cache fallback
  e.respondWith(
    fetch(e.request).then(res => {
      const clone = res.clone();
      caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      return res;
    }).catch(() => caches.match(e.request))
  );
});
