import {
  ClassProvider,
  Module,
} from '@nestjs/common';
import { AddAccountToPersistenceAdapter } from './adapters/add-account-to-persistence.adapter';
import { LoadAccountByEmailPortSymbol } from '../../domains/ports/out/persistence/load-account-by-email.port';
import { LoadAccountByEmailAdapter } from './adapters/load-account-by-email.adapter';
import { AddAccountToPersistencePortSymbol } from '../../domains/ports/out/persistence/add-account-to-persistence.port';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountPersistence } from './entities/account-persistence';
import { ProductEntity } from './entities/product.entity';
import { PurchaseEntity } from './entities/purchase.entity';

const exportProviders: ClassProvider[] = [
  {
    provide: AddAccountToPersistencePortSymbol,
    useClass: AddAccountToPersistenceAdapter,
  },
  {
    provide: LoadAccountByEmailPortSymbol,
    useClass: LoadAccountByEmailAdapter,
  },
];

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([
      AccountPersistence,
      ProductEntity,
      PurchaseEntity,
    ]),
  ],
  providers: [
    ...exportProviders,
  ],
  exports: [
    ...exportProviders,
  ],
})
export class PersistenceModule {
}
