/* ═══════════════════════════════════════════════════════════
   BeInside — i18n (국제화) 모듈
   순수 JS, 프레임워크 없음
═══════════════════════════════════════════════════════════ */

var I18n = (function () {
  'use strict';

  var SUPPORTED = ['ko', 'en', 'vi', 'zh'];
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

  /* ── 언어 감지 ── */
  function detect() {
    // 1) localStorage
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;

    // 2) navigator.language (ko-KR → ko)
    var nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
    for (var i = 0; i < SUPPORTED.length; i++) {
      if (nav.indexOf(SUPPORTED[i]) === 0) return SUPPORTED[i];
    }

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
    // html lang 속성 업데이트
    document.documentElement.lang = _locale;
  }

  /* ── 언어 전환 ── */
  function setLocale(lang, cb) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT;
    _locale = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    // localStorage에 저장 후 새로고침 — JS 하드코딩 텍스트까지 완전 반영
    location.reload();
  }

  /* ── 초기화 ── */
  function init(cb) {
    _locale = detect();

    // 기본 언어(ko)와 선택 언어 동시 로드
    var loaded = 0;
    var needed = (_locale === DEFAULT) ? 1 : 2;

    function done() {
      loaded++;
      if (loaded >= needed) {
        _ready = true;
        applyDOM();
        for (var i = 0; i < _onReady.length; i++) _onReady[i]();
        _onReady = [];
        cb && cb();
      }
    }

    loadLocale(DEFAULT, done);
    if (_locale !== DEFAULT) loadLocale(_locale, done);
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
    setLocale:  setLocale,
    getLocale:  function () { return _locale; },
    applyDOM:   applyDOM,
    onReady:    onReady,
    SUPPORTED:  SUPPORTED
  };
})();
