(function () {
  // 根据本脚本自身的位置推算 index.html 的路径，
  // 这样无论页面放在哪个目录，logo 都能正确回到首页。
  var self = document.currentScript;
  var base = self ? self.src.replace(/shared\/header\.js.*$/, '') : '../';
  var indexHref = base + 'index.html';

  var css = '' +
    '.site-header{position:sticky;top:0;z-index:9999;display:flex;align-items:center;' +
    'height:56px;padding:0 20px;background:rgba(15,23,42,.85);backdrop-filter:blur(10px);' +
    '-webkit-backdrop-filter:blur(10px);border-bottom:1px solid rgba(255,255,255,.08);' +
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;}' +
    '.site-header__logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:#f1f5f9;' +
    'font-weight:700;font-size:1rem;transition:opacity .2s ease;}' +
    '.site-header__logo:hover{opacity:.75;}' +
    '.site-header__logo .mark{display:inline-flex;align-items:center;justify-content:center;' +
    'width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#38bdf8,#6366f1);' +
    'font-size:1rem;}' +
    'body{margin-top:0;}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML =
    '<a class="site-header__logo" href="' + indexHref + '" title="返回首页">' +
    '<span class="mark">🎬</span><span>纳米P视频团队 · 分享合集</span></a>';

  function mount() {
    if (document.body.firstChild) {
      document.body.insertBefore(header, document.body.firstChild);
    } else {
      document.body.appendChild(header);
    }
  }

  if (document.body) {
    mount();
  } else {
    document.addEventListener('DOMContentLoaded', mount);
  }
})();
