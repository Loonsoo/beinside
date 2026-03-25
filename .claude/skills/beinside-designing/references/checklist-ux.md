# 체크리스트/평가 도구 UX 가이드

> BeInside의 자가 점검, 상황 판단 도구를 설계할 때 따르는 UX 원칙과 구현 패턴.
> 핵심 철학: **"문제를 찾아내는 도구가 아니라, 잘하고 있는 것을 확인하는 도구"**

---

## 1. 긍정-먼저 패턴 상세

### 왜 긍정이 먼저여야 하는가

위기 상황의 사용자가 "자가 진단" 도구를 만나면:

**기존 패턴 (문제 중심) -- 이렇게 하지 않는다:**
```
"다음 중 해당하는 항목을 체크하세요"
[ ] 잠을 못 자고 있다
[ ] 식욕이 없다
[ ] 의욕이 없다
[ ] 죽고 싶은 생각이 든다
```

이 패턴의 문제:
1. **자기 확인 편향** -- "나는 이렇게 안 좋구나" 확인 과정이 됨
2. **조기 이탈** -- 3번째 항목쯤에서 "나는 심각하다" -> 페이지 닫음
3. **낙인 효과** -- 높은 점수 = "나는 문제가 있다"는 느낌
4. **행동 마비** -- 결과가 "위험 수준"이면 오히려 도움 요청을 회피

**BeInside 패턴 (긍정 먼저):**
```
"지금 잘하고 있는 것들을 확인해 보세요"
[ ] 오늘 밥을 먹었어요
[ ] 누군가와 대화했어요
[ ] 잠을 조금이라도 잤어요
[ ] 밖에 나갔어요
[ ] 이 페이지를 열었어요
```

이 패턴의 효과:
1. **자기 효능감 강화** -- "나는 이것들을 하고 있구나"
2. **체류 유도** -- 체크할수록 기분이 나아짐 -> 더 사용
3. **행동 촉진** -- "이미 잘하고 있으니, 한 가지만 더 해볼까"
4. **마지막 항목 전략** -- "이 페이지를 열었어요"는 항상 체크 가능

### 결과 메시지 톤

```javascript
// 결과는 항상 긍정적
if (count >= total) {
  msg = '다섯 개나 해내고 있어요!';
  sub = '당신은 지금 충분히 잘하고 있어요.';
} else if (count >= 3) {
  msg = count + '개나 잘하고 있어요!';
  sub = '하나하나가 다 대단한 거예요.';
} else if (count >= 1) {
  msg = count + '개 확인했어요';
  sub = '이것만으로도 충분해요. 오늘 여기 온 것 자체가 용기예요.';
}

// "~밖에 못 했어요" 같은 부정 표현 절대 금지
// "0개 체크" 시에는 결과를 표시하지 않음 (압박하지 않음)
```

### 긍정 항목 설계 규칙

| 규칙 | 이유 | 예시 |
|------|------|------|
| 모든 사람이 1개는 체크할 수 있어야 함 | 0개 = 좌절감 | "이 페이지를 열었어요" |
| 일상적 행동으로 구성 | 특별한 노력 불필요 | "밥을 먹었어요" (운동했어요 X) |
| 과거형 사용 | "해야 할 것" 압박 방지 | "잤어요" (자야 해요 X) |
| 5~7개 항목 | 너무 많으면 피로 | 5개 권장, 최대 7개 |
| 마지막 항목 = 확실히 체크 가능한 것 | 성취감 보장 | "여기 온 것 자체가 용기예요" |

### 페이지별 긍정 체크 데이터 예시

