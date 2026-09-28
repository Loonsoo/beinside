# 콘텐츠 구조·스타일 일관성 감사 (2026-09-27)

작성: design-director · 대상 브랜치 `claude/main-safety-vxpss`
운영자 요청: "버튼마다 우리의 콘텐츠가 동일한 구조와 스타일로 나오는지도 검토해서 개선해."
사이트 코드는 고치지 않았다. 이 문서는 진단, 통일안, 순서만 담는다.

---

## 0. 범위와 방법

- **본 코드**: 커밋된 HEAD와, 조사 중에 다른 에이전트가 고치던 워킹 트리(`js/cards.js` CARD_FALLBACKS 추가, `index.html` 긴급 페이지 `#emer-119-signs` 추가, `js/render.js` 아코디언 `data-acc` 추가). 칩 도착점은 **워킹 트리 기준**(곧 합쳐질 상태)으로 다시 찍었다. HEAD 기준 도착점도 함께 적는다.
- **스크린샷**: Playwright Chromium, 390×844, 라이트·다크, 서비스워커 차단.
  폴더: `/tmp/claude-0/-home-user-beinside/74d81c3d-edcb-53f4-bdf4-2f8af5e84ef5/scratchpad/consistency/`
  - 칩 도착(워킹 트리): `c1-fever-*`, `c1-fever-nobirth-*`, `c2-crying-*`, `c3-sleep-*`, `c4-feeding-*`, `c5-call119-*`, `c6-mom-*` (각각 `-light.png`, `-dark.png`, 긴 화면은 `-full.png`)
  - 칩 도착(HEAD): `03-chip-fever-landing-*`, `04/05-chip-crying-*`, `06/07-chip-sleep-*`, `08-chip-call119-*`, `09-chip-mom-*`
  - 홈: `00-landing-*`, `01-dash-*`, `10-dash-redflags-*`
  - 기준 카드(초안 미리보기): `02-card-fever-preview-*`
  - 옛 가이드 24개: `g00-birth` ~ `g23-emergency` (라이트 전부, 다크는 birth·postpartum·growth·sp·sleep·emergency)
  - 한눈 비교 시트: `sheet-A.png`(birth·growth·sp·dad·sleep·emotion), `sheet-B.png`(mental·teen·journal·burnout·workplace·elder), `sheet-C.png`(menopause·multicultural·adhd·independence·senior·emergency), `sheet-D-dark.png`, `sheet-E-chips.png`
  - 측정값: `metrics.json`(HEAD), `metrics-wip.json`(워킹 트리). 화면별 제목 글꼴·크기, 섹션 제목, 컴포넌트 수, 번호 링크 클래스·높이, 이모지 수, 인라인 스타일 수.
- **한계**: 이 환경에서 웹폰트(jsDelivr)가 로드되지 않아(`document.fonts` 로드 0) 스크린샷 글자는 대체 글꼴이다. 글꼴 판정은 계산된 CSS `font-family` 값으로 했다. 1280px는 이번 범위에서 찍지 않았다.

---

## 1. 목록화: 누를 수 있는 것과 도착 화면

### 1-1. 진입점

| 진입점 | 위치 | 도착 (HEAD) | 도착 (워킹 트리) |
|---|---|---|---|
| 칩 "열이 나요" | 랜딩·대시보드 | 긴급 도움 페이지 맨 위(번호 목록) | growth 월령 가이드 › 응급처치 아코디언 › "고열 대처" 박스 |
| 칩 "안 그치고 울어요" | 랜딩 / 대시보드 | 랜딩 `#pp-l-night` / 대시보드 `#pp-night` 펼침 | growth › **아빠 가이드 탭** › "아기가 계속 울어요" |
| 칩 "밤에 안 자요" | 〃 | growth(날짜 있으면 월령 결과) | growth › "아이가 밤에 안 자요" 툴킷(0~12개월) |
| 칩 "잘 안 먹어요" | 〃 | growth(〃) | growth 월령 › "신체 발달 & 의학 체크" 펼침 |
| 칩 "바로 119" | 〃 | 긴급 도움 페이지 맨 위 | 긴급 도움 › `#emer-119-signs`(새 박스) |
| 칩 "엄마가 힘들어요" | 〃 | 산후 마음 페이지 › 자가 체크 아코디언 | 같음 |
| 타일 "마음 신호 확인" | 대시보드 | 산후 마음 › 자가 체크 | 같음 |
| 타일 "새벽에 할 수 있는 것 3가지" | 대시보드 | 제자리 펼침(`pp-details`) | 같음 |
| 타일 "바로 연락해야 하는 신호" | 대시보드 | 제자리 펼침(119·109·1577-0199 단계) | 같음 |
| 타일·버튼 "다른 상황 보기" | 랜딩·대시보드 | `#home-other` 옛 분기 그리드 → 가이드 21개 | 같음 |
| 링크 "날짜 없이 둘러보기" | 랜딩 | `#pp-l-night`로 스크롤 | 같음 |
| 링크 "지금 많이 힘들어요" | 랜딩 | 제자리 응답(109 전화·문자 먼저) | 같음 |
| 메뉴 "도움 번호와 응급처치" | 헤더 메뉴 | 긴급 도움 페이지 | 같음 |
| 메뉴 가이드 칩 11개 | 헤더 메뉴 | birth·postpartum·growth·sp·dad·sleep·emotion·mental·relation·teen·journal | 같음 |
| 분기 그리드 카드 21개 + "긴급" | `#home-other` | growth·sp·birth·dad·elder·grief·multicultural / emotion·burnout·relation·sleep·postpartum·menopause·adhd·addiction·senior / independence·finance·workplace·transition·teen + emergency | 같음 |

