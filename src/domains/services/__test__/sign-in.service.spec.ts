import { SignInService } from '../sign-in.service';
import {
  IGetAccountByEmailPort,
} from '../../ports/out/persistence/get-account-by-email.port';
import { IGenerateJwtTokenPort } from '../../ports/out/auth/generate-jwt-token.port';
import { ICompareHashPort } from '../../ports/out/encryptor/compare-hash.port';
import { Account } from '../../entities/account';
import { anyString, anything, instance, mock, when } from 'ts-mockito';
import { SignInCommand } from '../../ports/in/sign-in/sign-in.command';
import { AccountEmail } from '../../value-objects/account/account-email';
import { AccountPassword } from '../../value-objects/account/account-password';
import * as jwt from 'jsonwebtoken';

describe('SignInServiceTest', () => {
  let signInService: SignInService;
  let getAccountByEmailPort: IGetAccountByEmailPort;
  let compareHashPort: ICompareHashPort;

  const mockedToken = '';
  const email = new AccountEmail('mail@mail.com');
  const passwordHash = jwt.sign({}, 'secret');
  const password = new AccountPassword(passwordHash);
  const signInCommand = new SignInCommand(email, password);

  beforeEach(async () => {
    const generateJwtTokenPort = mock<IGenerateJwtTokenPort>();
    getAccountByEmailPort = mock<IGetAccountByEmailPort>();
    compareHashPort = mock<ICompareHashPort>();

    signInService = new SignInService(
      instance(getAccountByEmailPort),
      instance(generateJwtTokenPort),
      instance(compareHashPort),
    );

    when(generateJwtTokenPort.generateJwtToken(anything())).thenReturn(mockedToken);
  });

  it('should return token', async () => {
    when(getAccountByEmailPort.getAccountByEmail(anyString())).thenResolve(mock(Account));
    when(compareHashPort.compareHash(anyString(), anything())).thenResolve(true);

    const signInResult = await signInService.signIn(signInCommand);

    expect(signInResult.token).toBe(mockedToken);
  });

  it('should throw error when account not found', async () => {
    await expect(signInService.signIn(signInCommand)).rejects.toThrowError('Account not found');
  });

  it('should throw error when password invalid', async () => {
    when(getAccountByEmailPort.getAccountByEmail(anyString())).thenResolve(mock(Account));
    when(compareHashPort.compareHash(anything(), anyString())).thenResolve(false);

    await expect(signInService.signIn(signInCommand)).rejects.toThrowError('Invalid password');
  });
});
