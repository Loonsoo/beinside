#!/usr/bin/env node
/* 공공데이터포털(data.go.kr) 승인 API 3건 점검 — 운영자 월 1회 실행
   1) 한국사회보장정보원_중앙부처복지서비스
      GET https://apis.data.go.kr/B554287/NationalWelfareInformationsV001/NationalWelfarelistV001
          ?serviceKey&callTp=L&pageNo&numOfRows&srchKeyCode=003&lifeArray=001(영유아)|007(임신·출산)
      상세 .../NationalWelfaredetailedV001?serviceKey&callTp=D&servId=
      응답 XML wantedList > servList(servId, servNm, servDgst, servDtlLink, jurMnofNm, lifeArray, svcfrstRegTs …)
      수정일 필드 없음 → 상세 본문 해시로 변경 감지. 상세 본문은 이중 이스케이프(&amp;#9312;)라 두 번 디코드.
   2) 질병관리청_예방접종(대상 감염병 관련) 정보
      GET https://apis.data.go.kr/1790387/vcninfo/getCondVcnCd?serviceKey          → 감염병 코드 21개(cd, cdNm)
      GET https://apis.data.go.kr/1790387/vcninfo/getVcnInfo?serviceKey&vcnCd=01   → title, message(CDATA 본문)
      vcnCd 없이 부르면 resultCode 99 "접종코드 선택 후, 조회 바랍니다."
   3) 행정안전부_대한민국 공공서비스(혜택) 정보
      GET https://api.odcloud.kr/api/gov24/v3/serviceList?serviceKey&page&perPage   (JSON)
      호스트가 apis.data.go.kr가 아니다. 네트워크 허용 목록에 api.odcloud.kr 필요.

   실행: DATA_GO_KR_KEY=... node scripts/datago-fetch.mjs
   - 키(Decoding 키)는 환경 변수로만 받는다. 저장소·로그·출력에 남기지 않는다.
   - 받은 원문은 .cache/datago/ 에만 저장한다(.gitignore). 사이트에는 공식 링크와 기준일만 반영한다. */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const KEY = process.env.DATA_GO_KR_KEY;
const OUT = path.join(process.cwd(), '.cache', 'datago');

/* 0~12개월과 관련 있는 예방접종 대상감염병 코드 (getCondVcnCd 목록 기준) */
export const INFANT_VCN = {
  '01': '결핵', '02': 'B형간염', '03': '디프테리아', '18': '파상풍', '19': '백일해', '04': '폴리오',
  '05': 'Hib', '06': '폐렴구균', '07': '홍역', '20': '유행성이하선염', '21': '풍진', '08': '수두',
  '09': '일본뇌염', '10': '인플루엔자', '13': 'A형간염', '14': '로타바이러스',
};

/* data.go.kr 공통 에러 (returnReasonCode) */
const ERRORS = {
  1: '어플리케이션 에러', 4: 'HTTP 에러', 10: '잘못된 요청 파라미터', 11: '필수 요청 파라미터 없음',
  12: '서비스가 없거나 폐기됨', 20: '서비스 접근 거부', 22: '요청 제한 횟수 초과',
  30: '등록되지 않은 서비스키(승인 직후면 1~2시간 뒤 재시도)', 31: '활용기간 만료', 32: '등록되지 않은 IP',
};

const cdata = s => (s == null ? '' : s.replace(/^\s*<!\[CDATA\[\s*/, '').replace(/\s*\]\]>\s*$/, '').trim());
const decode = s => s
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).replace(/&amp;/g, '&');
const text = s => decode(decode(cdata(s))).replace(/\r/g, '\n').trim();
const tag = (xml, name) => { const m = xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`)); return m ? text(m[1]) : null; };
const all = (xml, name) => [...xml.matchAll(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`, 'g'))].map(m => m[1]);
const hash = v => crypto.createHash('sha256').update(typeof v === 'string' ? v : JSON.stringify(v)).digest('hex').slice(0, 16);

export function parseWelfareList(xml) {
  return {
    code: tag(xml, 'resultCode'), message: tag(xml, 'resultMessage'), total: Number(tag(xml, 'totalCount') || 0),
    items: all(xml, 'servList').map(x => ({
      servId: tag(x, 'servId'), servNm: tag(x, 'servNm'), servDgst: tag(x, 'servDgst'),
      link: tag(x, 'servDtlLink'), ministry: [tag(x, 'jurMnofNm'), tag(x, 'jurOrgNm')].filter(Boolean).join(' '),
      life: tag(x, 'lifeArray'), phone: tag(x, 'rprsCtadr'), online: tag(x, 'onapPsbltYn') === 'Y',
      firstReg: tag(x, 'svcfrstRegTs'),
    })),
  };
}

export function parseVcn(xml) {
  return {
    code: tag(xml, 'resultCode'), message: tag(xml, 'resultMsg'),
    items: all(xml, 'item').map(x => ({ cd: tag(x, 'cd'), cdNm: tag(x, 'cdNm'), title: tag(x, 'title'), message: tag(x, 'message') })),
  };
}

