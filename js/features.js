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
            config.emergencyMsg || '지금 바로 <a href="tel:109" style="color:inherit;font-weight:700">109</a>(자살예방상담, 무료·24시간)에 전화해 주세요.',
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
  setTimeout(() => resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 150);
}

/* ══════════════════════════════════════════════════════
   Part B-5: 감정 기록
══════════════════════════════════════════════════════ */

function loadMoods() {
  try {
    const store = (curPage === 'teen') ? sessionStorage : localStorage;
    return JSON.parse(store.getItem(MOOD_KEY) || '[]');
  } catch { return []; }
}

function saveMoods(arr) {
  const cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000;
  const trimmed = JSON.stringify(arr.filter(e => e.timestamp > cutoff));
  const store = (typeof curPage !== 'undefined' && curPage === 'teen') ? sessionStorage : localStorage;
  store.setItem(MOOD_KEY, trimmed);
}

var MOOD_MAP = {
  great:    { emoji: '😊', label: '좋아요' },
  okay:     { emoji: '🙂', label: '괜찮아요' },
  soso:     { emoji: '😐', label: '그저 그래요' },
  holding:  { emoji: '😐', label: '버티는 중' },  /* 하위 호환 */
  hard:     { emoji: '😔', label: '힘들어요' },
  veryhard: { emoji: '😢', label: '많이 힘들어요' }
};
function getMoodEmoji(mood) {
  return (MOOD_MAP[mood] || MOOD_MAP.soso).emoji;
}
function getMoodLabel(mood) {
  return (MOOD_MAP[mood] || MOOD_MAP.soso).label;
}

function formatMoodDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const today = new Date(); today.setHours(0,0,0,0);
  const diff = Math.floor((today - d) / 86400000);
  if (diff === 0) return '오늘';
  if (diff === 1) return '어제';
  if (diff < 7) return diff + '일 전';
  return (d.getMonth()+1) + '월 ' + d.getDate() + '일';
}

function buildMoodWidget(container) {
  const moods = loadMoods();
  const today = new Date().toISOString().split('T')[0];
  const todayEntry = moods.find(m => m.date === today);

  let html = `<div class="jn-card jn-card-mood" id="mood-widget-form">
    <div class="jn-card-header">
      <span class="jn-card-icon">🌤</span>
      <div>
        <div class="jn-card-title">오늘 기분이 어때요?</div>
        <div class="jn-card-sub">하루 한 번, 나의 마음을 기록해요</div>
      </div>
    </div>
    <div class="mood-btns mood-btns--5">
      ${['great','okay','soso','hard','veryhard'].map(m =>
        `<button class="mood-btn${todayEntry && todayEntry.mood === m ? ' selected' : ''}" data-mood="${m}" onclick="saveMoodEntry('${m}',this)" aria-label="${getMoodLabel(m)}">
          <span class="mood-btn-emoji">${getMoodEmoji(m)}</span>
          <span class="mood-btn-label">${getMoodLabel(m)}</span>
        </button>`
      ).join('')}
    </div>
    <div id="mood-memo-wrap" class="mood-memo-wrap${todayEntry ? ' show' : ''}">
      <textarea class="jn-textarea" id="mood-memo-input" placeholder="오늘 한 줄만 적어볼까요? (선택사항)" maxlength="100" rows="2">${todayEntry ? esc(todayEntry.memo || '') : ''}</textarea>
      <button class="jn-btn-save" onclick="saveMoodMemo()">메모 저장</button>
    </div>
  </div>`;

  // 최근 7일 타임라인
  const recent7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const ds = d.toISOString().split('T')[0];
    const dayLabel = ['일','월','화','수','목','금','토'][d.getDay()];
    const entry = moods.find(m => m.date === ds);
    recent7.push({ emoji: entry ? getMoodEmoji(entry.mood) : '·', day: dayLabel, isToday: i === 0 });
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

  html += `<div class="jn-timeline-card">
    <div class="jn-timeline-row">${recent7.map(e =>
      `<div class="jn-timeline-day${e.isToday ? ' today' : ''}">
        <span class="jn-timeline-emoji">${e.emoji}</span>
        <span class="jn-timeline-label">${e.day}</span>
      </div>`
    ).join('')}</div>
    <p class="jn-timeline-msg">${timelineMsg}</p>
  </div>`;

  // 감정 기록 히스토리
  html += buildMoodHistory(moods);

  container.innerHTML = html;
}

function buildMoodHistory(moods) {
  const sorted = [...moods].sort((a,b) => b.timestamp - a.timestamp);
  if (sorted.length === 0) return '';

  let html = `<div class="jn-history-section">
    <div class="jn-section-title">지난 기록</div>
    <div class="jn-history-list">`;
  sorted.slice(0, 30).forEach(m => {
    html += `<div class="jn-history-item">
      <div class="jn-history-left">
        <span class="jn-history-emoji">${getMoodEmoji(m.mood)}</span>
        <div class="jn-history-info">
          <span class="jn-history-mood">${getMoodLabel(m.mood)}</span>
          <span class="jn-history-date">${formatMoodDate(m.date)}</span>
        </div>
      </div>
      ${m.memo ? `<div class="jn-history-memo">${esc(m.memo)}</div>` : ''}
      <button class="jn-delete-btn" onclick="deleteMoodEntry('${m.date}',this)" aria-label="삭제">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4.5 3V2.5C4.5 1.67 5.17 1 6 1h4c.83 0 1.5.67 1.5 1.5V3m2 0H2.5m2 0v9.5c0 .83.67 1.5 1.5 1.5h4c.83 0 1.5-.67 1.5-1.5V3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>`;
  });
  html += '</div></div>';
  return html;
}

