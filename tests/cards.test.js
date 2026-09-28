/* ═══════════════════════════════════════════════════════════
   BeInside 상황 카드 테스트 (육아 참고서)
   실행: node --test tests/cards.test.js
   카드 데이터(js/data-cards.js) · 렌더러(js/cards.js) · 정적 빌드(scripts/build-cards.mjs)를 검사한다.
   의학 정보 규칙(CLAUDE.md 방향 결정)과 안전 규칙이 카드에도 적용되는지 본다.
═══════════════════════════════════════════════════════════ */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { pathToFileURL } = require('node:url');

const ROOT = path.resolve(__dirname, '..');
const read = rel => fs.readFileSync(path.join(ROOT, rel), 'utf-8');

function load() {
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(read('js/helplines.js'), ctx);
  vm.runInContext(read('js/data-cards.js'), ctx);
  vm.runInContext(read('js/data-summaries.js'), ctx);
  /* 칩 이동을 DOM 없이 확인하려고 showPage만 흉내 낸다 */
  vm.runInContext('var __pages = []; function showPage(id) { __pages.push(id); }', ctx);
  vm.runInContext(read('js/cards.js')
    + '\n;this.api = { BI_CARDS, BI_SUMMARIES, SUMMARY_PLACES, SUMMARY_COLLECTED, HELPLINES, CARD_CHIPS, CARD_FALLBACKS, CARD_DISCLAIMER, CARD_REPORT_EMAIL,'
    + ' cardHTML, cardsListed, cardCanShow, summaryHTML, summaryItems, summaryFind, cardChip, cardPath,'
    + ' state: () => ({ kind: _cardKind, id: _cardId, pages: __pages.slice() }), reset: () => { __pages.length = 0; } };', ctx);
  return ctx.api;
}

const API = load();
const CARDS = API.BI_CARDS;
const SRC = read('js/data-cards.js');
const DATE = /^\d{4}-\d{2}-\d{2}$/;

/* 카드 안의 모든 문장 (출처 URL 제외) */
function texts(card) {
  const out = [card.title, card.summary, card.urgentLine || '', ...card.what, ...card.todo,
    ...card.hospital.now, ...card.hospital.soon, ...card.mom.feel, ...card.mom.problems];
  card.sources.forEach(s => out.push(s.name));
  return out.filter(Boolean);
}
/* 제목·요약을 뺀 본문 문장 (공유 미리보기용 평문인 제목·요약은 번호를 글자로 쓸 수 있다) */
function bodyTexts(card) {
  return texts(card).slice(2);
}
const plain = html => html.replace(/<[^>]+>/g, '').replace(/&#039;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
const clone = o => JSON.parse(JSON.stringify(o));

/* 데이터 파일을 카드별 블록(id 줄 ~ nextReview 줄)으로 나눈다. 카드 밖 머리 주석은 포함하지 않는다 */
function blocksById(src) {
  const out = {};
  const re = /^\s*id:\s*'([^']+)'/gm;
  let m;
  while ((m = re.exec(src))) {
    const end = src.indexOf('nextReview:', m.index);
    assert.ok(end !== -1, `${m[1]}: nextReview 줄이 없음`);
    out[m[1]] = src.slice(m.index, src.indexOf('\n', end));
  }
  return out;
}

/* ═══════ 1. 카드 형식 ═══════ */
describe('카드 형식', () => {
  it('카드가 1장 이상 있음', () => {
    assert.ok(CARDS.length > 0);
  });

  it('필수 필드가 모두 있고 비어 있지 않음', () => {
    const nonEmptyStr = v => typeof v === 'string' && v.trim().length > 0;
    const nonEmptyArr = v => Array.isArray(v) && v.length > 0 && v.every(nonEmptyStr);
    for (const c of CARDS) {
      const at = `카드 ${c.id}`;
      for (const k of ['id', 'title', 'summary', 'category', 'reviewed', 'nextReview']) assert.ok(nonEmptyStr(c[k]), `${at}: ${k} 없음`);
      assert.ok(['draft', 'published'].includes(c.status), `${at}: status는 'draft' 또는 'published'`);
      assert.equal(typeof c.urgent, 'boolean', `${at}: urgent는 true/false`);
      assert.ok(Array.isArray(c.ageDays) && c.ageDays.length === 2 && c.ageDays[0] >= 0 && c.ageDays[1] <= 365 && c.ageDays[0] < c.ageDays[1], `${at}: ageDays는 0~365 안의 [시작, 끝]`);
      for (const k of ['what', 'todo', 'more']) assert.ok(nonEmptyArr(c[k]), `${at}: ${k} 비어 있음`);
      assert.ok(c.hospital && nonEmptyArr(c.hospital.now) && nonEmptyArr(c.hospital.soon), `${at}: hospital.now·soon 비어 있음`);
      assert.ok(c.mom && nonEmptyArr(c.mom.feel) && nonEmptyArr(c.mom.problems), `${at}: mom.feel·problems 비어 있음`);
      assert.ok(Array.isArray(c.sources), `${at}: sources 없음`);
    }
  });

  it('id가 겹치지 않고 URL에 쓸 수 있는 모양', () => {
    const ids = CARDS.map(c => c.id);
    assert.equal(new Set(ids).size, ids.length, `겹치는 id: ${ids.filter((x, i) => ids.indexOf(x) !== i)}`);
    for (const id of ids) assert.match(id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `id "${id}"`);
  });

  it('출처가 2개 이상이고, 각각 이름·https url·확인 날짜·use가 있음', () => {
    for (const c of CARDS) {
      assert.ok(c.sources.length >= 2, `${c.id}: 출처 ${c.sources.length}개 (2개 이상)`);
      for (const s of c.sources) {
        assert.ok(s.name, `${c.id}: 출처 이름 없음`);
        assert.match(s.url || '', /^https:\/\/[^\s]+$/, `${c.id}: 출처 url (${s.name})`);
        assert.match(s.checked || '', DATE, `${c.id}: 출처 확인 날짜 (${s.name})`);
        assert.ok(['summary', 'link'].includes(s.use), `${c.id}: use는 summary 또는 link (${s.name})`);
      }
    }
  });

  it('reviewed·nextReview 날짜가 있고, 다음 확인은 12개월 안', () => {
    for (const c of CARDS) {
      assert.match(c.reviewed, DATE, `${c.id}: reviewed`);
      assert.match(c.nextReview, DATE, `${c.id}: nextReview`);
      const days = (new Date(c.nextReview) - new Date(c.reviewed)) / 86400000;
      assert.ok(days > 0 && days <= 366, `${c.id}: nextReview가 reviewed 뒤 12개월 안이 아님 (${days}일)`);
    }
  });

  it('게시 카드는 다음 확인 날짜가 지나지 않음 (지나면 다시 확인하고 날짜를 올린다)', () => {
    const today = new Date().toISOString().slice(0, 10);
    for (const c of CARDS.filter(c => c.status === 'published')) {
      assert.ok(c.nextReview >= today, `${c.id}: nextReview ${c.nextReview}가 지났음`);
    }
  });
});

