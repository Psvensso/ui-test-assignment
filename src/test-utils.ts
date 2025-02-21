import {
  buildQueries,
  GetErrorFunction,
  Matcher,
  MatcherOptions,
  queryHelpers,
} from "@testing-library/dom";

// Query for multiple elements
const queryAllByDataPart = (
  container: HTMLElement,
  dataPart: Matcher,
  options?: MatcherOptions & { withPortal?: boolean }
): HTMLElement[] => {
  const searchContainer = options?.withPortal ? document.body : container;
  return (
    queryHelpers.queryAllByAttribute(
      "data-part",
      searchContainer,
      dataPart,
      options
    ) || []
  );
};

// Error messages with correct type signatures
const getMultipleError: GetErrorFunction<[Matcher]> = (
  _: Element | null,
  dataPart: Matcher
) => `Found multiple elements with the attribute: [data-part="${dataPart}"]`;

const getMissingError: GetErrorFunction<[Matcher]> = (
  _: Element | null,
  dataPart: Matcher
) => `Unable to find an element with the attribute: [data-part="${dataPart}"]`;

const [
  queryByDataPart,
  getAllByDataPart,
  getByDataPart,
  findAllByDataPart,
  findByDataPart,
] = buildQueries(queryAllByDataPart, getMultipleError, getMissingError);

export {
  findAllByDataPart,
  findByDataPart,
  getAllByDataPart,
  getByDataPart,
  queryAllByDataPart,
  queryByDataPart,
};
