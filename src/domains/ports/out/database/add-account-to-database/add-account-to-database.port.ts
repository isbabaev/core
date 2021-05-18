import { Account } from '../../../../entities/account';
import { IAddAccountToDatabaseResult } from './add-account-to-database.result';

export const AddAccountToDatabasePortSymbol = Symbol('IAddAccountToDatabasePort');

export interface IAddAccountToDatabasePort {
  addAccountToDatabase(account: Account): Promise<IAddAccountToDatabaseResult>;
}
