import { Account } from '../account';
import { AccountFirstName } from '../../value-objects/account/account-first-name';
import { AccountLastName } from '../../value-objects/account/account-last-name';
import { Id } from '../../value-objects/id';
import { AccountEmail } from '../../value-objects/account/account-email';
import { AccountPassword } from '../../value-objects/account/account-password';
import { v4 as uuidv4 } from 'uuid';

describe('AccountTest', () => {
  test('should create Account instance', () => {
    const id = uuidv4();
    const account = new Account(
      new Id(id),
      new AccountFirstName('firstName'),
      new AccountLastName('lastName'),
      new AccountEmail('mail@mail.com'),
      new AccountPassword('password'),
    );

    expect(account).toBeInstanceOf(Account);
  });
});
