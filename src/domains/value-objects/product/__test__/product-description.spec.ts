import * as randomString from 'randomstring';
import { ProductDescription } from '../product-description';

describe('ProductDescriptionTest', () => {
  test('should create ProductDescription instance', () => {
    const value = 'ProductDescription';
    const productDescription = new ProductDescription(value);

    expect(productDescription).toBeInstanceOf(ProductDescription);
  });

  test('should save value', () => {
    const value = 'ProductDescription';
    const productDescription = new ProductDescription(value);

    expect(productDescription.value).toBe(value);
  });

  test('should throw exception when value length is greater than 2000', async () => {
    const value = randomString.generate(2001);
    expect(() => new ProductDescription(value))
      .toThrowError('"value" length must be less than or equal to 2000 characters long');
  });
});
