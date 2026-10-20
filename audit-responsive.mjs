import { chromium } from "playwright-core";

/**
 * Responsive overflow audit.
 *
 * Checks every route at several mobile/tablet widths and reports routes where
 * the layout viewport expands beyond the requested width. That expansion is the
 * "page zooms out / content runs off the right edge" symptom you see on phones:
 * it happens when a fixed-width descendant (e.g. a `w-[600px]` image) forces a
 * grid or flex track wider than the viewport.
 *
 * Usage: node audit-responsive.mjs [comma,separated,widths]
 */

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

const widths = (process.argv[2] || "320,360,390,414,430,540,640,768")
  .split(",")
  .map(Number);

const browser = await chromium.launch({
  executablePath:
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true,
});

let failures = 0;

for (const width of widths) {
  console.log(`\n##### WIDTH ${width} #####`);
  for (const route of routes) {
    const ctx = await browser.newContext({
      viewport: { width, height: 800 },
      isMobile: true,
      hasTouch: true,
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    try {
      await page.goto("http://localhost:3000" + route, {
        waitUntil: "domcontentloaded",
        timeout: 90000,
      });
      await page.waitForTimeout(2200);

      const result = await page.evaluate((requestedWidth) => {
        const vw = window.innerWidth;
        const offenders = [];
        for (const el of document.querySelectorAll("body *")) {
          const cs = getComputedStyle(el);
          if (cs.display === "none" || cs.visibility === "hidden") continue;
          const rect = el.getBoundingClientRect();
          if (rect.right > vw + 1 && rect.width > 4) {
            offenders.push(
              el.tagName.toLowerCase() +
                "." +
                (el.getAttribute("class") || "").split(" ").slice(0, 5).join(".") +
                ` [w=${Math.round(rect.width)} r=${Math.round(rect.right)}]`
            );
          }
        }
        return {
          innerWidth: vw,
          scrollWidth: document.documentElement.scrollWidth,
          offenders: [...new Set(offenders)].slice(0, 4),
        };
      }, width);

      const failed = result.scrollWidth > width + 1;
      if (failed) failures++;
      console.log(
        `${failed ? "FAIL" : "ok  "} ${route} inner=${result.innerWidth} scroll=${result.scrollWidth}`
      );
      if (failed) {
        console.log("      " + result.offenders.join("\n      "));
      }
    } catch (error) {
      failures++;
      console.log(`ERR  ${route} ${String(error).slice(0, 70)}`);
    }
    await ctx.close();
  }
}

await browser.close();
console.log(`\n${failures === 0 ? "ALL PASSED" : failures + " FAILURES"}`);
