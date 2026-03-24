/* ═══════════════════════════════════════════════════════════
   BeInside — 신규 가이드 렌더러
   ADHD · 중독 · 금융스트레스 페이지 초기화
═══════════════════════════════════════════════════════════ */

/* ── 공통 렌더 헬퍼 ── */
function _guideHero(data) {
  return '<div class="guide-hero" style="text-align:center;padding:32px 20px 24px;">'
    + '<h1 style="font-size:clamp(22px,5vw,28px);font-weight:700;color:var(--ink);margin:0 0 8px;">' + data.title + '</h1>'
    + '<p style="font-size:15px;color:var(--ink-m);line-height:1.7;margin:0 0 12px;">' + data.sub + '</p>'
    + (data.stat ? '<div style="display:inline-block;padding:8px 16px;border-radius:12px;background:var(--peach-p);font-size:13px;color:var(--peach-d);">'
      + '<strong>' + data.stat.pct + '</strong> ' + data.stat.label + '</div>' : '')
    + '</div>';
}

function _guideSection(title, html) {
  return '<section style="padding:0 20px 24px;">'
    + '<h2 style="font-size:18px;font-weight:700;color:var(--ink);margin:0 0 14px;">' + title + '</h2>'
    + html + '</section>';
}

function _guideCards(items, prefix) {
  return '<div style="display:flex;flex-direction:column;gap:12px;">'
    + items.map(function(item, i) {
      var icon = item.icon || '•';
      var title = item.title || item.name || '';
      var text = item.text || item.desc || '';
      return '<div style="background:var(--white);border-radius:16px;padding:16px;border:1px solid var(--line);">'
        + '<div style="display:flex;gap:10px;align-items:flex-start;">'
        + '<span style="font-size:20px;flex-shrink:0;">' + icon + '</span>'
        + '<div>'
        + (title ? '<strong style="font-size:15px;color:var(--ink);">' + title + '</strong><br>' : '')
        + '<span style="font-size:14px;color:var(--ink-m);line-height:1.65;">' + text + '</span>'
        + '</div></div></div>';
    }).join('') + '</div>';
}

function _guideCheck(check) {
  if (!check || !check.questions) return '';
  return '<div class="check-tool" id="' + check.id + '" style="background:var(--white);border-radius:16px;padding:20px;border:1px solid var(--line);margin:0 20px 24px;">'
    + '<h3 style="font-size:16px;font-weight:700;margin:0 0 14px;">' + check.title + '</h3>'
    + check.questions.map(function(q, i) {
      return '<label style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--line);cursor:pointer;font-size:14px;color:var(--ink);line-height:1.6;">'
        + '<input type="checkbox" class="guide-check-item" data-check-id="' + check.id + '" style="margin-top:4px;flex-shrink:0;width:18px;height:18px;">'
        + q + '</label>';
    }).join('')
    + '<div class="check-result" id="' + check.id + '-result" style="margin-top:14px;padding:14px;border-radius:12px;display:none;"></div>'
    + '</div>';
}

function _guideHelp(helplines) {
  if (!helplines || !helplines.length) return '';
  return _guideSection('도움받을 수 있는 곳',
    '<div style="display:flex;flex-direction:column;gap:8px;">'
    + helplines.map(function(h) {
      return '<a href="tel:' + h.number + '" style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;background:var(--peach-p);border-radius:12px;text-decoration:none;color:var(--ink);">'
        + '<div><strong style="font-size:15px;">' + h.name + '</strong><br><span style="font-size:13px;color:var(--ink-m);">' + h.desc + '</span></div>'
        + '<span style="font-size:16px;font-weight:700;color:var(--peach-d);white-space:nowrap;">' + h.number + '</span>'
        + '</a>';
    }).join('') + '</div>');
}

/* ── 체크 결과 이벤트 ── */
document.addEventListener('change', function(e) {
  if (!e.target.classList.contains('guide-check-item')) return;
  var checkId = e.target.dataset.checkId;
  var items = document.querySelectorAll('[data-check-id="' + checkId + '"]');
  var count = 0;
  items.forEach(function(cb) { if (cb.checked) count++; });

  var resultEl = document.getElementById(checkId + '-result');
  if (!resultEl) return;

  // 데이터에서 결과 매핑 찾기
  var dataMap = { ct_adhd: ADHD_DATA, ct_addiction: ADDICTION_DATA, ct_finance: FINANCE_DATA };
  var data = dataMap[checkId];
  if (!data || !data.check || !data.check.results) return;

  var r = data.check.results;
  var result;
  if (count >= r.high.threshold) result = r.high;
  else if (count >= r.mid.threshold) result = r.mid;
  else result = r.low;

  resultEl.style.display = 'block';
  var bgColor = count >= r.high.threshold ? 'var(--mental-risk-bg)' : count >= r.mid.threshold ? 'var(--burnout-p)' : 'var(--lavender-p)';
  resultEl.style.background = bgColor;
  resultEl.innerHTML = '<strong style="font-size:15px;">' + result.label + '</strong>'
    + (result.action ? '<p style="font-size:14px;color:var(--ink-m);margin:8px 0 0;line-height:1.6;">' + result.action + '</p>' : '');
});

