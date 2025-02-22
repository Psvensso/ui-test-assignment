import { DATA_API_ENDPOINT, TApiDeviceResponse } from "@/utils/dataLoader";
import { BASE_IMAGE_URL } from "@/utils/imageUtils";
import { type TProductsPageSearchParams } from "@/utils/routeConsts";
import { test as base } from "@playwright/test";
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
  searchParams: null | Partial<Record<TProductsPageSearchParams, string>>;
  setup: void;
  setViewport: (config: { width: number; height: number }) => Promise<void>;
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
    searchParams: [null, { option: true }],
    setViewport: async ({ page }, use) => {
      await use(async (config) => {
        await page.setViewportSize(config);
      });
    },
    setup: [
      async ({ page, mockData, searchParams, imageBody }, use) => {
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

        if (searchParams) {
          await page.goto("/" + new URLSearchParams(searchParams).toString());
        } else {
          await page.goto("/");
        }

        await use();
      },
      { auto: true },
    ],
  }),
};
