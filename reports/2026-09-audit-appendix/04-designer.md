# BeInside UX/UI 디자인 감사 — 04. 디자이너 관점

- 감사 범위: `index.html`, `css/styles.css`(2,965줄 전체), `js/render.js`, `js/features.js`, `js/emotion-page.js`, `js/self-pages.js`, `js/profiles.js` (+ 확인용 `js/app.js`, `js/utils.js`, `js/data.js`)
- 기준: 공식 원칙 calm / warm / safe / minimal / human, 최대 너비 720px, 카드 radius 16px, 본문 16–18px, WCAG 2.1 AA
- 참고 문서: `.claude/skills/beinside-ui/SKILL.md`, `references/design-system.md`, `mobile-ux.md`, `accessibility.md`
- 코드는 수정하지 않았습니다. 대비비는 WCAG 상대휘도 공식으로 직접 계산했습니다. 반투명 색은 실제 배경과 합성한 값입니다.

---

## 1. 요약

BeInside의 **정보 구조와 톤**은 정서적으로 취약한 사용자에게 맞게 잘 짜여 있습니다. "지금, 어떤 상황이세요?"로 시작하는 진입, 결과를 두 단계로 나눠 보여주는 방식, 자해 문항을 체크하면 바로 1393으로 넘어가는 로직, 위기 화면의 행동 하나 중심 설계가 대표적입니다. 반면 **시각 시스템은 네 번의 테마 교체가 층층이 쌓인 상태**이고, 공식 스펙과 수치상 크게 어긋납니다.

| 항목 | 공식 스펙 | 실제 | 차이 |
|---|---|---|---|
| 본문 폰트 | 16–18px | 가장 흔한 값 **13px(63회)**, 카드 본문 13.5px, 상황 카드 제목 13px, 부제 11px. `font-size` 선언 268개 중 **215개(80%)가 16px 미만** | −3 ~ −5px |
| 최대 콘텐츠 너비 | 720px | `.main-col`에 max-width **없음**. 상황 그리드만 680px, 나머지(성장 결과, 긴급 허브, 가이드 페이지)는 화면 전체 폭 | 1440px 화면에서 카드 한 줄이 약 1,300px |
| 카드 radius | 16px | `border-radius` 값이 **17종류**(2–30px). 16px은 142개 중 13개(9%). 12px(24회)·20px(21회)·14px(19회)이 더 많음 | 기준값이 사실상 없음 |
| 색 토큰 | Calm 4.0 | `--peach`=파랑, `--amber`·`--lavender`=초록. `:root` 밖의 하드코딩 hex **241개**(CSS)와 `rgba(` **302개**. 인라인 `style=""` **153개**(HTML 58 + JS 95) | 시스템이 이름만 남음 |
| 대비 | AA 4.5:1 | Muted 텍스트 `#9A9A9A`/`#F7F3EE` = **2.55:1**, 흰 글씨/`#7BAECB` = **2.40:1**, 청소년 페이지 제목 **1.13:1** | 핵심 텍스트 여러 곳이 실패 |
| 포커스·모션 | `:focus-visible`, `prefers-reduced-motion` 필수 | **둘 다 0건** | 없음 |

**문서 자체도 서로 모순됩니다.** `SKILL.md`에는 아직 "피치/살구 톤", 본문 13–14px, 카드 18px, 최대 880px이 적혀 있고, `design-system.md`는 Calm 4.0과 16px 카드를 말합니다. 사용자가 제시한 공식 스펙(720px, 본문 16–18px)은 어느 문서에도 수치로 적혀 있지 않습니다. 앞으로 작업할 사람이 참고할 기준이 셋으로 갈라진 것이 테마 잔재가 계속 쌓이는 근본 원인입니다.

---

## 2. 잘한 점 (유지해야 할 결정)

| # | 결정 | 위치 | 왜 효과적인가 |
|---|---|---|---|
| G1 | **정보 2단계 공개**: "이 시기 핵심 3가지" 요약 → 11개 아코디언(첫 섹션만 열림) | `render.js:502-542` | 불안한 부모가 처음 보는 정보를 3줄과 경고 1줄로 제한합니다. 정보 과부하를 막는 올바른 패턴입니다. |
| G2 | **위기 화면의 단일 행동 설계**: 인정하는 문장 → 1393 큰 버튼(tel:) → "이 페이지를 닫지 말고 잠시만 있어주세요" | `emotion-page.js:203-232` | 위기 순간에 선택지를 없애고 가장 가까운 행동 하나를 제시합니다. 문장이 판단하지 않습니다("여기까지 온 것만으로도 용기 있는 일"). |
| G3 | **자해 문항 우선 처리**: `emergencyIndex` 문항을 체크하면 점수 계산 없이 바로 1393 결과를 표시 | `features.js:60-66` | 안전이 점수보다 우선입니다. 설계가 옳습니다. |
| G4 | 체크 툴의 접근성: `role="checkbox"`, `aria-checked`, `tabindex`, Enter/Space 처리 | `features.js:42-72` | 코드베이스에서 가장 접근성이 좋은 컴포넌트입니다. **다른 컴포넌트가 따라야 할 기준**입니다. |
| G5 | 모든 핵심 번호를 `tel:` 링크로 제공(긴급 허브 6개, 청소년 SOS 3개, help-card) + `aria-label` | `index.html:505-582`, `self-pages.js:137` | 모바일에서 한 번 탭하면 바로 전화가 연결됩니다. |
| G6 | 단계적 개입: 홈 기분 "많이 힘들어요" → 1393 안내, 7일 중 힘든 날 5일 이상 → 1577-0199를 부드럽게 권유 | `app.js:356`, `features.js:151-155` | 과잉 경고 없이 신호의 강도에 비례해 개입합니다. |
| G7 | 나 자신 영역 페이지의 **일관된 4단계 구조**: ① 상황 인식 → ② 판단 → ③ 행동 → ④ 도움 연결 | `self-pages.js`, `emotion-page.js:246-282` | 예측 가능한 구조는 인지 부하를 낮춥니다. 행동 항목도 "물 한 잔 마시기"처럼 작고 구체적입니다. |
| G8 | 문장 톤: "번아웃은 게으름이 아니에요", "비정상이 아닙니다", 청소년 반말 톤 분리 | 전반 | human/warm 원칙에 맞습니다. |
| G9 | 홈을 **상황 기준**("아이 성장이 불안해요")으로 진입하게 하고 돌봄/나 자신 두 영역으로 분리 | `index.html:96-197` | 사용자가 메뉴 체계가 아니라 자기 상황의 언어로 찾아갈 수 있습니다. |
| G10 | 툴킷 "지금 급한 상황이에요?" + 5단계 + 2분 타이머, `min-height:44px` | `index.html:220-240`, `styles.css:1922-1935` | 바로 필요한 순간에 도움이 됩니다. 터치 타겟 규칙을 지킨 드문 사례입니다. |
| G11 | 모바일 탭바에 **긴급 탭을 항상 노출** | `index.html:774-776` | 떠 있는 SOS 버튼을 숨긴 대신 긴급 진입점을 탭바에 확보했습니다(평가는 P-22 참조). |
| G12 | `.card` 기본 스펙은 radius 16px, `0 2px 6px rgba(0,0,0,.05)`로 **공식 스펙과 일치** | `styles.css:338-347` | 기준 컴포넌트는 맞습니다. 파생 컴포넌트가 이것을 따르지 않는 것이 문제입니다. |
| G13 | `lang="ko"`, `word-break:keep-all`, `line-height:1.72` | `index.html:2`, `styles.css:81` | 한글 가독성의 기본을 갖췄습니다. |

