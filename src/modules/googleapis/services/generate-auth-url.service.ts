import {google} from 'googleapis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GenerateAuthUrlService {
  constructor(private readonly configService: ConfigService) {
  }

  generateAuthUrl(): string {
    const clientId = this.configService.get('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');
    const redirectUrl = this.configService.get('GOOGLE_REDIRECT_URL');

    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUrl
    );

    return oauth2Client.generateAuthUrl();
  }
}
