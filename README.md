# bavlifyweb.com

Personal portfolio for Bavly Shehata, Software Engineer II at Microsoft.

Hand-built static site: plain HTML/CSS/vanilla JS, self-hosted fonts, no framework,
no trackers, no third-party runtime requests. Content lives in one model and is
rendered into four interchangeable designs.

## Structure

```
content.mjs          Single source of truth for all copy and figures
shared.mjs           Page shell, @font-face, reset, no-flash theme toggle
templates/           One file per design (editorial, terminal, monochrome, brutalist)
build.mjs            Renders templates -> public/
public/              Build output (the deployable site)
  index.html         Live homepage (Editorial design)
  gallery.html       Side-by-side comparison of all four designs
  <design>.html      Each design as a standalone preview
  fonts/             Self-hosted woff2 fonts
```

## Develop

```bash
npm install            # optional, only needed for screenshots
node build.mjs         # regenerate public/
# preview:
python -m http.server 8080 --directory public
```

Edit copy in `content.mjs`, then rebuild. To change the live design, change the
`home` line in `build.mjs`.

## Deploy

Static output in `public/`. Deployed to Cloudflare Pages.

```bash
npx wrangler pages deploy public --project-name bavlifyweb
```

## Fonts

Fraunces, Newsreader, Instrument Serif, Space Grotesk, JetBrains Mono
(open source, via fontsource, self-hosted in `public/fonts/`).
