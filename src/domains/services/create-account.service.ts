import { CreateAccountCommand, CreateAccountResult, CreateAccountUseCase } from '../ports/in/create-account.use-case';
import { AddAccountToDatabasePort } from '../ports/out/add-account-to-database.port';
import { AccountEntity } from '../entities/account.entity';
import { HashPort } from '../ports/out/hash.port';

export class CreateAccountService implements CreateAccountUseCase {
  constructor(private readonly addAccountToDatabasePort: AddAccountToDatabasePort,
              private readonly hashPort: HashPort) {
  }

  async createAccount(command: CreateAccountCommand): Promise<CreateAccountResult> {
    const {firstName, lastName, email, password} = command;

    const hashedPassword = await this.hashPort.hash(password);
    const account = await AccountEntity.create(firstName, lastName, email, hashedPassword);

    return this.addAccountToDatabasePort.addAccountToDatabase(account);
  }
}
