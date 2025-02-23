import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getAllByDataPart, getByDataPart } from "./../../test-utils";
import { DropdownSelect } from "./DropdownSelect";

const defaultProps = {
  options: { "1": "Option 1", "2": "Option 2" },
  onChange: vi.fn(),
  selectedKeys: {},
  children: "btn content",
  buttonProps: {
    "area-label": "ar-lbl",
  },
};

describe("DropdownSelect", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("init", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("loads and displays dropdown btn", async () => {
      // ARRANGE
      const { container } = render(
        <DropdownSelect {...defaultProps} open={true} />
      );

      const element = getByDataPart(container, "dropdown-button");
      expect(element).toHaveTextContent("btn content");
      expect(element).toHaveAttribute("area-label", "ar-lbl");
      expect(element).not.toHaveAttribute("data-state", "active");
      expect(element).toHaveAttribute("data-state", "inactive");
    });

    it("loads with active elements", async () => {
      // ARRANGE
      const { container } = render(
        <DropdownSelect
          {...defaultProps}
          open={true}
          selectedKeys={{ "1": true }}
        />
      );

      const dropBtn = getByDataPart(container, "dropdown-button");
      expect(dropBtn).toHaveAttribute("data-state", "active");
      expect(dropBtn).not.toHaveAttribute("data-state", "inactive");

      const dropContent = getByDataPart(document.body, "dropdown-content");
      expect(dropContent).toBeDefined();

      //Get all active input options
      const optionItems = getAllByDataPart(dropContent, "option-item");
      expect(optionItems).toHaveLength(2);
      expect(optionItems[0]).toHaveAttribute("checked");
      expect(optionItems[1]).not.toHaveAttribute("checked");
    });
  });
  describe("selecting and interaction", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("loads and displays dropdown btn", async () => {
      // ARRANGE
      const { container } = render(
        <DropdownSelect {...defaultProps} open={true} />
      );

      const element = getByDataPart(container, "dropdown-button");
      expect(element).toHaveTextContent("btn content");
      expect(element).toHaveAttribute("area-label", "ar-lbl");
      expect(element).not.toHaveAttribute("data-state", "active");
      expect(element).toHaveAttribute("data-state", "inactive");
    });
  });

  describe("active state", () => {
    const defaultProps = {
      options: { "1": "Option 1", "2": "Option 2" },
      onChange: vi.fn(),
      selectedKeys: {},
      children: "btn content",
    };

    it("renders inactive when no selected keys provided", () => {
      const { container } = render(<DropdownSelect {...defaultProps} />);
      const element = getByDataPart(container, "dropdown-button");
      expect(element).toHaveAttribute("data-state", "inactive");
    });

    it("show active when provided with active key", () => {
      const { container } = render(
        <DropdownSelect
          {...defaultProps}
          {...{ selectedKeys: { "1": true } }}
        />
      );
      const element = getByDataPart(container, "dropdown-button");
      expect(element).toHaveAttribute("data-state", "active");
    });
  });
});
