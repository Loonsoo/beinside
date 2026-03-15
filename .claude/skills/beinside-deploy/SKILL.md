---
name: beinside-deploy
description: >
  BeInside 웹사이트의 GitHub Pages 배포, 파일 관리, 빌드 프로세스를 관리하는 스킬. "배포", "deploy", "GitHub", "push", "빌드", "업로드" 등의 키워드에 반응합니다.
---

# BeInside 배포 & 관리 스킬

## 현재 구조

```
beinside/
├── index.html          # 메인 HTML
├── css/
│   └── styles.css      # 전체 스타일
├── js/
│   ├── app.js          # 앱 초기화 & 이벤트
│   ├── data.js         # 모든 콘텐츠 데이터
│   ├── memo.js         # 메모 기능
│   ├── profiles.js     # 프로필 관리
│   ├── render.js       # 렌더링 함수
│   ├── storage.js      # localStorage 유틸
│   └── utils.js        # 공통 유틸
├── .claude/
│   └── skills/         # Claude Code 커스텀 스킬
└── .gitignore
```

**호스팅**: GitHub Pages (`main` 브랜치 → `beinside.kr`)
**프레임워크**: 없음 (순수 HTML/CSS/JS)
**빌드 도구**: 없음 (정적 파일 그대로 배포)

---

## 배포 절차

```bash
# 1. 변경사항 확인
git status
git diff

# 2. 스테이징
git add [파일명]          # 특정 파일만 (권장)
# 또는
git add -A                # 전체 (주의: 실수로 추가되는 파일 없는지 확인)

# 3. 커밋
git commit -m "feat: [변경 내용 한 줄 요약]"

# 4. 푸시 (main 브랜치)
git push origin main
```

GitHub Pages는 `main` 브랜치에 push하면 1~2분 내 자동 배포됩니다.

---

## 커밋 메시지 형식

```
[타입]: [내용] ([대상])

타입:
  feat     - 새 기능 또는 콘텐츠 추가
  fix      - 버그 수정
  style    - CSS/UI 변경 (기능 변화 없음)
  refactor - 코드 구조 개선 (기능 변화 없음)
  content  - 콘텐츠 데이터 추가/수정
  docs     - 문서 업데이트

예:
  feat: 65세 이상 노인 발달 가이드 추가
  fix: 모바일에서 아코디언 높이 계산 오류 수정
  content: 청소년 정신건강 통계 2025년 기준으로 업데이트
  style: 카드 호버 애니메이션 개선
```

---

## 주의사항

### 네트워크 제한
- 일부 작업 환경에서 GitHub 직접 접근이 제한될 수 있음
- push가 안 될 경우: 집 네트워크에서 시도하거나 모바일 핫스팟 사용

### 파일 크기 관리
- `js/data.js`가 커지면 연령대별 파일로 분리 검토 (`data-infant.js`, `data-teen.js` 등)
- `css/styles.css`가 400줄 이상 되면 섹션별 분리 검토
- 단, 분리 시 `index.html`의 `<script>` 및 `<link>` 태그 업데이트 필수

---

## 이미지 최적화

BeInside는 현재 이미지를 거의 사용하지 않습니다.
이미지가 필요해질 경우:

```html
<!-- WebP 우선, JPEG 폴백 -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="설명" width="800" height="400" loading="lazy">
</picture>

<!-- 단순 이미지 -->
<img src="photo.webp" alt="설명" width="400" height="300" loading="lazy">
```

- **WebP 우선** (JPEG 대비 30~40% 크기 절감)
- `loading="lazy"` 필수 (초기 로딩 속도)
- `width`, `height` 명시 필수 (CLS 방지)
- 최대 너비: 880px (콘텐츠 최대 너비와 동일)

---

## 배포 확인 체크리스트

```
배포 전
[ ] git status로 의도하지 않은 파일이 없는지 확인
[ ] 브라우저에서 로컬 파일을 열어 동작 확인
[ ] 모바일 뷰포트에서 레이아웃 확인 (DevTools 640px)
[ ] 콘솔 에러 없는지 확인

배포 후
[ ] beinside.kr에서 변경사항 반영 확인 (1~2분 대기)
[ ] 모바일로 실제 접속하여 확인
[ ] 주요 기능 (월령 검색, 메모, 프로필) 동작 확인
```

---

## GitHub Pages 설정

`references/github-pages-guide.md` 참조.

- 저장소: `Loonsoo/beinside`
- 배포 브랜치: `main`
- 커스텀 도메인: `beinside.kr`
- HTTPS: 강제 적용
