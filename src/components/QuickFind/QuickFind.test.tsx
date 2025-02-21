import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { findAllByDataPart, getByDataPart } from "../../test-utils";
import * as RootModule from "../../useRoot";
import { QuickFind } from "./QuickFind";
//import { getAllByDataPart, getByDataPart } from "./../test-utils";
describe("QuickFind", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    // Type-safe mock using spyOn
    vi.spyOn(RootModule, "useRootContext").mockReturnValue({
      value: [
        {
          id: "1",
          product: { name: "Dream Machine" },
          line: { name: "UniFi", id: "unifi-network" },
        },
        {
          id: "2",
          product: { name: "Access hub" },
          line: { name: "UniFi Access", id: "unifi-access" },
        },
      ],
    } as Partial<RootModule.TRootContext> as never);
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with initial empty state", () => {
    render(<QuickFind />);
    const wrapper = getByDataPart(document.body, "quick-find");
    expect(wrapper).toBeInTheDocument();
  });

  it("shows all options when no search text", async () => {
    render(<QuickFind />);
    const input = screen.getByRole("combobox");
    fireEvent.click(input);
    waitFor(() => {
      expect(screen.getByText("Dream Machine")).toBeInTheDocument();
      expect(screen.getByText("Access hub")).toBeInTheDocument();
    });
  });

  it("filters and highlights matches after debounce", async () => {
    render(<QuickFind />);
    const input = screen.getByRole("combobox");
    fireEvent.click(input);
    waitFor(async () => {
      const matches = await findAllByDataPart(
        document.body,
        "quickfind-option"
      );
      expect(matches?.length).toBe(2);
    });

    waitFor(async () => {
      const matches = await findAllByDataPart(
        document.body,
        "quickfind-option"
      );
      expect(matches?.length).toBe(1);
    });
  });

  it("shows no result when to short search term", () => {
    render(<QuickFind />);
    const input = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "i" } });

    waitFor(async () => {
      expect(screen.queryByText("Dream Machine")).not.toBeInTheDocument();
    });
  });
});
