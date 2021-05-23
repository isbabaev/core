import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountPersistence } from '../entities/account-persistence';
import { ICreateAccount } from '../interfaces/account.interface';

@Injectable()
export class AccountService {
  constructor(@InjectRepository(AccountPersistence)
              private readonly accountEntityRepository: Repository<AccountPersistence>) {
  }

  findOneById(id: number): Promise<AccountPersistence> {
    return this.accountEntityRepository.findOne(id);
  }

  findOneByEmail(email: string): Promise<AccountPersistence> {
    return this.accountEntityRepository.findOne({email});
  }

  async create(createData: ICreateAccount): Promise<void> {
    await this.accountEntityRepository.save(createData);
    return;
  }
}
