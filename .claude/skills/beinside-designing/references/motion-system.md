# BeInside Motion System

All animations, transitions, and timing curves used in the project.

---

## Page Entry: Staggered Reveal

The primary entry animation used across the entire site.

```css
@keyframes up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

**Card stagger pattern:**
```css
.card { animation: up .35s ease both; }
.card:nth-child(1) { animation-delay: .04s; }
.card:nth-child(2) { animation-delay: .08s; }
.card:nth-child(3) { animation-delay: .12s; }
.card:nth-child(4) { animation-delay: .16s; }
.card:nth-child(5) { animation-delay: .20s; }
.card:nth-child(6) { animation-delay: .24s; }
.card:nth-child(7) { animation-delay: .28s; }
.card:nth-child(8) { animation-delay: .32s; }
```

**Hero stagger:**
```css
.badge        { animation: up .5s ease both; }
.hero h1      { animation: up .5s .06s cubic-bezier(.22,1,.36,1) both; }
.hero p       { animation: up .5s .12s cubic-bezier(.22,1,.36,1) both; }
.sbox         { animation: up .48s .20s cubic-bezier(.22,1,.36,1) both; }
.situation-grid { animation: up .5s .18s cubic-bezier(.22,1,.36,1) both; }
```

**Page/section reveal:**
```css
.page-view     { animation: up .35s ease both; }
#result.on     { animation: up .4s ease both; }
.sp-stage.on   { animation: up .3s ease both; }
.birth-stage.on { animation: up .3s ease both; }
```

---

## Card Hover

Uses a bouncy overshoot curve for playful-but-controlled feel.

```css
.card {
  transition: transform .28s cubic-bezier(.34, 1.56, .64, 1),
              box-shadow .28s cubic-bezier(.34, 1.56, .64, 1);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,.10);
}
```

**Situation card hover** (slightly less overshoot):
```css
.sit-card {
  transition: all .25s cubic-bezier(.34, 1.2, .64, 1);
}
.sit-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,.10);
}
```

**Button hover:**
```css
.gobtn {
  transition: all .22s cubic-bezier(.34, 1.56, .64, 1);
}
.gobtn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 26px rgba(123,174,203,.42);
}

.pill {
  transition: all .22s cubic-bezier(.34, 1.56, .64, 1);
}
.pill:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 14px rgba(123,174,203,.18);
}
```

---

## Accordion

### System A (`.accordion-item`) -- max-height transition

```css
.accordion-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height .35s ease;
}
.accordion-arrow {
  transition: transform .3s ease;
}
.accordion-item.open .accordion-arrow {
  transform: rotate(180deg);
}
```

JS sets `maxHeight` dynamically:
```js
body.style.maxHeight = (inner.scrollHeight + 32) + 'px';
```

### System B (`.acc-section`) -- display toggle

```css
.acc-body {
  display: none;
  padding: 16px 20px 18px;
  animation: up .2s ease both;  /* fade-in on show */
}
.acc-body.open { display: block; }

.acc-arrow {
  transition: transform .2s;
}
.acc-header.open .acc-arrow {
  transform: rotate(180deg);
}
```

---

## Modal

### Overlay Fade

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.modal-overlay.on { animation: fadeIn .2s ease both; }
```

### Modal Slide Up

```css
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.modal {
  animation: slideUp .28s cubic-bezier(.34, 1.2, .64, 1) both;
}
```

### Profile Panel (Bottom Sheet)

```css
.prof-panel {
  position: fixed; bottom: -100%;
  transition: bottom .3s cubic-bezier(.34, 1.1, .64, 1);
}
.prof-panel.on { bottom: 60px; }
```

---

## Source Drawer (Side Panel)

```css
.source-drawer {
  transform: translateX(100%);
  transition: transform .35s cubic-bezier(.4, 0, .2, 1);
}
.source-drawer.open { transform: translateX(0); }

.source-drawer-overlay {
  opacity: 0; pointer-events: none;
  transition: opacity 0.3s;
}
.source-drawer-overlay.open { opacity: 1; pointer-events: all; }
```

---

## Card Edit Mode (Wiggle)

```css
@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25%      { transform: rotate(-1.2deg); }
  75%      { transform: rotate(1.2deg); }
}
.card-edit-mode .sit-card {
  animation: wiggle .28s ease-in-out infinite;
}
.card-edit-mode .sit-card:nth-child(even) { animation-delay: .14s; }
.card-edit-mode .sit-card:nth-child(3n) { animation-direction: reverse; }
```

---

## Interactive State Transitions

**General hover color shifts:**
```css
/* Background color transitions */
.acc-header      { transition: background .18s; }
nav button       { transition: all .2s cubic-bezier(.4,0,.2,1); }
.form-input      { transition: border-color .2s; }
.toolkit-btn     { transition: all 0.22s; }

/* Focus ring */
.form-input:focus { box-shadow: 0 0 0 3px rgba(123,174,203,.10); }
.ninput:focus-within { box-shadow: 0 0 0 3px rgba(123,174,203,.14); }
```

---

## Timing Curves Reference

| Name | Value | Usage |
|------|-------|-------|
| Bouncy (card hover) | `cubic-bezier(.34, 1.56, .64, 1)` | Cards, pills, buttons |
| Soft bounce (modal) | `cubic-bezier(.34, 1.2, .64, 1)` | Modal slideUp, sit-card hover, panel |
| Smooth (system) | `cubic-bezier(.4, 0, .2, 1)` | Nav, drawer, general transitions |
| Ease-out (hero) | `cubic-bezier(.22, 1, .36, 1)` | Hero stagger animations |
| Gentle panel | `cubic-bezier(.34, 1.1, .64, 1)` | Profile panel bottom sheet |

---

## Reduced Motion Override

The codebase does not currently include a `prefers-reduced-motion` override. When adding or modifying animations, always include:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Important:** This should be added to `css/styles.css` as a top-level block. Any new animations you create must work without motion (content should still appear, just without animation).
