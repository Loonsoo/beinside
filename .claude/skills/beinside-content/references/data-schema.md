# BeInside 데이터 스키마

`js/data.js`에 정의된 모든 데이터 구조를 설명합니다.
새 콘텐츠를 추가할 때 이 문서를 기준으로 삼으세요.

---

## 1. `getData(months)` 반환 객체

월령(months)을 입력받아 해당 월령의 발달 가이드 데이터를 반환합니다.

```js
{
  stg: String,        // 발달 단계 제목 (예: "신생아기 0-3개월")
  em:  String,        // 이모지 (예: "🌱")
  qt:  String,        // 핵심 인용문 (따옴표 없이)
  g:   [String, ...], // 성장 포인트 배열 (2~4개 문장)
  role: String,       // 부모 역할 핵심 한 줄
  brain: [String, ...],  // 뇌 발달 포인트 배열
  emo:   [String, ...],  // 감정 발달 포인트 배열
  body:  [String, ...],  // 신체 발달 포인트 배열
  play:  [             // 놀이 활동 배열
    { t: String,       //   활동 제목
      d: String }      //   활동 설명
  ],
  parent: [            // 부모 팁 배열
    { e: String,       //   이모지
      t: String }      //   팁 내용
  ],
  warn:  [String, ...],  // 병원 방문 신호 배열 (경고 문장)
  mile:  [             // 발달 이정표 체크리스트 배열
    { ck: "✓",         //   체크 기호 (항상 "✓")
      tt: String,      //   이정표 제목
      dc: String }     //   이정표 설명
  ]
}
```

**주의사항**
- `warn` 배열의 문장은 "~라면 병원에" 형식으로 구체적으로 작성
- `mile` 배열은 해당 월령의 50%ile 기준. 개인차가 크다는 주석 필수

---

## 2. `SP_DATA` — 상황별 가이드 구조

특수 상황(분노조절, 수면 거부 등)에 대한 단계별 가이드.

```js
SP_DATA = {
  "[상황키]": {
    title: String,         // 상황 제목
    icon:  String,         // 이모지
    ages:  [String, ...],  // 해당 연령 범위 배열
    steps: [
      {
        label:   String,        // 단계 라벨 (예: "1단계")
        title:   String,        // 단계 제목
        need:    String,        // 이 단계에서 필요한 것
        scripts: [String, ...], // 실제로 할 말 대본 배열
        warns:   [String, ...]  // 이 단계의 주의사항 배열
      }
    ]
  }
}
```

---

## 3. `MENTAL` — 정신건강 데이터 구조

연령대별 정신건강 정보.

```js
MENTAL = {
  "[연령키]": {           // infant/toddler/preschool/school/teen/young/adult/middle/senior
    stat: {
      pct:   String,     // 통계 수치 (예: "27.7%")
      label: String      // 수치 설명 + 출처 (한 문장)
    },
    risk:  String,       // 이 시기 고위험 설명 한 줄
    signs: [String, ...],// 위험 신호 배열 (구체적 행동·증상)
    tips:  [String, ...] // 대처 팁 배열 (실행 가능한 형태)
  }
}
```

**연령키 목록**: `infant` | `toddler` | `preschool` | `school` | `teen` | `young` | `adult` | `middle` | `senior`

---

## 4. `ALONE_DATA` — 혼자인 아이/청소년 지원 데이터

```js
ALONE_DATA = {
  "[대상키]": {           // child / teen / adult 등
    show:  Boolean,      // 표시 여부
    quote: String,       // 응원 메시지 인용문
    stat: {
      pct:   String,     // 통계 수치
      label: String      // 수치 설명 + 출처
    },
    items: [
      {
        icon:  String,   // 이모지
        title: String,   // 카드 제목
        text:  String    // 카드 본문 (청소년 톤 적용)
      }
    ]
  }
}
```

---

## 5. `BIRTH_DATA` — 출산 가이드 데이터

```js
BIRTH_DATA = {
  "[단계키]": {            // before / birth / after 등
    body:  [String, ...], // 신체 변화 배열
    mental:[String, ...], // 정서 변화 배열
    todo:  [String, ...], // 해야 할 일 체크리스트
    alert: [String, ...]  // 즉시 병원 신호 배열
  }
}
```

---

## 상수 및 설정

```js
MEMO_KEY    = 'beinside_memos_v1'     // localStorage 메모 키
STORAGE_KEY = 'beinside_profiles_v2'  // localStorage 프로필 키
ACTIVE_KEY  = 'beinside_active_v2'    // localStorage 활성 프로필 키

TAG_MAP = {                            // 메모 태그 레이블
  growth, speech, emotion, milestone, health, daily, other
}
```