function deleteMoodEntry(date, btnEl) {
  const item = btnEl.closest('.jn-history-item');
  if (item) {
    item.style.transition = 'opacity .35s cubic-bezier(.2,0,0,1), transform .35s cubic-bezier(.2,0,0,1)';
    item.style.opacity = '0';
    item.style.transform = 'translateX(20px) scale(.96)';
  }
  setTimeout(() => {
    const moods = loadMoods().filter(m => m.date !== date);
    saveMoods(moods);
    const wrap = document.getElementById('journal-tab-mood');
    if (wrap) buildMoodWidget(wrap);
  }, 350);
}

function saveMoodEntry(mood, btnEl) {
  const moods = loadMoods();
  const today = new Date().toISOString().split('T')[0];
  const existing = moods.find(m => m.date === today);
  const filtered = moods.filter(m => m.date !== today);
  filtered.push({ date: today, mood, memo: existing ? existing.memo : '', timestamp: Date.now() });
  saveMoods(filtered);

  btnEl.closest('.mood-btns').querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
  btnEl.classList.add('selected');
  btnEl.classList.add('mood-ripple');
  setTimeout(() => { btnEl.classList.remove('mood-ripple'); }, 400);
  document.querySelector('.mood-memo-wrap').classList.add('show');

  // 타임라인과 히스토리 갱신
  const wrap = document.getElementById('journal-tab-mood');
  if (wrap) buildMoodWidget(wrap);
}

function saveMoodMemo() {
  const memo = (document.getElementById('mood-memo-input').value || '').trim().slice(0, 100);
  const moods = loadMoods();
  const today = new Date().toISOString().split('T')[0];
  const entry = moods.find(m => m.date === today);
  if (entry) { entry.memo = memo; saveMoods(moods); }
  const btn = document.querySelector('#mood-widget-form .jn-btn-save');
  if (btn) {
    btn.innerHTML = '<span class="save-check">✓</span> 저장됐어요';
    btn.classList.add('saved');
    setTimeout(() => { btn.innerHTML = '메모 저장'; btn.classList.remove('saved'); }, 1500);
  }
}

/* ══════════════════════════════════════════════════════
   Part B-6: 상황 기록 (저널)
══════════════════════════════════════════════════════ */

function loadJournal() {
  try {
    const store = (typeof curPage !== 'undefined' && curPage === 'teen') ? sessionStorage : localStorage;
    return JSON.parse(store.getItem(JOURNAL_KEY) || '[]');
  } catch { return []; }
}

