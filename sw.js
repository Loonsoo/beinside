/*  BeInside Service Worker
    - 정적 자산: stale-while-revalidate (즉시 캐시 응답 + 백그라운드 갱신)
    - HTML(navigate): network-first → 캐시 → 오프라인 페이지
    - 폰트: cache-first (장기 캐시)
    - 배포 시 SW 파일 자체가 변경되면 브라우저가 자동 업데이트 */

const CACHE_STATIC = 'beinside-static-v1';
const CACHE_FONT   = 'beinside-font-v1';
const OFFLINE_PAGE = '/offline.html';

const PRECACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/css/base.css',
  '/css/pages.css',
  '/css/dark.css',
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
  '/js/sleep-page.js',
  '/js/multicultural-page.js',
  '/js/data-guides-new.js',
  '/js/data-centers.js',
  '/js/dashboard.js',
  '/js/new-pages.js',
  '/js/i18n.js',
  '/js/notify.js',
  '/js/search.js',
  '/js/vitals.js'
];

/* ── Install: 정적 자산 프리캐시 ── */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_STATIC)
      .then(c => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: 이전 버전 캐시 정리 ── */
const VALID_CACHES = [CACHE_STATIC, CACHE_FONT];
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => !VALID_CACHES.includes(k)).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch 전략 ── */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = e.request.url;

  // 1) Google Fonts — cache-first (폰트는 거의 변하지 않음)
  if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
    e.respondWith(
      caches.open(CACHE_FONT).then(cache =>
        cache.match(e.request).then(cached => {
          if (cached) return cached;
          return fetch(e.request).then(res => {
            if (res.ok) cache.put(e.request, res.clone());
            return res;
          });
        })
      )
    );
    return;
  }

  // 2) HTML (navigate) — network-first → 캐시 → 오프라인 페이지
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE_STATIC).then(c => c.put(e.request, clone));
        return res;
      }).catch(() =>
        caches.match(e.request).then(cached => cached || caches.match(OFFLINE_PAGE))
      )
    );
    return;
  }

  // 3) 정적 자산 (CSS/JS) — stale-while-revalidate
  //    즉시 캐시 응답 반환 + 백그라운드에서 최신 버전 갱신
  e.respondWith(
    caches.open(CACHE_STATIC).then(cache =>
      cache.match(e.request).then(cached => {
        const fetchPromise = fetch(e.request).then(res => {
          if (res.ok) cache.put(e.request, res.clone());
          return res;
        }).catch(() => cached);

        return cached || fetchPromise;
      })
    )
  );
});