옛 가이드 = 분기 그리드 21개 + emergency + mental + journal = **24개**. 카드 화면(`page-card`)은 게시 카드 0장이라 칩에서 한 번도 도착하지 않는다.

### 1-2. 렌더러 계열 (같은 계열은 같은 모양)

| 계열 | 만드는 곳 | 화면 | 헤더 | 제목 글꼴·크기 | 섹션 컴포넌트 | 번호 버튼 | 아이콘 |
|---|---|---|---|---|---|---|---|
| **K 카드** | `js/cards.js` cardHTML | card (초안만) | `.bc-head` 키커+제목+요약 | Gowun Batang 26px | `.bc-sec` + `.bc-h`(Pretendard 18/700), `.bc-now`·`.bc-soon`·`.bc-mom`·`.bc-foot` | `.bc-call`(65px, 번호+설명 2줄), `--urgent`, `.tel-inline`+`.bc-telnote` | 선 아이콘(`#i-phone`)만, 이모지 0 |
| **H 홈** | `index.html` + `js/pp-home.js` | 랜딩·대시보드·펼침 타일 | 랜딩 하늘 / 대시보드 시간 띠 | 28px(랜딩 h1), Pretendard 22px(대시보드 h1), 섹션 Gowun 21px, "도움이 필요할 때"만 Pretendard 18px | `.pp-l-sec`, `.pp-details`, `.pp-list` | `.pp-call`(56px 한 줄), `--stack`(60~79px), `--primary`, `--urgent` | 선 아이콘만, 이모지 0 |
| **S 상황형** | `js/new-pages.js` `_guideSituationPicker/_guideSituationDetail` + 전용 렌더러 | emotion·burnout·relation·transition·sleep·grief·postpartum·menopause·workplace·elder·senior (11) | `.content-hero` 페이지별 그라데이션 + 이모지 | Gowun 19px (흰 글자) | `.step-section`/`.step-label` → `.accordion-item`(제목 앞 이모지 🧠🔍⏸️📅🏥📞) | `.help-card` **번호 왼쪽 "📞 번호"** | 이모지 화면당 6~102개 |
| **G 섹션형** | `_guideHero/_guideSection/_guideCards/_guideHelp` | adhd·addiction·finance (3) | `.guide-hero` 무배경 가운데 정렬 | Gowun 22px | `.guide-section h2`(Pretendard 17px) + `.guide-card` 이모지 그리드 | `.help-card` **번호 오른쪽**, "📞 도움받을 수 있는 곳" 접힘 | 이모지 7~16개 |
| **R 옛 렌더** | `js/render.js`, `index.html` 정적 | growth·dad·sp·birth·mental·teen (6) | `.content-hero`(growth·dad·sp·birth) / `.page-header` h2(mental·teen) / 월령 결과는 `.rhead` 데이터 hex 그라데이션 | Gowun 19px / Pretendard 16px | `.acc-section`(다른 아코디언) > `.card` > `.fa-item`, `.summary-panel`, `.pc-item`, `.symptom-item`, `.dad-toolkit-block` | 본문 안 tel 버튼 거의 없음(기관 목록 `.center-item`만). birth 증상 결과는 **번호가 글자로만** | 이모지 10~44개 |
| **E 긴급** | `index.html` + `getFirstAidHTML` | emergency (1) | `.page-header` h2 | Pretendard 16px | `.emergency-list` → `.emer-alt-*` → (워킹 트리) `.emer-119` → `.card.cbg-emergency` > `.fa-item` | `.emer-row`(큰 번호, 번호마다 다른 색), `.emer-alt-row`, `.pp-call--urgent`(새 박스), `.fa-urgency` "즉시 119" 배지(링크 아님) | 🚑💜🚨💚🌸💙💬💻 |
| **기타** | 각자 | journal(도구), multicultural(`.mc-*`), independence(자체 아코디언) (3) | journal `.page-header` Gowun 22px / multicultural·independence `.content-hero` **배경 없음** | 19~22px | 각자 | `.mc-emer-item`, 클래스 없는 `<a>` | 이모지 11~20개 |

### 1-3. 칩 도착 화면별 상세 (워킹 트리)