---

## 3. 문제 목록

심각도: **치명**(안전 또는 사용 불가) / **높음**(다수 사용자에게 명백한 장벽) / **중간** / **낮음**

### 3-1. 안전·위기 사용자 관점

| ID | 위치 | 문제 | 근거·수치 | 심각도 | 제안 |
|---|---|---|---|---|---|
| P-01 | `index.html:489` | 청소년 페이지의 "지금 어떤 감정이야?" 제목이 **보이지 않음** | 인라인 `color:var(--teen-ink,#1A2A4A)`인데 `--teen-ink`가 정의돼 있지 않아 폴백 `#1A2A4A`가 적용됨. 배경은 `#1A1F3A` → **1.13:1** | 치명 | `--teen-ink:#C0CAFF` 정의(대비 ≥ 8:1) + 인라인 스타일을 `.emotion-selector-title` 클래스로 교체 |
| P-02 | `app.js:161`, `app.js:141-146` | 청소년 감정 결과가 다크 배경에서 흐림 | 위로 문장 `var(--ink-m)` #6B6B6B → **2.46:1**. '슬퍼' `#5A7AC8` 14px → 3.16:1, '모르겠어' `#8A8A8A` → 3.81:1. 가장 중요한 문장이 가장 읽기 어려움 | 높음 | 청소년 전용 토큰 `--teen-text:#D0D8FF`, `--teen-text-2:#A8B4E8` 사용, 감정별 색은 아이콘이나 보더에만 적용 |
| P-03 | `emotion-page.js:314-318` | 위기 버튼 아이콘이 **💀(해골)** | 자살 사고가 있는 사용자에게 죽음을 형상화한 이모지는 낙인감을 주고 촉발 요인이 될 수 있음. 다른 버튼은 감정 얼굴 이모지 | 높음 | 아이콘 제거 또는 🫂/🤍로 교체, 문구를 "지금 죽고 싶다는 생각이 들어요"로 유지, 버튼 상단에 "혼자 두지 않을게요" 보조 문구 |
| P-04 | `emotion-page.js:215-220` | 위기 화면에 **같은 크기·같은 클래스의 큰 버튼 2개**(1393 전화, 카카오톡) | 단일 행동 원칙이 약해짐. 카카오 버튼은 `#3A1F6E→#6A3CB8` 인라인 그라데이션(팔레트 밖) | 중간 | 1393을 주 버튼으로 유지하고 카카오는 텍스트 링크 수준의 보조 버튼(outline)으로 낮춤. 외부 채널 URL은 공식 채널인지 운영 측 재확인 필요 |
| P-05 | `emotion-page.js:226-228` | 위기 화면의 "← 돌아가기" 버튼 | 인라인 스타일, `#9A9A9A`/흰색 2.81:1, 높이 약 40px | 낮음 | 의도적으로 약하게 둔 것은 타당함. 대비만 4.5:1 이상으로 조정 |
| P-06 | `index.html:188-195` | 홈의 "지금 당장 도움이 필요해요" 카드가 **10번째(마지막)** 이고 '나 자신' 섹션 안에 있음 | 모바일 1열 기준 첫 화면 기준 약 1,100px 아래(두 번째 스크롤). 아이의 신체 응급(119)은 '돌봄' 영역 사용자에게도 필요함 | 높음 | 히어로 바로 아래 **얇은 긴급 바**를 고정 배치: "지금 위험하다면 → 긴급 연결"(붉은 배경이 아닌 outline, 1393·119 tel 링크) |
| P-07 | `styles.css:1246-1248`, `index.html:15-17` | 모바일에서 SOS 플로팅 버튼 완전 숨김(`!important`) | 탭바와 겹침·경고 과잉을 피하려는 결정은 합리적임. 다만 대체 진입점인 탭바 '긴급' 탭이 **9px 라벨이고 다른 탭과 시각적 차이가 없음** → 발견성이 떨어짐. 데스크톱 SOS는 `💬 24시 긴급상담`(채팅 아이콘인데 실제로는 전화 허브) + 팔레트 밖 색 `#2A6A60`(올리브 테마 잔재) | 중간 | 숨김은 유지하되 탭바 긴급 탭을 차별화(아이콘 원형 배경 `--support-bg`, 라벨 12px "긴급전화"). 데스크톱 라벨은 "📞 긴급 전화 연결"로 교체 |
| P-08 | 전반(CSS 붉은 계열 51회, ⚠️ 17회, 🚨 8회) | **붉은 경고가 많음** | 마음 돌봄 페이지마다 `mental-risk-box`(빨강)가 첫 줄에 나오고, 성장 요약마다 `summary-warn`, 출산 단계마다 `birth-alert`가 3–5개, 홈 긴급 카드도 빨강 그라데이션. calm 원칙과 충돌하고, 정작 진짜 위급 신호가 묻힘(경고 피로) | 중간 | 빨강은 **생명 위급(119·자해)** 에만 사용. 일반 주의는 앰버 `--caution`, 정보는 블루로 3단계 구분. ⚠️·🚨 이모지는 페이지당 1회 이하 |
| P-09 | `index.html:519-523` | 청소년 개인정보 안내가 **과장됨**: "브라우저를 닫으면 흔적이 남지 않아요" | localStorage에 저장하지 않는 것은 맞지만 방문 기록은 브라우저 기록에 남음. 가정 내 위험이 있는 청소년에게 잘못된 안전감을 줌 | 높음 | "이 페이지 내용은 기기에 저장하지 않아요. 단, 방문 기록은 브라우저에 남을 수 있어요 → 시크릿 모드 사용 방법" 으로 정정 |
| P-10 | 전반 (`quickExit` 0건) | 1366·112(가정폭력) 번호와 "위험한 어른" 콘텐츠가 있는데 **빠른 탈출 버튼이 없음** | SKILL.md에 스펙(우상단 고정, 44px, `location.replace`)이 있지만 구현되지 않음 | 높음 | 긴급 허브·청소년 페이지에 우선 적용(beinside-safety 스킬 기준) |
| P-11 | `render.js:635`, `render.js:737`, `render.js:616-624` | 마음 돌봄·출산 페이지의 상담 번호가 **일반 텍스트**(tel: 없음) | "1393 / 1644-6621 / 1577-0199"를 탭해도 전화가 연결되지 않음. G5 원칙과 불일치 | 높음 | `help-card` 컴포넌트를 재사용해 tel 링크로 통일 |

### 3-2. 공식 스펙 불일치 (타이포·레이아웃·형태)

