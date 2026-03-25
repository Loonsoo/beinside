# 위기 상황 UX 완전 사양

> BeInside 디자인 시스템 관점의 위기 UX 구현 가이드.
> Safety 원칙은 다른 모든 원칙(Clarity, Deference, Depth)보다 우선한다.
>
> 참고: `beinside-safety` 스킬의 `references/crisis-ux-patterns.md`에
> 콘텐츠 관점의 위기 패턴이 있다. 이 문서는 **UI 구현** 관점이다.

---

## 1. 빠른 탈출 버튼 (Quick Exit Button)

### 적용 대상
- 가정폭력 관련 모든 페이지
- 성폭력/데이트 폭력 관련 페이지
- 가해자가 화면을 볼 수 있다고 전제하는 모든 페이지

### 디자인 원칙
- 라벨은 **모호하게**: "나가기" 또는 "X". "도움 탈출"처럼 의도가 드러나면 안 됨
- 항상 보여야 함: `position: fixed`, `z-index: 99999`
- 어떤 요소(모달, 오버레이 포함)에도 가려지면 안 됨
- 한 번 터치로 즉시 동작

### HTML

```html
<button id="quick-exit"
        class="quick-exit-btn"
        aria-label="페이지 나가기">
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
  background: #374151;           /* 눈에 띄지만 자극적이지 않은 중립 회색 */
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
  background: #111827;
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
(function() {
  var exitBtn = document.getElementById('quick-exit');
  if (!exitBtn) return;

  function quickExit() {
    // 1. 현재 history 항목을 네이버로 덮어쓰기
    //    -> 뒤로가기 시 이 페이지가 보이지 않음
    try {
      history.replaceState(null, '', 'https://www.naver.com');
    } catch(e) {}

    // 2. 네이버로 즉시 이동 (replace: 기록 안 남김)
    window.location.replace('https://www.naver.com');
  }

  exitBtn.addEventListener('click', quickExit);

  // Esc 키로도 탈출 가능
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      quickExit();
    }
  });
})();
```

### 구현 주의사항

1. **`window.location.replace()` 필수** -- `location.href =`는 기록이 남음
2. **`history.replaceState()`를 먼저 호출** -- 현재 항목을 덮어써야 뒤로가기에 안 나옴
3. **네이버 메인(`https://www.naver.com`)으로 이동** -- 한국 사용자에게 가장 자연스러운 목적지
4. **버튼이 다른 모달/오버레이에 가려지면 안 됨** -- z-index 99999
5. **다크/라이트 모두에서 잘 보임** -- 중립 회색 배경 사용

---

## 2. "죽고 싶어요" 전용 화면

### 디자인 원칙

이 화면에서는 **오직 연결 수단만** 제공한다:
- 통계 수치 없음
- 분석/진단 없음
- 다른 콘텐츠 링크 없음
- 내비게이션 메뉴 없음
- 장식 요소(일러스트, 아이콘) 없음
- 공유 버튼 없음

이것만 있어야 한다:
1. 공감 문장 (짧게, 2줄 이내)
2. 전화 연결 버튼
3. 채팅 상담 링크 (전화가 어려운 경우)
4. 면책 조항 (작은 글씨)

### HTML

```html
<div class="crisis-screen">
  <!-- 공감 문장 -->
  <div class="crisis-empathy">
    지금 많이 힘드시죠.<br>
    혼자 견디지 않아도 돼요.
  </div>

  <!-- 연결 수단 -->
  <div class="crisis-actions">
    <!-- 주요 전화 -->
    <a href="tel:109" class="crisis-call-btn crisis-call-primary"
       aria-label="109 자살예방상담전화로 전화하기">
      <span class="cc-label">자살예방상담전화</span>
      <span class="cc-number">109</span>
      <span class="cc-desc">24시간, 무료. 상담사가 이야기 들어줘요.</span>
    </a>

    <!-- 보조 전화 -->
    <a href="tel:1393" class="crisis-call-btn"
       aria-label="1393 정신건강위기상담전화로 전화하기">
      <span class="cc-label">정신건강위기상담전화</span>
      <span class="cc-number">1393</span>
      <span class="cc-desc">24시간, 무료</span>
    </a>

    <!-- 채팅 상담 -->
    <a href="https://www.mentalhealth.go.kr" class="crisis-chat-btn"
       target="_blank" rel="noopener"
       aria-label="온라인 상담으로 이동">
      <span class="cc-icon">&#x1F4AC;</span>
      <span>전화가 어려우면, 온라인 상담도 있어요</span>
    </a>
  </div>

  <!-- 면책 -->
  <p class="crisis-disclaimer">
    이 서비스는 전문 의료 심리 상담을 대체하지 않아요.
    위의 전화는 전문 상담사가 응대해요.
  </p>
</div>
```

