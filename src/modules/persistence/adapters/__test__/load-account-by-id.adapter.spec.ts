import { ClientProxy } from '@nestjs/microservices';
import { anyString, anything, capture, instance, mock, when } from 'ts-mockito';
import { AccountPersistence } from '../../entities/account-persistence';
import { of } from 'rxjs';
import { Account } from '../../../../domains/entities/account';
import { Id } from '../../../../domains/value-objects/id';
import { LoadAccountByIdAdapter } from '../load-account-by-id.adapter';

describe('LoadAccountByIdAdapterTest', () => {
  let loadAccountByIdAdapter: LoadAccountByIdAdapter;
  let clientProxy: ClientProxy;
  let mockedAccountPersistence: AccountPersistence;
  let mockedId: Id;

  beforeAll(() => {
    clientProxy = mock(ClientProxy);
    loadAccountByIdAdapter = new LoadAccountByIdAdapter(instance(clientProxy));

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
    mockedId = new Id('9e3fdf13-e10a-4914-8d2a-e93789c3bab3');
  });

  test('should call method send of clientProxy', async () => {
    when(clientProxy.send(anyString(), anything())).thenReturn(of(mockedAccountPersistence));

    await loadAccountByIdAdapter.loadAccountById(mockedId);

    const sendArguments = capture(clientProxy.send).first();
    expect(sendArguments[0]).toBe('load-account-by-id');
    expect(sendArguments[1]).toEqual({id: mockedId.value});
  });

  test('account should be instance of Account', async () => {
    when(clientProxy.send(anyString(), anything())).thenReturn(of(mockedAccountPersistence));

    const account = await loadAccountByIdAdapter.loadAccountById(mockedId);

    expect(account).toBeInstanceOf(Account);
  });

  test('mockedAccountPersistence and account should have same values', async () => {
    when(clientProxy.send(anyString(), anything())).thenReturn(of(mockedAccountPersistence));

    const account = await loadAccountByIdAdapter.loadAccountById(mockedId);

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

    const account = await loadAccountByIdAdapter.loadAccountById(mockedId);

    expect(account).toBeNull();
  });
});
