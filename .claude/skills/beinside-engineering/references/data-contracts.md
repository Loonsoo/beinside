# BeInside 데이터 타입 계약

모든 데이터 객체의 구조 정의. 기존 필드 삭제·변경 금지, 추가만 허용.

## getData(months)

```js
// @param {number} months - 월령 (0~36)
// @returns {Object}
getData(months) → {
  cards: [                    // 성장 카드 배열
    {
      icon: String,           // 이모지
      title: String,          // 카드 제목
      text: String            // 카드 본문
    }
  ],
  stage: String,              // 발달 단계명
  monthLabel: String,         // "N개월" 형태 레이블
  // ... 추가 필드 가능
}
```

## MENTAL[stageKey]

```js
// stageKey: "newborn" | "infant" | "toddler" | "preschool" 등
MENTAL[stageKey] → {
  stat: {
    pct: String,              // "72%" 형태 통계 수치
    label: String             // 통계 설명
  },
  risk: String,               // 위험 요인 설명
  signs: [String],            // 주의 신호 목록
  tips: [String]              // 대처 팁 목록
}
```

## ALONE_DATA[key]

```js
// key: 상황 키 문자열
ALONE_DATA[key] → {
  show: String,               // 표시 제목
  quote: String,              // 인용 문구
  stat: {
    pct: String,              // 통계 수치
    label: String             // 통계 설명
  },
  items: [
    {
      icon: String,           // 이모지
      title: String,          // 항목 제목
      text: String            // 항목 본문
    }
  ]
}
```

## DAD_DATA[stageKey]

```js
// stageKey: "newborn" | "infant6" | "toddler" | "preschool" 등
DAD_DATA[stageKey] → {
  label: String,              // 단계 레이블
  sub: String,                // 부제목
  summary: [String],          // 요약 문장 배열
  warn: String,               // 주의사항
  actions: [
    {
      icon: String,           // 이모지
      title: String,          // 행동 제목
      text: String            // 행동 설명
    }
  ],
  mental: String,             // 아빠 멘탈 관련 메시지
  toolkits: [
    {
      title: String,          // 도구 제목
      steps: [String]         // 단계별 안내
    }
  ]
}
```

## SP_DATA (특수 상황)

```js
// SP_DATA는 배열, 각 요소가 상황 하나
SP_DATA[situationIndex] → {
  hdr: {
    icon: String,             // 상황 아이콘
    title: String,            // 상황 제목
    sub: String,              // 부제목
    grad: [String, String]    // 그라데이션 색상 [시작, 끝]
  },
  // stageKey별 데이터
  [stageKey]: {
    need: [
      {
        cls: String,          // CSS 클래스
        tag: String,          // 태그 종류
        tagText: String,      // 태그 텍스트
        title: String,        // 필요 항목 제목
        items: [String]       // 세부 항목 배열
      }
    ],
    scripts: [
      {
        tag: String,          // 스크립트 태그
        text: String          // 스크립트 내용
      }
    ],
    warns: [String]           // 주의사항 배열
  }
}
```

## BURNOUT_DATA

```js
BURNOUT_DATA → {
  [sectionKey]: {
    title: String,            // 섹션 제목
    icon: String,             // 이모지
    items: [
      {
        title: String,        // 항목 제목
        text: String          // 항목 본문
      }
    ]
  }
}
```

## RELATIONSHIP_DATA

```js
RELATIONSHIP_DATA → {
  [sectionKey]: {
    title: String,            // 섹션 제목
    icon: String,             // 이모지
    items: [
      {
        title: String,        // 항목 제목
        text: String          // 항목 본문
      }
    ]
  }
}
```

## TRANSITION_DATA

```js
TRANSITION_DATA → {
  [sectionKey]: {
    title: String,            // 섹션 제목
    icon: String,             // 이모지
    items: [
      {
        title: String,        // 항목 제목
        text: String          // 항목 본문
      }
    ]
  }
}
```

## EMOTION_DATA

```js
EMOTION_DATA → {
  [emotionKey]: {
    title: String,            // 감정 이름
    icon: String,             // 이모지
    description: String,      // 감정 설명
    tips: [String]            // 대처 팁 배열
  }
}
```

## 보조 상수

```js
TAG_MAP → {
  [tagKey]: String            // 태그 키 → 표시 텍스트 매핑
}

EMOJIS → [String]            // 사용 가능한 이모지 배열
```

## localStorage 키

| 키 | 용도 | 보존 기간 |
|---|---|---|
| `beinside_memos_v1` | 메모 데이터 | 90일 |
| `beinside_profiles_v2` | 프로필 목록 | 영구 |
| `beinside_active_v2` | 활성 프로필 ID | 영구 |
