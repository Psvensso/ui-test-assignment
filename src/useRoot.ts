import { useCallback, useMemo } from "react";
import { createTypedContext } from "./utils/createTypedContext";
import { TApiDeviceResponse } from "./utils/dataLoader";
import { useImagePreloader } from "./utils/imageUtils";
import { Device } from "./utils/types";
type LineId = string | number;
type LineName = string;
type TStatics = Readonly<{
  deviceLookup: Record<
    string,
    {
      sortedIndex: number;
      device: Readonly<Device>;
    }
  >;
  options: {
    lines: Record<LineId, LineName>;
  };
}>;

const defaultValue: readonly Readonly<Device>[] = [];

export const useRoot = ({ devices, version }: TApiDeviceResponse) => {
  const sortedDevices = useMemo(() => {
    if (!devices) return defaultValue;

    return [...devices].sort((a, b) =>
      (a?.product?.name || "").localeCompare(b?.product?.name || "")
    );
  }, [devices]);
  useImagePreloader(sortedDevices, version);
  /**
   * Static lookups that are not expected to change
   * These are used for lookups (get device by id) and options (all lines for all devices etc)
   * These should be O(n)
   */
  const staticLookups = useMemo(() => {
    if (!sortedDevices) {
      return {
        deviceLookup: {},
        options: { lines: {} },
      } satisfies TStatics;
    }

    return sortedDevices.reduce<TStatics>(
      (acc, device, i) => {
        if (!device.id) {
          return acc;
        }
        acc.deviceLookup[device.id] = {
          device,
          sortedIndex: i,
        };
        if (device?.line?.id) {
          acc.options.lines[device.line.id] =
            device.line.name || device.line.id;
        }
        return acc;
      },
      Object.freeze({
        options: { lines: {} },
        deviceLookup: {},
      })
    );
  }, [sortedDevices]);

  const getNextDeviceId = useCallback(
    (deviceId: string) => {
      const currentLookup = staticLookups.deviceLookup[deviceId];
      if (!currentLookup) {
        return sortedDevices[0]?.id;
      }
      const { sortedIndex } = currentLookup;
      const nextDevice = sortedDevices[sortedIndex + 1];
      if (!nextDevice) {
        return sortedDevices[0]?.id;
      }
      return nextDevice?.id;
    },
    [sortedDevices, staticLookups.deviceLookup]
  );

  const getPreviousDeviceId = useCallback(
    (deviceId: string) => {
      const currentLookup = staticLookups.deviceLookup[deviceId];
      if (!currentLookup) {
        return sortedDevices[0]?.id;
      }
      const { sortedIndex } = currentLookup;
      if (sortedIndex <= 0) {
        return sortedDevices[sortedDevices.length - 1]?.id;
      }
      return sortedDevices[sortedIndex - 1]?.id;
    },
    [sortedDevices, staticLookups.deviceLookup]
  );

  return {
    getPreviousDeviceId,
    getNextDeviceId,
    staticLookups,
    sortedDevices,
  };
};

export type TRootContext = ReturnType<typeof useRoot>;
const [RootProvider, useRootContext] = createTypedContext<TRootContext>({
  name: "RootContext",
  errorMessage:
    "useRootContext: `context` is undefined. Seems you forgot to wrap the panel parts in `<RootProvider />`",
});

export { RootProvider, useRootContext };
