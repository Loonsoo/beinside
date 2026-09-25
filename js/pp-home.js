/* ═══════════════════════════════════════════════════════════
   BeInside — 산후 동반자 홈 ("혼자 돌보는 첫 12개월")
   - 아기가 태어난 날은 이 기기(localStorage)에만 저장한다.
   - 점수·진단 표현을 쓰지 않는다. 신호를 알리고 연결한다.
   - 번호는 js/helplines.js 에서만 가져온다.
═══════════════════════════════════════════════════════════ */

const PP_BIRTH_KEY = 'beinside_pp_birth_v1';

/* 출산 후 일수 구간별 3줄. 문구 수정 시 psychiatrist 검수를 받는다. */
const PP_STAGES = [
  { maxDay: 14, label: '출산 후 첫 2주', lines: [
    '눈물이 나고 기분이 자주 오르내리는 건 많은 산모가 겪어요(베이비 블루스). 보통 2주 안에 옅어져요. 다만 아기가 자도 전혀 잠들 수 없거나, 혼란스럽거나, 나나 아기를 해칠 것 같은 생각이 들면 블루스가 아니에요. 아래 "바로 연락해야 하는 신호"를 봐 주세요.',
    '아기가 잘 때 같이 자는 게 먼저예요. 집안일은 미뤄도 돼요.',
    '38℃ 이상 열이나 한 시간에 생리대를 하나 넘게 적시는 출혈이 있으면 바로 119에 전화하거나 응급실로 가세요.',
  ]},
  { maxDay: 42, label: '출산 후 3~6주', lines: [
    '우울한 기분이 2주 넘게 이어지면 베이비 블루스가 아니라 산후우울일 수 있어요. 아래 "마음 신호 확인"을 해 보세요.',
    '산후 검진 때 기분 이야기도 해도 돼요. 아빠나 다른 주양육자도 산후우울을 겪을 수 있어요.',
    '도와줄 사람이 없다면 보건소에 산모·신생아 방문 지원을 문의해 보세요.',
  ]},
  { maxDay: 90, label: '출산 후 6주~3개월', lines: [
    '몸은 회복돼도 피로는 쌓이는 때예요. 산후우울은 이 무렵에 시작되기도 해요.',
    '하루 10분이라도 밖에 나가거나, 다른 어른과 말하는 시간을 만들어 보세요.',
    '아기가 계속 울면 등을 대고 아기 침대에 눕히고 잠시 자리를 떠도 괜찮아요. 아무리 힘들어도 아기를 흔들지 마세요. 짧게 흔들어도 뇌를 다칠 수 있어요.',
  ]},
  { maxDay: 365, label: '출산 후 3~12개월', lines: [
    '출산 후 1년까지는 산후우울이 생길 수 있는 기간으로 봐요. 늦게 시작돼도 도움을 받을 수 있어요.',
    '복직, 수면 변화처럼 생활이 크게 바뀌는 때예요. 힘든 날이 2주 넘게 이어지면 1577-0199나 보건소에 문의해 보세요.',
    '월령별 아기 발달은 아래 "다른 상황 보기 → 아이 성장"에서 볼 수 있어요.',
  ]},
];

function ppReadBirth() {
  try { return localStorage.getItem(PP_BIRTH_KEY) || ''; } catch (e) { return ''; }
}
function ppWriteBirth(v) {
  try {
    if (v) localStorage.setItem(PP_BIRTH_KEY, v); else localStorage.removeItem(PP_BIRTH_KEY);
  } catch (e) {}
}

/* 로컬 날짜 기준 일수 (UTC 변환으로 하루 밀리는 문제 방지) */
function ppDaysSince(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number);
  const born = new Date(y, m - 1, d);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((today - born) / 86400000);
}

function ppTodayISO() {
  const n = new Date();
  return n.getFullYear() + '-' + String(n.getMonth() + 1).padStart(2, '0') + '-' + String(n.getDate()).padStart(2, '0');
}

