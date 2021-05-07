import { CompareHashAdapter } from '../compare-hash.adapter';
import { Test } from '@nestjs/testing';
import { EncryptorModule } from '../../encryptor.module';
import { HashServiceSymbol, IHashService } from '../../services/definitions/hash.service';

describe('CompareHashAdapterTest', () => {
  let compareHashAdapter: CompareHashAdapter;

  let mockedCompareHashResult: boolean;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EncryptorModule]
    }).compile();

    const hashService = moduleRef.get<IHashService>(HashServiceSymbol);
    compareHashAdapter = new CompareHashAdapter(hashService);

    mockedCompareHashResult = true;
    jest.spyOn(hashService, 'compare').mockImplementation(() => Promise.resolve(mockedCompareHashResult));
  });

  it('should return true', async() => {
    const compareHashResult = await compareHashAdapter.compareHash(null, null);

    expect(compareHashResult).toBe(mockedCompareHashResult);
  });
});
