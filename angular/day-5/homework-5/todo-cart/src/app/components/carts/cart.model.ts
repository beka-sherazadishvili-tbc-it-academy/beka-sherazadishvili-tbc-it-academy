export interface Icart {
  id: number;
  name: string;
  price: number;
  img?: string;
  quantity: number;
}

export const products: Icart[] = [
  { id: 1, name: 'Apple', price: 1.2, img: 'apple.jpeg', quantity: 0 },
  { id: 2, name: 'Banana', price: 0.8, img: 'banana.jpeg', quantity: 0 },
  { id: 3, name: 'Orange', price: 1.5, img: 'orange.jpeg', quantity: 0 },
  { id: 4, name: 'Milk', price: 2.0, img: 'milk.jpeg', quantity: 0 },
  { id: 5, name: 'Bread', price: 2.5, img: 'bread.jpeg', quantity: 0 },
  { id: 6, name: 'Eggs', price: 3.0, img: 'eggs.jpeg', quantity: 0 },
  { id: 7, name: 'Cheese', price: 4.0, img: 'cheese.jpeg', quantity: 0 },
  { id: 8, name: 'Tomato', price: 1.8, img: 'tomato.jpeg', quantity: 0 },
  { id: 9, name: 'Potato', price: 1.0, img: 'potato.jpeg', quantity: 0 },
  { id: 10, name: 'Chicken', price: 5.0, img: 'chicken.jpeg', quantity: 0 }
];
