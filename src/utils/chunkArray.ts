export function chunkArray<T>(
  arr: readonly T[] | T[],
  chunkSize: number
): { data: T[]; id: number }[] {
  if (chunkSize <= 0) {
    throw new Error("chunkSize must be greater than 0.");
  }

  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    result.push({ data: chunk, id: i });
  }

  return result;
}
