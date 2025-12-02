import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SeatsComponent } from './components/seats/seats.component';
import { GuestInputsComponent } from './components/guest-inputs/guest-inputs.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputsComponent } from './components/inputs/inputs.component';
import { ButtonsComponent } from './components/buttons/buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    SeatsComponent,
    GuestInputsComponent,
    InputsComponent,
    ButtonsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
