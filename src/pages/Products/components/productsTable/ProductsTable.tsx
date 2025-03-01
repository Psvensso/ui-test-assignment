import styled from "@emotion/styled";
import { Table } from "antd";
import { ColumnsType, TableRef } from "antd/es/table";
import { useCallback, useMemo, useRef } from "react";
import { useSearchParams } from "react-router";
import { createImageUrl, IMAGE_SIZE } from "../../../../utils/imageUtils";
import { SEARCH_PARAMS } from "../../../../utils/routeConsts";
import { Device } from "../../../../utils/types";
import { useProductsPageContext } from "../../useProductsPage";

const imageCache = new Map<string, string>();
const STable = styled(Table<Device>)`
  display: flex;
  flex-direction: column;
  flex: 1;

  [data-part="device-table-row"]:hover {
    cursor: pointer;
  }
`;

const ImageCell = styled.div<{ src: string }>`
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  background-image: url(${({ src }: { src: string }) => src});
`;

export const ProductsTable = ({
  hidden = false,
  height,
}: {
  height: number;
  hidden?: boolean;
}) => {
  const [, updateParams] = useSearchParams();
  const { filteredDevices } = useProductsPageContext();
  const tableRef = useRef<TableRef>(null);
  const tableBodyHeight = height - 39;

  const columns: ColumnsType<Device> = useMemo(() => {
    return [
      {
        dataIndex: "id",
        key: "img",
        width: 50,
        fixed: "left",
        render: (_, { images, id }, rowIndex) => {
          if (!id || !images?.default) {
            return null;
          }
          const imageUrl = createImageUrl({
            id,
            imageId: images?.default,
            quality: 75,
            size: IMAGE_SIZE.icon,
          });

          // Only create new Image if not in memory cache
          if (imageUrl && !imageCache.has(imageUrl)) {
            imageCache.set(imageUrl, imageUrl);
            new Image().src = imageUrl;
          }

          const preScanDevice = filteredDevices?.[rowIndex + 50];
          if (
            preScanDevice &&
            preScanDevice.id &&
            preScanDevice?.images?.default
          ) {
            const nextImageUrl = createImageUrl({
              id: preScanDevice.id,
              imageId: preScanDevice.images?.default,
              size: IMAGE_SIZE.icon,
              quality: 75,
            });
            if (nextImageUrl && !imageCache.has(nextImageUrl)) {
              imageCache.set(nextImageUrl, nextImageUrl);
              new Image().src = nextImageUrl;
            }
          }
          if (!imageUrl) {
            return null;
          }
          return <ImageCell src={imageUrl}></ImageCell>;
        },
      },
      {
        title: "Product Line",
        dataIndex: ["line", "name"],
        key: "name",
        width: 150,
        ellipsis: true,
        render: (name: string) => <span>{name}</span>,
      },
      {
        title: "Name",
        dataIndex: ["product", "name"],
        key: "abbrev",
        ellipsis: true,
        width: 250,
      },
      {
        title: "Short names",
        dataIndex: ["shortnames"],
        key: "shortnames",
        ellipsis: true,
        width: 250,
        render: (shortNames: string[] | string | null) => {
          return Array.isArray(shortNames)
            ? shortNames?.join(", ")
            : shortNames;
        },
      },
    ];
  }, [filteredDevices]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      //If END key scroll to bottom
      if (e.key === "End") {
        tableRef.current?.scrollTo({ index: filteredDevices.length - 1 });
      }
      //If key end scroll up
      if (e.key === "Home") {
        tableRef.current?.scrollTo({ index: 0 });
      }
      //If enter open the details
      if (e.key === "Enter") {
        (e.currentTarget as HTMLDivElement)?.click?.();
      }
    },
    [filteredDevices]
  );

  return (
    <STable
      data-part="device-table"
      virtual
      ref={tableRef}
      size="small"
      onRow={(record) => {
        return {
          "data-part": "device-table-row",
          onKeyDown,
          onClick: () => {
            updateParams((p) => {
              if (record.id) {
                p.set(SEARCH_PARAMS.selectedDeviceId, record.id || "");
              }
              return p;
            });
          },
          tabIndex: 0,
        };
      }}
      tableLayout="fixed"
      style={{ display: hidden ? "none" : "initial" }}
      columns={columns}
      scroll={{ x: 450, y: tableBodyHeight }}
      rowKey="id"
      dataSource={filteredDevices || []}
      pagination={false}
    />
  );
};
