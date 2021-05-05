import { Module } from '@nestjs/common';
import { DomainsModule } from '../../domains/domains.module';
import { AccountController } from './controllers/account.controller';

@Module({
  imports: [DomainsModule],
  controllers: [
    AccountController,
  ]
})
export class ApiModule {}
