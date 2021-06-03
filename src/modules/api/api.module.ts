import { Module } from '@nestjs/common';
import { DomainsModule } from '../../domains/domains.module';
import { CreateAccountController } from './controllers/create-account.controller';
import { SignInController } from './controllers/sign-in.controller';
import { CreateProductController } from './controllers/create-product.controller';

@Module({
  imports: [DomainsModule],
  controllers: [
    CreateAccountController,
    SignInController,
    CreateProductController,
  ]
})
export class ApiModule {}
