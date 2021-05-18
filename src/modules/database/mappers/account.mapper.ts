import { IAccount } from '../interfaces/account.interface';
import { Account } from '../../../domains/entities/account';

export class AccountMapper {
  static async mapToDomain(account: IAccount): Promise<Account> {
    const { id, firstName, lastName, email, password, products, createdAt, updatedAt } = account;
    return Account.create(firstName, lastName, email, password, id, products, createdAt, updatedAt);
  }
}
