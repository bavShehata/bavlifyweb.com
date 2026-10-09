// Shared building blocks used by every design template.

export const DESIGNS = [
  { id: "editorial", label: "Editorial" },
  { id: "terminal", label: "Terminal" },
  { id: "monochrome", label: "Monochrome" },
  { id: "brutalist", label: "Brutalist" },
];

// Self-hosted fonts (no third-party runtime requests).
export const FONT_FACES = `
@font-face{font-family:"Fraunces";src:url("/fonts/fraunces.woff2") format("woff2");font-weight:100 900;font-display:swap;font-style:normal;}
@font-face{font-family:"Fraunces";src:url("/fonts/fraunces-italic.woff2") format("woff2");font-weight:100 900;font-display:swap;font-style:italic;}
@font-face{font-family:"Newsreader";src:url("/fonts/newsreader.woff2") format("woff2");font-weight:200 800;font-display:swap;font-style:normal;}
@font-face{font-family:"Newsreader";src:url("/fonts/newsreader-italic.woff2") format("woff2");font-weight:200 800;font-display:swap;font-style:italic;}
@font-face{font-family:"Instrument Serif";src:url("/fonts/instrument-serif.woff2") format("woff2");font-weight:400;font-display:swap;font-style:normal;}
@font-face{font-family:"Instrument Serif";src:url("/fonts/instrument-serif-italic.woff2") format("woff2");font-weight:400;font-display:swap;font-style:italic;}
@font-face{font-family:"Space Grotesk";src:url("/fonts/space-grotesk.woff2") format("woff2");font-weight:300 700;font-display:swap;font-style:normal;}
@font-face{font-family:"JetBrains Mono";src:url("/fonts/jetbrains-mono.woff2") format("woff2");font-weight:100 800;font-display:swap;font-style:normal;}
`;

export const RESET = `
*,*::before,*::after{box-sizing:border-box;}
*{margin:0;}
html{-webkit-text-size-adjust:100%;text-size-adjust:100%;scroll-behavior:smooth;}
body{min-height:100vh;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}
img,svg{display:block;max-width:100%;}
a{color:inherit;}
ul{list-style:none;padding:0;}
button{font:inherit;color:inherit;cursor:pointer;}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;}
::selection{background:var(--accent);color:var(--bg);}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important;}}
`;

// Runs before paint to avoid a theme flash.
export const THEME_SCRIPT = `
<script>
(function(){
  try{
    var k="bw-theme";
    var s=localStorage.getItem(k);
    var t=s||(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
    document.documentElement.setAttribute("data-theme",t);
  }catch(e){document.documentElement.setAttribute("data-theme","light");}
  window.__bwToggle=function(){
    var c=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";
    document.documentElement.setAttribute("data-theme",c);
    try{localStorage.setItem("bw-theme",c);}catch(e){}
  };
})();
</script>`;

// Fixed switcher so you can compare designs and toggle theme while previewing.
export function switcher(current) {
  const links = DESIGNS.map(
    (d) =>
      `<a href="${d.id}.html" class="bw-sw__link${d.id === current ? " is-active" : ""}">${d.label}</a>`
  ).join('<span class="bw-sw__sep">/</span>');
  return `
<div class="bw-sw" role="navigation" aria-label="Design switcher">
  <span class="bw-sw__eyebrow">Design</span>
  ${links}
  <button class="bw-sw__theme" onclick="__bwToggle()" aria-label="Toggle light or dark">
    <span class="bw-sw__sun">Light</span><span class="bw-sw__moon">Dark</span>
  </button>
</div>`;
}

// Shared CSS for the switcher. Uses each design's own variables so it blends in.
export const SWITCHER_CSS = `
.bw-sw{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:9999;
  display:flex;align-items:center;gap:.55rem;padding:.5rem .8rem;
  font-family:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.72rem;letter-spacing:.02em;
  background:var(--sw-bg,var(--card,var(--bg)));color:var(--fg);
  border:1px solid var(--line);border-radius:999px;
  box-shadow:0 6px 30px -12px rgba(0,0,0,.5);backdrop-filter:blur(8px);}
.bw-sw__eyebrow{opacity:.5;text-transform:uppercase;letter-spacing:.14em;font-size:.6rem;}
.bw-sw__link{text-decoration:none;opacity:.62;padding:.1rem .1rem;transition:opacity .15s;}
.bw-sw__link:hover{opacity:1;}
.bw-sw__link.is-active{opacity:1;color:var(--accent);font-weight:600;}
.bw-sw__sep{opacity:.25;}
.bw-sw__theme{background:none;border:0;padding:.1rem .2rem;opacity:.62;border-left:1px solid var(--line);margin-left:.15rem;padding-left:.6rem;}
.bw-sw__theme:hover{opacity:1;}
[data-theme="light"] .bw-sw__moon{display:inline;}
[data-theme="light"] .bw-sw__sun{display:none;}
[data-theme="dark"] .bw-sw__sun{display:inline;}
[data-theme="dark"] .bw-sw__moon{display:none;}
@media (max-width:560px){.bw-sw{font-size:.66rem;gap:.4rem;padding:.45rem .6rem;}.bw-sw__eyebrow{display:none;}}
`;

// Theme-only control for the live site (no design links).
export function themeToggle() {
  return `
<button class="bw-theme" onclick="__bwToggle()" aria-label="Toggle light or dark">
  <span class="bw-theme__l">Light</span><span class="bw-theme__d">Dark</span>
</button>`;
}

export const THEME_CSS = `
.bw-theme{position:fixed;right:18px;bottom:18px;z-index:9999;
  font-family:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.68rem;letter-spacing:.09em;text-transform:uppercase;
  background:var(--sw-bg,var(--card,var(--bg)));color:var(--fg);
  border:1px solid var(--line);border-radius:999px;padding:.5rem .85rem;cursor:pointer;
  box-shadow:0 6px 24px -10px rgba(0,0,0,.45);backdrop-filter:blur(8px);transition:border-color .15s;}
.bw-theme:hover{border-color:var(--accent);}
[data-theme="light"] .bw-theme__d{display:inline;}
[data-theme="light"] .bw-theme__l{display:none;}
[data-theme="dark"] .bw-theme__l{display:inline;}
[data-theme="dark"] .bw-theme__d{display:none;}
`;

export const META_DESC =
  "Bavly Shehata, Software Engineer II at Microsoft. High-scale backends and distributed systems, production machine learning, and AI-assisted development.";

// Assembles a complete HTML document.
export function page({ design, title, styles, body, preview = true }) {
  return `<!doctype html>
<html lang="en" data-design="${design}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${META_DESC}">
<meta name="author" content="Bavly Shehata">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${META_DESC}">
<meta property="og:type" content="website">
<meta name="color-scheme" content="light dark">
<link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/jetbrains-mono.woff2">
${THEME_SCRIPT}
<style>
${FONT_FACES}
${RESET}
${SWITCHER_CSS}
${THEME_CSS}
${styles}
</style>
</head>
<body>
${body}
${preview ? switcher(design) : themeToggle()}
</body>
</html>`;
}

// Small helpers shared by templates.
export const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
