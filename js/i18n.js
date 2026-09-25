/* ═══════════════════════════════════════════════════════════
   BeInside — i18n (국제화) 모듈
   순수 JS, 프레임워크 없음
═══════════════════════════════════════════════════════════ */

var I18n = (function () {
  'use strict';

  var DEFAULT   = 'ko';
  var STORAGE_KEY = 'beinside_lang';

  var _locale  = DEFAULT;
  var _dict    = {};       // { ko: {...}, en: {...}, ... }
  var _ready   = false;
  var _onReady = [];

  /* ── 유틸: 중첩 키 조회  "a.b.c" → obj.a.b.c ── */
  function resolve(obj, key) {
    if (!obj || !key) return undefined;
    var parts = key.split('.');
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  /* ── 변수 치환: "{name}님" → "홍길동님" ── */
  function interpolate(str, vars) {
    if (!vars || typeof str !== 'string') return str;
    return str.replace(/\{(\w+)\}/g, function (_, k) {
      return vars[k] !== undefined ? vars[k] : '{' + k + '}';
    });
  }

  /* ── 언어: 한국어 고정 ──
     본문·산후 홈·위기 도크는 한국어뿐이라, 일부 라벨만 다른 언어가 되면 화면에 언어가 섞인다
     (reports/design/2026-09-direction.md D4·결정 6). 예전에 저장된 beinside_lang은 지운다.
     다문화 가이드는 자체 언어 선택(beinside_mc_lang, multicultural-page.js)을 쓰며 여기서 건드리지 않는다. */
  function detect() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    return DEFAULT;
  }

  /* ── JSON 로드 ── */
  function loadLocale(lang, cb) {
    if (_dict[lang]) { cb && cb(); return; }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'js/locales/' + lang + '.json', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200) {
        try { _dict[lang] = JSON.parse(xhr.responseText); }
        catch (e) { _dict[lang] = {}; }
      } else {
        _dict[lang] = {};
      }
      cb && cb();
    };
    xhr.send();
  }

  /* ── 번역 가져오기 ── */
  function t(key, vars) {
    var val = resolve(_dict[_locale], key);
    if (val === undefined) val = resolve(_dict[DEFAULT], key);
    if (val === undefined) return key;
    return interpolate(String(val), vars);
  }

  /* ── DOM 바인딩: data-i18n 속성 처리 ── */
  function applyDOM(root) {
    var container = root || document;
    var els = container.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var key = el.getAttribute('data-i18n');
      if (!key) continue;

      // data-i18n-attr: placeholder, aria-label 등 속성에 적용
      var attr = el.getAttribute('data-i18n-attr');
      if (attr) {
        el.setAttribute(attr, t(key));
      } else {
        el.textContent = t(key);
      }
    }
    // <html lang="ko">는 바꾸지 않는다 (한국어 고정)
  }

  /* ── 초기화 ── */
  function init(cb) {
    _locale = detect();

    loadLocale(DEFAULT, function () {
      _ready = true;
      applyDOM();
      for (var i = 0; i < _onReady.length; i++) _onReady[i]();
      _onReady = [];
      cb && cb();
    });
  }

  /* ── 준비 완료 콜백 ── */
  function onReady(fn) {
    if (_ready) { fn(); return; }
    _onReady.push(fn);
  }

  /* ── Public API ── */
  return {
    init:       init,
    t:          t,
    getLocale:  function () { return _locale; },
    applyDOM:   applyDOM,
    onReady:    onReady
  };
})();
