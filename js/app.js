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
