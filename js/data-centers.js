/* ═══════════════════════════════════════════════════════════
   BeInside — 한국 공공 상담/지원 기관 데이터
   전화번호는 실제 운영 확인된 번호만 수록합니다.
   최종 확인: 2025년 기준
═══════════════════════════════════════════════════════════ */

const SUPPORT_CENTERS = {

  /* ── 긴급/위기 ── */
  emergency: [
    {
      name: '자살예방상담전화',
      phone: '109',
      hours: '24시간 연중무휴',
      desc: '자살 위기 즉각 상담. 전문 상담사가 24시간 대기합니다.',
      url: 'https://www.129.go.kr',
      free: true,
      tags: ['emergency', 'teen', 'emotion', 'burnout', 'grief', 'sleep', 'workplace', 'transition', 'relation']
    },
    {
      name: '정신건강위기상담전화',
      phone: '1577-0199',
      hours: '24시간 연중무휴',
      desc: '정신건강 위기 상황 긴급 상담 및 응급 개입.',
      url: 'https://www.mentalhealth.go.kr',
      free: true,
      tags: ['emergency', 'emotion', 'burnout', 'grief', 'sleep', 'mental', 'postpartum', 'menopause']
    },
    {
      name: '경찰 신고',
      phone: '112',
      hours: '24시간 연중무휴',
      desc: '폭력, 학대, 위험 상황 시 즉시 신고.',
      free: true,
      tags: ['emergency', 'teen', 'elder', 'multicultural']
    },
    {
      name: '소방·응급 신고',
      phone: '119',
      hours: '24시간 연중무휴',
      desc: '응급 상황, 자해·자살 시도 시 즉시 신고.',
      free: true,
      tags: ['emergency']
    },
    {
      name: '여성긴급전화',
      phone: '1366',
      hours: '24시간 연중무휴',
      desc: '가정폭력, 성폭력, 성매매 피해 긴급 상담 및 보호시설 연계.',
      url: 'https://www.women1366.kr',
      free: true,
      tags: ['emergency', 'relation', 'multicultural', 'postpartum']
    },
    {
      name: '청소년전화',
      phone: '1388',
      hours: '24시간 연중무휴',
      desc: '청소년 위기 상담. 채팅·문자 상담도 가능합니다.',
      url: 'https://www.cyber1388.kr',
      free: true,
      tags: ['emergency', 'teen', 'emotion', 'growth']
    }
  ],

  /* ── 전국 공통 상담 전화 ── */
  national: [
    {
      name: '정신건강복지센터',
      phone: '1577-0199',
      hours: '평일 09:00~18:00 (센터별 상이, 위기 상담 24시간)',
      desc: '전국 시·군·구 설치. 무료 정신건강 상담, 사례관리, 재활 프로그램.',
      url: 'https://www.mentalhealth.go.kr',
      free: true,
      tags: ['mental', 'emotion', 'burnout', 'sleep', 'grief', 'postpartum', 'menopause', 'workplace', 'transition', 'relation']
    },
    {
      name: '국가트라우마센터',
      phone: '02-2204-0001',
      hours: '평일 09:00~18:00',
      desc: '재난·사고·폭력 등 심리적 트라우마 전문 치료 및 상담.',
      url: 'https://nct.go.kr',
      free: true,
      tags: ['emergency', 'grief', 'emotion', 'mental']
    },
    {
      name: '중독통합관리지원센터',
      phone: '1899-0893',
      hours: '평일 09:00~18:00',
      desc: '알코올·약물·인터넷·도박 등 중독 문제 통합 상담.',
      url: 'https://www.nacc.or.kr',
      free: true,
      tags: ['mental', 'emotion', 'teen', 'burnout', 'relation']
    },
    {
      name: '도박문제관리센터',
      phone: '1336',
      hours: '24시간 연중무휴',
      desc: '도박 중독 상담, 치료비 지원, 가족 상담.',
      url: 'https://www.kcgp.or.kr',
      free: true,
      tags: ['mental', 'relation', 'burnout']
    },
    {
      name: '근로자건강센터',
      phone: '1588-6497',
      hours: '평일 09:00~18:00 (센터별 상이)',
      desc: '직장인 직무스트레스·우울 상담 및 근로자 건강관리.',
      url: 'https://www.kosha.or.kr',
      free: true,
      tags: ['workplace', 'burnout', 'mental', 'sleep']
    },
    {
      name: '직장내 성희롱·성폭력 상담',
      phone: '1544-0024',
      hours: '평일 09:00~18:00',
      desc: '직장 내 성희롱·성폭력·괴롭힘 피해 상담.',
      url: 'https://www.mogef.go.kr',
      free: true,
      tags: ['workplace', 'relation']
    }
  ],

  /* ── 가족/양육 ── */
  family: [
    {
      name: '한부모가족지원센터',
      phone: '1644-6621',
      hours: '평일 09:00~18:00',
      desc: '한부모 가족 양육비, 복지급여, 상담 지원.',
      url: 'https://www.hanbumo.kr',
      free: true,
      tags: ['sp', 'birth', 'growth', 'teen', 'emotion']
    },
    {
      name: '건강가정지원센터',
      phone: '1577-9337',
      hours: '평일 09:00~18:00',
      desc: '가족 상담, 부부 관계, 가정 문제 종합 지원.',
      url: 'https://www.familynet.or.kr',
      free: true,
      tags: ['relation', 'birth', 'sp', 'dad', 'growth', 'postpartum', 'menopause']
    },
    {
      name: '아이돌봄서비스',
      phone: '1577-2514',
      hours: '평일 09:00~18:00 (신청 접수)',
      desc: '만 12세 이하 아동 돌봄 서비스. 소득 기준별 정부 지원.',
      url: 'https://idolbom.go.kr',
      free: false,
      tags: ['birth', 'sp', 'growth', 'dad', 'postpartum']
    },
    {
      name: '다문화가족지원센터',
      phone: '1577-1366',
      hours: '평일 09:00~18:00 (다국어 상담 가능)',
      desc: '다문화가족 한국어 교육, 상담, 통번역, 정착 지원.',
      url: 'https://www.liveinkorea.kr',
      free: true,
      tags: ['multicultural', 'birth', 'growth', 'relation', 'emotion']
    },
    {
      name: '육아종합지원센터',
      phone: '1566-3232',
      hours: '평일 09:00~18:00',
      desc: '영유아 양육 정보, 부모 교육, 놀이·장난감 대여.',
      url: 'https://central.childcare.go.kr',
      free: true,
      tags: ['birth', 'growth', 'sp', 'dad', 'postpartum']
    },
    {
      name: '산모·신생아 건강관리 지원',
      phone: '129',
      hours: '평일 09:00~18:00 (정부민원 129)',
      desc: '출산 후 산모·신생아 건강관리사 파견 지원 (소득 기준별).',
      url: 'https://www.bokjiro.go.kr',
      free: false,
      tags: ['birth', 'postpartum']
    }
  ],

  /* ── 청소년 ── */
  youth: [
    {
      name: '청소년상담복지센터',
      phone: '1388',
      hours: '24시간 연중무휴 (전화), 평일 09:00~18:00 (방문)',
      desc: '청소년 심리 상담, 위기 개입, 자립 지원. 전국 시·군·구 설치.',
      url: 'https://www.kyci.or.kr',
      free: true,
      tags: ['teen', 'emotion', 'growth', 'relation']
    },
    {
      name: '학교밖청소년지원센터 (꿈드림)',
      phone: '1388',
      hours: '평일 09:00~18:00',
      desc: '학교 밖 청소년 학습, 직업 체험, 자립 지원, 건강검진.',
      url: 'https://www.kdream.or.kr',
      free: true,
      tags: ['teen', 'growth', 'transition']
    },
    {
      name: 'Wee센터',
      phone: '(학교/교육청별 상이)',
      hours: '학기 중 평일 09:00~17:00',
      desc: '학교 내 전문 상담. 학업·교우·가정 문제 상담 및 위기 개입.',
      url: 'https://www.wee.go.kr',
      free: true,
      tags: ['teen', 'emotion', 'relation', 'growth']
    },
    {
      name: '청소년 사이버상담센터',
      phone: '1388 (채팅·문자)',
      hours: '24시간 (채팅·문자 상담)',
      desc: '카카오톡 "마음이음" 채널에서 비대면 상담 가능.',
      url: 'https://www.cyber1388.kr',
      free: true,
      tags: ['teen', 'emotion']
    }
  ],

  /* ── 노인 ── */
  senior: [
    {
      name: '노인보호전문기관',
      phone: '1577-1389',
      hours: '24시간 연중무휴 (긴급 신고)',
      desc: '노인 학대 신고·상담, 피해 노인 보호, 예방 교육.',
      url: 'https://www.noinboho.or.kr',
      free: true,
      tags: ['elder', 'emergency']
    },
    {
      name: '치매안심센터',
      phone: '1899-9988',
      hours: '평일 09:00~18:00',
      desc: '치매 조기 검진, 상담, 돌봄 서비스 연계. 전국 256개소.',
      url: 'https://www.nid.or.kr',
      free: true,
      tags: ['elder', 'grief', 'burnout']
    },
    {
      name: '노인돌봄종합서비스',
      phone: '129',
      hours: '평일 09:00~18:00 (정부민원 129)',
      desc: '독거노인·취약노인 안전 확인, 생활 지원, 응급 안전.',
      url: 'https://www.bokjiro.go.kr',
      free: true,
      tags: ['elder']
    },
    {
      name: '중앙노인돌봄통합지원센터',
      phone: '1661-2129',
      hours: '평일 09:00~18:00',
      desc: '노인맞춤돌봄서비스 안내 및 신청 연계.',
      url: 'https://www.1661-2129.or.kr',
      free: true,
      tags: ['elder', 'grief']
    }
  ],

  /* ── 경제적 지원 ── */
  financial: [
    {
      name: '긴급복지지원 (정부민원)',
      phone: '129',
      hours: '24시간 연중무휴',
      desc: '생계 곤란, 의료, 주거 등 긴급 위기 상황 즉시 지원.',
      url: 'https://www.129.go.kr',
      free: true,
      tags: ['emergency', 'sp', 'elder', 'transition', 'multicultural']
    },
    {
      name: '신용회복위원회',
      phone: '1600-5500',
      hours: '평일 09:00~18:00',
      desc: '과다채무자 신용회복 지원, 채무조정 상담.',
      url: 'https://www.ccrs.or.kr',
      free: true,
      tags: ['transition', 'burnout', 'workplace']
    },
    {
      name: '서민금융콜센터',
      phone: '1397',
      hours: '평일 09:00~18:00',
      desc: '서민·취약계층 금융 상담. 미소금융, 햇살론 등 안내.',
      url: 'https://www.kinfa.or.kr',
      free: true,
      tags: ['transition', 'sp', 'multicultural']
    },
    {
      name: '고용노동부 상담센터',
      phone: '1350',
      hours: '평일 09:00~18:00',
      desc: '근로조건, 임금체불, 실업급여, 직장 내 괴롭힘 상담.',
      url: 'https://www.moel.go.kr',
      free: true,
      tags: ['workplace', 'transition', 'burnout']
    },
    {
      name: '국민연금 상담',
      phone: '1355',
      hours: '평일 09:00~18:00',
      desc: '국민연금 가입, 수급, 장애·유족연금 상담.',
      url: 'https://www.nps.or.kr',
      free: true,
      tags: ['elder', 'transition', 'menopause']
    }
  ],

  /* ── 온라인 상담/자가진단 ── */
  online: [
    {
      name: '마음이음 (자살예방 온라인 상담)',
      phone: null,
      hours: '24시간 (온라인 채팅)',
      desc: '실시간 채팅 상담. 말하기 어려울 때 글로 먼저 시작해 보세요.',
      url: 'https://www.maum-eum.or.kr',
      free: true,
      tags: ['emergency', 'teen', 'emotion', 'burnout', 'grief', 'sleep']
    },
    {
      name: '복지로',
      phone: '129',
      hours: '24시간 (웹사이트)',
      desc: '나에게 맞는 복지 서비스 한눈에 검색. 온라인 신청 가능.',
      url: 'https://www.bokjiro.go.kr',
      free: true,
      tags: ['sp', 'birth', 'elder', 'multicultural', 'transition', 'growth', 'dad', 'postpartum']
    },
    {
      name: '정신건강정보포털',
      phone: null,
      hours: '24시간 (웹사이트)',
      desc: '우울, 불안, 스트레스 자가진단 테스트 및 정신건강 정보.',
      url: 'https://www.mentalhealth.go.kr',
      free: true,
      tags: ['mental', 'emotion', 'burnout', 'sleep', 'grief', 'postpartum', 'menopause', 'workplace']
    },
    {
      name: '마인드카페',
      phone: null,
      hours: '24시간 (앱/웹)',
      desc: '심리 상담 매칭 플랫폼. 전문 상담사 비대면 상담.',
      url: 'https://www.mindcafe.co.kr',
      free: false,
      tags: ['emotion', 'burnout', 'relation', 'sleep', 'grief', 'workplace', 'mental']
    },
    {
      name: '정신건강 자가검진 (국립정신건강센터)',
      phone: null,
      hours: '24시간 (웹사이트)',
      desc: '우울증(PHQ-9), 불안(GAD-7), 스트레스 등 표준 자가검진.',
      url: 'https://www.mentalhealth.go.kr/portal/selfCheck/selfCheckList.do',
      free: true,
      tags: ['mental', 'emotion', 'burnout', 'sleep', 'postpartum', 'menopause', 'teen']
    }
  ],

  /* ── 특수 상황 ── */
  specialized: [
    {
      name: '한국생명의전화',
      phone: '1588-9191',
      hours: '24시간 연중무휴',
      desc: '고독, 외로움, 위기 상황 상담. 자살예방 전문.',
      url: 'https://www.lifeline.or.kr',
      free: true,
      tags: ['emergency', 'emotion', 'grief', 'elder', 'transition']
    },
    {
      name: '한국여성상담센터',
      phone: '02-953-2017',
      hours: '평일 09:30~18:30',
      desc: '여성 심리 상담, 부부·이혼, 폭력 피해 상담.',
      url: 'https://www.womanline.or.kr',
      free: true,
      tags: ['relation', 'postpartum', 'menopause', 'emotion']
    },
    {
      name: '사별가족지원센터',
      phone: '02-6948-0000',
      hours: '평일 09:00~18:00',
      desc: '가족 사별 후 심리 상담, 애도 프로그램, 자조모임.',
      free: true,
      tags: ['grief', 'emotion', 'elder']
    },
    {
      name: '대한법률구조공단',
      phone: '132',
      hours: '평일 09:00~18:00',
      desc: '법률 상담 무료 지원. 이혼, 양육권, 가정폭력 법률 문제.',
      url: 'https://www.klac.or.kr',
      free: true,
      tags: ['sp', 'relation', 'multicultural', 'workplace']
    },
    {
      name: '육아휴직·출산급여 상담 (고용보험)',
      phone: '1350',
      hours: '평일 09:00~18:00',
      desc: '육아휴직 급여, 출산전후휴가 급여 신청 안내.',
      url: 'https://www.ei.go.kr',
      free: true,
      tags: ['birth', 'dad', 'postpartum']
    }
  ]
};


