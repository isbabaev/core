import { AccountEntity } from '../../../../entities/account.entity';
import { IAddAccountToDatabaseResult } from './add-account-to-database.result';

export const AddAccountToDatabasePortSymbol = Symbol('IAddAccountToDatabasePort');

export interface IAddAccountToDatabasePort {
  addAccountToDatabase(account: AccountEntity): Promise<IAddAccountToDatabaseResult>;
}
