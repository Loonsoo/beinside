# BeInside 인터랙션 패턴 레퍼런스

> 7가지 핵심 인터랙션 패턴의 완전한 HTML+CSS+JS 코드.
> 모든 패턴은 BeInside 디자인 토큰(`--sp-*`, `--ink`, `--peach` 등)을 사용한다.

---

## 1. 감정 선택 그리드

2x3(또는 2x4) 그리드에서 감정을 선택하면 해당 콘텐츠가 표시된다.

### 설명

- 6~8개 감정 버튼을 2열 그리드로 배치
- 선택 시 나머지 버튼은 dim, 선택된 버튼은 색상 강조
- 하단에 감정별 메시지 + 행동 가이드 + 연결 수단 표시

### HTML

```html
<section class="emotion-section" aria-label="감정 선택">
  <h3 class="section-title">지금 어떤 기분이에요?</h3>
  <div class="emotion-grid" role="radiogroup" aria-label="감정 선택">
    <button class="emo-btn" role="radio" aria-checked="false"
            data-emo="angry" onclick="selectEmotion('angry')">
      <span class="emo-emoji">😡</span>
      <span class="emo-label">화가 나요</span>
    </button>
    <button class="emo-btn" role="radio" aria-checked="false"
            data-emo="sad" onclick="selectEmotion('sad')">
      <span class="emo-emoji">😢</span>
      <span class="emo-label">슬퍼요</span>
    </button>
    <button class="emo-btn" role="radio" aria-checked="false"
            data-emo="scared" onclick="selectEmotion('scared')">
      <span class="emo-emoji">😰</span>
      <span class="emo-label">불안해요</span>
    </button>
    <button class="emo-btn" role="radio" aria-checked="false"
            data-emo="lonely" onclick="selectEmotion('lonely')">
      <span class="emo-emoji">🥺</span>
      <span class="emo-label">외로워요</span>
    </button>
    <button class="emo-btn" role="radio" aria-checked="false"
            data-emo="empty" onclick="selectEmotion('empty')">
      <span class="emo-emoji">😶</span>
      <span class="emo-label">모르겠어요</span>
    </button>
    <button class="emo-btn" role="radio" aria-checked="false"
            data-emo="tired" onclick="selectEmotion('tired')">
      <span class="emo-emoji">😞</span>
      <span class="emo-label">지쳤어요</span>
    </button>
  </div>
  <div id="emo-result" class="emo-result" aria-live="polite" style="display:none"></div>
</section>
```

### CSS

```css
.emotion-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--sp-2);
  margin: var(--sp-3) 0;
}
.emo-btn {
  display: flex; flex-direction: column;
  align-items: center; gap: 6px;
  padding: var(--sp-2);
  background: var(--white);
  border: 1.5px solid var(--calm-border);
  border-radius: var(--calm-r);
  cursor: pointer;
  transition: all var(--calm-dur) var(--calm-ease);
  min-height: 72px;
  font: inherit; color: inherit;
  -webkit-appearance: none; appearance: none;
}
.emo-btn:hover {
  border-color: var(--peach);
  box-shadow: var(--calm-shadow-hover);
}
.emo-btn.on {
  border-color: var(--peach);
  background: var(--peach-p);
  transform: scale(1.03);
}
.emo-btn:not(.on).dimmed {
  opacity: 0.45;
}
.emo-emoji { font-size: 28px; }
.emo-label { font-size: 13px; color: var(--ink-m); font-weight: 600; }

.emo-result {
  margin-top: var(--sp-3);
  padding: var(--sp-3);
  background: var(--white);
  border-radius: var(--calm-r);
  border: 1px solid var(--calm-border);
  animation: fadeSlideUp 0.3s var(--calm-ease-out);
}
.emo-result-msg {
  font-size: 17px; font-weight: 700;
  margin-bottom: 6px;
}
.emo-result-action {
  font-size: 14px; color: var(--ink-m);
  line-height: 1.7; margin: 8px 0 12px;
}
.emo-result-link {
  display: block;
  padding: 12px;
  background: var(--peach-p);
  color: var(--peach-d);
  border-radius: 12px;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  min-height: 44px;
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### JS

```js
// 감정 데이터 (기존 프로젝트의 EMO_DATA 패턴)
const EMO_DATA = {
  angry:  { msg: '화가 많이 났구나', color: '#E05A3A',
            sub: '그 화, 충분히 이해해요.',
            action: '잠깐 밖으로 나가거나, 베개에 소리 질러 보세요.' },
  sad:    { msg: '많이 슬프구나', color: '#5A7AC8',
            sub: '울어도 괜찮아요. 슬픔을 꺼내는 게 용감한 거예요.',
            action: '좋아하는 음악 틀어놓고 감정을 꺼내 보세요.' },
  scared: { msg: '불안하고 무섭구나', color: '#7A5AC8',
            sub: '그 느낌, 정말 힘들지요. 약한 게 아니에요.',
            action: '4초 들이쉬고 6초 내쉬기 -- 불안이 조금 가라앉아요.' },
  lonely: { msg: '외롭구나', color: '#C8874A',
            sub: '혼자 감당해왔다는 거, 정말 힘들었을 거예요.',
            action: '지금 1388에 문자 보내 보세요. "힘들어요"라고만 해도 돼요.' },
  empty:  { msg: '뭔지 모르겠구나', color: '#8A8A8A',
            sub: '감정이 뭔지 모를 때도 있어요. 그것도 괜찮아요.',
            action: '눈 감고 1분만 있어 보세요. 몸에 느껴지는 게 있나요?' },
  tired:  { msg: '많이 지쳤구나', color: '#5A9A7A',
            sub: '오래 버텨온 거예요. 지친 게 당연해요.',
            action: '오늘 하루는 아무것도 안 해도 괜찮아요.' },
};

