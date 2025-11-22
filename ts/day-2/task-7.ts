function mergeByKey<T, U, K1 extends keyof T, K2 extends keyof U>(
  left: T[],
  right: U[],
  keyLeft: K1,
  keyRight: K2
): [T, U][] {
  const newArr: [T, U][] = [];

  for (let i = 0; i < left.length; i++) {
    let leftItem = left[i]!;

    for (let j = 0; j < right.length; j++) {
        let rightItem = right[j]!;

      if (leftItem[keyLeft]! === rightItem[keyRight]) {
        newArr.push([leftItem, rightItem]);
      }
    }
  }

  return newArr;
}
const orders = [
  { orderId: 1, name: "A" },
  { orderId: 2, name: "B" }
];

const items = [
  { orderId: 1, item: "Apple" },
  { orderId: 1, item: "Orange" },
  { orderId: 2, item: "Carrot" }
];

console.log(mergeByKey(orders, items, "orderId", "orderId"));

