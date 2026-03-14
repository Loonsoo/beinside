/* ═══════════════════════════════════════════════════════════
   BeInside — 앱 메인 로직 & 네비게이션
═══════════════════════════════════════════════════════════ */

/* ── 상황 선택 ── */
let curSit  = 0;
let curView = 'normal';

function selectSit(n) {
  curSit = n;
  [0, 1, 2, 3].forEach(i => {
    const b = document.getElementById('sit' + i);
    if (b) b.classList.toggle('on', i === n);
  });
  renderSP(n);
}

/* ── 입력 모드 전환 (개월/세) ── */
let mode = 'm';

function setM(m) {
  mode = m;
  document.getElementById('bm').classList.toggle('on', m === 'm');
  document.getElementById('by').classList.toggle('on', m === 'y');
  document.getElementById('au').textContent  = m === 'm' ? '개월' : '세';
  document.getElementById('ai').max          = m === 'm' ? '36'   : '80';
  document.getElementById('hint').style.opacity = m === 'm' ? '1' : '0.3';
}

function getMonths() {
  const v = parseInt(document.getElementById('ai').value) || 0;
  return mode === 'm' ? v : v * 12;
}

/* ── 가이드 조회 ── */
function go() {
  const months = getMonths();
  if (months < 0) return;
  const d = getData(months);
  render(d, months);
  const r = document.getElementById('result');
  r.classList.add('on');
  const md = document.getElementById('medical-disclaimer');
  if (md) md.style.display = 'block';
  setTimeout(() => {
    const md2 = document.getElementById('medical-disclaimer');
    if (md2) md2.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 60);
}

/* ── 빠른 이동 ── */
function qs(v, m) {
  setM(m);
  document.getElementById('ai').value = v;
  go();
  setTimeout(() => document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
}

/* ── 홈으로 ── */
function goHome() {
  switchView('normal');
  const r = document.getElementById('result');
  if (r) { r.innerHTML = ''; r.classList.remove('on'); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── 뷰 전환 ── */
function switchView(v) {
  curView = v;
  document.getElementById('normal-view').style.display = v === 'normal' ? '' : 'none';
  document.getElementById('sp-view').style.display     = v === 'sp'     ? '' : 'none';
  document.getElementById('birth-view').style.display  = v === 'birth'  ? '' : 'none';
  document.getElementById('vb-normal').classList.toggle('on', v === 'normal');
  document.getElementById('vb-sp').classList.toggle('on',     v === 'sp');
  document.getElementById('vb-birth').classList.toggle('on',  v === 'birth');
  if (v === 'sp') renderSP(curSit);
  setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
}

/* ── 섹션 스크롤 ── */
function toS(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ── SOS 긴급 상담 ── */
function openSos() {
  alert('[24시간 긴급 도움망]\n\n- 자살예방상담전화: 1393\n- 청소년전화: 1388\n- 정신건강위기상담전화: 1577-0199\n- 아동학대신고: 112\n\n혼자 고민하지 마세요.\n전문 상담사가 24시간 곁에 있습니다.');
}

/* ── 모바일 탭 활성화 ── */
function setMTab(id) {
  document.querySelectorAll('.mtab').forEach(b => b.classList.remove('active'));
  const t = document.getElementById('mtab-' + id);
  if (t) t.classList.add('active');
}

/* ── 타임라인 초기화 ── */
(function initTimeline() {
  const tnc = document.getElementById('tln');
  if (!tnc) return;
  TL.forEach(s => {
    const nd = document.createElement('div');
    nd.className = 'tnode';
    nd.innerHTML = `<div class="tdot"></div><div class="tlbl">${s.l}<span class="sub">${s.s}</span></div>`;
    nd.onclick = () => {
      document.querySelectorAll('.tnode').forEach(n => n.classList.remove('on'));
      nd.classList.add('on');
      if (s.isM) { setM('m'); document.getElementById('ai').value = s.m; }
      else        { setM('y'); document.getElementById('ai').value = Math.floor(s.m / 12); }
      go();
      setTimeout(() => document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    };
    tnc.appendChild(nd);
  });
})();

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
