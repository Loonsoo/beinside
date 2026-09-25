# BeInside 코드 감사 보고서 (개발자 관점)

- 대상: `/home/user/beinside` (커밋 `404c24f`), `index.html`(790줄) + `css/styles.css`(2,965줄, 103KB) + `js/*.js` 10개(총 3,452줄)
- 방법: 모든 JS 파일과 index.html을 직접 전부 읽음. 추가로 `node --check`, Playwright(Chromium headless)로 실제 페이지를 로드해 런타임 검증함. 코드는 수정하지 않음.
- 표기: "검증됨" = 브라우저에서 재현함. "추정" = 코드만 읽고 내린 판단.

---

## 1. 요약

- **스크립트가 깨지는 문제는 없음.** 10개 파일 모두 문법 검사를 통과했고, 로드 순서대로 실행해도 `ReferenceError`/`SyntaxError`/pageerror가 0건. 최상위 전역 150개 중 이름이 겹치는 `const`/`let`/`function`도 없음. `MOOD_KEY`는 features.js에만 전역으로 있고, app.js의 `MOOD_KEY`는 `selectMood()` 안의 지역 변수라서 가려질 뿐 충돌은 없음. 렌더링된 모든 화면(12개 페이지와 상세 화면)의 `onclick` 148곳을 전부 대조했고, 정의되지 않은 함수는 0개임.
- **가장 위험한 것은 안전 로직 버그 2개임.**
  1. 산후우울 체커에서 "나 자신이나 아기를 해치고 싶다 — 자주 있었다"만 고르면 결과가 **"🌸 비교적 안정적인 상태예요"**로 나옴.
  2. 상황 판단 도구에서 "나를 해치고 싶다"를 체크해 긴급 안내가 떠도, 다른 항목을 하나 더 체크하면 **긴급 안내가 일반 결과로 덮어써짐**.
- **개인정보:** 저널·감정 기록이 암호화 없이 localStorage에 남음. 저널은 **삭제 기능도 없음.** 화면의 "아무에게도 보이지 않아요", "기록에 남지 않아요"라는 문구는 실제 동작과 맞지 않음.
- **구조:** 급하게 덧붙인 흔적이 많음. 숨겨진 `input#ai`, 호출되지 않는 함수 6개와 사용하지 않는 데이터 `TL`, 도달할 수 없는 페이지 `page-mental`, 데스크톱에서 들어갈 방법이 없는 "기록" 페이지, 한 클래스명을 두 컴포넌트가 나눠 쓰는 CSS 충돌(`.emotion-grid`, `.stat-badge`), 사용하지 않는 CSS 클래스 약 57개, 변수명과 실제 값이 어긋난 테마 변수(`--peach`=파랑, `--amber`/`--lavender`=초록 등).

---

## 2. 검증 실행 기록

