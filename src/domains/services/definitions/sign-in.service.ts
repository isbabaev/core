export const ISignInUseCaseSymbol = Symbol('ISignInService');

export interface ISignInService {
  signIn(email: string, password: string): Promise<string>;
}
