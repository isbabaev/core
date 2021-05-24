import { ClassProvider, Module } from '@nestjs/common';
import { UuidService } from './services/uuid.service';
import { GenerateUuidPortSymbol } from '../../domains/ports/out/uuid/generate-uuid.port';
import { GenerateUuidAdapter } from './adapters/generate-uuid.adapter';

const exportProviders: ClassProvider[] = [
  {
    provide: GenerateUuidPortSymbol,
    useClass: GenerateUuidAdapter
  }
];

@Module({
  providers: [
    UuidService,
    ...exportProviders
  ],
  exports: [...exportProviders]
})
export class UuidModule {}
