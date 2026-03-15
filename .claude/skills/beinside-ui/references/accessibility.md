# BeInside 접근성 가이드 (WCAG 2.1 AA)

BeInside 사용자 중 일부는 스크린 리더를 사용하거나 키보드만으로 탐색합니다.
접근성은 기능 요구사항입니다 — 나중에 추가하는 것이 아닙니다.

---

## 색상 대비

| 용도 | 최소 대비율 | 목표 |
|------|------------|------|
| 본문 텍스트 (13~14px) | 4.5:1 | 7:1 |
| 큰 텍스트 (18px+ 또는 14px bold) | 3:1 | 4.5:1 |
| UI 컴포넌트 (버튼 보더 등) | 3:1 | — |

검사 도구: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

`--ink (#2C1E14)` on `--cream (#FFF8F2)` → 약 14:1 ✅

---

## 시맨틱 HTML

```html
<!-- ✅ 올바른 예 -->
<main>
  <section aria-labelledby="section-title">
    <h2 id="section-title">발달 가이드</h2>
    <article>...</article>
  </section>
</main>
<nav aria-label="주요 내비게이션">...</nav>

<!-- ❌ 나쁜 예 -->
<div class="main">
  <div class="section">
    <div class="title">발달 가이드</div>
  </div>
</div>
```

---

## 버튼 접근성

모든 버튼에 `aria-label` 필수 (아이콘 전용 버튼의 경우 특히):

```html
<!-- ✅ 올바른 예 -->
<button aria-label="메모 삭제">🗑️</button>
<button aria-label="아코디언 펼치기" aria-expanded="false" aria-controls="content-1">
  발달 단계 상세 보기 ▼
</button>

<!-- ❌ 나쁜 예 -->
<button>🗑️</button>
<div onclick="toggle()">발달 단계 상세 보기 ▼</div>
```

---

## 아코디언 ARIA

```html
<button
  aria-expanded="false"
  aria-controls="accordion-panel-1"
  id="accordion-header-1"
>
  상세 정보 ▼
</button>
<div
  id="accordion-panel-1"
  role="region"
  aria-labelledby="accordion-header-1"
  hidden
>
  ...콘텐츠...
</div>
```

```js
button.addEventListener('click', () => {
  const expanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', !expanded);
  panel.hidden = expanded;
});
```

---

## 모달 접근성

```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">프로필 추가</h2>
  <button aria-label="모달 닫기">✕</button>
  ...
</div>
```

```js
// 모달 열릴 때 포커스 이동
modal.querySelector('button, input, [tabindex]').focus();

// 모달 닫힐 때 원래 트리거 버튼으로 포커스 복귀
triggerButton.focus();

// 포커스 트랩 (Tab 키가 모달 밖으로 나가지 않도록)
modal.addEventListener('keydown', trapFocus);
```

---

## 키보드 내비게이션

| 키 | 동작 |
|----|------|
| `Tab` | 다음 포커스 가능 요소로 이동 |
| `Shift + Tab` | 이전 포커스 가능 요소로 이동 |
| `Enter` | 버튼 활성화, 링크 따라가기 |
| `Space` | 버튼 활성화, 체크박스 토글 |
| `Escape` | 모달 닫기, 드로어 닫기 |
| `Arrow keys` | 탭 내 이동 (role="tablist"에서) |

```css
/* 포커스 링 숨기지 말 것 */
:focus-visible {
  outline: 2px solid var(--peach);
  outline-offset: 2px;
}
/* 마우스 사용 시에만 아웃라인 숨기기 */
:focus:not(:focus-visible) {
  outline: none;
}
```

---

## 이미지 접근성

```html
<!-- 의미 있는 이미지 -->
<img src="baby.jpg" alt="생후 3개월 아기가 웃고 있는 모습">

<!-- 장식적 이미지 (스크린 리더 무시) -->
<img src="decoration.svg" alt="" aria-hidden="true">

<!-- 이모지 -->
<span aria-label="성장" role="img">🌱</span>
```

---

## 스크린 리더 전용 텍스트

```css
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
```

```html
<button>
  <span aria-hidden="true">🗑️</span>
  <span class="sr-only">메모 삭제</span>
</button>
```

---

## 접근성 체크리스트

작업 완료 후 확인:

- [ ] 모든 버튼에 텍스트 또는 `aria-label`이 있는가
- [ ] 아코디언에 `aria-expanded`, `aria-controls`가 있는가
- [ ] 모달에 `role="dialog"`, `aria-modal="true"`, `aria-labelledby`가 있는가
- [ ] 색상 대비가 WCAG AA 이상인가 (4.5:1)
- [ ] 키보드만으로 모든 기능을 사용할 수 있는가
- [ ] 포커스 링이 보이는가 (`:focus-visible`)
- [ ] 이미지에 `alt` 속성이 있는가
- [ ] 장식적 요소에 `aria-hidden="true"`가 있는가
- [ ] `prefers-reduced-motion` 대응이 되어 있는가
