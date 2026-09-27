/* ═══════════════════════════════════════════════════════════
   BeInside — 상황 카드 정적 페이지 빌드
   실행: npm run build:cards  (node만 쓴다. 의존성 없음)

   - 게시(status 'published') 카드마다 cards/<id>/index.html을 만든다. 초안은 만들지 않는다.
   - 게시 목록에 없는 cards/<id>/ 폴더(이 스크립트가 만든 것)는 지운다.
   - sitemap.xml의 cards:start ~ cards:end 사이를 카드 URL로 다시 채운다.
   - Vercel buildCommand는 비워 둔다. 이 스크립트를 돌리고 생성물을 함께 커밋한다.
     tests/cards.test.js가 "게시 카드 목록 = cards/ 폴더 목록"을 검사한다.
   - 본문은 js/cards.js의 cardHTML()을 그대로 쓴다(앱 화면과 같은 문장). 스타일은 css/ 기존 파일.
═══════════════════════════════════════════════════════════ */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://beinside.kr';
const OG_IMAGE = SITE + '/icons/og-image.png';
const UMAMI_ID = 'b089900e-0e7d-4ee3-a2ff-19686edfc487';
export const GEN_MARK = '<meta name="generator" content="scripts/build-cards.mjs">';
const SITEMAP_START = '<!-- cards:start (scripts/build-cards.mjs가 채운다. 손으로 고치지 않는다) -->';
const SITEMAP_END = '<!-- cards:end -->';

const read = (root, rel) => fs.readFileSync(path.join(root, rel), 'utf-8');

/** helplines.js · data-cards.js · cards.js를 DOM 없이 불러온다. cards를 주면 BI_CARDS를 그것으로 바꾼다(테스트용) */
export function loadCards(root = ROOT, cards) {
  const ctx = {};
  vm.createContext(ctx);
  for (const f of ['js/helplines.js', 'js/data-cards.js', 'js/cards.js']) {
    vm.runInContext(read(root, f), ctx, { filename: f });
  }
  vm.runInContext('this.api = { BI_CARDS, cardHTML, cardsListed, cardEsc };', ctx);
  if (cards) ctx.api.BI_CARDS.splice(0, ctx.api.BI_CARDS.length, ...cards);
  return ctx.api;
}

/** index.html의 위기 도크를 그대로 가져온다 (번호·문구를 한 곳에서만 관리) */
function extractDock(indexHtml) {
  const m = indexHtml.match(/<div class="crisis-dock"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
  if (!m) throw new Error('index.html에서 위기 도크를 찾지 못함');
  return m[0];
}

/** JSON-LD: 확인 날짜와 출처만. 검수자·효과 같은 주장은 넣지 않는다 */
function jsonLd(card, url) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: card.title,
    description: card.summary,
    url,
    inLanguage: 'ko',
    lastReviewed: card.reviewed,
    isPartOf: { '@type': 'WebSite', name: 'BeInside', url: SITE },
    publisher: { '@type': 'Organization', name: 'BeInside', url: SITE },
    citation: card.sources.map(s => ({ '@type': 'CreativeWork', name: s.name, url: s.url })),
  };
  return JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
}

