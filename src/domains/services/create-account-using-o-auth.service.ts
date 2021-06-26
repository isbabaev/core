import { ICreateAccountUsingOAuthUseCase } from '../ports/in/create-account-using-o-auth/create-account-using-oauth.use-case';
import { ICreateAccountUsingOAuthResult } from '../ports/in/create-account-using-o-auth/create-account-using-oauth.result';
import { CreateAccountUsingOAuthCommand } from '../ports/in/create-account-using-o-auth/create-account-using-oauth.command';
import { ILoadAccountByEmailPort } from '../ports/out/persistence/load-account-by-email.port';
import { Id } from '../value-objects/id';
import { IGenerateUuidPort } from '../ports/out/uuid/generate-uuid.port';
import { Account } from '../entities/account';
import { AccountPassword } from '../value-objects/account/account-password';
import { CreatedAt } from '../value-objects/created-at';
import { UpdatedAt } from '../value-objects/updated-at';
import { IAddAccountToPersistencePort } from '../ports/out/persistence/add-account-to-persistence.port';

export class CreateAccountUsingOAuthService implements ICreateAccountUsingOAuthUseCase {
  constructor(private readonly loadAccountByEmail: ILoadAccountByEmailPort,
              private readonly generateUuidPort: IGenerateUuidPort,
              private readonly addAccountToPersistencePort: IAddAccountToPersistencePort) {
  }

  async createAccountUsingOAuth(command: CreateAccountUsingOAuthCommand): Promise<ICreateAccountUsingOAuthResult> {
    const { firstName, lastName, email } = command;

    const account = await this.loadAccountByEmail.loadAccountByEmail(email);
    if (account !== null) {
      return { id: account.id };
    }

    const idString = this.generateUuidPort.generateUuid();
    const id = new Id(idString);

    const newAccount = new Account(
      id,
      firstName,
      lastName,
      email,
      new AccountPassword(null),
      null
    );

    await this.addAccountToPersistencePort.addAccountToPersistence(newAccount);

    return {id};
  }
}
