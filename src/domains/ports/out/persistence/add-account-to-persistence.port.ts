import { Account } from '../../../entities/account';

export const AddAccountToPersistencePortSymbol = Symbol('IAddAccountToPersistencePort');

export interface IAddAccountToPersistencePort {
  addAccountToPersistence(account: Account): Promise<void>;
}