function selectEmotion(key) {
  const d = EMO_DATA[key];
  if (!d) return;

  // 버튼 상태 업데이트
  document.querySelectorAll('.emo-btn').forEach(btn => {
    const isSelected = btn.dataset.emo === key;
    btn.classList.toggle('on', isSelected);
    btn.classList.toggle('dimmed', !isSelected);
    btn.setAttribute('aria-checked', String(isSelected));
  });

  // 결과 표시
  const res = document.getElementById('emo-result');
  res.style.display = 'block';
  res.innerHTML = `
    <div class="emo-result-msg" style="color:${d.color}">${d.msg}</div>
    <div style="font-size:13px;color:var(--ink-m);margin:4px 0 8px">${d.sub}</div>
    <div class="emo-result-action">${d.action}</div>
    <a href="tel:1388" class="emo-result-link">지금 바로 1388에 연락하기</a>`;
  setTimeout(() => res.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
}
```

### 접근성 체크리스트

- [x] `role="radiogroup"` + 개별 `role="radio"` + `aria-checked`
- [x] `aria-live="polite"` on result container
- [x] 키보드 포커스 가능 (`<button>` 요소)
- [x] 터치 타겟 72px 이상 (min-height)
- [x] 색상만으로 선택 상태를 구분하지 않음 (border + scale 변화)

---

## 2. 긍정 체크리스트

"잘하고 있는 것"을 먼저 확인하고, 점수에 따라 긍정 메시지를 표시한다.

### 설명

- 긍정적 문항을 체크하면 카운터가 올라감
- 결과는 항상 긍정적 ("N개나 잘하고 있어요!")
- 위기 질문은 분리하여 별도 처리 (패턴 3 참조)

### HTML

```html
<section class="positive-check" aria-label="자가 점검">
  <h3 class="check-tool-title">지금 잘하고 있는 것들</h3>
  <p class="check-subtitle">해당하는 항목을 눌러 보세요</p>

  <div class="check-items" role="group" aria-label="긍정 체크항목">
    <div class="check-item" role="checkbox" aria-checked="false" tabindex="0">
      <div class="check-box"></div>
      <span>오늘 밥을 먹었어요</span>
    </div>
    <div class="check-item" role="checkbox" aria-checked="false" tabindex="0">
      <div class="check-box"></div>
      <span>누군가와 대화했어요</span>
    </div>
    <div class="check-item" role="checkbox" aria-checked="false" tabindex="0">
      <div class="check-box"></div>
      <span>잠을 조금이라도 잤어요</span>
    </div>
    <div class="check-item" role="checkbox" aria-checked="false" tabindex="0">
      <div class="check-box"></div>
      <span>밖에 나갔어요</span>
    </div>
    <div class="check-item" role="checkbox" aria-checked="false" tabindex="0">
      <div class="check-box"></div>
      <span>이 페이지를 열었어요</span>
    </div>
  </div>

  <div class="check-counter" aria-live="polite">
    <span id="pos-count">0</span>/5 확인
  </div>
  <div id="pos-result" class="pos-result" aria-live="polite" style="display:none"></div>
</section>
```

### CSS

```css
.check-items { display: flex; flex-direction: column; gap: var(--sp-1); }

.check-item {
  display: flex; align-items: center; gap: 12px;
  padding: 14px var(--sp-2);
  background: var(--white);
  border: 1px solid var(--calm-border);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s var(--calm-ease);
  min-height: 48px;
  user-select: none;
}
.check-item:hover { background: var(--peach-p); }
.check-item.checked {
  background: var(--peach-p);
  border-color: var(--peach);
}

.check-box {
  width: 22px; height: 22px; flex-shrink: 0;
  border: 2px solid var(--ink-l);
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 700;
  color: var(--peach-d);
  transition: all 0.2s var(--calm-ease);
}
.check-item.checked .check-box {
  background: var(--peach);
  border-color: var(--peach);
  color: #fff;
}

.check-counter {
  text-align: center;
  margin: var(--sp-2) 0;
  font-size: 14px; color: var(--ink-m);
  font-weight: 600;
}

.pos-result {
  padding: var(--sp-3);
  border-radius: var(--calm-r);
  text-align: center;
  animation: fadeSlideUp 0.3s var(--calm-ease-out);
}
.pos-result.positive {
  background: rgba(107,168,133,.08);
  border: 1px solid rgba(107,168,133,.20);
  color: var(--rust);
}
```

### JS

```js
function initPositiveCheck(container) {
  const items = container.querySelectorAll('.check-item');
  const countEl = container.querySelector('#pos-count');
  const resultEl = container.querySelector('#pos-result');
  const total = items.length;
  let checked = 0;

  items.forEach(item => {
    const toggle = () => {
      const wasChecked = item.classList.contains('checked');
      item.classList.toggle('checked');
      item.setAttribute('aria-checked', String(!wasChecked));
      item.querySelector('.check-box').textContent = wasChecked ? '' : '✓';
      checked += wasChecked ? -1 : 1;
      countEl.textContent = checked;
      updatePositiveResult(checked, total, resultEl);
    };
    item.addEventListener('click', toggle);
    item.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
    });
  });
}

