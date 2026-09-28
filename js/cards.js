/* ═══════════════════════════════════════════════════════════
   BeInside — 상황 카드 렌더러 (육아 참고서) + 공통 콘텐츠 셸
   - 데이터: js/data-cards.js (BI_CARDS), js/data-summaries.js (BI_SUMMARIES). 번호: js/helplines.js (HELPLINES)
   - 앱 안: showCard(id) / showSummary(id) → showPage('card'). 경로는 게시 카드 /cards/<id>,
     초안은 /?card=<id>&preview=1, 상황 요약은 /?summary=<id> (정적 파일·사이트맵 없음, noindex)
   - 초안(status 'draft')은 ?preview=1 일 때만 보이고, 목록·검색·칩·정적 빌드에서 빠진다.
   - scripts/build-cards.mjs가 cardHTML()로 정적 페이지를 만든다.
     그래서 이 파일은 DOM 없이(node vm) 불러와도 오류가 나지 않아야 한다. BI_SUMMARIES가 없어도 된다.

   공통 콘텐츠 셸 (reports/design/2026-09-consistency-audit.md §3-(a))
   카드·상황 요약·옛 가이드 머리가 같은 조각 함수와 같은 .bc-* 클래스를 쓴다. 조각은 문자열만 돌려준다.
     cardHeadHTML      제목부 (키커 + 고운바탕 제목 + 요약)
     cardUrgentHTML    맨 위 119 줄
     cardSecHTML       섹션 (h2.bc-h)
     cardListHTML      목록 (점 / 번호)
     cardCallHTML      번호 버튼 (HELPLINES 키 또는 {number, name, desc})
     cardHospitalHTML  병원 박스 (지금 바로 / 오늘 / 단계)
     cardMomHTML       엄마 박스
     cardMoreHTML      더 도움이 필요하면 (+109·119 고정 줄)
     cardFootHTML      출처·날짜·진료 대체 아님 (카드) / summaryFootHTML (요약)
═══════════════════════════════════════════════════════════ */

const CARD_SITE = 'https://beinside.kr';
/* 운영자 연락처: index.html 푸터·JSON-LD와 같은 주소 */
const CARD_REPORT_EMAIL = 'lune0427@gmail.com';
/* 모든 카드 하단 고정 문구. {{emergency}}는 119 tel: 링크로 바뀐다 */
const CARD_DISCLAIMER = '이 카드는 진료를 대신하지 않아요. 걱정되면 소아청소년과나 {{emergency}}에 연락하세요.';
/* 상황 요약 고정 문구. {who}는 요약마다 바꿀 수 있다(기본: 소아청소년과) */
const SUMMARY_DISCLAIMER = '이 요약은 진료를 대신하지 않아요. 걱정되면 {who}나 {{emergency}}에 연락하세요.';
const SUMMARY_KICKER = '상황 요약 · 사이트 안내를 모은 것';
const SUMMARY_LEAD = '사이트 여러 곳에 있던 안내를 한곳에 모았어요. 공식 출처와 한 줄씩 대조한 상황 카드는 준비하고 있어요.';
const CARD_EMPTY = '이 칸에 옮길 안내는 아직 모으지 못했어요.';

/* 병원 찾기 링크. 두 주소 모두 원문 미확인(2026-09-27, 이 환경에서 열지 못함) — 운영자 확인 필요 */
const CARD_FIND = {
  er:        { href: 'https://www.e-gen.or.kr/', label: '가까운 응급실 찾기', sub: '응급의료포털 E-GEN' },
  moonlight: { href: 'https://www.nmc.or.kr/nmc/babyList', label: '밤·휴일 소아 진료 찾기', sub: '달빛어린이병원 · 국립중앙의료원' },
};

/* 상황 칩 (첫 화면 랜딩·대시보드). 모든 칩은 카드 템플릿 화면(page-card)으로 간다.
   card가 게시(published)돼 있으면 카드, 아니면 summary(상황 요약, js/data-summaries.js).
   fallback: 요약 맨 아래 "자세한 안내"가 여는 옛 가이드 자리(CARD_FALLBACKS 키). */
