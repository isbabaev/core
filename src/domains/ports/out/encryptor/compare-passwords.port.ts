import { AccountPassword } from '../../../value-objects/account/account-password';

export const ComparePasswordsSymbol = Symbol('IComparePasswordsPort');

export interface IComparePasswordsPort {
  // TODO думаю тут string не должен быть, надо добавить какой-нибудь тип пароля
  comparePasswords(password: string, hashedPassword: AccountPassword): Promise<boolean>;
}
