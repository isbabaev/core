import { HttpStatus, INestApplication } from '@nestjs/common';
import {
  ILoadAccountByEmailPort,
  LoadAccountByEmailPortSymbol,
} from '../src/domains/ports/out/persistence/load-account-by-email.port';
import { anything, instance, mock, when } from 'ts-mockito';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { Account } from '../src/domains/entities/account';
import { AccountPassword } from '../src/domains/value-objects/account/account-password';
import * as request from 'supertest';
import { SignInDto, SignInResultDto } from '../src/modules/api/dto/sign-in.dto';
import { Id } from '../src/domains/value-objects/id';
import { AccountFirstName } from '../src/domains/value-objects/account/account-first-name';
import { AccountLastName } from '../src/domains/value-objects/account/account-last-name';
import { AccountEmail } from '../src/domains/value-objects/account/account-email';
import { CreatedAt } from '../src/domains/value-objects/created-at';
import { UpdatedAt } from '../src/domains/value-objects/updated-at';

describe('SignInE2eTest', () => {
  let app: INestApplication;
  let mockedLoadAccountByEmailPort: ILoadAccountByEmailPort;
  let signInData: SignInDto;
  let account: Account;

  beforeAll(async () => {
    mockedLoadAccountByEmailPort = mock<ILoadAccountByEmailPort>();

    when(mockedLoadAccountByEmailPort.loadAccountByEmail(anything())).thenResolve();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(LoadAccountByEmailPortSymbol)
      .useValue(Object.assign({}, instance(mockedLoadAccountByEmailPort)))
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    signInData = new SignInDto('test@mail.com', 'test');
    account = new Account(
      new Id('2ff7377d-8404-416e-bc50-fa1652c0dfe2'),
      new AccountFirstName('Test'),
      new AccountLastName('Test'),
      new AccountEmail('test@mail.com'),
      new AccountPassword('$2b$10$Rwj89niQpifouIv25srJC.70xoov1f3FvnjbXEVsW9rVjkH78Y6Nu'),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
    );
  });

  test('should return token', async () => {
    when(mockedLoadAccountByEmailPort.loadAccountByEmail(anything())).thenResolve(account);

    const response = await request(app.getHttpServer())
      .post('/sign-in')
      .send(signInData)
      .expect(HttpStatus.CREATED);

    const responseBody = response.body as SignInResultDto;
    expect(typeof responseBody.token).toBe('string');
  });

  test('should throw error when account not found', async () => {
    when(mockedLoadAccountByEmailPort.loadAccountByEmail(anything())).thenResolve(null);

    await request(app.getHttpServer())
      .post('/sign-in')
      .send(signInData)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  test('should throw error when password invalid', async () => {
    when(mockedLoadAccountByEmailPort.loadAccountByEmail(anything())).thenResolve(account);
    signInData.password = 'test2';

    await request(app.getHttpServer())
      .post('/sign-in')
      .send(signInData)
      .expect(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
