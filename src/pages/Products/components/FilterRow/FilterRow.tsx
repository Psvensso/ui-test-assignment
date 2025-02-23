import styled from "@emotion/styled";
import { Input, Typography } from "antd";
import { useSearchParams } from "react-router";
import { FilterIcon } from "../../../../components/svgIcons";
import { SEARCH_PARAMS } from "../../../../utils/routeConsts";
import { styleConst } from "../../../../utils/theming/styleConst";
import { useProductsPageContext } from "../../useProductsPage";
import { ProductLineFilter } from "./fragments/ProductLineFilter";
import { ToggleViewStateButton } from "./fragments/ToggleViewStateButton";

const FilterRowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin: 16px 0;

  .freetext-filter {
    max-width: 350px;
    min-width: 50px;
    flex: 1;
  }

  [data-part="action-buttons"] {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  [data-state="active"] {
    color: ${styleConst.colors.uniFi.blue06};
  }

  @media (max-width: ${styleConst.breakpoints.sm450}) {
    flex-direction: column;
    flex-wrap: nowrap;
    [data-state="totals"] {
      text-align: right;
    }
    .freetext-filter {
      max-width: auto;
      width: 100%;
    }
  }
`;

export const FilterRow = () => {
  const [params, updateParams] = useSearchParams();
  const q = params.get(SEARCH_PARAMS.productsFreeTextFilter);
  const { devices, filteredDevices } = useProductsPageContext();

  return (
    <FilterRowWrapper data-part="filter-row">
      <Input
        className="freetext-filter"
        data-part="freetext-filter-input"
        aria-label="Free-text filter"
        maxLength={45}
        placeholder="Filter"
        variant="filled"
        value={q || undefined}
        onChange={(e) => {
          updateParams(
            (p) => {
              p.set(SEARCH_PARAMS.productsFreeTextFilter, e.target.value);
              return p;
            },
            {
              replace: true,
            }
          );
        }}
        prefix={<FilterIcon />}
        allowClear
      />

      <Typography.Text
        data-part="totals"
        aria-label="Devices count"
        style={{ marginLeft: "16px" }}
        type="secondary"
      >
        {devices?.length === filteredDevices?.length
          ? null
          : `${filteredDevices?.length}/`}
        <span>{devices?.length}</span> Devices
      </Typography.Text>

      <div data-part="action-buttons">
        <ToggleViewStateButton />
        <ProductLineFilter />
      </div>
    </FilterRowWrapper>
  );
};
