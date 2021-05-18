import * as randomString from 'randomstring';
import { AccountLastName } from '../account-last-name';

describe('AccountLastNameTest', () => {
  test('should create AccountLastName instance', () => {
    const accountLastName = new AccountLastName('Test');

    expect(accountLastName).toBeInstanceOf(AccountLastName);
  });

  test('should save value', () => {
    const value = 'Test';
    const accountLastName = new AccountLastName(value);

    expect(accountLastName.value).toBe(value);
  });

  test('should throw exception when value length is greater than 50', async () => {
    expect(() => new AccountLastName(randomString.generate(51)))
      .toThrowError('"value" length must be less than or equal to 50 characters long');
  });
});
