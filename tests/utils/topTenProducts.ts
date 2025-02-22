interface ProductBasic {
  id: string;
  image: string;
  product: {
    name: string;
    abbrev: string;
  };
  line: {
    id: string;
    name: string;
  };
}

// Test data representing 10 most popular Ubiquiti products
const popularProducts: ProductBasic[] = [
  {
    id: "142cd194-8164-46a1-ba48-bef078757393",
    image: "015d558b57f631225c3ba6a73660d4df",
    product: {
      name: "Dream Machine",
      abbrev: "UDM",
    },
    line: {
      id: "unifi-network",
      name: "UniFi",
    },
  },
  {
    id: "1812513c-f8a1-41c1-a698-86ac70b8bd87",
    image: "57ad929bdc48df6a5a6855fbb7cd8d18",
    product: {
      name: "Dream Machine Pro",
      abbrev: "UDM Pro",
    },
    line: {
      id: "unifi-network",
      name: "UniFi",
    },
  },
  {
    id: "30140cf8-0af4-4e3d-be26-87e41b8090e1",
    image: "dc486900b771c8399b258ad16736689a",
    product: {
      name: "Express",
      abbrev: "Express",
    },
    line: {
      id: "unifi-network",
      name: "UniFi",
    },
  },
  {
    id: "362d2d31-470f-4d63-8e06-9e9230adedb8",
    image: "63b1dcf83c6091d4e3af11ebad90f7b4",
    product: {
      name: "Switch 8 60W",
      abbrev: "US 8 60W",
    },
    line: {
      id: "unifi-network",
      name: "UniFi",
    },
  },
  {
    id: "81bddd15-fe58-495c-b9c5-fd592c154889",
    image: "bc53e18534385a6825830fdc29d66100",
    product: {
      name: "Camera G4 Instant",
      abbrev: "G4 Instant",
    },
    line: {
      id: "unifi-protect",
      name: "UniFi Protect",
    },
  },
  {
    id: "fc65bd1c-f4d3-4c81-a29e-708e184cf2a8",
    image: "cd661048a838bc1ff60222a6a68cdb3f",
    product: {
      name: "Camera G4 Pro",
      abbrev: "G4 Pro",
    },
    line: {
      id: "unifi-protect",
      name: "UniFi Protect",
    },
  },
  {
    id: "06112bf7-eae4-4bf4-a55c-de007c76dc45",
    image: "8ef136631ea566a6087704ae07725ec6",
    product: {
      name: "Gateway Lite",
      abbrev: "UXG Lite",
    },
    line: {
      id: "unifi-network",
      name: "UniFi",
    },
  },
  {
    id: "b1f6f1bb-4a40-4e0e-ad3f-c5fea0da2a9c",
    image: "31a256b2acdff02a3267aac40ec20e24",
    product: {
      name: "Camera G5 Flex",
      abbrev: "G5 Flex",
    },
    line: {
      id: "unifi-protect",
      name: "UniFi Protect",
    },
  },
  {
    id: "e567a449-cfbe-4cdf-9aed-975fac5256d9",
    image: "1f3133ffae76aea2e738892a78879e2a",
    product: {
      name: "Gateway Enterprise",
      abbrev: "UXG Enterprise",
    },
    line: {
      id: "unifi-network",
      name: "UniFi",
    },
  },
  {
    id: "dac2c752-2b31-406f-96ed-36859261f293",
    image: "88b840fbb548b263bac30e4d335d5f5a",
    product: {
      name: "xxxxx im last - Gateway Max",
      abbrev: "UXG Max",
    },
    line: {
      id: "unifi-network",
      name: "UniFi",
    },
  },
];

export const TopTenProductsResponse = {
  version: "Popular",
  devices: popularProducts,
};
