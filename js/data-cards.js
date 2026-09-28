/* ═══════════════════════════════════════════════════════════
   BeInside — 상황 카드 (육아 참고서, 0~12개월)
   카드 형식: CLAUDE.md '방향 결정' 참고. tests/cards.test.js가 검사한다.

   작성 규칙 (reports/2026-09-repositioning-strategy.md §3·§5-3)
   - 의학 정보는 출처 허용 목록 안에서만. 병원 기준은 출처보다 완화하지 않고,
     출처끼리 다르면 더 보수적인 쪽. 약 용량·제품명·진단 추정 금지.
   - 공공누리 자료만 요약(use:'summary'), 학회·대학병원·NHS·CDC는 링크만(use:'link').
   - 전화번호는 문장에 숫자로 쓰지 않고 {{HELPLINES 키}}로 쓴다.
     렌더러가 js/helplines.js에서 번호를 가져와 tel: 링크로 바꾼다.
     예) '{{emergency}}에 전화해요' → '<a href="tel:119">119</a>에 전화해요'
   - "진료를 대신하지 않아요" 문구와 109·119 고정 줄은 렌더러가 모든 카드 하단에 붙인다.
   - 문장별 근거 대조표: reports/2026-09-pilot-cards-notes.md
   - status: 'draft' | 'published'. draft는 목록·검색·칩·정적 빌드(scripts/build-cards.mjs)에서 빠지고,
     ?preview=1 일 때만 "검토 중인 초안" 띠와 함께 보인다(js/cards.js).
     '// 원문 미확인' 주석이 카드 안에 남아 있으면 published로 바꿀 수 없다(tests/cards.test.js).

   파일럿 3장 (2026-09-27): 출처 원문을 이 환경에서 열지 못했다(WebFetch·curl 모두 차단).
   URL 존재와 내용은 WebSearch 결과로만 확인했다 → 모든 출처에 '// 원문 미확인'.
   운영자가 원문을 열어 대조하기 전에는 게시하지 않는다.
   임상 감수(notes "## 임상 감수") 반영. "// 소아과 확인 필요" 줄은 게시 전에 확인하거나 뺀다.
   국가건강정보포털 원문 대조(notes "## 국가건강정보포털 원문 대조", 2026-09-28) 중 보수적 수정만 반영.
   3개월 미만 겨드랑이 기준(5285 37.2℃)은 운영자·전문가 결정 대기라 38℃ 줄을 그대로 둔다.
═══════════════════════════════════════════════════════════ */

