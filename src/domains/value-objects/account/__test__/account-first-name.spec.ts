import { AccountFirstName } from '../account-first-name';
import * as randomString from 'randomstring';

describe('AccountFirstNameTest', () => {
  test('should create AccountFirstName instance', () => {
    const accountFirstName = new AccountFirstName('Test');

    expect(accountFirstName).toBeInstanceOf(AccountFirstName);
  });

  test('should save value', () => {
    const value = 'Test';
    const accountFirstName = new AccountFirstName(value);

    expect(accountFirstName.value).toBe(value);
  });

  test('should throw exception when value length is greater than 50', async () => {
    expect(() => new AccountFirstName(randomString.generate(51)))
      .toThrowError('"value" length must be less than or equal to 50 characters long');
  });
});
