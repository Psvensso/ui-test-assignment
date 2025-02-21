import styled from "@emotion/styled";
import { styleConst } from "../../../../utils/theming/styleConst";

export const ProductDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  position: relative;
  flex: 1;

  [data-part="navigation"] {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    button {
      box-shadow: ${styleConst.shadows.btn};
      font-size: 14px;
      color: ${styleConst.colors.text.black45};
    }

    [data-part="nex-prev-btns"] {
      display: flex;
      gap: 4px;
    }
  }

  [data-part="device-data-scrollwrapper"] {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    min-height: 0;
    padding: 32px;
  }

  [data-part="device-data"] {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    justify-content: center;
  }

  [data-part="device-image"] {
    flex: 0 1 292px;
  }

  [data-part="device-description"] {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    min-height: 0;
    flex: 1 1 150px;
  }

  [data-part="data-grid"] {
    margin-top: 16px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;

    > * {
      line-height: 32px;
    }
    //Every odd child. e.g. the second cell
    > *:nth-of-type(even) {
      text-align: right;
    }
  }

  //If window is smaller than 450px
  @media (max-width: ${styleConst.breakpoints.sm450}) {
    [data-part="data-grid"] {
      grid-template-columns: 1fr;

      > *:nth-of-type(even) {
        text-align: left;
      }
    }
  }

  [data-part="json-preview"] {
    flex: 1;

    button {
      padding: 0;
      margin-top: 15px;
    }

    [data-part="json-data"] {
      //For code, like pre tag
      white-space: pre-wrap;
      flex: 1;
      width: 100%;
      display: none;

      &[data-expanded="true"] {
        display: block;
      }
    }

    [data-part="quick-find"] {
      width: 150px;

      z-index: 2;
      &:focus-within {
        width: 100%;
      }
    }
  }
`;