/* ═══════ 2. 번호 연결 ═══════ */
describe('카드 번호 연결', () => {
  it('more의 모든 키가 HELPLINES에 있음', () => {
    for (const c of CARDS) for (const k of c.more) assert.ok(API.HELPLINES[k], `${c.id}: more "${k}"가 HELPLINES에 없음`);
  });

  it('문장 속 {{키}}가 모두 HELPLINES에 있음', () => {
    for (const c of CARDS) {
      for (const t of texts(c)) {
        for (const m of t.matchAll(/\{\{\s*([^}]*?)\s*\}\}/g)) assert.ok(API.HELPLINES[m[1]], `${c.id}: {{${m[1]}}}가 HELPLINES에 없음`);
      }
    }
  });

  it('본문 문장에는 전화번호를 숫자로 쓰지 않고 {{키}}로 씀', () => {
    const numbers = Object.values(API.HELPLINES).map(h => h.number.replace(/-/g, '-?'));
    const re = new RegExp('(?<![\\d.])(?:' + numbers.join('|') + ')(?![\\d℃])');
    for (const c of CARDS) for (const t of bodyTexts(c)) assert.doesNotMatch(t, re, `${c.id}: "${t.slice(0, 40)}…"`);
  });

  it('urgent 카드는 urgentLine에 {{emergency}}가 있음', () => {
    for (const c of CARDS.filter(c => c.urgent)) {
      assert.ok(c.urgentLine && c.urgentLine.includes('{{emergency}}'), `${c.id}: urgentLine에 {{emergency}} 없음`);
    }
  });
});

/* ═══════ 3. 의학 정보 규칙 ═══════ */
describe('카드 의학 정보 규칙', () => {
  it('1393이 없음 (자살예방상담전화는 109)', () => {
    for (const f of ['js/data-cards.js', 'js/cards.js', 'scripts/build-cards.mjs']) assert.doesNotMatch(read(f), /1393/, f);
  });

  it('약 용량 표현이 없음 (mg·ml·cc, /kg, 밀리그램, 용량)', () => {
    const bans = [/\d+(?:\.\d+)?\s*(?:mg|ml|cc)\b/i, /(?:mg|ml)\s*\/\s*kg/i, /밀리그램|밀리리터|kg\s*당|용량/];
    for (const c of CARDS) for (const t of texts(c)) for (const re of bans) assert.doesNotMatch(t, re, `${c.id}: "${t.slice(0, 40)}…"`);
  });

  it('약·제품 이름이 없음', () => {
    const PRODUCTS = ['타이레놀', '챔프', '부루펜', '맥시부펜', '세토펜', '써스펜', '콜대원', '애드빌', '이지엔', '어린이부루펜'];
    for (const c of CARDS) for (const t of texts(c)) for (const p of PRODUCTS) assert.ok(!t.includes(p), `${c.id}: 제품명 "${p}"`);
  });

  it('열 관련 카드에는 "3개월"과 "38"이 함께 있음 (생후 3개월 미만 38℃ 이상은 즉시 진료)', () => {
    const fever = CARDS.filter(c => /열이|발열|체온|℃/.test(texts(c).join(' ')));
    assert.ok(fever.some(c => c.id === 'fever'), 'fever 카드가 열 관련으로 잡히지 않음');
    for (const c of fever) {
      const all = texts(c).join(' ');
      assert.ok(all.includes('3개월') && all.includes('38'), `${c.id}: 열 관련인데 3개월·38 기준이 없음`);
    }
  });

  it('게시 카드의 출처는 use가 summary 또는 link', () => {
    for (const c of CARDS.filter(c => c.status === 'published')) {
      for (const s of c.sources) assert.ok(['summary', 'link'].includes(s.use), `${c.id}: ${s.name}`);
    }
  });

  it('"원문 미확인" 주석이 남은 카드는 published가 아님', () => {
    const blocks = blocksById(SRC);
    assert.deepEqual(Object.keys(blocks).sort(), Array.from(CARDS, c => c.id).sort(), '데이터 파일 블록과 BI_CARDS가 다름');
    for (const c of CARDS) {
      if (/원문\s*미확인/.test(blocks[c.id])) assert.notEqual(c.status, 'published', `${c.id}: 원문 미확인 주석이 남았는데 published`);
    }
  });
});

