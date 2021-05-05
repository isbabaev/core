import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ICreateAccount, ICreateAccountResult } from '../../interfaces/account.interface';
import { IAccountService } from '../definitions/account.service.interface';

@Injectable()
export class AccountService implements IAccountService {
  constructor(@Inject('DATABASE_SERVICE')
              private readonly client: ClientProxy) {
  }

  create(createAccountData: ICreateAccount): Promise<ICreateAccountResult> {
    return this.client.send('create-account', createAccountData).toPromise();
  }
}
