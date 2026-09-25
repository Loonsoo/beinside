# BeInside 에이전트·스킬·작업 구조 평가 (AI 워크플로 아키텍트)

- 평가일: 2026-09-25
- 대상: `/home/user/beinside` 체크아웃 브랜치 `claude/review-structure-vxpss` (HEAD `404c24f`, 2026-03-16)
- 참고 비교: `origin/main` (HEAD `b689ec3`, 2026-04-06)
- 저장소 파일은 수정하지 않음

---

## 0. 요약

1. **가장 큰 구조 문제는 스킬 품질보다 "어느 브랜치가 진짜인지"다.** 체크아웃된 작업 브랜치와 `main`은 **공통 조상이 없다**(`git merge-base` 결과 없음, rc=1). `main`은 2026-03-25에 새 히스토리로 다시 올라왔고, 그 뒤로 커밋 50개가 쌓였다. 작업 브랜치에만 있는 커밋은 61개다. `main`에는 이미 `CLAUDE.md`, `.claude/agents/` 11개, 스킬 13개, `tests/integrity.test.js`, Vercel 배포, i18n이 있다. **지금 평가 대상인 스킬 5개 구조는 폐기된 계보다.** 이 상태에서 Claude 세션이 작업 브랜치에서 시작하면 낡은 규칙(1393, 피치 톤, GitHub Pages)을 학습하고 옛 코드를 고친다.
2. 스킬 5개의 frontmatter description은 트리거 유도 면에서 좋은 편이다. 한국어 키워드를 나열했고, 강제 표현("반드시")과 스킬 간 교차 참조도 있다. 문제는 **references가 코드와 계속 어긋난다는 점**이다. `data-schema.md`는 5개 구조 중 4개가 틀렸다. `css-variables.css`와 `component-catalog.md`에는 폐기된 피치 테마가 그대로 남아 있다. `beinside-ui/SKILL.md` 본문에도 "기본 톤: 피치/살구"가 남아 있다. deploy 스킬은 GitHub Pages로 적혀 있지만 실제 배포는 Vercel이다.
3. **안전 정보가 최신이 아니다.** 작업 브랜치 코드와 스킬에는 폐지·통합된 `1393`이 약 40곳 하드코딩되어 있다. 2024-01-01부터 번호는 **109**다. "산후우울증 상담전화 1393", "아동 상담·지원 1393", "비밀 유지" 단정, 출처를 확인할 수 없는 `1899-3075`, 용도가 틀린 `182`처럼 **임상·사실 오류**도 있다. 스킬 규칙이 "빠른 탈출 버튼 필수"라고 적어 두었지만, 두 브랜치 모두 `quickExit` 구현이 **0건**이다.
4. 작업 방식은 "1인 운영자 + AI가 요청마다 즉석에서 고치는" 구조다. 근거는 다음과 같다. 같은 날 테마를 5번 갈아엎었다(03-16). toggleToolkit은 3번 연속 수정했다. 모바일 긴급버튼 숨김은 2번 만에 `!important`로 처리했다. `Update index.html` 커밋이 30개다. PR #5 이후 커밋 9개는 main에 머지되지 않았다. 테스트는 없다(작업 브랜치 기준).
5. 권고: **에이전트를 늘리지 말고 줄인다.** main의 11개 에이전트(PM·마케터·데이터분석가·오케스트레이터 등)는 1인 비영리 프로젝트에는 과한 설계다. 필요한 구성은 다음과 같다.
   - `CLAUDE.md` 1개(짧게, 단일 진실 원천 지정)
   - 스킬 4개(content+i18n 통합, ui, safety, ship)
   - **읽기 전용 검수 서브에이전트 3개**(safety-reviewer, clinical-reviewer, qa)
   - **훅 2개**(SessionStart: 브랜치·스모크 테스트 / Stop: 변경 파일 기반 안전 검사)
   - 헬프라인 번호는 **JS 상수 1곳**으로 모으고 테스트로 강제한다.

---

## 1. 현재 구조 맵

### 1-1. 작업 브랜치 `claude/review-structure-vxpss` (평가 대상)

```
/home/user/beinside
├── .gitignore            (node_modules/, package-lock.json, package.json)
├── index.html            790줄
├── css/styles.css        2,965줄 (단일 파일)
├── js/ (10개, 전역 스크립트, 번들러 없음)
│   data.js 584 · render.js 742 · self-pages.js 490 · app.js 418
│   emotion-page.js 322 · features.js 317 · profiles.js 315
│   memo.js 107 · utils.js 96 · storage.js 61
└── .claude/
    └── skills/
        ├── beinside-content/   SKILL + tone-guide, source-list, persona-summary, data-schema + assets/content-template.json
        ├── beinside-ui/        SKILL + design-system, component-catalog, mobile-ux, animation-guide, accessibility + assets/css-variables.css
        ├── beinside-safety/    SKILL + helpline-database, domestic-violence-guide, suicide-prevention-media-guide, safety-ui-patterns
        ├── beinside-i18n/      SKILL + language-priority, cultural-parenting-notes
        └── beinside-deploy/    SKILL + github-pages-guide
```

