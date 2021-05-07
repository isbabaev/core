import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ICreateAccount, ICreateAccountResult, IAccount } from '../../interfaces/account.interface';
import { IAccountService } from '../definitions/account.service';

@Injectable()
export class AccountService implements IAccountService {
  constructor(@Inject('DATABASE_SERVICE')
              private readonly client: ClientProxy) {
  }

  create(createAccountData: ICreateAccount): Promise<ICreateAccountResult> {
    return this.client.send('create-account', createAccountData).toPromise();
  }

  findByEmail(email: string): Promise<IAccount> {
    return this.client.send('find-account-by-email', email).toPromise();
  }
}
