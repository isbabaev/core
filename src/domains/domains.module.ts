import { FactoryProvider, Module } from '@nestjs/common';
import { DatabaseModule } from '../modules/database/database.module';
import { CreateAccountUseCaseSymbol } from './ports/in/create-account.use-case';
import { CreateAccountService } from './services/create-account.service';
import { AddAccountToDatabasePort, AddAccountToDatabasePortSymbol } from './ports/out/add-account-to-database.port';
import { EncryptorModule } from '../modules/encryptor/encryptor.module';
import { HashPort, HashPortSymbol } from './ports/out/hash.port';
import { AuthModule } from '../modules/auth/auth.module';
import { SignInUseCaseSymbol } from './ports/in/sign-in.use-case';
import { SignInService } from './services/sign-in.service';
import {
  GetAccountByEmailPort,
  GetAccountByEmailAndPasswordPortSymbol,
} from './ports/out/get-account-by-email.port';
import { GenerateJwtTokenPort, GenerateJwtTokenPortSymbol } from './ports/out/generate-jwt-token.port';

const providers: FactoryProvider[] = [
  {
    provide: CreateAccountUseCaseSymbol,
    useFactory: (addAccountToDatabasePort: AddAccountToDatabasePort, hashPort: HashPort) => {
      return new CreateAccountService(addAccountToDatabasePort, hashPort);
    },
    inject: [AddAccountToDatabasePortSymbol, HashPortSymbol],
  },
  {
    provide: SignInUseCaseSymbol,
    useFactory: (getAccountByEmailAndPasswordPort: GetAccountByEmailPort,
                 generateJwtTokenPort: GenerateJwtTokenPort) => {
      return new SignInService(getAccountByEmailAndPasswordPort, generateJwtTokenPort);
    },
    inject: [
      GetAccountByEmailAndPasswordPortSymbol,
      GenerateJwtTokenPortSymbol
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
