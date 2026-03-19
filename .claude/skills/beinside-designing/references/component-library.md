# BeInside Component Library

All existing UI components with class names, key CSS, and HTML structure examples.

---

## 1. Cards

### Base Card `.card`

```css
.card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 22px 24px;
  border: 1px solid rgba(0,0,0,.06);
  border-top: 3px solid transparent;
  box-shadow: 0 2px 6px rgba(0,0,0,.05);
  transition: transform .28s cubic-bezier(.34,1.56,.64,1),
              box-shadow .28s cubic-bezier(.34,1.56,.64,1);
  animation: up .35s ease both;  /* staggered via nth-child */
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,.10);
  border-top-color: var(--peach);
}
.card.full { grid-column: span 2; }
```

**HTML structure:**
```html
<div class="card cbg-s">
  <h3>🌿 카드 제목</h3>
  <ul>
    <li><strong>굵은 항목</strong> 설명 텍스트</li>
    <li>일반 항목 텍스트</li>
  </ul>
</div>
```

### Color Variants
- `.card.cbg-a` -- amber/gold gradient
- `.card.cbg-s` -- sage/green gradient
- `.card.cbg-p` -- primary/blue gradient
- `.card.cbg-sky` -- sky blue gradient
- `.card.cbg-lavender` -- healing green gradient
- `.card.cbg-mint` -- mint green gradient
- `.card.cbg-rose` -- terracotta/rose gradient
- `.card.cbg-teal` -- teal gradient

### Situation Card `.sit-card`

```html
<div class="sit-card" data-card-id="growth" onclick="showPage('growth')">
  <div class="sit-icon">👶</div>
  <div class="sit-card-body">
    <div class="sit-title">아이 성장이 불안해요</div>
    <div class="sit-sub">연령별 발달 기준과 체크리스트</div>
  </div>
  <div class="sit-arrow">→</div>
</div>
```

**Variants:**
- `.sit-card.self-area` -- healing green border for "self" section
- `.sit-card--teen` -- cool blue gradient for youth pages
- `.sit-card--emergency` -- red border for crisis

---

## 2. Buttons

### Go Button `.gobtn`

```css
.gobtn {
  background: var(--peach-d);
  color: #fff;
  border-radius: 12px;
  font-size: 13px; font-weight: 700;
  padding: 10px 22px;
  transition: all .22s cubic-bezier(.34,1.56,.64,1);
  box-shadow: 0 2px 10px rgba(184,80,48,.22);
}
```

### SOS Floating Button `.sos-btn`

```html
<button class="sos-btn" onclick="showPage('emergency')">
  <span>💬</span> 24시 긴급상담
</button>
```

```css
.sos-btn {
  position: fixed; bottom: 100px; right: 24px; z-index: 1000;
  background: #2A6A60; color: #fff;
  padding: 12px 20px; border-radius: 30px;
  font-weight: 700; font-size: 14px;
  box-shadow: 0 8px 20px rgba(42,106,96,0.3);
}
/* Hidden on mobile (tab bar has emergency) */
@media(max-width:640px) { .sos-btn { display: none !important; } }
```

### Pill `.pill`

```html
<div class="pill" onclick="qs(3,'m')">
  <span class="cd" style="background:var(--age-3m)"></span>3개월
</div>
```

```css
.pill {
  background: var(--white);
  border: 1.5px solid rgba(123,174,203,.18);
  border-radius: 24px;
  padding: 6px 15px;
  font-size: 12px; font-weight: 600;
  box-shadow: 0 1px 4px rgba(40,40,40,.06);
  transition: all .22s cubic-bezier(.34,1.56,.64,1);
}
```

### Nav Button `nav button`

```css
nav button {
  background: none; border: none;
  font-size: 13px; color: var(--ink-m);
  padding: 6px 16px; border-radius: 22px;
  font-weight: 600;
}
nav button.on {
  background: var(--peach-d); color: #fff;
  box-shadow: 0 2px 12px rgba(123,174,203,.30);
}
```

### Emergency Button `.emer-btn`

```html
<a href="tel:119" class="emer-btn emer-red">
  <span class="emer-num">119</span>
  <span class="emer-label">응급 (화재·구급)</span>
</a>
```

