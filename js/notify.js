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

  var HAS_NOTIFY = typeof window !== 'undefined' && 'Notification' in window;

  function pickOptions() {
    var msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    return {
      title: msg.title,
      opts: { body: msg.body, icon: '/icons/icon-192.png', badge: '/icons/icon-192.png', tag: 'beinside-checkin', renotify: true, data: { url: '/journal' } }
    };
  }

  /* 페이지에서 직접 띄우기 (서비스워커가 없을 때만). 안드로이드 크롬 등은 생성자를 막으므로 try로 감싼다 */
  function notifyDirect(m) {
    try {
      var n = new Notification(m.title, m.opts);
      n.onclick = function () {
        window.focus();
        if (typeof showPage === 'function') showPage('journal');
        n.close();
      };
    } catch (e) { /* 이 브라우저는 페이지에서 알림을 만들 수 없음 */ }
  }

  /* ── 알림 전송: 서비스워커가 있으면 showNotification, 없으면 생성자 ── */
  function sendNotification() {
    if (!HAS_NOTIFY || Notification.permission !== 'granted') return;
    var m = pickOptions();
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.getRegistration) {
        navigator.serviceWorker.getRegistration().then(function (reg) {
          if (reg && reg.showNotification) return reg.showNotification(m.title, m.opts);
          notifyDirect(m);
        }).catch(function () { notifyDirect(m); });
        return;
      }
    } catch (e) { /* 아래 생성자로 */ }
    notifyDirect(m);
  }

  function localDate(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  /* ── 스케줄 체크 ── */
  function checkSchedule() {
    var s = getSettings();
    if (!s.enabled) return;

    var now = new Date();
    var today = localDate(now);
    if (s.lastDate === today) return; // 오늘 이미 보냄

    if (now.getHours() * 60 + now.getMinutes() >= s.hour * 60 + s.minute) {
      // 보내기 전에 먼저 저장한다. 알림 오류가 나도 1분마다 다시 시도하지 않게
      s.lastDate = today;
      saveSettings(s);
      sendNotification();
    }
  }

  /* ── 알림 켜기/끄기 (설정 패널에서 호출) ── */
  window.toggleDailyCheckin = function (enabled) {
    var s = getSettings();
    var box = document.getElementById('checkin-toggle');

    if (enabled && !HAS_NOTIFY) {
      if (box) box.checked = false;
      return;
    }
    if (enabled && Notification.permission !== 'granted') {
      var done = function (perm) {
        s.enabled = perm === 'granted';
        saveSettings(s);
        if (box) box.checked = s.enabled;
      };
      try {
        var p = Notification.requestPermission(done);
        if (p && p.then) p.then(done, function () { done('denied'); });
      } catch (e) { done('denied'); }
      return;
    }
    s.enabled = enabled;
    saveSettings(s);
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
  if (HAS_NOTIFY) {
    setInterval(checkSchedule, CHECK_INTERVAL);
    // 페이지 로드 시 한번 체크
    setTimeout(checkSchedule, 5000);
  }
})();
