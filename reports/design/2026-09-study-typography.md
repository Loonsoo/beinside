# BeInside 글꼴 스터디 (2026-09)

- 작성: 디자인 리서처 · 2026-09-25
- 질문(운영자): "이 글씨체가 20~30대 여성이 좋아할 만한 느낌인지 다시 조사해봐." (선택된 시안 B "열두 달 시간 띠", Noto Sans KR 중심)
- 입력: `reports/design/2026-09-direction.md`, `reports/design/2026-09-study-korea.md`(D5 고운바탕), `reports/design/2026-09-study-global.md`, `reports/design/mockups/2026-09-home-options.html`(`.b-*` 스타일), `index.html:65-67`, `css/base.css`, `css/pages.css`, `sw.js:72-86`
- 사이트 코드는 고치지 않았다.
- **확인 방법과 한계**
  - 이 환경에서는 대부분의 서비스 사이트(29cm.co.kr, ohou.se, daangn.com, blog.toss.im, kci.go.kr 등)에 직접 접속할 수 없었다(egress 차단). 그래서 서비스별 글꼴은 **실제 웹 화면을 브라우저로 검사해 공개한 2차 자료**(oh-my-design, MIT, GitHub `kwakseongjae/oh-my-design/design-md/*/DESIGN.md`, 각 문서에 검사 날짜·원본 URL 기재)와 공식 블로그·기사 검색 요약으로 확인했다. 2차 자료이므로 운영자가 직접 확인할 때는 해당 사이트에서 개발자 도구의 "Computed → font-family"를 보면 된다.
  - 이 자료는 **웹 화면** 기준이다. 네이티브 앱이 같은 글꼴을 쓰는지는 따로 확인하지 못했다.
  - 글꼴 파일 용량은 GitHub API로 저장소 파일 크기를 직접 확인했다(2026-09-25). 실제 페이지 전송량은 다이내믹 서브셋 때문에 이보다 훨씬 작으며 **실측이 필요하다.**
  - 검색 결과 요약만으로 확인한 내용은 "(검색 요약)"으로 표시했다. 원문을 열어 보지 못했다는 뜻이다.

---

## 1. 요약: 핵심 발견 5개

1. **20~30대 여성이 많이 쓰는 서비스의 웹 화면은 거의 다 Pretendard를 쓴다.** 확인한 15곳 중 12곳(29CM, W컨셉, 무신사, 컬리, 오늘의집, 에이블리, 화해, 카카오뱅크, 밀리의서재, 클래스101, KREAM, 지그재그는 선언만 확인)이 Pretendard 계열이다. 토스는 전용 서체, 당근은 시스템 글꼴 우선, 올리브영 쇼핑몰은 라틴 글꼴 + 한글 시스템 글꼴이다. **본문이나 UI에 명조·손글씨를 쓰는 곳은 한 곳도 없었다.** 감성은 글꼴이 아니라 톤 배경, 여백, 굵기 위계, 사진에서 나온다(29CM "한 글꼴, 세 굵기, 이탤릭 없음", W컨셉 "강조는 색이 아니라 굵기로").
2. **Noto Sans KR은 "틀린 글꼴"이 아니다. Pretendard와 한글 뼈대가 같다.** Pretendard는 본고딕(Source Han Sans = Noto Sans CJK KR) 한글에 Inter의 라틴·숫자를 합치고, 한글 높이·자간·문장부호를 다듬은 글꼴이다. 20~30대 여성이 매일 보는 "기본 화면 글씨"와 BeInside의 차이는 한글 모양이 아니라 **숫자·라틴 모양, 기본 자간, 줄 높이**에서 난다. 시안 B의 가장 큰 글자가 숫자("3주째"의 3, 34px)라서 이 차이가 가장 잘 보이는 자리다.
3. **"20~30대 여성이 좋아하는 글꼴"을 직접 조사한 공개 설문은 찾지 못했다. 근거는 약하다.** 확인한 것은 ① 한국어 연구: 네모틀 글꼴이 탈네모틀보다 친숙하고 선호되며, 명조와 고딕 사이에는 차이가 없었다(감성과학, 2021) ② 영어 연구: 둥근 글꼴이 더 호감이 가고 읽기 쉽다고 판단됨(Velasco 외 2016) ③ 필기체는 "여성스러운, 귀여운"으로 평가되지만 이것은 고정관념이고 신뢰와는 반대 방향(Shaikh 외 2006, 영어)이다. 가장 강한 근거는 설문이 아니라 **"익숙함"**, 즉 이들이 매일 쓰는 서비스들이 수렴한 선택이다.
4. **새벽 다크 화면의 위험은 글꼴 종류보다 "가는 획"에서 온다.** 실무 가이드는 어두운 바탕에서 가는 굵기(Thin·Light)가 번져 보이거나 사라지고, 난시가 있는 사람에게 더 어렵다고 말한다(검색 요약, 연구가 아니라 실무 가이드). 고운바탕 작은 글씨, 300 이하 굵기, 굵기가 하나뿐인 글꼴(고운돋움, 리디바탕)에서 가짜 굵게가 생기는 경우를 피해야 한다. 현재 CSS에는 **한글에 이탤릭을 건 곳이 8곳** 있다(두 글꼴 모두 이탤릭이 없어 브라우저가 글자를 기울여 만든다).
5. **추천은 "본문 Pretendard + 한 줄 고운바탕"이다.** 용량은 거의 그대로이고 적용 난이도는 낮거나 중간이다. 다만 Pretendard는 Google Fonts에 없어서 CDN(jsDelivr)이나 자체 호스팅이 필요하고, `sw.js`의 글꼴 캐시가 Google 도메인만 처리한다는 점을 함께 고쳐야 한다. 새 글꼴을 들이지 않는 최소안(Noto 유지 + 타이포 규칙 정리)도 충분히 방어할 수 있다. 어느 조합이든 **위기 번호·버튼은 고딕(산세리프) 700**으로 쓰고, 고운바탕(연필 손글씨에서 출발한 바탕체)과 손글씨체는 쓰지 않는다.

