/*  BeInside Service Worker
    - HTML(navigate): network-first → 캐시 → 오프라인 페이지
    - 같은 출처 CSS/JS/JSON: network-first → 실패하면 캐시
      (배포 직후 새 HTML과 옛 CSS/JS가 섞이지 않게. 오프라인일 때만 캐시를 쓴다)
    - 폰트: cache-first (장기 캐시)
    - 그 밖의 같은 출처 파일(아이콘 등): 캐시 우선 + 백그라운드 갱신
    - 배포 시 SW 파일 자체가 변경되면 브라우저가 자동 업데이트. 자산 목록이 바뀌면 CACHE_STATIC 번호를 올린다 */

const CACHE_STATIC = 'beinside-static-v5';
const CACHE_FONT   = 'beinside-font-v2';
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
  '/js/helplines.js',
  '/js/pp-home.js',
  '/js/memo.js',
  '/js/share.js',
  '/js/multicultural-page.js',
  '/js/data-guides-new.js',
  '/js/data-guides-situational.js',
  '/js/data-centers.js',
  '/js/dashboard.js',
  '/js/centers-ui.js',
  '/js/new-pages.js',
  '/js/i18n.js',
  '/js/notify.js',
  '/js/search.js',
  '/js/vitals.js',
  '/js/data-guides-independence.js',
  '/js/locales/ko.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
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

  // 1) 글꼴 — cache-first (폰트는 거의 변하지 않음)
  //    Google Fonts(고운바탕) + jsDelivr(Pretendard, 버전 고정 경로만)
  if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com') ||
      url.startsWith('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@')) {
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

  // 외부 요청(통계·카카오 등)은 서비스워커가 건드리지 않는다
  const u = new URL(url);
  if (u.origin !== self.location.origin) return;

  // 3) CSS/JS/JSON — network-first → 실패하면 캐시
  if (/\.(?:css|js|json)$/.test(u.pathname)) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_STATIC).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request).then(cached => cached || Response.error()))
    );
    return;
  }

  // 4) 그 밖의 같은 출처 파일(아이콘 등) — 캐시 우선 + 백그라운드 갱신
  e.respondWith(
    caches.open(CACHE_STATIC).then(cache =>
      cache.match(e.request).then(cached => {
        const fetchPromise = fetch(e.request).then(res => {
          if (res.ok) cache.put(e.request, res.clone());
          return res;
        }).catch(() => cached || Response.error());
        return cached || fetchPromise;
      })
    )
  );
});

/* ── 일일 체크인 알림 클릭: 열린 창이 있으면 그 창으로, 없으면 기록 페이지를 연다 ── */
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const target = (e.notification.data && e.notification.data.url) || '/';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) {
        if ('focus' in c) { if ('navigate' in c) c.navigate(target); return c.focus(); }
      }
      return self.clients.openWindow ? self.clients.openWindow(target) : undefined;
    })
  );
});