| 항목 | 존재 여부 |
|---|---|
| `CLAUDE.md` | 없음 |
| `README.md` | 없음 |
| `.claude/settings.json` / hooks | 없음 |
| `.claude/agents/` | 없음 |
| 테스트 / CI / package.json | 없음 (`.gitignore`에 package.json이 들어 있어 의도적으로 제외됨) |
| CNAME / vercel.json | 없음 |

### 1-2. `origin/main` (공통 조상 없음, 실제 배포 계보로 추정)

- `CLAUDE.md`: 있음. 단, "CSS 변수 기반 테마 (피치/살구 톤)"이라는 **같은 구식 문구**가 남아 있다.
- `.claude/agents/`(11개): orchestrator, product-manager, marketer, data-analyst, legal-advisor, psychiatrist, psychologist, content-writer, developer, hig-builder, hig-auditor. 대부분 `model: opus`이고 tools 제한이 없다. hig-auditor만 읽기 전용이다.
- `.claude/skills/`(13개): writing, designing, engineering, safety, testing, deploying, a11y, analytics, compliance, seo, wellness, i18n 등.
- `tests/integrity.test.js`(node:test, 라우팅·tel 링크 등 검사), `vercel.json`, `vite.config.js`, `sw.js`, `js/locales/{ko,en,vi,zh}.json`.
- helpline: 109로 대부분 이전했다. 그래도 `js/data-guides-situational.js:1153`에 `tel:1393`이 1건 남아 있다.
- `beinside-testing` 스킬은 "모든 위기 페이지에 빠른 탈출 버튼 존재"를 불변식으로 선언했지만, main 코드에 `quickExit` 구현은 **0건**이다. 문서가 규칙을 선언해도 강제되지 않는다는 점이 두 계보 모두에서 확인된다.

> 결론: 운영자가 "구조가 잘 되어 있는가"를 묻는다면 먼저 **어느 계보를 정본으로 할지** 결정해야 한다. 아래 불일치 표는 요청대로 작업 브랜치 기준으로 작성했다. 권고 구조는 main을 정본으로 삼는 것을 전제로 한다.

---

## 2. 스킬 설계 품질 평가

### 2-1. Frontmatter / 트리거

| 스킬 | 평가 | 문제 |
|---|---|---|
| content | 좋음. 주제·키워드를 나열하고 "없으면 일관성 깨짐"이라는 동기를 준다 | 범위가 너무 넓다("가정폭력 가이드", "다문화 가정 콘텐츠"까지 포함). safety·i18n과 트리거가 겹친다 |
| ui | 좋음 | "UX", "모바일"이 거의 모든 요청에 걸려 과다 트리거된다 |
| safety | 매우 좋음. 강한 경고로 우선 로딩을 유도한다 | 없음 |
| i18n | 보통 | 현재 브랜치에는 i18n 구현이 없어 스킬이 가리키는 코드가 없다 |
| deploy | 약함 | "GitHub", "push"가 모든 git 작업에 걸린다. 그런데 내용(GitHub Pages)이 틀려서 **걸리면 해가 된다** |

### 2-2. 역할 중복과 공백

- **중복**
  - 빠른 탈출 버튼 사양이 ui/SKILL.md와 safety/SKILL.md에 각각 있다. `1393` 예시는 5개 스킬 전부에 복제되어 있다. 하나가 바뀌면 나머지 넷이 낡는다. 109 통합이 이 문제를 보여주는 실제 사례다.
  - 톤 규칙이 content/SKILL.md와 tone-guide.md에 이중으로 있다.
- **공백**
  - 검증/QA 스킬이 없다. 체크리스트는 전부 "사람이 체크하는" 마크다운이다.
  - 버그 수정 절차가 없다. 재현, 원인, 회귀 확인 단계가 없어 fix의 fix가 반복된다.
  - 콘텐츠 **임상 검수 게이트**가 없다. "자동 검수 체크리스트"는 작성자(AI)가 자기 글을 스스로 체크하는 구조다.
  - 문서 동기화 규칙이 없다. "design-system.md도 업데이트하라"고 적혀 있지만, 그것을 강제하는 장치가 없다.

### 2-3. 문서-코드 불일치 표 (작업 브랜치 기준, 실제 대조 결과)

