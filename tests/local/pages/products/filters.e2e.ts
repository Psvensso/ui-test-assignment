import { expect } from "@playwright/test";
import { productsPage } from "./utils/productsPageFixture";
const test = productsPage.test;
test.describe("Filters", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.open();
  });

  test.use({
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
  test("Filter", async ({
    page,

    productsPage: {
      filterAndNavRow: { getDeviceCount, fillFreetextFilter },
      tableView: { getRows },
    },
  }) => {
    await page.locator('[data-part="dropdown-button"]').hover();
    const options = await page.locator('[data-part="options-list"] > label');
    //The children of the list
    await expect(options.filter({ hasText: "Line 1" })).toBeVisible();
    await expect(options.filter({ hasText: "Line 2" })).toBeVisible();
    await expect(options.filter({ hasText: "Line 3" })).toBeVisible();
    await expect(await options.count()).toBe(3);
    await options.filter({ hasText: "Line 3" }).click();
    await options.filter({ hasText: "Line 2" }).click();

    //Line filter works
    await expect(getRows({ hasText: "Line 1" })).toBeHidden();
    await expect(getRows({ hasText: "Line 2" })).toBeVisible();
    await expect(getRows({ hasText: "Line 3" })).toBeVisible();

    await expect(getDeviceCount()).toContainText("2/3");

    //Line filter in combination with freetext filter works
    await fillFreetextFilter("Two");

    await expect(getRows({ hasText: "Line 1" })).toBeHidden();
    await expect(getRows({ hasText: "Line 2" })).toBeVisible();
    await expect(getRows({ hasText: "Line 3" })).toBeHidden();
    await expect(getDeviceCount()).toContainText("1/3");

    //Resetting filters
    //Test the dropdown filter
  });
});
