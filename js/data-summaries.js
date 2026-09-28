/* ═══════════════════════════════════════════════════════════
   BeInside — 상황 요약 (칩 도착 화면, 카드가 게시되기 전)
   reports/design/2026-09-consistency-audit.md §3-(b)

   상황 요약은 "카드"가 아니다. 사이트에 이미 공개된 문장을 카드와 같은 틀에 모은 것이다.
   - kind: 'summary'. 렌더러(js/cards.js summaryHTML)가 카드와 같은 조각 함수로 그린다.
   - 문장마다 from: '파일#앵커'. 앵커는 그 파일 안의 id(id="…") 또는 글자.
     tests/cards.test.js가 문장이 from 위치 원문에 그대로 있는지 대조한다
     (태그 제거·공백 정규화 후 부분 일치. {{키}}는 HELPLINES 번호로 바꿔서 대조).
     허용 수정: 없음. 원문 일부를 잘라 쓰는 것만 된다.
   - 새 의학 주장·약 제품명·용량을 쓰지 않는다.
   - 초안 카드(js/data-cards.js)·임상 감수 문구와 뜻이 어긋나는 옛 문장은 넣지 않는다.
     뺀 문장(2026-09-28):
       · "경련이 5분 넘게 이어져요", "5분 이상 지속되면 즉시 119" — 카드는 경련이면 바로 119
       · "떨어지거나 부딪힌 뒤 … 계속 토하거나 …" — 카드는 한 번 토해도 바로 119
       · "그래도 3시간 이상 → 소아과 문의" — 울음 카드(PURPLE: 오래 우는 것도 이 시기에 흔함)와 기준이 다름
       · "6개월 이상 → 잘 먹고 잘 노는지 보며 지켜보기" — 카드의 "지금 바로"·"오늘" 기준보다 느슨함
       · "모유나 분유를 평소보다 자주 먹이기 — 탈수 예방이 핵심" — 카드는 "평소처럼 먹여요"
       · "그건 자격 문제가 아니라 아기의 소화·성장통·불안 신호예요" — 원인 단정
       · 유선염·항생제 줄 — 진단 추정·치료 지시
   - 공유 버튼·정적 빌드·사이트맵·검색 노출에서 빠진다(noindex).
   - 칸이 모자라면 비워 둔다. 렌더러가 "아직 모으지 못했어요" 한 줄을 넣는다.
   - 전화번호는 문장에 숫자로 쓰지 않고 {{HELPLINES 키}}로 쓴다(카드와 같음).
═══════════════════════════════════════════════════════════ */

const SUMMARY_COLLECTED = '2026-09-28';

/* from → "이 요약에 모은 안내" 목록의 사이트 안 위치. go는 js/cards.js CARD_FALLBACKS 키 */
const SUMMARY_PLACES = {
  'js/render.js#고열 대처':              { label: '성장 가이드 › 응급처치 가이드 › 고열 대처', href: '/growth', go: 'fever' },
  'js/render.js#영유아 응급처치 가이드':  { label: '긴급 도움 › 영유아 응급처치 가이드', href: '/emergency', go: 'firstaid' },
  'js/render.js#신생아기':               { label: '성장 가이드 › 신생아', href: '/growth', go: 'm0' },
  'js/render.js#초기 영아기':             { label: '성장 가이드 › 2~3개월', href: '/growth', go: 'm3' },
  'js/render.js#중기 영아기':             { label: '성장 가이드 › 4~6개월', href: '/growth', go: 'm6' },
  'js/render.js#후기 영아기':             { label: '성장 가이드 › 7~12개월', href: '/growth', go: 'm12' },
  'index.html#emer-119-signs':          { label: '긴급 도움 › 아기에게 이런 일이 있으면 바로 119', href: '/emergency', go: 'call119' },
  'index.html#sleep-infant':            { label: '성장 가이드 › 아이가 밤에 안 자요 (0~12개월)', href: '/growth', go: 'sleep' },
  'index.html#pp-l-night':              { label: '첫 화면 › 새벽에 할 수 있는 것 3가지', href: '/', go: 'night' },
  'index.html#pp-redflags':             { label: '첫 화면 › 바로 연락해야 하는 신호', href: '/', go: 'redflags' },
  'js/pp-home.js#출산 후 첫 2주':         { label: '첫 화면 › 출산 후 첫 2주', href: '/', go: 'home' },
  'js/pp-home.js#출산 후 3~6주':          { label: '첫 화면 › 출산 후 3~6주', href: '/', go: 'home' },
  'js/pp-home.js#출산 후 6주~3개월':       { label: '첫 화면 › 출산 후 6주~3개월', href: '/', go: 'home' },
  'js/pp-home.js#출산 후 3~12개월':        { label: '첫 화면 › 출산 후 3~12개월', href: '/', go: 'home' },
  'js/data.js#아기가 계속 울어요':         { label: '성장 가이드 › 아기가 계속 울어요', href: '/growth', go: 'crying' },
  'js/data.js#유방 울혈':                 { label: '출산 & 산후 회복 › 출산 직후', href: '/birth', go: 'birth' },
  'js/data.js#수유 결정은 내가 해요':      { label: '출산 & 산후 회복 › 산후 초기', href: '/birth', go: 'birth' },
  'js/data-guides-new.js#POSTPARTUM_DATA': { label: '산후 마음 가이드', href: '/postpartum', go: 'postpartum' },
  'js/data-guides-new.js#partnerTip':      { label: '산후 마음 가이드 › 배우자·가족이 알아야 할 것', href: '/postpartum', go: 'postpartum' },
};

