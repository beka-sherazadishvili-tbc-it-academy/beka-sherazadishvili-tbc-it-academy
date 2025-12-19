import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DinoComponent } from './dino.component';
import { MinutePipes } from '../../core/pipes/timer.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from "../../app-routing.module";

@NgModule({
  declarations: [DinoComponent, MinutePipes],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule
],
  exports: [DinoComponent]
})
export class DinoModule { }
