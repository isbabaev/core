import { Account } from '../../../domains/entities/account';
import { IAddAccountToPersistencePort } from '../../../domains/ports/out/persistence/add-account-to-persistence.port';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AccountMapper } from '../mappers/account.mapper';

@Injectable()
export class AddAccountToPersistenceAdapter implements IAddAccountToPersistencePort {
  constructor(private readonly clientProxy: ClientProxy) {
  }

  addAccountToPersistence(account: Account): Promise<void> {
    const accountPersistence = AccountMapper.mapToPersistence(account);
    return this.clientProxy.send('create-account', accountPersistence).toPromise();
  }
}
