import { ILoadAccountByIdPort } from '../../../domains/ports/out/persistence/load-account-by-id.port';
import { ClientProxy } from '@nestjs/microservices';
import { Id } from '../../../domains/value-objects/id';
import { Account } from '../../../domains/entities/account';
import { AccountPersistence } from '../entities/account-persistence';
import { AccountMapper } from '../mappers/account.mapper';

export class LoadAccountByIdAdapter implements ILoadAccountByIdPort {
  constructor(private readonly clientProxy: ClientProxy) {
  }

  async loadAccountById(id: Id): Promise<Account | null> {
    const account = await this.clientProxy.send<AccountPersistence>(
      'load-account-by-id',
      { id: id.value },
    ).toPromise();

    if (account === null) {
      return null;
    }

    return AccountMapper.mapToDomain(account);
  }
}
