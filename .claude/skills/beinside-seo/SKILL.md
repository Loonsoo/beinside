---
name: beinside-seo
description: >
  BeInside의 검색 최적화와 콘텐츠 마케팅을 담당하는 스킬.
  메타태그, 구조화 데이터, sitemap, 키워드 전략, Open Graph,
  네이버/구글 검색 노출을 관리한다.
  "SEO", "검색", "메타", "OG", "sitemap", "구조화데이터",
  "네이버", "구글", "키워드", "검색노출", "meta", "schema",
  "크롤링", "canonical", "검색 의도", "유입" 키워드에 반응.
---

# BeInside SEO 시스템

## 미션
"혼자라고 느낄 때, 가장 먼저 닿는 곳" — 검색하는 순간 BeInside를 만나게 하는 것.

## SPA SEO 핵심 과제

BeInside는 History API 기반 SPA이다. 페이지 전환 시 반드시 동적으로 변경해야 할 요소:
- `document.title`
- `<meta name="description">`
- `<meta property="og:title">`, `og:description`, `og:url`
- `<link rel="canonical">`
- Umami 페이지뷰 트래킹

## 페이지별 메타 전략

각 라우트에 고유한 title과 description을 부여해야 한다.

### title 패턴
`[페이지 고유 제목] | BeInside`

### description 규칙
- 120자 이내 (네이버 기준)
- 검색 의도에 맞는 핵심 키워드 포함
- 행동 유도 문구 포함 ("지금 확인해 보세요")
- 감정적 표현보다 정보성 표현 우선

## 구조화 데이터 (JSON-LD)

### 사용할 스키마 유형
- `Organization`: 사이트 전체 정보
- `FAQPage`: 가이드 콘텐츠 (아코디언 구조)
- `HowTo`: 단계별 가이드
- `WebPage` + `speakable`: 위기 콘텐츠

### YMYL 대응
정신건강·돌봄 콘텐츠는 Google의 YMYL(Your Money Your Life) 범주.
E-E-A-T 신호를 강화해야 한다:
- 출처 명시 (통계, 연구)
- 전문 기관 연결 정보
- 콘텐츠 최종 업데이트 날짜

## sitemap.xml 관리

- 새 라우트 추가 시 반드시 sitemap 업데이트
- `lastmod` 날짜 포함
- `changefreq`와 `priority` 설정

## 네이버 vs 구글 차이

| 항목 | 네이버 | 구글 |
|-----|--------|------|
| JS 렌더링 | 제한적 | 지원 |
| 서치어드바이저 | 연동 완료 | Search Console 연동 필요 |
| 메타태그 | description 중시 | title 중시 |
| 구조화 데이터 | 제한적 지원 | 풍부한 리치 결과 |

## 검색 의도 매핑

각 페이지의 타겟 검색 의도를 정의:
- **정보형**: "산후우울증 증상", "양육 스트레스 해소법"
- **탐색형**: "한부모 지원 기관", "청소년 상담"
- **긴급형**: "자살 상담 전화번호", "긴급 심리상담"

## 콘텐츠 SEO 규칙

- 자연스러운 키워드 배치 (키워드 스터핑 금지)
- h1 > h2 > h3 위계 준수 (시맨틱 HTML)
- 이미지 alt 텍스트 포함
- 내부 링크로 관련 콘텐츠 연결
- 공포·자극적 문구로 클릭 유도 금지

## SNS 공유 최적화

- 카카오톡 공유: OG 태그 미리보기 최적화
- OG image: 페이지별 대표 이미지 (없으면 기본 이미지)
- Twitter Card: summary 유형

## SEO 체크리스트 (새 페이지 추가 시)

```
□ title 태그 설정 (고유, 60자 이내)
□ meta description 설정 (고유, 120자 이내)
□ OG 태그 설정 (title, description, url, image)
□ canonical URL 설정
□ sitemap.xml에 URL 추가
□ h1 태그 1개만 사용
□ 시맨틱 HTML 구조 (article, section, nav)
□ 내부 링크 연결
□ showPage()에서 메타 동적 변경 확인
```
