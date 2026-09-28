/* ═══════════════════════════════════════════════════════════
   BeInside — 전면 동작 점검 (E2E, Playwright)
   실행: npm run e2e            (npm test에는 넣지 않는다. 브라우저가 필요해서)
         npm run e2e -- --write-report   → reports/2026-09-e2e-check.md의 결과 표를 갈아 끼운다
   환경 변수
   - E2E_BASE   이미 떠 있는 서버 주소. 없으면 python3 -m http.server를 직접 띄우고 끝나면 끈다
   - E2E_SHOTS  스크린샷 폴더 (기본: OS 임시 폴더/beinside-e2e)
   - PLAYWRIGHT_PATH  playwright index.mjs 경로 (기본: 설치된 'playwright' → /opt/node22 전역)
   검사 환경: 390×844 라이트, 390×844 다크(colorScheme), 1280×800 라이트
   - 외부 요청(통계·글꼴·카카오)은 빈 응답으로 바꾼다. 콘솔 에러는 이 사이트 코드에서 난 것만 센다
   - 옛 가이드 URL(/growth 등)은 vercel.json rewrites와 같게 index.html로 돌려준다
═══════════════════════════════════════════════════════════ */

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE_REPORT = process.argv.includes('--write-report');
const SHOTS = process.env.E2E_SHOTS || path.join(os.tmpdir(), 'beinside-e2e');
const REPORT = path.join(ROOT, 'reports/2026-09-e2e-check.md');
const PORT = 8000 + Math.floor(Math.random() * 900);

async function loadPlaywright() {
  try { return await import('playwright'); } catch (e) { /* 전역 설치로 */ }
  return import(process.env.PLAYWRIGHT_PATH || '/opt/node22/lib/node_modules/playwright/index.mjs');
}

/* ── 서버 ── */
async function startServer() {
  if (process.env.E2E_BASE) return { base: process.env.E2E_BASE.replace(/\/$/, ''), stop() {} };
  const proc = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1', '--directory', ROOT], { stdio: 'ignore' });
  const base = 'http://127.0.0.1:' + PORT;
  for (let i = 0; i < 50; i++) {
    try { const r = await fetch(base + '/index.html'); if (r.ok) break; } catch (e) { /* 아직 */ }
    await new Promise(r => setTimeout(r, 100));
  }
  return { base, stop() { proc.kill(); } };
}

const REWRITES = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf-8')).rewrites.map(r => r.source);
const GUIDE_PAGES = REWRITES.map(s => s.slice(1));
const MADLAN = 'https://pf.kakao.com/_DAxbYG';
const CHIPS = ['fever', 'crying', 'sleep', 'feeding', 'call119', 'mom'];

const CONFIGS = [
  { name: '390 라이트', viewport: { width: 390, height: 844 }, colorScheme: 'light', isMobile: true, hasTouch: true },
  { name: '390 다크', viewport: { width: 390, height: 844 }, colorScheme: 'dark', isMobile: true, hasTouch: true },
  { name: '1280', viewport: { width: 1280, height: 800 }, colorScheme: 'light' },
];

/* ── 결과 모음 ── */
const results = [];   // { area, name, cfg, ok, detail }
function record(area, name, cfg, ok, detail) {
  results.push({ area, name, cfg, ok: !!ok, detail: detail || '' });
}
async function check(area, name, cfg, fn) {
  try {
    const r = await fn();
    if (r === true || r === undefined) record(area, name, cfg, true);
    else record(area, name, cfg, false, typeof r === 'string' ? r : JSON.stringify(r));
  } catch (e) {
    record(area, name, cfg, false, String(e && e.message || e).split('\n')[0].slice(0, 200));
  }
}
function assert(cond, msg) { if (!cond) throw new Error(msg); }

/* ── 페이지 도우미 ── */
function isoDaysAgo(days) {
  const d = new Date(); d.setDate(d.getDate() - days);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

async function settle(page) {
  await page.waitForTimeout(250);
  let last = -1, same = 0;
  for (let i = 0; i < 60 && same < 3; i++) {
    const y = await page.evaluate(() => window.scrollY);
    same = y === last ? same + 1 : 0;
    last = y;
    await page.waitForTimeout(80);
  }
}

async function visible(page, sel) {
  return page.locator(sel).first().isVisible().catch(() => false);
}

/* 요소가 지금 화면(헤더 아래 ~ 도크 위) 안에 보이는지 */
async function inView(page, sel, textIncludes) {
  return page.evaluate(([s, t]) => {
    const all = Array.from(document.querySelectorAll(s));
    const el = t ? all.find(e => e.textContent.includes(t)) : all[0];
    if (!el) return false;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return false;
    const dock = document.getElementById('crisis-dock');
    const bottom = dock ? dock.getBoundingClientRect().top : innerHeight;
    return r.top >= 0 && r.top < bottom - 20;
  }, [sel, textIncludes || '']);
}

async function path_(page) {
  return page.evaluate(() => location.pathname + location.search);
}

async function shot(page, cfg, name, fullPage) {
  fs.mkdirSync(SHOTS, { recursive: true });
  const file = path.join(SHOTS, (cfg.name.replace(/\s+/g, '-') + '_' + name).replace(/[^\w가-힣.-]/g, '_') + '.png');
  await page.screenshot({ path: file, fullPage: !!fullPage }).catch(() => {});
}

/* 가로 넘침: 문서 폭이 화면 폭보다 넓으면 넘친 요소 몇 개를 알려 준다 */
async function overflow(page) {
  return page.evaluate(() => {
    const W = document.documentElement.clientWidth;
    if (document.documentElement.scrollWidth <= W + 1) return null;
    const bad = [];
    document.querySelectorAll('body *').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width && r.right > W + 1 && bad.length < 5) bad.push((el.id ? '#' + el.id : el.className ? '.' + String(el.className).split(' ')[0] : el.tagName) + ' r=' + Math.round(r.right));
    });
    return 'scrollWidth ' + document.documentElement.scrollWidth + ' > ' + W + ' ' + bad.join(', ');
  });
}