function apiError(body) {
  const code = (body.match(/<returnReasonCode>(\d+)</) || body.match(/"returnReasonCode"\s*:\s*"?(\d+)/) || [])[1];
  return code ? `${code} ${ERRORS[Number(code)] || ''}`.trim() : null;
}

async function get(url, params) {
  const u = new URL(url);
  u.searchParams.set('serviceKey', KEY);
  for (const [k, v] of Object.entries(params || {})) u.searchParams.set(k, v);
  let lastErr;
  for (let i = 0; i < 3; i++) { /* apis.data.go.kr는 첫 연결이 가끔 끊긴다 */
    try {
      const res = await fetch(u);
      return { status: res.status, body: await res.text() };
    } catch (e) { lastErr = e; await new Promise(r => setTimeout(r, 1000 * (i + 1))); }
  }
  throw new Error(`${u.host}: ${lastErr?.cause?.code || lastErr?.message || lastErr}`);
}

const save = (name, data) => fs.writeFileSync(path.join(OUT, name), typeof data === 'string' ? data : JSON.stringify(data, null, 2));

async function welfare() {
  const base = 'https://apis.data.go.kr/B554287/NationalWelfareInformationsV001';
  const items = new Map();
  for (const life of ['001', '007']) {
    const r = await get(`${base}/NationalWelfarelistV001`, { callTp: 'L', pageNo: 1, numOfRows: 200, srchKeyCode: '003', lifeArray: life });
    const doc = parseWelfareList(r.body);
    if (doc.code !== '0') throw new Error(apiError(r.body) || `${doc.code} ${doc.message}`);
    for (const it of doc.items) items.set(it.servId, it);
  }
  for (const it of items.values()) {
    const r = await get(`${base}/NationalWelfaredetailedV001`, { callTp: 'D', servId: it.servId });
    it.detailHash = hash(r.body.replace(/<inqNum>\d+<\/inqNum>/g, ''));
    await new Promise(r => setTimeout(r, 100));
  }
  return [...items.values()];
}

async function vaccine() {
  const base = 'https://apis.data.go.kr/1790387/vcninfo';
  const list = parseVcn((await get(`${base}/getCondVcnCd`)).body);
  if (list.code !== '00') throw new Error(`${list.code} ${list.message}`);
  const out = [];
  for (const { cd, cdNm } of list.items.filter(i => INFANT_VCN[i.cd])) {
    const doc = parseVcn((await get(`${base}/getVcnInfo`, { vcnCd: cd })).body);
    const body = doc.items[0]?.message || '';
    out.push({ cd, cdNm, hash: hash(body), length: body.length });
    fs.writeFileSync(path.join(OUT, `vcn-${cd}.md`), `# ${cdNm}\n\n${body}\n`);
    await new Promise(r => setTimeout(r, 100));
  }
  return out;
}

async function gov24() {
  const r = await get('https://api.odcloud.kr/api/gov24/v3/serviceList', { page: 1, perPage: 1 });
  if (r.status !== 200) throw new Error(`HTTP ${r.status}`);
  const j = JSON.parse(r.body);
  return { totalCount: j.totalCount, fields: Object.keys(j.data?.[0] || {}) };
}

async function main() {
  if (!KEY) { console.error('DATA_GO_KR_KEY 환경 변수가 없습니다.'); process.exit(1); }
  fs.mkdirSync(OUT, { recursive: true });
  const prevFile = path.join(OUT, '_summary.json');
  const prev = fs.existsSync(prevFile) ? JSON.parse(fs.readFileSync(prevFile, 'utf-8')) : {};
  const summary = { fetched: new Date().toISOString() };
  const rows = [];

  for (const [name, fn] of [['welfare', welfare], ['vaccine', vaccine], ['gov24', gov24]]) {
    try {
      summary[name] = await fn();
      rows.push({ api: name, result: 'OK', count: Array.isArray(summary[name]) ? summary[name].length : summary[name].totalCount });
    } catch (e) {
      const msg = String(e.message || e);
      rows.push({ api: name, result: name === 'gov24' ? `${msg} (네트워크 허용 목록에 api.odcloud.kr 필요할 수 있음)` : msg });
    }
  }
  save('_summary.json', summary);
  console.table(rows);

  const diff = (key, id, h) => {
    const before = Object.fromEntries((prev[key] || []).map(i => [i[id], i[h]]));
    const now = summary[key] || [];
    return {
      added: now.filter(i => !(i[id] in before)).map(i => i.servNm || i.cdNm),
      changed: now.filter(i => before[i[id]] && before[i[id]] !== i[h]).map(i => i.servNm || i.cdNm),
    };
  };
  if (prev.fetched) {
    for (const [key, id, h] of [['welfare', 'servId', 'detailHash'], ['vaccine', 'cd', 'hash']]) {
      const d = diff(key, id, h);
      if (d.added.length) console.log(`\n[${key}] 새 항목:`, d.added.join(', '));
      if (d.changed.length) console.log(`[${key}] 내용이 바뀐 항목:`, d.changed.join(', '), '→ 관련 카드 확인일 갱신 필요');
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main();
