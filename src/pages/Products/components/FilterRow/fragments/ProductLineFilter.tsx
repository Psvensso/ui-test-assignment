import { useSearchParams } from "react-router";
import { DropdownSelect } from "../../../../../components/DropdownSelect/DropdownSelect";
import { SEARCH_PARAMS } from "../../../../../utils/routeConsts";
import { useProductsPageContext } from "../../../useProductsPage";

export const ProductLineFilter = () => {
  const [searchParams, updateParams] = useSearchParams();
  const lineFilter = searchParams.get(SEARCH_PARAMS.productsLineFilter);
  const { staticLookups } = useProductsPageContext();
  const lineFilters = lineFilter?.split(",").reduce<Record<string, boolean>>(
    (acc, key) => {
      acc[key] = true;
      return acc;
    },
    {} as Record<string, boolean>
  );

  return (
    <DropdownSelect
      buttonProps={{
        "area-label": "Product line filter dropdown",
      }}
      dropdownTitle="Product line"
      selectedKeys={lineFilters || {}}
      onChange={(keys) => {
        const keysAsCommaString = Object.keys(keys || {}).join(",");
        updateParams((p) => {
          p.set(SEARCH_PARAMS.productsLineFilter, keysAsCommaString);
          return p;
        });
      }}
      options={staticLookups?.options?.lines}
    >
      Filter
    </DropdownSelect>
  );
};
