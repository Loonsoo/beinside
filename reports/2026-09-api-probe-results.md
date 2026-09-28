# data.go.kr API 호출 결과 (2026-09-28)

근거: `reports/2026-09-api-setup-guide.md` §2 신청 5건. 키는 환경 변수 `DATA_GO_KR_KEY`(64자, Decoding 키)로만 사용했고 여기엔 적지 않는다.

## 네트워크

| 호스트 | 결과 |
|---|---|
| apis.data.go.kr | 열림 (가끔 첫 연결이 끊김 → 재시도 필요) |
| www.data.go.kr (명세 페이지) | 막힘 (프록시 403) |
| api.odcloud.kr (정부24 공공서비스 API) | 막힘 |
| openapi.foodsafetykorea.go.kr | 막힘 |
| www.consumer.go.kr | 막힘 |
| health.kdca.go.kr | 막힘 (이번 세션 기준) |

## API별

| # | API | 호출 주소 | 결과 |
|---|---|---|---|
| 1 | 중앙부처복지서비스 | `apis.data.go.kr/B554287/NationalWelfareInformationsV001/NationalWelfarelistV001` (`callTp=L&srchKeyCode=003&lifeArray=001`), 상세 `.../NationalWelfaredetailedV001` (`callTp=D&servId=`) | **성공.** XML. 영유아 69건 |
| 2 | 공공서비스(혜택) | `api.odcloud.kr/api/gov24/v3/serviceList` | **미확인.** 호스트가 네트워크 허용 목록에 없음 |
| 3 | 예방접종 대상감염병 | `apis.data.go.kr/1790387/vcninfo/getCondVcnCd` | **키 미등록** (`SERVICE_KEY_IS_NOT_REGISTERED_ERROR`, 30). 승인 대기이거나 신청한 페이지(15009302)와 이 서비스가 다름. data.go.kr엔 같은 이름 페이지가 15084296으로도 있음 |
| 4 | 식품 회수·판매중지 | 미확정. 15074318은 식품안전나라 `I0490`(`openapi.foodsafetykorea.go.kr`, 별도 키)로 안내되는 것으로 보임 | **미확인** |
| 5 | 공산품 리콜 | 미확정 (`1130000/...` 추측 주소는 모두 `NO_OPENAPI_SERVICE_ERROR`) | **미확인** |

### 1번 응답 형식 (목록)

`wantedList` > `totalCount`, `pageNo`, `numOfRows`, `resultCode`(0), `resultMessage`(SUCCESS), `servList[]`:
`servId`, `servNm`, `servDgst`(요약), `servDtlLink`(복지로 상세), `jurMnofNm`/`jurOrgNm`(소관), `lifeArray`, `intrsThemaArray`, `trgterIndvdlArray`, `onapPsbltYn`(온라인 신청), `rprsCtadr`(대표 연락처), `sprtCycNm`, `srvPvsnNm`, `svcfrstRegTs`(최초 등록일, YYYYMMDD), `inqNum`(조회수).

- **수정일 필드가 목록에 없다.** 변경 감지는 상세 응답 해시로 해야 한다.
- 상세(`wantedDtl`)는 `tgtrDtlCn`, `slctCritCn` 등 본문이 `&#13;` 줄바꿈과 이중 이스케이프(`&amp;#9312;`)로 온다 → 디코드 두 번 필요.

## 운영자가 할 일

1. 네트워크 허용 도메인에 `api.odcloud.kr` 추가 (2번).
2. data.go.kr 마이페이지 → 활용신청 현황에서 3·4·5번 **상태(승인/심의)**와 각 상세 페이지의 **요청주소(End Point)**를 글로 알려 주기.
3. 4번이 식품안전나라 연계라면 foodsafetykorea.go.kr 별도 키 필요 여부 확인.

---

## 2차 (같은 날, 운영자 승인 확인 후) — 활용 범위 3건으로 확정

운영자 결정: **중앙부처복지서비스 · 예방접종(대상 감염병) · 공공서비스(혜택)** 3건만 쓴다. 식품 회수·공산품 리콜은 제외.

| API | 결과 |
|---|---|
| 중앙부처복지서비스 | ✅ 영유아(001)+임신·출산(007) 83건, 상세 83건 |
| 예방접종(대상 감염병) | ✅ 승인 반영됨. `getCondVcnCd` 21개 코드, `getVcnInfo?vcnCd=` 본문(CDATA). 0~12개월 관련 16개 받음 |
| 공공서비스(혜택) | ❌ `api.odcloud.kr` 여전히 프록시 403 → 허용 도메인 추가 필요 |

### 예방접종 응답 형식

`response > header(resultCode "00", resultMsg) > body(dataTime, pageNo, numOfRows, totalCount, items > item)`.
목록 item = `cd`, `cdNm`. 상세 item = `title`, `message`(CDATA, "▶ 질문" 소제목 + "•접종대상 및 접종시기" 줄). 수정일 필드 없음 → 본문 해시.

### 점검 스크립트

`DATA_GO_KR_KEY=... node scripts/datago-fetch.mjs` → `.cache/datago/`(커밋 안 함)에 요약·접종 본문 저장, 지난번과 비교해 새 제도·바뀐 본문을 알려 준다.

### 사이트 반영 (원문 대조로 찾은 오류 수정)

| 위치 | 전 | 후 (근거) |
|---|---|---|
| `js/data.js` 출산 지원금 | 첫만남이용권(200만원), 부모급여 없음 | 부모급여(0세 월 100만원), 첫만남이용권 첫째 200만원·둘째부터 300만원, 2026년 기준·확인일·복지로 안내 (WLF00004657, WLF00004656 상세, `crtrYr` 2026) |
| `js/render.js` 2개월 | "BCG·B형간염·…·로타 예방접종 시작" | BCG는 생후 4주 안, B형간염은 0·1·6개월이라 2개월 목록에서 뺌. 빠져 있던 Hib 추가 (vcnCd 01·02·05) |
| `js/render.js` 4개월 | Hib 없음 | Hib 추가 (vcnCd 05) |
| `js/render.js` 12개월 | "12개월 … 수두·MMR·A형간염" | 수두·MMR 12~15개월, A형간염 12~23개월로 범위 표기 (vcnCd 08·07·13) |

### 다음 카드 원천 (아직 카드 아님)

- 지원 카드 후보: 부모급여, 첫만남이용권, 아동수당, 산모·신생아 건강관리, 아이돌봄서비스, 저소득층 기저귀·조제분유, 선천성 난청검사, 미숙아·선천성이상아 의료비, 영양플러스, 위기임신 및 보호출산(1308). 링크는 각 `servDtlLink`(복지로).
- 접종 카드 후보: 0~12개월 일정은 위 코드 본문으로 충분. 이상반응·접종 후 열은 "병원 갈 때" 기준으로만 쓴다(약 용량 금지).
