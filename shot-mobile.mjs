import { chromium } from "playwright";
const target = process.env.BW_URL || "http://127.0.0.1:8080/";
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  colorScheme: "dark",
});
const page = await ctx.newPage();
await page.goto(target, { waitUntil: "networkidle" });
await page.waitForTimeout(400);
await page.screenshot({ path: "_shots/m-top.png", fullPage: false });
await page.locator("#skills").scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await page.screenshot({ path: "_shots/m-sections.png", fullPage: false });
await browser.close();
console.log("DONE");
