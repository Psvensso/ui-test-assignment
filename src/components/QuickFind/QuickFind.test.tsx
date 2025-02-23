import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getByDataPart } from "../../test-utils";
import * as RootModule from "../../useRoot";
import { QuickFind } from "./QuickFind";
describe("QuickFind", () => {
  beforeAll(() => {
    // https://github.com/testing-library/user-event/issues/1115
    // https://vitest.dev/api/vi.html#vi-stubglobal
    vi.stubGlobal("jest", {
      advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
    });
  });

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    // Type-safe mock using spyOn
    vi.spyOn(RootModule, "useRootContext").mockReturnValue({
      sortedDevices: [
        {
          id: "1",
          product: { name: "Dream Machine" },
          line: { name: "UniFi", id: "unifi-network" },
        },
        {
          id: "2",
          product: { name: "Dream Machine Two" },
          line: { name: "UniFi", id: "unifi-network" },
        },
        {
          id: "3",
          product: { name: "Access hub" },
          line: { name: "UniFi Access", id: "unifi-access" },
        },
        {
          id: "4",
          product: { name: "Access hub 2" },
          line: { name: "UniFi Access", id: "unifi-access" },
        },
      ],
    } satisfies Partial<RootModule.TRootContext> as never);
  });
  afterEach(() => {
    // Ensures all pending timers are flushed before switching to real timers
    // Reference: https://testing-library.com/docs/using-fake-timers/
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it("renders with initial empty state", async () => {
    render(<QuickFind />);
    const wrapper = await getByDataPart(document.body, "quick-find");
    expect(wrapper).toBeInTheDocument();
    expect(screen.queryByTestId("quick-find-option")).not.toBeInTheDocument();
  });

  it("shows all options when no search text", async () => {
    const user = userEvent.setup({
      advanceTimers: vi.advanceTimersByTime.bind(vi),
    });

    render(<QuickFind />);
    const input = screen.getByRole("combobox");
    await user.click(input);
    await waitFor(async () => {
      await expect(screen.getAllByTestId("quick-find-option")).toHaveLength(4);
    });
  });

  it("Filters as expected", async () => {
    const user = userEvent.setup({
      advanceTimers: vi.advanceTimersByTime.bind(vi),
    });

    render(<QuickFind />);
    const input = screen.getByRole("combobox");

    await user.type(input, "Access hub");

    await waitFor(() => {
      const options = screen.getAllByTestId("quick-find-option");
      expect(options).toHaveLength(2);
      const ahOptions = screen.getAllByText(/^Access hub$/);
      expect(ahOptions).toHaveLength(2);
    });
  });

  it("Sorts highest hits first", async () => {
    const user = userEvent.setup({
      advanceTimers: vi.advanceTimersByTime.bind(vi),
    });

    render(<QuickFind />);
    const input = screen.getByRole("combobox");
    user.type(input, "Dream Machine");

    await waitFor(() => {
      const options = screen.getAllByTestId("quick-find-option");
      expect(options).toHaveLength(2);
      expect(options[0]).toHaveTextContent("Dream Machine");
      expect(options[1]).toHaveTextContent("Dream Machine Two");
    });
  });
});
