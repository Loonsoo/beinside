/* ═══════════════════════════════════════════════════════════
   BeInside — 감정 추적 시각화 대시보드 (dashboard.js)
   Canvas 기반 차트 + 패턴 인사이트
   외부 라이브러리 없이 순수 Canvas API 사용
═══════════════════════════════════════════════════════════ */

/* ── 감정 카테고리 매핑 ── */
const MOOD_CATEGORY = {
  great:    'good',
  okay:     'good',
  soso:     'normal',
  holding:  'normal',
  hard:     'bad',
  veryhard: 'bad'
};

const CATEGORY_LABEL = { good: '좋음', normal: '보통', bad: '나쁨' };

/* CSS 변수에서 색상 읽기 (런타임) */
function getDashColor(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function categoryColor(cat) {
  if (cat === 'good')   return getDashColor('--amber')    || '#6BA885';
  if (cat === 'normal') return getDashColor('--peach')    || '#D4795E';
  if (cat === 'bad')    return getDashColor('--sit-rose') || '#E09090';
  return '#ccc';
}

function categoryValue(cat) {
  if (cat === 'good')   return 2;
  if (cat === 'normal') return 1;
  if (cat === 'bad')    return 0;
  return 1;
}

/* ── 유틸 ── */
function dateStr(d) { return d.toISOString().split('T')[0]; }

function getMoodsByDateRange(moods, days) {
  const result = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate() - i);
    const ds = dateStr(d);
    const entry = moods.find(m => m.date === ds);
    result.push({
      date: ds,
      dateObj: d,
      mood: entry ? entry.mood : null,
      category: entry ? (MOOD_CATEGORY[entry.mood] || 'normal') : null
    });
  }
  return result;
}

