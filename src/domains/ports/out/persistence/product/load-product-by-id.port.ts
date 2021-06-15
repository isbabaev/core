import { Id } from '../../../../value-objects/id';
import { Product } from '../../../../entities/product';

export interface ILoadProductByIdPort {
  loadProductById(id: Id): Promise<Product>;
}
