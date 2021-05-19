import { IGenerateJwtTokenPort } from '../ports/out/auth/generate-jwt-token.port';
import { ISignInUseCase } from '../ports/in/sign-in/sign-in.use-case';
import { ISignInResult } from '../ports/in/sign-in/sign-in.result';
import { IGetAccountByEmailPort } from '../ports/out/persistence/get-account-by-email.port';
import { SignInCommand } from '../ports/in/sign-in/sign-in.command';
import { IComparePasswordsPort } from '../ports/out/encryptor/compare-passwords.port';

export class SignInService implements ISignInUseCase {
  constructor(private readonly getAccountByEmailPort: IGetAccountByEmailPort,
              private readonly generateJwtTokenPort: IGenerateJwtTokenPort,
              private readonly comparePasswordsPort: IComparePasswordsPort) {
  }

  async signIn(command: SignInCommand): Promise<ISignInResult> {
    const {email, password} = command;

    const account = await this.getAccountByEmailPort.getAccountByEmail(email.value);
    if (account === null) {
      throw Error('Account not found');
    }

    const areEqual = await this.comparePasswordsPort.compareHash(password, account.password);
    if (!areEqual) {
      throw Error('Invalid password');
    }

    const token = this.generateJwtTokenPort.generateJwtToken(account.id);
    return {token};
  }
}
