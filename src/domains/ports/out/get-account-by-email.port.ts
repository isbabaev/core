import { AccountEntity } from '../../entities/account.entity';

export const GetAccountByEmailAndPasswordPortSymbol = Symbol('GetAccountByEmailPort');

export interface GetAccountByEmailPort {
  getAccountByEmail(email: string): Promise<AccountEntity | null>;
}
