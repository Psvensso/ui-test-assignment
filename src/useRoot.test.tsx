import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useRoot } from "./useRoot";
import { Device } from "./utils/types";

// src/useRoot.test.ts

describe("useRoot", () => {
  const mockDevices: Device[] = [
    {
      id: "a",
      product: { name: "A Product" },
      line: { id: "1", name: "UniFi" },
    },
    {
      id: "b",
      product: { name: "B Product" },
      line: { id: "2", name: "UniFi Access" },
    },
    {
      id: "c",
      product: { name: "C Product" },
      line: { id: "3", name: "airMAX" },
    },
  ];

  describe("sorts", () => {
    it("should sort devices by product name", () => {
      const unorderedDevs = [
        {
          id: "b",
          product: { name: "B Product" },
        },
        {
          id: "c",
          product: { name: "C Product" },
        },
        {
          id: "a",
          product: { name: "A Product" },
        },
      ];

      const { result } = renderHook(() =>
        useRoot({
          devices: unorderedDevs,
          version: "0",
        })
      );

      expect(result.current.sortedDevices).toEqual([
        unorderedDevs[2],
        unorderedDevs[0],
        unorderedDevs[1],
      ]);
    });
  });
  describe("getNextDeviceId", () => {
    it("should return the next device id in sequence", () => {
      const { result } = renderHook(() =>
        useRoot({ devices: mockDevices, version: "0" })
      );

      expect(result.current.getNextDeviceId("a")).toBe("b");
      expect(result.current.getNextDeviceId("b")).toBe("c");
    });

    it("should wrap to first device when at the end", () => {
      const { result } = renderHook(() =>
        useRoot({ devices: mockDevices, version: "0" })
      );

      expect(result.current.getNextDeviceId("c")).toBe("a");
    });

    it("should return first device id when given empty string", () => {
      const { result } = renderHook(() =>
        useRoot({ devices: mockDevices, version: "0" })
      );
      expect(result.current.getNextDeviceId("")).toBe("a");
    });

    it("should return first device id when given invalid device ID", () => {
      const { result } = renderHook(() =>
        useRoot({ devices: mockDevices, version: "0" })
      );
      expect(result.current.getNextDeviceId("bad")).toBe("a");
    });

    /**Same but for getPreviousDeviceId */
    it("should return the previous device id in sequence", () => {
      const { result } = renderHook(() =>
        useRoot({ devices: mockDevices, version: "0" })
      );

      expect(result.current.getPreviousDeviceId("c")).toBe("b");
      expect(result.current.getPreviousDeviceId("b")).toBe("a");
    });

    it("should wrap to last device when at the beginning", () => {
      const { result } = renderHook(() =>
        useRoot({ devices: mockDevices, version: "0" })
      );

      expect(result.current.getPreviousDeviceId("a")).toBe("c");
    });

    it("should return the first when given bad id", () => {
      const { result } = renderHook(() =>
        useRoot({ devices: mockDevices, version: "0" })
      );
      expect(result.current.getPreviousDeviceId("")).toBe("a");
    });
  });
});
