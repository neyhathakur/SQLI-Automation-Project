// playwright-ts/tests/web_wikipedia.spec.ts
import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

const OUTPUT_DIR = path.join(process.cwd(), "outputs");

test("Web: search 'automation' -> Wikipedia -> extract year + screenshot", async ({ page }) => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Try Google first (required by the task). If blocked, fallback to DuckDuckGo.
  const googleQuery = "automation";
  const ddQuery = "automation site:wikipedia.org";

  // Helper: dismiss common consent dialogs / modals
  const dismissConsent = async () => {
    const selectors = [
      'button:has-text("I agree")',
      'button:has-text("Accept all")',
      'button:has-text("Accept")',
      'button:has-text("Aceptar todo")',
      'button:has-text("Estoy de acuerdo")',
      '[aria-label="Accept all"]',
      '[aria-label="Agree"]',
      '[data-testid="close-button"]'
    ];
    for (const s of selectors) {
      const btn = page.locator(s);
      if ((await btn.count()) > 0) {
        try { await btn.first().click({ timeout: 2000 }); } catch { /* ignore */ }
        break;
      }
    }
  };

  const extractYear = (bodyText: string | null) => {
    if (!bodyText) return "Not found";
    const match = bodyText.match(/\b(1[5-9]\d{2}|20\d{2})\b/); // realistic years 1500-2099
    return match ? match[0] : "Not found";
  };

  // --- Try Google (preferred) ---
  try {
    await page.goto("https://www.google.com/?hl=en", { waitUntil: "domcontentloaded" });
    await dismissConsent();

    // Search
    const searchBox = page.locator('input[name="q"], textarea[name="q"]');
    await searchBox.fill(googleQuery);
    await searchBox.press("Enter");
    await page.waitForLoadState("networkidle");

    // Detect Google anti-bot/captcha / sorry page
    if (page.url().includes("/sorry") || (await page.locator('form#captcha-form').count()) > 0) {
      throw new Error("Google blocked (captcha/sorry) - falling back");
    }

    // Locate Wikipedia link
    const wikiLink = page.locator('a[href*="wikipedia.org"]').first();
    if ((await wikiLink.count()) === 0) throw new Error("No Wikipedia link found on Google results");
    await wikiLink.click({ trial: false });
    await page.waitForLoadState("networkidle");
  } catch (googleErr) {
    console.log("Google path failed:", googleErr.message || googleErr);
    // --- Fallback: DuckDuckGo ---
    await page.goto("https://duckduckgo.com/", { waitUntil: "domcontentloaded" });
    await dismissConsent();

    const ddBox = page.locator('input[name="q"], input#search_form_input_homepage, input#searchbox_input');
    await ddBox.fill(ddQuery);
    await ddBox.press("Enter");
    await page.waitForLoadState("networkidle");

    // handle potential overlay/modal (anomaly-modal) that blocks clicks
    const anomaly = page.locator('[data-testid="anomaly-modal"], .anomaly-modal__mask');
    if (await anomaly.count() > 0 && await anomaly.isVisible().catch(() => false)) {
      // try Escape or click close
      await page.keyboard.press("Escape").catch(() => {});
      const closeBtn = page.locator('button:has-text("Close"), button[aria-label="Close"]');
      if ((await closeBtn.count()) > 0) {
        try { await closeBtn.first().click({ timeout: 2000 }); } catch {}
      }
    }

    const wikiLink = page.locator('a[href*="wikipedia.org"]').first();
    if ((await wikiLink.count()) === 0) {
      // save debug HTML for investigation
      const debugFile = path.join(OUTPUT_DIR, "debug_duckduckgo.html");
      fs.writeFileSync(debugFile, await page.content());
      throw new Error(`DuckDuckGo: no wikipedia link found; debug saved: ${debugFile}`);
    }
    // click first candidate
    // sometimes link is relative; allow navigation
    await wikiLink.click();
    await page.waitForLoadState("networkidle");
  }

  // Now on Wikipedia (or another page). Extract year and screenshot.
  await page.waitForSelector("body", { timeout: 15000 });
  const bodyText = await page.textContent("body");
  const firstYear = extractYear(bodyText);
  const screenshotPath = path.join(OUTPUT_DIR, "web_wikipedia.png");
  await page.screenshot({ path: screenshotPath, fullPage: true });

  const summary = {
    wikipedia_url: page.url(),
    first_automatic_process_year: firstYear,
    screenshot: screenshotPath
  };
  fs.writeFileSync(path.join(OUTPUT_DIR, "web_wikipedia_results.json"), JSON.stringify(summary, null, 2));
  console.log("Web summary:", summary);

  // Optional assert (if you want the test to fail when no year found)
  expect(firstYear).not.toBe("Not found");
});