export function cardPageHTML(api, card, dock) {
  const e = api.cardEsc;
  const url = SITE + '/cards/' + card.id;
  const title = card.title + ' — BeInside';
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${GEN_MARK}
  <title>${e(title)}</title>
  <meta name="description" content="${e(card.summary)}">
  <link rel="canonical" href="${url}">
  <meta name="theme-color" content="#F2F1EC" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#171A13" media="(prefers-color-scheme: dark)">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${e(title)}">
  <meta property="og:description" content="${e(card.summary)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${OG_IMAGE}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="BeInside">
  <meta property="og:locale" content="ko_KR">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${e(title)}">
  <meta name="twitter:description" content="${e(card.summary)}">
  <meta name="twitter:image" content="${OG_IMAGE}">
  <link rel="icon" type="image/svg+xml" href="/icons/icon.svg">
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
  <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap" rel="stylesheet">
  <script>
  (function(){
    var s = null;
    try { s = localStorage.getItem('beinside_theme'); } catch (e) {}
    var dark = s === 'dark' || (s !== 'light' && !!(window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches));
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  })();
  </script>
  <link rel="stylesheet" href="/css/base.css">
  <link rel="stylesheet" href="/css/pages.css">
  <link rel="stylesheet" href="/css/dark.css">
  <script type="application/ld+json">
${jsonLd(card, url)}
  </script>
  <script defer src="https://cloud.umami.is/script.js" data-website-id="${UMAMI_ID}" data-domains="beinside.kr"></script>
</head>
<body class="subpage bc-static">
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
    <symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.6 3.8h2.6l1.3 4-1.9 1.3a11 11 0 0 0 6.3 6.3l1.3-1.9 4 1.3v2.6a2 2 0 0 1-2.2 2A15.8 15.8 0 0 1 4.6 6a2 2 0 0 1 2-2.2z"/></symbol>
    <symbol id="i-msg" viewBox="0 0 24 24"><path d="M4.5 6.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10l-4.2 3.2v-3.2h.7a2 2 0 0 1-2-2z"/></symbol>
  </defs>
</svg>
<header>
  <div class="hdr-left"><a class="logo" href="/">BeInside</a></div>
</header>
<main class="page-wrap">
  <div class="main-col">
    <div class="page-view page-view--card">
      <div class="bc-wrap">
${api.cardHTML(card, { isStatic: true })}
      </div>
    </div>
  </div>
</main>
${dock}
<script defer src="/js/helplines.js"></script>
<script defer src="/js/data-cards.js"></script>
<script defer src="/js/cards.js"></script>
</body>
</html>
`;
}

function sitemapBlock(cards) {
  const urls = cards.map(c => `  <url>
    <loc>${SITE}/cards/${c.id}</loc>
    <lastmod>${c.reviewed}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`).join('');
  return `  ${SITEMAP_START}\n${urls}  ${SITEMAP_END}\n`;
}

export function updateSitemap(xml, cards) {
  const block = sitemapBlock(cards);
  const re = new RegExp('[ \\t]*' + SITEMAP_START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + SITEMAP_END + '\\n?');
  if (re.test(xml)) return xml.replace(re, block);
  return xml.replace('</urlset>', block + '</urlset>');
}

/** 게시 카드 → cards/<id>/index.html, 지난 생성물 정리, sitemap 갱신 */
export function buildCards({ root = ROOT, cards, outDir = path.join(root, 'cards'), sitemapPath = path.join(root, 'sitemap.xml') } = {}) {
  const api = loadCards(root, cards);
  const published = api.cardsListed();
  const ids = Array.from(published, c => c.id);
  const dock = extractDock(read(root, 'index.html'));

  const removed = [];
  if (fs.existsSync(outDir)) {
    for (const d of fs.readdirSync(outDir, { withFileTypes: true })) {
      if (!d.isDirectory() || ids.includes(d.name)) continue;
      const file = path.join(outDir, d.name, 'index.html');
      if (!fs.existsSync(file) || !fs.readFileSync(file, 'utf-8').includes(GEN_MARK)) {
        throw new Error(`cards/${d.name}/는 이 스크립트가 만든 폴더가 아님. 손으로 확인해 주세요.`);
      }
      fs.rmSync(path.join(outDir, d.name), { recursive: true });
      removed.push(d.name);
    }
  }

  for (const card of published) {
    const dir = path.join(outDir, card.id);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), cardPageHTML(api, card, dock));
  }

  fs.writeFileSync(sitemapPath, updateSitemap(fs.readFileSync(sitemapPath, 'utf-8'), published));
  return { written: ids, removed };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const r = buildCards();
  process.stdout.write(`카드 페이지 ${r.written.length}개 생성${r.written.length ? ': ' + r.written.join(', ') : ''}`
    + (r.removed.length ? ` / 지움: ${r.removed.join(', ')}` : '') + '\n');
}
