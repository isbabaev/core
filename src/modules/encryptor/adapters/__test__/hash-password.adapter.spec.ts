import { instance, mock, verify } from 'ts-mockito';
import { HashPasswordAdapter } from '../hash-password.adapter';
import { HashService } from '../../services/hash.service';

describe('HashPasswordAdapterTest', () => {
  let hashPasswordAdapter: HashPasswordAdapter;
  let mockedHashService: HashService;

  beforeAll(() => {
    mockedHashService = mock(HashService);
    hashPasswordAdapter = new HashPasswordAdapter(instance(mockedHashService));
  });

  test('should call method hash of mockedHashService', async () => {
    const password = 'ItIsPassword';

    await hashPasswordAdapter.hash(password);

    verify(mockedHashService.hash(password)).called();
  });
});
