export const SignInUseCaseSymbol = Symbol('SignInUseCase');

export interface SignInUseCase {
  signIn(email: string, password: string): Promise<string>;
}
