/* ═══════════════════════════════════════════════════════════
   BeInside — 공공기관 연결 UI 렌더러
   각 페이지 하단에 관련 상담/지원 기관 자동 표시
═══════════════════════════════════════════════════════════ */

(function () {
  var RENDERED = {};
  var SHELL_PAGES = ['growth', 'birth', 'postpartum'];

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

    /* 공통 콘텐츠 셸을 쓰는 가이드(성장·출산·산후): 접지 않고 카드와 같은 번호 버튼으로 (js/cards.js cardCallHTML) */
    if (SHELL_PAGES.indexOf(pageId) !== -1 && typeof cardCallHTML === 'function') {
      var sec = document.createElement('section');
      sec.className = 'bc bc-sec centers-section centers-section--shell';
      sec.setAttribute('aria-labelledby', 'centers-t-' + pageId);
      sec.innerHTML = '<h2 class="bc-h" id="centers-t-' + pageId + '">도움받을 수 있는 곳</h2>'
        + '<div class="bc-actions">'
        + shown.map(function (c) {
          return cardCallHTML({ number: c.phone, name: c.name, desc: c.desc.substring(0, 50) + (c.desc.length > 50 ? '…' : '') });
        }).join('')
        + '</div>';
      container.appendChild(sec);
      RENDERED[pageId] = true;
      return;
    }

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
