import styled from "@emotion/styled";
import { Button } from "antd";
import { useSearchParams } from "react-router";
import { Back } from "../../../../../components/svgIcons";
import { SEARCH_PARAMS } from "../../../../../utils/routeConsts";
import { styleConst } from "../../../../../utils/theming/styleConst";
import { useProductDetailsContext } from "../useProductDetails";

const SNavBtnsRow = styled.div`
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
`;

export const NavBtnsRow = () => {
  const [, updateParams] = useSearchParams();
  const { device, getNextDeviceId, getPreviousDeviceId } =
    useProductDetailsContext();

  return (
    <SNavBtnsRow data-part="navigation">
      <Button
        type="text"
        aria-label="Close details"
        data-part="back-btn"
        onClick={() => {
          updateParams((p) => {
            p.delete(SEARCH_PARAMS.selectedDeviceId);
            return p;
          });
        }}
        icon={<Back />}
      >
        Back
      </Button>
      <div data-part="nex-prev-btns">
        <Button
          type="text"
          aria-label="Show previous device from list"
          data-part="previous-btn"
          onClick={() => {
            updateParams((p) => {
              const prevId = getPreviousDeviceId(device?.id || "");
              if (prevId) {
                p.set(SEARCH_PARAMS.selectedDeviceId, prevId);
              }
              return p;
            });
          }}
          icon={<Back />}
        ></Button>
        <Button
          type="text"
          aria-label="Show next device from list"
          data-part="next-btn"
          onClick={() => {
            updateParams((p) => {
              const next = getNextDeviceId(device?.id || "");
              if (next) {
                p.set(SEARCH_PARAMS.selectedDeviceId, next);
              }
              return p;
            });
          }}
          icon={
            <Back
              style={{
                transform: "rotate(180deg)",
              }}
            />
          }
        ></Button>
      </div>
    </SNavBtnsRow>
  );
};
