import { Button, message, Typography } from "antd";
import { useState } from "react";
import { Copy } from "../../../../../components/svgIcons";
import { useProductDetails } from "../useProductDetails";

export const DeviceJsonPreview = () => {
  const { device } = useProductDetails();
  const [jsonAreaExpanded, setJsonAreaExpanded] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div data-part="json-preview">
      {contextHolder}
      <Button
        type="link"
        onClick={() => {
          setJsonAreaExpanded((x) => !x);
        }}
      >
        See All Details as JSON
      </Button>{" "}
      <Button
        title="Copy to clipboard"
        type="text"
        onClick={() => {
          navigator?.clipboard?.writeText?.(JSON.stringify(device, null, 2));
          messageApi.success("Copied JSON data to clipboard");
        }}
        icon={<Copy />}
      ></Button>
      <Typography.Text data-part="json-data" data-expanded={jsonAreaExpanded}>
        {JSON.stringify(device, null, 2)}
      </Typography.Text>
    </div>
  );
};
