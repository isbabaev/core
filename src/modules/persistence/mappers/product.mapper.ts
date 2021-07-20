import { ProductPersistence } from '../entities-old/product-persistence';
import { Product } from '../../../domains/entities/product';
import { AccountMapper } from './account.mapper';

export class ProductMapper {
  static mapToPersistence(product: Product): ProductPersistence {
    const {id, seller} = product;
    return new ProductPersistence(
      id.value,
      product.getName().value,
      product.getDescription().value,
      product.getPhotoUris().map(photoUri => photoUri.value),
      product.getPrice().value.toNumber(),
      AccountMapper.mapToPersistence(seller),
    )
  }
}
