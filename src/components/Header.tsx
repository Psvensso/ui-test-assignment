import styled from "@emotion/styled";
import { useSearchParams } from "react-router";
import { SEARCH_PARAMS } from "../utils/routeConsts";
import { styleConst } from "../utils/theming/styleConst";
import { QuickFind } from "./QuickFind/QuickFind";
import { UiLogoSvg } from "./UiLogoSvg";

const HeaderWrapper = styled.header`
  background-color: ${styleConst.colors.uniFi.neutral02};
  color: #808893;
  display: flex;
  flex-wrap: wrap; /* Allow content to wrap */
  justify-content: center; /* Center the content area */
  width: 100%; /* Ensure full width */

  [data-part="header-content-area"] {
    flex: 1;
    display: flex;
    flex-direction: row;
    max-width: ${styleConst.responsive.maxWidth};
    align-items: center;
    justify-content: space-between;
    padding: 0 32px; /* Added left padding for consistency */
    gap: 12px;

    @media (max-width: ${styleConst.breakpoints.sm450}) {
      flex-direction: column;
      padding: 0 16px;
    }

    [data-part="left-head-area"] {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;

      [data-part="logo-link"] {
        width: 50px;
        height: 50px;
        box-sizing: border-box;

        &:focus {
          border-color: ${styleConst.colors.uniFi.blue06};
          border: 1px solid ${styleConst.colors.uniFi.blue06};
        }

        [data-part="logo-icon"] {
          color: ${styleConst.colors.uniFi.neutral10};

          :hover {
            color: ${styleConst.colors.uniFi.blue06};
          }
        }
      }

      [data-part="title"] {
        font-size: 14px;
        line-height: 20px;
        color: #808893;
        white-space: nowrap; /* Prevent title from wrapping */
      }
    }

    [data-part="right-head-area"] {
      display: flex;
      align-items: center;
      flex: 1;
      max-width: 300px;
      gap: 12px;

      [data-part="quick-find"] {
        width: 250px;
        z-index: 2;
      }

      @media (max-width: ${styleConst.breakpoints.sm450}) {
        width: 100%;
        flex-direction: column;
        [data-part="quick-find"] {
          width: 100%;
        }
      }

      [data-part="author"] {
        z-index: 1;
        font-size: 14px;
        line-height: 20px;
        color: #808893;
        text-align: right;
        flex: 1;
        white-space: nowrap;
      }
    }
  }
`;

export const Header = () => {
  const [, updateParams] = useSearchParams();
  return (
    <HeaderWrapper>
      <div data-part="header-content-area">
        <div data-part="left-head-area">
          <a
            data-part="logo-link"
            aria-label="Link to Ui.com"
            type="link"
            rel="noreferrer"
            href="http://www.ui.com"
            target="_blank"
          >
            <UiLogoSvg data-part="logo-icon" />
          </a>
          <a
            href="#"
            data-part="title"
            onClick={(e) => {
              e.preventDefault();
              updateParams((p) => {
                p.delete(SEARCH_PARAMS.selectedDeviceId);
                return p;
              });
            }}
          >
            Devices
          </a>
        </div>
        <div data-part="right-head-area">
          <QuickFind
            onSelect={(id) => {
              updateParams((p) => {
                if (id) {
                  p.set(SEARCH_PARAMS.selectedDeviceId, id);
                }
                return p;
              });
            }}
            placeholder="Quick find"
          />
          <span data-part="author">Per Svensson</span>
        </div>
      </div>
    </HeaderWrapper>
  );
};
