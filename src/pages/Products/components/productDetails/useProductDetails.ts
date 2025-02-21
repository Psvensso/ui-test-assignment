import { useSearchParams } from "react-router";
import { useRootContext } from "../../../../useRoot";
import { createTypedContext } from "../../../../utils/createTypedContext";
import { SEARCH_PARAMS } from "../../../../utils/routeConsts";

export const useProductDetails = () => {
  const [params] = useSearchParams();
  const selectedDeviceId = params.get(SEARCH_PARAMS.selectedDeviceId);
  const {
    staticLookups: { deviceLookup },
    getNextDeviceId,
    getPreviousDeviceId,
  } = useRootContext();

  const { device } = selectedDeviceId
    ? deviceLookup[selectedDeviceId] || {}
    : {};

  return {
    getNextDeviceId,
    getPreviousDeviceId,
    device,
  };
};

export type TProductDetailsContext = ReturnType<typeof useProductDetails>;
const [ProductDetailsProvider, useProductDetailsContext] =
  createTypedContext<TProductDetailsContext>({
    name: "ProductDetailsContext",
    errorMessage:
      "useProductDetailsContext: `context` is undefined. Seems you forgot to wrap the panel parts in `<ProductDetailsProvider />` ",
  });

export { ProductDetailsProvider, useProductDetailsContext };
