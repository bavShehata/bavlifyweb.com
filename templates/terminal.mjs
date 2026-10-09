import { page } from "../shared.mjs";

export function render(c) {
  const prompt = (cmd) =>
    `<div class="tm-cmd"><span class="tm-user">visitor@bavlifyweb</span><span class="tm-sep">:</span><span class="tm-path">~</span><span class="tm-dollar">$</span> <span class="tm-typed">${cmd}</span></div>`;

  const metrics = c.metrics
    .map((m) => {
      const dots = ".".repeat(Math.max(3, 22 - m.label.length));
      return `<div class="tm-stat"><span class="tm-stat__k">${m.label} <span class="tm-dots">${dots}</span></span><span class="tm-stat__v">${m.figure}</span><span class="tm-stat__s">${m.sub}</span></div>`;
    })
    .join("");

  const work = c.work
    .map((w, i) => {
      const n = String(i + 1).padStart(2, "0");
      const bullets = w.bullets.map((b) => `<li>${b}</li>`).join("");
      const tags = w.tags.map((t) => `<span>${t}</span>`).join("");
      return `
      <article class="tm-job" id="${w.id}">
        <div class="tm-job__head">
          <span class="tm-job__n">[${n}]</span>
          <h3>${w.title}</h3>
        </div>
        <p class="tm-job__kicker"># ${w.kicker}</p>
        <p class="tm-job__blurb">${w.blurb}</p>
        <ul class="tm-job__list">${bullets}</ul>
        <div class="tm-tags">${tags}</div>
      </article>`;
    })
    .join("");

  const skills = c.skills
    .map(
      (s) => `
      <div class="tm-skill">
        <div class="tm-skill__dir">${s.group.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "")}/</div>
        <div class="tm-skill__files">${s.items
          .map((it) => `<span>${it}</span>`)
          .join("")}</div>
      </div>`
    )
    .join("");

  const background = c.background
    .map(
      (b) => `
      <div class="tm-commit">
        <span class="tm-commit__hash">${b.period}</span>
        <div class="tm-commit__body">
          <h4>${b.role} <span>@ ${b.org}</span></h4>
          <p>${b.note}</p>
        </div>
      </div>`
    )
    .join("");

  const honors = c.honors.map((h) => `<li>${h}</li>`).join("");

  const about = c.about.map((p) => `<p>${p}</p>`).join("");

  const body = `
  <div class="tm-win">
    <header class="tm-bar">
      <div class="tm-lights"><span></span><span></span><span></span></div>
      <div class="tm-title">bavly@microsoft: ~/portfolio</div>
      <div class="tm-barend">zsh</div>
    </header>

    <main class="tm">
      <section class="tm-hero">
        ${prompt("whoami")}
        <h1 class="tm-name">${c.name}<span class="tm-cursor">_</span></h1>
        <p class="tm-role">${c.role} @ ${c.company} &middot; ${c.location} &middot; ${c.availability}</p>
        <p class="tm-lead">${c.lead}</p>
        <p class="tm-sub">${c.sub}</p>
      </section>

      <section class="tm-sec">
        ${prompt("stats --service")}
        <div class="tm-stats">${metrics}</div>
      </section>

      <section class="tm-sec" id="work">
        ${prompt("./list-work --verbose")}
        <div class="tm-jobs">${work}</div>
      </section>

      <section class="tm-sec" id="about">
        ${prompt("cat about.md")}
        <div class="tm-about">${about}</div>
        <div class="tm-now">${prompt("uptime")}<p><span class="tm-ok">now</span> &rarr; ${c.now}</p></div>
      </section>

      <section class="tm-sec" id="skills">
        ${prompt("ls -R skills/")}
        <div class="tm-skills">${skills}</div>
      </section>

      <section class="tm-sec" id="background">
        ${prompt("git log --oneline --career")}
        <div class="tm-commits">${background}</div>
        <div class="tm-honors"><p class="tm-honors__h"># earlier recognition</p><ul>${honors}</ul></div>
        <p class="tm-personal">// off-hours: ${c.personal.join(", ").toLowerCase()}</p>
      </section>

      <section class="tm-sec" id="contact">
        ${prompt("contact --open")}
        <p class="tm-contact__line">${c.contact.blurb}</p>
        <div class="tm-contact">
          <a href="mailto:${c.contact.email}"><span>email</span>${c.contact.email}</a>
          <a href="${c.contact.linkedin.url}"><span>linkedin</span>${c.contact.linkedin.label}</a>
          <a href="${c.contact.github.url}"><span>github</span>${c.contact.github.label}</a>
        </div>
        <div class="tm-foot">${prompt("exit")}<span class="tm-foot__c">&copy; ${c.year} ${c.name} &middot; built from scratch</span></div>
      </section>
    </main>
  </div>`;

  const styles = `
  :root[data-theme="dark"]{
    --bg:#0a0e0c; --fg:#c7dacb; --muted:#6d8277; --accent:#46d369;
    --line:rgba(120,160,135,.18); --card:#0e1411; --sw-bg:#0e1411; --win:#0e1311;
  }
  :root{
    --bg:#e8e6da; --fg:#18231c; --muted:#5a6b5f; --accent:#1c7d3f;
    --line:rgba(20,30,22,.17); --card:#dcdacd; --sw-bg:#dcdacd; --win:#dedccf;
  }
  html,body{background:var(--bg);color:var(--fg);}
  body{font-family:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.95rem;line-height:1.5;transition:background .3s,color .3s;}
  .tm-win{max-width:960px;margin:clamp(1rem,3vw,2.5rem) auto;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:var(--win);box-shadow:0 30px 80px -40px rgba(0,0,0,.6);}
  .tm-bar{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:1rem;padding:.65rem 1rem;background:var(--card);border-bottom:1px solid var(--line);backdrop-filter:blur(6px);}
  .tm-lights{display:flex;gap:.45rem;}
  .tm-lights span{width:11px;height:11px;border-radius:50%;background:var(--line);}
  .tm-lights span:nth-child(1){background:#ff5f57;}
  .tm-lights span:nth-child(2){background:#febc2e;}
  .tm-lights span:nth-child(3){background:#28c840;}
  .tm-title{flex:1;text-align:center;font-size:.76rem;color:var(--muted);}
  .tm-barend{font-size:.72rem;color:var(--muted);opacity:.7;}
  .tm{padding:clamp(1.3rem,4vw,2.8rem) clamp(1.1rem,4vw,2.8rem) 3rem;}

  .tm-cmd{color:var(--muted);margin:.2rem 0 .8rem;font-size:.9rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .tm-user{color:var(--accent);}
  .tm-sep{opacity:.6;}
  .tm-path{color:var(--fg);opacity:.8;}
  .tm-dollar{margin:0 .4rem 0 .1rem;color:var(--muted);}
  .tm-typed{color:var(--fg);}

  .tm-hero{padding-bottom:1.5rem;border-bottom:1px solid var(--line);}
  .tm-name{font-size:clamp(2.2rem,7vw,4.2rem);line-height:1;font-weight:700;letter-spacing:-.02em;}
  .tm-cursor{color:var(--accent);animation:tmblink 1.1s steps(1) infinite;}
  @keyframes tmblink{50%{opacity:0;}}
  .tm-role{margin-top:.7rem;color:var(--accent);font-size:.82rem;}
  .tm-lead{margin-top:1.1rem;font-size:clamp(1.05rem,2.3vw,1.4rem);line-height:1.4;max-width:40ch;color:var(--fg);}
  .tm-sub{margin-top:.9rem;color:var(--muted);max-width:68ch;}

  .tm-sec{padding:2.2rem 0;border-bottom:1px solid var(--line);}
  .tm-sec:last-child{border-bottom:0;}

  .tm-stats{display:grid;gap:.1rem;}
  .tm-stat{display:grid;grid-template-columns:1fr auto;align-items:baseline;column-gap:1rem;padding:.4rem .6rem;border-radius:4px;}
  .tm-stat:hover{background:var(--card);}
  .tm-stat__k{color:var(--muted);text-transform:uppercase;font-size:.78rem;letter-spacing:.03em;}
  .tm-dots{opacity:.35;}
  .tm-stat__v{color:var(--accent);font-weight:700;font-size:1.25rem;grid-row:span 2;align-self:center;}
  .tm-stat__s{color:var(--muted);font-size:.72rem;opacity:.75;grid-column:1;}

  .tm-jobs{display:grid;gap:1.6rem;}
  .tm-job{border:1px solid var(--line);border-radius:8px;padding:1.3rem;background:var(--card);transition:border-color .2s,transform .2s;}
  .tm-job:hover{border-color:var(--accent);transform:translateY(-2px);}
  .tm-job__head{display:flex;align-items:baseline;gap:.7rem;}
  .tm-job__n{color:var(--accent);font-size:.85rem;}
  .tm-job__head h3{font-size:clamp(1.15rem,2.6vw,1.5rem);font-weight:700;letter-spacing:-.01em;}
  .tm-job__kicker{color:var(--accent);opacity:.85;font-size:.76rem;margin:.5rem 0 .6rem;}
  .tm-job__blurb{color:var(--fg);margin-bottom:.8rem;max-width:66ch;}
  .tm-job__list{display:grid;gap:.45rem;max-width:72ch;}
  .tm-job__list li{position:relative;padding-left:1.4rem;color:var(--muted);font-size:.9rem;}
  .tm-job__list li::before{content:"\\203a";position:absolute;left:.2rem;color:var(--accent);}
  .tm-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:1rem;}
  .tm-tags span{font-size:.68rem;color:var(--muted);border:1px solid var(--line);border-radius:4px;padding:.2rem .5rem;}
  .tm-tags span::before{content:"#";color:var(--accent);opacity:.6;}

  .tm-about p{max-width:70ch;margin-bottom:.9rem;color:var(--fg);}
  .tm-about p:first-child{color:var(--fg);}
  .tm-now{margin-top:1.2rem;}
  .tm-now p{color:var(--muted);}
  .tm-ok{color:var(--accent);}

  .tm-skills{display:grid;grid-template-columns:repeat(2,1fr);gap:1.2rem;}
  .tm-skill__dir{color:var(--accent);font-size:.84rem;margin-bottom:.5rem;}
  .tm-skill__files{display:flex;flex-wrap:wrap;gap:.35rem;}
  .tm-skill__files span{font-size:.78rem;color:var(--muted);background:var(--card);border:1px solid var(--line);border-radius:4px;padding:.2rem .5rem;}

  .tm-commit{display:grid;grid-template-columns:7rem 1fr;gap:1rem;padding:.9rem 0;border-top:1px dashed var(--line);}
  .tm-commit:first-child{border-top:0;}
  .tm-commit__hash{color:var(--accent);font-size:.8rem;opacity:.9;padding-top:.15rem;}
  .tm-commit__body h4{font-size:1.05rem;font-weight:700;}
  .tm-commit__body h4 span{color:var(--muted);font-weight:400;}
  .tm-commit__body p{color:var(--muted);font-size:.88rem;margin-top:.3rem;max-width:72ch;}
  .tm-honors{margin-top:1.2rem;}
  .tm-honors__h{color:var(--accent);opacity:.85;font-size:.78rem;margin-bottom:.5rem;}
  .tm-honors ul{display:grid;gap:.4rem;}
  .tm-honors li{position:relative;padding-left:1.4rem;color:var(--muted);font-size:.88rem;}
  .tm-honors li::before{content:"\\203a";position:absolute;left:.2rem;color:var(--accent);}
  .tm-personal{margin-top:1.3rem;color:var(--muted);opacity:.8;font-size:.82rem;}

  .tm-contact__line{font-size:clamp(1.1rem,2.6vw,1.5rem);max-width:40ch;margin-bottom:1.2rem;}
  .tm-contact{display:grid;gap:.5rem;}
  .tm-contact a{display:grid;grid-template-columns:7rem 1fr;gap:.6rem;text-decoration:none;padding:.5rem .6rem;border:1px solid var(--line);border-radius:6px;background:var(--card);transition:border-color .2s;}
  .tm-contact a:hover{border-color:var(--accent);}
  .tm-contact a span{color:var(--accent);font-size:.78rem;}
  .tm-foot{margin-top:1.6rem;}
  .tm-foot__c{color:var(--muted);font-size:.78rem;opacity:.7;}

  @media (max-width:720px){
    .tm-skills{grid-template-columns:1fr;}
    .tm-commit{grid-template-columns:1fr;gap:.2rem;}
    .tm-contact a{grid-template-columns:1fr;gap:.1rem;}
  }`;

  return page({ design: "terminal", title: `${c.name} \u2014 ${c.role}`, styles, body });
}
