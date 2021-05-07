import { HashAdapter } from '../hash.adapter';
import { Test } from '@nestjs/testing';
import { EncryptorModule } from '../../encryptor.module';
import { HashServiceSymbol, IHashService } from '../../services/definitions/hash.service';

describe('HashAdapter', () => {
  let hashAdapter: HashAdapter;

  let mockedHashResult: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EncryptorModule]
    }).compile();

    const hashService = moduleRef.get<IHashService>(HashServiceSymbol);
    hashAdapter = new HashAdapter(hashService);

    mockedHashResult = 'hash';
    jest.spyOn(hashService, 'hash').mockImplementation(() => Promise.resolve(mockedHashResult));
  });

  it('should return string', async () => {
    const hashResult = await hashAdapter.hash(null);

    expect(hashResult).toBe(mockedHashResult);
  });
});
