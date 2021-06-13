import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client';

@Injectable()
export class GetTokenByCodeService {
  constructor(private readonly oAuth2Client: OAuth2Client) {
  }

  async getTokenByCode(code: string): Promise<string> {
    const getTokenResponse = await this.oAuth2Client.getToken(code);
    return getTokenResponse.tokens.access_token;
  }
}
