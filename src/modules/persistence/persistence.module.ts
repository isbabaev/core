import {
  ClassProvider,
  Module,
} from '@nestjs/common';
import { AddAccountToPersistenceAdapter } from './adapters/add-account-to-persistence.adapter';
import { LoadAccountByEmailPortSymbol } from '../../domains/ports/out/persistence/load-account-by-email.port';
import { LoadAccountByEmailAdapter } from './adapters/load-account-by-email.adapter';
import { AddAccountToPersistencePortSymbol } from '../../domains/ports/out/persistence/add-account-to-persistence.port';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoadAccountByIdPortSymbol } from '../../domains/ports/out/persistence/load-account-by-id.port';
import { LoadAccountByIdAdapter } from './adapters/load-account-by-id.adapter';
import { AddProductToPersistencePortSymbol } from '../../domains/ports/out/persistence/add-product-to-persistence.port';
import { AddProductToPersistenceAdapter } from './adapters/add-product-to-persistence.adapter';

const exportProviders: ClassProvider[] = [
  {
    provide: AddAccountToPersistencePortSymbol,
    useClass: AddAccountToPersistenceAdapter,
  },
  {
    provide: LoadAccountByEmailPortSymbol,
    useClass: LoadAccountByEmailAdapter,
  },
  {
    provide: LoadAccountByIdPortSymbol,
    useClass: LoadAccountByIdAdapter,
  },
  {
    provide: AddProductToPersistencePortSymbol,
    useClass: AddProductToPersistenceAdapter,
  },
];

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  providers: [
    {
      provide: ClientProxy,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('DATABASE_RABBITMQ_URI')],
            queue: configService.get('DATABASE_QUEUE_NAME'),
            queueOptions: {
              durable: false,
            },
          },
        });
      },
      inject: [ConfigService],
    },
    ...exportProviders,
  ],
  exports: [
    ...exportProviders,
  ],
})
export class PersistenceModule {
}
