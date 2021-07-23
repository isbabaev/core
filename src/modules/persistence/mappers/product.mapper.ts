import { Product } from '../../../domains/entities/product';
import { ProductEntity } from '../entities/product.entity';

export class ProductMapper {
  static mapToPersistence(product: Product): ProductEntity {
    const {id, seller} = product;
    return new ProductEntity(
      id.value,
      product.getName().value,
      product.getDescription().value,
      product.getPhotoUris().map(photoUri => photoUri.value),
      product.getPrice().value.toNumber(),
      seller.id.value,
      product.createdAt.value,
      product.updatedAt.value
    )
  }
}
