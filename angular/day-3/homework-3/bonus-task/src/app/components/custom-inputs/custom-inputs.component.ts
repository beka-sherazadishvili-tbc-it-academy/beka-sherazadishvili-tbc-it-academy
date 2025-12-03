import { Component, forwardRef, Input, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type OnChangeFn = (value: string | null) => void;

@Component({
  selector: 'app-custom-inputs',
  templateUrl: './custom-inputs.component.html',
  styleUrls: ['./custom-inputs.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputsComponent),
      multi: true,
    },
  ],
})
export class CustomInputsComponent implements ControlValueAccessor {

  @Input() label: string = '';
  @Input() type: 'text' | 'password' | 'email' | 'radio' = 'text';
  @Input() placeholder: string = '';
  @Input() options: Array<{ label: string; value: string }> = [];

  value: string | null = null;
  touched = false;

  public onChange: OnChangeFn = () => {};
  public onTouched: () => void = () => {};

  public writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  public registerOnChange(fn: OnChangeFn): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.updateValue(input.value);
  }

  public updateValue(val: string | null): void {
    this.value = val;
    this.onChange(val);
    this.markTouched();
  }

  public markTouched(): void {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }
}
