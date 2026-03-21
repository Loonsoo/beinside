/* ═══════════════════════════════════════════════════════════
   BeInside — 감정 가이드 페이지 (Part B-1)
═══════════════════════════════════════════════════════════ */

const EMOTION_GUIDE_DATA = {
  sad: {
    icon: '😢', label: '계속 슬퍼요',
    recognition: '계속 슬픈 건, 뭔가 중요한 걸 잃었거나 지쳐 있다는 신호예요. 이 감정을 느끼는 건 나약한 게 아니에요.',
    psychology: '정신의학에서 지속적 슬픔은 "주요우울장애(MDD)"의 핵심 증상이에요. 세로토닌·노르에피네프린 등 신경전달물질의 불균형이 원인일 수 있어요. 2주 이상 지속되면 단순한 기분이 아닌 뇌의 화학적 변화일 가능성이 높아요.',
    techniques: [
      { name: '행동 활성화(Behavioral Activation)', desc: '우울할 때 가만히 있으면 더 우울해져요. 아주 작은 행동(이불 개기, 창문 열기)부터 시작해 뇌의 보상 회로를 조금씩 깨워 보세요.' },
      { name: '인지 재구성(Cognitive Restructuring)', desc: '"나는 쓸모없어"라는 생각이 들면, 그 생각의 증거를 찾아보세요. 대부분 증거가 부족해요. 생각은 사실이 아닐 수 있어요.' },
      { name: '감정 라벨링(Affect Labeling)', desc: '"슬프다"라고 이름 붙이는 것만으로 편도체(공포·감정 중추)의 활성화가 줄어들어요. 감정을 느끼면 구체적으로 이름을 붙여보세요.' }
    ],
    check: {
      id: 'ct_sad',
      title: '아래 중 해당되는 게 있나요?',
      questions: [
        '2주 이상 거의 매일 이런 기분이다',
        '일상생활(출근, 식사, 씻기)이 어렵다',
        '나를 해치고 싶다는 생각이 든다'
      ],
      emergencyIndex: 2,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <br><a href="tel:109" style="color:inherit;font-weight:700;text-decoration:underline;">📞 109 자살예방상담전화</a> — 무료, 24시간. 자세한 내용(비밀보장 등)은 전화 시 확인해 주세요.',
      results: {
        high: { label: '전문 상담을 받아보는 것을 권해요', threshold: 2, action: '가까운 정신건강복지센터나 <a href="tel:109">109</a>(무료·24시간)에 연락해 보세요.' },
        mid:  { label: '일시적일 수 있지만, 전문가 상담도 고려해 보세요', threshold: 1, action: '증상이 지속되면 보건소 정신건강 서비스(무료)를 이용해 보세요.' },
        low:  { label: '일시적인 감정일 수 있어요. 아래 방법을 시도해 보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '🌬️', text: '지금 있는 자리에서 깊게 숨 3번 쉬기 (5초 흡입 — 5초 내쉬기)' },
      { icon: '🚪', text: '창문 열거나 밖에 10분 나가기' },
      { icon: '💬', text: '신뢰하는 사람 1명에게 "나 좀 힘들어"라고 문자 보내기' }
    ],
    help: [
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 상담사가 이야기를 들어줘요. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 정신건강 어려움 전반.' }
    ]
  },
  anxious: {
    icon: '😰', label: '불안해서 잠이 안 와요',
    recognition: '불안은 위험을 감지하는 정상적인 신호예요. 하지만 잠을 방해할 정도라면, 몸이 과부하 상태라는 뜻이에요.',
    psychology: '불안은 편도체가 위험 신호를 과잉 감지할 때 발생해요. 범불안장애(GAD)에서는 이 경보 시스템이 계속 켜져 있어요. 자율신경계의 "투쟁-도피 반응"이 활성화되어 심장이 빨라지고, 근육이 긴장하고, 소화가 멈춰요.',
    techniques: [
      { name: '박스 호흡법(Box Breathing)', desc: '4초 들이쉬기→4초 멈추기→4초 내쉬기→4초 멈추기. 부교감신경을 활성화해 불안의 신체 반응을 직접 낮춰줘요.' },
      { name: '점진적 근이완법(PMR)', desc: '발끝부터 머리까지 근육을 5초간 긴장시켰다가 풀기를 반복해요. 몸의 긴장이 풀리면 뇌도 "안전하다"는 신호를 받아요.' },
      { name: '걱정 시간 제한법(Worry Time)', desc: '하루 15분을 "걱정 시간"으로 정하세요. 그 외 시간에 걱정이 오면 "나중에 걱정하자"로 미루세요. 뇌가 걱정의 통제감을 되찾아요.' }
    ],
    check: {
      id: 'ct_anxious',
      title: '아래 중 해당되는 게 있나요?',
      questions: [
        '2주 이상 매일 잠들기 어렵다',
        '심장이 두근거리거나 숨이 막히는 느낌이 자주 든다',
        '걱정이 멈추지 않아서 일상이 어렵다',
        '나를 해치고 싶다는 생각이 든다'
      ],
      emergencyIndex: 3,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:109" style="color:inherit;font-weight:700">📞 109</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '전문가 상담이 필요한 수준이에요', threshold: 3, action: '<a href="tel:1577-0199">1577-0199</a>(정신건강위기상담, 무료·24시간) 또는 정신건강복지센터에 연락해 보세요.' },
        mid:  { label: '주의가 필요해요', threshold: 1, action: '증상이 지속되면 보건소 정신건강 서비스를 이용해 보세요.' },
        low:  { label: '지금은 괜찮아요. 아래 방법으로 불안을 낮춰보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '⏱️', text: '4초 들이쉬고 — 4초 멈추고 — 4초 내쉬기 (박스 호흡법). 3~5회 반복하면 효과가 있어요.' },
      { icon: '🤲', text: '손바닥을 꽉 쥐었다가 천천히 펴기. 신체 감각에 집중하면 생각이 잠깐 멈춰요.' },
      { icon: '📵', text: '잠자리에 들기 1시간 전에는 스마트폰을 내려두세요. 블루라이트가 수면 신호를 방해해요.' }
    ],
    help: [
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' }
    ]
  },
  numb: {
    icon: '😶', label: '아무 감정도 안 느껴져요',
    recognition: '감정이 없는 것처럼 느껴질 때, 당신의 뇌가 과도한 스트레스로부터 스스로를 지키고 있는 거예요. 지금은 느끼지 못해도, 감정은 사라진 게 아니라 잠시 쉬고 있는 거예요.',
    psychology: '감정 무감각(Emotional Numbing)은 뇌가 과도한 스트레스로부터 자신을 보호하는 해리(Dissociation) 반응이에요. 전전두엽이 감정 처리를 억제하면서 "꺼진 것 같은" 상태가 돼요. 우울증이나 PTSD의 한 형태일 수 있어요.',
    techniques: [
      { name: '감각 자극법(Sensory Grounding)', desc: '얼음 조각 쥐기, 찬물 세수, 강한 향의 것 맡기 — 신체 감각 자극이 해리 상태에서 "지금 여기"로 돌아오게 도와줘요.' },
      { name: '5-4-3-2-1 기법', desc: '지금 보이는 것 5개, 들리는 것 4개, 만질 수 있는 것 3개, 냄새 2개, 맛 1개를 찾아보세요. 감각을 통해 현재에 연결돼요.' },
      { name: '마이크로 감정 일기', desc: '하루에 한 번, "지금 0~10점 중 몇 점?"만 기록해 보세요. 숫자로라도 감정을 인식하는 연습이 감정 회로를 다시 여는 시작이에요.' }
    ],
    check: {
      id: 'ct_numb',
      title: '아래 중 해당되는 게 있나요?',
      questions: [
        '2주 이상 무감각한 상태가 지속된다',
        '좋아했던 것에 전혀 흥미가 없다',
        '음식 맛도, 기쁨도, 슬픔도 잘 느껴지지 않는다'
      ],
      results: {
        high: { label: '우울증 증상과 비슷해요. 전문가 상담을 권해요.', threshold: 2, action: '정신건강복지센터(무료) 또는 <a href="tel:1577-0199">1577-0199</a>에 연락해 보세요.' },
        mid:  { label: '스트레스가 많이 쌓인 상태예요.', threshold: 1, action: '오늘 하나만: 좋아하던 노래 한 곡 틀어보세요.' },
        low:  { label: '일시적인 무감각일 수 있어요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '🎵', text: '예전에 좋아했던 노래 한 곡 틀기. 감각을 깨우는 가장 쉬운 방법이에요.' },
      { icon: '🚿', text: '따뜻한 물로 샤워하기. 신체 감각 자극이 감정 회로를 조금씩 열어줘요.' },
      { icon: '🐾', text: '밖에 10분만 나가서 발바닥이 땅에 닿는 감각에 집중해 보세요.' }
    ],
    help: [
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' },
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },
  angry: {
    icon: '😤', label: '이유 없이 화가 나요',
    recognition: '이유 없는 분노 뒤에는 대부분 억눌린 슬픔이나 무력감이 있어요. 화는 감정의 문이에요 — 들어가 보면 다른 감정이 있어요.',
    psychology: '분노의 이면에는 대부분 1차 감정(두려움, 슬픔, 무력감)이 숨어 있어요. 뇌과학적으로 편도체가 위협을 감지하면 전전두엽(이성적 판단)보다 먼저 반응해요. 이것이 "생각 전에 폭발하는" 이유예요.',
    techniques: [
      { name: 'STOP 기법', desc: 'Stop(멈추기)→Take a breath(숨 쉬기)→Observe(관찰하기)→Proceed(진행하기). 자동 반응과 의식적 반응 사이에 공간을 만들어줘요.' },
      { name: '분노 이면 탐색', desc: '"화가 났다" 밑에 무엇이 있는지 물어보세요. "사실은 무시당한 것 같아서 서러웠다"처럼, 진짜 감정을 찾으면 분노가 줄어들어요.' },
      { name: '신체 에너지 방출', desc: '분노의 에너지는 신체에 저장돼요. 빠르게 걷기, 계단 오르기, 쿠션 치기 등으로 물리적으로 방출하면 뇌의 각성 수준이 내려가요.' }
    ],
    check: {
      id: 'ct_angry',
      title: '아래 중 해당되는 게 있나요?',
      questions: [
        '가족이나 가까운 사람에게 폭발한 적이 있다',
        '분노 후 심한 죄책감이 든다',
        '분노를 조절하기 어렵다고 느낀다'
      ],
      results: {
        high: { label: '분노 조절 관련 전문 상담이 도움이 될 수 있어요.', threshold: 2, action: '정신건강복지센터에서 무료 상담을 받을 수 있어요.' },
        mid:  { label: '스트레스가 과부하 상태예요.', threshold: 1 },
        low:  { label: '지금 느끼는 화, 아래 방법으로 배출해 보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '🏃', text: '5분만 빠르게 걷기. 아드레날린을 신체적으로 소비하는 게 가장 효과적이에요.' },
      { icon: '✍️', text: '지금 화나는 것을 종이에 적기. 쓰는 행위만으로도 감정 강도가 내려가요.' },
      { icon: '⏸️', text: '반응하기 전 10초 기다리기. "나는 지금 화가 났다"를 소리 내어 말해보세요.' }
    ],
    help: [
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' }
    ]
  },
  exhausted: {
    icon: '🫠', label: '너무 지쳐서 아무것도 하기 싫어요',
    recognition: '아무것도 하기 싫을 때, 그건 게으름이 아니에요. 몸과 마음이 충전을 요청하는 신호예요.',
    psychology: '만성 피로는 코르티솔(스트레스 호르몬)의 장기적 과잉 분비 후 고갈되는 "부신 피로" 상태와 관련돼요. 번아웃이 심해지면 뇌의 보상 회로가 둔감해져서 아무것도 하고 싶지 않게 돼요. 이건 의지력 문제가 아니라 신경생물학적 고갈이에요.',
    techniques: [
      { name: '에너지 버짓(Energy Budget)', desc: '하루 에너지를 10칸으로 나누고, 각 활동에 칸을 배분해 보세요. "에너지를 쓰는 것"과 "채우는 것"을 구분하는 것이 회복의 시작이에요.' },
      { name: '최소 유효 행동(Minimum Viable Action)', desc: '"운동 30분"이 아니라 "현관문 밖에 서기"부터. 가장 작은 한 걸음만 해보세요. 뇌는 "시작했다"는 것만으로도 보상 신호를 보내요.' },
      { name: '수면 위생(Sleep Hygiene)', desc: '매일 같은 시간에 자고 일어나기, 잠자리에서 핸드폰 보지 않기, 카페인 오후 2시 이후 금지. 수면의 질이 회복의 기반이에요.' }
    ],
    check: {
      id: 'ct_exhausted',
      title: '아래 중 해당되는 게 있나요?',
      questions: [
        '쉬어도 회복이 안 된다',
        '2주 이상 지속됐다',
        '일상적인 것(씻기, 식사)이 버겁다'
      ],
      results: {
        high: { label: '번아웃 또는 우울증 가능성이 있어요. 전문가 상담을 권해요.', threshold: 2, action: '<a href="tel:1577-0199">1577-0199</a>(정신건강위기상담, 무료·24시간)에 연락해 보세요.' },
        mid:  { label: '깊은 피로 상태예요.', threshold: 1 },
        low:  { label: '오늘만큼은 쉬어도 돼요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '🛌', text: '오늘 할 일 목록에서 하나를 지우세요. 안 해도 되는 것이 있어요.' },
      { icon: '☀️', text: '15분만 햇빛 아래 앉아있기. 세로토닌이 조금씩 올라가요.' },
      { icon: '🥤', text: '물 한 잔 마시기. 탈수가 피로감을 2배로 높여요.' }
    ],
    help: [
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' },
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },
  lonely: {
    icon: '😔', label: '외로워서 견딜 수 없어요',
    recognition: '외로움은 연결에 대한 인간의 본능적 욕구예요. 느끼는 것 자체가 잘못된 게 아니에요.',
    psychology: '외로움은 뇌에서 실제 신체적 통증과 같은 영역(전대상회피질)을 활성화해요. 진화적으로 인간은 집단에서 이탈하면 생존이 위협받았기 때문에, 외로움을 "위험 신호"로 처리해요. 만성 외로움은 면역 기능 저하, 심혈관 질환 위험 증가와도 연관돼요.',
    techniques: [
      { name: '소속감의 3단계', desc: '1단계: 같은 공간에 있기 (카페, 도서관). 2단계: 같은 활동 하기 (수업, 동호회). 3단계: 서로 알기 (이름, 이야기). 1단계부터 시작해도 돼요.' },
      { name: '자기 연민(Self-Compassion)', desc: '크리스틴 네프 교수의 방법: "지금 힘들구나"(마음챙김) + "누구나 외로울 수 있어"(공통 인간성) + "나에게 따뜻하게 대하자"(자기 친절).' },
      { name: '마이크로 연결', desc: '편의점 직원에게 "감사합니다" 한마디, 이웃에게 목례, 온라인 커뮤니티 댓글 — 아주 작은 연결도 뇌의 사회적 보상 회로를 활성화해요.' }
    ],
    check: {
      id: 'ct_lonely',
      title: '아래 중 해당되는 게 있나요?',
      questions: [
        '이야기를 나눌 사람이 한 명도 없다',
        '외로움이 2주 이상 지속됐다',
        '사람들과 있어도 외롭다'
      ],
      results: {
        high: { label: '만성적 고립 상태일 수 있어요. 상담을 통해 연결을 찾아볼 수 있어요.', threshold: 2, action: '정신건강복지센터(무료)에서 도움을 받을 수 있어요.' },
        mid:  { label: '연결이 필요한 시점이에요.', threshold: 1 },
        low:  { label: '아래 방법으로 작은 연결을 만들어 보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '💌', text: '오래된 친구에게 문자 한 통 보내기. "잘 지내?"라고만 해도 충분해요.' },
      { icon: '☕', text: '카페나 도서관처럼 사람이 있는 곳에 가서 1~2시간 있어보기.' },
      { icon: '📞', text: '말이 하고 싶다면 <a href="tel:109">109</a>에 전화해도 돼요. 상담사가 들어줘요.' }
    ],
    help: [
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 외로울 때도 전화할 수 있어요. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' }
    ]
  },
  overthinking: {
    icon: '🤯', label: '생각이 너무 많아요',
    recognition: '생각이 멈추지 않을 때, 뇌가 문제를 해결하려 과부하 상태예요. 생각을 멈추려는 것보다 생각을 흘려보내는 것이 효과적이에요.',
    psychology: '반추(Rumination)는 같은 생각을 반복하는 패턴으로, 우울증·불안장애의 핵심 유지 요인이에요. 뇌의 디폴트 모드 네트워크(DMN)가 과활성화되어 자기 참조적 사고가 멈추지 않아요. 생각을 "멈추려" 할수록 역설적으로 더 강해져요.',
    techniques: [
      { name: '메타인지 훈련', desc: '"나는 지금 반추하고 있구나"라고 한 발 물러서 관찰해 보세요. 생각의 "내용"이 아니라 "과정"을 보는 것만으로 강도가 줄어요.' },
      { name: '외부화(Externalization)', desc: '걱정을 종이에 적으면 뇌의 작업 기억에서 "내려놓기"가 돼요. "적어뒀으니 잊어도 된다"는 신호를 보내는 거예요.' },
      { name: '감각 전환(Sensory Switch)', desc: '생각이 멈추지 않을 때 감각 채널을 바꿔보세요. 냉수 세수, 강한 민트 사탕, 빠른 음악 — DMN을 끊고 외부 감각으로 주의를 전환해요.' }
    ],
    check: {
      id: 'ct_overthink',
      title: '아래 중 해당되는 게 있나요?',
      questions: [
        '밤에 생각이 멈추지 않아 잠들기 어렵다',
        '같은 걱정이 반복적으로 든다',
        '최악의 상황을 자꾸 상상한다'
      ],
      results: {
        high: { label: '불안장애나 반추 사고 패턴일 수 있어요. 전문가 상담이 도움이 돼요.', threshold: 2, action: '인지행동치료(CBT)가 효과적이에요. 정신건강복지센터에서 무료로 받을 수 있어요.' },
        mid:  { label: '스트레스가 쌓인 상태예요.', threshold: 1 },
        low:  { label: '아래 방법으로 생각의 흐름을 바꿔보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '📝', text: '지금 머릿속 걱정을 모두 종이에 적기. "적어두면 잊어도 된다"는 신호를 뇌에 보내요.' },
      { icon: '⏰', text: '"걱정 시간" 정하기: 하루 15분만 걱정하기. 그 외 시간에 걱정이 오면 "나중에 걱정하기"로 미루기.' },
      { icon: '🎧', text: '팟캐스트나 라디오 틀기. 다른 목소리가 뇌의 내부 독백을 방해해요.' }
    ],
    help: [
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' },
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  }
};

/* ── 위기 화면 (별도 경로) ── */
function buildCrisisScreen(container) {
  container.innerHTML = `
    <div class="crisis-page">
      <div class="crisis-msg">
        지금 많이 힘드시죠.<br>
        <em>여기까지 온 것만으로도 용기 있는 일이에요.</em><br><br>
        지금 바로 이야기를 들어줄 사람이 있어요.
      </div>
      <a href="tel:109" class="emergency-call-big" aria-label="109 자살예방상담전화 전화하기">
        📞 109 자살예방상담전화
      </a>
      <p style="font-size:13px;color:var(--ink-m);margin-bottom:24px;">전화하면 상담사가 이야기를 들어줘요. 무료, 24시간.<br>자세한 내용(비밀보장 범위 등)은 전화 시 확인해 주세요.</p>
      <a href="https://pf.kakao.com/_DAxbYG" target="_blank" rel="noopener"
         class="emergency-call-big" style="background:linear-gradient(135deg,#3A1F6E,#6A3CB8);"
         aria-label="카카오톡 마들랜 자살예방 상담">
        💬 카카오톡으로 상담하기 (마들랜)
      </a>
      <p style="font-size:13px;color:var(--ink-m);margin-bottom:32px;">전화가 어려우면 카카오톡으로도 상담할 수 있어요.<br>(보건복지부 공식 자살예방 SNS상담 '마들랜', 무료·24시간)</p>
      <p class="crisis-sub">
        지금 당장 전화하기 어렵다면,<br>
        이 페이지를 닫지 말고 잠시만 있어주세요.<br>
        당신은 혼자가 아니에요.
      </p>
      <button onclick="renderEmotionPage(document.getElementById('emotion-content'))"
              style="margin-top:28px;background:none;border:1px solid var(--line);border-radius:12px;padding:10px 20px;font-size:13px;color:var(--ink-l);cursor:pointer;">
        ← 돌아가기
      </button>
    </div>
  `;
}

/* ── 감정별 콘텐츠 렌더링 ── */
function buildEmotionDetail(container, key) {
  const d = EMOTION_GUIDE_DATA[key];
  if (!d) return;

  const techHTML = d.techniques ? d.techniques.map(t =>
    `<div style="margin-bottom:12px;">
      <div style="font-size:13px;font-weight:700;color:var(--peach-d);margin-bottom:4px;">${esc(t.name)}</div>
      <p style="font-size:12.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;">${esc(t.desc)}</p>
    </div>`
  ).join('') : '';

  container.innerHTML = `
    <button class="page-back" onclick="renderEmotionPage(document.getElementById('emotion-content'))">← 감정 목록으로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,var(--lavender-d),var(--lavender))">
      <span class="content-hero-icon">${d.icon}</span>
      <h1>${esc(d.label)}</h1>
    </div>

    <div class="step-section">
      <div class="step-label">지금 이런 상태예요</div>
      <p style="font-size:13.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;">${esc(d.recognition)}</p>
    </div>

    <div class="accordion-group">
      ${d.psychology ? `
      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🧠 왜 이런 감정이 드는 걸까?</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <p style="font-size:13px;color:var(--ink-m);line-height:1.8;word-break:keep-all;">${esc(d.psychology)}</p>
        </div></div>
      </div>` : ''}

      ${techHTML ? `
      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>💡 정신의학적 자기 돌봄법</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          ${techHTML}
        </div></div>
      </div>` : ''}

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🔍 상황 판단</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div id="check-section-${key}"></div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>✅ 지금 바로 할 수 있는 것</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div class="action-checklist">
            ${d.actions.map(a => `
              <div class="action-item" onclick="toggleAction(this)" role="checkbox" aria-checked="false" tabindex="0">
                <div class="action-check" aria-hidden="true"></div>
                <div class="action-text"><span class="action-emoji">${a.icon}</span><span>${esc(a.text)}</span></div>
              </div>
            `).join('')}
          </div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>📞 도움 연결</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div class="help-cards">
            ${d.help.map(h => `
              <a href="tel:${h.number}" class="help-card" aria-label="${h.name} ${h.number}">
                <div class="help-card-num">📞 ${h.number}</div>
                <div class="help-card-info">
                  <div class="help-card-name">${esc(h.name)}</div>
                  <div class="help-card-desc">${esc(h.desc)}</div>
                </div>
              </a>
            `).join('')}
          </div>
        </div></div>
      </div>
    </div>
  `;

  // 체크 툴 주입 — accordion이 열린 후에도 동작하도록
  const checkSection = container.querySelector(`#check-section-${key}`);
  if (checkSection && typeof renderCheckTool === 'function') {
    renderCheckTool(checkSection, d.check);
  }
}

/* ── 메인 감정 목록 화면 ── */
function renderEmotionPage(container) {
  if (!container) return;

  container.innerHTML = `
    <button class="page-back" onclick="goHome()">← 홈으로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,var(--lavender-d),var(--lavender))">
      <span class="content-hero-icon">😔</span>
      <h1>감정 가이드</h1>
      <p>감정을 어떻게 해야 할지 모르겠을 때,<br>여기서 잠깐 쉬어가도 돼요.</p>
    </div>

    <div class="step-section">
      <div class="step-label">지금 어떤 느낌이에요?</div>
      <div class="emotion-grid">
        ${Object.entries(EMOTION_GUIDE_DATA).map(([k, v]) =>
          `<button class="emotion-btn" onclick="buildEmotionDetail(document.getElementById('emotion-content'),'${k}')"
                   aria-label="${v.label}">
            <span class="emotion-btn-icon">${v.icon}</span>
            <span>${esc(v.label)}</span>
          </button>`
        ).join('')}
        <button class="emotion-btn crisis" onclick="buildCrisisScreen(document.getElementById('emotion-content'))"
                aria-label="죽고 싶다는 생각이 들어요">
          <span class="emotion-btn-icon">💀</span>
          <span>죽고 싶다는 생각이 들어요</span>
        </button>
      </div>
    </div>
  `;
}
