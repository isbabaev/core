import { IGenerateJwtTokenPort } from '../ports/out/auth/generate-jwt-token.port';
import { ICompareHashPort } from '../ports/out/encryptor/compare-hash.port';
import { ISignInUseCase } from '../ports/in/sign-in/sign-in.use-case';
import { ISignInResult } from '../ports/in/sign-in/sign-in.result';
import { IGetAccountByEmailPort } from '../ports/out/persistence/get-account-by-email.port';
import { SignInCommand } from '../ports/in/sign-in/sign-in.command';

export class SignInService implements ISignInUseCase {
  constructor(private readonly getAccountByEmailPort: IGetAccountByEmailPort,
              private readonly generateJwtTokenPort: IGenerateJwtTokenPort,
              private readonly compareHashPort: ICompareHashPort) {
  }

  async signIn(command: SignInCommand): Promise<ISignInResult> {
    const {email, password} = command;

    const account = await this.getAccountByEmailPort.getAccountByEmail(email.value);
    if (account === null) {
      throw Error('Account not found');
    }

    const areEqual = await this.compareHashPort.compareHash(password.value, account.password.value);
    if (!areEqual) {
      throw Error('Invalid password');
    }

    const token = this.generateJwtTokenPort.generateJwtToken(account.id.value);
    return {token};
  }
}