/* 44px 미만 터치 영역. 문장 속 링크(display:inline)와 tel-inline(::after로 44px)은 예외 */
async function smallTargets(page) {
  return page.evaluate(() => {
    const sel = 'a[href],button,input:not([type=hidden]),select,textarea,summary,[role=button],[role=checkbox],[role=radio],[role=tab],[tabindex="0"]';
    const out = [];
    const W = innerWidth;
    for (const el of document.querySelectorAll(sel)) {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      if (r.right <= 0 || r.left >= W || r.bottom < -2000) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.opacity === '0' || cs.pointerEvents === 'none') continue;
      if (el.closest('.sr-only')) continue;
      if (el.tagName === 'A' && cs.display === 'inline') continue;
      if (el.classList.contains('tel-inline')) continue;
      let box = r;
      const label = el.tagName === 'INPUT' ? el.closest('label') : null;
      if (label) box = label.getBoundingClientRect();
      if (box.width < 43.5 || box.height < 43.5) {
        const name = (el.getAttribute('aria-label') || el.textContent || el.id || el.className || el.tagName).trim().replace(/\s+/g, ' ').slice(0, 24);
        out.push(name + ' ' + Math.round(box.width) + '×' + Math.round(box.height));
      }
    }
    return out;
  });
}

/* 화면 상태마다 공통 검사: 가로 넘침·터치 영역 */
async function layoutChecks(page, cfg, where) {
  await check('공통', '가로 넘침 0 — ' + where, cfg, async () => {
    const o = await overflow(page);
    return o ? o : true;
  });
  await check('공통', '44px 미만 터치 영역 0 — ' + where, cfg, async () => {
    const s = await smallTargets(page);
    return s.length ? s.length + '개: ' + s.slice(0, 6).join(' / ') : true;
  });
}

/* ── 새 컨텍스트 ── */
async function newContext(browser, base, cfg, opts) {
  const ctx = await browser.newContext({
    viewport: cfg.viewport, colorScheme: cfg.colorScheme, isMobile: !!cfg.isMobile, hasTouch: !!cfg.hasTouch,
    serviceWorkers: 'block', locale: 'ko-KR', ...(opts || {}),
  });
  const origin = new URL(base).origin;
  await ctx.route('**/*', async route => {
    const req = route.request();
    const u = new URL(req.url());
    if (u.origin !== origin) {
      if (u.hostname === 'www.naver.com') {
        return route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>naver-e2e</title><p>naver</p>' });
      }
      const ext = (u.pathname.match(/\.(\w+)$/) || [])[1] || '';
      const type = { css: 'text/css', js: 'application/javascript', woff2: 'font/woff2', png: 'image/png', svg: 'image/svg+xml' }[ext] || 'text/plain';
      return route.fulfill({ status: 200, contentType: type, body: '' });
    }
    if (req.resourceType() === 'document' && REWRITES.includes(u.pathname)) {
      return route.continue({ url: origin + '/index.html' });
    }
    return route.continue();
  });
  return ctx;
}

function watchConsole(page, bag) {
  page.on('console', m => {
    if (m.type() !== 'error') return;
    const loc = m.location() && m.location().url || '';
    bag.push(m.text().slice(0, 160) + (loc ? ' @' + loc.replace(/^https?:\/\/[^/]+/, '') : ''));
  });
  page.on('pageerror', e => bag.push('pageerror: ' + String(e.message).slice(0, 160)));
}

async function openHome(page, base, birth) {
  await page.goto(base + '/');
  await page.evaluate(b => {
    try { if (b) localStorage.setItem('beinside_pp_birth_v1', b); else localStorage.removeItem('beinside_pp_birth_v1'); } catch (e) {}
  }, birth || '');
  await page.reload();
  await page.waitForSelector('#pp-home');
  await page.waitForTimeout(150);
}

/* ═══════ 흐름별 검사 ═══════ */

