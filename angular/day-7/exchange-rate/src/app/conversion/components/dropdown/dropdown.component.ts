import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { IAccounts } from '../../models/accounts.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent<T> implements OnInit, OnChanges {
  @Input() items: T[] = [];
  @Input() displayFn: (item: T) => string = (item) => String(item);
  @Input() selectedItem: T | null = null;
  @Input() isDefaultSelected: boolean;
  @Input() disabledItems: T[] = [];
  @Input() disabledCurrency: string | undefined;
  @Output() selectedItemChange = new EventEmitter<T>();
  public form: FormControl<T | null>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.control<T | null>(null);
  }

  public ngOnInit() {
    if (this.selectedItem !== null) {
      this.form.setValue(this.selectedItem);
    }

    this.form.valueChanges.subscribe((value) => {
      this.selectedItem = value;
      this.selectedItemChange.emit(value as T);
    });
  }

  public ngOnChanges() {
    this.disabledItems = this.items.filter(
      (item) => (item as IAccounts).currency === this.disabledCurrency
    );
  }

  public isDisabled(item: T): boolean {
    const account = item as unknown as IAccounts;
    return account.currency === this.disabledCurrency;
  }
}
