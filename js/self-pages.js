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
  recognition: {
    title: '지금 이런 상태인가요?',
    items: [
      '아침에 눈을 뜨면 "또 하루"라는 생각부터 들어요',
      '일이 끝나도 피로가 풀리지 않아요',
      '예전에 좋아하던 것에 더 이상 흥미가 없어요',
      '사소한 일에도 짜증이 폭발해요',
      '몸이 자주 아파요 (두통, 소화불량, 가슴 답답함)'
    ]
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
      { icon: '⏸️', text: '오늘 하루 업무량을 반으로 줄이세요. 결정의 수를 줄이면 전전두엽의 부담이 줄어들어요.' },
      { icon: '🚶', text: '점심시간에 10분만 밖에 나가 걸으세요. 햇빛 + 걷기가 세로토닌을 가장 빠르게 올려줘요.' },
      { icon: '📱', text: '퇴근 후 SNS를 1시간만 줄여보세요. 비교가 번아웃의 연료예요.' }
    ],
    week: [
      { icon: '🛌', text: '수면 시간을 30분만 늘려보세요. 수면이 회복의 기반이에요.' },
      { icon: '🗣️', text: '신뢰하는 사람 1명에게 "나 좀 지쳤어"라고 말해보세요. 감정을 말로 꺼내면 편도체 활성화가 줄어들어요.' },
      { icon: '📋', text: '이번 주 "안 해도 되는 일" 목록을 만들어보세요. 의무감을 줄이면 코르티솔 분비가 완화돼요.' }
    ],
    longterm: [
      { icon: '🧠', text: '번아웃과 우울증은 달라요. 쉬어도 회복이 안 된다면, 먼저 수면과 식사 루틴부터 점검해 보세요. 그래도 나아지지 않으면 전문가 상담도 좋은 선택이에요.' },
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
  psychology: '번아웃은 WHO가 2019년 공식 인정한 "직업적 현상"이에요. 만성적 직무 스트레스가 관리되지 않을 때 발생해요. 뇌과학적으로 장기 스트레스는 코르티솔 과잉→고갈 순환을 만들고, 전전두엽 기능이 저하되어 결정·집중·감정 조절이 어려워져요.',
  techniques: [
    { name: '에너지 감사(Energy Audit)', desc: '하루 활동을 적고, 각 활동 옆에 +/- 표시하세요. 에너지를 빼앗는 것(-)을 줄이고, 채워주는 것(+)을 늘리는 것이 회복의 구조예요.' },
    { name: '경계 설정(Boundary Setting)', desc: '"아니요"라고 말하는 것은 이기적인 게 아니에요. "지금은 어렵습니다"라는 한 문장이 번아웃 예방의 가장 강력한 도구예요.' },
    { name: '마이크로 회복(Micro-Recovery)', desc: '1시간마다 2분, 눈 감고 깊게 숨 3번. 점심에 10분 산책. 퇴근 후 30분 디지털 디톡스. 작은 회복이 쌓이면 큰 붕괴를 막아요.' },
    { name: '인지행동치료(CBT) 자가 적용', desc: '"완벽하게 못 하면 실패야"라는 생각을 발견하면, "충분히 했다"로 바꿔보세요. 전부-아니면-전무 사고가 번아웃을 악화시켜요.' }
  ],
  help: [
    { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 번아웃이 심해졌을 때 언제든. 자세한 내용은 전화 시 확인해 주세요.' },
    { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 극단적 생각이 들 때. 자세한 내용은 전화 시 확인해 주세요.' }
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

  const techHTML = d.techniques ? d.techniques.map(t =>
    `<div style="margin-bottom:12px;">
      <div style="font-size:13px;font-weight:700;color:var(--peach-d);margin-bottom:4px;">${esc(t.name)}</div>
      <p style="font-size:12.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;">${esc(t.desc)}</p>
    </div>`
  ).join('') : '';

  container.innerHTML = `
    <button class="page-back" onclick="goHome()">← 홈으로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,var(--burnout-d),var(--burnout))">
      <span class="content-hero-icon">🫠</span>
      <h1>${esc(d.intro.title)}</h1>
      <p>${esc(d.intro.sub)}</p>
    </div>
    <div class="stat-badge"><strong>${d.intro.stat.pct}</strong>&nbsp;${esc(d.intro.stat.label)}</div>

    <div class="step-section">
      <div class="step-label">${esc(d.recognition.title)}</div>
      <div style="background:var(--warm);border-radius:14px;padding:16px 18px;">
        ${d.recognition.items.map(item =>
          `<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;font-size:13px;color:var(--ink-m);line-height:1.7;word-break:keep-all;">
            <span style="color:var(--peach-d);flex-shrink:0;">•</span><span>${esc(item)}</span>
          </div>`
        ).join('')}
        <p style="font-size:12px;color:var(--ink-l);margin-top:8px;line-height:1.6;">하나라도 해당된다면, 아래 내용을 천천히 살펴보세요.</p>
      </div>
    </div>

    <div class="accordion-group">
      ${d.psychology ? `
      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🧠 번아웃, 뇌에서 무슨 일이 일어나고 있는 걸까?</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <p style="font-size:13px;color:var(--ink-m);line-height:1.8;word-break:keep-all;">${esc(d.psychology)}</p>
        </div></div>
      </div>` : ''}

      ${techHTML ? `
      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>💡 정신의학적 자기 회복법</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          ${techHTML}
        </div></div>
      </div>` : ''}

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🔍 상황 판단</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div id="burnout-check-wrap"></div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>⏸️ 오늘 당장 할 수 있는 것</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div class="action-checklist">${_actionItems(d.actions.immediate)}</div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>📅 이번 주에 시도해볼 것</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div class="action-checklist">${_actionItems(d.actions.week)}</div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🔄 번아웃에서 빠져나오기 위해</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div class="action-checklist">${_actionItems(d.actions.longterm)}</div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
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

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>📞 도움 연결</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
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
        </div></div>
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
    psychology: '이혼은 뇌에서 실제 물리적 통증과 같은 영역을 활성화해요. 애착 대상을 잃는 것은 존 볼비(Bowlby)의 애착이론에서 말하는 "분리 고통"이에요. 분노→흥정→우울→수용의 단계를 거치는 건 정상적인 애도(grief) 과정이에요.',
    techniques: [
      { name: '애도의 단계 이해', desc: '분노, 흥정, 우울이 번갈아 올 수 있어요. 이건 "약해서"가 아니라 뇌가 새로운 현실을 처리하는 과정이에요. 자연스러운 순서를 믿어보세요.' },
      { name: '자기 서사 재구성', desc: '"실패한 결혼"이 아니라 "그 시기에 최선이었던 선택"으로 이야기를 다시 써보세요. 서사가 바뀌면 감정도 바뀌어요.' },
      { name: '루틴 재설계', desc: '함께했던 일상이 사라지면 공허함이 커져요. 새로운 아침 루틴, 주말 계획을 의식적으로 만들어 보세요. 구조가 안정감을 줘요.' }
    ],
    check: {
      id: 'ct_divorce', title: '지금 내 상태는?',
      questions: ['감정 기복이 심하고 집중이 안 된다','일상(식사, 수면, 업무)이 어렵다','아이(자녀)가 있어 걱정이 크다','나를 해치고 싶다는 생각이 든다'],
      emergencyIndex: 3,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:109" style="color:inherit;font-weight:700">📞 109</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '지금 많이 힘든 상태예요', threshold: 2, action: '오늘 하나만: 가장 급한 것(주거, 재정) 하나를 정리해 보세요. 한부모가족지원센터나 정신건강복지센터(무료)도 함께 힘이 돼요.' },
        mid:  { label: '힘든 시기예요. 지지 체계가 필요해요.', threshold: 1 },
        low:  { label: '아래 가이드를 따라가 보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '📋', text: '오늘 가장 급한 것 하나만: 주거 안정 확인 (현재 있는 곳이 안전한가?). 작은 문제 해결이 통제감을 되찾아줘요.' },
      { icon: '💰', text: '이번 달 고정 지출 목록 작성. 숫자로 정리하면 막연한 불안이 구체적 계획으로 바뀌어요.' },
      { icon: '🤝', text: '신뢰하는 사람 1명에게만 알리기. 사회적 유대는 옥시토신을 분비시켜 스트레스를 낮춰줘요.' },
      { icon: '⚖️', text: '법적 문제(재산, 양육권 등)는 대한법률구조공단(132)에서 무료 상담을 받을 수 있어요.' }
    ],
    help: [
      { number: '1644-6621', name: '한부모가족지원센터', desc: '자녀 양육·경제·법적 지원 안내. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '132', name: '대한법률구조공단', desc: '이혼·양육권·재산 관련 무료 법률 상담.' },
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },
  family: {
    recognition: '가족과의 단절은 사회적으로 잘 이야기되지 않아 더 외롭게 느껴져요. 하지만 자신을 지키기 위한 선택이 필요할 때도 있어요.',
    psychology: '가족 단절은 "관계적 트라우마"의 한 형태예요. 어릴 때 형성된 애착 패턴이 성인기 관계에 그대로 영향을 미쳐요. 가족과의 건강한 거리두기는 자기 보호이지 이기심이 아니에요.',
    techniques: [
      { name: '내면 아이 작업(Inner Child Work)', desc: '가족 관계에서 받은 상처는 "어린 시절의 나"가 안고 있는 경우가 많아요. "그때의 나에게 뭐라고 말해주고 싶어?"라고 물어보세요.' },
      { name: '선택한 가족(Chosen Family)', desc: '혈연만이 가족이 아니에요. 나를 존중하고 지지하는 사람들이 진짜 가족이 될 수 있어요. 의식적으로 연결을 만들어 보세요.' },
      { name: '경계 연습', desc: '"가족이니까 참아야지"는 건강하지 않아요. "이 대화는 나에게 해로워요"라고 말할 수 있는 것이 성숙한 경계예요.' }
    ],
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
      { icon: '🌱', text: '혈연 외의 "선택한 가족"을 만들 수 있어요. 뇌는 혈연과 비혈연의 유대를 같은 애착 회로로 처리해요.' },
      { icon: '✍️', text: '감정을 글로 적어보세요. 표현적 글쓰기는 전전두엽을 활성화해 감정 조절을 도와줘요.' },
      { icon: '🤝', text: '관심 있는 모임(독서, 운동, 봉사)에 한 번만 참석해 보세요. 공동 활동은 뇌의 사회적 보상 회로를 깨워줘요.' }
    ],
    help: [
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' }
    ]
  },
  friend: {
    recognition: '어른이 될수록 새 친구를 사귀기 어려워요. 그건 내가 이상한 게 아니에요. 삶의 구조가 바뀌면 관계도 바뀌는 게 자연스러워요.',
    psychology: '사회적 고립은 하루 담배 15개비만큼 건강에 해로워요 (Holt-Lunstad, 2015). 외로움이 만성화되면 뇌의 위협 감지 시스템이 과민해져서, 새로운 관계를 시도하는 것 자체가 "위험"으로 느껴져요.',
    techniques: [
      { name: '사회적 근육 훈련', desc: '친구 사귀기도 근육이에요. 편의점 직원에게 인사→카페 단골 되기→동호회 참석. 작은 것부터 "사회적 근육"을 키워보세요.' },
      { name: '취약성의 힘', desc: '브레네 브라운 교수의 연구에 따르면, 진정한 연결은 완벽함이 아니라 "취약함"에서 시작돼요. "나도 외로워"라고 먼저 말하는 용기가 연결의 시작이에요.' },
      { name: '관계 질 vs 양', desc: '100명의 지인보다 1명의 진짜 친구가 정신건강에 더 큰 영향을 미쳐요. 숫자가 아닌 깊이에 집중해 보세요.' }
    ],
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
      { icon: '🎯', text: '관심사 기반 모임 하나 찾기. 공동 활동은 뇌의 거울 뉴런을 활성화해 자연스러운 유대감을 만들어요.' },
      { icon: '💬', text: '온라인 커뮤니티도 연결이에요. 텍스트 소통도 뇌의 사회적 보상 회로를 활성화해요.' },
      { icon: '☕', text: '직장 동료나 이웃에게 "커피 한 잔 어때요?" 한 번 말해보기. 작은 연결 시도가 옥시토신을 분비시켜요.' }
    ],
    help: [
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 외로울 때도 전화할 수 있어요. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' }
    ]
  },
  breakup: {
    recognition: '이별은 뇌에서 실제 통증으로 처리돼요. 아픈 게 당연해요. 일상이 멈춘 것 같은 느낌도 정상적인 반응이에요.',
    psychology: '이별은 뇌의 보상 회로(도파민 시스템)가 갑자기 끊기는 것과 같아요. 연인과의 관계에서 분비되던 옥시토신·도파민이 사라지면서 뇌는 "금단 증상"과 유사한 반응을 보여요. 이것이 "못 잊겠다"의 신경과학적 이유예요.',
    techniques: [
      { name: '무접촉(No Contact) 원칙', desc: 'SNS 차단, 연락 끊기가 잔인한 게 아니에요. 뇌의 도파민 회로를 끊어야 새로운 보상 체계가 형성돼요. 최소 30일을 권해요.' },
      { name: '슬픔 허용 시간', desc: '하루 20분을 "슬퍼도 되는 시간"으로 정하세요. 그 시간에는 실컷 울어도 돼요. 대신 시간이 끝나면 다른 활동으로 전환하세요.' },
      { name: '자기 정체성 회복', desc: '"우리"가 아닌 "나"로 돌아오세요. 연인 없이도 나는 완전한 사람이에요. 혼자 해보고 싶었던 것 하나를 이번 주에 해보세요.' }
    ],
    check: {
      id: 'ct_breakup', title: '지금 내 상태는?',
      questions: ['2주 이상 일상생활(식사, 수면, 업무)이 어렵다','이 사람 없이는 살 수 없다는 생각이 든다','나를 해치고 싶다는 생각이 든다'],
      emergencyIndex: 2,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:109" style="color:inherit;font-weight:700">📞 109</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '지금 많이 힘든 상태예요', threshold: 1, action: '오늘 하나만: 이 감정을 종이에 적어보세요. 그리고 준비가 되면 정신건강복지센터(무료) 상담도 도움이 돼요.' },
        low:  { label: '지금 느끼는 것들은 회복의 과정이에요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '📵', text: 'SNS에서 전 연인 차단하기. 시각적 자극을 차단하면 뇌의 도파민 갈망 회로가 점차 약해져요.' },
      { icon: '🧹', text: '집에서 전 연인의 물건·사진을 보이지 않는 곳에 두기. 환경적 단서를 줄이면 뇌의 회복이 빨라져요.' },
      { icon: '📞', text: '지금 연락할 수 있는 친구 1명에게 전화하기. 목소리를 듣는 것만으로도 옥시토신이 분비돼요.' }
    ],
    help: [
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 이별 후 극단적 생각이 들 때. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' }
    ]
  }
};

function buildRelationDetail(container, id) {
  const d = RELATIONSHIP_DATA[id];
  const meta = RELATIONSHIP_DATA.situations.find(s => s.id === id);
  if (!d || !meta) return;

  const techHTML = d.techniques ? d.techniques.map(t =>
    `<div style="margin-bottom:12px;">
      <div style="font-size:13px;font-weight:700;color:var(--peach-d);margin-bottom:4px;">${esc(t.name)}</div>
      <p style="font-size:12.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;">${esc(t.desc)}</p>
    </div>`
  ).join('') : '';

  container.innerHTML = `
    <button class="page-back" onclick="renderRelationPage(document.getElementById('relation-content'))">← 관계 가이드로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,var(--relation-d),var(--relation))">
      <span class="content-hero-icon">${meta.icon}</span>
      <h1>${esc(meta.label)}</h1>
      <p>${esc(meta.sub)}</p>
    </div>

    <div class="step-section">
      <div class="step-label">지금 이런 상태예요</div>
      <p style="font-size:13.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;">${esc(d.recognition)}</p>
    </div>

    <div class="accordion-group">
      ${d.psychology ? `
      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🧠 왜 이렇게 힘든 걸까?</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <p style="font-size:13px;color:var(--ink-m);line-height:1.8;word-break:keep-all;">${esc(d.psychology)}</p>
        </div></div>
      </div>` : ''}

      ${techHTML ? `
      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>💡 심리학적 자기 돌봄법</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          ${techHTML}
        </div></div>
      </div>` : ''}

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🔍 상황 판단</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div id="relation-check-${id}"></div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>✅ 행동 가이드</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div class="action-checklist">${_actionItems(d.actions)}</div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>📞 도움 연결</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
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
        </div></div>
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
    psychology: '실직은 단순한 수입 상실이 아니라 "역할 정체성"의 상실이에요. 에릭슨(Erikson)의 발달 이론에서 직업은 성인기 정체감의 핵심이에요. 정체성 공백이 우울·불안으로 이어질 수 있어요.',
    techniques: [
      { name: '역할 다변화', desc: '"직장인"만이 내 정체성이 아니에요. 친구, 자녀, 취미인, 배우는 사람 — 다른 역할들을 의식적으로 활성화해 보세요.' },
      { name: '구조화된 하루', desc: '출근하지 않아도 기상→아침→활동→점심→활동→저녁의 구조를 유지하세요. 구조가 없으면 무기력이 빠르게 찾아와요.' },
      { name: '작은 성취 일기', desc: '매일 저녁 "오늘 한 것 3개" 적기. 지원서 하나 썼다, 산책했다, 밥 해먹었다 — 아무리 작아도 괜찮아요.' }
    ],
    check: {
      id: 'ct_jobless', title: '지금 내 상태는?',
      questions: ['2주 이상 무기력하거나 불안하다','재정적으로 즉시 어려운 상황이다','나를 해치고 싶다는 생각이 든다'],
      emergencyIndex: 2,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:109" style="color:inherit;font-weight:700">📞 109</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '지금 전문적 지원이 필요해요', threshold: 2, action: '<a href="tel:109">109</a>(자살예방상담, 무료·24시간) 또는 <a href="tel:1577-0199">1577-0199</a>에 연락해 보세요.' },
        mid:  { label: '재정 + 정서 두 가지 모두 챙겨야 할 때예요.', threshold: 1 },
        low:  { label: '아래 순서대로 해보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '📋', text: '오늘 할 것: 실업급여 자격 확인 (고용보험 가입 여부 → 고용센터 1350)' },
      { icon: '💰', text: '이번 달 고정 지출 목록 작성. 숫자로 정리하면 막연한 불안이 구체적 계획으로 바뀌어요.' },
      { icon: '📱', text: '신뢰하는 사람 1명에게만 알리기. 감정을 말로 꺼내면 편도체 활성화가 줄어들어요.' },
      { icon: '🏋️', text: '하루 루틴 한 가지 유지하기 (기상 시간, 산책, 식사). 루틴이 심리적 안정을 만들어요.' }
    ],
    help: [
      { number: '1350', name: '고용노동부 고객센터', desc: '실업급여, 취업 지원 프로그램 안내.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 실직 후 심리적 어려움이 클 때. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },
  failure: {
    recognition: '사업 실패는 사람에 대한 실패가 아니에요. 수많은 성공한 사람들이 실패를 겪었어요. 지금 느끼는 수치심은 실제 현실보다 훨씬 크게 느껴질 수 있어요.',
    psychology: '사업 실패 후 느끼는 수치심은 뇌의 사회적 통증 회로를 활성화해요. "다른 사람들이 나를 어떻게 볼까"는 진화적 생존 본능(집단에서 배제당할 공포)에서 비롯돼요. 이 감정은 실제보다 훨씬 크게 느껴져요.',
    techniques: [
      { name: '인지적 탈융합(Defusion)', desc: '"나는 실패자다"를 "나는 \'나는 실패자다\'라는 생각을 하고 있다"로 바꿔보세요. 생각과 나를 분리하면 그 생각의 지배력이 줄어들어요.' },
      { name: '실패 재프레이밍', desc: '실패는 "끝"이 아니라 "데이터"예요. "무엇을 배웠는가?"를 적어보세요. 이 과정이 회복탄력성(Resilience)의 핵심이에요.' },
      { name: '수치심 내성 훈련', desc: '브레네 브라운의 방법: 수치심을 느끼면 신뢰할 수 있는 1명에게 말하세요. 수치심은 비밀 속에서 자라고, 말하는 순간 줄어들어요.' }
    ],
    check: {
      id: 'ct_failure', title: '지금 내 상태는?',
      questions: ['수치심이나 자괴감이 매우 크다','재정적 위기 상황이다 (부채, 압류 등)','나를 해치고 싶다는 생각이 든다'],
      emergencyIndex: 2,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:109" style="color:inherit;font-weight:700">📞 109</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '지금 전문적 지원이 필요해요', threshold: 2, action: '<a href="tel:109">109</a>(자살예방상담, 무료·24시간)에 연락해 보세요.' },
        mid:  { label: '재정·정서 모두 도움이 필요한 시점이에요.', threshold: 1 },
        low:  { label: '아래 순서대로 해보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '⚖️', text: '부채가 있다면: 법률구조공단(132) 무료 상담. 개인회생·파산도 새 출발의 방법이에요.' },
      { icon: '🧠', text: '지금 느끼는 수치심은 실제보다 크게 느껴져요. "나는 실패한 사람"이 아니라 "사업이 어려웠다"예요.' },
      { icon: '🤝', text: '같은 경험을 한 사람을 찾아보세요. 수치심은 나눌 때 줄어들어요. 창업 커뮤니티에는 실패를 나누는 문화가 있어요.' }
    ],
    help: [
      { number: '132', name: '대한법률구조공단', desc: '부채·파산·개인회생 무료 법률 상담.' },
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },
  direction: {
    recognition: '진로를 모르는 건 이상한 게 아니에요. 삶의 방향이 명확한 사람이 오히려 소수예요. "모른다"는 것은 아직 가능성이 열려 있다는 뜻이에요.',
    psychology: '방향 상실감은 실존적 공허(existential vacuum)의 한 형태예요. 빅터 프랭클(Frankl)은 "의미의 부재"가 현대인의 가장 큰 고통이라 했어요. 방향을 모르는 것 자체가 문제가 아니라, "방향을 알아야 한다"는 압박이 고통을 만들어요.',
    techniques: [
      { name: '가치 탐색(Values Clarification)', desc: '"하고 싶은 일"이 아니라 "어떤 사람이 되고 싶은가"부터 생각해 보세요. 직업은 바뀔 수 있지만, 가치(정직, 창의, 돌봄 등)는 방향을 잡아줘요.' },
      { name: '실험적 접근', desc: '정답을 찾으려 하지 말고, 작은 실험을 해보세요. 1주일 봉사활동, 1달 취미 수업, 1일 직업 체험 — 해봐야 맞는지 알 수 있어요.' },
      { name: '비교 중단 연습', desc: 'SNS에서 "잘 나가는 동기"를 보면 더 막막해져요. 1주일만 SNS 사용을 줄이고, 나의 내면에 집중하는 시간을 만들어 보세요.' }
    ],
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
      { icon: '✍️', text: '"내가 재미있었던 것 10개" 목록 적기. 기억을 정리하면 뇌의 자기 참조 네트워크가 활성화돼 방향이 보이기 시작해요.' },
      { icon: '🗣️', text: '관심 있는 분야의 사람 1명에게 "어떻게 이 일 하게 됐어요?"라고 물어보기. 대화가 뇌의 탐색 회로를 깨워줘요.' },
      { icon: '🎯', text: '커리어넷(careernet.go.kr) 직업 흥미 검사 — 무료, 10분이면 돼요. 객관적 데이터가 막연한 불안을 줄여줘요.' }
    ],
    help: [
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 무력감이 클 때. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },
  move: {
    recognition: '새로운 곳에서 아무도 모르는 느낌, 그건 정상이에요. 어른이 된 후의 이사나 이민은 예상보다 훨씬 외롭고 어려워요.',
    psychology: '새 환경 적응은 "문화 충격(Culture Shock)"의 U자 곡선을 따라요: 기대→충격→적응→안정. 지금 힘든 건 "충격" 단계일 수 있어요. 이 단계는 반드시 지나가요. 보통 3~6개월이 걸려요.',
    techniques: [
      { name: '앵커 포인트 만들기', desc: '"나만의 장소" 하나를 만드세요. 자주 가는 카페, 산책로, 공원 벤치 — 익숙한 공간이 심리적 안전기지(Secure Base) 역할을 해요.' },
      { name: '과도기 의식(Transition Ritual)', desc: '이사 전 동네에 작별 인사 편지 쓰기, 새 동네에서 "첫 산책" 하기. 의식적인 구분이 뇌에게 "새로운 시작"의 신호를 보내요.' },
      { name: '연결 유지 + 연결 생성', desc: '이전 관계를 유지하면서(주 1회 영상통화) 새 관계를 만들어 보세요(동네 모임). 둘 다 필요해요.' }
    ],
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
      { icon: '🗺️', text: '동네를 직접 걸어보기. 몸으로 공간을 경험하면 뇌가 "인지 지도"를 만들어 안정감이 생겨요.' },
      { icon: '☕', text: '자주 가는 카페나 편의점 한 곳 정하기. "단골 공간"이 소속감을 만들어요.' },
      { icon: '📱', text: '이전 동네 친구와 주 1회 영상통화 약속 잡기. 기존 유대를 유지하면 뇌의 애착 시스템이 안정돼요.' }
    ],
    help: [
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  }
};

function buildTransitionDetail(container, id) {
  const d = TRANSITION_DATA[id];
  const meta = TRANSITION_DATA.situations.find(s => s.id === id);
  if (!d || !meta) return;

  const techHTML = d.techniques ? d.techniques.map(t =>
    `<div style="margin-bottom:12px;">
      <div style="font-size:13px;font-weight:700;color:var(--peach-d);margin-bottom:4px;">${esc(t.name)}</div>
      <p style="font-size:12.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;">${esc(t.desc)}</p>
    </div>`
  ).join('') : '';

  container.innerHTML = `
    <button class="page-back" onclick="renderTransitionPage(document.getElementById('transition-content'))">← 전환기 가이드로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,var(--transition-d),var(--transition-c))">
      <span class="content-hero-icon">${meta.icon}</span>
      <h1>${esc(meta.label)}</h1>
      <p>${esc(meta.sub)}</p>
    </div>

    <div class="step-section">
      <div class="step-label">지금 이런 상태예요</div>
      <p style="font-size:13.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;">${esc(d.recognition)}</p>
    </div>

    <div class="accordion-group">
      ${d.psychology ? `
      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🧠 왜 이렇게 힘든 걸까?</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <p style="font-size:13px;color:var(--ink-m);line-height:1.8;word-break:keep-all;">${esc(d.psychology)}</p>
        </div></div>
      </div>` : ''}

      ${techHTML ? `
      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>💡 심리학적 자기 돌봄법</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          ${techHTML}
        </div></div>
      </div>` : ''}

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🔍 상황 판단</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div id="transition-check-${id}"></div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>✅ 행동 가이드</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div class="action-checklist">${_actionItems(d.actions)}</div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>📞 도움 연결</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
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
        </div></div>
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

/* ══════════════════════════════════════════════════════
   Part B-5: 직장 내 어려운 사람 가이드 (정신분석학 관점)
══════════════════════════════════════════════════════ */

/** 전문 용어 사전 — term() 함수로 자동 툴팁 생성 */
const TERM_GLOSSARY = {
  '그레이 록(Gray Rock)': '나르시시스트에게 감정적 반응을 보이지 않는 기법이에요. 회색 바위처럼 무미건조하고 지루한 존재가 되면, 상대가 흥미를 잃고 다른 타겟을 찾게 돼요.',
  '나르시시즘': '자기 자신에 대한 과도한 집착과 타인의 인정에 대한 강한 욕구를 특징으로 하는 성격 패턴이에요. 겉으로는 자신감이 넘쳐 보이지만, 내면에는 깊은 불안정감이 있어요.',
  '자기 대상(self-object)': '코헛이 제안한 개념으로, 자신의 자존감을 유지하기 위해 필요로 하는 타인을 뜻해요. 나르시시스트는 주변 사람을 자기 가치를 확인하는 거울처럼 사용해요.',
  '하인즈 코헛(Kohut)': '자기 심리학(Self Psychology)의 창시자인 오스트리아계 미국 정신분석학자예요. 나르시시즘을 병리가 아닌 자기 발달의 미성숙으로 이해하는 혁신적 관점을 제시했어요.',
  '투사(projection)': '자신의 불안·결함·욕망을 인정하지 못하고, 마치 상대방의 것인 양 돌리는 무의식적 방어 기제예요. 예: 자신이 거짓말을 하면서 상대를 거짓말쟁이라고 비난하는 것.',
  '거짓 자기(false self)': '위니컷이 제안한 개념으로, 진짜 감정과 욕구를 숨기고 사회적 기대에 맞춘 가면을 쓴 상태예요. 가스라이터는 이 가면으로 현실을 조작해요.',
  '위니컷(Winnicott)': '영국의 소아과 의사이자 정신분석학자예요. "충분히 좋은 엄마(good enough mother)", "참 자기/거짓 자기", "전이적 대상" 등의 개념으로 유명해요.',
  '멜라니 클라인(Klein)': '대상관계이론의 선구자인 오스트리아계 영국 정신분석학자예요. 인간의 내면에서 "좋은 대상"과 "나쁜 대상"을 분리하는 심리 과정을 연구했어요.',
  '수동 공격': '분노나 불만을 직접 표현하지 않고, 비협조·지연·빈정거림 등 간접적인 방식으로 표출하는 행동 패턴이에요. 겉으로는 순종적이지만 속으로는 저항해요.',
  '기생적 동일시': '대상관계이론 용어로, 타인의 성과·정체성·가치를 자기 것처럼 내면화하는 원시적 방어 기제예요. 자신의 공허함을 남의 것으로 채우려 해요.',
  '대상관계이론': '인간의 심리 발달과 성격 형성이 초기 대인관계(특히 양육자와의 관계)에 의해 결정된다는 정신분석학 이론이에요. 클라인, 위니컷, 페어베언 등이 주요 학자예요.',
  '투사(Projection)': '자신의 불안·결함·욕망을 인정하지 못하고, 마치 상대방의 것인 양 돌리는 무의식적 방어 기제예요. 예: 자신이 거짓말을 하면서 상대를 거짓말쟁이라고 비난하는 것.',
  '전이(Transference)': '과거 중요한 관계(부모, 형제 등)에서 느꼈던 감정과 기대를 현재 관계 상대에게 무의식적으로 옮기는 현상이에요. 예: 권위적인 상사에게 아버지에 대한 분노를 느끼는 것.',
  '역전이(Countertransference)': '상대의 행동이 내 안에 불러일으키는 강렬한 감정 반응이에요. 원래는 치료자의 반응을 뜻했지만, 일상에서도 상대가 유발하는 감정을 관찰하면 관계 역학을 이해할 수 있어요.',
  '경계(Boundaries)': '나와 타인 사이의 심리적 구분선이에요. 건강한 경계는 자신의 감정·시간·에너지를 보호하면서도 타인과 연결될 수 있게 해 줘요. 경계가 없으면 소진되고, 너무 단단하면 고립돼요.',
  '방어 기제': '불안이나 고통스러운 감정으로부터 자아를 보호하기 위해 무의식적으로 작동하는 심리적 전략이에요. 투사, 합리화, 부정, 억압 등이 대표적이에요.',
  '충분히 좋은 환경': '위니컷의 개념으로, 완벽하지 않아도 안전하고 지지적인 환경이면 건강한 발달이 가능하다는 뜻이에요. 직장에서도 최소한의 심리적 안전이 필요해요.',
};

/**
 * 텍스트 내 전문 용어를 툴팁 HTML로 변환
 * @param {string} text - 원본 텍스트 (이미 esc() 처리된)
 * @returns {string} 툴팁이 적용된 HTML
 */
function termify(text) {
  let result = text;
  // 긴 용어부터 매칭 (부분 매칭 방지)
  const sorted = Object.keys(TERM_GLOSSARY).sort((a, b) => b.length - a.length);
  for (const term of sorted) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'g');
    if (regex.test(result) && !result.includes('class="term">' + term)) {
      result = result.replace(regex,
        '<span class="term">' + term + '<span class="term-tip">' + TERM_GLOSSARY[term] + '</span></span>'
      );
    }
  }
  return result;
}

const WORKPLACE_TYPES = [
  {
    icon: '🎭', name: '나르시시스트 (자기애성 성격)',
    traits: ['자신의 업적은 과장하고, 타인의 성과는 깎아내려요','공감 능력이 부족해요 — 상대의 감정에 무관심해요','비판에 극도로 예민하게 반응해요 (분노 또는 보복)','주변 사람을 통제하려는 욕구가 강해요'],
    analysis: '정신분석학적으로 나르시시즘은 깊은 자기 불안정감의 방어 기제예요. 하인즈 코헛(Kohut)은 이를 "자기 대상(self-object)" 욕구의 미성숙으로 설명했어요. 이들은 당신의 인정을 통해 자신의 존재를 확인하려 해요.',
    coping: [
      { icon: '🪨', text: '그레이 록(Gray Rock) 기법을 사용해 보세요. 감정적 반응을 최소화하면 관심을 잃어요. 무미건조하게, 사무적으로만 대응하세요.' },
      { icon: '🚧', text: '"그 부분은 제 업무 범위가 아닙니다"라고 명확히 경계를 설정하세요. 짧고 단호하게.' },
      { icon: '📋', text: '부당한 지시, 모욕적 발언을 날짜·시간·장소와 함께 기록해 두세요.' },
      { icon: '💎', text: '"이 사람의 평가가 나의 가치를 결정하지 않는다"를 매일 스스로에게 말해 보세요.' }
    ]
  },
  {
    icon: '🌫️', name: '가스라이터 (현실 왜곡자)',
    traits: ['"내가 언제 그랬어?" — 실제 일어난 일을 부정해요','"너무 예민하게 구는 거 아니야?" — 감정을 무효화해요','다른 동료 앞에서 당신의 판단력을 의심하게 만들어요','정보를 선택적으로 공유하여 혼란을 유발해요'],
    analysis: '가스라이팅은 투사(projection)의 극단적 형태예요. 자신의 불안과 결함을 상대에게 전가하여 심리적 우위를 차지하려 해요. 위니컷(Winnicott)의 관점에서, 이들은 "거짓 자기(false self)"로 세상을 조작해요.',
    coping: [
      { icon: '📝', text: '대화 후 바로 메모하세요. "3/19 11시 회의에서 A가 B라고 말함" — 구체적 기록이 현실 감각을 지켜줘요.' },
      { icon: '👥', text: '신뢰할 수 있는 동료에게 "이 상황 어떻게 보여?"라고 확인해 보세요. 제3자 시각이 중요해요.' },
      { icon: '🧭', text: '"내 감정이 이상한 게 아니라, 상황이 이상한 것"이라고 기억하세요. 감정과 사실을 분리하세요.' },
      { icon: '💬', text: '가능하면 이메일이나 메신저로 소통하세요. 기록이 남는 채널이 당신을 보호해요.' }
    ]
  },
  {
    icon: '😤', name: '수동 공격형 (뒤에서 칼)',
    traits: ['표면적으로 동의하면서 실제로는 비협조해요','간접적 비난: "다들 잘하던데, 특이하게 하시네요"','의도적 업무 지연, "깜빡했어요" 반복','뒤에서 험담하면서 앞에서는 웃어요'],
    analysis: '수동 공격은 직접적 갈등을 두려워하는 사람의 방어 기제예요. 멜라니 클라인(Klein)의 이론에서 이들은 "나쁜 대상"에 대한 분노를 직접 표현하지 못하고 우회적으로 발산해요.',
    coping: [
      { icon: '📌', text: '"언제까지 해주실 수 있나요?"처럼 명확한 기한을 정하세요. 모호함이 이들의 무기예요.' },
      { icon: '🛡️', text: '이면의 메시지에 반응하지 마세요. 표면적 말만 문자 그대로 받아들이세요.' },
      { icon: '✉️', text: '업무 요청과 합의 사항을 이메일로 확인하세요. "방금 말씀하신 내용 정리해서 보내드려요."' },
      { icon: '😌', text: '감정적 반응을 자제하세요. 이들은 당신의 좌절감에서 만족을 얻어요.' }
    ]
  },
  {
    icon: '🔍', name: '마이크로매니저 (통제 집착형)',
    traits: ['모든 세부 사항을 직접 확인하고 승인하려 해요','자율성을 주지 않고 끊임없이 보고를 요구해요','사소한 실수에 과도하게 반응해요','위임을 못 해서 팀 전체의 속도가 느려져요'],
    analysis: '정신분석적으로 통제 욕구는 불안의 방어예요. 통제를 통해 예측 불가능한 세상에서 안전감을 확보하려 해요. 이들의 불신은 당신의 능력이 아니라 자신의 불안에서 비롯돼요.',
    coping: [
      { icon: '📊', text: '물어보기 전에 먼저 진행 상황을 공유하세요. 선제적 보고가 이들의 불안을 줄여줘요.' },
      { icon: '✅', text: '작은 약속을 정확히 지켜서 점진적으로 신뢰를 쌓고 자율성을 확보하세요.' },
      { icon: '🧘', text: '"이 사람의 불안이 나의 문제는 아니다"를 기억하세요. 감정을 분리하세요.' },
      { icon: '📅', text: '"이 방법으로 진행하되, 결과는 금요일에 공유하겠습니다." 한계를 부드럽게 설정하세요.' }
    ]
  },
  {
    icon: '🦊', name: '성과 탈취형 (공 빼기 전문가)',
    traits: ['팀의 성과를 자신의 것처럼 보고해요','아이디어를 가져간 후 "원래 내 생각이었어"라고 해요','실패 시에만 팀원을 언급해요','윗사람에게는 완전히 다른 모습을 보여요'],
    analysis: '이들은 자기 가치의 취약성을 타인의 성과로 보상해요. 대상관계이론에서 말하는 "기생적 동일시" — 타인의 것을 자기 것으로 내면화하는 원시적 방어예요.',
    coping: [
      { icon: '📧', text: '중요한 작업은 이메일 CC로 여러 사람에게 공유하세요. 가시성이 보호막이에요.' },
      { icon: '🗣️', text: '"제가 분석한 자료를 기반으로..."처럼 자연스럽게 기여를 밝히세요.' },
      { icon: '🎤', text: '아이디어는 1:1이 아닌 회의에서 공개적으로 발표하세요.' },
      { icon: '📓', text: '작업 일지를 꾸준히 남기세요. 필요 시 증거가 돼요.' }
    ]
  }
];

const WORKPLACE_MINDSET = [
  { name: '투사(Projection)를 인식하세요', desc: '상대가 당신에게 던지는 비난 중 상당수는 자신의 내면을 투사한 것이에요. "이건 내 문제인가, 저 사람의 문제인가?"를 구분하는 연습을 해 보세요.' },
  { name: '전이(Transference)에 말려들지 마세요', desc: '직장 관계에서 과거의 관계 패턴이 반복될 수 있어요. "이 감정이 정말 지금 상황에 맞는 크기인가?"를 점검해 보세요. 과거의 상처가 현재를 왜곡하고 있을 수 있어요.' },
  { name: '역전이(Countertransference)를 관찰하세요', desc: '상대에 대한 나의 강렬한 감정 반응은 중요한 정보예요. 분노, 무력감, 수치심 — 이 감정들이 상대가 유발한 것인지 살펴보세요. 그 감정은 상대의 문제를 반영할 수 있어요.' },
  { name: '경계(Boundaries)는 나를 위한 것이에요', desc: '경계를 세우는 것은 이기적인 게 아니에요. 위니컷은 "충분히 좋은 환경"이 성장에 필수적이라 했어요. 당신도 안전한 심리적 공간을 가질 자격이 있어요.' },
  { name: '"치료할 필요 없는 사람"을 구분하세요', desc: '모든 관계를 고치려 하지 마세요. 당신은 상대의 치료사가 아니에요. 변화시킬 수 있는 것(나의 반응)과 없는 것(상대의 성격)을 구분하세요. 에너지를 지켜야 해요.' }
];

function renderWorkplacePage(container) {
  if (!container) return;
  const typesHTML = WORKPLACE_TYPES.map(t => `
    <div class="accordion-item">
      <div class="accordion-head" onclick="toggleAccordion(this)">
        <span style="font-size:20px">${t.icon}</span>
        <span style="font-weight:700;font-size:14px;">${esc(t.name)}</span>
        <span class="accordion-arrow">▾</span>
      </div>
      <div class="accordion-body"><div class="accordion-body-inner">
        <div style="font-size:13px;font-weight:600;color:var(--ink);margin-bottom:8px;">이런 특징이 보여요</div>
        <ul style="font-size:13px;color:var(--ink-m);line-height:1.8;padding-left:18px;margin-bottom:14px;">
          ${t.traits.map(tr => '<li>' + esc(tr) + '</li>').join('')}
        </ul>
        <div style="background:var(--lavender-p);border-radius:12px;padding:14px 16px;margin-bottom:14px;">
          <div style="font-size:11px;font-weight:700;color:var(--lavender-d);letter-spacing:.05em;margin-bottom:6px;">🧠 정신분석학적 이해</div>
          <p style="font-size:12.5px;color:var(--ink-m);line-height:1.75;">${termify(t.analysis)}</p>
        </div>
        <div style="font-size:13px;font-weight:600;color:var(--ink);margin-bottom:8px;">대처 방법</div>
        <div class="action-checklist">
          ${t.coping.map(c => `
            <div class="action-item" onclick="toggleAction(this)">
              <span class="action-check"></span>
              <span class="action-icon">${c.icon}</span>
              <span class="action-text">${termify(c.text)}</span>
            </div>`).join('')}
        </div>
      </div></div>
    </div>`).join('');
  const mindsetHTML = WORKPLACE_MINDSET.map((m, i) => `
    <div style="background:var(--white);border:1px solid var(--line);border-radius:14px;padding:16px 18px;margin-bottom:10px;">
      <div style="font-size:13px;font-weight:700;color:var(--peach-d);margin-bottom:5px;">${i + 1}. ${termify(m.name)}</div>
      <p style="font-size:12.5px;color:var(--ink-m);line-height:1.75;">${termify(m.desc)}</p>
    </div>`).join('');
  container.innerHTML = `
    <button class="page-back" onclick="goHome()">← 홈으로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,#4A6A8A,#5A7A9A)">
      <span class="content-hero-icon">🏢</span>
      <h1>직장에서 어려운 사람 대처 가이드</h1>
      <p>당신 탓이 아니에요. 정신분석학 관점의 이해와 실전 대처법</p>
    </div>
    <div class="stat-badge"><strong>73.6%</strong>&nbsp;직장인이 지난 1년간 정신건강 문제를 경험 (국립정신건강센터, 2024)</div>

    <div class="step-section">
      <div class="step-label">지금 이런 상황인가요?</div>
      <div style="background:var(--warm);border-radius:14px;padding:16px 18px;">
        <div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;font-size:13px;color:var(--ink-m);line-height:1.7;word-break:keep-all;">
          <span style="color:var(--peach-d);flex-shrink:0;">•</span><span>특정 사람 때문에 출근이 두려워요</span>
        </div>
        <div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;font-size:13px;color:var(--ink-m);line-height:1.7;word-break:keep-all;">
          <span style="color:var(--peach-d);flex-shrink:0;">•</span><span>대화 후 자존감이 바닥나는 느낌이에요</span>
        </div>
        <div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;font-size:13px;color:var(--ink-m);line-height:1.7;word-break:keep-all;">
          <span style="color:var(--peach-d);flex-shrink:0;">•</span><span>내가 잘못한 건지 헷갈려요</span>
        </div>
        <div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;font-size:13px;color:var(--ink-m);line-height:1.7;word-break:keep-all;">
          <span style="color:var(--peach-d);flex-shrink:0;">•</span><span>퇴근 후에도 그 사람 생각에서 벗어나기 어려워요</span>
        </div>
        <p style="font-size:12px;color:var(--ink-l);margin-top:8px;line-height:1.6;">그건 당신이 예민한 게 아니에요. 아래에서 유형과 대처법을 확인해 보세요.</p>
      </div>
    </div>

    <div class="accordion-group">
      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🔍 유형 파악 — 어떤 사람인가요?</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <p style="font-size:12.5px;color:var(--ink-l);margin-bottom:14px;">해당하는 유형을 눌러보세요. 특징과 대처법을 알려드려요.</p>
          <div class="accordion-group">${typesHTML}</div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🧠 나의 중심을 지키는 마음가짐</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <p style="font-size:12.5px;color:var(--ink-l);margin-bottom:14px;">정신분석학의 핵심 개념으로 나를 보호하는 방법이에요.</p>
          ${mindsetHTML}
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>✅ 지금 바로 할 수 있는 것</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div class="action-checklist">
            <div class="action-item" onclick="toggleAction(this)"><span class="action-check"></span><span class="action-icon">📝</span><span class="action-text">오늘부터 "감정 일기"를 시작해 보세요. 직장에서 느낀 불편한 감정과 상황을 3줄로 기록하세요.</span></div>
            <div class="action-item" onclick="toggleAction(this)"><span class="action-check"></span><span class="action-icon">🧘</span><span class="action-text">퇴근 후 "심리적 탈의" 의식을 만들어 보세요. 샤워하며 직장의 감정을 물과 함께 흘려보내는 상상을 해 보세요.</span></div>
            <div class="action-item" onclick="toggleAction(this)"><span class="action-check"></span><span class="action-icon">🗣️</span><span class="action-text">신뢰할 수 있는 사람 1명에게 "나 요즘 직장에서 힘들어"라고 말해 보세요. 말하는 것만으로 달라져요.</span></div>
            <div class="action-item" onclick="toggleAction(this)"><span class="action-check"></span><span class="action-icon">📚</span><span class="action-text">추천 도서: 「나는 왜 네가 힘든 걸까」(김혜남), 「경계의 기술」(헨리 클라우드)</span></div>
          </div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>📞 도움 연결</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div class="help-cards">
            <a href="tel:109" class="help-card"><div class="help-card-num">📞 109</div><div class="help-card-info"><div class="help-card-name">정신건강위기상담</div><div class="help-card-desc">무료, 24시간. 직장 스트레스로 심각한 고통을 겪고 있다면</div></div></a>
            <a href="tel:1350" class="help-card"><div class="help-card-num">📞 1350</div><div class="help-card-info"><div class="help-card-name">고용노동부 상담센터</div><div class="help-card-desc">직장 내 괴롭힘·부당 대우 신고 및 상담</div></div></a>
            <a href="tel:15770199" class="help-card"><div class="help-card-num">📞 1577-0199</div><div class="help-card-info"><div class="help-card-name">정신건강복지센터</div><div class="help-card-desc">무료, 24시간. 전문 심리 상담 연결</div></div></a>
          </div>
          <div style="margin-top:14px;padding:12px 16px;background:var(--warm);border-radius:12px;font-size:12.5px;color:var(--ink-m);line-height:1.7;">
            💼 <strong>EAP(근로자 지원 프로그램)</strong>가 회사에 있다면 무료로 전문 상담을 받을 수 있어요. 인사팀에 문의하거나, 사내 복지 페이지를 확인해 보세요.
          </div>
        </div></div>
      </div>
    </div>
  `;
}

/* ══════════════════════════════════════════════════════
   Part B-6: 산후우울증 가이드
══════════════════════════════════════════════════════ */

const POSTPARTUM_DATA = {
  intro: {
    title: '이건 의지 문제가 아니에요',
    sub: '출산 후 호르몬과 뇌의 변화가 만든 자연스러운 반응이에요.',
    stat: { pct: '68.5%', label: '산모 중 산후우울감 경험 비율 (보건복지부 2024 산후조리 실태조사)' }
  },
  recognition: {
    title: '지금 이런 느낌이 드나요?',
    items: [
      '아기를 보면서도 기쁘지 않고, 오히려 죄책감이 들어요',
      '아무것도 하고 싶지 않은데, 쉴 수도 없어요',
      '"나는 좋은 엄마가 아닌 것 같아"라는 생각이 멈추지 않아요',
      '갑자기 눈물이 나거나, 아무 이유 없이 화가 나요',
      '아기와 단둘이 있는 게 무서워요'
    ]
  },
  science: {
    title: '산후우울증, 왜 생기는 걸까요?',
    text: '출산 후 에스트로겐과 프로게스테론이 급격히 떨어져요. 이 호르몬들은 세로토닌과 도파민 조절에 관여하기 때문에, 호르몬 변화만으로도 기분·수면·식욕이 크게 흔들릴 수 있어요. 여기에 수면 부족, 역할 변화, 고립감이 더해지면 뇌의 감정 조절 회로가 과부하 상태에 빠지게 돼요.',
    distinctions: [
      { name: '베이비 블루스', desc: '출산 후 3~5일에 시작, 2주 이내 자연스럽게 나아져요. 산모 80%가 경험해요.', icon: '🌧️' },
      { name: '산후우울증', desc: '2주 이상 지속되는 깊은 우울·무기력. 일상생활이 어려워요. 전문 도움이 필요해요.', icon: '🌑' },
      { name: '산후 정신병', desc: '환각, 망상, 혼란 등 극단적 증상. 즉시 응급 의료가 필요한 상태예요.', icon: '🚨' }
    ]
  },
  check: {
    id: 'ct_postpartum',
    title: '산후우울증 자가 체크',
    sub: '지난 7일을 기준으로 체크해 주세요 (의학적 진단이 아닌 참고용)',
    questions: [
      '이유 없이 슬프거나 눈물이 났다',
      '아무것도 하고 싶지 않고 무기력했다',
      '아기에 대한 감정이 잘 느껴지지 않았다',
      '불안하거나 초조하고 공황 증상이 있었다',
      '잠들기 어렵거나 아기가 자도 잠이 오지 않았다',
      '식욕이 크게 변했다 (전혀 없거나 과식)',
      '나 자신이나 아기를 해치고 싶다는 생각이 들었다'
    ],
    emergencyIndex: 6,
    emergencyMsg: '<strong>지금 바로 도움을 받을 수 있어요.</strong><br>📞 <a href="tel:109">109</a> (자살예방상담, 무료·24시간)<br>이 생각은 호르몬 변화가 만든 것이에요. 당신의 잘못이 아니에요.',
    results: {
      high: { label: '산후우울증 가능성이 높아요', threshold: 4, action: '혼자 감당하지 않아도 돼요. 산부인과나 정신건강의학과 방문을 권해요. 보건소에서 무료 상담도 가능해요.' },
      mid:  { label: '주의가 필요한 상태예요', threshold: 2, action: '아래 행동 가이드를 시도해 보세요. 2주 후에도 나아지지 않으면 전문가 상담을 고려해 보세요.' },
      low:  { label: '지금은 비교적 안정적이에요', threshold: 0 }
    }
  },
  actions: {
    immediate: [
      { icon: '🛌', text: '수면을 최우선으로 — 누군가에게 도움을 받아 최소 4시간 연속 수면을 확보해 보세요. 수면 부족이 우울증의 가장 강력한 촉진제예요.' },
      { icon: '☀️', text: '하루 10분, 햇빛 아래 나가 보세요. 세로토닌 합성에 자연광이 필수적이에요. 아기와 함께도 괜찮아요.' },
      { icon: '📱', text: '"나 좀 힘들어"라고 말할 사람 1명에게 연락해 보세요. 감정을 말로 꺼내면 편도체 활성화가 줄어들어요.' }
    ],
    week: [
      { icon: '🍽️', text: '규칙적인 식사를 시도해 보세요 — 완벽하지 않아도 돼요. 오메가-3(생선, 견과류)와 비타민D가 기분 조절에 도움이 돼요.' },
      { icon: '🚶', text: '가벼운 산책을 시작해 보세요. 10~15분이면 충분해요. 운동은 항우울제에 버금가는 효과가 있어요.' },
      { icon: '📓', text: '하루 3줄 감정 일기를 써보세요. "오늘 힘들었던 것 1개, 감사한 것 1개, 내일 할 수 있는 것 1개". 인지행동치료의 핵심이에요.' }
    ],
    longterm: [
      { icon: '🏥', text: '보건소 정신건강 서비스는 무료예요 — 산후우울증 선별 검사(EPDS)를 받아볼 수 있어요. 정신건강의학과 방문은 치과 가는 것과 같아요.' },
      { icon: '💊', text: '산후우울증은 약물치료 + 심리치료 병행 시 80% 이상 개선돼요. 수유 중에도 안전한 약이 있으니 의사와 상의해 보세요.' },
      { icon: '👥', text: '산후우울증 자조 모임이나 온라인 커뮤니티에 참여해 보세요. 같은 경험을 나누는 것만으로도 고립감이 줄어들어요.' }
    ]
  },
  riskFactors: {
    title: '산후우울증 고위험군',
    items: [
      '이전에 우울증·불안장애를 경험한 적이 있는 경우',
      '가족 중 우울증 병력이 있는 경우',
      '사회적 지지가 부족한 경우 (혼자 육아)',
      '임신·출산 중 합병증을 경험한 경우',
      '원치 않은 임신이었던 경우',
      '경제적 어려움이 있는 경우'
    ]
  },
  partnerTip: {
    title: '배우자·가족이 알아야 할 것',
    items: [
      '"힘내", "다 그런 거야"는 도움이 안 돼요. "네가 힘든 거 알아. 내가 뭘 해줄까?"가 훨씬 나아요.',
      '밤중 수유 1회라도 대신하면 연속 수면 확보에 큰 도움이 돼요.',
      '산후우울증은 의지의 문제가 아니에요. "병원에 같이 가자"고 제안해 보세요.',
      '집안일·외부 방문객 관리를 대신 맡아주세요. 산모의 에너지를 아끼는 것이 최고의 지지예요.'
    ]
  },
  help: [
    { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 극단적 생각이 들 때. 자세한 내용은 전화 시 확인해 주세요.' },
    { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 산후우울증 포함 정신건강 전반 상담.' },
    { number: '1366', name: '여성긴급전화', desc: '무료, 24시간. 산후 위기, 가정 내 어려움 상담 및 긴급 보호 연계.' }
  ]
};

function renderPostpartumPage(container) {
  if (!container) return;
  const d = POSTPARTUM_DATA;

  const distHTML = d.science.distinctions.map(di =>
    `<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;">
      <span style="font-size:20px;flex-shrink:0;">${di.icon}</span>
      <div>
        <div style="font-size:13px;font-weight:700;color:var(--peach-d);margin-bottom:2px;">${esc(di.name)}</div>
        <p style="font-size:12.5px;color:var(--ink-m);line-height:1.7;word-break:keep-all;">${esc(di.desc)}</p>
      </div>
    </div>`
  ).join('');

  container.innerHTML = `
    <button class="page-back" onclick="goHome()">← 홈으로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,#B07BAC,#D4A0B0)">
      <span class="content-hero-icon">🌸</span>
      <h1>${esc(d.intro.title)}</h1>
      <p>${esc(d.intro.sub)}</p>
    </div>
    <div class="stat-badge"><strong>${d.intro.stat.pct}</strong>&nbsp;${esc(d.intro.stat.label)}</div>

    <div class="step-section">
      <div class="step-label">${esc(d.recognition.title)}</div>
      <div style="background:var(--warm);border-radius:14px;padding:16px 18px;">
        ${d.recognition.items.map(item =>
          `<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;font-size:13px;color:var(--ink-m);line-height:1.7;word-break:keep-all;">
            <span style="color:var(--peach-d);flex-shrink:0;">•</span><span>${esc(item)}</span>
          </div>`
        ).join('')}
        <p style="font-size:12px;color:var(--ink-l);margin-top:8px;line-height:1.6;">하나라도 해당된다면, 아래 내용을 천천히 읽어보세요.</p>
      </div>
    </div>

    <div class="accordion-group">
      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🧠 ${esc(d.science.title)}</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <p style="font-size:13px;color:var(--ink-m);line-height:1.8;word-break:keep-all;margin-bottom:16px;">${esc(d.science.text)}</p>
          <div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:10px;">베이비 블루스 vs 산후우울증 vs 산후 정신병</div>
          ${distHTML}
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🔍 상황 판단 — 자가 체크</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div id="postpartum-check-wrap"></div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>⏸️ 오늘 당장 할 수 있는 것</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div class="action-checklist">${_actionItems(d.actions.immediate)}</div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>📅 이번 주에 시도해볼 것</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div class="action-checklist">${_actionItems(d.actions.week)}</div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🏥 전문적 도움 받기</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div class="action-checklist">${_actionItems(d.actions.longterm)}</div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>⚠️ ${esc(d.riskFactors.title)}</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div style="background:var(--warm);border-radius:12px;padding:14px 16px;">
            ${d.riskFactors.items.map(item =>
              `<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:6px;font-size:13px;color:var(--ink-m);line-height:1.7;word-break:keep-all;">
                <span style="flex-shrink:0;">•</span><span>${esc(item)}</span>
              </div>`
            ).join('')}
            <p style="font-size:12px;color:var(--ink-l);margin-top:10px;line-height:1.6;">해당 사항이 있다면, 산후우울 증상이 나타나기 전에 미리 전문가와 상담해 보는 것도 좋아요.</p>
          </div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>💑 ${esc(d.partnerTip.title)}</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div style="background:var(--warm);border-radius:12px;padding:14px 16px;">
            ${d.partnerTip.items.map(item =>
              `<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;font-size:13px;color:var(--ink-m);line-height:1.7;word-break:keep-all;">
                <span style="flex-shrink:0;">💬</span><span>${esc(item)}</span>
              </div>`
            ).join('')}
          </div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>📞 도움 연결</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
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
        </div></div>
      </div>
    </div>

    <div style="margin:20px 0;padding:14px 18px;background:linear-gradient(135deg,rgba(176,123,172,.08),rgba(212,160,176,.06));border:1px solid rgba(176,123,172,.15);border-radius:14px;">
      <div style="font-size:13px;font-weight:700;color:var(--peach-d);margin-bottom:6px;">출산 후 신체 회복이 궁금하다면</div>
      <div style="font-size:12.5px;color:var(--ink-m);line-height:1.6;margin-bottom:10px;">산후 몸 돌봄, 증상 체크, 단계별 회복 가이드</div>
      <button onclick="showPage('birth')" style="background:var(--peach-d);color:white;border:none;border-radius:10px;padding:10px 18px;font-size:13px;font-weight:600;cursor:pointer;">출산 후 회복 가이드 보기 →</button>
    </div>
  `;

  const checkWrap = container.querySelector('#postpartum-check-wrap');
  if (checkWrap && typeof renderCheckTool === 'function') renderCheckTool(checkWrap, d.check);
}

/* ══════════════════════════════════════════════════════
   Part B-7: 갱년기 우울증 가이드
══════════════════════════════════════════════════════ */

const MENOPAUSE_DATA = {
  intro: {
    title: '변하고 있는 건 자연스러운 거예요',
    sub: '몸과 마음이 함께 흔들리는 시기. 혼자 버티지 않아도 돼요.',
    stat: { pct: '46.3%', label: '심각한 스트레스를 경험한 국민 비율 (국립정신건강센터, 2024년 정신건강실태조사)' }
  },
  recognition: {
    title: '이런 변화가 느껴지나요?',
    items: [
      '갑자기 얼굴이 화끈거리고 식은땀이 나요 (열감)',
      '이유 없이 우울하거나, 갑자기 눈물이 나요',
      '집중이 안 되고, 기억력이 떨어진 것 같아요',
      '잠들기 어렵거나, 자주 깨요',
      '짜증이 부쩍 늘고, 사소한 일에 감정이 폭발해요',
      '"나는 이제 필요 없는 사람인 것 같아"라는 생각이 들어요'
    ]
  },
  science: {
    title: '갱년기에 몸과 마음에서 무슨 일이 일어나고 있을까요?',
    text: '폐경 전후 에스트로겐이 급격히 감소해요. 에스트로겐은 세로토닌(기분), 노르에피네프린(에너지), 도파민(동기)의 조절에 깊이 관여하기 때문에, 호르몬 변화만으로도 우울·불안·수면장애·인지기능 저하가 나타날 수 있어요. 여기에 자녀 독립(빈 둥지 증후군), 부모 돌봄 부담, 역할 변화까지 겹치면 마음이 무너질 수 있어요.',
    phases: [
      { name: '갱년기 전기 (40대 중반~)', desc: '생리 불규칙, 열감 시작, 기분 변화가 나타나기 시작해요.', icon: '🌅' },
      { name: '갱년기 (평균 50~51세)', desc: '마지막 생리 후 12개월. 호르몬 변화가 가장 급격한 시기예요.', icon: '🌊' },
      { name: '갱년기 후기', desc: '호르몬이 새로운 균형을 찾아가요. 증상이 점차 완화돼요.', icon: '🌤️' }
    ]
  },
  check: {
    id: 'ct_menopause',
    title: '갱년기 우울 자가 체크',
    sub: '최근 2주를 기준으로 체크해 주세요 (의학적 진단이 아닌 참고용)',
    questions: [
      '이유 없이 우울하거나 공허한 느낌이 든다',
      '열감(홧김)이나 식은땀으로 수면이 방해된다',
      '예전에 즐기던 일에 흥미를 잃었다',
      '집중력이 떨어지고 기억력이 나빠진 것 같다',
      '사소한 일에 짜증이 나거나 감정 조절이 어렵다',
      '"나는 더 이상 매력적이지 않다"는 생각이 든다',
      '삶의 의미를 모르겠거나 극단적인 생각이 든다'
    ],
    emergencyIndex: 6,
    emergencyMsg: '<strong>지금 바로 이야기를 나눌 수 있어요.</strong><br>📞 <a href="tel:109">109</a> (자살예방상담, 무료·24시간)<br>이 생각은 호르몬 변화와 삶의 전환이 만든 것이에요. 당신의 잘못이 아니에요.',
    results: {
      high: { label: '갱년기 우울증 가능성이 높아요', threshold: 4, action: '혼자 감당하지 않아도 돼요. 갱년기 클리닉이나 정신건강의학과 방문을 권해요.' },
      mid:  { label: '주의가 필요한 상태예요', threshold: 2, action: '아래 행동 가이드를 시도해 보세요. 증상이 지속되면 전문가 상담을 고려해 보세요.' },
      low:  { label: '지금은 비교적 안정적이에요', threshold: 0 }
    }
  },
  actions: {
    immediate: [
      { icon: '☀️', text: '아침에 15분 햇빛 산책을 해보세요. 세로토닌 합성과 체내 시계 조절에 가장 효과적이에요.' },
      { icon: '🫁', text: '열감이 올 때 — 4-7-8 호흡법을 시도해 보세요 (4초 들숨, 7초 참기, 8초 날숨). 자율신경계를 빠르게 안정시켜요.' },
      { icon: '📱', text: '"요즘 좀 힘들어"라고 말할 수 있는 사람 1명에게 연락해 보세요. 중년의 고립감은 우울을 악화시켜요.' }
    ],
    week: [
      { icon: '🏃', text: '유산소 운동을 주 3회 시작해 보세요 (걷기, 수영, 자전거). 운동은 에스트로겐 감소로 줄어든 세로토닌을 자연적으로 높여줘요.' },
      { icon: '🥬', text: '콩류(두부, 된장, 두유)를 식단에 추가해 보세요. 식물성 에스트로겐(이소플라본)이 갱년기 증상 완화에 도움이 돼요.' },
      { icon: '🛌', text: '수면 환경을 점검해 보세요 — 실내 온도 18~20°C, 면 소재 잠옷, 취침 1시간 전 스마트폰 내려놓기. 열감으로 인한 수면 방해를 줄여줘요.' }
    ],
    longterm: [
      { icon: '🏥', text: '갱년기 클리닉을 방문해 보세요. 호르몬 검사로 현재 상태를 정확히 파악할 수 있어요. 호르몬 대체요법(HRT)은 의사와 상의하여 결정해요.' },
      { icon: '💊', text: '갱년기 우울증은 호르몬 치료 + 심리 치료 병행 시 80% 이상 개선돼요. 항우울제도 효과적인 선택지예요.' },
      { icon: '🧘', text: '명상이나 요가를 시작해 보세요. 마음챙김(MBSR)은 갱년기 우울·불안 완화에 과학적으로 검증된 방법이에요.' },
      { icon: '🌱', text: '"이제 나를 위한 시간"이라고 재구성해 보세요. 새로운 취미, 배움, 봉사 — 중년 이후의 삶에서 새 의미를 찾는 사람들이 많아요.' }
    ]
  },
  distinction: {
    title: '갱년기 증상 vs 우울증, 어떻게 다른가요?',
    menopause: ['열감·땀·수면장애가 주요 증상', '호르몬 변화와 연동', '신체 증상이 먼저, 기분 변화가 따라옴', '갱년기 치료로 개선 가능'],
    depression: ['삶 전체의 의미 상실', '호르몬과 무관하게 지속', '감정 변화가 먼저, 신체 증상이 따라옴', '항우울제·심리치료 필요'],
    note: '갱년기 증상과 우울증이 겹치는 경우가 많아요. 구분이 어렵다면 갱년기 클리닉에서 호르몬 검사와 정신건강 평가를 함께 받아보세요.'
  },
  emptyNest: {
    title: '빈 둥지 증후군',
    text: '자녀가 독립한 뒤 찾아오는 공허함과 정체성 혼란이에요. 갱년기 호르몬 변화와 맞물리면 우울이 깊어질 수 있어요.',
    tips: [
      '자녀가 떠난 것이 아니라 관계가 변한 거예요 — 새로운 성인 대 성인 관계를 만들어 가보세요.',
      '오랫동안 미뤄왔던 "나만의 것"을 시작해 보세요. 배움, 여행, 봉사, 운동 — 무엇이든 괜찮아요.',
      '배우자와의 관계를 다시 들여다볼 좋은 시기예요. 부부 상담은 위기가 아니라 업그레이드예요.'
    ]
  },
  help: [
    { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 갱년기 우울 포함 정신건강 전반 상담.' },
    { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 극단적 생각이 들 때. 자세한 내용은 전화 시 확인해 주세요.' },
    { number: '129', name: '정부민원안내콜센터', desc: '평일 09~18시. 갱년기 클리닉, 건강검진 등 복지 서비스 안내.' }
  ]
};

function renderMenopausePage(container) {
  if (!container) return;
  const d = MENOPAUSE_DATA;

  const phaseHTML = d.science.phases.map(p =>
    `<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;">
      <span style="font-size:20px;flex-shrink:0;">${p.icon}</span>
      <div>
        <div style="font-size:13px;font-weight:700;color:var(--peach-d);margin-bottom:2px;">${esc(p.name)}</div>
        <p style="font-size:12.5px;color:var(--ink-m);line-height:1.7;word-break:keep-all;">${esc(p.desc)}</p>
      </div>
    </div>`
  ).join('');

  container.innerHTML = `
    <button class="page-back" onclick="goHome()">← 홈으로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,#8B6E4E,#C9A96E)">
      <span class="content-hero-icon">🍂</span>
      <h1>${esc(d.intro.title)}</h1>
      <p>${esc(d.intro.sub)}</p>
    </div>
    <div class="stat-badge"><strong>${d.intro.stat.pct}</strong>&nbsp;${esc(d.intro.stat.label)}</div>

    <div class="step-section">
      <div class="step-label">${esc(d.recognition.title)}</div>
      <div style="background:var(--warm);border-radius:14px;padding:16px 18px;">
        ${d.recognition.items.map(item =>
          `<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;font-size:13px;color:var(--ink-m);line-height:1.7;word-break:keep-all;">
            <span style="color:var(--peach-d);flex-shrink:0;">•</span><span>${esc(item)}</span>
          </div>`
        ).join('')}
        <p style="font-size:12px;color:var(--ink-l);margin-top:8px;line-height:1.6;">이 중 하나라도 공감된다면, 아래 내용을 천천히 살펴보세요.</p>
      </div>
    </div>

    <div class="accordion-group">
      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🧠 ${esc(d.science.title)}</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <p style="font-size:13px;color:var(--ink-m);line-height:1.8;word-break:keep-all;margin-bottom:16px;">${esc(d.science.text)}</p>
          <div style="font-size:13px;font-weight:700;color:var(--ink);margin-bottom:10px;">갱년기의 단계</div>
          ${phaseHTML}
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🔍 상황 판단 — 자가 체크</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div id="menopause-check-wrap"></div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>⏸️ 오늘 당장 할 수 있는 것</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div class="action-checklist">${_actionItems(d.actions.immediate)}</div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>📅 이번 주에 시도해볼 것</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div class="action-checklist">${_actionItems(d.actions.week)}</div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🏥 전문적 도움 받기</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div class="action-checklist">${_actionItems(d.actions.longterm)}</div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>${esc(d.distinction.title)}</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div class="distinction-grid">
            <div class="distinction-col burnout">
              <div class="distinction-col-title">갱년기 증상</div>
              <ul>${d.distinction.menopause.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
            </div>
            <div class="distinction-col depression">
              <div class="distinction-col-title">우울증</div>
              <ul>${d.distinction.depression.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
            </div>
          </div>
          <p class="distinction-note">${esc(d.distinction.note)}</p>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🏠 ${esc(d.emptyNest.title)}</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <p style="font-size:13px;color:var(--ink-m);line-height:1.8;word-break:keep-all;margin-bottom:12px;">${esc(d.emptyNest.text)}</p>
          ${d.emptyNest.tips.map(tip =>
            `<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:8px;font-size:13px;color:var(--ink-m);line-height:1.7;word-break:keep-all;">
              <span style="flex-shrink:0;">💡</span><span>${esc(tip)}</span>
            </div>`
          ).join('')}
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>📞 도움 연결</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
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
        </div></div>
      </div>
    </div>
  `;

  const checkWrap = container.querySelector('#menopause-check-wrap');
  if (checkWrap && typeof renderCheckTool === 'function') renderCheckTool(checkWrap, d.check);
}