| # | 문서 위치 | 문서 내용 | 실제 코드 | 심각도 |
|---|---|---|---|---|
| 1 | `beinside-ui/SKILL.md:29` | "기본 톤: 피치/살구 톤 (`--peach`, `--cream`, `--warm`)" | `--peach:#7BAECB`(Soft Calm Blue), 테마 "Calm 4.0" | 높음. AI가 살구색을 다시 도입할 수 있다 |
| 2 | `beinside-ui/SKILL.md:40` | "`color: var(--peach)` ✅ / `#E07B5A` ❌" 예시 | `#E07B5A`는 이미 사라진 값이다. 변수명 `--peach`가 파란색을 가리켜 **의미와 이름이 어긋난다** | 중간 |
| 3 | `beinside-ui/assets/css-variables.css` 전체 | `--cream:#FFF8F2`, `--peach:#E07B5A`, `--ink:#2C1E14`, `--plum:#C87890` 등 피치 테마. "수정하면 styles.css와 동기화하라"고 적혀 있다 | `css/styles.css:5` `:root`는 Calm 4.0 값이다. `--primary*`, `--glass-*`, `--lavender*`, `--burnout*`, `--relation*`, `--transition-*` 등 **변수 22개가 asset에 없다** | 높음 |
| 4 | `design-system.md` | Calm 4.0 값 | styles.css와 **일치**(유일하게 최신). 단 `--glass-shadow`에서 inset 부분이 빠졌다 | 낮음 |
| 5 | `component-catalog.md` 카드 | `.card` `border-radius:18px`, `translateY(-4px)`, cbg-a "살구", cbg-s "세이지", cbg-p "퍼플", cbg-rose "로즈" | styles.css:340 `border-radius:16px`. design-system.md는 cbg-a=앰버, cbg-p=캄블루, cbg-s=힐링그린 | 중간. 두 reference끼리도 서로 모순된다 |
| 6 | `beinside-ui/SKILL.md:63` | 카드 radius 18px, 그림자 `0 2px 12px` | 16px, `0 2px 6px` | 낮음 |
| 7 | `component-catalog.md` | `.quick-exit-btn` 존재 | CSS·HTML·JS 모두 0건. `quickExit()` 함수도 없다 | **높음(안전)**. 가정폭력 연락처(1366)를 제공하면서 탈출 버튼이 없다 |
| 8 | `component-catalog.md` | `.gobtn`, `.view-toggle`, `.alone-card`, `.ninput`, `.cbg-mint/rose/teal` 사용 중 | CSS 정의는 있지만 HTML/JS 사용은 0건(죽은 스타일) | 낮음 |
| 9 | `component-catalog.md` / safety | `.emergency-call-btn` | 0건. 실제로는 `.emergency-btn-full`, `.emergency-call-big`, `.teen-sos-btn` 3종이 쓰인다 | 중간 |
| 10 | 카탈로그 전반 | — | 실제로 있는 `toolkit-panel`, 감정 선택기, 프로필 bottom sheet, Liquid Glass 패널 등 Phase 1 이후 컴포넌트가 **전부 누락**되어 있다 | 중간 |
| 11 | `data-schema.md` §1 | "`js/data.js`에 정의된 `getData(months)`" | `getData`는 `js/render.js:272`에 있다. `g`는 "성장 포인트 문장 배열"로 적혀 있지만 실제로는 **색상 hex 배열**이다(`g:['#1A5030',...]`) | 중간 |
| 12 | `data-schema.md` §2 `SP_DATA` | `{"[상황키]":{title,icon,ages[],steps:[{label,title,need,scripts[],warns[]}]}}` | 숫자 키 `0:{hdr:{icon,title,sub}, infant:{need:[{cls,tag,tagText,title,items[]}], scripts:[{tag,text}], warns[]}, toddler:{…}}`. 스테이지 정의는 별도 `SP_STAGES` 배열이다 | **높음**. 문서대로 추가하면 렌더가 깨진다 |
| 13 | `data-schema.md` §4 `ALONE_DATA` | 대상키 "child / teen / adult" | 실제 키는 `child / teen / young` | 중간 |
| 14 | `data-schema.md` §5 `BIRTH_DATA` | 객체 `{before/birth/after:{body,mental,todo,alert}}` | **배열** `[{id:'b0',label,sub,desc,alone,body,mental,todo,alert}, …]` | 높음 |
| 15 | `data-schema.md` | — | `DAD_DATA`, `SP_STAGES`, `TL`, `EMOJIS`(data.js), `BURNOUT_DATA`, `RELATIONSHIP_DATA`, `TRANSITION_DATA`(self-pages.js), `EMOTION_GUIDE_DATA`(emotion-page.js), `MOOD_KEY`, `JOURNAL_KEY`, `JOURNAL_TAGS`(features.js) **미기재**. 체크툴 공통 스키마 `check{id,questions,results{high/mid/low:{label,threshold,action}}}`, `emergencyMsg`, `helplines[{number,name,desc}]`도 없다 | 높음 |
| 16 | `content-template.json` | `getData()`용 템플릿만 있다 | 가장 많이 추가되는 콘텐츠(self-pages 체크툴, SP_DATA)의 템플릿이 없다 | 중간 |
| 17 | `content/SKILL.md` "2단계 정보 구조" | "3줄 요약 + '이것만은 꼭' 경고 → 접힌 상세" | 실제 구조는 4단계 가이드(`53cf03a` "4단계 가이드")다. main CLAUDE.md는 "상황 인식→판단→행동→도움 연결"이다 | 중간 |
| 18 | `beinside-deploy/SKILL.md` 파일 트리 | js 7개 | js 10개(`features.js`, `emotion-page.js`, `self-pages.js` 누락) | 낮음 |
| 19 | deploy 호스팅 | "GitHub Pages (`main` → `beinside.kr`)", CNAME 파일·A 레코드 185.199.x 안내 | 작업 브랜치에 CNAME 없음. main은 `vercel.json`이 있고 CLAUDE.md에 "GitHub 연동 Vercel 자동 배포"라고 적혀 있다 | **높음**. 잘못된 DNS 조언은 사이트 다운으로 이어질 수 있다 |
| 20 | deploy 절차 | "`git push origin main`" 직접 푸시 | 실제 흐름은 `claude/*` 브랜치 → PR → main이다. 그마저 PR #5 이후 미머지이고 main은 별도 계보다 | 높음 |
| 21 | deploy "파일 크기" | "styles.css 400줄 이상 되면 분리 검토" | 2,965줄. 규칙이 한 번도 적용되지 않았다 | 낮음 |
| 22 | `ui/SKILL.md` "CSS 변수 필수, 하드코딩 금지" | — | styles.css에 hex 하드코딩 263개, index.html 인라인 `style=` 56개(`--ebf-color:#C84A8A` 등) | 중간 |
| 23 | `ui/SKILL.md` "prefers-reduced-motion 필수" | — | styles.css 4곳. 커버리지 검증 수단이 없다 | 낮음 |
| 24 | styles.css 내부 | 문서: `--tl-w` 200/160/0px 반응형 | `styles.css:1422` 무조건 `:root{--tl-w:0px}`로 덮어쓰고 사이드바를 `display:none!important`로 숨긴다. 문서의 타임라인 설명은 사실상 죽은 스펙이다 | 낮음 |
| 25 | `i18n/SKILL.md` | 다국어 번역 단계 1~3 | 작업 브랜치에 i18n 코드·locale 파일이 없다. 다문화 가정 전용 **다누리콜센터 1577-1366**(다국어 상담)이 helpline DB에 없다 | 중간 |

