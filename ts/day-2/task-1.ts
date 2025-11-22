function sortBy<T, K extends keyof T>(arr: T[], name: K, flag: boolean = false): T[] {
  const newArr: T[] = [...arr];
  
  newArr.sort((a, b) => compare(a[name], b[name], flag));
  return newArr;
}

function compare<T>(a: T, b: T, flag: boolean = false): number {
  if (a < b) {
    return flag ? 1 : -1;
  }

  if (a > b) {
    return flag ? -1 : 1;
  }

  return 0;
}
