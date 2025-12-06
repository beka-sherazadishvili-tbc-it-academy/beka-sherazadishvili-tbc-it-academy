import { Component } from '@angular/core';
import { Icart, products } from './cart.model';
import { CartService } from './carts.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss'],
})
export class CartsComponent {
  public cartItems$ = this.cartService.cart$;
  public products: Icart[] = products;

  constructor(public cartService: CartService) {}

  public addToCart(product: Icart): void {
    this.cartService.addToCart(product);
  }

  public increment(id: number): void {
    this.cartService.increment(id);
  }

  public decrement(id: number): void {
    this.cartService.decrement(id);
  }

  public clearCart(): void {
    this.cartService.clearCart();
  }

  public totalQuantity(): number {
    return this.cartService.totalQuantity();
  }

  public totalPrice(): number {
    return this.cartService.totalPrice();
  }
}
