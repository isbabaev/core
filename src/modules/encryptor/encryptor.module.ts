import { FactoryProvider, Module } from '@nestjs/common';
import { HashPortSymbol } from '../../domains/ports/out/hash.port';
import { HashAdapter } from './adapters/hash.adapter';
import { HashServiceSymbol, IHashService } from './services/definitions/hash.service';
import { HashService } from './services/implementations/hash.service';

const exportProviders: FactoryProvider[] = [
  {
    provide: HashPortSymbol,
    useFactory: (hashService: IHashService) => {
      return new HashAdapter(hashService);
    },
    inject: [HashServiceSymbol]
  }
];

@Module({
  providers: [
    {
      provide: HashServiceSymbol,
      useClass: HashService
    },
    ...exportProviders
  ],
  exports: [
    ...exportProviders
  ]
})
export class EncryptorModule { }
