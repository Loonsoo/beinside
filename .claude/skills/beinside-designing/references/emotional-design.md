# BeInside Emotional Design Principles

## Core Design Emotion

**"따뜻하지만 가볍지 않은, 전문적이지만 차갑지 않은"**

(Warm but not lightweight, professional but not cold)

BeInside serves people in vulnerable moments -- new parents anxious about their child's development, someone in burnout, a teenager feeling alone, an elder caregiver on the edge. Every visual choice must answer: "Does this make someone in pain feel safer?"

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

## Whitespace as Breathing Room

Whitespace in BeInside is not "empty space" -- it is deliberate emotional decompression.

### Principles
1. **Between sections**: 28-36px padding creates natural pauses, like breathing between difficult topics
2. **Inside cards**: 22-24px padding gives content room to be absorbed without cognitive overload
3. **Hero section**: Generous padding (52px mobile, 48px desktop) allows the first question ("지금, 어떤 상황이세요?") to land gently
4. **Between checklist items**: 7px gap prevents "wall of text" anxiety in assessment tools

### Rules
- Never compress content to fit more on screen -- scrolling is acceptable; cognitive overload is not
- Card grids have 14px gap -- tight enough to show relationship, loose enough to breathe
- After heavy emotional content (crisis results, assessment warnings), add extra padding before next section

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

## Micro-Interactions as Care

### Card Hover (translateY -4px)
- **Intent**: The content "lifts" toward the user, meeting them halfway
- **Curve**: `cubic-bezier(.34,1.56,.64,1)` -- slight overshoot feels alive, not mechanical

### Accordion Open
- **Intent**: Content unfolds gently, not instantly -- respects the weight of the information
- **Timing**: 0.35s -- fast enough to not feel slow, slow enough to register

### Check Item Toggle
- **Intent**: The checkmark fills in smoothly, providing a small "accomplishment" feeling
- **Color**: Blue check for assessment, green check for action items completed

### Emergency Button Hover
- **Intent**: Rises and gains shadow -- communicates "this is ready for you to press"
- **No playful overshoot** -- emergency buttons use simpler transitions

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
