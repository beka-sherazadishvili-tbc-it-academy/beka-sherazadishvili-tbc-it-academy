class Inventory {
  constructor(priceThreshold) {
    this.priceThreshold = priceThreshold;
  }
  
  filterExpensive(items) {
    return items.filter((item) => item.price > this.priceThreshold, this);
  }
}
const inventory = new Inventory(100);
const items = [
  { name: 'Laptop', price: 1000 },
  { name: 'Mouse', price: 25 },
  { name: 'Keyboard', price: 150 }
];
console.log(inventory.filterExpensive(items)); // Should return expensive items, but fails
// Fix using bind
// Fix using arrow
// Fix using array fn second parameter
// Explain which solution is the best
 
// Fix a bug

 