```bash
# 1) 문법 검사
$ for f in js/*.js; do node --check $f && echo "OK $f"; done
OK js/app.js … OK js/utils.js          # 10개 모두 통과

# 2) 중복 전역 선언 검사
$ grep -hE "^(const|let|var) " js/*.js | awk '{print $2}' | sort | uniq -d   # 출력 없음
$ grep -hE "^function " js/*.js | ... | uniq -d                               # 출력 없음
# 파일별 최상위 선언 수: app 35 / data 12 / emotion-page 4 / features 23 / memo 5 / profiles 27 / render 21 / self-pages 9 / storage 8 / utils 6 = 150

# 3) Playwright(Chromium) 런타임 감사 (scratchpad/audit.js, audit2.js)
- 초기 로드: pageerror 0건. 콘솔 에러는 Google Fonts 인증서 오류 1건뿐(샌드박스 네트워크 때문)
- showPage() 12개 페이지 순회 + 상세 화면: 매 단계 "정의 안 된 onclick 함수" = []
- switchView('mind') → 보이는 섹션 [] (hero 포함 전부 숨겨져 빈 화면)
- 긴급 항목 체크 후 → "지금 당장 이야기를 들어줄 사람이 있어요. 📞 1393…"
  다른 항목 추가 체크 후 → "전문 상담을 받아보는 것을 권해요…"   (긴급 안내 사라짐)
- ppdAnswer(0..3 = 0, 4 = 3) → class "ppd-result res-ok", "🌸 지금은 비교적 안정적인 상태예요."
- 프로필 이름/저널 본문에 <img onerror> 넣기 → XSS 발동 안 함 (esc 적용 확인)
- profiles[i].avatarImg = 'x" onerror="window.__xss3=1' → __xss3 === 1 (속성 탈출 XSS 발동)
- 저널에서 오늘 메모 저장 → 홈에서 같은 기분 재선택 → memo:"" (메모 소실)
- timezone Asia/Seoul, 07:30 KST: mood date "2026-09-24", 메모 기본 날짜 "2026-09-24", 생년월일 max "2026-09-24"
- 프로필 1개 + 마지막 삭제 → 헤더 아바타 🦊 그대로, 텍스트만 "프로필 추가"
- active_v2 = -1 + 프로필 1개 → 패널에서 같은 프로필이 활성/목록에 중복 표시. 편집 후 저장하면 localStorage 변경 없음(수정 소실)
- 카드 내부 .stat-badge 계산된 margin: "0px 48px 20px"
- 청소년 .emotion-grid 열: 데스크톱 "617px 617px"(2열, 4열 의도), 모바일 "354px"(1열)
- Escape 키 → 프로필 바텀시트 열린 채 유지
- .mobile-tabbar 데스크톱 display: none → '기록' 진입점 없음
```

---

## 3. 버그 목록

