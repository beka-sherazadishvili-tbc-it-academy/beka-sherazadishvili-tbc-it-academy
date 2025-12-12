import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IProducts, products } from '../models/product.model';
import { ProductService } from 'src/app/shared/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

type ProductQueryParams = {
  search?: string;
  sort?: 'asc' | 'desc' | '';
  from?: number;
  to?: number;
};


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  public productList$ = this.productService.cart$;
  public products: IProducts[] = products;
  public filtered: IProducts[] = [];

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        map((params) => {
          const search = params['search'] ? params['search'].toLowerCase() : '';
          const sort = params['sort'] || '';

          let result = [...this.products];

          if (search) {
            result = result.filter((p) =>
              p.name.toLowerCase().includes(search)
            );
          }

          if (sort === 'asc') {
            result.sort((a, b) => a.price - b.price);
          } else if (sort === 'desc') {
            result.sort((a, b) => b.price - a.price);
          }

          return result;
        })
      )
      .subscribe((result) => (this.filtered = result));
  }

  public onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.updateQuery({ search: value });
  }

  public onSort(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as '' | 'asc' | 'desc';

    this.updateQuery({ sort: value });
  }

  private updateQuery(params: ProductQueryParams): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  public addToCart(product: IProducts): void {
    this.productService.addToCart(product);
  }
}
