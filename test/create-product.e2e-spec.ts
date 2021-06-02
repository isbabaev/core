import { HttpStatus, INestApplication } from '@nestjs/common';
import {
  AddProductToPersistencePortSymbol,
  IAddProductToPersistencePort,
} from '../src/domains/ports/out/persistence/add-product-to-persistence.port';
import {
  ILoadAccountByIdPort,
  LoadAccountByIdPortSymbol,
} from '../src/domains/ports/out/persistence/load-account-by-id.port';
import { CreateProductDto } from '../src/modules/api/dto/create-product.dto';
import { anything, capture, instance, mock, when } from 'ts-mockito';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('CreateProductE2eTest', () => {
  let app: INestApplication;
  let mockedAddProductToPersistencePort: IAddProductToPersistencePort;
  let mockedLoadAccountByIdPort: ILoadAccountByIdPort;
  let createProductData: CreateProductDto;

  beforeAll(async () => {
    mockedAddProductToPersistencePort = mock<IAddProductToPersistencePort>();
    mockedLoadAccountByIdPort = mock<ILoadAccountByIdPort>();

    when(mockedAddProductToPersistencePort.addProductToPersistence(anything())).thenResolve();
    when(mockedLoadAccountByIdPort.loadAccountById(anything())).thenResolve();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(AddProductToPersistencePortSymbol)
      .useValue(Object.assign({}, instance(mockedAddProductToPersistencePort)))
      .overrideProvider(LoadAccountByIdPortSymbol)
      .useValue(Object.assign({}, instance(mockedLoadAccountByIdPort)))
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    createProductData = new CreateProductDto(
      'ProductName',
      'ProductDescription',
      ['http://localhost:3000/photo'],
      100.50,
      'a6abb7da-6b27-4ca8-9f71-f2126f8d72a9',
    );
  });

  test('should call method addProductToPersistence of mockedAddProductToPersistencePort', async () => {
    await request(app.getHttpServer())
      .post('/create-product')
      .send(createProductData)
      .expect(HttpStatus.CREATED);

    const addProductToPersistenceArguments = capture(mockedAddProductToPersistencePort.addProductToPersistence).first();
    expect(addProductToPersistenceArguments[0].name.value).toBe(createProductData.name);
    expect(addProductToPersistenceArguments[0].description.value).toBe(createProductData.description);
    expect(addProductToPersistenceArguments[0].photoUris[0].value).toBe(createProductData.photoUris[0]);
    expect(addProductToPersistenceArguments[0].price.value).toBe(createProductData.price);
    expect(addProductToPersistenceArguments[0].seller.id.value).toBe(createProductData.sellerId);
  });

});
