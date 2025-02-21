import { useProductDetails } from "../useProductDetails";
import { DataGridItem } from "./DataGridItem";

export const DeviceIdentification = () => {
  const { device } = useProductDetails();
  return (
    <>
      <DataGridItem label="Product Name" value={device?.product?.name} />
      <DataGridItem label="Product Line" value={device?.line?.name} />
      <DataGridItem label="SKU" value={device?.sku} />
      <DataGridItem label="System ID" value={device?.sysid} />
    </>
  );
};
