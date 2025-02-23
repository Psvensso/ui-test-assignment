import styled from "@emotion/styled";
import { Select } from "antd";
import { ComponentProps, useMemo, useState } from "react";
import { useDebounce } from "react-use";
import { useRootContext } from "../../useRoot";
import { MatchChunk, findAllChunks } from "../../utils/strings/findAllChunks";
import { MinimalDeviceData } from "../../utils/types";
import { SearchIcon } from "../svgIcons";

const OptionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .quickfind-option-matched {
    text-decoration: underline;
    font-weight: bold;
  }
`;

type D = Readonly<MinimalDeviceData>;
type OptionsData = [D | MinimalDeviceData, MatchChunk[]];
type TProps = Pick<ComponentProps<typeof Select>, "placeholder"> & {
  onSelect?: (id: string | null | undefined) => void;
  maxWidth?: number;
};

export const QuickFind = (p: TProps) => {
  const { sortedDevices: rawDeviceList } = useRootContext();
  const [noneDebouncedValue, setNoneDebouncedValue] = useState<string | null>(
    ""
  );
  const [debouncedValue, setDebouncedValue] = useState<string | null>("");

  useDebounce(
    () => {
      setDebouncedValue(noneDebouncedValue);
    },
    350,
    [noneDebouncedValue]
  );

  const filteredOptions = useMemo<typeof rawDeviceList | OptionsData[]>(() => {
    if (!debouncedValue?.length) {
      return rawDeviceList;
    }

    return rawDeviceList
      .reduce<OptionsData[]>((acc, x) => {
        if (!x?.product?.name || !x) {
          return acc;
        }
        const chunks = findAllChunks(x?.product?.name || "", debouncedValue);
        const chunksWithMatches = chunks.filter((x) => x.match > -1);
        if (chunksWithMatches.length > 0) {
          acc.push([x, chunks]);
        }
        return acc;
      }, [])
      .sort((a, b) => {
        //Sort by lowest match index
        const aMatch = a[1].find((x) => x.match > -1);
        const bMatch = b[1].find((x) => x.match > -1);
        if (!aMatch || !bMatch) {
          return 0;
        }
        return aMatch.match - bMatch.match;
      });
  }, [rawDeviceList, debouncedValue]);

  type FilteredOptionsItem = (typeof rawDeviceList)[number] | OptionsData;

  return (
    <Select
      showSearch
      data-part="quick-find"
      variant="filled"
      size="small"
      suffixIcon={null}
      placement="bottomLeft"
      aria-label="Quick find products"
      prefix={<SearchIcon />}
      {...p}
      virtual
      filterOption={false}
      options={filteredOptions as FilteredOptionsItem[]}
      optionRender={(opt) => {
        if (Array.isArray(opt?.data)) {
          const [x, searchChunks] = opt.data;
          return (
            <OptionsWrapper
              key={x.id}
              data-testid="quick-find-option"
              onClick={() => {
                p.onSelect?.(x.id);
              }}
            >
              <div>
                {searchChunks?.map((x, i) => {
                  return (
                    <span
                      key={"chunk" + i}
                      className={x.match > -1 ? "quickfind-option-matched" : ""}
                    >
                      {x.value}
                    </span>
                  );
                })}
              </div>
              <div>{x.line?.name}</div>
            </OptionsWrapper>
          );
        } else {
          const x = opt.data;
          return (
            <OptionsWrapper
              onClick={() => {
                p.onSelect?.(x.id);
              }}
              key={x?.id}
              data-testid="quick-find-option"
            >
              <div>{x?.product?.name}</div>
              <div>{x?.line?.name}</div>
            </OptionsWrapper>
          );
        }
      }}
      onSearch={setNoneDebouncedValue}
    />
  );
};
