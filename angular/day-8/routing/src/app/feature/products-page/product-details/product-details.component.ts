import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IProducts, products } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent {
  public product: IProducts;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    const found = products.find(
      (p) => p.id === Number(this.route.snapshot.paramMap.get('id'))
    );

    if (!found) {
      throw new Error(`product with given id not found`);
    }

    this.product = found;
  }

  public addToCart(): void {
    this.productService.addToCart(this.product);
  }
}
