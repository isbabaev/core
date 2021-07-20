import { Repository } from 'typeorm';
import { AccountEntity } from '../../entities/account.entity';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { LoadAccountByIdAdapter } from '../load-account-by-id.adapter';
import { Id } from '../../../../domains/value-objects/id';

describe('LoadAccountByIdServiceTest', () => {
  let loadAccountByIdAdapter: LoadAccountByIdAdapter;
  let accountRepository: Repository<AccountEntity>;

  beforeAll(async () => {
    accountRepository = mock<Repository<AccountEntity>>();
    loadAccountByIdAdapter = new LoadAccountByIdAdapter(instance(accountRepository));
  });

  test('should call method findOne of accountRepository', async () => {
    const id = new Id('123');

    await loadAccountByIdAdapter.loadAccountById(id);

    verify(accountRepository.findOne(id.value));
  });

  test('should return account', async () => {
    const newAccount = new AccountEntity(
      '123',
      'Test',
      'Test',
      'test@mail.com',
      'password',
      new Date('2021-05-22'),
      new Date('2021-05-22')
    );
    when(accountRepository.findOne(anything())).thenResolve(newAccount);

    const account = await loadAccountByIdAdapter.loadAccountById(new Id('123'));

    expect(account).toEqual(newAccount);
  });

  test('should return null when method findOne of accountRepository returns undefined', async () => {
    when(accountRepository.findOne(anything())).thenResolve(undefined);

    const account = await loadAccountByIdAdapter.loadAccountById(new Id('123'));

    expect(account).toBeNull();
  });
});
