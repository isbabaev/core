import { Account } from '../account';
import { AccountFirstName } from '../../value-objects/account/account-first-name';
import { AccountLastName } from '../../value-objects/account/account-last-name';
import { Id } from '../../value-objects/id';
import { AccountEmail } from '../../value-objects/account/account-email';
import { AccountPassword } from '../../value-objects/account/account-password';
import { v4 as uuidv4 } from 'uuid';
import { AccountRole } from '../../value-objects/account/account-role';

describe('AccountTest', () => {
  let account: Account;
  let requestAccount: Account;

  beforeAll(() => {
    const uuid = uuidv4();
    account = new Account(
      new Id(uuid),
      new AccountFirstName('firstName'),
      new AccountLastName('lastName'),
      new AccountEmail('mail@mail.com'),
      new AccountPassword('password'),
      new AccountRole('user'),
    );

    requestAccount = new Account(
      new Id(uuid),
      new AccountFirstName('firstName'),
      new AccountLastName('lastName'),
      new AccountEmail('mail@mail.com'),
      new AccountPassword('password'),
      new AccountRole('user'),
    );
  });

  test('should create Account instance', () => {
    expect(account).toBeInstanceOf(Account);
  });

  test('should throw error "firstName is null or undefined" when firstName is null', () => {
    // account.firstName =
    expect(account).toBeInstanceOf(Account);
  });

  describe('setFirstName', () => {
    let newFirstName: AccountFirstName;

    beforeAll(() => {
      newFirstName = new AccountFirstName('NewFirstName');
    });

    test('should change account firstName', () => {
      account.setFirstName(newFirstName, requestAccount);

      expect(account.getFirstName()).toEqual(newFirstName);
    });

    test(`should throw error "the user does not have access to edit the firstName" 
                when requestAccount id is not equal to account id`, () => {
      const _requestAccount = new Account(
        new Id(uuidv4()),
        new AccountFirstName('firstName'),
        new AccountLastName('lastName'),
        new AccountEmail('mail@mail.com'),
        new AccountPassword('password'),
        new AccountRole('user'),
      );

      expect(() => account.setFirstName(newFirstName, _requestAccount))
        .toThrowError('the user does not have access to edit the firstName');
    });

    test(`should throw error "requestAccount is null or undefined" when requestAccount is null`, () => {
      const requestAccount = null;

      expect(() => account.setFirstName(newFirstName, requestAccount))
        .toThrowError('requestAccount is null or undefined');
    });

    test(`should throw error "firstName is null or undefined" when firstName is null`, () => {
      const _newFirstName = null;

      expect(() => account.setFirstName(_newFirstName, requestAccount))
        .toThrowError('firstName is null or undefined');
    });

    test(`should update updateAt`, () => {
      const oldUpdateAt = account.updatedAt;

      account.setFirstName(newFirstName, requestAccount);

      expect(account.updatedAt.value.getTime()).toBeGreaterThan(oldUpdateAt.value.getTime());
    });
  });

  describe('setLastName', () => {
    let newLastName: AccountLastName;

    beforeAll(() => {
      newLastName = new AccountLastName('NewLastName');
    });

    test('should change account lastName', () => {
      account.setLastName(newLastName, requestAccount);

      expect(account.getLastName()).toEqual(newLastName);
    });

    test(`should throw error "the user does not have access to edit the lastName" 
                when requestAccount id is not equal to account id`, () => {
      const _requestAccount = new Account(
        new Id(uuidv4()),
        new AccountFirstName('firstName'),
        new AccountLastName('lastName'),
        new AccountEmail('mail@mail.com'),
        new AccountPassword('password'),
        new AccountRole('user'),
      );

      expect(() => account.setLastName(newLastName, _requestAccount))
        .toThrowError('the user does not have access to edit the lastName');
    });

    test(`should throw error "requestAccount is null or undefined" when requestAccount is null`, () => {
      const requestAccount = null;

      expect(() => account.setLastName(newLastName, requestAccount))
        .toThrowError('requestAccount is null or undefined');
    });

    test(`should throw error "lastName is null or undefined" when lastName is null`, () => {
      const _newLastName = null;

      expect(() => account.setLastName(_newLastName, requestAccount))
        .toThrowError('lastName is null or undefined');
    });

    test(`should update updateAt`, () => {
      const oldUpdateAt = account.updatedAt;

      account.setLastName(newLastName, requestAccount);

      expect(account.updatedAt.value.getTime()).toBeGreaterThan(oldUpdateAt.value.getTime());
    });
  });

  describe('setEmail', () => {
    let newEmail: AccountEmail;

    beforeAll(() => {
      newEmail = new AccountEmail('test@mail.com');
    });

    test('should change account email', () => {
      account.setEmail(newEmail, requestAccount);

      expect(account.getEmail()).toEqual(newEmail);
    });

    test(`should throw error "the user does not have access to edit the email" 
                when requestAccount id is not equal to account id`, () => {
      const _requestAccount = new Account(
        new Id(uuidv4()),
        new AccountFirstName('firstName'),
        new AccountLastName('lastName'),
        new AccountEmail('mail@mail.com'),
        new AccountPassword('password'),
        new AccountRole('user'),
      );

      expect(() => account.setEmail(newEmail, _requestAccount))
        .toThrowError('the user does not have access to edit the email');
    });

    test(`should throw error "requestAccount is null or undefined" when requestAccount is null`, () => {
      const requestAccount = null;

      expect(() => account.setEmail(newEmail, requestAccount))
        .toThrowError('requestAccount is null or undefined');
    });

    test(`should throw error "email is null or undefined" when email is null`, () => {
      const _newEmail = null;

      expect(() => account.setEmail(_newEmail, requestAccount))
        .toThrowError('email is null or undefined');
    });

    test(`should update updateAt`, () => {
      const oldUpdateAt = account.updatedAt;

      account.setEmail(newEmail, requestAccount);

      expect(account.updatedAt.value.getTime()).toBeGreaterThan(oldUpdateAt.value.getTime());
    });
  });

  describe('setPassword', () => {
    let newPassword: AccountPassword;

    beforeAll(() => {
      newPassword = new AccountPassword('password');
    });

    test('should change account password', () => {
      account.setPassword(newPassword, requestAccount);

      expect(account.getPassword()).toEqual(newPassword);
    });

    test(`should throw error "the user does not have access to edit the password" 
                when requestAccount id is not equal to account id`, () => {
      const _requestAccount = new Account(
        new Id(uuidv4()),
        new AccountFirstName('firstName'),
        new AccountLastName('lastName'),
        new AccountEmail('mail@mail.com'),
        new AccountPassword('password'),
        new AccountRole('user'),
      );

      expect(() => account.setPassword(newPassword, _requestAccount))
        .toThrowError('the user does not have access to edit the password');
    });

    test(`should throw error "requestAccount is null or undefined" when requestAccount is null`, () => {
      const requestAccount = null;

      expect(() => account.setPassword(newPassword, requestAccount))
        .toThrowError('requestAccount is null or undefined');
    });

    test(`should throw error "password is null or undefined" when password is null`, () => {
      const _newPassword = null;

      expect(() => account.setPassword(_newPassword, requestAccount))
        .toThrowError('password is null or undefined');
    });

    test(`should update updateAt`, () => {
      const oldUpdateAt = account.updatedAt;

      account.setPassword(newPassword, requestAccount);

      expect(account.updatedAt.value.getTime()).toBeGreaterThan(oldUpdateAt.value.getTime());
    });
  });

  describe('setPassword', () => {
    let newPassword: AccountPassword;

    beforeAll(() => {
      newPassword = new AccountPassword('password');
    });

    test('should change account password', () => {
      account.setPassword(newPassword, requestAccount);

      expect(account.getPassword()).toEqual(newPassword);
    });

    test(`should throw error "the user does not have access to edit the password" 
                when requestAccount id is not equal to account id`, () => {
      const _requestAccount = new Account(
        new Id(uuidv4()),
        new AccountFirstName('firstName'),
        new AccountLastName('lastName'),
        new AccountEmail('mail@mail.com'),
        new AccountPassword('password'),
        new AccountRole('user'),
      );

      expect(() => account.setPassword(newPassword, _requestAccount))
        .toThrowError('the user does not have access to edit the password');
    });

    test(`should throw error "requestAccount is null or undefined" when requestAccount is null`, () => {
      const requestAccount = null;

      expect(() => account.setPassword(newPassword, requestAccount))
        .toThrowError('requestAccount is null or undefined');
    });

    test(`should throw error "password is null or undefined" when password is null`, () => {
      const _newPassword = null;

      expect(() => account.setPassword(_newPassword, requestAccount))
        .toThrowError('password is null or undefined');
    });

    test(`should update updateAt`, () => {
      const oldUpdateAt = account.updatedAt;

      account.setPassword(newPassword, requestAccount);

      expect(account.updatedAt.value.getTime()).toBeGreaterThan(oldUpdateAt.value.getTime());
    });
  });
});
