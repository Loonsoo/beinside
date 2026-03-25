/* ═══════════════════════════════════════════════════════════
   BeInside — 수면 가이드 (sleep-page.js)
   잠을 못 자겠어요 — 수면이 무너졌을 때
═══════════════════════════════════════════════════════════ */

const SLEEP_DATA = {
  situations: [
    { id: 'cantfall',  icon: '😶‍🌫️', label: '잠들기가 어려워요',           sub: '누우면 생각이 많아지고 잠이 안 올 때' },
    { id: 'wakeup',    icon: '⏰', label: '자꾸 깨요 / 새벽에 눈이 떠져요', sub: '잠들어도 계속 깨거나 너무 일찍 눈이 떠질 때' },
    { id: 'nightmare', icon: '🌑', label: '악몽을 꿔요',                   sub: '무서운 꿈이 반복되어 잠이 두려울 때' },
    { id: 'toomuch',   icon: '😴', label: '너무 많이 자도 피로해요',        sub: '아무리 자도 개운하지 않고 일어나기 힘들 때' }
  ],

  cantfall: {
    recognition: '누우면 머릿속이 시끄러워지는 거, 정말 힘들죠. 낮에는 괜찮다가도 밤이 되면 모든 걱정이 몰려오는 건 당신만 그런 게 아니에요.',
    psychology: '잠들기 어려운 것은 뇌의 각성 시스템(망상체활성계)이 과활성화된 상태예요. 낮 동안 억눌렸던 생각들이 외부 자극이 사라진 밤에 한꺼번에 떠오르는 거예요. 코르티솔(스트레스 호르몬)이 저녁에도 높게 유지되면 멜라토닌(수면 호르몬) 분비가 억제돼요.',
    techniques: [
      { name: '자극 통제 요법(Stimulus Control)', desc: '침대에서 잠 외의 활동(핸드폰, TV, 걱정)을 하지 마세요. 뇌가 "침대 = 잠"으로 인식하도록 조건을 만드는 거예요. 20분 이상 잠이 안 오면 일어나서 다른 곳에서 조용한 활동을 하다가 졸릴 때 다시 누워보세요.' },
      { name: '인지 셔플 기법(Cognitive Shuffle)', desc: '랜덤한 단어를 떠올리고, 각 단어의 이미지를 상상해 보세요. 예: "사과 → 바다 → 고양이 → 구름". 뇌가 논리적 사고를 멈추고 수면 모드로 전환돼요. 캐나다 사이먼프레이저대학 럭 뵐만 교수가 개발한 방법이에요.' },
      { name: '4-7-8 호흡법', desc: '4초 들이쉬기 → 7초 멈추기 → 8초 내쉬기. 부교감신경을 활성화해 심박수를 낮추고, 몸에 "지금 안전해"라는 신호를 보내요. 3~4회 반복하면 뇌의 각성 수준이 떨어져요.' }
    ],
    check: {
      id: 'ct_sleep_cantfall', title: '지금 내 수면 상태는?',
      questions: [
        '잠들기까지 30분 이상 걸리는 날이 주 3회 이상이다',
        '이런 상태가 1개월 이상 지속됐다',
        '낮에 피로·집중력 저하로 일상이 어렵다',
        '수면제 없이는 잠들 수 없다'
      ],
      results: {
        high: { label: '만성 불면증일 수 있어요', threshold: 3, action: '오늘 하나만: 아래 수면 위생 체크리스트를 하나 시도해 보세요. 지속되면 수면 전문 클리닉 상담도 도움이 돼요.' },
        mid:  { label: '수면 습관 개선이 필요한 시점이에요', threshold: 1 },
        low:  { label: '일시적일 수 있어요. 아래 방법을 시도해 보세요', threshold: 0 }
      }
    },
    actions: [
      { icon: '📵', text: '잠자리 1시간 전 스마트폰 내려놓기. 블루라이트가 멜라토닌 분비를 최대 50% 억제해요.' },
      { icon: '🛏️', text: '침대에서 잠 외의 활동 금지. 뇌가 "침대 = 각성"으로 학습하면 누울수록 잠이 안 와요.' },
      { icon: '🌡️', text: '침실 온도를 18~20°C로 맞춰보세요. 체온이 내려가야 멜라토닌 분비가 촉진돼요.' },
      { icon: '✍️', text: '잠자리에 들기 전 걱정을 종이에 적어두세요. 작업 기억(Working Memory)에서 내려놓는 효과가 있어서 뇌가 "이건 내일 처리해도 돼"라고 인식해요.' }
    ],
    help: [
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 불면이 심해 극심한 고통을 겪고 있다면.' },
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },

  wakeup: {
    recognition: '겨우 잠들었는데 새벽 3~4시에 눈이 떠지면 정말 지치죠. "왜 나만 이러지"라는 생각이 들 수 있는데, 이건 매우 흔한 증상이에요.',
    psychology: '새벽 각성은 코르티솔의 이른 분비(Cortisol Awakening Response)와 관련이 있어요. 스트레스가 높으면 코르티솔이 정상보다 일찍 올라가면서 잠을 깨워요. 또한 우울증에서는 수면 구조 자체가 변해서 REM 수면이 일찍 나타나고 깊은 수면(서파수면)이 줄어들어요.',
    techniques: [
      { name: '수면 제한 요법(Sleep Restriction)', desc: '역설적이지만, 침대에 있는 시간을 줄이면 수면의 질이 올라가요. 예: 실제 잠자는 시간이 5시간이면 침대에 5.5시간만 있기. 수면 효율이 85% 이상이 되면 30분씩 늘려가세요.' },
      { name: '각성 시 대처법', desc: '깨면 시계를 보지 마세요. "3시 30분이네, 4시간밖에 못 잤어"라는 계산이 불안을 키워요. 20분 이상 잠이 안 오면 조용한 곳에서 지루한 책을 읽다가 졸릴 때 다시 누워보세요.' },
      { name: '점진적 근이완법(PMR)', desc: '발끝부터 머리까지 근육을 5초간 긴장시켰다가 풀기를 반복해요. 신체 긴장이 풀리면 뇌도 "안전하다"는 신호를 받아 다시 잠들기 쉬워져요.' }
    ],
    check: {
      id: 'ct_sleep_wakeup', title: '지금 내 수면 상태는?',
      questions: [
        '주 3회 이상 새벽에 깬다',
        '깨면 다시 잠들기 어렵다',
        '1개월 이상 지속됐다',
        '우울하거나 의욕이 없는 상태가 동반된다'
      ],
      results: {
        high: { label: '우울증이 동반된 수면 장애일 수 있어요', threshold: 3, action: '오늘 하나만: 깨더라도 시계를 보지 말고 눈을 감고 호흡에 집중해 보세요. 지속되면 정신건강의학과 상담을 권해요.' },
        mid:  { label: '수면 패턴 조정이 필요해요', threshold: 1 },
        low:  { label: '일시적일 수 있어요', threshold: 0 }
      }
    },
    actions: [
      { icon: '⏰', text: '매일 같은 시간에 일어나세요 (주말 포함). 생체 시계(일주기 리듬)가 안정되면 수면 구조가 정상화돼요.' },
      { icon: '☕', text: '오후 2시 이후 카페인 금지. 카페인의 반감기는 5~6시간이라 저녁까지 체내에 남아있어요.' },
      { icon: '🌅', text: '아침에 일어나자마자 햇빛을 10분 쬐세요. 멜라토닌 분비 타이밍을 리셋하는 가장 강력한 방법이에요.' },
      { icon: '🫗', text: '자기 전 3시간 이내 음주를 피해보세요. 술은 잠들게는 하지만 REM 수면을 방해해서 새벽 각성을 유발해요.' }
    ],
    help: [
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' },
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },

  nightmare: {
    recognition: '악몽이 반복되면 잠드는 것 자체가 두려워져요. "또 그 꿈을 꾸면 어쩌지"라는 불안이 불면으로 이어지기도 해요. 이건 당신의 뇌가 처리하지 못한 감정을 꿈을 통해 표현하고 있는 거예요.',
    psychology: '반복되는 악몽은 뇌의 감정 처리 시스템(특히 편도체)이 과활성화된 상태를 반영해요. REM 수면 중에 뇌는 낮의 감정을 정리하는데, 트라우마나 만성 스트레스가 있으면 이 과정이 "공포 리허설"이 되어버려요. PTSD 환자의 약 70%가 반복 악몽을 경험해요.',
    techniques: [
      { name: '이미지 리허설 치료(IRT)', desc: '깨어 있을 때 악몽의 내용을 떠올리고, 결말을 안전하게 바꿔서 상상해 보세요. 예: 쫓기는 꿈 → 멈춰서 돌아보면 아무도 없는 걸로 바꾸기. 하루 10~20분, 2주만 해도 악몽 빈도가 줄어드는 것이 임상적으로 입증됐어요.' },
      { name: '수면 전 안전 의식', desc: '잠들기 전 "오늘 밤은 안전해"라고 스스로에게 말해 보세요. 방 안이 안전한 공간임을 확인하는 루틴(문 잠금 확인, 조명 조절)을 만들면 뇌의 경계 수준이 낮아져요.' },
      { name: '감각 앵커링', desc: '자기 전에 좋아하는 향(라벤더, 캐모마일)을 맡거나 부드러운 천을 만져보세요. 감각 자극이 뇌의 안전 신호로 작용해 공포 반응을 억제해요.' }
    ],
    check: {
      id: 'ct_sleep_nightmare', title: '지금 내 상태는?',
      questions: [
        '같은 악몽이 주 2회 이상 반복된다',
        '악몽 때문에 잠드는 것이 두렵다',
        '과거 트라우마와 관련된 꿈이다',
        '낮에도 악몽의 이미지가 떠오른다'
      ],
      results: {
        high: { label: 'PTSD나 불안장애가 동반되었을 수 있어요', threshold: 3, action: '오늘 하나만: 악몽의 결말을 안전하게 바꿔서 상상해 보세요 (이미지 리허설). 트라우마 전문 상담도 큰 도움이 돼요.' },
        mid:  { label: '스트레스가 꿈에 영향을 주고 있어요', threshold: 1 },
        low:  { label: '일시적일 수 있어요', threshold: 0 }
      }
    },
    actions: [
      { icon: '📝', text: '깨자마자 악몽을 적어보세요. 꿈을 글로 꺼내면 뇌가 "처리 완료" 신호를 받아 반복 빈도가 줄어들어요.' },
      { icon: '🔄', text: '적은 악몽의 결말을 안전하게 바꿔서 3번 읽어보세요. 이미지 리허설 치료(IRT)의 핵심이에요. 뇌가 새 시나리오를 학습해요.' },
      { icon: '🕯️', text: '잠자리에 좋아하는 향을 두세요. 후각은 편도체와 직접 연결되어 있어서, 안전한 향이 공포 반응을 억제해요.' },
      { icon: '💡', text: '은은한 간접 조명을 켜두세요. 완전한 어둠이 두렵다면 조명을 조금 남겨두는 것도 괜찮아요. 안전감이 수면의 기반이에요.' }
    ],
    help: [
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 악몽으로 극심한 고통이 있다면.' },
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },

  toomuch: {
    recognition: '10시간을 자도 피로한 건 정말 당황스럽죠. "게으른 건가"라는 자책이 들 수도 있어요. 하지만 과수면은 게으름이 아니라, 몸과 뇌가 보내는 중요한 신호예요.',
    psychology: '과수면(Hypersomnia)은 우울증의 대표적 증상 중 하나예요. 우울증에서는 뇌의 각성 시스템이 저하되고, 세로토닌·노르에피네프린 같은 신경전달물질이 부족해져요. 또한 수면의 질이 나빠서 깊은 수면(서파수면)에 충분히 도달하지 못하면 아무리 오래 자도 회복이 안 돼요.',
    techniques: [
      { name: '수면 일기 작성', desc: '매일 잠든 시간, 일어난 시간, 낮잠 여부, 기분을 기록해 보세요. 1~2주 기록하면 패턴이 보여요. "많이 자는 날 = 특히 힘든 날"의 상관관계를 발견할 수 있어요.' },
      { name: '행동 활성화(Behavioral Activation)', desc: '우울할 때 뇌는 "아무것도 하고 싶지 않다"는 신호를 보내요. 하지만 아주 작은 행동(이불 개기, 창문 열기)이 뇌의 보상 회로를 깨워요. 침대에서 나오는 것 자체가 첫 번째 치료예요.' },
      { name: '광선 요법(Light Therapy)', desc: '아침에 일어나자마자 밝은 빛(자연광 또는 10,000룩스 조명)을 30분간 쬐면 세로토닌 분비가 촉진되고 생체 시계가 리셋돼요. 특히 겨울철 과수면에 효과적이에요.' }
    ],
    check: {
      id: 'ct_sleep_toomuch', title: '지금 내 상태는?',
      questions: [
        '하루 10시간 이상 자는 날이 주 3회 이상이다',
        '충분히 자도 낮에 극심한 졸음이 있다',
        '의욕 저하·슬픔·무기력감이 동반된다',
        '일상생활(출근, 식사, 씻기)이 어렵다'
      ],
      results: {
        high: { label: '우울증이 동반된 과수면일 수 있어요', threshold: 3, action: '오늘 하나만: 내일 아침 알람을 설정하고, 울려도 5분만 버텨서 일어나 창문을 열어보세요. 지속되면 정신건강의학과 상담이 도움이 돼요.' },
        mid:  { label: '수면 패턴과 기분의 연결을 살펴볼 때예요', threshold: 1 },
        low:  { label: '피로가 쌓인 상태일 수 있어요', threshold: 0 }
      }
    },
    actions: [
      { icon: '⏰', text: '매일 같은 시간에 알람을 설정하세요 (주말 포함). 생체 시계가 안정되면 수면의 질이 올라가 덜 피로해져요.' },
      { icon: '🌅', text: '일어나면 바로 커튼을 열어 햇빛을 쬐세요. 빛이 세로토닌 분비를 촉진해 각성 수준을 올리고 기분도 개선해요.' },
      { icon: '🚶', text: '오전 중에 5분만 바깥을 걸어보세요. 가벼운 운동이 뇌의 각성 시스템을 활성화하고 엔돌핀을 분비시켜요.' },
      { icon: '📓', text: '일주일간 수면 시간과 기분을 기록해 보세요. 패턴을 발견하면 "왜 이러지?"라는 불안이 "이래서 그랬구나"로 바뀌어요.' }
    ],
    help: [
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 과수면과 우울감이 함께 있다면.' },
      { number: '109', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  }
};

/* ── 수면 상세 페이지 (아코디언 구조) ── */
function buildSleepDetail(container, id) {
  const d = SLEEP_DATA[id];
  const meta = SLEEP_DATA.situations.find(s => s.id === id);
  if (!d || !meta) return;

  const techHTML = d.techniques ? d.techniques.map(t =>
    `<div style="margin-bottom:12px;">
      <div style="font-size:13px;font-weight:700;color:var(--peach-d);margin-bottom:4px;">${esc(t.name)}</div>
      <p style="font-size:12.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;">${esc(t.desc)}</p>
    </div>`
  ).join('') : '';

  container.innerHTML = `
    <button class="page-back" onclick="renderSleepPage(document.getElementById('sleep-content'))">← 수면 가이드로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,#2A3545,#4A5565)">
      <span class="content-hero-icon">${meta.icon}</span>
      <h1>${esc(meta.label)}</h1>
      <p>${esc(meta.sub)}</p>
    </div>

    <div class="step-section">
      <div class="step-label">지금 이런 상태시죠</div>
      <p style="font-size:13.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;">${esc(d.recognition)}</p>
    </div>

    <div class="accordion-group">
      ${d.psychology ? `
      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🧠 왜 잠이 안 오는 걸까?</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <p style="font-size:13px;color:var(--ink-m);line-height:1.8;word-break:keep-all;">${esc(d.psychology)}</p>
        </div></div>
      </div>` : ''}

      ${techHTML ? `
      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>💡 수면 전문 자기 돌봄법</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          ${techHTML}
        </div></div>
      </div>` : ''}

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>🔍 지금 내 수면 상태 확인</span><span class="accordion-arrow">▼</span>
        </div>
        <div class="accordion-body"><div class="accordion-body-inner">
          <div id="sleep-check-${id}"></div>
        </div></div>
      </div>

      <div class="accordion-item">
        <div class="accordion-header" onclick="toggleAccordion(this)" tabindex="0" aria-expanded="false">
          <span>✅ 오늘 밤부터 할 수 있는 것</span><span class="accordion-arrow">▼</span>
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
              <a href="tel:${h.number.replace(/-/g,'')}" class="help-card" aria-label="${h.name} ${h.number}">
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

  const checkWrap = container.querySelector(`#sleep-check-${id}`);
  if (checkWrap && typeof renderCheckTool === 'function') renderCheckTool(checkWrap, d.check);
}

/* ── 수면 메인 목록 화면 ── */
function renderSleepPage(container) {
  if (!container) return;
  container.innerHTML = `
    <button class="page-back" onclick="goHome()">← 홈으로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,#2A3545,#4A5565)">
      <span class="content-hero-icon">🛏️</span>
      <h1>잠을 못 자겠어요</h1>
      <p>밤이 두렵고, 아침이 무겁고, 낮이 흐릿할 때.<br>수면은 회복할 수 있어요.</p>
    </div>
    <div class="step-section">
      <div class="step-label">어떤 상황이에요?</div>
      <div class="emotion-grid">
        ${SLEEP_DATA.situations.map(s => `
          <button class="emotion-btn" onclick="buildSleepDetail(document.getElementById('sleep-content'),'${s.id}')" aria-label="${s.label}">
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

/* ── 초기화 ── */
function initSleepPage() {
  const el = document.getElementById('sleep-content');
  if (el && typeof renderSleepPage === 'function') renderSleepPage(el);
}
