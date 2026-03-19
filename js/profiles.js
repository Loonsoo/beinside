/* ═══════════════════════════════════════════════════════════
   BeInside — 프로필 시스템
═══════════════════════════════════════════════════════════ */

let editingIdx   = null;  // null = 새 프로필, number = 수정 중
let editType     = 'child';
let editAvatarImg = null; // base64 또는 null
let editAvatarEm  = '🌱';

/* ── 포커스 트랩 유틸 ── */
let _lastFocused = null;
function trapFocus(container) {
  _lastFocused = document.activeElement;
  const focusable = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable.length === 0) return;
  focusable[0].focus();
  container.addEventListener('keydown', function handler(e) {
    if (e.key !== 'Tab') return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}
function restoreFocus() {
  if (_lastFocused && _lastFocused.focus) _lastFocused.focus();
  _lastFocused = null;
}

/* ── 헤더 칩 업데이트 ── */
function updateHeaderChip() {
  const chip   = document.getElementById('prof-chip');
  const avEl   = document.getElementById('hdr-avatar');
  const avEm   = document.getElementById('hdr-avatar-em');
  const infoEl = document.getElementById('hdr-info');

  if (activeIdx < 0 || !profiles[activeIdx]) {
    if (avEm) avEm.textContent = '🌱';
    if (infoEl) infoEl.innerHTML = '<span class="prof-add">프로필 추가</span>';
    return;
  }
  const p   = profiles[activeIdx];
  const age = calcAge(p.dob);
  if (avEl) avEl.innerHTML = avatarHTML(p, 34);
  if (infoEl) infoEl.innerHTML = `<span class="prof-name">${esc(p.name)}</span><span class="prof-age">${esc(age.label)}</span>`;
}

/* ── 히어로 배너 업데이트 (제거됨, 호환성 유지) ── */
function updateHeroBanner() {}

/* ── 프로필로 바로 가기 ── */
function goWithProfile() {
  if (activeIdx < 0) return;
  const p   = profiles[activeIdx];
  const age = calcAge(p.dob);
  if (age.months < 0) return;
  if (age.months <= 36) {
    setM('m');
    document.getElementById('ai').value = age.months;
  } else {
    setM('y');
    document.getElementById('ai').value = Math.floor(age.months / 12);
  }
  showPage('growth');
  setMTab('growth');
  go();
}

/* ── 프로필 패널 (Bottom Sheet) ── */
function openProfPanel() {
  renderProfPanel();
  document.getElementById('prof-panel-overlay').classList.add('on');
  const panel = document.getElementById('prof-panel');
  panel.classList.add('on');
  trapFocus(panel);
}
function closeProfPanel() {
  document.getElementById('prof-panel-overlay').classList.remove('on');
  document.getElementById('prof-panel').classList.remove('on');
  restoreFocus();
}

function renderProfPanel() {
  const activeEl = document.getElementById('prof-panel-active');
  const listEl   = document.getElementById('prof-panel-list');
  if (!activeEl || !listEl) return;

  if (profiles.length === 0) {
    activeEl.innerHTML = `<p class="pp-empty">아직 프로필이 없어요<br><small>아래 버튼으로 추가해보세요</small></p>`;
    listEl.innerHTML = '';
    return;
  }

  // 활성 프로필 영역
  const ap  = profiles[activeIdx] || profiles[0];
  const age = calcAge(ap.dob);
  const hasAge = age.months >= 0;
  activeEl.innerHTML = `
    <div class="pp-active-row">
      <div class="pp-active-avatar">${avatarHTML(ap, 52)}</div>
      <div class="pp-active-info">
        <div class="pp-active-name">${esc(ap.name)}</div>
        <div class="pp-active-age">${esc(age.label)} · ${ap.type === 'child' ? '자녀' : '나 자신'}</div>
      </div>
      <div class="pp-active-btns">
        ${hasAge ? `<button class="pp-goto-btn" onclick="closeProfPanel();goWithProfile()">→ 바로가기</button>` : ''}
        <button class="pp-edit-btn" onclick="openEditModal(${activeIdx})">✏️ 편집</button>
      </div>
    </div>`;

  // 다른 프로필 목록
  const others = profiles.filter((_, i) => i !== activeIdx);
  if (others.length === 0) {
    listEl.innerHTML = '';
    return;
  }
  listEl.innerHTML = `<div class="pp-list-label">다른 프로필</div>` +
    profiles.map((p, i) => {
      if (i === activeIdx) return '';
      const a = calcAge(p.dob);
      return `<div class="pp-list-item" onclick="setProfActive(${i})">
        <div class="pp-list-avatar">${avatarHTML(p, 36)}</div>
        <div class="pp-list-info">
          <span class="pp-list-name">${esc(p.name)}</span>
          <span class="pp-list-age">${esc(a.label)}</span>
        </div>
        <div class="pp-list-actions" onclick="event.stopPropagation()">
          <button class="pi-btn" onclick="openEditModal(${i})" title="편집">✏️</button>
          <button class="pi-btn del" onclick="deleteProfFromPanel(${i})" title="삭제">🗑</button>
        </div>
      </div>`;
    }).join('');
}

function setProfActive(i) {
  if (i < 0 || i >= profiles.length) return;
  activeIdx = i;
  saveProfiles();
  updateHeaderChip();
  closeProfPanel();
}

function deleteProfFromPanel(i) {
  if (i < 0 || i >= profiles.length) return;
  if (!confirm(`"${profiles[i].name}" 프로필을 삭제할까요?`)) return;
  profiles.splice(i, 1);
  if (activeIdx === i) activeIdx = profiles.length > 0 ? 0 : -1;
  else if (activeIdx > i) activeIdx--;
  saveProfiles();
  updateHeaderChip();
  renderProfPanel();
}

/* 편집 모달 열기 (패널에서 호출) */
function openEditModal(idx) {
  closeProfPanel();
  showListView();
  if (idx !== null && idx !== undefined) {
    showEditForm(idx);
  } else {
    showEditForm(null);
  }
  document.getElementById('modal-overlay').classList.add('on');
}

/* ── 모달 (편집 전용) ── */
function openModal() {
  showListView();
  document.getElementById('modal-overlay').classList.add('on');
}
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('on');
}
function closeModalOutside(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

/* ── 목록 뷰 ── */
function showListView() {
  document.getElementById('modal-list-view').style.display = '';
  document.getElementById('edit-form').classList.remove('on');
  renderProfList();
}

function renderProfList() {
  const list = document.getElementById('prof-list');
  if (!list) return;
  if (profiles.length === 0) {
    list.innerHTML = `<p style="text-align:center;color:var(--ink-l);font-size:13px;padding:16px 0">아직 프로필이 없어요</p>`;
    return;
  }
  list.innerHTML = profiles.map((p, i) => {
    const age = calcAge(p.dob);
    return `<div class="prof-item${i === activeIdx ? ' active' : ''}" onclick="setActive(${i})">
      <div class="prof-item-avatar">${avatarHTML(p, 42)}</div>
      <div class="prof-item-info">
        <div class="prof-item-name">${esc(p.name)}</div>
        <div class="prof-item-age">${esc(age.label)} · ${p.type === 'child' ? '자녀' : '나 자신'}</div>
      </div>
      <div class="prof-item-actions" onclick="event.stopPropagation()">
        <button class="pi-btn" onclick="showEditForm(${i})" title="편집">✏️</button>
        <button class="pi-btn del" onclick="deleteProfile(${i})" title="삭제">🗑</button>
      </div>
    </div>`;
  }).join('');
}

function setActive(i) {
  if (i < 0 || i >= profiles.length) return;
  activeIdx = i;
  saveProfiles();
  updateHeaderChip();
  renderProfList();
  closeModal();
}

function deleteProfile(i) {
  if (i < 0 || i >= profiles.length) return;
  if (!confirm(`"${profiles[i].name}" 프로필을 삭제할까요?`)) return;
  profiles.splice(i, 1);
  if (activeIdx === i) activeIdx = profiles.length > 0 ? 0 : -1;
  else if (activeIdx > i) activeIdx--;
  saveProfiles();
  updateHeaderChip();
  renderProfList();
}

/* ── 편집 폼 ── */
function showEditForm(idx) {
  editingIdx    = idx;
  editAvatarImg = null;
  editAvatarEm  = '🌱';
  editType      = 'child';

  document.getElementById('modal-list-view').style.display = 'none';
  document.getElementById('edit-form').classList.add('on');

  if (idx !== null && profiles[idx]) {
    const p = profiles[idx];
    document.getElementById('edit-name').value = p.name;
    document.getElementById('edit-dob').value  = p.dob;
    editType      = p.type || 'child';
    editAvatarImg = p.avatarImg || null;
    editAvatarEm  = p.avatarEm || '🌱';
  } else {
    document.getElementById('edit-name').value = '';
    document.getElementById('edit-dob').value  = '';
  }

  document.getElementById('edit-dob').max = new Date().toISOString().slice(0, 10);
  setType(editType);
  refreshAvatarPreview();
  buildEmojiGrid();
}

function setType(t) {
  editType = t;
  document.getElementById('type-child').classList.toggle('on', t === 'child');
  document.getElementById('type-self').classList.toggle('on',  t === 'self');
  document.getElementById('dob-label').textContent = t === 'child' ? '생년월일' : '나의 생년월일';
}

function refreshAvatarPreview() {
  const prev = document.getElementById('edit-avatar-preview');
  if (!prev) return;
  if (editAvatarImg) {
    prev.innerHTML = `<img src="${editAvatarImg}" style="width:64px;height:64px;border-radius:50%;object-fit:cover;">`;
  } else {
    prev.innerHTML = `<span id="edit-avatar-em" style="font-size:32px">${esc(editAvatarEm)}</span>`;
  }
}

function buildEmojiGrid() {
  const grid = document.getElementById('emoji-grid');
  if (!grid) return;
  grid.innerHTML = EMOJIS.map((em, i) => {
    const isOn = em === editAvatarEm && !editAvatarImg;
    return `<button type="button" class="emoji-opt${isOn ? ' on' : ''}" data-idx="${i}" aria-label="${em}">${em}</button>`;
  }).join('');
  grid.querySelectorAll('.emoji-opt').forEach((btn, i) => {
    btn.onclick = () => pickEmoji(EMOJIS[i]);
  });
}

function pickEmoji(em) {
  editAvatarImg = null;
  editAvatarEm  = em;
  document.getElementById('avatar-file-input').value = '';
  refreshAvatarPreview();
  buildEmojiGrid();
}

/* 아바타 파일 업로드 — 2MB 크기 제한 */
function handleAvatarFile(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
    alert('이미지 크기는 2MB 이하로 선택해 주세요.');
    e.target.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = ev => {
    editAvatarImg = ev.target.result;
    refreshAvatarPreview();
    document.querySelectorAll('.emoji-opt').forEach(b => b.classList.remove('on'));
  };
  reader.readAsDataURL(file);
}

function saveProfile() {
  const name = document.getElementById('edit-name').value.trim();
  const dob  = document.getElementById('edit-dob').value;
  if (!name) { alert('이름을 입력해 주세요'); return; }
  if (!dob)  { alert('생년월일을 입력해 주세요'); return; }

  const prof = { name, dob, type: editType, avatarImg: editAvatarImg || null, avatarEm: editAvatarEm };

  if (editingIdx === null) {
    profiles.push(prof);
    activeIdx = profiles.length - 1;
  } else {
    profiles[editingIdx] = prof;
  }
  saveProfiles();
  updateHeaderChip();
  updateHeroBanner();
  closeModal();
}

/* ── 초기화 ── */
(function initProfiles() {
  loadProfiles();
  updateHeaderChip();
  updateHeroBanner();
  // 분당 1회 나이 표시 갱신 (날짜 넘어갈 때 반영)
  setInterval(() => { updateHeaderChip(); updateHeroBanner(); }, 60000);
})();
