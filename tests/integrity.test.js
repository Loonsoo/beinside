/* ═══════════════════════════════════════════════════════════
   BeInside 무결성 테스트
   실행: node --test tests/integrity.test.js
   의존성 없음 — Node.js 22+ 내장 test runner
═══════════════════════════════════════════════════════════ */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');

/* ── 헬퍼 ── */
function readFile(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf-8');
}

/* ═══════ 1. 라우팅 일관성 ═══════ */
describe('라우팅 일관성', () => {
  const html = readFile('index.html');
  const vercelJson = JSON.parse(readFile('vercel.json'));
  const sitemap = readFile('sitemap.xml');
  const sw = readFile('sw.js');

  // ALL_PAGES from app.js
  const appJs = readFile('js/app.js');
  const allPagesMatch = appJs.match(/ALL_PAGES\s*=\s*\[([^\]]+)\]/);
  const allPages = allPagesMatch
    ? allPagesMatch[1].match(/'([^']+)'/g).map(s => s.replace(/'/g, ''))
    : [];

  // PAGE_META from app.js
  const pageMetaBlock = appJs.match(/const PAGE_META\s*=\s*\{([\s\S]*?)\n\};/);
  const pageMetaKeys = pageMetaBlock
    ? [...pageMetaBlock[1].matchAll(/^\s*(\w+)\s*:/gm)].map(m => m[1])
    : [];

  // Vercel rewrite sources
  const vercelPages = vercelJson.rewrites.map(r => r.source.replace('/', ''));

  // Sitemap paths
  const sitemapPages = [...sitemap.matchAll(/<loc>https:\/\/beinside\.kr\/(\w+)<\/loc>/g)]
    .map(m => m[1]);

  it('ALL_PAGES에 있는 모든 페이지가 vercel.json에 라우팅됨', () => {
    for (const page of allPages) {
      assert.ok(vercelPages.includes(page), `"${page}" 라우팅이 vercel.json에 없음`);
    }
  });

  it('ALL_PAGES에 있는 모든 페이지가 sitemap.xml에 등록됨', () => {
    for (const page of allPages) {
      assert.ok(sitemapPages.includes(page), `"${page}"가 sitemap.xml에 없음`);
    }
  });

  it('ALL_PAGES에 있는 모든 페이지가 PAGE_META에 등록됨', () => {
    for (const page of allPages) {
      assert.ok(pageMetaKeys.includes(page), `"${page}"의 SEO 메타 정보가 PAGE_META에 없음`);
    }
  });

  it('vercel.json의 라우팅이 ALL_PAGES에 매칭됨', () => {
    for (const page of vercelPages) {
      assert.ok(allPages.includes(page), `vercel.json에 "${page}" 라우팅이 있지만 ALL_PAGES에 없음`);
    }
  });

  it('각 페이지의 HTML 컨테이너(page-*)가 index.html에 존재', () => {
    for (const page of allPages) {
      assert.ok(
        html.includes(`id="page-${page}"`),
        `"page-${page}" 컨테이너가 index.html에 없음`
      );
    }
  });

  it('SW 프리캐시에 모든 JS 파일 포함', () => {
    const jsFiles = fs.readdirSync(path.join(ROOT, 'js'))
      .filter(f => f.endsWith('.js'));
    for (const file of jsFiles) {
      assert.ok(
        sw.includes(`/js/${file}`),
        `"js/${file}"이 SW 프리캐시 목록에 없음`
      );
    }
  });
});

/* ═══════ 2. tel: 링크 유효성 ═══════ */
describe('tel: 링크 유효성', () => {
  const html = readFile('index.html');
  const telLinks = [...html.matchAll(/href="tel:([^"]+)"/g)].map(m => m[1]);

  it('모든 tel: 링크가 유효한 전화번호 형식', () => {
    const validPattern = /^[\d\-]+$/;
    for (const tel of telLinks) {
      assert.ok(validPattern.test(tel), `유효하지 않은 전화번호: tel:${tel}`);
    }
  });

  it('핵심 긴급전화가 모두 tel: 링크로 존재', () => {
    const required = ['119', '112', '109', '1388', '1366', '1577-0199'];
    for (const num of required) {
      assert.ok(telLinks.includes(num), `긴급전화 ${num}의 tel: 링크가 없음`);
    }
  });
});

