import { Component } from '@angular/core';
import { IAccounts } from './models/accounts.model';
import { Observable } from 'rxjs';
import { DynamicCurrencyPipe } from './pipes/dynamicCurrency.pipe';
import { AccountsService } from './services/accounts.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { IRates } from './models/rates.model';

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.scss'],
})
export class ConversionComponent {
  public receiverAccount$: Observable<IAccounts[]>;
  public senderAccount$: Observable<IAccounts[]>;
  public selectedReceiver: IAccounts | null = null;
  public selectedSender: IAccounts | null = null;
  public fromAmountError: string | null = null;
  public toAmountError: string | null = null;
  public senderCurrency: string | null = null;
  public rates: IRates[] = [];
  public convertEnabled = false;
  public accountDisplay = (a: IAccounts) =>
    `${a.friendlyName} - ${this.currencyPipe.transform(
      a.availableBalance,
      a.currency
    )}`;
  public fromAmountControl: FormControl<number | null> = this.fb.control<
    number | null
  >(null);
  public toAmountControl: FormControl<number | null> = this.fb.control<
    number | null
  >(null);

  constructor(
    private accountService: AccountsService,
    private currencyPipe: DynamicCurrencyPipe,
    private fb: FormBuilder
  ) {
    this.senderAccount$ = this.accountService.getSenderAccounts();
    this.receiverAccount$ = this.accountService.getReceiverAccounts();
    this.accountService.getRates().subscribe((rates: IRates[]) => {
      this.rates = rates;
    });
  }

  private lastChanged: 'from' | 'to' | null = null;

  public ngOnInit() {
    this.fromAmountControl.valueChanges.subscribe((value) => {
      this.fromAmountError = null;
      if (value !== null) {
        if (
          this.selectedSender &&
          value > this.selectedSender.availableBalance
        ) {
          this.fromAmountError = 'Amount exceeds balance';
        }

        if (
          this.lastChanged !== 'to' &&
          this.selectedSender &&
          this.selectedReceiver
        ) {
          this.lastChanged = 'from';
          const senderRate = this.getRate(
            this.selectedSender.currency,
            this.selectedReceiver.currency,
            'from'
          );

          this.toAmountControl.setValue(
            parseFloat((value * senderRate).toFixed(2)),
            {
              emitEvent: false,
            }
          );
          this.lastChanged = null;
        }
      }
    });

    this.toAmountControl.valueChanges.subscribe((value) => {
      this.toAmountError = null;

      if (value !== null) {
        if (
          this.lastChanged !== 'from' &&
          this.selectedSender &&
          this.selectedReceiver
        ) {
          this.lastChanged = 'to';
          const receiverRate = this.getRate(
            this.selectedReceiver.currency,
            this.selectedSender.currency,
            'to'
          );
          this.fromAmountControl.setValue(
            parseFloat((value * receiverRate).toFixed(2)),
            {
              emitEvent: false,
            }
          );
          this.lastChanged = null;
        }
      }
    });
  }

  public handleFromAmount(value: number) {
    this.fromAmountError = value < 0 ? 'value cannot be negative' : null;
  }

  public handleToAmount(value: number) {
    this.toAmountError = value < 0 ? 'value cannot be negative' : null;
  }

  public onSenderChange(account: IAccounts | null) {
    this.selectedSender = account;

    this.senderCurrency = account?.currency ?? null;

    if (this.selectedReceiver?.currency === this.senderCurrency) {
      this.selectedReceiver = null;
    }
  }

  public getRate(
    fromCurrency: string,
    toCurrency: string,
    direction: 'from' | 'to'
  ): number {
    if (fromCurrency === toCurrency) return 1;

    const fromRateObj = this.rates.find(
      (rate) => rate.currencyCode === fromCurrency
    );
    const toRateObj = this.rates.find(
      (rate) => rate.currencyCode === toCurrency
    );

    if (fromCurrency === 'GEL') {
      if (direction === 'from') {
        return 1 / (toRateObj?.standard.buy ?? 1);
      } else {
        return toRateObj?.standard.buy ?? 1;
      }
    }

    if (toCurrency === 'GEL') {
      if (direction === 'from') {
        return fromRateObj?.standard.sell ?? 1;
      } else {
        return 1 / (fromRateObj?.standard.sell ?? 1);
      }
    }

    if (!fromRateObj || !toRateObj) {
      return 1;
    }
    if (direction === 'from') {
      return fromRateObj.standard.sell / toRateObj.standard.buy;
    } else {
      return fromRateObj.standard.buy / toRateObj.standard.sell;
    }
  }

  public onSubmit() {
    if (!this.selectedSender || !this.selectedReceiver) {
      return;
    }

    if (!this.fromAmountControl.value || this.fromAmountControl.value <= 0) {
      return;
    }

    if (this.fromAmountControl.value > this.selectedSender.availableBalance) {
      return;
    }

    if (this.selectedSender.currency === this.selectedReceiver.currency) {
      return;
    }

    this.selectedSender.availableBalance -= this.fromAmountControl.value;
    this.selectedReceiver.availableBalance += this.toAmountControl.value ?? 0;

    this.accountService.updateSenderAccount(this.selectedSender).subscribe();
    this.accountService
      .updateReceiverAccount(this.selectedReceiver)
      .subscribe();

    this.fromAmountControl.setValue(null);
    this.toAmountControl.setValue(null);
  }

  get currentRateFrom(): string | null {
    if (this.selectedSender && this.selectedReceiver) {
      const rate = this.getRate(
        this.selectedSender.currency,
        this.selectedReceiver.currency,
        'from'
      );
      return rate.toFixed(3);
    }
    return null;
  }

  get currentRateTo(): string | null {
    if (this.selectedSender && this.selectedReceiver) {
      const rate = this.getRate(
        this.selectedReceiver.currency,
        this.selectedSender.currency,
        'to'
      );
      return rate.toFixed(3);
    }
    return null;
  }

  get isConvertDisabled(): boolean {
    if (!this.selectedSender || !this.selectedReceiver) {
      return true;
    }

    if (this.selectedSender.currency === this.selectedReceiver.currency) {
      return true;
    }

    const from = this.fromAmountControl.value;
    const to = this.toAmountControl.value;

    if (!from || from <= 0 || !to || to <= 0) {
      return true;
    }

    if (from > this.selectedSender.availableBalance) {
      return true;
    }

    const rate = this.getRate(
      this.selectedSender.currency,
      this.selectedReceiver.currency,
      'from'
    );
    if (!rate || rate <= 0) {
      return true;
    }

    return false;
  }
}