### 2-4. helpline-database.md 최신성 (WebSearch로 확인)

| 문서 번호 | 판정 | 근거 / 조치 |
|---|---|---|
| **1393** 자살예방상담전화 | **폐기, 교체 필요** | 2024-01-01부로 자살예방 상담번호가 **109**로 통합되었다(보건복지부 보도자료). 1393 등 기존 번호는 109로 모였다. 문서 표준 형식·예시, 5개 스킬, 코드 약 40곳(emotion-page 12, self-pages 13, render 7, app 3, index 4, data 5 등)을 모두 109로 바꿔야 한다 |
| 1577-0199 정신건강위기상담전화 | 유효 | 109 통합 후에도 본연 역할로 계속 운영된다. 유지 |
| 1388, 1366, 112, 119 | 유효 | 유지 |
| 1644-6621 | 설명 수정 | 기관명은 "한부모가족지원센터"가 아니라 **가족상담전화**다. 운영 시간은 "평일 09~18시"가 아니라 **365일 24시간**이다(여가부/성평등가족부) |
| 182 "경찰청 피해자지원센터" | **오류** | 182는 **경찰민원콜센터**(출동이 필요 없는 민원)다. 범죄피해자 지원은 **1577-1295**(범죄피해자지원센터)다 |
| 1899-3075 "아동학대 신고" | **확인 불가, 삭제 권고** | 공식 안내에서 찾을 수 없다. 공식 아동학대 신고는 **112**(아이지킴콜 112)다 |
| (누락) 1577-1366 다누리콜센터 | 추가 권고 | 다문화 가정 대상 다국어 상담. i18n 스킬의 필수 번호로 넣어야 한다 |

**코드 내 임상·사실 오류 (콘텐츠 검수 게이트 부재의 직접 증거)**

