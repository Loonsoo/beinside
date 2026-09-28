#!/usr/bin/env node
/* 국가건강정보포털(질병관리청) 건강정보 원문 받기 — 운영자 점검용
   실행: KDCA_TOKEN=... node scripts/kdca-fetch.mjs [cntntsSn ...]
   - 토큰은 환경 변수로만 받는다. 저장소·로그에 남기지 않는다.
   - 받은 원문은 .cache/kdca/ 에 저장한다 (.gitignore). 라이선스(공공누리 유형) 확인 전에는
     저장소에 원문을 커밋하지 않는다. 카드에는 링크·확인일만 쓴다. */
import fs from 'node:fs';
import path from 'node:path';

const TOKEN = process.env.KDCA_TOKEN;
if (!TOKEN) { console.error('KDCA_TOKEN 환경 변수가 없습니다.'); process.exit(1); }

/* 카드·요약이 참고하는 콘텐츠 (reports/2026-09-official-sources.md) */
const DEFAULT_IDS = {
  6227: '기도폐쇄', 5864: '외상성 뇌손상', 1743: '낙상', 5394: '중독', 3690: '저체온증',
  5285: '불명열', 5729: '소아발진', 5284: '뇌수막염',
  5468: '탈장(소아)', 5721: '소아 청소년의 혈변', 5465: '아동학대',
  5467: '영아돌연사증후군', 5481: '가정 내 아동안전', 5496: '늘어지는 영아증후군',
  6586: '성공적인 모유 수유', 5470: '이유기보충식', 5212: '식이영양(영유아)', 5723: '신생아 황달',
};

const ids = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(DEFAULT_IDS);
const out = path.join(process.cwd(), '.cache', 'kdca');
fs.mkdirSync(out, { recursive: true });

const summary = [];
for (const id of ids) {
  const url = `http://api.kdca.go.kr/api/provide/healthInfo?TOKEN=${encodeURIComponent(TOKEN)}&cntntsSn=${id}`;
  try {
    const res = await fetch(url);
    const body = await res.text();
    fs.writeFileSync(path.join(out, `${id}.xml`), body);
    summary.push({ id, name: DEFAULT_IDS[id] || '', status: res.status, bytes: body.length });
  } catch (e) {
    summary.push({ id, name: DEFAULT_IDS[id] || '', status: 'ERR', error: String(e.message || e) });
  }
}
fs.writeFileSync(path.join(out, '_summary.json'), JSON.stringify({ fetched: new Date().toISOString(), items: summary }, null, 2));
console.table(summary);
