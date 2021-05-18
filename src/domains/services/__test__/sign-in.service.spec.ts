import { SignInService } from '../sign-in.service';
import { DomainsModule } from '../../domains.module';
import { Test } from '@nestjs/testing';
import { GetAccountByEmailPort, GetAccountByEmailPortSymbol } from '../../ports/out/persistence/get-account-by-email.port';
import { GenerateJwtTokenPort, GenerateJwtTokenPortSymbol } from '../../ports/out/auth/generate-jwt-token.port';
import { ICompareHashPort, ICompareHashPortSymbol } from '../../ports/out/encryptor/compare-hash.port';
import { Account } from '../../entities/account';
import { anyString, mock } from 'ts-mockito';

describe('SignInServiceTest', () => {
  let signInService: SignInService;
  let getAccountByEmailPort: GetAccountByEmailPort;
  let compareHashPort: ICompareHashPort;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DomainsModule],
    }).compile();

    getAccountByEmailPort = moduleRef.get<GetAccountByEmailPort>(GetAccountByEmailPortSymbol);
    const generateJwtTokenPort = moduleRef.get<GenerateJwtTokenPort>(GenerateJwtTokenPortSymbol);
    compareHashPort = moduleRef.get<ICompareHashPort>(ICompareHashPortSymbol);

    signInService = new SignInService(getAccountByEmailPort, generateJwtTokenPort, compareHashPort);

    jest.spyOn(getAccountByEmailPort, 'getAccountByEmail')
      .mockImplementation(() => Promise.resolve(mock(Account)));

    jest.spyOn(generateJwtTokenPort, 'generateJwtToken').mockImplementation(() => anyString());

    jest.spyOn(compareHashPort, 'compareHash').mockImplementation(() => Promise.resolve(true));
  });

  it('should return token', async () => {
    const token = await signInService.signIn(anyString(), anyString());

    expect(token).toEqual(anyString());
  });

  it('should throw error because account not found', async () => {
    jest.spyOn(getAccountByEmailPort, 'getAccountByEmail').mockImplementation(() => null);

    await expect(signInService.signIn(anyString(), anyString())).rejects.toThrowError();
  });

  it('should throw error because password invalid', async () => {
    jest.spyOn(compareHashPort, 'compareHash').mockImplementation(() => Promise.resolve(false));

    await expect(signInService.signIn(anyString(), anyString())).rejects.toThrowError();
  });
});
