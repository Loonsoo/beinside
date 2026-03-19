# BeInside 데이터 스키마

## 파일 위치
- 주요 데이터: `js/data.js`
- 자기 돌봄 데이터: `js/self-pages.js`
- 성장 가이드 렌더: `js/render.js`

---

## 1. getData(months) — 성장 가이드 데이터

**위치**: `js/render.js`
**호출**: `getData(months)` — 월령을 받아 해당 단계 성장 가이드 반환

### 반환 구조
```javascript
{
  stg: String,      // 단계 이름. 예: '신생아기', '초기 영아기 (2~3개월)'
  em: String,       // 이모지 아이콘. 예: '🐣'
  qt: String,       // 인용문/격언. 예: '세상에 막 도착한 생명...'
  g: [String, String], // 그라디언트 색상. 예: ['#1A5030', '#4EAA78']
  role: String,     // 대상 역할. 예: '부모'

  brain: [String],  // 두뇌·인지 발달 (HTML 허용). 예: '<strong>시냅스 폭발적 형성</strong> — ...'
  emo: [String],    // 정서·사회성 발달 (HTML 허용)
  body: [String],   // 신체 발달·건강 (HTML 허용)

  play: [{          // 놀이·활동 가이드
    t: String,      // 활동 제목. 예: '목소리 자극'
    d: String       // 활동 설명. 예: '엄마·아빠 목소리로 말 걸기...'
  }],

  parent: [{        // 부모 행동 가이드
    e: String,      // 이모지. 예: '👂'
    t: String       // 가이드 텍스트 (줄바꿈 \n 포함). 예: '울음에 즉각 반응\n버릇 걱정 말고...'
  }],

  warn: [String],   // 주의사항 (HTML 허용). 예: '<strong>흔들기 절대 금지</strong> — ...'

  mile: [{          // 발달 이정표 체크리스트
    ck: String,     // 체크 기호. 예: '✓'
    tt: String,     // 체크 제목. 예: '1개월 체크'
    dc: String      // 체크 항목. 예: '큰 소리에 눈 깜빡임...'
  }]
}
```

### 월령별 단계 매핑 (TL 배열)
| 월령 범위 | 단계 이름 | isM (월 단위 표시) |
|----------|----------|-------------------|
| 0~1 | 신생아 | true |
| 2~3 | 초기 영아 | true |
| 4~6 | 중기 영아 | true |
| 7~12 | 후기 영아 | true |
| 13~24 | 걸음마기 | true |
| 25~36 | 유아 초반 | true |
| 4~6세 | 유아기 | false |
| 7~12세 | 학령기 | false |
| 13~18세 | 청소년기 | false |
| 19~29세 | 청년기 | false |
| 30~44세 | 성인기 | false |
| 45~59세 | 중년기 | false |
| 60~74세 | 노년기 | false |
| 75세+ | 후기 노년 | false |

---

## 2. MENTAL — 정신건강 가이드

**위치**: `js/data.js`
**키**: infant, toddler, preschool, school, teen, young, adult, middle, senior

```javascript
{
  stat: {
    pct: String,    // 핵심 수치. 예: '68.5%', '약 14%', '110만 명'
    label: String   // 수치 설명 + 출처. 예: '산모 중 산후우울감 경험 비율 (보건복지부 2024 산후조리 실태조사)'
  },
  risk: String,     // 위험 요약 한 줄. 예: '산후우울증 고위험 시기 — 출산 후 2주~3개월이 가장 취약합니다.'
  signs: [String],  // 위험 신호 목록 (3~5개). 예: '2주 이상 지속되는 깊은 슬픔·무기력감'
  tips: [String]    // 실천 가이드 (3~4개). 예: '수면을 최우선으로 — 도움을 받아 최소 4시간 연속 수면 확보'
}
```

---

## 3. ALONE_DATA — 혼자인 아이/청소년/청년 지원

**위치**: `js/data.js`
**키**: child, teen, young

