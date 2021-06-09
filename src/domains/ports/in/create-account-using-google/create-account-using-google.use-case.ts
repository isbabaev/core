import { CreateAccountUsingGoogleCommand } from './create-account-using-google.command';
import { ICreateAccountUsingGoogleResult } from './create-account-using-google.result';

export const CreateAccountUsingGoogleUseCaseSymbol = Symbol('CreateAccountUsingGoogleUseCase');

export interface ICreateAccountUsingGoogleUseCase {
  createAccount(command: CreateAccountUsingGoogleCommand): Promise<ICreateAccountUsingGoogleResult>;
}