/* ═══════ 3. CSS 변수 일관성 ═══════ */
describe('CSS 변수 일관성', () => {
  const css = readFile('css/base.css') + readFile('css/pages.css') + readFile('css/dark.css');

  it(':root에 핵심 CSS 변수가 정의됨', () => {
    const required = ['--cream', '--ink', '--peach', '--sp-2', '--sp-4', '--calm-r'];
    for (const v of required) {
      assert.ok(css.includes(v), `핵심 CSS 변수 ${v}가 정의되지 않음`);
    }
  });

  it('하드코딩 색상이 없음 (주요 파일 검사)', () => {
    // CSS에서 var() 없이 직접 쓰인 #hex 색상 찾기 (단, :root 정의 블록 제외)
    const rootBlock = css.match(/:root\s*\{[^}]+\}/s)?.[0] || '';
    const cssWithoutRoot = css.replace(rootBlock, '');

    // 허용 목록: 순수 흰/검 (#fff, #000, #FFF, #000), 투명도 색상, 그라디언트 정의 내부
    const hardcoded = [...cssWithoutRoot.matchAll(/#[0-9a-fA-F]{3,8}(?![0-9a-fA-F])/g)]
      .map(m => m[0].toLowerCase())
      .filter(c => !['#fff', '#ffffff', '#000', '#000000'].includes(c));

    // 현재 CSS는 다크모드·그라디언트·테마 정의 블록에서 하드코딩 다수 발생
    // 기준선을 기록하고, 증가 시 경고 (회귀 방지)
    const BASELINE = 356;
    assert.ok(
      hardcoded.length <= BASELINE,
      `CSS 하드코딩 색상이 기준(${BASELINE})을 초과: ${hardcoded.length}개. 새로 추가된 색상을 CSS 변수로 바꿔주세요.`
    );
  });
});

/* ═══════ 4. 파일 존재 확인 ═══════ */
describe('필수 파일 존재', () => {
  const required = [
    'index.html',
    'offline.html',
    'manifest.json',
    'robots.txt',
    'sitemap.xml',
    'sw.js',
    'vercel.json',
    'css/base.css',
    'css/pages.css',
    'css/dark.css',
    'js/app.js',
    'js/data.js',
    'icons/icon.svg'
  ];

  for (const file of required) {
    it(`${file} 존재`, () => {
      assert.ok(
        fs.existsSync(path.join(ROOT, file)),
        `필수 파일 ${file}이 존재하지 않음`
      );
    });
  }
});

/* ═══════ 5. manifest.json 유효성 ═══════ */
describe('manifest.json 유효성', () => {
  const manifest = JSON.parse(readFile('manifest.json'));

  it('필수 필드 존재', () => {
    assert.ok(manifest.name, 'name 없음');
    assert.ok(manifest.short_name, 'short_name 없음');
    assert.ok(manifest.start_url, 'start_url 없음');
    assert.ok(manifest.icons?.length > 0, 'icons 없음');
  });

  it('아이콘 파일이 실제 존재', () => {
    for (const icon of manifest.icons) {
      const iconPath = path.join(ROOT, icon.src);
      assert.ok(fs.existsSync(iconPath), `아이콘 ${icon.src}이 존재하지 않음`);
    }
  });
});

/* ═══════ 6. 접근성 기본 검사 ═══════ */
describe('접근성 기본 검사', () => {
  const html = readFile('index.html');

  it('lang 속성 존재', () => {
    assert.ok(html.includes('lang="ko"'), 'html lang="ko" 없음');
  });

  it('skip navigation 링크 존재', () => {
    assert.ok(html.includes('skip-nav'), '스킵 네비게이션이 없음');
  });

  it('aria-live 영역 존재', () => {
    assert.ok(html.includes('aria-live'), 'aria-live 영역이 없음');
  });

  it('viewport meta 태그 존재', () => {
    assert.ok(html.includes('width=device-width'), 'viewport meta 없음');
  });
});