- `js/data.js:492`, `js/render.js:737`: "**산후우울증 상담전화 1393**". 1393은 산후우울 전용 번호가 아니다(그리고 폐기되었다).
- `js/render.js:617`: "1393 (**정신건강 위기상담**)". 기관을 잘못 매칭했다.
- `js/data.js:86`: "아동 상담·지원: 1393 (24시간, 무료, **비밀 유지**)". 기관이 틀렸고, safety 스킬의 "비밀보장 단정 금지" 규칙도 어긴다.
- `js/self-pages.js:58, 248`: "**극단적** 생각이 들 때". suicide-prevention-media-guide가 금지한 완곡어 계열이다.
- 연락처가 하드코딩으로 흩어져 있고 같은 번호에 붙은 설명이 파일마다 다르다. `{number,name,desc}` 객체가 파일마다 복붙되어 있다.

---

## 3. 작업 프로세스 진단 (git 근거)

### 3-1. 관찰

| 패턴 | 근거 | 해석 |
|---|---|---|
| fix의 fix | `33fa420` toggleToolkit classList.on → `35caddf` display 직접 제어 → `ea107fd` 인라인 style 제거·.on 통일. 3연속으로 결국 첫 방식으로 돌아왔다 | 원인(인라인 style vs class 우선순위)을 진단하지 않고 증상만 고쳤다. 재현·검증 단계가 없다 |
| 같은 문제 2회 | `f9882b3` 긴급버튼 모바일 숨김 → `97cee7c` "!important로 확실히 숨김" | 캐스케이드를 이해하지 않고 강도만 올렸다. 게다가 **긴급상담 버튼을 모바일에서 숨긴 것**은 safety 원칙(위기 연결 상단 배치)과 충돌한다. 안전 검수가 있었다면 막혔을 변경이다 |
| 테마 난립 | 2026-03-16 하루에 `0a0b231` Liquid Glass → `043d364` Ulivo 올리브 → `77a65f5` 핑크 제거 → `a3480dd` 올리바 언더톤 → `404c24f` Calm v4.0. main에서도 `7d3c974` 숲 팔레트, `45b1fcb` Liquid Glass 재적용, `c97cdf8` 라이트/다크 단순화 등이 이어졌다 | 디자인 결정이 문서(ADR)로 고정되지 않아 요청마다 바뀐다. 매번 docs 동기화가 누락되어 #1~#5 불일치가 생겼다 |
| 대형 단일 커밋 | `53cf03a` 6파일 +2,134줄 → 바로 `557db29` "Fix age pill buttons not showing content"(1줄) | 대규모 변경 후 스모크 테스트가 없다. 기존 기능 회귀를 사용자가 발견한다 |
| GitHub 웹 편집 | `Update index.html` 30개(초기) | 커밋 단위·메시지 규칙이 없던 시기다. 이후 conventional commit으로 개선되었다(긍정적) |
| 브랜치 전략 | 모든 작업이 단일 `claude/review-structure-vxpss`에서 이루어졌다. PR #1~#5는 머지되었지만 `#5` 이후 9커밋(`d9c8910`..`404c24f`)은 main에 미머지 상태다. 이후 main이 **공통 조상 없는 새 히스토리**로 교체되었다 | 작업 브랜치가 장수하면서 main과 멀어졌다. 세션마다 "어디서 작업 중인지" 확인하는 장치가 없다 |
| main에서도 동일 | main 50커밋 중 `fix` 19개. 드래그드롭 `fc4438a`→`4fa4d0d` "전면 재작성"→`da40e80`, 아코디언 chevron `33325bd`→`bcaffad`, senior 페이지 `1f4778c` 이후 fix 5연속 | 계보가 달라도 프로세스 결함은 같다. 에이전트 11개를 만들어도 반복 수정은 줄지 않았다. **역할 수가 아니라 검증 게이트가 없다는 것이 원인이다** |
| 테스트 | 작업 브랜치 0개. main은 `integrity.test.js` 1개가 있지만 훅·CI로 강제되지 않는다 | 사람이 기억해야만 실행된다 |

### 3-2. 진단 요약

- **의사결정 기록이 없다.** 테마·정보구조 결정이 대화 안에서만 존재하고 사라진다. 그래서 다음 세션의 AI가 다른 선택을 한다.
- **검증이 작성자 자신에게만 있다.** 스킬 체크리스트는 "작성한 AI가 스스로 체크"하는 구조라 독립성이 없다. 1393 오류, 탈출 버튼 누락, 긴급버튼 숨김 모두 이 구조에서 통과했다.
- **문서가 코드보다 늦다.** 규칙이 references에 흩어져 복제되어 있고, 갱신 트리거가 없다.
- **브랜치 위생이 없다.** 세션 시작 시 "main과 동기화 여부"를 알 수 없다.

