// test/docs/HomePage.e2e.spec.ts
import { expect, test } from "@playwright/test"

test.use({
  colorScheme: "dark",
})

test.describe("E2E Tests", () => {
  test("should display the homepage container with correct classes", async ({ page }) => {
    // Navigate to the base URL (http://localhost:3000)
    await page.goto("http://localhost:3000/react-classmate") // Uses baseURL from config

    const rootContainer = page.locator("#root")

    // Assert that the container is visible
    await expect(rootContainer).toBeVisible()

    // root container has children
    const children = await rootContainer.locator("div").count()
    expect(children).toBeGreaterThan(0)
  })

  test("should display the homepage container with correct classes in dark mode", async ({ page }) => {
    await page.goto("http://localhost:3000/react-classmate")

    const htmlContainer = page.locator("html")

    const language = await htmlContainer.getAttribute("lang")
    expect(language).toContain("en")

    const classes = page.waitForSelector(".lucide.lucide-moon.h-4.w-4", { timeout: 10000 })
    const awaitClass = await classes
    expect(awaitClass).not.toBeNull()
  })
})
