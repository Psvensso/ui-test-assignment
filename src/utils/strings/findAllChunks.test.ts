import { describe, expect, it } from "vitest";
import { findAllChunks } from "./findAllChunks";

describe("findAllChunks", () => {
  // Essential input validation
  it("should handle empty cases", () => {
    expect(findAllChunks("", "test")).toEqual([]);
    expect(findAllChunks("test", "")).toEqual([{ value: "test", match: -1 }]);
  });

  // Core functionality tests
  it("should find matches with correct indices", () => {
    const result = findAllChunks("hello world hello", "hello");
    expect(result).toEqual([
      { value: "hello", match: 0 },
      { value: " world ", match: -1 },
      { value: "hello", match: 12 },
    ]);
  });

  it("should be case insensitive but preserve original case", () => {
    const result = findAllChunks("The QUICK the", "the");
    expect(result).toEqual([
      { value: "The", match: 0 },
      { value: " QUICK ", match: -1 },
      { value: "the", match: 10 },
    ]);
  });

  it("should handle product identifiers correctly", () => {
    const result = findAllChunks("AF-5XHD AF-24HD", "AF-");
    expect(result).toEqual([
      { value: "AF-", match: 0 },
      { value: "5XHD ", match: -1 },
      { value: "AF-", match: 8 },
      { value: "24HD", match: -1 },
    ]);

    expect(findAllChunks("AF60 AF-60", "60")).toEqual([
      { value: "AF", match: -1 },
      { value: "60", match: 2 },
      { value: " AF-", match: -1 },
      { value: "60", match: 8 },
    ]);
  });

  it("should handle special characters and word boundaries", () => {
    expect(findAllChunks("test.com/test?test", "test")).toEqual([
      { value: "test", match: 0 },
      { value: ".com/", match: -1 },
      { value: "test", match: 9 },
      { value: "?", match: -1 },
      { value: "test", match: 14 },
    ]);
  });
});
