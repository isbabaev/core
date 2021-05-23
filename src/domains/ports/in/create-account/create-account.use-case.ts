import { CreateAccountCommand } from './create-account.command';
import { ICreateAccountResult } from './create-account.result';

export const CreateAccountUseCaseSymbol = Symbol('ICreateAccountUseCase');

export interface ICreateAccountUseCase {
  createAccount(command: CreateAccountCommand): Promise<ICreateAccountResult>;
}
