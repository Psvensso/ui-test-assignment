export type ComplianceType = Partial<{
  anatel?: string;
  cn: string;
  fcc: string;
  ic: string;
  icEmi: string;
  indoorOnly: boolean;
  jpa: string[];
  jrf: string[];
  kc: string;
  modelName: string;
  ncc: string;
  productName: string;
  rcm: boolean;
  rfCmFcc: number;
  rfCmIc: number;
  text: {
    [key: string]: string[];
  };
  wifi: string;
  [key: string]: unknown;
}>;

export type IconType = Partial<{
  id: string;
  resolutions: [number, number][];
}>;

export type ImagesType = Partial<{
  default: string;
  nopadding: string;
  topology: string;
  "mobile-connection"?: string;
  "mobile-internet-connected"?: string;
  "mobile-no-internet"?: string;
  "left-nopadding"?: string;
  "right-nopadding"?: string;
}>;

export type LineType = {
  id: string;
  name?: string;
};

export type ProductType = {
  abbrev?: string;
  name?: string;
};

export type TripletType = {
  k1?: string;
  k2?: string;
  k3?: string;
};

export type BLEServiceMode = "default" | "factory" | "default_legacy" | string;

export type BLEServiceType = Partial<{
  mode: BLEServiceMode;
  features: Record<string, boolean | number | string | null>;
  configured: string;
  default: string;
}>;

export type RadioType = Partial<{
  gain: number;
  maxPower: number;
  maxSpeedMegabitsPerSecond: number;
}>;

export type LinkNegotiationType = Partial<{
  portIdx: number;
  supportedValues: string[];
  bindWith: string;
  [key: string]: unknown;
}>;

export type DeviceCapabilities =
  | "ACCESS_POINT"
  | "BRIDGE"
  | "BUILDING_BRIDGE"
  | "CABLE_INTERNET"
  | "CLOUD_KEY"
  | "GATEWAY"
  | "HAS_CLIENTS"
  | "HAS_TEMPERATURE_SENSOR"
  | "HAS_GLOBAL_POE_MODE_CONTROL"
  | "NETWORK_APPLICATION"
  | "PROTECT_APPLICATION"
  | "SERVER"
  | "SWITCH"
  | "CONTROLLER"
  | "APPLICATION_MODE"
  | "SD_WAN_HUB"
  | "VPORT"
  | "BRIDGE_PTMP"
  | "WIRELESS_SWITCH"
  | "ACCESS_POINT_SWITCH"
  | "QCA_WIFI_FULL_APPLY_PLATFORM"
  | string;

export type NetworkType = Partial<{
  bleServices?: BLEServiceType[] | undefined;
  chipset: string;
  details: {
    legacyPortRemap?: unknown;
    ipsThroughput?: unknown;
    [key: string]: unknown;
  };
  deviceCapabilities: DeviceCapabilities[];
  diagram: string[];
  ethernetMaxSpeedMegabitsPerSecond: number;
  features: Record<string, boolean | number | string | null>;
  knownUnsupportedFeatures: string[];
  linkNegotiation: Record<string, LinkNegotiationType>;
  minimumFirmwareRequired: string | null;
  model: string;
  networkGroups: Record<string, string>;
  numberOfPorts: number;
  ports: {
    [key: string]: string | number | number[] | undefined;
  };
  power: {
    capacity: number;
  };
  radios: {
    [key: string]: RadioType;
  };
  shadowMode: {
    interconnectPortInterface?: string;
    interconnectPortNumber?: number;
  };
  subtypes: string[];
  systemIdHexadecimal: string;
  type: string;
  [key: string]: unknown;
}>;

export type UnifiType = Partial<{
  adoptability: "adoptable" | "standalone";
  network: Partial<NetworkType>;
  protect: Partial<{
    fov: number;
    suggestedDistance: number;
    [key: string]: unknown;
  }>;
}>;

export type UIspType = Partial<{
  bleServices: Record<string, BLEServiceType | undefined>;
  firmware: {
    board: string[];
    platform: string | null;
  };
  line: string;
  nameLegacy: string[];
}>;

export type BtleType = Partial<{
  factoryDefault: string;
  userConfigured: string;
}>;

export type Device = Partial<{
  btle: BtleType;
  compliance: ComplianceType;
  deviceType: string;
  fcc: string;
  guids: string[];
  ic: string;
  icon: IconType;
  id: string;
  images: ImagesType;
  isARSupported: boolean;
  jpa: string[];
  jrf: string[];
  line: LineType;
  minAdoptVersion: {
    net: string;
    protect: string;
  };
  product: ProductType;
  shortnames: string[];
  sku: string;
  sysid: string;
  sysids: string[];
  triplets: TripletType[];
  unifi: UnifiType;
  uisp: UIspType;
  videos: Record<string, string>;
}>;

// Type guard for checking if a device has UniFi capabilities
export const isUnifiDevice = (
  device: Device
): device is Device & { unifi: UnifiType } => {
  return !!device.unifi;
};

// Type guard for checking if a device has UISP capabilities
export const isUispDevice = (
  device: Device
): device is Device & { uisp: UIspType } => {
  return !!device.uisp;
};

// Type guard for checking if a device has network capabilities
export const hasNetworkCapabilities = (
  device: Device
): device is Device & { unifi: { network: NetworkType } } => {
  return !!device.unifi?.network;
};

export type MinimalDeviceData = Partial<
  Pick<Device, "id"> & {
    product: Pick<ProductType, "name">;
  } & { line: Pick<LineType, "name"> }
>;
