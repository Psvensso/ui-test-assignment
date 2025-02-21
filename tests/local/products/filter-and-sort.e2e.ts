import { expect, test } from "@playwright/test";
import deviceTestData from "../../testData/deviceTestData.json";

test.beforeEach(async ({ page }) => {
  await page.route(
    "https://static.ui.com/fingerprint/ui/public.json",
    async (route) => {
      console.log("Responding with mock");
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(deviceTestData),
      });
    }
  );
});

test("Renders and hello world from init", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("textbox", { name: "Filter" }).click();
  page.pause();

  expect(await page.title()).toBe("Playwright App");
});
