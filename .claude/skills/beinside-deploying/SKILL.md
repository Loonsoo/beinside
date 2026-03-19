---
name: beinside-deploying
description: >
  BeInside 배포, 커밋, 품질 관리 스킬.
  "배포", "커밋", "push", "테스트", "체크리스트" 키워드에 반응.
---

# BeInside 배포 시스템

## 배포 파이프라인
GitHub main 브랜치 → Vercel 자동 배포

## 커밋 컨벤션
- feat: 새 기능
- fix: 버그 수정
- content: 콘텐츠 추가/수정
- style: 디자인/CSS 변경
- refactor: 코드 구조 변경 (동작 동일)

## 커밋 메시지 규칙
- 한국어 사용
- 동사로 시작: "추가", "수정", "변경", "삭제"
- 50자 이내 제목줄

## 배포 전 체크리스트
references/deploy-checklist.md 참조

## Gotchas
1. main 직접 force push — 절대 금지
2. .env나 API 키 커밋 — .gitignore 확인
3. 큰 이미지 파일 커밋 — 최적화 후 커밋
4. CSS 변수 하드코딩 확인 — 배포 전 grep으로 체크

## 관련 스킬
- 코드 품질 → `beinside-engineering`
