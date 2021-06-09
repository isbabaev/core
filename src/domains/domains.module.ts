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
import { UuidModule } from '../modules/uuid/uuid.module';
import { CreateProductUseCaseSymbol } from './ports/in/create-product/create-product.use-case';
import { CreateProductService } from './services/create-product.service';
import {
  AddProductToPersistencePortSymbol,
  IAddProductToPersistencePort,
} from './ports/out/persistence/add-product-to-persistence.port';
import { ILoadAccountByIdPort, LoadAccountByIdPortSymbol } from './ports/out/persistence/load-account-by-id.port';
import { GenerateGoogleAuthUrlUseCaseSymbol } from './ports/in/generate-google-auth-url/generate-google-auth-url.use-case';
import {
  GenerateGoogleAuthUrlPortSymbol,
  IGenerateGoogleAuthUrlPort,
} from './ports/out/googleapis/generate-google-auth-url.port';
import { GenerateGoogleAuthUrlService } from './services/generate-google-auth-url.service';
import { GoogleapisModule } from '../modules/googleapis/googleapis.module';
import { CreateAccountUsingOAuthUseCaseSymbol } from './ports/in/create-account-using-o-auth/create-account-using-oauth.use-case';
import { CreateAccountUsingOAuthService } from './services/create-account-using-o-auth.service';

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
  {
    provide: CreateProductUseCaseSymbol,
    useFactory: (addProductToPersistencePort: IAddProductToPersistencePort,
                 loadAccountByIdPort: ILoadAccountByIdPort) => {
      return new CreateProductService(addProductToPersistencePort, loadAccountByIdPort);
    },
    inject: [
      AddProductToPersistencePortSymbol,
      LoadAccountByIdPortSymbol,
    ],
  },
  {
    provide: GenerateGoogleAuthUrlUseCaseSymbol,
    useFactory: (generateGoogleAuthUrlPort: IGenerateGoogleAuthUrlPort) => {
      return new GenerateGoogleAuthUrlService(generateGoogleAuthUrlPort);
    },
    inject: [
      GenerateGoogleAuthUrlPortSymbol
    ]
  },
  {
    provide: CreateAccountUsingOAuthUseCaseSymbol,
    useFactory: (addAccountToPersistencePort: IAddAccountToPersistencePort,
                 generateUuidPort: IGenerateUuidPort,
                 loadAccountByEmailPort: ILoadAccountByEmailPort) => {
      return new CreateAccountUsingOAuthService(loadAccountByEmailPort, generateUuidPort, addAccountToPersistencePort);
    },
    inject: [
      AddAccountToPersistencePortSymbol,
      GenerateUuidPortSymbol,
      LoadAccountByEmailPortSymbol,
    ],
  }
];

@Module({
  imports: [
    PersistenceModule,
    EncryptorModule,
    AuthModule,
    UuidModule,
    GoogleapisModule,
  ],
  providers,
  exports: [...providers],
})
export class DomainsModule {

}
