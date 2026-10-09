// Single source of truth for the portfolio content.
// Public-safe framing: rounded figures, no internal project or partner names,
// no em dashes (house style from the achievements knowledge base).

export const content = {
  name: "Bavly Shehata",
  initials: "BS",
  role: "Software Engineer II",
  company: "Microsoft",
  location: "Cairo, Egypt",
  availability: "Open to relocation",

  // Short, specific, voice-forward. Not "I build amazing things".
  lead:
    "I build the high-scale backends behind everyday products, and ship the machine learning that makes them pay off.",
  sub:
    "I lead the service behind affiliate links across Outlook, Microsoft Edge, and Copilot: around 140 million requests a day, about $46M a year, built hands-on with a small team.",

  now:
    "Leading the affiliate service, going deeper on AI-powered developer productivity and large-scale systems, and learning Spanish.",

  nav: [
    { href: "#work", label: "Work" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#background", label: "Background" },
    { href: "#contact", label: "Contact" },
  ],

  // Headline numbers. Kept to the strongest four.
  metrics: [
    { figure: "140M", label: "requests a day", sub: "peak 185M, ~50B a year" },
    { figure: "$46M", label: "annual revenue", sub: "across 8 networks" },
    { figure: "+10%", label: "daily ad calls", sub: "from on-device ML" },
    { figure: "0.81\u21920.92", label: "detector accuracy (F1)", sub: "in a 6.2 KB model" },
  ],

  about: [
    "I am a software engineer who likes the impactful end of the work: taking a feature from an idea to something running in production, with all the cross-functional messiness that involves. My home base is backend and distributed systems, but I follow the impact wherever it leads, which is how I ended up inside the Microsoft Edge source shipping an on-device machine-learning model.",
    "None of this was the plan at 15, when an introductory C++ course turned into a love of breaking problems into logical steps (a first-place robotics win did not hurt). That led to a full-ride scholarship, a 4.0 Computer Science degree, years of competitive programming, and a long stretch of full-stack freelancing before Microsoft.",
    "I care about how we build, not just what we build: clean, well-tested code, strong fundamentals, and AI-assisted development. I also enjoy the human side, mentoring engineers and presenting the high-impact work I get to be part of.",
  ],

  // Case studies, strongest first.
  work: [
    {
      id: "edge-ml",
      kicker: "Flagship \u00b7 Machine learning \u00b7 Chromium (C++)",
      title: "On-device ML inside Microsoft Edge",
      blurb:
        "Initiated and led replacing Edge's rule-based product-page detector with a single on-device machine-learning model, in the Chromium source.",
      bullets: [
        "Lifted detection accuracy (F1) from 0.81 to 0.92 on a frozen holdout, and 0.97 on an 89K-URL production set.",
        "Drove a 10% increase in daily ad calls (100M to 110M) by triggering Edge shopping features more accurately.",
        "A 6.2 KB model with a single forward pass: no per-locale regexes, no live API dependency, no page scraping.",
        "Built the offline evaluation harness (headless tracing plus capture) and shipped the C++ serving-path gate, unit-tested and regression-clean.",
      ],
      tags: ["Logistic regression", "Feature engineering", "Model validation", "C++", "Chromium"],
    },
    {
      id: "scale-service",
      kicker: "Ownership \u00b7 Distributed systems \u00b7 .NET",
      title: "A monetization service at scale",
      blurb:
        "I lead and build the service behind affiliate links across Outlook, Microsoft Edge, and Copilot.",
      bullets: [
        "Around 140 million requests a day (peak 185M) and about $46M in annual revenue.",
        "8 affiliate and retail networks including a direct eBay integration, with yield optimization that routes each click to the highest-paying network.",
        "Low-latency merchant resolution (exact, then base, then wildcard domain, ccTLD-aware) with signed redirect URLs.",
        "Set direction and delivery with a small team of three engineers, while staying a primary builder.",
      ],
      tags: [".NET", "C#", "Microservices", "Azure", "A/B experimentation"],
    },
    {
      id: "revenue",
      kicker: "Data pipelines \u00b7 Reliability",
      title: "A revenue data platform teams can trust",
      blurb:
        "Designed and refactored the pipeline and dashboard that make partner revenue accurate and fast.",
      bullets: [
        "Normalizes currencies and time zones, dedupes transactions across networks, computes commissions, and joins click data in memory.",
        "Reliable alerting and a focused stakeholder dashboard that loads near-instantly.",
        "Canonical retry and resilience patterns across SQL, Kusto, and HTTP, no bespoke retry logic.",
      ],
      tags: ["SQL", "Kusto (KQL)", "Data normalization", "Resilience"],
    },
    {
      id: "incidents",
      kicker: "Reliability \u00b7 Root-cause",
      title: "Finding the expensive problems",
      blurb:
        "Sometimes the fix is technical. Sometimes it is challenging the report everyone already trusts.",
      bullets: [
        "Recovered about $1M in annual revenue by root-causing a production cluster outage, a partner had quietly blocked our traffic.",
        "Broke a stalled, multi-week, all-hands incident by re-framing a mislabeled root cause, growing partner traffic about 10%.",
        "Raised Microsoft Cashback reliability from 80% to 96%.",
      ],
      tags: ["Log analysis", "Incident leadership", "Cross-team", "Observability"],
    },
    {
      id: "ai-dev",
      kicker: "Developer productivity",
      title: "AI-assisted development, for the whole team",
      blurb:
        "Pioneered agentic coding workflows so the team ships faster without lowering the bar.",
      bullets: [
        "Wired GitHub Copilot and Claude Code into testing, documentation, code review, and refactoring.",
        "Cut cycle time and helped set an AI-first engineering culture, plus a company security initiative (governed release pipeline, hardened storage).",
      ],
      tags: ["GitHub Copilot", "Claude Code", "Agentic tooling", "Automation"],
    },
  ],

  skills: [
    {
      group: "Backend & distributed systems",
      items: [".NET / C#", "Microservices", "REST APIs", "SQL", "Azure", "Kusto (KQL)", "Data pipelines", "A/B experimentation", "Resilience & retry", "Observability"],
    },
    {
      group: "Machine learning",
      items: ["Logistic regression", "Feature engineering", "Model validation", "Model compression", "PyTorch", "Offline evaluation"],
    },
    {
      group: "AI-assisted development",
      items: ["GitHub Copilot", "Claude Code", "Agentic LLM tooling", "Developer productivity"],
    },
    {
      group: "Full-stack & languages",
      items: ["Node.js / Express", "React", "HTML / CSS / JS", "Python", "C++", "Java", "Git"],
    },
  ],

  background: [
    {
      period: "2024 \u2014 present",
      role: "Software Engineer II",
      org: "Microsoft, Bing Shopping",
      note:
        "Lead the affiliate service across Outlook, Edge, and Copilot. Shipped the Edge on-device ML model, recovered about $1M in annual revenue, and championed AI-assisted development. Promoted to Software Engineer II in 2026.",
    },
    {
      period: "2021 \u2014 2024",
      role: "Full-stack Developer, Freelance",
      org: "Bavlifyweb",
      note:
        "Delivered full-stack and low-code web projects for 20+ clients end to end, including FL0, PowerHouse SMART, and Trainline. Mentored 7 interns, built real-time integrations and automations, deployed on cloud.",
    },
    {
      period: "2023",
      role: "BSc Computer Science (AI major)",
      org: "British University in Egypt",
      note:
        "4.0 GPA, distinction with honors, merit-based full-ride scholarship. President of the Competitive Programming Club. Degree project: multi-classification from facial images, 400+ models over 1,000+ GPU-hours (F1 73% age, 80% gender, 93% ethnicity).",
    },
  ],

  personal: [
    "Padel and chess",
    "Online-privacy advocate",
    "Linux (EndeavourOS) tinkerer",
    "Learning Spanish",
  ],

  contact: {
    blurb:
      "Up for a good engineering problem, a role, or a game of padel or chess. Let's talk.",
    email: "bavly@bavlifyweb.com",
    linkedin: { label: "linkedin.com/in/bavshehata", url: "https://linkedin.com/in/bavshehata" },
    github: { label: "github.com/bavshehata", url: "https://github.com/bavshehata" },
  },

  year: new Date().getFullYear(),
};
