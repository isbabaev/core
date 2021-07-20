import { Account } from '../../../domains/entities/account';
import { ILoadAccountByEmailPort } from '../../../domains/ports/out/persistence/load-account-by-email.port';
import { Injectable } from '@nestjs/common';
import { AccountMapper } from '../mappers/account.mapper';
import { AccountEmail } from '../../../domains/value-objects/account/account-email';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoadAccountByEmailAdapter implements ILoadAccountByEmailPort {
  constructor(@InjectRepository(AccountEntity)
  private readonly accountRepository: Repository<AccountEntity>) {
  }

  async loadAccountByEmail(email: AccountEmail): Promise<Account | null> {
    const account = await this.accountRepository.findOne({email: email.value});
    return AccountMapper.mapToDomain(account);
  }
}
