/* ═══════════════════════════════════════════════════════════
   BeInside — 신규 기능 모음 (features.js)
   Part B-7: 상황 판단 툴 | Part B-5: 감정 기록 | Part B-6: 상황 기록
═══════════════════════════════════════════════════════════ */

/* ── 스토리지 키 ── */
const MOOD_KEY    = 'beinside_mood_v1';
const JOURNAL_KEY = 'beinside_journal_v1';

/* ══════════════════════════════════════════════════════
   Part B-7: 상황 판단 툴 공통 컴포넌트
══════════════════════════════════════════════════════ */

/**
 * 상황 판단 체크 툴을 주어진 컨테이너에 렌더링합니다.
 * @param {HTMLElement} container
 * @param {Object} config
 *   config.title       — 도구 제목 (string)
 *   config.questions   — 체크 항목 배열 (string[])
 *   config.results     — { high, mid, low } 각각 { label, threshold, action? }
 *   config.emergencyIndex — 이 인덱스 체크 시 즉시 긴급 연결 (number, optional)
 *   config.emergencyMsg   — 긴급 메시지 (string, optional)
 *   config.id          — 고유 ID (string)
 */
function renderCheckTool(container, config) {
  const id = config.id || ('ct_' + Date.now());
  const checked = new Set();

  const wrap = document.createElement('div');
  wrap.className = 'check-tool';
  wrap.innerHTML = `<div class="check-tool-title">${esc(config.title)}</div>
    <div id="${id}_items"></div>
    <div id="${id}_result" style="display:none"></div>`;
  container.appendChild(wrap);

  const itemsEl = wrap.querySelector(`#${id}_items`);
  const resultEl = wrap.querySelector(`#${id}_result`);

  config.questions.forEach((q, i) => {
    const item = document.createElement('div');
    item.className = 'check-item';
    item.setAttribute('role', 'checkbox');
    item.setAttribute('aria-checked', 'false');
    item.setAttribute('tabindex', '0');
    item.innerHTML = `<div class="check-box"></div><span>${esc(q)}</span>`;

    const toggle = () => {
      const wasChecked = checked.has(i);
      if (wasChecked) {
        checked.delete(i);
        item.classList.remove('checked');
        item.setAttribute('aria-checked', 'false');
        item.querySelector('.check-box').textContent = '';
      } else {
        checked.add(i);
        item.classList.add('checked');
        item.setAttribute('aria-checked', 'true');
        item.querySelector('.check-box').textContent = '✓';

        // 긴급 질문 처리
        if (config.emergencyIndex !== undefined && i === config.emergencyIndex) {
          showCheckResult(resultEl, 'high',
            config.emergencyMsg || '지금 바로 <a href="tel:1393" style="color:inherit;font-weight:700">1393</a>(자살예방상담, 무료·24시간)에 전화해 주세요.',
            true);
          return;
        }
      }
      updateCheckResult(checked.size, config, resultEl);
    };

    item.addEventListener('click', toggle);
    item.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); } });
    itemsEl.appendChild(item);
  });
}

function updateCheckResult(count, config, resultEl) {
  const r = config.results;
  let cls, label, action;
  if (count >= (r.high ? r.high.threshold : 999)) {
    cls = 'high'; label = r.high.label; action = r.high.action || '';
  } else if (count >= (r.mid ? r.mid.threshold : 999)) {
    cls = 'mid'; label = r.mid.label; action = r.mid.action || '';
  } else {
    cls = 'low'; label = r.low ? r.low.label : ''; action = r.low ? (r.low.action || '') : '';
  }
  if (count === 0) { resultEl.style.display = 'none'; return; }
  showCheckResult(resultEl, cls, `<strong>${esc(label)}</strong>${action ? '<br><span style="font-weight:400;margin-top:4px;display:block;">' + action + '</span>' : ''}`, false);
}

