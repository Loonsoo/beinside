import { defineConfig } from 'vite';

export default defineConfig({
  /* ── 개발 서버 — 기존 파일 구조 그대로 서빙 ── */
  server: {
    port: 3000,
    open: true
  },

  /* ── 빌드 비활성화 — Vercel이 정적 배포 담당 ── */
  /* npm run build는 CSS 최적화 테스트용으로만 사용 */
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false
  },

  css: {
    devSourcemap: true
  }
});
