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
  vm.runInContext(read('js/helplines.js'), ctx);
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

const isEmergency = r => r.className.includes('high') && r.innerHTML.includes('tel:109') && r.innerHTML.includes('sms:109');

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

/* ═══════ 5. 위기 연결층 (1단계) ═══════ */
describe('위기 연결층', () => {
  const html = read('index.html');

  it('모든 화면 상단 위기 바에 109 전화·문자와 119가 있음', () => {
    const bar = html.match(/<div class="crisis-bar"[\s\S]*?<\/div>/);
    assert.ok(bar, '위기 바가 없음');
    for (const href of ['tel:109', 'sms:109', 'tel:119']) assert.ok(bar[0].includes(`href="${href}"`), href);
  });

  it('helplines.js 번호가 공식 번호와 일치', () => {
    const ctx = {}; vm.createContext(ctx);
    vm.runInContext(read('js/helplines.js') + '\n;this.H = HELPLINES; this.tel = helplineTel; this.sms = helplineSms;', ctx);
    assert.equal(ctx.H.suicide.number, '109');
    assert.equal(ctx.H.mental.number, '1577-0199');
    assert.equal(ctx.H.emergency.number, '119');
    assert.equal(ctx.tel('mental'), 'tel:15770199');
    assert.equal(ctx.sms('suicide'), 'sms:109');
    assert.equal(ctx.sms('mental'), null);
  });

  it('체크 결과 "중간"에도 연결 번호가 있고, "낮음"에는 긴급 버튼이 없음', () => {
    const ctx = loadCheckTool();
    assert.match(ctx.checkConnectHTML('mid', false), /tel:15770199/);
    assert.equal(ctx.checkConnectHTML('low', false), '');
  });
});

/* ═══════ 6. 산후 동반자 홈 (2단계) ═══════ */
describe('산후 동반자 홈', () => {
  const html = read('index.html');
  function loadPp() {
    const store = {};
    const ctx = {
      document: { getElementById: () => null, querySelectorAll: () => [] },
      localStorage: { getItem: k => store[k] ?? null, setItem: (k, v) => { store[k] = v; }, removeItem: k => { delete store[k]; } },
      esc: s => s, setTimeout: () => 0,
    };
    vm.createContext(ctx);
    vm.runInContext(read('js/helplines.js'), ctx);
    vm.runInContext(read('js/pp-home.js') + '\n;this.STAGES = PP_STAGES; this.REPLY = PP_MOOD_REPLY; this.LINE = ppLineHTML;', ctx);
    return ctx;
  }

  it('첫 화면이 산후 홈이고, 기존 홈은 접혀서 보존됨', () => {
    assert.match(html, /id="pp-home"/);
    assert.match(html, /id="home-other" hidden/);
    assert.match(html, /aria-controls="home-other"/);
    assert.ok(html.indexOf('id="pp-home"') < html.indexOf('id="home-other"'));
  });

  it('출산 후 구간이 0~365일을 빈틈없이 덮음', () => {
    const { STAGES } = loadPp();
    let prev = -1;
    for (const s of STAGES) { assert.ok(s.maxDay > prev); assert.equal(s.lines.length, 3); prev = s.maxDay; }
    assert.equal(prev, 365);
  });

  it('"많이 힘들어요"는 109 전화·문자, 1577-0199, 119를 모두 보여줌', () => {
    const out = loadPp().REPLY.hard();
    for (const h of ['tel:109', 'sms:109', 'tel:15770199', 'tel:119']) assert.ok(out.includes(h), h);
  });

  it('산후 체크에 진단 라벨이 없음 (임상 검수자 없이 운영하는 동안)', () => {
    const src = read('js/data-guides-new.js');
    const block = src.slice(src.indexOf("id: 'ct_postpartum'"), src.indexOf("id: 'ct_postpartum'") + 2500);
    assert.doesNotMatch(block, /산후우울증 가능성이 높아요|진단됩니다/);
  });

  it('새 홈 스크립트가 로드되고 서비스워커 캐시에 포함됨', () => {
    assert.match(html, /src="js\/pp-home\.js"/);
    assert.match(html, /src="js\/helplines\.js"/);
    const sw = read('sw.js');
    assert.match(sw, /\/js\/pp-home\.js/);
    assert.match(sw, /\/js\/helplines\.js/);
  });
});