```javascript
{
  show: Boolean,    // 표시 여부. 항상 true
  quote: String,    // 공감 인용문. 예: '네가 많이 버텨왔다는 거, 선생님은 알아.'
  stat: {
    pct: String,    // 핵심 수치. 예: '약 2천 명'
    label: String   // 수치 설명 + 출처
  },
  items: [{
    icon: String,   // 이모지. 예: '💛'
    title: String,  // 카드 제목. 예: '이것만은 꼭 알아줘'
    text: String    // 카드 내용 (Mode B 톤). 예: '지금 네 주변 상황이 힘든 건...'
  }]
}
```

---

## 4. DAD_DATA — 아빠 가이드

**위치**: `js/data.js`
**키**: infant, toddler, preschool, school, teen

```javascript
{
  label: String,    // 단계 이름. 예: '영아기'
  sub: String,      // 나이 범위. 예: '0~12개월'
  summary: [String], // 핵심 요약 3줄. 예: '스킨십이 아빠의 가장 강력한 육아 도구예요'
  warn: String,     // 주의 사항 한 줄. 예: '아기를 강하게 흔들면 뇌 손상...'
  actions: [{
    icon: String,   // 이모지. 예: '🫂'
    title: String,  // 행동 제목. 예: '하루 20분 캥거루 케어'
    text: String    // 행동 설명. 예: '옷 벗고 피부 맞닿게 안기 — ...'
  }],
  mental: String,   // 아빠 정신건강 메시지. 공감+위로 톤
  toolkits: [{
    title: String,  // 상황 제목. 예: '아기가 계속 울어요'
    steps: [String] // 단계별 행동. 예: '먹였는지 확인 (마지막 수유로부터 2~3시간 경과?)'
  }]
}
```

---

## 5. SP_DATA — 특수 상황 가이드

**위치**: `js/data.js`
**1차 키**: 0 (엄마 부재), 1 (아빠 부재), 2 (이혼·별거), 3 (사망·사별)
**2차 키**: infant, toddler, preschool, school, teen, young

### 헤더 구조
```javascript
SP_DATA[situationIndex].hdr = {
  icon: String,     // 이모지. 예: '👨‍👦'
  title: String,    // 상황 제목. 예: '엄마 부재 — 아빠 홀로 양육'
  sub: String,      // 부제. 예: '아빠의 따뜻함은 엄마의 것과 다르지 않습니다.'
  grad: [String, String] // 그라디언트 색상. 예: ['#1A3A5A', '#3A6A9A']
}
```

### 단계별 구조
```javascript
SP_DATA[situationIndex][stage] = {
  need: [{
    cls: String,      // CSS 클래스. 예: 'rose', 'blue', 'gold', 'green', 'plum'
    tag: String,      // 태그 ID. 예: 'em-r'
    tagText: String,  // 태그 라벨. 예: '정서', '보완', '역할모델'
    title: String,    // 섹션 제목. 예: '피부 접촉과 목소리'
    items: [String]   // 구체적 가이드 항목 (3개)
  }],
  scripts: [{
    tag: String,      // 상황 라벨. 예: '아기에게', '엄마 어디 있어? 할 때'
    text: String      // 대화 스크립트 (큰따옴표로 감싸진 직접 화법)
  }],
  warns: [String]     // 주의 사항 (2개)
}
```

### SP_STAGES 배열
```javascript
[
  { id: 'infant',    label: '영아기',    sub: '0~12개월' },
  { id: 'toddler',   label: '유아 초기', sub: '1~3세' },
  { id: 'preschool',  label: '유아기',    sub: '4~6세' },
  { id: 'school',    label: '학령기',    sub: '7~12세' },
  { id: 'teen',      label: '청소년기',  sub: '13~18세' },
  { id: 'young',     label: '청년기',    sub: '19~40세' }
]
```

---

## 6. BIRTH_DATA — 산후 가이드

**위치**: `js/data.js`
**구조**: 배열 (인덱스 0, 1, 2)

