import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'currency-conversion',
    pathMatch: 'full',
  },
  {
    path: 'currency-conversion',
    loadChildren: () =>
      import('./conversion/conversion-routing.module').then(
        (m) => m.ConversionRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
