import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ToastsComponent } from './components/toasts/toasts.component';
import { ButtonsPageComponent } from './pages/buttons-page/buttons-page.component';
import { ToastsPageComponent } from './pages/toasts-page/toasts-page.component';
import { ButtonsComponent } from './components/buttons/buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonsComponent,
    ToastsComponent,
    ButtonsPageComponent,
    ToastsPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
