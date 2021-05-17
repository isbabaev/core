import {
  IAddAccountToDatabasePort,
  AddAccountToDatabaseResult,
} from '../../../domains/ports/out/database/add-account-to-database/add-account-to-database.port';
import { AccountEntity } from '../../../domains/entities/account.entity';
import { IAccountService } from '../services/definitions/account.service';

export class AddAccountToDatabaseAdapter implements IAddAccountToDatabasePort {
  constructor(private readonly accountService: IAccountService) {
  }

  addAccountToDatabase(account: AccountEntity): Promise<AddAccountToDatabaseResult> {
    const {firstName, lastName, email, password} = account;
    return this.accountService.create({firstName, lastName, email, password});
  }
}
