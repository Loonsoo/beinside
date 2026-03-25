---
name: beinside-designing
description: >
  BeInside의 UX/UI를 Apple HIG 원칙으로 설계·구현하는 디자인 시스템 스킬.
  레이아웃, 컴포넌트, 색상, 타이포그래피, 인터랙션, 반응형, 접근성,
  애니메이션 등 모든 시각·상호작용 요소에 적용한다.
  "디자인", "UI", "UX", "레이아웃", "스타일", "반응형", "모바일",
  "카드", "버튼", "아코디언", "체크리스트", "접근성", "애니메이션",
  "색상", "폰트", "간격", "컴포넌트", "인터랙션", "그리드" 키워드에 반응.
  UI를 만들거나 바꿀 때 반드시 사용. 이 스킬 없이 UI를 건드리면
  디자인 시스템이 깨진다. 작업 후에는 hig-auditor 에이전트로 검수를 위임하라.
---

# BeInside Design System — Apple HIG 기반

## 레퍼런스 앱
디자인 판단이 어려울 때 이 앱들의 UX를 참고하라:
- **Apple Health** — 카테고리 그리드, 자가 체크, 데이터 시각화의 정보 밀도
- **Apple App Store** — 카드 레이아웃, 시각적 위계, 히어로 배너
- **Apple 지갑(Wallet)** — 카드 스택, 계층 탐색, 미니멀한 정보 표시
이 앱들의 공통점: 콘텐츠가 주인공이고, 여백은 콘텐츠를 돋보이게 하는 도구이며, 사용자는 항상 뭔가를 할 수 있다.

---

## 4가지 디자인 원칙

### 1. Clarity (명확성) — "한 눈에 뭘 할 수 있는지 보인다"

**해결하는 피드백:** "감정이 한눈에 보였으면"

- 세로 리스트보다 **그리드 레이아웃**을 우선한다
  - 감정 선택: 세로 리스트 ❌ → 2×4 그리드 ⭕
  - 상황 카드: 1열 나열 ❌ → 2열 그리드 ⭕
  - 연령대 탭: 가로 스크롤 ❌ → 래핑 그리드 ⭕
- 시각적 위계 3단계를 엄수한다
  - Level 1: 히어로/제목 — 크고 Bold, Gowun Batang
  - Level 2: 섹션/카드 제목 — 중간, Noto Sans KR Bold
  - Level 3: 본문/설명 — 작고 Regular
- 아이콘 + 텍스트를 함께 쓴다 — 아이콘만 또는 텍스트만은 금지
- 색상으로 상태를 구분한다 — 같은 색으로 다른 의미를 쓰지 않는다
  - 긍정/정상: green 계열
  - 주의: amber 계열
  - 위험/긴급: red 계열
  - 행동 유도: 브랜드 peach

### 2. Deference (절제) — "콘텐츠가 주인공이다"

**해결하는 피드백:** "패딩이 너무 많음", "빈 화면 느낌"

- **여백은 콘텐츠보다 넓으면 안 된다**
  - 카드 패딩: 40px ❌ → **16~20px** ⭕
  - 카드 border-radius: 20px ❌ → **12~16px** ⭕
  - 섹션 간 간격: 60px ❌ → **32~40px** ⭕
- 장식 요소를 최소화한다
  - body::after grain 텍스처: 전면 제거 또는 opacity 극소화
  - 불필요한 그라데이션 배경: 단색으로 교체
  - 과도한 box-shadow: 1단계로 줄인다
- Apple Health 수준의 정보 밀도를 목표로 한다
  - 한 화면에 의미 있는 정보가 **3~5개** 보여야 한다
  - "스크롤해야 뭐가 나오는" 화면 금지
- 단, 위기 상황 페이지는 예외: 여백을 넉넉히, 선택지를 최소화

### 3. Depth (깊이) — "터치하면 반응하고, 탐색하면 더 나온다"

**해결하는 피드백:** "인터랙티브하지 않음", "해당사항 없으면 바로 나감"

- **모든 콘텐츠 페이지에 최소 1개 인터랙티브 요소 필수**
  - 읽기만 하는 페이지는 존재하면 안 된다
  - 가능한 인터랙션: 체크리스트, 감정 선택, 아코디언, 탭, 결과 분기
- **긍정-먼저 패턴** (가장 중요한 변화)
  - 기존: "이런 문제가 있으면 주의" → 해당 없으면 이탈
  - 변경: "이것들을 하고 있다면 잘하고 있는 거예요 ✅" → 체크 → 결과
    → "5/5 잘 자라고 있어요! 👏" or "이 부분만 살펴보면 좋겠어요"
  - 사용자가 **확인받는 경험**을 먼저 제공한다
