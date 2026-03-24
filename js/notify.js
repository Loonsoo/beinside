/* ═══════════════════════════════════════════════════════════
   BeInside — 일일 체크인 알림 (Notification API)
   서버 없이 클라이언트 스케줄링 (localStorage + setInterval)
═══════════════════════════════════════════════════════════ */

(function () {
  var NOTIFY_KEY = 'beinside_notify_v1';
  var CHECK_INTERVAL = 60 * 1000; // 1분마다 확인

  var MESSAGES = [
    { title: '오늘 하루, 어떤 감정이었나요?', body: '잠깐 멈추고, 오늘의 마음을 기록해 보세요.' },
    { title: '오늘 나를 위해 한 가지', body: '작은 것이라도 괜찮아요. 기록하면 보여요.' },
    { title: '지금 이 순간, 괜찮으세요?', body: '감정을 알아차리는 것만으로도 돌봄이에요.' },
    { title: '오늘의 감정 체크인', body: '하루 끝에 나를 돌아보는 시간을 가져보세요.' }
  ];

  function getSettings() {
    try {
      return JSON.parse(localStorage.getItem(NOTIFY_KEY)) || { enabled: false, hour: 21, minute: 0, lastDate: '' };
    } catch (e) { return { enabled: false, hour: 21, minute: 0, lastDate: '' }; }
  }

  function saveSettings(s) {
    try { localStorage.setItem(NOTIFY_KEY, JSON.stringify(s)); } catch (e) {}
  }

  /* ── 알림 전송 ── */
  function sendNotification() {
    if (Notification.permission !== 'granted') return;
    var msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    var n = new Notification(msg.title, {
      body: msg.body,
      icon: '/icons/icon.svg',
      badge: '/icons/icon.svg',
      tag: 'beinside-checkin',
      renotify: true
    });
    n.onclick = function () {
      window.focus();
      if (typeof showPage === 'function') showPage('journal');
      n.close();
    };
  }

  /* ── 스케줄 체크 ── */
  function checkSchedule() {
    var s = getSettings();
    if (!s.enabled) return;

    var now = new Date();
    var today = now.toISOString().split('T')[0];
    if (s.lastDate === today) return; // 오늘 이미 보냄

    if (now.getHours() >= s.hour && now.getMinutes() >= s.minute) {
      sendNotification();
      s.lastDate = today;
      saveSettings(s);
    }
  }

  /* ── 알림 켜기/끄기 (설정 패널에서 호출) ── */
  window.toggleDailyCheckin = function (enabled) {
    var s = getSettings();

    if (enabled && Notification.permission === 'default') {
      Notification.requestPermission().then(function (perm) {
        if (perm === 'granted') {
          s.enabled = true;
          saveSettings(s);
        }
      });
    } else {
      s.enabled = enabled;
      saveSettings(s);
    }
  };

  window.setCheckinTime = function (hour, minute) {
    var s = getSettings();
    s.hour = hour;
    s.minute = minute || 0;
    saveSettings(s);
  };

  window.getCheckinSettings = function () {
    return getSettings();
  };

  /* ── 시작 ── */
  if ('Notification' in window) {
    setInterval(checkSchedule, CHECK_INTERVAL);
    // 페이지 로드 시 한번 체크
    setTimeout(checkSchedule, 5000);
  }
})();
