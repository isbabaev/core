import { Account } from '../account';
import { Id } from '../../value-objects/id';
import { Product } from '../product';
import { ProductName } from '../../value-objects/product/product-name';
import { ProductDescription } from '../../value-objects/product/product-description';
import { ProductPhotoUri } from '../../value-objects/product/product-photo-uri';
import { Price } from '../../value-objects/price';
import { AccountFirstName } from '../../value-objects/account/account-first-name';
import { AccountLastName } from '../../value-objects/account/account-last-name';
import { AccountEmail } from '../../value-objects/account/account-email';
import { AccountPassword } from '../../value-objects/account/account-password';
import BigNumber from 'bignumber.js';
import { v4 as uuidv4 } from 'uuid';
import { Currency } from '../../value-objects/currency';

describe('ProductTest', () => {
  let productId: Id;
  let productName: ProductName;
  let productDescription: ProductDescription;
  let productPhotoUris: ProductPhotoUri[];
  let productPrice: Price;
  let productSeller: Account;

  beforeAll(() => {
    productId = new Id(uuidv4());
    productName = new ProductName('ProductName');
    productDescription = new ProductDescription('ProductDescription');
    productPhotoUris = [new ProductPhotoUri('https://test.com/photo')];
    productPrice = new Price(new BigNumber(1), new Currency('dollar'));
    productSeller = new Account(
      new Id(uuidv4()),
      new AccountFirstName('firstName'),
      new AccountLastName('lastName'),
      new AccountEmail('mail@mail.com'),
      new AccountPassword('password'),
    );
  });

  test('should create Product instance', () => {
    const product = new Product(
      productId,
      productName,
      productDescription,
      productPhotoUris,
      productPrice,
      productSeller,
    );

    expect(product).toBeInstanceOf(Product);
  });

  test('should throw error "id is null or undefined" when id is null', () => {
    const _productId = null;

    expect(() => {
      new Product(
        _productId,
        productName,
        productDescription,
        productPhotoUris,
        productPrice,
        productSeller,
      );
    }).toThrowError('id is null or undefined');
  });

  test('should throw error "name is null or undefined" when name is null', () => {
    const _productName = null;

    expect(() => {
      new Product(
        productId,
        _productName,
        productDescription,
        productPhotoUris,
        productPrice,
        productSeller,
      );
    }).toThrowError('name is null or undefined');
  });

  test('should throw error "description is null or undefined" when description is null', () => {
    const _productDescription = null;

    expect(() => {
      new Product(
        productId,
        productName,
        _productDescription,
        productPhotoUris,
        productPrice,
        productSeller,
      );
    }).toThrowError('description is null or undefined');
  });

  test('should throw error "photoUris is null or undefined" when photoUris is null', () => {
    const _productPhotoUris = null;

    expect(() => {
      new Product(
        productId,
        productName,
        productDescription,
        _productPhotoUris,
        productPrice,
        productSeller,
      );
    }).toThrowError('photoUris is null or undefined');
  });

  test('should throw error "price is null or undefined" when price is null', () => {
    const _productPrice = null;

    expect(() => {
      new Product(
        productId,
        productName,
        productDescription,
        productPhotoUris,
        _productPrice,
        productSeller,
      );
    }).toThrowError('price is null or undefined');
  });

  test('should throw error "seller is null or undefined" when seller is null', () => {
    const _productSeller = null;

    expect(() => {
      new Product(
        productId,
        productName,
        productDescription,
        productPhotoUris,
        productPrice,
        _productSeller,
      );
    }).toThrowError('seller is null or undefined');
  });
});