- 모든 터치에 **100ms 이내** 시각적 반응
  - 버튼: 즉시 scale(0.97) + 색상 변화
  - 체크: 즉시 체크마크 + 배경색
  - 아코디언: 즉시 화살표 회전 시작
- 계층 구조로 탐색 깊이를 제공한다
  - 1층: 핵심 요약 (항상 보임)
  - 2층: 상세 카드 (아코디언 — 접힌 상태)
  - 3층: 전문가 정보 (링크 또는 추가 펼침)

### 4. Safety (안전) — BeInside 고유 원칙

이것은 Apple HIG가 아니라 **BeInside만의 원칙**이다. 유지한다.

- 위기 페이지: Deference 무시하고 여백 넉넉히. 글씨 크게. 선택지 최소화.
- 빠른 탈출 버튼: 가정폭력 페이지 우상단 고정
- "죽고 싶다" 경로: 오직 연결 수단만 (콘텐츠/통계/분석 없음)
- 청소년 페이지: localStorage 금지, 기록 안 남김
- references/crisis-ux.md에 상세 사양

---

## 타이포그래피 — Dynamic Type 지원

```css
:root {
  --text-scale: 0; /* 기본값. 사용자가 조절하면 1~3으로 변경 */
}

/* 본문 */
body {
  font-size: clamp(15px, calc(15px + var(--text-scale) * 2px), 21px);
  line-height: 1.75;
}

/* 긴급 페이지 본문 */
.crisis-page {
  font-size: clamp(17px, calc(17px + var(--text-scale) * 2px), 23px);
  line-height: 1.85;
}
```

글씨 크기 조절 UI (헤더 또는 설정):
```html
<div class="text-scale-control" role="group" aria-label="글씨 크기 조절">
  <button onclick="setTextScale(0)" aria-label="기본 크기">가</button>
  <button onclick="setTextScale(1)" aria-label="크게">가</button>
  <button onclick="setTextScale(2)" aria-label="아주 크게">가</button>
</div>
```

| 용도 | 기본 크기 | 폰트 | 굵기 |
|------|-----------|-------|------|
| 히어로 제목 | clamp(22px, 3vw, 32px) | Gowun Batang | 700 |
| 섹션 제목 | 18px | Gowun Batang | 700 |
| 카드 제목 | 15px | Noto Sans KR | 700 |
| **본문** | **15px** (Dynamic Type 적용) | Noto Sans KR | 400 |
| 보조 텍스트 | 13px | Noto Sans KR | 400 |
| 라벨/뱃지 | 11px | Noto Sans KR | 700 |
| **긴급 본문** | **17px** (Dynamic Type 적용) | Noto Sans KR | 400~700 |

---

## 레이아웃 시스템

### 그리드 (Clarity 원칙 적용)
- 감정 선택, 상황 카드: **2열 그리드** (모바일도 2열 유지, 카드 크기 줄임)
- 연령대·상황 탭: **래핑 flex** (줄바꿈 허용, 가로 스크롤 금지)
- 상세 콘텐츠: 1열 (아코디언)
- 최대 콘텐츠 너비: 880px

### 간격 (Deference 원칙 적용)
| 토큰 | 이전 | **변경** | 용도 |
|------|------|----------|------|
| --space-xs | 4px | 4px | 인라인 요소 |
| --space-sm | 8px | 8px | 같은 그룹 |
| --space-md | 22px | **16px** | 카드 내부 패딩 |
| --space-lg | 24px | **20px** | 섹션 내 블록 간격 |
| --space-xl | 48px | **32px** | 섹션 간 간격 |
| --space-2xl | 60px | **40px** | 대 섹션 간 간격 |

### 터치 타겟
- 모든 인터랙티브 요소: 최소 **44px × 44px** (Apple HIG 필수)
- 긴급 전화 버튼: 최소 **56px 높이**, 전체 너비
- 그리드 카드: 최소 **48px 높이**

---

## 컴포넌트 사양

### 카드 (Deference 적용)
```css
.card {
  border-radius: 14px;            /* 20px→14px 축소 */
  padding: 16px 18px;             /* 22px 24px→16px 18px 축소 */
  border: 1px solid rgba(224,123,90,.08);
  box-shadow: 0 1px 3px rgba(44,30,20,.04);  /* 그림자 1단계로 축소 */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-2px);    /* -4px→-2px 축소 (절제) */
  box-shadow: 0 4px 12px rgba(44,30,20,.08);
}
.card:active {
  transform: scale(0.98);
}
```

