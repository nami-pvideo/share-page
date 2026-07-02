# 纳米P视频团队 · 分享合集

组内技术分享的静态页面合集，通过 GitHub Pages 部署上线。

**线上地址：** https://nami-pvideo.github.io/share-page/

---

## 目录结构

```
share-page/
├── index.html          # 首页（入口导航，卡片由 index.js 动态渲染）
├── index.js            # 首页入口配置 + 渲染逻辑（新增页面改这里）
├── shared/
│   └── header.js       # 公共顶部 header 组件（logo 点击回首页）
├── page/               # 各个分享页面
│   ├── ai-coding-info-disclosure-deepseek.html
│   ├── ai-native-frontend-workflow.html
│   ├── information-matrix-for-ai.html
│   └── create_tool.html
└── resource/           # 各页面对应的 markdown 原文资料
```

---

## 页面介绍

| 页面 | 主题 | 分享人 |
| --- | --- | --- |
| [信息披露管理：提升 AI 编程效率的核心杠杆](page/ai-coding-info-disclosure-deepseek.html) | 从信息披露视角，探讨如何系统性提升 AI 编程的协作效率 | 黄锦 |
| [AI Native 前端开发工作法](page/ai-native-frontend-workflow.html) | 面向 AI 原生时代的前端开发流程与实践分享 | 史春雨 |
| [创作工具接入指南](page/create_tool.html) | 创作工具的接入方式与上手指引 | 郭汾 |
| [构建信息环境，提升 AI 能力](page/information-matrix-for-ai.html) | 从信息环境视角，解读 AI 应用管理的核心杠杆与工程实践 | 黄锦 |

---

## 公共 header 组件

所有页面统一使用 `shared/header.js` 注入顶部栏，左侧 logo 点击可返回首页。
logo 的跳转路径由脚本根据自身 `src` 自动推算，因此页面放在任意目录都能正确回到首页。

---

## 新增页面教程

### 第 1 步：把页面 HTML 放进 `page/`

将新的 HTML 文件放到 `page/` 目录，例如 `page/your-new-page.html`。

### 第 2 步：引入公共 header

在页面 `</body>` 标签前加上一行（路径相对 `page/` 目录）：

```html
<script src="../shared/header.js"></script>
```

这样新页面就自动拥有统一的顶部栏和返回首页的 logo。

> 如果页面不在 `page/` 而是在项目根目录，路径改为 `shared/header.js`。

### 第 3 步：在首页注册入口

打开 `index.js`，往 `entries` 数组里追加一项：

```js
const entries = [
  // ...已有的入口...
  {
    href: "page/your-new-page.html",  // 相对首页的路径
    icon: "🚀",                        // 卡片图标（emoji）
    title: "你的页面标题",
    desc: "一句话简介。",
    sharer: "分享人姓名"               // 可选，不填则不显示分享人
  }
];
```

字段说明：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `href` | 是 | 页面路径，相对首页（一般是 `page/xxx.html`） |
| `icon` | 否 | 卡片图标 emoji，默认 `📄` |
| `title` | 是 | 卡片标题 |
| `desc` | 否 | 一句话简介 |
| `sharer` | 否 | 分享人姓名，不填则不显示该行 |

保存后刷新首页即可看到新卡片，无需改动 `index.html`。

---

## 本地预览

直接用浏览器打开 `index.html` 即可（数据内嵌在 `index.js`，无需起服务器）。

---

## 部署上线

页面通过 GitHub Pages 部署，源为 `main` 分支根目录。
每次 `git push` 到 `main` 后，GitHub Pages 会自动重新构建并上线，无需手动操作。

```bash
git add .
git commit -m "add: 新增分享页面 xxx"
git push
```

推送后等待约 1 分钟即可在线上看到更新。
