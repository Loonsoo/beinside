/* ═══════════════════════════════════════════════════════════
   BeInside — 앱 메인 로직 & 네비게이션
═══════════════════════════════════════════════════════════ */

/* ── 현재 페이지 상태 ── */
let curSit  = 0;
let curPage = 'home'; // home | growth | sp | birth | mental | teen | emergency

const ALL_PAGES = ['growth', 'sp', 'birth', 'mental', 'teen', 'emergency', 'emotion', 'burnout', 'relation', 'transition', 'workplace', 'dad', 'elder', 'grief', 'sleep', 'postpartum', 'menopause', 'journal', 'multicultural', 'adhd', 'addiction', 'finance'];

/* ── 페이지 전환 ── */
const _pageRendered = {};  // 캐시: 한 번 렌더링된 페이지는 다시 렌더링하지 않음

function showPage(id) {
  curPage = id;
  var hero = document.getElementById('hero');
  var mainCol = document.querySelector('.main-col');

  // fade-out 현재 페이지 → fade-in 새 페이지
  if (mainCol) mainCol.classList.add('page-leaving');

  setTimeout(function() {
    if (id === 'home') {
      if (hero) hero.style.display = '';
      ALL_PAGES.forEach(function(p) {
        var el = document.getElementById('page-' + p);
        if (el) el.style.display = 'none';
      });
    } else {
      if (hero) hero.style.display = 'none';
      ALL_PAGES.forEach(function(p) {
        var el = document.getElementById('page-' + p);
        if (el) el.style.display = (p === id) ? '' : 'none';
      });
      // 최초 진입 시에만 렌더링
      if (!_pageRendered[id]) {
        _pageRendered[id] = true;
        if (id === 'sp' && curSit >= 0) renderSP(curSit);
        if (id === 'mental') initMentalPage();
        if (id === 'teen') initTeenPage();
        if (id === 'emergency') initEmergencyFirstAid();
        if (id === 'emotion') initEmotionPage();
        if (id === 'burnout') initBurnoutPage();
        if (id === 'relation') initRelationPage();
        if (id === 'transition') initTransitionPage();
        if (id === 'workplace') initWorkplacePage();
        if (id === 'elder') initElderPage();
        if (id === 'grief') initGriefPage();
        if (id === 'sleep') initSleepPage();
        if (id === 'postpartum') initPostpartumPage();
        if (id === 'menopause') initMenopausePage();
        if (id === 'journal') initJournalPage();
        if (id === 'multicultural') initMulticulturalPage();
        if (id === 'adhd') initAdhdPage();
        if (id === 'addiction') initAddictionPage();
        if (id === 'finance') initFinancePage();
      }
    }

    // 공공기관 연결 자동 렌더링
    if (typeof renderPageCenters === 'function') renderPageCenters(id);

    // URL History API 라우팅 (SEO)
    var newPath = id === 'home' ? '/' : '/' + id;
    if (location.pathname !== newPath) {
      history.pushState({ page: id }, '', newPath);
    }
    updatePageMeta(id);

    // Umami 수동 페이지뷰 추적
    if (typeof umami !== 'undefined') {
      try { umami.track(function(props) { return Object.assign({}, props, { url: newPath, title: document.title }); }); } catch(e) {}
    }
    // 카드 눌림 상태 해제
    if (document.activeElement && document.activeElement.classList.contains('sit-card')) {
      document.activeElement.blur();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (mainCol) mainCol.classList.remove('page-leaving');

    // P3: 위기 후 팔로업 — 긴급 허브 방문 기록
    if (id === 'emergency') {
      try { sessionStorage.setItem('beinside_crisis_visit', '1'); } catch(e) {}
    }
    // 홈 복귀 시 팔로업 배너 표시
    if (id === 'home') {
      showFollowupBanner();
    }

    // 스크린리더 알림
    announceToSR(id === 'home' ? '홈 화면' : id + ' 페이지로 이동했습니다');
  }, 120);
}

/* ── 홈으로 ── */
function goHome() {
  showPage('home');
  setMTab('home');
}

/* ── 모바일 카드 터치 피드백 (iOS Safari :active 미지원 대응) ── */
(function initTapFeedback() {
  var tapCard = null;
  var startX = 0;
  var startY = 0;
  var scrolled = false;

  document.addEventListener('touchstart', function(e) {
    var card = e.target.closest('.sit-card');
    if (!card) return;
    tapCard = card;
    scrolled = false;
    var t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    card.classList.add('tap');
  }, { passive: true });

  document.addEventListener('touchmove', function(e) {
    if (!tapCard) return;
    var t = e.touches[0];
    var dx = Math.abs(t.clientX - startX);
    var dy = Math.abs(t.clientY - startY);
    // 10px 이상 이동하면 스크롤로 판단 → 탭 취소
    if (dx > 10 || dy > 10) {
      scrolled = true;
      tapCard.classList.remove('tap');
    }
  }, { passive: true });

  document.addEventListener('touchend', function(e) {
    if (!tapCard) return;
    var card = tapCard;
    tapCard = null;
    if (scrolled) {
      card.classList.remove('tap');
      return;
    }
    // 탭 확정: 블루 피드백 보여준 뒤 페이지 전환
    e.preventDefault();
    setTimeout(function() {
      card.classList.remove('tap');
      card.click();
    }, 120);
  });

  document.addEventListener('touchcancel', function() {
    if (tapCard) { tapCard.classList.remove('tap'); }
    tapCard = null;
  }, { passive: true });
})();

/* ── 뷰 전환 (하위 호환 — 탭바·카드에서 호출될 수 있음) ── */
function switchView(v) {
  const map = { normal: 'growth', sp: 'sp', birth: 'birth', growth: 'growth', mind: 'mind', journal: 'journal', emergency: 'emergency' };
  showPage(map[v] || 'home');
}

/* ── 입력 모드 전환 (개월/세) ── */
let mode = 'm';

function setM(m) {
  mode = m;
  const bm = document.getElementById('bm');
  const by = document.getElementById('by');
  const au = document.getElementById('au');
  const ai = document.getElementById('ai');
  const hint = document.getElementById('hint');
  if (bm) bm.classList.toggle('on', m === 'm');
  if (by) by.classList.toggle('on', m === 'y');
  if (au) au.textContent = m === 'm' ? '개월' : '세';
  if (ai) ai.max = m === 'm' ? '36' : '80';
  if (hint) hint.style.opacity = m === 'm' ? '1' : '0.3';
}

function getMonths() {
  const v = parseInt(document.getElementById('ai').value) || 0;
  return mode === 'm' ? v : v * 12;
}

/* ── 가이드 탭 전환 ── */
function switchGuideTab(tab) {
  const childResult = document.getElementById('result');
  const dadResult   = document.getElementById('dad-result');
  document.querySelectorAll('.guide-tab').forEach(btn => {
    btn.classList.toggle('on', btn.dataset.tab === tab);
  });
  if (childResult) childResult.style.display = tab === 'child' ? '' : 'none';
  if (dadResult)   dadResult.style.display   = tab === 'dad'   ? '' : 'none';
  if (tab === 'dad') renderDadGuide();
}

/* ── 연령 필(age-pill) 탭 전환 ── */
function switchAgePill(btn, panelId, contentId) {
  const panel = document.getElementById(panelId);
  if (!panel) return;
  panel.querySelectorAll('.age-pill').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  panel.querySelectorAll('.age-content').forEach(el => el.style.display = 'none');
  const target = document.getElementById(contentId);
  if (target) target.style.display = '';
}

/* ── 타이머 (떼쓰기 진정용) ── */
function startTimer(btn, seconds) {
  let t = seconds;
  btn.disabled = true;
  const iv = setInterval(() => {
    t--;
    btn.textContent = '\u23F1\uFE0F ' + t + '\uCD08 \uD6C4 \uD655\uC778';
    if (t <= 0) {
      clearInterval(iv);
      btn.textContent = '\u23F1\uFE0F ' + Math.floor(seconds / 60) + '\uBD84 \uD0C0\uC774\uBA38';
      btn.disabled = false;
    }
  }, 1000);
}

/* ── 미니 툴킷 토글 ── */
function toggleToolkit(id) {
  const panel = document.getElementById(id);
  if (!panel) return;
  const isOpen = panel.classList.contains('on');
  document.querySelectorAll('.toolkit-panel').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.toolkit-btn').forEach(b => b.classList.remove('on'));
  if (!isOpen) {
    panel.classList.add('on');
    const btn = document.querySelector(`.toolkit-btn[onclick*="${id}"]`);
    if (btn) btn.classList.add('on');
    setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
  }
}

/* ── 산후우울증 체커 ── */
const _ppdAnswers = [null, null, null, null, null];
function ppdAnswer(qIdx, val) {
  _ppdAnswers[qIdx] = val;
  const items = document.querySelectorAll(`[data-q="${qIdx}"] .ppd-btn`);
  items.forEach((b, i) => b.classList.toggle('on', i === val));
  const answered = _ppdAnswers.filter(v => v !== null).length;
  if (answered === 5) {
    const score = _ppdAnswers.reduce((a, b) => a + b, 0);
    const res = document.getElementById('ppd-result');
    if (!res) return;
    res.style.display = 'block';
    let cls, msg, action;
    if (score >= 10) {
      cls = 'res-critical';
      msg = '😔 지금 많이 힘드시겠어요. 전문가의 도움이 필요한 수준이에요.';
      action = '지금 바로 <a href="tel:109" style="color:inherit;font-weight:700">109</a>(무료·24시간)에 전화하거나, 가까운 정신건강복지센터·산부인과를 방문해 주세요.';
    } else if (score >= 7) {
      cls = 'res-high';
      msg = '💜 산후우울 증상이 상당히 나타나고 있어요.';
      action = '보건소·산부인과에서 에든버러 산후우울증 척도(EPDS) 무료 검사를 받아보세요. 109으로 상담 연결도 가능해요.';
    } else if (score >= 4) {
      cls = 'res-mid';
      msg = '🌿 약간의 어려움이 있는 것 같아요.';
      action = '일주일 후에 다시 체크해 보세요. 증상이 지속되면 보건소에 상담을 요청하세요.';
    } else {
      cls = 'res-ok';
      msg = '🌸 지금은 비교적 안정적인 상태예요.';
      action = '하지만 감정 변화가 생기면 언제든 다시 확인해 보세요. 당신의 마음도 소중해요.';
    }
    res.className = 'ppd-result ' + cls;
    res.innerHTML = `<div style="font-size:14px;font-weight:600;margin-bottom:8px;">${msg}</div><div style="font-size:13px;line-height:1.7;">${action}</div><div class="ppd-disclaimer">이 결과는 의학적 진단이 아닌 참고용이에요. 정확한 진단은 전문의와 상담하세요.</div>`;
  }
}

/* ── 청소년 감정 선택 ── */
const EMO_DATA = {
  angry:  { msg: '화가 많이 났구나 😡', sub: '그 화, 충분히 이해해. 화는 정상 감정이야.', action: '지금 잠깐 밖으로 나가거나, 베개에 소리 질러봐. 그리고 뭐 때문에 화가 났는지 적어봐.', color: '#E05A3A' },
  sad:    { msg: '많이 슬프구나 😢', sub: '울어도 돼. 슬픔을 꺼내는 게 용감한 거야.', action: '좋아하는 음악 틀어놓고 그냥 울어봐. 감정을 꺼내야 가벼워져.', color: '#5A7AC8' },
  scared: { msg: '불안하고 무섭구나 😰', sub: '그 느낌, 진짜 힘들지. 네가 약한 게 아니야.', action: '손을 주먹 쥐었다가 천천히 펴봐. 4초 들이쉬고 6초 내쉬기 — 불안이 조금 가라앉아.', color: '#7A5AC8' },
  lonely: { msg: '외롭구나 🥺', sub: '혼자 감당해왔다는 거, 정말 힘들었을 거야.', action: '지금 1388에 문자 보내봐. 전화 아니어도 돼. 그냥 "힘들어요"라고만 해도 돼.', color: '#C8874A' },
  empty:  { msg: '뭔지 모르겠구나 😶', sub: '감정이 뭔지 모를 때도 있어. 그것도 괜찮아.', action: '지금 눈 감고 1분만 있어봐. 몸에 느껴지는 게 있어? 무겁거나, 답답하거나? 그게 감정이야.', color: '#8A8A8A' },
  tired:  { msg: '많이 지쳤구나 😞', sub: '오래 버텨온 거야. 지친 게 당연해.', action: '오늘 하루는 아무것도 안 해도 돼. 그냥 쉬어. 쉬는 것도 용기야.', color: '#5A9A7A' },
};

function showEmoResult(key) {
  const d = EMO_DATA[key];
  if (!d) return;
  document.querySelectorAll('.emo-btn').forEach(b => b.classList.remove('on'));
  const btn = document.querySelector(`.emo-btn[onclick*="${key}"]`);
  if (btn) btn.classList.add('on');
  const res = document.getElementById('emo-result');
  if (!res) return;
  res.classList.add('on');
  res.style.display = 'block';
  res.innerHTML =
    `<div class="emo-result-msg" style="color:${d.color}">${d.msg}</div>
     <div style="font-size:13px;color:var(--ink-m);margin:6px 0 10px;">${d.sub}</div>
     <div class="emo-result-action">${d.action}</div>
     <a href="tel:1388" class="emo-result-link">📞 지금 바로 1388에 연락하기</a>`;
  setTimeout(() => res.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
}

/* ── 가이드 조회 ── */
function go() {
  // 성장 가이드 페이지로 이동 (아직 안 가있으면)
  if (curPage !== 'growth') {
    showPage('growth');
  }
  const months = getMonths();
  if (months < 0) return;
  const d = getData(months);
  render(d, months);
  const r = document.getElementById('result');
  if (r) r.classList.add('on');
  // 가이드 탭바 표시 (아빠 가이드 연동)
  const tabBar = document.getElementById('guide-tab-bar');
  if (tabBar) tabBar.style.display = '';
  // 현재 탭이 dad면 아빠 가이드도 업데이트
  const dadTab = document.querySelector('.guide-tab[data-tab="dad"].on');
  if (dadTab) renderDadGuide();
  const md = document.getElementById('medical-disclaimer');
  if (md) md.style.display = 'block';
  setTimeout(() => {
    const r = document.getElementById('result');
    if (r) r.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

/* ── 빠른 이동 ── */
function qs(v, m) {
  setM(m);
  document.getElementById('ai').value = v;
  go();
  setTimeout(() => {
    const r = document.getElementById('result');
    if (r) r.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

/* ── 나이 찾기 토글 ── */
function toggleAgeFinder(btn) {
  const body = document.getElementById('age-finder-body');
  if (!body) return;
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : '';
  const arrow = btn.querySelector('.af-arrow');
  if (arrow) arrow.classList.toggle('open', !isOpen);
}

/* ── 상황 선택 (한부모) ── */
function selectSit(n) {
  curSit = n;
  [0, 1, 2, 3].forEach(i => {
    const b = document.getElementById('sit' + i);
    if (b) b.classList.toggle('on', i === n);
  });
  renderSP(n);
}

/* ── 섹션 스크롤 (하위 호환) ── */
function toS(id) {
  if (id === 'hero') { goHome(); return; }
  if (id === 'guide-sec') { showPage('growth'); setMTab('growth'); return; }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ── 증상 체크 버튼 (출산 페이지) ── */
function showSymRes(btn, msg) {
  const item = btn.closest('.symptom-item');
  if (!item) return;
  const res = item.querySelector('.symptom-result');
  if (!res) return;
  res.textContent = msg;
  res.style.display = 'block';
}
function hideSymRes(btn) {
  const item = btn.closest('.symptom-item');
  if (!item) return;
  const res = item.querySelector('.symptom-result');
  if (res) res.style.display = 'none';
}

/* ── 마음 돌봄 페이지 초기화 ── */
function initMentalPage() {
  const tabsEl = document.getElementById('mental-tabs');
  if (!tabsEl || tabsEl.dataset.init) return;
  tabsEl.dataset.init = '1';

  const MENTAL_TABS = [
    { key: 'infant',    label: '영아기 산모' },
    { key: 'toddler',   label: '유아기 부모' },
    { key: 'preschool', label: '학령전기 부모' },
    { key: 'school',    label: '학령기 부모' },
    { key: 'teen',      label: '청소년' },
    { key: 'young',     label: '청년' },
    { key: 'adult',     label: '성인' },
    { key: 'middle',    label: '중년' },
    { key: 'senior',    label: '노년' },
  ];

  MENTAL_TABS.forEach((t, i) => {
    const btn = document.createElement('button');
    btn.className = 'mental-tab' + (i === 0 ? ' on' : '');
    btn.textContent = t.label;
    btn.onclick = () => {
      tabsEl.querySelectorAll('.mental-tab').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      renderMentalPageContent(t.key);
    };
    tabsEl.appendChild(btn);
  });

  renderMentalPageContent('infant');
}

/* ── 청소년 페이지 초기화 ── */
function initTeenPage() {
  renderTeenPage('child', document.querySelector('.teen-age-btn.on') || document.querySelector('.teen-age-btn'));
}

/* ── 긴급 응급처치 초기화 ── */
function initEmergencyFirstAid() {
  const el = document.getElementById('emer-firstaid-content');
  if (!el || el.dataset.init) return;
  el.dataset.init = '1';
  el.innerHTML = getFirstAidHTML(0); // 영유아 기준 응급처치 전체
}

/* ── 모바일 탭 활성화 ── */
function setMTab(id) {
  document.querySelectorAll('.mtab').forEach(b => b.classList.remove('active'));
  const t = document.getElementById('mtab-' + id);
  if (t) t.classList.add('active');
}

/* ── SP 패널 초기화 ── */
renderSP(0);

/* ── 출산 섹션 초기화 ── */
initBirth();

/* ── 스크롤 진행 바 ── */
(function initScrollBar() {
  const bar = document.getElementById('scroll-bar');
  if (!bar) return;
  window.addEventListener('scroll', function () {
    const h   = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
})();

/* ── Escape 키 처리 ── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeHeaderMenu();
    closeSettings();
    closeSourceDrawer();
    closeModal();
    closeGuideFinder();
  }
});

/* ── 용어 툴팁 — 싱글 팝업, 동적 위치 ── */
(function initTermTooltip() {
  let popup = null;
  let activeTerm = null;

  function getPopup() {
    if (!popup) {
      popup = document.createElement('div');
      popup.className = 'term-popup';
      document.body.appendChild(popup);
    }
    return popup;
  }

  function closePopup() {
    if (popup) popup.classList.remove('on');
    if (activeTerm) activeTerm.classList.remove('active');
    activeTerm = null;
  }

  function showPopup(term) {
    const tip = term.querySelector('.term-tip');
    if (!tip) return;
    const p = getPopup();
    p.textContent = tip.textContent;

    // 먼저 보이지 않게 배치하여 크기 측정
    p.classList.remove('on', 'arrow-bottom', 'arrow-top');
    p.style.left = '0';
    p.style.top = '0';
    p.classList.add('on');

    const rect = term.getBoundingClientRect();
    const pw = p.offsetWidth;
    const ph = p.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const gap = 10;

    // 좌우 위치 — 용어 중심 기준, 화면 안에 유지
    let left = rect.left + rect.width / 2 - pw / 2;
    left = Math.max(16, Math.min(left, vw - pw - 16));

    // 화살표 X — 용어 중심이 팝업 내 어디인지
    const arrowX = Math.max(16, Math.min(rect.left + rect.width / 2 - left, pw - 16));
    p.style.setProperty('--arrow-x', arrowX + 'px');

    // 상하 위치 — 위에 공간 있으면 위, 없으면 아래
    let top;
    if (rect.top - ph - gap > 0) {
      top = rect.top - ph - gap;
      p.classList.add('arrow-bottom');
    } else {
      top = rect.bottom + gap;
      p.classList.add('arrow-top');
    }

    p.style.left = left + 'px';
    p.style.top = top + 'px';
    activeTerm = term;
    term.classList.add('active');
  }

  // 클릭(탭) 처리
  document.addEventListener('click', e => {
    const term = e.target.closest('.term');
    if (!term) { closePopup(); return; }
    e.preventDefault();
    e.stopPropagation();
    if (term === activeTerm) { closePopup(); return; }
    closePopup();
    showPopup(term);
  });

  // 데스크톱 전용 호버 (터치 기기 제외)
  const isTouch = matchMedia('(hover: none)').matches;
  if (!isTouch) {
    let hoverTerm = null;
    document.addEventListener('mouseover', e => {
      const term = e.target.closest('.term');
      if (!term || activeTerm) return;
      hoverTerm = term;
      showPopup(term);
    });
    document.addEventListener('mouseout', e => {
      const term = e.target.closest('.term');
      if (term && term === hoverTerm) {
        hoverTerm = null;
        closePopup();
      }
    });
  }

  // 스크롤·리사이즈 시 닫기
  window.addEventListener('scroll', closePopup, { passive: true });
  window.addEventListener('resize', closePopup);
})();

/* ══════════════════════════════════════════════════════
   카드 편집 모드 — 아이폰 스타일 드래그 재배치
══════════════════════════════════════════════════════ */
(function initCardEdit() {
  const ORDER_KEY = 'beinside_card_order_v1';
  let editMode = false;
  let editModeAt = 0;        // 편집 모드 진입 시각 (click 디바운스용)
  let longPressTimer = null;
  let drag = null;

  /* ── 순서 저장/복원 ── */
  function saveOrder() {
    const care = [...document.querySelectorAll('.section-care .sit-card[data-card-id]')].map(c => c.dataset.cardId);
    const self = [...document.querySelectorAll('.section-self .sit-card[data-card-id]')].map(c => c.dataset.cardId);
    localStorage.setItem(ORDER_KEY, JSON.stringify({ care, self }));
  }

  function loadOrder() {
    try {
      const saved = JSON.parse(localStorage.getItem(ORDER_KEY));
      if (!saved) return;
      applyOrder('.section-care .situation-grid', saved.care);
      applyOrder('.section-self .situation-grid', saved.self);
    } catch (e) { /* ignore */ }
  }

  function applyOrder(sel, order) {
    const grid = document.querySelector(sel);
    if (!grid || !order) return;
    order.forEach(id => {
      const card = grid.querySelector('[data-card-id="' + id + '"]');
      if (card) grid.appendChild(card);
    });
  }

  /* ── 편집 모드 진입/종료 ── */
  window.enterCardEdit = function() {
    if (editMode) return;
    editMode = true;
    editModeAt = Date.now();
    document.body.classList.add('card-edit-mode');
    // 숨겨진 "더 보기" 카드 모두 표시
    document.querySelectorAll('.sit-card--more-care, .sit-card--more-self').forEach(function(c) {
      c.style.display = '';
    });
    // "더 보기" 버튼 숨기기
    document.querySelectorAll('.show-more-btn').forEach(function(b) {
      b.style.display = 'none';
    });
    // 홈으로 이동 (다른 페이지에서 편집 누른 경우)
    if (typeof showPage === 'function' && typeof curPage !== 'undefined' && curPage !== 'home') {
      showPage('home');
    }
    // 햅틱 피드백 (지원 시)
    if (navigator.vibrate) navigator.vibrate(30);
  };

  window.exitCardEdit = function() {
    if (!editMode) return;
    editMode = false;
    document.body.classList.remove('card-edit-mode');
    // 진행 중인 드래그 정리
    if (drag) {
      if (drag.clone) drag.clone.remove();
      drag.card.classList.remove('dragging');
      drag = null;
    }
    // "더 보기" 카드 다시 숨기기 (expanded 상태가 아닌 경우)
    var careBtn = document.getElementById('show-more-care');
    var selfBtn = document.getElementById('show-more-self');
    if (careBtn && !careBtn.classList.contains('expanded')) {
      document.querySelectorAll('.sit-card--more-care').forEach(function(c) { c.style.display = 'none'; });
    }
    if (selfBtn && !selfBtn.classList.contains('expanded')) {
      document.querySelectorAll('.sit-card--more-self').forEach(function(c) { c.style.display = 'none'; });
    }
    // "더 보기" 버튼 복원
    document.querySelectorAll('.show-more-btn').forEach(function(b) {
      b.style.display = '';
    });
    saveOrder();
  };

  /* ── 롱프레스 감지 ── */
  var longPressCard = null;   // 롱프레스 중인 카드 참조
  var longPressPos = null;    // 롱프레스 시작 좌표

  function onPointerDown(e) {
    if (editMode) return;
    var card = e.target.closest('.sit-card[data-card-id]');
    if (!card) return;
    var t = e.touches ? e.touches[0] : e;
    var startX = t.clientX;
    var startY = t.clientY;
    longPressCard = card;
    longPressPos = { x: startX, y: startY };

    longPressTimer = setTimeout(function() {
      enterCardEdit();
      // 편집 모드 진입 직후 — 롱프레스한 카드를 즉시 드래그 상태로 전환
      if (longPressCard) {
        var rect = longPressCard.getBoundingClientRect();
        var grid = longPressCard.closest('.situation-grid');
        drag = {
          card: longPressCard,
          grid: grid,
          clone: null,
          offsetX: longPressPos.x - rect.left,
          offsetY: longPressPos.y - rect.top,
          startX: longPressPos.x,
          startY: longPressPos.y,
          moved: false
        };
      }
    }, 600);

    // 움직이면 취소
    var cancel = function(ev) {
      var p = ev.touches ? (ev.touches[0] || ev.changedTouches[0]) : ev;
      if (Math.abs(p.clientX - startX) > 8 || Math.abs(p.clientY - startY) > 8) {
        clearTimeout(longPressTimer);
        longPressCard = null;
        longPressPos = null;
        document.removeEventListener('touchmove', cancel);
        document.removeEventListener('mousemove', cancel);
      }
    };
    document.addEventListener('touchmove', cancel, { passive: true });
    document.addEventListener('mousemove', cancel);
    var up = function() {
      clearTimeout(longPressTimer);
      longPressCard = null;
      longPressPos = null;
      document.removeEventListener('touchmove', cancel);
      document.removeEventListener('mousemove', cancel);
      document.removeEventListener('touchend', up);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('touchend', up, { once: true });
    document.addEventListener('mouseup', up, { once: true });
  }

  /* ── 가장 가까운 삽입 위치 계산 (2열 그리드 대응) ── */
  function findClosestInsertPos(grid, card, cx, cy) {
    var siblings = [];
    var children = grid.querySelectorAll('.sit-card[data-card-id]');
    for (var i = 0; i < children.length; i++) {
      if (children[i] !== card) siblings.push(children[i]);
    }
    if (siblings.length === 0) return null;

    var best = null;
    var bestDist = Infinity;
    for (var j = 0; j < siblings.length; j++) {
      var r = siblings[j].getBoundingClientRect();
      var midX = r.left + r.width / 2;
      var midY = r.top + r.height / 2;
      var dist = Math.sqrt((cx - midX) * (cx - midX) + (cy - midY) * (cy - midY));
      if (dist < bestDist) {
        bestDist = dist;
        best = siblings[j];
      }
    }

    if (!best) return null;

    // 드래그 포인터가 가장 가까운 카드의 중심보다 위에 있으면 앞에, 아래면 뒤에 삽입
    var br = best.getBoundingClientRect();
    var beforeTarget = cy < br.top + br.height / 2;
    return { target: best, before: beforeTarget };
  }

  /* ── 드래그 시작 ── */
  function onDragStart(e) {
    if (!editMode) return;
    var card = e.target.closest('.sit-card[data-card-id]');
    if (!card) return;

    var touch = e.touches ? e.touches[0] : e;
    var rect = card.getBoundingClientRect();
    var grid = card.closest('.situation-grid');

    drag = {
      card: card,
      grid: grid,
      clone: null,
      offsetX: touch.clientX - rect.left,
      offsetY: touch.clientY - rect.top,
      startX: touch.clientX,
      startY: touch.clientY,
      moved: false
    };

    // 편집 모드에서 카드 클릭 및 텍스트 선택 차단
    e.preventDefault();
  }

  /* ── 드래그 이동 ── */
  function onDragMove(e) {
    if (!drag) return;
    var touch = e.touches ? e.touches[0] : e;
    var dx = Math.abs(touch.clientX - drag.startX);
    var dy = Math.abs(touch.clientY - drag.startY);

    if (!drag.moved) {
      if (dx < 4 && dy < 4) return;
      drag.moved = true;
      // 고스트 생성
      var rect = drag.card.getBoundingClientRect();
      drag.clone = drag.card.cloneNode(true);
      drag.clone.className = 'sit-card drag-ghost';
      drag.clone.style.width = rect.width + 'px';
      drag.clone.style.height = rect.height + 'px';
      drag.clone.style.left = rect.left + 'px';
      drag.clone.style.top = rect.top + 'px';
      document.body.appendChild(drag.clone);
      drag.card.classList.add('dragging');
    }

    e.preventDefault();
    drag.clone.style.left = (touch.clientX - drag.offsetX) + 'px';
    drag.clone.style.top = (touch.clientY - drag.offsetY) + 'px';

    // 2열 그리드 대응: 가장 가까운 카드 기준으로 삽입
    var pos = findClosestInsertPos(drag.grid, drag.card, touch.clientX, touch.clientY);
    if (pos) {
      if (pos.before) {
        drag.grid.insertBefore(drag.card, pos.target);
      } else {
        // target 다음에 삽입
        if (pos.target.nextSibling) {
          drag.grid.insertBefore(drag.card, pos.target.nextSibling);
        } else {
          drag.grid.appendChild(drag.card);
        }
      }
    }
  }

  /* ── 드래그 종료 ── */
  function onDragEnd() {
    if (!drag) return;
    if (drag.clone) drag.clone.remove();
    drag.card.classList.remove('dragging');
    drag = null;
    saveOrder();
  }

  /* ── 이벤트 바인딩 ── */
  // 롱프레스
  document.addEventListener('touchstart', onPointerDown, { passive: true });
  document.addEventListener('mousedown', onPointerDown);

  // 드래그 (편집 모드 전용)
  document.addEventListener('touchstart', function(e) {
    if (editMode) onDragStart(e);
  }, { passive: false });
  document.addEventListener('touchmove', onDragMove, { passive: false });
  document.addEventListener('touchend', onDragEnd);
  document.addEventListener('mousedown', function(e) {
    if (editMode) {
      onDragStart(e);
    }
  });
  document.addEventListener('mousemove', function(e) {
    if (drag) e.preventDefault();
    onDragMove(e);
  });
  document.addEventListener('mouseup', onDragEnd);

  // 편집 모드: 카드 클릭 차단 + 카드 외 영역 클릭 시 종료
  document.addEventListener('click', function(e) {
    if (!editMode) return;
    // 진입 직후 500ms 이내 click은 무시 (롱프레스 → mouseup → click 연쇄 방지)
    if (Date.now() - editModeAt < 500) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // 완료 버튼은 onclick으로 처리되므로 통과
    if (e.target.closest('.card-edit-done')) return;
    // 편집바 내부 클릭 → 무시
    if (e.target.closest('.card-edit-bar')) return;
    // 카드 위 클릭 → 차단 (드래그용)
    if (e.target.closest('.sit-card[data-card-id]')) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // 카드·편집바 외 영역 클릭 → 편집 종료
    exitCardEdit();
  }, true);

  // Escape 키로 편집 종료
  document.addEventListener('keydown', function(e) {
    if (editMode && e.key === 'Escape') {
      exitCardEdit();
    }
  });

  /* ── 초기 로드 ── */
  loadOrder();
})();

/* ── 감정 체크인 (메인 화면) ── */
function selectMood(mood) {
  // 저장
  var entry = {
    date: new Date().toISOString().split('T')[0],
    mood: mood,
    memo: '',
    timestamp: Date.now()
  };
  var MOOD_KEY = 'beinside_mood_v1';
  var all;
  try { all = JSON.parse(localStorage.getItem(MOOD_KEY) || '[]'); } catch(e) { all = []; }
  var filtered = all.filter(function(e) { return e.date !== entry.date; });
  filtered.push(entry);
  var cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000;
  var trimmed = filtered.filter(function(e) { return e.timestamp > cutoff; });
  localStorage.setItem(MOOD_KEY, JSON.stringify(trimmed));

  // 버튼 표시 + ripple 효과
  document.querySelectorAll('#mood-section .mood-btn').forEach(function(b) { b.classList.remove('selected'); });
  var btn = document.querySelector('#mood-section .mood-btn[data-mood="' + mood + '"]');
  if (btn) {
    btn.classList.add('selected');
    btn.classList.add('mood-ripple');
    setTimeout(function() { btn.classList.remove('mood-ripple'); }, 400);
  }

  // 무드 섹션 배경 색상 전환
  var section = document.getElementById('mood-section');
  if (section) {
    section.setAttribute('data-mood', mood);
  }

  // 결과 메시지 (5단계)
  var res = document.getElementById('mood-result');
  if (!res) return;
  var msgs = {
    great:    { text: '좋은 날이네요! ☀️', sub: '' },
    okay:     { text: '오늘도 잘 버텨냈어요. 🌿', sub: '' },
    soso:     { text: '그런 날도 있는 거예요.', sub: '억지로 괜찮을 필요 없어요. 잠깐 멈춰도 돼요.' },
    hard:     { text: '버티는 것도 대단한 거예요.', sub: '깊게 숨 한 번 쉬어보세요. 아래 마음 가이드도 있어요.' },
    veryhard: { text: '혼자 감당하지 않아도 돼요.', sub: '지금 바로 <a href="tel:109" style="color:var(--peach-d);font-weight:700">109</a> (자살예방상담, 무료·24시간)에 전화하거나, 아래 마음 가이드를 확인해 보세요.' }
  };
  var m = msgs[mood];
  res.style.display = 'block';
  res.innerHTML = '<strong>' + m.text + '</strong>' + (m.sub ? '<br><span style="font-weight:400;font-size:13px;">' + m.sub + '</span>' : '');
}

/* ── 신규 페이지 초기화 스텁 (각 파일에서 구현) ── */
function initEmotionPage() {
  const el = document.getElementById('emotion-content');
  if (el && typeof renderEmotionPage === 'function') renderEmotionPage(el);
}
function initBurnoutPage() {
  const el = document.getElementById('burnout-content');
  if (el && typeof renderBurnoutPage === 'function') renderBurnoutPage(el);
}
function initRelationPage() {
  const el = document.getElementById('relation-content');
  if (el && typeof renderRelationPage === 'function') renderRelationPage(el);
}
function initTransitionPage() {
  const el = document.getElementById('transition-content');
  if (el && typeof renderTransitionPage === 'function') renderTransitionPage(el);
}
function initWorkplacePage() {
  const el = document.getElementById('workplace-content');
  if (el && typeof renderWorkplacePage === 'function') renderWorkplacePage(el);
}
function initSleepPage() {
  const el = document.getElementById('sleep-content');
  if (el && typeof renderSleepPage === 'function') renderSleepPage(el);
}
function initElderPage() {
  const el = document.getElementById('elder-content');
  if (el && typeof renderElderPage === 'function') renderElderPage(el);
}
function initPostpartumPage() {
  const el = document.getElementById('postpartum-content');
  if (el && typeof renderPostpartumPage === 'function') renderPostpartumPage(el);
}
function initMenopausePage() {
  const el = document.getElementById('menopause-content');
  if (el && typeof renderMenopausePage === 'function') renderMenopausePage(el);
}
function initJournalPage() {
  if (typeof renderJournalPage === 'function') renderJournalPage();
}
function initMulticulturalPage() {
  const el = document.getElementById('multicultural-content');
  if (el && typeof renderMulticulturalPage === 'function') renderMulticulturalPage(el);
}

/* ── 체크 아이템 토글 ── */
function toggleCheckItem(el) {
  el.classList.toggle('checked');
  el.style.transform = 'scale(1.02)';
  setTimeout(() => { el.style.transform = ''; }, 150);
  const box = el.querySelector('.check-box');
  if (box) box.textContent = el.classList.contains('checked') ? '✓' : '';
}

/* ── 액션 아이템 토글 ── */
function toggleAction(el) {
  el.classList.toggle('done');
  el.style.transform = 'scale(1.02)';
  setTimeout(() => { el.style.transform = ''; }, 150);
  const check = el.querySelector('.action-check');
  if (check) check.textContent = el.classList.contains('done') ? '✓' : '';
}

/* ── 아코디언 토글 ── */
function toggleAccordion(el) {
  const item = el.closest('.accordion-item');
  if (!item) return;
  const header = item.querySelector('.accordion-header');
  const body = item.querySelector('.accordion-body');
  const isOpen = item.classList.contains('open');
  // 같은 그룹 내 모두 닫기
  const group = item.closest('.accordion-group');
  if (group) {
    group.querySelectorAll('.accordion-item.open').forEach(i => {
      i.classList.remove('open');
      const h = i.querySelector('.accordion-header');
      if (h) h.setAttribute('aria-expanded', 'false');
      const b = i.querySelector('.accordion-body');
      if (b) b.style.maxHeight = '0';
    });
  }
  if (!isOpen) {
    item.classList.add('open');
    if (header) header.setAttribute('aria-expanded', 'true');
    const inner = body.querySelector('.accordion-body-inner');
    body.style.maxHeight = (inner ? inner.scrollHeight + 32 : 400) + 'px';
    setTimeout(() => {
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 200);
  }
}

/* ── 아코디언 키보드 지원 ── */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    const el = e.target;
    if (el.classList && el.classList.contains('accordion-header')) {
      e.preventDefault();
      toggleAccordion(el);
    }
  }
});

/* ══════════════════════════════════════════════════════
   가이드 파인더 ("잘 모르겠어요")
══════════════════════════════════════════════════════ */
let _gfAnswers = {};

function openGuideFinder() {
  _gfAnswers = {};
  document.getElementById('gf-overlay').classList.add('on');
  document.body.style.overflow = 'hidden';
  // reset steps
  document.querySelectorAll('.gf-step').forEach(s => s.classList.remove('on'));
  document.getElementById('gf-step-1').classList.add('on');
  document.querySelectorAll('.gf-dot').forEach(d => d.classList.remove('on'));
  document.getElementById('gf-dot-1').classList.add('on');
  document.getElementById('gf-result').classList.remove('on');
  document.getElementById('gf-result').style.display = 'none';
}

function closeGuideFinder() {
  document.getElementById('gf-overlay').classList.remove('on');
  document.body.style.overflow = '';
}

function gfAnswer(step, value) {
  _gfAnswers[step] = value;

  if (step < 3) {
    // next step
    document.getElementById('gf-step-' + step).classList.remove('on');
    document.getElementById('gf-step-' + (step + 1)).classList.add('on');
    document.getElementById('gf-dot-' + step).classList.remove('on');
    document.getElementById('gf-dot-' + (step + 1)).classList.add('on');
  } else {
    // show result
    document.querySelectorAll('.gf-step').forEach(s => s.classList.remove('on'));
    document.querySelectorAll('.gf-dot').forEach(d => d.classList.add('on'));
    showGuideFinderResult();
  }
}

function showGuideFinderResult() {
  const a = _gfAnswers;
  const resultEl = document.getElementById('gf-result');

  // Rule-based matching
  const guides = getRecommendedGuides(a[1], a[2], a[3]);

  let msg = '';
  if (a[3] === 'cant') {
    msg = '지금 많이 힘드신 상태예요. 아래 가이드가 도움이 될 수 있어요.<br>혼자 감당하기 어렵다면 전문가 상담도 좋은 선택이에요.';
  } else if (a[2] === 'months' || a[2] === 'notsure') {
    msg = '오래 참아오셨군요. 아래 가이드를 천천히 살펴보세요.';
  } else {
    msg = '이런 가이드가 도움이 될 수 있어요.';
  }

  const cardsHTML = guides.map(g =>
    `<div class="gf-card" onclick="closeGuideFinder();showPage('${g.page}');setMTab('${g.tab}')">
      <div class="gf-card-icon">${g.icon}</div>
      <div class="gf-card-body">
        <div class="gf-card-title">${g.title}</div>
        <div class="gf-card-sub">${g.sub}</div>
      </div>
      <div style="color:var(--ink-l);font-size:14px;flex-shrink:0;">→</div>
    </div>`
  ).join('');

  // Emergency notice for severe cases
  let emergencyHTML = '';
  if (a[3] === 'cant') {
    emergencyHTML = `
      <div style="margin-top:16px;padding:16px 18px;background:var(--emer-bg);border:1px solid var(--emer-border);border-radius:14px;">
        <div style="font-size:13px;font-weight:700;color:var(--result-high-ink);margin-bottom:6px;">지금 바로 이야기를 나눌 수 있어요</div>
        <a href="tel:109" style="display:flex;align-items:center;gap:8px;color:var(--result-high-ink);font-size:14px;font-weight:700;text-decoration:none;margin-top:8px;">
          📞 109 자살예방상담전화 (무료·24시간)
        </a>
        <a href="tel:1577-0199" style="display:flex;align-items:center;gap:8px;color:var(--result-high-ink);font-size:14px;font-weight:700;text-decoration:none;margin-top:6px;">
          📞 1577-0199 정신건강위기상담 (무료·24시간)
        </a>
      </div>`;
  }

  resultEl.innerHTML = `
    <div class="gf-result-msg">${msg}</div>
    <div class="gf-result-cards">${cardsHTML}</div>
    ${emergencyHTML}
    <div style="font-size:11px;color:var(--ink-l);text-align:center;margin-bottom:16px;line-height:1.6;">
      이 결과는 참고용이며 의학적 진단이 아닙니다.
    </div>
    <button class="gf-close" onclick="closeGuideFinder()">닫기</button>
  `;
  resultEl.style.display = 'block';
  resultEl.classList.add('on');
}

function getRecommendedGuides(topic, duration, daily) {
  const all = {
    emotion:     { page: 'emotion',    tab: 'mind', icon: '🌊', title: '감정 돌봄 가이드',       sub: '감정을 알아차리고 다루는 방법' },
    burnout:     { page: 'burnout',    tab: 'mind', icon: '🫠', title: '번아웃 가이드',          sub: '에너지 고갈에서 회복하기' },
    relation:    { page: 'relation',   tab: 'mind', icon: '💔', title: '관계 회복 가이드',        sub: '이별·이혼·단절 후 감정 정리' },
    transition:  { page: 'transition', tab: 'mind', icon: '🌀', title: '인생 전환기 가이드',      sub: '삶의 방향이 흔들릴 때' },
    workplace:   { page: 'workplace',  tab: 'mind', icon: '🏢', title: '직장 내 어려운 사람 대처', sub: '나르시시스트·가스라이터 대처법' },
    growth:      { page: 'growth',     tab: 'growth', icon: '🌱', title: '아이 성장 가이드',      sub: '연령별 발달 기준과 체크리스트' },
    sp:          { page: 'sp',         tab: 'home',  icon: '🫂', title: '한부모 양육 가이드',     sub: '혼자 아이를 키우는 분들을 위해' },
    elder:       { page: 'elder',      tab: 'home',  icon: '🍵', title: '부모님 돌봄 가이드',     sub: '간병 번아웃, 치매 돌봄, 복지 연결' },
    grief:       { page: 'grief',      tab: 'home',  icon: '🕊️', title: '사별·상실 가이드',    sub: '소중한 사람을 떠나보냈을 때' },
    sleep:       { page: 'sleep',      tab: 'mind',  icon: '🛏️', title: '수면 가이드',           sub: '불면, 악몽, 과수면 대처법' },
    postpartum:  { page: 'postpartum', tab: 'mind', icon: '🌸', title: '산후우울증 가이드',     sub: '출산 후 마음이 이상할 때' },
    menopause:   { page: 'menopause',  tab: 'mind', icon: '🍂', title: '갱년기 우울증 가이드',   sub: '몸도 마음도 변하고 있을 때' },
    emergency:   { page: 'emergency',  tab: 'emergency', icon: '🚨', title: '긴급 도움',        sub: '지금 당장 도움이 필요할 때' }
  };

  let picks = [];

  // Topic-based primary recommendation
  switch (topic) {
    case 'emotion':
      picks.push(all.emotion);
      if (duration === 'months' || daily === 'cant') picks.push(all.postpartum);
      else picks.push(all.sleep);
      picks.push(all.menopause);
      break;
    case 'relation':
      picks.push(all.relation);
      picks.push(all.grief);
      picks.push(all.emotion);
      break;
    case 'work':
      picks.push(all.workplace);
      picks.push(all.burnout);
      break;
    case 'care':
      picks.push(all.elder);
      picks.push(all.burnout);
      if (daily === 'cant') picks.push(all.sp);
      break;
    case 'life':
      picks.push(all.transition);
      picks.push(all.emotion);
      break;
    case 'unknown':
    default:
      // If they truly don't know, recommend based on severity
      if (daily === 'cant') {
        picks.push(all.emotion);
        picks.push(all.emergency);
      } else if (duration === 'months' || duration === 'notsure') {
        picks.push(all.burnout);
        picks.push(all.emotion);
        picks.push(all.transition);
      } else {
        picks.push(all.emotion);
        picks.push(all.burnout);
        picks.push(all.relation);
      }
      break;
  }

  // Severity-based additions
  if (daily === 'cant' && !picks.find(p => p.page === 'emergency')) {
    picks.unshift(all.emergency);
  }

  // Limit to 3 recommendations
  return picks.slice(0, 3);
}

/* ══════════════════════════════════════════════════════
   헤더 메뉴 + 설정 패널
══════════════════════════════════════════════════════ */

/* ── 헤더 드롭다운 메뉴 ── */
function toggleHeaderMenu() {
  const menu = document.getElementById('hdr-menu');
  const overlay = document.getElementById('hdr-menu-overlay');
  const isOpen = menu.classList.contains('on');
  if (isOpen) {
    closeHeaderMenu();
  } else {
    menu.classList.add('on');
    overlay.classList.add('on');
  }
}

function closeHeaderMenu() {
  document.getElementById('hdr-menu').classList.remove('on');
  document.getElementById('hdr-menu-overlay').classList.remove('on');
}

/* ── 설정 패널 ── */
function openSettings() {
  const overlay = document.getElementById('settings-overlay');
  const panel = document.getElementById('settings-panel');
  overlay.classList.add('on');
  panel.style.display = 'block';
  // 다음 프레임에서 transition 트리거
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      panel.classList.add('on');
    });
  });
  document.body.style.overflow = 'hidden';
  updateThemeToggleUI();
}

function closeSettings() {
  const panel = document.getElementById('settings-panel');
  document.getElementById('settings-overlay').classList.remove('on');
  panel.classList.remove('on');
  panel.style.display = 'none';
  panel.style.animation = '';
  document.body.style.overflow = '';
}

/* ── 테마 (라이트/시스템/다크) ── */
const THEME_KEY = 'beinside_theme';
const THEME_LABELS = { light: '라이트', system: '시스템', dark: '다크' };
const THEME_ICONS = { light: '☀️', system: '🔄', dark: '🌙' };

function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'system';
}

function setTheme(mode) {
  if (mode === 'system') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', mode);
  }
  localStorage.setItem(THEME_KEY, mode);
  updateThemeToggleUI();
  // theme-color 메타 업데이트
  var tc = document.querySelector('meta[name="theme-color"]');
  if (tc) {
    var isDark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    tc.setAttribute('content', isDark ? '#1C1614' : '#D4795E');
  }
}

function cycleTheme() {
  var order = ['light', 'system', 'dark'];
  var idx = order.indexOf(getTheme());
  setTheme(order[(idx + 1) % 3]);
}

function updateThemeToggleUI() {
  var mode = getTheme();
  var label = document.getElementById('theme-toggle-label');
  if (label) label.textContent = THEME_LABELS[mode] || '시스템';
  var icon = document.getElementById('theme-toggle-icon');
  if (icon) icon.textContent = THEME_ICONS[mode] || '🔄';
  // 3단 토글 버튼 활성화
  document.querySelectorAll('.theme-mode-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
  });
}

// 시스템 테마 변경 감지
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
    if (getTheme() === 'system') {
      // system 모드일 때 토글 UI만 갱신 (CSS가 자동 대응)
      updateThemeToggleUI();
    }
  });
}

