import { chromium } from "playwright";

const designs = ["editorial", "terminal", "monochrome", "brutalist"];
const themes = ["light", "dark"];
const browser = await chromium.launch();
for (const t of themes) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    colorScheme: t,
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  for (const d of designs) {
    await page.goto(`http://127.0.0.1:8080/${d}.html`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `_shots/${d}-${t}.png`, fullPage: true });
    console.log("shot", d, t);
  }
  await ctx.close();
}
await browser.close();
console.log("DONE");
