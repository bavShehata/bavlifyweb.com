import { page } from "../shared.mjs";

export function render(c, opts = {}) {
  const metrics = c.metrics
    .map(
      (m) => `
      <div class="ed-ledger__row">
        <div class="ed-ledger__fig">${m.figure}</div>
        <div class="ed-ledger__meta"><span class="ed-ledger__label">${m.label}</span><span class="ed-ledger__sub">${m.sub}</span></div>
      </div>`
    )
    .join("");

  const work = c.work
    .map((w, i) => {
      const n = String(i + 1).padStart(2, "0");
      const bullets = w.bullets.map((b) => `<li>${b}</li>`).join("");
      const tags = w.tags.map((t) => `<span>${t}</span>`).join("");
      return `
      <article class="ed-piece" id="${w.id}">
        <div class="ed-piece__num">${n}</div>
        <div class="ed-piece__body">
          <p class="ed-kicker">${w.kicker}</p>
          <h3 class="ed-piece__title">${w.title}</h3>
          <p class="ed-piece__blurb">${w.blurb}</p>
          <ul class="ed-piece__list">${bullets}</ul>
          <div class="ed-tags">${tags}</div>
        </div>
      </article>`;
    })
    .join("");

  const skills = c.skills
    .map(
      (s) => `
      <div class="ed-skill">
        <h4>${s.group}</h4>
        <p>${s.items.join(" \u00b7 ")}</p>
      </div>`
    )
    .join("");

  const background = c.background
    .map(
      (b) => `
      <div class="ed-bg__row">
        <div class="ed-bg__period">${b.period}</div>
        <div class="ed-bg__main">
          <h4>${b.role} <span>/ ${b.org}</span></h4>
          <p>${b.note}</p>
        </div>
      </div>`
    )
    .join("");

  const honors = c.honors.map((h) => `<li>${h}</li>`).join("");

  const about = c.about.map((p) => `<p>${p}</p>`).join("");

  const body = `
  <main class="ed">
    <header class="ed-mast">
      <div class="ed-mast__top">
        <span>${c.role}, ${c.company}</span>
        <span class="ed-dot"></span>
        <span>${c.location}</span>
        <span class="ed-dot"></span>
        <span>${c.availability}</span>
      </div>
      <h1 class="ed-mast__name">${c.name}</h1>
      <nav class="ed-nav">
        ${c.nav.map((n) => `<a href="${n.href}">${n.label}</a>`).join("")}
      </nav>
    </header>

    <section class="ed-hero">
      <div class="ed-hero__lead">
        <p class="ed-lead"><span class="ed-drop">I</span>${c.lead.slice(1)}</p>
        <p class="ed-sub">${c.sub}</p>
      </div>
      <aside class="ed-ledger" aria-label="Key figures">
        ${metrics}
      </aside>
    </section>

    <section class="ed-section" id="work">
      <div class="ed-eyebrow"><span>&sect; 01</span> Selected work</div>
      <div class="ed-pieces">${work}</div>
    </section>

    <section class="ed-section ed-section--split" id="about">
      <div class="ed-eyebrow"><span>&sect; 02</span> About</div>
      <div class="ed-about">
        <div class="ed-about__prose">${about}</div>
        <div class="ed-about__aside">
          <div class="ed-now">
            <span class="ed-now__tag">Now</span>
            <p>${c.now}</p>
          </div>
          <div class="ed-personal">
            ${c.personal.map((p) => `<span>${p}</span>`).join("")}
          </div>
        </div>
      </div>
    </section>

    <section class="ed-section" id="skills">
      <div class="ed-eyebrow"><span>&sect; 03</span> Capabilities</div>
      <div class="ed-skills">${skills}</div>
    </section>

    <section class="ed-section" id="background">
      <div class="ed-eyebrow"><span>&sect; 04</span> Background</div>
      <div class="ed-bg">${background}</div>
      <div class="ed-honors">
        <span class="ed-honors__label">Earlier recognition</span>
        <ul>${honors}</ul>
      </div>
    </section>

    <section class="ed-section ed-contact" id="contact">
      <div class="ed-eyebrow"><span>&sect; 05</span> Contact</div>
      <p class="ed-contact__line">${c.contact.blurb}</p>
      <div class="ed-contact__links">
        <a href="mailto:${c.contact.email}">${c.contact.email}</a>
        <a href="${c.contact.linkedin.url}">${c.contact.linkedin.label}</a>
        <a href="${c.contact.github.url}">${c.contact.github.label}</a>
      </div>
    </section>

    <footer class="ed-foot">
      <span>&copy; ${c.year} ${c.name}</span>
    </footer>
  </main>`;

  const styles = `
  :root{
    --bg:#f4efe3; --fg:#201c16; --muted:#6c6557; --accent:#8a2b2b;
    --line:rgba(32,28,22,.17); --card:#ede5d5; --sw-bg:#f4efe3;
  }
  :root[data-theme="dark"]{
    --bg:#16130f; --fg:#ece3d2; --muted:#9d9381; --accent:#d1735f;
    --line:rgba(236,227,210,.16); --card:#1e1a14; --sw-bg:#1e1a14;
  }
  html,body{background:var(--bg);color:var(--fg);}
  body{font-family:"Newsreader",Georgia,"Times New Roman",serif;font-size:1.09rem;line-height:1.62;transition:background .3s,color .3s;}
  .ed{max-width:1080px;margin:0 auto;padding:clamp(1.5rem,4vw,3.2rem) clamp(1.2rem,5vw,3.5rem) 6rem;}
  .ed-kicker,.ed-eyebrow,.ed-mast__top,.ed-nav,.ed-ledger__label,.ed-ledger__sub,.ed-tags,.ed-now__tag,.ed-foot,.ed-bg__period{
    font-family:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace;}

  /* Masthead */
  .ed-mast{border-bottom:3px double var(--line);padding-bottom:1.2rem;}
  .ed-mast__top{display:flex;align-items:center;gap:.3rem .7rem;flex-wrap:wrap;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);line-height:1.35;}
  .ed-dot{width:3px;height:3px;border-radius:50%;background:currentColor;opacity:.5;}
  .ed-mast__name{font-family:"Fraunces",serif;font-optical-sizing:auto;font-weight:600;
    font-size:clamp(3rem,11vw,7.5rem);line-height:1;letter-spacing:-.02em;margin:.75rem 0 0;padding-bottom:.06em;}
  .ed-nav{display:flex;gap:1.4rem;flex-wrap:wrap;font-size:.74rem;letter-spacing:.12em;text-transform:uppercase;margin-top:1.7rem;}
  .ed-nav a{text-decoration:none;color:var(--muted);transition:color .15s;}
  .ed-nav a:hover{color:var(--accent);}

  /* Hero */
  .ed-hero{display:grid;grid-template-columns:1.55fr 1fr;gap:clamp(1.5rem,4vw,3.5rem);padding:2.6rem 0;border-bottom:1px solid var(--line);}
  .ed-lead{font-family:"Fraunces",serif;font-weight:380;font-size:clamp(1.5rem,3vw,2.15rem);line-height:1.28;letter-spacing:-.01em;}
  .ed-drop{float:left;font-family:"Fraunces",serif;font-weight:600;font-size:3.9em;line-height:.72;padding:.06em .08em 0 0;color:var(--accent);}
  .ed-sub{margin-top:1.3rem;color:var(--muted);font-size:1.02rem;max-width:46ch;}
  .ed-ledger{align-self:start;border:1px solid var(--line);background:var(--card);}
  .ed-ledger__row{display:flex;align-items:baseline;gap:.9rem;padding:.85rem 1.1rem;border-bottom:1px solid var(--line);}
  .ed-ledger__row:last-child{border-bottom:0;}
  .ed-ledger__fig{font-family:"Fraunces",serif;font-weight:600;font-size:1.7rem;letter-spacing:-.01em;min-width:3.4em;color:var(--accent);}
  .ed-ledger__meta{display:flex;flex-direction:column;}
  .ed-ledger__label{font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;}
  .ed-ledger__sub{font-size:.66rem;color:var(--muted);margin-top:.15rem;}

  /* Section scaffold */
  .ed-section{padding:3.2rem 0;border-bottom:1px solid var(--line);}
  .ed-eyebrow{display:flex;align-items:baseline;gap:.9rem;font-size:.74rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin-bottom:2rem;}
  .ed-eyebrow span{color:var(--accent);}

  /* Work */
  .ed-piece{display:grid;grid-template-columns:4.5rem 1fr;gap:1rem;padding:1.8rem 0;border-top:1px solid var(--line);}
  .ed-piece:first-child{border-top:0;padding-top:0;}
  .ed-piece__num{font-family:"Fraunces",serif;font-weight:500;font-size:1.5rem;color:var(--muted);}
  .ed-kicker{font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:.5rem;}
  .ed-piece__title{font-family:"Fraunces",serif;font-weight:580;font-size:clamp(1.6rem,3.2vw,2.3rem);line-height:1.05;letter-spacing:-.015em;}
  .ed-piece__blurb{margin:.7rem 0 .9rem;font-size:1.12rem;max-width:62ch;}
  .ed-piece__list{display:grid;gap:.5rem;max-width:66ch;}
  .ed-piece__list li{position:relative;padding-left:1.3rem;color:var(--muted);}
  .ed-piece__list li::before{content:"\\2014";position:absolute;left:0;color:var(--accent);}
  .ed-tags{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.1rem;}
  .ed-tags span{font-size:.66rem;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:.25rem .6rem;}

  /* About */
  .ed-about{display:grid;grid-template-columns:1.6fr 1fr;gap:clamp(1.5rem,4vw,3.5rem);}
  .ed-about__prose p{margin-bottom:1.1rem;max-width:58ch;}
  .ed-about__prose p:first-child{font-size:1.2rem;}
  .ed-now{border-left:2px solid var(--accent);padding-left:1rem;margin-bottom:1.6rem;}
  .ed-now__tag{font-size:.64rem;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);}
  .ed-now p{margin-top:.35rem;color:var(--muted);font-size:.98rem;}
  .ed-personal{display:flex;flex-direction:column;gap:.55rem;}
  .ed-personal span{font-style:italic;color:var(--muted);}
  .ed-personal span::before{content:"\\2022  ";color:var(--accent);font-style:normal;}

  /* Skills */
  .ed-skills{display:grid;grid-template-columns:repeat(2,1fr);gap:1.6rem 3rem;}
  .ed-skill h4{font-family:"Fraunces",serif;font-weight:560;font-size:1.25rem;margin-bottom:.35rem;}
  .ed-skill p{color:var(--muted);font-size:1rem;}

  /* Background */
  .ed-bg__row{display:grid;grid-template-columns:8rem 1fr;gap:1.2rem;padding:1.3rem 0;border-top:1px solid var(--line);}
  .ed-bg__row:first-child{border-top:0;}
  .ed-bg__period{font-size:.78rem;color:var(--muted);padding-top:.3rem;}
  .ed-bg__main h4{font-family:"Fraunces",serif;font-weight:560;font-size:1.35rem;}
  .ed-bg__main h4 span{color:var(--muted);font-weight:400;}
  .ed-bg__main p{color:var(--muted);margin-top:.35rem;max-width:68ch;}
  .ed-honors{margin-top:1.8rem;padding-top:1.4rem;border-top:1px solid var(--line);}
  .ed-honors__label{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);}
  .ed-honors ul{margin-top:.9rem;display:grid;gap:.55rem;}
  .ed-honors li{position:relative;padding-left:1.5rem;color:var(--muted);max-width:70ch;}
  .ed-honors li::before{content:"\\2726";position:absolute;left:0;top:.15em;color:var(--accent);font-size:.85em;}

  /* Contact */
  .ed-contact__line{font-family:"Fraunces",serif;font-weight:420;font-size:clamp(1.8rem,4.5vw,3rem);line-height:1.1;letter-spacing:-.015em;max-width:20ch;}
  .ed-contact__links{display:flex;flex-wrap:wrap;gap:1.6rem;margin-top:1.6rem;font-family:"JetBrains Mono",monospace;font-size:.9rem;}
  .ed-contact__links a{text-decoration:none;border-bottom:1px solid var(--accent);padding-bottom:.15rem;transition:color .15s;}
  .ed-contact__links a:hover{color:var(--accent);}

  .ed-foot{display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;padding-top:2rem;font-size:.7rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);}

  @media (max-width:820px){
    .ed-hero,.ed-about{grid-template-columns:1fr;gap:1.6rem;}
    .ed-skills{grid-template-columns:1fr;gap:1.4rem;}
    .ed-bg__row{grid-template-columns:1fr;gap:.2rem;}
    .ed-piece{grid-template-columns:1fr;gap:.45rem;}
    .ed-piece__num{font-size:1rem;}
    .ed-ledger{margin-top:.3rem;}
  }
  @media (max-width:560px){
    .ed{padding-bottom:4.5rem;}
    .ed-section{padding:1.9rem 0;}
    .ed-eyebrow{margin-bottom:1.25rem;}
    .ed-hero{padding:1.7rem 0;}
    .ed-mast{padding-bottom:1rem;}
    .ed-mast__name{font-size:clamp(2.6rem,13vw,4rem);}
    .ed-nav{margin-top:1.3rem;gap:1.1rem;}
    .ed-lead{font-size:1.5rem;line-height:1.3;}
    .ed-drop{font-size:3.3em;}
    .ed-sub{margin-top:1rem;font-size:1rem;}
    .ed-piece{padding:1.5rem 0;}
    .ed-piece__title{font-size:1.55rem;}
    .ed-piece__blurb{font-size:1.05rem;}
    .ed-ledger__fig{font-size:1.5rem;}
    .ed-contact__links{gap:.9rem 1.4rem;}
  }`;

  return page({ design: "editorial", title: `${c.name} \u2014 ${c.role}`, styles, body, preview: opts.preview !== false });
}