---

## 4. 누락된 것 체크

| 항목 | 작업 브랜치 | main | 필요도 |
|---|---|---|---|
| CLAUDE.md (프로젝트 규칙·정본 선언) | 없음 | 있음(구식 문구 포함) | 필수 |
| 콘텐츠 임상 검수 게이트 | 없음 | psychiatrist/psychologist 에이전트는 있지만 **호출 강제가 없다** | 필수 |
| 안전 콘텐츠 변경 시 필수 체크 | 마크다운 체크리스트뿐 | testing 스킬 선언뿐(탈출 버튼 불변식 미구현) | 필수 |
| 스크립트 로드 스모크 테스트 | 없음 | 없음(integrity는 정적 검사) | 필수 |
| 전화번호·tel 링크 검사 | 없음 | 부분적 | 필수 |
| 외부 링크 체크 | 없음 | 없음 | 선택(월 1회) |
| `.claude/agents` | 없음 | 11개(과잉) | 3개로 충분 |
| settings.json / hooks | 없음 | 없음 | 필수(2개) |
| 헬프라인 단일 원천(JS 상수) | 없음(약 40곳 하드코딩) | 없음 | 필수 |

---

## 5. 권고 구조 (최소·실용)

### 원칙
- 1인 비영리 프로젝트다. **역할 시뮬레이션(PM·마케터·오케스트레이터)은 만들지 않는다.** 가치는 "독립 검수"와 "자동 검증"에서 나온다.
- 규칙은 한 곳에만 둔다. 사실 데이터(번호·색상)는 **코드가 정본**이고, 문서는 그 코드를 가리키기만 한다(값을 복제하지 않는다).
- 모든 강제는 훅과 테스트로 한다. 마크다운 체크리스트는 보조 수단이다.

### 5-0. 선행 작업 (구조 이전에 할 일)
1. **정본 브랜치를 결정한다.** main을 정본으로 선언하고, `claude/review-structure-vxpss`는 아카이브 태그(`archive/pre-rewrite-2026-03`)를 붙인 뒤 삭제한다. 작업 브랜치에만 있는 기능(예: toolkit, 감정 선택기)이 main에 없다면 cherry-pick 목록을 따로 만든다.
2. 헬프라인 핫픽스를 한다. 1393→109, 1899-3075 삭제, 182→1577-1295, 1644-6621 설명 수정, "비밀 유지" 문구 제거, 모바일 긴급버튼 숨김 재검토. main의 잔존 `tel:1393` 1건도 함께 고친다.
3. 가정폭력(1366) 노출 화면에 `quickExit` 버튼을 구현한다.

### 5-1. CLAUDE.md 초안 목차 (80~120줄 이내)

```
# BeInside — Claude 작업 규칙
1. 정본
   - 정본 브랜치: main (Vercel 자동 배포, beinside.kr)
   - 작업: `claude/<주제>-<날짜>` 단기 브랜치 → PR → main. 1 PR = 1 목적, 3일 이내 머지
2. 절대 규칙 (Safety Invariants) — 위반 시 작업 중단
   - 헬프라인 번호는 js/helplines.js의 HELPLINES에서만 참조 (하드코딩 금지)
   - 자살·자해·학대·가정폭력 문구 변경 → safety-reviewer 서브에이전트 통과 필수
   - 1366/가정폭력 화면 → quickExit 버튼 필수
   - 긴급 연결 UI를 숨기거나 축소하는 변경 금지 (운영자 명시 승인 없이는)
3. 콘텐츠 규칙 요약 (상세: skills/beinside-content)
   - 톤 3모드, 4단계 프레임워크, 출처 필수, 의학적 단정 금지
   - 건강·발달·정신건강 수치/권고 변경 → clinical-reviewer 통과 필수
4. 디자인 결정 로그 (ADR 한 줄씩) — 현재 테마: Calm 4.0 (Soft Calm Blue + Healing Green)
   - 테마 변경은 운영자 결정 + 이 절 갱신 없이는 금지
   - 변수 정본은 css의 :root, 문서는 값 복제 금지
5. 버그 수정 절차: 재현 → 원인 1줄 → 수정 → 스모크 테스트 → 커밋 메시지에 원인 기록
   - 같은 버그 2회째 수정이면 멈추고 원인 분석부터
6. 검증 명령: `npm test` (integrity + smoke + helplines)
7. 커밋 컨벤션: feat/fix/content/style/refactor/docs/safety
8. 스킬·에이전트 사용 맵 (어떤 작업에 무엇을 부르는지 표 1개)
```

### 5-2. 스킬 통폐합 (main의 13개 또는 작업 브랜치의 5개 → 4개)