---

## 2. 서비스별 사용 글꼴

확인일은 모두 2026-09-25(자료 열람일)이다. "검사일"은 2차 자료가 실제 화면을 검사한 날이다.

| 서비스 | 20~30대 여성과의 관련 | 웹 화면 한글 글꼴 | 굵기·자간 관찰 | 근거 (검사일) | 신뢰도 |
|---|---|---|---|---|---|
| 29CM | 30대 여성 이용 16.4%(국내 스터디 D3) | **Pretendard Variable** 하나 | 400 → 700 → 800, 이탤릭 없음. Campton은 선언만 있고 사용 0 | oh-my-design `29cm` (2026-07-11, 5개 화면 실검사) | 2차 자료, 중 |
| W컨셉 | 여성 패션 편집숍 | **Pretendard Variable** (폴백에 Noto Sans KR) | 400/600/700, 한글 자간 −0.2~−0.4px. "강조는 색이 아니라 굵기로" | oh-my-design `wconcept` (2026-05-27, Playwright 검사) | 2차 자료, 중 |
| 무신사 | 30대 여성 이용 25.0%(국내 스터디 D3) | **Pretendard** (무신사 CDN `image.msscdn.net`에서 로드) | 본문 14px/400 | oh-my-design `musinsa` (2026-07-12~13). 별도 "무신사 기업 폰트"(Light·Medium·Bold, 상업 이용 금지)는 브랜드용(검색 요약, crediwork) | 2차 자료, 중 |
| 컬리 | 장보기, 여성 이용이 많다고 알려짐(수치 **확인 필요**) | **Pretendard** (`res.kurly.com`) | 761개 요소 전부 Pretendard. Noto Sans KR은 선언만 | oh-my-design `kurly` (2026-07-13) | 2차 자료, 중 |
| 오늘의집 | 브랜드 페르소나 "20대 후반~30대 초반, 차분한 여성"(국내 스터디 D4) | **Pretendard Variable**, 자체 호스팅 다이내믹 서브셋 | 자간 −0.3px 일관 | oh-my-design `ohouse` (2026-07-13), 오늘의집 블로그 "멀티 국가 앱에서 Pretendard JP 도입하기"(2026-04-17, 검색 요약: "국내 서비스에는 Pretendard 적용") | 2차 + 공식(검색 요약), 중상 |
| 에이블리 | 10~20대 여성 패션 | **Pretendard**(소비자 화면), Noto Sans KR(판매자 화면) | 라벨 16px/600, 자간 −0.4px | oh-my-design `ably` (2026-07-12) | 2차 자료, 중 |
| 지그재그 | 여성 패션 | 계산된 스택 첫머리가 "Pretendard JP", Pretendard. **실제 글꼴 파일 로드는 확인 안 됨** | 자간 normal | oh-my-design `zigzag` (2026-07-13) | **확인 필요** |
| 화해 | 화장품 성분·리뷰 | **Pretendard Variable**(서비스), Spoqa Han Sans(블로그) | 본문 16px/400 | oh-my-design `hwahae` (2026-06-26) | 2차 자료, 중 |
| 카카오뱅크 | 20~30대 금융 | **Pretendard Variable** | 제목 자간 −0.64~−0.9px | oh-my-design `kakaobank` (2026-07-12) | 2차 자료, 중 |
| 밀리의서재 | 독서 | **Pretendard Variable** (Noto Serif는 선언만, 사용 0) | 본문 14px, 줄 높이 1.71 | oh-my-design `millie` (2026-07-13) | 2차 자료, 중 |
| 클래스101 | 취미 클래스 | **Pretendard Variable** | 본문 18px/1.67 | oh-my-design `class101` (2026-07-13) | 2차 자료, 중 |
| KREAM | 리셀(남성 비중이 높을 수 있음, **확인 필요**) | **Pretendard Variable** | — | oh-my-design `kream` (2026-07-13) | 2차 자료, 중 |
| 토스 | 전 연령 금융 | **Toss Product Sans**(전용, 공개 배포 아님) | 본문 16px/400 | oh-my-design `toss` (2026-07-11, TDS 문서). 토스 블로그: 산돌·이도타입 협업, 2020-07~2021-03, **"한글보다 라틴과 숫자에 초점"**(검색 요약) | 공식(검색 요약) + 2차, 중상 |
| 당근 | 동네 커뮤니티 | **시스템 글꼴 우선**(-apple-system), Pretendard Variable은 폴백으로 선언 | SEED v3에서 서체 스타일 38 → 24개로 줄이고 굵기 단계를 나눔(검색 요약) | oh-my-design `karrot` (2026-07-11, SEED 문서), 디자인 나침반 2026-07-27(검색 요약) | 2차 + 기사, 중 |
| 올리브영 | 20~30대 여성 뷰티 | 쇼핑몰: **Montserrat(라틴 전용) + 한글은 시스템 폴백**(Noto Sans CJK KR, Apple SD Gothic Neo). 기업 사이트: CJ ONLYONE New + Pretendard | 14px/400, 자간 −0.56px | oh-my-design `oliveyoung` (2026-07-13). "산돌 그레타산스를 쓴다"는 검색 요약은 근거를 찾지 못했다 | 2차 자료, 중 |
| 마보 | 명상(국내 스터디 A1) | **확인 필요** | — | 검색으로 찾지 못함 | — |
| 오브맘 | 산후 앱(국내 스터디 B2) | **확인 필요** | — | 검색으로 찾지 못함 | — |
| "인스타 감성" 브랜드 | — | **확인 필요.** 로고·패키지·광고에 명조·손글씨를 쓰는 예는 많지만 체계적 자료는 없다 | — | — | — |

