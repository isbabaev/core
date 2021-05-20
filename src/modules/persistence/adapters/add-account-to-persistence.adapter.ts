import { Account } from '../../../domains/entities/account';
import { AccountService } from '../services/account.service';
import { IAddAccountToPersistencePort } from '../../../domains/ports/out/persistence/add-account-to-persistence.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddAccountToPersistenceAdapter implements IAddAccountToPersistencePort {
  constructor(private readonly accountService: AccountService) {
  }

  addAccountToPersistence(account: Account): Promise<void> {
    const { firstName, lastName, email, password } = account;
    return this.accountService.create({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    });
  }
}
