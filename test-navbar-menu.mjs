import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath:
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: true,
});

const ok = (label, cond) => console.log(`${cond ? "PASS" : "FAIL"}  ${label}`);

// ---------- MOBILE ----------
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 800 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(2500);

  const menu = page.locator("header.site-navbar");
  const toggle = menu.getByRole("button", { name: "Toggle menu" });
  const svcToggle = menu.getByRole("button", { name: /Services/i });
  const panel = page.locator("#mobile-services-list");

  await toggle.click();
  await page.waitForTimeout(700);

  ok("menu opens", await svcToggle.first().isVisible());
  ok("services collapsed by default", !(await panel.isVisible().catch(() => false)));
  ok(
    "no service links visible by default",
    !(await menu.getByText("Insurance Virtual Assistants").isVisible().catch(() => false))
  );
  ok("body scroll locked", await page.evaluate(() => document.body.classList.contains("nav-menu-open")));
  ok(
    "chat FAB hidden while menu open",
    await page.evaluate(() => {
      const el = document.querySelector(".chat-widget-toggle");
      return !!el && getComputedStyle(el).display === "none";
    })
  );

  await page.screenshot({ path: "C:/Users/Asus/AppData/Local/Temp/opencode/m1-collapsed.png" });

  await svcToggle.first().click();
  await page.waitForTimeout(700);
  ok("clicking Services expands list", await panel.isVisible());
  const names = await panel.locator("a").allTextContents();
  ok(`shows "All Services" + all 9 services (${names.length} links)`, names.length === 10 && names[0] === "All Services");
  ok(
    "FAB still hidden when expanded",
    await page.evaluate(() => {
      const el = document.querySelector(".chat-widget-toggle");
      return !!el && getComputedStyle(el).display === "none";
    })
  );
  await page.screenshot({ path: "C:/Users/Asus/AppData/Local/Temp/opencode/m2-expanded.png" });

  // click a service -> navigates + closes menu
  await panel.getByText("Administrative Support", { exact: true }).click();
  await page.waitForTimeout(2500);
  ok("service link navigates", page.url().includes("/services/administrative-support"));
  ok("menu closed after navigation", !(await panel.isVisible().catch(() => false)));
  ok("body unlocked after navigation", await page.evaluate(() => !document.body.classList.contains("nav-menu-open")));
  ok(
    "FAB back after navigation",
    await page.evaluate(() => {
      const el = document.querySelector(".chat-widget-toggle");
      return !!el && getComputedStyle(el).display !== "none";
    })
  );

  // reopen -> services should be collapsed again (state reset)
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(2000);
  await page.locator("header.site-navbar").getByRole("button", { name: "Toggle menu" }).click();
  await page.waitForTimeout(500);
  await page.locator("header.site-navbar").getByRole("button", { name: "Toggle menu" }).click();
  await page.waitForTimeout(500);
  await page.locator("header.site-navbar").getByRole("button", { name: "Toggle menu" }).click();
  await page.waitForTimeout(700);
  ok(
    "services reset to collapsed after reopening menu",
    !(await page.locator("#mobile-services-list").isVisible().catch(() => false))
  );

  await ctx.close();
}

// ---------- DESKTOP ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(2500);

  const desktopServices = page.locator("header.site-navbar .hidden.xl\\:flex").getByRole("button", { name: /Services/i });
  await desktopServices.first().click();
  await page.waitForTimeout(700);
  const dLinks = await page.locator("header.site-navbar").locator("a", { hasText: "All Services" }).allTextContents();
  ok(`desktop Services dropdown still opens (${dLinks.length} "All Services" link)`, dLinks.length >= 1);
  const svcCount = await page.locator("header.site-navbar .grid.grid-cols-2 a").count();
  ok(`desktop dropdown lists all services (${svcCount})`, svcCount === 9);
  ok(
    "desktop menu not affected by mobile class",
    await page.evaluate(() => !document.body.classList.contains("nav-menu-open"))
  );
  await page.screenshot({ path: "C:/Users/Asus/AppData/Local/Temp/opencode/m3-desktop.png" });
  await ctx.close();
}

await browser.close();
