import {
  ClassProvider,
  Module,
} from '@nestjs/common';
import { AddAccountToPersistenceAdapter } from './adapters/add-account-to-persistence.adapter';
import { LoadAccountByEmailPortSymbol } from '../../domains/ports/out/persistence/load-account-by-email.port';
import { LoadAccountByEmailAdapter } from './adapters/load-account-by-email.adapter';
import { AddAccountToPersistencePortSymbol } from '../../domains/ports/out/persistence/add-account-to-persistence.port';

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
  providers: [
    ...exportProviders,
  ],
  exports: [
    ...exportProviders,
  ],
})
export class PersistenceModule {
}
