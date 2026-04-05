/* ═══════════════════════════════════════════════════════════
   BeInside — 통합 가이드 렌더러
   공통 헬퍼 함수 + 전체 가이드 페이지 초기화
   CSS 클래스 기반 렌더링 — pages.css 참조
═══════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════
   1. 공통 렌더 헬퍼
══════════════════════════════════════════════════════ */

/* ── 히어로 영역 ── */
function _guideHero(data) {
  var stat = data.stat
    ? '<div class="guide-stat"><strong>' + esc(data.stat.pct) + '</strong> ' + esc(data.stat.label) + '</div>'
    : '';
  return '<div class="guide-hero">'
    + '<h1>' + esc(data.title) + '</h1>'
    + '<p>' + esc(data.sub) + '</p>'
    + stat
    + '</div>';
}

/* ── 섹션 래퍼 ── */
function _guideSection(title, html) {
  return '<section class="guide-section">'
    + '<h2>' + esc(title) + '</h2>'
    + html
    + '</section>';
}

/* ── 카드 그리드 ── */
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
        + (title ? '<strong class="guide-card-title">' + esc(title) + '</strong>' : '')
        + '<p class="guide-card-text">' + esc(text) + '</p>'
        + '</div></div></div>';
    }).join('')
    + '</div>';
}

/* ── 도움 연결 (접이식) ── */
function _guideHelp(helplines) {
  if (!helplines || !helplines.length) return '';
  var uid = 'help-acc-' + Math.random().toString(36).substr(2, 6);
  return '<section class="guide-section guide-help-section">'
    + '<button class="guide-help-toggle" onclick="this.classList.toggle(\'open\');this.setAttribute(\'aria-expanded\',this.classList.contains(\'open\'));document.getElementById(\'' + uid + '\').classList.toggle(\'open\')" aria-expanded="false" aria-controls="' + uid + '">'
    + '<span>📞 도움받을 수 있는 곳 <span class="guide-help-count">' + helplines.length + '곳</span></span>'
    + '<span class="guide-help-arrow">▸</span>'
    + '</button>'
    + '<div class="guide-help-body" id="' + uid + '">'
    + '<div class="help-cards">'
    + helplines.map(function(h) {
      var num = h.number.replace(/-/g, '');
      return '<a href="tel:' + num + '" class="help-card" aria-label="' + esc(h.name) + ' ' + h.number + '">'
        + '<div class="help-card-info">'
        + '<div class="help-card-name">' + esc(h.name) + '</div>'
        + '<div class="help-card-desc">' + esc(h.desc) + '</div>'
        + '</div>'
        + '<div class="help-card-num">' + h.number + '</div>'
        + '</a>';
    }).join('')
    + '</div></div></section>';
}

/* ── 2열 비교 그리드 ── */
function _guideCompare(distinction) {
  if (!distinction) return '';
  var cols = Object.keys(distinction).filter(function(k) {
    return k !== 'title' && k !== 'note' && Array.isArray(distinction[k]);
  });
  return '<div class="guide-compare">'
    + cols.map(function(k, i) {
      var bg = i === 0 ? 'var(--peach-p)' : 'var(--warm)';
      return '<div class="guide-compare-col" style="background:' + bg + '"><strong>' + esc(k) + '</strong>'
        + distinction[k].map(function(item) { return '<br>• ' + esc(item); }).join('')
        + '</div>';
    }).join('')
    + '</div>'
    + (distinction.note ? '<p class="guide-compare-note">' + esc(distinction.note) + '</p>' : '');
}

/* ── 인식 목록 ── */
function _guideRecognition(data) {
  if (!data) return '';
  // string 형태 (상황기반 페이지)
  if (typeof data === 'string') {
    return '<div class="step-section"><p style="font-size:13.5px;color:var(--ink-m);line-height:1.8;word-break:keep-all;">' + esc(data) + '</p></div>';
  }
  // object 형태 { title, items }
  var title = data.title || '지금 이런 상태인가요?';
  var items = data.items || [];
  return '<div class="step-section">'
    + '<div class="step-label">' + esc(title) + '</div>'
    + '<div class="recognition-list">'
    + items.map(function(item) {
      return '<div class="recognition-item"><span class="recognition-dot">•</span><span>' + esc(item) + '</span></div>';
    }).join('')
    + '<p class="recognition-hint">하나라도 해당된다면, 아래 내용을 천천히 살펴보세요.</p>'
    + '</div></div>';
}

/* ── 아코디언 단일 아이템 ── */
function _guideAccordion(title, html) {
  return '<div class="accordion-item">'
    + '<div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">'
    + '<span>' + title + '</span><span class="accordion-arrow">▼</span>'
    + '</div>'
    + '<div class="accordion-body"><div class="accordion-body-inner">'
    + html
    + '</div></div></div>';
}

/* ── 아코디언 그룹 ── */
function _guideAccordionGroup(items) {
  return '<div class="accordion-group">'
    + items.map(function(item) {
      return _guideAccordion(item.title, item.html);
    }).join('')
    + '</div>';
}

/* ── 행동 체크리스트 ── */
function _guideActions(actions) {
  if (!actions || !actions.length) return '';
  return '<div class="action-checklist">'
    + actions.map(function(a) {
      return '<div class="action-item" onclick="toggleAction(this)" role="checkbox" aria-checked="false" tabindex="0">'
        + '<div class="action-check" aria-hidden="true"></div>'
        + '<div class="action-text"><span class="action-emoji">' + (a.icon || '') + '</span><span>' + esc(a.text) + '</span></div>'
        + '</div>';
    }).join('')
    + '</div>';
}

/* ── 상황 선택 그리드 ── */
function _guideSituationPicker(cfg) {
  // cfg: { situations, containerId, buildFn, heroTitle, heroSub, heroIcon, heroGradient, extraButtons }
  var heroStyle = cfg.heroGradient ? ' style="background:linear-gradient(135deg,' + cfg.heroGradient + ')"' : '';
  var btns = cfg.situations.map(function(s) {
    return '<button class="emotion-btn" onclick="' + cfg.buildFn + '(document.getElementById(\'' + cfg.containerId + '\'),\'' + s.id + '\')" aria-label="' + esc(s.label) + '">'
      + '<span class="emotion-btn-icon">' + s.icon + '</span>'
      + '<div>'
      + '<div style="font-size:13.5px;font-weight:600;">' + esc(s.label) + '</div>'
      + (s.sub ? '<div style="font-size:11.5px;color:var(--ink-l);">' + esc(s.sub) + '</div>' : '')
      + '</div>'
      + '</button>';
  }).join('');

  return '<button class="page-back" onclick="goHome()">← 홈으로</button>'
    + '<div class="content-hero"' + heroStyle + '>'
    + '<span class="content-hero-icon">' + (cfg.heroIcon || '') + '</span>'
    + '<h1>' + esc(cfg.heroTitle) + '</h1>'
    + '<p>' + (cfg.heroSub || '') + '</p>'
    + '</div>'
    + '<div class="step-section">'
    + '<div class="step-label">' + esc(cfg.stepLabel || '어떤 상황이에요?') + '</div>'
    + '<div class="emotion-grid">'
    + btns
    + (cfg.extraButtons || '')
    + '</div></div>';
}

