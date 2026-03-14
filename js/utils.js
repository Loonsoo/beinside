/* ═══════════════════════════════════════════════════════════
   BeInside — 공통 유틸리티 함수
═══════════════════════════════════════════════════════════ */

/**
 * HTML 이스케이프 — 사용자 입력을 innerHTML에 삽입하기 전에 반드시 사용
 * XSS 방지용
 */
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * 월령 → 발달 단계 레이블
 * 단일 정의 — 이 함수만 수정하면 전체에 반영됩니다.
 */
function getStageLabel(m) {
  if (m <= 1)  return '신생아기';
  if (m <= 3)  return '초기영아기';
  if (m <= 6)  return '중기영아기';
  if (m <= 12) return '후기영아기';
  if (m <= 24) return '걸음마기';
  if (m <= 36) return '유아초반';
  const y = m / 12;
  if (y <= 6)  return '유아기';
  if (y <= 12) return '학령기';
  if (y <= 18) return '청소년기';
  if (y <= 29) return '청년기';
  if (y <= 44) return '성인기';
  if (y <= 59) return '중년기';
  if (y <= 74) return '노년기';
  return '후기노년기';
}

/** 월령 → MENTAL 데이터 키 */
function getMentalKey(months) {
  const y = months / 12;
  if (months <= 3)  return 'infant';
  if (months <= 36) return 'toddler';
  if (y <= 6)  return 'preschool';
  if (y <= 12) return 'school';
  if (y <= 18) return 'teen';
  if (y <= 29) return 'young';
  if (y <= 44) return 'adult';
  if (y <= 59) return 'middle';
  return 'senior';
}

/** 월령 → ALONE_DATA 키 (해당 없으면 null) */
function getAloneKey(months) {
  const y = months / 12;
  if (y < 13) return 'child';
  if (y < 20) return 'teen';
  if (y <= 40) return 'young';
  return null;
}

/**
 * 생년월일 → 나이 계산
 * @returns {{ label: string, months: number }}  months < 0 이면 미래 날짜
 */
function calcAge(dob) {
  const now  = new Date();
  const born = new Date(dob);
  const totalMonths = (now.getFullYear() - born.getFullYear()) * 12
                    + (now.getMonth() - born.getMonth());
  const days   = now.getDate() - born.getDate();
  const months = totalMonths - (days < 0 ? 1 : 0);
  if (months < 0) return { label: '아직 태어나지 않았어요', months: -1 };
  if (months === 0) {
    const d = Math.floor((now - born) / (1000 * 60 * 60 * 24));
    return { label: `생후 ${d}일`, months: 0 };
  }
  if (months <= 36) return { label: `${months}개월`, months };
  const yrs = Math.floor(months / 12);
  const rem = months % 12;
  return { label: rem > 0 ? `만 ${yrs}세 ${rem}개월` : `만 ${yrs}세`, months };
}

/**
 * 프로필 객체 → 아바타 HTML 문자열
 * @param {Object} p - 프로필
 * @param {number} size - 픽셀 크기
 */
function avatarHTML(p, size = 34) {
  if (p.avatarImg) {
    // base64 이미지는 XSS 위험 없음 (FileReader 결과)
    return `<img src="${p.avatarImg}" alt="avatar" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;">`;
  }
  return `<span style="font-size:${Math.round(size * 0.55)}px">${esc(p.avatarEm || '🌱')}</span>`;
}
