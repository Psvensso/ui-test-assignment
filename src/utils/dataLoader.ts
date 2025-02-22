import { Device } from "./types";

/**
 * Dataloader for devices data
 *
 * This module is responsible for fetching and caching the devices data from the API.
 * It also caches the data for other consumer to use directly.
 * Use this with the "new" React use hook.
 *
 * This data could be bundled with the app but for greater flexibility and if the data
 * change we opted to load for api.
 *
 * If the API request fails, it will throw an ApiError and shown in the ErrorBoundary.
 */

export const DATA_API_ENDPOINT =
  "https://static.ui.com/fingerprint/ui/public.json";
export type TApiDeviceResponse = {
  version: string;
  devices: Readonly<Device>[];
};

let dataPromise: Promise<TApiDeviceResponse> | null = null;

export class ApiError extends Error {
  constructor(
    public status: number,
    message?: string
  ) {
    super(message || `API error: ${status}`);
    this.name = "ApiError";
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export const fetchDevicesData = async () => {
  if (dataPromise) {
    return dataPromise;
  }

  dataPromise = fetch(DATA_API_ENDPOINT)
    .then(async (response) => {
      if (!response.ok) {
        throw new ApiError(response.status);
      }
      return response.json();
    })
    .then((jsonResponse: unknown) => {
      if (!isKindaValidDeviceResponse(jsonResponse)) {
        throw new ValidationError("Invalid response structure from API");
      }

      return jsonResponse;
    })
    .catch((error) => {
      // Clear the cache on error
      dataPromise = null;
      throw error;
    });

  return dataPromise;
};

function isKindaValidDeviceResponse(
  response: unknown
): response is TApiDeviceResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "version" in response &&
    "devices" in response &&
    Array.isArray((response as TApiDeviceResponse).devices)
  );
}

export const clearDevicesCache = () => {
  dataPromise = null;
};
