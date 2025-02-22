import { expect } from "@playwright/test";
import { productsPage } from "tests/utils/testFixture";

productsPage.test.describe("Rendering", () => {
  productsPage.test.use({
    mockData: {
      data: {
        devices: [
          ...Array.from({ length: 99 }, (_, i) => ({
            id: String(i + 1),
            product: { name: `AAA ${i + 1}` },
          })),
          ...[
            {
              id: "Last",
              product: { name: `XX Last` },
            },
          ],
        ],
        version: "1.0.0",
      },
      status: 200,
    },
  });

  productsPage.test("Switch view mode", async ({ page }) => {
    //Navigate between list and table view
    await expect(page.locator('[data-part="device-table"]')).toBeVisible();
    await page.locator('[data-part="view-mode-list-btn"]').click();
    await expect(page.locator('[data-part="device-list"]')).toBeVisible();
    await page.locator('[data-part="view-mode-table-btn"]').click();
    await expect(page.locator('[data-part="device-table"]')).toBeVisible();
  });

  productsPage.test("Open close details", async ({ page }) => {
    //Navigate between list and table view
    await expect(page.locator('[data-part="device-table"]')).toBeVisible();
    await page.getByText("AAA 1", { exact: true }).click();
    await expect(page.locator('[data-part="device-table"]')).toBeVisible();
    await expect(page.locator('[data-part="device-description"]')).toHaveText(
      "AAA 1"
    );

    await expect(page.getByText("AAA 1", { exact: true })).toBeVisible();
    await expect(page.locator('[data-part="device-image"]')).toBeVisible();
    await page.pause();
  });

  productsPage.test(
    //This tests the measure height wrapper
    "Make sure the last item in the table are visible",
    async ({ page, setViewport }) => {
      await setViewport({ width: 550, height: 450 }); //Make sure its scrollable
      const tableBody = await page
        .locator(".ant-table-tbody-virtual-holder")
        .first();
      await expect(tableBody).toBeVisible();
      await tableBody.evaluate((node) => {
        node.scrollTop = node.scrollHeight;
      });
      await page.pause();
      await expect(page.getByText("XX Last")).toBeVisible();
    }
  );
});
