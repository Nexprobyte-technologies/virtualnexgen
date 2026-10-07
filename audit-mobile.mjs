import { chromium } from "playwright-core";
import fs from "fs";

const routes = [
  "/",
  "/about",
  "/services",
  "/services/administrative-support",
  "/services/ai-automation-services",
  "/casestudy",
  "/casestudy/insurance-claims-processing",
  "/blog",
  "/blog/social-media-tips-for-insurance-agencies-boost-engagement",
  "/contacts",
  "/book-consultation",
  "/blogs",
];

const width = parseInt(process.argv[2] || "360");
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

const all = {};

for (const route of routes) {
  try {
    const resp = await page.goto("http://localhost:3000" + route, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    if (resp?.status() !== 200) {
      all[route] = { status: resp?.status() };
      continue;
    }
  } catch (e) {
    all[route] = { error: String(e).slice(0, 80) };
    continue;
  }
  await page.waitForTimeout(1800);

  const res = await page.evaluate((vw) => {
    const out = { textClip: [], tinyFonts: [], fixedWide: [], multiCol: [], tapSmall: [] };
    const desc = (el) => {
      const id = el.id ? "#" + el.id : "";
      const cls = (el.getAttribute("class") || "").split(" ").slice(0, 6).join(".");
      return (
        el.tagName.toLowerCase() +
        id +
        (cls ? "." + cls : "") +
        " :: " +
        (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40)
      );
    };
    const inClippedAnc = (el) => {
      let p = el.parentElement;
      while (p && p !== document.body) {
        const cs = getComputedStyle(p);
        if (cs.overflowX !== "visible" || cs.overflowY !== "visible") return true;
        p = p.parentElement;
      }
      return false;
    };

    for (const el of document.querySelectorAll("main *")) {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      const r = el.getBoundingClientRect();
      if (r.width < 2) continue;

      // 1. text content wider than its box (clipped, not line-clamped, not in clipped ancestor)
      if (
        el.children.length === 0 &&
        (el.textContent || "").trim().length > 3 &&
        el.scrollWidth > el.clientWidth + 2 &&
        !cs.webkitLineClamp.includes("none") === false
      ) {
        // webkit-line-clamp computed = "none" when unset
      }
      if (
        el.children.length === 0 &&
        (el.textContent || "").trim().length > 3 &&
        el.scrollWidth > el.clientWidth + 2 &&
        cs.webkitLineClamp === "none" &&
        !inClippedAnc(el) &&
        cs.overflowX === "visible"
      ) {
        out.textClip.push({
          d: desc(el).slice(0, 110),
          sw: el.scrollWidth,
          cw: el.clientWidth,
        });
      }

      // 2. tiny fonts
      const fsPx = parseFloat(cs.fontSize);
      if (
        fsPx < 10 &&
        (el.textContent || "").trim().length > 2 &&
        r.height > 4 &&
        !/blur|decor|watermark/i.test(el.getAttribute("class") || "")
      ) {
        out.tinyFonts.push({ d: desc(el).slice(0, 100), fs: cs.fontSize });
      }

      // 3. fixed px width wider than viewport
      if (r.width > vw + 2 && cs.position !== "absolute" && cs.position !== "fixed") {
        out.fixedWide.push({ d: desc(el).slice(0, 100), w: Math.round(r.width) });
      }

      // 4. grids that don't stack at mobile
      if (
        cs.display === "grid" &&
        r.width > 100 &&
        cs.gridTemplateColumns.split(" ").length > 1 &&
        !/grid-cols-2|cols-2/.test(el.getAttribute("class") || "")
      ) {
        const cls = el.getAttribute("class") || "";
        if (/grid-cols-(3|4|5|6|12)/.test(cls)) {
          out.multiCol.push({ d: desc(el).slice(0, 90), cols: cs.gridTemplateColumns.slice(0, 60) });
        }
      }

      // 5. small tap targets (interactive only)
      if (
        /^(A|BUTTON|INPUT|SELECT|SUMMARY)$/.test(el.tagName) &&
        r.height > 0 &&
        (r.height < 32 || r.width < 32) &&
        cs.visibility !== "hidden"
      ) {
        out.tapSmall.push({
          d: desc(el).slice(0, 90),
          w: Math.round(r.width),
          h: Math.round(r.height),
        });
      }
    }
    // dedupe/limit
    for (const k of Object.keys(out)) {
      const seen = new Set();
      out[k] = out[k]
        .filter((x) => (seen.has(x.d) ? false : (seen.add(x.d), true)))
        .slice(0, 10);
    }
    return out;
  }, width);

  const counts = Object.fromEntries(
    Object.entries(res).map(([k, v]) => [k, v.length])
  );
  console.log(route, JSON.stringify(counts));
  if (Object.values(counts).some((n) => n > 0)) all[route] = res;
}

fs.writeFileSync(
  `C:/Users/Asus/AppData/Local/Temp/opencode/mobile-${width}.json`,
  JSON.stringify(all, null, 1)
);
console.log("\n=== ROUTES WITH FINDINGS ===");
console.log(JSON.stringify(all, null, 1));
await browser.close();
