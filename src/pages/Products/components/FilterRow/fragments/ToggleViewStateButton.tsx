import { Button } from "antd";
import { useSearchParams } from "react-router";
import { GridView, ListView } from "../../../../../components/svgIcons";
import { SEARCH_PARAMS, ViewMode } from "../../../../../utils/routeConsts";
import { useProductsPageContext } from "../../../useProductsPage";

export const ToggleViewStateButton = () => {
  const [, updateParams] = useSearchParams();
  const { viewMode } = useProductsPageContext();
  return (
    <>
      <Button
        type="text"
        aria-label="Toggle to table view mode"
        data-part="view-mode-table-btn"
        data-state={viewMode === ViewMode.Table ? "active" : "inactive"}
        onClick={() =>
          updateParams((p) => {
            p.set(SEARCH_PARAMS.productsViewMode, ViewMode.Table);
            return p;
          })
        }
        icon={<ListView />}
      ></Button>
      <Button
        type="text"
        aria-label="Toggle to list view mode"
        data-part="view-mode-list-btn"
        data-state={viewMode === ViewMode.List ? "active" : "inactive"}
        onClick={() =>
          updateParams((p) => {
            p.set(SEARCH_PARAMS.productsViewMode, ViewMode.List);
            return p;
          })
        }
        icon={<GridView />}
      ></Button>
    </>
  );
};