/* ── 상황별 상세 렌더러 ── */
function _guideSituationDetail(container, data, cfg) {
  // cfg: { renderFn (상황 목록 복귀), containerId, checkId }
  if (!data) return;

  var techHTML = data.techniques ? data.techniques.map(function(t) {
    return '<div class="technique-item">'
      + '<div class="technique-name">' + esc(t.name) + '</div>'
      + '<p class="technique-desc">' + esc(t.desc) + '</p>'
      + '</div>';
  }).join('') : '';

  var actionsHTML = '';
  if (Array.isArray(data.actions)) {
    actionsHTML = _guideAccordion('✅ 지금 바로 할 수 있는 것', _guideActions(data.actions));
  } else if (data.actions) {
    // {immediate, week, longterm} 구조
    var parts = [];
    if (data.actions.immediate) parts.push(_guideAccordion('⏸️ 오늘 당장 할 수 있는 것', _guideActions(data.actions.immediate)));
    if (data.actions.week) parts.push(_guideAccordion('📅 이번 주에 시도해볼 것', _guideActions(data.actions.week)));
    if (data.actions.longterm) parts.push(_guideAccordion('🔄 장기적으로', _guideActions(data.actions.longterm)));
    actionsHTML = parts.join('');
  }

  var checkWrapId = cfg.checkId || ('check-wrap-' + Math.random().toString(36).substr(2, 6));

  var helpHTML = '';
  if (data.help && data.help.length) {
    helpHTML = _guideAccordion('📞 도움 연결',
      '<div class="help-cards">'
      + data.help.map(function(h) {
        return '<a href="tel:' + h.number.replace(/-/g, '') + '" class="help-card" aria-label="' + esc(h.name) + ' ' + h.number + '">'
          + '<div class="help-card-num">📞 ' + h.number + '</div>'
          + '<div class="help-card-info">'
          + '<div class="help-card-name">' + esc(h.name) + '</div>'
          + '<div class="help-card-desc">' + esc(h.desc) + '</div>'
          + '</div></a>';
      }).join('')
      + '</div>');
  }

  container.innerHTML =
    '<button class="page-back" onclick="' + cfg.renderFn + '(document.getElementById(\'' + cfg.containerId + '\'))">← 뒤로</button>'
    + (data.recognition ? '<div class="step-section"><p style="font-size:13.5px;color:var(--ink-m);line-height:1.8;word-break:keep-all;">' + esc(data.recognition) + '</p></div>' : '')
    + '<div class="accordion-group">'
    + (data.psychology ? _guideAccordion('🧠 왜 이런 감정이 드는 걸까?', '<p style="font-size:13px;color:var(--ink-m);line-height:1.8;word-break:keep-all;">' + esc(data.psychology) + '</p>') : '')
    + (techHTML ? _guideAccordion('💡 정신의학적 자기 돌봄법', techHTML) : '')
    + (data.check ? _guideAccordion('🔍 상황 판단', '<div id="' + checkWrapId + '"></div>') : '')
    + actionsHTML
    + helpHTML
    + '</div>';

  // 체크 툴 주입
  if (data.check) {
    var checkWrap = container.querySelector('#' + checkWrapId);
    if (checkWrap && typeof renderCheckTool === 'function') {
      renderCheckTool(checkWrap, data.check);
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ══════════════════════════════════════════════════════
   2. 페이지 초기화 — ADHD · 중독 · 금융스트레스
══════════════════════════════════════════════════════ */

/* ═══════ ADHD 페이지 ═══════ */
function initAdhdPage() {
  var el = document.getElementById('adhd-content');
  if (!el || typeof ADHD_DATA === 'undefined') return;
  var d = ADHD_DATA;

  el.innerHTML = _guideHero(d.intro)
    + _guideSection(d.recognition.title,
        '<ul>' + d.recognition.items.map(function(i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>')
    + '<div class="guide-check" id="adhd-check-wrap"></div>'
    + _guideSection('ADHD는 어떤 건가요?', '<p>' + esc(d.psychology) + '</p>')
    + _guideSection('치료와 관리 방법', _guideCards(d.techniques))
    + _guideSection('지금 바로 해볼 수 있는 것', _guideCards(d.actions.immediate))
    + _guideSection(d.workTips.title, _guideCards(d.workTips.items))
    + _guideSection(d.distinction.title,
        _guideCompare(d.distinction)
    )
    + _guideHelp(d.help);

  var chk = el.querySelector('#adhd-check-wrap');
  if (chk && typeof renderCheckTool === 'function') renderCheckTool(chk, d.check);
}

/* ═══════ 중독 페이지 ═══════ */
function initAddictionPage() {
  var el = document.getElementById('addiction-content');
  if (!el || typeof ADDICTION_DATA === 'undefined') return;
  var d = ADDICTION_DATA;

  var typesHtml = d.types.map(function(t) {
    return '<details class="guide-accordion">'
      + '<summary>' + t.icon + ' ' + esc(t.label) + '</summary>'
      + '<ul>' + t.signs.map(function(s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>'
      + '</details>';
  }).join('');

  el.innerHTML = _guideHero(d.intro)
    + _guideSection('유형별 위험 신호', typesHtml)
    + '<div class="guide-check" id="addiction-check-wrap"></div>'
    + _guideSection('중독은 어떻게 생기나요?', '<p>' + esc(d.psychology) + '</p>')
    + _guideSection('회복을 위한 방법', _guideCards(d.techniques))
    + _guideSection('지금 바로 해볼 수 있는 것', _guideCards(d.actions.immediate))
    + _guideSection(d.family.title, _guideCards(d.family.items))
    + _guideHelp(d.help);

  var chk = el.querySelector('#addiction-check-wrap');
  if (chk && typeof renderCheckTool === 'function') renderCheckTool(chk, d.check);
}

/* ═══════ 금융 스트레스 페이지 ═══════ */
function initFinancePage() {
  var el = document.getElementById('finance-content');
  if (!el || typeof FINANCE_DATA === 'undefined') return;
  var d = FINANCE_DATA;

  el.innerHTML = _guideHero(d.intro)
    + _guideSection(d.recognition.title,
        '<ul>' + d.recognition.items.map(function(i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>')
    + '<div class="guide-check" id="finance-check-wrap"></div>'
    + _guideSection('금융 스트레스의 심리학', '<p>' + esc(d.psychology) + '</p>')
    + _guideSection('마음 돌보기', _guideCards(d.techniques))
    + _guideSection('지금 바로 할 수 있는 것', _guideCards(d.actions.immediate))
    + _guideSection(d.systems.title, _guideCards(d.systems.items))
    + _guideHelp(d.help);

  var chk = el.querySelector('#finance-check-wrap');
  if (chk && typeof renderCheckTool === 'function') renderCheckTool(chk, d.check);
}


/* ══════════════════════════════════════════════════════
   3. 페이지 초기화 — 번아웃 · 산후 · 갱년기 · 직장
══════════════════════════════════════════════════════ */

/* ═══════ 번아웃 페이지 ═══════ */
function renderBurnoutPage(container) {
  if (!container || typeof BURNOUT_DATA === 'undefined') return;
  var d = BURNOUT_DATA;
  var checkWrapId = 'burnout-check-wrap';

  container.innerHTML =
    '<button class="page-back" onclick="goHome()">← 홈으로</button>'
    + '<div class="content-hero" style="background:linear-gradient(135deg,var(--burnout-d),var(--burnout))">'
    + '<span class="content-hero-icon">🫠</span>'
    + '<h1>' + esc(d.intro.title) + '</h1>'
    + '<p>' + esc(d.intro.sub) + '</p>'
    + '</div>'
    + '<div class="stat-badge"><strong>' + d.intro.stat.pct + '</strong>&nbsp;' + esc(d.intro.stat.label) + '</div>'
    + _guideRecognition(d.recognition)
    + '<div class="accordion-group">'
    + (d.psychology ? _guideAccordion('🧠 번아웃, 뇌에서 무슨 일이 일어나고 있는 걸까?',
        '<p class="psychology-text">' + esc(d.psychology) + '</p>') : '')
    + (d.techniques ? _guideAccordion('💡 정신의학적 자기 회복법',
        d.techniques.map(function(t) {
          return '<div class="technique-item"><div class="technique-name">' + esc(t.name) + '</div><p class="technique-desc">' + esc(t.desc) + '</p></div>';
        }).join('')) : '')
    + _guideAccordion('🔍 상황 판단', '<div id="' + checkWrapId + '"></div>')
    + _guideAccordion('⏸️ 오늘 당장 할 수 있는 것', _guideActions(d.actions.immediate))
    + _guideAccordion('📅 이번 주에 시도해볼 것', _guideActions(d.actions.week))
    + _guideAccordion('🔄 번아웃에서 빠져나오기 위해', _guideActions(d.actions.longterm))
    + _guideAccordion(esc(d.distinction.title),
        '<div class="distinction-grid">'
        + '<div class="distinction-col burnout"><div class="distinction-col-title">번아웃</div>'
        + '<ul>' + d.distinction.burnout.map(function(t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>'
        + '<div class="distinction-col depression"><div class="distinction-col-title">우울증</div>'
        + '<ul>' + d.distinction.depression.map(function(t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>'
        + '</div><p class="distinction-note">' + esc(d.distinction.note) + '</p>')
    + _guideAccordion('📞 도움 연결',
        '<div class="help-cards">'
        + d.help.map(function(h) {
          return '<a href="tel:' + h.number.replace(/-/g, '') + '" class="help-card" aria-label="' + esc(h.name) + ' ' + h.number + '">'
            + '<div class="help-card-num">📞 ' + h.number + '</div>'
            + '<div class="help-card-info"><div class="help-card-name">' + esc(h.name) + '</div><div class="help-card-desc">' + esc(h.desc) + '</div></div></a>';
        }).join('')
        + '</div>')
    + '</div>';

  var checkWrap = container.querySelector('#' + checkWrapId);
  if (checkWrap && typeof renderCheckTool === 'function') renderCheckTool(checkWrap, d.check);
}


/* ══════════════════════════════════════════════════════
   3-2. 산후우울증 · 갱년기 · 직장
══════════════════════════════════════════════════════ */

/* ═══════ 산후우울증 페이지 ═══════ */
function renderPostpartumPage(container) {
  if (!container || typeof POSTPARTUM_DATA === 'undefined') return;
  var d = POSTPARTUM_DATA;
  var checkWrapId = 'postpartum-check-wrap';

  var distHTML = d.science.distinctions.map(function(di) {
    return '<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;">'
      + '<span style="font-size:20px;flex-shrink:0;">' + di.icon + '</span>'
      + '<div>'
      + '<div style="font-size:13px;font-weight:700;color:var(--peach-d);margin-bottom:2px;">' + esc(di.name) + '</div>'
      + '<p style="font-size:12.5px;color:var(--ink-m);line-height:1.7;word-break:keep-all;">' + esc(di.desc) + '</p>'
      + '</div></div>';
  }).join('');

  container.innerHTML =
    '<button class="page-back" onclick="goHome()">← 홈으로</button>'
    + '<div class="content-hero" style="background:linear-gradient(135deg,var(--hero-postpartum-from),var(--hero-postpartum-to))">'
    + '<span class="content-hero-icon">🌸</span>'
    + '<h1>' + esc(d.intro.title) + '</h1>'
    + '<p>' + esc(d.intro.sub) + '</p>'
    + '</div>'
    + '<div class="stat-badge"><strong>' + d.intro.stat.pct + '</strong>&nbsp;' + esc(d.intro.stat.label) + '</div>'
    + _guideRecognition(d.recognition)
    + '<div class="accordion-group">'
    + _guideAccordion('🧠 ' + esc(d.science.title),
        '<p style="font-size:13px;color:var(--ink-m);line-height:1.8;word-break:keep-all;margin-bottom:16px;">' + esc(d.science.text) + '</p>'
        + '<div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:10px;">베이비 블루스 vs 산후우울증 vs 산후 정신병</div>'
        + distHTML)
    + _guideAccordion('🔍 상황 판단 — 자가 체크', '<div id="' + checkWrapId + '"></div>')
    + _guideAccordion('⏸️ 오늘 당장 할 수 있는 것', _guideActions(d.actions.immediate))
    + _guideAccordion('📅 이번 주에 시도해볼 것', _guideActions(d.actions.week))
    + _guideAccordion('🏥 전문적 도움 받기', _guideActions(d.actions.longterm))
    + _guideAccordion('⚠️ ' + esc(d.riskFactors.title),
        '<div style="background:var(--warm);border-radius:12px;padding:14px 16px;">'
        + d.riskFactors.items.map(function(item) {
          return '<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:6px;font-size:13px;color:var(--ink-m);line-height:1.7;word-break:keep-all;">'
            + '<span style="flex-shrink:0;">•</span><span>' + esc(item) + '</span></div>';
        }).join('')
        + '<p style="font-size:12px;color:var(--ink-l);margin-top:10px;line-height:1.6;">해당 사항이 있다면, 산후우울 증상이 나타나기 전에 미리 전문가와 상담해 보는 것도 좋아요.</p>'
        + '</div>')
    + _guideAccordion('💑 ' + esc(d.partnerTip.title),
        '<div style="background:var(--warm);border-radius:12px;padding:14px 16px;">'
        + d.partnerTip.items.map(function(item) {
          return '<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;font-size:13px;color:var(--ink-m);line-height:1.7;word-break:keep-all;">'
            + '<span style="flex-shrink:0;">💬</span><span>' + esc(item) + '</span></div>';
        }).join('')
        + '</div>')
    + _guideAccordion('📞 도움 연결',
        '<div class="help-cards">'
        + d.help.map(function(h) {
          return '<a href="tel:' + h.number.replace(/-/g, '') + '" class="help-card" aria-label="' + esc(h.name) + ' ' + h.number + '">'
            + '<div class="help-card-num">📞 ' + h.number + '</div>'
            + '<div class="help-card-info"><div class="help-card-name">' + esc(h.name) + '</div><div class="help-card-desc">' + esc(h.desc) + '</div></div></a>';
        }).join('')
        + '</div>')
    + '</div>'
    + '<div style="margin:20px 0;padding:14px 18px;background:linear-gradient(135deg,rgba(176,123,172,.08),rgba(212,160,176,.06));border:1px solid rgba(176,123,172,.15);border-radius:14px;">'
    + '<div style="font-size:13px;font-weight:700;color:var(--peach-d);margin-bottom:6px;">출산 후 신체 회복이 궁금하다면</div>'
    + '<div style="font-size:12.5px;color:var(--ink-m);line-height:1.6;margin-bottom:10px;">산후 몸 돌봄, 증상 체크, 단계별 회복 가이드</div>'
    + '<button onclick="showPage(\'birth\')" style="background:var(--peach-d);color:white;border:none;border-radius:10px;padding:10px 18px;font-size:13px;font-weight:600;cursor:pointer;">출산 후 회복 가이드 보기 →</button>'
    + '</div>';

  var checkWrap = container.querySelector('#' + checkWrapId);
  if (checkWrap && typeof renderCheckTool === 'function') renderCheckTool(checkWrap, d.check);
}

/* ═══════ 갱년기 페이지 ═══════ */
function renderMenopausePage(container) {
  if (!container || typeof MENOPAUSE_DATA === 'undefined') return;
  var d = MENOPAUSE_DATA;
  var checkWrapId = 'menopause-check-wrap';

  var phaseHTML = d.science.phases.map(function(p) {
    return '<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;">'
      + '<span style="font-size:20px;flex-shrink:0;">' + p.icon + '</span>'
      + '<div>'
      + '<div style="font-size:13px;font-weight:700;color:var(--peach-d);margin-bottom:2px;">' + esc(p.name) + '</div>'
      + '<p style="font-size:12.5px;color:var(--ink-m);line-height:1.7;word-break:keep-all;">' + esc(p.desc) + '</p>'
      + '</div></div>';
  }).join('');

  container.innerHTML =
    '<button class="page-back" onclick="goHome()">← 홈으로</button>'
    + '<div class="content-hero" style="background:linear-gradient(135deg,var(--hero-menopause-from),var(--hero-menopause-to))">'
    + '<span class="content-hero-icon">🍂</span>'
    + '<h1>' + esc(d.intro.title) + '</h1>'
    + '<p>' + esc(d.intro.sub) + '</p>'
    + '</div>'
    + '<div class="stat-badge"><strong>' + d.intro.stat.pct + '</strong>&nbsp;' + esc(d.intro.stat.label) + '</div>'
    + _guideRecognition(d.recognition)
    + '<div class="accordion-group">'
    + _guideAccordion('🧠 ' + esc(d.science.title),
        '<p style="font-size:13px;color:var(--ink-m);line-height:1.8;word-break:keep-all;margin-bottom:16px;">' + esc(d.science.text) + '</p>'
        + '<div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:10px;">갱년기의 단계</div>'
        + phaseHTML)
    + _guideAccordion('🔍 상황 판단 — 자가 체크', '<div id="' + checkWrapId + '"></div>')
    + _guideAccordion('⏸️ 오늘 당장 할 수 있는 것', _guideActions(d.actions.immediate))
    + _guideAccordion('📅 이번 주에 시도해볼 것', _guideActions(d.actions.week))
    + _guideAccordion('🏥 전문적 도움 받기', _guideActions(d.actions.longterm))
    + _guideAccordion(esc(d.distinction.title),
        '<div class="distinction-grid">'
        + '<div class="distinction-col burnout"><div class="distinction-col-title">갱년기 증상</div>'
        + '<ul>' + d.distinction.menopause.map(function(t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>'
        + '<div class="distinction-col depression"><div class="distinction-col-title">우울증</div>'
        + '<ul>' + d.distinction.depression.map(function(t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>'
        + '</div><p class="distinction-note">' + esc(d.distinction.note) + '</p>')
    + _guideAccordion('🏠 ' + esc(d.emptyNest.title),
        '<p style="font-size:13px;color:var(--ink-m);line-height:1.8;word-break:keep-all;margin-bottom:12px;">' + esc(d.emptyNest.text) + '</p>'
        + d.emptyNest.tips.map(function(tip) {
          return '<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;font-size:13px;color:var(--ink-m);line-height:1.7;word-break:keep-all;">'
            + '<span style="flex-shrink:0;">💡</span><span>' + esc(tip) + '</span></div>';
        }).join(''))
    + _guideAccordion('📞 도움 연결',
        '<div class="help-cards">'
        + d.help.map(function(h) {
          return '<a href="tel:' + h.number.replace(/-/g, '') + '" class="help-card" aria-label="' + esc(h.name) + ' ' + h.number + '">'
            + '<div class="help-card-num">📞 ' + h.number + '</div>'
            + '<div class="help-card-info"><div class="help-card-name">' + esc(h.name) + '</div><div class="help-card-desc">' + esc(h.desc) + '</div></div></a>';
        }).join('')
        + '</div>')
    + '</div>';

  var checkWrap = container.querySelector('#' + checkWrapId);
  if (checkWrap && typeof renderCheckTool === 'function') renderCheckTool(checkWrap, d.check);
}

/* ═══════ 직장 페이지 ═══════ */
function renderWorkplacePage(container) {
  if (!container || typeof WORKPLACE_TYPES === 'undefined') return;

  var typesHTML = WORKPLACE_TYPES.map(function(t) {
    return '<div class="accordion-item">'
      + '<div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">'
      + '<span style="font-size:20px">' + t.icon + '</span>'
      + '<span style="font-weight:700;font-size:14px;">' + esc(t.name) + '</span>'
      + '<span class="accordion-arrow">▾</span>'
      + '</div>'
      + '<div class="accordion-body"><div class="accordion-body-inner">'
      + '<div style="font-size:13px;font-weight:600;color:var(--ink);margin-bottom:8px;">이런 특징이 보여요</div>'
      + '<ul style="font-size:13px;color:var(--ink-m);line-height:1.8;padding-left:18px;margin-bottom:14px;">'
      + t.traits.map(function(tr) { return '<li>' + esc(tr) + '</li>'; }).join('')
      + '</ul>'
      + '<div style="background:var(--lavender-p);border-radius:12px;padding:14px 16px;margin-bottom:14px;">'
      + '<div style="font-size:11px;font-weight:700;color:var(--lavender-d);letter-spacing:.05em;margin-bottom:6px;">🧠 정신분석학적 이해</div>'
      + '<p style="font-size:12.5px;color:var(--ink-m);line-height:1.75;">' + termify(t.analysis) + '</p>'
      + '</div>'
      + '<div style="font-size:13px;font-weight:600;color:var(--ink);margin-bottom:8px;">대처 방법</div>'
      + '<div class="action-checklist">'
      + t.coping.map(function(c) {
        return '<div class="action-item" onclick="toggleAction(this)" role="checkbox" aria-checked="false" tabindex="0">'
          + '<span class="action-check"></span>'
          + '<span class="action-icon">' + c.icon + '</span>'
          + '<span class="action-text">' + termify(c.text) + '</span>'
          + '</div>';
      }).join('')
      + '</div>'
      + '</div></div></div>';
  }).join('');

  var mindsetHTML = WORKPLACE_MINDSET.map(function(m, i) {
    return '<div style="background:var(--white);border:1px solid var(--line);border-radius:14px;padding:16px 18px;margin-bottom:10px;">'
      + '<div style="font-size:13px;font-weight:700;color:var(--peach-d);margin-bottom:5px;">' + (i + 1) + '. ' + termify(m.name) + '</div>'
      + '<p style="font-size:12.5px;color:var(--ink-m);line-height:1.75;">' + termify(m.desc) + '</p>'
      + '</div>';
  }).join('');

  container.innerHTML =
    '<button class="page-back" onclick="goHome()">← 홈으로</button>'
    + '<div class="content-hero" style="background:linear-gradient(135deg,var(--hero-workplace-from),var(--hero-workplace-to))">'
    + '<span class="content-hero-icon">🏢</span>'
    + '<h1>직장에서 어려운 사람 대처 가이드</h1>'
    + '<p>당신 탓이 아니에요. 정신분석학 관점의 이해와 실전 대처법</p>'
    + '</div>'
    + '<div class="stat-badge"><strong>73.6%</strong>&nbsp;직장인이 지난 1년간 정신건강 문제를 경험 (국립정신건강센터, 2024)</div>'
    + '<div class="step-section">'
    + '<div class="step-label">지금 이런 상황인가요?</div>'
    + '<div style="background:var(--warm);border-radius:14px;padding:16px 18px;">'
    + '<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;font-size:13px;color:var(--ink-m);line-height:1.7;word-break:keep-all;"><span style="color:var(--peach-d);flex-shrink:0;">•</span><span>특정 사람 때문에 출근이 두려워요</span></div>'
    + '<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;font-size:13px;color:var(--ink-m);line-height:1.7;word-break:keep-all;"><span style="color:var(--peach-d);flex-shrink:0;">•</span><span>대화 후 자존감이 바닥나는 느낌이에요</span></div>'
    + '<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;font-size:13px;color:var(--ink-m);line-height:1.7;word-break:keep-all;"><span style="color:var(--peach-d);flex-shrink:0;">•</span><span>내가 잘못한 건지 헷갈려요</span></div>'
    + '<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;font-size:13px;color:var(--ink-m);line-height:1.7;word-break:keep-all;"><span style="color:var(--peach-d);flex-shrink:0;">•</span><span>퇴근 후에도 그 사람 생각에서 벗어나기 어려워요</span></div>'
    + '<p style="font-size:12px;color:var(--ink-l);margin-top:8px;line-height:1.6;">그건 당신이 예민한 게 아니에요. 아래에서 유형과 대처법을 확인해 보세요.</p>'
    + '</div></div>'
    + '<div class="accordion-group">'
    + _guideAccordion('🔍 유형 파악 — 어떤 사람인가요?',
        '<p style="font-size:12.5px;color:var(--ink-l);margin-bottom:14px;">해당하는 유형을 눌러보세요. 특징과 대처법을 알려드려요.</p>'
        + '<div class="accordion-group">' + typesHTML + '</div>')
    + _guideAccordion('🧠 나의 중심을 지키는 마음가짐',
        '<p style="font-size:12.5px;color:var(--ink-l);margin-bottom:14px;">정신분석학의 핵심 개념으로 나를 보호하는 방법이에요.</p>'
        + mindsetHTML)
    + _guideAccordion('✅ 지금 바로 할 수 있는 것',
        '<div class="action-checklist">'
        + '<div class="action-item" onclick="toggleAction(this)" role="checkbox" aria-checked="false" tabindex="0"><span class="action-check"></span><span class="action-icon">📝</span><span class="action-text">오늘부터 "감정 일기"를 시작해 보세요. 직장에서 느낀 불편한 감정과 상황을 3줄로 기록하세요.</span></div>'
        + '<div class="action-item" onclick="toggleAction(this)" role="checkbox" aria-checked="false" tabindex="0"><span class="action-check"></span><span class="action-icon">🧘</span><span class="action-text">퇴근 후 "심리적 탈의" 의식을 만들어 보세요. 샤워하며 직장의 감정을 물과 함께 흘려보내는 상상을 해 보세요.</span></div>'
        + '<div class="action-item" onclick="toggleAction(this)" role="checkbox" aria-checked="false" tabindex="0"><span class="action-check"></span><span class="action-icon">🗣️</span><span class="action-text">신뢰할 수 있는 사람 1명에게 "나 요즘 직장에서 힘들어"라고 말해 보세요. 말하는 것만으로 달라져요.</span></div>'
        + '<div class="action-item" onclick="toggleAction(this)" role="checkbox" aria-checked="false" tabindex="0"><span class="action-check"></span><span class="action-icon">📚</span><span class="action-text">추천 도서: 「나는 왜 네가 힘든 걸까」(김혜남), 「경계의 기술」(헨리 클라우드)</span></div>'
        + '</div>')
    + _guideAccordion('📞 도움 연결',
        '<div class="help-cards">'
        + '<a href="tel:109" class="help-card" aria-label="정신건강위기상담 109"><div class="help-card-num">📞 109</div><div class="help-card-info"><div class="help-card-name">정신건강위기상담</div><div class="help-card-desc">무료, 24시간. 직장 스트레스로 심각한 고통을 겪고 있다면</div></div></a>'
        + '<a href="tel:1350" class="help-card" aria-label="고용노동부 상담센터 1350"><div class="help-card-num">📞 1350</div><div class="help-card-info"><div class="help-card-name">고용노동부 상담센터</div><div class="help-card-desc">직장 내 괴롭힘·부당 대우 신고 및 상담</div></div></a>'
        + '<a href="tel:15770199" class="help-card" aria-label="정신건강복지센터 1577-0199"><div class="help-card-num">📞 1577-0199</div><div class="help-card-info"><div class="help-card-name">정신건강복지센터</div><div class="help-card-desc">무료, 24시간. 전문 심리 상담 연결</div></div></a>'
        + '</div>'
        + '<div style="margin-top:14px;padding:12px 16px;background:var(--warm);border-radius:12px;font-size:12.5px;color:var(--ink-m);line-height:1.7;">'
        + '💼 <strong>EAP(근로자 지원 프로그램)</strong>가 회사에 있다면 무료로 전문 상담을 받을 수 있어요. 인사팀에 문의하거나, 사내 복지 페이지를 확인해 보세요.'
        + '</div>')
    + '</div>';
}


/* ══════════════════════════════════════════════════════
   3-3. 상황기반 페이지 — 관계 · 전환기
══════════════════════════════════════════════════════ */

/* ═══════ 관계 페이지 ═══════ */
function renderRelationPage(container) {
  if (!container || typeof RELATIONSHIP_DATA === 'undefined') return;
  container.innerHTML = _guideSituationPicker({
    situations: RELATIONSHIP_DATA.situations,
    containerId: 'relation-content',
    buildFn: 'buildRelationDetail',
    heroTitle: '관계가 무너졌을 때',
    heroSub: '이혼·가족 단절·고립감·이별 후 무너짐.<br>혼자 감당하지 않아도 돼요.',
    heroIcon: '💔',
    heroGradient: 'var(--relation-d),var(--relation)',
    stepLabel: '어떤 상황이에요?'
  });
}

function buildRelationDetail(container, id) {
  if (!container || typeof RELATIONSHIP_DATA === 'undefined') return;
  var d = RELATIONSHIP_DATA[id];
  if (!d) return;
  _guideSituationDetail(container, d, {
    renderFn: 'renderRelationPage',
    containerId: 'relation-content',
    checkId: 'relation-check-' + id
  });
}

/* ═══════ 전환기 페이지 ═══════ */
function renderTransitionPage(container) {
  if (!container || typeof TRANSITION_DATA === 'undefined') return;
  container.innerHTML = _guideSituationPicker({
    situations: TRANSITION_DATA.situations,
    containerId: 'transition-content',
    buildFn: 'buildTransitionDetail',
    heroTitle: '인생 전환기 가이드',
    heroSub: '삶의 방향이 흔들릴 때, 여기서부터 시작해 보세요.',
    heroIcon: '🌀',
    heroGradient: 'var(--transition-d),var(--transition-c)',
    stepLabel: '어떤 상황이에요?'
  });
}

function buildTransitionDetail(container, id) {
  if (!container || typeof TRANSITION_DATA === 'undefined') return;
  var d = TRANSITION_DATA[id];
  if (!d) return;
  _guideSituationDetail(container, d, {
    renderFn: 'renderTransitionPage',
    containerId: 'transition-content',
    checkId: 'transition-check-' + id
  });
}


/* ══════════════════════════════════════════════════════
   3-4. 상황기반 페이지 — 감정 · 수면 · 상실 · 노인돌봄
══════════════════════════════════════════════════════ */

/* ═══════ 감정 페이지 ═══════ */
function renderEmotionPage(container) {
  if (!container || typeof EMOTION_GUIDE_DATA === 'undefined') return;
  container.innerHTML = _guideSituationPicker({
    situations: Object.entries(EMOTION_GUIDE_DATA).map(function(entry) {
      return { id: entry[0], icon: entry[1].icon, label: entry[1].label };
    }),
    containerId: 'emotion-content',
    buildFn: 'buildEmotionDetail',
    heroTitle: '감정 가이드',
    heroSub: '감정을 어떻게 해야 할지 모르겠을 때,<br>여기서 잠깐 쉬어가도 돼요.',
    heroIcon: '😔',
    heroGradient: 'var(--lavender-d),var(--lavender)',
    stepLabel: '지금 어떤 느낌이에요?',
    extraButtons: '<button class="emotion-btn crisis" onclick="buildCrisisScreen(document.getElementById(\'emotion-content\'))" aria-label="죽고 싶다는 생각이 들어요"><span class="emotion-btn-icon">💀</span><span>죽고 싶다는 생각이 들어요</span></button>'
  });
}

function buildEmotionDetail(container, id) {
  if (!container || typeof EMOTION_GUIDE_DATA === 'undefined') return;
  var d = EMOTION_GUIDE_DATA[id];
  if (!d) return;
  _guideSituationDetail(container, d, {
    renderFn: 'renderEmotionPage',
    containerId: 'emotion-content',
    checkId: 'check-section-' + id
  });
}

/* ═══════ 수면 페이지 ═══════ */
function renderSleepPage(container) {
  if (!container || typeof SLEEP_DATA === 'undefined') return;
  container.innerHTML = _guideSituationPicker({
    situations: SLEEP_DATA.situations,
    containerId: 'sleep-content',
    buildFn: 'buildSleepDetail',
    heroTitle: '잠을 못 자겠어요',
    heroSub: '밤이 두렵고, 아침이 무겁고, 낮이 흐릿할 때.<br>수면은 회복할 수 있어요.',
    heroIcon: '🛏️',
    heroGradient: 'var(--hero-sleep-from),var(--hero-sleep-to)',
    stepLabel: '어떤 상황이에요?'
  });
}

function buildSleepDetail(container, id) {
  if (!container || typeof SLEEP_DATA === 'undefined') return;
  var d = SLEEP_DATA[id];
  if (!d) return;
  _guideSituationDetail(container, d, {
    renderFn: 'renderSleepPage',
    containerId: 'sleep-content',
    checkId: 'sleep-check-' + id
  });
}

/* ═══════ 사별 페이지 ═══════ */
function renderGriefPage(container) {
  if (!container || typeof GRIEF_DATA === 'undefined') return;
  container.innerHTML = _guideSituationPicker({
    situations: GRIEF_DATA.situations,
    containerId: 'grief-content',
    buildFn: 'buildGriefDetail',
    heroTitle: '떠나보낸 사람을 위한 가이드',
    heroSub: '사랑하는 사람을 보내는 건, 삶에서 가장 무거운 일이에요.<br>여기서 잠깐 쉬어가도 괜찮아요.',
    heroIcon: '🕊️',
    heroGradient: 'var(--hero-grief-from),var(--hero-grief-to)',
    stepLabel: '누구를 떠나보내셨나요?'
  });
}

function buildGriefDetail(container, id) {
  if (!container || typeof GRIEF_DATA === 'undefined') return;
  var d = GRIEF_DATA[id];
  if (!d) return;
  _guideSituationDetail(container, d, {
    renderFn: 'renderGriefPage',
    containerId: 'grief-content',
    checkId: 'grief-check-' + id
  });
}

/* ═══════ 노인돌봄 페이지 ═══════ */
function renderElderPage(container) {
  if (!container || typeof ELDER_CARE_DATA === 'undefined') return;
  var d = ELDER_CARE_DATA;

  var welfareHTML = d.welfare.items.map(function(w) {
    return '<div class="accordion-item">'
      + '<div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">'
      + '<span>' + w.icon + ' ' + esc(w.name) + '</span><span class="accordion-arrow">▼</span>'
      + '</div>'
      + '<div class="accordion-body"><div class="accordion-body-inner">'
      + '<p style="font-size:13px;color:var(--ink-m);line-height:1.75;margin-bottom:10px;">' + esc(w.desc) + '</p>'
      + '<a href="tel:' + w.contact.replace(/-/g, '') + '" style="display:inline-block;padding:8px 16px;background:var(--peach-p);color:var(--peach-d);border-radius:10px;font-size:12.5px;font-weight:600;text-decoration:none;">📞 ' + w.contact + ' 전화하기</a>'
      + '</div></div></div>';
  }).join('');

  container.innerHTML =
    '<button class="page-back" onclick="goHome()">← 홈으로</button>'
    + '<div class="content-hero" style="background:linear-gradient(135deg,var(--hero-elder-from),var(--hero-elder-to))">'
    + '<span class="content-hero-icon">🧓</span>'
    + '<h1>' + esc(d.intro.title) + '</h1>'
    + '<p>' + esc(d.intro.sub) + '</p>'
    + '</div>'
    + '<div class="stat-badge"><strong>' + d.intro.stat.pct + '</strong>&nbsp;' + esc(d.intro.stat.label) + '</div>'
    + '<div class="step-section">'
    + '<div class="step-label">어떤 상황이에요?</div>'
    + '<p style="font-size:12.5px;color:var(--ink-l);margin-bottom:14px;">해당하는 상황을 눌러보세요. 자가진단과 행동 가이드를 바로 확인할 수 있어요.</p>'
    + '<div class="accordion-group">'
    + d.situations.map(function(s) {
      return '<div class="accordion-item" data-sit-id="' + s.id + '">'
        + '<div class="accordion-header" onclick="toggleElderSituation(this)" tabindex="0" aria-expanded="false">'
        + '<span>' + s.icon + ' ' + esc(s.label) + '</span><span class="accordion-arrow">▼</span>'
        + '</div>'
        + '<div class="accordion-body"><div class="accordion-body-inner">'
        + _renderElderSituationContent(s.id)
        + '</div></div></div>';
    }).join('')
    + '</div></div>'
    + '<div class="step-section">'
    + '<div class="step-label">🩺 실전 돌봄 가이드</div>'
    + '<p style="font-size:12.5px;color:var(--ink-l);margin-bottom:14px;">요양보호사가 배우는 핵심 돌봄 지식이에요. 가정에서도 바로 활용할 수 있어요.</p>'
    + '<div class="accordion-group">' + _renderElderPracticalGuide(d.practicalGuide) + '</div>'
    + '</div>'
    + '<div class="step-section">'
    + '<div class="step-label">📋 복지 제도 한눈에</div>'
    + '<p style="font-size:12.5px;color:var(--ink-l);margin-bottom:14px;">활용할 수 있는 지원이 생각보다 많아요. 눌러서 확인해 보세요.</p>'
    + '<div class="accordion-group">' + welfareHTML + '</div>'
    + '</div>'
    + '<div class="step-section">'
    + '<div class="step-label">📞 주요 연락처</div>'
    + '<div class="help-cards">'
    + '<a href="tel:18999988" class="help-card"><div class="help-card-num">📞 1899-9988</div><div class="help-card-info"><div class="help-card-name">중앙치매센터</div><div class="help-card-desc">치매 상담·검진·돌봄 서비스 연결. 365일 무료.</div></div></a>'
    + '<a href="tel:15771000" class="help-card"><div class="help-card-num">📞 1577-1000</div><div class="help-card-info"><div class="help-card-name">국민건강보험공단</div><div class="help-card-desc">장기요양등급 신청·재가급여·긴급돌봄 안내.</div></div></a>'
    + '<a href="tel:15771389" class="help-card"><div class="help-card-num">📞 1577-1389</div><div class="help-card-info"><div class="help-card-name">노인보호전문기관</div><div class="help-card-desc">노인 학대 상담·신고. 가해자 상담도 가능.</div></div></a>'
    + '<a href="tel:129" class="help-card"><div class="help-card-num">📞 129</div><div class="help-card-info"><div class="help-card-name">정부 복지상담센터</div><div class="help-card-desc">노인 복지 혜택 통합 안내. 무료.</div></div></a>'
    + '<a href="tel:109" class="help-card"><div class="help-card-num">📞 109</div><div class="help-card-info"><div class="help-card-name">자살예방상담전화</div><div class="help-card-desc">무료, 24시간. 간병이 너무 힘들 때도 전화해도 돼요.</div></div></a>'
    + '</div></div>';
}

/* ── 노인돌봄 상황별 콘텐츠 렌더 ── */
function _renderElderSituationContent(id) {
  var d = ELDER_CARE_DATA[id];
  if (!d) return '';
  return '<div style="padding-top:4px;">'
    + '<div style="font-size:13.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;margin-bottom:16px;">' + esc(d.recognition) + '</div>'
    + '<div id="elder-check-' + id + '" style="margin-bottom:16px;">'
    + '<div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:8px;">📋 상황 판단</div>'
    + '</div>'
    + '<div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:8px;">✅ 행동 가이드</div>'
    + '<div class="action-checklist" style="margin-bottom:16px;">' + _guideActions(d.actions) + '</div>'
    + '<div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:8px;">📞 도움 연결</div>'
    + '<div class="help-cards">'
    + d.help.map(function(h) {
      return '<a href="tel:' + h.number.replace(/-/g, '') + '" class="help-card" aria-label="' + esc(h.name) + ' ' + h.number + '">'
        + '<div class="help-card-num">📞 ' + h.number + '</div>'
        + '<div class="help-card-info"><div class="help-card-name">' + esc(h.name) + '</div><div class="help-card-desc">' + esc(h.desc) + '</div></div></a>';
    }).join('')
    + '</div></div>';
}

/* ── 노인돌봄 상황 아코디언 열릴 때 체크도구 lazy init ── */
function _initElderCheck(id) {
  var wrap = document.getElementById('elder-check-' + id);
  if (!wrap || wrap.dataset.init) return;
  wrap.dataset.init = '1';
  var d = ELDER_CARE_DATA[id];
  if (d && d.check && typeof renderCheckTool === 'function') {
    renderCheckTool(wrap, d.check);
  }
}

function toggleElderSituation(header) {
  var item = header.closest('.accordion-item');
  if (!item) return;
  var id = item.dataset.sitId;
  toggleAccordion(header);
  if (id && item.classList.contains('open')) {
    _initElderCheck(id);
  }
}

/* ── 노인돌봄 실전 가이드 렌더 ── */
function _renderElderPracticalGuide(guides) {
  return guides.map(function(g) {
    var faqHTML = g.details.map(function(d) {
      return '<div style="margin-bottom:14px;">'
        + '<div style="font-size:13px;font-weight:600;color:var(--ink);margin-bottom:4px;">Q. ' + esc(d.q) + '</div>'
        + '<div style="font-size:12.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;">' + esc(d.a) + '</div>'
        + '</div>';
    }).join('');

    return '<div class="accordion-item">'
      + '<div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">'
      + '<span>' + g.icon + ' ' + esc(g.title) + '</span><span class="accordion-arrow">▼</span>'
      + '</div>'
      + '<div class="accordion-body"><div class="accordion-body-inner">'
      + '<div style="display:inline-block;padding:3px 10px;background:var(--peach-p);color:var(--peach-d);border-radius:20px;font-size:10.5px;font-weight:600;margin-bottom:10px;">' + esc(g.badge) + '</div>'
      + '<p style="font-size:13px;color:var(--ink-m);line-height:1.75;margin-bottom:10px;">' + esc(g.summary) + '</p>'
      + '<div style="background:linear-gradient(135deg,rgba(200,48,42,.06),rgba(200,48,42,.02));border:1px solid rgba(200,48,42,.15);border-radius:12px;padding:10px 14px;margin-bottom:16px;">'
      + '<span style="font-size:12px;font-weight:700;color:var(--semantic-danger);">⚠️ 꼭 기억하세요</span>'
      + '<p style="font-size:12.5px;color:var(--ink-m);line-height:1.7;margin-top:4px;">' + esc(g.warn) + '</p>'
      + '</div>'
      + faqHTML
      + '<div style="font-size:11px;color:var(--ink-l);line-height:1.6;padding:10px 14px;background:var(--disclaimer-bg);border:1px solid var(--disclaimer-border);border-radius:10px;word-break:keep-all;">'
      + '이 정보는 일반적인 참고 사항이에요. 개인마다 상황이 다르므로, 반드시 담당 산부인과 전문의와 상의해 주세요.'
      + '</div>'
      + '</div></div></div>';
  }).join('');
}

/* ══════════════════════════════════════════════════════
   3-5. 내 생활 시작하기 — 자립 청소년 가이드
══════════════════════════════════════════════════════ */

function initIndependencePage() {
  var el = document.getElementById('independence-content');
  if (!el || typeof INDEPENDENCE_DATA === 'undefined') return;
  var d = INDEPENDENCE_DATA;

  // 긴급 배너
  var emergencyBanner = '<div style="background:var(--warm);border-radius:14px;padding:14px 16px;margin-bottom:20px;text-align:center;font-size:13px;line-height:1.6;">'
    + '지금 급하면: <a href="tel:1388" style="font-weight:700;color:inherit;">1388</a>(청소년) · '
    + '<a href="tel:109" style="font-weight:700;color:inherit;">109</a>(위기) · '
    + '<a href="tel:112" style="font-weight:700;color:inherit;">112</a>(경찰)'
    + '</div>';

  // 면책
  var disclaimer = d.intro.disclaimer
    ? '<p style="font-size:12px;color:var(--ink-l);text-align:center;margin-bottom:24px;">' + esc(d.intro.disclaimer) + '</p>'
    : '';

  // 3단계별 상황 그룹핑
  var stageMap = {};
  d.situations.forEach(function(s) {
    if (!stageMap[s.stage]) stageMap[s.stage] = [];
    stageMap[s.stage].push(s);
  });

  // 각 단계별 섹션 (emotion-btn 클래스 사용)
  var stagesHTML = d.stages.map(function(stage) {
    var items = stageMap[stage.id] || [];
    var btns = items.map(function(s) {
      return '<button class="emotion-btn" onclick="buildIndependenceDetail(document.getElementById(\'independence-content\'),\'' + s.id + '\')" aria-label="' + esc(s.label) + '">'
        + '<span class="emotion-btn-icon">' + s.icon + '</span>'
        + '<div>'
        + '<div style="font-size:13.5px;font-weight:600;">' + esc(s.label) + '</div>'
        + '<div style="font-size:11.5px;color:var(--ink-l);">' + esc(s.sub) + '</div>'
        + '</div>'
        + '</button>';
    }).join('');

    return '<div class="step-section" style="margin-bottom:28px;">'
      + '<div class="step-label">' + stage.icon + ' ' + esc(stage.label) + ' <span style="font-weight:400;color:var(--ink-m);font-size:13px;">\u2014 ' + esc(stage.sub) + '</span></div>'
      + '<div class="emotion-grid">' + btns + '</div>'
      + '</div>';
  }).join('');

  // 상시 접근 섹션
  var alwaysBtns = d.always.map(function(s) {
    return '<button class="emotion-btn" onclick="buildIndependenceDetail(document.getElementById(\'independence-content\'),\'' + s.id + '\')" aria-label="' + esc(s.label) + '" style="border-left:3px solid var(--accent);">'
      + '<span class="emotion-btn-icon">' + s.icon + '</span>'
      + '<div>'
      + '<div style="font-size:13.5px;font-weight:600;">' + esc(s.label) + '</div>'
      + '<div style="font-size:11.5px;color:var(--ink-l);">' + esc(s.sub) + '</div>'
      + '</div>'
      + '</button>';
  }).join('');

  var alwaysSection = '<div class="step-section">'
    + '<div class="step-label">⚡ 언제든 <span style="font-weight:400;color:var(--ink-m);font-size:13px;">\u2014 단계 상관없이</span></div>'
    + '<div class="emotion-grid">' + alwaysBtns + '</div>'
    + '</div>';

  // 히어로
  var heroHTML = '<button class="page-back" onclick="goHome()" aria-label="홈으로 돌아가기">\u2190 홈으로</button>'
    + '<div class="content-hero">'
    + '<span class="content-hero-icon">' + (d.intro.icon || '') + '</span>'
    + '<h1>' + esc(d.intro.title) + '</h1>'
    + '<p>' + esc(d.intro.sub) + '</p>'
    + (d.intro.stat ? '<div class="guide-stat"><strong>' + esc(d.intro.stat.pct) + '</strong> ' + esc(d.intro.stat.label) + '</div>' : '')
    + '</div>';

  var stageNote = d.stageNote
    ? '<p style="font-size:13px;color:var(--ink-m);text-align:center;margin-bottom:20px;">' + esc(d.stageNote) + '</p>'
    : '';

  el.innerHTML = heroHTML
    + emergencyBanner
    + disclaimer
    + stageNote
    + stagesHTML
    + alwaysSection;
}

function buildIndependenceDetail(container, id) {
  if (!container || typeof INDEPENDENCE_DATA === 'undefined') return;
  var d = INDEPENDENCE_DATA[id];
  if (!d) return;

  var recognitionHTML = d.recognition
    ? '<div class="guide-recognition"><p>' + esc(d.recognition) + '</p></div>'
    : '';

  var actionsHTML = d.actions && d.actions.length
    ? '<div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:10px;">행동 가이드</div>'
      + '<div class="action-checklist" style="margin-bottom:16px;">' + _guideActions(d.actions) + '</div>'
    : '';

  var helpHTML = d.help && d.help.length ? _guideHelp(d.help) : '';

  container.innerHTML = '<button class="page-back" onclick="initIndependencePage()" style="margin-bottom:16px;" aria-label="목록으로 돌아가기">\u2190 목록으로</button>'
    + recognitionHTML
    + actionsHTML
    + helpHTML;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ═══════ 노인 정서 돌봄 페이지 ═══════ */
function renderSeniorPage(container) {
  if (!container || typeof SENIOR_ISOLATION_DATA === 'undefined') return;
  var d = SENIOR_ISOLATION_DATA;

  /* 면책 고지 (전화번호는 하단 주요 연락처에 통합) */
  var disclaimerHTML = '<div class="guide-disclaimer">'
    + '<p>' + esc(d.disclaimer) + '</p>'
    + '</div>';

  /* 자녀/보호자 안내 */
  var familyHTML = d.forFamily.items.map(function(item) {
    return '<div class="action-item" role="listitem">'
      + '<span class="action-icon" aria-hidden="true">' + item.icon + '</span>'
      + '<div class="action-text" style="display:block;"><strong>' + esc(item.title) + '</strong>' + esc(item.text) + '</div>'
      + '</div>';
  }).join('');

  container.innerHTML =
    '<button class="page-back" onclick="goHome()">← 홈으로</button>'
    + '<div class="content-hero" style="background:linear-gradient(135deg,var(--hero-senior-from),var(--hero-senior-to))">'
    + '<span class="content-hero-icon">🤲</span>'
    + '<h1>' + esc(d.intro.title) + '</h1>'
    + '<p>' + esc(d.intro.sub) + '</p>'
    + '</div>'
    + '<div class="stat-badge"><strong>' + d.intro.stat.pct + '</strong>&nbsp;' + esc(d.intro.stat.label) + '</div>'
    + '<div class="step-section">'
    + '<div class="step-label">어떤 상황이 가장 가까우세요?</div>'
    + '<p style="font-size:13px;color:var(--ink-l);margin-bottom:14px;">해당하는 상황을 눌러보세요. 점검과 행동 가이드를 확인할 수 있어요.</p>'
    + '<div class="accordion-group">'
    + d.situations.map(function(s) {
      return '<div class="accordion-item" data-sit-id="' + s.id + '">'
        + '<div class="accordion-header" onclick="toggleSeniorSituation(this)" tabindex="0" aria-expanded="false">'
        + '<span>' + s.icon + ' ' + esc(s.label) + '</span><span class="accordion-arrow">▼</span>'
        + '</div>'
        + '<div class="accordion-body"><div class="accordion-body-inner">'
        + _renderSeniorSituationContent(s.id)
        + '</div></div></div>';
    }).join('')
    + '</div></div>'
    + '<div class="step-section">'
    + '<div class="step-label">👨‍👩‍👧 ' + esc(d.forFamily.title) + '</div>'
    + '<p style="font-size:13px;color:var(--ink-l);margin-bottom:14px;">자녀분이 읽고 계시다면, 이것만 기억해 주세요.</p>'
    + '<div class="action-checklist">' + familyHTML + '</div>'
    + '</div>'
    + disclaimerHTML
    + '<div class="step-section">'
    + '<div class="step-label">📞 주요 연락처</div>'
    + '<div class="help-cards">'
    + '<a href="tel:109" class="help-card"><div class="help-card-num">📞 109</div><div class="help-card-info"><div class="help-card-name">자살예방상담전화</div><div class="help-card-desc">무료, 24시간. 삶이 힘들 때 언제든.</div></div></a>'
    + '<a href="tel:15770199" class="help-card"><div class="help-card-num">📞 1577-0199</div><div class="help-card-info"><div class="help-card-name">정신건강위기상담전화</div><div class="help-card-desc">무료, 24시간. 외로움, 우울 모두 상담 가능.</div></div></a>'
    + '<a href="tel:15771389" class="help-card"><div class="help-card-num">📞 1577-1389</div><div class="help-card-info"><div class="help-card-name">노인보호전문기관</div><div class="help-card-desc">노인 학대 상담·신고. 경제적 학대도 상담 가능.</div></div></a>'
    + '<a href="tel:132" class="help-card"><div class="help-card-num">📞 132</div><div class="help-card-info"><div class="help-card-name">대한법률구조공단</div><div class="help-card-desc">재산·상속 무료 법률상담. 65세 이상 우선.</div></div></a>'
    + '<a href="tel:129" class="help-card"><div class="help-card-num">📞 129</div><div class="help-card-info"><div class="help-card-name">정부 복지상담센터</div><div class="help-card-desc">노인 복지 혜택 통합 안내. 무료.</div></div></a>'
    + '<a href="tel:18999988" class="help-card"><div class="help-card-num">📞 1899-9988</div><div class="help-card-info"><div class="help-card-name">중앙치매센터</div><div class="help-card-desc">치매 무료 검진·상담. 기억이 걱정될 때.</div></div></a>'
    + '</div></div>'
    + '<div class="guide-disclaimer" style="margin-top:24px;">'
    + '<p>이 가이드는 정보 제공 목적이며, 의료·법률 전문가의 상담을 대체하지 않습니다. 법률 정보는 2026년 기준이며, 법령 개정에 따라 달라질 수 있습니다.</p>'
    + '</div>';
}

/* ── 상황별 콘텐츠 렌더 ── */
function _renderSeniorSituationContent(id) {
  var d = SENIOR_ISOLATION_DATA[id];
  if (!d) return '';

  var mindsetHTML = '';
  if (d.mindset) {
    mindsetHTML = '<div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:8px;margin-top:16px;">💡 알아두면 좋을 것들</div>'
      + d.mindset.map(function(m) {
        return '<div style="background:var(--white);border-radius:12px;border:1px solid var(--senior-border);padding:14px 16px;margin-bottom:8px;">'
          + '<strong style="font-size:13px;color:var(--ink);display:block;margin-bottom:4px;">' + esc(m.title) + '</strong>'
          + '<p style="font-size:12.5px;color:var(--ink-m);line-height:1.75;margin:0;">' + esc(m.text) + '</p>'
          + '</div>';
      }).join('');
  }

  var legalHTML = '';
  if (d.legal) {
    legalHTML = '<div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:8px;margin-top:16px;">⚖️ 법적으로 보호받을 수 있어요</div>'
      + d.legal.map(function(l) {
        return '<div style="background:var(--white);border-radius:12px;border:1px solid var(--senior-border);padding:14px 16px;margin-bottom:8px;">'
          + '<strong style="font-size:13px;color:var(--ink);display:block;margin-bottom:4px;">' + esc(l.title) + '</strong>'
          + '<p style="font-size:12.5px;color:var(--ink-m);line-height:1.75;margin:0;">' + esc(l.text) + '</p>'
          + '</div>';
      }).join('');
  }

  return '<div style="padding-top:4px;">'
    + '<div style="font-size:13.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;margin-bottom:16px;">' + esc(d.recognition) + '</div>'
    + '<div id="senior-check-' + id + '" style="margin-bottom:16px;">'
    + '<div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:8px;">📋 상황 점검</div>'
    + '</div>'
    + (d.psychology ? '<div style="background:var(--senior-bg-light);border-radius:12px;padding:14px 16px;margin-bottom:16px;font-size:12.5px;color:var(--ink-m);line-height:1.75;">' + esc(d.psychology) + '</div>' : '')
    + mindsetHTML
    + legalHTML
    + '<div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:8px;margin-top:16px;">✅ 행동 가이드</div>'
    + '<div class="action-checklist" style="margin-bottom:16px;">' + _guideActions(d.actions) + '</div>'
    + '<div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:8px;">📞 도움 연결</div>'
    + '<div class="help-cards">'
    + d.help.map(function(h) {
      return '<a href="tel:' + h.number.replace(/-/g, '') + '" class="help-card" aria-label="' + esc(h.name) + ' ' + h.number + '">'
        + '<div class="help-card-num">📞 ' + h.number + '</div>'
        + '<div class="help-card-info"><div class="help-card-name">' + esc(h.name) + '</div><div class="help-card-desc">' + esc(h.desc) + '</div></div></a>';
    }).join('')
    + '</div></div>';
}

/* ── 체크도구 lazy init ── */
function _initSeniorCheck(id) {
  var wrap = document.getElementById('senior-check-' + id);
  if (!wrap || wrap.dataset.init) return;
  wrap.dataset.init = '1';
  var d = SENIOR_ISOLATION_DATA[id];
  if (d && d.check && typeof renderCheckTool === 'function') {
    renderCheckTool(wrap, d.check);
  }
}

function toggleSeniorSituation(header) {
  var item = header.closest('.accordion-item');
  if (!item) return;
  var id = item.dataset.sitId;
  toggleAccordion(header);
  if (id && item.classList.contains('open')) {
    _initSeniorCheck(id);
  }
}
