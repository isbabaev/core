import * as randomString from 'randomstring';
import { ProductName } from '../product-name';

describe('ProductNameTest', () => {
  test('should create ProductName instance', () => {
    const value = 'ProductName';
    const productName = new ProductName(value);

    expect(productName).toBeInstanceOf(ProductName);
  });

  test('should save value', () => {
    const value = 'ProductName';
    const productName = new ProductName(value);

    expect(productName.value).toBe(value);
  });

  test('should throw exception when value length is lest than 5', async () => {
    const value = randomString.generate(4);
    expect(() => new ProductName(value))
      .toThrowError('"value" length must be at least 5 characters long');
  });

  test('should throw exception when value length is greater than 500', async () => {
    const value = randomString.generate(501);
    expect(() => new ProductName(value))
      .toThrowError('"value" length must be less than or equal to 500 characters long');
  });
});
