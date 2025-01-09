import { defineConfig } from "@playwright/test"

const config = defineConfig({
  testDir: "./test/docs",
  timeout: 5000,
  retries: 0,
  reporter: "list",
  use: {
    headless: true,
    baseURL: "npm run docs:preview",
    ignoreHTTPSErrors: true,
  },
  webServer: {
    command: "npm run docs:preview",
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
})

export default config