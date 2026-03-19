# Crisis UX Patterns

Design specifications for emergency, crisis, and high-vulnerability user flows.

---

## Quick Exit Button

A quick exit button allows users (especially domestic violence or abuse victims) to instantly leave the page and replace browser history so the back button does not reveal the visit.

### Specification

```html
<button class="quick-exit-btn" onclick="quickExit()" aria-label="빠른 나가기">
  ✕ 빠른 나가기
</button>
```

```css
.quick-exit-btn {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 9999;
  background: var(--ink);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0,0,0,.25);
  transition: background .15s;
  min-height: 44px;
  min-width: 44px;
}
.quick-exit-btn:hover {
  background: #1A1A1A;
}
```

```js
function quickExit() {
  // Replace current history entry with a safe page
  history.replaceState(null, '', 'https://www.google.com');
  // Navigate to a neutral site
  window.location.assign('https://www.google.com');
}
```

### When to Show
- Domestic violence pages (1366)
- Abuse-related content
- Any page where the user may need to hide their browsing

### Rules
- Always in top-right corner, above all other z-index layers
- High contrast (dark bg, white text) -- must be instantly findable
- No confirmation dialog -- exit must be immediate
- `history.replaceState` before navigation to prevent back-button reveal

---

## Emergency Phone Button

Full-width, high-contrast button for immediate phone connection.

### Specification

```html
<a href="tel:1393" class="emergency-call-big">
  📞 자살예방상담전화 1393
</a>
```

```css
.emergency-call-big {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 18px;
  border-radius: 16px;
  background: linear-gradient(135deg, #C05050, #E07070);
  color: white;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  margin-bottom: 12px;
  transition: transform .22s, box-shadow .22s;
  border: none;
  cursor: pointer;
  min-height: 56px; /* Large touch target */
}
.emergency-call-big:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(192,80,80,.30);
}
```

### Rules
- Always use `<a href="tel:XXXX">` -- never `onclick` for phone calls
- Include both the number AND a description (e.g., "자살예방상담전화 1393")
- Minimum height 56px for easy thumb tap
- Full width to maximize hit area
- High-contrast gradient background
- No fancy animations -- simple translateY hover only

### Emergency Grid Button

```html
<a href="tel:119" class="emer-btn emer-red">
  <span class="emer-num">119</span>
  <span class="emer-label">응급 (화재·구급)</span>
</a>
```

**Color variants:**
- `.emer-red` -- 119 fire/ambulance: `linear-gradient(135deg, #E84040, #C82020)`
- `.emer-purple` -- 1393 suicide prevention: `linear-gradient(135deg, #7A40C8, #5A28A0)`
- `.emer-green` -- 1388 youth: `linear-gradient(135deg, #2A9060, #1A7050)`
- `.emer-blue` -- 1577 mental health: `linear-gradient(135deg, #2060B8, #1848A0)`

Grid layout: `grid-template-columns: 1fr 1fr` with 12px gap, each button min-height 100px.

---

## Crisis Screen ("죽고 싶다" / Suicidal Ideation)

When a user indicates suicidal thoughts, the interface should shift to a maximally simple, connection-focused screen.

### Specification

```html
<div class="crisis-page">
  <div class="crisis-msg">
    지금 많이 힘드시죠.<br>
    <em>당신의 이야기를 들을 사람이 있어요.</em>
  </div>
  <a href="tel:1393" class="emergency-call-big">
    📞 자살예방상담전화 1393
  </a>
  <a href="tel:109" class="emergency-call-big" style="background:linear-gradient(135deg,#2060B8,#4080D0)">
    📞 자살예방상담전화 109
  </a>
  <p class="crisis-sub">
    전화가 어려우시면 카카오톡 "마음이음"을 검색해 보세요.<br>
    24시간 텍스트 상담도 가능해요.
  </p>
</div>
```