| ID | 파일:줄 | 증상 | 재현/근거 | 심각도 | 수정 제안 |
|---|---|---|---|---|---|
| B01 | app.js:106-136, index.html:432-439 | 산후우울 체커 5번 문항(자해·영아 위해 사고)을 단순 합산만 함. 이 문항 하나만 "자주 있었다"(3점)여도 총점 3점 → **"비교적 안정적"**. 5번 문항만 선택지 문구와 점수 매핑이 다름("거의 없었다"가 다른 문항에선 0점, 여기선 1점) | **검증됨** | **치명** | EPDS 10번 문항처럼 5번이 1점 이상이면 총점과 상관없이 위기 화면(1393/119)으로 가도록 우선 분기. 선택지와 점수 매핑 통일 |
| B02 | features.js:47-68, 77-96 | 긴급 항목(`emergencyIndex`)을 체크하면 긴급 안내가 뜨지만, 다른 항목을 추가로 체크하거나 해제하면 `updateCheckResult`가 결과를 덮어써 **긴급 안내가 사라짐** | **검증됨**(ct_sad) | **치명** | 결과를 계산할 때마다 `checked.has(emergencyIndex)`를 먼저 확인해 긴급 상태를 유지. 긴급 결과는 결과 계산 함수 안에서 처리 |
| B03 | features.js:190-196, 241-289 | 저널에 **삭제·수정·전체삭제 기능이 없음.** 보존 기한도 없고, 목록은 30개만 보이지만 저장은 무한히 누적됨 | 코드상 `deleteJournal` 없음 | **높음** | 항목별 삭제, "내 기록 모두 지우기", 보존 기한 옵션 추가 |
| B04 | index.html:771, styles.css(`.mobile-tabbar` 데스크톱 display:none) | "기록(저널/감정)" 페이지 진입점이 모바일 탭바에만 있음 → **데스크톱에서는 들어갈 방법이 없음** | **검증됨**(1280px에서 탭바 none, 다른 `showPage('journal')` 호출 없음) | **높음** | 헤더나 홈에 진입점 추가, 또는 데스크톱 내비게이션 추가 |
| B05 | index.html:106-195, 317-329, 20, 26 / profiles.js:98, 171 / features.js:275 | 홈의 핵심 내비게이션(`div.sit-card` 10개), 나이 pill 13개, 프로필 칩, 로고, 저널·프로필 목록 항목이 `div onclick`이라 **키보드로 접근할 수 없음**(tabindex·role 없음) | 코드 확인 | **높음** | `<button>`/`<a>`로 교체하거나 role="button" + tabindex + 키 핸들러 추가 |
| B06 | features.js:120,139-140,165,179,247 / app.js:330 / memo.js:51 / profiles.js:227 | 날짜를 `toISOString()`(UTC)으로 만듦 → KST 00:00~08:59에는 **전날 날짜**로 저장됨. 오늘 태어난 아기는 생년월일을 입력할 수 없음(max가 어제) | **검증됨**(07:30 KST에 전부 09-24) | 중간 | 로컬 날짜 헬퍼(`toLocaleDateString('sv')` 등) 하나로 통일 |
| B07 | app.js:327-343, features.js:163-168 | 같은 날 기분을 다시 선택하면 그날 적은 **한 줄 메모가 빈 값으로 덮어써짐**. 저장 로직이 app.js와 features.js에 중복돼 있고, app.js 쪽은 `JSON.parse`에 try/catch가 없어 저장 데이터가 손상되면 예외 발생 | **검증됨** | 중간 | 저장 로직을 `saveMoodEntry` 하나로 합치고 기존 memo 보존 |
| B08 | profiles.js:11-20 | 마지막 프로필을 지워도 헤더 아바타(사진·이모지)가 **그대로 남음.** 첫 렌더에서 `#hdr-avatar` innerHTML을 교체해 `#hdr-avatar-em`이 사라졌기 때문 | **검증됨** | 중간(공용 기기에서 지운 사진이 계속 보임) | 빈 상태일 때 `avEl.innerHTML`을 기본 이모지로 재설정 |
| B09 | storage.js:39-42, profiles.js:72,89,133-139,296-300 | `activeIdx`가 -1(또는 NaN)인데 프로필이 있으면 패널이 `profiles[0]`로 대체 표시하고 목록에도 중복으로 나옴. "편집"으로 `openEditModal(-1)` → 저장 시 `profiles[-1]=…`이 되어 **JSON에 저장되지 않고 수정이 사라짐** | **검증됨** | 중간 | 로드할 때 activeIdx를 정규화(NaN이거나 <0이면 0). editingIdx 검증 |
| B10 | profiles.js:270-302, storage.js:50-60 | 아바타를 리사이즈 없이 base64로 저장함(2MB 파일 → 약 2.7MB). 사진 2장이면 localStorage 한도(약 5MB)를 넘김. 한도를 넘으면 alert만 뜨고 **메모리의 profiles에는 이미 반영돼 UI와 저장 상태가 달라짐**(새로고침하면 사라짐) | 코드 확인(추정: 한도는 브라우저마다 다름) | 중간 | canvas로 128px 정도로 축소해 JPEG로 저장. 저장 실패 시 롤백 |
| B11 | styles.css:2093 vs 2621 / 2232 vs 2929 | `.emotion-grid`를 청소년 감정 선택기(4열 의도)와 감정·관계·전환기 카드 목록(2열)이 같이 씀 → 나중에 선언된 규칙이 이겨 청소년 버튼이 데스크톱 2열, **모바일 1열 6줄**로 나옴 | **검증됨** | 중간 | 클래스 분리(`.teen-emo-grid` / `.guide-choice-grid`) |
| B12 | styles.css:931 vs 2371, 2404 | `.stat-badge` 정의가 두 개(카드 내부용, 페이지용). 뒤에 선언된 페이지용 규칙의 `margin:0 48px 20px`와 배경·패딩이 **성장 가이드·마음 돌봄 카드 안의 배지에도 적용됨** | **검증됨**(카드 안 margin 48px) | 중간 | 클래스 분리 또는 `.step-section > .stat-badge`처럼 범위 한정 |
| B13 | memo.js:94-104 → app.js:168-191 | 메모를 저장·삭제할 때마다 `go()`로 결과 전체를 다시 렌더 → 열어둔 아코디언이 모두 닫히고(첫 섹션만 열림) 결과 상단으로 스크롤됨. 방금 쓴 메모가 안 보임 | 코드 확인 | 중간(UX) | 메모 목록만 부분 갱신 |
| B14 | index.html:315, app.js:58-75, 204-212 | `<input type="hidden" id="ai">`는 임시방편임. 나이 입력 UI(`#bm`,`#by`,`#au`,`#hint`,`#age-finder-body`)가 삭제됐는데 `setM`/`toggleAgeFinder`가 여전히 이를 참조함(null 가드로 조용히 무시). 사용자가 임의 나이(예: 9개월, 15세)를 **입력할 방법이 없고** pill 13개와 프로필만 가능함 | 코드 확인 | 중간 | 나이 입력 UI를 복원하거나 상태 변수(`currentMonths`)로 바꾸고 DOM 의존 제거 |
| B15 | index.html:456-464, app.js:30,249-279 | `page-mental`(마음 돌봄 9개 연령 탭)은 어디서도 `showPage('mental')`을 부르지 않아 **도달 불가**. 모바일 탭 "마음"은 `emotion`으로 감 | grep 확인 | 낮음~중간 | 진입점을 추가하거나 페이지 제거 |
| B16 | app.js:50-53 | `switchView('mind')`가 `'mind'` → ALL_PAGES에 없는 id → hero까지 숨겨져 **빈 화면**. 현재 호출하는 곳은 없음(죽은 코드) | **검증됨** | 낮음 | 삭제 |
| B17 | app.js:319-324 | Escape 키가 프로필 바텀시트를 닫지 않음. 모달·드로어에 포커스 트랩과 포커스 복귀가 없음 | **검증됨** | 낮음~중간(a11y) | `closeProfPanel()` 추가, dialog 포커스 관리 |
| B18 | app.js:392-396, emotion-page.js:260, self-pages.js:64,97 | `.action-item`이 role="checkbox" tabindex=0인데 키 핸들러가 없고 `aria-checked`도 갱신되지 않음. `.accordion-header`도 tabindex=0인데 Enter/Space가 동작하지 않음 | 코드 확인 | 낮음~중간 | 키 핸들러와 aria 상태 갱신 추가(`renderCheckTool`은 올바르게 구현돼 있음 — 같은 방식 적용) |
| B19 | app.js:399-418 | `toggleAccordion`: `.accordion-group` 밖에 있는 항목은 한 번 열리면 **다시 닫히지 않음**(현재 모든 사용처가 group 안이라 잠재적 버그) | 코드 확인 | 낮음 | isOpen일 때 자기 자신을 닫는 분기 추가 |
| B20 | render.js:569 | `renderDadGuide`가 `.guide-tab[data-dad]`를 찾지만 해당 요소가 없음(연령 탭 UI가 삭제된 흔적) | grep 확인 | 낮음 | 삭제 |
| B21 | render.js:655-659 | `renderTeenPage`가 `dangerHTML`(위험한 어른 구별법)을 만들어 놓고 **출력하지 않음** | 코드 확인 | 낮음(콘텐츠 누락이면 중간) | 출력할지 결정 |
| B22 | render.js:679 | `curBirthStage` 선언 없이 대입(암묵적 전역). strict 모드로 바꾸면 ReferenceError | 코드 확인 | 낮음 | `let` 선언 |
| B23 | app.js:311-315 | 스크롤 높이 = 뷰포트면 `0/0 = NaN` → `width:'NaN%'`는 무시되고 이전 폭이 남음 | 추정 | 낮음 | 분모 0 가드 |
| B24 | app.js:194-202 | `qs()` 안에서 `go()`가 이미 80ms 뒤 스크롤하는데 같은 스크롤을 한 번 더 예약함 | 코드 확인 | 낮음 | 중복 제거 |
| B25 | app.js:98,153,347 | 상태 표시를 `[onclick*="${key}"]` 속성 부분일치로 찾음. onclick 문구가 바뀌거나 key가 다른 핸들러 문자열에 포함되면 잘못 매칭됨 | 코드 확인 | 낮음 | data-key 속성 사용 |
| B26 | render.js:616-624 | 핫라인 라벨이 맞지 않음. 1393(자살예방상담전화)을 "산후우울 상담", "정신건강 위기상담"으로, 1577-0199를 "정신건강복지센터"로 표기(다른 화면과 불일치) | 코드 확인 | 중간(안전 정보 정확성) | 핫라인 상수를 한곳에서 관리(`HOTLINES`) |
| B27 | profiles.js:17-20,72 | 프로필이 0개일 때 패널의 "편집" 버튼이 없어 문제는 없지만, activeIdx 정규화를 함수마다 따로 방어함 | 코드 확인 | 낮음 | B09와 함께 해결 |

