import { ProductPersistence } from '../entities/product-persistence';
import { Product } from '../../../domains/entities/product';
import { AccountMapper } from './account.mapper';

export class ProductMapper {
  static mapToPersistence(product: Product): ProductPersistence {
    const {id, getName, getDescription, getPhotoUris, getPrice, seller} = product;
    return new ProductPersistence(
      id.value,
      getName().value,
      getDescription().value,
      getPhotoUris().map(photoUri => photoUri.value),
      getPrice().value.toNumber(),
      AccountMapper.mapToPersistence(seller),
    )
  }
}