```css
.crisis-page {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 48px;
  text-align: center;
  background: #FFFFFF; /* Pure white, not cream */
}
.crisis-msg {
  font-family: 'Gowun Batang', serif;
  font-size: 18px;
  line-height: 1.9;
  color: var(--ink);
  margin-bottom: 32px;
  max-width: 420px;
}
.crisis-msg em {
  font-style: normal;
  font-weight: 700;
}
.crisis-sub {
  font-size: 12.5px;
  color: var(--ink-l);
  line-height: 1.7;
  margin-top: 24px;
  max-width: 360px;
}
```

### Design Rules
1. **White background** -- not cream, not any color. Pure white for maximum clarity
2. **Centered vertically** -- the message should float in the middle of the screen
3. **Large serif text** -- Gowun Batang at 18px, generous line-height (1.9)
4. **Connection only** -- the only interactive elements are phone call buttons
5. **No navigation** -- hide header, sidebar, tab bar if possible (or minimize)
6. **No decorative elements** -- no emojis in the crisis message itself, no gradients, no illustrations
7. **Maximum 2-3 phone options** -- do not overwhelm
8. **Text alternative mentioned** -- some people cannot make voice calls (text/chat options)
9. **No "are you sure?" dialogs** -- if they clicked through to this page, respect that

---

## Cognitive Impairment Design

For users with reduced cognitive capacity (severe stress, crisis, elderly dementia caregivers, etc.), apply these constraints:

### Principles

1. **Minimize choices**: Maximum 4-6 options per screen
2. **Large text**: Minimum 14px body, 16px for key actions
3. **High contrast**: Ensure WCAG AAA (7:1) for critical text
4. **Simple language**: Short sentences, common words only
5. **Clear hierarchy**: One primary action per section
6. **No ambiguity**: Buttons say exactly what they do ("119에 전화하기", not "연결")

### Implementation Checklist

```css
/* For crisis/cognitive-impairment pages */
.crisis-page,
.page-view--emergency {
  font-size: 14px;          /* Larger base */
  line-height: 1.8;         /* More spacing */
}

/* Emergency buttons must be large */
.emer-btn {
  min-height: 100px;        /* Extra large touch target */
  font-size: 12px;          /* Label readable */
}
.emer-num {
  font-size: 26px;          /* Number very prominent */
  font-weight: 700;
}

/* Emergency page background */
.page-view--emergency {
  background: #FAFAFA;      /* Near-white, removes warm distraction */
}
```

### Progressive Disclosure
- Use accordions to hide detail -- show summary first, let user expand if they can
- Assessment tools show one question at a time if possible
- Results should be color-coded (red/amber/green) AND text-labeled -- never color alone

### Touch Target Specifications

| Element | Minimum Size | Recommended |
|---------|-------------|-------------|
| Emergency call button | 56px height | Full width |
| Emergency grid button | 100px height | -- |
| Accordion header | 44px height | 48px |
| Checklist item | 44px height | -- |
| Quick exit button | 44px | -- |
| Mobile tab bar button | 44px | -- |

---

## Emergency Banner (Home Page)

The emergency banner on the home page serves as a persistent "escape hatch" to crisis resources.

```html
<div class="emergency-banner" onclick="showPage('emergency')">
  <span class="emergency-banner-icon">🚨</span>
  <div class="emergency-banner-body">
    <div class="emergency-banner-title">지금 당장 도움이 필요해요</div>
    <div class="emergency-banner-sub">24시간 긴급 상담 연결, 응급처치 가이드</div>
  </div>
  <span class="emergency-banner-arrow">→</span>
</div>
```

### Design
- Soft red gradient background (`--emer-bg` to `--emer-bg-deep`)
- Red border (`--emer-border`)
- Always visible on home page without scrolling (animation delay .24s)
- Hover: rises slightly, border darkens to `--emer-119`

---

## SOS Floating Button (Desktop)

```css
.sos-btn {
  position: fixed;
  bottom: 100px;
  right: 24px;
  z-index: 1000;
  background: #2A6A60;
  color: #fff;
  padding: 12px 20px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0 8px 20px rgba(42,106,96,0.3);
}
```

- Hidden on mobile (tab bar serves same purpose)
- Always accessible, always visible on desktop
- Green color -- calming but attention-getting
- "💬 24시 긴급상담" label -- not "SOS" (less alarming)