const CARD_CHIPS = [
  { key: 'fever',   label: '열이 나요',        card: 'fever',    summary: 'fever',   fallback: 'fever' },
  { key: 'crying',  label: '안 그치고 울어요', card: 'crying',   summary: 'crying',  fallback: 'night' },
  { key: 'sleep',   label: '밤에 안 자요',     card: null,       summary: 'sleep',   fallback: 'sleep' },
  { key: 'feeding', label: '잘 안 먹어요',     card: null,       summary: 'feeding', fallback: 'feeding' },
  { key: 'call119', label: '바로 119',         card: 'call-119', summary: 'call119', fallback: 'call119', urgent: true },
  { key: 'mom',     label: '엄마가 힘들어요',  card: null,       summary: 'mom',     fallback: 'check' },
];

/* 옛 가이드 안 자리 ("자세한 안내"와 "이 요약에 모은 안내" 링크가 연다).
   growth는 months가 있으면 그 월령, 없으면 태어난 날의 월령(없으면 신생아)으로 연다.
   - fever    → growth › '응급처치 가이드' 펼침 › '고열 대처'
   - crying   → growth › 아빠 가이드 탭 › '지금 급한 상황' › '아기가 계속 울어요'
   - sleep    → growth › '아이가 밤에 안 자요' 툴킷(0~12개월)
   - feeding  → growth › '신체 발달 & 의학 체크' 펼침
   - call119  → emergency › '아기에게 이런 일이 있으면 바로 119'
   - firstaid → emergency › 영유아 응급처치 가이드
   - check    → 산후 마음 가이드 › 마음 신호 확인 (js/pp-home.js ppOpenCheck)
   - m0·m3·m6·m12 → growth 해당 월령 결과 머리
   - birth·postpartum → 그 가이드 제목
   - home·night·redflags → 첫 화면 (날짜가 있으면 대시보드의 같은 내용) */
const CARD_FALLBACKS = {
  fever:      { page: 'growth', acc: 'firstaid', focus: '[data-fa="fever"]' },
  crying:     { page: 'growth', tab: 'dad', acc: 'dad-urgent', focus: '.dad-toolkit-block', text: '울어요' },
  sleep:      { page: 'growth', toolkit: 'toolkit-sleep', pill: 'sleep-infant', focus: '#toolkit-sleep' },
  feeding:    { page: 'growth', acc: 'body', focus: '[data-acc="body"] .acc-header' },
  call119:    { page: 'emergency', focus: '#emer-119-signs' },
  firstaid:   { page: 'emergency', focus: '#emer-firstaid' },
  check:      { page: 'postpartum', focus: '#postpartum-check-wrap' },
  m0:         { page: 'growth', months: 0, focus: '#result .rhead' },
  m3:         { page: 'growth', months: 3, focus: '#result .rhead' },
  m6:         { page: 'growth', months: 6, focus: '#result .rhead' },
  m12:        { page: 'growth', months: 12, focus: '#result .rhead' },
  birth:      { page: 'birth', focus: '#page-birth .bc-title' },
  postpartum: { page: 'postpartum', focus: '#page-postpartum .bc-title' },
  home:       { page: 'home' },
  night:      { page: 'home', focus: '#pp-l-night', dash: '#pp-night' },
  redflags:   { page: 'home', focus: '#pp-l-help', dash: '#pp-redflags' },
};

/* 페이지를 연 주소에 ?preview=1이 있었는지. 앱 안에서 페이지를 옮겨도 이 세션 동안 유지한다 */
const CARD_PREVIEW = typeof location !== 'undefined' && /[?&]preview=1(?:&|$)/.test(location.search);

let _cardId = null;
let _cardKind = 'card'; // 'card' | 'summary'

function cardEsc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function cardFind(id) {
  return BI_CARDS.find(function (c) { return c.id === id; }) || null;
}

