import { page } from "../shared.mjs";

export function render(c) {
  const metrics = c.metrics
    .map(
      (m) => `
      <div class="br-metric">
        <div class="br-metric__fig">${m.figure}</div>
        <div class="br-metric__label">${m.label}</div>
        <div class="br-metric__sub">${m.sub}</div>
      </div>`
    )
    .join("");

  const work = c.work
    .map((w, i) => {
      const n = String(i + 1).padStart(2, "0");
      const bullets = w.bullets.map((b) => `<li>${b}</li>`).join("");
      const tags = w.tags.map((t) => `<span>${t}</span>`).join("");
      return `
      <article class="br-work" id="${w.id}">
        <div class="br-work__bar">
          <span class="br-work__n">${n}</span>
          <span class="br-work__kicker">${w.kicker}</span>
        </div>
        <h3 class="br-work__title">${w.title}</h3>
        <p class="br-work__blurb">${w.blurb}</p>
        <ul class="br-work__list">${bullets}</ul>
        <div class="br-tags">${tags}</div>
      </article>`;
    })
    .join("");

  const skills = c.skills
    .map(
      (s) => `
      <div class="br-skill">
        <h4>${s.group}</h4>
        <div class="br-skill__items">${s.items
          .map((it) => `<span>${it}</span>`)
          .join("")}</div>
      </div>`
    )
    .join("");

  const background = c.background
    .map(
      (b) => `
      <div class="br-bg__row">
        <div class="br-bg__period">${b.period}</div>
        <div class="br-bg__main">
          <h4>${b.role} <em>/ ${b.org}</em></h4>
          <p>${b.note}</p>
        </div>
      </div>`
    )
    .join("");

  const about = c.about.map((p) => `<p>${p}</p>`).join("");

  const marquee = [...c.skills.flatMap((s) => s.items), "Chess", "Privacy", "EndeavourOS"]
    .map((x) => `<span>${x}</span><span class="br-mq__star">&#10040;</span>`)
    .join("");

  const body = `
  <div class="br">
    <header class="br-head">
      <div class="br-head__name">${c.name}</div>
      <nav class="br-head__nav">${c.nav
        .map((n) => `<a href="${n.href}">${n.label}</a>`)
        .join("")}</nav>
    </header>

    <section class="br-hero">
      <div class="br-hero__meta">
        <span>${c.role}</span><span>${c.company}</span><span>${c.location}</span><span class="br-hero__badge">${c.availability}</span>
      </div>
      <h1 class="br-hero__head">I build high-scale backends, and ship the <mark>machine learning</mark> that makes them pay off.</h1>
      <p class="br-hero__sub">${c.sub}</p>
    </section>

    <section class="br-metrics">${metrics}</section>

    <div class="br-marquee" aria-hidden="true"><div class="br-mq__track">${marquee}${marquee}</div></div>

    <section class="br-section" id="work">
      <h2 class="br-h2"><span>01</span> Selected Work</h2>
      <div class="br-works">${work}</div>
    </section>

    <section class="br-section" id="about">
      <h2 class="br-h2"><span>02</span> About</h2>
      <div class="br-about">
        <div class="br-about__prose">${about}</div>
        <aside class="br-about__side">
          <div class="br-now"><span>NOW</span><p>${c.now}</p></div>
          <div class="br-personal">${c.personal
            .map((p) => `<span>${p}</span>`)
            .join("")}</div>
        </aside>
      </div>
    </section>

    <section class="br-section" id="skills">
      <h2 class="br-h2"><span>03</span> Capabilities</h2>
      <div class="br-skills">${skills}</div>
    </section>

    <section class="br-section" id="background">
      <h2 class="br-h2"><span>04</span> Background</h2>
      <div class="br-bg">${background}</div>
    </section>

    <section class="br-section" id="contact">
      <h2 class="br-h2"><span>05</span> Contact</h2>
      <div class="br-contact">
        <p class="br-contact__line">${c.contact.blurb}</p>
        <div class="br-contact__links">
          <a href="mailto:${c.contact.email}">${c.contact.email}</a>
          <a href="${c.contact.linkedin.url}">${c.contact.linkedin.label}</a>
          <a href="${c.contact.github.url}">${c.contact.github.label}</a>
        </div>
      </div>
    </section>

    <footer class="br-foot"><span>&copy; ${c.year} ${c.name}</span><span>Hand-built. No template.</span></footer>
  </div>`;

  const styles = `
  :root{
    --bg:#f2f0e6; --fg:#0c0c0c; --muted:#565248; --accent:#c6f23c;
    --line:#0c0c0c; --card:#fffdf4; --sw-bg:#fffdf4; --shadow:#0c0c0c;
  }
  :root[data-theme="dark"]{
    --bg:#0b0b0b; --fg:#f0f0ec; --muted:#9a968c; --accent:#c6f23c;
    --line:#f0f0ec; --card:#161616; --sw-bg:#161616; --shadow:#000;
  }
  html,body{background:var(--bg);color:var(--fg);}
  body{font-family:"Space Grotesk",system-ui,-apple-system,"Segoe UI",sans-serif;font-size:1.05rem;line-height:1.5;transition:background .3s,color .3s;}
  .br{max-width:1200px;margin:0 auto;padding:clamp(.8rem,3vw,1.6rem);}
  .br-head__nav,.br-hero__meta,.br-metric__label,.br-metric__sub,.br-work__n,.br-work__kicker,.br-tags,.br-h2 span,.br-now span,.br-bg__period,.br-marquee,.br-foot,.br-skill__items span{
    font-family:"JetBrains Mono",ui-monospace,monospace;}

  .br-head{display:flex;justify-content:space-between;align-items:center;border:2px solid var(--line);padding:.7rem 1rem;background:var(--card);}
  .br-head__name{font-weight:700;font-size:1.05rem;letter-spacing:-.01em;text-transform:uppercase;}
  .br-head__nav{display:flex;gap:1.1rem;flex-wrap:wrap;}
  .br-head__nav a{text-decoration:none;color:var(--fg);font-size:.72rem;text-transform:uppercase;letter-spacing:.06em;padding:.2rem .3rem;transition:background .12s,color .12s;}
  .br-head__nav a:hover{background:var(--accent);color:#0c0c0c;}

  .br-hero{border:2px solid var(--line);border-top:0;padding:clamp(1.5rem,5vw,3.5rem);background:var(--bg);}
  .br-hero__meta{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1.6rem;font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;}
  .br-hero__meta span{border:1.5px solid var(--line);padding:.25rem .6rem;}
  .br-hero__badge{background:var(--accent);color:#0c0c0c;border-color:var(--line)!important;font-weight:700;}
  .br-hero__head{font-size:clamp(2.3rem,7.5vw,6rem);font-weight:700;line-height:.98;letter-spacing:-.03em;text-transform:uppercase;max-width:16ch;}
  .br-hero__head mark{background:var(--accent);color:#0c0c0c;padding:0 .12em;box-decoration-break:clone;-webkit-box-decoration-break:clone;}
  .br-hero__sub{margin-top:1.6rem;font-size:1.15rem;max-width:60ch;color:var(--muted);}

  .br-metrics{display:grid;grid-template-columns:repeat(4,1fr);border:2px solid var(--line);border-top:0;}
  .br-metric{padding:1.6rem 1.2rem;border-right:2px solid var(--line);}
  .br-metric:last-child{border-right:0;}
  .br-metric__fig{font-size:clamp(1.9rem,4vw,3rem);font-weight:700;letter-spacing:-.03em;line-height:1;}
  .br-metric__label{margin-top:.6rem;font-size:.72rem;text-transform:uppercase;letter-spacing:.04em;}
  .br-metric__sub{margin-top:.2rem;font-size:.64rem;color:var(--muted);}

  .br-marquee{border:2px solid var(--line);border-top:0;background:var(--accent);color:#0c0c0c;overflow:hidden;padding:.55rem 0;}
  .br-mq__track{display:inline-flex;align-items:center;gap:1.2rem;white-space:nowrap;font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;animation:brmq 42s linear infinite;}
  .br-mq__star{opacity:.6;}
  @keyframes brmq{from{transform:translateX(0);}to{transform:translateX(-50%);}}

  .br-section{margin-top:clamp(2.5rem,6vw,4.5rem);}
  .br-h2{font-size:clamp(1.5rem,4vw,2.4rem);font-weight:700;text-transform:uppercase;letter-spacing:-.01em;display:flex;align-items:baseline;gap:.8rem;margin-bottom:1.6rem;padding-bottom:.8rem;border-bottom:2px solid var(--line);}
  .br-h2 span{font-size:.9rem;background:var(--accent);color:#0c0c0c;padding:.1rem .5rem;}

  .br-works{display:grid;gap:1.4rem;}
  .br-work{border:2px solid var(--line);padding:clamp(1.2rem,3vw,2rem);background:var(--card);box-shadow:6px 6px 0 var(--shadow);transition:transform .14s,box-shadow .14s;}
  .br-work:hover{transform:translate(-3px,-3px);box-shadow:10px 10px 0 var(--accent);}
  .br-work__bar{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;}
  .br-work__n{font-size:1.4rem;font-weight:700;background:var(--fg);color:var(--bg);padding:.1rem .55rem;}
  .br-work__kicker{font-size:.7rem;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);}
  .br-work__title{font-size:clamp(1.6rem,4vw,2.6rem);font-weight:700;line-height:1.02;letter-spacing:-.02em;text-transform:uppercase;}
  .br-work__blurb{margin:.9rem 0 1.1rem;font-size:1.15rem;max-width:62ch;}
  .br-work__list{display:grid;gap:.5rem;max-width:68ch;border-top:1.5px solid var(--line);padding-top:1rem;}
  .br-work__list li{position:relative;padding-left:1.6rem;color:var(--muted);}
  .br-work__list li::before{content:"\\25A0";position:absolute;left:0;color:var(--accent);font-size:.7em;top:.35em;}
  .br-tags{display:flex;flex-wrap:wrap;gap:.45rem;margin-top:1.2rem;}
  .br-tags span{font-size:.66rem;text-transform:uppercase;letter-spacing:.03em;border:1.5px solid var(--line);padding:.25rem .55rem;}

  .br-about{display:grid;grid-template-columns:1.6fr 1fr;gap:1.4rem;}
  .br-about__prose{border:2px solid var(--line);padding:clamp(1.3rem,3vw,2rem);background:var(--card);}
  .br-about__prose p{margin-bottom:1.1rem;max-width:58ch;}
  .br-about__prose p:first-child{font-size:1.25rem;font-weight:500;}
  .br-about__side{display:flex;flex-direction:column;gap:1.2rem;}
  .br-now{border:2px solid var(--line);background:var(--accent);color:#0c0c0c;padding:1.2rem;}
  .br-now span{font-size:.68rem;letter-spacing:.14em;font-weight:700;}
  .br-now p{margin-top:.5rem;font-weight:500;}
  .br-personal{border:2px solid var(--line);padding:1.2rem;display:flex;flex-wrap:wrap;gap:.5rem;background:var(--card);}
  .br-personal span{font-size:.8rem;border:1.5px solid var(--line);padding:.25rem .6rem;}

  .br-skills{display:grid;grid-template-columns:repeat(2,1fr);gap:1.2rem;}
  .br-skill{border:2px solid var(--line);padding:1.3rem;background:var(--card);}
  .br-skill h4{font-size:1.2rem;font-weight:700;text-transform:uppercase;letter-spacing:-.01em;margin-bottom:.9rem;}
  .br-skill__items{display:flex;flex-wrap:wrap;gap:.4rem;}
  .br-skill__items span{font-size:.74rem;border:1.5px solid var(--line);padding:.25rem .55rem;}

  .br-bg__row{display:grid;grid-template-columns:9rem 1fr;gap:1.2rem;border:2px solid var(--line);padding:1.3rem;background:var(--card);margin-bottom:1rem;}
  .br-bg__period{font-size:.78rem;font-weight:700;}
  .br-bg__main h4{font-size:1.25rem;font-weight:700;text-transform:uppercase;letter-spacing:-.01em;}
  .br-bg__main h4 em{font-style:normal;color:var(--muted);font-weight:400;}
  .br-bg__main p{color:var(--muted);margin-top:.4rem;max-width:68ch;}

  .br-contact{border:2px solid var(--line);background:var(--fg);color:var(--bg);padding:clamp(1.6rem,5vw,3rem);}
  .br-contact__line{font-size:clamp(1.8rem,5vw,3.4rem);font-weight:700;text-transform:uppercase;line-height:1.02;letter-spacing:-.02em;max-width:18ch;}
  .br-contact__links{display:flex;flex-wrap:wrap;gap:1rem;margin-top:1.8rem;}
  .br-contact__links a{font-family:"JetBrains Mono",monospace;font-size:.9rem;text-decoration:none;background:var(--accent);color:#0c0c0c;border:2px solid var(--accent);padding:.6rem 1rem;font-weight:600;transition:background .12s,color .12s;}
  .br-contact__links a:hover{background:transparent;color:var(--bg);border-color:var(--bg);}

  .br-foot{display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem;border:2px solid var(--line);border-top:0;padding:1rem;font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);}

  @media (max-width:860px){
    .br-metrics{grid-template-columns:repeat(2,1fr);}
    .br-metric:nth-child(2){border-right:0;}
    .br-metric:nth-child(1),.br-metric:nth-child(2){border-bottom:2px solid var(--line);}
    .br-about{grid-template-columns:1fr;}
    .br-skills{grid-template-columns:1fr;}
    .br-bg__row{grid-template-columns:1fr;gap:.4rem;}
  }`;

  return page({ design: "brutalist", title: `${c.name} \u2014 ${c.role}`, styles, body });
}
