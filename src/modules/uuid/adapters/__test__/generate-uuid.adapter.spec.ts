import { UuidService } from '../../services/uuid.service';
import { instance, mock, verify } from 'ts-mockito';
import { GenerateUuidAdapter } from '../generate-uuid.adapter';

describe('GenerateUuidAdapterTest', () => {
  let generateUuidAdapter: GenerateUuidAdapter;
  let mockedUuidService: UuidService;

  beforeAll(() => {
    mockedUuidService = mock(UuidService);
    generateUuidAdapter = new GenerateUuidAdapter(instance(mockedUuidService));
  });

  test('should call method generate of mockedUuidService', () => {
    generateUuidAdapter.generateUuid();

    verify(mockedUuidService.generate()).called();
  });
});