| 칩 | 도착 섹션 구조 | 카드 5칸 대응 | 4단계 대응 | 번호 버튼 | 색·잔재 |
|---|---|---|---|---|---|
| 열이 나요 (`c1-fever`) | 아코디언 10번째 "🩺 응급처치 가이드" › 분홍 카드 › 6칸 중 "고열 대처" 초록 테두리 박스(목록 6줄) › "💡 예방이 최선" | 병원 갈 때(일부)만. 무슨 일인지·지금 할 일(체온 재기)·엄마·더 도움 없음 | 판단 일부 | 본문 0개(하단 도크만) | `.cbg-emergency` 핑크 hex 그라데이션(`#FFF5F2`→`#FFF0EE`), 3겹 박스 |
| 안 그치고 울어요 (`c2-crying`) | 아빠 탭 › "지금 급한 상황" › "⚡ 아기가 계속 울어요" 6단계(파란 번호) | 지금 할 일만 | 행동 | 0개 | 아빠 가이드 파랑, 탭 이름 "👨 아빠 가이드" |
| 밤에 안 자요 (`c3-sleep`) | 툴킷 "🌙 아이가 밤에 안 자요" › 연령 알약 › 4단계 카드 › 🚨 엎드려 재우기 경고 | 지금 할 일 + 경고 1줄 | 행동 | 0개 | 복숭아색 패널 배경 |
| 잘 안 먹어요 (`c4-feeding`) | 월령 결과 › "🌱 신체 발달 & 의학 체크" 펼침(체중·수면·수유 횟수·접종) | 무슨 일인지(정상 범위)만. "잘 안 먹을 때" 할 일·기준 없음 | 인식 | 0개 | `.rhead` hex 그라데이션, 대상 배지 이모지 |
| 바로 119 (`c5-call119`) | `.emer-119` 박스(119 버튼 + 신호 6줄) → 아래 응급처치 | 병원 갈 때(지금 바로) | 판단 → 도움 | `.pp-call--urgent` 1 + 위쪽 `.emer-row` 6 | 번호마다 다른 색(`--emer-*`) |
| 엄마가 힘들어요 (`c6-mom`) | 모브 히어로 → 통계 배지 → 인식 목록 → 아코디언 8개(🧠·🔍 체크 펼침·⏸️·📅·🏥·⚠️·💑·📞) → 복숭아 링크 박스 | 무슨 일인지·지금 할 일·더 도움(접힘) 있음, 병원 갈 때 = "🏥 전문적 도움 받기"(행동 체크리스트 속) | 4단계 모두 | `.help-card` 3(접힌 아코디언 안) | 모브 히어로, 인라인 스타일 43개, 옛 피치 rgba |

기준이 되는 카드 화면(`02-card-fever-preview`)은 인라인 스타일 0, 이모지 0, 5칸 순서 고정, 번호 버튼 한 모양이다. **칩 6개 중 이 구조에 도착하는 것은 0개**다.

### 1-4. 좋은 점 (유지)

- 하단 위기 도크(109 전화 · 109 문자 · 119 · 마들랜)는 **찍은 35개 화면 전부**에서 같은 자리, 같은 모양으로 보였다. 원칙 2("위기 연결은 한 층으로, 늘 같은 자리에")는 지켜지고 있다.
- 홈(H)과 카드(K)는 토큰만 쓰고, 이모지가 없고, 번호 버튼에 설명 한 줄을 붙인다. 통일의 기준으로 삼을 만하다.
- 다크: 토큰을 쓰는 화면은 모두 이끼 그늘 팔레트로 바뀐다. 문제는 인라인 hex를 쓰는 곳에만 있다(§2-2).

---

## 2. 불일치 목록 (심각도순)

심각도: **S1** 안전·신뢰에 직접 영향, 배포 전에 처리 / **S2** 사용자가 바로 느끼는 불일치 / **S3** 정리 부채.

### 2-1. 구조 불일치

| # | 심각도 | 내용 | 근거 |
|---|---|---|---|
| A1 | **S1** | **같은 질문에 서로 다른 답.** "열이 나요" 도착점(고열 대처)에 제품명·용량 지시가 있다: "해열제: 아세트아미노펜(타이레놀계) or 이부프로펜 체중 기준 용량으로", "6개월 이상 → 해열제 투여 후 경과 관찰". CLAUDE.md "약 용량·제품명 금지" 위반이고, 초안 카드("해열제는 먹이기 전에 소아과나 약사에게 물어봐요")와 반대 방향이다. 같은 박스의 "수분 보충(모유·분유·**보리차**)"도 6개월 미만에게 맞는지 확인되지 않았다. | `js/render.js:201-204`, 스크린샷 `c1-fever-light.png` |
| A2 | **S1** | **"안 그치고 울어요" 도착점이 흔들기를 권한다.** "쉿 소리 내며 세워 안고 리듬감 있게 흔들기 (강하게 흔들기는 절대 금지)". 랜딩·대시보드의 검수 문장은 "아기를 흔들지 마세요"다. 새벽에 한계에 몰린 사람에게 둘 중 하나만 닿아야 한다. 또 이 도착점은 "아빠 가이드" 탭이라 "엄마 중심 호칭" 원칙과도 어긋난다. | `js/data.js:131`, `c2-crying-light.png` vs `00-landing` |
| A3 | **S1** | **칩 도착 화면에 "병원 갈 때"와 "더 도움이 필요하면"이 없다.** growth 계열 4곳(열·울음·잠·먹기)은 본문 안 전화 버튼이 0개다(하단 도크와 기관 목록만). 카드 5칸을 채우는 도착 화면은 0곳. | `metrics-wip.json` tels |
| A4 | S2 | **칩이 약속한 것과 도착한 내용이 다르다.** "잘 안 먹어요" → 정상 발달 범위(수유 횟수·체중)로, 안 먹을 때 할 일·병원 기준이 없다. "밤에 안 자요"는 0~12개월 툴킷이 있지만 1~3세·4~6세 알약이 함께 보여 범위(0~12개월)를 벗어난다. | `c3`, `c4` |
| A5 | S2 | **섹션 순서가 계열마다 다르다.** S: 인식 → 원리(🧠) → 기법 → 판단 → 행동 → 도움. G: 인식 → 원리 → 치료 → 행동 → 비교 → 도움(접힘). R(growth): 긍정 체크 → 요약 3 → 뇌 → 정서 → 신체 → 주의 → 활동 → 역할 → 체크포인트 → 마음 → 혼자 자라는 아이 → **응급처치(10번째)** → 메모. E: 번호 → 대안 채널 → 119 신호 → 응급처치. 카드는 "급하면 맨 위 119"인데 옛 가이드는 급한 내용이 가장 아래에 있다(예외: birth는 증상 체크가 맨 위). | 각 `g*-full.png` |
| A6 | S2 | **도움 연결 위치가 제각각.** 맨 위(E), 맨 아래 접힘(S·G), 없음(R). S·G의 "📞 도움 연결"은 접혀 있어 번호가 첫 화면에 안 보인다. | `g11`, `g18` |
| A7 | S2 | **출처·확인 날짜·진료 대체 문구는 카드에만 있다.** 옛 가이드는 통계 배지 옆 출처만 있고 확인 날짜와 "진료를 대신하지 않아요"가 없다. 의학 내용이 있는 growth·birth·emergency도 같다. | `g00`, `g02`, `g23` |
| A8 | S3 | 4단계 프레임워크와 카드 5칸의 대응 규칙이 문서에 없다. 4단계는 판단이 행동보다 먼저이고, 카드는 행동 → 병원 기준 순서다(급한 판단은 맨 위 띠가 맡음). | CLAUDE.md |

