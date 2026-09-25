/* ═══════════════════════════════════════════════════════════
   BeInside — 위기·도움 연락처 (단일 출처)
   번호를 바꿀 때는 이 파일만 고치고, 분기마다 공식 출처와 대조한다.
   확인일: 2026-09-25
   - 109: 자살예방상담전화 (2024.1.1 통합, 문자 상담 가능) — 보건복지부
   - 마들랜: 109 SNS 상담 카카오톡 채널 — 한국생명존중희망재단 운영
   - 1577-0199: 정신건강상담전화 (지역 정신건강복지센터 연결)
   - 1644-6621: 가족상담전화 (365일 24시간)
═══════════════════════════════════════════════════════════ */

const HELPLINES = {
  emergency: { number: '119',       name: '119',              desc: '응급 상황, 지금 위험할 때' },
  police:    { number: '112',       name: '112',              desc: '폭력·학대 신고' },
  suicide:   { number: '109',       name: '자살예방상담전화',  desc: '무료 · 24시간 · 문자도 돼요', sms: true },
  mental:    { number: '1577-0199', name: '정신건강상담전화',  desc: '무료 · 24시간 · 가까운 정신건강복지센터로 연결' },
  women:     { number: '1366',      name: '여성긴급전화',      desc: '가정폭력·성폭력 · 24시간' },
  youth:     { number: '1388',      name: '청소년상담전화',    desc: '무료 · 24시간' },
  family:    { number: '1644-6621', name: '가족상담전화',      desc: '365일 24시간 · 양육·가족 고민' },
};

const MADLAN_URL = 'https://pf.kakao.com/_DAxbYG';

/** tel: 링크용 번호 (하이픈 제거) */
function helplineTel(key) {
  return 'tel:' + HELPLINES[key].number.replace(/-/g, '');
}

/** sms: 링크 (문자 상담을 받는 번호만) */
function helplineSms(key) {
  return HELPLINES[key].sms ? 'sms:' + HELPLINES[key].number : null;
}
