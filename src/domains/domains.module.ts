import { FactoryProvider, Module } from '@nestjs/common';
import { DatabaseModule } from '../modules/database/database.module';
import { CreateAccountUseCaseSymbol } from './ports/in/create-account.use-case';
import { CreateAccountService } from './services/create-account.service';
import { AddAccountToDatabasePort, AddAccountToDatabasePortSymbol } from './ports/out/add-account-to-database.port';
import { EncryptorModule } from '../modules/encryptor/encryptor.module';
import { HashPort, HashPortSymbol } from './ports/out/hash.port';

const providers: FactoryProvider[] = [
  {
    provide: CreateAccountUseCaseSymbol,
    useFactory: (addAccountToDatabasePort: AddAccountToDatabasePort, hashPort: HashPort) => {
      return new CreateAccountService(addAccountToDatabasePort, hashPort);
    },
    inject: [AddAccountToDatabasePortSymbol, HashPortSymbol],
  }
]

@Module({
  imports: [
    DatabaseModule,
    EncryptorModule,
  ],
  providers,
  exports: [...providers]
})
export class DomainsModule {

}
