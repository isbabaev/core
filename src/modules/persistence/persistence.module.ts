import {
  ClassProvider,
  Module,
} from '@nestjs/common';
import { AddAccountToPersistenceAdapter } from './adapters/add-account-to-persistence.adapter';
import { GetAccountByEmailPortSymbol } from '../../domains/ports/out/persistence/get-account-by-email.port';
import { GetAccountByEmailAdapter } from './adapters/get-account-by-email.adapter';
import { AddAccountToPersistencePortSymbol } from '../../domains/ports/out/persistence/add-account-to-persistence.port';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { ProductEntity } from './entities/product.entity';
import { PurchaseEntity } from './entities/purchase.entity';

const exportProviders: ClassProvider[] = [
  {
    provide: AddAccountToPersistencePortSymbol,
    useClass: AddAccountToPersistenceAdapter,
  },
  {
    provide: GetAccountByEmailPortSymbol,
    useClass: GetAccountByEmailAdapter,
  },
];

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([
      AccountEntity,
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