| 신규 스킬 | 통합 대상 | 핵심 변경 |
|---|---|---|
| `beinside-content` | content + writing + i18n + wellness | 톤·4단계 구조·출처·다국어를 한 곳에 둔다. `data-schema.md`는 **실제 데이터 구조에서 자동 생성**하거나 "파일:라인" 포인터 방식으로 바꾼다. 체크툴·SP_DATA 템플릿을 추가한다 |
| `beinside-ui` | ui + designing + a11y | 색상값 표를 삭제하고 "css :root가 정본"이라고만 적는다. 피치 문구·css-variables.css asset을 삭제한다. 컴포넌트 카탈로그는 사용 중인 클래스만 남긴다 |
| `beinside-safety` | safety + compliance(안전 부분) | 번호 표를 **삭제**하고 `js/helplines.js`를 참조하게 한다. 탈출 버튼·미디어 가이드·체크리스트는 유지한다. 번호 최신성 확인 주기(분기 1회)와 1차 출처 URL을 명시한다 |
| `beinside-ship` | deploy/deploying + testing + seo | Vercel, 브랜치→PR 흐름, `npm test`, 배포 후 확인을 다룬다. GitHub Pages·DNS 내용은 삭제한다 |

analytics·marketing·PM 류는 스킬이나 에이전트가 아니라 필요할 때 대화로 처리한다.

### 5-3. 서브에이전트 3개 (`.claude/agents/`, 모두 읽기 전용)

역할을 흉내 내는 에이전트가 아니라 **게이트 역할을 하는 검수자**다. 도구를 `Read, Grep, Glob`(+ qa만 `Bash`)로 제한해 독립성을 확보한다. main의 11개는 아래 3개로 대체하고 나머지는 삭제하거나 보관한다.

**① safety-reviewer.md**
```yaml
---
name: safety-reviewer
description: 자살·자해·학대·가정폭력·위기 연락처·긴급 UI가 바뀐 diff를 검수한다. 해당 파일이나 문구가 변경되면 커밋 전에 반드시 호출. 코드 수정 금지, PASS/BLOCK 리포트만.
tools: Read, Grep, Glob
model: opus
---
입력: git diff (호출자가 전달)
검사:
- 번호가 HELPLINES 상수만 참조하는지, 하드코딩 tel: 없음
- 방법·장소·수단 서술 없음, "극단적 선택" 계열 완곡어 없음
- 피해자 탓 표현 없음, 비밀보장 단정 없음
- 가정폭력 노출 화면에 quickExit 존재
- 긴급 연결 UI를 숨기거나 축소하는 CSS/HTML 변경 여부 (있으면 BLOCK)
출력: PASS | BLOCK + 파일:라인 + 근거 규칙
```

**② clinical-reviewer.md** (main의 psychiatrist와 psychologist를 통합)
```yaml
---
name: clinical-reviewer
description: 발달·의학·정신건강·산후 콘텐츠의 사실성과 임상적 타당성을 검수한다. content: 커밋이나 data*.js 변경 시 호출. 수정하지 않고 지적만 한다.
tools: Read, Grep, Glob, WebSearch
model: opus
---
검사:
- 수치에 출처(기관·연도)가 있고 source-list에 등록되어 있는지
- 기관·번호의 용도가 맞는지 (예: 산후우울 ≠ 자살예방 전화)
- 의학적 단정, 위험한 권고, 연령 부적합 조언
- "확신 낮음" 항목은 운영자 확인 필요로 분리
출력: 항목별 OK / 수정 제안 / 사람 확인 필요
```
> 한계를 명시한다. AI 검수는 전문가 검수를 대체하지 않는다. "사람 확인 필요" 항목은 분기마다 자문 전문가(자원봉사 정신건강의학과 전문의나 임상심리사)에게 묶어서 보내는 **오프라인 게이트**로 운영한다. 목록은 `docs/clinical-review-queue.md`에 쌓는다.

**③ qa.md**
```yaml
---
name: qa
description: UI/JS 변경 후 회귀를 확인한다. fix 커밋 전이나 여러 파일을 바꾼 뒤 호출. npm test를 실행하고, 실패하면 원인 후보를 보고한다. 코드 수정 금지.
tools: Read, Grep, Glob, Bash
---
절차: npm test → 실패 분석 → 변경된 셀렉터/함수의 다른 사용처 grep → 리포트
```

### 5-4. 자동 검증 (테스트 3종, 의존성 없이 node:test)

