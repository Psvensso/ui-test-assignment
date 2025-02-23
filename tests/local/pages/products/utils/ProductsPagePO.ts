import { TViewMode, type TSearchParams } from "@/utils/routeConsts";
import { Locator, Page } from "@playwright/test";
type LocatorOptions = Parameters<Locator["locator"]>["1"];
export class ProductsPagePO {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  open = async (args?: {
    viewPort?: { width: number; height: number };
    searchParams?: null | Partial<TSearchParams>;
  }) => {
    const { searchParams, viewPort } = args || {};

    if (viewPort) {
      await this.page.setViewportSize(viewPort);
    }

    if (searchParams) {
      await this.page.goto("/?" + new URLSearchParams(searchParams).toString());
    } else {
      await this.page.goto("/");
    }
  };

  filterAndNavRow = {
    switchViewMode: async (vm: TViewMode) => {
      await this.page
        .getByRole("button", { name: "Toggle to list view mode" })
        .click();
    },
    fillFreetextFilter: async (text: string) => {
      const input = this.filterAndNavRow.getFreetextFilterInput();
      await input.fill(text);
    },
    getFreetextFilterInput: () =>
      this.page.getByRole("textbox", {
        name: "Free-text filter",
      }),
    getDeviceCount: () => this.page.locator('[data-part="totals"]').first(),
  };
  listView = {
    getListItemCard: () => this.page.locator('[data-part="product-list-card"]'),
    getListWrapper: () => this.page.locator('[data-part="device-list"]'),
    scrollToListBottom: async () => {
      await this.listView.getListItemCard().first().focus();
      await this.page.keyboard.press("End");
    },
  };
  tableView = {
    getTableWrapper: () =>
      this.page.locator('[data-part="device-table"]').first(),
    getRows: (ops?: LocatorOptions) =>
      this.page.locator('[data-part="device-table-row"]', ops),

    scrollToTableBottom: async () => {
      await this.tableView.getRows().first().focus();
      await this.page.keyboard.press("End");
    },
  };
  detailsView = {
    closeDetails: async () => {
      await this.detailsView
        .getDetailsWrapper()
        .getByRole("button", { name: "close details" })
        .click();
    },
    getDetailsWrapper: () => this.page.locator('[data-part="device-details"]'),
  };
}
