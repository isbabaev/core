import { Module } from '@nestjs/common';
import { DomainsModule } from '../../domains/domains.module';
import { CreateAccountController } from './controllers/create-account.controller';
import { SignInController } from './controllers/sign-in.controller';

@Module({
  imports: [DomainsModule],
  controllers: [
    CreateAccountController,
    SignInController,
  ]
})
export class ApiModule {}