function updatePositiveResult(count, total, resultEl) {
  if (count === 0) { resultEl.style.display = 'none'; return; }
  resultEl.style.display = 'block';
  resultEl.className = 'pos-result positive';

  if (count >= total) {
    resultEl.innerHTML = '<strong>다섯 개나 해내고 있어요!</strong><br>' +
      '<span style="font-size:13px">당신은 지금 충분히 잘하고 있어요.</span>';
  } else if (count >= 3) {
    resultEl.innerHTML = `<strong>${count}개나 잘하고 있어요!</strong><br>` +
      '<span style="font-size:13px">하나하나가 다 대단한 거예요.</span>';
  } else {
    resultEl.innerHTML = `<strong>${count}개 확인했어요</strong><br>` +
      '<span style="font-size:13px">이것만으로도 충분해요. 오늘 여기 온 것 자체가 용기예요.</span>';
  }
}
```

### 접근성 체크리스트

- [x] `role="checkbox"` + `aria-checked` 토글
- [x] `tabindex="0"` + keydown (Space, Enter)
- [x] `aria-live="polite"` on counter & result
- [x] 체크 상태를 시각(색상+체크마크) + 구조(aria) 모두 전달
- [x] 터치 타겟 48px (min-height)

---

## 3. 상황 판단 툴

체크 항목 수에 따라 high/mid/low 결과를 분기하고, 특정 긴급 항목 체크 시 즉시 위기 경로로 연결한다.

### 설명

- `config` 객체로 질문, 결과 분기 기준, 긴급 인덱스를 정의
- 체크 수가 threshold 이상이면 해당 레벨 결과 표시
- `emergencyIndex` 체크 시 결과와 무관하게 즉시 위기 연결
- BeInside 프로젝트의 `renderCheckTool()` 함수가 이 패턴의 실제 구현

### HTML

```html
<div id="burnout-check" class="check-tool-wrap"></div>
```

### CSS

```css
.check-tool {
  padding: var(--sp-3);
  background: var(--white);
  border-radius: var(--calm-r);
  border: 1px solid var(--calm-border);
}
.check-tool-title {
  font-size: 16px; font-weight: 700;
  color: var(--ink); margin-bottom: var(--sp-2);
}

/* check-item 스타일은 패턴 2와 공유 */