### 2-2. 스타일 불일치

| # | 심각도 | 내용 | 근거 |
|---|---|---|---|
| B1 | **S1** | **제목이 보이지 않는 히어로 2곳.** multicultural·independence의 `.content-hero`는 배경이 없는데(투명) 제목은 흰색이다. 2.5초 기다려도 `background: none`, 글자 `rgb(255,255,255)`. 대비 실패. | `g17`, `g21`, `multicultural-hero-2s.png`, `independence-hero-2s.png` |
| B2 | S2 | **히어로 색이 12가지.** 산후 마음·출산 회복은 모브/장미색(성별 고정관념 팔레트), 감정은 보라, 번아웃은 호박색, 청소년은 화면 전체 남색, 수면은 남회색 등. 카드·홈은 히어로가 없다. | `sheet-A/B/C.png`, `css/base.css:187-194`, `new-pages.js` 인라인 그라데이션 7곳 |
| B3 | S2 | **제목 체계가 7가지.** 랜딩 28 Gowun / 카드 26 Gowun / guide-hero 22 Gowun / journal 22 Gowun / 대시보드 22 Pretendard / content-hero 19 Gowun 흰 글자 / page-header 16 Pretendard. 섹션 제목도 `bc-h` 18, `guide-section h2` 17, 아코디언 약 14~15 + 이모지, `step-label` 작은 회색, `.card h3` + 이모지. | `metrics.json` heads |
| B4 | S2 | **이모지 아이콘.** 카드·홈 0개, 옛 가이드 화면당 5~102개(elder 102, senior 79, workplace 44, growth 월령 결과 32~44). 섹션 제목마다 이모지 접두(🧠🔍⏸️📅🏥📞). 원칙 4("꽃·하트 같은 기호 금지")와 충돌하는 🌸💜💑도 산후 화면에 있다. | `metrics.json` emoji |
| B5 | S2 | **박스 안 박스.** growth 고열: 아코디언 > 분홍 카드 > 위험 띠 > 초록 테두리 박스 > 목록(3~4겹). 카드는 섹션 1겹 + 병원 박스 1겹. | `c1-fever-light.png` |
| B6 | S3 | **하드코딩 색·인라인 스타일.** 인라인 `style=`: `new-pages.js` 124, `index.html` 98, `render.js` 45(elder 화면 한 장에 188개 요소). hex: `render.js` 28(월령 그라데이션 `g:[...]`), `dashboard.js` 23, `index.html` 28. 옛 피치·모브 rgba 잔재: `rgba(212,121,94)`(index.html dad 버튼, dashboard.js), `rgba(176,123,172)`·`rgba(212,160,176)`(new-pages.js 산후 링크 박스, pages.css, dark.css). `.cbg-emergency` 라이트·다크 hex(`base.css:819`, `dark.css:207`). `pages.css`에 `var(--peach*)` 98회(값은 세이지로 별칭돼 있지만 이름이 남아 새 코드가 계속 따라 씀). | grep 집계 |
| B7 | S3 | 다크: 산후 모브 히어로는 다크에서도 모브, `.cbg-emergency`는 다크 전용 hex 적갈색. 토큰 화면과 톤이 따로 논다. | `sheet-D-dark.png` |

### 2-3. 위기 연결 표현 불일치

