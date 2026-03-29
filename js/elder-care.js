/* ═══════════════════════════════════════════════════════════
   BeInside — 노인 돌봄 가이드 (elder-care.js)
   부모님·어르신 간병, 치매 돌봄, 간병 번아웃, 복지 연결
═══════════════════════════════════════════════════════════ */

const ELDER_CARE_DATA = {
  intro: {
    title: '돌보는 당신도 돌봄이 필요해요',
    sub: '부모님을 돌보는 건 사랑이지만, 혼자 감당하면 무너질 수 있어요.',
    stat: {
      pct: '11.3%',
      label: '65세 이상 노인 우울증상 유병률. 독거노인은 16.1%까지 올라가요. (보건복지부 2023 노인실태조사)'
    }
  },

  /* ── 상황 분류 ── */
  situations: [
    { id: 'dementia',  icon: '🧠', label: '치매 부모님 돌봄',       sub: '기억이 사라져가는 부모님 곁을 지키고 있다면' },
    { id: 'chronic',   icon: '🏥', label: '만성질환·와병 간병',     sub: '오랜 투병 생활을 함께하고 있다면' },
    { id: 'caregiver', icon: '🫠', label: '간병 번아웃',            sub: '돌보는 내가 먼저 무너질 것 같다면' },
    { id: 'abuse',     icon: '🛡️', label: '노인 학대 예방·대응',    sub: '학대가 의심되거나, 내가 화를 참기 어렵다면' }
  ],

  /* ── 치매 돌봄 ── */
  dementia: {
    recognition: '치매는 본인도, 가족도 서서히 무너지는 병이에요. 같은 말을 반복하는 부모님에게 짜증이 나는 건 나쁜 자식이어서가 아니에요. 지친 거예요.',
    check: {
      id: 'ct_dementia', title: '지금 내 상태는?',
      questions: [
        '부모님의 반복 행동에 화가 통제되지 않는다',
        '간병 때문에 직장·가정·건강 중 하나 이상이 무너졌다',
        '부모님이 돌아가시면 편할 것 같다는 생각이 든 적 있다',
        '나 자신을 해치고 싶다는 생각이 든다'
      ],
      emergencyIndex: 3,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:109" style="color:inherit;font-weight:700">📞 109</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '돌보는 사람을 위한 전문 지원이 필요해요', threshold: 2, action: '치매안심센터(1899-9988, 무료) 또는 정신건강복지센터에 연락해 보세요. 당신을 위한 상담이에요.' },
        mid:  { label: '간병 부담이 높은 상태예요. 쉬어야 해요.', threshold: 1 },
        low:  { label: '아래 가이드가 도움이 될 수 있어요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '📋', text: '치매안심센터(1899-9988)에 등록하세요. 무료 검진·상담·돌봄 서비스를 연결받을 수 있어요.' },
      { icon: '🔁', text: '같은 말 반복할 때: 교정하지 마세요. "그랬구나"로 받아주면 환자의 편도체 각성이 줄어들어 안정돼요.' },
      { icon: '🏷️', text: '배회 대비: 옷에 이름·연락처 라벨을 붙여두세요. 치매안심센터에서 배회감지기를 무료로 제공해요.' },
      { icon: '🤝', text: '주간보호센터를 활용하세요. 주 5일까지 이용 가능하고, 장기요양등급이 있으면 본인부담 15%예요.' },
      { icon: '📖', text: '일주일에 한 번, 과거 사진을 함께 보세요. 장기기억을 자극하면 뇌의 보상 회로가 활성화되어 부모님에게 안정감을 줘요.' }
    ],
    help: [
      { number: '1899-9988', name: '중앙치매센터', desc: '치매 관련 모든 상담. 무료, 365일 운영. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-1000', name: '국민건강보험공단', desc: '장기요양등급 신청 및 안내.' },
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 간병이 너무 힘들 때도 전화해도 돼요. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },

  /* ── 만성질환·와병 간병 ── */
  chronic: {
    recognition: '끝이 보이지 않는 간병은 마라톤보다 힘들어요. "언제까지 이렇게 해야 하지?"라는 생각은 정상이에요. 지치는 건 당연해요.',
    check: {
      id: 'ct_chronic', title: '지금 내 상태는?',
      questions: [
        '간병으로 잠을 충분히 자지 못한다 (하루 5시간 미만)',
        '내 건강을 돌볼 시간이 전혀 없다',
        '가족 중 나만 간병하고 있다는 느낌이 든다',
        '일상에서 기쁨이나 즐거움을 느끼지 못한다'
      ],
      results: {
        high: { label: '간병 우울로 발전할 수 있어요. 도움을 받아야 해요.', threshold: 3, action: '정신건강복지센터(1577-0199, 무료)에서 간병자 전용 상담을 받을 수 있어요.' },
        mid:  { label: '간병 부담이 높아요. 쉼의 시간이 필요해요.', threshold: 2 },
        low:  { label: '지금 상태를 유지하면서 아래 가이드를 참고해 보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '🏠', text: '장기요양보험에 등급 신청하세요 (1577-1000). 방문요양, 방문간호, 주간보호 등을 저렴하게 이용할 수 있어요.' },
      { icon: '🔄', text: '가족 간병 분담 회의를 열어보세요. 역할을 나누면 만성 코르티솔 과잉이 완화돼요.' },
      { icon: '⏰', text: '하루 중 30분은 반드시 "나만의 시간"을 확보하세요. 짧은 휴식도 전전두엽을 회복시켜 감정 조절력을 되찾아줘요.' },
      { icon: '📱', text: '간병인 커뮤니티에 참여해 보세요. 공감받는 경험은 옥시토신을 분비시켜 고립감을 줄여줘요.' },
      { icon: '💊', text: '부모님 약 관리가 어렵다면 병원에 "복약 상담"을 요청하세요. 약사가 정리해 줘요.' }
    ],
    help: [
      { number: '1577-1000', name: '국민건강보험공단', desc: '장기요양등급 신청·재가급여(방문요양 등) 안내.' },
      { number: '129', name: '정부 복지상담센터', desc: '간병 관련 복지 혜택 통합 안내. 무료.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 간병 우울·소진 시. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },

  /* ── 간병 번아웃 ── */
  caregiver: {
    recognition: '간병 번아웃은 "나쁜 자식"의 증거가 아니에요. 사랑하기 때문에 이렇게까지 왔고, 그래서 지금 바닥에 닿은 거예요.',
    check: {
      id: 'ct_caregiver', title: '지금 내 상태는?',
      questions: [
        '환자를 보면 짜증이나 분노가 먼저 올라온다',
        '내 삶이 완전히 사라진 것 같다',
        '몸이 자주 아프다 (두통, 소화불량, 근육통, 면역력 저하)',
        '"이렇게 사느니 차라리..."라는 생각이 든다',
        '감정이 무뎌져서 슬프지도 화나지도 않다'
      ],
      emergencyIndex: 3,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:109" style="color:inherit;font-weight:700">📞 109</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '지금 당장 쉬어야 해요. 간병을 멈추는 것이 아니라 나를 살리는 거예요.', threshold: 3, action: '긴급돌봄(1577-1000)을 신청하거나 109에 전화해 보세요.' },
        mid:  { label: '간병 번아웃이 시작됐어요. 분담과 휴식이 필요해요.', threshold: 2 },
        low:  { label: '지금 상태를 유지하면서 예방이 중요해요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '🆘', text: '긴급돌봄 서비스를 신청하세요. 간병인이 쓰러지면 환자도 위험해요. 잠시 맡기는 건 포기가 아니에요.' },
      { icon: '🛌', text: '수면을 최우선으로 확보하세요. 수면 부족은 코르티솔을 과잉 분비시키고 면역력을 떨어뜨려요.' },
      { icon: '🗣️', text: '"나 지금 너무 힘들어"라고 말할 수 있는 사람 한 명을 찾으세요. 감정을 말로 꺼내면 편도체 활성화가 줄어들어요.' },
      { icon: '📅', text: '주 1회 "간병 없는 날"을 만들어 보세요. 정기적 휴식이 만성 스트레스 호르몬을 낮춰줘요.' },
      { icon: '💆', text: '내가 쓰러지면 모두가 무너져요. 자기 돌봄은 이기심이 아니라 지속 가능한 간병의 조건이에요.' }
    ],
    help: [
      { number: '1577-1000', name: '국민건강보험공단', desc: '긴급돌봄·단기 보호 서비스 신청.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 간병 번아웃 전용 상담도 가능해요. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 극단적 생각이 들 때. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },

  /* ── 노인 학대 예방·대응 ── */
  abuse: {
    recognition: '노인 학대의 90% 이상은 가족에 의해 발생해요. 간병 스트레스가 극에 달하면 누구에게나 일어날 수 있어요. "내가 혹시 학대하고 있는 건 아닌가?"라는 질문 자체가 이미 자각의 시작이에요.',
    check: {
      id: 'ct_abuse', title: '지금 상황을 확인해 볼게요',
      questions: [
        '부모님에게 소리를 자주 지르거나 모욕적인 말을 한다',
        '돌봄을 의도적으로 거부하거나 방치한 적이 있다',
        '부모님의 재산이나 금전을 동의 없이 사용한 적이 있다',
        '주변 노인이 멍이나 상처가 자주 보이고 원인이 불명확하다'
      ],
      results: {
        high: { label: '지금 도움을 받아야 해요. 자각했다는 것은 변할 수 있다는 뜻이에요.', threshold: 2, action: '노인보호전문기관(1577-1389)에 상담 전화해 보세요. 처벌이 아니라 도움을 위한 곳이에요.' },
        mid:  { label: '간병 스트레스가 위험 수준이에요. 분담과 상담이 필요해요.', threshold: 1 },
        low:  { label: '예방 가이드를 확인해 보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '📞', text: '노인보호전문기관(1577-1389)은 처벌 기관이 아니에요. 가해자·피해자 모두를 위한 상담과 지원을 해요.' },
      { icon: '✋', text: '화가 폭발할 것 같을 때: 방에서 나와 10초 숨 쉬기. 물리적 거리를 두면 전전두엽이 편도체 반응을 억제할 시간을 벌어요.' },
      { icon: '🔄', text: '간병을 혼자 하고 있다면 그것 자체가 위험 요인이에요. 분담 방법을 반드시 찾으세요.' },
      { icon: '🛡️', text: '주변에서 노인 학대가 의심되면 112나 1577-1389에 신고해 주세요. 익명 신고도 가능해요.' },
      { icon: '💜', text: '"내가 학대하고 있는 건 아닌가?"를 물어본 당신은 이미 변화의 시작이에요.' }
    ],
    help: [
      { number: '1577-1389', name: '노인보호전문기관', desc: '노인 학대 상담·신고·가해자 상담 모두 가능. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '112', name: '경찰 신고', desc: '긴급한 학대·폭력 상황 시 즉시 신고.' },
      { number: '129', name: '정부 복지상담센터', desc: '노인 복지·보호 관련 종합 안내. 무료.' }
    ]
  },

  /* ══════════════════════════════════════════════════════
     실전 돌봄 가이드 — 요양보호사 교육과정 기반
     (보건복지부 요양보호사 표준교재 + 국민건강보험공단 재가급여 매뉴얼)
  ══════════════════════════════════════════════════════ */
  practicalGuide: [
    {
      icon: '🛏️', title: '체위 변경 & 욕창 예방',
      badge: '👨‍👩‍👧 돌보는 가족 필수',
      summary: '누워 계신 분은 2시간마다 자세를 바꿔주세요. 욕창은 한번 생기면 치료가 매우 어려워요.',
      warn: '엉덩이뼈·발꿈치·어깨뼈 — 뼈가 튀어나온 부위에 가장 먼저 생겨요.',
      details: [
        { q: '체위 변경은 어떻게 하나요?', a: '바로 누운 자세 → 왼쪽 옆으로 → 바로 누운 → 오른쪽 옆으로. 2시간 간격으로 순환해 주세요. 시간표를 냉장고에 붙여두면 잊지 않아요.' },
        { q: '옆으로 눕힐 때 요령이 있나요?', a: '30도 정도만 기울이세요. 90도 완전 옆으로 눕히면 압력이 한곳에 집중돼요. 등 뒤에 베개나 쿠션을 받쳐서 각도를 유지해 주세요.' },
        { q: '욕창 초기 신호는?', a: '피부가 빨갛게 변하고 손가락으로 눌렀을 때 하얗게 되지 않으면 1단계 욕창이에요. 즉시 해당 부위에 압력을 제거하고 병원에 알려주세요.' },
        { q: '예방을 위해 할 수 있는 것은?', a: '에어매트리스 사용, 피부 건조하지 않게 보습 크림 도포, 시트 주름 제거, 영양(특히 단백질) 충분히 섭취. 이 네 가지가 핵심이에요.' }
      ]
    },
    {
      icon: '🍚', title: '안전한 식사 돌봄 & 연하(삼킴) 장애',
      badge: '👨‍👩‍👧 돌보는 가족 필수',
      summary: '노인 질식사고의 대부분은 식사 중 발생해요. 자세와 음식 형태가 생명을 지켜요.',
      warn: '누운 상태로 절대 식사하지 마세요. 흡인성 폐렴의 가장 큰 원인이에요.',
      details: [
        { q: '식사 시 올바른 자세는?', a: '상체를 60~90도로 세워주세요. 턱을 살짝 당긴 상태가 가장 안전해요. 식사 후 30분은 눕히지 마세요 — 역류를 방지해요.' },
        { q: '삼키기 어려울 때 음식은?', a: '걸쭉한 죽 형태가 가장 안전해요. 물처럼 묽은 액체는 오히려 위험해요 — 기도로 들어가기 쉬워요. 점도 증진제(토로미)를 활용해 보세요. 약국이나 인터넷에서 구할 수 있어요.' },
        { q: '사레가 자주 걸리면?', a: '한 번에 한 숟가락씩, 삼킨 것을 확인한 후 다음을 주세요. 빨대 사용은 피하세요. 삼킴 장애가 반복되면 재활의학과 연하검사를 받아보세요.' },
        { q: '틀니 관리는?', a: '매 식사 후 틀니를 빼서 흐르는 물에 세척하세요. 밤에는 빼서 물에 담가두세요. 잇몸에 상처가 없는지 주 1회 확인해 주세요.' }
      ]
    },
    {
      icon: '🚶', title: '낙상 예방 & 안전한 이동',
      badge: '👀 모두가 읽으면 좋아요',
      summary: '노인 낙상의 60%는 집 안에서 발생해요. 환경 정리만으로 절반은 예방할 수 있어요.',
      warn: '낙상 후 엉덩이나 허리가 아프면 골절 의심. 무리하게 일으키지 말고 119를 부르세요.',
      details: [
        { q: '집 안에서 가장 위험한 곳은?', a: '① 화장실 (젖은 바닥) ② 침실~화장실 이동 경로 (야간) ③ 문턱·카펫 가장자리. 이 세 곳에 미끄럼 방지 매트, 손잡이, 야간 조명을 설치하세요.' },
        { q: '안전한 부축 방법은?', a: '어르신의 허리 벨트나 바지 허리를 잡으세요 (팔을 잡으면 관절 부상 위험). 걸을 때 반보 앞에서 같은 방향을 보고 걸어주세요. 절대 뒤에서 밀지 마세요.' },
        { q: '휠체어 이동 시 주의점은?', a: '바퀴 잠금 확인 후 승하차. 경사로에서는 후진으로 내려오세요 (앞으로 내려가면 쏟아질 수 있어요). 발판에 발이 놓여있는지 확인하세요.' },
        { q: '침대에서 휠체어로 옮길 때?', a: '휠체어를 침대에 30도 각도로 대고, 바퀴 잠그고, 발판 접어두세요. 어르신이 침대 가장자리에 앉은 상태에서, 허리를 잡고 함께 일어나 회전해 앉히세요. 혼자 들어 올리려 하면 간병인 허리가 다쳐요.' }
      ]
    },
    {
      icon: '🧼', title: '위생 돌봄 (목욕·구강·배설)',
      badge: '👨‍👩‍👧 돌보는 가족 필수',
      summary: '깨끗한 몸은 감염 예방의 기본이에요. 수치심을 최소화하는 것도 중요해요.',
      warn: '목욕 시 물 온도 38~40°C 확인. 노인은 온도 감각이 둔해서 화상 위험이 높아요.',
      details: [
        { q: '침상 목욕은 어떻게?', a: '방 온도 24~26°C 유지, 대야에 38~40°C 물 준비. 얼굴 → 팔 → 가슴 → 배 → 다리 → 등 → 회음부 순서로. 한 부위 씻고 바로 덮어주세요 (체온 저하 방지). 노출 부위를 최소화하는 게 존엄 돌봄이에요.' },
        { q: '구강 관리는?', a: '하루 3회 양치가 이상적이지만, 최소 아침·저녁. 스스로 못 하시면 스펀지 칫솔(구강 스와브)로 잇몸·혀·볼 안쪽을 부드럽게 닦아주세요. 구강이 건조하면 구강보습젤을 발라주세요.' },
        { q: '기저귀 교환 요령은?', a: '최소 4시간마다 확인, 대변 시 즉시 교환. 깨끗이 닦은 후 피부 보호 크림을 얇게 발라주세요. "기저귀를 갈아드릴게요"보다 "개운하게 해드릴게요"라고 말하면 수치심이 줄어요.' },
        { q: '감염 예방의 핵심은?', a: '간병인 손 씻기가 가장 중요해요. 돌봄 전·후 반드시 손을 씻으세요. 소변줄(유치도뇨관)이 있다면 소변백을 방광보다 아래에 유지하고, 연결 부위를 분리하지 마세요.' }
      ]
    },
    {
      icon: '🌡️', title: '활력징후 관찰 & 이상 신호',
      badge: '👀 모두가 읽으면 좋아요',
      summary: '매일 같은 시간에 체온·혈압·맥박을 재면 이상을 빨리 알 수 있어요.',
      warn: '의식이 갑자기 흐려지거나, 한쪽 팔다리에 힘이 없으면 뇌졸중 의심 — 즉시 119.',
      details: [
        { q: '정상 범위는?', a: '체온: 36.0~37.0°C / 혈압: 수축기 120~140, 이완기 60~90 mmHg / 맥박: 60~100회/분 / 호흡: 12~20회/분. 평소 수치를 기록해두면 변화를 빨리 알 수 있어요.' },
        { q: '혈압 재는 요령은?', a: '5분 이상 앉아서 안정 후 측정. 커프(밴드)는 심장 높이에. 매일 같은 팔, 같은 시간에 재세요. 수치를 수첩이나 앱에 기록하면 병원 갈 때 큰 도움이 돼요.' },
        { q: '즉시 119를 불러야 할 때는?', a: '① 의식 저하 (불러도 반응 없음) ② 한쪽 마비·발음 이상 (뇌졸중) ③ 가슴 통증·호흡곤란 (심근경색) ④ 고열 38.5°C 이상 + 의식 변화 ⑤ 대량 출혈·심한 낙상 후 움직이지 못함.' },
        { q: '당뇨 어르신 주의사항은?', a: '저혈당 증상(식은땀, 손 떨림, 어지러움)이 나타나면 즉시 사탕이나 주스를 드리세요. 발에 상처가 나면 감염 위험이 높으니 즉시 병원에 가세요. 매일 발 상태를 눈으로 확인해 주세요.' }
      ]
    },
    {
      icon: '💊', title: '약 관리 & 복약 돌봄',
      badge: '👨‍👩‍👧 돌보는 가족 필수',
      summary: '노인은 평균 6~7가지 약을 드셔요. 약을 빠뜨리거나 중복 복용하면 위험할 수 있어요.',
      warn: '약을 임의로 끊거나 양을 바꾸지 마세요. 반드시 의사·약사와 상의하세요.',
      details: [
        { q: '약 관리 방법은?', a: '요일별 칸이 있는 약 케이스를 사용하세요. 주 1회 한꺼번에 분류해 넣어두면 빠뜨릴 확률이 크게 줄어요. 스마트폰 알람도 도움이 돼요.' },
        { q: '약을 삼키기 어려워하면?', a: '물을 먼저 한 모금 마신 후 약을 드세요. 캡슐을 열어 가루를 음식에 섞어도 되는지 약사에게 꼭 확인하세요 — 일부 약은 쪼개거나 가루 내면 효과가 바뀌어요.' },
        { q: '병원이 여러 곳이면?', a: '모든 약 목록을 한 곳에 정리하세요. "약제이력조회"를 건보공단 앱이나 약국에서 할 수 있어요. 병원 갈 때마다 전체 약 목록을 보여주면 중복·상호작용을 방지할 수 있어요.' },
        { q: '부작용 신호는?', a: '새 약 시작 후 어지러움, 발진, 소화불량, 출혈 등이 나타나면 기록해두고 병원에 알려주세요. 특히 항혈전제(피를 묽게 하는 약) 복용 중 잇몸 출혈·코피·멍이 잦으면 즉시 진료받으세요.' }
      ]
    },
    {
      icon: '🧠', title: '치매 어르신 일상 돌봄',
      badge: '👨‍👩‍👧 돌보는 가족 필수',
      summary: '치매 돌봄의 핵심은 "교정하지 않기"와 "안전한 환경 만들기"예요.',
      warn: '현실 교정("아니야, 그게 아니라...")은 환자를 혼란과 분노에 빠뜨려요. 감정에 반응해 주세요.',
      details: [
        { q: '같은 말을 반복할 때?', a: '"그랬구나", "그랬어요?"로 받아주세요. 5분 전에 말했다고 지적하면 수치심과 불안이 커져요. 질문을 다른 활동으로 자연스럽게 전환하세요.' },
        { q: '배회·밤에 돌아다닐 때?', a: '억지로 막으면 공격적으로 변할 수 있어요. 함께 걸으며 안전하게 유도하세요. 현관문 잠금장치(이중 잠금), 배회감지기(치매안심센터 무료), GPS 인솔을 활용하세요.' },
        { q: '화를 내거나 공격적일 때?', a: '원인이 있어요 — 통증, 불안, 환경 변화, 배고픔 등. "왜 화가 났어요?"보다 "불편한 데가 있으세요?"로 물어보세요. 위험하면 거리를 두고, 차분한 목소리로 안심시켜 주세요.' },
        { q: '인지 자극 활동은?', a: '과거 사진 보기, 옛날 노래 듣기, 간단한 요리 함께하기, 화분 가꾸기. 결과가 아니라 과정이 중요해요. "잘했다"보다 "즐거웠어요?"가 더 좋아요.' }
      ]
    },
    {
      icon: '🤲', title: '존엄한 돌봄 — 어르신의 마음',
      badge: '👀 모두가 읽으면 좋아요',
      summary: '돌봄을 받는 분도 사람이에요. 자존감을 지켜드리는 것이 가장 중요한 돌봄이에요.',
      warn: '아이 대하듯 반말하거나, 동의 없이 신체를 만지지 마세요.',
      details: [
        { q: '말투는 어떻게?', a: '존댓말을 유지하세요. "어머니/아버지"로 불러주세요. 아무리 인지가 떨어져도 감정과 분위기는 느껴요. 따뜻한 말투 하나가 하루를 바꿔요.' },
        { q: '자기결정권은?', a: '사소한 선택이라도 직접 하게 해주세요. "오늘 뭐 입을래요?", "이거 드실래요, 저거 드실래요?" 선택할 수 있다는 것 자체가 자존감이에요.' },
        { q: '수치스러운 돌봄(목욕, 배설) 시?', a: '항상 미리 설명하세요: "지금부터 몸을 닦아드릴게요." 커튼이나 수건으로 노출을 최소화하세요. 표정과 반응을 관찰하고, 불편해하시면 멈추고 조절하세요.' },
        { q: '우울해 보일 때?', a: '노인 우울증은 "짜증", "통증 호소", "식욕 저하"로 나타나는 경우가 많아요. "기분이 어떠세요?"보다 "요즘 입맛은 좀 있으세요?"처럼 구체적으로 물어보세요. 2주 이상 지속되면 병원 진료를 권해 보세요.' }
      ]
    }
  ],

  /* ── 복지 혜택 안내 ── */
  welfare: {
    title: '활용할 수 있는 복지 제도',
    items: [
      { icon: '🏠', name: '장기요양보험', desc: '65세 이상 또는 노인성 질환자 대상. 등급 판정 후 방문요양·주간보호·시설입소 등 이용 가능. 본인부담 15%.', contact: '1577-1000' },
      { icon: '🧠', name: '치매안심센터', desc: '전국 256개소. 치매 검진(무료)·등록·가족 상담·배회감지기 무료 제공·치매 카페.', contact: '1899-9988' },
      { icon: '💰', name: '노인돌봄종합서비스', desc: '등급 외 노인(등급 미인정자)도 이용 가능. 식사·외출 동행·말벗·건강 관리.', contact: '129' },
      { icon: '🏥', name: '긴급돌봄 서비스', desc: '간병인 질환·사고 시 긴급 대체 돌봄. 장기요양등급자 대상.', contact: '1577-1000' },
      { icon: '🚗', name: '노인 교통비·난방비 지원', desc: '기초연금 수급자 대상 각종 생활 지원. 지자체별로 다름.', contact: '129' },
      { icon: '⚖️', name: '성년후견제도', desc: '치매 등으로 의사결정이 어려운 분의 법적 보호. 법원 신청 또는 공공후견 지원.', contact: '132' }
    ]
  }
};

/* ── 상황별 아코디언 내부 콘텐츠 렌더 ── */
function _renderSituationContent(id) {
  const d = ELDER_CARE_DATA[id];
  if (!d) return '';

  return `
    <div style="padding-top:4px;">
      <div style="font-size:13.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;margin-bottom:16px;">${esc(d.recognition)}</div>

      <div id="elder-check-${id}" style="margin-bottom:16px;">
        <div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:8px;">📋 상황 판단</div>
      </div>

      <div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:8px;">✅ 행동 가이드</div>
      <div class="action-checklist" style="margin-bottom:16px;">${_actionItems(d.actions)}</div>

      <div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:8px;">📞 도움 연결</div>
      <div class="help-cards">
        ${d.help.map(h => `
          <a href="tel:${h.number.replace(/-/g,'')}" class="help-card" aria-label="${h.name} ${h.number}">
            <div class="help-card-num">📞 ${h.number}</div>
            <div class="help-card-info">
              <div class="help-card-name">${esc(h.name)}</div>
              <div class="help-card-desc">${esc(h.desc)}</div>
            </div>
          </a>`).join('')}
      </div>
    </div>
  `;
}

/* ── 상황 아코디언 열릴 때 체크도구 초기화 ── */
function _initElderCheck(id) {
  const wrap = document.getElementById('elder-check-' + id);
  if (!wrap || wrap.dataset.init) return;
  wrap.dataset.init = '1';
  const d = ELDER_CARE_DATA[id];
  if (d && d.check && typeof renderCheckTool === 'function') {
    renderCheckTool(wrap, d.check);
  }
}

/* ── 상황 아코디언 토글 (체크도구 lazy init) ── */
function toggleElderSituation(header) {
  const item = header.closest('.accordion-item');
  if (!item) return;
  const id = item.dataset.sitId;
  toggleAccordion(header);
  if (id && item.classList.contains('open')) {
    _initElderCheck(id);
  }
}

/* ── 실전 돌봄 가이드 렌더 ── */
function _renderPracticalGuide(guides) {
  return guides.map(g => {
    const faqHTML = g.details.map(d =>
      `<div style="margin-bottom:14px;">
        <div style="font-size:13px;font-weight:600;color:var(--ink);margin-bottom:4px;">Q. ${esc(d.q)}</div>
        <div style="font-size:12.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;">${esc(d.a)}</div>
      </div>`
    ).join('');

    return `
      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>${g.icon} ${esc(g.title)}</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div style="display:inline-block;padding:3px 10px;background:var(--peach-p);color:var(--peach-d);border-radius:20px;font-size:10.5px;font-weight:600;margin-bottom:10px;">${esc(g.badge)}</div>
          <p style="font-size:13px;color:var(--ink-m);line-height:1.75;margin-bottom:10px;">${esc(g.summary)}</p>
          <div style="background:linear-gradient(135deg,rgba(200,48,42,.06),rgba(200,48,42,.02));border:1px solid rgba(200,48,42,.15);border-radius:12px;padding:10px 14px;margin-bottom:16px;">
            <span style="font-size:12px;font-weight:700;color:#A02020;">⚠️ 꼭 기억하세요</span>
            <p style="font-size:12.5px;color:var(--ink-m);line-height:1.7;margin-top:4px;">${esc(g.warn)}</p>
          </div>
          ${faqHTML}
        </div></div>
      </div>`;
  }).join('');
}

function renderElderPage(container) {
  if (!container) return;
  const d = ELDER_CARE_DATA;

  const welfareHTML = d.welfare.items.map(w => `
    <div class="accordion-item">
      <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
        <span>${w.icon} ${esc(w.name)}</span><span class="accordion-arrow">▼</span>
      </div>
      <div class="accordion-body"><div class="accordion-body-inner">
        <p style="font-size:13px;color:var(--ink-m);line-height:1.75;margin-bottom:10px;">${esc(w.desc)}</p>
        <a href="tel:${w.contact.replace(/-/g,'')}" style="display:inline-block;padding:8px 16px;background:var(--peach-p);color:var(--peach-d);border-radius:10px;font-size:12.5px;font-weight:600;text-decoration:none;">📞 ${w.contact} 전화하기</a>
      </div></div>
    </div>`).join('');

  container.innerHTML = `
    <button class="page-back" onclick="goHome()">← 홈으로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,var(--hero-elder-from),var(--hero-elder-to))">
      <span class="content-hero-icon">🧓</span>
      <h1>${esc(d.intro.title)}</h1>
      <p>${esc(d.intro.sub)}</p>
    </div>

    <div class="stat-badge"><strong>${d.intro.stat.pct}</strong>&nbsp;${esc(d.intro.stat.label)}</div>

    <div class="step-section">
      <div class="step-label">어떤 상황이에요?</div>
      <p style="font-size:12.5px;color:var(--ink-l);margin-bottom:14px;">해당하는 상황을 눌러보세요. 자가진단과 행동 가이드를 바로 확인할 수 있어요.</p>
      <div class="accordion-group">
        ${d.situations.map(s => `
          <div class="accordion-item" data-sit-id="${s.id}">
            <div class="accordion-header" onclick="toggleElderSituation(this)" tabindex="0" aria-expanded="false">
              <span>${s.icon} ${esc(s.label)}</span><span class="accordion-arrow">▼</span>
            </div>
            <div class="accordion-body"><div class="accordion-body-inner">
              ${_renderSituationContent(s.id)}
            </div></div>
          </div>`).join('')}
      </div>
    </div>

    <div class="step-section">
      <div class="step-label">🩺 실전 돌봄 가이드</div>
      <p style="font-size:12.5px;color:var(--ink-l);margin-bottom:14px;">요양보호사가 배우는 핵심 돌봄 지식이에요. 가정에서도 바로 활용할 수 있어요.</p>
      <div class="accordion-group">${_renderPracticalGuide(d.practicalGuide)}</div>
    </div>

    <div class="step-section">
      <div class="step-label">📋 복지 제도 한눈에</div>
      <p style="font-size:12.5px;color:var(--ink-l);margin-bottom:14px;">활용할 수 있는 지원이 생각보다 많아요. 눌러서 확인해 보세요.</p>
      <div class="accordion-group">${welfareHTML}</div>
    </div>

    <div class="step-section">
      <div class="step-label">📞 주요 연락처</div>
      <div class="help-cards">
        <a href="tel:18999988" class="help-card"><div class="help-card-num">📞 1899-9988</div><div class="help-card-info"><div class="help-card-name">중앙치매센터</div><div class="help-card-desc">치매 상담·검진·돌봄 서비스 연결. 365일 무료.</div></div></a>
        <a href="tel:15771000" class="help-card"><div class="help-card-num">📞 1577-1000</div><div class="help-card-info"><div class="help-card-name">국민건강보험공단</div><div class="help-card-desc">장기요양등급 신청·재가급여·긴급돌봄 안내.</div></div></a>
        <a href="tel:15771389" class="help-card"><div class="help-card-num">📞 1577-1389</div><div class="help-card-info"><div class="help-card-name">노인보호전문기관</div><div class="help-card-desc">노인 학대 상담·신고. 가해자 상담도 가능.</div></div></a>
        <a href="tel:129" class="help-card"><div class="help-card-num">📞 129</div><div class="help-card-info"><div class="help-card-name">정부 복지상담센터</div><div class="help-card-desc">노인 복지 혜택 통합 안내. 무료.</div></div></a>
        <a href="tel:109" class="help-card"><div class="help-card-num">📞 109</div><div class="help-card-info"><div class="help-card-name">자살예방상담전화</div><div class="help-card-desc">무료, 24시간. 간병이 너무 힘들 때도 전화해도 돼요.</div></div></a>
      </div>
    </div>
  `;
}
