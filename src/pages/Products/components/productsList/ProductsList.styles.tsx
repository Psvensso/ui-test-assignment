import styled from "@emotion/styled";
import { styleConst } from "../../../../utils/theming/styleConst";
export const ProductListRow = styled.div`
  display: flex;
  gap: 16px;

  [data-part="product-card-wrapper"] {
    height: 188px;
    min-height: 0;
    overflow: hidden;
  }

  [data-part="product-card"] {
    height: 172px;
    min-height: 0;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border: 1px solid #e0e0e0;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: white;

    &:hover {
      background-color: ${styleConst.colors.uniFi.neutral02};
      cursor: pointer;
    }

    [data-part="product-line"] {
      position: absolute;
      top: 2px;
      right: 4px;
      color: ${styleConst.colors.uniFi.blue06};
    }
    [data-part="product-info"] {
      display: flex;
      flex-direction: column;
      padding: 8px;

      [data-part="product-name"] {
        font-size: 14px;
        color: ${styleConst.colors.text.black85};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 40px;
      }
      [data-part="product-short-names"] {
        font-size: 12px;
        color: ${styleConst.colors.text.black45};
        //Make ellipsis
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;
