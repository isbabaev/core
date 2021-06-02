import { ICreateProductUseCase } from '../../../../domains/ports/in/create-product/create-product.use-case';
import { anything, capture, instance, mock, when } from 'ts-mockito';
import { CreateProductCommand } from '../../../../domains/ports/in/create-product/create-product.command';
import { CreateProductDto } from '../../dto/create-product.dto';
import { CreateProductController } from '../create-product.controller';
import { Id } from '../../../../domains/value-objects/id';

describe('CreateProductControllerTest', () => {
  let createProductController: CreateProductController;
  let mockedCreateProductUseCase: ICreateProductUseCase;
  let createProductData: CreateProductDto;
  let mockedId: Id;

  beforeAll(() => {
    mockedCreateProductUseCase = mock<ICreateProductUseCase>();
    createProductController = new CreateProductController(instance(mockedCreateProductUseCase));

    createProductData = new CreateProductDto(
      'ProductName',
      'ProductDescription',
      ['http://localhost:3000/photo'],
      100.50,
      'a6abb7da-6b27-4ca8-9f71-f2126f8d72a9',
    );

    mockedId = new Id('a6abb7da-6b27-4ca8-9f71-f2126f8d72a9');
    when(mockedCreateProductUseCase.createProduct(anything())).thenResolve({id: mockedId});
  });

  test('should call method createProduct of mockedCreateProductUseCase', async () => {
    await createProductController.createProduct(createProductData);

    const createProductArguments = capture(mockedCreateProductUseCase.createProduct).first();
    expect(createProductArguments[0].name.value).toBe(createProductData.name);
    expect(createProductArguments[0].description.value).toBe(createProductData.description);
    expect(createProductArguments[0].photoUris[0].value).toBe(createProductData.photoUris[0]);
    expect(createProductArguments[0].price.value.valueOf()).toBe(createProductData.price.toString());
    expect(createProductArguments[0].sellerId.value).toBe(createProductData.sellerId);
  });

  test('should return id', async () => {
    const createProductResult = await createProductController.createProduct(createProductData);

    expect(createProductResult.id).toBe(mockedId.value);
  })
});
