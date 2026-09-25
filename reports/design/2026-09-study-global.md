# 해외 수상작·글로벌 서비스 디자인 스터디

- 작성: 디자인 리서처 (역할 정의 `.claude/agents/design-researcher.md`)
- 작성일·확인일: 2026-09-25
- 범위: Apple Design Awards(2022~2026), App Store Awards, Webby, Google Play Best of, Material Design Awards, Red Dot·iF·Awwwards(검색 범위 안에서), 그리고 마음 돌봄·여성 건강·육아·위기 연결 서비스
- 대상 사용자: 출산 후 12개월, 혼자 아이를 돌보는 주양육자(20~30대 여성 중심). 새벽에 한 손으로 폰을 보는 상황.
- 운영자 톤 요청: **은은하고, 감성적이며, 편안한 느낌.** 비영리·1인 운영·정적 웹·모바일 우선. 109·119는 항상 보여야 한다.

> **조사 방법과 한계**
> 웹 검색(WebSearch)은 전 범위 가능했지만, 원문 열람(WebFetch)은 네트워크 정책으로 대부분 막혔다. 원문을 직접 연 곳은 `developer.apple.com`(ADA 연도별 수상 페이지, Behind the Design 기사)뿐이다. 나머지(Webby, NHS 서비스 매뉴얼, GOV.UK 디자인 시스템, 988 사례, Crisis Text Line 사례 등)는 **검색 결과 요약으로 확인한 내용**이며, 표에서 "검색 요약"으로 표시했다. 수치를 BeInside 문서나 발표에 옮길 때는 원문을 한 번 더 열어 확인할 것.
> Red Dot·iF에서는 산후·육아·마음 돌봄 **인터페이스** 수상작을 검색으로 찾지 못했다(아래 §6 "확인 필요" 참조). 없다고 단정하지 않는다.

---

## 1. 요약 — 핵심 발견 5개

