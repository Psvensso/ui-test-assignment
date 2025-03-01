import styled from "@emotion/styled";
import { Button, Checkbox, ConfigProvider, Popover } from "antd";
import { TooltipPlacement } from "antd/es/tooltip";
import { ComponentProps, PropsWithChildren, useMemo, useRef } from "react";
import { styleConst } from "../../utils/theming/styleConst";
const DropDownBtn = styled(Button)`
  &[data-state="active"] {
    color: ${styleConst.colors.uniFi.blue06};
  }
`;
const DropDownContent = styled.div`
  max-height: calc(95vh - 150px);
  min-height: 200px;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;

  [data-part="options-title"] {
    font-weight: bold;
    color: ${styleConst.colors.text.black85};
    margin-bottom: 16px;
  }

  [data-part="options-list"] {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow-y: auto;
    > label {
      padding: 4px 6px;

      :hover {
        background-color: rgb(237, 237, 240);
      }
    }
  }

  [data-part="options-footer"] {
    margin-top: 12px;
  }
`;

type TProps = {
  selectedKeys: Record<string, boolean>;
  onChange: (keys: Record<string, boolean>) => void;
  options: Record<string, string>;
  dropdownTitle?: string;
  buttonProps?: Partial<ComponentProps<typeof Button>> & {
    "area-label": string;
  };
  placement?: Extract<
    TooltipPlacement,
    "bottom" | "leftBottom" | "rightBottom"
  >;
  open?: boolean;
};

export const DropdownSelect = (p: PropsWithChildren<TProps>) => {
  const {
    selectedKeys,
    options,
    dropdownTitle,
    buttonProps = {},
    placement,
    open,
  } = p;
  const sortedOptions = useMemo(() => {
    return Object.entries(options).sort(([, a], [, b]) => a.localeCompare(b));
  }, [options]);
  const dropDownBtnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const anyActiveFilterKeys =
    Object.values(selectedKeys).find((x) => x) !== undefined;

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: { colorTextDisabled: styleConst.colors.uniFi.red02 },
        },
      }}
    >
      <Popover
        content={
          <DropDownContent data-part="dropdown-content">
            {dropdownTitle && (
              <div data-part="options-title">{dropdownTitle}</div>
            )}
            <div data-part="options-list">
              {sortedOptions.map(([key, val]) => (
                <Checkbox
                  key={key}
                  data-part="option-item"
                  checked={selectedKeys[key]}
                  onChange={(e) => {
                    const obj = {
                      ...selectedKeys,
                    };
                    if (e.target.checked) {
                      obj[key] = true;
                    } else {
                      delete obj[key];
                    }
                    p.onChange(obj);
                  }}
                >
                  {val}
                </Checkbox>
              ))}
            </div>
            <div data-part="options-footer">
              <Button
                type="text"
                danger
                aria-label="Reset"
                data-part="reset-button"
                disabled={anyActiveFilterKeys === false}
                onClick={() => {
                  p.onChange({});
                }}
              >
                Reset
              </Button>
            </div>
          </DropDownContent>
        }
        arrow={false}
        placement={placement ? placement : "bottomLeft"}
        open={open}
      >
        <DropDownBtn
          ref={dropDownBtnRef}
          {...buttonProps}
          data-state={anyActiveFilterKeys ? "active" : "inactive"}
          data-part="dropdown-button"
          type="text"
        >
          {p.children}
        </DropDownBtn>
      </Popover>
    </ConfigProvider>
  );
};
