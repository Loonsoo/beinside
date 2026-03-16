/* ═══════════════════════════════════════════════════════════
   BeInside — 나 자신 영역 가이드 (self-pages.js)
   Part B-2: 번아웃 | Part B-3: 관계 붕괴 | Part B-4: 인생 전환기
═══════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════
   Part B-2: 번아웃 가이드
══════════════════════════════════════════════════════ */

const BURNOUT_DATA = {
  intro: {
    title: '번아웃은 게으름이 아니에요',
    sub: '에너지가 바닥난 상태예요. 충전이 필요할 뿐이에요.',
    stat: { pct: '46.3%', label: '심각한 스트레스를 경험한 국민 비율 (국립정신건강센터, 2024년 정신건강실태조사)' }
  },
  check: {
    id: 'ct_burnout',
    title: '지금 내 상태는?',
    questions: [
      '일이 끝나도 피로가 풀리지 않는다',
      '예전에 좋아하던 것에 흥미를 잃었다',
      '사소한 일에도 짜증이 폭발한다',
      '"이 일을 왜 하고 있지?"라는 생각이 자주 든다',
      '몸이 자주 아프다 (두통, 소화불량, 가슴 답답함)',
      '쉬어도 쉰 것 같지 않다'
    ],
    results: {
      high: { label: '번아웃 가능성이 높아요', threshold: 4, action: '전문가와 상담해 보세요. 번아웃이 방치되면 우울증으로 발전할 수 있어요.' },
      mid:  { label: '주의가 필요해요', threshold: 2, action: '지금 바로 아래 행동 가이드를 시도해 보세요.' },
      low:  { label: '아직은 괜찮지만 예방이 중요해요', threshold: 0 }
    }
  },
  actions: {
    immediate: [
      { icon: '⏸️', text: '오늘 하루 업무량을 반으로 줄이세요. 안 되면 한 가지만이라도 내일로 미루세요.' },
      { icon: '🚶', text: '점심시간에 10분만 밖에 나가 걸으세요. 햇빛 + 걷기가 세로토닌을 가장 빠르게 올려줘요.' },
      { icon: '📱', text: '퇴근 후 SNS를 1시간만 줄여보세요. 비교가 번아웃의 연료예요.' }
    ],
    week: [
      { icon: '🛌', text: '수면 시간을 30분만 늘려보세요. 수면이 회복의 기반이에요.' },
      { icon: '🗣️', text: '신뢰하는 사람 1명에게 "나 좀 지쳤어"라고 말해보세요. 말하는 것만으로도 달라져요.' },
      { icon: '📋', text: '이번 주 "안 해도 되는 일" 목록을 만들어보세요. 빼는 것이 채우는 것보다 먼저예요.' }
    ],
    longterm: [
      { icon: '🧠', text: '번아웃과 우울증은 달라요. 쉬어도 회복이 안 된다면 우울증일 수 있어요. 전문가와 상담하세요.' },
      { icon: '🏢', text: '직장인이라면 EAP(근로자 지원 프로그램)를 확인해 보세요. 대기업 대부분 무료 상담을 제공해요.' },
      { icon: '💆', text: '환경을 바꿀 수 없다면 환경에 대한 나의 반응을 바꾸는 연습을 시작해 보세요. 인지행동치료(CBT)가 효과적이에요.' }
    ]
  },
  distinction: {
    title: '번아웃 vs 우울증, 어떻게 다른가요?',
    burnout: ['특정 영역(주로 직장)에 한정', '쉬면 일시적으로 나아짐', '"이 일을 왜 하지?"', '다른 분야에서는 에너지 있음'],
    depression: ['삶 전체에 영향', '쉬어도 나아지지 않음', '"살아서 뭐하지?"', '모든 영역에서 에너지 없음'],
    note: '구분이 어렵다면 전문가 상담이 가장 정확해요. 번아웃이 방치되면 우울증으로 발전할 수 있어요.'
  },
  help: [
    { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 번아웃이 심해졌을 때 언제든. 자세한 내용은 전화 시 확인해 주세요.' },
    { number: '1393', name: '자살예방상담전화', desc: '무료, 24시간. 극단적 생각이 들 때. 자세한 내용은 전화 시 확인해 주세요.' }
  ]
};

function _actionItems(steps) {
  return steps.map(s =>
    `<div class="action-item" onclick="toggleAction(this)" role="checkbox" aria-checked="false" tabindex="0">
      <div class="action-check" aria-hidden="true"></div>
      <div class="action-text"><span class="action-emoji">${s.icon}</span><span>${esc(s.text)}</span></div>
    </div>`
  ).join('');
}

function renderBurnoutPage(container) {
  if (!container) return;
  const d = BURNOUT_DATA;

  container.innerHTML = `
    <button class="page-back" onclick="goHome()">← 홈으로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,var(--burnout-d),var(--burnout))">
      <span class="content-hero-icon">🫠</span>
      <h1>${esc(d.intro.title)}</h1>
      <p>${esc(d.intro.sub)}</p>
    </div>
    <div class="stat-badge"><strong>${d.intro.stat.pct}</strong>&nbsp;${esc(d.intro.stat.label)}</div>

    <div class="step-section" id="burnout-check-wrap">
      <div class="step-label">① 상황 판단</div>
    </div>

    <div class="step-section">
      <div class="step-label">② 오늘 당장 할 수 있는 것</div>
      <div class="action-checklist">${_actionItems(d.actions.immediate)}</div>
    </div>

    <div class="step-section">
      <div class="step-label">③ 이번 주 + 장기 가이드</div>
      <div class="accordion-group">
        <div class="accordion-item">
          <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0">
            <span>📅 이번 주에 시도해볼 것</span><span class="accordion-arrow">▼</span>
          </div>
          <div class="accordion-body"><div class="accordion-body-inner">
            <div class="action-checklist">${_actionItems(d.actions.week)}</div>
          </div></div>
        </div>
        <div class="accordion-item">
          <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0">
            <span>🔄 번아웃에서 빠져나오기 위해</span><span class="accordion-arrow">▼</span>
          </div>
          <div class="accordion-body"><div class="accordion-body-inner">
            <div class="action-checklist">${_actionItems(d.actions.longterm)}</div>
          </div></div>
        </div>
        <div class="accordion-item">
          <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0">
            <span>${esc(d.distinction.title)}</span><span class="accordion-arrow">▼</span>
          </div>
          <div class="accordion-body"><div class="accordion-body-inner">
            <div class="distinction-grid">
              <div class="distinction-col burnout">
                <div class="distinction-col-title">번아웃</div>
                <ul>${d.distinction.burnout.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
              </div>
              <div class="distinction-col depression">
                <div class="distinction-col-title">우울증</div>
                <ul>${d.distinction.depression.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
              </div>
            </div>
            <p class="distinction-note">${esc(d.distinction.note)}</p>
          </div></div>
        </div>
      </div>
    </div>

    <div class="step-section">
      <div class="step-label">④ 도움 연결</div>
      <div class="help-cards">
        ${d.help.map(h => `
          <a href="tel:${h.number}" class="help-card" aria-label="${h.name} ${h.number}">
            <div class="help-card-num">📞 ${h.number}</div>
            <div class="help-card-info">
              <div class="help-card-name">${esc(h.name)}</div>
              <div class="help-card-desc">${esc(h.desc)}</div>
            </div>
          </a>`).join('')}
      </div>
    </div>
  `;

  const checkWrap = container.querySelector('#burnout-check-wrap');
  if (checkWrap && typeof renderCheckTool === 'function') renderCheckTool(checkWrap, d.check);
}

/* ══════════════════════════════════════════════════════
   Part B-3: 관계 붕괴 가이드
══════════════════════════════════════════════════════ */

const RELATIONSHIP_DATA = {
  situations: [
    { id: 'divorce', icon: '💔', label: '이혼 직후', sub: '감정·생활·정체성 모두 리셋 상태' },
    { id: 'family',  icon: '🏠', label: '가족과 단절', sub: '부모/형제와 관계가 끊어졌을 때' },
    { id: 'friend',  icon: '👥', label: '친구가 없어요', sub: '사회적 관계가 모두 사라진 느낌' },
    { id: 'breakup', icon: '💫', label: '이별 후 무너짐', sub: '연인과 헤어진 후 일상이 멈췄을 때' }
  ],
  divorce: {
    recognition: '이혼은 실패가 아니에요. 더 나은 삶을 위한 결정이었어요. 지금 느끼는 혼란은 완전히 정상이에요.',
    check: {
      id: 'ct_divorce', title: '지금 내 상태는?',
      questions: ['감정 기복이 심하고 집중이 안 된다','일상(식사, 수면, 업무)이 어렵다','아이(자녀)가 있어 걱정이 크다','나를 해치고 싶다는 생각이 든다'],
      emergencyIndex: 3,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:1393" style="color:inherit;font-weight:700">📞 1393</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '전문적 지원이 필요한 상태예요', threshold: 2, action: '정신건강복지센터(무료) 또는 한부모가족지원센터에 연락해 보세요.' },
        mid:  { label: '힘든 시기예요. 지지 체계가 필요해요.', threshold: 1 },
        low:  { label: '아래 가이드를 따라가 보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '📋', text: '오늘 가장 급한 것 하나만: 주거 안정 확인 (현재 있는 곳이 안전한가?)' },
      { icon: '💰', text: '이번 달 고정 지출 목록 작성 — 혼자 감당해야 할 금액 파악' },
      { icon: '🤝', text: '신뢰하는 사람 1명에게만 알리기. 모두에게 말하지 않아도 돼요.' },
      { icon: '⚖️', text: '법적 문제(재산, 양육권 등)는 대한법률구조공단(132)에서 무료 상담을 받을 수 있어요.' }
    ],
    help: [
      { number: '1644-6621', name: '한부모가족지원센터', desc: '자녀 양육·경제·법적 지원 안내. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '132', name: '대한법률구조공단', desc: '이혼·양육권·재산 관련 무료 법률 상담.' },
      { number: '1393', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },
  family: {
    recognition: '가족과의 단절은 사회적으로 잘 이야기되지 않아 더 외롭게 느껴져요. 하지만 자신을 지키기 위한 선택이 필요할 때도 있어요.',
    check: {
      id: 'ct_family', title: '지금 내 상태는?',
      questions: ['가족 이야기가 나올 때마다 불안하거나 슬프다','주변에 가족 대신 의지할 사람이 없다','과거 가족 관계로 인한 상처가 일상에 영향을 준다'],
      results: {
        high: { label: '트라우마 치료나 상담이 도움이 될 수 있어요.', threshold: 2, action: '정신건강복지센터(무료)에서 상담을 받을 수 있어요.' },
        mid:  { label: '지지 체계 만들기가 중요한 시점이에요.', threshold: 1 },
        low:  { label: '아래 방법으로 조금씩 나아갈 수 있어요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '🌱', text: '혈연 외의 "선택한 가족"을 만들 수 있어요. 친구, 커뮤니티, 상담사도 지지 체계가 돼요.' },
      { icon: '✍️', text: '감정을 글로 적어보세요. 말하기 어려운 감정도 쓰면서 정리돼요.' },
      { icon: '🤝', text: '관심 있는 모임(독서, 운동, 봉사)에 한 번만 참석해 보세요. 연결의 시작이에요.' }
    ],
    help: [
      { number: '1393', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' }
    ]
  },
  friend: {
    recognition: '어른이 될수록 새 친구를 사귀기 어려워요. 그건 내가 이상한 게 아니에요. 삶의 구조가 바뀌면 관계도 바뀌는 게 자연스러워요.',
    check: {
      id: 'ct_friend', title: '지금 내 상태는?',
      questions: ['연락할 수 있는 친구가 없다','외로움이 2주 이상 지속됐다','사람들과 있어도 외롭다 (만성적 고립감)'],
      results: {
        high: { label: '만성적 고립은 건강에 영향을 줄 수 있어요. 상담을 통해 도움을 받을 수 있어요.', threshold: 2, action: '정신건강복지센터(무료)에서 지원 프로그램도 운영해요.' },
        mid:  { label: '연결이 필요한 시점이에요.', threshold: 1 },
        low:  { label: '작은 연결부터 시작해 보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '🎯', text: '관심사 기반 모임 하나 찾기 (독서 클럽, 운동 클래스, 동네 모임 등)' },
      { icon: '💬', text: '온라인 커뮤니티도 연결이에요. 판단 없이 이야기 나눌 수 있는 공간을 찾아보세요.' },
      { icon: '☕', text: '직장 동료나 이웃에게 "커피 한 잔 어때요?" 한 번 말해보기.' }
    ],
    help: [
      { number: '1393', name: '자살예방상담전화', desc: '무료, 24시간. 외로울 때도 전화할 수 있어요. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' }
    ]
  },
  breakup: {
    recognition: '이별은 뇌에서 실제 통증으로 처리돼요. 아픈 게 당연해요. 일상이 멈춘 것 같은 느낌도 정상적인 반응이에요.',
    check: {
      id: 'ct_breakup', title: '지금 내 상태는?',
      questions: ['2주 이상 일상생활(식사, 수면, 업무)이 어렵다','이 사람 없이는 살 수 없다는 생각이 든다','나를 해치고 싶다는 생각이 든다'],
      emergencyIndex: 2,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:1393" style="color:inherit;font-weight:700">📞 1393</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '전문적 지원이 필요한 상태예요', threshold: 1, action: '정신건강복지센터(무료)에서 상담을 받아보세요.' },
        low:  { label: '지금 느끼는 것들은 회복의 과정이에요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '📵', text: 'SNS에서 전 연인 차단하기 (안 보이면 생각이 덜 나요). 준비가 됐을 때 하세요.' },
      { icon: '🧹', text: '집에서 전 연인의 물건·사진을 보이지 않는 곳에 두기 (버리지 않아도 돼요).' },
      { icon: '📞', text: '지금 연락할 수 있는 친구 1명에게 전화하기. "그냥 목소리 듣고 싶어서"라고만 해도 돼요.' }
    ],
    help: [
      { number: '1393', name: '자살예방상담전화', desc: '무료, 24시간. 이별 후 극단적 생각이 들 때. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' }
    ]
  }
};

function buildRelationDetail(container, id) {
  const d = RELATIONSHIP_DATA[id];
  const meta = RELATIONSHIP_DATA.situations.find(s => s.id === id);
  if (!d || !meta) return;

  container.innerHTML = `
    <button class="page-back" onclick="renderRelationPage(document.getElementById('relation-content'))">← 관계 가이드로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,var(--relation-d),var(--relation))">
      <span class="content-hero-icon">${meta.icon}</span>
      <h1>${esc(meta.label)}</h1>
      <p>${esc(meta.sub)}</p>
    </div>
    <div class="step-section">
      <div class="step-label">① 상황 인식</div>
      <p style="font-size:13.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;">${esc(d.recognition)}</p>
    </div>
    <div class="step-section" id="relation-check-${id}">
      <div class="step-label">② 상황 판단</div>
    </div>
    <div class="step-section">
      <div class="step-label">③ 행동 가이드</div>
      <div class="action-checklist">${_actionItems(d.actions)}</div>
    </div>
    <div class="step-section">
      <div class="step-label">④ 도움 연결</div>
      <div class="help-cards">
        ${d.help.map(h => `
          <a href="tel:${h.number}" class="help-card" aria-label="${h.name} ${h.number}">
            <div class="help-card-num">📞 ${h.number}</div>
            <div class="help-card-info">
              <div class="help-card-name">${esc(h.name)}</div>
              <div class="help-card-desc">${esc(h.desc)}</div>
            </div>
          </a>`).join('')}
      </div>
    </div>
  `;

  const checkWrap = container.querySelector(`#relation-check-${id}`);
  if (checkWrap && typeof renderCheckTool === 'function') renderCheckTool(checkWrap, d.check);
}

function renderRelationPage(container) {
  if (!container) return;
  container.innerHTML = `
    <button class="page-back" onclick="goHome()">← 홈으로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,var(--relation-d),var(--relation))">
      <span class="content-hero-icon">💔</span>
      <h1>관계가 무너졌을 때</h1>
      <p>이혼·가족 단절·고립감·이별 후 무너짐.<br>혼자 감당하지 않아도 돼요.</p>
    </div>
    <div class="step-section">
      <div class="step-label">어떤 상황이에요?</div>
      <div class="emotion-grid">
        ${RELATIONSHIP_DATA.situations.map(s => `
          <button class="emotion-btn" onclick="buildRelationDetail(document.getElementById('relation-content'),'${s.id}')" aria-label="${s.label}">
            <span class="emotion-btn-icon">${s.icon}</span>
            <div>
              <div style="font-size:13.5px;font-weight:600;">${esc(s.label)}</div>
              <div style="font-size:11.5px;color:var(--ink-l);">${esc(s.sub)}</div>
            </div>
          </button>`).join('')}
      </div>
    </div>
  `;
}

/* ══════════════════════════════════════════════════════
   Part B-4: 인생 전환기 가이드
══════════════════════════════════════════════════════ */

const TRANSITION_DATA = {
  situations: [
    { id: 'jobless',   icon: '📦', label: '실직·퇴사', sub: '직장을 잃거나 떠났을 때' },
    { id: 'failure',   icon: '📉', label: '사업·창업 실패', sub: '전부 걸었는데 무너졌을 때' },
    { id: 'direction', icon: '🧭', label: '진로를 모르겠어요', sub: '앞으로 뭘 해야 할지 막막할 때' },
    { id: 'move',      icon: '🏙️', label: '새로운 환경 적응', sub: '이사·전학·이민 후 아무도 모르는 곳' }
  ],
  jobless: {
    recognition: '직장을 잃는 것은 정체성의 일부가 흔들리는 경험이에요. 불안한 건 당연해요.',
    check: {
      id: 'ct_jobless', title: '지금 내 상태는?',
      questions: ['2주 이상 무기력하거나 불안하다','재정적으로 즉시 어려운 상황이다','나를 해치고 싶다는 생각이 든다'],
      emergencyIndex: 2,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:1393" style="color:inherit;font-weight:700">📞 1393</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '지금 전문적 지원이 필요해요', threshold: 2, action: '<a href="tel:1393">1393</a>(자살예방상담, 무료·24시간) 또는 <a href="tel:1577-0199">1577-0199</a>에 연락해 보세요.' },
        mid:  { label: '재정 + 정서 두 가지 모두 챙겨야 할 때예요.', threshold: 1 },
        low:  { label: '아래 순서대로 해보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '📋', text: '오늘 할 것: 실업급여 자격 확인 (고용보험 가입 여부 → 고용센터 1350)' },
      { icon: '💰', text: '이번 달 고정 지출 목록 작성 — 지금 당장 줄일 수 있는 것 표시' },
      { icon: '📱', text: '신뢰하는 사람 1명에게만 알리기. 혼자 삭이지 마세요.' },
      { icon: '🏋️', text: '하루 루틴 한 가지 유지하기 (기상 시간, 산책, 식사). 루틴이 심리적 안정을 만들어요.' }
    ],
    help: [
      { number: '1350', name: '고용노동부 고객센터', desc: '실업급여, 취업 지원 프로그램 안내.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 실직 후 심리적 어려움이 클 때. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1393', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },
  failure: {
    recognition: '사업 실패는 사람에 대한 실패가 아니에요. 수많은 성공한 사람들이 실패를 겪었어요. 지금 느끼는 수치심은 실제 현실보다 훨씬 크게 느껴질 수 있어요.',
    check: {
      id: 'ct_failure', title: '지금 내 상태는?',
      questions: ['수치심이나 자괴감이 매우 크다','재정적 위기 상황이다 (부채, 압류 등)','나를 해치고 싶다는 생각이 든다'],
      emergencyIndex: 2,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:1393" style="color:inherit;font-weight:700">📞 1393</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '지금 전문적 지원이 필요해요', threshold: 2, action: '<a href="tel:1393">1393</a>(자살예방상담, 무료·24시간)에 연락해 보세요.' },
        mid:  { label: '재정·정서 모두 도움이 필요한 시점이에요.', threshold: 1 },
        low:  { label: '아래 순서대로 해보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '⚖️', text: '부채가 있다면: 법률구조공단(132) 무료 상담. 개인회생·파산도 새 출발의 방법이에요.' },
      { icon: '🧠', text: '지금 느끼는 수치심은 실제보다 크게 느껴져요. "나는 실패한 사람"이 아니라 "사업이 어려웠다"예요.' },
      { icon: '🤝', text: '같은 경험을 한 사람을 찾아보세요. 창업 커뮤니티에는 실패를 나누는 문화가 있어요.' }
    ],
    help: [
      { number: '132', name: '대한법률구조공단', desc: '부채·파산·개인회생 무료 법률 상담.' },
      { number: '1393', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },
  direction: {
    recognition: '진로를 모르는 건 이상한 게 아니에요. 삶의 방향이 명확한 사람이 오히려 소수예요. "모른다"는 것은 아직 가능성이 열려 있다는 뜻이에요.',
    check: {
      id: 'ct_direction', title: '지금 내 상태는?',
      questions: ['무력감이 2주 이상 지속됐다','아무것도 하기 싫은 상태다','미래에 대한 희망이 없다는 생각이 든다'],
      results: {
        high: { label: '우울증 증상과 비슷할 수 있어요. 전문가 상담을 권해요.', threshold: 2, action: '정신건강복지센터(무료)에서 상담을 받아보세요.' },
        mid:  { label: '지쳐있는 상태예요. 먼저 에너지를 회복하는 것이 우선이에요.', threshold: 1 },
        low:  { label: '아래 방법으로 방향을 찾아보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '✍️', text: '"내가 재미있었던 것 10개" 목록 적기. 진로는 흥미에서 시작해요.' },
      { icon: '🗣️', text: '관심 있는 분야의 사람 1명에게 "어떻게 이 일 하게 됐어요?"라고 물어보기.' },
      { icon: '🎯', text: '커리어넷(careernet.go.kr) 직업 흥미 검사 — 무료, 10분이면 돼요.' }
    ],
    help: [
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 무력감이 클 때. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1393', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },
  move: {
    recognition: '새로운 곳에서 아무도 모르는 느낌, 그건 정상이에요. 어른이 된 후의 이사나 이민은 예상보다 훨씬 외롭고 어려워요.',
    check: {
      id: 'ct_move', title: '지금 내 상태는?',
      questions: ['이사·이민 후 2주 이상 적응이 어렵다','의지할 사람이 새 환경에 아무도 없다','돌아가고 싶다는 생각이 매우 강하다'],
      results: {
        high: { label: '적응 장애나 우울증으로 발전할 수 있어요. 상담을 권해요.', threshold: 2, action: '새 지역 정신건강복지센터(무료)를 검색해 보세요.' },
        mid:  { label: '적응 기간이 필요해요. 3~6개월은 걸려요.', threshold: 1 },
        low:  { label: '조금씩 연결을 만들어 나가 보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '🗺️', text: '동네를 직접 걸어보기. 공간을 몸으로 느끼면 낯섦이 줄어요.' },
      { icon: '☕', text: '자주 가는 카페나 편의점 한 곳 정하기. "단골 공간"이 소속감을 만들어요.' },
      { icon: '📱', text: '이전 동네 친구와 주 1회 영상통화 약속 잡기. 연결이 끊어지지 않아도 돼요.' }
    ],
    help: [
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1393', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  }
};

function buildTransitionDetail(container, id) {
  const d = TRANSITION_DATA[id];
  const meta = TRANSITION_DATA.situations.find(s => s.id === id);
  if (!d || !meta) return;

  container.innerHTML = `
    <button class="page-back" onclick="renderTransitionPage(document.getElementById('transition-content'))">← 전환기 가이드로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,var(--transition-d),var(--transition-c))">
      <span class="content-hero-icon">${meta.icon}</span>
      <h1>${esc(meta.label)}</h1>
      <p>${esc(meta.sub)}</p>
    </div>
    <div class="step-section">
      <div class="step-label">① 상황 인식</div>
      <p style="font-size:13.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;">${esc(d.recognition)}</p>
    </div>
    <div class="step-section" id="transition-check-${id}">
      <div class="step-label">② 상황 판단</div>
    </div>
    <div class="step-section">
      <div class="step-label">③ 행동 가이드</div>
      <div class="action-checklist">${_actionItems(d.actions)}</div>
    </div>
    <div class="step-section">
      <div class="step-label">④ 도움 연결</div>
      <div class="help-cards">
        ${d.help.map(h => `
          <a href="tel:${h.number}" class="help-card" aria-label="${h.name} ${h.number}">
            <div class="help-card-num">📞 ${h.number}</div>
            <div class="help-card-info">
              <div class="help-card-name">${esc(h.name)}</div>
              <div class="help-card-desc">${esc(h.desc)}</div>
            </div>
          </a>`).join('')}
      </div>
    </div>
  `;

  const checkWrap = container.querySelector(`#transition-check-${id}`);
  if (checkWrap && typeof renderCheckTool === 'function') renderCheckTool(checkWrap, d.check);
}

function renderTransitionPage(container) {
  if (!container) return;
  container.innerHTML = `
    <button class="page-back" onclick="goHome()">← 홈으로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,var(--transition-d),var(--transition-c))">
      <span class="content-hero-icon">🌀</span>
      <h1>인생 전환기 가이드</h1>
      <p>삶의 방향이 흔들릴 때, 여기서부터 시작해 보세요.</p>
    </div>
    <div class="step-section">
      <div class="step-label">어떤 상황이에요?</div>
      <div class="emotion-grid">
        ${TRANSITION_DATA.situations.map(s => `
          <button class="emotion-btn" onclick="buildTransitionDetail(document.getElementById('transition-content'),'${s.id}')" aria-label="${s.label}">
            <span class="emotion-btn-icon">${s.icon}</span>
            <div>
              <div style="font-size:13.5px;font-weight:600;">${esc(s.label)}</div>
              <div style="font-size:11.5px;color:var(--ink-l);">${esc(s.sub)}</div>
            </div>
          </button>`).join('')}
      </div>
    </div>
  `;
}