/* ── 대시보드 빌더 ── */
function buildDashboard(container) {
  const moods = loadMoods();
  if (!container) return;

  const collapsed = sessionStorage.getItem('beinside_dash_collapsed') === '1';

  let html = `<div class="dash-section" id="dash-section">
    <button class="dash-toggle" onclick="toggleDashboard()" aria-expanded="${!collapsed}">
      <span class="dash-toggle-left">
        <span class="dash-toggle-icon">📊</span>
        <span class="dash-toggle-text">감정 패턴 대시보드</span>
      </span>
      <span class="dash-chevron ${collapsed ? '' : 'open'}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </button>
    <div class="dash-body" id="dash-body" style="${collapsed ? 'display:none' : ''}">
      <div class="dash-empty" id="dash-empty" style="display:none">
        <span class="dash-empty-icon">🌱</span>
        <p>감정을 기록하면 여기에 패턴이 나타나요</p>
      </div>
      <div id="dash-content" style="display:none">
        <div class="dash-insight" id="dash-insight"></div>
        <div class="dash-charts">
          <div class="dash-chart-wrap">
            <div class="dash-chart-title">주간 감정 흐름</div>
            <canvas id="dash-weekly" width="600" height="200"></canvas>
          </div>
          <div class="dash-chart-row">
            <div class="dash-chart-wrap dash-chart-half">
              <div class="dash-chart-title">감정 비율</div>
              <canvas id="dash-donut" width="280" height="200"></canvas>
            </div>
            <div class="dash-chart-wrap dash-chart-half">
              <div class="dash-chart-title">이번 달 감정 달력</div>
              <canvas id="dash-heatmap" width="280" height="220"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  container.insertAdjacentHTML('afterbegin', html);

  if (moods.length === 0) {
    document.getElementById('dash-empty').style.display = '';
    document.getElementById('dash-content').style.display = 'none';
  } else {
    document.getElementById('dash-empty').style.display = 'none';
    document.getElementById('dash-content').style.display = '';
    renderDashboardCharts(moods);
  }
}

function toggleDashboard() {
  const body = document.getElementById('dash-body');
  const chevron = document.querySelector('.dash-chevron');
  const toggle = document.querySelector('.dash-toggle');
  if (!body) return;
  const isHidden = body.style.display === 'none';
  body.style.display = isHidden ? '' : 'none';
  if (chevron) chevron.classList.toggle('open', isHidden);
  if (toggle) toggle.setAttribute('aria-expanded', String(isHidden));
  sessionStorage.setItem('beinside_dash_collapsed', isHidden ? '0' : '1');

  // 펼칠 때 차트 다시 그리기 (canvas 크기 문제 방지)
  if (isHidden) {
    const moods = loadMoods();
    if (moods.length > 0) renderDashboardCharts(moods);
  }
}

/* ── 차트 렌더링 총괄 ── */
function renderDashboardCharts(moods) {
  requestAnimationFrame(() => {
    renderWeeklyChart(moods);
    renderDonutChart(moods);
    renderHeatmap(moods);
    renderInsight(moods);
  });
}

/* ═══════════════════════════════════════════════
   1. 주간 감정 흐름 그래프 (부드러운 곡선)
═══════════════════════════════════════════════ */
function renderWeeklyChart(moods) {
  const canvas = document.getElementById('dash-weekly');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // HiDPI 보정
  const rect = canvas.parentElement.getBoundingClientRect();
  const w = rect.width || 300;
  const h = 180;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.scale(dpr, dpr);

  const data = getMoodsByDateRange(moods, 7);
  const pad = { top: 28, right: 20, bottom: 36, left: 20 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;

  ctx.clearRect(0, 0, w, h);

  // Y축 라벨
  const yLabels = ['나쁨', '보통', '좋음'];
  ctx.font = '11px "Noto Sans KR", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillStyle = getDashColor('--ink-l') || '#9A9A9A';
  yLabels.forEach((label, i) => {
    const y = pad.top + plotH - (i / 2) * plotH;
    ctx.fillText(label, pad.left + plotW + 16, y + 3);
    // 가이드 라인
    ctx.strokeStyle = getDashColor('--line') || 'rgba(123,174,203,.15)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + plotW, y);
    ctx.stroke();
  });

  // 데이터 포인트 계산
  const points = [];
  data.forEach((d, i) => {
    const x = pad.left + (i / 6) * plotW;
    if (d.category !== null) {
      const y = pad.top + plotH - (categoryValue(d.category) / 2) * plotH;
      points.push({ x, y, cat: d.category, hasData: true });
    } else {
      const y = pad.top + plotH / 2;
      points.push({ x, y, cat: null, hasData: false });
    }
  });

  // 부드러운 곡선 (유효 데이터만)
  const validPoints = points.filter(p => p.hasData);
  if (validPoints.length >= 2) {
    // 그라데이션 영역
    const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + plotH);
    grad.addColorStop(0, categoryColor('good') + '20');
    grad.addColorStop(0.5, categoryColor('normal') + '10');
    grad.addColorStop(1, categoryColor('bad') + '08');

    // 곡선 그리기 (catmull-rom 스플라인)
    ctx.beginPath();
    drawSmoothLine(ctx, validPoints);
    ctx.strokeStyle = getDashColor('--peach') || '#D4795E';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // 영역 채우기
    ctx.beginPath();
    drawSmoothLine(ctx, validPoints);
    ctx.lineTo(validPoints[validPoints.length - 1].x, pad.top + plotH);
    ctx.lineTo(validPoints[0].x, pad.top + plotH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
  }

  // 데이터 포인트 원
  points.forEach(p => {
    if (p.hasData) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = categoryColor(p.cat);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      // 빈 데이터 점선 원
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = getDashColor('--ink-l') || '#ccc';
      ctx.globalAlpha = 0.3;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  });

  // X축 요일 라벨
  const dayNames = ['일','월','화','수','목','금','토'];
  ctx.font = '11px "Noto Sans KR", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = getDashColor('--ink-m') || '#6B6B6B';
  data.forEach((d, i) => {
    const x = pad.left + (i / 6) * plotW;
    const dayLabel = dayNames[d.dateObj.getDay()];
    const isToday = i === 6;
    if (isToday) {
      ctx.fillStyle = getDashColor('--peach-d') || '#C06A50';
      ctx.font = 'bold 11px "Noto Sans KR", sans-serif';
    }
    ctx.fillText(dayLabel, x, h - 8);
    if (isToday) {
      ctx.fillStyle = getDashColor('--ink-m') || '#6B6B6B';
      ctx.font = '11px "Noto Sans KR", sans-serif';
    }
  });
}

/* Catmull-Rom 스플라인 → Canvas bezier */
function drawSmoothLine(ctx, pts) {
  if (pts.length < 2) return;
  ctx.moveTo(pts[0].x, pts[0].y);
  if (pts.length === 2) {
    ctx.lineTo(pts[1].x, pts[1].y);
    return;
  }
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? 0 : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2 >= pts.length ? pts.length - 1 : i + 2];
    const tension = 0.3;
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
  }
}

/* ═══════════════════════════════════════════════
   2. 감정 비율 도넛 차트
═══════════════════════════════════════════════ */
function renderDonutChart(moods) {
  const canvas = document.getElementById('dash-donut');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const rect = canvas.parentElement.getBoundingClientRect();
  const size = Math.min(rect.width || 200, 200);
  const dpr = window.devicePixelRatio || 1;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, size, size);

  const counts = { good: 0, normal: 0, bad: 0 };
  moods.forEach(m => {
    const cat = MOOD_CATEGORY[m.mood] || 'normal';
    counts[cat]++;
  });
  const total = moods.length;
  if (total === 0) return;

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 12;
  const innerR = outerR * 0.55;

  let startAngle = -Math.PI / 2;
  const categories = ['good', 'normal', 'bad'];

  categories.forEach(cat => {
    if (counts[cat] === 0) return;
    const slice = (counts[cat] / total) * Math.PI * 2;
    const endAngle = startAngle + slice;

    ctx.beginPath();
    ctx.arc(cx, cy, outerR, startAngle, endAngle);
    ctx.arc(cx, cy, innerR, endAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = categoryColor(cat);
    ctx.fill();

    // 퍼센트 라벨
    const pct = Math.round((counts[cat] / total) * 100);
    if (pct >= 8) {
      const midAngle = startAngle + slice / 2;
      const labelR = (outerR + innerR) / 2;
      const lx = cx + Math.cos(midAngle) * labelR;
      const ly = cy + Math.sin(midAngle) * labelR;
      ctx.font = 'bold 11px "Noto Sans KR", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fff';
      ctx.fillText(pct + '%', lx, ly);
    }

    startAngle = endAngle;
  });

  // 중앙 텍스트
  ctx.font = 'bold 14px "Noto Sans KR", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = getDashColor('--ink') || '#3A3A3A';
  ctx.fillText(total + '일', cx, cy - 6);
  ctx.font = '10px "Noto Sans KR", sans-serif';
  ctx.fillStyle = getDashColor('--ink-l') || '#9A9A9A';
  ctx.fillText('기록', cx, cy + 10);

  // 범례
  const legendY = size - 4;
  ctx.font = '10px "Noto Sans KR", sans-serif';
  ctx.textBaseline = 'bottom';
  let lx = cx - 60;
  categories.forEach(cat => {
    ctx.fillStyle = categoryColor(cat);
    ctx.fillRect(lx, legendY - 8, 8, 8);
    ctx.fillStyle = getDashColor('--ink-m') || '#6B6B6B';
    ctx.textAlign = 'left';
    ctx.fillText(CATEGORY_LABEL[cat], lx + 11, legendY);
    lx += 42;
  });
}

/* ═══════════════════════════════════════════════
   3. 월간 감정 히트맵 (캘린더)
═══════════════════════════════════════════════ */
function renderHeatmap(moods) {
  const canvas = document.getElementById('dash-heatmap');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const rect = canvas.parentElement.getBoundingClientRect();
  const w = rect.width || 260;
  const h = 200;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayDate = now.getDate();

  // 감정 데이터 맵
  const moodMap = {};
  moods.forEach(m => {
    const d = new Date(m.date + 'T00:00:00');
    if (d.getFullYear() === year && d.getMonth() === month) {
      moodMap[d.getDate()] = MOOD_CATEGORY[m.mood] || 'normal';
    }
  });

  const cellSize = Math.min((w - 20) / 7, 26);
  const gap = 3;
  const totalCellW = cellSize + gap;
  const startX = (w - totalCellW * 7 + gap) / 2;
  const startY = 28;

  // 월 타이틀
  ctx.font = 'bold 12px "Noto Sans KR", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = getDashColor('--ink') || '#3A3A3A';
  ctx.fillText((month + 1) + '월', w / 2, 16);

  // 요일 헤더
  const dayHeaders = ['일','월','화','수','목','금','토'];
  ctx.font = '10px "Noto Sans KR", sans-serif';
  ctx.fillStyle = getDashColor('--ink-l') || '#9A9A9A';
  ctx.textAlign = 'center';
  dayHeaders.forEach((d, i) => {
    ctx.fillText(d, startX + i * totalCellW + cellSize / 2, startY + 10);
  });

  const cellStartY = startY + 20;
  let col = firstDay;
  let row = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const x = startX + col * totalCellW;
    const y = cellStartY + row * totalCellW;
    const r = Math.min(cellSize / 2, 4);

    // 배경 색상
    const cat = moodMap[day];
    if (cat) {
      ctx.fillStyle = categoryColor(cat);
      ctx.globalAlpha = day <= todayDate ? 0.75 : 0.3;
    } else if (day <= todayDate) {
      ctx.fillStyle = getDashColor('--warm') || '#EEE9E3';
      ctx.globalAlpha = 0.5;
    } else {
      ctx.fillStyle = getDashColor('--warm') || '#EEE9E3';
      ctx.globalAlpha = 0.2;
    }

    // 둥근 사각형
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + cellSize - r, y);
    ctx.quadraticCurveTo(x + cellSize, y, x + cellSize, y + r);
    ctx.lineTo(x + cellSize, y + cellSize - r);
    ctx.quadraticCurveTo(x + cellSize, y + cellSize, x + cellSize - r, y + cellSize);
    ctx.lineTo(x + r, y + cellSize);
    ctx.quadraticCurveTo(x, y + cellSize, x, y + cellSize - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;

    // 오늘 표시
    if (day === todayDate) {
      ctx.strokeStyle = getDashColor('--peach-d') || '#C06A50';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // 날짜 숫자
    ctx.font = '9px "Noto Sans KR", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = cat ? '#fff' : (getDashColor('--ink-m') || '#6B6B6B');
    if (day === todayDate && !cat) ctx.fillStyle = getDashColor('--peach-d') || '#C06A50';
    ctx.fillText(String(day), x + cellSize / 2, y + cellSize / 2);

    col++;
    if (col > 6) { col = 0; row++; }
  }
}

/* ═══════════════════════════════════════════════
   4. 패턴 인사이트
═══════════════════════════════════════════════ */
function renderInsight(moods) {
  const el = document.getElementById('dash-insight');
  if (!el) return;

  const insights = [];
  const week = getMoodsByDateRange(moods, 7);
  const prevWeek = getMoodsByDateRange(moods, 14).slice(0, 7);

  // (1) 이번 주 가장 많은 감정
  const weekCounts = { good: 0, normal: 0, bad: 0 };
  week.forEach(d => { if (d.category) weekCounts[d.category]++; });
  const weekTotal = weekCounts.good + weekCounts.normal + weekCounts.bad;

  if (weekTotal > 0) {
    const topCat = Object.entries(weekCounts).sort((a,b) => b[1] - a[1])[0];
    insights.push(`이번 주 가장 많이 느낀 감정은 <strong>${CATEGORY_LABEL[topCat[0]]}</strong>이에요.`);
  }

  // (2) 트렌드 분석 (지난주 vs 이번 주)
  const prevCounts = { good: 0, normal: 0, bad: 0 };
  prevWeek.forEach(d => { if (d.category) prevCounts[d.category]++; });
  const prevTotal = prevCounts.good + prevCounts.normal + prevCounts.bad;

  if (weekTotal > 0 && prevTotal > 0) {
    const weekScore = weekCounts.good * 2 + weekCounts.normal * 1;
    const prevScore = prevCounts.good * 2 + prevCounts.normal * 1;
    const weekAvg = weekScore / weekTotal;
    const prevAvg = prevScore / prevTotal;

    if (weekAvg > prevAvg + 0.3) {
      insights.push('지난주보다 기분이 나아지고 있어요.');
    } else if (weekAvg < prevAvg - 0.3) {
      insights.push('최근 기분이 조금 가라앉아 있어요. 괜찮아요, 파도처럼 오르내리는 거예요.');
    } else {
      insights.push('지난주와 비슷한 감정 흐름이에요.');
    }
  }

  // (3) 요일별 패턴
  if (moods.length >= 7) {
    const dayScores = [0,0,0,0,0,0,0];
    const dayCounts = [0,0,0,0,0,0,0];
    const dayNames = ['일','월','화','수','목','금','토'];
    moods.forEach(m => {
      const d = new Date(m.date + 'T00:00:00');
      const day = d.getDay();
      const cat = MOOD_CATEGORY[m.mood] || 'normal';
      dayScores[day] += categoryValue(cat);
      dayCounts[day]++;
    });

    let bestDay = -1, bestAvg = -1;
    for (let i = 0; i < 7; i++) {
      if (dayCounts[i] >= 2) {
        const avg = dayScores[i] / dayCounts[i];
        if (avg > bestAvg) { bestAvg = avg; bestDay = i; }
      }
    }
    if (bestDay >= 0 && bestAvg > 1.2) {
      insights.push(`<strong>${dayNames[bestDay]}요일</strong>에 기분이 좋은 경향이 있어요.`);
    }
  }

  if (insights.length === 0) {
    el.style.display = 'none';
    return;
  }

  el.style.display = '';
  el.innerHTML = insights.map(t =>
    `<div class="dash-insight-item"><span class="dash-insight-dot"></span>${t}</div>`
  ).join('');
}

/* ═══════════════════════════════════════════════
   대시보드 초기화 — buildMoodWidget 후크
═══════════════════════════════════════════════ */
(function() {
  const _origBuildMoodWidget = window.buildMoodWidget;
  if (typeof _origBuildMoodWidget !== 'function') return;

  window.buildMoodWidget = function(container) {
    // 기존 대시보드 제거 (재렌더링 시)
    const existingDash = container.querySelector('.dash-section');
    if (existingDash) existingDash.remove();

    _origBuildMoodWidget.call(this, container);

    // 대시보드 삽입 (감정 기록 카드 바로 아래, 타임라인 위)
    buildDashboard(container);
  };
})();
