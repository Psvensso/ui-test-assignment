import { useDeferredValue, useMemo, useRef } from "react";

import { useSearchParams } from "react-router";
import { useRootContext } from "../../useRoot";
import { createTypedContext } from "../../utils/createTypedContext";
import { SEARCH_PARAMS, ViewMode } from "../../utils/routeConsts";

export const useProductsPage = () => {
  const [params] = useSearchParams();
  const _viewMode = params.get(SEARCH_PARAMS.productsViewMode);
  const viewMode = _viewMode === ViewMode.List ? ViewMode.List : ViewMode.Table; //Default viewMode is Table
  const lineFilter = params.get(SEARCH_PARAMS.productsLineFilter);
  const q = params.get(SEARCH_PARAMS.productsFreeTextFilter);

  const deferredFreeTextFilter = useDeferredValue(q);
  const deferredLineFilter = useDeferredValue(lineFilter);
  const { sortedDevices: dataDevices, staticLookups } = useRootContext();
  const devices = useMemo(() => dataDevices || [], [dataDevices]);
  const deferredDevices = useDeferredValue(devices);

  const filteredDevices = useMemo(() => {
    if (!deferredFreeTextFilter && !deferredLineFilter) {
      return deferredDevices;
    }
    return deferredDevices.filter((d) => {
      if (deferredFreeTextFilter) {
        const freeTextResult = (
          d?.product?.name || "" + d?.shortnames?.join(" ")
        )
          .toLowerCase()
          .includes((deferredFreeTextFilter || "").toLowerCase());
        if (freeTextResult === false) {
          return false;
        }
      }
      if (deferredLineFilter) {
        const lineFilter = deferredLineFilter.split(",");
        if (lineFilter.length > 0) {
          if (!d?.line?.id) {
            return false;
          }
          const lineResult = lineFilter.includes(d.line.id);
          if (lineResult === false) {
            return false;
          }
        }
      }
      return true;
    });
  }, [deferredLineFilter, deferredFreeTextFilter, deferredDevices]);

  const hasRenderedList = useRef(false);
  const hasRenderedTable = useRef(false);
  if (viewMode === ViewMode.Table) {
    hasRenderedTable.current = true;
  }
  if (viewMode === ViewMode.List) {
    hasRenderedList.current = true;
  }

  return {
    viewMode,
    staticLookups,
    devices,
    filteredDevices,
    hasRenderedList: hasRenderedList.current || false,
    hasRenderedTable: hasRenderedTable.current || false,
  };
};

export type TProductsPageContext = ReturnType<typeof useProductsPage>;
const [ProductsPageProvider, useProductsPageContext] =
  createTypedContext<TProductsPageContext>({
    name: "ProductsPageContext",
    errorMessage:
      "useProductsPageContext: `context` is undefined. Seems you forgot to wrap the panel parts in `<ProductsPageProvider />` ",
  });

export { ProductsPageProvider, useProductsPageContext };
