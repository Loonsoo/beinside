/* ═══════════════════════════════════════════════════════════
   BeInside — 콘텐츠 렌더링 함수
   새 카드·섹션 추가 시 이 파일을 수정하세요.
═══════════════════════════════════════════════════════════ */

/* ── Guide TOC ── */
function buildTOC() {
  const result = document.getElementById('result');
  if (!result) return;
  const old = result.querySelector('.guide-toc');
  if (old) old.remove();

  const cards = result.querySelectorAll('.card h3');
  if (cards.length < 2) return;

  const items = Array.from(cards).map((h3, i) => {
    const id = 'toc-card-' + i;
    h3.id = id;
    const raw = h3.textContent.trim();
    // 첫 단어(이모지 포함) 분리
    const parts = raw.split(' ');
    const em = parts[0] || '';
    const label = parts.slice(1).join(' ') || raw;
    return { id, em, label };
  });

  const tocItems = items.map(item =>
    '<div class="guide-toc-item" onclick="scrollToCard(\'' + item.id + '\')">' +
    '<span class="toc-em">' + item.em + '</span>' +
    '<span>' + item.label + '</span>' +
    '</div>'
  ).join('');

  const tocHTML =
    '<div class="guide-toc">' +
    '<div class="guide-toc-title">📋 이 가이드에 담긴 내용</div>' +
    '<div class="guide-toc-grid">' + tocItems + '</div>' +
    '</div>';

  const grid = result.querySelector('.grid');
  if (grid) grid.insertAdjacentHTML('beforebegin', tocHTML);
}

function scrollToCard(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const card = el.closest('.card') || el;
  const top = card.getBoundingClientRect().top + window.scrollY - 90;
  window.scrollTo({ top, behavior: 'smooth' });
}



