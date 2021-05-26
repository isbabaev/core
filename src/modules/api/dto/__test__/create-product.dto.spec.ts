import { validate } from 'class-validator';
import { CreateProductDto } from '../create-product.dto';

describe('CreateProductDtoTest', () => {
  test('validate should not return any errors', async () => {
    const createProductData = new CreateProductDto(
      'ProductName',
      'ProductDescription',
      ['http://localhost:3000/photo'],
      100.50,
      'a6abb7da-6b27-4ca8-9f71-f2126f8d72a9',
    );

    const errors = await validate(createProductData);

    expect(errors.length).toBe(0);
  });

  test('validate should return error when name is not a string', async () => {
    const createProductData = new CreateProductDto(
      {} as any,
      'ProductDescription',
      ['http://localhost:3000/photo'],
      100.50,
      'a6abb7da-6b27-4ca8-9f71-f2126f8d72a9',
    );

    const errors = await validate(createProductData);

    expect(errors[0].constraints.isString).toBe('name must be a string');
  });

  test('validate should return error when description is not a string', async () => {
    const createProductData = new CreateProductDto(
      'ProductName',
      {} as any,
      ['http://localhost:3000/photo'],
      100.50,
      'a6abb7da-6b27-4ca8-9f71-f2126f8d72a9',
    );

    const errors = await validate(createProductData);

    expect(errors[0].constraints.isString).toBe('description must be a string');
  });

  test('validate should return error when photoUris is not an array', async () => {
    const createProductData = new CreateProductDto(
      'ProductName',
      'ProductDescription',
      {} as any,
      100.50,
      'a6abb7da-6b27-4ca8-9f71-f2126f8d72a9',
    );

    const errors = await validate(createProductData);

    expect(errors[0].constraints.isString).toBe('each value in photoUris must be a string');
  });

  test('validate should not return error when photoUris is empty array', async () => {
    const createProductData = new CreateProductDto(
      'ProductName',
      'ProductDescription',
      [],
      100.50,
      'a6abb7da-6b27-4ca8-9f71-f2126f8d72a9',
    );

    const errors = await validate(createProductData);

    expect(errors.length).toBe(0);
  });

  test('validate should return error when price is not a number', async () => {
    const createProductData = new CreateProductDto(
      'ProductName',
      'ProductDescription',
      ['http://localhost:3000/photo'],
      {} as any,
      'a6abb7da-6b27-4ca8-9f71-f2126f8d72a9',
    );

    const errors = await validate(createProductData);

    expect(errors[0].constraints.isNumber)
      .toBe('price must be a number conforming to the specified constraints');
  });

  test('validate should return error when sellerId is not a string', async () => {
    const createProductData = new CreateProductDto(
      'ProductName',
      'ProductDescription',
      ['http://localhost:3000/photo'],
      100.50,
      {} as any,
    );

    const errors = await validate(createProductData);

    expect(errors[0].constraints.isString).toBe('sellerId must be a string');
  });
});
