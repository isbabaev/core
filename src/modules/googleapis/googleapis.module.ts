import { ClassProvider, Module } from '@nestjs/common';
import { GenerateAuthUrlService } from './services/generate-auth-url.service';
import { ConfigModule } from '@nestjs/config';
import { GenerateGoogleAuthUrlPortSymbol } from '../../domains/ports/out/generate-google-auth-url/generate-google-auth-url.port';
import { GenerateGoogleAuthUrlAdapter } from './adapters/generate-google-auth-url.adapter';

const exportProviders: ClassProvider[] = [
  {
    provide: GenerateGoogleAuthUrlPortSymbol,
    useClass: GenerateGoogleAuthUrlAdapter,
  },
];

@Module({
  imports: [
    ConfigModule,
  ],
  providers: [
    GenerateAuthUrlService,
    ...exportProviders,
  ],
  exports: [
    ...exportProviders,
  ],
})
export class GoogleapisModule {
}
