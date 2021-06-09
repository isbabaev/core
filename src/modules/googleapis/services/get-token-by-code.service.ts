import { Inject } from '@nestjs/common';
import { OAuth2ClientSymbol } from '../googleapis.module';
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client';

export class GetTokenByCodeService {
  constructor(@Inject(OAuth2ClientSymbol)
              private readonly oAuth2Client: OAuth2Client) {
  }

  async getTokenByCode(code: string): Promise<string> {
    const getTokenResponse = await this.oAuth2Client.getToken(code);
    return getTokenResponse.tokens.access_token;
  }
}