> 참고: **"이벤트가 두 번 붙는 경우"는 발견되지 않음.** `initMentalPage`와 `initEmergencyFirstAid`는 `dataset.init`으로 막혀 있고, 나머지 리스너는 매번 새로 만든 요소에 붙음. **display/class 토글 혼용**은 `#result`(CSS `.on` 클래스 + `switchGuideTab`의 `style.display`)와 `#emo-result`(`style.display` + `.on`)에 있음. 현재는 우연히 맞물려 동작하지만 유지보수 때 깨지기 쉬움.

---

## 4. 보안·개인정보

### 4.1 innerHTML XSS 전수 조사 결과
| 입력원 | 위치 | esc 적용 | 판정 |
|---|---|---|---|
| 프로필 이름 | profiles.js:25,79,101,174 | O | 안전(**검증됨**) |
| 프로필 이름(confirm) | profiles.js:122,196 | 해당 없음(텍스트 대화상자) | 안전 |
| 아바타 이모지 | utils.js:95, profiles.js:246 | O | 안전 |
| **아바타 이미지 `avatarImg`** | **utils.js:93, profiles.js:244** | **X — `src="${p.avatarImg}"` 속성에 그대로 보간** | FileReader 결과만 들어가면 안전하지만, localStorage 값이 조작되면(공용 PC, 브라우저 확장, 향후 가져오기/동기화 기능) 속성을 탈출해 XSS 발생 — **검증됨**. 중간 |
| 메모 본문·날짜·태그 | memo.js:18-27 | O | 안전(**검증됨**) |
| 메모 id가 들어간 인라인 onclick | memo.js:20,24 | `esc()` 사용 | **잘못된 패턴.** HTML 엔티티는 속성을 파싱할 때 디코딩되므로 `'`가 되살아남. 지금은 id가 `Date.now()`라 무해하지만 id를 외부에서 받게 되면 주입 가능 |
| 저널 본문·미리보기 | features.js:278,280 | O | 안전(**검증됨**) |
| 저널 날짜 `e.date` | features.js:276 | X | localStorage 조작 시에만 위험. 낮음 |
| 감정 메모 | features.js:131(textarea) | O | 안전 |
| 콘텐츠 데이터(data.js, *_DATA) | render.js 전반, self-pages.js 일부 | X(의도적으로 HTML 허용) | 현재는 신뢰할 수 있는 정적 데이터. 다만 **콘텐츠와 HTML이 한 문자열에 섞여 있어**, 향후 CMS나 외부 번역 파일을 붙이면 곧바로 XSS 경로가 됨. `aria-label="${v.label}"` 등도 esc 없음 |

