import { AccountPassword } from '../account-password';
import * as jwt from 'jsonwebtoken';

describe('AccountPasswordTest', () => {
  test('should create AccountPassword instance', () => {
    const value = jwt.sign({},'secret');
    const accountPassword = new AccountPassword(value);

    expect(accountPassword).toBeInstanceOf(AccountPassword);
  });

  test('should save value', () => {
    const value = jwt.sign({},'secret');
    const accountPassword = new AccountPassword(value);

    expect(accountPassword.value).toBe(value);
  });

  test('should throw exception when value is not token', async () => {
    expect(() => new AccountPassword('Test'))
      .toThrowError('"value" with value "Test" fails to match the required pattern: /^[A-Za-z0-9-_]+\\.[A-Za-z0-9-_]+\\.[A-Za-z0-9-_.+/=]*$/');
  });
});