/* ═══════ 4. 렌더러 ═══════ */
describe('카드 렌더러', () => {
  const SECTIONS = ['무슨 일인지', '지금 할 일', '병원 갈 때', '이때 엄마가 흔히 느끼는 것', '더 도움이 필요하면', '출처'];

  it('칸 순서: (urgent면 119 줄) → 무슨 일인지 → 지금 할 일 → 병원 갈 때 → 엄마 → 더 도움 → 출처 → 고정 문구 → 틀린 곳 알려 주기', () => {
    for (const c of CARDS) {
      const html = API.cardHTML(c);
      const pos = SECTIONS.map(s => html.indexOf('>' + s + '<'));
      pos.forEach((p, i) => assert.ok(p !== -1, `${c.id}: "${SECTIONS[i]}" 칸 없음`));
      for (let i = 1; i < pos.length; i++) assert.ok(pos[i - 1] < pos[i], `${c.id}: "${SECTIONS[i - 1]}"이 "${SECTIONS[i]}"보다 뒤`);
      const disc = html.indexOf('bc-disclaimer');
      const report = html.indexOf('틀린 곳 알려 주기');
      assert.ok(pos[pos.length - 1] < disc && disc < report, `${c.id}: 고정 문구·제보 위치`);
      if (c.urgent) {
        const top = html.indexOf('bc-urgent');
        assert.ok(top !== -1 && top < pos[0], `${c.id}: 119 줄이 맨 위에 없음`);
        assert.match(html.slice(top, pos[0]), /class="bc-call bc-call--urgent" href="tel:119"/, `${c.id}: 맨 위 119 버튼 없음`);
      }
    }
  });

  it('고정 문구 "이 카드는 진료를 대신하지 않아요…"가 모든 카드에 있음', () => {
    const fixed = '이 카드는 진료를 대신하지 않아요. 걱정되면 소아청소년과나 119에 연락하세요.';
    for (const c of CARDS) assert.ok(plain(API.cardHTML(c)).includes(fixed), c.id);
  });

  it('{{키}}가 남지 않고, 모든 tel: 링크가 HELPLINES 번호이며, 번호마다 한 줄 설명이 있음', () => {
    const valid = new Set(Object.values(API.HELPLINES).map(h => h.number.replace(/-/g, '')));
    for (const c of CARDS) {
      const html = API.cardHTML(c);
      assert.doesNotMatch(html, /\{\{/, `${c.id}: 자리표시자가 남음`);
      const tels = [...html.matchAll(/href="tel:([^"]+)"/g)].map(m => m[1]);
      assert.ok(tels.length > 0);
      for (const t of tels) assert.ok(valid.has(t), `${c.id}: tel:${t}`);
      for (const key of new Set([...texts(c).join(' ').matchAll(/\{\{(\w+)\}\}/g)].map(m => m[1]).concat(c.more))) {
        assert.ok(html.includes(API.HELPLINES[key].desc), `${c.id}: ${key} 한 줄 설명 없음`);
      }
    }
  });

  it('더 도움이 필요하면: more 키마다 버튼, 109·119 고정 줄', () => {
    for (const c of CARDS) {
      const html = API.cardHTML(c);
      const more = html.slice(html.indexOf('>더 도움이 필요하면<'), html.indexOf('bc-foot'));
      for (const k of c.more) assert.ok(more.includes(`class="bc-call${k === 'emergency' ? ' bc-call--urgent' : ''}" href="tel:${API.HELPLINES[k].number.replace(/-/g, '')}"`), `${c.id}: ${k} 버튼`);
      assert.match(more, /href="tel:109"/);
      assert.match(more, /href="tel:119"/);
    }
  });

  it('출처는 이름·링크·확인일을 보여 주고, 틀린 곳 알려 주기는 운영자 메일', () => {
    for (const c of CARDS) {
      const html = API.cardHTML(c);
      for (const s of c.sources) {
        assert.ok(html.includes(`href="${s.url.replace(/&/g, '&amp;')}"`), `${c.id}: ${s.name} 링크`);
      }
      assert.ok(html.includes('확인 ' + c.sources[0].checked));
      assert.ok(html.includes('마지막 확인 ' + c.reviewed));
      assert.ok(html.includes('href="mailto:' + API.CARD_REPORT_EMAIL + '?subject='), `${c.id}: mailto`);
    }
    assert.match(read('index.html'), new RegExp('mailto:' + API.CARD_REPORT_EMAIL.replace('.', '\\.')), '운영자 메일이 index.html과 다름');
  });

  it('초안에는 "검토 중인 초안" 띠가 있고 공유 버튼이 없음, 게시 카드는 반대', () => {
    for (const c of CARDS) {
      const draft = API.cardHTML(Object.assign(clone(c), { status: 'draft' }));
      assert.ok(draft.includes('검토 중인 초안') && !draft.includes('data-bc-share'), `${c.id} draft`);
      const pub = API.cardHTML(Object.assign(clone(c), { status: 'published' }));
      assert.ok(!pub.includes('검토 중인 초안') && pub.includes('data-bc-share'), `${c.id} published`);
    }
  });
});

/* ═══════ 5. 초안 게이트 ═══════ */
describe('초안 게이트', () => {
  it('파일럿 3장은 draft (출처 원문 미확인)', () => {
    for (const id of ['fever', 'call-119', 'crying']) {
      const c = CARDS.find(c => c.id === id);
      assert.ok(c, id);
      assert.equal(c.status, 'draft', id);
    }
  });

  it('draft는 목록(cardsListed)에서 빠지고, ?preview=1일 때만 보임', () => {
    const listed = API.cardsListed().map(c => c.id);
    for (const c of CARDS) {
      assert.equal(listed.includes(c.id), c.status === 'published', c.id);
      if (c.status === 'draft') {
        assert.equal(API.cardCanShow(c, false), false, `${c.id}: preview 없이 보임`);
        assert.equal(API.cardCanShow(c, true), true, `${c.id}: preview로도 안 보임`);
      }
    }
    assert.equal(API.cardCanShow(null, true), false);
  });

  it('검색은 cardsListed()만 쓴다', () => {
    const src = read('js/search.js');
    assert.match(src, /cardsListed\(\)/);
    assert.doesNotMatch(src, /BI_CARDS/);
  });
});

/* ═══════ 6. 첫 화면·상황 칩 ═══════ */
describe('첫 화면과 상황 칩', () => {
  const html = read('index.html');

  it('랜딩 제목이 "아기 첫 1년, 이럴 땐 이렇게."이고 태그라인은 보조 문구로 남음', () => {
    assert.match(html, /<h1 class="pp-l-line" id="pp-l-title"[^>]*>아기 첫 1년,<br>이럴 땐 이렇게\.<\/h1>/);
    assert.match(html, /<p class="pp-l-tag">혼자라고 느낄 때, 가장 먼저 닿는 곳\.<\/p>/);
  });

  it('칩 6개가 정해진 이름이고, 연결 대상(카드 또는 요약, 자세한 안내)이 모두 정해져 있음', () => {
    assert.deepEqual(Array.from(API.CARD_CHIPS, c => c.label), ['열이 나요', '안 그치고 울어요', '밤에 안 자요', '잘 안 먹어요', '바로 119', '엄마가 힘들어요']);
    for (const c of API.CARD_CHIPS) {
      assert.ok(API.CARD_FALLBACKS[c.fallback], `${c.key}: fallback "${c.fallback}"가 CARD_FALLBACKS에 없음`);
      if (c.card) assert.ok(CARDS.some(x => x.id === c.card), `${c.key}: 카드 ${c.card} 없음`);
      assert.ok(c.card || c.summary, `${c.key}: 카드도 요약도 없음`);
    }
  });

  it('칩 6개가 모두 카드 템플릿 화면(page-card)으로 감: 게시 카드가 있으면 카드, 없으면 상황 요약', () => {
    for (const c of API.CARD_CHIPS) {
      API.reset();
      API.cardChip(c.key, 'test');
      const st = API.state();
      assert.deepEqual(Array.from(st.pages), ['card'], `${c.key}: page-card로 가지 않음 (${st.pages})`);
      const card = c.card && CARDS.find(x => x.id === c.card);
      if (card && card.status === 'published') {
        assert.equal(st.kind, 'card', c.key);
        assert.equal(st.id, card.id, c.key);
      } else {
        assert.equal(st.kind, 'summary', `${c.key}: 게시 카드가 없는데 요약으로 가지 않음`);
        const s = API.summaryFind(st.id);
        assert.ok(s && s.kind === 'summary', `${c.key}: 요약 ${st.id} 없음`);
        assert.equal(API.cardPath(), '/?summary=' + s.id, `${c.key}: 요약 경로`);
        assert.match(API.summaryHTML(s), /class="bc-title"/);
      }
    }
  });

  it('게시 카드가 생기면 칩은 그 카드로 감 (fixture: 열 카드 published)', () => {
    const fever = CARDS.find(c => c.id === 'fever');
    const was = fever.status;
    try {
      fever.status = 'published';
      API.reset();
      API.cardChip('fever', 'test');
      const st = API.state();
      assert.deepEqual(Array.from(st.pages), ['card']);
      assert.equal(st.kind, 'card');
      assert.equal(st.id, 'fever');
      assert.equal(API.cardPath(), '/cards/fever');
    } finally {
      fever.status = was;
    }
  });

  /* "자세한 안내"가 여는 옛 가이드 자리 (js/cards.js CARD_FALLBACKS 주석과 같다) */
  it('자세한 안내 도착점이 정해진 섹션임 (페이지 맨 위가 아님)', () => {
    const expected = {
      fever:   { page: 'growth', acc: 'firstaid', focus: '[data-fa="fever"]' },
      crying:  { page: 'growth', tab: 'dad', acc: 'dad-urgent', text: '울어요' },
      sleep:   { page: 'growth', toolkit: 'toolkit-sleep', focus: '#toolkit-sleep' },
      feeding: { page: 'growth', acc: 'body' },
      call119: { page: 'emergency', focus: '#emer-119-signs' },
      check:   { page: 'postpartum', focus: '#postpartum-check-wrap' },
      night:   { page: 'home', focus: '#pp-l-night', dash: '#pp-night' },
    };
    for (const [key, want] of Object.entries(expected)) {
      const got = API.CARD_FALLBACKS[key];
      assert.ok(got, key);
      for (const [k, v] of Object.entries(want)) assert.equal(got[k], v, `${key}.${k}`);
      assert.ok(got.focus, `${key}: 포커스를 옮길 곳이 없음`);
    }
    for (const c of API.CARD_CHIPS) {
      const s = API.summaryFind(c.summary);
      if (s) assert.equal(s.detail.go, c.fallback, `${c.key}: 요약의 자세한 안내와 칩 fallback이 다름`);
    }
  });

  it('"열이 나요" 자세한 안내는 3개월 미만 38℃ 기준이 있는 곳(고열 대처)으로 감', () => {
    const fb = API.CARD_FALLBACKS[API.CARD_CHIPS.find(c => c.key === 'fever').fallback];
    assert.notEqual(fb.page, 'emergency');
    assert.ok(fb.focus && fb.acc, 'fever: 섹션을 펼치고 포커스를 옮겨야 함');
    const render = read('js/render.js');
    const at = render.indexOf('data-fa="fever"');
    assert.ok(at !== -1, 'render.js 고열 대처에 data-fa="fever" 없음');
    const item = render.slice(at, render.indexOf('</div>\n', render.indexOf('</ul>', at)));
    assert.match(item, /3개월 미만 38℃ 이상 → 즉시 응급실/);
    assert.match(render, /accSection\('','응급처치 가이드'[^\n]*'firstaid'\)/);
  });

  it('칩이 펼치는 아코디언 키가 render.js에 있음', () => {
    const render = read('js/render.js');
    for (const fb of Object.values(API.CARD_FALLBACKS)) {
      if (fb.acc) assert.ok(render.includes(`'${fb.acc}')`), `render.js에 accSection 키 '${fb.acc}' 없음`);
    }
  });

  it('"바로 119" 도착점에 119 버튼과 3개월 미만 38℃ 기준이 있음', () => {
    const at = html.indexOf('id="emer-119-signs"');
    assert.ok(at !== -1);
    const block = html.slice(at, html.indexOf('</section>', at));
    assert.match(block, /href="tel:119"/);
    assert.match(block, /3개월 미만[^<]*38℃/);
    assert.ok(block.indexOf('tel:119') < block.indexOf('<ul'), '119 버튼이 신호 목록보다 먼저');
  });

  it('랜딩과 대시보드에 칩 자리가 있고, 스크립트가 app.js보다 먼저 로드됨', () => {
    assert.match(html, /data-bc-chips="landing"/);
    assert.match(html, /data-bc-chips="dash"/);
    const at = f => html.indexOf(`src="js/${f}"`);
    assert.ok(at('helplines.js') < at('cards.js') && at('data-cards.js') < at('cards.js') && at('cards.js') < at('app.js'), '스크립트 순서');
    assert.match(html, /id="page-card"/);
    assert.match(read('sw.js'), /'\/js\/cards\.js'/);
  });

  it('칩 클릭은 umami 이벤트(chip_click)를 보냄', () => {
    assert.match(read('js/cards.js'), /cardTrack\('chip_click'/);
  });

  it('카드·칩 CSS: 색은 변수만, 터치 44px, 긴급 56px', () => {
    const css = read('css/pages.css');
    const block = css.slice(css.indexOf('상황 카드 (육아 참고서)'));
    assert.ok(block.length > 100);
    assert.doesNotMatch(block, /#[0-9a-fA-F]{3,8}\b|rgba?\(/, '카드 CSS에 하드코딩 색상');
    const rule = sel => (block.match(new RegExp('(?:^|\\n)' + sel.replace(/[.-]/g, '\\$&') + '\\s*\\{([^}]*)\\}')) || [])[1] || '';
    const minH = sel => Number((rule(sel).match(/min-height:\s*(\d+)px/) || [])[1]);
    assert.ok(minH('.bc-chip') >= 44, '.bc-chip');
    assert.ok(minH('.bc-tool') >= 44, '.bc-tool');
    assert.ok(minH('.bc-call--urgent') >= 56, '.bc-call--urgent');
    assert.match(block, /\.bc-src a \{[^}]*min-height: 44px/);
  });
});

/* ═══════ 7. 정적 카드 페이지 ═══════ */
describe('정적 카드 페이지', () => {
  const importBuild = () => import(pathToFileURL(path.join(ROOT, 'scripts/build-cards.mjs')).href);

  it('생성물이 데이터와 동기화됨 (게시 카드 목록 = cards/ 폴더 목록, sitemap 포함)', async () => {
    const { GEN_MARK } = await importBuild();
    const published = Array.from(API.cardsListed(), c => c.id).sort();
    const dir = path.join(ROOT, 'cards');
    const built = fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name).sort() : [];
    assert.deepEqual(built, published, 'npm run build:cards를 돌리고 생성물을 커밋하세요');
    for (const id of built) assert.ok(read(`cards/${id}/index.html`).includes(GEN_MARK), id);

    const sitemap = read('sitemap.xml');
    assert.match(sitemap, /<!-- cards:start[\s\S]*<!-- cards:end -->/, 'sitemap에 카드 구간 표시가 없음 (npm run build:cards)');
    const inMap = [...sitemap.matchAll(/<loc>https:\/\/beinside\.kr\/cards\/([a-z0-9-]+)<\/loc>/g)].map(m => m[1]).sort();
    assert.deepEqual(inMap, published, 'sitemap의 카드 URL이 게시 카드와 다름');
  });

  it('package.json에 build:cards가 있고 Vercel buildCommand는 비어 있음', () => {
    assert.equal(JSON.parse(read('package.json')).scripts['build:cards'], 'node scripts/build-cards.mjs');
    assert.equal(JSON.parse(read('vercel.json')).buildCommand, '');
  });

  it('fixture(열 카드를 published로 바꾼 것)로 빌드하면 페이지·메타·JSON-LD·도크가 생기고, 되돌리면 지워짐', async () => {
    const { buildCards } = await importBuild();
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bi-cards-'));
    try {
      const outDir = path.join(tmp, 'cards');
      const sitemapPath = path.join(tmp, 'sitemap.xml');
      fs.writeFileSync(sitemapPath, read('sitemap.xml'));
      const fixture = CARDS.map(c => Object.assign(clone(c), { status: c.id === 'fever' ? 'published' : 'draft' }));
      const fever = fixture.find(c => c.id === 'fever');

      const r = buildCards({ cards: fixture, outDir, sitemapPath });
      assert.deepEqual(r.written, ['fever']);
      assert.deepEqual(fs.readdirSync(outDir), ['fever']);
      const page = fs.readFileSync(path.join(outDir, 'fever', 'index.html'), 'utf-8');
      const url = 'https://beinside.kr/cards/fever';
      assert.ok(page.includes(`<title>${fever.title} — BeInside</title>`), 'title');
      assert.ok(page.includes(`<meta name="description" content="${fever.summary}">`), 'description = summary');
      assert.ok(page.includes(`<meta property="og:title" content="${fever.title} — BeInside">`), 'og:title');
      assert.ok(page.includes(`<meta property="og:description" content="${fever.summary}">`), 'og:description');
      assert.ok(page.includes(`<meta property="og:url" content="${url}">`), 'og:url');
      assert.ok(page.includes('<meta property="og:image" content="https://beinside.kr/icons/og-image.png">'), 'og:image');
      assert.ok(page.includes(`<link rel="canonical" href="${url}">`), 'canonical');
      const ld = JSON.parse(page.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
      assert.equal(ld['@type'], 'MedicalWebPage');
      assert.equal(ld.lastReviewed, fever.reviewed);
      assert.equal(ld.citation.length, fever.sources.length);
      assert.ok(!('reviewedBy' in ld), '검수자가 없는데 reviewedBy가 있음');
      for (const href of ['tel:109', 'sms:109', 'tel:119']) assert.ok(page.includes(`class="crisis-dock`) && page.includes(`href="${href}"`), `도크 ${href}`);
      assert.ok(page.includes('href="/?card=fever"'), '앱에서 보기 링크');
      for (const css of ['/css/base.css', '/css/pages.css', '/css/dark.css']) assert.ok(page.includes(`href="${css}"`), css);
      assert.ok(plain(page).includes('이 카드는 진료를 대신하지 않아요.'), '고정 문구');
      assert.ok(!page.includes('검토 중인 초안'), '게시 카드에 초안 띠');
      assert.doesNotMatch(page, /\{\{|1393/);
      assert.match(fs.readFileSync(sitemapPath, 'utf-8'), /<loc>https:\/\/beinside\.kr\/cards\/fever<\/loc>/);

      const r2 = buildCards({ cards: fixture.map(c => Object.assign(c, { status: 'draft' })), outDir, sitemapPath });
      assert.deepEqual(r2.removed, ['fever']);
      assert.deepEqual(fs.readdirSync(outDir), []);
      assert.doesNotMatch(fs.readFileSync(sitemapPath, 'utf-8'), /\/cards\//);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });
});

describe('카드 임상 감수 고정 규칙', () => {
  it('모든 카드는 어딘가에 119({{emergency}}) 연결이 있다', () => {
    for (const c of CARDS) {
      const all = texts(c).join('\n') + '\n' + (c.more || []).join(',');
      assert.ok(all.includes('{{emergency}}') || (c.more || []).includes('emergency'), `${c.id}: 119 연결 없음`);
    }
  });
  it('울음 카드의 첫 할 일은 흔들기 금지다', () => {
    const c = CARDS.find(x => x.category === 'crying');
    assert.ok(c, '울음 카드 없음');
    assert.match(c.todo[0], /흔들/);
  });
  it('열 카드의 "지금 바로"에 3개월 미만 38℃ 기준이 있다', () => {
    const c = CARDS.find(x => x.id === 'fever');
    assert.ok(c, '열 카드 없음');
    const now = [c.urgentLine || '', ...c.hospital.now].join('\n');
    assert.match(now, /3개월/);
    assert.match(now, /38/);
  });
});

/* ═══════ 8. 상황 요약 (js/data-summaries.js) ═══════
   요약은 사이트에 이미 공개된 문장만 옮긴다. 문장마다 from: '파일#앵커'.
   대조 규칙: from 파일에서 앵커(id="앵커" 또는 앵커 글자)부터 12000자 안에, 태그를 지우고 공백을 하나로 줄인
   원문이 요약 문장을 그대로 품고 있어야 한다. {{키}}는 HELPLINES 번호로 바꿔 대조한다.
   허용 수정은 없다(원문 일부를 잘라 쓰는 것만). 어미를 다듬으려면 원문부터 고친다. */
describe('상황 요약', () => {
  const SUMS = API.BI_SUMMARIES;
  const WINDOW = 12000;
  const norm = s => String(s)
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'")
    .replace(/\\(['"])/g, '$1')
    .replace(/\s+/g, ' ').trim();
  const fill = s => String(s).replace(/\{\{(\w+)\}\}/g, (m, k) => (API.HELPLINES[k] ? API.HELPLINES[k].number : m));
  const cache = {};
  function sourceWindow(from) {
    const at = from.indexOf('#');
    assert.ok(at > 0, `from "${from}"은 '파일#앵커' 모양`);
    const file = from.slice(0, at);
    const anchor = from.slice(at + 1);
    const src = cache[file] || (cache[file] = read(file));
    let i = src.indexOf('id="' + anchor + '"');
    if (i === -1) i = src.indexOf(anchor);
    assert.ok(i !== -1, `${from}: 앵커를 ${file}에서 찾지 못함`);
    return norm(src.slice(i, i + WINDOW));
  }
  /* 요약의 모든 문장 항목 [{ where, t, from, label? }] */
  function items(s) {
    const out = [];
    const push = (where, x) => {
      if (x.q) { out.push({ where, t: x.q, from: x.from }); out.push({ where, t: x.a, from: x.from }); }
      else out.push({ where, t: x.t, from: x.from, label: x.label });
    };
    API.summaryItems(s).forEach(x => push(s.id, x));
    return out;
  }
  const allTexts = s => [s.title].concat(items(s).map(x => x.t), items(s).map(x => x.label).filter(Boolean));

  it('요약이 칩마다 있고, kind는 summary, 필수 칸이 있음', () => {
    assert.ok(Array.isArray(SUMS) && SUMS.length >= 6);
    const ids = SUMS.map(s => s.id);
    assert.equal(new Set(ids).size, ids.length, '겹치는 id');
    for (const s of SUMS) {
      assert.equal(s.kind, 'summary', s.id);
      assert.match(s.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      assert.ok(s.title && s.hospital && s.mom && Array.isArray(s.what) && Array.isArray(s.todo), s.id);
      assert.ok(Array.isArray(s.more) && s.more.length && s.more.every(k => API.HELPLINES[k]), `${s.id}: more`);
      assert.ok(s.detail && API.CARD_FALLBACKS[s.detail.go] && s.detail.label, `${s.id}: 자세한 안내`);
      if (s.urgent) assert.ok(s.urgentLine && s.urgentLine.t.includes('{{emergency}}'), `${s.id}: urgent면 맨 위 119 줄`);
    }
    for (const c of API.CARD_CHIPS) assert.ok(SUMS.some(s => s.id === c.summary), `칩 ${c.key}: 요약 ${c.summary} 없음`);
    assert.match(API.SUMMARY_COLLECTED, DATE);
  });

  it('요약의 모든 문장이 from 위치 원문에 실제로 있음 (공백 정규화 후 부분 일치)', () => {
    let n = 0;
    for (const s of SUMS) {
      for (const x of items(s)) {
        assert.ok(x.from, `${s.id}: from 없는 문장 "${String(x.t).slice(0, 30)}…"`);
        const win = sourceWindow(x.from);
        const want = norm(fill(x.t));
        assert.ok(want.length > 0, `${s.id}: 빈 문장`);
        assert.ok(win.includes(want), `${s.id}: "${want.slice(0, 50)}…"가 ${x.from} 원문에 없음`);
        if (x.label) assert.ok(win.includes(norm(x.label)), `${s.id}: 라벨 "${x.label}"이 ${x.from} 원문에 없음`);
        n++;
      }
    }
    assert.ok(n >= 40, `대조한 문장이 ${n}개뿐 — 검사 범위 확인`);
  });

  it('from마다 "이 요약에 모은 안내" 자리(SUMMARY_PLACES)가 있고, 사이트 안 링크이며 이동 키가 있음', () => {
    for (const s of SUMS) {
      for (const x of items(s)) {
        const p = API.SUMMARY_PLACES[x.from];
        assert.ok(p, `${s.id}: ${x.from}의 자리가 SUMMARY_PLACES에 없음`);
        assert.match(p.href, /^\/[a-z]*$/, `${x.from}: 사이트 안 링크`);
        assert.ok(API.CARD_FALLBACKS[p.go], `${x.from}: go "${p.go}"가 CARD_FALLBACKS에 없음`);
      }
    }
  });

  it('약 이름·용량이 없음 (제목·라벨 포함)', () => {
    const PRODUCTS = ['타이레놀', '챔프', '부루펜', '맥시부펜', '세토펜', '써스펜', '콜대원', '애드빌', '이지엔', '어린이부루펜', '아세트아미노펜', '이부프로펜', '덱시부프로펜'];
    const bans = [/\d+(?:\.\d+)?\s*(?:mg|ml|cc)\b/i, /(?:mg|ml)\s*\/\s*kg/i, /밀리그램|밀리리터|kg\s*당|용량|체중\s*기준/];
    for (const s of SUMS) {
      for (const t of allTexts(s)) {
        for (const p of PRODUCTS) assert.ok(!t.includes(p), `${s.id}: 제품명 "${p}"`);
        for (const re of bans) assert.doesNotMatch(t, re, `${s.id}: "${t.slice(0, 40)}…"`);
      }
    }
    assert.doesNotMatch(read('js/data-summaries.js'), /1393/);
  });

  it('문장 속 전화번호는 숫자가 아니라 {{키}} (제목·단계 이름 제외)', () => {
    const numbers = Object.values(API.HELPLINES).map(h => h.number.replace(/-/g, '-?'));
    const re = new RegExp('(?<![\\d.~])(?:' + numbers.join('|') + ')(?![\\d℃°])');
    for (const s of SUMS) {
      const titles = new Set([s.hospital.nowTitle, ...(s.hospital.tiers || []).map(t => t.title)].filter(Boolean));
      for (const x of API.summaryItems(s)) {
        if (titles.has(x)) continue;
        for (const t of [x.t, x.q, x.a].filter(Boolean)) assert.doesNotMatch(t, re, `${s.id}: "${t.slice(0, 40)}…"`);
      }
    }
  });

  it('울음 요약: 첫 할 일은 흔들기 금지, 흔들기를 권하는 옛 문장 없음, 아빠 탭 호칭 없음', () => {
    const s = API.summaryFind('crying');
    assert.match(s.todo[0].t, /흔들지/);
    for (const t of allTexts(s)) {
      assert.doesNotMatch(t, /리듬감|흔들어\s*주|흔들며|흔들기\s*\(/, `흔들기 권장: "${t}"`);
      assert.doesNotMatch(t, /아빠/, `아빠 호칭: "${t}"`);
    }
  });

  it('초안 카드와 어긋나는 옛 문장(경련 5분, 계속 토하면, 3시간 이상 울면, 해열제 투여 후 관찰)이 없음', () => {
    for (const s of SUMS) {
      for (const t of allTexts(s)) {
        assert.doesNotMatch(t, /5분\s*(?:넘게|이상)|계속 토하|3시간 이상|투여 후|지켜보기/, `${s.id}: "${t}"`);
      }
    }
  });

  it('열 요약: 맨 위 119 줄과 "지금 바로"에 3개월 미만 38℃ 기준', () => {
    const s = API.summaryFind('fever');
    assert.ok(s.urgent);
    const now = [s.urgentLine.t, ...s.hospital.now.map(x => x.t)].join('\n');
    assert.match(now, /3개월/);
    assert.match(now, /38/);
  });

  it('렌더: 라벨·칸 순서·119 줄·모은 안내·모은 날·진료 대체 아님·자세한 안내, 공유 버튼 없음', () => {
    const SECTIONS = ['무슨 일인지', '지금 할 일', null, '이때 엄마가 흔히 느끼는 것', '더 도움이 필요하면', '이 요약에 모은 안내'];
    const valid = new Set(Object.values(API.HELPLINES).map(h => h.number.replace(/-/g, '')));
    for (const s of SUMS) {
      const html = API.summaryHTML(s);
      const names = SECTIONS.map(n => n || s.hospitalTitle || '병원 갈 때');
      /* 요약은 모은 문장이 없는 칸을 숨긴다. 있는 칸끼리 순서만 지키고, 도움·모은 안내 칸은 항상 있다 */
      const allPos = names.map(n => html.indexOf('>' + n + '<'));
      assert.ok(allPos[4] !== -1 && allPos[5] !== -1, `${s.id}: 도움·모은 안내 칸 없음`);
      assert.ok(!html.includes('bc-empty'), `${s.id}: 빈 칸 안내가 보임`);
      const shown = allPos.map((p, i) => [p, names[i]]).filter(x => x[0] !== -1);
      for (let i = 1; i < shown.length; i++) assert.ok(shown[i - 1][0] < shown[i][0], `${s.id}: "${shown[i - 1][1]}"이 "${shown[i][1]}"보다 뒤`);
      const pos = allPos;
      const kicker = html.indexOf('상황 요약 · 사이트 안내를 모은 것');
      assert.ok(kicker !== -1 && kicker < html.indexOf('class="bc-title"'), `${s.id}: 제목 위 라벨`);
      assert.ok(html.includes('모은 날 ' + API.SUMMARY_COLLECTED), `${s.id}: 모은 날`);
      assert.ok(plain(html).includes('이 요약은 진료를 대신하지 않아요.'), `${s.id}: 진료 대체 아님`);
      assert.ok(!html.includes('data-bc-share') && !html.includes('공유하기'), `${s.id}: 공유 버튼`);
      assert.ok(!html.includes('>출처<') && !/target="_blank"[^>]*>[^<]*<span class="sr-only"> \(새 창\)<\/span><\/a> <span class="bc-src-date">/.test(html), `${s.id}: 공식 출처처럼 보이는 칸`);
      const detail = html.lastIndexOf('bc-detail');
      assert.ok(detail > pos[pos.length - 1] && html.slice(detail).includes('자세한 안내') && html.slice(detail).includes(`data-bc-go="${s.detail.go}"`), `${s.id}: 맨 아래 자세한 안내`);
      const places = html.slice(pos[pos.length - 1], html.indexOf('bc-dates'));
      assert.match(places, /<a href="\/[a-z]*" data-bc-go="/, `${s.id}: 모은 안내가 사이트 안 링크가 아님`);
      assert.doesNotMatch(html, /\{\{/, `${s.id}: 자리표시자가 남음`);
      for (const m of html.matchAll(/href="tel:([^"]+)"/g)) assert.ok(valid.has(m[1]), `${s.id}: tel:${m[1]}`);
      const more = html.slice(pos[4], pos[5]);
      assert.match(more, /href="tel:109"/);
      assert.match(more, /href="tel:119"/);
      if (s.urgent) {
        const top = html.indexOf('bc-urgent');
        assert.ok(top !== -1 && top < html.indexOf('class="bc-head"'), `${s.id}: 119 줄이 맨 위에 없음`);
        assert.match(html.slice(top, html.indexOf('class="bc-head"')), /class="bc-call bc-call--urgent" href="tel:119"/);
      } else {
        assert.ok(!html.includes('class="bc-urgent"'), `${s.id}: urgent가 아닌데 119 줄`);
      }
    }
  });

  it('"엄마가 힘들어요" 요약: 지금 할 일에 마음 신호 확인 버튼, 연락 기준 3단계(119·109·1577-0199)', () => {
    const s = API.summaryFind('mom');
    const html = API.summaryHTML(s);
    const todo = html.slice(html.indexOf('>지금 할 일<'), html.indexOf('>' + s.hospitalTitle + '<'));
    assert.match(todo, /data-bc-go="check"[^>]*>[\s\S]*마음 신호 확인/);
    const hosp = html.slice(html.indexOf('>' + s.hospitalTitle + '<'), html.indexOf('>이때 엄마가 흔히 느끼는 것<'));
    const at = n => hosp.indexOf(`href="tel:${n}"`);
    assert.ok(at('119') !== -1 && at('109') !== -1 && at('15770199') !== -1, '연락 기준 번호 버튼');
    assert.ok(at('119') < at('109') && at('109') < at('15770199'), '119 → 109 → 1577-0199 순서');
  });

  it('요약은 정적 빌드·사이트맵·검색에서 빠지고, 화면에서는 noindex', () => {
    assert.doesNotMatch(read('scripts/build-cards.mjs'), /data-summaries|BI_SUMMARIES/);
    assert.doesNotMatch(read('sitemap.xml'), /summary=/);
    assert.doesNotMatch(read('js/search.js'), /BI_SUMMARIES/);
    const src = read('js/cards.js');
    assert.match(src, /cardSetNoindex\(true\)/);
    assert.match(read('js/app.js'), /cardClearMeta\(\)/);
    const html = read('index.html');
    const at = f => html.indexOf(`src="js/${f}"`);
    assert.ok(at('data-summaries.js') !== -1 && at('data-summaries.js') < at('cards.js'), 'data-summaries.js가 cards.js보다 먼저');
    assert.match(read('sw.js'), /'\/js\/data-summaries\.js'/);
  });
});

/* ═══════ 9. 옛 가이드 겉모양 1단계 (성장·출산·산후·긴급) ═══════ */
describe('옛 가이드 공통 셸 (1단계)', () => {
  const html = read('index.html');
  const page = id => { const at = html.indexOf(`id="page-${id}"`); return html.slice(html.lastIndexOf('<div', at), html.indexOf('<!-- ══════════════ PAGE:', at)); };
  const EMOJI = /\p{Extended_Pictographic}/u;

  it('성장·출산·긴급 제목부가 .bc-head(고운바탕 제목)이고 분홍·모브 히어로가 없음', () => {
    for (const id of ['growth', 'birth', 'emergency']) {
      const p = page(id);
      assert.match(p, /class="page-view[^"]*guide-shell"/, `${id}: guide-shell`);
      assert.match(p, /<div class="bc-head">\s*<p class="bc-kicker">참고 가이드 · [^<]+<\/p>\s*<h1 class="bc-title"/, `${id}: 셸 제목부`);
      assert.doesNotMatch(p, /content-hero|class="page-header"|linear-gradient|#[0-9a-fA-F]{6}\b/, `${id}: 옛 히어로·하드코딩 색`);
    }
    assert.match(page('postpartum'), /class="page-view guide-shell"/);
    const np = read('js/new-pages.js');
    const pp = np.slice(np.indexOf('function renderPostpartumPage'), np.indexOf('/* ═══════ 갱년기 페이지'));
    assert.match(pp, /cardHeadHTML\(/);
    assert.doesNotMatch(pp, /content-hero|rgba\(|#[0-9a-fA-F]{6}\b|hero-postpartum/, '산후: 옛 히어로·하드코딩 색');
  });

  it('섹션 제목에 이모지가 없음 (성장·출산·산후·긴급)', () => {
    for (const id of ['growth', 'birth', 'emergency']) {
      for (const m of page(id).matchAll(/<(h[1-4])[^>]*>([\s\S]*?)<\/\1>|class="lt-label">([^<]*)</g)) {
        assert.doesNotMatch(m[2] || m[3], EMOJI, `${id}: "${(m[2] || m[3]).trim()}"`);
      }
    }
    /* 청소년 렌더러(renderTeenPage)는 손대지 않는다(운영자 결정) */
    const renderAll = read('js/render.js');
    const render = renderAll.slice(0, renderAll.indexOf('function renderTeenPage')) + renderAll.slice(renderAll.indexOf('/* ── 출산·산후 렌더링'));
    for (const m of render.matchAll(/accSection\('([^']*)'/g)) assert.equal(m[1], '', `accSection 아이콘 "${m[1]}"`);
    for (const m of render.matchAll(/<(h[2-4])[^>]*>([^<]*)</g)) assert.doesNotMatch(m[2], EMOJI, `render.js 제목 "${m[2]}"`);
    assert.doesNotMatch(render, /class="fa-item-icon"/);
    const np = read('js/new-pages.js');
    const pp = np.slice(np.indexOf('function renderPostpartumPage'), np.indexOf('/* ═══════ 갱년기 페이지'));
    for (const m of pp.matchAll(/_guideAccordion\('([^']*)'/g)) assert.doesNotMatch(m[1], EMOJI, `산후 섹션 "${m[1]}"`);
  });

  it('긴급 페이지 번호 버튼은 모두 .bc-call이고 119만 --urgent', () => {
    const p = page('emergency');
    const tels = [...p.matchAll(/<a (?:href="tel:([^"]+)" class="([^"]+)"|class="([^"]+)" href="tel:([^"]+)")/g)].map(m => ({ n: m[1] || m[4], cls: m[2] || m[3] }));
    assert.ok(tels.length >= 7, `번호 버튼 ${tels.length}개`);
    for (const t of tels.filter(t => t.cls !== 'tel-inline')) {
      assert.match(t.cls, /^bc-call( bc-call--urgent)?$/, `tel:${t.n} 클래스 ${t.cls}`);
      assert.equal(t.cls.includes('--urgent'), t.n === '119', `tel:${t.n}: --urgent는 119만`);
    }
    assert.doesNotMatch(p, /emer-row|emer-alt-row|pp-call/);
  });

  it('산후·출산 가이드 번호는 cardCallHTML(.bc-call)로, 글자로만 쓴 번호가 없음', () => {
    const np = read('js/new-pages.js');
    const pp = np.slice(np.indexOf('function renderPostpartumPage'), np.indexOf('/* ═══════ 갱년기 페이지'));
    assert.match(pp, /cardCallHTML\(\{ number: h\.number/);
    assert.doesNotMatch(pp, /help-card/);
    const render = read('js/render.js');
    const birth = render.slice(render.indexOf('function initBirth'));
    assert.match(birth, /cardCallHTML\('suicide'\)/);
    assert.doesNotMatch(birth, /<strong>109<\/strong>|<strong>1644-6621<\/strong>/);
  });

  it('셸 CSS는 토큰만 쓰고, 청소년·다문화 페이지는 건드리지 않음', () => {
    const css = read('css/pages.css');
    const block = css.slice(css.indexOf('옛 가이드 겉모양 1단계'));
    assert.ok(block.length > 500);
    assert.doesNotMatch(block, /#[0-9a-fA-F]{3,8}\b|rgba?\(/);
    assert.doesNotMatch(block, /teen|mc-|multicultural/);
    assert.doesNotMatch(page('teen'), /guide-shell/);
    assert.doesNotMatch(read('js/multicultural-page.js'), /guide-shell|bc-head/);
  });
});
