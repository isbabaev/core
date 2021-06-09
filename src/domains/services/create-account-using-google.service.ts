import {
  ILoadGoogleAccountInfoByCodePort,
} from '../ports/out/googleapis/load-account-info-by-code/load-google-account-info-by-code.port';
import { ICreateAccountUsingGoogleUseCase } from '../ports/in/create-account-using-google/create-account-using-google.use-case';
import { CreateAccountUsingGoogleCommand } from '../ports/in/create-account-using-google/create-account-using-google.command';
import { ICreateAccountUsingOAuthUseCase } from '../ports/in/create-account-using-o-auth/create-account-using-oauth.use-case';
import { CreateAccountUsingOAuthCommand } from '../ports/in/create-account-using-o-auth/create-account-using-oauth.command';
import { ICreateAccountUsingGoogleResult } from '../ports/in/create-account-using-google/create-account-using-google.result';

export class CreateAccountUsingGoogleService implements ICreateAccountUsingGoogleUseCase {
  constructor(private readonly loadGoogleAccountInfoByCodePort: ILoadGoogleAccountInfoByCodePort,
              private readonly createAccountUsingOAuth: ICreateAccountUsingOAuthUseCase) {
  }

  async createAccount(command: CreateAccountUsingGoogleCommand): Promise<ICreateAccountUsingGoogleResult> {
    const accountInfo = await this.loadGoogleAccountInfoByCodePort.loadAccountInfoByCode(command.code);
    const {firstName, lastName, email} = accountInfo;

    return this.createAccountUsingOAuth.createAccountUsingOAuth(
      new CreateAccountUsingOAuthCommand(
        firstName,
        lastName,
        email,
      ),
    );
  }
}
