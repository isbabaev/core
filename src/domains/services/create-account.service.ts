import { CreateAccountCommand, CreateAccountResult, CreateAccountUseCase } from '../ports/in/create-account.use-case';
import { AddAccountToDatabasePort } from '../ports/out/add-account-to-database.port';
import { AccountEntity } from '../entities/account.entity';

export class CreateAccountService implements CreateAccountUseCase {
  constructor(private readonly addAccountToDatabasePort: AddAccountToDatabasePort) {
  }

  async createAccount(command: CreateAccountCommand): Promise<CreateAccountResult> {
    const {firstName, lastName, email, password} = command;

    const account = await AccountEntity.create(firstName, lastName, email, password);

    return this.addAccountToDatabasePort.addAccountToDatabase(account);
  }
}
