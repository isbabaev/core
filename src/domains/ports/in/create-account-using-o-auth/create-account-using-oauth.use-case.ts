import { CreateAccountUsingOAuthCommand } from './create-account-using-oauth.command';
import { ICreateAccountUsingOAuthResult } from './create-account-using-oauth.result';

export const CreateAccountUsingOAuthUseCaseSymbol = Symbol('CreateAccountUsingGoogleUseCase');

export interface ICreateAccountUsingOAuthUseCase {
  createAccountUsingOAuth(command: CreateAccountUsingOAuthCommand): Promise<ICreateAccountUsingOAuthResult>;
}
