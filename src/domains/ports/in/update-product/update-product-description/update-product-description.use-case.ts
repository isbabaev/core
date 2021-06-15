import { UpdateProductDescriptionCommand } from './update-product-description.command';
import { Product } from '../../../../entities/product';

export interface IUpdateProductDescriptionUseCase {
  updateProductDescription(command: UpdateProductDescriptionCommand): Promise<Product>;
}