```css
.emer-btn {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 6px; padding: 24px 12px;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,.08);
  min-height: 100px;
}
.emer-red { background: linear-gradient(135deg, #E84040, #C82020); color: #fff; }
.emer-purple { background: linear-gradient(135deg, #7A40C8, #5A28A0); color: #fff; }
.emer-green { background: linear-gradient(135deg, #2A9060, #1A7050); color: #fff; }
.emer-blue { background: linear-gradient(135deg, #2060B8, #1848A0); color: #fff; }
```

### Emergency Call Big `.emergency-call-big`

```html
<a href="tel:1393" class="emergency-call-big">📞 자살예방상담전화 1393</a>
```

```css
.emergency-call-big {
  display: flex; align-items: center; justify-content: center;
  gap: 10px; width: 100%; padding: 18px;
  border-radius: 16px;
  background: linear-gradient(135deg, #C05050, #E07070);
  color: white; font-size: 16px; font-weight: 700;
}
```

### Toolkit Button `.toolkit-btn`

```css
.toolkit-btn {
  min-height: 44px; padding: 9px 16px;
  background: var(--white);
  border: 1.5px solid rgba(123,174,203,.18);
  border-radius: 12px;
  font-size: 13px; font-weight: 600;
}
```

---

## 3. Accordion

### System A: `.accordion-item` (max-height transition -- preferred)

```html
<div class="accordion-group">
  <div class="accordion-item" data-sit-id="dementia">
    <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0">
      <span>🧠 치매 돌봄</span>
      <span class="accordion-arrow">▼</span>
    </div>
    <div class="accordion-body">
      <div class="accordion-body-inner">
        <!-- content here -->
      </div>
    </div>
  </div>
</div>
```

```css
.accordion-item {
  border: 1px solid var(--line);
  border-radius: 14px; margin-bottom: 8px; overflow: hidden;
}
.accordion-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 15px 18px; cursor: pointer;
  font-size: 14px; font-weight: 700; color: var(--ink);
  background: var(--white); transition: background .18s;
}
.accordion-body {
  max-height: 0; overflow: hidden;
  transition: max-height .35s ease;
}
.accordion-body-inner {
  padding: 0 18px 16px;
  font-size: 13.5px; color: var(--ink-m); line-height: 1.7;
}
```

**JS toggle:**
```js
function toggleAccordion(el) {
  const item = el.closest('.accordion-item');
  const body = item.querySelector('.accordion-body');
  const isOpen = item.classList.contains('open');
  // Close siblings in same group
  const group = item.closest('.accordion-group');
  if (group) {
    group.querySelectorAll('.accordion-item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.accordion-body').style.maxHeight = '0';
    });
  }
  if (!isOpen) {
    item.classList.add('open');
    const inner = body.querySelector('.accordion-body-inner');
    body.style.maxHeight = (inner ? inner.scrollHeight + 32 : 400) + 'px';
  }
}
```

### System B: `.acc-section` (display:none toggle -- growth guide)

```html
<div class="acc-container">
  <div class="acc-section">
    <button class="acc-header" onclick="toggleAcc(this)">
      <span class="acc-h-icon">🏃</span>
      <span class="acc-h-title">대근육 발달</span>
      <span class="acc-h-sub">3개 항목</span>
      <span class="acc-arrow">▾</span>
    </button>
    <div class="acc-body">
      <div class="grid">
        <div class="card">...</div>
      </div>
    </div>
  </div>
</div>
```

---

## 4. Check Tool (Situation Assessment)

```html
<div class="check-tool">
  <div class="check-tool-title">🔍 현재 상황 체크해 보세요</div>
  <div class="check-item" onclick="toggleCheck(this)">
    <div class="check-box"></div>
    <span>최근 2주 이상 의욕이 없고 피로가 심해요</span>
  </div>
  <!-- more check-items -->
  <div class="check-result high" style="display:none">
    ⚠️ 전문 상담을 받아보시는 것을 권합니다.
  </div>
  <div class="check-disclaimer">
    이 도구는 진단 목적이 아닌 참고용입니다.
  </div>
</div>
```

**Result levels:** `.check-result.high` (red), `.check-result.mid` (amber), `.check-result.low` (green)

---

## 5. Action Checklist

```html
<div class="action-checklist">
  <div class="action-title">오늘 할 수 있는 것</div>
  <div class="action-item" onclick="toggleAction(this)">
    <div class="action-check"></div>
    <div class="action-text">
      <span class="action-emoji">📞</span>
      <span><strong>1577-0199</strong>에 전화해서 상담 예약하기</span>
    </div>
  </div>
</div>
```

---

## 6. Layout Components

### Header