async function flowLanding(page, base, cfg) {
  const A = '랜딩';
  await openHome(page, base, '');
  await check(A, '하늘(해·달) 표시', cfg, async () => assert(await visible(page, '.pp-l-sky .pp-l-orb'), '하늘 없음'));
  await check(A, '제목·태그라인', cfg, async () => {
    const t = await page.textContent('#pp-l-title');
    assert(t.replace(/\s+/g, '').includes('아기첫1년,이럴땐이렇게.'), '제목: ' + t);
    assert((await page.textContent('.pp-l-tag')).includes('혼자라고 느낄 때, 가장 먼저 닿는 곳.'), '태그라인');
  });
  await shot(page, cfg, 'landing');
  await layoutChecks(page, cfg, '랜딩');

  await check(A, '"날짜 없이 둘러보기" → 새벽 3가지로 이동·포커스', cfg, async () => {
    await page.click('#pp-l-browse');
    await settle(page);
    assert(await inView(page, '#pp-l-night'), '#pp-l-night가 화면에 없음');
    assert(await page.evaluate(() => document.activeElement && document.activeElement.id === 'pp-l-night'), '포커스가 옮겨지지 않음');
  });

  await check(A, '"지금 많이 힘들어요" → 109가 먼저 보임', cfg, async () => {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.click('#pp-l-hard');
    await settle(page);
    assert(await visible(page, '#pp-l-reply'), '응답이 안 보임');
    const first = await page.getAttribute('#pp-l-reply a[href]', 'href');
    assert(first === 'tel:109', '첫 링크가 ' + first);
    assert(await inView(page, '#pp-l-reply a[href="tel:109"]'), '109 버튼이 화면 밖');
    assert(await page.getAttribute('#pp-l-hard', 'aria-expanded') === 'true', 'aria-expanded');
  });
  await shot(page, cfg, 'landing-hard');

  await check(A, '"태어난 날 넣고 지금 시기 보기" → 날짜 입력 → 대시보드', cfg, async () => {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.click('#pp-date-open');
    assert(await visible(page, '#pp-birth-input'), '날짜 입력이 안 열림');
    assert(await page.getAttribute('#pp-date-open', 'aria-expanded') === 'true', 'aria-expanded');
    await page.fill('#pp-birth-input', isoDaysAgo(45));
    await page.click('#pp-age-form button[type=submit]');
    await page.waitForTimeout(200);
    assert(await visible(page, '#pp-dash'), '대시보드가 안 보임');
    assert(!(await visible(page, '#pp-landing')), '랜딩이 남아 있음');
  });
}

async function flowDashboard(page, base, cfg) {
  const A = '대시보드';
  const days = 45;
  await openHome(page, base, isoDaysAgo(days));
  await check(A, 'N주째 표시', cfg, async () => {
    const t = await page.textContent('.pp-week');
    const want = Math.floor(days / 7) + 1 + '주째';
    assert(t.includes(want), t + ' (기대: ' + want + ')');
  });
  await check(A, '시간 띠 "지금" 1칸', cfg, async () => {
    const n = await page.locator('#pp-age .pp-band li[aria-current="step"]').count();
    assert(n === 1, 'aria-current 칸 ' + n + '개');
  });
  await shot(page, cfg, 'dashboard');
  await layoutChecks(page, cfg, '대시보드');

  for (const mood of ['ok', 'holding', 'hard']) {
    await check(A, '기분 버튼 "' + mood + '" aria-pressed와 응답', cfg, async () => {
      await page.click('.pp-mood-btn[data-pp-mood="' + mood + '"]');
      const pressed = await page.$$eval('.pp-mood-btn', bs => bs.map(b => b.dataset.ppMood + ':' + b.getAttribute('aria-pressed')));
      assert(pressed.filter(p => p.endsWith(':true')).length === 1 && pressed.includes(mood + ':true'), pressed.join(','));
      const html = await page.innerHTML('#pp-mood-result');
      assert(html.trim().length > 0, '응답 없음');
      if (mood === 'hard') assert((await page.getAttribute('#pp-mood-result a[href]', 'href')) === 'tel:109', '많이 힘들어요: 첫 링크가 109가 아님');
      if (mood === 'holding') assert(await page.evaluate(() => document.getElementById('pp-night').open), '버티는 중: 새벽 3가지가 안 열림');
    });
  }

  await check(A, '바로 연락해야 하는 신호 펼침', cfg, async () => {
    await page.click('#pp-redflags > summary');
    assert(await page.evaluate(() => document.getElementById('pp-redflags').open), '안 열림');
    assert(await visible(page, '#pp-redflags a[href="tel:119"]'), '119 버튼 안 보임');
    assert(await visible(page, '#pp-redflags a[href="tel:109"]'), '109 버튼 안 보임');
  });

  await check(A, '마음 신호 확인 → 산후 체크 열림', cfg, async () => {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.click('#pp-check-link');
    await page.waitForFunction(() => {
      const w = document.getElementById('postpartum-check-wrap');
      const h = w && w.closest('.accordion-item') && w.closest('.accordion-item').querySelector('.accordion-header');
      return h && h.getAttribute('aria-expanded') === 'true';
    }, null, { timeout: 4000 });
    await settle(page);
    assert((await path_(page)) === '/postpartum', '경로 ' + await path_(page));
    assert(await visible(page, '#postpartum-check-wrap .check-item'), '체크 문항 안 보임');
    assert(await inView(page, '#postpartum-check-wrap', ''), '체크가 화면 밖') ;
  });
  await shot(page, cfg, 'postpartum-check');
  await layoutChecks(page, cfg, '산후 마음 신호 확인');

  await check(A, '자해 문항 체크 → 다른 문항을 조작해도 긴급 결과', cfg, async () => {
    const items = page.locator('#postpartum-check-wrap .check-item');
    const n = await items.count();
    let self = -1;
    for (let i = 0; i < n; i++) if ((await items.nth(i).textContent()).includes('해치')) self = i;
    assert(self >= 0, '자해 문항 없음');
    const res = page.locator('#postpartum-check-wrap .check-result');
    const isEmergency = async () => {
      const h = await res.innerHTML();
      return /check-result high/.test(await res.getAttribute('class')) && h.includes('tel:109') && h.includes('전화나 문자로');
    };
    await items.nth(self).click();
    assert(await isEmergency(), '자해 문항만 체크: 긴급 결과 아님');
    for (let i = 0; i < n; i++) if (i !== self) { await items.nth(i).click(); assert(await isEmergency(), '문항 ' + i + ' 체크 후 긴급 결과가 내려감'); }
    for (let i = 0; i < n; i++) if (i !== self) { await items.nth(i).click(); assert(await isEmergency(), '문항 ' + i + ' 해제 후 긴급 결과가 내려감'); }
  });

  await check(A, '뒤로 가기로 대시보드 복귀', cfg, async () => {
    await page.goBack();
    await page.waitForTimeout(400);
    assert((await path_(page)) === '/', '경로 ' + await path_(page));
    assert(await visible(page, '#pp-dash'), '대시보드 안 보임');
  });

  await check(A, '날짜 지우기 → 랜딩', cfg, async () => {
    await page.click('#pp-birth-reset');
    await page.waitForTimeout(150);
    assert(await visible(page, '#pp-landing'), '랜딩 안 보임');
    assert(!(await page.evaluate(() => localStorage.getItem('beinside_pp_birth_v1'))), '저장값이 남음');
  });
}

