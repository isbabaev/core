import { Account } from '../../../domains/entities/account';
import { Id } from '../../../domains/value-objects/id';
import { AccountFirstName } from '../../../domains/value-objects/account/account-first-name';
import { AccountLastName } from '../../../domains/value-objects/account/account-last-name';
import { AccountEmail } from '../../../domains/value-objects/account/account-email';
import { AccountPassword } from '../../../domains/value-objects/account/account-password';
import { AccountRole } from '../../../domains/value-objects/account/account-role';
import { AccountEntity } from '../entities/account.entity';

export class AccountMapper {
  static mapToDomain(accountPersistence: AccountEntity): Account {
    if (accountPersistence === undefined) {
      return null;
    }

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

  static mapToPersistence(account: Account): AccountEntity {
    const { id, createdAt, updatedAt } = account;
    return new AccountEntity(
      id.value,
      account.getFirstName().value,
      account.getLastName().value,
      account.getEmail().value,
      account.getPassword().value,
      createdAt.value,
      updatedAt.value,
    );
  }
}