- 인라인 onclick: HTML 106개 + JS 템플릿 42개 = **148개**. 인라인 스크립트(타이머와 age-pill IIFE)도 있어 **CSP(`script-src 'self'`)를 적용할 수 없음.** CSP 메타 태그도 없음.
- 외부 링크: 카카오 채널 1개(emotion-page.js:215)는 `rel="noopener"`만 있음 → `noreferrer`를 추가 권장. 이 URL이 실제 공식 채널인지는 **검증하지 못함(추정: 운영자 확인 필요)**. 위기 상황에서 쓰는 링크이므로 정기 점검 대상.
- 제3자 요청: Google Fonts(index.html:9)를 페이지를 열 때마다 호출함 → 방문 사실과 IP가 Google에 전달됨. "위기·자해" 서비스 특성상 폰트를 자체 호스팅할 것을 권장.

### 4.2 localStorage 민감정보
| 키 | 내용 | 보존 | 삭제 UI |
|---|---|---|---|
| `beinside_profiles_v2` | 이름, 생년월일, **얼굴 사진(base64)** | 무기한 | 있음 |
| `beinside_active_v2` | 활성 인덱스 | 무기한 | - |
| `beinside_memos_v1` | 자녀 성장 메모 | 무기한 | 있음(개별) |
| `beinside_mood_v1` | 날짜별 기분("많이 힘들어요") + 한 줄 메모 | 90일(저장할 때만 정리) | **없음** |
| `beinside_journal_v1` | 관계·감정·건강 서술(최대 500자) | **무기한** | **없음** |