/* ── Source Drawer ── */
// ── Source Drawer ──
function openSourceDrawer() {
  document.getElementById('source-overlay').classList.add('open');
  document.getElementById('source-drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeSourceDrawer() {
  document.getElementById('source-overlay').classList.remove('open');
  document.getElementById('source-drawer').classList.remove('open');
  document.body.style.overflow = '';
}
// Escape 키 처리는 app.js에서 통합 관리


/* ── 정신건강 카드 ── */
function getMentalHTML(months){
  const d=MENTAL[getMentalKey(months)];
  if(!d)return'';
  return`<div class="card full cbg-lavender">
    <div class="card-audience aud-all">👀 모두가 읽으면 좋아요</div>
    <h3>🧘 정신건강 &amp; 마음 돌봄</h3>
    <div class="stat-badge" title="출처: 보건복지부·국립정신건강센터 공식 통계 기반 | 자세한 출처는 하단 참고"><span class="sb-num">${d.stat.pct}</span>${d.stat.label} <span style="font-size:10px;opacity:0.7;margin-left:4px;">📎</span></div>
    <div style="background:rgba(200,80,110,.08);border-radius:10px;padding:10px 14px;margin-bottom:12px;font-size:12.5px;color:#A03050;font-weight:600;">
      ⚠️ ${d.risk}
    </div>
    <div style="margin-bottom:14px;">
      <div style="font-size:11.5px;font-weight:700;color:#6A3A90;letter-spacing:.06em;text-transform:uppercase;margin-bottom:8px;">이상 징후 체크</div>
      <ul>${d.signs.map(s=>`<li style="font-size:12.5px;color:var(--ink-m);line-height:1.65;padding-left:14px;position:relative;margin-bottom:5px;"><span style="position:absolute;left:0;color:#8A5AB4;font-size:16px;line-height:1.3;">·</span>${s}</li>`).join('')}</ul>
    </div>
    <div>
      <div style="font-size:11.5px;font-weight:700;color:#6A3A90;letter-spacing:.06em;text-transform:uppercase;margin-bottom:8px;">마음 훈련 &amp; 대처법</div>
      <ul>${d.tips.map(t=>`<li style="font-size:12.5px;color:var(--ink-m);line-height:1.65;padding-left:14px;position:relative;margin-bottom:5px;"><span style="position:absolute;left:0;color:#3A9A60;font-size:16px;line-height:1.3;">·</span>${t}</li>`).join('')}</ul>
    </div>
  </div>`;
}


/* ── 혼자 자라는 아이 카드 ── */
function getAloneHTML(months){
  const key=getAloneKey(months);
  if(!key)return'';
  const d=ALONE_DATA[key];
  return`<div class="card full" style="background:linear-gradient(135deg,#FFF8F2,#FEF2F8);border:1px solid rgba(220,140,160,.18);border-radius:20px;padding:26px 28px;">
    <div class="card-audience aud-child">🧒 본인 (아이·청소년·청년)</div>
    <h3>🫶 ${key==='child'?'많이 버텨온 너에게':key==='teen'?'스스로 견뎌온 너에게':'혼자 감당해온 너에게'}</h3>
    <div class="stat-badge" style="margin-bottom:14px;" title="출처: 보건복지부·국립정신건강센터 공식 통계 기반 | 자세한 출처는 하단 참고"><span class="sb-num">${d.stat.pct}</span>${d.stat.label} <span style="font-size:10px;opacity:0.7;margin-left:4px;">📎</span></div>
    <blockquote style="font-family:'Gowun Batang',serif;font-size:15px;color:var(--peach-d);line-height:1.85;font-style:italic;margin-bottom:18px;padding-left:16px;border-left:3px solid var(--peach);">${d.quote}</blockquote>
    <div style="display:flex;flex-direction:column;gap:10px;">
      ${d.items.map(it=>`<div style="display:flex;align-items:flex-start;gap:12px;padding:13px 16px;background:var(--white);border-radius:13px;border:1px solid rgba(232,137,106,.10);">
        <span style="font-size:20px;flex-shrink:0;margin-top:1px;">${it.icon}</span>
        <div style="font-size:13px;color:var(--ink-m);line-height:1.7;">
          <strong style="display:block;font-size:12.5px;font-weight:700;color:var(--ink);margin-bottom:3px;">${it.title}</strong>${it.text}
        </div>
      </div>`).join('')}
    </div>
  </div>`;
}


/* ── 영유아 응급처치 ── */
function getFirstAidHTML(months){
  if(months>36)return'';
  return`<div class="card full" style="background:linear-gradient(135deg,#FFF5F2,#FFF0EE);border:1px solid rgba(220,80,60,.15);border-radius:20px;padding:26px 28px;">
    <div class="card-audience aud-parent">👨‍👩‍👧 부모·보호자 필독</div>
    <h3>🚨 영유아 응급처치 가이드</h3>
    <div style="background:rgba(200,60,60,.08);border-radius:10px;padding:10px 14px;margin-bottom:16px;font-size:12.5px;color:#A02020;font-weight:600;">
      📞 응급상황 즉시 <strong>119</strong> 신고 — 전화 연결 유지하며 지시에 따르세요
    </div>
    <div class="firstaid-grid">
      <div class="fa-item fa-red">
        <div class="fa-item-head">
          <span class="fa-item-icon">🫁</span>
          <span class="fa-item-title">영아 심폐소생술 (CPR)</span>
          <span class="fa-urgency urg-911">즉시 119</span>
        </div>
        <ol>
          <li>의식·호흡 확인 — 발바닥 자극, 반응 없으면 즉시 119</li>
          <li>영아: 가슴 압박 — 두 손가락으로 젖꼭지 연결선 바로 아래, 깊이 4cm, 분당 100~120회</li>
          <li>인공호흡 — 코와 입을 함께 덮고 1초간 부드럽게 불기 (가슴이 올라오는지 확인)</li>
          <li>30:2 반복 (압박 30회 : 호흡 2회) — 구급대 도착까지 계속</li>
        </ol>
      </div>
      <div class="fa-item fa-red">
        <div class="fa-item-head">
          <span class="fa-item-icon">🍬</span>
          <span class="fa-item-title">기도 폐쇄 (이물질 걸림)</span>
          <span class="fa-urgency urg-911">즉시 119</span>
        </div>
        <ol>
          <li>울거나 기침하면 — 스스로 배출 가능. 기다리며 관찰</li>
          <li>소리 없이 얼굴 파래짐 — 즉시 조치 필요</li>
          <li>영아 등 두드리기: 얼굴 아래로 엎드려 손바닥 뒤꿈치로 등 5회 강하게 두드리기</li>
          <li>흉부 압박: 뒤집어 두 손가락으로 가슴 중앙 5회 압박</li>
          <li>교대 반복, 이물질 보이면 손가락으로 제거 (맹목적 손 넣기 금지)</li>
        </ol>
      </div>
      <div class="fa-item fa-amber">
        <div class="fa-item-head">
          <span class="fa-item-icon">🔥</span>
          <span class="fa-item-title">화상</span>
          <span class="fa-urgency urg-now">즉시 처치</span>
        </div>
        <ol>
          <li>흐르는 찬물로 10~20분 냉각 (얼음 사용 금지)</li>
          <li>옷이 달라붙었으면 억지로 벗기지 말 것</li>
          <li>물집 터뜨리지 않기</li>
          <li>깨끗한 천으로 덮은 후 병원으로</li>
          <li>손바닥 크기 이상이거나 얼굴·손·생식기 화상이면 즉시 119</li>
        </ol>
      </div>
      <div class="fa-item fa-amber">
        <div class="fa-item-head">
          <span class="fa-item-icon">💧</span>
          <span class="fa-item-title">열성경련</span>
          <span class="fa-urgency urg-now">침착하게 대응</span>
        </div>
        <ol>
          <li>안전한 곳에 옆으로 눕히기 (기도 확보)</li>
          <li>입 안에 아무것도 넣지 않기 (혀 깨문다는 건 미신)</li>
          <li>5분 이상 지속되면 즉시 119</li>
          <li>경련 중 억지로 몸 잡지 않기</li>
          <li>경련 후 체온 측정 — 38℃ 이상이면 병원</li>
        </ol>
      </div>
      <div class="fa-item fa-amber">
        <div class="fa-item-head">
          <span class="fa-item-icon">🩹</span>
          <span class="fa-item-title">낙상·두부 외상</span>
          <span class="fa-urgency urg-now">주의 관찰</span>
        </div>
        <ul>
          <li>즉시 119 상황: 의식 잃음, 구토 반복, 동공 불균등, 귀·코 출혈</li>
          <li>보통 낙상: 10~15분 안정 후 정상 행동이면 집에서 관찰</li>
          <li>24시간 관찰 — 과도한 졸음, 구토, 두통 호소 시 병원</li>
          <li>침대 낙상 예방: 수면 중 침대 난간 꼭 올리기</li>
        </ul>
      </div>
      <div class="fa-item fa-green">
        <div class="fa-item-head">
          <span class="fa-item-icon">🌡️</span>
          <span class="fa-item-title">고열 대처</span>
          <span class="fa-urgency urg-watch">단계적 대응</span>
        </div>
        <ul>
          <li>3개월 미만 38℃ 이상 → 즉시 응급실</li>
          <li>3~6개월 39℃ 이상 → 당일 소아과</li>
          <li>6개월 이상 → 해열제 투여 후 경과 관찰</li>
          <li>해열제: 아세트아미노펜(타이레놀계) or 이부프로펜 체중 기준 용량으로</li>
          <li>미지근한 물 수건으로 이마·겨드랑이·사타구니 닦아주기 (알코올 금지)</li>
          <li>수분 보충 (모유·분유·보리차) — 탈수 예방이 핵심</li>
        </ul>
      </div>
    </div>
    <div style="background:rgba(60,140,90,.07);border-radius:10px;padding:11px 15px;margin-top:14px;font-size:12px;color:#2A6A40;line-height:1.65;">
      💡 <strong>예방이 최선</strong> — 영아 흔들기 절대 금지 / 수면 시 반드시 등 대고 재우기 / 소형 물건(동전·단추·장난감 부품) 손 닿는 곳에 두지 않기 / 욕조 목욕 시 절대 자리 비우지 않기
    </div>
  </div>`;
}


/* ── SP 렌더링 ── */
function renderSP(sitIdx){
  const sit=SP_DATA[sitIdx];
  const hdr=sit.hdr;
  let stageTabsHTML=SP_STAGES.map((s,i)=>
    `<button class="sp-age-tab${i===0?' on':''}" id="spat${i}" onclick="selectSpStage(${sitIdx},${i})">${s.label}<span style="font-weight:400;font-size:10.5px;margin-left:4px;opacity:.7">${s.sub}</span></button>`
  ).join('');

  let stagesHTML=SP_STAGES.map((s,i)=>{
    const stageKey=s.id;
    const sd=sit[stageKey];
    if(!sd)return `<div class="sp-stage${i===0?' on':''}" id="spstage${i}"><p style="color:var(--ink-l);font-size:13px;padding:20px 0">이 연령대는 해당 상황 정보가 준비 중입니다.</p></div>`;

    const needCards=sd.need.map(c=>
      `<div class="sp-card ${c.cls}"><h4><em class="${c.tag}">${c.tagText}</em>${c.title}</h4><ul>${c.items.map(it=>`<li>${it}</li>`).join('')}</ul></div>`
    ).join('');

    const scriptsHTML=sd.scripts.map(sc=>
      `<div class="sp-script"><div class="sc-tag">💬 ${sc.tag}</div><p>${sc.text}</p></div>`
    ).join('');

    const warnsHTML=sd.warns?(
      `<div style="margin-top:16px;">
        <div class="sp-section-title">⚠️ 이것만은 피하세요</div>
        ${sd.warns.map(w=>`<div class="sp-warn"><span class="wi">⚠️</span><span>${w}</span></div>`).join('')}
      </div>`
    ):'';

    return `<div class="sp-stage${i===0?' on':''}" id="spstage${i}">
      <div class="sp-section-title">📌 이 시기 핵심 지원</div>
      <div class="sp-grid">${needCards}</div>
      <div class="sp-section-title" style="margin-top:16px">💬 이렇게 말해주세요</div>
      <div class="sp-scripts">${scriptsHTML}</div>
      ${warnsHTML}
    </div>`;
  }).join('');

  document.getElementById('sp-result').innerHTML=`
    <div class="sp-header" style="background:linear-gradient(135deg,${hdr.grad[0]} 0%,${hdr.grad[1]} 100%)">
      <span class="sp-hicon">${hdr.icon}</span>
      <div class="sp-htitle"><h2>${hdr.title}</h2><p>${hdr.sub}</p></div>
    </div>
    <div class="sp-age-tabs">${stageTabsHTML}</div>
    ${stagesHTML}`;
}

function selectSpStage(sitIdx,stageIdx){
  SP_STAGES.forEach((_,i)=>{
    document.getElementById('spat'+i).classList.toggle('on',i===stageIdx);
    document.getElementById('spstage'+i).classList.toggle('on',i===stageIdx);
  });
}

// SP 패널 초기화는 app.js에서 담당


/* ── 발달 데이터 조회 ── */
function getData(months){
  const y=months/12;

  if(months<=1) return {stg:'신생아기',em:'🐣',qt:'세상에 막 도착한 생명. 이 아이의 모든 처음이 지금 시작됩니다.',g:['#1A5030','#4EAA78'],role:'부모',
    brain:['<strong>시냅스 폭발적 형성</strong> — 출생 시 약 100억 개 뉴런, 초당 수백만 개 시냅스 연결 생성','<strong>청각 최우선 발달</strong> — 자궁에서부터 들어온 엄마 목소리를 인식·선호','시각 초점 20~25cm — 엄마 얼굴 거리가 딱 이 정도','원시반사 작동 — 파악·모로·흡착 반사가 생존을 지탱','REM 수면 70% — 활성 수면 중 뇌 회로가 집중 형성'],
    emo:['<strong>기본 신뢰감의 씨앗</strong>(에릭슨) — 울면 안아주는 경험이 "세상은 안전하다"는 각인의 시작','불편·배고픔·통증을 울음으로만 표현 — 이 신호를 읽는 것이 첫 번째 정서 돌봄','엄마(주양육자) 목소리·심장 소리에 심박수 안정','기쁨·고통·놀람·혐오의 기본 감정 이미 존재'],
    body:['출생 평균 체중 3.2~3.4kg, 신장 50cm','수면 하루 16~18시간 (2~3시간 단위로 깸)','수유 24시간 8~12회 (2~3시간 간격)','황달 3~5일 최고조, 대부분 2주 내 자연 소실','배꼽 1~2주 내 탈락 — 마를 때까지 건조 유지'],
    play:[{t:'목소리 자극',d:'엄마·아빠 목소리로 말 걸기, 자장가 — 청각 신경로와 정서 연결 강화'},{t:'눈 맞춤',d:'20~30cm 거리에서 얼굴 보여주기, 흑백 패턴 — 시각 피질 자극'},{t:'캥거루 케어',d:'피부 맞닿는 신체 접촉, 부드러운 마사지 — 옥시토신·세로토닌 분비'},{t:'배 엎어 두기',d:'하루 2~3회 잠깐씩 — 목·등 근육 발달의 시작'}],
    parent:[{e:'👂',t:'울음에 즉각 반응\n버릇 걱정 말고, 신뢰감이 먼저'},{e:'👁️',t:'눈 맞추며 대화\n감정을 언어로 번역해 주기'},{e:'🤲',t:'최대한 많이 안기\n신체 접촉이 뇌 발달의 기반'}],
    warn:['<strong>흔들기 절대 금지</strong> — 영아 흔들림 증후군(AHT), 뇌출혈·사망 위험','<strong>엎어 재우기 금지</strong> — 영아 돌연사(SIDS) 위험. 수면 시 반드시 등 대고 재우기','수면 중 주변 부드러운 물건(베개·인형) 제거 — 질식 위험','발열 38℃ 이상 즉시 소아과 내원'],
    mile:[{ck:'✓',tt:'1개월 체크',dc:'큰 소리에 눈 깜빡임, 밝은 빛 반응, 울음으로 의사 표현, 배 엎으면 잠깐 고개 들기'}]};

  if(months<=3) return {stg:'초기 영아기 (2~3개월)',em:'🌸',qt:'첫 미소는 세상에 보내는 첫 번째 사랑의 신호입니다.',g:['#1A4A38','#5EAA80'],role:'부모',
    brain:['<strong>사회적 미소 출현</strong>(6~8주) — 반사 미소가 아닌 사람 얼굴 인식 후 진짜 미소','시각 발달 급성장 — 색 구별 시작, 움직이는 물체 눈으로 추적','청각-시각 통합 — 소리 나는 방향으로 고개 돌리기','옹알이 시작 — 아·우 등 모음 발화로 상호작용 의도 표현'],
    emo:['<strong>사회적 미소 — 최초의 사회적 소통 행동</strong>','주양육자 얼굴을 다른 얼굴보다 선호 — 선택적 애착의 씨앗','아이가 발화하면 맞장구 치는 "대화 리듬" 형성 가능','모빌·밝은 색에 기쁨 반응, 놀라움·불쾌 표현'],
    body:['수면 15~16시간, 밤 수면 4~6시간 연속 가능해지기 시작','목을 잠깐 가눌 수 있음 (배 엎어 둘 때)','체중 매주 약 150~200g 증가','2개월 — BCG·B형간염·폐렴구균·DTaP·폴리오·로타 예방접종 시작'],
    play:[{t:'모빌',d:'얼굴에서 30cm 높이 색깔 모빌 — 시각 추적 능력 훈련'},{t:'대화 주고받기',d:'아이 표정 흉내내기, 발화 후 기다렸다가 맞장구 — 대화 리듬'},{t:'배 엎드리기',d:'하루 3~5회 각 3분씩 — 목·등·어깨 근육 강화'},{t:'손 잡기',d:'손가락 쥐여주기 — 촉각 자극, 파악 반사 강화'}],
    parent:[{e:'😊',t:'표정 따라 하기\n거울 반응이 뇌 발달 촉진'},{e:'🗣️',t:'맞장구 대화\n아이 옹알이 후 기다렸다가 반응'},{e:'📅',t:'루틴 만들기\n수유-수면-각성 예측 가능한 리듬'}],
    warn:['2개월까지 발열 38℃ 이상 — 응급 수준으로 즉시 병원','수면 중 TV·유튜브 소리 지속 노출 자제 — 수면 질 저하','방문자 과도한 자극 주의 — 감각 과부하','예방접종 후 24~48시간 발열 가능 — 해열제 준비'],
    mile:[{ck:'✓',tt:'3개월 체크',dc:'사회적 미소, 소리 방향 고개 돌리기, 딸랑이 반응, 배 엎으면 고개 들기, 옹알이'}]};

  if(months<=6) return {stg:'중기 영아기 (4~6개월)',em:'🌼',qt:'손이 닿는 모든 것이 배움입니다. 안전한 세상을 넓혀주세요.',g:['#1A4A38','#4E9A72'],role:'부모',
    brain:['<strong>물체 영속성 싹틈</strong> — "없어진 것은 사라진 게 아니다" 인지 시작','옹알이 다양화 — ba·ma·da 등 자음+모음 조합 (언어 발달의 핵심 기반)','인과관계 초보 인식 — "흔들면 소리가 난다"','기억력 발달 — 3~6초 이상 물체 기억 가능'],
    emo:['<strong>낯가림 시작</strong>(4~5개월~) — 주양육자 외 경계, 정상적 발달 신호','웃음 다양화 — 간질이기·숨바꼭질 반응','화남·슬픔·두려움·즐거움이 구분되어 표현','주양육자 표정 보고 감정 조율(사회적 참조) 시작'],
    body:['뒤집기 시도(4~5개월), 완성(5~6개월)','이유식 시작 권장 시점 — WHO 권장 만 6개월, 최소 만 4개월 이후','치아 날 수 있음(평균 6개월, 개인차 큼)','밤 수면 6~8시간 연속 가능해지는 아이 늘어남','4개월 — DTaP·폐렴구균·폴리오·로타 2차 접종'],
    play:[{t:'까꿍',d:'손으로 얼굴 가렸다가 "까꿍!" — 물체 영속성과 예측력 발달'},{t:'소리 장난감',d:'딸랑이·악기 장난감 — "내가 하니까 소리가 나!" 인과관계'},{t:'촉각 놀이',d:'다양한 질감 천·물체 만지기 — 감각 통합'},{t:'앉기 지지',d:'등 받쳐 앉히기 연습 — 균형감각·근육 훈련'}],
    parent:[{e:'🎵',t:'동요 불러주기\n언어·리듬·감정 동시 자극'},{e:'🥣',t:'이유식 경험 공유\n"맛있지?" 새 경험에 긍정 감정'},{e:'🧸',t:'낯가림 인정하기\n"무서웠지, 괜찮아" 후 천천히 소개'}],
    warn:['<strong>소형 물건·동전·단추 배터리</strong> — 모든 것을 입에 넣는 시기, 완전 차단','이유식 꿀 절대 금지(1세 미만) — 영아 보툴리눔 위험','스크린 노출 최소화 (AAP: 18개월 미만 화상통화 외 권고 안 함)','앉히기 연습 시 넘어짐 대비 주변 쿠션 필수'],
    mile:[{ck:'✓',tt:'6개월 체크',dc:'뒤집기, 양손으로 물체 잡기, ba/ma 옹알이, 낯가림, 앉기 시도'}]};

  if(months<=12) return {stg:'후기 영아기 (7~12개월)',em:'🌻',qt:'첫 걸음, 첫 말. 이 모든 처음을 목격하는 것이 부모의 특권입니다.',g:['#1A4A30','#3A8A60'],role:'부모',
    brain:['<strong>물체 영속성 완성</strong> — 숨긴 물건을 찾아냄 (피아제 감각운동기)','<strong>첫 단어 출현</strong>(10~12개월) — 맘마·빠빠 등 의미 있는 말의 시작','손가락 집기(pincer grasp) 완성 — 세밀한 소근육·신경 연결','타인의 의도 초보 이해 시작'],
    emo:['<strong>분리불안 최고조</strong>(8~10개월~) — 엄마가 안 보이면 울음, 정상 발달','사회적 참조 활발 — 낯선 상황에서 엄마 표정 보고 위험 여부 판단','자기 이름에 반응, 거울 속 자기 인식 시작','애착 대상에게 적극적 접근 행동'],
    body:['기어다니기(7~9개월) → 붙잡고 서기(9~11개월) → 첫 걸음(10~14개월)','체중 출생 시 3배, 신장 약 75cm','이유식 → 유아식 전환 시작, 컵으로 마시기 시도','12개월 건강검진 + 수두·MMR·A형간염 예방접종'],
    play:[{t:'탐색 놀이',d:'서랍 열고 닫기, 통에 넣고 빼기 — 인과·공간 개념 발달'},{t:'그림책',d:'두꺼운 보드북, 그림 가리키며 이름 말하기 — 언어 폭발 준비'},{t:'물놀이',d:'대야에 물 담아 손으로 첨벙 — 감각 통합, 인과관계'},{t:'잡고 걷기',d:'소파 짚고·손잡고 걷기 연습 — 균형감각·근육 강화'}],
    parent:[{e:'📚',t:'매일 10분 그림책\n언어 발달에 가장 효과적'},{e:'🏠',t:'안전한 탐색 환경\n모서리 보호대·콘센트 커버'},{e:'💬',t:'분리 시 예고하기\n예측 가능성이 신뢰감의 기반'}],
    warn:['<strong>계단·욕조·수영장 1초도 혼자 금지</strong>','1세 미만 생우유 금지 — 분유·모유만','포도알·떡 크기 음식 — 기도 막힘 위험','보행기 주의 — 낙상, 걷기 발달 지연 가능'],
    mile:[{ck:'✓',tt:'12개월 체크',dc:'1~3개 의미 있는 단어, 손가락으로 가리키기, 붙잡고 걷기, 간단한 지시 이해'}]};

  if(months<=24) return {stg:'걸음마기 (13~24개월)',em:'🐾',qt:'"싫어!"는 건강한 자아의 신호입니다. 이 에너지를 꺾지 말고 방향을 잡아주세요.',g:['#2A4A30','#5C7A6B'],role:'부모',
    brain:['<strong>언어 폭발기</strong> — 매주 새 단어, 월 10~15개 어휘 증가','상징 놀이 시작 — 빈 컵으로 마시는 척, 인형에게 밥 주는 척','두 단어 문장 시작(18~24개월) — "엄마 까까", "아빠 왔어"','전두엽 급발달 — 하지만 완성까지 25년. 충동 조절 한계는 당연'],
    emo:['<strong>자율성 욕구 시작</strong> — "내가 할 거야!" 에릭슨 자율성 vs 수치심 단계','떼쓰기 — 감정은 있는데 언어가 따라오지 못하는 갭','자아 인식 강화 — 거울에서 자기 얼굴 스티커를 찾아냄','공감의 씨앗 — 다른 아이 울면 위로 시도'],
    body:['걷기 안정화, 뛰기 시작, 계단 기어서 오르기','손가락 음식 집어먹기, 숟가락 사용 시도','낮잠 2회 → 1회로 줄어드는 시기','18·24개월 영유아 건강검진 권장'],
    play:[{t:'쌓기/쏟기',d:'블록 쌓기, 모래·쌀 쏟고 담기 — 소근육·인과·집중력'},{t:'따라 하기',d:'청소·요리 흉내 역할 놀이 — 사회적 모방 학습'},{t:'야외 탐색',d:'공원에서 자유롭게 걷기, 나뭇잎·돌 만지기 — 감각 통합'},{t:'음악 움직임',d:'동요에 맞춰 몸 움직이기 — 리듬감·청각-운동 통합'}],
    parent:[{e:'🧡',t:'떼쓸 때 공감 먼저\n"화났구나, 속상하지" 감정 번역'},{e:'⏳',t:'작은 선택권 주기\n"빨간 옷 vs 파란 옷?" 자율성의 씨앗'},{e:'🔄',t:'루틴 일관성\n밥-놀이-낮잠-목욕-수면 패턴'}],
    warn:['<strong>떼쓰기에 화로 대응 시 역효과</strong> — 함께 폭발하면 "공포"가 각인','TV·스마트폰 2세 미만 사용 최소화','세제·약품·독성 식물 완전 차단','실외 활동 시 모자·선크림 — 피부 방어막 미성숙'],
    mile:[{ck:'✓',tt:'24개월 체크',dc:'50개 이상 어휘, 두 단어 문장, 두 가지 지시 이해, 혼자 뛰기, 숟가락 사용'}]};

  if(months<=36) return {stg:'유아기 초반 (만 2~3세)',em:'🌈',qt:'아이의 상상 속 세계를 함께 믿어주세요. 그 세계가 창의성의 토대입니다.',g:['#3A3A10','#8A8A30'],role:'부모',
    brain:['세 단어 이상 문장, "왜?" 무한 질문 — 인과 탐구 본능','<strong>마음 이론 초기</strong> — "나와 타인은 다른 생각을 한다" 인식 시작','기억력 비약적 발달 — 며칠 전 사건 기억, 이야기 순서 기억','상상력 폭발 — 상상 속 친구 생기는 시기 (정상)'],
    emo:['<strong>주도성 욕구</strong> — "내가 할 거야, 내가 결정할 거야"','죄책감 처음 경험 — 규칙을 어겼을 때 스스로 알아차림','감정 기복 심함 — 전전두엽 미성숙으로 조절 한계','또래 놀이 관심 증가 (병렬 놀이 → 협동 놀이 발전 중)'],
    body:['세발자전거 타기, 계단 혼자 오르내리기 (한 발씩)','배변 훈련 시작 가능 시점 (평균 완료: 3~4세)','젓가락 사용 시도 가능','수면 10~12시간, 낮잠 필요할 수도 있음'],
    play:[{t:'상상 놀이',d:'병원·소방관 역할극 — 마음 이론·공감·사회성 발달'},{t:'점토/모래',d:'밀고 만들기 — 소근육·창의성·감각 통합'},{t:'퍼즐',d:'4~8조각 퍼즐 — 공간 인식·문제 해결·인내심'},{t:'그림 그리기',d:'동그라미, 선 → 사람 얼굴 그리기 시도'}],
    parent:[{e:'🎭',t:'역할 놀이 함께하기\n스스로 정한 규칙·진행을 따라가기'},{e:'🚫',t:'배변 훈련 강요 금지\n실패해도 절대 혼내지 않기'},{e:'❓',t:'"왜?"에 성실하게 답하기\n인과 사고 언어를 함께 배우는 시간'}],
    warn:['3세의 상상 발화를 "거짓말"로 혼내기 — 정상적 인지 발달 과정','<strong>체벌 — 공격성·불안 증가</strong> (연구 일관됨). 타임아웃·자연스러운 결과로 대체','배변 훈련 사고에 부정적 반응 금지','과도한 학습 강요 — 뇌가 아직 추상 학습에 준비 안 됨'],
    mile:[{ck:'✓',tt:'36개월 체크',dc:'3~4단어 문장, 자기 이름·나이 말하기, 색 2개 이상 구분, 혼자 옷 벗기'}]};

  if(y<=6) return {stg:'유아기 (만 4~6세)',em:'🎨',qt:'이 나이의 놀이는 그냥 노는 것이 아닙니다. 놀이가 곧 공부입니다.',g:['#4A3010','#C8924A'],role:'부모',
    brain:['<strong>언어 급발달</strong> — 4세 약 1,500어휘, 5~6세 2,000~3,000어휘','기억·주의·계획·억제 등 <strong>실행 기능 발달 최적기</strong>','마음 이론 발달 — "나와 타인은 다른 생각을 한다" 인식 완성','무한 "왜?" 질문 — 인과 탐구 본능의 절정'],
    emo:['<strong>주도성 욕구</strong> — "내가 결정할 거야"','죄책감·수치심·자부심·질투 등 복합 감정 경험','또래 관계 중요성 급증 — 친구에게 인정받고 싶은 욕구 시작','공감 능력 도약 — 타인의 감정 이유를 이해하기 시작'],
    body:['세발자전거 → 두발자전거 도전, 한 발 서기 5초 이상','가위질, 이름 쓰기 시도, 단추 잠그기','시력 검사 중요 — 4~5세 내 약시 조기 발견','키 100~120cm, 체중 15~23kg 범위'],
    play:[{t:'역할극',d:'병원·소방관·요리사 놀이 — 마음 이론·공감·사회성 동시 발달'},{t:'보드게임',d:'짝 맞추기·도미노 — 규칙 이해, 차례 기다리기, 승패 감정 조절'},{t:'만들기',d:'종이 접기·오리기·점토 — 소근육·집중력·성취감'},{t:'자연 탐구',d:'개미 관찰·씨앗 심기 — 과학적 호기심·생명 존중'}],
    parent:[{e:'🎲',t:'지는 경험 허용\n"져도 괜찮아" 감정 회복력 훈련'},{e:'📌',t:'규칙은 이유와 함께\n"왜냐하면"을 항상 붙이기'},{e:'🌿',t:'조기 학습 경계\n이 시기 뇌는 감각·언어·사회성이 우선'}],
    warn:['<strong>한글·영어 조기 학습 강압</strong> — 언어 학습 의욕 저하, 학습 공포 유발','체벌 — 공격성·불안 증가. 타임아웃·자연스러운 결과로 대체','비교 절대 금지 — "누구는 잘 하는데" → 수치심·열등감의 씨앗','"남자답게", "여자답게" 성 고정관념 언어 주의'],
    mile:[{ck:'✓',tt:'6세 체크',dc:'자기 이름 쓰기, 10까지 세기, 색 6가지 이상 구분, 간단한 게임 규칙 이해, 친구 이름 기억'}]};

  if(y<=12) return {stg:'학령기 (7~12세)',em:'📚',qt:'학교는 지식을 배우는 곳이지만, 가정은 삶을 배우는 곳입니다.',g:['#3A2A10','#A07840'],role:'부모',
    brain:['<strong>논리적·분류적 사고</strong>(피아제 구체적 조작기) — 양·무게·부피 보존 개념 획득','주의집중 20~30분 가능, 작업 기억 발달','<strong>읽기 뇌 회로 형성</strong> — 이 시기 독서 경험이 평생 읽기 능력 결정','비판적 사고 발달 — 권위에 의문 제기 시작 (정상적 발달)'],
    emo:['<strong>또래 인정이 자존감의 핵심</strong> — 친구에게 어떻게 보이는지가 최우선','자아 개념 발달 — "나는 수학을 잘 해", "나는 달리기가 느려" 구체적 자기 평가','숨기는 감정 생김 — 부모에게 모든 것을 말하지 않기 시작','초기 사춘기 시작 가능 (여아 10~11세, 남아 11~12세)'],
    body:['대근육 완전 발달 — 자전거·수영·구기 종목 가능','영구치 나기 시작(6~7세) — 구강 위생 습관 중요','시력·청력 이상 → 학습 부진으로 나타날 수 있음. 정기 검진 필수','수면 9~11시간 필요'],
    play:[{t:'독서',d:'혼자 책 읽기 습관 최적기 — 매일 20분이 전 학습의 기반'},{t:'팀 스포츠',d:'축구·농구·배드민턴 — 협동·규칙·승패 처리·팀워크'},{t:'만들기',d:'레고·뜨개질·목공 — 계획·실행·문제 해결의 실제 훈련'},{t:'요리 참여',d:'간단한 요리 도우미 — 수학(계량)·과학(가열)·협력·성취감'}],
    parent:[{e:'📖',t:'독서 먼저\n하루 20분이 모든 학습 능력의 기반'},{e:'👂',t:'열린 질문\n"어땠어?"보다 "오늘 재밌었던 거 있어?"'},{e:'🏆',t:'과정 칭찬\n"100점"보다 "열심히 공부했구나"'}],
    warn:['<strong>선행 학습 과부하</strong> — 학습 불안과 공포의 씨앗','친구 관계 문제에 즉각 개입 자제 — 스스로 해결하는 경험이 사회성','숙제·성적으로 매일 갈등 — 학습에 대한 부정적 감정 고착','스크린 타임 규칙 필수 — 하루 2시간 이내, 취침 1시간 전 금지'],
    mile:[{ck:'✓',tt:'12세 체크',dc:'혼자 독서·숙제, 친구 2명 이상, 자기 감정 단어로 표현, 규칙 이해·준수'}]};

  if(y<=18) return {stg:'청소년기 (13~18세)',em:'🌊',qt:'폭풍 같은 사춘기. 아이가 나를 밀어낼수록, 멀리서 더 단단히 버텨주세요.',g:['#1A3050','#4A7AAA'],role:'부모',
    brain:['<strong>편도체 과활성</strong> — 감정 반응이 성인보다 30% 강하고 빠름 (뇌과학적 사실)','<strong>전두엽 미완성</strong> — 충동 조절·결과 예측·계획 능력 공사 중 (완성: 25세)','수면 주기 지연 — 생물학적으로 밤형으로 바뀜. 아침에 못 일어나는 것은 의지 문제 아님','보상 회로 민감화 — 위험 감수·자극 추구의 뇌과학적 이유'],
    emo:['<strong>정체성 탐색</strong>(에릭슨) — "나는 누구인가?" 이 시기의 핵심 과제','부모로부터 심리적 분리 욕구 극대화 — 갈등은 정상','동료 압력에 가장 취약 — 집단 소속이 생존 본능처럼 느껴짐','첫 로맨틱 감정, 성 정체성 탐색 시작'],
    body:['성장 급진 — 남아 연간 8~12cm 성장 가능','여드름·체취 변화 — 신체 수치심에 주의','<strong>수면 8~10시간 필수</strong> — 수면 부족 = 충동성↑ 학습 능력↓','여아 초경 평균 12~13세, 남아 성장 급진 11~12세부터'],
    play:[{t:'자기 표현',d:'음악·그림·글쓰기·사진 — 정체성 탐색의 도구, 절대 폄하 금지'},{t:'운동',d:'규칙적 운동 — 도파민·세로토닌 자연 생성, 우울·불안 예방 최고 효과'},{t:'사회 참여',d:'봉사·동아리 — 소속감·가치관 형성·긍정적 또래 관계'},{t:'대화',d:'심판 없는 대화 — 좋아하는 취미·관심사 물어보기'}],
    parent:[{e:'🤐',t:'충고보다 경청\n"그래서 어떻게 됐어?" 100배 낫다'},{e:'📵',t:'스마트폰 계약\n규칙을 함께 정하면 반발 감소'},{e:'🫂',t:'존재 자체로 사랑\n거절해도 사랑한다는 것 말로·행동으로'}],
    warn:['<strong>감시·통제 강화 → 역효과</strong> — 비밀이 더 많아지고 거리가 벌어짐','성적·외모·비교로 자존감 공격 — 이 시기 가장 치명적','수면 강제 박탈 — 생물학적 리듬 무시','정신 건강 이상 신호(우울·자해·자살 발언) 무시 절대 금지 — 즉시 전문 상담'],
    mile:[{ck:'✓',tt:'18세 체크',dc:'자기 가치관 있음, 스트레스 대처법 있음, 진로 방향 어느 정도 있음, 부모와 협상 가능'}]};

  if(y<=29) return {stg:'청년기 (19~29세)',em:'🦋',qt:'이제 아이는 어른이 되었습니다. 부모의 역할은 지지자로 바뀌어야 합니다.',g:['#1A3A50','#3A7A9A'],role:'부모',
    brain:['<strong>전두엽 완성</strong>(약 25세) — 충동 조절·장기 계획·공감 능력 도약','신경가소성 여전히 매우 높음 — 새로운 언어·기술 학습 최적기','정체성 위기와 재정립 반복 — 이것이 성장의 과정','스트레스 조절 능력 급성장 — 첫 번째 "진짜 삶" 충격과 충돌'],
    emo:['<strong>친밀감 vs 고립감</strong>(에릭슨) — 깊은 관계를 맺을 수 있는가','진짜 사회로 나오는 충격 — 대학·취업·독립의 현실','처음으로 혼자 결정하는 경험들의 연속','부모와 관계 재정립 — 권위에서 어른 대 어른으로 전환'],
    body:['신체 성장 완료, 근육량 최고조, 뇌 발달 25세 완료','수면 7~9시간 필요','음주·흡연·약물이 뇌에 미치는 영향 성인보다 큼 (뇌 완성 전)','정기 건강검진 습관 시작 — 기준치 파악이 평생 건강의 기반'],
    play:[{t:'사회 활동',d:'동아리·봉사·여행 — 다양한 사람과 경험이 자아 확장'},{t:'새 기술 습득',d:'언어·악기·코딩 — 신경가소성 최고조 시기'},{t:'경제 교육',d:'재테크·소비 관리 — 재정 자립의 기반'},{t:'진지한 관계',d:'깊은 우정·연애 — 친밀감 발달 과제의 실천'}],
    parent:[{e:'📞',t:'연락은 아이 빈도로\n"왜 연락 안 했어"는 연락을 줄임'},{e:'💰',t:'경제적 자립 단계적\n갑자기 끊지 말고 함께 계획'},{e:'🤲',t:'조언은 물어볼 때만\n묻지 않은 조언은 비판으로 들림'}],
    warn:['<strong>매일 연락 요구·과잉 간섭</strong> — 성인 자녀 독립 발달 저해','취업·결혼 압박 — 부모-자녀 갈등 가장 흔한 원인','"부모가 더 잘 알아" — 자기 효능감 파괴','재정 지원에 조건 붙이기 — 관계를 돈으로 조종'],
    mile:[{ck:'✓',tt:'29세 체크',dc:'자기 결정권 인식, 경제 개념 있음, 스스로 스트레스 관리, 친밀한 관계 1개 이상'}]};

  if(y<=44) return {stg:'성인기 (30~44세)',em:'🌳',qt:'뿌리가 깊어야 바람에 흔들리지 않습니다. 지금 심는 것들이 평생의 기반입니다.',g:['#2A3A10','#5A7A3A'],role:'부모',
    brain:['<strong>전두엽 완전 성숙</strong> — 이성적 판단·공감·자기 조절 능력 성숙','전문화된 뇌 회로 형성 — 경력·기술의 전문성 급성장','장기 기억 용량 최고조','새로운 학습 여전히 가능, 청소년기보다 더 많은 의식적 노력 필요'],
    emo:['<strong>생산성 vs 침체</strong>(에릭슨) — 의미 있는 기여를 하고 있는가','정체성 확립 — "나는 이런 사람이다"의 안정화','첫 번째 큰 실패와 회복 — 회복탄력성 형성의 핵심','직업·관계·부모 역할 동시에 관리하는 복잡한 정서'],
    body:['신체 기능 최고조 → 30대 후반부터 불건강한 생활습관 결과 나타남','<strong>정기 건강검진 필수</strong> — 고혈압·당뇨·고지혈증 조기 발견','수면 부채 누적 주의 — 만성 수면 부족이 인지 기능 저하','스트레스가 신체 증상으로 나타나기 시작 (두통·소화 장애)'],
    play:[{t:'취미 심화',d:'한 가지 취미 깊게 파기 — 마스터리 경험이 자존감과 삶의 의미'},{t:'커뮤니티',d:'관심사 기반 모임 — 직장 외 관계 네트워크 구축'},{t:'운동 루틴',d:'주 3회 이상 규칙적 운동 — 40대 이후 건강의 기반'},{t:'창작',d:'글쓰기·영상·음악 등 — 자기 표현과 감정 처리'}],
    parent:[{e:'👥',t:'어른 대 어른으로\n경험 나누기 (강요 아닌 공유)'},{e:'🏠',t:'자율성 최대 보장\n함께 살아도 각자의 삶 존중'},{e:'💌',t:'존재 자체의 소중함\n"어떻게 살든 사랑한다" 표현'}],
    warn:['<strong>결혼·출산 압박 반복</strong> — 자녀와의 관계를 서서히 파괴','경제 지원 + 통제 결합 — "도와주니까 내 말 들어야지"','성인 자녀 고민을 해결해주려 하기 — 들어주는 것이 해결보다 낫다','형제 비교 — 성인이 되어도 비교는 상처'],
    mile:[{ck:'✓',tt:'44세 체크',dc:'직업적 방향, 재정 어느 정도 안정, 깊은 관계 1~2개, 자기만의 가치관, 스트레스 대처법'}]};

  if(y<=59) return {stg:'중년기 (45~59세)',em:'🍂',qt:'중년은 인생의 정점이자 다음 계절을 준비하는 수확의 시간입니다.',g:['#3A2010','#8A5030'],role:'부모',
    brain:['<strong>결정성 지능 최고조</strong> — 경험 기반 판단·통찰·지혜가 절정','유동성 지능(처리 속도·단기 기억)은 완만히 감소 시작','뇌 자극 유지 중요 — 독서·새 학습·사회 교류가 인지 보호','중년 여성: 에스트로겐 감소 → 기억력 변화 일시적으로 가능 (대부분 회복)'],
    emo:['<strong>중년의 각성</strong> — "지금 삶이 내가 원하던 것인가?" 재점검','성인 자녀 독립 → 빈 둥지 증후군, 또는 새로운 자유감','부모 세대의 노화·돌봄 부담 시작 — 끼인 세대의 스트레스','자기 자신을 재발견하는 시기 — 새 취미·관심사·관계 재구성'],
    body:['<strong>갱년기</strong> — 여성 평균 50~51세 폐경, 남성도 점진적 테스토스테론 감소','근육량 감소 시작 — 근감소증 예방 운동 지금 시작','심혈관 위험 증가 — 혈압·콜레스테롤·혈당 정기 관리','골밀도 감소 — 칼슘·비타민D 보충, 낙상 예방 의식 시작'],
    play:[{t:'새로운 취미',d:'이전에 못 한 것 시작 — 악기·외국어·등산·수영. 뇌 자극과 자아 재발견'},{t:'부부 관계 재정립',d:'자녀 독립 후 둘만의 관계 재구성 — 함께하는 취미·여행'},{t:'건강 투자',d:'근력 운동·유산소 병행 — 갱년기 증상 완화, 골밀도 유지'},{t:'사회 기여',d:'멘토링·봉사·지역 참여 — 생산성과 의미 유지'}],
    parent:[{e:'🔓',t:'자녀 독립 응원\n빈 둥지가 아닌 자유 공간으로'},{e:'💑',t:'부부 관계 재투자\n자녀 중심에서 둘의 관계로'},{e:'🌱',t:'나 자신에게 집중\n"내 인생 2막"을 설계할 시간'}],
    warn:['<strong>갱년기 증상 방치</strong> — 적절한 의학적 관리로 삶의 질 크게 향상','중년 우울 과소평가 — "그냥 나이 드는 것"이 아닌 치료 가능한 상태','자녀 간섭 유지 — 독립한 성인 자녀의 삶에 지속 개입','건강 검진 소홀 — 이 시기가 만성 질환 예방의 마지막 최적기'],
    mile:[{ck:'✓',tt:'59세 체크',dc:'정기 건강검진 수검, 갱년기 관리, 노후 재정 계획, 부부/파트너 관계 점검, 자신만의 취미'}]};

  if(y<=74) return {stg:'노년기 (60~74세)',em:'🌿',qt:'긴 여정을 걸어온 지혜는 가장 값진 유산입니다.',g:['#1A3A5A','#3A6A9A'],role:'가족·보호자',
    brain:['<strong>결정성 지능 여전히 높음</strong> — 경험·지식·언어 능력 유지','처리 속도·이름 기억 다소 느려질 수 있음 — 정상적 노화 범위','<strong>뇌 자극이 인지 보호</strong> — 독서·대화·새 기술·사회 교류가 핵심','경미한 기억력 변화와 치매 조기 신호는 구별 필요 (전문의 상담)'],
    emo:['<strong>자아 통합 vs 절망</strong>(에릭슨) — 살아온 삶을 받아들이고 의미 찾기','상실 경험 증가 — 친구·형제 사별, 신체 기능 저하','정서 조절 능력 최고조 — 부정보다 긍정 감정을 선택하는 경향','현재 중심 삶 — 먼 미래보다 지금 이 순간의 가치'],
    body:['<strong>낙상 예방이 최우선</strong> — 욕실 안전 손잡이·미끄럼 방지·밤 조명 필수','골밀도 감소 — 칼슘·비타민D 보충, 근력 운동 유지','노인 건강검진·예방접종 — 폐렴구균·독감·대상포진 챙기기','약물 상호작용 주의 — 복용 약 늘어날수록 전문의와 정기 점검'],
    play:[{t:'매일 걷기',d:'하루 30분 걷기 + 주 2회 근력 운동 — 낙상 예방·심혈관·인지 기능 보호'},{t:'사회 활동',d:'노인 대학·동호회·종교 모임 — 고립 예방·우울 예방 가장 효과적'},{t:'새로운 배움',d:'스마트폰·외국어·악기 등 — 뇌 자극·성취감'},{t:'봉사·전달',d:'지식·경험 나누기 — 삶의 의미 유지·세대 연결'}],
    fam:[
      {title:'역할 재정립',text:'성인 자녀·손자녀와 새로운 관계 — 돌봄을 받는 것에 열린 마음 갖기'},
      {title:'간섭 내려놓기',text:'자녀 가정의 결정을 신뢰하기 — 다른 방식도 옳을 수 있음을 인정'},
      {title:'감사 표현',text:'가족에게 고마움을 구체적으로 — 관계의 질을 높이는 가장 간단한 방법'},
      {title:'필요한 것 소통',text:'"말 안 해도 알겠지"는 가족을 지치게 함 — 필요한 것 명확히 이야기하기'},
      {title:'자립 유지',text:'가능한 한 독립적 생활 유지 — 자녀 부담 줄이기, 자존감 유지'},
      {title:'재산·의료 계획',text:'가족 갈등 예방 위해 명확한 의사 표현 — 생전에 충분히 이야기하기'}
    ],
    health:[
      {title:'정기 건강검진',text:'혈압·혈당·콜레스테롤·암 검진 빠짐없이 — 조기 발견이 치료 결과를 좌우'},
      {title:'근력 운동',text:'주 2~3회 근력 운동 — 근감소증 예방·낙상 방지·대사 유지'},
      {title:'단백질 섭취',text:'매 끼니 단백질 의식적으로 — 근육 유지·면역력 지원'},
      {title:'사회적 연결',text:'주 2회 이상 사람 만나기 — 고립이 인지 저하·우울의 가장 큰 위험 요인'},
      {title:'수면 관리',text:'7~8시간 규칙적 수면 — 뇌 노폐물 청소·기억 공고화'},
      {title:'금주·절주',text:'이 시기 금연·절주만으로도 심혈관·암 위험 현저히 감소'}
    ],
    warn:['<strong>사회적 고립</strong> — 노년 우울·인지 저하의 가장 큰 단일 위험 요소','낙상 위험 환경 방치 — 욕실·계단·밤 조명 점검 필수','건강 이상 신호 숨기기 — 조기 발견이 치료 가능성 결정','재정 사기 취약 — 전화·문자 금융 사기, 가족과 미리 대화','건강 문제를 "나이 탓"으로만 방치 — 치료 가능한 것들이 많음'],
    mile:[{ck:'✓',tt:'74세 체크',dc:'낙상 예방 환경 점검, 정기 건강검진 수검, 사회 활동 유지, 가족과 정기 소통, 재정·의료 계획 공유'}]};

  return {stg:'후기 노년기 (75세 이상)',em:'🌾',qt:'긴 삶을 걸어온 이가 존재 자체로 가족에게 선물입니다.',g:['#1A1A3A','#4A4A7A'],role:'가족·보호자',
    brain:['<strong>인지 기능 개인차 매우 큼</strong> — 활동적 노인은 훨씬 양호한 기능 유지 가능','치매 조기 신호 — 최근 기억 반복 질문·익숙한 길 잃기·일상 판단 저하 → 전문의 상담','지혜·감정 조절은 여전히 높은 수준 유지 가능','인지 자극 지속 — 독서·대화·퍼즐·노래가 뇌를 보호'],
    emo:['<strong>자아 통합의 완성 또는 도전</strong> — 살아온 삶에 평화를 찾는 과정','배우자·친구 사별 슬픔 — 충분히 애도할 시간과 지지 필요','죽음에 대한 수용 — 회피보다 가족과의 솔직한 대화가 평화로움','소소한 일상의 기쁨 — 큰 이벤트보다 매일의 따뜻함'],
    body:['<strong>다중 만성 질환 관리</strong> — 각 전문의 치료의 통합적 조율 필요','영양 부족 위험 — 식욕 감소·씹기 어려움 → 단백질·비타민 보충 적극적으로','요실금·변비 흔하고 개선 가능 — 숨기지 말고 적극 치료 받기','청력·시력 보조기기 사용 — 감각 저하가 고립·낙상 위험 높임','복용 약물 정기 검토 — 과다 복용·중복 처방 정리'],
    play:[{t:'규칙적 산책',d:'매일 가능한 만큼 걷기 — 심혈관·인지·기분 모두에 가장 좋은 활동'},{t:'대화·음악',d:'가족·친구와 대화, 좋아하는 음악 — 정서 안정·인지 자극'},{t:'손 작업',d:'뜨개질·퍼즐·그림 — 소근육 유지·집중력·성취감'},{t:'회고록·일기',d:'삶을 글로 기록하기 — 자아 통합, 가족에게 남기는 소중한 선물'}],
    fam:[
      {title:'존엄한 돌봄',text:'어르신의 선택권과 자존감 최우선 — 보호자가 일방적으로 결정하지 않기'},
      {title:'일상 참여 존중',text:'가능한 것은 스스로 하도록 기다려 주기 — 의존 강요가 아닌 기다림'},
      {title:'정서적 지지',text:'자주 방문·연락 — "바빠서 못 갔어"가 쌓이면 고립과 우울'},
      {title:'의료 결정 소통',text:'연명치료·임종 준비 — 평온할 때 가족과 미리 대화하기'},
      {title:'사별 슬픔 지지',text:'"힘내세요"보다 "많이 보고 싶으시죠" — 슬픔을 충분히 인정'},
      {title:'보호자 번아웃',text:'주 돌봄자도 반드시 쉬어야 함 — 요양 서비스·가족 분담·지역 자원 적극 활용'}
    ],
    health:[
      {title:'안전한 주거 환경',text:'욕실 손잡이·미끄럼 방지·밤 조명·문턱 제거 — 낙상 한 번이 인생을 바꿀 수 있음'},
      {title:'영양 집중 관리',text:'매 끼니 단백질·채소·과일 의식적으로 — 체중 유지가 면역력의 기반'},
      {title:'보청기·안경 사용',text:'청력·시력 저하 방치 금지 — 감각 보조가 인지 저하 속도를 늦춤'},
      {title:'복약 관리',text:'복용 약물 목록 항상 지참 — 응급 시 빠른 대응, 중복 처방 방지'},
      {title:'정기 방문 진료',text:'3개월마다 단골 주치의 방문 — 이상을 조기에 포착'},
      {title:'마음 건강',text:'우울·불안이 2주 이상 지속되면 정신건강의학과 방문 — 노년 우울은 치료 가능'}
    ],
    warn:['<strong>고립·외로움</strong> — 노년 우울·치매 가속의 가장 큰 요인','낙상 — 이 시기 낙상 후 회복 매우 어려움. 환경 개선이 최우선','가족이 모든 의사 결정 독점 — 어르신의 의견을 충분히 듣고 존중하기','재정·건강 정보 가족과 비공유 — 위기 시 대응 불가','노년 자살률 한국 최고 수준 — 우울 신호를 절대 가볍게 넘기지 않기'],
    mile:[{ck:'✓',tt:'돌봄 체크포인트',dc:'안전한 주거 환경 확인, 정기 의료 방문, 가족 교류 주 1회 이상, 영양 상태 관찰, 복약 관리'}]};
}


/* ── 아코디언 토글 ── */
function toggleAcc(btn) {
  const body = btn.nextElementSibling;
  if (!body) return;
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
}

/* ── HTML 태그 제거 (요약용) ── */
function stripTags(html) {
  return html ? html.replace(/<[^>]+>/g, '') : '';
}

/* ── 아코디언 섹션 빌더 ── */
function accSection(icon, title, sub, bodyHTML, openByDefault) {
  const openClass = openByDefault ? ' open' : '';
  const bodyStyle = openByDefault ? ' open' : '';
  return `<div class="acc-section">
    <button class="acc-header${openClass}" onclick="toggleAcc(this)">
      <span class="acc-h-icon">${icon}</span>
      <span class="acc-h-title">${title}</span>
      ${sub ? `<span class="acc-h-sub">${sub}</span>` : ''}
      <span class="acc-arrow">▾</span>
    </button>
    <div class="acc-body${bodyStyle}">${bodyHTML}</div>
  </div>`;
}

/* ── 결과 렌더링 (2단계 정보 공개) ── */
function render(d,months){
  const y=months/12;
  let numStr,unitStr;
  const isAdult=y>=19;
  const isTeen=y>=13&&y<19;
  const audKnow=isAdult
    ?'<div class="card-audience aud-self">🙋 본인 (성인)</div>'
    :isTeen
    ?'<div class="card-audience aud-child">🧒 청소년 본인</div>'
    :'<div class="card-audience aud-all">👀 모두가 알면 좋아요</div>';
  const audParent=isAdult
    ?'<div class="card-audience aud-self">🙋 본인 (성인)</div>'
    :'<div class="card-audience aud-parent">👨‍👩‍👧 부모·보호자</div>';
  const audCheck=isAdult
    ?'<div class="card-audience aud-self">🙋 본인이 확인해요</div>'
    :'<div class="card-audience aud-parent">👨‍👩‍👧 부모·보호자 체크</div>';
  if(mode==='m'&&months<=36){
    numStr=months===0?'신생아':months;
    unitStr=months===0?'':' 개월';
  } else {
    numStr=Math.floor(y);unitStr='세';
  }
  const isFamily=d.role==='가족·보호자';

  let famHTML='';
  if(isFamily&&d.fam){
    famHTML=`<div class="card full cbg-p" style="animation:none"><h3>🫂 가족·보호자의 역할과 마음가짐</h3><div class="fgrid">${d.fam.map(f=>`<div class="fitem"><div class="ftitle">${f.title}</div><p>${f.text}</p></div>`).join('')}</div></div>`;
  }
  let healthHTML='';
  if(isFamily&&d.health){
    healthHTML=`<div class="card full cbg-sky" style="animation:none"><h3>💪 건강한 신체를 위한 실천 가이드</h3><div class="hgrid">${d.health.map(h=>`<div class="hitem"><div class="htitle">${h.title}</div><p>${h.text}</p></div>`).join('')}</div></div>`;
  }
  let parentHTML='';
  if(!isFamily&&d.parent){
    const audLabel=months/12<=18?'👨‍👩‍👧 부모·보호자':'🙋 본인 (성인)';
    const audClass=months/12<=18?'aud-parent':'aud-self';
    parentHTML=`<div class="card full cbg-s" style="animation:none"><div class="card-audience ${audClass}">${audLabel}</div><h3>👨‍👩‍👧 ${d.role}의 역할과 마음가짐</h3><div class="tgrid">${d.parent.map(p=>`<div class="tip"><span class="te">${p.e}</span><p>${p.t}</p></div>`).join('')}</div></div>`;
  }

  // ── 핵심 요약 (항상 보임) ──
  const sum1 = stripTags(d.brain[0] || '');
  const sum2 = stripTags(d.body[0] || '');
  const sum3 = stripTags(d.emo[0] || '');
  const warnFirst = stripTags(d.warn[0] || '');
  const summaryHTML = `
    <div class="summary-panel">
      <div class="summary-panel-title">✨ 이 시기 핵심 3가지</div>
      <ol class="summary-list">
        <li><span class="sn">1</span><span>🧠 ${sum1}</span></li>
        <li><span class="sn">2</span><span>🌱 ${sum2}</span></li>
        <li><span class="sn">3</span><span>💚 ${sum3}</span></li>
      </ol>
      ${warnFirst ? `<div class="summary-warn">⚠️ 꼭 주의: ${warnFirst}</div>` : ''}
    </div>`;

  // ── 아코디언 섹션들 ──
  const brainBody = `<div class="card" style="animation:none">${audKnow}<h3>🧠 뇌 &amp; 인지 발달</h3><ul>${d.brain.map(i=>`<li>${i}</li>`).join('')}</ul></div>`;
  const emoBody   = `<div class="card" style="animation:none">${audParent}<h3>💚 정서 &amp; 사회성 발달</h3><ul>${d.emo.map(i=>`<li>${i}</li>`).join('')}</ul></div>`;
  const bodyBody  = `<div class="card" style="animation:none">${audParent}<h3>🌱 신체 발달 &amp; 의학 체크</h3><ul>${d.body.map(i=>`<li>${i}</li>`).join('')}</ul></div>`;
  const warnBody  = `<div class="card cbg-a" style="animation:none">${audParent}<h3>⚠️ 이것만은 주의하세요</h3><ul>${d.warn.map(i=>`<li>${i}</li>`).join('')}</ul></div>`;
  const playBody  = `<div class="card full" style="animation:none">${audParent}<h3>🎯 추천 활동 &amp; 실천</h3><div class="plist">${d.play.map(p=>`<div class="pitem"><span class="ptag">${p.t}</span><p>${p.d}</p></div>`).join('')}</div></div>`;
  const parentBody= (parentHTML || famHTML || healthHTML) ? `<div class="grid">${parentHTML}${famHTML}${healthHTML}</div>` : '';
  const checkBody = `<div class="card full cbg-s" style="animation:none">${audCheck}<h3>✅ 체크포인트</h3>${d.mile.map(m=>`<div class="stone"><span class="ck">${m.ck}</span><p><strong>${m.tt}</strong> ${m.dc}</p></div>`).join('')}</div>`;
  const mentalBody= getMentalHTML(months);
  const aloneBody = getAloneHTML(months);
  const firstAid  = getFirstAidHTML(months);

  const accHTML = `<div class="acc-container">
    ${accSection('🧠','뇌 &amp; 인지 발달', d.brain.length+'가지', brainBody, true)}
    ${accSection('💚','정서 &amp; 사회성 발달', d.emo.length+'가지', emoBody, false)}
    ${accSection('🌱','신체 발달 &amp; 의학 체크', d.body.length+'가지', bodyBody, false)}
    ${accSection('⚠️','주의사항', d.warn.length+'가지', warnBody, false)}
    ${accSection('🎯','추천 활동 &amp; 실천', d.play.length+'가지', playBody, false)}
    ${parentBody ? accSection('🫂','역할 &amp; 마음가짐', '', parentBody, false) : ''}
    ${accSection('✅','체크포인트', '', checkBody, false)}
    ${mentalBody ? accSection('🧘','정신건강 &amp; 마음 돌봄', '', mentalBody, false) : ''}
    ${aloneBody  ? accSection('🫶','혼자 자라는 아이에게', '', aloneBody, false) : ''}
    ${firstAid   ? accSection('🩺','응급처치 가이드', '', firstAid, false) : ''}
    ${accSection('📝','메모장', '', getMemoHTML(months), false)}
  </div>`;

  document.getElementById('result').innerHTML =
    `<div class="rhead" style="background:linear-gradient(135deg,${d.g[0]} 0%,${d.g[1]} 100%);margin-bottom:14px;">
      <div><div class="r-age">${numStr}<sub>${unitStr}</sub></div><div class="r-stg">${d.em}&nbsp;${d.stg}</div></div>
      <div class="r-qt">"${d.qt}"</div>
    </div>
    ${summaryHTML}
    ${accHTML}`;
}


/* ── 아빠 가이드 렌더링 ── */
function getDadKey(months) {
  if (months >= 156) return 'teen';
  if (months >= 84)  return 'school';
  if (months >= 48)  return 'preschool';
  if (months >= 12)  return 'toddler';
  return 'infant';
}

function renderDadGuide() {
  const el = document.getElementById('dad-result');
  if (!el) return;
  const months = getMonths ? getMonths() : 0;
  const key = getDadKey(months);
  renderDadContent(key);
  document.querySelectorAll('.guide-tab[data-dad]').forEach(btn => {
    btn.classList.toggle('on', btn.dataset.dad === key);
  });
}

function renderDadContent(key) {
  const d = DAD_DATA[key];
  const el = document.getElementById('dad-result');
  if (!d || !el) return;

  const actionsHTML = d.actions.map(a =>
    `<div class="dad-toolkit-step">
      <span class="dad-toolkit-step-num">${a.icon}</span>
      <div><strong>${a.title}</strong><br><span style="font-size:12.5px;color:var(--ink-m)">${a.text}</span></div>
    </div>`
  ).join('');

  const toolkitsHTML = d.toolkits.map(tk =>
    `<div class="dad-toolkit-block">
      <div class="dad-toolkit-title">⚡ ${tk.title}</div>
      ${tk.steps.map((s,i)=>`<div class="dad-toolkit-step"><span class="dad-toolkit-step-num">${i+1}</span><span>${s}</span></div>`).join('')}
    </div>`
  ).join('');

  el.innerHTML =
    `<div class="summary-panel" style="margin-bottom:16px;">
      <div class="summary-panel-title">👨 아빠 역할 핵심 3가지 — ${d.label} (${d.sub})</div>
      <ol class="summary-list">
        ${d.summary.map((s,i)=>`<li><span class="sn">${i+1}</span><span>${s}</span></li>`).join('')}
      </ol>
      <div class="summary-warn">⚠️ ${d.warn}</div>
    </div>
    <div class="acc-container">
      ${accSection('🎯','실천 액션 4가지','',`<div class="dad-toolkit-block">${actionsHTML}</div>`,true)}
      ${accSection('🧠','아빠 마음 돌봄','',`<div style="font-size:13.5px;color:var(--ink-m);line-height:1.8;padding:14px;background:rgba(232,137,106,.06);border-radius:12px;">${d.mental}</div>`,false)}
      ${toolkitsHTML ? accSection('⚡','지금 급한 상황','',toolkitsHTML,false) : ''}
    </div>`;
}


/* ── 마음 돌봄 페이지 렌더링 ── */
function renderMentalPageContent(key) {
  const d = MENTAL[key];
  const el = document.getElementById('mental-content');
  if (!d || !el) return;

  const hotlineMap = {
    infant:    '1393 (자살예방·산후우울 상담, 무료·24시간) / 1644-6621 (한부모가족지원센터)',
    toddler:   '1393 (정신건강 위기상담, 무료·24시간) / 1577-0199 (정신건강복지센터)',
    preschool: '1393 / Wee센터 (학교 아동상담, 무료) / 아동상담치료센터',
    school:    '1388 (청소년전화) / Wee클래스 (학교 내 무료 상담) / 1393',
    teen:      '1393 (자살예방, 무료·24시간) / 1388 (청소년전화) / 청소년 마음이음 상담센터',
    young:     '1577-0199 (정신건강 위기상담) / 청년 마음건강 바우처 (복지로 검색) / 1393',
    adult:     '1577-0199 / 직장인 EAP(근로자지원프로그램, 회사별 무료 제공) / 정신건강복지센터',
    middle:    '1577-0199 / 정신건강복지센터 (전국, 무료) / 갱년기 클리닉',
    senior:    '1577-0199 / 정신건강복지센터 (무료) / 노인맞춤돌봄서비스 (주민센터)',
  };

  el.innerHTML = `
    <div class="mental-full-card">
      <div class="stat-badge"><span class="sb-num">${d.stat.pct}</span>${d.stat.label} <span style="font-size:10px;opacity:.6;margin-left:4px;">📎</span></div>
      <div class="mental-risk-box">⚠️ ${d.risk}</div>
      <div class="mental-section-label">이상 징후 체크</div>
      <ul>${d.signs.map(s=>`<li>${s}</li>`).join('')}</ul>
      <div class="mental-section-label">마음 훈련 &amp; 대처법</div>
      <ul>${d.tips.map(t=>`<li>${t}</li>`).join('')}</ul>
      <div class="mental-hotline">📞 <strong>전문 도움 연결</strong><br>${hotlineMap[key]||'1393 (무료·24시간)'}<br><span style="font-size:11px;color:var(--ink-l);">※ 전화하면 상담사가 이야기 들어줍니다. 비밀보장·기록 정책은 전화 시 확인해 주세요.</span></div>
    </div>`;
}


/* ── 청소년·청년 페이지 렌더링 ── */
function renderTeenPage(key, btn) {
  // 버튼 활성화
  if (btn) {
    document.querySelectorAll('.teen-age-btn').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
  }

  const d = ALONE_DATA[key];
  const el = document.getElementById('teen-content');
  if (!d || !el) return;

  const toneTitle = key==='child' ? '많이 버텨온 너에게' : key==='teen' ? '혼자 견뎌온 너에게' : '혼자 감당해온 너에게';

  // 위험한 어른 구별법 섹션
  const dangerHTML = d.danger ? `
    <div class="teen-safe-section">
      <div class="teen-safe-title">⚠️ 위험한 어른을 조심해</div>
      <ul>${d.danger.map(item=>`<li>${item.em ? `<strong>${item.t}</strong> — ${item.d}` : item}</li>`).join('')}</ul>
    </div>` : '';

  const itemsHTML = d.items ? d.items.map(item => `
    <div class="teen-content-card">
      <h4>${item.icon||'💬'} ${item.title||item.t||''}</h4>
      ${item.points
        ? `<ul>${item.points.map(p=>`<li>${p}</li>`).join('')}</ul>`
        : `<p style="font-size:13px;color:#8090C0;line-height:1.75;">${item.text||''}</p>`
      }
    </div>`).join('') : '';

  el.innerHTML = `
    <div class="teen-quote">"${d.quote}"</div>
    <div class="teen-stat-badge"><span class="tsn">${d.stat.pct}</span>${d.stat.label}</div>
    ${itemsHTML}`;
}


/* ── 출산·산후 렌더링 ── */
function renderBirth(idx){
  curBirthStage=idx;
  document.querySelectorAll('.birth-tab').forEach((t,i)=>t.classList.toggle('on',i===idx));
  document.querySelectorAll('.birth-stage').forEach((s,i)=>s.classList.toggle('on',i===idx));
}


function initBirth() {
  const tabsEl = document.getElementById('birth-tabs');
  const stagesEl = document.getElementById('birth-stages');
  if(!tabsEl || !stagesEl) return;

  BIRTH_DATA.forEach((stage, i) => {
    // 탭 버튼
    const btn = document.createElement('button');
    btn.className = 'birth-tab' + (i===0?' on':'');
    btn.innerHTML = `${stage.label} <span style="font-size:11px;font-weight:400;opacity:.65;">${stage.sub}</span>`;
    btn.onclick = () => renderBirth(i);
    tabsEl.appendChild(btn);

    // 스테이지 콘텐츠
    const div = document.createElement('div');
    div.className = 'birth-stage' + (i===0?' on':'');
    div.innerHTML = `
      <div class="birth-header">
        <div class="birth-header-inner">
          <div class="birth-alone-badge">🫶 혼자 감당하는 산모를 위한 가이드</div>
          <h2>${stage.label} <span style="font-size:15px;font-weight:400;opacity:.8;">${stage.sub}</span></h2>
          <p>${stage.desc}</p>
        </div>
      </div>
      <div style="background:linear-gradient(135deg,rgba(232,137,106,.08),rgba(212,160,84,.06));border:1px solid rgba(232,137,106,.18);border-radius:13px;padding:13px 18px;margin-bottom:16px;font-size:13px;color:var(--peach-d);line-height:1.7;font-style:italic;">
        💛 ${stage.alone}
      </div>
      <div class="birth-grid">
        <div class="birth-card bc-warm full">
          <h4>🚨 즉시 병원·응급실 가야 하는 상황</h4>
          ${stage.alert.map(a=>`<div class="birth-alert"><span class="birth-alert-icon">⚠️</span><span>${a}</span></div>`).join('')}
        </div>
        <div class="birth-card bc-rose full">
          <h4>🩺 이 시기 신체 회복 & 건강 상식</h4>
          <ul>${stage.body.map(b=>`<li>${b}</li>`).join('')}</ul>
        </div>
        <div class="birth-card bc-lavender full">
          <h4>🧘 마음 건강 & 정신 돌봄</h4>
          <ul>${stage.mental.map(m=>`<li>${m}</li>`).join('')}</ul>
        </div>
        <div class="birth-card bc-mint full">
          <h4>✅ 지금 해야 할 것들</h4>
          ${stage.todo.map(t=>`
            <div class="birth-reality">
              <span class="birth-reality-icon">${t.icon}</span>
              <div class="birth-reality-text">
                <strong>${t.title}</strong>${t.text}
              </div>
            </div>`).join('')}
        </div>
      </div>
      <div style="background:rgba(232,137,106,.06);border-radius:12px;padding:14px 18px;margin-top:4px;font-size:12.5px;color:var(--ink-m);line-height:1.7;">
        📞 <strong>도움이 되는 연락처</strong> — 산후우울증 상담 <strong>1393</strong> / 한부모가족지원센터 <strong>1644-6621</strong> / 보건소 산모·신생아 방문서비스 (지역 보건소) / 복지로 <strong>www.bokjiro.go.kr</strong>
      </div>
    `;
    stagesEl.appendChild(div);
  });
}
