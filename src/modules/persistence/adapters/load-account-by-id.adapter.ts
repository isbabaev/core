import { ILoadAccountByIdPort } from '../../../domains/ports/out/persistence/load-account-by-id.port';
import { Id } from '../../../domains/value-objects/id';
import { Account } from '../../../domains/entities/account';
import { AccountMapper } from '../mappers/account.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../entities/account.entity';
import { Repository } from 'typeorm';

export class LoadAccountByIdAdapter implements ILoadAccountByIdPort {
  constructor(@InjectRepository(AccountEntity)
              private readonly accountRepository: Repository<AccountEntity>) {
  }

  async loadAccountById(id: Id): Promise<Account | null> {
    const account = await this.accountRepository.findOne(id.value);
    return AccountMapper.mapToDomain(account);
  }
}
