# BeInside 프로젝트 파일 구조

## 루트
```
beinside/
├── index.html          # Single-page app 셸. 모든 페이지 섹션을 <section>으로 포함
├── css/
│   └── styles.css      # 모든 스타일, CSS 변수, 반응형 규칙
├── js/
│   ├── data.js         # 데이터 상수 (MENTAL, ALONE_DATA, DAD_DATA, SP_DATA 등)
│   ├── render.js       # 콘텐츠 렌더링 함수 (getMentalHTML, getAloneHTML, buildTOC 등)
│   ├── app.js          # 메인 로직, 페이지 네비게이션 (showPage, switchView 등)
│   ├── features.js     # 인터랙티브 기능 (아코디언, 체크 도구 등)
│   ├── memo.js         # 메모/노트 기능
│   ├── profiles.js     # 프로필 관리
│   ├── storage.js      # localStorage 래퍼
│   ├── utils.js        # 유틸리티 함수
│   ├── self-pages.js   # 자기돌봄 페이지 (번아웃, 관계, 전환기 등)
│   ├── share.js        # 공유 기능 (카카오톡, 링크 복사)
│   ├── onboard.js      # 온보딩 플로우
│   ├── emotion-page.js # 감정 가이드 페이지
│   └── elder-care.js   # 노인 돌봄 가이드
└── .claude/
    └── skills/         # Claude Code 스킬 정의
```

## 각 파일의 역할

### index.html
- 싱글 페이지 앱의 셸 역할
- 모든 페이지가 `<section id="page-{name}">` 형태로 존재
- `showPage(name)`으로 섹션 전환
- 페이지 목록: home, growth, sp, birth, mental, teen, emergency, emotion, burnout, relation, transition, workplace, dad, elder, journal

### css/styles.css
- CSS 변수 정의 (피치/살구 톤 테마)
- 반응형 브레이크포인트
- 아코디언, 카드, 체크 도구 등 컴포넌트 스타일
- body::after 그레인 텍스처 (640px 이하에서 display:none)

### js/data.js
- 모든 콘텐츠 데이터 상수 정의
- MENTAL, ALONE_DATA, DAD_DATA, SP_DATA, BURNOUT_DATA, RELATIONSHIP_DATA, TRANSITION_DATA, EMOTION_DATA
- TAG_MAP, EMOJIS 등 매핑 데이터
- getData(months) 함수: 월령별 성장 데이터 반환

### js/render.js
- 데이터를 HTML로 변환하는 렌더링 함수
- getMentalHTML(), getAloneHTML(), buildTOC() 등
- 각 페이지 섹션의 콘텐츠를 동적으로 생성

### js/app.js
- 앱 초기화 및 페이지 네비게이션
- showPage(name): 페이지 전환 메인 함수
- switchView(): 뷰 모드 전환
- 이벤트 리스너 바인딩

### js/features.js
- 아코디언 토글 (toggleAccordion)
- 체크리스트 도구
- 인터랙티브 UI 컴포넌트

### js/memo.js
- 메모 CRUD 기능
- localStorage 키: beinside_memos_v1

### js/profiles.js
- 프로필 생성/전환/삭제
- localStorage 키: beinside_profiles_v2, beinside_active_v2

### js/storage.js
- localStorage 읽기/쓰기 래퍼
- 90일 보존 정책 관리
- beinside_ 접두사 키 관리

### js/utils.js
- 범용 유틸리티 함수
- 날짜 계산, 포맷팅 등

### js/self-pages.js
- 번아웃(burnout), 관계(relation), 전환기(transition) 페이지
- initBurnoutPage(), initRelationPage() 등

### js/share.js
- 카카오톡 공유
- 링크 복사

### js/onboard.js
- 첫 방문 온보딩 플로우

### js/emotion-page.js
- 감정 가이드 페이지 렌더링 및 인터랙션

### js/elder-care.js
- 노인 돌봄 가이드 (치매, 간병, 번아웃, 학대예방, 복지연결)
- 아코디언 기반 상황별 가이드

## 로딩 순서
index.html 하단에서 다음 순서로 로드:
1. data.js (데이터 먼저)
2. render.js
3. storage.js, utils.js
4. profiles.js, memo.js
5. features.js, self-pages.js, emotion-page.js, elder-care.js
6. share.js, onboard.js
7. app.js (마지막에 초기화)
