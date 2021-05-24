import { CreateAccountService } from '../create-account.service';
import { anyString, anything, instance, mock, when } from 'ts-mockito';
import { IAddAccountToPersistencePort } from '../../ports/out/persistence/add-account-to-persistence.port';
import { v4 as uuidv4 } from 'uuid';
import { IGenerateUuidPort } from '../../ports/out/uuid/generate-uuid.port';
import { ILoadAccountByEmailPort } from '../../ports/out/persistence/load-account-by-email.port';
import { Id } from '../../value-objects/id';
import { Account } from '../../entities/account';
import { CreateAccountCommand } from '../../ports/in/create-account/create-account.command';
import { AccountFirstName } from '../../value-objects/account/account-first-name';
import { AccountLastName } from '../../value-objects/account/account-last-name';
import { AccountEmail } from '../../value-objects/account/account-email';
import { IHashPasswordPort } from '../../ports/out/encryptor/hash-password.port';

describe('CreateAccountServiceTest', () => {
  let createAccountService: CreateAccountService;
  let mockedLoadAccountByEmailPort: ILoadAccountByEmailPort;

  beforeAll(async () => {
    const mockedAddAccountToPersistencePort = mock<IAddAccountToPersistencePort>();

    const mockedHashPasswordPort = mock<IHashPasswordPort>();
    when(mockedHashPasswordPort.hash(anything())).thenResolve('ItIsHashedPassword');

    const generateUuidPort: IGenerateUuidPort = { generateUuid: uuidv4 };

    mockedLoadAccountByEmailPort = mock<ILoadAccountByEmailPort>();

    createAccountService = new CreateAccountService(
      instance(mockedAddAccountToPersistencePort),
      instance(mockedHashPasswordPort),
      generateUuidPort,
      instance(mockedLoadAccountByEmailPort),
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
    when(mockedLoadAccountByEmailPort.loadAccountByEmail(anything())).thenResolve(mock(Account));

    const createAccountCommand = new CreateAccountCommand(
      new AccountFirstName('Test'),
      new AccountLastName('Test'),
      new AccountEmail('test@mail.com'),
      'password',
    );

    await expect(createAccountService.createAccount(createAccountCommand))
      .rejects.toThrowError('Account already exists');
  });
});
