import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-inputs',
  templateUrl: './custom-inputs.component.html',
  styleUrls: ['./custom-inputs.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputsComponent),
      multi: true
    }
  ]
})
export class CustomInputsComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() labelPosition: 'top' | 'inside' = 'top';
  @Input() type: string = 'text';
  @Input() placeholer: string;


  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
}