/* ═══════ ADHD 페이지 ═══════ */
function initAdhdPage() {
  var el = document.getElementById('adhd-content');
  if (!el || typeof ADHD_DATA === 'undefined') return;
  var d = ADHD_DATA;

  el.innerHTML = _guideHero(d.intro)
    + _guideSection(d.recognition.title,
        '<ul style="padding-left:20px;font-size:14px;color:var(--ink);line-height:1.8;">'
        + d.recognition.items.map(function(i) { return '<li>' + i + '</li>'; }).join('') + '</ul>')
    + _guideCheck(d.check)
    + _guideSection('ADHD는 어떤 건가요?',
        '<p style="font-size:14px;color:var(--ink-m);line-height:1.75;">' + d.psychology + '</p>')
    + _guideSection('치료와 관리 방법', _guideCards(d.techniques))
    + _guideSection('지금 바로 해볼 수 있는 것', _guideCards(d.actions.immediate))
    + _guideSection(d.workTips.title, _guideCards(d.workTips.items))
    + _guideSection(d.distinction.title,
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:13px;">'
        + '<div style="background:var(--peach-p);padding:14px;border-radius:12px;"><strong>ADHD</strong>'
        + d.distinction.adhd.map(function(i) { return '<br>• ' + i; }).join('') + '</div>'
        + '<div style="background:var(--warm);padding:14px;border-radius:12px;"><strong>게으름</strong>'
        + d.distinction.laziness.map(function(i) { return '<br>• ' + i; }).join('') + '</div>'
        + '</div><p style="font-size:13px;color:var(--ink-m);margin-top:12px;line-height:1.65;">' + d.distinction.note + '</p>')
    + _guideHelp(d.help);
}

/* ═══════ 중독 페이지 ═══════ */
function initAddictionPage() {
  var el = document.getElementById('addiction-content');
  if (!el || typeof ADDICTION_DATA === 'undefined') return;
  var d = ADDICTION_DATA;

  var typesHtml = d.types.map(function(t) {
    return '<details style="background:var(--white);border-radius:16px;padding:16px;border:1px solid var(--line);">'
      + '<summary style="font-size:16px;font-weight:600;cursor:pointer;">' + t.icon + ' ' + t.label + '</summary>'
      + '<ul style="padding:12px 0 0 20px;font-size:14px;color:var(--ink-m);line-height:1.8;">'
      + t.signs.map(function(s) { return '<li>' + s + '</li>'; }).join('') + '</ul></details>';
  }).join('');

  el.innerHTML = _guideHero(d.intro)
    + _guideSection('유형별 위험 신호', typesHtml)
    + _guideCheck(d.check)
    + _guideSection('중독은 어떻게 생기나요?',
        '<p style="font-size:14px;color:var(--ink-m);line-height:1.75;">' + d.psychology + '</p>')
    + _guideSection('회복 단계', _guideCards(d.recovery))
    + _guideSection('가족이 볼 때',
        '<div style="display:flex;flex-direction:column;gap:8px;">'
        + d.family.map(function(f) {
          return '<div style="background:var(--warm);border-radius:12px;padding:14px;font-size:14px;color:var(--ink);line-height:1.65;">'
            + '<strong>' + f.icon + ' ' + f.title + '</strong><br>' + f.text + '</div>';
        }).join('') + '</div>')
    + _guideHelp(d.help);
}

/* ═══════ 금융 스트레스 페이지 ═══════ */
function initFinancePage() {
  var el = document.getElementById('finance-content');
  if (!el || typeof FINANCE_DATA === 'undefined') return;
  var d = FINANCE_DATA;

  el.innerHTML = _guideHero(d.intro)
    + _guideSection('경제적 위기가 마음에 미치는 영향',
        '<ul style="padding-left:20px;font-size:14px;color:var(--ink);line-height:1.8;">'
        + d.impact.map(function(i) { return '<li>' + i + '</li>'; }).join('') + '</ul>')
    + _guideCheck(d.check)
    + _guideSection('지금 바로 할 수 있는 것', _guideCards(d.actions.immediate))
    + _guideSection('실제 지원 제도',
        '<div style="display:flex;flex-direction:column;gap:10px;">'
        + d.support.map(function(s) {
          return '<div style="background:var(--white);border-radius:16px;padding:16px;border:1px solid var(--line);">'
            + '<strong style="font-size:15px;color:var(--ink);">' + s.name + '</strong>'
            + (s.phone ? ' <a href="tel:' + s.phone + '" style="color:var(--peach-d);font-weight:700;">' + s.phone + '</a>' : '')
            + '<p style="font-size:14px;color:var(--ink-m);margin:6px 0 0;line-height:1.6;">' + s.desc + '</p>'
            + '</div>';
        }).join('') + '</div>')
    + _guideHelp(d.help);
}
