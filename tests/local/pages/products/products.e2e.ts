import { expect, Page } from "@playwright/test";
import { productsPage } from "./utils/productsPageFixture";
const test = productsPage.test;

async function scrollToListBottom(page: Page) {
  //Focus the first element and press End

  const el = await page.locator('[data-part="product-list-card"]').first();
  await el.focus();
  //Press keyboard END to scroll to list end
  await page.keyboard.press("End");
}

test.describe("Rendering", () => {
  test.use({
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

  test(//This tests the measure virtual height observer
  "Make sure the last item in the table are visible", async ({
    page,

    productsPage,
  }) => {
    await productsPage.open({
      viewPort: { width: 550, height: 450 },
    });
    await productsPage.tableView.scrollToTableBottom();
    await expect(page.getByText("XX Last")).toBeVisible();
  });

  test.describe("Navigation", () => {
    test("Switch view mode", async ({
      page,
      productsPage: {
        open,
        listView: { getListWrapper },
        tableView: { getTableWrapper },
      },
    }) => {
      open();
      //Navigate between list and table view
      await expect(getTableWrapper()).toBeVisible();
      await page.locator('[data-part="view-mode-list-btn"]').click();
      await expect(getListWrapper()).toBeVisible();
      await page.locator('[data-part="view-mode-table-btn"]').click();
      await expect(getTableWrapper()).toBeVisible();
    });
    test("Open close details", async ({
      page,
      productsPage: {
        open,
        detailsView: { getDetailsWrapper },
        listView: { getListWrapper },
        tableView: { getTableWrapper },
      },
    }) => {
      open();
      //Navigate between list and table view
      //Table is visible
      await expect(getTableWrapper()).toBeVisible();
      //Click first row
      await page.getByText("AAA 1", { exact: true }).click();
      await expect(getTableWrapper()).not.toBeVisible();
      await expect(getListWrapper()).not.toBeVisible();
      //Should open details
      const details = await getDetailsWrapper();
      await expect(details).toBeVisible();
      //Close
      await details.getByRole("button", { name: "close details" }).click();
      await expect(getTableWrapper()).toBeVisible();
      await expect(getListWrapper()).not.toBeVisible();
    });
    test("Open close details keeps scroll position in table", async ({
      page,
      productsPage: {
        open,
        detailsView: { getDetailsWrapper },
        listView: { getListWrapper },
        tableView: { getTableWrapper, scrollToTableBottom },
      },
    }) => {
      open({
        viewPort: { width: 550, height: 450 },
      });

      //Navigate between list and table view
      //Table is visible
      await expect(getTableWrapper()).toBeVisible();
      await scrollToTableBottom();
      //Click first row
      await getTableWrapper().getByText("XX Last", { exact: true }).click();
      await expect(getTableWrapper()).not.toBeVisible();
      await expect(getListWrapper()).not.toBeVisible();
      await expect(getDetailsWrapper()).toBeVisible();

      await page.waitForTimeout(10);
      //Close
      await page.getByRole("button", { name: "close details" }).click();
      await expect(getTableWrapper()).toBeVisible();

      await expect(
        getTableWrapper().getByText("XX Last", { exact: true })
      ).toBeVisible();
    });
  });
  test.describe("Table", () => {
    test.skip("End and home scrolls table to first/last item", async ({
      page,
    }) => {
      //TODO
    });
  });
  test.describe("List", () => {
    test.beforeEach(async ({ productsPage }) => {
      await productsPage.open({
        searchParams: {
          productsViewMode: "l",
        },
      });
    });

    test.skip("End and home scrolls table to first/last item", async ({
      page,
    }) => {
      //TODO
    });

    test("Open close details keeps scroll position in list", async ({
      page,
      productsPage: {
        open,
        listView: { getListWrapper },
      },
    }, use) => {
      open({
        searchParams: {
          productsViewMode: "l",
        },
        viewPort: { width: 550, height: 450 },
      });

      const list = await getListWrapper();
      await expect(list).toBeVisible();
      await scrollToListBottom(page);
      //Click first row
      //Ensure list is scrolled last by finding [data-part="product-name"] with text "XX Last"
      const lastItem = await getListWrapper().getByText("XX Last", {
        exact: true,
      });
      await expect(lastItem).toBeVisible();
      await lastItem.click();
      //Close
      await page.getByRole("button", { name: "close details" }).click();
      await expect(getListWrapper()).toBeVisible();
      await expect(
        getListWrapper().getByText("XX Last", { exact: true })
      ).toBeVisible();
    });
  });

  test.describe("Details", () => {
    test.beforeEach(async ({ productsPage }) => {
      await productsPage.open();
    });

    test("Navigate next / forward in details", async ({
      page,

      productsPage: {
        tableView: { getTableWrapper },
        listView: { getListWrapper },
        detailsView: { getDetailsWrapper },
      },
    }) => {
      //Navigate between list and table view
      //Table is visible
      await expect(getTableWrapper()).toBeVisible();
      //Click first row
      await page.getByText("AAA 1", { exact: true }).click();
      await expect(getTableWrapper()).not.toBeVisible();
      await expect(getListWrapper()).not.toBeVisible();
      await expect(getDetailsWrapper()).toBeVisible();
      //Close
      await page.getByRole("button", { name: "close details" }).click();
      await expect(getTableWrapper()).toBeVisible();
      await expect(getListWrapper()).not.toBeVisible();
    });
  });
});
