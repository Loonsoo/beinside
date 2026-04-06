/* ═══════════════════════════════════════════════════════════
   BeInside — 온보딩 (첫 방문 안내)
   localStorage 키: beinside_onboard_v1
═══════════════════════════════════════════════════════════ */
(function initOnboard() {
  const KEY = 'beinside_onboard_v1';
  const overlay = document.getElementById('onboard-overlay');
  if (!overlay) return;

  // 이미 본 사용자는 숨김
  if (localStorage.getItem(KEY)) {
    overlay.style.display = 'none';
    return;
  }

  // 표시
  overlay.style.display = '';
  requestAnimationFrame(() => overlay.classList.add('on'));

  // Step 1 선택
  window.onboardSelect = function(choice) {
    const step1 = document.getElementById('onboard-step-1');
    if (choice === 'emergency') {
      onboardDismiss();
      showPage('emergency');
      setMTab('emergency');
      return;
    }
    if (step1) step1.style.display = 'none';
    const next = document.getElementById('onboard-step-' + choice);
    if (next) {
      next.style.display = '';
      next.classList.add('onboard-fade-in');
    }
  };

  // Step 2 → 페이지 이동 + 홈 분기 동기화
  window.onboardGo = function(page) {
    onboardDismiss();
    // 홈 분기 상태도 동기화
    var branchMap = {
      growth:'care', sp:'care', birth:'care', dad:'care', elder:'care',
      emotion:'self', burnout:'self', relation:'self', sleep:'self',
      teen:'life', workplace:'life', finance:'life', independence:'life', transition:'life'
    };
    if (branchMap[page] && typeof selectBranch === 'function') {
      selectBranch(branchMap[page]);
    }
    showPage(page);
    var tabMap = {
      growth: 'growth', sp: 'home', birth: 'home', dad: 'growth', elder: 'home',
      emotion: 'mind', burnout: 'mind', relation: 'mind', sleep: 'mind',
      teen: 'mind', workplace: 'mind', finance: 'mind', independence: 'mind', transition: 'mind'
    };
    setMTab(tabMap[page] || 'home');
  };

  // 이전으로
  window.onboardBack = function() {
    document.querySelectorAll('.onboard-step').forEach(s => s.style.display = 'none');
    const step1 = document.getElementById('onboard-step-1');
    if (step1) step1.style.display = '';
  };

  // 닫기
  window.onboardDismiss = function() {
    localStorage.setItem(KEY, '1');
    overlay.classList.remove('on');
    overlay.classList.add('out');
    setTimeout(() => { overlay.style.display = 'none'; }, 350);
  };
})();
