/* ═══════════════════════════════════════════════════════════
   BeInside — 상황 카드 렌더러 (육아 참고서)
   - 데이터: js/data-cards.js (BI_CARDS). 번호: js/helplines.js (HELPLINES)
   - 앱 안: showCard(id) → showPage('card'). 경로는 게시 카드 /cards/<id>,
     초안은 /?card=<id>&preview=1 (초안은 정적 파일이 없어서 /cards/ 경로로 두지 않는다)
   - 초안(status 'draft')은 ?preview=1 일 때만 보이고, 목록·검색·칩·정적 빌드에서 빠진다.
   - scripts/build-cards.mjs가 cardHTML()로 정적 페이지를 만든다.
     그래서 이 파일은 DOM 없이(node vm) 불러와도 오류가 나지 않아야 한다.
═══════════════════════════════════════════════════════════ */

const CARD_SITE = 'https://beinside.kr';
/* 운영자 연락처: index.html 푸터·JSON-LD와 같은 주소 */
const CARD_REPORT_EMAIL = 'lune0427@gmail.com';
/* 모든 카드 하단 고정 문구. {{emergency}}는 119 tel: 링크로 바뀐다 */
const CARD_DISCLAIMER = '이 카드는 진료를 대신하지 않아요. 걱정되면 소아청소년과나 {{emergency}}에 연락하세요.';

/* 병원 찾기 링크. 두 주소 모두 원문 미확인(2026-09-27, 이 환경에서 열지 못함) — 운영자 확인 필요 */
const CARD_FIND = {
  er:        { href: 'https://www.e-gen.or.kr/', label: '가까운 응급실 찾기', sub: '응급의료포털 E-GEN' },
  moonlight: { href: 'https://www.nmc.or.kr/nmc/babyList', label: '밤·휴일 소아 진료 찾기', sub: '달빛어린이병원 · 국립중앙의료원' },
};

/* 상황 칩 (첫 화면 랜딩·대시보드). card가 게시(published)돼 있으면 카드로 가고, 아니면 fallback으로 간다.
   fallback 연결 대상 — 카드가 게시되기 전 임시 연결:
   - fever   '열이 나요'        → 옛 emergency 페이지(응급처치 '고열 대처'에 월령별 기준)
   - crying  '안 그치고 울어요'  → 첫 화면 '새벽에 할 수 있는 것 3가지'(검수된 울음 문장).
                                  랜딩은 #pp-l-night로 이동, 대시보드는 #pp-night를 펼친다
   - sleep   '밤에 안 자요'      → 옛 growth 성장 가이드(월령별 수면). 태어난 날이 있으면 그 월령으로 연다
   - feeding '잘 안 먹어요'      → 옛 growth 성장 가이드(월령별 수유). 태어난 날이 있으면 그 월령으로 연다
   - call119 '바로 119'          → 옛 emergency 페이지(119 버튼·응급처치)
   - mom     '엄마가 힘들어요'   → 마음 신호 확인(산후 페이지 체크, js/pp-home.js ppOpenCheck) */
const CARD_CHIPS = [
  { key: 'fever',   label: '열이 나요',        card: 'fever',    fallback: 'emergency' },
  { key: 'crying',  label: '안 그치고 울어요', card: 'crying',   fallback: 'night' },
  { key: 'sleep',   label: '밤에 안 자요',     card: null,       fallback: 'growth' },
  { key: 'feeding', label: '잘 안 먹어요',     card: null,       fallback: 'growth' },
  { key: 'call119', label: '바로 119',         card: 'call-119', fallback: 'emergency', urgent: true },
  { key: 'mom',     label: '엄마가 힘들어요',  card: null,       fallback: 'check' },
];

/* 페이지를 연 주소에 ?preview=1이 있었는지. 앱 안에서 페이지를 옮겨도 이 세션 동안 유지한다 */
const CARD_PREVIEW = typeof location !== 'undefined' && /[?&]preview=1(?:&|$)/.test(location.search);

let _cardId = null;

function cardEsc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function cardFind(id) {
  return BI_CARDS.find(function (c) { return c.id === id; }) || null;
}

function cardIsPublished(card) {
  return !!card && card.status === 'published';
}