### 감정 선택 그리드 (Clarity + Depth 적용)
```css
.emotion-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);  /* 2열 고정 — 모바일도 */
  gap: 10px;
}
.emotion-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 12px;
  border-radius: 14px;
  border: 1.5px solid var(--line);
  background: var(--white);
  min-height: 48px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.emotion-btn:hover {
  border-color: var(--peach);
  background: var(--peach-p);
}
.emotion-btn:active {
  transform: scale(0.96);
}
.emotion-btn .em-icon { font-size: 24px; }
.emotion-btn .em-label { font-size: 13px; font-weight: 600; }
```

### 긍정 체크리스트 (Depth — 가장 중요한 신규 패턴)
```css
.positive-check {
  background: var(--white);
  border-radius: 14px;
  padding: 20px;
  border: 1px solid rgba(60,140,90,.12);
}
.positive-check-title {
  font-size: 15px; font-weight: 700;
  color: var(--ink); margin-bottom: 14px;
}
.pc-item {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 14px; border-radius: 10px;
  cursor: pointer; margin-bottom: 6px;
  transition: background 0.12s ease;
}
.pc-item:active { transform: scale(0.98); }
.pc-item.checked { background: rgba(60,140,90,.06); }
.pc-checkbox {
  width: 24px; height: 24px; border-radius: 50%;
  border: 2px solid rgba(60,140,90,.3);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: all 0.12s ease;
}
.pc-item.checked .pc-checkbox {
  background: #3A8A50; border-color: #3A8A50;
}
.pc-item.checked .pc-checkbox::after {
  content: "✓"; color: white; font-size: 13px; font-weight: 700;
}
.pc-result {
  margin-top: 16px; padding: 16px; border-radius: 12px;
  text-align: center; font-weight: 700;
  animation: fadeUp 0.25s ease;
}
.pc-result.great { background: rgba(60,140,90,.08); color: #2A5A30; }
.pc-result.good { background: rgba(200,150,50,.08); color: #7A5010; }
```

### 아코디언 (Depth 적용)
```css
.accordion-header {
  padding: 14px 16px;       /* 축소 */
  border-radius: 12px;      /* 축소 */
  font-size: 14px; font-weight: 700;
  /* aria-expanded, aria-controls 필수 */
}
.acc-arrow {
  transition: transform 0.2s ease;
}
[aria-expanded="true"] .acc-arrow {
  transform: rotate(90deg);
}
.accordion-body {
  max-height: 0; overflow: hidden; opacity: 0;
  transition: max-height 0.25s ease, opacity 0.15s ease;
}
.accordion-body.open {
  max-height: 2000px; opacity: 1; padding: 16px 18px;
}
```

### 상황 판단 툴 (Depth 적용)
```css
.check-item {
  padding: 12px 14px; border-radius: 10px;
  cursor: pointer; margin-bottom: 6px;
}
.check-item:active { transform: scale(0.98); }
.check-box {
  width: 22px; height: 22px; border-radius: 6px;
  border: 2px solid rgba(224,123,90,.25);
  transition: all 0.12s ease;
}
.check-item.checked .check-box {
  background: var(--peach-d); border-color: var(--peach-d);
}
/* 결과 분기 색상 */
.check-result.high { border-left: 3px solid #C05050; background: rgba(200,80,80,.06); }
.check-result.mid { border-left: 3px solid #C89040; background: rgba(200,150,50,.06); }
.check-result.low { border-left: 3px solid #3A8A50; background: rgba(60,140,90,.06); }
```

### 긴급 전화 버튼 (Safety 적용)
```html
<a href="tel:1393" class="emergency-btn" aria-label="1393 자살예방상담전화로 전화하기">
  <span class="em-icon">💜</span>
  <div>
    <span class="em-number">1393</span>
    <span class="em-name">자살예방상담전화</span>
    <span class="em-desc">상담사가 이야기 들어줘요. 무료, 24시간.</span>
  </div>
</a>
```
```css
.emergency-btn {
  display: flex; align-items: center; gap: 16px;
  width: 100%; padding: 18px 20px;
  min-height: 56px;
  border-radius: 14px; border: 1.5px solid rgba(224,123,90,.12);
  text-decoration: none; color: var(--ink);
}
.emergency-btn:active { transform: scale(0.98); }
.em-number { font-size: 22px; font-weight: 800; color: var(--peach-d); }
```

---

## 애니메이션 — Apple 스프링 시스템

Calm의 "호흡하는 모션"을 Apple의 자연스러운 스프링으로 교체한다.

