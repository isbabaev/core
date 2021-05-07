import {
  AddAccountToDatabasePort,
  AddAccountToDatabaseResult,
} from '../../../domains/ports/out/add-account-to-database.port';
import { AccountEntity } from '../../../domains/entities/account.entity';
import { IAccountService } from '../services/definitions/account.service';

export class AddAccountToDatabaseAdapter implements AddAccountToDatabasePort {
  constructor(private readonly accountService: IAccountService) {
  }

  addAccountToDatabase(account: AccountEntity): Promise<AddAccountToDatabaseResult> {
    const {firstName, lastName, email, password} = account;
    return this.accountService.create({firstName, lastName, email, password});
  }
}
