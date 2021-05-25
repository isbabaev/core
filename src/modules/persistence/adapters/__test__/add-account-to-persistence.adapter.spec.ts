import { ClientProxy } from '@nestjs/microservices';
import { anyString, anything, capture, instance, mock, verify, when } from 'ts-mockito';
import { Account } from '../../../../domains/entities/account';
import { AddAccountToPersistenceAdapter } from '../add-account-to-persistence.adapter';
import { of } from 'rxjs';
import { AccountPersistence } from '../../entities/account-persistence';
import { Id } from '../../../../domains/value-objects/id';
import { AccountFirstName } from '../../../../domains/value-objects/account/account-first-name';
import { AccountLastName } from '../../../../domains/value-objects/account/account-last-name';
import { AccountEmail } from '../../../../domains/value-objects/account/account-email';
import { AccountPassword } from '../../../../domains/value-objects/account/account-password';
import { CreatedAt } from '../../../../domains/value-objects/created-at';
import { UpdatedAt } from '../../../../domains/value-objects/updated-at';

describe('AddAccountToPersistenceAdapterTest', () => {
  let addAccountToPersistenceAdapter: AddAccountToPersistenceAdapter;
  let clientProxy: ClientProxy;

  beforeAll(() => {
    clientProxy = mock(ClientProxy);
    addAccountToPersistenceAdapter = new AddAccountToPersistenceAdapter(instance(clientProxy));
  });

  test('should call send method of clientProxy', async () => {
    when(clientProxy.send(anyString(), anything())).thenReturn(of());
    const account = new Account(
      new Id('9e3fdf13-e10a-4914-8d2a-e93789c3bab3'),
      new AccountFirstName('firstName'),
      new AccountLastName('lastName'),
      new AccountEmail('mail@mail.com'),
      new AccountPassword('password'),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
    );

    await addAccountToPersistenceAdapter.addAccountToPersistence(account);

    const createAccountArguments = capture(clientProxy.send).first();
    const createAccountFirstArgument = createAccountArguments[0];
    const createAccountSecondArgument = createAccountArguments[1] as AccountPersistence;
    expect(createAccountFirstArgument).toBe('create-account');
    expect(createAccountSecondArgument.id).toBe(account.id.value);
    expect(createAccountSecondArgument.firstName).toBe(account.firstName.value);
    expect(createAccountSecondArgument.lastName).toBe(account.lastName.value);
    expect(createAccountSecondArgument.email).toBe(account.email.value);
    expect(createAccountSecondArgument.password).toBe(account.password.value);
    expect(createAccountSecondArgument.createdAt).toBe(account.createdAt.value);
    expect(createAccountSecondArgument.updatedAt).toBe(account.updatedAt.value);
  });
});