### CSS

```css
.crisis-screen {
  background: var(--white);
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  text-align: center;
}

.crisis-empathy {
  font-family: 'Gowun Batang', serif;
  font-size: clamp(20px, calc(20px + var(--text-scale, 0) * 2px), 28px);
  line-height: 1.8;
  color: var(--ink);
  margin-bottom: 40px;
  max-width: 320px;
  word-break: keep-all;
}

.crisis-actions {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.crisis-call-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px 24px;
  min-height: 80px;
  background: var(--peach-p);
  color: var(--ink);
  border: 1.5px solid var(--line);
  border-radius: 16px;
  text-decoration: none;
  text-align: center;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.12s ease;
}

.crisis-call-btn:active {
  transform: scale(0.98);
}

.crisis-call-btn:focus-visible {
  outline: 3px solid var(--peach);
  outline-offset: 3px;
}

.crisis-call-primary {
  background: linear-gradient(135deg, var(--peach-p), rgba(123,174,203,.15));
  border-color: var(--peach);
}

.cc-label {
  font-size: 14px; font-weight: 400;
  color: var(--ink-m); margin-bottom: 4px;
}
.cc-number {
  font-size: 32px; font-weight: 800;
  color: var(--peach-d); letter-spacing: 2px;
}
.cc-desc {
  font-size: 13px; font-weight: 400;
  color: var(--ink-m); margin-top: 4px;
}

.crisis-chat-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px 20px;
  min-height: 48px;
  background: var(--white);
  border: 1.5px solid var(--line);
  border-radius: 12px;
  color: var(--ink-m);
  font-size: 14px;
  text-decoration: none;
  transition: all 0.12s ease;
}
.crisis-chat-btn:hover {
  border-color: var(--peach);
  color: var(--peach-d);
}

.crisis-disclaimer {
  margin-top: 32px;
  font-size: 11px;
  color: var(--ink-l);
  max-width: 320px;
  line-height: 1.6;
}
```

### 절대 포함하지 않을 것 (체크리스트)
- [ ] 내비게이션 메뉴가 없는가?
- [ ] 다른 콘텐츠 링크가 없는가?
- [ ] 통계 수치가 없는가?
- [ ] 장식 요소가 없는가?
- [ ] 공유 버튼이 없는가?
- [ ] 자살 방법에 대한 어떤 언급도 없는가?

---

## 3. 긴급 전화 버튼

모든 위기/도움 페이지에서 전화 연결은 가장 중요한 행동 유도 요소.

### 인라인 전화 버튼 (일반 페이지용)

```html
<a href="tel:1393" class="emergency-btn"
   aria-label="1393 정신건강위기상담전화로 전화하기">
  <span class="eb-icon">&#x1F49C;</span>
  <div class="eb-info">
    <span class="eb-number">1393</span>
    <span class="eb-name">정신건강위기상담전화</span>
    <span class="eb-desc">상담사가 이야기 들어줘요. 무료, 24시간.</span>
  </div>
</a>
```

```css
.emergency-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 18px 20px;
  min-height: 56px;               /* 떨리는 손으로도 누를 수 있게 */
  border-radius: 14px;
  border: 1.5px solid rgba(123,174,203,.12);
  background: var(--white);
  text-decoration: none;
  color: var(--ink);
  transition: all 0.12s ease;
  -webkit-tap-highlight-color: transparent;
}
.emergency-btn:hover {
  background: var(--peach-p);
  border-color: var(--peach);
}
.emergency-btn:active { transform: scale(0.98); }
.emergency-btn:focus-visible {
  outline: 2px solid var(--peach);
  outline-offset: 2px;
}

.eb-icon { font-size: 28px; flex-shrink: 0; }
.eb-info { display: flex; flex-direction: column; gap: 2px; }
.eb-number { font-size: 22px; font-weight: 800; color: var(--peach-d); }
.eb-name { font-size: 13px; font-weight: 700; color: var(--ink); }
.eb-desc { font-size: 12px; color: var(--ink-m); }
```

### 긴급 배너형 (상단 고정)

페이지 내용보다 긴급 연결이 우선일 때:

```html
<div class="emergency-banner">
  <span>지금 위험한 상황이라면</span>
  <a href="tel:112" class="eb-call" aria-label="112 경찰에 전화하기">
    112 신고
  </a>
</div>
```

