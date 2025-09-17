import { test, expect } from "@playwright/test";

test("DuckDuckGo → Wikipedia: first automatic process", async ({ page }) => {
  // 1. Go to DuckDuckGo search engine
  await page.goto("https://duckduckgo.com");

  // 2. Enter the search query
  await page.getByRole("combobox", { name: "Search with DuckDuckGo" })
    .fill("first automatic process in history site:wikipedia.org");
  await page.keyboard.press("Enter");

  // 3. Wait for search results and click the first Wikipedia link
  const wikiLink = page.getByRole("link", { name: /wikipedia/i }).first();
  await expect(wikiLink).toBeVisible({ timeout: 15000 });
  await wikiLink.click();

  // 4. Extract the first 4-digit year from the Wikipedia page
  const content = await page.textContent("body");
  const yearMatch = content?.match(/\b(1[5-9]\d{2}|20\d{2})\b/); 
  const firstYear = yearMatch ? yearMatch[0] : "Not found";

  // 5. Take a screenshot of the Wikipedia page
  await page.screenshot({ path: "outputs/web_wikipedia.png" });

  // 6. Print the result to console
  console.log("✅ First automatic process year:", firstYear);

  // 7. Assert that at least one year was found
  expect(firstYear).not.toBe("Not found");
});
