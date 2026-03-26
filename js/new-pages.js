/* ═══════════════════════════════════════════════════════════
   BeInside — 신규 가이드 렌더러
   ADHD · 중독 · 금융스트레스 페이지 초기화
   CSS 클래스 기반 렌더링 — pages.css "GUIDE PAGE" 섹션 참조
═══════════════════════════════════════════════════════════ */

/* ── 이스케이프 헬퍼 ── */
function _esc(s) { return typeof s === 'string' ? s.replace(/</g,'&lt;').replace(/>/g,'&gt;') : s; }

/* ── 공통 렌더 헬퍼 ── */
function _guideHero(data) {
  var stat = data.stat
    ? '<div class="guide-stat"><strong>' + _esc(data.stat.pct) + '</strong> ' + _esc(data.stat.label) + '</div>'
    : '';
  return '<div class="guide-hero">'
    + '<h1>' + _esc(data.title) + '</h1>'
    + '<p>' + _esc(data.sub) + '</p>'
    + stat
    + '</div>';
}

function _guideSection(title, html) {
  return '<section class="guide-section">'
    + '<h2>' + _esc(title) + '</h2>'
    + html
    + '</section>';
}

function _guideCards(items) {
  return '<div class="guide-cards">'
    + items.map(function(item) {
      var icon = item.icon || '•';
      var title = item.title || item.name || '';
      var text = item.text || item.desc || '';
      return '<div class="guide-card">'
        + '<div class="guide-card-inner">'
        + '<span class="guide-card-icon" role="img" aria-hidden="true">' + icon + '</span>'
        + '<div class="guide-card-body">'
        + (title ? '<strong class="guide-card-title">' + _esc(title) + '</strong>' : '')
        + '<p class="guide-card-text">' + _esc(text) + '</p>'
        + '</div></div></div>';
    }).join('')
    + '</div>';
}

function _guideCheck(check) {
  if (!check || !check.questions) return '';
  return '<div class="guide-check" id="' + check.id + '">'
    + '<h3 class="guide-check-title">' + _esc(check.title) + '</h3>'
    + check.questions.map(function(q, i) {
      return '<div class="guide-check-item" role="checkbox" aria-checked="false" tabindex="0" data-check-id="' + check.id + '" data-q="' + i + '">'
        + '<div class="guide-check-box" aria-hidden="true"></div>'
        + '<span>' + _esc(q) + '</span>'
        + '</div>';
    }).join('')
    + '<div class="guide-check-result" id="' + check.id + '-result" style="display:none;" aria-live="polite"></div>'
    + '</div>';
}

function _guideHelp(helplines) {
  if (!helplines || !helplines.length) return '';
  var uid = 'help-acc-' + Math.random().toString(36).substr(2, 6);
  return '<section class="guide-section guide-help-section">'
    + '<button class="guide-help-toggle" onclick="this.classList.toggle(\'open\');document.getElementById(\'' + uid + '\').classList.toggle(\'open\')" aria-expanded="false" aria-controls="' + uid + '">'
    + '<span>📞 도움받을 수 있는 곳 <span class="guide-help-count">' + helplines.length + '곳</span></span>'
    + '<span class="guide-help-arrow">▸</span>'
    + '</button>'
    + '<div class="guide-help-body" id="' + uid + '">'
    + '<div class="help-cards">'
    + helplines.map(function(h) {
      var num = h.number.replace(/-/g, '');
      return '<a href="tel:' + num + '" class="help-card" aria-label="' + _esc(h.name) + ' ' + h.number + '">'
        + '<div class="help-card-info">'
        + '<div class="help-card-name">' + _esc(h.name) + '</div>'
        + '<div class="help-card-desc">' + _esc(h.desc) + '</div>'
        + '</div>'
        + '<div class="help-card-num">' + h.number + '</div>'
        + '</a>';
    }).join('')
    + '</div></div></section>';
}

/* ── 체크 이벤트 (클릭 + 키보드) ── */
document.addEventListener('click', _handleCheckToggle);
document.addEventListener('keydown', function(e) {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('guide-check-item')) {
    e.preventDefault();
    _handleCheckToggle({ target: e.target });
  }
});

