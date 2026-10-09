import { page } from "../shared.mjs";

export function render(c) {
  const metrics = c.metrics
    .map(
      (m) => `
      <div class="mo-metric">
        <div class="mo-metric__fig">${m.figure}</div>
        <div class="mo-metric__label">${m.label}</div>
        <div class="mo-metric__sub">${m.sub}</div>
      </div>`
    )
    .join("");

  const work = c.work
    .map((w, i) => {
      const n = String(i + 1).padStart(2, "0");
      const bullets = w.bullets.map((b) => `<li>${b}</li>`).join("");
      const tags = w.tags.map((t) => `<span>${t}</span>`).join("");
      return `
      <article class="mo-work" id="${w.id}">
        <div class="mo-work__index">${n}</div>
        <div class="mo-work__main">
          <p class="mo-work__kicker">${w.kicker}</p>
          <h3 class="mo-work__title">${w.title}</h3>
          <p class="mo-work__blurb">${w.blurb}</p>
          <ul class="mo-work__list">${bullets}</ul>
          <div class="mo-tags">${tags}</div>
        </div>
      </article>`;
    })
    .join("");

  const skills = c.skills
    .map(
      (s) => `
      <div class="mo-skill">
        <h4>${s.group}</h4>
        <ul>${s.items.map((it) => `<li>${it}</li>`).join("")}</ul>
      </div>`
    )
    .join("");

  const background = c.background
    .map(
      (b) => `
      <div class="mo-bg__row">
        <div class="mo-bg__period">${b.period}</div>
        <div class="mo-bg__role"><h4>${b.role}</h4><span>${b.org}</span></div>
        <p class="mo-bg__note">${b.note}</p>
      </div>`
    )
    .join("");

  const about = c.about.map((p) => `<p>${p}</p>`).join("");

  const sectionLabel = (n, t) =>
    `<div class="mo-label"><span class="mo-label__n">${n}</span><span class="mo-label__t">${t}</span></div>`;

  const body = `
  <main class="mo">
    <header class="mo-top">
      <span class="mo-top__mark">${c.initials}</span>
      <nav class="mo-top__nav">${c.nav
        .map((n) => `<a href="${n.href}">${n.label}</a>`)
        .join("")}</nav>
    </header>

    <section class="mo-hero">
      <p class="mo-hero__meta">${c.role}, ${c.company} &mdash; ${c.location}</p>
      <h1 class="mo-hero__name">${c.name}</h1>
      <p class="mo-hero__lead">${c.lead}</p>
      <p class="mo-hero__sub">${c.sub}</p>
    </section>

    <section class="mo-metrics">${metrics}</section>

    <section class="mo-section" id="work">
      ${sectionLabel("001", "Selected work")}
      <div class="mo-works">${work}</div>
    </section>

    <section class="mo-section" id="about">
      ${sectionLabel("002", "About")}
      <div class="mo-about">
        <div class="mo-about__prose">${about}</div>
        <div class="mo-about__side">
          <p class="mo-now"><span>Now</span>${c.now}</p>
          <ul class="mo-personal">${c.personal
            .map((p) => `<li>${p}</li>`)
            .join("")}</ul>
        </div>
      </div>
    </section>

    <section class="mo-section" id="skills">
      ${sectionLabel("003", "Capabilities")}
      <div class="mo-skills">${skills}</div>
    </section>

    <section class="mo-section" id="background">
      ${sectionLabel("004", "Background")}
      <div class="mo-bg">${background}</div>
    </section>

    <section class="mo-section mo-contact" id="contact">
      ${sectionLabel("005", "Contact")}
      <p class="mo-contact__line">${c.contact.blurb}</p>
      <div class="mo-contact__links">
        <a href="mailto:${c.contact.email}">${c.contact.email}<span>&rarr;</span></a>
        <a href="${c.contact.linkedin.url}">${c.contact.linkedin.label}<span>&rarr;</span></a>
        <a href="${c.contact.github.url}">${c.contact.github.label}<span>&rarr;</span></a>
      </div>
    </section>

    <footer class="mo-foot"><span>&copy; ${c.year} ${c.name}</span><span>Cairo</span></footer>
  </main>`;

  const styles = `
  :root{
    --bg:#fafafa; --fg:#0a0a0b; --muted:#8a8a90; --accent:#1f3bf5;
    --line:rgba(10,10,12,.11); --card:#f1f1ef; --sw-bg:#ffffff;
  }
  :root[data-theme="dark"]{
    --bg:#09090a; --fg:#f3f3f4; --muted:#83838a; --accent:#6f88ff;
    --line:rgba(255,255,255,.13); --card:#141416; --sw-bg:#141416;
  }
  html,body{background:var(--bg);color:var(--fg);}
  body{font-family:"Space Grotesk",system-ui,-apple-system,"Segoe UI",sans-serif;font-size:1.05rem;line-height:1.55;letter-spacing:-.005em;transition:background .3s,color .3s;}
  .mo{max-width:1180px;margin:0 auto;padding:0 clamp(1.3rem,5vw,4rem) 7rem;}
  .mo-label__n,.mo-label__t,.mo-hero__meta,.mo-metric__label,.mo-metric__sub,.mo-work__index,.mo-work__kicker,.mo-tags,.mo-top__mark,.mo-top__nav,.mo-now span,.mo-bg__period,.mo-foot{
    font-family:"JetBrains Mono",ui-monospace,monospace;}

  .mo-top{display:flex;justify-content:space-between;align-items:center;padding:1.8rem 0;position:sticky;top:0;background:var(--bg);z-index:5;}
  .mo-top__mark{font-size:.9rem;font-weight:700;letter-spacing:.1em;border:1.5px solid var(--fg);padding:.25rem .45rem;border-radius:3px;}
  .mo-top__nav{display:flex;gap:1.5rem;}
  .mo-top__nav a{text-decoration:none;color:var(--muted);font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;transition:color .15s;}
  .mo-top__nav a:hover{color:var(--fg);}

  .mo-hero{padding:clamp(3rem,10vw,8rem) 0 clamp(2.5rem,6vw,5rem);}
  .mo-hero__meta{font-size:.76rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:1.5rem;}
  .mo-hero__name{font-size:clamp(3.4rem,15vw,12rem);font-weight:500;line-height:.86;letter-spacing:-.045em;}
  .mo-hero__lead{margin-top:clamp(2rem,5vw,3.5rem);font-size:clamp(1.5rem,3.4vw,2.6rem);font-weight:400;line-height:1.22;letter-spacing:-.02em;max-width:24ch;}
  .mo-hero__lead::first-letter{color:var(--accent);}
  .mo-hero__sub{margin-top:1.5rem;color:var(--muted);font-size:1.1rem;max-width:52ch;}

  .mo-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border-top:1px solid var(--line);border-bottom:1px solid var(--line);}
  .mo-metric{background:var(--bg);padding:2rem 1.4rem;}
  .mo-metric__fig{font-size:clamp(2.2rem,4.5vw,3.4rem);font-weight:500;letter-spacing:-.03em;line-height:1;}
  .mo-metric__label{margin-top:.7rem;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--fg);}
  .mo-metric__sub{margin-top:.25rem;font-size:.66rem;letter-spacing:.05em;color:var(--muted);}

  .mo-section{padding:clamp(3.5rem,8vw,7rem) 0 0;}
  .mo-label{display:flex;align-items:baseline;gap:1rem;margin-bottom:clamp(2rem,4vw,3.5rem);}
  .mo-label__n{font-size:.72rem;color:var(--accent);}
  .mo-label__t{font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);}

  .mo-work{display:grid;grid-template-columns:5rem 1fr;gap:1.5rem;padding:clamp(2rem,4vw,3rem) 0;border-top:1px solid var(--line);}
  .mo-work__index{font-size:.85rem;color:var(--muted);padding-top:.5rem;}
  .mo-work__kicker{font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);margin-bottom:.9rem;}
  .mo-work__title{font-size:clamp(1.9rem,4.5vw,3.3rem);font-weight:500;line-height:1.02;letter-spacing:-.03em;}
  .mo-work__blurb{margin:1rem 0 1.3rem;font-size:1.2rem;color:var(--fg);max-width:60ch;}
  .mo-work__list{display:grid;gap:.6rem;max-width:66ch;}
  .mo-work__list li{position:relative;padding-left:1.5rem;color:var(--muted);}
  .mo-work__list li::before{content:"";position:absolute;left:0;top:.65em;width:.5rem;height:1px;background:var(--accent);}
  .mo-tags{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1.4rem;}
  .mo-tags span{font-size:.66rem;letter-spacing:.03em;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:.25rem .7rem;}

  .mo-about{display:grid;grid-template-columns:1.7fr 1fr;gap:clamp(2rem,5vw,4rem);}
  .mo-about__prose p{font-size:1.25rem;line-height:1.5;margin-bottom:1.3rem;max-width:54ch;}
  .mo-about__prose p:first-child{font-size:1.55rem;letter-spacing:-.01em;}
  .mo-now{border-top:2px solid var(--accent);padding-top:.9rem;margin-bottom:1.8rem;color:var(--muted);}
  .mo-now span{display:block;font-size:.66rem;letter-spacing:.14em;text-transform:uppercase;color:var(--fg);margin-bottom:.4rem;}
  .mo-personal li{color:var(--muted);padding:.35rem 0;border-bottom:1px solid var(--line);}

  .mo-skills{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(1.5rem,4vw,3rem);}
  .mo-skill h4{font-size:1.4rem;font-weight:500;letter-spacing:-.02em;margin-bottom:1rem;}
  .mo-skill ul{display:flex;flex-wrap:wrap;gap:.4rem;}
  .mo-skill li{font-size:.9rem;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:.3rem .8rem;}

  .mo-bg__row{display:grid;grid-template-columns:6rem 14rem 1fr;gap:1.5rem;padding:1.6rem 0;border-top:1px solid var(--line);align-items:start;}
  .mo-bg__period{font-size:.8rem;color:var(--muted);padding-top:.3rem;}
  .mo-bg__role h4{font-size:1.25rem;font-weight:500;letter-spacing:-.01em;}
  .mo-bg__role span{font-size:.85rem;color:var(--muted);}
  .mo-bg__note{color:var(--muted);max-width:60ch;}

  .mo-contact__line{font-size:clamp(2rem,5.5vw,4rem);font-weight:500;line-height:1.05;letter-spacing:-.03em;max-width:18ch;}
  .mo-contact__links{display:grid;gap:0;margin-top:2.5rem;max-width:620px;}
  .mo-contact__links a{display:flex;justify-content:space-between;align-items:center;text-decoration:none;font-size:clamp(1.1rem,2.5vw,1.6rem);padding:1.1rem 0;border-top:1px solid var(--line);transition:padding .2s,color .2s;}
  .mo-contact__links a:last-child{border-bottom:1px solid var(--line);}
  .mo-contact__links a span{color:var(--accent);transition:transform .2s;}
  .mo-contact__links a:hover{color:var(--accent);padding-left:1rem;}
  .mo-contact__links a:hover span{transform:translateX(8px);}

  .mo-foot{display:flex;justify-content:space-between;margin-top:5rem;font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);}

  @media (max-width:860px){
    .mo-about{grid-template-columns:1fr;}
    .mo-skills{grid-template-columns:1fr;}
    .mo-metrics{grid-template-columns:repeat(2,1fr);}
    .mo-work{grid-template-columns:1fr;gap:.5rem;}
    .mo-work__index{padding-top:0;}
    .mo-bg__row{grid-template-columns:1fr;gap:.3rem;}
  }`;

  return page({ design: "monochrome", title: `${c.name} \u2014 ${c.role}`, styles, body });
}
