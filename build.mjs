import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { content } from "./content.mjs";
import { THEME_SCRIPT, FONT_FACES, RESET } from "./shared.mjs";
import { render as editorial } from "./templates/editorial.mjs";
import { render as terminal } from "./templates/terminal.mjs";
import { render as monochrome } from "./templates/monochrome.mjs";
import { render as brutalist } from "./templates/brutalist.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "public");
mkdirSync(out, { recursive: true });

const pages = {
  "editorial.html": editorial(content),
  "terminal.html": terminal(content),
  "monochrome.html": monochrome(content),
  "brutalist.html": brutalist(content),
};

const designs = [
  {
    id: "editorial",
    name: "Editorial",
    accent: "#8a2b2b",
    desc: "Warm paper, Fraunces serif, a printed-journal ledger of your numbers.",
    tag: "serif / print / data-forward",
    font: "Fraunces",
  },
  {
    id: "terminal",
    name: "Terminal",
    accent: "#46d369",
    desc: "A refined dark terminal: monospace, prompt-driven sections, window chrome.",
    tag: "monospace / dark / engineer",
    font: "JetBrains Mono",
  },
  {
    id: "monochrome",
    name: "Monochrome",
    accent: "#1f3bf5",
    desc: "Stark black and white, oversized Space Grotesk, gallery-grade whitespace.",
    tag: "minimal / grotesque / airy",
    font: "Space Grotesk",
  },
  {
    id: "brutalist",
    name: "Brutalist",
    accent: "#c6f23c",
    desc: "Bold uppercase, hard borders, offset shadows, a running marquee.",
    tag: "loud / high-contrast / confident",
    font: "Space Grotesk",
  },
];

const cards = designs
  .map(
    (d) => `
    <a class="g-card" href="${d.id}.html" style="--a:${d.accent}">
      <div class="g-card__top">
        <span class="g-card__swatch"></span>
        <span class="g-card__tag">${d.tag}</span>
      </div>
      <h2 class="g-card__name" style="font-family:'${d.font}',serif">${d.name}</h2>
      <p class="g-card__desc">${d.desc}</p>
      <span class="g-card__cta">View design &rarr;</span>
    </a>`
  )
  .join("");

const gallery = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${content.name} \u2014 choose a design</title>
<meta name="robots" content="noindex">
${THEME_SCRIPT}
<style>
${FONT_FACES}
${RESET}
:root{--bg:#f4efe3;--fg:#201c16;--muted:#6c6557;--accent:#8a2b2b;--line:rgba(32,28,22,.16);--card:#ece4d4;--sw-bg:#ece4d4;}
:root[data-theme="dark"]{--bg:#0d0d0f;--fg:#ececf0;--muted:#8a8a92;--accent:#c6f23c;--line:rgba(255,255,255,.13);--card:#161618;--sw-bg:#161618;}
html,body{background:var(--bg);color:var(--fg);}
body{font-family:"Space Grotesk",system-ui,-apple-system,"Segoe UI",sans-serif;line-height:1.5;min-height:100vh;}
.g-wrap{max-width:1100px;margin:0 auto;padding:clamp(2rem,6vw,5rem) clamp(1.3rem,5vw,3rem) 5rem;}
.g-head{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;flex-wrap:wrap;}
.g-eyebrow{font-family:"JetBrains Mono",monospace;font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);}
.g-title{font-family:"Fraunces",serif;font-weight:600;font-size:clamp(2.2rem,6vw,4rem);line-height:1;letter-spacing:-.02em;margin:.6rem 0 .5rem;}
.g-intro{color:var(--muted);max-width:60ch;font-size:1.08rem;}
.g-themebtn{font-family:"JetBrains Mono",monospace;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;background:none;border:1px solid var(--line);border-radius:999px;padding:.5rem .9rem;color:var(--fg);}
.g-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.3rem;margin-top:clamp(2rem,5vw,3.5rem);}
.g-card{position:relative;display:flex;flex-direction:column;gap:.8rem;text-decoration:none;color:inherit;
  border:1px solid var(--line);border-radius:14px;padding:1.8rem;background:var(--card);overflow:hidden;
  transition:transform .18s,border-color .18s,box-shadow .18s;}
.g-card::after{content:"";position:absolute;inset:0 0 auto 0;height:4px;background:var(--a);}
.g-card:hover{transform:translateY(-4px);border-color:var(--a);box-shadow:0 24px 50px -30px var(--a);}
.g-card__top{display:flex;align-items:center;justify-content:space-between;}
.g-card__swatch{width:2.4rem;height:2.4rem;border-radius:50%;background:var(--a);box-shadow:inset 0 0 0 1px rgba(0,0,0,.15);}
.g-card__tag{font-family:"JetBrains Mono",monospace;font-size:.66rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);}
.g-card__name{font-size:2.2rem;font-weight:600;letter-spacing:-.01em;}
.g-card__desc{color:var(--muted);flex:1;}
.g-card__cta{font-family:"JetBrains Mono",monospace;font-size:.8rem;color:var(--a);}
.g-note{margin-top:2.5rem;font-family:"JetBrains Mono",monospace;font-size:.76rem;color:var(--muted);border-top:1px solid var(--line);padding-top:1.3rem;line-height:1.7;}
.g-note b{color:var(--fg);font-weight:600;}
@media (max-width:720px){.g-grid{grid-template-columns:1fr;}}
</style>
</head>
<body>
<div class="g-wrap">
  <div class="g-head">
    <div>
      <p class="g-eyebrow">bavlifyweb.com \u00b7 revival preview</p>
      <h1 class="g-title">Four directions.</h1>
      <p class="g-intro">Same real content, four distinct designs. Open each, toggle light/dark, and hop between them using the switcher at the bottom of every page. Tell me which to ship (mix-and-match is fine).</p>
    </div>
    <button class="g-themebtn" onclick="__bwToggle()">Toggle theme</button>
  </div>
  <div class="g-grid">${cards}</div>
  <p class="g-note">
    <b>Next:</b> pick a winner (and any tweaks to color, type, or copy). Then I wire the chosen design to the live domain by fixing the dead Heroku DNS and deploying to Cloudflare Pages.<br>
    All four are hand-built static HTML/CSS, self-hosted fonts, no trackers, no third-party calls.
  </p>
</div>
</body>
</html>`;

for (const [name, html] of Object.entries(pages)) {
  writeFileSync(join(out, name), html, "utf8");
  console.log("wrote", name, `(${(html.length / 1024).toFixed(1)} KB)`);
}
writeFileSync(join(out, "gallery.html"), gallery, "utf8");
console.log("wrote gallery.html (design comparison)");
const home = editorial(content, { preview: false });
writeFileSync(join(out, "index.html"), home, "utf8");
console.log("wrote index.html (editorial, live homepage)");
console.log("done ->", out);
