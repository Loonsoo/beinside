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
  vm.runInContext(read('js/cards.js')
    + '\n;this.api = { BI_CARDS, HELPLINES, CARD_CHIPS, CARD_DISCLAIMER, CARD_REPORT_EMAIL, cardHTML, cardsListed, cardCanShow };', ctx);
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

  it('칩 6개가 정해진 이름이고, 연결 대상이 모두 정해져 있음', () => {
    assert.deepEqual(Array.from(API.CARD_CHIPS, c => c.label), ['열이 나요', '안 그치고 울어요', '밤에 안 자요', '잘 안 먹어요', '바로 119', '엄마가 힘들어요']);
    for (const c of API.CARD_CHIPS) {
      assert.ok(['emergency', 'night', 'growth', 'check'].includes(c.fallback), `${c.key}: fallback`);
      if (c.card) assert.ok(CARDS.some(x => x.id === c.card), `${c.key}: 카드 ${c.card} 없음`);
    }
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
