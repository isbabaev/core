import { AccountPersistence } from '../../entities/account-persistence';
import { Account } from '../../../../domains/entities/account';
import { AccountMapper } from '../account.mapper';
import { Id } from '../../../../domains/value-objects/id';
import { AccountFirstName } from '../../../../domains/value-objects/account/account-first-name';
import { AccountLastName } from '../../../../domains/value-objects/account/account-last-name';
import { AccountEmail } from '../../../../domains/value-objects/account/account-email';
import { AccountPassword } from '../../../../domains/value-objects/account/account-password';
import { CreatedAt } from '../../../../domains/value-objects/created-at';
import { UpdatedAt } from '../../../../domains/value-objects/updated-at';

describe('AccountMapperTest', () => {
  describe('mapToDomain', () => {
    let accountPersistence: AccountPersistence;

    beforeAll(() => {
      accountPersistence = new AccountPersistence(
        '9e3fdf13-e10a-4914-8d2a-e93789c3bab3',
        'Test',
        'Test',
        'test@mail.com',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        [],
        new Date('2021-05-22'),
        new Date('2021-05-22'),
      );
    });

    test('account should be instance of Account', () => {
      const account = AccountMapper.mapToDomain(accountPersistence);

      expect(account).toBeInstanceOf(Account);
    });

    test('accountPersistence and account should have same values', () => {
      const account = AccountMapper.mapToDomain(accountPersistence);

      expect(account.id.value).toBe(accountPersistence.id);
      expect(account.firstName.value).toBe(accountPersistence.firstName);
      expect(account.lastName.value).toBe(accountPersistence.lastName);
      expect(account.email.value).toBe(accountPersistence.email);
      expect(account.password.value).toBe(accountPersistence.password);
      expect(account.createdAt.value).toBe(accountPersistence.createdAt);
      expect(account.updatedAt.value).toBe(accountPersistence.updatedAt);
    });
  });
  describe('mapToPersistence', () => {
    let account: Account;

    beforeAll(() => {
      account = new Account(
        new Id('9e3fdf13-e10a-4914-8d2a-e93789c3bab3'),
        new AccountFirstName('firstName'),
        new AccountLastName('lastName'),
        new AccountEmail('mail@mail.com'),
        new AccountPassword('password'),
        new CreatedAt(new Date()),
        new UpdatedAt(new Date()),
      );
    });

    test('accountPersistence should be instance of AccountPersistence', () => {
      const accountPersistence = AccountMapper.mapToPersistence(account);

      expect(accountPersistence).toBeInstanceOf(AccountPersistence);
    });

    test('account and accountPersistence should have same values', () => {
      const accountPersistence = AccountMapper.mapToPersistence(account);

      expect(accountPersistence.id).toBe(account.id.value);
      expect(accountPersistence.firstName).toBe(account.firstName.value);
      expect(accountPersistence.lastName).toBe(account.lastName.value);
      expect(accountPersistence.email).toBe(account.email.value);
      expect(accountPersistence.password).toBe(account.password.value);
      expect(accountPersistence.createdAt).toBe(account.createdAt.value);
      expect(accountPersistence.updatedAt).toBe(account.updatedAt.value);
    });
  });
});
