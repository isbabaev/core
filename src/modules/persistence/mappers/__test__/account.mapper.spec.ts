import { AccountPersistence } from '../../entities/account-persistence';
import { Account } from '../../../../domains/entities/account';
import { AccountMapper } from '../account.mapper';

describe('AccountMapperTest', () => {
  describe('mapToDomain', () => {
    test('should return account', () => {
      const accountPersistence = new AccountPersistence(
        '9e3fdf13-e10a-4914-8d2a-e93789c3bab3',
        'Test',
        'Test',
        'test@mail.com',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        [],
        new Date('2021-05-22'),
        new Date('2021-05-22'),
      );

      const account = AccountMapper.mapToDomain(accountPersistence);

      expect(account).toEqual(accountPersistence);
      expect(account).toBeInstanceOf(Account);
    });
  });

});
