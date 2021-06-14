import { BaseValueObject } from './base-value-object';

type CurrencyType = 'dollar' | 'rouble' | 'euro';

export class Currency extends BaseValueObject<CurrencyType> {
  constructor(value: CurrencyType) {
    super(value);
  }
}