.check-result {
  margin-top: var(--sp-2);
  padding: var(--sp-2) var(--sp-3);
  border-radius: 14px;
  font-size: 14px; line-height: 1.7;
  animation: fadeSlideUp 0.3s var(--calm-ease-out);
}
.check-result.high {
  background: var(--emer-bg);
  border: 1px solid var(--emer-border);
  color: var(--result-high-ink);
}
.check-result.mid {
  background: var(--burnout-p);
  border: 1px solid rgba(200,150,50,.20);
  color: var(--result-mid-ink);
}
.check-result.low {
  background: rgba(107,168,133,.08);
  border: 1px solid rgba(107,168,133,.20);
  color: var(--result-low-ink);
}
.check-disclaimer {
  margin-top: var(--sp-1);
  font-size: 11px;
  color: var(--ink-l);
  line-height: 1.6;
}
```

### JS

```js
/**
 * 상황 판단 체크 툴을 주어진 컨테이너에 렌더링합니다.
 * @param {HTMLElement} container - 렌더링 대상 요소
 * @param {Object} config
 *   config.id             -- 고유 ID (string)
 *   config.title          -- 도구 제목 (string)
 *   config.questions      -- 체크 항목 배열 (string[])
 *   config.results        -- { high, mid, low } 각각 { label, threshold, action? }
 *   config.emergencyIndex -- 이 인덱스 체크 시 즉시 긴급 연결 (number, optional)
 *   config.emergencyMsg   -- 긴급 메시지 (string, optional)
 */
function renderCheckTool(container, config) {
  const id = config.id || ('ct_' + Date.now());
  const checked = new Set();

  const wrap = document.createElement('div');
  wrap.className = 'check-tool';
  wrap.innerHTML =
    `<div class="check-tool-title">${esc(config.title)}</div>
     <div id="${id}_items"></div>
     <div id="${id}_result" style="display:none"></div>`;
  container.appendChild(wrap);

  const itemsEl = wrap.querySelector(`#${id}_items`);
  const resultEl = wrap.querySelector(`#${id}_result`);

  config.questions.forEach((q, i) => {
    const item = document.createElement('div');
    item.className = 'check-item';
    item.setAttribute('role', 'checkbox');
    item.setAttribute('aria-checked', 'false');
    item.setAttribute('tabindex', '0');
    item.innerHTML = `<div class="check-box"></div><span>${esc(q)}</span>`;

    const toggle = () => {
      const wasChecked = checked.has(i);
      if (wasChecked) {
        checked.delete(i);
        item.classList.remove('checked');
        item.setAttribute('aria-checked', 'false');
        item.querySelector('.check-box').textContent = '';
      } else {
        checked.add(i);
        item.classList.add('checked');
        item.setAttribute('aria-checked', 'true');
        item.querySelector('.check-box').textContent = '✓';

        // 긴급 질문 즉시 처리
        if (config.emergencyIndex !== undefined && i === config.emergencyIndex) {
          showCheckResult(resultEl, 'high',
            config.emergencyMsg ||
            '지금 바로 <a href="tel:109">109</a>(자살예방상담, 24시간)에 전화해 주세요.',
            true);
          return;
        }
      }
      updateCheckResult(checked.size, config, resultEl);
    };

    item.addEventListener('click', toggle);
    item.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
    });
    itemsEl.appendChild(item);
  });
}

function updateCheckResult(count, config, resultEl) {
  const r = config.results;
  let cls, label, action;
  if (count >= (r.high ? r.high.threshold : 999)) {
    cls = 'high'; label = r.high.label; action = r.high.action || '';
  } else if (count >= (r.mid ? r.mid.threshold : 999)) {
    cls = 'mid'; label = r.mid.label; action = r.mid.action || '';
  } else {
    cls = 'low';
    label = r.low ? r.low.label : '';
    action = r.low ? (r.low.action || '') : '';
  }
  if (count === 0) { resultEl.style.display = 'none'; return; }
  showCheckResult(resultEl, cls,
    `<strong>${esc(label)}</strong>` +
    (action ? `<br><span style="font-weight:400;margin-top:4px;display:block">${action}</span>` : ''),
    false);
}

