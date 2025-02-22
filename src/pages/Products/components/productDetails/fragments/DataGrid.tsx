import styled from "@emotion/styled";
import { Typography } from "antd";
import { ComponentProps, ReactNode } from "react";
import { styleConst } from "../../../../../utils/theming/styleConst";
import { useProductDetails } from "../useProductDetails";
const { Text } = Typography;

const SDataGrid = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 32px;
  align-content: center;
  gap: 8px;

  [data-part="data-grid-value"] {
    text-align: right;
  }

  [data-part="data-grid-section-title"] {
    grid-column: span 2;
  }

  @media (max-width: ${styleConst.breakpoints.sm450}) {
    display: flex;
    flex-direction: column;

    [data-part="data-grid-value"] {
      text-align: left;
      padding-right: 16px;
    }
  }
`;

export const DataGridItem = (p: {
  label: string;
  value: ReactNode;
  unit?: string;
}) => {
  if (!p.value) {
    return null;
  }

  return (
    <>
      <Text strong data-part="data-grid-label">
        {p.label}
      </Text>
      <Text type="secondary" data-part="data-grid-value">
        {p.value} {p.unit}
      </Text>
    </>
  );
};

export const GridSectionTitle = (
  p: ComponentProps<typeof Typography.Title>
) => {
  return <Text type="secondary" data-part="data-grid-section-title" {...p} />;
};

export const DataGrid = () => {
  const { device } = useProductDetails();
  return (
    <SDataGrid data-part="data-grid">
      <DataGridItem label="Name" value={device?.product?.name} />
      <DataGridItem label="Short Names" value={device?.shortnames?.join(",")} />
      <DataGridItem label="Product Line" value={device?.line?.name} />
      <DataGridItem label="Line ID" value={device?.line?.id} />
      <DataGridItem label="FCC ID" value={device?.fcc} />
      <DataGridItem label="IC ID" value={device?.ic} />
      <DataGridItem label="SKU" value={device?.sku} />
      <DataGridItem label="System ID" value={device?.sysid} />

      {device?.unifi?.network && (
        <>
          <GridSectionTitle>Network</GridSectionTitle>
          <DataGridItem
            label="Max. Speed"
            value={device?.unifi?.network?.ethernetMaxSpeedMegabitsPerSecond}
            unit={"Mbps"}
          />
          <DataGridItem
            label="Max. power"
            value={device?.unifi?.network?.power?.capacity}
            unit={"W"}
          />
          <DataGridItem
            label="Ports"
            value={device?.unifi?.network?.numberOfPorts}
          />
          <DataGridItem
            label="Chipset"
            value={device?.unifi?.network?.chipset}
          />
          <DataGridItem
            label="Ips Throughput"
            value={device?.unifi?.network?.details?.ipsThroughput || undefined}
          />
        </>
      )}
    </SDataGrid>
  );
};
