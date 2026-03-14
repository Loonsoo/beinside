/* ═══════════════════════════════════════════════════════════
   BeInside — localStorage 래퍼
   에러 처리 + 용량 초과 알림 포함
═══════════════════════════════════════════════════════════ */

/* ── 메모 ── */
let memos = [];
let curMemoMonths = 0;

function loadMemos() {
  try {
    const raw = localStorage.getItem(MEMO_KEY);
    memos = raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('메모 불러오기 실패:', e);
    memos = [];
  }
}

function saveMemos() {
  try {
    localStorage.setItem(MEMO_KEY, JSON.stringify(memos));
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      alert('저장 공간이 부족합니다. 오래된 메모를 삭제한 후 다시 시도해 주세요.');
    } else {
      console.error('메모 저장 실패:', e);
    }
  }
}

/* ── 프로필 ── */
let profiles  = [];
let activeIdx = -1;

function loadProfiles() {
  try {
    profiles  = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    activeIdx = parseInt(localStorage.getItem(ACTIVE_KEY) ?? '-1');
    if (activeIdx >= profiles.length) {
      activeIdx = profiles.length > 0 ? 0 : -1;
    }
  } catch (e) {
    console.warn('프로필 불러오기 실패:', e);
    profiles  = [];
    activeIdx = -1;
  }
}

function saveProfiles() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    localStorage.setItem(ACTIVE_KEY, String(activeIdx));
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      alert('저장 공간이 부족합니다. 아바타 이미지 크기를 줄이거나 불필요한 프로필을 삭제해 주세요.');
    } else {
      console.error('프로필 저장 실패:', e);
    }
  }
}
