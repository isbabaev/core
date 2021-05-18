import { AddAccountToDatabaseAdapter } from '../add-account-to-database.adapter';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../../database.module';
import { AccountServiceSymbol, IAccountService } from '../../services/definitions/account.service';
import { AddAccountToDatabaseResult } from '../../../../domains/ports/out/database/add-account-to-database/add-account-to-database.port';
import { Account } from '../../../../domains/entities/account';

describe('AddAccountToDatabaseAdapterTest', () => {
  let addAccountToDatabaseAdapter: AddAccountToDatabaseAdapter;
  let accountService: IAccountService;

  let mockedAddAccountToDatabaseResult: AddAccountToDatabaseResult;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule]
    }).compile();

    accountService = moduleRef.get<IAccountService>(AccountServiceSymbol);
    addAccountToDatabaseAdapter = new AddAccountToDatabaseAdapter(accountService);

    mockedAddAccountToDatabaseResult = {id: 1};

    jest.spyOn(accountService, 'create')
      .mockImplementation(() => Promise.resolve(mockedAddAccountToDatabaseResult));
  });

  it('should return id', async () => {
    const mockedAccountEntity = await Account.create(
      'test',
      'test',
      'test@mail.com',
      'test'
    );
    const addAccountToDatabaseResult = await addAccountToDatabaseAdapter.addAccountToDatabase(mockedAccountEntity);

    expect(addAccountToDatabaseResult.id).toBe(1);
  })
});