| # | 심각도 | 내용 | 근거 |
|---|---|---|---|
| C1 | **S1** | **번호가 링크 없이 글자로만.** birth 증상 체크 결과 "🚨 즉시 119에 전화하세요", "109(무료·24시간)로 연락해 보세요"는 `textContent`로 들어가 tel: 링크가 아니다. 응급처치 박스의 "즉시 119" 배지도 링크가 아니다. CLAUDE.md "모든 전화번호 tel: 링크 필수" 위반. | `index.html:992-1008`, `js/app.js:366-373`, `render.js` `.fa-urgency` |
| C2 | **S1** | **터치 44px 미만 번호 링크.** elder 37px ×6(1577-1000, 1899-9988, 129, 132), dad 38px(1577-0199), multicultural 16px(1577-5432). | `metrics.json` |
| C3 | S2 | **번호 버튼 모양이 13가지 이상.** `.bc-call`, `.bc-call--urgent`, `.pp-call`, `.pp-call--stack/--primary/--urgent`, `.emer-row`(번호 색 6가지), `.emer-alt-row`, `.help-card`(번호 왼쪽 📞 / 번호 오른쪽 두 배치), `.teen-sos-btn`, `.mc-emer-item`, `.center-item`, `.crisis-dock-btn`, `.tel-inline`, 클래스 없는 `<a>`. 높이 26~170px. 워킹 트리의 긴급 페이지 한 장에만 119가 세 모양(`.emer-row` 큰 빨간 숫자, `.pp-call--urgent`, 링크 아닌 배지)으로 나온다. | `metrics*.json` tels |
| C4 | S2 | **같은 119 인라인 링크 색이 화면마다 다르다.** 대시보드는 빨강(`rgb(158,63,63)`), 랜딩·카드는 먹색. | `metrics.json` 00 vs 01 |
| C5 | S2 | **번호 설명 문구가 제각각.** 119: "구급차와 응급 출동"(홈) / "응급 상황, 지금 위험할 때"(카드·HELPLINES) / "신체 응급 · 구급차. 24시간"(긴급) / "구급차 · 24시간"(새 박스). 1577-0199 이름: "정신건강위기상담전화" / "정신건강 위기상담". `js/helplines.js`를 거치지 않는 번호가 대부분이다(tel 링크 약 150개 중 HELPLINES 경유는 카드·홈 일부). | grep |
| C6 | S3 | S·G 계열 "📞 도움 연결"은 접힘 기본값이라 첫 화면에 번호가 안 보인다(하단 도크가 있어 S1은 아님). | `g11`, `g18` |

---

## 3. 통일안

### 3-(a) 공통 "콘텐츠 셸" = 카드 렌더러 컴포넌트

**원칙: 새 클래스를 만들지 않는다. `js/cards.js`의 `.bc-*`를 그대로 쓰고, 옛 컴포넌트는 셸로 옮긴 뒤 지운다.**

| 셸 요소 | 클래스 (cards.js와 같음) | 규칙 | 대체되는 옛 컴포넌트 |
|---|---|---|---|
| 페이지 래퍼 | `article.bc` (+ `.bc-wrap` 폭 640px) | 모든 콘텐츠 화면의 바깥 틀. 글꼴·줄간격·`keep-all`을 여기서 받는다 | `.page-view` 안의 제각각 여백 |
| 페이지 헤더 | `.bc-head` > `p.bc-kicker` + `h1.bc-title` + `p.bc-summary` | 제목 Gowun Batang 26px 하나. 배경·그라데이션·이모지 없음. 키커로 종류를 알린다: "아기 첫 1년 · 상황 카드" / "아기 첫 1년 · 상황 요약" / "참고 가이드" | `.content-hero`, `.guide-hero`, `.page-header`, `.rhead`, `.teen-page-header` |
| 긴급 띠 | `.bc-urgent` > `.bc-urgent-t` + `.bc-call--urgent` | 급한 기준이 있는 화면만, 헤더 **위** | birth 증상 결과, `.fa-urgency` 배지, `.emer-119`, `cbg-emergency` 위험 띠 |
| 섹션 | `section.bc-sec` > `h2.bc-h` / `h3.bc-h3` | 제목에 이모지 없음. 접어야 하면 `details.bc-sec` + `summary.bc-h`(새 클래스 없이 요소만 바꿈) | `.accordion-item`, `.acc-section`, `.guide-section`, `.step-section`/`.step-label`, `.card h3` |
| 목록 | `ul.bc-list`, `ol.bc-list--num`, `ul.bc-list--qa`(`.bc-q`/`.bc-a`) | 점·번호 모양 하나 | `.recognition-list`, `.summary-list`, `.dad-toolkit-step`, `.fa-item ol`, `.guide-card` 그리드, `.technique-item` |
| 번호 버튼 | `a.bc-call`(+`--urgent`) = `cardCallHTML(key)` | 번호 + 행동 + 한 줄 설명. 119만 `--urgent`(56px). 번호는 `js/helplines.js`에서만 | `.help-card`(2종), `.emer-row`, `.emer-alt-row`, `.mc-emer-item`, 클래스 없는 `<a>`, `.teen-sos-btn`(모양만; 빠른 나가기 동작은 유지) |
| 문장 속 번호 | `a.tel-inline` + 첫 등장 `.bc-telnote` = `cardRich()` `{{key}}` | 색은 본문색 하나(대시보드 빨강 제거) | 글자로만 쓴 번호 |
| 병원 갈 때 | `.bc-now`(지금 바로 119·응급실) + `.bc-soon`(오늘 소아청소년과) | 병원 기준은 이 두 박스에만. `.bc-now`에만 빨강 | `.fa-item.fa-red/amber/green`, `.summary-warn`, `.cbg-a` 주의 카드 |
| 엄마 박스 | `section.bc-sec.bc-mom` | "이때 엄마가 흔히 느끼는 것" + "흔히 겪는 문제 → 할 수 있는 것" | postpartum `partnerTip`, dad "아빠의 마음", growth "정신건강 & 마음 돌봄" |
| 더 도움 | 마지막 `section.bc-sec[data-bc-end]` + `.bc-actions` + `.bc-fixed`(109·119 고정 줄) | 모든 콘텐츠 화면 끝에 같은 모양 | "📞 도움 연결" 아코디언, `_guideHelp` 접힘 |
| 출처·날짜·고지 | `.bc-foot` > `.bc-src`, `.bc-dates`, `.bc-disclaimer` | 의학 내용이 있는 화면은 필수 | `.stat-badge` 출처, 없음 |
| 다른 화면 링크 | `.bc-link` / `.bc-tool` | "자세한 안내" 링크도 이것 | 복숭아 링크 박스, `.page-back`, 인라인 스타일 버튼 |

