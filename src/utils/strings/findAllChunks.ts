export type MatchChunk = {
  value: string;
  match: number;
};

/**
 * Splits a string into chunks based on a search term, indicating which chunks match the term.
 * The function is case-insensitive for matching but preserves the original case in the results.
 */
export function findAllChunks(
  str: string,
  term: string,
  chunks: MatchChunk[] = [],
  currentStrIndex = 0
): MatchChunk[] {
  if (!term) {
    return [{ value: str, match: -1 }];
  }
  if (!str || str.length === 0) {
    return chunks;
  }

  const match = str.toLowerCase().indexOf(term.toLowerCase());

  if (match === -1) {
    chunks.push({ value: str, match: -1 });
    return chunks;
  }

  if (match === 0) {
    chunks.push({
      value: str.slice(0, term.length),
      match: currentStrIndex,
    });
    findAllChunks(
      str.slice(term.length),
      term,
      chunks,
      currentStrIndex + term.length
    );
  }

  if (match > 0) {
    chunks.push({
      value: str.slice(0, match),
      match: -1,
    });
    chunks.push({
      value: str.slice(match, match + term.length),
      match: currentStrIndex + match,
    });
    findAllChunks(
      str.slice(match + term.length),
      term,
      chunks,
      currentStrIndex + match + term.length
    );
  }

  return chunks;
}
