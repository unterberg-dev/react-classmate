import { expect, test } from "@playwright/test"

test.describe("Doc Test (E2E)", () => {
  // set dark by default to test dark mode init
  test.use({
    colorScheme: "dark",
  })

  test("should display the homepage container with correct classes", async ({ page }) => {
    await page.goto("react-classmate/")

    const rootContainer = page.locator("#root")

    // Assert that the container is visible
    await expect(rootContainer).toBeVisible()

    // root container has children
    const children = await rootContainer.locator("div").count()
    expect(children).toBeGreaterThan(0)
  })

  test("check dark mode init", async ({ page }) => {
    await page.goto("react-classmate/")

    // not have dark mode class
    const htmlDarkContainer = page.locator("html")
    await expect(htmlDarkContainer).toHaveClass("dark")
  })

  test("toggle to light mode and back to dark mode", async ({ page }) => {
    await page.goto("react-classmate/")

    // not have dark mode class
    const themeSwitchButton = page.locator("#theme-switch")
    const html = page.locator("html")

    await themeSwitchButton.click()
    await expect(html).not.toHaveClass("dark")

    await themeSwitchButton.click()
    await expect(html).toHaveClass("dark")
  })

  test("navigate to get-started-page", async ({ page }) => {
    await page.goto("react-classmate/")

    // not have dark mode class
    const getStartedButton = page.locator("#get-started-button")
    await getStartedButton.click()

    // get current url
    await page.waitForURL("react-classmate/docs/get-started/")
  })
})
