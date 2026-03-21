/* ═══════════════════════════════════════════════════════════
   BeInside — 사별·상실 가이드 (grief-page.js)
   떠나보낸 사람들을 위한 따뜻한 동행
═══════════════════════════════════════════════════════════ */

const GRIEF_DATA = {
  situations: [
    { id: 'parent',  icon: '🕊️', label: '부모님을 떠나보냈어요',     sub: '세상에서 가장 오래된 안전기지를 잃었을 때' },
    { id: 'child',   icon: '🌷', label: '아이를 떠나보냈어요',       sub: '세상에서 가장 큰 상실을 겪고 있을 때' },
    { id: 'spouse',  icon: '💫', label: '배우자를 떠나보냈어요',     sub: '함께한 일상이 사라졌을 때' },
    { id: 'sibling', icon: '🤝', label: '형제·자매를 떠나보냈어요',  sub: '어린 시절을 함께한 사람을 잃었을 때' },
    { id: 'friend',  icon: '🌿', label: '친구를 떠나보냈어요',       sub: '내 편이었던 사람이 갑자기 사라졌을 때' },
    { id: 'miscarriage', icon: '🌼', label: '아이를 잃었어요 (유산·사산)', sub: '만나지 못한 아이를 보내야 했을 때' },
    { id: 'pet',     icon: '🐾', label: '반려동물을 떠나보냈어요',   sub: '말 없이 곁을 지켜준 존재를 잃었을 때' }
  ],

  parent: {
    recognition: '부모님은 당신에게 세상에서 가장 오래된 안전기지였어요. 그 분이 떠나면 세상이 흔들리는 느낌이 들 수 있어요. 그 감정은 완전히 자연스러운 거예요. 그리고 당신은 그 분 없이도 여기까지 온, 충분히 강한 사람이에요.',
    psychology: '존 볼비(Bowlby)의 애착이론에서 부모는 인간의 첫 번째 "안전기지(Secure Base)"예요. 이 기지를 잃으면 성인이 되어도 세상이 불안하게 느껴질 수 있어요. 애도(grief)는 뇌가 "더 이상 이 사람에게 돌아갈 수 없다"는 현실을 처리하는 과정이에요. 이 과정에는 정해진 시간이 없어요.',
    techniques: [
      { name: '지속 유대(Continuing Bonds)', desc: '고인과의 관계가 "끝난" 것이 아니라 "형태가 바뀐" 거예요. 생전에 해주시던 말을 떠올리거나, 좋아하시던 음식을 만들어 보세요. 기억 속에서 관계는 계속돼요.' },
      { name: '이중 과정 모델(Dual Process)', desc: '슬픔에 빠지는 시간과 일상을 살아가는 시간이 번갈아 와요. 울다가도 밥을 먹고, 웃다가도 갑자기 울 수 있어요. 이건 건강한 애도 과정이에요.' },
      { name: '기억 의식(Memorial Ritual)', desc: '제사나 추모가 아니어도 괜찮아요. 부모님이 좋아하시던 산책길을 걷거나, 생신에 케이크를 사는 것 — 나만의 방식으로 기억하는 의식을 만들어 보세요.' }
    ],
    check: {
      id: 'ct_grief_parent', title: '지금 내 상태는?',
      questions: [
        '일상생활(식사, 수면, 업무)이 2주 이상 어렵다',
        '떠나신 분에 대한 죄책감이 매우 크다',
        '주변 사람들과 관계가 단절되고 있다',
        '나를 해치고 싶다는 생각이 든다'
      ],
      emergencyIndex: 3,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:109" style="color:inherit;font-weight:700">📞 109</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '지금 많이 힘든 상태예요', threshold: 2, action: '오늘 하나만: 떠나신 분에게 편지를 써 보세요. 그리고 이 마음을 나눌 수 있는 전문 상담(정신건강복지센터, 무료)도 도움이 돼요.' },
        mid:  { label: '힘든 시기를 지나고 있어요', threshold: 1 },
        low:  { label: '천천히 애도의 과정을 걸어가고 있어요', threshold: 0 }
      }
    },
    actions: [
      { icon: '✍️', text: '떠나신 분에게 편지를 써 보세요. 다 하지 못한 말, 고마웠던 것, 미안했던 것 — 적는 것만으로도 감정이 정리돼요.' },
      { icon: '📸', text: '사진 한 장을 꺼내 보세요. 그때의 이야기를 누군가에게 들려주세요. 기억을 나누면 슬픔이 조금 가벼워져요.' },
      { icon: '🚶', text: '오늘 10분만 밖에 나가 걸어보세요. 부모님이 좋아하셨을 하늘을 올려다보세요.' },
      { icon: '🤝', text: '같은 경험을 한 사람을 찾아보세요. 사별 자조 모임은 "나만 이런 게 아니구나"를 느끼게 해줘요.' }
    ],
    help: [
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 상실의 고통이 극심할 때. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 애도 과정에서 전문 상담이 필요할 때.' },
      { number: '1393-8282', name: '한국호스피스완화의료학회', desc: '사별 가족 지원 프로그램 안내.' }
    ]
  },

  child: {
    recognition: '자녀를 잃는 것은 인간이 경험하는 가장 큰 상실이에요. "부모보다 먼저 갈 수 없다"는 자연의 순서가 깨진 것이기에, 이 고통에는 어떤 위로도 부족하게 느껴질 수 있어요. 그저 지금 여기까지 온 것만으로도 대단한 일이에요.',
    psychology: '자녀 상실은 "복잡성 애도(Complicated Grief)"로 발전할 확률이 가장 높은 상실 유형이에요. 부모의 정체성 자체가 흔들리기 때문이에요. 죄책감("내가 더 잘했더라면"), 분노("왜 하필 우리 아이가"), 의미 상실("살아서 뭐하나")이 복합적으로 나타날 수 있어요. 이 모든 감정은 사랑의 다른 표현이에요.',
    techniques: [
      { name: '의미 재구성(Meaning Reconstruction)', desc: '로버트 네이마이어(Neimeyer) 교수의 접근법이에요. "왜?"라는 질문에 답이 없을 때, "이 경험 속에서 무엇을 발견할 수 있을까?"로 질문을 바꿔보세요. 시간이 필요하고, 지금은 그냥 아파도 괜찮아요.' },
      { name: '기억 보존 작업', desc: '아이의 물건, 사진, 그림, 영상 — 정리하지 않아도 돼요. 준비가 됐을 때, 기억 상자를 만들거나 앨범을 정리해 보세요. 기억을 보존하는 것은 잊지 않겠다는 약속이에요.' },
      { name: '동반 애도(Shared Grieving)', desc: '배우자나 다른 자녀와 함께 슬퍼해 보세요. 서로 다른 방식으로 슬퍼하는 것은 당연해요. "각자의 방식을 존중하되, 함께 있는 시간"을 만들어 보세요.' }
    ],
    check: {
      id: 'ct_grief_child', title: '지금 내 상태는?',
      questions: [
        '아이를 보낸 후 일상이 완전히 멈췄다',
        '"내 탓이다"라는 죄책감이 극심하다',
        '다른 아이를 보면 견딜 수 없다',
        '나를 해치고 싶다는 생각이 든다'
      ],
      emergencyIndex: 3,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:109" style="color:inherit;font-weight:700">📞 109</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '지금 많이 힘든 상태예요', threshold: 2, action: '오늘 하나만: 아이에게 편지를 써 보세요. 그리고 준비가 되면 사별 전문 상담(정신건강복지센터, 무료)도 도움이 돼요.' },
        mid:  { label: '깊은 슬픔의 시기를 지나고 있어요. 당신은 혼자가 아니에요.', threshold: 1 },
        low:  { label: '아이를 기억하며 한 걸음씩 나아가고 있어요', threshold: 0 }
      }
    },
    actions: [
      { icon: '🕯️', text: '아이를 위한 작은 공간을 만들어 보세요. 사진 한 장, 좋아하던 인형 하나 — 기억할 수 있는 장소가 위안이 돼요.' },
      { icon: '✍️', text: '아이에게 편지를 써 보세요. "보고 싶어", "사랑해" — 하고 싶었던 말을 적어보세요.' },
      { icon: '🤝', text: '같은 경험을 한 부모 모임을 찾아보세요. 이 고통을 이해하는 사람은 같은 경험을 한 사람뿐이에요.' },
      { icon: '🌿', text: '다른 자녀가 있다면, 그 아이도 슬퍼하고 있어요. 함께 기억을 나누는 시간을 만들어 보세요.' }
    ],
    help: [
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' }
    ]
  },

  spouse: {
    recognition: '배우자를 잃으면 사랑하는 사람뿐 아니라 함께 만든 일상, 미래의 계획, "우리"라는 정체성까지 한꺼번에 사라져요. 집에 돌아왔을 때의 적막, 식탁의 빈자리 — 그 무게는 겪어본 사람만 알아요.',
    psychology: '배우자 상실은 성인기 가장 큰 스트레스 사건으로 분류돼요 (Holmes-Rahe 스트레스 척도 1위). "우리"라는 공동 정체성이 깨지면서 "나는 누구인가?"라는 실존적 질문이 찾아와요. 수면 장애, 식욕 변화, 면역력 저하 등 신체적 영향도 커요.',
    techniques: [
      { name: '슬픔의 파도 이론(Wave Theory)', desc: '슬픔은 직선으로 줄어들지 않아요. 파도처럼 밀려왔다 빠져나가요. 처음에는 파도가 크고 자주 오지만, 시간이 지나면 간격이 넓어지고 파도 사이에서 숨 쉴 수 있게 돼요.' },
      { name: '일상 재설계', desc: '함께 하던 루틴이 이제 혼자의 것이 됐어요. 새 루틴을 만드는 건 배신이 아니에요. 아침 커피 한 잔, 저녁 산책 — 나만의 새 리듬을 찾아보세요.' },
      { name: '사회적 재연결', desc: '부부 단위로 만나던 관계가 어색해질 수 있어요. 혼자서도 편한 모임, 새로운 활동을 시작해 보세요. 새 관계가 고인을 대체하는 게 아니에요.' }
    ],
    check: {
      id: 'ct_grief_spouse', title: '지금 내 상태는?',
      questions: [
        '혼자 있는 시간이 견딜 수 없이 힘들다',
        '일상생활(가사, 재정 관리 등)이 어렵다',
        '미래가 전혀 보이지 않는다',
        '나를 해치고 싶다는 생각이 든다'
      ],
      emergencyIndex: 3,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:109" style="color:inherit;font-weight:700">📞 109</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '지금 많이 힘든 상태예요', threshold: 2, action: '오늘 하나만: 혼자 있지 말고, 신뢰하는 사람에게 전화해 보세요. 전문 상담(정신건강복지센터, 무료)도 언제든 열려 있어요.' },
        mid:  { label: '매우 힘든 시기를 지나고 있어요', threshold: 1 },
        low:  { label: '한 걸음씩 나아가고 있어요', threshold: 0 }
      }
    },
    actions: [
      { icon: '📋', text: '가장 급한 것 하나만: 재정·보험·행정 처리가 필요하다면 주민센터에 문의해 보세요. 사별 가족 원스톱 서비스가 있어요.' },
      { icon: '🍚', text: '오늘 한 끼만 제대로 먹어보세요. 배우자가 좋아하던 음식이어도 괜찮아요.' },
      { icon: '📞', text: '오늘 한 사람에게 전화해 보세요. "그냥 목소리 듣고 싶어서"라고만 해도 돼요.' },
      { icon: '✍️', text: '함께한 시간 중 가장 좋았던 순간을 적어보세요. 그 기억은 영원히 당신의 것이에요.' }
    ],
    help: [
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' },
      { number: '129', name: '보건복지상담센터', desc: '사별 가족 지원 제도, 복지 서비스 안내.' }
    ]
  },

  sibling: {
    recognition: '형제·자매는 내 인생에서 가장 오래 함께할 사람이었어요. 어린 시절의 기억, 부모님에 대한 공유된 경험 — 이 모든 것을 함께 나눌 수 있는 유일한 사람을 잃은 거예요. 그런데 세상은 종종 형제 상실의 슬픔을 과소평가해요.',
    psychology: '형제 사별은 "인정받지 못하는 슬픔(Disenfranchised Grief)"이 되기 쉬워요. 주변에서 "부모님은 얼마나 힘드실까"라고 먼저 걱정하고, 남겨진 형제의 슬픔은 뒷전이 되는 경우가 많아요. 하지만 당신의 슬픔도 똑같이 유효해요.',
    techniques: [
      { name: '슬픔 인정하기', desc: '"나도 슬퍼할 자격이 있다"를 스스로에게 허락해 보세요. 부모님을 위로하느라 자신의 감정을 미루고 있지 않은지 돌아보세요.' },
      { name: '공유된 기억 보존', desc: '함께한 사진, 대화, 장난 — 기억을 적어두세요. 시간이 지나면 디테일이 흐려져요. 지금 기억나는 것을 남겨두는 건 소중한 일이에요.' },
      { name: '역할 변화 인식', desc: '형제를 잃으면 가족 안에서 역할이 바뀔 수 있어요. "이제 네가 장남/장녀"라는 압박을 느낄 수 있지만, 당신이 누군가를 대체할 필요는 없어요.' }
    ],
    check: {
      id: 'ct_grief_sibling', title: '지금 내 상태는?',
      questions: [
        '형제를 잃은 슬픔을 표현할 곳이 없다',
        '부모님을 돌보느라 내 감정을 미루고 있다',
        '2주 이상 일상이 어렵다',
        '나를 해치고 싶다는 생각이 든다'
      ],
      emergencyIndex: 3,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:109" style="color:inherit;font-weight:700">📞 109</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '전문 상담이 도움이 될 수 있어요', threshold: 2, action: '정신건강복지센터(무료)에서 상담을 받아보세요.' },
        mid:  { label: '당신의 슬픔도 돌봐야 할 때예요', threshold: 1 },
        low:  { label: '기억하며 나아가고 있어요', threshold: 0 }
      }
    },
    actions: [
      { icon: '💬', text: '신뢰하는 사람에게 "나도 많이 슬프다"고 말해 보세요. 부모님 걱정 말고, 내 감정을 먼저 꺼내도 괜찮아요.' },
      { icon: '✍️', text: '형제에게 하지 못한 말을 편지로 써 보세요. 고마웠다, 미안했다, 보고 싶다 — 어떤 말이든.' },
      { icon: '📸', text: '함께 찍은 사진을 하나 골라 핸드폰 배경으로 설정해 보세요. 작지만 매일 만나는 기억이 돼요.' }
    ],
    help: [
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' }
    ]
  },

  friend: {
    recognition: '친구는 내가 선택한 가족이에요. 같이 웃고, 울고, 새벽까지 이야기하던 사람. 세상은 가족의 죽음에는 위로하면서, 친구의 죽음에는 "힘내"라는 말로 넘기곤 해요. 하지만 당신이 잃은 건 세상에 하나뿐인 사람이에요.',
    psychology: '친구 상실은 형제 상실과 마찬가지로 "인정받지 못하는 슬픔(Disenfranchised Grief)"이 되기 쉬워요. 장례식에서도 가족 뒤에 서야 하고, 애도 휴가도 없어요. 하지만 우정의 유대는 뇌에서 가족 관계와 동일한 애착 회로를 활성화해요. 당신의 슬픔은 가족을 잃은 것과 다르지 않아요.',
    techniques: [
      { name: '슬픔의 자격 인정하기', desc: '"친구인데 왜 이렇게까지 슬프지?"라고 스스로에게 묻고 있다면 — 슬퍼할 자격에 조건은 없어요. 관계의 깊이가 슬픔의 크기를 결정해요, 호적이 아니라.' },
      { name: '공유된 기억 보존', desc: '함께 찍은 사진, 카톡 대화, 같이 갔던 장소 — 기억을 모아보세요. 시간이 지나면 디테일이 흐려져요. 지금 기억나는 것을 남겨두는 건 친구에게 보내는 마지막 선물이에요.' },
      { name: '공동 애도 공간 만들기', desc: '친구의 친구들과 함께 기억을 나누는 시간을 만들어 보세요. 각자 혼자 슬퍼하는 것보다, 함께 이야기할 때 슬픔이 조금씩 나눠져요.' }
    ],
    check: {
      id: 'ct_grief_friend', title: '지금 내 상태는?',
      questions: [
        '친구를 잃은 슬픔을 표현할 곳이 없다',
        '2주 이상 일상이 어렵다',
        '죄책감이 크다 (더 연락할 걸, 더 만날 걸)',
        '나를 해치고 싶다는 생각이 든다'
      ],
      emergencyIndex: 3,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:109" style="color:inherit;font-weight:700">📞 109</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '전문 상담이 도움이 될 수 있어요', threshold: 2, action: '정신건강복지센터(무료)에서 상담을 받아보세요.' },
        mid:  { label: '힘든 시기를 지나고 있어요', threshold: 1 },
        low:  { label: '기억하며 한 걸음씩 나아가고 있어요', threshold: 0 }
      }
    },
    actions: [
      { icon: '✍️', text: '친구에게 마지막 편지를 써 보세요. 고마웠다, 보고 싶다, 미안하다 — 하지 못한 말을 적어보세요.' },
      { icon: '📸', text: '함께한 사진을 모아 작은 앨범을 만들어 보세요. 디지털이든 종이든, 기억이 담긴 공간이 위안이 돼요.' },
      { icon: '🤝', text: '친구의 다른 친구들에게 연락해 보세요. "같이 이야기하고 싶다"고만 해도 충분해요.' },
      { icon: '🕯️', text: '친구가 좋아하던 곳에 가보세요. 함께 가던 카페, 걷던 길 — 그 공간에서 조용히 기억해 보세요.' }
    ],
    help: [
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' }
    ]
  },

  miscarriage: {
    recognition: '만나지 못한 아이를 보내는 건, 세상이 잘 모르는 슬픔이에요. 태명을 불러보고, 작은 옷을 사두고, 미래를 그려봤을 수도 있어요. 그 모든 것이 한순간에 사라진 거예요. "다음에 또 가질 수 있잖아"라는 말이 위로가 되지 않는다는 것, 알아요.',
    psychology: '유산·사산은 "보이지 않는 상실(Invisible Loss)"이에요. 사회가 인정하지 않는 슬픔의 대표적 형태예요. 아이를 직접 만나지 못했기에 주변에서는 "아직 아기도 아니었잖아"라고 말하지만, 부모의 뇌는 임신 초기부터 이미 아이와 유대를 형성해요. 호르몬 급변(에스트로겐·프로게스테론 급락)이 감정 변화를 더 극심하게 만들어요. 이건 당신이 약해서가 아니라 몸과 마음 모두가 상실을 겪고 있는 거예요.',
    techniques: [
      { name: '보이지 않는 아이 기억하기', desc: '태명이 있었다면 그 이름을 불러도 괜찮아요. 초음파 사진, 양성 반응 테스트기, 작은 물건 — 기억할 수 있는 것을 남겨두세요. 그 아이가 존재했다는 증거예요.' },
      { name: '몸의 회복을 허락하기', desc: '유산 후 몸은 출산과 비슷한 회복 과정을 거쳐요. 충분히 쉬세요. "빨리 일상으로 돌아가야 해"라는 압박을 내려놓아도 돼요. 몸이 준비될 때까지 기다려주세요.' },
      { name: '파트너와의 다른 슬픔 인정하기', desc: '같은 상실이지만 파트너와 슬퍼하는 방식이 다를 수 있어요. 한 사람은 울고, 한 사람은 말이 없을 수 있어요. 어느 쪽이든 틀린 게 아니에요. "우리 각자 방식이 다르구나"를 서로 인정해 보세요.' }
    ],
    medicalRecovery: [
      {
        period: '초기 유산 (12주 이전)',
        icon: '🌱',
        physical: [
          '출혈은 보통 1~2주 지속돼요. 생리보다 양이 많을 수 있어요.',
          '하복부 통증은 생리통과 비슷해요. 진통제(아세트아미노펜)로 완화할 수 있어요.',
          '호르몬(hCG)이 정상으로 돌아오는 데 4~6주 정도 걸려요.',
          '다음 생리는 보통 4~8주 후에 돌아와요.'
        ],
        care: [
          '2주간 탐폰 사용과 성관계를 피해 감염을 예방해 보세요.',
          '38°C 이상 열이 나거나, 출혈이 갑자기 심해지면 산부인과에 바로 연락하세요.',
          '잔여 조직 확인을 위해 1~2주 후 초음파 검진을 받아보세요.',
          '무리한 운동은 2주간 자제하되, 가벼운 산책은 회복에 도움이 돼요.'
        ]
      },
      {
        period: '중기 유산 (12~20주)',
        icon: '🌿',
        physical: [
          '출혈과 통증이 초기보다 심할 수 있어요. 병원에서의 관리가 중요해요.',
          '자궁이 원래 크기로 돌아오는 데 4~6주가 걸려요.',
          '유즙 분비가 시작될 수 있어요. 당황스럽겠지만, 호르몬 반응이에요. 냉찜질이 도움돼요.',
          '호르몬 변화로 감정 기복이 더 클 수 있어요. 이건 약한 게 아니라 몸의 반응이에요.'
        ],
        care: [
          '병원에서 퇴원 후 2주간 충분한 안정이 필요해요.',
          '빈혈 검사를 받아보세요. 철분 보충제가 필요할 수 있어요.',
          '산부인과 추적 검진을 꼭 받아보세요 (보통 2주 후).',
          '감정적으로 힘들다면 산부인과 의사에게 심리 상담 연계를 요청해 보세요.'
        ]
      },
      {
        period: '후기 유산·사산 (20주 이후)',
        icon: '🕊️',
        physical: [
          '분만과 유사한 과정을 거치기 때문에 산후 회복이 필요해요.',
          '유즙 분비가 본격적으로 올 수 있어요. 의료진과 억제 방법을 상의해 보세요.',
          '자궁 수축과 오로(산후 분비물)가 4~6주간 지속돼요.',
          '호르몬 급변으로 산후우울증과 유사한 증상이 나타날 수 있어요.'
        ],
        care: [
          '산후 6주 검진을 반드시 받아보세요.',
          '영양 섭취(단백질, 철분, 엽산)와 수분 보충에 신경 써 보세요.',
          '아이와의 작별 시간을 가질 수 있어요. 원한다면 안아보기, 발도장 남기기도 가능해요. 병원에 요청해 보세요.',
          '다음 임신 시도는 의사와 상의해 주세요. 보통 3~6개월 이상 신체 회복을 권해요.'
        ]
      }
    ],
    check: {
      id: 'ct_grief_miscarriage', title: '지금 내 상태는?',
      questions: [
        '2주 이상 깊은 슬픔이 지속되고 있다',
        '죄책감이 극심하다 (내 탓인 것 같다)',
        '다른 임산부나 아기를 보면 견딜 수 없다',
        '나를 해치고 싶다는 생각이 든다'
      ],
      emergencyIndex: 3,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:109" style="color:inherit;font-weight:700">📞 109</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '지금 몸과 마음 모두 힘든 상태예요', threshold: 2, action: '오늘 하나만: 따뜻한 차 한 잔 마시며 쉬어보세요. 산부인과 추적 검진과 심리 상담도 회복을 도와줘요.' },
        mid:  { label: '깊은 슬픔의 시기를 지나고 있어요', threshold: 1 },
        low:  { label: '천천히 회복하고 있어요', threshold: 0 }
      }
    },
    actions: [
      { icon: '🌼', text: '아이에게 편지를 써 보세요. "만나고 싶었어", "사랑했어" — 마음속 말을 꺼내 보세요.' },
      { icon: '🌱', text: '작은 화분을 하나 심어보세요. 아이의 이름으로 자라나는 생명이 위안이 될 수 있어요.' },
      { icon: '💬', text: '같은 경험을 한 사람에게 이야기해 보세요. 유산 경험 커뮤니티에서 "나만 이런 게 아니구나"를 느낄 수 있어요.' },
      { icon: '🛌', text: '오늘은 몸을 쉬게 해주세요. 따뜻한 차 한 잔, 이불 속에서 아무것도 하지 않아도 괜찮아요.' }
    ],
    help: [
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' }
    ]
  },

  pet: {
    recognition: '반려동물은 말 없이 곁을 지켜준 가족이에요. 출근할 때 현관에서 배웅하고, 힘든 날 무조건 안겨주던 존재. "동물인데 왜 그래"라는 말에 상처받았을 수도 있어요. 하지만 당신의 슬픔은 진짜예요.',
    psychology: '반려동물 상실은 "인정받지 못하는 슬픔(Disenfranchised Grief)"의 대표적 형태예요. 사회가 이 슬픔을 과소평가하지만, 뇌과학적으로 반려동물과의 유대는 인간 관계와 동일한 옥시토신·도파민 회로를 활성화해요. 슬퍼하는 것은 당연해요.',
    techniques: [
      { name: '추모 의식 만들기', desc: '사진 한 장을 프린트해서 놓아두거나, 좋아하던 산책길을 걸어보세요. 장례를 치르든 안 치르든, 나만의 방식으로 작별 인사를 하는 것이 중요해요.' },
      { name: '빈자리 인정하기', desc: '집에 들어왔을 때 뛰어나오지 않는 현관, 비어 있는 밥그릇 — 그 빈자리가 슬플 수 있어요. 정리하는 건 준비가 됐을 때 해도 돼요.' },
      { name: '새 반려동물에 대한 압박 거부', desc: '"새로 키우면 되지"라는 말에 상처받을 수 있어요. 다음 반려동물을 맞이하는 건 대체가 아니라 새로운 사랑이에요. 준비가 됐을 때 하세요.' }
    ],
    check: {
      id: 'ct_grief_pet', title: '지금 내 상태는?',
      questions: [
        '2주 이상 슬픔이 지속되고 있다',
        '주변에서 이해받지 못해 더 힘들다',
        '일상생활이 어려울 정도로 슬프다'
      ],
      results: {
        high: { label: '전문 상담이 도움이 될 수 있어요', threshold: 2, action: '정신건강복지센터(무료)에서 상담을 받아보세요. 반려동물 상실도 애도 상담의 대상이에요.' },
        mid:  { label: '슬픔이 깊은 시기예요', threshold: 1 },
        low:  { label: '기억하며 보내주는 중이에요', threshold: 0 }
      }
    },
    actions: [
      { icon: '📸', text: '가장 좋아하는 사진을 골라 액자에 넣어보세요. 기억할 수 있는 공간이 위안이 돼요.' },
      { icon: '✍️', text: '함께한 시간 중 가장 행복했던 순간을 적어보세요. 첫 만남, 산책, 안겨 자던 밤.' },
      { icon: '💬', text: '같은 경험을 한 사람에게 이야기해 보세요. 반려동물 사별 커뮤니티에서 위로를 받을 수 있어요.' },
      { icon: '🌿', text: '반려동물의 이름으로 작은 화분을 키워보는 것도 좋은 추모 방법이에요.' }
    ],
    help: [
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 반려동물 상실의 슬픔도 상담받을 수 있어요.' },
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  }
};