1. **최근 수상작의 공통 언어는 "다그치지 않음"이다.** 2024 ADA 사회적 영향 부문 수상작 Gentler Streak는 심사평 자체가 "끈질긴 리마인더가 아니라 낙관적이고 격려하는 분위기"였다([ADA 2024](https://developer.apple.com/design/awards/2024/)). 같은 해 즐거움 부문 Bears Gratitude, 사회적 영향 결선 How We Feel, 2025 앱 오브 더 이어 Tiimo까지 모두 "적게 요구하고, 놓쳐도 벌하지 않는" 구조다. 반대로 2023 즐거움 부문 수상작 Duolingo는 스트릭·죄책감 알림으로 유명하다 — **수상 여부가 아니라 사용자의 상태에 맞는지가 기준**이다. 산후 주양육자에게 스트릭은 해롭다.
2. **"은은함"은 채도와 면적으로 만들고, 대비로 만들지 않는다.** Headspace 2024 리브랜드는 따뜻한 크림(#f9f4f2) 바탕 위에 시그니처 오렌지를 유지했다(검색 요약). 988 Lifeline 웹은 따뜻한 색과 차가운 색을 섞은 차분한 팔레트이면서 **고대비 라이트·고대비 다크를 포함한 4가지 색 모드**를 둔다(검색 요약). BeInside 현재 토큰 중 `--accent-primary #D4795E`는 바탕 `#F5F0EB` 위 대비 2.77:1, `--text-muted #B0A090`는 2.24:1로 본문·버튼 글자 기준(4.5:1)에 못 미친다. 부드러운 느낌은 넓은 면의 저채도 색으로 내고, 글자와 위기 버튼은 진하게 둬야 한다.
3. **위기 연결은 "첫 화면에서 한 번 탭"이 국제 표준에 가깝다.** Wysa는 SOS 버튼을 홈 화면에 둔다. Crisis Text Line은 모바일 유입 70~80%를 전제로 문자·메신저·전화 등 여러 경로를 한 화면에 모았고, 개편 뒤 키워드 문자 유입이 하루 150건 늘었다(검색 요약). 반면 Headspace의 "SOS"는 탐색 → 명상 → 스크롤 아래에 있고, 내용도 위기 연결이 아니라 3분 명상이다 — **이름과 위치가 기대와 어긋나는 반대 사례**다.
4. **새벽 사용 맥락은 "다크 모드"가 아니라 "야간 모드"로 설계해야 한다.** 육아 기록 앱들은 새벽 수유를 위해 진짜 검정 화면, 햅틱 확인, "타이핑 없이 3탭"을 내세운다(Baby Daybook, LilSense 등 스토어 설명). Daylio는 "두 번 탭, 한 글자도 안 쓰고" 기록한다. BeInside의 현재 다크 토큰(`#161B19`, 초록빛 먹색)은 차분하지만, 새벽 3시 한 손 사용에 맞춘 조도·탭 수·글자 크기 설계는 따로 필요하다.
5. **"비영리·무료·데이터를 가져가지 않음"은 그 자체로 디자인 요소다.** How We Feel은 비영리·무료·기부 운영으로 2022 App Store Awards 문화적 영향 수상, 2023 Webby 최고 UX, 2024 ADA 결선에 올랐다. Flo는 익명 모드를 제품 전면에 걸었다. BeInside는 광고·로그인이 없는 정적 사이트라는 점을 **사실대로, 과장 없이**(방문·통화 기록은 남는다는 점까지) 짧게 보여주는 것이 신뢰를 만든다.

---

## 2. 레퍼런스 카드 (18개)

카드 읽는 법: **수상·출처** → **무엇이 좋은가(원리)** → **BeInside에 옮길 것 / 옮기지 않을 것 / 이유**.
색·타이포 등 항목 중 확인하지 못한 것은 "확인 필요"로 적었다.

### A. 수상작

#### 1. Gentler Streak (피트니스·웰빙, 슬로베니아)
- **수상**: 2024 ADA 사회적 영향(Social Impact) 부문 앱 수상 — [ADA 2024](https://developer.apple.com/design/awards/2024/). 2023 ADA 비주얼·그래픽 결선 — [ADA 2023](https://developer.apple.com/design/awards/2023/). 2026 같은 개발사의 The Outsiders가 인터랙션 결선 — [ADA 2026](https://developer.apple.com/design/awards/).
- **심사평**: "끈질긴 리마인더가 아니라 낙관적이고 격려하는 분위기로 움직인다(powered not by insistent reminders but an optimistic and encouraging vibe)."
- **무엇이 좋은가**
  - 문구: "통계는 숫자일 뿐이다. 해석하지 못하면 의미가 없다", "15분 걷기가 지금 몸이 할 수 있는 것이라면 그걸로 좋다" — [Behind the Design](https://developer.apple.com/news/?id=3m0ht22s). 숫자 대신 해석을 준다.
  - 비교 대상은 남이 아니라 **나의 지난 기록**. 월간 요약이 "비교보다 진행"을 보여준다.
  - 추상적 마스코트 Yorhart: 나이·성별·체형과 무관하게 받아들여지도록 사람 모양을 피했다. "심장이 당신에게 하는 말"이라는 설정.
  - 색: 부드러운 파랑·초록(리뷰 기준, [pixso](https://pixso.net/articles/gentler/)). 정확한 팔레트는 확인 필요.
  - 무료 핵심 기능 + 선택적 후원. 한국어 지원.
- **옮길 것**: "해석을 주는 문구"(예: N주째 3줄 요약에 "이 시기엔 흔하다"보다 "이 시기에 많이 겪는 일과 해볼 수 있는 것"), 자기 과거와만 비교, 사람 모양이 아닌 상징 캐릭터(쓴다면).
- **옮기지 않을 것**: 활동량·점수 같은 수치 시각화. 산후 기분을 점수로 바꾸면 임상 검수 없는 선별 도구가 된다(운영자 답변: 점수형 선별 도구 보류).
- **이유**: 핵심 원리(요구하지 않고 해석해 준다)가 산후 동반자 첫 화면과 정확히 맞는다.

#### 2. How We Feel (감정 기록, 미국·비영리)
- **수상**: 2022 App Store Awards 문화적 영향(Cultural Impact) 수상 — [Engadget](https://www.engadget.com/apple-2022-app-store-awards-094422535.html), [App Store 스토리](https://apps.apple.com/us/iphone/story/id1647059928). 2023 Webby 최고 사용자 경험(Apps, dApps & Software) — [Webby 수상 페이지](https://winners.webbyawards.com/2023/apps-dapps-and-software/app-features/best-user-experience/243330/how-we-feel)(원문 열람 불가, 검색 결과로 확인). 2024 ADA 사회적 영향 결선 — [ADA 2024](https://developer.apple.com/design/awards/2024/).
- **무엇이 좋은가**
  - 예일대 감성지능센터와 함께 만든 **무드 미터**(에너지 × 쾌·불쾌 2축)로 감정을 고른다. 감정을 도형으로 표현: 높은 에너지의 거친 감정은 뾰족한 모양, 고요한 감정은 둥근 곡선 — [Yale Medicine](https://medicine.yale.edu/news-article/the-how-we-feel-app-helping-emotions-work-for-us-not-against-us/), 검색 요약.
  - 기록 뒤에 **그 자리에서 할 수 있는 전략**(호흡, 움직이기, 생각 바꾸기 등)을 바로 준다.
  - 비영리·무료·기부 운영 — [Yale Medicine](https://medicine.yale.edu/news-article/the-how-we-feel-app-helping-emotions-work-for-us-not-against-us/).
- **옮길 것**: "기록 → 곧바로 할 수 있는 것" 흐름(BeInside의 "오늘 기분 3단계 → 새벽에 할 수 있는 것 3가지"와 같은 구조), 모양·곡률로 감정 상태를 표현하는 방식(색만으로 구분하지 않아 접근성에도 유리).
- **옮기지 않을 것**: 수백 개 감정 단어 선택, 2축 그리드. 새벽 한 손 사용에는 선택지가 너무 많다.
- **이유**: BeInside와 운영 형태(비영리·무료)가 가장 닮은 수상작이다. 규모를 줄여 원리만 가져온다.

#### 3. Bears Gratitude (감사 일기, 호주·2인 팀)
- **수상**: 2024 ADA 즐거움과 재미(Delight and Fun) 부문 앱 수상 — [ADA 2024](https://developer.apple.com/design/awards/2024/).
- **무엇이 좋은가** — [Behind the Design](https://developer.apple.com/news/?id=i74v3f4r)
  - 일러스트레이터가 **자기 불안을 달래려고 그린 손그림 곰**이 앱의 출발점. "그림이 우리가 하는 모든 것의 중심이다."
  - 베이지 계열 따뜻한 중립색 바탕.
  - 로그인 화면 없이 바로 쓰기 시작. 좌우 탭으로 넘기는 카드.
  - 문구: "오늘은 아직 안 끝났어", "감사는 생일 같은 큰 순간이 아니어도 된다. 아침의 뜨거운 커피 한 잔일 수도 있다."
  - "앱을 사용자가 경험하는 순서 그대로 디자인했다."
- **옮길 것**: 로그인 없는 즉시 시작(BeInside는 이미 해당 — 유지), 손그림 질감의 작은 일러스트 1~2종, "작은 것도 된다"는 문구 방향.
- **옮기지 않을 것**: 캐릭터 군단, 귀여움 중심 톤. 위기 상황의 사용자에게 과하게 귀여운 화면은 가볍게 느껴질 수 있다.
- **이유**: 1~2인 팀이 **그림 한 스타일의 일관성**만으로 수상했다는 점이 1인 운영에 현실적인 참고가 된다.

#### 4. Tiimo (시각 플래너, 덴마크)
- **수상**: 2024 ADA 포용성(Inclusivity) 결선 — [ADA 2024](https://developer.apple.com/design/awards/2024/). 2025 App Store Awards 올해의 iPhone 앱 — [MacRumors](https://www.macrumors.com/2025/12/04/apple-announces-2025-app-store-award-winners/), [Daring Fireball](https://daringfireball.net/2025/12/2025_app_store_award_winners).
- **무엇이 좋은가**
  - "신경다양성의 뇌를 염두에 두고 설계했지만 그 접근이 보편적일 수 있다. 특정 집단의 필요를 위해 설계하는 것을 믿는다" — [Apple Developer 기사](https://developer.apple.com/articles/tiimo).
  - 시간을 색 블록으로 보여줘 **읽지 않고 본다.** 인지 부하를 줄이는 것이 설계의 중심.
- **옮길 것**: "한 집단을 위해 좁게 설계하면 넓게 통한다"는 원칙 — 수면 부족·인지 저하 상태의 산후 사용자를 기준으로 설계. 0~12개월 월령을 **시간 띠(타임라인)**로 보여주는 방식.
- **옮기지 않을 것**: 할 일·일정 관리 기능(기능 추가 동결 원칙).
- **이유**: 수면 부족은 일시적 인지 저하와 비슷한 조건을 만든다. 인지 부하를 줄인 디자인이 이 사용자에게 곧 "편안함"이다.

#### 5. Headspace (명상·마음 건강, 미국)
- **수상**: 2023 ADA 사회적 영향 부문 앱 수상, 2022 같은 부문 결선 — [ADA 2023](https://developer.apple.com/design/awards/2023/), [ADA 2022](https://developer.apple.com/design/awards/2022/).
- **무엇이 좋은가**
  - 2024 리브랜드(사내팀 + Italic Studio): 따뜻한 크림 바탕(#f9f4f2)이 가장 많이 쓰이는 배경, 시그니처 오렌지 유지, 다양한 감정을 나타내는 보조색 추가, Colophon의 전용 서체 — [Italic Studio](https://italic-studio.com/projects/headspace-rebrand/), [Brand New](https://www.underconsideration.com/brandnew/archives/new_identity_for_headspace_done_in_house_with_italic_studio.php)(검색 요약).
  - **추상적인 감정은 일러스트로, 실제 서비스(상담 등)는 사진으로** 역할을 나눴다 — [Design Compass](https://designcompass.org/en/2024/04/30/headspace/)(검색 요약).
- **옮길 것**: 크림 바탕 + 채도 낮춘 따뜻한 주색 1개 + 감정별 보조색 소수. "감정 = 그림, 실제 연결(보건소·상담전화) = 사실 정보" 역할 분리.
- **옮기지 않을 것**: SOS의 위치와 이름(§4 반대 사례 참조), 구독 중심 구조.
- **이유**: BeInside의 피치/살구 방향이 이미 이 계열이다. 방향은 맞고, 채도·대비 조정이 과제다.

#### 6. Ahead: Emotions Coach / Empathy (마음 돌봄 결선작 2종)
- **수상**: Ahead — 2024 ADA 사회적 영향 결선. Empathy(상실·애도 동반) — 2022 ADA 사회적 영향 결선 — [ADA 2024](https://developer.apple.com/design/awards/2024/), [ADA 2022](https://developer.apple.com/design/awards/2022/).
- **무엇이 좋은가**: Apple은 Ahead를 "사람과 코치가 이어서 나누는 대화처럼 느껴지고, 모든 상호작용이 라포를 쌓는다"고 평했다(검색 요약, Apple Newsroom 원문 열람 불가 — 확인 필요). Empathy는 상실이라는 좁은 순간을 위한 동반 앱이 결선에 올랐다는 점 자체가 참고가 된다. 두 앱의 화면 세부는 확인 필요.
- **옮길 것**: 페이지가 아니라 **대화처럼 이어지는 한 줄씩의 흐름**(질문 하나 → 답 하나 → 다음 행동).
- **옮기지 않을 것**: 챗봇형 인터페이스. 임상 검수자 없이 자유 대화를 여는 것은 위험하다(아래 Woebot 참고).
- **이유**: "좁은 인생 사건 하나를 위한 동반자"도 세계 최상위 디자인상 결선에 오를 수 있다 — BeInside의 집중 전략을 뒷받침하는 근거.

### B. 서비스 (수상 여부와 무관)

#### 7. Finch (자기돌봄 펫)
- **수상**: 공식 디자인 수상은 검색으로 찾지 못함 — 확인 필요. 평점: 미국 App Store 4.9점·75만+ 평가(Slate 2026-09 기사 요약, [Slate](https://slate.com/technology/2026/09/finch-app-self-care-wellness-review.html), 원문 열람 불가).
- **무엇이 좋은가**: 작은 자기돌봄 행동(호흡·일기·기분 체크)을 하면 새가 자란다. **빠진 날에 벌이 없다.** 유료 기능은 꾸미기 위주이고 돌봄 도구는 무료 — [Slate](https://slate.com/technology/2026/09/finch-app-self-care-wellness-review.html), [Finch 소개](https://finchcare.com/about-finch).
- **한계**: 새가 "보고 싶었어"라고 알림을 보내면 오히려 짜증·부담을 느끼는 사용자가 있다(같은 기사 요약). 게임 구조에 대한 피로.
- **옮길 것**: "빠진 날에 벌 없음" 원칙. 돌봄 도구는 무료, 꾸밈은 선택.
- **옮기지 않을 것**: 돌봐야 하는 가상 생명체. 이미 실제 아기를 돌보는 사람에게 **돌볼 대상을 하나 더 주는 설계**는 맞지 않는다.
- **이유**: 게이미피케이션을 가장 부드럽게 한 사례도 산후 맥락에서는 부담이 될 수 있다는 경계선.

#### 8. Daylio (마이크로 기분 일기)
- **출처**: [공식 사이트](https://daylio.net/), [App Store](https://apps.apple.com/us/app/daylio-journal-mood-tracker/id1194023242).
- **무엇이 좋은가**: "두 번 탭으로 하루 기록 — 기분(5단계) 고르고, 한 일 고르기." "한 글자도 쓰지 않고 일기를 쓴다." 빈 페이지를 아이콘 선택으로 바꿨다.
- **옮길 것**: 타이핑 없는 입력. BeInside 오늘 기분 3단계는 이 방향과 같다 — 유지하고, 선택 후 한 줄 메모는 **선택 사항**으로.
- **옮기지 않을 것**: 통계·차트·연속 기록 수. 결과 수치가 주는 비교 압박.
- **이유**: 새벽 한 손 사용 조건에서 "탭 수"가 곧 편안함이다.

#### 9. Wysa (AI 대화·CBT, 영국/인도)
- **출처**: [Wysa SOS](https://www.wysa.com/role-of-ai-in-sos), [Business Wire 2024-04](https://www.businesswire.com/news/home/20240415230248/en/AI-Detects-82-of-Mental-Health-App-Users-in-Crisis-Finds-Wysa).
- **무엇이 좋은가**
  - **SOS 버튼을 홈 화면에** 두고 한 번 탭으로 위기 자원·그라운딩·비상 연락처로 간다.
  - 사용자가 **스스로 만드는 안전 계획(safety plan)**.
  - 캐릭터는 펭귄이고, 스스로를 AI라고 밝힌다 — 사람인 척하지 않는다(리뷰 요약, [Best For You](https://bestforyou.org.uk/apps/wysa/)).
  - 수치: Wysa 자체 연구에서 위기 사례의 82%를 AI가 감지하고 사용자가 확인했다고 발표 — 회사 발표 수치이며 독립 검증은 확인 필요.
- **옮길 것**: 홈 화면의 위기 버튼(BeInside 위기 바와 같은 원리 — 유지), **"내가 만드는 안전 계획" 한 장**(기기 저장, 서버 전송 없음)은 3단계 콘텐츠 후보로 검토할 가치가 있다(단, 기능 동결 원칙에 따라 운영자 판단 필요).
- **옮기지 않을 것**: AI 대화, 자동 위기 감지.
- **이유**: 위기 버튼의 위치·명칭 원칙은 세계적으로 같다. 대화형 AI는 1인·검수자 없는 운영에서 감당할 수 없다.

#### 10. Woebot (AI 치료 챗봇 — 종료 사례)
- **출처**: 소비자용 앱 2025-06-30 종료 — [MobiHealthNews](https://www.mobihealthnews.com/news/woebot-health-shutting-down-its-app), [STAT](https://www.statnews.com/2025/07/02/woebot-therapy-chatbot-shuts-down-founder-says-ai-moving-faster-than-regulators/).
- **무엇이 배울 점인가**: 150만 명 이상이 쓴 근거 기반 앱도 규제·사업 구조 문제로 문을 닫았다. 종료 전 대화 기록 내려받기 기간을 주고 이후 데이터를 익명화했다.
- **옮길 것**: "서비스가 끝나도 사용자에게 남는 것"을 설계하는 태도. BeInside는 기기에 저장된 날짜·기록을 **사용자가 직접 지울 수 있게** 안내한다.
- **옮기지 않을 것**: 대화형 치료 도구.
- **이유**: 1인 운영 서비스일수록 지속 가능성과 종료 시나리오가 신뢰의 일부다.

#### 11. Clue (주기 기록, 독일)
- **출처**: [Creative Review](https://www.creativereview.co.uk/design-clue-inclusive-period-tracking-app/), [Refinery29](https://www.refinery29.com/en-us/2014/02/63517/feminine-app-designs). 디자인상 수상은 검색으로 찾지 못함 — 확인 필요.
- **무엇이 좋은가**: **분홍색 픽셀 하나 없이** 만든 주기 앱. 꽃·나비 없이 과학적·사실적 톤. "더 성숙한 제품"을 목표로 했다.
- **옮길 것**: "여성용 = 분홍·꽃"이라는 공식을 따르지 않아도 된다는 근거. 사실 중심 문구 톤(BeInside 작업 규칙의 "담백하고 정직한 톤"과 같다).
- **옮기지 않을 것**: 차갑게 느껴질 정도의 중립. 운영자가 요청한 것은 "감성적이고 편안한" 톤이다 — 피치·살구의 따뜻함은 유지하되 **귀엽게·여리게** 가지 않는다.
- **이유**: 20~30대 여성 = 핑크라는 가정은 근거가 약하다. 아빠·조부모 주양육자도 배제하지 않는다.

#### 12. Flo (주기·임신 기록) — 익명 모드
- **출처**: 익명 모드 2023-01 도입, TIME Best Inventions 2023 목록 선정(Flo 자체 발표) — [Flo newsroom](https://flo.health/newsroom/time-best-inventions-2023). 다른 자료에는 "Finalist"로 표기되어 등급은 확인 필요. 디자인 시스템 — [Flo 디자인 팀 Medium](https://medium.com/flo-health/flo-design-system-part-1-1eb8b731a48c).
- **무엇이 좋은가**: 이름·이메일·기기 식별자 없이 쓰는 모드를 **기능으로 전면에** 내세웠다. 색 체계는 Material 색 체계를 참고하되 단계 수를 줄였다.
- **옮길 것**: "저장하지 않는 것 / 남는 것"을 제품 문구로 짧게 보여주기. 단, CLAUDE.md 안전 규칙대로 **"기록에 남지 않아요" 같은 거짓 안심 금지** — "이 사이트는 입력을 서버에 보내지 않아요. 휴대폰 방문 기록과 통화 기록은 남아요"처럼 쓴다.
- **옮기지 않을 것**: 계정·임신 추적 기능 전반.
- **이유**: 사생활은 산후 사용자, 특히 가정폭력 위험이 있는 사용자에게 안전 문제다.

#### 13. 새벽 육아 기록 앱들 (Baby Daybook, LilSense, Huckleberry)
- **출처**: 스토어 설명 기준 — [Baby Daybook](https://play.google.com/store/apps/details?id=com.drillyapps.babydaybook&hl=en_US), [Huckleberry](https://apps.apple.com/us/app/huckleberry-baby-tracker/id1169136078). LilSense의 "진짜 검정 화면 + 햅틱 확인 + 타이핑 없이 3탭, 새벽 3시를 위한 앱"은 검색 요약(원 스토어 링크 확인 필요). Huckleberry의 "수상" 표기와 Editors' Choice는 회사 자체 표기 — 상세 확인 필요.
- **무엇이 좋은가**: 새벽 수유·기저귀 교체를 **설계 조건**으로 놓는다 — 어두운 화면, 적은 탭, 한 손, 잠이 덜 깨도록.
- **옮길 것**: "야간 모드" 개념(§5 제안 3). 시스템 다크 모드와 별도로, 밤 시간대에 더 어둡고 글자는 크게.
- **옮기지 않을 것**: 수유·수면 기록 기능 자체(기능 동결, 이미 좋은 앱이 많다).
- **이유**: BeInside 사용자의 가장 외로운 시간대가 새벽이다. 그 시간에 눈이 편한 화면이 곧 "편안함"이다.

### C. 위기 연결·공공 서비스

#### 14. 988 Suicide & Crisis Lifeline 웹 (미국)
- **출처**: 웹 디자인 시스템 사례 — [Made by We](https://madebywe.org/case-studies/988)(검색 요약, 원문 열람 불가). 브랜드 기준 — [SAMHSA 988 Branding Standards](https://www.samhsa.gov/sites/default/files/988-branding-standards.pdf)(검색 요약).
- **무엇이 좋은가**
  - 팔레트: "희망·차분함·안심"을 말하는 보완색, 차가운 색과 따뜻한 색의 교차가 "자연스러운 감정의 리듬"을 암시. 각 색에 옅은 톤 2단계.
  - **4가지 색 모드**(라이트, 다크, 고대비 라이트, 고대비 다크), 시스템 설정 자동 적용 + 수동 선택. 12개월 활성 사용자 600만+(사례 페이지 수치, 확인 필요).
  - 로고에서 '988' 숫자가 가장 굵다 — 번호 자체가 브랜드.
- **옮길 것**: 번호를 가장 굵게(109·119를 버튼 안에서 가장 큰 글자로), 고대비 모드 대응, 시스템 설정 자동 적용.
- **옮기지 않을 것**: 브랜드 확장 규모.
- **이유**: 위기선 웹사이트도 "차분함"과 "고대비"를 동시에 가질 수 있다는 가장 직접적인 사례.

#### 15. Crisis Text Line 웹 (미국)
- **출처**: 사이트 개편 사례 — [Wide Eye](https://www.wideeye.co/case-study/crisis-text-line)(검색 요약, 원문 열람 불가). [브랜드 가이드](https://www.crisistextline.org/brand-guidelines/).
- **무엇이 좋은가**(사례 페이지 수치, 확인 필요)
  - 문자 사용자 75%가 25세 미만, 사이트 접속의 70~80%가 휴대폰.
  - 목표: "가능한 한 빠르고 편하게 도움에 닿게." 문자 앱 열기·메신저·단축번호 직접 입력 등 **여러 경로를 한 화면에**.
  - 속도 2배, 로딩 약 2초 단축. 개편 뒤 HOME 키워드 문자 하루 150건 증가.
- **옮길 것**: `sms:` 링크(109 문자 상담이 있다면 전화와 나란히), 가벼운 페이지(정적 웹의 장점 유지 — 폰트·이미지 최소화), "전화가 어려우면 문자" 대안 제시.
- **옮기지 않을 것**: 없음(원리가 그대로 맞는다).
- **이유**: 새벽에 아기 옆에서는 **목소리를 낼 수 없는** 경우가 많다. 문자 경로가 전화만큼 중요하다.

#### 16. NHS 웹사이트·디자인 시스템 (영국)
- **출처**: [How we write](https://service-manual.nhs.uk/content/how-we-write), [Care cards 패턴](https://service-manual.nhs.uk/design-system/patterns/help-users-decide-when-and-where-to-get-care), [긴급 정신건강 도움](https://www.nhs.uk/nhs-services/mental-health-services/where-to-get-urgent-help-for-mental-health/), [111 정신건강 옵션 도입(2024-08)](https://www.england.nhs.uk/2024/08/nhs-111-offering-crisis-mental-health-support-for-the-first-time/). 모두 검색 요약.
- **무엇이 좋은가**
  - 문장은 20단어 이하, 문단은 3문장 이하, 능동태("약국 찾기"), 쉬운 말.
  - **Care cards**: 비긴급(GP·약사) / 긴급(111) / 즉시(999·응급실)를 색과 **숨은 텍스트**(스크린리더용 "긴급" 등)로 단계 구분. 즉시 단계는 빨강.
  - 정신건강 위기 시 "111에 전화해 정신건강 옵션 선택"처럼 **행동을 번호와 버튼 순서까지** 알려준다.
- **옮길 것**: 3단계 연결 카드 — "오늘 안에 이야기해 보기(1577-0199·보건소) / 지금 바로 연락(109) / 즉시 119". 색만이 아니라 제목 글자와 스크린리더용 텍스트로 단계 표시. 문장 길이 규칙(한국어로는 한 문장 40자 안팎 목표 — 제안값).
- **옮기지 않을 것**: NHS의 강한 원색 파랑·노랑. 공공기관 느낌은 운영자가 원하는 "감성"과 멀다.
- **이유**: BeInside 4단계 프레임워크(상황 인식 → 판단 → 행동 → 연결)의 "판단→연결"을 가장 잘 시각화한 공공 패턴.

#### 17. GOV.UK "Exit this page" 컴포넌트 (영국)
- **출처**: [GOV.UK 디자인 시스템](https://design-system.service.gov.uk/components/exit-this-page/), [GOV.UK 디자인 블로그 2023-08](https://designnotes.blog.gov.uk/2023/08/14/exit-this-page-fast-with-the-design-systems-new-component/), [Escape 키를 쓰지 않은 이유](https://beeps.website/blog/2024-10-09-why-govuk-exit-this-page-doesnt-use-escape/). 검색 요약.
- **무엇이 좋은가**
  - 가정폭력 생존자·접근성 필요 사용자와의 리서치로 설계.
  - **Shift 키 3번(5초 안)** 단축키, 누를 때마다 점이 채워진다. Esc·Alt는 브라우저·시스템 기능과 충돌해 버렸다.
  - 라벨이 중요: "Quick Exit" 라벨 시제품에서 참가자 5명 모두 뜻을 이해하지 못했다는 보고 — [Trauma-Informed Design blog](https://medium.com/the-trauma-informed-design-blog/a-deep-dive-in-the-exit-this-page-button-39f991553930)(검색 요약).
- **옮길 것**: BeInside `QUICK_EXIT_PAGES` 버튼의 **라벨을 행동으로**("바로 나가기"보다 "이 화면 닫고 날씨로 이동"처럼 결과가 보이게 — 사용자 테스트 필요), 키보드 단축키, 방문 기록은 남는다는 사실 안내.
- **옮기지 않을 것**: 없음.
- **이유**: 산후 사용자 중 가정폭력 위험군이 있다. 빠른 나가기는 CLAUDE.md 안전 규칙 항목이다.

#### 18. PSI HelpLine / 미국 모성 정신건강 핫라인 (산후 특화 연결)
- **출처**: [PSI HelpLine](https://postpartum.net/get-help/psi-helpline/), [PSI 도움받기](https://postpartum.net/get-help/), [MGH 여성정신건강센터 긴급 자원](https://womensmentalhealth.org/posts/emergency-resources-for-individuals-with-perinatal-mental-health-issues/).
- **무엇이 좋은가**
  - **웜라인과 핫라인을 구분**해 보여준다: PSI HelpLine(1-800-944-4773)은 자원봉사자가 다시 연락해 주는 비위기 "웜라인", 전화·문자 모두 가능. 1-833-TLC-MAMA는 24시간 전문 상담사 핫라인. 둘 다 스페인어 지원.
  - 번호에 **누가 받는지, 언제 답이 오는지**를 한 줄로 붙인다.
- **옮길 것**: 한국 번호에 같은 방식 적용 — "109: 24시간, 상담사가 바로 받음 / 1577-0199: 정신건강복지센터, 지역 연결 / 119: 지금 위험할 때". CLAUDE.md의 "모든 전화번호 tel: 링크 + 한 줄 설명" 규칙과 정확히 일치.
- **옮기지 않을 것**: 미국 번호, 자원봉사 콜백 구조(한국 대응 서비스 확인 필요).
- **이유**: "지금 위기는 아닌데 누군가와 이야기하고 싶은" 상태가 산후 주양육자에게 가장 흔하다. 위기선만 보여주면 연락 문턱이 높아진다.

---

## 3. 공통 원칙

| 영역 | 레퍼런스에서 뽑은 원리 | 근거 카드 |
|---|---|---|
| **색 — 온도** | 따뜻한 중립(크림·베이지) 바탕이 주류. 차가운 보조색을 소량 섞어 "감정의 리듬"을 만든다. | 3, 5, 14 |
| **색 — 채도** | 넓은 면은 저채도, 강조는 1색. 분홍·꽃 공식을 따르지 않아도 된다. | 5, 11 |
| **색 — 대비** | 은은함과 고대비는 공존한다. 글자·버튼은 4.5:1 이상, 고대비 모드 별도. | 14, 16 |
| **타이포** | 전용 서체는 브랜드 자산이지만 1인 운영에는 과하다. 쉬운 말·짧은 문장이 서체보다 중요. 번호는 가장 굵게. | 5, 14, 16 |
| **레이아웃 밀도** | 한 화면 한 질문. 입력은 2~3탭, 타이핑은 선택. | 2, 8, 13 |
| **일러스트** | 손그림 한 스타일의 일관성. 사람 모양을 피한 상징(심장, 도형). 감정은 그림, 실제 서비스는 사실 정보. | 1, 2, 3, 5 |
| **모션** | 도형·곡률로 상태를 보여주는 정도. 과한 보상 애니메이션 없음. `prefers-reduced-motion` 존중. | 2, 3 |
| **문구 톤** | 숫자 대신 해석. 과거의 나와만 비교. "작은 것도 된다." 쉬운 말, 짧은 문장, 능동태. | 1, 3, 16 |
| **첫 화면** | 즉시 시작(로그인 없음) + 오늘 한 가지 + 위기 버튼. | 3, 9, 15 |
| **위기·도움 연결** | 홈에서 한 번 탭. 전화·문자 병렬. 단계별(웜라인 / 위기선 / 응급) 구분. 번호마다 누가·언제 받는지. | 9, 15, 16, 18 |
| **다크/야간** | 시스템 설정 자동 + 수동 선택. 새벽 사용은 더 어둡고 더 크게. | 13, 14 |
| **사생활** | 저장하지 않는 것과 남는 것을 사실대로. 종료 시 데이터 처리까지. | 10, 12, 17 |

---

## 4. 반대 사례 — 피해야 할 것

| 패턴 | 사례 | 왜 해로운가 (산후 맥락) |
|---|---|---|
| **스트릭·죄책감 알림** | Duolingo — 2023 ADA 즐거움 부문 수상작([ADA 2023](https://developer.apple.com/design/awards/2023/))이지만 "Duo를 실망시키지 마"류의 수동공격적 알림으로 알려짐([Debugger/Medium](https://debugger.medium.com/duolingo-needs-to-chill-8f1832745ca0)) | 하루 놓치면 실패로 느끼는 "될 대로 되라 효과"(abstinence violation effect)가 기록 중단으로 이어진다는 설명이 있다([검색 요약](https://gamifiedlives.com/blog/streak-anxiety)). 산후에는 하루를 놓치는 것이 정상이다. |
| **"보고 싶었어" 알림** | Finch 일부 사용자 반응([Slate](https://slate.com/technology/2026/09/finch-app-self-care-wellness-review.html)) | 부드러운 톤이어도 **돌봄 의무를 하나 더** 만든다. |
| **돌봐야 하는 가상 생명체** | Finch, (Not Boring) Habits 류 | 실제 아기를 돌보는 사람에게 돌봄 대상 추가. |
| **이름과 위치가 어긋난 도움 버튼** | Headspace "SOS" — 탐색 → 명상 → 스크롤 아래, 내용은 3분 명상([Headspace 도움말](https://help.headspace.com/hc/en-us/articles/360011671953-Where-are-SOS-sessions)) | "SOS"는 위기 연결을 기대하게 만든다. 위기 연결은 별도 페이지. BeInside에서 "긴급"·"SOS" 라벨은 **109·119 연결에만** 쓴다. |
| **대비 없는 "은은함"** | 흐린 회색 본문, 연한 주황 버튼 흰 글자 | 수면 부족·어두운 방·한 손 사용에서 읽히지 않는다. 현재 BeInside `--accent-primary #D4795E` 위 흰 글자 3.14:1, 바탕 위 주황 글자 2.77:1. |
| **자동 AI 대화·위기 감지** | Woebot 종료, Wysa 자체 수치 | 검수자 없는 1인 운영에서 책임질 수 없다. |
| **숫자·점수 결과** | 활동 점수, 감정 통계 | 임상 검수 없는 선별 도구가 된다. 비교·불안을 부른다. |
| **이해 안 되는 빠른 나가기 라벨** | "Quick Exit" 시제품 테스트 5명 모두 이해 못함(검색 요약) | 안전 기능이 있어도 쓰지 못한다. |
| **무거운 모션·WebGL 중심 웹** | Awwwards 수상 웰니스 사이트 다수([Awwwards 검색](https://www.awwwards.com/inspiration_search/mental%20health/)) — 개별 사이트 성능은 확인 필요 | 느린 로딩은 위기 연결을 늦춘다(Crisis Text Line은 속도 개선을 성과로 꼽음). 참고는 색·여백만. |

---

## 5. BeInside 적용 제안

우선순위 순. 모두 기능 추가가 아니라 기존 화면의 **디자인·문구 조정**이며, 방향 계획의 "4. 접근성·디자인 부채" 단계에 넣을 수 있다. 구현 시 `beinside-designing` 스킬과 `npm test`(safety 테스트)를 거친다.

### 제안 1. 대비는 올리고 채도는 내린다 (색 토큰)
- 문제: 현재 토큰(css/dark.css에 정의된 라이트 값 기준) — 강조색 `#D4795E`/바탕 `#F5F0EB` 2.77:1, 흰 글자/강조색 3.14:1, `--text-secondary #8A7A6A` 3.66:1, `--text-muted #B0A090` 2.24:1. 다크의 `--text-muted #5A5448`/`#161B19` 2.32:1.
- 제안:
  - **면(배경·카드·섹션)**: 지금처럼 크림·살구 저채도 유지 — "은은함"은 여기서 낸다.
  - **글자·버튼**: 강조 글자와 버튼 바탕용으로 더 진한 테라코타 토큰을 하나 둔다(바탕 대비 4.5:1 이상 목표. 값은 디자인 작업에서 대비 검사로 확정).
  - `--text-muted`는 본문·안내 문구에 쓰지 않는다(장식용 한정).
  - 위기 버튼(109·119)은 `--semantic-danger-strong` 계열로, 번호를 버튼 안에서 가장 굵고 크게(988 원리).
- 근거: 카드 5, 14, 16.

### 제안 2. 위기 연결을 3단계 카드로 (문구·구조)
- 모든 화면 상단 위기 바는 유지(109 전화·문자 / 119).
- 결과·가이드 화면의 연결 영역은 NHS care cards 원리로 3단계:
  1. **이야기해 보고 싶을 때** — 1577-0199(정신건강복지센터) · 지역 보건소 — "평일 낮, 지역 센터로 연결"류의 한 줄(운영시간 문구는 사실 확인 후).
  2. **지금 너무 힘들 때** — 109 전화 / 문자 — "24시간, 상담사가 받아요."
  3. **지금 위험할 때** — 119 (산후정신병 의심 포함) / 112.
- 단계는 색 + 제목 글자 + 스크린리더용 숨은 텍스트로 구분.
- 1366(여성긴급)은 CLAUDE.md 위기층 목록대로 유지.
- 근거: 카드 16, 18, 15.

### 제안 3. "새벽 모드" (시스템 다크와 별개의 조정)
- 시스템 다크 설정은 자동 적용 + 수동 전환(988 원리)을 유지·점검.
- 추가로 밤 시간대(예: 22~06시, 기기 시각 기준)에만: 배경을 더 어둡고 **따뜻한 먹색**으로(현재 초록빛 `#161B19`보다 붉은 기가 조금 있는 쪽 — 값은 대비 검사로), 본문 글자 한 단계 크게, 장식 일러스트 숨김, 첫 화면에 "새벽에 할 수 있는 것 3가지"를 먼저.
- 저장은 기기 안에서만, 끄는 스위치 제공.
- 근거: 카드 13, 8, 14. 주의: 새 기능으로 볼 여지가 있으므로 운영자 승인 후 진행.

### 제안 4. 문구 규칙 보강 (해석을 주고, 다그치지 않는다)
- 숫자·점수 대신 해석: "N주째" 3줄 요약은 "이 시기에 많이 겪는 일 / 해볼 수 있는 것 / 연락할 신호" 구조 유지.
- 비교는 과거의 나와만. "다른 엄마들은" 같은 비교 문구 금지.
- 빠진 날을 언급하지 않는다. "오랜만이에요", "기록이 끊겼어요" 류 금지.
- 문장 길이: 한 문장 40자 안팎, 문단 3문장 이하(NHS 규칙의 한국어 적용 — 제안값).
- 빠른 나가기 라벨은 결과가 보이는 말로 바꾸는 안을 2~3개 만들어 가벼운 사용자 확인(5명 내외) 후 결정.
- 근거: 카드 1, 3, 16, 17. `beinside-writing` 스킬 기준과 충돌 없음.

### 제안 5. 일러스트는 "한 스타일, 적게"
- 손그림 선 질감의 작은 상징 1~2종(예: 창가의 빛, 머그잔, 둥근 도형). 사람·엄마·아기 얼굴은 그리지 않는다 — 누구든 자기로 읽을 수 있게(Gentler Streak Yorhart 원리), 아빠·조부모 주양육자 배제 방지(Clue 원리).
- 감정 상태는 도형의 곡률로(둥글수록 편안, How We Feel 원리). 색만으로 구분하지 않는다.
- 위기 연결 영역에는 일러스트를 두지 않는다 — 사실 정보만(Headspace의 "감정=그림, 서비스=사실" 분리).
- 1인 운영 기준: SVG 인라인, 3~5개 이내. 모션은 opacity 전환 정도, `prefers-reduced-motion` 시 제거.
- 근거: 카드 1, 2, 3, 5, 11.

### 제안 6. 사생활 안내 한 줄 (사실대로)
- 첫 화면 하단 또는 기록 영역 옆: "입력한 날짜와 기분은 이 휴대폰에만 저장돼요. 휴대폰의 방문 기록과 통화 기록은 남아요. [지우는 방법]"
- 거짓 안심 문구 금지 규칙(CLAUDE.md) 준수. `beinside-compliance` 검토 대상.
- 근거: 카드 10, 12, 17.

---

## 6. 확인 필요 목록

- Red Dot(Brands & Communication — Interface/UI), iF(UI/UX, Service Design)의 산후·육아·마음 돌봄 인터페이스 수상작: 검색으로 찾지 못함. 두 곳의 수상작 DB를 직접 검색해야 한다.
- Webby 2024~2026 Health, Wellness & Fitness(앱) 부문 수상 목록: 원문 사이트 접근 불가. 2024 BetterMe: Mental Health 페이지와 2026 Flourish(People's Voice, AI for Health & Wellness)가 검색됐으나 세부 미확인.
- Google Play Best of: 2024 "Best for Personal Growth"·"Best Everyday Essential", 2025 Best Overall(Focus Friend) 등은 확인했으나 산후·마음 돌봄 관련 수상작은 찾지 못함 — [Google 블로그 2025](https://blog.google/products-and-platforms/platforms/google-play/best-apps-games-2025/).
- Material Design Awards: 웰빙 관련 과거 수상(Reflectly, Fabulous 2016, Simple Habit 2018) 검색 요약만 확인 — 연도·부문 원문 확인 필요([Google Design 태그](https://design.google/tags/awards)).
- Calm, Stoic, Bearable, Natural Cycles, Peanut, Kinedu, Sanvello, Talkspace: 검색에서 디자인 원리를 뒷받침할 1차 자료를 충분히 얻지 못해 카드에서 뺐다. Calm의 파랑·보라 그라데이션은 2차 요약뿐이다.
- 988 사례의 "활성 사용자 600만+", Crisis Text Line의 "+150건/일", Flo 익명 모드의 TIME 등급: 원문 재확인 필요.
- 한국 109의 문자 상담 제공 여부·방식: BeInside `js/helplines.js`에 문자 버튼이 이미 있다고 방향 계획에 적혀 있다. 공식 안내로 다시 확인할 것.

---

## 7. 출처 목록 (확인일 2026-09-25)

원문 직접 열람: ●  / 검색 결과 요약으로 확인: ○

**수상**
- ● Apple Design Awards 2022 — https://developer.apple.com/design/awards/2022/
- ● Apple Design Awards 2023 — https://developer.apple.com/design/awards/2023/
- ● Apple Design Awards 2024 — https://developer.apple.com/design/awards/2024/
- ● Apple Design Awards 2025 — https://developer.apple.com/design/awards/2025/
- ● Apple Design Awards 2026 — https://developer.apple.com/design/awards/
- ● Behind the Design: Gentler Streak — https://developer.apple.com/news/?id=3m0ht22s
- ● Behind the Design: Bears Gratitude — https://developer.apple.com/news/?id=i74v3f4r
- ● Tiimo SwiftUI 기사 — https://developer.apple.com/articles/tiimo
- ○ 2022 App Store Awards (How We Feel) — https://www.engadget.com/apple-2022-app-store-awards-094422535.html , https://apps.apple.com/us/iphone/story/id1647059928
- ○ 2025 App Store Awards (Tiimo) — https://www.macrumors.com/2025/12/04/apple-announces-2025-app-store-award-winners/ , https://daringfireball.net/2025/12/2025_app_store_award_winners
- ○ Webby 2023 How We Feel — https://winners.webbyawards.com/2023/apps-dapps-and-software/app-features/best-user-experience/243330/how-we-feel
- ○ Google Play Best of 2025 — https://blog.google/products-and-platforms/platforms/google-play/best-apps-games-2025/
- ○ Material Design Awards — https://design.google/tags/awards
- ○ Flo, TIME Best Inventions 2023 — https://flo.health/newsroom/time-best-inventions-2023

**서비스·디자인 자료**
- ○ Yale Medicine, How We Feel — https://medicine.yale.edu/news-article/the-how-we-feel-app-helping-emotions-work-for-us-not-against-us/
- ○ Gentler Streak 디자인 분석 — https://pixso.net/articles/gentler/
- ○ Headspace 리브랜드 — https://italic-studio.com/projects/headspace-rebrand/ , https://www.underconsideration.com/brandnew/archives/new_identity_for_headspace_done_in_house_with_italic_studio.php , https://designcompass.org/en/2024/04/30/headspace/
- ○ Headspace SOS 위치 — https://help.headspace.com/hc/en-us/articles/360011671953-Where-are-SOS-sessions
- ○ Finch — https://slate.com/technology/2026/09/finch-app-self-care-wellness-review.html , https://finchcare.com/about-finch
- ○ Daylio — https://daylio.net/
- ○ Wysa — https://www.wysa.com/role-of-ai-in-sos , https://www.businesswire.com/news/home/20240415230248/en/AI-Detects-82-of-Mental-Health-App-Users-in-Crisis-Finds-Wysa , https://bestforyou.org.uk/apps/wysa/
- ○ Woebot 종료 — https://www.mobihealthnews.com/news/woebot-health-shutting-down-its-app , https://www.statnews.com/2025/07/02/woebot-therapy-chatbot-shuts-down-founder-says-ai-moving-faster-than-regulators/
- ○ Clue — https://www.creativereview.co.uk/design-clue-inclusive-period-tracking-app/ , https://www.refinery29.com/en-us/2014/02/63517/feminine-app-designs
- ○ Flo 디자인 시스템 — https://medium.com/flo-health/flo-design-system-part-1-1eb8b731a48c
- ○ Baby Daybook — https://play.google.com/store/apps/details?id=com.drillyapps.babydaybook&hl=en_US
- ○ Huckleberry — https://apps.apple.com/us/app/huckleberry-baby-tracker/id1169136078

**위기 연결·공공**
- ○ 988 웹 사례 — https://madebywe.org/case-studies/988
- ○ 988 브랜드 기준 — https://www.samhsa.gov/sites/default/files/988-branding-standards.pdf
- ○ Crisis Text Line 개편 사례 — https://www.wideeye.co/case-study/crisis-text-line
- ○ NHS How we write — https://service-manual.nhs.uk/content/how-we-write
- ○ NHS care cards — https://service-manual.nhs.uk/design-system/patterns/help-users-decide-when-and-where-to-get-care
- ○ NHS 긴급 정신건강 — https://www.nhs.uk/nhs-services/mental-health-services/where-to-get-urgent-help-for-mental-health/
- ○ NHS 111 정신건강 옵션 — https://www.england.nhs.uk/2024/08/nhs-111-offering-crisis-mental-health-support-for-the-first-time/
- ○ GOV.UK Exit this page — https://design-system.service.gov.uk/components/exit-this-page/ , https://designnotes.blog.gov.uk/2023/08/14/exit-this-page-fast-with-the-design-systems-new-component/ , https://beeps.website/blog/2024-10-09-why-govuk-exit-this-page-doesnt-use-escape/
- ○ 빠른 나가기 라벨 연구 — https://medium.com/the-trauma-informed-design-blog/a-deep-dive-in-the-exit-this-page-button-39f991553930
- ○ PSI HelpLine — https://postpartum.net/get-help/psi-helpline/
- ○ MGH 여성정신건강센터 — https://womensmentalhealth.org/posts/emergency-resources-for-individuals-with-perinatal-mental-health-issues/

**반대 사례**
- ○ Duolingo 알림 비판 — https://debugger.medium.com/duolingo-needs-to-chill-8f1832745ca0
- ○ 스트릭 불안 — https://gamifiedlives.com/blog/streak-anxiety
- ○ Awwwards 정신건강 검색 — https://www.awwwards.com/inspiration_search/mental%20health/

**BeInside 내부**
- 대비 수치: 현재 토큰(`css/dark.css`)으로 WCAG 상대휘도 공식 계산(2026-09-25).
