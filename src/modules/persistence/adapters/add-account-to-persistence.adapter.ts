import { Account } from '../../../domains/entities/account';
import { IAddAccountToPersistencePort } from '../../../domains/ports/out/persistence/add-account-to-persistence.port';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AddAccountToPersistenceAdapter implements IAddAccountToPersistencePort {
  constructor(private readonly clientProxy: ClientProxy) {
  }

  addAccountToPersistence(account: Account): Promise<void> {
    return this.clientProxy.send('create-account', account).toPromise();
  }
}
