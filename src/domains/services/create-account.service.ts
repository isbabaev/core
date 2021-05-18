import { IAddAccountToDatabasePort } from '../ports/out/database/add-account-to-database/add-account-to-database.port';
import { Account } from '../entities/account';
import { IHashPort } from '../ports/out/encryptor/hash/hash.port';
import { ICreateAccountUseCase } from '../ports/in/create-account/create-account.use-case';
import { ICreateAccountResult } from '../ports/in/create-account/create-account.result';
import { ICreateAccountCommand } from '../ports/in/create-account/create-account.command';

export class CreateAccountService implements ICreateAccountUseCase {
  constructor(private readonly addAccountToDatabasePort: IAddAccountToDatabasePort,
              private readonly hashPort: IHashPort) {
  }

  async createAccount(command: ICreateAccountCommand): Promise<ICreateAccountResult> {
    const {firstName, lastName, email, password} = command;

    // TODO проверка на наличие емейла в бд

    const { hash: hashedPassword } = await this.hashPort.hash(password);
    const account = await Account.create(firstName, lastName, email, hashedPassword);

    return this.addAccountToDatabasePort.addAccountToDatabase(account);
  }
}
