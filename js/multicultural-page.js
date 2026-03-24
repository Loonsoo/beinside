/* ═══════════════════════════════════════════════════════════
   BeInside — 다문화 가정 가이드 (Multicultural Family Guide)
   베트남어 · 중국어(간체) · 영어 — 한국어 병기
═══════════════════════════════════════════════════════════ */

const MC_LANGS = [
  { id: 'vi', label: 'Tiếng Việt', flag: '🇻🇳', sub: '베트남어' },
  { id: 'zh', label: '中文', flag: '🇨🇳', sub: '중국어' },
  { id: 'en', label: 'English', flag: '🌐', sub: '영어' }
];

const MC_DATA = {
  /* ── 긴급 연락처 (Emergency Contacts) ── */
  emergency: {
    vi: [
      { num: '112', name: 'Cảnh sát (경찰)', desc: 'Bạo lực gia đình, tội phạm. Miễn phí, 24 giờ (가정폭력·범죄 신고. 무료, 24시간)', color: 'var(--emer-112)' },
      { num: '119', name: 'Cấp cứu (응급)', desc: 'Cấp cứu y tế, xe cứu thương. Miễn phí, 24 giờ (의료 응급·구급차. 무료, 24시간)', color: 'var(--emer-119)' },
      { num: '1345', name: 'Tổng đài người nước ngoài (외국인종합안내)', desc: 'Tư vấn bằng tiếng Việt. Miễn phí (베트남어 상담 가능. 무료)', color: 'var(--peach)' },
      { num: '1577-1366', name: 'Đường dây khẩn cấp phụ nữ (여성긴급전화)', desc: 'Bạo lực gia đình, xâm hại tình dục. Miễn phí, 24 giờ (가정폭력·성폭력. 무료, 24시간)', color: 'var(--emer-1366)' },
      { num: '109', name: 'Phòng chống tự tử (자살예방상담)', desc: 'Khi bạn muốn chết hoặc tự gây thương tích. Miễn phí, 24 giờ (죽고 싶거나 자해 충동. 무료, 24시간)', color: 'var(--emer-109)' }
    ],
    zh: [
      { num: '112', name: '警察 (경찰)', desc: '家庭暴力、犯罪报警。免费，24小时 (가정폭력·범죄 신고. 무료, 24시간)', color: 'var(--emer-112)' },
      { num: '119', name: '急救 (응급)', desc: '医疗急救、叫救护车。免费，24小时 (의료 응급·구급차. 무료, 24시간)', color: 'var(--emer-119)' },
      { num: '1345', name: '外国人综合咨询 (외국인종합안내)', desc: '提供中文咨询服务。免费 (중국어 상담 가능. 무료)', color: 'var(--peach)' },
      { num: '1577-1366', name: '妇女紧急热线 (여성긴급전화)', desc: '家庭暴力、性侵害。免费，24小时 (가정폭력·성폭력. 무료, 24시간)', color: 'var(--emer-1366)' },
      { num: '109', name: '自杀预防咨询 (자살예방상담)', desc: '想死或自伤时请拨打。免费，24小时 (죽고 싶거나 자해 충동. 무료, 24시간)', color: 'var(--emer-109)' }
    ],
    en: [
      { num: '112', name: 'Police (경찰)', desc: 'Domestic violence, crime report. Free, 24hrs (가정폭력·범죄 신고. 무료, 24시간)', color: 'var(--emer-112)' },
      { num: '119', name: 'Emergency (응급)', desc: 'Medical emergency, ambulance. Free, 24hrs (의료 응급·구급차. 무료, 24시간)', color: 'var(--emer-119)' },
      { num: '1345', name: 'Foreigner Helpline (외국인종합안내)', desc: 'Counseling in English. Free (영어 상담 가능. 무료)', color: 'var(--peach)' },
      { num: '1577-1366', name: "Women's Emergency (여성긴급전화)", desc: 'Domestic violence, sexual assault. Free, 24hrs (가정폭력·성폭력. 무료, 24시간)', color: 'var(--emer-1366)' },
      { num: '109', name: 'Suicide Prevention (자살예방상담)', desc: 'If you want to die or self-harm. Free, 24hrs (죽고 싶거나 자해 충동. 무료, 24시간)', color: 'var(--emer-109)' }
    ]
  },

  /* ── 양육 가이드 (Parenting Guide) ── */
  parenting: {
    vi: {
      title: 'Hướng dẫn nuôi dạy con (양육 가이드)',
      items: [
        { icon: '🏥', title: 'Khám sức khỏe trẻ em (영유아 건강검진)', text: 'Trẻ em ở Hàn Quốc được khám sức khỏe miễn phí theo từng giai đoạn. Mang theo thẻ bảo hiểm y tế đến bệnh viện nhi hoặc trung tâm y tế cộng đồng. (한국에서는 영유아 건강검진이 무료예요. 건강보험증을 가지고 소아과나 보건소에 가세요.)' },
        { icon: '🗣️', title: 'Phát triển ngôn ngữ kép (이중 언어 발달)', text: 'Nói tiếng Việt ở nhà và tiếng Hàn ở trường là bình thường. Một ngôn ngữ có thể chậm hơn — đó không phải là vấn đề. (집에서는 베트남어, 밖에서는 한국어 — 정상이에요. 한 언어가 좀 느릴 수 있지만 걱정하지 마세요.)' },
        { icon: '📚', title: 'Nhập học và hỗ trợ (입학·지원 제도)', text: 'Trẻ em đa văn hóa được hỗ trợ tiếng Hàn miễn phí tại trường. Liên hệ Trung tâm Hỗ trợ Gia đình Đa văn hóa (1577-5432). (다문화 가정 자녀는 학교에서 한국어 지원을 받을 수 있어요. 다문화가족지원센터 1577-5432로 문의하세요.)' },
        { icon: '💛', title: 'Sức khỏe tinh thần của mẹ (엄마의 정신건강)', text: 'Sống xa quê hương, nuôi con ở nước ngoài rất vất vả. Cảm giác cô đơn, buồn bã là bình thường. Bạn có thể gọi 1577-0199 để được tư vấn. (고향을 떠나 아이를 키우는 건 정말 힘든 일이에요. 외롭고 슬픈 감정은 자연스러워요. 1577-0199로 상담받을 수 있어요.)' }
      ]
    },
    zh: {
      title: '育儿指南 (양육 가이드)',
      items: [
        { icon: '🏥', title: '婴幼儿健康检查 (영유아 건강검진)', text: '在韩国，婴幼儿可以免费接受健康检查。带上医保卡去儿科或社区卫生中心即可。(한국에서는 영유아 건강검진이 무료예요. 건강보험증을 가지고 소아과나 보건소에 가세요.)' },
        { icon: '🗣️', title: '双语发展 (이중 언어 발달)', text: '在家说中文，在外说韩语是正常的。一种语言可能会慢一些——这不是问题。(집에서는 중국어, 밖에서는 한국어 — 정상이에요. 한 언어가 좀 느릴 수 있지만 걱정하지 마세요.)' },
        { icon: '📚', title: '入学与支援制度 (입학·지원 제도)', text: '多文化家庭的孩子可以在学校获得免费韩语支援。请联系多文化家庭支援中心（1577-5432）。(다문화 가정 자녀는 학교에서 한국어 지원을 받을 수 있어요. 다문화가족지원센터 1577-5432로 문의하세요.)' },
        { icon: '💛', title: '妈妈的心理健康 (엄마의 정신건강)', text: '离开家乡在国外养育孩子非常辛苦。感到孤独、悲伤是正常的。您可以拨打1577-0199获得咨询。(고향을 떠나 아이를 키우는 건 정말 힘든 일이에요. 외롭고 슬픈 감정은 자연스러워요. 1577-0199로 상담받을 수 있어요.)' }
      ]
    },
    en: {
      title: 'Parenting Guide (양육 가이드)',
      items: [
        { icon: '🏥', title: 'Child Health Checkups (영유아 건강검진)', text: 'In Korea, babies and toddlers can receive free health checkups at each developmental stage. Bring your health insurance card to a pediatric clinic or community health center. (한국에서는 영유아 건강검진이 무료예요.)' },
        { icon: '🗣️', title: 'Bilingual Development (이중 언어 발달)', text: "Speaking your language at home and Korean outside is perfectly normal. One language may develop slower than the other — that's okay and temporary. (집에서 모국어, 밖에서 한국어 — 정상이에요.)" },
        { icon: '📚', title: 'School Enrollment & Support (입학·지원 제도)', text: 'Children from multicultural families can receive free Korean language support at school. Contact the Multicultural Family Support Center at 1577-5432. (다문화가족지원센터 1577-5432로 문의하세요.)' },
        { icon: '💛', title: "Mother's Mental Health (엄마의 정신건강)", text: "Raising a child far from your homeland is incredibly hard. Feeling lonely or sad is natural and valid. Call 1577-0199 for free counseling support. (고향을 떠나 아이를 키우는 건 정말 힘든 일이에요.)" }
      ]
    }
  },

  /* ── 생활 정보 (Daily Life) ── */
  daily: {
    vi: {
      title: 'Thông tin cuộc sống hàng ngày (생활 정보)',
      items: [
        { icon: '🏠', title: 'Trung tâm Hỗ trợ Gia đình Đa văn hóa (다문화가족지원센터)', text: 'Dạy tiếng Hàn miễn phí, tư vấn gia đình, hỗ trợ việc làm. Gọi 1577-5432 hoặc tìm trung tâm gần nhất tại danuri.or.kr. (무료 한국어 교육, 가족 상담, 취업 지원. 1577-5432 또는 danuri.or.kr에서 가까운 센터를 찾으세요.)' },
        { icon: '💊', title: 'Bảo hiểm y tế (건강보험)', text: 'Người nước ngoài kết hôn với người Hàn Quốc được tham gia bảo hiểm y tế quốc gia. Mang theo giấy đăng ký ngoại kiều đến NHIS. (한국인과 결혼한 외국인은 국민건강보험에 가입할 수 있어요. 외국인등록증을 가지고 건강보험공단에 가세요.)' },
        { icon: '👶', title: 'Trợ cấp nuôi con (양육 수당)', text: 'Phụ huynh đa văn hóa cũng được nhận trợ cấp nuôi con hàng tháng. Đăng ký tại Ủy ban nhân dân phường/xã (주민센터). (다문화 가정도 매달 양육수당을 받을 수 있어요. 주민센터에서 신청하세요.)' }
      ]
    },
    zh: {
      title: '日常生活信息 (생활 정보)',
      items: [
        { icon: '🏠', title: '多文化家庭支援中心 (다문화가족지원센터)', text: '提供免费韩语教育、家庭咨询、就业支援。拨打1577-5432或访问danuri.or.kr查找最近的中心。(무료 한국어 교육, 가족 상담, 취업 지원. 1577-5432 또는 danuri.or.kr.)' },
        { icon: '💊', title: '医疗保险 (건강보험)', text: '与韩国人结婚的外国人可以加入国民健康保险。带上外国人登录证到健康保险公团办理。(한국인과 결혼한 외국인은 국민건강보험에 가입할 수 있어요.)' },
        { icon: '👶', title: '育儿津贴 (양육 수당)', text: '多文化家庭也可以每月领取育儿津贴。请到居民中心申请。(다문화 가정도 매달 양육수당을 받을 수 있어요. 주민센터에서 신청하세요.)' }
      ]
    },
    en: {
      title: 'Daily Life Information (생활 정보)',
      items: [
        { icon: '🏠', title: 'Multicultural Family Support Center (다문화가족지원센터)', text: 'Free Korean language classes, family counseling, and job support. Call 1577-5432 or visit danuri.or.kr to find the nearest center. (무료 한국어 교육, 가족 상담, 취업 지원.)' },
        { icon: '💊', title: 'Health Insurance (건강보험)', text: 'Foreigners married to Korean nationals can join the National Health Insurance. Bring your Alien Registration Card to the NHIS office. (한국인과 결혼한 외국인은 국민건강보험에 가입할 수 있어요.)' },
        { icon: '👶', title: 'Childcare Allowance (양육 수당)', text: 'Multicultural families are also eligible for monthly childcare allowance. Apply at your local Community Service Center (주민센터). (다문화 가정도 매달 양육수당을 받을 수 있어요.)' }
      ]
    }
  },

  /* ── 위기 대응 (Crisis Response) ── */
  crisis: {
    vi: {
      title: 'Khi bạn cần giúp đỡ (도움이 필요할 때)',
      message: 'Nếu bạn đang bị bạo lực gia đình hoặc muốn tự tử, hãy gọi ngay. Bạn không cần phải chịu đựng một mình. (가정폭력을 당하고 있거나 죽고 싶다면, 지금 바로 전화하세요. 혼자 견디지 않아도 돼요.)'
    },
    zh: {
      title: '当您需要帮助时 (도움이 필요할 때)',
      message: '如果您正在遭受家庭暴力或有自杀念头，请立即拨打电话。您不需要独自承受。(가정폭력을 당하고 있거나 죽고 싶다면, 지금 바로 전화하세요. 혼자 견디지 않아도 돼요.)'
    },
    en: {
      title: 'When You Need Help (도움이 필요할 때)',
      message: 'If you are experiencing domestic violence or having suicidal thoughts, call now. You do not have to endure this alone. (가정폭력을 당하고 있거나 죽고 싶다면, 지금 바로 전화하세요.)'
    }
  }
};