- 전부 **평문**임. 같은 브라우저를 쓰는 가족이나 가해자가 "기록" 탭을 열면 그대로 읽을 수 있음. 가정폭력·이별·자해 맥락이라 실제 위협 모델에 해당함.
- **표시 문구와 실제 동작이 다름:**
  - features.js:218 "여기에 적은 것은 **아무에게도 보이지 않아요**" → 같은 기기 사용자에게는 보임.
  - features.js:223 "기기에만 저장돼요. 서버로 전송되지 않아요" → 사실임(유지 가능).
  - index.html:518-523 청소년 페이지 "**이 페이지는 기록에 남지 않아요 … 브라우저를 닫으면 흔적이 남지 않아요**" → 청소년 페이지 자체는 localStorage에 쓰지 않는 것이 맞음. 하지만 (1) 브라우저 방문 기록에 사이트가 남음(시크릿 모드 안내 없음), (2) 같은 사이트의 홈 기분 체크·저널은 영구 저장됨, (3) Google Fonts 요청이 나감, (4) **빠른 나가기(quick exit)/화면 가리기 기능이 없음.** 따라서 "흔적이 남지 않는다"는 문구는 과장임.
- 권장: 문구 수정("이 기기의 다른 사용자는 볼 수 있어요"), 선택형 PIN 잠금 + WebCrypto(AES-GCM, PBKDF2) 암호화, "모든 기록 지우기", 시크릿 모드 안내, 빠른 나가기 버튼(ESC 두 번 → 중립 사이트로 `location.replace`).

---

## 5. 구조·유지보수성

### 5.1 파일별 책임 (실제 동작 기준)
| 파일 | 선언된 책임 | 실제로 섞여 있는 것 |
|---|---|---|
| data.js (584줄) | 데이터 상수 | 저장 키 상수까지 포함. `TL`(14개 항목)은 **사용처 0** |
| utils.js | 공통 유틸 | `avatarHTML`(뷰) 포함 |
| storage.js | localStorage 래퍼 | 메모·프로필만 담당. **mood/journal 저장은 features.js·app.js에 따로 있음**(래퍼 우회, Quota 처리 없음) |
| memo.js | 메모 | 뷰(HTML 템플릿) + 저장 + `go()` 호출(앱 흐름에 결합) |
| profiles.js | 프로필 | 뷰, 모달, 바텀시트, 60초 타이머, 파일 업로드 |
| render.js (742줄) | 렌더링 | **발달 데이터 약 160줄이 `getData()` 안에 하드코딩**(data.js 원칙 위반), SP, 출산, 아빠, 청소년, 마음, TOC(죽은 코드), 출처 드로어 |
| features.js | 체크툴·감정·저널 | 저장 계층 + 뷰 + 전역 상태(`_selectedJournalTag`) |
| emotion-page.js / self-pages.js | 페이지 | 데이터와 렌더를 한 파일에(콘텐츠 약 70%) |
| app.js | 내비게이션 | 산후우울 체커, 청소년 감정 데이터(`EMO_DATA`), 기분 저장(중복), 아코디언, 초기화 부수효과(`renderSP(0)`, `initBirth()`) |

