import { Product } from '../../../../entities/product';
import { UpdateProductNameCommand } from './update-product-name.command';

export interface IUpdateProductNameUseCase {
  updateProductName(command: UpdateProductNameCommand): Promise<Product>;
}
