import { Repository } from 'typeorm';
import { AccountEntity } from '../../entities/account.entity';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { LoadAccountByEmailAdapter } from '../load-account-by-email.adapter';
import { AccountEmail } from '../../../../domains/value-objects/account/account-email';
import { createAccountEntity } from '../../entities/__test__/factories/account.entity.factory';
import * as faker from 'faker';

describe('LoadAccountByEmailAdapter', () => {
  let loadAccountByEmailAdapter: LoadAccountByEmailAdapter;
  let accountRepository: Repository<AccountEntity>;

  beforeAll(async () => {
    accountRepository = mock<Repository<AccountEntity>>();
    loadAccountByEmailAdapter = new LoadAccountByEmailAdapter(instance(accountRepository));
  });

  test('should call method findOne of accountRepository', async () => {
    const email = faker.internet.email();

    await loadAccountByEmailAdapter.loadAccountByEmail(new AccountEmail(email));

    verify(accountRepository.findOne({ email }));
  });

  test('should return account', async () => {
    const newAccount = createAccountEntity();
    when(accountRepository.findOne(anything())).thenResolve(newAccount); // TODO don't mock database

    const account = await loadAccountByEmailAdapter.loadAccountByEmail(new AccountEmail(newAccount.email));

    expect(account.getEmail().value).toEqual(newAccount.email);
  });

  test('should return null when method findOne of accountRepository returns undefined', async () => {
    when(accountRepository.findOne(anything())).thenResolve(undefined);

    const account = await loadAccountByEmailAdapter.loadAccountByEmail(new AccountEmail(faker.internet.email()));

    expect(account).toBeNull();
  });
})
