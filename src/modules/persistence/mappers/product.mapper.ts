import { ProductPersistence } from '../entities/product-persistence';
import { Product } from '../../../domains/entities/product';
import { AccountMapper } from './account.mapper';

export class ProductMapper {
  static mapToPersistence(product: Product): ProductPersistence {
    const {id, name, description, photoUris, price, seller} = product;
    return new ProductPersistence(
      id.value,
      name.value,
      description.value,
      photoUris.map(photoUri => photoUri.value),
      price.value.toNumber(),
      AccountMapper.mapToPersistence(seller),
    )
  }
}
