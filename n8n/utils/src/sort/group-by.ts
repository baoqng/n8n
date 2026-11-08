// bloom-deps:

export function groupBy<T>(items: T[], key: (item: T) => string): Map<string, T[]> {
  const result = new Map<string, T[]>();
  for (const item of items) {
    const k = key(item);
    if (!result.has(k)) {
      result.set(k, []);
    }
    result.get(k)!.push(item);
  }
  return result;
}