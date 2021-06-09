import {
  ILoadGoogleAccountInfoByCodePort,
} from '../../../domains/ports/out/googleapis/load-account-info-by-code/load-google-account-info-by-code.port';
import { ILoadGoogleAccountInfoByCodeResult } from '../../../domains/ports/out/googleapis/load-account-info-by-code/load-google-account-info-by-code.result';
import { GetTokenByCodeService } from '../services/get-token-by-code.service';
import { GetAccountInfoByTokenService } from '../services/get-account-info-by-token.service';
import { AccountFirstName } from '../../../domains/value-objects/account/account-first-name';
import { AccountLastName } from '../../../domains/value-objects/account/account-last-name';
import { AccountEmail } from '../../../domains/value-objects/account/account-email';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoadGoogleAccountInfoByCodeAdapter implements ILoadGoogleAccountInfoByCodePort {
  constructor(private readonly getTokenByCodeService: GetTokenByCodeService,
              private readonly getAccountInfoByTokenService: GetAccountInfoByTokenService) {
  }

  async loadAccountInfoByCode(code: string): Promise<ILoadGoogleAccountInfoByCodeResult> {
    const token = await this.getTokenByCodeService.getTokenByCode(code);
    const accountInfo = await this.getAccountInfoByTokenService.getAccountInfoByToken(token);

    return {
      firstName: new AccountFirstName(accountInfo.given_name),
      lastName: new AccountLastName(accountInfo.family_name),
      email: new AccountEmail(accountInfo.email),
    }
  }
}
