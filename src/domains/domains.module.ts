import { FactoryProvider, Module } from '@nestjs/common';
import { DatabaseModule } from '../modules/database/database.module';
import { CreateAccountUseCaseSymbol } from './ports/in/create-account/create-account.use-case';
import { CreateAccountService } from './services/create-account.service';
import { IAddAccountToDatabasePort, AddAccountToDatabasePortSymbol } from './ports/out/persistence/add-account-to-persistence.port';
import { EncryptorModule } from '../modules/encryptor/encryptor.module';
import { IHashPort, HashPortSymbol } from './ports/out/encryptor/hash/hash.port';
import { AuthModule } from '../modules/auth/auth.module';
import { SignInService } from './services/sign-in.service';
import {
  GetAccountByEmailPort,
  GetAccountByEmailPortSymbol,
} from './ports/out/persistence/get-account-by-email.port';
import { IGenerateJwtTokenPort, GenerateJwtTokenPortSymbol } from './ports/out/auth/generate-jwt-token.port';
import { ICompareHashPort, ICompareHashPortSymbol } from './ports/out/encryptor/compare-hash.port';
import { SignInUseCaseSymbol } from './ports/in/sign-in/sign-in.use-case';

const providers: FactoryProvider[] = [
  {
    provide: CreateAccountUseCaseSymbol,
    useFactory: (addAccountToDatabasePort: IAddAccountToDatabasePort, hashPort: IHashPort) => {
      return new CreateAccountService(addAccountToDatabasePort, hashPort);
    },
    inject: [AddAccountToDatabasePortSymbol, HashPortSymbol],
  },
  {
    provide: SignInUseCaseSymbol,
    useFactory: (getAccountByEmailPort: GetAccountByEmailPort,
                 generateJwtTokenPort: IGenerateJwtTokenPort,
                 compareHashPort: ICompareHashPort) => {
      return new SignInService(getAccountByEmailPort, generateJwtTokenPort, compareHashPort);
    },
    inject: [
      GetAccountByEmailPortSymbol,
      GenerateJwtTokenPortSymbol,
      ICompareHashPortSymbol,
    ]
  }
]

@Module({
  imports: [
    DatabaseModule,
    EncryptorModule,
    AuthModule,
  ],
  providers,
  exports: [...providers]
})
export class DomainsModule {

}
