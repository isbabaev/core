import { Account } from '../../../entities/account';

export const GetAccountByEmailPortSymbol = Symbol('GetAccountByEmailPort');

export interface GetAccountByEmailPort {
  getAccountByEmail(email: string): Promise<Account | null>;
}
