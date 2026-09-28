#!/usr/bin/env node
/* 국가건강정보포털(질병관리청) 건강정보 원문 받기 — 운영자 점검용
   명세: OpenAPI 활용 가이드 KDCA17-HEALTH-API01 v1.1 (2022-01-04)
     GET http://api.kdca.go.kr/api/provide/healthInfo?TOKEN=[서비스키, URL 인코딩]&cntntsSn=[콘텐츠 일련번호]
     응답 XML: HEAD(CODE, MESSAGE) / svc(CNTNTSSJ 제목, CNTNTS_SN, LCLASSN,
               cntntsClList > cntntsCl(CNTNTS_CL_NM 항목명, CNTNTSCLSN, CNTNTS_CL_CN 내용 또는 이미지 URL))
     데이터 갱신 일 1회 · 최대 30 tps · 수정일 필드 없음 → 내용 해시로 변경을 감지한다.
   실행: KDCA_TOKEN=... node scripts/kdca-fetch.mjs [cntntsSn ...]
   - 토큰은 환경 변수로만 받는다. 저장소·로그·출력에 남기지 않는다.
   - 받은 원문은 .cache/kdca/ 에만 저장한다(.gitignore). 공공누리 유형 확인 전에는 원문을 커밋하지 않는다. */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const TOKEN = process.env.KDCA_TOKEN;

/* 카드·요약이 참고하는 콘텐츠 (reports/2026-09-official-sources.md) */
export const DEFAULT_IDS = {
  6227: '기도폐쇄', 5864: '외상성 뇌손상', 1743: '낙상', 5394: '중독', 3690: '저체온증',
  5285: '불명열', 5729: '소아발진', 5284: '뇌수막염',
  5468: '탈장(소아)', 5721: '소아 청소년의 혈변', 5465: '아동학대',
  5467: '영아돌연사증후군', 5481: '가정 내 아동안전', 5496: '늘어지는 영아증후군',
  6586: '성공적인 모유 수유', 5470: '이유기보충식', 5212: '식이영양(영유아)', 5723: '신생아 황달',
};

/* 명세의 에러코드 */
const ERRORS = {
  1: '어플리케이션 에러', 2: '데이터베이스 에러', 3: '데이터 없음', 4: 'HTTP 에러', 5: '서비스 연결 실패',
  10: '잘못된 요청 파라미터', 11: '필수 요청 파라미터 없음', 12: '서비스가 없거나 폐기됨',
  20: '서비스 접근 거부', 21: '일시적으로 사용할 수 없는 서비스키', 22: '요청 제한 횟수 초과',
  30: '등록되지 않은 서비스키', 31: '활용기간 만료', 32: '등록되지 않은 IP', 33: '서명되지 않은 호출', 99: '기타 에러',
};

const cdata = s => (s == null ? '' : s.replace(/^\s*<!\[CDATA\[\s*/, '').replace(/\s*\]\]>\s*$/, '').trim());
const tag = (xml, name) => { const m = xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`)); return m ? cdata(m[1]) : null; };

export function parseHealthInfo(xml) {
  const code = tag(xml, 'CODE');
  const message = tag(xml, 'MESSAGE');
  const sections = [...xml.matchAll(/<cntntsCl>([\s\S]*?)<\/cntntsCl>/g)].map(m => ({
    name: tag(m[1], 'CNTNTS_CL_NM') || '',
    sn: tag(m[1], 'CNTNTSCLSN') || '',
    content: tag(m[1], 'CNTNTS_CL_CN') || '',
  }));
  return {
    code, message,
    ok: code === 'S001' || code === '0',
    title: tag(xml, 'CNTNTSSJ'),
    sn: tag(xml, 'CNTNTS_SN'),
    lclass: tag(xml, 'LCLASSN'),
    sections,
  };
}

export function toMarkdown(doc, id) {
  const lines = [`# ${doc.title || id}`, '', `- 콘텐츠 번호: ${doc.sn || id}`,
    `- 원문: https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=${id}`, ''];
  for (const s of doc.sections) {
    lines.push(`## ${s.name} (${s.sn})`, '');
    lines.push(/^https?:\/\/\S+$/.test(s.content) ? `![이미지](${s.content})` : s.content, '');
  }
  return lines.join('\n');
}

async function get(id) {
  const q = `?TOKEN=${encodeURIComponent(TOKEN)}&cntntsSn=${encodeURIComponent(id)}`;
  let lastErr;
  for (const base of ['https://api.kdca.go.kr', 'http://api.kdca.go.kr']) {
    try {
      const res = await fetch(base + '/api/provide/healthInfo' + q);
      return { status: res.status, body: await res.text(), scheme: base.split(':')[0] };
    } catch (e) { lastErr = e; }
  }
  throw lastErr;
}

async function main() {
  if (!TOKEN) { console.error('KDCA_TOKEN 환경 변수가 없습니다.'); process.exit(1); }
  const ids = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(DEFAULT_IDS);
  const out = path.join(process.cwd(), '.cache', 'kdca');
  fs.mkdirSync(out, { recursive: true });
  const prevFile = path.join(out, '_summary.json');
  const prev = fs.existsSync(prevFile) ? JSON.parse(fs.readFileSync(prevFile, 'utf-8')) : { items: [] };
  const prevHash = Object.fromEntries((prev.items || []).map(i => [String(i.id), i.hash]));

  const items = [];
  for (const id of ids) {
    const row = { id, name: DEFAULT_IDS[id] || '' };
    try {
      const r = await get(id);
      const doc = parseHealthInfo(r.body);
      row.http = r.status; row.scheme = r.scheme; row.code = doc.code;
      row.message = doc.ok ? 'OK' : (ERRORS[Number(doc.code)] || doc.message || `응답 해석 실패 (HTTP ${r.status}${/allowlist/i.test(r.body) ? ', 네트워크 허용 목록에 api.kdca.go.kr 필요' : ''})`);
      if (doc.ok) {
        fs.writeFileSync(path.join(out, `${id}.xml`), r.body);
        fs.writeFileSync(path.join(out, `${id}.md`), toMarkdown(doc, id));
        row.title = doc.title; row.sections = doc.sections.length;
        row.hash = crypto.createHash('sha256').update(JSON.stringify(doc.sections)).digest('hex').slice(0, 16);
        row.changed = prevHash[id] ? prevHash[id] !== row.hash : null;
      }
    } catch (e) {
      row.code = 'ERR'; row.message = String(e.message || e);
    }
    items.push(row);
    await new Promise(r => setTimeout(r, 100)); /* 30 tps 한도보다 넉넉히 */
  }
  fs.writeFileSync(prevFile, JSON.stringify({ fetched: new Date().toISOString(), items }, null, 2));
  console.table(items.map(({ id, name, code, message, sections, changed }) => ({ id, name, code, message, sections, changed })));
  const changed = items.filter(i => i.changed);
  if (changed.length) console.log('\n원문이 바뀐 콘텐츠:', changed.map(i => `${i.id} ${i.name}`).join(', '), '→ 관련 카드 확인일 갱신 필요');
}

if (import.meta.url === `file://${process.argv[1]}`) main();
