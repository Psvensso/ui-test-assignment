import { useProductDetails } from "../useProductDetails";
import { DataGridItem } from "./DataGridItem";

export const NetworkCapabilities = () => {
  const { device } = useProductDetails();

  return (
    <>
      <DataGridItem
        label="Max Speed"
        value={device?.unifi?.network?.ethernetMaxSpeedMegabitsPerSecond}
        unit={"Mbps"}
      />
      <DataGridItem
        label="Ports"
        value={device?.unifi?.network?.numberOfPorts}
      />
      <DataGridItem label="Chipset" value={device?.unifi?.network?.chipset} />
    </>
  );
};
