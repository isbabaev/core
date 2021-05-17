import { FactoryProvider, Inject, Module, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AccountServiceSymbol, IAccountService } from './services/definitions/account.service';
import { AccountService } from './services/implementations/account.service';
import { AddAccountToDatabasePortSymbol } from '../../domains/ports/out/database/add-account-to-database/add-account-to-database.port';
import { AddAccountToDatabaseAdapter } from './adapters/add-account-to-database.adapter';
import { GetAccountByEmailPortSymbol } from '../../domains/ports/out/database/get-account-by-email.port';
import { GetAccountByEmailAdapter } from './adapters/get-account-by-email.adapter';
require('dotenv').config();

export const DatabaseServiceClientProxySymbol = Symbol('DATABASE_SERVICE');

const exportProviders: FactoryProvider[] = [
  {
    provide: AddAccountToDatabasePortSymbol,
    useFactory: (accountService: IAccountService) => {
      return new AddAccountToDatabaseAdapter(accountService);
    },
    inject: [AccountServiceSymbol]
  },
  {
    provide: GetAccountByEmailPortSymbol,
    useFactory: (accountService: IAccountService)=> {
      return new GetAccountByEmailAdapter(accountService);
    },
    inject: [AccountServiceSymbol]
  }
];

@Module({
  providers: [
    {
      provide: DatabaseServiceClientProxySymbol,
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.DATABASE_RABBITMQ_URL],
            queue: process.env.DATABASE_QUEUE_NAME,
            queueOptions: {
              durable: false,
            },
          },
        })
      }
    },
    {
      provide: AccountServiceSymbol,
      useFactory: (clientProxy: ClientProxy) => {
        return new AccountService(clientProxy);
      },
      inject: [DatabaseServiceClientProxySymbol],
    },
    ...exportProviders
  ],
  exports: [
    ...exportProviders
  ],
})
export class DatabaseModule implements OnApplicationBootstrap, OnApplicationShutdown {
  constructor(@Inject(DatabaseServiceClientProxySymbol)
              private readonly client: ClientProxy) {
  }

  async onApplicationBootstrap(): Promise<any> {
    await this.client.connect();
  }

  onApplicationShutdown(signal?: string): any {
    this.client.close();
  }
}