function showCheckResult(resultEl, cls, html, isEmergency) {
  resultEl.style.display = 'block';
  resultEl.className = 'check-result ' + cls;
  resultEl.innerHTML = html +
    '<div class="check-disclaimer">이 결과는 의학적·심리학적 진단이 아닌 참고용이에요. ' +
    '정확한 진단은 전문가와 상담하세요.</div>';
  setTimeout(() => resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 150);
}
```

### 사용 예시 (config 객체)

```js
renderCheckTool(document.getElementById('burnout-check'), {
  id: 'burnout_ct',
  title: '번아웃 자가 점검',
  questions: [
    '일이 끝나도 머릿속에서 떠나지 않아요',
    '쉬는 날에도 개운하지 않아요',
    '사소한 일에도 짜증이 나요',
    '예전에 좋아하던 것에 흥미가 없어요',
    '"다 그만두고 싶다"는 생각이 들어요',
    '아침에 일어나는 게 너무 힘들어요',
    '죽고 싶다는 생각이 든 적 있어요',
  ],
  results: {
    high: { threshold: 5, label: '많이 지쳐 있는 상태예요',
            action: '전문 상담을 받아 보시는 게 좋겠어요. 정신건강위기상담 1577-0199' },
    mid:  { threshold: 3, label: '번아웃 초기 신호가 보여요',
            action: '지금부터 의식적으로 쉬는 시간을 만들어 보세요.' },
    low:  { threshold: 0, label: '비교적 안정적인 상태예요',
            action: '지금 컨디션을 유지하는 게 중요해요.' },
  },
  emergencyIndex: 6,
  emergencyMsg: '지금 바로 <a href="tel:109" style="color:inherit;font-weight:700">109</a>' +
                '(자살예방상담, 무료 24시간)에 전화해 주세요.'
});
```

### 접근성 체크리스트

- [x] `role="checkbox"` + `aria-checked`
- [x] 키보드 토글 (Space, Enter)
- [x] 긴급 질문 결과에 `tel:` 링크 포함
- [x] 결과 영역에 `scrollIntoView`로 시각적 안내
- [x] 면책 조항 항상 표시

---

## 4. 실행 체크리스트

행동 가이드 항목을 체크하면 완료 카운터가 올라간다.

### 설명

- 실질적 행동 가이드 (예: "보건소에 전화하기")를 체크하는 실행형
- 체크 시 줄긋기(line-through) + 원형 체크 + 카운터 "3/5 완료"
- 모든 항목 완료 시 축하 메시지

### HTML

```html
<section class="action-checklist" aria-label="실행 체크리스트">
  <h4 class="action-title">지금 할 수 있는 것들</h4>
  <div class="action-counter" aria-live="polite">
    <span id="action-done">0</span>/<span id="action-total">5</span> 완료
  </div>

  <div class="action-items">
    <button class="action-item" onclick="toggleAction(this)">
      <span class="action-check"></span>
      <span class="action-text">가까운 보건소에 전화하기</span>
    </button>
    <button class="action-item" onclick="toggleAction(this)">
      <span class="action-check"></span>
      <span class="action-text">건강보험공단 <a href="tel:15771000">1577-1000</a> 전화</span>
    </button>
    <button class="action-item" onclick="toggleAction(this)">
      <span class="action-check"></span>
      <span class="action-text">필요한 서류 목록 확인</span>
    </button>
    <button class="action-item" onclick="toggleAction(this)">
      <span class="action-check"></span>
      <span class="action-text">신청서 작성하기</span>
    </button>
    <button class="action-item" onclick="toggleAction(this)">
      <span class="action-check"></span>
      <span class="action-text">방문 일정 잡기</span>
    </button>
  </div>

  <div id="action-complete" class="action-complete" style="display:none" aria-live="polite">
    모두 완료했어요! 정말 잘했어요.
  </div>
</section>
```

### CSS

```css
.action-checklist {
  padding: var(--sp-3);
  background: var(--white);
  border-radius: var(--calm-r);
  border: 1px solid var(--calm-border);
}
.action-title {
  font-size: 16px; font-weight: 700;
  color: var(--ink); margin-bottom: 4px;
}
.action-counter {
  font-size: 13px; color: var(--ink-m);
  margin-bottom: var(--sp-2);
}
.action-items { display: flex; flex-direction: column; gap: var(--sp-1); }

