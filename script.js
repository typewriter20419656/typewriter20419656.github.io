const translations = {
  zh: {
    brand: "陳岳謙",
    navAbout: "關於",
    navAchievements: "事蹟",
    navContact: "聯絡",
    eyebrow: "TMU Pharmacy / Music / Racing / Reading",
    title: "陳岳謙",
    subtitle: "北醫藥學系臨床藥學組大一新生",
    lead: "喜歡在音樂、速度感與閱讀之間充電，也正在台北醫學大學藥學系展開新的學習旅程。",
    contact: "聯絡我",
    viewWork: "查看事蹟",
    name: "陳岳謙",
    role: "臨床藥學新生 / 英語學習者 / 打擊樂團員",
    stat1Value: "985",
    stat1Label: "多益聽讀成績",
    stat2Value: "2nd",
    stat2Label: "桃園市科展高中職組",
    stat3Value: "2X",
    stat3Label: "全國音樂比賽優等",
    aboutTitle: "關於我",
    aboutText: "我畢業於桃園市復旦高中，現在是台北醫學大學藥學系臨床藥學組的大一新生。對我來說，藥學是一條結合理性、關懷與專業判斷的路；課餘時，我喜歡聽音樂、玩賽車遊戲與閱讀，讓自己保持好奇與節奏感。",
    interest1: "聽音樂",
    interest2: "玩賽車遊戲",
    interest3: "看書",
    interest4: "臨床藥學",
    achievement1Title: "英語能力",
    achievement1Text: "高中時於多益聽讀測驗取得 985 分，也曾在全國高中學生英文單字大賽奪得二等獎。",
    achievement2Title: "科學探究",
    achievement2Text: "代表學校參加第 65 屆桃園市科展，於地球與行星科學科高中職組獲得第二名。",
    achievement3Title: "音樂表現",
    achievement3Text: "兩次代表學校參加全國學生音樂比賽，皆於打擊樂團組獲得優等。",
    contactTitle: "聯絡我",
    footer: "歡迎交流學習、音樂、藥學或任何新點子。"
  },
  en: {
    brand: "Sky Chen",
    navAbout: "About",
    navAchievements: "Record",
    navContact: "Contact",
    eyebrow: "TMU Pharmacy / Music / Racing / Reading",
    title: "Sky Chen",
    subtitle: "Freshman in Clinical Pharmacy, Taipei Medical University",
    lead: "I recharge through music, racing games, and books while beginning a new academic journey in pharmacy at Taipei Medical University.",
    contact: "Contact Me",
    viewWork: "View Record",
    name: "Sky Chen",
    role: "Clinical Pharmacy Freshman / English Learner / Percussion Ensemble Member",
    stat1Value: "985",
    stat1Label: "TOEIC Listening and Reading",
    stat2Value: "2nd",
    stat2Label: "Taoyuan Science Fair Division",
    stat3Value: "2X",
    stat3Label: "National Music Contest Excellence",
    aboutTitle: "About Me",
    aboutText: "I graduated from Fu-Dan Senior High School in Taoyuan and am now a freshman in the Clinical Pharmacy track at Taipei Medical University. To me, pharmacy combines reasoning, care, and professional judgment. Outside class, I enjoy music, racing games, and reading to stay curious and in rhythm.",
    interest1: "Music",
    interest2: "Racing Games",
    interest3: "Reading",
    interest4: "Clinical Pharmacy",
    achievement1Title: "English Ability",
    achievement1Text: "In high school, I scored 985 on the TOEIC Listening and Reading test and won second prize in a national high school English vocabulary competition.",
    achievement2Title: "Science Inquiry",
    achievement2Text: "I represented my school at the 65th Taoyuan Science Fair and won second place in the senior high Earth and Planetary Science division.",
    achievement3Title: "Music Performance",
    achievement3Text: "I represented my school twice at the National Student Music Competition, receiving Excellence ratings both times in the percussion ensemble category.",
    contactTitle: "Contact Me",
    footer: "Open to conversations about learning, music, pharmacy, or new ideas."
  }
};

const root = document.documentElement;
const langToggle = document.querySelector("#langToggle");
const langLabel = document.querySelector("#langLabel");
const themeToggle = document.querySelector("#themeToggle");
const animatedItems = ".eyebrow, h1, .subtitle, .lead, .hero-actions, .visual-card, .stat-strip article, .section-block, .info-card, .contact-item, .footer";

let currentLang = localStorage.getItem("preferredLanguage") || "zh";
let currentTheme = localStorage.getItem("preferredTheme") || "dark";

function animateIn(targets = animatedItems) {
  if (!window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  gsap.fromTo(
    targets,
    { autoAlpha: 0, y: 22, scale: 0.98 },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.72,
      ease: "power3.out",
      stagger: 0.075
    }
  );
}

function applyLanguage(lang, shouldAnimate = true) {
  currentLang = lang;
  document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = translations[lang][key];
  });

  langLabel.textContent = lang === "zh" ? "EN" : "中";
  langToggle.setAttribute("aria-label", lang === "zh" ? "Switch language" : "切換語言");
  localStorage.setItem("preferredLanguage", lang);

  if (shouldAnimate) {
    animateIn("[data-i18n], .visual-card, .stat-strip article, .contact-item");
  }
}

function applyTheme(theme) {
  currentTheme = theme;
  root.dataset.theme = theme;
  themeToggle.setAttribute("aria-label", theme === "dark" ? "切換淺色主題" : "切換深色主題");
  themeToggle.setAttribute("title", theme === "dark" ? "切換淺色主題" : "切換深色主題");
  localStorage.setItem("preferredTheme", theme);

  if (window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.fromTo("body", { autoAlpha: 0.92 }, { autoAlpha: 1, duration: 0.25, ease: "power1.out" });
  }
}

langToggle.addEventListener("click", () => {
  applyLanguage(currentLang === "zh" ? "en" : "zh");
});

themeToggle.addEventListener("click", () => {
  applyTheme(currentTheme === "dark" ? "light" : "dark");
});

applyTheme(currentTheme);
applyLanguage(currentLang, false);
window.addEventListener("load", () => animateIn());
