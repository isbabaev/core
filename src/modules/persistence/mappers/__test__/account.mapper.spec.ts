import { AccountPersistence } from '../../entities/account-persistence';
import { Account } from '../../../../domains/entities/account';
import { AccountMapper } from '../account.mapper';

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
});
