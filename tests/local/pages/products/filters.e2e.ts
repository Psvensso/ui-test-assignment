import { expect } from "@playwright/test";
import { getTable } from "./utils/productSelectors";
import { productsPage } from "./utils/productsPageFixture";

productsPage.test.describe("Filters", () => {
  productsPage.test.use({
    // searchParams: {
    //   productsViewMode: "l",
    //   productsLineFilter: "L1,L2",
    // },
    mockData: {
      data: {
        devices: [
          {
            id: "1",
            product: { name: "One" },
            line: { name: "Line 1", id: "L1" },
          },
          {
            id: "2",
            product: { name: "Two" },
            line: { name: "Line 2", id: "L2" },
          },
          {
            id: "3",
            product: { name: "Three" },
            line: { name: "Line 3", id: "L3" },
          },
        ],
        version: "0.1",
      },
      status: 200,
    },
  });

  /** Too big test but time constraint so testing all filter flow in one here, feel free to break this up */
  productsPage.test("Filter", async ({ page }) => {
    await page.locator('[data-part="dropdown-button"]').hover();

    const options = await page.locator('[data-part="options-list"] > label');
    //The children of the list
    await expect(options.filter({ hasText: "Line 1" })).toBeVisible();
    await expect(options.filter({ hasText: "Line 2" })).toBeVisible();
    await expect(options.filter({ hasText: "Line 3" })).toBeVisible();
    await expect(await options.count()).toBe(3);
    await options.filter({ hasText: "Line 3" }).click();
    await page.pause();
    await getTable(page);
  });
});
