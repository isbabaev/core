import { IAccount } from '../interfaces/account.interface';
import { AccountEntity } from '../../../domains/entities/account.entity';

export class AccountMapper {
  static async mapToDomain(account: IAccount): Promise<AccountEntity> {
    const { id, firstName, lastName, email, password, products, createdAt, updatedAt } = account;
    return AccountEntity.create(firstName, lastName, email, password, id, products, createdAt, updatedAt);
  }
}
