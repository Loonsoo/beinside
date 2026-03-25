# BeInside 디자인 토큰 레퍼런스

> 출처: `css/base.css` :root, `css/dark.css` [data-theme="dark"]

---

## 간격 시스템 (8px 기반)

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--sp-1` | `8px` | 아이콘-텍스트 간격, 인라인 패딩 |
| `--sp-2` | `16px` | 카드 내부 패딩, 항목 간격 |
| `--sp-3` | `24px` | 섹션 내부 여백 |
| `--sp-4` | `32px` | 섹션 간 여백 |
| `--sp-6` | `48px` | 대 섹션 간 여백 |
| `--sp-8` | `64px` | 히어로/페이지 상하 여백 |

### 구 시맨틱 간격 → 신규 매핑

| 구 토큰 | 구 값 | 신 값 | 비고 |
|---------|-------|-------|------|
| `--space-md` | 22px | **16px** (`--sp-2`) | 과도한 패딩 제거 |
| `--space-lg` | 24px | **20px** | 살짝 줄임 |
| `--space-xl` | 48px | **32px** (`--sp-4`) | 불필요한 빈 공간 제거 |
| `--space-2xl` | 60px | **40px** | 모바일에서 과하지 않게 |

> 새 코드에서는 `--sp-*` 토큰만 사용한다. 구 시맨틱 토큰은 점진적으로 제거 예정.

---

## 배경 & 서피스

### 라이트 모드

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--cream` | `#F7F3EE` | 기본 배경 (Warm Neutral Beige) |
| `--warm` | `#EEE9E3` | 약간 깊은 베이지 (대안 배경) |
| `--white` | `#FFFFFF` | 카드, 콘텐츠 박스 |
| `--section-alt` | `#F2EEE8` | 교차 섹션 배경 |
| `--bg-primary` | `#F7F3EE` | = `--cream` |
| `--bg-elevated` | `#FFFFFF` | = `--white` |
| `--bg-sunken` | `#EEE9E3` | = `--warm` |

### 다크 모드

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--cream` | `#1C1C1E` | 기본 배경 |
| `--warm` | `#2C2C2E` | 약간 밝은 배경 |
| `--white` | `#3A3A3C` | 카드 배경 |
| `--section-alt` | `#1E1E20` | 교차 섹션 |
| `--bg-primary` | `#1C1C1E` | 기본 배경 |
| `--bg-elevated` | `#2C2C2E` | 카드/모달 |
| `--bg-sunken` | `#161618` | 가장 깊은 배경 |

---

## Calm Design Tokens

| 토큰 | 라이트 | 다크 |
|------|--------|------|
| `--calm-bg-deep` | `#F8F6F3` | `#1A1A1C` |
| `--calm-bg-surface` | `#FFFFFF` | `#2C2C2E` |
| `--calm-bg-elevated` | `#FDFBF9` | `#363638` |
| `--calm-warm` | `#D4A07A` | `#D4A07A` |
| `--calm-warm-soft` | `#E8C8A8` | `#E8C8A8` |
| `--calm-text-1` | `#3A3A3A` | `#F5F5F7` |
| `--calm-text-2` | `rgba(58,58,58,.58)` | `rgba(255,255,255,.65)` |
| `--calm-text-3` | `rgba(58,58,58,.35)` | `rgba(255,255,255,.40)` |
| `--calm-border` | `rgba(0,0,0,.05)` | `rgba(255,255,255,.06)` |
| `--calm-shadow` | `0 1px 8px rgba(0,0,0,.04)` | `0 1px 6px rgba(0,0,0,.20)` |
| `--calm-shadow-hover` | `0 4px 20px rgba(0,0,0,.07)` | `0 4px 16px rgba(0,0,0,.25)` |
| `--calm-r` | `20px` | (동일) |
| `--calm-ease` | `cubic-bezier(0.25,0.1,0.25,1.0)` | (동일) |
| `--calm-ease-out` | `cubic-bezier(0.22,1,0.36,1)` | (동일) |
| `--calm-dur` | `400ms` | (동일) |
| `--calm-dur-slow` | `500ms` | (동일) |

---

## Primary 색상 (Soft Calm Blue)

| 토큰 | 라이트 | 다크 | 용도 |
|------|--------|------|------|
| `--peach` / `--primary` | `#7BAECB` | `#7BAECB` | 인터랙티브 블루 |
| `--peach-l` | `#A8CADF` | `#5A8EAB` | hover 상태 |
| `--peach-p` / `--primary-p` | `#DCEBFF` | `rgba(123,174,203,.12)` | 페일 블루 (버튼 bg) |
| `--peach-d` / `--primary-d` | `#4A8CAA` | `#9AC4DD` | 텍스트 강조 |
| `--peach-glow` | `rgba(123,174,203,.18)` | `rgba(123,174,203,.15)` | 글로우 효과 |

