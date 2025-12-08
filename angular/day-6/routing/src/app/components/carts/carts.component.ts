import { Component } from '@angular/core';
import { IProducts, products } from '../../products/product.model';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss'],
})
export class CartsComponent {
  public cartItems$ = this.productService.cart$;

  constructor(public productService: ProductService) {}

  public increment(id: number): void {
    this.productService.increment(id);
  }

  public decrement(id: number): void {
    this.productService.decrement(id);
  }
}
