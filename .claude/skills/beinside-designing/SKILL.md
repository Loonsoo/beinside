---
name: beinside-designing
description: >
  BeInside 웹서비스의 UI/UX를 설계·구현·수정하는 총괄 디자인 스킬.
  페이지 레이아웃, 컴포넌트 생성, 스타일링, 반응형 설계, 접근성,
  애니메이션, 모달, 카드, 아코디언, 탭, 버튼, 입력 필드 등
  모든 시각적 요소를 다룬다.
  "디자인", "레이아웃", "스타일", "UI", "UX", "반응형", "모바일",
  "카드", "버튼", "모달", "애니메이션", "접근성", "컴포넌트",
  "색상", "폰트", "간격", "그리드" 등의 키워드에 반응한다.
  새 페이지를 만들거나 기존 페이지 구조를 바꿀 때 반드시 사용.
  이 스킬 없이 UI를 건드리면 디자인 시스템이 깨진다.
---

# BeInside Design System

## 디자인 철학

BeInside의 사용자는 심리적으로 취약한 상태에 있다.
디자인의 모든 결정은 이 전제에서 출발한다.

### 3가지 디자인 원칙

**1. Clarity (명료함) — Apple HIG에서 차용**
- 모든 요소는 한 눈에 목적을 알 수 있어야 한다
- 텍스트는 어떤 크기에서든 읽을 수 있어야 한다
- 장식은 최소화하고, 콘텐츠가 주인공이 되게 한다
- 시각적 위계를 통해 사용자의 시선을 자연스럽게 안내한다

**2. Calm (안정감) — Emotional Design에서 차용**
- 화면이 "정보를 쏟아붓는" 것이 아니라 "조용히 옆에 앉아 건네는" 느낌
- 넉넉한 여백이 숨 쉴 공간을 만든다
- 색상은 따뜻하지만 자극적이지 않게
- 애니메이션은 부드럽고 자연스러운 이징(easing)만 사용
- 절대 사용자를 놀라게 하거나 급하게 느끼게 하지 않는다

**3. Safety (안전) — Crisis UX에서 차용**
- 위기 상황의 사용자는 인지 능력이 급격히 저하된 상태
- 긴급 페이지: 글씨 크게, 선택지 적게, 여백 넉넉히
- 모든 전화번호는 한 번의 터치로 연결
- 가정폭력 페이지: 빠른 탈출 + 흔적 없는 UI

### 작업 전 반드시 읽기
- 색상·간격·폰트 정보: `references/design-tokens.md`
- 기존 컴포넌트 목록: `references/component-library.md`
- 애니메이션 규칙: `references/motion-system.md`
- 감정 디자인 원칙: `references/emotional-design.md`
- 위기 상황 UX 패턴: `references/crisis-ux.md` (안전 관련 페이지 작업 시)
- 좋은 결과 예시: `examples/` 폴더

## Layout Rules

| Element | Spec |
|---------|------|
| Header | sticky, 56px height, blur backdrop, grid: 1fr auto 1fr |
| `.page-wrap` | flex row: `.main-col` (flex:1) + `.tl-sidebar` (hidden) |
| Content padding (desktop) | 48px horizontal |
| Content padding (tablet <=900px) | 24px horizontal |
| Content padding (mobile <=640px) | 18px horizontal |
| Card grid | `grid-template-columns: 1fr 1fr` (1fr on mobile) |
| Max content width | natural flow, hero max-width 680px for grids |
| Bottom tab bar | fixed bottom, 640px and below only |
| Page header | sticky top:64px, z-index:90, blur backdrop |

## Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| Logo, headings, quotes | 'Gowun Batang', serif | clamp(20px, 2.2vw, 30px) for h1 | 700 |
| Body, UI, labels | 'Noto Sans KR', sans-serif | 13-14px body, 12-13px labels | 400-700 |
| Card title (h3) | 'Noto Sans KR' | 14.5px | 800 |
| Small labels | 'Noto Sans KR' | 10-11px | 700, letter-spacing .08em |
| Line height | -- | -- | 1.72 (body), 1.3 (headings) |