```css
.emergency-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--emer-bg);
  border: 1px solid var(--emer-border);
  border-radius: 12px;
  margin-bottom: 16px;
  font-size: 14px; color: var(--ink);
}
.eb-call {
  padding: 8px 16px;
  min-height: 44px;
  display: flex; align-items: center;
  border-radius: 8px;
  background: var(--emer-red-grad);
  color: #fff;
  font-weight: 700; font-size: 14px;
  text-decoration: none;
}
```

### 전화번호 구현 규칙

| 규칙 | 이유 |
|------|------|
| 반드시 `<a href="tel:XXX">` | 터치 한 번으로 전화 |
| 한 줄 설명 포함 | "이게 뭔 번호지?" 방지 |
| 운영시간 명시 | "지금 전화해도 되나?" 불안 해소 |
| 무료 여부 명시 | "돈 나오나?" 걱정 제거 |
| 터치 영역 56px 이상 | 떨리는 손으로도 누를 수 있게 |
| 전체 너비(width:100%) 사용 | 화면 어디를 눌러도 연결 |

### 주요 전화번호 목록

```javascript
var EMERGENCY_PHONES = [
  { number: '109',  name: '자살예방상담전화', desc: '24시간, 무료', icon: '&#x1F49C;' },
  { number: '1393', name: '정신건강위기상담전화', desc: '24시간, 무료', icon: '&#x1F49C;' },
  { number: '112',  name: '경찰', desc: '긴급 신고', icon: '&#x1F6A8;' },
  { number: '119',  name: '소방/응급', desc: '의료 응급', icon: '&#x1F691;' },
  { number: '1388', name: '청소년상담', desc: '24시간, 무료', icon: '&#x1F49A;' },
  { number: '1366', name: '여성긴급전화', desc: '24시간, 무료', icon: '&#x1F497;' },
  { number: '1577-0199', name: '정신건강복지센터', desc: '평일 09~18시', icon: '&#x1F499;' }
];
```

---

## 4. 인지 저하 상태 설계 원칙

위기 상황의 사용자는 인지 능력이 심각하게 저하된 상태다.
공황, 극심한 슬픔, 해리 상태에서도 사용할 수 있어야 한다.

### 원칙 1: 선택지 최소화

```
나쁜 예:
"전화 상담 | 채팅 상담 | 문자 상담 | 이메일 | 방문 상담 | FAQ | 자가 진단 | 커뮤니티"

좋은 예:
"전화하기 | 채팅하기 | 나가기"
```

- 화면당 선택지 **최대 3개**
- 주요 행동 1개 + 보조 행동 1~2개
- "그 외"는 절대 없음

### 원칙 2: 동사로 시작하는 버튼

```
나쁜 예: "자살예방상담전화 1393"
좋은 예: "전화하기 - 1393 (24시간, 무료)"
```

- 모든 버튼 텍스트는 **동사로 시작**
- 전화하기, 상담하기, 나가기
- 명사만으로 된 버튼 금지

### 원칙 3: 큰 글씨, 넉넉한 여백

| 요소 | 최소 크기 | 이유 |
|------|-----------|------|
| 공감 문장 | 20px | 흐린 시야에서도 읽힘 |
| 본문 | 17px (일반 15px보다 큼) | 인지 부하 감소 |
| 버튼 텍스트 | 14px | 명확한 행동 유도 |
| 전화번호 | 22px 이상 | 한 눈에 보임 |
| 요소 간 gap | 16px 이상 | 실수로 잘못 누르기 방지 |
| 패딩 | 24px 이상 | 여유 있는 공간감 |

### 원칙 4: 장식 제거

위기 화면에서 제거해야 하는 것:
- 그라데이션 배경 -> 단색 사용
- 복잡한 그림자 -> 없거나 최소
- 일러스트, 아이콘 -> 최소한만 (전화기 아이콘 정도)
- 애니메이션 -> 없음 (`prefers-reduced-motion` 기본 적용)
- 패턴/텍스처 -> 완전 제거

### 원칙 5: 색상 대비 강화

```css
.crisis-page {
  /* WCAG AA 이상: 본문 4.5:1, 대형 텍스트 3:1 */
  color: var(--ink);             /* #3A3A3A on #FFFFFF = 10.69:1 */
  background: var(--white);
}

/* 위기 화면에서는 약한 색상(--ink-l) 사용 금지 */
/* 모든 텍스트를 --ink 또는 --ink-m으로 */
```

### 원칙 6: 안전한 브라우징

민감한 페이지에서 사용자의 흔적을 남기지 않는다:

```javascript
// 금지 목록
// - localStorage 사용 금지
// - sessionStorage 사용 금지
// - 쿠키 설정 금지
// - URL에 민감한 키워드 금지 (/suicide, /violence 등)
// - document.title에 민감한 키워드 금지

// 페이지 타이틀: 항상 중립적으로
document.title = 'BeInside';

// URL 경로: 중립적으로
// 좋은 예: /help, /connect, /guide
// 나쁜 예: /suicide-prevention, /domestic-violence
```

