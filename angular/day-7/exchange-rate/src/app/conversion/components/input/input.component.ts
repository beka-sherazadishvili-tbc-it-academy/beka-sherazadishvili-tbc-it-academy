import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() controllerName: FormControl<number | null>;
  @Output() amountEntered = new EventEmitter<number>();
  @Input() error: string | null = null;
  @Input() enabled: boolean = false;

  public onInput(event: Event) {
    const num = parseFloat((event.target as HTMLInputElement).value);

    if (!isNaN(num)) {
      this.amountEntered.emit(num);
    }
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['enabled'] && this.controllerName) {
      const enabledChange = changes['enabled'];
      if (enabledChange.currentValue) {
        this.controllerName.enable({ emitEvent: false });
      } else {
        this.controllerName.disable({ emitEvent: false });
      }
    }
  }
}
