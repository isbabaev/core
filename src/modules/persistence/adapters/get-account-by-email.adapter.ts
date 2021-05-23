import { Account } from '../../../domains/entities/account';
import { IGetAccountByEmailPort } from '../../../domains/ports/out/persistence/get-account-by-email.port';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AccountMapper } from '../mappers/account.mapper';
import { AccountPersistence } from '../entities/account-persistence';

@Injectable()
export class GetAccountByEmailAdapter implements IGetAccountByEmailPort {
  constructor(private readonly clientProxy: ClientProxy) {
  }

  async getAccountByEmail(email: string): Promise<Account | null> {
    const account = await this.clientProxy.send<AccountPersistence>('load-account-by-email', {email})
      .toPromise();
    return AccountMapper.mapToDomain(account);
  }
}
