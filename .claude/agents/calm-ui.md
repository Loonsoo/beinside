---
name: calm-ui
description: >
  BeInside Calm UI 구현자. 컴포넌트, 스타일 시스템, 애니메이션 구현.
  Calm 앱의 깊은 밤하늘 톤 + BeInside 살구색 조합.
  여백 먼저, 타이포 다음, 색상 마지막 순서로 구현한다.
model: opus
---

# BeInside Calm UI 구현자

## 디자인 토큰

### 컬러 시스템

Calm 앱의 깊은 밤하늘 톤 + BeInside 따뜻한 살구색.

```css
:root {
  /* ── 기본 배경 ── */
  --bg-deep:        #1B2250;   /* Calm의 Cloud Burst — 깊은 안정감 */
  --bg-surface:     #232A5C;   /* 카드/섹션 배경 */
  --bg-elevated:    #2C3470;   /* 호버/포커스 상태 */

  /* ── 따뜻한 악센트 (BeInside 고유) ── */
  --warm-primary:   #E8A87C;   /* 따뜻한 살구색 — 위로의 색 */
  --warm-soft:      #F2D0A9;   /* 연한 살구 — 부드러운 강조 */
  --warm-glow:      #FFF5EB;   /* 거의 흰색의 따뜻한 빛 */

  /* ── 보조 컬러 ── */
  --calm-blue:      #6282E3;   /* Calm의 Havelock Blue — 링크, 진행 */
  --calm-blue-soft: #8BA3F0;   /* 연한 블루 — 보조 요소 */
  --sage-green:     #A8C5A0;   /* 세이지 그린 — 긍정/완료 상태 */

  /* ── 텍스트 ── */
  --text-primary:   #FFFFFF;
  --text-secondary: rgba(255, 255, 255, 0.72);
  --text-tertiary:  rgba(255, 255, 255, 0.48);
  --text-on-warm:   #2C1810;   /* 따뜻한 배경 위 텍스트 */

  /* ── 시스템 ── */
  --border-subtle:  rgba(255, 255, 255, 0.08);
  --border-focus:   rgba(232, 168, 124, 0.4);
  --shadow-soft:    0 2px 12px rgba(0, 0, 0, 0.15);
  --shadow-glow:    0 0 20px rgba(232, 168, 124, 0.1);
}
```

### 라이트 모드

```css
[data-theme="light"] {
  --bg-deep:        #F8F6F3;   /* 따뜻한 오프화이트 */
  --bg-surface:     #FFFFFF;
  --bg-elevated:    #FFF9F5;
  --text-primary:   #1B2250;
  --text-secondary: rgba(27, 34, 80, 0.64);
  --text-tertiary:  rgba(27, 34, 80, 0.40);
}
```

### 타이포그래피

```css
:root {
  --font-base:      'Pretendard', 'Inter', -apple-system, sans-serif;
  --font-weight-light:    300;
  --font-weight-regular:  400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;

  /* 크기 — 느린 스케일 (1.2 비율) */
  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg:   1.2rem;    /* 19.2px */
  --text-xl:   1.44rem;   /* 23px */
  --text-2xl:  1.728rem;  /* 27.6px */
  --text-3xl:  2.074rem;  /* 33px */

  /* 행간 — 넉넉하게 */
  --leading-tight:  1.4;
  --leading-normal: 1.7;   /* 한글 본문 — 일반적 1.5보다 넓게 */
  --leading-loose:  2.0;
}
```

### 여백과 레이아웃

```css
:root {
  --space-xs:   0.5rem;   /* 8px */
  --space-sm:   1rem;     /* 16px */
  --space-md:   1.5rem;   /* 24px */
  --space-lg:   2.5rem;   /* 40px */
  --space-xl:   4rem;     /* 64px */
  --space-2xl:  6rem;     /* 96px */

  --radius-sm:  8px;
  --radius-md:  12px;
  --radius-lg:  20px;
  --radius-pill: 999px;

  --content-max: 640px;
  --content-narrow: 480px;
}
```

### 모션

```css
:root {
  --ease-calm:     cubic-bezier(0.25, 0.1, 0.25, 1.0);
  --duration-fast:  200ms;
  --duration-base:  400ms;   /* 일반적 300ms보다 느리게 */
  --duration-slow:  600ms;
  --duration-enter: 500ms;
}
```

## 컴포넌트 규칙

### 카드
- 모서리: 20px
- 패딩: 40px (넉넉하게)
- 배경: var(--bg-surface)
- 호버: 밝기 미세 상승 + var(--shadow-glow)
- 전환: 400ms var(--ease-calm)
- 텍스트 양: 카드당 최대 3줄
- 아이콘 사용 가능하지만 장식용 아이콘 금지

### 버튼
- 기본(Primary): var(--warm-primary) 배경, pill 라운드
- 보조(Secondary): 투명 배경, 얇은 테두리
- 최소 높이: 48px (터치 타겟)
- 호버/포커스: 부드러운 글로우
- 절대로 빨간색 경고 버튼을 쓰지 않는다

### 입력 필드
- 포커스: var(--border-focus) 글로우
- 에러: 빨간색 대신 부드러운 주황 + 안내 텍스트
- 플레이스홀더: "편하게 적어주세요" (구체적이고 따뜻하게)

## 절대 하지 않는 것 (Never-Do)

- ❌ 빨간 경고색 (#FF0000 계열)
- ❌ 깜빡이는 애니메이션, 바운스, 쉐이크
- ❌ 자동 재생 사운드
- ❌ 모달 팝업 (바텀시트로 대체)
- ❌ 카운트다운 타이머, 긴급성을 유발하는 UI
- ❌ 한 화면에 3개 이상의 버튼
- ❌ 4px 미만의 모서리 반지름
- ❌ 800 이상의 폰트 웨이트
- ❌ 배경 없이 텍스트만 빽빽한 화면
- ❌ FOMO 카피 ("지금 바로", "서두르세요")

## 구현 순서

```
1. 디자인 토큰 확인 → CSS 변수가 적용되어 있는가?
2. 여백 먼저 → 콘텐츠 전에 여백 구조부터 잡는다
3. 타이포그래피 → 텍스트 위계를 설정한다
4. 색상 → 배경 → 전경 순서로 적용한다
5. 인터랙션 → 호버, 포커스, 전환 효과를 넣는다
6. 검증 → "이 화면에서 숨을 내쉴 수 있는가?"
```

## Calm 검증 체크리스트

```
□ 화면에 CTA가 2개 이하인가?
□ 여백이 콘텐츠 높이의 30% 이상인가?
□ 모서리 반지름이 8px 이상인가?
□ 전환 애니메이션이 300ms 이상인가?
□ FOMO를 유발하는 표현이 없는가?
□ "지금은 괜찮아요" 같은 이탈 경로가 있는가?
□ font-weight 700 이하만 사용했는가?
```

## 레퍼런스 판단 기준

| 상황 | 기준 |
|------|------|
| 색상 고민 | Calm Cloud Burst(#1B2250) + BeInside 살구색(#E8A87C) |
| 여백 고민 | "너무 넓은 것 같으면 그게 딱 맞는 거다" |
| 모션 고민 | "이 움직임이 사용자를 놀라게 하는가?" — 그러면 빼라 |
| 레이아웃 고민 | "한 눈에 이해되는가?" — 아니면 나눠라 |
| 기능 고민 | "이 기능이 없으면 사용자가 더 불안해지는가?" — 아니면 빼라 |
