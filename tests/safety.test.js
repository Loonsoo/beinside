/* ═══════════════════════════════════════════════════════════
   BeInside 안전 회귀 테스트
   실행: node --test tests/
   사람의 생명과 직결되는 동작만 검사한다. 이 파일의 테스트가 깨지면 배포하지 않는다.
═══════════════════════════════════════════════════════════ */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const read = rel => fs.readFileSync(path.join(ROOT, rel), 'utf-8');

/* ── renderCheckTool을 돌리기 위한 최소 DOM 흉내 ── */
function makeEl() {
  const el = {
    children: [], handlers: {}, attrs: {}, style: {}, textContent: '', className: '',
    _html: '', _sub: {},
    classList: {
      _s: new Set(),
      add(c) { this._s.add(c); }, remove(c) { this._s.delete(c); }, contains(c) { return this._s.has(c); },
    },
    set innerHTML(v) { this._html = v; }, get innerHTML() { return this._html; },
    setAttribute(k, v) { this.attrs[k] = v; },
    appendChild(c) { this.children.push(c); return c; },
    addEventListener(t, fn) { this.handlers[t] = fn; },
    querySelector(sel) { return this._sub[sel] || (this._sub[sel] = makeEl()); },
    scrollIntoView() {},
  };
  return el;
}

function loadCheckTool() {
  const ctx = {
    document: { createElement: () => makeEl() },
    setTimeout: () => 0,
    curPage: 'home',
    localStorage: { getItem: () => null, setItem() {} },
    sessionStorage: { getItem: () => null, setItem() {} },
  };
  vm.createContext(ctx);
  vm.runInContext(read('js/utils.js'), ctx);
  vm.runInContext(read('js/features.js'), ctx);
  return ctx;
}

function mount(config) {
  const ctx = loadCheckTool();
  const container = makeEl();
  ctx.renderCheckTool(container, config);
  const wrap = container.children[0];
  const items = wrap.querySelector(`#${config.id}_items`).children;
  const result = wrap.querySelector(`#${config.id}_result`);
  return { click: i => items[i].handlers.click(), result };
}

const isEmergency = r => r.className.includes('high') && r.innerHTML.includes('tel:109');

/* ═══════ 1. 자가체크: 자해 문항이 체크되면 긴급 안내가 항상 이긴다 ═══════ */
describe('자가체크 긴급 안내 우선순위', () => {
  const config = {
    id: 'ct_test', title: 't',
    questions: ['a', 'b', 'c', '나를 해치고 싶다'],
    emergencyIndex: 3,
    results: {
      high: { label: 'HIGH', threshold: 3 },
      mid: { label: 'MID', threshold: 1 },
      low: { label: 'LOW', threshold: 0 },
    },
  };

  it('자해 문항만 체크하면 긴급 안내', () => {
    const t = mount(config);
    t.click(3);
    assert.ok(isEmergency(t.result));
  });

  it('자해 문항 체크 후 다른 문항을 더 눌러도 긴급 안내가 유지됨', () => {
    const t = mount(config);
    t.click(3);
    t.click(0);
    assert.ok(isEmergency(t.result), '다른 문항 체크가 긴급 안내를 덮어썼다');
  });

  it('다른 문항 먼저, 자해 문항 나중이어도 긴급 안내', () => {
    const t = mount(config);
    t.click(0);
    t.click(1);
    t.click(3);
    assert.ok(isEmergency(t.result));
  });

  it('다른 문항을 풀어도 긴급 안내가 유지됨', () => {
    const t = mount(config);
    t.click(0);
    t.click(3);
    t.click(0);
    assert.ok(isEmergency(t.result));
  });

  it('자해 문항을 풀면 일반 결과로 돌아감', () => {
    const t = mount(config);
    t.click(3);
    t.click(0);
    t.click(3);
    assert.ok(!isEmergency(t.result));
    assert.ok(t.result.innerHTML.includes('MID'));
  });
});

/* ═══════ 2. 긴급 문항이 있는 모든 체크툴이 실제로 그 문항을 가리키는지 ═══════ */
describe('체크툴 설정 무결성', () => {
  it('emergencyIndex가 질문 범위 안이고 자해·자살 문항을 가리킴', () => {
    const files = ['js/data-guides-new.js', 'js/data-guides-situational.js', 'js/data-guides-independence.js'];
    const risky = /해치|자해|죽|자살|사라지|살고 싶지|끝내|극단|차라리/;
    let seen = 0;
    for (const f of files) {
      const src = read(f);
      const re = /questions:\s*\[([^\]]*)\],\s*emergencyIndex:\s*(\d+)/g;
      let m;
      while ((m = re.exec(src))) {
        const qs = [...m[1].matchAll(/'((?:[^'\\]|\\.)*)'/g)].map(x => x[1]);
        const idx = Number(m[2]);
        assert.ok(idx < qs.length, `${f}: emergencyIndex ${idx}가 질문 수 ${qs.length}를 넘음`);
        assert.match(qs[idx], risky, `${f}: emergencyIndex가 위기 문항이 아닌 "${qs[idx]}"를 가리킴`);
        seen++;
      }
    }
    assert.ok(seen >= 10, `긴급 문항 체크툴을 ${seen}개만 찾음 — 패턴이 깨졌는지 확인`);
  });
});

/* ═══════ 3. 위기 번호 ═══════ */
describe('위기 번호', () => {
  const sources = ['index.html', ...fs.readdirSync(path.join(ROOT, 'js'))
    .filter(f => f.endsWith('.js')).map(f => 'js/' + f)];
  const all = sources.map(f => [f, read(f)]);

  it('폐지된 자살예방 번호 1393을 쓰지 않음 (2024년부터 109)', () => {
    for (const [f, src] of all) {
      const hits = src.match(/(?<![\d-])1393(?![\d-])/g);
      assert.equal(hits, null, `${f}에 1393이 남아 있음`);
    }
  });

  it('109가 tel: 링크로 존재', () => {
    assert.ok(all.some(([, s]) => s.includes('tel:109')));
  });
});

/* ═══════ 4. 청소년 페이지 정직성 + 빠른 나가기 ═══════ */
describe('청소년·학대 페이지 보호', () => {
  const html = read('index.html');
  const app = read('js/app.js');

  it('"기록에 남지 않아요"·"흔적이 남지 않아요" 같은 거짓 안심 문구가 없음', () => {
    assert.doesNotMatch(html, /기록에 남지 않아|흔적이 남지 않아/);
  });

  it('빠른 나가기 버튼과 함수가 존재', () => {
    assert.match(html, /id="quick-exit"[^>]*onclick="quickExit\(\)"/);
    assert.match(app, /function quickExit\(/);
    assert.match(app, /location\.replace\(/);
  });

  it('빠른 나가기가 청소년·긴급·관계·한부모 페이지에 켜짐', () => {
    const m = app.match(/QUICK_EXIT_PAGES\s*=\s*\[([^\]]+)\]/);
    assert.ok(m);
    for (const p of ['teen', 'emergency', 'relation', 'sp']) assert.ok(m[1].includes(`'${p}'`), p);
    assert.match(app, /updateQuickExit\(id\)/);
  });

  it('청소년 감정 제목이 정의된 색 변수를 씀 (배경에 묻히지 않음)', () => {
    assert.doesNotMatch(html, /--teen-ink/);
  });
});
