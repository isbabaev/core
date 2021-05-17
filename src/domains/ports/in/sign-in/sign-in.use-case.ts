import { ISignInCommand } from './sign-in.command';
import { ISignInResult } from './sign-in.result';

export const SignInUseCaseSymbol = Symbol('ISignInUseCase');

export interface ISignInUseCase {
  signIn(command: ISignInCommand): Promise<ISignInResult>;
}
