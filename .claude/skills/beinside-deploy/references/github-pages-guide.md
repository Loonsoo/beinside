# GitHub Pages 배포 가이드

## 저장소 정보

- **저장소**: `Loonsoo/beinside`
- **URL**: https://github.com/Loonsoo/beinside
- **배포 브랜치**: `main`
- **커스텀 도메인**: `beinside.kr`
- **HTTPS**: 강제 적용

---

## GitHub Pages 설정 확인

1. GitHub 저장소 → Settings → Pages
2. Source: `Deploy from a branch`
3. Branch: `main` / `/ (root)`
4. Custom domain: `beinside.kr`

---

## 배포 흐름

```
로컬 변경
  ↓
git add + git commit
  ↓
git push origin main
  ↓
GitHub Actions 자동 빌드 (정적 파일이므로 빌드 없음)
  ↓
GitHub Pages CDN 배포 (1~2분)
  ↓
beinside.kr 반영
```

---

## 도메인 설정 (참고)

DNS 설정은 도메인 등록 기관에서 합니다:

```
A 레코드:
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153

CNAME 레코드:
  www → Loonsoo.github.io
```

CNAME 파일은 저장소 루트에 있어야 합니다:
```
# CNAME 파일 내용
beinside.kr
```

---

## 트러블슈팅

### push가 안 될 때
1. 네트워크 확인: `ping github.com`
2. 인증 확인: `git config --list | grep credential`
3. 토큰 갱신: GitHub → Settings → Developer settings → Personal access tokens
4. 다른 네트워크 시도 (모바일 핫스팟)

### 배포 후 변경사항이 안 보일 때
1. GitHub Actions 탭에서 배포 상태 확인
2. 브라우저 강제 새로고침: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)
3. 캐시 문제라면 시크릿 창에서 확인

### 404 오류가 날 때
- `main` 브랜치에 `index.html`이 있는지 확인
- GitHub Pages 설정에서 브랜치가 `main`인지 확인

---

## 파일 분리 계획 (현재 구조 유지 기준)

현재 파일 크기 기준:
- `index.html`: ~300줄 (경량 유지 권장)
- `css/styles.css`: ~800줄 (현재 적절)
- `js/data.js`: ~500줄 (데이터 증가 시 분리 검토)

데이터 파일 분리 시 검토할 기준: `data.js`가 1,000줄 초과 시