| ID | 위치 | 문제 | 근거·수치 | 심각도 | 제안 |
|---|---|---|---|---|---|
| P-12 | `styles.css:378, 242, 1474-1482, 1576, 1614, 2433, 2548` 등 | **본문이 스펙보다 3–5px 작음** | 카드 li 13.5px, 히어로 부제 13px(1425에서 14px로 덮어씀), 상황 카드 제목 **13px**/부제 **11px**, sp-card li 12.5px, fitem/hitem p 12.5px, 증상 질문 13px. 16px 이상 본문은 청소년 인트로(17px)와 위기 메시지(18px) 정도 | 높음 | `--fs-body:16px`, `--fs-body-sm:15px`, `--fs-caption:13px`(최소)로 정리. 카드 본문과 li는 16px, 부제는 14px 이상 |
| P-13 | `styles.css:134`, `1437` | **최대 너비 720px 미적용** | `.main-col{flex:1}`만 있음. 성장 결과 `.grid`, `.emergency-grid`, `content-hero`가 화면 폭을 따라 늘어남. 1440px 화면에서 한 줄 약 90자 이상 | 높음 | `.main-col{max-width:720px;margin-inline:auto}` 또는 `.container` 래퍼 적용. 섹션 배경을 끝까지 채우고 싶다면 바깥 래퍼에만 배경을 두기 |
| P-14 | `styles.css` 전체 | **radius 17종 혼재** | 12px×24, 20px×21, 14px×19, 10px×15, 16px×13, 18px×10, 8·13px×7, 24px×6, 11px×5 … 인라인(JS)에도 20px·13px·12px·10px 섞임 | 중간 | `--r-sm:8px`(뱃지·작은 버튼), `--r-md:12px`(입력·내부 박스), `--r-card:16px`(카드·패널), `--r-sheet:24px`(모달·시트), `--r-pill:999px` **5개로 통일** |
| P-15 | `styles.css:205, 1905, 2036, 2241, 2349, 2381, 2389, 2138`, `index.html:332, 617, 629` | 좌우 여백 규칙 없음(48/28/24/18/0px 혼재) | 모바일에서 `.hero`(18px)+`.section-care`(18px) = **좌우 36px** 이중 여백 → 375px 폭에서 콘텐츠 폭 303px. 히어로 상단 패딩 52px | 중간 | `--gutter:20px` 하나로 통일, 중첩 컨테이너는 패딩 0 |
| P-16 | `styles.css:1543-1549` + `self-pages.js:76, 260, 299, 431, 470`, `emotion-page.js:240, 297` | 나 자신 영역 5개 페이지의 "← 홈으로" 버튼이 **여백 없이 화면 왼쪽 끝(x=0)에 붙음**, sticky 헤더도 없음 | 다른 7개 페이지는 `.page-header`(sticky)를 쓰는데 이 페이지들은 헤더 패턴이 다름. 이동 중 뒤로 가기 위치가 바뀜 | 중간 | 모든 페이지를 `.page-header` 템플릿으로 통일 |
| P-17 | `styles.css:342, 1448, 2107-2116` 등 | 호버 이징 `cubic-bezier(.34,1.56,.64,1)` = **튀어 오르는 효과** | calm 원칙과 맞지 않음. SKILL.md에 이 값이 규정돼 있어 문서부터 수정해야 함 | 낮음 | `cubic-bezier(.2,.8,.2,1)` 200ms, 이동 −2px 이하 |
| P-18 | `styles.css:610-625, 770-784, 94-99, 1540-1541` | "Liquid glass 제거" 커밋과 달리 모달·바텀시트·헤더에 `backdrop-filter: blur(40px) saturate(1.8)` 남음 | 저사양 모바일에서 스크롤·애니메이션이 버벅일 수 있음 | 낮음 | 불투명 `--bg-surface`로 교체(헤더만 blur 8px 허용) |

### 3-3. 색 대비·토큰 (테마 교체 잔재)

| ID | 위치 | 문제 | 근거·수치 | 심각도 | 제안 |
|---|---|---|---|---|---|
| P-19 | `styles.css:39` `--ink-l` 사용처 49곳 | Muted 텍스트 대비 미달 | `#9A9A9A`/`#F7F3EE` **2.55:1**, /흰색 2.81:1, /self 섹션 `#EBF7F0` 2.56:1. 상황 카드 부제(11px), 섹션 부제(12px), 폼 라벨, 출처 설명, 체크 툴 면책 문구, 저널 날짜에 사용 | 높음 | `--text-muted:#6E6A66`(따뜻한 회색, 배경 4.85 / 흰색 5.36:1). `#9A9A9A`는 비텍스트(보더·아이콘) 전용으로 제한 |
| P-20 | `styles.css:13, 1981, 1336, 1382, 1605, 869, 830` | **`--peach` #7BAECB를 텍스트나 흰 글씨 배경에 사용** | 흰 글씨/#7BAECB = **2.40:1**(타이머 버튼). #7BAECB 텍스트/흰색 2.40:1(출처 섹션 제목·목차 제목·"이 시기 핵심 3가지" 제목·새 프로필 버튼) | 높음 | #7BAECB는 **보더·장식·포커스 글로우 전용**으로 명시. 텍스트용은 `--accent-text:#2F6A88`(흰색 5.94 / `#DCEBFF` 4.91:1) |
| P-21 | `styles.css:749, 991, 817, 278, 1618, 1963, 2751` | 흰 글씨 버튼 배경 `--peach-d` #4A8CAA → #7BAECB 그라데이션 | 시작점 3.73:1, 끝점 **2.40:1**. 13–14px 굵은 글씨는 큰 텍스트 기준(18.66px bold) 미만이라 **AA 실패**. 저장·바로가기·요약 번호·툴킷 단계 번호에 해당 | 높음 | 단색 `--action-bg:#36708F`(흰색 5.42:1), 호버 `#2F6A88`. 그라데이션 폐기 |
| P-22 | `styles.css:2156, 1674, 1515, 744` | 활성 탭 `#4A8CAA` on `#DCEBFF` = 3.09:1 | 탭·필·타입 버튼의 선택 상태 글자 | 중간 | `--accent-text` 적용 → 4.91:1 |
| P-23 | `styles.css:26, 53` + `features.js:201`, `styles.css:417` | 초록 `#6BA885`를 텍스트에 사용 | 흰색 위 2.78:1, 저널 '감정' 태그(`#DCEBFF` 위) **2.30:1**, `.ftitle` | 중간 | 텍스트용 `--support-green-text:#2F6B4F`(6.29:1) |
| P-24 | `self-pages.js:77, 261, 300, 432, 471`, `emotion-page.js:241, 298` | 콘텐츠 히어로의 흰 글씨 배경 대비 부족 | 감정 히어로 끝 `#6BA885` **2.78:1**, 번아웃 끝 `#C0892A` 3.06:1, 전환기 `#4A8888` 4.06:1(13.5px 본문 실패). 관계 `#B05A42`만 4.79:1로 통과 | 높음 | 히어로를 **밝은 배경 + 진한 글자**(`--domain-*-bg` + `--domain-*-text`)로 전환. calm 원칙에도 더 맞음 |
| P-25 | `render.js:275-407`(`g:[…]` 13세트), `render.js:545`, `data.js:210, 275, 340, 409` | 성장 결과 헤더(`.rhead`) 색이 **올리브/브라운 테마 잔재** | `#1A5030`, `#3A3A10→#8A8A30`(올리브), `#4A3010→#C8924A`(브라운), `#1A1A3A→#4A4A7A` 등. 흰 글씨 대비는 `#C8924A` **2.74:1**, `#5EAA80` 2.79:1, `#8A8A30` 3.65:1. 한부모 헤더도 딥퍼플·브라운 | 중간 | 연령대별 13색 → **토큰 2–3개**(예: 영유아/아동청소년/성인 = green/blue/neutral-bg)로 축소하고 진한 글자 사용 |
| P-26 | `styles.css:1145-1151`, `index.html:447`, `render.js:709, 736` | 출산 페이지가 **피치 테마 그대로** | 헤더 `#C4714A→#D4A054`(흰 글씨/`#D4A054` **2.34:1**), 안내 박스 `rgba(232,137,106,…)` | 중간 | Calm 4.0 토큰으로 교체 |
| P-27 | `styles.css:13-17, 20, 26, 53-56` | **변수 이름이 의미와 반대** | `--peach`=파랑, `--peach-p`=연파랑, `--amber`=초록, `--rust`=진초록, `--lavender`=초록, `--sage`=파랑(alias), `--primary`와 `--peach` 값 중복. 개발자가 "peach"를 보고 따뜻한 색이라고 생각하게 됨 | 높음 | §6의 **semantic 토큰**으로 이름 변경. 과도기에는 옛 이름을 새 토큰의 alias로 유지 |
| P-28 | `styles.css:78, 339, 1443` 등 | 토큰이 있는데도 하드코딩 | `body{background:#F7F3EE}`(=`--cream`), `.card{background:#FFFFFF}`. `:root` 밖 hex **241개**, `rgba(` **302개**, 고유 hex **185종** | 중간 | stylelint `color-no-hex` + 허용 목록 |
| P-29 | `styles.css:283, 2763` | 그림자 색에 피치 `rgba(184,80,48,…)` 잔존 | 파란 버튼에 주황빛 그림자 | 낮음 | `--shadow-*` 토큰 |
| P-30 | `styles.css:142, 1218, 1540, 1299, 1312, 1366, 943, 1565, 1906, 1092, 1598` | 따뜻한 피치 크림 배경(`#FFF8F2`, `#FFF5F0`, `rgba(255,248,242)`) 11곳 이상 | 헤더·탭바·페이지 헤더·출처 드로어·툴킷·증상 체커가 `#F7F3EE`와 미묘하게 다른 분홍빛 → 한 화면 안에 베이지가 3종 | 낮음 | `--bg-page`, `--bg-surface`, `--bg-subtle` 3단계로 통일 |
| P-31 | `styles.css:1061-1063, 1694, 1703, 1710, 2033-2035, 2084-2124` | **라벤더 테마 잔재**(보라) | `#8A5AB4`, `#6A3A90`, `#A050C8`, `rgba(160,80,200)`, `#9B8EC4`. 마음 돌봄·산후우울 체커·청소년 감정 선택기가 보라색 | 중간 | 마음 영역은 `--support-green`으로 통일(청소년만 예외: 네이비 계열 유지) |
| P-32 | `styles.css:1713-1809`, `2082-2132` | 청소년 페이지 다크 톤이 **새 팔레트와 단절** | 페이지 배경 `#1A1F3A→#12172E`에 인디고 `#5B7CFA`, 결과 박스 앰버 `#FFB347`/`#E8C870`. 따뜻한 베이지 사이트에서 다크 페이지로 갑자기 바뀌고, `!important`로 헤더를 덮어씀(10개 중 6개) | 중간 | SKILL.md의 "청소년만 쿨톤"은 유지하되 **라이트 네이비 톤**(`#EEF1FB` 배경 + `#1F2A55` 텍스트)으로 조정. 다크를 유지한다면 `--teen-*` 토큰 세트를 만들고 `!important` 제거 |
| P-33 | `styles.css:1812` | 긴급 허브 배경 `#FAFAFA`(차가운 회색) | 웜 베이지 체계에서 벗어남 | 낮음 | `--bg-page` |
| P-34 | `styles.css:879-886`, `index.html:753-754` | 푸터 대비 부족 | 본문 `rgba(255,238,226,.45)` 3.58:1, 이메일(opacity .55×.7) **3.03:1**, 12.5px 이하 | 낮음 | 불투명 `#D9D2CA` 이상 |