구현 방식(권장): `cardHTML()`을 **조각 함수**로 나눈다. `cardHeadHTML`, `cardSecHTML(title, bodyHTML)`, `cardHospitalHTML(now, soon)`, `cardMomHTML`, `cardMoreHTML(keys)`, `cardFootHTML`. 카드·요약·옛 가이드가 같은 조각을 부른다. cards.js는 DOM 없이 도는 조건(정적 빌드)이 있어 조각도 문자열만 돌려준다. HELPLINES에 없는 기관 번호(1577-1000, 129, 132 등)는 `cardCallHTML`에 `{number, name, desc}` 객체도 받게 넓힌다.

- 난이도: 중(렌더러 분리는 가볍고, CSS는 이미 있음) · 위험: 낮음(카드 출력은 같게 유지, `tests/cards.test.js`가 지킴) · 순서: 1단계

### 3-(b) 칩 6개 → 모두 같은 카드 템플릿 화면

**구조**: 칩은 언제나 `page-card`로 간다. 게시 카드가 있으면 카드, 없으면 **상황 요약 카드**(같은 `cardHTML` 조각, `status: 'summary'`). 옛 가이드의 특정 아코디언을 찾아 펼치는 지금의 `CARD_FALLBACKS`는 요약 카드가 생기면 "자세한 안내" 링크 대상으로만 남긴다.

요약 카드 모양:
```
[.bc-urgent]  (열·119만) 기존 문장 + 119 버튼
.bc-head      키커 "아기 첫 1년 · 상황 요약"  제목 "아기가 열이 나요"
[.bc-draft 자리, 중립색] "사이트에 이미 있던 안내를 한곳에 모았어요. 공식 출처와 한 줄씩 대조한 상황 카드는 준비 중이에요."
무슨 일인지 / 지금 할 일 / 병원 갈 때 / 이때 엄마가 흔히 느끼는 것 / 더 도움이 필요하면
.bc-foot      "이 요약에 모은 안내" (옛 가이드 내부 링크) · "모은 날 2026-09-xx" · 진료 대체 아님 고지
.bc-link      "자세한 안내: 아이 성장 › 응급처치 가이드" (지금의 CARD_FALLBACKS 도착점)
```
빈 칸은 지우지 않고 한 줄로 둔다: "이 상황에 맞춘 안내는 준비 중이에요. 급하면 위 119, 걱정되면 소아청소년과에 물어봐요." 칸 순서가 모든 칩에서 같아야 사용자가 위치를 외운다.

**칩별 재배치 (기존 공개 문장만, 새 주장 없음)**

| 칩 | 무슨 일인지 | 지금 할 일 | 병원 갈 때 | 엄마 | 더 도움 | 빼는 문장 |
|---|---|---|---|---|---|---|
| 열이 나요 | (준비 중 한 줄) | (준비 중 한 줄) | now: "생후 3개월 미만 38℃ 이상 → 바로 응급실"(render.js·랜딩·emer-119), "경련이 5분 넘게 이어져요"(emer-119) / soon: "3~6개월 39℃ 이상 → 당일 소아과"(render.js:199) | (준비 중) | 119 | 해열제 제품명·용량, "6개월 이상 해열제 투여 후 관찰", 미지근한 물 닦기, 보리차 (A1) |
| 안 그치고 울어요 | (준비 중) | 랜딩 "새벽 3가지" 1번 전문(검수 문장), data.js:131의 1~3단계(먹였는지·기저귀·트림) | "평소와 다르게 울거나 열이 나면(3개월 미만은 38℃ 이상) 바로 진료"(랜딩) | 랜딩 2·3번(몸 챙기기, 109 문자) | 109 · 1577-0199 · 119 | "리듬감 있게 흔들기" (A2) |
| 밤에 안 자요 | (준비 중) | 툴킷 0~12개월 4단계(트림·방 온도·백색 소음·수면 의식) | now: "영아는 엎드려 재우지 않아요"는 병원 기준이 아니라 안전 수칙 → 지금 할 일 첫 줄로 / 병원 칸은 공통 한 줄 | 랜딩 2·3번 | 109 · 1577-0199 | 1~3세·4~6세 단계 |
| 잘 안 먹어요 | growth 월령 "수유 24시간 8~12회" 등 정상 범위(해당 월령만) | (준비 중) | 공통 한 줄 | (준비 중) | 1577-0199 · 119 | 접종 줄(다른 주제) |
| 바로 119 | (없음, 긴급 띠가 대신) | "응급처치 가이드" 링크만(심폐소생술·기도 폐쇄 절차는 요약에 옮기지 않음, 그대로 링크) | now: emer-119 신호 6줄 | — | 119 · 109 | — |
| 엄마가 힘들어요 | postpartum 인식 목록 | "마음 신호 확인(2분 · 7가지 질문 · 진단 아님)" 버튼 + "오늘 당장 할 수 있는 것" | 대시보드 "바로 연락해야 하는 신호" 3단계(정신과 감수 반영본, copy-review §8) | postpartum partnerTip 중 엄마에게 해당하는 것 | 109 · 1577-0199 · 1366 · 119 | 통계 배지 |

