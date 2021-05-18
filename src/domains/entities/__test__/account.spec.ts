import { Account } from '../account';
import { AccountFirstName } from '../../value-objects/account/account-first-name';
import { AccountLastName } from '../../value-objects/account/account-last-name';
import { Id } from '../../value-objects/id';
import { AccountEmail } from '../../value-objects/account/account-email';
import { AccountPassword } from '../../value-objects/account/account-password';
import { CreatedAt } from '../../value-objects/created-at';
import { UpdatedAt } from '../../value-objects/updated-at';
import * as jwt from 'jsonwebtoken';

describe('AccountTest', () => {
  test('should create Account instance', () => {
    const password = jwt.sign({},'secret');
    const account = new Account(
      new Id(1),
      new AccountFirstName('firstName'),
      new AccountLastName('lastName'),
      new AccountEmail('mail@mail.com'),
      new AccountPassword(password),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
    );

    expect(account).toBeInstanceOf(Account);
  });
});
