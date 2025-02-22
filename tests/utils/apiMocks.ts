import { DATA_API_ENDPOINT } from "@/utils/dataLoader";
import { Page } from "@playwright/test";

export async function mockImages(page: Page) {
  await page.route("**/*.{png,jpg,jpeg,webp}", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "image/png",
      body: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
        "base64"
      ),
    });
  });
}

export async function mockJsonData<T>(page: Page, data: T, status = 200) {
  await page.route(DATA_API_ENDPOINT, async (route) => {
    await route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify(data),
    });
  });
}
