import { capture, instance, mock, reset, when } from 'ts-mockito';
import { ProductName } from '../../value-objects/product/product-name';
import { ProductDescription } from '../../value-objects/product/product-description';
import { ProductPhotoUri } from '../../value-objects/product/product-photo-uri';
import { Price } from '../../value-objects/price';
import { Id } from '../../value-objects/id';
import { CreateProductCommand } from '../../ports/in/create-product/create-product.command';
import { CreateProductService } from '../create-product.service';
import { IAddProductToPersistencePort } from '../../ports/out/persistence/add-product-to-persistence.port';
import BigNumber from 'bignumber.js';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../../entities/product';
import { ILoadAccountByIdPort } from '../../ports/out/persistence/load-account-by-id.port';
import { Account } from '../../entities/account';
import { AccountFirstName } from '../../value-objects/account/account-first-name';
import { AccountLastName } from '../../value-objects/account/account-last-name';
import { AccountEmail } from '../../value-objects/account/account-email';
import { AccountPassword } from '../../value-objects/account/account-password';
import { CreatedAt } from '../../value-objects/created-at';
import { UpdatedAt } from '../../value-objects/updated-at';

describe('CreateProductServiceTest', () => {
  let createProductService: CreateProductService;
  let mockedAddProductToPersistencePort: IAddProductToPersistencePort;
  let mockedLoadAccountByIdPort: ILoadAccountByIdPort;
  let createProductCommand: CreateProductCommand;

  beforeAll(() => {
    mockedAddProductToPersistencePort = mock<IAddProductToPersistencePort>();
    mockedLoadAccountByIdPort = mock<ILoadAccountByIdPort>();
    createProductService = new CreateProductService(
      instance(mockedAddProductToPersistencePort),
      instance(mockedLoadAccountByIdPort),
    );

    const sellerId = new Id(uuidv4());
    createProductCommand = new CreateProductCommand(
      new ProductName('ProductName'),
      new ProductDescription('ProductDescription'),
      [new ProductPhotoUri('https://test.com/photo')],
      new Price(new BigNumber(1)),
      sellerId,
    );

    when(mockedLoadAccountByIdPort.loadAccountById(sellerId)).thenResolve(new Account(
      sellerId,
      new AccountFirstName('firstName'),
      new AccountLastName('lastName'),
      new AccountEmail('mail@mail.com'),
      new AccountPassword('password'),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
    ));
  });

  test('should return id', async () => {
    const createProductResult = await createProductService.createProduct(createProductCommand);

    expect(createProductResult.id).toBeInstanceOf(Id);
  });

  test('should call addProductToPersistence method with instance of Product in arguments', async () => {
    await createProductService.createProduct(createProductCommand);

    const addProductToPersistenceArguments = capture(mockedAddProductToPersistencePort.addProductToPersistence).first();

    expect(addProductToPersistenceArguments[0]).toBeInstanceOf(Product);
  });

  test('should throw exception when seller is null', async() => {
    reset(mockedLoadAccountByIdPort);

    await expect(createProductService.createProduct(createProductCommand)).rejects.toThrowError('Seller not found');
  });
});
