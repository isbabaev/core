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

  test('should throw exception when value is empty', async () => {
    expect(() => new AccountFirstName('')).toThrowError('"value" is not allowed to be empty');
  });

  test('should throw exception when value length is greater than 50', async () => {
    expect(() => new AccountFirstName(randomString.generate({ length: 51, charset: 'alphabetic' })))
      .toThrowError('"value" length must be less than or equal to 50 characters long');
  });

  test('should throw exception when value contains numbers', async () => {
    expect(() => new AccountFirstName('123'))
      .toThrowError('"value" with value "123" fails to match the required pattern: /^[a-zA-Z]+$/');
  });

  test('should throw exception when value contains special characters', async () => {
    expect(() => new AccountFirstName('_*.'))
      .toThrowError('"value" with value "_*." fails to match the required pattern: /^[a-zA-Z]+$/');
  });
});
