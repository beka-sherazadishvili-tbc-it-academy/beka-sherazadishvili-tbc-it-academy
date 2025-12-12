import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./feature/home-page/home-page.module').then(
        (module) => module.HomePageModule
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./feature/products-page/products.module').then(
        (module) => module.ProductsModule
      ),
    pathMatch: 'full',
  },
  {
    path: 'carts',
    loadChildren: () =>
      import('./feature/cart-list-page/carts.module').then(
        (module) => module.CartsModule
      ),
    canActivate: [authGuard],
    pathMatch: 'full',
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./feature/checkout-page/checkout.module').then(
        (module) => module.CheckoutModule
      ),
    canActivate: [authGuard],
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./feature/login-page/login-page.module').then(
        (module) => module.LoginPageModule
      ),
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () =>
      import('./shared/components/error-page/error-page.module').then(
        (module) => module.ErrorPageModule
      ),
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