/* ── 언어 선택 상태 ── */
let mcLang = localStorage.getItem('beinside_mc_lang') || 'vi';

function setMcLang(lang) {
  mcLang = lang;
  localStorage.setItem('beinside_mc_lang', lang);
  const el = document.getElementById('multicultural-content');
  if (el) renderMulticulturalPage(el);
}

/* ── 렌더링 ── */
function renderMulticulturalPage(container) {
  if (!container) return;

  const emer = MC_DATA.emergency[mcLang];
  const parenting = MC_DATA.parenting[mcLang];
  const daily = MC_DATA.daily[mcLang];
  const crisis = MC_DATA.crisis[mcLang];

  const langTabs = MC_LANGS.map(l =>
    `<button class="mc-lang-btn${l.id === mcLang ? ' on' : ''}" onclick="setMcLang('${l.id}')">
      <span class="mc-lang-flag">${l.flag}</span>
      <span class="mc-lang-label">${l.label}</span>
      <span class="mc-lang-sub">${l.sub}</span>
    </button>`
  ).join('');

  const emerHTML = emer.map(e =>
    `<a href="tel:${esc(e.num)}" class="mc-emer-item">
      <span class="mc-emer-num" style="color:${e.color}">${esc(e.num)}</span>
      <div class="mc-emer-info">
        <span class="mc-emer-name">${esc(e.name)}</span>
        <span class="mc-emer-desc">${esc(e.desc)}</span>
      </div>
    </a>`
  ).join('');

  const parentingHTML = parenting.items.map(item =>
    `<div class="mc-guide-card">
      <span class="mc-guide-icon">${item.icon}</span>
      <div class="mc-guide-body">
        <div class="mc-guide-title">${esc(item.title)}</div>
        <div class="mc-guide-text">${esc(item.text)}</div>
      </div>
    </div>`
  ).join('');

  const dailyHTML = daily.items.map(item =>
    `<div class="mc-guide-card">
      <span class="mc-guide-icon">${item.icon}</span>
      <div class="mc-guide-body">
        <div class="mc-guide-title">${esc(item.title)}</div>
        <div class="mc-guide-text">${esc(item.text)}</div>
      </div>
    </div>`
  ).join('');

  container.innerHTML = `
    <div class="content-hero mc-hero">
      <h1 class="content-hero-title">🌍 다문화 가정 가이드</h1>
      <p class="content-hero-sub">Multicultural Family Guide</p>
      <p class="content-hero-desc">언어를 선택하세요 — Choose your language</p>
    </div>

    <div class="mc-lang-selector">${langTabs}</div>

    <div class="mc-section">
      <h2 class="mc-section-title">🆘 ${esc(crisis.title)}</h2>
      <p class="mc-crisis-msg">${esc(crisis.message)}</p>
      <div class="mc-emer-list">${emerHTML}</div>
    </div>

    <div class="mc-section">
      <h2 class="mc-section-title">👶 ${esc(parenting.title)}</h2>
      <div class="mc-guide-list">${parentingHTML}</div>
    </div>

    <div class="mc-section">
      <h2 class="mc-section-title">🏠 ${esc(daily.title)}</h2>
      <div class="mc-guide-list">${dailyHTML}</div>
    </div>

    <div class="mc-footer">
      <p>다문화가족지원센터 <a href="tel:1577-5432" style="color:var(--peach-d);font-weight:700;">1577-5432</a></p>
      <p style="font-size:12px;color:var(--ink-l);margin-top:4px;">danuri.or.kr — 13개 언어 지원</p>
    </div>
  `;
}
