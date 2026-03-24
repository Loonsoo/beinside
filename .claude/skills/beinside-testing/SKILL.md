---
name: beinside-testing
description: >
  BeInside의 코드 변경 후 안전성과 무결성을 검증하는 QA 스킬.
  라우트 렌더링, tel: 링크, 안전 콘텐츠, CSS 변수, 데이터 구조 검증.
  "테스트", "검증", "QA", "체크", "확인", "점검", "lint",
  "validate", "무결성", "회귀", "regression" 키워드에 반응.
---

# BeInside 테스트·검증 시스템

## 검증 철학

안전 콘텐츠의 오류는 생명을 위협할 수 있다.
"배포 전 체크리스트"를 수동 확인에 의존하지 않고 체계적으로 검증한다.

## beinside-deploying과의 역할 분담

- deploying = 배포 프로세스와 커밋 규칙
- testing = 배포 전 코드·콘텐츠 검증

## 검증 영역

### 1. 안전 불변식 (Safety Invariants) — 절대 깨지면 안 됨

```
□ 모든 위기 페이지에 빠른 탈출 버튼 존재
□ 빠른 탈출 버튼 클릭 시 네이버로 이동 + history.replaceState
□ 자살예방상담전화 109가 정확히 연결됨
□ 정신건강위기상담전화 1577-0199가 정확히 연결됨
□ 여성긴급전화 1366이 정확히 연결됨
□ 경찰 112가 정확히 연결됨
□ 모든 tel: 링크의 전화번호 형식이 올바름
□ 위기 경로("죽고 싶다" 등)가 정상 작동
□ emergencyIndex 로직이 모든 자가진단에 존재
```

### 2. 라우트 검증

```
□ 모든 라우트(18개)가 정상 렌더링됨
□ 뒤로가기/앞으로가기 시 페이지 전환 정상
□ 직접 URL 접근 시 정상 렌더링
□ 존재하지 않는 라우트 → 적절한 처리
```

### 3. 데이터 무결성

```
□ getData() 반환값 구조 변경 없음
□ SP_DATA, MENTAL, ALONE_DATA, BIRTH_DATA 구조 변경 없음
□ 새 데이터 객체가 기존 패턴과 동일한 구조
□ localStorage 키 네이밍 충돌 없음
□ localStorage 90일 보관 정책 준수
```

### 4. CSS 검증

```
□ 하드코딩 색상 없음 (CSS 변수 사용 필수)
□ 다크모드에서 모든 페이지 정상 표시
□ 모바일(360px)에서 가로 스크롤 없음
□ 터치 타겟 44px 이상
□ 폰트: Noto Sans KR, Gowun Batang만 사용
```

### 5. JavaScript 검증

```
□ console.log 남아있지 않음
□ 사용하지 않는 코드 없음
□ 스크롤 이벤트에 passive: true
□ 동기적 XMLHttpRequest 없음
□ 전역 변수 오염 없음
```

### 6. 콘텐츠 검증

```
□ 모든 전화번호에 tel: 링크
□ 전화번호 옆에 한 줄 설명 (운영시간 등)
□ 판단적 표현 없음 ("~해야 합니다" 등)
□ 면책 조항이 자가진단 도구에 포함
□ 출처가 명시된 통계 사용
```

## 자동 검증 코드 패턴

### tel: 링크 검증
```javascript
// 모든 tel: 링크 추출 후 형식 확인
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  const number = link.href.replace('tel:', '');
  // 한국 전화번호 형식: 3~4자리 (109, 112, 1366, 1577-0199 등)
  if (!/^\d{2,4}(-\d{3,4})?$/.test(number)) {
    console.error(`잘못된 전화번호 형식: ${number}`);
  }
});
```

### 하드코딩 색상 탐지
```bash
# CSS 파일에서 var() 없이 사용된 색상값 찾기
grep -nE '#[0-9a-fA-F]{3,8}|rgb\(|rgba\(|hsl\(' css/styles.css | grep -v 'var('
```

### 빠른 탈출 버튼 확인
```javascript
// 가정폭력 관련 페이지에 빠른 탈출 버튼 존재 확인
const crisisPages = ['domestic-violence', 'emergency'];
crisisPages.forEach(page => {
  // 해당 페이지 렌더링 후 탈출 버튼 존재 여부 확인
});
```

## 회귀 방지 규칙

코드 변경 시 반드시 확인:
1. **안전 불변식 전체** — 위기 관련 코드가 아니어도 확인
2. **변경된 파일의 관련 검증** — 예: CSS 수정 → CSS 검증
3. **라우트 검증** — 라우터 수정 시 전체 라우트 확인
