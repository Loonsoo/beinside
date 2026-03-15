# BeInside 애니메이션 & 마이크로 인터랙션 가이드

애니메이션은 "살아있는 느낌"을 주되, 사용자를 산만하게 하지 않아야 합니다.
모든 애니메이션은 `transform`과 `opacity`만 사용합니다 (layout trigger 금지).

---

## 성능 원칙

- ✅ 애니메이트 가능: `transform`, `opacity`
- ❌ 금지: `width`, `height`, `top`, `left`, `margin`, `padding` 직접 변경
- `will-change`는 필요한 요소에만 (남용 시 메모리 증가)
- `prefers-reduced-motion` 대응 필수

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 1. 페이지 진입 — 카드 Staggered Reveal

```css
.card {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.card.visible {
  opacity: 1;
  transform: translateY(0);
}
```

```js
// IntersectionObserver로 구현
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 40); // 0.04s 간격
    }
  });
}, { threshold: 0.1 });
cards.forEach(card => observer.observe(card));
```

**근거**: 40ms(0.04s) 간격은 "자연스러운 흐름"을 만들면서도 너무 느리지 않은 최적값.

---

## 2. 스크롤 프로그레스 바

```css
#scroll-bar {
  position: fixed; top: 0; left: 0;
  height: 3px; width: 0%;
  background: linear-gradient(90deg, var(--peach) 0%, var(--amber) 100%);
  z-index: 9999;
  transition: width 0.08s linear;
  border-radius: 0 2px 2px 0;
}
```

```js
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scroll-bar').style.width = scrolled + '%';
}, { passive: true });
```

---

## 3. 카드 호버

```css
.card {
  transition: transform 0.28s cubic-bezier(.34,1.56,.64,1),
              box-shadow 0.28s cubic-bezier(.34,1.56,.64,1);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,.10);
}
```

**근거**: `cubic-bezier(.34,1.56,.64,1)` — 약간의 오버슈트로 "탱탱한" 느낌. 딱딱한 `ease`보다 생동감 있음.

---

## 4. 버튼 호버

```css
.gobtn, button {
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}
.gobtn:hover, button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,.12);
}
```

**근거**: 버튼은 카드보다 빠른 0.22s — 반응성 있는 느낌.

---

## 5. 아코디언 펼침

```css
.accordion-content {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.3s ease, opacity 0.2s ease;
}
.accordion-content.open {
  max-height: 1000px; /* 충분히 큰 값 */
  opacity: 1;
}
.accordion-arrow {
  transition: transform 0.25s ease;
}
.accordion-item.open .accordion-arrow {
  transform: rotate(180deg);
}
```

**주의**: `max-height` transition은 실제 높이가 아닌 큰 값을 사용하므로 easing이 부정확할 수 있음. 정확한 높이가 필요하면 JS로 `scrollHeight` 사용.

---

## 6. 모달 진입/퇴장

```css
/* 배경 */
.modal-overlay {
  opacity: 0;
  transition: opacity 0.2s ease;
}
.modal-overlay.open {
  opacity: 1;
}

/* 모달 본체 */
.modal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.28s cubic-bezier(.34,1.2,.64,1),
              transform 0.28s cubic-bezier(.34,1.2,.64,1);
}
.modal-overlay.open .modal {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 7. 탭 전환

```css
.tab-indicator {
  position: absolute; bottom: 0;
  height: 2px;
  background: var(--peach);
  transition: left 0.25s ease, width 0.25s ease;
}
```

---

## 8. 로딩 스켈레톤 UI

```css
@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

.skeleton {
  background: linear-gradient(90deg,
    #f0ebe6 25%, #ede8e2 50%, #f0ebe6 75%
  );
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}
```

---

## 9. 플로팅 버튼 호버

```css
.fab {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.fab:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0,0,0,.20);
}
```
