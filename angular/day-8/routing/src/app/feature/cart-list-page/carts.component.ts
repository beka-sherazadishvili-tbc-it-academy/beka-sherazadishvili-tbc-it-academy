import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductService } from '../../shared/services/products.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
