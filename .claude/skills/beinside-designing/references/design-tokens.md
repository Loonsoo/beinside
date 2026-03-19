# BeInside Design Tokens

Complete CSS custom properties from `:root` in `css/styles.css`.

## Background & Surface

| Token | Value | Purpose | Where Used |
|-------|-------|---------|------------|
| `--cream` | `#F7F3EE` | Warm neutral beige, base page background | `body`, `.section-care` |
| `--warm` | `#EEE9E3` | Slightly deeper beige | `.modal-close` bg, `.section-alt` fallback, hover states |
| `--white` | `#FFFFFF` | Card/content box background | `.card`, `.pill`, form inputs, modals |
| `--section-alt` | `#F2EEE8` | Alternate section background | `.pills` bar, `.journal-privacy` |

## Primary: Calm Blue

| Token | Value | Purpose | Where Used |
|-------|-------|---------|------------|
| `--peach` | `#7BAECB` | Interactive blue (primary action) | Borders, icons, dot bullets, scroll bar |
| `--peach-l` | `#A8CADF` | Light blue (hover states) | Timeline dot shadow, scrollbar thumb |
| `--peach-p` | `#DCEBFF` | Pale blue (button bg, highlights) | `.gobtn:hover`, `.pill:hover`, `.peach-p` backgrounds, tags |
| `--peach-d` | `#4A8CAA` | Dark blue (text emphasis) | `.logo` color, `.card h3`, active nav, button text |
| `--peach-glow` | `rgba(123,174,203,.18)` | Glow/focus ring | Focus states, `.journal-textarea:focus` |

## Aliases

| Token | Value | Purpose |
|-------|-------|---------|
| `--sage` | `var(--peach)` | Legacy alias for primary |
| `--primary` | `#7BAECB` | Semantic alias for primary |
| `--primary-d` | `#4A8CAA` | Semantic alias for primary dark |
| `--primary-p` | `#DCEBFF` | Semantic alias for primary pale |

## Accent: Healing Green

| Token | Value | Purpose | Where Used |
|-------|-------|---------|------------|
| `--amber` | `#6BA885` | Soft healing green (interactive) | `.card.cbg-a` hover border, scroll bar gradient end |
| `--rust` | `#3D7A5C` | Dark healing green | `.card.cbg-a li strong`, `.source-drawer-header h2` |

## Muted Tertiary

| Token | Value | Purpose | Where Used |
|-------|-------|---------|------------|
| `--plum` | `#8A7A6A` | Warm brown-gray | `.sp-card.plum` bullets |
| `--plum-p` | `#EFE8E0` | Pale warm neutral | `.sp-card.plum` background |

## Sky

| Token | Value | Purpose | Where Used |
|-------|-------|---------|------------|
| `--sky` | `#6CA0C8` | Sky blue accent | `.hitem` border, `.card.cbg-sky` hover |

## Text

| Token | Value | Purpose | Where Used |
|-------|-------|---------|------------|
| `--ink` | `#3A3A3A` | Primary text | `body` color, headings, strong text |
| `--ink-m` | `#6B6B6B` | Secondary/muted text | Subtitles, descriptions, list items |
| `--ink-l` | `#9A9A9A` | Light/disabled text | Hints, timestamps, arrows, labels |

## Line

| Token | Value | Purpose | Where Used |
|-------|-------|---------|------------|
| `--line` | `rgba(123,174,203,.15)` | Border/divider color | Accordion borders, tab borders, form field borders |

## Glass Surface

| Token | Value | Purpose | Where Used |
|-------|-------|---------|------------|
| `--glass-bg` | `rgba(255,255,255,0.95)` | Frosted glass background | Cards with glass effect |
| `--glass-border` | `rgba(0,0,0,0.06)` | Subtle glass border | Card borders |
| `--glass-shadow` | `0 2px 6px rgba(0,0,0,.05), inset 0 1px 0 rgba(255,255,255,1)` | Glass shadow | Card box-shadow |

## Layout

| Token | Value | Purpose |
|-------|-------|---------|
| `--tl-w` | `0px` (overridden; originally `200px`) | Timeline sidebar width (now hidden) |

## Self Area (Healing Green)

| Token | Value | Purpose | Where Used |
|-------|-------|---------|------------|
| `--lavender` | `#6BA885` | Self-care area primary | `.sit-card.self-area:hover` border, `.cbg-lavender` hover |
| `--lavender-d` | `#3D7A5C` | Self-care area dark | `.section-self .section-title` |
| `--lavender-p` | `#DFF3E9` | Self-care area pale | `.sit-card.self-area .sit-icon` bg, `.emotion-btn.selected` |
| `--lavender-bg` | `#EBF7F0` | Self-care section background | `.section-self` background |

## Burnout (Amber)

