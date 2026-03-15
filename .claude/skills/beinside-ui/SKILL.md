---
name: beinside-ui
description: >
  BeInside 웹서비스의 UI를 설계·구현·수정하는 스킬. 카드, 버튼, 모달, 아코디언, 그리드, 탭, 플로팅 버튼, 히어로, 내비게이션, 하단 탭바 등 모든 UI 컴포넌트를 만들거나 수정할 때 반드시 사용하세요. "디자인", "레이아웃", "스타일", "반응형", "애니메이션", "모바일", "버튼", "카드", "모달", "접근성", "UX" 등의 키워드에 반응합니다. 새 페이지를 만들거나 기존 페이지의 구조를 바꿀 때도 이 스킬을 사용하세요.
---

# BeInside UI & UX 디자인 스킬

## 작업 전 필수 확인

| 문서 | 읽어야 하는 상황 |
|------|-----------------|
| `references/design-system.md` | **모든 UI 작업 시 (항상)** — CSS 변수 확인 |
| `references/component-catalog.md` | 기존 컴포넌트를 재사용하거나 수정할 때 |
| `references/mobile-ux.md` | 모바일 레이아웃·브레이크포인트 작업 시 |
| `references/animation-guide.md` | 애니메이션·인터랙션 추가 시 |
| `references/accessibility.md` | ARIA, 키보드 내비게이션, 스크린 리더 대응 시 |

안전 관련 UI(빠른 탈출 버튼, 긴급 전화 버튼)는 **beinside-safety 스킬**도 함께 사용하세요.

---

## 디자인 철학

**"따뜻하지만 가볍지 않은, 전문적이지만 차갑지 않은"**

- 사용자는 심리적으로 취약한 상태일 수 있습니다. 화면이 무겁거나 위압적이어선 안 됩니다.
- 화면은 "정보를 쏟아붓는" 것이 아니라 **"조용히 옆에 앉아 필요한 것을 건네는"** 느낌이어야 합니다.
- 기본 톤: 피치/살구 톤 (`--peach`, `--cream`, `--warm`)
- 청소년 전용 페이지만 쿨톤 예외: 네이비/딥퍼플 계열

---

## 디자인 시스템

작업 전 반드시 `references/design-system.md`를 읽으세요.

- CSS 변수를 **반드시** 사용합니다. 색상값 하드코딩 금지.
- 새 색상이 필요하면 기존 변수 체계와 조화롭게 추가하고, `design-system.md`에도 문서화합니다.
- 색상 참조 예: `color: var(--peach)` ✅ / `color: #E07B5A` ❌

---

## 타이포그래피 규칙

| 용도 | 폰트 | 굵기 | 크기 |
|------|------|------|------|
| 본문 | 'Noto Sans KR' | 300~700 | 13~14px |
| 감성·인용 | 'Gowun Batang' | 400/700 | 자유 |
| h3 제목 | 'Noto Sans KR' | 700 | 14.5px |
| 카드 소제목 | 'Noto Sans KR' | 700 | 12px |
| 일반 본문 | 'Noto Sans KR' | 400 | 13px |

- 줄간격: 1.7 이상 (베이스: `line-height: 1.72`)
- 한글: `word-break: keep-all` 필수

---

## 컴포넌트 설계 원칙

### 카드
```css
border-radius: 18px;
box-shadow: 0 2px 12px rgba(0,0,0,.06);
transition: transform 0.28s cubic-bezier(.34,1.56,.64,1),
            box-shadow 0.28s;
/* hover */
transform: translateY(-4px);
box-shadow: 0 8px 24px rgba(0,0,0,.10);
```

### 버튼
```css
min-height: 44px;
border-radius: 12px;
transition: transform 0.22s, box-shadow 0.22s;
/* hover */
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(0,0,0,.12);
```

### 아코디언
- 제목 클릭 시 `max-height` transition `0.3s ease` + `opacity 0.2s`
- 화살표 `▼` → 펼침 시 180° 회전 (`transform: rotate(180deg)`)
- `aria-expanded`, `aria-controls` 속성 필수

### 모달
```css
backdrop-filter: blur(8px);
animation: 0.28s cubic-bezier(.34,1.2,.64,1);
/* 진입: opacity 0→1 + translateY(20px→0) */
```

### 입력 필드
```css
/* focus */
border-color: var(--peach);
box-shadow: 0 0 0 3px var(--peach-glow);
```

