/* ═══════════════════════════════════════════════════════════
   BeInside — 클라이언트 사이드 검색
   PAGE_META 기반 키워드 매칭 + 자연어 동의어 확장
═══════════════════════════════════════════════════════════ */

(function () {
  /* ── 동의어 사전: 사용자가 입력할 수 있는 자연어 → 페이지 매핑 ── */
  var SYNONYMS = {
    growth:     '아이 성장 발달 영유아 개월 돌 키 몸무게 체크리스트',
    sp:         '한부모 혼자 양육 싱글맘 싱글대디 이혼 양육비 복지',
    birth:      '출산 산후 산모 회복 오로 수유 모유 분유 산후조리',
    dad:        '아빠 아버지 육아 아빠육아 캥거루',
    elder:      '부모님 노인 간병 치매 돌봄 간호 요양 학대',
    grief:      '사별 상실 애도 죽음 떠남 유산 반려동물 장례',
    emotion:    '감정 슬픔 분노 화 무감각 외로움 불안 두려움 걱정',
    burnout:    '번아웃 소진 에너지 피로 무기력 탈진 스트레스',
    relation:   '관계 이별 이혼 헤어짐 가족 단절 결별',
    transition: '전환 실직 퇴직 이직 사업 실패 진로 방향',
    workplace:  '직장 회사 상사 나르시시스트 가스라이팅 괴롭힘 동료',
    teen:       '청소년 학생 10대 학교 왕따 고민 자해',
    sleep:      '수면 잠 불면 불면증 악몽 과수면 새벽',
    postpartum: '산후우울 산후우울증 출산후 우울 호르몬',
    menopause:  '갱년기 폐경 호르몬 빈둥지 중년',
    emergency:  '긴급 응급 SOS 119 112 109 1388 자살 위기 상담',
    journal:    '일기 감정기록 무드 기록 트래킹',
    mental:     '정신건강 생애주기 우울증 우울 정신과',
    multicultural: '다문화 베트남 중국 영어 이민 외국인',
    adhd:          'ADHD 주의력 집중 산만 과잉행동 성인ADHD 집중력',
    addiction:     '중독 스마트폰 게임 알코올 도박 술 의존',
    finance:       '금융 돈 부채 빚 파산 경제 서민 신용회복',
    senior:        '노인 어르신 고령 독거 외로움 고립 고독 은퇴 치매 기억 재산 학대 노인돌봄 부모님 혼자'
  };

  /* ── 검색 인덱스 빌드 ── */
  var _index = null;
  function buildIndex() {
    if (_index) return _index;
    _index = [];
    if (typeof PAGE_META === 'undefined') return _index;

    var icons = {
      growth:'🌱', sp:'👨‍👦', birth:'🤰', dad:'👨‍👧', elder:'🏠',
      grief:'🕊️', emotion:'💛', burnout:'🔥', relation:'💔',
      transition:'🔄', workplace:'🏢', teen:'🌙', sleep:'😴',
      postpartum:'🤱', menopause:'🌸', emergency:'🆘', journal:'📝',
      mental:'🧠', multicultural:'🌍',
      adhd:'🧩', addiction:'🔄', finance:'💰', senior:'🤲'
    };

    for (var id in PAGE_META) {
      if (id === 'home') continue;
      var m = PAGE_META[id];
      var synonymText = SYNONYMS[id] || '';
      _index.push({
        id: id,
        icon: icons[id] || '📄',
        title: m.title.replace(' — BeInside', ''),
        desc: m.desc,
        searchText: (m.title + ' ' + m.desc + ' ' + m.keywords + ' ' + synonymText).toLowerCase()
      });
    }
    return _index;
  }

  /* ── 검색 실행 ── */
  function search(query) {
    var q = query.trim().toLowerCase();
    if (!q) return [];

    var index = buildIndex();
    var terms = q.split(/\s+/);

    return index
      .map(function (item) {
        var score = 0;
        for (var i = 0; i < terms.length; i++) {
          if (item.searchText.indexOf(terms[i]) !== -1) score++;
        }
        return { item: item, score: score };
      })
      .filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .map(function (r) { return r.item; });
  }

  /* ── UI 렌더 ── */
  function renderResults(results) {
    var el = document.getElementById('search-results');
    if (!el) return;

    if (results.length === 0) {
      var input = document.getElementById('search-input');
      if (input && input.value.trim()) {
        el.innerHTML = '<div class="search-empty">검색 결과가 없어요. 다른 키워드로 시도해 보세요.</div>';
      } else {
        el.innerHTML = '<div class="search-hint">예: 불안, 수면, 한부모, 아빠 육아</div>';
      }
      return;
    }

    el.innerHTML = results.map(function (r) {
      return '<button class="search-result-item" onclick="closeSearch();showPage(\'' + r.id + '\')">'
        + '<span class="search-result-icon">' + r.icon + '</span>'
        + '<div class="search-result-text">'
        + '<strong>' + r.title + '</strong>'
        + '<span>' + r.desc.substring(0, 60) + (r.desc.length > 60 ? '…' : '') + '</span>'
        + '</div>'
        + '</button>';
    }).join('');
  }

  /* ── 열기/닫기 ── */
  var debounceTimer;

  window.openSearch = function () {
    var overlay = document.getElementById('search-overlay');
    var modal = document.getElementById('search-modal');
    var input = document.getElementById('search-input');
    if (overlay) overlay.classList.add('show');
    if (modal) modal.classList.add('show');
    if (input) {
      input.value = '';
      setTimeout(function () { input.focus(); }, 200);
    }
    renderResults([]);
  };

  window.closeSearch = function () {
    var overlay = document.getElementById('search-overlay');
    var modal = document.getElementById('search-modal');
    if (overlay) overlay.classList.remove('show');
    if (modal) modal.classList.remove('show');
  };

  /* ── 입력 이벤트 ── */
  document.addEventListener('DOMContentLoaded', function () {
    var input = document.getElementById('search-input');
    if (!input) return;

    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        renderResults(search(input.value));
      }, 150);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSearch();
    });
  });

  /* ── 키보드 단축키: Ctrl/Cmd+K ── */
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') closeSearch();
  });
})();
