/* ═══════════════════════════════════════════════════════════
   BeInside — 공유 (카카오톡 + 링크복사 + Web Share API)
═══════════════════════════════════════════════════════════ */
(function initShare() {
  const KAKAO_KEY = ''; // 카카오 앱 키 (추후 설정)
  let menuOpen = false;

  // 카카오 SDK 초기화
  if (typeof Kakao !== 'undefined' && KAKAO_KEY) {
    Kakao.init(KAKAO_KEY);
  }

  /* ── 메뉴 토글 ── */
  window.toggleShareMenu = function() {
    const menu = document.getElementById('share-menu');
    const fab = document.getElementById('share-fab');
    if (!menu) return;
    menuOpen = !menuOpen;
    menu.classList.toggle('on', menuOpen);
    fab.classList.toggle('on', menuOpen);
  };

  function closeMenu() {
    menuOpen = false;
    const menu = document.getElementById('share-menu');
    const fab = document.getElementById('share-fab');
    if (menu) menu.classList.remove('on');
    if (fab) fab.classList.remove('on');
  }

  // 메뉴 외부 클릭 시 닫기
  document.addEventListener('click', function(e) {
    if (!menuOpen) return;
    if (e.target.closest('.share-fab') || e.target.closest('.share-menu')) return;
    closeMenu();
  });

  /* ── 카카오톡 공유 ── */
  window.shareKakao = function() {
    closeMenu();
    if (typeof Kakao !== 'undefined' && Kakao.isInitialized && Kakao.isInitialized()) {
      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: 'BeInside — 혼자라고 느낄 때, 가장 먼저 닿는 곳',
          description: '육아, 정신건강, 감정 돌봄 가이드. 판단 없이, 당신 편에서 안내합니다.',
          imageUrl: 'https://beinside.kr/og-image.svg',
          link: {
            mobileWebUrl: 'https://beinside.kr',
            webUrl: 'https://beinside.kr'
          }
        },
        buttons: [{
          title: '바로 가기',
          link: {
            mobileWebUrl: 'https://beinside.kr',
            webUrl: 'https://beinside.kr'
          }
        }]
      });
    } else {
      // 카카오 SDK 미초기화 시 카카오톡 공유 URL 스킴으로 대체
      const text = encodeURIComponent('BeInside — 혼자라고 느낄 때, 가장 먼저 닿는 곳\nhttps://beinside.kr');
      window.open('https://sharer.kakao.com/talk/friends/picker/shorturl?app_key=&amp;url=' + encodeURIComponent('https://beinside.kr'), '_blank', 'width=480,height=600');
    }
  };

  /* ── 링크 복사 ── */
  window.shareURL = function() {
    closeMenu();
    const url = 'https://beinside.kr';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function() {
        showShareToast('링크가 복사되었어요');
      }).catch(function() {
        fallbackCopy(url);
      });
    } else {
      fallbackCopy(url);
    }
  };

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showShareToast('링크가 복사되었어요'); }
    catch (e) { showShareToast('복사에 실패했어요'); }
    document.body.removeChild(ta);
  }

  /* ── 네이티브 공유 (Web Share API) ── */
  window.shareNative = function() {
    closeMenu();
    if (navigator.share) {
      navigator.share({
        title: 'BeInside — 혼자라고 느낄 때, 가장 먼저 닿는 곳',
        text: '육아, 정신건강, 감정 돌봄 가이드. 판단 없이, 당신 편에서 안내합니다.',
        url: 'https://beinside.kr'
      }).catch(function() { /* 사용자 취소 */ });
    } else {
      shareURL();
    }
  };

  /* ── 토스트 메시지 ── */
  function showShareToast(msg) {
    let toast = document.getElementById('share-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'share-toast';
      toast.className = 'share-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('on');
    setTimeout(function() { toast.classList.remove('on'); }, 2200);
  }
})();
