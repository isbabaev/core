import {
  IAddAccountToDatabasePort,
  AddAccountToDatabaseResult,
} from '../../../domains/ports/out/persistence/add-account-to-persistence.port';
import { Account } from '../../../domains/entities/account';
import { IAccountService } from '../services/definitions/account.service';

export class AddAccountToDatabaseAdapter implements IAddAccountToDatabasePort {
  constructor(private readonly accountService: IAccountService) {
  }

  addAccountToDatabase(account: Account): Promise<AddAccountToDatabaseResult> {
    const {firstName, lastName, email, password} = account;
    return this.accountService.create({firstName, lastName, email, password});
  }
}
