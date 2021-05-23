import { SignInService } from '../sign-in.service';
import {
  ILoadAccountByEmailPort,
} from '../../ports/out/persistence/load-account-by-email.port';
import { IGenerateJwtTokenPort } from '../../ports/out/auth/generate-jwt-token.port';
import { Account } from '../../entities/account';
import { anyString, anything, instance, mock, when } from 'ts-mockito';
import { SignInCommand } from '../../ports/in/sign-in/sign-in.command';
import { AccountEmail } from '../../value-objects/account/account-email';
import { AccountPassword } from '../../value-objects/account/account-password';
import * as jwt from 'jsonwebtoken';
import { IComparePasswordsPort } from '../../ports/out/encryptor/compare-passwords.port';

describe('SignInServiceTest', () => {
  let signInService: SignInService;
  let getAccountByEmailPort: ILoadAccountByEmailPort;
  let comparePasswordsPort: IComparePasswordsPort;

  const mockedToken = '';
  const email = new AccountEmail('mail@mail.com');
  const passwordHash = jwt.sign({}, 'secret');
  const password = new AccountPassword(passwordHash);
  const signInCommand = new SignInCommand(email, password.value);

  beforeEach(async () => {
    const generateJwtTokenPort = mock<IGenerateJwtTokenPort>();
    getAccountByEmailPort = mock<ILoadAccountByEmailPort>();
    comparePasswordsPort = mock<IComparePasswordsPort>();

    signInService = new SignInService(
      instance(getAccountByEmailPort),
      instance(generateJwtTokenPort),
      instance(comparePasswordsPort),
    );

    when(generateJwtTokenPort.generateJwtToken(anything())).thenReturn(mockedToken);
  });

  it('should return token', async () => {
    when(getAccountByEmailPort.loadAccountByEmail(anyString())).thenResolve(mock(Account));
    when(comparePasswordsPort.compareHash(anyString(), anything())).thenResolve(true);

    const signInResult = await signInService.signIn(signInCommand);

    expect(signInResult.token).toBe(mockedToken);
  });

  it('should throw error when account not found', async () => {
    await expect(signInService.signIn(signInCommand)).rejects.toThrowError('Account not found');
  });

  it('should throw error when password invalid', async () => {
    when(getAccountByEmailPort.loadAccountByEmail(anyString())).thenResolve(mock(Account));
    when(comparePasswordsPort.compareHash(anything(), anyString())).thenResolve(false);

    await expect(signInService.signIn(signInCommand)).rejects.toThrowError('Invalid password');
  });
});
