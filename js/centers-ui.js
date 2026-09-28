/* ═══════════════════════════════════════════════════════════
   BeInside — 공공기관 연결 UI 렌더러
   각 페이지 하단에 관련 상담/지원 기관 자동 표시
═══════════════════════════════════════════════════════════ */

(function () {
  var RENDERED = {};

  /**
   * 페이지 하단에 관련 공공기관 섹션을 렌더링합니다.
   * showPage() 후 호출됩니다.
   */
  window.renderPageCenters = function (pageId) {
    if (RENDERED[pageId]) return;
    if (typeof getCentersForPage !== 'function') return;
    /* 긴급 도움 페이지는 맨 위 번호 목록이 같은 기관이라 따로 붙이지 않는다 */
    if (pageId === 'home' || pageId === 'journal' || pageId === 'emergency') return;

    var centers = getCentersForPage(pageId);
    if (!centers || centers.length === 0) return;

    // 페이지 컨테이너 찾기
    var container = document.getElementById('page-' + pageId);
    if (!container) return;

    // 이미 추가되었는지 확인
    if (container.querySelector('.centers-section')) return;

    // 최대 6개 표시
    var shown = centers.slice(0, 6);

    /* 공통 콘텐츠 셸을 쓰는 가이드(.guide-shell): 접지 않고 카드와 같은 번호 버튼으로 (js/cards.js cardCallHTML) */
    if (container.classList.contains('guide-shell') && typeof cardCallHTML === 'function') {
      /* 번호가 없는 기관(온라인 상담·포털)은 누리집 링크로. 위 "더 도움이 필요하면"에 이미 있는 번호는 다시 쓰지 않는다 */
      var onPage = {};
      container.querySelectorAll('a[href^="tel:"]').forEach(function (a) { onPage[a.getAttribute('href')] = true; });
      var shell = centers.filter(function (c) {
        if (!c.phone) return !!c.url;
        var tel = 'tel:' + c.phone.replace(/-/g, '');
        if (onPage[tel]) return false;
        onPage[tel] = true; /* 같은 번호의 기관이 두 번 나오지 않게 */
        return true;
      }).slice(0, 6);
      if (!shell.length) return;
      var sec = document.createElement('section');
      sec.className = 'bc bc-sec centers-section centers-section--shell';
      sec.setAttribute('aria-labelledby', 'centers-t-' + pageId);
      sec.innerHTML = '<h2 class="bc-h" id="centers-t-' + pageId + '">도움받을 수 있는 곳</h2>'
        + '<div class="bc-actions">'
        + shell.map(function (c) {
          var desc = c.desc.substring(0, 50) + (c.desc.length > 50 ? '…' : '');
          return c.phone
            ? cardCallHTML({ number: c.phone, name: c.name, desc: desc })
            : cardLinkHTML({ href: c.url, label: c.name, sub: desc });
        }).join('')
        + '</div>';
      container.appendChild(sec);
      RENDERED[pageId] = true;
      return;
    }

    /* 번호가 없는 기관이 tel:null 링크가 되지 않게 */
    shown = centers.filter(function (c) { return c.phone; }).slice(0, 6);
    if (!shown.length) return;
    var uid = 'centers-' + Math.random().toString(36).substr(2, 6);
    var html = '<div class="centers-section">'
      + '<button class="guide-help-toggle" onclick="this.classList.toggle(\'open\');document.getElementById(\'' + uid + '\').classList.toggle(\'open\')" aria-expanded="false" aria-controls="' + uid + '">'
      + '<span>📞 도움받을 수 있는 곳 <span class="guide-help-count">' + shown.length + '곳</span></span>'
      + '<span class="guide-help-arrow"></span>'
      + '</button>'
      + '<div class="guide-help-body" id="' + uid + '">'
      + '<div class="centers-list">';

    shown.forEach(function (c) {
      html += '<a href="tel:' + c.phone + '" class="center-item">'
        + '<div class="center-info">'
        + '<strong class="center-name">' + c.name + '</strong>'
        + '<span class="center-desc">' + c.desc.substring(0, 50) + (c.desc.length > 50 ? '…' : '') + '</span>'
        + '</div>'
        + '<div class="center-phone">'
        + '<span class="center-number">' + c.phone + '</span>'
        + (c.free ? '<span class="center-badge">무료</span>' : '')
        + '</div>'
        + '</a>';
    });

    html += '</div></div></div>';

    // 페이지 콘텐츠 마지막에 삽입
    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    container.appendChild(wrapper.firstChild);
    RENDERED[pageId] = true;
  };
})();
