import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client';

@Injectable()
export class GenerateAuthUrlService {
  constructor(private readonly oAuth2Client: OAuth2Client) {
  }

  generateAuthUrl(): string {
    return this.oAuth2Client.generateAuthUrl({
      scope: 'email',
      access_type: 'offline',
    });
  }
}