| Token | Value | Purpose | Where Used |
|-------|-------|---------|------------|
| `--burnout` | `#C0892A` | Burnout warning color | Burnout page headers, badges |
| `--burnout-d` | `#8A6018` | Burnout dark | `.distinction-col.burnout .distinction-col-title` |
| `--burnout-p` | `#FBF0D8` | Burnout pale background | Burnout cards |

## Relation (Terracotta)

| Token | Value | Purpose | Where Used |
|-------|-------|---------|------------|
| `--relation` | `#B05A42` | Relationship theme color | `.card.cbg-rose` bullets |
| `--relation-d` | `#8A3E28` | Relation dark | Relation page headers |
| `--relation-p` | `#F5E4DC` | Relation pale background | Relation cards |

## Transition (Teal)

| Token | Value | Purpose | Where Used |
|-------|-------|---------|------------|
| `--transition-c` | `#4A8888` | Life transition teal | Transition page headers |
| `--transition-d` | `#2E6060` | Transition dark | Transition headings |
| `--transition-p` | `#DFF0EE` | Transition pale | Transition cards |

## Age Stage Colors

| Token | Value | Purpose |
|-------|-------|---------|
| `--age-newborn` | `#A8D5BA` | Newborn pill dot |
| `--age-3m` | `#7FC49A` | 3 months |
| `--age-6m` | `#5BBF82` | 6 months |
| `--age-12m` | `#3A8A55` | 12 months |
| `--age-24m` | `#2A6A42` | 24 months |
| `--age-preschool` | `#5C7A6B` | Preschool (4-6yr) |
| `--age-school` | `#C8924A` | School age |
| `--age-teen` | `#A07840` | Teen |
| `--age-young` | `#7A5A30` | Young adult |
| `--age-adult` | `#9E4F2A` | Adult |
| `--age-middle` | `#6B4E7A` | Middle age |
| `--age-senior` | `#3A6A9A` | Senior |
| `--age-late-senior` | `#2A3A5A` | Late senior |

## Emergency Button Colors

| Token | Value | Purpose |
|-------|-------|---------|
| `--emer-119` | `#C8302A` | 119 Fire/Ambulance |
| `--emer-112` | `#A02020` | 112 Police |
| `--emer-1393` | `#6A3A9A` | 1393 Suicide Prevention |
| `--emer-1388` | `#2A7A4A` | 1388 Youth Crisis |
| `--emer-1366` | `#C84A8A` | 1366 Domestic Violence |
| `--emer-1577` | `#2A5A9A` | 1577 Mental Health |

## Disclaimer

| Token | Value | Purpose |
|-------|-------|---------|
| `--disclaimer-bg` | `#F3F7FF` | Disclaimer background |
| `--disclaimer-border` | `#D1E1FF` | Disclaimer border |
| `--disclaimer-ink` | `#304880` | Disclaimer text |

## Emergency Banner

| Token | Value | Purpose |
|-------|-------|---------|
| `--emer-bg` | `#FFF0F0` | Emergency banner bg |
| `--emer-bg-deep` | `#FFE8E8` | Emergency banner gradient end |
| `--emer-border` | `rgba(200,60,60,.25)` | Emergency banner border |

## Card Color Variants

| Class | Background | Border | Hover Border-Top |
|-------|-----------|--------|-----------------|
| `.card` (default) | `#FFFFFF` | `rgba(0,0,0,.06)` | `var(--peach)` |
| `.card.cbg-a` | `linear-gradient(145deg, #FFFAF2, #FFF0DC)` | `rgba(200,144,64,.15)` | `var(--amber)` |
| `.card.cbg-s` | `linear-gradient(145deg, #EDFAF4, #DFF3E9)` | `rgba(107,168,133,.15)` | `var(--amber)` |
| `.card.cbg-p` | `linear-gradient(145deg, #EEF5FB, #DCEBFF)` | `rgba(123,174,203,.15)` | `var(--peach)` |
| `.card.cbg-sky` | `linear-gradient(145deg, #F0F5FA, #E4EFF8)` | `rgba(108,160,200,.15)` | `var(--sky)` |
| `.card.cbg-lavender` | `linear-gradient(145deg, #EDFAF4, #DFF3E9)` | `rgba(107,168,133,.15)` | `var(--lavender)` |
| `.card.cbg-mint` | `linear-gradient(135deg, #F0FAF5, #E4F5EC)` | `rgba(60,160,100,.15)` | -- |
| `.card.cbg-rose` | `linear-gradient(135deg, #F5EDE4, #ECDDD0)` | `rgba(184,92,66,.15)` | -- |
| `.card.cbg-teal` | `linear-gradient(135deg, #EEF8FA, #E0F2F6)` | `rgba(50,140,160,.15)` | -- |