/* 목록·검색·칩·정적 빌드는 모두 이 함수만 쓴다 (초안 게이트) */
function cardsListed() {
  return BI_CARDS.filter(cardIsPublished);
}

function cardCanShow(card, preview) {
  return cardIsPublished(card) || (!!card && !!preview && card.status === 'draft');
}

function cardIco(id) {
  return '<svg class="pp-ico" aria-hidden="true" focusable="false"><use href="#i-' + id + '"/></svg>';
}

/* 문장 속 {{키}} → tel: 링크. 카드에서 그 번호가 처음 나올 때만 한 줄 설명을 문장 뒤에 붙인다 */
function cardRich(text, seen) {
  const notes = [];
  const html = cardEsc(text).replace(/\{\{(\w+)\}\}/g, function (m, key) {
    const h = HELPLINES[key];
    if (!h) return m;
    if (!seen[key]) { seen[key] = true; notes.push(key); }
    return '<a class="tel-inline" href="' + helplineTel(key) + '">' + cardEsc(h.number) + '</a>';
  });
  return html + notes.map(function (key) {
    const h = HELPLINES[key];
    return '<span class="bc-telnote"><b>' + cardEsc(h.number) + '</b> '
      + (h.name !== h.number ? cardEsc(h.name) + ' · ' : '') + cardEsc(h.desc) + '</span>';
  }).join('');
}

/* 번호 버튼: 번호 + 행동 + 한 줄 설명. 119는 긴급 스타일(56px) */
function cardCallHTML(key) {
  const h = HELPLINES[key];
  const urgent = key === 'emergency';
  const main = h.number + (h.name !== h.number ? ' ' + h.name : '에 전화하기');
  return '<a class="bc-call' + (urgent ? ' bc-call--urgent' : '') + '" href="' + helplineTel(key) + '"'
    + ' data-bc-event="pp-connect" data-bc-type="call-' + h.number.replace(/-/g, '') + '">'
    + '<span class="bc-call-main">' + cardIco('phone') + cardEsc(main) + '</span>'
    + '<span class="bc-call-sub">' + cardEsc(h.desc) + '</span></a>';
}

function cardLinkHTML(link) {
  return '<a class="bc-link" href="' + cardEsc(link.href) + '" target="_blank" rel="noopener noreferrer">'
    + '<span class="bc-link-main">' + cardEsc(link.label) + '</span>'
    + '<span class="bc-link-sub">' + cardEsc(link.sub) + '<span class="sr-only"> (새 창)</span></span></a>';
}

function cardListHTML(items, seen, ordered) {
  const tag = ordered ? 'ol' : 'ul';
  return '<' + tag + ' class="bc-list' + (ordered ? ' bc-list--num' : '') + '" role="list">'
    + items.map(function (t) { return '<li>' + cardRich(t, seen) + '</li>'; }).join('')
    + '</' + tag + '>';
}

/* "흔히 겪는 문제 → 할 수 있는 것" 한 쌍 */
function cardProblemHTML(text, seen) {
  const at = text.indexOf(' → ');
  if (at === -1) return '<li>' + cardRich(text, seen) + '</li>';
  return '<li><strong class="bc-q">' + cardRich(text.slice(0, at), seen) + '</strong>'
    + '<span class="bc-a">' + cardRich(text.slice(at + 3), seen) + '</span></li>';
}

function cardReportHref(card) {
  const subject = '[BeInside 카드 오류] ' + card.title + ' (' + card.id + ')';
  const body = '카드: ' + CARD_SITE + '/cards/' + card.id + '\n마지막 확인: ' + card.reviewed
    + '\n\n틀린 곳(문장을 복사해 주세요):\n\n맞다고 생각하는 내용과 출처(있으면):\n';
  return 'mailto:' + CARD_REPORT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}

