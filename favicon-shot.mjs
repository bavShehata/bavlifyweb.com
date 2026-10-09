import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 128, height: 128 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto("http://127.0.0.1:8080/favicon.svg", { waitUntil: "networkidle" });
await p.screenshot({ path: "_shots/favicon.png" });
await b.close();
console.log("favicon shot done");
