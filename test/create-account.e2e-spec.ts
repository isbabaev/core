import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import {
  AddAccountToPersistencePortSymbol,
  IAddAccountToPersistencePort,
} from '../src/domains/ports/out/persistence/add-account-to-persistence.port';
import { anything, capture, instance, mock, when } from 'ts-mockito';
import {
  ILoadAccountByEmailPort,
  LoadAccountByEmailPortSymbol,
} from '../src/domains/ports/out/persistence/load-account-by-email.port';
import { CreateAccountDto } from '../src/modules/api/dto/create-account.dto';
import * as request from 'supertest';
import { ICreateAccountResult } from '../src/domains/ports/in/create-account/create-account.result';
import * as Joi from 'joi';

describe('CreateAccountE2eTest', () => {
  let app: INestApplication;
  let mockedAddAccountToPersistencePort: IAddAccountToPersistencePort;
  let mockedLoadAccountToEmailPort: ILoadAccountByEmailPort;
  let createAccountData: CreateAccountDto;

  beforeAll(async () => {
    mockedAddAccountToPersistencePort = mock<IAddAccountToPersistencePort>();
    mockedLoadAccountToEmailPort = mock<ILoadAccountByEmailPort>();

    when(mockedAddAccountToPersistencePort.addAccountToPersistence(anything())).thenResolve();
    when(mockedLoadAccountToEmailPort.loadAccountByEmail(anything())).thenResolve(null);

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(AddAccountToPersistencePortSymbol)
      .useValue(Object.assign({}, instance(mockedAddAccountToPersistencePort)))
      .overrideProvider(LoadAccountByEmailPortSymbol)
      .useValue(Object.assign({}, instance(mockedLoadAccountToEmailPort)))
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    createAccountData = new CreateAccountDto(
      'Test',
      'Test',
      'test@mail.com',
      'password',
    );
  });

  test('should call method addAccountToPersistence of mockedAddAccountToPersistencePort', async () => {
    await request(app.getHttpServer())
      .post('/create-account')
      .send(createAccountData)
      .expect(HttpStatus.CREATED);

    const addAccountToPersistenceArguments = capture(mockedAddAccountToPersistencePort.addAccountToPersistence).first();
    expect(addAccountToPersistenceArguments[0].firstName.value).toBe(createAccountData.firstName);
    expect(addAccountToPersistenceArguments[0].lastName.value).toBe(createAccountData.lastName);
    expect(addAccountToPersistenceArguments[0].email.value).toBe(createAccountData.email);
  });

  test('should return Id', async () => {
    const response = await request(app.getHttpServer())
      .post('/create-account')
      .send(createAccountData)
      .expect(HttpStatus.CREATED);

    const responseBody = response.body as ICreateAccountResult;
    Joi.assert(responseBody.id, Joi.string().uuid().required());
  });

});
