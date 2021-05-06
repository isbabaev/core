import { FactoryProvider, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { IAuthService, IAuthServiceSymbol } from './services/definitions/auth.service';
import { GetAccountByEmailAndPasswordPortSymbol } from '../../domains/ports/out/get-account-by-email.port';
import { GenerateJwtTokenAdapter } from './adapters/generate-jwt-token.adapter';
import { AuthService } from './services/implementations/auth.service';
require('dotenv').config();

const exportProviders: FactoryProvider[] = [
  {
    provide: GetAccountByEmailAndPasswordPortSymbol,
    useFactory: (authService: IAuthService) => {
      return new GenerateJwtTokenAdapter(authService);
    },
    inject: [IAuthServiceSymbol],
  }
];

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    {
      provide: IAuthServiceSymbol,
      useClass: AuthService,
    },
    ...exportProviders
  ],
  exports: [
    ...exportProviders
  ]
})
export class AuthModule {

}