---

## 5. 청소년 위기 페이지 특칙

청소년 페이지는 추가적인 안전 고려사항이 있다.

### 기록 제로 정책

```javascript
// 청소년 페이지에서는 모든 저장소 사용 금지
// localStorage 금지 -- 부모가 확인할 수 있음
// sessionStorage 금지 -- 같은 세션에서 형제가 볼 수 있음
// 쿠키 금지

// 감정 기록은 sessionStorage만 사용 (탭 닫으면 삭제)
// curPage === 'teen' 체크 후 분기
const store = (curPage === 'teen') ? sessionStorage : localStorage;
```

### 다크 테마 기본 적용

청소년 페이지는 밝은 화면이 주변에 눈에 띌 수 있으므로
기본적으로 어두운 테마를 사용한다:

```css
/* 청소년 전용 다크 테마 */
.teen-page {
  --teen-bg: #1A1F3A;
  --teen-bg-deep: #12172E;
  --teen-accent: #5B7CFA;
  background: var(--teen-bg);
  color: #E0E0F0;
}

.teen-page .crisis-call-btn {
  background: rgba(91, 124, 250, .12);
  border-color: rgba(91, 124, 250, .25);
  color: #E0E0F0;
}

.teen-page .cc-number {
  color: var(--teen-accent);
}
```

### 언어 톤 차이

```
성인 페이지: "많이 힘드시죠. 혼자 견디지 않아도 돼요."
청소년 페이지: "많이 힘들지. 혼자 안 견뎌도 돼."
```

- 청소년 콘텐츠: 반말/해요체
- 판단적 표현("~하면 안 돼") 금지
- 공감 우선("~하는 거 당연해")

### 연결 수단 차이

```javascript
// 청소년 전용 전화번호 우선
var TEEN_PHONES = [
  { number: '1388', name: '청소년상담', desc: '24시간, 무료. 비밀 보장돼.', icon: '&#x1F49A;' },
  { number: '109',  name: '자살예방상담', desc: '24시간, 무료.', icon: '&#x1F49C;' },
];
// 카카오톡 상담 등 문자 기반 채널 우선 (전화보다 문턱이 낮음)
```

### 민감 URL 규칙

```javascript
// 청소년 위기 페이지 경로
// 좋은 예: /teen (기존 페이지 경로와 동일)
// 나쁜 예: /teen-crisis, /teen-suicide

// document.title도 중립적으로
document.title = 'BeInside';  // 학교, 도움, 위기 등 키워드 없음
```

---

## 배포 전 위기 페이지 체크리스트

### 안전
- [ ] 빠른 탈출 버튼이 필요한 페이지에 있는가? (가정폭력/성폭력)
- [ ] 탈출 버튼이 모든 스크롤 위치에서 보이는가?
- [ ] Esc 키로 탈출이 되는가?
- [ ] `history.replaceState`로 기록을 대체하는가?
- [ ] localStorage/sessionStorage/쿠키를 사용하지 않는가?
- [ ] URL에 민감한 키워드가 없는가?
- [ ] 페이지 타이틀에 민감한 키워드가 없는가?

### 접근성
- [ ] 모든 전화번호에 `tel:` 링크가 있는가?
- [ ] 전화번호마다 한 줄 설명이 있는가?
- [ ] 터치 타겟이 56px 이상인가? (위기 페이지 기준)
- [ ] 색상 대비 WCAG AA (4.5:1) 이상인가?
- [ ] `aria-label`이 모든 버튼/링크에 있는가?

### 콘텐츠
- [ ] 화면당 선택지가 3개 이하인가?
- [ ] 면책 조항이 포함되어 있는가?
- [ ] 자살 방법이나 구체적 폭력 묘사가 없는가?
- [ ] 통계 수치가 없는가? (위기 화면 한정)
- [ ] 공감 문장이 2줄 이내인가?

### 디자인
- [ ] 장식 요소(그라데이션, 패턴)가 없는가?
- [ ] 글씨 크기가 일반 페이지보다 큰가? (17px 기본)
- [ ] 여백이 넉넉한가? (padding 24px+, gap 16px+)
- [ ] 다크모드에서도 잘 보이는가?

### 청소년 특칙
- [ ] localStorage를 사용하지 않는가?
- [ ] 다크 테마가 기본 적용되는가?
- [ ] 반말/해요체가 사용되는가?
- [ ] 1388이 최우선 전화번호로 노출되는가?
