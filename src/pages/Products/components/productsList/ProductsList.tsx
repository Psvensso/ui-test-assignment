import { Image } from "antd";
import VirtualList, { ListRef } from "rc-virtual-list";
import { useCallback, useMemo, useRef } from "react";
import { useSearchParams } from "react-router";
import { chunkArray } from "../../../../utils/chunkArray";
import {
  createImageUrl,
  fallBackImageSrc,
  IMAGE_SIZE,
} from "../../../../utils/imageUtils";
import { SEARCH_PARAMS } from "../../../../utils/routeConsts";
import { useProductsPageContext } from "../../useProductsPage";
import { ProductListRow } from "./ProductsList.styles";

function calculateItemsPerRow(pageWidth: number, minWidth: number): number {
  const itemsPerRow = Math.floor(pageWidth / minWidth);
  return itemsPerRow < 1 ? 1 : itemsPerRow;
}

type TProps = {
  width: number;
  height: number;
  hidden?: boolean;
};

export const ProductsList = ({ hidden, height, width }: TProps) => {
  const { filteredDevices } = useProductsPageContext();
  const [, updateParams] = useSearchParams();
  const itemsPerRow = useMemo(() => {
    return calculateItemsPerRow(width, 216);
  }, [width]);

  const chunkedDevices = useMemo(() => {
    return chunkArray(filteredDevices, itemsPerRow);
  }, [filteredDevices, itemsPerRow]);

  const listRef = useRef<ListRef>(null);
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      //If END key scroll to bottom
      if (e.key === "End") {
        listRef.current?.scrollTo({ index: filteredDevices.length - 1 });
      }
      //If key end scroll up
      if (e.key === "Home") {
        listRef.current?.scrollTo({ index: 0 });
      }
      //If enter open the details
      if (e.key === "Enter") {
        (e.currentTarget as HTMLDivElement)?.click?.();
      }
    },
    [filteredDevices]
  );

  return (
    <VirtualList
      onKeyDown={onKeyDown}
      ref={listRef}
      style={{
        display: hidden ? "none" : "block",
        width: width,
        height: height,
      }}
      data-part="device-list"
      data={chunkedDevices}
      height={height}
      itemHeight={188}
      itemKey={(x) => {
        return x?.id.toString();
      }}
      onScroll={(e) => {
        const target = e.target as HTMLElement;
        localStorage.setItem(
          "@UI-Cat-ProductsList/scrollPos",
          String(height + ":" + target.scrollTop)
        );
      }}
    >
      {(chunk, i) => (
        <ProductListRow
          data-part="product-list-row"
          key={i + "chunk"}
          role="list"
        >
          {chunk?.data?.map((device, i) => {
            return (
              <div
                onClick={() => {
                  updateParams((p) => {
                    if (device?.id) {
                      p.set(SEARCH_PARAMS.selectedDeviceId, device?.id);
                    }
                    return p;
                  });
                }}
                data-part="product-list-card-wrapper"
                data-rowid={device?.id}
                key={(device?.id || "") + i}
                style={{ width: width / itemsPerRow }}
              >
                <div data-part="product-list-card" role="listitem" tabIndex={0}>
                  <div data-part="product-line">{device.line?.name}</div>
                  <Image
                    data-part="image"
                    height={"100px"}
                    alt={"Product image -" + device.product?.name}
                    width={"auto"}
                    style={{
                      objectFit: "contain",
                      margin: "0 auto",
                    }}
                    preview={false}
                    fallback={fallBackImageSrc}
                    src={
                      createImageUrl({
                        id: device?.id,
                        imageId: device?.images?.default,
                        quality: 100,
                        size: IMAGE_SIZE.large,
                      }) || ""
                    }
                  />
                  <div data-part="product-info">
                    <div data-part="product-name">{device.product?.name}</div>
                    <div data-part="product-short-names">
                      {device?.shortnames?.join(", ")}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </ProductListRow>
      )}
    </VirtualList>
  );
};