```javascript
var POSITIVE_CHECK_DATA = {
  growth_0_3: {
    title: '우리 아이, 이렇게 하고 있다면 잘하고 있는 거예요',
    items: [
      '아이와 매일 눈을 맞추며 이야기해요',
      '아이가 울면 안아주거나 달래줘요',
      '규칙적인 수유/식사 시간을 지키고 있어요',
      '아이의 웃음에 같이 웃어줘요',
      '예방접종 일정을 챙기고 있어요'
    ],
    results: {
      great: { min: 5, msg: '5가지 모두 하고 계시네요! 정말 잘하고 있어요.' },
      good:  { min: 3, msg: '잘하고 있어요! 체크 안 된 부분도 한번 살펴볼까요?' },
      encourage: { msg: '괜찮아요. 모든 부모가 처음이에요. 하나씩 해보면 돼요.' }
    }
  },
  burnout: {
    title: '나를 돌보고 있는지 확인해 볼까요?',
    items: [
      '하루에 물을 4잔 이상 마셔요',
      '일주일에 3번 이상 30분 걸어요',
      '잠자리에 드는 시간이 일정해요',
      '나만의 쉬는 시간이 있어요',
      '고민을 나눌 사람이 있어요'
    ],
    results: {
      great: { min: 5, msg: '셀프케어를 정말 잘 하고 있어요!' },
      good:  { min: 3, msg: '기본적인 돌봄은 하고 있어요. 체크 안 된 부분을 살펴볼까요?' },
      encourage: { msg: '지금은 여유가 없을 수 있어요. 가장 쉬운 것 하나만 먼저 해볼까요?' }
    }
  }
};
```

---

## 2. 상황 판단 툴 전체 흐름

### config 객체 구조

```javascript
var checkToolConfig = {
  // 필수
  id: 'burnout_ct',               // 고유 ID (DOM id에 사용)
  title: '번아웃 자가 점검',        // 제목
  questions: [                     // 체크 항목 (string[])
    '일이 끝나도 머릿속에서 떠나지 않아요',
    '쉬는 날에도 개운하지 않아요',
    '사소한 일에도 짜증이 나요',
    '예전에 좋아하던 것에 흥미가 없어요',
    '"다 그만두고 싶다"는 생각이 들어요',
    '아침에 일어나는 게 너무 힘들어요',
    '죽고 싶다는 생각이 든 적 있어요',  // emergencyIndex = 6
  ],
  results: {
    high: {
      threshold: 5,                // 5개 이상 체크 시
      label: '많이 지쳐 있는 상태예요',
      action: '전문 상담을 받아 보시는 게 좋겠어요.',
    },
    mid: {
      threshold: 3,                // 3~4개 체크 시
      label: '번아웃 초기 신호가 보여요',
      action: '의식적으로 쉬는 시간을 만들어 보세요.',
    },
    low: {
      threshold: 0,                // 1~2개 체크 시
      label: '비교적 안정적인 상태예요',
      action: '지금 컨디션을 유지하는 게 중요해요.',
    },
  },

  // 선택
  emergencyIndex: 6,               // 이 인덱스 체크 시 즉시 위기 경로
  emergencyMsg: '지금 바로 <a href="tel:109">109</a>(자살예방상담, 24시간)에 전화해 주세요.',
};
```

### 렌더링 흐름도

```
1. renderCheckTool(container, config) 호출
   |-- wrap 요소 생성 (.check-tool)
   |-- 제목 렌더링 (.check-tool-title)
   |-- 각 질문에 대해 check-item 생성
   |   |-- role="checkbox", aria-checked="false", tabindex="0"
   |   |-- click 이벤트 -> toggle()
   |   +-- keydown(Space/Enter) -> toggle()
   +-- 결과 영역 생성 (#id_result, display:none)

2. 사용자가 항목 클릭
   |-- checked Set에 추가/제거
   |-- DOM 업데이트 (class, aria-checked, 체크마크)
   |-- emergencyIndex 체크?
   |   |-- YES -> showCheckResult('high', emergencyMsg, true) -> 끝
   |   +-- NO  -> updateCheckResult(count, config, resultEl)
   +-- updateCheckResult()
       |-- count >= high.threshold -> 'high'
       |-- count >= mid.threshold  -> 'mid'
       |-- count >= low.threshold  -> 'low'
       +-- count === 0 -> 결과 숨김

3. showCheckResult(resultEl, cls, html, isEmergency)
   |-- 결과 표시 (display:block)
   |-- 클래스 적용 (.check-result.high/mid/low)
   |-- HTML 삽입 (라벨 + 행동 가이드)
   |-- 면책 조항 자동 추가
   +-- scrollIntoView (150ms 후)
```

### 결과 분기 기준 설계

| 수준 | 색상 토큰 | 메시지 톤 | 행동 유도 |
|------|-----------|-----------|-----------|
| `high` | `--result-high` / `--emer-bg` | 공감 + 전문 연결 | "전문 상담을 받아 보시는 게 좋겠어요" + `tel:` 링크 |
| `mid` | `--result-mid` / `--burnout-p` | 인정 + 자기 돌봄 | "~해 보세요" 형태의 부드러운 권유 |
| `low` | `--result-low` / 녹색 배경 | 격려 + 유지 | "잘하고 있어요. 지금 컨디션을 유지해 보세요" |

