import { Account } from '../../../entities/account';

export const GetAccountByEmailPortSymbol = Symbol('IGetAccountByEmailPort');

export interface IGetAccountByEmailPort {
  getAccountByEmail(email: string): Promise<Account | null>;
}