- **전역 최상위 선언 150개.** 모듈/네임스페이스가 없고 모든 함수가 `window`에 노출됨(인라인 onclick 때문에 필요한 구조). 전역 가변 상태는 `curSit, curPage, mode, memos, curMemoMonths, profiles, activeIdx, editingIdx, editType, editAvatarImg, editAvatarEm, _selectedJournalTag, curBirthStage(암묵)`.
- **데이터와 렌더링 결합도가 높음.** 콘텐츠 문자열 안에 HTML(`<strong>`)과 인라인 스타일이 섞여 있음. 인라인 `style=` 속성은 HTML 58개 + JS 102개. 이름이 비슷한 데이터가 흩어져 있음(`EMO_DATA`(app.js) / `EMOTION_GUIDE_DATA`(emotion-page.js) / `MENTAL` / `ALONE_DATA`). 전화번호 문자열이 약 40곳에 중복돼 있고 라벨도 서로 다름(B26).
- 아코디언 구현이 **2벌**(`toggleAcc` + `.acc-*` / `toggleAccordion` + `.accordion-*`). 기분 저장 구현도 2벌(B07). help-card 렌더 템플릿은 4곳에 복붙.
- **죽은 코드(JS):** `switchView`, `toS`, `toggleAgeFinder`, `toggleCheckItem`, `openModal`, `buildTOC`(+`scrollToCard`), `updateHeroBanner`(빈 함수, 3곳에서 호출), `TL`, `dangerHTML`, `.guide-tab[data-dad]` 루프, `setM`의 `bm/by/au/hint` 참조, 숨은 `#ai`의 `max` 설정. 사실상 도달 불가능한 페이지는 `page-mental`.

### 5.2 CSS
- 103KB, 2,965줄, 규칙 블록 약 828개, `@media` 15개, `!important` 10개, `backdrop-filter` 13곳(저사양 모바일에서 비용 큼).
- **사용하지 않는 클래스(추정):** CSS에 정의된 클래스 467개 중 HTML/JS 어디에도 나오지 않는 것이 64개. 동적 조합인 `tag-*` 7개를 빼면 **약 57개.** 주요 잔재:
  - 타임라인 사이드바: `tl-sidebar, tl-title, tl-track, tnode, tdot, tlbl` + `--tl-w` 변수와 이를 재정의하는 미디어쿼리 3곳
  - 이전 나이 입력 UI: `ninput, gobtn, mtoggle, age-finder*, view-toggle, view-btn, srow, slabel, sbox`
  - 이전 카드·긴급 UI: `alone-*`(6), `emer-*`(8), `mental-grid/item`, `verified-badge`, `data-source-bar`, `cbg-mint/rose/teal`, `bc-sky`
  - `hero-prof-banner`는 CSS와 HTML에서는 지워졌고 JS에 빈 함수 `updateHeroBanner`만 남음
- **같은 클래스명을 다른 컴포넌트가 씀:** `.emotion-grid`(B11), `.stat-badge`(B12). `.page-back`은 한 벌이지만 아빠 페이지에서 CTA 버튼으로 재사용하면서 인라인 스타일로 덮어씀(index.html:619).
- **테마를 여러 번 바꾼 잔재:** `--peach:#7BAECB`(파랑), `--peach-d`(다크 블루), `--amber:#6BA885`(초록), `--lavender:#6BA885`(초록), `--plum:#8A7A6A`(갈색), `--sage:var(--peach)`, `--primary`는 `--peach`와 같은 값의 별칭. 반면 JS와 인라인에는 `rgba(232,137,106,…)`(이전 피치 톤), `#A03050`, `#8A5AB4` 등 **하드코딩된 이전 팔레트**가 수십 곳 남아 테마와 섞임(render.js:77-86, 97-103, 603, 709, 736 / index.html:447-448 등).
- `prefers-reduced-motion` 대응이 없음. `:focus-visible` 스타일도 없음(포커스 링은 폼 입력에만 있음).

---

## 6. 성능·접근성 기술 이슈

