import { useProductDetails } from "../useProductDetails";
import { DataGridItem } from "./DataGridItem";

export const ComplianceInfo = () => {
  const { device } = useProductDetails();

  return (
    <>
      <DataGridItem label="FCC ID" value={device?.fcc} />
      <DataGridItem label="IC ID" value={device?.ic} />
      <DataGridItem label="Model Name" value={device?.compliance?.modelName} />
    </>
  );
};