/* ── 사별 상세 페이지 (아코디언 구조) ── */
function buildGriefDetail(container, id) {
  const d = GRIEF_DATA[id];
  const meta = GRIEF_DATA.situations.find(s => s.id === id);
  if (!d || !meta) return;

  const techHTML = d.techniques ? d.techniques.map(t =>
    `<div style="margin-bottom:12px;">
      <div style="font-size:13px;font-weight:700;color:var(--peach-d);margin-bottom:4px;">${esc(t.name)}</div>
      <p style="font-size:12.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;">${esc(t.desc)}</p>
    </div>`
  ).join('') : '';

  container.innerHTML = `
    <button class="page-back" onclick="renderGriefPage(document.getElementById('grief-content'))">← 사별 가이드로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,#5A6A8A,#7A8AAA)">
      <span class="content-hero-icon">${meta.icon}</span>
      <h1>${esc(meta.label)}</h1>
      <p>${esc(meta.sub)}</p>
    </div>

    <div class="step-section">
      <div class="step-label">지금 이런 마음이시죠</div>
      <p style="font-size:13.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;">${esc(d.recognition)}</p>
    </div>

    <div class="accordion-group">
      ${d.psychology ? `
      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🧠 왜 이렇게 아픈 걸까?</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <p style="font-size:13px;color:var(--ink-m);line-height:1.8;word-break:keep-all;">${esc(d.psychology)}</p>
        </div></div>
      </div>` : ''}

      ${techHTML ? `
      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>💡 마음을 돌보는 방법</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          ${techHTML}
        </div></div>
      </div>` : ''}

      ${d.medicalRecovery ? `
      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🏥 시기별 신체 회복 가이드</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          ${d.medicalRecovery.map(r => `
            <div style="margin-bottom:20px;padding:16px 18px;background:var(--white);border:1px solid var(--line);border-radius:14px;">
              <div style="font-size:14px;font-weight:700;color:var(--ink);margin-bottom:10px;display:flex;align-items:center;gap:8px;">
                <span>${r.icon}</span>${esc(r.period)}
              </div>
              <div style="margin-bottom:10px;">
                <div style="font-size:11px;font-weight:700;color:var(--peach-d);letter-spacing:.05em;margin-bottom:6px;">신체 변화</div>
                <ul style="font-size:12.5px;color:var(--ink-m);line-height:1.75;padding-left:16px;">
                  ${r.physical.map(p => '<li style="margin-bottom:4px;word-break:keep-all;">' + esc(p) + '</li>').join('')}
                </ul>
              </div>
              <div>
                <div style="font-size:11px;font-weight:700;color:var(--amber);letter-spacing:.05em;margin-bottom:6px;">관리 방법</div>
                <ul style="font-size:12.5px;color:var(--ink-m);line-height:1.75;padding-left:16px;">
                  ${r.care.map(c => '<li style="margin-bottom:4px;word-break:keep-all;">' + esc(c) + '</li>').join('')}
                </ul>
              </div>
            </div>
          `).join('')}
          <div style="font-size:11px;color:var(--ink-l);line-height:1.6;padding:10px 14px;background:var(--disclaimer-bg);border:1px solid var(--disclaimer-border);border-radius:10px;word-break:keep-all;">
            이 정보는 일반적인 참고 사항이에요. 개인마다 상황이 다르므로, 반드시 담당 산부인과 전문의와 상의해 주세요.
          </div>
        </div></div>
      </div>` : ''}

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🔍 지금 내 상태 확인</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div id="grief-check-${id}"></div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>✅ 오늘 할 수 있는 것</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div class="action-checklist">${_actionItems(d.actions)}</div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>📞 도움 연결</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
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
        </div></div>
      </div>
    </div>
  `;

  const checkWrap = container.querySelector(`#grief-check-${id}`);
  if (checkWrap && typeof renderCheckTool === 'function') renderCheckTool(checkWrap, d.check);
}

