import { FactoryProvider, Module } from '@nestjs/common';
import { PersistenceModule } from '../modules/persistence/persistence.module';
import { CreateAccountUseCaseSymbol } from './ports/in/create-account/create-account.use-case';
import { CreateAccountService } from './services/create-account.service';
import { EncryptorModule } from '../modules/encryptor/encryptor.module';
import { AuthModule } from '../modules/auth/auth.module';
import { SignInService } from './services/sign-in.service';
import {
  GetAccountByEmailPortSymbol, IGetAccountByEmailPort,
} from './ports/out/persistence/get-account-by-email.port';
import { IGenerateJwtTokenPort, GenerateJwtTokenPortSymbol } from './ports/out/auth/generate-jwt-token.port';
import { SignInUseCaseSymbol } from './ports/in/sign-in/sign-in.use-case';
import {
  AddAccountToPersistencePortSymbol,
  IAddAccountToPersistencePort,
} from './ports/out/persistence/add-account-to-persistence.port';
import { HashPasswordPortSymbol, IHashPasswordPort } from './ports/out/encryptor/hash-password.port';
import { GenerateUuidPortSymbol, IGenerateUuidPort } from './ports/out/uuid/generate-uuid.port';
import { IComparePasswordsPort, IComparePasswordsSymbol } from './ports/out/encryptor/compare-passwords.port';

const providers: FactoryProvider[] = [
  {
    provide: CreateAccountUseCaseSymbol,
    useFactory: (addAccountToPersistencePort: IAddAccountToPersistencePort,
                 hashPasswordPort: IHashPasswordPort,
                 generateUuidPort: IGenerateUuidPort,
                 getAccountByEmail: IGetAccountByEmailPort) => {
      return new CreateAccountService(
        addAccountToPersistencePort,
        hashPasswordPort,
        generateUuidPort,
        getAccountByEmail,
      );
    },
    inject: [
      AddAccountToPersistencePortSymbol,
      HashPasswordPortSymbol,
      GenerateUuidPortSymbol,
      GetAccountByEmailPortSymbol,
    ],
  },
  {
    provide: SignInUseCaseSymbol,
    useFactory: (getAccountByEmailPort: IGetAccountByEmailPort,
                 generateJwtTokenPort: IGenerateJwtTokenPort,
                 comparePasswordsPort: IComparePasswordsPort) => {
      return new SignInService(getAccountByEmailPort, generateJwtTokenPort, comparePasswordsPort);
    },
    inject: [
      GetAccountByEmailPortSymbol,
      GenerateJwtTokenPortSymbol,
      IComparePasswordsSymbol,
    ],
  },
];

@Module({
  imports: [
    PersistenceModule,
    EncryptorModule,
    AuthModule,
  ],
  providers,
  exports: [...providers],
})
export class DomainsModule {

}