### 절대 하지 않을 것

- "위험합니다" / "심각합니다" 같은 경고성 라벨
- 점수를 숫자로 표시 ("7점/10점")
- 질환명 언급 ("우울증이 의심됩니다")
- 의학적 진단처럼 보이는 표현

### 반드시 할 것

- 모든 결과에 면책 조항: "이 결과는 의학적/심리학적 진단이 아닌 참고용이에요."
- `high` 결과에는 반드시 `tel:` 링크 포함
- 결과 영역 `scrollIntoView` (사용자가 스크롤 안 해도 보임)

### 결과 CSS (다크모드 포함)

```css
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

---

## 3. 긴급 질문 처리

### emergencyIndex 패턴

상황 판단 툴에서 특정 항목은 체크 즉시 위기 경로로 연결해야 한다.

```javascript
// 긴급 질문 예시:
// "죽고 싶다는 생각이 든 적 있어요"
// "자해를 한 적이 있어요"
// "누군가에게 폭력을 당하고 있어요"

// config에서 설정
{
  emergencyIndex: 6,     // questions[6]이 긴급 질문
  emergencyMsg: '지금 많이 힘드시죠. 혼자 견디지 않아도 돼요.<br>' +
    '<a href="tel:109" style="color:inherit;font-weight:700;font-size:18px;">' +
    '109 자살예방상담전화</a><br>' +
    '<span style="font-size:13px">24시간, 무료. 상담사가 이야기 들어줘요.</span>'
}
```

### 처리 흐름

```
사용자가 긴급 질문 체크
  |
  v
다른 모든 체크 결과 무시
  |
  v
즉시 'high' 결과 표시
  |
  v
전화 연결 링크 (tel:) 포함
  |
  v
면책 조항 포함
  |
  v
scrollIntoView
```

### 구현 코드

```javascript
const toggle = () => {
  // ... (일반 토글 로직)

  if (config.emergencyIndex !== undefined && i === config.emergencyIndex) {
    // 다른 체크 상태와 무관하게 즉시 위기 결과 표시
    showCheckResult(resultEl, 'high',
      config.emergencyMsg || '지금 바로 <a href="tel:109">109</a>에 전화해 주세요.',
      true);
    return;  // updateCheckResult 호출하지 않음
  }

  updateCheckResult(checked.size, config, resultEl);
};
```

### 복수 긴급 질문

```javascript
// emergencyIndex를 배열로 확장
{
  emergencyIndexes: [5, 6],
  emergencyMsg: '...'
}

// 체크 시
var isEmergency = false;
if (config.emergencyIndexes) {
  isEmergency = config.emergencyIndexes.some(idx => checked.has(idx));
} else if (config.emergencyIndex !== undefined) {
  isEmergency = checked.has(config.emergencyIndex);
}
if (isEmergency) {
  showCheckResult(resultEl, 'high', config.emergencyMsg, true);
  return;
}
```

### 긴급 질문 UX 원칙

| 원칙 | 상세 |
|------|------|
| 즉시 반응 | 다른 항목 체크 수와 무관하게 바로 결과 표시 |
| 전화 우선 | 결과에 반드시 `tel:` 링크 포함 |
| 부드러운 톤 | "위험합니다" 대신 "전화해 주세요" |
| 해제 가능 | 체크 해제하면 원래 결과로 복귀 (판단하지 않음) |
| 면책 표시 | "의학적 진단이 아닌 참고용" 반드시 포함 |
| 공감 먼저 | "지금 많이 힘드시죠" 후 전화번호 |

---

## 4. 진행률 표시

### "N/M 항목 확인" 카운터

```html
<div class="check-counter" aria-live="polite">
  <span id="check-done">0</span>/<span id="check-total">5</span> 항목 확인