---

## 텍스트 색상

| 토큰 | 라이트 | 다크 | 용도 |
|------|--------|------|------|
| `--ink` | `#3A3A3A` | `#F5F5F7` | 기본 텍스트 |
| `--ink-m` | `#6B6B6B` | `#A1A1A6` | 보조 텍스트 |
| `--ink-l` | `#9A9A9A` | `#636366` | 약한 텍스트 |
| `--text-primary` | `#3A3A3A` | `#F5F5F7` | = `--ink` |
| `--text-secondary` | `#6B6B6B` | `#A1A1A6` | = `--ink-m` |
| `--text-tertiary` | `#9A9A9A` | `#636366` | = `--ink-l` |

---

## Accent & Area 색상

### 고정 액센트

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--amber` | `#6BA885` | Healing Green (인터랙티브) |
| `--rust` | `#3D7A5C` (라이트) / `#8CCAA5` (다크) | 다크 힐링 그린 |
| `--plum` | `#8A7A6A` | Muted tertiary |
| `--plum-p` | `#EFE8E0` | Muted tertiary 페일 |
| `--sky` | `#6CA0C8` | Sky 블루 |

### 영역 — 나 자신 (Healing Green)

| 토큰 | 라이트 | 다크 |
|------|--------|------|
| `--lavender` | `#6BA885` | `#6BA885` |
| `--lavender-d` | `#3D7A5C` | `#8CCAA5` |
| `--lavender-p` | `#DFF3E9` | `rgba(107,168,133,.12)` |
| `--lavender-bg` | `#EBF7F0` | `rgba(107,168,133,.08)` |

### 영역 — 번아웃

| 토큰 | 라이트 | 다크 |
|------|--------|------|
| `--burnout` | `#C0892A` | `#D4A040` |
| `--burnout-d` | `#8A6018` | `#E0B860` |
| `--burnout-p` | `#FBF0D8` | `rgba(212,160,64,.10)` |

### 영역 — 관계

| 토큰 | 라이트 | 다크 |
|------|--------|------|
| `--relation` | `#B05A42` | `#C8705A` |
| `--relation-d` | `#8A3E28` | `#DCA090` |
| `--relation-p` | `#F5E4DC` | `rgba(200,112,90,.10)` |

### 영역 — 전환기

| 토큰 | 라이트 | 다크 |
|------|--------|------|
| `--transition-c` | `#4A8888` | `#60A8A8` |
| `--transition-d` | `#2E6060` | `#80C8C8` |
| `--transition-p` | `#DFF0EE` | `rgba(96,168,168,.10)` |

---

## 상황 카드 색상

| 계열 | 메인 | 배경 | 활성 | 텍스트 |
|------|------|------|------|--------|
| Rose | `#E09090` | `#FFF5F3` | `#FFEBEA` | `#A03030` |
| Blue | `#90A8D0` | `#F3F6FF` | `#E8EEFF` | `#304880` |
| Gold | `#D4A054` | `#FEF6E4` | `#FEF0D0` | `#7A5010` |
| Plum | `#B090C0` | `#F6F0FA` | `#EDE0F8` | `#503068` |

---

## 시맨틱 태그 색상

| 계열 | 배경 | 라이트 ink | 다크 ink |
|------|------|------------|----------|
| Rose | `rgba(200,80,80,.11)` | `#A02828` | `#E08080` |
| Blue | `rgba(60,100,200,.11)` | `#2848A8` | `#80A8E0` |
| Green | `rgba(60,140,90,.11)` | `#226B38` | `#70C090` |
| Gold | `rgba(200,150,50,.11)` | `#7A5010` | `#D0B060` |

---

## 체크 결과 색상

| 수준 | 라이트 | 라이트 ink | 다크 | 다크 ink |
|------|--------|------------|------|----------|
| high | `#C05050` | `#7A1818` | `#E07070` | `#F0A0A0` |
| mid | `#C89040` | `#7A5010` | `#D4A040` | `#E0C070` |
| low | `#3A8A50` | `#1E5A30` | `#60B080` | `#90D0A0` |

---

## 긴급 색상

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--emer-119` | `#C8302A` | 119 소방/구급 |
| `--emer-112` | `#A02020` | 112 경찰 |
| `--emer-109` | `#6A3A9A` | 109 자살예방 |
| `--emer-1388` | `#2A7A4A` | 1388 청소년 |
| `--emer-1366` | `#C84A8A` | 1366 여성긴급 |
| `--emer-1577` | `#2A5A9A` | 1577 정신건강 |
| `--emer-bg` | `#FFF0F0` / 다크: `rgba(200,60,60,.10)` | 긴급 배너 배경 |
| `--emer-border` | `rgba(200,60,60,.25)` / 다크: `rgba(200,60,60,.30)` | 긴급 배너 테두리 |

