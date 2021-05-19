import { CreateAccountService } from '../create-account.service';
import { anyString, anything, instance, mock, when } from 'ts-mockito';
import { IHashPort } from '../../ports/out/encryptor/hash.port';
import { IAddAccountToPersistencePort } from '../../ports/out/persistence/add-account-to-persistence.port';
import { v4 as uuidv4 } from 'uuid';
import { IGenerateUuidPort } from '../../ports/out/uuid/generate-uuid.port';
import { IGetAccountByEmailPort } from '../../ports/out/persistence/get-account-by-email.port';
import { Id } from '../../value-objects/id';
import * as jwt from 'jsonwebtoken';
import { Account } from '../../entities/account';
import { CreateAccountCommand } from '../../ports/in/create-account/create-account.command';
import { AccountFirstName } from '../../value-objects/account/account-first-name';
import { AccountLastName } from '../../value-objects/account/account-last-name';
import { AccountEmail } from '../../value-objects/account/account-email';

describe('CreateAccountServiceTest', () => {
  let createAccountService: CreateAccountService;
  let mockedGetAccountByEmailPort: IGetAccountByEmailPort;

  beforeAll(async () => {
    const mockedAddAccountToPersistencePort = mock<IAddAccountToPersistencePort>();

    const hash = jwt.sign({}, 'secret');
    const mockedHashPort = mock<IHashPort>();
    when(mockedHashPort.hash(anything())).thenResolve(hash);

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
    const createAccountResult = await createAccountService.createAccount(
      new CreateAccountCommand(
        new AccountFirstName('Test'),
        new AccountLastName('Test'),
        new AccountEmail('test@mail.com'),
        'password',
      ),
    );

    expect(createAccountResult.id).toBeInstanceOf(Id);
  });

  it('should throw error when account exists in persistence', async () => {
    when(mockedGetAccountByEmailPort.getAccountByEmail(anyString())).thenResolve(mock(Account));

    const createAccountCommand = new CreateAccountCommand(
      new AccountFirstName('Test'),
      new AccountLastName('Test'),
      new AccountEmail('test@mail.com'),
      'password',
    );

    await expect(() => createAccountService.createAccount(createAccountCommand))
      .rejects.toThrowError('Account already exists');
  });
});
