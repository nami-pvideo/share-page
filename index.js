// 首页入口配置：后续新增页面只需往这个数组追加一项即可。
const entries = [
  {
    href: "page/ai-coding-info-disclosure-deepseek.html",
    icon: "📊",
    title: "信息披露管理：提升 AI 编程效率的核心杠杆",
    desc: "从信息披露视角，探讨如何系统性提升 AI 编程的协作效率。",
    sharer: "黄锦"
  },
  {
    href: "page/ai-native-frontend-workflow.html",
    icon: "⚡",
    title: "AI Native 前端开发工作法",
    desc: "面向 AI 原生时代的前端开发流程与实践分享。",
    sharer: "史春雨"
  },
  {
    href: "page/create_tool.html",
    icon: "🛠️",
    title: "创作工具接入指南",
    desc: "创作工具的接入方式与上手指引。",
    sharer: "郭汾"
  },
  {
    href: "page/information-matrix-for-ai.html",
    icon: "🧠",
    title: "构建信息环境，提升 AI 能力",
    desc: "同一个 AI 模型，为什么在编程领域一气呵成，在商业领域举步维艰？从信息环境视角解读 AI 应用管理。",
    sharer: "黄锦"
  }
];

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);
}

function renderCard(e) {
  const a = document.createElement("a");
  a.className = "card";
  a.href = e.href;
  a.innerHTML =
    '<div class="icon">' + escapeHtml(e.icon || "📄") + "</div>" +
    "<h2>" + escapeHtml(e.title) + "</h2>" +
    "<p>" + escapeHtml(e.desc || "") + "</p>" +
    (e.sharer ? '<div class="sharer">分享人：<span>' + escapeHtml(e.sharer) + "</span></div>" : "") +
    '<div class="arrow">进入 →</div>';
  return a;
}

function renderEntries() {
  const root = document.querySelector(".cards");
  if (!root) return;
  root.innerHTML = "";
  entries.forEach(e => root.appendChild(renderCard(e)));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderEntries);
} else {
  renderEntries();
}
