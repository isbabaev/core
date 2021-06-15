import { Product } from '../../../../entities/product';

export interface IUpdateProductPort {
  updateProduct(product: Product): Promise<void>;
}