/* ═══════════════════════════════════════════════════════════
   헬퍼 함수
═══════════════════════════════════════════════════════════ */

/**
 * 페이지 ID에 해당하는 지원 기관 목록을 반환합니다.
 * 긴급 기관이 먼저, 이후 카테고리별로 정렬됩니다.
 *
 * @param {string} pageId - 페이지 ID (예: 'emotion', 'teen', 'grief')
 * @returns {Array<Object>} 관련 기관 배열
 */
function getCentersForPage(pageId) {
  const results = [];
  const categoryOrder = ['emergency', 'national', 'family', 'youth', 'senior', 'financial', 'online', 'specialized'];

  categoryOrder.forEach(function(category) {
    var centers = SUPPORT_CENTERS[category];
    if (!centers) return;

    centers.forEach(function(center) {
      if (center.tags && center.tags.indexOf(pageId) !== -1) {
        results.push(Object.assign({}, center, { category: category }));
      }
    });
  });

  return results;
}

/**
 * 무료 기관만 필터링하여 반환합니다.
 *
 * @param {string} pageId - 페이지 ID
 * @returns {Array<Object>} 무료 기관 배열
 */
function getFreeCentersForPage(pageId) {
  return getCentersForPage(pageId).filter(function(c) { return c.free === true; });
}

