import { Account } from '../../../domains/entities/account';
import { AccountPersistence } from '../entities/account-persistence';
import { Id } from '../../../domains/value-objects/id';
import { AccountFirstName } from '../../../domains/value-objects/account/account-first-name';
import { AccountLastName } from '../../../domains/value-objects/account/account-last-name';
import { AccountEmail } from '../../../domains/value-objects/account/account-email';
import { AccountPassword } from '../../../domains/value-objects/account/account-password';
import { CreatedAt } from '../../../domains/value-objects/created-at';
import { UpdatedAt } from '../../../domains/value-objects/updated-at';

export class AccountMapper {
  static mapToDomain(account: AccountPersistence): Account {
    const { id, firstName, lastName, email, password, createdAt, updatedAt } = account;
    return new Account(
      new Id(id),
      new AccountFirstName(firstName),
      new AccountLastName(lastName),
      new AccountEmail(email),
      new AccountPassword(password),
      new CreatedAt(createdAt),
      new UpdatedAt(updatedAt)
    );
  }
}
