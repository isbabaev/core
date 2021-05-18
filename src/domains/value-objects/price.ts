import { BaseValueObject } from './base-value-object';
import BigNumber from 'bignumber.js';

export class Price extends BaseValueObject<BigNumber> {
  constructor(value: BigNumber) {
    if (value.isNegative()) {
      throw Error('"value" must be a positive number');
    }
    super(value);
  }
}
