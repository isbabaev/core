import { Repository } from 'typeorm';
import { ProductEntity } from '../../entities/product.entity';
import { anything, instance, mock, verify } from 'ts-mockito';
import { AddProductToPersistenceAdapter } from '../add-product-to-persistence.adapter';
import { createProduct } from '../../../../domains/entities/__test__/factories/product.factory';

describe('AddProductToPersistenceAdapter', () => {
  let addProductToPersistenceAdapter: AddProductToPersistenceAdapter;
  let mockedProductRepository: Repository<ProductEntity>;

  beforeAll(() => {
    mockedProductRepository = mock<Repository<ProductEntity>>();
    addProductToPersistenceAdapter = new AddProductToPersistenceAdapter(instance(mockedProductRepository));
  });

  test('should call insert method of mockedProductRepository', async () => {
    const product = createProduct();

    await addProductToPersistenceAdapter.addProductToPersistence(product);

    verify(mockedProductRepository.insert(anything())).called();
  });
});
