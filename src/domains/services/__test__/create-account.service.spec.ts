import { CreateAccountService } from '../create-account.service';
import {
  AddAccountToDatabasePort,
  AddAccountToDatabasePortSymbol,
} from '../../ports/out/add-account-to-database.port';
import { AccountEntity } from '../../entities/account.entity';
import { anyString, mock, when } from 'ts-mockito';
import { Test } from '@nestjs/testing';
import { DomainsModule } from '../../domains.module';
import { HashPort, HashPortSymbol } from '../../ports/out/hash.port';

describe('CreateAccountServiceTest', () => {
  let createAccountService: CreateAccountService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DomainsModule],
    }).compile();

    const addAccountToDatabasePort = moduleRef.get<AddAccountToDatabasePort>(AddAccountToDatabasePortSymbol);
    jest.spyOn(addAccountToDatabasePort, 'addAccountToDatabase')
      .mockImplementation(() => Promise.resolve({id: 1}));

    const hashPort = moduleRef.get<HashPort>(HashPortSymbol);
    jest.spyOn(hashPort, 'hash').mockImplementation(() => Promise.resolve(''));

    const mockedAccountEntityType = mock<typeof AccountEntity>();
    when(mockedAccountEntityType.create(anyString(), anyString(), anyString(), anyString()))
      .thenReturn(Promise.resolve(null));

    createAccountService = new CreateAccountService(addAccountToDatabasePort, hashPort);
  });

  it('should return id', async () => {
    const createAccountResult = await createAccountService.createAccount({
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@mail.com',
      password: 'passwd',
    });

    expect(typeof createAccountResult.id).toBe('number');
  });
});
