import { AccountPassword } from '../../../value-objects/account/account-password';

export const IComparePasswordsSymbol = Symbol('IComparePasswordsPort');

export interface IComparePasswordsPort {
  compareHash(password: string, hashedPassword: AccountPassword): Promise<boolean>;
}
