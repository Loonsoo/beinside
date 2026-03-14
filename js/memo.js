/* ═══════════════════════════════════════════════════════════
   BeInside — 성장 메모장 시스템
═══════════════════════════════════════════════════════════ */

function getMemoHTML(months) {
  curMemoMonths = months;
  const stageLabel = getStageLabel(months);
  const stageMemos = memos.filter(m => m.stageLabel === stageLabel);
  const otherMemos = memos.filter(m => m.stageLabel !== stageLabel);

  // 다른 시기 메모를 단계별로 그룹화
  const byStage = {};
  otherMemos.forEach(m => {
    if (!byStage[m.stageLabel]) byStage[m.stageLabel] = [];
    byStage[m.stageLabel].push(m);
  });

  const renderItem = m => `
    <div class="memo-item" id="mi${esc(m.id)}">
      <div class="memo-item-head" onclick="toggleMemoItem('${esc(m.id)}')">
        <span class="memo-tag tag-${esc(m.tag)}">${TAG_MAP[m.tag] || esc(m.tag)}</span>
        <span class="memo-item-date">${esc(m.date)}</span>
        <span class="memo-item-preview">${esc(m.text.slice(0, 40))}${m.text.length > 40 ? '…' : ''}</span>
        <button class="memo-item-del" onclick="event.stopPropagation();deleteMemo('${esc(m.id)}')" title="삭제">🗑</button>
      </div>
      <div class="memo-item-body" id="mb${esc(m.id)}"><p>${esc(m.text)}</p></div>
    </div>`;

  const historyHTML = Object.keys(byStage).length > 0 ? `
    <details style="margin-top:14px;">
      <summary class="memo-history-btn">📂 다른 시기 메모 보기 (${otherMemos.length}개)</summary>
      <div style="margin-top:10px;display:flex;flex-direction:column;gap:16px;">
        ${Object.entries(byStage).map(([stage, ms]) => `
          <div>
            <div style="font-size:11px;font-weight:700;color:var(--ink-l);letter-spacing:.07em;text-transform:uppercase;margin-bottom:6px;padding-bottom:5px;border-bottom:1px solid var(--line);">${esc(stage)} (${ms.length}개)</div>
            <div style="display:flex;flex-direction:column;gap:8px;">${ms.map(m => renderItem(m)).join('')}</div>
          </div>`).join('')}
      </div>
    </details>` : '';

  return `<div class="memo-wrap">
    <div class="memo-header">
      <div>
        <div class="memo-title">📓 성장 메모장 <span style="font-size:11px;font-weight:400;color:var(--ink-l)">— ${esc(stageLabel)}</span></div>
        <div class="memo-subtitle">이 시기의 특별한 순간, 발달 변화, 아이의 말 등을 기록해 두세요</div>
      </div>
      <button class="memo-add-btn" onclick="toggleMemoForm()">＋ 새 메모</button>
    </div>
    <div class="memo-form" id="memo-form">
      <div class="memo-form-row">
        <input type="date" class="memo-date-input" id="memo-date" value="${new Date().toISOString().slice(0, 10)}">
        <select class="memo-tag-select" id="memo-tag">
          ${Object.entries(TAG_MAP).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}
        </select>
      </div>
      <textarea class="memo-textarea" id="memo-text" placeholder="이 시기에 특별히 기억하고 싶은 것들을 적어주세요.
예) '오늘 처음으로 혼자 걸었어!', '손가락으로 책의 그림을 가리키며 이름을 말하기 시작했다', '갑자기 \"사랑해\"라고 했는데 심장이 멎는 줄 알았다'"></textarea>
      <div class="memo-form-actions">
        <button class="memo-cancel-btn" onclick="toggleMemoForm()">취소</button>
        <button class="memo-save-btn" onclick="saveMemo()">저장</button>
      </div>
    </div>
    <div class="memo-list" id="memo-list">
      ${stageMemos.length === 0
        ? `<div class="memo-empty">📝 아직 기록된 메모가 없어요.<br>소중한 순간들을 기록해 두세요.</div>`
        : stageMemos.map(m => renderItem(m)).join('')}
    </div>
    ${historyHTML}
  </div>`;
}

function toggleMemoForm() {
  const f = document.getElementById('memo-form');
  f.classList.toggle('on');
  if (f.classList.contains('on')) document.getElementById('memo-text').focus();
}

function toggleMemoItem(id) {
  const el = document.getElementById('mb' + id);
  if (el) el.classList.toggle('on');
}

function saveMemo() {
  const text = document.getElementById('memo-text').value.trim();
  if (!text) { alert('내용을 입력해 주세요'); return; }
  const memo = {
    id: Date.now().toString(),
    date: document.getElementById('memo-date').value,
    tag: document.getElementById('memo-tag').value,
    text,
    months: curMemoMonths,
    stageLabel: getStageLabel(curMemoMonths)
  };
  memos.unshift(memo);
  saveMemos();
  document.getElementById('memo-text').value = '';
  go();
}

function deleteMemo(id) {
  if (!confirm('이 메모를 삭제할까요?')) return;
  memos = memos.filter(m => m.id !== id);
  saveMemos();
  go();
}

loadMemos();
