import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'dynamicCurrency',
})
export class DynamicCurrencyPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}

  transform(
    value: number | string,
    currencyCode: string = 'USD',
    locale: string = 'en-US'
  ): string | null {
    let display: 'code' | 'symbol' | 'symbol-narrow' = 'symbol';

    if (currencyCode.toUpperCase() === 'GEL') {
      display = 'symbol-narrow';
      locale = 'ka-GE';
    }

    const formatted = this.currencyPipe.transform(
      value,
      currencyCode,
      display,
      '1.2-2',
      locale
    );

    if (!formatted) {
      return null;
    }

    if (currencyCode.toUpperCase() === 'GEL') {
      const regex = /(.*)\s(₾)/;
      const match = formatted.match(regex);
      if (match) {
        return `${match[2]}${match[1]}`;
      }
    }

    return formatted;
  }
}
