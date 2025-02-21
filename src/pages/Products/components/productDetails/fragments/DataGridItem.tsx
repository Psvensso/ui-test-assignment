import { Typography } from "antd";
import { ReactNode } from "react";
const { Text } = Typography;

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
      <Text strong>{p.label}</Text>
      <Text type="secondary">
        {p.value} {p.unit}
      </Text>
    </>
  );
};
