import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../entities/account.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IAddAccountToPersistencePort } from '../../../domains/ports/out/persistence/add-account-to-persistence.port';
import { AccountMapper } from '../mappers/account.mapper';
import { Account } from '../../../domains/entities/account';

@Injectable()
export class AddAccountToPersistenceAdapter implements IAddAccountToPersistencePort {
  constructor(@InjectRepository(AccountEntity)
  private readonly accountRepository: Repository<AccountEntity>) {
  }

  async addAccountToPersistence(account: Account): Promise<void> {
    const accountPersistence = AccountMapper.mapToPersistence(account);
    await this.accountRepository.insert(accountPersistence);
  }
}