/* 칩 도착점: 모두 카드 템플릿 화면(page-card). 게시 카드가 없으면 상황 요약 /?summary=<id> (js/cards.js CARD_CHIPS) */
const CHIP_URGENT = { fever: true, call119: true };

/* 요약 맨 아래 "자세한 안내"의 도착점: js/cards.js CARD_FALLBACKS와 같다 */
const DETAIL_EXPECT = {
  fever:   { path: '/growth', focus: '[data-fa="fever"]', open: () => !!document.querySelector('#result [data-acc="firstaid"] .acc-body.open') },
  crying:  { path: '/', focus: '#pp-l-night', dashFocus: '#pp-night > summary', open: () => { const d = document.getElementById('pp-dash'); return !d || d.hidden || document.getElementById('pp-night').open; } },
  sleep:   { path: '/growth', focus: '#toolkit-sleep', open: () => document.getElementById('toolkit-sleep').classList.contains('on') && getComputedStyle(document.getElementById('sleep-infant')).display !== 'none' },
  feeding: { path: '/growth', focus: '[data-acc="body"] .acc-header', open: () => !!document.querySelector('#result [data-acc="body"] .acc-body.open') },
  call119: { path: '/emergency', focus: '#emer-119-signs', open: () => true, alsoSee: '#emer-119-signs a[href="tel:119"]' },
  mom:     { path: '/postpartum', focus: '.accordion-header', text: '자가 체크', open: () => { const w = document.getElementById('postpartum-check-wrap'); const h = w && w.closest('.accordion-item').querySelector('.accordion-header'); return !!h && h.getAttribute('aria-expanded') === 'true'; } },
};

/* 대상이 화면 안에 있고, 윗부분이 고정 헤더·제목 줄에 가려지지 않았는지 */
async function focusedAndVisible(page, sel, text) {
  const f = await page.evaluate(([s, t]) => {
    const all = Array.from(document.querySelectorAll(s));
    const el = t ? all.find(e => e.textContent.includes(t)) : all.find(e => e.getBoundingClientRect().height > 0);
    if (!el) return 'no-target';
    const a = document.activeElement;
    return el === a || el.contains(a) ? 'ok' : 'focus=' + (a && (a.id || a.className || a.tagName));
  }, [sel, text || '']);
  assert(f === 'ok', '포커스: ' + f);
  assert(await inView(page, sel, text), '대상이 화면 밖');
  const cover = await page.evaluate(([s, t]) => {
    const all = Array.from(document.querySelectorAll(s));
    const el = t ? all.find(e => e.textContent.includes(t)) : all.find(e => e.getBoundingClientRect().height > 0);
    const r = el.getBoundingClientRect();
    const hit = document.elementFromPoint(r.left + Math.min(40, r.width / 2), r.top + 12);
    return hit && (el.contains(hit) || hit.contains(el)) ? 'ok' : (hit && (hit.id || hit.className || hit.tagName));
  }, [sel, text || '']);
  assert(cover === 'ok', '대상 윗부분이 가려짐: ' + cover);
}

