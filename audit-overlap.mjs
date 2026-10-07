import { chromium } from "playwright-core";

const routes = (process.argv[2] || "/,/services,/services/administrative-support").split(",");
const width = parseInt(process.argv[3] || "360");

const browser = await chromium.launch({
  executablePath:
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true,
});
const ctx = await browser.newContext({
  viewport: { width, height: 800 },
  reducedMotion: "reduce",
});
const page = await ctx.newPage();

for (const route of routes) {
  const resp = await page.goto("http://localhost:3000" + route, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  if (resp?.status() !== 200) {
    console.log(route, "STATUS", resp?.status());
    continue;
  }
  await page.waitForTimeout(1200);
  // trigger all scroll reveals/animations, then return to top
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);
  // freeze css animations so float/marquee transforms don't skew rects
  await page.addStyleTag({
    content:
      "*, *::before, *::after { animation: none !important; transition: none !important; }",
  });
  await page.waitForTimeout(300);

  const overlaps = await page.evaluate(() => {
    const leaves = [];
    for (const el of document.querySelectorAll("main *")) {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      if (cs.opacity === "0") continue;
      const r = el.getBoundingClientRect();
      if (r.width < 4 || r.height < 4) continue;
      const txt = (el.textContent || "").trim();
      if (!txt) continue;
      const hasElementChild = [...el.children].some(
        (c) => (c.textContent || "").trim().length > 0
      );
      if (hasElementChild) continue;
      leaves.push({
        el,
        r,
        txt: txt.replace(/\s+/g, " ").slice(0, 35),
        cls: (el.getAttribute("class") || "").slice(0, 60),
        pos: cs.position,
        z: cs.zIndex,
      });
    }
    const out = [];
    for (let i = 0; i < leaves.length; i++) {
      for (let j = i + 1; j < leaves.length; j++) {
        const a = leaves[i],
          b = leaves[j];
        if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
        const ox =
          Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
        const oy =
          Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
        if (ox > 6 && oy > 6) {
          out.push({
            a: a.txt + " | " + a.cls,
            b: b.txt + " | " + b.cls,
            ox: Math.round(ox),
            oy: Math.round(oy),
            aPos: a.pos,
            bPos: b.pos,
          });
        }
      }
    }
    return out.slice(0, 15);
  });

  console.log(`\n=== ${route} @ ${width}: ${overlaps.length} overlaps ===`);
  for (const o of overlaps) console.log(JSON.stringify(o));
}
await browser.close();