const BI_SUMMARIES = [

  /* ── 열이 나요 ── 병원 기준 문장 위주 (감사 §3-(b): 열·119 요약은 B2에 가깝게) */
  {
    id: 'fever',
    kind: 'summary',
    title: '아기가 열이 나요',
    urgent: true,
    urgentLine: { t: '생후 3개월 미만인데 38℃ 이상 열이 나요 (바로 응급실, 갈 방법이 없으면 {{emergency}})', from: 'index.html#emer-119-signs' },
    what: [],
    todo: [
      { t: '옷을 가볍게 입히고 방을 너무 덥지 않게 하기 (알코올로 닦지 않기)', from: 'js/render.js#고열 대처' },
      { t: '6개월 전에는 물·보리차를 따로 주지 않기', from: 'js/render.js#고열 대처' },
      { t: '해열제는 소아과나 약사에게 먼저 물어보기', from: 'js/render.js#고열 대처' },
    ],
    hospital: {
      now: [
        { t: '3개월 미만 38℃ 이상 → 즉시 응급실', from: 'js/render.js#고열 대처' },
        { t: '불러도 반응이 없거나 숨을 제대로 쉬지 않아요', from: 'index.html#emer-119-signs' },
      ],
      soon: [
        { t: '3~6개월 39℃ 이상 → 당일 소아과', from: 'js/render.js#고열 대처' },
      ],
    },
    mom: { feel: [], problems: [] },
    more: ['emergency'],
    detail: { go: 'fever', label: '성장 가이드 › 응급처치 가이드' },
  },

  /* ── 안 그치고 울어요 ── 엄마 중심. 흔들기 금지가 첫 줄. 흔들기를 권하던 옛 문장은 없음 */
  {
    id: 'crying',
    kind: 'summary',
    title: '아기가 안 그치고 울어요',
    urgent: false,
    what: [],
    todo: [
      { t: '아무리 힘들어도 아기를 흔들지 마세요. 짧게 흔들어도 뇌를 다칠 수 있어요.', from: 'js/pp-home.js#출산 후 6주~3개월' },
      { t: '아기를 아기 침대에 등을 대고 눕혀요. 방을 나와 5~10분 숨을 고르고, 다시 가서 살펴보세요. 안전한 곳에서 우는 건 괜찮아요.', from: 'index.html#pp-l-night' },
      { t: '먹였는지 확인', from: 'js/data.js#아기가 계속 울어요' },
      { t: '기저귀 체크', from: 'js/data.js#아기가 계속 울어요' },
      { t: '트림 안 됐을 수 있음 → 세워서 등 토닥이기', from: 'js/data.js#아기가 계속 울어요' },
      { t: '쉿 소리를 내며 세워 안고 천천히 걷기 — 아기 몸을 붙잡고 흔들면 절대 안 돼요', from: 'js/data.js#아기가 계속 울어요' },
    ],
    hospital: {
      now: [
        { t: '38°C 이상이면 생후 3개월 미만은 바로 응급실', from: 'js/data.js#아기가 계속 울어요' },
      ],
      soon: [
        { t: '평소와 다르게 울거나 열이 나면(3개월 미만은 38℃ 이상) 바로 진료를 받아요.', from: 'index.html#pp-l-night' },
      ],
    },
    mom: {
      feel: [],
      problems: [
        { q: '몸부터 챙기기', a: '물 한 잔 마시고, 4초 들이쉬고 6초 내쉬기를 다섯 번 해 보세요.', from: 'index.html#pp-l-night' },
        { q: '말할 사람이 없다면', a: '{{suicide}}에 문자를 보내도 돼요. "잠을 못 자서 너무 힘들어요"처럼 짧게 써도 괜찮아요.', from: 'index.html#pp-l-night' },
      ],
    },
    more: ['suicide', 'mental', 'emergency'],
    detail: { go: 'night', label: '첫 화면 › 새벽에 할 수 있는 것 3가지' },
  },

  /* ── 밤에 안 자요 ── 0~12개월만. 1~3세·4~6세 단계는 옮기지 않음 */
  {
    id: 'sleep',
    kind: 'summary',
    title: '아기가 밤에 안 자요',
    urgent: false,
    what: [
      { label: '신생아기', t: '수면 하루 16~18시간 (2~3시간 단위로 깸)', from: 'js/render.js#신생아기' },
      { label: '초기 영아기 (2~3개월)', t: '수면 15~16시간, 밤 수면 4~6시간 연속 가능해지기 시작', from: 'js/render.js#초기 영아기' },
      { label: '중기 영아기 (4~6개월)', t: '밤 수면 6~8시간 연속 가능해지는 아이 늘어남', from: 'js/render.js#중기 영아기' },
    ],
    todo: [
      { t: '영아는 절대 엎드려 재우지 마세요 — 영아돌연사증후군(SIDS) 위험', from: 'index.html#sleep-infant' },
      { t: '수면 중 주변 부드러운 물건(베개·인형) 제거 — 질식 위험', from: 'js/render.js#신생아기' },
      { t: '수유 후 충분한 트림 확인 — 속 불편하면 못 자요', from: 'index.html#sleep-infant' },
      { t: '방 온도 20~22°C, 너무 덥거나 춥지 않은지 확인', from: 'index.html#sleep-infant' },
      { t: '백색 소음(선풍기·빗소리·쉿 소리)', from: 'index.html#sleep-infant' },
      { t: '수면 의식 만들기: 목욕 → 수유 → 어두운 방 → 자장가 순서 고정', from: 'index.html#sleep-infant' },
    ],
    hospital: { now: [], soon: [] },
    mom: {
      feel: [],
      problems: [
        { t: '아기가 잘 때 나도 눈을 붙이는 게 먼저예요. 집안일은 미뤄도 돼요.', from: 'js/pp-home.js#출산 후 첫 2주' },
        { q: '몸부터 챙기기', a: '물 한 잔 마시고, 4초 들이쉬고 6초 내쉬기를 다섯 번 해 보세요.', from: 'index.html#pp-l-night' },
        { q: '말할 사람이 없다면', a: '{{suicide}}에 문자를 보내도 돼요. "잠을 못 자서 너무 힘들어요"처럼 짧게 써도 괜찮아요.', from: 'index.html#pp-l-night' },
      ],
    },
    more: ['suicide', 'mental'],
    detail: { go: 'sleep', label: '성장 가이드 › 아이가 밤에 안 자요' },
  },

  /* ── 잘 안 먹어요 ── 월령별 수유·이유식 범위와 먹이면 안 되는 것. "안 먹을 때" 병원 기준은 공개 문장이 없어 비워 둠 */
  {
    id: 'feeding',
    kind: 'summary',
    title: '아기가 잘 안 먹어요',
    urgent: false,
    what: [
      { label: '신생아기', t: '수유 24시간 8~12회 (2~3시간 간격)', from: 'js/render.js#신생아기' },
      { label: '중기 영아기 (4~6개월)', t: '이유식 시작 권장 시점 — WHO 권장 만 6개월, 최소 만 4개월 이후', from: 'js/render.js#중기 영아기' },
      { label: '후기 영아기 (7~12개월)', t: '이유식 → 유아식 전환 시작, 컵으로 마시기 시도', from: 'js/render.js#후기 영아기' },
    ],
    todo: [
      { t: '6개월 전에는 물·보리차를 따로 주지 않기', from: 'js/render.js#고열 대처' },
      { t: '이유식 꿀 절대 금지(1세 미만) — 영아 보툴리눔 위험', from: 'js/render.js#중기 영아기' },
      { t: '1세 미만 생우유 금지 — 분유·모유만', from: 'js/render.js#후기 영아기' },
      { t: '포도알·떡 크기 음식 — 기도 막힘 위험', from: 'js/render.js#후기 영아기' },
    ],
    hospital: { now: [], soon: [] },
    mom: {
      feel: [
        { t: '모유든 분유든 당신의 선택이에요.', from: 'js/data.js#수유 결정은 내가 해요' },
      ],
      problems: [
        { q: '유방 울혈', a: '돌처럼 단단해지면 따뜻한 수건 찜질 후 수유 또는 유축.', from: 'js/data.js#유방 울혈' },
      ],
    },
    more: ['mental', 'emergency'],
    detail: { go: 'feeding', label: '성장 가이드 › 신체 발달 & 의학 체크' },
  },

  /* ── 바로 119 ── urgent 규칙: 맨 위 119 줄. 처치 절차는 옮기지 않고 응급처치 가이드로 연결 */
  {
    id: 'call119',
    kind: 'summary',
    title: '바로 119를 불러야 할 때',
    urgent: true,
    urgentLine: { t: '아기에게 이런 일이 있으면 바로 {{emergency}}', from: 'index.html#emer-119-signs' },
    what: [],
    todo: [
      { t: '응급상황 즉시 {{emergency}} 신고 — 전화 연결 유지하며 지시에 따르세요', from: 'js/render.js#영유아 응급처치 가이드' },
    ],
    todoTools: [
      { go: 'firstaid', label: '영유아 응급처치 가이드', sub: '심폐소생술 · 기도 폐쇄 · 화상 · 열성경련 · 낙상' },
    ],
    hospital: {
      now: [
        { t: '불러도 반응이 없거나 숨을 제대로 쉬지 않아요', from: 'index.html#emer-119-signs' },
        { t: '기침·울음소리 없이 얼굴이 파래져요 (목에 뭔가 걸림)', from: 'index.html#emer-119-signs' },
        { t: '손바닥보다 넓은 화상이거나 얼굴·손·생식기 화상이에요', from: 'index.html#emer-119-signs' },
        { t: '생후 3개월 미만인데 38℃ 이상 열이 나요 (바로 응급실, 갈 방법이 없으면 {{emergency}})', from: 'index.html#emer-119-signs' },
      ],
      soon: [],
    },
    mom: { feel: [], problems: [] },
    more: ['emergency', 'suicide'],
    detail: { go: 'call119', label: '긴급 도움 › 바로 119 신호와 응급처치' },
  },

  /* ── 엄마가 힘들어요 ── 마음 신호 확인 버튼이 "지금 할 일" 첫 줄. 연락 기준은 대시보드 3단계(정신과 감수본) 그대로 */
  {
    id: 'mom',
    kind: 'summary',
    title: '엄마가 힘들어요',
    urgent: false,
    hospitalTitle: '병원·상담에 연락할 때',
    disclaimerWho: '산부인과·정신건강의학과·보건소',
    what: [
      { t: '눈물이 나고 기분이 자주 오르내리는 건 많은 산모가 겪고, 보통 2주 안에 옅어져요(베이비 블루스).', from: 'js/pp-home.js#출산 후 첫 2주' },
      { t: '아기가 자도 전혀 잠들 수 없거나, 혼란스럽거나, 나나 아기를 해칠 것 같은 생각이 들면 블루스가 아니에요.', from: 'js/pp-home.js#출산 후 첫 2주' },
      { t: '우울한 기분이 2주 넘게 이어지면 베이비 블루스가 아니라 산후우울일 수 있어요.', from: 'js/pp-home.js#출산 후 3~6주' },
      { t: '출산 후 1년까지는 산후우울이 생길 수 있는 기간으로 봐요. 늦게 시작돼도 도움을 받을 수 있어요.', from: 'js/pp-home.js#출산 후 3~12개월' },
    ],
    todoTools: [
      { go: 'check', label: '마음 신호 확인', sub: '2분 · 7가지 질문 · 진단 아님' },
    ],
    todo: [
      { t: '아기가 잘 때 나도 눈을 붙이는 게 먼저예요. 집안일은 미뤄도 돼요.', from: 'js/pp-home.js#출산 후 첫 2주' },
      { t: '누군가 한 번이라도 밤 수유를 맡아 줄 수 있다면, 그날은 길게 이어 자 보세요.', from: 'js/data-guides-new.js#POSTPARTUM_DATA' },
      { t: '"나 좀 힘들어"라고 말할 사람 1명에게 연락해 보세요.', from: 'js/data-guides-new.js#POSTPARTUM_DATA' },
      { t: '물 한 잔 마시고, 4초 들이쉬고 6초 내쉬기를 다섯 번 해 보세요.', from: 'index.html#pp-l-night' },
    ],
    hospital: {
      nowTitle: { t: '119 또는 응급실, 지금 바로', from: 'index.html#pp-redflags' },
      now: [
        { t: '나나 아기를 해치려는 마음이 들거나, 그 생각이 옳게 느껴지거나, 멈출 수 없을 것 같을 때', from: 'index.html#pp-redflags' },
        { t: '죽을 방법을 정했거나 준비했을 때, 이미 자해했거나 약을 많이 먹었을 때', from: 'index.html#pp-redflags' },
        { t: '아기와 함께 사라지는 게 낫다는 생각이 들 때', from: 'index.html#pp-redflags' },
        { t: '다음 중 하나라도 있을 때: 없는 소리가 들리거나 없는 것이 보임 / 사실이 아닌 강한 확신(누군가 아기를 해치려 한다 등) / 며칠째 거의 못 자고 혼란스러움 / 잠을 거의 안 자도 피곤하지 않고, 들뜨거나 말·생각이 빨라짐 (산후 정신증 신호일 수 있어요. 드물지만 빨리 치료할수록 좋은 응급 상태예요. 본인보다 주변 사람이 먼저 알아채기도 하니, 가족이 이 목록을 본다면 본인이 괜찮다고 해도 {{emergency}}에 전화해 주세요)', from: 'index.html#pp-redflags' },
        { t: '38℃ 이상 열, 한 시간에 생리대를 하나 넘게 적시는 출혈, 가슴 통증이나 숨이 참, 심한 두통이나 앞이 흐려 보일 때, 경련이나 의식을 잃을 때, 한쪽 다리가 붓고 아프고 붉을 때', from: 'index.html#pp-redflags' },
      ],
      soon: [],
      tiers: [
        {
          title: { t: '109, 지금 (전화 또는 문자)', from: 'index.html#pp-redflags' },
          items: [
            { t: '사라지고 싶거나 죽고 싶다는 생각이 들 때', from: 'index.html#pp-redflags' },
            { t: '방법까지 생각했거나 멈출 수 없을 것 같으면 위의 {{emergency}}에 전화해 주세요.', from: 'index.html#pp-redflags' },
          ],
          calls: ['suicide'],
        },
        {
          title: { t: '1577-0199 또는 보건소, 이번 주에', from: 'index.html#pp-redflags' },
          items: [
            { t: '우울하거나 아무것도 즐겁지 않은 날이 2주 넘게 이어질 때', from: 'index.html#pp-redflags' },
            { t: '원하지 않는데 아기가 다치는 장면이 자꾸 떠올라 괴롭거나, 그 생각 때문에 아기 목욕·칼 같은 것을 피하게 될 때 (많은 부모가 겪고, 그 생각대로 행동하는 것과는 달라요. 상담이나 치료를 받으면 줄어드는 경우가 많아요)', from: 'index.html#pp-redflags' },
          ],
          calls: ['mental'],
        },
      ],
    },
    mom: {
      feel: [
        { t: '아기를 보면서도 기쁘지 않고, 오히려 죄책감이 들어요', from: 'js/data-guides-new.js#POSTPARTUM_DATA' },
        { t: '아무것도 하고 싶지 않은데, 쉴 수도 없어요', from: 'js/data-guides-new.js#POSTPARTUM_DATA' },
        { t: '갑자기 눈물이 나거나, 아무 이유 없이 화가 나요', from: 'js/data-guides-new.js#POSTPARTUM_DATA' },
        { t: '아기와 단둘이 있는 게 무서워요', from: 'js/data-guides-new.js#POSTPARTUM_DATA' },
        { t: '산후우울증은 의지의 문제가 아니에요.', from: 'js/data-guides-new.js#partnerTip' },
      ],
      problems: [
        { t: '산후 검진 때 기분 이야기도 해도 돼요.', from: 'js/pp-home.js#출산 후 3~6주' },
        { q: '도와줄 사람이 없다면', a: '보건소에 산모·신생아 방문 지원을 문의해 보세요.', from: 'js/pp-home.js#출산 후 3~6주' },
        { q: '말할 사람이 없다면', a: '{{suicide}}에 문자를 보내도 돼요. "잠을 못 자서 너무 힘들어요"처럼 짧게 써도 괜찮아요.', from: 'index.html#pp-l-night' },
      ],
    },
    more: ['suicide', 'mental', 'women', 'emergency'],
    detail: { go: 'check', label: '산후 마음 가이드 › 마음 신호 확인' },
  },
];

if (typeof module !== 'undefined') module.exports = { BI_SUMMARIES, SUMMARY_PLACES, SUMMARY_COLLECTED };