function ppSmooth() {
  return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

/* 다시 그린 뒤 키보드 포커스를 카드 제목으로 옮긴다 */
function ppFocusTitle(el) {
  const t = el && el.querySelector('.pp-card-title');
  if (!t) return;
  t.tabIndex = -1;
  t.focus({ preventScroll: true });
}

function ppRenderAge(focus) {
  const el = document.getElementById('pp-age');
  if (!el) return;
  const birth = ppReadBirth();

  if (!birth) {
    el.innerHTML =
      '<h2 class="pp-card-title">아기가 태어난 날</h2>'
      + '<p class="pp-card-sub">알려 주시면 지금 시기에 맞는 이야기를 보여 드려요. 이 기기에만 저장되고, 몰라도 괜찮아요.</p>'
      + '<form class="pp-age-form" id="pp-age-form">'
      + '<label class="sr-only" for="pp-birth-input">아기가 태어난 날</label>'
      + '<input type="date" id="pp-birth-input" class="pp-date" max="' + ppTodayISO() + '" required>'
      + '<button type="submit" class="pp-btn">보기</button>'
      + '</form>';
    document.getElementById('pp-age-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const v = document.getElementById('pp-birth-input').value;
      if (!v) return;
      ppWriteBirth(v);
      ppTrack('pp_birth_set');
      ppRenderAge(true);
    });
    if (focus) ppFocusTitle(el);
    return;
  }

  const days = ppDaysSince(birth);
  const week = Math.floor(days / 7) + 1;
  const stage = PP_STAGES.find(s => days <= s.maxDay);
  let html;

  if (days < 0) {
    html = '<h2 class="pp-card-title">아직 출산 전이에요</h2>'
      + '<p class="pp-card-sub">출산 준비와 산후 회복 정보는 출산 가이드에서 볼 수 있어요.</p>'
      + '<button type="button" class="pp-btn pp-btn--ghost" onclick="showPage(\'birth\')">출산 가이드 보기</button>';
  } else if (!stage) {
    html = '<h2 class="pp-card-title">첫 12개월이 지났어요</h2>'
      + '<p class="pp-card-sub">아이 성장과 내 마음 가이드는 아래 "다른 상황 보기"에 있어요.</p>';
  } else {
    html = '<h2 class="pp-card-title">아기가 태어난 지 <strong>' + week + '주째</strong>예요</h2>'
      + '<p class="pp-stage-label">' + esc(stage.label) + '</p>'
      + '<ul class="pp-list" role="list">' + stage.lines.map(l => '<li>' + esc(l) + '</li>').join('') + '</ul>';
  }
  el.innerHTML = html
    + '<button type="button" class="pp-text-btn" id="pp-birth-reset">날짜 지우기</button>';
  document.getElementById('pp-birth-reset').addEventListener('click', function () {
    ppWriteBirth('');
    ppRenderAge(true);
  });
  if (focus) ppFocusTitle(el);
}

/* 위기 순간에는 선택지를 줄인다: 109 전화·문자 두 개만 먼저, 나머지는 접어 둔다 */
function ppConnectHTML() {
  return '<div class="pp-connect">'
    + '<a class="pp-call pp-call--primary" href="' + helplineTel('suicide') + '" data-umami-event="pp-connect" data-umami-event-type="call-109"><span aria-hidden="true">📞 </span>109에 전화하기 <span>무료 · 24시간</span></a>'
    + '<a class="pp-call" href="' + helplineSms('suicide') + '" data-umami-event="pp-connect" data-umami-event-type="sms-109"><span aria-hidden="true">💬 </span>109에 문자 보내기</a>'
    + '<details class="pp-more"><summary>다른 방법</summary>'
    + '<a class="pp-call" href="' + MADLAN_URL + '" target="_blank" rel="noopener noreferrer" data-umami-event="pp-connect" data-umami-event-type="madlan"><span aria-hidden="true">💬 </span>카카오톡 마들랜 상담<span class="sr-only"> (새 창)</span></a>'
    + '<a class="pp-call" href="' + helplineTel('mental') + '" data-umami-event="pp-connect" data-umami-event-type="call-15770199"><span aria-hidden="true">📞 </span>1577-0199 정신건강위기상담전화</a>'
    + '</details>'
    + '<p class="pp-script">처음엔 <strong>"아기가 태어나고 요즘 많이 힘들어요"</strong>라고만 해도 돼요.<br>나나 아기가 지금 위험하다면 <a href="tel:119">119</a>에 전화해 주세요.</p>'
    + '</div>';
}

