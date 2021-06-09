import { Inject, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client';
import { OAuth2ClientSymbol } from '../googleapis.module';

export class GenerateAuthUrlService {
  constructor(@Inject(OAuth2ClientSymbol)
              private readonly oAuth2Client: OAuth2Client) {
  }

  generateAuthUrl(): string {
    return this.oAuth2Client.generateAuthUrl({
      scope: 'email'
    });
  }
}