### 태그·뱃지
```css
font-size: 10~11px;
border-radius: 20px;
background: [해당 색상 10% 투명도];
```

### 플로팅 버튼
```css
position: fixed; bottom: 80px; right: 16px;
box-shadow: 0 4px 16px rgba(0,0,0,.18);
/* hover */ transform: scale(1.05);
```

---

## 레이아웃 규칙

| 항목 | 값 |
|------|-----|
| 기본 그리드 | 데스크톱 2열 |
| 태블릿 전환점 | 900px → 1열 |
| 최대 콘텐츠 너비 | 880px (양쪽 padding 48px 포함) |
| 카드 간격 | 14px (`gap: 14px`) |
| 섹션 간격 | `padding-bottom: 60px` |
| 사이드바 | 없음. `main-col`이 전체 너비 사용. |
| 헤더 높이 | 64px 고정 (스크롤 시 축소 없음) |

---

## 모바일 우선 UX

`references/mobile-ux.md` 참조.

- 640px 이하: 그리드 1열, 패딩 18px, 폰트 크기 유지(줄이지 않기)
- 터치 타겟 최소 44px × 44px
- 초기 로딩: 3스크롤 이내 핵심 정보 완료
- 하단 탭바: 높이 60px + `safe-area-inset-bottom` + `body padding-bottom` 보정
- 전화번호: `<a href="tel:1393">` 형태 필수
- 스와이프·풀다운 등 네이티브 제스처 방해 금지

---

## 마이크로 인터랙션 & 애니메이션

`references/animation-guide.md` 참조.

| 항목 | 스펙 |
|------|------|
| 페이지 진입 카드 | staggered reveal, 0.04s 간격, `translateY(16px→0)` |
| 스크롤 프로그레스 바 | 상단 3px, 브랜드 그라데이션 |
| 카드 호버 | `translateY(-4px)`, `0.28s cubic-bezier(.34,1.56,.64,1)` |
| 버튼 호버 | `translateY(-2px)`, `0.22s` |
| 모달 진입 | `opacity + translateY(20px→0)`, `0.28s cubic-bezier(.34,1.2,.64,1)` |
| 탭 전환 | 활성 탭 하단 보더 슬라이드 (width transition) |
| 로딩 상태 | 스켈레톤 UI (gradient shimmer) |

**성능 주의**
- `transform`과 `opacity`만 애니메이트 (layout 속성 trigger 금지)
- `will-change` 남용 금지 (필요한 경우만)
- `prefers-reduced-motion` 미디어 쿼리 대응 필수

---

## 접근성

`references/accessibility.md` 참조.

- 모든 버튼: `aria-label` 필수
- 아코디언: `aria-expanded`, `aria-controls` 필수
- 색상 대비: WCAG AA 이상 (본문 텍스트 4.5:1 이상)
- 키보드: 탭 이동, Enter/Space 활성화
- 시맨틱 HTML 우선 (의미 없는 `div` 남용 금지)
- 이미지: `alt` 속성 필수, 장식적 이미지 `aria-hidden="true"`

---

## 특수 UI 패턴

### 빠른 탈출 버튼 (가정폭력 페이지 전용)
```html
<button onclick="quickExit()" aria-label="페이지 나가기" class="quick-exit-btn">✕</button>
```
```js
function quickExit() {
  history.replaceState(null, '', 'https://www.naver.com');
  location.href = 'https://www.naver.com';
}
```
- 위치: 우상단 고정, `z-index: 9999`
- 크기: 최소 44px × 44px
- 라벨: "✕" 또는 "나가기" (가해자가 봐도 모호하게)

### 긴급 전화 버튼
```html
<a href="tel:1393" class="emergency-call-btn">📞 1393 자살예방상담전화</a>
```
- 전체 너비, 큰 터치 영역
- 붉은 톤 배경

### 증상 체크리스트 UI
- 예/아니오 버튼 2개 → JS로 조건부 결과 표시
- 결과: "즉시 병원" 또는 "경과 관찰"

### 청소년 전용 페이지
- 쿨톤 색감 (네이비/딥퍼플)
- 말풍선 느낌의 카드 디자인

---

## 성능 규칙

- CSS critical/non-critical 분리 고려
- 이미지: `lazy loading` + `width`/`height` 명시 필수
- `body::after` grain 텍스처: 640px 이하에서 비활성화
- 스크롤 이벤트: `{ passive: true }` 필수
- `IntersectionObserver` 활용 가능하면 scroll 이벤트 대체