// 초기 테마 적용 — "flash of wrong theme" 방지
(function initTheme() {
  var saved = getTheme();
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  // 'system'이면 data-theme 없음 → CSS prefers-color-scheme이 처리
  // DOM 준비 후 토글 UI 갱신
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateThemeToggleUI);
  } else {
    updateThemeToggleUI();
  }
})();

/* ══════════════════════════════════════════════════════
   SEO: 페이지별 동적 메타태그 + URL 라우팅
══════════════════════════════════════════════════════ */
const PAGE_META = {
  home:       { title: 'BeInside — 육아·정신건강·감정 돌봄 가이드', desc: '육아, 정신건강, 감정 돌봄, 한부모 가이드, 청소년 상담 — 판단 없이, 당신 편에서 안내합니다. 24시간 긴급상담 연결.', keywords: '육아 가이드, 아이 발달, 산후우울증, 정신건강, 번아웃, 한부모, 청소년 상담, 감정 돌봄, 긴급상담, BeInside' },
  growth:     { title: '아이 성장 가이드 — BeInside', desc: '연령별 발달 기준과 체크리스트. 우리 아이 성장이 불안할 때, 근거 기반 가이드를 제공합니다.', keywords: '아이 성장, 발달 기준, 영유아 발달, 성장 체크리스트, 아이 발달 단계, 소아과' },
  sp:         { title: '한부모 양육 가이드 — BeInside', desc: '혼자 아이를 키우는 분들을 위한 상황별 맞춤 가이드. 정서·경제·법률 지원 정보.', keywords: '한부모 가정, 한부모 지원, 양육비, 한부모 복지, 홀로 육아' },
  birth:      { title: '출산 후 회복 가이드 — BeInside', desc: '산후 몸과 마음 돌봄. 산후우울증 자가진단, 회복 로드맵, 지원 제도 안내.', keywords: '산후 회복, 출산 후 회복, 산후조리, 산후우울증, 산후 몸 돌봄' },
  dad:        { title: '아빠 육아 가이드 — BeInside', desc: '서툴러도 괜찮아요. 연령별 아빠 맞춤 육아 가이드와 마음 돌봄.', keywords: '아빠 육아, 아빠 역할, 육아 초보 아빠, 아빠 산후우울증' },
  elder:      { title: '부모님 돌봄 가이드 — BeInside', desc: '간병 번아웃, 치매 돌봄, 학대 예방, 복지 연결. 돌보는 당신도 돌봄이 필요해요.', keywords: '노인 돌봄, 간병 번아웃, 치매 돌봄, 노인 복지, 간병인 우울증' },
  grief:      { title: '사별·상실 가이드 — BeInside', desc: '소중한 사람을 떠나보낸 당신에게. 부모, 자녀, 배우자, 친구, 반려동물 상실의 애도 가이드.', keywords: '사별, 상실, 애도, 부모 사별, 유산, 반려동물 사별, 사별 상담' },
  emotion:    { title: '감정 돌봄 가이드 — BeInside', desc: '슬픔, 불안, 분노, 무감각, 외로움. 감정을 알아차리고 다루는 정신의학적 방법.', keywords: '감정 조절, 감정 돌봄, 슬픔, 불안 극복, 분노 조절, 정서 관리' },
  burnout:    { title: '번아웃 자가진단과 회복 가이드 — BeInside', desc: '번아웃 자가진단과 단계별 회복 로드맵. 에너지 고갈에서 빠져나오는 방법.', keywords: '번아웃, 번아웃 자가진단, 번아웃 회복, 직장 스트레스, 소진 증후군' },
  relation:   { title: '관계 회복 가이드 — BeInside', desc: '이혼, 가족 단절, 이별 후 감정 정리와 회복. 관계가 무너졌을 때의 심리학적 가이드.', keywords: '이별, 이혼, 관계 회복, 관계 끊기, 감정 정리, 관계 상담' },
  transition: { title: '인생 전환기 가이드 — BeInside', desc: '실직, 사업 실패, 진로 고민, 새 환경 적응. 삶의 방향이 흔들릴 때.', keywords: '인생 전환기, 실직, 이직, 진로 고민, 삶의 방향, 중년 위기' },
  workplace:  { title: '직장 내 어려운 사람 대처법 — BeInside', desc: '나르시시스트, 가스라이터, 마이크로매니저. 정신분석학 관점의 이해와 실전 대처법.', keywords: '직장 스트레스, 나르시시스트, 가스라이팅, 직장 내 괴롭힘, 직장 갈등' },
  teen:       { title: '청소년·청년 마음 가이드 — BeInside', desc: '나 혼자 버텨왔어. 판단 없이, 네 편에서 이야기합니다.', keywords: '청소년 상담, 청소년 우울, 청년 고민, 학교 스트레스, 1388' },
  sleep:      { title: '수면 가이드 — BeInside', desc: '불면, 악몽, 과수면. 잠을 못 자겠을 때, 수면 전문 자기 돌봄법.', keywords: '불면증, 수면 장애, 잠이 안 올 때, 수면 위생, 불면 자가진단' },
  postpartum: { title: '산후우울증 자가진단과 회복 가이드 — BeInside', desc: '출산 후 마음이 이상할 때. 산후우울증 자가진단, 호르몬 변화 이해, 회복 로드맵.', keywords: '산후우울증, 산후우울증 자가진단, 출산 후 우울, 산후 정신건강' },
  menopause:  { title: '갱년기 우울증 가이드 — BeInside', desc: '갱년기 호르몬 변화와 우울. 자가진단, 빈 둥지 증후군, 전문 치료 안내.', keywords: '갱년기, 갱년기 우울증, 호르몬 변화, 빈 둥지 증후군, 갱년기 치료' },
  emergency:  { title: '긴급 도움 — BeInside', desc: '24시간 긴급 상담 연결. 119, 112, 109 자살예방, 1388 청소년, 1366 여성긴급, 1577-0199 정신건강.', keywords: '긴급 상담, 자살예방 전화, 109, 1388, 1577-0199, 정신건강 위기' },
  journal:    { title: '감정 기록 — BeInside', desc: '오늘의 감정을 기록하고, 나를 돌아보는 시간.', keywords: '감정 기록, 감정 일기, 마음 일기, 무드 트래킹' },
  mental:        { title: '생애주기별 정신건강 가이드 — BeInside', desc: '영아기부터 노년기까지, 생애 단계별 정신건강 위험 신호와 돌봄법. 통계 기반 가이드.', keywords: '정신건강, 생애주기, 우울증, 산후우울증, 청소년 우울, 노인 우울, 정신건강 가이드' },
  multicultural: { title: '다문화 가정 가이드 — BeInside', desc: '다문화 가정을 위한 다국어(베트남어·중국어·영어) 양육·정신건강 가이드. 긴급상담 연결.', keywords: '다문화 가정, 다국어 가이드, 베트남어, 중국어, 이민자 가정, 외국인 육아, multicultural family' },
  adhd:          { title: 'ADHD 가이드 — BeInside', desc: '게으른 게 아니에요. 성인 ADHD 자가체크, 치료법, 직장·학업 관리 팁.', keywords: 'ADHD, 성인 ADHD, 집중력, 주의력결핍, ADHD 자가진단, ADHD 치료' },
  addiction:     { title: '중독 회복 가이드 — BeInside', desc: '스마트폰·게임·알코올·도박 중독 자가체크와 단계별 회복 가이드.', keywords: '중독, 스마트폰 중독, 게임 중독, 알코올 중독, 도박 중독, 중독 상담' },
  finance:       { title: '금융 스트레스 가이드 — BeInside', desc: '부채·파산·경제적 위기 속 정신건강 돌봄과 실제 지원 제도 안내.', keywords: '금융 스트레스, 부채, 파산, 경제적 위기, 신용회복, 서민금융' }
};

