import { ICreateAccountCommand } from './create-account.command';
import { ICreateAccountResult } from './create-account.result';

export const CreateAccountUseCaseSymbol = Symbol('ICreateAccountUseCase');

export interface ICreateAccountUseCase {
  createAccount(command: ICreateAccountCommand): Promise<ICreateAccountResult>;
}