.action-item {
  display: flex; align-items: center; gap: 12px;
  padding: 12px var(--sp-2);
  background: var(--calm-bg-elevated);
  border: 1px solid var(--calm-border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s var(--calm-ease);
  text-align: left;
  font: inherit; color: inherit;
  min-height: 48px;
  -webkit-appearance: none; appearance: none;
}
.action-item:hover { background: var(--peach-p); }
.action-item.done {
  opacity: 0.6;
  background: rgba(107,168,133,.06);
}
.action-item.done .action-text {
  text-decoration: line-through;
  color: var(--ink-l);
}
.action-check {
  width: 22px; height: 22px; flex-shrink: 0;
  border: 2px solid var(--ink-l);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; color: var(--amber);
  transition: all 0.2s;
}
.action-item.done .action-check {
  background: var(--amber);
  border-color: var(--amber);
  color: #fff;
}

.action-complete {
  margin-top: var(--sp-2);
  padding: var(--sp-2);
  text-align: center;
  background: rgba(107,168,133,.08);
  border-radius: 12px;
  color: var(--rust);
  font-weight: 600;
  animation: fadeSlideUp 0.3s var(--calm-ease-out);
}
```

### JS

```js
function toggleAction(el) {
  el.classList.toggle('done');
  // 마이크로 인터랙션
  el.style.transform = 'scale(1.02)';
  setTimeout(() => { el.style.transform = ''; }, 150);

  const check = el.querySelector('.action-check');
  if (check) check.textContent = el.classList.contains('done') ? '✓' : '';

  // 카운터 업데이트
  const container = el.closest('.action-checklist');
  const total = container.querySelectorAll('.action-item').length;
  const done = container.querySelectorAll('.action-item.done').length;
  container.querySelector('#action-done').textContent = done;
  container.querySelector('#action-total').textContent = total;

  // 완료 메시지
  const completeEl = container.querySelector('#action-complete');
  completeEl.style.display = done === total ? 'block' : 'none';
}
```

### 접근성 체크리스트

- [x] `<button>` 요소 사용 (네이티브 키보드 접근)
- [x] `aria-live="polite"` on counter & complete message
- [x] 완료 상태를 시각(줄긋기+체크) + 구조(class) 모두 전달
- [x] 터치 타겟 48px (min-height)
- [x] 마이크로 인터랙션 (scale) 피드백 제공

---

## 5. 아코디언

같은 그룹 내에서 하나만 열리는 아코디언 패턴.

### 설명

- `.accordion-group` 안에서 하나만 open 가능 (exclusive)
- `max-height` 애니메이션으로 부드러운 열림/닫힘
- `aria-expanded` + `aria-controls` 완전 지원
- 이 구현은 프로젝트의 `toggleAccordion()` 함수와 동일

### HTML

```html
<div class="accordion-group" role="presentation">
  <div class="accordion-item">
    <div class="accordion-header"
         role="button" tabindex="0"
         aria-expanded="false"
         aria-controls="acc-body-1"
         onclick="toggleAccordion(this)">
      <span>첫 번째 항목</span>
      <span class="accordion-arrow">▼</span>
    </div>
    <div class="accordion-body" id="acc-body-1" role="region">
      <div class="accordion-body-inner">
        <p>내용이 여기에 들어갑니다.</p>
      </div>
    </div>
  </div>

  <div class="accordion-item">
    <div class="accordion-header"
         role="button" tabindex="0"
         aria-expanded="false"
         aria-controls="acc-body-2"
         onclick="toggleAccordion(this)">
      <span>두 번째 항목</span>
      <span class="accordion-arrow">▼</span>
    </div>
    <div class="accordion-body" id="acc-body-2" role="region">
      <div class="accordion-body-inner">
        <p>내용이 여기에 들어갑니다.</p>
      </div>
    </div>
  </div>
</div>
```

### CSS

```css
.accordion-group { display: flex; flex-direction: column; gap: var(--sp-1); }

.accordion-item {
  border: 1px solid var(--calm-border);
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.2s;
}
.accordion-item.open {
  border-color: var(--peach);
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px var(--sp-2);
  background: var(--white);
  cursor: pointer;
  font-size: 15px; font-weight: 600;
  color: var(--ink);
  min-height: 48px;
  transition: background 0.2s;
}
.accordion-header:hover {
  background: var(--peach-p);
}

.accordion-arrow {
  font-size: 12px; color: var(--ink-l);
  transition: transform 0.3s var(--calm-ease);
}
.accordion-item.open .accordion-arrow {
  transform: rotate(180deg);
}

.accordion-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s var(--calm-ease);
}
.accordion-body-inner {
  padding: 0 var(--sp-2) var(--sp-2);
  font-size: 14px;
  color: var(--ink-m);
  line-height: 1.75;
}