function updatePageMeta(id) {
  var meta = PAGE_META[id] || PAGE_META.home;
  document.title = meta.title;

  var descEl = document.querySelector('meta[name="description"]');
  if (descEl) descEl.setAttribute('content', meta.desc);

  var kwEl = document.querySelector('meta[name="keywords"]');
  if (kwEl && meta.keywords) kwEl.setAttribute('content', meta.keywords);

  var ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', meta.title);

  var ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', meta.desc);

  var ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', 'https://beinside.kr' + (id === 'home' ? '/' : '/' + id));

  var twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', meta.title);

  var twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', meta.desc);

  var canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', 'https://beinside.kr' + (id === 'home' ? '/' : '/' + id));
}

// History API 기반 라우팅 (SEO 강화)
(function initRouter() {
  function getTabForPage(page) {
    if (['emotion','burnout','relation','transition','workplace','sleep','postpartum','menopause'].indexOf(page) !== -1) return 'mind';
    if (page === 'journal') return 'journal';
    if (page === 'emergency') return 'emergency';
    if (page === 'growth' || page === 'dad') return 'growth';
    return 'home';
  }

  window.addEventListener('popstate', function() {
    var path = location.pathname.replace(/^\//, '');
    // 하위 호환: 기존 해시 URL 지원
    if (!path && location.hash) path = location.hash.replace('#/', '');
    if (path && ALL_PAGES.indexOf(path) !== -1) {
      showPage(path);
      setMTab(getTabForPage(path));
    } else {
      showPage('home');
      setMTab('home');
    }
  });

  // 페이지 로드 시 경로 확인
  var path = location.pathname.replace(/^\//, '');
  // 하위 호환: 기존 해시 URL도 처리
  if (!path && location.hash) path = location.hash.replace('#/', '');
  if (path && ALL_PAGES.indexOf(path) !== -1) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        showPage(path);
        setMTab(getTabForPage(path));
      });
    } else {
      setTimeout(function() {
        showPage(path);
        setMTab(getTabForPage(path));
      }, 100);
    }
  }
})();

