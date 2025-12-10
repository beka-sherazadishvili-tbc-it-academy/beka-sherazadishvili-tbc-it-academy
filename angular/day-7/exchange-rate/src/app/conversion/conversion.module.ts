import { LOCALE_ID, NgModule } from '@angular/core';
import { ConversionComponent } from './conversion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { InputComponent } from './components/input/input.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DynamicCurrencyPipe } from './pipes/dynamicCurrency.pipe';
import { CurrencyPipe } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localeKa from '@angular/common/locales/ka';

registerLocaleData(localeKa);

@NgModule({
  declarations: [
    ConversionComponent,
    InputComponent,
    DropdownComponent,
    DynamicCurrencyPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [CurrencyPipe, { provide: LOCALE_ID, useValue: 'ka-GE' }],
})
export class ConversionModule {}