/* 다크 모드 */
[data-theme="dark"] .accordion-item {
  border-color: rgba(255,255,255,.08);
}
[data-theme="dark"] .accordion-header {
  background: var(--white);
  color: var(--ink);
}
[data-theme="dark"] .accordion-header:hover {
  background: rgba(123,174,203,.06);
}
```

### JS

```js
function toggleAccordion(el) {
  const item = el.closest('.accordion-item');
  if (!item) return;
  const header = item.querySelector('.accordion-header');
  const body = item.querySelector('.accordion-body');
  const isOpen = item.classList.contains('open');

  // 같은 그룹 내 모두 닫기
  const group = item.closest('.accordion-group');
  if (group) {
    group.querySelectorAll('.accordion-item.open').forEach(i => {
      i.classList.remove('open');
      const h = i.querySelector('.accordion-header');
      if (h) h.setAttribute('aria-expanded', 'false');
      const b = i.querySelector('.accordion-body');
      if (b) b.style.maxHeight = '0';
    });
  }

  // 열기
  if (!isOpen) {
    item.classList.add('open');
    if (header) header.setAttribute('aria-expanded', 'true');
    const inner = body.querySelector('.accordion-body-inner');
    body.style.maxHeight = (inner ? inner.scrollHeight + 32 : 400) + 'px';
    setTimeout(() => {
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 200);
  }
}

// 키보드 지원 (전역 이벤트)
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    const el = e.target;
    if (el.classList && el.classList.contains('accordion-header')) {
      e.preventDefault();
      toggleAccordion(el);
    }
  }
});
```

### 접근성 체크리스트

- [x] `role="button"` + `tabindex="0"` on header
- [x] `aria-expanded` 토글 (true/false)
- [x] `aria-controls` -> body `id` 연결
- [x] `role="region"` on body
- [x] 키보드 지원 (Enter, Space)
- [x] 스크롤 포지셔닝 (열리면 해당 항목으로 부드럽게 스크롤)

---

## 6. 탭 전환

탭 바에서 콘텐츠 패널을 전환한다.

### 설명

- 탭 버튼에 `.on` 클래스로 활성 표시
- 연결된 패널만 `display: block`, 나머지 `display: none`
- `role="tablist"` + `role="tab"` + `role="tabpanel"` ARIA 패턴
- 이 구현은 프로젝트의 `switchGuideTab()` 패턴을 확장한 것

### HTML

```html
<div class="guide-tab-bar" role="tablist" aria-label="가이드 탭">
  <button class="guide-tab on" role="tab"
          id="tab-child"
          aria-selected="true"
          aria-controls="panel-child"
          data-tab="child"
          onclick="switchTab(this)">
    아이 가이드
  </button>
  <button class="guide-tab" role="tab"
          id="tab-dad"
          aria-selected="false"
          aria-controls="panel-dad"
          data-tab="dad"
          tabindex="-1"
          onclick="switchTab(this)">
    아빠 가이드
  </button>
</div>

<div id="panel-child" role="tabpanel" aria-labelledby="tab-child">
  <!-- 아이 가이드 콘텐츠 -->
</div>
<div id="panel-dad" role="tabpanel" aria-labelledby="tab-dad" style="display:none">
  <!-- 아빠 가이드 콘텐츠 -->
</div>
```

### CSS

```css
.guide-tab-bar {
  display: flex; gap: 4px;
  padding: 4px;
  background: var(--warm);
  border-radius: 14px;
  margin-bottom: var(--sp-3);
  border-bottom: 1px solid var(--calm-border);
}

.guide-tab {
  flex: 1;
  padding: 10px var(--sp-2);
  border: none;
  background: none;
  border-radius: 10px;
  font-size: 14px; font-weight: 600;
  color: var(--ink-m);
  cursor: pointer;
  transition: all 0.25s var(--calm-ease);
  min-height: 44px;
  font: inherit;
  -webkit-appearance: none; appearance: none;
}
.guide-tab:hover {
  color: var(--ink);
  background: rgba(255,255,255,.5);
}
.guide-tab.on {
  background: var(--white);
  color: var(--peach-d);
  box-shadow: 0 1px 4px rgba(0,0,0,.06);
}

/* 다크 모드 */
[data-theme="dark"] .guide-tab-bar {
  background: var(--calm-bg-surface);
  border-bottom-color: rgba(255,255,255,.08);
}
[data-theme="dark"] .guide-tab.on {
  background: var(--peach-p);
  color: var(--peach-d);
}
```

### JS

```js
function switchTab(btn) {
  const tabBar = btn.closest('.guide-tab-bar');
  const tab = btn.dataset.tab;

  // 탭 버튼 상태 업데이트
  tabBar.querySelectorAll('.guide-tab').forEach(t => {
    const isActive = t.dataset.tab === tab;
    t.classList.toggle('on', isActive);
    t.setAttribute('aria-selected', String(isActive));
    t.setAttribute('tabindex', isActive ? '0' : '-1');
  });

  // 패널 전환
  tabBar.querySelectorAll('.guide-tab').forEach(t => {
    const panelId = t.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    if (panel) panel.style.display = t.dataset.tab === tab ? '' : 'none';
  });
}

