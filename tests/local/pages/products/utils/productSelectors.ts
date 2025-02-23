import { Page } from "@playwright/test";

export const getTable = (page: Page) =>
  page.locator('[data-part="device-table"]');
export const getList = (page: Page) =>
  page.locator('[data-part="device-list"]');
export const getDetailsWrapper = (page: Page) =>
  page.locator('[data-part="device-details"]');
