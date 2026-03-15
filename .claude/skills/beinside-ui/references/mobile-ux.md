# BeInside 모바일 UX 가이드

BeInside 사용자의 90~100%가 스마트폰으로 접속합니다. 모바일이 기본이고, 데스크톱은 보조입니다.

---

## 브레이크포인트 시스템

### 900px — 태블릿 전환점

| 항목 | 변경 내용 |
|------|-----------|
| 그리드 | 2열 → 1열 |
| 패딩 | 48px → 28px |
| 타임라인 | `--tl-w: 160px` (축소) |
| 사이드바 | 숨김 (이미 제거됨) |

### 640px — 모바일 전환점 (핵심)

| 항목 | 변경 내용 |
|------|-----------|
| 그리드 | 강제 1열 |
| 패딩 | 18px |
| 타임라인 | `--tl-w: 0px` (완전 숨김) |
| 하단 탭바 | 표시 (`.mobile-tabbar` 활성화) |
| body padding-bottom | 탭바 높이 + safe-area-inset-bottom만큼 보정 |
| `body::after` grain 텍스처 | 비활성화 (성능) |
| 폰트 크기 | 유지 (줄이지 않음) |

---

## 하단 탭바 (.mobile-tabbar)

```css
.mobile-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 100;
}
body {
  padding-bottom: calc(60px + env(safe-area-inset-bottom));
}
```

- 탭 아이콘 최소 44px × 44px 터치 영역
- 활성 탭: 브랜드 색상 강조 + 하단 보더 또는 배경

---

## Safe Area 대응

iPhone 노치·홈 인디케이터 영역 대응:

```css
/* iOS safe-area */
padding-bottom: env(safe-area-inset-bottom);
padding-top: env(safe-area-inset-top);
```

- 모달, 플로팅 버튼, 하단 탭바에 모두 적용

---

## 터치 최적화

- **터치 타겟 최소 44px × 44px** — 작은 버튼도 padding으로 영역 확보
- `cursor: pointer` — 모든 클릭 가능 요소에
- `touch-action: manipulation` — 더블탭 줌 방지 (필요 시)
- 스와이프/풀다운 등 네이티브 제스처 방해 금지 (`overflow: hidden` 남용 주의)

---

## 전화 링크

모든 전화번호는 tel: 링크 필수:

```html
<a href="tel:1393">1393</a>
<a href="tel:1388">1388</a>
<a href="tel:112">112</a>
```

---

## 스크롤 이벤트 최적화

```js
// passive: true 필수
window.addEventListener('scroll', handleScroll, { passive: true });

// IntersectionObserver 우선 사용
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { /* 카드 reveal */ }
  });
}, { threshold: 0.1 });
```

---

## 초기 로딩 3스크롤 원칙

모바일 기준 초기 로딩 시 3스크롤 이내에 핵심 정보가 완료되어야 합니다.

- 1스크롤: 히어로 + 핵심 3줄 요약 + "이것만은 꼭" 경고
- 2스크롤: 주요 카드 (접힌 상태)
- 3스크롤: 긴급 연락처 또는 추가 행동 유도

상세 카드는 아코디언/탭으로 접힌 상태에서 시작합니다.