**CLAUDE.md 의학 정보 규칙과 충돌하는 지점과 해결책**

| 충돌 | 왜 문제인가 | 해결 제안 |
|---|---|---|
| 1. "모든 카드에 공식 출처 2개 이상 + 확인 날짜" | 옛 가이드 문장에는 문장별 출처가 없다. 카드 모양으로 보여 주면 출처가 있는 것처럼 보인다 | 요약 카드는 **"카드"라고 부르지 않는다**(키커 "상황 요약"). 출처 칸 제목을 "출처" 대신 **"이 요약에 모은 안내"**로 바꾸고, 공식 출처 대신 내부 페이지 링크를 단다. 날짜는 "확인"이 아니라 **"모은 날"**. 테스트: `status:'summary'`는 출처 2개 규칙 대신 `from` 필수 규칙을 적용 |
| 2. 초안 게이트 우회 | fever·crying·call-119는 원문 미확인 초안이라 막혀 있다. 요약이 같은 제목으로 먼저 나가면 사실상 게시와 같다 | 요약에는 **초안 카드 문장을 쓰지 않는다**. 옛 가이드와 홈의 공개 문장 중 초안 카드와 **뜻이 같은 것만** 쓴다(교집합). 카드가 published가 되면 칩이 자동으로 카드로 간다(지금 로직 그대로) |
| 3. "새 의학 주장 금지"를 사람이 지키기 어렵다 | 옮기면서 문장을 다듬다 보면 뜻이 바뀐다 | 요약 항목마다 `from: '파일:줄'` 또는 원문 문자열을 달고, 테스트가 **원문이 소스에 그대로 있는지** 대조한다. 허용 수정은 어미(합니다→해요)·띄어쓰기뿐. 이 규칙은 테스트 주석에 적는다 |
| 4. 옛 문장끼리 기준이 다를 때 | A1·A2처럼 공개 문장 사이에 충돌이 있다 | "더 보수적인 쪽" 규칙을 요약에도 적용. 약 이름·용량·진단 추정이 있는 문장은 요약에 들이지 않는다. 충돌 문장 목록은 콘텐츠 담당에게 넘겨 원본도 고친다(§4 0단계) |
| 5. 공유·검색 노출 | 요약이 퍼지면 검토 안 된 정보가 카드처럼 돈다 | 요약에는 공유 버튼 없음, 정적 빌드·사이트맵 제외, `noindex`. "틀린 곳 알려 주기"는 둔다 |

대안(운영자 선택지): **B2 "준비 중" 셸** — 요약 문장을 싣지 않고 헤더 + 긴급 띠 + 병원 공통 한 줄 + 더 도움 + "자세한 안내" 링크만 둔다. 의학 위험은 가장 낮지만 칩을 누른 사람이 한 번 더 눌러야 한다.
**추천: B1 요약 카드.** 단, 열·119 요약은 병원 기준 문장만(위 표대로) 담아 B2에 가깝게 둔다. 새벽에 칩을 누른 사람이 같은 틀에서 "지금 할 일 / 병원 기준 / 번호"를 한 번에 보는 것이 이번 요청의 핵심이다.

- 난이도: 중(데이터 6개 + 렌더 분기 + 테스트) · 위험: 중(문장 출처 대조 필요, 테스트로 줄임) · 순서: 2단계

### 3-(c) 옛 가이드 24개: 겉부터 공통 셸로 (단계별)

내용·섹션 순서는 이번 단계에서 건드리지 않는다. **헤더, 섹션 제목, 번호 버튼, 아이콘**만 셸로 바꾼다.

