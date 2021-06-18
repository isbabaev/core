import { Account } from '../../../domains/entities/account';
import { AccountPersistence } from '../entities/account-persistence';
import { Id } from '../../../domains/value-objects/id';
import { AccountFirstName } from '../../../domains/value-objects/account/account-first-name';
import { AccountLastName } from '../../../domains/value-objects/account/account-last-name';
import { AccountEmail } from '../../../domains/value-objects/account/account-email';
import { AccountPassword } from '../../../domains/value-objects/account/account-password';
import { AccountRole } from '../../../domains/value-objects/account/account-role';

export class AccountMapper {
  static mapToDomain(accountPersistence: AccountPersistence): Account {
    const { id, firstName, lastName, email, password, createdAt, updatedAt } = accountPersistence;
    return new Account(
      new Id(id),
      new AccountFirstName(firstName),
      new AccountLastName(lastName),
      new AccountEmail(email),
      new AccountPassword(password),
      new AccountRole('user')
    );
  }

  static mapToPersistence(account: Account): AccountPersistence {
    const { id, getFirstName, getLastName, getEmail, getPassword, createdAt, updatedAt } = account;
    return new AccountPersistence(
      id.value,
      getFirstName().value,
      getLastName().value,
      getEmail().value,
      getPassword().value,
      [],
      createdAt.value,
      updatedAt.value,
    );
  }
}
