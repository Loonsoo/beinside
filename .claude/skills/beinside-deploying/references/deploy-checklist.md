# BeInside 배포 전 체크리스트

## UI/UX
- [ ] 모바일 뷰포트 테스트 (Chrome DevTools — iPhone SE, iPhone 12, Galaxy S20)
- [ ] 모든 터치 타겟 44px 이상 확인
- [ ] 모든 tel: 링크 동작 확인
- [ ] aria 속성 검증 (aria-expanded, aria-label 등)

## 코드 품질
- [ ] CSS 변수 하드코딩 없음 확인 (color, background-color에 #hex 직접 사용 금지)
- [ ] localStorage 키 충돌 없음 확인 (beinside_ 접두사 사용)
- [ ] 청소년 페이지(teen) localStorage 미사용 확인
- [ ] Console 에러 없음
- [ ] 404 링크 없음

## 안전 기능
- [ ] 빠른 탈출 버튼 동작 확인 (가정폭력 페이지)
- [ ] 긴급 연락처 tel: 링크 정상 동작
- [ ] 위기 상황 페이지 안전 경고 표시 확인

## 콘텐츠
- [ ] 출처 드로어에 새 출처 반영
- [ ] 새 콘텐츠 오탈자 확인
- [ ] 권유체 통일 ("~해 보세요")
- [ ] 판단적 표현 없음 확인

## 성능
- [ ] 스크롤 이벤트에 passive: true 적용 확인
- [ ] 이미지 lazy loading 적용 확인
- [ ] 큰 파일(이미지 등) 최적화 확인

## Git
- [ ] .env, API 키 등 민감 파일 미포함 확인
- [ ] 커밋 메시지 컨벤션 준수 (feat/fix/content/style/refactor + 한국어)
- [ ] main 브랜치에 force push 아님 확인