/* ══════════════════════════════════════════
   P0: "더 보기" 카드 토글
══════════════════════════════════════════ */
function toggleMoreCards(section) {
  var cls = section === 'care' ? 'sit-card--more-care' : 'sit-card--more-self';
  var btn = document.getElementById('show-more-' + section);
  var cards = document.querySelectorAll('.' + cls);
  var isExpanded = btn.classList.toggle('expanded');
  cards.forEach(function(c) {
    c.style.display = isExpanded ? '' : 'none';
  });
  var moreText = (typeof I18n !== 'undefined') ? I18n.t(isExpanded ? 'common.less' : 'common.more') : (isExpanded ? '접기' : '더 보기');
  btn.querySelector('.show-more-text').textContent = moreText;
}

/* ══════════════════════════════════════════
   P3: 위기 후 팔로업 배너
══════════════════════════════════════════ */
function showFollowupBanner() {
  try {
    var visited = sessionStorage.getItem('beinside_crisis_visit');
    var dismissed = sessionStorage.getItem('beinside_followup_dismissed');
    var banner = document.getElementById('followup-banner');
    if (visited && !dismissed && banner) {
      banner.style.display = '';
      banner.style.animation = 'up .5s .3s cubic-bezier(.22,1,.36,1) both';
    }
  } catch(e) {}
}

function closeFollowup() {
  var banner = document.getElementById('followup-banner');
  if (banner) {
    banner.style.transition = 'opacity .3s, transform .3s';
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(-8px)';
    setTimeout(function() { banner.style.display = 'none'; }, 300);
  }
  try { sessionStorage.setItem('beinside_followup_dismissed', '1'); } catch(e) {}
}

/* ══════════════════════════════════════════
   P3: 스크린리더 알림
══════════════════════════════════════════ */
function announceToSR(msg) {
  var el = document.getElementById('sr-announce');
  if (el) {
    el.textContent = '';
    setTimeout(function() { el.textContent = msg; }, 100);
  }
}

/* ══════════════════════════════════════════
   i18n 초기화
══════════════════════════════════════════ */
(function initI18n() {
  if (typeof I18n === 'undefined') return;

  function run() {
    I18n.init(function () {
      // 언어 선택 드롭다운 동기화
      var sel = document.getElementById('i18n-select');
      if (sel) sel.value = I18n.getLocale();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