function _handleCheckToggle(e) {
  var item = e.target.closest('.guide-check-item');
  if (!item) return;

  var isChecked = item.classList.toggle('checked');
  item.setAttribute('aria-checked', isChecked ? 'true' : 'false');
  item.querySelector('.guide-check-box').innerHTML = isChecked ? '✓' : '';

  var checkId = item.dataset.checkId;
  var items = document.querySelectorAll('.guide-check-item[data-check-id="' + checkId + '"]');
  var count = 0;
  items.forEach(function(el) { if (el.classList.contains('checked')) count++; });

  var resultEl = document.getElementById(checkId + '-result');
  if (!resultEl) return;

  var dataMap = { ct_adhd: ADHD_DATA, ct_addiction: ADDICTION_DATA, ct_finance: FINANCE_DATA };
  var data = dataMap[checkId];
  if (!data || !data.check || !data.check.results) return;

  var r = data.check.results;
  var result;
  if (count >= r.high.threshold) result = r.high;
  else if (count >= r.mid.threshold) result = r.mid;
  else result = r.low;

  resultEl.style.display = '';
  var bg = count >= r.high.threshold ? 'var(--mental-risk-bg)' : count >= r.mid.threshold ? 'var(--burnout-p)' : 'var(--lavender-p)';
  resultEl.style.background = bg;
  resultEl.innerHTML = '<strong>' + _esc(result.label) + '</strong>'
    + (result.action ? '<p>' + _esc(result.action) + '</p>' : '');
}

/* ═══════ ADHD 페이지 ═══════ */
function initAdhdPage() {
  var el = document.getElementById('adhd-content');
  if (!el || typeof ADHD_DATA === 'undefined') return;
  var d = ADHD_DATA;

  el.innerHTML = _guideHero(d.intro)
    + _guideSection(d.recognition.title,
        '<ul>' + d.recognition.items.map(function(i) { return '<li>' + _esc(i) + '</li>'; }).join('') + '</ul>')
    + _guideCheck(d.check)
    + _guideSection('ADHD는 어떤 건가요?', '<p>' + _esc(d.psychology) + '</p>')
    + _guideSection('치료와 관리 방법', _guideCards(d.techniques))
    + _guideSection('지금 바로 해볼 수 있는 것', _guideCards(d.actions.immediate))
    + _guideSection(d.workTips.title, _guideCards(d.workTips.items))
    + _guideSection(d.distinction.title,
        '<div class="guide-compare">'
        + '<div class="guide-compare-col" style="background:var(--peach-p)"><strong>ADHD</strong>'
        + d.distinction.adhd.map(function(i) { return '<br>• ' + _esc(i); }).join('') + '</div>'
        + '<div class="guide-compare-col" style="background:var(--warm)"><strong>게으름</strong>'
        + d.distinction.laziness.map(function(i) { return '<br>• ' + _esc(i); }).join('') + '</div>'
        + '</div><p class="guide-compare-note">' + _esc(d.distinction.note) + '</p>')
    + _guideHelp(d.help);
}

/* ═══════ 중독 페이지 ═══════ */
function initAddictionPage() {
  var el = document.getElementById('addiction-content');
  if (!el || typeof ADDICTION_DATA === 'undefined') return;
  var d = ADDICTION_DATA;

  var typesHtml = d.types.map(function(t) {
    return '<details class="guide-accordion">'
      + '<summary>' + t.icon + ' ' + _esc(t.label) + '</summary>'
      + '<ul>' + t.signs.map(function(s) { return '<li>' + _esc(s) + '</li>'; }).join('') + '</ul>'
      + '</details>';
  }).join('');

  el.innerHTML = _guideHero(d.intro)
    + _guideSection('유형별 위험 신호', typesHtml)
    + _guideCheck(d.check)
    + _guideSection('중독은 어떻게 생기나요?', '<p>' + _esc(d.psychology) + '</p>')
    + _guideSection('회복을 위한 방법', _guideCards(d.techniques))
    + _guideSection('지금 바로 해볼 수 있는 것', _guideCards(d.actions.immediate))
    + _guideSection(d.family.title, _guideCards(d.family.items))
    + _guideHelp(d.help);
}

/* ═══════ 금융 스트레스 페이지 ═══════ */
function initFinancePage() {
  var el = document.getElementById('finance-content');
  if (!el || typeof FINANCE_DATA === 'undefined') return;
  var d = FINANCE_DATA;

  el.innerHTML = _guideHero(d.intro)
    + _guideSection(d.recognition.title,
        '<ul>' + d.recognition.items.map(function(i) { return '<li>' + _esc(i) + '</li>'; }).join('') + '</ul>')
    + _guideCheck(d.check)
    + _guideSection('금융 스트레스의 심리학', '<p>' + _esc(d.psychology) + '</p>')
    + _guideSection('마음 돌보기', _guideCards(d.techniques))
    + _guideSection('지금 바로 할 수 있는 것', _guideCards(d.actions.immediate))
    + _guideSection(d.systems.title, _guideCards(d.systems.items))
    + _guideHelp(d.help);
}
