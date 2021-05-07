import { FactoryProvider, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { IAuthService, IAuthServiceSymbol } from './services/definitions/auth.service';
import { GenerateJwtTokenAdapter } from './adapters/generate-jwt-token.adapter';
import { AuthService } from './services/implementations/auth.service';
import { GenerateJwtTokenPortSymbol } from '../../domains/ports/out/generate-jwt-token.port';
require('dotenv').config();

const exportProviders: FactoryProvider[] = [
  {
    provide: GenerateJwtTokenPortSymbol,
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