</div>
```

```css
.check-counter {
  text-align: center;
  margin: var(--sp-2) 0;
  font-size: 14px;
  color: var(--ink-m);
  font-weight: 600;
  min-height: 20px;        /* 레이아웃 시프트 방지 */
}
```

```javascript
function updateCounter(container) {
  var total = container.querySelectorAll('.check-item').length;
  var done = container.querySelectorAll('.check-item.checked').length;
  var doneEl = container.querySelector('#check-done');
  var totalEl = container.querySelector('#check-total');
  if (doneEl) doneEl.textContent = done;
  if (totalEl) totalEl.textContent = total;
}
```

### 카운터 표현 방식 차이

| 도구 유형 | 카운터 텍스트 | 이유 |
|-----------|---------------|------|
| 상황 판단 | "N/M 항목 확인" | 점검 느낌 |
| 실행 체크리스트 | "N/M 완료" | 달성 느낌 |
| 긍정 체크리스트 | "N/M 확인" | 인정 느낌 |

### 진행률 표시 원칙

| 원칙 | 이유 |
|------|------|
| "N/M 항목 확인" 형태 사용 | "N점" 형태는 진단 느낌을 줌 |
| 프로그레스 바 사용 최소화 | 100% 채워야 한다는 압박감 (8개 이상에서만) |
| "완료" 대신 "확인" 사용 | 완료해야 한다는 의무감 방지 |
| 0일 때 빈 상태 유지 | 카운터 영역은 보이되 텍스트는 비움 |
| `aria-live="polite"` 필수 | 스크린리더에 변경 알림 |

### 전체 완료 시

```javascript
if (done === total) {
  completeEl.style.display = 'block';
  completeEl.innerHTML = '모두 완료했어요! 정말 잘했어요.';
}
// 다시 체크 해제하면 메시지 사라짐 (압박하지 않음)
```

### 결과 전환 애니메이션

```css
.check-result,
.pos-result {
  animation: fadeSlideUp 0.3s var(--calm-ease-out);
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## 페이지 구성 순서 권장

새 가이드 페이지를 만들 때 이 순서를 따른다:

```
1. 히어로 / 공감 문장
   "지금 힘들 수 있어요. 괜찮아요."

2. [긍정 체크리스트]           -- 인터랙티브 #1
   "잘하고 있는지 확인해 볼까요?"

3. 핵심 가이드 카드들 (아코디언)  -- 인터랙티브 #2
   정보 콘텐츠. 접힌 상태로 시작.

4. [상황 판단 도구]             -- 인터랙티브 #3 (선택적)
   "나의 상태를 확인해 볼까요?"

5. [행동 체크리스트]            -- 인터랙티브 #4 (선택적)
   "오늘 해볼 수 있는 것들"

6. 도움 연결
   전화번호 (tel: 링크), 기관 목록

7. 면책 조항
   의학적 진단 아님 고지
```

### 인터랙티브 요소 최소 기준

- **모든 페이지**: 최소 1개 인터랙티브 요소
- **가이드 페이지**: 긍정 체크리스트 + 아코디언 (최소 2개)
- **자가 점검 페이지**: 긍정 체크 + 상황 판단 도구 + 행동 체크 (3개)
- 읽기만 하는 페이지는 존재하면 안 됨

---

## 통합 체크리스트: 새 평가 도구 만들 때

### 설계 단계
- [ ] 긍정-먼저 패턴인가, 상황 판단 패턴인가?
- [ ] 긴급 질문이 필요한가? (자살, 폭력 관련)
- [ ] 결과 분기 기준이 정해졌는가? (high/mid/low threshold)
- [ ] 면책 조항이 포함되는가?

### 구현 단계
- [ ] config 객체가 올바른가? (id, title, questions, results)
- [ ] `renderCheckTool()` 또는 커스텀 함수를 사용하는가?
- [ ] 모든 항목에 `role="checkbox"` + `aria-checked`가 있는가?
- [ ] 키보드 지원 (Space, Enter)이 되는가?
- [ ] 터치 타겟 48px 이상인가?
- [ ] 카운터에 `aria-live="polite"`가 있는가?

### 콘텐츠 단계
- [ ] 항목이 부드러운 권유체("~해 보세요")인가?
- [ ] 판단적 표현("~하면 안 돼요")이 없는가?
- [ ] 결과 메시지가 격려 톤인가?
- [ ] 질환명을 직접 언급하지 않는가?
- [ ] `high` 결과에 `tel:` 링크가 있는가?

### 접근성 단계
- [ ] 스크린리더로 전체 흐름 테스트했는가?
- [ ] 색상 대비 WCAG AA 이상인가?
- [ ] 결과가 `scrollIntoView`로 보이는가?
- [ ] 다크모드에서 결과 색상이 잘 보이는가?
- [ ] `prefers-reduced-motion`에서 애니메이션이 비활성화되는가?
