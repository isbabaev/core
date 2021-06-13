import { ClassProvider, Module } from '@nestjs/common';
import { GenerateAuthUrlService } from './services/generate-auth-url.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GenerateGoogleAuthUrlPortSymbol } from '../../domains/ports/out/googleapis/generate-google-auth-url.port';
import { GenerateGoogleAuthUrlAdapter } from './adapters/generate-google-auth-url.adapter';
import { google } from 'googleapis';
import { GetAccountInfoByTokenService } from './services/get-account-info-by-token.service';
import { GetTokenByCodeService } from './services/get-token-by-code.service';
import { LoadGoogleAccountInfoByCodePortSymbol } from '../../domains/ports/out/googleapis/load-account-info-by-code/load-google-account-info-by-code.port';
import { LoadGoogleAccountInfoByCodeAdapter } from './adapters/load-google-account-info-by-code.adapter';
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client';

const exportProviders: ClassProvider[] = [
  {
    provide: GenerateGoogleAuthUrlPortSymbol,
    useClass: GenerateGoogleAuthUrlAdapter,
  },
  {
    provide: LoadGoogleAccountInfoByCodePortSymbol,
    useClass: LoadGoogleAccountInfoByCodeAdapter,
  },
];

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  providers: [
    {
      provide: OAuth2Client,
      useFactory: (configService: ConfigService) => {
        const clientId = configService.get('GOOGLE_CLIENT_ID');
        const clientSecret = configService.get('GOOGLE_CLIENT_SECRET');
        const redirectUrl = configService.get('GOOGLE_REDIRECT_URL');

        return new google.auth.OAuth2(
          clientId,
          clientSecret,
          redirectUrl,
        );
      },
      inject: [
        ConfigService,
      ],
    },
    GenerateAuthUrlService,
    GetAccountInfoByTokenService,
    GetTokenByCodeService,
    ...exportProviders,
  ],
  exports: [
    ...exportProviders,
  ],
})
export class GoogleapisModule {
}
