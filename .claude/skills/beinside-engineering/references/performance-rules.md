# BeInside 성능 규칙

## 스크롤 이벤트
- 모든 scroll 이벤트 리스너에 `{ passive: true }` 옵션 필수
- 스크롤 핸들러 내 DOM 조작 최소화
- requestAnimationFrame으로 스크롤 핸들러 디바운스 권장

```js
// Good
window.addEventListener('scroll', handler, { passive: true });

// Bad
window.addEventListener('scroll', handler);
```

## DOM 조작
- innerHTML로 한 번에 세팅 (반복 appendChild 지양)
- DocumentFragment 사용도 가능하지만 innerHTML이 현재 코드베이스 관행

```js
// Good
container.innerHTML = items.map(i => `<div>${i.text}</div>`).join('');

// Bad
items.forEach(i => {
  const div = document.createElement('div');
  div.textContent = i.text;
  container.appendChild(div);
});
```

## localStorage
- 키 접두사: `beinside_` 필수
- 보존 기간: 메모 90일, 무드 90일, 저널 90일
- 프로필 데이터는 영구 보존
- 용량 초과 방지: try-catch로 감싸기
- 청소년 페이지(teen)에서는 localStorage 사용 금지

## 이미지
- `loading="lazy"` 속성 필수
- `width`와 `height` 속성 명시 (CLS 방지)
- 가능하면 WebP 형식 사용

```html
<!-- Good -->
<img src="photo.webp" width="300" height="200" loading="lazy" alt="설명">

<!-- Bad -->
<img src="photo.png" alt="설명">
```

## 애니메이션
- GPU 합성 속성 우선 사용: `transform`, `opacity`
- `top`, `left`, `width`, `height` 애니메이션 지양
- `will-change`는 꼭 필요한 경우에만 사용

```css
/* Good */
.card { transition: transform 0.3s, opacity 0.3s; }

/* Bad */
.card { transition: margin-top 0.3s, height 0.3s; }
```

## body::after 그레인 텍스처
- 640px 이하에서 `display: none` 처리 (모바일 성능)

```css
@media (max-width: 640px) {
  body::after { display: none; }
}
```

## 폰트 로딩
- Google Fonts에 `display=swap` 이미 적용됨
- 추가 폰트 로드 시에도 `display=swap` 필수

## 기타
- 불필요한 리플로우 유발 방지: offsetHeight, getBoundingClientRect 등 연속 호출 지양
- 이벤트 위임(event delegation) 가능한 곳에서 활용
- 큰 데이터 객체는 필요한 시점에만 접근 (lazy evaluation)
