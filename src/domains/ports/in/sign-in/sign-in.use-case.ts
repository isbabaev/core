import { SignInCommand } from './sign-in.command';
import { ISignInResult } from './sign-in.result';

export const SignInUseCaseSymbol = Symbol('ISignInUseCase');

export interface ISignInUseCase {
  signIn(command: SignInCommand): Promise<ISignInResult>;
}
