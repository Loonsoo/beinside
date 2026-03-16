/* ═══════════════════════════════════════════════════════════
   BeInside — 감정 가이드 페이지 (Part B-1)
═══════════════════════════════════════════════════════════ */

const EMOTION_GUIDE_DATA = {
  sad: {
    icon: '😢', label: '계속 슬퍼요',
    recognition: '계속 슬픈 건, 뭔가 중요한 걸 잃었거나 지쳐 있다는 신호예요. 이 감정을 느끼는 건 나약한 게 아니에요.',
    check: {
      id: 'ct_sad',
      title: '아래 중 해당되는 게 있나요?',
      questions: [
        '2주 이상 거의 매일 이런 기분이다',
        '일상생활(출근, 식사, 씻기)이 어렵다',
        '나를 해치고 싶다는 생각이 든다'
      ],
      emergencyIndex: 2,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <br><a href="tel:1393" style="color:inherit;font-weight:700;text-decoration:underline;">📞 1393 자살예방상담전화</a> — 무료, 24시간. 자세한 내용(비밀보장 등)은 전화 시 확인해 주세요.',
      results: {
        high: { label: '전문 상담을 받아보는 것을 권해요', threshold: 2, action: '가까운 정신건강복지센터나 <a href="tel:1393">1393</a>(무료·24시간)에 연락해 보세요.' },
        mid:  { label: '일시적일 수 있지만, 전문가 상담도 고려해 보세요', threshold: 1, action: '증상이 지속되면 보건소 정신건강 서비스(무료)를 이용해 보세요.' },
        low:  { label: '일시적인 감정일 수 있어요. 아래 방법을 시도해 보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '🌬️', text: '지금 있는 자리에서 깊게 숨 3번 쉬기 (5초 흡입 — 5초 내쉬기)' },
      { icon: '🚪', text: '창문 열거나 밖에 10분 나가기' },
      { icon: '💬', text: '신뢰하는 사람 1명에게 "나 좀 힘들어"라고 문자 보내기' }
    ],
    help: [
      { number: '1393', name: '자살예방상담전화', desc: '무료, 24시간. 상담사가 이야기를 들어줘요. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간. 정신건강 어려움 전반.' }
    ]
  },
  anxious: {
    icon: '😰', label: '불안해서 잠이 안 와요',
    recognition: '불안은 위험을 감지하는 정상적인 신호예요. 하지만 잠을 방해할 정도라면, 몸이 과부하 상태라는 뜻이에요.',
    check: {
      id: 'ct_anxious',
      title: '아래 중 해당되는 게 있나요?',
      questions: [
        '2주 이상 매일 잠들기 어렵다',
        '심장이 두근거리거나 숨이 막히는 느낌이 자주 든다',
        '걱정이 멈추지 않아서 일상이 어렵다',
        '나를 해치고 싶다는 생각이 든다'
      ],
      emergencyIndex: 3,
      emergencyMsg: '지금 당장 이야기를 들어줄 사람이 있어요. <a href="tel:1393" style="color:inherit;font-weight:700">📞 1393</a>(자살예방상담, 무료·24시간). 자세한 내용은 전화 시 확인해 주세요.',
      results: {
        high: { label: '전문가 상담이 필요한 수준이에요', threshold: 3, action: '<a href="tel:1577-0199">1577-0199</a>(정신건강위기상담, 무료·24시간) 또는 정신건강복지센터에 연락해 보세요.' },
        mid:  { label: '주의가 필요해요', threshold: 1, action: '증상이 지속되면 보건소 정신건강 서비스를 이용해 보세요.' },
        low:  { label: '지금은 괜찮아요. 아래 방법으로 불안을 낮춰보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '⏱️', text: '4초 들이쉬고 — 4초 멈추고 — 4초 내쉬기 (박스 호흡법). 3~5회 반복하면 효과가 있어요.' },
      { icon: '🤲', text: '손바닥을 꽉 쥐었다가 천천히 펴기. 신체 감각에 집중하면 생각이 잠깐 멈춰요.' },
      { icon: '📵', text: '잠자리에 들기 1시간 전에는 스마트폰을 내려두세요. 블루라이트가 수면 신호를 방해해요.' }
    ],
    help: [
      { number: '1393', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' }
    ]
  },
  numb: {
    icon: '😶', label: '아무 감정도 안 느껴져요',
    recognition: '감정이 없는 것처럼 느껴질 때, 사실 뇌는 너무 많은 것을 처리해 감정을 차단하고 있어요. 이것도 정상적인 반응이에요.',
    check: {
      id: 'ct_numb',
      title: '아래 중 해당되는 게 있나요?',
      questions: [
        '2주 이상 무감각한 상태가 지속된다',
        '좋아했던 것에 전혀 흥미가 없다',
        '음식 맛도, 기쁨도, 슬픔도 잘 느껴지지 않는다'
      ],
      results: {
        high: { label: '우울증 증상과 비슷해요. 전문가 상담을 권해요.', threshold: 2, action: '정신건강복지센터(무료) 또는 <a href="tel:1577-0199">1577-0199</a>에 연락해 보세요.' },
        mid:  { label: '스트레스가 많이 쌓인 상태예요.', threshold: 1, action: '오늘 하나만: 좋아하던 노래 한 곡 틀어보세요.' },
        low:  { label: '일시적인 무감각일 수 있어요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '🎵', text: '예전에 좋아했던 노래 한 곡 틀기. 감각을 깨우는 가장 쉬운 방법이에요.' },
      { icon: '🚿', text: '따뜻한 물로 샤워하기. 신체 감각 자극이 감정 회로를 조금씩 열어줘요.' },
      { icon: '🐾', text: '밖에 10분만 나가서 발바닥이 땅에 닿는 감각에 집중해 보세요.' }
    ],
    help: [
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' },
      { number: '1393', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },
  angry: {
    icon: '😤', label: '이유 없이 화가 나요',
    recognition: '이유 없는 분노 뒤에는 대부분 억눌린 슬픔이나 무력감이 있어요. 화는 감정의 문이에요 — 들어가 보면 다른 감정이 있어요.',
    check: {
      id: 'ct_angry',
      title: '아래 중 해당되는 게 있나요?',
      questions: [
        '가족이나 가까운 사람에게 폭발한 적이 있다',
        '분노 후 심한 죄책감이 든다',
        '분노를 조절하기 어렵다고 느낀다'
      ],
      results: {
        high: { label: '분노 조절 관련 전문 상담이 도움이 될 수 있어요.', threshold: 2, action: '정신건강복지센터에서 무료 상담을 받을 수 있어요.' },
        mid:  { label: '스트레스가 과부하 상태예요.', threshold: 1 },
        low:  { label: '지금 느끼는 화, 아래 방법으로 배출해 보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '🏃', text: '5분만 빠르게 걷기. 아드레날린을 신체적으로 소비하는 게 가장 효과적이에요.' },
      { icon: '✍️', text: '지금 화나는 것을 종이에 적기. 쓰는 행위만으로도 감정 강도가 내려가요.' },
      { icon: '⏸️', text: '반응하기 전 10초 기다리기. "나는 지금 화가 났다"를 소리 내어 말해보세요.' }
    ],
    help: [
      { number: '1393', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' }
    ]
  },
  exhausted: {
    icon: '🫠', label: '너무 지쳐서 아무것도 하기 싫어요',
    recognition: '아무것도 하기 싫을 때, 그건 게으름이 아니에요. 몸과 마음이 충전을 요청하는 신호예요.',
    check: {
      id: 'ct_exhausted',
      title: '아래 중 해당되는 게 있나요?',
      questions: [
        '쉬어도 회복이 안 된다',
        '2주 이상 지속됐다',
        '일상적인 것(씻기, 식사)이 버겁다'
      ],
      results: {
        high: { label: '번아웃 또는 우울증 가능성이 있어요. 전문가 상담을 권해요.', threshold: 2, action: '<a href="tel:1577-0199">1577-0199</a>(정신건강위기상담, 무료·24시간)에 연락해 보세요.' },
        mid:  { label: '깊은 피로 상태예요.', threshold: 1 },
        low:  { label: '오늘만큼은 쉬어도 돼요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '🛌', text: '오늘 할 일 목록에서 하나를 지우세요. 안 해도 되는 것이 있어요.' },
      { icon: '☀️', text: '15분만 햇빛 아래 앉아있기. 세로토닌이 조금씩 올라가요.' },
      { icon: '🥤', text: '물 한 잔 마시기. 탈수가 피로감을 2배로 높여요.' }
    ],
    help: [
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' },
      { number: '1393', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  },
  lonely: {
    icon: '😔', label: '외로워서 견딜 수 없어요',
    recognition: '외로움은 연결에 대한 인간의 본능적 욕구예요. 느끼는 것 자체가 잘못된 게 아니에요.',
    check: {
      id: 'ct_lonely',
      title: '아래 중 해당되는 게 있나요?',
      questions: [
        '이야기를 나눌 사람이 한 명도 없다',
        '외로움이 2주 이상 지속됐다',
        '사람들과 있어도 외롭다'
      ],
      results: {
        high: { label: '만성적 고립 상태일 수 있어요. 상담을 통해 연결을 찾아볼 수 있어요.', threshold: 2, action: '정신건강복지센터(무료)에서 도움을 받을 수 있어요.' },
        mid:  { label: '연결이 필요한 시점이에요.', threshold: 1 },
        low:  { label: '아래 방법으로 작은 연결을 만들어 보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '💌', text: '오래된 친구에게 문자 한 통 보내기. "잘 지내?"라고만 해도 충분해요.' },
      { icon: '☕', text: '카페나 도서관처럼 사람이 있는 곳에 가서 1~2시간 있어보기.' },
      { icon: '📞', text: '말이 하고 싶다면 <a href="tel:1393">1393</a>에 전화해도 돼요. 상담사가 들어줘요.' }
    ],
    help: [
      { number: '1393', name: '자살예방상담전화', desc: '무료, 24시간. 외로울 때도 전화할 수 있어요. 자세한 내용은 전화 시 확인해 주세요.' },
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' }
    ]
  },
  overthinking: {
    icon: '🤯', label: '생각이 너무 많아요',
    recognition: '생각이 멈추지 않을 때, 뇌가 문제를 해결하려 과부하 상태예요. 생각을 멈추려는 것보다 생각을 흘려보내는 것이 효과적이에요.',
    check: {
      id: 'ct_overthink',
      title: '아래 중 해당되는 게 있나요?',
      questions: [
        '밤에 생각이 멈추지 않아 잠들기 어렵다',
        '같은 걱정이 반복적으로 든다',
        '최악의 상황을 자꾸 상상한다'
      ],
      results: {
        high: { label: '불안장애나 반추 사고 패턴일 수 있어요. 전문가 상담이 도움이 돼요.', threshold: 2, action: '인지행동치료(CBT)가 효과적이에요. 정신건강복지센터에서 무료로 받을 수 있어요.' },
        mid:  { label: '스트레스가 쌓인 상태예요.', threshold: 1 },
        low:  { label: '아래 방법으로 생각의 흐름을 바꿔보세요.', threshold: 0 }
      }
    },
    actions: [
      { icon: '📝', text: '지금 머릿속 걱정을 모두 종이에 적기. "적어두면 잊어도 된다"는 신호를 뇌에 보내요.' },
      { icon: '⏰', text: '"걱정 시간" 정하기: 하루 15분만 걱정하기. 그 외 시간에 걱정이 오면 "나중에 걱정하기"로 미루기.' },
      { icon: '🎧', text: '팟캐스트나 라디오 틀기. 다른 목소리가 뇌의 내부 독백을 방해해요.' }
    ],
    help: [
      { number: '1577-0199', name: '정신건강위기상담전화', desc: '무료, 24시간.' },
      { number: '1393', name: '자살예방상담전화', desc: '무료, 24시간. 자세한 내용은 전화 시 확인해 주세요.' }
    ]
  }
};

/* ── 위기 화면 (별도 경로) ── */
function buildCrisisScreen(container) {
  container.innerHTML = `
    <div class="crisis-page">
      <div class="crisis-msg">
        지금 많이 힘드시죠.<br>
        <em>여기까지 온 것만으로도 용기 있는 일이에요.</em><br><br>
        지금 바로 이야기를 들어줄 사람이 있어요.
      </div>
      <a href="tel:1393" class="emergency-call-big" aria-label="1393 자살예방상담전화 전화하기">
        📞 1393 자살예방상담전화
      </a>
      <p style="font-size:13px;color:var(--ink-m);margin-bottom:24px;">전화하면 상담사가 이야기를 들어줘요. 무료, 24시간.<br>자세한 내용(비밀보장 범위 등)은 전화 시 확인해 주세요.</p>
      <a href="https://pf.kakao.com/_xoxaeyxj" target="_blank" rel="noopener"
         class="emergency-call-big" style="background:linear-gradient(135deg,#3A1F6E,#6A3CB8);"
         aria-label="카카오톡 마음이음 상담">
        💬 카카오톡으로 상담하기
      </a>
      <p style="font-size:13px;color:var(--ink-m);margin-bottom:32px;">전화가 어려우면 카카오톡으로도 상담할 수 있어요.<br>(한국자살예방상담전화 공식 채널)</p>
      <p class="crisis-sub">
        지금 당장 전화하기 어렵다면,<br>
        이 페이지를 닫지 말고 잠시만 있어주세요.<br>
        당신은 혼자가 아니에요.
      </p>
      <button onclick="renderEmotionPage(document.getElementById('emotion-content'))"
              style="margin-top:28px;background:none;border:1px solid var(--line);border-radius:12px;padding:10px 20px;font-size:13px;color:var(--ink-l);cursor:pointer;">
        ← 돌아가기
      </button>
    </div>
  `;
}

/* ── 감정별 콘텐츠 렌더링 ── */
function buildEmotionDetail(container, key) {
  const d = EMOTION_GUIDE_DATA[key];
  if (!d) return;

  container.innerHTML = `
    <button class="page-back" onclick="renderEmotionPage(document.getElementById('emotion-content'))">← 감정 목록으로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,var(--lavender-d),var(--lavender))">
      <span class="content-hero-icon">${d.icon}</span>
      <h1>${esc(d.label)}</h1>
    </div>

    <div class="step-section">
      <div class="step-label">① 상황 인식</div>
      <p style="font-size:13.5px;color:var(--ink-m);line-height:1.75;word-break:keep-all;">${esc(d.recognition)}</p>
    </div>

    <div class="step-section" id="check-section-${key}">
      <div class="step-label">② 상황 판단</div>
    </div>

    <div class="step-section">
      <div class="step-label">③ 행동 가이드</div>
      <p style="font-size:12.5px;color:var(--ink-l);margin-bottom:10px;">지금 바로 할 수 있는 것</p>
      <div class="action-checklist">
        ${d.actions.map(a => `
          <div class="action-item" onclick="toggleAction(this)" role="checkbox" aria-checked="false" tabindex="0">
            <div class="action-check" aria-hidden="true"></div>
            <div class="action-text"><span class="action-emoji">${a.icon}</span><span>${esc(a.text)}</span></div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="step-section">
      <div class="step-label">④ 도움 연결</div>
      <p style="font-size:12.5px;color:var(--ink-l);margin-bottom:12px;">혼자 감당이 안 된다면</p>
      <div class="help-cards">
        ${d.help.map(h => `
          <a href="tel:${h.number}" class="help-card" aria-label="${h.name} ${h.number}">
            <div class="help-card-num">📞 ${h.number}</div>
            <div class="help-card-info">
              <div class="help-card-name">${esc(h.name)}</div>
              <div class="help-card-desc">${esc(h.desc)}</div>
            </div>
          </a>
        `).join('')}
      </div>
    </div>
  `;

  // 체크 툴 주입
  const checkSection = container.querySelector(`#check-section-${key}`);
  if (checkSection && typeof renderCheckTool === 'function') {
    renderCheckTool(checkSection, d.check);
  }
}

/* ── 메인 감정 목록 화면 ── */
function renderEmotionPage(container) {
  if (!container) return;

  container.innerHTML = `
    <button class="page-back" onclick="goHome()">← 홈으로</button>
    <div class="content-hero" style="background:linear-gradient(135deg,var(--lavender-d),var(--lavender))">
      <span class="content-hero-icon">😔</span>
      <h1>감정 가이드</h1>
      <p>감정을 어떻게 해야 할지 모르겠을 때,<br>여기서 잠깐 쉬어가도 돼요.</p>
    </div>

    <div class="step-section">
      <div class="step-label">지금 어떤 느낌이에요?</div>
      <div class="emotion-grid">
        ${Object.entries(EMOTION_GUIDE_DATA).map(([k, v]) =>
          `<button class="emotion-btn" onclick="buildEmotionDetail(document.getElementById('emotion-content'),'${k}')"
                   aria-label="${v.label}">
            <span class="emotion-btn-icon">${v.icon}</span>
            <span>${esc(v.label)}</span>
          </button>`
        ).join('')}
        <button class="emotion-btn crisis" onclick="buildCrisisScreen(document.getElementById('emotion-content'))"
                aria-label="죽고 싶다는 생각이 들어요">
          <span class="emotion-btn-icon">💀</span>
          <span>죽고 싶다는 생각이 들어요</span>
        </button>
      </div>
    </div>
  `;
}
