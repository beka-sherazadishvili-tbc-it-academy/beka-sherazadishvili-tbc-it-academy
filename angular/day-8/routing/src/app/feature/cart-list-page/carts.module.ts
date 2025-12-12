import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartsComponent } from './carts.component';
import { CartsRoutingModule } from './carts-routing.module';

@NgModule({
  declarations: [CartsComponent],
  imports: [CommonModule, CartsRoutingModule],
})
export class CartsModule {}