const BI_CARDS = [

  /* ── 1. 아기가 열이 나요 ── */ // 원문 미확인 (출처 7곳 모두, notes §1 참고) · 임상 감수 반영 2026-09-27
  {
    id: 'fever',
    status: 'draft', // 원문 대조 전. 운영자가 notes 대조표를 확인하면 'published'
    title: '아기가 열이 나요',
    summary: '3개월 미만 38℃ 이상이면 바로 응급실. 월령별 기준, 재는 법, 지켜볼 것.',
    category: 'sick',
    ageDays: [0, 365],
    urgent: true,
    urgentLine: '숨쉬기 힘들어하거나, 경련하거나, 축 처져 잘 깨지 않으면 바로 {{emergency}}. 생후 3개월 미만이 38℃ 이상이면 바로 응급실로 가요.',
    what: [
      '열은 몸이 감염과 싸울 때 생기는 반응이에요.',
      '생후 3개월 미만 아기는 열의 원인이 심한 감염일 가능성이 더 높아요. 그래서 38℃만 넘어도 바로 진료를 받아요.',
      '체온은 재는 곳(겨드랑이·귀·항문)에 따라 조금씩 달라요. 생후 3개월 미만은 어디로 쟀든 38℃가 넘으면 바로 진료를 받아요.', // 소아과 확인 필요: 측정 부위별 기준(원문 5285 겨드랑이 37.2℃)
    ],
    todo: [
      '체온을 재요. 디지털 체온계를 겨드랑이에 끼우고 팔을 몸에 붙여요. 귀 체온계는 제대로 재기 어려워 실제보다 낮게 나올 수 있어요.', // 원문 3690 자주하는 질문에 맞춤(월령 기준 뺌, 2026-09-28)
      '잰 시각과 체온을 적어 둬요. 진료 때 보여 주면 돼요.',
      '옷은 가볍게 입히고, 방은 덥지 않게 해요. 이불로 싸매지 않아요.',
      '평소처럼 먹여요. 모유수유 중이면 그대로 이어가요.',
      '기저귀가 얼마나 젖는지 봐요.',
      '해열제는 먹이기 전에 소아과나 약사에게 물어봐요. 생후 3개월 미만은 먼저 진료를 받아요.',
      '해열제로 열이 내려도, 위 "지금 바로" 신호가 있으면 진료를 받아요.',
    ],
    hospital: {
      now: [
        '생후 3개월 미만이고 체온이 38℃ 이상이에요.', // 소아과 확인 필요: 측정 부위별 기준(원문 5285 겨드랑이 37.2℃)
        '숨쉬기 힘들어 보여요. 숨 쉴 때 갈비뼈 아래가 쑥 들어가거나, 숨마다 끙끙 소리가 나요.',
        '입술·혀·피부가 파랗거나 잿빛이에요. 피부가 창백하고 얼룩덜룩해요.',
        '경련을 해요.',
        '축 늘어지고 잘 깨지 않아요. 깨어 있어도 반응이 없어요.',
        '눌러도 색이 없어지지 않는 붉은색·보라색 발진이 있어요. 투명한 유리컵으로 눌러 보면 보여요. 색이 없어져도 아기가 아파 보이면 진료를 받아요.',
        '머리 위 말랑한 곳(숫구멍)이 불룩 솟았어요.', // 소아과 확인 필요
        '평소와 다르게 힘없이 울거나, 날카롭고 높은 소리로 울어요.',
        '체온이 36℃보다 낮아요.',
        '8시간 넘게 젖은 기저귀가 없어요.',
      ],
      soon: [
        '생후 3~6개월이고 39℃ 이상이에요. 오늘 안에 진료를 받아요. 밤이면 달빛어린이병원이나 응급실로 가요.',
        '잘 먹지 않거나, 기저귀가 평소보다 덜 젖거나, 울 때 눈물이 안 나요.',
        '열이 하루(24시간) 넘게 이어지거나, 내렸다가 다시 올라요. 소아과에 진료를 받아요.',
        '평소와 다르다는 느낌이 들어요. 그 느낌도 진료를 받을 이유예요.',
      ],
    },
    mom: {
      feel: [
        '밤에 열이 오르면 응급실에 갈지를 혼자 정해야 해서 막막해요.',
        '가서 괜찮다는 말을 들어도, 간 것이 틀린 판단은 아니에요.',
      ],
      problems: [
        '어디로 가야 할지 모르겠어요 → {{emergency}}에 전화하면 의료 상담도 받을 수 있어요. 밤·휴일에 여는 소아 진료기관은 달빛어린이병원 목록에서 찾아요.',
        '혼자 아기를 안고 밤에 나가야 해요 → 체온 기록, 기저귀, 휴대폰 충전기를 가방 하나에 모아 두면 나갈 때 덜 헤매요.',
      ],
    },
    more: ['emergency'],
    sources: [
      { name: '임신육아종합포털 아이사랑 · 1~3개월 건강과 일상', url: 'https://www.childcare.go.kr/?menuno=432', checked: '2026-09-27', use: 'summary' }, // 원문 미확인
      { name: '대한소아청소년과학회 · 소아 발열', url: 'https://www.pediatrics.or.kr/bbs/index.html?code=disease_info&category=&gubun=&page=1&number=8965&mode=view&keyfield=&key=', checked: '2026-09-27', use: 'link' }, // 원문 미확인
      { name: '서울대학교병원 의학정보 · 소아 발열', url: 'https://www.snuh.org/health/nMedInfo/nView.do?medid=AC000168', checked: '2026-09-27', use: 'link' }, // 원문 미확인
      { name: 'NHS · High temperature (fever) in children', url: 'https://www.nhs.uk/symptoms/fever-in-children/', checked: '2026-09-27', use: 'link' }, // 원문 미확인
      { name: 'NHS · When to get urgent medical help for babies and children under 5', url: 'https://www.nhs.uk/baby/health/when-to-get-urgent-medical-help-for-babies-and-children-under-5/', checked: '2026-09-27', use: 'link' }, // 원문 미확인
      { name: '국립중앙의료원 · 달빛어린이병원 찾기', url: 'https://www.nmc.or.kr/nmc/babyList', checked: '2026-09-27', use: 'link' }, // 원문 미확인
      { name: 'HealthyChildren.org (AAP) · Fever: When to Call the Pediatrician', url: 'https://www.healthychildren.org/English/health-issues/conditions/fever/Pages/When-to-Call-the-Pediatrician.aspx', checked: '2026-09-27', use: 'link' }, // 원문 미확인 (임상 감수 F7: 2세 미만 24시간 기준, 검색 요약만 확인)
    ],
    reviewed: '2026-09-27',
    nextReview: '2026-12-27',
  },

  /* ── 2. 바로 119를 불러야 할 때 ── */ // 원문 미확인 (출처 13곳 중 10곳, notes §2 참고) · 임상 감수 반영 2026-09-27 · 국가건강정보포털 대조 반영 2026-09-28
  {
    id: 'call-119',
    status: 'draft', // 원문 대조 전. 운영자가 notes 대조표를 확인하면 'published'
    title: '바로 119를 불러야 할 때',
    summary: '돌 전 아기의 숨·얼굴색·경련·의식·낙상·질식 신호. 하나라도 보이면 바로 119.',
    category: 'sick',
    ageDays: [0, 365],
    urgent: true,
    urgentLine: '아래 신호가 하나라도 보이면 기다리지 말고 바로 {{emergency}}에 전화해요.',
    what: [
      '기다리지 말고 {{emergency}}를 불러야 하는 아기 신호만 모았어요. 캡처해 두면 새벽에도 바로 볼 수 있어요.',
      '{{emergency}}에 전화하면 구급차가 오고, 도착할 때까지 할 일을 안내받을 수 있어요.',
      '아기의 평소 모습을 가장 잘 아는 건 엄마예요. "뭔가 이상하다"는 느낌도 전화할 이유가 돼요.',
    ],
    todo: [
      '아기가 반응이 없고 숨을 쉬지 않으면 바로 {{emergency}}에 전화해요. 상담원이 가슴압박을 안내해요.',
      '{{emergency}}에 전화해요. 스피커폰으로 켜 두면 두 손을 쓸 수 있어요.',
      '주소, 아기 개월 수, 지금 보이는 모습을 말해요. 상담원이 순서대로 물어봐요.',
      '경련 중이면 억지로 붙잡지 않아요. 입에 아무것도 넣지 않고, 먹이거나 마시게 하지 않아요. 옆으로 눕히고 주변의 딱딱한 물건을 치워요. 경련이 시작된 시각을 봐 두면 진료에 도움이 돼요.',
      // 질식: 처치 절차는 글로 옮기지 않는다. "하지 말 것"만 쓰고 할 처치는 119 상담원 안내로 넘긴다 (임상 감수 C1)
      // 원문 6227: 신고와 동시에 처치 시작. 시작 시점만 맞추고 절차는 여전히 글로 쓰지 않는다 (2026-09-28)
      '무언가 삼켜 숨을 못 쉬면 바로 {{emergency}}에 전화해 스피커폰으로 켜요. 구급차를 기다리지 말고, 상담원이 한 단계씩 알려 주는 대로 바로 처치를 시작해요. 영아 기도폐쇄 처치를 배웠다면 전화하면서 바로 시작해요.',
      '아기가 세게 기침하거나 울고 있으면 기침을 막지 않고 지켜보며 기다려요.',
      '입안에 손가락을 넣어 더듬지 않아요. 눈에 보이는 것만 꺼내요. 돌 전 아기에게는 배를 밀어 올리는 방법(하임리히법)을 쓰지 않아요.',
      '세제·약 같은 것을 삼켰으면 억지로 토하게 하지 않아요. 삼킨 제품이나 약 통을 챙겨 가 의료진에게 보여 줘요.', // 원문 5481 (2026-09-28). 입·얼굴 헹구기는 소아과 확인 전에는 넣지 않는다
      '영아 기도폐쇄 처치는 미리 배워 두면 좋아요. 보건소·소방서의 영아 심폐소생술 교육이나 E-GEN 안내를 봐요.',
      '부를 정도인지 헷갈려도 {{emergency}}에 전화해 물어봐도 돼요.',
    ],
    hospital: {
      now: [
        '숨쉬기 힘들어 보여요. 숨 쉴 때 갈비뼈 아래가 쑥 들어가거나, 숨마다 끙끙 소리가 나요.',
        '숨이 멈췄다가 다시 쉬어요.',
        '입술·혀·얼굴이 파랗거나 잿빛이에요.',
        '경련을 해요. 몸이 뻣뻣해지거나 떨리고, 불러도 반응이 없어요.',
        '축 늘어지고 잘 깨지 않아요. 깨어 있어도 반응이 없어요.',
        '무언가를 삼킨 뒤 숨을 못 쉬거나, 울음·기침 소리를 내지 못해요.',
        '약, 세제, 동전 모양 전지(버튼 전지), 자석을 삼켰거나 삼켰을 수 있어요. 괜찮아 보여도 바로 {{emergency}}.', // 소아과 확인 필요: "약" 부분만(5394 빈 응답). 전지·자석·세제는 5481로 확인, 카드가 더 보수적
        '떨어지거나 머리를 부딪힌 뒤 의식을 잃었거나, 경련하거나, 토하거나, 잘 깨지 않거나, 평소와 다르게 처지거나 보채요. 만지면 아파하거나 불편해해요. 머리 위 말랑한 곳(숫구멍)이 불룩하거나 귀·코에서 피나 맑은 물이 나와도 바로 {{emergency}}.',
        '눌러도 색이 없어지지 않는 붉은색·보라색 발진이 있어요.',
        '초록색 물이나 피가 섞인 것을 토해요. 또는 뿜듯이 토하는 일이 계속돼요.',
        '생후 3개월 미만이고 체온이 38℃ 이상이에요. 바로 응급실로 가요.', // 소아과 확인 필요: 측정 부위별 기준(원문 5285 겨드랑이 37.2℃)
      ],
      soon: [
        '돌 전 아기가 침대·소파·기저귀 교환대처럼 높은 곳에서 떨어졌거나, 머리에 혹·멍이 생겼어요. 괜찮아 보여도 오늘 안에 진료를 받아요. 그 뒤 이틀(48시간) 동안 평소와 다른지 지켜봐요.', // 소아과 확인 필요: 모든 낙상 "오늘 진료"(원문에 없음, 보수 쪽). 48시간 관찰은 원문 5481
        '무언가 삼켰다가 나왔어요. 나왔어도 진료를 받아요.',
      ],
    },
    mom: {
      feel: [
        '손이 떨리고 머리가 하얘질 수 있어요. 전화를 걸면 상담원이 한 단계씩 물어봐요. 대답만 하면 돼요.',
        '불렀는데 큰일이 아니었다면 민망할 수 있어요. 그래도 부른 것이 틀린 판단은 아니에요.',
      ],
      problems: [
        '혼자 아기를 보고 있어 손이 없어요 → 휴대폰 잠금 화면에서 긴급 전화를 거는 방법을 미리 확인해 둬요.',
        '급하면 집 주소가 바로 안 떠올라요 → 주소를 휴대폰 메모나 냉장고에 적어 둬요.',
        '구급차를 기다리는 동안 혼자예요 → 상담원이 끊으라고 할 때까지 전화를 끊지 않아요. 아기를 안고 갈 수 있을 때만 잠깐 현관문 잠금을 풀어 둬요.',
      ],
    },
    more: ['emergency'],
    sources: [
      { name: '질병관리청 국가건강정보포털 · 심폐소생술(이물질에 의한 기도폐쇄의 처치)', url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=6227', checked: '2026-09-28', use: 'link' }, // API 원문 대조 완료 2026-09-28 (2020 가이드라인 기반. 처치 절차 링크로는 R1 2025 교육자료 우선)
      { name: '질병관리청 국가건강정보포털 · 외상성 뇌손상', url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5864', checked: '2026-09-28', use: 'link' }, // API 원문 대조 완료 2026-09-28 (성인 중심. 영아 머리 외상 기준은 5481)
      { name: '질병관리청 국가건강정보포털 · 가정 내 아동안전', url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5481', checked: '2026-09-28', use: 'link' }, // API 원문 대조 완료 2026-09-28 (삼킴·낙상 신호·48시간 관찰·토하게 하지 않기)
      { name: '중앙응급의료센터 E-GEN · 기본응급처치: 영아 기도폐쇄', url: 'https://www.e-gen.or.kr/egen/first_aid_basics.do?contentsno=20', checked: '2026-09-27', use: 'link' }, // 원문 미확인
      { name: '중앙응급의료센터 E-GEN · 중요질환 응급 증상: 발작', url: 'https://www.e-gen.or.kr/egen/emergency_symptom.do?contentsno=47', checked: '2026-09-27', use: 'link' }, // 원문 미확인
      { name: '서울대학교병원 의학정보 · 영유아응급상황', url: 'https://www.snuh.org/health/nMedInfo/nView.do?medid=AA001415', checked: '2026-09-27', use: 'link' }, // 원문 미확인
      { name: 'NHS · When to get urgent medical help for babies and children under 5', url: 'https://www.nhs.uk/baby/health/when-to-get-urgent-medical-help-for-babies-and-children-under-5/', checked: '2026-09-27', use: 'link' }, // 원문 미확인
      { name: 'NHS · How to stop a child from choking', url: 'https://www.nhs.uk/baby/first-aid-and-safety/first-aid/how-to-stop-a-child-from-choking/', checked: '2026-09-27', use: 'link' }, // 원문 미확인
      { name: 'NHS · Head injury and concussion', url: 'https://www.nhs.uk/conditions/head-injury-and-concussion/', checked: '2026-09-27', use: 'link' }, // 원문 미확인
      { name: '질병관리청 · 2025년 한국 심폐소생술 가이드라인 발표 보도자료 (2026-01-29)', url: 'https://www.kdca.go.kr/bbs/kdca/42/304937/download.do', checked: '2026-09-27', use: 'link' }, // 원문 미확인 (임상 감수 C1·C12. E-GEN 영아 기도폐쇄 페이지가 개정을 반영했는지도 원문 확인 필요)
      { name: '질병관리청 국가건강정보포털 · 응급상황정보', url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/healthInfo/emgncySittnInfoMain.do', checked: '2026-09-27', use: 'link' }, // 원문 미확인 (임상 감수 C3: 삼킴·중독)
      { name: '서울대학교병원 소아응급센터 · 자주 묻는 질문', url: 'https://www.snuh.org/reservation/meddept/EMP/childFaq.do', checked: '2026-09-27', use: 'link' }, // 원문 미확인 (임상 감수 C6: 낙상·머리 외상)
      { name: '서울시 임신·출산 정보센터 · 영유아 응급상황 대처방법', url: 'https://seoul-agi.seoul.go.kr/child-emergency-response', checked: '2026-09-27', use: 'link' }, // 원문 미확인 (임상 감수 C6. 공공누리 유형 미확인이라 link)
    ],
    reviewed: '2026-09-27',
    nextReview: '2026-12-27',
  },

  /* ── 3. 아무리 달래도 안 그치고 울어요 ── */ // 원문 미확인 (출처 7곳 중 4곳, notes §3 참고) · 임상 감수 반영 2026-09-27 · 국가건강정보포털 대조 반영 2026-09-28
  {
    id: 'crying',
    status: 'draft', // 원문 대조 전. 운영자가 notes 대조표를 확인하면 'published'
    title: '아무리 달래도 안 그치고 울어요',
    summary: '2개월 무렵 울음이 가장 많아요. 절대 흔들지 말고, 화가 나면 눕히고 잠시 떨어져도 돼요.',
    category: 'crying',
    ageDays: [0, 180],
    urgent: false,
    what: [
      '울음은 생후 몇 주부터 늘어 2개월 무렵 가장 많고, 3~5개월쯤 줄어요.',
      '이유 없이 시작되고, 무엇을 해도 안 그치고, 아파 보이는 얼굴로 울 수 있어요. 늦은 오후나 저녁에 더 많고, 하루 5시간 넘게 우는 아기도 있어요. 이 특징을 영어 첫 글자를 따서 PURPLE Crying이라고 불러요.',
      '오래 달래지지 않는 울음도 이 시기 아기에게는 흔한 모습이에요. 이런 울음은 대개 3~5개월쯤 줄어요. 영아산통이라고 부르기도 해요.',
    ],
    todo: [
      // todo[0]·[1]은 임상 감수(흔들기·안전한 곳) 승인 문장. 순서·표현을 바꾸지 않는다
      '아기 몸을 붙잡고 흔들거나, 던지듯 내려놓으면 안 돼요. 몇 초만 세게 흔들어도 뇌를 크게 다치거나 목숨을 잃을 수 있어요. 아무리 힘들어도요.',
      '화가 치밀면 아기를 아기 침대에 등을 대고 눕혀요. 아기 침대가 없으면 바닥의 단단하고 평평한 요 위에 눕혀요. 주변에 베개·이불·인형을 두지 않아요. 그리고 방을 나가요. 5~10분 숨을 고르고 돌아와 아기를 살펴봐요.',
      '배고픈지, 기저귀가 젖었는지, 덥거나 춥지 않은지 먼저 봐요.',
      '가슴에 안아 심장 소리를 듣게 해요. 안고 천천히 걷거나, 낮은 목소리로 말하고 노래해요.',
      '유모차로 산책하거나 따뜻한 물로 목욕을 시켜 봐요. 효과는 아기마다 달라요.',
      '다른 어른이 있으면 잠깐 맡겨요. 없으면 누구에게든 전화해요.',
    ],
    hospital: {
      now: [
        '평소와 다르게 힘없이 울거나, 날카롭고 높은 소리로 울어요.',
        '축 늘어지거나 잘 깨지 않아요.',
        '숨이 멈췄다가 다시 쉬거나, 입술이 파래요.',
        '경련을 해요.',
        '생후 3개월 미만이고 체온이 38℃ 이상이에요.', // 소아과 확인 필요: 측정 부위별 기준(원문 5285 겨드랑이 37.2℃)
        // 흔들림: 증상과 상관없이 바로 119·응급실. "신고되지 않아요" 같은 안심 문구를 넣지 않는다 (임상 감수 C-3)
        '아기가 세게 흔들렸을 수 있어요. 괜찮아 보여도 바로 {{emergency}}에 전화하거나 응급실로 가요. 무슨 일이 있었는지 의료진에게 그대로 말하면 필요한 검사를 빨리 받을 수 있어요.', // 소아과 확인 필요
        '아기가 떨어졌어요 → "바로 {{emergency}}를 불러야 할 때" 카드의 낙상 기준을 봐요.', // 감수 문구 그대로. 본문 숫자 번호 금지 규칙 때문에 119만 {{emergency}}로 씀. 렌더러가 카드 간 링크를 지원하면 링크로
        '초록색 물이나 피가 섞인 것을 토하거나, 피나 젤리 같은 변을 봐요. 배가 부풀고 딱딱해요. 또는 주기적으로 심하게 보채다 멎기를 되풀이하며 토해요.', // 장중첩증 신호, 원문 5721 (2026-09-28)
        '사타구니나 고환 쪽 볼록한 것이 들어가지 않고 단단하거나, 그 부위를 아파하며 울거나 토해요.', // 원문 5468(끼인 탈장). 소아과 확인 필요: 긴급도(원문에 "지금 바로" 명시 없음)
      ],
      soon: [
        '어떤 방법으로도 전혀 달래지지 않거나, 우는 모습이 걱정돼요.',
        '잘 먹지 않거나, 몸무게가 잘 늘지 않아요.',
        '생후 4개월이 지나도 이런 울음이 이어져요.',
        '몸의 한 곳을 만지거나 움직일 때 더 심하게 울어요.', // 원문 5481(움직임이 평소와 다르면 병원, 부분)
        '사타구니나 고환 쪽이 볼록 튀어나왔다 들어갔다 해요. 아파하지 않아도 소아과 진료를 받아요.', // 원문 5468(흔한 탈장은 통증 없음)
      ],
    },
    mom: {
      feel: [
        '몇 시간째 울음을 듣다 보면 무력감이 들어요. 이 시기 울음은 달래는 방법이 틀려서 생기는 게 아니에요.',
        '아기에게 화가 치미는 순간이 있어요. 오래 이어지는 울음 앞에서 많은 부모가 겪어요. 그 뒤에 죄책감이 따라오기도 해요. 화가 나는 것과 아기를 해치는 행동은 달라요. 그 사이에서 멈추는 방법이 아래에 있어요.',
        '화가 올라오는 게 느껴지면, 그때가 아기를 눕히고 잠시 떨어질 때예요.',
      ],
      problems: [
        '우는 아기를 두고 방을 나가면 안 될 것 같아요 → 등을 대고 평평한 곳에 눕혀 두면 울어도 안전해요. 우는 것만으로 아기가 다치지는 않아요. 흔들린 아이 증후군 예방 교육에서도 이렇게 권해요.',
        '혼자라 맡길 사람이 없어요 → 5~10분 떨어져 숨을 고른 뒤 돌아와요. 양육이 버거울 때는 {{family}}에도 전화할 수 있어요.',
        '가족이 "안아 줘서 버릇 들었다", "엄마가 예민해서 그렇다"고 해요 → 이 시기 울음은 달래는 방식 때문이 아니에요. 이 카드를 같이 봐도 돼요.',
        // 위기 연결: 한 줄에 번호 하나씩 (임상 감수 C-4). 109 = 해칠 것 같은 생각, 119 = 이미 다쳤을 수 있음, 1577-0199 = 2주 넘게 힘듦
        '아기를 해칠 것 같은 생각이 들어요 → 먼저 아기를 등을 대고 평평한 곳에 눕히고 그 자리를 떠나요. 그다음 {{suicide}}에 전화나 문자로 이야기해요. 24시간 받아요. 이런 생각이 드는 건 혼자 버티기 어렵다는 신호예요.',
        '아기를 이미 세게 흔들었거나 다치게 했을 수 있어요 → 괜찮아 보여도 바로 {{emergency}}에 전화해요.',
        '힘든 날이 2주 넘게 이어져요 → {{mental}}에 이야기할 수 있어요. 지역 정신건강복지센터로 연결돼요.',
      ],
    },
    more: ['family', 'mental', 'suicide', 'emergency'],
    sources: [
      { name: '임신육아종합포털 아이사랑 · 1~3개월 행동', url: 'https://www.childcare.go.kr/?menuno=427', checked: '2026-09-27', use: 'summary' }, // 원문 미확인
      { name: 'CDC · About Abusive Head Trauma', url: 'https://www.cdc.gov/child-abuse-neglect/about/about-abusive-head-trauma.html', checked: '2026-09-27', use: 'link' }, // 원문 미확인
      { name: 'NHS · Soothing a crying baby', url: 'https://www.nhs.uk/baby/caring-for-a-newborn/soothing-a-crying-baby/', checked: '2026-09-27', use: 'link' }, // 원문 미확인
      { name: 'NHS · Colic', url: 'https://www.nhs.uk/conditions/colic/', checked: '2026-09-27', use: 'link' }, // 원문 미확인
      { name: '질병관리청 국가건강정보포털 · 영아돌연사증후군', url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5467', checked: '2026-09-28', use: 'link' }, // API 원문 대조 완료 2026-09-28 (todo[1] 눕히는 곳)
      { name: '질병관리청 국가건강정보포털 · 소아 청소년의 혈변 및 흑혈변', url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5721', checked: '2026-09-28', use: 'link' }, // API 원문 대조 완료 2026-09-28 (now[7] 젤리 같은 변·주기적 보챔)
      { name: '질병관리청 국가건강정보포털 · 탈장(소아)', url: 'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5468', checked: '2026-09-28', use: 'link' }, // API 원문 대조 완료 2026-09-28 (now[8]·soon[4] 탈장)
    ],
    reviewed: '2026-09-27',
    nextReview: '2026-12-27',
  },
];

if (typeof module !== 'undefined') module.exports = { BI_CARDS };
