import {
  IAddAccountToPersistencePort,
} from '../ports/out/persistence/add-account-to-persistence.port';
import { Account } from '../entities/account';
import { ICreateAccountUseCase } from '../ports/in/create-account/create-account.use-case';
import { ICreateAccountResult } from '../ports/in/create-account/create-account.result';
import { CreateAccountCommand } from '../ports/in/create-account/create-account.command';
import { IGenerateUuidPort } from '../ports/out/uuid/generate-uuid.port';
import { Id } from '../value-objects/id';
import { AccountFirstName } from '../value-objects/account/account-first-name';
import { AccountLastName } from '../value-objects/account/account-last-name';
import { AccountEmail } from '../value-objects/account/account-email';
import { AccountPassword } from '../value-objects/account/account-password';
import { CreatedAt } from '../value-objects/created-at';
import { UpdatedAt } from '../value-objects/updated-at';
import { ILoadAccountByEmailPort } from '../ports/out/persistence/load-account-by-email.port';
import { IHashPasswordPort } from '../ports/out/encryptor/hash-password.port';

export class CreateAccountService implements ICreateAccountUseCase {
  constructor(private readonly addAccountToPersistencePort: IAddAccountToPersistencePort,
              private readonly hashPasswordPort: IHashPasswordPort,
              private readonly generateUuidPort: IGenerateUuidPort,
              private readonly loadAccountByEmail: ILoadAccountByEmailPort) {
  }

  async createAccount(command: CreateAccountCommand): Promise<ICreateAccountResult> {
    const { firstName, lastName, email, password } = command;

    const account = await this.loadAccountByEmail.loadAccountByEmail(email);
    if (account !== null) {
      throw Error('Account already exists');
    }

    const idString = this.generateUuidPort.generateUuid();
    const id = new Id(idString);

    const hashedPassword = await this.hashPasswordPort.hash(password);
    const newAccount = new Account(
      id,
      new AccountFirstName(firstName.value), // TODO зачем заново создавать объект?
      new AccountLastName(lastName.value),
      new AccountEmail(email.value),
      new AccountPassword(hashedPassword),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
    );

    await this.addAccountToPersistencePort.addAccountToPersistence(newAccount);

    return {id};
  }
}