**이 표가 말하는 것**
- Pretendard는 "20~30대 여성용 글꼴"이 아니라 **한국 웹의 기본값**이 됐다. 2024년 4월부터 정부 디지털 서비스 UI/UX 가이드라인도 Pretendard GOV를 기본 서체로 정했다(검색 요약, 나무위키·npm `pretendard-gov`). 그래서 Pretendard를 쓰는 것은 "좋아할 만한 느낌"을 새로 주기보다 **"낯설지 않다"는 신뢰 신호**에 가깝다.
- 이들의 감성·고급스러움은 **한 글꼴 + 굵기 3단 + 음수 자간 + 톤 배경 + 여백**으로 만들어진다. BeInside가 따라갈 수 있는 부분도 이것이다.
- 이들 중 명조(부리) 글꼴을 쓰는 곳은 없었다. 즉 **고운바탕 한 줄은 BeInside만의 차별점**이 될 수 있다. 커머스와 달리 BeInside는 "편지·말 걸기"의 성격이 있어서 명조 한 줄이 맞는다. 이 부분은 해석이며 사용자 테스트가 필요하다.

---

## 3. 20~30대 여성의 글꼴 선호에 대한 근거

| # | 근거 | 내용 | BeInside 함의 | 강도 |
|---|---|---|---|---|
| E1 | 감성과학(한국감성과학회) 2021, "한글 글꼴의 세리프 및 네모틀 여부에 따른 친숙성과 선호도" | 한글 팬그램으로 조사. **네모틀 > 탈네모틀**(친숙성·선호 모두). **세리프와 산세리프 사이에는 차이 없음.** 친숙성과 선호의 상관은 탈네모틀 세리프에서만 나타남(검색 요약). 참가자 나이·성별은 **확인 필요** | 후보는 모두 네모틀이라 이 기준을 통과한다. "명조라서 감성적, 고딕이라서 차갑다"는 가정은 이 연구로 뒷받침되지 않는다. 탈네모틀 장식 서체는 피한다 | 중 (한국어, 대상 불명) |
| E2 | 전자책 본문 글꼴 선호도 조사(부리·민부리, DBpia) | 화면에서는 단순한 형태의 민부리(고딕) 계열이 가독성이 높아 많이 쓰인다(검색 요약) | 긴 본문은 고딕 | 약~중 |
| E3 | Velasco 외 2016, "The Taste of Typeface", i-Perception (PubMed 27433316) | 둥근 글꼴이 각진 글꼴보다 **더 호감이 가고 읽기 쉽다고 판단됨**(영어 글꼴, 맛 연상 실험) | 획 끝이 부드러운 글꼴(고운바탕, 마루 부리)이 "편안함"에 맞는다는 약한 근거 | 약 (영어, 목적이 다름) |
| E4 | Shaikh, Chaparro & Fox 2006, Usability News 8(1) | 필기체·장난스러운 글꼴이 "젊은, 여성스러운, 귀여운, 캐주얼" 점수가 가장 높고, 세리프는 "안정적, 성숙한, 격식 있는" | "여성 = 필기체"는 고정관념이다. 위기 서비스에서는 신뢰가 먼저이므로 반대 근거로 쓴다 | 중 (영어, 미국) |
| E5 | Monotype 2025 서체 트렌드(검색 요약) | 손글씨·사람 손길이 느껴지는 서체가 늘고 있다 | 트렌드 보고서이지 선호 조사가 아니다. 참고만 한다 | 약 |
| E6 | 서비스 수렴(§2) | 20~30대 여성 비중이 높은 서비스들이 Pretendard로 수렴 | **"익숙한 기본 글씨"가 신뢰를 준다**는 가장 현실적인 근거 | 중 (관찰, 인과는 아님) |
| E7 | 다크모드 실무 가이드(Smashing Magazine 2025-04 "Inclusive Dark Mode" 등, 검색 요약) | 어두운 바탕에서 가는 굵기는 사라지거나 번진다. 밝은 글자가 번져 보이는 현상(halation)이 있고, 난시(인구의 약 1/3이 어느 정도 있음)가 있으면 더 심하다. 다크에서 본문 굵기를 조금 올리라는 조언과 순백 글자를 피하라는 조언이 함께 나온다 | 300 이하 굵기 금지, 작은 명조 금지, 다크 본문 휘도 낮춤(방향 문서 원칙 5). 굵기를 올릴지는 실기기에서 확인 | 약~중 (실무 합의, 통제 연구는 **확인 필요**) |

**결론**: "20~30대 여성이 좋아할 만한 느낌"을 글꼴 하나로 보장할 근거는 없다. 근거가 가리키는 것은 ① 익숙한 네모틀 고딕을 본문으로 쓰고 ② 따뜻함은 부드러운 명조 한 줄과 색·여백으로 내고 ③ 필기체나 "귀여운" 글꼴로 여성성을 표현하지 않는 것이다. 운영자 톤("은은하고, 감성적이며, 편안하게")은 이 방향과 맞는다. **실제 선호는 게릴라 테스트(국내 스터디 §6-7)에서 두 시안을 나란히 보여 주고 확인하기를 권한다.**

---

## 4. 후보 글꼴 비교

용량은 GitHub 저장소 파일 크기를 직접 확인한 값이다(2026-09-25). 실제 전송량은 서브셋·다이내믹 서브셋 때문에 훨씬 작다. "인상"은 리서처의 판단과 제작자 설명을 합친 것이다.

### 4-1. 본문·UI 후보 (고딕 계열)

