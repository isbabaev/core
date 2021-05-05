import { AccountEntity } from '../../entities/account.entity';

export const AddAccountToDatabasePortSymbol = Symbol('AddAccountToDatabasePort');

export interface AddAccountToDatabasePort {
  addAccountToDatabase(account: AccountEntity): Promise<AddAccountToDatabaseResult>;
}

export interface AddAccountToDatabaseResult {
  id: number;
}
