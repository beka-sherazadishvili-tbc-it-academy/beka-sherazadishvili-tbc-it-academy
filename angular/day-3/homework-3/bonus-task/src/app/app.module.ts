import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomInputsComponent } from './components/custom-inputs/custom-inputs.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CustomInputsComponent,
    RegistrationFormComponent,
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
