import {
  AddAccountToDatabasePort,
  AddAccountToDatabaseResult,
} from '../../../domains/ports/out/add-account-to-database.port';
import { AccountEntity } from '../../../domains/entities/account.entity';
import { AccountServiceSymbol, IAccountService } from '../services/definitions/account.service';
import { Inject } from '@nestjs/common';

export class AddAccountToDatabaseAdapter implements AddAccountToDatabasePort {
  constructor(@Inject(AccountServiceSymbol)
              private readonly accountService: IAccountService) {
  }

  addAccountToDatabase(account: AccountEntity): Promise<AddAccountToDatabaseResult> {
    const {firstName, lastName, email, password} = account;
    return this.accountService.create({firstName, lastName, email, password});
  }
}
