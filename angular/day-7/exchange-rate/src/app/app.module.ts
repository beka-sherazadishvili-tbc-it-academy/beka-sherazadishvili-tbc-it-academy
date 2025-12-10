import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localeKa from '@angular/common/locales/ka';
import { ReactiveFormsModule } from '@angular/forms';
import { ConversionModule } from './conversion/conversion.module';
import { DynamicCurrencyPipe } from './conversion/pipes/dynamicCurrency.pipe';

registerLocaleData(localeKa);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ConversionModule,
    AppRoutingModule,
  ],
  providers: [
    DynamicCurrencyPipe,
    CurrencyPipe,
    { provide: LOCALE_ID, useValue: 'ka-GE' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