async function flowChips(page, base, cfg, from) {
  const A = '상황 칩 (' + (from === 'landing' ? '랜딩' : '대시보드') + ')';
  for (const key of CHIPS) {
    await openHome(page, base, from === 'dash' ? isoDaysAgo(45) : '');
    await check(A, key + ' → 상황 요약 화면(카드 템플릿)', cfg, async () => {
      await page.click('[data-bc-chip="' + key + '"][data-bc-from="' + from + '"]');
      await page.waitForTimeout(300);
      await settle(page);
      assert((await path_(page)) === '/?summary=' + key, '경로 ' + await path_(page));
      assert(await visible(page, '#page-card .bc--summary'), '요약 화면 안 보임');
      const kicker = await page.textContent('#page-card .bc-kicker');
      assert(kicker.includes('상황 요약 · 사이트 안내를 모은 것'), '라벨: ' + kicker);
      await focusedAndVisible(page, '#page-card .bc-title');
      const heads = await page.$$eval('#page-card .bc-sec > .bc-h', hs => hs.map(h => h.textContent.trim()));
      assert(heads[0] === '무슨 일인지' && heads[1] === '지금 할 일' && heads[3] === '이때 엄마가 흔히 느끼는 것' && heads[4] === '더 도움이 필요하면', '칸 순서: ' + heads.join(' / '));
      if (CHIP_URGENT[key]) assert(await inView(page, '#page-card .bc-urgent a[href="tel:119"]'), '맨 위 119 버튼이 첫 화면에 없음');
      else assert(!(await visible(page, '#page-card .bc-urgent')), 'urgent가 아닌데 119 줄');
      if (key === 'mom') assert(await visible(page, '#page-card [data-bc-go="check"]'), '마음 신호 확인 버튼 없음');
      assert(await visible(page, '#page-card .bc-detail a[data-bc-go]'), '자세한 안내 버튼 없음');
      assert(!(await visible(page, '#page-card [data-bc-share]')), '요약에 공유 버튼');
      const robots = await page.getAttribute('meta[name="robots"]', 'content').catch(() => null);
      assert(robots === 'noindex', 'noindex 아님: ' + robots);
      const tels = await page.$$eval('#page-card a[href^="tel:"]', as => as.map(a => a.getAttribute('href')));
      assert(tels.includes('tel:119') && tels.includes('tel:109'), 'tel: ' + tels.join(','));
    });
    if (from === 'landing') {
      await shot(page, cfg, 'chip-' + key);
      await shot(page, cfg, 'chip-' + key + '-full', true);
      await layoutChecks(page, cfg, '상황 요약 ' + key);
    }
    await check(A, key + ' → 뒤로 가기로 첫 화면 복귀', cfg, async () => {
      await page.goBack();
      await page.waitForTimeout(400);
      assert((await path_(page)) === '/', '경로 ' + await path_(page));
      assert(await visible(page, from === 'dash' ? '#pp-dash' : '#pp-landing'), '첫 화면 안 보임');
      const robots = await page.$('meta[name="robots"][data-bc]');
      assert(!robots, '요약을 떠났는데 noindex가 남음');
    });
    /* 요약 맨 아래 "자세한 안내" → 옛 가이드 해당 섹션 */
    await check(A, key + ' → 자세한 안내 → ' + DETAIL_EXPECT[key].path + ' 해당 섹션 열림·포커스', cfg, async () => {
      const want = DETAIL_EXPECT[key];
      await page.goto(base + '/?summary=' + key);
      await page.waitForTimeout(400);
      await page.click('#page-card .bc-detail a[data-bc-go]');
      await page.waitForTimeout(300);
      await settle(page);
      await page.waitForTimeout(200);
      await settle(page);
      assert((await path_(page)) === want.path, '경로 ' + await path_(page));
      assert(await page.evaluate(want.open), '섹션이 펼쳐지지 않음');
      const onDash = await page.evaluate(() => { const d = document.getElementById('pp-dash'); return !!d && !d.hidden; });
      await focusedAndVisible(page, onDash && want.dashFocus ? want.dashFocus : want.focus, want.text);
      if (want.path !== '/') assert(await page.evaluate(() => window.scrollY > 0), '페이지 맨 위에 멈춤');
      if (want.alsoSee) assert(await inView(page, want.alsoSee), want.alsoSee + ' 화면 밖');
    });
    if (from === 'landing' && key === 'fever') await layoutChecks(page, cfg, '성장 가이드(열 자세한 안내)');
    if (from === 'landing' && key === 'call119') await layoutChecks(page, cfg, '긴급 페이지(119 자세한 안내)');
  }
}

async function dockOk(page) {
  const hrefs = await page.$$eval('#crisis-dock a', as => as.map(a => a.getAttribute('href')));
  for (const h of ['tel:109', 'sms:109', 'tel:119', MADLAN]) if (!hrefs.includes(h)) return 'href 없음: ' + h;
  if (!(await visible(page, '#crisis-dock'))) return '도크 안 보임';
  /* 도크 버튼 가운데 점이 도크 자신인지 (모달·시트에 가려지지 않았는지) */
  const covered = await page.evaluate(() => {
    const bad = [];
    document.querySelectorAll('#crisis-dock .crisis-dock-btn').forEach(b => {
      const r = b.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      if (!hit || !b.contains(hit) && hit !== b) bad.push(b.getAttribute('href') + '←' + (hit && (hit.id || hit.className)));
    });
    return bad;
  });
  return covered.length ? '가려짐: ' + covered.join(', ') : true;
}

