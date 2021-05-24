import { AccountPassword } from '../account-password';

describe('AccountPasswordTest', () => {
  test('should create AccountPassword instance', () => {
    const accountPassword = new AccountPassword('ItIsPassword');

    expect(accountPassword).toBeInstanceOf(AccountPassword);
  });

  test('should save value', () => {
    const value = 'ItIsPassword';
    const accountPassword = new AccountPassword(value);

    expect(accountPassword.value).toBe(value);
  });
});
