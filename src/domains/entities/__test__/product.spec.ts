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
  let requestAccount: Account;

  let product: Product;

  beforeAll(() => {
    productId = new Id(uuidv4());
    productName = new ProductName('ProductName');
    productDescription = new ProductDescription('ProductDescription');
    productPhotoUris = [new ProductPhotoUri('https://test.com/photo')];
    productPrice = new Price(new BigNumber(1), new Currency('dollar'));
    const account = new Account(
      new Id(uuidv4()),
      new AccountFirstName('firstName'),
      new AccountLastName('lastName'),
      new AccountEmail('mail@mail.com'),
      new AccountPassword('password'),
    );
    productSeller = account;
    requestAccount = account;

    product = new Product(
      productId,
      productName,
      productDescription,
      productPhotoUris,
      productPrice,
      productSeller,
      requestAccount,
    );
  });

  test('should create Product instance', () => {
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
        requestAccount,
      );
    }).toThrowError('id is null or undefined');
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
        requestAccount,
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
        requestAccount,
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
        requestAccount,
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
        requestAccount,
      );
    }).toThrowError('seller is null or undefined');
  });

  test('should throw error "requestAccount is null or undefined" when requestAccount is null', () => {
    const _requestAccount = null;

    expect(() => {
      new Product(
        productId,
        productName,
        productDescription,
        productPhotoUris,
        productPrice,
        productSeller,
        _requestAccount,
      );
    }).toThrowError('requestAccount is null or undefined');
  });

  describe('setName', () => {
    let newProductName: ProductName;

    beforeAll(() => {
      newProductName = new ProductName('NewProductName');
    });

    test('should change product name', () => {
      product.setName(newProductName, productSeller);

      expect(product.name).toEqual(newProductName);
    });

    test(`should throw error "the user does not have access to edit the name" 
                when accountId is not equal to product seller id`, () => {
      const requestAccount = new Account(
        new Id(uuidv4()),
        new AccountFirstName('firstName'),
        new AccountLastName('lastName'),
        new AccountEmail('mail@mail.com'),
        new AccountPassword('password'),
      );

      expect(() => product.setName(newProductName, requestAccount))
        .toThrowError('the user does not have access to edit the name');
    });

    test(`should throw error "name is null or undefined" when productName is null`, () => {
      const _newProductName = null;

      expect(() => product.setName(_newProductName, productSeller))
        .toThrowError('name is null or undefined');
    });

    test(`should update updateAt`, () => {
      const oldUpdateAt = product.updatedAt;

      product.setName(newProductName, productSeller);

      expect(product.updatedAt.value.getTime()).toBeGreaterThan(oldUpdateAt.value.getTime());
    });
  });

  describe('setDescription', () => {
    let newProductDescription: ProductDescription;

    beforeAll(() => {
      newProductDescription = new ProductDescription('NewProductDescription');
    });

    test('should change product description', () => {
      product.setDescription(newProductDescription, productSeller);

      expect(product.description).toEqual(newProductDescription);
    });

    test(`should throw error "the user does not have access to edit the description" 
                when accountId is not equal to product seller id`, () => {
      const requestAccount = new Account(
        new Id(uuidv4()),
        new AccountFirstName('firstName'),
        new AccountLastName('lastName'),
        new AccountEmail('mail@mail.com'),
        new AccountPassword('password'),
      );

      expect(() => product.setDescription(newProductDescription, requestAccount))
        .toThrowError('the user does not have access to edit the description');
    });

    test(`should throw error "description is null or undefined" when productDescription is null`, () => {
      const newProductDescription = null;

      expect(() => product.setDescription(newProductDescription, productSeller))
        .toThrowError('description is null or undefined');
    });

    test(`should update updateAt`, () => {
      const oldUpdateAt = product.updatedAt;

      product.setDescription(newProductDescription, productSeller);

      expect(product.updatedAt.value.getTime()).toBeGreaterThan(oldUpdateAt.value.getTime());
    });
  });

  describe('setPhotoUris', () => {
    let newPhotoUris: ProductPhotoUri[];

    beforeAll(() => {
      newPhotoUris = [new ProductPhotoUri('https://test.com/newPhoto')];
    });

    test('should change product photoUris', () => {
      product.setPhotoUris(newPhotoUris, productSeller);

      expect(product.photoUris).toEqual(newPhotoUris);
    });

    test(`should throw error "the user does not have access to edit the photoUris" 
                when accountId is not equal to product seller id`, () => {
      const requestAccount = new Account(
        new Id(uuidv4()),
        new AccountFirstName('firstName'),
        new AccountLastName('lastName'),
        new AccountEmail('mail@mail.com'),
        new AccountPassword('password'),
      );

      expect(() => product.setPhotoUris(newPhotoUris, requestAccount))
        .toThrowError('the user does not have access to edit the photoUris');
    });

    test(`should throw error "photoUris is null or undefined" when productPhotoUris is null`, () => {
      const newPhotoUris = null;

      expect(() => product.setPhotoUris(newPhotoUris, productSeller))
        .toThrowError('photoUris is null or undefined');
    });

    test(`should update updateAt`, () => {
      const oldUpdateAt = product.updatedAt;

      product.setPhotoUris(newPhotoUris, productSeller);

      expect(product.updatedAt.value.getTime()).toBeGreaterThan(oldUpdateAt.value.getTime());
    });
  });

  describe('setPrice', () => {
    let newPrice: Price;

    beforeAll(() => {
      newPrice = new Price(new BigNumber(1000), new Currency('dollar'));
    });

    test('should change product price', () => {
      product.setPrice(newPrice, requestAccount);

      expect(product.price).toEqual(newPrice);
    });

    test(`should throw error "the user does not have access to edit the price" 
                when accountId is not equal to product seller id`, () => {
      const requestAccount = new Account(
        new Id(uuidv4()),
        new AccountFirstName('firstName'),
        new AccountLastName('lastName'),
        new AccountEmail('mail@mail.com'),
        new AccountPassword('password'),
      );

      expect(() => product.setPrice(newPrice, requestAccount))
        .toThrowError('the user does not have access to edit the price');
    });

    test(`should throw error "price is null or undefined" when productPrice is null`, () => {
      const newPrice = null;

      expect(() => product.setPrice(newPrice, requestAccount))
        .toThrowError('price is null or undefined');
    });

    test(`should update updateAt`, () => {
      const oldUpdateAt = product.updatedAt;

      product.setPrice(newPrice, requestAccount);

      expect(product.updatedAt.value.getTime()).toBeGreaterThan(oldUpdateAt.value.getTime());
    });
  });
});