const PP_MOOD_REPLY = {
  ok: () => '<p class="pp-reply">힘든 날이 오면 여기서 다시 골라 주세요. 필요한 곳으로 이어 드릴게요.</p>',
  holding: () => '<p class="pp-reply">버티는 날도 있어요. 아래 <strong>새벽에 할 수 있는 것</strong> 중 하나만 해 보세요. 이런 날이 2주 넘게 이어지면 <strong>마음 신호 확인</strong>을 해 보세요.</p>',
  hard: () => '<p class="pp-reply"><strong>혼자 버티지 않아도 돼요.</strong> 지금 이야기를 들어줄 사람이 있어요.</p>' + ppConnectHTML(),
};

function ppSelectMood(mood) {
  document.querySelectorAll('.pp-mood-btn').forEach(b => {
    const on = b.dataset.ppMood === mood;
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  const res = document.getElementById('pp-mood-result');
  if (res) res.innerHTML = PP_MOOD_REPLY[mood]();
  if (mood === 'holding') {
    const night = document.getElementById('pp-night');
    if (night) night.open = true;
  }
  ppTrack('pp_mood', { mood: mood });
}

/* 산후 페이지의 마음 신호 확인을 바로 펼쳐서 보여준다 */
function ppOpenCheck() {
  showPage('postpartum');
  if (typeof setMTab === 'function') setMTab('mind');
  let tries = 0;
  (function openWhenReady() {
    const wrap = document.getElementById('postpartum-check-wrap');
    const item = wrap && wrap.closest('.accordion-item');
    const header = item && item.querySelector('.accordion-header');
    if (header) {
      if (header.getAttribute('aria-expanded') !== 'true') header.click();
      setTimeout(() => {
        header.scrollIntoView({ behavior: ppSmooth(), block: 'start' });
        header.focus({ preventScroll: true });
      }, 120);
      return;
    }
    if (++tries < 20) setTimeout(openWhenReady, 100);
  })();
}

function toggleHomeOther() {
  const other = document.getElementById('home-other');
  const btn = document.getElementById('pp-other-toggle');
  if (!other || !btn) return;
  other.hidden = !other.hidden;
  btn.setAttribute('aria-expanded', other.hidden ? 'false' : 'true');
  const label = btn.querySelector('.pp-other-label');
  if (label) label.textContent = other.hidden ? '다른 상황 보기' : '다른 상황 접기';
  if (!other.hidden) {
    ppTrack('pp_other_open');
    setTimeout(() => other.scrollIntoView({ behavior: ppSmooth(), block: 'start' }), 60);
  }
}

function ppTrack(name, data) {
  if (typeof umami === 'undefined') return;
  try { umami.track(name, data); } catch (e) {}
}

(function initPpHome() {
  if (!document.getElementById('pp-home')) return;
  ppRenderAge();
  document.querySelectorAll('.pp-mood-btn').forEach(b =>
    b.addEventListener('click', () => ppSelectMood(b.dataset.ppMood)));
  const check = document.getElementById('pp-check-link');
  if (check) check.addEventListener('click', ppOpenCheck);
  const toggle = document.getElementById('pp-other-toggle');
  if (toggle) toggle.addEventListener('click', toggleHomeOther);
})();