### 3-4. 정보 밀도·구조

| ID | 위치 | 문제 | 근거·수치 | 심각도 | 제안 |
|---|---|---|---|---|---|
| P-35 | `index.html:96-208` | 홈 화면에 **카드 10개 + 섹션 헤더 2개 + 기분 위젯** | 결정 단위 13개, 이모지 약 30개. 선택지가 많으면 결정 시간이 늘어나고(Hick's law), 지친 사용자에게 minimal 원칙과 맞지 않음. 기분 위젯은 맨 아래라 대부분 보이지 않음 | 높음 | 1단계: "아이·가족" / "나 자신" / "지금 위험해요" **3개 큰 선택지** → 2단계에서 세부 4–6개. 기분 체크는 히어로 바로 아래 한 줄로(선택형) |
| P-36 | `index.html:309-330`, `render.js:530-542`, `render.js:593-605` | **탭 안의 탭 안의 아코디언** | 성장 페이지: 툴킷 3버튼 → (수면) 연령 필 3개 → … / 가이드 탭(성장·아빠) → 연령 필 13개 → 아코디언 11개 → 아코디언 안 `.card` → `.tip`/`.fitem`. 한부모: 상황 4탭 → 단계 탭 → 섹션. 마음 돌봄: 9탭 | 높음 | 한 화면에 선택 계층은 **최대 2단**. 연령은 프로필 또는 한 번의 선택으로 고정하고, 아빠 가이드는 독립 페이지로 분리 |
| P-37 | `render.js:519-525, 97-110, 117-211`, `styles.css:1628-1660` | **카드 중첩 3–4단** | `.acc-section`(보더+radius 14) > `.card`(보더+그림자+radius 12) > `.fitem`/`.tip`/`.fa-item`(배경+radius 12–13) > 번호 원. 박스마다 보더·배경이 달라 시각적 소음이 큼 | 중간 | 아코디언 본문 안에서는 `.card` 스타일 제거(`box-shadow:none;border:0;padding:0`), 내부 항목은 구분선 리스트로 |
| P-38 | `index.html:317-330` | 연령 필 13개에 **의미 없는 색 점** | 초록→갈색→보라→네이비 13색(올리브 테마 잔재), 색이 의미를 전달하지 않음 | 낮음 | 색 점 제거, 3개 그룹(영유아/아동·청소년/성인)으로 묶기 |
| P-39 | `index.html` 이모지 약 94개, 거의 모든 제목·버튼·탭에 이모지 | **이모지 남용** | 페이지 제목, 섹션 제목, 버튼, 탭 라벨, 뱃지, 요약 번호 옆에 모두 사용. 스크린리더가 "집 홈", "아기 성장"처럼 읽음(`aria-hidden` 없음). 1393 결과 안내(`index.html:383`)에 💜 등 감정 이모지 | 중간 | 이모지는 **상황 카드 아이콘에만** 사용하고 `aria-hidden="true"` 적용. 제목·버튼에서는 제거 |
| P-40 | `index.html:617-620`, `app.js:205` | 아빠 가이드 페이지가 **막다른 길** | "아이 나이를 입력하면…"이라고 안내하지만 나이 입력 UI(`age-finder`)는 HTML에서 제거됨. 성장 가이드로 보내는 버튼 하나뿐 | 중간 | 페이지 안에 연령 선택을 두거나 홈 카드 링크를 성장 가이드의 아빠 탭으로 직접 연결 |
| P-41 | `index.html:761-777`, `app.js:9` | **데스크톱·태블릿(>640px)에 내비게이션 없음** | 기록(journal) 페이지는 모바일 탭바로만 들어갈 수 있고, 마음 돌봄(`page-mental`)은 **진입점이 전혀 없음**. 헤더 ☰는 출처 드로어만 엶(이 아이콘을 보면 사용자는 메뉴를 기대함) | 높음 | 641px 이상에서는 헤더에 텍스트 내비(홈·성장·마음·기록·긴급). ☰ 아이콘은 "출처" 텍스트 버튼으로 교체 |
| P-42 | `styles.css:137-293, 444-466, 1089-1110, 1503-1531, 1822-1848, 1250-1263, 2207-2218` 등 | **사용하지 않는 CSS 약 250줄(~8%)** | `.tl-sidebar`, `.sbox`, `.mtoggle`, `.ninput`, `.gobtn`, `.view-toggle`, `.emer-btn`, `.age-finder`, `.alone-card`, `.mental-grid`, `.data-source-bar`, `.verified-badge`, `.emergency-hero-msg` → HTML·JS 참조 0건 | 낮음 | 삭제. 테마를 바꿀 때마다 죽은 코드의 색까지 바꾸게 되는 비용이 사라짐 |
| P-43 | `styles.css:2093-2097` vs `2621-2626` vs `2927-2929`, `371` vs `931` | **같은 클래스 중복 정의 충돌** | `.emotion-grid`: 청소년용 4열 → 뒤 규칙이 2열로 덮어쓰고 → 모바일 1열. 청소년 감정 버튼 6개가 64px씩 세로로 쌓여 약 430px. `.stat-badge`, `.card.cbg-lavender`, `#medical-disclaimer`(CSS+인라인)도 중복 | 중간 | 청소년용은 `.teen-emotion-grid`로 이름 분리(모바일 3열) |

### 3-5. 모바일

| ID | 위치 | 문제 | 근거·수치 | 심각도 | 제안 |
|---|---|---|---|---|---|
| P-44 | 아래 표 | **44px 미만 터치 타겟 다수** | 아래 "터치 타겟 표" 참조. 증상 체커 예/아니오(응급 판단용!)가 약 34px | 높음 | 공통 `min-height:44px` 유틸리티. 작은 아이콘 버튼은 `padding`으로 영역 확장 |
| P-45 | `styles.css:1224-1233` | 하단 탭바 라벨 **9px**, `letter-spacing:-.1px` | 이 사이트에서 가장 작은 글자가 가장 자주 쓰는 내비에 있음. 저시력·노년 사용자(노년 가이드 대상)가 읽기 어려움. 대비(5.07:1)는 통과 | 높음 | 라벨 12px 이상, 아이콘 22px, 활성 탭은 색 + 굵기 + 상단 인디케이터 |
| P-46 | `styles.css:1233` | `body{padding-bottom:72px}` 고정값 | 탭바 실제 높이 = 8 + 약 49 + `max(8px, safe-area)`. 홈 인디케이터가 있는 iPhone(34px)에서는 약 **91px** → 푸터 하단 약 19px가 탭바에 가려짐. `mobile-ux.md`의 `calc(60px + env(safe-area-inset-bottom))` 규정 미준수 | 중간 | `padding-bottom:calc(var(--tabbar-h) + env(safe-area-inset-bottom))` |
| P-47 | `styles.css:770-785` | 프로필 **바텀시트가 `bottom:60px`에 멈춤** | ① 데스크톱(탭바 없음)에서는 시트 아래 60px가 비어 떠 보임. ② 노치 iPhone에서는 탭바(약 91px)와 31px 겹침(시트 z 860 > 탭바 300 → 탭 아이콘 일부 가림). ③ 시트 자체에도 safe-area 패딩 → 이중 적용. ④ `bottom` 속성 애니메이션(레이아웃을 다시 계산함, 스펙상 transform만 허용) | 중간 | `bottom:0; transform:translateY(100%)` → `.on{transform:none}`. 시트가 탭바를 덮는 모달로 동작(z 상위), padding-bottom = safe-area만 |
| P-48 | `styles.css:1874`, `index.html:534-582` | 긴급 허브가 모바일에서도 **2열** | 375px에서 카드 폭 약 160px − 패딩 40 − 아이콘 28+16 = 텍스트 폭 약 76px. "여성긴급전화 / 가정폭력·성폭력·성매매 피해 지원…"이 4–5줄로 쪼개짐. 위기 순간에 번호를 훑어보기 어려움 | 높음 | 640px 이하는 **1열**, 번호를 왼쪽에 크게, 설명 1줄. 순서는 사용자 상황별(생명 위급 119 → 자살 1393 → …) |
| P-49 | `index.html:28-30`, `styles.css:1273-1284` | 헤더 햄버거 약 38×32px + 의미 불일치 | 위 P-41 참조 | 낮음 | 텍스트 버튼 "출처" 44px |

**터치 타겟 표** (font-size × line-height + padding + border로 계산한 높이)

| 요소 | 위치 | 실제 높이(약) | 비고 |
|---|---|---|---|
| `.sym-yes/.sym-no` (산후 38°C·출혈 예/아니오) | `styles.css:1578-1582` | **34px** | 응급 판단 버튼 |
| `.sp-age-tab` | `508-513` | 34px | |
| `.pill` (연령 13개, div) | `297-308` | 36px | |
| `.journal-tag-btn` | `2713-2722` | 36px | |
| `.ppd-btn` | `2056-2064` | 36px | min-height 36 |
| `.mental-tab` | `1667-1672` | 38px | |
| `.page-back` | `1543-1549` | 38px | 모든 페이지의 뒤로 가기 |
| `.pi-btn` (편집/삭제) | `663-669` | **28px** | 삭제 버튼 오탭 위험 |
| `.modal-close` | `628-635` | 32px | `aria-label` 없음 |
| `.source-drawer-close` | `1320-1324` | 약 30px | `aria-label` 없음 |
| `.memo-item-del` | `1036-1040` | 약 24px | |
| `.form-back` | `685-690` | 약 28px | |
| `.emoji-opt` (9열) | `714-721` | 375px에서 약 30px | |
| `.age-pill`, `.timer-btn` | `1993`, `1980` | 40px | 거의 충족 |
| `.toolkit-btn`, `.mood-btn`, `.emo-btn`, `.guide-tab` | | 44–76px | 충족 |

### 3-6. 접근성

| ID | 위치 | 문제 | 근거·수치 | 심각도 | 제안 |
|---|---|---|---|---|---|
| P-50 | `index.html:106-195, 317-329, 20`, `render.js:28`, `profiles.js:98, 171`, `features.js:275` | **클릭되는 div** | 홈 상황 카드 10개(`.sit-card`), 연령 필 13개(`.pill`), 프로필 칩, 목차 항목, 프로필 리스트, 저널 항목 헤더 → `onclick` div **HTML 28개 + JS 12종**. 키보드로 접근할 수 없고 스크린리더에 역할이 알려지지 않음. **홈 전체가 키보드로 사용 불가** | 치명 | `<button type="button">` 또는 `<a href="#growth">`로 교체(상황 카드는 링크가 의미상 적합) |
| P-51 | `styles.css` (focus 관련 5건, 모두 input) | **`:focus-visible` 스타일 0건** | 버튼은 브라우저 기본 링에 의존하는데 흰/베이지 배경에서 약함. div 카드는 포커스 자체가 불가 | 높음 | `:focus-visible{outline:3px solid var(--focus);outline-offset:2px}` (`--focus:#2F6A88`) |
| P-52 | 전체 (0건) | **`prefers-reduced-motion` 미대응** | 카드 stagger, `.page-view` 진입 애니메이션, 탄성 호버, `scroll-behavior:smooth`, `scrollIntoView({behavior:'smooth'})` 7곳, 스크롤 진행 바. 전정기관 장애·불안 사용자에게 부담 | 높음 | §5 코드 참고 |
| P-53 | `render.js:452`, `self-pages.js:97-113` | 아코디언에 `aria-expanded`/`aria-controls` 없음 | 성장 결과 `.acc-header`(button)는 상태를 알리지 않음. 번아웃 `.accordion-header`는 **div + tabindex만 있고 keydown 처리가 없음** → 포커스는 가지만 Enter로 열리지 않음 | 높음 | button으로 바꾸고 `aria-expanded` 토글 |
| P-54 | `self-pages.js:64`, `emotion-page.js:260`, `app.js:392-396` | 행동 체크리스트가 `role="checkbox"`인데 **`aria-checked`를 갱신하지 않고 키보드 처리도 없음** | G4의 체크 툴과 불일치 | 중간 | `renderCheckTool`의 toggle 로직 재사용 |
| P-55 | `index.html:35-37, 76, 634-637`, `app.js:319-324` | 모달·드로어·시트에 대화상자 의미와 포커스 관리가 없음 | 모달에 `role="dialog"`/`aria-modal` 없음, 열 때 포커스 이동·가두기·닫은 뒤 복귀 없음. ✕ 버튼 2개에 `aria-label` 없음. Escape로 프로필 시트가 닫히지 않음 | 중간 | `<dialog>` 요소 사용 또는 포커스 트랩 유틸 |
| P-56 | `index.html:55, 59` | `<label>`이 input과 연결되지 않음(`for` 없음) | 이름·생년월일 입력 | 낮음 | `for="edit-name"` |
| P-57 | `index.html` | 랜드마크 없음 | `<main>` 0개, 헤더 안에 `<nav>` 없음. 스크린리더 사용자가 본문으로 건너뛸 수 없음, skip link 없음 | 중간 | `<main id="main">` + "본문 바로가기" |
| P-58 | `emotion-page.js:309`, `self-pages.js:309, 480` | `aria-label`이 보이는 텍스트를 덮어씀 | 관계·전환기 버튼은 `aria-label="이혼 직후"`만 읽고 부제("감정·생활·정체성 모두 리셋 상태")는 읽지 않음. 이모지 아이콘도 `aria-hidden`이 없어 함께 읽힘 | 낮음 | 보이는 텍스트가 있으면 `aria-label` 제거, 이모지에 `aria-hidden` |
| P-59 | `utils.js:93` | 아바타 이미지 `alt="avatar"` | 의미 없는 영어 대체 텍스트 | 낮음 | `alt=""`(장식, 이름이 옆에 표시됨) |
| P-60 | `styles.css:117-130` | 전역 `nav`/`nav button` 규칙이 **모바일 탭바에 새어 들어감** | `.mobile-tabbar`가 `<nav>`라서 `border-radius:22px`, 호버 배경 `rgba(123,174,203,.10)`가 탭에 적용됨(터치 기기에서 호버 상태가 남는 문제) | 낮음 | 옛 헤더 nav 규칙 삭제 |

---

## 4. 대비비 표 (WCAG 2.1, 직접 계산)

AA 기준: 일반 텍스트 4.5:1, 큰 텍스트(24px 이상 또는 18.66px 이상 굵게)와 UI 요소 3:1.
"큰 글씨만 통과"로 표시된 항목 중 실제 사용 크기가 12–14px인 것은 **실패**로 봐야 합니다.

| 조합 | 사용처 | 대비 | 판정 |
|---|---|---|---|
| `--ink` #3A3A3A / #F7F3EE | 본문 | 10.30:1 | 통과 |
| `--ink-m` #6B6B6B / #F7F3EE | 보조 본문 | 4.82:1 | 통과 |
| `--ink-m` #6B6B6B / #FFFFFF | 카드 본문 | 5.33:1 | 통과 |
| **`--ink-l` #9A9A9A / #F7F3EE** | 섹션 부제 12px, 힌트 | **2.55:1** | 실패 |
| **`--ink-l` #9A9A9A / #FFFFFF** | 상황 카드 부제 11px, 폼 라벨, 면책 | **2.81:1** | 실패 |
| **`--ink-l` #9A9A9A / #EBF7F0** | '나 자신' 섹션 부제 | **2.56:1** | 실패 |
| **흰 글씨 / `--peach` #7BAECB** | 타이머 버튼, 저장 버튼 그라데이션 끝 | **2.40:1** | 실패 |
| 흰 글씨 / `--peach-d` #4A8CAA | 저장·바로가기 그라데이션 시작, 요약 번호, 저널 저장(13–14px) | 3.73:1 | 크기상 실패 |
| **`--peach` #7BAECB 텍스트 / #FFFFFF** | 출처·목차·요약 패널 제목, 새 프로필 버튼 | **2.40:1** | 실패 |
| **`--peach` #7BAECB 텍스트 / #F7F3EE** | | **2.17:1** | 실패 |
| `--peach-d` #4A8CAA / #FFFFFF | 링크·강조·카드 h3(14.5px) | 3.73:1 | 크기상 실패 |
| `--peach-d` #4A8CAA / `--peach-p` #DCEBFF | 활성 탭·선택 버튼 | 3.09:1 | 크기상 실패 |
| `--peach-d` #4A8CAA / #F7F3EE | 돌봄 섹션 제목 17px | 3.38:1 | 크기상 실패 |
| **`--amber` #6BA885 / #FFFFFF** | `.ftitle` 12px | **2.78:1** | 실패 |
| **`--amber` #6BA885 / #DCEBFF** | 저널 '감정' 태그 11px | **2.30:1** | 실패 |
| **`--sky` #6CA0C8 / 흰색 계열** | `.htitle` 12px | **2.63:1** | 실패 |
| **흰 글씨 / #6BA885** | 감정 가이드 히어로(끝점) | **2.78:1** | 실패 |
| 흰 글씨 / `--burnout` #C0892A | 번아웃 히어로(끝점) 13.5px | 3.06:1 | 크기상 실패 |
| 흰 글씨 / `--transition-c` #4A8888 | 전환기 히어로 | 4.06:1 | 크기상 실패 |
| 흰 글씨 / `--relation` #B05A42 | 관계 히어로 | 4.79:1 | 통과 |
| 흰 글씨 / #C05050 → #E07070 | 위기 1393 버튼 16px bold | 4.66 → 3.12:1 | 끝점 실패 |
| 흰 글씨 / #2A6A60 | 데스크톱 SOS | 6.31:1 | 통과 |
| **흰 글씨 / #D4A054** | 출산 헤더(끝점) | **2.34:1** | 실패 |
| **흰 글씨 / #C8924A** | 성장 결과 4–6세 헤더 | **2.74:1** | 실패 |
| **흰 글씨 / #5EAA80** | 성장 결과 2–3개월 헤더 | **2.79:1** | 실패 |
| 흰 글씨 / #8A8A30 | 성장 결과 2–3세 헤더 | 3.65:1 | 크기상 실패(13px 인용문) |
| 탭바 라벨 #6B6B6B / 탭바 배경 | 9px | 5.07:1 | 대비는 통과, 크기가 문제 |
| **[청소년] #1A2A4A / #1A1F3A** | "지금 어떤 감정이야?" | **1.13:1** | 실패(보이지 않음) |
| **[청소년] #6B6B6B / 다크 결과 박스** | 감정 결과 위로 문장 | **2.46:1** | 실패 |
| [청소년] #5A7AC8 / 다크 | '슬퍼' 결과 14px | 3.16:1 | 크기상 실패 |
| [청소년] #8A8A8A / 다크 | '모르겠어' 결과 | 3.81:1 | 크기상 실패 |
| [청소년] #8090C0 / 카드 | 본문 li 13px | 4.33:1 | 실패(근소) |
| [청소년] #7080B0 / SOS 버튼 | 1388·1393 설명 12px | 3.35:1 | 실패 |
| [청소년] #8A9AE0 / #1A1F3A | 인용 | 5.98:1 | 통과 |
| [청소년] #B0BAEE / #1A1F3A | 인트로 17px | 8.54:1 | 통과 |
| 긴급 번호 #C84A8A(1366) / 흰색 | 22px bold | 4.37:1 | 큰 글씨 통과 |
| 푸터 rgba(255,238,226,.45) / #333 | 12.5px | 3.58:1 | 실패 |
| 푸터 이메일 | 11.5px | 3.03:1 | 실패 |

**대체 색 검증값** (제안 토큰)

| 제안 토큰 | 값 | 흰색 위 | #F7F3EE 위 | #DCEBFF 위 | #DFF3E9 위 | 흰 글씨를 얹을 때 |
|---|---|---|---|---|---|---|
| `--text-muted` | #6E6A66 | 5.36 | 4.85 | 4.44 | 4.63 | — |
| `--accent-text` | #2F6A88 | 5.94 | 5.37 | 4.91 | 5.13 | 5.94 |
| `--action-bg` | #36708F | 5.42 | 4.91 | 4.49 | 4.68 | **5.42** |
| `--support-green-text` | #2F6B4F | 6.29 | 5.70 | 5.21 | 5.43 | 6.29 |
| `--caution-text` | #8A5F18 | 5.63 | 5.10 | 4.66 | 4.86 | 5.63 |
| `--crisis` | #9B3434 | 7.16 | 6.48 | 5.92 | 6.18 | **7.16** |

→ **#7BAECB·#DCEBFF·#DFF3E9·#F7F3EE의 분위기는 그대로 두고**, 글자와 버튼 배경에만 한 단계 진한 짝을 쓰면 calm 톤을 유지하면서 AA를 통과합니다.

---

## 5. 개선 로드맵

### 당장 (1–3일, 안전·접근성 차단 요소)

1. **청소년 제목 가시성 복구 (P-01, P-02)**
   ```css
   :root{ --teen-ink:#C0CAFF; --teen-text:#D0D8FF; --teen-text-2:#A8B4E8; }
   .emotion-selector-title{font-size:16px;font-weight:700;color:var(--teen-ink);margin-bottom:10px}
   .emo-result .emo-sub{color:var(--teen-text-2)}
   ```
   `index.html:489`의 인라인 스타일, `app.js:161`의 `var(--ink-m)`을 교체합니다.
2. **전화번호를 모두 tel 링크로 (P-11)**: `render.js:635, 737`을 `help-card`로 교체합니다.
3. **청소년 개인정보 문구 정정 (P-09)**, **💀 제거 (P-03)**.
4. **클릭 div → button/a (P-50)**: `.sit-card`, `.pill`, `.prof-chip`, `.guide-toc-item`, `.pp-list-item`, `.journal-item-header`. CSS 초기화 한 줄로 기존 모양을 유지할 수 있습니다.
   ```css
   button.sit-card,button.pill{font:inherit;color:inherit;text-align:left;width:100%}
   ```
5. **포커스와 모션 (P-51, P-52)**
   ```css
   :focus-visible{outline:3px solid #2F6A88;outline-offset:2px}
   @media (prefers-reduced-motion: reduce){
     html{scroll-behavior:auto}
     *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
     .card:hover,.sit-card:hover,.help-card:hover{transform:none}
   }
   ```
   JS의 `behavior:'smooth'` 7곳은 `matchMedia('(prefers-reduced-motion: reduce)')`를 확인해 `'auto'`로 분기합니다.
6. **대비 긴급 수정 (P-19, P-20, P-21)**: 토큰 값 두 개만 바꿔도 `var(--ink-l)` 49곳과 `var(--peach-d)` 77곳이 한 번에 고쳐집니다.
   ```css
   --ink-l:#6E6A66;          /* 2.55 → 4.85 */
   --peach-d:#2F6A88;        /* 텍스트 3.73 → 5.94, 활성 탭 3.09 → 4.91 */
   .timer-btn,.form-save-btn,.memo-save-btn,.pp-goto-btn,.journal-save-btn{background:#36708F} /* 그라데이션 제거, 5.42 */
   .source-section-title,.guide-toc-title,.summary-panel-title,.pp-action-btn{color:var(--peach-d)}
   ```
7. **증상 체커·삭제 버튼 터치 타겟 (P-44)**: `.sym-yes,.sym-no,.pi-btn,.modal-close,.source-drawer-close{min-height:44px;min-width:44px}`
8. **모바일 긴급 허브 1열 (P-48)**: `@media(max-width:640px){.emergency-grid{grid-template-columns:1fr}}`
9. **탭바 가독성 (P-45, P-46)**: `.mtab{font-size:12px}` · `body{padding-bottom:calc(64px + env(safe-area-inset-bottom))}` · 긴급 탭 강조(`#mtab-emergency span{background:#F6E3E3;border-radius:999px;padding:2px 10px}`)

### 다음 (1–2주, 시스템 정비)

1. **Semantic 토큰 도입 (P-27, P-28)**. 옛 이름은 alias로 한 릴리스 동안 유지한 뒤 제거합니다.
   ```css
   :root{
     /* Surface */
     --bg-page:#F7F3EE; --bg-surface:#FFFFFF; --bg-subtle:#F2EEE8;
     /* Text */
     --text:#3A3A3A; --text-2:#6B6B6B; --text-muted:#6E6A66; --text-disabled:#9A9A9A; /* disabled는 비텍스트 전용 */
     /* Accent — Calm Blue */
     --accent-bg:#DCEBFF; --accent-border:#7BAECB; --accent-text:#2F6A88;
     --action-bg:#36708F; --action-bg-hover:#2F6A88; --action-fg:#FFFFFF;
     --focus:#2F6A88; --focus-glow:rgba(123,174,203,.35);
     /* Support — Healing Green */
     --support-bg:#DFF3E9; --support-bg-2:#EBF7F0; --support-border:#6BA885; --support-text:#2F6B4F;
     /* Status (위계: 정보 < 주의 < 위기) */
     --info-bg:#EEF5FB;    --info-text:#2F6A88;
     --caution-bg:#FBF0D8; --caution-text:#8A5F18;
     --crisis-bg:#F9E9E7;  --crisis-text:#9B3434; --crisis-solid:#9B3434;
     /* Domain (히어로: 밝은 배경 + 진한 글자) */
     --domain-burnout-bg:#FBF0D8;   --domain-burnout-text:#8A6018;
     --domain-relation-bg:#F5E4DC;  --domain-relation-text:#8A3E28;
     --domain-transition-bg:#DFF0EE;--domain-transition-text:#2E6060;
     --domain-emotion-bg:#DFF3E9;   --domain-emotion-text:#2F6B4F;
     /* Type */
     --fs-display:24px; --fs-h1:22px; --fs-h2:19px; --fs-h3:17px;
     --fs-body:16px; --fs-body-sm:15px; --fs-caption:13px; /* 13px 미만 금지 */
     /* Shape */
     --r-sm:8px; --r-md:12px; --r-card:16px; --r-sheet:24px; --r-pill:999px;
     /* Layout */
     --content-max:720px; --gutter:20px; --tabbar-h:64px;
     /* Elevation */
     --shadow-card:0 2px 6px rgba(0,0,0,.05); --shadow-raised:0 8px 24px rgba(0,0,0,.10);
     /* Motion */
     --ease:cubic-bezier(.2,.8,.2,1); --dur:200ms;
     /* Legacy alias (삭제 예정) */
     --peach:var(--accent-border); --peach-p:var(--accent-bg); --peach-d:var(--accent-text);
     --amber:var(--support-border); --lavender:var(--support-border); --lavender-p:var(--support-bg);
     --ink:var(--text); --ink-m:var(--text-2); --ink-l:var(--text-muted); --cream:var(--bg-page);
   }
   ```
2. **720px 레이아웃 + 단일 거터 (P-13, P-15)**: `.main-col{max-width:var(--content-max);margin-inline:auto}` 적용 후 모든 `padding:0 48px`/`28px`/`margin:0 48px`을 `var(--gutter)`로 치환하고, 중첩 컨테이너의 좌우 패딩은 0으로 둡니다.
3. **타이포 스케일 적용 (P-12)**: `font-size:13px`(63회)·`13.5px`(19회)·`12.5px`(22회) → `var(--fs-body)`/`--fs-body-sm`. `11px`·`10.5px`·`10px`·`9.5px`·`9px`(31회) → `var(--fs-caption)`. 720px 폭에 16px이면 한 줄 약 40자로 한글 적정 범위에 들어옵니다.
4. **radius 5단계로 통일 (P-14)**.
5. **인라인 스타일 153개 제거**: 우선순위는 `render.js`(46개: `getMentalHTML`, `getAloneHTML`, `getFirstAidHTML`, `initBirth`) → `index.html`(58개). 기존 클래스(`.alone-card`, `.mental-risk-box`, `.alone-quote`)가 이미 CSS에 있는데 쓰이지 않고 있습니다(P-42). 인라인을 이 클래스로 바꾸면 죽은 코드도 함께 살아납니다.
6. **테마 잔재 일괄 정리 (P-25, P-26, P-29, P-30, P-31, P-33)**: 피치 `rgba(232,137,106|184,80,48|224,123,90)` 20건, 보라 `#8A5AB4|#6A3A90|rgba(160,80,200)`, 올리브/브라운 `rhead` 13세트, 크림 배경 11곳.
7. **히어로를 밝은 배경 + 진한 글자로 (P-24)**: `.content-hero{background:var(--domain-*-bg);color:var(--domain-*-text)}`.
8. **페이지 헤더 통일 (P-16)**: 12개 페이지 모두 `.page-header`(sticky, 뒤로 가기 + 제목).
9. **바텀시트 재구현 (P-47)**: transform 기반, `z-index`를 탭바보다 높게, `bottom:0`.
10. **경고 위계 (P-08)**: 빨강은 `--crisis-*`(생명 위급·자해)만. 마음 돌봄 `mental-risk-box`, 성장 `summary-warn`, 출산 `birth-alert` 일반 항목은 `--caution-*`.
11. **아코디언·체크리스트·다이얼로그 ARIA (P-53, P-54, P-55)**, `<main>`/skip link (P-57).
12. **죽은 CSS 약 250줄과 중복 정의 삭제 (P-42, P-43, P-60)**.
13. **문서 정합화**: `SKILL.md`의 "피치 톤 / 본문 13–14px / 카드 18px / 880px / 탄성 이징"을 공식 스펙(720px, 16–18px, 16px)과 위 토큰으로 교체합니다. `design-system.md`에 **대비 검증 표**(§4 하단)와 "#7BAECB는 텍스트 금지" 규칙을 추가합니다. 이 작업을 하지 않으면 다음 테마 교체 때 같은 문제가 반복됩니다.

### 장기 (1–2개월, 구조)

1. **홈 재설계 (P-35, P-06)**: 히어로 문장 + 선택지 3개(아이·가족 / 나 자신 / 지금 위험해요) + 한 줄 기분 체크. 세부 10개 카드는 2단계 화면으로 옮깁니다. "지금 위험해요"는 붉은 채움이 아닌 outline + 진한 글자로 해서 calm을 유지하면서도 항상 첫 화면에 보이게 합니다.
2. **내비게이션 정보 구조 (P-41, P-36, P-40)**: 데스크톱 헤더 내비, 마음 돌봄 페이지 진입점 복원 또는 폐기, 선택 계층은 최대 2단, 아빠 가이드를 독립 페이지로.
3. **청소년 영역 톤 재정의 (P-32)**: 라이트 네이비 톤 또는 `--teen-*` 다크 토큰 세트. 감정 선택기는 전용 그리드 3열, 결과 색은 텍스트가 아니라 아이콘과 보더에만.
4. **안전 기능 (P-10)**: 빠른 탈출 버튼(Esc 3회 또는 우상단 고정), 브라우저 기록 안내, 위기 화면을 해시 라우트(`#crisis`)로 만들어 뒤로 가기·재방문에 대응.
5. **카드 중첩 해소 (P-37)**: 아코디언 본문을 "리스트 + 구분선" 패턴으로 바꾸고 박스 깊이를 최대 2단으로.
6. **이모지 정책 (P-39)**: 상황 카드 아이콘만 남기고 `aria-hidden` 처리. 장기적으로 단색 라인 아이콘 세트(24px, `currentColor`)로 전환하면 톤이 통일되고 다크 청소년 페이지에서도 대비가 제어됩니다.
7. **디자인 QA 자동화**: stylelint(`color-no-hex`, `declaration-property-value-allowed-list`로 font-size·radius 토큰 강제), axe-core CI, 인라인 `style=` grep 게이트(0개 목표).

---

## 6. 부록 — 측정값 원자료

| 지표 | 값 | 측정 방법 |
|---|---|---|
| `font-size` 분포 (CSS) | 13px×63, 12px×39, 12.5px×22, 13.5px×19, 11px×17, 14px×16, 20px×15, 15px×12, 11.5px×11, 16px×8, 22px×7, 18px×7, 17px×6, 10.5px×6, 26px×5, 10px×5, 9.5px×2, 28px×2, 14.5px×2, 9px×1 … | `grep -oE "font-size: ?[0-9.]+px"` |
| `border-radius` 분포 | 12×24, 20×21, 14×19, 10×15, **16×13**, 18×10, 8×7, 13×7, 24×6, 11×5, 2×4, 6×3, 22×3, 9×2, 30·28·26×1 (17종) | 같은 방법 |
| 하드코딩 hex (CSS) | 전체 273 / `:root` 밖 241 / 고유 185 | |
| `rgba(` (CSS) | 302 | |
| `var(--` 사용 (CSS) | 438 | |
| 인라인 `style="` | index.html 58, render.js 46, self-pages.js 15, features.js 13, emotion-page.js 11, app.js 7, profiles.js 3 → **153** | |
| hex (HTML/JS) | index.html 23, render.js 40, data.js 8, app.js 6, emotion-page.js 2, features.js 1 | |
| 피치 테마 rgba 잔재 | 20건 | `rgba(232,137,106|224,123,90|184,80,48|200,144,64|212,160,84|184,144,80)` |
| `!important` | 10 (청소년 헤더 6, SOS 숨김, 사이드바) | |
| 붉은 계열 색 (CSS) | 51 | |
| ⚠️ / 🚨 (HTML+JS) | 17 / 8 | |
| `onclick` div | HTML 28, JS 12 | |
| `aria-*` (index.html) | 3 | |
| `aria-expanded` | 0 | |
| `:focus-visible` / `prefers-reduced-motion` | 0 / 0 | |
| 미사용 CSS 셀렉터 | `.tl-sidebar`, `.tnode`, `.sbox`, `.mtoggle`, `.ninput`, `.gobtn`, `.view-toggle`, `.view-btn`, `.emer-btn`, `.emer-notes`, `.data-source-bar`, `.verified-badge`, `.emergency-hero-msg`, `.alone-card`, `.mental-grid`, `.emotion-selector-title`, `.age-finder`(JS만 참조) | HTML·JS 참조 grep 0건 |

대비 계산 스크립트: `/tmp/claude-0/-home-user-beinside/74d81c3d-edcb-53f4-bdf4-2f8af5e84ef5/scratchpad/cr.py`