async function flowDockAndMenu(page, base, cfg) {
  const A = '도크';
  await openHome(page, base, '');
  await check(A, '첫 화면에서 보이고 tel:109·sms:109·tel:119·마들랜', cfg, () => dockOk(page));

  await check(A, '메뉴 시트 위에서도 보임', cfg, async () => {
    await page.click('#menu-btn');
    await page.waitForTimeout(250);
    const r = await dockOk(page);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    return r;
  });
  const overlays = [['settings', '설정 패널'], ['search', '검색 모달'], ['profile', '프로필 모달'], ['source', '출처 서랍']];
  for (const [act, label] of overlays) {
    await check(A, label + ' 위에서도 보임', cfg, async () => {
      await page.click('#menu-btn');
      await page.waitForTimeout(200);
      await page.click('[data-menu-act="' + act + '"]');
      await page.waitForTimeout(450);
      const r = await dockOk(page);
      if (act === 'settings') await shot(page, cfg, 'settings');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(250);
      return r;
    });
  }

  /* 메뉴 항목 */
  const M = '메뉴';
  const gos = await page.$$eval('#hdr-menu [data-menu-go]', bs => bs.map(b => b.dataset.menuGo));
  for (const go of gos) {
    await check(M, '"' + go + '" 항목 → 목적 페이지', cfg, async () => {
      await openHome(page, base, '');
      await page.click('#menu-btn');
      await page.waitForTimeout(200);
      await page.click('#hdr-menu [data-menu-go="' + go + '"]');
      await page.waitForTimeout(450);
      const want = go === 'home' ? '/' : '/' + go;
      assert((await path_(page)) === want, '경로 ' + await path_(page));
      if (go !== 'home') assert(await visible(page, '#page-' + go), '#page-' + go + ' 안 보임');
      if (go !== 'home') {
        await page.goBack();
        await page.waitForTimeout(400);
        assert((await path_(page)) === '/', '뒤로 가기 후 경로 ' + await path_(page));
      }
    });
  }
  await check(M, '"다른 상황 모두 보기" → 첫 화면 목록 펼침', cfg, async () => {
    await openHome(page, base, '');
    await page.click('#menu-btn');
    await page.waitForTimeout(200);
    await page.click('#hdr-menu [data-menu-other]');
    await page.waitForTimeout(500);
    assert(await visible(page, '#home-other'), '#home-other 안 보임');
  });

  /* 옛 가이드 URL 직접 접근 + 도크 */
  for (const p of GUIDE_PAGES) {
    await check(M, '/' + p + ' 직접 접근', cfg, async () => {
      await page.goto(base + '/' + p);
      await page.waitForTimeout(450);
      assert(await visible(page, '#page-' + p), '#page-' + p + ' 안 보임');
      const txt = (await page.textContent('#page-' + p)).trim();
      assert(txt.length > 20, '내용이 비어 있음');
      /* 흰 글자 히어로에 배경이 있는지 (배경 없이 흰 글자면 안 보인다) */
      const bare = await page.$$eval('#page-' + p + ' .content-hero', els => els.filter(el => {
        const cs = getComputedStyle(el);
        return cs.backgroundImage === 'none' && /rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor) && /255, 255, 255/.test(cs.color);
      }).length);
      assert(bare === 0, '배경 없는 흰 글자 제목 ' + bare + '개');
      const d = await dockOk(page);
      assert(d === true, '도크: ' + d);
    });
    if (['growth', 'birth', 'postpartum', 'emergency'].includes(p)) {
      await check(M, '/' + p + ' 공통 셸 제목부(고운바탕)·배경 없음', cfg, async () => {
        const r = await page.evaluate(id => {
          const t = document.querySelector('#page-' + id + ' .bc-head .bc-title');
          if (!t) return 'bc-title 없음';
          const head = t.closest('.bc-guide-head');
          const cs = getComputedStyle(head);
          if (!/Gowun Batang/.test(getComputedStyle(t).fontFamily)) return '제목 글꼴 ' + getComputedStyle(t).fontFamily;
          if (cs.backgroundImage !== 'none') return '제목부 배경 ' + cs.backgroundImage;
          return document.querySelector('#page-' + id + ' .content-hero') ? '옛 히어로가 남음' : true;
        }, p);
        return r;
      });
      await shot(page, cfg, 'guide-' + p, true);
    }
    await layoutChecks(page, cfg, '/' + p);
  }
  await check(M, '/birth 증상 "예" 결과의 번호가 tel: 링크', cfg, async () => {
    await page.goto(base + '/birth');
    await page.waitForTimeout(450);
    const yes = page.locator('#page-birth .sym-yes');
    const n = await yes.count();
    assert(n > 0, '증상 버튼 없음');
    for (let i = 0; i < n; i++) await yes.nth(i).click();
    const bad = await page.$$eval('#page-birth .symptom-result', rs => rs.filter(r => /(^|[^\d])(119|109)(?!\d)/.test(r.textContent) && !r.querySelector('a[href^="tel:"]')).length);
    assert(bad === 0, '번호가 링크가 아닌 결과 ' + bad + '개');
  });
  await check(M, '옛 URL에서 뒤로 가기', cfg, async () => {
    await page.goto(base + '/growth');
    await page.waitForTimeout(400);
    await page.goto(base + '/emergency');
    await page.waitForTimeout(400);
    await page.goBack();
    await page.waitForTimeout(400);
    assert((await path_(page)) === '/growth' && await visible(page, '#page-growth'), '경로 ' + await path_(page));
  });
}

