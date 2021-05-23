import { Account } from '../../../entities/account';
import { AccountEmail } from '../../../value-objects/account/account-email';

export const LoadAccountByEmailPortSymbol = Symbol('LoadAccountByEmailPort');

export interface ILoadAccountByEmailPort {
  loadAccountByEmail(email: AccountEmail): Promise<Account | null>;
}