1. **smoke.test.js (스크립트 로드)**: jsdom 없이도 가능하다. `vm.createContext`에 최소 `window/document/localStorage` 스텁을 두고 index.html의 `<script src>` 순서대로 실행해 예외가 없는지 본다. 전역 중복 선언, 구문 오류, 로드 순서 의존성을 잡는다. (현재 작업 브랜치 js 10개는 `node --check`를 통과한다. 런타임 로드 검사는 없다.)
2. **helplines.test.js**
   - 저장소 전체에서 `tel:(\d+)`를 추출해 허용 목록(HELPLINES 키)과 대조한다.
   - `1393`, `1899-3075` 같은 **폐기 번호 denylist**를 적용한다.
   - "비밀 유지|비밀 보장" 단정 문구와 "극단적 (선택|생각)" 금지어를 검사한다.
   - `1366`이 등장하는 페이지에 `quickExit`이 있는지 확인한다.
3. **docs-drift.test.js (선택)**: SKILL/references에서 `--변수명`을 추출해 css `:root`에 존재하는지 확인한다. 문서에 hex 값이 있으면 실패로 처리해 값 복제를 금지한다.
4. 외부 링크 체크는 훅이 아니라 월 1회 수동 실행(`npm run linkcheck`)으로 둔다. 네트워크에 의존하는 검사를 훅에 넣으면 세션이 느려진다.

### 5-5. 훅 (`.claude/settings.json`) — 2개만

```jsonc
{
  "hooks": {
    "SessionStart": [{ "hooks": [{ "type": "command",
      "command": "bash .claude/hooks/session-start.sh" }]}],
    "Stop": [{ "hooks": [{ "type": "command",
      "command": "bash .claude/hooks/stop-check.sh" }]}]
  }
}
```

- `session-start.sh`(빠르게, 5초 이내)
  - 현재 브랜치와 `origin/main` 관계를 출력한다. **공통 조상이 없거나 뒤처진 커밋이 20개 이상이면 경고**한다. 이번 사태를 조기에 감지하는 장치다.
  - `node --check js/*.js`와 `npm test --silent`의 요약 1줄을 출력한다.
- `stop-check.sh`
  - `git diff --name-only`로 바뀐 파일을 확인하고 `npm test`를 실행한다. 실패하면 exit 2로 Claude에게 되돌린다.
  - diff에 안전 키워드(`tel:|자살|자해|학대|폭력|1366|109|quickExit|emergency`)가 있으면 "safety-reviewer 호출 필요"를 알리고, 리뷰 표식 파일이 없으면 차단한다.
  - `js/data*.js`가 바뀌었으면 "clinical-reviewer 호출 권장"을 안내만 한다(차단하지 않음).

PreToolUse로 `git push origin main`을 차단하는 방안도 한 줄 추가를 고려할 수 있다. 단, 운영자가 직접 push하는 흐름이라면 생략한다.

### 5-6. 도입 순서 (반나절~1일 분량)

| 순서 | 작업 | 효과 |
|---|---|---|
| 1 | 정본 브랜치 결정 + 작업 브랜치 아카이브 | 혼선 제거 |
| 2 | `js/helplines.js` 도입 + 109 등 번호 핫픽스 + quickExit | 실제 사용자 안전 |
| 3 | helplines.test + smoke.test + `npm test` | 회귀 방지 |
| 4 | CLAUDE.md 정비(피치 문구 제거, 절대 규칙, 디자인 결정 로그) | 세션 간 일관성 |
| 5 | 훅 2개 | 강제 |
| 6 | 서브에이전트 3개, 기존 11개 정리 | 독립 검수 |
| 7 | 스킬 4개로 통폐합, references에서 값 복제 제거 | 문서 드리프트 근절 |

---

### 출처 (헬프라인 확인)
- 보건복지부, 「분산된 자살예방 상담전화 1월 1일부터 '109'로 통합 운영」: https://www.mohw.go.kr/board.es?mid=a10503000000&bid=0027&list_no=1479607&act=view
- 대한민국 정책브리핑, 「내년부터 자살예방 상담번호 '109번'으로 통합」: https://www.korea.kr/news/policyNewsView.do?newsId=148921874
- 보건복지상담센터 109 안내: https://www.129.go.kr/109
- 마포구정신건강복지센터, 정신건강 위기상담 전화번호 통합 운영 안내: https://mmhwc.or.kr/notice/54
- 정책브리핑, 「가족상담전화(1644-6621) 24시간 이용하세요」: https://www.korea.kr/briefing/pressReleaseView.do?newsId=156348808
- 서울시, 「아동학대 의심되면 '아이지킴콜 112'로 신고하세요」: https://mediahub.seoul.go.kr/archives/1297482
- 국가법령정보센터, 182경찰민원콜센터 운영규칙: https://www.law.go.kr/admRulLsInfoP.do?admRulSeq=2100000193545
- 찾기쉬운 생활법령정보, 범죄피해자 지원(1577-1295): https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=734&ccfNo=3&cciNo=1&cnpClsNo=1
