import { CreateAccountService } from '../create-account.service';
import { AddAccountToDatabasePort, AddAccountToDatabaseResult } from '../../ports/out/add-account-to-database.port';
import { AccountEntity } from '../../entities/account.entity';
import { anyString, mock, when } from 'ts-mockito';

describe('CreateAccountServiceTest', () => {
  let createAccountService: CreateAccountService;

  beforeAll(() => {
    const addAccountToDatabasePort: AddAccountToDatabasePort = {
      addAccountToDatabase(account: AccountEntity): Promise<AddAccountToDatabaseResult> {
        return;
      },
    };

    createAccountService = new CreateAccountService(addAccountToDatabasePort);

    jest.spyOn(addAccountToDatabasePort, 'addAccountToDatabase')
      .mockImplementation(() => Promise.resolve({ id: 1 }));

    const mockedAccountEntityType = mock<typeof AccountEntity>();
    when(mockedAccountEntityType.create(anyString(), anyString(), anyString(), anyString()))
      .thenReturn(Promise.resolve(null));
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