function showCheckResult(resultEl, cls, html, isEmergency) {
  resultEl.style.display = 'block';
  resultEl.className = 'check-result ' + cls;
  resultEl.innerHTML = html + '<div class="check-disclaimer">이 결과는 의학적·심리학적 진단이 아닌 참고용이에요. 정확한 진단은 전문가와 상담하세요. 자세한 내용(비밀보장 범위 등)은 전화 시 확인해 주세요.</div>';
  setTimeout(() => resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
}

/* ══════════════════════════════════════════════════════
   Part B-5: 감정 기록
══════════════════════════════════════════════════════ */

function loadMoods() {
  try { return JSON.parse(localStorage.getItem(MOOD_KEY) || '[]'); } catch { return []; }
}

function saveMoods(arr) {
  const cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000;
  localStorage.setItem(MOOD_KEY, JSON.stringify(arr.filter(e => e.timestamp > cutoff)));
}

function getMoodEmoji(mood) {
  return mood === 'okay' ? '🙂' : mood === 'holding' ? '😐' : '😢';
}
function getMoodLabel(mood) {
  return mood === 'okay' ? '괜찮아요' : mood === 'holding' ? '버티는 중' : '많이 힘들어요';
}

function buildMoodWidget(container) {
  const moods = loadMoods();
  const today = new Date().toISOString().split('T')[0];
  const todayEntry = moods.find(m => m.date === today);

  let html = `<div class="journal-entry-form" id="mood-widget-form">
    <div class="mood-label" style="text-align:left;margin-bottom:12px;font-size:14px;">오늘 기분이 어때요?</div>
    <div class="mood-btns" style="justify-content:flex-start;">
      ${['okay','holding','hard'].map(m =>
        `<button class="mood-btn${todayEntry && todayEntry.mood === m ? ' selected' : ''}" onclick="saveMoodEntry('${m}',this)" aria-label="${getMoodLabel(m)}">${getMoodEmoji(m)}<span>${getMoodLabel(m)}</span></button>`
      ).join('')}
    </div>
    <div id="mood-memo-wrap" style="margin-top:14px;display:${todayEntry ? 'block' : 'none'}">
      <textarea class="journal-textarea" id="mood-memo-input" placeholder="오늘 한 줄만 적어볼까요? (선택사항, 최대 100자)" maxlength="100" style="min-height:60px;">${todayEntry ? esc(todayEntry.memo || '') : ''}</textarea>
      <button class="journal-save-btn" onclick="saveMoodMemo()" style="margin-top:8px;">저장</button>
    </div>
  </div>`;

  // 최근 7일 타임라인
  const recent7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const ds = d.toISOString().split('T')[0];
    const entry = moods.find(m => m.date === ds);
    recent7.push(entry ? getMoodEmoji(entry.mood) : '⬜');
  }
  const hardDays = moods.filter(m => {
    const d = new Date(m.date); const now = new Date();
    const diff = (now - d) / (1000 * 60 * 60 * 24);
    return diff <= 7 && m.mood === 'hard';
  }).length;

  let timelineMsg = '최근 7일의 감정 흐름이에요.';
  if (hardDays >= 5) {
    timelineMsg = `힘든 날이 7일 중 ${hardDays}일이에요. 혼자 감당하기 어렵다면 <a href="tel:1577-0199" style="color:var(--peach-d);font-weight:700">1577-0199</a>(정신건강위기상담, 무료·24시간)에 전화해 보세요.`;
  } else if (hardDays >= 3) {
    timelineMsg = `최근 7일 중 ${hardDays}일은 힘들었어요. 괜찮아요, 파도처럼 오르내리는 거예요.`;
  }

  html += `<div class="mood-timeline">${recent7.map(e => `<span class="mood-dot">${e}</span>`).join('')}</div>
    <p class="mood-timeline-msg">${timelineMsg}</p>`;

  container.innerHTML = html;
}

function saveMoodEntry(mood, btnEl) {
  const moods = loadMoods();
  const today = new Date().toISOString().split('T')[0];
  const filtered = moods.filter(m => m.date !== today);
  filtered.push({ date: today, mood, memo: '', timestamp: Date.now() });
  saveMoods(filtered);

  // 버튼 강조
  btnEl.closest('.mood-btns').querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
  btnEl.classList.add('selected');
  document.getElementById('mood-memo-wrap').style.display = 'block';
}

function saveMoodMemo() {
  const memo = (document.getElementById('mood-memo-input').value || '').trim().slice(0, 100);
  const moods = loadMoods();
  const today = new Date().toISOString().split('T')[0];
  const entry = moods.find(m => m.date === today);
  if (entry) { entry.memo = memo; saveMoods(moods); }
  const btn = document.querySelector('#mood-widget-form .journal-save-btn');
  if (btn) { btn.textContent = '저장됐어요 ✓'; setTimeout(() => { btn.textContent = '저장'; }, 1500); }
}

/* ══════════════════════════════════════════════════════
   Part B-6: 상황 기록 (저널)
══════════════════════════════════════════════════════ */

function loadJournal() {
  try { return JSON.parse(localStorage.getItem(JOURNAL_KEY) || '[]'); } catch { return []; }
}

function saveJournal(arr) {
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(arr));
}

const JOURNAL_TAGS = {
  work:         { label: '💼 일·직장', color: 'var(--burnout-d)' },
  relationship: { label: '💔 관계',     color: 'var(--relation-d)' },
  emotion:      { label: '💛 감정',     color: 'var(--amber)' },
  health:       { label: '🏥 건강',     color: '#3A8A50' },
  other:        { label: '📝 기타',     color: 'var(--ink-l)' },
};

let _selectedJournalTag = 'emotion';

