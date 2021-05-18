import * as jwt from 'jsonwebtoken';
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
import { Purchase } from '../purchase';
import { PurchaseDate } from '../../value-objects/purchase/purchase-date';

describe('PurchaseTest', () => {
  test('should create Purchase instance', () => {
    const password = jwt.sign({}, 'secret');

    const product = new Product(
      new Id(1),
      new ProductName('ProductName'),
      new ProductDescription('ProductDescription'),
      [new ProductPhotoUri('https://test.com/photo')],
      new Price(new BigNumber(1)),
      new Account(
        new Id(1),
        new AccountFirstName('firstName'),
        new AccountLastName('lastName'),
        new AccountEmail('mail@mail.com'),
        new AccountPassword(password),
        new CreatedAt(new Date()),
        new UpdatedAt(new Date()),
      ),
    );

    const account = new Account(
      new Id(1),
      new AccountFirstName('firstName'),
      new AccountLastName('lastName'),
      new AccountEmail('mail@mail.com'),
      new AccountPassword(password),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
    );

    const purchase = new Purchase(
      new Id(1),
      product,
      account,
      new PurchaseDate(new Date()),
    );

    expect(purchase).toBeInstanceOf(Purchase);
  });
});
