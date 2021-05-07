import { GetAccountByEmailAdapter } from '../get-account-by-email.adapter';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../../database.module';
import { AccountServiceSymbol, IAccountService } from '../../services/definitions/account.service';
import { AccountEntity } from '../../../../domains/entities/account.entity';

describe('GetAccountByEmailAdapterTest', () => {
  let getAccountByEmailAdapter: GetAccountByEmailAdapter;
  let accountService: IAccountService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule]
    }).compile();

    accountService = moduleRef.get<IAccountService>(AccountServiceSymbol);
    getAccountByEmailAdapter = new GetAccountByEmailAdapter(accountService);

    const mockedAccountEntity = await AccountEntity.create(
      'test',
      'test',
      'test@mail.com',
      'test'
    );

    jest.spyOn(accountService, 'findByEmail')
      .mockImplementation(() => Promise.resolve(mockedAccountEntity));
  });

  it('should return account', async () => {
    const account = await getAccountByEmailAdapter.getAccountByEmail('test');

    expect(account).toBeInstanceOf(AccountEntity);
  });
});