function saveJournal(arr) {
  const store = (typeof curPage !== 'undefined' && curPage === 'teen') ? sessionStorage : localStorage;
  store.setItem(JOURNAL_KEY, JSON.stringify(arr));
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
    <div class="jn-card jn-card-write">
      <div class="jn-card-header">
        <span class="jn-card-icon">✏️</span>
        <div>
          <div class="jn-card-title">오늘 있었던 일</div>
          <div class="jn-card-sub">마음속에 담아두지 않아도 괜찮아요</div>
        </div>
      </div>
      <div class="jn-tag-row" id="journal-tag-row">
        ${Object.entries(JOURNAL_TAGS).map(([k, v]) =>
          `<button class="jn-tag${k === _selectedJournalTag ? ' on' : ''}" onclick="selectJournalTag('${k}',this)">${v.label}</button>`
        ).join('')}
      </div>
      <div class="jn-textarea-wrap">
        <textarea class="jn-textarea" id="journal-text-input" placeholder="여기에 적은 것은 아무에게도 보이지 않아요." maxlength="500" rows="4"></textarea>
        <span class="jn-char-count"><span id="journal-char-count">0</span>/500</span>
      </div>
      <button class="jn-btn-save" onclick="saveJournalEntry()">기록 저장</button>
    </div>
    <div id="journal-list-wrap"></div>
    <div class="jn-privacy">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="vertical-align:-2px;margin-right:4px"><path d="M3.5 6V4.5a3.5 3.5 0 017 0V6M2 6h10v6.5a1 1 0 01-1 1H3a1 1 0 01-1-1V6z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      이 기록은 당신의 기기에만 저장돼요. 서버로 전송되지 않아요.
    </div>
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
  btnEl.closest('.jn-tag-row').querySelectorAll('.jn-tag').forEach(b => b.classList.remove('on'));
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

  // ✓ 아이콘 + pulse 피드백
  const btn = document.querySelector('.jn-card-write .jn-btn-save');
  if (btn) {
    btn.innerHTML = '<span class="save-check">✓</span> 저장됐어요';
    btn.classList.add('saved');
    setTimeout(() => { btn.innerHTML = '기록 저장'; btn.classList.remove('saved'); }, 1500);
  }

  const listWrap = document.getElementById('journal-list-wrap');
  if (listWrap) {
    buildJournalList(listWrap);
    // 새 항목 slideDown + scrollIntoView
    const firstItem = listWrap.querySelector('.jn-journal-item');
    if (firstItem) {
      firstItem.classList.add('jn-item-enter');
      firstItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

function deleteJournalEntry(id, btnEl) {
  const item = btnEl.closest('.jn-journal-item');
  if (item) {
    item.style.transition = 'opacity .35s cubic-bezier(.2,0,0,1), transform .35s cubic-bezier(.2,0,0,1)';
    item.style.opacity = '0';
    item.style.transform = 'translateX(20px) scale(.96)';
  }
  setTimeout(() => {
    const entries = loadJournal().filter(e => e.id !== id);
    saveJournal(entries);
    const listWrap = document.getElementById('journal-list-wrap');
    if (listWrap) buildJournalList(listWrap);
  }, 350);
}

function buildJournalList(container) {
  const entries = loadJournal();
  if (!container) return;
  if (entries.length === 0) {
    container.innerHTML = `<div class="jn-empty">
      <span class="jn-empty-icon">📖</span>
      <p>아직 기록이 없어요</p>
      <p class="jn-empty-sub">오늘의 이야기를 적어보세요</p>
    </div>`;
    return;
  }

  container.innerHTML = `<div class="jn-history-section">
    <div class="jn-section-title">지난 기록</div>
    <div class="jn-journal-list">` +
    entries.slice(0, 30).map(e => {
      const tag = JOURNAL_TAGS[e.tag] || JOURNAL_TAGS.other;
      return `<div class="jn-journal-item">
        <div class="jn-journal-header" onclick="toggleJournalItem(this)">
          <div class="jn-journal-meta">
            <span class="jn-journal-tag">${tag.label}</span>
            <span class="jn-journal-date">${formatMoodDate(e.date)}</span>
          </div>
          <span class="jn-journal-preview">${esc(e.text.length > 50 ? e.text.slice(0,50) + '…' : e.text)}</span>
          <span class="jn-journal-chevron">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </div>
        <div class="jn-journal-body">
          <p>${esc(e.text)}</p>
          <button class="jn-delete-btn" onclick="deleteJournalEntry('${e.id}',this)" aria-label="이 기록 삭제">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4.5 3V2.5C4.5 1.67 5.17 1 6 1h4c.83 0 1.5.67 1.5 1.5V3m2 0H2.5m2 0v9.5c0 .83.67 1.5 1.5 1.5h4c.83 0 1.5-.67 1.5-1.5V3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            삭제
          </button>
        </div>
      </div>`;
    }).join('') +
  '</div></div>';
}

function toggleJournalItem(headerEl) {
  const item = headerEl.closest('.jn-journal-item');
  if (item) item.classList.toggle('open');
}

/* ══════════════════════════════════════════════════════
   기록 페이지 렌더링
══════════════════════════════════════════════════════ */

function renderJournalPage() {
  const container = document.getElementById('journal-content');
  if (!container) return;

  const moodCount = loadMoods().length;
  const journalCount = loadJournal().length;

  container.innerHTML = `
    <div class="jn-hero">
      <div class="jn-hero-icon">📝</div>
      <h2 class="jn-hero-title">나의 기록</h2>
      <p class="jn-hero-sub">기록은 나를 이해하는 첫걸음이에요</p>
    </div>
    <div class="jn-tabs" role="tablist">
      <button class="jn-tab on" id="jtab-mood" onclick="switchJournalTab('mood',this)" role="tab" aria-selected="true">
        <span class="jn-tab-icon">🌤</span>감정<span class="jn-tab-count">${moodCount}</span>
      </button>
      <button class="jn-tab" id="jtab-journal" onclick="switchJournalTab('journal',this)" role="tab" aria-selected="false">
        <span class="jn-tab-icon">✏️</span>상황<span class="jn-tab-count">${journalCount}</span>
      </button>
    </div>
    <div id="journal-tab-mood" class="jn-tab-content"></div>
    <div id="journal-tab-journal" class="jn-tab-content" style="display:none"></div>
  `;

  buildMoodWidget(container.querySelector('#journal-tab-mood'));
  buildJournalForm(container.querySelector('#journal-tab-journal'));
}

function switchJournalTab(tab, btnEl) {
  document.querySelectorAll('.jn-tab').forEach(b => { b.classList.remove('on'); b.setAttribute('aria-selected', 'false'); });
  btnEl.classList.add('on'); btnEl.setAttribute('aria-selected', 'true');
  document.getElementById('journal-tab-mood').style.display    = tab === 'mood'    ? '' : 'none';
  document.getElementById('journal-tab-journal').style.display = tab === 'journal' ? '' : 'none';
}
