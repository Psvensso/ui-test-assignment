import { type TSearchParams } from "@/utils/routeConsts";
import { Page } from "@playwright/test";

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

  listView = {
    getListWrapper: () => this.page.locator('[data-part="device-list"]'),
  };
  tableView = {
    getTableWrapper: () => this.page.locator('[data-part="device-table"]'),
    scrollToTableBottom: async () => {
      const el = await this.page
        .locator('[data-part="device-table-row"]')
        .first();
      await el.focus();
      await this.page.keyboard.press("End");
    },
  };
  detailsView = {
    getDetailsWrapper: () => this.page.locator('[data-part="device-details"]'),
  };
}
