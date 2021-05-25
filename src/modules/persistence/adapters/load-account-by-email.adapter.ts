import { Account } from '../../../domains/entities/account';
import { ILoadAccountByEmailPort } from '../../../domains/ports/out/persistence/load-account-by-email.port';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AccountMapper } from '../mappers/account.mapper';
import { AccountPersistence } from '../entities/account-persistence';
import { AccountEmail } from '../../../domains/value-objects/account/account-email';

@Injectable()
export class LoadAccountByEmailAdapter implements ILoadAccountByEmailPort {
  constructor(private readonly clientProxy: ClientProxy) {
  }

  async loadAccountByEmail(email: AccountEmail): Promise<Account | null> {
    const account = await this.clientProxy.send<AccountPersistence>(
      'load-account-by-email',
      { email: email.value },
    ).toPromise();

    if (account === null) {
      return null;
    }

    return AccountMapper.mapToDomain(account);
  }
}
