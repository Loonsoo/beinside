/* ═══════════════════════════════════════════════════════════
   BeInside — 노인 돌봄 가이드 (elder-care.js)
   부모님·어르신 간병, 치매 돌봄, 간병 번아웃, 복지 연결
═══════════════════════════════════════════════════════════ */

const ELDER_CARE_DATA = {
  intro: {
    title: '돌보는 당신도 돌봄이 필요해요',
    sub: '부모님을 돌보는 건 사랑이지만, 혼자 감당하면 무너질 수 있어요.',
    stat: {
      pct: '11.3%',
      label: '65세 이상 노인 우울증상 유병률. 독거노인은 16.1%까지 올라가요. (보건복지부 2023 노인실태조사)'
    }
  },

  /* ── 상황 분류 ── */
  situations: [
    { id: 'dementia',  icon: '🧠', label: '치매 부모님 돌봄',       sub: '기억이 사라져가는 부모님 곁을 지키고 있다면' },
    { id: 'chronic',   icon: '🏥', label: '만성질환·와병 간병',     sub: '오랜 투병 생활을 함께하고 있다면' },
    { id: 'caregiver', icon: '🫠', label: '간병 번아웃',            sub: '돌보는 내가 먼저 무너질 것 같다면' },
    { id: 'abuse',     icon: '🛡️', label: '노인 학대 예방·대응',    sub: '학대가 의심되거나, 내가 화를 참기 어렵다면' }
  ],

  /* ── 치매 돌봄 ── */
  dementia: {
    recognition: '치매는 본인도, 가족도 서서히 무너지는 병이에요. 같은 말을 반복하는 부모님에게 짜증이 나는 건 나쁜 자식이어서가 아니에요. 지친 거예요.',
    check: {
      id: 'ct_dementia', title: '지금 내 상태는?',
      questions: [
        '부모님의 반복 행동에 화가 통제되지 않는다',
        '간병 때문에 직장·가정·건강 중 하나 이상이 무너졌다',
        '부모님이 돌아가시면 편할 것 같다는 생각이 든 적 있다',
        '나 자신을 해치고 싶다는 생각이 든다'
      ],
      emergencyIndex: 3,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:1393" style="color:inherit;font-weight:700">📞 1393</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '돌보는 사람을 위한 전문 지원이 필요해요', threshold: 2, action: '치매안심센터(1899-9988, 무료) 또는 정신건강복지센터에 연락해 보세요. 당신을 위한 상담이에요.' },
        mid:  { label: '간병 부담이 높은 상태예요. 쉬어야 해요.', threshold: 1 },
        low:  { label: '아래 가이드가 도움이 될 수 있어요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '📋', text: '치매안심센터(1899-9988)에 등록하세요. 무료 검진·상담·돌봄 서비스를 연결받을 수 있어요.' },
      { icon: '🔁', text: '같은 말 반복할 때: 교정하지 마세요. "그랬구나"로 받아주는 게 서로에게 편해요.' },
      { icon: '🏷️', text: '배회 대비: 옷에 이름·연락처 라벨을 붙여두세요. 치매안심센터에서 배회감지기를 무료로 제공해요.' },
      { icon: '🤝', text: '주간보호센터를 활용하세요. 주 5일까지 이용 가능하고, 장기요양등급이 있으면 본인부담 15%예요.' },
      { icon: '📖', text: '일주일에 한 번, 과거 사진을 함께 보세요. 장기기억은 오래 남아요. 추억 이야기가 부모님에게 안정감을 줘요.' }
    ],
    help: [
      { number: '1899-9988', name: '중앙치매센터', desc: '치매 관련 모든 상담. 무료, 365일 운영. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-1000', name: '국민건강보험공단', desc: '장기요양등급 신청 및 안내.' },
      { number: '1393', name: '자살예방상담전화', desc: '무료, 24시간. 간병이 너무 힘들 때도 전화해도 돼요. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },

  /* ── 만성질환·와병 간병 ── */
  chronic: {
    recognition: '끝이 보이지 않는 간병은 마라톤보다 힘들어요. "언제까지 이렇게 해야 하지?"라는 생각은 정상이에요. 지치는 건 당연해요.',
    check: {
      id: 'ct_chronic', title: '지금 내 상태는?',
      questions: [
        '간병으로 잠을 충분히 자지 못한다 (하루 5시간 미만)',
        '내 건강을 돌볼 시간이 전혀 없다',
        '가족 중 나만 간병하고 있다는 느낌이 든다',
        '일상에서 기쁨이나 즐거움을 느끼지 못한다'
      ],
      results: {
        high: { label: '간병 우울로 발전할 수 있어요. 도움을 받아야 해요.', threshold: 3, action: '정신건강복지센터(1577-0199, 무료)에서 간병자 전용 상담을 받을 수 있어요.' },
        mid:  { label: '간병 부담이 높아요. 쉼의 시간이 필요해요.', threshold: 2 },
        low:  { label: '지금 상태를 유지하면서 아래 가이드를 참고해 보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '🏠', text: '장기요양보험에 등급 신청하세요 (1577-1000). 방문요양, 방문간호, 주간보호 등을 저렴하게 이용할 수 있어요.' },
      { icon: '🔄', text: '가족 간병 분담 회의를 열어보세요. 직접 돌봄이 어려운 가족은 경제적 분담이라도 할 수 있어요.' },
      { icon: '⏰', text: '하루 중 30분은 반드시 "나만의 시간"을 확보하세요. 간병인도 쉬어야 간병할 수 있어요.' },
      { icon: '📱', text: '간병인 커뮤니티에 참여해 보세요. 같은 상황의 사람과 이야기하면 고립감이 줄어요.' },
      { icon: '💊', text: '부모님 약 관리가 어렵다면 병원에 "복약 상담"을 요청하세요. 약사가 정리해 줘요.' }
    ],
    help: [
      { number: '1577-1000', name: '국민건강보험공단', desc: '장기요양등급 신청·재가급여(방문요양 등) 안내.' },
      { number: '129', name: '정부 복지상담센터', desc: '간병 관련 복지 혜택 통합 안내. 무료.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 간병 우울·소진 시. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },

  /* ── 간병 번아웃 ── */
  caregiver: {
    recognition: '간병 번아웃은 "나쁜 자식"의 증거가 아니에요. 사랑하기 때문에 이렇게까지 왔고, 그래서 지금 바닥에 닿은 거예요.',
    check: {
      id: 'ct_caregiver', title: '지금 내 상태는?',
      questions: [
        '환자를 보면 짜증이나 분노가 먼저 올라온다',
        '내 삶이 완전히 사라진 것 같다',
        '몸이 자주 아프다 (두통, 소화불량, 근육통, 면역력 저하)',
        '"이렇게 사느니 차라리..."라는 생각이 든다',
        '감정이 무뎌져서 슬프지도 화나지도 않다'
      ],
      emergencyIndex: 3,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:1393" style="color:inherit;font-weight:700">📞 1393</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '지금 당장 쉬어야 해요. 간병을 멈추는 것이 아니라 나를 살리는 거예요.', threshold: 3, action: '긴급돌봄(1577-1000)을 신청하거나 1393에 전화해 보세요.' },
        mid:  { label: '간병 번아웃이 시작됐어요. 분담과 휴식이 필요해요.', threshold: 2 },
        low:  { label: '지금 상태를 유지하면서 예방이 중요해요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '🆘', text: '긴급돌봄 서비스를 신청하세요. 간병인이 쓰러지면 환자도 위험해요. 잠시 맡기는 건 포기가 아니에요.' },
      { icon: '🛌', text: '수면을 최우선으로 확보하세요. 하루 5시간 미만 수면이 2주 이상이면 몸이 먼저 무너져요.' },
      { icon: '🗣️', text: '"나 지금 너무 힘들어"라고 말할 수 있는 사람 한 명을 찾으세요. 말하는 것 자체가 치유예요.' },
      { icon: '📅', text: '주 1회 "간병 없는 날"을 만들어 보세요. 단기 돌봄 서비스나 가족 교대를 활용하세요.' },
      { icon: '💆', text: '내가 쓰러지면 모두가 무너져요. 간병인의 건강은 환자의 건강이에요.' }
    ],
    help: [
      { number: '1577-1000', name: '국민건강보험공단', desc: '긴급돌봄·단기 보호 서비스 신청.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 간병 번아웃 전용 상담도 가능해요. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1393', name: '자살예방상담전화', desc: '무료, 24시간. 극단적 생각이 들 때. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },

  /* ── 노인 학대 예방·대응 ── */
  abuse: {
    recognition: '노인 학대의 90% 이상은 가족에 의해 발생해요. 간병 스트레스가 극에 달하면 누구에게나 일어날 수 있어요. "내가 혹시 학대하고 있는 건 아닌가?"라는 질문 자체가 이미 자각의 시작이에요.',
    check: {
      id: 'ct_abuse', title: '지금 상황을 확인해 볼게요',
      questions: [
        '부모님에게 소리를 자주 지르거나 모욕적인 말을 한다',
        '돌봄을 의도적으로 거부하거나 방치한 적이 있다',
        '부모님의 재산이나 금전을 동의 없이 사용한 적이 있다',
        '주변 노인이 멍이나 상처가 자주 보이고 원인이 불명확하다'
      ],
      results: {
        high: { label: '지금 도움을 받아야 해요. 자각했다는 것은 변할 수 있다는 뜻이에요.', threshold: 2, action: '노인보호전문기관(1577-1389)에 상담 전화해 보세요. 처벌이 아니라 도움을 위한 곳이에요.' },
        mid:  { label: '간병 스트레스가 위험 수준이에요. 분담과 상담이 필요해요.', threshold: 1 },
        low:  { label: '예방 가이드를 확인해 보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '📞', text: '노인보호전문기관(1577-1389)은 처벌 기관이 아니에요. 가해자·피해자 모두를 위한 상담과 지원을 해요.' },
      { icon: '✋', text: '화가 폭발할 것 같을 때: 방에서 나와 10초 숨 쉬기. 물리적 거리가 폭력을 막아요.' },
      { icon: '🔄', text: '간병을 혼자 하고 있다면 그것 자체가 위험 요인이에요. 분담 방법을 반드시 찾으세요.' },
      { icon: '🛡️', text: '주변에서 노인 학대가 의심되면 112나 1577-1389에 신고해 주세요. 익명 신고도 가능해요.' },
      { icon: '💜', text: '"내가 학대하고 있는 건 아닌가?"를 물어본 당신은 이미 변화의 시작이에요.' }
    ],
    help: [
      { number: '1577-1389', name: '노인보호전문기관', desc: '노인 학대 상담·신고·가해자 상담 모두 가능. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '112', name: '경찰 신고', desc: '긴급한 학대·폭력 상황 시 즉시 신고.' },
      { number: '129', name: '정부 복지상담센터', desc: '노인 복지·보호 관련 종합 안내. 무료.' }
    ]
  },

  /* ── 복지 혜택 안내 ── */
  welfare: {
    title: '활용할 수 있는 복지 제도',
    items: [
      { icon: '🏠', name: '장기요양보험', desc: '65세 이상 또는 노인성 질환자 대상. 등급 판정 후 방문요양·주간보호·시설입소 등 이용 가능. 본인부담 15%.', contact: '1577-1000' },
      { icon: '🧠', name: '치매안심센터', desc: '전국 256개소. 치매 검진(무료)·등록·가족 상담·배회감지기 무료 제공·치매 카페.', contact: '1899-9988' },
      { icon: '💰', name: '노인돌봄종합서비스', desc: '등급 외 노인(등급 미인정자)도 이용 가능. 식사·외출 동행·말벗·건강 관리.', contact: '129' },
      { icon: '🏥', name: '긴급돌봄 서비스', desc: '간병인 질환·사고 시 긴급 대체 돌봄. 장기요양등급자 대상.', contact: '1577-1000' },
      { icon: '🚗', name: '노인 교통비·난방비 지원', desc: '기초연금 수급자 대상 각종 생활 지원. 지자체별로 다름.', contact: '129' },
      { icon: '⚖️', name: '성년후견제도', desc: '치매 등으로 의사결정이 어려운 분의 법적 보호. 법원 신청 또는 공공후견 지원.', contact: '132' }
    ]
  }
};

/* ── 렌더 함수 (관계·전환기 패턴 동일) ── */
function buildElderDetail(container, id) {
  const d = ELDER_CARE_DATA[id];
  const meta = ELDER_CARE_DATA.situations.find(s => s.id === id);
  if (!d || !meta) return;

  container.innerHTML = `
    <button class="page-back" onclick="renderElderPage(document.getElementById('elder-content'))">← 노인 돌봄 가이드로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,#5A6A5A,#7A8A6A)">
      <span class="content-hero-icon">${meta.icon}</span>
      <h1>${esc(meta.label)}</h1>
      <p>${esc(meta.sub)}</p>
    </div>

    <div class="step-section">
      <div class="step-label">① 상황 인식</div>
      <p style="font-size:13.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;">${esc(d.recognition)}</p>
    </div>

    <div class="step-section" id="elder-check-${id}">
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
          <a href="tel:${h.number.replace(/-/g,'')}" class="help-card" aria-label="${h.name} ${h.number}">
            <div class="help-card-num">📞 ${h.number}</div>
            <div class="help-card-info">
              <div class="help-card-name">${esc(h.name)}</div>
              <div class="help-card-desc">${esc(h.desc)}</div>
            </div>
          </a>`).join('')}
      </div>
    </div>
  `;

  const checkWrap = container.querySelector(`#elder-check-${id}`);
  if (checkWrap && typeof renderCheckTool === 'function') renderCheckTool(checkWrap, d.check);
}

function renderElderPage(container) {
  if (!container) return;
  const d = ELDER_CARE_DATA;

  const welfareHTML = d.welfare.items.map(w => `
    <div class="accordion-item">
      <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0">
        <span>${w.icon} ${esc(w.name)}</span><span class="accordion-arrow">▼</span>
      </div>
      <div class="accordion-body"><div class="accordion-body-inner">
        <p style="font-size:13px;color:var(--ink-m);line-height:1.75;margin-bottom:10px;">${esc(w.desc)}</p>
        <a href="tel:${w.contact.replace(/-/g,'')}" style="display:inline-block;padding:8px 16px;background:var(--peach-p);color:var(--peach-d);border-radius:10px;font-size:12.5px;font-weight:600;text-decoration:none;">📞 ${w.contact} 전화하기</a>
      </div></div>
    </div>`).join('');

  container.innerHTML = `
    <button class="page-back" onclick="goHome()">← 홈으로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,#5A6A5A,#7A8A6A)">
      <span class="content-hero-icon">🧓</span>
      <h1>${esc(d.intro.title)}</h1>
      <p>${esc(d.intro.sub)}</p>
    </div>

    <div class="stat-badge"><strong>${d.intro.stat.pct}</strong>&nbsp;${esc(d.intro.stat.label)}</div>

    <div class="step-section">
      <div class="step-label">어떤 상황이에요?</div>
      <div class="emotion-grid">
        ${d.situations.map(s => `
          <button class="emotion-btn" onclick="buildElderDetail(document.getElementById('elder-content'),'${s.id}')" aria-label="${s.label}">
            <span class="emotion-btn-icon">${s.icon}</span>
            <div>
              <div style="font-size:13.5px;font-weight:600;">${esc(s.label)}</div>
              <div style="font-size:11.5px;color:var(--ink-l);">${esc(s.sub)}</div>
            </div>
          </button>`).join('')}
      </div>
    </div>

    <div class="step-section">
      <div class="step-label">📋 복지 제도 한눈에</div>
      <p style="font-size:12.5px;color:var(--ink-l);margin-bottom:14px;">활용할 수 있는 지원이 생각보다 많아요. 눌러서 확인해 보세요.</p>
      <div class="accordion-group">${welfareHTML}</div>
    </div>

    <div class="step-section">
      <div class="step-label">📞 주요 연락처</div>
      <div class="help-cards">
        <a href="tel:18999988" class="help-card"><div class="help-card-num">📞 1899-9988</div><div class="help-card-info"><div class="help-card-name">중앙치매센터</div><div class="help-card-desc">치매 상담·검진·돌봄 서비스 연결. 365일 무료.</div></div></a>
        <a href="tel:15771000" class="help-card"><div class="help-card-num">📞 1577-1000</div><div class="help-card-info"><div class="help-card-name">국민건강보험공단</div><div class="help-card-desc">장기요양등급 신청·재가급여·긴급돌봄 안내.</div></div></a>
        <a href="tel:15771389" class="help-card"><div class="help-card-num">📞 1577-1389</div><div class="help-card-info"><div class="help-card-name">노인보호전문기관</div><div class="help-card-desc">노인 학대 상담·신고. 가해자 상담도 가능.</div></div></a>
        <a href="tel:129" class="help-card"><div class="help-card-num">📞 129</div><div class="help-card-info"><div class="help-card-name">정부 복지상담센터</div><div class="help-card-desc">노인 복지 혜택 통합 안내. 무료.</div></div></a>
        <a href="tel:1393" class="help-card"><div class="help-card-num">📞 1393</div><div class="help-card-info"><div class="help-card-name">자살예방상담전화</div><div class="help-card-desc">무료, 24시간. 간병이 너무 힘들 때도 전화해도 돼요.</div></div></a>
      </div>
    </div>
  `;
}