```javascript
[{
  id: String,       // 'b0', 'b1', 'b2'
  label: String,    // '출산 직후', '산후 초기', '산후 회복기'
  sub: String,      // '0~2주', '2~6주', '6주~3개월'
  desc: String,     // 시기 설명. 예: '가장 힘든 첫 고비...'
  alone: String,    // 혼자인 산모 메시지. 예: '혼자라도 이것만은 꼭 챙기세요'
  body: [String],   // 신체 회복 가이드 (HTML 허용, <strong> 사용)
  mental: [String], // 정신건강 가이드 (HTML 허용)
  todo: [{
    icon: String,   // 이모지. 예: '🏥'
    title: String,  // 할 일 제목. 예: '산후 검진 예약'
    text: String    // 할 일 설명
  }],
  alert: [String]   // 응급 상황 경고 (즉시 병원/119)
}]
```

---

## 7. BURNOUT_DATA — 번아웃 가이드

**위치**: `js/self-pages.js`

```javascript
{
  intro: {
    title: String,  // '번아웃은 게으름이 아니에요'
    sub: String,    // '에너지가 바닥난 상태예요...'
    stat: { pct: String, label: String }
  },
  check: {
    id: String,           // 'ct_burnout'
    title: String,        // '지금 내 상태는?'
    questions: [String],  // 자가 체크 질문 (6개)
    results: {
      high: { label: String, threshold: Number, action: String },
      mid:  { label: String, threshold: Number, action: String },
      low:  { label: String, threshold: Number }
    }
  },
  actions: {
    immediate: [{ icon: String, text: String }],  // 오늘 당장
    week: [{ icon: String, text: String }],        // 이번 주
    longterm: [{ icon: String, text: String }]     // 장기
  },
  distinction: {
    title: String,
    burnout: [String],     // 번아웃 특징
    depression: [String],  // 우울증 특징
    note: String
  },
  help: [{
    number: String,   // 전화번호. 예: '1577-0199'
    name: String,     // 기관명. 예: '정신건강위기상담전화'
    desc: String      // 한 줄 설명 + 운영시간
  }]
}
```

---

## 8. RELATIONSHIP_DATA — 관계 붕괴 가이드

**위치**: `js/self-pages.js`

```javascript
{
  situations: [{
    id: String,     // 'divorce', 'family', 'friend', 'breakup'
    icon: String,   // 이모지
    label: String,  // 상황 이름. 예: '이혼 직후'
    sub: String     // 한 줄 설명
  }],
  [situationId]: {
    recognition: String,  // 상황 인식 메시지. 예: '이혼은 실패가 아니에요...'
    check: {
      id: String,
      title: String,
      questions: [String],
      emergencyIndex: Number,     // (선택) 위기 질문 인덱스
      emergencyMsg: String,       // (선택) 위기 시 메시지 (HTML)
      results: {
        high: { label: String, threshold: Number, action: String },
        mid:  { label: String, threshold: Number },
        low:  { label: String, threshold: Number }
      }
    },
    actions: [{ icon: String, text: String }],
    help: [{ number: String, name: String, desc: String }]
  }
}
```

---

## 9. TRANSITION_DATA — 인생 전환기 가이드

**위치**: `js/self-pages.js`

```javascript
{
  situations: [{
    id: String,     // 'jobless', 'failure', 'direction', 'move'
    icon: String,
    label: String,  // '실직·퇴사', '사업·창업 실패', '진로를 모르겠어요', '새로운 환경 적응'
    sub: String
  }],
  [situationId]: {
    recognition: String,
    check: {
      id: String,
      title: String,
      questions: [String],
      emergencyIndex: Number,   // (선택)
      emergencyMsg: String,     // (선택, HTML)
      results: { high, mid, low }
    },
    actions: [{ icon: String, text: String }],
    help: [{ number: String, name: String, desc: String }]
  }
}
```

---

## 10. 기타 데이터

### TAG_MAP — 메모 태그
**위치**: `js/data.js`
```javascript
{
  growth: '🌱 성장·발달',
  speech: '🗣️ 언어·말',
  emotion: '💛 감정·행동',
  milestone: '⭐ 특별한 순간',
  health: '🩺 건강·병원',
  daily: '☀️ 일상 기록',
  other: '📝 기타'
}
```

### Storage Keys
```javascript
MEMO_KEY = 'beinside_memos_v1'
STORAGE_KEY = 'beinside_profiles_v2'
ACTIVE_KEY = 'beinside_active_v2'
```

### EMOJIS — 이모지 팔레트
36개 이모지 배열 (프로필 아이콘용)
