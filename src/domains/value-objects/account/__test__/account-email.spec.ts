import { AccountEmail } from '../account-email';

describe('AccountEmailTest', () => {
  test('should create AccountEmail instance', () => {
    const accountEmail = new AccountEmail('test@mail.com');

    expect(accountEmail).toBeInstanceOf(AccountEmail);
  });

  test('should save value', () => {
    const value = 'test@mail.com';
    const accountEmail = new AccountEmail(value);

    expect(accountEmail.value).toBe(value);
  });

  test('should throw exception when value is not email', async () => {
    expect(() => new AccountEmail('test')).toThrowError('"value" must be a valid email');
  });
});