// 키보드 화살표 내비게이션 (WAI-ARIA Tabs Pattern)
document.addEventListener('keydown', function(e) {
  const tab = e.target;
  if (!tab.classList || !tab.classList.contains('guide-tab')) return;
  if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

  e.preventDefault();
  const tabs = Array.from(tab.closest('.guide-tab-bar').querySelectorAll('.guide-tab'));
  const idx = tabs.indexOf(tab);
  let next;
  if (e.key === 'ArrowRight') next = tabs[(idx + 1) % tabs.length];
  if (e.key === 'ArrowLeft')  next = tabs[(idx - 1 + tabs.length) % tabs.length];
  if (next) { next.focus(); switchTab(next); }
});
```

### 접근성 체크리스트

- [x] `role="tablist"` + `role="tab"` + `role="tabpanel"`
- [x] `aria-selected` 토글
- [x] `aria-controls` -> panel `id` 연결
- [x] `aria-labelledby` on panel -> tab `id` 연결
- [x] 화살표 키보드 내비게이션 (좌/우)
- [x] `tabindex` 로빙 (-1 비활성, 0 활성)
- [x] 터치 타겟 44px (min-height)

---

## 7. 글씨 크기 조절 (Dynamic Type)

`--text-scale` CSS 변수 + localStorage로 사용자 설정을 유지한다.

### 설명

- 3단계 크기 조절 (기본/크게/아주 크게)
- `--text-scale` 변수만 변경하면 `clamp()`가 자동 적용
- localStorage에 저장하여 재방문 시 복원
- 위기 페이지는 별도 기본값(17px)으로 더 큰 시작점
- 청소년 페이지에서는 localStorage 사용 금지

### HTML

```html
<div class="text-scale-control" role="group" aria-label="글씨 크기 조절">
  <button class="ts-btn on" onclick="setTextScale(0)" aria-label="기본 크기"
          aria-pressed="true">
    <span style="font-size:14px">가</span>
  </button>
  <button class="ts-btn" onclick="setTextScale(1)" aria-label="크게"
          aria-pressed="false">
    <span style="font-size:18px">가</span>
  </button>
  <button class="ts-btn" onclick="setTextScale(2)" aria-label="아주 크게"
          aria-pressed="false">
    <span style="font-size:22px">가</span>
  </button>
</div>
```

### CSS

```css
:root {
  --text-scale: 0;
}
body {
  font-size: clamp(15px, calc(15px + var(--text-scale) * 2px), 21px);
  line-height: 1.75;
}
.crisis-page {
  font-size: clamp(17px, calc(17px + var(--text-scale) * 2px), 23px);
  line-height: 1.85;
}

.text-scale-control {
  display: flex; gap: 4px;
  align-items: center;
}
.ts-btn {
  width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  border: 1.5px solid var(--calm-border);
  border-radius: 10px;
  background: var(--white);
  cursor: pointer;
  color: var(--ink-m);
  transition: all 0.2s var(--calm-ease);
  font: inherit;
  -webkit-appearance: none; appearance: none;
}
.ts-btn:hover {
  border-color: var(--peach);
  color: var(--ink);
}
.ts-btn.on {
  border-color: var(--peach);
  background: var(--peach-p);
  color: var(--peach-d);
}
```

### JS

```js
function setTextScale(level) {
  // CSS 변수 업데이트
  document.documentElement.style.setProperty('--text-scale', level);

  // 버튼 상태 업데이트
  document.querySelectorAll('.ts-btn').forEach((btn, i) => {
    const isActive = i === level;
    btn.classList.toggle('on', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });

  // localStorage 저장 (청소년 페이지에서는 저장하지 않음)
  if (typeof curPage === 'undefined' || curPage !== 'teen') {
    try { localStorage.setItem('beinside_text_scale', level); } catch(e) {}
  }
}

// 페이지 로드 시 복원
function restoreTextScale() {
  try {
    const saved = localStorage.getItem('beinside_text_scale');
    if (saved !== null) setTextScale(parseInt(saved, 10));
  } catch(e) {}
}

// DOMContentLoaded에서 호출
document.addEventListener('DOMContentLoaded', restoreTextScale);
```

### 접근성 체크리스트

- [x] `role="group"` + `aria-label="글씨 크기 조절"`
- [x] 각 버튼에 `aria-pressed` 토글
- [x] 각 버튼에 `aria-label` (기본 크기/크게/아주 크게)
- [x] 터치 타겟 44px (min-width, min-height)
- [x] 청소년 페이지에서는 localStorage 미사용
- [x] 위기 페이지 기본 글씨 크기 17px (인지 저하 대응)
