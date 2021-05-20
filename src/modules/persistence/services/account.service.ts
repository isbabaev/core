import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../entities/account.entity';
import { ICreateAccount } from '../interfaces/account.interface';

@Injectable()
export class AccountService {
  constructor(@InjectRepository(AccountEntity)
              private readonly accountEntityRepository: Repository<AccountEntity>) {
  }

  findOneById(id: number): Promise<AccountEntity> {
    return this.accountEntityRepository.findOne(id);
  }

  findOneByEmail(email: string): Promise<AccountEntity> {
    return this.accountEntityRepository.findOne({email});
  }

  async create(createData: ICreateAccount): Promise<void> {
    await this.accountEntityRepository.save(createData);
    return;
  }
}
