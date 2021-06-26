import { Module } from '@nestjs/common';
import { DomainsModule } from '../../domains/domains.module';
import { AccountController } from './controllers/account.controller';
import { SignInController } from './controllers/sign-in.controller';
import { CreateProductController } from './controllers/create-product.controller';
import { CreateAccountUsingGoogleController } from './controllers/create-account-using-google.controller';
import { GenerateGoogleAuthUrlController } from './controllers/generate-google-auth-url.controller';

@Module({
  imports: [DomainsModule],
  controllers: [
    AccountController,
    SignInController,
    CreateProductController,
    CreateAccountUsingGoogleController,
    GenerateGoogleAuthUrlController,
  ]
})
export class ApiModule {}