### 긴급 버튼 그라데이션

```css
--emer-red-grad:    linear-gradient(135deg, #E84040, #C82020);
--emer-purple-grad: linear-gradient(135deg, #7A40C8, #5A28A0);
--emer-green-grad:  linear-gradient(135deg, #2A9060, #1A7050);
--emer-blue-grad:   linear-gradient(135deg, #2060B8, #1848A0);
```

---

## 연령 단계 색상

```css
--age-newborn:     #A8D5BA;   /* 신생아 */
--age-3m:          #7FC49A;   /* 3개월 */
--age-6m:          #5BBF82;   /* 6개월 */
--age-12m:         #3A8A55;   /* 12개월 */
--age-24m:         #2A6A42;   /* 24개월 */
--age-preschool:   #5C7A6B;   /* 유아 */
--age-school:      #C8924A;   /* 학령기 */
--age-teen:        #A07840;   /* 청소년 */
--age-young:       #7A5A30;   /* 청년 */
--age-adult:       #9E4F2A;   /* 성인 */
--age-middle:      #6B4E7A;   /* 중년 */
--age-senior:      #3A6A9A;   /* 노년 */
--age-late-senior: #2A3A5A;   /* 후기 노년 */
```

---

## 글래스모피즘

| 토큰 | 라이트 | 다크 |
|------|--------|------|
| `--glass-bg` | `rgba(255,255,255,0.82)` | `rgba(30,30,32,.88)` |
| `--glass-border` | `rgba(0,0,0,0.04)` | `rgba(255,255,255,.05)` |
| `--glass-shadow` | `0 1px 4px rgba(0,0,0,.03), inset 0 1px 0 rgba(255,255,255,.8)` | `0 1px 4px rgba(0,0,0,.20)` |

### header 적용 예시

```css
header {
  background: rgba(247,243,238,.85);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border-bottom: 1px solid rgba(0,0,0,0.04);
}
[data-theme="dark"] header {
  background: rgba(28,28,30,.85);
  border-bottom-color: rgba(255,255,255,.04);
}
```

---

## 타이포그래피

| 용도 | 기본 크기 | 폰트 | 굵기 |
|------|-----------|-------|------|
| 히어로 제목 | `clamp(22px, 3vw, 32px)` | Gowun Batang | 700 |
| 섹션 제목 | 18px | Gowun Batang | 700 |
| 카드 제목 | 15px | Noto Sans KR | 700 |
| 본문 | 15px (Dynamic Type 적용) | Noto Sans KR | 400 |
| 보조 텍스트 | 13px | Noto Sans KR | 400 |
| 라벨/뱃지 | 11px | Noto Sans KR | 700 |
| 긴급 본문 | 17px (Dynamic Type 적용) | Noto Sans KR | 400~700 |

### Dynamic Type

```css
:root { --text-scale: 0; }
body { font-size: clamp(15px, calc(15px + var(--text-scale) * 2px), 21px); }
.crisis-page { font-size: clamp(17px, calc(17px + var(--text-scale) * 2px), 23px); }
```

### 폰트 스택

```css
body { font-family: 'Noto Sans KR', sans-serif; line-height: 1.72; }
.logo { font-family: 'Gowun Batang', serif; font-size: 18px; font-weight: 700; }
```

---

## 청소년 테마

```css
--teen-bg:      #1A1F3A;
--teen-bg-deep: #12172E;
--teen-card-bg: linear-gradient(135deg, #F0F2FF, #EAF0FF);
--teen-accent:  #5B7CFA;
--teen-text:    #8090C0;
```

---

## 특수 용도

| 토큰 | 라이트 | 다크 | 용도 |
|------|--------|------|------|
| `--disclaimer-bg` | `#F3F7FF` | `rgba(60,80,128,.15)` | 의학적 면책 |
| `--disclaimer-border` | `#D1E1FF` | `rgba(60,80,128,.25)` | 면책 테두리 |
| `--disclaimer-ink` | `#304880` | `#90A8D0` | 면책 텍스트 |
| `--sos` | `#2A6A60` | `rgba(200,60,60,.15)` | SOS 버튼 |
| `--sos-shadow` | `rgba(42,106,96,0.3)` | `rgba(200,60,60,.10)` | SOS 그림자 |
| `--footer-bg` | `#2C2C2C` | `#15171C` | 푸터 배경 |
| `--footer-bg-end` | `#3A3A3A` | `#1A1D23` | 푸터 그라데이션 끝 |
| `--tl-w` | `200px` | - | 타임라인 너비 |
| `--calm-r` | `20px` | - | 기본 border-radius |
