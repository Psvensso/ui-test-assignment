import { expect, test } from "@playwright/test";
import { mockJsonData } from "tests/utils/apiMocks";

test.describe("Handles bad api responses", () => {
  test.describe("Shows Invalid response structure from API when", () => {
    test("unexpected json structure", async ({ page }) => {
      mockJsonData(page, { bad: "format" });
      await page.goto("/");
      await expect(
        page.locator('[data-part="error-description"]')
      ).toContainText("Invalid response");
    });
    test("not an json object at all", async ({ page }) => {
      mockJsonData(page, "&&&", 200);
      await page.goto("/");
      await expect(
        page.locator('[data-part="error-description"]')
      ).toContainText("Invalid response");
    });
    test("no version number", async ({ page }) => {
      mockJsonData(page, { version: undefined, devices: [] }, 200);
      await page.goto("/");
      await expect(
        page.locator('[data-part="error-description"]')
      ).toContainText("Invalid response");
    });
  });
  test.describe("Shows api error when", () => {
    test("Response is 500", async ({ page }) => {
      mockJsonData(page, { bad: "format" }, 500);
      await page.goto("/");
      await expect(
        page.locator('[data-part="error-description"]')
      ).toContainText("API error");
    });
    test("Response is 404", async ({ page }) => {
      mockJsonData(page, { bad: "format" }, 404);
      await page.goto("/");
      await expect(
        page.locator('[data-part="error-description"]')
      ).toContainText("API error");
    });
    test("Response is 302", async ({ page }) => {
      mockJsonData(page, { bad: "format" }, 302);
      await page.goto("/");
      await expect(
        page.locator('[data-part="error-description"]')
      ).toContainText("API error");
    });
  });
});
