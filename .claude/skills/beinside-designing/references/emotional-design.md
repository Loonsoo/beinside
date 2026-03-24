# BeInside Emotional Design Principles

## Core Design Emotion

**"고요한 안심 — 아무것도 안 해도 괜찮다고 느끼게 하는 공간"**

영감: Calm App (Calm Technology) × 일본 디자인 철학 (間 Ma · 余白 Yohaku · 侘寂 Wabi-sabi)

BeInside serves people in vulnerable moments. Every visual choice must answer:
1. "이 여백은 숨 쉴 공간을 주는가?" (間 Ma)
2. "비워둔 공간이 채워진 공간만큼 의미를 전하는가?" (余白 Yohaku)
3. "이 디자인이 '완벽하게 해야 한다'는 압박 대신 '있는 그대로 괜찮다'는 메시지를 주는가?" (侘寂 Wabi-sabi)
4. "이 화면이 사용자를 놀라게 하거나 급하게 만드는가?" (静けさ Shizukesa)

---

## Color Psychology

### Primary: Calm Blue (`--peach: #7BAECB`)
- **Psychology**: Trust, stability, reliability
- **Usage**: Primary interactions, borders, active states
- **Effect**: Signals "this is a trustworthy space" without being clinical
- **Note**: Named `--peach` for legacy reasons (originally a warm peach tone, redesigned to calm blue)

### Accent: Healing Green (`--amber: #6BA885`)
- **Psychology**: Growth, recovery, nature, healing
- **Usage**: Self-care section, accent buttons, scroll bar gradient
- **Effect**: Communicates renewal and the possibility of getting better
- **Note**: Named `--amber` for legacy reasons

### Domain Colors

| Domain | Color | Token | Psychological Intent |
|--------|-------|-------|---------------------|
| Self/Emotion | Healing Green | `--lavender` | Growth, self-nurture, "your own garden" |
| Burnout | Amber/Gold | `--burnout` | Gentle warning, warmth in exhaustion |
| Relationship | Terracotta | `--relation` | Earthiness, grounding after loss |
| Life Transition | Teal | `--transition-c` | Calm water, navigation through change |
| Youth/Teen | Cool Indigo | `#5B7CFA` | "나만의 공간" -- my own cool, private space |
| Emergency | Red | `--emer-119` | Urgency without panic, clear action |

### Background: Warm Beige (`--cream: #F7F3EE`)
- **Psychology**: Living room warmth, being welcomed
- **Effect**: Unlike clinical white, beige says "you're at home here"
- Emergency pages break this rule intentionally (see below)

---

## 余白 Yohaku — 의미 있는 비어 있음

"그리지 않은 부분이 그린 부분만큼 중요하다" — 서예와 수묵화의 원칙을 디지털에 적용한다.
Whitespace in BeInside is not "empty space" -- it is where meaning rests.

### 핵심 수치
1. **화면 비율**: 콘텐츠:여백 = 약 50:50을 목표로 한다 (절대 70:30 초과 금지)
2. **섹션 간 여백**: 36~48px — 사용자가 읽은 내용을 소화하는 "멈춤(Ma)"의 시간
3. **카드 내부 padding**: 24~32px — 콘텐츠가 카드 안에서 "숨 쉬는" 느낌
4. **Hero section**: 52px+ — 첫 질문("지금, 어떤 상황이세요?")이 부드럽게 착지하는 공간
5. **체크리스트 아이템 간**: 8~10px — "정보의 벽" 불안을 방지
6. **무거운 콘텐츠 뒤**: 반드시 추가 여백 삽입 — 감정적 감압 공간

### 체크리스트
- [ ] 카드 내부 콘텐츠:여백 비율이 50:50에 가까운가?
- [ ] 스크롤하지 않고 보이는 첫 화면이 "조용하고 넉넉한" 느낌인가?
- [ ] 한 화면에 핵심 메시지가 하나만 있는가?
- [ ] 위기 결과·경고 뒤에 충분한 여백이 있는가?
- Never compress content to fit more on screen -- scrolling is acceptable; cognitive overload is not

---

## Typography as Tone of Voice

### Heading Font: 'Gowun Batang' (serif)
- **Emotional role**: The gentle, thoughtful voice
- **Where**: Hero titles, page titles, large numbers, quotes
- **Effect**: Serif warmth says "someone caring wrote this for you"

