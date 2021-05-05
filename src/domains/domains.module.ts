import { FactoryProvider, Module } from '@nestjs/common';
import { DatabaseModule } from '../modules/database/database.module';
import { CreateAccountUseCaseSymbol } from './ports/in/create-account.use-case';
import { CreateAccountService } from './services/create-account.service';
import { AddAccountToDatabasePort, AddAccountToDatabasePortSymbol } from './ports/out/add-account-to-database.port';

const providers: FactoryProvider[] = [
  {
    provide: CreateAccountUseCaseSymbol,
    useFactory: (addAccountToDatabasePort: AddAccountToDatabasePort) => {
      return new CreateAccountService(addAccountToDatabasePort);
    },
    inject: [AddAccountToDatabasePortSymbol],
  }
]

@Module({
  imports: [DatabaseModule],
  providers,
  exports: [...providers]
})
export class DomainsModule {

}
