import { ISignInService } from '../definitions/sign-in.service';
import { GetAccountByEmailPort } from '../../ports/out/get-account-by-email.port';
import { GenerateJwtTokenPort } from '../../ports/out/generate-jwt-token.port';
import { ICompareHashPort } from '../../ports/out/compare-hash.port';

export class SignInService implements ISignInService {
  constructor(private readonly getAccountByEmailPort: GetAccountByEmailPort,
              private readonly generateJwtTokenPort: GenerateJwtTokenPort,
              private readonly compareHashPort: ICompareHashPort) {
  }

  async signIn(email: string, password: string): Promise<string> {
    const account = await this.getAccountByEmailPort.getAccountByEmail(email);

    if (account === null) {
      throw Error('account not found');
    }

    const areEqual = await this.compareHashPort.compareHash(password, account.password);

    if (!areEqual) {
      throw Error('invalid password');
    }

    return this.generateJwtTokenPort.generateJwtToken(account.email);
  }
}