| 단계 | 할 일 | 대상 | 난이도 | 위험 | 확인 |
|---|---|---|---|---|---|
| C-0 (선행, 콘텐츠 담당) | S1 안전 항목: 해열제 제품명·용량 줄 삭제(A1), 흔들기 줄 교체(A2), birth 증상 결과 번호를 tel 링크로(C1), 44px 미만 링크(C2), 흰 제목 투명 히어로(B1) | render.js·data.js·index.html·new-pages.js·multicultural·independence | 낮음 | 낮음 | `npm test`, 390 스크린샷 |
| C-1 헤더 | 히어로 4종 → `.bc-head`. `_guideHero`, `_guideSituationPicker`, 전용 렌더러 7곳의 인라인 그라데이션, index.html 정적 헤더, `.rhead`. 키커는 "참고 가이드 · (주제)" | 24개 전부(teen은 톤 유지 위해 색만 예외 검토) | 중 | 낮음(렌더 함수 몇 곳에 모임) | 제목 26px 하나, 이모지 0 |
| C-2 번호 버튼 | 헬퍼 하나(`cardCallHTML` 확장)로 `.help-card` 2종·`.mc-emer-item`·클래스 없는 `<a>` 교체. S·G의 "📞 도움 연결"은 **펼친 상태**의 마지막 `.bc-sec`로. emergency의 `.emer-row` 6개도 `.bc-call` 목록으로(119만 `--urgent`) | 번호 있는 20개 | 중 | 중(번호·설명 문구가 바뀜 → `safety.test.js`의 109·1577-0199 검사 재확인) | 번호 링크 전부 44px 이상, 119 56px, 번호 설명은 `helplines.js`에서만 |
| C-3 섹션 제목 | `.accordion-header`/`.acc-header`/`.step-label`/`.guide-section h2`의 **글자 스타일**을 `.bc-h`/`.bc-h3`로. 제목 앞 이모지 제거. 아코디언 동작은 유지(다음 단계에서 `details`로) | 24개 | 낮음 | 낮음 | 섹션 제목 18/15px 두 단계 |
| C-4 아이콘 | 이모지 → 선 아이콘(`#i-*` 기존 스프라이트) 또는 없음. `.guide-card-icon`, `.action-emoji`, 대상 배지(👨‍👩‍👧), 번호 앞 📞, 🌸💜💑 | 24개(elder·senior·workplace 먼저 양이 많음) | 중(아이콘 매핑표 필요, brand-visual-designer) | 낮음 | 화면당 이모지 0(사용자 입력 기분 버튼 제외) |
| C-5 색 정리 | 인라인 `style=` 제거, `--hero-*`·`--peach*` 이름 퇴역(별칭 → 의미 토큰), `.cbg-emergency`·`rgba(212,121,94)`·`rgba(176,123,172)` 제거, `.tel-inline` 색 하나 | 전역 | 중 | 중(다크 회귀) | 하드코딩 색 0, 다크 확인 |
| C-6 구조(나중) | 0~12개월 관련 5개(emergency·growth 0~12·postpartum·birth·dad)만 카드 5칸 순서로 재배치. 나머지는 "참고 가이드" 표시로 두고 메뉴 하위로 | 5개 | 높음 | 높음(내용 이동) | 운영자 확인 후 |

**가이드 순서(C-1~C-4 공통)**: ① emergency, growth(0~12개월), postpartum, birth — 칩이 닿는 곳 ② dad, sp, sleep, mental — 메뉴 상단 ③ 마음 계열 S 7개 ④ G 3개(adhd·addiction·finance) ⑤ elder·senior·workplace·transition·grief·independence·multicultural·teen·journal. teen과 multicultural은 대상이 달라(청소년 반말, 다국어) 헤더 모양만 맞추고 톤·색 일부는 예외로 둘지 운영자에게 묻는다. journal은 도구 화면이라 헤더만 맞춘다.

---

## 4. 추천 순서 (전체)

1. **C-0 안전 수정 5건** — 지금 칩 작업 중인 에이전트에게 먼저 넘긴다. 특히 A1(해열제 제품명)·A2(흔들기)는 워킹 트리가 칩을 바로 그 문장으로 보내고 있어 **이 상태로 합치면 안 된다.**
2. **3-(a) 셸 조각 함수 분리** — 카드 출력 불변, 테스트 유지.
3. **3-(b) 상황 요약 카드** — 운영자가 B1/B2 선택 후. `from` 대조 테스트를 같이 넣는다.
4. **C-1 헤더 → C-2 번호 버튼 → C-3 섹션 제목 → C-4 아이콘** (가이드 순서 ①→⑤)
5. **C-5 색 정리**, 마지막에 **C-6 구조** (운영자 확인).

각 단계 승인 기준: 대비 AA(본문 4.5:1), 터치 44px(119 56px), 포커스 표시, 움직임 줄이기, 위기 도크 전 화면 확인, 하드코딩 색 없음, 다크, 390·1280 스크린샷, `npm test`. 구현은 hig-builder, 검수는 hig-auditor, 아이콘 매핑·`--peach` 퇴역 토큰은 brand-visual-designer.

## 5. 운영자 결정이 필요한 것

1. 칩 도착: **B1 상황 요약 카드(추천)** vs B2 "준비 중" 셸 vs 지금처럼 옛 가이드 속 섹션으로 이동.
2. 요약 카드의 출처 칸을 "이 요약에 모은 안내 + 모은 날"로 표시하는 것에 동의하는지(CLAUDE.md "출처 2개 이상" 규칙의 예외로 명시 필요).
3. "안 그치고 울어요"를 아빠 가이드 탭으로 보내는 현재 워킹 트리 방식 유지 여부(추천: 요약 카드 또는 랜딩 "새벽 3가지"로).
4. teen·multicultural의 색·톤 예외 범위.
