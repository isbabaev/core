import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client';
import { TokenPayload } from 'google-auth-library/build/src/auth/loginticket';

@Injectable()
export class GetAccountInfoByTokenService {
  constructor(private readonly oAuth2Client: OAuth2Client) {
  }

  async getAccountInfoByToken(token: string): Promise<TokenPayload> {
    const loginTicket = await this.oAuth2Client.verifyIdToken({
      idToken: token,
    });
    return loginTicket.getPayload();
  }
}
