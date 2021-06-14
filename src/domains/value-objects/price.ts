import BigNumber from 'bignumber.js';
import { Currency } from './currency';

export class Price {
  private readonly _value: BigNumber;
  private readonly _currency: Currency;

  constructor(value: BigNumber, currency: Currency) {
    if (value.isNegative()) {
      throw Error('"value" must be a positive number');
    }
    this._value = value;
    this._currency = currency;
  }

  get value(): BigNumber {
    return this._value;
  }

  get currency(): Currency {
    return this._currency;
  }
}
