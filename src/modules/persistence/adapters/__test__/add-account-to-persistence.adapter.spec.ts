import { Repository } from 'typeorm';
import { AccountEntity } from '../../entities/account.entity';
import { AddAccountToPersistenceAdapter } from '../add-account-to-persistence.adapter';
import { anything, instance, mock, verify } from 'ts-mockito';
import { createAccount } from '../../../../domains/entities/__test__/factories/account.factory';

describe.only('AddAccountToPersistenceAdapter', () => {
  let addAccountToPersistenceAdapter: AddAccountToPersistenceAdapter;
  let accountRepository: Repository<AccountEntity>;

  beforeAll(async () => {
    accountRepository = mock<Repository<AccountEntity>>();
    addAccountToPersistenceAdapter = new AddAccountToPersistenceAdapter(
      instance(accountRepository)
    );
  });

  test('should call insert method of accountRepository', async () => {
    const account = createAccount();

    await addAccountToPersistenceAdapter.addAccountToPersistence(account);

    verify(accountRepository.insert(anything())).called();
  });
});