- **60초 setInterval**(profiles.js:314): 매분 헤더 아바타 innerHTML을 다시 만듦(base64 이미지를 매번 새로 파싱). 탭이 백그라운드여도 계속 돎. → 자정까지 남은 시간으로 `setTimeout`을 걸거나 `visibilitychange` 시점에 갱신하는 방식을 권장. 비용 자체는 낮음.
- **전체 재렌더:** `go()`가 결과 전체(약 18KB HTML)를 다시 그림. 메모 저장·삭제 때도 마찬가지(B13). 감정·관계·전환·저널 페이지는 `showPage` 할 때마다 innerHTML을 다시 생성해 상태(체크, 열린 탭)가 초기화됨. `renderSP(curSit)`도 방문할 때마다 연령 탭을 초기화. 시작할 때 사용자가 보지 않는 SP와 출산 DOM까지 미리 생성(app.js:302-305).
- **폰트:** Noto Sans KR 6가지 굵기 + Gowun Batang 2가지 굵기를 렌더 차단 CSS로 로드. `fonts.gstatic.com` preconnect(crossorigin)가 없음. 한글 폰트라 요청이 수십 개로 쪼개짐(추정). → 굵기를 3개(400/600/700)로 줄이고, `preconnect` 보강 또는 자체 호스팅 + `font-display:swap`.
- **이미지 base64 저장:** B10 참조. localStorage는 동기 API라 큰 문자열을 읽고 쓸 때 메인 스레드를 막음. `loadProfiles`도 시작할 때 동기 파싱.
- **접근성:** B05(div onclick), B17(Esc·포커스), B18(가짜 checkbox), 모달에 `role="dialog"`/`aria-modal` 없음(#modal), 프로필 바텀시트는 role="dialog"만 있고 포커스 관리가 없음, 스크롤 진행바는 장식이지만 aria-hidden이 없음. 긍정적인 점: `renderCheckTool`은 role·aria-checked·키보드 처리가 올바름.

---

## 7. 우선순위 수정 로드맵

**P0 — 즉시 (안전)**
1. B01 산후우울 체커: 5번 문항이 1점 이상이면 무조건 위기 안내로 분기하고 점수 매핑 통일.
2. B02 체크툴: 긴급 항목이 체크돼 있는 동안에는 긴급 안내 유지.
3. B26 핫라인 라벨: `HOTLINES` 상수 하나로 통일하고 문구 검수.
4. 개인정보 문구 수정(저널 placeholder, 청소년 페이지 "흔적이 남지 않아요") — 코드 한 줄 수정으로 바로 해결됨.

**P1 — 1~2주 (신뢰·접근성)**
5. B03 저널 삭제와 "모든 기록 지우기". B08 헤더 아바타 잔존 수정.
6. B04 데스크톱 "기록" 진입점 추가. B15 `page-mental` 연결 또는 제거.
7. B05/B17/B18 키보드 접근성(div → button, Esc로 바텀시트 닫기, aria 갱신).
8. B06 로컬 날짜 헬퍼로 교체. B07 기분 저장 로직 통합. B09 activeIdx 정규화.
9. 빠른 나가기 버튼 + 선택형 PIN 잠금/암호화 설계.

**P2 — 1개월 (구조)**
10. 저장 계층 통합: `storage.js`에 `get/set(key)` + Quota 처리 + 스키마 버전을 두고, mood/journal도 이 래퍼 사용. B10 아바타 리사이즈와 실패 시 롤백.
11. 인라인 onclick 148개를 `data-action` + 이벤트 위임 하나로 교체 → CSP(`script-src 'self'`) 적용 가능.
12. `getData()`의 발달 데이터를 data.js로 이동. 콘텐츠의 HTML을 마크다운 수준으로 축소하고 렌더 시 esc 기본 적용. `avatarImg`는 `data:image/` 접두사를 검증.
13. 죽은 코드(JS 11개 항목)와 사용하지 않는 CSS 약 57개 클래스 제거. `.emotion-grid`/`.stat-badge` 분리(B11·B12). 테마 변수를 의미 기반(`--color-primary`, `--color-success`)으로 바꾸고 하드코딩된 색 제거.
14. 아코디언 구현 하나로 통합, help-card 템플릿 함수로 공통화.

**P3 — 여유 있을 때 (성능)**
15. 폰트 굵기 축소와 자체 호스팅, `prefers-reduced-motion`, `backdrop-filter` 사용 축소.
16. 60초 인터벌을 자정 타이머로 교체, 페이지별 지연 초기화, 메모 부분 갱신(B13).
17. ES 모듈로 전환(`type="module"`)해 전역 150개 정리. 최소한의 Playwright 스모크 테스트(이번 감사 스크립트 기반)를 CI에 추가.
