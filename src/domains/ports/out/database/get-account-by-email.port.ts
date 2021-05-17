import { AccountEntity } from '../../../entities/account.entity';

export const GetAccountByEmailPortSymbol = Symbol('GetAccountByEmailPort');

export interface GetAccountByEmailPort {
  getAccountByEmail(email: string): Promise<AccountEntity | null>;
}