| 글꼴 | 인상 (감성·편안·세련) | 새벽 다크·작은 크기 | 라이선스·웹 임베드 | 용량·서브셋·배포 | 숫자 "3주째" | 판정 |
|---|---|---|---|---|---|---|
| **Pretendard** | 중립·세련. "요즘 앱" 인상. 본고딕 한글의 높이를 낮추고 자간을 좁혀서 **덜 퍼져 보인다**(Adobe 이달의 폰트 2022-09). 감성은 약하고 편안함은 중상 | 9단계 굵기, 가변 45~920이라 **다크에서 400→420 같은 미세 조정이 가능**하다. 획은 본고딕과 같다 | **OFL 1.1.** 글꼴 단독 판매만 금지. 웹 임베드 가능 | 정적 woff2 Regular 765,892B / 서브셋 267,096B / 가변 2,057,688B. **다이내믹 서브셋**(Google Fonts 방식) jsDelivr 제공: `.../pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css`(CSS 55,760B, 압축 전). **Google Fonts에는 없다** | 숫자·라틴이 **Inter** 기반이라 1·7·3·8 구분이 또렷하고 한글과 높이가 맞게 조정됐다. `tnum`(고정폭 숫자) 지원(GitHub Discussion #110, 검색 요약) | **본문 1순위** |
| **Noto Sans KR** (현재) | 중립·단정. 본고딕 원형. 기본 자간과 줄 상자가 Pretendard보다 넓어 **약간 헐겁고 "구글 기본"처럼 보일 수 있다**(비교 글 검색 요약, 해석) | 가변 100~900. Google Fonts에서 굵기 범위 지정 가능. 획은 Pretendard와 같다 | **OFL** | 가변 ttf 10,414,588B. Google Fonts가 **약 100개 조각(unicode-range)**으로 나눠 필요한 조각만 받게 한다(Google Fonts + Korean, 검색 요약). 지금 사이트가 쓰는 방식이다 | 본고딕의 라틴·숫자(Source Sans 계열로 알려짐, **확인 필요**). 무난하지만 Pretendard보다 덜 또렷하다. `tnum` 지원은 **확인 필요** | **유지 가능(최소안)** |
| **SUIT** | 단정·기하학적. 약간 서늘하다 | 9단계 + 가변 | **OFL** | 한글 **2,350자 + 318자만** 넣어 woff2 Regular 167,672B로 가볍다. 가변 woff2 624,536B. jsDelivr: `.../sun-typeface/SUIT@2/fonts/static/woff2/SUIT.css` | 기하학적 라틴·숫자 | **탈락.** 기록·메모처럼 사용자가 입력하는 글에서 드문 음절(예: 똠, 햏, 뷁)이 다른 글꼴로 섞여 나온다 |
| **Wanted Sans** | 곧고 또렷하다. "기하학 + 휴머니스트". 채용 서비스 인상 | 7단계 + 가변 | **OFL** | jsDelivr 가변 분할(split) CSS: `.../wanted-sans@v1.0.1/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css`(검색 요약). 한글 글자 수·용량 **확인 필요** | 문맥 대체 등 오픈타입 기능 다수 | 보류. Pretendard보다 나은 점이 BeInside 맥락에서 뚜렷하지 않다 |
| **IBM Plex Sans KR** | 기술·기업적. 곧고 이성적이다. 감성은 약하다 | 7단계(100~700) | **OFL**, Google Fonts | 정적 ttf 약 2.8MB/굵기. Google Fonts 조각 제공 | Plex 특유의 각진 숫자 | 탈락(톤 불일치) |
| **나눔스퀘어 네오** | 둥근 기하학, 밝고 친근하다. 조금 캐주얼·앱스럽다 | 5단계(aLt~eHv) + 가변 | 네이버 글꼴 라이선스(OFL로 안내, 검색 요약), 웹 임베드 가능 | woff2 Regular(bRg) 387,104B, 가변 1,529,292B. CDN: `hangeul.pstatic.net` 또는 jsDelivr(moonspam). 다이내믹 서브셋 **확인 필요** | 둥근 숫자, 친근하다 | 보류. 편안하지만 "귀여움" 쪽으로 기울 수 있다 |
| **고운돋움** | 손 움직임이 느껴지는 휴머니스트 산스. **따뜻하고 가장 "감성적인 고딕"** | **Regular 1종뿐.** 굵게를 쓰면 브라우저가 가짜 굵게를 만들어 획이 뭉개진다. 위계를 만들 수 없다 | **OFL**, Google Fonts | ttf 7,229,088B, Google Fonts 조각 제공 | 손맛이 있는 숫자(**확인 필요**) | 본문·버튼·번호 **탈락.** 16px 이상 한 줄 인사에만 가능 |

### 4-2. 제목·감성 한 줄 후보 (명조·부리 계열)

| 글꼴 | 인상 | 새벽 다크·작은 크기 | 라이선스·웹 임베드 | 용량·서브셋·배포 | 숫자 | 판정 |
|---|---|---|---|---|---|---|
| **고운바탕** (현재) | "연필로 쓴 단정한 손글씨에서 출발", "따뜻하고 친근한 인상"(Google Fonts 설명). **감성이 가장 강하고, 병원 느낌이 없다** | 400/700 두 단계. 가로획이 가늘어 **작은 크기·저휘도 다크에서 흐려진다**(추론, 실기기 확인 필요). 20px 이상 700에서 안전하다 | **OFL**, Google Fonts | ttf Regular 8,433,296B / Bold 8,178,712B. Google Fonts 조각 제공 | 명조 숫자. 모양 **확인 필요** | **한 줄 1순위(유지)** |
| **마루 부리** | 현대적 부리. 고운바탕보다 **덜 손글씨 같고 더 차분하고 단정하다.** 세련됨은 높고 따뜻함은 중간 | **5단계(200~700, SemiBold 있음)** → 다크에서 600으로 가는 획 문제를 줄일 수 있다 | 네이버 글꼴 라이선스(OFL 계열, 글꼴 단독 판매 외 상업 이용 가능, 검색 요약·fonts-archive README) | woff2 Regular 276,848B(fonts-archive). **다이내믹 서브셋 CSS** 제공(`MaruBuri-dynamic-subset.css`), jsDelivr `gh/fonts-archive/MaruBuri`. 네이버 한글 CDN도 있음. 글자 수 **확인 필요** | 현대적 명조 숫자 | **대안 1순위** (조합 3) |
| **Noto Serif KR** (추가) | 정통 명조. 단정하지만 조금 딱딱하고 "공문·책" 같다 | 가변 200~900 | **OFL**, Google Fonts | Google Fonts 조각 제공 → **지금 구조 그대로 추가 가능** | 본명조 숫자 | 예비. Google Fonts만 쓰고 싶을 때 |
| **리디바탕** | 전자책 본문용. 조용하고 문학적이다 | **Regular 1종** → 제목 위계를 만들 수 없고 가짜 굵게 위험 | 무료, 수정·재배포 가능, **웹사이트 서버 탑재 임베딩 허용**(디자인베이스·검색 요약. 리디 공식 안내 원문은 **확인 필요**) | 11,172자. 공식 CDN 없음(제3자 jsDelivr 서브셋) | — | 탈락(굵기 1종, 공식 CDN 없음) |
| **KoPub (바탕·돋움)** | 출판용. 정갈하다 | 굵기 3종(Light·Medium·Bold) | 무료·상업 이용 가능. 그러나 **"서버에 탑재해 웹서비스에 임베딩할 경우 별도 승인 필요"**(한국출판인회의 안내, 검색 요약. 원문 **확인 필요**) | — | — | **탈락(라이선스 절차)** |

---

## 5. 추천 조합

세 조합 모두 지키는 공통 규칙은 다음과 같다.
- **위기 연결(109·1577-0199·1366·112·119), 버튼, 탭, 입력칸은 고딕(산세리프) 600~700**, 번호는 18px 이상. 고운바탕·마루 부리·손글씨체는 여기에 쓰지 않는다.
- 명조는 **20px 이상 한 줄**에만 쓴다(인사, "이 시기에는" 한 줄 제목, 인용). 긴 문단에는 쓰지 않는다.
- 굵기는 3단계(400 / 600 또는 500 / 700)만 쓴다. **300 이하 금지.**
- 한글에 `font-style: italic`을 쓰지 않는다. 인용은 들여쓰기·색·명조로 구분한다.
- 본문 16px, 줄 높이 1.7, `word-break: keep-all`. 보조 글자는 14px 이상. 12~13px는 법적 고지 정도에만 쓴다(시안 B `.b-alt small` 12.5px, `.b-tile span` 13px는 올리기를 권함).

### 조합 1 (추천): Pretendard(본문·UI·숫자) + 고운바탕(감성 한 줄)

- **왜 맞는가**
  - §2의 서비스 대부분과 같은 "기본 글씨"다. 핵심 사용자가 쇼핑·금융·독서 앱에서 매일 보는 글씨라 **처음 보는 순간 낯설지 않다.** 새벽에 처음 들어온 사람에게 이것이 신뢰의 첫 신호다.
  - 시안 B의 주인공인 **"3주째"의 숫자가 Inter 숫자로 또렷해지고**, 한글과 높이가 맞게 조정돼 있다. 음수 자간을 조금만 줘도(−0.02em) 29CM·W컨셉 같은 정돈감이 난다.
  - iOS에서는 폴백인 Apple SD Gothic Neo와 모양·크기가 비슷하게 설계돼 있다. 그래서 새벽에 느린 네트워크로 웹글꼴이 늦게 와도 **글자가 바뀌며 화면이 튀는 폭이 작다**(Pretendard의 "system-ui 대체" 설계 의도).
  - 고운바탕 한 줄은 커머스 앱들과 BeInside를 구분하는 "편지 같은 말투"를 유지한다. 방향 문서의 결정 "고운바탕은 제목·한 줄만"과도 맞는다.
- **위험**
  - Pretendard는 Google Fonts에 없다. jsDelivr를 쓰면 **글꼴 도메인이 두 개**(Google + jsDelivr)가 된다. 자체 호스팅하면 Vercel에 글꼴 조각 파일 약 100개(총 약 2MB 안팎, 추정)를 올려야 한다.
  - `sw.js:72-86`은 `fonts.googleapis.com`과 `fonts.gstatic.com`만 cache-first로 처리한다. jsDelivr로 바꾸면 **오프라인이나 약한 네트워크에서 캐시되지 않아** 시스템 글꼴로 보인다. 캐시 조건 추가 또는 자체 호스팅이 필요하다.
  - 흔한 글꼴이라 "개성이 없다"고 느낄 수 있다. 개성은 색(방향 문서 B의 세이지·돌 회색), 고운바탕 한 줄, 선 아이콘으로 낸다.
  - jsDelivr가 막히는 환경(일부 회사망)에서는 시스템 글꼴로 대체된다. 기능에는 문제가 없다.
- **용량 영향**: Noto Sans KR(Google 조각)을 Pretendard 가변 다이내믹 서브셋으로 **바꾸는 것**이라 추가가 아니라 교체다. 전송량은 페이지에 나오는 글자 조각 수에 따라 정해지며 지금과 비슷할 것으로 추정한다(**실측 필요**: Chrome DevTools Network → Font, 390px 홈 첫 방문). CSS 파일 55,760B(압축 전)가 추가되지만, 압축 후 크기는 **확인 필요**하다. 고운바탕은 그대로다.
- **적용 난이도**: 낮음~중간. `index.html`의 글꼴 링크, `css/base.css`의 `font-family`(현재 `'Noto Sans KR'`이 여러 곳에 직접 적혀 있어 **`--font-sans` 같은 CSS 변수로 모으는 작업이 먼저**다), `sw.js` 캐시 조건, 다크·라이트 스크린샷 검수, `npm test`.

### 조합 2 (최소 변경): Noto Sans KR 유지 + 고운바탕 한 줄 + 타이포 규칙 정리

- **왜 맞는가**: 한글 뼈대가 Pretendard와 같아서, 20~30대 여성이 보기에 한글 인상의 차이는 크지 않다. 방향 문서 결정 9("글꼴 추가 안 함")를 그대로 지키고, 라이선스·CDN·서비스워커를 바꾸지 않는다. 체감 차이의 대부분은 아래 규칙으로 줄일 수 있다.
  - 20px 이상 제목·숫자에 자간 −0.02em, 본문은 0~−0.005em
  - 굵기 3단계로 줄이기. 지금 `index.html:67`은 300~800 여섯 단계를 불러오지만 CSS에서 300을 쓰는 곳은 없다
  - 한글 이탤릭 8곳 제거(`css/base.css:742, 963, 1294`, `css/pages.css:335, 438, 1101, 1500, 2589`)
  - 숫자 강조("3주째")는 700 + 강조색, 크기 대비는 시안 B처럼 34/22px
- **위험**: 숫자·라틴이 Pretendard보다 덜 또렷하다. 줄 상자가 커서 같은 높이에 들어가는 글이 적다. "요즘 앱 같은 정돈감"은 조합 1보다 약하다.
- **용량 영향**: 추가 없음. 굵기 선언을 줄이면 CSS가 조금 줄어든다. 실제 글꼴 다운로드는 쓰는 굵기만 일어나므로 이득은 작다(추정).
- **적용 난이도**: 낮음. CSS만 고친다.

### 조합 3 (감성 강화 대안): Pretendard(본문·UI·숫자) + 마루 부리 SemiBold(감성 한 줄)

- **왜 맞는가**: 마루 부리는 고운바탕보다 현대적이고 조용하다. SemiBold(600)가 있어 **새벽 다크에서 가는 가로획 문제를 굵기로 조절할 수 있다.** 시안 B의 서늘한 세이지·돌 회색 팔레트와는 고운바탕의 연필 손맛보다 마루 부리의 단정함이 더 잘 어울릴 수 있다(해석).
- **위험**: Google Fonts가 아니라서 글꼴 두 개가 모두 Google 밖으로 나간다(CDN·서비스워커 작업이 조합 1보다 크다). 현재 브랜드 인상(고운바탕 로고·제목)이 바뀐다. 따뜻함은 고운바탕보다 약하다. 라이선스 원문(네이버 한글 누리집)은 **확인 필요**.
- **용량 영향**: 다이내믹 서브셋을 쓰면 한 줄에 필요한 조각만 받는다. 정적 파일을 쓰면 굵기 하나당 woff2 약 277~315KB이므로 **반드시 다이내믹 서브셋을 쓴다.**
- **적용 난이도**: 중간. 조합 1의 작업에 로고·제목 전체 교체, 명조 폴백 지정(`'MaruBuri', 'Gowun Batang', serif` 또는 `serif`)이 더해진다.

### 리서처 의견

**조합 1을 권한다.** 선택된 시안 B는 "숫자로 시간의 위치를 보여 주는" 화면이라 숫자 품질이 인상을 크게 좌우한다. 이것이 조합 2보다 조합 1을 고르는 핵심 이유다. 다만 운영자가 "글꼴 추가·교체 동결"을 유지하고 싶다면 조합 2도 충분히 방어할 수 있다. 조합 3은 게릴라 테스트에서 "고운바탕이 너무 손글씨 같다"는 반응이 나올 때 꺼낸다.

적용 전에 확인할 것: ① 390px 실기기(iPhone, 갤럭시)에서 라이트·새벽 다크로 조합 1·2의 홈을 나란히 찍어 비교 ② 폰트 전송량 실측 ③ 브라우저 확대 200%에서 줄 넘침 확인 ④ 조합 1이면 `sw.js` 캐시 확인.

---

## 6. 반대 사례 (피해야 할 것)

| # | 패턴 | 왜 피하는가 | 어디서 보이는가 |
|---|---|---|---|
| X1 | **위기 번호·버튼에 손글씨·필기체·명조** | 새벽 흐린 눈과 한 손 조작에서 번호를 잘못 읽을 수 있다. 필기체는 "캐주얼·귀여움"으로 읽혀(E4) 긴급 연결의 무게를 흐린다. **고운바탕도 연필 손글씨에서 출발한 글꼴이라 여기에 포함한다** | 현재 `css/base.css:560`(`.ninput input`)은 입력 숫자를 고운바탕 26px로 표시한다. 위기 번호는 아니지만 입력칸에는 고딕을 권한다 |
| X2 | **"여성용 = 둥글고 귀여운 글꼴 + 분홍"** | CLAUDE.md의 성별 고정관념 금지 원칙. §2의 서비스들도 여성 타깃이지만 귀여운 글꼴을 쓰지 않는다 | 광고 배너·팝업 폰트에서 흔함 |
| X3 | **한글 이탤릭** | 두 글꼴 모두 이탤릭이 없어 브라우저가 글자를 기울여 만든다. 획이 뭉개지고 다크에서 더 흐리다 | 현재 CSS 8곳(조합 2 참고) |
| X4 | **굵기가 하나뿐인 글꼴에 굵게를 쓰기** | 가짜 굵게가 되어 획이 번진다 | 고운돋움, 리디바탕 |
| X5 | **Light(300) 이하 본문, 특히 다크** | 어두운 바탕에서 가는 획이 사라지거나 번진다(E7). 수면이 부족한 눈에는 더 어렵다 | 현재 `index.html:67`이 300을 불러온다(사용처는 없음) |
| X6 | **작은 명조(16px 미만)** | 가로획이 1px 아래로 떨어져 저휘도 다크에서 흐려진다(추론) | `css/base.css:742` `.r-qt` 고운바탕 15px + 이탤릭 |
| X7 | **서브셋 없는 한글 글꼴 통째로 로드** | Pretendard 정적 Regular 하나가 766KB, 가변 2MB다. 새벽 모바일 데이터에서 첫 화면이 늦어진다 | 정적 woff2를 `@font-face`로 바로 연결하는 경우 |
| X8 | **2,350자 글꼴을 사용자 입력에 쓰기** | 드문 음절이 다른 글꼴로 섞여 나온다 | SUIT |
| X9 | **웹 임베드 승인이 필요한 글꼴을 모르고 쓰기** | 라이선스 위반 위험 | KoPub(별도 승인 필요, 검색 요약) |
| X10 | **작은 글자에 강한 음수 자간** | 12~14px에서 −0.4px는 글자가 붙어 오독이 생긴다. 음수 자간은 20px 이상 제목·숫자에만 쓴다 | 커머스 앱의 캡션 스타일을 그대로 옮기는 경우 |
| X11 | **글꼴 여러 개로 "감성" 만들기** | 글꼴 3개 이상은 용량이 늘고 위계가 흐려진다. §2의 서비스들은 한 글꼴과 굵기로 위계를 만든다 | — |

---

## 7. BeInside 적용 제안 (시안 B 기준, 운영자 선택 후 구현)

1. **글꼴 변수부터 만든다(조합과 무관).** `--font-sans`, `--font-serif-accent`를 `:root`에 두고, `css/base.css`·`css/pages.css`에 직접 적힌 `'Noto Sans KR'`, `'Gowun Batang'`을 변수로 바꾼다. 그러면 조합 1↔2↔3을 한 줄로 바꿔 비교할 수 있다.
2. **타이포 토큰(시안 B)**

   | 역할 | 글꼴 | 크기/굵기/줄 높이 | 자간 |
   |---|---|---|---|
   | 주차 숫자 "3" | sans | 34px / 700 / 1.2 | −0.02em |
   | 주차 문장 "주째" | sans | 22px / 700 / 1.35 | −0.01em |
   | 감성 한 줄 (인사·인용) | serif-accent | 20~24px / 700 / 1.45 | −0.01em |
   | 섹션 제목 | sans | 17~18px / 700 / 1.4 | 0 |
   | 본문 | sans | 16px / 400 / 1.7 | 0 |
   | 보조 | sans | 14px / 400~500 / 1.6 | 0 |
   | 위기 번호·버튼 | sans | 18px 이상 / 700 | 0, 숫자 `font-variant-numeric: tabular-nums` |

3. **새벽 다크**: 굵기는 라이트와 같게 두고 **글자 휘도를 낮춘다**(방향 문서 원칙 5). 조합 1이면 가변 글꼴이라 다크에서 본문을 400→420으로 올려 실기기 비교 테스트를 할 수 있다. 결과가 나오기 전에는 기본값으로 두지 않는다.
4. **로드 방식**: `font-display: swap`을 유지하고, 폴백 스택을 `'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif` 순서로 둔다(조합 1). 명조 폴백은 `'Gowun Batang', serif`.
5. **검수 항목 추가(hig-auditor)**: 한글 이탤릭 0건, 300 이하 굵기 0건, 명조 16px 미만 0건, 위기 번호·버튼에 serif 계열 0건. `tests/safety.test.js`에 "위기 연결 요소의 font-family에 serif가 없음" 검사를 넣을지 검토한다.

---

## 8. 출처 목록 (모두 2026-09-25 확인)

### 서비스별 글꼴 (실화면 검사 2차 자료, MIT)
- oh-my-design 저장소: https://github.com/kwakseongjae/oh-my-design
- 29CM: https://raw.githubusercontent.com/kwakseongjae/oh-my-design/main/design-md/29cm/DESIGN.md
- W컨셉: https://raw.githubusercontent.com/kwakseongjae/oh-my-design/main/design-md/wconcept/DESIGN.md
- 무신사: https://raw.githubusercontent.com/kwakseongjae/oh-my-design/main/design-md/musinsa/DESIGN.md
- 컬리: https://raw.githubusercontent.com/kwakseongjae/oh-my-design/main/design-md/kurly/DESIGN.md
- 오늘의집: https://raw.githubusercontent.com/kwakseongjae/oh-my-design/main/design-md/ohouse/DESIGN.md
- 에이블리: https://raw.githubusercontent.com/kwakseongjae/oh-my-design/main/design-md/ably/DESIGN.md
- 지그재그: https://raw.githubusercontent.com/kwakseongjae/oh-my-design/main/design-md/zigzag/DESIGN.md
- 화해: https://raw.githubusercontent.com/kwakseongjae/oh-my-design/main/design-md/hwahae/DESIGN.md
- 카카오뱅크: https://raw.githubusercontent.com/kwakseongjae/oh-my-design/main/design-md/kakaobank/DESIGN.md
- 밀리의서재: https://raw.githubusercontent.com/kwakseongjae/oh-my-design/main/design-md/millie/DESIGN.md
- 클래스101: https://raw.githubusercontent.com/kwakseongjae/oh-my-design/main/design-md/class101/DESIGN.md
- KREAM: https://raw.githubusercontent.com/kwakseongjae/oh-my-design/main/design-md/kream/DESIGN.md
- 토스: https://raw.githubusercontent.com/kwakseongjae/oh-my-design/main/design-md/toss/DESIGN.md
- 당근: https://raw.githubusercontent.com/kwakseongjae/oh-my-design/main/design-md/karrot/DESIGN.md
- 올리브영: https://raw.githubusercontent.com/kwakseongjae/oh-my-design/main/design-md/oliveyoung/DESIGN.md

### 서비스 공식·기사 (검색 요약, 원문 열람 불가)
- 토스 프로덕트 산스 제작기: https://blog.toss.im/article/beginning-of-tps
- Simplicity 21 "모두를 위한 단 하나의 서체": https://toss.im/simplicity-21/sessions/3-3
- 오늘의집 "멀티 국가 앱에서 Pretendard JP 도입하기"(2026-04-17): https://www.bucketplace.com/post/2026-04-17-%EB%A9%80%ED%8B%B0-%EA%B5%AD%EA%B0%80-%EC%95%B1%EC%97%90%EC%84%9C-pretendard-jp-%EB%8F%84%EC%9E%85%ED%95%98%EA%B8%B0/
- 당근 SEED 리브랜딩(디자인 나침반, 2026-07-27): https://designcompass.org/2026/07/27/daangn-seed-design-system-rebranding/
- SEED 글꼴 문서: https://seed-design.io/react/getting-started/styling/fonts
- W컨셉 앱 리뉴얼(2026-04-15): https://v.daum.net/v/20260415090603556
- 무신사 기업 폰트: https://crediwork.co.kr/598
- 29CM 브랜드 경험 리뉴얼: https://ditoday.com/29cm%EB%8B%A4%EC%9B%80-29cm-%EB%B8%8C%EB%9E%9C%EB%93%9C-%EA%B2%BD%ED%97%98%EB%94%94%EC%9E%90%EC%9D%B8-%EB%A6%AC%EB%89%B4%EC%96%BC-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/

### 글꼴 원본·라이선스·용량
- Pretendard 저장소(OFL, 다이내믹 서브셋, jsDelivr): https://github.com/orioncactus/pretendard
- Pretendard 파일 크기(GitHub API): https://api.github.com/repos/orioncactus/pretendard/contents/packages/pretendard/dist/web/static/woff2 , `.../woff2-subset`, `.../variable/woff2`, `.../variable`
- Pretendard 고정폭 숫자 논의: https://github.com/orioncactus/pretendard/discussions/110
- Adobe 이달의 폰트 Pretendard(2022-09-19): https://blog.adobe.com/ko/publish/2022/09/19/font-of-the-month-pretendard
- Noto Sans KR 메타데이터·파일: https://raw.githubusercontent.com/google/fonts/main/ofl/notosanskr/METADATA.pb , https://api.github.com/repos/google/fonts/contents/ofl/notosanskr
- Noto Serif KR 메타데이터: https://raw.githubusercontent.com/google/fonts/main/ofl/notoserifkr/METADATA.pb
- 고운바탕 설명·메타데이터·파일: https://raw.githubusercontent.com/google/fonts/main/ofl/gowunbatang/DESCRIPTION.en_us.html , https://raw.githubusercontent.com/google/fonts/main/ofl/gowunbatang/METADATA.pb , https://api.github.com/repos/google/fonts/contents/ofl/gowunbatang
- 고운돋움 설명·메타데이터·파일: https://raw.githubusercontent.com/google/fonts/main/ofl/gowundodum/DESCRIPTION.en_us.html , https://raw.githubusercontent.com/google/fonts/main/ofl/gowundodum/METADATA.pb
- IBM Plex Sans KR 메타데이터·파일: https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexsanskr/METADATA.pb , https://api.github.com/repos/google/fonts/contents/ofl/ibmplexsanskr
- SUIT 저장소·파일: https://github.com/sun-typeface/SUIT , https://api.github.com/repos/sun-typeface/SUIT/contents/fonts/static/woff2 , https://api.github.com/repos/sun-typeface/SUIT/contents/fonts/variable/woff2 , 글자 수(검색 요약): https://sun.fo/suit/
- Wanted Sans: https://github.com/wanteddev/wanted-sans , https://raw.githubusercontent.com/wanteddev/wanted-sans/main/packages/wanted-sans/README.md , CDN(검색 요약): https://uxdev.org/blog/297-wanted-sans/
- 나눔스퀘어 네오 파일: https://api.github.com/repos/moonspam/NanumSquareNeo/contents , https://github.com/moonspam/NanumSquareNeo
- 마루 부리 파일·README: https://github.com/fonts-archive/MaruBuri , https://api.github.com/repos/fonts-archive/MaruBuri/contents
- 리디바탕 라이선스(검색 요약): https://designbase.co.kr/freefonts/ridibatang/ , https://ridicorp.com/branding/fonts/ridibatang
- KoPub 라이선스(검색 요약): https://www.kopus.org/biz-electronic-font2/
- Google Fonts 한국어 조각 방식(검색 요약): https://developers.googleblog.com/google-fonts-launches-korean-support/ , https://googlefonts.github.io/korean/

### 선호·가독성 근거
- 감성과학 2021 "한글 글꼴의 세리프 및 네모틀 여부에 따른 친숙성과 선호도"(검색 요약): https://koreascience.kr/article/JAKO202117457205485.do , https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002794958
- 전자책 본문 글꼴 선호도 조사(검색 요약): https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE10443594
- Velasco 외 2016, The Taste of Typeface: https://pubmed.ncbi.nlm.nih.gov/27433316/
- Shaikh, Chaparro & Fox 2006, Perception of Fonts: https://soma.sbcc.edu/users/russotti/113/personality_Shaikh.pdf , https://works.bepress.com/barbara-chaparro/121/
- Monotype 2025 서체 트렌드(검색 요약): https://kr.monotype-asia.com/2025-type-trends
- Smashing Magazine, Inclusive Dark Mode(2025-04, 검색 요약): https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/
- Design Shack, Dark Mode Typography(검색 요약): https://designshack.net/articles/typography/dark-mode-typography/
- Pretendard·Noto 비교 글(검색 요약): https://brunch.co.kr/@smootart/9

### BeInside 내부
- `reports/design/2026-09-direction.md` §2, §4, §6 결정 9
- `reports/design/2026-09-study-korea.md` D3, D4, D5, §6-7
- `reports/design/mockups/2026-09-home-options.html` (`.b-week`, `.b-alt small`, `.b-tile span`)
- `index.html:65-67`, `css/base.css:560, 742, 963, 1294`, `css/pages.css:335, 438, 1101, 1500, 2589`, `sw.js:72-86`
