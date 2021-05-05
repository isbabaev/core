import { ICreateAccount, ICreateAccountResult } from '../../interfaces/account.interface';

export const AccountServiceSymbol = Symbol('IAccountService');

export interface IAccountService {
  create(createAccountData: ICreateAccount): Promise<ICreateAccountResult>;
}
