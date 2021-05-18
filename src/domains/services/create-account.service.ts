import {
  IAddAccountToPersistencePort,
} from '../ports/out/persistence/add-account-to-persistence.port';
import { Account } from '../entities/account';
import { IHashPort } from '../ports/out/encryptor/hash/hash.port';
import { ICreateAccountUseCase } from '../ports/in/create-account/create-account.use-case';
import { ICreateAccountResult } from '../ports/in/create-account/create-account.result';
import { ICreateAccountCommand } from '../ports/in/create-account/create-account.command';
import { IGenerateUuidPort } from '../ports/out/uuid/generate-uuid.port';
import { Id } from '../value-objects/id';
import { AccountFirstName } from '../value-objects/account/account-first-name';
import { AccountLastName } from '../value-objects/account/account-last-name';
import { AccountEmail } from '../value-objects/account/account-email';
import { AccountPassword } from '../value-objects/account/account-password';
import { CreatedAt } from '../value-objects/created-at';
import { UpdatedAt } from '../value-objects/updated-at';
import { IGetAccountByEmailPort } from '../ports/out/persistence/get-account-by-email.port';

export class CreateAccountService implements ICreateAccountUseCase {
  constructor(private readonly addAccountToPersistencePort: IAddAccountToPersistencePort,
              private readonly hashPort: IHashPort,
              private readonly generateUuidPort: IGenerateUuidPort,
              private readonly getAccountByEmail: IGetAccountByEmailPort) {
  }

  async createAccount(command: ICreateAccountCommand): Promise<ICreateAccountResult> {
    const { firstName, lastName, email, password } = command;

    const account = await this.getAccountByEmail.getAccountByEmail(email);
    if (account !== null) {
      throw Error('Account already exists');
    }

    const idString = this.generateUuidPort.uuidv4();
    const id = new Id(idString);

    const { hash: hashedPassword } = await this.hashPort.hash(password);
    const newAccount = new Account(
      id,
      new AccountFirstName(firstName),
      new AccountLastName(lastName),
      new AccountEmail(email),
      new AccountPassword(hashedPassword),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
    );

    await this.addAccountToPersistencePort.addAccountToPersistence(newAccount);

    return {id};
  }
}
