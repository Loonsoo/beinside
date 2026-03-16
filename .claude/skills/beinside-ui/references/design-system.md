# BeInside 디자인 시스템

`css/styles.css`의 `:root` 변수 전체 목록입니다.
새 색상 추가 시 이 문서와 `assets/css-variables.css`를 함께 업데이트하세요.

---

## 디자인 철학

> **"편안하고 따뜻한, 판단받지 않는 공간"**
> Calm · Warm · Safe · Minimal · Human

사용자는 정서적으로 취약한 상태일 수 있다. 화면은 조용히 옆에 앉아 필요한 것을 건네는 느낌이어야 한다.
강한 색 대비는 피하고, 눈의 피로를 줄이는 색 조합을 사용한다.

> **not clinical / not corporate / not social media**
> instead: quiet · supportive · human · soft

---

## 현재 테마: Calm 4.0

### CSS 변수 전체 목록

#### 배경 & 서피스

| 변수명 | 값 | 용도 |
|--------|----|------|
| `--cream` | `#F7F3EE` | 기본 배경 (Warm Neutral Beige) |
| `--warm` | `#EEE9E3` | 약간 깊은 베이지 |
| `--white` | `#FFFFFF` | 카드·콘텐츠 박스 (Soft White) |
| `--section-alt` | `#F2EEE8` | 교차 섹션 배경 |

#### Primary: Soft Calm Blue

| 변수명 | 값 | 용도 |
|--------|----|------|
| `--peach` | `#7BAECB` | 인터랙티브 블루 (링크, 보더) |
| `--peach-l` | `#A8CADF` | 밝은 블루 (hover) |
| `--peach-p` | `#DCEBFF` | 페일 블루 (버튼 bg, 하이라이트) |
| `--peach-d` | `#4A8CAA` | 다크 블루 (텍스트 강조) |
| `--peach-glow` | `rgba(123,174,203,.18)` | focus 글로우 링 |
| `--sage` | `var(--peach)` | alias |
| `--primary` | `#7BAECB` | 메인 액센트 |
| `--primary-d` | `#4A8CAA` | 다크 액센트 |
| `--primary-p` | `#DCEBFF` | 연한 액센트 배경 |

#### Accent: Healing Green

| 변수명 | 값 | 용도 |
|--------|----|------|
| `--amber` | `#6BA885` | Soft Healing Green (긍정·회복) |
| `--rust` | `#3D7A5C` | 다크 힐링 그린 |

#### Muted Tertiary

| 변수명 | 값 | 용도 |
|--------|----|------|
| `--plum` | `#8A7A6A` | 중립 브라운 |
| `--plum-p` | `#EFE8E0` | 연한 브라운 배경 |
| `--sky` | `#6CA0C8` | 스카이 블루 |

#### 텍스트

| 변수명 | 값 | 용도 |
|--------|----|------|
| `--ink` | `#3A3A3A` | Primary Text |
| `--ink-m` | `#6B6B6B` | Secondary Text |
| `--ink-l` | `#9A9A9A` | Muted Text |

#### 라인

| 변수명 | 값 | 용도 |
|--------|----|------|
| `--line` | `rgba(123,174,203,.15)` | 구분선·보더 |

#### 서피스 (클린 화이트 기반)

| 변수명 | 값 | 용도 |
|--------|----|------|
| `--glass-bg` | `rgba(255,255,255,0.95)` | 패널/모달 배경 |
| `--glass-border` | `rgba(0,0,0,0.06)` | 패널/모달 보더 |
| `--glass-shadow` | `0 2px 6px rgba(0,0,0,.05)` | 카드 그림자 |

#### 레이아웃

| 변수명 | 값 | 용도 |
|--------|----|------|
| `--tl-w` | `200px` | 타임라인 너비 (데스크톱) |

#### 콘텐츠 영역별 색상

| 변수명 | 값 | 용도 |
|--------|----|------|
| `--lavender` | `#6BA885` | 나 자신 영역 (Healing Green) |
| `--lavender-d` | `#3D7A5C` | 힐링 그린 다크 |
| `--lavender-p` | `#DFF3E9` | Soft Healing Green 페일 |
| `--lavender-bg` | `#EBF7F0` | 힐링 그린 배경 (self 섹션) |
| `--burnout` | `#C0892A` | 번아웃 (앰버 경고) |
| `--burnout-d` | `#8A6018` | 번아웃 다크 |
| `--burnout-p` | `#FBF0D8` | 번아웃 파스텔 |
| `--relation` | `#B05A42` | 관계 (Soft Terracotta) |
| `--relation-d` | `#8A3E28` | 관계 다크 |
| `--relation-p` | `#F5E4DC` | 관계 파스텔 |
| `--transition-c` | `#4A8888` | 전환기 (Soft Teal) |
| `--transition-d` | `#2E6060` | 전환기 다크 |
| `--transition-p` | `#DFF0EE` | 전환기 파스텔 |

---

## 카드 컴포넌트

```css
background: #FFFFFF;
border-radius: 16px;
padding: 22px 24px;
box-shadow: 0 2px 6px rgba(0,0,0,.05);
border: 1px solid rgba(0,0,0,.06);
```

## 카드 색상 변형 (cbg-*)

| 클래스 | 배경 | 용도 |
|--------|------|------|
| `.cbg-a` | 황금/앰버 톤 | 기본 강조 |
| `.cbg-s` | 힐링 그린 `#DFF3E9` | 성장·자연 |
| `.cbg-p` | 캄 블루 `#DCEBFF` | 정보·안내 |
| `.cbg-sky` | 스카이 블루 | 정보 |
| `.cbg-lavender` | 힐링 그린 | 차분한 내용 |
| `.cbg-mint` | 민트 그린 | 건강·긍정 |
| `.cbg-rose` | 소프트 테라코타 | 관계·가족 |
| `.cbg-teal` | 소프트 틸 | 전문·신뢰 |

---

## 버튼 디자인

**Primary Button**
```css
background: var(--peach-p);   /* #DCEBFF */
color: var(--ink);             /* #3A3A3A */
border-radius: 14px;
padding: 12px 20px;
```

**Secondary Button**
```css
background: #F1F1F1;
color: var(--ink);
border-radius: 14px;
```

---

## 폰트 스택

```css
font-family: 'Noto Sans KR', sans-serif;  /* 본문 */
font-family: 'Gowun Batang', serif;        /* 감성·인용 */
```

## 그림자 시스템

```css
/* 기본 카드 */
box-shadow: 0 2px 6px rgba(0,0,0,.05);
/* 카드 hover */
box-shadow: 0 8px 24px rgba(0,0,0,.10);
/* 플로팅 버튼 */
box-shadow: 0 4px 16px rgba(0,0,0,.18);
/* focus 링 */
box-shadow: 0 0 0 3px var(--peach-glow);
```
