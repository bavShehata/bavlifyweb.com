import { chromium } from "playwright";
const browser = await chromium.launch();
for (const t of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: t });
  const page = await ctx.newPage();
  await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `_shots/index-${t}.png`, fullPage: false });
  await ctx.close();
  console.log("shot index", t);
}
await browser.close();
console.log("DONE");
