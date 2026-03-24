/* ═══════════════════════════════════════════════════════════
   Web Vitals → Umami 커스텀 이벤트 전송
   Core Web Vitals: LCP, CLS, INP + 보조: FCP, TTFB
═══════════════════════════════════════════════════════════ */

(function () {
  function sendToUmami(metric) {
    if (typeof umami === 'undefined') return;
    try {
      umami.track('web-vital', {
        name: metric.name,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        rating: metric.rating          // 'good' | 'needs-improvement' | 'poor'
      });
    } catch (e) { /* 분석 실패가 사용자 경험에 영향 주지 않도록 */ }
  }

  // web-vitals 4.x CDN (ES module)
  import('https://unpkg.com/web-vitals@4/dist/web-vitals.attribution.js')
    .then(function (mod) {
      mod.onCLS(sendToUmami);
      mod.onLCP(sendToUmami);
      mod.onINP(sendToUmami);
      mod.onFCP(sendToUmami);
      mod.onTTFB(sendToUmami);
    })
    .catch(function () { /* CDN 로딩 실패 시 무시 — 핵심 기능 아님 */ });
})();
