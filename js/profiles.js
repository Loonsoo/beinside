/* ═══════════════════════════════════════════════════════════
   BeInside — 프로필 시스템
═══════════════════════════════════════════════════════════ */

let editingIdx   = null;  // null = 새 프로필, number = 수정 중
let editType     = 'child';
let editAvatarImg = null; // base64 또는 null
let editAvatarEm  = '🌱';

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

/* ── 히어로 배너 업데이트 ── */
function updateHeroBanner() {
  const banner = document.getElementById('hero-banner');
  if (!banner) return;
  if (activeIdx < 0 || !profiles[activeIdx]) {
    banner.classList.remove('on');
    return;
  }
  const p   = profiles[activeIdx];
  const age = calcAge(p.dob);
  const avatarEl = document.getElementById('banner-avatar');
  const nameEl   = document.getElementById('banner-name');
  const ageEl    = document.getElementById('banner-age');
  if (avatarEl) avatarEl.innerHTML = avatarHTML(p, 44);
  if (nameEl)   nameEl.textContent = p.name;
  if (ageEl)    ageEl.textContent  = age.months >= 0
    ? `${age.label} · 지금 이 시기 가이드 바로 보기`
    : age.label;
  banner.classList.toggle('on', age.months >= 0);
}

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
  setTimeout(() => {
    const r = document.getElementById('result');
    if (r) r.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

/* ── 모달 ── */
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
  updateHeroBanner();
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
  updateHeroBanner();
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
  grid.innerHTML = EMOJIS.map(em => {
    const isOn = em === editAvatarEm && !editAvatarImg;
    const btn  = document.createElement('button');
    btn.className   = 'emoji-opt' + (isOn ? ' on' : '');
    btn.textContent = em;
    btn.onclick     = () => pickEmoji(em);
    return btn.outerHTML;
  }).join('');
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
  showListView();
}

/* ── 초기화 ── */
(function initProfiles() {
  loadProfiles();
  updateHeaderChip();
  updateHeroBanner();
  // 분당 1회 나이 표시 갱신 (날짜 넘어갈 때 반영)
  setInterval(() => { updateHeaderChip(); updateHeroBanner(); }, 60000);
})();
