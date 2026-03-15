/* ═══════════════════════════════════════════════════════════
   BeInside — 앱 메인 로직 & 네비게이션
═══════════════════════════════════════════════════════════ */

/* ── 현재 페이지 상태 ── */
let curSit  = 0;
let curPage = 'home'; // home | growth | sp | birth | mental | teen | emergency

const ALL_PAGES = ['growth', 'sp', 'birth', 'mental', 'teen', 'emergency'];

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
  const map = { normal: 'growth', sp: 'sp', birth: 'birth' };
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

/* ── 미니 툴킷 토글 ── */
function toggleToolkit(id) {
  const panel = document.getElementById(id);
  if (!panel) return;
  const isOpen = panel.classList.contains('on');
  // 다른 패널 닫기
  document.querySelectorAll('.toolkit-panel').forEach(p => {
    p.classList.remove('on');
    p.style.display = 'none';
  });
  document.querySelectorAll('.toolkit-btn').forEach(b => b.classList.remove('on'));
  if (!isOpen) {
    panel.classList.add('on');
    panel.style.display = 'block';
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
    const md2 = document.getElementById('medical-disclaimer');
    if (md2) md2.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
