import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  constructor(public productService: ProductService) {}
  public clearCart(): void {
    this.productService.clearCart();
  }

  public totalQuantity(): number {
    return this.productService.totalQuantity();
  }

  public totalPrice(): number {
    return this.productService.totalPrice();
  }
}
