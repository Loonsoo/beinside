---
name: beinside-i18n
description: >
  BeInside의 다문화 가정 대상 다국어 콘텐츠를 작성·관리하는 스킬. 다국어 번역, 문화 차이 설명 콘텐츠, 다문화 가정 특화 가이드를 만들 때 사용하세요. "다문화", "번역", "베트남어", "중국어", "영어", "다국어", "이민" 등의 키워드에 반응합니다.
---

# BeInside 다국어 지원 스킬 (i18n)

## 배경

한국의 다문화 학생은 20.2만 명 (교육부 2025년).
다문화 가정 부모는 한국어 정보에 접근하기 어렵고, 문화 차이로 인한 혼란도 큽니다.
BeInside는 이들에게 "한국에서는 이렇게 해요"를 알려주는 가장 낮은 문턱의 접점이 됩니다.

---

## 작업 전 필수 확인

| 문서 | 읽어야 하는 상황 |
|------|-----------------|
| `references/language-priority.md` | 어떤 언어를 먼저 번역할지 결정할 때 |
| `references/cultural-parenting-notes.md` | 한국 육아 문화와 출신국 문화의 차이를 설명할 때 |

다국어 콘텐츠의 톤은 **beinside-content 스킬**의 기본 톤 규칙을 따릅니다.
긴급 연락처는 **beinside-safety 스킬**의 helpline-database를 참조합니다.

---

## 언어 우선순위

다문화 출생아 국적 비중 기준 (2024년):

1. **베트남어** — 다문화 가정 중 가장 높은 비중
2. **중국어(간체)** — 두 번째 비중
3. **영어** — 기타 국적 공통 소통 언어

번역 시 이 순서를 따릅니다. 예산·시간이 부족하면 베트남어 → 중국어 순서로 우선합니다.

---

## 번역 범위 단계

### 1단계: 긴급 연락처 + 카드 제목 (즉시 필요)
- 112, 119, 1366, 1388, 1393 + 설명 한 줄
- 모든 카드의 제목 (`<h3>`)
- "이것만은 꼭" 경고 문구

### 2단계: 핵심 요약 (다음 우선순위)
- 각 섹션의 3줄 요약
- 증상 체크리스트 항목
- 병원 가야 하는 신호 (`warn` 배열)

### 3단계: 전체 번역 (장기 목표)
- 모든 카드 본문
- 발달 이정표
- 팁 및 부모 가이드

---

## 문화 차이 콘텐츠 형식

"한국에서는 이렇게 해요" 형식으로 작성합니다.

```
🇰🇷 한국에서는...
[한국 문화/제도/관행 설명]

🌏 참고로 알아두세요
[출신국과의 차이, 오해 방지]

✅ 실용 팁
[구체적으로 할 수 있는 것]
```

`references/cultural-parenting-notes.md`에서 주요 문화 차이 목록을 참조하세요.

---

## HTML 다국어 구조

```html
<!-- 언어 토글 버튼 -->
<div class="lang-toggle">
  <button onclick="setLang('ko')" class="active">한국어</button>
  <button onclick="setLang('vi')">Tiếng Việt</button>
  <button onclick="setLang('zh')">中文</button>
  <button onclick="setLang('en')">English</button>
</div>

<!-- 다국어 콘텐츠 -->
<div class="multilang-card">
  <div data-lang="ko">한국어 내용</div>
  <div data-lang="vi" hidden>베트남어 내용</div>
  <div data-lang="zh" hidden>중국어 내용</div>
  <div data-lang="en" hidden>영어 내용</div>
</div>
```

```js
function setLang(lang) {
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.hidden = el.dataset.lang !== lang;
  });
}
```

---

## 번역 품질 기준

- 기계 번역 그대로 사용 금지 — 반드시 네이티브 수준 검수
- 의료·법률 용어: 현지 공식 용어 사용 (속어 금지)
- 긴급 연락처 설명: 간결하게, 핵심만
- 문화 차이 설명: "이 나라에서는 이게 이상한 거야"가 아닌 "한국에서는 이렇게 해요" 중립적 톤

---

## 완료 후 체크리스트

- [ ] 언어 우선순위에 따라 번역 범위가 결정되었는가
- [ ] 1단계 필수 항목(긴급 연락처 + 제목)이 완료되었는가
- [ ] 문화 차이 설명이 중립적 톤인가 (비교·비판 없이)
- [ ] 네이티브 검수가 완료되었는가
- [ ] 언어 토글 UI가 접근성 기준에 맞는가 (키보드 접근 가능)
