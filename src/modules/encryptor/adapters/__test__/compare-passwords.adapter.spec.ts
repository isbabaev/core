import { instance, mock, verify, when } from 'ts-mockito';
import { ComparePasswordsAdapter } from '../compare-passwords.adapter';
import { AccountPassword } from '../../../../domains/value-objects/account/account-password';
import { HashService } from '../../services/hash.service';

describe('ComparePasswordsAdapterTest', () => {
  let comparePasswordsAdapter: ComparePasswordsAdapter;
  let mockedHashService: HashService;

  beforeAll(() => {
    mockedHashService = mock(HashService);
    comparePasswordsAdapter = new ComparePasswordsAdapter(instance(mockedHashService));
  });

  test('should call method compare of mockedHashService', async() => {
    const password = 'ItIsPassword';
    const mockedHashedPassword = mock(AccountPassword);
    when(mockedHashedPassword.value).thenReturn('ItIsHashedPassword');
    const hashPassword = instance(mockedHashedPassword);

    await comparePasswordsAdapter.comparePasswords(password, hashPassword);

    verify(mockedHashService.compare(password, hashPassword.value)).called();
  });
});
