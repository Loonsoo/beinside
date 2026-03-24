---
name: beinside-a11y
description: >
  BeInside의 웹 접근성을 감사·교정하는 스킬. WCAG 2.1 AA 기준,
  ARIA 속성, 키보드 내비게이션, 색상 대비, 스크린리더 호환성.
  위기 사용자의 인지 저하 상태를 전제로 한 접근성 강화.
  "접근성", "a11y", "스크린리더", "ARIA", "키보드", "색맹",
  "대비", "포커스", "WCAG", "장애", "aria-label" 키워드에 반응.
---

# BeInside 접근성 시스템

## 왜 접근성이 안전 문제인가

BeInside 사용자는 심리적으로 취약한 상태에 있다.
위기 상황의 사용자는 인지 능력이 저하된 상태일 수 있다.
접근성은 "nice-to-have"가 아니라 **사용자 안전의 일부**이다.

## 기준

- **WCAG 2.1 AA** (최소 기준)
- **KWCAG 2.2** (한국 웹 접근성 인증 기준)
- **장애인차별금지법 제21조** (정보통신 접근성 보장 의무)

## beinside-designing과의 역할 분담

- designing = "만들 때 접근성을 고려"
- a11y = "만든 후 접근성을 감사하고 체계적으로 교정"

## 핵심 영역

### 1. 색상 대비
- 일반 텍스트: 최소 4.5:1 (AA)
- 대형 텍스트 (18px 이상): 최소 3:1
- 피치/살구 톤 팔레트 → 밝은 배경에 연한 텍스트 주의
- 위기 페이지: 흰 배경 + 검은 텍스트 (최대 대비)
- 다크모드에서도 대비 기준 충족 확인

### 2. ARIA 속성
```html
<!-- 아코디언 -->
<button aria-expanded="false" aria-controls="content-1">제목</button>
<div id="content-1" role="region" aria-hidden="true">내용</div>

<!-- 모달 -->
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">제목</h2>
</div>

<!-- 탐색 -->
<nav aria-label="메인 메뉴">
<main role="main">
<footer role="contentinfo">

<!-- 위기 전화 -->
<a href="tel:109" aria-label="자살예방상담전화 109번으로 전화하기">109</a>

<!-- 빠른 탈출 -->
<button aria-label="이 페이지를 빠르게 나가기">✕</button>

<!-- 라이브 영역 (동적 콘텐츠 변경 알림) -->
<div aria-live="polite" aria-atomic="true">결과 내용</div>
```

### 3. 키보드 내비게이션
- 모든 인터랙티브 요소: Tab으로 접근 가능
- 포커스 표시: `outline` 절대 제거 금지 (`outline: none` 사용 금지)
- 포커스 순서: 시각적 순서와 일치
- 모달: 포커스 트랩 (모달 내부에서만 Tab 순환)
- ESC: 모달/오버레이 닫기
- Enter/Space: 버튼·링크 활성화

### 4. 스크린리더 호환
- 이미지: `alt` 텍스트 필수 (장식 이미지는 `alt=""`)
- 아이콘: 의미 있는 아이콘은 `aria-label` 또는 숨긴 텍스트
- 이모지: `role="img" aria-label="설명"` 또는 장식용이면 `aria-hidden="true"`
- 헤딩 구조: h1 → h2 → h3 순서 (건너뛰기 금지)
- 언어: `<html lang="ko">`, 다국어 콘텐츠는 `lang` 속성 전환

### 5. 애니메이션
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 6. 터치/포인터
- 터치 타겟: 최소 44px × 44px
- 요소 간 간격: 최소 8px
- 드래그 전용 기능 금지 (대안 제공)

## 위기 페이지 전용 접근성

위기 상황 페이지는 강화된 접근성 기준 적용:
- 폰트 크기: 기본보다 크게 (최소 18px)
- 줄간격: 1.8 이상
- 색상: 고대비 (흰색 배경, 검은 텍스트)
- 구조: 최소 요소만 (전화번호 + 공감 2줄)
- 전화 버튼: 매우 크게, 명확한 라벨

## 접근성 감사 체크리스트

```
□ Lighthouse 접근성 점수 90+
□ 모든 img에 alt 속성
□ 모든 인터랙티브 요소 키보드 접근 가능
□ 색상 대비 4.5:1 이상
□ 아코디언에 aria-expanded, aria-controls
□ 모달에 role="dialog", aria-modal, 포커스 트랩
□ 헤딩 위계 순서 준수
□ tel: 링크에 aria-label
□ prefers-reduced-motion 대응
□ 포커스 표시(outline) 존재
□ 페이지 전환 시 포커스 관리
□ lang 속성 올바름
```
