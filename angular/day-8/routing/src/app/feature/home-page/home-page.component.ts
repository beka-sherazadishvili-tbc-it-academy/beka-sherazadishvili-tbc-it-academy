import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  constructor(private productService: ProductService) {}

  public totalItems() {
    this.productService.totalQuantity()
  }
}
