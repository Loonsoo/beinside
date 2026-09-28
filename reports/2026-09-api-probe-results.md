# data.go.kr API 1차 호출 결과 (2026-09-28)

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