**Rules:**
- `letter-spacing: -.2px` to `-.3px` for Korean headings (tighter is more natural)
- `word-break: keep-all` on all Korean paragraph text
- Never use font-size below 10px

## Component Specifications

See `references/component-library.md` for full HTML/CSS specs.

### Key Components
- **Cards** (`.card`, `.card.full`, `.card.cbg-*`) -- 16px radius, 22px/24px padding
- **Buttons** (`.gobtn`, `.pill`, `.sos-btn`, `.emer-btn`) -- rounded, cubic-bezier hover
- **Accordion** (`.accordion-item`, `.acc-section`) -- two variants exist
- **Check Tool** (`.check-tool`, `.check-item`) -- situation assessment with branching results
- **Action Checklist** (`.action-item`) -- toggleable action items with done state
- **Emergency buttons** (`.emergency-call-big`, `.emer-btn`) -- large, high-contrast, tel: links
- **Modal** (`.modal-overlay`, `.modal`) -- frosted glass, 24px radius

## Color System

See `references/design-tokens.md` for the complete token table.

### Quick Reference
- **Background**: cream `#F7F3EE` (warm neutral beige)
- **Primary**: calm blue `#7BAECB` (trust/stability)
- **Accent**: healing green `#6BA885` (growth/recovery)
- **Text**: ink `#3A3A3A` / ink-m `#6B6B6B` / ink-l `#9A9A9A`
- **Domain colors**: burnout=amber, relation=terracotta, transition=teal, self=green

### Rules
- **Never hardcode colors** -- always use CSS variables
- Card color variants use subtle gradients: `linear-gradient(145deg, light, lighter)`
- Emergency colors are the only place where saturated reds are permitted
- Hover states lighten or shift toward the primary blue

## Animation & Motion

See `references/motion-system.md` for keyframes and timing.

- Page entry: staggered `@keyframes up` (translateY 16px -> 0, opacity 0 -> 1)
- Card hover: `cubic-bezier(.34,1.56,.64,1)` (slight overshoot)
- Modal: `cubic-bezier(.34,1.2,.64,1)` (slide up)
- Accordion body: `max-height` transition 0.35s ease
- **Always** respect `prefers-reduced-motion: reduce`

## Accessibility Checklist

- [ ] Touch targets >= 44px on all interactive elements
- [ ] `tel:` links on all phone numbers
- [ ] `aria-label` on icon-only buttons
- [ ] `role="dialog"` and `aria-label` on modals/panels
- [ ] `tabindex="0"` on accordion headers
- [ ] Focus-visible styles (outline or box-shadow)
- [ ] Color contrast: text on cards must meet WCAG AA (4.5:1 for normal text)
- [ ] `word-break: keep-all` on Korean text blocks
- [ ] No content conveyed by color alone (always pair with text/icon)

## Gotchas

1. **Two accordion systems exist**: `.accordion-item` (max-height transition) and `.acc-section` (display:none toggle). Use `.accordion-item` for new work.
2. **Sidebar is hidden**: `.tl-sidebar { display: none !important }` -- do not add sidebar content.
3. **Card animations**: `.card` has staggered animation delays up to 8 children. Inside `.acc-body`, card animation is `none`.
4. **Mobile bottom padding**: `body { padding-bottom: 72px }` at 640px for tab bar clearance.
5. **Emergency pages**: Use `#FAFAFA` background, not `--cream`. Remove decorative gradients.
6. **Teen pages**: Dark mode (`#1A1F3A` bg), cool-tone blues, different text colors.
7. **CSS variable naming**: Legacy names persist (e.g., `--peach` is actually blue, `--amber` is green). Follow existing names.

## Emotional Design

See `references/emotional-design.md` for psychology and tone guidelines.

## Crisis UX

See `references/crisis-ux.md` for emergency page patterns, quick-exit spec, and cognitive impairment design.

## 관련 스킬
- 콘텐츠 작성 시 → `beinside-writing` 스킬 병행
- 안전 관련 UI 시 → `beinside-safety` 스킬의 references/crisis-ux-patterns.md 필수 참조
