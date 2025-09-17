// playwright-ts/tests/web_wikipedia.spec.ts
import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

const OUTPUT_DIR = path.join(process.cwd(), "outputs");

test("DuckDuckGo → Wikipedia: first automatic process", async ({ page }) => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const query = "first automatic process in history site:wikipedia.org";

  // 1) Go to DuckDuckGo
  await page.goto("https://duckduckgo.com", { waitUntil: "domcontentloaded" });

  // 2) Dismiss possible cookie/consent dialogs (multi-lingual)
  const consentSelectors = [
    'button:has-text("Accept all")',
    'button:has-text("I agree")',
    'button:has-text("Accept")',
    'button:has-text("Aceptar todo")',
    'button:has-text("Estoy de acuerdo")',
  ];
  for (const sel of consentSelectors) {
    const btn = page.locator(sel);
    if (await btn.count()) {
      try {
        await btn.first().click({ timeout: 2000 });
      } catch {
        // ignore if click fails
      }
      break;
    }
  }

  // 3) Fill search box and submit
  const searchBox = page.locator('input[name="q"], input#search_form_input_homepage, input#searchbox_input');
  await searchBox.fill(query);
  await searchBox.press("Enter");

  // 4) Wait for results (network idle) then find ANY wikipedia.org link
  await page.waitForLoadState("networkidle");
  const wikiLink = page.locator('a[href*="wikipedia.org"]').first();
  await wikiLink.waitFor({ state: "visible", timeout: 20000 });

  // 5) Click the link and wait for the wikipedia page to load
  const href = await wikiLink.getAttribute("href");
  console.log("Found Wikipedia candidate:", href);
  await wikiLink.click();
  await page.waitForLoadState("networkidle");

  // 6) Extract first 4-digit year (realistic range 1500-2099)
  const bodyText = (await page.textContent("body")) || "";
  const yearMatch = bodyText.match(/\b(1[5-9]\d{2}|20\d{2})\b/);
  const firstYear = yearMatch ? yearMatch[0] : "Not found";

  // 7) Screenshot and save summary
  const screenshotPath = path.join(OUTPUT_DIR, "web_wikipedia.png");
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log("Screenshot saved:", screenshotPath);
  console.log("First automatic process year:", firstYear);

  // 8) Assert we found a year (if this is critical). If flaky, you may change this to a warning instead.
  expect(firstYear).not.toBe("Not found");
});