function buildJournalForm(container) {
  container.innerHTML = `
    <div class="journal-entry-form">
      <label>태그</label>
      <div class="journal-tag-row" id="journal-tag-row">
        ${Object.entries(JOURNAL_TAGS).map(([k, v]) =>
          `<button class="journal-tag-btn${k === _selectedJournalTag ? ' on' : ''}" onclick="selectJournalTag('${k}',this)">${v.label}</button>`
        ).join('')}
      </div>
      <label>오늘 있었던 일을 적어보세요</label>
      <textarea class="journal-textarea" id="journal-text-input" placeholder="여기에 적은 것은 아무에게도 보이지 않아요." maxlength="500"></textarea>
      <div style="text-align:right;font-size:11px;color:var(--ink-l);margin-top:4px;"><span id="journal-char-count">0</span>/500</div>
      <button class="journal-save-btn" onclick="saveJournalEntry()">저장</button>
    </div>
    <div id="journal-list-wrap"></div>
    <div class="journal-privacy">이 기록은 당신의 기기에만 저장돼요. 서버로 전송되지 않아요.</div>
  `;

  const ta = container.querySelector('#journal-text-input');
  if (ta) ta.addEventListener('input', () => {
    const cc = container.querySelector('#journal-char-count');
    if (cc) cc.textContent = ta.value.length;
  });

  buildJournalList(container.querySelector('#journal-list-wrap'));
}

function selectJournalTag(key, btnEl) {
  _selectedJournalTag = key;
  btnEl.closest('.journal-tag-row').querySelectorAll('.journal-tag-btn').forEach(b => b.classList.remove('on'));
  btnEl.classList.add('on');
}

function saveJournalEntry() {
  const text = (document.getElementById('journal-text-input').value || '').trim();
  if (!text) return;
  const entries = loadJournal();
  entries.unshift({
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
    tag: _selectedJournalTag,
    text: text,
    timestamp: Date.now()
  });
  saveJournal(entries);

  const input = document.getElementById('journal-text-input');
  if (input) input.value = '';
  const cc = document.getElementById('journal-char-count');
  if (cc) cc.textContent = '0';

  const listWrap = document.getElementById('journal-list-wrap');
  if (listWrap) buildJournalList(listWrap);
}

function buildJournalList(container) {
  const entries = loadJournal();
  if (!container) return;
  if (entries.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:var(--ink-l);font-size:13px;padding:20px 0;">아직 기록이 없어요. 오늘의 이야기를 적어보세요.</p>';
    return;
  }
  container.innerHTML = '<div class="journal-list">' +
    entries.slice(0, 30).map(e => {
      const tag = JOURNAL_TAGS[e.tag] || JOURNAL_TAGS.other;
      const preview = e.text.length > 40 ? e.text.slice(0, 40) + '…' : e.text;
      return `<div class="journal-item">
        <div class="journal-item-header" onclick="toggleJournalItem(this)">
          <span class="journal-item-date">${e.date}</span>
          <span class="journal-item-tag" style="color:${tag.color}">${tag.label}</span>
          <span class="journal-item-preview">${esc(preview)}</span>
        </div>
        <div class="journal-item-body">${esc(e.text)}</div>
      </div>`;
    }).join('') +
  '</div>';
}

function toggleJournalItem(headerEl) {
  const body = headerEl.nextElementSibling;
  if (body) body.classList.toggle('open');
}

/* ══════════════════════════════════════════════════════
   기록 페이지 렌더링
══════════════════════════════════════════════════════ */

function renderJournalPage() {
  const container = document.getElementById('journal-content');
  if (!container) return;

  container.innerHTML = `
    <div class="journal-tabs" role="tablist">
      <button class="journal-tab on" id="jtab-mood" onclick="switchJournalTab('mood',this)" role="tab" aria-selected="true">😊 감정 기록</button>
      <button class="journal-tab" id="jtab-journal" onclick="switchJournalTab('journal',this)" role="tab" aria-selected="false">📓 상황 기록</button>
    </div>
    <div id="journal-tab-mood"></div>
    <div id="journal-tab-journal" style="display:none"></div>
  `;

  buildMoodWidget(container.querySelector('#journal-tab-mood'));
  buildJournalForm(container.querySelector('#journal-tab-journal'));
}

function switchJournalTab(tab, btnEl) {
  document.querySelectorAll('.journal-tab').forEach(b => { b.classList.remove('on'); b.setAttribute('aria-selected', 'false'); });
  btnEl.classList.add('on'); btnEl.setAttribute('aria-selected', 'true');
  document.getElementById('journal-tab-mood').style.display    = tab === 'mood'    ? '' : 'none';
  document.getElementById('journal-tab-journal').style.display = tab === 'journal' ? '' : 'none';
}
