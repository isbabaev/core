import { FactoryProvider, Inject, Module, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { AccountServiceSymbol, IAccountService } from './services/definitions/account.service';
import { AccountService } from './services/implementations/account.service';
import { AddAccountToDatabasePortSymbol } from '../../domains/ports/out/add-account-to-database.port';
import { AddAccountToDatabaseAdapter } from './adapters/add-account-to-database.adapter';
require('dotenv').config();


const exportProviders: FactoryProvider[] = [
  {
    provide: AddAccountToDatabasePortSymbol,
    useFactory: (accountService: IAccountService) => {
      return new AddAccountToDatabaseAdapter(accountService);
    },
    inject: [AccountServiceSymbol]
  }
];

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DATABASE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.DATABASE_RABBITMQ_URL],
          queue: process.env.DATABASE_QUEUE_NAME,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [
    {
      provide: AccountServiceSymbol,
      useClass: AccountService
    },
    ...exportProviders
  ],
  exports: [
    ...exportProviders
  ],
})
export class DatabaseModule implements OnApplicationBootstrap, OnApplicationShutdown {
  constructor(@Inject('DATABASE_SERVICE')
              private readonly client: ClientProxy) {
  }

  async onApplicationBootstrap(): Promise<any> {
    await this.client.connect();
  }

  onApplicationShutdown(signal?: string): any {
    this.client.close();
  }
}
