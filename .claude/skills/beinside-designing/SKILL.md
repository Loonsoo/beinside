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

**영감의 원천**: Calm App × 일본 디자인 철학 (間 · 余白 · 侘寂)

### 4가지 디자인 원칙

**1. 間 Ma (여백은 숨이다) — 일본 공간 철학**
- 여백은 "비어 있는 것"이 아니라 "의미가 머무는 곳"이다
- 콘텐츠 간 충분한 수직 여백으로 사용자가 읽은 내용을 소화할 시간을 준다
- 화면의 40~60%는 의도적으로 비워둔다
- 한 화면에 하나의 핵심 메시지만 전달한다
- 콘텐츠:여백 비율 목표 = 약 50:50 (절대 70:30을 초과하지 않는다)
- 무거운 감정 콘텐츠 뒤에는 반드시 추가 여백을 삽입한다

**2. 静けさ Shizukesa (고요한 안심) — Calm App 철학**
- "기쁨(delight)"이 아니라 "안심(relief)"을 디자인한다
- 화면이 "정보를 쏟아붓는" 것이 아니라 "조용히 옆에 앉아 건네는" 느낌
- 애니메이션은 호흡처럼 — 나타남(300~500ms) → 멈춤 → 사라짐
- 색상은 자연에서 온 낮은 채도, 부드러운 전환
- 절대 사용자를 놀라게 하거나 급하게 느끼게 하지 않는다
- "아무것도 안 해도 괜찮다"를 여백과 톤으로 표현한다

**3. 侘寂 Wabi-sabi (불완전함의 따뜻함)**
- 지나치게 매끈한 UI보다 "사람이 있는 느낌"의 온기를 추구한다
- 완벽한 기하학적 그리드를 고집하지 않는다 — 자연스러운 흐름을 존중
- 사용자의 불완전한 입력(짧은 답변, 중도 이탈)을 자연스럽게 수용하는 흐름
- Gowun Batang 서체의 붓글씨 같은 질감이 이 원칙을 체현한다

**4. Safety (안전) — Crisis UX**
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

## Animation & Motion — "호흡하는 모션"

See `references/motion-system.md` for keyframes and timing.

### 핵심 원칙: 페이드 > 슬라이드, 느림 > 빠름
- 요소가 "밀려오는" 것보다 "서서히 드러나는" 느낌을 선호한다
- 서구 표준(200~300ms)보다 약간 느린 300~500ms 트랜지션으로 "여유" 부여
- 순차적 등장: 요소들이 한꺼번에 나타나지 않고 50~80ms 간격으로 stagger

### 타이밍
- Page entry: staggered `@keyframes up` (translateY 16px -> 0, opacity 0 -> 1), 50ms stagger
- Card hover: `cubic-bezier(.34,1.2,.64,1)` — 과도한 바운스 금지, 자연스러운 감속만
- Modal: `cubic-bezier(.34,1.2,.64,1)` (slide up), 300ms
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