/* 카드 한 장 전체. 초안이면 맨 위에 띠. opts.isStatic: 정적 페이지용("앱에서 보기" 링크) */
function cardHTML(card, opts) {
  opts = opts || {};
  const seen = {};
  const draft = card.status !== 'published';
  let html = '<article class="bc" aria-labelledby="bc-title-' + card.id + '" data-card="' + cardEsc(card.id) + '">';

  if (draft) {
    html += '<p class="bc-draft" role="note"><strong>검토 중인 초안</strong> 출처 원문을 확인하기 전이라 공개하지 않은 카드예요. 이 내용으로 판단하지 마세요.</p>';
  }

  if (card.urgent) {
    seen.emergency = true; /* 바로 아래 119 버튼에 설명이 있다 */
    html += '<div class="bc-urgent" role="note">'
      + '<p class="bc-urgent-t">' + cardRich(card.urgentLine, seen) + '</p>'
      + cardCallHTML('emergency')
      + '</div>';
  }

  html += '<div class="bc-head">'
    + '<p class="bc-kicker">아기 첫 1년 · 상황 카드</p>'
    + '<h1 class="bc-title" id="bc-title-' + card.id + '" tabindex="-1">' + cardEsc(card.title) + '</h1>'
    + '<p class="bc-summary">' + cardEsc(card.summary) + '</p>'
    + '</div>';

  html += '<section class="bc-sec" aria-labelledby="bc-what-' + card.id + '">'
    + '<h2 class="bc-h" id="bc-what-' + card.id + '">무슨 일인지</h2>' + cardListHTML(card.what, seen) + '</section>';

  html += '<section class="bc-sec" aria-labelledby="bc-todo-' + card.id + '">'
    + '<h2 class="bc-h" id="bc-todo-' + card.id + '">지금 할 일</h2>' + cardListHTML(card.todo, seen, true) + '</section>';

  html += '<section class="bc-sec" aria-labelledby="bc-hosp-' + card.id + '">'
    + '<h2 class="bc-h" id="bc-hosp-' + card.id + '">병원 갈 때</h2>';
  if (card.hospital.now && card.hospital.now.length) {
    html += '<div class="bc-now">'
      + '<h3 class="bc-h3 bc-h3--now">지금 바로 119 · 응급실</h3>'
      + cardListHTML(card.hospital.now, seen)
      + '<div class="bc-actions">' + cardCallHTML('emergency') + cardLinkHTML(CARD_FIND.er) + '</div>'
      + '</div>';
  }
  if (card.hospital.soon && card.hospital.soon.length) {
    html += '<div class="bc-soon">'
      + '<h3 class="bc-h3">오늘 소아청소년과에 가요</h3>'
      + cardListHTML(card.hospital.soon, seen)
      + '<p class="bc-note">다니는 소아청소년과에 먼저 전화해 물어봐도 돼요. 밤이나 휴일이면 아래에서 찾아요.</p>'
      + '<div class="bc-actions">' + cardLinkHTML(CARD_FIND.moonlight) + '</div>'
      + '</div>';
  }
  html += '</section>';

  html += '<section class="bc-sec bc-mom" aria-labelledby="bc-mom-' + card.id + '">'
    + '<h2 class="bc-h" id="bc-mom-' + card.id + '">이때 엄마가 흔히 느끼는 것</h2>'
    + cardListHTML(card.mom.feel, seen)
    + '<h3 class="bc-h3">흔히 겪는 문제</h3>'
    + '<ul class="bc-list bc-list--qa" role="list">' + card.mom.problems.map(function (t) { return cardProblemHTML(t, seen); }).join('') + '</ul>'
    + '</section>';

  html += '<section class="bc-sec" aria-labelledby="bc-more-' + card.id + '" data-bc-end>'
    + '<h2 class="bc-h" id="bc-more-' + card.id + '">더 도움이 필요하면</h2>'
    + '<div class="bc-actions">' + card.more.map(cardCallHTML).join('') + '</div>'
    + '<p class="bc-fixed">죽고 싶은 생각이 들면 <a class="tel-inline" href="' + helplineTel('suicide') + '">109</a>'
    + '(자살예방상담전화 · 무료 · 24시간), 나나 아기가 지금 위험하면 <a class="tel-inline" href="' + helplineTel('emergency') + '">119</a>.</p>'
    + '</section>';

  html += '<div class="bc-foot">'
    + '<h2 class="bc-h bc-h--small">출처</h2>'
    + '<ul class="bc-src" role="list">' + card.sources.map(function (s) {
      return '<li><a href="' + cardEsc(s.url) + '" target="_blank" rel="noopener noreferrer">' + cardEsc(s.name)
        + '<span class="sr-only"> (새 창)</span></a> <span class="bc-src-date">확인 ' + cardEsc(s.checked) + '</span></li>';
    }).join('') + '</ul>'
    + '<p class="bc-dates">마지막 확인 ' + cardEsc(card.reviewed) + ' · 다음 확인 ' + cardEsc(card.nextReview) + '</p>'
    + '<p class="bc-disclaimer">' + cardRich(CARD_DISCLAIMER, { emergency: true }) + '</p>'
    + '<div class="bc-tools">'
    + (draft ? '' : '<button type="button" class="bc-tool" data-bc-share="' + cardEsc(card.id) + '">공유하기</button>')
    + '<a class="bc-tool" href="' + cardEsc(cardReportHref(card)) + '" data-bc-event="card_report" data-bc-card="' + cardEsc(card.id) + '">틀린 곳 알려 주기</a>'
    + '</div>'
    + '<p class="bc-share-msg" aria-live="polite"></p>'
    + (opts.isStatic ? '<p class="bc-app"><a class="bc-tool bc-tool--wide" href="/?card=' + encodeURIComponent(card.id) + '">앱에서 보기</a></p>' : '')
    + '</div>';

  return html + '</article>';
}