### Body Font: 'Noto Sans KR' (sans-serif)
- **Emotional role**: The clear, reliable guide
- **Where**: All body text, UI elements, labels
- **Effect**: Clean readability says "you can trust this information"

### Tone in Typography
- Korean headings use **negative letter-spacing** (-.2px to -.3px) -- tighter spacing feels more natural in Korean, less like a signpost
- `word-break: keep-all` preserves Korean word boundaries, preventing mid-word breaks that feel jarring during emotional reading
- Line height 1.72 for body text -- slightly above standard for easier reading during stress

---

## Emergency Pages: Stripped Design

When someone is in crisis, decorative elements become noise.

### Rules for Emergency/Crisis Pages
1. **Background**: `#FAFAFA` (near-white), not `--cream` -- removes warmth in favor of clarity
2. **No gradient decorations** -- no `::before` background radials
3. **Large touch targets** -- minimum 100px height for phone call buttons
4. **High contrast** -- white text on saturated color backgrounds for emergency buttons
5. **Minimal choices** -- 4-6 options maximum on emergency grid
6. **Direct action only** -- every element must lead to a phone call, a specific action, or immediate information

### Crisis Screen (suicidal ideation)
- White background, centered layout
- Large serif text (Gowun Batang, 18px)
- Only 1-2 phone numbers prominently displayed
- No navigation clutter, no sidebar, no decorative elements
- Message is connection-focused: "당신의 이야기를 들을 사람이 있어요"

---

## Youth Pages: Cool-Tone Private Space

Teen/youth pages use a completely different visual atmosphere.

### Design Rationale
- Dark background (`#1A1F3A`) = "나만의 공간" (my own space)
- Cool indigo tones signal privacy and independence
- Adults use warm beige; teens get their own distinct visual identity
- Typography is slightly more casual (larger body text, more spacing)

### Specific Choices
- Background: dark navy gradient (`#1A1F3A` to `#12172E`)
- Text: muted lavender blues (`#B0BAEE`, `#9AA2CC`)
- Accent: electric indigo (`#5B7CFA`)
- Cards: frosted dark glass (`rgba(255,255,255,.06)`)
- Privacy notice included: "기록 없이, 흔적 없이"

---

## Micro-Interactions — "호흡하는 모션"

일본 디자인의 リズム(rhythm): 나타남 → 멈춤 → 사라짐. Calm App의 원칙: 모션은 호흡처럼.

### Card Hover (translateY -4px, 300ms)
- **Intent**: The content "lifts" gently, like a breath
- **Curve**: `cubic-bezier(.34,1.2,.64,1)` — 과도한 바운스 없이 자연스러운 감속만
- **절대 금지**: `.56` 이상의 overshoot 곡선 — 놀람 유발

### Accordion Open (0.35s)
- **Intent**: Content unfolds gently — "서서히 드러남", not "팝업 등장"
- **Timing**: 350ms ease — 너무 빠르면 놀라고, 너무 느리면 답답

### Page Transition (fade, 300~500ms)
- **Intent**: 페이지 간 미세한 딜레이로 경험에 리듬감 부여
- **Pattern**: fadeOut(200ms) → pause(100ms) → fadeIn(300ms) — 間(Ma)의 디지털 구현

### Emergency Button Hover
- **Intent**: Rises and gains shadow -- communicates "this is ready for you to press"
- **No playful overshoot** -- emergency buttons use simpler, faster transitions

---

## Content Writing Tone (Design Implications)

The writing tone directly affects design choices:

| Tone Rule | Design Implication |
|-----------|-------------------|
| "~해 보세요" (gentle suggestion) | Buttons use soft colors, not aggressive CTAs |
| No judgment | No red/green pass/fail unless medically necessary |
| 반말/해요체 for youth | Teen pages have distinct visual treatment |
| Phone numbers always linked | Every `tel:` link needs a visible, tappable button |

---

## Anti-Patterns (What NOT to Do)

1. **Never use celebratory animations** (confetti, sparkles) -- users may be in distress
2. **Never use progress bars** that imply "you're not done yet" -- assessment tools should feel optional
3. **Never use red for non-emergency states** -- reserve red exclusively for crisis/emergency
4. **Never auto-play sounds or video** -- unexpected stimuli can trigger anxiety
5. **Never use "success/failure" language** in assessments -- use "현재 상태" (current state) framing
6. **Never show too many options at once** -- progressive disclosure through accordions
7. **Never use stock photos of smiling people** -- feels dismissive to someone in pain
