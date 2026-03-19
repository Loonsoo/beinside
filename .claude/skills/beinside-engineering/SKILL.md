---
name: beinside-engineering
description: >
  BeInside의 코드 구조, 성능 최적화, 데이터 무결성을 관리하는 스킬.
  JavaScript 함수 작성, 데이터 객체 추가, 파일 분리, 성능 개선,
  버그 수정 등 코드 레벨 작업을 할 때 사용. "코드", "함수",
  "데이터", "성능", "버그", "리팩토링", "JS" 키워드에 반응.
---

# BeInside 코드 시스템

## 파일 구조
references/file-structure.md에서 현재 프로젝트 구조 확인.
index.html, css/, js/ 폴더의 역할과 관계.

## 데이터 무결성
- 기존 데이터(getData, SP_DATA, MENTAL, ALONE_DATA, BIRTH_DATA)는 절대 구조 변경 금지
- 새 데이터 추가 시 기존 패턴과 동일한 구조 사용
- references/data-contracts.md에서 각 객체의 타입 계약 확인

## 성능 규칙
- 스크롤 이벤트: passive: true 필수
- DOM 조작: 가능하면 innerHTML 한 번에 세팅 (반복 appendChild 지양)
- localStorage: 각 키별 최대 용량 준수 (memos 90일, mood 90일, journal 90일)
- 이미지: lazy loading + width/height 명시
- references/performance-rules.md 참조

## 코딩 컨벤션
- 함수명: camelCase (renderDadGuide, toggleAccordion)
- 상수: UPPER_SNAKE_CASE (DAD_DATA, BURNOUT_DATA)
- CSS 클래스: kebab-case (accordion-header, check-tool)
- ID: kebab-case (guide-content-dad, acc-brain)
- 이벤트 핸들러: onclick 인라인 허용 (현재 코드베이스 관행)

## Gotchas
1. getData() 함수 구조 변경 — 기존 반환값에 필드 추가는 OK, 삭제·변경은 금지.
2. localStorage 키 충돌 — 새 기능은 반드시 새 키 사용 (beinside_ 접두사).
3. 전역 변수 오염 — IIFE 또는 모듈 패턴 사용.
4. 청소년 페이지에서 localStorage 호출 — 금지.

## 관련 스킬
- UI 작업 → `beinside-designing`
- 콘텐츠 작업 → `beinside-writing`
