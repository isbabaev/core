import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ICreateAccount, ICreateAccountResult } from '../interfaces/account.interface';

@Injectable()
export class AccountService {
  constructor(@Inject('DATABASE_SERVICE')
              private readonly client: ClientProxy) {
  }

  create(createAccountData: ICreateAccount): Promise<ICreateAccountResult> {
    return this.client.send('hello', {msg: 'hello!'}).toPromise();
  }
}
