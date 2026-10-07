import { chromium } from "playwright-core";

const route = process.argv[2] || "/";
const needle = process.argv[3] || "Policy Servicing";

const browser = await chromium.launch({
  executablePath:
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true,
});
const ctx = await browser.newContext({
  viewport: { width: 360, height: 800 },
  reducedMotion: "reduce",
});
const page = await ctx.newPage();
await page.goto("http://localhost:3000" + route, {
  waitUntil: "domcontentloaded",
  timeout: 60000,
});
await page.waitForTimeout(1200);
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 50));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1500);
await page.addStyleTag({
  content:
    "*, *::before, *::after { animation: none !important; transition: none !important; }",
});
await page.waitForTimeout(300);

const out = await page.evaluate((needle) => {
  const res = [];
  for (const el of document.querySelectorAll("main *")) {
    const t = (el.textContent || "").trim();
    if (!t.startsWith(needle)) continue;
    if ([...el.children].some((c) => (c.textContent || "").trim())) continue;
    const chain = [];
    let p = el;
    let depth = 0;
    while (p && p.tagName !== "MAIN" && depth < 8) {
      const cs = getComputedStyle(p);
      const r = p.getBoundingClientRect();
      chain.push({
        tag: p.tagName.toLowerCase(),
        cls: (p.getAttribute("class") || "").slice(0, 90),
        rect: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)],
        pos: cs.position,
        tf: cs.transform === "none" ? "" : cs.transform.slice(0, 50),
        disp: cs.display,
        ai: cs.alignItems,
        grid: cs.gridTemplateColumns.slice(0, 60),
        float: cs.float,
        absL: cs.left,
        w: cs.width,
      });
      p = p.parentElement;
      depth++;
    }
    res.push({ txt: t.slice(0, 40), chain });
    if (res.length >= 2) break;
  }
  return res;
}, needle);

console.log(JSON.stringify(out, null, 1));
await browser.close();