/**
 * 전화 상담 가능한 기관만 필터링하여 반환합니다.
 *
 * @param {string} pageId - 페이지 ID
 * @returns {Array<Object>} 전화 상담 가능 기관 배열
 */
function getPhoneCentersForPage(pageId) {
  return getCentersForPage(pageId).filter(function(c) {
    return c.phone && c.phone !== null && c.phone.indexOf('상이') === -1;
  });
}

/**
 * 24시간 운영 기관만 필터링하여 반환합니다.
 *
 * @param {string} pageId - 페이지 ID
 * @returns {Array<Object>} 24시간 기관 배열
 */
function get24hCentersForPage(pageId) {
  return getCentersForPage(pageId).filter(function(c) {
    return c.hours && c.hours.indexOf('24시간') !== -1;
  });
}

/**
 * 카테고리 한글 라벨을 반환합니다.
 *
 * @param {string} category - 카테고리 키
 * @returns {string} 한글 라벨
 */
function getCategoryLabel(category) {
  var labels = {
    emergency: '긴급/위기',
    national: '전국 상담',
    family: '가족/양육',
    youth: '청소년',
    senior: '노인',
    financial: '경제적 지원',
    online: '온라인 상담',
    specialized: '전문 상담'
  };
  return labels[category] || category;
}
