function uniqueByKey<T, K extends keyof T>(items: T[], key: K): T[] {
  const seen = new Set();
  const result: T[] = [];

  for (const item of items) {
    const value = item[key];

    if (!seen.has(value)) {
      seen.add(value);
      result.push(item);
    }
  }

  return result;
}
