import { expect } from "@playwright/test";
import { productsPage } from "./utils/productsPageFixture";
const test = productsPage.test;

const nameOfLastTestDataItem = "XX Last";
const idOfLastTestDataItem = "Last";

test.describe("Rendering", () => {
  test.use({
    mockData: {
      data: {
        devices: [
          ...Array.from({ length: 99 }, (_, i) => ({
            id: String(i + 1),
            product: { name: `AAA ${i + 1}` },
          })),
          {
            id: idOfLastTestDataItem,
            product: { name: nameOfLastTestDataItem },
          },
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
    await expect(page.getByText(nameOfLastTestDataItem)).toBeVisible();
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
        detailsView: { getDetailsWrapper, closeDetails },
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
      await closeDetails();
      await expect(getTableWrapper()).toBeVisible();
      await expect(getListWrapper()).not.toBeVisible();
    });
    test("Open/Close details keeps scroll position in table", async ({
      page,
      productsPage: {
        open,
        detailsView: { getDetailsWrapper, closeDetails },
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
      await getTableWrapper().getByText(nameOfLastTestDataItem).click();
      await expect(getTableWrapper()).not.toBeVisible();
      await expect(getListWrapper()).not.toBeVisible();
      await expect(getDetailsWrapper()).toBeVisible();

      await page.waitForTimeout(10);
      //Close
      await closeDetails();
      await expect(getTableWrapper()).toBeVisible();

      await expect(
        getTableWrapper().getByText(nameOfLastTestDataItem)
      ).toBeVisible();
    });
  });

  test.describe("Table", () => {
    test.beforeEach(async ({ productsPage: { open } }) => {
      await open();
    });
    test("End and home scrolls table to first/last item", async ({
      productsPage: {
        tableView: { scrollToTableBottom, getRows },
      },
    }) => {
      await scrollToTableBottom();
      await expect(getRows({ hasText: nameOfLastTestDataItem })).toBeVisible();
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
    test("End and home scrolls list to first/last item", async ({
      productsPage: {
        listView: { scrollToListBottom, getListWrapper },
      },
    }) => {
      await scrollToListBottom();
      const lastItem = await getListWrapper().getByText(nameOfLastTestDataItem);
      await expect(lastItem).toBeVisible();
    });
    test("Open/Close details details keeps scroll position in list", async ({
      productsPage: {
        open,
        detailsView: { closeDetails },
        listView: { getListWrapper, scrollToListBottom },
      },
    }) => {
      open({
        searchParams: {
          productsViewMode: "l",
        },
        viewPort: { width: 550, height: 450 },
      });

      const list = await getListWrapper();
      await expect(list).toBeVisible();
      await scrollToListBottom();
      //Click first row
      //Ensure list is scrolled last by finding [data-part="product-name"] with text "XX Last"
      const lastItem = await getListWrapper().getByText(nameOfLastTestDataItem);
      await expect(lastItem).toBeVisible();
      await lastItem.click();
      //Close
      await closeDetails();
      await expect(lastItem).toBeVisible();
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
        detailsView: { getDetailsWrapper, closeDetails },
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
      await closeDetails();
      await expect(getTableWrapper()).toBeVisible();
      await expect(getListWrapper()).not.toBeVisible();
    });
  });
});
