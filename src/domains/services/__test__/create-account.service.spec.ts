import { CreateAccountService } from '../create-account.service';
import {
  IAddAccountToDatabasePort,
} from '../../ports/out/database/add-account-to-database/add-account-to-database.port';
import { anything, instance, mock, when } from 'ts-mockito';
import { IHashPort } from '../../ports/out/encryptor/hash/hash.port';

describe('CreateAccountServiceTest', () => {
  let createAccountService: CreateAccountService;

  beforeAll(async () => {
    const mockedAddAccountToDatabasePort = mock<IAddAccountToDatabasePort>();
    when(mockedAddAccountToDatabasePort.addAccountToDatabase(anything())).thenResolve({id: 1});

    const mockedHashPort = mock<IHashPort>();
    when(mockedHashPort.hash(anything())).thenResolve({hash: ''});

    createAccountService = new CreateAccountService(
      instance(mockedAddAccountToDatabasePort),
      instance(mockedHashPort)
    );
  });

  it('should return id', async () => {
    const createAccountResult = await createAccountService.createAccount({
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@mail.com',
      password: 'passwd',
    });

    expect(createAccountResult.id).toBeTruthy();
  });
});