function cardMissingHTML() {
  return '<div class="bc bc--missing">'
    + '<h1 class="bc-title" tabindex="-1">찾는 카드가 없어요</h1>'
    + '<p class="bc-summary">주소가 바뀌었거나 아직 공개하지 않은 카드예요.</p>'
    + '<p class="bc-fixed">아기가 지금 위험하면 <a class="tel-inline" href="' + helplineTel('emergency') + '">119</a>에 전화해요.</p>'
    + '<div class="bc-tools"><a class="bc-tool" href="/">첫 화면으로</a></div>'
    + '</div>';
}

/* ── 앱 안 카드 화면 (js/app.js showPage가 부른다) ── */
function showCard(id) {
  _cardId = id;
  showPage('card');
}

function cardPath() {
  const card = cardFind(_cardId);
  if (cardIsPublished(card)) return '/cards/' + card.id;
  return '/?card=' + encodeURIComponent(_cardId || '') + (CARD_PREVIEW ? '&preview=1' : '');
}

/* 주소에서 카드 id 읽기: /cards/<id> 또는 ?card=<id> */
function cardRouteId() {
  const m = location.pathname.match(/^\/cards\/([a-z0-9-]+)\/?$/);
  if (m) return m[1];
  const q = new URLSearchParams(location.search).get('card');
  return q && /^[a-z0-9-]+$/.test(q) ? q : null;
}

function renderCardPage() {
  const root = document.getElementById('bc-root');
  if (!root) return;
  const card = cardFind(_cardId);
  root.innerHTML = cardCanShow(card, CARD_PREVIEW) ? cardHTML(card) : cardMissingHTML();
  const t = root.querySelector('.bc-title');
  if (t) setTimeout(function () { t.focus({ preventScroll: true }); }, 0);
}

function cardSetMeta(sel, attr, val) {
  const el = document.querySelector(sel);
  if (el) el.setAttribute(attr, val);
}

function cardUpdateMeta() {
  const card = cardFind(_cardId);
  const ok = cardCanShow(card, CARD_PREVIEW);
  const title = ok ? card.title + ' — BeInside' : '찾는 카드가 없어요 — BeInside';
  const desc = ok ? card.summary : '아기 첫 1년 상황 카드';
  const url = CARD_SITE + (cardIsPublished(card) ? '/cards/' + card.id : '/');
  document.title = title;
  cardSetMeta('meta[name="description"]', 'content', desc);
  cardSetMeta('meta[property="og:title"]', 'content', title);
  cardSetMeta('meta[property="og:description"]', 'content', desc);
  cardSetMeta('meta[property="og:url"]', 'content', url);
  cardSetMeta('meta[name="twitter:title"]', 'content', title);
  cardSetMeta('meta[name="twitter:description"]', 'content', desc);
  cardSetMeta('link[rel="canonical"]', 'href', url);
}

/* ── 통계 (주소·검색어 원문은 보내지 않는다. 카드 id·칩 이름만) ── */
function cardTrack(name, data) {
  if (typeof umami === 'undefined') return;
  try { umami.track(name, data); } catch (e) {}
}

