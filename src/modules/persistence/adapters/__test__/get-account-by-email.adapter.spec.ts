import { GetAccountByEmailAdapter } from '../get-account-by-email.adapter';
import { ClientProxy } from '@nestjs/microservices';
import { anyString, anything, capture, instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs';
import { AccountPersistence } from '../../entities/account-persistence';
import { Account } from '../../../../domains/entities/account';

describe('GetAccountByEmailAdapterTest', () => {
  let getAccountByEmailAdapter: GetAccountByEmailAdapter;
  let clientProxy: ClientProxy;
  let mockedAccountPersistence: AccountPersistence;

  beforeAll(() => {
    mockedAccountPersistence = new AccountPersistence(
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

  beforeEach(() => {
    clientProxy = mock(ClientProxy);
    getAccountByEmailAdapter = new GetAccountByEmailAdapter(instance(clientProxy));
  });

  test('should call method send of clientProxy', async () => {
    when(clientProxy.send(anyString(), anything())).thenReturn(of(mockedAccountPersistence));
    const email = 'test@mail.com';

    await getAccountByEmailAdapter.getAccountByEmail(email);

    const sendArguments = capture(clientProxy.send).first();
    expect(sendArguments[0]).toBe('load-account-by-email');
    expect(sendArguments[1]).toEqual({email});
  });

  test('account should be instance of Account', async () => {
    when(clientProxy.send(anyString(), anything())).thenReturn(of(mockedAccountPersistence));

    const account = await getAccountByEmailAdapter.getAccountByEmail('');

    expect(account).toBeInstanceOf(Account);
  });

  test('mockedAccountPersistence and account should have same values', async () => {
    when(clientProxy.send(anyString(), anything())).thenReturn(of(mockedAccountPersistence));

    const account = await getAccountByEmailAdapter.getAccountByEmail('');

    expect(account.id.value).toBe(mockedAccountPersistence.id);
    expect(account.firstName.value).toBe(mockedAccountPersistence.firstName);
    expect(account.lastName.value).toBe(mockedAccountPersistence.lastName);
    expect(account.email.value).toBe(mockedAccountPersistence.email);
    expect(account.password.value).toBe(mockedAccountPersistence.password);
    expect(account.createdAt.value).toBe(mockedAccountPersistence.createdAt);
    expect(account.updatedAt.value).toBe(mockedAccountPersistence.updatedAt);
  });

  test('should return null when method send of clientProxy returns null', async () => {
    when(clientProxy.send(anyString(), anything())).thenReturn(of(null));

    const account = await getAccountByEmailAdapter.getAccountByEmail('');

    expect(account).toBeNull();
  });
});