/* ═══════ 7. 문구 감수 반영 (reports/2026-09-copy-review.md §8) ═══════ */
describe('위기 문구 회귀 (정신과 감수 2026-09-25)', () => {
  const html = read('index.html');
  const flags = (html.match(/<details class="pp-details" id="pp-redflags">[\s\S]*?<\/details>/) || [''])[0];
  const COST = '상담 무료(통화료는 들 수 있어요)';

  function loadPp() {
    const ctx = {
      document: { getElementById: () => null, querySelectorAll: () => [] },
      localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
      esc: s => s, setTimeout: () => 0,
    };
    vm.createContext(ctx);
    vm.runInContext(read('js/helplines.js'), ctx);
    vm.runInContext(read('js/pp-home.js') + '\n;this.STAGES = PP_STAGES; this.REPLY = PP_MOOD_REPLY; this.LINE = ppLineHTML; this.MADLAN = MADLAN_URL;', ctx);
    return ctx;
  }
  /* 산후 체크 설정을 파일에서 그대로 꺼낸다 */
  function loadPostpartumCheck() {
    const ctx = {}; vm.createContext(ctx);
    const src = read('js/data-guides-new.js');
    vm.runInContext(src + '\n;this.PP = POSTPARTUM_DATA;', ctx);
    return ctx.PP.check;
  }

  it('"바로 연락해야 하는 신호": 119·109·1577-0199가 모두 누를 수 있는 링크', () => {
    assert.ok(flags, '신호 목록이 없음');
    for (const href of ['tel:119', 'tel:109', 'sms:109', 'tel:15770199']) assert.ok(flags.includes(`href="${href}"`), href);
  });

  it('119 칸에 계획·이미 한 행동·확대 자살 위험·옳게 느껴지는 생각·조증 신호가 있음', () => {
    const head119 = flags.indexOf('119 또는 응급실');
    const head109 = flags.indexOf('109, 지금');
    assert.ok(head119 >= 0 && head109 > head119);
    const box119 = flags.slice(head119, head109);
    for (const t of ['죽을 방법을 정했거나', '이미 자해했거나 약을 많이 먹었을 때', '아기와 함께 사라지는 게 낫다', '옳게 느껴지거나', '잠을 거의 안 자도 피곤하지 않고']) {
      assert.ok(box119.includes(t), `119 칸에 "${t}" 없음`);
    }
  });

  it('109 칸 안에도 119 경계 문장과 119 링크가 있음', () => {
    const box109 = flags.slice(flags.indexOf('109, 지금'), flags.indexOf('1577-0199 또는 보건소'));
    assert.match(box109, /방법까지 생각했거나[^<]*<a[^>]*href="tel:119"/);
  });

  it('산후 체크 긴급 안내: 첫 줄은 109 행동, 둘째 줄은 119, 침투 사고 안심은 맨 뒤', () => {
    const msg = loadPostpartumCheck().emergencyMsg;
    const lines = msg.split('<br>');
    assert.match(lines[0], /href="tel:109"/);
    assert.match(lines[1], /방법까지 생각했거나[\s\S]*href="tel:119"/, '119 줄이 빠짐 (정신과가 삭제를 반려함)');
    const reassure = msg.indexOf('행동하는 것과는 달라요');
    assert.ok(reassure > msg.indexOf('tel:119'), '침투 사고 안심 문장이 119 안내보다 앞에 있음');
    assert.equal(lines.findIndex(l => l.includes('행동하는 것과는 달라요')), lines.length - 1);
  });

  it('실제 산후 체크에서 긴급 문항을 누르면 109·119·1577-0199(비용 표기)가 모두 나옴', () => {
    const config = loadPostpartumCheck();
    const t = mount(config);
    t.click(0); t.click(config.emergencyIndex); t.click(1);
    const out = t.result.innerHTML;
    assert.ok(isEmergency(t.result));
    for (const h of ['tel:119', 'tel:15770199']) assert.ok(out.includes(h), h);
    assert.ok(out.includes(COST));
  });

  it('1577-0199 버튼·링크 옆에는 항상 "상담 무료(통화료는 들 수 있어요)"', () => {
    const ctx = loadCheckTool();
    assert.ok(vm.runInContext('HELPLINES.mental.desc', ctx).includes(COST));
    const blocks = [
      ...(flags.match(/<a[^>]*href="tel:15770199"[\s\S]*?<\/a>/g) || []),
      ...(loadPp().REPLY.hard().match(/<a[^>]*href="tel:15770199"[\s\S]*?<\/a>/g) || []),
      ...(ctx.checkConnectHTML('high', false).match(/<a[^>]*href="tel:15770199"[\s\S]*?<\/a>/g) || []),
    ];
    assert.ok(blocks.length >= 3);
    for (const b of blocks) assert.ok(b.includes(COST), b);
    assert.ok(ctx.checkConnectHTML('mid', false).includes(COST), '체크 "중간" 결과의 1577-0199에 비용 표기 없음');
    const pp = loadPostpartumCheck();
    for (const k of ['high', 'low']) {
      const a = pp.results[k].action;
      if (a.includes('1577-0199')) {
        assert.match(a, /href="tel:15770199"/, `산후 체크 ${k}: 1577-0199가 글자뿐`);
        assert.match(a, /상담 무료[^<]*통화료는 들 수 있어요/, `산후 체크 ${k}: 비용 표기 없음`);
      }
    }
  });

  it('시기별 3줄에 나오는 119·109·1577-0199는 누를 수 있는 버튼이 붙음', () => {
    const { STAGES, LINE } = loadPp();
    let seen = 0;
    for (const s of STAGES) for (const l of s.lines) {
      const text = typeof l === 'string' ? l : l.text;
      const m = text.match(/1577-0199|(?<![\d-])119(?![\d-])|(?<![\d-])109(?![\d-])/);
      if (!m) continue;
      seen++;
      const tel = 'tel:' + m[0].replace(/-/g, '');
      assert.ok(LINE(l).includes(`href="${tel}"`), `"${text}"의 ${m[0]}가 글자뿐`);
      if (m[0] === '1577-0199') assert.ok(LINE(l).includes(COST));
    }
    assert.ok(seen >= 2);
  });

  it('"아기가 잘 때 같이 자는" 문구가 없음 (영아 수면 안전)', () => {
    assert.doesNotMatch(read('js/pp-home.js'), /같이 자는/);
  });

  it('109 문자 버튼 바로 아래에 마들랜이 접히지 않고 보임 (sms:109 1차 출처 확인 전)', () => {
    const { REPLY, MADLAN } = loadPp();
    const hard = REPLY.hard();
    const sms = hard.indexOf('sms:109'), mad = hard.indexOf(MADLAN), det = hard.indexOf('<details');
    assert.ok(sms >= 0 && mad > sms && (det === -1 || mad < det), '"많이 힘들어요" 응답에서 마들랜이 숨어 있음');
    const high = loadCheckTool().checkConnectHTML('high', false);
    assert.ok(high.indexOf(MADLAN) > high.indexOf('sms:109'), '체크 결과에 마들랜 없음');
    const smsInHome = [...html.matchAll(/href="sms:109"/g)].map(m => m.index)
      .filter(i => i > html.indexOf('id="pp-home"') && i < html.indexOf('id="home-other"'));
    assert.ok(smsInHome.length >= 2);
    for (const i of smsInHome) {
      const after = html.slice(i, i + 600);
      assert.ok(after.includes(MADLAN) && !after.slice(0, after.indexOf(MADLAN)).includes('<details'), '홈의 109 문자 버튼 옆에 마들랜 없음');
    }
  });

  it('팔로업 배너("다시 오셨네요")와 긴급 페이지 방문 기록이 없음', () => {
    assert.doesNotMatch(html, /다시 오셨네요|followup-banner/);
    const app = read('js/app.js');
    assert.doesNotMatch(app, /beinside_crisis_visit|showFollowupBanner|closeFollowup/);
  });
});
