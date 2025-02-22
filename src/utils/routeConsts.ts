export type TProductsPageSearchParams =
  | "productsViewMode"
  | "productsLineFilter"
  | "q"
  | "selectedDeviceId";

export const SEARCH_PARAMS = {
  productsViewMode: "productsViewMode",
  productsLineFilter: "productsLineFilter",
  productsFreeTextFilter: "q",
  selectedDeviceId: "selectedDeviceId",
} satisfies {
  [id: string]: TProductsPageSearchParams;
};

export const ViewMode = {
  Table: "t",
  List: "l",
} as const;
