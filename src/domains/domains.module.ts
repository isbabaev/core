import { FactoryProvider, Module } from '@nestjs/common';
import { PersistenceModule } from '../modules/persistence/persistence.module';
import { CreateAccountUseCaseSymbol } from './ports/in/create-account/create-account.use-case';
import { CreateAccountService } from './services/create-account.service';
import { EncryptorModule } from '../modules/encryptor/encryptor.module';
import { AuthModule } from '../modules/auth/auth.module';
import { SignInService } from './services/sign-in.service';
import {
  LoadAccountByEmailPortSymbol, ILoadAccountByEmailPort,
} from './ports/out/persistence/load-account-by-email.port';
import { IGenerateJwtTokenPort, GenerateJwtTokenPortSymbol } from './ports/out/auth/generate-jwt-token.port';
import { SignInUseCaseSymbol } from './ports/in/sign-in/sign-in.use-case';
import {
  AddAccountToPersistencePortSymbol,
  IAddAccountToPersistencePort,
} from './ports/out/persistence/add-account-to-persistence.port';
import { HashPasswordPortSymbol, IHashPasswordPort } from './ports/out/encryptor/hash-password.port';
import { GenerateUuidPortSymbol, IGenerateUuidPort } from './ports/out/uuid/generate-uuid.port';
import { IComparePasswordsPort, ComparePasswordsSymbol } from './ports/out/encryptor/compare-passwords.port';

const providers: FactoryProvider[] = [
  {
    provide: CreateAccountUseCaseSymbol,
    useFactory: (addAccountToPersistencePort: IAddAccountToPersistencePort,
                 hashPasswordPort: IHashPasswordPort,
                 generateUuidPort: IGenerateUuidPort,
                 loadAccountByEmailPort: ILoadAccountByEmailPort) => {
      return new CreateAccountService(
        addAccountToPersistencePort,
        hashPasswordPort,
        generateUuidPort,
        loadAccountByEmailPort,
      );
    },
    inject: [
      AddAccountToPersistencePortSymbol,
      HashPasswordPortSymbol,
      GenerateUuidPortSymbol,
      LoadAccountByEmailPortSymbol,
    ],
  },
  {
    provide: SignInUseCaseSymbol,
    useFactory: (loadAccountByEmailPort: ILoadAccountByEmailPort,
                 generateJwtTokenPort: IGenerateJwtTokenPort,
                 comparePasswordsPort: IComparePasswordsPort) => {
      return new SignInService(loadAccountByEmailPort, generateJwtTokenPort, comparePasswordsPort);
    },
    inject: [
      LoadAccountByEmailPortSymbol,
      GenerateJwtTokenPortSymbol,
      ComparePasswordsSymbol,
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
