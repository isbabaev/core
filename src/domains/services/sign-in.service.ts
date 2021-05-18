import { GetAccountByEmailPort } from '../ports/out/persistence/get-account-by-email.port';
import { GenerateJwtTokenPort } from '../ports/out/auth/generate-jwt-token.port';
import { ICompareHashPort } from '../ports/out/encryptor/compare-hash.port';
import { ISignInUseCase } from '../ports/in/sign-in/sign-in.use-case';
import { ISignInCommand } from '../ports/in/sign-in/sign-in.command';
import { ISignInResult } from '../ports/in/sign-in/sign-in.result';

export class SignInService implements ISignInUseCase {
  constructor(private readonly getAccountByEmailPort: GetAccountByEmailPort,
              private readonly generateJwtTokenPort: GenerateJwtTokenPort,
              private readonly compareHashPort: ICompareHashPort) {
  }

  async signIn(command: ISignInCommand): Promise<ISignInResult> {
    const {email, password} = command;
    const account = await this.getAccountByEmailPort.getAccountByEmail(email);
    if (account === null) {
      throw Error('account not found');
    }

    const areEqual = await this.compareHashPort.compareHash(password, account.password);
    if (!areEqual) {
      throw Error('invalid password');
    }

    const token = await this.generateJwtTokenPort.generateJwtToken(account.email);
    return {token};
  }
}