async function flowQuickExit(browser, base, cfg, consoleBag) {
  const A = '빠른 나가기';
  for (const p of ['teen', 'emergency', 'relation', 'sp']) {
    await check(A, '/' + p + ' 에서 보이고 누르면 이동(replace)', cfg, async () => {
      const ctx = await newContext(browser, base, cfg);
      const page = await ctx.newPage();
      watchConsole(page, consoleBag);
      await page.goto(base + '/');
      await page.goto(base + '/' + p);
      await page.waitForTimeout(450);
      assert(await visible(page, '#quick-exit'), '버튼 안 보임');
      const before = await page.evaluate(() => history.length);
      await Promise.all([page.waitForURL(/naver\.com/, { timeout: 4000 }), page.click('#quick-exit')]);
      const after = await page.evaluate(() => history.length);
      await ctx.close();
      assert(after === before, 'history.length ' + before + '→' + after + ' (replace가 아님)');
    });
  }
  await check(A, '첫 화면에서는 숨김', cfg, async () => {
    const ctx = await newContext(browser, base, cfg);
    const page = await ctx.newPage();
    await page.goto(base + '/');
    await page.waitForTimeout(200);
    const v = await visible(page, '#quick-exit');
    await ctx.close();
    assert(!v, '첫 화면에 보임');
  });
}

async function flowCards(page, base, cfg) {
  const A = '카드';
  for (const id of ['fever', 'call-119', 'crying']) {
    await check(A, '?card=' + id + '&preview=1 렌더', cfg, async () => {
      await page.goto(base + '/?card=' + id + '&preview=1');
      await page.waitForTimeout(400);
      assert(await visible(page, '#page-card .bc-title'), '카드 제목 안 보임');
      assert(await visible(page, '#page-card .bc-draft'), '초안 띠 안 보임');
      const hrefs = await page.$$eval('#page-card a[href^="tel:"]', as => as.map(a => a.getAttribute('href')));
      assert(hrefs.includes('tel:119') && hrefs.includes('tel:109'), 'tel 링크: ' + hrefs.join(','));
      assert((await dockOk(page)) === true, '도크');
    });
    if (id === 'fever') { await shot(page, cfg, 'card-fever-preview'); await layoutChecks(page, cfg, '카드(fever 미리보기)'); }
    await check(A, '?card=' + id + ' (preview 없음) 차단', cfg, async () => {
      await page.goto(base + '/?card=' + id);
      await page.waitForTimeout(400);
      assert(await visible(page, '#page-card .bc--missing'), '차단 화면 아님');
      assert(!(await visible(page, '#page-card .bc-draft')), '초안이 보임');
    });
  }
}

async function flowSettings(browser, base, cfg, consoleBag) {
  const A = '설정';
  const ctx = await newContext(browser, base, cfg);
  const page = await ctx.newPage();
  watchConsole(page, consoleBag);
  await page.goto(base + '/');
  const openSettings = async () => {
    await page.click('#menu-btn');
    await page.waitForTimeout(200);
    await page.click('[data-menu-act="settings"]');
    await page.waitForTimeout(400);
  };
  await check(A, '시스템 색 따르기(저장값 없음)', cfg, async () => {
    const t = await page.getAttribute('html', 'data-theme');
    assert(t === cfg.colorScheme, 'data-theme ' + t);
    await page.emulateMedia({ colorScheme: cfg.colorScheme === 'dark' ? 'light' : 'dark' });
    await page.waitForTimeout(100);
    const t2 = await page.getAttribute('html', 'data-theme');
    await page.emulateMedia({ colorScheme: cfg.colorScheme });
    assert(t2 !== t, '시스템 변경을 따르지 않음');
  });
  await check(A, '다크모드 전환', cfg, async () => {
    await openSettings();
    const bg0 = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const other = cfg.colorScheme === 'dark' ? 'light' : 'dark';
    await page.click('.theme-mode-btn[data-mode="' + other + '"]');
    await page.waitForTimeout(150);
    assert((await page.getAttribute('html', 'data-theme')) === other, 'data-theme');
    const bg1 = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    assert(bg0 !== bg1, '배경색이 그대로 ' + bg1);
    await page.click('.theme-mode-btn[data-mode="' + cfg.colorScheme + '"]');
  });
  await check(A, '글자 크기', cfg, async () => {
    await page.click('.text-scale-btn[data-scale="2"]');
    const v = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--text-scale').trim());
    assert(v === '2', '--text-scale ' + v);
    await page.click('.text-scale-btn[data-scale="0"]');
  });
  await check(A, '알림 문구가 사실대로(열려 있을 때만)', cfg, async () => {
    const t = await page.textContent('#settings-panel');
    assert(t.includes('열려 있을 때') && t.includes('닫으면 알림이 오지 않아요'), '문구');
  });
  await layoutChecks(page, cfg, '설정 패널');
  await ctx.close();
}

