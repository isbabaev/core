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
import { CreatedAt } from '../../value-objects/created-at';
import { UpdatedAt } from '../../value-objects/updated-at';
import BigNumber from 'bignumber.js';
import { v4 as uuidv4 } from 'uuid';
import { Currency } from '../../value-objects/currency';

describe('ProductTest', () => {
  test('should create Product instance', () => {
    const sellerId = uuidv4();
    const seller = new Account(
      new Id(sellerId),
      new AccountFirstName('firstName'),
      new AccountLastName('lastName'),
      new AccountEmail('mail@mail.com'),
      new AccountPassword('password'),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
    );

    const productId = uuidv4();
    const product = new Product(
      new Id(productId),
      new ProductName('ProductName'),
      new ProductDescription('ProductDescription'),
      [new ProductPhotoUri('https://test.com/photo')],
      new Price(new BigNumber(1), new Currency('dollar')),
      seller
    );

    expect(product).toBeInstanceOf(Product);
  });
});
