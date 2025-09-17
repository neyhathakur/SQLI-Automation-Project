// playwright-ts/playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  timeout: 60 * 1000,
  expect: { timeout: 5000 },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    headless: true,
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
});