/* ── 사별 메인 목록 화면 ── */
function renderGriefPage(container) {
  if (!container) return;
  container.innerHTML = `
    <button class="page-back" onclick="goHome()">← 홈으로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,#5A6A8A,#7A8AAA)">
      <span class="content-hero-icon">🕊️</span>
      <h1>떠나보낸 사람을 위한 가이드</h1>
      <p>사랑하는 사람을 보내는 건, 삶에서 가장 무거운 일이에요.<br>여기서 잠깐 쉬어가도 괜찮아요.</p>
    </div>
    <div class="step-section">
      <div class="step-label">누구를 떠나보내셨나요?</div>
      <div class="emotion-grid">
        ${GRIEF_DATA.situations.map(s => `
          <button class="emotion-btn" onclick="buildGriefDetail(document.getElementById('grief-content'),'${s.id}')" aria-label="${s.label}">
            <span class="emotion-btn-icon">${s.icon}</span>
            <div>
              <div style="font-size:13.5px;font-weight:600;">${esc(s.label)}</div>
              <div style="font-size:11.5px;color:var(--ink-l);">${esc(s.sub)}</div>
            </div>
          </button>`).join('')}
      </div>
    </div>
  `;
}

/* ── 초기화 ── */
function initGriefPage() {
  const el = document.getElementById('grief-content');
  if (el && typeof renderGriefPage === 'function') renderGriefPage(el);
}
