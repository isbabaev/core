import { Price } from '../price';
import BigNumber from 'bignumber.js';

describe('PriceTest', () => {
  test('should create id instance', () => {
    const price = new Price(new BigNumber(1));

    expect(price).toBeInstanceOf(Price);
  });

  test('should save value', () => {
    const value = new BigNumber(1);
    const price = new Price(value);

    expect(price.value).toBe(value);
  });

  test('should throw exception when value is negative number', async () => {
    expect(() => new Price(new BigNumber(-1))).toThrowError('"value" must be a positive number');
  });
});
