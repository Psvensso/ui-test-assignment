import styled from "@emotion/styled";
import { Image, Typography } from "antd";
import {
  createImageUrl,
  fallBackImageSrc,
  IMAGE_SIZE,
} from "../../../../utils/imageUtils";
import { styleConst } from "../../../../utils/theming/styleConst";
import { DataGrid } from "./fragments/DataGrid";
import { DeviceJsonPreview } from "./fragments/JsonPreview";
import { NavBtnsRow } from "./fragments/NavBtnsRow";
import { ProductDetailsProvider, useProductDetails } from "./useProductDetails";
const { Text, Title } = Typography;

export const ProductDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  position: relative;
  flex: 1;

  [data-part="device-data-scroll-wrapper"] {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    min-height: 0;
  }

  [data-part="device-data"] {
    color: red !important;
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    justify-content: center;

    [data-part="image"] {
      flex-shrink: 0;
    }

    [data-part="device-description"] {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      min-height: 0;
      max-width: 444px;
      width: 100%;
    }
  }

  //If window is smaller than 450px
  @media (max-width: ${styleConst.breakpoints.sm450}) {
    [data-part="device-description"] {
      max-width: unset;
      min-width: unset;
      margin: 16px;
    }
  }
`;

export const ProductDetails = (p: { className?: string }) => {
  const ctx = useProductDetails();
  const { device } = ctx;

  if (!device) {
    throw new Error("Error: A device with that id was not found");
  }

  return (
    <ProductDetailsProvider value={ctx}>
      <ProductDetailsWrapper className={p.className} data-part="device-details">
        <NavBtnsRow />
        {device && (
          <div data-part="device-data-scroll-wrapper">
            <div data-part="device-data">
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
              <div data-part="device-description">
                <Title data-part="device-product-name" level={2}>
                  {device?.product?.name}
                </Title>
                <Text type="secondary">{device?.line?.name}</Text>
                <DataGrid />
                <DeviceJsonPreview />
              </div>
            </div>
          </div>
        )}
      </ProductDetailsWrapper>
    </ProductDetailsProvider>
  );
};
