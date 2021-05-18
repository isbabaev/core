import { CreateAccountService } from '../create-account.service';
import { anyString, anything, instance, mock, when } from 'ts-mockito';
import { IHashPort } from '../../ports/out/encryptor/hash/hash.port';
import { IAddAccountToPersistencePort } from '../../ports/out/persistence/add-account-to-persistence.port';
import { v4 as uuidv4 } from 'uuid';
import { IGenerateUuidPort } from '../../ports/out/uuid/generate-uuid.port';
import { IGetAccountByEmailPort } from '../../ports/out/persistence/get-account-by-email.port';
import { Id } from '../../value-objects/id';
import * as jwt from 'jsonwebtoken';
import { Account } from '../../entities/account';
import { ICreateAccountCommand } from '../../ports/in/create-account/create-account.command';

describe('CreateAccountServiceTest', () => {
  let createAccountService: CreateAccountService;
  let mockedGetAccountByEmailPort: IGetAccountByEmailPort;

  beforeAll(async () => {
    const mockedAddAccountToPersistencePort = mock<IAddAccountToPersistencePort>();

    const hash = jwt.sign({}, 'secret');
    const mockedHashPort = mock<IHashPort>();
    when(mockedHashPort.hash(anything())).thenResolve({ hash });

    const generateUuidPort: IGenerateUuidPort = { uuidv4 };

    mockedGetAccountByEmailPort = mock<IGetAccountByEmailPort>();

    createAccountService = new CreateAccountService(
      instance(mockedAddAccountToPersistencePort),
      instance(mockedHashPort),
      generateUuidPort,
      instance(mockedGetAccountByEmailPort),
    );
  });

  it('should return id', async () => {
    const createAccountResult = await createAccountService.createAccount({
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@mail.com',
      password: 'password',
    });

    expect(createAccountResult.id).toBeInstanceOf(Id);
  });

  it('should throw error when account exists in persistence', async () => {
    when(mockedGetAccountByEmailPort.getAccountByEmail(anyString())).thenResolve(mock(Account));

    const createAccountCommand: ICreateAccountCommand = {
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@mail.com',
      password: 'password',
    };

    await expect( () => createAccountService.createAccount(createAccountCommand))
      .rejects.toThrowError('Account already exists');
  });
});
