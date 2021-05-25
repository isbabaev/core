import { FactoryProvider, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { IAuthService, IAuthServiceSymbol } from './services/definitions/auth.service';
import { GenerateJwtTokenAdapter } from './adapters/generate-jwt-token.adapter';
import { AuthService } from './services/implementations/auth.service';
import { GenerateJwtTokenPortSymbol } from '../../domains/ports/out/auth/generate-jwt-token.port';
import { ConfigModule, ConfigService } from '@nestjs/config';

const exportProviders: FactoryProvider[] = [
  {
    provide: GenerateJwtTokenPortSymbol,
    useFactory: (authService: IAuthService) => {
      return new GenerateJwtTokenAdapter(authService);
    },
    inject: [IAuthServiceSymbol],
  },
];

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: IAuthServiceSymbol,
      useClass: AuthService,
    },
    ...exportProviders,
  ],
  exports: [
    ...exportProviders,
  ],
})
export class AuthModule {
}
