/* ═══════════════════════════════════════════════════════════
   BeInside — 앱 메인 로직 & 네비게이션
═══════════════════════════════════════════════════════════ */

/* ── 현재 페이지 상태 ── */
let curSit  = 0;
let curPage = 'home'; // home | growth | sp | birth | mental | teen | emergency

const ALL_PAGES = ['growth', 'sp', 'birth', 'mental', 'teen', 'emergency', 'emotion', 'burnout', 'relation', 'transition', 'workplace', 'dad', 'elder', 'journal'];

/* ── 페이지 전환 ── */
function showPage(id) {
  curPage = id;
  const hero = document.getElementById('hero');

  if (id === 'home') {
    if (hero) hero.style.display = '';
    ALL_PAGES.forEach(p => {
      const el = document.getElementById('page-' + p);
      if (el) el.style.display = 'none';
    });
  } else {
    if (hero) hero.style.display = 'none';
    ALL_PAGES.forEach(p => {
      const el = document.getElementById('page-' + p);
      if (el) el.style.display = (p === id) ? '' : 'none';
    });
    // 페이지 특수 초기화
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
    if (id === 'journal') initJournalPage();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── 홈으로 ── */
function goHome() {
  showPage('home');
  setMTab('home');
}

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
      action = '지금 바로 <a href="tel:1393" style="color:inherit;font-weight:700">1393</a>(무료·24시간)에 전화하거나, 가까운 정신건강복지센터·산부인과를 방문해 주세요.';
    } else if (score >= 7) {
      cls = 'res-high';
      msg = '💜 산후우울 증상이 상당히 나타나고 있어요.';
      action = '보건소·산부인과에서 에든버러 산후우울증 척도(EPDS) 무료 검사를 받아보세요. 1393으로 상담 연결도 가능해요.';
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
    closeSourceDrawer();
    closeModal();
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
    document.body.classList.add('card-edit-mode');
    // 햅틱 피드백 (지원 시)
    if (navigator.vibrate) navigator.vibrate(30);
  };

  window.exitCardEdit = function() {
    if (!editMode) return;
    editMode = false;
    document.body.classList.remove('card-edit-mode');
    saveOrder();
  };

  /* ── 롱프레스 감지 ── */
  function onPointerDown(e) {
    if (editMode) return;
    const card = e.target.closest('.sit-card[data-card-id]');
    if (!card) return;
    const startX = e.clientX || (e.touches && e.touches[0].clientX);
    const startY = e.clientY || (e.touches && e.touches[0].clientY);
    longPressTimer = setTimeout(() => { enterCardEdit(); }, 600);
    // 움직이면 취소
    const cancel = (ev) => {
      const cx = ev.clientX || (ev.touches && ev.touches[0] && ev.touches[0].clientX) || 0;
      const cy = ev.clientY || (ev.touches && ev.touches[0] && ev.touches[0].clientY) || 0;
      if (Math.abs(cx - startX) > 8 || Math.abs(cy - startY) > 8) {
        clearTimeout(longPressTimer);
        document.removeEventListener('touchmove', cancel);
        document.removeEventListener('mousemove', cancel);
      }
    };
    document.addEventListener('touchmove', cancel, { passive: true });
    document.addEventListener('mousemove', cancel);
    const up = () => {
      clearTimeout(longPressTimer);
      document.removeEventListener('touchmove', cancel);
      document.removeEventListener('mousemove', cancel);
      document.removeEventListener('touchend', up);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('touchend', up, { once: true });
    document.addEventListener('mouseup', up, { once: true });
  }

  /* ── 드래그 시작 ── */
  function onDragStart(e) {
    if (!editMode) return;
    const card = e.target.closest('.sit-card[data-card-id]');
    if (!card) return;

    const touch = e.touches ? e.touches[0] : e;
    const rect = card.getBoundingClientRect();
    const grid = card.closest('.situation-grid');

    drag = {
      card, grid,
      clone: null,
      offsetX: touch.clientX - rect.left,
      offsetY: touch.clientY - rect.top,
      startX: touch.clientX,
      startY: touch.clientY,
      moved: false
    };

    // 편집 모드에서 카드 클릭 차단
    e.preventDefault();
  }

  /* ── 드래그 이동 ── */
  function onDragMove(e) {
    if (!drag) return;
    const touch = e.touches ? e.touches[0] : e;
    const dx = Math.abs(touch.clientX - drag.startX);
    const dy = Math.abs(touch.clientY - drag.startY);

    if (!drag.moved) {
      if (dx < 4 && dy < 4) return;
      drag.moved = true;
      // 고스트 생성
      const rect = drag.card.getBoundingClientRect();
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

    // 삽입 위치 계산
    const siblings = [...drag.grid.querySelectorAll('.sit-card[data-card-id]:not(.dragging)')];
    let inserted = false;
    for (const sib of siblings) {
      const r = sib.getBoundingClientRect();
      if (touch.clientY < r.top + r.height / 2) {
        drag.grid.insertBefore(drag.card, sib);
        inserted = true;
        break;
      }
    }
    if (!inserted && siblings.length > 0) {
      siblings[siblings.length - 1].after(drag.card);
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
    if (editMode) onDragStart(e);
  });
  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('mouseup', onDragEnd);

  // 편집 모드: 카드 클릭 차단 + 카드 외 영역 클릭 시 종료
  document.addEventListener('click', function(e) {
    if (!editMode) return;
    // 완료 버튼은 onclick으로 처리되므로 통과
    if (e.target.closest('.card-edit-done')) return;
    // 카드 위 클릭 → 차단 (드래그용)
    if (e.target.closest('.sit-card[data-card-id]')) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // 카드·편집바 외 영역 클릭 → 편집 종료
    if (!e.target.closest('.card-edit-bar')) {
      exitCardEdit();
    }
  }, true);

  /* ── 초기 로드 ── */
  loadOrder();
})();

/* ── 감정 체크인 (메인 화면) ── */
function selectMood(mood) {
  // 저장
  const entry = {
    date: new Date().toISOString().split('T')[0],
    mood: mood,
    memo: '',
    timestamp: Date.now()
  };
  const MOOD_KEY = 'beinside_mood_v1';
  const all = JSON.parse(localStorage.getItem(MOOD_KEY) || '[]');
  // 오늘 날짜 중복 제거
  const filtered = all.filter(e => e.date !== entry.date);
  filtered.push(entry);
  // 90일 초과분 삭제
  const cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000;
  const trimmed = filtered.filter(e => e.timestamp > cutoff);
  localStorage.setItem(MOOD_KEY, JSON.stringify(trimmed));

  // 버튼 표시
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
  const btn = document.querySelector(`.mood-btn[onclick*="${mood}"]`);
  if (btn) btn.classList.add('selected');

  // 결과 메시지
  const res = document.getElementById('mood-result');
  if (!res) return;
  const msgs = {
    okay:    { text: '오늘도 잘 버텨냈어요. 🌿', sub: '' },
    holding: { text: '버티는 것도 대단한 거예요.', sub: '잠깐 쉬어도 돼요. 깊게 숨 한번 쉬어보세요.' },
    hard:    { text: '혼자 감당하지 않아도 돼요.', sub: '지금 바로 <a href="tel:1393" style="color:var(--peach-d);font-weight:700">1393</a> (자살예방상담, 무료·24시간)에 전화하거나, 아래 마음 가이드를 확인해 보세요.' }
  };
  const m = msgs[mood];
  res.style.display = 'block';
  res.innerHTML = `<strong>${m.text}</strong>${m.sub ? '<br><span style="font-weight:400;font-size:13px;">' + m.sub + '</span>' : ''}`;
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
function initElderPage() {
  const el = document.getElementById('elder-content');
  if (el && typeof renderElderPage === 'function') renderElderPage(el);
}
function initJournalPage() {
  if (typeof renderJournalPage === 'function') renderJournalPage();
}

/* ── 체크 아이템 토글 ── */
function toggleCheckItem(el) {
  el.classList.toggle('checked');
  const box = el.querySelector('.check-box');
  if (box) box.textContent = el.classList.contains('checked') ? '✓' : '';
}

/* ── 액션 아이템 토글 ── */
function toggleAction(el) {
  el.classList.toggle('done');
  const check = el.querySelector('.action-check');
  if (check) check.textContent = el.classList.contains('done') ? '✓' : '';
}

/* ── 아코디언 토글 ── */
function toggleAccordion(el) {
  const item = el.closest('.accordion-item');
  if (!item) return;
  const body = item.querySelector('.accordion-body');
  const isOpen = item.classList.contains('open');
  // 같은 그룹 내 모두 닫기
  const group = item.closest('.accordion-group');
  if (group) {
    group.querySelectorAll('.accordion-item.open').forEach(i => {
      i.classList.remove('open');
      const b = i.querySelector('.accordion-body');
      if (b) b.style.maxHeight = '0';
    });
  }
  if (!isOpen) {
    item.classList.add('open');
    const inner = body.querySelector('.accordion-body-inner');
    body.style.maxHeight = (inner ? inner.scrollHeight + 32 : 400) + 'px';
  }
}
