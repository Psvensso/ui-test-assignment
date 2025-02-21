import { Button, Image, Typography } from "antd";
import { useSearchParams } from "react-router";
import { Back } from "../../../../components/svgIcons";
import {
  createImageUrl,
  fallBackImageSrc,
  IMAGE_SIZE,
} from "../../../../utils/imageUtils";
import { SEARCH_PARAMS } from "../../../../utils/routeConsts";
import { ProductDetailsWrapper } from "./ProductDetails.styles";
import { ComplianceInfo } from "./fragments/ComplianceInfo";
import { DataGridItem } from "./fragments/DataGridItem";
import { DeviceIdentification } from "./fragments/DeviceIdentification";
import { DeviceJsonPreview } from "./fragments/JsonPreview";
import { NetworkCapabilities } from "./fragments/NetworkCapabilities";
import { ProductDetailsProvider, useProductDetails } from "./useProductDetails";
const { Text, Title } = Typography;

export const ProductDetails = (p: { className?: string }) => {
  const [, updateParams] = useSearchParams();
  const ctx = useProductDetails();
  const { device, getNextDeviceId, getPreviousDeviceId } = ctx;
  if (!device) {
    throw new Error("Error: A device with that id was not found");
  }

  return (
    <ProductDetailsProvider value={ctx}>
      <ProductDetailsWrapper className={p.className}>
        <div data-part="navigation">
          <Button
            type="text"
            aria-label="close details"
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
              aria-label="previous device"
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
              aria-label="next device"
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
        </div>
        {device && (
          <div data-part="device-data-scrollwrapper">
            <div data-part="device-data">
              <div data-part="device-image">
                <Image
                  data-part="image"
                  width={"292px"}
                  height={"292px"}
                  preview={false}
                  fallback={fallBackImageSrc}
                  src={
                    createImageUrl({
                      id: device?.id,
                      imageId: device?.images?.default,
                      quality: 100,
                      size: IMAGE_SIZE.XL,
                    }) || ""
                  }
                />
              </div>
              <div data-part="device-description">
                <Title level={2}>{device?.product?.name}</Title>
                <Text type="secondary">{device?.line?.name}</Text>
                <div data-part="data-grid">
                  <DataGridItem
                    label="Product Line"
                    value={device?.line?.name}
                  />
                  <DataGridItem label="ID" value={device?.line?.name} />
                  <DataGridItem label="Name" value={device?.line?.name} />
                  <DataGridItem label="Short Name" value={device?.line?.name} />
                  <DeviceIdentification />
                  <ComplianceInfo />
                  <NetworkCapabilities />
                </div>
                <DeviceJsonPreview />
              </div>
            </div>
          </div>
        )}
      </ProductDetailsWrapper>
    </ProductDetailsProvider>
  );
};
