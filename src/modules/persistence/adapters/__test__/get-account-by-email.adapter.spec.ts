import { GetAccountByEmailAdapter } from '../get-account-by-email.adapter';
import { ClientProxy } from '@nestjs/microservices';
import { anyString, anything, capture, instance, mock, verify, when } from 'ts-mockito';
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

  test('should return account', async () => {
    when(clientProxy.send(anyString(), anything())).thenReturn(of(mockedAccountPersistence));

    const account = await getAccountByEmailAdapter.getAccountByEmail('');

    expect(account).toEqual(mockedAccountPersistence);
    expect(account).toBeInstanceOf(Account);
  });

  // TODO should return null
});
