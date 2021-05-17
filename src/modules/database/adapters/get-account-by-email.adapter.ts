import { GetAccountByEmailPort } from '../../../domains/ports/out/database/get-account-by-email.port';
import { IAccountService } from '../services/definitions/account.service';
import { AccountEntity } from '../../../domains/entities/account.entity';
import { AccountMapper } from '../mappers/account.mapper';

export class GetAccountByEmailAdapter implements GetAccountByEmailPort {
  constructor(private readonly accountService: IAccountService) {
  }

  async getAccountByEmail(email: string): Promise<AccountEntity | null> {
    const account = await this.accountService.findByEmail(email);
    return AccountMapper.mapToDomain(account);
  }
}
