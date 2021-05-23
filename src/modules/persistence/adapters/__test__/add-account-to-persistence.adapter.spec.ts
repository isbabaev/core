import { ClientProxy } from '@nestjs/microservices';
import { anyString, anything, instance, mock, verify, when } from 'ts-mockito';
import { Account } from '../../../../domains/entities/account';
import { AddAccountToPersistenceAdapter } from '../add-account-to-persistence.adapter';
import { of } from 'rxjs';

describe('AddAccountToPersistenceAdapterTest', () => {
  let addAccountToPersistenceAdapter: AddAccountToPersistenceAdapter;
  let clientProxy: ClientProxy;

  beforeAll(() => {
    clientProxy = mock(ClientProxy);
    addAccountToPersistenceAdapter = new AddAccountToPersistenceAdapter(instance(clientProxy));
  });

  test('should call send method of clientProxy', async () => {
    when(clientProxy.send(anyString(), anything())).thenReturn(of());
    const account = mock(Account);

    await addAccountToPersistenceAdapter.addAccountToPersistence(account);

    verify(clientProxy.send('create-account', account));
  });
});