async function flowError(browser, base, cfg) {
  const A = '오류 화면';
  await check(A, '강제로 띄웠을 때 109·119가 보이고 도크도 보임', cfg, async () => {
    const ctx = await newContext(browser, base, cfg);
    const page = await ctx.newPage();
    await page.goto(base + '/');
    await page.evaluate(() => window.onerror('e2e forced', location.origin + '/js/app.js'));
    await page.waitForTimeout(150);
    assert(await visible(page, '#error-fallback'), '오류 화면 없음');
    for (const h of ['tel:109', 'sms:109', 'tel:119']) assert(await visible(page, '#error-fallback a[href="' + h + '"]'), h + ' 안 보임');
    const dock = await dockOk(page);
    await shot(page, cfg, 'error');
    await ctx.close();
    assert(dock === true, '도크: ' + dock);
  });
}

/* ═══════ 실행 ═══════ */
async function main() {
  const { chromium } = await loadPlaywright();
  const server = await startServer();
  const browser = await chromium.launch();
  const consoleByCfg = {};
  try {
    for (const cfg of CONFIGS) {
      const bag = consoleByCfg[cfg.name] = [];
      const ctx = await newContext(browser, server.base, cfg);
      const page = await ctx.newPage();
      watchConsole(page, bag);
      await flowLanding(page, server.base, cfg);
      await flowDashboard(page, server.base, cfg);
      await flowChips(page, server.base, cfg, 'landing');
      await flowChips(page, server.base, cfg, 'dash');
      await flowDockAndMenu(page, server.base, cfg);
      await flowCards(page, server.base, cfg);
      await ctx.close();
      await flowQuickExit(browser, server.base, cfg, bag);
      await flowSettings(browser, server.base, cfg, bag);
      await flowError(browser, server.base, cfg);
      record('공통', '콘솔 에러 0', cfg, bag.length === 0, bag.slice(0, 5).join(' | '));
    }
  } finally {
    await browser.close();
    server.stop();
  }
  report();
}

function report() {
  const cfgNames = CONFIGS.map(c => c.name);
  const rows = new Map();
  for (const r of results) {
    const k = r.area + '\u0000' + r.name;
    if (!rows.has(k)) rows.set(k, { area: r.area, name: r.name, by: {} });
    rows.get(k).by[r.cfg.name] = r;
  }
  const esc = s => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
  let md = '| 영역 | 검사 | ' + cfgNames.join(' | ') + ' | 실패 내용 |\n|---|---|' + cfgNames.map(() => '---').join('|') + '|---|\n';
  let pass = 0, fail = 0;
  for (const row of rows.values()) {
    const cells = cfgNames.map(n => { const r = row.by[n]; if (!r) return '-'; r.ok ? pass++ : fail++; return r.ok ? '통과' : '**실패**'; });
    const why = cfgNames.map(n => row.by[n] && !row.by[n].ok ? n + ': ' + row.by[n].detail : '').filter(Boolean).join(' / ');
    md += '| ' + esc(row.area) + ' | ' + esc(row.name) + ' | ' + cells.join(' | ') + ' | ' + esc(why) + ' |\n';
  }
  const summary = '검사 ' + (pass + fail) + '건 · 통과 ' + pass + ' · 실패 ' + fail + ' (실행 ' + new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC)';
  process.stdout.write(summary + '\n');
  for (const r of results.filter(x => !x.ok)) process.stdout.write('FAIL [' + r.cfg.name + '] ' + r.area + ' · ' + r.name + ' — ' + r.detail + '\n');
  process.stdout.write('스크린샷: ' + SHOTS + '\n');
  if (WRITE_REPORT) {
    const START = '<!-- e2e:start -->', END = '<!-- e2e:end -->';
    const block = START + '\n' + summary + '\n\n' + md + END;
    let doc = fs.existsSync(REPORT) ? fs.readFileSync(REPORT, 'utf-8') : '# E2E 점검\n\n' + START + '\n' + END + '\n';
    if (!doc.includes(START)) doc += '\n' + START + '\n' + END + '\n';
    doc = doc.slice(0, doc.indexOf(START)) + block + doc.slice(doc.indexOf(END) + END.length);
    fs.writeFileSync(REPORT, doc);
    process.stdout.write('보고서: ' + REPORT + '\n');
  }
  process.exitCode = fail ? 1 : 0;
}

main().catch(e => { process.stderr.write(String(e && e.stack || e) + '\n'); process.exitCode = 2; });