| 대상 | 이전 (Calm) | **변경 (Apple Spring)** |
|------|-------------|------------------------|
| 카드 호버 | 0.28s cubic-bezier(.34,1.56,.64,1) | **0.2s ease** |
| 버튼 터치 | 0.22s cubic-bezier(.34,1.56,.64,1) | **0.12s ease** (더 빠르게) |
| 아코디언 | 0.3s ease | **0.25s ease** (더 빠르게) |
| 모달 진입 | 0.28s ease-out | **0.3s cubic-bezier(0.32, 0.72, 0, 1)** (Apple 스프링) |
| 페이지 진입 | 0.35s stagger 0.04s | **0.3s stagger 0.03s** (더 빠르게) |
| 체크 결과 | 0.3s ease | **0.2s ease** |

원칙: 모든 모션은 **이전보다 빠르게**. Calm은 "천천히, 호흡하듯"이었지만
Apple은 "즉각적이고 자연스럽게". 100ms 이내 반응 시작이 목표.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 색상 체계

기존 따뜻한 피치/살구 톤은 **BeInside 고유 정체성**이므로 유지한다.
Calm Cloud Burst 같은 외부 체계는 삭제한다.

```css
:root {
  /* ── 코어: 따뜻한 톤 (유지) ── */
  --cream: #FFF8F2;
  --warm: #FFF2E8;
  --white: #FFFCFA;
  --peach: #E07B5A;
  --peach-d: #B85030;
  --peach-p: #FEEDE6;
  --ink: #2C1E14;
  --ink-m: #6A4C3C;
  --ink-l: #B09080;
  --line: rgba(232,137,106,.12);

  /* ── 의미 색상 (Clarity 원칙) ── */
  --positive: #3A8A50;     /* 정상/긍정 — 체크 완료 */
  --caution: #C89040;      /* 주의 — 결과 mid */
  --danger: #C05050;       /* 위험 — 결과 high, 긴급 */
  --action: var(--peach-d); /* 행동 유도 — CTA */

  /* ── 영역 색상 ── */
  --area-self: #F5F3F8;    /* "나 자신" 영역 배경 */
  --lavender: #8A6AB8;
  --dad: #4A7AAA;
  --youth-bg: #1A1A2E;
  --youth-primary: #7B68EE;

  /* ── Dynamic Type ── */
  --text-scale: 0;
}
```

---

## 접근성 (WCAG AA)

| 규칙 | 구현 |
|------|------|
| aria-label | 모든 버튼·링크 |
| aria-expanded + aria-controls | 아코디언 |
| role="group" + aria-label | 체크리스트 그룹 |
| 색상 대비 4.5:1 | 본문. 대형 텍스트 3:1 |
| 키보드 | Tab 이동, Enter/Space 토글, Escape 닫기 |
| 포커스 스타일 | `outline: 2px solid var(--peach); outline-offset: 2px;` — outline:none 절대 금지 |
| prefers-reduced-motion | 모든 애니메이션 0ms |
| 시맨틱 HTML | nav, main, section, button 우선 |
| tel: 링크 | 모든 전화번호 |
| Dynamic Type | CSS clamp + --text-scale 변수 |

---

## Gotchas — Claude가 반복하는 12가지 실수

1. **하드코딩 색상** — `#E07B5A` 직접 사용 금지. `var(--peach)`만.
2. **본문 13px 유지** — 15px로 올렸다. 절대 되돌리지 마라.
3. **세로 리스트** — 감정 선택, 상황 카드 등은 그리드로. 리스트 금지.
4. **과도한 여백** — 카드 패딩 20px 초과 금지. 콘텐츠가 주인공.
5. **grain 텍스처** — body::after grain 전면 제거 또는 opacity 0.005 이하.
6. **인터랙션 없는 페이지** — 모든 페이지에 최소 1개 인터랙티브 요소.
7. **문제점만 나열** — 긍정 체크("잘하고 있어요")를 먼저. 주의사항은 뒤에.
8. **아코디언 aria 누락** — aria-expanded + aria-controls 반드시.
9. **느린 애니메이션** — Calm의 0.3s 이상 모션은 Apple 기준으로 줄일 것.
10. **outline:none** — 접근성 위반. 커스텀 포커스 스타일로 대체.
11. **전화번호 텍스트만** — 반드시 `<a href="tel:XXX">` 사용.
12. **모바일 44px 미만** — padding으로 터치 영역 확보.

---

## 관련 리소스
- 콘텐츠 톤 → `beinside-writing` 스킬
- 안전 콘텐츠 → `beinside-safety` 스킬
- 코드 품질 → `beinside-engineering` 스킬
- UI 구현 위임 → `hig-builder` 에이전트
- UI 검수 위임 → `hig-auditor` 에이전트
