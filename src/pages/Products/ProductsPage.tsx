import styled from "@emotion/styled";
import { useSearchParams } from "react-router";
import { useMeasure } from "react-use";
import { SEARCH_PARAMS, ViewMode } from "../../utils/routeConsts";
import { FilterRow } from "./components/FilterRow/FilterRow";
import { ProductDetails } from "./components/productDetails/ProductDetails";
import { ProductsList } from "./components/productsList/ProductsList";
import { ProductsTable } from "./components/productsTable/ProductsTable";
import { ProductsPageProvider, useProductsPage } from "./useProductsPage";

const ProductsPageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  position: relative;

  [data-part="products-page-content"] {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 0;
  }
`;

const SProductsDetails = styled(ProductDetails)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2;
  background-color: white;
`;

export const ProductsPage = () => {
  const ctx = useProductsPage();
  const [params] = useSearchParams();
  const detailsId = params.get(SEARCH_PARAMS.selectedDeviceId);

  const { hasRenderedList, hasRenderedTable, viewMode } = ctx;

  const [ref, x] = useMeasure<HTMLDivElement>();
  const sizeProps = {
    width: x.width,
    height: x.height,
  };

  return (
    <ProductsPageProvider value={ctx}>
      <ProductsPageWrapper>
        {detailsId && <SProductsDetails />}
        <FilterRow />
        <div data-part="products-page-content" ref={ref}>
          {sizeProps.height > 0 && (
            <>
              {hasRenderedList && (
                <ProductsList
                  {...sizeProps}
                  hidden={viewMode !== ViewMode.List || !!detailsId}
                />
              )}
              {hasRenderedTable && (
                <ProductsTable
                  {...sizeProps}
                  hidden={viewMode !== ViewMode.Table || !!detailsId}
                />
              )}
            </>
          )}
        </div>
      </ProductsPageWrapper>
    </ProductsPageProvider>
  );
};
