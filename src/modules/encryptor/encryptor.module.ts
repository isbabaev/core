import { ClassProvider, Module } from '@nestjs/common';
import { HashPasswordPortSymbol } from '../../domains/ports/out/encryptor/hash-password.port';
import { HashPasswordAdapter } from './adapters/hash-password.adapter';
import { ComparePasswordsSymbol } from '../../domains/ports/out/encryptor/compare-passwords.port';
import { ComparePasswordsAdapter } from './adapters/compare-passwords.adapter';
import { HashService } from './services/hash.service';

const exportProviders: ClassProvider[] = [
  {
    provide: HashPasswordPortSymbol,
    useClass: HashPasswordAdapter,
  },
  {
    provide: ComparePasswordsSymbol,
    useClass: ComparePasswordsAdapter,
  },
];

@Module({
  providers: [
    HashService,
    ...exportProviders,
  ],
  exports: [
    ...exportProviders,
  ],
})
export class EncryptorModule {
}
