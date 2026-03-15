# BeInside 안전 UI 패턴

안전 콘텐츠 페이지에서 반복적으로 사용하는 UI 패턴 모음입니다.
beinside-ui 스킬의 일반 컴포넌트 원칙도 함께 준수하세요.

---

## 패턴 1: 빠른 탈출 버튼

가정폭력 관련 모든 페이지에 배치합니다.

```html
<button
  class="quick-exit-btn"
  onclick="quickExit()"
  aria-label="페이지 나가기"
  title="빠르게 나가기"
>✕</button>
```

```css
.quick-exit-btn {
  position: fixed;
  top: 12px; right: 12px;
  z-index: 9999;
  min-width: 44px; min-height: 44px;
  border-radius: 50%;
  background: rgba(30, 20, 10, .75);
  color: white;
  font-size: 20px;
  border: none;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(4px);
  transition: background 0.2s;
}
.quick-exit-btn:hover {
  background: rgba(30, 20, 10, .9);
}
```

```js
function quickExit() {
  history.replaceState(null, '', 'https://www.naver.com');
  location.href = 'https://www.naver.com';
}
```

---

## 패턴 2: 긴급 전화 버튼

전체 너비, 큰 터치 영역. 붉은 톤 배경.

```html
<a href="tel:1393" class="emergency-call-btn" aria-label="1393 자살예방상담전화 전화하기">
  📞 1393 · 자살예방상담전화 · 무료 · 24시간
</a>
```

```css
.emergency-call-btn {
  display: block;
  width: 100%;
  min-height: 56px;
  padding: 14px 20px;
  background: #B83030;
  color: white;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  border-radius: 14px;
  transition: background 0.2s, transform 0.2s;
}
.emergency-call-btn:hover {
  background: #952020;
  transform: translateY(-2px);
}
```

---

## 패턴 3: 위기 상담 알림 바 (콘텐츠 최상단)

```html
<div class="crisis-banner" role="alert" aria-live="polite">
  <span>지금 많이 힘드시다면</span>
  <a href="tel:1393">📞 1393</a>
  <span>으로 전화하면 24시간 도움받을 수 있어요.</span>
</div>
```

```css
.crisis-banner {
  background: #FFF0E8;
  border-left: 4px solid #E07B5A;
  padding: 14px 18px;
  border-radius: 0 12px 12px 0;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 1.6;
}
.crisis-banner a {
  color: #B85030;
  font-weight: 700;
  text-decoration: none;
}
```

---

## 패턴 4: 안전 체크리스트

```html
<div class="safety-checklist">
  <h3>지금 당장 할 수 있는 것</h3>
  <ul>
    <li>
      <label>
        <input type="checkbox">
        <span>신뢰할 수 있는 사람에게 연락하기</span>
      </label>
    </li>
    <li>
      <label>
        <input type="checkbox">
        <span>안전한 장소로 이동하기</span>
      </label>
    </li>
    <li>
      <label>
        <input type="checkbox">
        <span>1366 또는 112에 전화하기</span>
      </label>
    </li>
  </ul>
</div>
```

---

## 패턴 5: 증상 체크리스트 (예/아니오)

```html
<div class="symptom-checker">
  <p class="question">다음 중 해당하는 것이 있나요?</p>
  <ul class="symptom-list">
    <li>2주 이상 지속되는 깊은 슬픔</li>
    <li>잠을 자지 못하거나 너무 많이 잠</li>
  </ul>
  <div class="checker-buttons">
    <button onclick="showResult('yes')" class="checker-yes">해당해요</button>
    <button onclick="showResult('no')" class="checker-no">해당 없어요</button>
  </div>
  <div id="result-yes" class="checker-result" hidden>
    <p>⚠️ 전문가 상담을 받아보시는 것이 도움이 될 수 있어요.</p>
    <a href="tel:1393">📞 1393 상담 전화</a>
  </div>
  <div id="result-no" class="checker-result" hidden>
    <p>✅ 지금은 괜찮아 보여요. 변화가 생기면 다시 확인해 보세요.</p>
  </div>
</div>
```
