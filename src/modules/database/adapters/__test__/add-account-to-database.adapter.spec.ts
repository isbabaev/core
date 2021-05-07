import { AddAccountToDatabaseAdapter } from '../add-account-to-database.adapter';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../../database.module';
import { AccountServiceSymbol, IAccountService } from '../../services/definitions/account.service';
import { AddAccountToDatabaseResult } from '../../../../domains/ports/out/add-account-to-database.port';
import { AccountEntity } from '../../../../domains/entities/account.entity';

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
    const mockedAccountEntity = await AccountEntity.create(
      'test',
      'test',
      'test@mail.com',
      'test'
    );
    const addAccountToDatabaseResult = await addAccountToDatabaseAdapter.addAccountToDatabase(mockedAccountEntity);

    expect(addAccountToDatabaseResult.id).toBe(1);
  })
});
