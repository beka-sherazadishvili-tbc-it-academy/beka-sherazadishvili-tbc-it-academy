export interface IProducts {
  id: number;
  name: string;
  price: number;
  img?: string;
  quantity: number;
  description?: string;
}

export const products: IProducts[] = [
  { 
    id: 1, 
    name: 'Apple', 
    price: 1.2, 
    img: 'apple.jpeg', 
    quantity: 0,
    description: 'Fresh red apples, crisp and naturally sweet.'
  },
  { 
    id: 2, 
    name: 'Banana', 
    price: 0.8, 
    img: 'banana.jpeg', 
    quantity: 0,
    description: 'Ripe yellow bananas packed with energy and nutrients.'
  },
  { 
    id: 3, 
    name: 'Orange', 
    price: 1.5, 
    img: 'orange.jpeg', 
    quantity: 0,
    description: 'Juicy oranges full of vitamin C and refreshing flavor.'
  },
  { 
    id: 4, 
    name: 'Milk', 
    price: 2.0, 
    img: 'milk.jpeg', 
    quantity: 0,
    description: 'Fresh whole milk, perfect for drinking or cooking.'
  },
  { 
    id: 5, 
    name: 'Bread', 
    price: 2.5, 
    img: 'bread.jpeg', 
    quantity: 0,
    description: 'Soft and freshly baked bread with a golden crust.'
  },
  { 
    id: 6, 
    name: 'Eggs', 
    price: 3.0, 
    img: 'eggs.jpeg', 
    quantity: 0,
    description: 'Farm-fresh eggs rich in protein and essential nutrients.'
  },
  { 
    id: 7, 
    name: 'Cheese', 
    price: 4.0, 
    img: 'cheese.jpeg', 
    quantity: 0,
    description: 'Creamy cheese with a smooth texture and rich taste.'
  },
  { 
    id: 8, 
    name: 'Tomato', 
    price: 1.8, 
    img: 'tomato.jpeg', 
    quantity: 0,
    description: 'Fresh, juicy tomatoes ideal for salads and cooking.'
  },
  { 
    id: 9, 
    name: 'Potato', 
    price: 1.0, 
    img: 'potato.jpeg', 
    quantity: 0,
    description: 'Versatile potatoes perfect for boiling, baking, or frying.'
  },
  { 
    id: 10, 
    name: 'Chicken', 
    price: 5.0, 
    img: 'chicken.jpeg', 
    quantity: 0,
    description: 'Fresh chicken meat, tender and high in protein.'
  }
];
