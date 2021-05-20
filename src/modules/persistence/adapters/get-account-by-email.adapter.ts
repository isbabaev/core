import { Account } from '../../../domains/entities/account';
import { AccountMapper } from '../mappers/account.mapper';
import { IGetAccountByEmailPort } from '../../../domains/ports/out/persistence/get-account-by-email.port';
import { AccountService } from '../services/account.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAccountByEmailAdapter implements IGetAccountByEmailPort {
  constructor(private readonly accountService: AccountService) {
  }

  async getAccountByEmail(email: string): Promise<Account | null> {
    const account = await this.accountService.findOneByEmail(email);
    return AccountMapper.mapToDomain(account);
  }
}