/* ── 공유: Web Share API → 없으면 링크 복사 → 그것도 안 되면 주소를 보여 준다 ── */
function cardShare(id, btn) {
  const card = cardFind(id);
  if (!cardIsPublished(card)) return;
  const url = CARD_SITE + '/cards/' + id + '?s=share';
  const box = btn.closest('.bc-foot');
  const msg = box && box.querySelector('.bc-share-msg');
  const say = function (t) { if (msg) msg.textContent = t; };
  if (navigator.share) {
    navigator.share({ title: card.title + ' — BeInside', text: card.summary, url: url })
      .then(function () { cardTrack('card_share', { card: id, method: 'native' }); })
      .catch(function () {});
    return;
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url)
      .then(function () { say('링크를 복사했어요. 붙여 넣어 보내면 돼요.'); cardTrack('card_share', { card: id, method: 'copy' }); })
      .catch(function () { say('이 주소를 길게 눌러 복사해 주세요: ' + url); });
    return;
  }
  say('이 주소를 길게 눌러 복사해 주세요: ' + url);
}

/* ── 상황 칩 ── */
function cardChipsHTML(from) {
  return CARD_CHIPS.map(function (c) {
    return '<button type="button" class="bc-chip' + (c.urgent ? ' bc-chip--urgent' : '') + '" data-bc-chip="' + c.key + '" data-bc-from="' + from + '">'
      + cardEsc(c.label) + '</button>';
  }).join('');
}

function cardRenderChips() {
  document.querySelectorAll('[data-bc-chips]').forEach(function (el) {
    el.innerHTML = cardChipsHTML(el.getAttribute('data-bc-chips'));
  });
}

function cardBirthMonths() {
  if (typeof ppReadBirth !== 'function' || typeof ppDaysSince !== 'function') return null;
  const birth = ppReadBirth();
  if (!birth) return null;
  const days = ppDaysSince(birth);
  return days < 0 ? 0 : Math.min(12, Math.floor(days / 30.44));
}

function cardChip(key, from) {
  const chip = CARD_CHIPS.find(function (c) { return c.key === key; });
  if (!chip) return;
  const card = chip.card ? cardFind(chip.card) : null;
  cardTrack('chip_click', { chip: key, from: from, to: cardIsPublished(card) ? 'card' : chip.fallback });
  if (cardIsPublished(card)) { showCard(card.id); return; }

  if (chip.fallback === 'emergency') { showPage('emergency'); if (typeof setMTab === 'function') setMTab('emergency'); return; }
  if (chip.fallback === 'check') { if (typeof ppOpenCheck === 'function') ppOpenCheck(); return; }
  if (chip.fallback === 'growth') {
    const months = cardBirthMonths();
    if (months !== null && typeof qs === 'function') qs(months, 'm');
    else showPage('growth');
    return;
  }
  if (chip.fallback === 'night') {
    const night = document.getElementById('pp-night');
    const dash = document.getElementById('pp-dash');
    if (night && dash && !dash.hidden) {
      night.open = true;
      const s = night.querySelector('summary');
      night.scrollIntoView({ behavior: typeof ppSmooth === 'function' ? ppSmooth() : 'auto', block: 'start' });
      if (s) s.focus({ preventScroll: true });
    } else if (typeof ppBrowse === 'function') {
      ppBrowse();
    }
  }
}

/* ── 한 번만 거는 위임 이벤트 (앱·정적 페이지 공통) ── */
(function initCards() {
  if (typeof document === 'undefined') return;
  document.addEventListener('click', function (e) {
    const chip = e.target.closest('[data-bc-chip]');
    if (chip) { cardChip(chip.getAttribute('data-bc-chip'), chip.getAttribute('data-bc-from')); return; }
    const share = e.target.closest('[data-bc-share]');
    if (share) { cardShare(share.getAttribute('data-bc-share'), share); return; }
    const ev = e.target.closest('[data-bc-event]');
    if (ev) {
      const card = ev.closest('[data-card]');
      cardTrack(ev.getAttribute('data-bc-event'), {
        card: card ? card.getAttribute('data-card') : '',
        type: ev.getAttribute('data-bc-type') || undefined,
        from: 'card',
      });
    }
  });
  cardRenderChips();
})();