```html
<header>
  <div class="prof-chip">...</div>
  <div class="logo"><span>🌻</span>BeInside</div>
  <div class="hdr-right">
    <button class="card-edit-badge">✏️</button>
    <button class="menu-btn"><span></span><span></span><span></span></button>
  </div>
</header>
```

### Hero Section

```html
<section class="hero" id="hero">
  <div class="hero-glow"></div>
  <h1>지금, 어떤 상황이세요?</h1>
  <div class="hero-sections">
    <div class="section-care">...</div>
    <div class="section-self">...</div>
  </div>
</section>
```

### Page View

```html
<div class="page-view" id="page-emotion" style="display:none">
  <div class="page-header">
    <button class="page-back" onclick="showPage('home')">← 홈으로</button>
    <h2 class="page-title">😔 감정 돌봄 가이드</h2>
  </div>
  <!-- content sections -->
</div>
```

### Card Grid

```html
<div class="grid">
  <div class="card cbg-p">...</div>
  <div class="card cbg-s">...</div>
  <div class="card full cbg-a">...</div>
</div>
```

---

## 7. Navigation

### Mobile Tab Bar `.mobile-tabbar`

```html
<div class="mobile-tabbar">
  <button class="mtab active" onclick="setMTab('home')">
    <span>🏠</span>홈
  </button>
  <button class="mtab" onclick="setMTab('growth')">
    <span>👶</span>성장
  </button>
  <button class="mtab" onclick="setMTab('mind')">
    <span>💭</span>마음
  </button>
  <button class="mtab" onclick="setMTab('emergency')">
    <span>🚨</span>긴급
  </button>
</div>
```

```css
/* Only visible at 640px and below */
.mtab {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; gap: 3px;
  font-size: 9px; font-weight: 600; color: var(--ink-m);
}
.mtab.active { color: var(--peach-d); }
```

---

## 8. Modal

```html
<div class="modal-overlay" id="modal-overlay" onclick="closeModalOutside(event)">
  <div class="modal" id="modal">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h2>모달 제목</h2>
    <p class="modal-sub">보조 설명</p>
    <!-- content -->
  </div>
</div>
```

```css
.modal-overlay {
  position: fixed; inset: 0; z-index: 900;
  background: rgba(40,40,40,.35);
  backdrop-filter: blur(12px);
}
.modal {
  background: rgba(255,255,255,.88);
  backdrop-filter: blur(40px) saturate(1.8);
  border: 1px solid rgba(255,255,255,0.70);
  border-radius: 24px; padding: 22px;
  width: min(400px, 94vw); max-height: 90vh;
  animation: slideUp .28s cubic-bezier(.34,1.2,.64,1) both;
}
```

---

## 9. Special Components

### Stat Badge

```html
<div class="stat-badge">
  <span class="sb-num">85%</span> 의 부모가 같은 고민을 합니다
</div>
```

### Medical Disclaimer

```html
<div class="medical-disclaimer">
  <strong>의학적 면책 조항:</strong> 본 가이드는 참고용 정보입니다...
</div>
```

### Emergency Banner

```html
<div class="emergency-banner" onclick="showPage('emergency')">
  <span class="emergency-banner-icon">🚨</span>
  <div class="emergency-banner-body">
    <div class="emergency-banner-title">지금 당장 도움이 필요해요</div>
    <div class="emergency-banner-sub">24시간 긴급 상담 연결</div>
  </div>
  <span class="emergency-banner-arrow">→</span>
</div>
```

### Help Connect Cards

```html
<div class="help-cards">
  <a href="tel:1577-0199" class="help-card">
    <span class="help-card-num">1577-0199</span>
    <div class="help-card-info">
      <div class="help-card-name">정신건강위기상담전화</div>
      <div class="help-card-desc">24시간 전문상담</div>
    </div>
  </a>
</div>
```

### Profile Chip

```html
<div class="prof-chip" onclick="openProfPanel()">
  <div class="prof-avatar"><span>🌱</span></div>
  <div class="prof-info">
    <span class="prof-name">준서</span>
    <span class="prof-age">3개월</span>
  </div>
</div>
```

### Verified Badge

```html
<div class="verified-badge">✓ 공인 출처 기반</div>
```

### Content Hero (Self/Emotion pages)

```html
<div class="content-hero" style="background:linear-gradient(...)">
  <div class="content-hero-inner">
    <h2>감정이 힘들 때</h2>
    <p>감정을 알아차리고 다루는 방법</p>
  </div>
</div>
```
