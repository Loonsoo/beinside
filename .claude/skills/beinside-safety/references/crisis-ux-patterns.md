# 위기 상황 UX 패턴

이 문서는 생명·안전과 직결되는 페이지의 UI/UX 구현 패턴을 정의한다.
모든 패턴은 사용자 안전을 최우선으로 설계되었다.

---

## 1. 빠른 탈출 버튼 (Quick Exit Button)

가정폭력 관련 모든 페이지에 필수 적용.
가해자가 화면을 볼 수 있는 상황을 전제로 설계한다.

### HTML

```html
<button id="quick-exit" class="quick-exit-btn" aria-label="페이지 나가기">
  나가기
</button>
```

### CSS

```css
.quick-exit-btn {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 99999;
  min-width: 44px;
  min-height: 44px;
  padding: 8px 16px;
  background: var(--color-gray-700, #374151);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.quick-exit-btn:hover,
.quick-exit-btn:focus-visible {
  background: var(--color-gray-900, #111827);
  outline: 2px solid #fff;
  outline-offset: 2px;
}

/* 모바일에서 더 크게 */
@media (max-width: 480px) {
  .quick-exit-btn {
    min-width: 52px;
    min-height: 52px;
    padding: 10px 20px;
    font-size: 15px;
  }
}
```

### JavaScript

```javascript
(function () {
  var exitBtn = document.getElementById('quick-exit');
  if (!exitBtn) return;

  exitBtn.addEventListener('click', function () {
    // 현재 페이지 기록을 네이버로 대체 (뒤로가기 시 이 페이지가 안 보이게)
    history.replaceState(null, '', 'https://www.naver.com');
    // 네이버로 즉시 이동
    window.location.replace('https://www.naver.com');
  });

  // Esc 키로도 탈출 가능
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      history.replaceState(null, '', 'https://www.naver.com');
      window.location.replace('https://www.naver.com');
    }
  });
})();
```

### 구현 시 주의사항
- `window.location.replace()`를 사용해야 한다. `location.href =`는 기록이 남는다.
- `history.replaceState()`를 먼저 호출하여 현재 항목을 덮어쓴다.
- 라벨은 "나가기" 또는 "✕"처럼 모호하게. "도움 탈출" 같은 표현은 가해자에게 노출될 수 있다.
- 버튼이 다른 요소에 가려지면 안 된다. `z-index: 99999` 필수.
- 스크롤과 무관하게 항상 보여야 한다. `position: fixed` 필수.

---

## 2. 긴급 전화 버튼

위기 상황 페이지에서 전화 연결은 가장 중요한 행동 유도 요소다.

### HTML

```html
<a href="tel:109" class="crisis-call-btn">
  <span class="crisis-call-label">자살예방상담전화</span>
  <span class="crisis-call-number">109</span>
  <span class="crisis-call-desc">24시간, 무료</span>
</a>
```

### CSS

```css
.crisis-call-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin: 16px auto;
  padding: 20px 24px;
  min-height: 80px;
  background: var(--color-primary, #2563eb);
  color: #fff;
  border-radius: 16px;
  text-decoration: none;
  text-align: center;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.crisis-call-label {
  font-size: 14px;
  font-weight: 400;
  opacity: 0.9;
  margin-bottom: 4px;
}

.crisis-call-number {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 2px;
}

.crisis-call-desc {
  font-size: 13px;
  font-weight: 400;
  opacity: 0.8;
  margin-top: 4px;
}

.crisis-call-btn:hover,
.crisis-call-btn:focus-visible {
  opacity: 0.95;
  outline: 3px solid var(--color-primary, #2563eb);
  outline-offset: 3px;
}
```

### 구현 시 주의사항
- `tel:` 링크 필수. 전화번호만 텍스트로 표시하면 안 된다.
- 한 줄 설명(운영시간, 비용) 반드시 포함.
- 터치 타겟 최소 44px x 44px, 권장 80px 이상 높이.
- 전화 버튼은 화면 중앙, 풀 너비로 배치.

---

## 3. 위기 화면 레이아웃

"죽고 싶다" 경로 등 위기 전용 화면의 레이아웃 규칙.

### CSS

```css
.crisis-screen {
  background: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  text-align: center;
}

.crisis-screen__empathy {
  font-family: 'Gowun Batang', serif;
  font-size: 22px;
  line-height: 1.8;
  color: var(--color-gray-800, #1f2937);
  margin-bottom: 40px;
  max-width: 320px;
  word-break: keep-all;
}

.crisis-screen__actions {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
```

### 구성 요소 (이것만, 이 순서대로)
1. 공감 문장 2줄 (`.crisis-screen__empathy`)
2. 전화 연결 버튼 (`.crisis-call-btn`)
3. 카카오톡 상담 링크
4. 면책 조항 (작은 글씨)

### 절대 포함하지 않을 것
- 내비게이션 메뉴
- 다른 콘텐츠로의 링크
- 통계 수치
- 장식 요소 (일러스트, 아이콘)
- 광고
- 공유 버튼
- 자살 방법에 대한 어떤 언급도

---

## 4. 인지 부하 감소 원칙

위기 상황에서 사용자는 인지 능력이 저하된 상태다.

### 규칙
- 화면당 선택지 최대 3개
- 버튼 텍스트는 동사로 시작: "전화하기", "상담하기", "나가기"
- 설명 텍스트는 2줄 이내
- 폰트 크기 최소 16px (본문), 22px (제목)
- 여백을 충분히: `padding` 최소 24px, 요소 간 `gap` 최소 16px
- 색상 대비: WCAG AA 기준 4.5:1 이상
- 장식 요소 없음: 그라데이션, 그림자, 일러스트, 아이콘 최소화

---

## 5. 안전한 브라우징

민감한 페이지에서 사용자의 흔적을 최소화한다.

### 금지 항목
- `localStorage` 사용 금지
- `sessionStorage` 사용 금지
- 쿠키 설정 금지
- URL에 민감한 키워드 노출 금지 (예: `/suicide`, `/domestic-violence` 대신 중립적 경로 사용)
- `document.title`에 민감한 키워드 금지 (예: "BeInside" 또는 중립적 제목 사용)

### 페이지 타이틀 처리

```javascript
// 가정폭력 관련 페이지: 중립적 타이틀 사용
document.title = 'BeInside';
```

### URL 경로 설계 예시
- 좋은 예: `/guide/safety`, `/help/connect`
- 나쁜 예: `/domestic-violence`, `/suicide-prevention`

---

## 체크리스트: 위기 페이지 배포 전 확인

배포 전 반드시 아래를 확인한다:

- [ ] 빠른 탈출 버튼이 모든 화면에서 보이는가?
- [ ] 탈출 버튼이 다른 요소에 가려지지 않는가?
- [ ] Esc 키로 탈출이 되는가?
- [ ] `history.replaceState`로 기록을 대체하는가?
- [ ] 전화번호에 `tel:` 링크가 있는가?
- [ ] 전화번호마다 한 줄 설명이 있는가?
- [ ] 터치 타겟이 44px 이상인가?
- [ ] localStorage/sessionStorage/쿠키를 사용하지 않는가?
- [ ] 페이지 타이틀에 민감한 키워드가 없는가?
- [ ] URL에 민감한 키워드가 없는가?
- [ ] 화면당 선택지가 3개 이하인가?
- [ ] 면책 조항이 포함되어 있는가?
- [ ] 자살 방법이나 구체적 폭력 묘사가 없는가?
