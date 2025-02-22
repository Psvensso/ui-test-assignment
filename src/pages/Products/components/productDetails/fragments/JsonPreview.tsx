import styled from "@emotion/styled";
import { Button, message, Typography } from "antd";
import { useMemo, useState } from "react";
import { Copy } from "../../../../../components/svgIcons";
import { useProductDetails } from "../useProductDetails";

const SDeviceJsonPreview = styled.div`
  flex: 1;

  button {
    padding: 0;
    margin-top: 15px;
  }

  [data-part="json-data"] {
    //For code, like pre tag
    white-space: pre-wrap;
    flex: 1;
    width: 100%;
    display: none;
    &[data-expanded="true"] {
      display: block;
    }
  }

  [data-part="quick-find"] {
    width: 150px;

    z-index: 2;
    &:focus-within {
      width: 100%;
    }
  }
`;

export const DeviceJsonPreview = () => {
  const { device } = useProductDetails();
  const [jsonAreaExpanded, setJsonAreaExpanded] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const cleanJson = useMemo(() => {
    const obj = {
      ...device,
      videos: undefined,
      icon: undefined,
      images: undefined,
    };
    delete obj.images;
    delete obj.videos;
    delete obj.icon;
    return JSON.stringify(obj, null, 2);
  }, [device]);
  return (
    <SDeviceJsonPreview data-part="json-preview">
      {contextHolder}
      <Button
        type="link"
        onClick={() => {
          setJsonAreaExpanded((x) => !x);
        }}
      >
        {jsonAreaExpanded ? "Hide JSON data" : "See All Details as JSON"}
      </Button>{" "}
      <Button
        title="Copy JSON to clipboard"
        type="text"
        onClick={() => {
          navigator?.clipboard?.writeText?.(JSON.stringify(device, null, 2));
          messageApi.success("Copied JSON data to clipboard");
        }}
        icon={<Copy />}
      ></Button>
      <Typography.Text data-part="json-data" data-expanded={jsonAreaExpanded}>
        {cleanJson}
      </Typography.Text>
    </SDeviceJsonPreview>
  );
};
