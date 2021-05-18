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

  test('should throw exception when value is empty', async () => {
    expect(() => new AccountLastName('')).toThrowError('"value" is not allowed to be empty');
  });

  test('should throw exception when value length is greater than 50', async () => {
    expect(() => new AccountLastName(randomString.generate({ length: 51, charset: 'alphabetic' })))
      .toThrowError('"value" length must be less than or equal to 50 characters long');
  });

  test('should throw exception when value contains numbers', async () => {
    expect(() => new AccountLastName('123'))
      .toThrowError('"value" with value "123" fails to match the required pattern: /^[a-zA-Z]+$/');
  });

  test('should throw exception when value contains special characters', async () => {
    expect(() => new AccountLastName('_*.'))
      .toThrowError('"value" with value "_*." fails to match the required pattern: /^[a-zA-Z]+$/');
  });
});