function summaryFind(id) {
  if (typeof BI_SUMMARIES === 'undefined') return null;
  return BI_SUMMARIES.find(function (s) { return s.id === id; }) || null;
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

/* 문장 항목: 카드는 문자열, 요약은 { t, from, label? } */
function cardText(x) {
  return typeof x === 'string' ? x : (x && x.t) || '';
}

/* 문장 속 {{키}} → tel: 링크. 화면에서 그 번호가 처음 나올 때만 한 줄 설명을 문장 뒤에 붙인다 */
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

/* 번호 버튼: 번호 + 행동 + 한 줄 설명. 119는 긴급 스타일(56px).
   key: HELPLINES 키, 또는 HELPLINES에 없는 기관 번호 { number, name, desc } */
function cardCallHTML(key) {
  const h = typeof key === 'string' ? HELPLINES[key] : key;
  const urgent = h.number === '119';
  const tel = typeof key === 'string' ? helplineTel(key) : 'tel:' + h.number.replace(/-/g, '');
  const main = h.number + (h.name && h.name !== h.number ? ' ' + h.name : '에 전화하기');
  return '<a class="bc-call' + (urgent ? ' bc-call--urgent' : '') + '" href="' + tel + '"'
    + ' data-bc-event="pp-connect" data-bc-type="call-' + h.number.replace(/-/g, '') + '">'
    + '<span class="bc-call-main">' + cardIco('phone') + cardEsc(main) + '</span>'
    + (h.desc ? '<span class="bc-call-sub">' + cardEsc(h.desc) + '</span>' : '') + '</a>';
}

function cardLinkHTML(link) {
  return '<a class="bc-link" href="' + cardEsc(link.href) + '" target="_blank" rel="noopener noreferrer">'
    + '<span class="bc-link-main">' + cardEsc(link.label) + '</span>'
    + '<span class="bc-link-sub">' + cardEsc(link.sub) + '<span class="sr-only"> (새 창)</span></span></a>';
}

/* 사이트 안 이동 버튼 (CARD_FALLBACKS 키로 옛 가이드 자리를 연다) */
function cardGoHref(go) {
  const fb = CARD_FALLBACKS[go];
  return !fb || fb.page === 'home' ? '/' : '/' + fb.page;
}
function cardGoHTML(tool) {
  return '<a class="bc-link bc-link--go" href="' + cardGoHref(tool.go) + '" data-bc-go="' + cardEsc(tool.go) + '">'
    + '<span class="bc-link-main">' + cardEsc(tool.label) + '</span>'
    + (tool.sub ? '<span class="bc-link-sub">' + cardEsc(tool.sub) + '</span>' : '') + '</a>';
}

function cardItemHTML(x, seen) {
  if (typeof x === 'string') return '<li>' + cardRich(x, seen) + '</li>';
  return '<li>' + (x.label ? '<span class="bc-label">' + cardEsc(x.label) + '</span>' : '') + cardRich(x.t, seen) + '</li>';
}

function cardListHTML(items, seen, ordered) {
  const tag = ordered ? 'ol' : 'ul';
  return '<' + tag + ' class="bc-list' + (ordered ? ' bc-list--num' : '') + '" role="list">'
    + items.map(function (t) { return cardItemHTML(t, seen); }).join('')
    + '</' + tag + '>';
}

function cardEmptyHTML() {
  return '<p class="bc-empty">' + cardEsc(CARD_EMPTY) + '</p>';
}

/* "흔히 겪는 문제 → 할 수 있는 것" 한 쌍. 요약은 { q, a } 또는 { t } */
function cardProblemHTML(x, seen) {
  if (typeof x !== 'string') {
    if (!x.q) return '<li>' + cardRich(x.t, seen) + '</li>';
    return '<li><strong class="bc-q">' + cardRich(x.q, seen) + '</strong>'
      + '<span class="bc-a">' + cardRich(x.a, seen) + '</span></li>';
  }
  const at = x.indexOf(' → ');
  if (at === -1) return '<li>' + cardRich(x, seen) + '</li>';
  return '<li><strong class="bc-q">' + cardRich(x.slice(0, at), seen) + '</strong>'
    + '<span class="bc-a">' + cardRich(x.slice(at + 3), seen) + '</span></li>';
}

/* ── 셸 조각 ── */

/* 제목부. o: { id, kicker, title, summary } */
function cardHeadHTML(o) {
  return '<div class="bc-head">'
    + '<p class="bc-kicker">' + cardEsc(o.kicker) + '</p>'
    + '<h1 class="bc-title" id="bc-title-' + o.id + '" tabindex="-1">' + cardEsc(o.title) + '</h1>'
    + (o.summary ? '<p class="bc-summary">' + cardEsc(o.summary) + '</p>' : '')
    + '</div>';
}

/* 맨 위 119 줄 (urgent) */
function cardUrgentHTML(line, seen) {
  seen.emergency = true; /* 바로 아래 119 버튼에 설명이 있다 */
  return '<div class="bc-urgent" role="note">'
    + '<p class="bc-urgent-t">' + cardRich(line, seen) + '</p>'
    + cardCallHTML('emergency')
    + '</div>';
}

/* 섹션 한 칸. opts: { cls, end } */
function cardSecHTML(id, key, title, bodyHTML, opts) {
  opts = opts || {};
  return '<section class="bc-sec' + (opts.cls ? ' ' + opts.cls : '') + '" aria-labelledby="bc-' + key + '-' + id + '"' + (opts.end ? ' data-bc-end' : '') + '>'
    + '<h2 class="bc-h" id="bc-' + key + '-' + id + '">' + cardEsc(title) + '</h2>' + bodyHTML + '</section>';
}

/* 병원 박스. h: { now, nowTitle?, soon, tiers? }. opts.find: 응급실·달빛어린이병원 찾기 링크(카드만) */
function cardHospitalHTML(h, seen, opts) {
  opts = opts || {};
  let html = '';
  if (h.now && h.now.length) {
    html += '<div class="bc-now">'
      + '<h3 class="bc-h3 bc-h3--now">' + cardEsc(h.nowTitle ? cardText(h.nowTitle) : '지금 바로 119 · 응급실') + '</h3>'
      + cardListHTML(h.now, seen)
      + '<div class="bc-actions">' + cardCallHTML('emergency') + (opts.find ? cardLinkHTML(CARD_FIND.er) : '') + '</div>'
      + '</div>';
  }
  if (h.soon && h.soon.length) {
    html += '<div class="bc-soon">'
      + '<h3 class="bc-h3">오늘 소아청소년과에 가요</h3>'
      + cardListHTML(h.soon, seen)
      + (opts.find
        ? '<p class="bc-note">다니는 소아청소년과에 먼저 전화해 물어봐도 돼요. 밤이나 휴일이면 아래에서 찾아요.</p>'
          + '<div class="bc-actions">' + cardLinkHTML(CARD_FIND.moonlight) + '</div>'
        : '')
      + '</div>';
  }
  (h.tiers || []).forEach(function (t) {
    html += '<div class="bc-soon">'
      + '<h3 class="bc-h3">' + cardEsc(cardText(t.title)) + '</h3>'
      + cardListHTML(t.items, seen)
      + (t.calls && t.calls.length ? '<div class="bc-actions">' + t.calls.map(cardCallHTML).join('') + '</div>' : '')
      + '</div>';
  });
  return html;
}

/* 엄마 박스 본문 */
function cardMomHTML(mom, seen) {
  const feel = mom.feel || [];
  const problems = mom.problems || [];
  const html = (feel.length ? cardListHTML(feel, seen) : '')
    + (problems.length
      ? '<h3 class="bc-h3">흔히 겪는 문제</h3>'
        + '<ul class="bc-list bc-list--qa" role="list">' + problems.map(function (t) { return cardProblemHTML(t, seen); }).join('') + '</ul>'
      : '');
  return html || cardEmptyHTML();
}

/* 더 도움이 필요하면 (항상 마지막 칸) */
function cardMoreHTML(id, keys) {
  return cardSecHTML(id, 'more', '더 도움이 필요하면',
    '<div class="bc-actions">' + keys.map(cardCallHTML).join('') + '</div>'
    + '<p class="bc-fixed">죽고 싶은 생각이 들면 <a class="tel-inline" href="' + helplineTel('suicide') + '">109</a>'
    + '(자살예방상담전화 · 무료 · 24시간), 나나 아기가 지금 위험하면 <a class="tel-inline" href="' + helplineTel('emergency') + '">119</a>.</p>',
    { end: true });
}

function cardReportHref(card) {
  const subject = '[BeInside 카드 오류] ' + card.title + ' (' + card.id + ')';
  const body = '카드: ' + CARD_SITE + '/cards/' + card.id + '\n마지막 확인: ' + card.reviewed
    + '\n\n틀린 곳(문장을 복사해 주세요):\n\n맞다고 생각하는 내용과 출처(있으면):\n';
  return 'mailto:' + CARD_REPORT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}

function summaryReportHref(s) {
  const subject = '[BeInside 상황 요약 오류] ' + s.title + ' (' + s.id + ')';
  const body = '요약: ' + CARD_SITE + '/?summary=' + s.id + '\n모은 날: ' + summaryCollected()
    + '\n\n틀린 곳(문장을 복사해 주세요):\n\n맞다고 생각하는 내용과 출처(있으면):\n';
  return 'mailto:' + CARD_REPORT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}

/* 카드 하단: 출처·날짜·진료 대체 아님·도구 */
function cardFootHTML(card, opts) {
  const draft = card.status !== 'published';
  return '<div class="bc-foot">'
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
  if (card.urgent) html += cardUrgentHTML(card.urgentLine, seen);

  html += cardHeadHTML({ id: card.id, kicker: '아기 첫 1년 · 상황 카드', title: card.title, summary: card.summary });
  html += cardSecHTML(card.id, 'what', '무슨 일인지', cardListHTML(card.what, seen));
  html += cardSecHTML(card.id, 'todo', '지금 할 일', cardListHTML(card.todo, seen, true));
  html += cardSecHTML(card.id, 'hosp', '병원 갈 때', cardHospitalHTML(card.hospital, seen, { find: true }));
  html += cardSecHTML(card.id, 'mom', '이때 엄마가 흔히 느끼는 것', cardMomHTML(card.mom, seen), { cls: 'bc-mom' });
  html += cardMoreHTML(card.id, card.more);
  html += cardFootHTML(card, opts);

  return html + '</article>';
}

/* ── 상황 요약 (kind 'summary') ── 카드와 같은 조각, 같은 칸 순서.
   다른 점: 키커 "상황 요약 · 사이트 안내를 모은 것", 출처 칸 "이 요약에 모은 안내"(사이트 안 링크) + "모은 날",
   공유 버튼 없음, 맨 아래 "자세한 안내" 버튼(옛 가이드 해당 섹션). 빈 칸은 지우지 않고 한 줄로 둔다. */
function summaryCollected() {
  return typeof SUMMARY_COLLECTED !== 'undefined' ? SUMMARY_COLLECTED : '';
}

/* 요약 안 모든 문장 항목 (테스트도 쓴다) */
function summaryItems(s) {
  const h = s.hospital || {};
  const out = [];
  if (s.urgentLine) out.push(s.urgentLine);
  [s.what, s.todo, h.now, h.soon].forEach(function (list) { (list || []).forEach(function (x) { out.push(x); }); });
  if (h.nowTitle) out.push(h.nowTitle);
  (h.tiers || []).forEach(function (t) { out.push(t.title); t.items.forEach(function (x) { out.push(x); }); });
  ((s.mom && s.mom.feel) || []).forEach(function (x) { out.push(x); });
  ((s.mom && s.mom.problems) || []).forEach(function (x) { out.push(x); });
  return out;
}

/* "이 요약에 모은 안내": from 위치를 나온 순서대로, 겹치지 않게 */
function summaryPlaces(s) {
  const seen = {};
  const out = [];
  summaryItems(s).forEach(function (x) {
    if (!x.from || seen[x.from]) return;
    seen[x.from] = true;
    const p = typeof SUMMARY_PLACES !== 'undefined' ? SUMMARY_PLACES[x.from] : null;
    if (p) out.push(p);
  });
  return out;
}

function summaryFootHTML(s) {
  const who = s.disclaimerWho || '소아청소년과';
  return '<div class="bc-foot">'
    + '<h2 class="bc-h bc-h--small">이 요약에 모은 안내</h2>'
    + '<ul class="bc-src bc-places" role="list">' + summaryPlaces(s).map(function (p) {
      return '<li><a href="' + cardEsc(p.href) + '" data-bc-go="' + cardEsc(p.go) + '">' + cardEsc(p.label) + '</a></li>';
    }).join('') + '</ul>'
    + '<p class="bc-dates">모은 날 ' + cardEsc(summaryCollected()) + '</p>'
    + '<p class="bc-disclaimer">' + cardRich(SUMMARY_DISCLAIMER.replace('{who}', who), { emergency: true }) + '</p>'
    + '<div class="bc-tools">'
    + '<a class="bc-tool" href="' + cardEsc(summaryReportHref(s)) + '" data-bc-event="summary_report" data-bc-card="' + cardEsc(s.id) + '">틀린 곳 알려 주기</a>'
    + '</div>'
    + '</div>';
}

function summaryHTML(s) {
  const seen = {};
  const sid = 's-' + s.id;
  const h = s.hospital || {};
  let html = '<article class="bc bc--summary" aria-labelledby="bc-title-' + sid + '" data-summary="' + cardEsc(s.id) + '">';

  if (s.urgent && s.urgentLine) html += cardUrgentHTML(cardText(s.urgentLine), seen);
  html += cardHeadHTML({ id: sid, kicker: SUMMARY_KICKER, title: s.title, summary: SUMMARY_LEAD });

  html += cardSecHTML(sid, 'what', '무슨 일인지', s.what && s.what.length ? cardListHTML(s.what, seen) : cardEmptyHTML());

  const tools = s.todoTools && s.todoTools.length ? '<div class="bc-actions bc-actions--first">' + s.todoTools.map(cardGoHTML).join('') + '</div>' : '';
  const todo = s.todo && s.todo.length ? cardListHTML(s.todo, seen, true) : '';
  html += cardSecHTML(sid, 'todo', '지금 할 일', (tools + todo) || cardEmptyHTML());

  const hosp = cardHospitalHTML(h, seen, { find: false });
  html += cardSecHTML(sid, 'hosp', s.hospitalTitle || '병원 갈 때', hosp || cardEmptyHTML());

  html += cardSecHTML(sid, 'mom', '이때 엄마가 흔히 느끼는 것', cardMomHTML(s.mom || {}, seen), { cls: 'bc-mom' });
  html += cardMoreHTML(sid, s.more);
  html += summaryFootHTML(s);
  if (s.detail) {
    html += '<p class="bc-detail"><a class="bc-tool bc-tool--wide bc-tool--detail" href="' + cardGoHref(s.detail.go) + '" data-bc-go="' + cardEsc(s.detail.go) + '">'
      + '<span>자세한 안내</span><span class="bc-tool-sub">' + cardEsc(s.detail.label) + '</span></a></p>';
  }
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
/* ref: 카드 id, 또는 'summary:<id>' (cardRouteId가 돌려주는 모양) */
function showCard(ref) {
  if (typeof ref === 'string' && ref.indexOf('summary:') === 0) { showSummary(ref.slice(8)); return; }
  _cardKind = 'card';
  _cardId = ref;
  showPage('card');
}

function showSummary(id) {
  _cardKind = 'summary';
  _cardId = id;
  showPage('card');
}

function cardPath() {
  if (_cardKind === 'summary') return '/?summary=' + encodeURIComponent(_cardId || '');
  const card = cardFind(_cardId);
  if (cardIsPublished(card)) return '/cards/' + card.id;
  return '/?card=' + encodeURIComponent(_cardId || '') + (CARD_PREVIEW ? '&preview=1' : '');
}

/* 주소에서 카드 id 읽기: /cards/<id> 또는 ?card=<id>. 상황 요약 ?summary=<id>는 'summary:<id>' */
function cardRouteId() {
  const m = location.pathname.match(/^\/cards\/([a-z0-9-]+)\/?$/);
  if (m) return m[1];
  const params = new URLSearchParams(location.search);
  const q = params.get('card');
  if (q && /^[a-z0-9-]+$/.test(q)) return q;
  const s = params.get('summary');
  return s && /^[a-z0-9-]+$/.test(s) ? 'summary:' + s : null;
}

function renderCardPage() {
  const root = document.getElementById('bc-root');
  if (!root) return;
  if (_cardKind === 'summary') {
    const s = summaryFind(_cardId);
    root.innerHTML = s ? summaryHTML(s) : cardMissingHTML();
  } else {
    const card = cardFind(_cardId);
    root.innerHTML = cardCanShow(card, CARD_PREVIEW) ? cardHTML(card) : cardMissingHTML();
  }
  const t = root.querySelector('.bc-title');
  if (t) setTimeout(function () { t.focus({ preventScroll: true }); }, 0);
}

function cardSetMeta(sel, attr, val) {
  const el = document.querySelector(sel);
  if (el) el.setAttribute(attr, val);
}

/* 상황 요약은 검색 노출에서 뺀다. 이 파일이 만든 robots 태그만 켜고 끈다 */
function cardSetNoindex(on) {
  let el = document.querySelector('meta[name="robots"][data-bc]');
  if (on && !el) {
    el = document.createElement('meta');
    el.setAttribute('name', 'robots');
    el.setAttribute('data-bc', '');
    el.setAttribute('content', 'noindex');
    document.head.appendChild(el);
  } else if (!on && el) {
    el.remove();
  }
}
/* 카드 화면을 떠날 때 (js/app.js showPage) */
function cardClearMeta() {
  cardSetNoindex(false);
}

function cardUpdateMeta() {
  let title, desc, url;
  if (_cardKind === 'summary') {
    const s = summaryFind(_cardId);
    title = (s ? s.title + ' · 상황 요약' : '찾는 카드가 없어요') + ' — BeInside';
    desc = SUMMARY_LEAD;
    url = CARD_SITE + '/';
    cardSetNoindex(true);
  } else {
    const card = cardFind(_cardId);
    const ok = cardCanShow(card, CARD_PREVIEW);
    title = ok ? card.title + ' — BeInside' : '찾는 카드가 없어요 — BeInside';
    desc = ok ? card.summary : '아기 첫 1년 상황 카드';
    url = CARD_SITE + (cardIsPublished(card) ? '/cards/' + card.id : '/');
    cardSetNoindex(false);
  }
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

/* 옛 가이드 자리 안에서 포커스를 옮길 요소 */
function cardFallbackTarget(fb) {
  const list = Array.prototype.slice.call(document.querySelectorAll(fb.focus));
  const hit = fb.text ? list.filter(function (el) { return el.textContent.indexOf(fb.text) !== -1; })[0] : list[0];
  return hit || null;
}

/* 포커스를 옮기고, 떠오르는 애니메이션이 끝난 뒤 내려간다 */
function cardFocusScroll(target) {
  if (!target) return;
  if (!target.hasAttribute('tabindex') && !/^(A|BUTTON|SUMMARY)$/.test(target.tagName)) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  const go = function () {
    target.scrollIntoView({ behavior: typeof scrollMotion === 'function' ? scrollMotion() : 'auto', block: 'start' });
  };
  /* 방금 보인 결과·아코디언은 위로 떠오르는 애니메이션 중이라, 끝난 뒤 위치로 내려가야 제목이 헤더에 가리지 않는다 */
  const moving = typeof document.getAnimations === 'function'
    ? document.getAnimations().filter(function (a) { const t = a.effect && a.effect.target; return t && t.contains && t.contains(target); })
    : [];
  if (!moving.length) { go(); return; }
  Promise.race([
    Promise.all(moving.map(function (a) { return a.finished.catch(function () {}); })),
    new Promise(function (r) { setTimeout(r, 900); }),
  ]).then(go);
}

/* 펼치고, 내려가고, 포커스를 옮긴다 */
function cardFallbackReveal(fb) {
  if (fb.page === 'growth' && typeof switchGuideTab === 'function') {
    switchGuideTab(fb.tab || 'child'); /* 앞서 아빠 탭을 열었어도 월령 가이드로 돌려놓는다 */
    if (fb.tab === 'dad' && typeof renderDadContent === 'function') renderDadContent('infant');
  }
  if (fb.toolkit) {
    const panel = document.getElementById(fb.toolkit);
    /* toggleToolkit은 따로 스크롤까지 해서 여기서는 클래스만 켠다 */
    document.querySelectorAll('.toolkit-panel.on, .toolkit-btn.on').forEach(function (el) { el.classList.remove('on'); });
    if (panel) panel.classList.add('on');
    const btn = document.querySelector('.toolkit-btn[onclick*="' + fb.toolkit + '"]');
    if (btn) btn.classList.add('on');
    const pill = fb.pill && panel && panel.querySelector('.age-pill');
    if (pill && typeof switchAgePill === 'function') switchAgePill(pill, fb.toolkit, fb.pill);
  }
  if (fb.acc) {
    const sec = document.querySelector((fb.tab === 'dad' ? '#dad-result ' : '#result ') + '[data-acc="' + fb.acc + '"]');
    const head = sec && sec.querySelector('.acc-header');
    if (head && typeof toggleAcc === 'function') toggleAcc(head, true);
  }
  cardFocusScroll(cardFallbackTarget(fb));
}

/* 첫 화면 자리: 날짜를 넣었으면 대시보드의 같은 내용(details)을 펼친다 */
function cardHomeReveal(fb) {
  const dash = document.getElementById('pp-dash');
  const onDash = dash && !dash.hidden;
  if (onDash && fb.dash) {
    const d = document.querySelector(fb.dash);
    if (d) { d.open = true; cardFocusScroll(d.querySelector('summary') || d); }
    return;
  }
  if (fb.focus) cardFocusScroll(document.querySelector(fb.focus));
}

/* 옛 가이드 자리로 이동 (CARD_FALLBACKS 키) */
function cardGo(key) {
  const fb = CARD_FALLBACKS[key];
  if (!fb) return;
  cardTrack('summary_go', { to: key });
  if (fb.page === 'postpartum' && key === 'check') { if (typeof ppOpenCheck === 'function') ppOpenCheck(); return; }
  if (fb.page === 'home') {
    if (typeof setMTab === 'function') setMTab('home');
    showPage('home', function () { cardHomeReveal(fb); });
    return;
  }
  const reveal = function () { cardFallbackReveal(fb); };
  if (fb.page === 'growth') {
    const months = fb.months !== undefined ? fb.months : cardBirthMonths();
    if (typeof qs === 'function') qs(months === null ? 0 : months, 'm', reveal);
    if (typeof setMTab === 'function') setMTab('growth');
    return;
  }
  if (typeof setMTab === 'function') setMTab(fb.page === 'postpartum' ? 'mind' : fb.page);
  showPage(fb.page, reveal);
}

/* 칩 → 게시 카드, 없으면 상황 요약. 둘 다 카드 템플릿 화면(page-card) */
function cardChip(key, from) {
  const chip = CARD_CHIPS.find(function (c) { return c.key === key; });
  if (!chip) return;
  const card = chip.card ? cardFind(chip.card) : null;
  const summary = summaryFind(chip.summary);
  const to = cardIsPublished(card) ? 'card' : summary ? 'summary' : chip.fallback;
  cardTrack('chip_click', { chip: key, from: from, to: to });
  if (to === 'card') { showCard(card.id); return; }
  if (to === 'summary') { showSummary(summary.id); return; }
  cardGo(chip.fallback);
}

/* ── 한 번만 거는 위임 이벤트 (앱·정적 페이지 공통) ── */
(function initCards() {
  if (typeof document === 'undefined') return;
  document.addEventListener('click', function (e) {
    const chip = e.target.closest('[data-bc-chip]');
    if (chip) { cardChip(chip.getAttribute('data-bc-chip'), chip.getAttribute('data-bc-from')); return; }
    const go = e.target.closest('[data-bc-go]');
    if (go && typeof showPage === 'function') { e.preventDefault(); cardGo(go.getAttribute('data-bc-go')); return; }
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
