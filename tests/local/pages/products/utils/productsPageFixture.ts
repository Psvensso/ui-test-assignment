import { DATA_API_ENDPOINT, TApiDeviceResponse } from "@/utils/dataLoader";
import { BASE_IMAGE_URL } from "@/utils/imageUtils";
import { test as base } from "@playwright/test";
import { ProductsPagePO } from "./ProductsPagePO";
import { TopTenProductsResponse } from "./topTenProducts";

const BLANK_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64"
);

type TestFixtures = {
  mockData: {
    data: TApiDeviceResponse;
    status?: number;
  };
  imageBody: Buffer<ArrayBuffer>;
  setup: void;
  productsPage: ProductsPagePO;
};

export const productsPage = {
  test: base.extend<TestFixtures>({
    mockData: async ({}, use) => {
      await use({
        data: TopTenProductsResponse,
        status: 200,
      });
    },
    imageBody: [BLANK_PNG, { option: true }],

    productsPage: async ({ page }, use) => {
      await use(new ProductsPagePO(page));
    },
    setup: [
      async ({ page, mockData, imageBody }, use) => {
        // Mock all image requests
        await page.route(BASE_IMAGE_URL, async (route) => {
          await route.fulfill({
            status: 200,
            contentType: "image/png",
            body: imageBody,
          });
        });

        // Mock API endpoint
        await page.route(DATA_API_ENDPOINT, async (route) => {
          await route.fulfill({
            status: mockData.status ?? 200,
            contentType: "application/json",
            body: JSON.stringify(mockData.data),
          });
        });

        await use();
      },
      { auto: true },
    ],
  }),
};
