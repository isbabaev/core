import { GetAccountByEmailPort } from '../../../domains/ports/out/persistence/get-account-by-email.port';
import { IAccountService } from '../services/definitions/account.service';
import { Account } from '../../../domains/entities/account';
import { AccountMapper } from '../mappers/account.mapper';

export class GetAccountByEmailAdapter implements GetAccountByEmailPort {
  constructor(private readonly accountService: IAccountService) {
  }

  async getAccountByEmail(email: string): Promise<Account | null> {
    const account = await this.accountService.findByEmail(email);
    return AccountMapper.mapToDomain(account);
  }
}
