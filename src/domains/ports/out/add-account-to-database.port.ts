import { AccountEntity } from '../../entities/account.entity';

export interface AddAccountToDatabasePort {
  addAccountToDatabase(account: AccountEntity): Promise<AddAccountToDatabaseResult>;
}

export interface AddAccountToDatabaseResult {
  id: number;
}
