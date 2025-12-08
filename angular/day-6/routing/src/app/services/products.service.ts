import { Injectable } from '@angular/core';
import { IProducts, products } from '../products/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private cartItems: IProducts[] = [];
  private cartSbj = new BehaviorSubject<IProducts[]>([]);
  public readonly cart$: Observable<IProducts[]> = this.cartSbj.asObservable();
id = Math.random();

  constructor() {
    console.log('ProductService instance ID:', this.id);
  }

  public addToCart(product: { id: number; name: string; price: number }): void {
    const existingItem = this.cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newCart: IProducts = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      };
      this.cartItems.push(newCart);
      console.log(this.cart$)
    }

    this.cartSbj.next([...this.cartItems]);
    console.log(this.cart$)
  }

  public increment(id: number): void {
    const existingItem = this.cartItems.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity++;
      this.cartSbj.next([...this.cartItems]);
    }
  }

  public decrement(id: number): void {
    const existingItem = this.cartItems.find((item) => item.id === id);

    if (!existingItem) {
      return;
    }

    existingItem.quantity--;

    if (existingItem.quantity === 0) {
      this.cartItems = this.cartItems.filter((i) => i.id !== id);
      this.cartSbj.next([...this.cartItems]);
    } else {
      this.cartSbj.next([...this.cartItems]);
    }
  }

  public clearCart() {
    this.cartItems = [];
    this.cartSbj.next([...this.cartItems]);
  }

  public totalQuantity(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  public totalPrice(): number {
    return this.cartItems.reduce((sum, item) => {
      const product = products.find((product) => product.id === item.id);
      return product ? sum + product.price * item.quantity : sum;
    }, 0);
  }
}
