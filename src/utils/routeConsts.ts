export type TViewMode = "t" | "l";

export type TSearchParams = {
  productsViewMode: TViewMode;
  productsLineFilter: string;
  q: string;
  selectedDeviceId: string;
};

export const SEARCH_PARAMS = {
  productsViewMode: "productsViewMode",
  productsLineFilter: "productsLineFilter",
  productsFreeTextFilter: "q",
  selectedDeviceId: "selectedDeviceId",
} satisfies {
  [id: string]: keyof TSearchParams;
};

export const ViewMode = {
  Table: "t",
  List: "l",
} as const;
